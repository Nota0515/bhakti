import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-8">Login / Sign Up</h1>
      <AuthForm mode="login" />
    </div>
  );
}
