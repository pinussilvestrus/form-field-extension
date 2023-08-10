import Image from 'next/image'
import Link from 'next/link'

import Btn from './Btn'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto">
          Get started by selecting an extension
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/next.svg"
              alt="Next Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className="max-w-5xl w-full justify-between flex">
        <div className="left-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          <Link href="/edit/range"><Btn title="Number range" /></Link>
          <Link href="/edit/file"><Btn title="File input" /></Link>
          <Btn title="bar" />
          <Btn title="xxx" />
        </div>
      </div>
      <div className="max-w-5xl flex flex-col w-full">
        <p className="fixed left-0 top-0 flex w-full pb-6 pt-8 lg:static lg:w-auto">
          Or open the preview directly
        </p>
        <Link href="/preview"><Btn title='Open preview'></Btn></Link>
      </div>
    </main>
  )
}
