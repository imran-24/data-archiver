
import { Link } from '@inertiajs/react'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/">
      <img
        className='hidden md:block cursor-pointer'
        width={40}
        height={40}
        src='/rupali-bank.png'
        alt='logo'
    />
    </Link>
  )
}

export default Logo