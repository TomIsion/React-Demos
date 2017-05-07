import React, { Component } from 'react' 

class Selector extends Component {
  render() {
    return (
      <div>
        {
          React.Children.map(this.props.children, child => React.cloneElement(child, this.props, child.props.children))
        }
      </div>
    )
  }
}

export default Selector