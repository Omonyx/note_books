"use client"

import { useState } from "react";

export default function BookHandlePage() {
    const createBook = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (inputValue !== "") {
            setInputStyle("bg-green-600");
            const response = await fetch(`/api/book/${inputValue}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "name": inputValue }),
            });
            const messageRes = await response.json();
            console.log(messageRes.message);
            alert(messageRes.message);
            if (!response.ok) {
                setInputStyle("bg-red-900")
            } else {
                console.log(messageRes.data);
                window.location.href = '../';
            };
        } else {
            setInputStyle("bg-red-900");
            console.log("Missing name !");
            alert("Missing name !");
        };
    };

    const [inputValue, setInputValue] = useState("");
    const [inputStyle, setInputStyle] = useState("bg-green-600");

    return (
        <div>
            <form>
                <input onChange={(e) => setInputValue(e.target.value)} className={inputStyle} type="text" placeholder="Book name" value={inputValue}/>
                <button onClick={(e) => createBook(e)} type="submit">Create</button>
            </form>
        </div>
    )
}