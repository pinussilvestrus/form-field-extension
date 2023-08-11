import { CustomFormFields } from './viewer';

import { CustomPropertiesProvider } from './editor';

import './styles.css';

const viewerModule = {
  __init__: [ 'namesField' ],
  namesField: [ 'type', CustomFormFields ]
};

const editorModule = {
  __init__: [ 'namesPropertiesProvider' ],
  namesPropertiesProvider: [ 'type', CustomPropertiesProvider ]
};

export const Names = {
  viewerModule,
  key: 'names',
  editorModule
};