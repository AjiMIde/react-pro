import React, { memo, useCallback, useState, useEffect } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

const cls = memo(() => {
  const [value, setValue] = useState(BraftEditor.createEditorState(null))

  const handleChange = (val) => {
    console.error(val)

  }
  return (<div>
    <BraftEditor value={value} onChange={handleChange}/>
  </div>)
})


export default cls


