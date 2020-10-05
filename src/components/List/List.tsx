import * as React from 'react';
import {hot} from 'react-hot-loader';
import Item from '../Item/Item';
import Input from '../Input/Input';
import Button from '../Button/Button';
import CreateIcon from './assets/library_add-24px.svg';
import './List.scss';

interface ListProps {
  itemList: Array<{
    id: number,
    task: string,
    stage: 'draft' | 'inProgress' | 'done' | 'expired',
    termDate: string,
    complitionDate: string } | null>
}

interface ListState {
  itemList: Array<{
    id: number,
    task: string,
    stage: 'draft' | 'inProgress' | 'done' | 'expired',
    termDate: string,
    complitionDate: string } | null>
}

class List extends React.Component<ListProps, ListState> {
  state = {
    itemList: [],
    newTask: '',
  }

  private deleteTask = (id: number) => {
    this.setState({
      itemList: this.state.itemList.filter((item) => item.id !== id)
    })
  }

  private handleStageChange = (id: number, stage: 'draft' | 'inProgress' | 'done') => {
    this.setState({
      itemList: this.state.itemList.reduce((acc, current) =>
        current.id === id
          ? [...acc, {...current, stage}]
          : [...acc, {...current}], [])
    });
  }

  private handleAdd = (result: string) => {
    this.setState({
      itemList: [...this.state.itemList, {
        id: ++this.state.itemList.length,
        task: result,
        stage: 'draft',
        termDate: 'none',
        complitionDate: 'none'
      }]
    })
  }

  private sortItemList() {
    const order = ['inProgress', 'done', 'expired'];

    return [...this.state.itemList]
      .sort((a, b) => order.indexOf(a.stage) - order.indexOf(b.stage))
  }

  public render() {
    const {newTask} = this.state;

    return (
      <ul className="list">
        <li>
          <Input
            name="create"
            button={<Button type="submit" label="Create" title="Create" icon={CreateIcon}/>}
            placeholder="Create task"
            title="Create task"
            onSubmit={this.handleAdd}
            value={newTask}
          />
        </li>

        {this.sortItemList()
          .map((item) => <Item
            key={item.id}
            id={item.id}
            onDelete={() => this.deleteTask(item.id)}
            onChange={stage => this.handleStageChange(item.id, stage)}
            stage={item.stage}
            endDate={item.termDate}
            completionDate={item.complitionDate}
          >{item.task}</Item>)}
      </ul>
    );
  }
}

export default hot(module)(List);