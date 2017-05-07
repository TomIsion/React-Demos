import React, { Component } from 'react'

import Selector from './Selector'
import SearchInput from './components/SearchInput'
import List from './components/List'

import searchDecorator from './decorator/searchDecorator'
import asyncSelectDecorator from './decorator/asyncSelectDecorator'

const FinalSelector = asyncSelectDecorator(searchDecorator(Selector))

class SearchList extends Component {
  render() {
    return (
      <FinalSelector {...this.props}>
        <SearchInput />
        <List />
      </FinalSelector>
    )
  }
}

export default SearchList