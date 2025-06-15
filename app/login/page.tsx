import { Wrapper } from "@/components/atoms";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <Wrapper className="bg-brand-bgdark flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </Wrapper>
  );
}
