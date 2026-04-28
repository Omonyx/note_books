"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
    adder: Boolean,
};

export default function searchBar({ adder }: Props) {
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
    const addUserInCollection = async (e: React.MouseEvent<HTMLButtonElement>, userId: String) => {
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usr/id/${userId}`, {
            method: 'PATCH',
            headers: {
                    "Content-Type": "application/json",
            },
            body: JSON.stringify({ "collectionId": pathname.substring(12, pathname.length) }),
            },
        );
        alert("User added !");
        setResultSearch([]);
        setSearch("");
    };

    const pathname = usePathname();
    const [resultSearch, setResultSearch] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        searchUser();
    }, [search]);

    return (
        <form className="relative">
            <input className="bg-[rgb(10,10,10)] ml-4 border-3 pl-2 pt-1 pb-1 rounded-xl focus:outline-none focus:ring-0" onChange={(e) => setSearch(`${e.target.value}`)} type="text" placeholder={adder ? "Add user" : "Search a user..."} value={search} />
            <div>
                {resultSearch.length === 0 ? "" : (
                    <div className="absolute bg-[rgb(10,10,10)] left-0 w-full mt-2 border-2 p-2 border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        {resultSearch.map((e: any, i: number) => {// #0A0A0A - #171717
                            return (
                                <div className="flex items-center justify-between rounded pl-2 pt-1 pb-1 pr-2 duration-300 hover:text-black hover:bg-gray-200 hover:cursor-pointer" key={i}>
                                    <a href={`/usr/${e.username_lower}`}>{e.username}</a>
                                    <div>{adder ? ! e.collections.includes(pathname.substring(12, pathname.length)) ? <button onClick={(evt) => addUserInCollection(evt, e.token)} className="text-white bg-green-500 p-1 rounded duration-300 hover:text-black hover:bg-green-400 hover:cursor-pointer">+ ajouter</button> : <div className="text-white bg-green-500 p-1 rounded duration-300 hover:text-black hover:bg-green-400">Added</div> : ""}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </form>
    )
}