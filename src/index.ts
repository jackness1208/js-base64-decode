import { decode } from 'js-base64'
import { IndexDBStorage } from 'indexdb-storage'

export interface Base64Option {
  /** webdb 名称 */
  webdb?: string
  /** 是否需要转 json */
  json?: boolean
}

export type Base64Property = Required<Base64Option>

const WOEKER_SUPPORTED = typeof Worker !== 'undefined'

export class Base64 {
  webdb: Base64Property['webdb'] = 'base64-decode'
  json: Base64Property['json'] = true
  storage?: IndexDBStorage
  worker?: Worker
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
