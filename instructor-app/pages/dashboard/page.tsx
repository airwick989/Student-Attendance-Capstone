"use client";
import { signOut, useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();

  return (
    <>
      <div>{session?.data?.user?.name}</div>
      <button onClick={() => signOut()}>Logout</button>
    </>
  );
}
