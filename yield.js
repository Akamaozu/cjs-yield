module.exports = _yield;

function _yield(){
  if( typeof arguments[0] !== 'function' ) throw new Error( 'requires a function to yield as the first arg' );

  var arguments_array = Array.prototype.slice.call( arguments ),
      func_to_yield = arguments_array[0];

  // yield aka call function after current callstack ends

    // #1. transform args: _yield -> setTimeout
      arguments_array.splice( 1, 0, 0 );

    // #2. use setTimeout to put func on next callstack
      setTimeout.apply( null, arguments_array );
}