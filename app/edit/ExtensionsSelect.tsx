'use client'

import { CustomFormFields } from '@/form-fields';

export function ExtensionsSelect({ selected }: {
  selected: string
}) {

  function handleExtensionChange(event: any) {
    document.location.href = `/edit/${event.target.value}`;
  }

  return (
    <select onChange={handleExtensionChange} aria-label="Select extension" value={ selected } className="bg-gray-50 border ml-2 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      { CustomFormFields.map(({ key }) => {
        return <option key={ key }>{ key }</option>
      } ) }
    </select>
  )
}