"use client"

import Editor from '@monaco-editor/react';

export function CodeEditor({ value, title, language, fileName, handleChange }: {
  title: string,
  value: string,
  language: string,
  fileName: string,
  handleChange: (newValue: string|undefined, fileName: string) => void
}) {
  return (
    <div className="w-1/2 p-2">
      <h2 className='p-2 text-white bg-slate-600'>{title}</h2>
      <Editor
        onChange={(value) => handleChange(value, fileName)}
        height="85vh"
        defaultLanguage={ language }
        defaultValue={ value }
      />
    </div>
  );
}