
# Null terminated string reference on the buffer, sorry core foundation.
# We don't want to keep reference to the buffer itself, just the offset and length.
# We keep cached utf8 string once it's instantiated.
class CStringRef

  # @param [Number] off Offset in buffer, it's one byte after bson's type byte.
  # @param [Number] len Length of the string without nil char (?)
  constructor: (@off, @len) ->

  toString: (buf, readCache = true) ->
    if readCache and @cache?
      @cache
    else
      @cache = buf.toString 'utf8', @off, @len
