// @ts-nocheck

import ops, {
  getOwnNonIndexProperties
} from './ops'

function isAnyArrayBuffer(
  value: any,
): value is ArrayBuffer | SharedArrayBuffer {
  return value instanceof ArrayBuffer || value instanceof SharedArrayBuffer
}

function isArgumentsObject(value: any): value is IArguments {
  return Object.prototype.toString.call(value) === "[object Arguments]"
}

function isArrayBuffer(value: any): value is ArrayBuffer {
  return value instanceof ArrayBuffer
}

function isAsyncFunction(value: any): value is Function {
  return (
    typeof value === "function" &&
    value.constructor &&
    value.constructor.name === "AsyncFunction"
  )
}

function isBigIntObject(value: any): value is BigInt {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.bigIntValue === "bigint"
  )
}

function isBooleanObject(value: any): value is Boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.valueOf() === "boolean"
  )
}

function isBoxedPrimitive(value: any): value is Object {
  return typeof value === "object" && value !== null && Object(value) === value
}

function isDataView(value: any): value is DataView {
  return value instanceof DataView
}

function isDate(value: any): value is Date {
  return value instanceof Date
}

function isGeneratorFunction(value: any): value is GeneratorFunction {
  return (
    typeof value === "function" &&
    value.constructor &&
    value.constructor.name === "GeneratorFunction"
  )
}

function isGeneratorObject(value: any): value is Generator {
  return (
    typeof value === "object" &&
    typeof value.next === "function" &&
    typeof value.throw === "function"
  )
}

function isMapIterator(value: any): value is Map<any, any> {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.next === "function"
  )
}

function isModuleNamespaceObject(value: any): value is NodeJS.Module {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value === "object" &&
    "exports" in value
  )
}

function isNativeError(value: any): value is Error {
  return typeof value === "object" && value !== null && value instanceof Error
}

function isNumberObject(value: any): value is Number {
  return typeof value === "object" && value !== null && value instanceof Number
}

function isPromise(value: any): value is Promise<any> {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.then === "function"
  )
}

function isProxy(value: any): value is ProxyConstructor {
  return typeof value === "function" && typeof value.revocable === "function"
}
function isMap(value: any): value is Map<any, any> {
  return value instanceof Map
}

function isRegExp(value: any): value is RegExp {
  return value instanceof RegExp
}

function isSet(value: any): value is Set<any> {
  return value instanceof Set
}

function isSetIterator(value: any): value is SetIterator<any> {
  // Assuming SetIterator is a generic iterator for Set
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.next === "function"
  )
}

function isSharedArrayBuffer(value: any): value is SharedArrayBuffer {
  return value instanceof SharedArrayBuffer
}

function isStringObject(value: any): value is String {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.valueOf === "function" &&
    typeof value.toString === "function"
  )
}

function isSymbolObject(value: any): value is Symbol {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.valueOf === "function" &&
    typeof value.toString === "function"
  )
}

function isTypedArray(value: any): value is ArrayBufferView {
  return ArrayBuffer.isView(value)
}

function isWeakMap(value: any): value is WeakMap<any, any> {
  return value instanceof WeakMap
}

function isWeakSet(value: any): value is WeakSet<any> {
  return value instanceof WeakSet
}

const core = {
  ops,
  getPromiseDetails() {
    // TODO: support promise details
    return [-1, Symbol("UNKNOWN")]
  },
  // TODO: support proxy details
  getProxyDetails() {
    return null
  },
  op_get_non_index_property_names: getOwnNonIndexProperties,
  isAnyArrayBuffer,
  isArgumentsObject,
  isArrayBuffer,
  isAsyncFunction,
  isBigIntObject,
  isBooleanObject,
  isBoxedPrimitive,
  isDataView,
  isDate,
  isGeneratorFunction,
  isGeneratorObject,
  isMap,
  isMapIterator,
  isModuleNamespaceObject,
  isNativeError,
  isNumberObject,
  isPromise,
  isProxy,
  isRegExp,
  isSet,
  isSetIterator,
  isSharedArrayBuffer,
  isStringObject,
  isSymbolObject,
  isTypedArray,
  isWeakMap,
  isWeakSet,
  isTerminal: () => false
}

export { core, ops }