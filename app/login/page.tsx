"use client";

import { useState } from "react";
import BasicInput from "../../components/BasicInput/BasicInput";

export default function LogInPage() {
    const getUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (certify_data()) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usr/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "username": username, "password": password }),
            });
            if (!response.ok) {
                if (response.status === 404) {
                    setStyleUsername('rgb(100,10,10)');
                    setUsername('');
                };
                setStylePassword('rgb(100,10,10)');
                setPassword('');
            } else {
                const messageRes = await response.json();
                console.log(messageRes.message);
                localStorage.setItem('tokener', messageRes.data.token);
                alert(messageRes.message);
                window.location.href = '../';
            };
        };
    };
    const certify_data = (): boolean => {
        if (username === '') {
            setStyleUsername('rgb(100,10,10)');
            console.log('Missing username !');
            alert('Missing username !');
            return false;
        };
        if (password === '') {
            setStylePassword('rgb(100,10,10)');
            console.log('Missing password !');
            alert('Missing password !');
            return false;
        };
        return true;
    };

    const changeStyleUsername = (e: string) => {
        setUsername(e);
        setStyleUsername("rgb(10,10,10)");
    };
    const changeStylePassword = (e: string) => {
        setPassword(e);
        setStylePassword("rgb(10,10,10)");
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [styleUsername, setStyleUsername] = useState('bg-green-600');
    const [stylePassword, setStylePassword] = useState('bg-green-600');

    return (
        <div>
            <form className="flex mt-10 mb-5">
                <BasicInput placeholderer="Username" value={username} color={styleUsername} changing={changeStyleUsername} />
                <BasicInput placeholderer="Password" value={password} color={stylePassword} changing={changeStylePassword} type="password" />
                <button className="text-red-800 bg-red-500 pt-1 pb-1 pl-2 pr-2 rounded-lg ml-5 duration-300 hover:text-red-500 hover:bg-red-800 hover:cursor-pointer" onClick={(e) => getUser(e)} type='submit'>Log in</button>
            </form>
            <div>You don't have an account ? Come to <a className="text-blue-600" href="../signin">sign in</a> !</div>
        </div>
    );
};
