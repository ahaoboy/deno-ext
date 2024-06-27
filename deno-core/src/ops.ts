const isNumericLookup = {}
const ALL_PROPERTIES = 0
const ONLY_WRITABLE = 1
const ONLY_ENUMERABLE = 2
const ONLY_CONFIGURABLE = 4
const ONLY_ENUM_WRITABLE = 6
const SKIP_STRINGS = 8
const SKIP_SYMBOLS = 16
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

export function getOwnNonIndexProperties(obj, filter) {
  let allProperties = [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj),
  ]
  if (Array.isArray(obj)) {
    allProperties = allProperties.filter((k) => !isArrayIndex(k))
  }
  if (filter === ALL_PROPERTIES) {
    return allProperties
  }
  const result = []
  for (const key of allProperties) {
    const desc = Object.getOwnPropertyDescriptor(obj, key)
    if (desc === void 0) {
      continue
    }
    if (filter & ONLY_WRITABLE && !desc.writable) {
      continue
    }
    if (filter & ONLY_ENUMERABLE && !desc.enumerable) {
      continue
    }
    if (filter & ONLY_CONFIGURABLE && !desc.configurable) {
      continue
    }
    if (filter & SKIP_STRINGS && typeof key === "string") {
      continue
    }
    if (filter & SKIP_SYMBOLS && typeof key === "symbol") {
      continue
    }
    result.push(key)
  }
  return result
}


const ops = {
  op_url_get_serialization() {

  },
  op_url_parse() {
  },
  op_url_parse_search_params() {

  },
  op_url_parse_with_base() {

  },
  op_url_reparse() {

  },
  op_url_stringify_search_params() {

  },

  op_get_non_index_property_names: getOwnNonIndexProperties,
  op_get_constructor_name(v) {
    return Object.prototype.toString.call(v).slice(8, -1)
  },
}

export default ops