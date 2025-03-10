import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/">Logo</Link> 
        <ul className='flex space-x-6'>
            <li><Link href='/'>Dashboard</Link></li>
            <li><Link href='/issues'>Issues</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar
