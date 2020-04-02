/* Models */
import { ProgramSummary } from 'common/model/Program';
import { ReduxActionType, ReduxThunkAction } from 'client/model/Redux';

/* Application files */
import { request } from 'client/lib/request';

export function loadProgramSummary (): ReduxThunkAction<ProgramSummary> {
    return async (dispatch, getState) => {
        const cache = getState().program;

        if (cache.statuses) return cache;

        const summary = await request<ProgramSummary>('GET', '/program');

        dispatch({
            type: ReduxActionType.PROGRAM_SUMMARY_LOAD,
            summary
        });

        return summary;
    }
}
