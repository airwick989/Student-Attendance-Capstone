'use client'

import { signOut, useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import Image from "next/image";

export default function Navbar() {

    const session = useSession();
    const profileImage: string = session.data?.user?.image!

    return (<>
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <Sidebar />
            </div>

            <div className="flex-1">
                <h1 className="mx-4 text-transparent text-2xl bg-clip-text  font-bold lg:text-3xl lg:leading-tight  bg-gradient-to-r from-slate-200 via-rose-400 to-indigo-400">ATTEND-OTU</h1>
            </div>
            <div className="flex-none">

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image alt="Profile Picture" src={profileImage} width={24} height={24} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li onClick={() => signOut({ callbackUrl: "/login" })}><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>

    </>)
}