"use client";
import Button from "@/app/components/atoms/Button";
import PageTitle from "@/app/components/atoms/PageTitle";
import AddUserForm from "@/app/components/molecules/Admin/Employees/AddUserForm";
import Modal from "@/app/components/molecules/Modal";
import Table from "@/app/components/molecules/Table";
import TablePlaceholder from "@/app/components/Placeholders/TablePlaceholder";
import { useGetEmployeesQuery } from "@/app/rtkQuery/services/admin";
import { EmployeeProps } from "@/app/types/AdminProps";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: employeesData, isLoading: employeesLoading } =
    useGetEmployeesQuery();

  const columns: ColumnDef<EmployeeProps>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Role", accessorKey: "role" },
    { header: "Email", accessorKey: "email" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <button className="text-blue-500 hover:underline">Edit</button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <PageTitle title="Users" />
        <Button
          className="bg-main-color text-white hover:bg-main-color/90 rounded-md"
          text="+ Add User"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {employeesLoading ? (
        <TablePlaceholder />
      ) : (
        <Table
          columns={columns}
          data={employeesData && employeesData.length > 0 ? employeesData : []}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add User"
      >
        <AddUserForm setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default Employees;
