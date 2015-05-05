# ocat [![build status](https://secure.travis-ci.org/thlorenz/ocat.png)](http://travis-ci.org/thlorenz/ocat)

Inspect an object various ways in order to easily generate test cases.

[![assets/demo.gif](assets/demo.gif)](https://raw.githubusercontent.com/thlorenz/ocat/master/assets/demo.gif)

## Installation

    npm install ocat

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="ocat::opts"><span class="type-signature"></span>ocat::opts<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Start out as default options @see ocat::log.
Allow overriding ocat options for <strong>all</strong> instances.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js">ocat.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js#L162">lineno 162</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="ocat::tmpFile"><span class="type-signature"></span>ocat::tmpFile<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>The file into which ocat.file writes.
Set it to any other path you like to use instead.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js">ocat.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js#L189">lineno 189</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
<dl>
<dt>
<h4 class="name" id="ocat::bag"><span class="type-signature"></span>ocat::bag<span class="signature">(obj, opts)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Inspects object and adds results to a bag.
This entire bag is logged at <code>process.on('exit')</code>.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>obj</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>to inspect</p></td>
</tr>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options (same as @see ocat::log)</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js">ocat.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js#L39">lineno 39</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="ocat::create"><span class="type-signature"></span>ocat::create<span class="signature">(opts)</span><span class="type-signature"> &rarr; {Object}</span></h4>
</dt>
<dd>
<div class="description">
<p>Creates an ocat instance with the supplied options.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options (same as @see ocat::log)</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js">ocat.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js#L180">lineno 180</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>ocat instance</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Object</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="ocat::file"><span class="type-signature"></span>ocat::file<span class="signature">(obj, opts)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Same as @see ocat.log, but writes to ocat.tmpFile * at <code>/tmp/ocat.txt</code>
on Unixes and who knows on Windows (<code>os.tmpdir()/ocat.txt</code>).</p>
<p>This is useful if you want to read isolated ocat output into your editor
without other output, i.e. by your test runner.</p>
<p><strong>Vim Example</strong>:</p>
<pre><code>:r !OCAT_COLOR=0 OCAT_RM=1 node % 1&amp;&gt;2 /dev/null &amp;&amp; cat /tmp/ocat.txt</code></pre>
<p>will read the ocat printed output right into your editor.
You should probably bind that to a shortcut. ;)</p>
<p><strong>Tail Example</strong>:</p>
<p>In another terminal pane do:</p>
<pre><code>tail -f /tmp/ocat.txt</code></pre>
<p>to see logged objects every time you run your tests/code.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>obj</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>to inspect</p></td>
</tr>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options (same as @see ocat::log) with <code>color: false</code></p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js">ocat.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js#L53">lineno 53</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="ocat::log"><span class="type-signature"></span>ocat::log<span class="signature">(obj, opts)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Inspects object and logs it to <em>stderr</em> immediately.</p>
<p>The given opts override all other options for each supplied property, which are derived as follows:</p>
<ol>
<li>ocat.opts, the default opts:
<code>prefix: '', suffix: '', indent: '', color: true, depth: 1, commaFirst: true</code></li>
<li><code>OCAT_COLOR</code> and <code>OCAT_COMMAFIRST</code> to override the related defaults, i.e.
<code>OCAT_COLOR=0 node my.js</code> includes no colors</li>
<li>opts passed to <code>ocat.create</code> for that <code>ocat</code> instance only</li>
<li>opts passed to <code>ocat.log</code> and <code>ocat.bag</code></li>
</ol>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>obj</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>object to inspect</p></td>
</tr>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options inherit from opts passed to <code>create</code> and then <code>ocat.opts</code>.</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>prefix</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>the prefix to insert before the logged object</p></td>
</tr>
<tr>
<td class="name"><code>suffix</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>the suffix to insert after the logged object</p></td>
</tr>
<tr>
<td class="name"><code>indent</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>the indentation to apply to each line</p></td>
</tr>
<tr>
<td class="name"><code>color</code></td>
<td class="type">
<span class="param-type">Boolean</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>if <code>true</code> logging in colors</p></td>
</tr>
<tr>
<td class="name"><code>depth</code></td>
<td class="type">
<span class="param-type">Number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>depth to which the object is inspected</p></td>
</tr>
<tr>
<td class="name"><code>commaFirst</code></td>
<td class="type">
<span class="param-type">Boolean</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>if <code>true</code> commaFirst style is used when logging without color** (default: <code>true</code>)</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js">ocat.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js#L90">lineno 90</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="ocat::resetOpts"><span class="type-signature"></span>ocat::resetOpts<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Resets ocat.opts to default opts.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js">ocat.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js#L170">lineno 170</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="ocat::rm"><span class="type-signature"></span>ocat::rm<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Removes the ocat.tmpFile
If the an env var <code>OCAT_RM=1</code> is present, the file is removed on startup.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js">ocat.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/ocat/blob/master/ocat.js#L197">lineno 197</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
