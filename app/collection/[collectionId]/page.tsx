"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import trash from "../../../public/trash.png";

export default function collectionPage({ params }: { params: Promise<{ collectionId: string }> }) {
    const addItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (itemValue != "") {
            setItemStyle("bg-green-600")
            const parent = document.querySelector("#uncheck");
            const childLi = document.createElement("li");
            childLi.innerHTML += "<div class='flex align-center justify-between w-fit'><input type='checkbox' /><div class='ml-1 mr-2 mt-1 mb-1'>" + itemValue + "</div><button><img src='/trash.png' class='w-6 h-6' alt='Trash' /></button></div>";
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
    const deleteItem = (item: any, version: String) => {
        const li = item.parentElement.parentElement.parentElement;
        if (version == "check") {
            data.data.pageListChecked.pop(li.dataset.id);
        } else {
            data.data.pageListUnchecked.pop(li.dataset.id);
        };
        li.remove();
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
                    <li key={i} data-id={i}>
                        <div className="flex align-center justify-between w-fit">
                            <input type="checkbox" />
                            <div className="ml-1 mr-2 mt-1 mb-1">{e}</div>
                            <button onClick={(e) => deleteItem(e.target, "uncheck")}><Image src={trash} width={24} height={24} alt='Trash' /></button>
                        </div>
                    </li>
                ))}
            </ul>
            <ul id="check">
                {data?.data?.pageListChecked?.map((e: any, i: number) => (
                    <li key={i} data-id={i}>
                        <div className="flex align-center justify-between w-fit">
                            <input type="checkbox" defaultChecked={true} />
                            <div className="ml-1 mr-2 mt-1 mb-1">{e}</div>
                            <button onClick={(e) => deleteItem(e.target, "check")}><Image src={trash} width={24} height={24} alt='Trash' /></button>
                        </div>
                    </li>
                ))}
            </ul>
            <div onClick={handleChecked} className="text-red-800 bg-red-500 pt-1 pb-1 pl-2 pr-2 rounded-lg ml-5 duration-300 hover:text-red-500 hover:bg-red-800 hover:cursor-pointer">Save</div>
        </div>
    );
};
