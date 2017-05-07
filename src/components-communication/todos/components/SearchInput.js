import React, { Component } from 'react'

import event from '../event'

class SearchInput extends Component {
  state = {
    text: '',
    index: undefined,
  }

  componentDidMount() {
    // 修改某条数据
    event.on('MODIFY_TODO', ({text, index}) => {
      this.setState({
        text, index,
      })
    })
  }
  
  handleChange(e) {
    this.setState({
      text: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.index !== undefined) {
      event.emit('CHANGE_TODO', {...this.state})
    } else if (this.state.text.trim() === '') {
      return false
    } else {
      event.emit('ADD_TODO', {...this.state})
    }

    this.setState({
      text: '',
      index: undefined,
    })
  }

  render() {
    const { text, index } = this.state 

    return (
      <div>
        <form onSubmit={ e => this.handleSubmit(e) }>
          <input
            type="text"
            value={ text }
            onChange={ e => this.handleChange(e) }
            style={{
              border: '1px solid #ccc',
              outline: 0,
            }}
          />
        </form>
      </div>
    )
  }
}

export default SearchInput