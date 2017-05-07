import React, { Component } from 'react'

class Wrapper extends Component {
  componentWillMount() {
    console.log('Wrapper will mount')    
  }
  

  componentDidMount() {
    console.log('Wrapper did mount')
  }

  render() {
    console.log('Wrapper begin render')

    return (
      <div>
      {
        React.Children.map(this.props.children, child => React.cloneElement(child, this.props))
      }
      </div>
    ) 
  }
}

class Inner extends Component {
  componentWillMount() {
    console.log('Inner will mount')    
  }
  
  componentDidMount() {
    console.log('Inner did mount')
  }

  render() {
    console.log('Inner begin render')

    return (
      <div>
        This is Inner.
      </div>
    )
  }
}

export default (
  <Wrapper>
    <Inner />
  </Wrapper>
)