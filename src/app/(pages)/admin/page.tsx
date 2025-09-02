"use client";
import Button from "@/app/components/atoms/Button";
import PageTitle from "@/app/components/atoms/PageTitle";
import Modal from "@/app/components/molecules/Modal";
import Table from "@/app/components/molecules/Table";
import TablePlaceholder from "@/app/components/Placeholders/TablePlaceholder";
import {
  useAddEmployeeMutation,
  useGetEmployeesQuery,
} from "@/app/rtkQuery/services/admin";
import { EmployeeProps } from "@/app/types/AdminProps";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", email: "" });
  const { data: employeesData, isLoading: employeesLoading } =
    useGetEmployeesQuery();
  const [addEmployee, { isLoading: isAdding }] = useAddEmployeeMutation();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEmployee(form).unwrap();
    setIsModalOpen(false);
    setForm({ name: "", role: "", email: "" });
  };


  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <PageTitle title="Employees" />
        <Button
          className="bg-main-color text-white hover:bg-main-color/90 rounded-md"
          text="+ Add Employee"
          // onClick={() => setIsModalOpen(true)}
          // onClick={() => showToast("A note form Omar: API response not found", "error")}
          onClick={()=>console.log("A note form Omar: API response not found", "error")}
        />
      </div>

      {employeesLoading ? (
        <TablePlaceholder />
      ) : (
        <Table<EmployeeProps> columns={columns} data={employeesData!} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Employee"
        Loading={isAdding}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full border px-3 py-2 rounded-md"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-main-color text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Employees;
