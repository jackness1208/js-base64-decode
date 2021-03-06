# js-base64-decode

通过 indexDB 和 webworker 优化 base64 decode 速度，适用于频繁调用 base64 decode 场景

## install

```bash
# yarn
yarn add js-base64-decode
# npm
npm i js-base64-decode --save
```

## 使用

```typescript
import { Base64 } from 'js-base64-decode'
const base64 = new Base64({ json: true })

base64.decode('some code').then((r) => {
  console.log(r)
})
```

## types

```typescript
import { IndexDBStorageOption } from 'indexdb-storage'
export interface Base64Option {
  /** webdb 名称 */
  webdb?: IndexDBStorageOption
  /** 是否需要转 json */
  json?: boolean
}
export declare type Base64Property = Required<Base64Option>
export declare class Base64 {
  /** webdb 名称 */
  private webdb
  /** 是否需要转 json */
  private json
  /** indexdb */
  private storage?
  /** web worker */
  private worker?
  constructor(option: Base64Option)
  decode<R = any>(ctx: string): Promise<R>
}
```
