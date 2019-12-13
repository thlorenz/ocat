'use strict'

const test = require('tape')
const ocat = require('../')
const fs = require('fs')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}

const obj = {
  uno: 1,
  dos: 'zwei',
  tres: { num: 'drei' },
  hello: 'world',
  array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
}

function nonEmptyLines(lines) {
  return lines.split('\n').filter(function(x) {
    return x.length
  })
}

// don't use color in tests
ocat.opts.color = false
test('\ndefault opts (no color)', function(t) {
  ocat.rm()
  ocat.file(obj)
  const logged = fs.readFileSync(ocat.tmpFile).toString()

  t.deepEqual(
    nonEmptyLines(logged),
    [
      ' { uno: 1',
      " , dos: 'zwei'",
      " , tres: { num: 'drei' }",
      " , hello: 'world'",
      ' , array: [',
      '    0, 1, 2, 3, 4',
      '  , 5, 6, 7, 8, 9',
      '  ] }',
    ],
    'logs correct output'
  )
  t.end()
})

test('\nper method overrides', function(t) {
  ocat.rm()
  ocat.file(obj, {
    prefix: 'pre-\n',
    suffix: '\n-suf',
    indent: '    ',
    commaFirst: false,
  })

  const logged = fs.readFileSync(ocat.tmpFile).toString()
  t.deepEqual(
    nonEmptyLines(logged),
    [
      'pre-',
      '    { uno: 1,',
      "      dos: 'zwei',",
      "      tres: { num: 'drei' },",
      "      hello: 'world',",
      '      array: [',
      '        0, 1, 2, 3, 4,',
      '        5, 6, 7, 8, 9',
      '      ] }',
      '-suf',
    ],
    'logs correct output'
  )

  t.end()
})

test('\nglobal settings', function(t) {
  ocat.opts.indent = '  '
  ocat.opts.prefix = '---pre: \n'
  ocat.opts.suffix = '\n---suf'

  ocat.rm()
  ocat.file(obj)

  const logged = fs.readFileSync(ocat.tmpFile).toString()
  t.deepEqual(
    nonEmptyLines(logged),
    [
      '---pre: ',
      '   { uno: 1',
      "   , dos: 'zwei'",
      "   , tres: { num: 'drei' }",
      "   , hello: 'world'",
      '   , array: [',
      '      0, 1, 2, 3, 4',
      '    , 5, 6, 7, 8, 9',
      '    ] }',
      '---suf',
    ],
    'logs correct output'
  )
  t.end()
})

test('\nglobal settings and overrides', function(t) {
  ocat.opts.indent = '  '
  ocat.opts.prefix = '---pre: \n'
  ocat.opts.suffix = '\n---suf'

  ocat.rm()
  ocat.file(obj, {
    prefix: 'pre-\n',
    commaFirst: false,
  })

  const logged = fs.readFileSync(ocat.tmpFile).toString()
  t.deepEqual(
    nonEmptyLines(logged),
    [
      'pre-',
      '  { uno: 1,',
      "    dos: 'zwei',",
      "    tres: { num: 'drei' },",
      "    hello: 'world',",
      '    array: [',
      '      0, 1, 2, 3, 4,',
      '      5, 6, 7, 8, 9',
      '    ] }',
      '---suf',
    ],
    'logs correct output'
  )
  t.end()
})

test('\nbag', function(t) {
  ocat.resetOpts()
  ocat.opts.color = false

  ocat.bag(obj)
  const logged = ocat._bagged[0]

  t.deepEqual(
    nonEmptyLines(logged),
    [
      ' { uno: 1',
      " , dos: 'zwei'",
      " , tres: { num: 'drei' }",
      " , hello: 'world'",
      ' , array: [',
      '    0, 1, 2, 3, 4',
      '  , 5, 6, 7, 8, 9',
      '  ] }',
    ],
    'logs correct output'
  )
  t.end()
})
