"use client";

import { useState } from "react";
import BasicInput from "../../components/BasicInput/BasicInput";

export default function SignInPage() {
    const addUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (certify_data()) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usr/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "username": username, "email": email, "password": password }),
            });
            if (!response.ok) {
                setStyleUsername('rgb(100,10,10)');
                setStyleEmail('rgb(100,10,10)');
                setUsername('');
                setEmail('');
            } else {
                const messageRes = await response.json();
                console.log(messageRes.message);
                alert(messageRes.message);
                console.log(messageRes.data);
                window.location.href = '../login';
            };
        };
    };
    const certify_data = (): boolean => {
        console.log(username);
        if ((25 >= username.length && username.length > 0) || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) || !/^[^\s]{8,}$/.test(password)) {
            if ((25 < username.length && username.length <= 0)) {
                setStyleUsername('rgb(100,10,10)');
                console.log("Invalid username (Between 1 and 25 characters) !");
                alert("Invalid username (Between 1 and 25 characters) !");
                return false;
            };
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                setStyleEmail('rgb(100,10,10)');
                console.log("Invalid email !");
                alert("Invalid email !");
                return false;
            };
            if (!/^[^\s]{8,}$/.test(password)) {
                setStylePassword('rgb(100,10,10)');
                console.log("Invalid password (minimum 8 characters)");
                alert("Invalid password (minimum 8 characters)");
                return false;
            };
        };
        return true;
    };
    const changeStyleUsername = (e: string) => {
        setUsername(e);
        setStyleUsername("rgb(10,10,10)");
    };
    const changeStyleEmail = (e: string) => {
        setEmail(e);
        setStyleEmail("rgb(10,10,10)");
    };
    const changeStylePassword = (e: string) => {
        setPassword(e);
        setStylePassword("rgb(10,10,10)");
    };

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [styleUsername, setStyleUsername] = useState("rgb(10,10,10)");
    const [styleEmail, setStyleEmail] = useState("rgb(10,10,10)");
    const [stylePassword, setStylePassword] = useState("rgb(10,10,10)");

    return (
        <div>
            <form className="flex mt-10 mb-5">
                <BasicInput placeholderer="Username" value={username} color={styleUsername} changing={changeStyleUsername} />
                <BasicInput placeholderer="Email" value={email} color={styleEmail} changing={changeStyleEmail} type="email" />
                <BasicInput placeholderer="Password" value={password} color={stylePassword} changing={changeStylePassword} type="password" />
                <button className="text-red-800 bg-red-500 pt-1 pb-1 pl-2 pr-2 rounded-lg ml-5 duration-300 hover:text-red-500 hover:bg-red-800 hover:cursor-pointer" onClick={(e) => addUser(e)} type="submit">Submit</button>
            </form>
            <div>You already have an account ? Come to <a className="text-blue-600" href="../login">log in</a> !</div>
        </div>
    );
};
