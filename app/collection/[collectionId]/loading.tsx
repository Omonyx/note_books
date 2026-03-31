"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
    return (
        <div className="ml-5">
            <Skeleton height={20} width={250} />
            <div className="flex items-center">
                <Skeleton height={30} width={225} />
                <Skeleton className="ml-1" height={30} width={30} />
                <Skeleton className="ml-2" height={30} width={50} />
            </div>
            <div className="flex justify-around items-center mt-5">
                <Skeleton height={400} width={450} />
                <Skeleton height={400} width={10} />
                <Skeleton height={400} width={450} />
            </div>
        </div>
    );
};
