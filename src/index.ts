import { decode } from 'js-base64'
import { IndexDBStorage } from 'indexdb-storage'

// eslint-disable-next-line no-useless-escape
const workerString = `"use strict";const e="function"==typeof atob,r="function"==typeof Buffer,t="function"==typeof TextDecoder?new TextDecoder:void 0,a=("function"==typeof TextEncoder&&new TextEncoder,[..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="]),o=(e=>{let r={};return a.forEach((e,t)=>r[e]=t),r})(),n=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,c=String.fromCharCode.bind(String),f="function"==typeof Uint8Array.from?Uint8Array.from.bind(Uint8Array):(e,r=(e=>e))=>new Uint8Array(Array.prototype.slice.call(e,0).map(r)),d=e=>e.replace(/[^A-Za-z0-9\+\/]/g,""),i=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,A=e=>{switch(e.length){case 4:var r=((7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3))-65536;return c(55296+(r>>>10))+c(56320+(1023&r));case 3:return c((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return c((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},h=e?e=>atob(d(e)):r?e=>Buffer.from(e,"base64").toString("binary"):e=>{if(e=e.replace(/\s+/g,""),!n.test(e))throw new TypeError("malformed base64.");e+="==".slice(2-(3&e.length));let r,t,a,f="";for(let n=0;n<e.length;)r=o[e.charAt(n++)]<<18|o[e.charAt(n++)]<<12|(t=o[e.charAt(n++)])<<6|(a=o[e.charAt(n++)]),f+=64===t?c(r>>16&255):64===a?c(r>>16&255,r>>8&255):c(r>>16&255,r>>8&255,255&r);return f},s=r?e=>f(Buffer.from(e,"base64")):e=>f(h(e),e=>e.charCodeAt(0)),u=r?e=>Buffer.from(e,"base64").toString("utf8"):t?e=>t.decode(s(e)):e=>h(e).replace(i,A);var l=self;l.addEventListener("message",(function(e){var r;l.postMessage((r=e.data,u(d(r.replace(/[-_]/g,e=>"-"==e?"+":"/")))))}));

`
export interface Base64Option {
  /** webdb 名称 */
  webdb?: string
  /** 是否需要转 json */
  json?: boolean
}

export type Base64Property = Required<Base64Option>

const WOEKER_SUPPORTED = typeof Worker !== 'undefined'

export class Base64 {
  /** webdb 名称 */
  private webdb: Base64Property['webdb'] = 'base64-decode'
  /** 是否需要转 json */
  private json: Base64Property['json'] = true
  /** indexdb */
  private storage?: IndexDBStorage
  /** web worker */
  private worker?: Worker
  constructor(option: Base64Option) {
    const { webdb, json } = option
    if (webdb !== undefined) {
      this.webdb = webdb
    }
    if (json !== undefined) {
      this.json = json
    }
    this.storage = new IndexDBStorage({ name: this.webdb })

    if (WOEKER_SUPPORTED) {
      console.log(workerString)
      // TODO: init worker
    }
  }

  async decode<R = any>(ctx: string): Promise<R> {
    const { json } = this
    let r = await this.storage?.getItem(ctx)
    if (r) {
      return r as R
    } else {
      if (this.worker) {
        // TODO:
      } else {
        try {
          r = decode(ctx)
          if (json) {
            r = JSON.parse(r)
          }
          await this.storage?.setItem(ctx, r)
        } catch (er) {
          r = ''
        }
      }
      return r as R
    }
  }
}
