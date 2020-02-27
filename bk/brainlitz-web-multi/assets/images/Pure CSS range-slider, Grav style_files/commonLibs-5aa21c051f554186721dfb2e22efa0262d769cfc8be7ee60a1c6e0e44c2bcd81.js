/*! jQuery UI - v1.11.3 - 2015-03-05
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, draggable.js, droppable.js, resizable.js, sortable.js
 * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */
!(function(t) {
  'function' == typeof define && define.amd ? define(['jquery'], t) : t(jQuery);
})(function(t) {
  function e(e, n) {
    var s,
      o,
      r,
      a = e.nodeName.toLowerCase();
    return 'area' === a
      ? ((o = (s = e.parentNode).name),
        !(!e.href || !o || 'map' !== s.nodeName.toLowerCase()) &&
          !!(r = t("img[usemap='#" + o + "']")[0]) && i(r))
      : (/^(input|select|textarea|button|object)$/.test(a)
          ? !e.disabled
          : ('a' === a && e.href) || n) && i(e);
  }
  function i(e) {
    return (
      t.expr.filters.visible(e) &&
      !t(e)
        .parents()
        .addBack()
        .filter(function() {
          return 'hidden' === t.css(this, 'visibility');
        }).length
    );
  }
  var n, s, o, r;
  /*!
   * jQuery UI Core 1.11.3
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/category/ui-core/
   */
  (t.ui = t.ui || {}),
    t.extend(t.ui, {
      version: '1.11.3',
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
      }
    }),
    t.fn.extend({
      scrollParent: function(e) {
        var i = this.css('position'),
          n = 'absolute' === i,
          s = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          o = this.parents()
            .filter(function() {
              var e = t(this);
              return (
                (!n || 'static' !== e.css('position')) &&
                s.test(
                  e.css('overflow') + e.css('overflow-y') + e.css('overflow-x')
                )
              );
            })
            .eq(0);
        return 'fixed' !== i && o.length
          ? o
          : t(this[0].ownerDocument || document);
      },
      uniqueId:
        ((n = 0),
        function() {
          return this.each(function() {
            this.id || (this.id = 'ui-id-' + ++n);
          });
        }),
      removeUniqueId: function() {
        return this.each(function() {
          /^ui-id-\d+$/.test(this.id) && t(this).removeAttr('id');
        });
      }
    }),
    t.extend(t.expr[':'], {
      data: t.expr.createPseudo
        ? t.expr.createPseudo(function(e) {
            return function(i) {
              return !!t.data(i, e);
            };
          })
        : function(e, i, n) {
            return !!t.data(e, n[3]);
          },
      focusable: function(i) {
        return e(i, !isNaN(t.attr(i, 'tabindex')));
      },
      tabbable: function(i) {
        var n = t.attr(i, 'tabindex'),
          s = isNaN(n);
        return (s || n >= 0) && e(i, !s);
      }
    }),
    t('<a>').outerWidth(1).jquery ||
      t.each(['Width', 'Height'], function(e, i) {
        function n(e, i, n, o) {
          return (
            t.each(s, function() {
              (i -= parseFloat(t.css(e, 'padding' + this)) || 0),
                n &&
                  (i -= parseFloat(t.css(e, 'border' + this + 'Width')) || 0),
                o && (i -= parseFloat(t.css(e, 'margin' + this)) || 0);
            }),
            i
          );
        }
        var s = 'Width' === i ? ['Left', 'Right'] : ['Top', 'Bottom'],
          o = i.toLowerCase(),
          r = {
            innerWidth: t.fn.innerWidth,
            innerHeight: t.fn.innerHeight,
            outerWidth: t.fn.outerWidth,
            outerHeight: t.fn.outerHeight
          };
        (t.fn['inner' + i] = function(e) {
          return e === undefined
            ? r['inner' + i].call(this)
            : this.each(function() {
                t(this).css(o, n(this, e) + 'px');
              });
        }),
          (t.fn['outer' + i] = function(e, s) {
            return 'number' != typeof e
              ? r['outer' + i].call(this, e)
              : this.each(function() {
                  t(this).css(o, n(this, e, !0, s) + 'px');
                });
          });
      }),
    t.fn.addBack ||
      (t.fn.addBack = function(t) {
        return this.add(
          null == t ? this.prevObject : this.prevObject.filter(t)
        );
      }),
    t('<a>')
      .data('a-b', 'a')
      .removeData('a-b')
      .data('a-b') &&
      (t.fn.removeData =
        ((s = t.fn.removeData),
        function(e) {
          return arguments.length ? s.call(this, t.camelCase(e)) : s.call(this);
        })),
    (t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    t.fn.extend({
      focus:
        ((r = t.fn.focus),
        function(e, i) {
          return 'number' == typeof e
            ? this.each(function() {
                var n = this;
                setTimeout(function() {
                  t(n).focus(), i && i.call(n);
                }, e);
              })
            : r.apply(this, arguments);
        }),
      disableSelection:
        ((o =
          'onselectstart' in document.createElement('div')
            ? 'selectstart'
            : 'mousedown'),
        function() {
          return this.bind(o + '.ui-disableSelection', function(t) {
            t.preventDefault();
          });
        }),
      enableSelection: function() {
        return this.unbind('.ui-disableSelection');
      },
      zIndex: function(e) {
        if (e !== undefined) return this.css('zIndex', e);
        if (this.length)
          for (var i, n, s = t(this[0]); s.length && s[0] !== document; ) {
            if (
              ('absolute' === (i = s.css('position')) ||
                'relative' === i ||
                'fixed' === i) &&
              ((n = parseInt(s.css('zIndex'), 10)), !isNaN(n) && 0 !== n)
            )
              return n;
            s = s.parent();
          }
        return 0;
      }
    }),
    (t.ui.plugin = {
      add: function(e, i, n) {
        var s,
          o = t.ui[e].prototype;
        for (s in n)
          (o.plugins[s] = o.plugins[s] || []), o.plugins[s].push([i, n[s]]);
      },
      call: function(t, e, i, n) {
        var s,
          o = t.plugins[e];
        if (
          o &&
          (n ||
            (t.element[0].parentNode &&
              11 !== t.element[0].parentNode.nodeType))
        )
          for (s = 0; s < o.length; s++)
            t.options[o[s][0]] && o[s][1].apply(t.element, i);
      }
    });
  /*!
   * jQuery UI Widget 1.11.3
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/jQuery.widget/
   */
  var a = 0,
    h = Array.prototype.slice;
  (t.cleanData = (function(e) {
    return function(i) {
      var n, s, o;
      for (o = 0; null != (s = i[o]); o++)
        try {
          (n = t._data(s, 'events')) &&
            n.remove &&
            t(s).triggerHandler('remove');
        } catch (r) {}
      e(i);
    };
  })(t.cleanData)),
    (t.widget = function(e, i, n) {
      var s,
        o,
        r,
        a,
        h = {},
        l = e.split('.')[0];
      return (
        (e = e.split('.')[1]),
        (s = l + '-' + e),
        n || ((n = i), (i = t.Widget)),
        (t.expr[':'][s.toLowerCase()] = function(e) {
          return !!t.data(e, s);
        }),
        (t[l] = t[l] || {}),
        (o = t[l][e]),
        (r = t[l][e] = function(t, e) {
          if (!this._createWidget) return new r(t, e);
          arguments.length && this._createWidget(t, e);
        }),
        t.extend(r, o, {
          version: n.version,
          _proto: t.extend({}, n),
          _childConstructors: []
        }),
        ((a = new i()).options = t.widget.extend({}, a.options)),
        t.each(n, function(e, n) {
          var s, o;
          t.isFunction(n)
            ? (h[e] =
                ((s = function() {
                  return i.prototype[e].apply(this, arguments);
                }),
                (o = function(t) {
                  return i.prototype[e].apply(this, t);
                }),
                function() {
                  var t,
                    e = this._super,
                    i = this._superApply;
                  return (
                    (this._super = s),
                    (this._superApply = o),
                    (t = n.apply(this, arguments)),
                    (this._super = e),
                    (this._superApply = i),
                    t
                  );
                }))
            : (h[e] = n);
        }),
        (r.prototype = t.widget.extend(
          a,
          { widgetEventPrefix: (o && a.widgetEventPrefix) || e },
          h,
          { constructor: r, namespace: l, widgetName: e, widgetFullName: s }
        )),
        o
          ? (t.each(o._childConstructors, function(e, i) {
              var n = i.prototype;
              t.widget(n.namespace + '.' + n.widgetName, r, i._proto);
            }),
            delete o._childConstructors)
          : i._childConstructors.push(r),
        t.widget.bridge(e, r),
        r
      );
    }),
    (t.widget.extend = function(e) {
      for (var i, n, s = h.call(arguments, 1), o = 0, r = s.length; o < r; o++)
        for (i in s[o])
          (n = s[o][i]),
            s[o].hasOwnProperty(i) &&
              n !== undefined &&
              (t.isPlainObject(n)
                ? (e[i] = t.isPlainObject(e[i])
                    ? t.widget.extend({}, e[i], n)
                    : t.widget.extend({}, n))
                : (e[i] = n));
      return e;
    }),
    (t.widget.bridge = function(e, i) {
      var n = i.prototype.widgetFullName || e;
      t.fn[e] = function(s) {
        var o = 'string' == typeof s,
          r = h.call(arguments, 1),
          a = this;
        return (
          o
            ? this.each(function() {
                var i,
                  o = t.data(this, n);
                return 'instance' === s
                  ? ((a = o), !1)
                  : o
                  ? t.isFunction(o[s]) && '_' !== s.charAt(0)
                    ? (i = o[s].apply(o, r)) !== o && i !== undefined
                      ? ((a = i && i.jquery ? a.pushStack(i.get()) : i), !1)
                      : void 0
                    : t.error(
                        "no such method '" +
                          s +
                          "' for " +
                          e +
                          ' widget instance'
                      )
                  : t.error(
                      'cannot call methods on ' +
                        e +
                        " prior to initialization; attempted to call method '" +
                        s +
                        "'"
                    );
              })
            : (r.length && (s = t.widget.extend.apply(null, [s].concat(r))),
              this.each(function() {
                var e = t.data(this, n);
                e
                  ? (e.option(s || {}), e._init && e._init())
                  : t.data(this, n, new i(s, this));
              })),
          a
        );
      };
    }),
    (t.Widget = function() {}),
    (t.Widget._childConstructors = []),
    (t.Widget.prototype = {
      widgetName: 'widget',
      widgetEventPrefix: '',
      defaultElement: '<div>',
      options: { disabled: !1, create: null },
      _createWidget: function(e, i) {
        (i = t(i || this.defaultElement || this)[0]),
          (this.element = t(i)),
          (this.uuid = a++),
          (this.eventNamespace = '.' + this.widgetName + this.uuid),
          (this.bindings = t()),
          (this.hoverable = t()),
          (this.focusable = t()),
          i !== this &&
            (t.data(i, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function(t) {
                t.target === i && this.destroy();
              }
            }),
            (this.document = t(i.style ? i.ownerDocument : i.document || i)),
            (this.window = t(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          (this.options = t.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            e
          )),
          this._create(),
          this._trigger('create', null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: t.noop,
      _getCreateEventData: t.noop,
      _create: t.noop,
      _init: t.noop,
      destroy: function() {
        this._destroy(),
          this.element
            .unbind(this.eventNamespace)
            .removeData(this.widgetFullName)
            .removeData(t.camelCase(this.widgetFullName)),
          this.widget()
            .unbind(this.eventNamespace)
            .removeAttr('aria-disabled')
            .removeClass(this.widgetFullName + '-disabled ui-state-disabled'),
          this.bindings.unbind(this.eventNamespace),
          this.hoverable.removeClass('ui-state-hover'),
          this.focusable.removeClass('ui-state-focus');
      },
      _destroy: t.noop,
      widget: function() {
        return this.element;
      },
      option: function(e, i) {
        var n,
          s,
          o,
          r = e;
        if (0 === arguments.length) return t.widget.extend({}, this.options);
        if ('string' == typeof e)
          if (((r = {}), (e = (n = e.split('.')).shift()), n.length)) {
            for (
              s = r[e] = t.widget.extend({}, this.options[e]), o = 0;
              o < n.length - 1;
              o++
            )
              (s[n[o]] = s[n[o]] || {}), (s = s[n[o]]);
            if (((e = n.pop()), 1 === arguments.length))
              return s[e] === undefined ? null : s[e];
            s[e] = i;
          } else {
            if (1 === arguments.length)
              return this.options[e] === undefined ? null : this.options[e];
            r[e] = i;
          }
        return this._setOptions(r), this;
      },
      _setOptions: function(t) {
        var e;
        for (e in t) this._setOption(e, t[e]);
        return this;
      },
      _setOption: function(t, e) {
        return (
          (this.options[t] = e),
          'disabled' === t &&
            (this.widget().toggleClass(this.widgetFullName + '-disabled', !!e),
            e &&
              (this.hoverable.removeClass('ui-state-hover'),
              this.focusable.removeClass('ui-state-focus'))),
          this
        );
      },
      enable: function() {
        return this._setOptions({ disabled: !1 });
      },
      disable: function() {
        return this._setOptions({ disabled: !0 });
      },
      _on: function(e, i, n) {
        var s,
          o = this;
        'boolean' != typeof e && ((n = i), (i = e), (e = !1)),
          n
            ? ((i = s = t(i)), (this.bindings = this.bindings.add(i)))
            : ((n = i), (i = this.element), (s = this.widget())),
          t.each(n, function(n, r) {
            function a() {
              if (
                e ||
                (!0 !== o.options.disabled &&
                  !t(this).hasClass('ui-state-disabled'))
              )
                return ('string' == typeof r ? o[r] : r).apply(o, arguments);
            }
            'string' != typeof r &&
              (a.guid = r.guid = r.guid || a.guid || t.guid++);
            var h = n.match(/^([\w:-]*)\s*(.*)$/),
              l = h[1] + o.eventNamespace,
              c = h[2];
            c ? s.delegate(c, l, a) : i.bind(l, a);
          });
      },
      _off: function(e, i) {
        (i =
          (i || '').split(' ').join(this.eventNamespace + ' ') +
          this.eventNamespace),
          e.unbind(i).undelegate(i),
          (this.bindings = t(this.bindings.not(e).get())),
          (this.focusable = t(this.focusable.not(e).get())),
          (this.hoverable = t(this.hoverable.not(e).get()));
      },
      _delay: function(t, e) {
        function i() {
          return ('string' == typeof t ? n[t] : t).apply(n, arguments);
        }
        var n = this;
        return setTimeout(i, e || 0);
      },
      _hoverable: function(e) {
        (this.hoverable = this.hoverable.add(e)),
          this._on(e, {
            mouseenter: function(e) {
              t(e.currentTarget).addClass('ui-state-hover');
            },
            mouseleave: function(e) {
              t(e.currentTarget).removeClass('ui-state-hover');
            }
          });
      },
      _focusable: function(e) {
        (this.focusable = this.focusable.add(e)),
          this._on(e, {
            focusin: function(e) {
              t(e.currentTarget).addClass('ui-state-focus');
            },
            focusout: function(e) {
              t(e.currentTarget).removeClass('ui-state-focus');
            }
          });
      },
      _trigger: function(e, i, n) {
        var s,
          o,
          r = this.options[e];
        if (
          ((n = n || {}),
          ((i = t.Event(i)).type = (e === this.widgetEventPrefix
            ? e
            : this.widgetEventPrefix + e
          ).toLowerCase()),
          (i.target = this.element[0]),
          (o = i.originalEvent))
        )
          for (s in o) s in i || (i[s] = o[s]);
        return (
          this.element.trigger(i, n),
          !(
            (t.isFunction(r) &&
              !1 === r.apply(this.element[0], [i].concat(n))) ||
            i.isDefaultPrevented()
          )
        );
      }
    }),
    t.each({ show: 'fadeIn', hide: 'fadeOut' }, function(e, i) {
      t.Widget.prototype['_' + e] = function(n, s, o) {
        'string' == typeof s && (s = { effect: s });
        var r,
          a = s ? (!0 === s || 'number' == typeof s ? i : s.effect || i) : e;
        'number' == typeof (s = s || {}) && (s = { duration: s }),
          (r = !t.isEmptyObject(s)),
          (s.complete = o),
          s.delay && n.delay(s.delay),
          r && t.effects && t.effects.effect[a]
            ? n[e](s)
            : a !== e && n[a]
            ? n[a](s.duration, s.easing, o)
            : n.queue(function(i) {
                t(this)[e](), o && o.call(n[0]), i();
              });
      };
    });
  t.widget;
  /*!
   * jQuery UI Mouse 1.11.3
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/mouse/
   */ var l = !1;
  t(document).mouseup(function() {
    l = !1;
  });
  t.widget('ui.mouse', {
    version: '1.11.3',
    options: {
      cancel: 'input,textarea,button,select,option',
      distance: 1,
      delay: 0
    },
    _mouseInit: function() {
      var e = this;
      this.element
        .bind('mousedown.' + this.widgetName, function(t) {
          return e._mouseDown(t);
        })
        .bind('click.' + this.widgetName, function(i) {
          if (!0 === t.data(i.target, e.widgetName + '.preventClickEvent'))
            return (
              t.removeData(i.target, e.widgetName + '.preventClickEvent'),
              i.stopImmediatePropagation(),
              !1
            );
        }),
        (this.started = !1);
    },
    _mouseDestroy: function() {
      this.element.unbind('.' + this.widgetName),
        this._mouseMoveDelegate &&
          this.document
            .unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate)
            .unbind('mouseup.' + this.widgetName, this._mouseUpDelegate);
    },
    _mouseDown: function(e) {
      if (!l) {
        (this._mouseMoved = !1),
          this._mouseStarted && this._mouseUp(e),
          (this._mouseDownEvent = e);
        var i = this,
          n = 1 === e.which,
          s =
            !('string' != typeof this.options.cancel || !e.target.nodeName) &&
            t(e.target).closest(this.options.cancel).length;
        return (
          !(n && !s && this._mouseCapture(e)) ||
          ((this.mouseDelayMet = !this.options.delay),
          this.mouseDelayMet ||
            (this._mouseDelayTimer = setTimeout(function() {
              i.mouseDelayMet = !0;
            }, this.options.delay)),
          this._mouseDistanceMet(e) &&
          this._mouseDelayMet(e) &&
          ((this._mouseStarted = !1 !== this._mouseStart(e)),
          !this._mouseStarted)
            ? (e.preventDefault(), !0)
            : (!0 ===
                t.data(e.target, this.widgetName + '.preventClickEvent') &&
                t.removeData(e.target, this.widgetName + '.preventClickEvent'),
              (this._mouseMoveDelegate = function(t) {
                return i._mouseMove(t);
              }),
              (this._mouseUpDelegate = function(t) {
                return i._mouseUp(t);
              }),
              this.document
                .bind('mousemove.' + this.widgetName, this._mouseMoveDelegate)
                .bind('mouseup.' + this.widgetName, this._mouseUpDelegate),
              e.preventDefault(),
              (l = !0),
              !0))
        );
      }
    },
    _mouseMove: function(e) {
      if (this._mouseMoved) {
        if (
          t.ui.ie &&
          (!document.documentMode || document.documentMode < 9) &&
          !e.button
        )
          return this._mouseUp(e);
        if (!e.which) return this._mouseUp(e);
      }
      return (
        (e.which || e.button) && (this._mouseMoved = !0),
        this._mouseStarted
          ? (this._mouseDrag(e), e.preventDefault())
          : (this._mouseDistanceMet(e) &&
              this._mouseDelayMet(e) &&
              ((this._mouseStarted =
                !1 !== this._mouseStart(this._mouseDownEvent, e)),
              this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
            !this._mouseStarted)
      );
    },
    _mouseUp: function(e) {
      return (
        this.document
          .unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate)
          .unbind('mouseup.' + this.widgetName, this._mouseUpDelegate),
        this._mouseStarted &&
          ((this._mouseStarted = !1),
          e.target === this._mouseDownEvent.target &&
            t.data(e.target, this.widgetName + '.preventClickEvent', !0),
          this._mouseStop(e)),
        (l = !1),
        !1
      );
    },
    _mouseDistanceMet: function(t) {
      return (
        Math.max(
          Math.abs(this._mouseDownEvent.pageX - t.pageX),
          Math.abs(this._mouseDownEvent.pageY - t.pageY)
        ) >= this.options.distance
      );
    },
    _mouseDelayMet: function() {
      return this.mouseDelayMet;
    },
    _mouseStart: function() {},
    _mouseDrag: function() {},
    _mouseStop: function() {},
    _mouseCapture: function() {
      return !0;
    }
  });
  /*!
   * jQuery UI Draggable 1.11.3
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/draggable/
   */ t.widget('ui.draggable', t.ui.mouse, {
    version: '1.11.3',
    widgetEventPrefix: 'drag',
    options: {
      addClasses: !0,
      appendTo: 'parent',
      axis: !1,
      connectToSortable: !1,
      containment: !1,
      cursor: 'auto',
      cursorAt: !1,
      grid: !1,
      handle: !1,
      helper: 'original',
      iframeFix: !1,
      opacity: !1,
      refreshPositions: !1,
      revert: !1,
      revertDuration: 500,
      scope: 'default',
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: !1,
      snapMode: 'both',
      snapTolerance: 20,
      stack: !1,
      zIndex: !1,
      drag: null,
      start: null,
      stop: null
    },
    _create: function() {
      'original' === this.options.helper && this._setPositionRelative(),
        this.options.addClasses && this.element.addClass('ui-draggable'),
        this.options.disabled && this.element.addClass('ui-draggable-disabled'),
        this._setHandleClassName(),
        this._mouseInit();
    },
    _setOption: function(t, e) {
      this._super(t, e),
        'handle' === t &&
          (this._removeHandleClassName(), this._setHandleClassName());
    },
    _destroy: function() {
      (this.helper || this.element).is('.ui-draggable-dragging')
        ? (this.destroyOnClear = !0)
        : (this.element.removeClass(
            'ui-draggable ui-draggable-dragging ui-draggable-disabled'
          ),
          this._removeHandleClassName(),
          this._mouseDestroy());
    },
    _mouseCapture: function(e) {
      var i = this.options;
      return (
        this._blurActiveElement(e),
        !(
          this.helper ||
          i.disabled ||
          t(e.target).closest('.ui-resizable-handle').length > 0
        ) &&
          ((this.handle = this._getHandle(e)),
          !!this.handle &&
            (this._blockFrames(!0 === i.iframeFix ? 'iframe' : i.iframeFix),
            !0))
      );
    },
    _blockFrames: function(e) {
      this.iframeBlocks = this.document.find(e).map(function() {
        var e = t(this);
        return t('<div>')
          .css('position', 'absolute')
          .appendTo(e.parent())
          .outerWidth(e.outerWidth())
          .outerHeight(e.outerHeight())
          .offset(e.offset())[0];
      });
    },
    _unblockFrames: function() {
      this.iframeBlocks &&
        (this.iframeBlocks.remove(), delete this.iframeBlocks);
    },
    _blurActiveElement: function(e) {
      var i = this.document[0];
      if (this.handleElement.is(e.target))
        try {
          i.activeElement &&
            'body' !== i.activeElement.nodeName.toLowerCase() &&
            t(i.activeElement).blur();
        } catch (n) {}
    },
    _mouseStart: function(e) {
      var i = this.options;
      return (
        (this.helper = this._createHelper(e)),
        this.helper.addClass('ui-draggable-dragging'),
        this._cacheHelperProportions(),
        t.ui.ddmanager && (t.ui.ddmanager.current = this),
        this._cacheMargins(),
        (this.cssPosition = this.helper.css('position')),
        (this.scrollParent = this.helper.scrollParent(!0)),
        (this.offsetParent = this.helper.offsetParent()),
        (this.hasFixedAncestor =
          this.helper.parents().filter(function() {
            return 'fixed' === t(this).css('position');
          }).length > 0),
        (this.positionAbs = this.element.offset()),
        this._refreshOffsets(e),
        (this.originalPosition = this.position = this._generatePosition(e, !1)),
        (this.originalPageX = e.pageX),
        (this.originalPageY = e.pageY),
        i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
        this._setContainment(),
        !1 === this._trigger('start', e)
          ? (this._clear(), !1)
          : (this._cacheHelperProportions(),
            t.ui.ddmanager &&
              !i.dropBehaviour &&
              t.ui.ddmanager.prepareOffsets(this, e),
            this._normalizeRightBottom(),
            this._mouseDrag(e, !0),
            t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e),
            !0)
      );
    },
    _refreshOffsets: function(t) {
      (this.offset = {
        top: this.positionAbs.top - this.margins.top,
        left: this.positionAbs.left - this.margins.left,
        scroll: !1,
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      }),
        (this.offset.click = {
          left: t.pageX - this.offset.left,
          top: t.pageY - this.offset.top
        });
    },
    _mouseDrag: function(e, i) {
      if (
        (this.hasFixedAncestor &&
          (this.offset.parent = this._getParentOffset()),
        (this.position = this._generatePosition(e, !0)),
        (this.positionAbs = this._convertPositionTo('absolute')),
        !i)
      ) {
        var n = this._uiHash();
        if (!1 === this._trigger('drag', e, n)) return this._mouseUp({}), !1;
        this.position = n.position;
      }
      return (
        (this.helper[0].style.left = this.position.left + 'px'),
        (this.helper[0].style.top = this.position.top + 'px'),
        t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
        !1
      );
    },
    _mouseStop: function(e) {
      var i = this,
        n = !1;
      return (
        t.ui.ddmanager &&
          !this.options.dropBehaviour &&
          (n = t.ui.ddmanager.drop(this, e)),
        this.dropped && ((n = this.dropped), (this.dropped = !1)),
        ('invalid' === this.options.revert && !n) ||
        ('valid' === this.options.revert && n) ||
        !0 === this.options.revert ||
        (t.isFunction(this.options.revert) &&
          this.options.revert.call(this.element, n))
          ? t(this.helper).animate(
              this.originalPosition,
              parseInt(this.options.revertDuration, 10),
              function() {
                !1 !== i._trigger('stop', e) && i._clear();
              }
            )
          : !1 !== this._trigger('stop', e) && this._clear(),
        !1
      );
    },
    _mouseUp: function(e) {
      return (
        this._unblockFrames(),
        t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e),
        this.handleElement.is(e.target) && this.element.focus(),
        t.ui.mouse.prototype._mouseUp.call(this, e)
      );
    },
    cancel: function() {
      return (
        this.helper.is('.ui-draggable-dragging')
          ? this._mouseUp({})
          : this._clear(),
        this
      );
    },
    _getHandle: function(e) {
      return (
        !this.options.handle ||
        !!t(e.target).closest(this.element.find(this.options.handle)).length
      );
    },
    _setHandleClassName: function() {
      (this.handleElement = this.options.handle
        ? this.element.find(this.options.handle)
        : this.element),
        this.handleElement.addClass('ui-draggable-handle');
    },
    _removeHandleClassName: function() {
      this.handleElement.removeClass('ui-draggable-handle');
    },
    _createHelper: function(e) {
      var i = this.options,
        n = t.isFunction(i.helper),
        s = n
          ? t(i.helper.apply(this.element[0], [e]))
          : 'clone' === i.helper
          ? this.element.clone().removeAttr('id')
          : this.element;
      return (
        s.parents('body').length ||
          s.appendTo(
            'parent' === i.appendTo ? this.element[0].parentNode : i.appendTo
          ),
        n && s[0] === this.element[0] && this._setPositionRelative(),
        s[0] === this.element[0] ||
          /(fixed|absolute)/.test(s.css('position')) ||
          s.css('position', 'absolute'),
        s
      );
    },
    _setPositionRelative: function() {
      /^(?:r|a|f)/.test(this.element.css('position')) ||
        (this.element[0].style.position = 'relative');
    },
    _adjustOffsetFromHelper: function(e) {
      'string' == typeof e && (e = e.split(' ')),
        t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
        'left' in e && (this.offset.click.left = e.left + this.margins.left),
        'right' in e &&
          (this.offset.click.left =
            this.helperProportions.width - e.right + this.margins.left),
        'top' in e && (this.offset.click.top = e.top + this.margins.top),
        'bottom' in e &&
          (this.offset.click.top =
            this.helperProportions.height - e.bottom + this.margins.top);
    },
    _isRootNode: function(t) {
      return /(html|body)/i.test(t.tagName) || t === this.document[0];
    },
    _getParentOffset: function() {
      var e = this.offsetParent.offset(),
        i = this.document[0];
      return (
        'absolute' === this.cssPosition &&
          this.scrollParent[0] !== i &&
          t.contains(this.scrollParent[0], this.offsetParent[0]) &&
          ((e.left += this.scrollParent.scrollLeft()),
          (e.top += this.scrollParent.scrollTop())),
        this._isRootNode(this.offsetParent[0]) && (e = { top: 0, left: 0 }),
        {
          top:
            e.top +
            (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
          left:
            e.left +
            (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
        }
      );
    },
    _getRelativeOffset: function() {
      if ('relative' !== this.cssPosition) return { top: 0, left: 0 };
      var t = this.element.position(),
        e = this._isRootNode(this.scrollParent[0]);
      return {
        top:
          t.top -
          (parseInt(this.helper.css('top'), 10) || 0) +
          (e ? 0 : this.scrollParent.scrollTop()),
        left:
          t.left -
          (parseInt(this.helper.css('left'), 10) || 0) +
          (e ? 0 : this.scrollParent.scrollLeft())
      };
    },
    _cacheMargins: function() {
      this.margins = {
        left: parseInt(this.element.css('marginLeft'), 10) || 0,
        top: parseInt(this.element.css('marginTop'), 10) || 0,
        right: parseInt(this.element.css('marginRight'), 10) || 0,
        bottom: parseInt(this.element.css('marginBottom'), 10) || 0
      };
    },
    _cacheHelperProportions: function() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function() {
      var e,
        i,
        n,
        s = this.options,
        o = this.document[0];
      (this.relativeContainer = null),
        s.containment
          ? 'window' !== s.containment
            ? 'document' !== s.containment
              ? s.containment.constructor !== Array
                ? ('parent' === s.containment &&
                    (s.containment = this.helper[0].parentNode),
                  (n = (i = t(s.containment))[0]) &&
                    ((e = /(scroll|auto)/.test(i.css('overflow'))),
                    (this.containment = [
                      (parseInt(i.css('borderLeftWidth'), 10) || 0) +
                        (parseInt(i.css('paddingLeft'), 10) || 0),
                      (parseInt(i.css('borderTopWidth'), 10) || 0) +
                        (parseInt(i.css('paddingTop'), 10) || 0),
                      (e
                        ? Math.max(n.scrollWidth, n.offsetWidth)
                        : n.offsetWidth) -
                        (parseInt(i.css('borderRightWidth'), 10) || 0) -
                        (parseInt(i.css('paddingRight'), 10) || 0) -
                        this.helperProportions.width -
                        this.margins.left -
                        this.margins.right,
                      (e
                        ? Math.max(n.scrollHeight, n.offsetHeight)
                        : n.offsetHeight) -
                        (parseInt(i.css('borderBottomWidth'), 10) || 0) -
                        (parseInt(i.css('paddingBottom'), 10) || 0) -
                        this.helperProportions.height -
                        this.margins.top -
                        this.margins.bottom
                    ]),
                    (this.relativeContainer = i)))
                : (this.containment = s.containment)
              : (this.containment = [
                  0,
                  0,
                  t(o).width() -
                    this.helperProportions.width -
                    this.margins.left,
                  (t(o).height() || o.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top
                ])
            : (this.containment = [
                t(window).scrollLeft() -
                  this.offset.relative.left -
                  this.offset.parent.left,
                t(window).scrollTop() -
                  this.offset.relative.top -
                  this.offset.parent.top,
                t(window).scrollLeft() +
                  t(window).width() -
                  this.helperProportions.width -
                  this.margins.left,
                t(window).scrollTop() +
                  (t(window).height() || o.body.parentNode.scrollHeight) -
                  this.helperProportions.height -
                  this.margins.top
              ])
          : (this.containment = null);
    },
    _convertPositionTo: function(t, e) {
      e || (e = this.position);
      var i = 'absolute' === t ? 1 : -1,
        n = this._isRootNode(this.scrollParent[0]);
      return {
        top:
          e.top +
          this.offset.relative.top * i +
          this.offset.parent.top * i -
          ('fixed' === this.cssPosition
            ? -this.offset.scroll.top
            : n
            ? 0
            : this.offset.scroll.top) *
            i,
        left:
          e.left +
          this.offset.relative.left * i +
          this.offset.parent.left * i -
          ('fixed' === this.cssPosition
            ? -this.offset.scroll.left
            : n
            ? 0
            : this.offset.scroll.left) *
            i
      };
    },
    _generatePosition: function(t, e) {
      var i,
        n,
        s,
        o,
        r = this.options,
        a = this._isRootNode(this.scrollParent[0]),
        h = t.pageX,
        l = t.pageY;
      return (
        (a && this.offset.scroll) ||
          (this.offset.scroll = {
            top: this.scrollParent.scrollTop(),
            left: this.scrollParent.scrollLeft()
          }),
        e &&
          (this.containment &&
            (this.relativeContainer
              ? ((n = this.relativeContainer.offset()),
                (i = [
                  this.containment[0] + n.left,
                  this.containment[1] + n.top,
                  this.containment[2] + n.left,
                  this.containment[3] + n.top
                ]))
              : (i = this.containment),
            t.pageX - this.offset.click.left < i[0] &&
              (h = i[0] + this.offset.click.left),
            t.pageY - this.offset.click.top < i[1] &&
              (l = i[1] + this.offset.click.top),
            t.pageX - this.offset.click.left > i[2] &&
              (h = i[2] + this.offset.click.left),
            t.pageY - this.offset.click.top > i[3] &&
              (l = i[3] + this.offset.click.top)),
          r.grid &&
            ((s = r.grid[1]
              ? this.originalPageY +
                Math.round((l - this.originalPageY) / r.grid[1]) * r.grid[1]
              : this.originalPageY),
            (l = i
              ? s - this.offset.click.top >= i[1] ||
                s - this.offset.click.top > i[3]
                ? s
                : s - this.offset.click.top >= i[1]
                ? s - r.grid[1]
                : s + r.grid[1]
              : s),
            (o = r.grid[0]
              ? this.originalPageX +
                Math.round((h - this.originalPageX) / r.grid[0]) * r.grid[0]
              : this.originalPageX),
            (h = i
              ? o - this.offset.click.left >= i[0] ||
                o - this.offset.click.left > i[2]
                ? o
                : o - this.offset.click.left >= i[0]
                ? o - r.grid[0]
                : o + r.grid[0]
              : o)),
          'y' === r.axis && (h = this.originalPageX),
          'x' === r.axis && (l = this.originalPageY)),
        {
          top:
            l -
            this.offset.click.top -
            this.offset.relative.top -
            this.offset.parent.top +
            ('fixed' === this.cssPosition
              ? -this.offset.scroll.top
              : a
              ? 0
              : this.offset.scroll.top),
          left:
            h -
            this.offset.click.left -
            this.offset.relative.left -
            this.offset.parent.left +
            ('fixed' === this.cssPosition
              ? -this.offset.scroll.left
              : a
              ? 0
              : this.offset.scroll.left)
        }
      );
    },
    _clear: function() {
      this.helper.removeClass('ui-draggable-dragging'),
        this.helper[0] === this.element[0] ||
          this.cancelHelperRemoval ||
          this.helper.remove(),
        (this.helper = null),
        (this.cancelHelperRemoval = !1),
        this.destroyOnClear && this.destroy();
    },
    _normalizeRightBottom: function() {
      'y' !== this.options.axis &&
        'auto' !== this.helper.css('right') &&
        (this.helper.width(this.helper.width()),
        this.helper.css('right', 'auto')),
        'x' !== this.options.axis &&
          'auto' !== this.helper.css('bottom') &&
          (this.helper.height(this.helper.height()),
          this.helper.css('bottom', 'auto'));
    },
    _trigger: function(e, i, n) {
      return (
        (n = n || this._uiHash()),
        t.ui.plugin.call(this, e, [i, n, this], !0),
        /^(drag|start|stop)/.test(e) &&
          ((this.positionAbs = this._convertPositionTo('absolute')),
          (n.offset = this.positionAbs)),
        t.Widget.prototype._trigger.call(this, e, i, n)
      );
    },
    plugins: {},
    _uiHash: function() {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      };
    }
  }),
    t.ui.plugin.add('draggable', 'connectToSortable', {
      start: function(e, i, n) {
        var s = t.extend({}, i, { item: n.element });
        (n.sortables = []),
          t(n.options.connectToSortable).each(function() {
            var i = t(this).sortable('instance');
            i &&
              !i.options.disabled &&
              (n.sortables.push(i),
              i.refreshPositions(),
              i._trigger('activate', e, s));
          });
      },
      stop: function(e, i, n) {
        var s = t.extend({}, i, { item: n.element });
        (n.cancelHelperRemoval = !1),
          t.each(n.sortables, function() {
            var t = this;
            t.isOver
              ? ((t.isOver = 0),
                (n.cancelHelperRemoval = !0),
                (t.cancelHelperRemoval = !1),
                (t._storedCSS = {
                  position: t.placeholder.css('position'),
                  top: t.placeholder.css('top'),
                  left: t.placeholder.css('left')
                }),
                t._mouseStop(e),
                (t.options.helper = t.options._helper))
              : ((t.cancelHelperRemoval = !0), t._trigger('deactivate', e, s));
          });
      },
      drag: function(e, i, n) {
        t.each(n.sortables, function() {
          var s = !1,
            o = this;
          (o.positionAbs = n.positionAbs),
            (o.helperProportions = n.helperProportions),
            (o.offset.click = n.offset.click),
            o._intersectsWith(o.containerCache) &&
              ((s = !0),
              t.each(n.sortables, function() {
                return (
                  (this.positionAbs = n.positionAbs),
                  (this.helperProportions = n.helperProportions),
                  (this.offset.click = n.offset.click),
                  this !== o &&
                    this._intersectsWith(this.containerCache) &&
                    t.contains(o.element[0], this.element[0]) &&
                    (s = !1),
                  s
                );
              })),
            s
              ? (o.isOver ||
                  ((o.isOver = 1),
                  (o.currentItem = i.helper
                    .appendTo(o.element)
                    .data('ui-sortable-item', !0)),
                  (o.options._helper = o.options.helper),
                  (o.options.helper = function() {
                    return i.helper[0];
                  }),
                  (e.target = o.currentItem[0]),
                  o._mouseCapture(e, !0),
                  o._mouseStart(e, !0, !0),
                  (o.offset.click.top = n.offset.click.top),
                  (o.offset.click.left = n.offset.click.left),
                  (o.offset.parent.left -=
                    n.offset.parent.left - o.offset.parent.left),
                  (o.offset.parent.top -=
                    n.offset.parent.top - o.offset.parent.top),
                  n._trigger('toSortable', e),
                  (n.dropped = o.element),
                  t.each(n.sortables, function() {
                    this.refreshPositions();
                  }),
                  (n.currentItem = n.element),
                  (o.fromOutside = n)),
                o.currentItem && (o._mouseDrag(e), (i.position = o.position)))
              : o.isOver &&
                ((o.isOver = 0),
                (o.cancelHelperRemoval = !0),
                (o.options._revert = o.options.revert),
                (o.options.revert = !1),
                o._trigger('out', e, o._uiHash(o)),
                o._mouseStop(e, !0),
                (o.options.revert = o.options._revert),
                (o.options.helper = o.options._helper),
                o.placeholder && o.placeholder.remove(),
                n._refreshOffsets(e),
                (i.position = n._generatePosition(e, !0)),
                n._trigger('fromSortable', e),
                (n.dropped = !1),
                t.each(n.sortables, function() {
                  this.refreshPositions();
                }));
        });
      }
    }),
    t.ui.plugin.add('draggable', 'cursor', {
      start: function(e, i, n) {
        var s = t('body'),
          o = n.options;
        s.css('cursor') && (o._cursor = s.css('cursor')),
          s.css('cursor', o.cursor);
      },
      stop: function(e, i, n) {
        var s = n.options;
        s._cursor && t('body').css('cursor', s._cursor);
      }
    }),
    t.ui.plugin.add('draggable', 'opacity', {
      start: function(e, i, n) {
        var s = t(i.helper),
          o = n.options;
        s.css('opacity') && (o._opacity = s.css('opacity')),
          s.css('opacity', o.opacity);
      },
      stop: function(e, i, n) {
        var s = n.options;
        s._opacity && t(i.helper).css('opacity', s._opacity);
      }
    }),
    t.ui.plugin.add('draggable', 'scroll', {
      start: function(t, e, i) {
        i.scrollParentNotHidden ||
          (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
          i.scrollParentNotHidden[0] !== i.document[0] &&
            'HTML' !== i.scrollParentNotHidden[0].tagName &&
            (i.overflowOffset = i.scrollParentNotHidden.offset());
      },
      drag: function(e, i, n) {
        var s = n.options,
          o = !1,
          r = n.scrollParentNotHidden[0],
          a = n.document[0];
        r !== a && 'HTML' !== r.tagName
          ? ((s.axis && 'x' === s.axis) ||
              (n.overflowOffset.top + r.offsetHeight - e.pageY <
              s.scrollSensitivity
                ? (r.scrollTop = o = r.scrollTop + s.scrollSpeed)
                : e.pageY - n.overflowOffset.top < s.scrollSensitivity &&
                  (r.scrollTop = o = r.scrollTop - s.scrollSpeed)),
            (s.axis && 'y' === s.axis) ||
              (n.overflowOffset.left + r.offsetWidth - e.pageX <
              s.scrollSensitivity
                ? (r.scrollLeft = o = r.scrollLeft + s.scrollSpeed)
                : e.pageX - n.overflowOffset.left < s.scrollSensitivity &&
                  (r.scrollLeft = o = r.scrollLeft - s.scrollSpeed)))
          : ((s.axis && 'x' === s.axis) ||
              (e.pageY - t(a).scrollTop() < s.scrollSensitivity
                ? (o = t(a).scrollTop(t(a).scrollTop() - s.scrollSpeed))
                : t(window).height() - (e.pageY - t(a).scrollTop()) <
                    s.scrollSensitivity &&
                  (o = t(a).scrollTop(t(a).scrollTop() + s.scrollSpeed))),
            (s.axis && 'y' === s.axis) ||
              (e.pageX - t(a).scrollLeft() < s.scrollSensitivity
                ? (o = t(a).scrollLeft(t(a).scrollLeft() - s.scrollSpeed))
                : t(window).width() - (e.pageX - t(a).scrollLeft()) <
                    s.scrollSensitivity &&
                  (o = t(a).scrollLeft(t(a).scrollLeft() + s.scrollSpeed)))),
          !1 !== o &&
            t.ui.ddmanager &&
            !s.dropBehaviour &&
            t.ui.ddmanager.prepareOffsets(n, e);
      }
    }),
    t.ui.plugin.add('draggable', 'snap', {
      start: function(e, i, n) {
        var s = n.options;
        (n.snapElements = []),
          t(
            s.snap.constructor !== String
              ? s.snap.items || ':data(ui-draggable)'
              : s.snap
          ).each(function() {
            var e = t(this),
              i = e.offset();
            this !== n.element[0] &&
              n.snapElements.push({
                item: this,
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: i.top,
                left: i.left
              });
          });
      },
      drag: function(e, i, n) {
        var s,
          o,
          r,
          a,
          h,
          l,
          c,
          u,
          p,
          d,
          f = n.options,
          m = f.snapTolerance,
          g = i.offset.left,
          v = g + n.helperProportions.width,
          y = i.offset.top,
          _ = y + n.helperProportions.height;
        for (p = n.snapElements.length - 1; p >= 0; p--)
          (l =
            (h = n.snapElements[p].left - n.margins.left) +
            n.snapElements[p].width),
            (u =
              (c = n.snapElements[p].top - n.margins.top) +
              n.snapElements[p].height),
            v < h - m ||
            g > l + m ||
            _ < c - m ||
            y > u + m ||
            !t.contains(
              n.snapElements[p].item.ownerDocument,
              n.snapElements[p].item
            )
              ? (n.snapElements[p].snapping &&
                  n.options.snap.release &&
                  n.options.snap.release.call(
                    n.element,
                    e,
                    t.extend(n._uiHash(), { snapItem: n.snapElements[p].item })
                  ),
                (n.snapElements[p].snapping = !1))
              : ('inner' !== f.snapMode &&
                  ((s = Math.abs(c - _) <= m),
                  (o = Math.abs(u - y) <= m),
                  (r = Math.abs(h - v) <= m),
                  (a = Math.abs(l - g) <= m),
                  s &&
                    (i.position.top = n._convertPositionTo('relative', {
                      top: c - n.helperProportions.height,
                      left: 0
                    }).top),
                  o &&
                    (i.position.top = n._convertPositionTo('relative', {
                      top: u,
                      left: 0
                    }).top),
                  r &&
                    (i.position.left = n._convertPositionTo('relative', {
                      top: 0,
                      left: h - n.helperProportions.width
                    }).left),
                  a &&
                    (i.position.left = n._convertPositionTo('relative', {
                      top: 0,
                      left: l
                    }).left)),
                (d = s || o || r || a),
                'outer' !== f.snapMode &&
                  ((s = Math.abs(c - y) <= m),
                  (o = Math.abs(u - _) <= m),
                  (r = Math.abs(h - g) <= m),
                  (a = Math.abs(l - v) <= m),
                  s &&
                    (i.position.top = n._convertPositionTo('relative', {
                      top: c,
                      left: 0
                    }).top),
                  o &&
                    (i.position.top = n._convertPositionTo('relative', {
                      top: u - n.helperProportions.height,
                      left: 0
                    }).top),
                  r &&
                    (i.position.left = n._convertPositionTo('relative', {
                      top: 0,
                      left: h
                    }).left),
                  a &&
                    (i.position.left = n._convertPositionTo('relative', {
                      top: 0,
                      left: l - n.helperProportions.width
                    }).left)),
                !n.snapElements[p].snapping &&
                  (s || o || r || a || d) &&
                  n.options.snap.snap &&
                  n.options.snap.snap.call(
                    n.element,
                    e,
                    t.extend(n._uiHash(), { snapItem: n.snapElements[p].item })
                  ),
                (n.snapElements[p].snapping = s || o || r || a || d));
      }
    }),
    t.ui.plugin.add('draggable', 'stack', {
      start: function(e, i, n) {
        var s,
          o = n.options,
          r = t.makeArray(t(o.stack)).sort(function(e, i) {
            return (
              (parseInt(t(e).css('zIndex'), 10) || 0) -
              (parseInt(t(i).css('zIndex'), 10) || 0)
            );
          });
        r.length &&
          ((s = parseInt(t(r[0]).css('zIndex'), 10) || 0),
          t(r).each(function(e) {
            t(this).css('zIndex', s + e);
          }),
          this.css('zIndex', s + r.length));
      }
    }),
    t.ui.plugin.add('draggable', 'zIndex', {
      start: function(e, i, n) {
        var s = t(i.helper),
          o = n.options;
        s.css('zIndex') && (o._zIndex = s.css('zIndex')),
          s.css('zIndex', o.zIndex);
      },
      stop: function(e, i, n) {
        var s = n.options;
        s._zIndex && t(i.helper).css('zIndex', s._zIndex);
      }
    });
  t.ui.draggable;
  /*!
   * jQuery UI Droppable 1.11.3
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/droppable/
   */ t.widget('ui.droppable', {
    version: '1.11.3',
    widgetEventPrefix: 'drop',
    options: {
      accept: '*',
      activeClass: !1,
      addClasses: !0,
      greedy: !1,
      hoverClass: !1,
      scope: 'default',
      tolerance: 'intersect',
      activate: null,
      deactivate: null,
      drop: null,
      out: null,
      over: null
    },
    _create: function() {
      var e,
        i = this.options,
        n = i.accept;
      (this.isover = !1),
        (this.isout = !0),
        (this.accept = t.isFunction(n)
          ? n
          : function(t) {
              return t.is(n);
            }),
        (this.proportions = function() {
          if (!arguments.length)
            return (
              e ||
              (e = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
              })
            );
          e = arguments[0];
        }),
        this._addToManager(i.scope),
        i.addClasses && this.element.addClass('ui-droppable');
    },
    _addToManager: function(e) {
      (t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || []),
        t.ui.ddmanager.droppables[e].push(this);
    },
    _splice: function(t) {
      for (var e = 0; e < t.length; e++) t[e] === this && t.splice(e, 1);
    },
    _destroy: function() {
      var e = t.ui.ddmanager.droppables[this.options.scope];
      this._splice(e),
        this.element.removeClass('ui-droppable ui-droppable-disabled');
    },
    _setOption: function(e, i) {
      if ('accept' === e)
        this.accept = t.isFunction(i)
          ? i
          : function(t) {
              return t.is(i);
            };
      else if ('scope' === e) {
        var n = t.ui.ddmanager.droppables[this.options.scope];
        this._splice(n), this._addToManager(i);
      }
      this._super(e, i);
    },
    _activate: function(e) {
      var i = t.ui.ddmanager.current;
      this.options.activeClass &&
        this.element.addClass(this.options.activeClass),
        i && this._trigger('activate', e, this.ui(i));
    },
    _deactivate: function(e) {
      var i = t.ui.ddmanager.current;
      this.options.activeClass &&
        this.element.removeClass(this.options.activeClass),
        i && this._trigger('deactivate', e, this.ui(i));
    },
    _over: function(e) {
      var i = t.ui.ddmanager.current;
      i &&
        (i.currentItem || i.element)[0] !== this.element[0] &&
        this.accept.call(this.element[0], i.currentItem || i.element) &&
        (this.options.hoverClass &&
          this.element.addClass(this.options.hoverClass),
        this._trigger('over', e, this.ui(i)));
    },
    _out: function(e) {
      var i = t.ui.ddmanager.current;
      i &&
        (i.currentItem || i.element)[0] !== this.element[0] &&
        this.accept.call(this.element[0], i.currentItem || i.element) &&
        (this.options.hoverClass &&
          this.element.removeClass(this.options.hoverClass),
        this._trigger('out', e, this.ui(i)));
    },
    _drop: function(e, i) {
      var n = i || t.ui.ddmanager.current,
        s = !1;
      return (
        !(!n || (n.currentItem || n.element)[0] === this.element[0]) &&
        (this.element
          .find(':data(ui-droppable)')
          .not('.ui-draggable-dragging')
          .each(function() {
            var i = t(this).droppable('instance');
            if (
              i.options.greedy &&
              !i.options.disabled &&
              i.options.scope === n.options.scope &&
              i.accept.call(i.element[0], n.currentItem || n.element) &&
              t.ui.intersect(
                n,
                t.extend(i, { offset: i.element.offset() }),
                i.options.tolerance,
                e
              )
            )
              return (s = !0), !1;
          }),
        !s &&
          !!this.accept.call(this.element[0], n.currentItem || n.element) &&
            (this.options.activeClass &&
              this.element.removeClass(this.options.activeClass),
            this.options.hoverClass &&
              this.element.removeClass(this.options.hoverClass),
            this._trigger('drop', e, this.ui(n)),
            this.element))
      );
    },
    ui: function(t) {
      return {
        draggable: t.currentItem || t.element,
        helper: t.helper,
        position: t.position,
        offset: t.positionAbs
      };
    }
  }),
    (t.ui.intersect = (function() {
      function t(t, e, i) {
        return t >= e && t < e + i;
      }
      return function(e, i, n, s) {
        if (!i.offset) return !1;
        var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
          r = (e.positionAbs || e.position.absolute).top + e.margins.top,
          a = o + e.helperProportions.width,
          h = r + e.helperProportions.height,
          l = i.offset.left,
          c = i.offset.top,
          u = l + i.proportions().width,
          p = c + i.proportions().height;
        switch (n) {
          case 'fit':
            return l <= o && a <= u && c <= r && h <= p;
          case 'intersect':
            return (
              l < o + e.helperProportions.width / 2 &&
              a - e.helperProportions.width / 2 < u &&
              c < r + e.helperProportions.height / 2 &&
              h - e.helperProportions.height / 2 < p
            );
          case 'pointer':
            return (
              t(s.pageY, c, i.proportions().height) &&
              t(s.pageX, l, i.proportions().width)
            );
          case 'touch':
            return (
              ((r >= c && r <= p) || (h >= c && h <= p) || (r < c && h > p)) &&
              ((o >= l && o <= u) || (a >= l && a <= u) || (o < l && a > u))
            );
          default:
            return !1;
        }
      };
    })()),
    (t.ui.ddmanager = {
      current: null,
      droppables: { default: [] },
      prepareOffsets: function(e, i) {
        var n,
          s,
          o = t.ui.ddmanager.droppables[e.options.scope] || [],
          r = i ? i.type : null,
          a = (e.currentItem || e.element)
            .find(':data(ui-droppable)')
            .addBack();
        t: for (n = 0; n < o.length; n++)
          if (
            !(
              o[n].options.disabled ||
              (e &&
                !o[n].accept.call(o[n].element[0], e.currentItem || e.element))
            )
          ) {
            for (s = 0; s < a.length; s++)
              if (a[s] === o[n].element[0]) {
                o[n].proportions().height = 0;
                continue t;
              }
            (o[n].visible = 'none' !== o[n].element.css('display')),
              o[n].visible &&
                ('mousedown' === r && o[n]._activate.call(o[n], i),
                (o[n].offset = o[n].element.offset()),
                o[n].proportions({
                  width: o[n].element[0].offsetWidth,
                  height: o[n].element[0].offsetHeight
                }));
          }
      },
      drop: function(e, i) {
        var n = !1;
        return (
          t.each(
            (t.ui.ddmanager.droppables[e.options.scope] || []).slice(),
            function() {
              this.options &&
                (!this.options.disabled &&
                  this.visible &&
                  t.ui.intersect(e, this, this.options.tolerance, i) &&
                  (n = this._drop.call(this, i) || n),
                !this.options.disabled &&
                  this.visible &&
                  this.accept.call(
                    this.element[0],
                    e.currentItem || e.element
                  ) &&
                  ((this.isout = !0),
                  (this.isover = !1),
                  this._deactivate.call(this, i)));
            }
          ),
          n
        );
      },
      dragStart: function(e, i) {
        e.element.parentsUntil('body').bind('scroll.droppable', function() {
          e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
        });
      },
      drag: function(e, i) {
        e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i),
          t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
            if (!this.options.disabled && !this.greedyChild && this.visible) {
              var n,
                s,
                o,
                r = t.ui.intersect(e, this, this.options.tolerance, i),
                a =
                  !r && this.isover
                    ? 'isout'
                    : r && !this.isover
                    ? 'isover'
                    : null;
              a &&
                (this.options.greedy &&
                  ((s = this.options.scope),
                  (o = this.element
                    .parents(':data(ui-droppable)')
                    .filter(function() {
                      return t(this).droppable('instance').options.scope === s;
                    })).length &&
                    ((n = t(o[0]).droppable('instance')).greedyChild =
                      'isover' === a)),
                n &&
                  'isover' === a &&
                  ((n.isover = !1), (n.isout = !0), n._out.call(n, i)),
                (this[a] = !0),
                (this['isout' === a ? 'isover' : 'isout'] = !1),
                this['isover' === a ? '_over' : '_out'].call(this, i),
                n &&
                  'isout' === a &&
                  ((n.isout = !1), (n.isover = !0), n._over.call(n, i)));
            }
          });
      },
      dragStop: function(e, i) {
        e.element.parentsUntil('body').unbind('scroll.droppable'),
          e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
      }
    });
  t.ui.droppable;
  /*!
   * jQuery UI Resizable 1.11.3
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/resizable/
   */ t.widget('ui.resizable', t.ui.mouse, {
    version: '1.11.3',
    widgetEventPrefix: 'resize',
    options: {
      alsoResize: !1,
      animate: !1,
      animateDuration: 'slow',
      animateEasing: 'swing',
      aspectRatio: !1,
      autoHide: !1,
      containment: !1,
      ghost: !1,
      grid: !1,
      handles: 'e,s,se',
      helper: !1,
      maxHeight: null,
      maxWidth: null,
      minHeight: 10,
      minWidth: 10,
      zIndex: 90,
      resize: null,
      start: null,
      stop: null
    },
    _num: function(t) {
      return parseInt(t, 10) || 0;
    },
    _isNumber: function(t) {
      return !isNaN(parseInt(t, 10));
    },
    _hasScroll: function(e, i) {
      if ('hidden' === t(e).css('overflow')) return !1;
      var n = i && 'left' === i ? 'scrollLeft' : 'scrollTop',
        s = !1;
      return e[n] > 0 || ((e[n] = 1), (s = e[n] > 0), (e[n] = 0), s);
    },
    _create: function() {
      var e,
        i,
        n,
        s,
        o = this,
        r = this.options;
      if (
        (this.element.addClass('ui-resizable'),
        t.extend(this, {
          _aspectRatio: !!r.aspectRatio,
          aspectRatio: r.aspectRatio,
          originalElement: this.element,
          _proportionallyResizeElements: [],
          _helper:
            r.helper || r.ghost || r.animate
              ? r.helper || 'ui-resizable-helper'
              : null
        }),
        this.element[0].nodeName.match(
          /^(canvas|textarea|input|select|button|img)$/i
        ) &&
          (this.element.wrap(
            t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
              position: this.element.css('position'),
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
              top: this.element.css('top'),
              left: this.element.css('left')
            })
          ),
          (this.element = this.element
            .parent()
            .data('ui-resizable', this.element.resizable('instance'))),
          (this.elementIsWrapper = !0),
          this.element.css({
            marginLeft: this.originalElement.css('marginLeft'),
            marginTop: this.originalElement.css('marginTop'),
            marginRight: this.originalElement.css('marginRight'),
            marginBottom: this.originalElement.css('marginBottom')
          }),
          this.originalElement.css({
            marginLeft: 0,
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0
          }),
          (this.originalResizeStyle = this.originalElement.css('resize')),
          this.originalElement.css('resize', 'none'),
          this._proportionallyResizeElements.push(
            this.originalElement.css({
              position: 'static',
              zoom: 1,
              display: 'block'
            })
          ),
          this.originalElement.css({
            margin: this.originalElement.css('margin')
          }),
          this._proportionallyResize()),
        (this.handles =
          r.handles ||
          (t('.ui-resizable-handle', this.element).length
            ? {
                n: '.ui-resizable-n',
                e: '.ui-resizable-e',
                s: '.ui-resizable-s',
                w: '.ui-resizable-w',
                se: '.ui-resizable-se',
                sw: '.ui-resizable-sw',
                ne: '.ui-resizable-ne',
                nw: '.ui-resizable-nw'
              }
            : 'e,s,se')),
        this.handles.constructor === String)
      )
        for (
          'all' === this.handles && (this.handles = 'n,e,s,w,se,sw,ne,nw'),
            e = this.handles.split(','),
            this.handles = {},
            i = 0;
          i < e.length;
          i++
        )
          (n = t.trim(e[i])),
            (s = t(
              "<div class='ui-resizable-handle " +
                ('ui-resizable-' + n) +
                "'></div>"
            )).css({ zIndex: r.zIndex }),
            'se' === n && s.addClass('ui-icon ui-icon-gripsmall-diagonal-se'),
            (this.handles[n] = '.ui-resizable-' + n),
            this.element.append(s);
      (this._renderAxis = function(e) {
        var i, n, s, o;
        for (i in ((e = e || this.element), this.handles))
          this.handles[i].constructor === String &&
            (this.handles[i] = this.element
              .children(this.handles[i])
              .first()
              .show()),
            this.elementIsWrapper &&
              this.originalElement[0].nodeName.match(
                /^(textarea|input|select|button)$/i
              ) &&
              ((n = t(this.handles[i], this.element)),
              (o = /sw|ne|nw|se|n|s/.test(i)
                ? n.outerHeight()
                : n.outerWidth()),
              (s = [
                'padding',
                /ne|nw|n/.test(i)
                  ? 'Top'
                  : /se|sw|s/.test(i)
                  ? 'Bottom'
                  : /^e$/.test(i)
                  ? 'Right'
                  : 'Left'
              ].join('')),
              e.css(s, o),
              this._proportionallyResize()),
            t(this.handles[i]).length;
      }),
        this._renderAxis(this.element),
        (this._handles = t(
          '.ui-resizable-handle',
          this.element
        ).disableSelection()),
        this._handles.mouseover(function() {
          o.resizing ||
            (this.className &&
              (s = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),
            (o.axis = s && s[1] ? s[1] : 'se'));
        }),
        r.autoHide &&
          (this._handles.hide(),
          t(this.element)
            .addClass('ui-resizable-autohide')
            .mouseenter(function() {
              r.disabled ||
                (t(this).removeClass('ui-resizable-autohide'),
                o._handles.show());
            })
            .mouseleave(function() {
              r.disabled ||
                o.resizing ||
                (t(this).addClass('ui-resizable-autohide'), o._handles.hide());
            })),
        this._mouseInit();
    },
    _destroy: function() {
      this._mouseDestroy();
      var e,
        i = function(e) {
          t(e)
            .removeClass(
              'ui-resizable ui-resizable-disabled ui-resizable-resizing'
            )
            .removeData('resizable')
            .removeData('ui-resizable')
            .unbind('.resizable')
            .find('.ui-resizable-handle')
            .remove();
        };
      return (
        this.elementIsWrapper &&
          (i(this.element),
          (e = this.element),
          this.originalElement
            .css({
              position: e.css('position'),
              width: e.outerWidth(),
              height: e.outerHeight(),
              top: e.css('top'),
              left: e.css('left')
            })
            .insertAfter(e),
          e.remove()),
        this.originalElement.css('resize', this.originalResizeStyle),
        i(this.originalElement),
        this
      );
    },
    _mouseCapture: function(e) {
      var i,
        n,
        s = !1;
      for (i in this.handles)
        ((n = t(this.handles[i])[0]) === e.target || t.contains(n, e.target)) &&
          (s = !0);
      return !this.options.disabled && s;
    },
    _mouseStart: function(e) {
      var i,
        n,
        s,
        o = this.options,
        r = this.element;
      return (
        (this.resizing = !0),
        this._renderProxy(),
        (i = this._num(this.helper.css('left'))),
        (n = this._num(this.helper.css('top'))),
        o.containment &&
          ((i += t(o.containment).scrollLeft() || 0),
          (n += t(o.containment).scrollTop() || 0)),
        (this.offset = this.helper.offset()),
        (this.position = { left: i, top: n }),
        (this.size = this._helper
          ? { width: this.helper.width(), height: this.helper.height() }
          : { width: r.width(), height: r.height() }),
        (this.originalSize = this._helper
          ? { width: r.outerWidth(), height: r.outerHeight() }
          : { width: r.width(), height: r.height() }),
        (this.sizeDiff = {
          width: r.outerWidth() - r.width(),
          height: r.outerHeight() - r.height()
        }),
        (this.originalPosition = { left: i, top: n }),
        (this.originalMousePosition = { left: e.pageX, top: e.pageY }),
        (this.aspectRatio =
          'number' == typeof o.aspectRatio
            ? o.aspectRatio
            : this.originalSize.width / this.originalSize.height || 1),
        (s = t('.ui-resizable-' + this.axis).css('cursor')),
        t('body').css('cursor', 'auto' === s ? this.axis + '-resize' : s),
        r.addClass('ui-resizable-resizing'),
        this._propagate('start', e),
        !0
      );
    },
    _mouseDrag: function(e) {
      var i,
        n,
        s = this.originalMousePosition,
        o = this.axis,
        r = e.pageX - s.left || 0,
        a = e.pageY - s.top || 0,
        h = this._change[o];
      return (
        this._updatePrevProperties(),
        !!h &&
          ((i = h.apply(this, [e, r, a])),
          this._updateVirtualBoundaries(e.shiftKey),
          (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)),
          (i = this._respectSize(i, e)),
          this._updateCache(i),
          this._propagate('resize', e),
          (n = this._applyChanges()),
          !this._helper &&
            this._proportionallyResizeElements.length &&
            this._proportionallyResize(),
          t.isEmptyObject(n) ||
            (this._updatePrevProperties(),
            this._trigger('resize', e, this.ui()),
            this._applyChanges()),
          !1)
      );
    },
    _mouseStop: function(e) {
      this.resizing = !1;
      var i,
        n,
        s,
        o,
        r,
        a,
        h,
        l = this.options,
        c = this;
      return (
        this._helper &&
          ((s =
            (n =
              (i = this._proportionallyResizeElements).length &&
              /textarea/i.test(i[0].nodeName)) && this._hasScroll(i[0], 'left')
              ? 0
              : c.sizeDiff.height),
          (o = n ? 0 : c.sizeDiff.width),
          (r = { width: c.helper.width() - o, height: c.helper.height() - s }),
          (a =
            parseInt(c.element.css('left'), 10) +
              (c.position.left - c.originalPosition.left) || null),
          (h =
            parseInt(c.element.css('top'), 10) +
              (c.position.top - c.originalPosition.top) || null),
          l.animate || this.element.css(t.extend(r, { top: h, left: a })),
          c.helper.height(c.size.height),
          c.helper.width(c.size.width),
          this._helper && !l.animate && this._proportionallyResize()),
        t('body').css('cursor', 'auto'),
        this.element.removeClass('ui-resizable-resizing'),
        this._propagate('stop', e),
        this._helper && this.helper.remove(),
        !1
      );
    },
    _updatePrevProperties: function() {
      (this.prevPosition = {
        top: this.position.top,
        left: this.position.left
      }),
        (this.prevSize = { width: this.size.width, height: this.size.height });
    },
    _applyChanges: function() {
      var t = {};
      return (
        this.position.top !== this.prevPosition.top &&
          (t.top = this.position.top + 'px'),
        this.position.left !== this.prevPosition.left &&
          (t.left = this.position.left + 'px'),
        this.size.width !== this.prevSize.width &&
          (t.width = this.size.width + 'px'),
        this.size.height !== this.prevSize.height &&
          (t.height = this.size.height + 'px'),
        this.helper.css(t),
        t
      );
    },
    _updateVirtualBoundaries: function(t) {
      var e,
        i,
        n,
        s,
        o,
        r = this.options;
      (o = {
        minWidth: this._isNumber(r.minWidth) ? r.minWidth : 0,
        maxWidth: this._isNumber(r.maxWidth) ? r.maxWidth : Infinity,
        minHeight: this._isNumber(r.minHeight) ? r.minHeight : 0,
        maxHeight: this._isNumber(r.maxHeight) ? r.maxHeight : Infinity
      }),
        (this._aspectRatio || t) &&
          ((e = o.minHeight * this.aspectRatio),
          (n = o.minWidth / this.aspectRatio),
          (i = o.maxHeight * this.aspectRatio),
          (s = o.maxWidth / this.aspectRatio),
          e > o.minWidth && (o.minWidth = e),
          n > o.minHeight && (o.minHeight = n),
          i < o.maxWidth && (o.maxWidth = i),
          s < o.maxHeight && (o.maxHeight = s)),
        (this._vBoundaries = o);
    },
    _updateCache: function(t) {
      (this.offset = this.helper.offset()),
        this._isNumber(t.left) && (this.position.left = t.left),
        this._isNumber(t.top) && (this.position.top = t.top),
        this._isNumber(t.height) && (this.size.height = t.height),
        this._isNumber(t.width) && (this.size.width = t.width);
    },
    _updateRatio: function(t) {
      var e = this.position,
        i = this.size,
        n = this.axis;
      return (
        this._isNumber(t.height)
          ? (t.width = t.height * this.aspectRatio)
          : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio),
        'sw' === n && ((t.left = e.left + (i.width - t.width)), (t.top = null)),
        'nw' === n &&
          ((t.top = e.top + (i.height - t.height)),
          (t.left = e.left + (i.width - t.width))),
        t
      );
    },
    _respectSize: function(t) {
      var e = this._vBoundaries,
        i = this.axis,
        n = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
        s = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
        o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
        r = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
        a = this.originalPosition.left + this.originalSize.width,
        h = this.position.top + this.size.height,
        l = /sw|nw|w/.test(i),
        c = /nw|ne|n/.test(i);
      return (
        o && (t.width = e.minWidth),
        r && (t.height = e.minHeight),
        n && (t.width = e.maxWidth),
        s && (t.height = e.maxHeight),
        o && l && (t.left = a - e.minWidth),
        n && l && (t.left = a - e.maxWidth),
        r && c && (t.top = h - e.minHeight),
        s && c && (t.top = h - e.maxHeight),
        t.width || t.height || t.left || !t.top
          ? t.width || t.height || t.top || !t.left || (t.left = null)
          : (t.top = null),
        t
      );
    },
    _getPaddingPlusBorderDimensions: function(t) {
      for (
        var e = 0,
          i = [],
          n = [
            t.css('borderTopWidth'),
            t.css('borderRightWidth'),
            t.css('borderBottomWidth'),
            t.css('borderLeftWidth')
          ],
          s = [
            t.css('paddingTop'),
            t.css('paddingRight'),
            t.css('paddingBottom'),
            t.css('paddingLeft')
          ];
        e < 4;
        e++
      )
        (i[e] = parseInt(n[e], 10) || 0), (i[e] += parseInt(s[e], 10) || 0);
      return { height: i[0] + i[2], width: i[1] + i[3] };
    },
    _proportionallyResize: function() {
      if (this._proportionallyResizeElements.length)
        for (
          var t, e = 0, i = this.helper || this.element;
          e < this._proportionallyResizeElements.length;
          e++
        )
          (t = this._proportionallyResizeElements[e]),
            this.outerDimensions ||
              (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)),
            t.css({
              height: i.height() - this.outerDimensions.height || 0,
              width: i.width() - this.outerDimensions.width || 0
            });
    },
    _renderProxy: function() {
      var e = this.element,
        i = this.options;
      (this.elementOffset = e.offset()),
        this._helper
          ? ((this.helper =
              this.helper || t("<div style='overflow:hidden;'></div>")),
            this.helper
              .addClass(this._helper)
              .css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: 'absolute',
                left: this.elementOffset.left + 'px',
                top: this.elementOffset.top + 'px',
                zIndex: ++i.zIndex
              }),
            this.helper.appendTo('body').disableSelection())
          : (this.helper = this.element);
    },
    _change: {
      e: function(t, e) {
        return { width: this.originalSize.width + e };
      },
      w: function(t, e) {
        var i = this.originalSize;
        return { left: this.originalPosition.left + e, width: i.width - e };
      },
      n: function(t, e, i) {
        var n = this.originalSize;
        return { top: this.originalPosition.top + i, height: n.height - i };
      },
      s: function(t, e, i) {
        return { height: this.originalSize.height + i };
      },
      se: function(e, i, n) {
        return t.extend(
          this._change.s.apply(this, arguments),
          this._change.e.apply(this, [e, i, n])
        );
      },
      sw: function(e, i, n) {
        return t.extend(
          this._change.s.apply(this, arguments),
          this._change.w.apply(this, [e, i, n])
        );
      },
      ne: function(e, i, n) {
        return t.extend(
          this._change.n.apply(this, arguments),
          this._change.e.apply(this, [e, i, n])
        );
      },
      nw: function(e, i, n) {
        return t.extend(
          this._change.n.apply(this, arguments),
          this._change.w.apply(this, [e, i, n])
        );
      }
    },
    _propagate: function(e, i) {
      t.ui.plugin.call(this, e, [i, this.ui()]),
        'resize' !== e && this._trigger(e, i, this.ui());
    },
    plugins: {},
    ui: function() {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition
      };
    }
  }),
    t.ui.plugin.add('resizable', 'animate', {
      stop: function(e) {
        var i = t(this).resizable('instance'),
          n = i.options,
          s = i._proportionallyResizeElements,
          o = s.length && /textarea/i.test(s[0].nodeName),
          r = o && i._hasScroll(s[0], 'left') ? 0 : i.sizeDiff.height,
          a = o ? 0 : i.sizeDiff.width,
          h = { width: i.size.width - a, height: i.size.height - r },
          l =
            parseInt(i.element.css('left'), 10) +
              (i.position.left - i.originalPosition.left) || null,
          c =
            parseInt(i.element.css('top'), 10) +
              (i.position.top - i.originalPosition.top) || null;
        i.element.animate(t.extend(h, c && l ? { top: c, left: l } : {}), {
          duration: n.animateDuration,
          easing: n.animateEasing,
          step: function() {
            var n = {
              width: parseInt(i.element.css('width'), 10),
              height: parseInt(i.element.css('height'), 10),
              top: parseInt(i.element.css('top'), 10),
              left: parseInt(i.element.css('left'), 10)
            };
            s && s.length && t(s[0]).css({ width: n.width, height: n.height }),
              i._updateCache(n),
              i._propagate('resize', e);
          }
        });
      }
    }),
    t.ui.plugin.add('resizable', 'containment', {
      start: function() {
        var e,
          i,
          n,
          s,
          o,
          r,
          a,
          h = t(this).resizable('instance'),
          l = h.options,
          c = h.element,
          u = l.containment,
          p =
            u instanceof t
              ? u.get(0)
              : /parent/.test(u)
              ? c.parent().get(0)
              : u;
        p &&
          ((h.containerElement = t(p)),
          /document/.test(u) || u === document
            ? ((h.containerOffset = { left: 0, top: 0 }),
              (h.containerPosition = { left: 0, top: 0 }),
              (h.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height:
                  t(document).height() || document.body.parentNode.scrollHeight
              }))
            : ((e = t(p)),
              (i = []),
              t(['Top', 'Right', 'Left', 'Bottom']).each(function(t, n) {
                i[t] = h._num(e.css('padding' + n));
              }),
              (h.containerOffset = e.offset()),
              (h.containerPosition = e.position()),
              (h.containerSize = {
                height: e.innerHeight() - i[3],
                width: e.innerWidth() - i[1]
              }),
              (n = h.containerOffset),
              (s = h.containerSize.height),
              (o = h.containerSize.width),
              (r = h._hasScroll(p, 'left') ? p.scrollWidth : o),
              (a = h._hasScroll(p) ? p.scrollHeight : s),
              (h.parentData = {
                element: p,
                left: n.left,
                top: n.top,
                width: r,
                height: a
              })));
      },
      resize: function(e) {
        var i,
          n,
          s,
          o,
          r = t(this).resizable('instance'),
          a = r.options,
          h = r.containerOffset,
          l = r.position,
          c = r._aspectRatio || e.shiftKey,
          u = { top: 0, left: 0 },
          p = r.containerElement,
          d = !0;
        p[0] !== document && /static/.test(p.css('position')) && (u = h),
          l.left < (r._helper ? h.left : 0) &&
            ((r.size.width =
              r.size.width +
              (r._helper
                ? r.position.left - h.left
                : r.position.left - u.left)),
            c && ((r.size.height = r.size.width / r.aspectRatio), (d = !1)),
            (r.position.left = a.helper ? h.left : 0)),
          l.top < (r._helper ? h.top : 0) &&
            ((r.size.height =
              r.size.height +
              (r._helper ? r.position.top - h.top : r.position.top)),
            c && ((r.size.width = r.size.height * r.aspectRatio), (d = !1)),
            (r.position.top = r._helper ? h.top : 0)),
          (s = r.containerElement.get(0) === r.element.parent().get(0)),
          (o = /relative|absolute/.test(r.containerElement.css('position'))),
          s && o
            ? ((r.offset.left = r.parentData.left + r.position.left),
              (r.offset.top = r.parentData.top + r.position.top))
            : ((r.offset.left = r.element.offset().left),
              (r.offset.top = r.element.offset().top)),
          (i = Math.abs(
            r.sizeDiff.width +
              (r._helper ? r.offset.left - u.left : r.offset.left - h.left)
          )),
          (n = Math.abs(
            r.sizeDiff.height +
              (r._helper ? r.offset.top - u.top : r.offset.top - h.top)
          )),
          i + r.size.width >= r.parentData.width &&
            ((r.size.width = r.parentData.width - i),
            c && ((r.size.height = r.size.width / r.aspectRatio), (d = !1))),
          n + r.size.height >= r.parentData.height &&
            ((r.size.height = r.parentData.height - n),
            c && ((r.size.width = r.size.height * r.aspectRatio), (d = !1))),
          d ||
            ((r.position.left = r.prevPosition.left),
            (r.position.top = r.prevPosition.top),
            (r.size.width = r.prevSize.width),
            (r.size.height = r.prevSize.height));
      },
      stop: function() {
        var e = t(this).resizable('instance'),
          i = e.options,
          n = e.containerOffset,
          s = e.containerPosition,
          o = e.containerElement,
          r = t(e.helper),
          a = r.offset(),
          h = r.outerWidth() - e.sizeDiff.width,
          l = r.outerHeight() - e.sizeDiff.height;
        e._helper &&
          !i.animate &&
          /relative/.test(o.css('position')) &&
          t(this).css({ left: a.left - s.left - n.left, width: h, height: l }),
          e._helper &&
            !i.animate &&
            /static/.test(o.css('position')) &&
            t(this).css({
              left: a.left - s.left - n.left,
              width: h,
              height: l
            });
      }
    }),
    t.ui.plugin.add('resizable', 'alsoResize', {
      start: function() {
        var e = t(this).resizable('instance').options,
          i = function(e) {
            t(e).each(function() {
              var e = t(this);
              e.data('ui-resizable-alsoresize', {
                width: parseInt(e.width(), 10),
                height: parseInt(e.height(), 10),
                left: parseInt(e.css('left'), 10),
                top: parseInt(e.css('top'), 10)
              });
            });
          };
        'object' != typeof e.alsoResize || e.alsoResize.parentNode
          ? i(e.alsoResize)
          : e.alsoResize.length
          ? ((e.alsoResize = e.alsoResize[0]), i(e.alsoResize))
          : t.each(e.alsoResize, function(t) {
              i(t);
            });
      },
      resize: function(e, i) {
        var n = t(this).resizable('instance'),
          s = n.options,
          o = n.originalSize,
          r = n.originalPosition,
          a = {
            height: n.size.height - o.height || 0,
            width: n.size.width - o.width || 0,
            top: n.position.top - r.top || 0,
            left: n.position.left - r.left || 0
          },
          h = function(e, n) {
            t(e).each(function() {
              var e = t(this),
                s = t(this).data('ui-resizable-alsoresize'),
                o = {},
                r =
                  n && n.length
                    ? n
                    : e.parents(i.originalElement[0]).length
                    ? ['width', 'height']
                    : ['width', 'height', 'top', 'left'];
              t.each(r, function(t, e) {
                var i = (s[e] || 0) + (a[e] || 0);
                i && i >= 0 && (o[e] = i || null);
              }),
                e.css(o);
            });
          };
        'object' != typeof s.alsoResize || s.alsoResize.nodeType
          ? h(s.alsoResize)
          : t.each(s.alsoResize, function(t, e) {
              h(t, e);
            });
      },
      stop: function() {
        t(this).removeData('resizable-alsoresize');
      }
    }),
    t.ui.plugin.add('resizable', 'ghost', {
      start: function() {
        var e = t(this).resizable('instance'),
          i = e.options,
          n = e.size;
        (e.ghost = e.originalElement.clone()),
          e.ghost
            .css({
              opacity: 0.25,
              display: 'block',
              position: 'relative',
              height: n.height,
              width: n.width,
              margin: 0,
              left: 0,
              top: 0
            })
            .addClass('ui-resizable-ghost')
            .addClass('string' == typeof i.ghost ? i.ghost : ''),
          e.ghost.appendTo(e.helper);
      },
      resize: function() {
        var e = t(this).resizable('instance');
        e.ghost &&
          e.ghost.css({
            position: 'relative',
            height: e.size.height,
            width: e.size.width
          });
      },
      stop: function() {
        var e = t(this).resizable('instance');
        e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0));
      }
    }),
    t.ui.plugin.add('resizable', 'grid', {
      resize: function() {
        var e,
          i = t(this).resizable('instance'),
          n = i.options,
          s = i.size,
          o = i.originalSize,
          r = i.originalPosition,
          a = i.axis,
          h = 'number' == typeof n.grid ? [n.grid, n.grid] : n.grid,
          l = h[0] || 1,
          c = h[1] || 1,
          u = Math.round((s.width - o.width) / l) * l,
          p = Math.round((s.height - o.height) / c) * c,
          d = o.width + u,
          f = o.height + p,
          m = n.maxWidth && n.maxWidth < d,
          g = n.maxHeight && n.maxHeight < f,
          v = n.minWidth && n.minWidth > d,
          y = n.minHeight && n.minHeight > f;
        (n.grid = h),
          v && (d += l),
          y && (f += c),
          m && (d -= l),
          g && (f -= c),
          /^(se|s|e)$/.test(a)
            ? ((i.size.width = d), (i.size.height = f))
            : /^(ne)$/.test(a)
            ? ((i.size.width = d),
              (i.size.height = f),
              (i.position.top = r.top - p))
            : /^(sw)$/.test(a)
            ? ((i.size.width = d),
              (i.size.height = f),
              (i.position.left = r.left - u))
            : ((f - c <= 0 || d - l <= 0) &&
                (e = i._getPaddingPlusBorderDimensions(this)),
              f - c > 0
                ? ((i.size.height = f), (i.position.top = r.top - p))
                : ((f = c - e.height),
                  (i.size.height = f),
                  (i.position.top = r.top + o.height - f)),
              d - l > 0
                ? ((i.size.width = d), (i.position.left = r.left - u))
                : ((d = l - e.width),
                  (i.size.width = d),
                  (i.position.left = r.left + o.width - d)));
      }
    });
  t.ui.resizable,
    t.widget('ui.sortable', t.ui.mouse, {
      version: '1.11.3',
      widgetEventPrefix: 'sort',
      ready: !1,
      options: {
        appendTo: 'parent',
        axis: !1,
        connectWith: !1,
        containment: !1,
        cursor: 'auto',
        cursorAt: !1,
        dropOnEmpty: !0,
        forcePlaceholderSize: !1,
        forceHelperSize: !1,
        grid: !1,
        handle: !1,
        helper: 'original',
        items: '> *',
        opacity: !1,
        placeholder: !1,
        revert: !1,
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        scope: 'default',
        tolerance: 'intersect',
        zIndex: 1e3,
        activate: null,
        beforeStop: null,
        change: null,
        deactivate: null,
        out: null,
        over: null,
        receive: null,
        remove: null,
        sort: null,
        start: null,
        stop: null,
        update: null
      },
      _isOverAxis: function(t, e, i) {
        return t >= e && t < e + i;
      },
      _isFloating: function(t) {
        return (
          /left|right/.test(t.css('float')) ||
          /inline|table-cell/.test(t.css('display'))
        );
      },
      _create: function() {
        var t = this.options;
        (this.containerCache = {}),
          this.element.addClass('ui-sortable'),
          this.refresh(),
          (this.floating =
            !!this.items.length &&
            ('x' === t.axis || this._isFloating(this.items[0].item))),
          (this.offset = this.element.offset()),
          this._mouseInit(),
          this._setHandleClassName(),
          (this.ready = !0);
      },
      _setOption: function(t, e) {
        this._super(t, e), 'handle' === t && this._setHandleClassName();
      },
      _setHandleClassName: function() {
        this.element
          .find('.ui-sortable-handle')
          .removeClass('ui-sortable-handle'),
          t.each(this.items, function() {
            (this.instance.options.handle
              ? this.item.find(this.instance.options.handle)
              : this.item
            ).addClass('ui-sortable-handle');
          });
      },
      _destroy: function() {
        this.element
          .removeClass('ui-sortable ui-sortable-disabled')
          .find('.ui-sortable-handle')
          .removeClass('ui-sortable-handle'),
          this._mouseDestroy();
        for (var t = this.items.length - 1; t >= 0; t--)
          this.items[t].item.removeData(this.widgetName + '-item');
        return this;
      },
      _mouseCapture: function(e, i) {
        var n = null,
          s = !1,
          o = this;
        return (
          !this.reverting &&
          !this.options.disabled &&
            'static' !== this.options.type &&
            (this._refreshItems(e),
            t(e.target)
              .parents()
              .each(function() {
                if (t.data(this, o.widgetName + '-item') === o)
                  return (n = t(this)), !1;
              }),
            t.data(e.target, o.widgetName + '-item') === o && (n = t(e.target)),
            !!n &&
              !(
                this.options.handle &&
                !i &&
                (t(this.options.handle, n)
                  .find('*')
                  .addBack()
                  .each(function() {
                    this === e.target && (s = !0);
                  }),
                !s)
              ) &&
                ((this.currentItem = n), this._removeCurrentsFromItems(), !0))
        );
      },
      _mouseStart: function(e, i, n) {
        var s,
          o,
          r = this.options;
        if (
          ((this.currentContainer = this),
          this.refreshPositions(),
          (this.helper = this._createHelper(e)),
          this._cacheHelperProportions(),
          this._cacheMargins(),
          (this.scrollParent = this.helper.scrollParent()),
          (this.offset = this.currentItem.offset()),
          (this.offset = {
            top: this.offset.top - this.margins.top,
            left: this.offset.left - this.margins.left
          }),
          t.extend(this.offset, {
            click: {
              left: e.pageX - this.offset.left,
              top: e.pageY - this.offset.top
            },
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset()
          }),
          this.helper.css('position', 'absolute'),
          (this.cssPosition = this.helper.css('position')),
          (this.originalPosition = this._generatePosition(e)),
          (this.originalPageX = e.pageX),
          (this.originalPageY = e.pageY),
          r.cursorAt && this._adjustOffsetFromHelper(r.cursorAt),
          (this.domPosition = {
            prev: this.currentItem.prev()[0],
            parent: this.currentItem.parent()[0]
          }),
          this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
          this._createPlaceholder(),
          r.containment && this._setContainment(),
          r.cursor &&
            'auto' !== r.cursor &&
            ((o = this.document.find('body')),
            (this.storedCursor = o.css('cursor')),
            o.css('cursor', r.cursor),
            (this.storedStylesheet = t(
              '<style>*{ cursor: ' + r.cursor + ' !important; }</style>'
            ).appendTo(o))),
          r.opacity &&
            (this.helper.css('opacity') &&
              (this._storedOpacity = this.helper.css('opacity')),
            this.helper.css('opacity', r.opacity)),
          r.zIndex &&
            (this.helper.css('zIndex') &&
              (this._storedZIndex = this.helper.css('zIndex')),
            this.helper.css('zIndex', r.zIndex)),
          this.scrollParent[0] !== this.document[0] &&
            'HTML' !== this.scrollParent[0].tagName &&
            (this.overflowOffset = this.scrollParent.offset()),
          this._trigger('start', e, this._uiHash()),
          this._preserveHelperProportions || this._cacheHelperProportions(),
          !n)
        )
          for (s = this.containers.length - 1; s >= 0; s--)
            this.containers[s]._trigger('activate', e, this._uiHash(this));
        return (
          t.ui.ddmanager && (t.ui.ddmanager.current = this),
          t.ui.ddmanager &&
            !r.dropBehaviour &&
            t.ui.ddmanager.prepareOffsets(this, e),
          (this.dragging = !0),
          this.helper.addClass('ui-sortable-helper'),
          this._mouseDrag(e),
          !0
        );
      },
      _mouseDrag: function(e) {
        var i,
          n,
          s,
          o,
          r = this.options,
          a = !1;
        for (
          this.position = this._generatePosition(e),
            this.positionAbs = this._convertPositionTo('absolute'),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll &&
              (this.scrollParent[0] !== this.document[0] &&
              'HTML' !== this.scrollParent[0].tagName
                ? (this.overflowOffset.top +
                    this.scrollParent[0].offsetHeight -
                    e.pageY <
                  r.scrollSensitivity
                    ? (this.scrollParent[0].scrollTop = a =
                        this.scrollParent[0].scrollTop + r.scrollSpeed)
                    : e.pageY - this.overflowOffset.top < r.scrollSensitivity &&
                      (this.scrollParent[0].scrollTop = a =
                        this.scrollParent[0].scrollTop - r.scrollSpeed),
                  this.overflowOffset.left +
                    this.scrollParent[0].offsetWidth -
                    e.pageX <
                  r.scrollSensitivity
                    ? (this.scrollParent[0].scrollLeft = a =
                        this.scrollParent[0].scrollLeft + r.scrollSpeed)
                    : e.pageX - this.overflowOffset.left <
                        r.scrollSensitivity &&
                      (this.scrollParent[0].scrollLeft = a =
                        this.scrollParent[0].scrollLeft - r.scrollSpeed))
                : (e.pageY - this.document.scrollTop() < r.scrollSensitivity
                    ? (a = this.document.scrollTop(
                        this.document.scrollTop() - r.scrollSpeed
                      ))
                    : this.window.height() -
                        (e.pageY - this.document.scrollTop()) <
                        r.scrollSensitivity &&
                      (a = this.document.scrollTop(
                        this.document.scrollTop() + r.scrollSpeed
                      )),
                  e.pageX - this.document.scrollLeft() < r.scrollSensitivity
                    ? (a = this.document.scrollLeft(
                        this.document.scrollLeft() - r.scrollSpeed
                      ))
                    : this.window.width() -
                        (e.pageX - this.document.scrollLeft()) <
                        r.scrollSensitivity &&
                      (a = this.document.scrollLeft(
                        this.document.scrollLeft() + r.scrollSpeed
                      ))),
              !1 !== a &&
                t.ui.ddmanager &&
                !r.dropBehaviour &&
                t.ui.ddmanager.prepareOffsets(this, e)),
            this.positionAbs = this._convertPositionTo('absolute'),
            (this.options.axis && 'y' === this.options.axis) ||
              (this.helper[0].style.left = this.position.left + 'px'),
            (this.options.axis && 'x' === this.options.axis) ||
              (this.helper[0].style.top = this.position.top + 'px'),
            i = this.items.length - 1;
          i >= 0;
          i--
        )
          if (
            ((s = (n = this.items[i]).item[0]),
            (o = this._intersectsWithPointer(n)) &&
              n.instance === this.currentContainer &&
              !(
                s === this.currentItem[0] ||
                this.placeholder[1 === o ? 'next' : 'prev']()[0] === s ||
                t.contains(this.placeholder[0], s) ||
                ('semi-dynamic' === this.options.type &&
                  t.contains(this.element[0], s))
              ))
          ) {
            if (
              ((this.direction = 1 === o ? 'down' : 'up'),
              'pointer' !== this.options.tolerance &&
                !this._intersectsWithSides(n))
            )
              break;
            this._rearrange(e, n), this._trigger('change', e, this._uiHash());
            break;
          }
        return (
          this._contactContainers(e),
          t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
          this._trigger('sort', e, this._uiHash()),
          (this.lastPositionAbs = this.positionAbs),
          !1
        );
      },
      _mouseStop: function(e, i) {
        if (e) {
          if (
            (t.ui.ddmanager &&
              !this.options.dropBehaviour &&
              t.ui.ddmanager.drop(this, e),
            this.options.revert)
          ) {
            var n = this,
              s = this.placeholder.offset(),
              o = this.options.axis,
              r = {};
            (o && 'x' !== o) ||
              (r.left =
                s.left -
                this.offset.parent.left -
                this.margins.left +
                (this.offsetParent[0] === this.document[0].body
                  ? 0
                  : this.offsetParent[0].scrollLeft)),
              (o && 'y' !== o) ||
                (r.top =
                  s.top -
                  this.offset.parent.top -
                  this.margins.top +
                  (this.offsetParent[0] === this.document[0].body
                    ? 0
                    : this.offsetParent[0].scrollTop)),
              (this.reverting = !0),
              t(this.helper).animate(
                r,
                parseInt(this.options.revert, 10) || 500,
                function() {
                  n._clear(e);
                }
              );
          } else this._clear(e, i);
          return !1;
        }
      },
      cancel: function() {
        if (this.dragging) {
          this._mouseUp({ target: null }),
            'original' === this.options.helper
              ? this.currentItem
                  .css(this._storedCSS)
                  .removeClass('ui-sortable-helper')
              : this.currentItem.show();
          for (var e = this.containers.length - 1; e >= 0; e--)
            this.containers[e]._trigger('deactivate', null, this._uiHash(this)),
              this.containers[e].containerCache.over &&
                (this.containers[e]._trigger('out', null, this._uiHash(this)),
                (this.containers[e].containerCache.over = 0));
        }
        return (
          this.placeholder &&
            (this.placeholder[0].parentNode &&
              this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            'original' !== this.options.helper &&
              this.helper &&
              this.helper[0].parentNode &&
              this.helper.remove(),
            t.extend(this, {
              helper: null,
              dragging: !1,
              reverting: !1,
              _noFinalSort: null
            }),
            this.domPosition.prev
              ? t(this.domPosition.prev).after(this.currentItem)
              : t(this.domPosition.parent).prepend(this.currentItem)),
          this
        );
      },
      serialize: function(e) {
        var i = this._getItemsAsjQuery(e && e.connected),
          n = [];
        return (
          (e = e || {}),
          t(i).each(function() {
            var i = (t(e.item || this).attr(e.attribute || 'id') || '').match(
              e.expression || /(.+)[\-=_](.+)/
            );
            i &&
              n.push(
                (e.key || i[1] + '[]') +
                  '=' +
                  (e.key && e.expression ? i[1] : i[2])
              );
          }),
          !n.length && e.key && n.push(e.key + '='),
          n.join('&')
        );
      },
      toArray: function(e) {
        var i = this._getItemsAsjQuery(e && e.connected),
          n = [];
        return (
          (e = e || {}),
          i.each(function() {
            n.push(t(e.item || this).attr(e.attribute || 'id') || '');
          }),
          n
        );
      },
      _intersectsWith: function(t) {
        var e = this.positionAbs.left,
          i = e + this.helperProportions.width,
          n = this.positionAbs.top,
          s = n + this.helperProportions.height,
          o = t.left,
          r = o + t.width,
          a = t.top,
          h = a + t.height,
          l = this.offset.click.top,
          c = this.offset.click.left,
          u = 'x' === this.options.axis || (n + l > a && n + l < h),
          p = 'y' === this.options.axis || (e + c > o && e + c < r),
          d = u && p;
        return 'pointer' === this.options.tolerance ||
          this.options.forcePointerForContainers ||
          ('pointer' !== this.options.tolerance &&
            this.helperProportions[this.floating ? 'width' : 'height'] >
              t[this.floating ? 'width' : 'height'])
          ? d
          : o < e + this.helperProportions.width / 2 &&
              i - this.helperProportions.width / 2 < r &&
              a < n + this.helperProportions.height / 2 &&
              s - this.helperProportions.height / 2 < h;
      },
      _intersectsWithPointer: function(t) {
        var e =
            'x' === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.top + this.offset.click.top,
              t.top,
              t.height
            ),
          i =
            'y' === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.left + this.offset.click.left,
              t.left,
              t.width
            ),
          n = e && i,
          s = this._getDragVerticalDirection(),
          o = this._getDragHorizontalDirection();
        return (
          !!n &&
          (this.floating
            ? (o && 'right' === o) || 'down' === s
              ? 2
              : 1
            : s && ('down' === s ? 2 : 1))
        );
      },
      _intersectsWithSides: function(t) {
        var e = this._isOverAxis(
            this.positionAbs.top + this.offset.click.top,
            t.top + t.height / 2,
            t.height
          ),
          i = this._isOverAxis(
            this.positionAbs.left + this.offset.click.left,
            t.left + t.width / 2,
            t.width
          ),
          n = this._getDragVerticalDirection(),
          s = this._getDragHorizontalDirection();
        return this.floating && s
          ? ('right' === s && i) || ('left' === s && !i)
          : n && (('down' === n && e) || ('up' === n && !e));
      },
      _getDragVerticalDirection: function() {
        var t = this.positionAbs.top - this.lastPositionAbs.top;
        return 0 !== t && (t > 0 ? 'down' : 'up');
      },
      _getDragHorizontalDirection: function() {
        var t = this.positionAbs.left - this.lastPositionAbs.left;
        return 0 !== t && (t > 0 ? 'right' : 'left');
      },
      refresh: function(t) {
        return (
          this._refreshItems(t),
          this._setHandleClassName(),
          this.refreshPositions(),
          this
        );
      },
      _connectWith: function() {
        var t = this.options;
        return t.connectWith.constructor === String
          ? [t.connectWith]
          : t.connectWith;
      },
      _getItemsAsjQuery: function(e) {
        function i() {
          a.push(this);
        }
        var n,
          s,
          o,
          r,
          a = [],
          h = [],
          l = this._connectWith();
        if (l && e)
          for (n = l.length - 1; n >= 0; n--)
            for (s = (o = t(l[n], this.document[0])).length - 1; s >= 0; s--)
              (r = t.data(o[s], this.widgetFullName)) &&
                r !== this &&
                !r.options.disabled &&
                h.push([
                  t.isFunction(r.options.items)
                    ? r.options.items.call(r.element)
                    : t(r.options.items, r.element)
                        .not('.ui-sortable-helper')
                        .not('.ui-sortable-placeholder'),
                  r
                ]);
        for (
          h.push([
            t.isFunction(this.options.items)
              ? this.options.items.call(this.element, null, {
                  options: this.options,
                  item: this.currentItem
                })
              : t(this.options.items, this.element)
                  .not('.ui-sortable-helper')
                  .not('.ui-sortable-placeholder'),
            this
          ]),
            n = h.length - 1;
          n >= 0;
          n--
        )
          h[n][0].each(i);
        return t(a);
      },
      _removeCurrentsFromItems: function() {
        var e = this.currentItem.find(':data(' + this.widgetName + '-item)');
        this.items = t.grep(this.items, function(t) {
          for (var i = 0; i < e.length; i++) if (e[i] === t.item[0]) return !1;
          return !0;
        });
      },
      _refreshItems: function(e) {
        (this.items = []), (this.containers = [this]);
        var i,
          n,
          s,
          o,
          r,
          a,
          h,
          l,
          c = this.items,
          u = [
            [
              t.isFunction(this.options.items)
                ? this.options.items.call(this.element[0], e, {
                    item: this.currentItem
                  })
                : t(this.options.items, this.element),
              this
            ]
          ],
          p = this._connectWith();
        if (p && this.ready)
          for (i = p.length - 1; i >= 0; i--)
            for (n = (s = t(p[i], this.document[0])).length - 1; n >= 0; n--)
              (o = t.data(s[n], this.widgetFullName)) &&
                o !== this &&
                !o.options.disabled &&
                (u.push([
                  t.isFunction(o.options.items)
                    ? o.options.items.call(o.element[0], e, {
                        item: this.currentItem
                      })
                    : t(o.options.items, o.element),
                  o
                ]),
                this.containers.push(o));
        for (i = u.length - 1; i >= 0; i--)
          for (r = u[i][1], n = 0, l = (a = u[i][0]).length; n < l; n++)
            (h = t(a[n])).data(this.widgetName + '-item', r),
              c.push({
                item: h,
                instance: r,
                width: 0,
                height: 0,
                left: 0,
                top: 0
              });
      },
      refreshPositions: function(e) {
        var i, n, s, o;
        for (
          this.offsetParent &&
            this.helper &&
            (this.offset.parent = this._getParentOffset()),
            i = this.items.length - 1;
          i >= 0;
          i--
        )
          ((n = this.items[i]).instance !== this.currentContainer &&
            this.currentContainer &&
            n.item[0] !== this.currentItem[0]) ||
            ((s = this.options.toleranceElement
              ? t(this.options.toleranceElement, n.item)
              : n.item),
            e || ((n.width = s.outerWidth()), (n.height = s.outerHeight())),
            (o = s.offset()),
            (n.left = o.left),
            (n.top = o.top));
        if (this.options.custom && this.options.custom.refreshContainers)
          this.options.custom.refreshContainers.call(this);
        else
          for (i = this.containers.length - 1; i >= 0; i--)
            (o = this.containers[i].element.offset()),
              (this.containers[i].containerCache.left = o.left),
              (this.containers[i].containerCache.top = o.top),
              (this.containers[i].containerCache.width = this.containers[
                i
              ].element.outerWidth()),
              (this.containers[i].containerCache.height = this.containers[
                i
              ].element.outerHeight());
        return this;
      },
      _createPlaceholder: function(e) {
        var i,
          n = (e = e || this).options;
        (n.placeholder && n.placeholder.constructor !== String) ||
          ((i = n.placeholder),
          (n.placeholder = {
            element: function() {
              var n = e.currentItem[0].nodeName.toLowerCase(),
                s = t('<' + n + '>', e.document[0])
                  .addClass(
                    i || e.currentItem[0].className + ' ui-sortable-placeholder'
                  )
                  .removeClass('ui-sortable-helper');
              return (
                'tr' === n
                  ? e.currentItem.children().each(function() {
                      t('<td>&#160;</td>', e.document[0])
                        .attr('colspan', t(this).attr('colspan') || 1)
                        .appendTo(s);
                    })
                  : 'img' === n && s.attr('src', e.currentItem.attr('src')),
                i || s.css('visibility', 'hidden'),
                s
              );
            },
            update: function(t, s) {
              (i && !n.forcePlaceholderSize) ||
                (s.height() ||
                  s.height(
                    e.currentItem.innerHeight() -
                      parseInt(e.currentItem.css('paddingTop') || 0, 10) -
                      parseInt(e.currentItem.css('paddingBottom') || 0, 10)
                  ),
                s.width() ||
                  s.width(
                    e.currentItem.innerWidth() -
                      parseInt(e.currentItem.css('paddingLeft') || 0, 10) -
                      parseInt(e.currentItem.css('paddingRight') || 0, 10)
                  ));
            }
          })),
          (e.placeholder = t(
            n.placeholder.element.call(e.element, e.currentItem)
          )),
          e.currentItem.after(e.placeholder),
          n.placeholder.update(e, e.placeholder);
      },
      _contactContainers: function(e) {
        var i,
          n,
          s,
          o,
          r,
          a,
          h,
          l,
          c,
          u,
          p = null,
          d = null;
        for (i = this.containers.length - 1; i >= 0; i--)
          if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
            if (this._intersectsWith(this.containers[i].containerCache)) {
              if (p && t.contains(this.containers[i].element[0], p.element[0]))
                continue;
              (p = this.containers[i]), (d = i);
            } else
              this.containers[i].containerCache.over &&
                (this.containers[i]._trigger('out', e, this._uiHash(this)),
                (this.containers[i].containerCache.over = 0));
        if (p)
          if (1 === this.containers.length)
            this.containers[d].containerCache.over ||
              (this.containers[d]._trigger('over', e, this._uiHash(this)),
              (this.containers[d].containerCache.over = 1));
          else {
            for (
              s = 1e4,
                o = null,
                r = (c = p.floating || this._isFloating(this.currentItem))
                  ? 'left'
                  : 'top',
                a = c ? 'width' : 'height',
                u = c ? 'clientX' : 'clientY',
                n = this.items.length - 1;
              n >= 0;
              n--
            )
              t.contains(
                this.containers[d].element[0],
                this.items[n].item[0]
              ) &&
                this.items[n].item[0] !== this.currentItem[0] &&
                ((h = this.items[n].item.offset()[r]),
                (l = !1),
                e[u] - h > this.items[n][a] / 2 && (l = !0),
                Math.abs(e[u] - h) < s &&
                  ((s = Math.abs(e[u] - h)),
                  (o = this.items[n]),
                  (this.direction = l ? 'up' : 'down')));
            if (!o && !this.options.dropOnEmpty) return;
            if (this.currentContainer === this.containers[d])
              return void (
                this.currentContainer.containerCache.over ||
                (this.containers[d]._trigger('over', e, this._uiHash()),
                (this.currentContainer.containerCache.over = 1))
              );
            o
              ? this._rearrange(e, o, null, !0)
              : this._rearrange(e, null, this.containers[d].element, !0),
              this._trigger('change', e, this._uiHash()),
              this.containers[d]._trigger('change', e, this._uiHash(this)),
              (this.currentContainer = this.containers[d]),
              this.options.placeholder.update(
                this.currentContainer,
                this.placeholder
              ),
              this.containers[d]._trigger('over', e, this._uiHash(this)),
              (this.containers[d].containerCache.over = 1);
          }
      },
      _createHelper: function(e) {
        var i = this.options,
          n = t.isFunction(i.helper)
            ? t(i.helper.apply(this.element[0], [e, this.currentItem]))
            : 'clone' === i.helper
            ? this.currentItem.clone()
            : this.currentItem;
        return (
          n.parents('body').length ||
            t(
              'parent' !== i.appendTo
                ? i.appendTo
                : this.currentItem[0].parentNode
            )[0].appendChild(n[0]),
          n[0] === this.currentItem[0] &&
            (this._storedCSS = {
              width: this.currentItem[0].style.width,
              height: this.currentItem[0].style.height,
              position: this.currentItem.css('position'),
              top: this.currentItem.css('top'),
              left: this.currentItem.css('left')
            }),
          (n[0].style.width && !i.forceHelperSize) ||
            n.width(this.currentItem.width()),
          (n[0].style.height && !i.forceHelperSize) ||
            n.height(this.currentItem.height()),
          n
        );
      },
      _adjustOffsetFromHelper: function(e) {
        'string' == typeof e && (e = e.split(' ')),
          t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
          'left' in e && (this.offset.click.left = e.left + this.margins.left),
          'right' in e &&
            (this.offset.click.left =
              this.helperProportions.width - e.right + this.margins.left),
          'top' in e && (this.offset.click.top = e.top + this.margins.top),
          'bottom' in e &&
            (this.offset.click.top =
              this.helperProportions.height - e.bottom + this.margins.top);
      },
      _getParentOffset: function() {
        this.offsetParent = this.helper.offsetParent();
        var e = this.offsetParent.offset();
        return (
          'absolute' === this.cssPosition &&
            this.scrollParent[0] !== this.document[0] &&
            t.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((e.left += this.scrollParent.scrollLeft()),
            (e.top += this.scrollParent.scrollTop())),
          (this.offsetParent[0] === this.document[0].body ||
            (this.offsetParent[0].tagName &&
              'html' === this.offsetParent[0].tagName.toLowerCase() &&
              t.ui.ie)) &&
            (e = { top: 0, left: 0 }),
          {
            top:
              e.top +
              (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
            left:
              e.left +
              (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
          }
        );
      },
      _getRelativeOffset: function() {
        if ('relative' === this.cssPosition) {
          var t = this.currentItem.position();
          return {
            top:
              t.top -
              (parseInt(this.helper.css('top'), 10) || 0) +
              this.scrollParent.scrollTop(),
            left:
              t.left -
              (parseInt(this.helper.css('left'), 10) || 0) +
              this.scrollParent.scrollLeft()
          };
        }
        return { top: 0, left: 0 };
      },
      _cacheMargins: function() {
        this.margins = {
          left: parseInt(this.currentItem.css('marginLeft'), 10) || 0,
          top: parseInt(this.currentItem.css('marginTop'), 10) || 0
        };
      },
      _cacheHelperProportions: function() {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight()
        };
      },
      _setContainment: function() {
        var e,
          i,
          n,
          s = this.options;
        'parent' === s.containment &&
          (s.containment = this.helper[0].parentNode),
          ('document' !== s.containment && 'window' !== s.containment) ||
            (this.containment = [
              0 - this.offset.relative.left - this.offset.parent.left,
              0 - this.offset.relative.top - this.offset.parent.top,
              'document' === s.containment
                ? this.document.width()
                : this.window.width() -
                  this.helperProportions.width -
                  this.margins.left,
              ('document' === s.containment
                ? this.document.width()
                : this.window.height() ||
                  this.document[0].body.parentNode.scrollHeight) -
                this.helperProportions.height -
                this.margins.top
            ]),
          /^(document|window|parent)$/.test(s.containment) ||
            ((e = t(s.containment)[0]),
            (i = t(s.containment).offset()),
            (n = 'hidden' !== t(e).css('overflow')),
            (this.containment = [
              i.left +
                (parseInt(t(e).css('borderLeftWidth'), 10) || 0) +
                (parseInt(t(e).css('paddingLeft'), 10) || 0) -
                this.margins.left,
              i.top +
                (parseInt(t(e).css('borderTopWidth'), 10) || 0) +
                (parseInt(t(e).css('paddingTop'), 10) || 0) -
                this.margins.top,
              i.left +
                (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) -
                (parseInt(t(e).css('borderLeftWidth'), 10) || 0) -
                (parseInt(t(e).css('paddingRight'), 10) || 0) -
                this.helperProportions.width -
                this.margins.left,
              i.top +
                (n
                  ? Math.max(e.scrollHeight, e.offsetHeight)
                  : e.offsetHeight) -
                (parseInt(t(e).css('borderTopWidth'), 10) || 0) -
                (parseInt(t(e).css('paddingBottom'), 10) || 0) -
                this.helperProportions.height -
                this.margins.top
            ]));
      },
      _convertPositionTo: function(e, i) {
        i || (i = this.position);
        var n = 'absolute' === e ? 1 : -1,
          s =
            'absolute' !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              t.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          o = /(html|body)/i.test(s[0].tagName);
        return {
          top:
            i.top +
            this.offset.relative.top * n +
            this.offset.parent.top * n -
            ('fixed' === this.cssPosition
              ? -this.scrollParent.scrollTop()
              : o
              ? 0
              : s.scrollTop()) *
              n,
          left:
            i.left +
            this.offset.relative.left * n +
            this.offset.parent.left * n -
            ('fixed' === this.cssPosition
              ? -this.scrollParent.scrollLeft()
              : o
              ? 0
              : s.scrollLeft()) *
              n
        };
      },
      _generatePosition: function(e) {
        var i,
          n,
          s = this.options,
          o = e.pageX,
          r = e.pageY,
          a =
            'absolute' !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              t.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          h = /(html|body)/i.test(a[0].tagName);
        return (
          'relative' !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              this.scrollParent[0] !== this.offsetParent[0]) ||
            (this.offset.relative = this._getRelativeOffset()),
          this.originalPosition &&
            (this.containment &&
              (e.pageX - this.offset.click.left < this.containment[0] &&
                (o = this.containment[0] + this.offset.click.left),
              e.pageY - this.offset.click.top < this.containment[1] &&
                (r = this.containment[1] + this.offset.click.top),
              e.pageX - this.offset.click.left > this.containment[2] &&
                (o = this.containment[2] + this.offset.click.left),
              e.pageY - this.offset.click.top > this.containment[3] &&
                (r = this.containment[3] + this.offset.click.top)),
            s.grid &&
              ((i =
                this.originalPageY +
                Math.round((r - this.originalPageY) / s.grid[1]) * s.grid[1]),
              (r = this.containment
                ? i - this.offset.click.top >= this.containment[1] &&
                  i - this.offset.click.top <= this.containment[3]
                  ? i
                  : i - this.offset.click.top >= this.containment[1]
                  ? i - s.grid[1]
                  : i + s.grid[1]
                : i),
              (n =
                this.originalPageX +
                Math.round((o - this.originalPageX) / s.grid[0]) * s.grid[0]),
              (o = this.containment
                ? n - this.offset.click.left >= this.containment[0] &&
                  n - this.offset.click.left <= this.containment[2]
                  ? n
                  : n - this.offset.click.left >= this.containment[0]
                  ? n - s.grid[0]
                  : n + s.grid[0]
                : n))),
          {
            top:
              r -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ('fixed' === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : h
                ? 0
                : a.scrollTop()),
            left:
              o -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ('fixed' === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : h
                ? 0
                : a.scrollLeft())
          }
        );
      },
      _rearrange: function(t, e, i, n) {
        i
          ? i[0].appendChild(this.placeholder[0])
          : e.item[0].parentNode.insertBefore(
              this.placeholder[0],
              'down' === this.direction ? e.item[0] : e.item[0].nextSibling
            ),
          (this.counter = this.counter ? ++this.counter : 1);
        var s = this.counter;
        this._delay(function() {
          s === this.counter && this.refreshPositions(!n);
        });
      },
      _clear: function(t, e) {
        function i(t, e, i) {
          return function(n) {
            i._trigger(t, n, e._uiHash(e));
          };
        }
        this.reverting = !1;
        var n,
          s = [];
        if (
          (!this._noFinalSort &&
            this.currentItem.parent().length &&
            this.placeholder.before(this.currentItem),
          (this._noFinalSort = null),
          this.helper[0] === this.currentItem[0])
        ) {
          for (n in this._storedCSS)
            ('auto' !== this._storedCSS[n] &&
              'static' !== this._storedCSS[n]) ||
              (this._storedCSS[n] = '');
          this.currentItem
            .css(this._storedCSS)
            .removeClass('ui-sortable-helper');
        } else this.currentItem.show();
        for (
          this.fromOutside &&
            !e &&
            s.push(function(t) {
              this._trigger('receive', t, this._uiHash(this.fromOutside));
            }),
            (!this.fromOutside &&
              this.domPosition.prev ===
                this.currentItem.prev().not('.ui-sortable-helper')[0] &&
              this.domPosition.parent === this.currentItem.parent()[0]) ||
              e ||
              s.push(function(t) {
                this._trigger('update', t, this._uiHash());
              }),
            this !== this.currentContainer &&
              (e ||
                (s.push(function(t) {
                  this._trigger('remove', t, this._uiHash());
                }),
                s.push(
                  function(t) {
                    return function(e) {
                      t._trigger('receive', e, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ),
                s.push(
                  function(t) {
                    return function(e) {
                      t._trigger('update', e, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ))),
            n = this.containers.length - 1;
          n >= 0;
          n--
        )
          e || s.push(i('deactivate', this, this.containers[n])),
            this.containers[n].containerCache.over &&
              (s.push(i('out', this, this.containers[n])),
              (this.containers[n].containerCache.over = 0));
        if (
          (this.storedCursor &&
            (this.document.find('body').css('cursor', this.storedCursor),
            this.storedStylesheet.remove()),
          this._storedOpacity &&
            this.helper.css('opacity', this._storedOpacity),
          this._storedZIndex &&
            this.helper.css(
              'zIndex',
              'auto' === this._storedZIndex ? '' : this._storedZIndex
            ),
          (this.dragging = !1),
          e || this._trigger('beforeStop', t, this._uiHash()),
          this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
          this.cancelHelperRemoval ||
            (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            (this.helper = null)),
          !e)
        ) {
          for (n = 0; n < s.length; n++) s[n].call(this, t);
          this._trigger('stop', t, this._uiHash());
        }
        return (this.fromOutside = !1), !this.cancelHelperRemoval;
      },
      _trigger: function() {
        !1 === t.Widget.prototype._trigger.apply(this, arguments) &&
          this.cancel();
      },
      _uiHash: function(e) {
        var i = e || this;
        return {
          helper: i.helper,
          placeholder: i.placeholder || t([]),
          position: i.position,
          originalPosition: i.originalPosition,
          offset: i.positionAbs,
          item: i.currentItem,
          sender: e ? e.element : null
        };
      }
    });
  /*!
   * jQuery UI Sortable 1.11.3
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/sortable/
   */
}),
  /*!
   * EventEmitter v4.2.11 - git.io/ee
   * Unlicense - http://unlicense.org/
   * Oliver Caldwell - http://oli.me.uk/
   * @preserve
   */
  function() {
    'use strict';
    function t() {}
    function e(t, e) {
      for (var i = t.length; i--; ) if (t[i].listener === e) return i;
      return -1;
    }
    function i(t) {
      return function() {
        return this[t].apply(this, arguments);
      };
    }
    var n = t.prototype,
      s = this,
      o = s.EventEmitter;
    (n.getListeners = function(t) {
      var e,
        i,
        n = this._getEvents();
      if (t instanceof RegExp)
        for (i in ((e = {}), n))
          n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i]);
      else e = n[t] || (n[t] = []);
      return e;
    }),
      (n.flattenListeners = function(t) {
        var e,
          i = [];
        for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
        return i;
      }),
      (n.getListenersAsObject = function(t) {
        var e,
          i = this.getListeners(t);
        return i instanceof Array && ((e = {})[t] = i), e || i;
      }),
      (n.addListener = function(t, i) {
        var n,
          s = this.getListenersAsObject(t),
          o = 'object' == typeof i;
        for (n in s)
          s.hasOwnProperty(n) &&
            -1 === e(s[n], i) &&
            s[n].push(o ? i : { listener: i, once: !1 });
        return this;
      }),
      (n.on = i('addListener')),
      (n.addOnceListener = function(t, e) {
        return this.addListener(t, { listener: e, once: !0 });
      }),
      (n.once = i('addOnceListener')),
      (n.defineEvent = function(t) {
        return this.getListeners(t), this;
      }),
      (n.defineEvents = function(t) {
        for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
        return this;
      }),
      (n.removeListener = function(t, i) {
        var n,
          s,
          o = this.getListenersAsObject(t);
        for (s in o)
          o.hasOwnProperty(s) && -1 !== (n = e(o[s], i)) && o[s].splice(n, 1);
        return this;
      }),
      (n.off = i('removeListener')),
      (n.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e);
      }),
      (n.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e);
      }),
      (n.manipulateListeners = function(t, e, i) {
        var n,
          s,
          o = t ? this.removeListener : this.addListener,
          r = t ? this.removeListeners : this.addListeners;
        if ('object' != typeof e || e instanceof RegExp)
          for (n = i.length; n--; ) o.call(this, e, i[n]);
        else
          for (n in e)
            e.hasOwnProperty(n) &&
              (s = e[n]) &&
              ('function' == typeof s
                ? o.call(this, n, s)
                : r.call(this, n, s));
        return this;
      }),
      (n.removeEvent = function(t) {
        var e,
          i = typeof t,
          n = this._getEvents();
        if ('string' === i) delete n[t];
        else if (t instanceof RegExp)
          for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
        else delete this._events;
        return this;
      }),
      (n.removeAllListeners = i('removeEvent')),
      (n.emitEvent = function(t, e) {
        var i,
          n,
          s,
          o = this.getListenersAsObject(t);
        for (s in o)
          if (o.hasOwnProperty(s))
            for (n = o[s].length; n--; )
              !0 === (i = o[s][n]).once && this.removeListener(t, i.listener),
                i.listener.apply(this, e || []) ===
                  this._getOnceReturnValue() &&
                  this.removeListener(t, i.listener);
        return this;
      }),
      (n.trigger = i('emitEvent')),
      (n.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e);
      }),
      (n.setOnceReturnValue = function(t) {
        return (this._onceReturnValue = t), this;
      }),
      (n._getOnceReturnValue = function() {
        return (
          !this.hasOwnProperty('_onceReturnValue') || this._onceReturnValue
        );
      }),
      (n._getEvents = function() {
        return this._events || (this._events = {});
      }),
      (t.noConflict = function() {
        return (s.EventEmitter = o), t;
      }),
      'function' == typeof define && define.amd
        ? define(function() {
            return t;
          })
        : 'object' == typeof module && module.exports
        ? (module.exports = t)
        : (s.EventEmitter = t);
  }.call(this),
  /*!
   * eventie v1.0.6
   * event binding helper
   *   eventie.bind( elem, 'click', myFn )
   *   eventie.unbind( elem, 'click', myFn )
   * MIT license
   */
  (function(t) {
    'use strict';
    function e(e) {
      var i = t.event;
      return (i.target = i.target || i.srcElement || e), i;
    }
    var i = document.documentElement,
      n = function() {};
    i.addEventListener
      ? (n = function(t, e, i) {
          t.addEventListener(e, i, !1);
        })
      : i.attachEvent &&
        (n = function(t, i, n) {
          (t[i + n] = n.handleEvent
            ? function() {
                var i = e(t);
                n.handleEvent.call(n, i);
              }
            : function() {
                var i = e(t);
                n.call(t, i);
              }),
            t.attachEvent('on' + i, t[i + n]);
        });
    var s = function() {};
    i.removeEventListener
      ? (s = function(t, e, i) {
          t.removeEventListener(e, i, !1);
        })
      : i.detachEvent &&
        (s = function(t, e, i) {
          t.detachEvent('on' + e, t[e + i]);
          try {
            delete t[e + i];
          } catch (n) {
            t[e + i] = undefined;
          }
        });
    var o = { bind: n, unbind: s };
    'function' == typeof define && define.amd
      ? define(o)
      : 'object' == typeof exports
      ? (module.exports = o)
      : (t.eventie = o);
  })(window),
  /*!
   * Unipointer v1.1.0
   * base class for doing one thing with pointer event
   * MIT license
   */
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(['eventEmitter/EventEmitter', 'eventie/eventie'], function(
          i,
          n
        ) {
          return e(t, i, n);
        })
      : 'object' == typeof exports
      ? (module.exports = e(
          t,
          require('wolfy87-eventemitter'),
          require('eventie')
        ))
      : (t.Unipointer = e(t, t.EventEmitter, t.eventie));
  })(window, function(t, e, i) {
    'use strict';
    function n() {}
    function s() {}
    (s.prototype = new e()),
      (s.prototype.bindStartEvent = function(t) {
        this._bindStartEvent(t, !0);
      }),
      (s.prototype.unbindStartEvent = function(t) {
        this._bindStartEvent(t, !1);
      }),
      (s.prototype._bindStartEvent = function(e, n) {
        var s = (n = n === undefined || !!n) ? 'bind' : 'unbind';
        t.navigator.pointerEnabled
          ? i[s](e, 'pointerdown', this)
          : t.navigator.msPointerEnabled
          ? i[s](e, 'MSPointerDown', this)
          : (i[s](e, 'mousedown', this), i[s](e, 'touchstart', this));
      }),
      (s.prototype.handleEvent = function(t) {
        var e = 'on' + t.type;
        this[e] && this[e](t);
      }),
      (s.prototype.getTouch = function(t) {
        for (var e = 0, i = t.length; e < i; e++) {
          var n = t[e];
          if (n.identifier == this.pointerIdentifier) return n;
        }
      }),
      (s.prototype.onmousedown = function(t) {
        var e = t.button;
        (e && 0 !== e && 1 !== e) || this._pointerDown(t, t);
      }),
      (s.prototype.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0]);
      }),
      (s.prototype.onMSPointerDown = s.prototype.onpointerdown = function(t) {
        this._pointerDown(t, t);
      }),
      (s.prototype._pointerDown = function(t, e) {
        this.isPointerDown ||
          ((this.isPointerDown = !0),
          (this.pointerIdentifier =
            e.pointerId !== undefined ? e.pointerId : e.identifier),
          this.pointerDown(t, e));
      }),
      (s.prototype.pointerDown = function(t, e) {
        this._bindPostStartEvents(t), this.emitEvent('pointerDown', [t, e]);
      });
    var o = {
      mousedown: ['mousemove', 'mouseup'],
      touchstart: ['touchmove', 'touchend', 'touchcancel'],
      pointerdown: ['pointermove', 'pointerup', 'pointercancel'],
      MSPointerDown: ['MSPointerMove', 'MSPointerUp', 'MSPointerCancel']
    };
    return (
      (s.prototype._bindPostStartEvents = function(e) {
        if (e) {
          for (
            var n = o[e.type],
              s = e.preventDefault ? t : document,
              r = 0,
              a = n.length;
            r < a;
            r++
          ) {
            var h = n[r];
            i.bind(s, h, this);
          }
          this._boundPointerEvents = { events: n, node: s };
        }
      }),
      (s.prototype._unbindPostStartEvents = function() {
        var t = this._boundPointerEvents;
        if (t && t.events) {
          for (var e = 0, n = t.events.length; e < n; e++) {
            var s = t.events[e];
            i.unbind(t.node, s, this);
          }
          delete this._boundPointerEvents;
        }
      }),
      (s.prototype.onmousemove = function(t) {
        this._pointerMove(t, t);
      }),
      (s.prototype.onMSPointerMove = s.prototype.onpointermove = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t);
      }),
      (s.prototype.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e);
      }),
      (s.prototype._pointerMove = function(t, e) {
        this.pointerMove(t, e);
      }),
      (s.prototype.pointerMove = function(t, e) {
        this.emitEvent('pointerMove', [t, e]);
      }),
      (s.prototype.onmouseup = function(t) {
        this._pointerUp(t, t);
      }),
      (s.prototype.onMSPointerUp = s.prototype.onpointerup = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t);
      }),
      (s.prototype.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e);
      }),
      (s.prototype._pointerUp = function(t, e) {
        this._pointerDone(), this.pointerUp(t, e);
      }),
      (s.prototype.pointerUp = function(t, e) {
        this.emitEvent('pointerUp', [t, e]);
      }),
      (s.prototype._pointerDone = function() {
        (this.isPointerDown = !1),
          delete this.pointerIdentifier,
          this._unbindPostStartEvents(),
          this.pointerDone();
      }),
      (s.prototype.pointerDone = n),
      (s.prototype.onMSPointerCancel = s.prototype.onpointercancel = function(
        t
      ) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t);
      }),
      (s.prototype.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e);
      }),
      (s.prototype._pointerCancel = function(t, e) {
        this._pointerDone(), this.pointerCancel(t, e);
      }),
      (s.prototype.pointerCancel = function(t, e) {
        this.emitEvent('pointerCancel', [t, e]);
      }),
      (s.getPointerPoint = function(t) {
        return {
          x: t.pageX !== undefined ? t.pageX : t.clientX,
          y: t.pageY !== undefined ? t.pageY : t.clientY
        };
      }),
      s
    );
  }),
  /*!
   * Unidragger v1.1.5
   * Draggable base class
   * MIT license
   */
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(['eventie/eventie', 'unipointer/unipointer'], function(i, n) {
          return e(t, i, n);
        })
      : 'object' == typeof exports
      ? (module.exports = e(t, require('eventie'), require('unipointer')))
      : (t.Unidragger = e(t, t.eventie, t.Unipointer));
  })(window, function(t, e, i) {
    'use strict';
    function n() {}
    function s(t) {
      t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
    }
    function o() {}
    function r() {
      return !1;
    }
    (o.prototype = new i()),
      (o.prototype.bindHandles = function() {
        this._bindHandles(!0);
      }),
      (o.prototype.unbindHandles = function() {
        this._bindHandles(!1);
      });
    var a = t.navigator;
    o.prototype._bindHandles = function(t) {
      var i;
      (t = t === undefined || !!t),
        (i = a.pointerEnabled
          ? function(e) {
              e.style.touchAction = t ? 'none' : '';
            }
          : a.msPointerEnabled
          ? function(e) {
              e.style.msTouchAction = t ? 'none' : '';
            }
          : function() {
              t && h(r);
            });
      for (
        var n = t ? 'bind' : 'unbind', s = 0, o = this.handles.length;
        s < o;
        s++
      ) {
        var r = this.handles[s];
        this._bindStartEvent(r, t), i(r), e[n](r, 'click', this);
      }
    };
    var h =
      'attachEvent' in document.documentElement
        ? function(t) {
            'IMG' == t.nodeName && (t.ondragstart = r);
            for (
              var e = t.querySelectorAll('img'), i = 0, n = e.length;
              i < n;
              i++
            ) {
              e[i].ondragstart = r;
            }
          }
        : n;
    (o.prototype.pointerDown = function(i, n) {
      if ('INPUT' == i.target.nodeName && 'range' == i.target.type)
        return (this.isPointerDown = !1), void delete this.pointerIdentifier;
      this._dragPointerDown(i, n);
      var s = document.activeElement;
      s && s.blur && s.blur(),
        this._bindPostStartEvents(i),
        (this.pointerDownScroll = o.getScrollPosition()),
        e.bind(t, 'scroll', this),
        this.emitEvent('pointerDown', [i, n]);
    }),
      (o.prototype._dragPointerDown = function(t, e) {
        this.pointerDownPoint = i.getPointerPoint(e);
        var n = 'touchstart' == t.type,
          o = t.target.nodeName;
        n || 'SELECT' == o || s(t);
      }),
      (o.prototype.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent('pointerMove', [t, e, i]), this._dragMove(t, e, i);
      }),
      (o.prototype._dragPointerMove = function(t, e) {
        var n = i.getPointerPoint(e),
          s = {
            x: n.x - this.pointerDownPoint.x,
            y: n.y - this.pointerDownPoint.y
          };
        return (
          !this.isDragging && this.hasDragStarted(s) && this._dragStart(t, e), s
        );
      }),
      (o.prototype.hasDragStarted = function(t) {
        return Math.abs(t.x) > 3 || Math.abs(t.y) > 3;
      }),
      (o.prototype.pointerUp = function(t, e) {
        this.emitEvent('pointerUp', [t, e]), this._dragPointerUp(t, e);
      }),
      (o.prototype._dragPointerUp = function(t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e);
      }),
      (i.prototype.pointerDone = function() {
        e.unbind(t, 'scroll', this);
      }),
      (o.prototype._dragStart = function(t, e) {
        (this.isDragging = !0),
          (this.dragStartPoint = o.getPointerPoint(e)),
          (this.isPreventingClicks = !0),
          this.dragStart(t, e);
      }),
      (o.prototype.dragStart = function(t, e) {
        this.emitEvent('dragStart', [t, e]);
      }),
      (o.prototype._dragMove = function(t, e, i) {
        this.isDragging && this.dragMove(t, e, i);
      }),
      (o.prototype.dragMove = function(t, e, i) {
        s(t), this.emitEvent('dragMove', [t, e, i]);
      }),
      (o.prototype._dragEnd = function(t, e) {
        this.isDragging = !1;
        var i = this;
        setTimeout(function() {
          delete i.isPreventingClicks;
        }),
          this.dragEnd(t, e);
      }),
      (o.prototype.dragEnd = function(t, e) {
        this.emitEvent('dragEnd', [t, e]);
      }),
      (o.prototype.pointerDone = function() {
        e.unbind(t, 'scroll', this), delete this.pointerDownScroll;
      }),
      (o.prototype.onclick = function(t) {
        this.isPreventingClicks && s(t);
      }),
      (o.prototype._staticClick = function(t, e) {
        if (!this.isIgnoringMouseUp || 'mouseup' != t.type) {
          var i = t.target.nodeName;
          if (
            (('INPUT' != i && 'TEXTAREA' != i) || t.target.focus(),
            this.staticClick(t, e),
            'mouseup' != t.type)
          ) {
            this.isIgnoringMouseUp = !0;
            var n = this;
            setTimeout(function() {
              delete n.isIgnoringMouseUp;
            }, 400);
          }
        }
      }),
      (o.prototype.staticClick = function(t, e) {
        this.emitEvent('staticClick', [t, e]);
      }),
      (o.prototype.onscroll = function() {
        var t = o.getScrollPosition(),
          e = this.pointerDownScroll.x - t.x,
          i = this.pointerDownScroll.y - t.y;
        (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone();
      }),
      (o.getPointerPoint = function(t) {
        return {
          x: t.pageX !== undefined ? t.pageX : t.clientX,
          y: t.pageY !== undefined ? t.pageY : t.clientY
        };
      });
    var l = t.pageYOffset !== undefined;
    return (
      (o.getScrollPosition = function() {
        return {
          x: l ? t.pageXOffset : document.body.scrollLeft,
          y: l ? t.pageYOffset : document.body.scrollTop
        };
      }),
      (o.getPointerPoint = i.getPointerPoint),
      o
    );
  }),
  (function(t) {
    var e;
    'undefined' != typeof window
      ? (e = window)
      : 'undefined' != typeof self && (e = self),
      (e.ALGOLIA_MIGRATION_LAYER = t());
  })(function() {
    return (function t(e, i, n) {
      function s(r, a) {
        if (!i[r]) {
          if (!e[r]) {
            var h = 'function' == typeof require && require;
            if (!a && h) return h(r, !0);
            if (o) return o(r, !0);
            var l = new Error("Cannot find module '" + r + "'");
            throw ((l.code = 'MODULE_NOT_FOUND'), l);
          }
          var c = (i[r] = { exports: {} });
          e[r][0].call(
            c.exports,
            function(t) {
              var i = e[r][1][t];
              return s(i || t);
            },
            c,
            c.exports,
            t,
            e,
            i,
            n
          );
        }
        return i[r].exports;
      }
      for (
        var o = 'function' == typeof require && require, r = 0;
        r < n.length;
        r++
      )
        s(n[r]);
      return s;
    })(
      {
        1: [
          function(t, e) {
            function i(t, e) {
              for (var i in e) t.setAttribute(i, e[i]);
            }
            function n(t, e) {
              (t.onload = function() {
                (this.onerror = this.onload = null), e(null, t);
              }),
                (t.onerror = function() {
                  (this.onerror = this.onload = null),
                    e(new Error('Failed to load ' + this.src), t);
                });
            }
            function s(t, e) {
              t.onreadystatechange = function() {
                ('complete' != this.readyState &&
                  'loaded' != this.readyState) ||
                  ((this.onreadystatechange = null), e(null, t));
              };
            }
            e.exports = function(t, e, o) {
              var r = document.head || document.getElementsByTagName('head')[0],
                a = document.createElement('script');
              'function' == typeof e && ((o = e), (e = {})),
                (e = e || {}),
                (o = o || function() {}),
                (a.type = e.type || 'text/javascript'),
                (a.charset = e.charset || 'utf8'),
                (a.async = !('async' in e && !e.async)),
                (a.src = t),
                e.attrs && i(a, e.attrs),
                e.text && (a.text = '' + e.text),
                ('onload' in a ? n : s)(a, o),
                a.onload || n(a, o),
                r.appendChild(a);
            };
          },
          {}
        ],
        2: [
          function(t, e) {
            'use strict';
            function i(t) {
              for (
                var e = new RegExp(
                    'cdn\\.jsdelivr\\.net/algoliasearch/latest/' +
                      t.replace('.', '\\.') +
                      '(?:\\.min)?\\.js$'
                  ),
                  i = document.getElementsByTagName('script'),
                  n = !1,
                  s = 0,
                  o = i.length;
                s < o;
                s++
              )
                if (i[s].src && e.test(i[s].src)) {
                  n = !0;
                  break;
                }
              return n;
            }
            e.exports = i;
          },
          {}
        ],
        3: [
          function(t, e) {
            'use strict';
            function i(e) {
              var i = t(1),
                s = '//cdn.jsdelivr.net/algoliasearch/2/' + e + '.min.js',
                o =
                  '-- AlgoliaSearch `latest` warning --\nWarning, you are using the `latest` version string from jsDelivr to load the AlgoliaSearch library.\nUsing `latest` is no more recommended, you should load //cdn.jsdelivr.net/algoliasearch/2/algoliasearch.min.js\n\nAlso, we updated the AlgoliaSearch JavaScript client to V3. If you want to upgrade,\nplease read our migration guide at https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x\n-- /AlgoliaSearch  `latest` warning --';
              window.console &&
                (window.console.warn
                  ? window.console.warn(o)
                  : window.console.log && window.console.log(o));
              try {
                document.write(
                  '<script>window.ALGOLIA_SUPPORTS_DOCWRITE = true</script>'
                ),
                  !0 === window.ALGOLIA_SUPPORTS_DOCWRITE
                    ? (document.write('<script src="' + s + '"></script>'),
                      n('document.write')())
                    : i(s, n('DOMElement'));
              } catch (r) {
                i(s, n('DOMElement'));
              }
            }
            function n(t) {
              return function() {
                var e = 'AlgoliaSearch: loaded V2 script using ' + t;
                window.console && window.console.log && window.console.log(e);
              };
            }
            e.exports = i;
          },
          { 1: 1 }
        ],
        4: [
          function(t, e) {
            'use strict';
            function i() {
              var t =
                '-- AlgoliaSearch V2 => V3 error --\nYou are trying to use a new version of the AlgoliaSearch JavaScript client with an old notation.\nPlease read our migration guide at https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x\n-- /AlgoliaSearch V2 => V3 error --';
              (window.AlgoliaSearch = function() {
                throw new Error(t);
              }),
                (window.AlgoliaSearchHelper = function() {
                  throw new Error(t);
                }),
                (window.AlgoliaExplainResults = function() {
                  throw new Error(t);
                });
            }
            e.exports = i;
          },
          {}
        ],
        5: [
          function(t) {
            'use strict';
            function e(e) {
              var i = t(2),
                n = t(3),
                s = t(4);
              i(e) ? n(e) : s();
            }
            e('algoliasearch');
          },
          { 2: 2, 3: 3, 4: 4 }
        ]
      },
      {},
      [5]
    )(5);
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
      ).algoliasearch = t();
    }
  })(function() {
    var t;
    return (function e(t, i, n) {
      function s(r, a) {
        if (!i[r]) {
          if (!t[r]) {
            var h = 'function' == typeof require && require;
            if (!a && h) return h(r, !0);
            if (o) return o(r, !0);
            var l = new Error("Cannot find module '" + r + "'");
            throw ((l.code = 'MODULE_NOT_FOUND'), l);
          }
          var c = (i[r] = { exports: {} });
          t[r][0].call(
            c.exports,
            function(e) {
              var i = t[r][1][e];
              return s(i || e);
            },
            c,
            c.exports,
            e,
            t,
            i,
            n
          );
        }
        return i[r].exports;
      }
      for (
        var o = 'function' == typeof require && require, r = 0;
        r < n.length;
        r++
      )
        s(n[r]);
      return s;
    })(
      {
        1: [
          function(t, e, i) {
            (function(n) {
              function s() {
                return (
                  !(
                    'undefined' == typeof window ||
                    !window.process ||
                    'renderer' !== window.process.type
                  ) ||
                  ('undefined' != typeof document &&
                    document.documentElement &&
                    document.documentElement.style &&
                    document.documentElement.style.WebkitAppearance) ||
                  ('undefined' != typeof window &&
                    window.console &&
                    (window.console.firebug ||
                      (window.console.exception && window.console.table))) ||
                  ('undefined' != typeof navigator &&
                    navigator.userAgent &&
                    navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                    parseInt(RegExp.$1, 10) >= 31) ||
                  ('undefined' != typeof navigator &&
                    navigator.userAgent &&
                    navigator.userAgent
                      .toLowerCase()
                      .match(/applewebkit\/(\d+)/))
                );
              }
              function o(t) {
                var e = this.useColors;
                if (
                  ((t[0] =
                    (e ? '%c' : '') +
                    this.namespace +
                    (e ? ' %c' : ' ') +
                    t[0] +
                    (e ? '%c ' : ' ') +
                    '+' +
                    i.humanize(this.diff)),
                  e)
                ) {
                  var n = 'color: ' + this.color;
                  t.splice(1, 0, n, 'color: inherit');
                  var s = 0,
                    o = 0;
                  t[0].replace(/%[a-zA-Z%]/g, function(t) {
                    '%%' !== t && '%c' === t && (o = ++s);
                  }),
                    t.splice(o, 0, n);
                }
              }
              function r() {
                return (
                  'object' == typeof console &&
                  console.log &&
                  Function.prototype.apply.call(console.log, console, arguments)
                );
              }
              function a(t) {
                try {
                  null == t
                    ? i.storage.removeItem('debug')
                    : (i.storage.debug = t);
                } catch (e) {}
              }
              function h() {
                var t;
                try {
                  t = i.storage.debug;
                } catch (e) {}
                return !t && void 0 !== n && 'env' in n && (t = n.env.DEBUG), t;
              }
              function l() {
                try {
                  return window.localStorage;
                } catch (t) {}
              }
              ((i = e.exports = t(2)).log = r),
                (i.formatArgs = o),
                (i.save = a),
                (i.load = h),
                (i.useColors = s),
                (i.storage =
                  'undefined' != typeof chrome &&
                  'undefined' != typeof chrome.storage
                    ? chrome.storage.local
                    : l()),
                (i.colors = [
                  'lightseagreen',
                  'forestgreen',
                  'goldenrod',
                  'dodgerblue',
                  'darkorchid',
                  'crimson'
                ]),
                (i.formatters.j = function(t) {
                  try {
                    return JSON.stringify(t);
                  } catch (e) {
                    return '[UnexpectedJSONParseError]: ' + e.message;
                  }
                }),
                i.enable(h());
            }.call(this, t(12)));
          },
          { 12: 12, 2: 2 }
        ],
        2: [
          function(t, e, i) {
            function n(t) {
              var e,
                n = 0;
              for (e in t) (n = (n << 5) - n + t.charCodeAt(e)), (n |= 0);
              return i.colors[Math.abs(n) % i.colors.length];
            }
            function s(t) {
              function e() {
                if (e.enabled) {
                  var t = e,
                    n = +new Date(),
                    s = n - (l || n);
                  (t.diff = s), (t.prev = l), (t.curr = n), (l = n);
                  for (
                    var o = new Array(arguments.length), r = 0;
                    r < o.length;
                    r++
                  )
                    o[r] = arguments[r];
                  (o[0] = i.coerce(o[0])),
                    'string' != typeof o[0] && o.unshift('%O');
                  var a = 0;
                  (o[0] = o[0].replace(/%([a-zA-Z%])/g, function(e, n) {
                    if ('%%' === e) return e;
                    a++;
                    var s = i.formatters[n];
                    if ('function' == typeof s) {
                      var r = o[a];
                      (e = s.call(t, r)), o.splice(a, 1), a--;
                    }
                    return e;
                  })),
                    i.formatArgs.call(t, o),
                    (e.log || i.log || console.log.bind(console)).apply(t, o);
                }
              }
              return (
                (e.namespace = t),
                (e.enabled = i.enabled(t)),
                (e.useColors = i.useColors()),
                (e.color = n(t)),
                'function' == typeof i.init && i.init(e),
                e
              );
            }
            function o(t) {
              i.save(t), (i.names = []), (i.skips = []);
              for (
                var e = ('string' == typeof t ? t : '').split(/[\s,]+/),
                  n = e.length,
                  s = 0;
                s < n;
                s++
              )
                e[s] &&
                  ('-' === (t = e[s].replace(/\*/g, '.*?'))[0]
                    ? i.skips.push(new RegExp('^' + t.substr(1) + '$'))
                    : i.names.push(new RegExp('^' + t + '$')));
            }
            function r() {
              i.enable('');
            }
            function a(t) {
              var e, n;
              for (e = 0, n = i.skips.length; e < n; e++)
                if (i.skips[e].test(t)) return !1;
              for (e = 0, n = i.names.length; e < n; e++)
                if (i.names[e].test(t)) return !0;
              return !1;
            }
            function h(t) {
              return t instanceof Error ? t.stack || t.message : t;
            }
            var l;
            ((i = e.exports = s.debug = s['default'] = s).coerce = h),
              (i.disable = r),
              (i.enable = o),
              (i.enabled = a),
              (i.humanize = t(9)),
              (i.names = []),
              (i.skips = []),
              (i.formatters = {});
          },
          { 9: 9 }
        ],
        3: [
          function(e, i, n) {
            (function(s, o) {
              !(function(e, s) {
                'object' == typeof n && void 0 !== i
                  ? (i.exports = s())
                  : 'function' == typeof t && t.amd
                  ? t(s)
                  : (e.ES6Promise = s());
              })(this, function() {
                'use strict';
                function t(t) {
                  var e = typeof t;
                  return null !== t && ('object' === e || 'function' === e);
                }
                function i(t) {
                  return 'function' == typeof t;
                }
                function n(t) {
                  X = t;
                }
                function r(t) {
                  Q = t;
                }
                function a() {
                  return function() {
                    return s.nextTick(p);
                  };
                }
                function h() {
                  return void 0 !== V
                    ? function() {
                        V(p);
                      }
                    : u();
                }
                function l() {
                  var t = 0,
                    e = new G(p),
                    i = document.createTextNode('');
                  return (
                    e.observe(i, { characterData: !0 }),
                    function() {
                      i.data = t = ++t % 2;
                    }
                  );
                }
                function c() {
                  var t = new MessageChannel();
                  return (
                    (t.port1.onmessage = p),
                    function() {
                      return t.port2.postMessage(0);
                    }
                  );
                }
                function u() {
                  var t = setTimeout;
                  return function() {
                    return t(p, 1);
                  };
                }
                function p() {
                  for (var t = 0; t < B; t += 2) {
                    (0, et[t])(et[t + 1]),
                      (et[t] = void 0),
                      (et[t + 1] = void 0);
                  }
                  B = 0;
                }
                function d() {
                  try {
                    var t = e('vertx');
                    return (V = t.runOnLoop || t.runOnContext), h();
                  } catch (n) {
                    return u();
                  }
                }
                function f(t, e) {
                  var i = arguments,
                    n = this,
                    s = new this.constructor(g);
                  void 0 === s[nt] && j(s);
                  var o = n._state;
                  return (
                    o
                      ? (function() {
                          var t = i[o - 1];
                          Q(function() {
                            return O(o, s, t, n._result);
                          });
                        })()
                      : E(n, s, t, e),
                    s
                  );
                }
                function m(t) {
                  var e = this;
                  if (t && 'object' == typeof t && t.constructor === e)
                    return t;
                  var i = new e(g);
                  return C(i, t), i;
                }
                function g() {}
                function v() {
                  return new TypeError(
                    'You cannot resolve a promise with itself'
                  );
                }
                function y() {
                  return new TypeError(
                    'A promises callback cannot return that same promise.'
                  );
                }
                function _(t) {
                  try {
                    return t.then;
                  } catch (e) {
                    return (at.error = e), at;
                  }
                }
                function b(t, e, i, n) {
                  try {
                    t.call(e, i, n);
                  } catch (s) {
                    return s;
                  }
                }
                function w(t, e, i) {
                  Q(function(t) {
                    var n = !1,
                      s = b(
                        i,
                        e,
                        function(i) {
                          n || ((n = !0), e !== i ? C(t, i) : S(t, i));
                        },
                        function(e) {
                          n || ((n = !0), I(t, e));
                        },
                        'Settle: ' + (t._label || ' unknown promise')
                      );
                    !n && s && ((n = !0), I(t, s));
                  }, t);
                }
                function x(t, e) {
                  e._state === ot
                    ? S(t, e._result)
                    : e._state === rt
                    ? I(t, e._result)
                    : E(
                        e,
                        void 0,
                        function(e) {
                          return C(t, e);
                        },
                        function(e) {
                          return I(t, e);
                        }
                      );
                }
                function P(t, e, n) {
                  e.constructor === t.constructor &&
                  n === f &&
                  e.constructor.resolve === m
                    ? x(t, e)
                    : n === at
                    ? (I(t, at.error), (at.error = null))
                    : void 0 === n
                    ? S(t, e)
                    : i(n)
                    ? w(t, e, n)
                    : S(t, e);
                }
                function C(e, i) {
                  e === i ? I(e, v()) : t(i) ? P(e, i, _(i)) : S(e, i);
                }
                function T(t) {
                  t._onerror && t._onerror(t._result), A(t);
                }
                function S(t, e) {
                  t._state === st &&
                    ((t._result = e),
                    (t._state = ot),
                    0 !== t._subscribers.length && Q(A, t));
                }
                function I(t, e) {
                  t._state === st &&
                    ((t._state = rt), (t._result = e), Q(T, t));
                }
                function E(t, e, i, n) {
                  var s = t._subscribers,
                    o = s.length;
                  (t._onerror = null),
                    (s[o] = e),
                    (s[o + ot] = i),
                    (s[o + rt] = n),
                    0 === o && t._state && Q(A, t);
                }
                function A(t) {
                  var e = t._subscribers,
                    i = t._state;
                  if (0 !== e.length) {
                    for (
                      var n = void 0, s = void 0, o = t._result, r = 0;
                      r < e.length;
                      r += 3
                    )
                      (n = e[r]), (s = e[r + i]), n ? O(i, n, s, o) : s(o);
                    t._subscribers.length = 0;
                  }
                }
                function R() {
                  this.error = null;
                }
                function k(t, e) {
                  try {
                    return t(e);
                  } catch (i) {
                    return (ht.error = i), ht;
                  }
                }
                function O(t, e, n, s) {
                  var o = i(n),
                    r = void 0,
                    a = void 0,
                    h = void 0,
                    l = void 0;
                  if (o) {
                    if (
                      ((r = k(n, s)) === ht
                        ? ((l = !0), (a = r.error), (r.error = null))
                        : (h = !0),
                      e === r)
                    )
                      return void I(e, y());
                  } else (r = s), (h = !0);
                  e._state !== st ||
                    (o && h
                      ? C(e, r)
                      : l
                      ? I(e, a)
                      : t === ot
                      ? S(e, r)
                      : t === rt && I(e, r));
                }
                function D(t, e) {
                  try {
                    e(
                      function(e) {
                        C(t, e);
                      },
                      function(e) {
                        I(t, e);
                      }
                    );
                  } catch (i) {
                    I(t, i);
                  }
                }
                function N() {
                  return lt++;
                }
                function j(t) {
                  (t[nt] = lt++),
                    (t._state = void 0),
                    (t._result = void 0),
                    (t._subscribers = []);
                }
                function z(t, e) {
                  (this._instanceConstructor = t),
                    (this.promise = new t(g)),
                    this.promise[nt] || j(this.promise),
                    K(e)
                      ? ((this.length = e.length),
                        (this._remaining = e.length),
                        (this._result = new Array(this.length)),
                        0 === this.length
                          ? S(this.promise, this._result)
                          : ((this.length = this.length || 0),
                            this._enumerate(e),
                            0 === this._remaining &&
                              S(this.promise, this._result)))
                      : I(this.promise, H());
                }
                function H() {
                  return new Error('Array Methods must be provided an Array');
                }
                function L(t) {
                  return new z(this, t).promise;
                }
                function U(t) {
                  var e = this;
                  return new e(
                    K(t)
                      ? function(i, n) {
                          for (var s = t.length, o = 0; o < s; o++)
                            e.resolve(t[o]).then(i, n);
                        }
                      : function(t, e) {
                          return e(
                            new TypeError('You must pass an array to race.')
                          );
                        }
                  );
                }
                function M(t) {
                  var e = new this(g);
                  return I(e, t), e;
                }
                function q() {
                  throw new TypeError(
                    'You must pass a resolver function as the first argument to the promise constructor'
                  );
                }
                function $() {
                  throw new TypeError(
                    "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                  );
                }
                function W(t) {
                  (this[nt] = N()),
                    (this._result = this._state = void 0),
                    (this._subscribers = []),
                    g !== t &&
                      ('function' != typeof t && q(),
                      this instanceof W ? D(this, t) : $());
                }
                function F() {
                  var t = void 0;
                  if (void 0 !== o) t = o;
                  else if ('undefined' != typeof self) t = self;
                  else
                    try {
                      t = Function('return this')();
                    } catch (e) {
                      throw new Error(
                        'polyfill failed because global object is unavailable in this environment'
                      );
                    }
                  var i = t.Promise;
                  if (i) {
                    var n = null;
                    try {
                      n = Object.prototype.toString.call(i.resolve());
                    } catch (e) {}
                    if ('[object Promise]' === n && !i.cast) return;
                  }
                  t.Promise = W;
                }
                var K = Array.isArray
                    ? Array.isArray
                    : function(t) {
                        return (
                          '[object Array]' === Object.prototype.toString.call(t)
                        );
                      },
                  B = 0,
                  V = void 0,
                  X = void 0,
                  Q = function(t, e) {
                    (et[B] = t),
                      (et[B + 1] = e),
                      2 === (B += 2) && (X ? X(p) : it());
                  },
                  Y = 'undefined' != typeof window ? window : void 0,
                  J = Y || {},
                  G = J.MutationObserver || J.WebKitMutationObserver,
                  Z =
                    'undefined' == typeof self &&
                    void 0 !== s &&
                    '[object process]' === {}.toString.call(s),
                  tt =
                    'undefined' != typeof Uint8ClampedArray &&
                    'undefined' != typeof importScripts &&
                    'undefined' != typeof MessageChannel,
                  et = new Array(1e3),
                  it = void 0;
                it = Z
                  ? a()
                  : G
                  ? l()
                  : tt
                  ? c()
                  : void 0 === Y && 'function' == typeof e
                  ? d()
                  : u();
                var nt = Math.random()
                    .toString(36)
                    .substring(16),
                  st = void 0,
                  ot = 1,
                  rt = 2,
                  at = new R(),
                  ht = new R(),
                  lt = 0;
                return (
                  (z.prototype._enumerate = function(t) {
                    for (var e = 0; this._state === st && e < t.length; e++)
                      this._eachEntry(t[e], e);
                  }),
                  (z.prototype._eachEntry = function(t, e) {
                    var i = this._instanceConstructor,
                      n = i.resolve;
                    if (n === m) {
                      var s = _(t);
                      if (s === f && t._state !== st)
                        this._settledAt(t._state, e, t._result);
                      else if ('function' != typeof s)
                        this._remaining--, (this._result[e] = t);
                      else if (i === W) {
                        var o = new i(g);
                        P(o, t, s), this._willSettleAt(o, e);
                      } else
                        this._willSettleAt(
                          new i(function(e) {
                            return e(t);
                          }),
                          e
                        );
                    } else this._willSettleAt(n(t), e);
                  }),
                  (z.prototype._settledAt = function(t, e, i) {
                    var n = this.promise;
                    n._state === st &&
                      (this._remaining--,
                      t === rt ? I(n, i) : (this._result[e] = i)),
                      0 === this._remaining && S(n, this._result);
                  }),
                  (z.prototype._willSettleAt = function(t, e) {
                    var i = this;
                    E(
                      t,
                      void 0,
                      function(t) {
                        return i._settledAt(ot, e, t);
                      },
                      function(t) {
                        return i._settledAt(rt, e, t);
                      }
                    );
                  }),
                  (W.all = L),
                  (W.race = U),
                  (W.resolve = m),
                  (W.reject = M),
                  (W._setScheduler = n),
                  (W._setAsap = r),
                  (W._asap = Q),
                  (W.prototype = {
                    constructor: W,
                    then: f,
                    catch: function(t) {
                      return this.then(null, t);
                    }
                  }),
                  (W.polyfill = F),
                  (W.Promise = W),
                  W
                );
              });
            }.call(
              this,
              e(12),
              'undefined' != typeof global
                ? global
                : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                ? window
                : {}
            ));
          },
          { 12: 12 }
        ],
        4: [
          function(t, e) {
            function i() {
              (this._events = this._events || {}),
                (this._maxListeners = this._maxListeners || void 0);
            }
            function n(t) {
              return 'function' == typeof t;
            }
            function s(t) {
              return 'number' == typeof t;
            }
            function o(t) {
              return 'object' == typeof t && null !== t;
            }
            function r(t) {
              return void 0 === t;
            }
            (e.exports = i),
              (i.EventEmitter = i),
              (i.prototype._events = void 0),
              (i.prototype._maxListeners = void 0),
              (i.defaultMaxListeners = 10),
              (i.prototype.setMaxListeners = function(t) {
                if (!s(t) || t < 0 || isNaN(t))
                  throw TypeError('n must be a positive number');
                return (this._maxListeners = t), this;
              }),
              (i.prototype.emit = function(t) {
                var e, i, s, a, h, l;
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
                if (r((i = this._events[t]))) return !1;
                if (n(i))
                  switch (arguments.length) {
                    case 1:
                      i.call(this);
                      break;
                    case 2:
                      i.call(this, arguments[1]);
                      break;
                    case 3:
                      i.call(this, arguments[1], arguments[2]);
                      break;
                    default:
                      (a = Array.prototype.slice.call(arguments, 1)),
                        i.apply(this, a);
                  }
                else if (o(i))
                  for (
                    a = Array.prototype.slice.call(arguments, 1),
                      s = (l = i.slice()).length,
                      h = 0;
                    h < s;
                    h++
                  )
                    l[h].apply(this, a);
                return !0;
              }),
              (i.prototype.addListener = function(t, e) {
                var s;
                if (!n(e)) throw TypeError('listener must be a function');
                return (
                  this._events || (this._events = {}),
                  this._events.newListener &&
                    this.emit('newListener', t, n(e.listener) ? e.listener : e),
                  this._events[t]
                    ? o(this._events[t])
                      ? this._events[t].push(e)
                      : (this._events[t] = [this._events[t], e])
                    : (this._events[t] = e),
                  o(this._events[t]) &&
                    !this._events[t].warned &&
                    (s = r(this._maxListeners)
                      ? i.defaultMaxListeners
                      : this._maxListeners) &&
                      s > 0 &&
                      this._events[t].length > s &&
                      ((this._events[t].warned = !0),
                      console.error(
                        '(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.',
                        this._events[t].length
                      ),
                      'function' == typeof console.trace && console.trace()),
                  this
                );
              }),
              (i.prototype.on = i.prototype.addListener),
              (i.prototype.once = function(t, e) {
                function i() {
                  this.removeListener(t, i),
                    s || ((s = !0), e.apply(this, arguments));
                }
                if (!n(e)) throw TypeError('listener must be a function');
                var s = !1;
                return (i.listener = e), this.on(t, i), this;
              }),
              (i.prototype.removeListener = function(t, e) {
                var i, s, r, a;
                if (!n(e)) throw TypeError('listener must be a function');
                if (!this._events || !this._events[t]) return this;
                if (
                  ((r = (i = this._events[t]).length),
                  (s = -1),
                  i === e || (n(i.listener) && i.listener === e))
                )
                  delete this._events[t],
                    this._events.removeListener &&
                      this.emit('removeListener', t, e);
                else if (o(i)) {
                  for (a = r; a-- > 0; )
                    if (i[a] === e || (i[a].listener && i[a].listener === e)) {
                      s = a;
                      break;
                    }
                  if (s < 0) return this;
                  1 === i.length
                    ? ((i.length = 0), delete this._events[t])
                    : i.splice(s, 1),
                    this._events.removeListener &&
                      this.emit('removeListener', t, e);
                }
                return this;
              }),
              (i.prototype.removeAllListeners = function(t) {
                var e, i;
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
                if (n((i = this._events[t]))) this.removeListener(t, i);
                else if (i)
                  for (; i.length; ) this.removeListener(t, i[i.length - 1]);
                return delete this._events[t], this;
              }),
              (i.prototype.listeners = function(t) {
                return this._events && this._events[t]
                  ? n(this._events[t])
                    ? [this._events[t]]
                    : this._events[t].slice()
                  : [];
              }),
              (i.prototype.listenerCount = function(t) {
                if (this._events) {
                  var e = this._events[t];
                  if (n(e)) return 1;
                  if (e) return e.length;
                }
                return 0;
              }),
              (i.listenerCount = function(t, e) {
                return t.listenerCount(e);
              });
          },
          {}
        ],
        5: [
          function(t, e) {
            var i = Object.prototype.hasOwnProperty,
              n = Object.prototype.toString;
            e.exports = function(t, e, s) {
              if ('[object Function]' !== n.call(e))
                throw new TypeError('iterator must be a function');
              var o = t.length;
              if (o === +o) for (var r = 0; r < o; r++) e.call(s, t[r], r, t);
              else for (var a in t) i.call(t, a) && e.call(s, t[a], a, t);
            };
          },
          {}
        ],
        6: [
          function(t, e) {
            (function(t) {
              var i;
              (i =
                'undefined' != typeof window
                  ? window
                  : void 0 !== t
                  ? t
                  : 'undefined' != typeof self
                  ? self
                  : {}),
                (e.exports = i);
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
        ],
        7: [
          function(t, e) {
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
                  var i = function() {};
                  (i.prototype = e.prototype),
                    (t.prototype = new i()),
                    (t.prototype.constructor = t);
                });
          },
          {}
        ],
        8: [
          function(t, e) {
            var i = {}.toString;
            e.exports =
              Array.isArray ||
              function(t) {
                return '[object Array]' == i.call(t);
              };
          },
          {}
        ],
        9: [
          function(t, e) {
            function i(t) {
              if (!((t = String(t)).length > 100)) {
                var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                  t
                );
                if (e) {
                  var i = parseFloat(e[1]);
                  switch ((e[2] || 'ms').toLowerCase()) {
                    case 'years':
                    case 'year':
                    case 'yrs':
                    case 'yr':
                    case 'y':
                      return i * c;
                    case 'days':
                    case 'day':
                    case 'd':
                      return i * l;
                    case 'hours':
                    case 'hour':
                    case 'hrs':
                    case 'hr':
                    case 'h':
                      return i * h;
                    case 'minutes':
                    case 'minute':
                    case 'mins':
                    case 'min':
                    case 'm':
                      return i * a;
                    case 'seconds':
                    case 'second':
                    case 'secs':
                    case 'sec':
                    case 's':
                      return i * r;
                    case 'milliseconds':
                    case 'millisecond':
                    case 'msecs':
                    case 'msec':
                    case 'ms':
                      return i;
                    default:
                      return;
                  }
                }
              }
            }
            function n(t) {
              return t >= l
                ? Math.round(t / l) + 'd'
                : t >= h
                ? Math.round(t / h) + 'h'
                : t >= a
                ? Math.round(t / a) + 'm'
                : t >= r
                ? Math.round(t / r) + 's'
                : t + 'ms';
            }
            function s(t) {
              return (
                o(t, l, 'day') ||
                o(t, h, 'hour') ||
                o(t, a, 'minute') ||
                o(t, r, 'second') ||
                t + ' ms'
              );
            }
            function o(t, e, i) {
              if (!(t < e))
                return t < 1.5 * e
                  ? Math.floor(t / e) + ' ' + i
                  : Math.ceil(t / e) + ' ' + i + 's';
            }
            var r = 1e3,
              a = 60 * r,
              h = 60 * a,
              l = 24 * h,
              c = 365.25 * l;
            e.exports = function(t, e) {
              e = e || {};
              var o = typeof t;
              if ('string' === o && t.length > 0) return i(t);
              if ('number' === o && !1 === isNaN(t))
                return e.long ? s(t) : n(t);
              throw new Error(
                'val is not a non-empty string or a valid number. val=' +
                  JSON.stringify(t)
              );
            };
          },
          {}
        ],
        10: [
          function(t, e) {
            'use strict';
            var i = Object.prototype.hasOwnProperty,
              n = Object.prototype.toString,
              s = Array.prototype.slice,
              o = t(11),
              r = Object.prototype.propertyIsEnumerable,
              a = !r.call({ toString: null }, 'toString'),
              h = r.call(function() {}, 'prototype'),
              l = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
              ],
              c = function(t) {
                var e = t.constructor;
                return e && e.prototype === t;
              },
              u = {
                $console: !0,
                $external: !0,
                $frame: !0,
                $frameElement: !0,
                $frames: !0,
                $innerHeight: !0,
                $innerWidth: !0,
                $outerHeight: !0,
                $outerWidth: !0,
                $pageXOffset: !0,
                $pageYOffset: !0,
                $parent: !0,
                $scrollLeft: !0,
                $scrollTop: !0,
                $scrollX: !0,
                $scrollY: !0,
                $self: !0,
                $webkitIndexedDB: !0,
                $webkitStorageInfo: !0,
                $window: !0
              },
              p = (function() {
                if ('undefined' == typeof window) return !1;
                for (var t in window)
                  try {
                    if (
                      !u['$' + t] &&
                      i.call(window, t) &&
                      null !== window[t] &&
                      'object' == typeof window[t]
                    )
                      try {
                        c(window[t]);
                      } catch (e) {
                        return !0;
                      }
                  } catch (e) {
                    return !0;
                  }
                return !1;
              })(),
              d = function(t) {
                if ('undefined' == typeof window || !p) return c(t);
                try {
                  return c(t);
                } catch (e) {
                  return !1;
                }
              },
              f = function(t) {
                var e = null !== t && 'object' == typeof t,
                  s = '[object Function]' === n.call(t),
                  r = o(t),
                  c = e && '[object String]' === n.call(t),
                  u = [];
                if (!e && !s && !r)
                  throw new TypeError('Object.keys called on a non-object');
                var p = h && s;
                if (c && t.length > 0 && !i.call(t, 0))
                  for (var f = 0; f < t.length; ++f) u.push(String(f));
                if (r && t.length > 0)
                  for (var m = 0; m < t.length; ++m) u.push(String(m));
                else
                  for (var g in t)
                    (p && 'prototype' === g) ||
                      !i.call(t, g) ||
                      u.push(String(g));
                if (a)
                  for (var v = d(t), y = 0; y < l.length; ++y)
                    (v && 'constructor' === l[y]) ||
                      !i.call(t, l[y]) ||
                      u.push(l[y]);
                return u;
              };
            (f.shim = function() {
              if (Object.keys) {
                if (
                  !(function() {
                    return 2 === (Object.keys(arguments) || '').length;
                  })(1, 2)
                ) {
                  var t = Object.keys;
                  Object.keys = function(e) {
                    return t(o(e) ? s.call(e) : e);
                  };
                }
              } else Object.keys = f;
              return Object.keys || f;
            }),
              (e.exports = f);
          },
          { 11: 11 }
        ],
        11: [
          function(t, e) {
            'use strict';
            var i = Object.prototype.toString;
            e.exports = function(t) {
              var e = i.call(t),
                n = '[object Arguments]' === e;
              return (
                n ||
                  (n =
                    '[object Array]' !== e &&
                    null !== t &&
                    'object' == typeof t &&
                    'number' == typeof t.length &&
                    t.length >= 0 &&
                    '[object Function]' === i.call(t.callee)),
                n
              );
            };
          },
          {}
        ],
        12: [
          function(t, e) {
            function i() {
              throw new Error('setTimeout has not been defined');
            }
            function n() {
              throw new Error('clearTimeout has not been defined');
            }
            function s(t) {
              if (c === setTimeout) return setTimeout(t, 0);
              if ((c === i || !c) && setTimeout)
                return (c = setTimeout), setTimeout(t, 0);
              try {
                return c(t, 0);
              } catch (e) {
                try {
                  return c.call(null, t, 0);
                } catch (e) {
                  return c.call(this, t, 0);
                }
              }
            }
            function o(t) {
              if (u === clearTimeout) return clearTimeout(t);
              if ((u === n || !u) && clearTimeout)
                return (u = clearTimeout), clearTimeout(t);
              try {
                return u(t);
              } catch (e) {
                try {
                  return u.call(null, t);
                } catch (e) {
                  return u.call(this, t);
                }
              }
            }
            function r() {
              m &&
                d &&
                ((m = !1),
                d.length ? (f = d.concat(f)) : (g = -1),
                f.length && a());
            }
            function a() {
              if (!m) {
                var t = s(r);
                m = !0;
                for (var e = f.length; e; ) {
                  for (d = f, f = []; ++g < e; ) d && d[g].run();
                  (g = -1), (e = f.length);
                }
                (d = null), (m = !1), o(t);
              }
            }
            function h(t, e) {
              (this.fun = t), (this.array = e);
            }
            function l() {}
            var c,
              u,
              p = (e.exports = {});
            !(function() {
              try {
                c = 'function' == typeof setTimeout ? setTimeout : i;
              } catch (t) {
                c = i;
              }
              try {
                u = 'function' == typeof clearTimeout ? clearTimeout : n;
              } catch (t) {
                u = n;
              }
            })();
            var d,
              f = [],
              m = !1,
              g = -1;
            (p.nextTick = function(t) {
              var e = new Array(arguments.length - 1);
              if (arguments.length > 1)
                for (var i = 1; i < arguments.length; i++)
                  e[i - 1] = arguments[i];
              f.push(new h(t, e)), 1 !== f.length || m || s(a);
            }),
              (h.prototype.run = function() {
                this.fun.apply(null, this.array);
              }),
              (p.title = 'browser'),
              (p.browser = !0),
              (p.env = {}),
              (p.argv = []),
              (p.version = ''),
              (p.versions = {}),
              (p.on = l),
              (p.addListener = l),
              (p.once = l),
              (p.off = l),
              (p.removeListener = l),
              (p.removeAllListeners = l),
              (p.emit = l),
              (p.binding = function() {
                throw new Error('process.binding is not supported');
              }),
              (p.cwd = function() {
                return '/';
              }),
              (p.chdir = function() {
                throw new Error('process.chdir is not supported');
              }),
              (p.umask = function() {
                return 0;
              });
          },
          {}
        ],
        13: [
          function(t, e) {
            'use strict';
            function i(t, e) {
              if (t.map) return t.map(e);
              for (var i = [], n = 0; n < t.length; n++) i.push(e(t[n], n));
              return i;
            }
            var n = function(t) {
              switch (typeof t) {
                case 'string':
                  return t;
                case 'boolean':
                  return t ? 'true' : 'false';
                case 'number':
                  return isFinite(t) ? t : '';
                default:
                  return '';
              }
            };
            e.exports = function(t, e, r, a) {
              return (
                (e = e || '&'),
                (r = r || '='),
                null === t && (t = void 0),
                'object' == typeof t
                  ? i(o(t), function(o) {
                      var a = encodeURIComponent(n(o)) + r;
                      return s(t[o])
                        ? i(t[o], function(t) {
                            return a + encodeURIComponent(n(t));
                          }).join(e)
                        : a + encodeURIComponent(n(t[o]));
                    }).join(e)
                  : a
                  ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(t))
                  : ''
              );
            };
            var s =
                Array.isArray ||
                function(t) {
                  return '[object Array]' === Object.prototype.toString.call(t);
                },
              o =
                Object.keys ||
                function(t) {
                  var e = [];
                  for (var i in t)
                    Object.prototype.hasOwnProperty.call(t, i) && e.push(i);
                  return e;
                };
          },
          {}
        ],
        14: [
          function(t, e) {
            function i() {
              a.apply(this, arguments);
            }
            function n() {
              var t =
                'Not implemented in this environment.\nIf you feel this is a mistake, write to support@algolia.com';
              throw new l.AlgoliaSearchError(t);
            }
            e.exports = i;
            var s = t(16),
              o = t(25),
              r = t(26),
              a = t(15),
              h = t(7),
              l = t(27);
            h(i, a),
              (i.prototype.deleteIndex = function(t, e) {
                return this._jsonRequest({
                  method: 'DELETE',
                  url: '/1/indexes/' + encodeURIComponent(t),
                  hostType: 'write',
                  callback: e
                });
              }),
              (i.prototype.moveIndex = function(t, e, i) {
                var n = { operation: 'move', destination: e };
                return this._jsonRequest({
                  method: 'POST',
                  url: '/1/indexes/' + encodeURIComponent(t) + '/operation',
                  body: n,
                  hostType: 'write',
                  callback: i
                });
              }),
              (i.prototype.copyIndex = function(t, e, i, n) {
                var s = { operation: 'copy', destination: e },
                  o = n;
                if ('function' == typeof i) o = i;
                else if (Array.isArray(i) && i.length > 0) s.scope = i;
                else if (void 0 !== i)
                  throw new Error(
                    'the scope given to `copyIndex` was not an array with settings, synonyms or rules'
                  );
                return this._jsonRequest({
                  method: 'POST',
                  url: '/1/indexes/' + encodeURIComponent(t) + '/operation',
                  body: s,
                  hostType: 'write',
                  callback: o
                });
              }),
              (i.prototype.getLogs = function(e, i, n) {
                var s = t(24),
                  o = {};
                return (
                  'object' == typeof e
                    ? ((o = s(e)), (n = i))
                    : 0 === arguments.length || 'function' == typeof e
                    ? (n = e)
                    : 1 === arguments.length || 'function' == typeof i
                    ? ((n = i), (o.offset = e))
                    : ((o.offset = e), (o.length = i)),
                  void 0 === o.offset && (o.offset = 0),
                  void 0 === o.length && (o.length = 10),
                  this._jsonRequest({
                    method: 'GET',
                    url: '/1/logs?' + this._getSearchParams(o, ''),
                    hostType: 'read',
                    callback: n
                  })
                );
              }),
              (i.prototype.listIndexes = function(t, e) {
                var i = '';
                return (
                  void 0 === t || 'function' == typeof t
                    ? (e = t)
                    : (i = '?page=' + t),
                  this._jsonRequest({
                    method: 'GET',
                    url: '/1/indexes' + i,
                    hostType: 'read',
                    callback: e
                  })
                );
              }),
              (i.prototype.initIndex = function(t) {
                return new s(this, t);
              }),
              (i.prototype.listUserKeys = o(function(t) {
                return this.listApiKeys(t);
              }, r('client.listUserKeys()', 'client.listApiKeys()'))),
              (i.prototype.listApiKeys = function(t) {
                return this._jsonRequest({
                  method: 'GET',
                  url: '/1/keys',
                  hostType: 'read',
                  callback: t
                });
              }),
              (i.prototype.getUserKeyACL = o(function(t, e) {
                return this.getApiKey(t, e);
              }, r('client.getUserKeyACL()', 'client.getApiKey()'))),
              (i.prototype.getApiKey = function(t, e) {
                return this._jsonRequest({
                  method: 'GET',
                  url: '/1/keys/' + t,
                  hostType: 'read',
                  callback: e
                });
              }),
              (i.prototype.deleteUserKey = o(function(t, e) {
                return this.deleteApiKey(t, e);
              }, r('client.deleteUserKey()', 'client.deleteApiKey()'))),
              (i.prototype.deleteApiKey = function(t, e) {
                return this._jsonRequest({
                  method: 'DELETE',
                  url: '/1/keys/' + t,
                  hostType: 'write',
                  callback: e
                });
              }),
              (i.prototype.addUserKey = o(function(t, e, i) {
                return this.addApiKey(t, e, i);
              }, r('client.addUserKey()', 'client.addApiKey()'))),
              (i.prototype.addApiKey = function(e, i, n) {
                var s =
                  'Usage: client.addApiKey(arrayOfAcls[, params, callback])';
                if (!t(8)(e)) throw new Error(s);
                (1 !== arguments.length && 'function' != typeof i) ||
                  ((n = i), (i = null));
                var o = { acl: e };
                return (
                  i &&
                    ((o.validity = i.validity),
                    (o.maxQueriesPerIPPerHour = i.maxQueriesPerIPPerHour),
                    (o.maxHitsPerQuery = i.maxHitsPerQuery),
                    (o.indexes = i.indexes),
                    (o.description = i.description),
                    i.queryParameters &&
                      (o.queryParameters = this._getSearchParams(
                        i.queryParameters,
                        ''
                      )),
                    (o.referers = i.referers)),
                  this._jsonRequest({
                    method: 'POST',
                    url: '/1/keys',
                    body: o,
                    hostType: 'write',
                    callback: n
                  })
                );
              }),
              (i.prototype.addUserKeyWithValidity = o(function(t, e, i) {
                return this.addApiKey(t, e, i);
              }, r('client.addUserKeyWithValidity()', 'client.addApiKey()'))),
              (i.prototype.updateUserKey = o(function(t, e, i, n) {
                return this.updateApiKey(t, e, i, n);
              }, r('client.updateUserKey()', 'client.updateApiKey()'))),
              (i.prototype.updateApiKey = function(e, i, n, s) {
                var o =
                  'Usage: client.updateApiKey(key, arrayOfAcls[, params, callback])';
                if (!t(8)(i)) throw new Error(o);
                (2 !== arguments.length && 'function' != typeof n) ||
                  ((s = n), (n = null));
                var r = { acl: i };
                return (
                  n &&
                    ((r.validity = n.validity),
                    (r.maxQueriesPerIPPerHour = n.maxQueriesPerIPPerHour),
                    (r.maxHitsPerQuery = n.maxHitsPerQuery),
                    (r.indexes = n.indexes),
                    (r.description = n.description),
                    n.queryParameters &&
                      (r.queryParameters = this._getSearchParams(
                        n.queryParameters,
                        ''
                      )),
                    (r.referers = n.referers)),
                  this._jsonRequest({
                    method: 'PUT',
                    url: '/1/keys/' + e,
                    body: r,
                    hostType: 'write',
                    callback: s
                  })
                );
              }),
              (i.prototype.startQueriesBatch = o(function() {
                this._batch = [];
              }, r('client.startQueriesBatch()', 'client.search()'))),
              (i.prototype.addQueryInBatch = o(function(t, e, i) {
                this._batch.push({ indexName: t, query: e, params: i });
              }, r('client.addQueryInBatch()', 'client.search()'))),
              (i.prototype.sendQueriesBatch = o(function(t) {
                return this.search(this._batch, t);
              }, r('client.sendQueriesBatch()', 'client.search()'))),
              (i.prototype.batch = function(e, i) {
                var n = 'Usage: client.batch(operations[, callback])';
                if (!t(8)(e)) throw new Error(n);
                return this._jsonRequest({
                  method: 'POST',
                  url: '/1/indexes/*/batch',
                  body: { requests: e },
                  hostType: 'write',
                  callback: i
                });
              }),
              (i.prototype.assignUserID = function(t, e) {
                if (!t.userID || !t.cluster)
                  throw new l.AlgoliaSearchError(
                    'You have to provide both a userID and cluster',
                    t
                  );
                return this._jsonRequest({
                  method: 'POST',
                  url: '/1/clusters/mapping',
                  hostType: 'write',
                  body: { cluster: t.cluster },
                  callback: e,
                  headers: { 'X-Algolia-User-ID': t.userID }
                });
              }),
              (i.prototype.getTopUserID = function(t) {
                return this._jsonRequest({
                  method: 'GET',
                  url: '/1/clusters/mapping/top',
                  hostType: 'read',
                  callback: t
                });
              }),
              (i.prototype.getUserID = function(t, e) {
                if (!t.userID)
                  throw new l.AlgoliaSearchError(
                    'You have to provide a userID',
                    { debugData: t }
                  );
                return this._jsonRequest({
                  method: 'GET',
                  url: '/1/clusters/mapping/' + t.userID,
                  hostType: 'read',
                  callback: e
                });
              }),
              (i.prototype.listClusters = function(t) {
                return this._jsonRequest({
                  method: 'GET',
                  url: '/1/clusters',
                  hostType: 'read',
                  callback: t
                });
              }),
              (i.prototype.listUserIDs = function(t, e) {
                return this._jsonRequest({
                  method: 'GET',
                  url: '/1/clusters/mapping',
                  body: t,
                  hostType: 'read',
                  callback: e
                });
              }),
              (i.prototype.removeUserID = function(t, e) {
                if (!t.userID)
                  throw new l.AlgoliaSearchError(
                    'You have to provide a userID',
                    { debugData: t }
                  );
                return this._jsonRequest({
                  method: 'DELETE',
                  url: '/1/clusters/mapping',
                  hostType: 'write',
                  callback: e,
                  headers: { 'X-Algolia-User-ID': t.userID }
                });
              }),
              (i.prototype.searchUserIDs = function(t, e) {
                return this._jsonRequest({
                  method: 'POST',
                  url: '/1/clusters/mapping/search',
                  body: t,
                  hostType: 'read',
                  callback: e
                });
              }),
              (i.prototype.destroy = n),
              (i.prototype.enableRateLimitForward = n),
              (i.prototype.disableRateLimitForward = n),
              (i.prototype.useSecuredAPIKey = n),
              (i.prototype.disableSecuredAPIKey = n),
              (i.prototype.generateSecuredApiKey = n);
          },
          { 15: 15, 16: 16, 24: 24, 25: 25, 26: 26, 27: 27, 7: 7, 8: 8 }
        ],
        15: [
          function(t, e) {
            (function(i) {
              function n(e, i, n) {
                var o = t(1)('algoliasearch'),
                  r = t(24),
                  a = t(8),
                  l = t(29),
                  c = 'Usage: algoliasearch(applicationID, apiKey, opts)';
                if (!0 !== n._allowEmptyCredentials && !e)
                  throw new h.AlgoliaSearchError(
                    'Please provide an application ID. ' + c
                  );
                if (!0 !== n._allowEmptyCredentials && !i)
                  throw new h.AlgoliaSearchError(
                    'Please provide an API key. ' + c
                  );
                (this.applicationID = e),
                  (this.apiKey = i),
                  (this.hosts = { read: [], write: [] }),
                  (n = n || {}),
                  (this._timeouts = n.timeouts || {
                    connect: 1e3,
                    read: 2e3,
                    write: 3e4
                  }),
                  n.timeout &&
                    (this._timeouts.connect = this._timeouts.read = this._timeouts.write =
                      n.timeout);
                var u = n.protocol || 'https:';
                if (
                  (/:$/.test(u) || (u += ':'), 'http:' !== u && 'https:' !== u)
                )
                  throw new h.AlgoliaSearchError(
                    'protocol must be `http:` or `https:` (was `' +
                      n.protocol +
                      '`)'
                  );
                if ((this._checkAppIdData(), n.hosts))
                  a(n.hosts)
                    ? ((this.hosts.read = r(n.hosts)),
                      (this.hosts.write = r(n.hosts)))
                    : ((this.hosts.read = r(n.hosts.read)),
                      (this.hosts.write = r(n.hosts.write)));
                else {
                  var p = l(this._shuffleResult, function(t) {
                      return e + '-' + t + '.algolianet.com';
                    }),
                    d = (!1 === n.dsn ? '' : '-dsn') + '.algolia.net';
                  (this.hosts.read = [this.applicationID + d].concat(p)),
                    (this.hosts.write = [
                      this.applicationID + '.algolia.net'
                    ].concat(p));
                }
                (this.hosts.read = l(this.hosts.read, s(u))),
                  (this.hosts.write = l(this.hosts.write, s(u))),
                  (this.extraHeaders = {}),
                  (this.cache = n._cache || {}),
                  (this._ua = n._ua),
                  (this._useCache =
                    !(void 0 !== n._useCache && !n._cache) || n._useCache),
                  (this._useFallback =
                    void 0 === n.useFallback || n.useFallback),
                  (this._setTimeout = n._setTimeout),
                  o('init done, %j', this);
              }
              function s(t) {
                return function(e) {
                  return t + '//' + e.toLowerCase();
                };
              }
              function o(t) {
                if (void 0 === Array.prototype.toJSON) return JSON.stringify(t);
                var e = Array.prototype.toJSON;
                delete Array.prototype.toJSON;
                var i = JSON.stringify(t);
                return (Array.prototype.toJSON = e), i;
              }
              function r(t) {
                for (var e, i, n = t.length; 0 !== n; )
                  (i = Math.floor(Math.random() * n)),
                    (e = t[(n -= 1)]),
                    (t[n] = t[i]),
                    (t[i] = e);
                return t;
              }
              function a(t) {
                var e = {};
                for (var i in t)
                  if (Object.prototype.hasOwnProperty.call(t, i)) {
                    var n;
                    (n =
                      'x-algolia-api-key' === i ||
                      'x-algolia-application-id' === i
                        ? '**hidden for security purposes**'
                        : t[i]),
                      (e[i] = n);
                  }
                return e;
              }
              e.exports = n;
              var h = t(27),
                l = t(28),
                c = t(18),
                u = t(33),
                p = 500,
                d =
                  (i.env.RESET_APP_DATA_TIMER &&
                    parseInt(i.env.RESET_APP_DATA_TIMER, 10)) ||
                  12e4;
              (n.prototype.initIndex = function(t) {
                return new c(this, t);
              }),
                (n.prototype.setExtraHeader = function(t, e) {
                  this.extraHeaders[t.toLowerCase()] = e;
                }),
                (n.prototype.getExtraHeader = function(t) {
                  return this.extraHeaders[t.toLowerCase()];
                }),
                (n.prototype.unsetExtraHeader = function(t) {
                  delete this.extraHeaders[t.toLowerCase()];
                }),
                (n.prototype.addAlgoliaAgent = function(t) {
                  -1 === this._ua.indexOf(';' + t) && (this._ua += ';' + t);
                }),
                (n.prototype._jsonRequest = function(e) {
                  function i(t, l) {
                    function p(t) {
                      var e =
                        (t && t.body && t.body.message && t.body.status) ||
                        t.statusCode ||
                        (t && t.body && 200);
                      r(
                        'received response: statusCode: %s, computed statusCode: %d, headers: %j',
                        t.statusCode,
                        e,
                        t.headers
                      );
                      var i = 2 === Math.floor(e / 100),
                        o = new Date();
                      if (
                        (v.push({
                          currentHost: P,
                          headers: a(s),
                          content: n || null,
                          contentLength: void 0 !== n ? n.length : null,
                          method: l.method,
                          timeouts: l.timeouts,
                          url: l.url,
                          startTime: x,
                          endTime: o,
                          duration: o - x,
                          statusCode: e
                        }),
                        i)
                      )
                        return (
                          d._useCache && u && (u[w] = t.responseText), t.body
                        );
                      if (4 !== Math.floor(e / 100)) return (f += 1), _();
                      r('unrecoverable error');
                      var c = new h.AlgoliaSearchError(
                        t.body && t.body.message,
                        { debugData: v, statusCode: e }
                      );
                      return d._promise.reject(c);
                    }
                    function y(t) {
                      r('error: %s, stack: %s', t.message, t.stack);
                      var i = new Date();
                      return (
                        v.push({
                          currentHost: P,
                          headers: a(s),
                          content: n || null,
                          contentLength: void 0 !== n ? n.length : null,
                          method: l.method,
                          timeouts: l.timeouts,
                          url: l.url,
                          startTime: x,
                          endTime: i,
                          duration: i - x
                        }),
                        t instanceof h.AlgoliaSearchError ||
                          (t = new h.Unknown(t && t.message, t)),
                        (f += 1),
                        t instanceof h.Unknown ||
                        t instanceof h.UnparsableJSON ||
                        (f >= d.hosts[e.hostType].length && (m || !g))
                          ? ((t.debugData = v), d._promise.reject(t))
                          : t instanceof h.RequestTimeout
                          ? b()
                          : _()
                      );
                    }
                    function _() {
                      return (
                        r('retrying request'),
                        d._incrementHostIndex(e.hostType),
                        i(t, l)
                      );
                    }
                    function b() {
                      return (
                        r('retrying request with higher timeout'),
                        d._incrementHostIndex(e.hostType),
                        d._incrementTimeoutMultipler(),
                        (l.timeouts = d._getTimeoutsForRequest(e.hostType)),
                        i(t, l)
                      );
                    }
                    d._checkAppIdData();
                    var w,
                      x = new Date();
                    if (
                      (d._useCache && (w = e.url),
                      d._useCache && n && (w += '_body_' + l.body),
                      d._useCache && u && void 0 !== u[w])
                    )
                      return (
                        r('serving response from cache'),
                        d._promise.resolve(JSON.parse(u[w]))
                      );
                    if (f >= d.hosts[e.hostType].length)
                      return !g || m
                        ? (r('could not get any response'),
                          d._promise.reject(
                            new h.AlgoliaSearchError(
                              'Cannot connect to the AlgoliaSearch API. Send an email to support@algolia.com to report and resolve the issue. Application id was: ' +
                                d.applicationID,
                              { debugData: v }
                            )
                          ))
                        : (r('switching to fallback'),
                          (f = 0),
                          (l.method = e.fallback.method),
                          (l.url = e.fallback.url),
                          (l.jsonBody = e.fallback.body),
                          l.jsonBody && (l.body = o(l.jsonBody)),
                          (s = d._computeRequestHeaders({
                            additionalUA: c,
                            headers: e.headers
                          })),
                          (l.timeouts = d._getTimeoutsForRequest(e.hostType)),
                          d._setHostIndexByType(0, e.hostType),
                          (m = !0),
                          i(d._request.fallback, l));
                    var P = d._getHostByType(e.hostType),
                      C = P + l.url,
                      T = {
                        body: l.body,
                        jsonBody: l.jsonBody,
                        method: l.method,
                        headers: s,
                        timeouts: l.timeouts,
                        debug: r
                      };
                    return (
                      r(
                        'method: %s, url: %s, headers: %j, timeouts: %d',
                        T.method,
                        C,
                        T.headers,
                        T.timeouts
                      ),
                      t === d._request.fallback && r('using fallback'),
                      t.call(d, C, T).then(p, y)
                    );
                  }
                  this._checkAppIdData();
                  var n,
                    s,
                    r = t(1)('algoliasearch:' + e.url),
                    c = e.additionalUA || '',
                    u = e.cache,
                    d = this,
                    f = 0,
                    m = !1,
                    g = d._useFallback && d._request.fallback && e.fallback;
                  this.apiKey.length > p &&
                  void 0 !== e.body &&
                  (void 0 !== e.body.params || void 0 !== e.body.requests)
                    ? ((e.body.apiKey = this.apiKey),
                      (s = this._computeRequestHeaders({
                        additionalUA: c,
                        withApiKey: !1,
                        headers: e.headers
                      })))
                    : (s = this._computeRequestHeaders({
                        additionalUA: c,
                        headers: e.headers
                      })),
                    void 0 !== e.body && (n = o(e.body)),
                    r('request start');
                  var v = [],
                    y = i(d._request, {
                      url: e.url,
                      method: e.method,
                      body: n,
                      jsonBody: e.body,
                      timeouts: d._getTimeoutsForRequest(e.hostType)
                    });
                  return 'function' != typeof e.callback
                    ? y
                    : void y.then(
                        function(t) {
                          l(function() {
                            e.callback(null, t);
                          }, d._setTimeout || setTimeout);
                        },
                        function(t) {
                          l(function() {
                            e.callback(t);
                          }, d._setTimeout || setTimeout);
                        }
                      );
                }),
                (n.prototype._getSearchParams = function(t, e) {
                  if (null == t) return e;
                  for (var i in t)
                    null !== i &&
                      void 0 !== t[i] &&
                      t.hasOwnProperty(i) &&
                      ((e += '' === e ? '' : '&'),
                      (e +=
                        i +
                        '=' +
                        encodeURIComponent(
                          '[object Array]' ===
                            Object.prototype.toString.call(t[i])
                            ? o(t[i])
                            : t[i]
                        )));
                  return e;
                }),
                (n.prototype._computeRequestHeaders = function(e) {
                  var i = t(5),
                    n = {
                      'x-algolia-agent': e.additionalUA
                        ? this._ua + ';' + e.additionalUA
                        : this._ua,
                      'x-algolia-application-id': this.applicationID
                    };
                  return (
                    !1 !== e.withApiKey &&
                      (n['x-algolia-api-key'] = this.apiKey),
                    this.userToken &&
                      (n['x-algolia-usertoken'] = this.userToken),
                    this.securityTags &&
                      (n['x-algolia-tagfilters'] = this.securityTags),
                    i(this.extraHeaders, function(t, e) {
                      n[e] = t;
                    }),
                    e.headers &&
                      i(e.headers, function(t, e) {
                        n[e] = t;
                      }),
                    n
                  );
                }),
                (n.prototype.search = function(e, i, n) {
                  var s = t(8),
                    o = t(29),
                    r = 'Usage: client.search(arrayOfQueries[, callback])';
                  if (!s(e)) throw new Error(r);
                  'function' == typeof i
                    ? ((n = i), (i = {}))
                    : void 0 === i && (i = {});
                  var a = this,
                    h = {
                      requests: o(e, function(t) {
                        var e = '';
                        return (
                          void 0 !== t.query &&
                            (e += 'query=' + encodeURIComponent(t.query)),
                          {
                            indexName: t.indexName,
                            params: a._getSearchParams(t.params, e)
                          }
                        );
                      })
                    },
                    l = o(h.requests, function(t, e) {
                      return (
                        e +
                        '=' +
                        encodeURIComponent(
                          '/1/indexes/' +
                            encodeURIComponent(t.indexName) +
                            '?' +
                            t.params
                        )
                      );
                    }).join('&'),
                    c = '/1/indexes/*/queries';
                  return (
                    void 0 !== i.strategy && (c += '?strategy=' + i.strategy),
                    this._jsonRequest({
                      cache: this.cache,
                      method: 'POST',
                      url: c,
                      body: h,
                      hostType: 'read',
                      fallback: {
                        method: 'GET',
                        url: '/1/indexes/*',
                        body: { params: l }
                      },
                      callback: n
                    })
                  );
                }),
                (n.prototype.setSecurityTags = function(t) {
                  if ('[object Array]' === Object.prototype.toString.call(t)) {
                    for (var e = [], i = 0; i < t.length; ++i)
                      if (
                        '[object Array]' ===
                        Object.prototype.toString.call(t[i])
                      ) {
                        for (var n = [], s = 0; s < t[i].length; ++s)
                          n.push(t[i][s]);
                        e.push('(' + n.join(',') + ')');
                      } else e.push(t[i]);
                    t = e.join(',');
                  }
                  this.securityTags = t;
                }),
                (n.prototype.setUserToken = function(t) {
                  this.userToken = t;
                }),
                (n.prototype.clearCache = function() {
                  this.cache = {};
                }),
                (n.prototype.setRequestTimeout = function(t) {
                  t &&
                    (this._timeouts.connect = this._timeouts.read = this._timeouts.write = t);
                }),
                (n.prototype.setTimeouts = function(t) {
                  this._timeouts = t;
                }),
                (n.prototype.getTimeouts = function() {
                  return this._timeouts;
                }),
                (n.prototype._getAppIdData = function() {
                  var t = u.get(this.applicationID);
                  return null !== t && this._cacheAppIdData(t), t;
                }),
                (n.prototype._setAppIdData = function(t) {
                  return (
                    (t.lastChange = new Date().getTime()),
                    this._cacheAppIdData(t),
                    u.set(this.applicationID, t)
                  );
                }),
                (n.prototype._checkAppIdData = function() {
                  var t = this._getAppIdData(),
                    e = new Date().getTime();
                  return null === t || e - t.lastChange > d
                    ? this._resetInitialAppIdData(t)
                    : t;
                }),
                (n.prototype._resetInitialAppIdData = function(t) {
                  var e = t || {};
                  return (
                    (e.hostIndexes = { read: 0, write: 0 }),
                    (e.timeoutMultiplier = 1),
                    (e.shuffleResult = e.shuffleResult || r([1, 2, 3])),
                    this._setAppIdData(e)
                  );
                }),
                (n.prototype._cacheAppIdData = function(t) {
                  (this._hostIndexes = t.hostIndexes),
                    (this._timeoutMultiplier = t.timeoutMultiplier),
                    (this._shuffleResult = t.shuffleResult);
                }),
                (n.prototype._partialAppIdDataUpdate = function(e) {
                  var i = t(5),
                    n = this._getAppIdData();
                  return (
                    i(e, function(t, e) {
                      n[e] = t;
                    }),
                    this._setAppIdData(n)
                  );
                }),
                (n.prototype._getHostByType = function(t) {
                  return this.hosts[t][this._getHostIndexByType(t)];
                }),
                (n.prototype._getTimeoutMultiplier = function() {
                  return this._timeoutMultiplier;
                }),
                (n.prototype._getHostIndexByType = function(t) {
                  return this._hostIndexes[t];
                }),
                (n.prototype._setHostIndexByType = function(e, i) {
                  var n = t(24)(this._hostIndexes);
                  return (
                    (n[i] = e),
                    this._partialAppIdDataUpdate({ hostIndexes: n }),
                    e
                  );
                }),
                (n.prototype._incrementHostIndex = function(t) {
                  return this._setHostIndexByType(
                    (this._getHostIndexByType(t) + 1) % this.hosts[t].length,
                    t
                  );
                }),
                (n.prototype._incrementTimeoutMultipler = function() {
                  var t = Math.max(this._timeoutMultiplier + 1, 4);
                  return this._partialAppIdDataUpdate({ timeoutMultiplier: t });
                }),
                (n.prototype._getTimeoutsForRequest = function(t) {
                  return {
                    connect: this._timeouts.connect * this._timeoutMultiplier,
                    complete: this._timeouts[t] * this._timeoutMultiplier
                  };
                });
            }.call(this, t(12)));
          },
          {
            1: 1,
            12: 12,
            18: 18,
            24: 24,
            27: 27,
            28: 28,
            29: 29,
            33: 33,
            5: 5,
            8: 8
          }
        ],
        16: [
          function(t, e) {
            function i() {
              o.apply(this, arguments);
            }
            function n(t, e, i) {
              function n(i, s) {
                var o = { page: i || 0, hitsPerPage: e || 100 },
                  r = s || [];
                return t(o).then(function(t) {
                  var e = t.hits,
                    i = t.nbHits,
                    s = e.map(function(t) {
                      return delete t._highlightResult, t;
                    }),
                    a = r.concat(s);
                  return a.length < i ? n(o.page + 1, a) : a;
                });
              }
              return n().then(function(t) {
                return 'function' == typeof i ? void i(t) : t;
              });
            }
            var s = t(7),
              o = t(18),
              r = t(25),
              a = t(26),
              h = t(28),
              l = t(27),
              c = r(function() {}, a('forwardToSlaves', 'forwardToReplicas'));
            (e.exports = i),
              s(i, o),
              (i.prototype.addObject = function(t, e, i) {
                var n = this;
                return (
                  (1 !== arguments.length && 'function' != typeof e) ||
                    ((i = e), (e = void 0)),
                  this.as._jsonRequest({
                    method: void 0 !== e ? 'PUT' : 'POST',
                    url:
                      '/1/indexes/' +
                      encodeURIComponent(n.indexName) +
                      (void 0 !== e ? '/' + encodeURIComponent(e) : ''),
                    body: t,
                    hostType: 'write',
                    callback: i
                  })
                );
              }),
              (i.prototype.addObjects = function(e, i) {
                var n = 'Usage: index.addObjects(arrayOfObjects[, callback])';
                if (!t(8)(e)) throw new Error(n);
                for (
                  var s = this, o = { requests: [] }, r = 0;
                  r < e.length;
                  ++r
                ) {
                  var a = { action: 'addObject', body: e[r] };
                  o.requests.push(a);
                }
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' + encodeURIComponent(s.indexName) + '/batch',
                  body: o,
                  hostType: 'write',
                  callback: i
                });
              }),
              (i.prototype.partialUpdateObject = function(t, e, i) {
                (1 !== arguments.length && 'function' != typeof e) ||
                  ((i = e), (e = void 0));
                var n =
                  '/1/indexes/' +
                  encodeURIComponent(this.indexName) +
                  '/' +
                  encodeURIComponent(t.objectID) +
                  '/partial';
                return (
                  !1 === e && (n += '?createIfNotExists=false'),
                  this.as._jsonRequest({
                    method: 'POST',
                    url: n,
                    body: t,
                    hostType: 'write',
                    callback: i
                  })
                );
              }),
              (i.prototype.partialUpdateObjects = function(e, i, n) {
                (1 !== arguments.length && 'function' != typeof i) ||
                  ((n = i), (i = !0));
                var s =
                  'Usage: index.partialUpdateObjects(arrayOfObjects[, callback])';
                if (!t(8)(e)) throw new Error(s);
                for (
                  var o = this, r = { requests: [] }, a = 0;
                  a < e.length;
                  ++a
                ) {
                  var h = {
                    action:
                      !0 === i
                        ? 'partialUpdateObject'
                        : 'partialUpdateObjectNoCreate',
                    objectID: e[a].objectID,
                    body: e[a]
                  };
                  r.requests.push(h);
                }
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' + encodeURIComponent(o.indexName) + '/batch',
                  body: r,
                  hostType: 'write',
                  callback: n
                });
              }),
              (i.prototype.saveObject = function(t, e) {
                var i = this;
                return this.as._jsonRequest({
                  method: 'PUT',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(i.indexName) +
                    '/' +
                    encodeURIComponent(t.objectID),
                  body: t,
                  hostType: 'write',
                  callback: e
                });
              }),
              (i.prototype.saveObjects = function(e, i) {
                var n = 'Usage: index.saveObjects(arrayOfObjects[, callback])';
                if (!t(8)(e)) throw new Error(n);
                for (
                  var s = this, o = { requests: [] }, r = 0;
                  r < e.length;
                  ++r
                ) {
                  var a = {
                    action: 'updateObject',
                    objectID: e[r].objectID,
                    body: e[r]
                  };
                  o.requests.push(a);
                }
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' + encodeURIComponent(s.indexName) + '/batch',
                  body: o,
                  hostType: 'write',
                  callback: i
                });
              }),
              (i.prototype.deleteObject = function(t, e) {
                if (
                  'function' == typeof t ||
                  ('string' != typeof t && 'number' != typeof t)
                ) {
                  var i = new l.AlgoliaSearchError(
                    'Cannot delete an object without an objectID'
                  );
                  return 'function' == typeof (e = t)
                    ? e(i)
                    : this.as._promise.reject(i);
                }
                var n = this;
                return this.as._jsonRequest({
                  method: 'DELETE',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(n.indexName) +
                    '/' +
                    encodeURIComponent(t),
                  hostType: 'write',
                  callback: e
                });
              }),
              (i.prototype.deleteObjects = function(e, i) {
                var n = t(8),
                  s = t(29),
                  o =
                    'Usage: index.deleteObjects(arrayOfObjectIDs[, callback])';
                if (!n(e)) throw new Error(o);
                var r = this,
                  a = {
                    requests: s(e, function(t) {
                      return {
                        action: 'deleteObject',
                        objectID: t,
                        body: { objectID: t }
                      };
                    })
                  };
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' + encodeURIComponent(r.indexName) + '/batch',
                  body: a,
                  hostType: 'write',
                  callback: i
                });
              }),
              (i.prototype.deleteByQuery = r(function(e, i, n) {
                function s(t) {
                  if (0 === t.nbHits) return t;
                  var e = u(t.hits, function(t) {
                    return t.objectID;
                  });
                  return p
                    .deleteObjects(e)
                    .then(o)
                    .then(r);
                }
                function o(t) {
                  return p.waitTask(t.taskID);
                }
                function r() {
                  return p.deleteByQuery(e, i);
                }
                function a() {
                  h(function() {
                    n(null);
                  }, d._setTimeout || setTimeout);
                }
                function l(t) {
                  h(function() {
                    n(t);
                  }, d._setTimeout || setTimeout);
                }
                var c = t(24),
                  u = t(29),
                  p = this,
                  d = p.as;
                1 === arguments.length || 'function' == typeof i
                  ? ((n = i), (i = {}))
                  : (i = c(i)),
                  (i.attributesToRetrieve = 'objectID'),
                  (i.hitsPerPage = 1e3),
                  (i.distinct = !1),
                  this.clearCache();
                var f = this.search(e, i).then(s);
                return n ? void f.then(a, l) : f;
              }, a('index.deleteByQuery()', 'index.deleteBy()'))),
              (i.prototype.deleteBy = function(t, e) {
                var i = this;
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(i.indexName) +
                    '/deleteByQuery',
                  body: { params: i.as._getSearchParams(t, '') },
                  hostType: 'write',
                  callback: e
                });
              }),
              (i.prototype.browseAll = function(e, i) {
                function n(t) {
                  var e;
                  r._stopped ||
                    ((e = void 0 !== t ? { cursor: t } : { params: l }),
                    a._jsonRequest({
                      method: 'POST',
                      url:
                        '/1/indexes/' +
                        encodeURIComponent(h.indexName) +
                        '/browse',
                      hostType: 'read',
                      body: e,
                      callback: s
                    }));
                }
                function s(t, e) {
                  if (!r._stopped)
                    return t
                      ? void r._error(t)
                      : (r._result(e),
                        void 0 === e.cursor ? void r._end() : void n(e.cursor));
                }
                'object' == typeof e && ((i = e), (e = void 0));
                var o = t(30),
                  r = new (t(17))(),
                  a = this.as,
                  h = this,
                  l = a._getSearchParams(o({}, i || {}, { query: e }), '');
                return n(), r;
              }),
              (i.prototype.ttAdapter = r(function(t) {
                var e = this;
                return function(i, n, s) {
                  var o;
                  (o = 'function' == typeof s ? s : n),
                    e.search(i, t, function(t, e) {
                      return t ? void o(t) : void o(e.hits);
                    });
                };
              }, 'ttAdapter is not necessary anymore and will be removed in the next version,\nhave a look at autocomplete.js (https://github.com/algolia/autocomplete.js)')),
              (i.prototype.waitTask = function(t, e) {
                function i() {
                  return c
                    ._jsonRequest({
                      method: 'GET',
                      hostType: 'read',
                      url:
                        '/1/indexes/' +
                        encodeURIComponent(l.indexName) +
                        '/task/' +
                        t
                    })
                    .then(function(t) {
                      var e = o * ++a * a;
                      return (
                        e > r && (e = r),
                        'published' !== t.status
                          ? c._promise.delay(e).then(i)
                          : t
                      );
                    });
                }
                function n(t) {
                  h(function() {
                    e(null, t);
                  }, c._setTimeout || setTimeout);
                }
                function s(t) {
                  h(function() {
                    e(t);
                  }, c._setTimeout || setTimeout);
                }
                var o = 100,
                  r = 5e3,
                  a = 0,
                  l = this,
                  c = l.as,
                  u = i();
                return e ? void u.then(n, s) : u;
              }),
              (i.prototype.clearIndex = function(t) {
                var e = this;
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' + encodeURIComponent(e.indexName) + '/clear',
                  hostType: 'write',
                  callback: t
                });
              }),
              (i.prototype.getSettings = function(t, e) {
                1 === arguments.length &&
                  'function' == typeof t &&
                  ((e = t), (t = {})),
                  (t = t || {});
                var i = encodeURIComponent(this.indexName);
                return this.as._jsonRequest({
                  method: 'GET',
                  url:
                    '/1/indexes/' +
                    i +
                    '/settings?getVersion=2' +
                    (t.advanced ? '&advanced=' + t.advanced : ''),
                  hostType: 'read',
                  callback: e
                });
              }),
              (i.prototype.searchSynonyms = function(t, e) {
                return (
                  'function' == typeof t
                    ? ((e = t), (t = {}))
                    : void 0 === t && (t = {}),
                  this.as._jsonRequest({
                    method: 'POST',
                    url:
                      '/1/indexes/' +
                      encodeURIComponent(this.indexName) +
                      '/synonyms/search',
                    body: t,
                    hostType: 'read',
                    callback: e
                  })
                );
              }),
              (i.prototype.exportSynonyms = function(t, e) {
                return n(this.searchSynonyms.bind(this), t, e);
              }),
              (i.prototype.saveSynonym = function(t, e, i) {
                'function' == typeof e
                  ? ((i = e), (e = {}))
                  : void 0 === e && (e = {}),
                  void 0 !== e.forwardToSlaves && c();
                var n =
                  e.forwardToSlaves || e.forwardToReplicas ? 'true' : 'false';
                return this.as._jsonRequest({
                  method: 'PUT',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/synonyms/' +
                    encodeURIComponent(t.objectID) +
                    '?forwardToReplicas=' +
                    n,
                  body: t,
                  hostType: 'write',
                  callback: i
                });
              }),
              (i.prototype.getSynonym = function(t, e) {
                return this.as._jsonRequest({
                  method: 'GET',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/synonyms/' +
                    encodeURIComponent(t),
                  hostType: 'read',
                  callback: e
                });
              }),
              (i.prototype.deleteSynonym = function(t, e, i) {
                'function' == typeof e
                  ? ((i = e), (e = {}))
                  : void 0 === e && (e = {}),
                  void 0 !== e.forwardToSlaves && c();
                var n =
                  e.forwardToSlaves || e.forwardToReplicas ? 'true' : 'false';
                return this.as._jsonRequest({
                  method: 'DELETE',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/synonyms/' +
                    encodeURIComponent(t) +
                    '?forwardToReplicas=' +
                    n,
                  hostType: 'write',
                  callback: i
                });
              }),
              (i.prototype.clearSynonyms = function(t, e) {
                'function' == typeof t
                  ? ((e = t), (t = {}))
                  : void 0 === t && (t = {}),
                  void 0 !== t.forwardToSlaves && c();
                var i =
                  t.forwardToSlaves || t.forwardToReplicas ? 'true' : 'false';
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/synonyms/clear?forwardToReplicas=' +
                    i,
                  hostType: 'write',
                  callback: e
                });
              }),
              (i.prototype.batchSynonyms = function(t, e, i) {
                'function' == typeof e
                  ? ((i = e), (e = {}))
                  : void 0 === e && (e = {}),
                  void 0 !== e.forwardToSlaves && c();
                var n =
                  e.forwardToSlaves || e.forwardToReplicas ? 'true' : 'false';
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/synonyms/batch?forwardToReplicas=' +
                    n +
                    '&replaceExistingSynonyms=' +
                    (e.replaceExistingSynonyms ? 'true' : 'false'),
                  hostType: 'write',
                  body: t,
                  callback: i
                });
              }),
              (i.prototype.searchRules = function(t, e) {
                return (
                  'function' == typeof t
                    ? ((e = t), (t = {}))
                    : void 0 === t && (t = {}),
                  this.as._jsonRequest({
                    method: 'POST',
                    url:
                      '/1/indexes/' +
                      encodeURIComponent(this.indexName) +
                      '/rules/search',
                    body: t,
                    hostType: 'read',
                    callback: e
                  })
                );
              }),
              (i.prototype.exportRules = function(t, e) {
                return n(this.searchRules.bind(this), t, e);
              }),
              (i.prototype.saveRule = function(t, e, i) {
                'function' == typeof e
                  ? ((i = e), (e = {}))
                  : void 0 === e && (e = {});
                var n = !0 === e.forwardToReplicas ? 'true' : 'false';
                return this.as._jsonRequest({
                  method: 'PUT',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/rules/' +
                    encodeURIComponent(t.objectID) +
                    '?forwardToReplicas=' +
                    n,
                  body: t,
                  hostType: 'write',
                  callback: i
                });
              }),
              (i.prototype.getRule = function(t, e) {
                return this.as._jsonRequest({
                  method: 'GET',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/rules/' +
                    encodeURIComponent(t),
                  hostType: 'read',
                  callback: e
                });
              }),
              (i.prototype.deleteRule = function(t, e, i) {
                'function' == typeof e
                  ? ((i = e), (e = {}))
                  : void 0 === e && (e = {});
                var n = !0 === e.forwardToReplicas ? 'true' : 'false';
                return this.as._jsonRequest({
                  method: 'DELETE',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/rules/' +
                    encodeURIComponent(t) +
                    '?forwardToReplicas=' +
                    n,
                  hostType: 'write',
                  callback: i
                });
              }),
              (i.prototype.clearRules = function(t, e) {
                'function' == typeof t
                  ? ((e = t), (t = {}))
                  : void 0 === t && (t = {});
                var i = !0 === t.forwardToReplicas ? 'true' : 'false';
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/rules/clear?forwardToReplicas=' +
                    i,
                  hostType: 'write',
                  callback: e
                });
              }),
              (i.prototype.batchRules = function(t, e, i) {
                'function' == typeof e
                  ? ((i = e), (e = {}))
                  : void 0 === e && (e = {});
                var n = !0 === e.forwardToReplicas ? 'true' : 'false';
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/rules/batch?forwardToReplicas=' +
                    n +
                    '&clearExistingRules=' +
                    (!0 === e.clearExistingRules ? 'true' : 'false'),
                  hostType: 'write',
                  body: t,
                  callback: i
                });
              }),
              (i.prototype.setSettings = function(t, e, i) {
                (1 !== arguments.length && 'function' != typeof e) ||
                  ((i = e), (e = {})),
                  void 0 !== e.forwardToSlaves && c();
                var n =
                    e.forwardToSlaves || e.forwardToReplicas ? 'true' : 'false',
                  s = this;
                return this.as._jsonRequest({
                  method: 'PUT',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(s.indexName) +
                    '/settings?forwardToReplicas=' +
                    n,
                  hostType: 'write',
                  body: t,
                  callback: i
                });
              }),
              (i.prototype.listUserKeys = r(function(t) {
                return this.listApiKeys(t);
              }, a('index.listUserKeys()', 'index.listApiKeys()'))),
              (i.prototype.listApiKeys = function(t) {
                var e = this;
                return this.as._jsonRequest({
                  method: 'GET',
                  url:
                    '/1/indexes/' + encodeURIComponent(e.indexName) + '/keys',
                  hostType: 'read',
                  callback: t
                });
              }),
              (i.prototype.getUserKeyACL = r(function(t, e) {
                return this.getApiKey(t, e);
              }, a('index.getUserKeyACL()', 'index.getApiKey()'))),
              (i.prototype.getApiKey = function(t, e) {
                var i = this;
                return this.as._jsonRequest({
                  method: 'GET',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(i.indexName) +
                    '/keys/' +
                    t,
                  hostType: 'read',
                  callback: e
                });
              }),
              (i.prototype.deleteUserKey = r(function(t, e) {
                return this.deleteApiKey(t, e);
              }, a('index.deleteUserKey()', 'index.deleteApiKey()'))),
              (i.prototype.deleteApiKey = function(t, e) {
                var i = this;
                return this.as._jsonRequest({
                  method: 'DELETE',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(i.indexName) +
                    '/keys/' +
                    t,
                  hostType: 'write',
                  callback: e
                });
              }),
              (i.prototype.addUserKey = r(function(t, e, i) {
                return this.addApiKey(t, e, i);
              }, a('index.addUserKey()', 'index.addApiKey()'))),
              (i.prototype.addApiKey = function(e, i, n) {
                var s =
                  'Usage: index.addApiKey(arrayOfAcls[, params, callback])';
                if (!t(8)(e)) throw new Error(s);
                (1 !== arguments.length && 'function' != typeof i) ||
                  ((n = i), (i = null));
                var o = { acl: e };
                return (
                  i &&
                    ((o.validity = i.validity),
                    (o.maxQueriesPerIPPerHour = i.maxQueriesPerIPPerHour),
                    (o.maxHitsPerQuery = i.maxHitsPerQuery),
                    (o.description = i.description),
                    i.queryParameters &&
                      (o.queryParameters = this.as._getSearchParams(
                        i.queryParameters,
                        ''
                      )),
                    (o.referers = i.referers)),
                  this.as._jsonRequest({
                    method: 'POST',
                    url:
                      '/1/indexes/' +
                      encodeURIComponent(this.indexName) +
                      '/keys',
                    body: o,
                    hostType: 'write',
                    callback: n
                  })
                );
              }),
              (i.prototype.addUserKeyWithValidity = r(function(t, e, i) {
                return this.addApiKey(t, e, i);
              }, a('index.addUserKeyWithValidity()', 'index.addApiKey()'))),
              (i.prototype.updateUserKey = r(function(t, e, i, n) {
                return this.updateApiKey(t, e, i, n);
              }, a('index.updateUserKey()', 'index.updateApiKey()'))),
              (i.prototype.updateApiKey = function(e, i, n, s) {
                var o =
                  'Usage: index.updateApiKey(key, arrayOfAcls[, params, callback])';
                if (!t(8)(i)) throw new Error(o);
                (2 !== arguments.length && 'function' != typeof n) ||
                  ((s = n), (n = null));
                var r = { acl: i };
                return (
                  n &&
                    ((r.validity = n.validity),
                    (r.maxQueriesPerIPPerHour = n.maxQueriesPerIPPerHour),
                    (r.maxHitsPerQuery = n.maxHitsPerQuery),
                    (r.description = n.description),
                    n.queryParameters &&
                      (r.queryParameters = this.as._getSearchParams(
                        n.queryParameters,
                        ''
                      )),
                    (r.referers = n.referers)),
                  this.as._jsonRequest({
                    method: 'PUT',
                    url:
                      '/1/indexes/' +
                      encodeURIComponent(this.indexName) +
                      '/keys/' +
                      e,
                    body: r,
                    hostType: 'write',
                    callback: s
                  })
                );
              });
          },
          {
            17: 17,
            18: 18,
            24: 24,
            25: 25,
            26: 26,
            27: 27,
            28: 28,
            29: 29,
            30: 30,
            7: 7,
            8: 8
          }
        ],
        17: [
          function(t, e) {
            'use strict';
            function i() {}
            (e.exports = i),
              t(7)(i, t(4).EventEmitter),
              (i.prototype.stop = function() {
                (this._stopped = !0), this._clean();
              }),
              (i.prototype._end = function() {
                this.emit('end'), this._clean();
              }),
              (i.prototype._error = function(t) {
                this.emit('error', t), this._clean();
              }),
              (i.prototype._result = function(t) {
                this.emit('result', t);
              }),
              (i.prototype._clean = function() {
                this.removeAllListeners('stop'),
                  this.removeAllListeners('end'),
                  this.removeAllListeners('error'),
                  this.removeAllListeners('result');
              });
          },
          { 4: 4, 7: 7 }
        ],
        18: [
          function(t, e) {
            function i(t, e) {
              (this.indexName = e),
                (this.as = t),
                (this.typeAheadArgs = null),
                (this.typeAheadValueOption = null),
                (this.cache = {});
            }
            var n = t(23),
              s = t(25),
              o = t(26);
            (e.exports = i),
              (i.prototype.clearCache = function() {
                this.cache = {};
              }),
              (i.prototype.search = n('query')),
              (i.prototype.similarSearch = n('similarQuery')),
              (i.prototype.browse = function(e, i, n) {
                var s,
                  o,
                  r = t(30),
                  a = this;
                0 === arguments.length ||
                (1 === arguments.length && 'function' == typeof arguments[0])
                  ? ((s = 0), (n = arguments[0]), (e = void 0))
                  : 'number' == typeof arguments[0]
                  ? ((s = arguments[0]),
                    'number' == typeof arguments[1]
                      ? (o = arguments[1])
                      : 'function' == typeof arguments[1] &&
                        ((n = arguments[1]), (o = void 0)),
                    (e = void 0),
                    (i = void 0))
                  : 'object' == typeof arguments[0]
                  ? ('function' == typeof arguments[1] && (n = arguments[1]),
                    (i = arguments[0]),
                    (e = void 0))
                  : 'string' == typeof arguments[0] &&
                    'function' == typeof arguments[1] &&
                    ((n = arguments[1]), (i = void 0)),
                  (i = r({}, i || {}, { page: s, hitsPerPage: o, query: e }));
                var h = this.as._getSearchParams(i, '');
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' + encodeURIComponent(a.indexName) + '/browse',
                  body: { params: h },
                  hostType: 'read',
                  callback: n
                });
              }),
              (i.prototype.browseFrom = function(t, e) {
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/browse',
                  body: { cursor: t },
                  hostType: 'read',
                  callback: e
                });
              }),
              (i.prototype.searchForFacetValues = function(e, i) {
                var n = t(24),
                  s = t(31),
                  o =
                    'Usage: index.searchForFacetValues({facetName, facetQuery, ...params}[, callback])';
                if (void 0 === e.facetName || void 0 === e.facetQuery)
                  throw new Error(o);
                var r = e.facetName,
                  a = s(n(e), function(t) {
                    return 'facetName' === t;
                  }),
                  h = this.as._getSearchParams(a, '');
                return this.as._jsonRequest({
                  method: 'POST',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(this.indexName) +
                    '/facets/' +
                    encodeURIComponent(r) +
                    '/query',
                  hostType: 'read',
                  body: { params: h },
                  callback: i
                });
              }),
              (i.prototype.searchFacet = s(function(t, e) {
                return this.searchForFacetValues(t, e);
              }, o(
                'index.searchFacet(params[, callback])',
                'index.searchForFacetValues(params[, callback])'
              ))),
              (i.prototype._search = function(t, e, i, n) {
                return this.as._jsonRequest({
                  cache: this.cache,
                  method: 'POST',
                  url:
                    e ||
                    '/1/indexes/' +
                      encodeURIComponent(this.indexName) +
                      '/query',
                  body: { params: t },
                  hostType: 'read',
                  fallback: {
                    method: 'GET',
                    url: '/1/indexes/' + encodeURIComponent(this.indexName),
                    body: { params: t }
                  },
                  callback: i,
                  additionalUA: n
                });
              }),
              (i.prototype.getObject = function(t, e, i) {
                var n = this;
                (1 !== arguments.length && 'function' != typeof e) ||
                  ((i = e), (e = void 0));
                var s = '';
                if (void 0 !== e) {
                  s = '?attributes=';
                  for (var o = 0; o < e.length; ++o)
                    0 !== o && (s += ','), (s += e[o]);
                }
                return this.as._jsonRequest({
                  method: 'GET',
                  url:
                    '/1/indexes/' +
                    encodeURIComponent(n.indexName) +
                    '/' +
                    encodeURIComponent(t) +
                    s,
                  hostType: 'read',
                  callback: i
                });
              }),
              (i.prototype.getObjects = function(e, i, n) {
                var s = t(8),
                  o = t(29),
                  r = 'Usage: index.getObjects(arrayOfObjectIDs[, callback])';
                if (!s(e)) throw new Error(r);
                var a = this;
                (1 !== arguments.length && 'function' != typeof i) ||
                  ((n = i), (i = void 0));
                var h = {
                  requests: o(e, function(t) {
                    var e = { indexName: a.indexName, objectID: t };
                    return i && (e.attributesToRetrieve = i.join(',')), e;
                  })
                };
                return this.as._jsonRequest({
                  method: 'POST',
                  url: '/1/indexes/*/objects',
                  hostType: 'read',
                  body: h,
                  callback: n
                });
              }),
              (i.prototype.as = null),
              (i.prototype.indexName = null),
              (i.prototype.typeAheadArgs = null),
              (i.prototype.typeAheadValueOption = null);
          },
          { 23: 23, 24: 24, 25: 25, 26: 26, 29: 29, 30: 30, 31: 31, 8: 8 }
        ],
        19: [
          function(t, e) {
            'use strict';
            var i = t(14),
              n = t(20);
            e.exports = n(i);
          },
          { 14: 14, 20: 20 }
        ],
        20: [
          function(t, e) {
            (function(i) {
              'use strict';
              var n = t(6),
                s = n.Promise || t(3).Promise;
              e.exports = function(e, o) {
                function r(e, i, n) {
                  return (
                    ((n = t(24)(n || {}))._ua = n._ua || r.ua), new a(e, i, n)
                  );
                }
                function a() {
                  e.apply(this, arguments);
                }
                var h = t(7),
                  l = t(27),
                  c = t(21),
                  u = t(22),
                  p = t(32);
                (o = o || ''),
                  'debug' === i.env.NODE_ENV && t(1).enable('algoliasearch*'),
                  (r.version = t(34)),
                  (r.ua = 'Algolia for vanilla JavaScript ' + o + r.version),
                  (r.initPlaces = p(r)),
                  (n.__algolia = { debug: t(1), algoliasearch: r });
                var d = {
                  hasXMLHttpRequest: 'XMLHttpRequest' in n,
                  hasXDomainRequest: 'XDomainRequest' in n
                };
                return (
                  d.hasXMLHttpRequest &&
                    (d.cors = 'withCredentials' in new XMLHttpRequest()),
                  h(a, e),
                  (a.prototype._request = function(t, e) {
                    return new s(function(i, n) {
                      function s() {
                        if (!f) {
                          var t;
                          clearTimeout(p);
                          try {
                            t = {
                              body: JSON.parse(g.responseText),
                              responseText: g.responseText,
                              statusCode: g.status,
                              headers:
                                (g.getAllResponseHeaders &&
                                  g.getAllResponseHeaders()) ||
                                {}
                            };
                          } catch (e) {
                            t = new l.UnparsableJSON({ more: g.responseText });
                          }
                          t instanceof l.UnparsableJSON ? n(t) : i(t);
                        }
                      }
                      function o(t) {
                        f || (clearTimeout(p), n(new l.Network({ more: t })));
                      }
                      function r() {
                        (f = !0), g.abort(), n(new l.RequestTimeout());
                      }
                      function a() {
                        (v = !0),
                          clearTimeout(p),
                          (p = setTimeout(r, e.timeouts.complete));
                      }
                      function h() {
                        v || a();
                      }
                      function u() {
                        !v && g.readyState > 1 && a();
                      }
                      if (d.cors || d.hasXDomainRequest) {
                        t = c(t, e.headers);
                        var p,
                          f,
                          m = e.body,
                          g = d.cors
                            ? new XMLHttpRequest()
                            : new XDomainRequest(),
                          v = !1;
                        (p = setTimeout(r, e.timeouts.connect)),
                          (g.onprogress = h),
                          'onreadystatechange' in g &&
                            (g.onreadystatechange = u),
                          (g.onload = s),
                          (g.onerror = o),
                          g instanceof XMLHttpRequest
                            ? g.open(e.method, t, !0)
                            : g.open(e.method, t),
                          d.cors &&
                            (m &&
                              ('POST' === e.method
                                ? g.setRequestHeader(
                                    'content-type',
                                    'application/x-www-form-urlencoded'
                                  )
                                : g.setRequestHeader(
                                    'content-type',
                                    'application/json'
                                  )),
                            g.setRequestHeader('accept', 'application/json')),
                          g.send(m);
                      } else n(new l.Network('CORS not supported'));
                    });
                  }),
                  (a.prototype._request.fallback = function(t, e) {
                    return (
                      (t = c(t, e.headers)),
                      new s(function(i, n) {
                        u(t, e, function(t, e) {
                          return t ? void n(t) : void i(e);
                        });
                      })
                    );
                  }),
                  (a.prototype._promise = {
                    reject: function(t) {
                      return s.reject(t);
                    },
                    resolve: function(t) {
                      return s.resolve(t);
                    },
                    delay: function(t) {
                      return new s(function(e) {
                        setTimeout(e, t);
                      });
                    }
                  }),
                  r
                );
              };
            }.call(this, t(12)));
          },
          {
            1: 1,
            12: 12,
            21: 21,
            22: 22,
            24: 24,
            27: 27,
            3: 3,
            32: 32,
            34: 34,
            6: 6,
            7: 7
          }
        ],
        21: [
          function(t, e) {
            'use strict';
            function i(t, e) {
              return (t += /\?/.test(t) ? '&' : '?') + n(e);
            }
            e.exports = i;
            var n = t(13);
          },
          { 13: 13 }
        ],
        22: [
          function(t, e) {
            'use strict';
            function i(t, e, i) {
              function o() {
                e.debug('JSONP: success'),
                  g ||
                    p ||
                    ((g = !0),
                    u ||
                      (e.debug(
                        'JSONP: Fail. Script loaded but did not call the callback'
                      ),
                      a(),
                      i(new n.JSONPScriptFail())));
              }
              function r() {
                ('loaded' !== this.readyState &&
                  'complete' !== this.readyState) ||
                  o();
              }
              function a() {
                clearTimeout(v),
                  (f.onload = null),
                  (f.onreadystatechange = null),
                  (f.onerror = null),
                  d.removeChild(f);
              }
              function h() {
                try {
                  delete window[m], delete window[m + '_loaded'];
                } catch (t) {
                  window[m] = window[m + '_loaded'] = void 0;
                }
              }
              function l() {
                e.debug('JSONP: Script timeout'),
                  (p = !0),
                  a(),
                  i(new n.RequestTimeout());
              }
              function c() {
                e.debug('JSONP: Script error'),
                  g || p || (a(), i(new n.JSONPScriptError()));
              }
              if ('GET' === e.method) {
                e.debug('JSONP: start');
                var u = !1,
                  p = !1;
                s += 1;
                var d = document.getElementsByTagName('head')[0],
                  f = document.createElement('script'),
                  m = 'algoliaJSONP_' + s,
                  g = !1;
                (window[m] = function(t) {
                  return (
                    h(),
                    p
                      ? void e.debug('JSONP: Late answer, ignoring')
                      : ((u = !0), a(), void i(null, { body: t }))
                  );
                }),
                  (t += '&callback=' + m),
                  e.jsonBody &&
                    e.jsonBody.params &&
                    (t += '&' + e.jsonBody.params);
                var v = setTimeout(l, e.timeouts.complete);
                (f.onreadystatechange = r),
                  (f.onload = o),
                  (f.onerror = c),
                  (f.async = !0),
                  (f.defer = !0),
                  (f.src = t),
                  d.appendChild(f);
              } else
                i(
                  new Error(
                    'Method ' +
                      e.method +
                      ' ' +
                      t +
                      ' is not supported by JSONP.'
                  )
                );
            }
            e.exports = i;
            var n = t(27),
              s = 0;
          },
          { 27: 27 }
        ],
        23: [
          function(t, e) {
            function i(t, e) {
              return function(i, s, o) {
                if (
                  ('function' == typeof i && 'object' == typeof s) ||
                  'object' == typeof o
                )
                  throw new n.AlgoliaSearchError(
                    'index.search usage is index.search(query, params, cb)'
                  );
                0 === arguments.length || 'function' == typeof i
                  ? ((o = i), (i = ''))
                  : (1 !== arguments.length && 'function' != typeof s) ||
                    ((o = s), (s = void 0)),
                  'object' == typeof i && null !== i
                    ? ((s = i), (i = void 0))
                    : null != i || (i = '');
                var r,
                  a = '';
                return (
                  void 0 !== i && (a += t + '=' + encodeURIComponent(i)),
                  void 0 !== s &&
                    (s.additionalUA &&
                      ((r = s.additionalUA), delete s.additionalUA),
                    (a = this.as._getSearchParams(s, a))),
                  this._search(a, e, o, r)
                );
              };
            }
            e.exports = i;
            var n = t(27);
          },
          { 27: 27 }
        ],
        24: [
          function(t, e) {
            e.exports = function(t) {
              return JSON.parse(JSON.stringify(t));
            };
          },
          {}
        ],
        25: [
          function(t, e) {
            e.exports = function(t, e) {
              function i() {
                return (
                  n || (console.warn(e), (n = !0)), t.apply(this, arguments)
                );
              }
              var n = !1;
              return i;
            };
          },
          {}
        ],
        26: [
          function(t, e) {
            e.exports = function(t, e) {
              return (
                'algoliasearch: `' +
                t +
                '` was replaced by `' +
                e +
                '`. Please see https://github.com/algolia/algoliasearch-client-javascript/wiki/Deprecated#' +
                t.toLowerCase().replace(/[\.\(\)]/g, '')
              );
            };
          },
          {}
        ],
        27: [
          function(t, e) {
            'use strict';
            function i(e, i) {
              var n = t(5),
                s = this;
              'function' == typeof Error.captureStackTrace
                ? Error.captureStackTrace(this, this.constructor)
                : (s.stack =
                    new Error().stack ||
                    'Cannot get a stacktrace, browser is too old'),
                (this.name = 'AlgoliaSearchError'),
                (this.message = e || 'Unknown error'),
                i &&
                  n(i, function(t, e) {
                    s[e] = t;
                  });
            }
            function n(t, e) {
              function n() {
                var n = Array.prototype.slice.call(arguments, 0);
                'string' != typeof n[0] && n.unshift(e),
                  i.apply(this, n),
                  (this.name = 'AlgoliaSearch' + t + 'Error');
              }
              return s(n, i), n;
            }
            var s = t(7);
            s(i, Error),
              (e.exports = {
                AlgoliaSearchError: i,
                UnparsableJSON: n(
                  'UnparsableJSON',
                  'Could not parse the incoming response as JSON, see err.more for details'
                ),
                RequestTimeout: n(
                  'RequestTimeout',
                  'Request timedout before getting a response'
                ),
                Network: n(
                  'Network',
                  'Network issue, see err.more for details'
                ),
                JSONPScriptFail: n(
                  'JSONPScriptFail',
                  '<script> was loaded but did not call our provided callback'
                ),
                JSONPScriptError: n(
                  'JSONPScriptError',
                  '<script> unable to load due to an `error` event on it'
                ),
                Unknown: n('Unknown', 'Unknown error occured')
              });
          },
          { 5: 5, 7: 7 }
        ],
        28: [
          function(t, e) {
            e.exports = function(t, e) {
              e(t, 0);
            };
          },
          {}
        ],
        29: [
          function(t, e) {
            var i = t(5);
            e.exports = function(t, e) {
              var n = [];
              return (
                i(t, function(i, s) {
                  n.push(e(i, s, t));
                }),
                n
              );
            };
          },
          { 5: 5 }
        ],
        30: [
          function(t, e) {
            var i = t(5);
            e.exports = function n(t) {
              var e = Array.prototype.slice.call(arguments);
              return (
                i(e, function(e) {
                  for (var i in e)
                    e.hasOwnProperty(i) &&
                      ('object' == typeof t[i] && 'object' == typeof e[i]
                        ? (t[i] = n({}, t[i], e[i]))
                        : void 0 !== e[i] && (t[i] = e[i]));
                }),
                t
              );
            };
          },
          { 5: 5 }
        ],
        31: [
          function(t, e) {
            e.exports = function(e, i) {
              var n = t(10),
                s = t(5),
                o = {};
              return (
                s(n(e), function(t) {
                  !0 !== i(t) && (o[t] = e[t]);
                }),
                o
              );
            };
          },
          { 10: 10, 5: 5 }
        ],
        32: [
          function(t, e) {
            function i(e) {
              return function(i, s, o) {
                var r = t(24);
                ((o = (o && r(o)) || {}).hosts = o.hosts || [
                  'places-dsn.algolia.net',
                  'places-1.algolianet.com',
                  'places-2.algolianet.com',
                  'places-3.algolianet.com'
                ]),
                  (0 !== arguments.length &&
                    'object' != typeof i &&
                    void 0 !== i) ||
                    ((i = ''), (s = ''), (o._allowEmptyCredentials = !0));
                var a = e(i, s, o).initIndex('places');
                return (
                  (a.search = n('query', '/1/places/query')),
                  (a.getObject = function(t, e) {
                    return this.as._jsonRequest({
                      method: 'GET',
                      url: '/1/places/' + encodeURIComponent(t),
                      hostType: 'read',
                      callback: e
                    });
                  }),
                  a
                );
              };
            }
            e.exports = i;
            var n = t(23);
          },
          { 23: 23, 24: 24 }
        ],
        33: [
          function(t, e) {
            (function(i) {
              function n(t, e) {
                return h('localStorage failed with', e), r(), (a = c).get(t);
              }
              function s(t, e) {
                return 1 === arguments.length ? a.get(t) : a.set(t, e);
              }
              function o() {
                try {
                  return (
                    'localStorage' in i &&
                    null !== i.localStorage &&
                    (i.localStorage[l] ||
                      i.localStorage.setItem(l, JSON.stringify({})),
                    !0)
                  );
                } catch (t) {
                  return !1;
                }
              }
              function r() {
                try {
                  i.localStorage.removeItem(l);
                } catch (t) {}
              }
              var a,
                h = t(1)('algoliasearch:src/hostIndexState.js'),
                l = 'algoliasearch-client-js',
                c = {
                  state: {},
                  set: function(t, e) {
                    return (this.state[t] = e), this.state[t];
                  },
                  get: function(t) {
                    return this.state[t] || null;
                  }
                },
                u = {
                  set: function(t, e) {
                    c.set(t, e);
                    try {
                      var s = JSON.parse(i.localStorage[l]);
                      return (
                        (s[t] = e),
                        (i.localStorage[l] = JSON.stringify(s)),
                        s[t]
                      );
                    } catch (o) {
                      return n(t, o);
                    }
                  },
                  get: function(t) {
                    try {
                      return JSON.parse(i.localStorage[l])[t] || null;
                    } catch (e) {
                      return n(t, e);
                    }
                  }
                };
              (a = o() ? u : c),
                (e.exports = { get: s, set: s, supportsLocalStorage: o });
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
          { 1: 1 }
        ],
        34: [
          function(t, e) {
            'use strict';
            e.exports = '3.26.0';
          },
          {}
        ]
      },
      {},
      [19]
    )(19);
  }),
  (function(t) {
    function e(n) {
      if (i[n]) return i[n].exports;
      var s = (i[n] = { exports: {}, id: n, loaded: !1 });
      return t[n].call(s.exports, s, s.exports, e), (s.loaded = !0), s.exports;
    }
    var i = {};
    (e.m = t), (e.c = i), (e.p = ''), e(0);
  })([
    function(t, e, i) {
      'use strict';
      t.exports = i(1);
    },
    function(t, e, i) {
      'use strict';
      var n = i(2),
        s = i(3);
      n.element = s;
      var o = i(4);
      (o.isArray = s.isArray),
        (o.isFunction = s.isFunction),
        (o.isObject = s.isPlainObject),
        (o.bind = s.proxy),
        (o.each = function(t, e) {
          function i(t, i) {
            return e(i, t);
          }
          s.each(t, i);
        }),
        (o.map = s.map),
        (o.mixin = s.extend),
        (o.Event = s.Event);
      var r,
        a,
        h,
        l = i(5),
        c = i(6);
      (r = s.fn.autocomplete),
        (a = 'aaAutocomplete'),
        (h = {
          initialize: function(t, e) {
            function i() {
              var i,
                n = s(this),
                o = new c({ el: n });
              (i = new l({
                input: n,
                eventBus: o,
                dropdownMenuContainer: t.dropdownMenuContainer,
                hint: void 0 === t.hint || !!t.hint,
                minLength: t.minLength,
                autoselect: t.autoselect,
                autoselectOnBlur: t.autoselectOnBlur,
                openOnFocus: t.openOnFocus,
                templates: t.templates,
                debug: t.debug,
                cssClasses: t.cssClasses,
                datasets: e,
                keyboardShortcuts: t.keyboardShortcuts,
                appendTo: t.appendTo,
                autoWidth: t.autoWidth
              })),
                n.data(a, i);
            }
            return (
              (e = o.isArray(e) ? e : [].slice.call(arguments, 1)),
              (t = t || {}),
              this.each(i)
            );
          },
          open: function() {
            function t() {
              var t;
              (t = s(this).data(a)) && t.open();
            }
            return this.each(t);
          },
          close: function() {
            function t() {
              var t;
              (t = s(this).data(a)) && t.close();
            }
            return this.each(t);
          },
          val: function(t) {
            function e() {
              var e;
              (e = s(this).data(a)) && e.setVal(t);
            }
            return arguments.length
              ? this.each(e)
              : (function(t) {
                  var e, i;
                  return (e = t.data(a)) && (i = e.getVal()), i;
                })(this.first());
          },
          destroy: function() {
            function t() {
              var t,
                e = s(this);
              (t = e.data(a)) && (t.destroy(), e.removeData(a));
            }
            return this.each(t);
          }
        }),
        (s.fn.autocomplete = function(t) {
          var e;
          return h[t] && 'initialize' !== t
            ? ((e = this.filter(function() {
                return !!s(this).data(a);
              })),
              h[t].apply(e, [].slice.call(arguments, 1)))
            : h.initialize.apply(this, arguments);
        }),
        (s.fn.autocomplete.noConflict = function() {
          return (s.fn.autocomplete = r), this;
        }),
        (s.fn.autocomplete.sources = l.sources),
        (s.fn.autocomplete.escapeHighlightedString = o.escapeHighlightedString),
        (t.exports = s.fn.autocomplete);
    },
    function(t) {
      'use strict';
      t.exports = { element: null };
    },
    function(t) {
      t.exports = jQuery;
    },
    function(t, e, i) {
      'use strict';
      function n(t) {
        return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      }
      var s = i(2);
      t.exports = {
        isArray: null,
        isFunction: null,
        isObject: null,
        bind: null,
        each: null,
        map: null,
        mixin: null,
        isMsie: function() {
          return (
            !!/(msie|trident)/i.test(navigator.userAgent) &&
            navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]
          );
        },
        escapeRegExChars: function(t) {
          return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        },
        isNumber: function(t) {
          return 'number' == typeof t;
        },
        toStr: function(t) {
          return null == t ? '' : t + '';
        },
        cloneDeep: function(t) {
          var e = this.mixin({}, t),
            i = this;
          return (
            this.each(e, function(t, n) {
              t &&
                (i.isArray(t)
                  ? (e[n] = [].concat(t))
                  : i.isObject(t) && (e[n] = i.cloneDeep(t)));
            }),
            e
          );
        },
        error: function(t) {
          throw new Error(t);
        },
        every: function(t, e) {
          var i = !0;
          return t
            ? (this.each(t, function(n, s) {
                if (!(i = e.call(null, n, s, t))) return !1;
              }),
              !!i)
            : i;
        },
        any: function(t, e) {
          var i = !1;
          return t
            ? (this.each(t, function(n, s) {
                if (e.call(null, n, s, t)) return (i = !0), !1;
              }),
              i)
            : i;
        },
        getUniqueId: (function() {
          var t = 0;
          return function() {
            return t++;
          };
        })(),
        templatify: function(t) {
          if (this.isFunction(t)) return t;
          var e = s.element(t);
          return 'SCRIPT' === e.prop('tagName')
            ? function() {
                return e.text();
              }
            : function() {
                return String(t);
              };
        },
        defer: function(t) {
          setTimeout(t, 0);
        },
        noop: function() {},
        formatPrefix: function(t, e) {
          return e ? '' : t + '-';
        },
        className: function(t, e, i) {
          return (i ? '' : '.') + t + e;
        },
        escapeHighlightedString: function(t, e, i) {
          e = e || '<em>';
          var s = document.createElement('div');
          s.appendChild(document.createTextNode(e)), (i = i || '</em>');
          var o = document.createElement('div');
          o.appendChild(document.createTextNode(i));
          var r = document.createElement('div');
          return (
            r.appendChild(document.createTextNode(t)),
            r.innerHTML
              .replace(RegExp(n(s.innerHTML), 'g'), e)
              .replace(RegExp(n(o.innerHTML), 'g'), i)
          );
        }
      };
    },
    function(t, e, i) {
      'use strict';
      function n(t) {
        var e, i;
        if (
          ((t = t || {}).input || h.error('missing input'),
          (this.isActivated = !1),
          (this.debug = !!t.debug),
          (this.autoselect = !!t.autoselect),
          (this.autoselectOnBlur = !!t.autoselectOnBlur),
          (this.openOnFocus = !!t.openOnFocus),
          (this.minLength = h.isNumber(t.minLength) ? t.minLength : 1),
          (this.autoWidth = void 0 === t.autoWidth || !!t.autoWidth),
          (t.hint = !!t.hint),
          t.hint && t.appendTo)
        )
          throw new Error(
            "[autocomplete.js] hint and appendTo options can't be used at the same time"
          );
        (this.css = t.css = h.mixin({}, f, t.appendTo ? f.appendTo : {})),
          (this.cssClasses = t.cssClasses = h.mixin(
            {},
            f.defaultClasses,
            t.cssClasses || {}
          )),
          (this.cssClasses.prefix = t.cssClasses.formattedPrefix = h.formatPrefix(
            this.cssClasses.prefix,
            this.cssClasses.noPrefix
          )),
          (this.listboxId = t.listboxId = [
            this.cssClasses.root,
            'listbox',
            h.getUniqueId()
          ].join('-'));
        var o = s(t);
        this.$node = o.wrapper;
        var r = (this.$input = o.input);
        (e = o.menu),
          (i = o.hint),
          t.dropdownMenuContainer &&
            l
              .element(t.dropdownMenuContainer)
              .css('position', 'relative')
              .append(e.css('top', '0')),
          r.on('blur.aa', function(t) {
            var i = document.activeElement;
            h.isMsie() &&
              (e[0] === i || e[0].contains(i)) &&
              (t.preventDefault(),
              t.stopImmediatePropagation(),
              h.defer(function() {
                r.focus();
              }));
          }),
          e.on('mousedown.aa', function(t) {
            t.preventDefault();
          }),
          (this.eventBus = t.eventBus || new c({ el: r })),
          (this.dropdown = new n.Dropdown({
            appendTo: t.appendTo,
            wrapper: this.$node,
            menu: e,
            datasets: t.datasets,
            templates: t.templates,
            cssClasses: t.cssClasses,
            minLength: this.minLength
          })
            .onSync('suggestionClicked', this._onSuggestionClicked, this)
            .onSync('cursorMoved', this._onCursorMoved, this)
            .onSync('cursorRemoved', this._onCursorRemoved, this)
            .onSync('opened', this._onOpened, this)
            .onSync('closed', this._onClosed, this)
            .onSync('shown', this._onShown, this)
            .onSync('empty', this._onEmpty, this)
            .onSync('redrawn', this._onRedrawn, this)
            .onAsync('datasetRendered', this._onDatasetRendered, this)),
          (this.input = new n.Input({ input: r, hint: i })
            .onSync('focused', this._onFocused, this)
            .onSync('blurred', this._onBlurred, this)
            .onSync('enterKeyed', this._onEnterKeyed, this)
            .onSync('tabKeyed', this._onTabKeyed, this)
            .onSync('escKeyed', this._onEscKeyed, this)
            .onSync('upKeyed', this._onUpKeyed, this)
            .onSync('downKeyed', this._onDownKeyed, this)
            .onSync('leftKeyed', this._onLeftKeyed, this)
            .onSync('rightKeyed', this._onRightKeyed, this)
            .onSync('queryChanged', this._onQueryChanged, this)
            .onSync('whitespaceChanged', this._onWhitespaceChanged, this)),
          this._bindKeyboardShortcuts(t),
          this._setLanguageDirection();
      }
      function s(t) {
        var e, i, n, s;
        (e = l.element(t.input)),
          (i = l
            .element(d.wrapper.replace('%ROOT%', t.cssClasses.root))
            .css(t.css.wrapper)),
          t.appendTo ||
            'block' !== e.css('display') ||
            'table' !== e.parent().css('display') ||
            i.css('display', 'table-cell');
        var r = d.dropdown
          .replace('%PREFIX%', t.cssClasses.prefix)
          .replace('%DROPDOWN_MENU%', t.cssClasses.dropdownMenu);
        (n = l
          .element(r)
          .css(t.css.dropdown)
          .attr({ role: 'listbox', id: t.listboxId })),
          t.templates &&
            t.templates.dropdownMenu &&
            n.html(h.templatify(t.templates.dropdownMenu)()),
          (s = e
            .clone()
            .css(t.css.hint)
            .css(o(e)))
            .val('')
            .addClass(h.className(t.cssClasses.prefix, t.cssClasses.hint, !0))
            .removeAttr('id name placeholder required')
            .prop('readonly', !0)
            .attr({
              'aria-hidden': 'true',
              autocomplete: 'off',
              spellcheck: 'false',
              tabindex: -1
            }),
          s.removeData && s.removeData(),
          e.data(a, {
            'aria-autocomplete': e.attr('aria-autocomplete'),
            'aria-expanded': e.attr('aria-expanded'),
            'aria-owns': e.attr('aria-owns'),
            autocomplete: e.attr('autocomplete'),
            dir: e.attr('dir'),
            role: e.attr('role'),
            spellcheck: e.attr('spellcheck'),
            style: e.attr('style'),
            type: e.attr('type')
          }),
          e
            .addClass(h.className(t.cssClasses.prefix, t.cssClasses.input, !0))
            .attr({
              autocomplete: 'off',
              spellcheck: !1,
              role: 'combobox',
              'aria-autocomplete':
                t.datasets && t.datasets[0] && t.datasets[0].displayKey
                  ? 'both'
                  : 'list',
              'aria-expanded': 'false',
              'aria-label': t.ariaLabel,
              'aria-owns': t.listboxId
            })
            .css(t.hint ? t.css.input : t.css.inputWithNoHint);
        try {
          e.attr('dir') || e.attr('dir', 'auto');
        } catch (t) {}
        return (
          (i = t.appendTo
            ? i.appendTo(l.element(t.appendTo).eq(0)).eq(0)
            : e.wrap(i).parent())
            .prepend(t.hint ? s : null)
            .append(n),
          { wrapper: i, input: e, hint: s, menu: n }
        );
      }
      function o(t) {
        return {
          backgroundAttachment: t.css('background-attachment'),
          backgroundClip: t.css('background-clip'),
          backgroundColor: t.css('background-color'),
          backgroundImage: t.css('background-image'),
          backgroundOrigin: t.css('background-origin'),
          backgroundPosition: t.css('background-position'),
          backgroundRepeat: t.css('background-repeat'),
          backgroundSize: t.css('background-size')
        };
      }
      function r(t, e) {
        var i = t.find(h.className(e.prefix, e.input));
        h.each(i.data(a), function(t, e) {
          void 0 === t ? i.removeAttr(e) : i.attr(e, t);
        }),
          i
            .detach()
            .removeClass(h.className(e.prefix, e.input, !0))
            .insertAfter(t),
          i.removeData && i.removeData(a),
          t.remove();
      }
      var a = 'aaAttrs',
        h = i(4),
        l = i(2),
        c = i(6),
        u = i(7),
        p = i(16),
        d = i(18),
        f = i(19);
      h.mixin(n.prototype, {
        _bindKeyboardShortcuts: function(t) {
          if (t.keyboardShortcuts) {
            var e = this.$input,
              i = [];
            h.each(t.keyboardShortcuts, function(t) {
              'string' == typeof t && (t = t.toUpperCase().charCodeAt(0)),
                i.push(t);
            }),
              l.element(document).keydown(function(t) {
                var n = t.target || t.srcElement,
                  s = n.tagName;
                if (
                  !n.isContentEditable &&
                  'INPUT' !== s &&
                  'SELECT' !== s &&
                  'TEXTAREA' !== s
                ) {
                  var o = t.which || t.keyCode;
                  -1 !== i.indexOf(o) &&
                    (e.focus(), t.stopPropagation(), t.preventDefault());
                }
              });
          }
        },
        _onSuggestionClicked: function(t, e) {
          var i;
          (i = this.dropdown.getDatumForSuggestion(e)) && this._select(i);
        },
        _onCursorMoved: function(t, e) {
          var i = this.dropdown.getDatumForCursor(),
            n = this.dropdown.getCurrentCursor().attr('id');
          this.input.setActiveDescendant(n),
            i &&
              (e && this.input.setInputValue(i.value, !0),
              this.eventBus.trigger('cursorchanged', i.raw, i.datasetName));
        },
        _onCursorRemoved: function() {
          this.input.resetInputValue(),
            this._updateHint(),
            this.eventBus.trigger('cursorremoved');
        },
        _onDatasetRendered: function() {
          this._updateHint(), this.eventBus.trigger('updated');
        },
        _onOpened: function() {
          this._updateHint(),
            this.input.expand(),
            this.eventBus.trigger('opened');
        },
        _onEmpty: function() {
          this.eventBus.trigger('empty');
        },
        _onRedrawn: function() {
          this.$node.css('top', '0px'), this.$node.css('left', '0px');
          var t = this.$input[0].getBoundingClientRect();
          this.autoWidth && this.$node.css('width', t.width + 'px');
          var e = this.$node[0].getBoundingClientRect(),
            i = t.bottom - e.top;
          this.$node.css('top', i + 'px');
          var n = t.left - e.left;
          this.$node.css('left', n + 'px'), this.eventBus.trigger('redrawn');
        },
        _onShown: function() {
          this.eventBus.trigger('shown'),
            this.autoselect && this.dropdown.cursorTopSuggestion();
        },
        _onClosed: function() {
          this.input.clearHint(),
            this.input.removeActiveDescendant(),
            this.input.collapse(),
            this.eventBus.trigger('closed');
        },
        _onFocused: function() {
          if (((this.isActivated = !0), this.openOnFocus)) {
            var t = this.input.getQuery();
            t.length >= this.minLength
              ? this.dropdown.update(t)
              : this.dropdown.empty(),
              this.dropdown.open();
          }
        },
        _onBlurred: function() {
          var t, e;
          (t = this.dropdown.getDatumForCursor()),
            (e = this.dropdown.getDatumForTopSuggestion()),
            this.debug ||
              (this.autoselectOnBlur && t
                ? this._select(t)
                : this.autoselectOnBlur && e
                ? this._select(e)
                : ((this.isActivated = !1),
                  this.dropdown.empty(),
                  this.dropdown.close()));
        },
        _onEnterKeyed: function(t, e) {
          var i, n;
          (i = this.dropdown.getDatumForCursor()),
            (n = this.dropdown.getDatumForTopSuggestion()),
            i
              ? (this._select(i), e.preventDefault())
              : this.autoselect && n && (this._select(n), e.preventDefault());
        },
        _onTabKeyed: function(t, e) {
          var i;
          (i = this.dropdown.getDatumForCursor())
            ? (this._select(i), e.preventDefault())
            : this._autocomplete(!0);
        },
        _onEscKeyed: function() {
          this.dropdown.close(), this.input.resetInputValue();
        },
        _onUpKeyed: function() {
          var t = this.input.getQuery();
          this.dropdown.isEmpty && t.length >= this.minLength
            ? this.dropdown.update(t)
            : this.dropdown.moveCursorUp(),
            this.dropdown.open();
        },
        _onDownKeyed: function() {
          var t = this.input.getQuery();
          this.dropdown.isEmpty && t.length >= this.minLength
            ? this.dropdown.update(t)
            : this.dropdown.moveCursorDown(),
            this.dropdown.open();
        },
        _onLeftKeyed: function() {
          'rtl' === this.dir && this._autocomplete();
        },
        _onRightKeyed: function() {
          'ltr' === this.dir && this._autocomplete();
        },
        _onQueryChanged: function(t, e) {
          this.input.clearHintIfInvalid(),
            e.length >= this.minLength
              ? this.dropdown.update(e)
              : this.dropdown.empty(),
            this.dropdown.open(),
            this._setLanguageDirection();
        },
        _onWhitespaceChanged: function() {
          this._updateHint(), this.dropdown.open();
        },
        _setLanguageDirection: function() {
          var t = this.input.getLanguageDirection();
          this.dir !== t &&
            ((this.dir = t),
            this.$node.css('direction', t),
            this.dropdown.setLanguageDirection(t));
        },
        _updateHint: function() {
          var t, e, i, n, s;
          (t = this.dropdown.getDatumForTopSuggestion()) &&
          this.dropdown.isVisible() &&
          !this.input.hasOverflow()
            ? ((e = this.input.getInputValue()),
              (i = u.normalizeQuery(e)),
              (n = h.escapeRegExChars(i)),
              (s = new RegExp('^(?:' + n + ')(.+$)', 'i').exec(t.value))
                ? this.input.setHint(e + s[1])
                : this.input.clearHint())
            : this.input.clearHint();
        },
        _autocomplete: function(t) {
          var e, i, n, s;
          (e = this.input.getHint()),
            (i = this.input.getQuery()),
            (n = t || this.input.isCursorAtEnd()),
            e &&
              i !== e &&
              n &&
              ((s = this.dropdown.getDatumForTopSuggestion()) &&
                this.input.setInputValue(s.value),
              this.eventBus.trigger('autocompleted', s.raw, s.datasetName));
        },
        _select: function(t) {
          void 0 !== t.value && this.input.setQuery(t.value),
            this.input.setInputValue(t.value, !0),
            this._setLanguageDirection(),
            !1 ===
              this.eventBus
                .trigger('selected', t.raw, t.datasetName)
                .isDefaultPrevented() &&
              (this.dropdown.close(),
              h.defer(h.bind(this.dropdown.empty, this.dropdown)));
        },
        open: function() {
          if (!this.isActivated) {
            var t = this.input.getInputValue();
            t.length >= this.minLength
              ? this.dropdown.update(t)
              : this.dropdown.empty();
          }
          this.dropdown.open();
        },
        close: function() {
          this.dropdown.close();
        },
        setVal: function(t) {
          (t = h.toStr(t)),
            this.isActivated
              ? this.input.setInputValue(t)
              : (this.input.setQuery(t), this.input.setInputValue(t, !0)),
            this._setLanguageDirection();
        },
        getVal: function() {
          return this.input.getQuery();
        },
        destroy: function() {
          this.input.destroy(),
            this.dropdown.destroy(),
            r(this.$node, this.cssClasses),
            (this.$node = null);
        },
        getWrapper: function() {
          return this.dropdown.$container[0];
        }
      }),
        (n.Dropdown = p),
        (n.Input = u),
        (n.sources = i(20)),
        (t.exports = n);
    },
    function(t, e, i) {
      'use strict';
      function n(t) {
        (t && t.el) || s.error('EventBus initialized without el'),
          (this.$el = o.element(t.el));
      }
      var s = i(4),
        o = i(2);
      s.mixin(n.prototype, {
        trigger: function(t) {
          var e = [].slice.call(arguments, 1),
            i = s.Event('autocomplete:' + t);
          return this.$el.trigger(i, e), i;
        }
      }),
        (t.exports = n);
    },
    function(t, e, i) {
      'use strict';
      function n(t) {
        var e,
          i,
          n,
          o,
          r = this;
        (t = t || {}).input || h.error('input is missing'),
          (e = h.bind(this._onBlur, this)),
          (i = h.bind(this._onFocus, this)),
          (n = h.bind(this._onKeydown, this)),
          (o = h.bind(this._onInput, this)),
          (this.$hint = l.element(t.hint)),
          (this.$input = l
            .element(t.input)
            .on('blur.aa', e)
            .on('focus.aa', i)
            .on('keydown.aa', n)),
          0 === this.$hint.length &&
            (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid =
              h.noop),
          h.isMsie()
            ? this.$input.on('keydown.aa keypress.aa cut.aa paste.aa', function(
                t
              ) {
                a[t.which || t.keyCode] || h.defer(h.bind(r._onInput, r, t));
              })
            : this.$input.on('input.aa', o),
          (this.query = this.$input.val()),
          (this.$overflowHelper = s(this.$input));
      }
      function s(t) {
        return l
          .element('<pre aria-hidden="true"></pre>')
          .css({
            position: 'absolute',
            visibility: 'hidden',
            whiteSpace: 'pre',
            fontFamily: t.css('font-family'),
            fontSize: t.css('font-size'),
            fontStyle: t.css('font-style'),
            fontVariant: t.css('font-variant'),
            fontWeight: t.css('font-weight'),
            wordSpacing: t.css('word-spacing'),
            letterSpacing: t.css('letter-spacing'),
            textIndent: t.css('text-indent'),
            textRendering: t.css('text-rendering'),
            textTransform: t.css('text-transform')
          })
          .insertAfter(t);
      }
      function o(t, e) {
        return n.normalizeQuery(t) === n.normalizeQuery(e);
      }
      function r(t) {
        return t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
      }
      var a;
      a = {
        9: 'tab',
        27: 'esc',
        37: 'left',
        39: 'right',
        13: 'enter',
        38: 'up',
        40: 'down'
      };
      var h = i(4),
        l = i(2),
        c = i(8);
      (n.normalizeQuery = function(t) {
        return (t || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' ');
      }),
        h.mixin(n.prototype, c, {
          _onBlur: function() {
            this.resetInputValue(),
              this.$input.removeAttr('aria-activedescendant'),
              this.trigger('blurred');
          },
          _onFocus: function() {
            this.trigger('focused');
          },
          _onKeydown: function(t) {
            var e = a[t.which || t.keyCode];
            this._managePreventDefault(e, t),
              e && this._shouldTrigger(e, t) && this.trigger(e + 'Keyed', t);
          },
          _onInput: function() {
            this._checkInputValue();
          },
          _managePreventDefault: function(t, e) {
            var i, n, s;
            switch (t) {
              case 'tab':
                (n = this.getHint()),
                  (s = this.getInputValue()),
                  (i = n && n !== s && !r(e));
                break;
              case 'up':
              case 'down':
                i = !r(e);
                break;
              default:
                i = !1;
            }
            i && e.preventDefault();
          },
          _shouldTrigger: function(t, e) {
            var i;
            switch (t) {
              case 'tab':
                i = !r(e);
                break;
              default:
                i = !0;
            }
            return i;
          },
          _checkInputValue: function() {
            var t, e, i;
            (i =
              !(
                !(e = o((t = this.getInputValue()), this.query)) || !this.query
              ) && this.query.length !== t.length),
              (this.query = t),
              e
                ? i && this.trigger('whitespaceChanged', this.query)
                : this.trigger('queryChanged', this.query);
          },
          focus: function() {
            this.$input.focus();
          },
          blur: function() {
            this.$input.blur();
          },
          getQuery: function() {
            return this.query;
          },
          setQuery: function(t) {
            this.query = t;
          },
          getInputValue: function() {
            return this.$input.val();
          },
          setInputValue: function(t, e) {
            void 0 === t && (t = this.query),
              this.$input.val(t),
              e ? this.clearHint() : this._checkInputValue();
          },
          expand: function() {
            this.$input.attr('aria-expanded', 'true');
          },
          collapse: function() {
            this.$input.attr('aria-expanded', 'false');
          },
          setActiveDescendant: function(t) {
            this.$input.attr('aria-activedescendant', t);
          },
          removeActiveDescendant: function() {
            this.$input.removeAttr('aria-activedescendant');
          },
          resetInputValue: function() {
            this.setInputValue(this.query, !0);
          },
          getHint: function() {
            return this.$hint.val();
          },
          setHint: function(t) {
            this.$hint.val(t);
          },
          clearHint: function() {
            this.setHint('');
          },
          clearHintIfInvalid: function() {
            var t, e, i;
            (i =
              (t = this.getInputValue()) !== (e = this.getHint()) &&
              0 === e.indexOf(t)),
              ('' !== t && i && !this.hasOverflow()) || this.clearHint();
          },
          getLanguageDirection: function() {
            return (this.$input.css('direction') || 'ltr').toLowerCase();
          },
          hasOverflow: function() {
            var t = this.$input.width() - 2;
            return (
              this.$overflowHelper.text(this.getInputValue()),
              this.$overflowHelper.width() >= t
            );
          },
          isCursorAtEnd: function() {
            var t, e, i;
            return (
              (t = this.$input.val().length),
              (e = this.$input[0].selectionStart),
              h.isNumber(e)
                ? e === t
                : !document.selection ||
                  ((i = document.selection.createRange()).moveStart(
                    'character',
                    -t
                  ),
                  t === i.text.length)
            );
          },
          destroy: function() {
            this.$hint.off('.aa'),
              this.$input.off('.aa'),
              (this.$hint = this.$input = this.$overflowHelper = null);
          }
        }),
        (t.exports = n);
    },
    function(t, e, i) {
      'use strict';
      function n(t, e, i, n) {
        var s;
        if (!i) return this;
        for (
          e = e.split(u),
            i = n ? l(i, n) : i,
            this._callbacks = this._callbacks || {};
          (s = e.shift());

        )
          (this._callbacks[s] = this._callbacks[s] || { sync: [], async: [] }),
            this._callbacks[s][t].push(i);
        return this;
      }
      function s(t, e, i) {
        return n.call(this, 'async', t, e, i);
      }
      function o(t, e, i) {
        return n.call(this, 'sync', t, e, i);
      }
      function r(t) {
        var e;
        if (!this._callbacks) return this;
        for (t = t.split(u); (e = t.shift()); ) delete this._callbacks[e];
        return this;
      }
      function a(t) {
        var e, i, n, s, o;
        if (!this._callbacks) return this;
        for (
          t = t.split(u), n = [].slice.call(arguments, 1);
          (e = t.shift()) && (i = this._callbacks[e]);

        )
          (s = h(i.sync, this, [e].concat(n))),
            (o = h(i.async, this, [e].concat(n))),
            s() && c(o);
        return this;
      }
      function h(t, e, i) {
        function n() {
          for (var n, s = 0, o = t.length; !n && s < o; s += 1)
            n = !1 === t[s].apply(e, i);
          return !n;
        }
        return n;
      }
      function l(t, e) {
        return t.bind
          ? t.bind(e)
          : function() {
              t.apply(e, [].slice.call(arguments, 0));
            };
      }
      var c = i(9),
        u = /\s+/;
      t.exports = { onSync: o, onAsync: s, off: r, trigger: a };
    },
    function(t, e, i) {
      'use strict';
      function n() {
        a &&
          h &&
          ((a = !1), h.length ? (p = h.concat(p)) : (u = -1), p.length && s());
      }
      function s() {
        if (!a) {
          (d = !1), (a = !0);
          for (var t = p.length, e = setTimeout(n); t; ) {
            for (h = p, p = []; h && ++u < t; ) h[u].run();
            (u = -1), (t = p.length);
          }
          (h = null), (u = -1), (a = !1), clearTimeout(e);
        }
      }
      function o(t, e) {
        (this.fun = t), (this.array = e);
      }
      function r(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
        p.push(new o(t, e)), d || a || ((d = !0), l());
      }
      for (
        var a,
          h,
          l,
          c = [i(10), i(12), i(13), i(14), i(15)],
          u = -1,
          p = [],
          d = !1,
          f = -1,
          m = c.length;
        ++f < m;

      )
        if (c[f] && c[f].test && c[f].test()) {
          l = c[f].install(s);
          break;
        }
      (o.prototype.run = function() {
        var t = this.fun,
          e = this.array;
        switch (e.length) {
          case 0:
            return t();
          case 1:
            return t(e[0]);
          case 2:
            return t(e[0], e[1]);
          case 3:
            return t(e[0], e[1], e[2]);
          default:
            return t.apply(null, e);
        }
      }),
        (t.exports = r);
    },
    function(t, e, i) {
      (function(t) {
        'use strict';
        (e.test = function() {
          return void 0 !== t && !t.browser;
        }),
          (e.install = function(e) {
            return function() {
              t.nextTick(e);
            };
          });
      }.call(e, i(11)));
    },
    function(t) {
      function e() {
        throw new Error('setTimeout has not been defined');
      }
      function i() {
        throw new Error('clearTimeout has not been defined');
      }
      function n(t) {
        if (l === setTimeout) return setTimeout(t, 0);
        if ((l === e || !l) && setTimeout)
          return (l = setTimeout), setTimeout(t, 0);
        try {
          return l(t, 0);
        } catch (i) {
          try {
            return l.call(null, t, 0);
          } catch (i) {
            return l.call(this, t, 0);
          }
        }
      }
      function s(t) {
        if (c === clearTimeout) return clearTimeout(t);
        if ((c === i || !c) && clearTimeout)
          return (c = clearTimeout), clearTimeout(t);
        try {
          return c(t);
        } catch (e) {
          try {
            return c.call(null, t);
          } catch (e) {
            return c.call(this, t);
          }
        }
      }
      function o() {
        f &&
          p &&
          ((f = !1), p.length ? (d = p.concat(d)) : (m = -1), d.length && r());
      }
      function r() {
        if (!f) {
          var t = n(o);
          f = !0;
          for (var e = d.length; e; ) {
            for (p = d, d = []; ++m < e; ) p && p[m].run();
            (m = -1), (e = d.length);
          }
          (p = null), (f = !1), s(t);
        }
      }
      function a(t, e) {
        (this.fun = t), (this.array = e);
      }
      function h() {}
      var l,
        c,
        u = (t.exports = {});
      !(function() {
        try {
          l = 'function' == typeof setTimeout ? setTimeout : e;
        } catch (t) {
          l = e;
        }
        try {
          c = 'function' == typeof clearTimeout ? clearTimeout : i;
        } catch (t) {
          c = i;
        }
      })();
      var p,
        d = [],
        f = !1,
        m = -1;
      (u.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
        d.push(new a(t, e)), 1 !== d.length || f || n(r);
      }),
        (a.prototype.run = function() {
          this.fun.apply(null, this.array);
        }),
        (u.title = 'browser'),
        (u.browser = !0),
        (u.env = {}),
        (u.argv = []),
        (u.version = ''),
        (u.versions = {}),
        (u.on = h),
        (u.addListener = h),
        (u.once = h),
        (u.off = h),
        (u.removeListener = h),
        (u.removeAllListeners = h),
        (u.emit = h),
        (u.binding = function() {
          throw new Error('process.binding is not supported');
        }),
        (u.cwd = function() {
          return '/';
        }),
        (u.chdir = function() {
          throw new Error('process.chdir is not supported');
        }),
        (u.umask = function() {
          return 0;
        });
    },
    function(t, e) {
      (function(t) {
        'use strict';
        var i = t.MutationObserver || t.WebKitMutationObserver;
        (e.test = function() {
          return i;
        }),
          (e.install = function(e) {
            var n = 0,
              s = new i(e),
              o = t.document.createTextNode('');
            return (
              s.observe(o, { characterData: !0 }),
              function() {
                o.data = n = ++n % 2;
              }
            );
          });
      }.call(
        e,
        (function() {
          return this;
        })()
      ));
    },
    function(t, e) {
      (function(t) {
        'use strict';
        (e.test = function() {
          return !t.setImmediate && void 0 !== t.MessageChannel;
        }),
          (e.install = function(e) {
            var i = new t.MessageChannel();
            return (
              (i.port1.onmessage = e),
              function() {
                i.port2.postMessage(0);
              }
            );
          });
      }.call(
        e,
        (function() {
          return this;
        })()
      ));
    },
    function(t, e) {
      (function(t) {
        'use strict';
        (e.test = function() {
          return (
            'document' in t &&
            'onreadystatechange' in t.document.createElement('script')
          );
        }),
          (e.install = function(e) {
            return function() {
              var i = t.document.createElement('script');
              return (
                (i.onreadystatechange = function() {
                  e(),
                    (i.onreadystatechange = null),
                    i.parentNode.removeChild(i),
                    (i = null);
                }),
                t.document.documentElement.appendChild(i),
                e
              );
            };
          });
      }.call(
        e,
        (function() {
          return this;
        })()
      ));
    },
    function(t, e) {
      'use strict';
      (e.test = function() {
        return !0;
      }),
        (e.install = function(t) {
          return function() {
            setTimeout(t, 0);
          };
        });
    },
    function(t, e, i) {
      'use strict';
      function n(t) {
        var e,
          i,
          n,
          a = this;
        (t = t || {}).menu || o.error('menu is required'),
          o.isArray(t.datasets) ||
            o.isObject(t.datasets) ||
            o.error('1 or more datasets required'),
          t.datasets || o.error('datasets is required'),
          (this.isOpen = !1),
          (this.isEmpty = !0),
          (this.minLength = t.minLength || 0),
          (this.templates = {}),
          (this.appendTo = t.appendTo || !1),
          (this.css = o.mixin({}, l, t.appendTo ? l.appendTo : {})),
          (this.cssClasses = t.cssClasses = o.mixin(
            {},
            l.defaultClasses,
            t.cssClasses || {}
          )),
          (this.cssClasses.prefix =
            t.cssClasses.formattedPrefix ||
            o.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix)),
          (e = o.bind(this._onSuggestionClick, this)),
          (i = o.bind(this._onSuggestionMouseEnter, this)),
          (n = o.bind(this._onSuggestionMouseLeave, this));
        var h = o.className(this.cssClasses.prefix, this.cssClasses.suggestion);
        (this.$menu = r
          .element(t.menu)
          .on('mouseenter.aa', h, i)
          .on('mouseleave.aa', h, n)
          .on('click.aa', h, e)),
          (this.$container = t.appendTo ? t.wrapper : this.$menu),
          t.templates &&
            t.templates.header &&
            ((this.templates.header = o.templatify(t.templates.header)),
            this.$menu.prepend(this.templates.header())),
          t.templates &&
            t.templates.empty &&
            ((this.templates.empty = o.templatify(t.templates.empty)),
            (this.$empty = r.element(
              '<div class="' +
                o.className(this.cssClasses.prefix, this.cssClasses.empty, !0) +
                '"></div>'
            )),
            this.$menu.append(this.$empty),
            this.$empty.hide()),
          (this.datasets = o.map(t.datasets, function(e) {
            return s(a.$menu, e, t.cssClasses);
          })),
          o.each(this.datasets, function(t) {
            var e = t.getRoot();
            e && 0 === e.parent().length && a.$menu.append(e),
              t.onSync('rendered', a._onRendered, a);
          }),
          t.templates &&
            t.templates.footer &&
            ((this.templates.footer = o.templatify(t.templates.footer)),
            this.$menu.append(this.templates.footer()));
        var c = this;
        r.element(window).resize(function() {
          c._redraw();
        });
      }
      function s(t, e, i) {
        return new n.Dataset(o.mixin({ $menu: t, cssClasses: i }, e));
      }
      var o = i(4),
        r = i(2),
        a = i(8),
        h = i(17),
        l = i(19);
      o.mixin(n.prototype, a, {
        _onSuggestionClick: function(t) {
          this.trigger('suggestionClicked', r.element(t.currentTarget));
        },
        _onSuggestionMouseEnter: function(t) {
          var e = r.element(t.currentTarget);
          if (
            !e.hasClass(
              o.className(this.cssClasses.prefix, this.cssClasses.cursor, !0)
            )
          ) {
            this._removeCursor();
            var i = this;
            setTimeout(function() {
              i._setCursor(e, !1);
            }, 0);
          }
        },
        _onSuggestionMouseLeave: function(t) {
          (t.relatedTarget &&
            r
              .element(t.relatedTarget)
              .closest(
                '.' +
                  o.className(
                    this.cssClasses.prefix,
                    this.cssClasses.cursor,
                    !0
                  )
              ).length > 0) ||
            (this._removeCursor(), this.trigger('cursorRemoved'));
        },
        _onRendered: function(t, e) {
          function i(t) {
            return t.isEmpty();
          }
          function n(t) {
            return t.templates && t.templates.empty;
          }
          if (((this.isEmpty = o.every(this.datasets, i)), this.isEmpty))
            if (
              (e.length >= this.minLength && this.trigger('empty'), this.$empty)
            )
              if (e.length < this.minLength) this._hide();
              else {
                var s = this.templates.empty({
                  query: this.datasets[0] && this.datasets[0].query
                });
                this.$empty.html(s), this.$empty.show(), this._show();
              }
            else
              o.any(this.datasets, n)
                ? e.length < this.minLength
                  ? this._hide()
                  : this._show()
                : this._hide();
          else
            this.isOpen &&
              (this.$empty && (this.$empty.empty(), this.$empty.hide()),
              e.length >= this.minLength ? this._show() : this._hide());
          this.trigger('datasetRendered');
        },
        _hide: function() {
          this.$container.hide();
        },
        _show: function() {
          this.$container.css('display', 'block'),
            this._redraw(),
            this.trigger('shown');
        },
        _redraw: function() {
          this.isOpen && this.appendTo && this.trigger('redrawn');
        },
        _getSuggestions: function() {
          return this.$menu.find(
            o.className(this.cssClasses.prefix, this.cssClasses.suggestion)
          );
        },
        _getCursor: function() {
          return this.$menu
            .find(o.className(this.cssClasses.prefix, this.cssClasses.cursor))
            .first();
        },
        _setCursor: function(t, e) {
          t
            .first()
            .addClass(
              o.className(this.cssClasses.prefix, this.cssClasses.cursor, !0)
            )
            .attr('aria-selected', 'true'),
            this.trigger('cursorMoved', e);
        },
        _removeCursor: function() {
          this._getCursor()
            .removeClass(
              o.className(this.cssClasses.prefix, this.cssClasses.cursor, !0)
            )
            .removeAttr('aria-selected');
        },
        _moveCursor: function(t) {
          var e, i, n, s;
          if (this.isOpen) {
            if (
              ((i = this._getCursor()),
              (e = this._getSuggestions()),
              this._removeCursor(),
              -1 == (n = (((n = e.index(i) + t) + 1) % (e.length + 1)) - 1))
            )
              return void this.trigger('cursorRemoved');
            n < -1 && (n = e.length - 1),
              this._setCursor((s = e.eq(n)), !0),
              this._ensureVisible(s);
          }
        },
        _ensureVisible: function(t) {
          var e, i, n, s;
          (i =
            (e = t.position().top) +
            t.height() +
            parseInt(t.css('margin-top'), 10) +
            parseInt(t.css('margin-bottom'), 10)),
            (n = this.$menu.scrollTop()),
            (s =
              this.$menu.height() +
              parseInt(this.$menu.css('padding-top'), 10) +
              parseInt(this.$menu.css('padding-bottom'), 10)),
            e < 0
              ? this.$menu.scrollTop(n + e)
              : s < i && this.$menu.scrollTop(n + (i - s));
        },
        close: function() {
          this.isOpen &&
            ((this.isOpen = !1),
            this._removeCursor(),
            this._hide(),
            this.trigger('closed'));
        },
        open: function() {
          this.isOpen ||
            ((this.isOpen = !0),
            this.isEmpty || this._show(),
            this.trigger('opened'));
        },
        setLanguageDirection: function(t) {
          this.$menu.css('ltr' === t ? this.css.ltr : this.css.rtl);
        },
        moveCursorUp: function() {
          this._moveCursor(-1);
        },
        moveCursorDown: function() {
          this._moveCursor(1);
        },
        getDatumForSuggestion: function(t) {
          var e = null;
          return (
            t.length &&
              (e = {
                raw: h.extractDatum(t),
                value: h.extractValue(t),
                datasetName: h.extractDatasetName(t)
              }),
            e
          );
        },
        getCurrentCursor: function() {
          return this._getCursor().first();
        },
        getDatumForCursor: function() {
          return this.getDatumForSuggestion(this._getCursor().first());
        },
        getDatumForTopSuggestion: function() {
          return this.getDatumForSuggestion(this._getSuggestions().first());
        },
        cursorTopSuggestion: function() {
          this._setCursor(this._getSuggestions().first(), !1);
        },
        update: function(t) {
          function e(e) {
            e.update(t);
          }
          o.each(this.datasets, e);
        },
        empty: function() {
          function t(t) {
            t.clear();
          }
          o.each(this.datasets, t), (this.isEmpty = !0);
        },
        isVisible: function() {
          return this.isOpen && !this.isEmpty;
        },
        destroy: function() {
          function t(t) {
            t.destroy();
          }
          this.$menu.off('.aa'), (this.$menu = null), o.each(this.datasets, t);
        }
      }),
        (n.Dataset = h),
        (t.exports = n);
    },
    function(t, e, i) {
      'use strict';
      function n(t) {
        ((t = t || {}).templates = t.templates || {}),
          t.source || c.error('missing source'),
          t.name && !r(t.name) && c.error('invalid dataset name: ' + t.name),
          (this.query = null),
          (this._isEmpty = !0),
          (this.highlight = !!t.highlight),
          (this.name =
            void 0 === t.name || null === t.name ? c.getUniqueId() : t.name),
          (this.source = t.source),
          (this.displayFn = s(t.display || t.displayKey)),
          (this.templates = o(t.templates, this.displayFn)),
          (this.css = c.mixin({}, d, t.appendTo ? d.appendTo : {})),
          (this.cssClasses = t.cssClasses = c.mixin(
            {},
            d.defaultClasses,
            t.cssClasses || {}
          )),
          (this.cssClasses.prefix =
            t.cssClasses.formattedPrefix ||
            c.formatPrefix(this.cssClasses.prefix, this.cssClasses.noPrefix));
        var e = c.className(this.cssClasses.prefix, this.cssClasses.dataset);
        (this.$el =
          t.$menu && t.$menu.find(e + '-' + this.name).length > 0
            ? u.element(t.$menu.find(e + '-' + this.name)[0])
            : u.element(
                p.dataset
                  .replace('%CLASS%', this.name)
                  .replace('%PREFIX%', this.cssClasses.prefix)
                  .replace('%DATASET%', this.cssClasses.dataset)
              )),
          (this.$menu = t.$menu),
          this.clearCachedSuggestions();
      }
      function s(t) {
        function e(e) {
          return e[t];
        }
        return (t = t || 'value'), c.isFunction(t) ? t : e;
      }
      function o(t, e) {
        function i(t) {
          return '<p>' + e(t) + '</p>';
        }
        return {
          empty: t.empty && c.templatify(t.empty),
          header: t.header && c.templatify(t.header),
          footer: t.footer && c.templatify(t.footer),
          suggestion: t.suggestion || i
        };
      }
      function r(t) {
        return /^[_a-zA-Z0-9-]+$/.test(t);
      }
      var a = 'aaDataset',
        h = 'aaValue',
        l = 'aaDatum',
        c = i(4),
        u = i(2),
        p = i(18),
        d = i(19),
        f = i(8);
      (n.extractDatasetName = function(t) {
        return u.element(t).data(a);
      }),
        (n.extractValue = function(t) {
          return u.element(t).data(h);
        }),
        (n.extractDatum = function(t) {
          var e = u.element(t).data(l);
          return 'string' == typeof e && (e = JSON.parse(e)), e;
        }),
        c.mixin(n.prototype, f, {
          _render: function(t, e) {
            function i() {
              var e = [].slice.call(arguments, 0);
              return (
                (e = [{ query: t, isEmpty: !0 }].concat(e)),
                d.templates.empty.apply(this, e)
              );
            }
            function n() {
              function t(t) {
                var e,
                  i = p.suggestion
                    .replace('%PREFIX%', o.cssClasses.prefix)
                    .replace('%SUGGESTION%', o.cssClasses.suggestion);
                return (
                  (e = u
                    .element(i)
                    .attr({
                      role: 'option',
                      id: ['option', Math.floor(1e8 * Math.random())].join('-')
                    })
                    .append(
                      d.templates.suggestion.apply(this, [t].concat(s))
                    )).data(a, d.name),
                  e.data(h, d.displayFn(t) || void 0),
                  e.data(l, JSON.stringify(t)),
                  e.children().each(function() {
                    u.element(this).css(o.css.suggestionChild);
                  }),
                  e
                );
              }
              var i,
                n,
                s = [].slice.call(arguments, 0),
                o = this,
                r = p.suggestions
                  .replace('%PREFIX%', this.cssClasses.prefix)
                  .replace('%SUGGESTIONS%', this.cssClasses.suggestions);
              return (
                (i = u.element(r).css(this.css.suggestions)),
                (n = c.map(e, t)),
                i.append.apply(i, n),
                i
              );
            }
            function s() {
              var e = [].slice.call(arguments, 0);
              return (
                (e = [{ query: t, isEmpty: !r }].concat(e)),
                d.templates.header.apply(this, e)
              );
            }
            function o() {
              var e = [].slice.call(arguments, 0);
              return (
                (e = [{ query: t, isEmpty: !r }].concat(e)),
                d.templates.footer.apply(this, e)
              );
            }
            if (this.$el) {
              var r,
                d = this,
                f = [].slice.call(arguments, 2);
              this.$el.empty(),
                (r = e && e.length),
                (this._isEmpty = !r),
                !r && this.templates.empty
                  ? this.$el
                      .html(i.apply(this, f))
                      .prepend(d.templates.header ? s.apply(this, f) : null)
                      .append(d.templates.footer ? o.apply(this, f) : null)
                  : r &&
                    this.$el
                      .html(n.apply(this, f))
                      .prepend(d.templates.header ? s.apply(this, f) : null)
                      .append(d.templates.footer ? o.apply(this, f) : null),
                this.$menu &&
                  this.$menu
                    .addClass(
                      this.cssClasses.prefix +
                        (r ? 'with' : 'without') +
                        '-' +
                        this.name
                    )
                    .removeClass(
                      this.cssClasses.prefix +
                        (r ? 'without' : 'with') +
                        '-' +
                        this.name
                    ),
                this.trigger('rendered', t);
            }
          },
          getRoot: function() {
            return this.$el;
          },
          update: function(t) {
            function e(e) {
              if (!this.canceled && t === this.query) {
                var i = [].slice.call(arguments, 1);
                this.cacheSuggestions(t, e, i),
                  this._render.apply(this, [t, e].concat(i));
              }
            }
            (this.query = t),
              (this.canceled = !1),
              this.shouldFetchFromCache(t)
                ? e.apply(
                    this,
                    [this.cachedSuggestions].concat(this.cachedRenderExtraArgs)
                  )
                : this.source(t, e.bind(this));
          },
          cacheSuggestions: function(t, e, i) {
            (this.cachedQuery = t),
              (this.cachedSuggestions = e),
              (this.cachedRenderExtraArgs = i);
          },
          shouldFetchFromCache: function(t) {
            return (
              this.cachedQuery === t &&
              this.cachedSuggestions &&
              this.cachedSuggestions.length
            );
          },
          clearCachedSuggestions: function() {
            delete this.cachedQuery,
              delete this.cachedSuggestions,
              delete this.cachedRenderExtraArgs;
          },
          cancel: function() {
            this.canceled = !0;
          },
          clear: function() {
            this.cancel(), this.$el.empty(), this.trigger('rendered', '');
          },
          isEmpty: function() {
            return this._isEmpty;
          },
          destroy: function() {
            this.clearCachedSuggestions(), (this.$el = null);
          }
        }),
        (t.exports = n);
    },
    function(t) {
      'use strict';
      t.exports = {
        wrapper: '<span class="%ROOT%"></span>',
        dropdown: '<span class="%PREFIX%%DROPDOWN_MENU%"></span>',
        dataset: '<div class="%PREFIX%%DATASET%-%CLASS%"></div>',
        suggestions: '<span class="%PREFIX%%SUGGESTIONS%"></span>',
        suggestion: '<div class="%PREFIX%%SUGGESTION%"></div>'
      };
    },
    function(t, e, i) {
      'use strict';
      var n = i(4),
        s = {
          wrapper: { position: 'relative', display: 'inline-block' },
          hint: {
            position: 'absolute',
            top: '0',
            left: '0',
            borderColor: 'transparent',
            boxShadow: 'none',
            opacity: '1'
          },
          input: {
            position: 'relative',
            verticalAlign: 'top',
            backgroundColor: 'transparent'
          },
          inputWithNoHint: { position: 'relative', verticalAlign: 'top' },
          dropdown: {
            position: 'absolute',
            top: '100%',
            left: '0',
            zIndex: '100',
            display: 'none'
          },
          suggestions: { display: 'block' },
          suggestion: { whiteSpace: 'nowrap', cursor: 'pointer' },
          suggestionChild: { whiteSpace: 'normal' },
          ltr: { left: '0', right: 'auto' },
          rtl: { left: 'auto', right: '0' },
          defaultClasses: {
            root: 'algolia-autocomplete',
            prefix: 'aa',
            noPrefix: !1,
            dropdownMenu: 'dropdown-menu',
            input: 'input',
            hint: 'hint',
            suggestions: 'suggestions',
            suggestion: 'suggestion',
            cursor: 'cursor',
            dataset: 'dataset',
            empty: 'empty'
          },
          appendTo: {
            wrapper: { position: 'absolute', zIndex: '100', display: 'none' },
            input: {},
            inputWithNoHint: {},
            dropdown: { display: 'block' }
          }
        };
      n.isMsie() &&
        n.mixin(s.input, {
          backgroundImage:
            'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
        }),
        n.isMsie() &&
          n.isMsie() <= 7 &&
          n.mixin(s.input, { marginTop: '-1px' }),
        (t.exports = s);
    },
    function(t, e, i) {
      'use strict';
      t.exports = { hits: i(21), popularIn: i(24) };
    },
    function(t, e, i) {
      'use strict';
      var n = i(4),
        s = i(22),
        o = i(23);
      t.exports = function(t, e) {
        function i(i, s) {
          t.search(i, e, function(t, e) {
            t ? n.error(t.message) : s(e.hits, e);
          });
        }
        var r = o(t.as._ua);
        return (
          r &&
            r[0] >= 3 &&
            r[1] > 20 &&
            ((e = e || {}).additionalUA = 'autocomplete.js ' + s),
          i
        );
      };
    },
    function(t) {
      t.exports = '0.29.0';
    },
    function(t) {
      'use strict';
      t.exports = function(t) {
        var e = t.match(/Algolia for vanilla JavaScript (\d+\.)(\d+\.)(\d+)/);
        if (e) return [e[1], e[2], e[3]];
      };
    },
    function(t, e, i) {
      'use strict';
      var n = i(4),
        s = i(22),
        o = i(23);
      t.exports = function(t, e, i, r) {
        function a(a, h) {
          t.search(a, e, function(t, a) {
            if (t) n.error(t.message);
            else {
              if (a.hits.length > 0) {
                var u = a.hits[0],
                  p = n.mixin({ hitsPerPage: 0 }, i);
                delete p.source, delete p.index;
                var d = o(c.as._ua);
                return (
                  d &&
                    d[0] >= 3 &&
                    d[1] > 20 &&
                    (e.additionalUA = 'autocomplete.js ' + s),
                  void c.search(l(u), p, function(t, e) {
                    if (t) n.error(t.message);
                    else {
                      var i = [];
                      if (r.includeAll) {
                        var s = r.allTitle || 'All departments';
                        i.push(
                          n.mixin(
                            { facet: { value: s, count: e.nbHits } },
                            n.cloneDeep(u)
                          )
                        );
                      }
                      n.each(e.facets, function(t, e) {
                        n.each(t, function(t, s) {
                          i.push(
                            n.mixin(
                              { facet: { facet: e, value: s, count: t } },
                              n.cloneDeep(u)
                            )
                          );
                        });
                      });
                      for (var o = 1; o < a.hits.length; ++o) i.push(a.hits[o]);
                      h(i, a);
                    }
                  })
                );
              }
              h([]);
            }
          });
        }
        var h = o(t.as._ua);
        if (
          (h &&
            h[0] >= 3 &&
            h[1] > 20 &&
            ((e = e || {}).additionalUA = 'autocomplete.js ' + s),
          !i.source)
        )
          return n.error("Missing 'source' key");
        var l = n.isFunction(i.source)
          ? i.source
          : function(t) {
              return t[i.source];
            };
        if (!i.index) return n.error("Missing 'index' key");
        var c = i.index;
        return (r = r || {}), a;
      };
    }
  ]),
  (window.CacheGet = {
    _inMemoryStore: {},
    find: function(t) {
      this._validateOpts(t);
      var e = this._find(t);
      e ? t.onSuccess(e) : this._fetchAndCache(t);
    },
    _find: function(t) {
      return this._inMemoryStore[t.key];
    },
    _validateOpts: function(t) {
      if (!t.key) throw 'Invalid key';
      if (!t.url) throw 'Invalid URL';
      if (!t.onSuccess) throw 'Invalid callback';
    },
    _fetchAndCache: function(t) {
      var e = this;
      $.ajax({
        dataType: t.dataType || 'text',
        url: t.url,
        success: function(i) {
          var n = i;
          'function' == typeof t.createCacheableResult &&
            (n = t.createCacheableResult(i)),
            (e._inMemoryStore[t.key] = n),
            t.onSuccess(n);
        }
      });
    }
  });
var IDGenerator = {
  length: 8,
  generate: function() {
    for (
      var t = (+new Date())
          .toString()
          .split('')
          .reverse(),
        e = '',
        i = 0;
      i < this.length;
      ++i
    ) {
      e += t[this._getRandomInt(0, t.length - 1)];
    }
    return e;
  },
  _getRandomInt: function(t, e) {
    return Math.floor(Math.random() * (e - t + 1)) + t;
  }
};
!(function() {
  var t = !1,
    e = /xyz/.test(function() {
      xyz;
    })
      ? /\b_super\b/
      : /.*/;
  (this.Class = function() {}),
    (Class.extend = function(i) {
      function n() {
        !t && this.init && this.init.apply(this, arguments);
      }
      var s = this.prototype;
      t = !0;
      var o = new this();
      for (var r in ((t = !1), i))
        o[r] =
          'function' == typeof i[r] && 'function' == typeof s[r] && e.test(i[r])
            ? (function(t, e) {
                return function() {
                  var i = this._super;
                  this._super = s[t];
                  var n = e.apply(this, arguments);
                  return (this._super = i), n;
                };
              })(r, i[r])
            : i[r];
      return (
        (n.prototype = o),
        (n.prototype.constructor = n),
        (n.extend = arguments.callee),
        n
      );
    });
})(),
  (window.Keytrap = (function() {
    'use strict';
    function t(t) {
      var e = [t.keyCode || t.which];
      return (
        t.shiftKey && 16 !== t.keyCode && e.push(16),
        t.ctrlKey && 17 !== t.keyCode && e.push(17),
        t.altKey && 18 !== t.keyCode && e.push(18),
        t.metaKey && 91 !== t.keyCode && e.push(91),
        e.sort(),
        e.join('+')
      );
    }
    function e(t) {
      return h[t] ? h[t] : t.toUpperCase().charCodeAt(0);
    }
    function i(t) {
      for (var i = t.split('+'), n = [], s = 0; s < i.length; s++)
        n.push(e(i[s]));
      return n.sort(), n.join('+');
    }
    function n(t) {
      for (var e = [], n = t.split(','), s = 0; s < n.length; s++)
        e.push(i(n[s]));
      return e;
    }
    function s(t, e) {
      if (r[e]) {
        for (var i = r[e], n = 0; n < i.length; n++) i[n](t);
        if (a[e] && t) return jQuery.Event(t).stopPropagation(), !1;
      }
    }
    function o(e) {
      return s(e, t(e));
    }
    var r = {},
      a = {},
      h = {
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
      -1 !== navigator.appVersion.indexOf('Mac') && (h.comctrl = 91),
      $(document).on('keydown', o),
      {
        bind: function(t, e, i) {
          for (var s = n(t), o = s.length - 1; o >= 0; o--)
            jQuery.isArray(r[s[o]]) || (r[s[o]] = []),
              r[s[o]].push(e),
              (a[s[o]] = !!i);
        },
        getKeyCode: function(t) {
          return e(t);
        },
        getKeyEventID: function(e) {
          return 'string' == typeof e ? i(e) : t(e);
        },
        keyEventMatchesKeyCombo: function(e, n) {
          return t(e) === i(n);
        },
        trigger: function(t, e) {
          s(t, e);
        }
      }
    );
  })());
