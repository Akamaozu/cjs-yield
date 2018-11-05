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

    // note: testing for undefined covers case of no given first argument

    var succeeded = [];

    datatypes.forEach( function( type ){
      try {
        _yield( type.example );
        succeeded.push( type.name );
      }

      catch(e){}
    });

    assert.equal( succeeded.length, 1, 'expected one successful datatype only. succeeded=' + succeeded.length );
    assert.equal( succeeded[0], 'function', 'expected successful datatype to be function' );
  });
});

describe( 'yield behavior', function(){
  it( 'will not run given function til current callstack is empty', function( done ){
    var input = [ 1, 2, 3, 4, 5 ],
        non_yielding = [],
        yielding = [],
        input_index_to_yield = 0,
        number_to_yield = input[ input_index_to_yield ];

    for( var i = 0; i < input.length - 1; i += 1 ){
      non_yielding.push( input[ i ] );

      if( i !== input_index_to_yield ) yielding.push( input[ i ] );
      else _yield( push_after_yield, number_to_yield );
    }

    assert.equal( yielding[ input_index_to_yield ] !== number_to_yield, true, 'yield['+ input_index_to_yield +'] === non_yield['+ input_index_to_yield +'] are the same' );
    assert.equal( yielding[ yielding.length - 1 ] !== number_to_yield, true, 'yielded function already executed' );

    // yielding via setTimeout
    setTimeout( function(){
      assert.equal( yielding[ yielding.length - 1 ] == number_to_yield, true, 'function executed after yield' );
      done();
    }, 0 );

    function push_after_yield( value_to_push ){
      yielding.push( value_to_push );
    }
  });
});