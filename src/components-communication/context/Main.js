import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Main extends Component {
  getChildContext() {
    return {
      text: 'This is for context test',
      info: 'This is for text another',
    }
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

Main.childContextTypes = {
  text: PropTypes.string,
  info: PropTypes.string,
}

const Article = () => <div><Title /></div>

class Title extends Component {
  render() {
    return <p>{ this.context.text }</p>
  }
}

Title.contextTypes = {
  text: PropTypes.string,
}

export default (
  <Main>
    <Article />
  </Main>
)