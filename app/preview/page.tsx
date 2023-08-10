'use client'

import { FormEditor } from './FormEditor'

import schema from './form.json'

import { CustomFormFields } from '../../form-fields'

export default function Preview() {

  return (
    <main className="flex flex-col h-full">
      <FormEditor 
        schema={ schema } 
        data={ {} }
        extensions={ CustomFormFields } />
    </main>
  )
}