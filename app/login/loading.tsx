"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
    return (
        <div>
            <div className="flex items-center ml-5">
                <Skeleton height={30} width={225} />
                <Skeleton className="ml-2" height={30} width={225} />
                <Skeleton className="ml-2" height={30} width={50} />
            </div>
            <div>
                <Skeleton className="mt-5 ml-5" height={15} width={375} />
            </div>
        </div>
    );
};
