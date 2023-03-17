import { useRouter } from 'next/router'
import React from 'react'

function Review() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>review {id}</div>
    )
}

export default Review