(function() {
  var SubTypeCode, SubTypeCodeToName, TypeCode, TypeCodeToName;

  TypeCode = {
    Double: 0x01,
    String: 0x02,
    Object: 0x03,
    Array: 0x04,
    Binary: 0x05,
    Undefined: 0x06,
    ObjectId: 0x07,
    Boolean: 0x08,
    UTC: 0x09,
    Null: 0x0A,
    RegExp: 0x0B,
    DBPointer: 0x0C,
    JS: 0x0D,
    _0x0E: 0x0E,
    ScopedJS: 0x0F,
    Int32: 0x10,
    Timestamp: 0x11,
    Int64: 0x12,
    MinKey: 0x13,
    MaxKey: 0x14
  };

  SubTypeCode = {
    Generic: 0x00,
    Function: 0x01,
    BinaryOld: 0x02,
    UUIDOld: 0x03,
    UUID: 0x04,
    MD5: 0x05,
    UserDefined: 0x06
  };

  TypeCodeToName = [void 0, 'Double', 'String', 'Object', 'Array', 'Binary', 'Undefined', 'ObjectId', 'Boolean', 'UTC', 'Null', 'RegExp', 'DBPointer', 'JS', '_0x0E', 'ScopedJS', 'Int32', 'Timestamp', 'Int64', 'MinKey', 'MaxKey'];

  SubTypeCodeToName = ['Generic', 'Function', 'BinaryOld', 'UUIDOld', 'UUID', 'MD5', 'UserDefined'];

  module.exports = {
    TypeCode: TypeCode,
    SubTypeCode: SubTypeCode,
    TypeCodeToName: TypeCodeToName,
    SubTypeCodeToName: SubTypeCodeToName
  };

}).call(this);
