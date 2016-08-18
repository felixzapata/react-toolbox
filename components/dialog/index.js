import { themr } from 'react-css-themr';
import { DIALOG } from '../identifiers.js';
import { Dialog } from './Dialog.js';
import Overlay from '../overlay';
import Button from '../button';
import theme from './theme.scss';

const ThemedDialog = themr(DIALOG, theme)(Dialog);

export default ThemedDialog;
export { ThemedDialog as Dialog };
