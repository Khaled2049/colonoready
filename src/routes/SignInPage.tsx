import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-bg100">
      <SignIn
        redirectUrl="/appointments/operations"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl",
          },
        }}
      />
    </div>
  );
}
