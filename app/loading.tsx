"use client"

import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function Loading() {
  return (
    <div style={{ padding: "20px" }}>
      <Skeleton height={30} width="40%" />
      <Skeleton height={20} count={3} style={{ marginTop: 10 }} />
    </div>
  )
}
