import Sidebar from "@/app/components/organisms/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className={`flex-1 w-full`}>
        <main className="p-6 bg-gray-50 flex-1">{children}</main>
      </div>
    </div>
  );
}
