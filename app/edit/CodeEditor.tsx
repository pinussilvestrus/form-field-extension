'use client';

import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';


import Image from 'next/image';

export function CodeEditor({ value, title, language, fileName, logo, handleChange, handleLoaded }: {
  title: string,
  value: string,
  language: string,
  fileName: string,
  logo: { url: string, alt: string },
  handleChange?: (newValue: string|undefined, fileName: string) => void,
  handleLoaded: (editor: editor.IStandaloneCodeEditor) => void
}) {
  return (
    <div className="w-1/2 p-2">
      <div className="flex justify-between p-2 text-white bg-slate-600 items-center">
        <h2 className='text-white'>{title}</h2>
        <Image
          src={ logo.url }
          alt={ logo.alt }
          width={30}
          height={30}
          priority
       />
      </div>
      <Editor
        onChange={(value) => handleChange && handleChange(value, fileName)}
        onMount={ handleLoaded }
        height="85vh"
        defaultLanguage={ language }
        defaultValue={ value }
      />
    </div>
  );
}