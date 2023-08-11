import {
  Errors,
  FormContext,
  Numberfield,
  Description,
  Label
} from '@bpmn-io/form-js';

import { 
  html,
  useContext
 } from 'diagram-js/lib/ui';

import classNames from 'classnames';

import RangeIcon from './range.svg';

const rangeType = 'range';

/*
 * This is the rendering part of the custom field. We use `htm` to
 * to render our components without the need of extra JSX transpilation.
 */
function RangeRenderer(props) {

  const {
    disabled,
    errors = [],
    field,
    readonly,
    value
  } = props;

  const {
    description,
    range = {},
    id,
    label
  } = field;

  const {
    min,
    max,
    step
  } = range;

  const { formId } = useContext(FormContext);

  const errorMessageId = errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  const onChange = ({ target }) => {
    props.onChange({
      field,
      value: Number(target.value)
    });
  };

  return html`<div class=${ formFieldClasses(rangeType) }>
    <${Label}
      id=${ prefixId(id, formId) }
      label=${ label } />
    <div class="range-group">
      <input
        type="range"
        disabled=${ disabled }
        id=${ prefixId(id, formId) }
        max=${ max }
        min=${ min }
        onInput=${ onChange }
        readonly=${ readonly }
        value=${ value }
        step=${ step } />
      <div class="range-value">${ value }</div>
    </div>
    <${Description} description=${ description } />
    <${Errors} errors=${ errors } id=${ errorMessageId } />
  </div>`;
}

/*
 * This is the configuration part of the custom field. It defines
 * the schema type, UI label and icon, palette group, properties panel entries 
 * and much more.
 */
RangeRenderer.config = {

  /* we can extend the default configuration of existing fields */
  ...Numberfield.config,
  type: rangeType,
  label: 'Range',
  iconUrl: `data:image/svg+xml,${ encodeURIComponent(RangeIcon) }`,
  propertiesPanelEntries: [
    'key',
    'label',
    'description',
    'min',
    'max',
    'disabled',
    'readonly'
  ]
};

/*
 * This is the module definition of the custom field. This goes
 * into the Form instance via `additionalModules`.
 */
export class CustomFormFields {
  constructor(formFields) {
    formFields.register(rangeType, RangeRenderer);
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