// app/signup/page.tsx
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 bg-white">
            <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
            <SignupForm />
        </div>
    );
}
