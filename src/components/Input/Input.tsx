import * as React from 'react';
import { hot } from 'react-hot-loader';
import './Input.scss';

interface IProps {
  name: string,
  title: string,
  value: string,
  placeholder: string,
  autofocus: boolean,
  button: React.ReactNode | null,
  buttons: Array<React.ReactNode> | null,
  onSubmit: (value: string) => void
}

interface IState {
  value: string
}

class Input extends React.Component<IProps, IState> {
  state = {
    value: this.props.value
  }

  static defaultProps = {
    name: 'some name',
    title: 'some title',
    value: '',
    placeholder: 'some placeholder',
    autofocus: false,
    button: null,
    buttons: null,
    onSubmit: () => {
    }
  }

  private handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.value);
    this.setState({value: ''});
  }

  private handleChange = e => this.setState({value: e.target.value});

  public render() {
    const {
      name,
      title,
      placeholder,
      autofocus,
      button,
      buttons
    } = this.props;

    const {value} = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="input"
      >
        <input 
          name={name}
          title={title}
          value={value}
          placeholder={placeholder}
          autoFocus={autofocus}
          onChange={this.handleChange}
          className="input__text-field" 
          type="text"
          autoComplete="off"
          required 
        />

        {buttons ? buttons.map((item) => item) : button}
      </form>
    );
  }
}

export default hot(module)(Input);