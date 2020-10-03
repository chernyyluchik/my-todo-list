import * as React from "react";
import { hot } from "react-hot-loader";
import "./Item.scss";
import Input from '../Input/Input';
import Button from '../Button/Button';
import SaveIcon from './assets/library_add_check-24px.svg';
import RemoveIcon from './assets/close-24px.svg';
import EditIcon from './assets/edit-black-18dp.svg';
import AddIcon from './assets/add-24px.svg';
import DoneIcon from './assets/check-black-18dp.svg';
import TermIcon from './assets/date_range-24px.svg';

interface ItemProps {
  id: number,
  stage: 'draft' | 'inProgress' | 'done' | 'expired',
  termDate: string,
  complitionDate: string,
  unmountMe: Function,
  onStageChange: Function
}

interface ItemState {
  task: string,
  stage: 'draft' | 'inProgress' | 'done' | 'expired',
  classList: string,
  complitionDate: string,
  editMode: boolean
}

class Item extends React.Component<ItemProps, ItemState> {
  static defaultProps = {
    unmountMe: () => {},
    onStageChange: () => {}
  }

  private constructor(props) {
    super(props);
    this.state = {
      task: this.props.children as string,
      stage: this.props.stage,
      complitionDate: this.props.complitionDate,
      classList: this.props.stage === 'done' ? 'item item_done' : this.props.stage === 'inProgress' ? 'item item_in-progress' : this.props.stage === 'expired' ? 'item item_expired' : 'item',
      editMode: false
    };
  }

  componentWillMount() {
      if (this.state.stage === 'inProgress' && this.getTerm() <= 0) {
        this.setState({
          stage: 'expired',
          classList: 'item item_expired'
        });

        this.props.onStageChange(this.props.id, 'expired');
      }
  }

  private getTerm() {
    const days = Math.round((new Date(this.props.termDate).getTime() - Date.now()) / 1000 / 60 / 60 / 24);

    console.log((new Date(this.props.termDate).getTime() - Date.now()) / 1000 / 60 / 60 / 24);

    return days;
  }

  private getFormattedTerm() {
    const days = this.getTerm();
    const dayPlurals = {
      one: 'day',
      other: 'days'
    }
    const pluralRule = new Intl.PluralRules('en').select(days);

    return `${days} ${dayPlurals[pluralRule]} left`;
  }

  private getFormattedComplitionDate() {
    return new Intl.DateTimeFormat('en', {month: 'short', day: 'numeric', year: 'numeric'}).format(new Date(this.state.complitionDate));
  }

  private handleDone = () => {
    this.setState({
      classList: 'item item_done',
      stage: 'done',
      complitionDate: new Date(Date.now()).toISOString()
    });

    this.props.onStageChange(this.props.id, 'done');
  }

  private handleAccept = () => {
    this.setState({
      classList: 'item item_in-progress',
      stage: 'inProgress'
    });

    this.props.onStageChange(this.props.id, 'inProgress');
  }

  private handleDismiss = () => {
    this.props.unmountMe(this.props.id);
  }

  private handleEdit = () => {
    this.setState({
      editMode: true
    })
  }

  private handleSave = (result) => {
    this.setState({
      editMode: false,
      task: result
    });
  }

  private handleToggleCalendar = () => {
  }
    
  public render() {
    return (
      this.state.editMode && 
      (<li className="item">
        {<Input 
          name="save" 
          button={<Button type="submit" label="Save changes" title="Save changes" icon={SaveIcon} />} 
          title="Edit task" 
          placeholder="Edit task" 
          autofocus={true} 
          onSubmit={this.handleSave}>{this.state.task}</Input>}
      </li>) ||
      this.state.stage === 'draft' &&
      (<li className={this.state.classList} title="Draft">
        <span className="item__task">{this.state.task}</span>
        <Button label="Dismiss" title="Dismiss" icon={RemoveIcon} hoverColor="var(--red-100per)" focusColor="var(--red-100per)" onClick={this.handleDismiss} />
        <Button label="Term" title="Term" icon={TermIcon} hoverColor="var(--purple-100per)" focusColor="var(--purple-100per)" onClick={this.handleToggleCalendar} />
        <Button label="Edit" title="Edit" icon={EditIcon} hoverColor="var(--purple-100per)" focusColor="var(--purple-100per)" onClick={this.handleEdit} />
        <Button label="Add" title="Add" icon={AddIcon} hoverColor="var(--green-100per)" focusColor="var(--green-100per)" onClick={this.handleAccept} />
      </li>) ||
      this.state.stage === 'inProgress' &&
      (<li className={this.state.classList} title="WIP">
        <span className="item__task">{this.state.task}</span>
        <span className="item__status">{this.getFormattedTerm()}</span>
        <Button label="Done" title="Done" icon={DoneIcon}  hoverColor="var(--green-100per)" focusColor="var(--green-100per)"onClick={this.handleDone} />
      </li>) ||
      this.state.stage === 'done' && 
      (<li className={this.state.classList} title="Done">
        <span className="item__task">{this.state.task}</span>
        <span className="item__status">{this.getFormattedComplitionDate()}</span>
      </li>) ||
      this.state.stage === 'expired' && 
      (<li className={this.state.classList} title="Expired">
        <span className="item__task">{this.state.task}</span>
        <span className="item__status">Expired</span>
      </li>)
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(Item);
