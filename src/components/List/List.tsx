import * as React from 'react';
import {hot} from 'react-hot-loader';
import Item from './Item/Item';
import Input from '../Input/Input';
import Button from '../Button/Button';
import AddIcon from './assets/add-24px.svg';
import CheckIcon from './assets/check-24px.svg';
import CloseIcon from './assets/close-24px.svg';
import './List.scss';

interface IProps {
  itemList: Array<{
    id: number,
    task: string,
    stage: 'inProgress' | 'done' | 'expired',
    endDate: number | undefined,
    completionDate: number | undefined }>
}

interface IState {
  itemList: Array<{
    id: number,
    task: string,
    stage: 'inProgress' | 'done' | 'expired',
    endDate: number | undefined,
    completionDate: number | undefined }>
}

class List extends React.Component<IProps, IState> {
  state = {
    itemList: []
  }

  static defaultProps = {
    itemList: []
  }

  private deleteTask = (id: number) => {
    this.setState({
      itemList: this.state.itemList.filter((item) => item.id !== id)
    })
  }

  private editTask = (id: number) => {
    this.setState({
      itemList: this.state.itemList.reduce((acc, current) =>
        current.id === id
          ? [...acc, {...current, isEdit: true}]
          : [...acc, {...current, isEdit: false}], [])
    })
  }

  private acceptEdits = (id: number, task: string) => {
    this.setState({
      itemList: this.state.itemList.reduce((acc, current) =>
        current.id === id
          ? [...acc, {...current, isEdit: false, task}]
          : [...acc, {...current}], [])
    });
  }

  private selectTerm = (id: number, endDate: number) => {
    this.setState({
      itemList: this.state.itemList.reduce((acc, current) =>
        current.id === id
          ? [...acc, {...current, endDate}]
          : [...acc, {...current}], [])
    });
  }

  private setCompletion = (id: number, stage: 'done' | 'expired') => {
    this.setState({
      itemList: this.state.itemList.reduce((acc, current) =>
        current.id === id
          ? [...acc, {...current, stage, completionDate: Date.now()}]
          : [...acc, {...current}], [])
    }); 
  }

  private addTask = (task: string) => {
    this.setState({
      itemList: [...this.state.itemList, {
        id: this.state.itemList.length,
        task,
        stage: 'inProgress',
        isEdit: false,
        completionDate: undefined,
        endDate: undefined
      }]
    })  
  }

  private getSortedItemList() {
    const order = ['inProgress', 'done', 'expired'];

    return [...this.state.itemList]
      .sort((a, b) => order.indexOf(a.stage) - order.indexOf(b.stage))
  }

  public render() {
    return (
      <ul className="list">
        <li >
          <Input
            name="create"
            title="Create task"
            placeholder="Create task"
            onSubmit={this.addTask}
            button={<Button key="create" type="submit" label="Create" color="purple" icon={<AddIcon />} />}
          />
        </li>

        {this.getSortedItemList()
          .map((item) => item.isEdit 
            ? <li 
                key={item.id}
                className="list__editor"
              >
                <Input 
                  name="edit"
                  value={item.task}
                  title="Edit task"
                  placeholder="Edit task"
                  autofocus={true}
                  onSubmit={(value) => this.acceptEdits(item.id, value)}
                  buttons={[
                    <Button key="dismiss" type="button" label="Dismiss" color="red" icon={<CloseIcon />} onClick={() => this.acceptEdits(item.id, item.task)} />,
                    <Button key="accept" type="submit" label="Accept" color="green" icon={<CheckIcon />} />
                  ]}
                />
              </li>
            : <Item
              key={item.id}
              id={item.id}
              isEdit={item.isEdit}
              onEdit={() => this.editTask(item.id)}
              onDelete={() => this.deleteTask(item.id)}
              onTermSelect={(term: number) => this.selectTerm(item.id, term)}
              onCompletion={(stage: 'done' | 'expired') => this.setCompletion(item.id, stage)}
              stage={item.stage}
              endDate={item.endDate}
              completionDate={item.complitionDate}
            >{item.task}</Item>)}
      </ul>
    );
  }
}

export default hot(module)(List);