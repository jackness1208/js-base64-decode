import React from 'react'
import ReactDOM from 'react-dom'
import { Base64 } from '../../../../../../'
import logoIcon from './images/logo.png'
import './index.css'

const App = (
  <div className='dm-box'>
    <img src={logoIcon} />
    <h1 className='dm-title'>hello plugin </h1>
    <p className='dm-info'>demo only</p>
  </div>
)

const base64 = new Base64({ json: true })
base64
  .decode(
    'eyJwYXlfdHlwZSI6IDEsICJpY29uX21vYiI6IDQyMzEsICJkZXNjcmlwdGlvbiI6ICLnjonlhZQoMVnluIEvMTAwMOe6oumSuylbXFxuXeWvueaWueiOt+W+l++8mjQwMCDok53pkrtbXFxuXeS4reeni+S9s+WTgSzlj4zlh7vpgIHlh7oiLCAiYnVzaW5lc3MiOiAwLCAiZ3JhZGUiOiAzLCAiYXR0cmlidXRlIjoge30sICJwcmljZSI6IDEwMCwgIm5hbWUiOiAi546J5YWUIiwgInNlbmRfbnVtIjogeyIxMCI6ICLljYHlhajljYHnvo4iLCAiMTMxNCI6ICLkuIDnlJ/kuIDkuJYiLCAiMzAiOiAi5oOz5L2gLi4uIiwgIjEiOiAi5LiA5b+D5LiA5oSPIiwgIjUyMCI6ICLmiJHniLHkvaAiLCAiNjYiOiAi5LiA5YiH6aG65YipIiwgIjE4OCI6ICLopoHmirHmirEifSwgImljb25fZ2lmIjogNDIzMiwgInByZXBhaWQiOiAwLCAiaWNvbl9wYyI6IDQyMzAsICJnaWZ0X2lkIjogMTA2OH0='
  )
  .then((r) => {
    console.log('===', r)
  })

ReactDOM.render(App, document.querySelector('#app'))
