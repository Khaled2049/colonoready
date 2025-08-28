import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-bg100">
      <SignUp
        redirectUrl="/appointments/operations"
        signInUrl="/sign-in"
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
