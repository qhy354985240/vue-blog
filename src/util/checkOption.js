
function isObject (option) {
  return Object.prototype.isPrototypeOf(option)
}

function isEmptyObject (option) {
  return Object.keys(option).length === 0
}

function hasSeriesKey (option) {
  return !!option['series']
}

function isSeriesArray (option) {
  return Array.isArray(option['series'])
}

function isSeriesEmpty (option) {
  return option['series'].length === 0
}

function isValidOption (option) {
  return isObject(option) && !isEmptyObject(option) &&
    hasSeriesKey(option) &&
    isSeriesArray(option) && !isSeriesEmpty(option)
}

export default isValidOption
