"use client";

import { useState } from "react";

export default function LogInPage() {
    const getUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (certify_data()) {
            const response = await fetch(`/api/usr/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "username": username, "password": password }),
            });
            if (!response.ok) {
                if (response.status === 404) {
                    setStyleUsername('bg-red-900');
                    setUsername('');
                };
                setStylePassword('bg-red-900');
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
            setStyleUsername('bg-red-900');
            console.log('Missing username !');
            alert('Missing username !');
            return false;
        } else setStyleUsername('bg-green-600');
        if (password === '') {
            setStylePassword('bg-red-900');
            console.log('Missing password !');
            alert('Missing password !');
            return false;
        } else setStylePassword('bg-green-600');
        return true;
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [styleUsername, setStyleUsername] = useState('bg-green-600');
    const [stylePassword, setStylePassword] = useState('bg-green-600');

    return (
        <div>
            <form>
                <input className={styleUsername} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" value={username} />
                <input className={stylePassword} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password} />
                <button className="text-red-800 bg-red-500 pt-1 pb-1 pl-2 pr-2 rounded-lg ml-5 duration-300 hover:text-red-500 hover:bg-red-800 hover:cursor-pointer" onClick={(e) => getUser(e)} type='submit'>Log in</button>
            </form>
            <div>You don't have an account ? Come to <a className="text-blue-600" href="../signin">sign in</a> !</div>
        </div>
    );
}