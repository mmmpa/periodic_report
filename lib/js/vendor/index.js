const r = require('superagent');
window.r = r;

import { Component, h, render, cloneElement } from 'preact';
window.React = { Component, cloneElement, createElement: h };
window.ReactDOM = { render };
window.h = h;

window.toArray = n => Array.prototype.slice.call(n)
