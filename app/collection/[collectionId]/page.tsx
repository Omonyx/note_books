"use client";

import { use, useState, useEffect } from "react";

export default function collectionPage({ params }: { params: Promise<{ collectionId: string }> }) {
    const addItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (itemValue != "") {
            setItemStyle("bg-green-600")
            const parent = document.querySelector("#uncheck");
            const childLi = document.createElement("li");
            childLi.innerHTML += "<input type='checkbox' />" + " " + itemValue;
            parent?.appendChild(childLi);
            setItemValue("");
        } else {
            setItemStyle("bg-red-900");
        };
    };
    const handleItem = async (checkedList: Array<String | undefined>, uncheckedList: Array<String | undefined>) => {
        const response = await fetch(`http://localhost:3000/api/collection/${collectionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "check": checkedList, "uncheck": uncheckedList }),
        });
        if (!response.ok) {
            console.log(response);
        } else {
            console.log("Updating !");
        };
    };
    const getCollection = async () => {
        const response = await fetch(`http://localhost:3000/api/collection/${collectionId}`, {
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
                const allCollection = new Set(user.data.collections);
                if (!allCollection.has(collectionId)) {
                    alert('You aren\'t in this note collection !');
                    window.location.href = '../../';
                };
            };
        };
    };
    const handleChecked = () => {
        let falseList: (String | undefined)[] = [];
        let trueList: (String | undefined)[] = [];
        document.querySelectorAll<HTMLInputElement>("input[type='checkbox']").forEach((e, i) => {
            if (!e.checked) falseList.push(e.parentElement?.innerText);
            else trueList.push(e.parentElement?.innerText);
        });
        handleItem(trueList, falseList);
    };

    const [data, setData] = useState<any>(null);
    const [itemStyle, setItemStyle] = useState("bg-green-600");
    const [itemValue, setItemValue] = useState("");
    const { collectionId } = use(params);

    useEffect(() => {
        userCertify();
        getCollection();
    }, []);

    return (
        <div>
            <h2>COLLECTION PAGE : {data?.data.name}</h2>
            <form>
                <input onChange={(e) => setItemValue(e.target.value)} className={itemStyle} type="text" placeholder="Add item" value={itemValue} />
                <button onClick={(e) => addItem(e)} type="submit">Add</button>
            </form>
            <ul id="uncheck">
                {data?.data?.pageListUnchecked?.map((e: any, i: number) => (
                    <li key={i}>
                        <div>
                            <input type="checkbox" /> {e}
                        </div>
                    </li>
                ))}
            </ul>
            <ul id="check">
                {data?.data?.pageListChecked?.map((e: any, i: number) => (
                    <li key={i}>
                        <div>
                            <input type="checkbox" defaultChecked={true} /> {e}
                        </div>
                    </li>
                ))}
            </ul>
            <div onClick={handleChecked} className="text-red-800 bg-red-500 pt-1 pb-1 pl-2 pr-2 rounded-lg ml-5 duration-300 hover:text-red-500 hover:bg-red-800 hover:cursor-pointer">Save</div>
        </div>
    );
};
