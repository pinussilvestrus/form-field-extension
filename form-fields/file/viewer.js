'use client'

import {
  FormContext,
  Numberfield,
  Description,
  Label
} from '@bpmn-io/form-js';

import { 
  html,
  useContext,
  useRef
 } from 'diagram-js/lib/ui';

import classNames from 'classnames';

import FileIcon from './file.svg';

const fileType = 'file';

function FileInputRenderer(props) {

  const {
    disabled,
    field,
    value
  } = props;

  const {
    description,
    id,
    label
  } = field;

  const inputRef = useRef();

  const { formId } = useContext(FormContext);

  const onChange = ({ target }) => {
    const { files } = target;

    const file = files[0];

    const reader = new FileReader();

    reader.onload = async (e) => { 
      props.onChange({
        field,
        value: btoa(e.target.result)
      });
    };

    if(!file) {
      return props.onChange({
        field,
        value: null
      });
    }

    reader.readAsText(file);
  };

  return html`<div class=${ formFieldClasses(fileType) }>
    <${Label}
      id=${ prefixId(id, formId) }
      label=${ label } />
      <input
        ref=${ inputRef }
        type="file"
        disabled=${ disabled }
        id=${ prefixId(id, formId) }
        onInput=${ onChange }
        value=${ value } />
    <${Description} description=${ description } />
  </div>`;
}

FileInputRenderer.config = {
  type: fileType,
  keyed: true,
  label: 'File input',
  group: 'presentation',
  create: (options = {}) => ({ ...options }),
  propertiesPanelEntries: [
    'key',
    'label',
    'description'
  ],

  // todo(pinussilvestrus): not working yet
  // icon: FileIcon
};

export class CustomFormFields {
  constructor(formFields) {
    formFields.register(fileType, FileInputRenderer);
  }
}


// helper //////////////////////

function formFieldClasses(type, { errors = [], disabled = false, readonly = false } = {}) {
  if (!type) {
    throw new Error('type required');
  }

  return classNames('fjs-form-field', `fjs-form-field-${type}`, {
    'fjs-has-errors': errors.length > 0,
    'fjs-disabled': disabled,
    'fjs-readonly': readonly
  });
}

function prefixId(id, formId) {
  if (formId) {
    return `fjs-form-${ formId }-${ id }`;
  }

  return `fjs-form-${ id }`;
}