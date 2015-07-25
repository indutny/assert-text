# assert-text

[![Build Status](https://secure.travis-ci.org/indutny/assert-text.png)](http://travis-ci.org/indutny/assert-text)
[![NPM version](https://badge.fury.io/js/assert-text.svg)](http://badge.fury.io/js/assert-text)

Proper assertion message when comparing multi-line texts.

## Usage

```js
var assertText = require('assert-text');

assertText.equal(
  'what a wonderful\n' +
      'idea for the\n' +
      'module',

  'what a wonderful\n' +
      'idea for a\n' +
      'module');
```

Example above will throw:

```
Error: lines not equal

      expected:     |      actual:
  what a wonderful  |  what a wonderful
* idea for a        |  idea for the
  module            |  module
```

## LICENSE

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2015.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
