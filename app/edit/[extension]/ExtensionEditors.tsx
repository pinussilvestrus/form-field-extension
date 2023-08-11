'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import { CodeEditor } from '@/app/edit/CodeEditor';

import { editor } from 'monaco-editor';

export function ExtensionEditors({ viewerModule, editorModule, styles, handleModuleChange }: {
  viewerModule: string,
  editorModule: string,
  styles: string,
  handleModuleChange: (newValue: string|undefined, fileName: string) => void
 }) {

  const viewerEditorRef = useRef<editor.IStandaloneCodeEditor|null>(null);
  const editorEditorRef = useRef<editor.IStandaloneCodeEditor|null>(null);
  const stylesEditorRef = useRef<editor.IStandaloneCodeEditor|null>(null);

  const [ loading, setLoading ] = useState<boolean>(false);

  const handleEditorLoaded = (type: string) => (editor: editor.IStandaloneCodeEditor) => {
    if(type === 'viewer') {
      viewerEditorRef.current = editor;
    } else if(type === 'editor') {
      editorEditorRef.current = editor;
    } else if(type === 'styles') {
      stylesEditorRef.current = editor;
    }
  };

  const handleRefresh = () => {

    setLoading(true);

    const updates = {
      viewer: viewerEditorRef.current?.getValue(),
      editor: editorEditorRef.current?.getValue(),
      styles: stylesEditorRef.current?.getValue()
    }

    handleModuleChange(updates.viewer, 'viewer.js');
    handleModuleChange(updates.editor, 'editor.js');
    handleModuleChange(updates.styles, 'styles.css');
  };

  return (
    <>
      <button 
        title="Refresh extension" 
        onClick={handleRefresh}
        className="bg-white hover:bg-gray-100 py-2 px-2 rounded mb-4 absolute right-6">
          {
            loading ? (
              <span>Refresh ...</span>
            ) : (
                <Image
                  src="/refresh.svg"
                  alt="Refresh icon"
                  width={24}
                  height={24}
                  priority
                />
              )
          }
      </button>
      <div className="flex w-full">
        <CodeEditor 
          title="Form field definition" 
          logo={{ url: '/js.svg', alt: 'Javascript icon' }}
          fileName="viewer.js"
          value={ viewerModule } 
          handleLoaded={ handleEditorLoaded('viewer') }
          language="javascript" />
        <CodeEditor 
          title="Properties panel extension" 
          logo={{ url: '/js.svg', alt: 'Javascript icon' }}
          fileName="editor.js"
          value={ editorModule } 
          handleLoaded={ handleEditorLoaded('editor') }
          language="javascript" />
        <CodeEditor 
          title="Styles" 
          logo={{ url: '/css.svg', alt: 'CSS icon' }}
          fileName="styles.css"
          value={ styles } 
          handleLoaded={ handleEditorLoaded('styles') }
          language="css" />
      </div>
    </>
  )
};