"use client";
import Button from "@/app/components/atoms/Button";
import PageTitle from "@/app/components/atoms/PageTitle";
import Table from "@/app/components/molecules/Table";
import TablePlaceholder from "@/app/components/Placeholders/TablePlaceholder";
import { useGetVacationsQuery } from "@/app/rtkQuery/services/admin";
import { VacationProps } from "@/app/types/AdminProps";
import { ColumnDef } from "@tanstack/react-table";

const Vacations = () => {
  const { data, isLoading } = useGetVacationsQuery();

  const columns: ColumnDef<VacationProps>[] = [
    { header: "Title", accessorKey: "title" },
    {
      header: "Date Range",
      cell: ({ row }) =>
        `${row.original.startDate} → ${row.original.endDate}`,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <PageTitle title="Vacations" />
        <Button
          className="bg-main-color text-white rounded-md"
          text="+ Add Vacation"
        />
      </div>

      {isLoading ? (
        <TablePlaceholder />
      ) : (
        <Table<VacationProps> columns={columns} data={data ?? []} />
      )}
    </div>
  );
};

export default Vacations;
