/* eslint-disable no-useless-escape */
import { decode, isValid } from 'js-base64'
import { IndexDBStorage, IndexDBStorageOption } from 'indexdb-storage'
export { decode, isValid } from 'js-base64'

const workerString = `
"use strict";var r,t="function"==typeof atob,e="function"==typeof Buffer,n="function"==typeof TextDecoder?new TextDecoder:void 0,o=("function"==typeof TextEncoder&&new TextEncoder,[].concat("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=")),c=(r={},o.forEach((function(t,e){return r[t]=e})),r),a=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,f=String.fromCharCode.bind(String),u="function"==typeof Uint8Array.from?Uint8Array.from.bind(Uint8Array):function(r,t){return void 0===t&&(t=function(r){return r}),new Uint8Array(Array.prototype.slice.call(r,0).map(t))},i=function(r){return r.replace(/[^A-Za-z0-9\+\/]/g,"")},d=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,A=function(r){switch(r.length){case 4:var t=((7&r.charCodeAt(0))<<18|(63&r.charCodeAt(1))<<12|(63&r.charCodeAt(2))<<6|63&r.charCodeAt(3))-65536;return f(55296+(t>>>10))+f(56320+(1023&t));case 3:return f((15&r.charCodeAt(0))<<12|(63&r.charCodeAt(1))<<6|63&r.charCodeAt(2));default:return f((31&r.charCodeAt(0))<<6|63&r.charCodeAt(1))}},h=t?function(r){return atob(i(r))}:e?function(r){return Buffer.from(r,"base64").toString("binary")}:function(r){if(r=r.replace(/\s+/g,""),!a.test(r))throw new TypeError("malformed base64.");r+="==".slice(2-(3&r.length));for(var t,e,n,o="",u=0;u<r.length;)t=c[r.charAt(u++)]<<18|c[r.charAt(u++)]<<12|(e=c[r.charAt(u++)])<<6|(n=c[r.charAt(u++)]),o+=64===e?f(t>>16&255):64===n?f(t>>16&255,t>>8&255):f(t>>16&255,t>>8&255,255&t);return o},s=e?function(r){return u(Buffer.from(r,"base64"))}:function(r){return u(h(r),(function(r){return r.charCodeAt(0)}))},x=e?function(r){return Buffer.from(r,"base64").toString("utf8")}:n?function(r){return n.decode(s(r))}:function(r){return h(r).replace(d,A)},l=self;l.addEventListener("message",(function(r){var t;l.postMessage((t=r.data,x(i(t.replace(/[-_]/g,(function(r){return"-"==r?"+":"/"}))))))}));
`
export interface Base64Option {
  /** webdb 名称 */
  webdb?: IndexDBStorageOption
  /** 是否需要转 json */
  json?: boolean
}

export type Base64Property = Required<Base64Option>

const WOEKER_SUPPORTED = typeof Worker !== 'undefined' && typeof URL !== 'undefined'

export class Base64 {
  /** webdb 名称 */
  private webdb: Base64Property['webdb'] = { name: 'base64-decode' }
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
    this.storage = new IndexDBStorage({ name: this.webdb.name })

    if (WOEKER_SUPPORTED) {
      this.worker = new Worker(
        URL.createObjectURL(new Blob([workerString], { type: 'application/javascript' })),
        {
          name: 'base64-decode'
        }
      )
    }
  }

  isValid(ctx: any) {
    return isValid(ctx)
  }

  async decode<R = any>(ctx: string): Promise<R> {
    const { json } = this
    let r = await this.storage?.getItem(ctx)
    if (r) {
      return r as R
    } else {
      if (this.worker) {
        r = await new Promise((resolve, reject) => {
          if (this.worker) {
            this.worker.onmessage = (e) => {
              resolve(e.data)
            }
            this.worker.postMessage(ctx)
            this.worker.onerror = (er) => {
              reject(er)
            }
          }
        })
        if (json) {
          r = JSON.parse(r)
        }

        await this.storage?.setItem(ctx, r)
      } else {
        r = decode(ctx)
        if (json) {
          r = JSON.parse(r)
        }
        await this.storage?.setItem(ctx, r)
      }
      return r as R
    }
  }
}
