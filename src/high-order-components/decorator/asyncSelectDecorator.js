import React, { Component } from 'react'
import 'whatwg-fetch'

const asyncSelectDecorator = WrappedComponent => class extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    const { url, params } = this.props
    
    fetch(url, params)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data.data.content_list,
        })
      })
  }
  
  render() {
    return (
      <WrappedComponent
        { ...this.props }
        data={ this.state.data }
      />
    )
  }
}

export default asyncSelectDecorator