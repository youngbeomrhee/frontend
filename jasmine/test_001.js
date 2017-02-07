/**
 * Created by whybe on 2017. 1. 29..
 */

describe('expect test', function () {
    it('true expect to be true', function () {
        expect(true).toBe(true);
    });
});


describe('throw test', function () {

    it("The 'toThrowError' matcher is for testing a specific thrown exception", function() {
        var foo = function() {
            throw new TypeError("foo bar baz");
        };

        // expect(foo).toThrowError("foo bar baz");
        // expect(foo).toThrowError(/bar/);
        // expect(foo).toThrowError(TypeError);
        expect(foo).toThrowError(TypeError, "foo bar baz");
    });
    /*
    it('toThrowError', function () {
        expect(function throwError () {

        }).toThrowError();
    });*/
});

describe('spy test', function () {

    var testObj = {
        shouldBeCalled: function () {
        },
        shouldNotBeCalled: function () {
            return new Error('Should not call');
        }
    };

    beforeEach(function () {
        spyOn(testObj, 'shouldBeCalled');
        spyOn(testObj, 'shouldNotBeCalled');
    });

    it('testObj.shouldBeCalled shoud have been called', function () {
        testObj.shouldBeCalled();
        expect(testObj.shouldBeCalled).toHaveBeenCalled();
    });

    it('testObj.shouldNotBeCalled shoud not have been called', function () {
        expect(testObj.shouldNotBeCalled).not.toHaveBeenCalled();
        testObj.shouldNotBeCalled();
    });
});

describe('throw test', function () {
    var testObj = {
        mustBeThrown: function () {}
    };

    beforeEach(function () {
        spyOn(testObj, 'mustBeThrown').and.throwError(new Error('It must not been callled'));
    });

    it('mustBeThrown with type', function () {
        expect(function () {
            testObj.mustBeThrown();
        }).toThrowError(Error);;
    });

    it('mustBeThrown with message', function () {
        expect(function () {
            testObj.mustBeThrown();
        }).toThrowError('It must not been callled');
    });
});


describe("A spy, when configured to call through", function() {
    var foo, bar, fetchedBar;

    beforeEach(function() {
        foo = {
            setBar: function(value) {
                bar = value;
            },
            getBar: function() {
                return bar;
            }
        };

        spyOn(foo, 'getBar').and.callThrough();

        foo.setBar(123);
        fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", function() {
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not affect other functions", function() {
        expect(bar).toEqual(123);
    });

    it("when called returns the requested value", function() {
        expect(fetchedBar).toEqual(123);
    });
});

