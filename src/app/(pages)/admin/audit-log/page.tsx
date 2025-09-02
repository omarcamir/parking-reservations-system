"use client";
import PageTitle from "@/app/components/atoms/PageTitle";
import Table from "@/app/components/molecules/Table";
import TablePlaceholder from "@/app/components/Placeholders/TablePlaceholder";
import { useGetAuditLogQuery } from "@/app/rtkQuery/services/admin";
import { AuditLogProps } from "@/app/types/AdminProps";
import { ColumnDef } from "@tanstack/react-table";

const AuditLog = () => {
  const { data, isLoading } = useGetAuditLogQuery();

  const columns: ColumnDef<AuditLogProps>[] = [
    { header: "Time", accessorKey: "timestamp" },
    { header: "Admin", accessorKey: "admin" },
    { header: "Action", accessorKey: "action" },
  ];

  return (
    <div className="p-6">
      <PageTitle title="Audit Log" />
      {isLoading ? (
        <TablePlaceholder />
      ) : (
        <Table<AuditLogProps> columns={columns} data={data ?? []} />
      )}
    </div>
  );
};

export default AuditLog;
