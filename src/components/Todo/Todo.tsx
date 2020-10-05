import * as React from 'react';
import { hot } from 'react-hot-loader';
import './Todo.scss';
import List from '../List/List';

interface TodoProps {
  itemList: Array<{id: number, task: string, stage: 'draft' | 'inProgress' | 'done' | 'expired', termDate: string, complitionDate: string} | null>
}

class Todo extends React.Component<TodoProps> {
  static defaultProps = {
    itemList: []
  }
  
  public render() {
    return (
      <section className="todo">
        <h1 className="todo__heading">My to do list</h1>
        <List itemList={this.props.itemList}/>
      </section>
    );
  }
}

export default hot(module)(Todo);