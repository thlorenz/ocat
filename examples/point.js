'use strict'

var test = require('tape')
var ocat = require('../')

function Point(x, y, z) {
  if (!(this instanceof Point)) return new Point(x, y, z)

  this.x = x
  this.y = y
  this.z = z
}

var proto = Point.prototype

function add(p1, p2) {
  return new Point(p1.x + p2.x, p1.y + p2.y, p1.z + p2.z)
}

var deepEqualOpts = {
  prefix: '  t.deepEqual(p3, ',
  suffix: ", 'adds points correctly')",
  indent: '',
}
ocat.opts = deepEqualOpts

test('\nPoint(100, 200, 300) + Point(1000, 2000, 3000 ) == Point(1100, 2200, 3300) ', function(t) {
  var p1 = new Point(100, 200, 300)
  var p2 = new Point(1000, 2000, 3000)
  var p3 = add(p1, p2)

  ocat.file(p3)
  ocat.log(p3)
  t.end()
})
