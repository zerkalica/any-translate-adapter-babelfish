/* @flow */

type FlattenRec = [string[], string];

function doFlattenObject(
    obj: Object,
    acc: Array<FlattenRec>,
    prefix: Array<string>
): void {
    const keys: Array<string> = Object.keys(obj);
    for (let i = 0, l = keys.length; i < l; i++) {
        const key: string = keys[i];
        const phrase: string = obj[key];
        const path: Array<string> = prefix.concat(key)
        if (typeof phrase === 'object') {
            doFlattenObject(phrase, acc, path)
        } else {
            acc.push([path, phrase])
        }
    }
}

export default function flattenObject(obj: Object): Array<FlattenRec> {
    const acc: Array<FlattenRec> = [];
    doFlattenObject(obj, acc, [])

    return acc
}
