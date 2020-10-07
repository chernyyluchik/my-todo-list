import * as React from "react";
import {hot} from "react-hot-loader";
import "./Item.scss";
import Button from '../../Button/Button';
import Calendar from '../../Calendar/Calendar';
import RemoveIcon from '../assets/close-24px.svg';
import EditIcon from '../assets/edit-24px.svg';
import CheckIcon from '../assets/check-24px.svg';
import { compileFunction } from "vm";

interface IProps {
  id: number,
  stage: 'inProgress' | 'done' | 'expired',
  endDate: number | null,
  completionDate: number | null,
  isEdit: boolean,
  onEdit: () => void,
  onDelete: () => void,
  onEndDateSelect: (endDate: number) => void,
  onCompletion: (stage: string) => void,
}

class Item extends React.Component<IProps> {
  private getFormatedDate = (date: number) => new Intl.DateTimeFormat('en', {month: 'short', day: 'numeric', year: 'numeric'}).format(date);

  private getDaysLeft = (date: number) => Math.round((date - Date.now())/(1000*24*60*60));

  private getPluralRule(count: number, plurals: Object) {
    const rule = new Intl.PluralRules('en').select(count);

    return plurals[rule];
  }

  private getStatus() {
    const {
      stage,
      endDate,
      completionDate
    } = this.props;

    const formattedEndDate = this.getFormatedDate(endDate);
    const formattedCompletionDate = this.getFormatedDate(completionDate);
    const daysLeft = this.getDaysLeft(endDate);
    const plurals = {
      one: 'day',
      other: 'days'
    };
    const dayPluralRule = this.getPluralRule(daysLeft, plurals);

    switch (stage) {
      case 'inProgress':
        return endDate
          ? daysLeft > 10
            ? `Until ${formattedEndDate}`
            : daysLeft > 0
              ? `${daysLeft} ${dayPluralRule} left`
              : 'Expired'
          : '';
      
        case 'done':
          return `Done at ${formattedCompletionDate}`;
        
        case 'expired':
          return `Expired from ${formattedEndDate}`;
    }
  }

  private handleComplete = () => {
    const {
      onCompletion,
      completionDate,
      endDate
    } = this.props;
    
    endDate ? onCompletion(completionDate - endDate > 0 ? 'done' : 'expired') : onCompletion('done');
  }

  private renderContent = () => {
    const {
      stage,
      endDate,
      children,
      onDelete,
      onEndDateSelect,
      onEdit
    } = this.props;

    const status = this.getStatus()

    switch (stage) {
      case 'inProgress':
        return <li className={`item item_stage_in-progress`}>
          <span className="item__task">{children as string}</span>
          <small className="item__status">{status}</small>
          <Button
            label="Dismiss task"
            icon={<RemoveIcon />}
            color="red"
            onClick={onDelete}
          />
          {!endDate 
            && <Calendar 
              key="calendar" 
              onDaySelect={(endDate: number) => onEndDateSelect(endDate)} 
            />}
          <Button
            label="Edit task"
            icon={<EditIcon />}
            color="purple"
            onClick={onEdit}
          />
          <Button
            label="Complete task"
            icon={<CheckIcon />}
            color="green"
            onClick={this.handleComplete}
          />
        </li>
      case 'done':
        return <li className={`item item_stage_done`}>
          <span className="item__task">{children as string}</span>
          <small className="item__status">{status}</small>
        </li>
      case 'expired':
        return <li className={`item item_stage_expired`}>
          <span className="item__task">{children as string}</span>
          <small className="item__status">{status}</small>
        </li>
    }
  }

  public render() {
    return <div>
      {this.renderContent()}
    </div>
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(Item);
