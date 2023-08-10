'use client'

import { ModuleDeclaration } from 'didi';

import { useEffect, useRef } from 'react'

// @ts-ignore-next-line
import { createCamundaFormPlayground, CamundaFormPlayground } from '@camunda/form-playground'

import '@camunda/form-playground/dist/assets/form-js.css'
import '@camunda/form-playground/dist/assets/form-js-editor.css'
import '@camunda/form-playground/dist/assets/camunda-form-playground.css'

type Extension = {
  viewerModule: ModuleDeclaration;
  editorModule: ModuleDeclaration;
}


export function FormEditor(props: {
  data: any;
  schema: any;
  extensions?: Array<Extension>;
}) {
  const {
    data,
    schema,
    extensions
  } = props;

  const formNodeRef = useRef(null);

  const formEditorRef = useRef<CamundaFormPlayground>(null);

  useEffect(() => {

    async function createEditor() {
      const modules = collectExtensions(extensions || []);

      formEditorRef.current = await createCamundaFormPlayground({
        container: formNodeRef.current,
        data,
        schema,
        viewerAdditionalModules: modules.viewer,
        editorAdditionalModules: modules.editor
      });

      formEditorRef.current.getEditor().get('eventBus').fire('attach');
      formEditorRef.current.open();
    }

    if(!formNodeRef.current) {
      return;
    }

    createEditor();

    return () => {
      if(formEditorRef.current) {

        formEditorRef.current.destroy();

        // notify current dragula instance to properly destroy from editor
         formEditorRef.current.getEditor().get('eventBus').fire('detach');
      }
    }
  }, [ data, schema, extensions ]);

  useEffect(() => {
    async function handleKeydown(event: KeyboardEvent) {
      if(event.key === 's' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        const schema = await formEditorRef.current.saveSchema();
        console.log('Exported form schema: ', schema);
      }
    }

    if(formNodeRef.current) {
      window.addEventListener('keydown', handleKeydown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  });

  return (
    <div className="form-container h-full" ref={ formNodeRef }></div>
  );
}


// helpers //////////////////////

function collectExtensions(extensions: Array<Extension>): {
  viewer: Array<ModuleDeclaration>;
  editor: Array<ModuleDeclaration>;
} {
  const modules: {
    viewer: Array<ModuleDeclaration>;
    editor: Array<ModuleDeclaration>;
  } = {
    viewer: [],
    editor: []
  };

  extensions.forEach((extension: Extension) => {

    // viewer modules also have to go inside the editor
    modules.viewer.push(extension.viewerModule);
    modules.editor.push(extension.viewerModule);
    extension.editorModule && modules.editor.push(extension.editorModule);
  });

  return modules;
}