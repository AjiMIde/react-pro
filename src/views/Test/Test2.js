import React, { useCallback, useEffect, useState } from 'react'

export default function Text2 () {
  let [val, setVal] = useState(0);

  console.log(val, setVal)

  const setVal2 = () => {
    val += 1
    setVal(val)
  }
  useEffect(() => {
    console.log('eeef')
    return () => {
      console.log('leaving~')
    }
  })

  return (<div>
    click me <button onClick={setVal2}>点击</button>
    <div>val: {val}</div>
  </div>)
}
