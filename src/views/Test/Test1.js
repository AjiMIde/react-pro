import React, { useCallback, useEffect, useState } from 'react'

function Child({val, getData}) {
  useEffect(() => {
    console.log('!!')
    getData();
  }, [getData]);

  return <div>{val}</div>;
}

let count = 0

export default function Text1 () {
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
