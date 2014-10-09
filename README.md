
## Summary

BSON cursor provides fast traversal/reads on well formed bson documents.

Much faster than standard approach if, for example, you want to scan or know the structure of millions MongoDB documents.

## Installation

    npm install bson-cursor --save

## Usage

    { bson } = require 'bson'
    { structify, BufferReader } = require 'bson-cursor'

    # metadata accumulator
    meta = {}

    docA = foo: bar: 'aaa'
    docB = bar: baz: 2.12

    bsonA = new bson.BSON.serialize docA, false, true
    bsonB = new bson.BSON.serialize docB, false, true

    # get struct from first one
    structify new BufferReader(bsonA), false, meta

    # update with another struct
    structify new BufferReader(bsonB), false, meta

    console.log JSON.stringify meta, false, '  '

...will print schema like:

    {
      "_types": [
        "Object"
      ],
      "foo": {
        "_types": [
          "Object"
        ],
        "bar": {
          "_types": [
            "String"
          ]
        }
      },
      "bar": {
        "_types": [
          "Object"
        ],
        "baz": {
          "_types": [
            "Double"
          ]
        }
      }
    }

## License

    The MIT License (MIT)

    Copyright (c) 2014 Mirek Rusin

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
