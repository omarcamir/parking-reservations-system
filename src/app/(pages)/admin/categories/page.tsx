"use client";
import PageTitle from "@/app/components/atoms/PageTitle";
import Table from "@/app/components/molecules/Table";
import TablePlaceholder from "@/app/components/Placeholders/TablePlaceholder";
import { useGetCategoriesQuery } from "@/app/rtkQuery/services/admin";
import { CategoryProps } from "@/app/types/AdminProps";
import { ColumnDef } from "@tanstack/react-table";

const Categories = () => {
  const { data, isLoading } = useGetCategoriesQuery();

  const columns: ColumnDef<CategoryProps>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Normal Rate", accessorKey: "normalRate" },
    { header: "Special Rate", accessorKey: "specialRate" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <button className="text-blue-500 hover:underline">Edit</button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <PageTitle title="Categories" />
      {isLoading ? (
        <TablePlaceholder />
      ) : (
        <Table<CategoryProps> columns={columns} data={data ?? []} />
      )}
    </div>
  );
};

export default Categories;
