import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../components/ui/collapsible';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useState } from 'react';
import { ChevronRight, ChevronDown } from '@geist-ui/react-icons';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleToggle = (rowId: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  return (
    <>
      {/* Filter */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter patient ID's..."
          value={
            (table.getColumn('patientId')?.getFilterValue() as string) ?? ''
          }
          onChange={(event: any) =>
            table.getColumn('patientId')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <Collapsible key={row.id} asChild>
                    <>
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}

                        <TableCell>
                          <CollapsibleTrigger asChild>
                            <div
                              className="flex items-center text-gray-500 hover:cursor-pointer"
                              onClick={() => handleToggle(row.id)}>
                              {openRows[row.id] ? (
                                <ChevronDown color="gray" size="20px" />
                              ) : (
                                <ChevronRight color="gray" size="20px" />
                              )}
                            </div>
                          </CollapsibleTrigger>
                        </TableCell>
                      </TableRow>
                      <CollapsibleContent asChild>
                        <TableRow>
                          <TableCell colSpan={columns.length + 1}>
                            <div className="p-4 bg-gray-100">
                              <div>
                                <strong>Patient ID:</strong>{' '}
                                {row.original.patientId}
                              </div>
                              <div>
                                <strong>Baseline:</strong>{' '}
                                {row.original.baseline}
                                {' - '}
                                Quality: {row.original.baselineQuality}
                                {' - '}
                                Date:{' '}
                                {
                                  data.find(
                                    (item) =>
                                      item.patientId ===
                                        row.original.patientId &&
                                      item.event === Event.Baseline
                                  )?.scannedAt
                                }
                              </div>
                              <div>
                                <strong>Follow-up:</strong>{' '}
                                {row.original.followUp}
                                {' - '}
                                Quality: {row.original.followUpQuality}
                                {' - '}
                                Date:{' '}
                                {
                                  data.find(
                                    (item) =>
                                      item.patientId ===
                                        row.original.patientId &&
                                      item.event === Event.FollowUp
                                  )?.scannedAt
                                }
                              </div>
                              <div>
                                <strong>Conclusion:</strong>{' '}
                                {row.original.conclusion}
                                {' - '}
                                Quality: {row.original.conclusionQuality}
                                {' - '}
                                Date:{' '}
                                {
                                  data.find(
                                    (item) =>
                                      item.patientId ===
                                        row.original.patientId &&
                                      item.event === Event.Conclusion
                                  )?.scannedAt
                                }
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                ))
              : null}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </>
  );
}
