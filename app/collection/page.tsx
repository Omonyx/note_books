"use client";

import { useState } from "react";

export default function CollectionHandlePage() {
    const createCollection = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (inputValue !== "") {
            setInputStyle("bg-green-600");
            const response = await fetch(`/api/collection/${inputValue}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "name": inputValue, "color": colorValue }),
            });
            const messageRes = await response.json();
            console.log(messageRes.message);
            alert(messageRes.message);
            if (!response.ok) {
                setInputStyle("bg-red-900")
            } else {
                addCollectionToUser(messageRes.id);
            };
        } else {
            setInputStyle("bg-red-900");
            console.log("Missing name !");
            alert("Missing name !");
        };
    };
    const addCollectionToUser = async (collectionId: String) => {
        const userId = localStorage.getItem('tokener');
        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usr/id/${userId}`, {
            method: 'PATCH',
            headers: {
                    "Content-Type": "application/json",
            },
            body: JSON.stringify({ "collectionId": collectionId, "collectionName": inputValue }),
            },
        );
        window.location.href = `./collection/${collectionId}`;
    };

    const [inputValue, setInputValue] = useState("");
    const [colorValue, setColorValue] = useState("#ff0000");
    const [inputStyle, setInputStyle] = useState("bg-green-600");

    return (
        <div>
            <form className="flex items-center">
                <input onChange={(e) => setInputValue(e.target.value)} className={inputStyle} type="text" placeholder="Collection name" value={inputValue}/>
                <input className="ml-1 mr-5" onChange={(e) => setColorValue(e.target.value)} type="color" value={colorValue} />
                <button className="text-red-800 bg-red-500 pt-1 pb-1 pl-2 pr-2 rounded-lg duration-300 hover:text-red-500 hover:bg-red-800 hover:cursor-pointer" onClick={(e) => createCollection(e)} type="submit">Create</button>
            </form>
        </div>
    )
}