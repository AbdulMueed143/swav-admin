import React, { useMemo } from 'react'
import { Card, Button, Table, Tag } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { UsersAvatarGroup, ActionLink } from 'components/shared'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'

const { Tr, Th, Td, THead, TBody } = Table

const PriorityTag = ({ priority }) => {
    switch (priority) {
        case 0:
            return (
                <Tag className="text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 rounded border-0">
                    High
                </Tag>
            )
        case 1:
            return (
                <Tag className="text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20 rounded border-0">
                    Medium
                </Tag>
            )
        case 2:
            return (
                <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 rounded border-0">
                    Low
                </Tag>
            )
        default:
            return null
    }
}

const MyTasks = ({ data = [] }) => {
    const navigate = useNavigate()

    const columns = useMemo(
        () => [
            {
                header: 'Task ID',
                accessorKey: 'taskId',
                cell: (props) => {
                    const { taskId } = props.row.original
                    return (
                        <ActionLink
                            themeColor={false}
                            className="font-semibold"
                            to="/app/project/scrum-board"
                        >
                            {taskId}
                        </ActionLink>
                    )
                },
            },
            {
                header: 'Subject',
                accessorKey: 'taskSubject',
            },
            {
                header: 'Priority',
                accessorKey: 'priority',
                cell: (props) => {
                    const { priority } = props.row.original
                    return <PriorityTag priority={priority} />
                },
            },
            {
                header: 'Assignees',
                accessorKey: 'Assignees',
                cell: (props) => {
                    const { assignees } = props.row.original
                    return <UsersAvatarGroup users={assignees} />
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

    const onViewAllTask = () => {
        navigate('/app/project/issue')
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h4>My Tasks</h4>
                <Button onClick={onViewAllTask} size="sm">
                    View All
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

export default MyTasks
