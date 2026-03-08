"use client";

import { useState } from "react";

export default function SignInPage() {
    const addUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (certify_data()) {
            setStyleUsername('bg-green-600');
            setStyleEmail('bg-green-600');
            setStylePassword('bg-green-600');
            const response = await fetch(`/api/usr/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "username": username, "email": email, "password": password }),
            });
            const messageRes = await response.json();
            console.log(messageRes.message);
            alert(messageRes.message);
            if (!response.ok) {
                setStyleUsername('bg-red-900');
                setStyleEmail('bg-red-900');
                setUsername('');
                setEmail('');
            } else {
                console.log(messageRes.data);
                window.location.href = '../login';
            };
        };
    };
    const certify_data = (): boolean => {
        if (username === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) || !/^[^\s]{8,}$/.test(password)) {
            if (username === '') {
                setStyleUsername('bg-red-900');
                console.log("Missing username !");
                alert("Missing username !");
                return false;
            } else setStyleUsername('bg-green-600');
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                setStyleEmail('bg-red-900');
                console.log("Invalid email !");
                alert("Invalid email !");
                return false;
            } else setStyleEmail('bg-green-600');
            if (!/^[^\s]{8,}$/.test(password)) {
                setStylePassword('bg-red-900');
                console.log("Invalid password (minimum 8 characters)");
                alert("Invalid password (minimum 8 characters)");
                return false;
            } else setStylePassword('bg-green-600');
        };
        return true;
    };
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [styleUsername, setStyleUsername] = useState("bg-green-600");
    const [styleEmail, setStyleEmail] = useState("bg-green-600");
    const [stylePassword, setStylePassword] = useState("bg-green-600");

    return (
        <div>
            <form>
                <input className={styleUsername} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" value={username} />
                <input className={styleEmail} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" value={email}/>
                <input className={stylePassword} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password} />
                <button onClick={(e) => addUser(e)} type="submit">Submit</button>
                <h1>Signin</h1>
            </form>
        </div>
    );
};
