"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const session = useSession();

  useEffect(() => {
    if (session.status == 'unauthenticated') {
      redirect('/login')
    }
    redirect('/dashboard')


  }, [session.status])


  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center">
        <span className="loading loading-spinner text-secondary mb-7"></span>
        <p>If you are not redirected, please click {<Link href={'/dashboard'} className="text-secondary underline">here.</Link>}</p>
      </div>

    </>
  );
}
