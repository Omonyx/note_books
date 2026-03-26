"use client"

import Image from "next/image";
import homeIcon from '../public/homeIcon.png';
import { useState, useEffect } from "react";
import "./globals.css";
import SearchBar from "./components/SearchBar/SearchBar";

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
        <div className="mt-5 flex justify-around">
          <a className="hover:cursor-pointer" href="/"><Image src={homeIcon} width={45} height={45} alt="home icon" /></a>
          <SearchBar />
          <a href={linkUsername}>{username}</a>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
