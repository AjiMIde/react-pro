import React, { memo, useCallback, useState, useEffect } from 'react'
import _ from 'lodash'

function MyPocket () {
  const ary = [22, 33, 44]
  return <div>
    <h1>this is my pocket</h1>

    <div>{_.join(ary, ',')}</div>
  </div>
}

export default MyPocket
