'use client'

import { FormEditor } from './FormEditor'

import schema from './form.json'

import { Range } from '../../form-fields'

export default function Preview() {

  return (
    <main className="flex flex-col h-full">
      <FormEditor 
        schema={ schema } 
        data={ {} }
        extensions={ [
          Range
        ] } />
    </main>
  )
}