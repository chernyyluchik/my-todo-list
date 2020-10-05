import * as React from 'react';
import {hot} from 'react-hot-loader';
import './Button.scss';

interface ButtonProps {
  label: string,
  title: string,
  className: string,
  type: 'submit' | 'reset' | 'button',
  icon: React.ReactNode,
  hoverColor: string,
  focusColor: string,
  onClick: () => void
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
    onClick: () => {
    },
    title: 'some title',
    hoverColor: 'var(--dark-shade-75per)',
    focusColor: 'var(--dark-shade-75per)'
  }

  public render() {
    const {
      type,
      className,
      label,
      icon,
      onClick,
    } = this.props;

    return (
      <button
        type={type}
        className={className}
        title={label}
        onClick={onClick}
      >
        <span className="visually-hidden">{label}</span>
        {icon({className: 'button__icon'})}
      </button>
    );
  }
}

export default hot(module)(Button);