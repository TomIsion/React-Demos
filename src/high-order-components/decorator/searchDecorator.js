import React, { Component } from 'react'

const searchDecorator = WrapperComponent => class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data,
      keyword: ''
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(e) {
    const keyword = e.target.value

    this.setState({
      keyword,
    })
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    })
  }
  
  render() {
    let { data, keyword } = this.state

    data = data.filter(ele => ele.forward.indexOf(keyword.trim()) > -1)

    return (
      <WrapperComponent
        { ...this.props }
        data={ data }
        keyword={ keyword }
        onSearch={ this.handleSearch }
      />
    )
  }
}

export default searchDecorator