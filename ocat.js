'use strict'

const xtend = require('xtend')
const utilInspect = require('util').inspect
const fs = require('fs')
const path = require('path')
const os = require('os')

const isOperatingSystem = !/^win/.test(process.platform)
const tmpFile = isOperatingSystem
  ? path.join('/tmp', 'ocat.txt')
  : path.join(os.tmpdir(), 'ocat.txt')

const env = process.env

const defaultOpts = {
  prefix: '',
  suffix: '',
  indent: '',
  color: typeof env.OCAT_COLOR !== 'undefined' ? env.OCAT_COLOR !== '0' : true,
  depth: typeof env.OCAT_DEPTH !== 'undefined' ? parseInt(env.OCAT_DEPTH) : 1,
  commaFirst:
    typeof env.OCAT_COMMAFIRST !== 'undefined'
      ? env.OCAT_COMMAFIRST === '1'
      : true,
}

function logstderr(item) {
  console.error(item)
}

function Ocat(opts) {
  if (!(this instanceof Ocat)) return new Ocat(opts)
  this._registered = false
  this._bagged = []

  this._opts = opts
}

const proto = Ocat.prototype

/**
 * Inspects object and adds results to a bag.
 * This entire bag is logged at `process.on('exit')`.
 *
 * @name ocat.bag
 * @function
 * @param {Object} obj to inspect
 * @param {Object} opts options (same as @see ocat.log)
 */
proto.bag = function bag(obj, opts) {
  this._bagged.push(this.inspect(obj, opts))
  this._registerExit()
}

/**
 * Same as @see ocat.log, but writes to ocat.tmpFile * at `/tmp/ocat.txt`
 * on Unixes and who knows on Windows (`os.tmpdir()/ocat.txt`).
 *
 * This is useful if you want to read isolated ocat output into your editor
 * without other output, i.e. by your test runner.
 *
 * **Vim Example**:
 *
 * ```
 * :r !OCAT_COLOR=0 OCAT_DEPTH=0 OCAT_RM=1 node % 2>&1 > /dev/null && cat /tmp/ocat.txt
 * ```
 *
 * will read the ocat printed output right into your editor.
 * You should probably bind that to a shortcut. ;)
 *
 * **Tail Example**:
 *
 * In another terminal pane do:
 *
 * ```
 * tail -f /tmp/ocat.txt
 * ```
 *
 * to see logged objects every time you run your tests/code.
 *
 *
 * @name ocat.file
 * @function
 * @param {Object} obj to inspect
 * @param {Object} opts options (same as @see ocat.log) with `color: false`
 */
proto.file = function file(obj, opts) {
  const inspected = this.inspect(obj, opts)
  fs.appendFileSync(tmpFile, inspected + '\n\n')
}

/**
 * Inspects object and logs it to *stderr* immediately.
 *
 * The given opts override all other options for each supplied property, which are derived as follows:
 *
 *  1. ocat.opts, the default opts:
 *     `prefix: '', suffix: '', indent: '', color: true, depth: 1, commaFirst: true`
 *  2. `OCAT_COLOR` and `OCAT_COMMAFIRST` to override the related defaults, i.e.
 *     `OCAT_COLOR=0 node my.js` includes no colors
 *  3. opts passed to `ocat.create` for that `ocat` instance only
 *  4. opts passed to `ocat.log` and `ocat.bag`
 *
 * @name ocat.log
 * @function
 * @param {Object}   obj  object to inspect
 * @param {Object}   opts options inherit from opts passed to `create` and then `ocat.opts`.
 * @param {String=}  opts.prefix     the prefix to insert before the logged object
 * @param {String=}  opts.suffix     the suffix to insert after the logged object
 * @param {String=}  opts.indent     the indentation to apply to each line
 * @param {Boolean=} opts.color      if `true` logging in colors
 * @param {Number=}  opts.depth      depth to which the object is inspected
 * @param {Boolean=} opts.commaFirst if `true` commaFirst style is used when logging without color** (default: `true`)
 *
 */
proto.log = function log(obj, opts) {
  console.error(this.inspect(obj, opts))
}

proto.inspect = function _inspect(obj, opts) {
  // provide shortcut to trigger colors
  if (typeof opts === 'boolean') opts = { color: opts }
  opts = xtend(defaultOpts, exports.opts, this._opts, opts)

  let inspected = utilInspect(obj, null, opts.depth, opts.color)
  // We don't like extra newlines for object start and end
  inspected = inspected.replace(/^ *{\n /, '{').replace(/\n}/, ' }')

  // when we're run in no color mode adjust style to comma first if so preferred
  inspected =
    !opts.color && opts.commaFirst
      ? ' ' + inspected.replace(/,\n(:? +?) {1,2}(:?[^ ])/gm, '\n$1, $2')
      : inspected

  function addIndent(x) {
    return opts.indent + x
  }

  if (opts.indent && opts.indent.length) {
    inspected = inspected
      .split('\n')
      .map(addIndent)
      .join('\n')
  }

  return opts.prefix + inspected + opts.suffix
}

proto._registerExit = function _registerExit() {
  // make sure we log the bagged ocats on process exit
  // only need to register this once of course
  if (this._registered) return

  const self = this
  function logAll() {
    if (self._loggedOnExit) return
    self._bagged.forEach(logstderr)
    self._loggedOnExit = true
  }
  // need beforeExit for tape which seems to mess with exit
  // in that case we don't log at very end of output though
  process.once('beforeExit', logAll)
  process.once('exit', logAll)

  this._registered = true
}

exports = module.exports = new Ocat()

const RES5_OPTS = {
  prefix: '  spok(t, res, \n',
  suffix: ')',
  indent: '   ',
  depth: 5,
}

/**
 * Applies preconfigured opts with prefix + indentation and depth
 * that work well in lots of scenarios.
 *
 * ### Example
 *
 * ```js
 * const ocat = require('ocat').applyRes5Opts()
 * ```
 *
 * @name ocat.applyRes5Opts
 * @function
 * @return {Object} ocat
 */
exports.applyRes5Opts = function applyRes5Opts() {
  exports.opts = xtend(RES5_OPTS)
  return exports
}

/**
 * Start out as default options @see ocat.log.
 * Allow overriding ocat options for **all** instances.
 *
 * @name ocat.opts
 */
exports.opts = xtend(defaultOpts)

/**
 * Resets ocat.opts to default opts.
 *
 * @name ocat.resetOpts
 * @function
 */
exports.resetOpts = function resetOpts() {
  exports.opts = xtend(defaultOpts)
}

/**
 * Creates an ocat instance with the supplied options.
 * @name ocat.create
 * @function
 * @param {Object} opts options (same as @see ocat.log)
 * @return {Object} ocat instance
 */
exports.create = Ocat

/**
 * The file into which ocat.file writes.
 * Set it to any other path you like to use instead.
 *
 * @name ocat.tmpFile
 */
exports.tmpFile = tmpFile

/**
 * Removes the ocat.tmpFile
 * If the an env const `OCAT_RM=1` is present, the file is removed on startup.
 *
 * @name ocat.rm
 * @function
 */
exports.rm = function rm() {
  try {
    fs.unlinkSync(exports.tmpFile)
  } catch (_) {
    /* don't care */
  }
}

if (env.OCAT_RM === '1') exports.rm()
