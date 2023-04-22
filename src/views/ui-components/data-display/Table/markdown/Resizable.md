```jsx
import React, { useMemo } from 'react'
import { Table } from 'components/ui'
import {
    getCoreRowModel,
    flexRender,
    useReactTable,
} from '@tanstack/react-table'
import { data10 } from './data'

const { Tr, Th, Td, THead, TBody } = Table

function Resizable() {

    const data = useMemo(() => data10, [])

    const columns = useMemo(
        () => [
            { header: 'First Name', accessorKey: 'firstName' },
            { header: 'Last Name', accessorKey: 'lastName' },
            { header: 'Email', accessorKey: 'email' },
            { header: 'Gender', accessorKey: 'gender' },
        ], []
    )

    const table = useReactTable({
        data,
        columns,
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <Table>
            <THead>
                {table.getHeaderGroups().map(headerGroup => (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                            <Th
                               
                                key={header.id}
                                colSpan={header.colSpan}
                                style={{ position: 'relative', width: header.getSize() }}
                            >
                                {
                                    header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )
                                }
                                {header.column.getCanResize() && (
                                    <div
                                        onMouseDown={header.getResizeHandler()}
                                        onTouchStart={header.getResizeHandler()}
                                        className={`table-resizer cursor-all-scroll ${
                                            header.column.getIsResizing() ? 'isResizing' : ''
                                        }`}
                                    ></div>
                                )}
                            </Th>
                            )
                        })}
                    </Tr>
                ))}
            </THead>
            <TBody>
                {table.getRowModel().rows.map(row => {
                    return (
                    <Tr key={row.id}>
                        {row.getVisibleCells().map(cell => {
                        return (
                            <Td key={cell.id} style={{ width: cell.column.getSize() }}>
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
    )
}

export default Resizable
```
