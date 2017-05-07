import React, { Component } from 'react';

class Wrapper extends Component {
  state = {
    topNum: 1,
    bottomNum: 1,
  }

  addNum(key) {
    const that = this

    return function(){
      that.setState({
        [key]: that.state[key] + 1,
      })
    }
  }

  render() {
    const { topNum, bottomNum } = this.state

    return (
      <div>
        <Counter
          num={topNum}
          handleClick={this.addNum('bottomNum')}
        />
        <Counter
          num={bottomNum}
          handleClick={this.addNum('topNum')}
        />
      </div>
    )
  }
}

const Counter = props => (
  <div
    onClick={ props.handleClick }
    style={{
      border: '1px solid #ccc',
      marginTop: '5px',
      padding: '5px',
    }}
  >
    <p>Click me to add another.</p>
    <p>{ props.num }</p>
  </div>
)

export default <Wrapper />
