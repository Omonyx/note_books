"use server";

export default async function UserPage({ params }: any) {
    const { username } = await params;
    const response_user = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usr/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response_user.ok) {
        throw new Error("User didn't exist");
    };
    const data = await response_user.json();
    const response_collection = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/collection/getmulti`, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({"collectionIds": data.data[0].collections}),
    });
    const collections = await response_collection.json();

    return (
        <div>
            <h1>Profil de {username}</h1>
            <div>My collections : </div>
            <ul>
                {collections?.data?.map((e: any, i: number) => {
                    return (
                        <li key={i} style={{ backgroundColor: e.color }} className={`rounded-xl w-fit pr-2 pl-2 pt-1 pb-1`}><a href={`${process.env.NEXT_PUBLIC_URL}/collection/` + e.id}>{e.name}</a></li>
                    );
                })}
            </ul>
        </div>
    )
}
