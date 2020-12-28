/*!
 * js-base64-decode cjs 0.1.1
 * (c) 2020 - 2020 jackness
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var indexdbStorage = require('indexdb-storage');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) { throw t[1]; } return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) { throw new TypeError("Generator is already executing."); }
        while (_) { try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) { return t; }
            if (y = 0, t) { op = [op[0] & 2, t.value]; }
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) { _.ops.pop(); }
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; } }
        if (op[0] & 5) { throw op[1]; } return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 *  base64.ts
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 *
 * @author Dan Kogai (https://github.com/dankogai)
 */
var _hasatob = typeof atob === 'function';
var _hasBuffer = typeof Buffer === 'function';
var _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;
var _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;
var b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64chs = [].concat( b64ch );
var b64tab = (function (a) {
    var tab = {};
    a.forEach(function (c, i) { return tab[c] = i; });
    return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === 'function'
    ? Uint8Array.from.bind(Uint8Array)
    : function (it, fn) {
      if ( fn === void 0 ) fn = function (x) { return x; };

      return new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
};
var _tidyB64 = function (s) { return s.replace(/[^A-Za-z0-9\+\/]/g, ''); };
// This trick is found broken https://github.com/dankogai/js-base64/issues/130
// const btou = (src: string) => decodeURIComponent(escape(src));
// reverting good old fationed regexp
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = function (cccc) {
    switch (cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                | ((0x3f & cccc.charCodeAt(1)) << 12)
                | ((0x3f & cccc.charCodeAt(2)) << 6)
                | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;
            return (_fromCC((offset >>> 10) + 0xD800)
                + _fromCC((offset & 0x3FF) + 0xDC00));
        case 3:
            return _fromCC(((0x0f & cccc.charCodeAt(0)) << 12)
                | ((0x3f & cccc.charCodeAt(1)) << 6)
                | (0x3f & cccc.charCodeAt(2)));
        default:
            return _fromCC(((0x1f & cccc.charCodeAt(0)) << 6)
                | (0x3f & cccc.charCodeAt(1)));
    }
};
/**
 * @deprecated should have been internal use only.
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */
var btou = function (b) { return b.replace(re_btou, cb_btou); };
/**
 * polyfill version of `atob`
 */
var atobPolyfill = function (asc) {
    // console.log('polyfilled');
    asc = asc.replace(/\s+/g, '');
    if (!b64re.test(asc))
        { throw new TypeError('malformed base64.'); }
    asc += '=='.slice(2 - (asc.length & 3));
    var u24, bin = '', r1, r2;
    for (var i = 0; i < asc.length;) {
        u24 = b64tab[asc.charAt(i++)] << 18
            | b64tab[asc.charAt(i++)] << 12
            | (r1 = b64tab[asc.charAt(i++)]) << 6
            | (r2 = b64tab[asc.charAt(i++)]);
        bin += r1 === 64 ? _fromCC(u24 >> 16 & 255)
            : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255)
                : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
};
/**
 * does what `window.atob` of web browsers do.
 * @param {String} asc Base64-encoded string
 * @returns {string} binary string
 */
var _atob = _hasatob ? function (asc) { return atob(_tidyB64(asc)); }
    : _hasBuffer ? function (asc) { return Buffer.from(asc, 'base64').toString('binary'); }
        : atobPolyfill;
//
var _toUint8Array = _hasBuffer
    ? function (a) { return _U8Afrom(Buffer.from(a, 'base64')); }
    : function (a) { return _U8Afrom(_atob(a), function (c) { return c.charCodeAt(0); }); };
//
var _decode = _hasBuffer
    ? function (a) { return Buffer.from(a, 'base64').toString('utf8'); }
    : _TD
        ? function (a) { return _TD.decode(_toUint8Array(a)); }
        : function (a) { return btou(_atob(a)); };
var _unURI = function (a) { return _tidyB64(a.replace(/[-_]/g, function (m0) { return m0 == '-' ? '+' : '/'; })); };
/**
 * converts a Base64 string to a UTF-8 string.
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {string} UTF-8 string
 */
var decode = function (src) { return _decode(_unURI(src)); };

var workerString = "\n\"use strict\";var r,t=\"function\"==typeof atob,e=\"function\"==typeof Buffer,n=\"function\"==typeof TextDecoder?new TextDecoder:void 0,o=(\"function\"==typeof TextEncoder&&new TextEncoder,[].concat(\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\")),c=(r={},o.forEach((function(t,e){return r[t]=e})),r),a=/^(?:[A-Za-zd+/]{4})*?(?:[A-Za-zd+/]{2}(?:==)?|[A-Za-zd+/]{3}=?)?$/,f=String.fromCharCode.bind(String),u=\"function\"==typeof Uint8Array.from?Uint8Array.from.bind(Uint8Array):function(r,t){return void 0===t&&(t=function(r){return r}),new Uint8Array(Array.prototype.slice.call(r,0).map(t))},i=function(r){return r.replace(/[^A-Za-z0-9+/]/g,\"\")},d=/[\u00C0-\u00DF][\u0080-\u00BF]|[\u00E0-\u00EF][\u0080-\u00BF]{2}|[\u00F0-\u00F7][\u0080-\u00BF]{3}/g,A=function(r){switch(r.length){case 4:var t=((7&r.charCodeAt(0))<<18|(63&r.charCodeAt(1))<<12|(63&r.charCodeAt(2))<<6|63&r.charCodeAt(3))-65536;return f(55296+(t>>>10))+f(56320+(1023&t));case 3:return f((15&r.charCodeAt(0))<<12|(63&r.charCodeAt(1))<<6|63&r.charCodeAt(2));default:return f((31&r.charCodeAt(0))<<6|63&r.charCodeAt(1))}},h=t?function(r){return atob(i(r))}:e?function(r){return Buffer.from(r,\"base64\").toString(\"binary\")}:function(r){if(r=r.replace(/s+/g,\"\"),!a.test(r))throw new TypeError(\"malformed base64.\");r+=\"==\".slice(2-(3&r.length));for(var t,e,n,o=\"\",u=0;u<r.length;)t=c[r.charAt(u++)]<<18|c[r.charAt(u++)]<<12|(e=c[r.charAt(u++)])<<6|(n=c[r.charAt(u++)]),o+=64===e?f(t>>16&255):64===n?f(t>>16&255,t>>8&255):f(t>>16&255,t>>8&255,255&t);return o},s=e?function(r){return u(Buffer.from(r,\"base64\"))}:function(r){return u(h(r),(function(r){return r.charCodeAt(0)}))},x=e?function(r){return Buffer.from(r,\"base64\").toString(\"utf8\")}:n?function(r){return n.decode(s(r))}:function(r){return h(r).replace(d,A)},l=self;l.addEventListener(\"message\",(function(r){var t;l.postMessage((t=r.data,x(i(t.replace(/[-_]/g,(function(r){return\"-\"==r?\"+\":\"/\"}))))))}));\n";
var WOEKER_SUPPORTED = typeof Worker !== 'undefined' && typeof URL !== 'undefined';
var Base64 = /** @class */ (function () {
    function Base64(option) {
        /** webdb 名称 */
        this.webdb = { name: 'base64-decode' };
        /** 是否需要转 json */
        this.json = true;
        var webdb = option.webdb, json = option.json;
        if (webdb !== undefined) {
            this.webdb = webdb;
        }
        if (json !== undefined) {
            this.json = json;
        }
        this.storage = new indexdbStorage.IndexDBStorage({ name: this.webdb.name });
        if (WOEKER_SUPPORTED) {
            this.worker = new Worker(URL.createObjectURL(new Blob([workerString], { type: 'application/javascript' })), {
                name: 'base64-decode'
            });
        }
    }
    Base64.prototype.decode = function (ctx) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var json, r;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        json = this.json;
                        return [4 /*yield*/, ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.getItem(ctx))];
                    case 1:
                        r = _d.sent();
                        if (!r) { return [3 /*break*/, 2]; }
                        return [2 /*return*/, r];
                    case 2:
                        if (!this.worker) { return [3 /*break*/, 5]; }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                if (_this.worker) {
                                    _this.worker.onmessage = function (e) {
                                        resolve(e.data);
                                    };
                                    _this.worker.postMessage(ctx);
                                    _this.worker.onerror = function (er) {
                                        reject(er);
                                    };
                                }
                            })];
                    case 3:
                        r = _d.sent();
                        if (json) {
                            r = JSON.parse(r);
                        }
                        return [4 /*yield*/, ((_b = this.storage) === null || _b === void 0 ? void 0 : _b.setItem(ctx, r))];
                    case 4:
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        r = decode(ctx);
                        if (json) {
                            r = JSON.parse(r);
                        }
                        return [4 /*yield*/, ((_c = this.storage) === null || _c === void 0 ? void 0 : _c.setItem(ctx, r))];
                    case 6:
                        _d.sent();
                        _d.label = 7;
                    case 7: return [2 /*return*/, r];
                }
            });
        });
    };
    return Base64;
}());

exports.Base64 = Base64;
