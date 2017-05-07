import React from 'react'

const Child = props => <div onClick={ e => console.log(props.value) }>Click to see value.</div>
const Father = props => <div>{ React.Children.map(props.children, child => React.cloneElement(child, props)) }</div>

export default (
  <Father value="This is test for father-child">
    <Child />
  </Father>
)