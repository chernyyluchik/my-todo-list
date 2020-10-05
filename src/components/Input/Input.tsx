import * as React from 'react';
import { hot } from 'react-hot-loader';
import './Input.scss';

interface InputProps {
  placeholder: string,
  title: string,
  name: string,
  button: unknown,
  autofocus: boolean,
  onSubmit: Function,
  value: string,
}

class Input extends React.Component<InputProps> {
  static defaultProps = {
    icon: 'some icon',
    placeholder: 'some placeholder',
    title: 'some title',
    autofocus: false,
    onSubmit: () => {}
  }

  private handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.props.value);
    this.setState({value: ''});
  }

  private handleChange = e => this.setState({value: e.target.value});

  public render() {
    const {
      name,
      placeholder,
      title,
      value,
      autofocus,
    } = this.props;

    return (
      <form
        className="input"
        onSubmit={this.handleSubmit}
      >
        <input 
          className="input__text-field" 
          name={name}
          placeholder={placeholder}
          autoComplete="off"
          title={title}
          type="text"
          value={value}
          onChange={this.handleChange}
          required 
          autoFocus={autofocus}
        />

        {this.props.button}
      </form>
    );
  }
}

export default hot(module)(Input);