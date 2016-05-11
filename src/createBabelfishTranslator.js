/* @flow */

import type {
    Translator,
    NeedTranslate
} from 'any-translate/i/interfaces'

import Babelfish from 'babelfish'
import LocalizedBabelfish from 'any-translate-adapter-babelfish/LocalizedBabelfish'

export default function createBabelfishTranslator(
    locale: string,
    phrases: Object,
    needTranslate?: NeedTranslate
): Translator {
    const bf: Translator = new LocalizedBabelfish(
        new Babelfish(locale),
        locale,
        needTranslate
    );
    bf.add(phrases)

    return bf
}
