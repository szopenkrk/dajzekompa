/* Models */
import { ProgramSummary } from 'common/model/Program';
import { ReduxActionType } from 'client/model/Redux';

/* Application files */
import { request } from 'client/lib/request';

export function loadProgramSummary () {
    return async (dispatch: any, getState) => {
        const cache = getState().program;

        if (cache.totalDevices) return cache;

        const summary = await request<ProgramSummary>('GET', '/program');

        dispatch({
            type: ReduxActionType.PROGRAM_SUMMARY_LOAD,
            summary
        });

        return summary;
    }
}
