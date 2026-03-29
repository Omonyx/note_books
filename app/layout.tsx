"use client";

import Image from "next/image";
import homeIcon from '../public/homeIcon.png';
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const getUser = async () => {
    if (localStorage.getItem("tokener")) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usr/id/${localStorage.getItem("tokener")}`);
      if (response.ok) {
        const infos = await response.json();
        setUsername(infos.data.username);
        setLinkUsername("/usr/" + infos.data.username);
      };
    };
  };

  const pathname = usePathname();
  const [username, setUsername] = useState("Log in");
  const [linkUsername, setLinkUsername] = useState("/login");

  useEffect(() => {
    getUser();
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Note book</title>
      </head>
      <body>
        <div className="mb-10 pt-5 pb-5 flex justify-around items-center border-b-3">
          <a className="hover:cursor-pointer" href="/"><Image src={homeIcon} width={55} height={55} alt="home icon" /></a>
          {pathname === "/" ? <SearchBar adder={false} /> : <div className="w-20"></div>}
          <a className="text-2xl" href={linkUsername}>{username}</a>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
