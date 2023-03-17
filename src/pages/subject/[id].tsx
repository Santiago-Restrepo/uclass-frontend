import { useRouter } from 'next/router'
import React from 'react'
function Subject() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>subject {id}</div>
    )
}

export default Subject