(function() {
  var BufferReader, CStringRef, SubTypeCode, SubTypeCodeToName, TypeCode, TypeCodeToName, binsert, structify, _ref, _ref1;

  _ref = require('./codes'), TypeCode = _ref.TypeCode, SubTypeCode = _ref.SubTypeCode, TypeCodeToName = _ref.TypeCodeToName, SubTypeCodeToName = _ref.SubTypeCodeToName;

  _ref1 = require('./buffer-reader'), BufferReader = _ref1.BufferReader, CStringRef = _ref1.CStringRef;

  binsert = require('barray').binsert;

  structify = function(rd, arr, meta) {
    var clen, eMeta, eMetaType, eName, eNameRange, eType, eTypeName, len, range, stop, subtype, _results;
    if (arr == null) {
      arr = false;
    }
    if (meta == null) {
      meta = {};
    }
    clen = rd.readInt32LE();
    stop = false;
    binsert((meta['@type'] != null ? meta['@type'] : meta['@type'] = []), (arr ? 'Array' : 'Object'));
    _results = [];
    while (true) {
      if (rd.eof || (eType = rd.readInt8()) === 0) {
        break;
      }
      eNameRange = rd.readRangeUntil(0);
      eTypeName = TypeCodeToName[eType];
      if (arr) {
        eName = 0;
      } else {
        eName = rd.rangeToCString(eNameRange);
      }
      eMeta = meta[eName] != null ? meta[eName] : meta[eName] = {};
      eMetaType = eMeta['@type'] != null ? eMeta['@type'] : eMeta['@type'] = [];
      binsert(eMetaType, eTypeName);
      assert(eType !== 0);
      assert(eTypeName != null);
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
    structify: structify
  };

}).call(this);
