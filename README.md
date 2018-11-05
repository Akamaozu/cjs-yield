CJS-Yield
===
[![npm version](https://badge.fury.io/js/cjs-yield.svg)](https://badge.fury.io/js/cjs-yield)

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