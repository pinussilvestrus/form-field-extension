"use client"

import Editor from '@monaco-editor/react';

export function JSEditor({ value, title }: {
  title: string,
  value: string
}) {
  return (
    <div className="w-1/2 p-2">
      <h1>{title}</h1>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue={ value }
      />
    </div>
  );
}