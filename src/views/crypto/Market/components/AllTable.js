import React, { useMemo } from 'react'
import classNames from 'classnames'
import { Avatar } from 'components/ui'
import { DataTable } from 'components/shared'
import { setTableData } from '../store/dataSlice'
import ActionColumn from './ActionColumn'
import growShrinkColor from 'utils/growShrinkColor'
import cloneDeep from 'lodash/cloneDeep'
import NumberFormat from 'react-number-format'
import { useDispatch } from 'react-redux'

const AllTable = ({ data, loading, tableData }) => {
    const dispatch = useDispatch()

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const { img, symbol, name } = props.row.original
                    return (
                        <div className="flex items-center gap-3">
                            <Avatar
                                src={img}
                                size="sm"
                                className="!bg-transparent"
                            />
                            <span className="font-bold heading-text">
                                {symbol}
                            </span>
                            <span>{name}</span>
                        </div>
                    )
                },
            },
            {
                header: 'Price',
                accessorKey: 'price',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <NumberFormat
                            displayType="text"
                            value={(Math.round(row.price * 100) / 100).toFixed(
                                2
                            )}
                            suffix={' USD'}
                            thousandSeparator={true}
                        />
                    )
                },
            },
            {
                header: '24h Change',
                accessorKey: 'change',
                cell: (props) => {
                    const { change } = props.row.original
                    return (
                        <span
                            className={classNames(
                                'font-semibold',
                                growShrinkColor(change, 'text')
                            )}
                        >
                            {change > 0 && '+'}
                            {change}%
                        </span>
                    )
                },
            },
            {
                header: '24h Volumn',
                accessorKey: 'volumn',
                cell: (props) => {
                    const { volumn } = props.row.original
                    return <span>{volumn}M</span>
                },
            },
            {
                header: 'Market Cap',
                accessorKey: 'marketCap',
                cell: (props) => {
                    const { marketCap } = props.row.original
                    return <span>${marketCap}M</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => {
                    const row = props.row.original
                    return <ActionColumn row={row} />
                },
            },
        ],
        []
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <DataTable
            columns={columns}
            data={data}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ size: 'sm', className: 'rounded-md' }}
            loading={loading}
            pagingData={tableData}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
        />
    )
}

export default AllTable
