"use client";
import Button from "@/app/components/atoms/Button";
import PageTitle from "@/app/components/atoms/PageTitle";
import Table from "@/app/components/molecules/Table";
import TablePlaceholder from "@/app/components/Placeholders/TablePlaceholder";
import { useGetRushHoursQuery } from "@/app/rtkQuery/services/admin";
import { RushHourProps } from "@/app/types/AdminProps";
import { ColumnDef } from "@tanstack/react-table";

const RushHours = () => {
  const { data, isLoading } = useGetRushHoursQuery();

  const columns: ColumnDef<RushHourProps>[] = [
    { header: "Weekday", accessorKey: "weekday" },
    {
      header: "From → To",
      cell: ({ row }) => `${row.original.from} – ${row.original.to}`,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <PageTitle title="Rush Hours" />
        <Button
          className="bg-main-color text-white rounded-md"
          text="+ Add Rush Hour"
        />
      </div>

      {isLoading ? (
        <TablePlaceholder />
      ) : (
        <Table<RushHourProps> columns={columns} data={data ?? []} />
      )}
    </div>
  );
};

export default RushHours;
