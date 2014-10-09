
assert = require 'assert'
{ TypeCode, SubTypeCode, TypeCodeToName, SubTypeCodeToName } = require './codes'
{ BufferReader } = require './buffer-reader'
{ binsert } = require 'barray'

Key =
  Type: '_types'

# @param [BufferReader] bf
# @param [Boolean] arr Is the value an array
# @param [Object] meta output meta info
structify = (rd, arr, meta = {}) ->
  clen = rd.readInt32LE()
  # assert buf.length, clen

  binsert (meta[Key.Type] ?= []), (if arr then 'Array' else 'Object')

  # Stop if we're at the end of stream or
  loop

    break if rd.eof or (eType = rd.readInt8()) is 0

    # Get type name
    eTypeName = TypeCodeToName[eType]

    # Read name as range
    eNameRange = rd.readRangeUntil 0

    # In meta structure we refer to an array elements as index 0 only.
    if arr
      eName = 0
    else
      eName = rd.rangeToCString eNameRange

    eMeta = meta[eName] ?= {}
    eMetaType = eMeta[Key.Type] ?= []
    binsert eMetaType, eTypeName

    # assert eType != 0
    # assert eTypeName?

    switch eType

      when TypeCode.Double
        rd.skip 8

      when TypeCode.String
        len = rd.readInt32LE()
        range = rd.readRange len

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

      when TypeCode.DBPointer # deprecated
        rd.skip rd.readInt32LE()
        rd.skip 12

      when TypeCode.JS
        rd.skip rd.readInt32LE()

      when TypeCode._0x0E # deprecated
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
  BufferReader
}
