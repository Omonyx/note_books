"use client";

import { use, useState, useEffect } from "react";

export default function bookPage({ params }: { params: Promise<{ bookId: string }> }) {
    const addTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (taskValue !== "") {
            const response = await fetch(`http://localhost:3000/api/book/${bookId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "task": taskValue }),
            });
            if (!response.ok) {
                alert('trucé');
                console.log(response);
            } else {
                const jsonData = await response.json();
                console.log(jsonData);
            }
        } else {
            setTaskStyle("bg-red-900");
            console.log("Missing Task's name");
            alert("Missing task's name");
        };
    };
    const getBook = async () => {
        const response = await fetch(`http://localhost:3000/api/book/${bookId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            setData(await response.json());
        } else {
            alert('error');
        };
    };
    const userCertify = async () => {
        const idUser = localStorage.getItem('tokener');
        if (!idUser) {
            alert('You aren\'t connected !');
            window.location.href = '../../login';
        } else {
            const response = await fetch(`http://localhost:3000/api/usr/id/${idUser}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                console.log('problem');
            } else {
                const user = await response.json();
                const allBook = new Set(user.data.books);
                if (!allBook.has(bookId)) {
                    alert('You aren\'t in this note book !');
                    window.location.href = '../../';
                };
            };
        };
    };

    const [data, setData] = useState<any>(null);
    const [taskStyle, setTaskStyle] = useState("bg-green-600");
    const [taskValue, setTaskValue] = useState("");
    const { bookId } = use(params);

    useEffect(() => {
        userCertify();
        getBook();
    }, []);

    return (
        <div>
            <h2>BOOK PAGE : {data?.data.name}</h2>
            <form>
                <input onChange={(e) => setTaskValue(e.target.value)} className={taskStyle} type="text" placeholder="Add task" value={taskValue} />
                <button onClick={(e) => addTask(e)} type="submit">Add</button>
            </form>
            <ul>
                {data?.data.checkList.map((e: any, i: any) => (
                    <li key={i}>
                        <div><input type="checkbox"/></div>
                        <div>{e}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
