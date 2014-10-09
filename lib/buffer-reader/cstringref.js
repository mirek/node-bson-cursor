(function() {
  var CStringRef;

  CStringRef = (function() {
    function CStringRef(off, len) {
      this.off = off;
      this.len = len;
    }

    CStringRef.prototype.toString = function(buf, readCache) {
      if (readCache == null) {
        readCache = true;
      }
      if (readCache && (this.cache != null)) {
        return this.cache;
      } else {
        return this.cache = buf.toString('utf8', this.off, this.len);
      }
    };

    return CStringRef;

  })();

}).call(this);
