import { Loading } from 'components/shared';
import React from 'react';
import CustomAccordion from '../components/according';

const AvailabilitiesView = () => {
    const loading = false
    return <>
        <Loading loading={loading}>
            
            <CustomAccordion />
        </Loading>
    </>
}

export default AvailabilitiesView