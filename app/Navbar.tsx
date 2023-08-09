import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-6">
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
        <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
          Extensions
        </Link>
        <Link href="/preview" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
          Preview
        </Link>
        <Link href="/about" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white">
          About
        </Link>
      </div>
    </div>
  </nav>
  )
}