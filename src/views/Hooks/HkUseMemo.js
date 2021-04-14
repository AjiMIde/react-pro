import React, { memo, useState, useMemo } from 'react'

function UseMemoFun () {
  const [price, setPrice] = useState(0.8)
  const [count, setCount] = useState(1)
  const [phone, setPhone] = useState(137159)

  const allPrice = price * count

  const memoPrice = useMemo(() => {
    console.log('memo')
    return price * count
  }, [price, count])

  console.log('re render')
  return (<div>
    <h3>useMemo</h3>
    <p><code>useMemo</code>缓存了计算后的值，在该<code>memo value</code>的依赖值没有被改变的情况下，<code>useMemo</code>使用缓存值，这大大优化了渲染效率</p>
    <p>要明白<code>function组件</code>的渲染原理，即涉及到<code>state</code>值等变化的情况下<code>function</code>会被重新调用（即重渲染）</p>
    <p>理解这一点对接来的<code>useCallback</code>学习很大帮助</p>
    <div className={'hook-exp'}>
      <div>价格：{price} <button onClick={() => {setPrice(price + 0.8)}}>加价</button></div>
      <div>数量：{count} <button onClick={() => {setCount(count + 1)}}>加量</button></div>
      <div>总价：{allPrice}</div>
      <div>总价 memo：{memoPrice}</div>
      <div>联系号码: {phone} <button onClick={() => {setPhone(phone + 2)}}>改变联系号码</button></div>
    </div>
  </div>)
}

export default UseMemoFun


