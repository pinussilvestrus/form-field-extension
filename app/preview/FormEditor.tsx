'use client'

import { useEffect, useRef } from 'react'

// @ts-ignore-next-line
import { createCamundaFormPlayground } from '@camunda/form-playground'

import '@camunda/form-playground/dist/assets/form-js.css'
import '@camunda/form-playground/dist/assets/form-js-editor.css'
import '@camunda/form-playground/dist/assets/camunda-form-playground.css'

export function FormEditor(props: {
  data: any;
  schema: any;
}) {
  const {
    data,
    schema
  } = props;

  const formNodeRef = useRef(null);

  const formEditorRef = useRef(null);

  useEffect(() => {

    if(!formNodeRef.current) {
      return;
    }

    formEditorRef.current = createCamundaFormPlayground({
      container: formNodeRef.current,
      data,
      schema
    });
  }, [ data, schema ]);

  return (
    <div className="form-container h-full" ref={ formNodeRef }></div>
  );
}