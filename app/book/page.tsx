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
                addBookToUser(messageRes.id);
            };
        } else {
            setInputStyle("bg-red-900");
            console.log("Missing name !");
            alert("Missing name !");
        };
    };
    const addBookToUser = async (bookId: String) => {
        const userId = localStorage.getItem('tokener');
        console.log(userId);
        const response = await fetch(`http://localhost:3000/api/usr/id/${userId}`, {
            method: 'PATCH',
            headers: {
                    "Content-Type": "application/json",
            },
            body: JSON.stringify({ "bookId": bookId }),
            },
        );
        window.location.href = `./book/${bookId}`;
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