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

        const [resultSearch, setResultSearch] = useState([]);
        const [search, setSearch] = useState("");

        useEffect(() => {
            searchUser();
        }, [search]);

    return (
        <form className="relative">
            <input className="ml-4" onChange={(e) => setSearch(`${e.target.value}`)} type="text" placeholder="Search a user..." value={search} />
            <button onClick={(e) => e.preventDefault()} className="ml-5 mr-4 hover:cursor-pointer" type="submit" >Search</button>
            <div>
                {resultSearch.length === 0 ? (<div></div>) : (
                    <div className="absolute left-0 w-full mt-2 border-2 p-2 border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        {resultSearch.map((e: any, i: number) => {
                            return (
                                <a className="flex rounded pl-2 pt-1 pb-1 duration-300 hover:text-black hover:bg-gray-200 hover:cursor-pointer" href={`/usr/${e.username_lower}`} key={i}>{e.username}</a>
                            );
                        })}
                    </div>
                )}
            </div>
            
        </form>
    )
}