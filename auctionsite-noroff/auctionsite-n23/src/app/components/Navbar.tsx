import Link from 'next/link'
import React from 'react'

interface Props { }

const Navbar = () => {
  return <div className='flex p-5 gap-3 items-center'>
    <Link href="" className='border px-3 py-3 rounded-3xl'>
      Login
    </Link>
    <small>or</small>
    <Link href="" className='border px-3 py-3 rounded-3xl'>
      Register
    </Link>

  </div>

}

export default Navbar