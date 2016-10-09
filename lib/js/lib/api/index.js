import Method from './method'

export const API = {}

export function registerAPI (configuration) {
  for (let i in configuration) {
    API[i] = (...args) => strike(configuration[i], ...args)
  }
}

export function strike (api, params = {}, options = {}) {
  return new Promise((resolve, reject)=> {
    build(api, params, options, resolve, reject);
  });
}

function build (api, params, options, resolve, reject) {
  let { uri, method, wrap = p => p, parse = p => p, parseError = p => p } = api

  console.log(params)
  makeBaseRequest(normalize(uri, params), method, options)
    .send(wrap(params))
    .end((err, res)=> {
      console.log(err, res)
      if (!!err) {
        if (!res || !res.body || !res.body.errors) {
          reject({ errors: { unknown: [err] } });
        } else {
          reject(parseError(res.body));
        }
      } else {
        resolve(parse(res.body));
      }
    });
}

function normalize (uri, params) {
  return uri.replace(/:([a-zA-Z_]+)/ig, (_, n) => (console.log(n), params[n]))
}

function makeBaseRequest (uri, method, options = {}) {
  let request = makeNoTokenBaseRequest(uri, method, options);

  return method === Method.Get
    ? request
    : request.set('X-CSRF-Token', token())
}

function makeNoTokenBaseRequest (uri, method, options = {}) {
  let request = window.r
  switch (method) {
    case Method.Get:
      return request.get(uri);
    case Method.Post:
      return request.post(uri);
    case Method.Patch:
      return request.patch(uri);
    case Method.Put:
      return request.put(uri);
    case Method.Delete:
      return request.delete(uri);
  }
}

function token () {
  try {
    return document.getElementsByName('csrf-token')[0].getAttribute('content');
  } catch (ex) {
    return '';
  }
}