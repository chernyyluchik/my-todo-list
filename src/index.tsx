import * as React from 'react';
import { render } from 'react-dom';
import List from './components/List/List';
import './globals/global.scss';
import './globals/fonts.scss';

const rootEl = document.getElementById('root');
render(<List 
  itemList={[
    {
      id: 1,
      task: "Task 1",
      completionDate: 1601722093000,
      endDate: null
    },
    {
      id: 2,
      task: "Task 2",
      completionDate: 1601722093000,
      endDate: 1601522093000
    },
    {
      id: 3,
      task: "Task 3",
      completionDate: null,
      endDate: 1603222093000
    },
    {
      id: 4,
      task: "Task 4",
      completionDate: null,
      endDate: null
    },
    {
      id: 5,
      task: "Task 5",
      completionDate: null,
      endDate: null
    }
]}/>, rootEl);