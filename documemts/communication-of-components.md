# React.js 组件间通信

《深入React技术栈》读书笔记

基于 `React.js` 编写的单页面应用程序是由一个又一个的组件组织、搭建起来的。组件间的通信，换句话说就是数据交流也变得必不可少。随着单页面应用程序的复杂程度越来越高，也出现了越来越多的组件间通信的实现方式

按照应用的场景分为：

- 父组件向子组件通信
- 子组件向父组件通信
- 父组件跨级向后代组件通信
- 后代组件跨级向父组件通信
- 同级别组件之间通信

按照实现的方式分为：

- `props` 通信
- context 通信
- 发布订阅模式
- *flux / Redux.js 通信*

下面就按照**实现方式**的分类来记录下：

## props 通信

### props 传值

通过 `props` 通讯可以实现上面**所有**的五种应用场景，其中的关键点就在于**所传递的 `props` 的类型**

与后代元素通信， `props` 是学习 `React.js` 最初学会的方式

```
const Child = props => <div onClick={ e => console.log(props.value) }>Click to see value.</div>
const Father = props => <div>{ React.Children.map(props.children, child => React.cloneElement(props.children, props)) }</div>

ReactDOM.render(
  <Father value="This is Test">
      <Child />
  </Father>,
  document.getElementById('root')
)
```

同样的原理，我们也可以实现父组件跨级向后代组件通信，原理就是把属性一层一层的传递下去

*编写这个栗子的时候，对 `cloneElement` 的API不够熟悉，出现了些问题，具体见[Stackoverflow](http://stackoverflow.com/questions/43589453/react-js-uncaught-rangeerror-maximum-call-stack-size-exceeded/43590873#43590873)这个问题的解释，主要强调其中 .cloneElement() 的第三个参数 children 的使用*

```
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
```

### props 传函数

上面的两种方式，都是实现了父组件（跨级）向后代组件通信，而要借助 `props` 实现后代组件（跨级）向父组件通信，或是实现同级别组件之间的通信，则需要 `props` 属性传递**函数**

其中的关键点就是，`props`所传递的函数需要**保持对父组件的引用**

看个后代组件向父组件通信的栗子：

```
class Wrapper extends Component {
  state = {
    num: 1,
  }

  render() {
    const addNum = () => {
      this.setState({
        num: this.state.num + 1,
      })
    }

    return (
      <div>
        The num is { this.state.num }
        <Counter handleClick={ addNum } />
      </div>
    )
  }
}

const Counter = props => <div onClick={ props.handleClick }>Click me to add num.</div>
```

上面的栗子使用箭头函数来保存 `this` 的引用，使得它始终指向父组件

而跨组件向父组件通讯就是继续向下传递这个函数 `props`，这里就不多赘述

事实上，同级别组件之间通过 `props` 相互通信也是需要借助一个公共的父组件来实现，看栗子：

```
class Wrapper extends Component {
  state = {
    topNum: 1,
    bottomNum: 1,
  }

  addNum(key) {
    const that = this

    return function(){
      that.setState({
        [key]: that.state[key] + 1,
      })
    }
  }

  render() {
    const { topNum, bottomNum } = this.state

    return (
      <div>
        <Counter
          num={topNum}
          handleClick={this.addNum('bottomNum')}
        />
        <Counter
          num={bottomNum}
          handleClick={this.addNum('topNum')}
        />
      </div>
    )
  }
}

const Counter = props => (
  <div
    onClick={ props.handleClick }
    style={{
      border: '1px solid #ccc',
      marginTop: '5px',
      padding: '5px',
    }}
  >
    <p>Click me to add another.</p>
    <p>{ props.num }</p>
  </div>
)
```

在公共的父组件中使用 `state` 保存这两个同级组件所**呈现的数据**以及**相互影响的点击事件监听**，然后分别将呈现数据、事件监听作为 `props` 传递给子组件，随着子组件触发事件监听，父组件的 `state` 变化，组件树重绘，实现了同级别组件之间的相互通信

值得注意的是 `.addNum` 函数的实现，这里使用闭包来保存对父组件实例的引用

### 小结

这样看，我们通过 `props` 实现了所有的应用场景，但是在日常生产工作中，`props` 通信常常只被推荐用来实现某些简单的组件，或者是局部使用，其中主要存在这些问题：

#### 带来数据传输的成本

尤其是在跨级通信或者同级别组件通信的栗子中，不难发现很多组件被无故添加了它并不需要的 `props` 属性，这带来了数据传输的成本

#### 不符合 Pure Render 的原则

相对数据传输的消耗，**组件树的重绘**所带来的开销将会更加巨大。

这个主要是体现在同级别组件通信的栗子中，需求上来说明明是两个同级别组件之间的相互通信，但是每次都需要重绘它们公共的父组件以触发组件数的重绘，同时这种重绘是不可避免的，这样的重绘开销是我们开发中需要避免的。

## context 通信

context 通信主要用来实现跨级父子组件之间的通信

然后值得注意的是，现在这个特性官方已经不推荐使用，相关的API将来可能会做改动，官方更加推荐使用 `Redux` / `MobX` 来取代

这里简单记录下相关的使用



`context` 从语义上来说，像是环境变量的概念

提供 `context` 的组件需要实现名称为 `childContextTypes` 的类型检查和名称为 `.getChildContext` 的类方法，其中 `.getChildContext` 方法返回的对象就是**所有后代组件**可以获取到的 `context` 对象

而后代组件想要获取到对应的 `context` 对象需要实现名称是 `contextType` 的类型检查，否则获取到的 `context` 会是空对象，实现了类型检查之后，对应后代组件的生命周期函数中也会出现对应的 `context` 参数

前面已经提到，`context` 现在官方都已经不推荐使用，官方也提到目前主要使用这个技术构建的是 `react-router` V4的实现，这里只做简单介绍

## 发布订阅模式

发布订阅模式，可以说是 `JavaScript` 中最常见的模式之一，其中的表现形式就是事件系统，在 `node` 中也有内置的 `event` 对象

### 实现原理

通过各个组件引入相同的**一个**实现了 `event` 接口的对象，同时在发布的方法（事件回调）中**保持对当前组件实例的引用**，就可以借助发布订阅模式实现各种关系组件之间的沟通了

实现的关键点还是：

1. 组件共用唯一的发布订阅控制对象
2. 组件发布的方法中需要保留对当前组件实例的引用（这里使用的是箭头函数）

### TodoList

下面基于发布订阅模式实现了简单的 `TodoList`

可以实现对应的增加 Todo、修改 Todo 的功能

其中主要是由 `SearchInput`、 `List` 两个组件组成

- `SearchInput` 发布 `MODIFY_TODO` 接受修改某条 `Todo` 文案的事件
- `List` 发布 `ADD_TODO` 增加一条 `Todo` 的事件
- `List` 发布 `CHANGE_TODO` 修改列表中某条 `Todo` 的事件

## 小结

篇幅的问题，没有办法介绍 `flux` / `Redux` 对于相关组件间通信的实现

上面的各个方法，使用的情景都是在相对简单的环境下（之前工作中使用发布监听模式的通信方式重构过工作中的某个页面），复杂的单页面应用中，还是需要配合使用 `flux` 或是 `Redux` 等状态管理工具

不过在学习各种组件通信的过程中，其中包含了各种各样的 `JavaScript` 技术，无论是闭包、还是设计模式，都是对技术的综合运用






