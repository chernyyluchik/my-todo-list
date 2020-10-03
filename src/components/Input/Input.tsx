import * as React from 'react';
import { hot } from 'react-hot-loader';
import './Input.scss';

interface InputProps {
  placeholder: string,
  title: string,
  name: string,
  button: unknown,
  autofocus: boolean,
  onSubmit: Function
}

interface InputState {
  value: string
}

class Input extends React.Component<InputProps, InputState> {
  static defaultProps = {
    icon: 'some icon',
    placeholder: 'some placeholder',
    title: 'some title',
    autofocus: false,
    onSubmit: () => {}
  }

  private constructor(props) {
    super(props);
    this.state = {
      value: this.props.children ? this.props.children as string : ''
    };
  }

  private handleSubmit = (event) => {
    this.props.onSubmit(this.state.value);
    this.setState({
      value: ''
    })

    event.preventDefault();
  }

  private handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  public render() {
    return (
      <form className="input" onSubmit={this.handleSubmit}>
        <input 
          className="input__text-field" 
          name={this.props.name} 
          placeholder={this.props.placeholder} 
          autoComplete="off" title={this.props.title} 
          type="text" value={this.state.value} 
          onChange={this.handleChange}
          required 
          autoFocus={this.props.autofocus} />
        {this.props.button}
      </form>
    );
  }
}

export default hot(module)(Input);