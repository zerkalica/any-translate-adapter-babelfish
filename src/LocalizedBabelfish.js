/* @flow */

import type {
    NeedTranslate,
    TranslateArgs
} from 'any-translate/i/interfaces'

import type {Babelfish} from 'babelfish'

import flattenObject from 'any-translate-adapter-babelfish/flattenObject'

function noop() {}

export default class LocalizedBabelfish {
    _locale: string;
    _babelfish: Babelfish;
    _needTranslate: NeedTranslate;
    _notHasMap: {[id: string]: boolean};

    constructor(
        babelfish: Babelfish,
        locale: string,
        needTranslate: NeedTranslate = noop
    ) {
        this._locale = locale
        this._babelfish = babelfish
        this._needTranslate = needTranslate
        this._notHasMap = {}
    }

    add(phrases: Object): void {
        const bf = this._babelfish
        const locale = this._locale
        const translations = flattenObject(phrases)
        for (let i = 0, l = translations.length; i < l; i++) {
            const [path, phrase] = translations[i]
            bf.addPhrase(locale, path.join('.'), phrase)
        }
    }

    translate(message: string, params: TranslateArgs): string {
        const bf = this._babelfish
        const locale = this._locale
        if (!bf.hasPhrase(locale, message)) {
            this._notHasMap[locale + message] = true
            this._needTranslate(locale, message)
            bf.addPhrase(locale, message, message)
        }

        return bf.translate(locale, message, params || {})
    }

    has(message: string): boolean {
        return this._notHasMap[this._locale + message]
            ? false
            : this._babelfish.hasPhrase(this._locale, message)
    }
}
