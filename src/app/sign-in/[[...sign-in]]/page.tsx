import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-full w-full">
      <div className="m-auto">
        <SignIn />
      </div>
    </div>
  );
}
