/**
 * Created by whybe on 2017. 4. 14..
 */
QUnit.test( "ok test", function( assert ) {
    assert.ok( true, "true succeeds" );
    assert.ok( "non-empty", "non-empty string succeeds" );
    assert.ok( false, "false fails" );
    assert.ok( 0, "0 fails" );
    assert.ok( NaN, "NaN fails" );
    assert.ok( "", "empty string fails" );
    assert.ok( null, "null fails" );
    assert.ok( undefined, "undefined fails" );
});

QUnit.test( "equal test", function( assert ) {
    assert.equal( 0, 0, "Zero, Zero; equal succeeds" );
    assert.equal( "", 0, "Empty, Zero; equal succeeds" );
    assert.equal( "", "", "Empty, Empty; equal succeeds" );
    assert.equal( 0, false, "Zero, false; equal succeeds" );
    assert.equal( "three", 3, "Three, 3; equal fails" );
    assert.equal( null, false, "null, false; equal fails" );
});


QUnit.test( "multiple call done()", function( assert ) {
    assert.expect( 3 );
    var done = assert.async( 3 );

    setTimeout(function() {
        assert.ok( true, "first call done." );
        done();
    }, 5000 );

    setTimeout(function() {
        assert.ok( true, "second call done." );
        done();
    }, 2000 );

    setTimeout(function() {
        assert.ok( true, "third call done." );
        done();
    }, 3000 );
});
