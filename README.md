Yield
===
[![npm version](https://badge.fury.io/js/cjs-yield.svg)](https://badge.fury.io/js/cjs-yield) [![Build Status](https://travis-ci.org/Akamaozu/cjs-yield.svg?branch=master)](https://travis-ci.org/Akamaozu/cjs-yield) [![Coverage Status](https://coveralls.io/repos/github/Akamaozu/cjs-yield/badge.svg?branch=master)](https://coveralls.io/github/Akamaozu/cjs-yield?branch=master)

Don't Start Function Until Current [Callstack](https://www.youtube.com/watch?v=8aGhZQkoFbQ&feature=youtu.be&t=256) Ends
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

### Gotchas

#### 1. Yield DOES NOT work with functions that internally use `this`

Internally, yield uses `setTimeout.apply` to yield a given function, while making it easy to pass arguments to it. To make the API as simple and as pleasant as posible, `setTimeout.apply` uses null as its default context. This is fine unless the function use `this` keyword internally. Even if you avoid writing functions that use `this`, you can't escape it since many native JavaScript array methods like `Array.push` use it.

To yield a function that uses `this`, put the troublesome function into a function that doesn't use `this` and pass that new function to yield.

Eg.

```js
  var heroes = [];
  _yield( heroes.push, 'Batman' );
  console.log( 'callstack ends' );

  // > callstack ends
  // > heroes=[]
```

vs

```js
  var heroes = [];
  _yield( add_hero, 'Batman' );
  console.log( 'callstack ends' );

  // > callstack ends
  // > heroes=[ 'Batman' ]

  function add_hero( name ){
    heroes.push( name );
  }
```