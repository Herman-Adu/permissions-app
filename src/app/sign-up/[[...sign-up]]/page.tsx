import { SignUp } from "@clerk/nextjs";

export default function SignUpRoute() {
  return (
    <div className="flex h-full w-full">
      <div className="m-auto">
        <SignUp />
      </div>
    </div>
  );
}
