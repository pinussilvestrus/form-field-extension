import { 
  html
 } from 'diagram-js/lib/ui';

import 'mr-flap/dist/mrflap.dev';

import classNames from 'classnames';

import MrflapIcon from './mrflap.svg';

const mrflapType = 'mrflap';

function MrFlapRenderer(props) {

  const {
    disabled
  } = props;

  return html`<div class=${ formFieldClasses(mrflapType) }>
    ${
      disabled ? (
        html`<i class="mrflap-readonly">Play Mr Flap in the Preview!</i>`
      ) : (
        html`<div class="mrflap-playground"></div>`
      )
    }
  </div>`;
}

MrFlapRenderer.config = {
  type: mrflapType,
  label: 'Mr Flap',
  group: 'presentation',
  create: (options = {}) => ({ ...options }),
  iconUrl: `data:image/svg+xml,${ encodeURIComponent(MrflapIcon) }`
};

export class CustomFormFields {
  constructor(formFields) {
    formFields.register(mrflapType, MrFlapRenderer);
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