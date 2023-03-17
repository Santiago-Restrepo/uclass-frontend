import React from 'react'
import { useRouter } from 'next/router'
function Resource() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>resource {id}</div>
    )
}

export default Resource