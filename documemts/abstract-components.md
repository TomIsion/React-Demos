# React.js 组件间抽象

《深入React技术栈》读书笔记

有一类功能需要被不同的组件公用，此时就需要组件间的抽象

《深入React技术栈》 其中主要介绍了两中针对 React 的组件抽象的方式：

- mixin
- 高阶组件

## 修饰器

在介绍 mixin 与 高阶组件之前，先介绍 ES7 提案中的修饰器（Decorator），在书中组件间的抽象，都是基于**修饰器**来实现的

[修饰器 · 阮一峰](http://es6.ruanyifeng.com/#docs/decorator)

修饰器是一个**函数**，**用来修改类的行为**。*同时它对类行为的改变，是在代码编译时发生的*。

或者简而言之，**修饰器本质就是编译时执行的函数**

```
// 这是个修饰器函数
function decoratorDemo(target) {
  target.decoratorWrapped = true
}

@decoratorDemo
class classDemo {}

// 通过上面的方式引入了修饰器
// 类被改变了
console.log(classDemo.decoratorWrapped) // true
```

修饰器函数的本质上是这样的：

```
decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A
```

记录这篇笔记的时候，Babel 对于 decorator 的支持还需要引入插件

```
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties" // 后面这个不是必要的
  ]
```

*PS：这里的介绍，大量参考了阮一峰老师的ES6教程，希望完整了解ES6修饰器的，建议移步[链接](http://es6.ruanyifeng.com/#docs/decorator)详细了解*

## mixin

## 高阶组件

高阶组件就是从高阶函数引申出来的概念，**接受React组件作为输入，输出一个新的React组件**。

实现的方式有以下两种：

- 属性代理
- 反向继承

### 属性代理