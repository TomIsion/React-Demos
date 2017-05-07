import React, { Component } from 'react'

import SearchInput from './components/SearchInput'
import List from './components/List'

class TodoList extends Component {
  render() {
    return (
      <div>
        <SearchInput />
        <List />
      </div>
    )
  }
}

export default <TodoList />