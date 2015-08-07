'use strict';

var util = require('util');

exports.options = {
  trim: false
};

function trim(val) {
  return val.split(/\r\n|\r|\n/g).map(function(line) {
    return line.trim();
  }).filter(function(line) {
    return line;
  }).join('\n');
}

function trimShift(lines) {
  var spaces = /^\s*/;
  var min = Infinity;

  for (var i = 0; i < lines.length; i++)
    if (lines[i])
      break;

  var start = i;
  for (; i < lines.length; i++)
    min = Math.min(lines[i].match(spaces)[0].length, min);

  var res = new Array(lines.length - start);
  for (var i = 0; i < res.length; i++)
    res[i] = lines[i + start].slice(min).replace(/\s+$/, '');

  return res;
}

exports.equal = function equal(actual, expected, options) {
  var opts = util._extend({}, exports.options);
  util._extend(opts, options);

  if (opts.trim) {
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

  function notEmpty(line) {
    return line.length !== 0;
  }

  actualLines = actualLines.filter(notEmpty);
  expectedLines = expectedLines.filter(notEmpty);
  var total = Math.max(actualLines.length, expectedLines.length);

  if (actualLines.length !== total) {
    for (var i = actualLines.length; i < total; i++)
      actualLines.push('');
  } else {
    for (var i = expectedLines.length; i < total; i++)
      expectedLines.push('');
  }

  // Equalize padding
  if (opts.trim) {
    actualLines = trimShift(actualLines);
    expectedLines = trimShift(expectedLines);
  }

  expectedLines.unshift('    expected:');
  actualLines.unshift('    actual:');
  total++;
  for (var i = 0; i < total; i++) {
    width = Math.max(width, actualLines[i].length);
    width = Math.max(width, expectedLines[i].length);
  }

  var out = '';
  for (var i = 0; i < total; i++) {
    var left = expectedLines[i];
    var right = actualLines[i];

    if ((opts.trim ? left.trim() !== right.trim() : left !== right) && i !== 0)
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
  if (opts.actual)
    out += '\n' + actual;

  throw new Error(out);
};
