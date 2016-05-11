/* @flow */

import type {
    TranslateArgs,
    Translator,
    NeedTranslate
} from 'any-translate'

import type Babelfish from 'babelfish'

declare module 'any-translate-adapter-babelfish' {
    declare class LocalizedBabelfish {
        constructor(
            babelfish: Babelfish,
            locale: string,
            needTranslate?: NeedTranslate
        ): void;

        add(phrases: Object): void;
        translate(message: string, params: TranslateArgs): string;
        has(message: string): boolean;
    }

    declare function createBabelfishTranslator(
        locale: string,
        phrases: Object,
        needTranslate?: NeedTranslate
    ): Translator;
}
