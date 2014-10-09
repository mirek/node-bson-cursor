(function() {
  var BufferReader;

  BufferReader = (function() {
    Object.defineProperties(BufferReader.prototype, {
      length: {
        get: function() {
          return this.buf.length;
        }
      },
      offset: {
        get: function() {
          return this.i;
        },
        set: function(value) {
          return this.i = value;
        }
      },
      eof: {
        get: function() {
          return this.i >= this.buf.length;
        }
      }
    });

    function BufferReader(buf, i) {
      this.buf = buf;
      this.i = i != null ? i : 0;
    }

    BufferReader.prototype.skip = function(a) {
      return this.i += a;
    };

    BufferReader.prototype.readInt8 = function() {
      this.i += 1;
      return this.buf.readInt8(this.i - 1);
    };

    BufferReader.prototype.readUInt8 = function() {
      this.i += 1;
      return this.buf.readUInt8(this.i - 1);
    };

    BufferReader.prototype.readInt16LE = function() {
      this.i += 2;
      return this.buf.readInt16LE(this.i - 2);
    };

    BufferReader.prototype.readInt16BE = function() {
      this.i += 2;
      return this.buf.readInt16BE(this.i - 2);
    };

    BufferReader.prototype.readUInt16LE = function() {
      this.i += 2;
      return this.buf.readUInt16LE(this.i - 2);
    };

    BufferReader.prototype.readUInt16BE = function() {
      this.i += 2;
      return this.buf.readUInt16BE(this.i - 2);
    };

    BufferReader.prototype.readInt32LE = function() {
      this.i += 4;
      return this.buf.readInt32LE(this.i - 4);
    };

    BufferReader.prototype.readInt32BE = function() {
      this.i += 4;
      return this.buf.readInt32BE(this.i - 4);
    };

    BufferReader.prototype.readUInt32LE = function() {
      this.i += 4;
      return this.buf.readUInt32LE(this.i - 4);
    };

    BufferReader.prototype.readUInt32BE = function() {
      this.i += 4;
      return this.buf.readUInt32BE(this.i - 4);
    };

    BufferReader.prototype.readFloatLE = function() {
      this.i += 4;
      return this.buf.readFloatLE(this.i - 4);
    };

    BufferReader.prototype.readFloatBE = function() {
      this.i += 4;
      return this.buf.readFloatBE(this.i - 4);
    };

    BufferReader.prototype.readDoubleLE = function() {
      this.i += 8;
      return this.buf.readDoubleLE(this.i - 8);
    };

    BufferReader.prototype.readDoubleBE = function() {
      this.i += 8;
      return this.buf.readDoubleBE(this.i - 8);
    };

    BufferReader.prototype.readRangeUntil = function(octet, stopAfter) {
      var i, n;
      if (stopAfter == null) {
        stopAfter = true;
      }
      i = this.i;
      n = this.buf.length;
      while (this.buf[this.i] !== octet && this.i < n) {
        ++this.i;
      }
      this.i += +stopAfter;
      return [i, this.i];
    };

    BufferReader.prototype.readRange = function(len) {
      var i;
      i = this.i;
      this.i += len;
      return [i, this.i];
    };

    BufferReader.prototype.rangeToCString = function(range) {
      return this.buf.toString('utf8', range[0], range[1] - 1);
    };

    BufferReader.prototype.rangeToBuffer = function(range) {
      return this.buf.slice(range[0], range[1]);
    };

    return BufferReader;

  })();

  module.exports = {
    BufferReader: BufferReader
  };

}).call(this);
