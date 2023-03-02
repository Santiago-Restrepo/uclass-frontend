import { useRouter } from 'next/router'
import React from 'react'
function teacher() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>teacher {id}</div>
    )
}

export default teacher