"use client"

import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function Loading() {
  return (
    <div style={{ padding: "20px" }}>
      <Skeleton height={30} width="20%" />
      <Skeleton height={20} width="30%" style={{ marginTop: 10 }} />
      <Skeleton height={120} width="75%" style={{ marginTop: 10 }} />
    </div>
  )
}
