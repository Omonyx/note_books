"use client"

import Image from "next/image";
import homeIcon from '../public/homeIcon.png';
import { useState, useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const getUser = async () => {
    if (localStorage.getItem("tokener")) {
      const response = await fetch(`http://localhost:3000/api/usr/id/${localStorage.getItem("tokener")}`);
      if (response.ok) {
        const infos = await response.json();
        setUsername(infos.data.username);
      };
    };
  };

  const [username, setUsername] = useState("Log in");

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
          <div className="">NOTE BOOK</div>
          <a href="/login">{username}</a>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
