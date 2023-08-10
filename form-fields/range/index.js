import { CustomPropertiesProvider } from './editor';

import { CustomFormFields } from './viewer';

import './styles.css';

const editorModule = {
  __init__: [ 'rangePropertiesProvider' ],
  rangePropertiesProvider: [ 'type', CustomPropertiesProvider ]
};

const viewerModule = {
  __init__: [ 'rangeField' ],
  rangeField: [ 'type', CustomFormFields ]
};

export const Range = {
  viewerModule,
  editorModule
};