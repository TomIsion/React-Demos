import ReactDOM from 'react-dom'
import React, { Component } from 'react'

// 父子间 props 通信
import renderFatherChild from './components-communication/props/common/Father-Child'

// 跨级别祖先向后代 props 通信
import renderManyMiddle from './components-communication/props/common/Many-middle'

// 后代组件向父元素通信
import Wrapper from './components-communication/props/callbacks/Child-Father'

// 同级别元素相互通信
import WrapperBrothers from './components-communication/props/callbacks/Brothers'

// 使用 context 来进行通信
import Context from './components-communication/context/Main'

// 使用发布-监听模式来实现组件间通信
import TodoList from './components-communication/todos/TodoList'

// 使用高阶组件构建项目
import SearchList from './high-order-components/SearchList'

ReactDOM.render(
  <SearchList
    url='http://v3.wufazhuce.com:8000/api/onelist/4000/%E5%9C%B0%E7%90%83'
    params={{}}
  />,
  document.getElementById('root')
)