var mocha = require('mocha');
var expect = require('chai').expect;

var helpers = require('./helpers');

var describe = mocha.describe;
var it = mocha.it;

describe('and', function() {
  it('returns true if all parameters are truthy', function() {
    expect(helpers.and(true, true, true, true, {})).to.be.true;
    expect(helpers.and(true, 1, 'a', true, {})).to.be.true;
  });

  it('returns false if one or more parameters are falsy', function() {
    expect(helpers.and(true, true, false, true, {})).to.be.false;
    expect(helpers.and(true, false, false, true, {})).to.be.false;
    expect(helpers.and(false, true, false, true, {})).to.be.false;
    expect(helpers.and(false, false, false, false, {})).to.be.false;
    expect(helpers.and(null, true, true, true, {})).to.be.false;
    expect(helpers.and(0, true, true, true, {})).to.be.false;
  });

  it('ignores last `option` argument', function() {
    expect(helpers.and(true, true, true, true, false)).to.be.true;
  });
});

describe('or', function() {
  it('returns true if any parameter is truthy', function() {
    expect(helpers.or(true, true, true, true, {})).to.be.true;
    expect(helpers.or(true, false, false, false, {})).to.be.true;
    expect(helpers.or(false, false, true, true, {})).to.be.true;
    expect(helpers.or(1, false, false, false, {})).to.be.true;
    expect(helpers.or('a', false, false, false, {})).to.be.true;
  });

  it('returns false if all parameters are falsy', function() {
    expect(helpers.or(false, false, false, false, {})).to.be.false;
    expect(helpers.or('', null, undefined, false, {})).to.be.false;
  });

  it('ignores last `option` argument', function() {
    expect(helpers.or(false, false, false, false, true)).to.be.false;
  });
});

describe('concat', function() {
  it('concats all arguments', function() {
    expect(helpers.concat('hello', ' ', 'world', {})).to.equal('hello world');
  });

  it('ignores last `option` argument', function() {
    expect(helpers.concat('foo', 'bar', 'baz', 'foooo')).to.equal('foobarbaz');
  });
});

describe('isStatic', function() {
  it('is truthy if `static` property is truthy', function() {
    expect(helpers.isStatic({ static: true })).to.be.ok;
    expect(helpers.isStatic({ static: 1 })).to.be.ok;
  });

  it('is falsy if `static` property is falsy or missing', function() {
    expect(helpers.isStatic({})).to.not.be.ok;
    expect(helpers.isStatic({ static: false })).to.not.be.ok;
    expect(helpers.isStatic({ static: 0 })).to.not.be.ok;
  });
});
