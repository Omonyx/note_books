"use server";

export default async function UserPage({ params }: any) {
    const { username } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/usr/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("User didn't exist");
    };
    const data = await response.json();

    return (
        <div>
            <h1>Profil de {username}</h1>
            <div>My collections : </div>
            <ul>
                {data?.data?.collections?.id?.map((e: any, i: number) => {
                    const g = Math.floor(Math.random() * 255);
                    return (
                        <li key={i} style={{ backgroundColor: `rgb(20, ${g}, 20)` }} className={`rounded-xl w-fit pr-2 pl-2 pt-1 pb-1`}><a href={`${process.env.NEXT_PUBLIC_URL}/collection/` + e}>{data.data.collections.name[i]}</a></li>
                    );
                })}
            </ul>
        </div>
    )
}
