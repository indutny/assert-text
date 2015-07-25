'use strict';

function trim(val) {
  return val.split(/\r\n|\r|\n/g).map(function(line) {
    return line.trim();
  }).filter(function(line) {
    return line;
  }).join('\n');
}

exports.equal = function equal(actual, expected, options) {
  if (!options)
    options = {};

  if (options.trim) {
    if (trim(actual) === trim(expected))
      return;
  } else {
    if (actual === expected)
      return;
  }

  // Pretty print output
  var actualLines = actual.split('\n');
  var expectedLines = expected.split('\n');
  var width = 0;

  if (options.trim) {
    actualLines = actualLines.map(trim);
    expectedLines = expectedLines.map(trim);
  }

  expectedLines.unshift('    expected:');
  actualLines.unshift('    actual:');
  var total = Math.max(actualLines.length, expectedLines.length);

  if (actualLines.length !== total) {
    for (var i = actualLines.length; i < total; i++)
      actualLines.push('');
  } else {
    for (var i = expectedLines.length; i < total; i++)
      expectedLines.push('');
  }

  for (var i = 0; i < total; i++) {
    width = Math.max(width, actualLines[i].length);
    width = Math.max(width, expectedLines[i].length);
  }

  var out = '';
  for (var i = 0; i < total; i++) {
    var left = expectedLines[i];
    var right = actualLines[i];

    if (left !== right && i !== 0)
      out += '* \x1b[31m';
    else
      out += '  \x1b[32m';

    out += left;
    for (var j = left.length; j < width; j++)
      out += ' ';

    out += '  |  ';
    out += right;

    out += '\x1b[0m';

    out += '\n';
  }

  out = 'lines not equal\n\n' + out;
  if (options.actual)
    out += '\n' + actual;

  throw new Error(out);
};
