// @ts-nocheck
export const ArrayIsArray = Array.isArray;
export const ArrayPrototypeFilter = (that, ...args) => that.filter(...args);
export const ArrayPrototypeForEach = (that, ...args) => that.forEach(...args);
export const ArrayPrototypeIncludes = (that, ...args) => that.includes(...args);
export const ArrayPrototypeJoin = (that, ...args) => that.join(...args);
export const ArrayPrototypePush = (that, ...args) => that.push(...args);
export const ArrayPrototypeSlice = (that, ...args) => that.slice(...args);
export const ArrayPrototypeSome = (that, ...args) => that.some(...args);
export const ArrayPrototypeSort = (that, ...args) => that.sort(...args);
export const ArrayPrototypeUnshift = (that, ...args) => that.unshift(...args);
export const BigInt = globalThis.BigInt;
export const ObjectAssign = Object.assign;
export const ObjectCreate = Object.create;
// ('hasOwn' in Object) || (Object.hasOwn = Object.call.bind(Object.hasOwnProperty));
export const ObjectHasOwn = Object.hasOwn ?? Object.call.bind(Object.hasOwnProperty);
export const RegExpPrototypeTest = (that, ...args) => that.test(...args);
export const RegExpPrototypeExec = RegExp.prototype.exec;
export const StringFromCharCode = String.fromCharCode;
export const StringPrototypeCharCodeAt = (that, ...args) =>
  that.charCodeAt(...args);
export const StringPrototypeEndsWith = (that, ...args) =>
  that.endsWith(...args);
export const StringPrototypeIncludes = (that, ...args) =>
  that.includes(...args);
export const StringPrototypeReplace = (that, ...args) => that.replace(...args);
export const StringPrototypeSlice = (that, ...args) => that.slice(...args);
export const StringPrototypeSplit = (that, ...args) => that.split(...args);
export const StringPrototypeStartsWith = (that, ...args) =>
  that.startsWith(...args);
export const StringPrototypeToUpperCase = (that) => that.toUpperCase();


const ALL_PROPERTIES = 0
const ONLY_WRITABLE = 1
const ONLY_ENUMERABLE = 2
const ONLY_CONFIGURABLE = 4
const ONLY_ENUM_WRITABLE = 6
const SKIP_STRINGS = 8
const SKIP_SYMBOLS = 16
const isNumericLookup = {}
function isArrayIndex(value) {
  switch (typeof value) {
    case "number":
      return value >= 0 && (value | 0) === value
    case "string": {
      const result = isNumericLookup[value]
      if (result !== void 0) {
        return result
      }
      const length = value.length
      if (length === 0) {
        return (isNumericLookup[value] = false)
      }
      let ch = 0
      let i = 0
      for (; i < length; ++i) {
        ch = value.charCodeAt(i)
        if ((i === 0 && ch === 48 && length > 1) || ch < 48 || ch > 57) {
          return (isNumericLookup[value] = false)
        }
      }
      return (isNumericLookup[value] = true)
    }
    default:
      return false
  }
}

const internals = {}
const primordials = {
  ArrayBufferPrototypeGetByteLength: (that) => {
    if (!ArrayBuffer.isView(that)) {
      throw new Error()
    }
    that.byteLength
  },
  ArrayPrototypePushApply: (that, ...args) => that.push(...args),
  MapPrototypeGetSize: (that) => that.size,
  RegExpPrototypeSymbolReplace: (that, ...args) =>
    RegExp.prototype[Symbol.replace].call(that, ...args),
  SafeArrayIterator: class SafeArrayIterator {
    constructor(array) {
      this.array = [...array]
      this.index = 0
    }

    next() {
      if (this.index < this.array.length) {
        return { value: this.array[this.index++], done: false }
      } else {
        return { done: true }
      }
    }

    [Symbol.iterator]() {
      return this
    }
  },
  SafeMap: Map,
  SafeMapIterator: class SafeMapIterator {
    get [Symbol.toStringTag]() {
      return "Map Iterator"
    }
    constructor(map) {
      this.map = map
      this.keys = Array.from(map.keys())
      this.index = 0
    }

    next() {
      if (this.index < this.keys.length) {
        const key = this.keys[this.index]
        const value = this.map.get(key)
        this.index++
        return { value: [key, value], done: false }
      } else {
        return { done: true }
      }
    }

    [Symbol.iterator]() {
      return this
    }
  },
  SafeRegExp: RegExp,
  SafeSet: Set,
  SafeSetIterator: class SafeSetIterator {
    get [Symbol.toStringTag]() {
      return "Set Iterator"
    }
    constructor(set) {
      this.set = set
      this.values = Array.from(set)
      this.index = 0
    }

    next() {
      if (this.index < this.values.length) {
        const value = this.values[this.index]
        this.index++
        return { value, done: false }
      } else {
        return { done: true }
      }
    }

    [Symbol.iterator]() {
      return this
    }
  },
  SafeStringIterator: class SafeStringIterator {
    get [Symbol.toStringTag]() {
      return "String Iterator"
    }
    constructor(str) {
      this.str = str
      this.index = 0
    }

    next() {
      if (this.index < this.str.length) {
        const char = this.str[this.index]
        this.index++
        return { value: char, done: false }
      } else {
        return { done: true }
      }
    }

    [Symbol.iterator]() {
      return this
    }
  },
  SetPrototypeGetSize: (that) => that.size,
  SymbolPrototypeGetDescription: (that) => that.description,
  TypedArrayPrototypeGetByteLength: (that) => that.byteLength,
  TypedArrayPrototypeGetLength: (that) => that.length,
  TypedArrayPrototypeGetSymbolToStringTag: (that) => {
    if (ArrayBuffer.isView(that)) {
      return that[Symbol.toStringTag]
    }
  },
  ObjectPrototype: Object.prototype,
  ObjectPrototypeIsPrototypeOf: (that, ...args) =>
    Object.prototype.isPrototypeOf.call(that, ...args),
  ObjectPrototypePropertyIsEnumerable: (that, ...args) =>
    Object.prototype.propertyIsEnumerable.call(that, ...args),
  ObjectPrototypeToString: (that, ...args) =>
    Object.prototype.toString.call(that, ...args),
  ObjectAssign: (...args) => Object.assign(...args),
  ObjectGetOwnPropertyDescriptor: (...args) =>
    Object.getOwnPropertyDescriptor(...args),
  ObjectGetOwnPropertyNames: (...args) => Object.getOwnPropertyNames(...args),
  ObjectGetOwnPropertySymbols: (...args) =>
    Object.getOwnPropertySymbols(...args),
  ObjectHasOwn: (...args) => ObjectHasOwn(...args),
  ObjectIs: (...args) => Object.is(...args),
  ObjectCreate: (...args) => Object.create(...args),
  ObjectDefineProperty: (...args) => Object.defineProperty(...args),
  ObjectFreeze: (...args) => Object.freeze(...args),
  ObjectGetPrototypeOf: (...args) => Object.getPrototypeOf(...args),
  ObjectSetPrototypeOf: (...args) => Object.setPrototypeOf(...args),
  ObjectKeys: (...args) => Object.keys(...args),
  ObjectFromEntries: (...args) => Object.fromEntries(...args),
  ObjectValues: (...args) => Object.values(...args),
  FunctionPrototypeBind: (that, ...args) =>
    Function.prototype.bind.call(that, ...args),
  FunctionPrototypeCall: (that, ...args) =>
    Function.prototype.call.call(that, ...args),
  FunctionPrototypeToString: (that, ...args) =>
    Function.prototype.toString.call(that, ...args),
  Array: Array,
  ArrayPrototypeFill: (that, ...args) =>
    Array.prototype.fill.call(that, ...args),
  ArrayPrototypeFind: (that, ...args) =>
    Array.prototype.find.call(that, ...args),
  ArrayPrototypePop: (that, ...args) => Array.prototype.pop.call(that, ...args),
  ArrayPrototypePush: (that, ...args) =>
    Array.prototype.push.call(that, ...args),
  ArrayPrototypeShift: (that, ...args) =>
    Array.prototype.shift.call(that, ...args),
  ArrayPrototypeUnshift: (that, ...args) =>
    Array.prototype.unshift.call(that, ...args),
  ArrayPrototypeSlice: (that, ...args) =>
    Array.prototype.slice.call(that, ...args),
  ArrayPrototypeSort: (that, ...args) =>
    Array.prototype.sort.call(that, ...args),
  ArrayPrototypeSplice: (that, ...args) =>
    Array.prototype.splice.call(that, ...args),
  ArrayPrototypeIncludes: (that, ...args) =>
    Array.prototype.includes.call(that, ...args),
  ArrayPrototypeJoin: (that, ...args) =>
    Array.prototype.join.call(that, ...args),
  ArrayPrototypeForEach: (that, ...args) =>
    Array.prototype.forEach.call(that, ...args),
  ArrayPrototypeFilter: (that, ...args) =>
    Array.prototype.filter.call(that, ...args),
  ArrayPrototypeMap: (that, ...args) => Array.prototype.map.call(that, ...args),
  ArrayPrototypeReduce: (that, ...args) =>
    Array.prototype.reduce.call(that, ...args),
  ArrayIsArray: (...args) => Array.isArray(...args),
  Number: Number,
  NumberPrototypeToString: (that, ...args) =>
    Number.prototype.toString.call(that, ...args),
  NumberPrototypeValueOf: (that, ...args) =>
    Number.prototype.valueOf.call(that, ...args),
  NumberIsInteger: (...args) => Number.isInteger(...args),
  NumberParseInt: (...args) => Number.parseInt(...args),
  Boolean: Boolean,
  BooleanPrototypeValueOf: (that, ...args) =>
    Boolean.prototype.valueOf.call(that, ...args),
  String: String,
  StringPrototypeCharCodeAt: (that, ...args) =>
    String.prototype.charCodeAt.call(that, ...args),
  StringPrototypeCodePointAt: (that, ...args) =>
    String.prototype.codePointAt.call(that, ...args),
  StringPrototypeEndsWith: (that, ...args) =>
    String.prototype.endsWith.call(that, ...args),
  StringPrototypeIncludes: (that, ...args) =>
    String.prototype.includes.call(that, ...args),
  StringPrototypeIndexOf: (that, ...args) =>
    String.prototype.indexOf.call(that, ...args),
  StringPrototypeLastIndexOf: (that, ...args) =>
    String.prototype.lastIndexOf.call(that, ...args),
  StringPrototypeMatch: (that, ...args) =>
    String.prototype.match.call(that, ...args),
  StringPrototypeNormalize: (that, ...args) =>
    String.prototype.normalize.call(that, ...args),
  StringPrototypePadEnd: (that, ...args) =>
    String.prototype.padEnd.call(that, ...args),
  StringPrototypePadStart: (that, ...args) =>
    String.prototype.padStart.call(that, ...args),
  StringPrototypeRepeat: (that, ...args) =>
    String.prototype.repeat.call(that, ...args),
  StringPrototypeReplace: (that, ...args) =>
    String.prototype.replace.call(that, ...args),
  StringPrototypeReplaceAll: (that, ...args) =>
    String.prototype.replaceAll.call(that, ...args),
  StringPrototypeSlice: (that, ...args) =>
    String.prototype.slice.call(that, ...args),
  StringPrototypeSplit: (that, ...args) =>
    String.prototype.split.call(that, ...args),
  StringPrototypeStartsWith: (that, ...args) =>
    String.prototype.startsWith.call(that, ...args),
  StringPrototypeTrim: (that, ...args) =>
    String.prototype.trim.call(that, ...args),
  StringPrototypeToLowerCase: (that, ...args) =>
    String.prototype.toLowerCase.call(that, ...args),
  StringPrototypeValueOf: (that, ...args) =>
    String.prototype.valueOf.call(that, ...args),
  Symbol: Symbol,
  SymbolPrototypeToString: (that, ...args) =>
    Symbol.prototype.toString.call(that, ...args),
  SymbolPrototypeValueOf: (that, ...args) =>
    Symbol.prototype.valueOf.call(that, ...args),
  SymbolFor: (...args) => Symbol.for(...args),
  SymbolHasInstance: Symbol.hasInstance,
  SymbolIterator: Symbol.iterator,
  SymbolToStringTag: Symbol.toStringTag,
  DatePrototype: Date.prototype,
  DatePrototypeToISOString: (that, ...args) =>
    Date.prototype.toISOString.call(that, ...args),
  DatePrototypeGetTime: (that, ...args) =>
    Date.prototype.getTime.call(that, ...args),
  DateNow: (...args) => Date.now(...args),
  RegExpPrototypeExec: (that, ...args) =>
    RegExp.prototype.exec.call(that, ...args),
  RegExpPrototypeToString: (that, ...args) =>
    RegExp.prototype.toString.call(that, ...args),
  RegExpPrototypeTest: (that, ...args) =>
    RegExp.prototype.test.call(that, ...args),
  Error: Error,
  ErrorPrototype: Error.prototype,
  ErrorPrototypeToString: (that, ...args) =>
    Error.prototype.toString.call(that, ...args),
  ErrorCaptureStackTrace: (...args) => Error.captureStackTrace(...args),
  AggregateErrorPrototype: AggregateError.prototype,
  MathAbs: (...args) => Math.abs(...args),
  MathFloor: (...args) => Math.floor(...args),
  MathMax: (...args) => Math.max(...args),
  MathMin: (...args) => Math.min(...args),
  MathRound: (...args) => Math.round(...args),
  MathSqrt: (...args) => Math.sqrt(...args),
  MathFround: (...args) => Math.fround(...args),
  MathPow: (...args) => Math.pow(...args),
  MathTrunc: (...args) => Math.trunc(...args),
  ArrayBufferIsView: (...args) => ArrayBuffer.isView(...args),
  MapPrototype: Map.prototype,
  MapPrototypeGet: (that, ...args) => Map.prototype.get.call(that, ...args),
  MapPrototypeSet: (that, ...args) => Map.prototype.set.call(that, ...args),
  MapPrototypeHas: (that, ...args) => Map.prototype.has.call(that, ...args),
  MapPrototypeDelete: (that, ...args) =>
    Map.prototype.delete.call(that, ...args),
  MapPrototypeEntries: (that, ...args) =>
    Map.prototype.entries.call(that, ...args),
  MapPrototypeForEach: (that, ...args) =>
    Map.prototype.forEach.call(that, ...args),
  BigIntPrototypeValueOf: (that, ...args) =>
    BigInt.prototype.valueOf.call(that, ...args),
  SetPrototype: Set.prototype,
  SetPrototypeHas: (that, ...args) => Set.prototype.has.call(that, ...args),
  SetPrototypeAdd: (that, ...args) => Set.prototype.add.call(that, ...args),
  SetPrototypeValues: (that, ...args) =>
    Set.prototype.values.call(that, ...args),
  WeakMapPrototypeHas: (that, ...args) =>
    WeakMap.prototype.has.call(that, ...args),
  WeakSetPrototypeHas: (that, ...args) =>
    WeakSet.prototype.has.call(that, ...args),
  Proxy: Proxy,
  ReflectGet: (...args) => Reflect.get(...args),
  ReflectGetOwnPropertyDescriptor: (...args) =>
    Reflect.getOwnPropertyDescriptor(...args),
  ReflectGetPrototypeOf: (...args) => Reflect.getPrototypeOf(...args),
  ReflectHas: (...args) => Reflect.has(...args),
  ReflectOwnKeys: (...args) => Reflect.ownKeys(...args),
  Int8Array: Int8Array,
  Int16Array: Int16Array,
  Int32Array: Int32Array,
  Uint8Array: Uint8Array,
  Uint16Array: Uint16Array,
  Uint32Array: Uint32Array,
  ArrayIteratorPrototype: Symbol.iterator,
  ReflectDefineProperty: (...args) => Reflect.defineProperty(...args),
  ObjectDefineProperties: (...args) => Object.defineProperties(...args),
  ObjectGetOwnPropertyDescriptors: (...args) =>
    Object.getOwnPropertyDescriptors(...args),

  // TODO
  StringPrototypeToWellFormed: (s) => s,

  TypeError: TypeError

}
export { primordials, internals }