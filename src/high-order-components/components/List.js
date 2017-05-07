import React, { Component } from 'react'

class List extends Component {
  render() {
    return <ul>
      {
        this.props.data.map(child => <li>{child.forward}</li>)
      }
    </ul>
  }
}

export default List