"use client";
import PageTitle from "@/app/components/atoms/PageTitle";
import Table from "@/app/components/molecules/Table";
import TablePlaceholder from "@/app/components/Placeholders/TablePlaceholder";
import { useGetZonesQuery, useToggleZoneMutation } from "@/app/rtkQuery/services/admin";
import { ZoneProps } from "@/app/types/AdminProps";
import { ColumnDef } from "@tanstack/react-table";

const Zones = () => {
  const { data, isLoading } = useGetZonesQuery();
  const [toggleZone] = useToggleZoneMutation();

  const columns: ColumnDef<ZoneProps>[] = [
    { header: "Zone", accessorKey: "name" },
    {
      header: "Status",
      cell: ({ row }) =>
        row.original.isOpen ? "OPEN" : "CLOSED",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <button
          onClick={() =>
            toggleZone({ id: row.original.id, isOpen: !row.original.isOpen })
          }
          className="text-blue-500 hover:underline"
        >
          Toggle
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <PageTitle title="Zones" />
      {isLoading ? (
        <TablePlaceholder />
      ) : (
        <Table<ZoneProps> columns={columns} data={data ?? []} />
      )}
    </div>
  );
};

export default Zones;
