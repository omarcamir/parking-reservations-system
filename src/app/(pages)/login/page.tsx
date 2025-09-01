import Logo from "@/app/components/atoms/Logo";
import PageTitle from "@/app/components/atoms/PageTitle";
import LoginForm from "@/app/components/molecules/LoginForm";
import ClientLayout from "@/app/Layout/ClientLayout";

export default function LoginPage() {
  return (
    <ClientLayout>
      <div className="min-h-screen container flex flex-col  justify-center bg-gray-100 py-10 gap-8">
        <PageTitle title="Login" />
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
          <Logo className="!text-xl lg:!text-4xl" />
        </div>
      </div>
    </ClientLayout>
  );
}
