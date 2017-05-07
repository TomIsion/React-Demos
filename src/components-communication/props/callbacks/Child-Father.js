import React, { Component } from 'react';

class Wrapper extends Component {
  state = {
    num: 1,
  }

  render() {
    const addNum = () => {
      this.setState({
        num: this.state.num + 1,
      })
    }

    return (
      <div>
        The num is { this.state.num }
        <Counter handleClick={ addNum } />
      </div>
    )
  }
}

const Counter = props => <div onClick={ props.handleClick }>Click me to add num.</div>

export default <Wrapper />
