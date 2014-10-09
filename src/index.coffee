
{ TypeCode, SubTypeCode, TypeCodeToName, SubTypeCodeToName } = require './codes'
{ BufferReader, CStringRef } = require './buffer-reader'
{ binsert } = require 'barray'

structify = (rd, arr = false, meta = {}) ->
  # assert buf.length, rd.readInt32LE()
  clen = rd.readInt32LE()
  stop = false

  # console.log { clen }

  binsert (meta['@type'] ?= []), (if arr then 'Array' else 'Object')

  # o = []
  # bson.BSON.deserialize buf, i, 1, o, {}

  loop
    break if rd.eof or (eType = rd.readInt8()) is 0
    eNameRange = rd.readRangeUntil 0

    eTypeName = TypeCodeToName[eType]

    # In meta structure we refer to array elements with index 0 only.
    if arr
      eName = 0
    else
      eName = rd.rangeToCString eNameRange

    eMeta = meta[eName] ?= {}
    eMetaType = eMeta['@type'] ?= []
    binsert eMetaType, eTypeName

    # console.log { eName, eTypeName, eType }
    assert eType != 0
    assert eTypeName?

    switch eType

      when TypeCode.Double
        rd.skip 8

      when TypeCode.String
        len = rd.readInt32LE()
        range = rd.readRange len
        # console.log { len, range }

      when TypeCode.Object
        structify rd, false, eMeta

      when TypeCode.Array
        structify rd, true, eMeta

      when TypeCode.Binary
        len = rd.readInt32LE()
        subtype = rd.readUInt8()
        rd.skip len

      when TypeCode.Undefined # deprecated
        undefined

      when TypeCode.ObjectId
        rd.skip 12

      when TypeCode.Boolean
        rd.skip 1

      when TypeCode.UTC
        rd.skip 8

      when TypeCode.Null
        undefined

      when TypeCode.RegExp
        rd.readRangeUntil 0
        rd.readRangeUntil 0

      when TypeCode.DBPointer
        rd.skip rd.readInt32LE()
        rd.skip 12

      when TypeCode.JS
        rd.skip rd.readInt32LE()

      when TypeCode._0x0E
        rd.skip rd.readInt32LE()

      when TypeCode.ScopedJS
        rd.skip rd.readInt32LE()

      when TypeCode.Int32
        rd.skip 4

      when TypeCode.Timestamp
        rd.skip 8

      when TypeCode.Int64
        rd.skip 4

      when TypeCode.MinKey
        undefined

      when TypeCode.MaxKey
        undefined

module.exports = {
  structify
}
