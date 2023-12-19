"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();

  useEffect(()=>{
    if(session.status == 'unauthenticated'){
      redirect('/login')
    }
      redirect('/dashboard')
    

  },[])

  
  return (
    <>
      
      <div>{session?.data?.user?.name}</div>
      <button onClick={() => signOut()}>Logout</button>
    </>
  );
}
