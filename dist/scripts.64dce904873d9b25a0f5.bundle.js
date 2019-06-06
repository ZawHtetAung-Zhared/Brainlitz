!(function(t, e) {
  'use strict';
  'object' == typeof module && 'object' == typeof module.exports
    ? (module.exports = t.document
        ? e(t, !0)
        : function(t) {
            if (!t.document)
              throw new Error('jQuery requires a window with a document');
            return e(t);
          })
    : e(t);
})('undefined' != typeof window ? window : this, function(t, e) {
  'use strict';
  var n = [],
    r = t.document,
    i = Object.getPrototypeOf,
    o = n.slice,
    s = n.concat,
    a = n.push,
    l = n.indexOf,
    u = {},
    c = u.toString,
    h = u.hasOwnProperty,
    f = h.toString,
    d = f.call(Object),
    p = {},
    g = function(t) {
      return 'function' == typeof t && 'number' != typeof t.nodeType;
    },
    m = function(t) {
      return null != t && t === t.window;
    },
    v = { type: !0, src: !0, noModule: !0 };
  function y(t, e, n) {
    var i,
      o = (e = e || r).createElement('script');
    if (((o.text = t), n)) for (i in v) n[i] && (o[i] = n[i]);
    e.head.appendChild(o).parentNode.removeChild(o);
  }
  function _(t) {
    return null == t
      ? t + ''
      : 'object' == typeof t || 'function' == typeof t
      ? u[c.call(t)] || 'object'
      : typeof t;
  }
  var b = function(t, e) {
      return new b.fn.init(t, e);
    },
    w = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  function x(t) {
    var e = !!t && 'length' in t && t.length,
      n = _(t);
    return (
      !g(t) &&
      !m(t) &&
      ('array' === n ||
        0 === e ||
        ('number' == typeof e && e > 0 && e - 1 in t))
    );
  }
  (b.fn = b.prototype = {
    jquery: '3.3.1',
    constructor: b,
    length: 0,
    toArray: function() {
      return o.call(this);
    },
    get: function(t) {
      return null == t ? o.call(this) : t < 0 ? this[t + this.length] : this[t];
    },
    pushStack: function(t) {
      var e = b.merge(this.constructor(), t);
      return (e.prevObject = this), e;
    },
    each: function(t) {
      return b.each(this, t);
    },
    map: function(t) {
      return this.pushStack(
        b.map(this, function(e, n) {
          return t.call(e, n, e);
        })
      );
    },
    slice: function() {
      return this.pushStack(o.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(t) {
      var e = this.length,
        n = +t + (t < 0 ? e : 0);
      return this.pushStack(n >= 0 && n < e ? [this[n]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    push: a,
    sort: n.sort,
    splice: n.splice
  }),
    (b.extend = b.fn.extend = function() {
      var t,
        e,
        n,
        r,
        i,
        o,
        s = arguments[0] || {},
        a = 1,
        l = arguments.length,
        u = !1;
      for (
        'boolean' == typeof s && ((u = s), (s = arguments[a] || {}), a++),
          'object' == typeof s || g(s) || (s = {}),
          a === l && ((s = this), a--);
        a < l;
        a++
      )
        if (null != (t = arguments[a]))
          for (e in t)
            (n = s[e]),
              s !== (r = t[e]) &&
                (u && r && (b.isPlainObject(r) || (i = Array.isArray(r)))
                  ? (i
                      ? ((i = !1), (o = n && Array.isArray(n) ? n : []))
                      : (o = n && b.isPlainObject(n) ? n : {}),
                    (s[e] = b.extend(u, o, r)))
                  : void 0 !== r && (s[e] = r));
      return s;
    }),
    b.extend({
      expando: 'jQuery' + ('3.3.1' + Math.random()).replace(/\D/g, ''),
      isReady: !0,
      error: function(t) {
        throw new Error(t);
      },
      noop: function() {},
      isPlainObject: function(t) {
        var e, n;
        return (
          !(!t || '[object Object]' !== c.call(t)) &&
          (!(e = i(t)) ||
            ('function' ==
              typeof (n = h.call(e, 'constructor') && e.constructor) &&
              f.call(n) === d))
        );
      },
      isEmptyObject: function(t) {
        var e;
        for (e in t) return !1;
        return !0;
      },
      globalEval: function(t) {
        y(t);
      },
      each: function(t, e) {
        var n,
          r = 0;
        if (x(t))
          for (n = t.length; r < n && !1 !== e.call(t[r], r, t[r]); r++);
        else for (r in t) if (!1 === e.call(t[r], r, t[r])) break;
        return t;
      },
      trim: function(t) {
        return null == t ? '' : (t + '').replace(w, '');
      },
      makeArray: function(t, e) {
        var n = e || [];
        return (
          null != t &&
            (x(Object(t))
              ? b.merge(n, 'string' == typeof t ? [t] : t)
              : a.call(n, t)),
          n
        );
      },
      inArray: function(t, e, n) {
        return null == e ? -1 : l.call(e, t, n);
      },
      merge: function(t, e) {
        for (var n = +e.length, r = 0, i = t.length; r < n; r++) t[i++] = e[r];
        return (t.length = i), t;
      },
      grep: function(t, e, n) {
        for (var r = [], i = 0, o = t.length, s = !n; i < o; i++)
          !e(t[i], i) !== s && r.push(t[i]);
        return r;
      },
      map: function(t, e, n) {
        var r,
          i,
          o = 0,
          a = [];
        if (x(t))
          for (r = t.length; o < r; o++)
            null != (i = e(t[o], o, n)) && a.push(i);
        else for (o in t) null != (i = e(t[o], o, n)) && a.push(i);
        return s.apply([], a);
      },
      guid: 1,
      support: p
    }),
    'function' == typeof Symbol && (b.fn[Symbol.iterator] = n[Symbol.iterator]),
    b.each(
      'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
        ' '
      ),
      function(t, e) {
        u['[object ' + e + ']'] = e.toLowerCase();
      }
    );
  var E = (function(t) {
    var e,
      n,
      r,
      i,
      o,
      s,
      a,
      l,
      u,
      c,
      h,
      f,
      d,
      p,
      g,
      m,
      v,
      y,
      _,
      b = 'sizzle' + 1 * new Date(),
      w = t.document,
      x = 0,
      E = 0,
      T = st(),
      S = st(),
      C = st(),
      k = function(t, e) {
        return t === e && (h = !0), 0;
      },
      A = {}.hasOwnProperty,
      D = [],
      N = D.pop,
      I = D.push,
      L = D.push,
      j = D.slice,
      q = function(t, e) {
        for (var n = 0, r = t.length; n < r; n++) if (t[n] === e) return n;
        return -1;
      },
      O =
        'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      R = '[\\x20\\t\\r\\n\\f]',
      B = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+',
      M =
        '\\[' +
        R +
        '*(' +
        B +
        ')(?:' +
        R +
        '*([*^$|!~]?=)' +
        R +
        '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
        B +
        '))|)' +
        R +
        '*\\]',
      P =
        ':(' +
        B +
        ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
        M +
        ')*)|.*)\\)|)',
      H = new RegExp(R + '+', 'g'),
      U = new RegExp('^' + R + '+|((?:^|[^\\\\])(?:\\\\.)*)' + R + '+$', 'g'),
      F = new RegExp('^' + R + '*,' + R + '*'),
      W = new RegExp('^' + R + '*([>+~]|' + R + ')' + R + '*'),
      V = new RegExp('=' + R + '*([^\\]\'"]*?)' + R + '*\\]', 'g'),
      z = new RegExp(P),
      G = new RegExp('^' + B + '$'),
      K = {
        ID: new RegExp('^#(' + B + ')'),
        CLASS: new RegExp('^\\.(' + B + ')'),
        TAG: new RegExp('^(' + B + '|[*])'),
        ATTR: new RegExp('^' + M),
        PSEUDO: new RegExp('^' + P),
        CHILD: new RegExp(
          '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
            R +
            '*(even|odd|(([+-]|)(\\d*)n|)' +
            R +
            '*(?:([+-]|)' +
            R +
            '*(\\d+)|))' +
            R +
            '*\\)|)',
          'i'
        ),
        bool: new RegExp('^(?:' + O + ')$', 'i'),
        needsContext: new RegExp(
          '^' +
            R +
            '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
            R +
            '*((?:-\\d)?\\d*)' +
            R +
            '*\\)|)(?=[^-]|$)',
          'i'
        )
      },
      Q = /^(?:input|select|textarea|button)$/i,
      Y = /^h\d$/i,
      $ = /^[^{]+\{\s*\[native \w/,
      X = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      J = /[+~]/,
      Z = new RegExp('\\\\([\\da-f]{1,6}' + R + '?|(' + R + ')|.)', 'ig'),
      tt = function(t, e, n) {
        var r = '0x' + e - 65536;
        return r != r || n
          ? e
          : r < 0
          ? String.fromCharCode(r + 65536)
          : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
      },
      et = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
      nt = function(t, e) {
        return e
          ? '\0' === t
            ? '\ufffd'
            : t.slice(0, -1) +
              '\\' +
              t.charCodeAt(t.length - 1).toString(16) +
              ' '
          : '\\' + t;
      },
      rt = function() {
        f();
      },
      it = yt(
        function(t) {
          return !0 === t.disabled && ('form' in t || 'label' in t);
        },
        { dir: 'parentNode', next: 'legend' }
      );
    try {
      L.apply((D = j.call(w.childNodes)), w.childNodes),
        D[w.childNodes.length].nodeType;
    } catch (t) {
      L = {
        apply: D.length
          ? function(t, e) {
              I.apply(t, j.call(e));
            }
          : function(t, e) {
              for (var n = t.length, r = 0; (t[n++] = e[r++]); );
              t.length = n - 1;
            }
      };
    }
    function ot(t, e, r, i) {
      var o,
        a,
        u,
        c,
        h,
        p,
        v,
        y = e && e.ownerDocument,
        x = e ? e.nodeType : 9;
      if (
        ((r = r || []),
        'string' != typeof t || !t || (1 !== x && 9 !== x && 11 !== x))
      )
        return r;
      if (
        !i &&
        ((e ? e.ownerDocument || e : w) !== d && f(e), (e = e || d), g)
      ) {
        if (11 !== x && (h = X.exec(t)))
          if ((o = h[1])) {
            if (9 === x) {
              if (!(u = e.getElementById(o))) return r;
              if (u.id === o) return r.push(u), r;
            } else if (y && (u = y.getElementById(o)) && _(e, u) && u.id === o)
              return r.push(u), r;
          } else {
            if (h[2]) return L.apply(r, e.getElementsByTagName(t)), r;
            if (
              (o = h[3]) &&
              n.getElementsByClassName &&
              e.getElementsByClassName
            )
              return L.apply(r, e.getElementsByClassName(o)), r;
          }
        if (n.qsa && !C[t + ' '] && (!m || !m.test(t))) {
          if (1 !== x) (y = e), (v = t);
          else if ('object' !== e.nodeName.toLowerCase()) {
            for (
              (c = e.getAttribute('id'))
                ? (c = c.replace(et, nt))
                : e.setAttribute('id', (c = b)),
                a = (p = s(t)).length;
              a--;

            )
              p[a] = '#' + c + ' ' + vt(p[a]);
            (v = p.join(',')), (y = (J.test(t) && gt(e.parentNode)) || e);
          }
          if (v)
            try {
              return L.apply(r, y.querySelectorAll(v)), r;
            } catch (t) {
            } finally {
              c === b && e.removeAttribute('id');
            }
        }
      }
      return l(t.replace(U, '$1'), e, r, i);
    }
    function st() {
      var t = [];
      return function e(n, i) {
        return (
          t.push(n + ' ') > r.cacheLength && delete e[t.shift()],
          (e[n + ' '] = i)
        );
      };
    }
    function at(t) {
      return (t[b] = !0), t;
    }
    function lt(t) {
      var e = d.createElement('fieldset');
      try {
        return !!t(e);
      } catch (t) {
        return !1;
      } finally {
        e.parentNode && e.parentNode.removeChild(e), (e = null);
      }
    }
    function ut(t, e) {
      for (var n = t.split('|'), i = n.length; i--; ) r.attrHandle[n[i]] = e;
    }
    function ct(t, e) {
      var n = e && t,
        r =
          n &&
          1 === t.nodeType &&
          1 === e.nodeType &&
          t.sourceIndex - e.sourceIndex;
      if (r) return r;
      if (n) for (; (n = n.nextSibling); ) if (n === e) return -1;
      return t ? 1 : -1;
    }
    function ht(t) {
      return function(e) {
        return 'input' === e.nodeName.toLowerCase() && e.type === t;
      };
    }
    function ft(t) {
      return function(e) {
        var n = e.nodeName.toLowerCase();
        return ('input' === n || 'button' === n) && e.type === t;
      };
    }
    function dt(t) {
      return function(e) {
        return 'form' in e
          ? e.parentNode && !1 === e.disabled
            ? 'label' in e
              ? 'label' in e.parentNode
                ? e.parentNode.disabled === t
                : e.disabled === t
              : e.isDisabled === t || (e.isDisabled !== !t && it(e) === t)
            : e.disabled === t
          : 'label' in e && e.disabled === t;
      };
    }
    function pt(t) {
      return at(function(e) {
        return (
          (e = +e),
          at(function(n, r) {
            for (var i, o = t([], n.length, e), s = o.length; s--; )
              n[(i = o[s])] && (n[i] = !(r[i] = n[i]));
          })
        );
      });
    }
    function gt(t) {
      return t && 'undefined' != typeof t.getElementsByTagName && t;
    }
    for (e in ((n = ot.support = {}),
    (o = ot.isXML = function(t) {
      var e = t && (t.ownerDocument || t).documentElement;
      return !!e && 'HTML' !== e.nodeName;
    }),
    (f = ot.setDocument = function(t) {
      var e,
        i,
        s = t ? t.ownerDocument || t : w;
      return s !== d && 9 === s.nodeType && s.documentElement
        ? ((p = (d = s).documentElement),
          (g = !o(d)),
          w !== d &&
            (i = d.defaultView) &&
            i.top !== i &&
            (i.addEventListener
              ? i.addEventListener('unload', rt, !1)
              : i.attachEvent && i.attachEvent('onunload', rt)),
          (n.attributes = lt(function(t) {
            return (t.className = 'i'), !t.getAttribute('className');
          })),
          (n.getElementsByTagName = lt(function(t) {
            return (
              t.appendChild(d.createComment('')),
              !t.getElementsByTagName('*').length
            );
          })),
          (n.getElementsByClassName = $.test(d.getElementsByClassName)),
          (n.getById = lt(function(t) {
            return (
              (p.appendChild(t).id = b),
              !d.getElementsByName || !d.getElementsByName(b).length
            );
          })),
          n.getById
            ? ((r.filter.ID = function(t) {
                var e = t.replace(Z, tt);
                return function(t) {
                  return t.getAttribute('id') === e;
                };
              }),
              (r.find.ID = function(t, e) {
                if ('undefined' != typeof e.getElementById && g) {
                  var n = e.getElementById(t);
                  return n ? [n] : [];
                }
              }))
            : ((r.filter.ID = function(t) {
                var e = t.replace(Z, tt);
                return function(t) {
                  var n =
                    'undefined' != typeof t.getAttributeNode &&
                    t.getAttributeNode('id');
                  return n && n.value === e;
                };
              }),
              (r.find.ID = function(t, e) {
                if ('undefined' != typeof e.getElementById && g) {
                  var n,
                    r,
                    i,
                    o = e.getElementById(t);
                  if (o) {
                    if ((n = o.getAttributeNode('id')) && n.value === t)
                      return [o];
                    for (i = e.getElementsByName(t), r = 0; (o = i[r++]); )
                      if ((n = o.getAttributeNode('id')) && n.value === t)
                        return [o];
                  }
                  return [];
                }
              })),
          (r.find.TAG = n.getElementsByTagName
            ? function(t, e) {
                return 'undefined' != typeof e.getElementsByTagName
                  ? e.getElementsByTagName(t)
                  : n.qsa
                  ? e.querySelectorAll(t)
                  : void 0;
              }
            : function(t, e) {
                var n,
                  r = [],
                  i = 0,
                  o = e.getElementsByTagName(t);
                if ('*' === t) {
                  for (; (n = o[i++]); ) 1 === n.nodeType && r.push(n);
                  return r;
                }
                return o;
              }),
          (r.find.CLASS =
            n.getElementsByClassName &&
            function(t, e) {
              if ('undefined' != typeof e.getElementsByClassName && g)
                return e.getElementsByClassName(t);
            }),
          (v = []),
          (m = []),
          (n.qsa = $.test(d.querySelectorAll)) &&
            (lt(function(t) {
              (p.appendChild(t).innerHTML =
                "<a id='" +
                b +
                "'></a><select id='" +
                b +
                "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                t.querySelectorAll("[msallowcapture^='']").length &&
                  m.push('[*^$]=' + R + '*(?:\'\'|"")'),
                t.querySelectorAll('[selected]').length ||
                  m.push('\\[' + R + '*(?:value|' + O + ')'),
                t.querySelectorAll('[id~=' + b + '-]').length || m.push('~='),
                t.querySelectorAll(':checked').length || m.push(':checked'),
                t.querySelectorAll('a#' + b + '+*').length ||
                  m.push('.#.+[+~]');
            }),
            lt(function(t) {
              t.innerHTML =
                "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
              var e = d.createElement('input');
              e.setAttribute('type', 'hidden'),
                t.appendChild(e).setAttribute('name', 'D'),
                t.querySelectorAll('[name=d]').length &&
                  m.push('name' + R + '*[*^$|!~]?='),
                2 !== t.querySelectorAll(':enabled').length &&
                  m.push(':enabled', ':disabled'),
                (p.appendChild(t).disabled = !0),
                2 !== t.querySelectorAll(':disabled').length &&
                  m.push(':enabled', ':disabled'),
                t.querySelectorAll('*,:x'),
                m.push(',.*:');
            })),
          (n.matchesSelector = $.test(
            (y =
              p.matches ||
              p.webkitMatchesSelector ||
              p.mozMatchesSelector ||
              p.oMatchesSelector ||
              p.msMatchesSelector)
          )) &&
            lt(function(t) {
              (n.disconnectedMatch = y.call(t, '*')),
                y.call(t, "[s!='']:x"),
                v.push('!=', P);
            }),
          (m = m.length && new RegExp(m.join('|'))),
          (v = v.length && new RegExp(v.join('|'))),
          (e = $.test(p.compareDocumentPosition)),
          (_ =
            e || $.test(p.contains)
              ? function(t, e) {
                  var n = 9 === t.nodeType ? t.documentElement : t,
                    r = e && e.parentNode;
                  return (
                    t === r ||
                    !(
                      !r ||
                      1 !== r.nodeType ||
                      !(n.contains
                        ? n.contains(r)
                        : t.compareDocumentPosition &&
                          16 & t.compareDocumentPosition(r))
                    )
                  );
                }
              : function(t, e) {
                  if (e) for (; (e = e.parentNode); ) if (e === t) return !0;
                  return !1;
                }),
          (k = e
            ? function(t, e) {
                if (t === e) return (h = !0), 0;
                var r = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return (
                  r ||
                  (1 &
                    (r =
                      (t.ownerDocument || t) === (e.ownerDocument || e)
                        ? t.compareDocumentPosition(e)
                        : 1) ||
                  (!n.sortDetached && e.compareDocumentPosition(t) === r)
                    ? t === d || (t.ownerDocument === w && _(w, t))
                      ? -1
                      : e === d || (e.ownerDocument === w && _(w, e))
                      ? 1
                      : c
                      ? q(c, t) - q(c, e)
                      : 0
                    : 4 & r
                    ? -1
                    : 1)
                );
              }
            : function(t, e) {
                if (t === e) return (h = !0), 0;
                var n,
                  r = 0,
                  i = t.parentNode,
                  o = e.parentNode,
                  s = [t],
                  a = [e];
                if (!i || !o)
                  return t === d
                    ? -1
                    : e === d
                    ? 1
                    : i
                    ? -1
                    : o
                    ? 1
                    : c
                    ? q(c, t) - q(c, e)
                    : 0;
                if (i === o) return ct(t, e);
                for (n = t; (n = n.parentNode); ) s.unshift(n);
                for (n = e; (n = n.parentNode); ) a.unshift(n);
                for (; s[r] === a[r]; ) r++;
                return r
                  ? ct(s[r], a[r])
                  : s[r] === w
                  ? -1
                  : a[r] === w
                  ? 1
                  : 0;
              }),
          d)
        : d;
    }),
    (ot.matches = function(t, e) {
      return ot(t, null, null, e);
    }),
    (ot.matchesSelector = function(t, e) {
      if (
        ((t.ownerDocument || t) !== d && f(t),
        (e = e.replace(V, "='$1']")),
        n.matchesSelector &&
          g &&
          !C[e + ' '] &&
          (!v || !v.test(e)) &&
          (!m || !m.test(e)))
      )
        try {
          var r = y.call(t, e);
          if (
            r ||
            n.disconnectedMatch ||
            (t.document && 11 !== t.document.nodeType)
          )
            return r;
        } catch (t) {}
      return ot(e, d, null, [t]).length > 0;
    }),
    (ot.contains = function(t, e) {
      return (t.ownerDocument || t) !== d && f(t), _(t, e);
    }),
    (ot.attr = function(t, e) {
      (t.ownerDocument || t) !== d && f(t);
      var i = r.attrHandle[e.toLowerCase()],
        o = i && A.call(r.attrHandle, e.toLowerCase()) ? i(t, e, !g) : void 0;
      return void 0 !== o
        ? o
        : n.attributes || !g
        ? t.getAttribute(e)
        : (o = t.getAttributeNode(e)) && o.specified
        ? o.value
        : null;
    }),
    (ot.escape = function(t) {
      return (t + '').replace(et, nt);
    }),
    (ot.error = function(t) {
      throw new Error('Syntax error, unrecognized expression: ' + t);
    }),
    (ot.uniqueSort = function(t) {
      var e,
        r = [],
        i = 0,
        o = 0;
      if (
        ((h = !n.detectDuplicates),
        (c = !n.sortStable && t.slice(0)),
        t.sort(k),
        h)
      ) {
        for (; (e = t[o++]); ) e === t[o] && (i = r.push(o));
        for (; i--; ) t.splice(r[i], 1);
      }
      return (c = null), t;
    }),
    (i = ot.getText = function(t) {
      var e,
        n = '',
        r = 0,
        o = t.nodeType;
      if (o) {
        if (1 === o || 9 === o || 11 === o) {
          if ('string' == typeof t.textContent) return t.textContent;
          for (t = t.firstChild; t; t = t.nextSibling) n += i(t);
        } else if (3 === o || 4 === o) return t.nodeValue;
      } else for (; (e = t[r++]); ) n += i(e);
      return n;
    }),
    ((r = ot.selectors = {
      cacheLength: 50,
      createPseudo: at,
      match: K,
      attrHandle: {},
      find: {},
      relative: {
        '>': { dir: 'parentNode', first: !0 },
        ' ': { dir: 'parentNode' },
        '+': { dir: 'previousSibling', first: !0 },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        ATTR: function(t) {
          return (
            (t[1] = t[1].replace(Z, tt)),
            (t[3] = (t[3] || t[4] || t[5] || '').replace(Z, tt)),
            '~=' === t[2] && (t[3] = ' ' + t[3] + ' '),
            t.slice(0, 4)
          );
        },
        CHILD: function(t) {
          return (
            (t[1] = t[1].toLowerCase()),
            'nth' === t[1].slice(0, 3)
              ? (t[3] || ot.error(t[0]),
                (t[4] = +(t[4]
                  ? t[5] + (t[6] || 1)
                  : 2 * ('even' === t[3] || 'odd' === t[3]))),
                (t[5] = +(t[7] + t[8] || 'odd' === t[3])))
              : t[3] && ot.error(t[0]),
            t
          );
        },
        PSEUDO: function(t) {
          var e,
            n = !t[6] && t[2];
          return K.CHILD.test(t[0])
            ? null
            : (t[3]
                ? (t[2] = t[4] || t[5] || '')
                : n &&
                  z.test(n) &&
                  (e = s(n, !0)) &&
                  (e = n.indexOf(')', n.length - e) - n.length) &&
                  ((t[0] = t[0].slice(0, e)), (t[2] = n.slice(0, e))),
              t.slice(0, 3));
        }
      },
      filter: {
        TAG: function(t) {
          var e = t.replace(Z, tt).toLowerCase();
          return '*' === t
            ? function() {
                return !0;
              }
            : function(t) {
                return t.nodeName && t.nodeName.toLowerCase() === e;
              };
        },
        CLASS: function(t) {
          var e = T[t + ' '];
          return (
            e ||
            ((e = new RegExp('(^|' + R + ')' + t + '(' + R + '|$)')) &&
              T(t, function(t) {
                return e.test(
                  ('string' == typeof t.className && t.className) ||
                    ('undefined' != typeof t.getAttribute &&
                      t.getAttribute('class')) ||
                    ''
                );
              }))
          );
        },
        ATTR: function(t, e, n) {
          return function(r) {
            var i = ot.attr(r, t);
            return null == i
              ? '!=' === e
              : !e ||
                  ((i += ''),
                  '=' === e
                    ? i === n
                    : '!=' === e
                    ? i !== n
                    : '^=' === e
                    ? n && 0 === i.indexOf(n)
                    : '*=' === e
                    ? n && i.indexOf(n) > -1
                    : '$=' === e
                    ? n && i.slice(-n.length) === n
                    : '~=' === e
                    ? (' ' + i.replace(H, ' ') + ' ').indexOf(n) > -1
                    : '|=' === e &&
                      (i === n || i.slice(0, n.length + 1) === n + '-'));
          };
        },
        CHILD: function(t, e, n, r, i) {
          var o = 'nth' !== t.slice(0, 3),
            s = 'last' !== t.slice(-4),
            a = 'of-type' === e;
          return 1 === r && 0 === i
            ? function(t) {
                return !!t.parentNode;
              }
            : function(e, n, l) {
                var u,
                  c,
                  h,
                  f,
                  d,
                  p,
                  g = o !== s ? 'nextSibling' : 'previousSibling',
                  m = e.parentNode,
                  v = a && e.nodeName.toLowerCase(),
                  y = !l && !a,
                  _ = !1;
                if (m) {
                  if (o) {
                    for (; g; ) {
                      for (f = e; (f = f[g]); )
                        if (
                          a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType
                        )
                          return !1;
                      p = g = 'only' === t && !p && 'nextSibling';
                    }
                    return !0;
                  }
                  if (((p = [s ? m.firstChild : m.lastChild]), s && y)) {
                    for (
                      _ =
                        (d =
                          (u =
                            (c =
                              (h = (f = m)[b] || (f[b] = {}))[f.uniqueID] ||
                              (h[f.uniqueID] = {}))[t] || [])[0] === x &&
                          u[1]) && u[2],
                        f = d && m.childNodes[d];
                      (f = (++d && f && f[g]) || (_ = d = 0) || p.pop());

                    )
                      if (1 === f.nodeType && ++_ && f === e) {
                        c[t] = [x, d, _];
                        break;
                      }
                  } else if (
                    (y &&
                      (_ = d =
                        (u =
                          (c =
                            (h = (f = e)[b] || (f[b] = {}))[f.uniqueID] ||
                            (h[f.uniqueID] = {}))[t] || [])[0] === x && u[1]),
                    !1 === _)
                  )
                    for (
                      ;
                      (f = (++d && f && f[g]) || (_ = d = 0) || p.pop()) &&
                      ((a
                        ? f.nodeName.toLowerCase() !== v
                        : 1 !== f.nodeType) ||
                        !++_ ||
                        (y &&
                          ((c =
                            (h = f[b] || (f[b] = {}))[f.uniqueID] ||
                            (h[f.uniqueID] = {}))[t] = [x, _]),
                        f !== e));

                    );
                  return (_ -= i) === r || (_ % r == 0 && _ / r >= 0);
                }
              };
        },
        PSEUDO: function(t, e) {
          var n,
            i =
              r.pseudos[t] ||
              r.setFilters[t.toLowerCase()] ||
              ot.error('unsupported pseudo: ' + t);
          return i[b]
            ? i(e)
            : i.length > 1
            ? ((n = [t, t, '', e]),
              r.setFilters.hasOwnProperty(t.toLowerCase())
                ? at(function(t, n) {
                    for (var r, o = i(t, e), s = o.length; s--; )
                      t[(r = q(t, o[s]))] = !(n[r] = o[s]);
                  })
                : function(t) {
                    return i(t, 0, n);
                  })
            : i;
        }
      },
      pseudos: {
        not: at(function(t) {
          var e = [],
            n = [],
            r = a(t.replace(U, '$1'));
          return r[b]
            ? at(function(t, e, n, i) {
                for (var o, s = r(t, null, i, []), a = t.length; a--; )
                  (o = s[a]) && (t[a] = !(e[a] = o));
              })
            : function(t, i, o) {
                return (e[0] = t), r(e, null, o, n), (e[0] = null), !n.pop();
              };
        }),
        has: at(function(t) {
          return function(e) {
            return ot(t, e).length > 0;
          };
        }),
        contains: at(function(t) {
          return (
            (t = t.replace(Z, tt)),
            function(e) {
              return (e.textContent || e.innerText || i(e)).indexOf(t) > -1;
            }
          );
        }),
        lang: at(function(t) {
          return (
            G.test(t || '') || ot.error('unsupported lang: ' + t),
            (t = t.replace(Z, tt).toLowerCase()),
            function(e) {
              var n;
              do {
                if (
                  (n = g
                    ? e.lang
                    : e.getAttribute('xml:lang') || e.getAttribute('lang'))
                )
                  return (
                    (n = n.toLowerCase()) === t || 0 === n.indexOf(t + '-')
                  );
              } while ((e = e.parentNode) && 1 === e.nodeType);
              return !1;
            }
          );
        }),
        target: function(e) {
          var n = t.location && t.location.hash;
          return n && n.slice(1) === e.id;
        },
        root: function(t) {
          return t === p;
        },
        focus: function(t) {
          return (
            t === d.activeElement &&
            (!d.hasFocus || d.hasFocus()) &&
            !!(t.type || t.href || ~t.tabIndex)
          );
        },
        enabled: dt(!1),
        disabled: dt(!0),
        checked: function(t) {
          var e = t.nodeName.toLowerCase();
          return (
            ('input' === e && !!t.checked) || ('option' === e && !!t.selected)
          );
        },
        selected: function(t) {
          return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected;
        },
        empty: function(t) {
          for (t = t.firstChild; t; t = t.nextSibling)
            if (t.nodeType < 6) return !1;
          return !0;
        },
        parent: function(t) {
          return !r.pseudos.empty(t);
        },
        header: function(t) {
          return Y.test(t.nodeName);
        },
        input: function(t) {
          return Q.test(t.nodeName);
        },
        button: function(t) {
          var e = t.nodeName.toLowerCase();
          return ('input' === e && 'button' === t.type) || 'button' === e;
        },
        text: function(t) {
          var e;
          return (
            'input' === t.nodeName.toLowerCase() &&
            'text' === t.type &&
            (null == (e = t.getAttribute('type')) || 'text' === e.toLowerCase())
          );
        },
        first: pt(function() {
          return [0];
        }),
        last: pt(function(t, e) {
          return [e - 1];
        }),
        eq: pt(function(t, e, n) {
          return [n < 0 ? n + e : n];
        }),
        even: pt(function(t, e) {
          for (var n = 0; n < e; n += 2) t.push(n);
          return t;
        }),
        odd: pt(function(t, e) {
          for (var n = 1; n < e; n += 2) t.push(n);
          return t;
        }),
        lt: pt(function(t, e, n) {
          for (var r = n < 0 ? n + e : n; --r >= 0; ) t.push(r);
          return t;
        }),
        gt: pt(function(t, e, n) {
          for (var r = n < 0 ? n + e : n; ++r < e; ) t.push(r);
          return t;
        })
      }
    }).pseudos.nth = r.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      r.pseudos[e] = ht(e);
    for (e in { submit: !0, reset: !0 }) r.pseudos[e] = ft(e);
    function mt() {}
    function vt(t) {
      for (var e = 0, n = t.length, r = ''; e < n; e++) r += t[e].value;
      return r;
    }
    function yt(t, e, n) {
      var r = e.dir,
        i = e.next,
        o = i || r,
        s = n && 'parentNode' === o,
        a = E++;
      return e.first
        ? function(e, n, i) {
            for (; (e = e[r]); ) if (1 === e.nodeType || s) return t(e, n, i);
            return !1;
          }
        : function(e, n, l) {
            var u,
              c,
              h,
              f = [x, a];
            if (l) {
              for (; (e = e[r]); )
                if ((1 === e.nodeType || s) && t(e, n, l)) return !0;
            } else
              for (; (e = e[r]); )
                if (1 === e.nodeType || s)
                  if (
                    ((c =
                      (h = e[b] || (e[b] = {}))[e.uniqueID] ||
                      (h[e.uniqueID] = {})),
                    i && i === e.nodeName.toLowerCase())
                  )
                    e = e[r] || e;
                  else {
                    if ((u = c[o]) && u[0] === x && u[1] === a)
                      return (f[2] = u[2]);
                    if (((c[o] = f), (f[2] = t(e, n, l)))) return !0;
                  }
            return !1;
          };
    }
    function _t(t) {
      return t.length > 1
        ? function(e, n, r) {
            for (var i = t.length; i--; ) if (!t[i](e, n, r)) return !1;
            return !0;
          }
        : t[0];
    }
    function bt(t, e, n, r, i) {
      for (var o, s = [], a = 0, l = t.length, u = null != e; a < l; a++)
        (o = t[a]) && ((n && !n(o, r, i)) || (s.push(o), u && e.push(a)));
      return s;
    }
    function wt(t, e, n, r, i, o) {
      return (
        r && !r[b] && (r = wt(r)),
        i && !i[b] && (i = wt(i, o)),
        at(function(o, s, a, l) {
          var u,
            c,
            h,
            f = [],
            d = [],
            p = s.length,
            g =
              o ||
              (function(t, e, n) {
                for (var r = 0, i = e.length; r < i; r++) ot(t, e[r], n);
                return n;
              })(e || '*', a.nodeType ? [a] : a, []),
            m = !t || (!o && e) ? g : bt(g, f, t, a, l),
            v = n ? (i || (o ? t : p || r) ? [] : s) : m;
          if ((n && n(m, v, a, l), r))
            for (u = bt(v, d), r(u, [], a, l), c = u.length; c--; )
              (h = u[c]) && (v[d[c]] = !(m[d[c]] = h));
          if (o) {
            if (i || t) {
              if (i) {
                for (u = [], c = v.length; c--; )
                  (h = v[c]) && u.push((m[c] = h));
                i(null, (v = []), u, l);
              }
              for (c = v.length; c--; )
                (h = v[c]) &&
                  (u = i ? q(o, h) : f[c]) > -1 &&
                  (o[u] = !(s[u] = h));
            }
          } else (v = bt(v === s ? v.splice(p, v.length) : v)), i ? i(null, s, v, l) : L.apply(s, v);
        })
      );
    }
    function xt(t) {
      for (
        var e,
          n,
          i,
          o = t.length,
          s = r.relative[t[0].type],
          a = s || r.relative[' '],
          l = s ? 1 : 0,
          c = yt(
            function(t) {
              return t === e;
            },
            a,
            !0
          ),
          h = yt(
            function(t) {
              return q(e, t) > -1;
            },
            a,
            !0
          ),
          f = [
            function(t, n, r) {
              var i =
                (!s && (r || n !== u)) ||
                ((e = n).nodeType ? c(t, n, r) : h(t, n, r));
              return (e = null), i;
            }
          ];
        l < o;
        l++
      )
        if ((n = r.relative[t[l].type])) f = [yt(_t(f), n)];
        else {
          if ((n = r.filter[t[l].type].apply(null, t[l].matches))[b]) {
            for (i = ++l; i < o && !r.relative[t[i].type]; i++);
            return wt(
              l > 1 && _t(f),
              l > 1 &&
                vt(
                  t
                    .slice(0, l - 1)
                    .concat({ value: ' ' === t[l - 2].type ? '*' : '' })
                ).replace(U, '$1'),
              n,
              l < i && xt(t.slice(l, i)),
              i < o && xt((t = t.slice(i))),
              i < o && vt(t)
            );
          }
          f.push(n);
        }
      return _t(f);
    }
    return (
      (mt.prototype = r.filters = r.pseudos),
      (r.setFilters = new mt()),
      (s = ot.tokenize = function(t, e) {
        var n,
          i,
          o,
          s,
          a,
          l,
          u,
          c = S[t + ' '];
        if (c) return e ? 0 : c.slice(0);
        for (a = t, l = [], u = r.preFilter; a; ) {
          for (s in ((n && !(i = F.exec(a))) ||
            (i && (a = a.slice(i[0].length) || a), l.push((o = []))),
          (n = !1),
          (i = W.exec(a)) &&
            ((n = i.shift()),
            o.push({ value: n, type: i[0].replace(U, ' ') }),
            (a = a.slice(n.length))),
          r.filter))
            !(i = K[s].exec(a)) ||
              (u[s] && !(i = u[s](i))) ||
              ((n = i.shift()),
              o.push({ value: n, type: s, matches: i }),
              (a = a.slice(n.length)));
          if (!n) break;
        }
        return e ? a.length : a ? ot.error(t) : S(t, l).slice(0);
      }),
      (a = ot.compile = function(t, e) {
        var n,
          i = [],
          o = [],
          a = C[t + ' '];
        if (!a) {
          for (e || (e = s(t)), n = e.length; n--; )
            (a = xt(e[n]))[b] ? i.push(a) : o.push(a);
          (a = C(
            t,
            (function(t, e) {
              var n = e.length > 0,
                i = t.length > 0,
                o = function(o, s, a, l, c) {
                  var h,
                    p,
                    m,
                    v = 0,
                    y = '0',
                    _ = o && [],
                    b = [],
                    w = u,
                    E = o || (i && r.find.TAG('*', c)),
                    T = (x += null == w ? 1 : Math.random() || 0.1),
                    S = E.length;
                  for (
                    c && (u = s === d || s || c);
                    y !== S && null != (h = E[y]);
                    y++
                  ) {
                    if (i && h) {
                      for (
                        p = 0, s || h.ownerDocument === d || (f(h), (a = !g));
                        (m = t[p++]);

                      )
                        if (m(h, s || d, a)) {
                          l.push(h);
                          break;
                        }
                      c && (x = T);
                    }
                    n && ((h = !m && h) && v--, o && _.push(h));
                  }
                  if (((v += y), n && y !== v)) {
                    for (p = 0; (m = e[p++]); ) m(_, b, s, a);
                    if (o) {
                      if (v > 0)
                        for (; y--; ) _[y] || b[y] || (b[y] = N.call(l));
                      b = bt(b);
                    }
                    L.apply(l, b),
                      c &&
                        !o &&
                        b.length > 0 &&
                        v + e.length > 1 &&
                        ot.uniqueSort(l);
                  }
                  return c && ((x = T), (u = w)), _;
                };
              return n ? at(o) : o;
            })(o, i)
          )).selector = t;
        }
        return a;
      }),
      (l = ot.select = function(t, e, n, i) {
        var o,
          l,
          u,
          c,
          h,
          f = 'function' == typeof t && t,
          d = !i && s((t = f.selector || t));
        if (((n = n || []), 1 === d.length)) {
          if (
            (l = d[0] = d[0].slice(0)).length > 2 &&
            'ID' === (u = l[0]).type &&
            9 === e.nodeType &&
            g &&
            r.relative[l[1].type]
          ) {
            if (!(e = (r.find.ID(u.matches[0].replace(Z, tt), e) || [])[0]))
              return n;
            f && (e = e.parentNode), (t = t.slice(l.shift().value.length));
          }
          for (
            o = K.needsContext.test(t) ? 0 : l.length;
            o-- && ((u = l[o]), !r.relative[(c = u.type)]);

          )
            if (
              (h = r.find[c]) &&
              (i = h(
                u.matches[0].replace(Z, tt),
                (J.test(l[0].type) && gt(e.parentNode)) || e
              ))
            ) {
              if ((l.splice(o, 1), !(t = i.length && vt(l))))
                return L.apply(n, i), n;
              break;
            }
        }
        return (
          (f || a(t, d))(
            i,
            e,
            !g,
            n,
            !e || (J.test(t) && gt(e.parentNode)) || e
          ),
          n
        );
      }),
      (n.sortStable =
        b
          .split('')
          .sort(k)
          .join('') === b),
      (n.detectDuplicates = !!h),
      f(),
      (n.sortDetached = lt(function(t) {
        return 1 & t.compareDocumentPosition(d.createElement('fieldset'));
      })),
      lt(function(t) {
        return (
          (t.innerHTML = "<a href='#'></a>"),
          '#' === t.firstChild.getAttribute('href')
        );
      }) ||
        ut('type|href|height|width', function(t, e, n) {
          if (!n) return t.getAttribute(e, 'type' === e.toLowerCase() ? 1 : 2);
        }),
      (n.attributes &&
        lt(function(t) {
          return (
            (t.innerHTML = '<input/>'),
            t.firstChild.setAttribute('value', ''),
            '' === t.firstChild.getAttribute('value')
          );
        })) ||
        ut('value', function(t, e, n) {
          if (!n && 'input' === t.nodeName.toLowerCase()) return t.defaultValue;
        }),
      lt(function(t) {
        return null == t.getAttribute('disabled');
      }) ||
        ut(O, function(t, e, n) {
          var r;
          if (!n)
            return !0 === t[e]
              ? e.toLowerCase()
              : (r = t.getAttributeNode(e)) && r.specified
              ? r.value
              : null;
        }),
      ot
    );
  })(t);
  (b.find = E),
    (b.expr = E.selectors),
    (b.expr[':'] = b.expr.pseudos),
    (b.uniqueSort = b.unique = E.uniqueSort),
    (b.text = E.getText),
    (b.isXMLDoc = E.isXML),
    (b.contains = E.contains),
    (b.escapeSelector = E.escape);
  var T = function(t, e, n) {
      for (var r = [], i = void 0 !== n; (t = t[e]) && 9 !== t.nodeType; )
        if (1 === t.nodeType) {
          if (i && b(t).is(n)) break;
          r.push(t);
        }
      return r;
    },
    S = function(t, e) {
      for (var n = []; t; t = t.nextSibling)
        1 === t.nodeType && t !== e && n.push(t);
      return n;
    },
    C = b.expr.match.needsContext;
  function k(t, e) {
    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
  }
  var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function D(t, e, n) {
    return g(e)
      ? b.grep(t, function(t, r) {
          return !!e.call(t, r, t) !== n;
        })
      : e.nodeType
      ? b.grep(t, function(t) {
          return (t === e) !== n;
        })
      : 'string' != typeof e
      ? b.grep(t, function(t) {
          return l.call(e, t) > -1 !== n;
        })
      : b.filter(e, t, n);
  }
  (b.filter = function(t, e, n) {
    var r = e[0];
    return (
      n && (t = ':not(' + t + ')'),
      1 === e.length && 1 === r.nodeType
        ? b.find.matchesSelector(r, t)
          ? [r]
          : []
        : b.find.matches(
            t,
            b.grep(e, function(t) {
              return 1 === t.nodeType;
            })
          )
    );
  }),
    b.fn.extend({
      find: function(t) {
        var e,
          n,
          r = this.length,
          i = this;
        if ('string' != typeof t)
          return this.pushStack(
            b(t).filter(function() {
              for (e = 0; e < r; e++) if (b.contains(i[e], this)) return !0;
            })
          );
        for (n = this.pushStack([]), e = 0; e < r; e++) b.find(t, i[e], n);
        return r > 1 ? b.uniqueSort(n) : n;
      },
      filter: function(t) {
        return this.pushStack(D(this, t || [], !1));
      },
      not: function(t) {
        return this.pushStack(D(this, t || [], !0));
      },
      is: function(t) {
        return !!D(this, 'string' == typeof t && C.test(t) ? b(t) : t || [], !1)
          .length;
      }
    });
  var N,
    I = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((b.fn.init = function(t, e, n) {
    var i, o;
    if (!t) return this;
    if (((n = n || N), 'string' == typeof t)) {
      if (
        !(i =
          '<' === t[0] && '>' === t[t.length - 1] && t.length >= 3
            ? [null, t, null]
            : I.exec(t)) ||
        (!i[1] && e)
      )
        return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
      if (i[1]) {
        if (
          ((e = e instanceof b ? e[0] : e),
          b.merge(
            this,
            b.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : r, !0)
          ),
          A.test(i[1]) && b.isPlainObject(e))
        )
          for (i in e) g(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
        return this;
      }
      return (
        (o = r.getElementById(i[2])) && ((this[0] = o), (this.length = 1)), this
      );
    }
    return t.nodeType
      ? ((this[0] = t), (this.length = 1), this)
      : g(t)
      ? void 0 !== n.ready
        ? n.ready(t)
        : t(b)
      : b.makeArray(t, this);
  }).prototype = b.fn),
    (N = b(r));
  var L = /^(?:parents|prev(?:Until|All))/,
    j = { children: !0, contents: !0, next: !0, prev: !0 };
  function q(t, e) {
    for (; (t = t[e]) && 1 !== t.nodeType; );
    return t;
  }
  b.fn.extend({
    has: function(t) {
      var e = b(t, this),
        n = e.length;
      return this.filter(function() {
        for (var t = 0; t < n; t++) if (b.contains(this, e[t])) return !0;
      });
    },
    closest: function(t, e) {
      var n,
        r = 0,
        i = this.length,
        o = [],
        s = 'string' != typeof t && b(t);
      if (!C.test(t))
        for (; r < i; r++)
          for (n = this[r]; n && n !== e; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (s
                ? s.index(n) > -1
                : 1 === n.nodeType && b.find.matchesSelector(n, t))
            ) {
              o.push(n);
              break;
            }
      return this.pushStack(o.length > 1 ? b.uniqueSort(o) : o);
    },
    index: function(t) {
      return t
        ? 'string' == typeof t
          ? l.call(b(t), this[0])
          : l.call(this, t.jquery ? t[0] : t)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function(t, e) {
      return this.pushStack(b.uniqueSort(b.merge(this.get(), b(t, e))));
    },
    addBack: function(t) {
      return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
    }
  }),
    b.each(
      {
        parent: function(t) {
          var e = t.parentNode;
          return e && 11 !== e.nodeType ? e : null;
        },
        parents: function(t) {
          return T(t, 'parentNode');
        },
        parentsUntil: function(t, e, n) {
          return T(t, 'parentNode', n);
        },
        next: function(t) {
          return q(t, 'nextSibling');
        },
        prev: function(t) {
          return q(t, 'previousSibling');
        },
        nextAll: function(t) {
          return T(t, 'nextSibling');
        },
        prevAll: function(t) {
          return T(t, 'previousSibling');
        },
        nextUntil: function(t, e, n) {
          return T(t, 'nextSibling', n);
        },
        prevUntil: function(t, e, n) {
          return T(t, 'previousSibling', n);
        },
        siblings: function(t) {
          return S((t.parentNode || {}).firstChild, t);
        },
        children: function(t) {
          return S(t.firstChild);
        },
        contents: function(t) {
          return k(t, 'iframe')
            ? t.contentDocument
            : (k(t, 'template') && (t = t.content || t),
              b.merge([], t.childNodes));
        }
      },
      function(t, e) {
        b.fn[t] = function(n, r) {
          var i = b.map(this, e, n);
          return (
            'Until' !== t.slice(-5) && (r = n),
            r && 'string' == typeof r && (i = b.filter(r, i)),
            this.length > 1 &&
              (j[t] || b.uniqueSort(i), L.test(t) && i.reverse()),
            this.pushStack(i)
          );
        };
      }
    );
  var O = /[^\x20\t\r\n\f]+/g;
  function R(t) {
    return t;
  }
  function B(t) {
    throw t;
  }
  function M(t, e, n, r) {
    var i;
    try {
      t && g((i = t.promise))
        ? i
            .call(t)
            .done(e)
            .fail(n)
        : t && g((i = t.then))
        ? i.call(t, e, n)
        : e.apply(void 0, [t].slice(r));
    } catch (t) {
      n.apply(void 0, [t]);
    }
  }
  (b.Callbacks = function(t) {
    t =
      'string' == typeof t
        ? (function(t) {
            var e = {};
            return (
              b.each(t.match(O) || [], function(t, n) {
                e[n] = !0;
              }),
              e
            );
          })(t)
        : b.extend({}, t);
    var e,
      n,
      r,
      i,
      o = [],
      s = [],
      a = -1,
      l = function() {
        for (i = i || t.once, r = e = !0; s.length; a = -1)
          for (n = s.shift(); ++a < o.length; )
            !1 === o[a].apply(n[0], n[1]) &&
              t.stopOnFalse &&
              ((a = o.length), (n = !1));
        t.memory || (n = !1), (e = !1), i && (o = n ? [] : '');
      },
      u = {
        add: function() {
          return (
            o &&
              (n && !e && ((a = o.length - 1), s.push(n)),
              (function e(n) {
                b.each(n, function(n, r) {
                  g(r)
                    ? (t.unique && u.has(r)) || o.push(r)
                    : r && r.length && 'string' !== _(r) && e(r);
                });
              })(arguments),
              n && !e && l()),
            this
          );
        },
        remove: function() {
          return (
            b.each(arguments, function(t, e) {
              for (var n; (n = b.inArray(e, o, n)) > -1; )
                o.splice(n, 1), n <= a && a--;
            }),
            this
          );
        },
        has: function(t) {
          return t ? b.inArray(t, o) > -1 : o.length > 0;
        },
        empty: function() {
          return o && (o = []), this;
        },
        disable: function() {
          return (i = s = []), (o = n = ''), this;
        },
        disabled: function() {
          return !o;
        },
        lock: function() {
          return (i = s = []), n || e || (o = n = ''), this;
        },
        locked: function() {
          return !!i;
        },
        fireWith: function(t, n) {
          return (
            i ||
              ((n = [t, (n = n || []).slice ? n.slice() : n]),
              s.push(n),
              e || l()),
            this
          );
        },
        fire: function() {
          return u.fireWith(this, arguments), this;
        },
        fired: function() {
          return !!r;
        }
      };
    return u;
  }),
    b.extend({
      Deferred: function(e) {
        var n = [
            [
              'notify',
              'progress',
              b.Callbacks('memory'),
              b.Callbacks('memory'),
              2
            ],
            [
              'resolve',
              'done',
              b.Callbacks('once memory'),
              b.Callbacks('once memory'),
              0,
              'resolved'
            ],
            [
              'reject',
              'fail',
              b.Callbacks('once memory'),
              b.Callbacks('once memory'),
              1,
              'rejected'
            ]
          ],
          r = 'pending',
          i = {
            state: function() {
              return r;
            },
            always: function() {
              return o.done(arguments).fail(arguments), this;
            },
            catch: function(t) {
              return i.then(null, t);
            },
            pipe: function() {
              var t = arguments;
              return b
                .Deferred(function(e) {
                  b.each(n, function(n, r) {
                    var i = g(t[r[4]]) && t[r[4]];
                    o[r[1]](function() {
                      var t = i && i.apply(this, arguments);
                      t && g(t.promise)
                        ? t
                            .promise()
                            .progress(e.notify)
                            .done(e.resolve)
                            .fail(e.reject)
                        : e[r[0] + 'With'](this, i ? [t] : arguments);
                    });
                  }),
                    (t = null);
                })
                .promise();
            },
            then: function(e, r, i) {
              var o = 0;
              function s(e, n, r, i) {
                return function() {
                  var a = this,
                    l = arguments,
                    u = function() {
                      var t, u;
                      if (!(e < o)) {
                        if ((t = r.apply(a, l)) === n.promise())
                          throw new TypeError('Thenable self-resolution');
                        (u =
                          t &&
                          ('object' == typeof t || 'function' == typeof t) &&
                          t.then),
                          g(u)
                            ? i
                              ? u.call(t, s(o, n, R, i), s(o, n, B, i))
                              : (o++,
                                u.call(
                                  t,
                                  s(o, n, R, i),
                                  s(o, n, B, i),
                                  s(o, n, R, n.notifyWith)
                                ))
                            : (r !== R && ((a = void 0), (l = [t])),
                              (i || n.resolveWith)(a, l));
                      }
                    },
                    c = i
                      ? u
                      : function() {
                          try {
                            u();
                          } catch (t) {
                            b.Deferred.exceptionHook &&
                              b.Deferred.exceptionHook(t, c.stackTrace),
                              e + 1 >= o &&
                                (r !== B && ((a = void 0), (l = [t])),
                                n.rejectWith(a, l));
                          }
                        };
                  e
                    ? c()
                    : (b.Deferred.getStackHook &&
                        (c.stackTrace = b.Deferred.getStackHook()),
                      t.setTimeout(c));
                };
              }
              return b
                .Deferred(function(t) {
                  n[0][3].add(s(0, t, g(i) ? i : R, t.notifyWith)),
                    n[1][3].add(s(0, t, g(e) ? e : R)),
                    n[2][3].add(s(0, t, g(r) ? r : B));
                })
                .promise();
            },
            promise: function(t) {
              return null != t ? b.extend(t, i) : i;
            }
          },
          o = {};
        return (
          b.each(n, function(t, e) {
            var s = e[2],
              a = e[5];
            (i[e[1]] = s.add),
              a &&
                s.add(
                  function() {
                    r = a;
                  },
                  n[3 - t][2].disable,
                  n[3 - t][3].disable,
                  n[0][2].lock,
                  n[0][3].lock
                ),
              s.add(e[3].fire),
              (o[e[0]] = function() {
                return (
                  o[e[0] + 'With'](this === o ? void 0 : this, arguments), this
                );
              }),
              (o[e[0] + 'With'] = s.fireWith);
          }),
          i.promise(o),
          e && e.call(o, o),
          o
        );
      },
      when: function(t) {
        var e = arguments.length,
          n = e,
          r = Array(n),
          i = o.call(arguments),
          s = b.Deferred(),
          a = function(t) {
            return function(n) {
              (r[t] = this),
                (i[t] = arguments.length > 1 ? o.call(arguments) : n),
                --e || s.resolveWith(r, i);
            };
          };
        if (
          e <= 1 &&
          (M(t, s.done(a(n)).resolve, s.reject, !e),
          'pending' === s.state() || g(i[n] && i[n].then))
        )
          return s.then();
        for (; n--; ) M(i[n], a(n), s.reject);
        return s.promise();
      }
    });
  var P = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (b.Deferred.exceptionHook = function(e, n) {
    t.console &&
      t.console.warn &&
      e &&
      P.test(e.name) &&
      t.console.warn('jQuery.Deferred exception: ' + e.message, e.stack, n);
  }),
    (b.readyException = function(e) {
      t.setTimeout(function() {
        throw e;
      });
    });
  var H = b.Deferred();
  function U() {
    r.removeEventListener('DOMContentLoaded', U),
      t.removeEventListener('load', U),
      b.ready();
  }
  (b.fn.ready = function(t) {
    return (
      H.then(t).catch(function(t) {
        b.readyException(t);
      }),
      this
    );
  }),
    b.extend({
      isReady: !1,
      readyWait: 1,
      ready: function(t) {
        (!0 === t ? --b.readyWait : b.isReady) ||
          ((b.isReady = !0),
          (!0 !== t && --b.readyWait > 0) || H.resolveWith(r, [b]));
      }
    }),
    (b.ready.then = H.then),
    'complete' === r.readyState ||
    ('loading' !== r.readyState && !r.documentElement.doScroll)
      ? t.setTimeout(b.ready)
      : (r.addEventListener('DOMContentLoaded', U),
        t.addEventListener('load', U));
  var F = function(t, e, n, r, i, o, s) {
      var a = 0,
        l = t.length,
        u = null == n;
      if ('object' === _(n))
        for (a in ((i = !0), n)) F(t, e, a, n[a], !0, o, s);
      else if (
        void 0 !== r &&
        ((i = !0),
        g(r) || (s = !0),
        u &&
          (s
            ? (e.call(t, r), (e = null))
            : ((u = e),
              (e = function(t, e, n) {
                return u.call(b(t), n);
              }))),
        e)
      )
        for (; a < l; a++) e(t[a], n, s ? r : r.call(t[a], a, e(t[a], n)));
      return i ? t : u ? e.call(t) : l ? e(t[0], n) : o;
    },
    W = /^-ms-/,
    V = /-([a-z])/g;
  function z(t, e) {
    return e.toUpperCase();
  }
  function G(t) {
    return t.replace(W, 'ms-').replace(V, z);
  }
  var K = function(t) {
    return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
  };
  function Q() {
    this.expando = b.expando + Q.uid++;
  }
  (Q.uid = 1),
    (Q.prototype = {
      cache: function(t) {
        var e = t[this.expando];
        return (
          e ||
            ((e = {}),
            K(t) &&
              (t.nodeType
                ? (t[this.expando] = e)
                : Object.defineProperty(t, this.expando, {
                    value: e,
                    configurable: !0
                  }))),
          e
        );
      },
      set: function(t, e, n) {
        var r,
          i = this.cache(t);
        if ('string' == typeof e) i[G(e)] = n;
        else for (r in e) i[G(r)] = e[r];
        return i;
      },
      get: function(t, e) {
        return void 0 === e
          ? this.cache(t)
          : t[this.expando] && t[this.expando][G(e)];
      },
      access: function(t, e, n) {
        return void 0 === e || (e && 'string' == typeof e && void 0 === n)
          ? this.get(t, e)
          : (this.set(t, e, n), void 0 !== n ? n : e);
      },
      remove: function(t, e) {
        var n,
          r = t[this.expando];
        if (void 0 !== r) {
          if (void 0 !== e) {
            n = (e = Array.isArray(e)
              ? e.map(G)
              : (e = G(e)) in r
              ? [e]
              : e.match(O) || []).length;
            for (; n--; ) delete r[e[n]];
          }
          (void 0 === e || b.isEmptyObject(r)) &&
            (t.nodeType ? (t[this.expando] = void 0) : delete t[this.expando]);
        }
      },
      hasData: function(t) {
        var e = t[this.expando];
        return void 0 !== e && !b.isEmptyObject(e);
      }
    });
  var Y = new Q(),
    $ = new Q(),
    X = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    J = /[A-Z]/g;
  function Z(t, e, n) {
    var r;
    if (void 0 === n && 1 === t.nodeType)
      if (
        ((r = 'data-' + e.replace(J, '-$&').toLowerCase()),
        'string' == typeof (n = t.getAttribute(r)))
      ) {
        try {
          n = (function(t) {
            return (
              'true' === t ||
              ('false' !== t &&
                ('null' === t
                  ? null
                  : t === +t + ''
                  ? +t
                  : X.test(t)
                  ? JSON.parse(t)
                  : t))
            );
          })(n);
        } catch (t) {}
        $.set(t, e, n);
      } else n = void 0;
    return n;
  }
  b.extend({
    hasData: function(t) {
      return $.hasData(t) || Y.hasData(t);
    },
    data: function(t, e, n) {
      return $.access(t, e, n);
    },
    removeData: function(t, e) {
      $.remove(t, e);
    },
    _data: function(t, e, n) {
      return Y.access(t, e, n);
    },
    _removeData: function(t, e) {
      Y.remove(t, e);
    }
  }),
    b.fn.extend({
      data: function(t, e) {
        var n,
          r,
          i,
          o = this[0],
          s = o && o.attributes;
        if (void 0 === t) {
          if (
            this.length &&
            ((i = $.get(o)), 1 === o.nodeType && !Y.get(o, 'hasDataAttrs'))
          ) {
            for (n = s.length; n--; )
              s[n] &&
                0 === (r = s[n].name).indexOf('data-') &&
                ((r = G(r.slice(5))), Z(o, r, i[r]));
            Y.set(o, 'hasDataAttrs', !0);
          }
          return i;
        }
        return 'object' == typeof t
          ? this.each(function() {
              $.set(this, t);
            })
          : F(
              this,
              function(e) {
                var n;
                if (o && void 0 === e)
                  return void 0 !== (n = $.get(o, t))
                    ? n
                    : void 0 !== (n = Z(o, t))
                    ? n
                    : void 0;
                this.each(function() {
                  $.set(this, t, e);
                });
              },
              null,
              e,
              arguments.length > 1,
              null,
              !0
            );
      },
      removeData: function(t) {
        return this.each(function() {
          $.remove(this, t);
        });
      }
    }),
    b.extend({
      queue: function(t, e, n) {
        var r;
        if (t)
          return (
            (e = (e || 'fx') + 'queue'),
            (r = Y.get(t, e)),
            n &&
              (!r || Array.isArray(n)
                ? (r = Y.access(t, e, b.makeArray(n)))
                : r.push(n)),
            r || []
          );
      },
      dequeue: function(t, e) {
        e = e || 'fx';
        var n = b.queue(t, e),
          r = n.length,
          i = n.shift(),
          o = b._queueHooks(t, e);
        'inprogress' === i && ((i = n.shift()), r--),
          i &&
            ('fx' === e && n.unshift('inprogress'),
            delete o.stop,
            i.call(
              t,
              function() {
                b.dequeue(t, e);
              },
              o
            )),
          !r && o && o.empty.fire();
      },
      _queueHooks: function(t, e) {
        var n = e + 'queueHooks';
        return (
          Y.get(t, n) ||
          Y.access(t, n, {
            empty: b.Callbacks('once memory').add(function() {
              Y.remove(t, [e + 'queue', n]);
            })
          })
        );
      }
    }),
    b.fn.extend({
      queue: function(t, e) {
        var n = 2;
        return (
          'string' != typeof t && ((e = t), (t = 'fx'), n--),
          arguments.length < n
            ? b.queue(this[0], t)
            : void 0 === e
            ? this
            : this.each(function() {
                var n = b.queue(this, t, e);
                b._queueHooks(this, t),
                  'fx' === t && 'inprogress' !== n[0] && b.dequeue(this, t);
              })
        );
      },
      dequeue: function(t) {
        return this.each(function() {
          b.dequeue(this, t);
        });
      },
      clearQueue: function(t) {
        return this.queue(t || 'fx', []);
      },
      promise: function(t, e) {
        var n,
          r = 1,
          i = b.Deferred(),
          o = this,
          s = this.length,
          a = function() {
            --r || i.resolveWith(o, [o]);
          };
        for (
          'string' != typeof t && ((e = t), (t = void 0)), t = t || 'fx';
          s--;

        )
          (n = Y.get(o[s], t + 'queueHooks')) &&
            n.empty &&
            (r++, n.empty.add(a));
        return a(), i.promise(e);
      }
    });
  var tt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    et = new RegExp('^(?:([+-])=|)(' + tt + ')([a-z%]*)$', 'i'),
    nt = ['Top', 'Right', 'Bottom', 'Left'],
    rt = function(t, e) {
      return (
        'none' === (t = e || t).style.display ||
        ('' === t.style.display &&
          b.contains(t.ownerDocument, t) &&
          'none' === b.css(t, 'display'))
      );
    },
    it = function(t, e, n, r) {
      var i,
        o,
        s = {};
      for (o in e) (s[o] = t.style[o]), (t.style[o] = e[o]);
      for (o in ((i = n.apply(t, r || [])), e)) t.style[o] = s[o];
      return i;
    };
  function ot(t, e, n, r) {
    var i,
      o,
      s = 20,
      a = r
        ? function() {
            return r.cur();
          }
        : function() {
            return b.css(t, e, '');
          },
      l = a(),
      u = (n && n[3]) || (b.cssNumber[e] ? '' : 'px'),
      c = (b.cssNumber[e] || ('px' !== u && +l)) && et.exec(b.css(t, e));
    if (c && c[3] !== u) {
      for (l /= 2, u = u || c[3], c = +l || 1; s--; )
        b.style(t, e, c + u),
          (1 - o) * (1 - (o = a() / l || 0.5)) <= 0 && (s = 0),
          (c /= o);
      (c *= 2), b.style(t, e, c + u), (n = n || []);
    }
    return (
      n &&
        ((c = +c || +l || 0),
        (i = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
        r && ((r.unit = u), (r.start = c), (r.end = i))),
      i
    );
  }
  var st = {};
  function at(t) {
    var e,
      n = t.ownerDocument,
      r = t.nodeName,
      i = st[r];
    return (
      i ||
      ((e = n.body.appendChild(n.createElement(r))),
      (i = b.css(e, 'display')),
      e.parentNode.removeChild(e),
      'none' === i && (i = 'block'),
      (st[r] = i),
      i)
    );
  }
  function lt(t, e) {
    for (var n, r, i = [], o = 0, s = t.length; o < s; o++)
      (r = t[o]).style &&
        ((n = r.style.display),
        e
          ? ('none' === n &&
              ((i[o] = Y.get(r, 'display') || null),
              i[o] || (r.style.display = '')),
            '' === r.style.display && rt(r) && (i[o] = at(r)))
          : 'none' !== n && ((i[o] = 'none'), Y.set(r, 'display', n)));
    for (o = 0; o < s; o++) null != i[o] && (t[o].style.display = i[o]);
    return t;
  }
  b.fn.extend({
    show: function() {
      return lt(this, !0);
    },
    hide: function() {
      return lt(this);
    },
    toggle: function(t) {
      return 'boolean' == typeof t
        ? t
          ? this.show()
          : this.hide()
        : this.each(function() {
            rt(this) ? b(this).show() : b(this).hide();
          });
    }
  });
  var ut = /^(?:checkbox|radio)$/i,
    ct = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
    ht = /^$|^module$|\/(?:java|ecma)script/i,
    ft = {
      option: [1, "<select multiple='multiple'>", '</select>'],
      thead: [1, '<table>', '</table>'],
      col: [2, '<table><colgroup>', '</colgroup></table>'],
      tr: [2, '<table><tbody>', '</tbody></table>'],
      td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
      _default: [0, '', '']
    };
  function dt(t, e) {
    var n;
    return (
      (n =
        'undefined' != typeof t.getElementsByTagName
          ? t.getElementsByTagName(e || '*')
          : 'undefined' != typeof t.querySelectorAll
          ? t.querySelectorAll(e || '*')
          : []),
      void 0 === e || (e && k(t, e)) ? b.merge([t], n) : n
    );
  }
  function pt(t, e) {
    for (var n = 0, r = t.length; n < r; n++)
      Y.set(t[n], 'globalEval', !e || Y.get(e[n], 'globalEval'));
  }
  (ft.optgroup = ft.option),
    (ft.tbody = ft.tfoot = ft.colgroup = ft.caption = ft.thead),
    (ft.th = ft.td);
  var gt,
    mt,
    vt = /<|&#?\w+;/;
  function yt(t, e, n, r, i) {
    for (
      var o,
        s,
        a,
        l,
        u,
        c,
        h = e.createDocumentFragment(),
        f = [],
        d = 0,
        p = t.length;
      d < p;
      d++
    )
      if ((o = t[d]) || 0 === o)
        if ('object' === _(o)) b.merge(f, o.nodeType ? [o] : o);
        else if (vt.test(o)) {
          for (
            s = s || h.appendChild(e.createElement('div')),
              a = (ct.exec(o) || ['', ''])[1].toLowerCase(),
              l = ft[a] || ft._default,
              s.innerHTML = l[1] + b.htmlPrefilter(o) + l[2],
              c = l[0];
            c--;

          )
            s = s.lastChild;
          b.merge(f, s.childNodes), ((s = h.firstChild).textContent = '');
        } else f.push(e.createTextNode(o));
    for (h.textContent = '', d = 0; (o = f[d++]); )
      if (r && b.inArray(o, r) > -1) i && i.push(o);
      else if (
        ((u = b.contains(o.ownerDocument, o)),
        (s = dt(h.appendChild(o), 'script')),
        u && pt(s),
        n)
      )
        for (c = 0; (o = s[c++]); ) ht.test(o.type || '') && n.push(o);
    return h;
  }
  (gt = r.createDocumentFragment().appendChild(r.createElement('div'))),
    (mt = r.createElement('input')).setAttribute('type', 'radio'),
    mt.setAttribute('checked', 'checked'),
    mt.setAttribute('name', 't'),
    gt.appendChild(mt),
    (p.checkClone = gt.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (gt.innerHTML = '<textarea>x</textarea>'),
    (p.noCloneChecked = !!gt.cloneNode(!0).lastChild.defaultValue);
  var _t = r.documentElement,
    bt = /^key/,
    wt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    xt = /^([^.]*)(?:\.(.+)|)/;
  function Et() {
    return !0;
  }
  function Tt() {
    return !1;
  }
  function St() {
    try {
      return r.activeElement;
    } catch (t) {}
  }
  function Ct(t, e, n, r, i, o) {
    var s, a;
    if ('object' == typeof e) {
      for (a in ('string' != typeof n && ((r = r || n), (n = void 0)), e))
        Ct(t, a, n, r, e[a], o);
      return t;
    }
    if (
      (null == r && null == i
        ? ((i = n), (r = n = void 0))
        : null == i &&
          ('string' == typeof n
            ? ((i = r), (r = void 0))
            : ((i = r), (r = n), (n = void 0))),
      !1 === i)
    )
      i = Tt;
    else if (!i) return t;
    return (
      1 === o &&
        ((s = i),
        ((i = function(t) {
          return b().off(t), s.apply(this, arguments);
        }).guid = s.guid || (s.guid = b.guid++))),
      t.each(function() {
        b.event.add(this, e, i, r, n);
      })
    );
  }
  (b.event = {
    global: {},
    add: function(t, e, n, r, i) {
      var o,
        s,
        a,
        l,
        u,
        c,
        h,
        f,
        d,
        p,
        g,
        m = Y.get(t);
      if (m)
        for (
          n.handler && ((n = (o = n).handler), (i = o.selector)),
            i && b.find.matchesSelector(_t, i),
            n.guid || (n.guid = b.guid++),
            (l = m.events) || (l = m.events = {}),
            (s = m.handle) ||
              (s = m.handle = function(e) {
                return 'undefined' != typeof b && b.event.triggered !== e.type
                  ? b.event.dispatch.apply(t, arguments)
                  : void 0;
              }),
            u = (e = (e || '').match(O) || ['']).length;
          u--;

        )
          (d = g = (a = xt.exec(e[u]) || [])[1]),
            (p = (a[2] || '').split('.').sort()),
            d &&
              ((h = b.event.special[d] || {}),
              (d = (i ? h.delegateType : h.bindType) || d),
              (h = b.event.special[d] || {}),
              (c = b.extend(
                {
                  type: d,
                  origType: g,
                  data: r,
                  handler: n,
                  guid: n.guid,
                  selector: i,
                  needsContext: i && b.expr.match.needsContext.test(i),
                  namespace: p.join('.')
                },
                o
              )),
              (f = l[d]) ||
                (((f = l[d] = []).delegateCount = 0),
                (h.setup && !1 !== h.setup.call(t, r, p, s)) ||
                  (t.addEventListener && t.addEventListener(d, s))),
              h.add &&
                (h.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)),
              i ? f.splice(f.delegateCount++, 0, c) : f.push(c),
              (b.event.global[d] = !0));
    },
    remove: function(t, e, n, r, i) {
      var o,
        s,
        a,
        l,
        u,
        c,
        h,
        f,
        d,
        p,
        g,
        m = Y.hasData(t) && Y.get(t);
      if (m && (l = m.events)) {
        for (u = (e = (e || '').match(O) || ['']).length; u--; )
          if (
            ((d = g = (a = xt.exec(e[u]) || [])[1]),
            (p = (a[2] || '').split('.').sort()),
            d)
          ) {
            for (
              h = b.event.special[d] || {},
                f = l[(d = (r ? h.delegateType : h.bindType) || d)] || [],
                a =
                  a[2] &&
                  new RegExp('(^|\\.)' + p.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                s = o = f.length;
              o--;

            )
              (c = f[o]),
                (!i && g !== c.origType) ||
                  (n && n.guid !== c.guid) ||
                  (a && !a.test(c.namespace)) ||
                  (r && r !== c.selector && ('**' !== r || !c.selector)) ||
                  (f.splice(o, 1),
                  c.selector && f.delegateCount--,
                  h.remove && h.remove.call(t, c));
            s &&
              !f.length &&
              ((h.teardown && !1 !== h.teardown.call(t, p, m.handle)) ||
                b.removeEvent(t, d, m.handle),
              delete l[d]);
          } else for (d in l) b.event.remove(t, d + e[u], n, r, !0);
        b.isEmptyObject(l) && Y.remove(t, 'handle events');
      }
    },
    dispatch: function(t) {
      var e,
        n,
        r,
        i,
        o,
        s,
        a = b.event.fix(t),
        l = new Array(arguments.length),
        u = (Y.get(this, 'events') || {})[a.type] || [],
        c = b.event.special[a.type] || {};
      for (l[0] = a, e = 1; e < arguments.length; e++) l[e] = arguments[e];
      if (
        ((a.delegateTarget = this),
        !c.preDispatch || !1 !== c.preDispatch.call(this, a))
      ) {
        for (
          s = b.event.handlers.call(this, a, u), e = 0;
          (i = s[e++]) && !a.isPropagationStopped();

        )
          for (
            a.currentTarget = i.elem, n = 0;
            (o = i.handlers[n++]) && !a.isImmediatePropagationStopped();

          )
            (a.rnamespace && !a.rnamespace.test(o.namespace)) ||
              ((a.handleObj = o),
              (a.data = o.data),
              void 0 !==
                (r = (
                  (b.event.special[o.origType] || {}).handle || o.handler
                ).apply(i.elem, l)) &&
                !1 === (a.result = r) &&
                (a.preventDefault(), a.stopPropagation()));
        return c.postDispatch && c.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function(t, e) {
      var n,
        r,
        i,
        o,
        s,
        a = [],
        l = e.delegateCount,
        u = t.target;
      if (l && u.nodeType && !('click' === t.type && t.button >= 1))
        for (; u !== this; u = u.parentNode || this)
          if (1 === u.nodeType && ('click' !== t.type || !0 !== u.disabled)) {
            for (o = [], s = {}, n = 0; n < l; n++)
              void 0 === s[(i = (r = e[n]).selector + ' ')] &&
                (s[i] = r.needsContext
                  ? b(i, this).index(u) > -1
                  : b.find(i, this, null, [u]).length),
                s[i] && o.push(r);
            o.length && a.push({ elem: u, handlers: o });
          }
      return (
        (u = this), l < e.length && a.push({ elem: u, handlers: e.slice(l) }), a
      );
    },
    addProp: function(t, e) {
      Object.defineProperty(b.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: g(e)
          ? function() {
              if (this.originalEvent) return e(this.originalEvent);
            }
          : function() {
              if (this.originalEvent) return this.originalEvent[t];
            },
        set: function(e) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e
          });
        }
      });
    },
    fix: function(t) {
      return t[b.expando] ? t : new b.Event(t);
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function() {
          if (this !== St() && this.focus) return this.focus(), !1;
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function() {
          if (this === St() && this.blur) return this.blur(), !1;
        },
        delegateType: 'focusout'
      },
      click: {
        trigger: function() {
          if ('checkbox' === this.type && this.click && k(this, 'input'))
            return this.click(), !1;
        },
        _default: function(t) {
          return k(t.target, 'a');
        }
      },
      beforeunload: {
        postDispatch: function(t) {
          void 0 !== t.result &&
            t.originalEvent &&
            (t.originalEvent.returnValue = t.result);
        }
      }
    }
  }),
    (b.removeEvent = function(t, e, n) {
      t.removeEventListener && t.removeEventListener(e, n);
    }),
    (b.Event = function(t, e) {
      if (!(this instanceof b.Event)) return new b.Event(t, e);
      t && t.type
        ? ((this.originalEvent = t),
          (this.type = t.type),
          (this.isDefaultPrevented =
            t.defaultPrevented ||
            (void 0 === t.defaultPrevented && !1 === t.returnValue)
              ? Et
              : Tt),
          (this.target =
            t.target && 3 === t.target.nodeType
              ? t.target.parentNode
              : t.target),
          (this.currentTarget = t.currentTarget),
          (this.relatedTarget = t.relatedTarget))
        : (this.type = t),
        e && b.extend(this, e),
        (this.timeStamp = (t && t.timeStamp) || Date.now()),
        (this[b.expando] = !0);
    }),
    (b.Event.prototype = {
      constructor: b.Event,
      isDefaultPrevented: Tt,
      isPropagationStopped: Tt,
      isImmediatePropagationStopped: Tt,
      isSimulated: !1,
      preventDefault: function() {
        var t = this.originalEvent;
        (this.isDefaultPrevented = Et),
          t && !this.isSimulated && t.preventDefault();
      },
      stopPropagation: function() {
        var t = this.originalEvent;
        (this.isPropagationStopped = Et),
          t && !this.isSimulated && t.stopPropagation();
      },
      stopImmediatePropagation: function() {
        var t = this.originalEvent;
        (this.isImmediatePropagationStopped = Et),
          t && !this.isSimulated && t.stopImmediatePropagation(),
          this.stopPropagation();
      }
    }),
    b.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(t) {
          var e = t.button;
          return null == t.which && bt.test(t.type)
            ? null != t.charCode
              ? t.charCode
              : t.keyCode
            : !t.which && void 0 !== e && wt.test(t.type)
            ? 1 & e
              ? 1
              : 2 & e
              ? 3
              : 4 & e
              ? 2
              : 0
            : t.which;
        }
      },
      b.event.addProp
    ),
    b.each(
      {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        pointerenter: 'pointerover',
        pointerleave: 'pointerout'
      },
      function(t, e) {
        b.event.special[t] = {
          delegateType: e,
          bindType: e,
          handle: function(t) {
            var n,
              r = t.relatedTarget,
              i = t.handleObj;
            return (
              (r && (r === this || b.contains(this, r))) ||
                ((t.type = i.origType),
                (n = i.handler.apply(this, arguments)),
                (t.type = e)),
              n
            );
          }
        };
      }
    ),
    b.fn.extend({
      on: function(t, e, n, r) {
        return Ct(this, t, e, n, r);
      },
      one: function(t, e, n, r) {
        return Ct(this, t, e, n, r, 1);
      },
      off: function(t, e, n) {
        var r, i;
        if (t && t.preventDefault && t.handleObj)
          return (
            (r = t.handleObj),
            b(t.delegateTarget).off(
              r.namespace ? r.origType + '.' + r.namespace : r.origType,
              r.selector,
              r.handler
            ),
            this
          );
        if ('object' == typeof t) {
          for (i in t) this.off(i, e, t[i]);
          return this;
        }
        return (
          (!1 !== e && 'function' != typeof e) || ((n = e), (e = void 0)),
          !1 === n && (n = Tt),
          this.each(function() {
            b.event.remove(this, t, n, e);
          })
        );
      }
    });
  var kt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
    At = /<script|<style|<link/i,
    Dt = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Nt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function It(t, e) {
    return (
      (k(t, 'table') &&
        k(11 !== e.nodeType ? e : e.firstChild, 'tr') &&
        b(t).children('tbody')[0]) ||
      t
    );
  }
  function Lt(t) {
    return (t.type = (null !== t.getAttribute('type')) + '/' + t.type), t;
  }
  function jt(t) {
    return (
      'true/' === (t.type || '').slice(0, 5)
        ? (t.type = t.type.slice(5))
        : t.removeAttribute('type'),
      t
    );
  }
  function qt(t, e) {
    var n, r, i, o, s, a, l, u;
    if (1 === e.nodeType) {
      if (
        Y.hasData(t) &&
        ((o = Y.access(t)), (s = Y.set(e, o)), (u = o.events))
      )
        for (i in (delete s.handle, (s.events = {}), u))
          for (n = 0, r = u[i].length; n < r; n++) b.event.add(e, i, u[i][n]);
      $.hasData(t) && ((a = $.access(t)), (l = b.extend({}, a)), $.set(e, l));
    }
  }
  function Ot(t, e, n, r) {
    e = s.apply([], e);
    var i,
      o,
      a,
      l,
      u,
      c,
      h = 0,
      f = t.length,
      d = f - 1,
      m = e[0],
      v = g(m);
    if (v || (f > 1 && 'string' == typeof m && !p.checkClone && Dt.test(m)))
      return t.each(function(i) {
        var o = t.eq(i);
        v && (e[0] = m.call(this, i, o.html())), Ot(o, e, n, r);
      });
    if (
      f &&
      ((o = (i = yt(e, t[0].ownerDocument, !1, t, r)).firstChild),
      1 === i.childNodes.length && (i = o),
      o || r)
    ) {
      for (l = (a = b.map(dt(i, 'script'), Lt)).length; h < f; h++)
        (u = i),
          h !== d &&
            ((u = b.clone(u, !0, !0)), l && b.merge(a, dt(u, 'script'))),
          n.call(t[h], u, h);
      if (l)
        for (c = a[a.length - 1].ownerDocument, b.map(a, jt), h = 0; h < l; h++)
          (u = a[h]),
            ht.test(u.type || '') &&
              !Y.access(u, 'globalEval') &&
              b.contains(c, u) &&
              (u.src && 'module' !== (u.type || '').toLowerCase()
                ? b._evalUrl && b._evalUrl(u.src)
                : y(u.textContent.replace(Nt, ''), c, u));
    }
    return t;
  }
  function Rt(t, e, n) {
    for (var r, i = e ? b.filter(e, t) : t, o = 0; null != (r = i[o]); o++)
      n || 1 !== r.nodeType || b.cleanData(dt(r)),
        r.parentNode &&
          (n && b.contains(r.ownerDocument, r) && pt(dt(r, 'script')),
          r.parentNode.removeChild(r));
    return t;
  }
  b.extend({
    htmlPrefilter: function(t) {
      return t.replace(kt, '<$1></$2>');
    },
    clone: function(t, e, n) {
      var r,
        i,
        o,
        s,
        a,
        l,
        u,
        c = t.cloneNode(!0),
        h = b.contains(t.ownerDocument, t);
      if (
        !(
          p.noCloneChecked ||
          (1 !== t.nodeType && 11 !== t.nodeType) ||
          b.isXMLDoc(t)
        )
      )
        for (s = dt(c), r = 0, i = (o = dt(t)).length; r < i; r++)
          (a = o[r]),
            (l = s[r]),
            void 0,
            'input' === (u = l.nodeName.toLowerCase()) && ut.test(a.type)
              ? (l.checked = a.checked)
              : ('input' !== u && 'textarea' !== u) ||
                (l.defaultValue = a.defaultValue);
      if (e)
        if (n)
          for (o = o || dt(t), s = s || dt(c), r = 0, i = o.length; r < i; r++)
            qt(o[r], s[r]);
        else qt(t, c);
      return (
        (s = dt(c, 'script')).length > 0 && pt(s, !h && dt(t, 'script')), c
      );
    },
    cleanData: function(t) {
      for (var e, n, r, i = b.event.special, o = 0; void 0 !== (n = t[o]); o++)
        if (K(n)) {
          if ((e = n[Y.expando])) {
            if (e.events)
              for (r in e.events)
                i[r] ? b.event.remove(n, r) : b.removeEvent(n, r, e.handle);
            n[Y.expando] = void 0;
          }
          n[$.expando] && (n[$.expando] = void 0);
        }
    }
  }),
    b.fn.extend({
      detach: function(t) {
        return Rt(this, t, !0);
      },
      remove: function(t) {
        return Rt(this, t);
      },
      text: function(t) {
        return F(
          this,
          function(t) {
            return void 0 === t
              ? b.text(this)
              : this.empty().each(function() {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    (this.textContent = t);
                });
          },
          null,
          t,
          arguments.length
        );
      },
      append: function() {
        return Ot(this, arguments, function(t) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            It(this, t).appendChild(t);
        });
      },
      prepend: function() {
        return Ot(this, arguments, function(t) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var e = It(this, t);
            e.insertBefore(t, e.firstChild);
          }
        });
      },
      before: function() {
        return Ot(this, arguments, function(t) {
          this.parentNode && this.parentNode.insertBefore(t, this);
        });
      },
      after: function() {
        return Ot(this, arguments, function(t) {
          this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
        });
      },
      empty: function() {
        for (var t, e = 0; null != (t = this[e]); e++)
          1 === t.nodeType && (b.cleanData(dt(t, !1)), (t.textContent = ''));
        return this;
      },
      clone: function(t, e) {
        return (
          (t = null != t && t),
          (e = null == e ? t : e),
          this.map(function() {
            return b.clone(this, t, e);
          })
        );
      },
      html: function(t) {
        return F(
          this,
          function(t) {
            var e = this[0] || {},
              n = 0,
              r = this.length;
            if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
            if (
              'string' == typeof t &&
              !At.test(t) &&
              !ft[(ct.exec(t) || ['', ''])[1].toLowerCase()]
            ) {
              t = b.htmlPrefilter(t);
              try {
                for (; n < r; n++)
                  1 === (e = this[n] || {}).nodeType &&
                    (b.cleanData(dt(e, !1)), (e.innerHTML = t));
                e = 0;
              } catch (t) {}
            }
            e && this.empty().append(t);
          },
          null,
          t,
          arguments.length
        );
      },
      replaceWith: function() {
        var t = [];
        return Ot(
          this,
          arguments,
          function(e) {
            var n = this.parentNode;
            b.inArray(this, t) < 0 &&
              (b.cleanData(dt(this)), n && n.replaceChild(e, this));
          },
          t
        );
      }
    }),
    b.each(
      {
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith'
      },
      function(t, e) {
        b.fn[t] = function(t) {
          for (var n, r = [], i = b(t), o = i.length - 1, s = 0; s <= o; s++)
            (n = s === o ? this : this.clone(!0)),
              b(i[s])[e](n),
              a.apply(r, n.get());
          return this.pushStack(r);
        };
      }
    );
  var Bt = new RegExp('^(' + tt + ')(?!px)[a-z%]+$', 'i'),
    Mt = function(e) {
      var n = e.ownerDocument.defaultView;
      return (n && n.opener) || (n = t), n.getComputedStyle(e);
    },
    Pt = new RegExp(nt.join('|'), 'i');
  function Ht(t, e, n) {
    var r,
      i,
      o,
      s,
      a = t.style;
    return (
      (n = n || Mt(t)) &&
        ('' !== (s = n.getPropertyValue(e) || n[e]) ||
          b.contains(t.ownerDocument, t) ||
          (s = b.style(t, e)),
        !p.pixelBoxStyles() &&
          Bt.test(s) &&
          Pt.test(e) &&
          ((r = a.width),
          (i = a.minWidth),
          (o = a.maxWidth),
          (a.minWidth = a.maxWidth = a.width = s),
          (s = n.width),
          (a.width = r),
          (a.minWidth = i),
          (a.maxWidth = o))),
      void 0 !== s ? s + '' : s
    );
  }
  function Ut(t, e) {
    return {
      get: function() {
        if (!t()) return (this.get = e).apply(this, arguments);
        delete this.get;
      }
    };
  }
  !(function() {
    function e() {
      if (c) {
        (u.style.cssText =
          'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
          (c.style.cssText =
            'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
          _t.appendChild(u).appendChild(c);
        var e = t.getComputedStyle(c);
        (i = '1%' !== e.top),
          (l = 12 === n(e.marginLeft)),
          (c.style.right = '60%'),
          (a = 36 === n(e.right)),
          (o = 36 === n(e.width)),
          (c.style.position = 'absolute'),
          (s = 36 === c.offsetWidth || 'absolute'),
          _t.removeChild(u),
          (c = null);
      }
    }
    function n(t) {
      return Math.round(parseFloat(t));
    }
    var i,
      o,
      s,
      a,
      l,
      u = r.createElement('div'),
      c = r.createElement('div');
    c.style &&
      ((c.style.backgroundClip = 'content-box'),
      (c.cloneNode(!0).style.backgroundClip = ''),
      (p.clearCloneStyle = 'content-box' === c.style.backgroundClip),
      b.extend(p, {
        boxSizingReliable: function() {
          return e(), o;
        },
        pixelBoxStyles: function() {
          return e(), a;
        },
        pixelPosition: function() {
          return e(), i;
        },
        reliableMarginLeft: function() {
          return e(), l;
        },
        scrollboxSize: function() {
          return e(), s;
        }
      }));
  })();
  var Ft = /^(none|table(?!-c[ea]).+)/,
    Wt = /^--/,
    Vt = { position: 'absolute', visibility: 'hidden', display: 'block' },
    zt = { letterSpacing: '0', fontWeight: '400' },
    Gt = ['Webkit', 'Moz', 'ms'],
    Kt = r.createElement('div').style;
  function Qt(t) {
    var e = b.cssProps[t];
    return (
      e ||
        (e = b.cssProps[t] =
          (function(t) {
            if (t in Kt) return t;
            for (var e = t[0].toUpperCase() + t.slice(1), n = Gt.length; n--; )
              if ((t = Gt[n] + e) in Kt) return t;
          })(t) || t),
      e
    );
  }
  function Yt(t, e, n) {
    var r = et.exec(e);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || 'px') : e;
  }
  function $t(t, e, n, r, i, o) {
    var s = 'width' === e ? 1 : 0,
      a = 0,
      l = 0;
    if (n === (r ? 'border' : 'content')) return 0;
    for (; s < 4; s += 2)
      'margin' === n && (l += b.css(t, n + nt[s], !0, i)),
        r
          ? ('content' === n && (l -= b.css(t, 'padding' + nt[s], !0, i)),
            'margin' !== n &&
              (l -= b.css(t, 'border' + nt[s] + 'Width', !0, i)))
          : ((l += b.css(t, 'padding' + nt[s], !0, i)),
            'padding' !== n
              ? (l += b.css(t, 'border' + nt[s] + 'Width', !0, i))
              : (a += b.css(t, 'border' + nt[s] + 'Width', !0, i)));
    return (
      !r &&
        o >= 0 &&
        (l += Math.max(
          0,
          Math.ceil(
            t['offset' + e[0].toUpperCase() + e.slice(1)] - o - l - a - 0.5
          )
        )),
      l
    );
  }
  function Xt(t, e, n) {
    var r = Mt(t),
      i = Ht(t, e, r),
      o = 'border-box' === b.css(t, 'boxSizing', !1, r),
      s = o;
    if (Bt.test(i)) {
      if (!n) return i;
      i = 'auto';
    }
    return (
      (s = s && (p.boxSizingReliable() || i === t.style[e])),
      ('auto' === i ||
        (!parseFloat(i) && 'inline' === b.css(t, 'display', !1, r))) &&
        ((i = t['offset' + e[0].toUpperCase() + e.slice(1)]), (s = !0)),
      (i = parseFloat(i) || 0) +
        $t(t, e, n || (o ? 'border' : 'content'), s, r, i) +
        'px'
    );
  }
  function Jt(t, e, n, r, i) {
    return new Jt.prototype.init(t, e, n, r, i);
  }
  b.extend({
    cssHooks: {
      opacity: {
        get: function(t, e) {
          if (e) {
            var n = Ht(t, 'opacity');
            return '' === n ? '1' : n;
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {},
    style: function(t, e, n, r) {
      if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
        var i,
          o,
          s,
          a = G(e),
          l = Wt.test(e),
          u = t.style;
        if (
          (l || (e = Qt(a)), (s = b.cssHooks[e] || b.cssHooks[a]), void 0 === n)
        )
          return s && 'get' in s && void 0 !== (i = s.get(t, !1, r)) ? i : u[e];
        'string' === (o = typeof n) &&
          (i = et.exec(n)) &&
          i[1] &&
          ((n = ot(t, e, i)), (o = 'number')),
          null != n &&
            n == n &&
            ('number' === o &&
              (n += (i && i[3]) || (b.cssNumber[a] ? '' : 'px')),
            p.clearCloneStyle ||
              '' !== n ||
              0 !== e.indexOf('background') ||
              (u[e] = 'inherit'),
            (s && 'set' in s && void 0 === (n = s.set(t, n, r))) ||
              (l ? u.setProperty(e, n) : (u[e] = n)));
      }
    },
    css: function(t, e, n, r) {
      var i,
        o,
        s,
        a = G(e);
      return (
        Wt.test(e) || (e = Qt(a)),
        (s = b.cssHooks[e] || b.cssHooks[a]) &&
          'get' in s &&
          (i = s.get(t, !0, n)),
        void 0 === i && (i = Ht(t, e, r)),
        'normal' === i && e in zt && (i = zt[e]),
        '' === n || n
          ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
          : i
      );
    }
  }),
    b.each(['height', 'width'], function(t, e) {
      b.cssHooks[e] = {
        get: function(t, n, r) {
          if (n)
            return !Ft.test(b.css(t, 'display')) ||
              (t.getClientRects().length && t.getBoundingClientRect().width)
              ? Xt(t, e, r)
              : it(t, Vt, function() {
                  return Xt(t, e, r);
                });
        },
        set: function(t, n, r) {
          var i,
            o = Mt(t),
            s = 'border-box' === b.css(t, 'boxSizing', !1, o),
            a = r && $t(t, e, r, s, o);
          return (
            s &&
              p.scrollboxSize() === o.position &&
              (a -= Math.ceil(
                t['offset' + e[0].toUpperCase() + e.slice(1)] -
                  parseFloat(o[e]) -
                  $t(t, e, 'border', !1, o) -
                  0.5
              )),
            a &&
              (i = et.exec(n)) &&
              'px' !== (i[3] || 'px') &&
              ((t.style[e] = n), (n = b.css(t, e))),
            Yt(0, n, a)
          );
        }
      };
    }),
    (b.cssHooks.marginLeft = Ut(p.reliableMarginLeft, function(t, e) {
      if (e)
        return (
          (parseFloat(Ht(t, 'marginLeft')) ||
            t.getBoundingClientRect().left -
              it(t, { marginLeft: 0 }, function() {
                return t.getBoundingClientRect().left;
              })) + 'px'
        );
    })),
    b.each({ margin: '', padding: '', border: 'Width' }, function(t, e) {
      (b.cssHooks[t + e] = {
        expand: function(n) {
          for (
            var r = 0, i = {}, o = 'string' == typeof n ? n.split(' ') : [n];
            r < 4;
            r++
          )
            i[t + nt[r] + e] = o[r] || o[r - 2] || o[0];
          return i;
        }
      }),
        'margin' !== t && (b.cssHooks[t + e].set = Yt);
    }),
    b.fn.extend({
      css: function(t, e) {
        return F(
          this,
          function(t, e, n) {
            var r,
              i,
              o = {},
              s = 0;
            if (Array.isArray(e)) {
              for (r = Mt(t), i = e.length; s < i; s++)
                o[e[s]] = b.css(t, e[s], !1, r);
              return o;
            }
            return void 0 !== n ? b.style(t, e, n) : b.css(t, e);
          },
          t,
          e,
          arguments.length > 1
        );
      }
    }),
    (b.Tween = Jt),
    (Jt.prototype = {
      constructor: Jt,
      init: function(t, e, n, r, i, o) {
        (this.elem = t),
          (this.prop = n),
          (this.easing = i || b.easing._default),
          (this.options = e),
          (this.start = this.now = this.cur()),
          (this.end = r),
          (this.unit = o || (b.cssNumber[n] ? '' : 'px'));
      },
      cur: function() {
        var t = Jt.propHooks[this.prop];
        return t && t.get ? t.get(this) : Jt.propHooks._default.get(this);
      },
      run: function(t) {
        var e,
          n = Jt.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = e = b.easing[this.easing](
                t,
                this.options.duration * t,
                0,
                1,
                this.options.duration
              ))
            : (this.pos = e = t),
          (this.now = (this.end - this.start) * e + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : Jt.propHooks._default.set(this),
          this
        );
      }
    }),
    (Jt.prototype.init.prototype = Jt.prototype),
    (Jt.propHooks = {
      _default: {
        get: function(t) {
          var e;
          return 1 !== t.elem.nodeType ||
            (null != t.elem[t.prop] && null == t.elem.style[t.prop])
            ? t.elem[t.prop]
            : (e = b.css(t.elem, t.prop, '')) && 'auto' !== e
            ? e
            : 0;
        },
        set: function(t) {
          b.fx.step[t.prop]
            ? b.fx.step[t.prop](t)
            : 1 !== t.elem.nodeType ||
              (null == t.elem.style[b.cssProps[t.prop]] && !b.cssHooks[t.prop])
            ? (t.elem[t.prop] = t.now)
            : b.style(t.elem, t.prop, t.now + t.unit);
        }
      }
    }),
    (Jt.propHooks.scrollTop = Jt.propHooks.scrollLeft = {
      set: function(t) {
        t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
      }
    }),
    (b.easing = {
      linear: function(t) {
        return t;
      },
      swing: function(t) {
        return 0.5 - Math.cos(t * Math.PI) / 2;
      },
      _default: 'swing'
    }),
    (b.fx = Jt.prototype.init),
    (b.fx.step = {});
  var Zt,
    te,
    ee = /^(?:toggle|show|hide)$/,
    ne = /queueHooks$/;
  function re() {
    te &&
      (!1 === r.hidden && t.requestAnimationFrame
        ? t.requestAnimationFrame(re)
        : t.setTimeout(re, b.fx.interval),
      b.fx.tick());
  }
  function ie() {
    return (
      t.setTimeout(function() {
        Zt = void 0;
      }),
      (Zt = Date.now())
    );
  }
  function oe(t, e) {
    var n,
      r = 0,
      i = { height: t };
    for (e = e ? 1 : 0; r < 4; r += 2 - e)
      i['margin' + (n = nt[r])] = i['padding' + n] = t;
    return e && (i.opacity = i.width = t), i;
  }
  function se(t, e, n) {
    for (
      var r,
        i = (ae.tweeners[e] || []).concat(ae.tweeners['*']),
        o = 0,
        s = i.length;
      o < s;
      o++
    )
      if ((r = i[o].call(n, e, t))) return r;
  }
  function ae(t, e, n) {
    var r,
      i,
      o = 0,
      s = ae.prefilters.length,
      a = b.Deferred().always(function() {
        delete l.elem;
      }),
      l = function() {
        if (i) return !1;
        for (
          var e = Zt || ie(),
            n = Math.max(0, u.startTime + u.duration - e),
            r = 1 - (n / u.duration || 0),
            o = 0,
            s = u.tweens.length;
          o < s;
          o++
        )
          u.tweens[o].run(r);
        return (
          a.notifyWith(t, [u, r, n]),
          r < 1 && s
            ? n
            : (s || a.notifyWith(t, [u, 1, 0]), a.resolveWith(t, [u]), !1)
        );
      },
      u = a.promise({
        elem: t,
        props: b.extend({}, e),
        opts: b.extend(!0, { specialEasing: {}, easing: b.easing._default }, n),
        originalProperties: e,
        originalOptions: n,
        startTime: Zt || ie(),
        duration: n.duration,
        tweens: [],
        createTween: function(e, n) {
          var r = b.Tween(
            t,
            u.opts,
            e,
            n,
            u.opts.specialEasing[e] || u.opts.easing
          );
          return u.tweens.push(r), r;
        },
        stop: function(e) {
          var n = 0,
            r = e ? u.tweens.length : 0;
          if (i) return this;
          for (i = !0; n < r; n++) u.tweens[n].run(1);
          return (
            e
              ? (a.notifyWith(t, [u, 1, 0]), a.resolveWith(t, [u, e]))
              : a.rejectWith(t, [u, e]),
            this
          );
        }
      }),
      c = u.props;
    for (
      !(function(t, e) {
        var n, r, i, o, s;
        for (n in t)
          if (
            ((i = e[(r = G(n))]),
            (o = t[n]),
            Array.isArray(o) && ((i = o[1]), (o = t[n] = o[0])),
            n !== r && ((t[r] = o), delete t[n]),
            (s = b.cssHooks[r]) && ('expand' in s))
          )
            for (n in ((o = s.expand(o)), delete t[r], o))
              (n in t) || ((t[n] = o[n]), (e[n] = i));
          else e[r] = i;
      })(c, u.opts.specialEasing);
      o < s;
      o++
    )
      if ((r = ae.prefilters[o].call(u, t, c, u.opts)))
        return (
          g(r.stop) &&
            (b._queueHooks(u.elem, u.opts.queue).stop = r.stop.bind(r)),
          r
        );
    return (
      b.map(c, se, u),
      g(u.opts.start) && u.opts.start.call(t, u),
      u
        .progress(u.opts.progress)
        .done(u.opts.done, u.opts.complete)
        .fail(u.opts.fail)
        .always(u.opts.always),
      b.fx.timer(b.extend(l, { elem: t, anim: u, queue: u.opts.queue })),
      u
    );
  }
  (b.Animation = b.extend(ae, {
    tweeners: {
      '*': [
        function(t, e) {
          var n = this.createTween(t, e);
          return ot(n.elem, t, et.exec(e), n), n;
        }
      ]
    },
    tweener: function(t, e) {
      g(t) ? ((e = t), (t = ['*'])) : (t = t.match(O));
      for (var n, r = 0, i = t.length; r < i; r++)
        (n = t[r]),
          (ae.tweeners[n] = ae.tweeners[n] || []),
          ae.tweeners[n].unshift(e);
    },
    prefilters: [
      function(t, e, n) {
        var r,
          i,
          o,
          s,
          a,
          l,
          u,
          c,
          h = 'width' in e || 'height' in e,
          f = this,
          d = {},
          p = t.style,
          g = t.nodeType && rt(t),
          m = Y.get(t, 'fxshow');
        for (r in (n.queue ||
          (null == (s = b._queueHooks(t, 'fx')).unqueued &&
            ((s.unqueued = 0),
            (a = s.empty.fire),
            (s.empty.fire = function() {
              s.unqueued || a();
            })),
          s.unqueued++,
          f.always(function() {
            f.always(function() {
              s.unqueued--, b.queue(t, 'fx').length || s.empty.fire();
            });
          })),
        e))
          if (((i = e[r]), ee.test(i))) {
            if (
              (delete e[r],
              (o = o || 'toggle' === i),
              i === (g ? 'hide' : 'show'))
            ) {
              if ('show' !== i || !m || void 0 === m[r]) continue;
              g = !0;
            }
            d[r] = (m && m[r]) || b.style(t, r);
          }
        if ((l = !b.isEmptyObject(e)) || !b.isEmptyObject(d))
          for (r in (h &&
            1 === t.nodeType &&
            ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
            null == (u = m && m.display) && (u = Y.get(t, 'display')),
            'none' === (c = b.css(t, 'display')) &&
              (u
                ? (c = u)
                : (lt([t], !0),
                  (u = t.style.display || u),
                  (c = b.css(t, 'display')),
                  lt([t]))),
            ('inline' === c || ('inline-block' === c && null != u)) &&
              'none' === b.css(t, 'float') &&
              (l ||
                (f.done(function() {
                  p.display = u;
                }),
                null == u && ((c = p.display), (u = 'none' === c ? '' : c))),
              (p.display = 'inline-block'))),
          n.overflow &&
            ((p.overflow = 'hidden'),
            f.always(function() {
              (p.overflow = n.overflow[0]),
                (p.overflowX = n.overflow[1]),
                (p.overflowY = n.overflow[2]);
            })),
          (l = !1),
          d))
            l ||
              (m
                ? 'hidden' in m && (g = m.hidden)
                : (m = Y.access(t, 'fxshow', { display: u })),
              o && (m.hidden = !g),
              g && lt([t], !0),
              f.done(function() {
                for (r in (g || lt([t]), Y.remove(t, 'fxshow'), d))
                  b.style(t, r, d[r]);
              })),
              (l = se(g ? m[r] : 0, r, f)),
              r in m ||
                ((m[r] = l.start), g && ((l.end = l.start), (l.start = 0)));
      }
    ],
    prefilter: function(t, e) {
      e ? ae.prefilters.unshift(t) : ae.prefilters.push(t);
    }
  })),
    (b.speed = function(t, e, n) {
      var r =
        t && 'object' == typeof t
          ? b.extend({}, t)
          : {
              complete: n || (!n && e) || (g(t) && t),
              duration: t,
              easing: (n && e) || (e && !g(e) && e)
            };
      return (
        b.fx.off
          ? (r.duration = 0)
          : 'number' != typeof r.duration &&
            (r.duration in b.fx.speeds
              ? (r.duration = b.fx.speeds[r.duration])
              : (r.duration = b.fx.speeds._default)),
        (null != r.queue && !0 !== r.queue) || (r.queue = 'fx'),
        (r.old = r.complete),
        (r.complete = function() {
          g(r.old) && r.old.call(this), r.queue && b.dequeue(this, r.queue);
        }),
        r
      );
    }),
    b.fn.extend({
      fadeTo: function(t, e, n, r) {
        return this.filter(rt)
          .css('opacity', 0)
          .show()
          .end()
          .animate({ opacity: e }, t, n, r);
      },
      animate: function(t, e, n, r) {
        var i = b.isEmptyObject(t),
          o = b.speed(e, n, r),
          s = function() {
            var e = ae(this, b.extend({}, t), o);
            (i || Y.get(this, 'finish')) && e.stop(!0);
          };
        return (
          (s.finish = s),
          i || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
        );
      },
      stop: function(t, e, n) {
        var r = function(t) {
          var e = t.stop;
          delete t.stop, e(n);
        };
        return (
          'string' != typeof t && ((n = e), (e = t), (t = void 0)),
          e && !1 !== t && this.queue(t || 'fx', []),
          this.each(function() {
            var e = !0,
              i = null != t && t + 'queueHooks',
              o = b.timers,
              s = Y.get(this);
            if (i) s[i] && s[i].stop && r(s[i]);
            else for (i in s) s[i] && s[i].stop && ne.test(i) && r(s[i]);
            for (i = o.length; i--; )
              o[i].elem !== this ||
                (null != t && o[i].queue !== t) ||
                (o[i].anim.stop(n), (e = !1), o.splice(i, 1));
            (!e && n) || b.dequeue(this, t);
          })
        );
      },
      finish: function(t) {
        return (
          !1 !== t && (t = t || 'fx'),
          this.each(function() {
            var e,
              n = Y.get(this),
              r = n[t + 'queue'],
              i = n[t + 'queueHooks'],
              o = b.timers,
              s = r ? r.length : 0;
            for (
              n.finish = !0,
                b.queue(this, t, []),
                i && i.stop && i.stop.call(this, !0),
                e = o.length;
              e--;

            )
              o[e].elem === this &&
                o[e].queue === t &&
                (o[e].anim.stop(!0), o.splice(e, 1));
            for (e = 0; e < s; e++)
              r[e] && r[e].finish && r[e].finish.call(this);
            delete n.finish;
          })
        );
      }
    }),
    b.each(['toggle', 'show', 'hide'], function(t, e) {
      var n = b.fn[e];
      b.fn[e] = function(t, r, i) {
        return null == t || 'boolean' == typeof t
          ? n.apply(this, arguments)
          : this.animate(oe(e, !0), t, r, i);
      };
    }),
    b.each(
      {
        slideDown: oe('show'),
        slideUp: oe('hide'),
        slideToggle: oe('toggle'),
        fadeIn: { opacity: 'show' },
        fadeOut: { opacity: 'hide' },
        fadeToggle: { opacity: 'toggle' }
      },
      function(t, e) {
        b.fn[t] = function(t, n, r) {
          return this.animate(e, t, n, r);
        };
      }
    ),
    (b.timers = []),
    (b.fx.tick = function() {
      var t,
        e = 0,
        n = b.timers;
      for (Zt = Date.now(); e < n.length; e++)
        (t = n[e])() || n[e] !== t || n.splice(e--, 1);
      n.length || b.fx.stop(), (Zt = void 0);
    }),
    (b.fx.timer = function(t) {
      b.timers.push(t), b.fx.start();
    }),
    (b.fx.interval = 13),
    (b.fx.start = function() {
      te || ((te = !0), re());
    }),
    (b.fx.stop = function() {
      te = null;
    }),
    (b.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (b.fn.delay = function(e, n) {
      return (
        (e = (b.fx && b.fx.speeds[e]) || e),
        (n = n || 'fx'),
        this.queue(n, function(n, r) {
          var i = t.setTimeout(n, e);
          r.stop = function() {
            t.clearTimeout(i);
          };
        })
      );
    }),
    (function() {
      var t = r.createElement('input'),
        e = r.createElement('select').appendChild(r.createElement('option'));
      (t.type = 'checkbox'),
        (p.checkOn = '' !== t.value),
        (p.optSelected = e.selected),
        ((t = r.createElement('input')).value = 't'),
        (t.type = 'radio'),
        (p.radioValue = 't' === t.value);
    })();
  var le,
    ue = b.expr.attrHandle;
  b.fn.extend({
    attr: function(t, e) {
      return F(this, b.attr, t, e, arguments.length > 1);
    },
    removeAttr: function(t) {
      return this.each(function() {
        b.removeAttr(this, t);
      });
    }
  }),
    b.extend({
      attr: function(t, e, n) {
        var r,
          i,
          o = t.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return 'undefined' == typeof t.getAttribute
            ? b.prop(t, e, n)
            : ((1 === o && b.isXMLDoc(t)) ||
                (i =
                  b.attrHooks[e.toLowerCase()] ||
                  (b.expr.match.bool.test(e) ? le : void 0)),
              void 0 !== n
                ? null === n
                  ? void b.removeAttr(t, e)
                  : i && 'set' in i && void 0 !== (r = i.set(t, n, e))
                  ? r
                  : (t.setAttribute(e, n + ''), n)
                : i && 'get' in i && null !== (r = i.get(t, e))
                ? r
                : null == (r = b.find.attr(t, e))
                ? void 0
                : r);
      },
      attrHooks: {
        type: {
          set: function(t, e) {
            if (!p.radioValue && 'radio' === e && k(t, 'input')) {
              var n = t.value;
              return t.setAttribute('type', e), n && (t.value = n), e;
            }
          }
        }
      },
      removeAttr: function(t, e) {
        var n,
          r = 0,
          i = e && e.match(O);
        if (i && 1 === t.nodeType) for (; (n = i[r++]); ) t.removeAttribute(n);
      }
    }),
    (le = {
      set: function(t, e, n) {
        return !1 === e ? b.removeAttr(t, n) : t.setAttribute(n, n), n;
      }
    }),
    b.each(b.expr.match.bool.source.match(/\w+/g), function(t, e) {
      var n = ue[e] || b.find.attr;
      ue[e] = function(t, e, r) {
        var i,
          o,
          s = e.toLowerCase();
        return (
          r ||
            ((o = ue[s]),
            (ue[s] = i),
            (i = null != n(t, e, r) ? s : null),
            (ue[s] = o)),
          i
        );
      };
    });
  var ce = /^(?:input|select|textarea|button)$/i,
    he = /^(?:a|area)$/i;
  function fe(t) {
    return (t.match(O) || []).join(' ');
  }
  function de(t) {
    return (t.getAttribute && t.getAttribute('class')) || '';
  }
  function pe(t) {
    return Array.isArray(t) ? t : ('string' == typeof t && t.match(O)) || [];
  }
  b.fn.extend({
    prop: function(t, e) {
      return F(this, b.prop, t, e, arguments.length > 1);
    },
    removeProp: function(t) {
      return this.each(function() {
        delete this[b.propFix[t] || t];
      });
    }
  }),
    b.extend({
      prop: function(t, e, n) {
        var r,
          i,
          o = t.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && b.isXMLDoc(t)) ||
              ((e = b.propFix[e] || e), (i = b.propHooks[e])),
            void 0 !== n
              ? i && 'set' in i && void 0 !== (r = i.set(t, n, e))
                ? r
                : (t[e] = n)
              : i && 'get' in i && null !== (r = i.get(t, e))
              ? r
              : t[e]
          );
      },
      propHooks: {
        tabIndex: {
          get: function(t) {
            var e = b.find.attr(t, 'tabindex');
            return e
              ? parseInt(e, 10)
              : ce.test(t.nodeName) || (he.test(t.nodeName) && t.href)
              ? 0
              : -1;
          }
        }
      },
      propFix: { for: 'htmlFor', class: 'className' }
    }),
    p.optSelected ||
      (b.propHooks.selected = {
        get: function(t) {
          var e = t.parentNode;
          return e && e.parentNode && e.parentNode.selectedIndex, null;
        },
        set: function(t) {
          var e = t.parentNode;
          e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
        }
      }),
    b.each(
      [
        'tabIndex',
        'readOnly',
        'maxLength',
        'cellSpacing',
        'cellPadding',
        'rowSpan',
        'colSpan',
        'useMap',
        'frameBorder',
        'contentEditable'
      ],
      function() {
        b.propFix[this.toLowerCase()] = this;
      }
    ),
    b.fn.extend({
      addClass: function(t) {
        var e,
          n,
          r,
          i,
          o,
          s,
          a,
          l = 0;
        if (g(t))
          return this.each(function(e) {
            b(this).addClass(t.call(this, e, de(this)));
          });
        if ((e = pe(t)).length)
          for (; (n = this[l++]); )
            if (((i = de(n)), (r = 1 === n.nodeType && ' ' + fe(i) + ' '))) {
              for (s = 0; (o = e[s++]); )
                r.indexOf(' ' + o + ' ') < 0 && (r += o + ' ');
              i !== (a = fe(r)) && n.setAttribute('class', a);
            }
        return this;
      },
      removeClass: function(t) {
        var e,
          n,
          r,
          i,
          o,
          s,
          a,
          l = 0;
        if (g(t))
          return this.each(function(e) {
            b(this).removeClass(t.call(this, e, de(this)));
          });
        if (!arguments.length) return this.attr('class', '');
        if ((e = pe(t)).length)
          for (; (n = this[l++]); )
            if (((i = de(n)), (r = 1 === n.nodeType && ' ' + fe(i) + ' '))) {
              for (s = 0; (o = e[s++]); )
                for (; r.indexOf(' ' + o + ' ') > -1; )
                  r = r.replace(' ' + o + ' ', ' ');
              i !== (a = fe(r)) && n.setAttribute('class', a);
            }
        return this;
      },
      toggleClass: function(t, e) {
        var n = typeof t,
          r = 'string' === n || Array.isArray(t);
        return 'boolean' == typeof e && r
          ? e
            ? this.addClass(t)
            : this.removeClass(t)
          : g(t)
          ? this.each(function(n) {
              b(this).toggleClass(t.call(this, n, de(this), e), e);
            })
          : this.each(function() {
              var e, i, o, s;
              if (r)
                for (i = 0, o = b(this), s = pe(t); (e = s[i++]); )
                  o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
              else
                (void 0 !== t && 'boolean' !== n) ||
                  ((e = de(this)) && Y.set(this, '__className__', e),
                  this.setAttribute &&
                    this.setAttribute(
                      'class',
                      e || !1 === t ? '' : Y.get(this, '__className__') || ''
                    ));
            });
      },
      hasClass: function(t) {
        var e,
          n,
          r = 0;
        for (e = ' ' + t + ' '; (n = this[r++]); )
          if (1 === n.nodeType && (' ' + fe(de(n)) + ' ').indexOf(e) > -1)
            return !0;
        return !1;
      }
    });
  var ge = /\r/g;
  b.fn.extend({
    val: function(t) {
      var e,
        n,
        r,
        i = this[0];
      return arguments.length
        ? ((r = g(t)),
          this.each(function(n) {
            var i;
            1 === this.nodeType &&
              (null == (i = r ? t.call(this, n, b(this).val()) : t)
                ? (i = '')
                : 'number' == typeof i
                ? (i += '')
                : Array.isArray(i) &&
                  (i = b.map(i, function(t) {
                    return null == t ? '' : t + '';
                  })),
              ((e =
                b.valHooks[this.type] ||
                b.valHooks[this.nodeName.toLowerCase()]) &&
                'set' in e &&
                void 0 !== e.set(this, i, 'value')) ||
                (this.value = i));
          }))
        : i
        ? (e = b.valHooks[i.type] || b.valHooks[i.nodeName.toLowerCase()]) &&
          'get' in e &&
          void 0 !== (n = e.get(i, 'value'))
          ? n
          : 'string' == typeof (n = i.value)
          ? n.replace(ge, '')
          : null == n
          ? ''
          : n
        : void 0;
    }
  }),
    b.extend({
      valHooks: {
        option: {
          get: function(t) {
            var e = b.find.attr(t, 'value');
            return null != e ? e : fe(b.text(t));
          }
        },
        select: {
          get: function(t) {
            var e,
              n,
              r,
              i = t.options,
              o = t.selectedIndex,
              s = 'select-one' === t.type,
              a = s ? null : [],
              l = s ? o + 1 : i.length;
            for (r = o < 0 ? l : s ? o : 0; r < l; r++)
              if (
                ((n = i[r]).selected || r === o) &&
                !n.disabled &&
                (!n.parentNode.disabled || !k(n.parentNode, 'optgroup'))
              ) {
                if (((e = b(n).val()), s)) return e;
                a.push(e);
              }
            return a;
          },
          set: function(t, e) {
            for (
              var n, r, i = t.options, o = b.makeArray(e), s = i.length;
              s--;

            )
              ((r = i[s]).selected =
                b.inArray(b.valHooks.option.get(r), o) > -1) && (n = !0);
            return n || (t.selectedIndex = -1), o;
          }
        }
      }
    }),
    b.each(['radio', 'checkbox'], function() {
      (b.valHooks[this] = {
        set: function(t, e) {
          if (Array.isArray(e))
            return (t.checked = b.inArray(b(t).val(), e) > -1);
        }
      }),
        p.checkOn ||
          (b.valHooks[this].get = function(t) {
            return null === t.getAttribute('value') ? 'on' : t.value;
          });
    }),
    (p.focusin = 'onfocusin' in t);
  var me = /^(?:focusinfocus|focusoutblur)$/,
    ve = function(t) {
      t.stopPropagation();
    };
  b.extend(b.event, {
    trigger: function(e, n, i, o) {
      var s,
        a,
        l,
        u,
        c,
        f,
        d,
        p,
        v = [i || r],
        y = h.call(e, 'type') ? e.type : e,
        _ = h.call(e, 'namespace') ? e.namespace.split('.') : [];
      if (
        ((a = p = l = i = i || r),
        3 !== i.nodeType &&
          8 !== i.nodeType &&
          !me.test(y + b.event.triggered) &&
          (y.indexOf('.') > -1 && ((y = (_ = y.split('.')).shift()), _.sort()),
          (c = y.indexOf(':') < 0 && 'on' + y),
          ((e = e[b.expando]
            ? e
            : new b.Event(y, 'object' == typeof e && e)).isTrigger = o ? 2 : 3),
          (e.namespace = _.join('.')),
          (e.rnamespace = e.namespace
            ? new RegExp('(^|\\.)' + _.join('\\.(?:.*\\.|)') + '(\\.|$)')
            : null),
          (e.result = void 0),
          e.target || (e.target = i),
          (n = null == n ? [e] : b.makeArray(n, [e])),
          (d = b.event.special[y] || {}),
          o || !d.trigger || !1 !== d.trigger.apply(i, n)))
      ) {
        if (!o && !d.noBubble && !m(i)) {
          for (
            u = d.delegateType || y, me.test(u + y) || (a = a.parentNode);
            a;
            a = a.parentNode
          )
            v.push(a), (l = a);
          l === (i.ownerDocument || r) &&
            v.push(l.defaultView || l.parentWindow || t);
        }
        for (s = 0; (a = v[s++]) && !e.isPropagationStopped(); )
          (p = a),
            (e.type = s > 1 ? u : d.bindType || y),
            (f = (Y.get(a, 'events') || {})[e.type] && Y.get(a, 'handle')) &&
              f.apply(a, n),
            (f = c && a[c]) &&
              f.apply &&
              K(a) &&
              ((e.result = f.apply(a, n)),
              !1 === e.result && e.preventDefault());
        return (
          (e.type = y),
          o ||
            e.isDefaultPrevented() ||
            (d._default && !1 !== d._default.apply(v.pop(), n)) ||
            !K(i) ||
            (c &&
              g(i[y]) &&
              !m(i) &&
              ((l = i[c]) && (i[c] = null),
              (b.event.triggered = y),
              e.isPropagationStopped() && p.addEventListener(y, ve),
              i[y](),
              e.isPropagationStopped() && p.removeEventListener(y, ve),
              (b.event.triggered = void 0),
              l && (i[c] = l))),
          e.result
        );
      }
    },
    simulate: function(t, e, n) {
      var r = b.extend(new b.Event(), n, { type: t, isSimulated: !0 });
      b.event.trigger(r, null, e);
    }
  }),
    b.fn.extend({
      trigger: function(t, e) {
        return this.each(function() {
          b.event.trigger(t, e, this);
        });
      },
      triggerHandler: function(t, e) {
        var n = this[0];
        if (n) return b.event.trigger(t, e, n, !0);
      }
    }),
    p.focusin ||
      b.each({ focus: 'focusin', blur: 'focusout' }, function(t, e) {
        var n = function(t) {
          b.event.simulate(e, t.target, b.event.fix(t));
        };
        b.event.special[e] = {
          setup: function() {
            var r = this.ownerDocument || this,
              i = Y.access(r, e);
            i || r.addEventListener(t, n, !0), Y.access(r, e, (i || 0) + 1);
          },
          teardown: function() {
            var r = this.ownerDocument || this,
              i = Y.access(r, e) - 1;
            i
              ? Y.access(r, e, i)
              : (r.removeEventListener(t, n, !0), Y.remove(r, e));
          }
        };
      });
  var ye = t.location,
    _e = Date.now(),
    be = /\?/;
  b.parseXML = function(e) {
    var n;
    if (!e || 'string' != typeof e) return null;
    try {
      n = new t.DOMParser().parseFromString(e, 'text/xml');
    } catch (t) {
      n = void 0;
    }
    return (
      (n && !n.getElementsByTagName('parsererror').length) ||
        b.error('Invalid XML: ' + e),
      n
    );
  };
  var we = /\[\]$/,
    xe = /\r?\n/g,
    Ee = /^(?:submit|button|image|reset|file)$/i,
    Te = /^(?:input|select|textarea|keygen)/i;
  function Se(t, e, n, r) {
    var i;
    if (Array.isArray(e))
      b.each(e, function(e, i) {
        n || we.test(t)
          ? r(t, i)
          : Se(
              t + '[' + ('object' == typeof i && null != i ? e : '') + ']',
              i,
              n,
              r
            );
      });
    else if (n || 'object' !== _(e)) r(t, e);
    else for (i in e) Se(t + '[' + i + ']', e[i], n, r);
  }
  (b.param = function(t, e) {
    var n,
      r = [],
      i = function(t, e) {
        var n = g(e) ? e() : e;
        r[r.length] =
          encodeURIComponent(t) + '=' + encodeURIComponent(null == n ? '' : n);
      };
    if (Array.isArray(t) || (t.jquery && !b.isPlainObject(t)))
      b.each(t, function() {
        i(this.name, this.value);
      });
    else for (n in t) Se(n, t[n], e, i);
    return r.join('&');
  }),
    b.fn.extend({
      serialize: function() {
        return b.param(this.serializeArray());
      },
      serializeArray: function() {
        return this.map(function() {
          var t = b.prop(this, 'elements');
          return t ? b.makeArray(t) : this;
        })
          .filter(function() {
            var t = this.type;
            return (
              this.name &&
              !b(this).is(':disabled') &&
              Te.test(this.nodeName) &&
              !Ee.test(t) &&
              (this.checked || !ut.test(t))
            );
          })
          .map(function(t, e) {
            var n = b(this).val();
            return null == n
              ? null
              : Array.isArray(n)
              ? b.map(n, function(t) {
                  return { name: e.name, value: t.replace(xe, '\r\n') };
                })
              : { name: e.name, value: n.replace(xe, '\r\n') };
          })
          .get();
      }
    });
  var Ce = /%20/g,
    ke = /#.*$/,
    Ae = /([?&])_=[^&]*/,
    De = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Ne = /^(?:GET|HEAD)$/,
    Ie = /^\/\//,
    Le = {},
    je = {},
    qe = '*/'.concat('*'),
    Oe = r.createElement('a');
  function Re(t) {
    return function(e, n) {
      'string' != typeof e && ((n = e), (e = '*'));
      var r,
        i = 0,
        o = e.toLowerCase().match(O) || [];
      if (g(n))
        for (; (r = o[i++]); )
          '+' === r[0]
            ? ((r = r.slice(1) || '*'), (t[r] = t[r] || []).unshift(n))
            : (t[r] = t[r] || []).push(n);
    };
  }
  function Be(t, e, n, r) {
    var i = {},
      o = t === je;
    function s(a) {
      var l;
      return (
        (i[a] = !0),
        b.each(t[a] || [], function(t, a) {
          var u = a(e, n, r);
          return 'string' != typeof u || o || i[u]
            ? o
              ? !(l = u)
              : void 0
            : (e.dataTypes.unshift(u), s(u), !1);
        }),
        l
      );
    }
    return s(e.dataTypes[0]) || (!i['*'] && s('*'));
  }
  function Me(t, e) {
    var n,
      r,
      i = b.ajaxSettings.flatOptions || {};
    for (n in e) void 0 !== e[n] && ((i[n] ? t : r || (r = {}))[n] = e[n]);
    return r && b.extend(!0, t, r), t;
  }
  (Oe.href = ye.href),
    b.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: ye.href,
        type: 'GET',
        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
          ye.protocol
        ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        accepts: {
          '*': qe,
          text: 'text/plain',
          html: 'text/html',
          xml: 'application/xml, text/xml',
          json: 'application/json, text/javascript'
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: 'responseXML',
          text: 'responseText',
          json: 'responseJSON'
        },
        converters: {
          '* text': String,
          'text html': !0,
          'text json': JSON.parse,
          'text xml': b.parseXML
        },
        flatOptions: { url: !0, context: !0 }
      },
      ajaxSetup: function(t, e) {
        return e ? Me(Me(t, b.ajaxSettings), e) : Me(b.ajaxSettings, t);
      },
      ajaxPrefilter: Re(Le),
      ajaxTransport: Re(je),
      ajax: function(e, n) {
        'object' == typeof e && ((n = e), (e = void 0)), (n = n || {});
        var i,
          o,
          s,
          a,
          l,
          u,
          c,
          h,
          f,
          d,
          p = b.ajaxSetup({}, n),
          g = p.context || p,
          m = p.context && (g.nodeType || g.jquery) ? b(g) : b.event,
          v = b.Deferred(),
          y = b.Callbacks('once memory'),
          _ = p.statusCode || {},
          w = {},
          x = {},
          E = 'canceled',
          T = {
            readyState: 0,
            getResponseHeader: function(t) {
              var e;
              if (c) {
                if (!a)
                  for (a = {}; (e = De.exec(s)); ) a[e[1].toLowerCase()] = e[2];
                e = a[t.toLowerCase()];
              }
              return null == e ? null : e;
            },
            getAllResponseHeaders: function() {
              return c ? s : null;
            },
            setRequestHeader: function(t, e) {
              return (
                null == c &&
                  ((t = x[t.toLowerCase()] = x[t.toLowerCase()] || t),
                  (w[t] = e)),
                this
              );
            },
            overrideMimeType: function(t) {
              return null == c && (p.mimeType = t), this;
            },
            statusCode: function(t) {
              var e;
              if (t)
                if (c) T.always(t[T.status]);
                else for (e in t) _[e] = [_[e], t[e]];
              return this;
            },
            abort: function(t) {
              var e = t || E;
              return i && i.abort(e), S(0, e), this;
            }
          };
        if (
          (v.promise(T),
          (p.url = ((e || p.url || ye.href) + '').replace(
            Ie,
            ye.protocol + '//'
          )),
          (p.type = n.method || n.type || p.method || p.type),
          (p.dataTypes = (p.dataType || '*').toLowerCase().match(O) || ['']),
          null == p.crossDomain)
        ) {
          u = r.createElement('a');
          try {
            (u.href = p.url),
              (u.href = u.href),
              (p.crossDomain =
                Oe.protocol + '//' + Oe.host != u.protocol + '//' + u.host);
          } catch (t) {
            p.crossDomain = !0;
          }
        }
        if (
          (p.data &&
            p.processData &&
            'string' != typeof p.data &&
            (p.data = b.param(p.data, p.traditional)),
          Be(Le, p, n, T),
          c)
        )
          return T;
        for (f in ((h = b.event && p.global) &&
          0 == b.active++ &&
          b.event.trigger('ajaxStart'),
        (p.type = p.type.toUpperCase()),
        (p.hasContent = !Ne.test(p.type)),
        (o = p.url.replace(ke, '')),
        p.hasContent
          ? p.data &&
            p.processData &&
            0 ===
              (p.contentType || '').indexOf(
                'application/x-www-form-urlencoded'
              ) &&
            (p.data = p.data.replace(Ce, '+'))
          : ((d = p.url.slice(o.length)),
            p.data &&
              (p.processData || 'string' == typeof p.data) &&
              ((o += (be.test(o) ? '&' : '?') + p.data), delete p.data),
            !1 === p.cache &&
              ((o = o.replace(Ae, '$1')),
              (d = (be.test(o) ? '&' : '?') + '_=' + _e++ + d)),
            (p.url = o + d)),
        p.ifModified &&
          (b.lastModified[o] &&
            T.setRequestHeader('If-Modified-Since', b.lastModified[o]),
          b.etag[o] && T.setRequestHeader('If-None-Match', b.etag[o])),
        ((p.data && p.hasContent && !1 !== p.contentType) || n.contentType) &&
          T.setRequestHeader('Content-Type', p.contentType),
        T.setRequestHeader(
          'Accept',
          p.dataTypes[0] && p.accepts[p.dataTypes[0]]
            ? p.accepts[p.dataTypes[0]] +
                ('*' !== p.dataTypes[0] ? ', ' + qe + '; q=0.01' : '')
            : p.accepts['*']
        ),
        p.headers))
          T.setRequestHeader(f, p.headers[f]);
        if (p.beforeSend && (!1 === p.beforeSend.call(g, T, p) || c))
          return T.abort();
        if (
          ((E = 'abort'),
          y.add(p.complete),
          T.done(p.success),
          T.fail(p.error),
          (i = Be(je, p, n, T)))
        ) {
          if (((T.readyState = 1), h && m.trigger('ajaxSend', [T, p]), c))
            return T;
          p.async &&
            p.timeout > 0 &&
            (l = t.setTimeout(function() {
              T.abort('timeout');
            }, p.timeout));
          try {
            (c = !1), i.send(w, S);
          } catch (t) {
            if (c) throw t;
            S(-1, t);
          }
        } else S(-1, 'No Transport');
        function S(e, n, r, a) {
          var u,
            f,
            d,
            w,
            x,
            E = n;
          c ||
            ((c = !0),
            l && t.clearTimeout(l),
            (i = void 0),
            (s = a || ''),
            (T.readyState = e > 0 ? 4 : 0),
            (u = (e >= 200 && e < 300) || 304 === e),
            r &&
              (w = (function(t, e, n) {
                for (
                  var r, i, o, s, a = t.contents, l = t.dataTypes;
                  '*' === l[0];

                )
                  l.shift(),
                    void 0 === r &&
                      (r = t.mimeType || e.getResponseHeader('Content-Type'));
                if (r)
                  for (i in a)
                    if (a[i] && a[i].test(r)) {
                      l.unshift(i);
                      break;
                    }
                if (l[0] in n) o = l[0];
                else {
                  for (i in n) {
                    if (!l[0] || t.converters[i + ' ' + l[0]]) {
                      o = i;
                      break;
                    }
                    s || (s = i);
                  }
                  o = o || s;
                }
                if (o) return o !== l[0] && l.unshift(o), n[o];
              })(p, T, r)),
            (w = (function(t, e, n, r) {
              var i,
                o,
                s,
                a,
                l,
                u = {},
                c = t.dataTypes.slice();
              if (c[1])
                for (s in t.converters) u[s.toLowerCase()] = t.converters[s];
              for (o = c.shift(); o; )
                if (
                  (t.responseFields[o] && (n[t.responseFields[o]] = e),
                  !l && r && t.dataFilter && (e = t.dataFilter(e, t.dataType)),
                  (l = o),
                  (o = c.shift()))
                )
                  if ('*' === o) o = l;
                  else if ('*' !== l && l !== o) {
                    if (!(s = u[l + ' ' + o] || u['* ' + o]))
                      for (i in u)
                        if (
                          (a = i.split(' '))[1] === o &&
                          (s = u[l + ' ' + a[0]] || u['* ' + a[0]])
                        ) {
                          !0 === s
                            ? (s = u[i])
                            : !0 !== u[i] && ((o = a[0]), c.unshift(a[1]));
                          break;
                        }
                    if (!0 !== s)
                      if (s && t.throws) e = s(e);
                      else
                        try {
                          e = s(e);
                        } catch (t) {
                          return {
                            state: 'parsererror',
                            error: s
                              ? t
                              : 'No conversion from ' + l + ' to ' + o
                          };
                        }
                  }
              return { state: 'success', data: e };
            })(p, w, T, u)),
            u
              ? (p.ifModified &&
                  ((x = T.getResponseHeader('Last-Modified')) &&
                    (b.lastModified[o] = x),
                  (x = T.getResponseHeader('etag')) && (b.etag[o] = x)),
                204 === e || 'HEAD' === p.type
                  ? (E = 'nocontent')
                  : 304 === e
                  ? (E = 'notmodified')
                  : ((E = w.state), (f = w.data), (u = !(d = w.error))))
              : ((d = E), (!e && E) || ((E = 'error'), e < 0 && (e = 0))),
            (T.status = e),
            (T.statusText = (n || E) + ''),
            u ? v.resolveWith(g, [f, E, T]) : v.rejectWith(g, [T, E, d]),
            T.statusCode(_),
            (_ = void 0),
            h && m.trigger(u ? 'ajaxSuccess' : 'ajaxError', [T, p, u ? f : d]),
            y.fireWith(g, [T, E]),
            h &&
              (m.trigger('ajaxComplete', [T, p]),
              --b.active || b.event.trigger('ajaxStop')));
        }
        return T;
      },
      getJSON: function(t, e, n) {
        return b.get(t, e, n, 'json');
      },
      getScript: function(t, e) {
        return b.get(t, void 0, e, 'script');
      }
    }),
    b.each(['get', 'post'], function(t, e) {
      b[e] = function(t, n, r, i) {
        return (
          g(n) && ((i = i || r), (r = n), (n = void 0)),
          b.ajax(
            b.extend(
              { url: t, type: e, dataType: i, data: n, success: r },
              b.isPlainObject(t) && t
            )
          )
        );
      };
    }),
    (b._evalUrl = function(t) {
      return b.ajax({
        url: t,
        type: 'GET',
        dataType: 'script',
        cache: !0,
        async: !1,
        global: !1,
        throws: !0
      });
    }),
    b.fn.extend({
      wrapAll: function(t) {
        var e;
        return (
          this[0] &&
            (g(t) && (t = t.call(this[0])),
            (e = b(t, this[0].ownerDocument)
              .eq(0)
              .clone(!0)),
            this[0].parentNode && e.insertBefore(this[0]),
            e
              .map(function() {
                for (var t = this; t.firstElementChild; )
                  t = t.firstElementChild;
                return t;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function(t) {
        return g(t)
          ? this.each(function(e) {
              b(this).wrapInner(t.call(this, e));
            })
          : this.each(function() {
              var e = b(this),
                n = e.contents();
              n.length ? n.wrapAll(t) : e.append(t);
            });
      },
      wrap: function(t) {
        var e = g(t);
        return this.each(function(n) {
          b(this).wrapAll(e ? t.call(this, n) : t);
        });
      },
      unwrap: function(t) {
        return (
          this.parent(t)
            .not('body')
            .each(function() {
              b(this).replaceWith(this.childNodes);
            }),
          this
        );
      }
    }),
    (b.expr.pseudos.hidden = function(t) {
      return !b.expr.pseudos.visible(t);
    }),
    (b.expr.pseudos.visible = function(t) {
      return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
    }),
    (b.ajaxSettings.xhr = function() {
      try {
        return new t.XMLHttpRequest();
      } catch (t) {}
    });
  var Pe = { 0: 200, 1223: 204 },
    He = b.ajaxSettings.xhr();
  (p.cors = !!He && 'withCredentials' in He),
    (p.ajax = He = !!He),
    b.ajaxTransport(function(e) {
      var n, r;
      if (p.cors || (He && !e.crossDomain))
        return {
          send: function(i, o) {
            var s,
              a = e.xhr();
            if (
              (a.open(e.type, e.url, e.async, e.username, e.password),
              e.xhrFields)
            )
              for (s in e.xhrFields) a[s] = e.xhrFields[s];
            for (s in (e.mimeType &&
              a.overrideMimeType &&
              a.overrideMimeType(e.mimeType),
            e.crossDomain ||
              i['X-Requested-With'] ||
              (i['X-Requested-With'] = 'XMLHttpRequest'),
            i))
              a.setRequestHeader(s, i[s]);
            (n = function(t) {
              return function() {
                n &&
                  ((n = r = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null),
                  'abort' === t
                    ? a.abort()
                    : 'error' === t
                    ? 'number' != typeof a.status
                      ? o(0, 'error')
                      : o(a.status, a.statusText)
                    : o(
                        Pe[a.status] || a.status,
                        a.statusText,
                        'text' !== (a.responseType || 'text') ||
                          'string' != typeof a.responseText
                          ? { binary: a.response }
                          : { text: a.responseText },
                        a.getAllResponseHeaders()
                      ));
              };
            }),
              (a.onload = n()),
              (r = a.onerror = a.ontimeout = n('error')),
              void 0 !== a.onabort
                ? (a.onabort = r)
                : (a.onreadystatechange = function() {
                    4 === a.readyState &&
                      t.setTimeout(function() {
                        n && r();
                      });
                  }),
              (n = n('abort'));
            try {
              a.send((e.hasContent && e.data) || null);
            } catch (t) {
              if (n) throw t;
            }
          },
          abort: function() {
            n && n();
          }
        };
    }),
    b.ajaxPrefilter(function(t) {
      t.crossDomain && (t.contents.script = !1);
    }),
    b.ajaxSetup({
      accepts: {
        script:
          'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        'text script': function(t) {
          return b.globalEval(t), t;
        }
      }
    }),
    b.ajaxPrefilter('script', function(t) {
      void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = 'GET');
    }),
    b.ajaxTransport('script', function(t) {
      var e, n;
      if (t.crossDomain)
        return {
          send: function(i, o) {
            (e = b('<script>')
              .prop({ charset: t.scriptCharset, src: t.url })
              .on(
                'load error',
                (n = function(t) {
                  e.remove(),
                    (n = null),
                    t && o('error' === t.type ? 404 : 200, t.type);
                })
              )),
              r.head.appendChild(e[0]);
          },
          abort: function() {
            n && n();
          }
        };
    });
  var Ue,
    Fe = [],
    We = /(=)\?(?=&|$)|\?\?/;
  b.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function() {
      var t = Fe.pop() || b.expando + '_' + _e++;
      return (this[t] = !0), t;
    }
  }),
    b.ajaxPrefilter('json jsonp', function(e, n, r) {
      var i,
        o,
        s,
        a =
          !1 !== e.jsonp &&
          (We.test(e.url)
            ? 'url'
            : 'string' == typeof e.data &&
              0 ===
                (e.contentType || '').indexOf(
                  'application/x-www-form-urlencoded'
                ) &&
              We.test(e.data) &&
              'data');
      if (a || 'jsonp' === e.dataTypes[0])
        return (
          (i = e.jsonpCallback = g(e.jsonpCallback)
            ? e.jsonpCallback()
            : e.jsonpCallback),
          a
            ? (e[a] = e[a].replace(We, '$1' + i))
            : !1 !== e.jsonp &&
              (e.url += (be.test(e.url) ? '&' : '?') + e.jsonp + '=' + i),
          (e.converters['script json'] = function() {
            return s || b.error(i + ' was not called'), s[0];
          }),
          (e.dataTypes[0] = 'json'),
          (o = t[i]),
          (t[i] = function() {
            s = arguments;
          }),
          r.always(function() {
            void 0 === o ? b(t).removeProp(i) : (t[i] = o),
              e[i] && ((e.jsonpCallback = n.jsonpCallback), Fe.push(i)),
              s && g(o) && o(s[0]),
              (s = o = void 0);
          }),
          'script'
        );
    }),
    (p.createHTMLDocument = (((Ue = r.implementation.createHTMLDocument('')
      .body).innerHTML = '<form></form><form></form>'),
    2 === Ue.childNodes.length)),
    (b.parseHTML = function(t, e, n) {
      return 'string' != typeof t
        ? []
        : ('boolean' == typeof e && ((n = e), (e = !1)),
          e ||
            (p.createHTMLDocument
              ? (((i = (e = r.implementation.createHTMLDocument(
                  ''
                )).createElement('base')).href = r.location.href),
                e.head.appendChild(i))
              : (e = r)),
          (o = A.exec(t)),
          (s = !n && []),
          o
            ? [e.createElement(o[1])]
            : ((o = yt([t], e, s)),
              s && s.length && b(s).remove(),
              b.merge([], o.childNodes)));
      var i, o, s;
    }),
    (b.fn.load = function(t, e, n) {
      var r,
        i,
        o,
        s = this,
        a = t.indexOf(' ');
      return (
        a > -1 && ((r = fe(t.slice(a))), (t = t.slice(0, a))),
        g(e)
          ? ((n = e), (e = void 0))
          : e && 'object' == typeof e && (i = 'POST'),
        s.length > 0 &&
          b
            .ajax({ url: t, type: i || 'GET', dataType: 'html', data: e })
            .done(function(t) {
              (o = arguments),
                s.html(
                  r
                    ? b('<div>')
                        .append(b.parseHTML(t))
                        .find(r)
                    : t
                );
            })
            .always(
              n &&
                function(t, e) {
                  s.each(function() {
                    n.apply(this, o || [t.responseText, e, t]);
                  });
                }
            ),
        this
      );
    }),
    b.each(
      [
        'ajaxStart',
        'ajaxStop',
        'ajaxComplete',
        'ajaxError',
        'ajaxSuccess',
        'ajaxSend'
      ],
      function(t, e) {
        b.fn[e] = function(t) {
          return this.on(e, t);
        };
      }
    ),
    (b.expr.pseudos.animated = function(t) {
      return b.grep(b.timers, function(e) {
        return t === e.elem;
      }).length;
    }),
    (b.offset = {
      setOffset: function(t, e, n) {
        var r,
          i,
          o,
          s,
          a,
          l,
          u = b.css(t, 'position'),
          c = b(t),
          h = {};
        'static' === u && (t.style.position = 'relative'),
          (a = c.offset()),
          (o = b.css(t, 'top')),
          (l = b.css(t, 'left')),
          ('absolute' === u || 'fixed' === u) && (o + l).indexOf('auto') > -1
            ? ((s = (r = c.position()).top), (i = r.left))
            : ((s = parseFloat(o) || 0), (i = parseFloat(l) || 0)),
          g(e) && (e = e.call(t, n, b.extend({}, a))),
          null != e.top && (h.top = e.top - a.top + s),
          null != e.left && (h.left = e.left - a.left + i),
          'using' in e ? e.using.call(t, h) : c.css(h);
      }
    }),
    b.fn.extend({
      offset: function(t) {
        if (arguments.length)
          return void 0 === t
            ? this
            : this.each(function(e) {
                b.offset.setOffset(this, t, e);
              });
        var e,
          n,
          r = this[0];
        return r
          ? r.getClientRects().length
            ? ((e = r.getBoundingClientRect()),
              (n = r.ownerDocument.defaultView),
              { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset })
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function() {
        if (this[0]) {
          var t,
            e,
            n,
            r = this[0],
            i = { top: 0, left: 0 };
          if ('fixed' === b.css(r, 'position')) e = r.getBoundingClientRect();
          else {
            for (
              e = this.offset(),
                n = r.ownerDocument,
                t = r.offsetParent || n.documentElement;
              t &&
              (t === n.body || t === n.documentElement) &&
              'static' === b.css(t, 'position');

            )
              t = t.parentNode;
            t &&
              t !== r &&
              1 === t.nodeType &&
              (((i = b(t).offset()).top += b.css(t, 'borderTopWidth', !0)),
              (i.left += b.css(t, 'borderLeftWidth', !0)));
          }
          return {
            top: e.top - i.top - b.css(r, 'marginTop', !0),
            left: e.left - i.left - b.css(r, 'marginLeft', !0)
          };
        }
      },
      offsetParent: function() {
        return this.map(function() {
          for (
            var t = this.offsetParent;
            t && 'static' === b.css(t, 'position');

          )
            t = t.offsetParent;
          return t || _t;
        });
      }
    }),
    b.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function(
      t,
      e
    ) {
      var n = 'pageYOffset' === e;
      b.fn[t] = function(r) {
        return F(
          this,
          function(t, r, i) {
            var o;
            if (
              (m(t) ? (o = t) : 9 === t.nodeType && (o = t.defaultView),
              void 0 === i)
            )
              return o ? o[e] : t[r];
            o
              ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset)
              : (t[r] = i);
          },
          t,
          r,
          arguments.length
        );
      };
    }),
    b.each(['top', 'left'], function(t, e) {
      b.cssHooks[e] = Ut(p.pixelPosition, function(t, n) {
        if (n)
          return (n = Ht(t, e)), Bt.test(n) ? b(t).position()[e] + 'px' : n;
      });
    }),
    b.each({ Height: 'height', Width: 'width' }, function(t, e) {
      b.each({ padding: 'inner' + t, content: e, '': 'outer' + t }, function(
        n,
        r
      ) {
        b.fn[r] = function(i, o) {
          var s = arguments.length && (n || 'boolean' != typeof i),
            a = n || (!0 === i || !0 === o ? 'margin' : 'border');
          return F(
            this,
            function(e, n, i) {
              var o;
              return m(e)
                ? 0 === r.indexOf('outer')
                  ? e['inner' + t]
                  : e.document.documentElement['client' + t]
                : 9 === e.nodeType
                ? ((o = e.documentElement),
                  Math.max(
                    e.body['scroll' + t],
                    o['scroll' + t],
                    e.body['offset' + t],
                    o['offset' + t],
                    o['client' + t]
                  ))
                : void 0 === i
                ? b.css(e, n, a)
                : b.style(e, n, i, a);
            },
            e,
            s ? i : void 0,
            s
          );
        };
      });
    }),
    b.each(
      'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
        ' '
      ),
      function(t, e) {
        b.fn[e] = function(t, n) {
          return arguments.length > 0
            ? this.on(e, null, t, n)
            : this.trigger(e);
        };
      }
    ),
    b.fn.extend({
      hover: function(t, e) {
        return this.mouseenter(t).mouseleave(e || t);
      }
    }),
    b.fn.extend({
      bind: function(t, e, n) {
        return this.on(t, null, e, n);
      },
      unbind: function(t, e) {
        return this.off(t, null, e);
      },
      delegate: function(t, e, n, r) {
        return this.on(e, t, n, r);
      },
      undelegate: function(t, e, n) {
        return 1 === arguments.length
          ? this.off(t, '**')
          : this.off(e, t || '**', n);
      }
    }),
    (b.proxy = function(t, e) {
      var n, r, i;
      if (('string' == typeof e && ((n = t[e]), (e = t), (t = n)), g(t)))
        return (
          (r = o.call(arguments, 2)),
          ((i = function() {
            return t.apply(e || this, r.concat(o.call(arguments)));
          }).guid = t.guid = t.guid || b.guid++),
          i
        );
    }),
    (b.holdReady = function(t) {
      t ? b.readyWait++ : b.ready(!0);
    }),
    (b.isArray = Array.isArray),
    (b.parseJSON = JSON.parse),
    (b.nodeName = k),
    (b.isFunction = g),
    (b.isWindow = m),
    (b.camelCase = G),
    (b.type = _),
    (b.now = Date.now),
    (b.isNumeric = function(t) {
      var e = b.type(t);
      return ('number' === e || 'string' === e) && !isNaN(t - parseFloat(t));
    }),
    'function' == typeof define &&
      define.amd &&
      define('jquery', [], function() {
        return b;
      });
  var Ve = t.jQuery,
    ze = t.$;
  return (
    (b.noConflict = function(e) {
      return t.$ === b && (t.$ = ze), e && t.jQuery === b && (t.jQuery = Ve), b;
    }),
    e || (t.jQuery = t.$ = b),
    b
  );
}),
  (function(t, e) {
    'object' == typeof exports && 'undefined' != typeof module
      ? e(exports, require('jquery'), require('popper.js'))
      : 'function' == typeof define && define.amd
      ? define(['exports', 'jquery', 'popper.js'], e)
      : e((t.bootstrap = {}), t.jQuery, t.Popper);
  })(this, function(t, e, n) {
    'use strict';
    function r(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function i(t, e, n) {
      return e && r(t.prototype, e), n && r(t, n), t;
    }
    function o(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {},
          r = Object.keys(n);
        'function' == typeof Object.getOwnPropertySymbols &&
          (r = r.concat(
            Object.getOwnPropertySymbols(n).filter(function(t) {
              return Object.getOwnPropertyDescriptor(n, t).enumerable;
            })
          )),
          r.forEach(function(e) {
            var r, i, o;
            (r = t),
              (o = n[(i = e)]),
              i in r
                ? Object.defineProperty(r, i, {
                    value: o,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                  })
                : (r[i] = o);
          });
      }
      return t;
    }
    (e = e && e.hasOwnProperty('default') ? e.default : e),
      (n = n && n.hasOwnProperty('default') ? n.default : n);
    var s,
      a,
      l,
      u,
      c,
      h,
      f,
      d,
      p,
      g,
      m,
      v,
      y,
      _,
      b,
      w,
      x,
      E,
      T,
      S,
      C,
      k,
      A,
      D,
      N,
      I,
      L,
      j,
      q,
      O,
      R,
      B,
      M,
      P,
      H,
      U,
      F,
      W,
      V,
      z,
      G,
      K,
      Q,
      Y,
      $,
      X,
      J,
      Z,
      tt,
      et,
      nt,
      rt,
      it,
      ot,
      st,
      at,
      lt,
      ut,
      ct,
      ht,
      ft,
      dt,
      pt,
      gt,
      mt,
      vt,
      yt,
      _t,
      bt,
      wt,
      xt,
      Et,
      Tt,
      St,
      Ct,
      kt,
      At,
      Dt,
      Nt,
      It,
      Lt,
      jt,
      qt,
      Ot,
      Rt,
      Bt,
      Mt,
      Pt,
      Ht,
      Ut,
      Ft,
      Wt,
      Vt,
      zt,
      Gt,
      Kt,
      Qt,
      Yt,
      $t,
      Xt,
      Jt,
      Zt,
      te,
      ee,
      ne,
      re,
      ie,
      oe,
      se,
      ae,
      le,
      ue,
      ce,
      he,
      fe,
      de,
      pe,
      ge,
      me,
      ve,
      ye,
      _e,
      be,
      we,
      xe,
      Ee,
      Te,
      Se,
      Ce,
      ke,
      Ae,
      De,
      Ne,
      Ie,
      Le,
      je,
      qe,
      Oe,
      Re,
      Be,
      Me,
      Pe,
      He,
      Ue,
      Fe,
      We,
      Ve,
      ze,
      Ge,
      Ke,
      Qe,
      Ye,
      $e,
      Xe,
      Je,
      Ze,
      tn,
      en,
      nn,
      rn,
      on,
      sn,
      an,
      ln,
      un,
      cn,
      hn,
      fn = (function(t) {
        var e = 'transitionend';
        var n = {
          TRANSITION_END: 'bsTransitionEnd',
          getUID: function(t) {
            for (
              ;
              (t += ~~(1e6 * Math.random())), document.getElementById(t);

            );
            return t;
          },
          getSelectorFromElement: function(e) {
            var n = e.getAttribute('data-target');
            (n && '#' !== n) || (n = e.getAttribute('href') || '');
            try {
              return 0 < t(document).find(n).length ? n : null;
            } catch (e) {
              return null;
            }
          },
          getTransitionDurationFromElement: function(e) {
            if (!e) return 0;
            var n = t(e).css('transition-duration');
            return parseFloat(n)
              ? ((n = n.split(',')[0]), 1e3 * parseFloat(n))
              : 0;
          },
          reflow: function(t) {
            return t.offsetHeight;
          },
          triggerTransitionEnd: function(n) {
            t(n).trigger(e);
          },
          supportsTransitionEnd: function() {
            return Boolean(e);
          },
          isElement: function(t) {
            return (t[0] || t).nodeType;
          },
          typeCheckConfig: function(t, e, r) {
            for (var i in r)
              if (Object.prototype.hasOwnProperty.call(r, i)) {
                var o = r[i],
                  s = e[i],
                  a =
                    s && n.isElement(s)
                      ? 'element'
                      : ((l = s),
                        {}.toString
                          .call(l)
                          .match(/\s([a-z]+)/i)[1]
                          .toLowerCase());
                if (!new RegExp(o).test(a))
                  throw new Error(
                    t.toUpperCase() +
                      ': Option "' +
                      i +
                      '" provided type "' +
                      a +
                      '" but expected type "' +
                      o +
                      '".'
                  );
              }
            var l;
          }
        };
        return (
          (t.fn.emulateTransitionEnd = function(e) {
            var r = this,
              i = !1;
            return (
              t(this).one(n.TRANSITION_END, function() {
                i = !0;
              }),
              setTimeout(function() {
                i || n.triggerTransitionEnd(r);
              }, e),
              this
            );
          }),
          (t.event.special[n.TRANSITION_END] = {
            bindType: e,
            delegateType: e,
            handle: function(e) {
              if (t(e.target).is(this))
                return e.handleObj.handler.apply(this, arguments);
            }
          }),
          n
        );
      })(e),
      dn = ((a = 'alert'),
      (u = '.' + (l = 'bs.alert')),
      (c = (s = e).fn[a]),
      (h = {
        CLOSE: 'close' + u,
        CLOSED: 'closed' + u,
        CLICK_DATA_API: 'click' + u + '.data-api'
      }),
      (f = 'alert'),
      (d = 'fade'),
      (p = 'show'),
      (g = (function() {
        function t(t) {
          this._element = t;
        }
        var e = t.prototype;
        return (
          (e.close = function(t) {
            var e = this._element;
            t && (e = this._getRootElement(t)),
              this._triggerCloseEvent(e).isDefaultPrevented() ||
                this._removeElement(e);
          }),
          (e.dispose = function() {
            s.removeData(this._element, l), (this._element = null);
          }),
          (e._getRootElement = function(t) {
            var e = fn.getSelectorFromElement(t),
              n = !1;
            return e && (n = s(e)[0]), n || (n = s(t).closest('.' + f)[0]), n;
          }),
          (e._triggerCloseEvent = function(t) {
            var e = s.Event(h.CLOSE);
            return s(t).trigger(e), e;
          }),
          (e._removeElement = function(t) {
            var e = this;
            if ((s(t).removeClass(p), s(t).hasClass(d))) {
              var n = fn.getTransitionDurationFromElement(t);
              s(t)
                .one(fn.TRANSITION_END, function(n) {
                  return e._destroyElement(t, n);
                })
                .emulateTransitionEnd(n);
            } else this._destroyElement(t);
          }),
          (e._destroyElement = function(t) {
            s(t)
              .detach()
              .trigger(h.CLOSED)
              .remove();
          }),
          (t._jQueryInterface = function(e) {
            return this.each(function() {
              var n = s(this),
                r = n.data(l);
              r || ((r = new t(this)), n.data(l, r)),
                'close' === e && r[e](this);
            });
          }),
          (t._handleDismiss = function(t) {
            return function(e) {
              e && e.preventDefault(), t.close(this);
            };
          }),
          i(t, null, [
            {
              key: 'VERSION',
              get: function() {
                return '4.1.1';
              }
            }
          ]),
          t
        );
      })()),
      s(document).on(
        h.CLICK_DATA_API,
        '[data-dismiss="alert"]',
        g._handleDismiss(new g())
      ),
      (s.fn[a] = g._jQueryInterface),
      (s.fn[a].Constructor = g),
      (s.fn[a].noConflict = function() {
        return (s.fn[a] = c), g._jQueryInterface;
      }),
      g),
      pn = ((v = 'button'),
      (_ = '.' + (y = 'bs.button')),
      (b = '.data-api'),
      (w = (m = e).fn[v]),
      (x = 'active'),
      'btn',
      (T = '[data-toggle^="button"]'),
      (S = '[data-toggle="buttons"]'),
      (C = 'input'),
      (k = '.active'),
      (A = '.btn'),
      (D = {
        CLICK_DATA_API: 'click' + _ + b,
        FOCUS_BLUR_DATA_API: (E = 'focus') + _ + b + ' blur' + _ + b
      }),
      (N = (function() {
        function t(t) {
          this._element = t;
        }
        var e = t.prototype;
        return (
          (e.toggle = function() {
            var t = !0,
              e = !0,
              n = m(this._element).closest(S)[0];
            if (n) {
              var r = m(this._element).find(C)[0];
              if (r) {
                if ('radio' === r.type)
                  if (r.checked && m(this._element).hasClass(x)) t = !1;
                  else {
                    var i = m(n).find(k)[0];
                    i && m(i).removeClass(x);
                  }
                if (t) {
                  if (
                    r.hasAttribute('disabled') ||
                    n.hasAttribute('disabled') ||
                    r.classList.contains('disabled') ||
                    n.classList.contains('disabled')
                  )
                    return;
                  (r.checked = !m(this._element).hasClass(x)),
                    m(r).trigger('change');
                }
                r.focus(), (e = !1);
              }
            }
            e &&
              this._element.setAttribute(
                'aria-pressed',
                !m(this._element).hasClass(x)
              ),
              t && m(this._element).toggleClass(x);
          }),
          (e.dispose = function() {
            m.removeData(this._element, y), (this._element = null);
          }),
          (t._jQueryInterface = function(e) {
            return this.each(function() {
              var n = m(this).data(y);
              n || ((n = new t(this)), m(this).data(y, n)),
                'toggle' === e && n[e]();
            });
          }),
          i(t, null, [
            {
              key: 'VERSION',
              get: function() {
                return '4.1.1';
              }
            }
          ]),
          t
        );
      })()),
      m(document)
        .on(D.CLICK_DATA_API, T, function(t) {
          t.preventDefault();
          var e = t.target;
          m(e).hasClass('btn') || (e = m(e).closest(A)),
            N._jQueryInterface.call(m(e), 'toggle');
        })
        .on(D.FOCUS_BLUR_DATA_API, T, function(t) {
          var e = m(t.target).closest(A)[0];
          m(e).toggleClass(E, /^focus(in)?$/.test(t.type));
        }),
      (m.fn[v] = N._jQueryInterface),
      (m.fn[v].Constructor = N),
      (m.fn[v].noConflict = function() {
        return (m.fn[v] = w), N._jQueryInterface;
      }),
      N),
      gn = ((L = 'carousel'),
      (q = '.' + (j = 'bs.carousel')),
      (O = '.data-api'),
      (R = (I = e).fn[L]),
      (B = {
        interval: 5e3,
        keyboard: !0,
        slide: !1,
        pause: 'hover',
        wrap: !0
      }),
      (M = {
        interval: '(number|boolean)',
        keyboard: 'boolean',
        slide: '(boolean|string)',
        pause: '(string|boolean)',
        wrap: 'boolean'
      }),
      (P = 'next'),
      (H = 'prev'),
      (U = 'left'),
      (F = 'right'),
      (W = {
        SLIDE: 'slide' + q,
        SLID: 'slid' + q,
        KEYDOWN: 'keydown' + q,
        MOUSEENTER: 'mouseenter' + q,
        MOUSELEAVE: 'mouseleave' + q,
        TOUCHEND: 'touchend' + q,
        LOAD_DATA_API: 'load' + q + O,
        CLICK_DATA_API: 'click' + q + O
      }),
      (V = 'carousel'),
      (z = 'active'),
      (G = 'slide'),
      (K = 'carousel-item-right'),
      (Q = 'carousel-item-left'),
      (Y = 'carousel-item-next'),
      ($ = 'carousel-item-prev'),
      (X = {
        ACTIVE: '.active',
        ACTIVE_ITEM: '.active.carousel-item',
        ITEM: '.carousel-item',
        NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
        INDICATORS: '.carousel-indicators',
        DATA_SLIDE: '[data-slide], [data-slide-to]',
        DATA_RIDE: '[data-ride="carousel"]'
      }),
      (J = (function() {
        function t(t, e) {
          (this._items = null),
            (this._interval = null),
            (this._activeElement = null),
            (this._isPaused = !1),
            (this._isSliding = !1),
            (this.touchTimeout = null),
            (this._config = this._getConfig(e)),
            (this._element = I(t)[0]),
            (this._indicatorsElement = I(this._element).find(X.INDICATORS)[0]),
            this._addEventListeners();
        }
        var e = t.prototype;
        return (
          (e.next = function() {
            this._isSliding || this._slide(P);
          }),
          (e.nextWhenVisible = function() {
            !document.hidden &&
              I(this._element).is(':visible') &&
              'hidden' !== I(this._element).css('visibility') &&
              this.next();
          }),
          (e.prev = function() {
            this._isSliding || this._slide(H);
          }),
          (e.pause = function(t) {
            t || (this._isPaused = !0),
              I(this._element).find(X.NEXT_PREV)[0] &&
                (fn.triggerTransitionEnd(this._element), this.cycle(!0)),
              clearInterval(this._interval),
              (this._interval = null);
          }),
          (e.cycle = function(t) {
            t || (this._isPaused = !1),
              this._interval &&
                (clearInterval(this._interval), (this._interval = null)),
              this._config.interval &&
                !this._isPaused &&
                (this._interval = setInterval(
                  (document.visibilityState
                    ? this.nextWhenVisible
                    : this.next
                  ).bind(this),
                  this._config.interval
                ));
          }),
          (e.to = function(t) {
            var e = this;
            this._activeElement = I(this._element).find(X.ACTIVE_ITEM)[0];
            var n = this._getItemIndex(this._activeElement);
            if (!(t > this._items.length - 1 || t < 0))
              if (this._isSliding)
                I(this._element).one(W.SLID, function() {
                  return e.to(t);
                });
              else {
                if (n === t) return this.pause(), void this.cycle();
                var r = n < t ? P : H;
                this._slide(r, this._items[t]);
              }
          }),
          (e.dispose = function() {
            I(this._element).off(q),
              I.removeData(this._element, j),
              (this._items = null),
              (this._config = null),
              (this._element = null),
              (this._interval = null),
              (this._isPaused = null),
              (this._isSliding = null),
              (this._activeElement = null),
              (this._indicatorsElement = null);
          }),
          (e._getConfig = function(t) {
            return (t = o({}, B, t)), fn.typeCheckConfig(L, t, M), t;
          }),
          (e._addEventListeners = function() {
            var t = this;
            this._config.keyboard &&
              I(this._element).on(W.KEYDOWN, function(e) {
                return t._keydown(e);
              }),
              'hover' === this._config.pause &&
                (I(this._element)
                  .on(W.MOUSEENTER, function(e) {
                    return t.pause(e);
                  })
                  .on(W.MOUSELEAVE, function(e) {
                    return t.cycle(e);
                  }),
                'ontouchstart' in document.documentElement &&
                  I(this._element).on(W.TOUCHEND, function() {
                    t.pause(),
                      t.touchTimeout && clearTimeout(t.touchTimeout),
                      (t.touchTimeout = setTimeout(function(e) {
                        return t.cycle(e);
                      }, 500 + t._config.interval));
                  }));
          }),
          (e._keydown = function(t) {
            if (!/input|textarea/i.test(t.target.tagName))
              switch (t.which) {
                case 37:
                  t.preventDefault(), this.prev();
                  break;
                case 39:
                  t.preventDefault(), this.next();
              }
          }),
          (e._getItemIndex = function(t) {
            return (
              (this._items = I.makeArray(
                I(t)
                  .parent()
                  .find(X.ITEM)
              )),
              this._items.indexOf(t)
            );
          }),
          (e._getItemByDirection = function(t, e) {
            var n = t === P,
              r = t === H,
              i = this._getItemIndex(e),
              o = this._items.length - 1;
            if (((r && 0 === i) || (n && i === o)) && !this._config.wrap)
              return e;
            var s = (i + (t === H ? -1 : 1)) % this._items.length;
            return -1 === s
              ? this._items[this._items.length - 1]
              : this._items[s];
          }),
          (e._triggerSlideEvent = function(t, e) {
            var n = this._getItemIndex(t),
              r = this._getItemIndex(I(this._element).find(X.ACTIVE_ITEM)[0]),
              i = I.Event(W.SLIDE, {
                relatedTarget: t,
                direction: e,
                from: r,
                to: n
              });
            return I(this._element).trigger(i), i;
          }),
          (e._setActiveIndicatorElement = function(t) {
            if (this._indicatorsElement) {
              I(this._indicatorsElement)
                .find(X.ACTIVE)
                .removeClass(z);
              var e = this._indicatorsElement.children[this._getItemIndex(t)];
              e && I(e).addClass(z);
            }
          }),
          (e._slide = function(t, e) {
            var n,
              r,
              i,
              o = this,
              s = I(this._element).find(X.ACTIVE_ITEM)[0],
              a = this._getItemIndex(s),
              l = e || (s && this._getItemByDirection(t, s)),
              u = this._getItemIndex(l),
              c = Boolean(this._interval);
            if (
              (t === P
                ? ((n = Q), (r = Y), (i = U))
                : ((n = K), (r = $), (i = F)),
              l && I(l).hasClass(z))
            )
              this._isSliding = !1;
            else if (
              !this._triggerSlideEvent(l, i).isDefaultPrevented() &&
              s &&
              l
            ) {
              (this._isSliding = !0),
                c && this.pause(),
                this._setActiveIndicatorElement(l);
              var h = I.Event(W.SLID, {
                relatedTarget: l,
                direction: i,
                from: a,
                to: u
              });
              if (I(this._element).hasClass(G)) {
                I(l).addClass(r),
                  fn.reflow(l),
                  I(s).addClass(n),
                  I(l).addClass(n);
                var f = fn.getTransitionDurationFromElement(s);
                I(s)
                  .one(fn.TRANSITION_END, function() {
                    I(l)
                      .removeClass(n + ' ' + r)
                      .addClass(z),
                      I(s).removeClass(z + ' ' + r + ' ' + n),
                      (o._isSliding = !1),
                      setTimeout(function() {
                        return I(o._element).trigger(h);
                      }, 0);
                  })
                  .emulateTransitionEnd(f);
              } else
                I(s).removeClass(z),
                  I(l).addClass(z),
                  (this._isSliding = !1),
                  I(this._element).trigger(h);
              c && this.cycle();
            }
          }),
          (t._jQueryInterface = function(e) {
            return this.each(function() {
              var n = I(this).data(j),
                r = o({}, B, I(this).data());
              'object' == typeof e && (r = o({}, r, e));
              var i = 'string' == typeof e ? e : r.slide;
              if (
                (n || ((n = new t(this, r)), I(this).data(j, n)),
                'number' == typeof e)
              )
                n.to(e);
              else if ('string' == typeof i) {
                if ('undefined' == typeof n[i])
                  throw new TypeError('No method named "' + i + '"');
                n[i]();
              } else r.interval && (n.pause(), n.cycle());
            });
          }),
          (t._dataApiClickHandler = function(e) {
            var n = fn.getSelectorFromElement(this);
            if (n) {
              var r = I(n)[0];
              if (r && I(r).hasClass(V)) {
                var i = o({}, I(r).data(), I(this).data()),
                  s = this.getAttribute('data-slide-to');
                s && (i.interval = !1),
                  t._jQueryInterface.call(I(r), i),
                  s &&
                    I(r)
                      .data(j)
                      .to(s),
                  e.preventDefault();
              }
            }
          }),
          i(t, null, [
            {
              key: 'VERSION',
              get: function() {
                return '4.1.1';
              }
            },
            {
              key: 'Default',
              get: function() {
                return B;
              }
            }
          ]),
          t
        );
      })()),
      I(document).on(W.CLICK_DATA_API, X.DATA_SLIDE, J._dataApiClickHandler),
      I(window).on(W.LOAD_DATA_API, function() {
        I(X.DATA_RIDE).each(function() {
          var t = I(this);
          J._jQueryInterface.call(t, t.data());
        });
      }),
      (I.fn[L] = J._jQueryInterface),
      (I.fn[L].Constructor = J),
      (I.fn[L].noConflict = function() {
        return (I.fn[L] = R), J._jQueryInterface;
      }),
      J),
      mn = ((tt = 'collapse'),
      (nt = '.' + (et = 'bs.collapse')),
      (rt = (Z = e).fn[tt]),
      (it = { toggle: !0, parent: '' }),
      (ot = { toggle: 'boolean', parent: '(string|element)' }),
      (st = {
        SHOW: 'show' + nt,
        SHOWN: 'shown' + nt,
        HIDE: 'hide' + nt,
        HIDDEN: 'hidden' + nt,
        CLICK_DATA_API: 'click' + nt + '.data-api'
      }),
      (at = 'show'),
      (lt = 'collapse'),
      (ut = 'collapsing'),
      (ct = 'collapsed'),
      (ht = 'width'),
      'height',
      (ft = {
        ACTIVES: '.show, .collapsing',
        DATA_TOGGLE: '[data-toggle="collapse"]'
      }),
      (dt = (function() {
        function t(t, e) {
          (this._isTransitioning = !1),
            (this._element = t),
            (this._config = this._getConfig(e)),
            (this._triggerArray = Z.makeArray(
              Z(
                '[data-toggle="collapse"][href="#' +
                  t.id +
                  '"],[data-toggle="collapse"][data-target="#' +
                  t.id +
                  '"]'
              )
            ));
          for (var n = Z(ft.DATA_TOGGLE), r = 0; r < n.length; r++) {
            var i = n[r],
              o = fn.getSelectorFromElement(i);
            null !== o &&
              0 < Z(o).filter(t).length &&
              ((this._selector = o), this._triggerArray.push(i));
          }
          (this._parent = this._config.parent ? this._getParent() : null),
            this._config.parent ||
              this._addAriaAndCollapsedClass(this._element, this._triggerArray),
            this._config.toggle && this.toggle();
        }
        var e = t.prototype;
        return (
          (e.toggle = function() {
            Z(this._element).hasClass(at) ? this.hide() : this.show();
          }),
          (e.show = function() {
            var e,
              n,
              r = this;
            if (
              !(
                this._isTransitioning ||
                Z(this._element).hasClass(at) ||
                (this._parent &&
                  0 ===
                    (e = Z.makeArray(
                      Z(this._parent)
                        .find(ft.ACTIVES)
                        .filter('[data-parent="' + this._config.parent + '"]')
                    )).length &&
                  (e = null),
                e &&
                  (n = Z(e)
                    .not(this._selector)
                    .data(et)) &&
                  n._isTransitioning)
              )
            ) {
              var i = Z.Event(st.SHOW);
              if ((Z(this._element).trigger(i), !i.isDefaultPrevented())) {
                e &&
                  (t._jQueryInterface.call(Z(e).not(this._selector), 'hide'),
                  n || Z(e).data(et, null));
                var o = this._getDimension();
                Z(this._element)
                  .removeClass(lt)
                  .addClass(ut),
                  (this._element.style[o] = 0) < this._triggerArray.length &&
                    Z(this._triggerArray)
                      .removeClass(ct)
                      .attr('aria-expanded', !0),
                  this.setTransitioning(!0);
                var s = 'scroll' + (o[0].toUpperCase() + o.slice(1)),
                  a = fn.getTransitionDurationFromElement(this._element);
                Z(this._element)
                  .one(fn.TRANSITION_END, function() {
                    Z(r._element)
                      .removeClass(ut)
                      .addClass(lt)
                      .addClass(at),
                      (r._element.style[o] = ''),
                      r.setTransitioning(!1),
                      Z(r._element).trigger(st.SHOWN);
                  })
                  .emulateTransitionEnd(a),
                  (this._element.style[o] = this._element[s] + 'px');
              }
            }
          }),
          (e.hide = function() {
            var t = this;
            if (!this._isTransitioning && Z(this._element).hasClass(at)) {
              var e = Z.Event(st.HIDE);
              if ((Z(this._element).trigger(e), !e.isDefaultPrevented())) {
                var n = this._getDimension();
                if (
                  ((this._element.style[n] =
                    this._element.getBoundingClientRect()[n] + 'px'),
                  fn.reflow(this._element),
                  Z(this._element)
                    .addClass(ut)
                    .removeClass(lt)
                    .removeClass(at),
                  0 < this._triggerArray.length)
                )
                  for (var r = 0; r < this._triggerArray.length; r++) {
                    var i = this._triggerArray[r],
                      o = fn.getSelectorFromElement(i);
                    null !== o &&
                      (Z(o).hasClass(at) ||
                        Z(i)
                          .addClass(ct)
                          .attr('aria-expanded', !1));
                  }
                this.setTransitioning(!0), (this._element.style[n] = '');
                var s = fn.getTransitionDurationFromElement(this._element);
                Z(this._element)
                  .one(fn.TRANSITION_END, function() {
                    t.setTransitioning(!1),
                      Z(t._element)
                        .removeClass(ut)
                        .addClass(lt)
                        .trigger(st.HIDDEN);
                  })
                  .emulateTransitionEnd(s);
              }
            }
          }),
          (e.setTransitioning = function(t) {
            this._isTransitioning = t;
          }),
          (e.dispose = function() {
            Z.removeData(this._element, et),
              (this._config = null),
              (this._parent = null),
              (this._element = null),
              (this._triggerArray = null),
              (this._isTransitioning = null);
          }),
          (e._getConfig = function(t) {
            return (
              ((t = o({}, it, t)).toggle = Boolean(t.toggle)),
              fn.typeCheckConfig(tt, t, ot),
              t
            );
          }),
          (e._getDimension = function() {
            return Z(this._element).hasClass(ht) ? ht : 'height';
          }),
          (e._getParent = function() {
            var e = this,
              n = null;
            fn.isElement(this._config.parent)
              ? ((n = this._config.parent),
                'undefined' != typeof this._config.parent.jquery &&
                  (n = this._config.parent[0]))
              : (n = Z(this._config.parent)[0]);
            var r =
              '[data-toggle="collapse"][data-parent="' +
              this._config.parent +
              '"]';
            return (
              Z(n)
                .find(r)
                .each(function(n, r) {
                  e._addAriaAndCollapsedClass(t._getTargetFromElement(r), [r]);
                }),
              n
            );
          }),
          (e._addAriaAndCollapsedClass = function(t, e) {
            if (t) {
              var n = Z(t).hasClass(at);
              0 < e.length &&
                Z(e)
                  .toggleClass(ct, !n)
                  .attr('aria-expanded', n);
            }
          }),
          (t._getTargetFromElement = function(t) {
            var e = fn.getSelectorFromElement(t);
            return e ? Z(e)[0] : null;
          }),
          (t._jQueryInterface = function(e) {
            return this.each(function() {
              var n = Z(this),
                r = n.data(et),
                i = o({}, it, n.data(), 'object' == typeof e && e ? e : {});
              if (
                (!r && i.toggle && /show|hide/.test(e) && (i.toggle = !1),
                r || ((r = new t(this, i)), n.data(et, r)),
                'string' == typeof e)
              ) {
                if ('undefined' == typeof r[e])
                  throw new TypeError('No method named "' + e + '"');
                r[e]();
              }
            });
          }),
          i(t, null, [
            {
              key: 'VERSION',
              get: function() {
                return '4.1.1';
              }
            },
            {
              key: 'Default',
              get: function() {
                return it;
              }
            }
          ]),
          t
        );
      })()),
      Z(document).on(st.CLICK_DATA_API, ft.DATA_TOGGLE, function(t) {
        'A' === t.currentTarget.tagName && t.preventDefault();
        var e = Z(this),
          n = fn.getSelectorFromElement(this);
        Z(n).each(function() {
          var t = Z(this),
            n = t.data(et) ? 'toggle' : e.data();
          dt._jQueryInterface.call(t, n);
        });
      }),
      (Z.fn[tt] = dt._jQueryInterface),
      (Z.fn[tt].Constructor = dt),
      (Z.fn[tt].noConflict = function() {
        return (Z.fn[tt] = rt), dt._jQueryInterface;
      }),
      dt),
      vn = ((gt = 'dropdown'),
      (vt = '.' + (mt = 'bs.dropdown')),
      (yt = '.data-api'),
      (_t = (pt = e).fn[gt]),
      (bt = new RegExp('38|40|27')),
      (wt = {
        HIDE: 'hide' + vt,
        HIDDEN: 'hidden' + vt,
        SHOW: 'show' + vt,
        SHOWN: 'shown' + vt,
        CLICK: 'click' + vt,
        CLICK_DATA_API: 'click' + vt + yt,
        KEYDOWN_DATA_API: 'keydown' + vt + yt,
        KEYUP_DATA_API: 'keyup' + vt + yt
      }),
      (xt = 'disabled'),
      (Et = 'show'),
      'dropup',
      (Tt = 'dropright'),
      (St = 'dropleft'),
      (Ct = 'dropdown-menu-right'),
      (kt = 'position-static'),
      (At = '[data-toggle="dropdown"]'),
      (Dt = '.dropdown form'),
      (Nt = '.dropdown-menu'),
      (It = '.navbar-nav'),
      (Lt = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'),
      (jt = 'top-start'),
      (qt = 'top-end'),
      (Ot = 'bottom-start'),
      (Rt = 'bottom-end'),
      (Bt = 'right-start'),
      (Mt = 'left-start'),
      (Pt = {
        offset: 0,
        flip: !0,
        boundary: 'scrollParent',
        reference: 'toggle',
        display: 'dynamic'
      }),
      (Ht = {
        offset: '(number|string|function)',
        flip: 'boolean',
        boundary: '(string|element)',
        reference: '(string|element)',
        display: 'string'
      }),
      (Ut = (function() {
        function t(t, e) {
          (this._element = t),
            (this._popper = null),
            (this._config = this._getConfig(e)),
            (this._menu = this._getMenuElement()),
            (this._inNavbar = this._detectNavbar()),
            this._addEventListeners();
        }
        var e = t.prototype;
        return (
          (e.toggle = function() {
            if (!this._element.disabled && !pt(this._element).hasClass(xt)) {
              var e = t._getParentFromElement(this._element),
                r = pt(this._menu).hasClass(Et);
              if ((t._clearMenus(), !r)) {
                var i = { relatedTarget: this._element },
                  o = pt.Event(wt.SHOW, i);
                if ((pt(e).trigger(o), !o.isDefaultPrevented())) {
                  if (!this._inNavbar) {
                    if ('undefined' == typeof n)
                      throw new TypeError(
                        'Bootstrap dropdown require Popper.js (https://popper.js.org)'
                      );
                    var s = this._element;
                    'parent' === this._config.reference
                      ? (s = e)
                      : fn.isElement(this._config.reference) &&
                        ((s = this._config.reference),
                        'undefined' != typeof this._config.reference.jquery &&
                          (s = this._config.reference[0])),
                      'scrollParent' !== this._config.boundary &&
                        pt(e).addClass(kt),
                      (this._popper = new n(
                        s,
                        this._menu,
                        this._getPopperConfig()
                      ));
                  }
                  'ontouchstart' in document.documentElement &&
                    0 === pt(e).closest(It).length &&
                    pt(document.body)
                      .children()
                      .on('mouseover', null, pt.noop),
                    this._element.focus(),
                    this._element.setAttribute('aria-expanded', !0),
                    pt(this._menu).toggleClass(Et),
                    pt(e)
                      .toggleClass(Et)
                      .trigger(pt.Event(wt.SHOWN, i));
                }
              }
            }
          }),
          (e.dispose = function() {
            pt.removeData(this._element, mt),
              pt(this._element).off(vt),
              (this._element = null),
              (this._menu = null) !== this._popper &&
                (this._popper.destroy(), (this._popper = null));
          }),
          (e.update = function() {
            (this._inNavbar = this._detectNavbar()),
              null !== this._popper && this._popper.scheduleUpdate();
          }),
          (e._addEventListeners = function() {
            var t = this;
            pt(this._element).on(wt.CLICK, function(e) {
              e.preventDefault(), e.stopPropagation(), t.toggle();
            });
          }),
          (e._getConfig = function(t) {
            return (
              (t = o(
                {},
                this.constructor.Default,
                pt(this._element).data(),
                t
              )),
              fn.typeCheckConfig(gt, t, this.constructor.DefaultType),
              t
            );
          }),
          (e._getMenuElement = function() {
            if (!this._menu) {
              var e = t._getParentFromElement(this._element);
              this._menu = pt(e).find(Nt)[0];
            }
            return this._menu;
          }),
          (e._getPlacement = function() {
            var t = pt(this._element).parent(),
              e = Ot;
            return (
              t.hasClass('dropup')
                ? ((e = jt), pt(this._menu).hasClass(Ct) && (e = qt))
                : t.hasClass(Tt)
                ? (e = Bt)
                : t.hasClass(St)
                ? (e = Mt)
                : pt(this._menu).hasClass(Ct) && (e = Rt),
              e
            );
          }),
          (e._detectNavbar = function() {
            return 0 < pt(this._element).closest('.navbar').length;
          }),
          (e._getPopperConfig = function() {
            var t = this,
              e = {};
            'function' == typeof this._config.offset
              ? (e.fn = function(e) {
                  return (
                    (e.offsets = o(
                      {},
                      e.offsets,
                      t._config.offset(e.offsets) || {}
                    )),
                    e
                  );
                })
              : (e.offset = this._config.offset);
            var n = {
              placement: this._getPlacement(),
              modifiers: {
                offset: e,
                flip: { enabled: this._config.flip },
                preventOverflow: { boundariesElement: this._config.boundary }
              }
            };
            return (
              'static' === this._config.display &&
                (n.modifiers.applyStyle = { enabled: !1 }),
              n
            );
          }),
          (t._jQueryInterface = function(e) {
            return this.each(function() {
              var n = pt(this).data(mt);
              if (
                (n ||
                  ((n = new t(this, 'object' == typeof e ? e : null)),
                  pt(this).data(mt, n)),
                'string' == typeof e)
              ) {
                if ('undefined' == typeof n[e])
                  throw new TypeError('No method named "' + e + '"');
                n[e]();
              }
            });
          }),
          (t._clearMenus = function(e) {
            if (!e || (3 !== e.which && ('keyup' !== e.type || 9 === e.which)))
              for (var n = pt.makeArray(pt(At)), r = 0; r < n.length; r++) {
                var i = t._getParentFromElement(n[r]),
                  o = pt(n[r]).data(mt),
                  s = { relatedTarget: n[r] };
                if (o) {
                  var a = o._menu;
                  if (
                    pt(i).hasClass(Et) &&
                    !(
                      e &&
                      (('click' === e.type &&
                        /input|textarea/i.test(e.target.tagName)) ||
                        ('keyup' === e.type && 9 === e.which)) &&
                      pt.contains(i, e.target)
                    )
                  ) {
                    var l = pt.Event(wt.HIDE, s);
                    pt(i).trigger(l),
                      l.isDefaultPrevented() ||
                        ('ontouchstart' in document.documentElement &&
                          pt(document.body)
                            .children()
                            .off('mouseover', null, pt.noop),
                        n[r].setAttribute('aria-expanded', 'false'),
                        pt(a).removeClass(Et),
                        pt(i)
                          .removeClass(Et)
                          .trigger(pt.Event(wt.HIDDEN, s)));
                  }
                }
              }
          }),
          (t._getParentFromElement = function(t) {
            var e,
              n = fn.getSelectorFromElement(t);
            return n && (e = pt(n)[0]), e || t.parentNode;
          }),
          (t._dataApiKeydownHandler = function(e) {
            if (
              (/input|textarea/i.test(e.target.tagName)
                ? !(
                    32 === e.which ||
                    (27 !== e.which &&
                      ((40 !== e.which && 38 !== e.which) ||
                        pt(e.target).closest(Nt).length))
                  )
                : bt.test(e.which)) &&
              (e.preventDefault(),
              e.stopPropagation(),
              !this.disabled && !pt(this).hasClass(xt))
            ) {
              var n = t._getParentFromElement(this),
                r = pt(n).hasClass(Et);
              if (
                (r || (27 === e.which && 32 === e.which)) &&
                (!r || (27 !== e.which && 32 !== e.which))
              ) {
                var i = pt(n)
                  .find(Lt)
                  .get();
                if (0 !== i.length) {
                  var o = i.indexOf(e.target);
                  38 === e.which && 0 < o && o--,
                    40 === e.which && o < i.length - 1 && o++,
                    o < 0 && (o = 0),
                    i[o].focus();
                }
              } else {
                if (27 === e.which) {
                  var s = pt(n).find(At)[0];
                  pt(s).trigger('focus');
                }
                pt(this).trigger('click');
              }
            }
          }),
          i(t, null, [
            {
              key: 'VERSION',
              get: function() {
                return '4.1.1';
              }
            },
            {
              key: 'Default',
              get: function() {
                return Pt;
              }
            },
            {
              key: 'DefaultType',
              get: function() {
                return Ht;
              }
            }
          ]),
          t
        );
      })()),
      pt(document)
        .on(wt.KEYDOWN_DATA_API, At, Ut._dataApiKeydownHandler)
        .on(wt.KEYDOWN_DATA_API, Nt, Ut._dataApiKeydownHandler)
        .on(wt.CLICK_DATA_API + ' ' + wt.KEYUP_DATA_API, Ut._clearMenus)
        .on(wt.CLICK_DATA_API, At, function(t) {
          t.preventDefault(),
            t.stopPropagation(),
            Ut._jQueryInterface.call(pt(this), 'toggle');
        })
        .on(wt.CLICK_DATA_API, Dt, function(t) {
          t.stopPropagation();
        }),
      (pt.fn[gt] = Ut._jQueryInterface),
      (pt.fn[gt].Constructor = Ut),
      (pt.fn[gt].noConflict = function() {
        return (pt.fn[gt] = _t), Ut._jQueryInterface;
      }),
      Ut),
      yn = ((Wt = 'modal'),
      (zt = '.' + (Vt = 'bs.modal')),
      (Gt = (Ft = e).fn[Wt]),
      (Kt = { backdrop: !0, keyboard: !0, focus: !0, show: !0 }),
      (Qt = {
        backdrop: '(boolean|string)',
        keyboard: 'boolean',
        focus: 'boolean',
        show: 'boolean'
      }),
      (Yt = {
        HIDE: 'hide' + zt,
        HIDDEN: 'hidden' + zt,
        SHOW: 'show' + zt,
        SHOWN: 'shown' + zt,
        FOCUSIN: 'focusin' + zt,
        RESIZE: 'resize' + zt,
        CLICK_DISMISS: 'click.dismiss' + zt,
        KEYDOWN_DISMISS: 'keydown.dismiss' + zt,
        MOUSEUP_DISMISS: 'mouseup.dismiss' + zt,
        MOUSEDOWN_DISMISS: 'mousedown.dismiss' + zt,
        CLICK_DATA_API: 'click' + zt + '.data-api'
      }),
      ($t = 'modal-scrollbar-measure'),
      (Xt = 'modal-backdrop'),
      (Jt = 'modal-open'),
      (Zt = 'fade'),
      (te = 'show'),
      (ee = {
        DIALOG: '.modal-dialog',
        DATA_TOGGLE: '[data-toggle="modal"]',
        DATA_DISMISS: '[data-dismiss="modal"]',
        FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
        STICKY_CONTENT: '.sticky-top',
        NAVBAR_TOGGLER: '.navbar-toggler'
      }),
      (ne = (function() {
        function t(t, e) {
          (this._config = this._getConfig(e)),
            (this._element = t),
            (this._dialog = Ft(t).find(ee.DIALOG)[0]),
            (this._backdrop = null),
            (this._isShown = !1),
            (this._isBodyOverflowing = !1),
            (this._ignoreBackdropClick = !1),
            (this._scrollbarWidth = 0);
        }
        var e = t.prototype;
        return (
          (e.toggle = function(t) {
            return this._isShown ? this.hide() : this.show(t);
          }),
          (e.show = function(t) {
            var e = this;
            if (!this._isTransitioning && !this._isShown) {
              Ft(this._element).hasClass(Zt) && (this._isTransitioning = !0);
              var n = Ft.Event(Yt.SHOW, { relatedTarget: t });
              Ft(this._element).trigger(n),
                this._isShown ||
                  n.isDefaultPrevented() ||
                  ((this._isShown = !0),
                  this._checkScrollbar(),
                  this._setScrollbar(),
                  this._adjustDialog(),
                  Ft(document.body).addClass(Jt),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  Ft(this._element).on(
                    Yt.CLICK_DISMISS,
                    ee.DATA_DISMISS,
                    function(t) {
                      return e.hide(t);
                    }
                  ),
                  Ft(this._dialog).on(Yt.MOUSEDOWN_DISMISS, function() {
                    Ft(e._element).one(Yt.MOUSEUP_DISMISS, function(t) {
                      Ft(t.target).is(e._element) &&
                        (e._ignoreBackdropClick = !0);
                    });
                  }),
                  this._showBackdrop(function() {
                    return e._showElement(t);
                  }));
            }
          }),
          (e.hide = function(t) {
            var e = this;
            if (
              (t && t.preventDefault(), !this._isTransitioning && this._isShown)
            ) {
              var n = Ft.Event(Yt.HIDE);
              if (
                (Ft(this._element).trigger(n),
                this._isShown && !n.isDefaultPrevented())
              ) {
                this._isShown = !1;
                var r = Ft(this._element).hasClass(Zt);
                if (
                  (r && (this._isTransitioning = !0),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  Ft(document).off(Yt.FOCUSIN),
                  Ft(this._element).removeClass(te),
                  Ft(this._element).off(Yt.CLICK_DISMISS),
                  Ft(this._dialog).off(Yt.MOUSEDOWN_DISMISS),
                  r)
                ) {
                  var i = fn.getTransitionDurationFromElement(this._element);
                  Ft(this._element)
                    .one(fn.TRANSITION_END, function(t) {
                      return e._hideModal(t);
                    })
                    .emulateTransitionEnd(i);
                } else this._hideModal();
              }
            }
          }),
          (e.dispose = function() {
            Ft.removeData(this._element, Vt),
              Ft(window, document, this._element, this._backdrop).off(zt),
              (this._config = null),
              (this._element = null),
              (this._dialog = null),
              (this._backdrop = null),
              (this._isShown = null),
              (this._isBodyOverflowing = null),
              (this._ignoreBackdropClick = null),
              (this._scrollbarWidth = null);
          }),
          (e.handleUpdate = function() {
            this._adjustDialog();
          }),
          (e._getConfig = function(t) {
            return (t = o({}, Kt, t)), fn.typeCheckConfig(Wt, t, Qt), t;
          }),
          (e._showElement = function(t) {
            var e = this,
              n = Ft(this._element).hasClass(Zt);
            (this._element.parentNode &&
              this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
              document.body.appendChild(this._element),
              (this._element.style.display = 'block'),
              this._element.removeAttribute('aria-hidden'),
              (this._element.scrollTop = 0),
              n && fn.reflow(this._element),
              Ft(this._element).addClass(te),
              this._config.focus && this._enforceFocus();
            var r = Ft.Event(Yt.SHOWN, { relatedTarget: t }),
              i = function() {
                e._config.focus && e._element.focus(),
                  (e._isTransitioning = !1),
                  Ft(e._element).trigger(r);
              };
            if (n) {
              var o = fn.getTransitionDurationFromElement(this._element);
              Ft(this._dialog)
                .one(fn.TRANSITION_END, i)
                .emulateTransitionEnd(o);
            } else i();
          }),
          (e._enforceFocus = function() {
            var t = this;
            Ft(document)
              .off(Yt.FOCUSIN)
              .on(Yt.FOCUSIN, function(e) {
                document !== e.target &&
                  t._element !== e.target &&
                  0 === Ft(t._element).has(e.target).length &&
                  t._element.focus();
              });
          }),
          (e._setEscapeEvent = function() {
            var t = this;
            this._isShown && this._config.keyboard
              ? Ft(this._element).on(Yt.KEYDOWN_DISMISS, function(e) {
                  27 === e.which && (e.preventDefault(), t.hide());
                })
              : this._isShown || Ft(this._element).off(Yt.KEYDOWN_DISMISS);
          }),
          (e._setResizeEvent = function() {
            var t = this;
            this._isShown
              ? Ft(window).on(Yt.RESIZE, function(e) {
                  return t.handleUpdate(e);
                })
              : Ft(window).off(Yt.RESIZE);
          }),
          (e._hideModal = function() {
            var t = this;
            (this._element.style.display = 'none'),
              this._element.setAttribute('aria-hidden', !0),
              (this._isTransitioning = !1),
              this._showBackdrop(function() {
                Ft(document.body).removeClass(Jt),
                  t._resetAdjustments(),
                  t._resetScrollbar(),
                  Ft(t._element).trigger(Yt.HIDDEN);
              });
          }),
          (e._removeBackdrop = function() {
            this._backdrop &&
              (Ft(this._backdrop).remove(), (this._backdrop = null));
          }),
          (e._showBackdrop = function(t) {
            var e = this,
              n = Ft(this._element).hasClass(Zt) ? Zt : '';
            if (this._isShown && this._config.backdrop) {
              if (
                ((this._backdrop = document.createElement('div')),
                (this._backdrop.className = Xt),
                n && Ft(this._backdrop).addClass(n),
                Ft(this._backdrop).appendTo(document.body),
                Ft(this._element).on(Yt.CLICK_DISMISS, function(t) {
                  e._ignoreBackdropClick
                    ? (e._ignoreBackdropClick = !1)
                    : t.target === t.currentTarget &&
                      ('static' === e._config.backdrop
                        ? e._element.focus()
                        : e.hide());
                }),
                n && fn.reflow(this._backdrop),
                Ft(this._backdrop).addClass(te),
                !t)
              )
                return;
              if (!n) return void t();
              var r = fn.getTransitionDurationFromElement(this._backdrop);
              Ft(this._backdrop)
                .one(fn.TRANSITION_END, t)
                .emulateTransitionEnd(r);
            } else if (!this._isShown && this._backdrop) {
              Ft(this._backdrop).removeClass(te);
              var i = function() {
                e._removeBackdrop(), t && t();
              };
              if (Ft(this._element).hasClass(Zt)) {
                var o = fn.getTransitionDurationFromElement(this._backdrop);
                Ft(this._backdrop)
                  .one(fn.TRANSITION_END, i)
                  .emulateTransitionEnd(o);
              } else i();
            } else t && t();
          }),
          (e._adjustDialog = function() {
            var t =
              this._element.scrollHeight >
              document.documentElement.clientHeight;
            !this._isBodyOverflowing &&
              t &&
              (this._element.style.paddingLeft = this._scrollbarWidth + 'px'),
              this._isBodyOverflowing &&
                !t &&
                (this._element.style.paddingRight =
                  this._scrollbarWidth + 'px');
          }),
          (e._resetAdjustments = function() {
            (this._element.style.paddingLeft = ''),
              (this._element.style.paddingRight = '');
          }),
          (e._checkScrollbar = function() {
            var t = document.body.getBoundingClientRect();
            (this._isBodyOverflowing = t.left + t.right < window.innerWidth),
              (this._scrollbarWidth = this._getScrollbarWidth());
          }),
          (e._setScrollbar = function() {
            var t = this;
            if (this._isBodyOverflowing) {
              Ft(ee.FIXED_CONTENT).each(function(e, n) {
                var r = Ft(n)[0].style.paddingRight,
                  i = Ft(n).css('padding-right');
                Ft(n)
                  .data('padding-right', r)
                  .css(
                    'padding-right',
                    parseFloat(i) + t._scrollbarWidth + 'px'
                  );
              }),
                Ft(ee.STICKY_CONTENT).each(function(e, n) {
                  var r = Ft(n)[0].style.marginRight,
                    i = Ft(n).css('margin-right');
                  Ft(n)
                    .data('margin-right', r)
                    .css(
                      'margin-right',
                      parseFloat(i) - t._scrollbarWidth + 'px'
                    );
                }),
                Ft(ee.NAVBAR_TOGGLER).each(function(e, n) {
                  var r = Ft(n)[0].style.marginRight,
                    i = Ft(n).css('margin-right');
                  Ft(n)
                    .data('margin-right', r)
                    .css(
                      'margin-right',
                      parseFloat(i) + t._scrollbarWidth + 'px'
                    );
                });
              var e = document.body.style.paddingRight,
                n = Ft(document.body).css('padding-right');
              Ft(document.body)
                .data('padding-right', e)
                .css(
                  'padding-right',
                  parseFloat(n) + this._scrollbarWidth + 'px'
                );
            }
          }),
          (e._resetScrollbar = function() {
            Ft(ee.FIXED_CONTENT).each(function(t, e) {
              var n = Ft(e).data('padding-right');
              'undefined' != typeof n &&
                Ft(e)
                  .css('padding-right', n)
                  .removeData('padding-right');
            }),
              Ft(ee.STICKY_CONTENT + ', ' + ee.NAVBAR_TOGGLER).each(function(
                t,
                e
              ) {
                var n = Ft(e).data('margin-right');
                'undefined' != typeof n &&
                  Ft(e)
                    .css('margin-right', n)
                    .removeData('margin-right');
              });
            var t = Ft(document.body).data('padding-right');
            'undefined' != typeof t &&
              Ft(document.body)
                .css('padding-right', t)
                .removeData('padding-right');
          }),
          (e._getScrollbarWidth = function() {
            var t = document.createElement('div');
            (t.className = $t), document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e;
          }),
          (t._jQueryInterface = function(e, n) {
            return this.each(function() {
              var r = Ft(this).data(Vt),
                i = o(
                  {},
                  Kt,
                  Ft(this).data(),
                  'object' == typeof e && e ? e : {}
                );
              if (
                (r || ((r = new t(this, i)), Ft(this).data(Vt, r)),
                'string' == typeof e)
              ) {
                if ('undefined' == typeof r[e])
                  throw new TypeError('No method named "' + e + '"');
                r[e](n);
              } else i.show && r.show(n);
            });
          }),
          i(t, null, [
            {
              key: 'VERSION',
              get: function() {
                return '4.1.1';
              }
            },
            {
              key: 'Default',
              get: function() {
                return Kt;
              }
            }
          ]),
          t
        );
      })()),
      Ft(document).on(Yt.CLICK_DATA_API, ee.DATA_TOGGLE, function(t) {
        var e,
          n = this,
          r = fn.getSelectorFromElement(this);
        r && (e = Ft(r)[0]);
        var i = Ft(e).data(Vt)
          ? 'toggle'
          : o({}, Ft(e).data(), Ft(this).data());
        ('A' !== this.tagName && 'AREA' !== this.tagName) || t.preventDefault();
        var s = Ft(e).one(Yt.SHOW, function(t) {
          t.isDefaultPrevented() ||
            s.one(Yt.HIDDEN, function() {
              Ft(n).is(':visible') && n.focus();
            });
        });
        ne._jQueryInterface.call(Ft(e), i, this);
      }),
      (Ft.fn[Wt] = ne._jQueryInterface),
      (Ft.fn[Wt].Constructor = ne),
      (Ft.fn[Wt].noConflict = function() {
        return (Ft.fn[Wt] = Gt), ne._jQueryInterface;
      }),
      ne),
      _n = ((ie = 'tooltip'),
      (se = '.' + (oe = 'bs.tooltip')),
      (ae = (re = e).fn[ie]),
      (le = 'bs-tooltip'),
      (ue = new RegExp('(^|\\s)' + le + '\\S+', 'g')),
      (fe = {
        animation: !0,
        template:
          '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: !(he = {
          AUTO: 'auto',
          TOP: 'top',
          RIGHT: 'right',
          BOTTOM: 'bottom',
          LEFT: 'left'
        }),
        selector: !(ce = {
          animation: 'boolean',
          template: 'string',
          title: '(string|element|function)',
          trigger: 'string',
          delay: '(number|object)',
          html: 'boolean',
          selector: '(string|boolean)',
          placement: '(string|function)',
          offset: '(number|string)',
          container: '(string|element|boolean)',
          fallbackPlacement: '(string|array)',
          boundary: '(string|element)'
        }),
        placement: 'top',
        offset: 0,
        container: !1,
        fallbackPlacement: 'flip',
        boundary: 'scrollParent'
      }),
      (pe = 'out'),
      (ge = {
        HIDE: 'hide' + se,
        HIDDEN: 'hidden' + se,
        SHOW: (de = 'show') + se,
        SHOWN: 'shown' + se,
        INSERTED: 'inserted' + se,
        CLICK: 'click' + se,
        FOCUSIN: 'focusin' + se,
        FOCUSOUT: 'focusout' + se,
        MOUSEENTER: 'mouseenter' + se,
        MOUSELEAVE: 'mouseleave' + se
      }),
      (me = 'fade'),
      (ve = 'show'),
      (ye = '.tooltip-inner'),
      '.arrow',
      (_e = 'hover'),
      (be = 'focus'),
      'click',
      'manual',
      (we = (function() {
        function t(t, e) {
          if ('undefined' == typeof n)
            throw new TypeError(
              'Bootstrap tooltips require Popper.js (https://popper.js.org)'
            );
          (this._isEnabled = !0),
            (this._timeout = 0),
            (this._hoverState = ''),
            (this._activeTrigger = {}),
            (this._popper = null),
            (this.element = t),
            (this.config = this._getConfig(e)),
            (this.tip = null),
            this._setListeners();
        }
        var e = t.prototype;
        return (
          (e.enable = function() {
            this._isEnabled = !0;
          }),
          (e.disable = function() {
            this._isEnabled = !1;
          }),
          (e.toggleEnabled = function() {
            this._isEnabled = !this._isEnabled;
          }),
          (e.toggle = function(t) {
            if (this._isEnabled)
              if (t) {
                var e = this.constructor.DATA_KEY,
                  n = re(t.currentTarget).data(e);
                n ||
                  ((n = new this.constructor(
                    t.currentTarget,
                    this._getDelegateConfig()
                  )),
                  re(t.currentTarget).data(e, n)),
                  (n._activeTrigger.click = !n._activeTrigger.click),
                  n._isWithActiveTrigger()
                    ? n._enter(null, n)
                    : n._leave(null, n);
              } else {
                if (re(this.getTipElement()).hasClass(ve))
                  return void this._leave(null, this);
                this._enter(null, this);
              }
          }),
          (e.dispose = function() {
            clearTimeout(this._timeout),
              re.removeData(this.element, this.constructor.DATA_KEY),
              re(this.element).off(this.constructor.EVENT_KEY),
              re(this.element)
                .closest('.modal')
                .off('hide.bs.modal'),
              this.tip && re(this.tip).remove(),
              (this._isEnabled = null),
              (this._timeout = null),
              (this._hoverState = null),
              (this._activeTrigger = null) !== this._popper &&
                this._popper.destroy(),
              (this._popper = null),
              (this.element = null),
              (this.config = null),
              (this.tip = null);
          }),
          (e.show = function() {
            var t = this;
            if ('none' === re(this.element).css('display'))
              throw new Error('Please use show on visible elements');
            var e = re.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
              re(this.element).trigger(e);
              var r = re.contains(
                this.element.ownerDocument.documentElement,
                this.element
              );
              if (e.isDefaultPrevented() || !r) return;
              var i = this.getTipElement(),
                o = fn.getUID(this.constructor.NAME);
              i.setAttribute('id', o),
                this.element.setAttribute('aria-describedby', o),
                this.setContent(),
                this.config.animation && re(i).addClass(me);
              var s =
                  'function' == typeof this.config.placement
                    ? this.config.placement.call(this, i, this.element)
                    : this.config.placement,
                a = this._getAttachment(s);
              this.addAttachmentClass(a);
              var l =
                !1 === this.config.container
                  ? document.body
                  : re(this.config.container);
              re(i).data(this.constructor.DATA_KEY, this),
                re.contains(
                  this.element.ownerDocument.documentElement,
                  this.tip
                ) || re(i).appendTo(l),
                re(this.element).trigger(this.constructor.Event.INSERTED),
                (this._popper = new n(this.element, i, {
                  placement: a,
                  modifiers: {
                    offset: { offset: this.config.offset },
                    flip: { behavior: this.config.fallbackPlacement },
                    arrow: { element: '.arrow' },
                    preventOverflow: { boundariesElement: this.config.boundary }
                  },
                  onCreate: function(e) {
                    e.originalPlacement !== e.placement &&
                      t._handlePopperPlacementChange(e);
                  },
                  onUpdate: function(e) {
                    t._handlePopperPlacementChange(e);
                  }
                })),
                re(i).addClass(ve),
                'ontouchstart' in document.documentElement &&
                  re(document.body)
                    .children()
                    .on('mouseover', null, re.noop);
              var u = function() {
                t.config.animation && t._fixTransition();
                var e = t._hoverState;
                (t._hoverState = null),
                  re(t.element).trigger(t.constructor.Event.SHOWN),
                  e === pe && t._leave(null, t);
              };
              if (re(this.tip).hasClass(me)) {
                var c = fn.getTransitionDurationFromElement(this.tip);
                re(this.tip)
                  .one(fn.TRANSITION_END, u)
                  .emulateTransitionEnd(c);
              } else u();
            }
          }),
          (e.hide = function(t) {
            var e = this,
              n = this.getTipElement(),
              r = re.Event(this.constructor.Event.HIDE),
              i = function() {
                e._hoverState !== de &&
                  n.parentNode &&
                  n.parentNode.removeChild(n),
                  e._cleanTipClass(),
                  e.element.removeAttribute('aria-describedby'),
                  re(e.element).trigger(e.constructor.Event.HIDDEN),
                  null !== e._popper && e._popper.destroy(),
                  t && t();
              };
            if ((re(this.element).trigger(r), !r.isDefaultPrevented())) {
              if (
                (re(n).removeClass(ve),
                'ontouchstart' in document.documentElement &&
                  re(document.body)
                    .children()
                    .off('mouseover', null, re.noop),
                (this._activeTrigger.click = !1),
                (this._activeTrigger[be] = !1),
                (this._activeTrigger[_e] = !1),
                re(this.tip).hasClass(me))
              ) {
                var o = fn.getTransitionDurationFromElement(n);
                re(n)
                  .one(fn.TRANSITION_END, i)
                  .emulateTransitionEnd(o);
              } else i();
              this._hoverState = '';
            }
          }),
          (e.update = function() {
            null !== this._popper && this._popper.scheduleUpdate();
          }),
          (e.isWithContent = function() {
            return Boolean(this.getTitle());
          }),
          (e.addAttachmentClass = function(t) {
            re(this.getTipElement()).addClass(le + '-' + t);
          }),
          (e.getTipElement = function() {
            return (
              (this.tip = this.tip || re(this.config.template)[0]), this.tip
            );
          }),
          (e.setContent = function() {
            var t = re(this.getTipElement());
            this.setElementContent(t.find(ye), this.getTitle()),
              t.removeClass(me + ' ' + ve);
          }),
          (e.setElementContent = function(t, e) {
            var n = this.config.html;
            'object' == typeof e && (e.nodeType || e.jquery)
              ? n
                ? re(e)
                    .parent()
                    .is(t) || t.empty().append(e)
                : t.text(re(e).text())
              : t[n ? 'html' : 'text'](e);
          }),
          (e.getTitle = function() {
            var t = this.element.getAttribute('data-original-title');
            return (
              t ||
                (t =
                  'function' == typeof this.config.title
                    ? this.config.title.call(this.element)
                    : this.config.title),
              t
            );
          }),
          (e._getAttachment = function(t) {
            return he[t.toUpperCase()];
          }),
          (e._setListeners = function() {
            var t = this;
            this.config.trigger.split(' ').forEach(function(e) {
              if ('click' === e)
                re(t.element).on(
                  t.constructor.Event.CLICK,
                  t.config.selector,
                  function(e) {
                    return t.toggle(e);
                  }
                );
              else if ('manual' !== e) {
                var n =
                    e === _e
                      ? t.constructor.Event.MOUSEENTER
                      : t.constructor.Event.FOCUSIN,
                  r =
                    e === _e
                      ? t.constructor.Event.MOUSELEAVE
                      : t.constructor.Event.FOCUSOUT;
                re(t.element)
                  .on(n, t.config.selector, function(e) {
                    return t._enter(e);
                  })
                  .on(r, t.config.selector, function(e) {
                    return t._leave(e);
                  });
              }
              re(t.element)
                .closest('.modal')
                .on('hide.bs.modal', function() {
                  return t.hide();
                });
            }),
              this.config.selector
                ? (this.config = o({}, this.config, {
                    trigger: 'manual',
                    selector: ''
                  }))
                : this._fixTitle();
          }),
          (e._fixTitle = function() {
            var t = typeof this.element.getAttribute('data-original-title');
            (this.element.getAttribute('title') || 'string' !== t) &&
              (this.element.setAttribute(
                'data-original-title',
                this.element.getAttribute('title') || ''
              ),
              this.element.setAttribute('title', ''));
          }),
          (e._enter = function(t, e) {
            var n = this.constructor.DATA_KEY;
            (e = e || re(t.currentTarget).data(n)) ||
              ((e = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
              re(t.currentTarget).data(n, e)),
              t && (e._activeTrigger['focusin' === t.type ? be : _e] = !0),
              re(e.getTipElement()).hasClass(ve) || e._hoverState === de
                ? (e._hoverState = de)
                : (clearTimeout(e._timeout),
                  (e._hoverState = de),
                  e.config.delay && e.config.delay.show
                    ? (e._timeout = setTimeout(function() {
                        e._hoverState === de && e.show();
                      }, e.config.delay.show))
                    : e.show());
          }),
          (e._leave = function(t, e) {
            var n = this.constructor.DATA_KEY;
            (e = e || re(t.currentTarget).data(n)) ||
              ((e = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
              re(t.currentTarget).data(n, e)),
              t && (e._activeTrigger['focusout' === t.type ? be : _e] = !1),
              e._isWithActiveTrigger() ||
                (clearTimeout(e._timeout),
                (e._hoverState = pe),
                e.config.delay && e.config.delay.hide
                  ? (e._timeout = setTimeout(function() {
                      e._hoverState === pe && e.hide();
                    }, e.config.delay.hide))
                  : e.hide());
          }),
          (e._isWithActiveTrigger = function() {
            for (var t in this._activeTrigger)
              if (this._activeTrigger[t]) return !0;
            return !1;
          }),
          (e._getConfig = function(t) {
            return (
              'number' ==
                typeof (t = o(
                  {},
                  this.constructor.Default,
                  re(this.element).data(),
                  'object' == typeof t && t ? t : {}
                )).delay && (t.delay = { show: t.delay, hide: t.delay }),
              'number' == typeof t.title && (t.title = t.title.toString()),
              'number' == typeof t.content &&
                (t.content = t.content.toString()),
              fn.typeCheckConfig(ie, t, this.constructor.DefaultType),
              t
            );
          }),
          (e._getDelegateConfig = function() {
            var t = {};
            if (this.config)
              for (var e in this.config)
                this.constructor.Default[e] !== this.config[e] &&
                  (t[e] = this.config[e]);
            return t;
          }),
          (e._cleanTipClass = function() {
            var t = re(this.getTipElement()),
              e = t.attr('class').match(ue);
            null !== e && 0 < e.length && t.removeClass(e.join(''));
          }),
          (e._handlePopperPlacementChange = function(t) {
            this._cleanTipClass(),
              this.addAttachmentClass(this._getAttachment(t.placement));
          }),
          (e._fixTransition = function() {
            var t = this.getTipElement(),
              e = this.config.animation;
            null === t.getAttribute('x-placement') &&
              (re(t).removeClass(me),
              (this.config.animation = !1),
              this.hide(),
              this.show(),
              (this.config.animation = e));
          }),
          (t._jQueryInterface = function(e) {
            return this.each(function() {
              var n = re(this).data(oe),
                r = 'object' == typeof e && e;
              if (
                (n || !/dispose|hide/.test(e)) &&
                (n || ((n = new t(this, r)), re(this).data(oe, n)),
                'string' == typeof e)
              ) {
                if ('undefined' == typeof n[e])
                  throw new TypeError('No method named "' + e + '"');
                n[e]();
              }
            });
          }),
          i(t, null, [
            {
              key: 'VERSION',
              get: function() {
                return '4.1.1';
              }
            },
            {
              key: 'Default',
              get: function() {
                return fe;
              }
            },
            {
              key: 'NAME',
              get: function() {
                return ie;
              }
            },
            {
              key: 'DATA_KEY',
              get: function() {
                return oe;
              }
            },
            {
              key: 'Event',
              get: function() {
                return ge;
              }
            },
            {
              key: 'EVENT_KEY',
              get: function() {
                return se;
              }
            },
            {
              key: 'DefaultType',
              get: function() {
                return ce;
              }
            }
          ]),
          t
        );
      })()),
      (re.fn[ie] = we._jQueryInterface),
      (re.fn[ie].Constructor = we),
      (re.fn[ie].noConflict = function() {
        return (re.fn[ie] = ae), we._jQueryInterface;
      }),
      we),
      bn = ((Ee = 'popover'),
      (Se = '.' + (Te = 'bs.popover')),
      (Ce = (xe = e).fn[Ee]),
      (ke = 'bs-popover'),
      (Ae = new RegExp('(^|\\s)' + ke + '\\S+', 'g')),
      (De = o({}, _n.Default, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
      })),
      (Ne = o({}, _n.DefaultType, { content: '(string|element|function)' })),
      'fade',
      (Ie = '.popover-header'),
      (Le = '.popover-body'),
      (je = {
        HIDE: 'hide' + Se,
        HIDDEN: 'hidden' + Se,
        SHOW: 'show' + Se,
        SHOWN: 'shown' + Se,
        INSERTED: 'inserted' + Se,
        CLICK: 'click' + Se,
        FOCUSIN: 'focusin' + Se,
        FOCUSOUT: 'focusout' + Se,
        MOUSEENTER: 'mouseenter' + Se,
        MOUSELEAVE: 'mouseleave' + Se
      }),
      (qe = (function(t) {
        var e, n;
        function r() {
          return t.apply(this, arguments) || this;
        }
        (n = t),
          ((e = r).prototype = Object.create(n.prototype)),
          ((e.prototype.constructor = e).__proto__ = n);
        var o = r.prototype;
        return (
          (o.isWithContent = function() {
            return this.getTitle() || this._getContent();
          }),
          (o.addAttachmentClass = function(t) {
            xe(this.getTipElement()).addClass(ke + '-' + t);
          }),
          (o.getTipElement = function() {
            return (
              (this.tip = this.tip || xe(this.config.template)[0]), this.tip
            );
          }),
          (o.setContent = function() {
            var t = xe(this.getTipElement());
            this.setElementContent(t.find(Ie), this.getTitle());
            var e = this._getContent();
            'function' == typeof e && (e = e.call(this.element)),
              this.setElementContent(t.find(Le), e),
              t.removeClass('fade show');
          }),
          (o._getContent = function() {
            return (
              this.element.getAttribute('data-content') || this.config.content
            );
          }),
          (o._cleanTipClass = function() {
            var t = xe(this.getTipElement()),
              e = t.attr('class').match(Ae);
            null !== e && 0 < e.length && t.removeClass(e.join(''));
          }),
          (r._jQueryInterface = function(t) {
            return this.each(function() {
              var e = xe(this).data(Te),
                n = 'object' == typeof t ? t : null;
              if (
                (e || !/destroy|hide/.test(t)) &&
                (e || ((e = new r(this, n)), xe(this).data(Te, e)),
                'string' == typeof t)
              ) {
                if ('undefined' == typeof e[t])
                  throw new TypeError('No method named "' + t + '"');
                e[t]();
              }
            });
          }),
          i(r, null, [
            {
              key: 'VERSION',
              get: function() {
                return '4.1.1';
              }
            },
            {
              key: 'Default',
              get: function() {
                return De;
              }
            },
            {
              key: 'NAME',
              get: function() {
                return Ee;
              }
            },
            {
              key: 'DATA_KEY',
              get: function() {
                return Te;
              }
            },
            {
              key: 'Event',
              get: function() {
                return je;
              }
            },
            {
              key: 'EVENT_KEY',
              get: function() {
                return Se;
              }
            },
            {
              key: 'DefaultType',
              get: function() {
                return Ne;
              }
            }
          ]),
          r
        );
      })(_n)),
      (xe.fn[Ee] = qe._jQueryInterface),
      (xe.fn[Ee].Constructor = qe),
      (xe.fn[Ee].noConflict = function() {
        return (xe.fn[Ee] = Ce), qe._jQueryInterface;
      }),
      qe),
      wn = ((Re = 'scrollspy'),
      (Me = '.' + (Be = 'bs.scrollspy')),
      (Pe = (Oe = e).fn[Re]),
      (He = { offset: 10, method: 'auto', target: '' }),
      (Ue = { offset: 'number', method: 'string', target: '(string|element)' }),
      (Fe = {
        ACTIVATE: 'activate' + Me,
        SCROLL: 'scroll' + Me,
        LOAD_DATA_API: 'load' + Me + '.data-api'
      }),
      (We = 'dropdown-item'),
      (Ve = 'active'),
      (ze = {
        DATA_SPY: '[data-spy="scroll"]',
        ACTIVE: '.active',
        NAV_LIST_GROUP: '.nav, .list-group',
        NAV_LINKS: '.nav-link',
        NAV_ITEMS: '.nav-item',
        LIST_ITEMS: '.list-group-item',
        DROPDOWN: '.dropdown',
        DROPDOWN_ITEMS: '.dropdown-item',
        DROPDOWN_TOGGLE: '.dropdown-toggle'
      }),
      'offset',
      (Ge = 'position'),
      (Ke = (function() {
        function t(t, e) {
          var n = this;
          (this._element = t),
            (this._scrollElement = 'BODY' === t.tagName ? window : t),
            (this._config = this._getConfig(e)),
            (this._selector =
              this._config.target +
              ' ' +
              ze.NAV_LINKS +
              ',' +
              this._config.target +
              ' ' +
              ze.LIST_ITEMS +
              ',' +
              this._config.target +
              ' ' +
              ze.DROPDOWN_ITEMS),
            (this._offsets = []),
            (this._targets = []),
            (this._activeTarget = null),
            (this._scrollHeight = 0),
            Oe(this._scrollElement).on(Fe.SCROLL, function(t) {
              return n._process(t);
            }),
            this.refresh(),
            this._process();
        }
        var e = t.prototype;
        return (
          (e.refresh = function() {
            var t = this,
              e =
                this._scrollElement === this._scrollElement.window
                  ? 'offset'
                  : Ge,
              n = 'auto' === this._config.method ? e : this._config.method,
              r = n === Ge ? this._getScrollTop() : 0;
            (this._offsets = []),
              (this._targets = []),
              (this._scrollHeight = this._getScrollHeight()),
              Oe.makeArray(Oe(this._selector))
                .map(function(t) {
                  var e,
                    i = fn.getSelectorFromElement(t);
                  if ((i && (e = Oe(i)[0]), e)) {
                    var o = e.getBoundingClientRect();
                    if (o.width || o.height) return [Oe(e)[n]().top + r, i];
                  }
                  return null;
                })
                .filter(function(t) {
                  return t;
                })
                .sort(function(t, e) {
                  return t[0] - e[0];
                })
                .forEach(function(e) {
                  t._offsets.push(e[0]), t._targets.push(e[1]);
                });
          }),
          (e.dispose = function() {
            Oe.removeData(this._element, Be),
              Oe(this._scrollElement).off(Me),
              (this._element = null),
              (this._scrollElement = null),
              (this._config = null),
              (this._selector = null),
              (this._offsets = null),
              (this._targets = null),
              (this._activeTarget = null),
              (this._scrollHeight = null);
          }),
          (e._getConfig = function(t) {
            if (
              'string' !=
              typeof (t = o({}, He, 'object' == typeof t && t ? t : {})).target
            ) {
              var e = Oe(t.target).attr('id');
              e || ((e = fn.getUID(Re)), Oe(t.target).attr('id', e)),
                (t.target = '#' + e);
            }
            return fn.typeCheckConfig(Re, t, Ue), t;
          }),
          (e._getScrollTop = function() {
            return this._scrollElement === window
              ? this._scrollElement.pageYOffset
              : this._scrollElement.scrollTop;
          }),
          (e._getScrollHeight = function() {
            return (
              this._scrollElement.scrollHeight ||
              Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
              )
            );
          }),
          (e._getOffsetHeight = function() {
            return this._scrollElement === window
              ? window.innerHeight
              : this._scrollElement.getBoundingClientRect().height;
          }),
          (e._process = function() {
            var t = this._getScrollTop() + this._config.offset,
              e = this._getScrollHeight(),
              n = this._config.offset + e - this._getOffsetHeight();
            if ((this._scrollHeight !== e && this.refresh(), n <= t)) {
              var r = this._targets[this._targets.length - 1];
              this._activeTarget !== r && this._activate(r);
            } else {
              if (
                this._activeTarget &&
                t < this._offsets[0] &&
                0 < this._offsets[0]
              )
                return (this._activeTarget = null), void this._clear();
              for (var i = this._offsets.length; i--; )
                this._activeTarget !== this._targets[i] &&
                  t >= this._offsets[i] &&
                  ('undefined' == typeof this._offsets[i + 1] ||
                    t < this._offsets[i + 1]) &&
                  this._activate(this._targets[i]);
            }
          }),
          (e._activate = function(t) {
            (this._activeTarget = t), this._clear();
            var e = this._selector.split(',');
            e = e.map(function(e) {
              return (
                e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
              );
            });
            var n = Oe(e.join(','));
            n.hasClass(We)
              ? (n
                  .closest(ze.DROPDOWN)
                  .find(ze.DROPDOWN_TOGGLE)
                  .addClass(Ve),
                n.addClass(Ve))
              : (n.addClass(Ve),
                n
                  .parents(ze.NAV_LIST_GROUP)
                  .prev(ze.NAV_LINKS + ', ' + ze.LIST_ITEMS)
                  .addClass(Ve),
                n
                  .parents(ze.NAV_LIST_GROUP)
                  .prev(ze.NAV_ITEMS)
                  .children(ze.NAV_LINKS)
                  .addClass(Ve)),
              Oe(this._scrollElement).trigger(Fe.ACTIVATE, {
                relatedTarget: t
              });
          }),
          (e._clear = function() {
            Oe(this._selector)
              .filter(ze.ACTIVE)
              .removeClass(Ve);
          }),
          (t._jQueryInterface = function(e) {
            return this.each(function() {
              var n = Oe(this).data(Be);
              if (
                (n ||
                  ((n = new t(this, 'object' == typeof e && e)),
                  Oe(this).data(Be, n)),
                'string' == typeof e)
              ) {
                if ('undefined' == typeof n[e])
                  throw new TypeError('No method named "' + e + '"');
                n[e]();
              }
            });
          }),
          i(t, null, [
            {
              key: 'VERSION',
              get: function() {
                return '4.1.1';
              }
            },
            {
              key: 'Default',
              get: function() {
                return He;
              }
            }
          ]),
          t
        );
      })()),
      Oe(window).on(Fe.LOAD_DATA_API, function() {
        for (var t = Oe.makeArray(Oe(ze.DATA_SPY)), e = t.length; e--; ) {
          var n = Oe(t[e]);
          Ke._jQueryInterface.call(n, n.data());
        }
      }),
      (Oe.fn[Re] = Ke._jQueryInterface),
      (Oe.fn[Re].Constructor = Ke),
      (Oe.fn[Re].noConflict = function() {
        return (Oe.fn[Re] = Pe), Ke._jQueryInterface;
      }),
      Ke),
      xn = (($e = '.' + (Ye = 'bs.tab')),
      (Xe = (Qe = e).fn.tab),
      (Je = {
        HIDE: 'hide' + $e,
        HIDDEN: 'hidden' + $e,
        SHOW: 'show' + $e,
        SHOWN: 'shown' + $e,
        CLICK_DATA_API: 'click' + $e + '.data-api'
      }),
      (Ze = 'dropdown-menu'),
      (tn = 'active'),
      (en = 'disabled'),
      'fade',
      (nn = 'show'),
      (rn = '.dropdown'),
      (on = '.nav, .list-group'),
      (sn = '.active'),
      (an = '> li > .active'),
      (ln = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]'),
      (un = '.dropdown-toggle'),
      (cn = '> .dropdown-menu .active'),
      (hn = (function() {
        function t(t) {
          this._element = t;
        }
        var e = t.prototype;
        return (
          (e.show = function() {
            var t = this;
            if (
              !(
                (this._element.parentNode &&
                  this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                  Qe(this._element).hasClass(tn)) ||
                Qe(this._element).hasClass(en)
              )
            ) {
              var e,
                n,
                r = Qe(this._element).closest(on)[0],
                i = fn.getSelectorFromElement(this._element);
              if (r) {
                var o = 'UL' === r.nodeName ? an : sn;
                n = (n = Qe.makeArray(Qe(r).find(o)))[n.length - 1];
              }
              var s = Qe.Event(Je.HIDE, { relatedTarget: this._element }),
                a = Qe.Event(Je.SHOW, { relatedTarget: n });
              if (
                (n && Qe(n).trigger(s),
                Qe(this._element).trigger(a),
                !a.isDefaultPrevented() && !s.isDefaultPrevented())
              ) {
                i && (e = Qe(i)[0]), this._activate(this._element, r);
                var l = function() {
                  var e = Qe.Event(Je.HIDDEN, { relatedTarget: t._element }),
                    r = Qe.Event(Je.SHOWN, { relatedTarget: n });
                  Qe(n).trigger(e), Qe(t._element).trigger(r);
                };
                e ? this._activate(e, e.parentNode, l) : l();
              }
            }
          }),
          (e.dispose = function() {
            Qe.removeData(this._element, Ye), (this._element = null);
          }),
          (e._activate = function(t, e, n) {
            var r = this,
              i = ('UL' === e.nodeName
                ? Qe(e).find(an)
                : Qe(e).children(sn))[0],
              o = n && i && Qe(i).hasClass('fade'),
              s = function() {
                return r._transitionComplete(t, i, n);
              };
            if (i && o) {
              var a = fn.getTransitionDurationFromElement(i);
              Qe(i)
                .one(fn.TRANSITION_END, s)
                .emulateTransitionEnd(a);
            } else s();
          }),
          (e._transitionComplete = function(t, e, n) {
            if (e) {
              Qe(e).removeClass(nn + ' ' + tn);
              var r = Qe(e.parentNode).find(cn)[0];
              r && Qe(r).removeClass(tn),
                'tab' === e.getAttribute('role') &&
                  e.setAttribute('aria-selected', !1);
            }
            if (
              (Qe(t).addClass(tn),
              'tab' === t.getAttribute('role') &&
                t.setAttribute('aria-selected', !0),
              fn.reflow(t),
              Qe(t).addClass(nn),
              t.parentNode && Qe(t.parentNode).hasClass(Ze))
            ) {
              var i = Qe(t).closest(rn)[0];
              i &&
                Qe(i)
                  .find(un)
                  .addClass(tn),
                t.setAttribute('aria-expanded', !0);
            }
            n && n();
          }),
          (t._jQueryInterface = function(e) {
            return this.each(function() {
              var n = Qe(this),
                r = n.data(Ye);
              if (
                (r || ((r = new t(this)), n.data(Ye, r)), 'string' == typeof e)
              ) {
                if ('undefined' == typeof r[e])
                  throw new TypeError('No method named "' + e + '"');
                r[e]();
              }
            });
          }),
          i(t, null, [
            {
              key: 'VERSION',
              get: function() {
                return '4.1.1';
              }
            }
          ]),
          t
        );
      })()),
      Qe(document).on(Je.CLICK_DATA_API, ln, function(t) {
        t.preventDefault(), hn._jQueryInterface.call(Qe(this), 'show');
      }),
      (Qe.fn.tab = hn._jQueryInterface),
      (Qe.fn.tab.Constructor = hn),
      (Qe.fn.tab.noConflict = function() {
        return (Qe.fn.tab = Xe), hn._jQueryInterface;
      }),
      hn);
    !(function(t) {
      if ('undefined' == typeof t)
        throw new TypeError(
          "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
        );
      var e = t.fn.jquery.split(' ')[0].split('.');
      if (
        (e[0] < 2 && e[1] < 9) ||
        (1 === e[0] && 9 === e[1] && e[2] < 1) ||
        4 <= e[0]
      )
        throw new Error(
          "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
        );
    })(e),
      (t.Util = fn),
      (t.Alert = dn),
      (t.Button = pn),
      (t.Carousel = gn),
      (t.Collapse = mn),
      (t.Dropdown = vn),
      (t.Modal = yn),
      (t.Popover = bn),
      (t.Scrollspy = wn),
      (t.Tab = xn),
      (t.Tooltip = _n),
      Object.defineProperty(t, '__esModule', { value: !0 });
  }),
  (function(t) {
    if ('object' == typeof exports && 'undefined' != typeof module)
      module.exports = t();
    else if ('function' == typeof define && define.amd) define([], t);
    else {
      ('undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : this
      ).upndown = t();
    }
  })(function() {
    return (function t(e, n, r) {
      function i(s, a) {
        if (!n[s]) {
          if (!e[s]) {
            var l = 'function' == typeof require && require;
            if (!a && l) return l(s, !0);
            if (o) return o(s, !0);
            var u = new Error("Cannot find module '" + s + "'");
            throw ((u.code = 'MODULE_NOT_FOUND'), u);
          }
          var c = (n[s] = { exports: {} });
          e[s][0].call(
            c.exports,
            function(t) {
              var n = e[s][1][t];
              return i(n || t);
            },
            c,
            c.exports,
            t,
            e,
            n,
            r
          );
        }
        return n[s].exports;
      }
      for (
        var o = 'function' == typeof require && require, s = 0;
        s < r.length;
        s++
      )
        i(r[s]);
      return i;
    })(
      {
        1: [
          function(t, e, n) {
            'use strict';
            var r,
              i = (function() {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    (r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r);
                  }
                }
                return function(e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e;
                };
              })(),
              o = t('htmlparser2'),
              s = (r = o) && r.__esModule ? r : { default: r };
            e.exports = (function() {
              function t() {
                var e = (arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {}
                  ).decodeEntities,
                  n = void 0 === e || e;
                !(function(t, e) {
                  if (!(t instanceof e))
                    throw new TypeError('Cannot call a class as a function');
                })(this, t),
                  (this.decodeEntities = n);
              }
              return (
                i(t, [
                  {
                    key: 'init',
                    value: function() {
                      (this.olstack = []),
                        (this.inlineelements = [
                          'strong',
                          'b',
                          'i',
                          'em',
                          'u',
                          'a',
                          'img',
                          'code'
                        ]),
                        (this.htmlblocklevelelement = [
                          'div',
                          'iframe',
                          'script'
                        ]),
                        (this.tabindent = '    '),
                        (this.nbsp = '\0');
                    }
                  },
                  {
                    key: 'parse',
                    value: function(t, e) {
                      var n = new s.default.DomHandler(
                          function(t, n) {
                            return t ? e(t, null) : e(null, n);
                          },
                          { withDomLvl1: !1, withStartIndices: !1 }
                        ),
                        r = new s.default.Parser(n, {
                          decodeEntities: this.decodeEntities
                        });
                      r.write(t), r.end();
                    }
                  },
                  {
                    key: 'convert',
                    value: function(t, e, n) {
                      this.parse(
                        t,
                        function(t, r) {
                          return t
                            ? e(t, null)
                            : this.convertDom(
                                r,
                                function(t, n) {
                                  return t ? e(t, null) : e(null, n);
                                },
                                n
                              );
                        }.bind(this)
                      );
                    }
                  },
                  {
                    key: 'convertDom',
                    value: function(t, e) {
                      var n = (arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : {}
                        ).keepHtml,
                        r = void 0 !== n && n;
                      this.init(),
                        this.walkNodes(t, { keepHtml: r })
                          .then(
                            function(t) {
                              t || (t = '');
                              var n = new RegExp(this.nbsp, 'g');
                              e(null, t.trim().replace(n, ' '));
                            }.bind(this)
                          )
                          .catch(function(t) {
                            e(t, null);
                          });
                    }
                  },
                  {
                    key: 'walkNodes',
                    value: function(t, e) {
                      var n = this;
                      return new Promise(function(r, i) {
                        var o = [],
                          s = function(r) {
                            o.push(
                              new Promise(function(i, o) {
                                n.walkNode(i, o, e, t[r]);
                              })
                            );
                          };
                        for (var a in t) s(a);
                        Promise.all(o)
                          .then(function(t) {
                            r(t.join(''));
                          })
                          .catch(function(t) {
                            i(t);
                          });
                      }).catch(function(t) {
                        throw t;
                      });
                    }
                  },
                  {
                    key: 'walkNode',
                    value: function(t, e, n, r) {
                      this.isText(r)
                        ? t(this.text(r))
                        : this.walkNodes(r.children, n)
                            .then(
                              function(i) {
                                this.wrapNode(t, e, n, r, i);
                              }.bind(this)
                            )
                            .catch(function(t) {
                              e(t);
                            });
                    }
                  },
                  {
                    key: 'wrapNode',
                    value: function(t, e, n, r, i) {
                      var o = '',
                        s = 'wrap_' + r.name;
                      o =
                        s in this
                          ? this[s](r, i)
                          : n.keepHtml
                          ? this.wrap_generic(r, i)
                          : i;
                      var a = this.getPreviousSiblingNonBlankText(r);
                      if (a) {
                        var l = this.isBlock(a);
                        this.isInline(r)
                          ? l && (o = '\n' + o)
                          : 'br' !== r.name &&
                            !this.isList(r) &&
                            this.isBlock(r) &&
                            (l || (o = '\n' + o));
                      }
                      t(o);
                    }
                  },
                  {
                    key: 'text',
                    value: function(t) {
                      var e = t.data;
                      return e
                        ? this.hasAncestorOfType(t, ['code', 'pre'])
                          ? e
                          : (t.prev &&
                              (e = this.isInline(t.prev)
                                ? e.replace(/^\n+/, ' ')
                                : e.replace(/^\n+/, '')),
                            t.next &&
                              (e = this.isInline(t.next)
                                ? e.replace(/\n+$/, ' ')
                                : e.replace(/\n+$/, '')),
                            (e = e.replace('\n', ' ').replace(/\s+/g, ' ')),
                            ((t.prev && this.isBlock(t.prev)) ||
                              (t.parent &&
                                this.isBlock(t.parent) &&
                                this.isFirstChild(t))) &&
                              (e = e.replace(/^\s*/, '')),
                            t.parent &&
                              this.isBlock(t.parent) &&
                              this.isLastChild(t) &&
                              (e = e.replace(/\s*$/, '')),
                            e)
                        : '';
                    }
                  },
                  {
                    key: 'wrap_generic',
                    value: function(t, e) {
                      var n = '',
                        r = Object.keys(t.attribs);
                      for (var i in r)
                        n += ' ' + r[i] + '="' + t.attribs[r[i]] + '"';
                      return (
                        '<' +
                        t.name +
                        n +
                        '>' +
                        e.replace(/\s+/gm, ' ') +
                        '</' +
                        t.name +
                        '>' +
                        (this.isHtmlBlockLevelElement(t.name) ? '\n' : '')
                      );
                    }
                  },
                  {
                    key: 'wrap_h1',
                    value: function(t, e) {
                      return '\n# ' + e + '\n';
                    }
                  },
                  {
                    key: 'wrap_h2',
                    value: function(t, e) {
                      return '\n## ' + e + '\n';
                    }
                  },
                  {
                    key: 'wrap_h3',
                    value: function(t, e) {
                      return '\n### ' + e + '\n';
                    }
                  },
                  {
                    key: 'wrap_h4',
                    value: function(t, e) {
                      return '\n#### ' + e + '\n';
                    }
                  },
                  {
                    key: 'wrap_h5',
                    value: function(t, e) {
                      return '\n##### ' + e + '\n';
                    }
                  },
                  {
                    key: 'wrap_h6',
                    value: function(t, e) {
                      return '\n###### ' + e + '\n';
                    }
                  },
                  {
                    key: 'wrap_blockquote',
                    value: function(t, e) {
                      return '\n' + e.trim().replace(/^/gm, '> ') + '\n';
                    }
                  },
                  {
                    key: 'wrap_pre',
                    value: function(t, e) {
                      return (
                        '\n' +
                        e
                          .trim()
                          .replace(/^/gm, this.tabindent)
                          .replace(/ /g, this.nbsp) +
                        '\n'
                      );
                    }
                  },
                  {
                    key: 'wrap_code',
                    value: function(t, e) {
                      return this.hasAncestorOfType(t, ['pre'])
                        ? e
                        : '`' + e.trim() + '`';
                    }
                  },
                  {
                    key: 'wrap_ul',
                    value: function(t, e) {
                      return '\n' + e.trim() + '\n';
                    }
                  },
                  {
                    key: 'wrap_ol',
                    value: function(t, e) {
                      return this.wrap_ul(t, e);
                    }
                  },
                  {
                    key: 'wrap_li',
                    value: function(t, e) {
                      var n = '* ';
                      if (
                        t.parent &&
                        'tag' === t.parent.type &&
                        'ol' === t.parent.name
                      ) {
                        for (var r = 1, i = t; i.prev; )
                          'tag' === i.prev.type && 'li' === i.prev.name && r++,
                            (i = i.prev);
                        n = r + '. ';
                      }
                      var o = this.getFirstChildNonBlankText(t);
                      if (o)
                        if (this.isList(o)) n = this.tabindent;
                        else if (this.isBlock(o)) n = '\n' + n;
                        else {
                          var s = this.getPreviousSiblingNonBlankText(t);
                          s &&
                            'tag' === s.type &&
                            'li' === s.name &&
                            this.isBlock(this.getFirstChildNonBlankText(s)) &&
                            (n = '\n' + n);
                        }
                      return n + e.replace(/^/gm, this.tabindent).trim() + '\n';
                    }
                  },
                  {
                    key: 'wrap_p',
                    value: function(t, e) {
                      return '\n' + e + '\n';
                    }
                  },
                  {
                    key: 'wrap_br',
                    value: function() {
                      return '  \n';
                    }
                  },
                  {
                    key: 'wrap_hr',
                    value: function() {
                      return '\n* * *\n';
                    }
                  },
                  {
                    key: 'wrap_strong',
                    value: function(t, e) {
                      return '**' + e + '**';
                    }
                  },
                  {
                    key: 'wrap_b',
                    value: function(t, e) {
                      return this.wrap_strong(t, e);
                    }
                  },
                  {
                    key: 'wrap_em',
                    value: function(t, e) {
                      return '*' + e + '*';
                    }
                  },
                  {
                    key: 'wrap_i',
                    value: function(t, e) {
                      return this.wrap_em(t, e);
                    }
                  },
                  {
                    key: 'wrap_a',
                    value: function(t, e) {
                      var n = this.getAttrOrFalse('href', t),
                        r = this.getAttrOrFalse('title', t);
                      return n
                        ? !n || n !== e || (r && '' !== r)
                          ? (n !== e && n.replace(/^mailto:/, '') !== e) ||
                            (r && '' !== r)
                            ? '[' +
                              e +
                              '](' +
                              (n || '') +
                              (r ? ' "' + r + '"' : '') +
                              ')'
                            : '<' + n.replace(/^mailto:/, '') + '>'
                          : '<' + n + '>'
                        : e;
                    }
                  },
                  {
                    key: 'wrap_img',
                    value: function(t) {
                      var e = this.getAttrOrFalse('alt', t),
                        n = this.getAttrOrFalse('src', t),
                        r = this.getAttrOrFalse('title', t);
                      return (
                        '![' +
                        (e || '') +
                        '](' +
                        (n || '') +
                        (r ? ' "' + r + '"' : '') +
                        ')'
                      );
                    }
                  },
                  {
                    key: 'hasAncestorOfType',
                    value: function(t, e) {
                      for (var n = t.parent; n; ) {
                        if (e.indexOf(n.name) > -1) return !0;
                        n = n.parent;
                      }
                      return !1;
                    }
                  },
                  {
                    key: 'isInline',
                    value: function(t) {
                      return (
                        t &&
                        'tag' === t.type &&
                        this.inlineelements.indexOf(t.name) >= 0
                      );
                    }
                  },
                  {
                    key: 'isBlock',
                    value: function(t) {
                      return (
                        t &&
                        ('tag' === t.type || 'script' === t.type) &&
                        !this.isInline(t)
                      );
                    }
                  },
                  {
                    key: 'isText',
                    value: function(t) {
                      return t && 'text' === t.type;
                    }
                  },
                  {
                    key: 'isList',
                    value: function(t) {
                      return (
                        t &&
                        'tag' === t.type &&
                        ('ul' === t.name || 'ol' === t.name)
                      );
                    }
                  },
                  {
                    key: 'isHtmlBlockLevelElement',
                    value: function(t) {
                      return this.htmlblocklevelelement.indexOf(t) >= 0;
                    }
                  },
                  {
                    key: 'getPreviousSiblingNonBlankText',
                    value: function(t) {
                      for (var e = t; ; ) {
                        if (
                          (e && (e = e.prev),
                          e && ('text' !== e.type || '' !== e.data.trim()))
                        )
                          return e;
                        if (!e || this.isFirstChildNonText(e)) break;
                      }
                      return null;
                    }
                  },
                  {
                    key: 'getFirstChildNonText',
                    value: function(t) {
                      for (var e = 0; e < t.children.length; ) {
                        if (t.children[e] && 'text' !== t.children[e].type)
                          return t.children[e];
                        e++;
                      }
                      return null;
                    }
                  },
                  {
                    key: 'getFirstChildNonBlankText',
                    value: function(t) {
                      for (var e = 0; e < t.children.length; ) {
                        if (
                          (t.children[e] && 'text' !== t.children[e].type) ||
                          '' !== t.children[e].data.trim()
                        )
                          return t.children[e];
                        e++;
                      }
                      return null;
                    }
                  },
                  {
                    key: 'isFirstChild',
                    value: function(t) {
                      return !(t && t.prev);
                    }
                  },
                  {
                    key: 'isFirstChildNonText',
                    value: function(t) {
                      return (
                        t.parent && this.getFirstChildNonText(t.parent) === t
                      );
                    }
                  },
                  {
                    key: 'isLastChild',
                    value: function(t) {
                      return !t.next;
                    }
                  },
                  {
                    key: 'getAttrOrFalse',
                    value: function(t, e) {
                      return t in e.attribs && e.attribs[t];
                    }
                  }
                ]),
                t
              );
            })();
          },
          { htmlparser2: 36 }
        ],
        2: [
          function(t, e, n) {
            'use strict';
            (n.byteLength = function(t) {
              return (3 * t.length) / 4 - u(t);
            }),
              (n.toByteArray = function(t) {
                var e,
                  n,
                  r,
                  s,
                  a,
                  l,
                  c = t.length;
                (a = u(t)),
                  (l = new o((3 * c) / 4 - a)),
                  (r = a > 0 ? c - 4 : c);
                var h = 0;
                for (e = 0, n = 0; e < r; e += 4, n += 3)
                  (s =
                    (i[t.charCodeAt(e)] << 18) |
                    (i[t.charCodeAt(e + 1)] << 12) |
                    (i[t.charCodeAt(e + 2)] << 6) |
                    i[t.charCodeAt(e + 3)]),
                    (l[h++] = (s >> 16) & 255),
                    (l[h++] = (s >> 8) & 255),
                    (l[h++] = 255 & s);
                2 === a
                  ? ((s =
                      (i[t.charCodeAt(e)] << 2) |
                      (i[t.charCodeAt(e + 1)] >> 4)),
                    (l[h++] = 255 & s))
                  : 1 === a &&
                    ((s =
                      (i[t.charCodeAt(e)] << 10) |
                      (i[t.charCodeAt(e + 1)] << 4) |
                      (i[t.charCodeAt(e + 2)] >> 2)),
                    (l[h++] = (s >> 8) & 255),
                    (l[h++] = 255 & s));
                return l;
              }),
              (n.fromByteArray = function(t) {
                for (
                  var e,
                    n = t.length,
                    i = n % 3,
                    o = '',
                    s = [],
                    a = 0,
                    l = n - i;
                  a < l;
                  a += 16383
                )
                  s.push(c(t, a, a + 16383 > l ? l : a + 16383));
                1 === i
                  ? ((e = t[n - 1]),
                    (o += r[e >> 2]),
                    (o += r[(e << 4) & 63]),
                    (o += '=='))
                  : 2 === i &&
                    ((e = (t[n - 2] << 8) + t[n - 1]),
                    (o += r[e >> 10]),
                    (o += r[(e >> 4) & 63]),
                    (o += r[(e << 2) & 63]),
                    (o += '='));
                return s.push(o), s.join('');
              });
            for (
              var r = [],
                i = [],
                o = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
                s =
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                a = 0,
                l = s.length;
              a < l;
              ++a
            )
              (r[a] = s[a]), (i[s.charCodeAt(a)] = a);
            function u(t) {
              var e = t.length;
              if (e % 4 > 0)
                throw new Error(
                  'Invalid string. Length must be a multiple of 4'
                );
              return '=' === t[e - 2] ? 2 : '=' === t[e - 1] ? 1 : 0;
            }
            function c(t, e, n) {
              for (var i, o, s = [], a = e; a < n; a += 3)
                (i = (t[a] << 16) + (t[a + 1] << 8) + t[a + 2]),
                  s.push(
                    r[((o = i) >> 18) & 63] +
                      r[(o >> 12) & 63] +
                      r[(o >> 6) & 63] +
                      r[63 & o]
                  );
              return s.join('');
            }
            (i['-'.charCodeAt(0)] = 62), (i['_'.charCodeAt(0)] = 63);
          },
          {}
        ],
        3: [function(t, e, n) {}, {}],
        4: [
          function(t, e, n) {
            (function(e) {
              'use strict';
              var r = t('buffer'),
                i = r.Buffer,
                o = r.SlowBuffer,
                s = r.kMaxLength || 2147483647;
              (n.alloc = function(t, e, n) {
                if ('function' == typeof i.alloc) return i.alloc(t, e, n);
                if ('number' == typeof n)
                  throw new TypeError('encoding must not be number');
                if ('number' != typeof t)
                  throw new TypeError('size must be a number');
                if (t > s) throw new RangeError('size is too large');
                var r = n,
                  o = e;
                void 0 === o && ((r = void 0), (o = 0));
                var a = new i(t);
                if ('string' == typeof o)
                  for (var l = new i(o, r), u = l.length, c = -1; ++c < t; )
                    a[c] = l[c % u];
                else a.fill(o);
                return a;
              }),
                (n.allocUnsafe = function(t) {
                  if ('function' == typeof i.allocUnsafe)
                    return i.allocUnsafe(t);
                  if ('number' != typeof t)
                    throw new TypeError('size must be a number');
                  if (t > s) throw new RangeError('size is too large');
                  return new i(t);
                }),
                (n.from = function(t, n, r) {
                  if (
                    'function' == typeof i.from &&
                    (!e.Uint8Array || Uint8Array.from !== i.from)
                  )
                    return i.from(t, n, r);
                  if ('number' == typeof t)
                    throw new TypeError(
                      '"value" argument must not be a number'
                    );
                  if ('string' == typeof t) return new i(t, n);
                  if (
                    'undefined' != typeof ArrayBuffer &&
                    t instanceof ArrayBuffer
                  ) {
                    var o = n;
                    if (1 === arguments.length) return new i(t);
                    'undefined' == typeof o && (o = 0);
                    var s = r;
                    if (
                      ('undefined' == typeof s && (s = t.byteLength - o),
                      o >= t.byteLength)
                    )
                      throw new RangeError("'offset' is out of bounds");
                    if (s > t.byteLength - o)
                      throw new RangeError("'length' is out of bounds");
                    return new i(t.slice(o, o + s));
                  }
                  if (i.isBuffer(t)) {
                    var a = new i(t.length);
                    return t.copy(a, 0, 0, t.length), a;
                  }
                  if (t) {
                    if (
                      Array.isArray(t) ||
                      ('undefined' != typeof ArrayBuffer &&
                        t.buffer instanceof ArrayBuffer) ||
                      'length' in t
                    )
                      return new i(t);
                    if ('Buffer' === t.type && Array.isArray(t.data))
                      return new i(t.data);
                  }
                  throw new TypeError(
                    'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                  );
                }),
                (n.allocUnsafeSlow = function(t) {
                  if ('function' == typeof i.allocUnsafeSlow)
                    return i.allocUnsafeSlow(t);
                  if ('number' != typeof t)
                    throw new TypeError('size must be a number');
                  if (t >= s) throw new RangeError('size is too large');
                  return new o(t);
                });
            }.call(
              this,
              'undefined' != typeof global
                ? global
                : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                ? window
                : {}
            ));
          },
          { buffer: 5 }
        ],
        5: [
          function(t, e, n) {
            'use strict';
            var r = t('base64-js'),
              i = t('ieee754');
            (n.Buffer = a),
              (n.SlowBuffer = function(t) {
                +t != t && (t = 0);
                return a.alloc(+t);
              }),
              (n.INSPECT_MAX_BYTES = 50);
            var o = 2147483647;
            function s(t) {
              if (t > o) throw new RangeError('Invalid typed array length');
              var e = new Uint8Array(t);
              return (e.__proto__ = a.prototype), e;
            }
            function a(t, e, n) {
              if ('number' == typeof t) {
                if ('string' == typeof e)
                  throw new Error(
                    'If encoding is specified then the first argument must be a string'
                  );
                return c(t);
              }
              return l(t, e, n);
            }
            function l(t, e, n) {
              if ('number' == typeof t)
                throw new TypeError('"value" argument must not be a number');
              return t instanceof ArrayBuffer
                ? (function(t, e, n) {
                    if (e < 0 || t.byteLength < e)
                      throw new RangeError("'offset' is out of bounds");
                    if (t.byteLength < e + (n || 0))
                      throw new RangeError("'length' is out of bounds");
                    var r;
                    r =
                      void 0 === e && void 0 === n
                        ? new Uint8Array(t)
                        : void 0 === n
                        ? new Uint8Array(t, e)
                        : new Uint8Array(t, e, n);
                    return (r.__proto__ = a.prototype), r;
                  })(t, e, n)
                : 'string' == typeof t
                ? (function(t, e) {
                    ('string' == typeof e && '' !== e) || (e = 'utf8');
                    if (!a.isEncoding(e))
                      throw new TypeError(
                        '"encoding" must be a valid string encoding'
                      );
                    var n = 0 | d(t, e),
                      r = s(n),
                      i = r.write(t, e);
                    i !== n && (r = r.slice(0, i));
                    return r;
                  })(t, e)
                : (function(t) {
                    if (a.isBuffer(t)) {
                      var e = 0 | f(t.length),
                        n = s(e);
                      return 0 === n.length ? n : (t.copy(n, 0, 0, e), n);
                    }
                    if (t) {
                      if (ArrayBuffer.isView(t) || 'length' in t)
                        return 'number' != typeof t.length ||
                          (r = t.length) != r
                          ? s(0)
                          : h(t);
                      if ('Buffer' === t.type && Array.isArray(t.data))
                        return h(t.data);
                    }
                    var r;
                    throw new TypeError(
                      'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                    );
                  })(t);
            }
            function u(t) {
              if ('number' != typeof t)
                throw new TypeError('"size" argument must be a number');
              if (t < 0)
                throw new RangeError('"size" argument must not be negative');
            }
            function c(t) {
              return u(t), s(t < 0 ? 0 : 0 | f(t));
            }
            function h(t) {
              for (
                var e = t.length < 0 ? 0 : 0 | f(t.length), n = s(e), r = 0;
                r < e;
                r += 1
              )
                n[r] = 255 & t[r];
              return n;
            }
            function f(t) {
              if (t >= o)
                throw new RangeError(
                  'Attempt to allocate Buffer larger than maximum size: 0x' +
                    o.toString(16) +
                    ' bytes'
                );
              return 0 | t;
            }
            function d(t, e) {
              if (a.isBuffer(t)) return t.length;
              if (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
                return t.byteLength;
              'string' != typeof t && (t = '' + t);
              var n = t.length;
              if (0 === n) return 0;
              for (var r = !1; ; )
                switch (e) {
                  case 'ascii':
                  case 'latin1':
                  case 'binary':
                    return n;
                  case 'utf8':
                  case 'utf-8':
                  case void 0:
                    return B(t).length;
                  case 'ucs2':
                  case 'ucs-2':
                  case 'utf16le':
                  case 'utf-16le':
                    return 2 * n;
                  case 'hex':
                    return n >>> 1;
                  case 'base64':
                    return M(t).length;
                  default:
                    if (r) return B(t).length;
                    (e = ('' + e).toLowerCase()), (r = !0);
                }
            }
            function p(t, e, n) {
              var r = t[e];
              (t[e] = t[n]), (t[n] = r);
            }
            function g(t, e, n, r, i) {
              if (0 === t.length) return -1;
              if (
                ('string' == typeof n
                  ? ((r = n), (n = 0))
                  : n > 2147483647
                  ? (n = 2147483647)
                  : n < -2147483648 && (n = -2147483648),
                (n = +n),
                isNaN(n) && (n = i ? 0 : t.length - 1),
                n < 0 && (n = t.length + n),
                n >= t.length)
              ) {
                if (i) return -1;
                n = t.length - 1;
              } else if (n < 0) {
                if (!i) return -1;
                n = 0;
              }
              if (('string' == typeof e && (e = a.from(e, r)), a.isBuffer(e)))
                return 0 === e.length ? -1 : m(t, e, n, r, i);
              if ('number' == typeof e)
                return (
                  (e &= 255),
                  'function' == typeof Uint8Array.prototype.indexOf
                    ? i
                      ? Uint8Array.prototype.indexOf.call(t, e, n)
                      : Uint8Array.prototype.lastIndexOf.call(t, e, n)
                    : m(t, [e], n, r, i)
                );
              throw new TypeError('val must be string, number or Buffer');
            }
            function m(t, e, n, r, i) {
              var o,
                s = 1,
                a = t.length,
                l = e.length;
              if (
                void 0 !== r &&
                ('ucs2' === (r = String(r).toLowerCase()) ||
                  'ucs-2' === r ||
                  'utf16le' === r ||
                  'utf-16le' === r)
              ) {
                if (t.length < 2 || e.length < 2) return -1;
                (s = 2), (a /= 2), (l /= 2), (n /= 2);
              }
              function u(t, e) {
                return 1 === s ? t[e] : t.readUInt16BE(e * s);
              }
              if (i) {
                var c = -1;
                for (o = n; o < a; o++)
                  if (u(t, o) === u(e, -1 === c ? 0 : o - c)) {
                    if ((-1 === c && (c = o), o - c + 1 === l)) return c * s;
                  } else -1 !== c && (o -= o - c), (c = -1);
              } else
                for (n + l > a && (n = a - l), o = n; o >= 0; o--) {
                  for (var h = !0, f = 0; f < l; f++)
                    if (u(t, o + f) !== u(e, f)) {
                      h = !1;
                      break;
                    }
                  if (h) return o;
                }
              return -1;
            }
            function v(t, e, n, r) {
              n = Number(n) || 0;
              var i = t.length - n;
              r ? (r = Number(r)) > i && (r = i) : (r = i);
              var o = e.length;
              if (o % 2 != 0) throw new TypeError('Invalid hex string');
              r > o / 2 && (r = o / 2);
              for (var s = 0; s < r; ++s) {
                var a = parseInt(e.substr(2 * s, 2), 16);
                if (isNaN(a)) return s;
                t[n + s] = a;
              }
              return s;
            }
            function y(t, e, n, r) {
              return P(B(e, t.length - n), t, n, r);
            }
            function _(t, e, n, r) {
              return P(
                (function(t) {
                  for (var e = [], n = 0; n < t.length; ++n)
                    e.push(255 & t.charCodeAt(n));
                  return e;
                })(e),
                t,
                n,
                r
              );
            }
            function b(t, e, n, r) {
              return _(t, e, n, r);
            }
            function w(t, e, n, r) {
              return P(M(e), t, n, r);
            }
            function x(t, e, n, r) {
              return P(
                (function(t, e) {
                  for (
                    var n, r, i, o = [], s = 0;
                    s < t.length && !((e -= 2) < 0);
                    ++s
                  )
                    (n = t.charCodeAt(s)),
                      (r = n >> 8),
                      (i = n % 256),
                      o.push(i),
                      o.push(r);
                  return o;
                })(e, t.length - n),
                t,
                n,
                r
              );
            }
            function E(t, e, n) {
              return 0 === e && n === t.length
                ? r.fromByteArray(t)
                : r.fromByteArray(t.slice(e, n));
            }
            function T(t, e, n) {
              n = Math.min(t.length, n);
              for (var r = [], i = e; i < n; ) {
                var o,
                  s,
                  a,
                  l,
                  u = t[i],
                  c = null,
                  h = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                if (i + h <= n)
                  switch (h) {
                    case 1:
                      u < 128 && (c = u);
                      break;
                    case 2:
                      128 == (192 & (o = t[i + 1])) &&
                        (l = ((31 & u) << 6) | (63 & o)) > 127 &&
                        (c = l);
                      break;
                    case 3:
                      (o = t[i + 1]),
                        (s = t[i + 2]),
                        128 == (192 & o) &&
                          128 == (192 & s) &&
                          (l = ((15 & u) << 12) | ((63 & o) << 6) | (63 & s)) >
                            2047 &&
                          (l < 55296 || l > 57343) &&
                          (c = l);
                      break;
                    case 4:
                      (o = t[i + 1]),
                        (s = t[i + 2]),
                        (a = t[i + 3]),
                        128 == (192 & o) &&
                          128 == (192 & s) &&
                          128 == (192 & a) &&
                          (l =
                            ((15 & u) << 18) |
                            ((63 & o) << 12) |
                            ((63 & s) << 6) |
                            (63 & a)) > 65535 &&
                          l < 1114112 &&
                          (c = l);
                  }
                null === c
                  ? ((c = 65533), (h = 1))
                  : c > 65535 &&
                    ((c -= 65536),
                    r.push(((c >>> 10) & 1023) | 55296),
                    (c = 56320 | (1023 & c))),
                  r.push(c),
                  (i += h);
              }
              return (function(t) {
                var e = t.length;
                if (e <= S) return String.fromCharCode.apply(String, t);
                var n = '',
                  r = 0;
                for (; r < e; )
                  n += String.fromCharCode.apply(String, t.slice(r, (r += S)));
                return n;
              })(r);
            }
            (n.kMaxLength = o),
              (a.TYPED_ARRAY_SUPPORT = (function() {
                try {
                  var t = new Uint8Array(1);
                  return (
                    (t.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function() {
                        return 42;
                      }
                    }),
                    42 === t.foo()
                  );
                } catch (t) {
                  return !1;
                }
              })()),
              a.TYPED_ARRAY_SUPPORT ||
                'undefined' == typeof console ||
                'function' != typeof console.error ||
                console.error(
                  'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
                ),
              'undefined' != typeof Symbol &&
                Symbol.species &&
                a[Symbol.species] === a &&
                Object.defineProperty(a, Symbol.species, {
                  value: null,
                  configurable: !0,
                  enumerable: !1,
                  writable: !1
                }),
              (a.poolSize = 8192),
              (a.from = function(t, e, n) {
                return l(t, e, n);
              }),
              (a.prototype.__proto__ = Uint8Array.prototype),
              (a.__proto__ = Uint8Array),
              (a.alloc = function(t, e, n) {
                return (function(t, e, n) {
                  return (
                    u(t),
                    t <= 0
                      ? s(t)
                      : void 0 !== e
                      ? 'string' == typeof n
                        ? s(t).fill(e, n)
                        : s(t).fill(e)
                      : s(t)
                  );
                })(t, e, n);
              }),
              (a.allocUnsafe = function(t) {
                return c(t);
              }),
              (a.allocUnsafeSlow = function(t) {
                return c(t);
              }),
              (a.isBuffer = function(t) {
                return null != t && !0 === t._isBuffer;
              }),
              (a.compare = function(t, e) {
                if (!a.isBuffer(t) || !a.isBuffer(e))
                  throw new TypeError('Arguments must be Buffers');
                if (t === e) return 0;
                for (
                  var n = t.length, r = e.length, i = 0, o = Math.min(n, r);
                  i < o;
                  ++i
                )
                  if (t[i] !== e[i]) {
                    (n = t[i]), (r = e[i]);
                    break;
                  }
                return n < r ? -1 : r < n ? 1 : 0;
              }),
              (a.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                  case 'hex':
                  case 'utf8':
                  case 'utf-8':
                  case 'ascii':
                  case 'latin1':
                  case 'binary':
                  case 'base64':
                  case 'ucs2':
                  case 'ucs-2':
                  case 'utf16le':
                  case 'utf-16le':
                    return !0;
                  default:
                    return !1;
                }
              }),
              (a.concat = function(t, e) {
                if (!Array.isArray(t))
                  throw new TypeError(
                    '"list" argument must be an Array of Buffers'
                  );
                if (0 === t.length) return a.alloc(0);
                var n;
                if (void 0 === e)
                  for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                var r = a.allocUnsafe(e),
                  i = 0;
                for (n = 0; n < t.length; ++n) {
                  var o = t[n];
                  if (!a.isBuffer(o))
                    throw new TypeError(
                      '"list" argument must be an Array of Buffers'
                    );
                  o.copy(r, i), (i += o.length);
                }
                return r;
              }),
              (a.byteLength = d),
              (a.prototype._isBuffer = !0),
              (a.prototype.swap16 = function() {
                var t = this.length;
                if (t % 2 != 0)
                  throw new RangeError(
                    'Buffer size must be a multiple of 16-bits'
                  );
                for (var e = 0; e < t; e += 2) p(this, e, e + 1);
                return this;
              }),
              (a.prototype.swap32 = function() {
                var t = this.length;
                if (t % 4 != 0)
                  throw new RangeError(
                    'Buffer size must be a multiple of 32-bits'
                  );
                for (var e = 0; e < t; e += 4)
                  p(this, e, e + 3), p(this, e + 1, e + 2);
                return this;
              }),
              (a.prototype.swap64 = function() {
                var t = this.length;
                if (t % 8 != 0)
                  throw new RangeError(
                    'Buffer size must be a multiple of 64-bits'
                  );
                for (var e = 0; e < t; e += 8)
                  p(this, e, e + 7),
                    p(this, e + 1, e + 6),
                    p(this, e + 2, e + 5),
                    p(this, e + 3, e + 4);
                return this;
              }),
              (a.prototype.toString = function() {
                var t = this.length;
                return 0 === t
                  ? ''
                  : 0 === arguments.length
                  ? T(this, 0, t)
                  : function(t, e, n) {
                      var r = !1;
                      if (((void 0 === e || e < 0) && (e = 0), e > this.length))
                        return '';
                      if (
                        ((void 0 === n || n > this.length) && (n = this.length),
                        n <= 0)
                      )
                        return '';
                      if ((n >>>= 0) <= (e >>>= 0)) return '';
                      for (t || (t = 'utf8'); ; )
                        switch (t) {
                          case 'hex':
                            return A(this, e, n);
                          case 'utf8':
                          case 'utf-8':
                            return T(this, e, n);
                          case 'ascii':
                            return C(this, e, n);
                          case 'latin1':
                          case 'binary':
                            return k(this, e, n);
                          case 'base64':
                            return E(this, e, n);
                          case 'ucs2':
                          case 'ucs-2':
                          case 'utf16le':
                          case 'utf-16le':
                            return D(this, e, n);
                          default:
                            if (r)
                              throw new TypeError('Unknown encoding: ' + t);
                            (t = (t + '').toLowerCase()), (r = !0);
                        }
                    }.apply(this, arguments);
              }),
              (a.prototype.equals = function(t) {
                if (!a.isBuffer(t))
                  throw new TypeError('Argument must be a Buffer');
                return this === t || 0 === a.compare(this, t);
              }),
              (a.prototype.inspect = function() {
                var t = '',
                  e = n.INSPECT_MAX_BYTES;
                return (
                  this.length > 0 &&
                    ((t = this.toString('hex', 0, e)
                      .match(/.{2}/g)
                      .join(' ')),
                    this.length > e && (t += ' ... ')),
                  '<Buffer ' + t + '>'
                );
              }),
              (a.prototype.compare = function(t, e, n, r, i) {
                if (!a.isBuffer(t))
                  throw new TypeError('Argument must be a Buffer');
                if (
                  (void 0 === e && (e = 0),
                  void 0 === n && (n = t ? t.length : 0),
                  void 0 === r && (r = 0),
                  void 0 === i && (i = this.length),
                  e < 0 || n > t.length || r < 0 || i > this.length)
                )
                  throw new RangeError('out of range index');
                if (r >= i && e >= n) return 0;
                if (r >= i) return -1;
                if (e >= n) return 1;
                if (
                  ((e >>>= 0), (n >>>= 0), (r >>>= 0), (i >>>= 0), this === t)
                )
                  return 0;
                for (
                  var o = i - r,
                    s = n - e,
                    l = Math.min(o, s),
                    u = this.slice(r, i),
                    c = t.slice(e, n),
                    h = 0;
                  h < l;
                  ++h
                )
                  if (u[h] !== c[h]) {
                    (o = u[h]), (s = c[h]);
                    break;
                  }
                return o < s ? -1 : s < o ? 1 : 0;
              }),
              (a.prototype.includes = function(t, e, n) {
                return -1 !== this.indexOf(t, e, n);
              }),
              (a.prototype.indexOf = function(t, e, n) {
                return g(this, t, e, n, !0);
              }),
              (a.prototype.lastIndexOf = function(t, e, n) {
                return g(this, t, e, n, !1);
              }),
              (a.prototype.write = function(t, e, n, r) {
                if (void 0 === e) (r = 'utf8'), (n = this.length), (e = 0);
                else if (void 0 === n && 'string' == typeof e)
                  (r = e), (n = this.length), (e = 0);
                else {
                  if (!isFinite(e))
                    throw new Error(
                      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
                    );
                  (e >>>= 0),
                    isFinite(n)
                      ? ((n >>>= 0), void 0 === r && (r = 'utf8'))
                      : ((r = n), (n = void 0));
                }
                var i = this.length - e;
                if (
                  ((void 0 === n || n > i) && (n = i),
                  (t.length > 0 && (n < 0 || e < 0)) || e > this.length)
                )
                  throw new RangeError(
                    'Attempt to write outside buffer bounds'
                  );
                r || (r = 'utf8');
                for (var o = !1; ; )
                  switch (r) {
                    case 'hex':
                      return v(this, t, e, n);
                    case 'utf8':
                    case 'utf-8':
                      return y(this, t, e, n);
                    case 'ascii':
                      return _(this, t, e, n);
                    case 'latin1':
                    case 'binary':
                      return b(this, t, e, n);
                    case 'base64':
                      return w(this, t, e, n);
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                      return x(this, t, e, n);
                    default:
                      if (o) throw new TypeError('Unknown encoding: ' + r);
                      (r = ('' + r).toLowerCase()), (o = !0);
                  }
              }),
              (a.prototype.toJSON = function() {
                return {
                  type: 'Buffer',
                  data: Array.prototype.slice.call(this._arr || this, 0)
                };
              });
            var S = 4096;
            function C(t, e, n) {
              var r = '';
              n = Math.min(t.length, n);
              for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
              return r;
            }
            function k(t, e, n) {
              var r = '';
              n = Math.min(t.length, n);
              for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
              return r;
            }
            function A(t, e, n) {
              var r = t.length;
              (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
              for (var i = '', o = e; o < n; ++o) i += R(t[o]);
              return i;
            }
            function D(t, e, n) {
              for (var r = t.slice(e, n), i = '', o = 0; o < r.length; o += 2)
                i += String.fromCharCode(r[o] + 256 * r[o + 1]);
              return i;
            }
            function N(t, e, n) {
              if (t % 1 != 0 || t < 0)
                throw new RangeError('offset is not uint');
              if (t + e > n)
                throw new RangeError('Trying to access beyond buffer length');
            }
            function I(t, e, n, r, i, o) {
              if (!a.isBuffer(t))
                throw new TypeError(
                  '"buffer" argument must be a Buffer instance'
                );
              if (e > i || e < o)
                throw new RangeError('"value" argument is out of bounds');
              if (n + r > t.length) throw new RangeError('Index out of range');
            }
            function L(t, e, n, r, i, o) {
              if (n + r > t.length) throw new RangeError('Index out of range');
              if (n < 0) throw new RangeError('Index out of range');
            }
            function j(t, e, n, r, o) {
              return (
                (e = +e),
                (n >>>= 0),
                o || L(t, 0, n, 4),
                i.write(t, e, n, r, 23, 4),
                n + 4
              );
            }
            function q(t, e, n, r, o) {
              return (
                (e = +e),
                (n >>>= 0),
                o || L(t, 0, n, 8),
                i.write(t, e, n, r, 52, 8),
                n + 8
              );
            }
            (a.prototype.slice = function(t, e) {
              var n = this.length;
              (t = ~~t),
                (e = void 0 === e ? n : ~~e),
                t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
                e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
                e < t && (e = t);
              var r = this.subarray(t, e);
              return (r.__proto__ = a.prototype), r;
            }),
              (a.prototype.readUIntLE = function(t, e, n) {
                (t >>>= 0), (e >>>= 0), n || N(t, e, this.length);
                for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
                  r += this[t + o] * i;
                return r;
              }),
              (a.prototype.readUIntBE = function(t, e, n) {
                (t >>>= 0), (e >>>= 0), n || N(t, e, this.length);
                for (var r = this[t + --e], i = 1; e > 0 && (i *= 256); )
                  r += this[t + --e] * i;
                return r;
              }),
              (a.prototype.readUInt8 = function(t, e) {
                return (t >>>= 0), e || N(t, 1, this.length), this[t];
              }),
              (a.prototype.readUInt16LE = function(t, e) {
                return (
                  (t >>>= 0),
                  e || N(t, 2, this.length),
                  this[t] | (this[t + 1] << 8)
                );
              }),
              (a.prototype.readUInt16BE = function(t, e) {
                return (
                  (t >>>= 0),
                  e || N(t, 2, this.length),
                  (this[t] << 8) | this[t + 1]
                );
              }),
              (a.prototype.readUInt32LE = function(t, e) {
                return (
                  (t >>>= 0),
                  e || N(t, 4, this.length),
                  (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                    16777216 * this[t + 3]
                );
              }),
              (a.prototype.readUInt32BE = function(t, e) {
                return (
                  (t >>>= 0),
                  e || N(t, 4, this.length),
                  16777216 * this[t] +
                    ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
                );
              }),
              (a.prototype.readIntLE = function(t, e, n) {
                (t >>>= 0), (e >>>= 0), n || N(t, e, this.length);
                for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
                  r += this[t + o] * i;
                return r >= (i *= 128) && (r -= Math.pow(2, 8 * e)), r;
              }),
              (a.prototype.readIntBE = function(t, e, n) {
                (t >>>= 0), (e >>>= 0), n || N(t, e, this.length);
                for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256); )
                  o += this[t + --r] * i;
                return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
              }),
              (a.prototype.readInt8 = function(t, e) {
                return (
                  (t >>>= 0),
                  e || N(t, 1, this.length),
                  128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                );
              }),
              (a.prototype.readInt16LE = function(t, e) {
                (t >>>= 0), e || N(t, 2, this.length);
                var n = this[t] | (this[t + 1] << 8);
                return 32768 & n ? 4294901760 | n : n;
              }),
              (a.prototype.readInt16BE = function(t, e) {
                (t >>>= 0), e || N(t, 2, this.length);
                var n = this[t + 1] | (this[t] << 8);
                return 32768 & n ? 4294901760 | n : n;
              }),
              (a.prototype.readInt32LE = function(t, e) {
                return (
                  (t >>>= 0),
                  e || N(t, 4, this.length),
                  this[t] |
                    (this[t + 1] << 8) |
                    (this[t + 2] << 16) |
                    (this[t + 3] << 24)
                );
              }),
              (a.prototype.readInt32BE = function(t, e) {
                return (
                  (t >>>= 0),
                  e || N(t, 4, this.length),
                  (this[t] << 24) |
                    (this[t + 1] << 16) |
                    (this[t + 2] << 8) |
                    this[t + 3]
                );
              }),
              (a.prototype.readFloatLE = function(t, e) {
                return (
                  (t >>>= 0),
                  e || N(t, 4, this.length),
                  i.read(this, t, !0, 23, 4)
                );
              }),
              (a.prototype.readFloatBE = function(t, e) {
                return (
                  (t >>>= 0),
                  e || N(t, 4, this.length),
                  i.read(this, t, !1, 23, 4)
                );
              }),
              (a.prototype.readDoubleLE = function(t, e) {
                return (
                  (t >>>= 0),
                  e || N(t, 8, this.length),
                  i.read(this, t, !0, 52, 8)
                );
              }),
              (a.prototype.readDoubleBE = function(t, e) {
                return (
                  (t >>>= 0),
                  e || N(t, 8, this.length),
                  i.read(this, t, !1, 52, 8)
                );
              }),
              (a.prototype.writeUIntLE = function(t, e, n, r) {
                ((t = +t), (e >>>= 0), (n >>>= 0), r) ||
                  I(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                var i = 1,
                  o = 0;
                for (this[e] = 255 & t; ++o < n && (i *= 256); )
                  this[e + o] = (t / i) & 255;
                return e + n;
              }),
              (a.prototype.writeUIntBE = function(t, e, n, r) {
                ((t = +t), (e >>>= 0), (n >>>= 0), r) ||
                  I(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                var i = n - 1,
                  o = 1;
                for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
                  this[e + i] = (t / o) & 255;
                return e + n;
              }),
              (a.prototype.writeUInt8 = function(t, e, n) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  n || I(this, t, e, 1, 255, 0),
                  (this[e] = 255 & t),
                  e + 1
                );
              }),
              (a.prototype.writeUInt16LE = function(t, e, n) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  n || I(this, t, e, 2, 65535, 0),
                  (this[e] = 255 & t),
                  (this[e + 1] = t >>> 8),
                  e + 2
                );
              }),
              (a.prototype.writeUInt16BE = function(t, e, n) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  n || I(this, t, e, 2, 65535, 0),
                  (this[e] = t >>> 8),
                  (this[e + 1] = 255 & t),
                  e + 2
                );
              }),
              (a.prototype.writeUInt32LE = function(t, e, n) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  n || I(this, t, e, 4, 4294967295, 0),
                  (this[e + 3] = t >>> 24),
                  (this[e + 2] = t >>> 16),
                  (this[e + 1] = t >>> 8),
                  (this[e] = 255 & t),
                  e + 4
                );
              }),
              (a.prototype.writeUInt32BE = function(t, e, n) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  n || I(this, t, e, 4, 4294967295, 0),
                  (this[e] = t >>> 24),
                  (this[e + 1] = t >>> 16),
                  (this[e + 2] = t >>> 8),
                  (this[e + 3] = 255 & t),
                  e + 4
                );
              }),
              (a.prototype.writeIntLE = function(t, e, n, r) {
                if (((t = +t), (e >>>= 0), !r)) {
                  var i = Math.pow(2, 8 * n - 1);
                  I(this, t, e, n, i - 1, -i);
                }
                var o = 0,
                  s = 1,
                  a = 0;
                for (this[e] = 255 & t; ++o < n && (s *= 256); )
                  t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1),
                    (this[e + o] = (((t / s) >> 0) - a) & 255);
                return e + n;
              }),
              (a.prototype.writeIntBE = function(t, e, n, r) {
                if (((t = +t), (e >>>= 0), !r)) {
                  var i = Math.pow(2, 8 * n - 1);
                  I(this, t, e, n, i - 1, -i);
                }
                var o = n - 1,
                  s = 1,
                  a = 0;
                for (this[e + o] = 255 & t; --o >= 0 && (s *= 256); )
                  t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1),
                    (this[e + o] = (((t / s) >> 0) - a) & 255);
                return e + n;
              }),
              (a.prototype.writeInt8 = function(t, e, n) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  n || I(this, t, e, 1, 127, -128),
                  t < 0 && (t = 255 + t + 1),
                  (this[e] = 255 & t),
                  e + 1
                );
              }),
              (a.prototype.writeInt16LE = function(t, e, n) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  n || I(this, t, e, 2, 32767, -32768),
                  (this[e] = 255 & t),
                  (this[e + 1] = t >>> 8),
                  e + 2
                );
              }),
              (a.prototype.writeInt16BE = function(t, e, n) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  n || I(this, t, e, 2, 32767, -32768),
                  (this[e] = t >>> 8),
                  (this[e + 1] = 255 & t),
                  e + 2
                );
              }),
              (a.prototype.writeInt32LE = function(t, e, n) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  n || I(this, t, e, 4, 2147483647, -2147483648),
                  (this[e] = 255 & t),
                  (this[e + 1] = t >>> 8),
                  (this[e + 2] = t >>> 16),
                  (this[e + 3] = t >>> 24),
                  e + 4
                );
              }),
              (a.prototype.writeInt32BE = function(t, e, n) {
                return (
                  (t = +t),
                  (e >>>= 0),
                  n || I(this, t, e, 4, 2147483647, -2147483648),
                  t < 0 && (t = 4294967295 + t + 1),
                  (this[e] = t >>> 24),
                  (this[e + 1] = t >>> 16),
                  (this[e + 2] = t >>> 8),
                  (this[e + 3] = 255 & t),
                  e + 4
                );
              }),
              (a.prototype.writeFloatLE = function(t, e, n) {
                return j(this, t, e, !0, n);
              }),
              (a.prototype.writeFloatBE = function(t, e, n) {
                return j(this, t, e, !1, n);
              }),
              (a.prototype.writeDoubleLE = function(t, e, n) {
                return q(this, t, e, !0, n);
              }),
              (a.prototype.writeDoubleBE = function(t, e, n) {
                return q(this, t, e, !1, n);
              }),
              (a.prototype.copy = function(t, e, n, r) {
                if (
                  (n || (n = 0),
                  r || 0 === r || (r = this.length),
                  e >= t.length && (e = t.length),
                  e || (e = 0),
                  r > 0 && r < n && (r = n),
                  r === n)
                )
                  return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (e < 0) throw new RangeError('targetStart out of bounds');
                if (n < 0 || n >= this.length)
                  throw new RangeError('sourceStart out of bounds');
                if (r < 0) throw new RangeError('sourceEnd out of bounds');
                r > this.length && (r = this.length),
                  t.length - e < r - n && (r = t.length - e + n);
                var i,
                  o = r - n;
                if (this === t && n < e && e < r)
                  for (i = o - 1; i >= 0; --i) t[i + e] = this[i + n];
                else if (o < 1e3)
                  for (i = 0; i < o; ++i) t[i + e] = this[i + n];
                else
                  Uint8Array.prototype.set.call(t, this.subarray(n, n + o), e);
                return o;
              }),
              (a.prototype.fill = function(t, e, n, r) {
                if ('string' == typeof t) {
                  if (
                    ('string' == typeof e
                      ? ((r = e), (e = 0), (n = this.length))
                      : 'string' == typeof n && ((r = n), (n = this.length)),
                    1 === t.length)
                  ) {
                    var i = t.charCodeAt(0);
                    i < 256 && (t = i);
                  }
                  if (void 0 !== r && 'string' != typeof r)
                    throw new TypeError('encoding must be a string');
                  if ('string' == typeof r && !a.isEncoding(r))
                    throw new TypeError('Unknown encoding: ' + r);
                } else 'number' == typeof t && (t &= 255);
                if (e < 0 || this.length < e || this.length < n)
                  throw new RangeError('Out of range index');
                if (n <= e) return this;
                var o;
                if (
                  ((e >>>= 0),
                  (n = void 0 === n ? this.length : n >>> 0),
                  t || (t = 0),
                  'number' == typeof t)
                )
                  for (o = e; o < n; ++o) this[o] = t;
                else {
                  var s = a.isBuffer(t) ? t : new a(t, r),
                    l = s.length;
                  for (o = 0; o < n - e; ++o) this[o + e] = s[o % l];
                }
                return this;
              });
            var O = /[^+/0-9A-Za-z-_]/g;
            function R(t) {
              return t < 16 ? '0' + t.toString(16) : t.toString(16);
            }
            function B(t, e) {
              var n;
              e = e || 1 / 0;
              for (var r = t.length, i = null, o = [], s = 0; s < r; ++s) {
                if ((n = t.charCodeAt(s)) > 55295 && n < 57344) {
                  if (!i) {
                    if (n > 56319) {
                      (e -= 3) > -1 && o.push(239, 191, 189);
                      continue;
                    }
                    if (s + 1 === r) {
                      (e -= 3) > -1 && o.push(239, 191, 189);
                      continue;
                    }
                    i = n;
                    continue;
                  }
                  if (n < 56320) {
                    (e -= 3) > -1 && o.push(239, 191, 189), (i = n);
                    continue;
                  }
                  n = 65536 + (((i - 55296) << 10) | (n - 56320));
                } else i && (e -= 3) > -1 && o.push(239, 191, 189);
                if (((i = null), n < 128)) {
                  if ((e -= 1) < 0) break;
                  o.push(n);
                } else if (n < 2048) {
                  if ((e -= 2) < 0) break;
                  o.push((n >> 6) | 192, (63 & n) | 128);
                } else if (n < 65536) {
                  if ((e -= 3) < 0) break;
                  o.push(
                    (n >> 12) | 224,
                    ((n >> 6) & 63) | 128,
                    (63 & n) | 128
                  );
                } else {
                  if (!(n < 1114112)) throw new Error('Invalid code point');
                  if ((e -= 4) < 0) break;
                  o.push(
                    (n >> 18) | 240,
                    ((n >> 12) & 63) | 128,
                    ((n >> 6) & 63) | 128,
                    (63 & n) | 128
                  );
                }
              }
              return o;
            }
            function M(t) {
              return r.toByteArray(
                (function(t) {
                  if (
                    (t = (function(t) {
                      return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '');
                    })(t).replace(O, '')).length < 2
                  )
                    return '';
                  for (; t.length % 4 != 0; ) t += '=';
                  return t;
                })(t)
              );
            }
            function P(t, e, n, r) {
              for (
                var i = 0;
                i < r && !(i + n >= e.length || i >= t.length);
                ++i
              )
                e[i + n] = t[i];
              return i;
            }
          },
          { 'base64-js': 2, ieee754: 37 }
        ],
        6: [
          function(t, e, n) {
            (function(t) {
              function e(t) {
                return Object.prototype.toString.call(t);
              }
              (n.isArray = function(t) {
                return Array.isArray
                  ? Array.isArray(t)
                  : '[object Array]' === e(t);
              }),
                (n.isBoolean = function(t) {
                  return 'boolean' == typeof t;
                }),
                (n.isNull = function(t) {
                  return null === t;
                }),
                (n.isNullOrUndefined = function(t) {
                  return null == t;
                }),
                (n.isNumber = function(t) {
                  return 'number' == typeof t;
                }),
                (n.isString = function(t) {
                  return 'string' == typeof t;
                }),
                (n.isSymbol = function(t) {
                  return 'symbol' == typeof t;
                }),
                (n.isUndefined = function(t) {
                  return void 0 === t;
                }),
                (n.isRegExp = function(t) {
                  return '[object RegExp]' === e(t);
                }),
                (n.isObject = function(t) {
                  return 'object' == typeof t && null !== t;
                }),
                (n.isDate = function(t) {
                  return '[object Date]' === e(t);
                }),
                (n.isError = function(t) {
                  return '[object Error]' === e(t) || t instanceof Error;
                }),
                (n.isFunction = function(t) {
                  return 'function' == typeof t;
                }),
                (n.isPrimitive = function(t) {
                  return (
                    null === t ||
                    'boolean' == typeof t ||
                    'number' == typeof t ||
                    'string' == typeof t ||
                    'symbol' == typeof t ||
                    'undefined' == typeof t
                  );
                }),
                (n.isBuffer = t.isBuffer);
            }.call(this, { isBuffer: t('../../is-buffer/index.js') }));
          },
          { '../../is-buffer/index.js': 39 }
        ],
        7: [
          function(t, e, n) {
            var r = t('domelementtype'),
              i = t('entities'),
              o = {
                __proto__: null,
                allowfullscreen: !0,
                async: !0,
                autofocus: !0,
                autoplay: !0,
                checked: !0,
                controls: !0,
                default: !0,
                defer: !0,
                disabled: !0,
                hidden: !0,
                ismap: !0,
                loop: !0,
                multiple: !0,
                muted: !0,
                open: !0,
                readonly: !0,
                required: !0,
                reversed: !0,
                scoped: !0,
                seamless: !0,
                selected: !0,
                typemustmatch: !0
              },
              s = {
                __proto__: null,
                style: !0,
                script: !0,
                xmp: !0,
                iframe: !0,
                noembed: !0,
                noframes: !0,
                plaintext: !0,
                noscript: !0
              };
            var a = {
                __proto__: null,
                area: !0,
                base: !0,
                basefont: !0,
                br: !0,
                col: !0,
                command: !0,
                embed: !0,
                frame: !0,
                hr: !0,
                img: !0,
                input: !0,
                isindex: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0
              },
              l = (e.exports = function(t, e) {
                Array.isArray(t) || t.cheerio || (t = [t]), (e = e || {});
                for (var n = '', i = 0; i < t.length; i++) {
                  var o = t[i];
                  'root' === o.type
                    ? (n += l(o.children, e))
                    : r.isTag(o)
                    ? (n += u(o, e))
                    : o.type === r.Directive
                    ? (n += c(o))
                    : o.type === r.Comment
                    ? (n += d(o))
                    : o.type === r.CDATA
                    ? (n += f(o))
                    : (n += h(o, e));
                }
                return n;
              });
            function u(t, e) {
              'svg' === t.name &&
                (e = { decodeEntities: e.decodeEntities, xmlMode: !0 });
              var n = '<' + t.name,
                r = (function(t, e) {
                  if (t) {
                    var n,
                      r = '';
                    for (var s in t)
                      (n = t[s]),
                        r && (r += ' '),
                        !n && o[s]
                          ? (r += s)
                          : (r +=
                              s +
                              '="' +
                              (e.decodeEntities ? i.encodeXML(n) : n) +
                              '"');
                    return r;
                  }
                })(t.attribs, e);
              return (
                r && (n += ' ' + r),
                !e.xmlMode || (t.children && 0 !== t.children.length)
                  ? ((n += '>'),
                    t.children && (n += l(t.children, e)),
                    (a[t.name] && !e.xmlMode) || (n += '</' + t.name + '>'))
                  : (n += '/>'),
                n
              );
            }
            function c(t) {
              return '<' + t.data + '>';
            }
            function h(t, e) {
              var n = t.data || '';
              return (
                !e.decodeEntities ||
                  (t.parent && t.parent.name in s) ||
                  (n = i.encodeXML(n)),
                n
              );
            }
            function f(t) {
              return '<![CDATA[' + t.children[0].data + ']]>';
            }
            function d(t) {
              return '\x3c!--' + t.data + '--\x3e';
            }
          },
          { domelementtype: 8, entities: 20 }
        ],
        8: [
          function(t, e, n) {
            e.exports = {
              Text: 'text',
              Directive: 'directive',
              Comment: 'comment',
              Script: 'script',
              Style: 'style',
              Tag: 'tag',
              CDATA: 'cdata',
              isTag: function(t) {
                return (
                  'tag' === t.type || 'script' === t.type || 'style' === t.type
                );
              }
            };
          },
          {}
        ],
        9: [
          function(t, e, n) {
            e.exports = {
              Text: 'text',
              Directive: 'directive',
              Comment: 'comment',
              Script: 'script',
              Style: 'style',
              Tag: 'tag',
              CDATA: 'cdata',
              Doctype: 'doctype',
              isTag: function(t) {
                return (
                  'tag' === t.type || 'script' === t.type || 'style' === t.type
                );
              }
            };
          },
          {}
        ],
        10: [
          function(t, e, n) {
            var r = t('domelementtype'),
              i = /\s+/g,
              o = t('./lib/node'),
              s = t('./lib/element');
            function a(t, e, n) {
              'object' == typeof t
                ? ((n = e), (e = t), (t = null))
                : 'function' == typeof e && ((n = e), (e = l)),
                (this._callback = t),
                (this._options = e || l),
                (this._elementCB = n),
                (this.dom = []),
                (this._done = !1),
                (this._tagStack = []),
                (this._parser = this._parser || null);
            }
            var l = { normalizeWhitespace: !1, withStartIndices: !1 };
            (a.prototype.onparserinit = function(t) {
              this._parser = t;
            }),
              (a.prototype.onreset = function() {
                a.call(this, this._callback, this._options, this._elementCB);
              }),
              (a.prototype.onend = function() {
                this._done ||
                  ((this._done = !0),
                  (this._parser = null),
                  this._handleCallback(null));
              }),
              (a.prototype._handleCallback = a.prototype.onerror = function(t) {
                if ('function' == typeof this._callback)
                  this._callback(t, this.dom);
                else if (t) throw t;
              }),
              (a.prototype.onclosetag = function() {
                var t = this._tagStack.pop();
                this._elementCB && this._elementCB(t);
              }),
              (a.prototype._addDomElement = function(t) {
                var e = this._tagStack[this._tagStack.length - 1],
                  n = e ? e.children : this.dom,
                  r = n[n.length - 1];
                (t.next = null),
                  this._options.withStartIndices &&
                    (t.startIndex = this._parser.startIndex),
                  this._options.withDomLvl1 &&
                    (t.__proto__ = 'tag' === t.type ? s : o),
                  r ? ((t.prev = r), (r.next = t)) : (t.prev = null),
                  n.push(t),
                  (t.parent = e || null);
              }),
              (a.prototype.onopentag = function(t, e) {
                var n = {
                  type:
                    'script' === t ? r.Script : 'style' === t ? r.Style : r.Tag,
                  name: t,
                  attribs: e,
                  children: []
                };
                this._addDomElement(n), this._tagStack.push(n);
              }),
              (a.prototype.ontext = function(t) {
                var e,
                  n =
                    this._options.normalizeWhitespace ||
                    this._options.ignoreWhitespace;
                !this._tagStack.length &&
                this.dom.length &&
                (e = this.dom[this.dom.length - 1]).type === r.Text
                  ? n
                    ? (e.data = (e.data + t).replace(i, ' '))
                    : (e.data += t)
                  : this._tagStack.length &&
                    (e = this._tagStack[this._tagStack.length - 1]) &&
                    (e = e.children[e.children.length - 1]) &&
                    e.type === r.Text
                  ? n
                    ? (e.data = (e.data + t).replace(i, ' '))
                    : (e.data += t)
                  : (n && (t = t.replace(i, ' ')),
                    this._addDomElement({ data: t, type: r.Text }));
              }),
              (a.prototype.oncomment = function(t) {
                var e = this._tagStack[this._tagStack.length - 1];
                if (e && e.type === r.Comment) e.data += t;
                else {
                  var n = { data: t, type: r.Comment };
                  this._addDomElement(n), this._tagStack.push(n);
                }
              }),
              (a.prototype.oncdatastart = function() {
                var t = {
                  children: [{ data: '', type: r.Text }],
                  type: r.CDATA
                };
                this._addDomElement(t), this._tagStack.push(t);
              }),
              (a.prototype.oncommentend = a.prototype.oncdataend = function() {
                this._tagStack.pop();
              }),
              (a.prototype.onprocessinginstruction = function(t, e) {
                this._addDomElement({ name: t, data: e, type: r.Directive });
              }),
              (e.exports = a);
          },
          { './lib/element': 11, './lib/node': 12, domelementtype: 9 }
        ],
        11: [
          function(t, e, n) {
            var r = t('./node'),
              i = (e.exports = Object.create(r)),
              o = { tagName: 'name' };
            Object.keys(o).forEach(function(t) {
              var e = o[t];
              Object.defineProperty(i, t, {
                get: function() {
                  return this[e] || null;
                },
                set: function(t) {
                  return (this[e] = t), t;
                }
              });
            });
          },
          { './node': 12 }
        ],
        12: [
          function(t, e, n) {
            var r = (e.exports = {
                get firstChild() {
                  var t = this.children;
                  return (t && t[0]) || null;
                },
                get lastChild() {
                  var t = this.children;
                  return (t && t[t.length - 1]) || null;
                },
                get nodeType() {
                  return o[this.type] || o.element;
                }
              }),
              i = {
                tagName: 'name',
                childNodes: 'children',
                parentNode: 'parent',
                previousSibling: 'prev',
                nextSibling: 'next',
                nodeValue: 'data'
              },
              o = { element: 1, text: 3, cdata: 4, comment: 8 };
            Object.keys(i).forEach(function(t) {
              var e = i[t];
              Object.defineProperty(r, t, {
                get: function() {
                  return this[e] || null;
                },
                set: function(t) {
                  return (this[e] = t), t;
                }
              });
            });
          },
          {}
        ],
        13: [
          function(t, e, n) {
            var r = e.exports;
            [
              t('./lib/stringify'),
              t('./lib/traversal'),
              t('./lib/manipulation'),
              t('./lib/querying'),
              t('./lib/legacy'),
              t('./lib/helpers')
            ].forEach(function(t) {
              Object.keys(t).forEach(function(e) {
                r[e] = t[e].bind(r);
              });
            });
          },
          {
            './lib/helpers': 14,
            './lib/legacy': 15,
            './lib/manipulation': 16,
            './lib/querying': 17,
            './lib/stringify': 18,
            './lib/traversal': 19
          }
        ],
        14: [
          function(t, e, n) {
            n.removeSubsets = function(t) {
              for (var e, n, r, i = t.length; --i > -1; ) {
                for (e = n = t[i], t[i] = null, r = !0; n; ) {
                  if (t.indexOf(n) > -1) {
                    (r = !1), t.splice(i, 1);
                    break;
                  }
                  n = n.parent;
                }
                r && (t[i] = e);
              }
              return t;
            };
            var r = 1,
              i = 2,
              o = 4,
              s = 8,
              a = 16,
              l = (n.compareDocumentPosition = function(t, e) {
                var n,
                  l,
                  u,
                  c,
                  h,
                  f,
                  d = [],
                  p = [];
                if (t === e) return 0;
                for (n = t; n; ) d.unshift(n), (n = n.parent);
                for (n = e; n; ) p.unshift(n), (n = n.parent);
                for (f = 0; d[f] === p[f]; ) f++;
                return 0 === f
                  ? r
                  : ((u = (l = d[f - 1]).children),
                    (c = d[f]),
                    (h = p[f]),
                    u.indexOf(c) > u.indexOf(h)
                      ? l === e
                        ? o | a
                        : o
                      : l === t
                      ? i | s
                      : i);
              });
            n.uniqueSort = function(t) {
              var e,
                n,
                r = t.length;
              for (t = t.slice(); --r > -1; )
                (e = t[r]), (n = t.indexOf(e)) > -1 && n < r && t.splice(r, 1);
              return (
                t.sort(function(t, e) {
                  var n = l(t, e);
                  return n & i ? -1 : n & o ? 1 : 0;
                }),
                t
              );
            };
          },
          {}
        ],
        15: [
          function(t, e, n) {
            var r = t('domelementtype'),
              i = (n.isTag = r.isTag);
            n.testElement = function(t, e) {
              for (var n in t)
                if (t.hasOwnProperty(n)) {
                  if ('tag_name' === n) {
                    if (!i(e) || !t.tag_name(e.name)) return !1;
                  } else if ('tag_type' === n) {
                    if (!t.tag_type(e.type)) return !1;
                  } else if ('tag_contains' === n) {
                    if (i(e) || !t.tag_contains(e.data)) return !1;
                  } else if (!e.attribs || !t[n](e.attribs[n])) return !1;
                } else;
              return !0;
            };
            var o = {
              tag_name: function(t) {
                return 'function' == typeof t
                  ? function(e) {
                      return i(e) && t(e.name);
                    }
                  : '*' === t
                  ? i
                  : function(e) {
                      return i(e) && e.name === t;
                    };
              },
              tag_type: function(t) {
                return 'function' == typeof t
                  ? function(e) {
                      return t(e.type);
                    }
                  : function(e) {
                      return e.type === t;
                    };
              },
              tag_contains: function(t) {
                return 'function' == typeof t
                  ? function(e) {
                      return !i(e) && t(e.data);
                    }
                  : function(e) {
                      return !i(e) && e.data === t;
                    };
              }
            };
            function s(t, e) {
              return 'function' == typeof e
                ? function(n) {
                    return n.attribs && e(n.attribs[t]);
                  }
                : function(n) {
                    return n.attribs && n.attribs[t] === e;
                  };
            }
            function a(t, e) {
              return function(n) {
                return t(n) || e(n);
              };
            }
            (n.getElements = function(t, e, n, r) {
              var i = Object.keys(t).map(function(e) {
                var n = t[e];
                return e in o ? o[e](n) : s(e, n);
              });
              return 0 === i.length ? [] : this.filter(i.reduce(a), e, n, r);
            }),
              (n.getElementById = function(t, e, n) {
                return (
                  Array.isArray(e) || (e = [e]),
                  this.findOne(s('id', t), e, !1 !== n)
                );
              }),
              (n.getElementsByTagName = function(t, e, n, r) {
                return this.filter(o.tag_name(t), e, n, r);
              }),
              (n.getElementsByTagType = function(t, e, n, r) {
                return this.filter(o.tag_type(t), e, n, r);
              });
          },
          { domelementtype: 9 }
        ],
        16: [
          function(t, e, n) {
            (n.removeElement = function(t) {
              if (
                (t.prev && (t.prev.next = t.next),
                t.next && (t.next.prev = t.prev),
                t.parent)
              ) {
                var e = t.parent.children;
                e.splice(e.lastIndexOf(t), 1);
              }
            }),
              (n.replaceElement = function(t, e) {
                var n = (e.prev = t.prev);
                n && (n.next = e);
                var r = (e.next = t.next);
                r && (r.prev = e);
                var i = (e.parent = t.parent);
                if (i) {
                  var o = i.children;
                  o[o.lastIndexOf(t)] = e;
                }
              }),
              (n.appendChild = function(t, e) {
                if (((e.parent = t), 1 !== t.children.push(e))) {
                  var n = t.children[t.children.length - 2];
                  (n.next = e), (e.prev = n), (e.next = null);
                }
              }),
              (n.append = function(t, e) {
                var n = t.parent,
                  r = t.next;
                if (
                  ((e.next = r), (e.prev = t), (t.next = e), (e.parent = n), r)
                ) {
                  if (((r.prev = e), n)) {
                    var i = n.children;
                    i.splice(i.lastIndexOf(r), 0, e);
                  }
                } else n && n.children.push(e);
              }),
              (n.prepend = function(t, e) {
                var n = t.parent;
                if (n) {
                  var r = n.children;
                  r.splice(r.lastIndexOf(t), 0, e);
                }
                t.prev && (t.prev.next = e),
                  (e.parent = n),
                  (e.prev = t.prev),
                  (e.next = t),
                  (t.prev = e);
              });
          },
          {}
        ],
        17: [
          function(t, e, n) {
            var r = t('domelementtype').isTag;
            function i(t, e, n, r) {
              for (
                var o, s = [], a = 0, l = e.length;
                a < l &&
                !(t(e[a]) && (s.push(e[a]), --r <= 0)) &&
                ((o = e[a].children),
                !(
                  n &&
                  o &&
                  o.length > 0 &&
                  ((o = i(t, o, n, r)), (s = s.concat(o)), (r -= o.length) <= 0)
                ));
                a++
              );
              return s;
            }
            e.exports = {
              filter: function(t, e, n, r) {
                Array.isArray(e) || (e = [e]);
                ('number' == typeof r && isFinite(r)) || (r = 1 / 0);
                return i(t, e, !1 !== n, r);
              },
              find: i,
              findOneChild: function(t, e) {
                for (var n = 0, r = e.length; n < r; n++)
                  if (t(e[n])) return e[n];
                return null;
              },
              findOne: function t(e, n) {
                var i = null;
                for (var o = 0, s = n.length; o < s && !i; o++)
                  r(n[o]) &&
                    (e(n[o])
                      ? (i = n[o])
                      : n[o].children.length > 0 && (i = t(e, n[o].children)));
                return i;
              },
              existsOne: function t(e, n) {
                for (var i = 0, o = n.length; i < o; i++)
                  if (
                    r(n[i]) &&
                    (e(n[i]) ||
                      (n[i].children.length > 0 && t(e, n[i].children)))
                  )
                    return !0;
                return !1;
              },
              findAll: function t(e, n) {
                var i = [];
                for (var o = 0, s = n.length; o < s; o++)
                  r(n[o]) &&
                    (e(n[o]) && i.push(n[o]),
                    n[o].children.length > 0 &&
                      (i = i.concat(t(e, n[o].children))));
                return i;
              }
            };
          },
          { domelementtype: 9 }
        ],
        18: [
          function(t, e, n) {
            var r = t('domelementtype'),
              i = t('dom-serializer'),
              o = r.isTag;
            e.exports = {
              getInnerHTML: function(t, e) {
                return t.children
                  ? t.children
                      .map(function(t) {
                        return i(t, e);
                      })
                      .join('')
                  : '';
              },
              getOuterHTML: i,
              getText: function t(e) {
                if (Array.isArray(e)) return e.map(t).join('');
                if (o(e) || e.type === r.CDATA) return t(e.children);
                if (e.type === r.Text) return e.data;
                return '';
              }
            };
          },
          { 'dom-serializer': 7, domelementtype: 9 }
        ],
        19: [
          function(t, e, n) {
            var r = (n.getChildren = function(t) {
                return t.children;
              }),
              i = (n.getParent = function(t) {
                return t.parent;
              });
            (n.getSiblings = function(t) {
              var e = i(t);
              return e ? r(e) : [t];
            }),
              (n.getAttributeValue = function(t, e) {
                return t.attribs && t.attribs[e];
              }),
              (n.hasAttrib = function(t, e) {
                return !!t.attribs && hasOwnProperty.call(t.attribs, e);
              }),
              (n.getName = function(t) {
                return t.name;
              });
          },
          {}
        ],
        20: [
          function(t, e, n) {
            var r = t('./lib/encode.js'),
              i = t('./lib/decode.js');
            (n.decode = function(t, e) {
              return (!e || e <= 0 ? i.XML : i.HTML)(t);
            }),
              (n.decodeStrict = function(t, e) {
                return (!e || e <= 0 ? i.XML : i.HTMLStrict)(t);
              }),
              (n.encode = function(t, e) {
                return (!e || e <= 0 ? r.XML : r.HTML)(t);
              }),
              (n.encodeXML = r.XML),
              (n.encodeHTML4 = n.encodeHTML5 = n.encodeHTML = r.HTML),
              (n.decodeXML = n.decodeXMLStrict = i.XML),
              (n.decodeHTML4 = n.decodeHTML5 = n.decodeHTML = i.HTML),
              (n.decodeHTML4Strict = n.decodeHTML5Strict = n.decodeHTMLStrict =
                i.HTMLStrict),
              (n.escape = r.escape);
          },
          { './lib/decode.js': 21, './lib/encode.js': 23 }
        ],
        21: [
          function(t, e, n) {
            var r = t('../maps/entities.json'),
              i = t('../maps/legacy.json'),
              o = t('../maps/xml.json'),
              s = t('./decode_codepoint.js'),
              a = u(o),
              l = u(r);
            function u(t) {
              var e = Object.keys(t).join('|'),
                n = f(t),
                r = new RegExp(
                  '&(?:' + (e += '|#[xX][\\da-fA-F]+|#\\d+') + ');',
                  'g'
                );
              return function(t) {
                return String(t).replace(r, n);
              };
            }
            var c = (function() {
              for (
                var t = Object.keys(i).sort(h),
                  e = Object.keys(r).sort(h),
                  n = 0,
                  o = 0;
                n < e.length;
                n++
              )
                t[o] === e[n] ? ((e[n] += ';?'), o++) : (e[n] += ';');
              var s = new RegExp(
                  '&(?:' + e.join('|') + '|#[xX][\\da-fA-F]+;?|#\\d+;?)',
                  'g'
                ),
                a = f(r);
              function l(t) {
                return ';' !== t.substr(-1) && (t += ';'), a(t);
              }
              return function(t) {
                return String(t).replace(s, l);
              };
            })();
            function h(t, e) {
              return t < e ? 1 : -1;
            }
            function f(t) {
              return function(e) {
                return '#' === e.charAt(1)
                  ? 'X' === e.charAt(2) || 'x' === e.charAt(2)
                    ? s(parseInt(e.substr(3), 16))
                    : s(parseInt(e.substr(2), 10))
                  : t[e.slice(1, -1)];
              };
            }
            e.exports = { XML: a, HTML: c, HTMLStrict: l };
          },
          {
            '../maps/entities.json': 25,
            '../maps/legacy.json': 26,
            '../maps/xml.json': 27,
            './decode_codepoint.js': 22
          }
        ],
        22: [
          function(t, e, n) {
            var r = t('../maps/decode.json');
            e.exports = function(t) {
              if ((t >= 55296 && t <= 57343) || t > 1114111) return '\ufffd';
              t in r && (t = r[t]);
              var e = '';
              t > 65535 &&
                ((t -= 65536),
                (e += String.fromCharCode(((t >>> 10) & 1023) | 55296)),
                (t = 56320 | (1023 & t)));
              return (e += String.fromCharCode(t));
            };
          },
          { '../maps/decode.json': 24 }
        ],
        23: [
          function(t, e, n) {
            var r = a(t('../maps/xml.json')),
              i = l(r);
            n.XML = d(r, i);
            var o = a(t('../maps/entities.json')),
              s = l(o);
            function a(t) {
              return Object.keys(t)
                .sort()
                .reduce(function(e, n) {
                  return (e[t[n]] = '&' + n + ';'), e;
                }, {});
            }
            function l(t) {
              var e = [],
                n = [];
              return (
                Object.keys(t).forEach(function(t) {
                  1 === t.length ? e.push('\\' + t) : n.push(t);
                }),
                n.unshift('[' + e.join('') + ']'),
                new RegExp(n.join('|'), 'g')
              );
            }
            n.HTML = d(o, s);
            var u = /[^\0-\x7F]/g,
              c = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
            function h(t) {
              return (
                '&#x' +
                t
                  .charCodeAt(0)
                  .toString(16)
                  .toUpperCase() +
                ';'
              );
            }
            function f(t) {
              return (
                '&#x' +
                (
                  1024 * (t.charCodeAt(0) - 55296) +
                  t.charCodeAt(1) -
                  56320 +
                  65536
                )
                  .toString(16)
                  .toUpperCase() +
                ';'
              );
            }
            function d(t, e) {
              function n(e) {
                return t[e];
              }
              return function(t) {
                return t
                  .replace(e, n)
                  .replace(c, f)
                  .replace(u, h);
              };
            }
            var p = l(r);
            n.escape = function(t) {
              return t
                .replace(p, h)
                .replace(c, f)
                .replace(u, h);
            };
          },
          { '../maps/entities.json': 25, '../maps/xml.json': 27 }
        ],
        24: [
          function(t, e, n) {
            e.exports = {
              0: 65533,
              128: 8364,
              130: 8218,
              131: 402,
              132: 8222,
              133: 8230,
              134: 8224,
              135: 8225,
              136: 710,
              137: 8240,
              138: 352,
              139: 8249,
              140: 338,
              142: 381,
              145: 8216,
              146: 8217,
              147: 8220,
              148: 8221,
              149: 8226,
              150: 8211,
              151: 8212,
              152: 732,
              153: 8482,
              154: 353,
              155: 8250,
              156: 339,
              158: 382,
              159: 376
            };
          },
          {}
        ],
        25: [
          function(t, e, n) {
            e.exports = {
              Aacute: '\xc1',
              aacute: '\xe1',
              Abreve: '\u0102',
              abreve: '\u0103',
              ac: '\u223e',
              acd: '\u223f',
              acE: '\u223e\u0333',
              Acirc: '\xc2',
              acirc: '\xe2',
              acute: '\xb4',
              Acy: '\u0410',
              acy: '\u0430',
              AElig: '\xc6',
              aelig: '\xe6',
              af: '\u2061',
              Afr: '\ud835\udd04',
              afr: '\ud835\udd1e',
              Agrave: '\xc0',
              agrave: '\xe0',
              alefsym: '\u2135',
              aleph: '\u2135',
              Alpha: '\u0391',
              alpha: '\u03b1',
              Amacr: '\u0100',
              amacr: '\u0101',
              amalg: '\u2a3f',
              amp: '&',
              AMP: '&',
              andand: '\u2a55',
              And: '\u2a53',
              and: '\u2227',
              andd: '\u2a5c',
              andslope: '\u2a58',
              andv: '\u2a5a',
              ang: '\u2220',
              ange: '\u29a4',
              angle: '\u2220',
              angmsdaa: '\u29a8',
              angmsdab: '\u29a9',
              angmsdac: '\u29aa',
              angmsdad: '\u29ab',
              angmsdae: '\u29ac',
              angmsdaf: '\u29ad',
              angmsdag: '\u29ae',
              angmsdah: '\u29af',
              angmsd: '\u2221',
              angrt: '\u221f',
              angrtvb: '\u22be',
              angrtvbd: '\u299d',
              angsph: '\u2222',
              angst: '\xc5',
              angzarr: '\u237c',
              Aogon: '\u0104',
              aogon: '\u0105',
              Aopf: '\ud835\udd38',
              aopf: '\ud835\udd52',
              apacir: '\u2a6f',
              ap: '\u2248',
              apE: '\u2a70',
              ape: '\u224a',
              apid: '\u224b',
              apos: "'",
              ApplyFunction: '\u2061',
              approx: '\u2248',
              approxeq: '\u224a',
              Aring: '\xc5',
              aring: '\xe5',
              Ascr: '\ud835\udc9c',
              ascr: '\ud835\udcb6',
              Assign: '\u2254',
              ast: '*',
              asymp: '\u2248',
              asympeq: '\u224d',
              Atilde: '\xc3',
              atilde: '\xe3',
              Auml: '\xc4',
              auml: '\xe4',
              awconint: '\u2233',
              awint: '\u2a11',
              backcong: '\u224c',
              backepsilon: '\u03f6',
              backprime: '\u2035',
              backsim: '\u223d',
              backsimeq: '\u22cd',
              Backslash: '\u2216',
              Barv: '\u2ae7',
              barvee: '\u22bd',
              barwed: '\u2305',
              Barwed: '\u2306',
              barwedge: '\u2305',
              bbrk: '\u23b5',
              bbrktbrk: '\u23b6',
              bcong: '\u224c',
              Bcy: '\u0411',
              bcy: '\u0431',
              bdquo: '\u201e',
              becaus: '\u2235',
              because: '\u2235',
              Because: '\u2235',
              bemptyv: '\u29b0',
              bepsi: '\u03f6',
              bernou: '\u212c',
              Bernoullis: '\u212c',
              Beta: '\u0392',
              beta: '\u03b2',
              beth: '\u2136',
              between: '\u226c',
              Bfr: '\ud835\udd05',
              bfr: '\ud835\udd1f',
              bigcap: '\u22c2',
              bigcirc: '\u25ef',
              bigcup: '\u22c3',
              bigodot: '\u2a00',
              bigoplus: '\u2a01',
              bigotimes: '\u2a02',
              bigsqcup: '\u2a06',
              bigstar: '\u2605',
              bigtriangledown: '\u25bd',
              bigtriangleup: '\u25b3',
              biguplus: '\u2a04',
              bigvee: '\u22c1',
              bigwedge: '\u22c0',
              bkarow: '\u290d',
              blacklozenge: '\u29eb',
              blacksquare: '\u25aa',
              blacktriangle: '\u25b4',
              blacktriangledown: '\u25be',
              blacktriangleleft: '\u25c2',
              blacktriangleright: '\u25b8',
              blank: '\u2423',
              blk12: '\u2592',
              blk14: '\u2591',
              blk34: '\u2593',
              block: '\u2588',
              bne: '=\u20e5',
              bnequiv: '\u2261\u20e5',
              bNot: '\u2aed',
              bnot: '\u2310',
              Bopf: '\ud835\udd39',
              bopf: '\ud835\udd53',
              bot: '\u22a5',
              bottom: '\u22a5',
              bowtie: '\u22c8',
              boxbox: '\u29c9',
              boxdl: '\u2510',
              boxdL: '\u2555',
              boxDl: '\u2556',
              boxDL: '\u2557',
              boxdr: '\u250c',
              boxdR: '\u2552',
              boxDr: '\u2553',
              boxDR: '\u2554',
              boxh: '\u2500',
              boxH: '\u2550',
              boxhd: '\u252c',
              boxHd: '\u2564',
              boxhD: '\u2565',
              boxHD: '\u2566',
              boxhu: '\u2534',
              boxHu: '\u2567',
              boxhU: '\u2568',
              boxHU: '\u2569',
              boxminus: '\u229f',
              boxplus: '\u229e',
              boxtimes: '\u22a0',
              boxul: '\u2518',
              boxuL: '\u255b',
              boxUl: '\u255c',
              boxUL: '\u255d',
              boxur: '\u2514',
              boxuR: '\u2558',
              boxUr: '\u2559',
              boxUR: '\u255a',
              boxv: '\u2502',
              boxV: '\u2551',
              boxvh: '\u253c',
              boxvH: '\u256a',
              boxVh: '\u256b',
              boxVH: '\u256c',
              boxvl: '\u2524',
              boxvL: '\u2561',
              boxVl: '\u2562',
              boxVL: '\u2563',
              boxvr: '\u251c',
              boxvR: '\u255e',
              boxVr: '\u255f',
              boxVR: '\u2560',
              bprime: '\u2035',
              breve: '\u02d8',
              Breve: '\u02d8',
              brvbar: '\xa6',
              bscr: '\ud835\udcb7',
              Bscr: '\u212c',
              bsemi: '\u204f',
              bsim: '\u223d',
              bsime: '\u22cd',
              bsolb: '\u29c5',
              bsol: '\\',
              bsolhsub: '\u27c8',
              bull: '\u2022',
              bullet: '\u2022',
              bump: '\u224e',
              bumpE: '\u2aae',
              bumpe: '\u224f',
              Bumpeq: '\u224e',
              bumpeq: '\u224f',
              Cacute: '\u0106',
              cacute: '\u0107',
              capand: '\u2a44',
              capbrcup: '\u2a49',
              capcap: '\u2a4b',
              cap: '\u2229',
              Cap: '\u22d2',
              capcup: '\u2a47',
              capdot: '\u2a40',
              CapitalDifferentialD: '\u2145',
              caps: '\u2229\ufe00',
              caret: '\u2041',
              caron: '\u02c7',
              Cayleys: '\u212d',
              ccaps: '\u2a4d',
              Ccaron: '\u010c',
              ccaron: '\u010d',
              Ccedil: '\xc7',
              ccedil: '\xe7',
              Ccirc: '\u0108',
              ccirc: '\u0109',
              Cconint: '\u2230',
              ccups: '\u2a4c',
              ccupssm: '\u2a50',
              Cdot: '\u010a',
              cdot: '\u010b',
              cedil: '\xb8',
              Cedilla: '\xb8',
              cemptyv: '\u29b2',
              cent: '\xa2',
              centerdot: '\xb7',
              CenterDot: '\xb7',
              cfr: '\ud835\udd20',
              Cfr: '\u212d',
              CHcy: '\u0427',
              chcy: '\u0447',
              check: '\u2713',
              checkmark: '\u2713',
              Chi: '\u03a7',
              chi: '\u03c7',
              circ: '\u02c6',
              circeq: '\u2257',
              circlearrowleft: '\u21ba',
              circlearrowright: '\u21bb',
              circledast: '\u229b',
              circledcirc: '\u229a',
              circleddash: '\u229d',
              CircleDot: '\u2299',
              circledR: '\xae',
              circledS: '\u24c8',
              CircleMinus: '\u2296',
              CirclePlus: '\u2295',
              CircleTimes: '\u2297',
              cir: '\u25cb',
              cirE: '\u29c3',
              cire: '\u2257',
              cirfnint: '\u2a10',
              cirmid: '\u2aef',
              cirscir: '\u29c2',
              ClockwiseContourIntegral: '\u2232',
              CloseCurlyDoubleQuote: '\u201d',
              CloseCurlyQuote: '\u2019',
              clubs: '\u2663',
              clubsuit: '\u2663',
              colon: ':',
              Colon: '\u2237',
              Colone: '\u2a74',
              colone: '\u2254',
              coloneq: '\u2254',
              comma: ',',
              commat: '@',
              comp: '\u2201',
              compfn: '\u2218',
              complement: '\u2201',
              complexes: '\u2102',
              cong: '\u2245',
              congdot: '\u2a6d',
              Congruent: '\u2261',
              conint: '\u222e',
              Conint: '\u222f',
              ContourIntegral: '\u222e',
              copf: '\ud835\udd54',
              Copf: '\u2102',
              coprod: '\u2210',
              Coproduct: '\u2210',
              copy: '\xa9',
              COPY: '\xa9',
              copysr: '\u2117',
              CounterClockwiseContourIntegral: '\u2233',
              crarr: '\u21b5',
              cross: '\u2717',
              Cross: '\u2a2f',
              Cscr: '\ud835\udc9e',
              cscr: '\ud835\udcb8',
              csub: '\u2acf',
              csube: '\u2ad1',
              csup: '\u2ad0',
              csupe: '\u2ad2',
              ctdot: '\u22ef',
              cudarrl: '\u2938',
              cudarrr: '\u2935',
              cuepr: '\u22de',
              cuesc: '\u22df',
              cularr: '\u21b6',
              cularrp: '\u293d',
              cupbrcap: '\u2a48',
              cupcap: '\u2a46',
              CupCap: '\u224d',
              cup: '\u222a',
              Cup: '\u22d3',
              cupcup: '\u2a4a',
              cupdot: '\u228d',
              cupor: '\u2a45',
              cups: '\u222a\ufe00',
              curarr: '\u21b7',
              curarrm: '\u293c',
              curlyeqprec: '\u22de',
              curlyeqsucc: '\u22df',
              curlyvee: '\u22ce',
              curlywedge: '\u22cf',
              curren: '\xa4',
              curvearrowleft: '\u21b6',
              curvearrowright: '\u21b7',
              cuvee: '\u22ce',
              cuwed: '\u22cf',
              cwconint: '\u2232',
              cwint: '\u2231',
              cylcty: '\u232d',
              dagger: '\u2020',
              Dagger: '\u2021',
              daleth: '\u2138',
              darr: '\u2193',
              Darr: '\u21a1',
              dArr: '\u21d3',
              dash: '\u2010',
              Dashv: '\u2ae4',
              dashv: '\u22a3',
              dbkarow: '\u290f',
              dblac: '\u02dd',
              Dcaron: '\u010e',
              dcaron: '\u010f',
              Dcy: '\u0414',
              dcy: '\u0434',
              ddagger: '\u2021',
              ddarr: '\u21ca',
              DD: '\u2145',
              dd: '\u2146',
              DDotrahd: '\u2911',
              ddotseq: '\u2a77',
              deg: '\xb0',
              Del: '\u2207',
              Delta: '\u0394',
              delta: '\u03b4',
              demptyv: '\u29b1',
              dfisht: '\u297f',
              Dfr: '\ud835\udd07',
              dfr: '\ud835\udd21',
              dHar: '\u2965',
              dharl: '\u21c3',
              dharr: '\u21c2',
              DiacriticalAcute: '\xb4',
              DiacriticalDot: '\u02d9',
              DiacriticalDoubleAcute: '\u02dd',
              DiacriticalGrave: '`',
              DiacriticalTilde: '\u02dc',
              diam: '\u22c4',
              diamond: '\u22c4',
              Diamond: '\u22c4',
              diamondsuit: '\u2666',
              diams: '\u2666',
              die: '\xa8',
              DifferentialD: '\u2146',
              digamma: '\u03dd',
              disin: '\u22f2',
              div: '\xf7',
              divide: '\xf7',
              divideontimes: '\u22c7',
              divonx: '\u22c7',
              DJcy: '\u0402',
              djcy: '\u0452',
              dlcorn: '\u231e',
              dlcrop: '\u230d',
              dollar: '$',
              Dopf: '\ud835\udd3b',
              dopf: '\ud835\udd55',
              Dot: '\xa8',
              dot: '\u02d9',
              DotDot: '\u20dc',
              doteq: '\u2250',
              doteqdot: '\u2251',
              DotEqual: '\u2250',
              dotminus: '\u2238',
              dotplus: '\u2214',
              dotsquare: '\u22a1',
              doublebarwedge: '\u2306',
              DoubleContourIntegral: '\u222f',
              DoubleDot: '\xa8',
              DoubleDownArrow: '\u21d3',
              DoubleLeftArrow: '\u21d0',
              DoubleLeftRightArrow: '\u21d4',
              DoubleLeftTee: '\u2ae4',
              DoubleLongLeftArrow: '\u27f8',
              DoubleLongLeftRightArrow: '\u27fa',
              DoubleLongRightArrow: '\u27f9',
              DoubleRightArrow: '\u21d2',
              DoubleRightTee: '\u22a8',
              DoubleUpArrow: '\u21d1',
              DoubleUpDownArrow: '\u21d5',
              DoubleVerticalBar: '\u2225',
              DownArrowBar: '\u2913',
              downarrow: '\u2193',
              DownArrow: '\u2193',
              Downarrow: '\u21d3',
              DownArrowUpArrow: '\u21f5',
              DownBreve: '\u0311',
              downdownarrows: '\u21ca',
              downharpoonleft: '\u21c3',
              downharpoonright: '\u21c2',
              DownLeftRightVector: '\u2950',
              DownLeftTeeVector: '\u295e',
              DownLeftVectorBar: '\u2956',
              DownLeftVector: '\u21bd',
              DownRightTeeVector: '\u295f',
              DownRightVectorBar: '\u2957',
              DownRightVector: '\u21c1',
              DownTeeArrow: '\u21a7',
              DownTee: '\u22a4',
              drbkarow: '\u2910',
              drcorn: '\u231f',
              drcrop: '\u230c',
              Dscr: '\ud835\udc9f',
              dscr: '\ud835\udcb9',
              DScy: '\u0405',
              dscy: '\u0455',
              dsol: '\u29f6',
              Dstrok: '\u0110',
              dstrok: '\u0111',
              dtdot: '\u22f1',
              dtri: '\u25bf',
              dtrif: '\u25be',
              duarr: '\u21f5',
              duhar: '\u296f',
              dwangle: '\u29a6',
              DZcy: '\u040f',
              dzcy: '\u045f',
              dzigrarr: '\u27ff',
              Eacute: '\xc9',
              eacute: '\xe9',
              easter: '\u2a6e',
              Ecaron: '\u011a',
              ecaron: '\u011b',
              Ecirc: '\xca',
              ecirc: '\xea',
              ecir: '\u2256',
              ecolon: '\u2255',
              Ecy: '\u042d',
              ecy: '\u044d',
              eDDot: '\u2a77',
              Edot: '\u0116',
              edot: '\u0117',
              eDot: '\u2251',
              ee: '\u2147',
              efDot: '\u2252',
              Efr: '\ud835\udd08',
              efr: '\ud835\udd22',
              eg: '\u2a9a',
              Egrave: '\xc8',
              egrave: '\xe8',
              egs: '\u2a96',
              egsdot: '\u2a98',
              el: '\u2a99',
              Element: '\u2208',
              elinters: '\u23e7',
              ell: '\u2113',
              els: '\u2a95',
              elsdot: '\u2a97',
              Emacr: '\u0112',
              emacr: '\u0113',
              empty: '\u2205',
              emptyset: '\u2205',
              EmptySmallSquare: '\u25fb',
              emptyv: '\u2205',
              EmptyVerySmallSquare: '\u25ab',
              emsp13: '\u2004',
              emsp14: '\u2005',
              emsp: '\u2003',
              ENG: '\u014a',
              eng: '\u014b',
              ensp: '\u2002',
              Eogon: '\u0118',
              eogon: '\u0119',
              Eopf: '\ud835\udd3c',
              eopf: '\ud835\udd56',
              epar: '\u22d5',
              eparsl: '\u29e3',
              eplus: '\u2a71',
              epsi: '\u03b5',
              Epsilon: '\u0395',
              epsilon: '\u03b5',
              epsiv: '\u03f5',
              eqcirc: '\u2256',
              eqcolon: '\u2255',
              eqsim: '\u2242',
              eqslantgtr: '\u2a96',
              eqslantless: '\u2a95',
              Equal: '\u2a75',
              equals: '=',
              EqualTilde: '\u2242',
              equest: '\u225f',
              Equilibrium: '\u21cc',
              equiv: '\u2261',
              equivDD: '\u2a78',
              eqvparsl: '\u29e5',
              erarr: '\u2971',
              erDot: '\u2253',
              escr: '\u212f',
              Escr: '\u2130',
              esdot: '\u2250',
              Esim: '\u2a73',
              esim: '\u2242',
              Eta: '\u0397',
              eta: '\u03b7',
              ETH: '\xd0',
              eth: '\xf0',
              Euml: '\xcb',
              euml: '\xeb',
              euro: '\u20ac',
              excl: '!',
              exist: '\u2203',
              Exists: '\u2203',
              expectation: '\u2130',
              exponentiale: '\u2147',
              ExponentialE: '\u2147',
              fallingdotseq: '\u2252',
              Fcy: '\u0424',
              fcy: '\u0444',
              female: '\u2640',
              ffilig: '\ufb03',
              fflig: '\ufb00',
              ffllig: '\ufb04',
              Ffr: '\ud835\udd09',
              ffr: '\ud835\udd23',
              filig: '\ufb01',
              FilledSmallSquare: '\u25fc',
              FilledVerySmallSquare: '\u25aa',
              fjlig: 'fj',
              flat: '\u266d',
              fllig: '\ufb02',
              fltns: '\u25b1',
              fnof: '\u0192',
              Fopf: '\ud835\udd3d',
              fopf: '\ud835\udd57',
              forall: '\u2200',
              ForAll: '\u2200',
              fork: '\u22d4',
              forkv: '\u2ad9',
              Fouriertrf: '\u2131',
              fpartint: '\u2a0d',
              frac12: '\xbd',
              frac13: '\u2153',
              frac14: '\xbc',
              frac15: '\u2155',
              frac16: '\u2159',
              frac18: '\u215b',
              frac23: '\u2154',
              frac25: '\u2156',
              frac34: '\xbe',
              frac35: '\u2157',
              frac38: '\u215c',
              frac45: '\u2158',
              frac56: '\u215a',
              frac58: '\u215d',
              frac78: '\u215e',
              frasl: '\u2044',
              frown: '\u2322',
              fscr: '\ud835\udcbb',
              Fscr: '\u2131',
              gacute: '\u01f5',
              Gamma: '\u0393',
              gamma: '\u03b3',
              Gammad: '\u03dc',
              gammad: '\u03dd',
              gap: '\u2a86',
              Gbreve: '\u011e',
              gbreve: '\u011f',
              Gcedil: '\u0122',
              Gcirc: '\u011c',
              gcirc: '\u011d',
              Gcy: '\u0413',
              gcy: '\u0433',
              Gdot: '\u0120',
              gdot: '\u0121',
              ge: '\u2265',
              gE: '\u2267',
              gEl: '\u2a8c',
              gel: '\u22db',
              geq: '\u2265',
              geqq: '\u2267',
              geqslant: '\u2a7e',
              gescc: '\u2aa9',
              ges: '\u2a7e',
              gesdot: '\u2a80',
              gesdoto: '\u2a82',
              gesdotol: '\u2a84',
              gesl: '\u22db\ufe00',
              gesles: '\u2a94',
              Gfr: '\ud835\udd0a',
              gfr: '\ud835\udd24',
              gg: '\u226b',
              Gg: '\u22d9',
              ggg: '\u22d9',
              gimel: '\u2137',
              GJcy: '\u0403',
              gjcy: '\u0453',
              gla: '\u2aa5',
              gl: '\u2277',
              glE: '\u2a92',
              glj: '\u2aa4',
              gnap: '\u2a8a',
              gnapprox: '\u2a8a',
              gne: '\u2a88',
              gnE: '\u2269',
              gneq: '\u2a88',
              gneqq: '\u2269',
              gnsim: '\u22e7',
              Gopf: '\ud835\udd3e',
              gopf: '\ud835\udd58',
              grave: '`',
              GreaterEqual: '\u2265',
              GreaterEqualLess: '\u22db',
              GreaterFullEqual: '\u2267',
              GreaterGreater: '\u2aa2',
              GreaterLess: '\u2277',
              GreaterSlantEqual: '\u2a7e',
              GreaterTilde: '\u2273',
              Gscr: '\ud835\udca2',
              gscr: '\u210a',
              gsim: '\u2273',
              gsime: '\u2a8e',
              gsiml: '\u2a90',
              gtcc: '\u2aa7',
              gtcir: '\u2a7a',
              gt: '>',
              GT: '>',
              Gt: '\u226b',
              gtdot: '\u22d7',
              gtlPar: '\u2995',
              gtquest: '\u2a7c',
              gtrapprox: '\u2a86',
              gtrarr: '\u2978',
              gtrdot: '\u22d7',
              gtreqless: '\u22db',
              gtreqqless: '\u2a8c',
              gtrless: '\u2277',
              gtrsim: '\u2273',
              gvertneqq: '\u2269\ufe00',
              gvnE: '\u2269\ufe00',
              Hacek: '\u02c7',
              hairsp: '\u200a',
              half: '\xbd',
              hamilt: '\u210b',
              HARDcy: '\u042a',
              hardcy: '\u044a',
              harrcir: '\u2948',
              harr: '\u2194',
              hArr: '\u21d4',
              harrw: '\u21ad',
              Hat: '^',
              hbar: '\u210f',
              Hcirc: '\u0124',
              hcirc: '\u0125',
              hearts: '\u2665',
              heartsuit: '\u2665',
              hellip: '\u2026',
              hercon: '\u22b9',
              hfr: '\ud835\udd25',
              Hfr: '\u210c',
              HilbertSpace: '\u210b',
              hksearow: '\u2925',
              hkswarow: '\u2926',
              hoarr: '\u21ff',
              homtht: '\u223b',
              hookleftarrow: '\u21a9',
              hookrightarrow: '\u21aa',
              hopf: '\ud835\udd59',
              Hopf: '\u210d',
              horbar: '\u2015',
              HorizontalLine: '\u2500',
              hscr: '\ud835\udcbd',
              Hscr: '\u210b',
              hslash: '\u210f',
              Hstrok: '\u0126',
              hstrok: '\u0127',
              HumpDownHump: '\u224e',
              HumpEqual: '\u224f',
              hybull: '\u2043',
              hyphen: '\u2010',
              Iacute: '\xcd',
              iacute: '\xed',
              ic: '\u2063',
              Icirc: '\xce',
              icirc: '\xee',
              Icy: '\u0418',
              icy: '\u0438',
              Idot: '\u0130',
              IEcy: '\u0415',
              iecy: '\u0435',
              iexcl: '\xa1',
              iff: '\u21d4',
              ifr: '\ud835\udd26',
              Ifr: '\u2111',
              Igrave: '\xcc',
              igrave: '\xec',
              ii: '\u2148',
              iiiint: '\u2a0c',
              iiint: '\u222d',
              iinfin: '\u29dc',
              iiota: '\u2129',
              IJlig: '\u0132',
              ijlig: '\u0133',
              Imacr: '\u012a',
              imacr: '\u012b',
              image: '\u2111',
              ImaginaryI: '\u2148',
              imagline: '\u2110',
              imagpart: '\u2111',
              imath: '\u0131',
              Im: '\u2111',
              imof: '\u22b7',
              imped: '\u01b5',
              Implies: '\u21d2',
              incare: '\u2105',
              in: '\u2208',
              infin: '\u221e',
              infintie: '\u29dd',
              inodot: '\u0131',
              intcal: '\u22ba',
              int: '\u222b',
              Int: '\u222c',
              integers: '\u2124',
              Integral: '\u222b',
              intercal: '\u22ba',
              Intersection: '\u22c2',
              intlarhk: '\u2a17',
              intprod: '\u2a3c',
              InvisibleComma: '\u2063',
              InvisibleTimes: '\u2062',
              IOcy: '\u0401',
              iocy: '\u0451',
              Iogon: '\u012e',
              iogon: '\u012f',
              Iopf: '\ud835\udd40',
              iopf: '\ud835\udd5a',
              Iota: '\u0399',
              iota: '\u03b9',
              iprod: '\u2a3c',
              iquest: '\xbf',
              iscr: '\ud835\udcbe',
              Iscr: '\u2110',
              isin: '\u2208',
              isindot: '\u22f5',
              isinE: '\u22f9',
              isins: '\u22f4',
              isinsv: '\u22f3',
              isinv: '\u2208',
              it: '\u2062',
              Itilde: '\u0128',
              itilde: '\u0129',
              Iukcy: '\u0406',
              iukcy: '\u0456',
              Iuml: '\xcf',
              iuml: '\xef',
              Jcirc: '\u0134',
              jcirc: '\u0135',
              Jcy: '\u0419',
              jcy: '\u0439',
              Jfr: '\ud835\udd0d',
              jfr: '\ud835\udd27',
              jmath: '\u0237',
              Jopf: '\ud835\udd41',
              jopf: '\ud835\udd5b',
              Jscr: '\ud835\udca5',
              jscr: '\ud835\udcbf',
              Jsercy: '\u0408',
              jsercy: '\u0458',
              Jukcy: '\u0404',
              jukcy: '\u0454',
              Kappa: '\u039a',
              kappa: '\u03ba',
              kappav: '\u03f0',
              Kcedil: '\u0136',
              kcedil: '\u0137',
              Kcy: '\u041a',
              kcy: '\u043a',
              Kfr: '\ud835\udd0e',
              kfr: '\ud835\udd28',
              kgreen: '\u0138',
              KHcy: '\u0425',
              khcy: '\u0445',
              KJcy: '\u040c',
              kjcy: '\u045c',
              Kopf: '\ud835\udd42',
              kopf: '\ud835\udd5c',
              Kscr: '\ud835\udca6',
              kscr: '\ud835\udcc0',
              lAarr: '\u21da',
              Lacute: '\u0139',
              lacute: '\u013a',
              laemptyv: '\u29b4',
              lagran: '\u2112',
              Lambda: '\u039b',
              lambda: '\u03bb',
              lang: '\u27e8',
              Lang: '\u27ea',
              langd: '\u2991',
              langle: '\u27e8',
              lap: '\u2a85',
              Laplacetrf: '\u2112',
              laquo: '\xab',
              larrb: '\u21e4',
              larrbfs: '\u291f',
              larr: '\u2190',
              Larr: '\u219e',
              lArr: '\u21d0',
              larrfs: '\u291d',
              larrhk: '\u21a9',
              larrlp: '\u21ab',
              larrpl: '\u2939',
              larrsim: '\u2973',
              larrtl: '\u21a2',
              latail: '\u2919',
              lAtail: '\u291b',
              lat: '\u2aab',
              late: '\u2aad',
              lates: '\u2aad\ufe00',
              lbarr: '\u290c',
              lBarr: '\u290e',
              lbbrk: '\u2772',
              lbrace: '{',
              lbrack: '[',
              lbrke: '\u298b',
              lbrksld: '\u298f',
              lbrkslu: '\u298d',
              Lcaron: '\u013d',
              lcaron: '\u013e',
              Lcedil: '\u013b',
              lcedil: '\u013c',
              lceil: '\u2308',
              lcub: '{',
              Lcy: '\u041b',
              lcy: '\u043b',
              ldca: '\u2936',
              ldquo: '\u201c',
              ldquor: '\u201e',
              ldrdhar: '\u2967',
              ldrushar: '\u294b',
              ldsh: '\u21b2',
              le: '\u2264',
              lE: '\u2266',
              LeftAngleBracket: '\u27e8',
              LeftArrowBar: '\u21e4',
              leftarrow: '\u2190',
              LeftArrow: '\u2190',
              Leftarrow: '\u21d0',
              LeftArrowRightArrow: '\u21c6',
              leftarrowtail: '\u21a2',
              LeftCeiling: '\u2308',
              LeftDoubleBracket: '\u27e6',
              LeftDownTeeVector: '\u2961',
              LeftDownVectorBar: '\u2959',
              LeftDownVector: '\u21c3',
              LeftFloor: '\u230a',
              leftharpoondown: '\u21bd',
              leftharpoonup: '\u21bc',
              leftleftarrows: '\u21c7',
              leftrightarrow: '\u2194',
              LeftRightArrow: '\u2194',
              Leftrightarrow: '\u21d4',
              leftrightarrows: '\u21c6',
              leftrightharpoons: '\u21cb',
              leftrightsquigarrow: '\u21ad',
              LeftRightVector: '\u294e',
              LeftTeeArrow: '\u21a4',
              LeftTee: '\u22a3',
              LeftTeeVector: '\u295a',
              leftthreetimes: '\u22cb',
              LeftTriangleBar: '\u29cf',
              LeftTriangle: '\u22b2',
              LeftTriangleEqual: '\u22b4',
              LeftUpDownVector: '\u2951',
              LeftUpTeeVector: '\u2960',
              LeftUpVectorBar: '\u2958',
              LeftUpVector: '\u21bf',
              LeftVectorBar: '\u2952',
              LeftVector: '\u21bc',
              lEg: '\u2a8b',
              leg: '\u22da',
              leq: '\u2264',
              leqq: '\u2266',
              leqslant: '\u2a7d',
              lescc: '\u2aa8',
              les: '\u2a7d',
              lesdot: '\u2a7f',
              lesdoto: '\u2a81',
              lesdotor: '\u2a83',
              lesg: '\u22da\ufe00',
              lesges: '\u2a93',
              lessapprox: '\u2a85',
              lessdot: '\u22d6',
              lesseqgtr: '\u22da',
              lesseqqgtr: '\u2a8b',
              LessEqualGreater: '\u22da',
              LessFullEqual: '\u2266',
              LessGreater: '\u2276',
              lessgtr: '\u2276',
              LessLess: '\u2aa1',
              lesssim: '\u2272',
              LessSlantEqual: '\u2a7d',
              LessTilde: '\u2272',
              lfisht: '\u297c',
              lfloor: '\u230a',
              Lfr: '\ud835\udd0f',
              lfr: '\ud835\udd29',
              lg: '\u2276',
              lgE: '\u2a91',
              lHar: '\u2962',
              lhard: '\u21bd',
              lharu: '\u21bc',
              lharul: '\u296a',
              lhblk: '\u2584',
              LJcy: '\u0409',
              ljcy: '\u0459',
              llarr: '\u21c7',
              ll: '\u226a',
              Ll: '\u22d8',
              llcorner: '\u231e',
              Lleftarrow: '\u21da',
              llhard: '\u296b',
              lltri: '\u25fa',
              Lmidot: '\u013f',
              lmidot: '\u0140',
              lmoustache: '\u23b0',
              lmoust: '\u23b0',
              lnap: '\u2a89',
              lnapprox: '\u2a89',
              lne: '\u2a87',
              lnE: '\u2268',
              lneq: '\u2a87',
              lneqq: '\u2268',
              lnsim: '\u22e6',
              loang: '\u27ec',
              loarr: '\u21fd',
              lobrk: '\u27e6',
              longleftarrow: '\u27f5',
              LongLeftArrow: '\u27f5',
              Longleftarrow: '\u27f8',
              longleftrightarrow: '\u27f7',
              LongLeftRightArrow: '\u27f7',
              Longleftrightarrow: '\u27fa',
              longmapsto: '\u27fc',
              longrightarrow: '\u27f6',
              LongRightArrow: '\u27f6',
              Longrightarrow: '\u27f9',
              looparrowleft: '\u21ab',
              looparrowright: '\u21ac',
              lopar: '\u2985',
              Lopf: '\ud835\udd43',
              lopf: '\ud835\udd5d',
              loplus: '\u2a2d',
              lotimes: '\u2a34',
              lowast: '\u2217',
              lowbar: '_',
              LowerLeftArrow: '\u2199',
              LowerRightArrow: '\u2198',
              loz: '\u25ca',
              lozenge: '\u25ca',
              lozf: '\u29eb',
              lpar: '(',
              lparlt: '\u2993',
              lrarr: '\u21c6',
              lrcorner: '\u231f',
              lrhar: '\u21cb',
              lrhard: '\u296d',
              lrm: '\u200e',
              lrtri: '\u22bf',
              lsaquo: '\u2039',
              lscr: '\ud835\udcc1',
              Lscr: '\u2112',
              lsh: '\u21b0',
              Lsh: '\u21b0',
              lsim: '\u2272',
              lsime: '\u2a8d',
              lsimg: '\u2a8f',
              lsqb: '[',
              lsquo: '\u2018',
              lsquor: '\u201a',
              Lstrok: '\u0141',
              lstrok: '\u0142',
              ltcc: '\u2aa6',
              ltcir: '\u2a79',
              lt: '<',
              LT: '<',
              Lt: '\u226a',
              ltdot: '\u22d6',
              lthree: '\u22cb',
              ltimes: '\u22c9',
              ltlarr: '\u2976',
              ltquest: '\u2a7b',
              ltri: '\u25c3',
              ltrie: '\u22b4',
              ltrif: '\u25c2',
              ltrPar: '\u2996',
              lurdshar: '\u294a',
              luruhar: '\u2966',
              lvertneqq: '\u2268\ufe00',
              lvnE: '\u2268\ufe00',
              macr: '\xaf',
              male: '\u2642',
              malt: '\u2720',
              maltese: '\u2720',
              Map: '\u2905',
              map: '\u21a6',
              mapsto: '\u21a6',
              mapstodown: '\u21a7',
              mapstoleft: '\u21a4',
              mapstoup: '\u21a5',
              marker: '\u25ae',
              mcomma: '\u2a29',
              Mcy: '\u041c',
              mcy: '\u043c',
              mdash: '\u2014',
              mDDot: '\u223a',
              measuredangle: '\u2221',
              MediumSpace: '\u205f',
              Mellintrf: '\u2133',
              Mfr: '\ud835\udd10',
              mfr: '\ud835\udd2a',
              mho: '\u2127',
              micro: '\xb5',
              midast: '*',
              midcir: '\u2af0',
              mid: '\u2223',
              middot: '\xb7',
              minusb: '\u229f',
              minus: '\u2212',
              minusd: '\u2238',
              minusdu: '\u2a2a',
              MinusPlus: '\u2213',
              mlcp: '\u2adb',
              mldr: '\u2026',
              mnplus: '\u2213',
              models: '\u22a7',
              Mopf: '\ud835\udd44',
              mopf: '\ud835\udd5e',
              mp: '\u2213',
              mscr: '\ud835\udcc2',
              Mscr: '\u2133',
              mstpos: '\u223e',
              Mu: '\u039c',
              mu: '\u03bc',
              multimap: '\u22b8',
              mumap: '\u22b8',
              nabla: '\u2207',
              Nacute: '\u0143',
              nacute: '\u0144',
              nang: '\u2220\u20d2',
              nap: '\u2249',
              napE: '\u2a70\u0338',
              napid: '\u224b\u0338',
              napos: '\u0149',
              napprox: '\u2249',
              natural: '\u266e',
              naturals: '\u2115',
              natur: '\u266e',
              nbsp: '\xa0',
              nbump: '\u224e\u0338',
              nbumpe: '\u224f\u0338',
              ncap: '\u2a43',
              Ncaron: '\u0147',
              ncaron: '\u0148',
              Ncedil: '\u0145',
              ncedil: '\u0146',
              ncong: '\u2247',
              ncongdot: '\u2a6d\u0338',
              ncup: '\u2a42',
              Ncy: '\u041d',
              ncy: '\u043d',
              ndash: '\u2013',
              nearhk: '\u2924',
              nearr: '\u2197',
              neArr: '\u21d7',
              nearrow: '\u2197',
              ne: '\u2260',
              nedot: '\u2250\u0338',
              NegativeMediumSpace: '\u200b',
              NegativeThickSpace: '\u200b',
              NegativeThinSpace: '\u200b',
              NegativeVeryThinSpace: '\u200b',
              nequiv: '\u2262',
              nesear: '\u2928',
              nesim: '\u2242\u0338',
              NestedGreaterGreater: '\u226b',
              NestedLessLess: '\u226a',
              NewLine: '\n',
              nexist: '\u2204',
              nexists: '\u2204',
              Nfr: '\ud835\udd11',
              nfr: '\ud835\udd2b',
              ngE: '\u2267\u0338',
              nge: '\u2271',
              ngeq: '\u2271',
              ngeqq: '\u2267\u0338',
              ngeqslant: '\u2a7e\u0338',
              nges: '\u2a7e\u0338',
              nGg: '\u22d9\u0338',
              ngsim: '\u2275',
              nGt: '\u226b\u20d2',
              ngt: '\u226f',
              ngtr: '\u226f',
              nGtv: '\u226b\u0338',
              nharr: '\u21ae',
              nhArr: '\u21ce',
              nhpar: '\u2af2',
              ni: '\u220b',
              nis: '\u22fc',
              nisd: '\u22fa',
              niv: '\u220b',
              NJcy: '\u040a',
              njcy: '\u045a',
              nlarr: '\u219a',
              nlArr: '\u21cd',
              nldr: '\u2025',
              nlE: '\u2266\u0338',
              nle: '\u2270',
              nleftarrow: '\u219a',
              nLeftarrow: '\u21cd',
              nleftrightarrow: '\u21ae',
              nLeftrightarrow: '\u21ce',
              nleq: '\u2270',
              nleqq: '\u2266\u0338',
              nleqslant: '\u2a7d\u0338',
              nles: '\u2a7d\u0338',
              nless: '\u226e',
              nLl: '\u22d8\u0338',
              nlsim: '\u2274',
              nLt: '\u226a\u20d2',
              nlt: '\u226e',
              nltri: '\u22ea',
              nltrie: '\u22ec',
              nLtv: '\u226a\u0338',
              nmid: '\u2224',
              NoBreak: '\u2060',
              NonBreakingSpace: '\xa0',
              nopf: '\ud835\udd5f',
              Nopf: '\u2115',
              Not: '\u2aec',
              not: '\xac',
              NotCongruent: '\u2262',
              NotCupCap: '\u226d',
              NotDoubleVerticalBar: '\u2226',
              NotElement: '\u2209',
              NotEqual: '\u2260',
              NotEqualTilde: '\u2242\u0338',
              NotExists: '\u2204',
              NotGreater: '\u226f',
              NotGreaterEqual: '\u2271',
              NotGreaterFullEqual: '\u2267\u0338',
              NotGreaterGreater: '\u226b\u0338',
              NotGreaterLess: '\u2279',
              NotGreaterSlantEqual: '\u2a7e\u0338',
              NotGreaterTilde: '\u2275',
              NotHumpDownHump: '\u224e\u0338',
              NotHumpEqual: '\u224f\u0338',
              notin: '\u2209',
              notindot: '\u22f5\u0338',
              notinE: '\u22f9\u0338',
              notinva: '\u2209',
              notinvb: '\u22f7',
              notinvc: '\u22f6',
              NotLeftTriangleBar: '\u29cf\u0338',
              NotLeftTriangle: '\u22ea',
              NotLeftTriangleEqual: '\u22ec',
              NotLess: '\u226e',
              NotLessEqual: '\u2270',
              NotLessGreater: '\u2278',
              NotLessLess: '\u226a\u0338',
              NotLessSlantEqual: '\u2a7d\u0338',
              NotLessTilde: '\u2274',
              NotNestedGreaterGreater: '\u2aa2\u0338',
              NotNestedLessLess: '\u2aa1\u0338',
              notni: '\u220c',
              notniva: '\u220c',
              notnivb: '\u22fe',
              notnivc: '\u22fd',
              NotPrecedes: '\u2280',
              NotPrecedesEqual: '\u2aaf\u0338',
              NotPrecedesSlantEqual: '\u22e0',
              NotReverseElement: '\u220c',
              NotRightTriangleBar: '\u29d0\u0338',
              NotRightTriangle: '\u22eb',
              NotRightTriangleEqual: '\u22ed',
              NotSquareSubset: '\u228f\u0338',
              NotSquareSubsetEqual: '\u22e2',
              NotSquareSuperset: '\u2290\u0338',
              NotSquareSupersetEqual: '\u22e3',
              NotSubset: '\u2282\u20d2',
              NotSubsetEqual: '\u2288',
              NotSucceeds: '\u2281',
              NotSucceedsEqual: '\u2ab0\u0338',
              NotSucceedsSlantEqual: '\u22e1',
              NotSucceedsTilde: '\u227f\u0338',
              NotSuperset: '\u2283\u20d2',
              NotSupersetEqual: '\u2289',
              NotTilde: '\u2241',
              NotTildeEqual: '\u2244',
              NotTildeFullEqual: '\u2247',
              NotTildeTilde: '\u2249',
              NotVerticalBar: '\u2224',
              nparallel: '\u2226',
              npar: '\u2226',
              nparsl: '\u2afd\u20e5',
              npart: '\u2202\u0338',
              npolint: '\u2a14',
              npr: '\u2280',
              nprcue: '\u22e0',
              nprec: '\u2280',
              npreceq: '\u2aaf\u0338',
              npre: '\u2aaf\u0338',
              nrarrc: '\u2933\u0338',
              nrarr: '\u219b',
              nrArr: '\u21cf',
              nrarrw: '\u219d\u0338',
              nrightarrow: '\u219b',
              nRightarrow: '\u21cf',
              nrtri: '\u22eb',
              nrtrie: '\u22ed',
              nsc: '\u2281',
              nsccue: '\u22e1',
              nsce: '\u2ab0\u0338',
              Nscr: '\ud835\udca9',
              nscr: '\ud835\udcc3',
              nshortmid: '\u2224',
              nshortparallel: '\u2226',
              nsim: '\u2241',
              nsime: '\u2244',
              nsimeq: '\u2244',
              nsmid: '\u2224',
              nspar: '\u2226',
              nsqsube: '\u22e2',
              nsqsupe: '\u22e3',
              nsub: '\u2284',
              nsubE: '\u2ac5\u0338',
              nsube: '\u2288',
              nsubset: '\u2282\u20d2',
              nsubseteq: '\u2288',
              nsubseteqq: '\u2ac5\u0338',
              nsucc: '\u2281',
              nsucceq: '\u2ab0\u0338',
              nsup: '\u2285',
              nsupE: '\u2ac6\u0338',
              nsupe: '\u2289',
              nsupset: '\u2283\u20d2',
              nsupseteq: '\u2289',
              nsupseteqq: '\u2ac6\u0338',
              ntgl: '\u2279',
              Ntilde: '\xd1',
              ntilde: '\xf1',
              ntlg: '\u2278',
              ntriangleleft: '\u22ea',
              ntrianglelefteq: '\u22ec',
              ntriangleright: '\u22eb',
              ntrianglerighteq: '\u22ed',
              Nu: '\u039d',
              nu: '\u03bd',
              num: '#',
              numero: '\u2116',
              numsp: '\u2007',
              nvap: '\u224d\u20d2',
              nvdash: '\u22ac',
              nvDash: '\u22ad',
              nVdash: '\u22ae',
              nVDash: '\u22af',
              nvge: '\u2265\u20d2',
              nvgt: '>\u20d2',
              nvHarr: '\u2904',
              nvinfin: '\u29de',
              nvlArr: '\u2902',
              nvle: '\u2264\u20d2',
              nvlt: '<\u20d2',
              nvltrie: '\u22b4\u20d2',
              nvrArr: '\u2903',
              nvrtrie: '\u22b5\u20d2',
              nvsim: '\u223c\u20d2',
              nwarhk: '\u2923',
              nwarr: '\u2196',
              nwArr: '\u21d6',
              nwarrow: '\u2196',
              nwnear: '\u2927',
              Oacute: '\xd3',
              oacute: '\xf3',
              oast: '\u229b',
              Ocirc: '\xd4',
              ocirc: '\xf4',
              ocir: '\u229a',
              Ocy: '\u041e',
              ocy: '\u043e',
              odash: '\u229d',
              Odblac: '\u0150',
              odblac: '\u0151',
              odiv: '\u2a38',
              odot: '\u2299',
              odsold: '\u29bc',
              OElig: '\u0152',
              oelig: '\u0153',
              ofcir: '\u29bf',
              Ofr: '\ud835\udd12',
              ofr: '\ud835\udd2c',
              ogon: '\u02db',
              Ograve: '\xd2',
              ograve: '\xf2',
              ogt: '\u29c1',
              ohbar: '\u29b5',
              ohm: '\u03a9',
              oint: '\u222e',
              olarr: '\u21ba',
              olcir: '\u29be',
              olcross: '\u29bb',
              oline: '\u203e',
              olt: '\u29c0',
              Omacr: '\u014c',
              omacr: '\u014d',
              Omega: '\u03a9',
              omega: '\u03c9',
              Omicron: '\u039f',
              omicron: '\u03bf',
              omid: '\u29b6',
              ominus: '\u2296',
              Oopf: '\ud835\udd46',
              oopf: '\ud835\udd60',
              opar: '\u29b7',
              OpenCurlyDoubleQuote: '\u201c',
              OpenCurlyQuote: '\u2018',
              operp: '\u29b9',
              oplus: '\u2295',
              orarr: '\u21bb',
              Or: '\u2a54',
              or: '\u2228',
              ord: '\u2a5d',
              order: '\u2134',
              orderof: '\u2134',
              ordf: '\xaa',
              ordm: '\xba',
              origof: '\u22b6',
              oror: '\u2a56',
              orslope: '\u2a57',
              orv: '\u2a5b',
              oS: '\u24c8',
              Oscr: '\ud835\udcaa',
              oscr: '\u2134',
              Oslash: '\xd8',
              oslash: '\xf8',
              osol: '\u2298',
              Otilde: '\xd5',
              otilde: '\xf5',
              otimesas: '\u2a36',
              Otimes: '\u2a37',
              otimes: '\u2297',
              Ouml: '\xd6',
              ouml: '\xf6',
              ovbar: '\u233d',
              OverBar: '\u203e',
              OverBrace: '\u23de',
              OverBracket: '\u23b4',
              OverParenthesis: '\u23dc',
              para: '\xb6',
              parallel: '\u2225',
              par: '\u2225',
              parsim: '\u2af3',
              parsl: '\u2afd',
              part: '\u2202',
              PartialD: '\u2202',
              Pcy: '\u041f',
              pcy: '\u043f',
              percnt: '%',
              period: '.',
              permil: '\u2030',
              perp: '\u22a5',
              pertenk: '\u2031',
              Pfr: '\ud835\udd13',
              pfr: '\ud835\udd2d',
              Phi: '\u03a6',
              phi: '\u03c6',
              phiv: '\u03d5',
              phmmat: '\u2133',
              phone: '\u260e',
              Pi: '\u03a0',
              pi: '\u03c0',
              pitchfork: '\u22d4',
              piv: '\u03d6',
              planck: '\u210f',
              planckh: '\u210e',
              plankv: '\u210f',
              plusacir: '\u2a23',
              plusb: '\u229e',
              pluscir: '\u2a22',
              plus: '+',
              plusdo: '\u2214',
              plusdu: '\u2a25',
              pluse: '\u2a72',
              PlusMinus: '\xb1',
              plusmn: '\xb1',
              plussim: '\u2a26',
              plustwo: '\u2a27',
              pm: '\xb1',
              Poincareplane: '\u210c',
              pointint: '\u2a15',
              popf: '\ud835\udd61',
              Popf: '\u2119',
              pound: '\xa3',
              prap: '\u2ab7',
              Pr: '\u2abb',
              pr: '\u227a',
              prcue: '\u227c',
              precapprox: '\u2ab7',
              prec: '\u227a',
              preccurlyeq: '\u227c',
              Precedes: '\u227a',
              PrecedesEqual: '\u2aaf',
              PrecedesSlantEqual: '\u227c',
              PrecedesTilde: '\u227e',
              preceq: '\u2aaf',
              precnapprox: '\u2ab9',
              precneqq: '\u2ab5',
              precnsim: '\u22e8',
              pre: '\u2aaf',
              prE: '\u2ab3',
              precsim: '\u227e',
              prime: '\u2032',
              Prime: '\u2033',
              primes: '\u2119',
              prnap: '\u2ab9',
              prnE: '\u2ab5',
              prnsim: '\u22e8',
              prod: '\u220f',
              Product: '\u220f',
              profalar: '\u232e',
              profline: '\u2312',
              profsurf: '\u2313',
              prop: '\u221d',
              Proportional: '\u221d',
              Proportion: '\u2237',
              propto: '\u221d',
              prsim: '\u227e',
              prurel: '\u22b0',
              Pscr: '\ud835\udcab',
              pscr: '\ud835\udcc5',
              Psi: '\u03a8',
              psi: '\u03c8',
              puncsp: '\u2008',
              Qfr: '\ud835\udd14',
              qfr: '\ud835\udd2e',
              qint: '\u2a0c',
              qopf: '\ud835\udd62',
              Qopf: '\u211a',
              qprime: '\u2057',
              Qscr: '\ud835\udcac',
              qscr: '\ud835\udcc6',
              quaternions: '\u210d',
              quatint: '\u2a16',
              quest: '?',
              questeq: '\u225f',
              quot: '"',
              QUOT: '"',
              rAarr: '\u21db',
              race: '\u223d\u0331',
              Racute: '\u0154',
              racute: '\u0155',
              radic: '\u221a',
              raemptyv: '\u29b3',
              rang: '\u27e9',
              Rang: '\u27eb',
              rangd: '\u2992',
              range: '\u29a5',
              rangle: '\u27e9',
              raquo: '\xbb',
              rarrap: '\u2975',
              rarrb: '\u21e5',
              rarrbfs: '\u2920',
              rarrc: '\u2933',
              rarr: '\u2192',
              Rarr: '\u21a0',
              rArr: '\u21d2',
              rarrfs: '\u291e',
              rarrhk: '\u21aa',
              rarrlp: '\u21ac',
              rarrpl: '\u2945',
              rarrsim: '\u2974',
              Rarrtl: '\u2916',
              rarrtl: '\u21a3',
              rarrw: '\u219d',
              ratail: '\u291a',
              rAtail: '\u291c',
              ratio: '\u2236',
              rationals: '\u211a',
              rbarr: '\u290d',
              rBarr: '\u290f',
              RBarr: '\u2910',
              rbbrk: '\u2773',
              rbrace: '}',
              rbrack: ']',
              rbrke: '\u298c',
              rbrksld: '\u298e',
              rbrkslu: '\u2990',
              Rcaron: '\u0158',
              rcaron: '\u0159',
              Rcedil: '\u0156',
              rcedil: '\u0157',
              rceil: '\u2309',
              rcub: '}',
              Rcy: '\u0420',
              rcy: '\u0440',
              rdca: '\u2937',
              rdldhar: '\u2969',
              rdquo: '\u201d',
              rdquor: '\u201d',
              rdsh: '\u21b3',
              real: '\u211c',
              realine: '\u211b',
              realpart: '\u211c',
              reals: '\u211d',
              Re: '\u211c',
              rect: '\u25ad',
              reg: '\xae',
              REG: '\xae',
              ReverseElement: '\u220b',
              ReverseEquilibrium: '\u21cb',
              ReverseUpEquilibrium: '\u296f',
              rfisht: '\u297d',
              rfloor: '\u230b',
              rfr: '\ud835\udd2f',
              Rfr: '\u211c',
              rHar: '\u2964',
              rhard: '\u21c1',
              rharu: '\u21c0',
              rharul: '\u296c',
              Rho: '\u03a1',
              rho: '\u03c1',
              rhov: '\u03f1',
              RightAngleBracket: '\u27e9',
              RightArrowBar: '\u21e5',
              rightarrow: '\u2192',
              RightArrow: '\u2192',
              Rightarrow: '\u21d2',
              RightArrowLeftArrow: '\u21c4',
              rightarrowtail: '\u21a3',
              RightCeiling: '\u2309',
              RightDoubleBracket: '\u27e7',
              RightDownTeeVector: '\u295d',
              RightDownVectorBar: '\u2955',
              RightDownVector: '\u21c2',
              RightFloor: '\u230b',
              rightharpoondown: '\u21c1',
              rightharpoonup: '\u21c0',
              rightleftarrows: '\u21c4',
              rightleftharpoons: '\u21cc',
              rightrightarrows: '\u21c9',
              rightsquigarrow: '\u219d',
              RightTeeArrow: '\u21a6',
              RightTee: '\u22a2',
              RightTeeVector: '\u295b',
              rightthreetimes: '\u22cc',
              RightTriangleBar: '\u29d0',
              RightTriangle: '\u22b3',
              RightTriangleEqual: '\u22b5',
              RightUpDownVector: '\u294f',
              RightUpTeeVector: '\u295c',
              RightUpVectorBar: '\u2954',
              RightUpVector: '\u21be',
              RightVectorBar: '\u2953',
              RightVector: '\u21c0',
              ring: '\u02da',
              risingdotseq: '\u2253',
              rlarr: '\u21c4',
              rlhar: '\u21cc',
              rlm: '\u200f',
              rmoustache: '\u23b1',
              rmoust: '\u23b1',
              rnmid: '\u2aee',
              roang: '\u27ed',
              roarr: '\u21fe',
              robrk: '\u27e7',
              ropar: '\u2986',
              ropf: '\ud835\udd63',
              Ropf: '\u211d',
              roplus: '\u2a2e',
              rotimes: '\u2a35',
              RoundImplies: '\u2970',
              rpar: ')',
              rpargt: '\u2994',
              rppolint: '\u2a12',
              rrarr: '\u21c9',
              Rrightarrow: '\u21db',
              rsaquo: '\u203a',
              rscr: '\ud835\udcc7',
              Rscr: '\u211b',
              rsh: '\u21b1',
              Rsh: '\u21b1',
              rsqb: ']',
              rsquo: '\u2019',
              rsquor: '\u2019',
              rthree: '\u22cc',
              rtimes: '\u22ca',
              rtri: '\u25b9',
              rtrie: '\u22b5',
              rtrif: '\u25b8',
              rtriltri: '\u29ce',
              RuleDelayed: '\u29f4',
              ruluhar: '\u2968',
              rx: '\u211e',
              Sacute: '\u015a',
              sacute: '\u015b',
              sbquo: '\u201a',
              scap: '\u2ab8',
              Scaron: '\u0160',
              scaron: '\u0161',
              Sc: '\u2abc',
              sc: '\u227b',
              sccue: '\u227d',
              sce: '\u2ab0',
              scE: '\u2ab4',
              Scedil: '\u015e',
              scedil: '\u015f',
              Scirc: '\u015c',
              scirc: '\u015d',
              scnap: '\u2aba',
              scnE: '\u2ab6',
              scnsim: '\u22e9',
              scpolint: '\u2a13',
              scsim: '\u227f',
              Scy: '\u0421',
              scy: '\u0441',
              sdotb: '\u22a1',
              sdot: '\u22c5',
              sdote: '\u2a66',
              searhk: '\u2925',
              searr: '\u2198',
              seArr: '\u21d8',
              searrow: '\u2198',
              sect: '\xa7',
              semi: ';',
              seswar: '\u2929',
              setminus: '\u2216',
              setmn: '\u2216',
              sext: '\u2736',
              Sfr: '\ud835\udd16',
              sfr: '\ud835\udd30',
              sfrown: '\u2322',
              sharp: '\u266f',
              SHCHcy: '\u0429',
              shchcy: '\u0449',
              SHcy: '\u0428',
              shcy: '\u0448',
              ShortDownArrow: '\u2193',
              ShortLeftArrow: '\u2190',
              shortmid: '\u2223',
              shortparallel: '\u2225',
              ShortRightArrow: '\u2192',
              ShortUpArrow: '\u2191',
              shy: '\xad',
              Sigma: '\u03a3',
              sigma: '\u03c3',
              sigmaf: '\u03c2',
              sigmav: '\u03c2',
              sim: '\u223c',
              simdot: '\u2a6a',
              sime: '\u2243',
              simeq: '\u2243',
              simg: '\u2a9e',
              simgE: '\u2aa0',
              siml: '\u2a9d',
              simlE: '\u2a9f',
              simne: '\u2246',
              simplus: '\u2a24',
              simrarr: '\u2972',
              slarr: '\u2190',
              SmallCircle: '\u2218',
              smallsetminus: '\u2216',
              smashp: '\u2a33',
              smeparsl: '\u29e4',
              smid: '\u2223',
              smile: '\u2323',
              smt: '\u2aaa',
              smte: '\u2aac',
              smtes: '\u2aac\ufe00',
              SOFTcy: '\u042c',
              softcy: '\u044c',
              solbar: '\u233f',
              solb: '\u29c4',
              sol: '/',
              Sopf: '\ud835\udd4a',
              sopf: '\ud835\udd64',
              spades: '\u2660',
              spadesuit: '\u2660',
              spar: '\u2225',
              sqcap: '\u2293',
              sqcaps: '\u2293\ufe00',
              sqcup: '\u2294',
              sqcups: '\u2294\ufe00',
              Sqrt: '\u221a',
              sqsub: '\u228f',
              sqsube: '\u2291',
              sqsubset: '\u228f',
              sqsubseteq: '\u2291',
              sqsup: '\u2290',
              sqsupe: '\u2292',
              sqsupset: '\u2290',
              sqsupseteq: '\u2292',
              square: '\u25a1',
              Square: '\u25a1',
              SquareIntersection: '\u2293',
              SquareSubset: '\u228f',
              SquareSubsetEqual: '\u2291',
              SquareSuperset: '\u2290',
              SquareSupersetEqual: '\u2292',
              SquareUnion: '\u2294',
              squarf: '\u25aa',
              squ: '\u25a1',
              squf: '\u25aa',
              srarr: '\u2192',
              Sscr: '\ud835\udcae',
              sscr: '\ud835\udcc8',
              ssetmn: '\u2216',
              ssmile: '\u2323',
              sstarf: '\u22c6',
              Star: '\u22c6',
              star: '\u2606',
              starf: '\u2605',
              straightepsilon: '\u03f5',
              straightphi: '\u03d5',
              strns: '\xaf',
              sub: '\u2282',
              Sub: '\u22d0',
              subdot: '\u2abd',
              subE: '\u2ac5',
              sube: '\u2286',
              subedot: '\u2ac3',
              submult: '\u2ac1',
              subnE: '\u2acb',
              subne: '\u228a',
              subplus: '\u2abf',
              subrarr: '\u2979',
              subset: '\u2282',
              Subset: '\u22d0',
              subseteq: '\u2286',
              subseteqq: '\u2ac5',
              SubsetEqual: '\u2286',
              subsetneq: '\u228a',
              subsetneqq: '\u2acb',
              subsim: '\u2ac7',
              subsub: '\u2ad5',
              subsup: '\u2ad3',
              succapprox: '\u2ab8',
              succ: '\u227b',
              succcurlyeq: '\u227d',
              Succeeds: '\u227b',
              SucceedsEqual: '\u2ab0',
              SucceedsSlantEqual: '\u227d',
              SucceedsTilde: '\u227f',
              succeq: '\u2ab0',
              succnapprox: '\u2aba',
              succneqq: '\u2ab6',
              succnsim: '\u22e9',
              succsim: '\u227f',
              SuchThat: '\u220b',
              sum: '\u2211',
              Sum: '\u2211',
              sung: '\u266a',
              sup1: '\xb9',
              sup2: '\xb2',
              sup3: '\xb3',
              sup: '\u2283',
              Sup: '\u22d1',
              supdot: '\u2abe',
              supdsub: '\u2ad8',
              supE: '\u2ac6',
              supe: '\u2287',
              supedot: '\u2ac4',
              Superset: '\u2283',
              SupersetEqual: '\u2287',
              suphsol: '\u27c9',
              suphsub: '\u2ad7',
              suplarr: '\u297b',
              supmult: '\u2ac2',
              supnE: '\u2acc',
              supne: '\u228b',
              supplus: '\u2ac0',
              supset: '\u2283',
              Supset: '\u22d1',
              supseteq: '\u2287',
              supseteqq: '\u2ac6',
              supsetneq: '\u228b',
              supsetneqq: '\u2acc',
              supsim: '\u2ac8',
              supsub: '\u2ad4',
              supsup: '\u2ad6',
              swarhk: '\u2926',
              swarr: '\u2199',
              swArr: '\u21d9',
              swarrow: '\u2199',
              swnwar: '\u292a',
              szlig: '\xdf',
              Tab: '\t',
              target: '\u2316',
              Tau: '\u03a4',
              tau: '\u03c4',
              tbrk: '\u23b4',
              Tcaron: '\u0164',
              tcaron: '\u0165',
              Tcedil: '\u0162',
              tcedil: '\u0163',
              Tcy: '\u0422',
              tcy: '\u0442',
              tdot: '\u20db',
              telrec: '\u2315',
              Tfr: '\ud835\udd17',
              tfr: '\ud835\udd31',
              there4: '\u2234',
              therefore: '\u2234',
              Therefore: '\u2234',
              Theta: '\u0398',
              theta: '\u03b8',
              thetasym: '\u03d1',
              thetav: '\u03d1',
              thickapprox: '\u2248',
              thicksim: '\u223c',
              ThickSpace: '\u205f\u200a',
              ThinSpace: '\u2009',
              thinsp: '\u2009',
              thkap: '\u2248',
              thksim: '\u223c',
              THORN: '\xde',
              thorn: '\xfe',
              tilde: '\u02dc',
              Tilde: '\u223c',
              TildeEqual: '\u2243',
              TildeFullEqual: '\u2245',
              TildeTilde: '\u2248',
              timesbar: '\u2a31',
              timesb: '\u22a0',
              times: '\xd7',
              timesd: '\u2a30',
              tint: '\u222d',
              toea: '\u2928',
              topbot: '\u2336',
              topcir: '\u2af1',
              top: '\u22a4',
              Topf: '\ud835\udd4b',
              topf: '\ud835\udd65',
              topfork: '\u2ada',
              tosa: '\u2929',
              tprime: '\u2034',
              trade: '\u2122',
              TRADE: '\u2122',
              triangle: '\u25b5',
              triangledown: '\u25bf',
              triangleleft: '\u25c3',
              trianglelefteq: '\u22b4',
              triangleq: '\u225c',
              triangleright: '\u25b9',
              trianglerighteq: '\u22b5',
              tridot: '\u25ec',
              trie: '\u225c',
              triminus: '\u2a3a',
              TripleDot: '\u20db',
              triplus: '\u2a39',
              trisb: '\u29cd',
              tritime: '\u2a3b',
              trpezium: '\u23e2',
              Tscr: '\ud835\udcaf',
              tscr: '\ud835\udcc9',
              TScy: '\u0426',
              tscy: '\u0446',
              TSHcy: '\u040b',
              tshcy: '\u045b',
              Tstrok: '\u0166',
              tstrok: '\u0167',
              twixt: '\u226c',
              twoheadleftarrow: '\u219e',
              twoheadrightarrow: '\u21a0',
              Uacute: '\xda',
              uacute: '\xfa',
              uarr: '\u2191',
              Uarr: '\u219f',
              uArr: '\u21d1',
              Uarrocir: '\u2949',
              Ubrcy: '\u040e',
              ubrcy: '\u045e',
              Ubreve: '\u016c',
              ubreve: '\u016d',
              Ucirc: '\xdb',
              ucirc: '\xfb',
              Ucy: '\u0423',
              ucy: '\u0443',
              udarr: '\u21c5',
              Udblac: '\u0170',
              udblac: '\u0171',
              udhar: '\u296e',
              ufisht: '\u297e',
              Ufr: '\ud835\udd18',
              ufr: '\ud835\udd32',
              Ugrave: '\xd9',
              ugrave: '\xf9',
              uHar: '\u2963',
              uharl: '\u21bf',
              uharr: '\u21be',
              uhblk: '\u2580',
              ulcorn: '\u231c',
              ulcorner: '\u231c',
              ulcrop: '\u230f',
              ultri: '\u25f8',
              Umacr: '\u016a',
              umacr: '\u016b',
              uml: '\xa8',
              UnderBar: '_',
              UnderBrace: '\u23df',
              UnderBracket: '\u23b5',
              UnderParenthesis: '\u23dd',
              Union: '\u22c3',
              UnionPlus: '\u228e',
              Uogon: '\u0172',
              uogon: '\u0173',
              Uopf: '\ud835\udd4c',
              uopf: '\ud835\udd66',
              UpArrowBar: '\u2912',
              uparrow: '\u2191',
              UpArrow: '\u2191',
              Uparrow: '\u21d1',
              UpArrowDownArrow: '\u21c5',
              updownarrow: '\u2195',
              UpDownArrow: '\u2195',
              Updownarrow: '\u21d5',
              UpEquilibrium: '\u296e',
              upharpoonleft: '\u21bf',
              upharpoonright: '\u21be',
              uplus: '\u228e',
              UpperLeftArrow: '\u2196',
              UpperRightArrow: '\u2197',
              upsi: '\u03c5',
              Upsi: '\u03d2',
              upsih: '\u03d2',
              Upsilon: '\u03a5',
              upsilon: '\u03c5',
              UpTeeArrow: '\u21a5',
              UpTee: '\u22a5',
              upuparrows: '\u21c8',
              urcorn: '\u231d',
              urcorner: '\u231d',
              urcrop: '\u230e',
              Uring: '\u016e',
              uring: '\u016f',
              urtri: '\u25f9',
              Uscr: '\ud835\udcb0',
              uscr: '\ud835\udcca',
              utdot: '\u22f0',
              Utilde: '\u0168',
              utilde: '\u0169',
              utri: '\u25b5',
              utrif: '\u25b4',
              uuarr: '\u21c8',
              Uuml: '\xdc',
              uuml: '\xfc',
              uwangle: '\u29a7',
              vangrt: '\u299c',
              varepsilon: '\u03f5',
              varkappa: '\u03f0',
              varnothing: '\u2205',
              varphi: '\u03d5',
              varpi: '\u03d6',
              varpropto: '\u221d',
              varr: '\u2195',
              vArr: '\u21d5',
              varrho: '\u03f1',
              varsigma: '\u03c2',
              varsubsetneq: '\u228a\ufe00',
              varsubsetneqq: '\u2acb\ufe00',
              varsupsetneq: '\u228b\ufe00',
              varsupsetneqq: '\u2acc\ufe00',
              vartheta: '\u03d1',
              vartriangleleft: '\u22b2',
              vartriangleright: '\u22b3',
              vBar: '\u2ae8',
              Vbar: '\u2aeb',
              vBarv: '\u2ae9',
              Vcy: '\u0412',
              vcy: '\u0432',
              vdash: '\u22a2',
              vDash: '\u22a8',
              Vdash: '\u22a9',
              VDash: '\u22ab',
              Vdashl: '\u2ae6',
              veebar: '\u22bb',
              vee: '\u2228',
              Vee: '\u22c1',
              veeeq: '\u225a',
              vellip: '\u22ee',
              verbar: '|',
              Verbar: '\u2016',
              vert: '|',
              Vert: '\u2016',
              VerticalBar: '\u2223',
              VerticalLine: '|',
              VerticalSeparator: '\u2758',
              VerticalTilde: '\u2240',
              VeryThinSpace: '\u200a',
              Vfr: '\ud835\udd19',
              vfr: '\ud835\udd33',
              vltri: '\u22b2',
              vnsub: '\u2282\u20d2',
              vnsup: '\u2283\u20d2',
              Vopf: '\ud835\udd4d',
              vopf: '\ud835\udd67',
              vprop: '\u221d',
              vrtri: '\u22b3',
              Vscr: '\ud835\udcb1',
              vscr: '\ud835\udccb',
              vsubnE: '\u2acb\ufe00',
              vsubne: '\u228a\ufe00',
              vsupnE: '\u2acc\ufe00',
              vsupne: '\u228b\ufe00',
              Vvdash: '\u22aa',
              vzigzag: '\u299a',
              Wcirc: '\u0174',
              wcirc: '\u0175',
              wedbar: '\u2a5f',
              wedge: '\u2227',
              Wedge: '\u22c0',
              wedgeq: '\u2259',
              weierp: '\u2118',
              Wfr: '\ud835\udd1a',
              wfr: '\ud835\udd34',
              Wopf: '\ud835\udd4e',
              wopf: '\ud835\udd68',
              wp: '\u2118',
              wr: '\u2240',
              wreath: '\u2240',
              Wscr: '\ud835\udcb2',
              wscr: '\ud835\udccc',
              xcap: '\u22c2',
              xcirc: '\u25ef',
              xcup: '\u22c3',
              xdtri: '\u25bd',
              Xfr: '\ud835\udd1b',
              xfr: '\ud835\udd35',
              xharr: '\u27f7',
              xhArr: '\u27fa',
              Xi: '\u039e',
              xi: '\u03be',
              xlarr: '\u27f5',
              xlArr: '\u27f8',
              xmap: '\u27fc',
              xnis: '\u22fb',
              xodot: '\u2a00',
              Xopf: '\ud835\udd4f',
              xopf: '\ud835\udd69',
              xoplus: '\u2a01',
              xotime: '\u2a02',
              xrarr: '\u27f6',
              xrArr: '\u27f9',
              Xscr: '\ud835\udcb3',
              xscr: '\ud835\udccd',
              xsqcup: '\u2a06',
              xuplus: '\u2a04',
              xutri: '\u25b3',
              xvee: '\u22c1',
              xwedge: '\u22c0',
              Yacute: '\xdd',
              yacute: '\xfd',
              YAcy: '\u042f',
              yacy: '\u044f',
              Ycirc: '\u0176',
              ycirc: '\u0177',
              Ycy: '\u042b',
              ycy: '\u044b',
              yen: '\xa5',
              Yfr: '\ud835\udd1c',
              yfr: '\ud835\udd36',
              YIcy: '\u0407',
              yicy: '\u0457',
              Yopf: '\ud835\udd50',
              yopf: '\ud835\udd6a',
              Yscr: '\ud835\udcb4',
              yscr: '\ud835\udcce',
              YUcy: '\u042e',
              yucy: '\u044e',
              yuml: '\xff',
              Yuml: '\u0178',
              Zacute: '\u0179',
              zacute: '\u017a',
              Zcaron: '\u017d',
              zcaron: '\u017e',
              Zcy: '\u0417',
              zcy: '\u0437',
              Zdot: '\u017b',
              zdot: '\u017c',
              zeetrf: '\u2128',
              ZeroWidthSpace: '\u200b',
              Zeta: '\u0396',
              zeta: '\u03b6',
              zfr: '\ud835\udd37',
              Zfr: '\u2128',
              ZHcy: '\u0416',
              zhcy: '\u0436',
              zigrarr: '\u21dd',
              zopf: '\ud835\udd6b',
              Zopf: '\u2124',
              Zscr: '\ud835\udcb5',
              zscr: '\ud835\udccf',
              zwj: '\u200d',
              zwnj: '\u200c'
            };
          },
          {}
        ],
        26: [
          function(t, e, n) {
            e.exports = {
              Aacute: '\xc1',
              aacute: '\xe1',
              Acirc: '\xc2',
              acirc: '\xe2',
              acute: '\xb4',
              AElig: '\xc6',
              aelig: '\xe6',
              Agrave: '\xc0',
              agrave: '\xe0',
              amp: '&',
              AMP: '&',
              Aring: '\xc5',
              aring: '\xe5',
              Atilde: '\xc3',
              atilde: '\xe3',
              Auml: '\xc4',
              auml: '\xe4',
              brvbar: '\xa6',
              Ccedil: '\xc7',
              ccedil: '\xe7',
              cedil: '\xb8',
              cent: '\xa2',
              copy: '\xa9',
              COPY: '\xa9',
              curren: '\xa4',
              deg: '\xb0',
              divide: '\xf7',
              Eacute: '\xc9',
              eacute: '\xe9',
              Ecirc: '\xca',
              ecirc: '\xea',
              Egrave: '\xc8',
              egrave: '\xe8',
              ETH: '\xd0',
              eth: '\xf0',
              Euml: '\xcb',
              euml: '\xeb',
              frac12: '\xbd',
              frac14: '\xbc',
              frac34: '\xbe',
              gt: '>',
              GT: '>',
              Iacute: '\xcd',
              iacute: '\xed',
              Icirc: '\xce',
              icirc: '\xee',
              iexcl: '\xa1',
              Igrave: '\xcc',
              igrave: '\xec',
              iquest: '\xbf',
              Iuml: '\xcf',
              iuml: '\xef',
              laquo: '\xab',
              lt: '<',
              LT: '<',
              macr: '\xaf',
              micro: '\xb5',
              middot: '\xb7',
              nbsp: '\xa0',
              not: '\xac',
              Ntilde: '\xd1',
              ntilde: '\xf1',
              Oacute: '\xd3',
              oacute: '\xf3',
              Ocirc: '\xd4',
              ocirc: '\xf4',
              Ograve: '\xd2',
              ograve: '\xf2',
              ordf: '\xaa',
              ordm: '\xba',
              Oslash: '\xd8',
              oslash: '\xf8',
              Otilde: '\xd5',
              otilde: '\xf5',
              Ouml: '\xd6',
              ouml: '\xf6',
              para: '\xb6',
              plusmn: '\xb1',
              pound: '\xa3',
              quot: '"',
              QUOT: '"',
              raquo: '\xbb',
              reg: '\xae',
              REG: '\xae',
              sect: '\xa7',
              shy: '\xad',
              sup1: '\xb9',
              sup2: '\xb2',
              sup3: '\xb3',
              szlig: '\xdf',
              THORN: '\xde',
              thorn: '\xfe',
              times: '\xd7',
              Uacute: '\xda',
              uacute: '\xfa',
              Ucirc: '\xdb',
              ucirc: '\xfb',
              Ugrave: '\xd9',
              ugrave: '\xf9',
              uml: '\xa8',
              Uuml: '\xdc',
              uuml: '\xfc',
              Yacute: '\xdd',
              yacute: '\xfd',
              yen: '\xa5',
              yuml: '\xff'
            };
          },
          {}
        ],
        27: [
          function(t, e, n) {
            e.exports = { amp: '&', apos: "'", gt: '>', lt: '<', quot: '"' };
          },
          {}
        ],
        28: [
          function(t, e, n) {
            function r() {
              (this._events = this._events || {}),
                (this._maxListeners = this._maxListeners || void 0);
            }
            function i(t) {
              return 'function' == typeof t;
            }
            function o(t) {
              return 'object' == typeof t && null !== t;
            }
            function s(t) {
              return void 0 === t;
            }
            (e.exports = r),
              (r.EventEmitter = r),
              (r.prototype._events = void 0),
              (r.prototype._maxListeners = void 0),
              (r.defaultMaxListeners = 10),
              (r.prototype.setMaxListeners = function(t) {
                if ('number' != typeof t || t < 0 || isNaN(t))
                  throw TypeError('n must be a positive number');
                return (this._maxListeners = t), this;
              }),
              (r.prototype.emit = function(t) {
                var e, n, r, a, l, u;
                if (
                  (this._events || (this._events = {}),
                  'error' === t &&
                    (!this._events.error ||
                      (o(this._events.error) && !this._events.error.length)))
                ) {
                  if ((e = arguments[1]) instanceof Error) throw e;
                  var c = new Error(
                    'Uncaught, unspecified "error" event. (' + e + ')'
                  );
                  throw ((c.context = e), c);
                }
                if (s((n = this._events[t]))) return !1;
                if (i(n))
                  switch (arguments.length) {
                    case 1:
                      n.call(this);
                      break;
                    case 2:
                      n.call(this, arguments[1]);
                      break;
                    case 3:
                      n.call(this, arguments[1], arguments[2]);
                      break;
                    default:
                      (a = Array.prototype.slice.call(arguments, 1)),
                        n.apply(this, a);
                  }
                else if (o(n))
                  for (
                    a = Array.prototype.slice.call(arguments, 1),
                      r = (u = n.slice()).length,
                      l = 0;
                    l < r;
                    l++
                  )
                    u[l].apply(this, a);
                return !0;
              }),
              (r.prototype.addListener = function(t, e) {
                var n;
                if (!i(e)) throw TypeError('listener must be a function');
                return (
                  this._events || (this._events = {}),
                  this._events.newListener &&
                    this.emit('newListener', t, i(e.listener) ? e.listener : e),
                  this._events[t]
                    ? o(this._events[t])
                      ? this._events[t].push(e)
                      : (this._events[t] = [this._events[t], e])
                    : (this._events[t] = e),
                  o(this._events[t]) &&
                    !this._events[t].warned &&
                    (n = s(this._maxListeners)
                      ? r.defaultMaxListeners
                      : this._maxListeners) &&
                    n > 0 &&
                    this._events[t].length > n &&
                    ((this._events[t].warned = !0),
                    console.error(
                      '(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.',
                      this._events[t].length
                    ),
                    'function' == typeof console.trace && console.trace()),
                  this
                );
              }),
              (r.prototype.on = r.prototype.addListener),
              (r.prototype.once = function(t, e) {
                if (!i(e)) throw TypeError('listener must be a function');
                var n = !1;
                function r() {
                  this.removeListener(t, r),
                    n || ((n = !0), e.apply(this, arguments));
                }
                return (r.listener = e), this.on(t, r), this;
              }),
              (r.prototype.removeListener = function(t, e) {
                var n, r, s, a;
                if (!i(e)) throw TypeError('listener must be a function');
                if (!this._events || !this._events[t]) return this;
                if (
                  ((s = (n = this._events[t]).length),
                  (r = -1),
                  n === e || (i(n.listener) && n.listener === e))
                )
                  delete this._events[t],
                    this._events.removeListener &&
                      this.emit('removeListener', t, e);
                else if (o(n)) {
                  for (a = s; a-- > 0; )
                    if (n[a] === e || (n[a].listener && n[a].listener === e)) {
                      r = a;
                      break;
                    }
                  if (r < 0) return this;
                  1 === n.length
                    ? ((n.length = 0), delete this._events[t])
                    : n.splice(r, 1),
                    this._events.removeListener &&
                      this.emit('removeListener', t, e);
                }
                return this;
              }),
              (r.prototype.removeAllListeners = function(t) {
                var e, n;
                if (!this._events) return this;
                if (!this._events.removeListener)
                  return (
                    0 === arguments.length
                      ? (this._events = {})
                      : this._events[t] && delete this._events[t],
                    this
                  );
                if (0 === arguments.length) {
                  for (e in this._events)
                    'removeListener' !== e && this.removeAllListeners(e);
                  return (
                    this.removeAllListeners('removeListener'),
                    (this._events = {}),
                    this
                  );
                }
                if (i((n = this._events[t]))) this.removeListener(t, n);
                else if (n)
                  for (; n.length; ) this.removeListener(t, n[n.length - 1]);
                return delete this._events[t], this;
              }),
              (r.prototype.listeners = function(t) {
                return this._events && this._events[t]
                  ? i(this._events[t])
                    ? [this._events[t]]
                    : this._events[t].slice()
                  : [];
              }),
              (r.prototype.listenerCount = function(t) {
                if (this._events) {
                  var e = this._events[t];
                  if (i(e)) return 1;
                  if (e) return e.length;
                }
                return 0;
              }),
              (r.listenerCount = function(t, e) {
                return t.listenerCount(e);
              });
          },
          {}
        ],
        29: [
          function(t, e, n) {
            function r(t) {
              (this._cbs = t || {}), (this.events = []);
            }
            e.exports = r;
            var i = t('./').EVENTS;
            Object.keys(i).forEach(function(t) {
              if (0 === i[t])
                (t = 'on' + t),
                  (r.prototype[t] = function() {
                    this.events.push([t]), this._cbs[t] && this._cbs[t]();
                  });
              else if (1 === i[t])
                (t = 'on' + t),
                  (r.prototype[t] = function(e) {
                    this.events.push([t, e]), this._cbs[t] && this._cbs[t](e);
                  });
              else {
                if (2 !== i[t]) throw Error('wrong number of arguments');
                (t = 'on' + t),
                  (r.prototype[t] = function(e, n) {
                    this.events.push([t, e, n]),
                      this._cbs[t] && this._cbs[t](e, n);
                  });
              }
            }),
              (r.prototype.onreset = function() {
                (this.events = []), this._cbs.onreset && this._cbs.onreset();
              }),
              (r.prototype.restart = function() {
                this._cbs.onreset && this._cbs.onreset();
                for (var t = 0, e = this.events.length; t < e; t++)
                  if (this._cbs[this.events[t][0]]) {
                    var n = this.events[t].length;
                    1 === n
                      ? this._cbs[this.events[t][0]]()
                      : 2 === n
                      ? this._cbs[this.events[t][0]](this.events[t][1])
                      : this._cbs[this.events[t][0]](
                          this.events[t][1],
                          this.events[t][2]
                        );
                  }
              });
          },
          { './': 36 }
        ],
        30: [
          function(t, e, n) {
            var r = t('./index.js'),
              i = r.DomHandler,
              o = r.DomUtils;
            function s(t, e) {
              this.init(t, e);
            }
            function a(t, e) {
              return o.getElementsByTagName(t, e, !0);
            }
            function l(t, e) {
              return o.getElementsByTagName(t, e, !0, 1)[0];
            }
            function u(t, e, n) {
              return o.getText(o.getElementsByTagName(t, e, n, 1)).trim();
            }
            function c(t, e, n, r, i) {
              var o = u(n, r, i);
              o && (t[e] = o);
            }
            t('inherits')(s, i), (s.prototype.init = i);
            var h = function(t) {
              return 'rss' === t || 'feed' === t || 'rdf:RDF' === t;
            };
            (s.prototype.onend = function() {
              var t,
                e,
                n = {},
                r = l(h, this.dom);
              r &&
                ('feed' === r.name
                  ? ((e = r.children),
                    (n.type = 'atom'),
                    c(n, 'id', 'id', e),
                    c(n, 'title', 'title', e),
                    (t = l('link', e)) &&
                      (t = t.attribs) &&
                      (t = t.href) &&
                      (n.link = t),
                    c(n, 'description', 'subtitle', e),
                    (t = u('updated', e)) && (n.updated = new Date(t)),
                    c(n, 'author', 'email', e, !0),
                    (n.items = a('entry', e).map(function(t) {
                      var e,
                        n = {};
                      return (
                        c(n, 'id', 'id', (t = t.children)),
                        c(n, 'title', 'title', t),
                        (e = l('link', t)) &&
                          (e = e.attribs) &&
                          (e = e.href) &&
                          (n.link = e),
                        (e = u('summary', t) || u('content', t)) &&
                          (n.description = e),
                        (e = u('updated', t)) && (n.pubDate = new Date(e)),
                        n
                      );
                    })))
                  : ((e = l('channel', r.children).children),
                    (n.type = r.name.substr(0, 3)),
                    (n.id = ''),
                    c(n, 'title', 'title', e),
                    c(n, 'link', 'link', e),
                    c(n, 'description', 'description', e),
                    (t = u('lastBuildDate', e)) && (n.updated = new Date(t)),
                    c(n, 'author', 'managingEditor', e, !0),
                    (n.items = a('item', r.children).map(function(t) {
                      var e,
                        n = {};
                      return (
                        c(n, 'id', 'guid', (t = t.children)),
                        c(n, 'title', 'title', t),
                        c(n, 'link', 'link', t),
                        c(n, 'description', 'description', t),
                        (e = u('pubDate', t)) && (n.pubDate = new Date(e)),
                        n
                      );
                    })))),
                (this.dom = n),
                i.prototype._handleCallback.call(
                  this,
                  r ? null : Error("couldn't find root of feed")
                );
            }),
              (e.exports = s);
          },
          { './index.js': 36, inherits: 38 }
        ],
        31: [
          function(t, e, n) {
            var r = t('./Tokenizer.js'),
              i = {
                input: !0,
                option: !0,
                optgroup: !0,
                select: !0,
                button: !0,
                datalist: !0,
                textarea: !0
              },
              o = {
                tr: { tr: !0, th: !0, td: !0 },
                th: { th: !0 },
                td: { thead: !0, th: !0, td: !0 },
                body: { head: !0, link: !0, script: !0 },
                li: { li: !0 },
                p: { p: !0 },
                h1: { p: !0 },
                h2: { p: !0 },
                h3: { p: !0 },
                h4: { p: !0 },
                h5: { p: !0 },
                h6: { p: !0 },
                select: i,
                input: i,
                output: i,
                button: i,
                datalist: i,
                textarea: i,
                option: { option: !0 },
                optgroup: { optgroup: !0 }
              },
              s = {
                __proto__: null,
                area: !0,
                base: !0,
                basefont: !0,
                br: !0,
                col: !0,
                command: !0,
                embed: !0,
                frame: !0,
                hr: !0,
                img: !0,
                input: !0,
                isindex: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0,
                path: !0,
                circle: !0,
                ellipse: !0,
                line: !0,
                rect: !0,
                use: !0,
                stop: !0,
                polyline: !0,
                polygon: !0
              },
              a = /\s|\//;
            function l(t, e) {
              (this._options = e || {}),
                (this._cbs = t || {}),
                (this._tagname = ''),
                (this._attribname = ''),
                (this._attribvalue = ''),
                (this._attribs = null),
                (this._stack = []),
                (this.startIndex = 0),
                (this.endIndex = null),
                (this._lowerCaseTagNames =
                  'lowerCaseTags' in this._options
                    ? !!this._options.lowerCaseTags
                    : !this._options.xmlMode),
                (this._lowerCaseAttributeNames =
                  'lowerCaseAttributeNames' in this._options
                    ? !!this._options.lowerCaseAttributeNames
                    : !this._options.xmlMode),
                this._options.Tokenizer && (r = this._options.Tokenizer),
                (this._tokenizer = new r(this._options, this)),
                this._cbs.onparserinit && this._cbs.onparserinit(this);
            }
            t('inherits')(l, t('events').EventEmitter),
              (l.prototype._updatePosition = function(t) {
                null === this.endIndex
                  ? this._tokenizer._sectionStart <= t
                    ? (this.startIndex = 0)
                    : (this.startIndex = this._tokenizer._sectionStart - t)
                  : (this.startIndex = this.endIndex + 1),
                  (this.endIndex = this._tokenizer.getAbsoluteIndex());
              }),
              (l.prototype.ontext = function(t) {
                this._updatePosition(1),
                  this.endIndex--,
                  this._cbs.ontext && this._cbs.ontext(t);
              }),
              (l.prototype.onopentagname = function(t) {
                if (
                  (this._lowerCaseTagNames && (t = t.toLowerCase()),
                  (this._tagname = t),
                  !this._options.xmlMode && t in o)
                )
                  for (
                    var e;
                    (e = this._stack[this._stack.length - 1]) in o[t];
                    this.onclosetag(e)
                  );
                (!this._options.xmlMode && t in s) || this._stack.push(t),
                  this._cbs.onopentagname && this._cbs.onopentagname(t),
                  this._cbs.onopentag && (this._attribs = {});
              }),
              (l.prototype.onopentagend = function() {
                this._updatePosition(1),
                  this._attribs &&
                    (this._cbs.onopentag &&
                      this._cbs.onopentag(this._tagname, this._attribs),
                    (this._attribs = null)),
                  !this._options.xmlMode &&
                    this._cbs.onclosetag &&
                    this._tagname in s &&
                    this._cbs.onclosetag(this._tagname),
                  (this._tagname = '');
              }),
              (l.prototype.onclosetag = function(t) {
                if (
                  (this._updatePosition(1),
                  this._lowerCaseTagNames && (t = t.toLowerCase()),
                  !this._stack.length || (t in s && !this._options.xmlMode))
                )
                  this._options.xmlMode ||
                    ('br' !== t && 'p' !== t) ||
                    (this.onopentagname(t), this._closeCurrentTag());
                else {
                  var e = this._stack.lastIndexOf(t);
                  if (-1 !== e)
                    if (this._cbs.onclosetag)
                      for (e = this._stack.length - e; e--; )
                        this._cbs.onclosetag(this._stack.pop());
                    else this._stack.length = e;
                  else
                    'p' !== t ||
                      this._options.xmlMode ||
                      (this.onopentagname(t), this._closeCurrentTag());
                }
              }),
              (l.prototype.onselfclosingtag = function() {
                this._options.xmlMode || this._options.recognizeSelfClosing
                  ? this._closeCurrentTag()
                  : this.onopentagend();
              }),
              (l.prototype._closeCurrentTag = function() {
                var t = this._tagname;
                this.onopentagend(),
                  this._stack[this._stack.length - 1] === t &&
                    (this._cbs.onclosetag && this._cbs.onclosetag(t),
                    this._stack.pop());
              }),
              (l.prototype.onattribname = function(t) {
                this._lowerCaseAttributeNames && (t = t.toLowerCase()),
                  (this._attribname = t);
              }),
              (l.prototype.onattribdata = function(t) {
                this._attribvalue += t;
              }),
              (l.prototype.onattribend = function() {
                this._cbs.onattribute &&
                  this._cbs.onattribute(this._attribname, this._attribvalue),
                  this._attribs &&
                    !Object.prototype.hasOwnProperty.call(
                      this._attribs,
                      this._attribname
                    ) &&
                    (this._attribs[this._attribname] = this._attribvalue),
                  (this._attribname = ''),
                  (this._attribvalue = '');
              }),
              (l.prototype._getInstructionName = function(t) {
                var e = t.search(a),
                  n = e < 0 ? t : t.substr(0, e);
                return this._lowerCaseTagNames && (n = n.toLowerCase()), n;
              }),
              (l.prototype.ondeclaration = function(t) {
                if (this._cbs.onprocessinginstruction) {
                  var e = this._getInstructionName(t);
                  this._cbs.onprocessinginstruction('!' + e, '!' + t);
                }
              }),
              (l.prototype.onprocessinginstruction = function(t) {
                if (this._cbs.onprocessinginstruction) {
                  var e = this._getInstructionName(t);
                  this._cbs.onprocessinginstruction('?' + e, '?' + t);
                }
              }),
              (l.prototype.oncomment = function(t) {
                this._updatePosition(4),
                  this._cbs.oncomment && this._cbs.oncomment(t),
                  this._cbs.oncommentend && this._cbs.oncommentend();
              }),
              (l.prototype.oncdata = function(t) {
                this._updatePosition(1),
                  this._options.xmlMode || this._options.recognizeCDATA
                    ? (this._cbs.oncdatastart && this._cbs.oncdatastart(),
                      this._cbs.ontext && this._cbs.ontext(t),
                      this._cbs.oncdataend && this._cbs.oncdataend())
                    : this.oncomment('[CDATA[' + t + ']]');
              }),
              (l.prototype.onerror = function(t) {
                this._cbs.onerror && this._cbs.onerror(t);
              }),
              (l.prototype.onend = function() {
                if (this._cbs.onclosetag)
                  for (
                    var t = this._stack.length;
                    t > 0;
                    this._cbs.onclosetag(this._stack[--t])
                  );
                this._cbs.onend && this._cbs.onend();
              }),
              (l.prototype.reset = function() {
                this._cbs.onreset && this._cbs.onreset(),
                  this._tokenizer.reset(),
                  (this._tagname = ''),
                  (this._attribname = ''),
                  (this._attribs = null),
                  (this._stack = []),
                  this._cbs.onparserinit && this._cbs.onparserinit(this);
              }),
              (l.prototype.parseComplete = function(t) {
                this.reset(), this.end(t);
              }),
              (l.prototype.write = function(t) {
                this._tokenizer.write(t);
              }),
              (l.prototype.end = function(t) {
                this._tokenizer.end(t);
              }),
              (l.prototype.pause = function() {
                this._tokenizer.pause();
              }),
              (l.prototype.resume = function() {
                this._tokenizer.resume();
              }),
              (l.prototype.parseChunk = l.prototype.write),
              (l.prototype.done = l.prototype.end),
              (e.exports = l);
          },
          { './Tokenizer.js': 34, events: 28, inherits: 38 }
        ],
        32: [
          function(t, e, n) {
            function r(t) {
              this._cbs = t || {};
            }
            e.exports = r;
            var i = t('./').EVENTS;
            Object.keys(i).forEach(function(t) {
              if (0 === i[t])
                (t = 'on' + t),
                  (r.prototype[t] = function() {
                    this._cbs[t] && this._cbs[t]();
                  });
              else if (1 === i[t])
                (t = 'on' + t),
                  (r.prototype[t] = function(e) {
                    this._cbs[t] && this._cbs[t](e);
                  });
              else {
                if (2 !== i[t]) throw Error('wrong number of arguments');
                (t = 'on' + t),
                  (r.prototype[t] = function(e, n) {
                    this._cbs[t] && this._cbs[t](e, n);
                  });
              }
            });
          },
          { './': 36 }
        ],
        33: [
          function(t, e, n) {
            e.exports = i;
            var r = t('./WritableStream.js');
            function i(t) {
              r.call(this, new o(this), t);
            }
            function o(t) {
              this.scope = t;
            }
            t('inherits')(i, r), (i.prototype.readable = !0);
            var s = t('../').EVENTS;
            Object.keys(s).forEach(function(t) {
              if (0 === s[t])
                o.prototype['on' + t] = function() {
                  this.scope.emit(t);
                };
              else if (1 === s[t])
                o.prototype['on' + t] = function(e) {
                  this.scope.emit(t, e);
                };
              else {
                if (2 !== s[t]) throw Error('wrong number of arguments!');
                o.prototype['on' + t] = function(e, n) {
                  this.scope.emit(t, e, n);
                };
              }
            });
          },
          { '../': 36, './WritableStream.js': 35, inherits: 38 }
        ],
        34: [
          function(t, e, n) {
            e.exports = yt;
            var r,
              i,
              o = t('entities/lib/decode_codepoint.js'),
              s = t('entities/maps/entities.json'),
              a = t('entities/maps/legacy.json'),
              l = t('entities/maps/xml.json'),
              u = 0,
              c = u++,
              h = u++,
              f = u++,
              d = u++,
              p = u++,
              g = u++,
              m = u++,
              v = u++,
              y = u++,
              _ = u++,
              b = u++,
              w = u++,
              x = u++,
              E = u++,
              T = u++,
              S = u++,
              C = u++,
              k = u++,
              A = u++,
              D = u++,
              N = u++,
              I = u++,
              L = u++,
              j = u++,
              q = u++,
              O = u++,
              R = u++,
              B = u++,
              M = u++,
              P = u++,
              H = u++,
              U = u++,
              F = u++,
              W = u++,
              V = u++,
              z = u++,
              G = u++,
              K = u++,
              Q = u++,
              Y = u++,
              $ = u++,
              X = u++,
              J = u++,
              Z = u++,
              tt = u++,
              et = u++,
              nt = u++,
              rt = u++,
              it = u++,
              ot = u++,
              st = u++,
              at = u++,
              lt = u++,
              ut = u++,
              ct = u++,
              ht = 0,
              ft = ht++,
              dt = ht++,
              pt = ht++;
            function gt(t) {
              return (
                ' ' === t ||
                '\n' === t ||
                '\t' === t ||
                '\f' === t ||
                '\r' === t
              );
            }
            function mt(t, e, n) {
              var r = t.toLowerCase();
              return t === r
                ? function(t) {
                    t === r
                      ? (this._state = e)
                      : ((this._state = n), this._index--);
                  }
                : function(i) {
                    i === r || i === t
                      ? (this._state = e)
                      : ((this._state = n), this._index--);
                  };
            }
            function vt(t, e) {
              var n = t.toLowerCase();
              return function(r) {
                r === n || r === t
                  ? (this._state = e)
                  : ((this._state = f), this._index--);
              };
            }
            function yt(t, e) {
              (this._state = c),
                (this._buffer = ''),
                (this._sectionStart = 0),
                (this._index = 0),
                (this._bufferOffset = 0),
                (this._baseState = c),
                (this._special = ft),
                (this._cbs = e),
                (this._running = !0),
                (this._ended = !1),
                (this._xmlMode = !(!t || !t.xmlMode)),
                (this._decodeEntities = !(!t || !t.decodeEntities));
            }
            (yt.prototype._stateText = function(t) {
              '<' === t
                ? (this._index > this._sectionStart &&
                    this._cbs.ontext(this._getSection()),
                  (this._state = h),
                  (this._sectionStart = this._index))
                : this._decodeEntities &&
                  this._special === ft &&
                  '&' === t &&
                  (this._index > this._sectionStart &&
                    this._cbs.ontext(this._getSection()),
                  (this._baseState = c),
                  (this._state = st),
                  (this._sectionStart = this._index));
            }),
              (yt.prototype._stateBeforeTagName = function(t) {
                '/' === t
                  ? (this._state = p)
                  : '<' === t
                  ? (this._cbs.ontext(this._getSection()),
                    (this._sectionStart = this._index))
                  : '>' === t || this._special !== ft || gt(t)
                  ? (this._state = c)
                  : '!' === t
                  ? ((this._state = T), (this._sectionStart = this._index + 1))
                  : '?' === t
                  ? ((this._state = C), (this._sectionStart = this._index + 1))
                  : ((this._state =
                      this._xmlMode || ('s' !== t && 'S' !== t) ? f : H),
                    (this._sectionStart = this._index));
              }),
              (yt.prototype._stateInTagName = function(t) {
                ('/' === t || '>' === t || gt(t)) &&
                  (this._emitToken('onopentagname'),
                  (this._state = v),
                  this._index--);
              }),
              (yt.prototype._stateBeforeCloseingTagName = function(t) {
                gt(t) ||
                  ('>' === t
                    ? (this._state = c)
                    : this._special !== ft
                    ? 's' === t || 'S' === t
                      ? (this._state = U)
                      : ((this._state = c), this._index--)
                    : ((this._state = g), (this._sectionStart = this._index)));
              }),
              (yt.prototype._stateInCloseingTagName = function(t) {
                ('>' === t || gt(t)) &&
                  (this._emitToken('onclosetag'),
                  (this._state = m),
                  this._index--);
              }),
              (yt.prototype._stateAfterCloseingTagName = function(t) {
                '>' === t &&
                  ((this._state = c), (this._sectionStart = this._index + 1));
              }),
              (yt.prototype._stateBeforeAttributeName = function(t) {
                '>' === t
                  ? (this._cbs.onopentagend(),
                    (this._state = c),
                    (this._sectionStart = this._index + 1))
                  : '/' === t
                  ? (this._state = d)
                  : gt(t) ||
                    ((this._state = y), (this._sectionStart = this._index));
              }),
              (yt.prototype._stateInSelfClosingTag = function(t) {
                '>' === t
                  ? (this._cbs.onselfclosingtag(),
                    (this._state = c),
                    (this._sectionStart = this._index + 1))
                  : gt(t) || ((this._state = v), this._index--);
              }),
              (yt.prototype._stateInAttributeName = function(t) {
                ('=' === t || '/' === t || '>' === t || gt(t)) &&
                  (this._cbs.onattribname(this._getSection()),
                  (this._sectionStart = -1),
                  (this._state = _),
                  this._index--);
              }),
              (yt.prototype._stateAfterAttributeName = function(t) {
                '=' === t
                  ? (this._state = b)
                  : '/' === t || '>' === t
                  ? (this._cbs.onattribend(), (this._state = v), this._index--)
                  : gt(t) ||
                    (this._cbs.onattribend(),
                    (this._state = y),
                    (this._sectionStart = this._index));
              }),
              (yt.prototype._stateBeforeAttributeValue = function(t) {
                '"' === t
                  ? ((this._state = w), (this._sectionStart = this._index + 1))
                  : "'" === t
                  ? ((this._state = x), (this._sectionStart = this._index + 1))
                  : gt(t) ||
                    ((this._state = E),
                    (this._sectionStart = this._index),
                    this._index--);
              }),
              (yt.prototype._stateInAttributeValueDoubleQuotes = function(t) {
                '"' === t
                  ? (this._emitToken('onattribdata'),
                    this._cbs.onattribend(),
                    (this._state = v))
                  : this._decodeEntities &&
                    '&' === t &&
                    (this._emitToken('onattribdata'),
                    (this._baseState = this._state),
                    (this._state = st),
                    (this._sectionStart = this._index));
              }),
              (yt.prototype._stateInAttributeValueSingleQuotes = function(t) {
                "'" === t
                  ? (this._emitToken('onattribdata'),
                    this._cbs.onattribend(),
                    (this._state = v))
                  : this._decodeEntities &&
                    '&' === t &&
                    (this._emitToken('onattribdata'),
                    (this._baseState = this._state),
                    (this._state = st),
                    (this._sectionStart = this._index));
              }),
              (yt.prototype._stateInAttributeValueNoQuotes = function(t) {
                gt(t) || '>' === t
                  ? (this._emitToken('onattribdata'),
                    this._cbs.onattribend(),
                    (this._state = v),
                    this._index--)
                  : this._decodeEntities &&
                    '&' === t &&
                    (this._emitToken('onattribdata'),
                    (this._baseState = this._state),
                    (this._state = st),
                    (this._sectionStart = this._index));
              }),
              (yt.prototype._stateBeforeDeclaration = function(t) {
                this._state = '[' === t ? I : '-' === t ? k : S;
              }),
              (yt.prototype._stateInDeclaration = function(t) {
                '>' === t &&
                  (this._cbs.ondeclaration(this._getSection()),
                  (this._state = c),
                  (this._sectionStart = this._index + 1));
              }),
              (yt.prototype._stateInProcessingInstruction = function(t) {
                '>' === t &&
                  (this._cbs.onprocessinginstruction(this._getSection()),
                  (this._state = c),
                  (this._sectionStart = this._index + 1));
              }),
              (yt.prototype._stateBeforeComment = function(t) {
                '-' === t
                  ? ((this._state = A), (this._sectionStart = this._index + 1))
                  : (this._state = S);
              }),
              (yt.prototype._stateInComment = function(t) {
                '-' === t && (this._state = D);
              }),
              (yt.prototype._stateAfterComment1 = function(t) {
                this._state = '-' === t ? N : A;
              }),
              (yt.prototype._stateAfterComment2 = function(t) {
                '>' === t
                  ? (this._cbs.oncomment(
                      this._buffer.substring(
                        this._sectionStart,
                        this._index - 2
                      )
                    ),
                    (this._state = c),
                    (this._sectionStart = this._index + 1))
                  : '-' !== t && (this._state = A);
              }),
              (yt.prototype._stateBeforeCdata1 = mt('C', L, S)),
              (yt.prototype._stateBeforeCdata2 = mt('D', j, S)),
              (yt.prototype._stateBeforeCdata3 = mt('A', q, S)),
              (yt.prototype._stateBeforeCdata4 = mt('T', O, S)),
              (yt.prototype._stateBeforeCdata5 = mt('A', R, S)),
              (yt.prototype._stateBeforeCdata6 = function(t) {
                '[' === t
                  ? ((this._state = B), (this._sectionStart = this._index + 1))
                  : ((this._state = S), this._index--);
              }),
              (yt.prototype._stateInCdata = function(t) {
                ']' === t && (this._state = M);
              }),
              (yt.prototype._stateAfterCdata1 = ((r = ']'),
              (i = P),
              function(t) {
                t === r && (this._state = i);
              })),
              (yt.prototype._stateAfterCdata2 = function(t) {
                '>' === t
                  ? (this._cbs.oncdata(
                      this._buffer.substring(
                        this._sectionStart,
                        this._index - 2
                      )
                    ),
                    (this._state = c),
                    (this._sectionStart = this._index + 1))
                  : ']' !== t && (this._state = B);
              }),
              (yt.prototype._stateBeforeSpecial = function(t) {
                'c' === t || 'C' === t
                  ? (this._state = F)
                  : 't' === t || 'T' === t
                  ? (this._state = J)
                  : ((this._state = f), this._index--);
              }),
              (yt.prototype._stateBeforeSpecialEnd = function(t) {
                this._special !== dt || ('c' !== t && 'C' !== t)
                  ? this._special !== pt || ('t' !== t && 'T' !== t)
                    ? (this._state = c)
                    : (this._state = nt)
                  : (this._state = K);
              }),
              (yt.prototype._stateBeforeScript1 = vt('R', W)),
              (yt.prototype._stateBeforeScript2 = vt('I', V)),
              (yt.prototype._stateBeforeScript3 = vt('P', z)),
              (yt.prototype._stateBeforeScript4 = vt('T', G)),
              (yt.prototype._stateBeforeScript5 = function(t) {
                ('/' === t || '>' === t || gt(t)) && (this._special = dt),
                  (this._state = f),
                  this._index--;
              }),
              (yt.prototype._stateAfterScript1 = mt('R', Q, c)),
              (yt.prototype._stateAfterScript2 = mt('I', Y, c)),
              (yt.prototype._stateAfterScript3 = mt('P', $, c)),
              (yt.prototype._stateAfterScript4 = mt('T', X, c)),
              (yt.prototype._stateAfterScript5 = function(t) {
                '>' === t || gt(t)
                  ? ((this._special = ft),
                    (this._state = g),
                    (this._sectionStart = this._index - 6),
                    this._index--)
                  : (this._state = c);
              }),
              (yt.prototype._stateBeforeStyle1 = vt('Y', Z)),
              (yt.prototype._stateBeforeStyle2 = vt('L', tt)),
              (yt.prototype._stateBeforeStyle3 = vt('E', et)),
              (yt.prototype._stateBeforeStyle4 = function(t) {
                ('/' === t || '>' === t || gt(t)) && (this._special = pt),
                  (this._state = f),
                  this._index--;
              }),
              (yt.prototype._stateAfterStyle1 = mt('Y', rt, c)),
              (yt.prototype._stateAfterStyle2 = mt('L', it, c)),
              (yt.prototype._stateAfterStyle3 = mt('E', ot, c)),
              (yt.prototype._stateAfterStyle4 = function(t) {
                '>' === t || gt(t)
                  ? ((this._special = ft),
                    (this._state = g),
                    (this._sectionStart = this._index - 5),
                    this._index--)
                  : (this._state = c);
              }),
              (yt.prototype._stateBeforeEntity = mt('#', at, lt)),
              (yt.prototype._stateBeforeNumericEntity = mt('X', ct, ut)),
              (yt.prototype._parseNamedEntityStrict = function() {
                if (this._sectionStart + 1 < this._index) {
                  var t = this._buffer.substring(
                      this._sectionStart + 1,
                      this._index
                    ),
                    e = this._xmlMode ? l : s;
                  e.hasOwnProperty(t) &&
                    (this._emitPartial(e[t]),
                    (this._sectionStart = this._index + 1));
                }
              }),
              (yt.prototype._parseLegacyEntity = function() {
                var t = this._sectionStart + 1,
                  e = this._index - t;
                for (e > 6 && (e = 6); e >= 2; ) {
                  var n = this._buffer.substr(t, e);
                  if (a.hasOwnProperty(n))
                    return (
                      this._emitPartial(a[n]),
                      void (this._sectionStart += e + 1)
                    );
                  e--;
                }
              }),
              (yt.prototype._stateInNamedEntity = function(t) {
                ';' === t
                  ? (this._parseNamedEntityStrict(),
                    this._sectionStart + 1 < this._index &&
                      !this._xmlMode &&
                      this._parseLegacyEntity(),
                    (this._state = this._baseState))
                  : (t < 'a' || t > 'z') &&
                    (t < 'A' || t > 'Z') &&
                    (t < '0' || t > '9') &&
                    (this._xmlMode ||
                      this._sectionStart + 1 === this._index ||
                      (this._baseState !== c
                        ? '=' !== t && this._parseNamedEntityStrict()
                        : this._parseLegacyEntity()),
                    (this._state = this._baseState),
                    this._index--);
              }),
              (yt.prototype._decodeNumericEntity = function(t, e) {
                var n = this._sectionStart + t;
                if (n !== this._index) {
                  var r = this._buffer.substring(n, this._index),
                    i = parseInt(r, e);
                  this._emitPartial(o(i)), (this._sectionStart = this._index);
                } else this._sectionStart--;
                this._state = this._baseState;
              }),
              (yt.prototype._stateInNumericEntity = function(t) {
                ';' === t
                  ? (this._decodeNumericEntity(2, 10), this._sectionStart++)
                  : (t < '0' || t > '9') &&
                    (this._xmlMode
                      ? (this._state = this._baseState)
                      : this._decodeNumericEntity(2, 10),
                    this._index--);
              }),
              (yt.prototype._stateInHexEntity = function(t) {
                ';' === t
                  ? (this._decodeNumericEntity(3, 16), this._sectionStart++)
                  : (t < 'a' || t > 'f') &&
                    (t < 'A' || t > 'F') &&
                    (t < '0' || t > '9') &&
                    (this._xmlMode
                      ? (this._state = this._baseState)
                      : this._decodeNumericEntity(3, 16),
                    this._index--);
              }),
              (yt.prototype._cleanup = function() {
                this._sectionStart < 0
                  ? ((this._buffer = ''),
                    (this._bufferOffset += this._index),
                    (this._index = 0))
                  : this._running &&
                    (this._state === c
                      ? (this._sectionStart !== this._index &&
                          this._cbs.ontext(
                            this._buffer.substr(this._sectionStart)
                          ),
                        (this._buffer = ''),
                        (this._bufferOffset += this._index),
                        (this._index = 0))
                      : this._sectionStart === this._index
                      ? ((this._buffer = ''),
                        (this._bufferOffset += this._index),
                        (this._index = 0))
                      : ((this._buffer = this._buffer.substr(
                          this._sectionStart
                        )),
                        (this._index -= this._sectionStart),
                        (this._bufferOffset += this._sectionStart)),
                    (this._sectionStart = 0));
              }),
              (yt.prototype.write = function(t) {
                this._ended && this._cbs.onerror(Error('.write() after done!')),
                  (this._buffer += t),
                  this._parse();
              }),
              (yt.prototype._parse = function() {
                for (; this._index < this._buffer.length && this._running; ) {
                  var t = this._buffer.charAt(this._index);
                  this._state === c
                    ? this._stateText(t)
                    : this._state === h
                    ? this._stateBeforeTagName(t)
                    : this._state === f
                    ? this._stateInTagName(t)
                    : this._state === p
                    ? this._stateBeforeCloseingTagName(t)
                    : this._state === g
                    ? this._stateInCloseingTagName(t)
                    : this._state === m
                    ? this._stateAfterCloseingTagName(t)
                    : this._state === d
                    ? this._stateInSelfClosingTag(t)
                    : this._state === v
                    ? this._stateBeforeAttributeName(t)
                    : this._state === y
                    ? this._stateInAttributeName(t)
                    : this._state === _
                    ? this._stateAfterAttributeName(t)
                    : this._state === b
                    ? this._stateBeforeAttributeValue(t)
                    : this._state === w
                    ? this._stateInAttributeValueDoubleQuotes(t)
                    : this._state === x
                    ? this._stateInAttributeValueSingleQuotes(t)
                    : this._state === E
                    ? this._stateInAttributeValueNoQuotes(t)
                    : this._state === T
                    ? this._stateBeforeDeclaration(t)
                    : this._state === S
                    ? this._stateInDeclaration(t)
                    : this._state === C
                    ? this._stateInProcessingInstruction(t)
                    : this._state === k
                    ? this._stateBeforeComment(t)
                    : this._state === A
                    ? this._stateInComment(t)
                    : this._state === D
                    ? this._stateAfterComment1(t)
                    : this._state === N
                    ? this._stateAfterComment2(t)
                    : this._state === I
                    ? this._stateBeforeCdata1(t)
                    : this._state === L
                    ? this._stateBeforeCdata2(t)
                    : this._state === j
                    ? this._stateBeforeCdata3(t)
                    : this._state === q
                    ? this._stateBeforeCdata4(t)
                    : this._state === O
                    ? this._stateBeforeCdata5(t)
                    : this._state === R
                    ? this._stateBeforeCdata6(t)
                    : this._state === B
                    ? this._stateInCdata(t)
                    : this._state === M
                    ? this._stateAfterCdata1(t)
                    : this._state === P
                    ? this._stateAfterCdata2(t)
                    : this._state === H
                    ? this._stateBeforeSpecial(t)
                    : this._state === U
                    ? this._stateBeforeSpecialEnd(t)
                    : this._state === F
                    ? this._stateBeforeScript1(t)
                    : this._state === W
                    ? this._stateBeforeScript2(t)
                    : this._state === V
                    ? this._stateBeforeScript3(t)
                    : this._state === z
                    ? this._stateBeforeScript4(t)
                    : this._state === G
                    ? this._stateBeforeScript5(t)
                    : this._state === K
                    ? this._stateAfterScript1(t)
                    : this._state === Q
                    ? this._stateAfterScript2(t)
                    : this._state === Y
                    ? this._stateAfterScript3(t)
                    : this._state === $
                    ? this._stateAfterScript4(t)
                    : this._state === X
                    ? this._stateAfterScript5(t)
                    : this._state === J
                    ? this._stateBeforeStyle1(t)
                    : this._state === Z
                    ? this._stateBeforeStyle2(t)
                    : this._state === tt
                    ? this._stateBeforeStyle3(t)
                    : this._state === et
                    ? this._stateBeforeStyle4(t)
                    : this._state === nt
                    ? this._stateAfterStyle1(t)
                    : this._state === rt
                    ? this._stateAfterStyle2(t)
                    : this._state === it
                    ? this._stateAfterStyle3(t)
                    : this._state === ot
                    ? this._stateAfterStyle4(t)
                    : this._state === st
                    ? this._stateBeforeEntity(t)
                    : this._state === at
                    ? this._stateBeforeNumericEntity(t)
                    : this._state === lt
                    ? this._stateInNamedEntity(t)
                    : this._state === ut
                    ? this._stateInNumericEntity(t)
                    : this._state === ct
                    ? this._stateInHexEntity(t)
                    : this._cbs.onerror(Error('unknown _state'), this._state),
                    this._index++;
                }
                this._cleanup();
              }),
              (yt.prototype.pause = function() {
                this._running = !1;
              }),
              (yt.prototype.resume = function() {
                (this._running = !0),
                  this._index < this._buffer.length && this._parse(),
                  this._ended && this._finish();
              }),
              (yt.prototype.end = function(t) {
                this._ended && this._cbs.onerror(Error('.end() after done!')),
                  t && this.write(t),
                  (this._ended = !0),
                  this._running && this._finish();
              }),
              (yt.prototype._finish = function() {
                this._sectionStart < this._index && this._handleTrailingData(),
                  this._cbs.onend();
              }),
              (yt.prototype._handleTrailingData = function() {
                var t = this._buffer.substr(this._sectionStart);
                this._state === B || this._state === M || this._state === P
                  ? this._cbs.oncdata(t)
                  : this._state === A || this._state === D || this._state === N
                  ? this._cbs.oncomment(t)
                  : this._state !== lt || this._xmlMode
                  ? this._state !== ut || this._xmlMode
                    ? this._state !== ct || this._xmlMode
                      ? this._state !== f &&
                        this._state !== v &&
                        this._state !== b &&
                        this._state !== _ &&
                        this._state !== y &&
                        this._state !== x &&
                        this._state !== w &&
                        this._state !== E &&
                        this._state !== g &&
                        this._cbs.ontext(t)
                      : (this._decodeNumericEntity(3, 16),
                        this._sectionStart < this._index &&
                          ((this._state = this._baseState),
                          this._handleTrailingData()))
                    : (this._decodeNumericEntity(2, 10),
                      this._sectionStart < this._index &&
                        ((this._state = this._baseState),
                        this._handleTrailingData()))
                  : (this._parseLegacyEntity(),
                    this._sectionStart < this._index &&
                      ((this._state = this._baseState),
                      this._handleTrailingData()));
              }),
              (yt.prototype.reset = function() {
                yt.call(
                  this,
                  {
                    xmlMode: this._xmlMode,
                    decodeEntities: this._decodeEntities
                  },
                  this._cbs
                );
              }),
              (yt.prototype.getAbsoluteIndex = function() {
                return this._bufferOffset + this._index;
              }),
              (yt.prototype._getSection = function() {
                return this._buffer.substring(this._sectionStart, this._index);
              }),
              (yt.prototype._emitToken = function(t) {
                this._cbs[t](this._getSection()), (this._sectionStart = -1);
              }),
              (yt.prototype._emitPartial = function(t) {
                this._baseState !== c
                  ? this._cbs.onattribdata(t)
                  : this._cbs.ontext(t);
              });
          },
          {
            'entities/lib/decode_codepoint.js': 22,
            'entities/maps/entities.json': 25,
            'entities/maps/legacy.json': 26,
            'entities/maps/xml.json': 27
          }
        ],
        35: [
          function(t, e, n) {
            e.exports = a;
            var r = t('./Parser.js'),
              i = t('stream').Writable || t('readable-stream').Writable,
              o = t('string_decoder').StringDecoder,
              s = t('buffer').Buffer;
            function a(t, e) {
              var n = (this._parser = new r(t, e)),
                s = (this._decoder = new o());
              i.call(this, { decodeStrings: !1 }),
                this.once('finish', function() {
                  n.end(s.end());
                });
            }
            t('inherits')(a, i),
              (i.prototype._write = function(t, e, n) {
                t instanceof s && (t = this._decoder.write(t)),
                  this._parser.write(t),
                  n();
              });
          },
          {
            './Parser.js': 31,
            buffer: 5,
            inherits: 38,
            'readable-stream': 3,
            stream: 54,
            string_decoder: 55
          }
        ],
        36: [
          function(t, e, n) {
            var r = t('./Parser.js'),
              i = t('domhandler');
            function o(t, n) {
              return delete e.exports[t], (e.exports[t] = n), n;
            }
            e.exports = {
              Parser: r,
              Tokenizer: t('./Tokenizer.js'),
              ElementType: t('domelementtype'),
              DomHandler: i,
              get FeedHandler() {
                return o('FeedHandler', t('./FeedHandler.js'));
              },
              get Stream() {
                return o('Stream', t('./Stream.js'));
              },
              get WritableStream() {
                return o('WritableStream', t('./WritableStream.js'));
              },
              get ProxyHandler() {
                return o('ProxyHandler', t('./ProxyHandler.js'));
              },
              get DomUtils() {
                return o('DomUtils', t('domutils'));
              },
              get CollectingHandler() {
                return o('CollectingHandler', t('./CollectingHandler.js'));
              },
              DefaultHandler: i,
              get RssHandler() {
                return o('RssHandler', this.FeedHandler);
              },
              parseDOM: function(t, e) {
                var n = new i(e);
                return new r(n, e).end(t), n.dom;
              },
              parseFeed: function(t, n) {
                var i = new e.exports.FeedHandler(n);
                return new r(i, n).end(t), i.dom;
              },
              createDomStream: function(t, e, n) {
                var o = new i(t, e, n);
                return new r(o, e);
              },
              EVENTS: {
                attribute: 2,
                cdatastart: 0,
                cdataend: 0,
                text: 1,
                processinginstruction: 2,
                comment: 1,
                commentend: 0,
                closetag: 1,
                opentag: 2,
                opentagname: 1,
                error: 1,
                end: 0
              }
            };
          },
          {
            './CollectingHandler.js': 29,
            './FeedHandler.js': 30,
            './Parser.js': 31,
            './ProxyHandler.js': 32,
            './Stream.js': 33,
            './Tokenizer.js': 34,
            './WritableStream.js': 35,
            domelementtype: 9,
            domhandler: 10,
            domutils: 13
          }
        ],
        37: [
          function(t, e, n) {
            (n.read = function(t, e, n, r, i) {
              var o,
                s,
                a = 8 * i - r - 1,
                l = (1 << a) - 1,
                u = l >> 1,
                c = -7,
                h = n ? i - 1 : 0,
                f = n ? -1 : 1,
                d = t[e + h];
              for (
                h += f, o = d & ((1 << -c) - 1), d >>= -c, c += a;
                c > 0;
                o = 256 * o + t[e + h], h += f, c -= 8
              );
              for (
                s = o & ((1 << -c) - 1), o >>= -c, c += r;
                c > 0;
                s = 256 * s + t[e + h], h += f, c -= 8
              );
              if (0 === o) o = 1 - u;
              else {
                if (o === l) return s ? NaN : (1 / 0) * (d ? -1 : 1);
                (s += Math.pow(2, r)), (o -= u);
              }
              return (d ? -1 : 1) * s * Math.pow(2, o - r);
            }),
              (n.write = function(t, e, n, r, i, o) {
                var s,
                  a,
                  l,
                  u = 8 * o - i - 1,
                  c = (1 << u) - 1,
                  h = c >> 1,
                  f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                  d = r ? 0 : o - 1,
                  p = r ? 1 : -1,
                  g = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
                for (
                  e = Math.abs(e),
                    isNaN(e) || e === 1 / 0
                      ? ((a = isNaN(e) ? 1 : 0), (s = c))
                      : ((s = Math.floor(Math.log(e) / Math.LN2)),
                        e * (l = Math.pow(2, -s)) < 1 && (s--, (l *= 2)),
                        (e += s + h >= 1 ? f / l : f * Math.pow(2, 1 - h)) *
                          l >=
                          2 && (s++, (l /= 2)),
                        s + h >= c
                          ? ((a = 0), (s = c))
                          : s + h >= 1
                          ? ((a = (e * l - 1) * Math.pow(2, i)), (s += h))
                          : ((a = e * Math.pow(2, h - 1) * Math.pow(2, i)),
                            (s = 0)));
                  i >= 8;
                  t[n + d] = 255 & a, d += p, a /= 256, i -= 8
                );
                for (
                  s = (s << i) | a, u += i;
                  u > 0;
                  t[n + d] = 255 & s, d += p, s /= 256, u -= 8
                );
                t[n + d - p] |= 128 * g;
              });
          },
          {}
        ],
        38: [
          function(t, e, n) {
            'function' == typeof Object.create
              ? (e.exports = function(t, e) {
                  (t.super_ = e),
                    (t.prototype = Object.create(e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                      }
                    }));
                })
              : (e.exports = function(t, e) {
                  t.super_ = e;
                  var n = function() {};
                  (n.prototype = e.prototype),
                    (t.prototype = new n()),
                    (t.prototype.constructor = t);
                });
          },
          {}
        ],
        39: [
          function(t, e, n) {
            function r(t) {
              return (
                !!t.constructor &&
                'function' == typeof t.constructor.isBuffer &&
                t.constructor.isBuffer(t)
              );
            }
            e.exports = function(t) {
              return (
                null != t &&
                (r(t) ||
                  (function(t) {
                    return (
                      'function' == typeof t.readFloatLE &&
                      'function' == typeof t.slice &&
                      r(t.slice(0, 0))
                    );
                  })(t) ||
                  !!t._isBuffer)
              );
            };
          },
          {}
        ],
        40: [
          function(t, e, n) {
            var r = {}.toString;
            e.exports =
              Array.isArray ||
              function(t) {
                return '[object Array]' == r.call(t);
              };
          },
          {}
        ],
        41: [
          function(t, e, n) {
            (function(t) {
              'use strict';
              !t.version ||
              0 === t.version.indexOf('v0.') ||
              (0 === t.version.indexOf('v1.') &&
                0 !== t.version.indexOf('v1.8.'))
                ? (e.exports = function(e, n, r, i) {
                    if ('function' != typeof e)
                      throw new TypeError(
                        '"callback" argument must be a function'
                      );
                    var o,
                      s,
                      a = arguments.length;
                    switch (a) {
                      case 0:
                      case 1:
                        return t.nextTick(e);
                      case 2:
                        return t.nextTick(function() {
                          e.call(null, n);
                        });
                      case 3:
                        return t.nextTick(function() {
                          e.call(null, n, r);
                        });
                      case 4:
                        return t.nextTick(function() {
                          e.call(null, n, r, i);
                        });
                      default:
                        for (o = new Array(a - 1), s = 0; s < o.length; )
                          o[s++] = arguments[s];
                        return t.nextTick(function() {
                          e.apply(null, o);
                        });
                    }
                  })
                : (e.exports = t.nextTick);
            }.call(this, t('_process')));
          },
          { _process: 42 }
        ],
        42: [
          function(t, e, n) {
            var r,
              i,
              o = (e.exports = {});
            function s() {
              throw new Error('setTimeout has not been defined');
            }
            function a() {
              throw new Error('clearTimeout has not been defined');
            }
            function l(t) {
              if (r === setTimeout) return setTimeout(t, 0);
              if ((r === s || !r) && setTimeout)
                return (r = setTimeout), setTimeout(t, 0);
              try {
                return r(t, 0);
              } catch (e) {
                try {
                  return r.call(null, t, 0);
                } catch (e) {
                  return r.call(this, t, 0);
                }
              }
            }
            !(function() {
              try {
                r = 'function' == typeof setTimeout ? setTimeout : s;
              } catch (t) {
                r = s;
              }
              try {
                i = 'function' == typeof clearTimeout ? clearTimeout : a;
              } catch (t) {
                i = a;
              }
            })();
            var u,
              c = [],
              h = !1,
              f = -1;
            function d() {
              h &&
                u &&
                ((h = !1),
                u.length ? (c = u.concat(c)) : (f = -1),
                c.length && p());
            }
            function p() {
              if (!h) {
                var t = l(d);
                h = !0;
                for (var e = c.length; e; ) {
                  for (u = c, c = []; ++f < e; ) u && u[f].run();
                  (f = -1), (e = c.length);
                }
                (u = null),
                  (h = !1),
                  (function(t) {
                    if (i === clearTimeout) return clearTimeout(t);
                    if ((i === a || !i) && clearTimeout)
                      return (i = clearTimeout), clearTimeout(t);
                    try {
                      i(t);
                    } catch (e) {
                      try {
                        return i.call(null, t);
                      } catch (e) {
                        return i.call(this, t);
                      }
                    }
                  })(t);
              }
            }
            function g(t, e) {
              (this.fun = t), (this.array = e);
            }
            function m() {}
            (o.nextTick = function(t) {
              var e = new Array(arguments.length - 1);
              if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++)
                  e[n - 1] = arguments[n];
              c.push(new g(t, e)), 1 !== c.length || h || l(p);
            }),
              (g.prototype.run = function() {
                this.fun.apply(null, this.array);
              }),
              (o.title = 'browser'),
              (o.browser = !0),
              (o.env = {}),
              (o.argv = []),
              (o.version = ''),
              (o.versions = {}),
              (o.on = m),
              (o.addListener = m),
              (o.once = m),
              (o.off = m),
              (o.removeListener = m),
              (o.removeAllListeners = m),
              (o.emit = m),
              (o.binding = function(t) {
                throw new Error('process.binding is not supported');
              }),
              (o.cwd = function() {
                return '/';
              }),
              (o.chdir = function(t) {
                throw new Error('process.chdir is not supported');
              }),
              (o.umask = function() {
                return 0;
              });
          },
          {}
        ],
        43: [
          function(t, e, n) {
            e.exports = t('./lib/_stream_duplex.js');
          },
          { './lib/_stream_duplex.js': 44 }
        ],
        44: [
          function(t, e, n) {
            'use strict';
            var r =
              Object.keys ||
              function(t) {
                var e = [];
                for (var n in t) e.push(n);
                return e;
              };
            e.exports = h;
            var i = t('process-nextick-args'),
              o = t('core-util-is');
            o.inherits = t('inherits');
            var s = t('./_stream_readable'),
              a = t('./_stream_writable');
            o.inherits(h, s);
            for (var l = r(a.prototype), u = 0; u < l.length; u++) {
              var c = l[u];
              h.prototype[c] || (h.prototype[c] = a.prototype[c]);
            }
            function h(t) {
              if (!(this instanceof h)) return new h(t);
              s.call(this, t),
                a.call(this, t),
                t && !1 === t.readable && (this.readable = !1),
                t && !1 === t.writable && (this.writable = !1),
                (this.allowHalfOpen = !0),
                t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1),
                this.once('end', f);
            }
            function f() {
              this.allowHalfOpen || this._writableState.ended || i(d, this);
            }
            function d(t) {
              t.end();
            }
          },
          {
            './_stream_readable': 46,
            './_stream_writable': 48,
            'core-util-is': 6,
            inherits: 38,
            'process-nextick-args': 41
          }
        ],
        45: [
          function(t, e, n) {
            'use strict';
            e.exports = o;
            var r = t('./_stream_transform'),
              i = t('core-util-is');
            function o(t) {
              if (!(this instanceof o)) return new o(t);
              r.call(this, t);
            }
            (i.inherits = t('inherits')),
              i.inherits(o, r),
              (o.prototype._transform = function(t, e, n) {
                n(null, t);
              });
          },
          { './_stream_transform': 47, 'core-util-is': 6, inherits: 38 }
        ],
        46: [
          function(t, e, n) {
            (function(n) {
              'use strict';
              e.exports = m;
              var r,
                i = t('process-nextick-args'),
                o = t('isarray');
              m.ReadableState = g;
              t('events').EventEmitter;
              var s,
                a = function(t, e) {
                  return t.listeners(e).length;
                };
              !(function() {
                try {
                  s = t('stream');
                } catch (t) {
                } finally {
                  s || (s = t('events').EventEmitter);
                }
              })();
              var l = t('buffer').Buffer,
                u = t('buffer-shims'),
                c = t('core-util-is');
              c.inherits = t('inherits');
              var h = t('util'),
                f = void 0;
              f = h && h.debuglog ? h.debuglog('stream') : function() {};
              var d,
                p = t('./internal/streams/BufferList');
              function g(e, n) {
                (r = r || t('./_stream_duplex')),
                  (e = e || {}),
                  (this.objectMode = !!e.objectMode),
                  n instanceof r &&
                    (this.objectMode =
                      this.objectMode || !!e.readableObjectMode);
                var i = e.highWaterMark,
                  o = this.objectMode ? 16 : 16384;
                (this.highWaterMark = i || 0 === i ? i : o),
                  (this.highWaterMark = ~~this.highWaterMark),
                  (this.buffer = new p()),
                  (this.length = 0),
                  (this.pipes = null),
                  (this.pipesCount = 0),
                  (this.flowing = null),
                  (this.ended = !1),
                  (this.endEmitted = !1),
                  (this.reading = !1),
                  (this.sync = !0),
                  (this.needReadable = !1),
                  (this.emittedReadable = !1),
                  (this.readableListening = !1),
                  (this.resumeScheduled = !1),
                  (this.defaultEncoding = e.defaultEncoding || 'utf8'),
                  (this.ranOut = !1),
                  (this.awaitDrain = 0),
                  (this.readingMore = !1),
                  (this.decoder = null),
                  (this.encoding = null),
                  e.encoding &&
                    (d || (d = t('string_decoder/').StringDecoder),
                    (this.decoder = new d(e.encoding)),
                    (this.encoding = e.encoding));
              }
              function m(e) {
                if (((r = r || t('./_stream_duplex')), !(this instanceof m)))
                  return new m(e);
                (this._readableState = new g(e, this)),
                  (this.readable = !0),
                  e && 'function' == typeof e.read && (this._read = e.read),
                  s.call(this);
              }
              function v(t, e, n, r, o) {
                var s = (function(t, e) {
                  var n = null;
                  l.isBuffer(e) ||
                    'string' == typeof e ||
                    null === e ||
                    void 0 === e ||
                    t.objectMode ||
                    (n = new TypeError('Invalid non-string/buffer chunk'));
                  return n;
                })(e, n);
                if (s) t.emit('error', s);
                else if (null === n)
                  (e.reading = !1),
                    (function(t, e) {
                      if (e.ended) return;
                      if (e.decoder) {
                        var n = e.decoder.end();
                        n &&
                          n.length &&
                          (e.buffer.push(n),
                          (e.length += e.objectMode ? 1 : n.length));
                      }
                      (e.ended = !0), b(t);
                    })(t, e);
                else if (e.objectMode || (n && n.length > 0))
                  if (e.ended && !o) {
                    var a = new Error('stream.push() after EOF');
                    t.emit('error', a);
                  } else if (e.endEmitted && o) {
                    var u = new Error('stream.unshift() after end event');
                    t.emit('error', u);
                  } else {
                    var c;
                    !e.decoder ||
                      o ||
                      r ||
                      ((n = e.decoder.write(n)),
                      (c = !e.objectMode && 0 === n.length)),
                      o || (e.reading = !1),
                      c ||
                        (e.flowing && 0 === e.length && !e.sync
                          ? (t.emit('data', n), t.read(0))
                          : ((e.length += e.objectMode ? 1 : n.length),
                            o ? e.buffer.unshift(n) : e.buffer.push(n),
                            e.needReadable && b(t))),
                      (function(t, e) {
                        e.readingMore || ((e.readingMore = !0), i(x, t, e));
                      })(t, e);
                  }
                else o || (e.reading = !1);
                return (function(t) {
                  return (
                    !t.ended &&
                    (t.needReadable ||
                      t.length < t.highWaterMark ||
                      0 === t.length)
                  );
                })(e);
              }
              c.inherits(m, s),
                (m.prototype.push = function(t, e) {
                  var n = this._readableState;
                  return (
                    n.objectMode ||
                      'string' != typeof t ||
                      ((e = e || n.defaultEncoding) !== n.encoding &&
                        ((t = u.from(t, e)), (e = ''))),
                    v(this, n, t, e, !1)
                  );
                }),
                (m.prototype.unshift = function(t) {
                  return v(this, this._readableState, t, '', !0);
                }),
                (m.prototype.isPaused = function() {
                  return !1 === this._readableState.flowing;
                }),
                (m.prototype.setEncoding = function(e) {
                  return (
                    d || (d = t('string_decoder/').StringDecoder),
                    (this._readableState.decoder = new d(e)),
                    (this._readableState.encoding = e),
                    this
                  );
                });
              var y = 8388608;
              function _(t, e) {
                return t <= 0 || (0 === e.length && e.ended)
                  ? 0
                  : e.objectMode
                  ? 1
                  : t != t
                  ? e.flowing && e.length
                    ? e.buffer.head.data.length
                    : e.length
                  : (t > e.highWaterMark &&
                      (e.highWaterMark = (function(t) {
                        return (
                          t >= y
                            ? (t = y)
                            : (t--,
                              (t |= t >>> 1),
                              (t |= t >>> 2),
                              (t |= t >>> 4),
                              (t |= t >>> 8),
                              (t |= t >>> 16),
                              t++),
                          t
                        );
                      })(t)),
                    t <= e.length
                      ? t
                      : e.ended
                      ? e.length
                      : ((e.needReadable = !0), 0));
              }
              function b(t) {
                var e = t._readableState;
                (e.needReadable = !1),
                  e.emittedReadable ||
                    (f('emitReadable', e.flowing),
                    (e.emittedReadable = !0),
                    e.sync ? i(w, t) : w(t));
              }
              function w(t) {
                f('emit readable'), t.emit('readable'), S(t);
              }
              function x(t, e) {
                for (
                  var n = e.length;
                  !e.reading &&
                  !e.flowing &&
                  !e.ended &&
                  e.length < e.highWaterMark &&
                  (f('maybeReadMore read 0'), t.read(0), n !== e.length);

                )
                  n = e.length;
                e.readingMore = !1;
              }
              function E(t) {
                f('readable nexttick read 0'), t.read(0);
              }
              function T(t, e) {
                e.reading || (f('resume read 0'), t.read(0)),
                  (e.resumeScheduled = !1),
                  (e.awaitDrain = 0),
                  t.emit('resume'),
                  S(t),
                  e.flowing && !e.reading && t.read(0);
              }
              function S(t) {
                var e = t._readableState;
                for (f('flow', e.flowing); e.flowing && null !== t.read(); );
              }
              function C(t, e) {
                return 0 === e.length
                  ? null
                  : (e.objectMode
                      ? (n = e.buffer.shift())
                      : !t || t >= e.length
                      ? ((n = e.decoder
                          ? e.buffer.join('')
                          : 1 === e.buffer.length
                          ? e.buffer.head.data
                          : e.buffer.concat(e.length)),
                        e.buffer.clear())
                      : (n = (function(t, e, n) {
                          var r;
                          t < e.head.data.length
                            ? ((r = e.head.data.slice(0, t)),
                              (e.head.data = e.head.data.slice(t)))
                            : (r =
                                t === e.head.data.length
                                  ? e.shift()
                                  : n
                                  ? (function(t, e) {
                                      var n = e.head,
                                        r = 1,
                                        i = n.data;
                                      t -= i.length;
                                      for (; (n = n.next); ) {
                                        var o = n.data,
                                          s = t > o.length ? o.length : t;
                                        if (
                                          (s === o.length
                                            ? (i += o)
                                            : (i += o.slice(0, t)),
                                          0 === (t -= s))
                                        ) {
                                          s === o.length
                                            ? (++r,
                                              n.next
                                                ? (e.head = n.next)
                                                : (e.head = e.tail = null))
                                            : ((e.head = n),
                                              (n.data = o.slice(s)));
                                          break;
                                        }
                                        ++r;
                                      }
                                      return (e.length -= r), i;
                                    })(t, e)
                                  : (function(t, e) {
                                      var n = u.allocUnsafe(t),
                                        r = e.head,
                                        i = 1;
                                      r.data.copy(n), (t -= r.data.length);
                                      for (; (r = r.next); ) {
                                        var o = r.data,
                                          s = t > o.length ? o.length : t;
                                        if (
                                          (o.copy(n, n.length - t, 0, s),
                                          0 === (t -= s))
                                        ) {
                                          s === o.length
                                            ? (++i,
                                              r.next
                                                ? (e.head = r.next)
                                                : (e.head = e.tail = null))
                                            : ((e.head = r),
                                              (r.data = o.slice(s)));
                                          break;
                                        }
                                        ++i;
                                      }
                                      return (e.length -= i), n;
                                    })(t, e));
                          return r;
                        })(t, e.buffer, e.decoder)),
                    n);
                var n;
              }
              function k(t) {
                var e = t._readableState;
                if (e.length > 0)
                  throw new Error('"endReadable()" called on non-empty stream');
                e.endEmitted || ((e.ended = !0), i(A, e, t));
              }
              function A(t, e) {
                t.endEmitted ||
                  0 !== t.length ||
                  ((t.endEmitted = !0), (e.readable = !1), e.emit('end'));
              }
              function D(t, e) {
                for (var n = 0, r = t.length; n < r; n++)
                  if (t[n] === e) return n;
                return -1;
              }
              (m.prototype.read = function(t) {
                f('read', t), (t = parseInt(t, 10));
                var e = this._readableState,
                  n = t;
                if (
                  (0 !== t && (e.emittedReadable = !1),
                  0 === t &&
                    e.needReadable &&
                    (e.length >= e.highWaterMark || e.ended))
                )
                  return (
                    f('read: emitReadable', e.length, e.ended),
                    0 === e.length && e.ended ? k(this) : b(this),
                    null
                  );
                if (0 === (t = _(t, e)) && e.ended)
                  return 0 === e.length && k(this), null;
                var r,
                  i = e.needReadable;
                return (
                  f('need readable', i),
                  (0 === e.length || e.length - t < e.highWaterMark) &&
                    f('length less than watermark', (i = !0)),
                  e.ended || e.reading
                    ? f('reading or ended', (i = !1))
                    : i &&
                      (f('do read'),
                      (e.reading = !0),
                      (e.sync = !0),
                      0 === e.length && (e.needReadable = !0),
                      this._read(e.highWaterMark),
                      (e.sync = !1),
                      e.reading || (t = _(n, e))),
                  null === (r = t > 0 ? C(t, e) : null)
                    ? ((e.needReadable = !0), (t = 0))
                    : (e.length -= t),
                  0 === e.length &&
                    (e.ended || (e.needReadable = !0),
                    n !== t && e.ended && k(this)),
                  null !== r && this.emit('data', r),
                  r
                );
              }),
                (m.prototype._read = function(t) {
                  this.emit('error', new Error('_read() is not implemented'));
                }),
                (m.prototype.pipe = function(t, e) {
                  var r = this,
                    s = this._readableState;
                  switch (s.pipesCount) {
                    case 0:
                      s.pipes = t;
                      break;
                    case 1:
                      s.pipes = [s.pipes, t];
                      break;
                    default:
                      s.pipes.push(t);
                  }
                  (s.pipesCount += 1),
                    f('pipe count=%d opts=%j', s.pipesCount, e);
                  var l =
                    (!e || !1 !== e.end) && t !== n.stdout && t !== n.stderr
                      ? c
                      : p;
                  function u(t) {
                    f('onunpipe'), t === r && p();
                  }
                  function c() {
                    f('onend'), t.end();
                  }
                  s.endEmitted ? i(l) : r.once('end', l), t.on('unpipe', u);
                  var h = (function(t) {
                    return function() {
                      var e = t._readableState;
                      f('pipeOnDrain', e.awaitDrain),
                        e.awaitDrain && e.awaitDrain--,
                        0 === e.awaitDrain &&
                          a(t, 'data') &&
                          ((e.flowing = !0), S(t));
                    };
                  })(r);
                  t.on('drain', h);
                  var d = !1;
                  function p() {
                    f('cleanup'),
                      t.removeListener('close', y),
                      t.removeListener('finish', _),
                      t.removeListener('drain', h),
                      t.removeListener('error', v),
                      t.removeListener('unpipe', u),
                      r.removeListener('end', c),
                      r.removeListener('end', p),
                      r.removeListener('data', m),
                      (d = !0),
                      !s.awaitDrain ||
                        (t._writableState && !t._writableState.needDrain) ||
                        h();
                  }
                  var g = !1;
                  function m(e) {
                    f('ondata'),
                      (g = !1),
                      !1 !== t.write(e) ||
                        g ||
                        (((1 === s.pipesCount && s.pipes === t) ||
                          (s.pipesCount > 1 && -1 !== D(s.pipes, t))) &&
                          !d &&
                          (f(
                            'false write response, pause',
                            r._readableState.awaitDrain
                          ),
                          r._readableState.awaitDrain++,
                          (g = !0)),
                        r.pause());
                  }
                  function v(e) {
                    f('onerror', e),
                      b(),
                      t.removeListener('error', v),
                      0 === a(t, 'error') && t.emit('error', e);
                  }
                  function y() {
                    t.removeListener('finish', _), b();
                  }
                  function _() {
                    f('onfinish'), t.removeListener('close', y), b();
                  }
                  function b() {
                    f('unpipe'), r.unpipe(t);
                  }
                  return (
                    r.on('data', m),
                    (function(t, e, n) {
                      if ('function' == typeof t.prependListener)
                        return t.prependListener(e, n);
                      t._events && t._events[e]
                        ? o(t._events[e])
                          ? t._events[e].unshift(n)
                          : (t._events[e] = [n, t._events[e]])
                        : t.on(e, n);
                    })(t, 'error', v),
                    t.once('close', y),
                    t.once('finish', _),
                    t.emit('pipe', r),
                    s.flowing || (f('pipe resume'), r.resume()),
                    t
                  );
                }),
                (m.prototype.unpipe = function(t) {
                  var e = this._readableState;
                  if (0 === e.pipesCount) return this;
                  if (1 === e.pipesCount)
                    return t && t !== e.pipes
                      ? this
                      : (t || (t = e.pipes),
                        (e.pipes = null),
                        (e.pipesCount = 0),
                        (e.flowing = !1),
                        t && t.emit('unpipe', this),
                        this);
                  if (!t) {
                    var n = e.pipes,
                      r = e.pipesCount;
                    (e.pipes = null), (e.pipesCount = 0), (e.flowing = !1);
                    for (var i = 0; i < r; i++) n[i].emit('unpipe', this);
                    return this;
                  }
                  var o = D(e.pipes, t);
                  return -1 === o
                    ? this
                    : (e.pipes.splice(o, 1),
                      (e.pipesCount -= 1),
                      1 === e.pipesCount && (e.pipes = e.pipes[0]),
                      t.emit('unpipe', this),
                      this);
                }),
                (m.prototype.on = function(t, e) {
                  var n = s.prototype.on.call(this, t, e);
                  if ('data' === t)
                    !1 !== this._readableState.flowing && this.resume();
                  else if ('readable' === t) {
                    var r = this._readableState;
                    r.endEmitted ||
                      r.readableListening ||
                      ((r.readableListening = r.needReadable = !0),
                      (r.emittedReadable = !1),
                      r.reading ? r.length && b(this) : i(E, this));
                  }
                  return n;
                }),
                (m.prototype.addListener = m.prototype.on),
                (m.prototype.resume = function() {
                  var t = this._readableState;
                  return (
                    t.flowing ||
                      (f('resume'),
                      (t.flowing = !0),
                      (function(t, e) {
                        e.resumeScheduled ||
                          ((e.resumeScheduled = !0), i(T, t, e));
                      })(this, t)),
                    this
                  );
                }),
                (m.prototype.pause = function() {
                  return (
                    f('call pause flowing=%j', this._readableState.flowing),
                    !1 !== this._readableState.flowing &&
                      (f('pause'),
                      (this._readableState.flowing = !1),
                      this.emit('pause')),
                    this
                  );
                }),
                (m.prototype.wrap = function(t) {
                  var e = this._readableState,
                    n = !1,
                    r = this;
                  for (var i in (t.on('end', function() {
                    if ((f('wrapped end'), e.decoder && !e.ended)) {
                      var t = e.decoder.end();
                      t && t.length && r.push(t);
                    }
                    r.push(null);
                  }),
                  t.on('data', function(i) {
                    (f('wrapped data'),
                    e.decoder && (i = e.decoder.write(i)),
                    !e.objectMode || (null !== i && void 0 !== i)) &&
                      ((e.objectMode || (i && i.length)) &&
                        (r.push(i) || ((n = !0), t.pause())));
                  }),
                  t))
                    void 0 === this[i] &&
                      'function' == typeof t[i] &&
                      (this[i] = (function(e) {
                        return function() {
                          return t[e].apply(t, arguments);
                        };
                      })(i));
                  return (
                    (function(t, e) {
                      for (var n = 0, r = t.length; n < r; n++) e(t[n], n);
                    })(
                      ['error', 'close', 'destroy', 'pause', 'resume'],
                      function(e) {
                        t.on(e, r.emit.bind(r, e));
                      }
                    ),
                    (r._read = function(e) {
                      f('wrapped _read', e), n && ((n = !1), t.resume());
                    }),
                    r
                  );
                }),
                (m._fromList = C);
            }.call(this, t('_process')));
          },
          {
            './_stream_duplex': 44,
            './internal/streams/BufferList': 49,
            _process: 42,
            buffer: 5,
            'buffer-shims': 4,
            'core-util-is': 6,
            events: 28,
            inherits: 38,
            isarray: 40,
            'process-nextick-args': 41,
            'string_decoder/': 55,
            util: 3
          }
        ],
        47: [
          function(t, e, n) {
            'use strict';
            e.exports = s;
            var r = t('./_stream_duplex'),
              i = t('core-util-is');
            function o(t) {
              (this.afterTransform = function(e, n) {
                return (function(t, e, n) {
                  var r = t._transformState;
                  r.transforming = !1;
                  var i = r.writecb;
                  if (!i)
                    return t.emit(
                      'error',
                      new Error('no writecb in Transform class')
                    );
                  (r.writechunk = null),
                    (r.writecb = null),
                    null !== n && void 0 !== n && t.push(n);
                  i(e);
                  var o = t._readableState;
                  (o.reading = !1),
                    (o.needReadable || o.length < o.highWaterMark) &&
                      t._read(o.highWaterMark);
                })(t, e, n);
              }),
                (this.needTransform = !1),
                (this.transforming = !1),
                (this.writecb = null),
                (this.writechunk = null),
                (this.writeencoding = null);
            }
            function s(t) {
              if (!(this instanceof s)) return new s(t);
              r.call(this, t), (this._transformState = new o(this));
              var e = this;
              (this._readableState.needReadable = !0),
                (this._readableState.sync = !1),
                t &&
                  ('function' == typeof t.transform &&
                    (this._transform = t.transform),
                  'function' == typeof t.flush && (this._flush = t.flush)),
                this.once('prefinish', function() {
                  'function' == typeof this._flush
                    ? this._flush(function(t, n) {
                        a(e, t, n);
                      })
                    : a(e);
                });
            }
            function a(t, e, n) {
              if (e) return t.emit('error', e);
              null !== n && void 0 !== n && t.push(n);
              var r = t._writableState,
                i = t._transformState;
              if (r.length)
                throw new Error('Calling transform done when ws.length != 0');
              if (i.transforming)
                throw new Error(
                  'Calling transform done when still transforming'
                );
              return t.push(null);
            }
            (i.inherits = t('inherits')),
              i.inherits(s, r),
              (s.prototype.push = function(t, e) {
                return (
                  (this._transformState.needTransform = !1),
                  r.prototype.push.call(this, t, e)
                );
              }),
              (s.prototype._transform = function(t, e, n) {
                throw new Error('_transform() is not implemented');
              }),
              (s.prototype._write = function(t, e, n) {
                var r = this._transformState;
                if (
                  ((r.writecb = n),
                  (r.writechunk = t),
                  (r.writeencoding = e),
                  !r.transforming)
                ) {
                  var i = this._readableState;
                  (r.needTransform ||
                    i.needReadable ||
                    i.length < i.highWaterMark) &&
                    this._read(i.highWaterMark);
                }
              }),
              (s.prototype._read = function(t) {
                var e = this._transformState;
                null !== e.writechunk && e.writecb && !e.transforming
                  ? ((e.transforming = !0),
                    this._transform(
                      e.writechunk,
                      e.writeencoding,
                      e.afterTransform
                    ))
                  : (e.needTransform = !0);
              });
          },
          { './_stream_duplex': 44, 'core-util-is': 6, inherits: 38 }
        ],
        48: [
          function(t, e, n) {
            (function(n) {
              'use strict';
              e.exports = p;
              var r,
                i = t('process-nextick-args'),
                o =
                  !n.browser &&
                  ['v0.10', 'v0.9.'].indexOf(n.version.slice(0, 5)) > -1
                    ? setImmediate
                    : i;
              p.WritableState = d;
              var s = t('core-util-is');
              s.inherits = t('inherits');
              var a,
                l = { deprecate: t('util-deprecate') };
              !(function() {
                try {
                  a = t('stream');
                } catch (t) {
                } finally {
                  a || (a = t('events').EventEmitter);
                }
              })();
              var u,
                c = t('buffer').Buffer,
                h = t('buffer-shims');
              function f() {}
              function d(e, n) {
                (r = r || t('./_stream_duplex')),
                  (e = e || {}),
                  (this.objectMode = !!e.objectMode),
                  n instanceof r &&
                    (this.objectMode =
                      this.objectMode || !!e.writableObjectMode);
                var s = e.highWaterMark,
                  a = this.objectMode ? 16 : 16384;
                (this.highWaterMark = s || 0 === s ? s : a),
                  (this.highWaterMark = ~~this.highWaterMark),
                  (this.needDrain = !1),
                  (this.ending = !1),
                  (this.ended = !1),
                  (this.finished = !1);
                var l = !1 === e.decodeStrings;
                (this.decodeStrings = !l),
                  (this.defaultEncoding = e.defaultEncoding || 'utf8'),
                  (this.length = 0),
                  (this.writing = !1),
                  (this.corked = 0),
                  (this.sync = !0),
                  (this.bufferProcessing = !1),
                  (this.onwrite = function(t) {
                    !(function(t, e) {
                      var n = t._writableState,
                        r = n.sync,
                        s = n.writecb;
                      if (
                        ((function(t) {
                          (t.writing = !1),
                            (t.writecb = null),
                            (t.length -= t.writelen),
                            (t.writelen = 0);
                        })(n),
                        e)
                      )
                        !(function(t, e, n, r, o) {
                          --e.pendingcb, n ? i(o, r) : o(r);
                          (t._writableState.errorEmitted = !0),
                            t.emit('error', r);
                        })(t, n, r, e, s);
                      else {
                        var a = y(n);
                        a ||
                          n.corked ||
                          n.bufferProcessing ||
                          !n.bufferedRequest ||
                          v(t, n),
                          r ? o(m, t, n, a, s) : m(t, n, a, s);
                      }
                    })(n, t);
                  }),
                  (this.writecb = null),
                  (this.writelen = 0),
                  (this.bufferedRequest = null),
                  (this.lastBufferedRequest = null),
                  (this.pendingcb = 0),
                  (this.prefinished = !1),
                  (this.errorEmitted = !1),
                  (this.bufferedRequestCount = 0),
                  (this.corkedRequestsFree = new w(this));
              }
              function p(e) {
                if (
                  ((r = r || t('./_stream_duplex')),
                  !(u.call(p, this) || this instanceof r))
                )
                  return new p(e);
                (this._writableState = new d(e, this)),
                  (this.writable = !0),
                  e &&
                    ('function' == typeof e.write && (this._write = e.write),
                    'function' == typeof e.writev && (this._writev = e.writev)),
                  a.call(this);
              }
              function g(t, e, n, r, i, o, s) {
                (e.writelen = r),
                  (e.writecb = s),
                  (e.writing = !0),
                  (e.sync = !0),
                  n ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite),
                  (e.sync = !1);
              }
              function m(t, e, n, r) {
                n ||
                  (function(t, e) {
                    0 === e.length &&
                      e.needDrain &&
                      ((e.needDrain = !1), t.emit('drain'));
                  })(t, e),
                  e.pendingcb--,
                  r(),
                  b(t, e);
              }
              function v(t, e) {
                e.bufferProcessing = !0;
                var n = e.bufferedRequest;
                if (t._writev && n && n.next) {
                  var r = e.bufferedRequestCount,
                    i = new Array(r),
                    o = e.corkedRequestsFree;
                  o.entry = n;
                  for (var s = 0; n; ) (i[s] = n), (n = n.next), (s += 1);
                  g(t, e, !0, e.length, i, '', o.finish),
                    e.pendingcb++,
                    (e.lastBufferedRequest = null),
                    o.next
                      ? ((e.corkedRequestsFree = o.next), (o.next = null))
                      : (e.corkedRequestsFree = new w(e));
                } else {
                  for (; n; ) {
                    var a = n.chunk,
                      l = n.encoding,
                      u = n.callback;
                    if (
                      (g(t, e, !1, e.objectMode ? 1 : a.length, a, l, u),
                      (n = n.next),
                      e.writing)
                    )
                      break;
                  }
                  null === n && (e.lastBufferedRequest = null);
                }
                (e.bufferedRequestCount = 0),
                  (e.bufferedRequest = n),
                  (e.bufferProcessing = !1);
              }
              function y(t) {
                return (
                  t.ending &&
                  0 === t.length &&
                  null === t.bufferedRequest &&
                  !t.finished &&
                  !t.writing
                );
              }
              function _(t, e) {
                e.prefinished || ((e.prefinished = !0), t.emit('prefinish'));
              }
              function b(t, e) {
                var n = y(e);
                return (
                  n &&
                    (0 === e.pendingcb
                      ? (_(t, e), (e.finished = !0), t.emit('finish'))
                      : _(t, e)),
                  n
                );
              }
              function w(t) {
                var e = this;
                (this.next = null),
                  (this.entry = null),
                  (this.finish = function(n) {
                    var r = e.entry;
                    for (e.entry = null; r; ) {
                      var i = r.callback;
                      t.pendingcb--, i(n), (r = r.next);
                    }
                    t.corkedRequestsFree
                      ? (t.corkedRequestsFree.next = e)
                      : (t.corkedRequestsFree = e);
                  });
              }
              s.inherits(p, a),
                (d.prototype.getBuffer = function() {
                  for (var t = this.bufferedRequest, e = []; t; )
                    e.push(t), (t = t.next);
                  return e;
                }),
                (function() {
                  try {
                    Object.defineProperty(d.prototype, 'buffer', {
                      get: l.deprecate(function() {
                        return this.getBuffer();
                      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.')
                    });
                  } catch (t) {}
                })(),
                'function' == typeof Symbol &&
                Symbol.hasInstance &&
                'function' == typeof Function.prototype[Symbol.hasInstance]
                  ? ((u = Function.prototype[Symbol.hasInstance]),
                    Object.defineProperty(p, Symbol.hasInstance, {
                      value: function(t) {
                        return (
                          !!u.call(this, t) ||
                          (t && t._writableState instanceof d)
                        );
                      }
                    }))
                  : (u = function(t) {
                      return t instanceof this;
                    }),
                (p.prototype.pipe = function() {
                  this.emit('error', new Error('Cannot pipe, not readable'));
                }),
                (p.prototype.write = function(t, e, n) {
                  var r = this._writableState,
                    o = !1;
                  return (
                    'function' == typeof e && ((n = e), (e = null)),
                    c.isBuffer(t)
                      ? (e = 'buffer')
                      : e || (e = r.defaultEncoding),
                    'function' != typeof n && (n = f),
                    r.ended
                      ? (function(t, e) {
                          var n = new Error('write after end');
                          t.emit('error', n), i(e, n);
                        })(this, n)
                      : (function(t, e, n, r) {
                          var o = !0,
                            s = !1;
                          return (
                            null === n
                              ? (s = new TypeError(
                                  'May not write null values to stream'
                                ))
                              : c.isBuffer(n) ||
                                'string' == typeof n ||
                                void 0 === n ||
                                e.objectMode ||
                                (s = new TypeError(
                                  'Invalid non-string/buffer chunk'
                                )),
                            s && (t.emit('error', s), i(r, s), (o = !1)),
                            o
                          );
                        })(this, r, t, n) &&
                        (r.pendingcb++,
                        (o = (function(t, e, n, r, i) {
                          (n = (function(t, e, n) {
                            return (
                              t.objectMode ||
                                !1 === t.decodeStrings ||
                                'string' != typeof e ||
                                (e = h.from(e, n)),
                              e
                            );
                          })(e, n, r)),
                            c.isBuffer(n) && (r = 'buffer');
                          var o = e.objectMode ? 1 : n.length;
                          e.length += o;
                          var s = e.length < e.highWaterMark;
                          s || (e.needDrain = !0);
                          if (e.writing || e.corked) {
                            var a = e.lastBufferedRequest;
                            (e.lastBufferedRequest = new (function(t, e, n) {
                              (this.chunk = t),
                                (this.encoding = e),
                                (this.callback = n),
                                (this.next = null);
                            })(n, r, i)),
                              a
                                ? (a.next = e.lastBufferedRequest)
                                : (e.bufferedRequest = e.lastBufferedRequest),
                              (e.bufferedRequestCount += 1);
                          } else g(t, e, !1, o, n, r, i);
                          return s;
                        })(this, r, t, e, n))),
                    o
                  );
                }),
                (p.prototype.cork = function() {
                  this._writableState.corked++;
                }),
                (p.prototype.uncork = function() {
                  var t = this._writableState;
                  t.corked &&
                    (t.corked--,
                    t.writing ||
                      t.corked ||
                      t.finished ||
                      t.bufferProcessing ||
                      !t.bufferedRequest ||
                      v(this, t));
                }),
                (p.prototype.setDefaultEncoding = function(t) {
                  if (
                    ('string' == typeof t && (t = t.toLowerCase()),
                    !(
                      [
                        'hex',
                        'utf8',
                        'utf-8',
                        'ascii',
                        'binary',
                        'base64',
                        'ucs2',
                        'ucs-2',
                        'utf16le',
                        'utf-16le',
                        'raw'
                      ].indexOf((t + '').toLowerCase()) > -1
                    ))
                  )
                    throw new TypeError('Unknown encoding: ' + t);
                  return (this._writableState.defaultEncoding = t), this;
                }),
                (p.prototype._write = function(t, e, n) {
                  n(new Error('_write() is not implemented'));
                }),
                (p.prototype._writev = null),
                (p.prototype.end = function(t, e, n) {
                  var r = this._writableState;
                  'function' == typeof t
                    ? ((n = t), (t = null), (e = null))
                    : 'function' == typeof e && ((n = e), (e = null)),
                    null !== t && void 0 !== t && this.write(t, e),
                    r.corked && ((r.corked = 1), this.uncork()),
                    r.ending ||
                      r.finished ||
                      (function(t, e, n) {
                        (e.ending = !0),
                          b(t, e),
                          n && (e.finished ? i(n) : t.once('finish', n));
                        (e.ended = !0), (t.writable = !1);
                      })(this, r, n);
                });
            }.call(this, t('_process')));
          },
          {
            './_stream_duplex': 44,
            _process: 42,
            buffer: 5,
            'buffer-shims': 4,
            'core-util-is': 6,
            events: 28,
            inherits: 38,
            'process-nextick-args': 41,
            'util-deprecate': 56
          }
        ],
        49: [
          function(t, e, n) {
            'use strict';
            t('buffer').Buffer;
            var r = t('buffer-shims');
            function i() {
              (this.head = null), (this.tail = null), (this.length = 0);
            }
            (e.exports = i),
              (i.prototype.push = function(t) {
                var e = { data: t, next: null };
                this.length > 0 ? (this.tail.next = e) : (this.head = e),
                  (this.tail = e),
                  ++this.length;
              }),
              (i.prototype.unshift = function(t) {
                var e = { data: t, next: this.head };
                0 === this.length && (this.tail = e),
                  (this.head = e),
                  ++this.length;
              }),
              (i.prototype.shift = function() {
                if (0 !== this.length) {
                  var t = this.head.data;
                  return (
                    1 === this.length
                      ? (this.head = this.tail = null)
                      : (this.head = this.head.next),
                    --this.length,
                    t
                  );
                }
              }),
              (i.prototype.clear = function() {
                (this.head = this.tail = null), (this.length = 0);
              }),
              (i.prototype.join = function(t) {
                if (0 === this.length) return '';
                for (var e = this.head, n = '' + e.data; (e = e.next); )
                  n += t + e.data;
                return n;
              }),
              (i.prototype.concat = function(t) {
                if (0 === this.length) return r.alloc(0);
                if (1 === this.length) return this.head.data;
                for (var e = r.allocUnsafe(t >>> 0), n = this.head, i = 0; n; )
                  n.data.copy(e, i), (i += n.data.length), (n = n.next);
                return e;
              });
          },
          { buffer: 5, 'buffer-shims': 4 }
        ],
        50: [
          function(t, e, n) {
            e.exports = t('./lib/_stream_passthrough.js');
          },
          { './lib/_stream_passthrough.js': 45 }
        ],
        51: [
          function(t, e, n) {
            (function(r) {
              var i = (function() {
                try {
                  return t('stream');
                } catch (t) {}
              })();
              ((n = e.exports = t('./lib/_stream_readable.js')).Stream =
                i || n),
                (n.Readable = n),
                (n.Writable = t('./lib/_stream_writable.js')),
                (n.Duplex = t('./lib/_stream_duplex.js')),
                (n.Transform = t('./lib/_stream_transform.js')),
                (n.PassThrough = t('./lib/_stream_passthrough.js')),
                !r.browser &&
                  'disable' === r.env.READABLE_STREAM &&
                  i &&
                  (e.exports = i);
            }.call(this, t('_process')));
          },
          {
            './lib/_stream_duplex.js': 44,
            './lib/_stream_passthrough.js': 45,
            './lib/_stream_readable.js': 46,
            './lib/_stream_transform.js': 47,
            './lib/_stream_writable.js': 48,
            _process: 42
          }
        ],
        52: [
          function(t, e, n) {
            e.exports = t('./lib/_stream_transform.js');
          },
          { './lib/_stream_transform.js': 47 }
        ],
        53: [
          function(t, e, n) {
            e.exports = t('./lib/_stream_writable.js');
          },
          { './lib/_stream_writable.js': 48 }
        ],
        54: [
          function(t, e, n) {
            e.exports = i;
            var r = t('events').EventEmitter;
            function i() {
              r.call(this);
            }
            t('inherits')(i, r),
              (i.Readable = t('readable-stream/readable.js')),
              (i.Writable = t('readable-stream/writable.js')),
              (i.Duplex = t('readable-stream/duplex.js')),
              (i.Transform = t('readable-stream/transform.js')),
              (i.PassThrough = t('readable-stream/passthrough.js')),
              (i.Stream = i),
              (i.prototype.pipe = function(t, e) {
                var n = this;
                function i(e) {
                  t.writable && !1 === t.write(e) && n.pause && n.pause();
                }
                function o() {
                  n.readable && n.resume && n.resume();
                }
                n.on('data', i),
                  t.on('drain', o),
                  t._isStdio ||
                    (e && !1 === e.end) ||
                    (n.on('end', a), n.on('close', l));
                var s = !1;
                function a() {
                  s || ((s = !0), t.end());
                }
                function l() {
                  s ||
                    ((s = !0), 'function' == typeof t.destroy && t.destroy());
                }
                function u(t) {
                  if ((c(), 0 === r.listenerCount(this, 'error'))) throw t;
                }
                function c() {
                  n.removeListener('data', i),
                    t.removeListener('drain', o),
                    n.removeListener('end', a),
                    n.removeListener('close', l),
                    n.removeListener('error', u),
                    t.removeListener('error', u),
                    n.removeListener('end', c),
                    n.removeListener('close', c),
                    t.removeListener('close', c);
                }
                return (
                  n.on('error', u),
                  t.on('error', u),
                  n.on('end', c),
                  n.on('close', c),
                  t.on('close', c),
                  t.emit('pipe', n),
                  t
                );
              });
          },
          {
            events: 28,
            inherits: 38,
            'readable-stream/duplex.js': 43,
            'readable-stream/passthrough.js': 50,
            'readable-stream/readable.js': 51,
            'readable-stream/transform.js': 52,
            'readable-stream/writable.js': 53
          }
        ],
        55: [
          function(t, e, n) {
            var r = t('buffer').Buffer,
              i =
                r.isEncoding ||
                function(t) {
                  switch (t && t.toLowerCase()) {
                    case 'hex':
                    case 'utf8':
                    case 'utf-8':
                    case 'ascii':
                    case 'binary':
                    case 'base64':
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                    case 'raw':
                      return !0;
                    default:
                      return !1;
                  }
                };
            var o = (n.StringDecoder = function(t) {
              switch (
                ((this.encoding = (t || 'utf8')
                  .toLowerCase()
                  .replace(/[-_]/, '')),
                (function(t) {
                  if (t && !i(t)) throw new Error('Unknown encoding: ' + t);
                })(t),
                this.encoding)
              ) {
                case 'utf8':
                  this.surrogateSize = 3;
                  break;
                case 'ucs2':
                case 'utf16le':
                  (this.surrogateSize = 2), (this.detectIncompleteChar = a);
                  break;
                case 'base64':
                  (this.surrogateSize = 3), (this.detectIncompleteChar = l);
                  break;
                default:
                  return void (this.write = s);
              }
              (this.charBuffer = new r(6)),
                (this.charReceived = 0),
                (this.charLength = 0);
            });
            function s(t) {
              return t.toString(this.encoding);
            }
            function a(t) {
              (this.charReceived = t.length % 2),
                (this.charLength = this.charReceived ? 2 : 0);
            }
            function l(t) {
              (this.charReceived = t.length % 3),
                (this.charLength = this.charReceived ? 3 : 0);
            }
            (o.prototype.write = function(t) {
              for (var e = ''; this.charLength; ) {
                var n =
                  t.length >= this.charLength - this.charReceived
                    ? this.charLength - this.charReceived
                    : t.length;
                if (
                  (t.copy(this.charBuffer, this.charReceived, 0, n),
                  (this.charReceived += n),
                  this.charReceived < this.charLength)
                )
                  return '';
                if (
                  ((t = t.slice(n, t.length)),
                  !(
                    (i = (e = this.charBuffer
                      .slice(0, this.charLength)
                      .toString(this.encoding)).charCodeAt(e.length - 1)) >=
                      55296 && i <= 56319
                  ))
                ) {
                  if (
                    ((this.charReceived = this.charLength = 0), 0 === t.length)
                  )
                    return e;
                  break;
                }
                (this.charLength += this.surrogateSize), (e = '');
              }
              this.detectIncompleteChar(t);
              var r = t.length;
              this.charLength &&
                (t.copy(this.charBuffer, 0, t.length - this.charReceived, r),
                (r -= this.charReceived));
              var i;
              r = (e += t.toString(this.encoding, 0, r)).length - 1;
              if ((i = e.charCodeAt(r)) >= 55296 && i <= 56319) {
                var o = this.surrogateSize;
                return (
                  (this.charLength += o),
                  (this.charReceived += o),
                  this.charBuffer.copy(this.charBuffer, o, 0, o),
                  t.copy(this.charBuffer, 0, 0, o),
                  e.substring(0, r)
                );
              }
              return e;
            }),
              (o.prototype.detectIncompleteChar = function(t) {
                for (var e = t.length >= 3 ? 3 : t.length; e > 0; e--) {
                  var n = t[t.length - e];
                  if (1 == e && n >> 5 == 6) {
                    this.charLength = 2;
                    break;
                  }
                  if (e <= 2 && n >> 4 == 14) {
                    this.charLength = 3;
                    break;
                  }
                  if (e <= 3 && n >> 3 == 30) {
                    this.charLength = 4;
                    break;
                  }
                }
                this.charReceived = e;
              }),
              (o.prototype.end = function(t) {
                var e = '';
                if ((t && t.length && (e = this.write(t)), this.charReceived)) {
                  var n = this.charReceived,
                    r = this.charBuffer,
                    i = this.encoding;
                  e += r.slice(0, n).toString(i);
                }
                return e;
              });
          },
          { buffer: 5 }
        ],
        56: [
          function(t, e, n) {
            (function(t) {
              function n(e) {
                try {
                  if (!t.localStorage) return !1;
                } catch (t) {
                  return !1;
                }
                var n = t.localStorage[e];
                return null != n && 'true' === String(n).toLowerCase();
              }
              e.exports = function(t, e) {
                if (n('noDeprecation')) return t;
                var r = !1;
                return function() {
                  if (!r) {
                    if (n('throwDeprecation')) throw new Error(e);
                    n('traceDeprecation') ? console.trace(e) : console.warn(e),
                      (r = !0);
                  }
                  return t.apply(this, arguments);
                };
              };
            }.call(
              this,
              'undefined' != typeof global
                ? global
                : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                ? window
                : {}
            ));
          },
          {}
        ]
      },
      {},
      [1]
    )(1);
  }),
  (function(t) {
    'use strict';
    var e,
      n,
      r = t(document),
      i = t(
        '<div class="rangePicker">         \t\t\t\t<div class="wrap"> \t\t\t\t\t\t\t<div class="preset"></div> \t\t\t\t\t\t\t<div class="custom"> \t\t\t\t\t\t\t\t<div class="calendar from"><strong></strong></div> \t\t\t\t\t\t\t\t<div class="calendar to"></div> \t\t\t\t\t\t\t\t<footer> \t\t\t\t\t\t\t\t\t<button type="button" class="confirm btn btn-primary">Apply</button> \t\t\t\t\t\t\t\t\t<button type="button" class="cancel btn">Cancel</button> \t\t\t\t\t\t\t\t</footer> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t</div> \t\t\t\t\t</div>'
      );
    ((e = function(e, n, r) {
      (this.settings = n),
        (this.picker = i.clone()),
        (this.obj = t(e)),
        (this.callback = 'function' == typeof r ? r : null),
        this.result,
        this.settings.RTL && this.picker.addClass('RTL'),
        this.picker.insertAfter(this.obj);
    }).prototype = {
      init: function() {
        var e;
        this.picker.add(this.obj).on('mousedown', function(t) {
          t.stopPropagation();
        });
        var n,
          r = this.picker.find('.preset'),
          i = '',
          o = '',
          s = this.settings.minDate[1],
          a = this.settings.maxDate[1],
          l = a - s;
        for (n = this.settings.presets.length; n--; )
          r.prepend(
            "<button type='button' value='" +
              this.settings.presets[n].value +
              "'>" +
              this.settings.presets[n].buttonText +
              '</button>'
          );
        for (
          this.presets = r.find('button'),
            this.calendar = {
              from: this.picker.find('.calendar.from'),
              to: this.picker.find('.calendar.to')
            },
            n = l + 1;
          n--;

        )
          i += '<option value="' + (a - n) + '">' + (a - n) + '</option>';
        for (n = 0, e = this.settings.months.length; n < e; n++)
          o += '<button>' + this.settings.months[n] + '</button>';
        this.calendar.from.append(
          t('<select>').html(i),
          t('<div>')
            .addClass('months')
            .html(o)
        ),
          this.calendar.to.append(this.calendar.from.html()),
          (this.yearSelectors = this.picker.find('select')),
          (this.yearSelectors[0].selectedIndex = this.yearSelectors[1].selectedIndex = l),
          this.bind(),
          this.yearSelectors.trigger('change'),
          this.settings.setDate && this.update(this.settings.setDate);
      },
      bind: function() {
        var t = this;
        this.obj.on('click', function() {
          t.show.apply(t);
        }),
          this.picker
            .on('click', '.preset > button', t.presetClick.bind(t))
            .on('click.dp', '.months > button', t.monthClick.bind(t))
            .on('change', 'select', t.changeYear.bind(t))
            .on('click', '.confirm', t.applyDate.bind(t))
            .on('click', '.cancel', t.cancel.bind(t));
      },
      destroy: function() {
        this.picker.remove(), this.obj.removeData('_ranegPicker');
      },
      show: function() {
        var e = this;
        t('.rangePicker.show').removeClass('show'),
          this.picker.hasClass('show')
            ? this.hide()
            : (this.picker.addClass('show'),
              setTimeout(function() {
                r.on('mousedown._rp', function() {
                  e.cancel.apply(e);
                });
              }, 100),
              this.obj.trigger('datePicker.show'));
      },
      hide: function() {
        this.picker.removeClass('show'), r.off('mousedown._rp');
      },
      cancel: function() {
        this.update(n), this.hide();
      },
      monthClick: function(e) {
        var n = t(e.target)
            .parents('.calendar')
            .index(),
          r = t(e.target).index();
        this.changeMonth(n, r);
      },
      applyDate: function() {
        this.update(),
          this.settings.closeOnSelect && this.hide(),
          this.obj.trigger('datePicker.done', [this.result]);
      },
      presetClick: function(t) {
        this.changePreset(t.target.value);
      },
      changePreset: function(t) {
        var e = this.presets.parent();
        this.summary(),
          t &&
            (this.presets
              .removeClass('selected')
              .filter('[value=' + t + ']')
              .addClass('selected'),
            e.addClass('set'),
            'custom' == t
              ? (this.picker.addClass('custom'), this.applyBtnState())
              : ((this.result = t),
                this.picker
                  .find('.months')
                  .find('.selected')
                  .removeClass('selected'),
                this.picker.removeClass('custom'),
                this.applyDate()));
      },
      valideEndYear: function() {
        var t = this.yearSelectors[0].selectedIndex;
        this.yearSelectors
          .eq(1)
          .find('option')
          .hide()
          .slice(t)
          .show(),
          this.yearSelectors[1].selectedIndex < t &&
            ((this.yearSelectors[1].selectedIndex = t),
            (this.result[1][1] = this.result[0][1]));
      },
      validMonthsInYear: function(e) {
        var n,
          r = this;
        this.yearSelectors.each(function() {
          (n = t(this)
            .next('.months')
            .find('button')),
            e && n.prop('disabled', !1),
            0 == this.selectedIndex &&
              n.slice(0, r.settings.minDate[0] - 1).prop('disabled', !0),
            this.selectedIndex == this.length - 1 &&
              n.slice(r.settings.maxDate[0]).prop('disabled', !0);
        });
      },
      changeYear: function(e) {
        var n = this.yearSelectors.index(e.target);
        this.changePreset(),
          this.validMonthsInYear(!0),
          0 == n && this.valideEndYear(),
          'object' != typeof this.result && (this.result = [[], []]),
          t(e.target)
            .next('.months')
            .find('.selected')
            .removeAttr('class'),
          (this.result[n][0] = void 0),
          (this.result[n][1] = 0 | e.target.value),
          1 == n &&
            this.picker
              .find('.calendar.from')
              .find('.selected')
              .trigger('click.dp'),
          this.summary(),
          this.applyBtnState();
      },
      changeMonth: function(t, e) {
        this.picker
          .find('.calendar')
          .eq(t)
          .find('button')
          .eq(e)
          .addClass('selected')
          .siblings()
          .removeClass('selected'),
          'object' != typeof this.result &&
            (this.result = [
              [void 0, 0 | this.yearSelectors[0].value],
              [void 0, 0 | this.yearSelectors[1].value]
            ]),
          (this.result[t][0] = e + 1),
          this.changePreset(),
          this.result[0][1] == this.result[1][1] &&
            0 == t &&
            (this.picker
              .find('.calendar.to')
              .find('button')
              .prop('disabled', !1)
              .slice(0, e)
              .prop('disabled', !0)
              .removeClass('selected'),
            this.result[0][0] > this.result[1][0] && (this.result[1][0] = ''),
            this.result[0][1] == this.settings.maxDate[1] &&
              this.validMonthsInYear(!1)),
          (this.result[0][1] = this.yearSelectors[0].value),
          (this.result[1][1] = this.yearSelectors[1].value),
          this.applyBtnState(!this.validateResult());
      },
      applyBtnState: function(t) {
        !1 !== t &&
          (t = 'string' == typeof this.result || !this.validateResult()),
          this.picker.find('.confirm').prop('disabled', t);
      },
      validateResult: function(t) {
        return (
          (t = t || this.result),
          'object' != typeof this.result ||
            !(
              t[0].length < 2 ||
              t[1].length < 2 ||
              !t[0][0] ||
              !t[1][0] ||
              t[0][1] < this.settings.minDate[1] ||
              t[0][1] > this.settings.maxDate[1] ||
              t[1][1] < this.settings.minDate[1] ||
              t[1][1] > this.settings.maxDate[1] ||
              t[0][1] > t[1][1] ||
              t[0][0] < 0 ||
              t[0][0] > 12 ||
              t[1][0] < 0 ||
              t[1][0] > 12 ||
              (t[0][1] == t[1][1] && t[0][0] > t[1][0])
            )
        );
      },
      changeCalendar: function(t) {
        if (!this.validateResult(t)) return !1;
        var e = this;
        return (
          (this.yearSelectors[0].value = +t[0][1]),
          (this.yearSelectors[1].value = +t[1][1]),
          this.valideEndYear(),
          this.validMonthsInYear(!0),
          this.picker.find('.months').each(function(n) {
            e.changeMonth(n, t[n][0] - 1);
          }),
          this.summary(),
          this
        );
      },
      summary: function(t) {
        if (!this.result) return this;
        var e = '',
          n = '';
        'string' != typeof this.result &&
          (this.result[0][0] &&
            this.result[0][1] &&
            (e = '<span>' + this.displayValue('%S') + '</span>'),
          this.result[1][0] &&
            this.result[1][1] &&
            (n = '<span>' + this.displayValue('%E') + '</span>')),
          this.calendar.from.find('strong').html(e),
          this.calendar.to.find('strong').html(n);
      },
      displayValue: function(t) {
        return (t = (t = (t = t || '%S - %E').replace(
          '%S',
          this.settings.months[this.result[0][0] - 1] + ' ' + this.result[0][1]
        )).replace(
          '%E',
          this.settings.months[this.result[1][0] - 1] + ' ' + this.result[1][1]
        ));
      },
      update: function(e) {
        var r = '';
        if (e) {
          if (((this.result = e), 'string' == typeof e))
            return this.changePreset(e), this;
          if (!this.changeCalendar(e)) return this;
          this.changePreset('custom');
        }
        if (
          'string' ==
          typeof (e = e || this.result || this.settings.presets[0].value)
        ) {
          for (var i = this.settings.presets.length; i--; )
            if (this.settings.presets[i].value == e) {
              r = this.settings.presets[i].displayText;
              break;
            }
        } else
          (r = this.displayValue()), (e[0][1] = +e[0][1]), (e[1][1] = +e[1][1]);
        return (
          void 0 != r && (this.obj[0].value = r),
          (n = 'string' == typeof e ? e : t.extend(!0, {}, e)),
          (this.result = e),
          this
        );
      }
    }),
      (t.fn.rangePicker = function(n, r) {
        return this.each(function() {
          var i,
            o,
            s = t(this);
          if (s.data('_ranegPicker'))
            return (
              (o = s.data('_ranegPicker')),
              n.setDate && o.update(n.setDate),
              this
            );
          (i = t.extend(!0, {}, t.fn.rangePicker.defaults, n || {})),
            'function' == typeof n && (r = n),
            (o = new e(s, i, r)).init(),
            s.data('_ranegPicker', o);
        });
      }),
      (t.fn.rangePicker.defaults = {
        RTL: !1,
        closeOnSelect: !0,
        presets: [
          { buttonText: '1 month', displayText: 'one month', value: '1m' },
          { buttonText: '3 months', displayText: 'three months', value: '3m' },
          { buttonText: '6 months', displayText: 'six months', value: '6m' },
          {
            buttonText: '12 months',
            displayText: 'twelve months',
            value: '12m'
          },
          {
            buttonText: 'Custom',
            displayText: 'twelve months',
            value: 'custom'
          }
        ],
        months: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        minDate: [5, 2006],
        maxDate: [8, 2013],
        setDate: null
      });
  })(window.jQuery);
