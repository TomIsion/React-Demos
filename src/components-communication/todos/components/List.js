import React, { Component } from 'react'

import event from '../event'

class List extends Component {
  state = {
    list: []
  }

  componentDidMount() {
    event.on('ADD_TODO', ({text}) => {
      const _list = this.state.list

      _list.push(text)

      this.setState({
        list: _list,
      })
    })

    event.on('CHANGE_TODO', ({text, index}) => {
      const _list = this.state.list

      _list.splice(index, 1, text)

      this.setState({
        list: _list,
      })
    })
  }

  handleClick(text, index) {
    event.emit('MODIFY_TODO', {
      text, index,
    })
  }

  render() {
    const list = this.state.list

    return (
      <ul>
        {
          list.map((item, i) =>
            <li
              key={i}
              onClick={e => this.handleClick(item, i)}
            >{ item }</li>
          )
        }
      </ul>
    )
  }
}

export default List