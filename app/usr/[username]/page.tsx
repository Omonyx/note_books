import { notFound } from "next/navigation"

export default async function UserPage({ params }: any) {
    const { username } = await params;
    const response = await fetch(`http://localhost:3000/api/usr/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
        notFound();
    }

    return (
        <div>
            <h1>Profil de {username}</h1>
        </div>
    )
}
