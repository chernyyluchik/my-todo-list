import * as React from 'react';
import { hot } from 'react-hot-loader';
import Item from '../Item/Item';
import Input from '../Input/Input';
import Button from '../Button/Button';
import CreateIcon from './assets/library_add-24px.svg';
import './List.scss';

interface ListProps {
  itemList: Array<{id: number, task: string, stage: 'draft' | 'inProgress' | 'done' | 'expired', termDate: string, complitionDate: string} | null>
}

interface ListState {
  itemList: Array<{id: number, task: string, stage: 'draft' | 'inProgress' | 'done' | 'expired', termDate: string, complitionDate: string} | null>
}

class List extends React.Component<ListProps, ListState> {
  private constructor(props) {
    super(props);
    this.state = {
      itemList: this.props.itemList
    }
  }

  private handleUnmount = (id: number) => {
    this.setState({
      itemList: this.state.itemList.filter((item) => item.id !== id)
    })
  }

  private handleStageChange = (id: number, stage: 'draft' | 'inProgress' | 'done') => {
    this.setState({
      itemList: this.state.itemList.map((item) => { if (item.id === id) item.stage = stage; return item;})
    })

    console.log(stage)
  }

  private handleAdd = (result: string) => {
    const itemList = this.state.itemList;

    itemList.push({
        id: ++this.state.itemList.length,
        task: result,
        stage: 'draft',
        termDate: 'none',
        complitionDate: 'none'
    });

    this.setState({
      itemList: itemList
    })
  }

  private sortItemList() {
    const order = ['draft', 'inProgress', 'done', 'expired'];

    this.state.itemList.sort((a, b) => {
      console.log(a.stage, order.indexOf(a.stage))
      return order.indexOf(a.stage) - order.indexOf(b.stage)
    })
  }

  public render() {
    return (
      <ul className="list">
        <li><Input name="create" button={<Button type="submit" label="Create" title="Create" icon={CreateIcon} />} placeholder="Create task" title="Create task" onSubmit={this.handleAdd}/></li>
        {this.sortItemList()}
        {this.state.itemList
        .map((item) => <Item key={item.id} id={item.id} unmountMe={this.handleUnmount} onStageChange={this.handleStageChange} stage={item.stage} termDate={item.termDate} complitionDate={item.complitionDate}>{item.task}</Item>)}
      </ul>
    );
  }
}

export default hot(module)(List);