"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Page() {
  const session = useSession();

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Hello {session?.data?.user?.name}.
            </h1>
            <p className="py-6">
              Welcome to your classroom tracker map. Get started by creating a
              new course and room, or view existing ones here.
            </p>
            <div className="flex justify-center gap-2">
              <Link href={"./dashboard/courses"} className="btn btn-primary bg-gradient-to-tl from-rose-200 to-violet-400 hover:from-violet-50 hover:to-violet-500 border-none">
                View Courses
              </Link>
              <Link href={"./dashboard/rooms"} className="btn btn-primary bg-gradient-to-bl from-violet-400 to-rose-200 hover:from-violet-500 hover:to-violet-50 border-none">
                View Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
