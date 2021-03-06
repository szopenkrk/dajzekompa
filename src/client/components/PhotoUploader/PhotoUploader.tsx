/* Libraries */
import React, { createRef, useState } from 'react';
import { makeStyles, Icon } from '@material-ui/core';

type Props = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, files: string[]) => void;
    mime?: string[];
    maxSize?: number;
};

const useStyles = makeStyles({
    container: {
        borderRadius: 5,
        border: '3px dashed rgba(0, 0, 0, 0.23)',
        padding: 20,
        display: 'flex',
        flexWrap: 'wrap'
    },
    photo: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        padding: 10,
        width: 100,
        height: 100,
        margin: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    icon: {
        fontSize: 50,
        color: 'rgba(0, 0, 0, 0.23)'
    },
    fileInput: {
        display: 'none'
    }
});

export function PhotoUploader (props: Props) {
    const classes = useStyles();
    const [ files, setFiles ] = useState([]);
    const fileInput = createRef<HTMLInputElement>();

    function parseFiles (e: React.ChangeEvent<HTMLInputElement>) {
        const parsed = [];
        const raw = e.target.files;

        Array.from(raw).forEach((file) => {
            if (props.maxSize && file.size > props.maxSize) return;
            if (props.mime && !props.mime.includes(file.type)) return;

            const reader = new FileReader();

            reader.onload = () => {
                const binary = reader.result as string;
                const base64 = `data:${file.type};base64,${btoa(binary)}`;

                parsed.push(base64);

                if (parsed.length === raw.length) {
                    const all = [ ...files, ...parsed ];
                    setFiles(all);
                    props.onChange && props.onChange(e, all);
                }
            };

            reader.readAsBinaryString(file);
        });
    }

    function selectFile () {
        fileInput.current.click();
    }

    return (
        <section className={classes.container}>
            {files.map((file, index) => (
                <article className={classes.photo} key={index}>
                    <div className={classes.thumbnail} style={{ backgroundImage: `url("${file}")` }}></div>
                </article>
            ))}
            <article className={classes.photo} onClick={selectFile}>
                <Icon className={classes.icon}>add_circle_outline</Icon>
            </article>
            <input type="file" multiple className={classes.fileInput} ref={fileInput} onChange={parseFiles} />
        </section>
    )
}

export default PhotoUploader;
