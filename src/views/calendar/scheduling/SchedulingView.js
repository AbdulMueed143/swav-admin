import React from 'react';
import { Loading } from 'components/shared';

const SchedulingView = () => {
    const loading=false
    return <>
        <Loading loading={loading}>
            Store Admin Page
            <p>
                Set breaks here
            </p>
        </Loading>
    </>
}

export default SchedulingView