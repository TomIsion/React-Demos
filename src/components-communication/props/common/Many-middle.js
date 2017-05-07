import React from 'react'

const CloneProps2Children = props => <div>{ React.Children.map(props.children, child => React.cloneElement(child, props, child.props.children)) }</div>
const Child = props => <div onClick={ e => console.log(props.value) }>Click to see value.</div>

export default (
  <CloneProps2Children value="This is test for many middles">
    <CloneProps2Children>
      <CloneProps2Children>
        <Child></Child>
      </CloneProps2Children>
    </CloneProps2Children>
  </CloneProps2Children>
)