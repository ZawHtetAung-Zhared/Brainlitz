/*! jQuery v2.1.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!(function(e, t) {
  'object' == typeof module && 'object' == typeof module.exports
    ? (module.exports = e.document
        ? t(e, !0)
        : function(e) {
            if (!e.document)
              throw new Error('jQuery requires a window with a document');
            return t(e);
          })
    : t(e);
})('undefined' != typeof window ? window : this, function(e, t) {
  function n(e) {
    var t = e.length,
      n = Z.type(e);
    return (
      'function' !== n &&
      !Z.isWindow(e) &&
      (!(1 !== e.nodeType || !t) ||
        'array' === n ||
          0 === t ||
          ('number' == typeof t && t > 0 && t - 1 in e))
    );
  }
  function r(e, t, n) {
    if (Z.isFunction(t))
      return Z.grep(e, function(e, r) {
        return !!t.call(e, r, e) !== n;
      });
    if (t.nodeType)
      return Z.grep(e, function(e) {
        return (e === t) !== n;
      });
    if ('string' == typeof t) {
      if (se.test(t)) return Z.filter(t, e, n);
      t = Z.filter(t, e);
    }
    return Z.grep(e, function(e) {
      return X.call(t, e) >= 0 !== n;
    });
  }
  function o(e, t) {
    for (; (e = e[t]) && 1 !== e.nodeType; );
    return e;
  }
  function i(e) {
    var t = (he[e] = {});
    return (
      Z.each(e.match(de) || [], function(e, n) {
        t[n] = !0;
      }),
      t
    );
  }
  function a() {
    G.removeEventListener('DOMContentLoaded', a, !1),
      e.removeEventListener('load', a, !1),
      Z.ready();
  }
  function s() {
    Object.defineProperty((this.cache = {}), 0, {
      get: function() {
        return {};
      }
    }),
      (this.expando = Z.expando + Math.random());
  }
  function u(e, t, n) {
    var r;
    if (void 0 === n && 1 === e.nodeType)
      if (
        ((r = 'data-' + t.replace(be, '-$1').toLowerCase()),
        'string' == typeof (n = e.getAttribute(r)))
      ) {
        try {
          n =
            'true' === n ||
            ('false' !== n &&
              ('null' === n
                ? null
                : +n + '' === n
                ? +n
                : ye.test(n)
                ? Z.parseJSON(n)
                : n));
        } catch (U) {}
        me.set(e, t, n);
      } else n = void 0;
    return n;
  }
  function c() {
    return !0;
  }
  function l() {
    return !1;
  }
  function f() {
    try {
      return G.activeElement;
    } catch (e) {}
  }
  function p(e, t) {
    return Z.nodeName(e, 'table') &&
      Z.nodeName(11 !== t.nodeType ? t : t.firstChild, 'tr')
      ? e.getElementsByTagName('tbody')[0] ||
          e.appendChild(e.ownerDocument.createElement('tbody'))
      : e;
  }
  function d(e) {
    return (e.type = (null !== e.getAttribute('type')) + '/' + e.type), e;
  }
  function h(e) {
    var t = qe.exec(e.type);
    return t ? (e.type = t[1]) : e.removeAttribute('type'), e;
  }
  function v(e, t) {
    for (var n = 0, r = e.length; r > n; n++)
      ge.set(e[n], 'globalEval', !t || ge.get(t[n], 'globalEval'));
  }
  function g(e, t) {
    var n, r, o, i, a, s, u, c;
    if (1 === t.nodeType) {
      if (
        ge.hasData(e) &&
        ((i = ge.access(e)), (a = ge.set(t, i)), (c = i.events))
      )
        for (o in (delete a.handle, (a.events = {}), c))
          for (n = 0, r = c[o].length; r > n; n++) Z.event.add(t, o, c[o][n]);
      me.hasData(e) &&
        ((s = me.access(e)), (u = Z.extend({}, s)), me.set(t, u));
    }
  }
  function m(e, t) {
    var n = e.getElementsByTagName
      ? e.getElementsByTagName(t || '*')
      : e.querySelectorAll
      ? e.querySelectorAll(t || '*')
      : [];
    return void 0 === t || (t && Z.nodeName(e, t)) ? Z.merge([e], n) : n;
  }
  function y(e, t) {
    var n = t.nodeName.toLowerCase();
    'input' === n && ke.test(e.type)
      ? (t.checked = e.checked)
      : ('input' === n || 'textarea' === n) &&
        (t.defaultValue = e.defaultValue);
  }
  function b(t, n) {
    var r,
      o = Z(n.createElement(t)).appendTo(n.body),
      i =
        e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(o[0]))
          ? r.display
          : Z.css(o[0], 'display');
    return o.detach(), i;
  }
  function x(e) {
    var t = G,
      n = Re[e];
    return (
      n ||
        (('none' !== (n = b(e, t)) && n) ||
          ((t = (Pe = (
            Pe || Z("<iframe frameborder='0' width='0' height='0'/>")
          ).appendTo(t.documentElement))[0].contentDocument).write(),
          t.close(),
          (n = b(e, t)),
          Pe.detach()),
        (Re[e] = n)),
      n
    );
  }
  function w(e, t, n) {
    var r,
      o,
      i,
      a,
      s = e.style;
    return (
      (n = n || Be(e)) && (a = n.getPropertyValue(t) || n[t]),
      n &&
        ('' !== a || Z.contains(e.ownerDocument, e) || (a = Z.style(e, t)),
        Ie.test(a) &&
          Fe.test(t) &&
          ((r = s.width),
          (o = s.minWidth),
          (i = s.maxWidth),
          (s.minWidth = s.maxWidth = s.width = a),
          (a = n.width),
          (s.width = r),
          (s.minWidth = o),
          (s.maxWidth = i))),
      void 0 !== a ? a + '' : a
    );
  }
  function C(e, t) {
    return {
      get: function() {
        return e()
          ? void delete this.get
          : (this.get = t).apply(this, arguments);
      }
    };
  }
  function k(e, t) {
    if (t in e) return t;
    for (var n = t[0].toUpperCase() + t.slice(1), r = t, o = Je.length; o--; )
      if ((t = Je[o] + n) in e) return t;
    return r;
  }
  function T(e, t, n) {
    var r = Ue.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || 'px') : t;
  }
  function _(e, t, n, r, o) {
    for (
      var i = n === (r ? 'border' : 'content') ? 4 : 'width' === t ? 1 : 0,
        a = 0;
      4 > i;
      i += 2
    )
      'margin' === n && (a += Z.css(e, n + we[i], !0, o)),
        r
          ? ('content' === n && (a -= Z.css(e, 'padding' + we[i], !0, o)),
            'margin' !== n &&
              (a -= Z.css(e, 'border' + we[i] + 'Width', !0, o)))
          : ((a += Z.css(e, 'padding' + we[i], !0, o)),
            'padding' !== n &&
              (a += Z.css(e, 'border' + we[i] + 'Width', !0, o)));
    return a;
  }
  function E(e, t, n) {
    var r = !0,
      o = 'width' === t ? e.offsetWidth : e.offsetHeight,
      i = Be(e),
      a = 'border-box' === Z.css(e, 'boxSizing', !1, i);
    if (0 >= o || null == o) {
      if (((0 > (o = w(e, t, i)) || null == o) && (o = e.style[t]), Ie.test(o)))
        return o;
      (r = a && (Y.boxSizingReliable() || o === e.style[t])),
        (o = parseFloat(o) || 0);
    }
    return o + _(e, t, n || (a ? 'border' : 'content'), r, i) + 'px';
  }
  function j(e, t) {
    for (var n, r, o, i = [], a = 0, s = e.length; s > a; a++)
      (r = e[a]).style &&
        ((i[a] = ge.get(r, 'olddisplay')),
        (n = r.style.display),
        t
          ? (i[a] || 'none' !== n || (r.style.display = ''),
            '' === r.style.display &&
              Ce(r) &&
              (i[a] = ge.access(r, 'olddisplay', x(r.nodeName))))
          : ((o = Ce(r)),
            ('none' === n && o) ||
              ge.set(r, 'olddisplay', o ? n : Z.css(r, 'display'))));
    for (a = 0; s > a; a++)
      (r = e[a]).style &&
        ((t && 'none' !== r.style.display && '' !== r.style.display) ||
          (r.style.display = t ? i[a] || '' : 'none'));
    return e;
  }
  function N(e, t, n, r, o) {
    return new N.prototype.init(e, t, n, r, o);
  }
  function S() {
    return (
      setTimeout(function() {
        Ke = void 0;
      }),
      (Ke = Z.now())
    );
  }
  function D(e, t) {
    var n,
      r = 0,
      o = { height: e };
    for (t = t ? 1 : 0; 4 > r; r += 2 - t)
      o['margin' + (n = we[r])] = o['padding' + n] = e;
    return t && (o.opacity = o.width = e), o;
  }
  function $(e, t, n) {
    for (
      var r, o = (tt[t] || []).concat(tt['*']), i = 0, a = o.length;
      a > i;
      i++
    )
      if ((r = o[i].call(n, t, e))) return r;
  }
  function A(e, t, n) {
    var r,
      o,
      i,
      a,
      s,
      u,
      c,
      l = this,
      f = {},
      p = e.style,
      d = e.nodeType && Ce(e),
      h = ge.get(e, 'fxshow');
    for (r in (n.queue ||
      (null == (s = Z._queueHooks(e, 'fx')).unqueued &&
        ((s.unqueued = 0),
        (u = s.empty.fire),
        (s.empty.fire = function() {
          s.unqueued || u();
        })),
      s.unqueued++,
      l.always(function() {
        l.always(function() {
          s.unqueued--, Z.queue(e, 'fx').length || s.empty.fire();
        });
      })),
    1 === e.nodeType &&
      ('height' in t || 'width' in t) &&
      ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
      'inline' ===
        ('none' === (c = Z.css(e, 'display'))
          ? ge.get(e, 'olddisplay') || x(e.nodeName)
          : c) &&
        'none' === Z.css(e, 'float') &&
        (p.display = 'inline-block')),
    n.overflow &&
      ((p.overflow = 'hidden'),
      l.always(function() {
        (p.overflow = n.overflow[0]),
          (p.overflowX = n.overflow[1]),
          (p.overflowY = n.overflow[2]);
      })),
    t))
      if (((o = t[r]), Ge.exec(o))) {
        if (
          (delete t[r], (i = i || 'toggle' === o), o === (d ? 'hide' : 'show'))
        ) {
          if ('show' !== o || !h || void 0 === h[r]) continue;
          d = !0;
        }
        f[r] = (h && h[r]) || Z.style(e, r);
      } else c = void 0;
    if (Z.isEmptyObject(f))
      'inline' === ('none' === c ? x(e.nodeName) : c) && (p.display = c);
    else
      for (r in (h
        ? 'hidden' in h && (d = h.hidden)
        : (h = ge.access(e, 'fxshow', {})),
      i && (h.hidden = !d),
      d
        ? Z(e).show()
        : l.done(function() {
            Z(e).hide();
          }),
      l.done(function() {
        var t;
        for (t in (ge.remove(e, 'fxshow'), f)) Z.style(e, t, f[t]);
      }),
      f))
        (a = $(d ? h[r] : 0, r, l)),
          r in h ||
            ((h[r] = a.start),
            d &&
              ((a.end = a.start),
              (a.start = 'width' === r || 'height' === r ? 1 : 0)));
  }
  function O(e, t) {
    var n, r, o, i, a;
    for (n in e)
      if (
        ((o = t[(r = Z.camelCase(n))]),
        (i = e[n]),
        Z.isArray(i) && ((o = i[1]), (i = e[n] = i[0])),
        n !== r && ((e[r] = i), delete e[n]),
        (a = Z.cssHooks[r]) && 'expand' in a)
      )
        for (n in ((i = a.expand(i)), delete e[r], i))
          n in e || ((e[n] = i[n]), (t[n] = o));
      else t[r] = o;
  }
  function L(e, t, n) {
    var r,
      o,
      i = 0,
      a = et.length,
      s = Z.Deferred().always(function() {
        delete u.elem;
      }),
      u = function() {
        if (o) return !1;
        for (
          var t = Ke || S(),
            n = Math.max(0, c.startTime + c.duration - t),
            r = 1 - (n / c.duration || 0),
            i = 0,
            a = c.tweens.length;
          a > i;
          i++
        )
          c.tweens[i].run(r);
        return (
          s.notifyWith(e, [c, r, n]),
          1 > r && a ? n : (s.resolveWith(e, [c]), !1)
        );
      },
      c = s.promise({
        elem: e,
        props: Z.extend({}, t),
        opts: Z.extend(!0, { specialEasing: {} }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: Ke || S(),
        duration: n.duration,
        tweens: [],
        createTween: function(t, n) {
          var r = Z.Tween(
            e,
            c.opts,
            t,
            n,
            c.opts.specialEasing[t] || c.opts.easing
          );
          return c.tweens.push(r), r;
        },
        stop: function(t) {
          var n = 0,
            r = t ? c.tweens.length : 0;
          if (o) return this;
          for (o = !0; r > n; n++) c.tweens[n].run(1);
          return t ? s.resolveWith(e, [c, t]) : s.rejectWith(e, [c, t]), this;
        }
      }),
      l = c.props;
    for (O(l, c.opts.specialEasing); a > i; i++)
      if ((r = et[i].call(c, e, l, c.opts))) return r;
    return (
      Z.map(l, $, c),
      Z.isFunction(c.opts.start) && c.opts.start.call(e, c),
      Z.fx.timer(Z.extend(u, { elem: e, anim: c, queue: c.opts.queue })),
      c
        .progress(c.opts.progress)
        .done(c.opts.done, c.opts.complete)
        .fail(c.opts.fail)
        .always(c.opts.always)
    );
  }
  function q(e) {
    return function(t, n) {
      'string' != typeof t && ((n = t), (t = '*'));
      var r,
        o = 0,
        i = t.toLowerCase().match(de) || [];
      if (Z.isFunction(n))
        for (; (r = i[o++]); )
          '+' === r[0]
            ? ((r = r.slice(1) || '*'), (e[r] = e[r] || []).unshift(n))
            : (e[r] = e[r] || []).push(n);
    };
  }
  function H(e, t, n, r) {
    function o(s) {
      var u;
      return (
        (i[s] = !0),
        Z.each(e[s] || [], function(e, s) {
          var c = s(t, n, r);
          return 'string' != typeof c || a || i[c]
            ? a
              ? !(u = c)
              : void 0
            : (t.dataTypes.unshift(c), o(c), !1);
        }),
        u
      );
    }
    var i = {},
      a = e === xt;
    return o(t.dataTypes[0]) || (!i['*'] && o('*'));
  }
  function M(e, t) {
    var n,
      r,
      o = Z.ajaxSettings.flatOptions || {};
    for (n in t) void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]);
    return r && Z.extend(!0, e, r), e;
  }
  function P(e, t, n) {
    for (var r, o, i, a, s = e.contents, u = e.dataTypes; '*' === u[0]; )
      u.shift(),
        void 0 === r && (r = e.mimeType || t.getResponseHeader('Content-Type'));
    if (r)
      for (o in s)
        if (s[o] && s[o].test(r)) {
          u.unshift(o);
          break;
        }
    if (u[0] in n) i = u[0];
    else {
      for (o in n) {
        if (!u[0] || e.converters[o + ' ' + u[0]]) {
          i = o;
          break;
        }
        a || (a = o);
      }
      i = i || a;
    }
    return i ? (i !== u[0] && u.unshift(i), n[i]) : void 0;
  }
  function R(e, t, n, r) {
    var o,
      i,
      a,
      s,
      u,
      c = {},
      l = e.dataTypes.slice();
    if (l[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
    for (i = l.shift(); i; )
      if (
        (e.responseFields[i] && (n[e.responseFields[i]] = t),
        !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
        (u = i),
        (i = l.shift()))
      )
        if ('*' === i) i = u;
        else if ('*' !== u && u !== i) {
          if (!(a = c[u + ' ' + i] || c['* ' + i]))
            for (o in c)
              if (
                (s = o.split(' '))[1] === i &&
                (a = c[u + ' ' + s[0]] || c['* ' + s[0]])
              ) {
                !0 === a
                  ? (a = c[o])
                  : !0 !== c[o] && ((i = s[0]), l.unshift(s[1]));
                break;
              }
          if (!0 !== a)
            if (a && e.throws) t = a(t);
            else
              try {
                t = a(t);
              } catch (G) {
                return {
                  state: 'parsererror',
                  error: a ? G : 'No conversion from ' + u + ' to ' + i
                };
              }
        }
    return { state: 'success', data: t };
  }
  function F(e, t, n, r) {
    var o;
    if (Z.isArray(t))
      Z.each(t, function(t, o) {
        n || kt.test(e)
          ? r(e, o)
          : F(e + '[' + ('object' == typeof o ? t : '') + ']', o, n, r);
      });
    else if (n || 'object' !== Z.type(t)) r(e, t);
    else for (o in t) F(e + '[' + o + ']', t[o], n, r);
  }
  function I(e) {
    return Z.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
  }
  var B = [],
    W = B.slice,
    U = B.concat,
    z = B.push,
    X = B.indexOf,
    V = {},
    J = V.toString,
    K = V.hasOwnProperty,
    Y = {},
    G = e.document,
    Q = '2.1.1',
    Z = function(e, t) {
      return new Z.fn.init(e, t);
    },
    ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    te = /^-ms-/,
    ne = /-([\da-z])/gi,
    re = function(e, t) {
      return t.toUpperCase();
    };
  (Z.fn = Z.prototype = {
    jquery: Q,
    constructor: Z,
    selector: '',
    length: 0,
    toArray: function() {
      return W.call(this);
    },
    get: function(e) {
      return null != e
        ? 0 > e
          ? this[e + this.length]
          : this[e]
        : W.call(this);
    },
    pushStack: function(e) {
      var t = Z.merge(this.constructor(), e);
      return (t.prevObject = this), (t.context = this.context), t;
    },
    each: function(e, t) {
      return Z.each(this, e, t);
    },
    map: function(e) {
      return this.pushStack(
        Z.map(this, function(t, n) {
          return e.call(t, n, t);
        })
      );
    },
    slice: function() {
      return this.pushStack(W.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(e) {
      var t = this.length,
        n = +e + (0 > e ? t : 0);
      return this.pushStack(n >= 0 && t > n ? [this[n]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor(null);
    },
    push: z,
    sort: B.sort,
    splice: B.splice
  }),
    (Z.extend = Z.fn.extend = function() {
      var e,
        t,
        n,
        r,
        o,
        i,
        a = arguments[0] || {},
        s = 1,
        u = arguments.length,
        c = !1;
      for (
        'boolean' == typeof a && ((c = a), (a = arguments[s] || {}), s++),
          'object' == typeof a || Z.isFunction(a) || (a = {}),
          s === u && ((a = this), s--);
        u > s;
        s++
      )
        if (null != (e = arguments[s]))
          for (t in e)
            (n = a[t]),
              a !== (r = e[t]) &&
                (c && r && (Z.isPlainObject(r) || (o = Z.isArray(r)))
                  ? (o
                      ? ((o = !1), (i = n && Z.isArray(n) ? n : []))
                      : (i = n && Z.isPlainObject(n) ? n : {}),
                    (a[t] = Z.extend(c, i, r)))
                  : void 0 !== r && (a[t] = r));
      return a;
    }),
    Z.extend({
      expando: 'jQuery' + (Q + Math.random()).replace(/\D/g, ''),
      isReady: !0,
      error: function(e) {
        throw new Error(e);
      },
      noop: function() {},
      isFunction: function(e) {
        return 'function' === Z.type(e);
      },
      isArray: Array.isArray,
      isWindow: function(e) {
        return null != e && e === e.window;
      },
      isNumeric: function(e) {
        return !Z.isArray(e) && e - parseFloat(e) >= 0;
      },
      isPlainObject: function(e) {
        return (
          'object' === Z.type(e) &&
          !e.nodeType &&
          !Z.isWindow(e) &&
          !(e.constructor && !K.call(e.constructor.prototype, 'isPrototypeOf'))
        );
      },
      isEmptyObject: function(e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      type: function(e) {
        return null == e
          ? e + ''
          : 'object' == typeof e || 'function' == typeof e
          ? V[J.call(e)] || 'object'
          : typeof e;
      },
      globalEval: function(e) {
        var t,
          n = eval;
        (e = Z.trim(e)) &&
          (1 === e.indexOf('use strict')
            ? (((t = G.createElement('script')).text = e),
              G.head.appendChild(t).parentNode.removeChild(t))
            : n(e));
      },
      camelCase: function(e) {
        return e.replace(te, 'ms-').replace(ne, re);
      },
      nodeName: function(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
      },
      each: function(e, t, r) {
        var o = 0,
          i = e.length,
          a = n(e);
        if (r) {
          if (a) for (; i > o && !1 !== t.apply(e[o], r); o++);
          else for (o in e) if (!1 === t.apply(e[o], r)) break;
        } else if (a) for (; i > o && !1 !== t.call(e[o], o, e[o]); o++);
        else for (o in e) if (!1 === t.call(e[o], o, e[o])) break;
        return e;
      },
      trim: function(e) {
        return null == e ? '' : (e + '').replace(ee, '');
      },
      makeArray: function(e, t) {
        var r = t || [];
        return (
          null != e &&
            (n(Object(e))
              ? Z.merge(r, 'string' == typeof e ? [e] : e)
              : z.call(r, e)),
          r
        );
      },
      inArray: function(e, t, n) {
        return null == t ? -1 : X.call(t, e, n);
      },
      merge: function(e, t) {
        for (var n = +t.length, r = 0, o = e.length; n > r; r++) e[o++] = t[r];
        return (e.length = o), e;
      },
      grep: function(e, t, n) {
        for (var r = [], o = 0, i = e.length, a = !n; i > o; o++)
          !t(e[o], o) !== a && r.push(e[o]);
        return r;
      },
      map: function(e, t, r) {
        var o,
          i = 0,
          a = e.length,
          s = [];
        if (n(e)) for (; a > i; i++) null != (o = t(e[i], i, r)) && s.push(o);
        else for (i in e) null != (o = t(e[i], i, r)) && s.push(o);
        return U.apply([], s);
      },
      guid: 1,
      proxy: function(e, t) {
        var n, r, o;
        return (
          'string' == typeof t && ((n = e[t]), (t = e), (e = n)),
          Z.isFunction(e)
            ? ((r = W.call(arguments, 2)),
              ((o = function() {
                return e.apply(t || this, r.concat(W.call(arguments)));
              }).guid = e.guid = e.guid || Z.guid++),
              o)
            : void 0
        );
      },
      now: Date.now,
      support: Y
    }),
    Z.each(
      'Boolean Number String Function Array Date RegExp Object Error'.split(
        ' '
      ),
      function(e, t) {
        V['[object ' + t + ']'] = t.toLowerCase();
      }
    );
  var oe = (function(e) {
    function t(e, t, n, r) {
      var o, i, a, s, u, c, f, d, h, v;
      if (
        ((t ? t.ownerDocument || t : F) !== A && $(t),
        (n = n || []),
        !e || 'string' != typeof e)
      )
        return n;
      if (1 !== (s = (t = t || A).nodeType) && 9 !== s) return [];
      if (L && !r) {
        if ((o = ye.exec(e)))
          if ((a = o[1])) {
            if (9 === s) {
              if (!(i = t.getElementById(a)) || !i.parentNode) return n;
              if (i.id === a) return n.push(i), n;
            } else if (
              t.ownerDocument &&
              (i = t.ownerDocument.getElementById(a)) &&
              P(t, i) &&
              i.id === a
            )
              return n.push(i), n;
          } else {
            if (o[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
            if (
              (a = o[3]) &&
              w.getElementsByClassName &&
              t.getElementsByClassName
            )
              return Z.apply(n, t.getElementsByClassName(a)), n;
          }
        if (w.qsa && (!q || !q.test(e))) {
          if (
            ((d = f = R),
            (h = t),
            (v = 9 === s && e),
            1 === s && 'object' !== t.nodeName.toLowerCase())
          ) {
            for (
              c = _(e),
                (f = t.getAttribute('id'))
                  ? (d = f.replace(xe, '\\$&'))
                  : t.setAttribute('id', d),
                d = "[id='" + d + "'] ",
                u = c.length;
              u--;

            )
              c[u] = d + p(c[u]);
            (h = (be.test(e) && l(t.parentNode)) || t), (v = c.join(','));
          }
          if (v)
            try {
              return Z.apply(n, h.querySelectorAll(v)), n;
            } catch (W) {
            } finally {
              f || t.removeAttribute('id');
            }
        }
      }
      return j(e.replace(ue, '$1'), t, n, r);
    }
    function n() {
      function e(n, r) {
        return (
          t.push(n + ' ') > C.cacheLength && delete e[t.shift()],
          (e[n + ' '] = r)
        );
      }
      var t = [];
      return e;
    }
    function r(e) {
      return (e[R] = !0), e;
    }
    function o(e) {
      var t = A.createElement('div');
      try {
        return !!e(t);
      } catch (w) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), (t = null);
      }
    }
    function i(e, t) {
      for (var n = e.split('|'), r = e.length; r--; ) C.attrHandle[n[r]] = t;
    }
    function a(e, t) {
      var n = t && e,
        r =
          n &&
          1 === e.nodeType &&
          1 === t.nodeType &&
          (~t.sourceIndex || J) - (~e.sourceIndex || J);
      if (r) return r;
      if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
      return e ? 1 : -1;
    }
    function s(e) {
      return function(t) {
        return 'input' === t.nodeName.toLowerCase() && t.type === e;
      };
    }
    function u(e) {
      return function(t) {
        var n = t.nodeName.toLowerCase();
        return ('input' === n || 'button' === n) && t.type === e;
      };
    }
    function c(e) {
      return r(function(t) {
        return (
          (t = +t),
          r(function(n, r) {
            for (var o, i = e([], n.length, t), a = i.length; a--; )
              n[(o = i[a])] && (n[o] = !(r[o] = n[o]));
          })
        );
      });
    }
    function l(e) {
      return e && typeof e.getElementsByTagName !== V && e;
    }
    function f() {}
    function p(e) {
      for (var t = 0, n = e.length, r = ''; n > t; t++) r += e[t].value;
      return r;
    }
    function d(e, t, n) {
      var r = t.dir,
        o = n && 'parentNode' === r,
        i = B++;
      return t.first
        ? function(t, n, i) {
            for (; (t = t[r]); ) if (1 === t.nodeType || o) return e(t, n, i);
          }
        : function(t, n, a) {
            var s,
              u,
              c = [I, i];
            if (a) {
              for (; (t = t[r]); )
                if ((1 === t.nodeType || o) && e(t, n, a)) return !0;
            } else
              for (; (t = t[r]); )
                if (1 === t.nodeType || o) {
                  if (
                    (s = (u = t[R] || (t[R] = {}))[r]) &&
                    s[0] === I &&
                    s[1] === i
                  )
                    return (c[2] = s[2]);
                  if (((u[r] = c), (c[2] = e(t, n, a)))) return !0;
                }
          };
    }
    function h(e) {
      return e.length > 1
        ? function(t, n, r) {
            for (var o = e.length; o--; ) if (!e[o](t, n, r)) return !1;
            return !0;
          }
        : e[0];
    }
    function v(e, n, r) {
      for (var o = 0, i = n.length; i > o; o++) t(e, n[o], r);
      return r;
    }
    function g(e, t, n, r, o) {
      for (var i, a = [], s = 0, u = e.length, c = null != t; u > s; s++)
        (i = e[s]) && (!n || n(i, r, o)) && (a.push(i), c && t.push(s));
      return a;
    }
    function m(e, t, n, o, i, a) {
      return (
        o && !o[R] && (o = m(o)),
        i && !i[R] && (i = m(i, a)),
        r(function(r, a, s, u) {
          var c,
            l,
            f,
            p = [],
            d = [],
            h = a.length,
            m = r || v(t || '*', s.nodeType ? [s] : s, []),
            y = !e || (!r && t) ? m : g(m, p, e, s, u),
            b = n ? (i || (r ? e : h || o) ? [] : a) : y;
          if ((n && n(y, b, s, u), o))
            for (c = g(b, d), o(c, [], s, u), l = c.length; l--; )
              (f = c[l]) && (b[d[l]] = !(y[d[l]] = f));
          if (r) {
            if (i || e) {
              if (i) {
                for (c = [], l = b.length; l--; )
                  (f = b[l]) && c.push((y[l] = f));
                i(null, (b = []), c, u);
              }
              for (l = b.length; l--; )
                (f = b[l]) &&
                  (c = i ? te.call(r, f) : p[l]) > -1 &&
                  (r[c] = !(a[c] = f));
            }
          } else (b = g(b === a ? b.splice(h, b.length) : b)), i ? i(null, a, b, u) : Z.apply(a, b);
        })
      );
    }
    function y(e) {
      for (
        var t,
          n,
          r,
          o = e.length,
          i = C.relative[e[0].type],
          a = i || C.relative[' '],
          s = i ? 1 : 0,
          u = d(
            function(e) {
              return e === t;
            },
            a,
            !0
          ),
          c = d(
            function(e) {
              return te.call(t, e) > -1;
            },
            a,
            !0
          ),
          l = [
            function(e, n, r) {
              return (
                (!i && (r || n !== N)) ||
                ((t = n).nodeType ? u(e, n, r) : c(e, n, r))
              );
            }
          ];
        o > s;
        s++
      )
        if ((n = C.relative[e[s].type])) l = [d(h(l), n)];
        else {
          if ((n = C.filter[e[s].type].apply(null, e[s].matches))[R]) {
            for (r = ++s; o > r && !C.relative[e[r].type]; r++);
            return m(
              s > 1 && h(l),
              s > 1 &&
                p(
                  e
                    .slice(0, s - 1)
                    .concat({ value: ' ' === e[s - 2].type ? '*' : '' })
                ).replace(ue, '$1'),
              n,
              r > s && y(e.slice(s, r)),
              o > r && y((e = e.slice(r))),
              o > r && p(e)
            );
          }
          l.push(n);
        }
      return h(l);
    }
    function b(e, n) {
      var o = n.length > 0,
        i = e.length > 0,
        a = function(r, a, s, u, c) {
          var l,
            f,
            p,
            d = 0,
            h = '0',
            v = r && [],
            m = [],
            y = N,
            b = r || (i && C.find.TAG('*', c)),
            x = (I += null == y ? 1 : Math.random() || 0.1),
            w = b.length;
          for (c && (N = a !== A && a); h !== w && null != (l = b[h]); h++) {
            if (i && l) {
              for (f = 0; (p = e[f++]); )
                if (p(l, a, s)) {
                  u.push(l);
                  break;
                }
              c && (I = x);
            }
            o && ((l = !p && l) && d--, r && v.push(l));
          }
          if (((d += h), o && h !== d)) {
            for (f = 0; (p = n[f++]); ) p(v, m, a, s);
            if (r) {
              if (d > 0) for (; h--; ) v[h] || m[h] || (m[h] = G.call(u));
              m = g(m);
            }
            Z.apply(u, m),
              c && !r && m.length > 0 && d + n.length > 1 && t.uniqueSort(u);
          }
          return c && ((I = x), (N = y)), v;
        };
      return o ? r(a) : a;
    }
    var x,
      w,
      C,
      k,
      T,
      _,
      E,
      j,
      N,
      S,
      D,
      $,
      A,
      O,
      L,
      q,
      H,
      M,
      P,
      R = 'sizzle' + -new Date(),
      F = e.document,
      I = 0,
      B = 0,
      W = n(),
      U = n(),
      z = n(),
      X = function(e, t) {
        return e === t && (D = !0), 0;
      },
      V = 'undefined',
      J = 1 << 31,
      K = {}.hasOwnProperty,
      Y = [],
      G = Y.pop,
      Q = Y.push,
      Z = Y.push,
      ee = Y.slice,
      te =
        Y.indexOf ||
        function(e) {
          for (var t = 0, n = this.length; n > t; t++)
            if (this[t] === e) return t;
          return -1;
        },
      ne =
        'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      re = '[\\x20\\t\\r\\n\\f]',
      oe = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
      ie = oe.replace('w', 'w#'),
      ae =
        '\\[' +
        re +
        '*(' +
        oe +
        ')(?:' +
        re +
        '*([*^$|!~]?=)' +
        re +
        '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
        ie +
        '))|)' +
        re +
        '*\\]',
      se =
        ':(' +
        oe +
        ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
        ae +
        ')*)|.*)\\)|)',
      ue = new RegExp(
        '^' + re + '+|((?:^|[^\\\\])(?:\\\\.)*)' + re + '+$',
        'g'
      ),
      ce = new RegExp('^' + re + '*,' + re + '*'),
      le = new RegExp('^' + re + '*([>+~]|' + re + ')' + re + '*'),
      fe = new RegExp('=' + re + '*([^\\]\'"]*?)' + re + '*\\]', 'g'),
      pe = new RegExp(se),
      de = new RegExp('^' + ie + '$'),
      he = {
        ID: new RegExp('^#(' + oe + ')'),
        CLASS: new RegExp('^\\.(' + oe + ')'),
        TAG: new RegExp('^(' + oe.replace('w', 'w*') + ')'),
        ATTR: new RegExp('^' + ae),
        PSEUDO: new RegExp('^' + se),
        CHILD: new RegExp(
          '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
            re +
            '*(even|odd|(([+-]|)(\\d*)n|)' +
            re +
            '*(?:([+-]|)' +
            re +
            '*(\\d+)|))' +
            re +
            '*\\)|)',
          'i'
        ),
        bool: new RegExp('^(?:' + ne + ')$', 'i'),
        needsContext: new RegExp(
          '^' +
            re +
            '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
            re +
            '*((?:-\\d)?\\d*)' +
            re +
            '*\\)|)(?=[^-]|$)',
          'i'
        )
      },
      ve = /^(?:input|select|textarea|button)$/i,
      ge = /^h\d$/i,
      me = /^[^{]+\{\s*\[native \w/,
      ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      be = /[+~]/,
      xe = /'|\\/g,
      we = new RegExp('\\\\([\\da-f]{1,6}' + re + '?|(' + re + ')|.)', 'ig'),
      Ce = function(e, t, n) {
        var r = '0x' + t - 65536;
        return r != r || n
          ? t
          : 0 > r
          ? String.fromCharCode(r + 65536)
          : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
      };
    try {
      Z.apply((Y = ee.call(F.childNodes)), F.childNodes),
        Y[F.childNodes.length].nodeType;
    } catch (Oe) {
      Z = {
        apply: Y.length
          ? function(e, t) {
              Q.apply(e, ee.call(t));
            }
          : function(e, t) {
              for (var n = e.length, r = 0; (e[n++] = t[r++]); );
              e.length = n - 1;
            }
      };
    }
    for (x in ((w = t.support = {}),
    (T = t.isXML = function(e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return !!t && 'HTML' !== t.nodeName;
    }),
    ($ = t.setDocument = function(e) {
      var t,
        n = e ? e.ownerDocument || e : F,
        r = n.defaultView;
      return n !== A && 9 === n.nodeType && n.documentElement
        ? ((A = n),
          (O = n.documentElement),
          (L = !T(n)),
          r &&
            r !== r.top &&
            (r.addEventListener
              ? r.addEventListener(
                  'unload',
                  function() {
                    $();
                  },
                  !1
                )
              : r.attachEvent &&
                r.attachEvent('onunload', function() {
                  $();
                })),
          (w.attributes = o(function(e) {
            return (e.className = 'i'), !e.getAttribute('className');
          })),
          (w.getElementsByTagName = o(function(e) {
            return (
              e.appendChild(n.createComment('')),
              !e.getElementsByTagName('*').length
            );
          })),
          (w.getElementsByClassName =
            me.test(n.getElementsByClassName) &&
            o(function(e) {
              return (
                (e.innerHTML = "<div class='a'></div><div class='a i'></div>"),
                (e.firstChild.className = 'i'),
                2 === e.getElementsByClassName('i').length
              );
            })),
          (w.getById = o(function(e) {
            return (
              (O.appendChild(e).id = R),
              !n.getElementsByName || !n.getElementsByName(R).length
            );
          })),
          w.getById
            ? ((C.find.ID = function(e, t) {
                if (typeof t.getElementById !== V && L) {
                  var n = t.getElementById(e);
                  return n && n.parentNode ? [n] : [];
                }
              }),
              (C.filter.ID = function(e) {
                var t = e.replace(we, Ce);
                return function(e) {
                  return e.getAttribute('id') === t;
                };
              }))
            : (delete C.find.ID,
              (C.filter.ID = function(e) {
                var t = e.replace(we, Ce);
                return function(e) {
                  var n =
                    typeof e.getAttributeNode !== V && e.getAttributeNode('id');
                  return n && n.value === t;
                };
              })),
          (C.find.TAG = w.getElementsByTagName
            ? function(e, t) {
                return typeof t.getElementsByTagName !== V
                  ? t.getElementsByTagName(e)
                  : void 0;
              }
            : function(e, t) {
                var n,
                  r = [],
                  o = 0,
                  i = t.getElementsByTagName(e);
                if ('*' === e) {
                  for (; (n = i[o++]); ) 1 === n.nodeType && r.push(n);
                  return r;
                }
                return i;
              }),
          (C.find.CLASS =
            w.getElementsByClassName &&
            function(e, t) {
              return typeof t.getElementsByClassName !== V && L
                ? t.getElementsByClassName(e)
                : void 0;
            }),
          (H = []),
          (q = []),
          (w.qsa = me.test(n.querySelectorAll)) &&
            (o(function(e) {
              (e.innerHTML =
                "<select msallowclip=''><option selected=''></option></select>"),
                e.querySelectorAll("[msallowclip^='']").length &&
                  q.push('[*^$]=' + re + '*(?:\'\'|"")'),
                e.querySelectorAll('[selected]').length ||
                  q.push('\\[' + re + '*(?:value|' + ne + ')'),
                e.querySelectorAll(':checked').length || q.push(':checked');
            }),
            o(function(e) {
              var t = n.createElement('input');
              t.setAttribute('type', 'hidden'),
                e.appendChild(t).setAttribute('name', 'D'),
                e.querySelectorAll('[name=d]').length &&
                  q.push('name' + re + '*[*^$|!~]?='),
                e.querySelectorAll(':enabled').length ||
                  q.push(':enabled', ':disabled'),
                e.querySelectorAll('*,:x'),
                q.push(',.*:');
            })),
          (w.matchesSelector = me.test(
            (M =
              O.matches ||
              O.webkitMatchesSelector ||
              O.mozMatchesSelector ||
              O.oMatchesSelector ||
              O.msMatchesSelector)
          )) &&
            o(function(e) {
              (w.disconnectedMatch = M.call(e, 'div')),
                M.call(e, "[s!='']:x"),
                H.push('!=', se);
            }),
          (q = q.length && new RegExp(q.join('|'))),
          (H = H.length && new RegExp(H.join('|'))),
          (t = me.test(O.compareDocumentPosition)),
          (P =
            t || me.test(O.contains)
              ? function(e, t) {
                  var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                  return (
                    e === r ||
                    !(
                      !r ||
                      1 !== r.nodeType ||
                      !(n.contains
                        ? n.contains(r)
                        : e.compareDocumentPosition &&
                          16 & e.compareDocumentPosition(r))
                    )
                  );
                }
              : function(e, t) {
                  if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                  return !1;
                }),
          (X = t
            ? function(e, t) {
                if (e === t) return (D = !0), 0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return (
                  r ||
                  (1 &
                    (r =
                      (e.ownerDocument || e) === (t.ownerDocument || t)
                        ? e.compareDocumentPosition(t)
                        : 1) ||
                  (!w.sortDetached && t.compareDocumentPosition(e) === r)
                    ? e === n || (e.ownerDocument === F && P(F, e))
                      ? -1
                      : t === n || (t.ownerDocument === F && P(F, t))
                      ? 1
                      : S
                      ? te.call(S, e) - te.call(S, t)
                      : 0
                    : 4 & r
                    ? -1
                    : 1)
                );
              }
            : function(e, t) {
                if (e === t) return (D = !0), 0;
                var r,
                  o = 0,
                  i = e.parentNode,
                  s = t.parentNode,
                  u = [e],
                  c = [t];
                if (!i || !s)
                  return e === n
                    ? -1
                    : t === n
                    ? 1
                    : i
                    ? -1
                    : s
                    ? 1
                    : S
                    ? te.call(S, e) - te.call(S, t)
                    : 0;
                if (i === s) return a(e, t);
                for (r = e; (r = r.parentNode); ) u.unshift(r);
                for (r = t; (r = r.parentNode); ) c.unshift(r);
                for (; u[o] === c[o]; ) o++;
                return o ? a(u[o], c[o]) : u[o] === F ? -1 : c[o] === F ? 1 : 0;
              }),
          n)
        : A;
    }),
    (t.matches = function(e, n) {
      return t(e, null, null, n);
    }),
    (t.matchesSelector = function(e, n) {
      if (
        ((e.ownerDocument || e) !== A && $(e),
        (n = n.replace(fe, "='$1']")),
        !(!w.matchesSelector || !L || (H && H.test(n)) || (q && q.test(n))))
      )
        try {
          var r = M.call(e, n);
          if (
            r ||
            w.disconnectedMatch ||
            (e.document && 11 !== e.document.nodeType)
          )
            return r;
        } catch (k) {}
      return t(n, A, null, [e]).length > 0;
    }),
    (t.contains = function(e, t) {
      return (e.ownerDocument || e) !== A && $(e), P(e, t);
    }),
    (t.attr = function(e, t) {
      (e.ownerDocument || e) !== A && $(e);
      var n = C.attrHandle[t.toLowerCase()],
        r = n && K.call(C.attrHandle, t.toLowerCase()) ? n(e, t, !L) : void 0;
      return void 0 !== r
        ? r
        : w.attributes || !L
        ? e.getAttribute(t)
        : (r = e.getAttributeNode(t)) && r.specified
        ? r.value
        : null;
    }),
    (t.error = function(e) {
      throw new Error('Syntax error, unrecognized expression: ' + e);
    }),
    (t.uniqueSort = function(e) {
      var t,
        n = [],
        r = 0,
        o = 0;
      if (
        ((D = !w.detectDuplicates),
        (S = !w.sortStable && e.slice(0)),
        e.sort(X),
        D)
      ) {
        for (; (t = e[o++]); ) t === e[o] && (r = n.push(o));
        for (; r--; ) e.splice(n[r], 1);
      }
      return (S = null), e;
    }),
    (k = t.getText = function(e) {
      var t,
        n = '',
        r = 0,
        o = e.nodeType;
      if (o) {
        if (1 === o || 9 === o || 11 === o) {
          if ('string' == typeof e.textContent) return e.textContent;
          for (e = e.firstChild; e; e = e.nextSibling) n += k(e);
        } else if (3 === o || 4 === o) return e.nodeValue;
      } else for (; (t = e[r++]); ) n += k(t);
      return n;
    }),
    ((C = t.selectors = {
      cacheLength: 50,
      createPseudo: r,
      match: he,
      attrHandle: {},
      find: {},
      relative: {
        '>': { dir: 'parentNode', first: !0 },
        ' ': { dir: 'parentNode' },
        '+': { dir: 'previousSibling', first: !0 },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        ATTR: function(e) {
          return (
            (e[1] = e[1].replace(we, Ce)),
            (e[3] = (e[3] || e[4] || e[5] || '').replace(we, Ce)),
            '~=' === e[2] && (e[3] = ' ' + e[3] + ' '),
            e.slice(0, 4)
          );
        },
        CHILD: function(e) {
          return (
            (e[1] = e[1].toLowerCase()),
            'nth' === e[1].slice(0, 3)
              ? (e[3] || t.error(e[0]),
                (e[4] = +(e[4]
                  ? e[5] + (e[6] || 1)
                  : 2 * ('even' === e[3] || 'odd' === e[3]))),
                (e[5] = +(e[7] + e[8] || 'odd' === e[3])))
              : e[3] && t.error(e[0]),
            e
          );
        },
        PSEUDO: function(e) {
          var t,
            n = !e[6] && e[2];
          return he.CHILD.test(e[0])
            ? null
            : (e[3]
                ? (e[2] = e[4] || e[5] || '')
                : n &&
                  pe.test(n) &&
                  (t = _(n, !0)) &&
                  (t = n.indexOf(')', n.length - t) - n.length) &&
                  ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
              e.slice(0, 3));
        }
      },
      filter: {
        TAG: function(e) {
          var t = e.replace(we, Ce).toLowerCase();
          return '*' === e
            ? function() {
                return !0;
              }
            : function(e) {
                return e.nodeName && e.nodeName.toLowerCase() === t;
              };
        },
        CLASS: function(e) {
          var t = W[e + ' '];
          return (
            t ||
            ((t = new RegExp('(^|' + re + ')' + e + '(' + re + '|$)')) &&
              W(e, function(e) {
                return t.test(
                  ('string' == typeof e.className && e.className) ||
                    (typeof e.getAttribute !== V && e.getAttribute('class')) ||
                    ''
                );
              }))
          );
        },
        ATTR: function(e, n, r) {
          return function(o) {
            var i = t.attr(o, e);
            return null == i
              ? '!=' === n
              : !n ||
                  ((i += ''),
                  '=' === n
                    ? i === r
                    : '!=' === n
                    ? i !== r
                    : '^=' === n
                    ? r && 0 === i.indexOf(r)
                    : '*=' === n
                    ? r && i.indexOf(r) > -1
                    : '$=' === n
                    ? r && i.slice(-r.length) === r
                    : '~=' === n
                    ? (' ' + i + ' ').indexOf(r) > -1
                    : '|=' === n &&
                      (i === r || i.slice(0, r.length + 1) === r + '-'));
          };
        },
        CHILD: function(e, t, n, r, o) {
          var i = 'nth' !== e.slice(0, 3),
            a = 'last' !== e.slice(-4),
            s = 'of-type' === t;
          return 1 === r && 0 === o
            ? function(e) {
                return !!e.parentNode;
              }
            : function(t, n, u) {
                var c,
                  l,
                  f,
                  p,
                  d,
                  h,
                  v = i !== a ? 'nextSibling' : 'previousSibling',
                  g = t.parentNode,
                  m = s && t.nodeName.toLowerCase(),
                  y = !u && !s;
                if (g) {
                  if (i) {
                    for (; v; ) {
                      for (f = t; (f = f[v]); )
                        if (
                          s ? f.nodeName.toLowerCase() === m : 1 === f.nodeType
                        )
                          return !1;
                      h = v = 'only' === e && !h && 'nextSibling';
                    }
                    return !0;
                  }
                  if (((h = [a ? g.firstChild : g.lastChild]), a && y)) {
                    for (
                      d =
                        (c = (l = g[R] || (g[R] = {}))[e] || [])[0] === I &&
                        c[1],
                        p = c[0] === I && c[2],
                        f = d && g.childNodes[d];
                      (f = (++d && f && f[v]) || (p = d = 0) || h.pop());

                    )
                      if (1 === f.nodeType && ++p && f === t) {
                        l[e] = [I, d, p];
                        break;
                      }
                  } else if (y && (c = (t[R] || (t[R] = {}))[e]) && c[0] === I)
                    p = c[1];
                  else
                    for (
                      ;
                      (f = (++d && f && f[v]) || (p = d = 0) || h.pop()) &&
                      ((s
                        ? f.nodeName.toLowerCase() !== m
                        : 1 !== f.nodeType) ||
                        !++p ||
                        (y && ((f[R] || (f[R] = {}))[e] = [I, p]), f !== t));

                    );
                  return (p -= o) === r || (p % r == 0 && p / r >= 0);
                }
              };
        },
        PSEUDO: function(e, n) {
          var o,
            i =
              C.pseudos[e] ||
              C.setFilters[e.toLowerCase()] ||
              t.error('unsupported pseudo: ' + e);
          return i[R]
            ? i(n)
            : i.length > 1
            ? ((o = [e, e, '', n]),
              C.setFilters.hasOwnProperty(e.toLowerCase())
                ? r(function(e, t) {
                    for (var r, o = i(e, n), a = o.length; a--; )
                      e[(r = te.call(e, o[a]))] = !(t[r] = o[a]);
                  })
                : function(e) {
                    return i(e, 0, o);
                  })
            : i;
        }
      },
      pseudos: {
        not: r(function(e) {
          var t = [],
            n = [],
            o = E(e.replace(ue, '$1'));
          return o[R]
            ? r(function(e, t, n, r) {
                for (var i, a = o(e, null, r, []), s = e.length; s--; )
                  (i = a[s]) && (e[s] = !(t[s] = i));
              })
            : function(e, r, i) {
                return (t[0] = e), o(t, null, i, n), !n.pop();
              };
        }),
        has: r(function(e) {
          return function(n) {
            return t(e, n).length > 0;
          };
        }),
        contains: r(function(e) {
          return function(t) {
            return (t.textContent || t.innerText || k(t)).indexOf(e) > -1;
          };
        }),
        lang: r(function(e) {
          return (
            de.test(e || '') || t.error('unsupported lang: ' + e),
            (e = e.replace(we, Ce).toLowerCase()),
            function(t) {
              var n;
              do {
                if (
                  (n = L
                    ? t.lang
                    : t.getAttribute('xml:lang') || t.getAttribute('lang'))
                )
                  return (
                    (n = n.toLowerCase()) === e || 0 === n.indexOf(e + '-')
                  );
              } while ((t = t.parentNode) && 1 === t.nodeType);
              return !1;
            }
          );
        }),
        target: function(t) {
          var n = e.location && e.location.hash;
          return n && n.slice(1) === t.id;
        },
        root: function(e) {
          return e === O;
        },
        focus: function(e) {
          return (
            e === A.activeElement &&
            (!A.hasFocus || A.hasFocus()) &&
            !!(e.type || e.href || ~e.tabIndex)
          );
        },
        enabled: function(e) {
          return !1 === e.disabled;
        },
        disabled: function(e) {
          return !0 === e.disabled;
        },
        checked: function(e) {
          var t = e.nodeName.toLowerCase();
          return (
            ('input' === t && !!e.checked) || ('option' === t && !!e.selected)
          );
        },
        selected: function(e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
        },
        empty: function(e) {
          for (e = e.firstChild; e; e = e.nextSibling)
            if (e.nodeType < 6) return !1;
          return !0;
        },
        parent: function(e) {
          return !C.pseudos.empty(e);
        },
        header: function(e) {
          return ge.test(e.nodeName);
        },
        input: function(e) {
          return ve.test(e.nodeName);
        },
        button: function(e) {
          var t = e.nodeName.toLowerCase();
          return ('input' === t && 'button' === e.type) || 'button' === t;
        },
        text: function(e) {
          var t;
          return (
            'input' === e.nodeName.toLowerCase() &&
            'text' === e.type &&
            (null == (t = e.getAttribute('type')) || 'text' === t.toLowerCase())
          );
        },
        first: c(function() {
          return [0];
        }),
        last: c(function(e, t) {
          return [t - 1];
        }),
        eq: c(function(e, t, n) {
          return [0 > n ? n + t : n];
        }),
        even: c(function(e, t) {
          for (var n = 0; t > n; n += 2) e.push(n);
          return e;
        }),
        odd: c(function(e, t) {
          for (var n = 1; t > n; n += 2) e.push(n);
          return e;
        }),
        lt: c(function(e, t, n) {
          for (var r = 0 > n ? n + t : n; --r >= 0; ) e.push(r);
          return e;
        }),
        gt: c(function(e, t, n) {
          for (var r = 0 > n ? n + t : n; ++r < t; ) e.push(r);
          return e;
        })
      }
    }).pseudos.nth = C.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      C.pseudos[x] = s(x);
    for (x in { submit: !0, reset: !0 }) C.pseudos[x] = u(x);
    return (
      (f.prototype = C.filters = C.pseudos),
      (C.setFilters = new f()),
      (_ = t.tokenize = function(e, n) {
        var r,
          o,
          i,
          a,
          s,
          u,
          c,
          l = U[e + ' '];
        if (l) return n ? 0 : l.slice(0);
        for (s = e, u = [], c = C.preFilter; s; ) {
          for (a in ((!r || (o = ce.exec(s))) &&
            (o && (s = s.slice(o[0].length) || s), u.push((i = []))),
          (r = !1),
          (o = le.exec(s)) &&
            ((r = o.shift()),
            i.push({ value: r, type: o[0].replace(ue, ' ') }),
            (s = s.slice(r.length))),
          C.filter))
            !(o = he[a].exec(s)) ||
              (c[a] && !(o = c[a](o))) ||
              ((r = o.shift()),
              i.push({ value: r, type: a, matches: o }),
              (s = s.slice(r.length)));
          if (!r) break;
        }
        return n ? s.length : s ? t.error(e) : U(e, u).slice(0);
      }),
      (E = t.compile = function(e, t) {
        var n,
          r = [],
          o = [],
          i = z[e + ' '];
        if (!i) {
          for (t || (t = _(e)), n = t.length; n--; )
            (i = y(t[n]))[R] ? r.push(i) : o.push(i);
          (i = z(e, b(o, r))).selector = e;
        }
        return i;
      }),
      (j = t.select = function(e, t, n, r) {
        var o,
          i,
          a,
          s,
          u,
          c = 'function' == typeof e && e,
          f = !r && _((e = c.selector || e));
        if (((n = n || []), 1 === f.length)) {
          if (
            (i = f[0] = f[0].slice(0)).length > 2 &&
            'ID' === (a = i[0]).type &&
            w.getById &&
            9 === t.nodeType &&
            L &&
            C.relative[i[1].type]
          ) {
            if (!(t = (C.find.ID(a.matches[0].replace(we, Ce), t) || [])[0]))
              return n;
            c && (t = t.parentNode), (e = e.slice(i.shift().value.length));
          }
          for (
            o = he.needsContext.test(e) ? 0 : i.length;
            o-- && ((a = i[o]), !C.relative[(s = a.type)]);

          )
            if (
              (u = C.find[s]) &&
              (r = u(
                a.matches[0].replace(we, Ce),
                (be.test(i[0].type) && l(t.parentNode)) || t
              ))
            ) {
              if ((i.splice(o, 1), !(e = r.length && p(i))))
                return Z.apply(n, r), n;
              break;
            }
        }
        return (
          (c || E(e, f))(r, t, !L, n, (be.test(e) && l(t.parentNode)) || t), n
        );
      }),
      (w.sortStable =
        R.split('')
          .sort(X)
          .join('') === R),
      (w.detectDuplicates = !!D),
      $(),
      (w.sortDetached = o(function(e) {
        return 1 & e.compareDocumentPosition(A.createElement('div'));
      })),
      o(function(e) {
        return (
          (e.innerHTML = "<a href='#'></a>"),
          '#' === e.firstChild.getAttribute('href')
        );
      }) ||
        i('type|href|height|width', function(e, t, n) {
          return n
            ? void 0
            : e.getAttribute(t, 'type' === t.toLowerCase() ? 1 : 2);
        }),
      (w.attributes &&
        o(function(e) {
          return (
            (e.innerHTML = '<input/>'),
            e.firstChild.setAttribute('value', ''),
            '' === e.firstChild.getAttribute('value')
          );
        })) ||
        i('value', function(e, t, n) {
          return n || 'input' !== e.nodeName.toLowerCase()
            ? void 0
            : e.defaultValue;
        }),
      o(function(e) {
        return null == e.getAttribute('disabled');
      }) ||
        i(ne, function(e, t, n) {
          var r;
          return n
            ? void 0
            : !0 === e[t]
            ? t.toLowerCase()
            : (r = e.getAttributeNode(t)) && r.specified
            ? r.value
            : null;
        }),
      t
    );
  })(e);
  (Z.find = oe),
    (Z.expr = oe.selectors),
    (Z.expr[':'] = Z.expr.pseudos),
    (Z.unique = oe.uniqueSort),
    (Z.text = oe.getText),
    (Z.isXMLDoc = oe.isXML),
    (Z.contains = oe.contains);
  var ie = Z.expr.match.needsContext,
    ae = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    se = /^.[^:#\[\.,]*$/;
  (Z.filter = function(e, t, n) {
    var r = t[0];
    return (
      n && (e = ':not(' + e + ')'),
      1 === t.length && 1 === r.nodeType
        ? Z.find.matchesSelector(r, e)
          ? [r]
          : []
        : Z.find.matches(
            e,
            Z.grep(t, function(e) {
              return 1 === e.nodeType;
            })
          )
    );
  }),
    Z.fn.extend({
      find: function(e) {
        var t,
          n = this.length,
          r = [],
          o = this;
        if ('string' != typeof e)
          return this.pushStack(
            Z(e).filter(function() {
              for (t = 0; n > t; t++) if (Z.contains(o[t], this)) return !0;
            })
          );
        for (t = 0; n > t; t++) Z.find(e, o[t], r);
        return (
          ((r = this.pushStack(n > 1 ? Z.unique(r) : r)).selector = this
            .selector
            ? this.selector + ' ' + e
            : e),
          r
        );
      },
      filter: function(e) {
        return this.pushStack(r(this, e || [], !1));
      },
      not: function(e) {
        return this.pushStack(r(this, e || [], !0));
      },
      is: function(e) {
        return !!r(
          this,
          'string' == typeof e && ie.test(e) ? Z(e) : e || [],
          !1
        ).length;
      }
    });
  var ue,
    ce = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  ((Z.fn.init = function(e, t) {
    var n, r;
    if (!e) return this;
    if ('string' == typeof e) {
      if (
        !(n =
          '<' === e[0] && '>' === e[e.length - 1] && e.length >= 3
            ? [null, e, null]
            : ce.exec(e)) ||
        (!n[1] && t)
      )
        return !t || t.jquery ? (t || ue).find(e) : this.constructor(t).find(e);
      if (n[1]) {
        if (
          ((t = t instanceof Z ? t[0] : t),
          Z.merge(
            this,
            Z.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : G, !0)
          ),
          ae.test(n[1]) && Z.isPlainObject(t))
        )
          for (n in t)
            Z.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
        return this;
      }
      return (
        (r = G.getElementById(n[2])) &&
          r.parentNode &&
          ((this.length = 1), (this[0] = r)),
        (this.context = G),
        (this.selector = e),
        this
      );
    }
    return e.nodeType
      ? ((this.context = this[0] = e), (this.length = 1), this)
      : Z.isFunction(e)
      ? 'undefined' != typeof ue.ready
        ? ue.ready(e)
        : e(Z)
      : (void 0 !== e.selector &&
          ((this.selector = e.selector), (this.context = e.context)),
        Z.makeArray(e, this));
  }).prototype = Z.fn),
    (ue = Z(G));
  var le = /^(?:parents|prev(?:Until|All))/,
    fe = { children: !0, contents: !0, next: !0, prev: !0 };
  Z.extend({
    dir: function(e, t, n) {
      for (var r = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
        if (1 === e.nodeType) {
          if (o && Z(e).is(n)) break;
          r.push(e);
        }
      return r;
    },
    sibling: function(e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    }
  }),
    Z.fn.extend({
      has: function(e) {
        var t = Z(e, this),
          n = t.length;
        return this.filter(function() {
          for (var e = 0; n > e; e++) if (Z.contains(this, t[e])) return !0;
        });
      },
      closest: function(e, t) {
        for (
          var n,
            r = 0,
            o = this.length,
            i = [],
            a =
              ie.test(e) || 'string' != typeof e ? Z(e, t || this.context) : 0;
          o > r;
          r++
        )
          for (n = this[r]; n && n !== t; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (a
                ? a.index(n) > -1
                : 1 === n.nodeType && Z.find.matchesSelector(n, e))
            ) {
              i.push(n);
              break;
            }
        return this.pushStack(i.length > 1 ? Z.unique(i) : i);
      },
      index: function(e) {
        return e
          ? 'string' == typeof e
            ? X.call(Z(e), this[0])
            : X.call(this, e.jquery ? e[0] : e)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function(e, t) {
        return this.pushStack(Z.unique(Z.merge(this.get(), Z(e, t))));
      },
      addBack: function(e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      }
    }),
    Z.each(
      {
        parent: function(e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function(e) {
          return Z.dir(e, 'parentNode');
        },
        parentsUntil: function(e, t, n) {
          return Z.dir(e, 'parentNode', n);
        },
        next: function(e) {
          return o(e, 'nextSibling');
        },
        prev: function(e) {
          return o(e, 'previousSibling');
        },
        nextAll: function(e) {
          return Z.dir(e, 'nextSibling');
        },
        prevAll: function(e) {
          return Z.dir(e, 'previousSibling');
        },
        nextUntil: function(e, t, n) {
          return Z.dir(e, 'nextSibling', n);
        },
        prevUntil: function(e, t, n) {
          return Z.dir(e, 'previousSibling', n);
        },
        siblings: function(e) {
          return Z.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
          return Z.sibling(e.firstChild);
        },
        contents: function(e) {
          return e.contentDocument || Z.merge([], e.childNodes);
        }
      },
      function(e, t) {
        Z.fn[e] = function(n, r) {
          var o = Z.map(this, t, n);
          return (
            'Until' !== e.slice(-5) && (r = n),
            r && 'string' == typeof r && (o = Z.filter(r, o)),
            this.length > 1 &&
              (fe[e] || Z.unique(o), le.test(e) && o.reverse()),
            this.pushStack(o)
          );
        };
      }
    );
  var pe,
    de = /\S+/g,
    he = {};
  (Z.Callbacks = function(e) {
    e = 'string' == typeof e ? he[e] || i(e) : Z.extend({}, e);
    var t,
      n,
      r,
      o,
      a,
      s,
      u = [],
      c = !e.once && [],
      l = function(i) {
        for (
          t = e.memory && i, n = !0, s = o || 0, o = 0, a = u.length, r = !0;
          u && a > s;
          s++
        )
          if (!1 === u[s].apply(i[0], i[1]) && e.stopOnFalse) {
            t = !1;
            break;
          }
        (r = !1),
          u && (c ? c.length && l(c.shift()) : t ? (u = []) : f.disable());
      },
      f = {
        add: function() {
          if (u) {
            var n = u.length;
            !(function i(t) {
              Z.each(t, function(t, n) {
                var r = Z.type(n);
                'function' === r
                  ? (e.unique && f.has(n)) || u.push(n)
                  : n && n.length && 'string' !== r && i(n);
              });
            })(arguments),
              r ? (a = u.length) : t && ((o = n), l(t));
          }
          return this;
        },
        remove: function() {
          return (
            u &&
              Z.each(arguments, function(e, t) {
                for (var n; (n = Z.inArray(t, u, n)) > -1; )
                  u.splice(n, 1), r && (a >= n && a--, s >= n && s--);
              }),
            this
          );
        },
        has: function(e) {
          return e ? Z.inArray(e, u) > -1 : !(!u || !u.length);
        },
        empty: function() {
          return (u = []), (a = 0), this;
        },
        disable: function() {
          return (u = c = t = void 0), this;
        },
        disabled: function() {
          return !u;
        },
        lock: function() {
          return (c = void 0), t || f.disable(), this;
        },
        locked: function() {
          return !c;
        },
        fireWith: function(e, t) {
          return (
            !u ||
              (n && !c) ||
              ((t = [e, (t = t || []).slice ? t.slice() : t]),
              r ? c.push(t) : l(t)),
            this
          );
        },
        fire: function() {
          return f.fireWith(this, arguments), this;
        },
        fired: function() {
          return !!n;
        }
      };
    return f;
  }),
    Z.extend({
      Deferred: function(e) {
        var t = [
            ['resolve', 'done', Z.Callbacks('once memory'), 'resolved'],
            ['reject', 'fail', Z.Callbacks('once memory'), 'rejected'],
            ['notify', 'progress', Z.Callbacks('memory')]
          ],
          n = 'pending',
          r = {
            state: function() {
              return n;
            },
            always: function() {
              return o.done(arguments).fail(arguments), this;
            },
            then: function() {
              var e = arguments;
              return Z.Deferred(function(n) {
                Z.each(t, function(t, i) {
                  var a = Z.isFunction(e[t]) && e[t];
                  o[i[1]](function() {
                    var e = a && a.apply(this, arguments);
                    e && Z.isFunction(e.promise)
                      ? e
                          .promise()
                          .done(n.resolve)
                          .fail(n.reject)
                          .progress(n.notify)
                      : n[i[0] + 'With'](
                          this === r ? n.promise() : this,
                          a ? [e] : arguments
                        );
                  });
                }),
                  (e = null);
              }).promise();
            },
            promise: function(e) {
              return null != e ? Z.extend(e, r) : r;
            }
          },
          o = {};
        return (
          (r.pipe = r.then),
          Z.each(t, function(e, i) {
            var a = i[2],
              s = i[3];
            (r[i[1]] = a.add),
              s &&
                a.add(
                  function() {
                    n = s;
                  },
                  t[1 ^ e][2].disable,
                  t[2][2].lock
                ),
              (o[i[0]] = function() {
                return o[i[0] + 'With'](this === o ? r : this, arguments), this;
              }),
              (o[i[0] + 'With'] = a.fireWith);
          }),
          r.promise(o),
          e && e.call(o, o),
          o
        );
      },
      when: function(e) {
        var t,
          n,
          r,
          o = 0,
          i = W.call(arguments),
          a = i.length,
          s = 1 !== a || (e && Z.isFunction(e.promise)) ? a : 0,
          u = 1 === s ? e : Z.Deferred(),
          c = function(e, n, r) {
            return function(o) {
              (n[e] = this),
                (r[e] = arguments.length > 1 ? W.call(arguments) : o),
                r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r);
            };
          };
        if (a > 1)
          for (t = new Array(a), n = new Array(a), r = new Array(a); a > o; o++)
            i[o] && Z.isFunction(i[o].promise)
              ? i[o]
                  .promise()
                  .done(c(o, r, i))
                  .fail(u.reject)
                  .progress(c(o, n, t))
              : --s;
        return s || u.resolveWith(r, i), u.promise();
      }
    }),
    (Z.fn.ready = function(e) {
      return Z.ready.promise().done(e), this;
    }),
    Z.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function(e) {
        e ? Z.readyWait++ : Z.ready(!0);
      },
      ready: function(e) {
        (!0 === e ? --Z.readyWait : Z.isReady) ||
          ((Z.isReady = !0),
          (!0 !== e && --Z.readyWait > 0) ||
            (pe.resolveWith(G, [Z]),
            Z.fn.triggerHandler &&
              (Z(G).triggerHandler('ready'), Z(G).off('ready'))));
      }
    }),
    (Z.ready.promise = function(t) {
      return (
        pe ||
          ((pe = Z.Deferred()),
          'complete' === G.readyState
            ? setTimeout(Z.ready)
            : (G.addEventListener('DOMContentLoaded', a, !1),
              e.addEventListener('load', a, !1))),
        pe.promise(t)
      );
    }),
    Z.ready.promise();
  var ve = (Z.access = function(e, t, n, r, o, i, a) {
    var s = 0,
      u = e.length,
      c = null == n;
    if ('object' === Z.type(n))
      for (s in ((o = !0), n)) Z.access(e, t, s, n[s], !0, i, a);
    else if (
      void 0 !== r &&
      ((o = !0),
      Z.isFunction(r) || (a = !0),
      c &&
        (a
          ? (t.call(e, r), (t = null))
          : ((c = t),
            (t = function(e, t, n) {
              return c.call(Z(e), n);
            }))),
      t)
    )
      for (; u > s; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
    return o ? e : c ? t.call(e) : u ? t(e[0], n) : i;
  });
  (Z.acceptData = function(e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  }),
    (s.uid = 1),
    (s.accepts = Z.acceptData),
    (s.prototype = {
      key: function(e) {
        if (!s.accepts(e)) return 0;
        var t = {},
          n = e[this.expando];
        if (!n) {
          n = s.uid++;
          try {
            (t[this.expando] = { value: n }), Object.defineProperties(e, t);
          } catch (W) {
            (t[this.expando] = n), Z.extend(e, t);
          }
        }
        return this.cache[n] || (this.cache[n] = {}), n;
      },
      set: function(e, t, n) {
        var r,
          o = this.key(e),
          i = this.cache[o];
        if ('string' == typeof t) i[t] = n;
        else if (Z.isEmptyObject(i)) Z.extend(this.cache[o], t);
        else for (r in t) i[r] = t[r];
        return i;
      },
      get: function(e, t) {
        var n = this.cache[this.key(e)];
        return void 0 === t ? n : n[t];
      },
      access: function(e, t, n) {
        var r;
        return void 0 === t || (t && 'string' == typeof t && void 0 === n)
          ? void 0 !== (r = this.get(e, t))
            ? r
            : this.get(e, Z.camelCase(t))
          : (this.set(e, t, n), void 0 !== n ? n : t);
      },
      remove: function(e, t) {
        var n,
          r,
          o,
          i = this.key(e),
          a = this.cache[i];
        if (void 0 === t) this.cache[i] = {};
        else {
          Z.isArray(t)
            ? (r = t.concat(t.map(Z.camelCase)))
            : ((o = Z.camelCase(t)),
              t in a
                ? (r = [t, o])
                : (r = (r = o) in a ? [r] : r.match(de) || [])),
            (n = r.length);
          for (; n--; ) delete a[r[n]];
        }
      },
      hasData: function(e) {
        return !Z.isEmptyObject(this.cache[e[this.expando]] || {});
      },
      discard: function(e) {
        e[this.expando] && delete this.cache[e[this.expando]];
      }
    });
  var ge = new s(),
    me = new s(),
    ye = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    be = /([A-Z])/g;
  Z.extend({
    hasData: function(e) {
      return me.hasData(e) || ge.hasData(e);
    },
    data: function(e, t, n) {
      return me.access(e, t, n);
    },
    removeData: function(e, t) {
      me.remove(e, t);
    },
    _data: function(e, t, n) {
      return ge.access(e, t, n);
    },
    _removeData: function(e, t) {
      ge.remove(e, t);
    }
  }),
    Z.fn.extend({
      data: function(e, t) {
        var n,
          r,
          o,
          i = this[0],
          a = i && i.attributes;
        if (void 0 === e) {
          if (
            this.length &&
            ((o = me.get(i)), 1 === i.nodeType && !ge.get(i, 'hasDataAttrs'))
          ) {
            for (n = a.length; n--; )
              a[n] &&
                0 === (r = a[n].name).indexOf('data-') &&
                  ((r = Z.camelCase(r.slice(5))), u(i, r, o[r]));
            ge.set(i, 'hasDataAttrs', !0);
          }
          return o;
        }
        return 'object' == typeof e
          ? this.each(function() {
              me.set(this, e);
            })
          : ve(
              this,
              function(t) {
                var n,
                  r = Z.camelCase(e);
                if (i && void 0 === t) {
                  if (void 0 !== (n = me.get(i, e))) return n;
                  if (void 0 !== (n = me.get(i, r))) return n;
                  if (void 0 !== (n = u(i, r, void 0))) return n;
                } else
                  this.each(function() {
                    var n = me.get(this, r);
                    me.set(this, r, t),
                      -1 !== e.indexOf('-') &&
                        void 0 !== n &&
                        me.set(this, e, t);
                  });
              },
              null,
              t,
              arguments.length > 1,
              null,
              !0
            );
      },
      removeData: function(e) {
        return this.each(function() {
          me.remove(this, e);
        });
      }
    }),
    Z.extend({
      queue: function(e, t, n) {
        var r;
        return e
          ? ((t = (t || 'fx') + 'queue'),
            (r = ge.get(e, t)),
            n &&
              (!r || Z.isArray(n)
                ? (r = ge.access(e, t, Z.makeArray(n)))
                : r.push(n)),
            r || [])
          : void 0;
      },
      dequeue: function(e, t) {
        t = t || 'fx';
        var n = Z.queue(e, t),
          r = n.length,
          o = n.shift(),
          i = Z._queueHooks(e, t),
          a = function() {
            Z.dequeue(e, t);
          };
        'inprogress' === o && ((o = n.shift()), r--),
          o &&
            ('fx' === t && n.unshift('inprogress'),
            delete i.stop,
            o.call(e, a, i)),
          !r && i && i.empty.fire();
      },
      _queueHooks: function(e, t) {
        var n = t + 'queueHooks';
        return (
          ge.get(e, n) ||
          ge.access(e, n, {
            empty: Z.Callbacks('once memory').add(function() {
              ge.remove(e, [t + 'queue', n]);
            })
          })
        );
      }
    }),
    Z.fn.extend({
      queue: function(e, t) {
        var n = 2;
        return (
          'string' != typeof e && ((t = e), (e = 'fx'), n--),
          arguments.length < n
            ? Z.queue(this[0], e)
            : void 0 === t
            ? this
            : this.each(function() {
                var n = Z.queue(this, e, t);
                Z._queueHooks(this, e),
                  'fx' === e && 'inprogress' !== n[0] && Z.dequeue(this, e);
              })
        );
      },
      dequeue: function(e) {
        return this.each(function() {
          Z.dequeue(this, e);
        });
      },
      clearQueue: function(e) {
        return this.queue(e || 'fx', []);
      },
      promise: function(e, t) {
        var n,
          r = 1,
          o = Z.Deferred(),
          i = this,
          a = this.length,
          s = function() {
            --r || o.resolveWith(i, [i]);
          };
        for (
          'string' != typeof e && ((t = e), (e = void 0)), e = e || 'fx';
          a--;

        )
          (n = ge.get(i[a], e + 'queueHooks')) &&
            n.empty &&
            (r++, n.empty.add(s));
        return s(), o.promise(t);
      }
    });
  var xe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    we = ['Top', 'Right', 'Bottom', 'Left'],
    Ce = function(e, t) {
      return (
        (e = t || e),
        'none' === Z.css(e, 'display') || !Z.contains(e.ownerDocument, e)
      );
    },
    ke = /^(?:checkbox|radio)$/i;
  !(function() {
    var e = G.createDocumentFragment().appendChild(G.createElement('div')),
      t = G.createElement('input');
    t.setAttribute('type', 'radio'),
      t.setAttribute('checked', 'checked'),
      t.setAttribute('name', 't'),
      e.appendChild(t),
      (Y.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (e.innerHTML = '<textarea>x</textarea>'),
      (Y.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue);
  })();
  var Te = 'undefined';
  Y.focusinBubbles = 'onfocusin' in e;
  var _e = /^key/,
    Ee = /^(?:mouse|pointer|contextmenu)|click/,
    je = /^(?:focusinfocus|focusoutblur)$/,
    Ne = /^([^.]*)(?:\.(.+)|)$/;
  (Z.event = {
    global: {},
    add: function(e, t, n, r, o) {
      var i,
        a,
        s,
        u,
        c,
        l,
        f,
        p,
        d,
        h,
        v,
        g = ge.get(e);
      if (g)
        for (
          n.handler && ((n = (i = n).handler), (o = i.selector)),
            n.guid || (n.guid = Z.guid++),
            (u = g.events) || (u = g.events = {}),
            (a = g.handle) ||
              (a = g.handle = function(t) {
                return typeof Z !== Te && Z.event.triggered !== t.type
                  ? Z.event.dispatch.apply(e, arguments)
                  : void 0;
              }),
            c = (t = (t || '').match(de) || ['']).length;
          c--;

        )
          (d = v = (s = Ne.exec(t[c]) || [])[1]),
            (h = (s[2] || '').split('.').sort()),
            d &&
              ((f = Z.event.special[d] || {}),
              (d = (o ? f.delegateType : f.bindType) || d),
              (f = Z.event.special[d] || {}),
              (l = Z.extend(
                {
                  type: d,
                  origType: v,
                  data: r,
                  handler: n,
                  guid: n.guid,
                  selector: o,
                  needsContext: o && Z.expr.match.needsContext.test(o),
                  namespace: h.join('.')
                },
                i
              )),
              (p = u[d]) ||
                (((p = u[d] = []).delegateCount = 0),
                (f.setup && !1 !== f.setup.call(e, r, h, a)) ||
                  (e.addEventListener && e.addEventListener(d, a, !1))),
              f.add &&
                (f.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)),
              o ? p.splice(p.delegateCount++, 0, l) : p.push(l),
              (Z.event.global[d] = !0));
    },
    remove: function(e, t, n, r, o) {
      var i,
        a,
        s,
        u,
        c,
        l,
        f,
        p,
        d,
        h,
        v,
        g = ge.hasData(e) && ge.get(e);
      if (g && (u = g.events)) {
        for (c = (t = (t || '').match(de) || ['']).length; c--; )
          if (
            ((d = v = (s = Ne.exec(t[c]) || [])[1]),
            (h = (s[2] || '').split('.').sort()),
            d)
          ) {
            for (
              f = Z.event.special[d] || {},
                p = u[(d = (r ? f.delegateType : f.bindType) || d)] || [],
                s =
                  s[2] &&
                  new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)'),
                a = i = p.length;
              i--;

            )
              (l = p[i]),
                (!o && v !== l.origType) ||
                  (n && n.guid !== l.guid) ||
                  (s && !s.test(l.namespace)) ||
                  (r && r !== l.selector && ('**' !== r || !l.selector)) ||
                  (p.splice(i, 1),
                  l.selector && p.delegateCount--,
                  f.remove && f.remove.call(e, l));
            a &&
              !p.length &&
              ((f.teardown && !1 !== f.teardown.call(e, h, g.handle)) ||
                Z.removeEvent(e, d, g.handle),
              delete u[d]);
          } else for (d in u) Z.event.remove(e, d + t[c], n, r, !0);
        Z.isEmptyObject(u) && (delete g.handle, ge.remove(e, 'events'));
      }
    },
    trigger: function(t, n, r, o) {
      var i,
        a,
        s,
        u,
        c,
        l,
        f,
        p = [r || G],
        d = K.call(t, 'type') ? t.type : t,
        h = K.call(t, 'namespace') ? t.namespace.split('.') : [];
      if (
        ((a = s = r = r || G),
        3 !== r.nodeType &&
          8 !== r.nodeType &&
          !je.test(d + Z.event.triggered) &&
          (d.indexOf('.') >= 0 && ((d = (h = d.split('.')).shift()), h.sort()),
          (c = d.indexOf(':') < 0 && 'on' + d),
          ((t = t[Z.expando]
            ? t
            : new Z.Event(d, 'object' == typeof t && t)).isTrigger = o ? 2 : 3),
          (t.namespace = h.join('.')),
          (t.namespace_re = t.namespace
            ? new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)')
            : null),
          (t.result = void 0),
          t.target || (t.target = r),
          (n = null == n ? [t] : Z.makeArray(n, [t])),
          (f = Z.event.special[d] || {}),
          o || !f.trigger || !1 !== f.trigger.apply(r, n)))
      ) {
        if (!o && !f.noBubble && !Z.isWindow(r)) {
          for (
            u = f.delegateType || d, je.test(u + d) || (a = a.parentNode);
            a;
            a = a.parentNode
          )
            p.push(a), (s = a);
          s === (r.ownerDocument || G) &&
            p.push(s.defaultView || s.parentWindow || e);
        }
        for (i = 0; (a = p[i++]) && !t.isPropagationStopped(); )
          (t.type = i > 1 ? u : f.bindType || d),
            (l = (ge.get(a, 'events') || {})[t.type] && ge.get(a, 'handle')) &&
              l.apply(a, n),
            (l = c && a[c]) &&
              l.apply &&
              Z.acceptData(a) &&
              ((t.result = l.apply(a, n)),
              !1 === t.result && t.preventDefault());
        return (
          (t.type = d),
          o ||
            t.isDefaultPrevented() ||
            (f._default && !1 !== f._default.apply(p.pop(), n)) ||
            !Z.acceptData(r) ||
            (c &&
              Z.isFunction(r[d]) &&
              !Z.isWindow(r) &&
              ((s = r[c]) && (r[c] = null),
              (Z.event.triggered = d),
              r[d](),
              (Z.event.triggered = void 0),
              s && (r[c] = s))),
          t.result
        );
      }
    },
    dispatch: function(e) {
      e = Z.event.fix(e);
      var t,
        n,
        r,
        o,
        i,
        a = [],
        s = W.call(arguments),
        u = (ge.get(this, 'events') || {})[e.type] || [],
        c = Z.event.special[e.type] || {};
      if (
        ((s[0] = e),
        (e.delegateTarget = this),
        !c.preDispatch || !1 !== c.preDispatch.call(this, e))
      ) {
        for (
          a = Z.event.handlers.call(this, e, u), t = 0;
          (o = a[t++]) && !e.isPropagationStopped();

        )
          for (
            e.currentTarget = o.elem, n = 0;
            (i = o.handlers[n++]) && !e.isImmediatePropagationStopped();

          )
            (!e.namespace_re || e.namespace_re.test(i.namespace)) &&
              ((e.handleObj = i),
              (e.data = i.data),
              void 0 !==
                (r = (
                  (Z.event.special[i.origType] || {}).handle || i.handler
                ).apply(o.elem, s)) &&
                !1 === (e.result = r) &&
                (e.preventDefault(), e.stopPropagation()));
        return c.postDispatch && c.postDispatch.call(this, e), e.result;
      }
    },
    handlers: function(e, t) {
      var n,
        r,
        o,
        i,
        a = [],
        s = t.delegateCount,
        u = e.target;
      if (s && u.nodeType && (!e.button || 'click' !== e.type))
        for (; u !== this; u = u.parentNode || this)
          if (!0 !== u.disabled || 'click' !== e.type) {
            for (r = [], n = 0; s > n; n++)
              void 0 === r[(o = (i = t[n]).selector + ' ')] &&
                (r[o] = i.needsContext
                  ? Z(o, this).index(u) >= 0
                  : Z.find(o, this, null, [u]).length),
                r[o] && r.push(i);
            r.length && a.push({ elem: u, handlers: r });
          }
      return s < t.length && a.push({ elem: this, handlers: t.slice(s) }), a;
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(
      ' '
    ),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function(e, t) {
        return (
          null == e.which &&
            (e.which = null != t.charCode ? t.charCode : t.keyCode),
          e
        );
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement'.split(
        ' '
      ),
      filter: function(e, t) {
        var n,
          r,
          o,
          i = t.button;
        return (
          null == e.pageX &&
            null != t.clientX &&
            ((r = (n = e.target.ownerDocument || G).documentElement),
            (o = n.body),
            (e.pageX =
              t.clientX +
              ((r && r.scrollLeft) || (o && o.scrollLeft) || 0) -
              ((r && r.clientLeft) || (o && o.clientLeft) || 0)),
            (e.pageY =
              t.clientY +
              ((r && r.scrollTop) || (o && o.scrollTop) || 0) -
              ((r && r.clientTop) || (o && o.clientTop) || 0))),
          e.which ||
            void 0 === i ||
            (e.which = 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0),
          e
        );
      }
    },
    fix: function(e) {
      if (e[Z.expando]) return e;
      var t,
        n,
        r,
        o = e.type,
        i = e,
        a = this.fixHooks[o];
      for (
        a ||
          (this.fixHooks[o] = a = Ee.test(o)
            ? this.mouseHooks
            : _e.test(o)
            ? this.keyHooks
            : {}),
          r = a.props ? this.props.concat(a.props) : this.props,
          e = new Z.Event(i),
          t = r.length;
        t--;

      )
        e[(n = r[t])] = i[n];
      return (
        e.target || (e.target = G),
        3 === e.target.nodeType && (e.target = e.target.parentNode),
        a.filter ? a.filter(e, i) : e
      );
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function() {
          return this !== f() && this.focus ? (this.focus(), !1) : void 0;
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function() {
          return this === f() && this.blur ? (this.blur(), !1) : void 0;
        },
        delegateType: 'focusout'
      },
      click: {
        trigger: function() {
          return 'checkbox' === this.type &&
            this.click &&
            Z.nodeName(this, 'input')
            ? (this.click(), !1)
            : void 0;
        },
        _default: function(e) {
          return Z.nodeName(e.target, 'a');
        }
      },
      beforeunload: {
        postDispatch: function(e) {
          void 0 !== e.result &&
            e.originalEvent &&
            (e.originalEvent.returnValue = e.result);
        }
      }
    },
    simulate: function(e, t, n, r) {
      var o = Z.extend(new Z.Event(), n, {
        type: e,
        isSimulated: !0,
        originalEvent: {}
      });
      r ? Z.event.trigger(o, null, t) : Z.event.dispatch.call(t, o),
        o.isDefaultPrevented() && n.preventDefault();
    }
  }),
    (Z.removeEvent = function(e, t, n) {
      e.removeEventListener && e.removeEventListener(t, n, !1);
    }),
    (Z.Event = function(e, t) {
      return this instanceof Z.Event
        ? (e && e.type
            ? ((this.originalEvent = e),
              (this.type = e.type),
              (this.isDefaultPrevented =
                e.defaultPrevented ||
                (void 0 === e.defaultPrevented && !1 === e.returnValue)
                  ? c
                  : l))
            : (this.type = e),
          t && Z.extend(this, t),
          (this.timeStamp = (e && e.timeStamp) || Z.now()),
          void (this[Z.expando] = !0))
        : new Z.Event(e, t);
    }),
    (Z.Event.prototype = {
      isDefaultPrevented: l,
      isPropagationStopped: l,
      isImmediatePropagationStopped: l,
      preventDefault: function() {
        var e = this.originalEvent;
        (this.isDefaultPrevented = c),
          e && e.preventDefault && e.preventDefault();
      },
      stopPropagation: function() {
        var e = this.originalEvent;
        (this.isPropagationStopped = c),
          e && e.stopPropagation && e.stopPropagation();
      },
      stopImmediatePropagation: function() {
        var e = this.originalEvent;
        (this.isImmediatePropagationStopped = c),
          e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
          this.stopPropagation();
      }
    }),
    Z.each(
      {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        pointerenter: 'pointerover',
        pointerleave: 'pointerout'
      },
      function(e, t) {
        Z.event.special[e] = {
          delegateType: t,
          bindType: t,
          handle: function(e) {
            var n,
              r = this,
              o = e.relatedTarget,
              i = e.handleObj;
            return (
              (!o || (o !== r && !Z.contains(r, o))) &&
                ((e.type = i.origType),
                (n = i.handler.apply(this, arguments)),
                (e.type = t)),
              n
            );
          }
        };
      }
    ),
    Y.focusinBubbles ||
      Z.each({ focus: 'focusin', blur: 'focusout' }, function(e, t) {
        var n = function(e) {
          Z.event.simulate(t, e.target, Z.event.fix(e), !0);
        };
        Z.event.special[t] = {
          setup: function() {
            var r = this.ownerDocument || this,
              o = ge.access(r, t);
            o || r.addEventListener(e, n, !0), ge.access(r, t, (o || 0) + 1);
          },
          teardown: function() {
            var r = this.ownerDocument || this,
              o = ge.access(r, t) - 1;
            o
              ? ge.access(r, t, o)
              : (r.removeEventListener(e, n, !0), ge.remove(r, t));
          }
        };
      }),
    Z.fn.extend({
      on: function(e, t, n, r, o) {
        var i, a;
        if ('object' == typeof e) {
          for (a in ('string' != typeof t && ((n = n || t), (t = void 0)), e))
            this.on(a, t, n, e[a], o);
          return this;
        }
        if (
          (null == n && null == r
            ? ((r = t), (n = t = void 0))
            : null == r &&
              ('string' == typeof t
                ? ((r = n), (n = void 0))
                : ((r = n), (n = t), (t = void 0))),
          !1 === r)
        )
          r = l;
        else if (!r) return this;
        return (
          1 === o &&
            ((i = r),
            ((r = function(e) {
              return Z().off(e), i.apply(this, arguments);
            }).guid = i.guid || (i.guid = Z.guid++))),
          this.each(function() {
            Z.event.add(this, e, r, n, t);
          })
        );
      },
      one: function(e, t, n, r) {
        return this.on(e, t, n, r, 1);
      },
      off: function(e, t, n) {
        var r, o;
        if (e && e.preventDefault && e.handleObj)
          return (
            (r = e.handleObj),
            Z(e.delegateTarget).off(
              r.namespace ? r.origType + '.' + r.namespace : r.origType,
              r.selector,
              r.handler
            ),
            this
          );
        if ('object' == typeof e) {
          for (o in e) this.off(o, t, e[o]);
          return this;
        }
        return (
          (!1 === t || 'function' == typeof t) && ((n = t), (t = void 0)),
          !1 === n && (n = l),
          this.each(function() {
            Z.event.remove(this, e, n, t);
          })
        );
      },
      trigger: function(e, t) {
        return this.each(function() {
          Z.event.trigger(e, t, this);
        });
      },
      triggerHandler: function(e, t) {
        var n = this[0];
        return n ? Z.event.trigger(e, t, n, !0) : void 0;
      }
    });
  var Se = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    De = /<([\w:]+)/,
    $e = /<|&#?\w+;/,
    Ae = /<(?:script|style|link)/i,
    Oe = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Le = /^$|\/(?:java|ecma)script/i,
    qe = /^true\/(.*)/,
    He = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Me = {
      option: [1, "<select multiple='multiple'>", '</select>'],
      thead: [1, '<table>', '</table>'],
      col: [2, '<table><colgroup>', '</colgroup></table>'],
      tr: [2, '<table><tbody>', '</tbody></table>'],
      td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
      _default: [0, '', '']
    };
  (Me.optgroup = Me.option),
    (Me.tbody = Me.tfoot = Me.colgroup = Me.caption = Me.thead),
    (Me.th = Me.td),
    Z.extend({
      clone: function(e, t, n) {
        var r,
          o,
          i,
          a,
          s = e.cloneNode(!0),
          u = Z.contains(e.ownerDocument, e);
        if (
          !(
            Y.noCloneChecked ||
            (1 !== e.nodeType && 11 !== e.nodeType) ||
            Z.isXMLDoc(e)
          )
        )
          for (a = m(s), r = 0, o = (i = m(e)).length; o > r; r++)
            y(i[r], a[r]);
        if (t)
          if (n)
            for (i = i || m(e), a = a || m(s), r = 0, o = i.length; o > r; r++)
              g(i[r], a[r]);
          else g(e, s);
        return (a = m(s, 'script')).length > 0 && v(a, !u && m(e, 'script')), s;
      },
      buildFragment: function(e, t, n, r) {
        for (
          var o,
            i,
            a,
            s,
            u,
            c,
            l = t.createDocumentFragment(),
            f = [],
            p = 0,
            d = e.length;
          d > p;
          p++
        )
          if ((o = e[p]) || 0 === o)
            if ('object' === Z.type(o)) Z.merge(f, o.nodeType ? [o] : o);
            else if ($e.test(o)) {
              for (
                i = i || l.appendChild(t.createElement('div')),
                  a = (De.exec(o) || ['', ''])[1].toLowerCase(),
                  s = Me[a] || Me._default,
                  i.innerHTML = s[1] + o.replace(Se, '<$1></$2>') + s[2],
                  c = s[0];
                c--;

              )
                i = i.lastChild;
              Z.merge(f, i.childNodes), ((i = l.firstChild).textContent = '');
            } else f.push(t.createTextNode(o));
        for (l.textContent = '', p = 0; (o = f[p++]); )
          if (
            (!r || -1 === Z.inArray(o, r)) &&
            ((u = Z.contains(o.ownerDocument, o)),
            (i = m(l.appendChild(o), 'script')),
            u && v(i),
            n)
          )
            for (c = 0; (o = i[c++]); ) Le.test(o.type || '') && n.push(o);
        return l;
      },
      cleanData: function(e) {
        for (
          var t, n, r, o, i = Z.event.special, a = 0;
          void 0 !== (n = e[a]);
          a++
        ) {
          if (Z.acceptData(n) && (o = n[ge.expando]) && (t = ge.cache[o])) {
            if (t.events)
              for (r in t.events)
                i[r] ? Z.event.remove(n, r) : Z.removeEvent(n, r, t.handle);
            ge.cache[o] && delete ge.cache[o];
          }
          delete me.cache[n[me.expando]];
        }
      }
    }),
    Z.fn.extend({
      text: function(e) {
        return ve(
          this,
          function(e) {
            return void 0 === e
              ? Z.text(this)
              : this.empty().each(function() {
                  (1 === this.nodeType ||
                    11 === this.nodeType ||
                    9 === this.nodeType) &&
                    (this.textContent = e);
                });
          },
          null,
          e,
          arguments.length
        );
      },
      append: function() {
        return this.domManip(arguments, function(e) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            p(this, e).appendChild(e);
        });
      },
      prepend: function() {
        return this.domManip(arguments, function(e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = p(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function() {
        return this.domManip(arguments, function(e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function() {
        return this.domManip(arguments, function(e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      remove: function(e, t) {
        for (
          var n, r = e ? Z.filter(e, this) : this, o = 0;
          null != (n = r[o]);
          o++
        )
          t || 1 !== n.nodeType || Z.cleanData(m(n)),
            n.parentNode &&
              (t && Z.contains(n.ownerDocument, n) && v(m(n, 'script')),
              n.parentNode.removeChild(n));
        return this;
      },
      empty: function() {
        for (var e, t = 0; null != (e = this[t]); t++)
          1 === e.nodeType && (Z.cleanData(m(e, !1)), (e.textContent = ''));
        return this;
      },
      clone: function(e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function() {
            return Z.clone(this, e, t);
          })
        );
      },
      html: function(e) {
        return ve(
          this,
          function(e) {
            var t = this[0] || {},
              n = 0,
              r = this.length;
            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
            if (
              'string' == typeof e &&
              !Ae.test(e) &&
              !Me[(De.exec(e) || ['', ''])[1].toLowerCase()]
            ) {
              e = e.replace(Se, '<$1></$2>');
              try {
                for (; r > n; n++)
                  1 === (t = this[n] || {}).nodeType &&
                    (Z.cleanData(m(t, !1)), (t.innerHTML = e));
                t = 0;
              } catch (U) {}
            }
            t && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function() {
        var e = arguments[0];
        return (
          this.domManip(arguments, function(t) {
            (e = this.parentNode),
              Z.cleanData(m(this)),
              e && e.replaceChild(t, this);
          }),
          e && (e.length || e.nodeType) ? this : this.remove()
        );
      },
      detach: function(e) {
        return this.remove(e, !0);
      },
      domManip: function(e, t) {
        e = U.apply([], e);
        var n,
          r,
          o,
          i,
          a,
          s,
          u = 0,
          c = this.length,
          l = this,
          f = c - 1,
          p = e[0],
          v = Z.isFunction(p);
        if (v || (c > 1 && 'string' == typeof p && !Y.checkClone && Oe.test(p)))
          return this.each(function(n) {
            var r = l.eq(n);
            v && (e[0] = p.call(this, n, r.html())), r.domManip(e, t);
          });
        if (
          c &&
          ((r = (n = Z.buildFragment(e, this[0].ownerDocument, !1, this))
            .firstChild),
          1 === n.childNodes.length && (n = r),
          r)
        ) {
          for (i = (o = Z.map(m(n, 'script'), d)).length; c > u; u++)
            (a = n),
              u !== f &&
                ((a = Z.clone(a, !0, !0)), i && Z.merge(o, m(a, 'script'))),
              t.call(this[u], a, u);
          if (i)
            for (
              s = o[o.length - 1].ownerDocument, Z.map(o, h), u = 0;
              i > u;
              u++
            )
              (a = o[u]),
                Le.test(a.type || '') &&
                  !ge.access(a, 'globalEval') &&
                  Z.contains(s, a) &&
                  (a.src
                    ? Z._evalUrl && Z._evalUrl(a.src)
                    : Z.globalEval(a.textContent.replace(He, '')));
        }
        return this;
      }
    }),
    Z.each(
      {
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith'
      },
      function(e, t) {
        Z.fn[e] = function(e) {
          for (var n, r = [], o = Z(e), i = o.length - 1, a = 0; i >= a; a++)
            (n = a === i ? this : this.clone(!0)),
              Z(o[a])[t](n),
              z.apply(r, n.get());
          return this.pushStack(r);
        };
      }
    );
  var Pe,
    Re = {},
    Fe = /^margin/,
    Ie = new RegExp('^(' + xe + ')(?!px)[a-z%]+$', 'i'),
    Be = function(e) {
      return e.ownerDocument.defaultView.getComputedStyle(e, null);
    };
  !(function() {
    var t,
      n,
      r = G.documentElement,
      o = G.createElement('div'),
      i = G.createElement('div');
    if (i.style) {
      function a() {
        (i.style.cssText =
          '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute'),
          (i.innerHTML = ''),
          r.appendChild(o);
        var a = e.getComputedStyle(i, null);
        (t = '1%' !== a.top), (n = '4px' === a.width), r.removeChild(o);
      }
      (i.style.backgroundClip = 'content-box'),
        (i.cloneNode(!0).style.backgroundClip = ''),
        (Y.clearCloneStyle = 'content-box' === i.style.backgroundClip),
        (o.style.cssText =
          'border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute'),
        o.appendChild(i),
        e.getComputedStyle &&
          Z.extend(Y, {
            pixelPosition: function() {
              return a(), t;
            },
            boxSizingReliable: function() {
              return null == n && a(), n;
            },
            reliableMarginRight: function() {
              var t,
                n = i.appendChild(G.createElement('div'));
              return (
                (n.style.cssText = i.style.cssText =
                  '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0'),
                (n.style.marginRight = n.style.width = '0'),
                (i.style.width = '1px'),
                r.appendChild(o),
                (t = !parseFloat(e.getComputedStyle(n, null).marginRight)),
                r.removeChild(o),
                t
              );
            }
          });
    }
  })(),
    (Z.swap = function(e, t, n, r) {
      var o,
        i,
        a = {};
      for (i in t) (a[i] = e.style[i]), (e.style[i] = t[i]);
      for (i in ((o = n.apply(e, r || [])), t)) e.style[i] = a[i];
      return o;
    });
  var We = /^(none|table(?!-c[ea]).+)/,
    Ue = new RegExp('^(' + xe + ')(.*)$', 'i'),
    ze = new RegExp('^([+-])=(' + xe + ')', 'i'),
    Xe = { position: 'absolute', visibility: 'hidden', display: 'block' },
    Ve = { letterSpacing: '0', fontWeight: '400' },
    Je = ['Webkit', 'O', 'Moz', 'ms'];
  Z.extend({
    cssHooks: {
      opacity: {
        get: function(e, t) {
          if (t) {
            var n = w(e, 'opacity');
            return '' === n ? '1' : n;
          }
        }
      }
    },
    cssNumber: {
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
    cssProps: { float: 'cssFloat' },
    style: function(e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var o,
          i,
          a,
          s = Z.camelCase(t),
          u = e.style;
        return (
          (t = Z.cssProps[s] || (Z.cssProps[s] = k(u, s))),
          (a = Z.cssHooks[t] || Z.cssHooks[s]),
          void 0 === n
            ? a && 'get' in a && void 0 !== (o = a.get(e, !1, r))
              ? o
              : u[t]
            : ('string' === (i = typeof n) &&
                (o = ze.exec(n)) &&
                ((n = (o[1] + 1) * o[2] + parseFloat(Z.css(e, t))),
                (i = 'number')),
              void (
                null != n &&
                n == n &&
                ('number' !== i || Z.cssNumber[s] || (n += 'px'),
                Y.clearCloneStyle ||
                  '' !== n ||
                  0 !== t.indexOf('background') ||
                  (u[t] = 'inherit'),
                (a && 'set' in a && void 0 === (n = a.set(e, n, r))) ||
                  (u[t] = n))
              ))
        );
      }
    },
    css: function(e, t, n, r) {
      var o,
        i,
        a,
        s = Z.camelCase(t);
      return (
        (t = Z.cssProps[s] || (Z.cssProps[s] = k(e.style, s))),
        (a = Z.cssHooks[t] || Z.cssHooks[s]) &&
          'get' in a &&
          (o = a.get(e, !0, n)),
        void 0 === o && (o = w(e, t, r)),
        'normal' === o && t in Ve && (o = Ve[t]),
        '' === n || n
          ? ((i = parseFloat(o)), !0 === n || Z.isNumeric(i) ? i || 0 : o)
          : o
      );
    }
  }),
    Z.each(['height', 'width'], function(e, t) {
      Z.cssHooks[t] = {
        get: function(e, n, r) {
          return n
            ? We.test(Z.css(e, 'display')) && 0 === e.offsetWidth
              ? Z.swap(e, Xe, function() {
                  return E(e, t, r);
                })
              : E(e, t, r)
            : void 0;
        },
        set: function(e, n, r) {
          var o = r && Be(e);
          return T(
            e,
            n,
            r ? _(e, t, r, 'border-box' === Z.css(e, 'boxSizing', !1, o), o) : 0
          );
        }
      };
    }),
    (Z.cssHooks.marginRight = C(Y.reliableMarginRight, function(e, t) {
      return t
        ? Z.swap(e, { display: 'inline-block' }, w, [e, 'marginRight'])
        : void 0;
    })),
    Z.each({ margin: '', padding: '', border: 'Width' }, function(e, t) {
      (Z.cssHooks[e + t] = {
        expand: function(n) {
          for (
            var r = 0, o = {}, i = 'string' == typeof n ? n.split(' ') : [n];
            4 > r;
            r++
          )
            o[e + we[r] + t] = i[r] || i[r - 2] || i[0];
          return o;
        }
      }),
        Fe.test(e) || (Z.cssHooks[e + t].set = T);
    }),
    Z.fn.extend({
      css: function(e, t) {
        return ve(
          this,
          function(e, t, n) {
            var r,
              o,
              i = {},
              a = 0;
            if (Z.isArray(t)) {
              for (r = Be(e), o = t.length; o > a; a++)
                i[t[a]] = Z.css(e, t[a], !1, r);
              return i;
            }
            return void 0 !== n ? Z.style(e, t, n) : Z.css(e, t);
          },
          e,
          t,
          arguments.length > 1
        );
      },
      show: function() {
        return j(this, !0);
      },
      hide: function() {
        return j(this);
      },
      toggle: function(e) {
        return 'boolean' == typeof e
          ? e
            ? this.show()
            : this.hide()
          : this.each(function() {
              Ce(this) ? Z(this).show() : Z(this).hide();
            });
      }
    }),
    (Z.Tween = N),
    (N.prototype = {
      constructor: N,
      init: function(e, t, n, r, o, i) {
        (this.elem = e),
          (this.prop = n),
          (this.easing = o || 'swing'),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = r),
          (this.unit = i || (Z.cssNumber[n] ? '' : 'px'));
      },
      cur: function() {
        var e = N.propHooks[this.prop];
        return e && e.get ? e.get(this) : N.propHooks._default.get(this);
      },
      run: function(e) {
        var t,
          n = N.propHooks[this.prop];
        return (
          (this.pos = t = this.options.duration
            ? Z.easing[this.easing](
                e,
                this.options.duration * e,
                0,
                1,
                this.options.duration
              )
            : e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : N.propHooks._default.set(this),
          this
        );
      }
    }),
    (N.prototype.init.prototype = N.prototype),
    (N.propHooks = {
      _default: {
        get: function(e) {
          var t;
          return null == e.elem[e.prop] ||
            (e.elem.style && null != e.elem.style[e.prop])
            ? (t = Z.css(e.elem, e.prop, '')) && 'auto' !== t
              ? t
              : 0
            : e.elem[e.prop];
        },
        set: function(e) {
          Z.fx.step[e.prop]
            ? Z.fx.step[e.prop](e)
            : e.elem.style &&
              (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop])
            ? Z.style(e.elem, e.prop, e.now + e.unit)
            : (e.elem[e.prop] = e.now);
        }
      }
    }),
    (N.propHooks.scrollTop = N.propHooks.scrollLeft = {
      set: function(e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
      }
    }),
    (Z.easing = {
      linear: function(e) {
        return e;
      },
      swing: function(e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      }
    }),
    (Z.fx = N.prototype.init),
    (Z.fx.step = {});
  var Ke,
    Ye,
    Ge = /^(?:toggle|show|hide)$/,
    Qe = new RegExp('^(?:([+-])=|)(' + xe + ')([a-z%]*)$', 'i'),
    Ze = /queueHooks$/,
    et = [A],
    tt = {
      '*': [
        function(e, t) {
          var n = this.createTween(e, t),
            r = n.cur(),
            o = Qe.exec(t),
            i = (o && o[3]) || (Z.cssNumber[e] ? '' : 'px'),
            a =
              (Z.cssNumber[e] || ('px' !== i && +r)) &&
              Qe.exec(Z.css(n.elem, e)),
            s = 1,
            u = 20;
          if (a && a[3] !== i) {
            (i = i || a[3]), (o = o || []), (a = +r || 1);
            do {
              (a /= s = s || '.5'), Z.style(n.elem, e, a + i);
            } while (s !== (s = n.cur() / r) && 1 !== s && --u);
          }
          return (
            o &&
              ((a = n.start = +a || +r || 0),
              (n.unit = i),
              (n.end = o[1] ? a + (o[1] + 1) * o[2] : +o[2])),
            n
          );
        }
      ]
    };
  (Z.Animation = Z.extend(L, {
    tweener: function(e, t) {
      Z.isFunction(e) ? ((t = e), (e = ['*'])) : (e = e.split(' '));
      for (var n, r = 0, o = e.length; o > r; r++)
        (n = e[r]), (tt[n] = tt[n] || []), tt[n].unshift(t);
    },
    prefilter: function(e, t) {
      t ? et.unshift(e) : et.push(e);
    }
  })),
    (Z.speed = function(e, t, n) {
      var r =
        e && 'object' == typeof e
          ? Z.extend({}, e)
          : {
              complete: n || (!n && t) || (Z.isFunction(e) && e),
              duration: e,
              easing: (n && t) || (t && !Z.isFunction(t) && t)
            };
      return (
        (r.duration = Z.fx.off
          ? 0
          : 'number' == typeof r.duration
          ? r.duration
          : r.duration in Z.fx.speeds
          ? Z.fx.speeds[r.duration]
          : Z.fx.speeds._default),
        (null == r.queue || !0 === r.queue) && (r.queue = 'fx'),
        (r.old = r.complete),
        (r.complete = function() {
          Z.isFunction(r.old) && r.old.call(this),
            r.queue && Z.dequeue(this, r.queue);
        }),
        r
      );
    }),
    Z.fn.extend({
      fadeTo: function(e, t, n, r) {
        return this.filter(Ce)
          .css('opacity', 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, r);
      },
      animate: function(e, t, n, r) {
        var o = Z.isEmptyObject(e),
          i = Z.speed(t, n, r),
          a = function() {
            var t = L(this, Z.extend({}, e), i);
            (o || ge.get(this, 'finish')) && t.stop(!0);
          };
        return (
          (a.finish = a),
          o || !1 === i.queue ? this.each(a) : this.queue(i.queue, a)
        );
      },
      stop: function(e, t, n) {
        var r = function(e) {
          var t = e.stop;
          delete e.stop, t(n);
        };
        return (
          'string' != typeof e && ((n = t), (t = e), (e = void 0)),
          t && !1 !== e && this.queue(e || 'fx', []),
          this.each(function() {
            var t = !0,
              o = null != e && e + 'queueHooks',
              i = Z.timers,
              a = ge.get(this);
            if (o) a[o] && a[o].stop && r(a[o]);
            else for (o in a) a[o] && a[o].stop && Ze.test(o) && r(a[o]);
            for (o = i.length; o--; )
              i[o].elem !== this ||
                (null != e && i[o].queue !== e) ||
                (i[o].anim.stop(n), (t = !1), i.splice(o, 1));
            (t || !n) && Z.dequeue(this, e);
          })
        );
      },
      finish: function(e) {
        return (
          !1 !== e && (e = e || 'fx'),
          this.each(function() {
            var t,
              n = ge.get(this),
              r = n[e + 'queue'],
              o = n[e + 'queueHooks'],
              i = Z.timers,
              a = r ? r.length : 0;
            for (
              n.finish = !0,
                Z.queue(this, e, []),
                o && o.stop && o.stop.call(this, !0),
                t = i.length;
              t--;

            )
              i[t].elem === this &&
                i[t].queue === e &&
                (i[t].anim.stop(!0), i.splice(t, 1));
            for (t = 0; a > t; t++)
              r[t] && r[t].finish && r[t].finish.call(this);
            delete n.finish;
          })
        );
      }
    }),
    Z.each(['toggle', 'show', 'hide'], function(e, t) {
      var n = Z.fn[t];
      Z.fn[t] = function(e, r, o) {
        return null == e || 'boolean' == typeof e
          ? n.apply(this, arguments)
          : this.animate(D(t, !0), e, r, o);
      };
    }),
    Z.each(
      {
        slideDown: D('show'),
        slideUp: D('hide'),
        slideToggle: D('toggle'),
        fadeIn: { opacity: 'show' },
        fadeOut: { opacity: 'hide' },
        fadeToggle: { opacity: 'toggle' }
      },
      function(e, t) {
        Z.fn[e] = function(e, n, r) {
          return this.animate(t, e, n, r);
        };
      }
    ),
    (Z.timers = []),
    (Z.fx.tick = function() {
      var e,
        t = 0,
        n = Z.timers;
      for (Ke = Z.now(); t < n.length; t++)
        (e = n[t])() || n[t] !== e || n.splice(t--, 1);
      n.length || Z.fx.stop(), (Ke = void 0);
    }),
    (Z.fx.timer = function(e) {
      Z.timers.push(e), e() ? Z.fx.start() : Z.timers.pop();
    }),
    (Z.fx.interval = 13),
    (Z.fx.start = function() {
      Ye || (Ye = setInterval(Z.fx.tick, Z.fx.interval));
    }),
    (Z.fx.stop = function() {
      clearInterval(Ye), (Ye = null);
    }),
    (Z.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (Z.fn.delay = function(e, t) {
      return (
        (e = (Z.fx && Z.fx.speeds[e]) || e),
        (t = t || 'fx'),
        this.queue(t, function(t, n) {
          var r = setTimeout(t, e);
          n.stop = function() {
            clearTimeout(r);
          };
        })
      );
    }),
    (function() {
      var e = G.createElement('input'),
        t = G.createElement('select'),
        n = t.appendChild(G.createElement('option'));
      (e.type = 'checkbox'),
        (Y.checkOn = '' !== e.value),
        (Y.optSelected = n.selected),
        (t.disabled = !0),
        (Y.optDisabled = !n.disabled),
        ((e = G.createElement('input')).value = 't'),
        (e.type = 'radio'),
        (Y.radioValue = 't' === e.value);
    })();
  var nt,
    rt,
    ot = Z.expr.attrHandle;
  Z.fn.extend({
    attr: function(e, t) {
      return ve(this, Z.attr, e, t, arguments.length > 1);
    },
    removeAttr: function(e) {
      return this.each(function() {
        Z.removeAttr(this, e);
      });
    }
  }),
    Z.extend({
      attr: function(e, t, n) {
        var r,
          o,
          i = e.nodeType;
        if (e && 3 !== i && 8 !== i && 2 !== i)
          return typeof e.getAttribute === Te
            ? Z.prop(e, t, n)
            : ((1 === i && Z.isXMLDoc(e)) ||
                ((t = t.toLowerCase()),
                (r = Z.attrHooks[t] || (Z.expr.match.bool.test(t) ? rt : nt))),
              void 0 === n
                ? r && 'get' in r && null !== (o = r.get(e, t))
                  ? o
                  : null == (o = Z.find.attr(e, t))
                  ? void 0
                  : o
                : null !== n
                ? r && 'set' in r && void 0 !== (o = r.set(e, n, t))
                  ? o
                  : (e.setAttribute(t, n + ''), n)
                : void Z.removeAttr(e, t));
      },
      removeAttr: function(e, t) {
        var n,
          r,
          o = 0,
          i = t && t.match(de);
        if (i && 1 === e.nodeType)
          for (; (n = i[o++]); )
            (r = Z.propFix[n] || n),
              Z.expr.match.bool.test(n) && (e[r] = !1),
              e.removeAttribute(n);
      },
      attrHooks: {
        type: {
          set: function(e, t) {
            if (!Y.radioValue && 'radio' === t && Z.nodeName(e, 'input')) {
              var n = e.value;
              return e.setAttribute('type', t), n && (e.value = n), t;
            }
          }
        }
      }
    }),
    (rt = {
      set: function(e, t, n) {
        return !1 === t ? Z.removeAttr(e, n) : e.setAttribute(n, n), n;
      }
    }),
    Z.each(Z.expr.match.bool.source.match(/\w+/g), function(e, t) {
      var n = ot[t] || Z.find.attr;
      ot[t] = function(e, t, r) {
        var o, i;
        return (
          r ||
            ((i = ot[t]),
            (ot[t] = o),
            (o = null != n(e, t, r) ? t.toLowerCase() : null),
            (ot[t] = i)),
          o
        );
      };
    });
  var it = /^(?:input|select|textarea|button)$/i;
  Z.fn.extend({
    prop: function(e, t) {
      return ve(this, Z.prop, e, t, arguments.length > 1);
    },
    removeProp: function(e) {
      return this.each(function() {
        delete this[Z.propFix[e] || e];
      });
    }
  }),
    Z.extend({
      propFix: { for: 'htmlFor', class: 'className' },
      prop: function(e, t, n) {
        var r,
          o,
          i = e.nodeType;
        if (e && 3 !== i && 8 !== i && 2 !== i)
          return (
            (1 !== i || !Z.isXMLDoc(e)) &&
              ((t = Z.propFix[t] || t), (o = Z.propHooks[t])),
            void 0 !== n
              ? o && 'set' in o && void 0 !== (r = o.set(e, n, t))
                ? r
                : (e[t] = n)
              : o && 'get' in o && null !== (r = o.get(e, t))
              ? r
              : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function(e) {
            return e.hasAttribute('tabindex') || it.test(e.nodeName) || e.href
              ? e.tabIndex
              : -1;
          }
        }
      }
    }),
    Y.optSelected ||
      (Z.propHooks.selected = {
        get: function(e) {
          var t = e.parentNode;
          return t && t.parentNode && t.parentNode.selectedIndex, null;
        }
      }),
    Z.each(
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
        Z.propFix[this.toLowerCase()] = this;
      }
    );
  var at = /[\t\r\n\f]/g;
  Z.fn.extend({
    addClass: function(e) {
      var t,
        n,
        r,
        o,
        i,
        a,
        s = 'string' == typeof e && e,
        u = 0,
        c = this.length;
      if (Z.isFunction(e))
        return this.each(function(t) {
          Z(this).addClass(e.call(this, t, this.className));
        });
      if (s)
        for (t = (e || '').match(de) || []; c > u; u++)
          if (
            (r =
              1 === (n = this[u]).nodeType &&
              (n.className ? (' ' + n.className + ' ').replace(at, ' ') : ' '))
          ) {
            for (i = 0; (o = t[i++]); )
              r.indexOf(' ' + o + ' ') < 0 && (r += o + ' ');
            (a = Z.trim(r)), n.className !== a && (n.className = a);
          }
      return this;
    },
    removeClass: function(e) {
      var t,
        n,
        r,
        o,
        i,
        a,
        s = 0 === arguments.length || ('string' == typeof e && e),
        u = 0,
        c = this.length;
      if (Z.isFunction(e))
        return this.each(function(t) {
          Z(this).removeClass(e.call(this, t, this.className));
        });
      if (s)
        for (t = (e || '').match(de) || []; c > u; u++)
          if (
            (r =
              1 === (n = this[u]).nodeType &&
              (n.className ? (' ' + n.className + ' ').replace(at, ' ') : ''))
          ) {
            for (i = 0; (o = t[i++]); )
              for (; r.indexOf(' ' + o + ' ') >= 0; )
                r = r.replace(' ' + o + ' ', ' ');
            (a = e ? Z.trim(r) : ''), n.className !== a && (n.className = a);
          }
      return this;
    },
    toggleClass: function(e, t) {
      var n = typeof e;
      return 'boolean' == typeof t && 'string' === n
        ? t
          ? this.addClass(e)
          : this.removeClass(e)
        : this.each(
            Z.isFunction(e)
              ? function(n) {
                  Z(this).toggleClass(e.call(this, n, this.className, t), t);
                }
              : function() {
                  if ('string' === n)
                    for (
                      var t, r = 0, o = Z(this), i = e.match(de) || [];
                      (t = i[r++]);

                    )
                      o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                  else
                    (n === Te || 'boolean' === n) &&
                      (this.className &&
                        ge.set(this, '__className__', this.className),
                      (this.className =
                        this.className || !1 === e
                          ? ''
                          : ge.get(this, '__className__') || ''));
                }
          );
    },
    hasClass: function(e) {
      for (var t = ' ' + e + ' ', n = 0, r = this.length; r > n; n++)
        if (
          1 === this[n].nodeType &&
          (' ' + this[n].className + ' ').replace(at, ' ').indexOf(t) >= 0
        )
          return !0;
      return !1;
    }
  });
  var st = /\r/g;
  Z.fn.extend({
    val: function(e) {
      var t,
        n,
        r,
        o = this[0];
      return arguments.length
        ? ((r = Z.isFunction(e)),
          this.each(function(n) {
            var o;
            1 === this.nodeType &&
              (null == (o = r ? e.call(this, n, Z(this).val()) : e)
                ? (o = '')
                : 'number' == typeof o
                ? (o += '')
                : Z.isArray(o) &&
                  (o = Z.map(o, function(e) {
                    return null == e ? '' : e + '';
                  })),
              ((t =
                Z.valHooks[this.type] ||
                Z.valHooks[this.nodeName.toLowerCase()]) &&
                'set' in t &&
                void 0 !== t.set(this, o, 'value')) ||
                (this.value = o));
          }))
        : o
        ? (t = Z.valHooks[o.type] || Z.valHooks[o.nodeName.toLowerCase()]) &&
          'get' in t &&
          void 0 !== (n = t.get(o, 'value'))
          ? n
          : 'string' == typeof (n = o.value)
          ? n.replace(st, '')
          : null == n
          ? ''
          : n
        : void 0;
    }
  }),
    Z.extend({
      valHooks: {
        option: {
          get: function(e) {
            var t = Z.find.attr(e, 'value');
            return null != t ? t : Z.trim(Z.text(e));
          }
        },
        select: {
          get: function(e) {
            for (
              var t,
                n,
                r = e.options,
                o = e.selectedIndex,
                i = 'select-one' === e.type || 0 > o,
                a = i ? null : [],
                s = i ? o + 1 : r.length,
                u = 0 > o ? s : i ? o : 0;
              s > u;
              u++
            )
              if (
                !(
                  (!(n = r[u]).selected && u !== o) ||
                  (Y.optDisabled
                    ? n.disabled
                    : null !== n.getAttribute('disabled')) ||
                  (n.parentNode.disabled &&
                    Z.nodeName(n.parentNode, 'optgroup'))
                )
              ) {
                if (((t = Z(n).val()), i)) return t;
                a.push(t);
              }
            return a;
          },
          set: function(e, t) {
            for (
              var n, r, o = e.options, i = Z.makeArray(t), a = o.length;
              a--;

            )
              ((r = o[a]).selected = Z.inArray(r.value, i) >= 0) && (n = !0);
            return n || (e.selectedIndex = -1), i;
          }
        }
      }
    }),
    Z.each(['radio', 'checkbox'], function() {
      (Z.valHooks[this] = {
        set: function(e, t) {
          return Z.isArray(t)
            ? (e.checked = Z.inArray(Z(e).val(), t) >= 0)
            : void 0;
        }
      }),
        Y.checkOn ||
          (Z.valHooks[this].get = function(e) {
            return null === e.getAttribute('value') ? 'on' : e.value;
          });
    }),
    Z.each(
      'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(
        ' '
      ),
      function(e, t) {
        Z.fn[t] = function(e, n) {
          return arguments.length > 0
            ? this.on(t, null, e, n)
            : this.trigger(t);
        };
      }
    ),
    Z.fn.extend({
      hover: function(e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      },
      bind: function(e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function(e, t) {
        return this.off(e, null, t);
      },
      delegate: function(e, t, n, r) {
        return this.on(t, e, n, r);
      },
      undelegate: function(e, t, n) {
        return 1 === arguments.length
          ? this.off(e, '**')
          : this.off(t, e || '**', n);
      }
    });
  var ut = Z.now(),
    ct = /\?/;
  (Z.parseJSON = function(e) {
    return JSON.parse(e + '');
  }),
    (Z.parseXML = function(e) {
      var t;
      if (!e || 'string' != typeof e) return null;
      try {
        t = new DOMParser().parseFromString(e, 'text/xml');
      } catch (W) {
        t = void 0;
      }
      return (
        (!t || t.getElementsByTagName('parsererror').length) &&
          Z.error('Invalid XML: ' + e),
        t
      );
    });
  var lt,
    ft,
    pt = /#.*$/,
    dt = /([?&])_=[^&]*/,
    ht = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    vt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    gt = /^(?:GET|HEAD)$/,
    mt = /^\/\//,
    yt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    bt = {},
    xt = {},
    wt = '*/'.concat('*');
  try {
    ft = location.href;
  } catch (Mt) {
    ((ft = G.createElement('a')).href = ''), (ft = ft.href);
  }
  (lt = yt.exec(ft.toLowerCase()) || []),
    Z.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: ft,
        type: 'GET',
        isLocal: vt.test(lt[1]),
        global: !0,
        processData: !0,
        async: !0,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        accepts: {
          '*': wt,
          text: 'text/plain',
          html: 'text/html',
          xml: 'application/xml, text/xml',
          json: 'application/json, text/javascript'
        },
        contents: { xml: /xml/, html: /html/, json: /json/ },
        responseFields: {
          xml: 'responseXML',
          text: 'responseText',
          json: 'responseJSON'
        },
        converters: {
          '* text': String,
          'text html': !0,
          'text json': Z.parseJSON,
          'text xml': Z.parseXML
        },
        flatOptions: { url: !0, context: !0 }
      },
      ajaxSetup: function(e, t) {
        return t ? M(M(e, Z.ajaxSettings), t) : M(Z.ajaxSettings, e);
      },
      ajaxPrefilter: q(bt),
      ajaxTransport: q(xt),
      ajax: function(e, t) {
        function n(e, t, n, a) {
          var u,
            l,
            m,
            y,
            x,
            C = t;
          2 !== b &&
            ((b = 2),
            s && clearTimeout(s),
            (r = void 0),
            (i = a || ''),
            (w.readyState = e > 0 ? 4 : 0),
            (u = (e >= 200 && 300 > e) || 304 === e),
            n && (y = P(f, w, n)),
            (y = R(f, y, w, u)),
            u
              ? (f.ifModified &&
                  ((x = w.getResponseHeader('Last-Modified')) &&
                    (Z.lastModified[o] = x),
                  (x = w.getResponseHeader('etag')) && (Z.etag[o] = x)),
                204 === e || 'HEAD' === f.type
                  ? (C = 'nocontent')
                  : 304 === e
                  ? (C = 'notmodified')
                  : ((C = y.state), (l = y.data), (u = !(m = y.error))))
              : ((m = C), (e || !C) && ((C = 'error'), 0 > e && (e = 0))),
            (w.status = e),
            (w.statusText = (t || C) + ''),
            u ? h.resolveWith(p, [l, C, w]) : h.rejectWith(p, [w, C, m]),
            w.statusCode(g),
            (g = void 0),
            c && d.trigger(u ? 'ajaxSuccess' : 'ajaxError', [w, f, u ? l : m]),
            v.fireWith(p, [w, C]),
            c &&
              (d.trigger('ajaxComplete', [w, f]),
              --Z.active || Z.event.trigger('ajaxStop')));
        }
        'object' == typeof e && ((t = e), (e = void 0)), (t = t || {});
        var r,
          o,
          i,
          a,
          s,
          u,
          c,
          l,
          f = Z.ajaxSetup({}, t),
          p = f.context || f,
          d = f.context && (p.nodeType || p.jquery) ? Z(p) : Z.event,
          h = Z.Deferred(),
          v = Z.Callbacks('once memory'),
          g = f.statusCode || {},
          m = {},
          y = {},
          b = 0,
          x = 'canceled',
          w = {
            readyState: 0,
            getResponseHeader: function(e) {
              var t;
              if (2 === b) {
                if (!a)
                  for (a = {}; (t = ht.exec(i)); ) a[t[1].toLowerCase()] = t[2];
                t = a[e.toLowerCase()];
              }
              return null == t ? null : t;
            },
            getAllResponseHeaders: function() {
              return 2 === b ? i : null;
            },
            setRequestHeader: function(e, t) {
              var n = e.toLowerCase();
              return b || ((e = y[n] = y[n] || e), (m[e] = t)), this;
            },
            overrideMimeType: function(e) {
              return b || (f.mimeType = e), this;
            },
            statusCode: function(e) {
              var t;
              if (e)
                if (2 > b) for (t in e) g[t] = [g[t], e[t]];
                else w.always(e[w.status]);
              return this;
            },
            abort: function(e) {
              var t = e || x;
              return r && r.abort(t), n(0, t), this;
            }
          };
        if (
          ((h.promise(w).complete = v.add),
          (w.success = w.done),
          (w.error = w.fail),
          (f.url = ((e || f.url || ft) + '')
            .replace(pt, '')
            .replace(mt, lt[1] + '//')),
          (f.type = t.method || t.type || f.method || f.type),
          (f.dataTypes = Z.trim(f.dataType || '*')
            .toLowerCase()
            .match(de) || ['']),
          null == f.crossDomain &&
            ((u = yt.exec(f.url.toLowerCase())),
            (f.crossDomain = !(
              !u ||
              (u[1] === lt[1] &&
                u[2] === lt[2] &&
                (u[3] || ('http:' === u[1] ? '80' : '443')) ===
                  (lt[3] || ('http:' === lt[1] ? '80' : '443')))
            ))),
          f.data &&
            f.processData &&
            'string' != typeof f.data &&
            (f.data = Z.param(f.data, f.traditional)),
          H(bt, f, t, w),
          2 === b)
        )
          return w;
        for (l in ((c = f.global) &&
          0 == Z.active++ &&
          Z.event.trigger('ajaxStart'),
        (f.type = f.type.toUpperCase()),
        (f.hasContent = !gt.test(f.type)),
        (o = f.url),
        f.hasContent ||
          (f.data &&
            ((o = f.url += (ct.test(o) ? '&' : '?') + f.data), delete f.data),
          !1 === f.cache &&
            (f.url = dt.test(o)
              ? o.replace(dt, '$1_=' + ut++)
              : o + (ct.test(o) ? '&' : '?') + '_=' + ut++)),
        f.ifModified &&
          (Z.lastModified[o] &&
            w.setRequestHeader('If-Modified-Since', Z.lastModified[o]),
          Z.etag[o] && w.setRequestHeader('If-None-Match', Z.etag[o])),
        ((f.data && f.hasContent && !1 !== f.contentType) || t.contentType) &&
          w.setRequestHeader('Content-Type', f.contentType),
        w.setRequestHeader(
          'Accept',
          f.dataTypes[0] && f.accepts[f.dataTypes[0]]
            ? f.accepts[f.dataTypes[0]] +
                ('*' !== f.dataTypes[0] ? ', ' + wt + '; q=0.01' : '')
            : f.accepts['*']
        ),
        f.headers))
          w.setRequestHeader(l, f.headers[l]);
        if (f.beforeSend && (!1 === f.beforeSend.call(p, w, f) || 2 === b))
          return w.abort();
        for (l in ((x = 'abort'), { success: 1, error: 1, complete: 1 }))
          w[l](f[l]);
        if ((r = H(xt, f, t, w))) {
          (w.readyState = 1),
            c && d.trigger('ajaxSend', [w, f]),
            f.async &&
              f.timeout > 0 &&
              (s = setTimeout(function() {
                w.abort('timeout');
              }, f.timeout));
          try {
            (b = 1), r.send(m, n);
          } catch (se) {
            if (!(2 > b)) throw se;
            n(-1, se);
          }
        } else n(-1, 'No Transport');
        return w;
      },
      getJSON: function(e, t, n) {
        return Z.get(e, t, n, 'json');
      },
      getScript: function(e, t) {
        return Z.get(e, void 0, t, 'script');
      }
    }),
    Z.each(['get', 'post'], function(e, t) {
      Z[t] = function(e, n, r, o) {
        return (
          Z.isFunction(n) && ((o = o || r), (r = n), (n = void 0)),
          Z.ajax({ url: e, type: t, dataType: o, data: n, success: r })
        );
      };
    }),
    Z.each(
      [
        'ajaxStart',
        'ajaxStop',
        'ajaxComplete',
        'ajaxError',
        'ajaxSuccess',
        'ajaxSend'
      ],
      function(e, t) {
        Z.fn[t] = function(e) {
          return this.on(t, e);
        };
      }
    ),
    (Z._evalUrl = function(e) {
      return Z.ajax({
        url: e,
        type: 'GET',
        dataType: 'script',
        async: !1,
        global: !1,
        throws: !0
      });
    }),
    Z.fn.extend({
      wrapAll: function(e) {
        var t;
        return Z.isFunction(e)
          ? this.each(function(t) {
              Z(this).wrapAll(e.call(this, t));
            })
          : (this[0] &&
              ((t = Z(e, this[0].ownerDocument)
                .eq(0)
                .clone(!0)),
              this[0].parentNode && t.insertBefore(this[0]),
              t
                .map(function() {
                  for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                  return e;
                })
                .append(this)),
            this);
      },
      wrapInner: function(e) {
        return this.each(
          Z.isFunction(e)
            ? function(t) {
                Z(this).wrapInner(e.call(this, t));
              }
            : function() {
                var t = Z(this),
                  n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
              }
        );
      },
      wrap: function(e) {
        var t = Z.isFunction(e);
        return this.each(function(n) {
          Z(this).wrapAll(t ? e.call(this, n) : e);
        });
      },
      unwrap: function() {
        return this.parent()
          .each(function() {
            Z.nodeName(this, 'body') || Z(this).replaceWith(this.childNodes);
          })
          .end();
      }
    }),
    (Z.expr.filters.hidden = function(e) {
      return e.offsetWidth <= 0 && e.offsetHeight <= 0;
    }),
    (Z.expr.filters.visible = function(e) {
      return !Z.expr.filters.hidden(e);
    });
  var Ct = /%20/g,
    kt = /\[\]$/,
    Tt = /\r?\n/g,
    _t = /^(?:submit|button|image|reset|file)$/i,
    Et = /^(?:input|select|textarea|keygen)/i;
  (Z.param = function(e, t) {
    var n,
      r = [],
      o = function(e, t) {
        (t = Z.isFunction(t) ? t() : null == t ? '' : t),
          (r[r.length] = encodeURIComponent(e) + '=' + encodeURIComponent(t));
      };
    if (
      (void 0 === t && (t = Z.ajaxSettings && Z.ajaxSettings.traditional),
      Z.isArray(e) || (e.jquery && !Z.isPlainObject(e)))
    )
      Z.each(e, function() {
        o(this.name, this.value);
      });
    else for (n in e) F(n, e[n], t, o);
    return r.join('&').replace(Ct, '+');
  }),
    Z.fn.extend({
      serialize: function() {
        return Z.param(this.serializeArray());
      },
      serializeArray: function() {
        return this.map(function() {
          var e = Z.prop(this, 'elements');
          return e ? Z.makeArray(e) : this;
        })
          .filter(function() {
            var e = this.type;
            return (
              this.name &&
              !Z(this).is(':disabled') &&
              Et.test(this.nodeName) &&
              !_t.test(e) &&
              (this.checked || !ke.test(e))
            );
          })
          .map(function(e, t) {
            var n = Z(this).val();
            return null == n
              ? null
              : Z.isArray(n)
              ? Z.map(n, function(e) {
                  return { name: t.name, value: e.replace(Tt, '\r\n') };
                })
              : { name: t.name, value: n.replace(Tt, '\r\n') };
          })
          .get();
      }
    }),
    (Z.ajaxSettings.xhr = function() {
      try {
        return new XMLHttpRequest();
      } catch (e) {}
    });
  var jt = 0,
    Nt = {},
    St = { 0: 200, 1223: 204 },
    Dt = Z.ajaxSettings.xhr();
  e.ActiveXObject &&
    Z(e).on('unload', function() {
      for (var e in Nt) Nt[e]();
    }),
    (Y.cors = !!Dt && 'withCredentials' in Dt),
    (Y.ajax = Dt = !!Dt),
    Z.ajaxTransport(function(e) {
      var t;
      return Y.cors || (Dt && !e.crossDomain)
        ? {
            send: function(n, r) {
              var o,
                i = e.xhr(),
                a = ++jt;
              if (
                (i.open(e.type, e.url, e.async, e.username, e.password),
                e.xhrFields)
              )
                for (o in e.xhrFields) i[o] = e.xhrFields[o];
              for (o in (e.mimeType &&
                i.overrideMimeType &&
                i.overrideMimeType(e.mimeType),
              e.crossDomain ||
                n['X-Requested-With'] ||
                (n['X-Requested-With'] = 'XMLHttpRequest'),
              n))
                i.setRequestHeader(o, n[o]);
              (t = function(e) {
                return function() {
                  t &&
                    (delete Nt[a],
                    (t = i.onload = i.onerror = null),
                    'abort' === e
                      ? i.abort()
                      : 'error' === e
                      ? r(i.status, i.statusText)
                      : r(
                          St[i.status] || i.status,
                          i.statusText,
                          'string' == typeof i.responseText
                            ? { text: i.responseText }
                            : void 0,
                          i.getAllResponseHeaders()
                        ));
                };
              }),
                (i.onload = t()),
                (i.onerror = t('error')),
                (t = Nt[a] = t('abort'));
              try {
                i.send((e.hasContent && e.data) || null);
              } catch (V) {
                if (t) throw V;
              }
            },
            abort: function() {
              t && t();
            }
          }
        : void 0;
    }),
    Z.ajaxSetup({
      accepts: {
        script:
          'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      },
      contents: { script: /(?:java|ecma)script/ },
      converters: {
        'text script': function(e) {
          return Z.globalEval(e), e;
        }
      }
    }),
    Z.ajaxPrefilter('script', function(e) {
      void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = 'GET');
    }),
    Z.ajaxTransport('script', function(e) {
      var t, n;
      if (e.crossDomain)
        return {
          send: function(r, o) {
            (t = Z('<script>')
              .prop({ async: !0, charset: e.scriptCharset, src: e.url })
              .on(
                'load error',
                (n = function(e) {
                  t.remove(),
                    (n = null),
                    e && o('error' === e.type ? 404 : 200, e.type);
                })
              )),
              G.head.appendChild(t[0]);
          },
          abort: function() {
            n && n();
          }
        };
    });
  var $t = [],
    At = /(=)\?(?=&|$)|\?\?/;
  Z.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function() {
      var e = $t.pop() || Z.expando + '_' + ut++;
      return (this[e] = !0), e;
    }
  }),
    Z.ajaxPrefilter('json jsonp', function(t, n, r) {
      var o,
        i,
        a,
        s =
          !1 !== t.jsonp &&
          (At.test(t.url)
            ? 'url'
            : 'string' == typeof t.data &&
              !(t.contentType || '').indexOf(
                'application/x-www-form-urlencoded'
              ) &&
              At.test(t.data) &&
              'data');
      return s || 'jsonp' === t.dataTypes[0]
        ? ((o = t.jsonpCallback = Z.isFunction(t.jsonpCallback)
            ? t.jsonpCallback()
            : t.jsonpCallback),
          s
            ? (t[s] = t[s].replace(At, '$1' + o))
            : !1 !== t.jsonp &&
              (t.url += (ct.test(t.url) ? '&' : '?') + t.jsonp + '=' + o),
          (t.converters['script json'] = function() {
            return a || Z.error(o + ' was not called'), a[0];
          }),
          (t.dataTypes[0] = 'json'),
          (i = e[o]),
          (e[o] = function() {
            a = arguments;
          }),
          r.always(function() {
            (e[o] = i),
              t[o] && ((t.jsonpCallback = n.jsonpCallback), $t.push(o)),
              a && Z.isFunction(i) && i(a[0]),
              (a = i = void 0);
          }),
          'script')
        : void 0;
    }),
    (Z.parseHTML = function(e, t, n) {
      if (!e || 'string' != typeof e) return null;
      'boolean' == typeof t && ((n = t), (t = !1)), (t = t || G);
      var r = ae.exec(e),
        o = !n && [];
      return r
        ? [t.createElement(r[1])]
        : ((r = Z.buildFragment([e], t, o)),
          o && o.length && Z(o).remove(),
          Z.merge([], r.childNodes));
    });
  var Ot = Z.fn.load;
  (Z.fn.load = function(e, t, n) {
    if ('string' != typeof e && Ot) return Ot.apply(this, arguments);
    var r,
      o,
      i,
      a = this,
      s = e.indexOf(' ');
    return (
      s >= 0 && ((r = Z.trim(e.slice(s))), (e = e.slice(0, s))),
      Z.isFunction(t)
        ? ((n = t), (t = void 0))
        : t && 'object' == typeof t && (o = 'POST'),
      a.length > 0 &&
        Z.ajax({ url: e, type: o, dataType: 'html', data: t })
          .done(function(e) {
            (i = arguments),
              a.html(
                r
                  ? Z('<div>')
                      .append(Z.parseHTML(e))
                      .find(r)
                  : e
              );
          })
          .complete(
            n &&
              function(e, t) {
                a.each(n, i || [e.responseText, t, e]);
              }
          ),
      this
    );
  }),
    (Z.expr.filters.animated = function(e) {
      return Z.grep(Z.timers, function(t) {
        return e === t.elem;
      }).length;
    });
  var Lt = e.document.documentElement;
  (Z.offset = {
    setOffset: function(e, t, n) {
      var r,
        o,
        i,
        a,
        s,
        u,
        c = Z.css(e, 'position'),
        l = Z(e),
        f = {};
      'static' === c && (e.style.position = 'relative'),
        (s = l.offset()),
        (i = Z.css(e, 'top')),
        (u = Z.css(e, 'left')),
        ('absolute' === c || 'fixed' === c) && (i + u).indexOf('auto') > -1
          ? ((a = (r = l.position()).top), (o = r.left))
          : ((a = parseFloat(i) || 0), (o = parseFloat(u) || 0)),
        Z.isFunction(t) && (t = t.call(e, n, s)),
        null != t.top && (f.top = t.top - s.top + a),
        null != t.left && (f.left = t.left - s.left + o),
        'using' in t ? t.using.call(e, f) : l.css(f);
    }
  }),
    Z.fn.extend({
      offset: function(e) {
        if (arguments.length)
          return void 0 === e
            ? this
            : this.each(function(t) {
                Z.offset.setOffset(this, e, t);
              });
        var t,
          n,
          r = this[0],
          o = { top: 0, left: 0 },
          i = r && r.ownerDocument;
        return i
          ? ((t = i.documentElement),
            Z.contains(t, r)
              ? (typeof r.getBoundingClientRect !== Te &&
                  (o = r.getBoundingClientRect()),
                (n = I(i)),
                {
                  top: o.top + n.pageYOffset - t.clientTop,
                  left: o.left + n.pageXOffset - t.clientLeft
                })
              : o)
          : void 0;
      },
      position: function() {
        if (this[0]) {
          var e,
            t,
            n = this[0],
            r = { top: 0, left: 0 };
          return (
            'fixed' === Z.css(n, 'position')
              ? (t = n.getBoundingClientRect())
              : ((e = this.offsetParent()),
                (t = this.offset()),
                Z.nodeName(e[0], 'html') || (r = e.offset()),
                (r.top += Z.css(e[0], 'borderTopWidth', !0)),
                (r.left += Z.css(e[0], 'borderLeftWidth', !0))),
            {
              top: t.top - r.top - Z.css(n, 'marginTop', !0),
              left: t.left - r.left - Z.css(n, 'marginLeft', !0)
            }
          );
        }
      },
      offsetParent: function() {
        return this.map(function() {
          for (
            var e = this.offsetParent || Lt;
            e && !Z.nodeName(e, 'html') && 'static' === Z.css(e, 'position');

          )
            e = e.offsetParent;
          return e || Lt;
        });
      }
    }),
    Z.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function(
      t,
      n
    ) {
      var r = 'pageYOffset' === n;
      Z.fn[t] = function(o) {
        return ve(
          this,
          function(t, o, i) {
            var a = I(t);
            return void 0 === i
              ? a
                ? a[n]
                : t[o]
              : void (a
                  ? a.scrollTo(r ? e.pageXOffset : i, r ? i : e.pageYOffset)
                  : (t[o] = i));
          },
          t,
          o,
          arguments.length,
          null
        );
      };
    }),
    Z.each(['top', 'left'], function(e, t) {
      Z.cssHooks[t] = C(Y.pixelPosition, function(e, n) {
        return n
          ? ((n = w(e, t)), Ie.test(n) ? Z(e).position()[t] + 'px' : n)
          : void 0;
      });
    }),
    Z.each({ Height: 'height', Width: 'width' }, function(e, t) {
      Z.each({ padding: 'inner' + e, content: t, '': 'outer' + e }, function(
        n,
        r
      ) {
        Z.fn[r] = function(r, o) {
          var i = arguments.length && (n || 'boolean' != typeof r),
            a = n || (!0 === r || !0 === o ? 'margin' : 'border');
          return ve(
            this,
            function(t, n, r) {
              var o;
              return Z.isWindow(t)
                ? t.document.documentElement['client' + e]
                : 9 === t.nodeType
                ? ((o = t.documentElement),
                  Math.max(
                    t.body['scroll' + e],
                    o['scroll' + e],
                    t.body['offset' + e],
                    o['offset' + e],
                    o['client' + e]
                  ))
                : void 0 === r
                ? Z.css(t, n, a)
                : Z.style(t, n, r, a);
            },
            t,
            i ? r : void 0,
            i,
            null
          );
        };
      });
    }),
    (Z.fn.size = function() {
      return this.length;
    }),
    (Z.fn.andSelf = Z.fn.addBack),
    'function' == typeof define &&
      define.amd &&
      define('jquery', [], function() {
        return Z;
      });
  var qt = e.jQuery,
    Ht = e.$;
  return (
    (Z.noConflict = function(t) {
      return e.$ === Z && (e.$ = Ht), t && e.jQuery === Z && (e.jQuery = qt), Z;
    }),
    typeof t === Te && (e.jQuery = e.$ = Z),
    Z
  );
}),
  (function() {
    function e(e) {
      if ('string' == typeof e) {
        var t = e.substring(0, 1);
        if ('[' === t || '{' === t) return !0;
      }
      return !1;
    }
    var t = $('#init-data').val();
    if ('string' == typeof t) {
      var n = $.parseJSON(t);
      for (var r in n)
        if (n.hasOwnProperty(r)) {
          var o = n[r];
          e(o) ? (window[r] = $.parseJSON(o)) : (window[r] = o);
        }
    }
  })(),
  (function() {
    function e(e) {
      if ('string' == typeof e) {
        var t = e.substring(0, 1);
        if ('[' === t || '{' === t) return !0;
      }
      return !1;
    }
    var t = document.getElementById('init-data');
    if (t) {
      var n = t.getAttribute('value');
      if ('string' == typeof n) {
        var r = JSON.parse(n);
        for (var o in r) {
          var i = r[o];
          window[o] = e(i) ? JSON.parse(i) : i;
        }
      }
    }
  })();
var NastyBrowserSniffing = {
  init: function() {
    NastyBrowserSniffing.isIE11OrLess() && NastyBrowserSniffing.addIEclasses(),
      NastyBrowserSniffing._hasClassList() &&
        (document.documentElement.classList.add('js'),
        document.documentElement.classList.remove('no-js'),
        document.documentElement.classList.add(__browser.platform),
        document.documentElement.classList.add(this.getBrowserClassname()));
  },
  _hasClassList: function() {
    return document.documentElement && document.documentElement.classList;
  },
  isIE11OrLess: function() {
    return 'ie' === __browser.name && 1 * __browser.version <= 11;
  },
  getBrowserClassname: function() {
    return __browser.name + __browser.version;
  },
  addIEclasses: function() {
    document.documentElement.className += ' ' + this.getBrowserClassname();
  }
};
try {
  NastyBrowserSniffing.init();
} catch (e) {}
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modern -o ./dist/lodash.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
(function() {
  function t(e, t, n) {
    for (var r = (n || 0) - 1, o = e ? e.length : 0; ++r < o; )
      if (e[r] === t) return r;
    return -1;
  }
  function n(e, n) {
    var r = typeof n;
    if (((e = e.cache), 'boolean' == r || null == n)) return e[n] ? 0 : -1;
    'number' != r && 'string' != r && (r = 'object');
    var o = 'number' == r ? n : y + n;
    return (
      (e = (e = e[r]) && e[o]),
      'object' == r ? (e && t(e, n) > -1 ? 0 : -1) : e ? 0 : -1
    );
  }
  function r(e) {
    var t = this.cache,
      n = typeof e;
    if ('boolean' == n || null == e) t[e] = !0;
    else {
      'number' != n && 'string' != n && (n = 'object');
      var r = 'number' == n ? e : y + e,
        o = t[n] || (t[n] = {});
      'object' == n ? (o[r] || (o[r] = [])).push(e) : (o[r] = !0);
    }
  }
  function o(e) {
    return e.charCodeAt(0);
  }
  function i(e, t) {
    for (var n = e.criteria, r = t.criteria, o = -1, i = n.length; ++o < i; ) {
      var a = n[o],
        s = r[o];
      if (a !== s) {
        if (a > s || void 0 === a) return 1;
        if (a < s || void 0 === s) return -1;
      }
    }
    return e.index - t.index;
  }
  function a(e) {
    var t = -1,
      n = e.length,
      o = e[0],
      i = e[(n / 2) | 0],
      a = e[n - 1];
    if (
      o &&
      'object' == typeof o &&
      i &&
      'object' == typeof i &&
      a &&
      'object' == typeof a
    )
      return !1;
    var s = c();
    s['false'] = s['null'] = s['true'] = s[void 0] = !1;
    var u = c();
    for (u.array = e, u.cache = s, u.push = r; ++t < n; ) u.push(e[t]);
    return u;
  }
  function s(e) {
    return '\\' + J[e];
  }
  function u() {
    return v.pop() || [];
  }
  function c() {
    return (
      g.pop() || {
        array: null,
        cache: null,
        criteria: null,
        false: !1,
        index: 0,
        null: !1,
        number: null,
        object: null,
        push: null,
        string: null,
        true: !1,
        undefined: !1,
        value: null
      }
    );
  }
  function l(e) {
    (e.length = 0), v.length < x && v.push(e);
  }
  function f(e) {
    var t = e.cache;
    t && f(t),
      (e.array = e.cache = e.criteria = e.object = e.number = e.string = e.value = null),
      g.length < x && g.push(e);
  }
  function p(e, t, n) {
    t || (t = 0), void 0 === n && (n = e ? e.length : 0);
    for (var r = -1, o = n - t || 0, i = Array(o < 0 ? 0 : o); ++r < o; )
      i[r] = e[t + r];
    return i;
  }
  function d(r) {
    function v(e) {
      return e && 'object' == typeof e && !er(e) && qn.call(e, '__wrapped__')
        ? e
        : new g(e);
    }
    function g(e, t) {
      (this.__chain__ = !!t), (this.__wrapped__ = e);
    }
    function x(e) {
      function t() {
        if (r) {
          var e = p(r);
          Hn.apply(e, arguments);
        }
        if (this instanceof t) {
          var i = Y(n.prototype),
            a = n.apply(i, e || arguments);
          return $e(a) ? a : i;
        }
        return n.apply(o, e || arguments);
      }
      var n = e[0],
        r = e[2],
        o = e[4];
      return Zn(t, e), t;
    }
    function J(e, t, n, r, o) {
      if (n) {
        var i = n(e);
        if (void 0 !== i) return i;
      }
      if (!$e(e)) return e;
      var a = Nn.call(e);
      if (!U[a]) return e;
      var s = Yn[a];
      switch (a) {
        case M:
        case P:
          return new s(+e);
        case F:
        case W:
          return new s(e);
        case B:
          return ((i = s(e.source, E.exec(e))).lastIndex = e.lastIndex), i;
      }
      var c = er(e);
      if (t) {
        var f = !r;
        r || (r = u()), o || (o = u());
        for (var d = r.length; d--; ) if (r[d] == e) return o[d];
        i = c ? s(e.length) : {};
      } else i = c ? p(e) : ar({}, e);
      return (
        c &&
          (qn.call(e, 'index') && (i.index = e.index),
          qn.call(e, 'input') && (i.input = e.input)),
        t
          ? (r.push(e),
            o.push(i),
            (c ? Ge : cr)(e, function(e, a) {
              i[a] = J(e, t, n, r, o);
            }),
            f && (l(r), l(o)),
            i)
          : i
      );
    }
    function Y(e) {
      return $e(e) ? In(e) : {};
    }
    function G(e, t, n) {
      if ('function' != typeof e) return Qt;
      if (void 0 === t || !('prototype' in e)) return e;
      var r = e.__bindData__;
      if (
        void 0 === r &&
        (Gn.funcNames && (r = !e.name), !(r = r || !Gn.funcDecomp))
      ) {
        var o = On.call(e);
        Gn.funcNames || (r = !j.test(o)), r || ((r = $.test(o)), Zn(e, r));
      }
      if (!1 === r || (!0 !== r && 1 & r[1])) return e;
      switch (n) {
        case 1:
          return function(n) {
            return e.call(t, n);
          };
        case 2:
          return function(n, r) {
            return e.call(t, n, r);
          };
        case 3:
          return function(n, r, o) {
            return e.call(t, n, r, o);
          };
        case 4:
          return function(n, r, o, i) {
            return e.call(t, n, r, o, i);
          };
      }
      return qt(e, t);
    }
    function Q(e) {
      function t() {
        var e = u ? a : this;
        if (o) {
          var h = p(o);
          Hn.apply(h, arguments);
        }
        if (
          (i || l) &&
          (h || (h = p(arguments)), i && Hn.apply(h, i), l && h.length < s)
        )
          return (r |= 16), Q([n, f ? r : -4 & r, h, null, a, s]);
        if ((h || (h = arguments), c && (n = e[d]), this instanceof t)) {
          e = Y(n.prototype);
          var v = n.apply(e, h);
          return $e(v) ? v : e;
        }
        return n.apply(e, h);
      }
      var n = e[0],
        r = e[1],
        o = e[2],
        i = e[3],
        a = e[4],
        s = e[5],
        u = 1 & r,
        c = 2 & r,
        l = 4 & r,
        f = 8 & r,
        d = n;
      return Zn(t, e), t;
    }
    function Z(e, r) {
      var o = -1,
        i = ce(),
        s = e ? e.length : 0,
        u = s >= b && i === t,
        c = [];
      if (u) {
        var l = a(r);
        l ? ((i = n), (r = l)) : (u = !1);
      }
      for (; ++o < s; ) {
        var p = e[o];
        i(r, p) < 0 && c.push(p);
      }
      return u && f(r), c;
    }
    function te(e, t, n, r) {
      for (var o = (r || 0) - 1, i = e ? e.length : 0, a = []; ++o < i; ) {
        var s = e[o];
        if (
          s &&
          'object' == typeof s &&
          'number' == typeof s.length &&
          (er(s) || de(s))
        ) {
          t || (s = te(s, t, n));
          var u = -1,
            c = s.length,
            l = a.length;
          for (a.length += c; ++u < c; ) a[l++] = s[u];
        } else n || a.push(s);
      }
      return a;
    }
    function ne(e, t, n, r, o, i) {
      if (n) {
        var a = n(e, t);
        if (void 0 !== a) return !!a;
      }
      if (e === t) return 0 !== e || 1 / e == 1 / t;
      var s = typeof t;
      if (!(e != e || (e && V[typeof e]) || (t && V[s]))) return !1;
      if (null == e || null == t) return e === t;
      var c = Nn.call(e),
        f = Nn.call(t);
      if ((c == q && (c = I), f == q && (f = I), c != f)) return !1;
      switch (c) {
        case M:
        case P:
          return +e == +t;
        case F:
          return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
        case B:
        case W:
          return e == kn(t);
      }
      var p = c == H;
      if (!p) {
        var d = qn.call(e, '__wrapped__'),
          h = qn.call(t, '__wrapped__');
        if (d || h)
          return ne(d ? e.__wrapped__ : e, h ? t.__wrapped__ : t, n, r, o, i);
        if (c != I) return !1;
        var v = e.constructor,
          g = t.constructor;
        if (
          v != g &&
          !(De(v) && v instanceof v && De(g) && g instanceof g) &&
          'constructor' in e &&
          'constructor' in t
        )
          return !1;
      }
      var m = !o;
      o || (o = u()), i || (i = u());
      for (var y = o.length; y--; ) if (o[y] == e) return i[y] == t;
      var b = 0;
      if (((a = !0), o.push(e), i.push(t), p)) {
        if (((y = e.length), (b = t.length), (a = b == y) || r))
          for (; b--; ) {
            var x = y,
              w = t[b];
            if (r) for (; x-- && !(a = ne(e[x], w, n, r, o, i)); );
            else if (!(a = ne(e[b], w, n, r, o, i))) break;
          }
      } else
        ur(t, function(t, s, u) {
          if (qn.call(u, s))
            return b++, (a = qn.call(e, s) && ne(e[s], t, n, r, o, i));
        }),
          a &&
            !r &&
            ur(e, function(e, t, n) {
              if (qn.call(n, t)) return (a = --b > -1);
            });
      return o.pop(), i.pop(), m && (l(o), l(i)), a;
    }
    function re(e, t, n, r, o) {
      (er(t) ? Ge : cr)(t, function(t, i) {
        var a,
          s,
          u = t,
          c = e[i];
        if (t && ((s = er(t)) || lr(t))) {
          for (var l, f = r.length; f--; )
            if ((a = r[f] == t)) {
              c = o[f];
              break;
            }
          if (!a)
            n && (l = void 0 !== (u = n(c, t))) && (c = u),
              l || (c = s ? (er(c) ? c : []) : lr(c) ? c : {}),
              r.push(t),
              o.push(c),
              l || re(c, t, n, r, o);
        } else n && void 0 === (u = n(c, t)) && (u = t), void 0 !== u && (c = u);
        e[i] = c;
      });
    }
    function oe(e, t) {
      return e + An(Kn() * (t - e + 1));
    }
    function ie(e, r, o) {
      var i = -1,
        s = ce(),
        c = e ? e.length : 0,
        p = [],
        d = !r && c >= b && s === t,
        h = o || d ? u() : p;
      d && ((s = n), (h = a(h)));
      for (; ++i < c; ) {
        var v = e[i],
          g = o ? o(v, i, e) : v;
        (r ? !i || h[h.length - 1] !== g : s(h, g) < 0) &&
          ((o || d) && h.push(g), p.push(v));
      }
      return d ? (l(h.array), f(h)) : o && l(h), p;
    }
    function ae(e) {
      return function(t, n, r) {
        var o = {};
        n = v.createCallback(n, r, 3);
        var i = -1,
          a = t ? t.length : 0;
        if ('number' == typeof a)
          for (; ++i < a; ) {
            var s = t[i];
            e(o, s, n(s, i, t), t);
          }
        else
          cr(t, function(t, r, i) {
            e(o, t, n(t, r, i), i);
          });
        return o;
      };
    }
    function se(e, t, n, r, o, i) {
      var a = 1 & t,
        s = 4 & t,
        u = 16 & t,
        c = 32 & t;
      if (!(2 & t) && !De(e)) throw new Tn();
      u && !n.length && ((t &= -17), (u = n = !1)),
        c && !r.length && ((t &= -33), (c = r = !1));
      var l = e && e.__bindData__;
      return l && !0 !== l
        ? ((l = p(l))[2] && (l[2] = p(l[2])),
          l[3] && (l[3] = p(l[3])),
          !a || 1 & l[1] || (l[4] = o),
          !a && 1 & l[1] && (t |= 8),
          !s || 4 & l[1] || (l[5] = i),
          u && Hn.apply(l[2] || (l[2] = []), n),
          c && Rn.apply(l[3] || (l[3] = []), r),
          (l[1] |= t),
          se.apply(null, l))
        : (1 == t || 17 === t ? x : Q)([e, t, n, r, o, i]);
    }
    function ue(e) {
      return nr[e];
    }
    function ce() {
      var e = (e = v.indexOf) === yt ? t : e;
      return e;
    }
    function le(e) {
      return 'function' == typeof e && Sn.test(e);
    }
    function fe(e) {
      var t, n;
      return (
        !(
          !e ||
          Nn.call(e) != I ||
          (De((t = e.constructor)) && !(t instanceof t))
        ) &&
        (ur(e, function(e, t) {
          n = t;
        }),
        void 0 === n || qn.call(e, n))
      );
    }
    function pe(e) {
      return rr[e];
    }
    function de(e) {
      return (
        (e &&
          'object' == typeof e &&
          'number' == typeof e.length &&
          Nn.call(e) == q) ||
        !1
      );
    }
    function he(e, t, n, r) {
      return (
        'boolean' != typeof t && null != t && ((r = n), (n = t), (t = !1)),
        J(e, t, 'function' == typeof n && G(n, r, 1))
      );
    }
    function ve(e, t, n) {
      return J(e, !0, 'function' == typeof t && G(t, n, 1));
    }
    function ge(e, t) {
      var n = Y(e);
      return t ? ar(n, t) : n;
    }
    function me(e, t, n) {
      var r;
      return (
        (t = v.createCallback(t, n, 3)),
        cr(e, function(e, n, o) {
          if (t(e, n, o)) return (r = n), !1;
        }),
        r
      );
    }
    function ye(e, t, n) {
      var r;
      return (
        (t = v.createCallback(t, n, 3)),
        xe(e, function(e, n, o) {
          if (t(e, n, o)) return (r = n), !1;
        }),
        r
      );
    }
    function be(e, t, n) {
      var r = [];
      ur(e, function(e, t) {
        r.push(t, e);
      });
      var o = r.length;
      for (t = G(t, n, 3); o-- && !1 !== t(r[o--], r[o], e); );
      return e;
    }
    function xe(e, t, n) {
      var r = tr(e),
        o = r.length;
      for (t = G(t, n, 3); o--; ) {
        var i = r[o];
        if (!1 === t(e[i], i, e)) break;
      }
      return e;
    }
    function we(e) {
      var t = [];
      return (
        ur(e, function(e, n) {
          De(e) && t.push(n);
        }),
        t.sort()
      );
    }
    function Ce(e, t) {
      return !!e && qn.call(e, t);
    }
    function ke(e) {
      for (var t = -1, n = tr(e), r = n.length, o = {}; ++t < r; ) {
        var i = n[t];
        o[e[i]] = i;
      }
      return o;
    }
    function Te(e) {
      return (
        !0 === e ||
        !1 === e ||
        (e && 'object' == typeof e && Nn.call(e) == M) ||
        !1
      );
    }
    function _e(e) {
      return (e && 'object' == typeof e && Nn.call(e) == P) || !1;
    }
    function Ee(e) {
      return (e && 1 === e.nodeType) || !1;
    }
    function je(e) {
      var t = !0;
      if (!e) return t;
      var n = Nn.call(e),
        r = e.length;
      return n == H ||
        n == W ||
        n == q ||
        (n == I && 'number' == typeof r && De(e.splice))
        ? !r
        : (cr(e, function() {
            return (t = !1);
          }),
          t);
    }
    function Ne(e, t, n, r) {
      return ne(e, t, 'function' == typeof n && G(n, r, 2));
    }
    function Se(e) {
      return Wn(e) && !Un(parseFloat(e));
    }
    function De(e) {
      return 'function' == typeof e;
    }
    function $e(e) {
      return !(!e || !V[typeof e]);
    }
    function Ae(e) {
      return Le(e) && e != +e;
    }
    function Oe(e) {
      return null === e;
    }
    function Le(e) {
      return (
        'number' == typeof e ||
        (e && 'object' == typeof e && Nn.call(e) == F) ||
        !1
      );
    }
    function qe(e) {
      return (e && 'object' == typeof e && Nn.call(e) == B) || !1;
    }
    function He(e) {
      return (
        'string' == typeof e ||
        (e && 'object' == typeof e && Nn.call(e) == W) ||
        !1
      );
    }
    function Me(e) {
      return void 0 === e;
    }
    function Pe(e, t, n) {
      var r = {};
      return (
        (t = v.createCallback(t, n, 3)),
        cr(e, function(e, n, o) {
          r[n] = t(e, n, o);
        }),
        r
      );
    }
    function Re(e) {
      var t = arguments,
        n = 2;
      if (!$e(e)) return e;
      if (
        ('number' != typeof t[2] && (n = t.length),
        n > 3 && 'function' == typeof t[n - 2])
      )
        var r = G(t[--n - 1], t[n--], 2);
      else n > 2 && 'function' == typeof t[n - 1] && (r = t[--n]);
      for (var o = p(arguments, 1, n), i = -1, a = u(), s = u(); ++i < n; )
        re(e, o[i], r, a, s);
      return l(a), l(s), e;
    }
    function Fe(e, t, n) {
      var r = {};
      if ('function' != typeof t) {
        var o = [];
        ur(e, function(e, t) {
          o.push(t);
        });
        for (
          var i = -1, a = (o = Z(o, te(arguments, !0, !1, 1))).length;
          ++i < a;

        ) {
          var s = o[i];
          r[s] = e[s];
        }
      } else
        (t = v.createCallback(t, n, 3)),
          ur(e, function(e, n, o) {
            t(e, n, o) || (r[n] = e);
          });
      return r;
    }
    function Ie(e) {
      for (var t = -1, n = tr(e), r = n.length, o = vn(r); ++t < r; ) {
        var i = n[t];
        o[t] = [i, e[i]];
      }
      return o;
    }
    function Be(e, t, n) {
      var r = {};
      if ('function' != typeof t)
        for (
          var o = -1, i = te(arguments, !0, !1, 1), a = $e(e) ? i.length : 0;
          ++o < a;

        ) {
          var s = i[o];
          s in e && (r[s] = e[s]);
        }
      else
        (t = v.createCallback(t, n, 3)),
          ur(e, function(e, n, o) {
            t(e, n, o) && (r[n] = e);
          });
      return r;
    }
    function We(e, t, n, r) {
      var o = er(e);
      if (null == n)
        if (o) n = [];
        else {
          var i = e && e.constructor,
            a = i && i.prototype;
          n = Y(a);
        }
      return (
        t &&
          ((t = v.createCallback(t, r, 4)),
          (o ? Ge : cr)(e, function(e, r, o) {
            return t(n, e, r, o);
          })),
        n
      );
    }
    function Ue(e) {
      for (var t = -1, n = tr(e), r = n.length, o = vn(r); ++t < r; )
        o[t] = e[n[t]];
      return o;
    }
    function ze(e) {
      for (
        var t = arguments,
          n = -1,
          r = te(t, !0, !1, 1),
          o = t[2] && t[2][t[1]] === e ? 1 : r.length,
          i = vn(o);
        ++n < o;

      )
        i[n] = e[r[n]];
      return i;
    }
    function Xe(e, t, n) {
      var r = -1,
        o = ce(),
        i = e ? e.length : 0,
        a = !1;
      return (
        (n = (n < 0 ? Xn(0, i + n) : n) || 0),
        er(e)
          ? (a = o(e, t, n) > -1)
          : 'number' == typeof i
          ? (a = (He(e) ? e.indexOf(t, n) : o(e, t, n)) > -1)
          : cr(e, function(e) {
              if (++r >= n) return !(a = e === t);
            }),
        a
      );
    }
    function Ve(e, t, n) {
      var r = !0;
      t = v.createCallback(t, n, 3);
      var o = -1,
        i = e ? e.length : 0;
      if ('number' == typeof i) for (; ++o < i && (r = !!t(e[o], o, e)); );
      else
        cr(e, function(e, n, o) {
          return (r = !!t(e, n, o));
        });
      return r;
    }
    function Je(e, t, n) {
      var r = [];
      t = v.createCallback(t, n, 3);
      var o = -1,
        i = e ? e.length : 0;
      if ('number' == typeof i)
        for (; ++o < i; ) {
          var a = e[o];
          t(a, o, e) && r.push(a);
        }
      else
        cr(e, function(e, n, o) {
          t(e, n, o) && r.push(e);
        });
      return r;
    }
    function Ke(e, t, n) {
      t = v.createCallback(t, n, 3);
      var r,
        o = -1,
        i = e ? e.length : 0;
      if ('number' != typeof i)
        return (
          cr(e, function(e, n, o) {
            if (t(e, n, o)) return (r = e), !1;
          }),
          r
        );
      for (; ++o < i; ) {
        var a = e[o];
        if (t(a, o, e)) return a;
      }
    }
    function Ye(e, t, n) {
      var r;
      return (
        (t = v.createCallback(t, n, 3)),
        Qe(e, function(e, n, o) {
          if (t(e, n, o)) return (r = e), !1;
        }),
        r
      );
    }
    function Ge(e, t, n) {
      var r = -1,
        o = e ? e.length : 0;
      if (((t = t && void 0 === n ? t : G(t, n, 3)), 'number' == typeof o))
        for (; ++r < o && !1 !== t(e[r], r, e); );
      else cr(e, t);
      return e;
    }
    function Qe(e, t, n) {
      var r = e ? e.length : 0;
      if (((t = t && void 0 === n ? t : G(t, n, 3)), 'number' == typeof r))
        for (; r-- && !1 !== t(e[r], r, e); );
      else {
        var o = tr(e);
        (r = o.length),
          cr(e, function(e, n, i) {
            return (n = o ? o[--r] : --r), t(i[n], n, i);
          });
      }
      return e;
    }
    function Ze(e, t) {
      var n = p(arguments, 2),
        r = -1,
        o = 'function' == typeof t,
        i = e ? e.length : 0,
        a = vn('number' == typeof i ? i : 0);
      return (
        Ge(e, function(e) {
          a[++r] = (o ? t : e[t]).apply(e, n);
        }),
        a
      );
    }
    function et(e, t, n) {
      var r = -1,
        o = e ? e.length : 0;
      if (((t = v.createCallback(t, n, 3)), 'number' == typeof o))
        for (var i = vn(o); ++r < o; ) i[r] = t(e[r], r, e);
      else
        (i = []),
          cr(e, function(e, n, o) {
            i[++r] = t(e, n, o);
          });
      return i;
    }
    function tt(e, t, n) {
      var r = -Infinity,
        i = r;
      if (
        ('function' != typeof t && n && n[t] === e && (t = null),
        null == t && er(e))
      )
        for (var a = -1, s = e.length; ++a < s; ) {
          var u = e[a];
          u > i && (i = u);
        }
      else
        (t = null == t && He(e) ? o : v.createCallback(t, n, 3)),
          Ge(e, function(e, n, o) {
            var a = t(e, n, o);
            a > r && ((r = a), (i = e));
          });
      return i;
    }
    function nt(e, t, n) {
      var r = Infinity,
        i = r;
      if (
        ('function' != typeof t && n && n[t] === e && (t = null),
        null == t && er(e))
      )
        for (var a = -1, s = e.length; ++a < s; ) {
          var u = e[a];
          u < i && (i = u);
        }
      else
        (t = null == t && He(e) ? o : v.createCallback(t, n, 3)),
          Ge(e, function(e, n, o) {
            var a = t(e, n, o);
            a < r && ((r = a), (i = e));
          });
      return i;
    }
    function rt(e, t, n, r) {
      if (!e) return n;
      var o = arguments.length < 3;
      t = v.createCallback(t, r, 4);
      var i = -1,
        a = e.length;
      if ('number' == typeof a)
        for (o && (n = e[++i]); ++i < a; ) n = t(n, e[i], i, e);
      else
        cr(e, function(e, r, i) {
          n = o ? ((o = !1), e) : t(n, e, r, i);
        });
      return n;
    }
    function ot(e, t, n, r) {
      var o = arguments.length < 3;
      return (
        (t = v.createCallback(t, r, 4)),
        Qe(e, function(e, r, i) {
          n = o ? ((o = !1), e) : t(n, e, r, i);
        }),
        n
      );
    }
    function it(e, t, n) {
      return (
        (t = v.createCallback(t, n, 3)),
        Je(e, function(e, n, r) {
          return !t(e, n, r);
        })
      );
    }
    function at(e, t, n) {
      if ((e && 'number' != typeof e.length && (e = Ue(e)), null == t || n))
        return e ? e[oe(0, e.length - 1)] : h;
      var r = st(e);
      return (r.length = Vn(Xn(0, t), r.length)), r;
    }
    function st(e) {
      var t = -1,
        n = e ? e.length : 0,
        r = vn('number' == typeof n ? n : 0);
      return (
        Ge(e, function(e) {
          var n = oe(0, ++t);
          (r[t] = r[n]), (r[n] = e);
        }),
        r
      );
    }
    function ut(e) {
      var t = e ? e.length : 0;
      return 'number' == typeof t ? t : tr(e).length;
    }
    function ct(e, t, n) {
      var r;
      t = v.createCallback(t, n, 3);
      var o = -1,
        i = e ? e.length : 0;
      if ('number' == typeof i) for (; ++o < i && !(r = t(e[o], o, e)); );
      else
        cr(e, function(e, n, o) {
          return !(r = t(e, n, o));
        });
      return !!r;
    }
    function lt(e, t, n) {
      var r = -1,
        o = er(t),
        a = e ? e.length : 0,
        s = vn('number' == typeof a ? a : 0);
      for (
        o || (t = v.createCallback(t, n, 3)),
          Ge(e, function(e, n, i) {
            var a = (s[++r] = c());
            o
              ? (a.criteria = et(t, function(t) {
                  return e[t];
                }))
              : ((a.criteria = u())[0] = t(e, n, i)),
              (a.index = r),
              (a.value = e);
          }),
          a = s.length,
          s.sort(i);
        a--;

      ) {
        var p = s[a];
        (s[a] = p.value), o || l(p.criteria), f(p);
      }
      return s;
    }
    function ft(e) {
      return e && 'number' == typeof e.length ? p(e) : Ue(e);
    }
    function pt(e) {
      for (var t = -1, n = e ? e.length : 0, r = []; ++t < n; ) {
        var o = e[t];
        o && r.push(o);
      }
      return r;
    }
    function dt(e) {
      return Z(e, te(arguments, !0, !0, 1));
    }
    function ht(e, t, n) {
      var r = -1,
        o = e ? e.length : 0;
      for (t = v.createCallback(t, n, 3); ++r < o; )
        if (t(e[r], r, e)) return r;
      return -1;
    }
    function vt(e, t, n) {
      var r = e ? e.length : 0;
      for (t = v.createCallback(t, n, 3); r--; ) if (t(e[r], r, e)) return r;
      return -1;
    }
    function gt(e, t, n) {
      var r = 0,
        o = e ? e.length : 0;
      if ('number' != typeof t && null != t) {
        var i = -1;
        for (t = v.createCallback(t, n, 3); ++i < o && t(e[i], i, e); ) r++;
      } else if (null == (r = t) || n) return e ? e[0] : h;
      return p(e, 0, Vn(Xn(0, r), o));
    }
    function mt(e, t, n, r) {
      return (
        'boolean' != typeof t &&
          null != t &&
          ((r = n),
          (n = 'function' != typeof t && r && r[t] === e ? null : t),
          (t = !1)),
        null != n && (e = et(e, n, r)),
        te(e, t)
      );
    }
    function yt(e, n, r) {
      if ('number' == typeof r) {
        var o = e ? e.length : 0;
        r = r < 0 ? Xn(0, o + r) : r || 0;
      } else if (r) {
        var i = jt(e, n);
        return e[i] === n ? i : -1;
      }
      return t(e, n, r);
    }
    function bt(e, t, n) {
      var r = 0,
        o = e ? e.length : 0;
      if ('number' != typeof t && null != t) {
        var i = o;
        for (t = v.createCallback(t, n, 3); i-- && t(e[i], i, e); ) r++;
      } else r = null == t || n ? 1 : t || r;
      return p(e, 0, Vn(Xn(0, o - r), o));
    }
    function xt() {
      for (
        var e = [],
          r = -1,
          o = arguments.length,
          i = u(),
          s = ce(),
          c = s === t,
          p = u();
        ++r < o;

      ) {
        var d = arguments[r];
        (er(d) || de(d)) &&
          (e.push(d), i.push(c && d.length >= b && a(r ? e[r] : p)));
      }
      var h = e[0],
        v = -1,
        g = h ? h.length : 0,
        m = [];
      e: for (; ++v < g; ) {
        var y = i[0];
        if (((d = h[v]), (y ? n(y, d) : s(p, d)) < 0)) {
          for (r = o, (y || p).push(d); --r; )
            if (((y = i[r]) ? n(y, d) : s(e[r], d)) < 0) continue e;
          m.push(d);
        }
      }
      for (; o--; ) (y = i[o]) && f(y);
      return l(i), l(p), m;
    }
    function wt(e, t, n) {
      var r = 0,
        o = e ? e.length : 0;
      if ('number' != typeof t && null != t) {
        var i = o;
        for (t = v.createCallback(t, n, 3); i-- && t(e[i], i, e); ) r++;
      } else if (null == (r = t) || n) return e ? e[o - 1] : h;
      return p(e, Xn(0, o - r));
    }
    function Ct(e, t, n) {
      var r = e ? e.length : 0;
      for (
        'number' == typeof n && (r = (n < 0 ? Xn(0, r + n) : Vn(n, r - 1)) + 1);
        r--;

      )
        if (e[r] === t) return r;
      return -1;
    }
    function kt(e) {
      for (
        var t = arguments, n = 0, r = t.length, o = e ? e.length : 0;
        ++n < r;

      )
        for (var i = -1, a = t[n]; ++i < o; )
          e[i] === a && (Pn.call(e, i--, 1), o--);
      return e;
    }
    function Tt(e, t, n) {
      (e = +e || 0), null == t && ((t = e), (e = 0));
      for (
        var r = -1,
          o = Xn(
            0,
            Dn((t - e) / ((n = 'number' == typeof n ? n : +n || 1) || 1))
          ),
          i = vn(o);
        ++r < o;

      )
        (i[r] = e), (e += n);
      return i;
    }
    function _t(e, t, n) {
      var r = -1,
        o = e ? e.length : 0,
        i = [];
      for (t = v.createCallback(t, n, 3); ++r < o; ) {
        var a = e[r];
        t(a, r, e) && (i.push(a), Pn.call(e, r--, 1), o--);
      }
      return i;
    }
    function Et(e, t, n) {
      if ('number' != typeof t && null != t) {
        var r = 0,
          o = -1,
          i = e ? e.length : 0;
        for (t = v.createCallback(t, n, 3); ++o < i && t(e[o], o, e); ) r++;
      } else r = null == t || n ? 1 : Xn(0, t);
      return p(e, r);
    }
    function jt(e, t, n, r) {
      var o = 0,
        i = e ? e.length : o;
      for (t = (n = n ? v.createCallback(n, r, 1) : Qt)(t); o < i; ) {
        var a = (o + i) >>> 1;
        n(e[a]) < t ? (o = a + 1) : (i = a);
      }
      return o;
    }
    function Nt() {
      return ie(te(arguments, !0, !0));
    }
    function St(e, t, n, r) {
      return (
        'boolean' != typeof t &&
          null != t &&
          ((r = n),
          (n = 'function' != typeof t && r && r[t] === e ? null : t),
          (t = !1)),
        null != n && (n = v.createCallback(n, r, 3)),
        ie(e, t, n)
      );
    }
    function Dt(e) {
      return Z(e, p(arguments, 1));
    }
    function $t() {
      for (var e = -1, t = arguments.length; ++e < t; ) {
        var n = arguments[e];
        if (er(n) || de(n)) var r = r ? ie(Z(r, n).concat(Z(n, r))) : n;
      }
      return r || [];
    }
    function At() {
      for (
        var e = arguments.length > 1 ? arguments : arguments[0],
          t = -1,
          n = e ? tt(hr(e, 'length')) : 0,
          r = vn(n < 0 ? 0 : n);
        ++t < n;

      )
        r[t] = hr(e, t);
      return r;
    }
    function Ot(e, t) {
      var n = -1,
        r = e ? e.length : 0,
        o = {};
      for (t || !r || er(e[0]) || (t = []); ++n < r; ) {
        var i = e[n];
        t ? (o[i] = t[n]) : i && (o[i[0]] = i[1]);
      }
      return o;
    }
    function Lt(e, t) {
      if (!De(t)) throw new Tn();
      return function() {
        if (--e < 1) return t.apply(this, arguments);
      };
    }
    function qt(e, t) {
      return arguments.length > 2
        ? se(e, 17, p(arguments, 2), null, t)
        : se(e, 1, null, null, t);
    }
    function Ht(e) {
      for (
        var t = arguments.length > 1 ? te(arguments, !0, !1, 1) : we(e),
          n = -1,
          r = t.length;
        ++n < r;

      ) {
        var o = t[n];
        e[o] = se(e[o], 1, null, null, e);
      }
      return e;
    }
    function Mt(e, t) {
      return arguments.length > 2
        ? se(t, 19, p(arguments, 2), null, e)
        : se(t, 3, null, null, e);
    }
    function Pt() {
      for (var e = arguments, t = e.length; t--; )
        if (!De(e[t])) throw new Tn();
      return function() {
        for (var t = arguments, n = e.length; n--; ) t = [e[n].apply(this, t)];
        return t[0];
      };
    }
    function Rt(e, t) {
      return se(
        e,
        4,
        null,
        null,
        null,
        (t = 'number' == typeof t ? t : +t || e.length)
      );
    }
    function Ft(e, t, n) {
      var r,
        o,
        i,
        a,
        s,
        u,
        c,
        l = 0,
        f = !1,
        p = !0;
      if (!De(e)) throw new Tn();
      if (((t = Xn(0, t) || 0), !0 === n)) {
        var d = !0;
        p = !1;
      } else
        $e(n) &&
          ((d = n.leading),
          (f = 'maxWait' in n && (Xn(t, n.maxWait) || 0)),
          (p = 'trailing' in n ? n.trailing : p));
      var v = function() {
          var n = t - (gr() - a);
          if (n <= 0) {
            o && $n(o);
            var f = c;
            (o = u = c = h),
              f && ((l = gr()), (i = e.apply(s, r)), u || o || (r = s = null));
          } else u = Mn(v, n);
        },
        g = function() {
          u && $n(u),
            (o = u = c = h),
            (p || f !== t) &&
              ((l = gr()), (i = e.apply(s, r)), u || o || (r = s = null));
        };
      return function() {
        if (
          ((r = arguments),
          (a = gr()),
          (s = this),
          (c = p && (u || !d)),
          !1 === f)
        )
          var n = d && !u;
        else {
          o || d || (l = a);
          var h = f - (a - l),
            m = h <= 0;
          m
            ? (o && (o = $n(o)), (l = a), (i = e.apply(s, r)))
            : o || (o = Mn(g, h));
        }
        return (
          m && u ? (u = $n(u)) : u || t === f || (u = Mn(v, t)),
          n && ((m = !0), (i = e.apply(s, r))),
          !m || u || o || (r = s = null),
          i
        );
      };
    }
    function It(e) {
      if (!De(e)) throw new Tn();
      var t = p(arguments, 1);
      return Mn(function() {
        e.apply(h, t);
      }, 1);
    }
    function Bt(e, t) {
      if (!De(e)) throw new Tn();
      var n = p(arguments, 2);
      return Mn(function() {
        e.apply(h, n);
      }, t);
    }
    function Wt(e, t) {
      if (!De(e)) throw new Tn();
      var n = function() {
        var r = n.cache,
          o = t ? t.apply(this, arguments) : y + arguments[0];
        return qn.call(r, o) ? r[o] : (r[o] = e.apply(this, arguments));
      };
      return (n.cache = {}), n;
    }
    function Ut(e) {
      var t, n;
      if (!De(e)) throw new Tn();
      return function() {
        return t
          ? n
          : ((t = !0), (n = e.apply(this, arguments)), (e = null), n);
      };
    }
    function zt(e) {
      return se(e, 16, p(arguments, 1));
    }
    function Xt(e) {
      return se(e, 32, null, p(arguments, 1));
    }
    function Vt(e, t, n) {
      var r = !0,
        o = !0;
      if (!De(e)) throw new Tn();
      return (
        !1 === n
          ? (r = !1)
          : $e(n) &&
            ((r = 'leading' in n ? n.leading : r),
            (o = 'trailing' in n ? n.trailing : o)),
        (z.leading = r),
        (z.maxWait = t),
        (z.trailing = o),
        Ft(e, t, z)
      );
    }
    function Jt(e, t) {
      return se(t, 16, [e]);
    }
    function Kt(e) {
      return function() {
        return e;
      };
    }
    function Yt(e, t, n) {
      var r = typeof e;
      if (null == e || 'function' == r) return G(e, t, n);
      if ('object' != r) return nn(e);
      var o = tr(e),
        i = o[0],
        a = e[i];
      return 1 != o.length || a != a || $e(a)
        ? function(t) {
            for (
              var n = o.length, r = !1;
              n-- && (r = ne(t[o[n]], e[o[n]], null, !0));

            );
            return r;
          }
        : function(e) {
            var t = e[i];
            return a === t && (0 !== a || 1 / a == 1 / t);
          };
    }
    function Gt(e) {
      return null == e ? '' : kn(e).replace(ir, ue);
    }
    function Qt(e) {
      return e;
    }
    function Zt(e, t, n) {
      var r = !0,
        o = t && we(t);
      (t && (n || o.length)) ||
        (null == n && (n = t), (i = g), (t = e), (e = v), (o = we(t))),
        !1 === n ? (r = !1) : $e(n) && 'chain' in n && (r = n.chain);
      var i = e,
        a = De(i);
      Ge(o, function(n) {
        var o = (e[n] = t[n]);
        a &&
          (i.prototype[n] = function() {
            var t = this.__chain__,
              n = this.__wrapped__,
              a = [n];
            Hn.apply(a, arguments);
            var s = o.apply(e, a);
            if (r || t) {
              if (n === s && $e(s)) return this;
              (s = new i(s)).__chain__ = t;
            }
            return s;
          });
      });
    }
    function en() {
      return (r._ = jn), this;
    }
    function tn() {}
    function nn(e) {
      return function(t) {
        return t[e];
      };
    }
    function rn(e, t, n) {
      var r = null == e,
        o = null == t;
      if (
        (null == n &&
          ('boolean' == typeof e && o
            ? ((n = e), (e = 1))
            : o || 'boolean' != typeof t || ((n = t), (o = !0))),
        r && o && (t = 1),
        (e = +e || 0),
        o ? ((t = e), (e = 0)) : (t = +t || 0),
        n || e % 1 || t % 1)
      ) {
        var i = Kn();
        return Vn(
          e + i * (t - e + parseFloat('1e-' + ((i + '').length - 1))),
          t
        );
      }
      return oe(e, t);
    }
    function on(e, t) {
      if (e) {
        var n = e[t];
        return De(n) ? e[t]() : n;
      }
    }
    function an(t, n, r) {
      var o = v.templateSettings;
      (t = kn(t || '')), (r = sr({}, r, o));
      var i,
        a = sr({}, r.imports, o.imports),
        u = tr(a),
        c = Ue(a),
        l = 0,
        f = r.interpolate || D,
        p = "__p += '",
        d = Cn(
          (r.escape || D).source +
            '|' +
            f.source +
            '|' +
            (f === N ? _ : D).source +
            '|' +
            (r.evaluate || D).source +
            '|$',
          'g'
        );
      t.replace(d, function(e, n, r, o, a, u) {
        return (
          r || (r = o),
          (p += t.slice(l, u).replace(A, s)),
          n && (p += "' +\n__e(" + n + ") +\n'"),
          a && ((i = !0), (p += "';\n" + a + ";\n__p += '")),
          r && (p += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"),
          (l = u + e.length),
          e
        );
      }),
        (p += "';\n");
      var g = r.variable,
        m = g;
      m || (p = 'with (' + (g = 'obj') + ') {\n' + p + '\n}\n'),
        (p = (i ? p.replace(C, '') : p).replace(k, '$1').replace(T, '$1;')),
        (p =
          'function(' +
          g +
          ') {\n' +
          (m ? '' : g + ' || (' + g + ' = {});\n') +
          "var __t, __p = '', __e = _.escape" +
          (i
            ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
            : ';\n') +
          p +
          'return __p\n}');
      var y =
        '\n/*\n//# sourceURL=' +
        (r.sourceURL || '/lodash/template/source[' + L++ + ']') +
        '\n*/';
      try {
        var b = yn(u, 'return ' + p + y).apply(h, c);
      } catch (e) {
        throw ((e.source = p), e);
      }
      return n ? b(n) : ((b.source = p), b);
    }
    function sn(e, t, n) {
      e = (e = +e) > -1 ? e : 0;
      var r = -1,
        o = vn(e);
      for (t = G(t, n, 1); ++r < e; ) o[r] = t(r);
      return o;
    }
    function un(e) {
      return null == e ? '' : kn(e).replace(or, pe);
    }
    function cn(e) {
      var t = ++m;
      return kn(null == e ? '' : e) + t;
    }
    function ln(e) {
      return ((e = new g(e)).__chain__ = !0), e;
    }
    function fn(e, t) {
      return t(e), e;
    }
    function pn() {
      return (this.__chain__ = !0), this;
    }
    function dn() {
      return kn(this.__wrapped__);
    }
    function hn() {
      return this.__wrapped__;
    }
    var vn = (r = r ? ee.defaults(K.Object(), r, ee.pick(K, O)) : K).Array,
      gn = r.Boolean,
      mn = r.Date,
      yn = r.Function,
      bn = r.Math,
      xn = r.Number,
      wn = r.Object,
      Cn = r.RegExp,
      kn = r.String,
      Tn = r.TypeError,
      _n = [],
      En = wn.prototype,
      jn = r._,
      Nn = En.toString,
      Sn = Cn(
        '^' +
          kn(Nn)
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .replace(/toString| for [^\]]+/g, '.*?') +
          '$'
      ),
      Dn = bn.ceil,
      $n = r.clearTimeout,
      An = bn.floor,
      On = yn.prototype.toString,
      Ln = le((Ln = wn.getPrototypeOf)) && Ln,
      qn = En.hasOwnProperty,
      Hn = _n.push,
      Mn = r.setTimeout,
      Pn = _n.splice,
      Rn = _n.unshift,
      Fn = (function() {
        try {
          var t = {},
            n = le((n = wn.defineProperty)) && n,
            r = n(t, t, t) && n;
        } catch (e) {}
        return r;
      })(),
      In = le((In = wn.create)) && In,
      Bn = le((Bn = vn.isArray)) && Bn,
      Wn = r.isFinite,
      Un = r.isNaN,
      zn = le((zn = wn.keys)) && zn,
      Xn = bn.max,
      Vn = bn.min,
      Jn = r.parseInt,
      Kn = bn.random,
      Yn = {};
    (Yn[H] = vn),
      (Yn[M] = gn),
      (Yn[P] = mn),
      (Yn[R] = yn),
      (Yn[I] = wn),
      (Yn[F] = xn),
      (Yn[B] = Cn),
      (Yn[W] = kn),
      (g.prototype = v.prototype);
    var Gn = (v.support = {});
    (Gn.funcDecomp = !le(r.WinRTError) && $.test(d)),
      (Gn.funcNames = 'string' == typeof yn.name),
      (v.templateSettings = {
        escape: /<%-([\s\S]+?)%>/g,
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: N,
        variable: '',
        imports: { _: v }
      }),
      In ||
        (Y = (function() {
          function e() {}
          return function(t) {
            if ($e(t)) {
              e.prototype = t;
              var n = new e();
              e.prototype = null;
            }
            return n || r.Object();
          };
        })());
    var Qn,
      Zn = Fn
        ? function(e, t) {
            (X.value = t), Fn(e, '__bindData__', X);
          }
        : tn,
      er =
        Bn ||
        function(e) {
          return (
            (e &&
              'object' == typeof e &&
              'number' == typeof e.length &&
              Nn.call(e) == H) ||
            !1
          );
        },
      tr = zn
        ? function(e) {
            return $e(e) ? zn(e) : [];
          }
        : function(e) {
            var t,
              n = e,
              r = [];
            if (!n) return r;
            if (!V[typeof e]) return r;
            for (t in n) qn.call(n, t) && r.push(t);
            return r;
          },
      nr = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      },
      rr = ke(nr),
      or = Cn('(' + tr(rr).join('|') + ')', 'g'),
      ir = Cn('[' + tr(nr).join('') + ']', 'g'),
      ar = function(e, t, n) {
        var r,
          o = e,
          i = o;
        if (!o) return i;
        var a = arguments,
          s = 0,
          u = 'number' == typeof n ? 2 : a.length;
        if (u > 3 && 'function' == typeof a[u - 2])
          var c = G(a[--u - 1], a[u--], 2);
        else u > 2 && 'function' == typeof a[u - 1] && (c = a[--u]);
        for (; ++s < u; )
          if ((o = a[s]) && V[typeof o])
            for (
              var l = -1, f = V[typeof o] && tr(o), p = f ? f.length : 0;
              ++l < p;

            )
              i[(r = f[l])] = c ? c(i[r], o[r]) : o[r];
        return i;
      },
      sr = function(e, t, n) {
        var r,
          o = e,
          i = o;
        if (!o) return i;
        for (
          var a = arguments, s = 0, u = 'number' == typeof n ? 2 : a.length;
          ++s < u;

        )
          if ((o = a[s]) && V[typeof o])
            for (
              var c = -1, l = V[typeof o] && tr(o), f = l ? l.length : 0;
              ++c < f;

            )
              'undefined' == typeof i[(r = l[c])] && (i[r] = o[r]);
        return i;
      },
      ur = function(e, t, n) {
        var r,
          o = e,
          i = o;
        if (!o) return i;
        if (!V[typeof o]) return i;
        for (r in ((t = t && void 0 === n ? t : G(t, n, 3)), o))
          if (!1 === t(o[r], r, e)) return i;
        return i;
      },
      cr = function(e, t, n) {
        var r,
          o = e,
          i = o;
        if (!o) return i;
        if (!V[typeof o]) return i;
        t = t && void 0 === n ? t : G(t, n, 3);
        for (
          var a = -1, s = V[typeof o] && tr(o), u = s ? s.length : 0;
          ++a < u;

        )
          if (!1 === t(o[(r = s[a])], r, e)) return i;
        return i;
      },
      lr = Ln
        ? function(e) {
            if (!e || Nn.call(e) != I) return !1;
            var t = e.valueOf,
              n = le(t) && (n = Ln(t)) && Ln(n);
            return n ? e == n || Ln(e) == n : fe(e);
          }
        : fe,
      fr = ae(function(e, t, n) {
        qn.call(e, n) ? e[n]++ : (e[n] = 1);
      }),
      pr = ae(function(e, t, n) {
        (qn.call(e, n) ? e[n] : (e[n] = [])).push(t);
      }),
      dr = ae(function(e, t, n) {
        e[n] = t;
      }),
      hr = et,
      vr = Je,
      gr =
        (le((gr = mn.now)) && gr) ||
        function() {
          return new mn().getTime();
        },
      mr =
        8 == Jn(w + '08')
          ? Jn
          : function(e, t) {
              return Jn(He(e) ? e.replace(S, '') : e, t || 0);
            };
    return (
      (v.after = Lt),
      (v.assign = ar),
      (v.at = ze),
      (v.bind = qt),
      (v.bindAll = Ht),
      (v.bindKey = Mt),
      (v.chain = ln),
      (v.compact = pt),
      (v.compose = Pt),
      (v.constant = Kt),
      (v.countBy = fr),
      (v.create = ge),
      (v.createCallback = Yt),
      (v.curry = Rt),
      (v.debounce = Ft),
      (v.defaults = sr),
      (v.defer = It),
      (v.delay = Bt),
      (v.difference = dt),
      (v.filter = Je),
      (v.flatten = mt),
      (v.forEach = Ge),
      (v.forEachRight = Qe),
      (v.forIn = ur),
      (v.forInRight = be),
      (v.forOwn = cr),
      (v.forOwnRight = xe),
      (v.functions = we),
      (v.groupBy = pr),
      (v.indexBy = dr),
      (v.initial = bt),
      (v.intersection = xt),
      (v.invert = ke),
      (v.invoke = Ze),
      (v.keys = tr),
      (v.map = et),
      (v.mapValues = Pe),
      (v.max = tt),
      (v.memoize = Wt),
      (v.merge = Re),
      (v.min = nt),
      (v.omit = Fe),
      (v.once = Ut),
      (v.pairs = Ie),
      (v.partial = zt),
      (v.partialRight = Xt),
      (v.pick = Be),
      (v.pluck = hr),
      (v.property = nn),
      (v.pull = kt),
      (v.range = Tt),
      (v.reject = it),
      (v.remove = _t),
      (v.rest = Et),
      (v.shuffle = st),
      (v.sortBy = lt),
      (v.tap = fn),
      (v.throttle = Vt),
      (v.times = sn),
      (v.toArray = ft),
      (v.transform = We),
      (v.union = Nt),
      (v.uniq = St),
      (v.values = Ue),
      (v.where = vr),
      (v.without = Dt),
      (v.wrap = Jt),
      (v.xor = $t),
      (v.zip = At),
      (v.zipObject = Ot),
      (v.collect = et),
      (v.drop = Et),
      (v.each = Ge),
      (v.eachRight = Qe),
      (v.extend = ar),
      (v.methods = we),
      (v.object = Ot),
      (v.select = Je),
      (v.tail = Et),
      (v.unique = St),
      (v.unzip = At),
      Zt(v),
      (v.clone = he),
      (v.cloneDeep = ve),
      (v.contains = Xe),
      (v.escape = Gt),
      (v.every = Ve),
      (v.find = Ke),
      (v.findIndex = ht),
      (v.findKey = me),
      (v.findLast = Ye),
      (v.findLastIndex = vt),
      (v.findLastKey = ye),
      (v.has = Ce),
      (v.identity = Qt),
      (v.indexOf = yt),
      (v.isArguments = de),
      (v.isArray = er),
      (v.isBoolean = Te),
      (v.isDate = _e),
      (v.isElement = Ee),
      (v.isEmpty = je),
      (v.isEqual = Ne),
      (v.isFinite = Se),
      (v.isFunction = De),
      (v.isNaN = Ae),
      (v.isNull = Oe),
      (v.isNumber = Le),
      (v.isObject = $e),
      (v.isPlainObject = lr),
      (v.isRegExp = qe),
      (v.isString = He),
      (v.isUndefined = Me),
      (v.lastIndexOf = Ct),
      (v.mixin = Zt),
      (v.noConflict = en),
      (v.noop = tn),
      (v.now = gr),
      (v.parseInt = mr),
      (v.random = rn),
      (v.reduce = rt),
      (v.reduceRight = ot),
      (v.result = on),
      (v.runInContext = d),
      (v.size = ut),
      (v.some = ct),
      (v.sortedIndex = jt),
      (v.template = an),
      (v.unescape = un),
      (v.uniqueId = cn),
      (v.all = Ve),
      (v.any = ct),
      (v.detect = Ke),
      (v.findWhere = Ke),
      (v.foldl = rt),
      (v.foldr = ot),
      (v.include = Xe),
      (v.inject = rt),
      Zt(
        ((Qn = {}),
        cr(v, function(e, t) {
          v.prototype[t] || (Qn[t] = e);
        }),
        Qn),
        !1
      ),
      (v.first = gt),
      (v.last = wt),
      (v.sample = at),
      (v.take = gt),
      (v.head = gt),
      cr(v, function(e, t) {
        var n = 'sample' !== t;
        v.prototype[t] ||
          (v.prototype[t] = function(t, r) {
            var o = this.__chain__,
              i = e(this.__wrapped__, t, r);
            return o || (null != t && (!r || (n && 'function' == typeof t)))
              ? new g(i, o)
              : i;
          });
      }),
      (v.VERSION = '2.4.1'),
      (v.prototype.chain = pn),
      (v.prototype.toString = dn),
      (v.prototype.value = hn),
      (v.prototype.valueOf = hn),
      Ge(['join', 'pop', 'shift'], function(e) {
        var t = _n[e];
        v.prototype[e] = function() {
          var e = this.__chain__,
            n = t.apply(this.__wrapped__, arguments);
          return e ? new g(n, e) : n;
        };
      }),
      Ge(['push', 'reverse', 'sort', 'unshift'], function(e) {
        var t = _n[e];
        v.prototype[e] = function() {
          return t.apply(this.__wrapped__, arguments), this;
        };
      }),
      Ge(['concat', 'slice', 'splice'], function(e) {
        var t = _n[e];
        v.prototype[e] = function() {
          return new g(t.apply(this.__wrapped__, arguments), this.__chain__);
        };
      }),
      v
    );
  }
  var h,
    v = [],
    g = [],
    m = 0,
    y = +new Date() + '',
    b = 75,
    x = 40,
    w =
      ' \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000',
    C = /\b__p \+= '';/g,
    k = /\b(__p \+=) '' \+/g,
    T = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
    _ = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
    E = /\w*$/,
    j = /^\s*function[ \n\r\t]+\w/,
    N = /<%=([\s\S]+?)%>/g,
    S = RegExp('^[' + w + ']*0+(?=.$)'),
    D = /($^)/,
    $ = /\bthis\b/,
    A = /['\n\r\t\u2028\u2029\\]/g,
    O = [
      'Array',
      'Boolean',
      'Date',
      'Function',
      'Math',
      'Number',
      'Object',
      'RegExp',
      'String',
      '_',
      'attachEvent',
      'clearTimeout',
      'isFinite',
      'isNaN',
      'parseInt',
      'setTimeout'
    ],
    L = 0,
    q = '[object Arguments]',
    H = '[object Array]',
    M = '[object Boolean]',
    P = '[object Date]',
    R = '[object Function]',
    F = '[object Number]',
    I = '[object Object]',
    B = '[object RegExp]',
    W = '[object String]',
    U = {};
  (U[R] = !1), (U[q] = U[H] = U[M] = U[P] = U[F] = U[I] = U[B] = U[W] = !0);
  var z = { leading: !1, maxWait: 0, trailing: !1 },
    X = { configurable: !1, enumerable: !1, value: null, writable: !1 },
    V = {
      boolean: !1,
      function: !0,
      object: !0,
      number: !1,
      string: !1,
      undefined: !1
    },
    J = {
      '\\': '\\',
      "'": "'",
      '\n': 'n',
      '\r': 'r',
      '\t': 't',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    },
    K = (V[typeof window] && window) || this,
    Y = V[typeof exports] && exports && !exports.nodeType && exports,
    G = V[typeof module] && module && !module.nodeType && module,
    Q = G && G.exports === Y && Y,
    Z = V[typeof global] && global;
  !Z || (Z.global !== Z && Z.window !== Z) || (K = Z);
  var ee = d();
  'function' == typeof define && 'object' == typeof define.amd && define.amd
    ? ((K._ = ee),
      define(function() {
        return ee;
      }))
    : Y && G
    ? Q
      ? ((G.exports = ee)._ = ee)
      : (Y._ = ee)
    : (K._ = ee);
}.call(this),
  (function(e, t, n) {
    function r(e) {
      return e;
    }
    function o(e) {
      return decodeURIComponent(e.replace(i, ' '));
    }
    var i = /\+/g,
      a = (e.cookie = function(i, s, u) {
        if (s !== n) {
          if (
            ((u = e.extend({}, a.defaults, u)),
            null === s && (u.expires = -1),
            'number' == typeof u.expires)
          ) {
            var c = u.expires,
              l = (u.expires = new Date());
            l.setDate(l.getDate() + c);
          }
          return (
            (s = a.json ? JSON.stringify(s) : String(s)),
            (t.cookie = [
              encodeURIComponent(i),
              '=',
              a.raw ? s : encodeURIComponent(s),
              u.expires ? '; expires=' + u.expires.toUTCString() : '',
              u.path ? '; path=' + u.path : '',
              u.domain ? '; domain=' + u.domain : '',
              u.secure ? '; secure' : ''
            ].join(''))
          );
        }
        for (
          var f = a.raw ? r : o, p = t.cookie.split('; '), d = 0, h = p.length;
          d < h;
          d++
        ) {
          var v = p[d].split('=');
          if (f(v.shift()) === i) {
            var g = f(v.join('='));
            return a.json ? JSON.parse(g) : g;
          }
        }
        return null;
      });
    (a.defaults = {}),
      (e.removeCookie = function(t, n) {
        return null !== e.cookie(t) && (e.cookie(t, null, n), !0);
      });
  })(jQuery, document));
var CP = {};
($.fn._on = function(e, t, n, r) {
  (n = n || !1),
    (r = r || !1),
    this.on(
      e,
      $.proxy(function(e) {
        r || e.preventDefault();
        var o = e.target ? $(e.target) : [];
        if ((n && (t = $.proxy(t, n)), t(e, o), !r)) return !1;
      }, n)
    );
}),
  (function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module
      ? t(exports)
      : 'function' == typeof define && define.amd
      ? define(['exports'], t)
      : t((e.fe = {}));
  })(this, function(e) {
    'use strict';
    var t = function() {
        return function(e, t) {
          return e === t || (e != e && t != t);
        };
      },
      n = function(e) {
        return !(!e.$$typeof || !e._store);
      },
      r = function(e) {
        var t = { keys: new Array(e.size), values: new Array(e.size) },
          n = 0;
        return (
          e.forEach(function(e, r) {
            (t.keys[n] = r), (t.values[n++] = e);
          }),
          t
        );
      },
      o = function(e, t, n, o) {
        if (e.size !== t.size) return !1;
        var i = r(e),
          a = r(t);
        return o
          ? n(i.keys, a.keys) && n(i.values, a.values)
          : n(i.values, a.values);
      },
      i = 'function' == typeof Map,
      a = 'function' == typeof Set,
      s = t(),
      u = function(e) {
        function t(e, u) {
          if (s(e, u)) return !0;
          var c = typeof e;
          if (c !== typeof u) return !1;
          if ('object' === c && e && u) {
            var l = Array.isArray(e),
              f = Array.isArray(u),
              p = void 0;
            if (l || f) {
              if (l !== f || e.length !== u.length) return !1;
              for (p = 0; p < e.length; p++) if (!r(e[p], u[p])) return !1;
              return !0;
            }
            var d = e instanceof Date,
              h = u instanceof Date;
            if (d || h) return d === h && s(e.getTime(), u.getTime());
            var v = e instanceof RegExp,
              g = u instanceof RegExp;
            if (v || g)
              return (
                v === g &&
                e.source === u.source &&
                e.global === u.global &&
                e.ignoreCase === u.ignoreCase &&
                e.multiline === u.multiline
              );
            if (i) {
              var m = e instanceof Map,
                y = u instanceof Map;
              if (m || y) return m === y && o(e, u, t, !0);
            }
            if (a) {
              var b = e instanceof Set,
                x = u instanceof Set;
              if (b || x) return b === x && o(e, u, t, !1);
            }
            var w = Object.keys(e);
            if (w.length !== Object.keys(u).length) return !1;
            var C = void 0;
            for (p = 0; p < w.length; p++) {
              if (((C = w[p]), !Object.prototype.hasOwnProperty.call(u, C)))
                return !1;
              if (('_owner' !== C || !n(e) || !n(u)) && !r(e[C], u[C]))
                return !1;
            }
            return !0;
          }
          return !1;
        }
        var r = 'function' == typeof e ? e(t) : t;
        return t;
      },
      c = u(),
      l = t(),
      f = u(t),
      p = { createCustom: u, deep: c, sameValueZero: l, shallow: f };
    (e.createCustomEqual = u),
      (e.deepEqual = c),
      (e.sameValueZeroEqual = l),
      (e.shallowEqual = f),
      (e['default'] = p),
      Object.defineProperty(e, '__esModule', { value: !0 });
  }),
  (window._isOnLocalhost = function() {
    var e = document.location.host;
    return (
      e.match('127.0.0.1') ||
      e.match('localhost') ||
      e.match('codepen.dev') ||
      e.match('cdpn.dev')
    );
  }),
  (window._fullURL = function(e) {
    return document.location.protocol + '//' + document.location.host + e;
  }),
  (window._getUnixTimestamp = function() {
    return Math.round(new Date().getTime() / 1e3);
  }),
  (window._isValidURL = function(e) {
    var t = e || '';
    return /^(http:\/\/|https:\/\/|\/\/){1}\S+/i.test($.trim(t));
  }),
  (window._inIntegrationTest = function() {
    return 'true' === localStorage.getItem('integrationTest');
  }),
  (window._htmlEntities = function(e) {
    return String(e)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }),
  (window._htmlEncode = function(e) {
    return $('<div/>')
      .text(e)
      .html();
  }),
  (window._stripHTMLTags = function(e) {
    var t = e.replace(/<\/?[^>]+(>|$)/g, ''),
      n = $('<div>' + t + '</div>'),
      r = n.text();
    return n.remove(), r;
  }),
  (window._areEqual = function(e, t) {
    return window.fe.deepEqual(e, t);
  }),
  (window._getCPWildcardDomain = function() {
    return '.' + document.location.host;
  }),
  (window._diffObjects = function(e, t) {
    var n = {};
    for (var r in e)
      r in t &&
        (window._areEqual(e[r], t[r]) || (n[r] = { old: e[r], current: t[r] }));
    return n;
  }),
  (window._cloneDeep = function(e) {
    return JSON.parse(JSON.stringify(e || {}));
  }),
  (window._hideElementWhenUserClicksAway = function(e, t) {
    $('body').bind('click', function(n) {
      var r = $(n.target).closest(e),
        o = $(e);
      0 === r.length &&
        o.hasClass('open') &&
        ('function' == typeof t ? t(n, o) : o.removeClass('open'));
    });
  }),
  (window._onMessage = function(e) {
    window.addEventListener
      ? window.addEventListener('message', e, !1)
      : window.attachEvent('onmessage', e);
  }),
  (function() {
    function e(e) {
      try {
        return 'string' == typeof e ? $.parseJSON(e) : e;
      } catch (t) {}
      return e;
    }
    function t(e) {
      $.showModal(e.errors.url_to_modal, 'modal-error');
    }
    function n(e) {
      return '502' === e.status;
    }
    function r(e) {
      return e.errors && e.errors.new_csrf_token;
    }
    function o(e, t, n) {
      return 'function' == typeof e ? $.proxy(e, t) : $.proxy(n, t);
    }
    function i(e) {
      if ('string' == typeof e) return e;
      if (e._isJSON) return JSON.stringify(e.json);
      if (!0 === e._doNOTChange) return e;
      var t = '';
      for (var n in e)
        '' !== t && (t += '&'), (t += n + '=' + encodeURIComponent(e[n]));
      return t;
    }
    var a = 3e4;
    window.AJAXUtil = {
      post: function(e, t, n, r, o) {
        return this._send('POST', e, t, n, r, o);
      },
      simplePost: function(e, t, n) {
        return this._simpleRequest('POST', e, t, n);
      },
      get: function(e, t, n, r, o) {
        return this._send('GET', e, t, n, r, o);
      },
      put: function(e, t, n, r, o) {
        return this._send('PUT', e, t, n, r, o);
      },
      del: function(e, t, n, r, o) {
        return this._send('DELETE', e, t, n, r, o);
      },
      _send: function(s, u, c, l, f, p, d) {
        (l = o(l, this, $.noop)),
          (f = o(f, this, this.showStandardErrorMessage)),
          (p = o(p, this, $.noop));
        var h = this,
          v = {
            url: u,
            type: s,
            timeout: a,
            data: i(c),
            headers: {
              'X-Cookies-Enabled': navigator.cookieEnabled,
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'),
              'X-Retry-CSRF-Token': d ? 'true' : 'false'
            },
            error: function(t) {
              n(t) ? p() : f(e(t.responseText));
            },
            success: function(n) {
              (n = e(n)).success
                ? l(n)
                : r(n)
                ? h._handleExpiredCSRFTokenError(n, s, u, c, l, f, p)
                : n.errors && n.errors.show_modal
                ? t(n)
                : f(n);
            }
          };
        return (
          c._isJSON && (v.contentType = 'application/json; charset=utf-8'),
          $.ajax(v)
        );
      },
      _simpleRequest: function(e, t, n, r, o) {
        return $.ajax({
          url: t,
          type: e,
          timeout: a,
          data: i(r),
          error: function(e) {
            o(e);
          },
          success: function(e) {
            o(e);
          }
        });
      },
      _handleExpiredCSRFTokenError: function(e, t, n, r, o, i, a) {
        $('meta[name="csrf-token"]').attr('content', e.errors.new_csrf_token),
          this._send(t, n, r, o, i, a, !1);
      },
      showStandardErrorMessage: function(e) {
        var t = '',
          n = e.errors ? e.errors : e.error;
        for (var r in n)
          if ($.isArray(n[r]))
            for (var o = 0; o < n[r].length; o++) t += n[r][o] + '<br />';
          else 'message' === r && (t += n[r] + '<br />');
        var i = '';
        (i = '<h1>Error</h1>'),
          (i += '<p>' + t + '</p>'),
          (i +=
            '<p class="modal-buttons"><br class="mobile-break"><a href="#0" class="button button-medium hide-message">Close</a></p>'),
          $.showModal(i, 'modal-warning');
      }
    };
  })();
var ObjectUtil = {
    hasNestedValue: function(e, t) {
      if (!t) return !1;
      for (var n = t.split('.'), r = 0; r < n.length; r++) {
        var o = n[r];
        if (!e || !e.hasOwnProperty(o)) return !1;
        e = e[o];
      }
      return !0;
    }
  },
  CPLocalStorage = {
    clear: function() {
      this._exec(function() {
        localStorage.clear();
      });
    },
    setItem: function(e, t) {
      this._exec(function() {
        localStorage.setItem(e, t);
      });
    },
    getItem: function(e) {
      return this._exec(function() {
        return localStorage.getItem(e);
      });
    },
    removeItem: function(e) {
      var t = this.getItem(e);
      return (
        this._exec(function() {
          localStorage.removeItem(e);
        }),
        t
      );
    },
    _exec: function(t) {
      try {
        return t();
      } catch (e) {}
    }
  },
  Hub = window.Hub || {
    sub: function(e, t) {
      if ('function' != typeof t) throw 'fn MUST be a function';
      window.addEventListener(e, e => t(e, e.detail.data));
    },
    pub: function(e, t) {
      var n = new CustomEvent(e, { detail: { data: t } });
      window.dispatchEvent(n);
    },
    unsub: function(e) {
      window.removeEventListener(e);
    }
  };
(window.Keytrap = (function() {
  'use strict';
  function e(e) {
    var t = [e.keyCode || e.which];
    return (
      e.shiftKey && 16 !== e.keyCode && t.push(16),
      e.ctrlKey && 17 !== e.keyCode && t.push(17),
      e.altKey && 18 !== e.keyCode && t.push(18),
      e.metaKey && 91 !== e.keyCode && t.push(91),
      t.sort(),
      t.join('+')
    );
  }
  function t(e) {
    return u[e] ? u[e] : e.toUpperCase().charCodeAt(0);
  }
  function n(e) {
    for (var n = e.split('+'), r = [], o = 0; o < n.length; o++)
      r.push(t(n[o]));
    return r.sort(), r.join('+');
  }
  function r(e) {
    for (var t = [], r = e.split(','), o = 0; o < r.length; o++)
      t.push(n(r[o]));
    return t;
  }
  function o(e, t) {
    if (a[t]) {
      for (var n = a[t], r = 0; r < n.length; r++) n[r](e);
      if (s[t] && e) return jQuery.Event(e).stopPropagation(), !1;
    }
  }
  function i(t) {
    return o(t, e(t));
  }
  var a = {},
    s = {},
    u = {
      backspace: 8,
      tab: 9,
      enter: 13,
      return: 13,
      shift: 16,
      ctrl: 17,
      comctrl: 17,
      alt: 18,
      '': 18,
      capslock: 20,
      esc: 27,
      escape: 27,
      space: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      del: 46,
      meta: 91,
      command: 91,
      ';': 186,
      '=': 187,
      ',': 188,
      '-': 189,
      '.': 190,
      '/': 191,
      '`': 192,
      '[': 219,
      '\\': 220,
      ']': 221,
      '"': 222
    };
  return (
    -1 !== navigator.appVersion.indexOf('Mac') && (u.comctrl = 91),
    $(document).on('keydown', i),
    {
      bind: function(e, t, n) {
        for (var o = r(e), i = o.length - 1; i >= 0; i--)
          jQuery.isArray(a[o[i]]) || (a[o[i]] = []),
            a[o[i]].push(t),
            (s[o[i]] = !!n);
      },
      getKeyCode: function(e) {
        return t(e);
      },
      getKeyEventID: function(t) {
        return 'string' == typeof t ? n(t) : e(t);
      },
      keyEventMatchesKeyCombo: function(t, r) {
        return e(t) === n(r);
      },
      trigger: function(e, t) {
        o(e, t);
      }
    }
  );
})()),
  (function() {
    function e(e) {
      e.preventDefault(), $.hideMessage();
    }
    function t() {
      event.preventDefault();
      var e = $(this).parent();
      e.addClass('bar-message-gone'),
        '' !== e.data('cookie') && $.cookie(e.data('cookie'), 'closed');
    }
    function n() {
      c.remove().css({ opacity: 1 });
    }
    function r(e, t, n, r, i) {
      $.showOverlay();
      var a = { class: 'modal-message modal group ' + t, html: e };
      if (n) {
        var s = n.widthUnits || 'px',
          u = n.heightUnits || 'px';
        a.style =
          'width: ' +
          n.width +
          s +
          '; height: ' +
          n.height +
          u +
          ';top: 50%; margin-top: ' +
          -n.height / 2 +
          u +
          '; left: 50%; margin-left: ' +
          -n.width / 2 +
          s +
          ';';
      }
      i &&
        !0 === i &&
        ($("<div class='modal-blocker'>").appendTo(o),
        (a.html += "<button class='close-button button green'>Close</button>")),
        $('<div />', a)
          .appendTo(o)
          .find('.close-button')
          ._on('click', $.hideModal),
        'function' == typeof r && r();
    }
    var o = $('body'),
      i = $('#modal-overlay'),
      a = $('#popup-overlay');
    o.on('click', '.hide-message', e),
      $('.bar-message > .close').on('click', t),
      i.on('click', function() {
        $.hideMessage();
      });
    var s,
      u = { fast: 1e3, slow: 5e3, 'super-slow': 1e4 },
      c = $('<div />', { class: 'flash-message' });
    ($.showMessage = function(e, t) {
      $.hideMessage(), (t = t === undefined ? 'fast' : t);
      var r = u[t];
      r && (t = r);
      var i = $('<div>' + e + '</div>');
      if (
        (i
          .find('*')
          .not('a, b, i, br, span, button')
          .each(function() {
            $(this).remove();
          }),
        c
          .html(i.html())
          .stop()
          .appendTo(o),
        'until-dismiss' === t)
      ) {
        c.addClass('center');
        var a = $(
          '<a href="#0" class="dismiss"><svg class="icon-x"><use xlink:href="#x"></use></svg></a>'
        );
        a.click(function(e) {
          e.preventDefault(), $('.flash-message').remove();
        }),
          c.append(a);
      }
      s && clearTimeout(s),
        'until-dismiss' !== t &&
          (s = setTimeout(function() {
            c.animate({ opacity: 0 }, 400, n), (s = null);
          }, t));
    }),
      ($.hideMessage = function() {
        n(),
          $('.modal-message').remove(),
          $('.modal-blocker').remove(),
          $.hideOverlay();
      }),
      Hub.sub('key', function(e, t) {
        'esc' === t.key && $.hideMessage();
      }),
      Hub.sub('popup-open', function() {
        $.hideMessage();
      }),
      ($.hideModal = function() {
        $.hideMessage();
      }),
      ($.showModal = function(e, t, n, r) {
        $.hideModal(),
          '/' === e.substring(0, 1) || 'http' === e.substring(0, 4)
            ? $.ajax({
                url: e,
                success: function(e) {
                  $.showModalContent(e.html, t, n, r);
                }
              })
            : $.showModalContent(e, t, n, r);
      }),
      ($.showOverlay = function() {
        i.show();
      }),
      ($.hideOverlay = function() {
        i.hide();
      }),
      ($.showModalContent = function(e, t, n, o, i) {
        'object' != typeof n && ((o = n), (n = null)), r(e, t, n, o, i);
      }),
      ($.showModalIframe = function(e, t, n, r, o) {
        var i = "<iframe width='100%' height='100%' src='" + e + "'></iframe>";
        $.showModalContent(i, t, n, r, o),
          $('.close-button').one('click', function(e) {
            e.stopPropagation(), $.hideMessage();
          });
      });
    var l = 0;
    (CP.showPopupOverlay = function() {
      ++l > 0 && a.show();
    }),
      (CP.hidePopupOverlay = function() {
        0 === (l = Math.max(0, l - 1)) && a.hide();
      }),
      Keytrap.bind(
        'esc',
        function() {
          Hub.pub('key', { key: 'esc' });
        },
        !0
      );
  })(),
  (function() {
    function e() {
      t(), i();
    }
    function t() {
      var e = !1;
      $('body').on('click', '.tabs > nav a', function(t) {
        '' !== this.hash &&
          ((e = $(this)
            .closest('.tabs')
            .data('hash-change')),
          n(this.hash, e),
          t.preventDefault());
      }),
        $('.mobile-trigger')._on('click', o, this);
    }
    function n(e, t) {
      if (r(e)) {
        e = e.replace('/', '');
        var n = $('[href=' + e + ']'),
          o = $(e);
        n
          .addClass('active')
          .siblings()
          .removeClass('active'),
          o
            .addClass('active')
            .siblings()
            .removeClass('active'),
          'no' !== t && window.history.replaceState('', '', e),
          n.parent().removeClass('open');
      }
    }
    function r(e) {
      var t = ['', '0', '#', '#0'];
      return !_.contains(t, e) && !_.contains(e, '&') && !_.contains(e, '=');
    }
    function o(e, t) {
      t.closest('.explore-tabs').toggleClass('open');
    }
    function i() {
      n(document.location.hash);
    }
    (CP.Tabs = {}), e();
  })(),
  (document.documentElement.className += ' js'),
  (function() {
    function e() {
      t(),
        s.is('#profile-search-form') ||
          a($("#search-form input[name='type']:checked"));
    }
    function t() {
      $('#header-search-button').on('click', n),
        $("#search-form input[name='type']").on('click', i),
        u.on('click', r);
    }
    function n(e) {
      e.preventDefault(),
        u.hasClass('open')
          ? u.removeClass('open')
          : (u
              .addClass('open')
              .css('display', 'none')
              .height(),
            u.css('display', 'block'),
            setTimeout(function() {
              $('#q').focus();
            }, 100));
    }
    function r(e) {
      $(e.target).closest('#search-elements-div').length < 1 && o();
    }
    function o() {
      u.removeClass('open');
    }
    function i() {
      a($(this).val());
    }
    function a(e) {
      switch (e) {
        case 'type-posts':
        case 'type-users':
        case 'type-collections':
        case 'type-projects':
          var t = e.split('-')[1];
          s.attr('action', '/search/' + t);
          break;
        default:
          s.attr('action', '/search/pens');
      }
    }
    var s = $('.search-form'),
      u = $('#header-search-form-wrap');
    e();
  })(),
  (function() {
    if (document.getElementsByClassName('bsarocks').length > 0) {
      var e = document.createElement('script');
      (e.type = 'text/javascript'),
        (e.async = !0),
        (e.src = 'https://s3.buysellads.com/ac/bsa.js'),
        (
          document.getElementsByTagName('head')[0] ||
          document.getElementsByTagName('body')[0]
        ).appendChild(e);
    }
  })(),
  (function() {
    function e() {
      var e = 'click.flyout touchend.flyout';
      $('body')
        .off(e, '.help-flyout-link .icon-help')
        .on(e, '.help-flyout-link .icon-help', r)
        .off(e, '.help-flyout-link .icon-x')
        .on(e, '.help-flyout-link .icon-x', o);
    }
    function t() {
      Hub.sub('key', $.proxy(n, window));
    }
    function n(e, t) {
      'esc' === t.key && o();
    }
    function r(e) {
      e && e.preventDefault();
      var t = $(this).next(),
        n = t.is(':visible');
      return (
        o(),
        n
          ? (t.hide(), t.parent().removeClass('open'))
          : (t.show(), t.parent().addClass('open')),
        !1
      );
    }
    function o(e) {
      return (
        e && e.preventDefault(),
        $('.help-flyout')
          .hide()
          .parent()
          .removeClass('open'),
        !1
      );
    }
    (CP.HelpFlyouts = {}),
      (CP.HelpFlyouts.init = function() {
        e(), t();
      }),
      CP.HelpFlyouts.init();
  })(),
  (function() {
    function e(e) {
      if (!(window.innerWidth < 850)) {
        e.preventDefault(), e.stopPropagation();
        var t = $(this).data('upsell-type');
        t &&
          $.showModalIframe(
            '/accounts/upgrade_modal#' + t,
            'upgrade-upsell-modal top-layer-modal',
            { width: 620, height: 95, heightUnits: 'vh' },
            null,
            !0
          );
      }
    }
    (CP.UpgradeUpsell = {}), $('body').on('click', '.upgrade-upsell', e);
  })(),
  (function() {
    function e(e) {
      e.preventDefault();
      var t,
        n = $(this),
        r = [
          '/ajax/upgrades/projects',
          '/ajax/upgrades/project_feature',
          '/ajax/upgrades/posts_feature',
          '/ajax/upgrades/collections_feature',
          '/ajax/upgrades/presentation_mode',
          '/ajax/upgrades/zip'
        ];
      if (
        !(t = n.hasClass('.upsell') ? n : n.closest('.upsell')).hasClass(
          'upgrade-upsell'
        )
      ) {
        var o = 'modal-upsell',
          i = t.data('url'),
          a = t.data('upsell-type');
        r.indexOf(i) > -1 && (o = 'modal-error'), $.showModal(i, o + ' ' + a);
      }
    }
    (CP.Upsell = {}),
      $('body').on('click', '.upsell', e),
      (CP.Upsell.showDialogFromURL = function(e, t) {
        $.showModal(e, 'modal-upsell ' + t);
      });
  })();
