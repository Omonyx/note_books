"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="ml-5">
      <Skeleton className="mt-2" height={20} width={125} count={2} />
      <Skeleton className="mt-3" height={20} width={300} />
    </div>
  );
};
