import { IndexDBStorageOption } from 'indexdb-storage';
export { decode, isValid } from 'js-base64';
export interface Base64Option {
    /** webdb 名称 */
    webdb?: IndexDBStorageOption;
    /** 是否需要转 json */
    json?: boolean;
}
export declare type Base64Property = Required<Base64Option>;
export declare class Base64 {
    /** webdb 名称 */
    private webdb;
    /** 是否需要转 json */
    private json;
    /** indexdb */
    private storage?;
    /** web worker */
    private worker?;
    constructor(option: Base64Option);
    isValid(ctx: any): boolean;
    decode<R = any>(ctx: string): Promise<R>;
}
