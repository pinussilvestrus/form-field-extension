import {
  FormContext,
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

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
function FileInputRenderer(props) {

  const {
    disabled,
    readonly,
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
        readonly=${ readonly }
        id=${ prefixId(id, formId) }
        onInput=${ onChange }
        value=${ value } />
    <${Description} description=${ description } />
  </div>`;
}

/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries 
 * and much more.
 */
FileInputRenderer.config = {
  type: fileType,
  keyed: true,
  emptyValue: null,
  label: 'File input',
  group: 'basic-input',
  iconUrl: `data:image/svg+xml,${ encodeURIComponent(FileIcon) }`,
  create: (options = {}) => ({ ...options }),
  propertiesPanelEntries: [
    'key',
    'label',
    'description',
    'disabled',
    'readonly'
  ],
};

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
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