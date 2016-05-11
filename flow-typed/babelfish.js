/* @flow */

declare module babelfish {
    declare type Translations = {
        fallback: {
            [locale: string]: Array<string>
        },
        locales: {
            [locale: string]: {
                [key: string]: string;
            }
        }
    };

    declare class Babelfish {
        constructor(locale: string): void;

        addPhrase(locale: string, message: string, translation: string): void;
        t(locale: string, message: string, params?: Object|number|string): string;
        stringify(locale: string): Translations;
        load(dump: Translations): void;
        hasPhrase(locale: string, phrase: string, noFallback?: boolean): boolean;
    }

    declare var exports: Class<Babelfish>;
}
