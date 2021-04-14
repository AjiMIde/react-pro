import React, { memo, useCallback, useState, useEffect, useMemo } from 'react'


const Fun2 = () => {
  const [state, changeState] = useState({});
  const memoizedValue = useMemo(() => Math.random(), []);
  const memoizedCallback = useCallback(() => console.log(memoizedValue), []);
  const unMemoizedCallback = () => console.log(memoizedValue);
  const { prevMemoizedCallback, prevUnMemoizedCallback } = state;
  console.log(prevMemoizedCallback, prevUnMemoizedCallback)
  return (
    <>
      <p>Memoized value: {memoizedValue}</p>
      <p>New update {Math.random()}</p>
      <p>is prevMemoizedCallback === to memoizedCallback: {String(prevMemoizedCallback === memoizedCallback)}</p>
      <p>is prevUnMemoizedCallback === to
        unMemoizedCallback: {String(prevUnMemoizedCallback === unMemoizedCallback)}</p>
      <p>
        <button onClick={memoizedCallback}>memoizedCallback</button>
      </p>
      <p>
        <button onClick={unMemoizedCallback}>unMemoizedCallback</button>
      </p>
      <p>
        <button onClick={() => changeState({
          prevMemoizedCallback: memoizedCallback,
          prevUnMemoizedCallback: unMemoizedCallback
        })}>update State
        </button>
      </p>
    </>
  );
};

function Exp1 () {
  const [num, setNum] = useState(1)
  const [price, setPrice] = useState(1)


  const fun = () => {
    console.log('i am fun')
  }
  window['fun' + num] = fun

  const cbFun = useCallback(() => {
    console.log('i am cb fun' + price)
  }, [price])
  window['cbFun' + num] = cbFun

  return (<div className={'exp-block'}>

    <p>Num: {num}, <button onClick={() => {
      setNum(num + 1)
    }}>num 加1</button></p>
    <p>Price: {price}, <button onClick={() => {
      setPrice(price + 1)
    }}>price 加1</button></p>
    <p>window.fun1 === window.fun2 ? {(window.fun1 === window.fun2) + ''}</p>
    <p>window.cbFun1 === window.cbFun2 ? {(window.cbFun1 === window.cbFun2) + ''}</p>

  </div>)
}

function Exp2 () {
  console.log('父组件 re render')

  const [price, setPrice] = useState(8.8)
  const [num, setNum] = useState(1)

  const fun1 = () => {
    console.log(price)
  }
  const cbFun1 = useCallback(() => {
    console.log(num)
  }, [num])

  return (<div className={'exp-block'}>
    <p>这是一个父组件，父组件中定义了一个回调函数 fun1 和 cbFun1 传给子组件</p>
    <p>其中，cbFun1是<code>useCallback</code>且依赖订单数 num 的变化，而 fun1 只是普通函数</p>
    <p>价格：{price}，订单数: {num}</p>
    <button onClick={() => {
      setPrice(price + 2.2)
    }}>点击改变价格 price
    </button>
    <button onClick={() => {
      setNum(num + 1)
    }}>点击改变订单数 num
    </button>
    <Exp21 fun1={fun1}/>
    <Exp22 cbFun1={cbFun1}/>
  </div>)
}

function Exp21 (props) {
  console.log('子组件1 re render')
  return (<div className={'exp-block'}>
    <p>这是子组件1, 使用了 props.fun1</p>
    <button onClick={props.fun1}>点击调用父组件 Fun1</button>
  </div>)
}

const Exp22 = React.memo((props) => {
  console.log('子组件2 re render')
  return (<div className={'exp-block'}>
    <p>这是子组件2，使用了 props.cbFun1</p>
    <button onClick={props.cbFun1}>点击调用父组件 cbFun1</button>
  </div>)
})

function Fun3 () {
  return (
    <div>
      <h3>useCallBack</h3>
      <p>在react的文档中，<code>useMemo与useCallback</code>功能类似，这一点要说明，“类似”在于都是缓存</p>
      <p>上面说到<code>function组件</code>重渲染时，会重新调用整个函数，这意味着，变量会重新被创建、赋值，函数同样也是，对比这下这个例子</p>
      <p>创建两个函数，window.fun1 与 window.cbFun1</p>
      <p>其中 cbFun 依赖 price 变化，当 num 改变时，cbFun 不重新定义</p>
      <p>点击下面的按钮,num + 1，创建出 fun2 与 cbFun2，并重新渲染组件</p>
      <p>此时，由于 fun1 与 fun2 不使用 <code>useCallback</code>，则 fun1 !== fun2，而 cbFun1 === cbFun2</p>
      <p>当改变 price 时，由于 cbFun 依赖 price 变量，则 cbFun1 !== cbFun2</p>
      <Exp1/>
      <p>这就是为什么react官网提出 <code>useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。</code>的原因，这两个<code>hooks</code>难度没有想象中那么大，有时候容易把它们的作用和使用难度想象得太大了
      </p>
      <p><b>那么，<code>useCallback</code>的使用场景在哪里？看看下面的例子(请打开 console 服用)</b></p>
      <Exp2/>
      <p>如上，当父组件中更新任何 state 时，都会引起父组件和子组件1的重渲染，而只当父组件更新 state: num 时，子组件2才重渲染</p>
      <p><b>需要注意的是，<code>useMemo, useCallback</code>往往需要跟<code>React.memo</code>配合使用</b></p>
      <p><b>另外，不要滥用或过早使用 <code>useMemo, useCallback</code>来优化组件，应当在重构阶段或是恰当的时候</b></p>
    </div>
  )
}

export default Fun3


