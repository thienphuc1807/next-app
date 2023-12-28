"use client";

import React from "react";
import Link from "next/link";
import { FaAtom } from "react-icons/fa";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavBar = () => {
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];

    const currentPath = usePathname();

    return (
        <nav className="flex space-x-5 mb-5 border-b-2 container mx-auto h-14 items-center">
            <Link href="/">
                <FaAtom />
            </Link>
            <ul className="flex space-x-5">
                {links.map((link) => (
                    <li
                        key={link.href}
                        // EX1:
                        // className={`${
                        //     link.href === currentPath
                        //         ? "text-white"
                        //         : "text-zinc-500"
                        // } hover:text-white transition-colors`}

                        // EX2:
                        className={classnames({
                            "text-zinc-900": link.href === currentPath,
                            "text-zinc-400": link.href !== currentPath,
                            "hover:text-zinc-800 transition-colors": true,
                        })}
                    >
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
