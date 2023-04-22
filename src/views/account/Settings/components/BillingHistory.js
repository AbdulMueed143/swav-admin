import React from 'react'
import { Table, Badge } from 'components/ui'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'
import NumberFormat from 'react-number-format'
import dayjs from 'dayjs'

const { Tr, Th, Td, THead, TBody } = Table

const statusColor = {
    paid: 'bg-emerald-500',
    pending: 'bg-amber-400',
}

const columns = [
    {
        header: 'Reference',
        accessorKey: 'id',
        cell: (props) => {
            const row = props.row.original
            return (
                <div>
                    <span className="cursor-pointer">{row.id}</span>
                </div>
            )
        },
    },
    {
        header: 'Product',
        accessorKey: 'item',
    },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <Badge className={statusColor[row.status]} />
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.status}
                    </span>
                </div>
            )
        },
    },
    {
        header: 'Date',
        accessorKey: 'date',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {dayjs.unix(row.date).format('MM/DD/YYYY')}
                </div>
            )
        },
    },
    {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <NumberFormat
                        displayType="text"
                        value={(Math.round(row.amount * 100) / 100).toFixed(2)}
                        prefix={'$'}
                        thousandSeparator={true}
                    />
                </div>
            )
        },
    },
]

const BillingHistory = ({ data = [], ...rest }) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div {...rest}>
            <Table>
                <THead className="!bg-transparent">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </div>
    )
}

export default BillingHistory
