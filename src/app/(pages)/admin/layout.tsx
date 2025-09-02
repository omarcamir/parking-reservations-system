
import Sidebar from "@/app/components/organisms/Sidebar";
import AdminAuthWrapper from "@/app/Layout/AdminAuthWrapper";
import ClientLayout from "@/app/Layout/ClientLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className={`flex-1 w-full`}>
          <main className="p-6 flex-1">
            <AdminAuthWrapper>{children}</AdminAuthWrapper>
          </main>
        </div>
      </div>
    </ClientLayout>
  );
}
