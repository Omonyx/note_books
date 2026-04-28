"use client";

type Props = {
    placeholderer: string,
    value: string,
    color: string,
    changing: (value: string) => void,
    type?: string,
};

export default function basicInput({ placeholderer, value, color, changing, type="text" }: Props) {

    return (
        <div>
        <input style={{ backgroundColor: color }} className="ml-4 border-3 pl-2 pt-1 pb-1 rounded-xl focus:outline-none focus:ring-0 duration-300" onChange={(e) => changing(e.target.value)} type={type} placeholder={placeholderer} value={value} />
        </div>
    )
};