/* Libraries */
import { ReduxActionType } from '../model/Redux';

/* Models */
import { ProgramSummary } from '../model/Program';

/* Application files */
import { request } from '../lib/request';

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
