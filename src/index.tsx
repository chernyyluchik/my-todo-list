import * as React from 'react';
import { render } from 'react-dom';
import Todo from './components/Todo/Todo';
import './globals/global.scss';
import './globals/fonts.scss';

const rootEl = document.getElementById('root');

render(<Todo />, rootEl);