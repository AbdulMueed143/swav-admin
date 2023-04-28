import React from 'react';
import { CalendarView, Loading } from 'components/shared';
import { Card } from 'components/ui';


const DashboardView = () => {
    const loading=false
    return <>
        <Loading loading={loading}>
            <Card>
                <CalendarView />
            </Card>
        </Loading>
    </>
}

export default DashboardView