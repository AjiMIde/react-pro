import React, { useState, useCallback, useEffect } from 'react';

function Example() {
  let [count, setCount] = useState(0);

  document.title = `You clicked ${count} times`;

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
  });

  console.log('render', count)

  const evt2 = useCallback(() => {
    console.log(count)
  }, [count])

  const click1 = () => {
    setCount(3)
    evt2()
  }

  const click2 = () => {
    count = '5'
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={click1}> Click me </button>
      <button onClick={evt2}> play me </button>
      <button onClick={click2}>click me 2</button>
    </div>
  );
}

export default Example

