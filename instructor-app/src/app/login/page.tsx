"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
    const session = useSession();

    if (session?.status == "authenticated") {
        redirect("/dashboard");
    }

    return (
        <>
            <div className="flex items-center justify-center overflow-hidden h-screen dark:bg-slate-900">
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="relative mx-auto max-w-4xl grid space-y-5 sm:space-y-10 ">
                        <div className="text-center">
                            <h1 className="inline-block text-transparent text-3xl bg-clip-text  font-bold sm:text-5xl lg:text-6xl lg:leading-tight  bg-gradient-to-r from-slate-200 via-rose-400 to-indigo-400">
                                ATTEND-OT
                            </h1>
                        </div>

                        <button className="mt-8 gap-3 flex justify-center">
                            <a
                                className="inline-flex justify-center px-10 items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-lg font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 dark:focus:ring-offset-gray-800"
                                onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
                            >
                                Login
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
