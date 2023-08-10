import { CustomFormFields } from './viewer';

import { CustomPropertiesProvider } from './editor';

import './styles.css';

const viewerModule = {
  __init__: [ 'fileField' ],
  fileField: [ 'type', CustomFormFields ]
};

const editorModule = {
  __init__: [ 'filePropertiesProvider' ],
  filePropertiesProvider: [ 'type', CustomPropertiesProvider ]
};

export const File = {
  viewerModule,
  key: 'file',
  editorModule
};