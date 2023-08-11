'use client';

import { FormEditor } from './FormEditor';

import { CustomFormFields } from '@/form-fields';

import schema from './form.json';

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