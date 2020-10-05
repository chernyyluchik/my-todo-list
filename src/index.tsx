import * as React from 'react';
import { render } from 'react-dom';
import List from './components/List/List';
import './globals/global.scss';
import './globals/fonts.scss';

const rootEl = document.getElementById('root');

render(<List />, rootEl);