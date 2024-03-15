"use client";

import { signOut, useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/Logo.svg";


export default function Navbar() {
    const session = useSession();
    const profileImage: string = session.data?.user?.image!;

    return (
        <>
            <div className="navbar bg-base-100 fixed z-50">
                <div className="flex-none">
                    <Sidebar />
                </div>

                <div className="flex-1 ps-3 scale-70">
                    <Link  href={"/dashboard"}>
                        <Image src={Logo} alt="Attend-OTU" width={256}/>
                    </Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <Image
                                    alt="Profile Picture"
                                    src={profileImage || "/default.svg"}
                                    width={24}
                                    height={24}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li onClick={() => signOut({ callbackUrl: "/login" })}>
                                <a className="text-lg">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
