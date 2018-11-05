CJS-Yield
===
[![npm version](https://badge.fury.io/js/cjs-yield.svg)](https://badge.fury.io/js/cjs-yield) [![Build Status](https://travis-ci.org/Akamaozu/cjs-yield.svg?branch=master)](https://travis-ci.org/Akamaozu/cjs-yield) [![Coverage Status](https://coveralls.io/repos/github/Akamaozu/cjs-yield/badge.svg?branch=master)](https://coveralls.io/github/Akamaozu/cjs-yield?branch=master)

Non-Blocking JavaScript the Easy Way
---

### Install

```
npm install --save cjs-yield
```

### How It Works

```
// call function the normal (blocking) way 
  say_hi();
  console.log( 'callstack ends' );

  // output
  // > hi!
  // > callstack ends

// call function in a non-blocking way
  var _yield = require( 'cjs-yield' );

  _yield( say_hi );
  console.log( 'callstack ends' );

  // output
  // > callstack ends
  // > hi!
```