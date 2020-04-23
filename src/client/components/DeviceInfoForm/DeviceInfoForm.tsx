/* Libraries */
import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch, TypedUseSelectorHook } from 'react-redux';

/* Model */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { DeviceType, DeviceInputRequest, DeviceInput, DeviceInputType } from 'common/model/Device';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import { getTypes as getDeviceTypes, getTypeInputs as getDeviceTypeInputs } from 'client/actions/devices';
import { FormField, empty as emptyDevice } from 'client/lib/device';
import { isSelectable, empty, create, getDeviceTypeLabel, getDeviceInputLabel, validateField, ValidationResult } from 'client/lib/deviceInfo';
import LoadingOverlay from 'client/components/LoadingOverlay';
import TechSpecTooltip from 'client/components/TechSpecTooltip';

type Props = {
    onChange?: (type: DeviceType, inputs: DeviceInputRequest[]) => void;
    onError?: (error: string) => void;
}

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative'
    },
    loader: {
        paddingTop: 5,
        top: -5
    },
    input: {
        margin: `${theme.spacing(1)}px 0`,
        marginTop: 0
    }
}));

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;
const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

export function DeviceInfoForm (props: Props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const deviceTypes = useSelector((state) => state.deviceTypes.types);
    const deviceInputs = useSelector((state) => state.deviceTypes.inputs);

    const [ type, setType ] = useState(emptyDevice()[FormField.DEVICE_TYPE]);
    const [ form, setForm ] = useState(empty([]) as DeviceInputRequest[]);
    const [ loading, setLoading ] = useState(false);
    const [ validation, setValidation ] = useState({} as ValidationResult);
    const [ pristine, setPristine ] = useState({});

    const inputs = type ? deviceInputs[type.id] || [] : [];

    useEffect(() => {
        setLoading(true);

        dispatch(getDeviceTypes()).catch(() => {
            props.onError && props.onError('Ups, coś poszło nie tak.');
        }).finally(() => {
            setLoading(false);
        });
    }, []);
    console.log(form);

    function validateSingleField (id: number, value?: any) {
        const schema = deviceInputs[type.id].find((d) => d.id === id);
        const input = form.find((i) => i.id === id);
        const current = isSelectable(schema.type) ? input.option : input.value;
        const result = validateField(schema.name, value || current, { form });

        setValidation({ ...validation, ...result });
    }

    async function updateType (e: React.ChangeEvent<any>, value: DeviceType) {
        if (value) {
            setLoading(true);

            await dispatch(getDeviceTypeInputs(value.id));
        }

        const inputs = deviceInputs[value.id];

        setType(value);
        setForm(empty(inputs));
        setLoading(false);
        setPristine(create(inputs, true))
    }

    function updateField (id: number, type: DeviceInputType) {
        return (e: React.ChangeEvent<HTMLInputElement | any>, value?: any) => {
            if (isSelectable(type)) value = parseInt(value, 10);
            if (typeof value === 'undefined') value = e.target.value;
            if (!pristine[id]) validateSingleField(id, value);

            const input = form.find((i) => i.id === id);

            if (!isSelectable(type)) input.value = value;
            else input.option = value;

            console.log(input);

            setForm([ ...form ]);
        };
    }

    function setDirty (id: number) {
        return () => {
            const schema = deviceInputs[type.id].find((s) => s.id === id);
            const input = form.find((i) => i.id === id);

            validateSingleField(id, isSelectable(schema.type) ? input.option : input.value);
            if (!pristine[schema.name]) return;

            setPristine({ ...pristine, [schema.name]: false });
        };
    }

    function createDeviceInput (input: DeviceInput, key: number) {
        switch (input.type) {
            case DeviceInputType.TEXT: return (
                <TextField
                    key={key}
                    variant="outlined"
                    label={getDeviceInputLabel(input.name)}
                    className={classes.input}
                    onChange={updateField(input.id, DeviceInputType.TEXT)}
                    onBlur={setDirty(input.id)}
                    error={!!validation[input.name]}
                    helperText={validation[input.name]}
                    fullWidth={true} />
            );
            case DeviceInputType.RADIO: return (
                <FormControl key={key} component="fieldset" error={!!validation[input.name]}>
                    <FormLabel component="legend">{getDeviceInputLabel(input.name)}</FormLabel>
                    <RadioGroup defaultValue={input.options[0].id} onChange={updateField(input.id, DeviceInputType.RADIO)} onBlur={setDirty(input.id)}>
                        {input.options.map((option, index) => (
                            <FormControlLabel key={index} control={<Radio />} label={option.name} value={option.id} />
                        ))}
                    </RadioGroup>
                </FormControl>
            );
            default: return null;
        }
    }

    return (
        <section className={classes.container}>
            {loading && <LoadingOverlay className={classes.loader} />}
            <Autocomplete options={deviceTypes} getOptionLabel={(option) => getDeviceTypeLabel(option.name)} onChange={updateType} value={form[FormField.DEVICE_TYPE]} renderInput={(props) => (
                <TextField
                    {...props}
                    variant="outlined"
                    label="Typ urządzenia"
                    className={classes.input}
                    error={!!validation[FormField.DEVICE_TYPE]}
                    helperText={validation[FormField.DEVICE_TYPE]}
                    fullWidth
                />
            )} />
            {inputs.map((input, index) => createDeviceInput(input, index))}
            <TechSpecTooltip>
                <Typography variant="body2" style={{ textAlign: 'left' }}>Jak sprawdzić paremetry sprzętu?</Typography>
            </TechSpecTooltip>
        </section>
    )
}

export default DeviceInfoForm;
