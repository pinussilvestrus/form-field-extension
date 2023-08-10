import { CustomPropertiesProvider } from './editor';

import { CustomFormFields } from './viewer';

import 'mr-flap/dist/mrflap.min.css';
import './styles.css';

const viewerModule = {
  __init__: [ 'mrflapField' ],
  mrflapField: [ 'type', CustomFormFields ]
};

const editorModule = {
  __init__: [ 'mrflapPropertiesProvider' ],
  mrflapPropertiesProvider: [ 'type', CustomPropertiesProvider ]
};

export const Mrflap = {
  viewerModule,
  editorModule,
  key: 'mrflap'
};