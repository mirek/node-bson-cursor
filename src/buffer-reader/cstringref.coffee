
# Such an unfortunate name. C-like string reference on the buffer.
class CStringRef

  constructor: (@off, @len) ->

  toString: (buf, readCache = true) ->
    if readCache and @cache?
      @cache
    else
      @cache = buf.toString 'utf8', @off, @len
