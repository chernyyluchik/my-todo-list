import * as React from 'react';
import {hot} from 'react-hot-loader';
import './Button.scss';

interface IProps {
  label: string,
  type: 'submit' | 'reset' | 'button',
  color: 'red' | 'green' | 'purple' | false,
  ariaExpanded: boolean | null,
  icon: React.ReactNode,
  onClick: (e) => void
}

class Button extends React.Component<IProps> {
  static defaultProps = {
    label: 'some label',
    type: 'button',
    color: false,
    icon: 'some icon',
    ariaExpanded: null,
    onClick: (e) => {
    }
  }

  public render() {
    const {
      label,
      type,
      icon,
      color,
      ariaExpanded,
      onClick,
    } = this.props;

    let classList = 'button';
    classList = color ? `${classList} button_color_${color}` : classList;

    return (
      <button
        type={type}
        className={classList}
        title={label}
        aria-expanded={ariaExpanded}
        onClick={e => onClick(e)}
      >
        <span className="button__label">{label}</span>
        {icon}
      </button>
    );
  }
}

export default hot(module)(Button);