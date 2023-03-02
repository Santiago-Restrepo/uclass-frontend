import React from 'react'
import { useRouter } from 'next/router'
function resource() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>resource {id}</div>
    )
}

export default resource