import {int2char} from "./util";

// const b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const b64pad = "=";

export function hex2b64(h:string) {
    let i;
    let c;
    let ret = "";
    for (i = 0; i + 3 <= h.length; i += 3) {
        c = parseInt(h.substring(i, i + 3), 16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if (i + 1 == h.length) {
        c = parseInt(h.substring(i, i + 1), 16);
        ret += b64map.charAt(c << 2);
    } else if (i + 2 == h.length) {
        c = parseInt(h.substring(i, i + 2), 16);
        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }
    while ((ret.length & 3) > 0) {
        ret += b64pad;
    }
    return ret;
}

// convert a base64 string to hex
export function b64tohex(s:string) {
    let ret = "";
    let i;
    let k = 0; // b64 state, 0-3
    let slop = 0;
    for (i = 0; i < s.length; ++i) {
        if (s.charAt(i) == b64pad) {
            break;
        }
        const v = b64map.indexOf(s.charAt(i));
        if (v < 0) {
            continue;
        }
        if (k == 0) {
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 1;
        } else if (k == 1) {
            ret += int2char((slop << 2) | (v >> 4));
            slop = v & 0xf;
            k = 2;
        } else if (k == 2) {
            ret += int2char(slop);
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 3;
        } else {
            ret += int2char((slop << 2) | (v >> 4));
            ret += int2char(v & 0xf);
            k = 0;
        }
    }
    if (k == 1) {
        ret += int2char(slop << 2);
    }
    return ret;
}

// convert a base64 string to a byte/number array
export function b64toBA(s:string) {
    // piggyback on b64tohex for now, optimize later
    const h = b64tohex(s);
    let i;
    const a = [];
    for (i = 0; 2 * i < h.length; ++i) {
        a[i] = parseInt(h.substring(2 * i, 2 * i + 2), 16);
    }
    return a;
}
