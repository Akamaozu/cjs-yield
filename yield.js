module.exports = _yield;

function _yield(){
  var has_arguments = arguments.length > 0;
  if( ! has_arguments ) throw new Error( 'must specify function to run after yielding completes' );

  var arguments_array = Array.prototype.slice.call( arguments ),
      callback = arguments_array[0];

  // ensure callback is specified
    if( typeof callback !== 'function' ) throw new Error( 'yield callback must be a function' );

  // transform args: _yield -> setTimeout
    arguments_array.splice( 1, 0, 0 );

  // yield then callback
    setTimeout.apply( null, arguments_array );
}