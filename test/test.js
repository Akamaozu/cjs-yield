var assert = require( 'assert' ),
    _yield = require( '../yield' );

describe( 'yield', function(){

  it( 'is a function', function(){
    assert.equal( typeof _yield === 'function', true, 'module export is not a function' );
  });

  it( 'requires one argument: function', function(){
    var datatypes = [
      { name: 'function', example: function(){} },
      { name: 'string', example: 'hello world' },
      { name: 'object', example: {} },
      { name: 'null', example: null },
      { name: 'number', example: 1 },
      { name: 'array', example: [] },
      { name: 'undefined' }
    ];

    var succeeded = [];

    datatypes.forEach( function( type ){
      var success = false;

      try {
        _yield( type.example );
        success = true;
      }

      catch(e){}

      if( success ) succeeded.push( type.name );
      console.log( 'action=test-first-arg type=' + type.name + ' success=' + success );
    });

    assert.equal( succeeded.length, 1, 'expected one successful datatype only. succeeded=' + succeeded.length );
    assert.equal( succeeded[0], 'function', 'expected successful datatype to be function' );

    var callable_with_no_args = false;

    try {
      _yield();
      callable_with_no_args = true;
    }

    catch(e){}

    assert.equal( callable_with_no_args, false, 'expected to throw an error if called with no argumentss given' );
  });
});

describe( 'yield behavior', function(){
  it( 'will not run given function til current callstack is empty', function( done ){
    var input = [ 1, 2, 3, 4, 5 ],
        non_yielded = [],
        yielded = [];

    console.log( '> input', input );

    for( var i = 0; i <= input.length - 1; i += 1 ){
      non_yielded.push( input[ i ] );
      _yield( function( val_to_push ){ yielded.push( val_to_push ) }, input[ i ] );
    }

    console.log( 'yielding and non-yielding pushes done' );

    console.log( '> non yielded', non_yielded );
    console.log( '> yielded', yielded );

    assert.equal( non_yielded.length === input.length, true, 'non-yielded push tally does not match input' );
    assert.equal( yielded.length === 0, true, 'yielded push tally is not zero before callstack ends' );

    // yielding via setTimeout
      setTimeout( function(){
        console.log( '> non yielded', non_yielded );
        console.log( '> yielded', yielded );

        assert.equal( yielded.length === input.length, true, 'yielded push tally does not match input after callstack ends' );
        done();
      }, 0 );

    console.log( 'callstack ends' );
  });
});