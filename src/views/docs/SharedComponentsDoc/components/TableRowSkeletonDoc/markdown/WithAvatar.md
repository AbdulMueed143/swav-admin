```jsx
import React, { useState, useMemo } from 'react'
import { Table, Switcher, Avatar } from 'components/ui'
import { TableRowSkeleton } from 'components/shared'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'

const AVATAR_SIZE = 30

const data = [
    {
        firstName: 'Maria',
        lastName: 'Anders',
        age: 24,
        avatar: '/img/avatars/thumb-1.jpg',
        status: 'complicated',
    },
    {
        firstName: 'Francisco',
        lastName: 'Chang',
        age: 9,
        avatar: '/img/avatars/thumb-2.jpg',
        status: 'single',
    },
    {
        firstName: 'Roland',
        lastName: 'Mendel',
        age: 1,
        avatar: '/img/avatars/thumb-3.jpg',
        status: 'single',
    },
    {
        firstName: 'Helen',
        lastName: 'Bennett',
        age: 43,
        avatar: '/img/avatars/thumb-4.jpg',
        status: 'married',
    },
    {
        firstName: 'Yoshi ',
        lastName: 'Tannamuri',
        age: 37,
        avatar: '/img/avatars/thumb-5.jpg',
        status: 'single',
    },
]

const { Tr, Th, Td, THead, TBody } = Table

const WithAvatar = () => {
    const [isLoading, setIsLoading] = useState(true)

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'firstName',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <div>
                                <Avatar
                                    size={AVATAR_SIZE}
                                    src={row.avatar}
                                    shape="circle"
                                />
                            </div>
                            <span>
                                {row.firstName} {row.lastName}{' '}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
            },
            {
                header: 'Age',
                accessorKey: 'age',
            },
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <>
            <div className="flex items-center mb-4 gap-2">
                <span>Loading State: </span>
                <Switcher
                    checked={isLoading}
                    onChange={(checked) => setIsLoading(!checked)}
                />
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
                {isLoading ? (
                    <TableRowSkeleton
                        avatarInColumns={[0]}
                        columns={3}
                        rows={5}
                        avatarProps={{
                            width: AVATAR_SIZE,
                            height: AVATAR_SIZE,
                        }}
                    />
                ) : (
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
                )}
            </Table>
        </>
    )
}

export default WithAvatar
```
