import {
  FormContext,
  Textfield
} from '@bpmn-io/form-js';

import {
  set, 
  get,
  isArray,
  isString  
} from 'min-dash';

import { 
  html,
  useContext
 } from 'diagram-js/lib/ui';

import classNames from 'classnames';

import NamesIcon from './personal.svg';

const namesType = 'names';

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
function NamesInputRenderer(props) {

  const {
    disabled,
    readonly,
    field,
    value
  } = props;

  const {
    id
  } = field;

  const { formId } = useContext(FormContext);

  const onChange = (type) => ({ value: newValue }) => {
    props.onChange({
      field,
      value: set(value, [ type ], newValue)
    });

  };

  return html`<div class=${ formFieldClasses(namesType, {
    disabled,
    readonly
  }) }>
    <${Textfield}
      field=${ {
        ...field,
        label: 'Pre name',
        id: prefixId(id, formId) + '-pre'
      } }
      disabled=${ disabled }
      readonly=${ readonly }
      onChange=${ onChange('prename') }
      value=${ get(value, [ 'prename' ], '') }
    />
    <${Textfield}
      field=${ {
        ...field,
        label: 'Last name',
        id: prefixId(id, formId) + '-last'
      } }
      disabled=${ disabled }
      readonly=${ readonly }
      onChange=${ onChange('lastname') }
      value=${ get(value, [ 'lastname' ], '') }
    />
  </div>`;
}

/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries 
 * and much more.
 */
NamesInputRenderer.config = {
  type: namesType,
  keyed: true,
  emptyValue: {},
  label: 'Pre & last name',
  group: 'basic-input',
  iconUrl: `data:image/svg+xml,${ encodeURIComponent(NamesIcon) }`,
  create: (options = {}) => ({ ...options }),
  sanitizeValue: ({ value }) => {
    if (isArray(value) || isString(value)) {
      return {};
    }

    return {
      prename: get(value, [ 'prename' ], ''),
      lastname: get(value, [ 'lastname' ], '')
    }
  },
  propertiesPanelEntries: [
    'key',
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
    formFields.register(namesType, NamesInputRenderer);
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