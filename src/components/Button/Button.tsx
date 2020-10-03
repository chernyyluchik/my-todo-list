import * as React from 'react';
import { hot } from 'react-hot-loader';
import './Button.scss';

interface ButtonProps {
  label: string,
  title: string,
  className: string,
  type: 'submit' | 'reset' | 'button',
  icon: Function,
  hoverColor: string,
  focusColor: string,
  onClick: Function
}

interface ButtonState {
  value: string
}

class Button extends React.Component<ButtonProps, ButtonState> {
  static defaultProps = {
    label: 'some label',
    icon: 'some icon',
    className: 'button',
    type: 'button',
    onClick: () => {},
    title: 'some title',
    hoverColor: 'var(--dark-shade-75per)',
    focusColor: 'var(--dark-shade-75per)'
  }

  private handleClick = () => {
    this.props.onClick();
  }
  
  public render() {
    var style = { 
      "--hover-color": this.props.hoverColor,
      "--focus-color": this.props.focusColor
    } as React.CSSProperties;

    return (
      <button type={this.props.type} className={this.props.className} title={this.props.label} onClick={this.handleClick} style={style}>
        <span className="visually-hidden">
          {this.props.label}
        </span>
        {this.props.icon({className: 'button__icon'})}
      </button>
    );
  }
}

export default hot(module)(Button);