import React, { memo, useCallback, useState, useEffect } from 'react'
// import Children1 from './children1'
// import Children2 from './children2'

const Children1 = React.lazy(() => import('./children1'))
const Children2 = React.lazy(() => import('./children2'))

function Father () {
  const [type, setType] = useState('')
  return (<div>
    <h1>My homepage</h1>
    <div>
      <button onClick={() => {setType('pocket')}}>switch to pocket</button>
      <button onClick={() => {setType('order')}}>switch to order</button>
    </div>
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        { type === 'pocket' && <Children1/>}
        { type === 'order' && <Children2/>}
      </React.Suspense>
    </div>
  </div>)
}

export default Father
