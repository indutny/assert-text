var assert = require('assert');

var assertText = require('../');

describe('assert-text', function() {
  it('should not throw on equal lines', function() {
    assert.doesNotThrow(function() {
      assertText.equal('a\nb', 'a\nb');
    });
  });

  it('should throw on different lines', function() {
    assert.throws(function() {
      assertText.equal('a\nb', 'a\nc');
    }, /expected.*actual/g);
  });

  it('should not throw on equal trimmed lines', function() {
    assert.doesNotThrow(function() {
      assertText.equal('a \n b', ' a\nb ', { trim: true });
    });
  });

  it('should throw on different trimmed lines', function() {
    assert.throws(function() {
      assertText.equal('a\nb', 'a\n c');
    }, /expected.*actual/g);
  });
});
