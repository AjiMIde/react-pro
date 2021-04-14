import React, { useCallback, useEffect, useState, memo } from 'react'

function Child({val, getData}) {
  useEffect(() => {
    console.log('!!')
    getData();
  }, [getData]);

  return <div>{val}</div>;
}

let count = 0

function Text1 () {
  const [val, setVal] = useState("");
  const [val2, setVal2] = useState('')
  window.setVal2 = setVal2

  const getData = useCallback(() => {
    setTimeout(() => {
      count++;
      setVal("new data " + count);
    }, 1500);
  }, [val2]);

  return <Child val={val} getData={getData} />
}

function Test2 () {
  const [s, setS] = useState(0)
  return (<div>
    <button onClick={() => setS(s+1)}>+1</button>
  </div>)
}

// ---
// ---
const Child1 = memo((props) => {
  console.log('re render')
  return (<div>
    <p> Num: {props.num} </p>
  </div>)
})

function Father1 () {
  const [num, setNum] = useState(1)
  const [price, setPrice] = useState(8.8)

  const s = {
    width: 400,
    height: 400,
    border: '1px solid #ccc',
    resize: 'both',
    overflow: 'auto'
  }
  return (<div>
    <div style={s}>?</div>
    <p>Num: {num} <button onClick={() => setNum(num + 1)}>+1</button></p>
    <p>Price: {price} <button onClick={() => setPrice(price + 2)}>+2</button></p>
    <Child1 num={num}/>
  </div>)
}

export default Father1
