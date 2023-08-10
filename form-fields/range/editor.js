import { get, set } from 'min-dash';

import {
  NumberFieldEntry,
  isNumberFieldEntryEdited
} from '@bpmn-io/properties-panel';

import { html } from 'diagram-js/lib/ui'

export class CustomPropertiesProvider {
  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(this, 500);
  }

  getGroups(field, editField) {
    return (groups) => {

      if (field.type !== 'range') {
        return groups;
      }

      const generalIdx = findGroupIdx(groups, 'general');

      groups.splice(generalIdx + 1, 0, {
        id: 'range',
        label: 'Range',
        entries: RangeEntries(field, editField)
      });

      return groups;
    };
  }
}

CustomPropertiesProvider.$inject = [ 'propertiesPanel' ];

function RangeEntries(field, editField) {

  const onChange = (key) => {
    return (value) => {
      const range = get(field, [ 'range' ], {});

      editField(field, [ 'range' ], set(range, [ key ], value));
    };
  };

  const getValue = (key) => {
    return () => {
      return get(field, [ 'range', key ]);
    };
  };

  return [
    {
      id: 'range-min',
      component: Min,
      getValue,
      field,
      isEdited: isNumberFieldEntryEdited,
      onChange
    },
    {
      id: 'range-max',
      component: Max,
      getValue,
      field,
      isEdited: isNumberFieldEntryEdited,
      onChange
    },
    {
      id: 'range-step',
      component: Step,
      getValue,
      field,
      isEdited: isNumberFieldEntryEdited,
      onChange
    }
  ];

}

function Min(props) {
  const {
    field,
    getValue,
    id,
    onChange
  } = props;

  const debounce = (fn) => fn;

  return html`<${NumberFieldEntry}
    id=${ id }
    element=${ field }
    getValue=${ getValue('min') }
    label='Minimum'
    setValue=${ onChange('min') }
    debounce=${ debounce }
  />`;
}

function Max(props) {
  const {
    field,
    getValue,
    id,
    onChange
  } = props;

  const debounce = (fn) => fn;

  return html`<${NumberFieldEntry}
    id=${ id }
    element=${ field }
    getValue=${ getValue('max') }
    label='Maximum'
    setValue=${ onChange('max') }
    debounce=${ debounce }
  />`;
}

function Step(props) {
  const {
    field,
    getValue,
    id,
    onChange
  } = props;

  const debounce = (fn) => fn;

  return html`<${NumberFieldEntry}
    id=${ id }
    element=${ field }
    getValue=${ getValue('step') }
    min=${ 0 }
    label='Step'
    setValue=${ onChange('step') }
    debounce=${ debounce }
  />`;
}

// helper //////////////////////

function findGroupIdx(groups, id) {
  return groups.findIndex(g => g.id === id);
}