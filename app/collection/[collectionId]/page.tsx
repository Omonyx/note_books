"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import trash from "../../../public/trash.png";
import SearchBar from "../../../components/SearchBar/SearchBar";

export default function collectionPage({ params }: { params: Promise<{ collectionId: string }> }) {
    const addNewItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (itemValue != "") {
            addItem(itemValue, false);
            setItemStyle("bg-green-600");
            setItemValue("");
        } else {
            setItemStyle("bg-red-900");
        };
    };
    const saveItems = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/collection/${collectionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ "check": data.pageListChecked, "uncheck": data.pageListUnchecked }),
        });
        if (!response.ok) {
            console.log(response);
        } else {
            console.log("Updating !");
        };
    };
    const getCollection = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/collection/${collectionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const { data } = await response.json();
            setData(data);
        } else {
            alert("This collection isn't registred");
        };
    };
    const userCertify = async () => {
        const idUser = localStorage.getItem('tokener');
        if (!idUser) {
            alert('You aren\'t connected !');
            window.location.href = '../../login';
        } else {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usr/id/${idUser}`, {
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
    const changeCheck = async (item: number, checked: Boolean) => {
        if (checked) {
            const itemToUncheck = data.pageListChecked[item];
            deleteItem(item, checked);
            addItem(itemToUncheck, !checked);
        } else {
            const itemToCheck = data.pageListUnchecked[item];
            deleteItem(item, checked);
            addItem(itemToCheck, !checked);
        };
    };
    const addItem = (item: String, checked: Boolean) => {
        if (checked) {
            let new_checkedList = data.pageListChecked;
            new_checkedList.unshift(item);
            setData({ id: data.id, name: data.name, pageListChecked: new_checkedList, pageListUnchecked: data.pageListUnchecked });
        } else {
            let new_uncheckedList = data.pageListUnchecked;
            new_uncheckedList.unshift(item);
            setData({ id: data.id, name: data.name, pageListChecked: data.pageListChecked, pageListUnchecked: new_uncheckedList });
        };
    };
    const deleteItem = (index: number, checked: Boolean) => {
        if (checked) {
            const new_checkedList = data.pageListChecked;
            new_checkedList.splice(index, 1);
            setData({id: data.id, name: data.name, pageListChecked: new_checkedList, pageListUnchecked: data.pageListUnchecked});
        } else {
            let new_uncheckedList = data.pageListUnchecked;
            new_uncheckedList.splice(index, 1);
            setData({id: data.id, name: data.name, pageListChecked: data.pageListChecked, pageListUnchecked: new_uncheckedList});
        };
    };
    const deleteItemElement = (item: any, version: String) => {
        let li = item.parentElement.parentElement.parentElement;
        if (version === "check") {
            deleteItem(parseInt(li.dataset.id), true);
        } else {
            deleteItem(parseInt(li.dataset.id), false);
        };
    };
    const upperInitial = (str: String) => {
        return str[0].toUpperCase() + str.substring(1, str.length);
    };

    const [data, setData] = useState<any>(null);
    const [itemStyle, setItemStyle] = useState("bg-green-600");
    const [itemValue, setItemValue] = useState("");
    const [checkedOne, setCheckedOne] = useState(true);
    const { collectionId } = use(params);

    useEffect(() => {
        userCertify();
        getCollection();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mr-2 ml-2">
                <h2>COLLECTION PAGE : {data?.name}</h2>
                <SearchBar adder={true} />
            </div>
            <form className="mt-5 mb-5">
                <input onChange={(e) => setItemValue(e.target.value)} className={`${itemStyle} mr-2`} type="text" placeholder="Add item" value={itemValue} />
                <button onClick={(e) => addNewItem(e)} type="submit">Add</button>
                <button onClick={() => saveItems()} className="text-red-800 bg-red-500 pt-1 pb-1 pl-2 pr-2 rounded-lg ml-5 duration-300 hover:text-red-500 hover:bg-red-800 hover:cursor-pointer">Save</button>
            </form>
            <div className="flex justify-around">
                <ul className="mt-5 mb-5" id="uncheck">
                    {data?.pageListUnchecked?.map((e: any, i: number) => (
                        <li key={i} data-id={i}>
                            <div className="flex align-center justify-between w-fit">
                                <input onChange={() => changeCheck(i, false)} className="accent-green-600" type="checkbox" checked={!checkedOne} />
                                <div className="ml-1 mr-2 mt-1 mb-1">{upperInitial(e)}</div>
                                <button onClick={(e) => deleteItemElement(e.target, "uncheck")}><Image src={trash} width={24} height={24} alt='Trash' /></button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="bg-white w-2 h-auto rounded"></div>
                <ul className="mt-5 mb-5" id="check">
                    {data?.pageListChecked?.map((e: any, i: number) => (
                        <li key={i} data-id={i}>
                            <div className="flex align-center justify-between w-fit">
                                <input onChange={() => changeCheck(i, true)} className="accent-green-600" type="checkbox" checked={checkedOne} />
                                <div className="ml-1 mr-2 mt-1 mb-1">{upperInitial(e)}</div>
                                <button onClick={(e) => deleteItemElement(e.target, "check")}><Image src={trash} width={24} height={24} alt='Trash' /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
