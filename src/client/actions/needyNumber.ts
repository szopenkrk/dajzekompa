/* Models */
import { ReduxActionType, ReduxThunkAction } from 'client/model/Redux';

/* Application files */
import { request } from 'client/lib/request';

export function needyNumberLoad (): ReduxThunkAction<any> {
    return async (dispatch, getState) => {

        const needy = await request<any>('GET', '/numberOfReceivers');

        dispatch({
            type: ReduxActionType.NEEDY_NUMBER,
            needy
        });

        return needy;
    }
}
