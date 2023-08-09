'use client'

import Link from 'next/link'

import { FormEditor } from './FormEditor'

import schema from './form.json'

import { Range } from '../../form-fields'

export default function Preview() {

  return (
    <main className="flex flex-col h-full">
      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white pt-1 pb-1 pl-2 pr-2 text-sm absolute top-2 left-[160px] z-10">
          Edit fields
        </button>
      </Link>
      <FormEditor 
        schema={ schema } 
        data={ {} }
        extensions={ [
          Range
        ] } />
    </main>
  )
}