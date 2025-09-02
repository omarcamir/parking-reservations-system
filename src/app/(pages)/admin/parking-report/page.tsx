"use client";
import PageTitle from "@/app/components/atoms/PageTitle";
import Table from "@/app/components/molecules/Table";
import TablePlaceholder from "@/app/components/Placeholders/TablePlaceholder";
import { useGetParkingReportQuery } from "@/app/rtkQuery/services/admin";
import { ParkingReportProps } from "@/app/types/AdminProps";
import { ColumnDef } from "@tanstack/react-table";

const ParkingReport = () => {
  const { data, isLoading } = useGetParkingReportQuery();

  const columns: ColumnDef<ParkingReportProps>[] = [
    { header: "Zone ID", accessorKey: "zoneId" },
    { header: "Name", accessorKey: "name" },
    {
      header: "Occupied",
      cell: ({ row }) =>
        `${row.original.occupied}/${row.original.totalSlots}`,
    },
    {
      header: "Free Slots",
      accessorKey: "free",
    },
    {
      header: "Reserved",
      accessorKey: "reserved",
    },
    {
      header: "Visitors Available",
      accessorKey: "availableForVisitors",
    },
    {
      header: "Subscribers Available",
      accessorKey: "availableForSubscribers",
    },
    {
      header: "Subscribers",
      accessorKey: "subscriberCount",
    },
    {
      header: "Status",
      cell: ({ row }) =>
        row.original.open ? (
          <span className="text-green-600 font-medium">✅ Open</span>
        ) : (
          <span className="text-red-600 font-medium">❌ Closed</span>
        ),
    },
  ];

  return (
    <div className="p-6">
      <PageTitle title="Parking Report" />
      {isLoading ? (
        <TablePlaceholder />
      ) : (
        <Table<ParkingReportProps> columns={columns} data={data ?? []} />
      )}
    </div>
  );
};

export default ParkingReport;
