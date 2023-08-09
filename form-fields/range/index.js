import { CustomPropertiesProvider } from './editor';

import { CustomFormFields } from './viewer';

const editorModule = {
  __init__: [ 'customPropertiesProvider' ],
  customPropertiesProvider: [ 'type', CustomPropertiesProvider ]
};

const viewerModule = {
  __init__: [ 'customFormFields' ],
  customFormFields: [ 'type', CustomFormFields ]
};

export const Range = {
  viewerModule,
  editorModule
};