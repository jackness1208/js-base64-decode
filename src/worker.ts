import { decode } from 'js-base64'
import { Worker } from '../typing/global'
function toCtx<R = any>(ctx: any) {
  return ctx as R
}

const ctx = toCtx<Worker>(self)

ctx.addEventListener('message', (ev) => {
  ctx.postMessage(decode(ev.data))
})
