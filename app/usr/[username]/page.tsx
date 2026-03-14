"use client";

import { randomInt } from "crypto";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";

export default function UserPage({ params }: any) {
    const getUser = async () => {
        const { username } = await params;
        setUsername(username);
        const response = await fetch(`http://localhost:3000/api/usr/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
        if (!response.ok) {
            notFound();
        } else {
            setData(await response.json());
        };
    };
    
    const [data, setData] = useState<any>(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <h1>Profil de {username}</h1>
            <div>My collections : </div>
            <ul>
                {data?.data?.collections?.id?.map((e: any, i: number) => {
                    const g = Math.floor(Math.random() * 255);

                    return (
                        <li key={i} style={{ backgroundColor: `rgb(20, ${g}, 20)` }} className={`rounded-xl w-fit pr-2 pl-2 pt-1 pb-1`}><a href={"http://localhost:3000/collection/" + e}>{data.data.collections.name[i]}</a></li>
                    );
                })}
            </ul>
        </div>
    )
}
