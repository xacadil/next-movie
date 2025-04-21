// app/login/page.tsx
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 bg-white">
            <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
            <LoginForm />
        </div>
    );
}
