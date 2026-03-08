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

    const [data, setData] = useState<any>(null);
    const [taskStyle, setTaskStyle] = useState("bg-green-600");
    const [taskValue, setTaskValue] = useState("");
    const { bookId } = use(params);

    useEffect(() => {
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
