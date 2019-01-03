Yield
===
[![npm version](https://badge.fury.io/js/cjs-yield.svg)](https://badge.fury.io/js/cjs-yield) [![Build Status](https://travis-ci.org/Akamaozu/cjs-yield.svg?branch=master)](https://travis-ci.org/Akamaozu/cjs-yield) [![Coverage Status](https://coveralls.io/repos/github/Akamaozu/cjs-yield/badge.svg?branch=master)](https://coveralls.io/github/Akamaozu/cjs-yield?branch=master)

Don't Start Function til Current Callstack Ends
---

### Install

```
npm install --save cjs-yield
```

### How It Works

#### Call Function Normally

```js
  say_hi();
  console.log( 'callstack ends' );

  // output
  // > Hi!
  // > callstack ends
```

#### Yield Function Call

```js
  var _yield = require( 'cjs-yield' );

  _yield( say_hi );
  console.log( 'callstack ends' );

  // output
  // > callstack ends
  // > Hi!
```

#### Pass Yielded Function Arguments

```js
  _yield( say_hi, 'Dr. Nick' );
  console.log( 'callstack ends' );

  // output
  // > callstack ends
  // > Hi Dr. Nick!
```

```js
  _yield( say_hi, 'Archie', 'the Drells' );
  console.log( 'callstack ends' );

  // output
  // > callstack ends
  // > Hi Archie and the Drells!
```

```js
  _yield( say_hi, 'Ed', 'Edd', 'Eddy' );
  console.log( 'callstack ends' );

  // output
  // > callstack ends
  // > Hi Ed, Edd and Eddy!
```