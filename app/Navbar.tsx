import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black px-6 py-4">
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
        <NavLink href="/">
          Extensions
        </NavLink>
        <NavLink href="/preview">
          Preview
        </NavLink>
        <NavLink href="/about">
          About
        </NavLink>
      </div>
    </div>
  </nav>
  )
}

function NavLink({ href, children }: { 
  href: string, 
  children: React.ReactNode 
}) {
  return (
    <Link href={ href } className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 cursor-pointer">
      { children }
    </Link>
  )
}