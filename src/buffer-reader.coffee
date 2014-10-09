
# BufferReader wraps buffer and provides fast reading routines.
#
# Overflow checks are not performed. It's user responsiblity to guarantee that the buffer is well formed bson.
class BufferReader

  Object.defineProperties @::,

    length:
      get: ->
        @buf.length

    offset:
      get: ->
        @i
      set: (value) ->
        @i = value

    eof:
      get: ->
        @i >= @buf.length

  constructor: (@buf, @i = 0) ->

  skip: (a) ->
    @i += a

  # peekInt8:     -> @buf.readInt8     @i
  # peekUInt8:    -> @buf.readUInt8    @i
  # peekInt16LE:  -> @buf.readInt16LE  @i
  # peekInt16BE:  -> @buf.readInt16BE  @i
  # peekUInt16LE: -> @buf.readUInt16LE @i
  # peekUInt16BE: -> @buf.readUInt16BE @i
  # peekInt32LE:  -> @buf.readInt32LE  @i
  # peekInt32BE:  -> @buf.readInt32BE  @i
  # peekUInt32LE: -> @buf.readUInt32LE @i
  # peekUInt32BE: -> @buf.readUInt32BE @i
  # peekFloatLE:  -> @buf.readFloatLE  @i
  # peekFloatBE:  -> @buf.readFloatBE  @i
  # peekDoubleLE: -> @buf.readDoubleLE @i
  # peekDoubleBE: -> @buf.readDoubleBE @i

  readInt8:     -> @i += 1; @buf.readInt8     @i - 1
  readUInt8:    -> @i += 1; @buf.readUInt8    @i - 1
  readInt16LE:  -> @i += 2; @buf.readInt16LE  @i - 2
  readInt16BE:  -> @i += 2; @buf.readInt16BE  @i - 2
  readUInt16LE: -> @i += 2; @buf.readUInt16LE @i - 2
  readUInt16BE: -> @i += 2; @buf.readUInt16BE @i - 2
  readInt32LE:  -> @i += 4; @buf.readInt32LE  @i - 4
  readInt32BE:  -> @i += 4; @buf.readInt32BE  @i - 4
  readUInt32LE: -> @i += 4; @buf.readUInt32LE @i - 4
  readUInt32BE: -> @i += 4; @buf.readUInt32BE @i - 4
  readFloatLE:  -> @i += 4; @buf.readFloatLE  @i - 4
  readFloatBE:  -> @i += 4; @buf.readFloatBE  @i - 4
  readDoubleLE: -> @i += 8; @buf.readDoubleLE @i - 8
  readDoubleBE: -> @i += 8; @buf.readDoubleBE @i - 8

  readRangeUntil: (octet, stopAfter = true) ->
    i = @i
    n = @buf.length
    ++@i while @buf[@i] isnt octet and @i < n
    @i += +stopAfter
    [ i, @i ]

  readRange: (len) ->
    i = @i
    @i += len
    [ i, @i ]

  rangeToCString: (range) ->
    @buf.toString 'utf8', range[0], range[1] - 1

  rangeToBuffer: (range) ->
    @buf.slice range[0], range[1]

module.exports = {
  BufferReader
}
