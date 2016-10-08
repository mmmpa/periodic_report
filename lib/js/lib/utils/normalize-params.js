import { snakeCase, camelCase } from  'change-case'

export function toCamel (params) {
  let normalized = {}
  for (let i in params) {
    normalized[camelCase(i)] = params[i]
  }
  return normalized
}

export function toSnake (params) {
  let normalized = {}
  for (let i in params) {
    normalized[snakeCase(i)] = params[i]
  }
  return normalized
}
