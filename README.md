# any-translate-adapter-babelfish

Adapt [babelfish](https://github.com/nodeca/babelfish) for [any-translate](https://github.com/zerkalica/any-translate) i18n decorator library.

## Example

```js
/* @flow */

import type {
    TokenSubject,
    Translator,
    TokenizedTranslate
} from 'any-translate'

import {
    createTranslate,
    createHasTranslation
} from 'any-translate'

import {createBabelfishTranslator} from 'any-translate-adapter-babelfish'

function onNotPresentTranslation(locale: string, message: string): void {
    console.log('Not present: ', locale, message)
}

const translator: Translator = createBabelfishTranslator(
    'ru_RU',
    {
        'module1': {
            'hello': 'Привет, #{name}',
            'helloWithLink': 'Привет, #{name}, ссылка: #{link}.'
        }
    },
    onNotPresentTranslation
);

const t: TokenizedTranslate = createTranslate(translator);
const hasT: (message: string) => boolean = createHasTranslation(translator);

function LinkWidget(some: any): void {
    //
}

const translated1: Array<TokenSubject>|string = t('module1.hello', {
    name: 'Вася',
    link: LinkWidget
});
// 'Привет, Вася'

const translated2: Array<TokenSubject>|string = t('module1.helloWithLink', {
    name: 'Вася',
    link: LinkWidget
});
// ['Привет, Вася, ссылка: ', LinkWidget, '.']
```
