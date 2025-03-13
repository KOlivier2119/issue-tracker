import { Button } from '@radix-ui/themes'
import React from 'react'
import { Link } from 'react-router-dom'

const IssueActions = () => {
    return (
        <div className="mb-5">
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </div>
    )
}

export default IssueActions
