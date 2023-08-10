"use client"

import Editor from '@monaco-editor/react';

export function CSSEditor({ value, title }: {
  title: string,
  value: string
}) {
  return (
    <div className="w-1/2 p-2">
      <h2 className='p-2 text-white bg-slate-600'>{title}</h2>
      <Editor
        height="85vh"
        defaultLanguage="css"
        defaultValue={ value }
      />
    </div>
  );
}