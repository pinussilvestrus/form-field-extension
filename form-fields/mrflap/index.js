import { CustomFormFields } from './viewer';

import 'mr-flap/dist/mrflap.min.css';
import './styles.css';

const viewerModule = {
  __init__: [ 'mrflapField' ],
  mrflapField: [ 'type', CustomFormFields ]
};

export const Mrflap = {
  viewerModule
};