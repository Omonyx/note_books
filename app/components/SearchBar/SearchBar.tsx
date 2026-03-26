"use client";

import { useState, useEffect } from "react";

export default function searchBar() {
    const searchUser = async () => {
        if (search != "") {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usr/${search}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            });
            if (response.ok) {
                const data = await response.json();
                setResultSearch(data.data);
            };
        } else {
            setResultSearch([]);
        };
    };

        const [resultSearch, setResultSearch] = useState<any>([]);
        const [search, setSearch] = useState("");

        useEffect(() => {
            const delay = setTimeout(() => {
                searchUser();
            }, 100)

            return () => clearTimeout(delay)
        }, [search])

    return (
        <form className="relative">
            <input onChange={(e) => setSearch(`${e.target.value}`)} type="text" placeholder="Search a user..." value={search} />
            <div className="absolute top-full left-0 w-full mt-2 bg-red border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {resultSearch.map((e: any, i: number) => {
                    return (
                        <div key={i}>{e.username}</div>
                    );
                })}
            </div>
            <button onClick={(e) => e.preventDefault()} className="hover:cursor-pointer" type="submit" >Search</button>
        </form>
    )
}