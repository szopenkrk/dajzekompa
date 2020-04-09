/* Libraries */
import React from 'react';
import Terms from '../../assets/regulamin.html'

/* Application files */
import SubPage from 'client/pages/SubPage';

export function TermsPage () {
    return (
        <>
        <SubPage title="Regulamin"></SubPage>
        <div dangerouslySetInnerHTML={Terms} ></div>
        </>
    );
}

export default TermsPage;
