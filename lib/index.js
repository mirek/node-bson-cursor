(function() {
  var BufferReader, Key, SubTypeCode, SubTypeCodeToName, TypeCode, TypeCodeToName, assert, binsert, structify, _ref;

  assert = require('assert');

  _ref = require('./codes'), TypeCode = _ref.TypeCode, SubTypeCode = _ref.SubTypeCode, TypeCodeToName = _ref.TypeCodeToName, SubTypeCodeToName = _ref.SubTypeCodeToName;

  BufferReader = require('./buffer-reader').BufferReader;

  binsert = require('barray').binsert;

  Key = {
    Type: '_types'
  };

  structify = function(rd, arr, meta) {
    var clen, eMeta, eMetaType, eName, eNameRange, eType, eTypeName, len, range, subtype, _name, _name1, _results;
    if (meta == null) {
      meta = {};
    }
    clen = rd.readInt32LE();
    binsert((meta[_name = Key.Type] != null ? meta[_name] : meta[_name] = []), (arr ? 'Array' : 'Object'));
    _results = [];
    while (true) {
      if (rd.eof || (eType = rd.readInt8()) === 0) {
        break;
      }
      eTypeName = TypeCodeToName[eType];
      eNameRange = rd.readRangeUntil(0);
      if (arr) {
        eName = 0;
      } else {
        eName = rd.rangeToCString(eNameRange);
      }
      eMeta = meta[eName] != null ? meta[eName] : meta[eName] = {};
      eMetaType = eMeta[_name1 = Key.Type] != null ? eMeta[_name1] : eMeta[_name1] = [];
      binsert(eMetaType, eTypeName);
      switch (eType) {
        case TypeCode.Double:
          _results.push(rd.skip(8));
          break;
        case TypeCode.String:
          len = rd.readInt32LE();
          _results.push(range = rd.readRange(len));
          break;
        case TypeCode.Object:
          _results.push(structify(rd, false, eMeta));
          break;
        case TypeCode.Array:
          _results.push(structify(rd, true, eMeta));
          break;
        case TypeCode.Binary:
          len = rd.readInt32LE();
          subtype = rd.readUInt8();
          _results.push(rd.skip(len));
          break;
        case TypeCode.Undefined:
          _results.push(void 0);
          break;
        case TypeCode.ObjectId:
          _results.push(rd.skip(12));
          break;
        case TypeCode.Boolean:
          _results.push(rd.skip(1));
          break;
        case TypeCode.UTC:
          _results.push(rd.skip(8));
          break;
        case TypeCode.Null:
          _results.push(void 0);
          break;
        case TypeCode.RegExp:
          rd.readRangeUntil(0);
          _results.push(rd.readRangeUntil(0));
          break;
        case TypeCode.DBPointer:
          rd.skip(rd.readInt32LE());
          _results.push(rd.skip(12));
          break;
        case TypeCode.JS:
          _results.push(rd.skip(rd.readInt32LE()));
          break;
        case TypeCode._0x0E:
          _results.push(rd.skip(rd.readInt32LE()));
          break;
        case TypeCode.ScopedJS:
          _results.push(rd.skip(rd.readInt32LE()));
          break;
        case TypeCode.Int32:
          _results.push(rd.skip(4));
          break;
        case TypeCode.Timestamp:
          _results.push(rd.skip(8));
          break;
        case TypeCode.Int64:
          _results.push(rd.skip(4));
          break;
        case TypeCode.MinKey:
          _results.push(void 0);
          break;
        case TypeCode.MaxKey:
          _results.push(void 0);
          break;
        default:
          _results.push(void 0);
      }
    }
    return _results;
  };

  module.exports = {
    structify: structify,
    BufferReader: BufferReader
  };

}).call(this);
