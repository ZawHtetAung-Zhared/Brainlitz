!(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t()
    : 'function' == typeof define && define.amd
    ? define(t)
    : t();
})(0, function() {
  'use strict';
  function e(e) {
    return e === un || e === cn;
  }
  function t(e) {
    return e > 47 && e < 58;
  }
  function n(e, t, n) {
    return (n = n || 90), (e &= -33) >= (t = t || 65) && e <= n;
  }
  function r(e) {
    return t(e) || n(e);
  }
  function i(e) {
    return 32 === e || 9 === e || 160 === e;
  }
  function o(e) {
    return i(e) || 10 === e || 13 === e;
  }
  function a(e, t, n, r) {
    r = r ? Object.assign({}, hn, r) : hn;
    var i = e.pos;
    if (e.eat(t)) {
      for (var o, a = 1; !e.eof(); )
        if (!pn(e, r))
          if ((o = e.next()) === t) a++;
          else if (o === n) {
            if (!--a) return (e.start = i), !0;
          } else o === r.escape && e.next();
      if (((e.pos = i), r.throws))
        throw e.error(
          'Unable to find matching pair for ' + String.fromCharCode(t)
        );
    }
    return !1;
  }
  function s(e, t) {
    return e instanceof dn
      ? e
      : 'string' == typeof e
      ? new dn(e, t)
      : e && 'object' == typeof e
      ? new dn(e.name, e.value, e.options)
      : void 0;
  }
  function l(e) {
    return String(e).trim();
  }
  function u(e, t, n) {
    return e && n.indexOf(e) === t;
  }
  function c(e) {
    if (e.eat(bn))
      return (e.start = e.pos), { count: e.eatWhile(t) ? +e.current() : null };
  }
  function f(e) {
    if (pn(e, yn)) return e.current().slice(1, -1);
  }
  function p(e) {
    var t = e.pos;
    if (e.eat(xn)) {
      for (var n, r = 1, i = '', o = e.pos; !e.eof(); )
        if ((n = e.next()) === xn) r++;
        else if (n === wn) {
          if (!--r) return (e.start = t), i + e.substring(o, e.pos - 1);
        } else
          n === kn &&
            (((n = e.next()) !== xn && n !== wn) ||
              ((i += e.substring(o, e.pos - 2) + String.fromCharCode(n)),
              (o = e.pos)));
      throw ((e.pos = t),
      e.error(
        'Unable to find closing ' + String.fromCharCode(wn) + ' for text start'
      ));
    }
    return null;
  }
  function h(e) {
    if (!e.eat(jn)) return null;
    for (var t, n, r = []; !e.eof(); ) {
      if ((e.eatWhile(i), e.eat(On))) return r;
      if (null != (t = f(e))) r.push({ name: null, value: t });
      else {
        if (!m(e)) throw e.error('Expected attribute name');
        (t = e.current()),
          Sn.test(t)
            ? ((n = d(t)),
              r.push(n),
              e.eat(Cn) &&
                (null != (t = f(e))
                  ? (n.value = t)
                  : null != (t = p(e))
                  ? ((n.value = t), (n.options = { before: '{', after: '}' }))
                  : m(e) && (n.value = e.current())))
            : r.push({ name: null, value: t });
      }
    }
    throw e.error('Expected closing "]" brace');
  }
  function d(e) {
    var t = {};
    e.charCodeAt(0) === $n && ((e = e.slice(1)), (t.implied = !0)),
      e.charCodeAt(e.length - 1) === An &&
        ((e = e.slice(0, e.length - 1)), (t.boolean = !0));
    var n = { name: e };
    return Object.keys(t).length && (n.options = t), n;
  }
  function m(e) {
    var t = e.pos;
    if (e.eatWhile(g)) return (e.start = t), !0;
  }
  function g(t) {
    return !o(t) && !e(t) && t !== jn && t !== On && t !== Cn;
  }
  function v(e) {
    for (var t, n = e.pos, r = new mn(b(e)); !e.eof(); )
      if (e.eat(zn)) r.addClass(b(e));
      else if (e.eat(_n)) r.setAttribute('id', b(e));
      else {
        if (e.eat(En)) {
          if (r.isGroup)
            throw (e.backUp(1), e.error('Unexpected self-closing indicator'));
          (r.selfClosing = !0), (t = c(e)) && (r.repeat = t);
          break;
        }
        if ((t = h(e)))
          for (var i = 0, o = t.length; i < o; i++) r.setAttribute(t[i]);
        else if (null !== (t = p(e))) r.value = t;
        else {
          if (!(t = c(e))) break;
          r.repeat = t;
        }
      }
    if (n === e.pos)
      throw e.error(
        'Unable to consume abbreviation node, unexpected ' + e.peek()
      );
    return r;
  }
  function b(e) {
    return (e.start = e.pos), e.eatWhile(y), e.current();
  }
  function y(e) {
    return (
      r(e) ||
      45 === e ||
      58 === e ||
      36 === e ||
      64 === e ||
      33 === e ||
      95 === e ||
      37 === e
    );
  }
  function x(e) {
    var t = (function(e) {
      for (var t, n = new vn(e.trim()), r = new mn(), i = r, o = []; !n.eof(); )
        if ((t = n.peek()) !== Tn)
          if (t !== qn) {
            var a = v(n);
            if ((i.appendChild(a), n.eof())) break;
            switch (n.peek()) {
              case Mn:
                n.next();
                continue;
              case Ln:
                n.next(), (i = a);
                continue;
              case Rn:
                for (; n.eat(Rn); ) i = i.parent || i;
                continue;
            }
          } else {
            var s = o.pop();
            if (!s) throw n.error('Unexpected ")" group end');
            var l = s[0];
            if (((i = s[1]), n.next(), (l.repeat = c(n)))) i.appendChild(l);
            else for (; l.firstChild; ) i.appendChild(l.firstChild);
            n.eat(Mn);
          }
        else {
          var u = new mn();
          o.push([u, i, n.pos]), (i = u), n.next();
        }
      if (o.length)
        throw ((n.pos = o.pop()[2]), n.error('Expected group close'));
      return r;
    })(e);
    return t.walk(w), t;
  }
  function w(e) {
    if (e.repeat && e.repeat.count) {
      for (var t = 0; t < e.repeat.count; t++) {
        var n = e.clone(!0);
        if (((n.repeat.value = t + 1), n.walk(w), n.isGroup))
          for (; n.children.length > 0; )
            (n.firstChild.repeat = n.repeat),
              e.parent.insertBefore(n.firstChild, e);
        else e.parent.insertBefore(n, e);
      }
      e.parent.removeChild(e);
    }
  }
  function k(e) {
    return (e = (e || '').toLowerCase()), Fn[e] || (Bn.has(e) ? 'span' : 'div');
  }
  function $(e, t) {
    for (var n = new Set(), r = t.length, i = 0; -1 !== (i = e.indexOf(t, i)); )
      n.add(i), (i += r);
    if (n.size)
      for (var o = 0, a = e.length; o < a; )
        '\\' === e[o++] && n['delete'](o++);
    return Array.from(n).map(function(e) {
      return [e, r];
    });
  }
  function A(e, t, n) {
    for (var r = t.length - 1; r >= 0; r--) {
      var i = t[r],
        o = 0,
        a = 0,
        s = !1;
      if ('@' === e.substr(i[0] + i[1], 1)) {
        '-' === e.substr(i[0] + i[1] + 1, 1) && (s = !0);
        var l = e.substr(i[0] + i[1] + 1 + Number(s)).match(/^(\d+)/);
        l
          ? ((a = l[1].length + 1 + Number(s)), (o = parseInt(l[1]) - 1))
          : (a = 2);
      }
      e =
        e.substring(0, i[0]) +
        ('function' == typeof n ? n(e.substr(i[0], i[1]), o, s) : n) +
        e.substring(i[0] + i[1] + a);
    }
    return e;
  }
  function C(e) {
    var t = (function(e) {
      for (; e; ) {
        if (e.repeat) return e.repeat;
        e = e.parent;
      }
    })(e);
    if (t && null != t.value) {
      var n = t.value,
        r = t.count;
      (e.name = j(e.name, n, r)),
        (e.value = j(e.value, n, r)),
        e.attributes.forEach(function(t) {
          var i = e.getAttribute(t.name).clone();
          (i.name = j(t.name, n, r)),
            (i.value = j(t.value, n, r)),
            e.replaceAttribute(t.name, i);
        });
    }
    return e;
  }
  function j(e, t, n) {
    return 'string' == typeof e
      ? (function(e, t, n, r) {
          return (function(e) {
            for (var t = 0, n = '', r = e.length; t < r; ) {
              var i = e[t++];
              n += '\\' === i ? e[t++] || '' : i;
            }
            return n;
          })(
            A(e, t, function(e, t, i) {
              for (
                var o = i ? String(t + r - n + 1) : String(n + t);
                o.length < e.length;

              )
                o = '0' + o;
              return o;
            })
          );
        })(
          e,
          (function(e) {
            return $(e || '', Un).reduce(function(t, n) {
              if (!/[#{]/.test(e[n[0] + 1] || '')) {
                var r = t[t.length - 1];
                r && r[0] + r[1] === n[0] ? (r[1] += n[1]) : t.push(n);
              }
              return t;
            }, []);
          })(e),
          t,
          n
        )
      : e;
  }
  function O(e, t) {
    return (
      (t = t || 1),
      e.walk(function(e) {
        if (e.repeat && null === e.repeat.count) {
          for (var n = 0; n < t; n++) {
            var r = e.clone(!0);
            (r.repeat.implicit = !0),
              (r.repeat.count = t),
              (r.repeat.value = n + 1),
              (r.repeat.index = n),
              e.parent.insertBefore(r, e);
          }
          e.remove();
        }
      }),
      e
    );
  }
  function S(e, t) {
    if (Array.isArray(t) && t.length) {
      var n = !1;
      e.walk(function(e) {
        e.repeat &&
          e.repeat.implicit &&
          ((n = !0),
          (function(e, t) {
            var n = _(e, t);
            e.walk(function(e) {
              return (n |= _(e, t));
            }),
              n || T(E(e), t);
          })(e, t[e.repeat.index]));
      }),
        n || T(E(e), t.join('\n'));
    }
    return e;
  }
  function _(e, t) {
    var n = { replaced: !1 };
    return (
      (e.value = z(e.value, t, n)),
      e.attributes.forEach(function(r) {
        r.value && e.setAttribute(r.name, z(r.value, t, n));
      }),
      n.replaced
    );
  }
  function z(e, t, n) {
    if ('string' == typeof e) {
      var r = $(e, In);
      r.length && (n && (n.replaced = !0), (e = A(e, r, t)));
    }
    return e;
  }
  function E(e) {
    for (; e.children.length; ) e = e.children[e.children.length - 1];
    return e;
  }
  function T(e, t) {
    if (e.value) {
      var n = $(e.value, Dn);
      if (n.length) return void (e.value = A(e.value, n, t));
    }
    ('a' === e.name.toLowerCase() || e.hasAttribute('href')) &&
      (Yn.test(t)
        ? e.setAttribute('href', (Gn.test(t) ? '' : 'http://') + t)
        : Vn.test(t) && e.setAttribute('href', 'mailto:' + t)),
      (e.value = t);
  }
  function q(e, t, n) {
    for (
      var r = n.length > 1 ? n.length : 0;
      e.parent && e.parent.parent && r--;

    )
      e = e.parent;
    return t.get(e) || '';
  }
  function M(e, t) {
    return e.filter(t)[0];
  }
  function L(e, t, n) {
    var r = e.getAttribute(t);
    r && (r.name = n);
  }
  function R(e, t) {
    return (
      (t = t || {}),
      e.walk(function(e) {
        return (function(e, t) {
          for (var n = e.attributes, r = 0, i = n.length; r < i; r++) {
            var o = n[r];
            'string' == typeof o.value && e.setAttribute(o.name, N(o.value, t));
          }
          return null != e.value && (e.value = N(e.value, t)), e;
        })(e, t);
      }),
      e
    );
  }
  function N(e, t) {
    for (
      var n = (function(e) {
          for (
            var t, n = /\$\{([a-z][\w\-]*)\}/gi, r = [], i = new Map();
            (t = n.exec(e));

          )
            i.set(t.index, t);
          if (i.size) {
            for (var o = 0, a = 0, s = e.length, l = ''; a < s; )
              if (92 === e.charCodeAt(a) && i.has(a + 1)) {
                var u = i.get(a + 1);
                (l += e.slice(o, a) + u[0]),
                  (o = a = u.index + u[0].length),
                  i['delete'](a + 1);
              } else a++;
            e = l + e.slice(o);
            for (
              var c = Array.from(i.values()), f = 0, p = c.length;
              f < p;
              f++
            ) {
              var h = c[f];
              r.push({ name: h[1], location: h.index, length: h[0].length });
            }
          }
          return { string: e, variables: r };
        })(e),
        r = 0,
        i = '',
        o = 0,
        a = n.variables.length;
      o < a;
      o++
    ) {
      var s = n.variables[o],
        l = s.name in t ? t[s.name] : s.name;
      'function' == typeof l && (l = l(n.string, s, r + s.location)),
        (i += n.string.slice(r, s.location) + l),
        (r = s.location + s.length);
    }
    return i + n.string.slice(r);
  }
  function B(e) {
    for (var t, n, r = new vn(e), i = [], o = '', a = 0, s = 0; !r.eof(); )
      (t = r.peek()),
        (s = r.pos),
        t === or
          ? (r.next(), r.next())
          : (n = W(r, o.length + s - a))
          ? (i.push(n),
            (o += r.string.slice(a, s) + n.placeholder),
            (a = r.pos))
          : r.next();
    return new ur(o + r.string.slice(a), i);
  }
  function F(e, t) {
    return t ? '${' + e + ':' + t + '}' : '${' + e + '}';
  }
  function W(e, t) {
    var n = e.pos;
    if (e.eat(rr)) {
      var r = U(e),
        i = '';
      if (null != r) return new lr(r, i, t);
      if (
        e.eat(ar) &&
        null != (r = U(e)) &&
        (e.eat(ir) &&
          (i = (function(e) {
            var t,
              n = [];
            for (e.start = e.pos; !e.eof(); ) {
              if ((t = e.peek()) === ar) n.push(e.pos);
              else if (t === sr) {
                if (!n.length) break;
                n.pop();
              }
              e.next();
            }
            if (n.length)
              throw e.error(
                'Unable to find matching "}" for curly brace at ' + n.pop()
              );
            return e.current();
          })(e)),
        e.eat(sr))
      )
        return new lr(r, i, t);
    }
    e.pos = n;
  }
  function U(e) {
    if (((e.start = e.pos), e.eatWhile(t))) return Number(e.current());
  }
  function P(e, t, n) {
    void 0 === n && ((n = t), (t = null)), (t = t || pr);
    var r = { index: 1 };
    return (function i(e, t, n) {
      return e
        .map(function(e) {
          var r = t(new fr(e, n));
          return r ? r.toString(i(e.children, t, n)) : '';
        })
        .join('');
    })(e.children, n, function(e) {
      return null == e
        ? t(r.index++)
        : (function(e, t) {
            var n = 'object' == typeof e ? e : B(e),
              r = -1;
            return (
              n.fields.forEach(function(e) {
                (e.index += t.index), e.index > r && (r = e.index);
              }),
              -1 !== r && (t.index = r + 1),
              n
            );
          })(e, r).mark(t);
    });
  }
  function I(e, t) {
    if (null == e) return e;
    for (
      var n,
        r,
        i = [],
        o = function(e, n, r, i) {
          return null != t[r] ? n + t[r] + i : '';
        },
        a = '',
        s = 0,
        l = 0;
      l < e.length;

    )
      (n = e.charCodeAt(l)) === dr
        ? i.push(l)
        : n === mr &&
          ((r = i.pop()),
          i.length ||
            ((a += e.slice(s, r) + e.slice(r + 1, l).replace(hr, o)),
            (s = l + 1))),
        l++;
    return a + e.slice(s);
  }
  function D(e) {
    return (e || '').split(/\r\n|\r|\n/g);
  }
  function Y(e) {
    return e.parent.firstChild === e;
  }
  function V(e) {
    return e && !e.parent;
  }
  function G(e) {
    return e.isTextOnly && !!e.children.length;
  }
  function X(e) {
    var t = e.node;
    if (G(t)) {
      var n = B(t.value),
        r = n.fields.reduce(function(e, t) {
          return !e || t.index < e.index ? t : e;
        }, null);
      if (r) {
        var i = (function(e, t) {
          var n = e.fields.indexOf(t);
          return [
            new e.constructor(
              e.string.slice(0, t.location),
              e.fields.slice(0, n)
            ),
            new e.constructor(
              e.string.slice(t.location + t.length),
              e.fields.slice(n + 1)
            )
          ];
        })(n, r);
        (e.open = e.renderFields(i[0])), (e.close = e.renderFields(i[1]));
      } else e.text = e.renderFields(n);
      return !0;
    }
    return !1;
  }
  function H(e, t) {
    return (
      !!t.get('format') &&
      (!e.parent.isTextOnly ||
        1 !== e.parent.children.length ||
        !B(e.parent.value).fields.length) &&
      (!Z(e, t) ||
        (function(e, t) {
          if (!Z(e, t)) return !1;
          if (G(e)) return !0;
          if (0 === e.childIndex) {
            for (var n = e; (n = n.nextSibling); ) if (!Z(n, t)) return !0;
          } else if (!Z(e.previousSibling, t)) return !0;
          if (t.get('inlineBreak')) {
            for (var r = 1, i = e, o = e; Q((i = i.previousSibling), t); ) r++;
            for (; Q((o = o.nextSibling), t); ) r++;
            if (r >= t.get('inlineBreak')) return !0;
          }
          for (var a = 0, s = e.children.length; a < s; a++)
            if (H(e.children[a], t)) return !0;
          return !1;
        })(e, t))
    );
  }
  function Z(e, t) {
    return (e && e.isTextOnly) || Q(e, t);
  }
  function Q(e, t) {
    return e && t.isInline(e);
  }
  function J(e, t, n) {
    n = Object.assign({}, xr, n);
    var r = e.node;
    if (
      ((e.indent = t.indent(
        (function(e) {
          for (var t = e.parent.isTextOnly ? -2 : -1, n = e; (n = n.parent); )
            t++;
          return t < 0 ? 0 : t;
        })(r)
      )),
      (e.newline = '\n'),
      (V(r.parent) && Y(r)) || (e.beforeOpen = e.newline + e.indent),
      r.name)
    ) {
      var i = Object.assign(
        {
          NAME: t.name(r.name),
          SELF_CLOSE: r.selfClosing ? n.selfClose : null
        },
        (function(e, t, n) {
          n = Object.assign({}, yr, n);
          var r = [],
            i = [];
          return (
            e.node.attributes.forEach(function(n) {
              if (n.options.implied && null == n.value) return null;
              var o = t.attribute(n.name),
                a = e.renderFields(n.value);
              if (vr.test(o)) a && r.push('#' + a);
              else if (br.test(o)) a && r.push('.' + a.replace(/\s+/g, '.'));
              else {
                var s =
                  null == n.value &&
                  (n.options.boolean ||
                    -1 !== t.get('booleanAttributes').indexOf(o.toLowerCase()));
                i.push({ name: o, value: a, isBoolean: s });
              }
            }),
            {
              PRIMARY_ATTRS: n.primary(r) || null,
              SECONDARY_ATTRS: n.secondary(i) || null
            }
          );
        })(e, t, n.attributes)
      );
      n.omitName &&
        n.omitName.test(i.NAME) &&
        i.PRIMARY_ATTRS &&
        (i.NAME = null),
        null != n.open && (e.open = I(n.open, i)),
        null != n.close && (e.close = I(n.close, i));
    }
    return e;
  }
  function K(e, t, n, r) {
    return (
      'object' == typeof n && ((r = n), (n = null)),
      (!!n && n in Cr) || (n = 'html'),
      Cr[n](e, t, r)
    );
  }
  function ee(e) {
    if (e.peek() === Sr) {
      (e.start = e.pos), e.next(), e.eat(116) || e.eatWhile(te);
      var n = e.current();
      if (((e.start = e.pos), e.eat(_r) && !e.eatWhile(t)))
        throw e.error('Unexpected character for alpha value of color');
      return new zr(n, e.current());
    }
  }
  function te(e) {
    return t(e) || n(e, 65, 70);
  }
  function ne(e) {
    return !(e % 17);
  }
  function re(e) {
    return (e >> 4).toString(16);
  }
  function ie(e) {
    return (function(e, t) {
      for (; e.length < t; ) e = '0' + e;
      return e;
    })(e.toString(16), 2);
  }
  function oe(e) {
    return t(e) || ae(e);
  }
  function ae(e) {
    return 95 === e || n(e);
  }
  function se(e) {
    if (
      ((e.start = e.pos),
      (function(e) {
        var n = e.pos,
          r = (e.eat(qr), e.pos);
        e.eatWhile(t);
        var i = e.pos;
        return (
          e.eat(Tr) && !e.eatWhile(t) && (e.pos = i),
          e.pos === r && (e.pos = n),
          e.pos !== n
        );
      })(e))
    ) {
      var n = e.current();
      return (
        (e.start = e.pos), e.eat(Er) || e.eatWhile(ae), new Mr(n, e.current())
      );
    }
  }
  function le(e, t) {
    return (
      (e.start = e.pos),
      e.eat(Lr) || e.eat(Nr)
        ? e.eatWhile(ce)
        : t
        ? e.eatWhile(ae)
        : e.eatWhile(ue),
      e.start !== e.pos ? new Br(e.current()) : null
    );
  }
  function ue(e) {
    return oe(e) || e === Rr;
  }
  function ce(e) {
    return 45 === e || oe(e);
  }
  function fe(e) {
    if (pn(e, Fr)) return new Wr(e.current());
  }
  function pe(e) {
    if (!e.eat(Ur)) return null;
    for (var t, n = []; !e.eof(); )
      if ((t = he(e))) n.push(t);
      else {
        if ((e.eatWhile(i), e.eat(Pr))) break;
        if (!e.eat(Ir)) throw e.error('Expected , or )');
      }
    return n;
  }
  function he(e) {
    for (
      var t, n = new jr();
      !e.eof() && (e.eatWhile(i), (t = se(e) || ee(e) || fe(e) || de(e)));

    )
      n.add(t);
    return n.size ? n : null;
  }
  function de(e) {
    var t = le(e);
    if (t) {
      var n = pe(e);
      return n ? new Dr(t.toString(), n) : t;
    }
  }
  function me(e) {
    return (
      (e.start = e.pos),
      e.eatWhile(be),
      e.eatWhile(ve),
      e.start !== e.pos ? e.current() : null
    );
  }
  function ge(e) {
    for (
      var t, n = new jr();
      !e.eof() &&
      (e.eat(Hr),
      (t = se(e) || ee(e)) ? t.unit || e.eat(Xr) : (e.eat(Xr), (t = le(e, !0))),
      t);

    )
      n.add(t);
    return n;
  }
  function ve(e) {
    return ae(e);
  }
  function be(e) {
    return e === Zr || e === Vr || e === Yr;
  }
  function ye(e, t) {
    if ((e = e.toLowerCase()) === (t = t.toLowerCase())) return 1;
    if (!t || e.charCodeAt(0) !== t.charCodeAt(0)) return 0;
    for (
      var n, r, i, o, a, s = e.length, l = t.length, u = 1, c = 1, f = l;
      u < s;

    ) {
      for (n = e.charCodeAt(u), i = !1, o = !1; c < l; ) {
        if (n === (r = t.charCodeAt(c))) {
          (i = !0), (f += (l - c) * (o ? 2 : 1));
          break;
        }
        (o = r === Qr), c++;
      }
      if (!i) break;
      u++;
    }
    return f && (f * (u / s)) / (((a = l) * (a + 1)) / 2);
  }
  function xe(e) {
    return (function(e) {
      e = e.sort(we);
      for (var t = [], n = 0, r = void 0, i = void 0; n < e.length; n++)
        if ((r = e[n]).property) {
          for (; t.length; ) {
            if (
              ((i = t[t.length - 1]),
              0 === r.property.indexOf(i.property) &&
                r.property.charCodeAt(i.property.length) === Kr)
            ) {
              i.addDependency(r), t.push(r);
              break;
            }
            t.pop();
          }
          t.length || t.push(r);
        }
      return e;
    })(
      e.map(function(e) {
        return new ei(e.key, e.value);
      })
    );
  }
  function we(e, t) {
    return e.key === t.key ? 0 : e.key < t.key ? -1 : 1;
  }
  function ke(e) {
    return /^\s*[\w-]+/.test(e);
  }
  function $e(e) {
    return String(e).split('|');
  }
  function Ae(e, t, n) {
    (n = Object.assign({}, ii, n)).unitAliases = Object.assign(
      {},
      ii.unitAliases,
      n && n.unitAliases
    );
    var r = xe(t.all({ type: 'string' }));
    return (
      e.walk(function(e) {
        return (function(e, t, n) {
          if (n.property)
            return (function(e, t, n) {
              var r = ni.slice();
              t && (r = r.concat(t.keywords()));
              var i = [e.name]
                .concat(e.value.value)
                .filter(Boolean)
                .map(function(e) {
                  return (
                    (('string' == typeof e || 'keyword' === e.type) &&
                      je((e = String(e)), r, null, n.fuzzySearchMinScore)) ||
                    e
                  );
                });
              return (e.name = null), (e.value.value = i), e;
            })(
              e,
              t.find(function(e) {
                return e.property === n.property;
              }),
              n
            );
          var r = je(e.name, t, 'key', n.fuzzySearchMinScore);
          return r
            ? r.property
              ? (function(e, t, n) {
                  var r = e.name;
                  if (
                    ((e.name = t.property),
                    e.value && 'object' == typeof e.value)
                  ) {
                    var i = t.keywords();
                    if (e.value.size)
                      for (var o = 0, a = void 0; o < e.value.value.length; o++)
                        '!' === (a = e.value.value[o])
                          ? (a = (o ? '' : '${1} ') + '!important')
                          : Se(a)
                          ? (a = je(a.value, i) || je(a.value, ni) || a)
                          : _e(a) && (a = Ee(e.name, a, n)),
                          (e.value.value[o] = a);
                    else {
                      var s = je(
                        (function(e, t) {
                          for (var n = 0, r = 0; n < e.length; n++) {
                            if (-1 === (r = t.indexOf(e[n], r)))
                              return e.slice(n);
                            r++;
                          }
                          return '';
                        })(r, t.key),
                        i
                      );
                      s ||
                        ((s = t.defaultValue) &&
                          -1 === s.indexOf('${') &&
                          (s = '${1:' + s + '}')),
                        s && e.value.add(s);
                    }
                  }
                  return e;
                })(e, r, n)
              : (function(e) {
                  return Ce(e, r.value);
                })(e)
            : '!' === e.name
            ? Ce(e, '!important')
            : e;
        })(e, r, n);
      }),
      e
    );
  }
  function Ce(e, t) {
    return (e.name = null), (e.value = t), e;
  }
  function je(e, t, n, r) {
    if (!e) return null;
    var i = null,
      o = 0;
    r = r || 0;
    for (var a = 0, s = void 0; a < t.length; a++) {
      var l = ye(e, Oe((s = t[a]), n));
      if (1 === l) return s;
      l && l >= o && ((o = l), (i = s));
    }
    return o >= r ? i : null;
  }
  function Oe(e, t) {
    var n = e && 'object' == typeof e ? e[t] : e,
      r = (n || '').match(/^[\w-@]+/);
    return r ? r[0] : n;
  }
  function Se(e) {
    return ze(e, 'keyword');
  }
  function _e(e) {
    return ze(e, 'numeric');
  }
  function ze(e, t) {
    return e && 'object' == typeof e && e.type === t;
  }
  function Ee(e, t, n) {
    return (
      t.unit
        ? (t.unit = n.unitAliases[t.unit] || t.unit)
        : 0 !== t.value &&
          -1 === ri.indexOf(e) &&
          (t.unit = t.value === (0 | t.value) ? n.intUnit : n.floatUnit),
      t
    );
  }
  function Te(e, t, n) {
    n = n || {};
    var r = Object.assign({}, oi, n && n.format);
    return P(e, n.field, function(n) {
      var i = n.node,
        o = qe(i, r);
      return (
        i.attributes.length &&
          (o = (function(e, t) {
            var n = B(e),
              r = n.fields.length;
            if (r)
              for (
                (t = t.slice()).length > r &&
                (t = t.slice(0, r - 1).concat(t.slice(r - 1).join(', ')));
                t.length;

              ) {
                var i = t.shift(),
                  o = n.fields.shift(),
                  a = i.length - o.length;
                n.string =
                  n.string.slice(0, o.location) +
                  i +
                  n.string.slice(o.location + o.length);
                for (var s = 0, l = n.fields.length; s < l; s++)
                  n.fields[s].location += a;
              }
            return n;
          })(
            o,
            i.attributes.map(function(e) {
              return qe(e, r);
            })
          )),
        (n.open = i.name && t.name(i.name)),
        (n.afterOpen = r.between),
        (n.text = n.renderFields(o || null)),
        !n.open || (n.text && n.text.endsWith(';')) || (n.afterText = r.after),
        t.get('format') &&
          ((n.newline = '\n'), e.lastChild !== i && (n.afterText += n.newline)),
        n
      );
    });
  }
  function qe(e, t) {
    return e.value && 'object' == typeof e.value && 'css-value' === e.value.type
      ? e.value.value
          .map(function(e) {
            return e && 'object' == typeof e
              ? 'color' === e.type
                ? e.toString(t.shortHex)
                : e.toString()
              : String(e);
          })
          .join(' ')
      : null != e.value
      ? String(e.value)
      : '';
  }
  function Me(e, t, n, r) {
    return (
      'object' == typeof n && ((r = n), (n = null)),
      (!!n && n in ai) || (n = 'css'),
      Te(
        e,
        t,
        (r = Object.assign({}, r, {
          format: (function(e, t) {
            var n = ai[e];
            return (
              'string' == typeof n && (n = ai[n]),
              Object.assign({}, n, t && t.format)
            );
          })(n, r)
        }))
      )
    );
  }
  function Le(e, t) {
    return Math.floor(Math.random() * (t - e) + e);
  }
  function Re(e, t) {
    for (var n = e.length, r = Math.min(n, t), i = new Set(); i.size < r; )
      i.add(e[Le(0, n)]);
    return Array.from(i);
  }
  function Ne(e, t) {
    var n, r;
    return (
      e.length &&
        (e = [((n = e[0]), n[0].toUpperCase() + n.slice(1))].concat(
          e.slice(1)
        )),
      e.join(' ') + (t || (r = '?!...')[Le(0, r.length - 1)])
    );
  }
  function Be(e) {
    if (e.length < 2) return e;
    var t = (e = e.slice()).length,
      n = /,$/,
      r = 0;
    r = t > 3 && t <= 6 ? Le(0, 1) : t > 6 && t <= 12 ? Le(0, 2) : Le(1, 4);
    for (var i = 0, o = void 0; i < r; i++)
      (o = Le(0, t - 2)), n.test(e[o]) || (e[o] += ',');
    return e;
  }
  function Fe(e, t, n) {
    var r,
      i = [],
      o = 0;
    for (
      n &&
      e.common &&
      ((o += (r = e.common.slice(0, t)).length), i.push(Ne(Be(r), '.')));
      o < t;

    )
      (o += (r = Re(e.words, Math.min(Le(2, 30), t - o))).length),
        i.push(Ne(Be(r)));
    return i.join(' ');
  }
  function We(e, t) {
    return t ? ('upper' === t ? e.toUpperCase() : e.toLowerCase()) : e;
  }
  function Ue(e, t) {
    return x(e)
      .use(Nn, t.snippets)
      .use(R, t.variables)
      .use(nr, t.text, t.options);
  }
  function Pe(e, t) {
    return (
      'string' == typeof e &&
        (e = (function(e) {
          for (var t = new mn(), n = new vn(e); !n.eof(); ) {
            var r = new mn(me(n));
            r.value = ge(n);
            var i = pe(n);
            if (i)
              for (var o = 0; o < i.length; o++)
                r.setAttribute(String(o), i[o]);
            if ((n.eat(Yr) && r.value.add('!'), t.appendChild(r), !n.eat(Gr)))
              break;
          }
          if (!n.eof()) throw n.error('Unexpected character');
          return t;
        })(e)),
      e.use(Ae, t.snippets, t.options)
    );
  }
  function Ie(e) {
    var t = {},
      n = e.name.match(vi);
    return n[1] && (t.lang = n[1]), n[2] && (t.wordCount = +n[2]), ci(e, t);
  }
  function De(e, t) {
    return 'stylesheet' === Xe((t = Ve(t)).type, t.syntax)
      ? (function(e, t) {
          return (
            (t = t || {}),
            'string' == typeof e && (e = Pe(e, t)),
            Me(e, t.profile, t.syntax, t)
          );
        })(e, t)
      : (function(e, t) {
          return (
            (t = Object.assign({}, t)),
            'string' == typeof e && (e = Ue(e, t)),
            K(e, t.profile, t.syntax, t)
          );
        })(e, t);
  }
  function Ye(e, t, n) {
    return (
      e &&
        'markup' !== e &&
        'stylesheet' !== e &&
        ((n = t), (t = e), (e = 'markup')),
      n instanceof di
        ? n
        : (function(e, t, n) {
            var r = [];
            'markup' === e
              ? r.push(si.html)
              : 'stylesheet' === e && r.push(si.css),
              t in si && -1 === r.indexOf(si[t]) && r.push(si[t]),
              Array.isArray(n)
                ? n.forEach(function(e) {
                    r.push('string' == typeof e ? si[e] : e);
                  })
                : 'object' == typeof n && r.push(n);
            var i = new di(r.filter(Boolean));
            return 'stylesheet' !== e && i.get(0).set(vi, Ie), i;
          })(e, t, n)
    );
  }
  function Ve(e) {
    return (
      'string' == typeof e && (e = { syntax: e }),
      null == (e = Object.assign({}, xi, e)).type &&
        e.syntax &&
        (e.type = Ge(e.syntax) ? 'stylesheet' : 'markup'),
      (e.format = Object.assign({ field: e.field }, e.format)),
      (e.profile = (function(e) {
        return e.profile instanceof gi ? e.profile : new gi(e.profile);
      })(e)),
      (e.variables = Object.assign({}, bi, e.variables)),
      (e.snippets = Ye(e.type, e.syntax, e.snippets)),
      e
    );
  }
  function Ge(e) {
    return -1 !== yi.indexOf(e);
  }
  function Xe(e, t) {
    return e
      ? 'stylesheet' === e
        ? 'stylesheet'
        : 'markup'
      : Ge(t)
      ? 'stylesheet'
      : 'markup';
  }
  function He(e) {
    return e === ki || e === $i;
  }
  function Ze(e) {
    return (
      (function(e) {
        var t = e.pos;
        return (
          !!(
            (function(e) {
              var t = e.pos,
                n = e.prev();
              if (He(n))
                for (; !e.sol(); )
                  if (e.prev() === n && e.peek() !== Ai) return !0;
              return (e.pos = t), !1;
            })(e) &&
            e.eat(_i) &&
            Je(e)
          ) || ((e.pos = t), !1)
        );
      })(e) || Qe(e)
    );
  }
  function Qe(e) {
    var t = e.pos;
    return !!(e.eatWhile(tt) && e.eat(_i) && Je(e)) || ((e.pos = t), !1);
  }
  function Je(e) {
    return e.eatWhile(Ke);
  }
  function Ke(e) {
    return (
      e === Si ||
      e === Oi ||
      (function(e) {
        return (e &= -33) >= 65 && e <= 90;
      })(e) ||
      (function(e) {
        return e > 47 && e < 58;
      })(e)
    );
  }
  function et(e) {
    return e === ji || e === Ci;
  }
  function tt(e) {
    return e && e !== _i && !et(e) && !He(e);
  }
  function nt(e, t, n) {
    var r;
    (t = Math.min(e.length, Math.max(0, null == t ? e.length : t))),
      (null !=
        (n =
          'boolean' == typeof n
            ? Object.assign({}, Wi, { lookAhead: n })
            : Object.assign({}, Wi, n)).lookAhead &&
        !0 !== n.lookAhead) ||
        (t = (function(e, t, n) {
          for (He(e.charCodeAt(t)) && t++; lt(e.charCodeAt(t), n.syntax); ) t++;
          return t;
        })(e, t, n));
    var i = (function(e, t, n) {
      if (!n) return 0;
      var r,
        i = new wi(e),
        o = String(n)
          .split('')
          .map(Ei);
      for (i.pos = t; !i.sol(); )
        if (!rt(i, qi, Ti) && !rt(i, Ni, Ri)) {
          if (((r = i.pos), it(i, o))) return r;
          i.pos--;
        }
      return -1;
    })(e, t, n.prefix);
    if (-1 === i) return null;
    var o = new wi(e, i);
    o.pos = t;
    for (var a = []; !o.sol(); ) {
      if (lt((r = o.peek()), n.syntax)) a.push(r);
      else if (st(r, n.syntax)) {
        if (a.pop() !== Fi.get(r)) break;
      } else {
        if (ot(a, qi) || ot(a, Ni)) {
          o.pos--;
          continue;
        }
        if (zi(o) || !at(r)) break;
      }
      o.pos--;
    }
    if (!a.length && o.pos !== t) {
      var s = e.slice(o.pos, t).replace(/^[*+>^]+/, '');
      return {
        abbreviation: s,
        location: t - s.length,
        start: n.prefix ? i - n.prefix.length : t - s.length,
        end: t
      };
    }
  }
  function rt(e, t, n) {
    var r = e.pos;
    if (e.eat(t))
      for (; !e.sol(); ) {
        if (e.eat(n)) return !0;
        e.pos--;
      }
    return (e.pos = r), !1;
  }
  function it(e, t) {
    for (
      var n = e.pos, r = !1, i = t.length - 1;
      i >= 0 && !e.sol() && e.eat(t[i]);
      i--
    )
      r = 0 === i;
    return r || (e.pos = n), r;
  }
  function ot(e, t) {
    return -1 !== e.indexOf(t);
  }
  function at(e) {
    return (
      (e > 64 && e < 91) ||
      (e > 96 && e < 123) ||
      (e > 47 && e < 58) ||
      Bi.has(e)
    );
  }
  function st(e, t) {
    return e === Mi || ('markup' === t && (e === Ti || e === Ri));
  }
  function lt(e, t) {
    return e === Li || ('markup' === t && (e === qi || e === Ni));
  }
  function ut(e, t) {
    var n = (function(e, t) {
        var n = t.type,
          r = t.syntax,
          i = t.project;
        return {
          syntax: r,
          type: n,
          project: i,
          format: ct(e, 'format', n, r, i),
          profile: ct(e, 'profile', n, r, i),
          options: ct(e, 'options', n, r, i),
          variables: ct(e, 'variables', n, r, i),
          snippets: ft(e, 'snippets', n, r, i).filter(Boolean)
        };
      })(
        e,
        (t = (function(e, t) {
          var n = t.type,
            r = t.syntax;
          return (
            n || r
              ? !n && r
                ? (n =
                    -1 !== Pi.markup.indexOf(r)
                      ? 'markup'
                      : -1 !== Pi.stylesheet.indexOf(r)
                      ? 'stylesheet'
                      : pt(e, ['syntax', r, 'type']) ||
                        pt(e, ['project', t.project, 'syntax', r, 'type']))
                : r || (r = Ui[n])
              : (r = Ui[(n = 'markup')]),
            Object.assign({}, t, { type: n, syntax: r })
          );
        })(e, t || {}))
      ),
      r = ['globals', 'syntax', 'project'];
    for (var i in e) -1 === r.indexOf(i) && (n[i] = e[i]);
    return n;
  }
  function ct(e, t, n, r, i) {
    return ft(e, t, n, r, i).reduce(function(e, t) {
      return Object.assign({}, e, t);
    }, {});
  }
  function ft(e, t, n, r, i) {
    return [
      pt(e, ['globals', n, t]),
      pt(e, ['project', i, 'globals', n, t]),
      pt(e, ['syntax', r, t]),
      pt(e, ['project', i, 'syntax', r, t])
    ].filter(Boolean);
  }
  function pt(e, t, n) {
    for (var r = e, i = 0; i < t.length && null != r; i++) r = r[t[i]];
    return null != r ? r : n;
  }
  function ht(e, t, n) {
    var r = (function(e, t) {
        var n = e.getMode();
        if ('jsx' === n.name || 'javascript' === n.name) return n.name;
        var r = e.getModeAt(t);
        return 'xml' === r.name ? 'html' : r.name;
      })(e, (t = t || e.getCursor())),
      i = ut(Object.assign({ field: Ii }, e.getOption('emmet'), n), {
        syntax: r
      }),
      o = e.getModeAt(t);
    return (
      'jsx' === r
        ? ((i.profile = Object.assign({ selfClosingStyle: 'xml' }, i.profile)),
          (i.options = Object.assign({ jsx: !0 }, i.options)))
        : 'xml' === o.name &&
          (i.profile = Object.assign(
            { selfClosingStyle: o.configuration },
            i.profile
          )),
      i
    );
  }
  function dt(e, t) {
    return e.line - t.line || e.ch - t.ch;
  }
  function mt(e, t, n) {
    var r = (function(e) {
        return Array.isArray(e) ? e : e.split(/\r\n|\r|\n/g);
      })(t),
      i = (function(e) {
        return e.getOption('indentWithTabs')
          ? '\t'
          : gt(' ', e.getOption('indentUnit'));
      })(e);
    return (
      '\t' !== i &&
        (r = r.map(function(e) {
          return e.replace(/^\t+/, function(e) {
            return gt(i, e.length);
          });
        })),
      n &&
        (r = r.map(function(e, t) {
          return t ? n + e : e;
        })),
      r.join('\n')
    );
  }
  function gt(e, t) {
    for (var n = ''; 0 < t--; ) n += e;
    return n;
  }
  function vt(e) {
    return B(e).string;
  }
  function bt(e, t, n) {
    return n
      ? yt(t, e.from) > 0 && yt(t, e.to) < 0
      : yt(t, e.from) >= 0 && yt(t, e.to) <= 0;
  }
  function yt(e, t) {
    return e.line - t.line || e.ch - t.ch;
  }
  function xt(e) {
    return { from: e.start, to: e.end };
  }
  function wt(e, t) {
    var n = e.getModeAt(t);
    if (n && 'css' === n.name) {
      var r = e.getTokenAt(t),
        i = (r.state && r.state.localState) || r.state;
      return i && i.context && 'prop' === i.context.type;
    }
    return !1;
  }
  function kt(e, t, n) {
    var r = e.getLine(t.from.line).match(/^\s+/),
      i = B(mt(e, n, r && r[0]));
    return e.operation(function() {
      e.replaceRange(i.string, t.from, t.to);
      var n = e.indexFromPos(t.from);
      if (i.fields.length) {
        var r = i.fields[0],
          o = e.posFromIndex(r.location + n),
          a = e.posFromIndex(r.location + r.length + n);
        e.setSelection(o, a);
      } else e.setCursor(e.posFromIndex(n + i.string.length));
      return !0;
    });
  }
  function $t(e, t, n) {
    var r = At(e, t);
    if (r && r.model) return r.model;
    var i = (function(e, t, n) {
      var r = ht(e, t);
      if (
        n &&
        !(function(e, t, n) {
          var r = e.getTokenTypeAt(t);
          return 'stylesheet' === n.type
            ? 'comment' !== r && 'string' !== r
            : 'html' === n.syntax
            ? null === r
            : 'slim' === n.syntax || 'pug' === n.syntax
            ? null === r || 'tag' === r || (r && /attribute/.test(r))
            : 'haml' === n.syntax
            ? null === r || 'attribute' === r
            : 'jsx' === n.syntax;
        })(e, t, r)
      )
        return null;
      var i = nt(e.getLine(t.line), t.ch, {
        lookAhead: !0,
        syntax: r.type,
        prefix: 'jsx' === r.syntax && e.getOption('jsxBracket') ? '<' : ''
      });
      if (i) {
        var o = { line: t.line, ch: i.start },
          a = { line: t.line, ch: i.end };
        return (
          'stylesheet' === r.type &&
            n &&
            wt(e, t) &&
            (r.options = Object.assign(
              {
                property: (function(e, t) {
                  for (var n, r = t.line, i = t.ch; i >= 0; ) {
                    if (
                      'property' === (n = e.getTokenAt({ line: r, ch: i })).type
                    )
                      return n.string;
                    if (n.start === i) break;
                    i = n.start;
                  }
                })(e, t)
              },
              r.options
            )),
          { abbreviation: i.abbreviation, range: { from: o, to: a }, config: r }
        );
      }
    })(e, t, n);
    if (i)
      try {
        var o = new Vi(i.abbreviation, i.range, i.config);
        return o.valid(e, n) ? o : null;
      } catch (e) {}
  }
  function At(e, t) {
    for (var n = e.findMarksAt(t), r = 0, i = void 0; r < n.length; r++)
      if ((i = n[r]).className === Yi) {
        if (Ot(e, i)) return i;
        i.clear();
      }
  }
  function Ct(e) {
    for (var t = e.getAllMarks(), n = 0; n < t.length; n++)
      t[n].className === Yi && t[n].clear();
  }
  function jt(e, t) {
    var n = t.range,
      r = n.from,
      i = n.to,
      o = e.markText(r, i, {
        inclusiveLeft: !0,
        inclusiveRight: !0,
        clearWhenEmpty: !0,
        className: Yi
      });
    return (o.model = t), o;
  }
  function Ot(e, t) {
    var n = t.find();
    if (n.from.line !== n.to.line) return !1;
    var r = e.getRange(n.from, n.to);
    if (!r || /^\s|\s$/g.test(r)) return !1;
    if (
      (t.model &&
        'jsx' === t.model.config.syntax &&
        '<' === r[0] &&
        (r = r.slice(1)),
      !t.model || t.model.abbreviation !== r)
    )
      try {
        (t.model = new Vi(r, n, t.model.config)),
          t.model.valid(e, !0) || (t.model = null);
      } catch (e) {
        console.warn(e), (t.model = null);
      }
    return Boolean(t.model && t.model.snippet);
  }
  function St(e, t) {
    if (e.somethingSelected()) return e.constructor.Pass;
    var n = $t(e, e.getCursor(), t);
    return n ? (n.insert(e), Ct(e), !0) : e.constructor.Pass;
  }
  function _t(e) {
    var t = e.listSelections().map(function(t) {
      return (function(e, t) {
        if (
          ((o = t.anchor),
          (a = t.head),
          o.sticky === a.sticky &&
            0 ===
              (function(e, t) {
                return e.line - t.line || e.ch - t.ch;
              })(o, a))
        ) {
          var n = t.anchor;
          if ('xml' === e.getModeAt(n).name) {
            var r = e.getTokenAt(n),
              i = e.getTokenAt(Object.assign({}, n, { ch: n.ch + 1 }));
            return (
              'tag bracket' === r.type &&
              '>' === r.string &&
              'tag bracket' === i.type &&
              '</' === i.string
            );
          }
        }
        var o, a;
      })(e, t);
    });
    if (!t.some(Boolean)) return e.constructor.Pass;
    e.operation(function() {
      for (
        var n = e.listSelections(),
          r = e.doc.lineSeparator(),
          i = r + r,
          o = n.length - 1;
        o >= 0;
        o--
      )
        e.replaceRange(t[o] ? i : r, n[o].anchor, n[o].head, '+newline');
      n = e.listSelections();
      for (var a = 0; a < n.length; a++)
        e.indentLine(n[a].from().line, null, !0),
          t[a] && e.indentLine(n[a].from().line - 1, null, !0);
      e.setSelections(
        e.listSelections().map(function(n, r) {
          if (t[r]) {
            var i = n.from().line - 1,
              o = { line: i, ch: e.getLine(i).length };
            return { anchor: o, head: o };
          }
          return n;
        })
      );
    });
  }
  function zt(e) {
    var t = (function(e) {
      if (e.somethingSelected()) {
        var t = e.listSelections().filter(function(e) {
          return e.anchor !== e.head;
        })[0];
        if (t)
          return yt(t.anchor, t.head) < 0
            ? { from: t.anchor, to: t.head }
            : { from: t.head, to: t.anchor };
      }
      return (function(e, t) {
        var n = e.getEmmetDocumentModel(),
          r = n && n.nodeForPoint(t);
        return r
          ? Et(r.open, t) || Et(r.close, t)
            ? xt(r)
            : (function(e, t, n) {
                var r = new Di(e, t);
                if ((r.eatWhile(o), (t = r.pos), n)) {
                  for (r.pos = n, r.backUp(); !r.sof() && o(r.peek()); )
                    r.backUp();
                  r.next(), (n = r.pos);
                } else n = t;
                return { from: t, to: n };
              })(e, r.open.end, r.close ? r.close.start : r.open.end)
          : null;
      })(e, e.getCursor());
    })(e);
    if (t) {
      var n = e.getOption('emmetPrompt') || Tt,
        r = e
          .getRange(t.from, t.to, '\n')
          .split('\n')
          .map(function(e) {
            return e.trim();
          });
      n(e, 'Enter abbreviation to wrap with:', function(n) {
        n && new Vi(n, t, ht(e, t.from, { text: r })).insert(e);
      });
    } else console.warn('Nothing to wrap');
  }
  function Et(e, t) {
    return e && bt(xt(e), t);
  }
  function Tt(e, t, n) {
    n(window.prompt(t));
  }
  function qt(e) {
    return (function(e) {
      e = e.sort(Mt);
      for (var t = [], n = 0, r = void 0, i = void 0; n < e.length; n++)
        if ((r = e[n]).property) {
          for (; t.length; ) {
            if (
              ((i = t[t.length - 1]),
              0 === r.property.indexOf(i.property) &&
                r.property.charCodeAt(i.property.length) === Xi)
            ) {
              i.addDependency(r), t.push(r);
              break;
            }
            t.pop();
          }
          t.length || t.push(r);
        }
      return e;
    })(
      e.map(function(e) {
        return new Hi(e.key, e.value);
      })
    );
  }
  function Mt(e, t) {
    return e.key === t.key ? 0 : e.key < t.key ? -1 : 1;
  }
  function Lt(e) {
    return /^\s*[\w-]+/.test(e);
  }
  function Rt(e) {
    return String(e).split('|');
  }
  function Nt(e, t) {
    var n = [],
      r = $t(e, (t = t || e.getCursor()), !0);
    r &&
      r.abbreviation !== r.snippet &&
      n.push(
        (function(e, t, n) {
          var r = n.preview;
          return (
            r.length > 500 && (r = r.slice(0, 500) + '...'),
            new Qi(
              'expanded-abbreviation',
              e,
              n.range,
              'Expand abbreviation',
              r,
              function(e, t) {
                return n.insert(e, t);
              }
            )
          );
        })(e, 0, r)
      );
    var i = r ? r.config : ht(e, t);
    return (
      (n =
        'stylesheet' === i.type
          ? n.concat(
              (function(e, t, n) {
                var r = Ft(e.getLine(t.line).slice(0, t.ch), /[\w-@$]/);
                if (r) {
                  var i = {
                    from: { line: t.line, ch: t.ch - r.length },
                    to: t
                  };
                  if (!n.options || !n.options.property)
                    return Bt(e, t, n)
                      .filter(function(e) {
                        return e.key !== r && 0 === e.key.indexOf(r);
                      })
                      .map(function(t) {
                        return new Qi(
                          'snippet',
                          e,
                          i,
                          t.key,
                          t.preview,
                          t.snippet
                        );
                      });
                  var o = n.options.property.toLowerCase(),
                    a = Bt(e, t, n).find(function(e) {
                      return e.property && e.property === o;
                    });
                  if (a && a.keywords.length)
                    return a.keywords
                      .map(function(t) {
                        return (
                          0 === t.key.indexOf(r) &&
                          new Qi('value', e, i, t.key, t.preview, t.snippet)
                        );
                      })
                      .filter(Boolean);
                }
                return [];
              })(e, t, i)
            )
          : n.concat(
              (function(e, t, n) {
                var r = Ft(e.getLine(t.line).slice(0, t.ch), /[\w:\-$@]/);
                if (r) {
                  var i = {
                    from: { line: t.line, ch: t.ch - r.length },
                    to: t
                  };
                  return Bt(e, t, n)
                    .filter(function(e) {
                      return e.key !== r && 0 === e.key.indexOf(r);
                    })
                    .map(function(t) {
                      return new Qi(
                        'snippet',
                        e,
                        i,
                        t.key,
                        t.preview,
                        t.snippet
                      );
                    });
                }
                return [];
              })(e, t, i)
            )),
      {
        type: i.type,
        syntax: i.syntax,
        abbreviation: r,
        completions: n.filter(Boolean)
      }
    );
  }
  function Bt(e, t, n) {
    var r = n.type,
      i = n.syntax;
    e.state.emmetCompletions || (e.state.emmetCompletions = {});
    var o = e.state.emmetCompletions;
    if (!(i in o)) {
      var a = Ye(r, i, n.snippets);
      o[i] =
        'stylesheet' === r
          ? (function(e) {
              return qt(e.all({ type: 'string' }));
            })(a).map(function(e) {
              var t = e.property,
                n = e.keywords();
              return (
                n.length
                  ? (t += ': ' + vt(n.join(' | ')))
                  : e.value && (t += ': ' + vt(e.value)),
                {
                  key: e.key,
                  value: e.value,
                  snippet: e.key,
                  property: e.property,
                  keywords: n
                    .map(function(e) {
                      var t = e.match(/^[\w-]+/);
                      return t && { key: t[0], preview: vt(e), snippet: e };
                    })
                    .filter(Boolean),
                  preview: t
                }
              );
            })
          : (function(e, t) {
              return a.all({ type: 'string' }).map(function(e) {
                return {
                  key: e.key,
                  value: e.value,
                  preview: vt(De(e.value, t)),
                  snippet: e.key
                };
              });
            })(0, n);
    }
    return o[i];
  }
  function Ft(e, t) {
    for (var n = e.length; n > 0 && t.test(e[n - 1]); ) n--;
    return e.slice(n);
  }
  function Wt(e) {
    return io(e) || eo(e, Pt);
  }
  function Ut(e) {
    var t = e.pos;
    if (pn(e)) {
      var n,
        r,
        i = e.pos;
      (e.pos = t),
        e.next(),
        (n = e.start = e.pos),
        (e.pos = i),
        e.backUp(1),
        (r = e.pos);
      var o = eo(e, n, r);
      return (e.pos = i), o;
    }
    return (
      io(e) ||
      (function(e) {
        return eo(e, Dt);
      })(e)
    );
  }
  function Pt(e) {
    return e !== ao && !It(e) && !o(e);
  }
  function It(e) {
    return e === so || e === oo;
  }
  function Dt(t) {
    return !(isNaN(t) || e(t) || o(t) || It(t));
  }
  function Yt(e) {
    return r(e) || e === co || e === uo || e === lo || e === fo;
  }
  function Vt(e, t) {
    for (var n = e.pos, r = 0; r < t.length; r++)
      if (!e.eat(t[r])) return (e.pos = n), !1;
    return (e.start = n), !0;
  }
  function Gt(e, t, n, r) {
    var i = e.pos;
    if (Vt(e, t)) {
      for (; !e.eof(); ) {
        if (Vt(e, n)) return !0;
        e.next();
      }
      return !!r || ((e.pos = i), !1);
    }
    return (e.pos = i), null;
  }
  function Xt(e) {
    return e.split('').map(function(e) {
      return e.charCodeAt(0);
    });
  }
  function Ht(e) {
    if (60 === e.peek()) return go(e) || yo(e) || po(e);
  }
  function Zt(e, t) {
    for (var n = e.pos; !e.eof(); ) {
      if (Vt(e, t)) return (e.pos = e.start), po(e);
      e.next();
    }
    return (e.pos = n), null;
  }
  function Qt(e) {
    return e[e.length - 1];
  }
  function Jt(e, t) {
    var n = new Di(e),
      r = 'xml' === t;
    try {
      return new wo(
        (function(e, t) {
          t = Object.assign({}, xo, t);
          for (
            var n,
              r,
              i,
              o,
              a = 'string' == typeof e ? new vn(e) : e,
              s = new Ji(a, 'root'),
              l = new Set(t.empty),
              u = t.special.reduce(function(e, t) {
                return e.set(t, Xt('</' + t + '>'));
              }, new Map()),
              c = function(e, n) {
                return e.selfClosing || (!t.xml && l.has(n));
              },
              f = [s];
            !a.eof();

          )
            if ((n = Ht(a)))
              if (
                ((i = (o = n).name ? o.name.value.toLowerCase() : '#' + o.type),
                'open' === n.type)
              )
                (r = new Ji(a, 'tag', n)),
                  Qt(f).addChild(r),
                  u.has(i) ? (r.close = Zt(a, u.get(i))) : c(n, i) || f.push(r);
              else if ('close' === n.type) {
                for (var p = f.length - 1; p > 0; p--)
                  if (f[p].name.toLowerCase() === i) {
                    (f[p].close = n), (f = f.slice(0, p));
                    break;
                  }
              } else Qt(f).addChild(new Ji(a, n.type, n));
            else a.next();
          return s;
        })(n, { xml: r }),
        'html',
        t || 'html'
      );
    } catch (e) {
      console.warn(e);
    }
  }
  function Kt(e) {
    return Jt(
      e,
      (function(e) {
        var t = e.getMode();
        return 'htmlmixed' === t.name
          ? 'html'
          : 'xml' === t.name
          ? t.configuration
          : t.name;
      })(e)
    );
  }
  function en(e) {
    e.state._emmetModel = null;
  }
  function tn(e, t) {
    t = t || e.getCursor();
    var n = nn(e);
    if (n)
      if (bt(n.open.find(), t)) {
        if (!n.close || an(e, n.open) === an(e, n.close)) return n;
      } else if (
        n.close &&
        bt(n.close.find(), t) &&
        an(e, n.open) === an(e, n.close)
      )
        return n;
    rn(e);
    var r = (function(e, t) {
      var n = e.getEmmetDocumentModel();
      return n && n.nodeForPoint(t || e.getCursor());
    })(e, t);
    if (r && 'tag' === r.type)
      return {
        open: on(e, r.open.name, ko),
        close: r.close && on(e, r.close.name, $o)
      };
  }
  function nn(e) {
    var t, n;
    return (
      e.getAllMarks().forEach(function(e) {
        e.className === ko ? (t = e) : e.className === $o && (n = e);
      }),
      t ? { open: t, close: n } : null
    );
  }
  function rn(e) {
    e.getAllMarks().forEach(function(e) {
      (e.className !== ko && e.className !== $o) || e.clear();
    });
  }
  function on(e, t, n) {
    return e.markText(t.start, t.end, {
      className: n,
      inclusiveLeft: !0,
      inclusiveRight: !0,
      clearWhenEmpty: !1
    });
  }
  function an(e, t) {
    var n = t.find();
    return n ? e.getRange(n.from, n.to) : '';
  }
  function sn(e, t) {
    var n = nn(e),
      r = t.from;
    n &&
      (bt(n.open.find(), r) && n.close
        ? ln(e, n.open, n.close)
        : n.close && bt(n.close.find(), r) && ln(e, n.close, n.open));
  }
  function ln(e, t, n) {
    var r = (function(e, t) {
        var n = t.find();
        return n ? e.getRange(n.from, n.to) : '';
      })(e, t),
      i = n.find(),
      o = r.match(/[\w:.-]+/),
      a = r ? o && o[0] : '';
    null != a
      ? e.getRange(i.from, i.to) !== a && e.replaceRange(a, i.from, i.to)
      : rn(e);
  }
  var un = 39,
    cn = 34,
    fn = { escape: 92, throws: !1 },
    pn = function(t, n) {
      n = n ? Object.assign({}, fn, n) : fn;
      var r = t.pos,
        i = t.peek();
      if (t.eat(e)) {
        for (; !t.eof(); )
          switch (t.next()) {
            case i:
              return (t.start = r), !0;
            case n.escape:
              t.next();
          }
        if (((t.pos = r), n.throws))
          throw t.error('Unable to consume quoted string');
      }
      return !1;
    },
    hn = { escape: 92, throws: !1 },
    dn = function(e, t, n) {
      (this.name = e),
        (this.value = null != t ? t : null),
        (this.options = n || {});
    };
  (dn.prototype.clone = function() {
    return new dn(this.name, this.value, Object.assign({}, this.options));
  }),
    (dn.prototype.valueOf = function() {
      return this.name + '="' + this.value + '"';
    });
  var mn = function(e, t) {
      var n = this;
      (this.name = e || null),
        (this.value = null),
        (this.repeat = null),
        (this.selfClosing = !1),
        (this.children = []),
        (this.parent = null),
        (this.next = null),
        (this.previous = null),
        (this._attributes = []),
        Array.isArray(t) &&
          t.forEach(function(e) {
            return n.setAttribute(e);
          });
    },
    gn = {
      attributes: { configurable: !0 },
      attributesMap: { configurable: !0 },
      isGroup: { configurable: !0 },
      isTextOnly: { configurable: !0 },
      firstChild: { configurable: !0 },
      lastChild: { configurable: !0 },
      childIndex: { configurable: !0 },
      nextSibling: { configurable: !0 },
      previousSibling: { configurable: !0 },
      classList: { configurable: !0 }
    };
  (gn.attributes.get = function() {
    return this._attributes;
  }),
    (gn.attributesMap.get = function() {
      return this.attributes.reduce(function(e, t) {
        return (e[t.name] = t.options.boolean ? t.name : t.value), e;
      }, {});
    }),
    (gn.isGroup.get = function() {
      return !this.name && !this.value && !this._attributes.length;
    }),
    (gn.isTextOnly.get = function() {
      return !this.name && !!this.value && !this._attributes.length;
    }),
    (gn.firstChild.get = function() {
      return this.children[0];
    }),
    (gn.lastChild.get = function() {
      return this.children[this.children.length - 1];
    }),
    (gn.childIndex.get = function() {
      return this.parent ? this.parent.children.indexOf(this) : -1;
    }),
    (gn.nextSibling.get = function() {
      return this.next;
    }),
    (gn.previousSibling.get = function() {
      return this.previous;
    }),
    (gn.classList.get = function() {
      var e = this.getAttribute('class');
      return e && e.value ? e.value.split(/\s+/g).filter(u) : [];
    }),
    (mn.prototype.create = function(e, t) {
      return new mn(e, t);
    }),
    (mn.prototype.setAttribute = function(e, t) {
      var n = s(e, t),
        r = this.getAttribute(e);
      r ? this.replaceAttribute(r, n) : this._attributes.push(n);
    }),
    (mn.prototype.hasAttribute = function(e) {
      return !!this.getAttribute(e);
    }),
    (mn.prototype.getAttribute = function(e) {
      'object' == typeof e && (e = e.name);
      for (var t = 0; t < this._attributes.length; t++) {
        var n = this._attributes[t];
        if (n.name === e) return n;
      }
    }),
    (mn.prototype.replaceAttribute = function(e, t, n) {
      'string' == typeof e && (e = this.getAttribute(e));
      var r = this._attributes.indexOf(e);
      -1 !== r && this._attributes.splice(r, 1, s(t, n));
    }),
    (mn.prototype.removeAttribute = function(e) {
      'string' == typeof e && (e = this.getAttribute(e));
      var t = this._attributes.indexOf(e);
      -1 !== t && this._attributes.splice(t, 1);
    }),
    (mn.prototype.clearAttributes = function() {
      this._attributes.length = 0;
    }),
    (mn.prototype.addClass = function(e) {
      (e = l(e)),
        this.hasAttribute('class')
          ? e &&
            !this.hasClass(e) &&
            this.setAttribute('class', this.classList.concat(e).join(' '))
          : this.setAttribute('class', e);
    }),
    (mn.prototype.hasClass = function(e) {
      return -1 !== this.classList.indexOf(l(e));
    }),
    (mn.prototype.removeClass = function(e) {
      (e = l(e)),
        this.hasClass(e) &&
          this.setAttribute(
            'class',
            this.classList
              .filter(function(t) {
                return t !== e;
              })
              .join(' ')
          );
    }),
    (mn.prototype.appendChild = function(e) {
      this.insertAt(e, this.children.length);
    }),
    (mn.prototype.insertBefore = function(e, t) {
      this.insertAt(e, this.children.indexOf(t));
    }),
    (mn.prototype.insertAt = function(e, t) {
      if (t < 0 || t > this.children.length)
        throw new Error(
          'Unable to insert node: position is out of child list range'
        );
      var n = this.children[t - 1],
        r = this.children[t];
      e.remove(),
        (e.parent = this),
        this.children.splice(t, 0, e),
        n && ((e.previous = n), (n.next = e)),
        r && ((e.next = r), (r.previous = e));
    }),
    (mn.prototype.removeChild = function(e) {
      var t = this.children.indexOf(e);
      -1 !== t &&
        (this.children.splice(t, 1),
        e.previous && (e.previous.next = e.next),
        e.next && (e.next.previous = e.previous),
        (e.parent = e.next = e.previous = null));
    }),
    (mn.prototype.remove = function() {
      this.parent && this.parent.removeChild(this);
    }),
    (mn.prototype.clone = function(e) {
      var t = new mn(this.name);
      return (
        (t.value = this.value),
        (t.selfClosing = this.selfClosing),
        this.repeat && (t.repeat = Object.assign({}, this.repeat)),
        this._attributes.forEach(function(e) {
          return t.setAttribute(e.clone());
        }),
        e &&
          this.children.forEach(function(e) {
            return t.appendChild(e.clone(!0));
          }),
        t
      );
    }),
    (mn.prototype.walk = function(e, t) {
      t = t || 0;
      for (var n = this.firstChild; n; ) {
        var r = n.next;
        if (!1 === e(n, t) || !1 === n.walk(e, t + 1)) return !1;
        n = r;
      }
    }),
    (mn.prototype.use = function(e) {
      for (var t = arguments, n = [this], r = 1; r < arguments.length; r++)
        n.push(t[r]);
      return e.apply(null, n), this;
    }),
    (mn.prototype.toString = function() {
      var e = this,
        t = this.attributes.map(function(t) {
          var n = (t = e.getAttribute(t.name)).options,
            r = (n && n.implied ? '!' : '') + (t.name || '');
          return (
            n && n.boolean
              ? (r += '.')
              : null != t.value && (r += '="' + t.value + '"'),
            r
          );
        }),
        n = '' + (this.name || '');
      return (
        t.length && (n += '[' + t.join(' ') + ']'),
        null != this.value && (n += '{' + this.value + '}'),
        this.selfClosing && (n += '/'),
        this.repeat &&
          ((n += '*' + (this.repeat.count ? this.repeat.count : '')),
          null != this.repeat.value && (n += '@' + this.repeat.value)),
        n
      );
    }),
    Object.defineProperties(mn.prototype, gn);
  var vn = function(e, t, n) {
    null == n && 'string' == typeof e && (n = e.length),
      (this.string = e),
      (this.pos = this.start = t || 0),
      (this.end = n);
  };
  (vn.prototype.eof = function() {
    return this.pos >= this.end;
  }),
    (vn.prototype.limit = function(e, t) {
      return new this.constructor(this.string, e, t);
    }),
    (vn.prototype.peek = function() {
      return this.string.charCodeAt(this.pos);
    }),
    (vn.prototype.next = function() {
      if (this.pos < this.string.length)
        return this.string.charCodeAt(this.pos++);
    }),
    (vn.prototype.eat = function(e) {
      var t = this.peek(),
        n = 'function' == typeof e ? e(t) : t === e;
      return n && this.next(), n;
    }),
    (vn.prototype.eatWhile = function(e) {
      for (var t = this.pos; !this.eof() && this.eat(e); );
      return this.pos !== t;
    }),
    (vn.prototype.backUp = function(e) {
      this.pos -= e || 1;
    }),
    (vn.prototype.current = function() {
      return this.substring(this.start, this.pos);
    }),
    (vn.prototype.substring = function(e, t) {
      return this.string.slice(e, t);
    }),
    (vn.prototype.error = function(e) {
      var t = new Error(e + ' at char ' + (this.pos + 1));
      return (
        (t.originalMessage = e), (t.pos = this.pos), (t.string = this.string), t
      );
    });
  var bn = 42,
    yn = { throws: !0 },
    xn = 123,
    wn = 125,
    kn = 92,
    $n = 33,
    An = 46,
    Cn = 61,
    jn = 91,
    On = 93,
    Sn = /^\!?[\w\-:\$@]+\.?$/,
    _n = 35,
    zn = 46,
    En = 47,
    Tn = 40,
    qn = 41,
    Mn = 43,
    Ln = 62,
    Rn = 94,
    Nn = function(e, t) {
      return (
        e.walk(function(e) {
          return (function(e, t) {
            var n = new Set(),
              r = function(e) {
                var i = t.resolve(e.name);
                if (i && !n.has(i)) {
                  if ('function' == typeof i.value) return i.value(e, t, r);
                  var o = x(i.value);
                  n.add(i), o.walk(r), n['delete'](i);
                  var a = (function(e) {
                    for (; e.children.length; )
                      e = e.children[e.children.length - 1];
                    return e;
                  })(o);
                  for (
                    (function(e, t) {
                      (t.name = e.name),
                        e.selfClosing && (t.selfClosing = !0),
                        null != e.value && (t.value = e.value),
                        e.repeat && (t.repeat = Object.assign({}, e.repeat)),
                        (function(e, t) {
                          !(function(e, t) {
                            for (var n = e.classList, r = 0; r < n.length; r++)
                              t.addClass(n[r]);
                          })(e, t);
                          for (
                            var n = new Map(), r = e.attributes, i = 0;
                            i < r.length;
                            i++
                          )
                            n.set(r[i].name, r[i].clone());
                          r = t.attributes.slice();
                          for (
                            var o = 0, a = void 0, s = void 0;
                            o < r.length;
                            o++
                          )
                            (a = r[o]),
                              n.has(a.name)
                                ? (((s = n.get(a.name)).value = a.value),
                                  s.options.implied && (s.options.implied = !1))
                                : n.set(a.name, a),
                              t.removeAttribute(a);
                          for (
                            var l = Array.from(n.values()), u = 0;
                            u < l.length;
                            u++
                          )
                            t.setAttribute(l[u]);
                        })(e, t);
                    })(a, e);
                    o.firstChild;

                  )
                    e.parent.insertBefore(o.firstChild, e);
                  a.parent.insertBefore(e, a), a.remove();
                }
              };
            r(e);
          })(e, t);
        }),
        e
      );
    },
    Bn = new Set(
      'a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'.split(
        ','
      )
    ),
    Fn = {
      p: 'span',
      ul: 'li',
      ol: 'li',
      table: 'tr',
      tr: 'td',
      tbody: 'tr',
      thead: 'tr',
      tfoot: 'tr',
      colgroup: 'col',
      select: 'option',
      optgroup: 'option',
      audio: 'source',
      video: 'source',
      object: 'param',
      map: 'area'
    },
    Wn = function(e) {
      return (
        e.walk(function(e) {
          null == e.name && e.attributes.length && (e.name = k(e.parent.name));
        }),
        e
      );
    },
    Un = '$',
    Pn = function(e) {
      return e.walk(C), e;
    },
    In = '$#',
    Dn = '|',
    Yn = /^((?:https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    Vn = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    Gn = /^([a-z]+:)?\/\//i,
    Xn = { element: '__', modifier: '_' },
    Hn = /^(-+)([a-z0-9]+[a-z0-9-]*)/i,
    Zn = /^(_+)([a-z0-9]+[a-z0-9-]*)/i,
    Qn = function(e) {
      return /^[a-z]\-/i.test(e);
    },
    Jn = function(e) {
      return /^[a-z]/i.test(e);
    },
    Kn = /^xsl:(variable|with\-param)$/i,
    er = {
      bem: function(e, t) {
        (t = Object.assign({}, Xn, t)),
          e.walk(function(e) {
            return (function(e) {
              var t = e.classList.reduce(function(e, t) {
                var n = t.indexOf('_');
                return n > 0 && !t.startsWith('-')
                  ? (e.add(t.slice(0, n)), e.add(t.slice(n)), e)
                  : e.add(t);
              }, new Set());
              t.size && e.setAttribute('class', Array.from(t).join(' '));
            })(e);
          });
        var n = (function(e) {
          var t = new Map();
          return (
            e.walk(function(e) {
              var n = e.classList;
              n.length && t.set(e, M(n, Qn) || M(n, Jn) || t.get(e.parent));
            }),
            t
          );
        })(e);
        return (
          e.walk(function(e) {
            return (function(e, t, n) {
              var r = e.classList.reduce(function(r, i) {
                  var o,
                    a,
                    s = i;
                  for (
                    (a = i.match(Hn)) &&
                    ((o = q(e, t, a[1]) + n.element + a[2]),
                    r.add(o),
                    (i = i.slice(a[0].length)));
                    (a = i.match(Zn));

                  )
                    o || ((o = q(e, t, a[1])), r.add(o)),
                      r.add('' + o + n.modifier + a[2]),
                      (i = i.slice(a[0].length));
                  return i === s && r.add(s), r;
                }, new Set()),
                i = Array.from(r).filter(Boolean);
              i.length && e.setAttribute('class', i.join(' '));
            })(e, n, t);
          }),
          e
        );
      },
      jsx: function(e) {
        return (
          e.walk(function(e) {
            L(e, 'class', 'className'), L(e, 'for', 'htmlFor');
          }),
          e
        );
      },
      xsl: function(e) {
        return (
          e.walk(function(e) {
            Kn.test(e.name || '') &&
              (e.children.length || e.value) &&
              e.removeAttribute('select');
          }),
          e
        );
      }
    },
    tr = function(e, t) {
      return (
        Object.keys(t || {}).forEach(function(n) {
          if (n in er) {
            var r = 'object' == typeof t[n] ? t[n] : null;
            e = e.use(er[n], r);
          }
        }),
        e
      );
    },
    nr = function(e, t, n) {
      return (
        'string' == typeof t
          ? (t = [t])
          : t &&
            'object' == typeof t &&
            !Array.isArray(t) &&
            ((n = t), (t = null)),
        e
          .use(Wn)
          .use(O, Array.isArray(t) ? t.length : null)
          .use(Pn)
          .use(S, t)
          .use(tr, n)
      );
    },
    rr = 36,
    ir = 58,
    or = 92,
    ar = 123,
    sr = 125,
    lr = function(e, t, n) {
      (this.index = e),
        (this.placeholder = t),
        (this.location = n),
        (this.length = this.placeholder.length);
    },
    ur = function(e, t) {
      (this.string = e), (this.fields = t);
    };
  (ur.prototype.mark = function(e) {
    return (function(e, t, n) {
      n = n || F;
      var r = 0;
      return (
        t
          .map(function(e, t) {
            return { order: t, field: e, end: e.location + e.length };
          })
          .sort(function(e, t) {
            return e.end - t.end || e.order - t.order;
          })
          .map(function(t) {
            var i = e.substr(t.field.location, t.field.length),
              o = e.slice(r, t.field.location);
            return (r = t.end), o + n(t.field.index, i);
          })
          .join('') + e.slice(r)
      );
    })(this.string, this.fields, e);
  }),
    (ur.prototype.toString = function() {
      return this.string;
    });
  var cr = function(e) {
      return e;
    },
    fr = function(e, t, n) {
      'object' == typeof t && ((n = t), (t = null)),
        (this.node = e),
        (this._fieldsRenderer = t || cr),
        (this.open = null),
        (this.beforeOpen = ''),
        (this.afterOpen = ''),
        (this.close = null),
        (this.beforeClose = ''),
        (this.afterClose = ''),
        (this.text = null),
        (this.beforeText = ''),
        (this.afterText = ''),
        (this.indent = ''),
        (this.newline = ''),
        n && Object.assign(this, n);
    };
  (fr.prototype.clone = function() {
    return new this.constructor(this.node, this);
  }),
    (fr.prototype.indentText = function(e) {
      var t = this,
        n = (function(e) {
          return (e || '').split(/\r\n|\r|\n/g);
        })(e);
      if (1 === n.length) return e;
      var r = this.newline || this.indent ? this.newline : ' ';
      return n
        .map(function(e, n) {
          return n ? t.indent + e : e;
        })
        .join(r);
    }),
    (fr.prototype.renderFields = function(e) {
      return this._fieldsRenderer(e);
    }),
    (fr.prototype.toString = function(e) {
      var t = this._wrap(this.open, this.beforeOpen, this.afterOpen),
        n = this._wrap(this.close, this.beforeClose, this.afterClose);
      return (
        t +
        this._wrap(this.text, this.beforeText, this.afterText) +
        (null != e ? e : '') +
        n
      );
    }),
    (fr.prototype._wrap = function(e, t, n) {
      return (
        (t = null != t ? t : ''),
        (n = null != n ? n : ''),
        null != e
          ? ((e = t ? e.replace(/^\s+/, '') : e),
            (e = n ? e.replace(/\s+$/, '') : e),
            t + this.indentText(e) + n)
          : ''
      );
    });
  var pr = function(e, t) {
      return t || '';
    },
    hr = /^(.*?)([A-Z_]+)(.*?)$/,
    dr = 91,
    mr = 93,
    gr = {
      enabled: !1,
      trigger: ['id', 'class'],
      before: '',
      after: '\n<!-- /[#ID][.CLASS] -->'
    },
    vr = /^id$/i,
    br = /^class$/i,
    yr = {
      primary: function(e) {
        return e.join('');
      },
      secondary: function(e) {
        return e
          .map(function(e) {
            return e.isBoolean ? e.name : e.name + '=' + e.value;
          })
          .join(', ');
      }
    },
    xr = { open: null, close: null, omitName: /^div$/i, attributes: yr },
    wr = /\n|\r/,
    kr = /\n|\r/,
    $r = {
      none: '[ SECONDARY_ATTRS]',
      round: '[(SECONDARY_ATTRS)]',
      curly: '[{SECONDARY_ATTRS}]',
      square: '[[SECONDARY_ATTRS]'
    },
    Ar = /\n|\r/,
    Cr = {
      html: function(e, t, n) {
        var r = (function(e) {
          var t = Object.assign({}, e && e.format);
          return (t.comment = Object.assign({}, gr, t.comment)), t;
        })((n = Object.assign({}, n)));
        return P(e, n.field, function(e) {
          if (
            !X(
              (e = (function(e, t) {
                var n = e.node;
                if (H(n, t)) {
                  (e.indent = t.indent(
                    (function(e, t) {
                      for (
                        var n = t.get('formatSkip') || [],
                          r = e.parent.isTextOnly ? -2 : -1,
                          i = e;
                        (i = i.parent);

                      )
                        -1 === n.indexOf((i.name || '').toLowerCase()) && r++;
                      return r < 0 ? 0 : r;
                    })(n, t)
                  )),
                    (e.newline = '\n');
                  var r = e.newline + e.indent;
                  (V(n.parent) && Y(n)) ||
                    ((e.beforeOpen = r), n.isTextOnly && (e.beforeText = r)),
                    (function(e, t) {
                      var n = (e.name || '').toLowerCase();
                      if (-1 !== t.get('formatForce').indexOf(n)) return !0;
                      for (var r = 0; r < e.children.length; r++)
                        if (H(e.children[r], t)) return !0;
                      return !1;
                    })(n, t) &&
                      (n.isTextOnly || (e.beforeText = r + t.indent(1)),
                      (e.beforeClose = r));
                }
                return e;
              })(e, t))
            )
          ) {
            var n = e.node;
            if (n.name) {
              var i = t.name(n.name),
                o = (function(e, t) {
                  return e.node.attributes
                    .map(function(n) {
                      if (n.options.implied && null == n.value) return null;
                      var r = t.attribute(n.name),
                        i = null;
                      if (
                        n.options.boolean ||
                        -1 !==
                          t.get('booleanAttributes').indexOf(r.toLowerCase())
                      ) {
                        if (
                          t.get('compactBooleanAttributes') &&
                          null == n.value
                        )
                          return ' ' + r;
                        null == n.value && (i = r);
                      }
                      return (
                        null == i && (i = e.renderFields(n.value)),
                        ' ' + r + '=' + t.quote(i)
                      );
                    })
                    .join('');
                })(e, t);
              (e.open =
                '<' + i + o + (n.selfClosing ? t.selfClose() : '') + '>'),
                n.selfClosing || (e.close = '</' + i + '>'),
                (function(e, t) {
                  var n = e.node;
                  if (t.enabled && t.trigger && n.name)
                    for (
                      var r = e.node.attributes.reduce(function(e, t) {
                          return (
                            t.name &&
                              null != t.value &&
                              (e[t.name.toUpperCase().replace(/-/g, '_')] =
                                t.value),
                            e
                          );
                        }, {}),
                        i = 0,
                        o = t.trigger.length;
                      i < o;
                      i++
                    )
                      if (t.trigger[i].toUpperCase() in r) {
                        (e.open = I(t.before, r) + e.open),
                          e.close && (e.close += I(t.after, r));
                        break;
                      }
                })(e, r.comment);
            }
            (n.value || (!n.children.length && !n.selfClosing)) &&
              (e.text = e.renderFields(n.value));
          }
          return e;
        });
      },
      haml: function(e, t, n) {
        var r = {
          open: '[%NAME][PRIMARY_ATTRS][(SECONDARY_ATTRS)][SELF_CLOSE]',
          selfClose: '/',
          attributes: {
            secondary: function(e) {
              return e
                .map(function(e) {
                  return e.isBoolean
                    ? e.name +
                        (t.get('compactBooleanAttributes') ? '' : '=true')
                    : e.name + '=' + t.quote(e.value);
                })
                .join(' ');
            }
          }
        };
        return P(e, (n = n || {}).field, function(e) {
          if (
            !X(
              (e = (function(e, t) {
                var n = e.node;
                return (
                  !n.isTextOnly &&
                    n.value &&
                    (e.beforeText = wr.test(n.value)
                      ? e.newline + e.indent + t.indent(1)
                      : ' '),
                  e
                );
              })((e = J(e, t, r)), t))
            )
          ) {
            var n = e.node;
            (n.value || (!n.children.length && !n.selfClosing)) &&
              (e.text = e.renderFields(
                (function(e, t) {
                  if (null != e.value && wr.test(e.value)) {
                    var n = D(e.value),
                      r = t.indent(1),
                      i = n.reduce(function(e, t) {
                        return Math.max(e, t.length);
                      }, 0);
                    return n
                      .map(function(e, t) {
                        return (
                          '' +
                          (t ? r : '') +
                          (function(e, t) {
                            for (; e.length < t; ) e += ' ';
                            return e;
                          })(e, i) +
                          ' |'
                        );
                      })
                      .join('\n');
                  }
                  return e.value;
                })(n, t)
              ));
          }
          return e;
        });
      },
      slim: function(e, t, n) {
        var r = ((n = n || {}).attributeWrap && $r[n.attributeWrap]) || $r.none,
          i =
            r === $r.none
              ? function(e) {
                  return e.name + '=true';
                }
              : function(e) {
                  return e.name;
                },
          o = {
            open: '[NAME][PRIMARY_ATTRS]' + r + '[SELF_CLOSE]',
            selfClose: '/',
            attributes: {
              secondary: function(e) {
                return e
                  .map(function(e) {
                    return e.isBoolean ? i(e) : e.name + '=' + t.quote(e.value);
                  })
                  .join(' ');
              }
            }
          };
        return P(e, n.field, function(e) {
          if (
            !X(
              (e = (function(e, t) {
                var n = e.node,
                  r = n.parent;
                return (
                  0 === t.get('inlineBreak') &&
                    (function(e, t) {
                      return e && (e.isTextOnly || t.isInline(e));
                    })(n, t) &&
                    !V(r) &&
                    null == r.value &&
                    1 === r.children.length &&
                    (e.beforeOpen = ': '),
                  !n.isTextOnly &&
                    n.value &&
                    (e.beforeText = kr.test(n.value)
                      ? e.newline + e.indent + t.indent(1)
                      : ' '),
                  e
                );
              })((e = J(e, t, o)), t))
            )
          ) {
            var n = e.node;
            (n.value || (!n.children.length && !n.selfClosing)) &&
              (e.text = e.renderFields(
                (function(e, t) {
                  if (null != e.value && kr.test(e.value)) {
                    var n = t.indent(1);
                    return D(e.value)
                      .map(function(e, t) {
                        return n + (t ? ' ' : '|') + ' ' + e;
                      })
                      .join('\n');
                  }
                  return e.value;
                })(n, t)
              ));
          }
          return e;
        });
      },
      pug: function(e, t, n) {
        var r = {
          open: '[NAME][PRIMARY_ATTRS][(SECONDARY_ATTRS)]',
          attributes: {
            secondary: function(e) {
              return e
                .map(function(e) {
                  return e.isBoolean ? e.name : e.name + '=' + t.quote(e.value);
                })
                .join(', ');
            }
          }
        };
        return P(e, (n = n || {}).field, function(e) {
          if (
            !X(
              (e = (function(e, t) {
                var n = e.node;
                return (
                  !n.isTextOnly &&
                    n.value &&
                    (e.beforeText = Ar.test(n.value)
                      ? e.newline + e.indent + t.indent(1)
                      : ' '),
                  e
                );
              })((e = J(e, t, r)), t))
            )
          ) {
            var n = e.node;
            (n.value || (!n.children.length && !n.selfClosing)) &&
              (e.text = e.renderFields(
                (function(e, t) {
                  if (null != e.value && Ar.test(e.value)) {
                    var n = t.indent(1);
                    return D(e.value)
                      .map(function(e) {
                        return n + '| ' + e;
                      })
                      .join('\n');
                  }
                  return e.value;
                })(n, t)
              ));
          }
          return e;
        });
      }
    },
    jr = function() {
      (this.type = 'css-value'), (this.value = []);
    },
    Or = { size: { configurable: !0 } };
  (Or.size.get = function() {
    return this.value.length;
  }),
    (jr.prototype.add = function(e) {
      this.value.push(e);
    }),
    (jr.prototype.has = function(e) {
      return -1 !== this.value.indexOf(e);
    }),
    (jr.prototype.toString = function() {
      return this.value.join(' ');
    }),
    Object.defineProperties(jr.prototype, Or);
  var Sr = 35,
    _r = 46,
    zr = function(e, t) {
      (this.type = 'color'),
        (this.raw = e),
        (this.alpha = Number(null != t && '' !== t ? t : 1));
      var n = 0,
        r = 0,
        i = 0;
      if ('t' === (e = e.slice(1))) this.alpha = 0;
      else
        switch (e.length) {
          case 0:
            break;
          case 1:
            n = r = i = e + e;
            break;
          case 2:
            n = r = i = e;
            break;
          case 3:
            (n = e[0] + e[0]), (r = e[1] + e[1]), (i = e[2] + e[2]);
            break;
          default:
            (n = (e += e).slice(0, 2)),
              (r = e.slice(2, 4)),
              (i = e.slice(4, 6));
        }
      (this.r = parseInt(n, 16)),
        (this.g = parseInt(r, 16)),
        (this.b = parseInt(i, 16));
    };
  (zr.prototype.toHex = function(e) {
    var t = e && ne(this.r) && ne(this.g) && ne(this.b) ? re : ie;
    return '#' + t(this.r) + t(this.g) + t(this.b);
  }),
    (zr.prototype.toRGB = function() {
      var e = [this.r, this.g, this.b];
      return (
        1 !== this.alpha && e.push(this.alpha.toFixed(8).replace(/\.?0+$/, '')),
        (3 === e.length ? 'rgb' : 'rgba') + '(' + e.join(', ') + ')'
      );
    }),
    (zr.prototype.toString = function(e) {
      return this.r || this.g || this.b || this.alpha
        ? 1 === this.alpha
          ? this.toHex(e)
          : this.toRGB()
        : 'transparent';
    });
  var Er = 37,
    Tr = 46,
    qr = 45,
    Mr = function(e, t) {
      (this.type = 'numeric'), (this.value = Number(e)), (this.unit = t || '');
    };
  Mr.prototype.toString = function() {
    return '' + this.value + this.unit;
  };
  var Lr = 36,
    Rr = 45,
    Nr = 64,
    Br = function(e) {
      (this.type = 'keyword'), (this.value = e);
    };
  Br.prototype.toString = function() {
    return this.value;
  };
  var Fr = { throws: !0 },
    Wr = function(e) {
      (this.type = 'string'), (this.value = e);
    };
  Wr.prototype.toString = function() {
    return this.value;
  };
  var Ur = 40,
    Pr = 41,
    Ir = 44,
    Dr = function(e, t) {
      (this.type = 'function'), (this.name = e), (this.args = t || []);
    };
  Dr.prototype.toString = function() {
    return this.name + '(' + this.args.join(', ') + ')';
  };
  var Yr = 33,
    Vr = 36,
    Gr = 43,
    Xr = 45,
    Hr = 58,
    Zr = 64,
    Qr = 45,
    Jr = /^([a-z-]+)(?:\s*:\s*([^\n\r]+))?$/,
    Kr = 45,
    ei = function(e, t) {
      (this.key = e), (this.value = t), (this.property = null);
      var n = t && t.match(Jr);
      n && ((this.property = n[1]), (this.value = n[2])),
        (this.dependencies = []);
    },
    ti = { defaultValue: { configurable: !0 } };
  (ei.prototype.addDependency = function(e) {
    this.dependencies.push(e);
  }),
    (ti.defaultValue.get = function() {
      return null != this.value ? $e(this.value)[0] : null;
    }),
    (ei.prototype.keywords = function() {
      var e,
        t,
        n = [],
        r = new Set(),
        i = 0;
      for (this.property && n.push(this); i < n.length; )
        if ((e = n[i++]).value) {
          t = $e(e.value).filter(ke);
          for (var o = 0; o < t.length; o++) r.add(t[o].trim());
          for (var a = 0, s = e.dependencies; a < s.length; a++)
            -1 === n.indexOf(s[a]) && n.push(s[a]);
        }
      return Array.from(r);
    }),
    Object.defineProperties(ei.prototype, ti);
  var ni = ['auto', 'inherit', 'unset'],
    ri = [
      'z-index',
      'line-height',
      'opacity',
      'font-weight',
      'zoom',
      'flex',
      'flex-grow',
      'flex-shrink'
    ],
    ii = {
      intUnit: 'px',
      floatUnit: 'em',
      unitAliases: { e: 'em', p: '%', x: 'ex', r: 'rem' },
      fuzzySearchMinScore: 0
    },
    oi = { shortHex: !0, between: ': ', after: ';' },
    ai = {
      css: { between: ': ', after: ';' },
      scss: 'css',
      less: 'css',
      sass: { between: ': ', after: '' },
      stylus: { between: ' ', after: '' }
    },
    si = {
      html: {
        a: 'a[href]',
        'a:link': "a[href='http://${0}']",
        'a:mail': "a[href='mailto:${0}']",
        'a:tel': "a[href='tel:+${0}']",
        abbr: 'abbr[title]',
        'acr|acronym': 'acronym[title]',
        base: 'base[href]/',
        basefont: 'basefont/',
        br: 'br/',
        frame: 'frame/',
        hr: 'hr/',
        bdo: 'bdo[dir]',
        'bdo:r': 'bdo[dir=rtl]',
        'bdo:l': 'bdo[dir=ltr]',
        col: 'col/',
        link: 'link[rel=stylesheet href]/',
        'link:css': "link[href='${1:style}.css']",
        'link:print': "link[href='${1:print}.css' media=print]",
        'link:favicon':
          "link[rel='shortcut icon' type=image/x-icon href='${1:favicon.ico}']",
        'link:touch': "link[rel=apple-touch-icon href='${1:favicon.png}']",
        'link:rss':
          "link[rel=alternate type=application/rss+xml title=RSS href='${1:rss.xml}']",
        'link:atom':
          "link[rel=alternate type=application/atom+xml title=Atom href='${1:atom.xml}']",
        'link:im|link:import': "link[rel=import href='${1:component}.html']",
        meta: 'meta/',
        'meta:utf':
          "meta[http-equiv=Content-Type content='text/html;charset=UTF-8']",
        'meta:vp':
          "meta[name=viewport content='width=${1:device-width}, initial-scale=${2:1.0}']",
        'meta:compat': "meta[http-equiv=X-UA-Compatible content='${1:IE=7}']",
        'meta:edge': "meta:compat[content='${1:ie=edge}']",
        'meta:redirect':
          "meta[http-equiv=refresh content='0; url=${1:http://example.com}']",
        style: 'style',
        script: 'script[!src]',
        'script:src': 'script[src]',
        img: 'img[src alt]/',
        'img:s|img:srcset': 'img[srcset src alt]',
        'img:z|img:sizes': 'img[sizes srcset src alt]',
        picture: 'picture',
        'src|source': 'source/',
        'src:sc|source:src': 'source[src type]',
        'src:s|source:srcset': 'source[srcset]',
        'src:t|source:type': "source[srcset type='${1:image/}']",
        'src:z|source:sizes': 'source[sizes srcset]',
        'src:m|source:media': "source[media='(${1:min-width: })' srcset]",
        'src:mt|source:media:type': "source:media[type='${2:image/}']",
        'src:mz|source:media:sizes': 'source:media[sizes srcset]',
        'src:zt|source:sizes:type': "source[sizes srcset type='${1:image/}']",
        iframe: 'iframe[src frameborder=0]',
        embed: 'embed[src type]/',
        object: 'object[data type]',
        param: 'param[name value]/',
        map: 'map[name]',
        area: 'area[shape coords href alt]/',
        'area:d': 'area[shape=default]',
        'area:c': 'area[shape=circle]',
        'area:r': 'area[shape=rect]',
        'area:p': 'area[shape=poly]',
        form: 'form[action]',
        'form:get': 'form[method=get]',
        'form:post': 'form[method=post]',
        label: 'label[for]',
        input: 'input[type=${1:text}]/',
        inp: 'input[name=${1} id=${1}]',
        'input:h|input:hidden': 'input[type=hidden name]',
        'input:t|input:text': 'inp[type=text]',
        'input:search': 'inp[type=search]',
        'input:email': 'inp[type=email]',
        'input:url': 'inp[type=url]',
        'input:p|input:password': 'inp[type=password]',
        'input:datetime': 'inp[type=datetime]',
        'input:date': 'inp[type=date]',
        'input:datetime-local': 'inp[type=datetime-local]',
        'input:month': 'inp[type=month]',
        'input:week': 'inp[type=week]',
        'input:time': 'inp[type=time]',
        'input:tel': 'inp[type=tel]',
        'input:number': 'inp[type=number]',
        'input:color': 'inp[type=color]',
        'input:c|input:checkbox': 'inp[type=checkbox]',
        'input:r|input:radio': 'inp[type=radio]',
        'input:range': 'inp[type=range]',
        'input:f|input:file': 'inp[type=file]',
        'input:s|input:submit': 'input[type=submit value]',
        'input:i|input:image': 'input[type=image src alt]',
        'input:b|input:button': 'input[type=button value]',
        'input:reset': 'input:button[type=reset]',
        isindex: 'isindex/',
        select: 'select[name=${1} id=${1}]',
        'select:d|select:disabled': 'select[disabled.]',
        'opt|option': 'option[value]',
        textarea: 'textarea[name=${1} id=${1} cols=${2:30} rows=${3:10}]',
        marquee: 'marquee[behavior direction]',
        'menu:c|menu:context': 'menu[type=context]',
        'menu:t|menu:toolbar': 'menu[type=toolbar]',
        video: 'video[src]',
        audio: 'audio[src]',
        'html:xml': 'html[xmlns=http://www.w3.org/1999/xhtml]',
        keygen: 'keygen/',
        command: 'command/',
        'btn:s|button:s|button:submit': 'button[type=submit]',
        'btn:r|button:r|button:reset': 'button[type=reset]',
        'btn:d|button:d|button:disabled': 'button[disabled.]',
        'fst:d|fset:d|fieldset:d|fieldset:disabled': 'fieldset[disabled.]',
        bq: 'blockquote',
        fig: 'figure',
        figc: 'figcaption',
        pic: 'picture',
        ifr: 'iframe',
        emb: 'embed',
        obj: 'object',
        cap: 'caption',
        colg: 'colgroup',
        fst: 'fieldset',
        btn: 'button',
        optg: 'optgroup',
        tarea: 'textarea',
        leg: 'legend',
        sect: 'section',
        art: 'article',
        hdr: 'header',
        ftr: 'footer',
        adr: 'address',
        dlg: 'dialog',
        str: 'strong',
        prog: 'progress',
        mn: 'main',
        tem: 'template',
        fset: 'fieldset',
        datag: 'datagrid',
        datal: 'datalist',
        kg: 'keygen',
        out: 'output',
        det: 'details',
        cmd: 'command',
        'ri:d|ri:dpr': 'img:s',
        'ri:v|ri:viewport': 'img:z',
        'ri:a|ri:art': 'pic>src:m+img',
        'ri:t|ri:type': 'pic>src:t+img',
        '!!!': '{<!DOCTYPE html>}',
        doc:
          'html[lang=${lang}]>(head>meta[charset=${charset}]+meta:vp+meta:edge+title{${1:Document}})+body',
        '!|html:5': '!!!+doc',
        c: '{<!-- ${0} -->}',
        'cc:ie': '{<!--[if IE]>${0}<![endif]-->}',
        'cc:noie': '{<!--[if !IE]><!-->${0}<!--<![endif]-->}'
      },
      css: {
        '@f': '@font-face {\n\tfont-family: ${1};\n\tsrc: url(${1});\n}',
        '@ff':
          "@font-face {\n\tfont-family: '${1:FontName}';\n\tsrc: url('${2:FileName}.eot');\n\tsrc: url('${2:FileName}.eot?#iefix') format('embedded-opentype'),\n\t\t url('${2:FileName}.woff') format('woff'),\n\t\t url('${2:FileName}.ttf') format('truetype'),\n\t\t url('${2:FileName}.svg#${1:FontName}') format('svg');\n\tfont-style: ${3:normal};\n\tfont-weight: ${4:normal};\n}",
        '@i|@import': '@import url(${0});',
        '@kf': '@keyframes ${1:identifier} {\n\t${2}\n}',
        '@m|@media': '@media ${1:screen} {\n\t${0}\n}',
        ac:
          'align-content:flex-start|flex-end|center|space-between|space-around|stretch',
        ai: 'align-items:flex-start|flex-end|center|baseline|stretch',
        anim:
          'animation:${1:name} ${2:duration} ${3:timing-function} ${4:delay} ${5:iteration-count} ${6:direction} ${7:fill-mode}',
        animdel: 'animation-delay:${1:time}',
        animdir:
          'animation-direction:normal|reverse|alternate|alternate-reverse',
        animdur: 'animation-duration:${1:0}s',
        animfm: 'animation-fill-mode:both|forwards|backwards',
        animic: 'animation-iteration-count:1|infinite',
        animn: 'animation-name',
        animps: 'animation-play-state:running|paused',
        animtf:
          'animation-timing-function:linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(${1:0.1}, ${2:0.7}, ${3:1.0}, ${3:0.1})',
        ap: 'appearance:none',
        as: 'align-self:auto|flex-start|flex-end|center|baseline|stretch',
        b: 'bottom',
        bd: 'border:${1:1px} ${2:solid} ${3:#000}',
        bdb: 'border-bottom:${1:1px} ${2:solid} ${3:#000}',
        bdbc: 'border-bottom-color:#${1:000}',
        bdbi: 'border-bottom-image:url(${0})',
        bdbk: 'border-break:close',
        bdbli: 'border-bottom-left-image:url(${0})|continue',
        bdblrs: 'border-bottom-left-radius',
        bdbri: 'border-bottom-right-image:url(${0})|continue',
        bdbrrs: 'border-bottom-right-radius',
        bdbs: 'border-bottom-style',
        bdbw: 'border-bottom-width',
        bdc: 'border-color:#${1:000}',
        bdci: 'border-corner-image:url(${0})|continue',
        bdcl: 'border-collapse:collapse|separate',
        bdf: 'border-fit:repeat|clip|scale|stretch|overwrite|overflow|space',
        bdi: 'border-image:url(${0})',
        bdl: 'border-left:${1:1px} ${2:solid} ${3:#000}',
        bdlc: 'border-left-color:#${1:000}',
        bdlen: 'border-length',
        bdli: 'border-left-image:url(${0})',
        bdls: 'border-left-style',
        bdlw: 'border-left-width',
        bdr: 'border-right:${1:1px} ${2:solid} ${3:#000}',
        bdrc: 'border-right-color:#${1:000}',
        bdri: 'border-right-image:url(${0})',
        bdrs: 'border-radius',
        bdrst: 'border-right-style',
        bdrw: 'border-right-width',
        bds:
          'border-style:none|hidden|dotted|dashed|solid|double|dot-dash|dot-dot-dash|wave|groove|ridge|inset|outset',
        bdsp: 'border-spacing',
        bdt: 'border-top:${1:1px} ${2:solid} ${3:#000}',
        bdtc: 'border-top-color:#${1:000}',
        bdti: 'border-top-image:url(${0})',
        bdtli: 'border-top-left-image:url(${0})|continue',
        bdtlrs: 'border-top-left-radius',
        bdtri: 'border-top-right-image:url(${0})|continue',
        bdtrrs: 'border-top-right-radius',
        bdts: 'border-top-style',
        bdtw: 'border-top-width',
        bdw: 'border-width',
        bfv: 'backface-visibility:hidden|visible',
        bg: 'background:#${1:000}',
        bga: 'background-attachment:fixed|scroll',
        bgbk: 'background-break:bounding-box|each-box|continuous',
        bgc: 'background-color:#${1:fff}',
        bgcp: 'background-clip:padding-box|border-box|content-box|no-clip',
        bgi: 'background-image:url(${0})',
        bgo: 'background-origin:padding-box|border-box|content-box',
        bgp: 'background-position:${1:0} ${2:0}',
        bgpx: 'background-position-x',
        bgpy: 'background-position-y',
        bgr: 'background-repeat:no-repeat|repeat-x|repeat-y|space|round',
        bgsz: 'background-size:contain|cover',
        bxsh:
          'box-shadow:${1:inset }${2:hoff} ${3:voff} ${4:blur} #${5:000}|none',
        bxsz: 'box-sizing:border-box|content-box|border-box',
        c: 'color:#${1:000}',
        cl: 'clear:both|left|right|none',
        cm: '/* ${0} */',
        cnt:
          "content:'${0}'|normal|open-quote|no-open-quote|close-quote|no-close-quote|attr(${0})|counter(${0})|counters({$0})",
        coi: 'counter-increment',
        colm: 'columns',
        colmc: 'column-count',
        colmf: 'column-fill',
        colmg: 'column-gap',
        colmr: 'column-rule',
        colmrc: 'column-rule-color',
        colmrs: 'column-rule-style',
        colmrw: 'column-rule-width',
        colms: 'column-span',
        colmw: 'column-width',
        cor: 'counter-reset',
        cp: 'clip:auto|rect(${1:top} ${2:right} ${3:bottom} ${4:left})',
        cps: 'caption-side:top|bottom',
        cur:
          'cursor:pointer|auto|default|crosshair|hand|help|move|pointer|text',
        d:
          'display:block|none|flex|inline-flex|inline|inline-block|list-item|run-in|compact|table|inline-table|table-caption|table-column|table-column-group|table-header-group|table-footer-group|table-row|table-row-group|table-cell|ruby|ruby-base|ruby-base-group|ruby-text|ruby-text-group',
        ec: 'empty-cells:show|hide',
        f: 'font:${1:1em} ${2:sans-serif}',
        fef: 'font-effect:none|engrave|emboss|outline',
        fem: 'font-emphasize',
        femp: 'font-emphasize-position:before|after',
        fems: 'font-emphasize-style:none|accent|dot|circle|disc',
        ff: 'font-family:serif|sans-serif|cursive|fantasy|monospace',
        fl: 'float:left|right|none',
        fs: 'font-style:italic|normal|oblique',
        fsm: 'font-smoothing:antialiased|subpixel-antialiased|none',
        fst:
          'font-stretch:normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded',
        fv: 'font-variant:normal|small-caps',
        fvs: 'font-variantion-settings',
        fw: 'font-weight:normal|bold|bolder|lighter',
        fx: 'flex',
        fxb: 'flex-basis:fill|max-content|min-content|fit-content|content',
        fxd: 'flex-direction:row|row-reverse|column|column-reverse',
        fxf: 'flex-flow',
        fxg: 'flex-grow',
        fxsh: 'flex-shrink',
        fxw: 'flex-wrap:nowrap|wrap|wrap-reverse',
        fz: 'font-size',
        fza: 'font-size-adjust',
        h: 'height',
        jc:
          'justify-content:flex-start|flex-end|center|space-between|space-around',
        l: 'left',
        lg: 'background-image:linear-gradient(${1})',
        lh: 'line-height',
        lis: 'list-style',
        lisi: 'list-style-image',
        lisp: 'list-style-position:inside|outside',
        list:
          'list-style-type:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman',
        lts: 'letter-spacing:normal',
        m: 'margin',
        mah: 'max-height',
        mar: 'max-resolution',
        maw: 'max-width',
        mb: 'margin-bottom',
        mih: 'min-height',
        mir: 'min-resolution',
        miw: 'min-width',
        ml: 'margin-left',
        mr: 'margin-right',
        mt: 'margin-top',
        ol: 'outline',
        olc: 'outline-color:#${1:000}|invert',
        olo: 'outline-offset',
        ols:
          'outline-style:none|dotted|dashed|solid|double|groove|ridge|inset|outset',
        olw: 'outline-width|thin|medium|thick',
        op: 'opacity',
        ord: 'order',
        ori: 'orientation:landscape|portrait',
        orp: 'orphans',
        ov: 'overflow:hidden|visible|hidden|scroll|auto',
        ovs: 'overflow-style:scrollbar|auto|scrollbar|panner|move|marquee',
        ovx: 'overflow-x:hidden|visible|hidden|scroll|auto',
        ovy: 'overflow-y:hidden|visible|hidden|scroll|auto',
        p: 'padding',
        pb: 'padding-bottom',
        pgba: 'page-break-after:auto|always|left|right',
        pgbb: 'page-break-before:auto|always|left|right',
        pgbi: 'page-break-inside:auto|avoid',
        pl: 'padding-left',
        pos: 'position:relative|absolute|relative|fixed|static',
        pr: 'padding-right',
        pt: 'padding-top',
        q: 'quotes',
        qen: "quotes:'\\201C' '\\201D' '\\2018' '\\2019'",
        qru: "quotes:'\\00AB' '\\00BB' '\\201E' '\\201C'",
        r: 'right',
        rsz: 'resize:none|both|horizontal|vertical',
        t: 'top',
        ta: 'text-align:left|center|right|justify',
        tal: 'text-align-last:left|center|right',
        tbl: 'table-layout:fixed',
        td: 'text-decoration:none|underline|overline|line-through',
        te: 'text-emphasis:none|accent|dot|circle|disc|before|after',
        th: 'text-height:auto|font-size|text-size|max-size',
        ti: 'text-indent',
        tj:
          'text-justify:auto|inter-word|inter-ideograph|inter-cluster|distribute|kashida|tibetan',
        to: 'text-outline:${1:0} ${2:0} ${3:#000}',
        tov: 'text-overflow:ellipsis|clip',
        tr: 'text-replace',
        trf:
          'transform:${1}|skewX(${1:angle})|skewY(${1:angle})|scale(${1:x}, ${2:y})|scaleX(${1:x})|scaleY(${1:y})|scaleZ(${1:z})|scale3d(${1:x}, ${2:y}, ${3:z})|rotate(${1:angle})|rotateX(${1:angle})|rotateY(${1:angle})|rotateZ(${1:angle})|translate(${1:x}, ${2:y})|translateX(${1:x})|translateY(${1:y})|translateZ(${1:z})|translate3d(${1:tx}, ${2:ty}, ${3:tz})',
        trfo: 'transform-origin',
        trfs: 'transform-style:preserve-3d',
        trs: 'transition:${1:prop} ${2:time}',
        trsde: 'transition-delay:${1:time}',
        trsdu: 'transition-duration:${1:time}',
        trsp: 'transition-property:${1:prop}',
        trstf: 'transition-timing-function:${1:fn}',
        tsh: 'text-shadow:${1:hoff} ${2:voff} ${3:blur} ${4:#000}',
        tt: 'text-transform:uppercase|lowercase|capitalize|none',
        tw: 'text-wrap:none|normal|unrestricted|suppress',
        us: 'user-select:none',
        v: 'visibility:hidden|visible|collapse',
        va:
          'vertical-align:top|super|text-top|middle|baseline|bottom|text-bottom|sub',
        w: 'width',
        whs: 'white-space:nowrap|pre|pre-wrap|pre-line|normal',
        whsc:
          'white-space-collapse:normal|keep-all|loose|break-strict|break-all',
        wid: 'widows',
        wm:
          'writing-mode:lr-tb|lr-tb|lr-bt|rl-tb|rl-bt|tb-rl|tb-lr|bt-lr|bt-rl',
        wob: 'word-break:normal|keep-all|break-all',
        wos: 'word-spacing',
        wow: 'word-wrap:none|unrestricted|suppress|break-word|normal',
        z: 'z-index',
        zom: 'zoom:1'
      },
      xsl: {
        'tm|tmatch': 'xsl:template[match mode]',
        'tn|tname': 'xsl:template[name]',
        call: 'xsl:call-template[name]',
        ap: 'xsl:apply-templates[select mode]',
        api: 'xsl:apply-imports',
        imp: 'xsl:import[href]',
        inc: 'xsl:include[href]',
        ch: 'xsl:choose',
        'wh|xsl:when': 'xsl:when[test]',
        ot: 'xsl:otherwise',
        if: 'xsl:if[test]',
        par: 'xsl:param[name]',
        pare: 'xsl:param[name select]',
        var: 'xsl:variable[name]',
        vare: 'xsl:variable[name select]',
        wp: 'xsl:with-param[name select]',
        key: 'xsl:key[name match use]',
        elem: 'xsl:element[name]',
        attr: 'xsl:attribute[name]',
        attrs: 'xsl:attribute-set[name]',
        cp: 'xsl:copy[select]',
        co: 'xsl:copy-of[select]',
        val: 'xsl:value-of[select]',
        'for|each': 'xsl:for-each[select]',
        tex: 'xsl:text',
        com: 'xsl:comment',
        msg: 'xsl:message[terminate=no]',
        fall: 'xsl:fallback',
        num: 'xsl:number[value]',
        nam: 'namespace-alias[stylesheet-prefix result-prefix]',
        pres: 'xsl:preserve-space[elements]',
        strip: 'xsl:strip-space[elements]',
        proc: 'xsl:processing-instruction[name]',
        sort: 'xsl:sort[select order]',
        choose: 'xsl:choose>xsl:when+xsl:otherwise',
        xsl:
          '!!!+xsl:stylesheet[version=1.0 xmlns:xsl=http://www.w3.org/1999/XSL/Transform]>{\n|}',
        '!!!': '{<?xml version="1.0" encoding="UTF-8"?>}'
      }
    },
    li = {
      latin: {
        common: [
          'lorem',
          'ipsum',
          'dolor',
          'sit',
          'amet',
          'consectetur',
          'adipisicing',
          'elit'
        ],
        words: [
          'exercitationem',
          'perferendis',
          'perspiciatis',
          'laborum',
          'eveniet',
          'sunt',
          'iure',
          'nam',
          'nobis',
          'eum',
          'cum',
          'officiis',
          'excepturi',
          'odio',
          'consectetur',
          'quasi',
          'aut',
          'quisquam',
          'vel',
          'eligendi',
          'itaque',
          'non',
          'odit',
          'tempore',
          'quaerat',
          'dignissimos',
          'facilis',
          'neque',
          'nihil',
          'expedita',
          'vitae',
          'vero',
          'ipsum',
          'nisi',
          'animi',
          'cumque',
          'pariatur',
          'velit',
          'modi',
          'natus',
          'iusto',
          'eaque',
          'sequi',
          'illo',
          'sed',
          'ex',
          'et',
          'voluptatibus',
          'tempora',
          'veritatis',
          'ratione',
          'assumenda',
          'incidunt',
          'nostrum',
          'placeat',
          'aliquid',
          'fuga',
          'provident',
          'praesentium',
          'rem',
          'necessitatibus',
          'suscipit',
          'adipisci',
          'quidem',
          'possimus',
          'voluptas',
          'debitis',
          'sint',
          'accusantium',
          'unde',
          'sapiente',
          'voluptate',
          'qui',
          'aspernatur',
          'laudantium',
          'soluta',
          'amet',
          'quo',
          'aliquam',
          'saepe',
          'culpa',
          'libero',
          'ipsa',
          'dicta',
          'reiciendis',
          'nesciunt',
          'doloribus',
          'autem',
          'impedit',
          'minima',
          'maiores',
          'repudiandae',
          'ipsam',
          'obcaecati',
          'ullam',
          'enim',
          'totam',
          'delectus',
          'ducimus',
          'quis',
          'voluptates',
          'dolores',
          'molestiae',
          'harum',
          'dolorem',
          'quia',
          'voluptatem',
          'molestias',
          'magni',
          'distinctio',
          'omnis',
          'illum',
          'dolorum',
          'voluptatum',
          'ea',
          'quas',
          'quam',
          'corporis',
          'quae',
          'blanditiis',
          'atque',
          'deserunt',
          'laboriosam',
          'earum',
          'consequuntur',
          'hic',
          'cupiditate',
          'quibusdam',
          'accusamus',
          'ut',
          'rerum',
          'error',
          'minus',
          'eius',
          'ab',
          'ad',
          'nemo',
          'fugit',
          'officia',
          'at',
          'in',
          'id',
          'quos',
          'reprehenderit',
          'numquam',
          'iste',
          'fugiat',
          'sit',
          'inventore',
          'beatae',
          'repellendus',
          'magnam',
          'recusandae',
          'quod',
          'explicabo',
          'doloremque',
          'aperiam',
          'consequatur',
          'asperiores',
          'commodi',
          'optio',
          'dolor',
          'labore',
          'temporibus',
          'repellat',
          'veniam',
          'architecto',
          'est',
          'esse',
          'mollitia',
          'nulla',
          'a',
          'similique',
          'eos',
          'alias',
          'dolore',
          'tenetur',
          'deleniti',
          'porro',
          'facere',
          'maxime',
          'corrupti'
        ]
      },
      ru: {
        common: [
          '\u0434\u0430\u043b\u0435\u043a\u043e-\u0434\u0430\u043b\u0435\u043a\u043e',
          '\u0437\u0430',
          '\u0441\u043b\u043e\u0432\u0435\u0441\u043d\u044b\u043c\u0438',
          '\u0433\u043e\u0440\u0430\u043c\u0438',
          '\u0432 \u0441\u0442\u0440\u0430\u043d\u0435',
          '\u0433\u043b\u0430\u0441\u043d\u044b\u0445',
          '\u0438 \u0441\u043e\u0433\u043b\u0430\u0441\u043d\u044b\u0445',
          '\u0436\u0438\u0432\u0443\u0442',
          '\u0440\u044b\u0431\u043d\u044b\u0435',
          '\u0442\u0435\u043a\u0441\u0442\u044b'
        ],
        words: [
          '\u0432\u0434\u0430\u043b\u0438',
          '\u043e\u0442 \u0432\u0441\u0435\u0445',
          '\u043e\u043d\u0438',
          '\u0431\u0443\u043a\u0432\u0435\u043d\u043d\u044b\u0445',
          '\u0434\u043e\u043c\u0430\u0445',
          '\u043d\u0430 \u0431\u0435\u0440\u0435\u0433\u0443',
          '\u0441\u0435\u043c\u0430\u043d\u0442\u0438\u043a\u0430',
          '\u0431\u043e\u043b\u044c\u0448\u043e\u0433\u043e',
          '\u044f\u0437\u044b\u043a\u043e\u0432\u043e\u0433\u043e',
          '\u043e\u043a\u0435\u0430\u043d\u0430',
          '\u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0438\u0439',
          '\u0440\u0443\u0447\u0435\u0435\u043a',
          '\u0434\u0430\u043b\u044c',
          '\u0436\u0443\u0440\u0447\u0438\u0442',
          '\u043f\u043e \u0432\u0441\u0435\u0439',
          '\u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0438\u0432\u0430\u0435\u0442',
          '\u0435\u0435',
          '\u0432\u0441\u0435\u043c\u0438',
          '\u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u044b\u043c\u0438',
          '\u043f\u0440\u0430\u0432\u0438\u043b\u0430\u043c\u0438',
          '\u044d\u0442\u0430',
          '\u043f\u0430\u0440\u0430\u0434\u0438\u0433\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0430\u044f',
          '\u0441\u0442\u0440\u0430\u043d\u0430',
          '\u043a\u043e\u0442\u043e\u0440\u043e\u0439',
          '\u0436\u0430\u0440\u0435\u043d\u043d\u044b\u0435',
          '\u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f',
          '\u0437\u0430\u043b\u0435\u0442\u0430\u044e\u0442',
          '\u043f\u0440\u044f\u043c\u043e',
          '\u0440\u043e\u0442',
          '\u0434\u0430\u0436\u0435',
          '\u0432\u0441\u0435\u043c\u043e\u0433\u0443\u0449\u0430\u044f',
          '\u043f\u0443\u043d\u043a\u0442\u0443\u0430\u0446\u0438\u044f',
          '\u043d\u0435',
          '\u0438\u043c\u0435\u0435\u0442',
          '\u0432\u043b\u0430\u0441\u0442\u0438',
          '\u043d\u0430\u0434',
          '\u0440\u044b\u0431\u043d\u044b\u043c\u0438',
          '\u0442\u0435\u043a\u0441\u0442\u0430\u043c\u0438',
          '\u0432\u0435\u0434\u0443\u0449\u0438\u043c\u0438',
          '\u0431\u0435\u0437\u043e\u0440\u0444\u043e\u0433\u0440\u0430\u0444\u0438\u0447\u043d\u044b\u0439',
          '\u043e\u0431\u0440\u0430\u0437',
          '\u0436\u0438\u0437\u043d\u0438',
          '\u043e\u0434\u043d\u0430\u0436\u0434\u044b',
          '\u043e\u0434\u043d\u0430',
          '\u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0430\u044f',
          '\u0441\u0442\u0440\u043e\u0447\u043a\u0430',
          '\u0440\u044b\u0431\u043d\u043e\u0433\u043e',
          '\u0442\u0435\u043a\u0441\u0442\u0430',
          '\u0438\u043c\u0435\u043d\u0438',
          'lorem',
          'ipsum',
          '\u0440\u0435\u0448\u0438\u043b\u0430',
          '\u0432\u044b\u0439\u0442\u0438',
          '\u0431\u043e\u043b\u044c\u0448\u043e\u0439',
          '\u043c\u0438\u0440',
          '\u0433\u0440\u0430\u043c\u043c\u0430\u0442\u0438\u043a\u0438',
          '\u0432\u0435\u043b\u0438\u043a\u0438\u0439',
          '\u043e\u043a\u0441\u043c\u043e\u043a\u0441',
          '\u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0430\u043b',
          '\u043e',
          '\u0437\u043b\u044b\u0445',
          '\u0437\u0430\u043f\u044f\u0442\u044b\u0445',
          '\u0434\u0438\u043a\u0438\u0445',
          '\u0437\u043d\u0430\u043a\u0430\u0445',
          '\u0432\u043e\u043f\u0440\u043e\u0441\u0430',
          '\u043a\u043e\u0432\u0430\u0440\u043d\u044b\u0445',
          '\u0442\u043e\u0447\u043a\u0430\u0445',
          '\u0437\u0430\u043f\u044f\u0442\u043e\u0439',
          '\u043d\u043e',
          '\u0442\u0435\u043a\u0441\u0442',
          '\u0434\u0430\u043b',
          '\u0441\u0431\u0438\u0442\u044c',
          '\u0441\u0435\u0431\u044f',
          '\u0442\u043e\u043b\u043a\u0443',
          '\u043e\u043d',
          '\u0441\u043e\u0431\u0440\u0430\u043b',
          '\u0441\u0435\u043c\u044c',
          '\u0441\u0432\u043e\u0438\u0445',
          '\u0437\u0430\u0433\u043b\u0430\u0432\u043d\u044b\u0445',
          '\u0431\u0443\u043a\u0432',
          '\u043f\u043e\u0434\u043f\u043e\u044f\u0441\u0430\u043b',
          '\u0438\u043d\u0438\u0446\u0438\u0430\u043b',
          '\u0437\u0430',
          '\u043f\u043e\u044f\u0441',
          '\u043f\u0443\u0441\u0442\u0438\u043b\u0441\u044f',
          '\u0434\u043e\u0440\u043e\u0433\u0443',
          '\u0432\u0437\u043e\u0431\u0440\u0430\u0432\u0448\u0438\u0441\u044c',
          '\u043f\u0435\u0440\u0432\u0443\u044e',
          '\u0432\u0435\u0440\u0448\u0438\u043d\u0443',
          '\u043a\u0443\u0440\u0441\u0438\u0432\u043d\u044b\u0445',
          '\u0433\u043e\u0440',
          '\u0431\u0440\u043e\u0441\u0438\u043b',
          '\u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0439',
          '\u0432\u0437\u0433\u043b\u044f\u0434',
          '\u043d\u0430\u0437\u0430\u0434',
          '\u0441\u0438\u043b\u0443\u044d\u0442',
          '\u0441\u0432\u043e\u0435\u0433\u043e',
          '\u0440\u043e\u0434\u043d\u043e\u0433\u043e',
          '\u0433\u043e\u0440\u043e\u0434\u0430',
          '\u0431\u0443\u043a\u0432\u043e\u0433\u0440\u0430\u0434',
          '\u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a',
          '\u0434\u0435\u0440\u0435\u0432\u043d\u0438',
          '\u0430\u043b\u0444\u0430\u0432\u0438\u0442',
          '\u043f\u043e\u0434\u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a',
          '\u0441\u0432\u043e\u0435\u0433\u043e',
          '\u043f\u0435\u0440\u0435\u0443\u043b\u043a\u0430',
          '\u0433\u0440\u0443\u0441\u0442\u043d\u044b\u0439',
          '\u0440\u0435\u0442\u043e\u0440\u0438\u0447\u0435\u0441\u043a\u0438\u0439',
          '\u0432\u043e\u043f\u0440\u043e\u0441',
          '\u0441\u043a\u0430\u0442\u0438\u043b\u0441\u044f',
          '\u0435\u0433\u043e',
          '\u0449\u0435\u043a\u0435',
          '\u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u043b',
          '\u0441\u0432\u043e\u0439',
          '\u043f\u0443\u0442\u044c',
          '\u0434\u043e\u0440\u043e\u0433\u0435',
          '\u0432\u0441\u0442\u0440\u0435\u0442\u0438\u043b',
          '\u0440\u0443\u043a\u043e\u043f\u0438\u0441\u044c',
          '\u043e\u043d\u0430',
          '\u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0434\u0438\u043b\u0430',
          '\u043c\u043e\u0435\u0439',
          '\u0432\u0441\u0435',
          '\u043f\u0435\u0440\u0435\u043f\u0438\u0441\u044b\u0432\u0430\u0435\u0442\u0441\u044f',
          '\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e',
          '\u0440\u0430\u0437',
          '\u0435\u0434\u0438\u043d\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0435',
          '\u0447\u0442\u043e',
          '\u043c\u0435\u043d\u044f',
          '\u043e\u0441\u0442\u0430\u043b\u043e\u0441\u044c',
          '\u044d\u0442\u043e',
          '\u043f\u0440\u0438\u0441\u0442\u0430\u0432\u043a\u0430',
          '\u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0439\u0441\u044f',
          '\u0442\u044b',
          '\u043b\u0443\u0447\u0448\u0435',
          '\u0441\u0432\u043e\u044e',
          '\u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u0443\u044e',
          '\u0441\u0442\u0440\u0430\u043d\u0443',
          '\u043f\u043e\u0441\u043b\u0443\u0448\u0430\u0432\u0448\u0438\u0441\u044c',
          '\u0440\u0443\u043a\u043e\u043f\u0438\u0441\u0438',
          '\u043d\u0430\u0448',
          '\u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u043b',
          '\u0441\u0432\u043e\u0439',
          '\u043f\u0443\u0442\u044c',
          '\u0432\u0441\u043a\u043e\u0440\u0435',
          '\u0435\u043c\u0443',
          '\u043f\u043e\u0432\u0441\u0442\u0440\u0435\u0447\u0430\u043b\u0441\u044f',
          '\u043a\u043e\u0432\u0430\u0440\u043d\u044b\u0439',
          '\u0441\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u044c',
          '\u0440\u0435\u043a\u043b\u0430\u043c\u043d\u044b\u0445',
          '\u0442\u0435\u043a\u0441\u0442\u043e\u0432',
          '\u043d\u0430\u043f\u043e\u0438\u0432\u0448\u0438\u0439',
          '\u044f\u0437\u044b\u043a\u043e\u043c',
          '\u0440\u0435\u0447\u044c\u044e',
          '\u0437\u0430\u043c\u0430\u043d\u0438\u0432\u0448\u0438\u0439',
          '\u0441\u0432\u043e\u0435',
          '\u0430\u0433\u0435\u043d\u0442\u0441\u0442\u0432\u043e',
          '\u043a\u043e\u0442\u043e\u0440\u043e\u0435',
          '\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043b\u043e',
          '\u0441\u043d\u043e\u0432\u0430',
          '\u0441\u043d\u043e\u0432\u0430',
          '\u0441\u0432\u043e\u0438\u0445',
          '\u043f\u0440\u043e\u0435\u043a\u0442\u0430\u0445',
          '\u0435\u0441\u043b\u0438',
          '\u043f\u0435\u0440\u0435\u043f\u0438\u0441\u0430\u043b\u0438',
          '\u0442\u043e',
          '\u0436\u0438\u0432\u0435\u0442',
          '\u0442\u0430\u043c',
          '\u0434\u043e',
          '\u0441\u0438\u0445',
          '\u043f\u043e\u0440'
        ]
      },
      sp: {
        common: [
          'mujer',
          'uno',
          'dolor',
          'm\xe1s',
          'de',
          'poder',
          'mismo',
          'si'
        ],
        words: [
          'ejercicio',
          'preferencia',
          'perspicacia',
          'laboral',
          'pa\xf1o',
          'suntuoso',
          'molde',
          'namibia',
          'planeador',
          'mirar',
          'dem\xe1s',
          'oficinista',
          'excepci\xf3n',
          'odio',
          'consecuencia',
          'casi',
          'auto',
          'chicharra',
          'velo',
          'elixir',
          'ataque',
          'no',
          'odio',
          'temporal',
          'cu\xf3rum',
          'dign\xedsimo',
          'facilismo',
          'letra',
          'nihilista',
          'expedici\xf3n',
          'alma',
          'alveolar',
          'aparte',
          'le\xf3n',
          'animal',
          'como',
          'paria',
          'belleza',
          'modo',
          'natividad',
          'justo',
          'ataque',
          's\xe9quito',
          'pillo',
          'sed',
          'ex',
          'y',
          'voluminoso',
          'temporalidad',
          'verdades',
          'racional',
          'asunci\xf3n',
          'incidente',
          'marejada',
          'placenta',
          'amanecer',
          'fuga',
          'previsor',
          'presentaci\xf3n',
          'lejos',
          'necesariamente',
          'sospechoso',
          'adiposidad',
          'quind\xedo',
          'p\xf3cima',
          'voluble',
          'd\xe9bito',
          'sinti\xf3',
          'accesorio',
          'falda',
          'sapiencia',
          'volutas',
          'queso',
          'permacultura',
          'laudo',
          'soluciones',
          'entero',
          'pan',
          'litro',
          'tonelada',
          'culpa',
          'libertario',
          'mosca',
          'dictado',
          'reincidente',
          'nascimiento',
          'dolor',
          'escolar',
          'impedimento',
          'm\xednima',
          'mayores',
          'repugnante',
          'dulce',
          'obcecado',
          'monta\xf1a',
          'enigma',
          'total',
          'delet\xe9reo',
          'd\xe9cima',
          'c\xe1bala',
          'fotograf\xeda',
          'dolores',
          'molesto',
          'olvido',
          'paciencia',
          'resiliencia',
          'voluntad',
          'molestias',
          'magn\xedfico',
          'distinci\xf3n',
          'ovni',
          'marejada',
          'cerro',
          'torre',
          'y',
          'abogada',
          'manantial',
          'corporal',
          'agua',
          'crep\xfasculo',
          'ataque',
          'desierto',
          'laboriosamente',
          'angustia',
          'afortunado',
          'alma',
          'encefalograma',
          'materialidad',
          'cosas',
          'o',
          'renuncia',
          'error',
          'menos',
          'conejo',
          'abad\xeda',
          'analfabeto',
          'remo',
          'fugacidad',
          'oficio',
          'en',
          'alm\xe1cigo',
          'vos',
          'pan',
          'represi\xf3n',
          'n\xfameros',
          'triste',
          'refugiado',
          'trote',
          'inventor',
          'corchea',
          'repelente',
          'magma',
          'recusado',
          'patr\xf3n',
          'expl\xedcito',
          'paloma',
          's\xedndrome',
          'inmune',
          'autoinmune',
          'comodidad',
          'ley',
          'vietnamita',
          'demonio',
          'tasmania',
          'repeler',
          'ap\xe9ndice',
          'arquitecto',
          'columna',
          'yugo',
          'computador',
          'mula',
          'a',
          'prop\xf3sito',
          'fantas\xeda',
          'alias',
          'rayo',
          'tenedor',
          'deleznable',
          'ventana',
          'cara',
          'anemia',
          'corrupto'
        ]
      }
    },
    ui = { wordCount: 30, skipCommon: !1, lang: 'latin' },
    ci = function(e, t) {
      t = Object.assign({}, ui, t);
      var n = li[t.lang] || li.latin,
        r =
          !t.skipCommon &&
          !(function(e) {
            for (; e.parent; ) {
              if (e.repeat && e.repeat.value && e.repeat.value > 1) return !0;
              e = e.parent;
            }
            return !1;
          })(e);
      return (
        e.repeat ||
        (function(e) {
          return !e.parent;
        })(e.parent)
          ? ((e.value = Fe(n, t.wordCount, r)),
            (e.name = e.parent.name ? k(e.parent.name) : null))
          : ((e.parent.value = Fe(n, t.wordCount, r)), e.remove()),
        e
      );
    },
    fi = function(e, t) {
      (this.key = e), (this.value = t);
    },
    pi = function(e) {
      (this._string = new Map()),
        (this._regexp = new Map()),
        (this._disabled = !1),
        this.load(e);
    },
    hi = { disabled: { configurable: !0 } };
  (hi.disabled.get = function() {
    return this._disabled;
  }),
    (pi.prototype.disable = function() {
      this._disabled = !0;
    }),
    (pi.prototype.enable = function() {
      this._disabled = !1;
    }),
    (pi.prototype.set = function(e, t) {
      var n = this;
      if ('string' == typeof e)
        e.split('|').forEach(function(e) {
          return n._string.set(e, new fi(e, t));
        });
      else {
        if (!(e instanceof RegExp)) throw new Error('Unknow snippet key: ' + e);
        this._regexp.set(e, new fi(e, t));
      }
      return this;
    }),
    (pi.prototype.get = function(e) {
      if (!this.disabled) {
        if (this._string.has(e)) return this._string.get(e);
        for (
          var t = Array.from(this._regexp.keys()), n = 0, r = t.length;
          n < r;
          n++
        )
          if (t[n].test(e)) return this._regexp.get(t[n]);
      }
    }),
    (pi.prototype.load = function(e) {
      var t = this;
      this.reset(),
        e instanceof Map
          ? e.forEach(function(e, n) {
              return t.set(n, e);
            })
          : e &&
            'object' == typeof e &&
            Object.keys(e).forEach(function(n) {
              return t.set(n, e[n]);
            });
    }),
    (pi.prototype.reset = function() {
      this._string.clear(), this._regexp.clear();
    }),
    (pi.prototype.values = function() {
      if (this.disabled) return [];
      var e = Array.from(this._string.values()),
        t = Array.from(this._regexp.values());
      return e.concat(t);
    }),
    Object.defineProperties(pi.prototype, hi);
  var di = function(e) {
    var t = this;
    (this._registry = []),
      Array.isArray(e)
        ? e.forEach(function(e, n) {
            return t.add(n, e);
          })
        : 'object' == typeof e && this.add(e);
  };
  (di.prototype.get = function(e) {
    for (var t = 0; t < this._registry.length; t++) {
      var n = this._registry[t];
      if (n.level === e) return n.store;
    }
  }),
    (di.prototype.add = function(e, t) {
      null != e && 'object' == typeof e && ((t = e), (e = 0));
      var n = new pi(t);
      return (
        this.remove(e),
        this._registry.push({ level: e, store: n }),
        this._registry.sort(function(e, t) {
          return t.level - e.level;
        }),
        n
      );
    }),
    (di.prototype.remove = function(e) {
      this._registry = this._registry.filter(function(t) {
        return t.level !== e && t.store !== e;
      });
    }),
    (di.prototype.resolve = function(e) {
      for (var t = 0; t < this._registry.length; t++) {
        var n = this._registry[t].store.get(e);
        if (n) return n;
      }
    }),
    (di.prototype.all = function(e) {
      e = e || {};
      var t = new Map(),
        n = function(n) {
          var r = n.key instanceof RegExp ? 'regexp' : 'string';
          (e.type && e.type !== r) || t.has(n.key) || t.set(n.key, n);
        };
      return (
        this._registry.forEach(function(e) {
          e.store.values().forEach(n);
        }),
        Array.from(t.values())
      );
    }),
    (di.prototype.clear = function() {
      this._registry.length = 0;
    });
  var mi = {
      indent: '\t',
      tagCase: '',
      attributeCase: '',
      attributeQuotes: 'double',
      format: !0,
      formatSkip: ['html'],
      formatForce: ['body'],
      inlineBreak: 3,
      compactBooleanAttributes: !1,
      booleanAttributes: [
        'contenteditable',
        'seamless',
        'async',
        'autofocus',
        'autoplay',
        'checked',
        'controls',
        'defer',
        'disabled',
        'formnovalidate',
        'hidden',
        'ismap',
        'loop',
        'multiple',
        'muted',
        'novalidate',
        'readonly',
        'required',
        'reversed',
        'selected',
        'typemustmatch'
      ],
      selfClosingStyle: 'html',
      inlineElements: [
        'a',
        'abbr',
        'acronym',
        'applet',
        'b',
        'basefont',
        'bdo',
        'big',
        'br',
        'button',
        'cite',
        'code',
        'del',
        'dfn',
        'em',
        'font',
        'i',
        'iframe',
        'img',
        'input',
        'ins',
        'kbd',
        'label',
        'map',
        'object',
        'q',
        's',
        'samp',
        'select',
        'small',
        'span',
        'strike',
        'strong',
        'sub',
        'sup',
        'textarea',
        'tt',
        'u',
        'var'
      ]
    },
    gi = function(e) {
      (this.options = Object.assign({}, mi, e)),
        (this.quoteChar =
          'single' === this.options.attributeQuotes ? "'" : '"');
    };
  (gi.prototype.get = function(e) {
    return this.options[e];
  }),
    (gi.prototype.quote = function(e) {
      return '' + this.quoteChar + (null != e ? e : '') + this.quoteChar;
    }),
    (gi.prototype.name = function(e) {
      return We(e, this.options.tagCase);
    }),
    (gi.prototype.attribute = function(e) {
      return We(e, this.options.attributeCase);
    }),
    (gi.prototype.isBooleanAttribute = function(e) {
      return (
        e.options.boolean ||
        -1 !==
          this.get('booleanAttributes').indexOf((e.name || '').toLowerCase())
      );
    }),
    (gi.prototype.selfClose = function() {
      switch (this.options.selfClosingStyle) {
        case 'xhtml':
          return ' /';
        case 'xml':
          return '/';
        default:
          return '';
      }
    }),
    (gi.prototype.indent = function(e) {
      e = e || 0;
      for (var t = ''; e--; ) t += this.options.indent;
      return t;
    }),
    (gi.prototype.isInline = function(e) {
      return 'string' == typeof e
        ? -1 !== this.get('inlineElements').indexOf(e.toLowerCase())
        : null != e.name
        ? this.isInline(e.name)
        : e.isTextOnly;
    }),
    (gi.prototype.field = function(e, t) {
      return this.options.field(e, t);
    });
  var vi = /^lorem([a-z]*)(\d*)$/i,
    bi = { lang: 'en', locale: 'en-US', charset: 'UTF-8' },
    yi = ['css', 'sass', 'scss', 'less', 'stylus', 'sss'],
    xi = {
      type: null,
      syntax: 'html',
      field: function(e, t) {
        return t || '';
      },
      text: null,
      profile: null,
      variables: {},
      snippets: {},
      options: null,
      format: null
    },
    wi = function(e, t) {
      (this.string = e), (this.start = t || 0), (this.pos = this.string.length);
    };
  (wi.prototype.sol = function() {
    return this.pos === this.start;
  }),
    (wi.prototype.peek = function(e) {
      return this.string.charCodeAt(this.pos - 1 + (e || 0));
    }),
    (wi.prototype.prev = function() {
      if (!this.sol()) return this.string.charCodeAt(--this.pos);
    }),
    (wi.prototype.eat = function(e) {
      if (this.sol()) return !1;
      var t = 'function' == typeof e ? e(this.peek()) : e === this.peek();
      return t && this.pos--, t;
    }),
    (wi.prototype.eatWhile = function(e) {
      for (var t = this.pos; this.eat(e); );
      return this.pos < t;
    });
  var ki = 39,
    $i = 34,
    Ai = 92,
    Ci = 9,
    ji = 32,
    Oi = 45,
    Si = 58,
    _i = 61,
    zi = function(e) {
      var t = e.pos;
      if (!e.eat(62)) return !1;
      var n = !1;
      for (e.eat(47); !e.sol(); ) {
        if ((e.eatWhile(et), Je(e))) {
          if (e.eat(47)) {
            n = e.eat(60);
            break;
          }
          if (e.eat(60)) {
            n = !0;
            break;
          }
          if (e.eat(et)) continue;
          if (e.eat(_i)) {
            if (Je(e)) continue;
            break;
          }
          if (Qe(e)) {
            n = !0;
            break;
          }
          break;
        }
        if (!Ze(e)) break;
      }
      return (e.pos = t), n;
    },
    Ei = function(e) {
      return e.charCodeAt(0);
    },
    Ti = Ei('['),
    qi = Ei(']'),
    Mi = Ei('('),
    Li = Ei(')'),
    Ri = Ei('{'),
    Ni = Ei('}'),
    Bi = new Set('#.*:$-_!@%^+>/'.split('').map(Ei)),
    Fi = new Map()
      .set(Ti, qi)
      .set(Mi, Li)
      .set(Ri, Ni),
    Wi = { syntax: 'markup', lookAhead: null, prefix: '' },
    Ui = { markup: 'html', stylesheet: 'css' },
    Pi = {
      markup: ['html', 'xml', 'xsl', 'jsx', 'js', 'pug', 'slim', 'haml'],
      stylesheet: ['css', 'sass', 'scss', 'less', 'sss', 'stylus']
    },
    Ii = function(e, t) {
      return void 0 === t && (t = ''), '${' + e + (t ? ':' + t : '') + '}';
    },
    Di = (function(e) {
      function t(t, n, r) {
        e.call(this);
        var i = t.constructor;
        (this.editor = t), (this.start = this.pos = n || i.Pos(0, 0));
        var o = t.lastLine();
        (this._eof = r ? r.to : i.Pos(o, this._lineLength(o))),
          (this._sof = r ? r.from : i.Pos(0, 0));
      }
      return (
        e && (t.__proto__ = e),
        (t.prototype = Object.create(e && e.prototype)),
        (t.prototype.constructor = t),
        (t.prototype.sof = function() {
          return dt(this.pos, this._sof) <= 0;
        }),
        (t.prototype.eof = function() {
          return dt(this.pos, this._eof) >= 0;
        }),
        (t.prototype.limit = function(e, t) {
          return new this.constructor(this.editor, e, { from: e, to: t });
        }),
        (t.prototype.peek = function() {
          var e = this.pos,
            t = e.line,
            n = e.ch,
            r = this.editor.getLine(t);
          return n < r.length ? r.charCodeAt(n) : 10;
        }),
        (t.prototype.next = function() {
          if (!this.eof()) {
            var e = this.peek();
            return (
              (this.pos = Object.assign({}, this.pos, { ch: this.pos.ch + 1 })),
              this.pos.ch >= this._lineLength(this.pos.line) &&
                (this.pos.line++, (this.pos.ch = 0)),
              this.eof() && (this.pos = Object.assign({}, this._eof)),
              e
            );
          }
          return NaN;
        }),
        (t.prototype.backUp = function(e) {
          var t = this.editor.constructor,
            n = this.pos,
            r = n.line,
            i = n.ch;
          for (i -= e || 1; r >= 0 && i < 0; ) r--, (i += this._lineLength(r));
          return (
            (this.pos = r < 0 || i < 0 ? t.Pos(0, 0) : t.Pos(r, i)), this.peek()
          );
        }),
        (t.prototype.current = function() {
          return this.substring(this.start, this.pos);
        }),
        (t.prototype.substring = function(e, t) {
          return this.editor.getRange(e, t);
        }),
        (t.prototype.error = function(e) {
          var t = new Error(
            e + ' at line ' + this.pos.line + ', column ' + this.pos.ch
          );
          return (
            (t.originalMessage = e),
            (t.pos = this.pos),
            (t.string = this.string),
            t
          );
        }),
        (t.prototype._lineLength = function(e) {
          var t = e === this.editor.lastLine();
          return this.editor.getLine(e).length + (t ? 0 : 1);
        }),
        t
      );
    })(vn),
    Yi = 'emmet-abbreviation',
    Vi = function(e, t, n) {
      var r, i;
      (this.abbreviation = e),
        (this.range = t),
        (this.config = n),
        (this.ast =
          ((r = e),
          'stylesheet' === Xe((i = Ve((i = n))).type, i.syntax)
            ? Pe(r, i)
            : Ue(r, i))),
        (this.snippet = De(this.ast, n)),
        (this.preview = vt(this.snippet));
    };
  (Vi.prototype.insert = function(e, t) {
    return kt(e, t || this.range, this.snippet);
  }),
    (Vi.prototype.valid = function(e, t) {
      return (
        !(!this.preview || this.abbreviation === this.preview) &&
        (!t ||
          'stylesheet' !== this.config.type ||
          this._isValidForStylesheet(e))
      );
    }),
    (Vi.prototype._isValidForStylesheet = function(e) {
      var t = this.range.from,
        n = e.getTokenAt(t);
      if (/^[#!]/.test(this.abbreviation)) return wt(e, t);
      var r = this.ast.children.every(function(e) {
          return e.name;
        }),
        i = (n.state && n.state.localState) || n.state;
      return (
        !r ||
        'sass' === this.config.syntax ||
        (i && i.context && 'block' === i.context.type)
      );
    });
  var Gi = /^([a-z\-]+)(?:\s*:\s*([^\n\r]+))?$/,
    Xi = 45,
    Hi = function(e, t) {
      (this.key = e), (this.value = t), (this.property = null);
      var n = t && t.match(Gi);
      n && ((this.property = n[1]), (this.value = n[2])),
        (this.dependencies = []);
    },
    Zi = { defaultValue: { configurable: !0 } };
  (Hi.prototype.addDependency = function(e) {
    this.dependencies.push(e);
  }),
    (Zi.defaultValue.get = function() {
      return null != this.value ? Rt(this.value)[0] : null;
    }),
    (Hi.prototype.keywords = function() {
      var e,
        t,
        n = [],
        r = new Set(),
        i = 0;
      for (this.property && n.push(this); i < n.length; )
        if ((e = n[i++]).value) {
          t = Rt(e.value).filter(Lt);
          for (var o = 0; o < t.length; o++) r.add(t[o].trim());
          for (var a = 0, s = e.dependencies; a < s.length; a++)
            -1 === n.indexOf(s[a]) && n.push(s[a]);
        }
      return Array.from(r);
    }),
    Object.defineProperties(Hi.prototype, Zi);
  var Qi = function(e, t, n, r, i, o) {
    (this.type = e),
      (this.editor = t),
      (this.range = n),
      (this.name = r),
      (this.preview = i),
      (this.snippet = o),
      (this._inserted = !1);
  };
  Qi.prototype.insert = function() {
    this._inserted ||
      ((this._inserted = !0),
      'function' == typeof this.snippet
        ? this.snippet(this.editor, this.range)
        : kt(this.editor, this.range, this.snippet),
      Ct(this.editor));
  };
  var Ji = function(e, t, n, r) {
      (this.stream = e),
        (this.type = t),
        (this.open = n),
        (this.close = r),
        (this.children = []),
        (this.parent = null);
    },
    Ki = {
      name: { configurable: !0 },
      attributes: { configurable: !0 },
      start: { configurable: !0 },
      end: { configurable: !0 },
      firstChild: { configurable: !0 },
      nextSibling: { configurable: !0 },
      previousSibling: { configurable: !0 }
    };
  (Ki.name.get = function() {
    return 'tag' === this.type && this.open
      ? this.open && this.open.name && this.open.name.value
      : '#' + this.type;
  }),
    (Ki.attributes.get = function() {
      return this.open && this.open.attributes;
    }),
    (Ki.start.get = function() {
      return this.open && this.open.start;
    }),
    (Ki.end.get = function() {
      return this.close ? this.close.end : this.open && this.open.end;
    }),
    (Ki.firstChild.get = function() {
      return this.children[0];
    }),
    (Ki.nextSibling.get = function() {
      var e = this.getIndex();
      return -1 !== e ? this.parent.children[e + 1] : null;
    }),
    (Ki.previousSibling.get = function() {
      var e = this.getIndex();
      return -1 !== e ? this.parent.children[e - 1] : null;
    }),
    (Ji.prototype.getIndex = function() {
      return this.parent ? this.parent.children.indexOf(this) : -1;
    }),
    (Ji.prototype.addChild = function(e) {
      return (
        this.removeChild(e), this.children.push(e), (e.parent = this), this
      );
    }),
    (Ji.prototype.removeChild = function(e) {
      var t = this.children.indexOf(e);
      return -1 !== t && (this.children.splice(t, 1), (e.parent = null)), this;
    }),
    Object.defineProperties(Ji.prototype, Ki);
  var eo = function(e, t, n) {
      return 'function' == typeof t
        ? (function(e, t) {
            var n = e.pos;
            if (e.eatWhile(t)) return new to(e, n, e.pos);
            e.pos = n;
          })(e, t)
        : new to(e, t, n);
    },
    to = function(e, t, n) {
      (this.stream = e),
        (this.start = null != t ? t : e.start),
        (this.end = null != n ? n : e.pos),
        (this._value = null);
    },
    no = { value: { configurable: !0 } };
  (no.value.get = function() {
    if (null === this._value) {
      var e = this.stream.start,
        t = this.stream.pos;
      (this.stream.start = this.start),
        (this.stream.pos = this.end),
        (this._value = this.stream.current()),
        (this.stream.start = e),
        (this.stream.pos = t);
    }
    return this._value;
  }),
    (to.prototype.toString = function() {
      return this.value;
    }),
    (to.prototype.valueOf = function() {
      return this.value + ' [' + this.start + '; ' + this.end + ']';
    }),
    Object.defineProperties(to.prototype, no);
  var ro = { throws: !0 },
    io = function(e) {
      var t = e.pos;
      if (
        a(e, 60, 62, ro) ||
        a(e, 91, 93, ro) ||
        a(e, 40, 41, ro) ||
        a(e, 123, 125, ro)
      )
        return eo(e, t);
    },
    oo = 47,
    ao = 61,
    so = 62,
    lo = 45,
    uo = 46,
    co = 58,
    fo = 95,
    po = function(e) {
      var t = e.pos;
      if (e.eat(60)) {
        var n = { type: e.eat(47) ? 'close' : 'open' };
        if (
          (n.name = (function(e) {
            return eo(e, Yt);
          })(e)) &&
          ('close' !== n.type &&
            ((n.attributes = (function(e) {
              for (var t, n = []; !e.eof(); )
                if ((e.eatWhile(o), ((t = { start: e.pos }).name = Wt(e))))
                  e.eat(ao) ? (t.value = Ut(e)) : (t.boolean = !0),
                    (t.end = e.pos),
                    n.push(t);
                else {
                  if (It(e.peek())) break;
                  e.next();
                }
              return n;
            })(e)),
            e.eatWhile(o),
            (n.selfClosing = e.eat(47))),
          e.eat(62))
        )
          return Object.assign(eo(e, t), n);
      }
      return (e.pos = t), null;
    },
    ho = Xt('<!--'),
    mo = Xt('-->'),
    go = function(e) {
      var t = e.pos;
      if (Gt(e, ho, mo, !0)) {
        var n = eo(e, t);
        return (n.type = 'comment'), n;
      }
      return null;
    },
    vo = Xt('<![CDATA['),
    bo = Xt(']]>'),
    yo = function(e) {
      var t = e.pos;
      if (Gt(e, vo, bo, !0)) {
        var n = eo(e, t);
        return (n.type = 'cdata'), n;
      }
      return null;
    },
    xo = {
      xml: !1,
      special: ['script', 'style'],
      empty: [
        'img',
        'meta',
        'link',
        'br',
        'base',
        'hr',
        'area',
        'wbr',
        'col',
        'embed',
        'input',
        'param',
        'source',
        'track'
      ]
    },
    wo = function(e, t, n) {
      (this.dom = e), (this.type = t), (this.syntax = n);
    };
  wo.prototype.nodeForPoint = function(e, t) {
    for (var n = this.dom.firstChild, r = null; n; )
      bt(xt(n), e, t) ? ((r = n), (n = n.firstChild)) : (n = n.nextSibling);
    return r;
  };
  var ko = 'emmet-open-tag',
    $o = 'emmet-close-tag';
  'undefined' != typeof CodeMirror &&
    (function(e) {
      Object.assign(e.commands, {
        emmetExpandAbbreviation: function(e) {
          return St(e, !0);
        },
        emmetExpandAbbreviationAll: function(e) {
          return St(e, !1);
        },
        emmetInsertLineBreak: _t,
        emmetWrapWithAbbreviation: zt
      });
      var t = function(e) {
        return (function(e, t) {
          var n = At(e, t);
          if (n) return n;
          Ct(e);
          var r = $t(e, t, !0);
          return r ? jt(e, r) : void 0;
        })(e, e.getCursor());
      };
      e.defineOption('markEmmetAbbreviation', !0, function(e, n) {
        n ? e.on('change', t) : (e.off('change', t), Ct(e));
      }),
        e.defineOption('autoRenameTags', !0, function(e, t) {
          t ? e.on('change', sn) : e.off('change', sn);
        }),
        e.defineOption('jsxBracket', !0),
        e.defineOption('markTagPairs', !1, function(e, t) {
          t
            ? (e.on('cursorActivity', tn), e.on('change', en))
            : (e.off('cursorActivity', tn), e.off('change', en), en(e), rn(e));
        }),
        e.defineOption('emmet', {}),
        e.defineExtension('getEmmetCompletions', function(e, t) {
          'boolean' == typeof e && ((t = e), (e = null));
          var n = Nt(this, (e = e || this.getCursor()));
          if (n && n.completions.length)
            return (
              this.getOption('markEmmetAbbreviation') &&
                !At(this, e) &&
                t &&
                (Ct(this), jt(n.model)),
              {
                from: n.abbreviation.range.from,
                to: n.abbreviation.range.to,
                list: n.completions
              }
            );
        }),
        e.defineExtension('getEmmetAbbreviation', function(e, t) {
          return $t(this, e || this.getCursor(), t);
        }),
        e.defineExtension('findEmmetMarker', function(e) {
          return At(this, e || this.getCursor());
        }),
        e.defineExtension('getEmmetDocumentModel', function() {
          return this.getOption('markTagPairs')
            ? ((e = this).state._emmetModel || (e.state._emmetModel = Kt(e)),
              e.state._emmetModel)
            : Kt(this);
          var e;
        });
    })(CodeMirror);
});
