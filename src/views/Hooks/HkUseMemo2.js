import React, { useMemo, useCallback, useState } from 'react'

function Fun () {
  const [age, setAge] = useState(18)
  const [weight, setWeight] = useState(130)

  console.log('对于function组件来讲，一旦更新了state 中的数据，整个function必定重新渲染，这就是为什么这个console重复出现的原因')


  const memo1 = useMemo(() => {
    console.log('memo1, 不设置依赖，只有初次运行被执行到')
  }, [])

  const memo2 = useMemo(() => {
    console.log('memo2, 设置依赖state: weight, 当 weight 被更新后触发')
  }, [weight])


  const handleClick1 = () => {
    setAge(age + 1)
  }

  const handleClick2 = () => {
    setWeight(weight + 2)
  }

  return (
    <div className={'hook-exp'}>
      <div>
      年龄：{age}, 体重: {weight}
      </div>
      <div>
        <button onClick={handleClick1}>changeAge</button>
        <button onClick={handleClick2}>changeWeight</button>
      </div>
    </div>
  )
}

export default Fun


