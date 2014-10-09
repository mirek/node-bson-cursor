
assert = require 'assert'
bson = require('bson').pure()
$ = require '../src'

describe 'structify', ->

  it 'should work with basic types', ->
    doc =
      str: "string"
      int: 1
      fl: 1.123
      yes: true
      no: false
      inf: Infinity
      nil: null
      now: new Date
      re: /foo/

    expected =
      _types: ["Object"]
      str: _types: ["String"]
      int: _types: ["Int32"]
      fl: _types: ["Double"]
      yes: _types: ["Boolean"]
      no: _types: ["Boolean"]
      inf: _types: ["Double"]
      nil: _types: ["Null"]
      now: _types: ["UTC"]
      re: _types: ["RegExp"]

    meta = {}
    $.structify new $.BufferReader(new bson.BSON.serialize(doc, false, true)), false, meta
    assert.deepEqual expected, meta

      # email: "email@email.com"
      # encrypted_password: "password"
      # friends: [
      #   "4db96b973d01205364000006"
      #   "4dc77b24c5ba38be14000002"
      # ]
      # location: [
      #   44.3253532
      #   23.0234234
      # ]
      # name: "peppa pig"
      # password_salt: "sugar"
      # profile_fields: []
      # username: "peppa"
      # _id: new bson.ObjectId()
      # foo:
      #   bar:
      #     z:
      #       1
