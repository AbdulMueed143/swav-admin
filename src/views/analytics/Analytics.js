import { Chart, GrowShrinkTag, Loading } from 'components/shared';
import { Card } from 'components/ui';
import React from 'react';
import dayjs from 'dayjs';
import NumberFormat from 'react-number-format';

const StatisticCard = ({ data = {}, label, valuePrefix, date }) => {
    return (
        <Card>
            <h6 className="font-semibold mb-4 text-sm">{label}</h6>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold">
                        <NumberFormat
                            displayType="text"
                            value={data.value}
                            thousandSeparator
                            prefix={valuePrefix}
                        />
                    </h3>
                    <p>
                        vs. 3 months prior to{' '}
                        <span className="font-semibold">
                            {dayjs(date).format('DD MMM')}
                        </span>
                    </p>
                </div>
                <GrowShrinkTag value={data.growShrink} suffix="%" />
            </div>
        </Card>
    )
}

const Analytics = () => {
    // DUMMY DATA BELOW
    const data=
    {
        revenue: {value: 12345, growShrink: 11.4},
        appointments: {value: 312, growShrink: -2}
    }
    const startDate=dayjs()

    const loading=false
    return 
    
    <>
        <Loading loading={loading}>
            <div class="flex flex-col gap-4">
                HI FROM ANALYTICS
                    <div  class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <StatisticCard
                            data={data.revenue}
                            valuePrefix="$"
                            label="Revenue"
                            tagSuffix="%"
                            date={startDate}
                        />
                        <StatisticCard
                            data={data.appointments}
                            valuePrefix=""
                            label="Appointments"
                            tagSuffix="%"
                            date={startDate}
                        />
                        <StatisticCard
                            data={data.revenue}
                            valuePrefix="$"
                            label="Revenue"
                            tagSuffix="%"
                            date={startDate}
                        />
                    </div>
                <div>
                    <Card>
                        <Chart/>
                    </Card>
                </div>
            </div>
        </Loading>
    </>
}

export default Analytics