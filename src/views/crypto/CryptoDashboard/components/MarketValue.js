import React, { useMemo } from 'react'
import classNames from 'classnames'
import { Card, Button, Table, Avatar } from 'components/ui'
import growShrinkColor from 'utils/growShrinkColor'
import NumberFormat from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'

const { Tr, Td, TBody, THead, Th } = Table

const MarketValue = ({ data = [], className }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/app/crypto/market')
    }

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
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-6">
                <h4>Market values</h4>
                <Button size="sm" onClick={handleClick}>
                    Details
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

export default MarketValue
