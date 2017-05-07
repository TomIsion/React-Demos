import React, { Component } from 'react'

class SearchInput extends Component {
  static displayName = 'SearchInput'

  render() {
    return <input
      type="text"
      value={ this.props.keyword }
      onChange={ this.props.onSearch }
    />
  }
}

export default SearchInput