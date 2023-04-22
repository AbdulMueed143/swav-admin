import React, { useMemo } from 'react'
import { Card, Button, Table, Tag, Avatar } from 'components/ui'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

const { Tr, Td, TBody, THead, Th } = Table

const NameColumn = ({ row }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar shape="circle" size={25} src={row.avatar} />
            <span className="font-semibold">{row.name}</span>
        </div>
    )
}

const LeadStatus = ({ status }) => {
    switch (status) {
        case 0:
            return <Tag className="rounded-md">New</Tag>
        case 1:
            return (
                <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100  border-0 rounded">
                    Sold
                </Tag>
            )
        case 2:
            return (
                <Tag className="text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20  border-0 rounded">
                    Not Interested
                </Tag>
            )
        case 3:
            return (
                <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded">
                    In Progress
                </Tag>
            )
        default:
            return <></>
    }
}

const Leads = ({ data = [], className }) => {
    const navigate = useNavigate()

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return <LeadStatus status={row.status} />
                },
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Created Time',
                accessorKey: 'createdTime',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {dayjs
                                .unix(row.createdTime)
                                .format('DD/MM/YYYY hh:mm')}
                        </span>
                    )
                },
            },
            {
                header: 'Assignee',
                accessorKey: 'assignee',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <Tag className="rounded-md font-bold cursor-pointer select-none text-gray-900 dark:text-gray-100">
                            {row.assignee}
                        </Tag>
                    )
                },
            },
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const onNavigate = () => {
        navigate('/app/crm/customers')
    }

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-4">
                <h4>Leads</h4>
                <Button onClick={onNavigate} size="sm">
                    View All Leads
                </Button>
            </div>
            <Table>
                <THead>
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
        </Card>
    )
}

export default Leads
