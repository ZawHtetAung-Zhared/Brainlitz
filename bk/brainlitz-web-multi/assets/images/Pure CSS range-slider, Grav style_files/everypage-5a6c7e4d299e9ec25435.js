webpackJsonp(
  [6],
  {
    100: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(69),
        p =
          (t.n(s),
          (function() {
            function e(e, n) {
              for (var t = 0; t < n.length; t++) {
                var r = n[t];
                (r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  'value' in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r);
              }
            }
            return function(n, t, r) {
              return t && e(n.prototype, t), r && e(n, r), n;
            };
          })()),
        f = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            p(n, [
              {
                key: 'componentDidMount',
                value: function() {
                  (this.messageTimeout = null), this.clearMessageOnTimeout();
                }
              },
              {
                key: 'componentDidUpdate',
                value: function() {
                  this.clearMessageOnTimeout();
                }
              },
              {
                key: 'clearMessageOnTimeout',
                value: function() {
                  clearTimeout(this.messageTimeout),
                    this.props.message &&
                      (this.messageTimeout = setTimeout(
                        function() {
                          this.props.clearPopupMessage();
                        }.bind(this),
                        2500
                      ));
                }
              },
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    'div',
                    { className: 'alert-container' },
                    u.a.createElement(
                      s.CSSTransitionGroup,
                      {
                        transitionName: 'fade-in',
                        transitionEnterTimeout: 150,
                        transitionLeaveTimeout: 150
                      },
                      u.a.createElement(
                        'div',
                        { className: 'flash-message' },
                        this.props.message
                      )
                    )
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      (f.propTypes = {
        message: l.a.string,
        clearPopupMessage: l.a.func.isRequired
      }),
        (n.a = f);
    },
    101: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(113),
        d = t(12),
        m = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        b = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  mutation MenuPopupsCloseMenu($menu: String) {\n    popupsCloseMenu(menu: $menu) @client\n  }\n'
          ],
          [
            '\n  mutation MenuPopupsCloseMenu($menu: String) {\n    popupsCloseMenu(menu: $menu) @client\n  }\n'
          ]
        ),
        y = p()(b),
        E = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            m(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(
                    d.a,
                    { mutation: y, variables: { menu: this.props.menu } },
                    function(n) {
                      return u.a.createElement(
                        f.a,
                        {
                          className: e.props.className,
                          listen: e.props.isOpen,
                          onClickOutside: function() {
                            n();
                          },
                          ignore: e.props.link,
                          style: e.props.style
                        },
                        e.props.children
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(E, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: {
          className: l.a.string,
          children: l.a.node,
          menu: l.a.string,
          isOpen: l.a.bool,
          link: l.a.object,
          style: l.a.object
        }
      }),
        (n.a = E);
    },
    113: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        p = (function(e) {
          function n() {
            var e, t, a, i;
            r(this, n);
            for (var u = arguments.length, c = Array(u), l = 0; l < u; l++)
              c[l] = arguments[l];
            return (
              (t = a = o(
                this,
                (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(
                  e,
                  [this].concat(c)
                )
              )),
              Object.defineProperty(a, 'onKeyDown', {
                enumerable: !0,
                writable: !0,
                value: function(e) {
                  27 === e.keyCode && a.props.onClickOutside();
                }
              }),
              Object.defineProperty(a, 'handleClick', {
                enumerable: !0,
                writable: !0,
                value: function(e) {
                  a._container.contains(e.target) ||
                    (a.props.ignore && a.props.ignore.contains(e.target)) ||
                    a.props.onClickOutside();
                }
              }),
              (i = t),
              o(a, i)
            );
          }
          return (
            a(n, e),
            s(n, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.props.listen
                    ? this.addListeners()
                    : this.removeListeners();
                }
              },
              {
                key: 'componentDidUpdate',
                value: function() {
                  this.props.listen
                    ? this.addListeners()
                    : this.removeListeners();
                }
              },
              {
                key: 'componentWillUnmount',
                value: function() {
                  this.removeListeners();
                }
              },
              {
                key: 'addListeners',
                value: function() {
                  document.addEventListener('mousedown', this.handleClick, !1),
                    document.addEventListener(
                      'touchstart',
                      this.handleClick,
                      !1
                    ),
                    document.addEventListener('keydown', this.onKeyDown),
                    window.addEventListener(
                      'blur',
                      this.props.onClickOutside,
                      !1
                    );
                }
              },
              {
                key: 'removeListeners',
                value: function() {
                  document.removeEventListener(
                    'mousedown',
                    this.handleClick,
                    !1
                  ),
                    document.removeEventListener(
                      'touchstart',
                      this.handleClick,
                      !1
                    ),
                    document.removeEventListener('keydown', this.onKeyDown),
                    window.removeEventListener(
                      'blur',
                      this.props.onClickOutside,
                      !1
                    );
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(
                    'div',
                    {
                      ref: function(n) {
                        return (e._container = n);
                      },
                      className: this.props.className,
                      style: this.props.style
                    },
                    this.props.children
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(p, 'state', {
        enumerable: !0,
        writable: !0,
        value: { open: !1 }
      }),
        Object.defineProperty(p, 'propTypes', {
          enumerable: !0,
          writable: !0,
          value: {
            listen: l.a.bool,
            onClickOutside: l.a.func,
            className: l.a.string,
            children: l.a.node,
            ignore: l.a.object,
            style: l.a.object
          }
        }),
        (n.a = p);
    },
    115: function(e, n, t) {
      'use strict';
      t.d(n, 'b', function() {
        return o;
      }),
        t.d(n, 'a', function() {
          return a;
        });
      var r = t(7),
        o = function(e) {
          return { type: r.a.SEND_REQUEST, payload: { requestKey: e } };
        },
        a = function(e) {
          return { type: r.a.RECEIVE_REQUEST, payload: { requestKey: e } };
        };
    },
    116: function(e, n, t) {
      'use strict';
      var r = t(0),
        o = t.n(r),
        a = function() {
          return o.a.createElement(
            r.Fragment,
            null,
            o.a.createElement(
              'a',
              {
                className: 'button button-medium signup-button green bold',
                href: '/accounts/signup/user/free'
              },
              'Sign Up'
            ),
            o.a.createElement(
              'a',
              {
                className: 'button button-medium login-button',
                href: '/login'
              },
              'Log In'
            )
          );
        };
      n.a = a;
    },
    117: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(18),
        l = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        s = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            l(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    i.Fragment,
                    null,
                    u.a.createElement(c.a, {
                      url: '/login',
                      classes: 'button-medium',
                      label: 'Log In'
                    }),
                    u.a.createElement('br', { className: 'mobile-break' }),
                    u.a.createElement(c.a, {
                      url: '/signup',
                      classes: 'black roll-yellow bold',
                      label: 'Sign Up'
                    })
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = s;
    },
    12: function(e, n, t) {
      'use strict';
      (function(e) {
        var r = t(0),
          o = t.n(r),
          a = t(1),
          i = t.n(a),
          u = t(21),
          c = (t.n(u), t(2)),
          l = t.n(c),
          s = t(55),
          p = t(58),
          f = (function(e, n) {
            return Object.freeze(
              Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
            );
          })(
            [
              '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
            ],
            [
              '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
            ]
          ),
          d = l()(f),
          m = function(n) {
            console.error(n), 'development' !== e.env.ENV && Object(s.b)(n);
          },
          b = function(e) {
            return o.a.createElement(u.Mutation, e, function(n, t) {
              var r = t.error;
              return r
                ? (m(r),
                  e.errorHandler && e.errorHandler(),
                  e.errorRender
                    ? e.errorRender
                    : e.showModalOnError
                    ? o.a.createElement(u.Mutation, { mutation: d }, function(
                        e
                      ) {
                        return o.a.createElement(p.a, {
                          openModal: e,
                          type: 'MUTATION'
                        });
                      })
                    : null)
                : e.children(n, t);
            });
          };
        (b.propTypes = {
          children: i.a.oneOfType([i.a.node, i.a.func]),
          errorHandler: i.a.func,
          showModalOnError: i.a.bool,
          errorRender: i.a.func
        }),
          (n.a = b);
      }.call(n, t(13)));
    },
    15: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return r;
      }),
        t.d(n, 'b', function() {
          return o;
        });
      var r = {
          PEN: 'pen',
          PROJECT: 'project',
          POST: 'post',
          COLLECTION: 'collection'
        },
        o = {
          PEN: 'pen',
          EDITOR: 'editor',
          FULL: 'full',
          DETAILS: 'details',
          DEBUG: 'debug',
          LIVE: 'live',
          COLLAB: 'collab',
          PRESENTATION: 'pres',
          PROFESSOR: 'professor'
        };
    },
    17: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return r;
      });
      var r = {
        ORGANIZE: 'Organize',
        PIN: 'Pin',
        POPUPS: 'Popups',
        USER: 'User',
        FEATURE_NOTIFICATION: 'FeatureNotification',
        CLIENT_USER: 'ClientUser',
        ITEM_LOCAL_STATE: 'ItemLocalState'
      };
    },
    18: function(e, n, t) {
      'use strict';
      function r(e, n) {
        var t = {};
        for (var r in e)
          n.indexOf(r) >= 0 ||
            (Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]));
        return t;
      }
      function o(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function a(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function i(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        f = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        d = (function(e) {
          function n() {
            return (
              o(this, n),
              a(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            i(n, e),
            f(n, [
              {
                key: 'render',
                value: function() {
                  var e = this,
                    n = this.props,
                    t = n.classes,
                    o = n.className,
                    a = n.url,
                    i = n.label,
                    u = n.children,
                    l = r(n, [
                      'classes',
                      'className',
                      'url',
                      'label',
                      'children'
                    ]);
                  return c.a.createElement(
                    'a',
                    p(
                      {
                        className: 'button ' + (t || '') + ' ' + (o || ''),
                        href: a || '#',
                        onClick: function(n) {
                          e.props.onClick &&
                            (n.preventDefault(), e.props.onClick());
                        }
                      },
                      l
                    ),
                    i || u
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      (d.propTypes = {
        classes: s.a.string,
        className: s.a.string,
        label: s.a.string,
        url: s.a.string,
        onClick: s.a.func,
        children: s.a.node
      }),
        (n.a = d);
    },
    20: function(e, n, t) {
      'use strict';
      function r(e, n) {
        var t = {};
        for (var r in e)
          n.indexOf(r) >= 0 ||
            (Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]));
        return t;
      }
      function o(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function a(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function i(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        f = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        d = (function(e) {
          function n(e) {
            o(this, n);
            var t = a(
              this,
              (n.__proto__ || Object.getPrototypeOf(n)).call(this, e)
            );
            return (t.element = Object(u.createRef)()), t;
          }
          return (
            i(n, e),
            f(n, [
              {
                key: 'clickHandler',
                value: function(e) {
                  e && e.preventDefault(),
                    this.props.onClick && this.props.onClick();
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this,
                    n = this.props,
                    t = n.classes,
                    o = n.children,
                    a = n.label,
                    i = r(n, ['classes', 'children', 'label']);
                  return (
                    (i = p({}, i, {
                      className: 'button ' + t,
                      onClick: function(n) {
                        return e.clickHandler(n);
                      }
                    })),
                    c.a.createElement(
                      'button',
                      p({}, i, { ref: this.element }),
                      o || a
                    )
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      (d.propTypes = {
        classes: s.a.string,
        label: s.a.string,
        onClick: s.a.func,
        disabled: s.a.bool,
        title: s.a.string,
        id: s.a.string,
        children: s.a.node
      }),
        (n.a = d);
    },
    231: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(5),
        p = t(294),
        f = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        d = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            f(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    i.Fragment,
                    null,
                    u.a.createElement(
                      'h1',
                      { className: 'logo header-chunk' },
                      u.a.createElement(
                        'a',
                        { href: '/', className: 'small-screen-logo' },
                        u.a.createElement(s.a, { icon: 'codepen-box' })
                      ),
                      u.a.createElement(
                        'a',
                        { href: '/', className: 'large-screen-logo' },
                        u.a.createElement(s.a, { icon: 'logo' })
                      )
                    ),
                    this.props.sidebar &&
                      u.a.createElement(
                        'div',
                        { className: 'collapse-button', onClick: p.a },
                        u.a.createElement(s.a, { icon: 'arrow-down-mini' }),
                        u.a.createElement(s.a, { icon: 'arrow-down-mini' })
                      )
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(d, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { sidebar: l.a.bool }
      }),
        (n.a = d);
    },
    232: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(2),
        s = t.n(l),
        p = t(8),
        f = t.n(p),
        d = t(4),
        m = t(12),
        b = t(101),
        y = t(5),
        E = t(116),
        h = t(74),
        v = t(394),
        O = t(396),
        _ = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        w = i(
          [
            '\n  query UserMenuSessionUser {\n    sessionUser {\n      id\n      anon\n      currentContext {\n        id\n        avatar80\n        username\n      }\n    }\n    popups @client {\n      __typename\n      id\n      menu\n    }\n  }\n'
          ],
          [
            '\n  query UserMenuSessionUser {\n    sessionUser {\n      id\n      anon\n      currentContext {\n        id\n        avatar80\n        username\n      }\n    }\n    popups @client {\n      __typename\n      id\n      menu\n    }\n  }\n'
          ]
        ),
        T = i(
          [
            '\n  mutation UserMenuToggleMenu($menu: String) {\n    popupsToggleMenu(menu: $menu) @client\n  }\n'
          ],
          [
            '\n  mutation UserMenuToggleMenu($menu: String) {\n    popupsToggleMenu(menu: $menu) @client\n  }\n'
          ]
        ),
        g = s()(w),
        P = s()(T),
        S = (function(e) {
          function n(e) {
            r(this, n);
            var t = o(
              this,
              (n.__proto__ || Object.getPrototypeOf(n)).call(this, e)
            );
            return (t._userButton = c.a.createRef()), t;
          }
          return (
            a(n, e),
            _(n, [
              {
                key: 'render',
                value: function() {
                  var e = this,
                    n = c.a.createElement(
                      u.Fragment,
                      null,
                      c.a.createElement('div', {
                        className: 'user-menu-preloading-space'
                      }),
                      c.a.createElement(
                        'ul',
                        {
                          className:
                            'user-menu user-sidebar-list menu-dropdown',
                          role: 'navigation'
                        },
                        c.a.createElement(O.a, null),
                        c.a.createElement(v.a, null)
                      )
                    );
                  return c.a.createElement(
                    d.a,
                    { query: g, loadingIndicator: n },
                    function(n) {
                      var t = n.data,
                        r = t.sessionUser,
                        o = t.popups,
                        a = o.menu === h.c,
                        i = f()('user-menu user-sidebar-list menu-dropdown', {
                          open: a
                        }),
                        l = f()('user-menu-button button', { active: a });
                      return r.anon
                        ? c.a.createElement(
                            'div',
                            { className: 'sidebar-logged-out-actions' },
                            c.a.createElement(E.a, null)
                          )
                        : c.a.createElement(
                            u.Fragment,
                            null,
                            c.a.createElement(
                              m.a,
                              { mutation: P, variables: { menu: h.c } },
                              function(n) {
                                return c.a.createElement(
                                  'button',
                                  {
                                    className: l,
                                    'aria-haspopup': 'true',
                                    'aria-expanded': a,
                                    onClick: n,
                                    ref: e._userButton
                                  },
                                  c.a.createElement('img', {
                                    src: r.currentContext.avatar80,
                                    width: '44',
                                    height: '44',
                                    className: 'user-avatar',
                                    alt: 'User Avatar'
                                  }),
                                  c.a.createElement(
                                    'span',
                                    { className: 'sidebar-username' },
                                    r.currentContext.username
                                  ),
                                  c.a.createElement(
                                    'div',
                                    { className: 'dropdown-arrows' },
                                    c.a.createElement(y.a, {
                                      icon: 'arrow-down-mini'
                                    }),
                                    c.a.createElement(y.a, {
                                      icon: 'arrow-down-mini'
                                    })
                                  )
                                );
                              }
                            ),
                            c.a.createElement(
                              b.a,
                              {
                                menu: h.c,
                                isOpen: a,
                                link: e._userButton.current
                              },
                              c.a.createElement(
                                'ul',
                                { className: i, role: 'navigation' },
                                c.a.createElement(O.a, null),
                                c.a.createElement(v.a, null)
                              )
                            )
                          );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      n.a = S;
    },
    255: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return u;
      });
      var r = t(42),
        o = t(39),
        a = void 0,
        i = function() {
          if (a) return a;
          var e = document.getElementById('init-data');
          return (a = e
            ? JSON.parse(e.getAttribute('value'))
            : { __constants: {} });
        },
        u = function() {
          var e = i();
          Object.keys(e.__constants).map(function(n) {
            Object(r.b)(Object(o.a)(n), e.__constants[n]);
          });
        };
    },
    262: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(8),
        s = t.n(l),
        p = t(1),
        f = t.n(p),
        d = t(2),
        m = t.n(d),
        b = t(4),
        y = t(5),
        E = t(12),
        h = t(67),
        v = t(92),
        O = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        _ = i(
          [
            '\n  query GetDataForPinButton {\n    featureNotifications @client\n    pins @client {\n      updatedAt\n      id\n      title\n      itemType\n    }\n    item @client {\n      id\n      itemType\n    }\n  }\n'
          ],
          [
            '\n  query GetDataForPinButton {\n    featureNotifications @client\n    pins @client {\n      updatedAt\n      id\n      title\n      itemType\n    }\n    item @client {\n      id\n      itemType\n    }\n  }\n'
          ]
        ),
        w = i(
          [
            '\n    query PinItemData($id: ID!) {\n      ',
            '(id: $id) {\n        id\n        title\n      }\n    }\n  '
          ],
          [
            '\n    query PinItemData($id: ID!) {\n      ',
            '(id: $id) {\n        id\n        title\n      }\n    }\n  '
          ]
        ),
        T = i(
          [
            '\n  mutation PinButtonPinsAddPin($id: ID!, $itemType: String!, $title: String!) {\n    pinsAddPin(id: $id, itemType: $itemType, title: $title) @client {\n      id\n    }\n  }\n'
          ],
          [
            '\n  mutation PinButtonPinsAddPin($id: ID!, $itemType: String!, $title: String!) {\n    pinsAddPin(id: $id, itemType: $itemType, title: $title) @client {\n      id\n    }\n  }\n'
          ]
        ),
        g = i(
          [
            '\n  mutation PinButtonPinRemove($id: ID!) {\n    pinsRemovePin(id: $id) @client {\n      id\n    }\n  }\n'
          ],
          [
            '\n  mutation PinButtonPinRemove($id: ID!) {\n    pinsRemovePin(id: $id) @client {\n      id\n    }\n  }\n'
          ]
        ),
        P = i(
          [
            '\n  mutation PinButtonTogglePinsDrawer($drawer: String) {\n    popupsToggleDrawer(drawer: $drawer) @client\n  }\n'
          ],
          [
            '\n  mutation PinButtonTogglePinsDrawer($drawer: String) {\n    popupsToggleDrawer(drawer: $drawer) @client\n  }\n'
          ]
        ),
        S = i(
          [
            '\n  mutation PopupsHidePinsNotification {\n    featureNotificationsHidePinsNotification @client\n  }\n'
          ],
          [
            '\n  mutation PopupsHidePinsNotification {\n    featureNotificationsHidePinsNotification @client\n  }\n'
          ]
        ),
        j = m()(_),
        C = function(e) {
          return m()(w, e);
        },
        R = m()(T),
        A = m()(g),
        I = m()(P),
        L = m()(S),
        N = (function(e) {
          function n(e) {
            r(this, n);
            var t = o(
              this,
              (n.__proto__ || Object.getPrototypeOf(n)).call(this, e)
            );
            return (t.pinButtonRef = c.a.createRef()), t;
          }
          return (
            a(n, e),
            O(n, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.props.onRef && this.props.onRef(this.pinButtonRef);
                }
              },
              {
                key: 'componentWillUnmount',
                value: function() {
                  this.props.onRef && this.props.onRef(void 0);
                }
              },
              {
                key: 'renderFeatureCallout',
                value: function(e) {
                  return e
                    ? c.a.createElement(
                        'div',
                        { className: 'feature-callout' },
                        'New feature!'
                      )
                    : null;
                }
              },
              {
                key: 'renderButton',
                value: function(e, n) {
                  return c.a.createElement(
                    'button',
                    {
                      className:
                        'button pin-dropdown-alone-button button-editor-outline',
                      onClick: n,
                      ref: this.pinButtonRef
                    },
                    c.a.createElement(y.a, {
                      icon: 'icon-pin',
                      width: '16',
                      height: '16'
                    }),
                    c.a.createElement(y.a, { icon: 'arrow-down-mini' }),
                    this.renderFeatureCallout(e)
                  );
                }
              },
              {
                key: 'renderPinnableButton',
                value: function(e, n, t, r) {
                  var o = this,
                    a = (t || []).some(function(e) {
                      return e.id === n.id;
                    }),
                    i = s()('button', 'button-editor-outline', 'pin-button', {
                      'is-pinned': a
                    });
                  return c.a.createElement(
                    b.a,
                    {
                      query: C(n.itemType),
                      variables: { id: n.id },
                      renderBeforeDataReady: !0,
                      showModalOnError: !0
                    },
                    function(t) {
                      var u = t.data,
                        l = t.loading,
                        s = u[n.itemType];
                      return c.a.createElement(
                        E.a,
                        {
                          mutation: R,
                          variables: {
                            id: n.id,
                            itemType: n.itemType,
                            title: l ? null : s.title || s.id
                          }
                        },
                        function(t) {
                          return c.a.createElement(
                            E.a,
                            { mutation: A, variables: { id: n.id } },
                            function(n) {
                              return c.a.createElement(
                                'div',
                                {
                                  className:
                                    'multi-button multi-button-outline multi-button-pin'
                                },
                                c.a.createElement(
                                  'button',
                                  { className: i, onClick: a ? n : t },
                                  c.a.createElement(y.a, { icon: 'icon-pin' })
                                ),
                                c.a.createElement(
                                  'button',
                                  {
                                    className:
                                      'button button-editor-outline pin-dropdown-button',
                                    onClick: r,
                                    ref: o.pinButtonRef
                                  },
                                  c.a.createElement(y.a, {
                                    icon: 'arrow-down-mini'
                                  }),
                                  o.renderFeatureCallout(e)
                                )
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return c.a.createElement(
                    b.a,
                    { query: j, variables: { notification: h.a.PINS } },
                    function(n) {
                      var t = n.data,
                        r = t.featureNotifications,
                        o = t.item,
                        a = t.pins,
                        i = r.includes(h.a.PINS);
                      return c.a.createElement(E.a, { mutation: L }, function(
                        n
                      ) {
                        return c.a.createElement(
                          E.a,
                          { mutation: I, variables: { drawer: v.b } },
                          function(t) {
                            var r = function() {
                              t(), n();
                            };
                            return o
                              ? e.renderPinnableButton(i, o, a, r)
                              : e.renderButton(i, r);
                          }
                        );
                      });
                    }
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      Object.defineProperty(N, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { onRef: f.a.func }
      }),
        (n.a = N);
    },
    263: function(e, n, t) {
      'use strict';
      (function(e) {
        t.d(n, 'a', function() {
          return a;
        });
        var r = t(57),
          o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          a = function(n) {
            var t = window.CP;
            n &&
              (t && t.penSaver && (t.penSaver.skipWarning = !0),
              void 0 !== o(window.__project_unsaved_changes) &&
                (window.__skip_project_unload_check = !0)),
              Object(r.e)('/logout', {}, function() {
                'test' !== e.env.ENV && (window.location = '/');
              });
          };
      }.call(n, t(13)));
    },
    264: function(e, n, t) {
      'use strict';
      var r = t(0),
        o = t.n(r),
        a = t(1),
        i = t.n(a),
        u = t(2),
        c = t.n(u),
        l = t(5),
        s = t(8),
        p = t.n(s),
        f = t(12),
        d = t(75),
        m = t(15),
        b =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        y = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  mutation OpenDialog($type: String!) {\n    popupsOpenDialog(type: $type) @client\n  }\n'
          ],
          [
            '\n  mutation OpenDialog($type: String!) {\n    popupsOpenDialog(type: $type) @client\n  }\n'
          ]
        ),
        E = c()(y),
        h = function(e) {
          var n = e.itemType,
            t = e.viewType,
            a = e.currentView,
            i = e.itemUrls,
            u = e.name,
            c = e.upgrade,
            s = e.blankTarget,
            y = e.docs,
            h = {};
          s && ((h.target = '_blank'), (h.rel = 'noopener'));
          var v = n === m.a.PEN ? t : n + '/' + t,
            O = i[t],
            _ = p()('view-switcher-row editor-link', t + '-link', {
              active: t === a
            });
          return o.a.createElement(f.a, { mutation: E }, function(e) {
            return o.a.createElement(
              'a',
              b({ id: t + '-link', href: O, className: _ }, h, {
                onClick: function(n) {
                  c && (n.preventDefault(), e({ variables: { type: d.c } }));
                }
              }),
              c &&
                o.a.createElement(
                  r.Fragment,
                  null,
                  o.a.createElement(
                    'span',
                    { className: 'badge badge-pro' },
                    'PRO'
                  ),
                  ' '
                ),
              u,
              o.a.createElement(
                'span',
                { className: 'view-meta' },
                '/',
                v,
                '/',
                o.a.createElement(
                  'span',
                  {
                    'data-href': y,
                    className: 'learn-more inline-q',
                    onClick: function(e) {
                      e.preventDefault(), window.open(y, '_blank');
                    }
                  },
                  o.a.createElement(l.a, {
                    icon: 'help',
                    width: '13',
                    height: '13'
                  })
                )
              )
            );
          });
        };
      (h.propTypes = {
        itemType: i.a.string.isRequired,
        viewType: i.a.string.isRequired,
        currentView: i.a.string.isRequired,
        itemUrls: i.a.object.isRequired,
        name: i.a.string.isRequired,
        upgrade: i.a.bool,
        blankTarget: i.a.bool,
        docs: i.a.string
      }),
        (n.a = h);
    },
    265: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(15),
        p = t(56),
        f = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        d = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            f(n, [
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    n = e.itemType,
                    t = e.owner;
                  return u.a.createElement(
                    'div',
                    { className: 'by', 'data-test': 'AnItemBy' },
                    'A ',
                    Object(p.a)(n),
                    ' By',
                    ' ',
                    t.anon
                      ? t.title
                      : u.a.createElement(
                          'a',
                          { className: 'item-owner-link', href: t.baseUrl },
                          t.title,
                          ' ',
                          t.pro &&
                            u.a.createElement(
                              'span',
                              { className: 'badge badge-pro' },
                              'PRO'
                            )
                        )
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(d, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: {
          itemType: l.a.oneOf(Object.values(s.a)).isRequired,
          owner: l.a.shape({
            title: l.a.string.isRequired,
            baseUrl: l.a.string.isRequired,
            pro: l.a.bool.isRequired,
            anon: l.a.bool.isRequired
          })
        }
      }),
        (n.a = d);
    },
    28: function(e, n, t) {
      'use strict';
      t.d(n, 'c', function() {
        return o;
      }),
        t.d(n, 'a', function() {
          return a;
        }),
        t.d(n, 'b', function() {
          return i;
        });
      var r = function(e) {
          return Math.floor(e / 1e3);
        },
        o = function() {
          return r(Date.now());
        },
        a = function(e, n, t) {
          if (!/\d\d\d\d/.test(e + '') || n > 12 || t > 31)
            throw 'Invalid date ' + e + ', ' + n + ', ' + t;
          return r(new Date(e + '.' + n + '.' + t).getTime());
        },
        i = function(e) {
          return Math.floor((o() - e) / 60 / 60 / 24);
        };
    },
    294: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return o;
      });
      var r = 'sidebar-collapsed',
        o = function() {
          document.body.classList.toggle(r),
            (document.cookie =
              r +
              '=' +
              (document.body.classList.contains(r) ? 'true' : 'false') +
              ';path=/');
          var e = new CustomEvent('scollapse');
          document.body.dispatchEvent(e);
        };
      document.cookie.indexOf(r + '=true') >= 0 &&
        document.body.classList.add(r);
    },
    295: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(8),
        p = t.n(s),
        f = t(2),
        d = t.n(f),
        m = t(4),
        b = t(391),
        y = t(296),
        E = t(92),
        h = t(392),
        v = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        O = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query GetDataForPinsDrawer {\n    pins @client {\n      id\n      itemType\n      title\n      updatedAt\n      url\n    }\n    popups @client {\n      __typename\n      id\n      drawer\n    }\n  }\n'
          ],
          [
            '\n  query GetDataForPinsDrawer {\n    pins @client {\n      id\n      itemType\n      title\n      updatedAt\n      url\n    }\n    popups @client {\n      __typename\n      id\n      drawer\n    }\n  }\n'
          ]
        ),
        _ = d()(O),
        w = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            v(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(
                    m.a,
                    { query: _, renderBeforeDataReady: !0 },
                    function(n) {
                      var t = n.data,
                        r = t.pins,
                        o = t.popups,
                        a = o.drawer === E.b,
                        i = p()('drawer', 'pins-drawer', { open: a });
                      return u.a.createElement(
                        y.a,
                        {
                          className: i,
                          drawer: o.drawer,
                          isOpen: a,
                          link: e.props.link
                        },
                        r.length > 0
                          ? Object(h.a)(r, 'updatedAt').map(function(e) {
                              return u.a.createElement(b.a, {
                                key: e.id,
                                pinData: e
                              });
                            })
                          : u.a.createElement(
                              'p',
                              { className: 'no-pins-yet' },
                              "You don't have any",
                              ' ',
                              u.a.createElement(
                                'a',
                                {
                                  href:
                                    'https://blog.codepen.io/documentation/features/pinned-items/',
                                  className: 'docs-link',
                                  target: '_blank',
                                  rel: 'noopener'
                                },
                                'pinned items'
                              ),
                              ' ',
                              'yet. You can pin any Pen, Post, or Collection (from their respective pages) for easy access here.'
                            )
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(u.a.Component);
      Object.defineProperty(w, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { link: l.a.object }
      }),
        (n.a = w);
    },
    296: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(113),
        d = t(12),
        m = t(5),
        b = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        y = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  mutation DrawerPopupsCloseDrawer($drawer: String) {\n    popupsCloseDrawer(drawer: $drawer) @client\n  }\n'
          ],
          [
            '\n  mutation DrawerPopupsCloseDrawer($drawer: String) {\n    popupsCloseDrawer(drawer: $drawer) @client\n  }\n'
          ]
        ),
        E = p()(y),
        h = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            b(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(
                    d.a,
                    { mutation: E, variables: { drawer: this.props.drawer } },
                    function(n) {
                      return u.a.createElement(
                        f.a,
                        {
                          className: e.props.className,
                          listen: e.props.isOpen,
                          onClickOutside: function() {
                            n();
                          },
                          ignore: e.props.link
                        },
                        u.a.createElement(
                          'button',
                          { className: 'close-icon', onClick: n },
                          u.a.createElement(m.a, { icon: 'x' })
                        ),
                        e.props.children
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(h, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: {
          className: l.a.string,
          children: l.a.node,
          drawer: l.a.string,
          isOpen: l.a.bool,
          link: l.a.object
        }
      }),
        (n.a = h);
    },
    297: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(4),
        d = t(8),
        m = t.n(d),
        b = t(74),
        y = t(398),
        E = t(399),
        h = t(15),
        v = t(400),
        O = t(401),
        _ = t(402),
        w = t(101),
        T = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        g = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query GetDataForViewSwitcher {\n    popups @client {\n      __typename\n      id\n      menu\n    }\n    item @client {\n      id\n      itemType\n    }\n  }\n'
          ],
          [
            '\n  query GetDataForViewSwitcher {\n    popups @client {\n      __typename\n      id\n      menu\n    }\n    item @client {\n      id\n      itemType\n    }\n  }\n'
          ]
        ),
        P = p()(g),
        S = (function(e) {
          function n() {
            r(this, n);
            var e = o(
              this,
              (n.__proto__ || Object.getPrototypeOf(n)).call(this)
            );
            return (
              Object.defineProperty(e, 'setButtonPosition', {
                enumerable: !0,
                writable: !0,
                value: function(n) {
                  e.setState({ buttonPosition: n });
                }
              }),
              (e.state = { buttonPosition: 0, vsButton: null }),
              e
            );
          }
          return (
            a(n, e),
            T(n, [
              {
                key: 'render',
                value: function() {
                  var e = this,
                    n = this.props;
                  return u.a.createElement(
                    f.a,
                    { query: P, renderWhenDataReady: !0 },
                    function(t) {
                      var r = t.data,
                        o = r.popups,
                        a = r.item,
                        c = o.menu === b.d,
                        l = m()('view-switcher', { open: c });
                      return u.a.createElement(
                        i.Fragment,
                        null,
                        u.a.createElement(_.a, {
                          buttonPosition: e.state.buttonPosition,
                          setButtonPosition: e.setButtonPosition,
                          onRef: function(n) {
                            (e.child = n), e.setState({ vsButton: n });
                          }
                        }),
                        null !== e.state.vsButton &&
                          u.a.createElement(
                            w.a,
                            {
                              className: l,
                              menu: o.menu,
                              isOpen: c,
                              link: e.state.vsButton.current,
                              style: { left: e.state.buttonPosition - 350 }
                            },
                            a &&
                              a.itemType === h.a.PEN &&
                              u.a.createElement(v.a, {
                                id: n.id,
                                currentView: n.currentView
                              }),
                            a &&
                              a.itemType === h.a.PROJECT &&
                              u.a.createElement(O.a, {
                                id: n.id,
                                currentView: n.currentView
                              }),
                            a &&
                              a.itemType === h.a.PEN &&
                              u.a.createElement(
                                i.Fragment,
                                null,
                                u.a.createElement(y.a, { id: a.id })
                              ),
                            [h.b.PEN, h.b.PROFESSOR, h.b.COLLAB].includes(
                              n.currentView
                            ) &&
                              u.a.createElement(
                                i.Fragment,
                                null,
                                a && u.a.createElement('hr', null),
                                u.a.createElement(E.a, null)
                              )
                          )
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      (S.propTypes = {
        id: l.a.string,
        editor: l.a.bool,
        currentView: l.a.string
      }),
        (n.a = S);
    },
    298: function(e, n, t) {
      'use strict';
      function r(e, n, t) {
        return (
          n in e
            ? Object.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[n] = t),
          e
        );
      }
      function o(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var a = t(0),
        i = t.n(a),
        u = t(1),
        c = t.n(u),
        l = t(2),
        s = t.n(l),
        p = t(4),
        f = t(12),
        d = t(8),
        m = t.n(d),
        b = t(5),
        y =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        E = o(
          [
            '\n  query GetItemDataForLoveButton($id: ID!) {\n    ',
            '(id: $id) {\n      id\n      private\n      owner {\n        id\n        anon\n      }\n      userId\n      teamId\n    }\n    sessionUser {\n      anon\n      id\n      currentTeamId\n    }\n  }\n'
          ],
          [
            '\n  query GetItemDataForLoveButton($id: ID!) {\n    ',
            '(id: $id) {\n      id\n      private\n      owner {\n        id\n        anon\n      }\n      userId\n      teamId\n    }\n    sessionUser {\n      anon\n      id\n      currentTeamId\n    }\n  }\n'
          ]
        ),
        h = o(
          [
            '\n  query ItemLoveLevel($itemId: ID!, $itemType: Item!, $userId: ID!) {\n    itemLoveLevel(itemId: $itemId, itemType: $itemType, userId: $userId) {\n      id\n      level\n    }\n  }\n'
          ],
          [
            '\n  query ItemLoveLevel($itemId: ID!, $itemType: Item!, $userId: ID!) {\n    itemLoveLevel(itemId: $itemId, itemType: $itemType, userId: $userId) {\n      id\n      level\n    }\n  }\n'
          ]
        ),
        v = o(
          [
            '\n  mutation LoveItem($itemId: ID!, $itemType: Item!, $level: Int!) {\n    loveItem(itemId: $itemId, itemType: $itemType, level: $level) {\n      itemLoveLevel {\n        id\n        level\n      }\n    }\n  }\n'
          ],
          [
            '\n  mutation LoveItem($itemId: ID!, $itemType: Item!, $level: Int!) {\n    loveItem(itemId: $itemId, itemType: $itemType, level: $level) {\n      itemLoveLevel {\n        id\n        level\n      }\n    }\n  }\n'
          ]
        ),
        O = function(e) {
          return s()(E, e);
        },
        _ = s()(h),
        w = s()(v),
        T = function(e) {
          var n = i.a.createElement(
            'button',
            { className: 'button button-editor-outline loves heart-button' },
            i.a.createElement(
              'span',
              { className: 'screen-reader-text' },
              'Love'
            ),
            i.a.createElement(
              'svg',
              {
                width: '16',
                height: '16',
                className: "icon icon-heart'",
                fillOpacity: 0
              },
              i.a.createElement('use', { xlinkHref: '#heart' })
            )
          );
          return i.a.createElement(
            p.a,
            {
              query: O(e.itemType),
              variables: { id: e.id },
              loadingIndicator: n
            },
            function(t) {
              var o = t.data,
                a = o[e.itemType],
                u = o.sessionUser;
              return a.owner.anon
                ? null
                : i.a.createElement(
                    p.a,
                    {
                      query: _,
                      variables: {
                        itemId: e.id,
                        itemType: e.itemType.toUpperCase(),
                        userId: u.id
                      },
                      loadingIndicator: n
                    },
                    function(n) {
                      var t = n.data,
                        o = t.itemLoveLevel.level,
                        c = m()(
                          r(
                            {
                              button: !0,
                              'button-editor-outline': !0,
                              loves: !0,
                              'heart-button': !0,
                              loved: o > 0
                            },
                            'loved-' + o,
                            !0
                          )
                        ),
                        l = o >= 3 ? 0 : o + 1;
                      return i.a.createElement(f.a, { mutation: w }, function(
                        n
                      ) {
                        return i.a.createElement(
                          'button',
                          {
                            'data-item': e.itemType,
                            'data-hashid': a.id,
                            className: c,
                            onClick: function() {
                              if (u.anon)
                                return void (window.location =
                                  '/login?type=love');
                              n({
                                variables: {
                                  itemId: a.id,
                                  itemType: e.itemType.toUpperCase(),
                                  level: l
                                },
                                optimisticResponse: {
                                  __typename: 'Mutation',
                                  loveItem: {
                                    itemLoveLevel: y({}, t.itemLoveLevel, {
                                      level: l
                                    }),
                                    __typename: 'ItemLoveLevel'
                                  }
                                }
                              });
                            }
                          },
                          i.a.createElement(
                            'span',
                            { className: 'screen-reader-text' },
                            'Love'
                          ),
                          i.a.createElement(b.a, {
                            icon: 'heart',
                            width: '16',
                            height: '16'
                          })
                        );
                      });
                    }
                  );
            }
          );
        };
      (T.propTypes = { id: c.a.string, itemType: c.a.string.isRequired }),
        (n.a = T);
    },
    299: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(4),
        f = t(2),
        d = t.n(f),
        m = t(403),
        b = t(15),
        y = t(404),
        E = t(405),
        h = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        v = i(
          ['\n  {\n    item @client {\n      id\n    }\n  }\n'],
          ['\n  {\n    item @client {\n      id\n    }\n  }\n']
        ),
        O = i(
          [
            '\n  query GetItemDataForTitle($id: ID!) {\n    ',
            '(id: $id) {\n      id\n      title\n      ownedBySessionUser\n    }\n  }\n'
          ],
          [
            '\n  query GetItemDataForTitle($id: ID!) {\n    ',
            '(id: $id) {\n      id\n      title\n      ownedBySessionUser\n    }\n  }\n'
          ]
        ),
        _ = d()(v),
        w = function(e) {
          return d()(O, e);
        },
        T = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            h(n, [
              {
                key: 'render',
                value: function() {
                  var e = this,
                    n = this.props.itemType,
                    t = this.props.showAuthor;
                  return (
                    void 0 === t && (t = !0),
                    c.a.createElement(p.a, { query: _ }, function(r) {
                      var o = r.data.item;
                      return c.a.createElement(
                        'div',
                        { className: 'item-title-area' },
                        c.a.createElement(
                          'div',
                          { className: 'item-title-text' },
                          c.a.createElement(
                            'h1',
                            { className: 'item-title', id: 'item-title' },
                            o &&
                              c.a.createElement(
                                p.a,
                                {
                                  query: w(n),
                                  variables: { id: o.id },
                                  renderWhenDataReady: !0
                                },
                                function(t) {
                                  var r = t.data,
                                    a =
                                      e.props.editable &&
                                      r[n].ownedBySessionUser;
                                  return c.a.createElement(m.a, {
                                    id: o.id,
                                    title: r[n].title,
                                    itemType: n,
                                    editable: a,
                                    saveItem: e.props.saveItem
                                  });
                                }
                              ),
                            !o &&
                              c.a.createElement(m.a, {
                                itemType: n,
                                editable: e.props.editable,
                                saveItem: e.props.saveItem
                              })
                          ),
                          t &&
                            (o
                              ? c.a.createElement(y.a, {
                                  itemType: n,
                                  id: o.id
                                })
                              : c.a.createElement(E.a, { itemType: n }))
                        )
                      );
                    })
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      Object.defineProperty(T, 'state', {
        enumerable: !0,
        writable: !0,
        value: { editing: !1 }
      }),
        (T.propTypes = {
          itemType: s.a.oneOf(Object.values(b.a)),
          saveItem: s.a.func,
          editable: s.a.bool,
          teamname: s.a.string,
          showAuthor: s.a.bool
        }),
        (n.a = T);
    },
    300: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(262),
        l = t(295),
        s = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        p = (function(e) {
          function n() {
            r(this, n);
            var e = o(
              this,
              (n.__proto__ || Object.getPrototypeOf(n)).call(this)
            );
            return (e.state = { pinButton: null }), e;
          }
          return (
            a(n, e),
            s(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(
                    i.Fragment,
                    null,
                    u.a.createElement(c.a, {
                      onRef: function(n) {
                        (e.child = n), e.setState({ pinButton: n });
                      }
                    }),
                    this.state.pinButton &&
                      u.a.createElement(l.a, {
                        link: this.state.pinButton.current
                      })
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = p;
    },
    32: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(20),
        p = t(12),
        f = t(2),
        d = t.n(f),
        m = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        b = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  mutation ClosePopup {\n    popupsCloseModalAndDialog @client\n  }\n'
          ],
          [
            '\n  mutation ClosePopup {\n    popupsCloseModalAndDialog @client\n  }\n'
          ]
        ),
        y = d()(b),
        E = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            m(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(p.a, { mutation: y }, function(n) {
                    return u.a.createElement(s.a, {
                      classes: e.props.classes || 'button-medium',
                      label: e.props.label || 'Cancel',
                      onClick: n
                    });
                  });
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(E, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { label: l.a.string, classes: l.a.string }
      }),
        (n.a = E);
    },
    37: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return r;
      });
      var r = {
        PROJECT_LIMIT: 'PROJECT_LIMIT',
        LOG_IN_TO_CREATE_PROJECTS: 'LOG_IN_TO_CREATE_PROJECTS',
        LOG_IN_TO_CREATE_POSTS: 'LOG_IN_TO_CREATE_POSTS',
        LOG_IN_TO_CREATE_COLLECTION: 'LOG_IN_TO_CREATE_COLLECTION',
        CONFIRM_LOGOUT: 'CONFIRM_LOGOUT',
        QUERY_ERROR: 'QUERY_ERROR',
        MUTATION_ERROR: 'MUTATION_ERROR'
      };
    },
    39: function(e, n, t) {
      'use strict';
      t.d(n, 'b', function() {
        return o;
      }),
        t.d(n, 'a', function() {
          return a;
        }),
        t.d(n, 'c', function() {
          return i;
        });
      var r = t(6),
        o =
          (t.n(r),
          function e(n) {
            return c(a, e, n);
          }),
        a = function(e) {
          return e.replace(/_\w/g, function(e) {
            return e[1].toUpperCase();
          });
        },
        i = function e(n) {
          return c(u, e, n);
        },
        u = function(e) {
          return e.replace(/([A-Z])/g, function(e) {
            return '_' + e.toLowerCase();
          });
        },
        c = function(e, n, t) {
          return (
            (t = t.mapKeys(function(n) {
              return e(n);
            })),
            t.withMutations(function(e) {
              var t = e.filter(function(e) {
                  return r.Iterable.isKeyed(e);
                }),
                o = e.filter(function(e) {
                  return r.Iterable.isIndexed(e);
                });
              t.map(function(t, r) {
                e.set(r, n(e.get(r)));
              }),
                o.map(function(t, r) {
                  e.set(
                    r,
                    t.map(function(e, r) {
                      return n(t.get(r));
                    })
                  );
                });
            })
          );
        };
    },
    391: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(8),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(1),
        d = t.n(f),
        m = t(12),
        b = t(44),
        y = t(5),
        E = t(28),
        h = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        v = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  mutation PinButtonPinsRemovePin($id: ID!) {\n    pinsRemovePin(id: $id) @client {\n      id\n    }\n  }\n'
          ],
          [
            '\n  mutation PinButtonPinsRemovePin($id: ID!) {\n    pinsRemovePin(id: $id) @client {\n      id\n    }\n  }\n'
          ]
        ),
        O = p()(v),
        _ = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            h(n, [
              {
                key: 'render',
                value: function() {
                  var e = this.props.pinData,
                    n = l()('pin', e.itemType),
                    t = 'icon-new-' + e.itemType,
                    r = Object(E.b)(e.updatedAt);
                  return u.a.createElement(
                    m.a,
                    { mutation: O, variables: { id: e.id } },
                    function(o) {
                      return u.a.createElement(
                        'a',
                        { href: e.url },
                        u.a.createElement(
                          'div',
                          { className: n },
                          u.a.createElement(
                            'div',
                            { className: 'pin-info' },
                            u.a.createElement(y.a, { icon: t }),
                            u.a.createElement(
                              'div',
                              null,
                              u.a.createElement(
                                'div',
                                { className: 'pin-title' },
                                e.title
                              ),
                              u.a.createElement(
                                'div',
                                { className: 'pin-date' },
                                'Pinned ',
                                0 === r ? 'today' : r + ' days ago'
                              )
                            )
                          ),
                          u.a.createElement(b.a, {
                            icon: 'x',
                            classes: 'delete-pin',
                            onClick: o
                          })
                        )
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      (_.propTypes = {
        pinData: d.a.shape({
          id: d.a.string.isRequired,
          itemType: d.a.string.isRequired,
          title: d.a.string.isRequired,
          updatedAt: d.a.number.isRequired,
          url: d.a.string.isRequired
        })
      }),
        (n.a = _);
    },
    392: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return r;
      });
      var r = function(e, n) {
        return e.sort(function(e, t) {
          return e[n] < t[n] ? 1 : e[n] > t[n] ? -1 : 0;
        });
      };
    },
    393: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(2),
        l = t.n(c),
        s = t(12),
        p = t(75),
        f = t(44),
        d = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        m = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  mutation OpenDialog($type: String!) {\n    popupsOpenDialog(type: $type) @client\n  }\n'
          ],
          [
            '\n  mutation OpenDialog($type: String!) {\n    popupsOpenDialog(type: $type) @client\n  }\n'
          ]
        ),
        b = l()(m),
        y = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            d(n, [
              {
                key: 'focusSearchInput',
                value: function() {
                  var e = document.querySelector(
                    '#search-page input[type="search"]'
                  );
                  return !!e && (e.focus(), !0);
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(s.a, { mutation: b }, function(n) {
                    return u.a.createElement(
                      'div',
                      {
                        className:
                          'menu-dropdown-parent search-menu-dropdown-parent'
                      },
                      u.a.createElement(f.a, {
                        classes: 'button-editor-outline search-button',
                        onClick: function() {
                          e.focusSearchInput() ||
                            n({ variables: { type: p.b } });
                        },
                        label: 'Search',
                        icon: 'mag'
                      })
                    );
                  });
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = y;
    },
    394: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(21),
        s = (t.n(l), t(2)),
        p = t.n(s),
        f = t(4),
        d = t(5),
        m = t(395),
        b = t(37),
        y = t(75),
        E = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        h = i(
          [
            '\n  {\n    sessionUser {\n      id\n      username\n      currentContext {\n        baseUrl\n      }\n      pro\n      projectLimitations {\n        projects\n        usedProjects\n      }\n    }\n  }\n'
          ],
          [
            '\n  {\n    sessionUser {\n      id\n      username\n      currentContext {\n        baseUrl\n      }\n      pro\n      projectLimitations {\n        projects\n        usedProjects\n      }\n    }\n  }\n'
          ]
        ),
        v = i(
          [
            '\n  mutation OpenDialog($type: String!) {\n    popupsOpenDialog(type: $type) @client\n  }\n'
          ],
          [
            '\n  mutation OpenDialog($type: String!) {\n    popupsOpenDialog(type: $type) @client\n  }\n'
          ]
        ),
        O = i(
          [
            '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
          ],
          [
            '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
          ]
        ),
        _ = i(
          ['\n  {\n    item @client {\n      id\n    }\n  }\n'],
          ['\n  {\n    item @client {\n      id\n    }\n  }\n']
        ),
        w = p()(h),
        T = p()(v),
        g = p()(O),
        P = p()(_),
        S = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            E(n, [
              {
                key: 'render',
                value: function() {
                  return c.a.createElement(
                    f.a,
                    { query: w, renderWhenDataReady: !0 },
                    function(e) {
                      var n = e.data,
                        t = n.sessionUser,
                        r = t.username,
                        o = t.currentContext.baseUrl,
                        a = t.pro,
                        i = t.projectLimitations,
                        s = i.projects,
                        p = i.usedProjects,
                        E = s - p <= 0;
                      return c.a.createElement(
                        u.Fragment,
                        null,
                        c.a.createElement(
                          'li',
                          { className: 'dropdown-newpen' },
                          c.a.createElement('a', { href: '/pen/' }, 'New Pen')
                        ),
                        c.a.createElement(l.Mutation, { mutation: g }, function(
                          e
                        ) {
                          return c.a.createElement(
                            'li',
                            { className: 'dropdown-newproject' },
                            c.a.createElement(
                              'a',
                              {
                                href: '/project/',
                                onClick: function(n) {
                                  E &&
                                    (n.preventDefault(),
                                    e({
                                      variables: {
                                        type: b.a.PROJECT_LIMIT,
                                        props: { projects: s, usedProjects: p }
                                      }
                                    }));
                                }
                              },
                              'New Project'
                            )
                          );
                        }),
                        c.a.createElement(
                          'li',
                          { className: 'dropdown-newpost' },
                          c.a.createElement(
                            'a',
                            { href: '/write/' },
                            'New Post'
                          )
                        ),
                        c.a.createElement(l.Mutation, { mutation: T }, function(
                          e
                        ) {
                          return c.a.createElement(
                            'li',
                            { className: 'dropdown-newcollection sep-after' },
                            c.a.createElement(
                              'a',
                              {
                                href: '#',
                                onClick: function(n) {
                                  n.preventDefault(),
                                    e({ variables: { type: y.a } });
                                }
                              },
                              'New Collection'
                            )
                          );
                        }),
                        c.a.createElement(
                          'li',
                          null,
                          c.a.createElement(
                            'a',
                            { href: '/dashboard/' },
                            'Dashboard'
                          )
                        ),
                        c.a.createElement(
                          'li',
                          null,
                          c.a.createElement('a', { href: o }, 'Profile')
                        ),
                        c.a.createElement(
                          'li',
                          null,
                          c.a.createElement(
                            'a',
                            { href: o + '/embed/builder/public/' },
                            'Embed Theme Builder'
                          )
                        ),
                        c.a.createElement(
                          'li',
                          { className: 'sep-after' },
                          c.a.createElement(
                            'a',
                            { href: o + '/assets/' },
                            'Asset Manager'
                          )
                        ),
                        c.a.createElement(
                          f.a,
                          { query: P, renderWhenDataReady: !0 },
                          function(e) {
                            return e.data.item
                              ? c.a.createElement(
                                  u.Fragment,
                                  null,
                                  !a &&
                                    c.a.createElement(
                                      'li',
                                      null,
                                      c.a.createElement(
                                        'a',
                                        { href: '/pro/' },
                                        'Upgrade to',
                                        ' ',
                                        c.a.createElement(
                                          'span',
                                          { className: 'badge badge-pro' },
                                          'PRO'
                                        )
                                      )
                                    ),
                                  c.a.createElement(
                                    'li',
                                    null,
                                    c.a.createElement(
                                      'a',
                                      { href: '/support/' },
                                      'Support'
                                    )
                                  ),
                                  c.a.createElement(
                                    'li',
                                    { className: 'sep-after' },
                                    c.a.createElement(
                                      'a',
                                      {
                                        href:
                                          'https://blog.codepen.io/documentation/'
                                      },
                                      'Documentation'
                                    )
                                  )
                                )
                              : null;
                          }
                        ),
                        c.a.createElement(
                          'li',
                          null,
                          c.a.createElement(
                            'a',
                            { href: '/' + r + '/settings/editor/' },
                            c.a.createElement(d.a, { icon: 'gear' }),
                            'Settings'
                          )
                        ),
                        c.a.createElement(
                          'li',
                          null,
                          c.a.createElement(m.a, null)
                        )
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      n.a = S;
    },
    395: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(5),
        l = t(263),
        s = t(2),
        p = t.n(s),
        f = t(12),
        d = t(37),
        m = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        b = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
          ],
          [
            '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
          ]
        ),
        y = p()(b),
        E = (function(e) {
          function n() {
            var e, t, a, i;
            r(this, n);
            for (var u = arguments.length, c = Array(u), s = 0; s < u; s++)
              c[s] = arguments[s];
            return (
              (t = a = o(
                this,
                (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(
                  e,
                  [this].concat(c)
                )
              )),
              Object.defineProperty(a, 'logOut', {
                enumerable: !0,
                writable: !0,
                value: function(e, n) {
                  e.preventDefault();
                  var t = window.CP;
                  (t && t.penSaver && t.penSaver.potentialLostWork()) ||
                  window.__project_unsaved_changes
                    ? n({ variables: { type: d.a.CONFIRM_LOGOUT } })
                    : Object(l.a)();
                }
              }),
              (i = t),
              o(a, i)
            );
          }
          return (
            a(n, e),
            m(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(f.a, { mutation: y }, function(n) {
                    return u.a.createElement(
                      'a',
                      {
                        id: 'logout',
                        href: '/logout',
                        onClick: function(t) {
                          e.logOut(t, n);
                        }
                      },
                      u.a.createElement(c.a, { icon: 'log-out' }),
                      'Log Out'
                    );
                  });
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(E, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: {}
      }),
        (n.a = E);
    },
    396: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(2),
        s = t.n(l),
        p = t(12),
        f = t(4),
        d = t(397),
        m =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        b = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        y = i(
          [
            '\n  query sessionUser {\n    sessionUser {\n      id\n      ',
            '\n      ',
            '\n      __typename\n    }\n  }\n'
          ],
          [
            '\n  query sessionUser {\n    sessionUser {\n      id\n      ',
            '\n      ',
            '\n      __typename\n    }\n  }\n'
          ]
        ),
        E = i(
          [
            '\n      query updateCacheAfterContextSwitch {\n        ',
            '\n        owner(id: ',
            ', ownerType: ',
            ') {\n          id\n          followedBySessionContext\n        }\n      }\n    '
          ],
          [
            '\n      query updateCacheAfterContextSwitch {\n        ',
            '\n        owner(id: ',
            ', ownerType: ',
            ') {\n          id\n          followedBySessionContext\n        }\n      }\n    '
          ]
        ),
        h = i(
          [
            '\n    query updateCacheAfterContextSwitch {\n      ',
            '\n    }\n  '
          ],
          ['\n    query updateCacheAfterContextSwitch {\n      ', '\n    }\n  ']
        ),
        v = i(
          [
            '\n  mutation SwitchProfiledTeam($id: String) {\n    switchProfiledTeam(id: $id) {\n      sessionUser {\n        id\n        ',
            '\n        __typename\n      }\n    }\n  }\n'
          ],
          [
            '\n  mutation SwitchProfiledTeam($id: String) {\n    switchProfiledTeam(id: $id) {\n      sessionUser {\n        id\n        ',
            '\n        __typename\n      }\n    }\n  }\n'
          ]
        ),
        O =
          '\n  currentTeamId\n  currentContext {\n    id\n    baseUrl\n    title\n    name\n    avatar80\n    avatar512\n    username\n    contextType\n    __typename\n  }\n',
        _ = s()(
          y,
          '\n  baseUrl\n  title\n  name\n  avatar80\n  avatar512\n  username\n  teams {\n    id\n    baseUrl\n    title\n    name\n    avatar80\n    avatar512\n    username\n    contextType\n    __typename\n  }\n',
          O
        ),
        w = function() {
          var e =
            '\n    sessionUser {\n      id\n      currentContext {\n        id\n        collections {\n          id\n          private\n          title\n        }\n      }\n    }\n  ';
          if (window.__profiled) {
            var n = window.__profiled.hashid,
              t = window.__profiled.is_team ? 'TEAM' : 'USER';
            return s()(E, e, n, t);
          }
          return s()(h, e);
        },
        T = s()(v, O),
        g = [
          '/dashboard',
          '/assets',
          '/activity',
          '/embed/builder',
          '/settings'
        ],
        P = new RegExp(g.join('|')),
        S = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            b(n, [
              {
                key: 'refreshPageStopgap',
                value: function() {
                  P.test(window.location.pathname) && window.location.reload();
                }
              },
              {
                key: 'createOptimisticCurrentContext',
                value: function(e, n) {
                  return {
                    id: e.id,
                    baseUrl: e.baseUrl,
                    title: e.title,
                    name: e.name,
                    avatar80: e.avatar80,
                    avatar512: e.avatar512,
                    username: e.username,
                    contextType: n,
                    __typename: 'SessionContext'
                  };
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return c.a.createElement(f.a, { query: _ }, function(n) {
                    var t = n.data,
                      r = t.sessionUser;
                    return 0 === r.teams.length
                      ? null
                      : c.a.createElement(
                          p.a,
                          { mutation: T, onCompleted: e.refreshPageStopgap },
                          function(n) {
                            return c.a.createElement(
                              u.Fragment,
                              null,
                              c.a.createElement(
                                'li',
                                { className: 'section-header section-use-as' },
                                'Use CodePen as...'
                              ),
                              c.a.createElement(d.a, {
                                switchTo: null,
                                account: r,
                                switchContext: function() {
                                  n({
                                    variables: { id: null },
                                    optimisticResponse: {
                                      __typename: 'Mutation',
                                      switchProfiledTeam: {
                                        sessionUser: m({}, r, {
                                          currentTeamId: null,
                                          currentContext: e.createOptimisticCurrentContext(
                                            r,
                                            'User'
                                          )
                                        }),
                                        __typename: 'User'
                                      }
                                    },
                                    refetchQueries: [{ query: w() }]
                                  });
                                },
                                numTeams: r.teams.size,
                                active: null === r.currentTeamId
                              }),
                              r.teams.map(function(t, o) {
                                return c.a.createElement(d.a, {
                                  key: t.id + 'team',
                                  switchTo: t.id,
                                  account: t,
                                  switchContext: function(o) {
                                    n({
                                      variables: { id: o },
                                      optimisticResponse: {
                                        __typename: 'Mutation',
                                        switchProfiledTeam: {
                                          sessionUser: m({}, r, {
                                            currentTeamId: t.id,
                                            currentContext: e.createOptimisticCurrentContext(
                                              t,
                                              'Team'
                                            )
                                          }),
                                          __typename: 'User'
                                        }
                                      },
                                      refetchQueries: [{ query: w() }]
                                    });
                                  },
                                  last: o === r.teams.length - 1,
                                  active: r.currentTeamId === t.id
                                });
                              })
                            );
                          }
                        );
                  });
                }
              }
            ]),
            n
          );
        })(u.Component);
      n.a = S;
    },
    397: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(8),
        p = t.n(s),
        f = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        d = (function(e) {
          function n() {
            var e, t, a, i;
            r(this, n);
            for (var u = arguments.length, c = Array(u), l = 0; l < u; l++)
              c[l] = arguments[l];
            return (
              (t = a = o(
                this,
                (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(
                  e,
                  [this].concat(c)
                )
              )),
              Object.defineProperty(a, 'onClick', {
                enumerable: !0,
                writable: !0,
                value: function(e) {
                  e.preventDefault(), a.props.switchContext(a.props.switchTo);
                }
              }),
              (i = t),
              o(a, i)
            );
          }
          return (
            a(n, e),
            f(n, [
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    n = e.account,
                    t = e.active,
                    r = e.last,
                    o = p()({ active: t, 'sep-after': r, 'context-list': !0 });
                  return u.a.createElement(
                    'li',
                    { className: o, onClick: this.onClick },
                    u.a.createElement(
                      'button',
                      { className: 'context-switch-link', 'data-test': n.id },
                      u.a.createElement('img', {
                        className: 'context-switcher-gravatar',
                        src: n.avatar80,
                        width: '25',
                        height: '25',
                        alt: 'Account Gravatar'
                      }),
                      u.a.createElement('span', null, n.title)
                    )
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(d, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: {
          switchContext: l.a.func.isRequired,
          account: l.a.object.isRequired,
          switchTo: l.a.string,
          active: l.a.bool.isRequired,
          last: l.a.bool
        }
      }),
        (n.a = d);
    },
    398: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(2),
        f = t.n(p),
        d = t(4),
        m = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        b = i(
          [
            '\n  query GetDirectCodeLinksData($id: ID!) {\n    pen(id: $id) {\n      id\n      anon\n      htmlPreProcessor\n      cssPreProcessor\n      jsPreProcessor\n      urls {\n        pen\n      }\n    }\n  }\n'
          ],
          [
            '\n  query GetDirectCodeLinksData($id: ID!) {\n    pen(id: $id) {\n      id\n      anon\n      htmlPreProcessor\n      cssPreProcessor\n      jsPreProcessor\n      urls {\n        pen\n      }\n    }\n  }\n'
          ]
        ),
        y = i(
          ['\n  {\n    item @client {\n      id\n    }\n  }\n'],
          ['\n  {\n    item @client {\n      id\n    }\n  }\n']
        ),
        E = f()(b),
        h = f()(y),
        v = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            m(n, [
              {
                key: 'render',
                value: function() {
                  return c.a.createElement(d.a, { query: h }, function(e) {
                    var n = e.data,
                      t = n.item.id;
                    return c.a.createElement(
                      d.a,
                      {
                        query: E,
                        variables: { id: t },
                        renderWhenDataReady: !0
                      },
                      function(e) {
                        var n = e.data,
                          t = n.pen;
                        if (t.anon) return null;
                        var r = t.urls.pen;
                        return c.a.createElement(
                          u.Fragment,
                          null,
                          c.a.createElement('hr', null),
                          c.a.createElement('h3', null, 'Direct Code Links:'),
                          c.a.createElement(
                            'div',
                            { className: 'share-static share-section' },
                            c.a.createElement(
                              'a',
                              {
                                target: '_blank',
                                rel: 'noopener',
                                href: r + '.html'
                              },
                              '.html'
                            ),
                            'none' !== t.htmlPreProcessor &&
                              c.a.createElement(
                                'a',
                                {
                                  target: '_blank',
                                  href: r + '.' + t.htmlPreProcessor
                                },
                                '.',
                                t.htmlPreProcessor
                              ),
                            c.a.createElement(
                              'a',
                              {
                                target: '_blank',
                                rel: 'noopener',
                                href: r + '.css'
                              },
                              '.css'
                            ),
                            'none' !== t.cssPreProcessor &&
                              c.a.createElement(
                                'a',
                                {
                                  target: '_blank',
                                  rel: 'noopener',
                                  href: r + '.' + t.cssPreProcessor
                                },
                                '.',
                                t.cssPreProcessor
                              ),
                            c.a.createElement(
                              'a',
                              {
                                target: '_blank',
                                rel: 'noopener',
                                href: r + '.js'
                              },
                              '.js'
                            ),
                            'none' !== t.jsPreProcessor &&
                              c.a.createElement(
                                'a',
                                {
                                  target: '_blank',
                                  rel: 'noopener',
                                  href: r + '.' + t.jsPreProcessor
                                },
                                '.',
                                t.jsPreProcessor
                              )
                          )
                        );
                      }
                    );
                  });
                }
              }
            ]),
            n
          );
        })(u.Component);
      (v.propTypes = { id: s.a.string }), (n.a = v);
    },
    399: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(2),
        f = t.n(p),
        d = t(4),
        m = t(5),
        b = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        y = i(
          ['\n  {\n    item @client {\n      id\n    }\n  }\n'],
          ['\n  {\n    item @client {\n      id\n    }\n  }\n']
        ),
        E = i(
          [
            '\n  query GetLayoutChangeButtonsData($id: ID!) {\n    pen(id: $id) {\n      id\n      urls {\n        pen\n      }\n    }\n  }\n'
          ],
          [
            '\n  query GetLayoutChangeButtonsData($id: ID!) {\n    pen(id: $id) {\n      id\n      urls {\n        pen\n      }\n    }\n  }\n'
          ]
        ),
        h = f()(y),
        v = f()(E),
        O = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            b(n, [
              {
                key: 'renderLinks',
                value: function(e) {
                  return c.a.createElement(
                    u.Fragment,
                    null,
                    c.a.createElement('h3', null, 'Editor Layout:'),
                    c.a.createElement(
                      'div',
                      { className: 'editor-layout-buttons' },
                      c.a.createElement(
                        'a',
                        {
                          id: 'left-layout',
                          href: e + '/left/',
                          className: 'layout-change-icon',
                          'data-layout-type': 'left'
                        },
                        c.a.createElement(
                          'span',
                          { className: 'screen-reader-text' },
                          'Use Left Layout'
                        ),
                        c.a.createElement(m.a, {
                          icon: 'editor-left rotate-cc90',
                          refLink: 'icon-new-pen',
                          width: '20',
                          height: '20'
                        })
                      ),
                      c.a.createElement(
                        'a',
                        {
                          id: 'top-layout',
                          href: e + '/top/',
                          className: 'layout-change-icon',
                          'data-layout-type': 'top'
                        },
                        c.a.createElement(
                          'span',
                          { className: 'screen-reader-text' },
                          'Use Top Layout'
                        ),
                        c.a.createElement(m.a, {
                          icon: 'new-pen',
                          refLink: 'icon-new-pen',
                          width: '20',
                          height: '20'
                        })
                      ),
                      c.a.createElement(
                        'a',
                        {
                          id: 'right-layout',
                          href: e + '/right/',
                          className: 'layout-change-icon',
                          'data-layout-type': 'right'
                        },
                        c.a.createElement(
                          'span',
                          { className: 'screen-reader-text' },
                          'Use Right Layout'
                        ),
                        c.a.createElement(m.a, {
                          icon: 'editor-right rotate-c90',
                          refLink: 'icon-new-pen',
                          width: '20',
                          height: '20'
                        })
                      )
                    )
                  );
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return c.a.createElement(
                    d.a,
                    { query: h, renderWhenDataReady: !0 },
                    function(n) {
                      var t = n.data,
                        r = t.item ? t.item.id : null;
                      return r
                        ? c.a.createElement(
                            d.a,
                            {
                              query: v,
                              variables: { id: r },
                              renderWhenDataReady: !0
                            },
                            function(n) {
                              var t = n.data,
                                r = t.pen.urls.pen;
                              return e.renderLinks(r);
                            }
                          )
                        : e.renderLinks('/pen/' + r);
                    }
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      (O.propTypes = { id: s.a.string }), (n.a = O);
    },
    4: function(e, n, t) {
      'use strict';
      (function(e) {
        var r = t(0),
          o = t.n(r),
          a = t(1),
          i = t.n(a),
          u = t(21),
          c = (t.n(u), t(2)),
          l = t.n(c),
          s = t(55),
          p = t(58),
          f = (function(e, n) {
            return Object.freeze(
              Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
            );
          })(
            [
              '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
            ],
            [
              '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
            ]
          ),
          d = l()(f),
          m = function(n) {
            console.error(n), 'development' !== e.env.ENV && Object(s.b)(n);
          },
          b = function(n) {
            return o.a.createElement(u.Query, n, function(t) {
              var r = n.renderBeforeDataReady,
                a = n.renderWhenDataReady,
                i = n.loadingIndicator,
                c = n.children,
                l = n.errorHandler,
                s = n.showModalOnError,
                f = n.errorRender,
                b = t.loading,
                y = t.error;
              return y
                ? (console.log('!!!error'),
                  m(y),
                  l && l(),
                  f ||
                    (s && 'development' !== e.env.ENV
                      ? o.a.createElement(u.Mutation, { mutation: d }, function(
                          e
                        ) {
                          return o.a.createElement(p.a, {
                            openModal: e,
                            type: 'QUERY'
                          });
                        })
                      : null))
                : b && !r
                ? a
                  ? null
                  : void 0 === i
                  ? o.a.createElement('p', null, 'Loading...')
                  : i
                : c(t);
            });
          };
        (b.propTypes = {
          children: i.a.oneOfType([i.a.node, i.a.func]),
          renderBeforeDataReady: i.a.bool,
          renderWhenDataReady: i.a.bool,
          loadingIndicator: i.a.node,
          errorHandler: i.a.func,
          showModalOnError: i.a.bool,
          errorRender: i.a.func
        }),
          (n.a = b);
      }.call(n, t(13)));
    },
    400: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(4),
        d = t(264),
        m = t(15),
        b =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        y = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        E = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query GetDataForViewLinks($id: ID!) {\n    pen(id: $id) {\n      id\n      ownedBySessionUser\n      anon\n      urls {\n        pen\n        full\n        details\n        debug\n        live\n        professor\n        pres\n        collab\n      }\n    }\n    sessionUser {\n      id\n      anon\n      pro\n      permissions {\n        canUseLive\n        canUseCollab\n        canUseProfessor\n        canUsePresentation\n      }\n      teams {\n        id\n        username\n      }\n    }\n  }\n'
          ],
          [
            '\n  query GetDataForViewLinks($id: ID!) {\n    pen(id: $id) {\n      id\n      ownedBySessionUser\n      anon\n      urls {\n        pen\n        full\n        details\n        debug\n        live\n        professor\n        pres\n        collab\n      }\n    }\n    sessionUser {\n      id\n      anon\n      pro\n      permissions {\n        canUseLive\n        canUseCollab\n        canUseProfessor\n        canUsePresentation\n      }\n      teams {\n        id\n        username\n      }\n    }\n  }\n'
          ]
        ),
        h = p()(E),
        v = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            y(n, [
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    n = e.currentView,
                    t = e.id;
                  return u.a.createElement(
                    f.a,
                    { query: h, variables: { id: t }, renderWhenDataReady: !0 },
                    function(e) {
                      var t = e.data,
                        r = t.sessionUser,
                        o = t.pen,
                        a = { itemType: m.a.PEN, itemUrls: o.urls };
                      return u.a.createElement(
                        i.Fragment,
                        null,
                        u.a.createElement('h3', null, 'Open this Pen in:'),
                        u.a.createElement(
                          'nav',
                          { className: 'link-list' },
                          u.a.createElement(
                            d.a,
                            b({}, a, {
                              viewType: m.b.PEN,
                              currentView: n,
                              name: 'Editor View',
                              docs:
                                'https://blog.codepen.io/documentation/views/editor-view/'
                            })
                          ),
                          !o.anon &&
                            u.a.createElement(
                              i.Fragment,
                              null,
                              u.a.createElement(
                                d.a,
                                b({}, a, {
                                  viewType: m.b.DETAILS,
                                  currentView: n,
                                  name: 'Details View',
                                  docs:
                                    'https://blog.codepen.io/documentation/views/details-view/'
                                })
                              ),
                              u.a.createElement(
                                d.a,
                                b({}, a, {
                                  viewType: m.b.FULL,
                                  currentView: n,
                                  name: 'Full Page View',
                                  docs:
                                    'https://blog.codepen.io/documentation/views/full-page-view/'
                                })
                              ),
                              o.ownedBySessionUser &&
                                u.a.createElement(
                                  d.a,
                                  b({}, a, {
                                    viewType: m.b.DEBUG,
                                    currentView: n,
                                    name: 'Debug mode',
                                    blankTarget: !0,
                                    docs:
                                      'https://blog.codepen.io/documentation/views/debug-view/'
                                  })
                                ),
                              o.ownedBySessionUser &&
                                u.a.createElement(
                                  d.a,
                                  b({}, a, {
                                    viewType: m.b.LIVE,
                                    currentView: n,
                                    name: 'Live View',
                                    upgrade: !r.permissions.canUseLive,
                                    blankTarget: !0,
                                    docs:
                                      'http://blog.codepen.io/documentation/pro-features/live-view/'
                                  })
                                ),
                              o.ownedBySessionUser &&
                                u.a.createElement(
                                  d.a,
                                  b({}, a, {
                                    viewType: m.b.COLLAB,
                                    currentView: n,
                                    name: 'Collab Mode',
                                    upgrade: !r.permissions.canUseCollab,
                                    docs:
                                      'https://blog.codepen.io/documentation/pro-features/collab-mode/'
                                  })
                                ),
                              o.ownedBySessionUser &&
                                u.a.createElement(
                                  d.a,
                                  b({}, a, {
                                    viewType: m.b.PROFESSOR,
                                    currentView: n,
                                    name: 'Professor Mode',
                                    upgrade: !r.permissions.canUseProfessor,
                                    docs:
                                      'http://blog.codepen.io/documentation/pro-features/professor-mode/'
                                  })
                                ),
                              !r.anon &&
                                u.a.createElement(
                                  d.a,
                                  b({}, a, {
                                    viewType: m.b.PRESENTATION,
                                    currentView: n,
                                    name: 'Presentation Mode',
                                    upgrade: !r.permissions.canUsePresentation,
                                    docs:
                                      'http://blog.codepen.io/documentation/pro-features/presentation-mode/'
                                  })
                                )
                            )
                        )
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      (v.propTypes = {
        id: l.a.string.isRequired,
        currentView: l.a.string.isRequired
      }),
        (n.a = v);
    },
    401: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(2),
        f = t.n(p),
        d = t(4),
        m = t(264),
        b = t(15),
        y =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        E = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        h = i(
          ['\n  {\n    item @client {\n      id\n      itemType\n    }\n  }\n'],
          ['\n  {\n    item @client {\n      id\n      itemType\n    }\n  }\n']
        ),
        v = i(
          [
            '\n    query GetDataForViewLinks($id: ID!) {\n      ',
            '(id: $id) {\n        id\n        ownedBySessionUser\n        urls {\n          editor\n          full\n          details\n          debug\n          live\n        }\n      }\n      sessionUser {\n        id\n        anon\n        pro\n        permissions {\n          canUseLive\n          canUseCollab\n          canUseProfessor\n          canUsePresentation\n        }\n        teams {\n          id\n          username\n        }\n      }\n    }\n  '
          ],
          [
            '\n    query GetDataForViewLinks($id: ID!) {\n      ',
            '(id: $id) {\n        id\n        ownedBySessionUser\n        urls {\n          editor\n          full\n          details\n          debug\n          live\n        }\n      }\n      sessionUser {\n        id\n        anon\n        pro\n        permissions {\n          canUseLive\n          canUseCollab\n          canUseProfessor\n          canUsePresentation\n        }\n        teams {\n          id\n          username\n        }\n      }\n    }\n  '
          ]
        ),
        O = f()(h),
        _ = function(e) {
          return f()(v, e);
        },
        w = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            E(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return c.a.createElement(d.a, { query: O }, function(n) {
                    var t = n.data,
                      r = t.item,
                      o = r.id,
                      a = r.itemType,
                      i = e.props.currentView;
                    return c.a.createElement(
                      d.a,
                      {
                        query: _(a),
                        variables: { id: o },
                        renderWhenDataReady: !0
                      },
                      function(e) {
                        var n = e.data,
                          t = n.sessionUser,
                          r = n.project || n.pen,
                          o = { itemType: a, itemUrls: r.urls };
                        return c.a.createElement(
                          u.Fragment,
                          null,
                          c.a.createElement(
                            'h3',
                            null,
                            'Open this',
                            ' ',
                            a.charAt(0).toUpperCase() + a.substring(1),
                            ' ',
                            'in:'
                          ),
                          c.a.createElement(
                            'nav',
                            { className: 'link-list' },
                            c.a.createElement(
                              m.a,
                              y({}, o, {
                                viewType: b.b.EDITOR,
                                currentView: i,
                                name: 'Editor View',
                                docs:
                                  'https://blog.codepen.io/documentation/views/editor-view/'
                              })
                            ),
                            c.a.createElement(
                              m.a,
                              y({}, o, {
                                viewType: b.b.DETAILS,
                                currentView: i,
                                name: 'Details View',
                                docs:
                                  'https://blog.codepen.io/documentation/views/details-view/'
                              })
                            ),
                            c.a.createElement(
                              m.a,
                              y({}, o, {
                                viewType: b.b.FULL,
                                currentView: i,
                                name: 'Full Page View',
                                docs:
                                  'https://blog.codepen.io/documentation/views/full-page-view/'
                              })
                            ),
                            r.ownedBySessionUser &&
                              c.a.createElement(
                                m.a,
                                y({}, o, {
                                  viewType: b.b.DEBUG,
                                  currentView: i,
                                  name: 'Debug mode',
                                  blankTarget: !0,
                                  docs:
                                    'https://blog.codepen.io/documentation/views/debug-view/'
                                })
                              ),
                            r.ownedBySessionUser &&
                              c.a.createElement(
                                m.a,
                                y({}, o, {
                                  viewType: b.b.LIVE,
                                  currentView: i,
                                  name: 'Live View',
                                  upgrade: !t.permissions.canUseLive,
                                  blankTarget: !0,
                                  docs:
                                    'http://blog.codepen.io/documentation/pro-features/live-view/'
                                })
                              )
                          )
                        );
                      }
                    );
                  });
                }
              }
            ]),
            n
          );
        })(u.Component);
      (w.propTypes = {
        id: s.a.string.isRequired,
        currentView: s.a.string.isRequired
      }),
        (n.a = w);
    },
    402: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(12),
        d = t(44),
        m = t(74),
        b = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        y = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  mutation ViewSwitcherPopupsToggleMenu($menu: String) {\n    popupsToggleMenu(menu: $menu) @client\n  }\n'
          ],
          [
            '\n  mutation ViewSwitcherPopupsToggleMenu($menu: String) {\n    popupsToggleMenu(menu: $menu) @client\n  }\n'
          ]
        ),
        E = p()(y),
        h = void 0,
        v = (function(e) {
          function n(e) {
            r(this, n);
            var t = o(
              this,
              (n.__proto__ || Object.getPrototypeOf(n)).call(this, e)
            );
            return (
              Object.defineProperty(t, 'resizeThrottler', {
                enumerable: !0,
                writable: !0,
                value: function() {
                  var e = t.updatePosition;
                  h ||
                    (h = setTimeout(function() {
                      (h = null), e();
                    }, 66));
                }
              }),
              Object.defineProperty(t, 'updatePosition', {
                enumerable: !0,
                writable: !0,
                value: function() {
                  var e = t.button.current.button.current.element.current.getBoundingClientRect();
                  t.props.buttonPosition !== e.right &&
                    t.props.setButtonPosition(e.right);
                }
              }),
              (t.button = Object(i.createRef)()),
              t
            );
          }
          return (
            a(n, e),
            b(n, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.updatePosition(),
                    window.addEventListener('resize', this.resizeThrottler),
                    this.props.onRef &&
                      this.props.onRef(
                        this.button.current.button.current.element
                      );
                }
              },
              {
                key: 'componentDidUpdate',
                value: function() {
                  this.updatePosition();
                }
              },
              {
                key: 'componentWillUnmount',
                value: function() {
                  window.removeEventListener('resize', this.resizeThrottler),
                    this.props.onRef && this.props.onRef(void 0);
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(
                    f.a,
                    { mutation: E, variables: { menu: m.d } },
                    function(n) {
                      return u.a.createElement(d.a, {
                        classes:
                          'button button-editor-solid view-switcher-button',
                        label: 'Change View',
                        icon: 'viewswitcher',
                        onClick: n,
                        ref: e.button,
                        id: 'view-switcher-button'
                      });
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(v, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: {
          buttonPosition: l.a.number.isRequired,
          setButtonPosition: l.a.func.isRequired,
          onRef: l.a.func
        }
      }),
        (n.a = v);
    },
    403: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(2),
        f = t.n(p),
        d = t(4),
        m = t(12),
        b = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        y = i(
          ['\n  {\n    itemLocalState @client {\n      title\n    }\n  }\n'],
          ['\n  {\n    itemLocalState @client {\n      title\n    }\n  }\n']
        ),
        E = i(
          [
            '\n  mutation EditableTitleItemLocalStateUpdateState(\n    $itemType: String\n    $state: Object\n  ) {\n    itemLocalStateUpdateState(itemType: $itemType, state: $state) @client\n  }\n'
          ],
          [
            '\n  mutation EditableTitleItemLocalStateUpdateState(\n    $itemType: String\n    $state: Object\n  ) {\n    itemLocalStateUpdateState(itemType: $itemType, state: $state) @client\n  }\n'
          ]
        ),
        h = f()(y),
        v = f()(E),
        O = (function(e) {
          function n() {
            var e, t, a, i;
            r(this, n);
            for (var u = arguments.length, c = Array(u), l = 0; l < u; l++)
              c[l] = arguments[l];
            return (
              (t = a = o(
                this,
                (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(
                  e,
                  [this].concat(c)
                )
              )),
              Object.defineProperty(a, 'state', {
                enumerable: !0,
                writable: !0,
                value: { editing: !1 }
              }),
              Object.defineProperty(a, 'onPencilButtonClick', {
                enumerable: !0,
                writable: !0,
                value: function(e) {
                  e.preventDefault(), a.setState({ editing: !0 });
                }
              }),
              Object.defineProperty(a, 'onInputBlur', {
                enumerable: !0,
                writable: !0,
                value: function(e) {
                  a.updateTitle(e);
                }
              }),
              Object.defineProperty(a, 'onInputSubmit', {
                enumerable: !0,
                writable: !0,
                value: function(e, n) {
                  e.preventDefault(), a.updateTitle(n);
                }
              }),
              Object.defineProperty(a, 'updateTitle', {
                enumerable: !0,
                writable: !0,
                value: function(e) {
                  a.setState({ editing: !1 }),
                    e({
                      variables: {
                        itemType: a.props.itemType,
                        state: { title: a._input.value }
                      }
                    }),
                    void 0 !== a.props.id && a.props.saveItem();
                }
              }),
              Object.defineProperty(a, 'moveCaretAtEnd', {
                enumerable: !0,
                writable: !0,
                value: function(e) {
                  var n = e.target.value;
                  (e.target.value = ''), (e.target.value = n);
                }
              }),
              (i = t),
              o(a, i)
            );
          }
          return (
            a(n, e),
            b(n, [
              {
                key: 'componentDidUpdate',
                value: function() {
                  this.state.editing && this._input.focus();
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return c.a.createElement(d.a, { query: h }, function(n) {
                    var t = n.data,
                      r = t.itemLocalState.title,
                      o = e.props.title;
                    return (
                      e.props.editable && (o = null === r ? e.props.title : r),
                      e.state.editing
                        ? c.a.createElement(m.a, { mutation: v }, function(n) {
                            return c.a.createElement(
                              'form',
                              {
                                onSubmit: function(t) {
                                  return e.onInputSubmit(t, n);
                                }
                              },
                              c.a.createElement('input', {
                                id: 'editable-title-input',
                                onBlur: function() {
                                  return e.onInputBlur(n);
                                },
                                onFocus: e.moveCaretAtEnd,
                                ref: function(n) {
                                  return (e._input = n);
                                },
                                type: 'text',
                                defaultValue: o
                              }),
                              c.a.createElement('span', {
                                className: 'item-title-link',
                                style: { display: 'none' }
                              })
                            );
                          })
                        : c.a.createElement(
                            u.Fragment,
                            null,
                            c.a.createElement(
                              'span',
                              {
                                className: 'item-title-link',
                                id: 'editable-title-span'
                              },
                              o || 'Untitled'
                            ),
                            e.props.editable &&
                              c.a.createElement(
                                'svg',
                                {
                                  className: 'icon-edit',
                                  onClick: function(n) {
                                    return e.onPencilButtonClick(n);
                                  }
                                },
                                c.a.createElement('use', { xlinkHref: '#edit' })
                              )
                          )
                    );
                  });
                }
              }
            ]),
            n
          );
        })(u.Component);
      Object.defineProperty(O, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: {
          editable: s.a.bool,
          title: s.a.string,
          id: s.a.string,
          saveItem: s.a.func.isRequired,
          itemType: s.a.string
        }
      }),
        (n.a = O);
    },
    404: function(e, n, t) {
      'use strict';
      var r = t(0),
        o = t.n(r),
        a = t(1),
        i = t.n(a),
        u = t(4),
        c = t(2),
        l = t.n(c),
        s = t(265),
        p = t(15),
        f = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query GetUserDataForTitle($id: ID!) {\n    ',
            '(id: $id) {\n      id\n      owner {\n        anon\n        baseUrl\n        id\n        pro\n        title\n      }\n    }\n  }\n'
          ],
          [
            '\n  query GetUserDataForTitle($id: ID!) {\n    ',
            '(id: $id) {\n      id\n      owner {\n        anon\n        baseUrl\n        id\n        pro\n        title\n      }\n    }\n  }\n'
          ]
        ),
        d = function(e) {
          return l()(f, e);
        },
        m = function(e) {
          var n = e.itemType,
            t = e.id;
          return o.a.createElement(
            u.a,
            {
              query: d(n),
              variables: { id: t },
              loadingIndicator: o.a.createElement('div', {
                className: 'by',
                style: { height: 20 }
              })
            },
            function(e) {
              var t = e.data;
              return o.a.createElement(s.a, { itemType: n, owner: t[n].owner });
            }
          );
        };
      (m.propTypes = {
        itemType: i.a.oneOf(Object.values(p.a)),
        id: i.a.string.isRequired
      }),
        (n.a = m);
    },
    405: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(4),
        p = t(2),
        f = t.n(p),
        d = t(15),
        m = t(265),
        b = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        y = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  {\n    sessionUser {\n      id\n      anon\n      pro\n      currentContext {\n        id\n        baseUrl\n        title\n      }\n    }\n  }\n'
          ],
          [
            '\n  {\n    sessionUser {\n      id\n      anon\n      pro\n      currentContext {\n        id\n        baseUrl\n        title\n      }\n    }\n  }\n'
          ]
        ),
        E = f()(y),
        h = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            b(n, [
              {
                key: 'render',
                value: function() {
                  var e = this.props.itemType;
                  return u.a.createElement(
                    s.a,
                    {
                      query: E,
                      loadingIndicator: u.a.createElement('div', {
                        className: 'by',
                        style: { height: 20 }
                      })
                    },
                    function(n) {
                      var t = n.data,
                        r = {
                          pro: t.sessionUser.pro,
                          anon: t.sessionUser.anon,
                          title: t.sessionUser.currentContext.title,
                          baseUrl: t.sessionUser.currentContext.baseUrl
                        };
                      return u.a.createElement(m.a, { itemType: e, owner: r });
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(h, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { itemType: l.a.oneOf(Object.values(d.a)).isRequired }
      }),
        (n.a = h);
    },
    406: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(48),
        l = t(407),
        s = t(15),
        p = t(21),
        f =
          (t.n(p),
          (function() {
            function e(e, n) {
              for (var t = 0; t < n.length; t++) {
                var r = n[t];
                (r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  'value' in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r);
              }
            }
            return function(n, t, r) {
              return t && e(n.prototype, t), r && e(n, r), n;
            };
          })()),
        d = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            f(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(p.ApolloConsumer, null, function(e) {
                    return u.a.createElement(
                      c.b,
                      { className: 'item-data-router' },
                      u.a.createElement(l.a, {
                        path: ':username/pen/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: 'team/:teamname/pen/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: ':username/full/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: 'team/:teamname/full/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: ':username/details/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: 'team/:teamname/details/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: ':username/professor/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: 'team/:teamname/professor/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: ':username/live/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: 'team/:teamname/live/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: ':username/pres/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: 'team/:teamname/pres/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: ':username/collab/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: 'team/:teamname/collab/:id',
                        itemType: s.a.PEN,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: ':username/project/:room_type/:id',
                        itemType: s.a.PROJECT,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: 'team/:teamname/project/:room_type/:id',
                        itemType: s.a.PROJECT,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: ':username/post/:id',
                        itemType: s.a.POST,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: 'team/:teamname/post/:id',
                        itemType: s.a.POST,
                        client: e
                      }),
                      u.a.createElement(l.a, {
                        path: 'collection/:id',
                        itemType: s.a.COLLECTION,
                        client: e
                      })
                    );
                  });
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = d;
    },
    407: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = (t.n(i), t(1)),
        c = t.n(u),
        l = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        s = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            l(n, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.updateStore(this.props);
                }
              },
              {
                key: 'componentDidUpdate',
                value: function() {
                  this.updateStore(this.props);
                }
              },
              {
                key: 'updateStore',
                value: function(e) {
                  if (e.id) {
                    var n = e.client,
                      t = e.id,
                      r = e.itemType;
                    setTimeout(function() {
                      n.writeData({
                        data: {
                          item: { __typename: 'Item', id: t, itemType: r }
                        }
                      });
                    }, 0);
                  }
                }
              },
              {
                key: 'render',
                value: function() {
                  return null;
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(s, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { itemType: c.a.string.isRequired, id: c.a.string }
      }),
        (n.a = s);
    },
    408: function(e, n, t) {
      'use strict';
      (function(e) {
        var r = t(0),
          o = t.n(r),
          a = t(1),
          i = t.n(a),
          u = t(59),
          c = (t.n(u), t(21)),
          l = (t.n(c), t(409)),
          s = function(e) {
            var n = e.client;
            return o.a.createElement(
              c.ApolloProvider,
              { client: n },
              o.a.createElement(l.a, null)
            );
          };
        (s.propTypes = { client: i.a.object }), (n.a = Object(u.hot)(e)(s));
      }.call(n, t(76)(e)));
    },
    409: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(4),
        s = t(2),
        p = t.n(s),
        f = t(410),
        d = t(420),
        m = t(424),
        b = t(12),
        y = t(100),
        E = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        h = i(
          [
            '\n  {\n    popups @client {\n      id\n      message\n      modal {\n        id\n      }\n      dialog\n    }\n  }\n'
          ],
          [
            '\n  {\n    popups @client {\n      id\n      message\n      modal {\n        id\n      }\n      dialog\n    }\n  }\n'
          ]
        ),
        v = i(
          [
            '\n  mutation ClosePopup {\n    popupsCloseModalAndDialog @client\n  }\n'
          ],
          [
            '\n  mutation ClosePopup {\n    popupsCloseModalAndDialog @client\n  }\n'
          ]
        ),
        O = i(
          [
            '\n  mutation ClearPopupMessage {\n    popupsClearMessage @client\n  }\n'
          ],
          [
            '\n  mutation ClearPopupMessage {\n    popupsClearMessage @client\n  }\n'
          ]
        ),
        _ = p()(h),
        w = p()(v),
        T = p()(O),
        g = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            E(n, [
              {
                key: 'render',
                value: function() {
                  return c.a.createElement(l.a, { query: _ }, function(e) {
                    var n = e.data;
                    return c.a.createElement(b.a, { mutation: w }, function(e) {
                      return c.a.createElement(b.a, { mutation: T }, function(
                        t
                      ) {
                        var r = n.popups,
                          o = r.message,
                          a = r.modal,
                          i = r.dialog;
                        return c.a.createElement(
                          u.Fragment,
                          null,
                          a && c.a.createElement(f.a, { closePopup: e }),
                          i && c.a.createElement(d.a, { closePopup: e }),
                          (a || i) &&
                            c.a.createElement(m.a, { modal: null !== a }),
                          o &&
                            c.a.createElement(y.a, {
                              clearPopupMessage: t,
                              message: o
                            })
                        );
                      });
                    });
                  });
                }
              }
            ]),
            n
          );
        })(u.Component);
      n.a = g;
    },
    410: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n, t) {
        return (
          n in e
            ? Object.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[n] = t),
          e
        );
      }
      var u,
        c = t(0),
        l = t.n(c),
        s = t(1),
        p = t.n(s),
        f = t(411),
        d = t(37),
        m = t(2),
        b = t.n(m),
        y = t(4),
        E = t(413),
        h = t(414),
        v = t(415),
        O = t(416),
        _ = t(418),
        w = t(419),
        T =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        g = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        P = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  {\n    popups @client {\n      id\n      modal {\n        id\n        type\n        props {\n          name\n          value\n        }\n      }\n    }\n  }\n'
          ],
          [
            '\n  {\n    popups @client {\n      id\n      modal {\n        id\n        type\n        props {\n          name\n          value\n        }\n      }\n    }\n  }\n'
          ]
        ),
        S =
          ((u = {}),
          i(u, d.a.PROJECT_LIMIT, l.a.createElement(f.a, null)),
          i(u, d.a.LOG_IN_TO_CREATE_COLLECTION, l.a.createElement(E.a, null)),
          i(u, d.a.LOG_IN_TO_CREATE_POSTS, l.a.createElement(h.a, null)),
          i(u, d.a.LOG_IN_TO_CREATE_PROJECTS, l.a.createElement(v.a, null)),
          i(u, d.a.CONFIRM_LOGOUT, l.a.createElement(O.a, null)),
          i(u, d.a.QUERY_ERROR, l.a.createElement(_.a, null)),
          i(u, d.a.MUTATION_ERROR, l.a.createElement(w.a, null)),
          u),
        j = b()(P),
        C = (function(e) {
          function n() {
            var e, t, a, i;
            r(this, n);
            for (var u = arguments.length, c = Array(u), l = 0; l < u; l++)
              c[l] = arguments[l];
            return (
              (t = a = o(
                this,
                (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(
                  e,
                  [this].concat(c)
                )
              )),
              Object.defineProperty(a, 'onKeyDown', {
                enumerable: !0,
                writable: !0,
                value: function(e) {
                  27 === e.keyCode && a.props.closePopup();
                }
              }),
              (i = t),
              o(a, i)
            );
          }
          return (
            a(n, e),
            g(n, [
              {
                key: 'componentDidMount',
                value: function() {
                  document.addEventListener('keydown', this.onKeyDown);
                }
              },
              {
                key: 'componentWillUnmount',
                value: function() {
                  document.removeEventListener('keydown', this.onKeyDown);
                }
              },
              {
                key: 'render',
                value: function() {
                  return l.a.createElement(y.a, { query: j }, function(e) {
                    var n = e.data,
                      t = n.popups.modal.props || [];
                    t = t.reduce(function(e, n) {
                      return (e[n.name] = n.value), e;
                    }, {});
                    var r = S[n.popups.modal.type];
                    return Object(c.cloneElement)(r, T({}, t));
                  });
                }
              }
            ]),
            n
          );
        })(c.Component);
      Object.defineProperty(C, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { closePopup: p.a.func }
      }),
        (n.a = C);
    },
    411: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(50),
        p = t(51),
        f = t(412),
        d = t(32),
        m = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        b = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            m(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    s.a,
                    null,
                    u.a.createElement(
                      'h2',
                      null,
                      "You're at your Project limit."
                    ),
                    u.a.createElement(
                      'p',
                      null,
                      'You have used ',
                      this.props.usedProjects,
                      ' out of the',
                      ' ',
                      this.props.projects,
                      ' allowed Projects on your current plan.'
                    ),
                    u.a.createElement(
                      p.a,
                      null,
                      u.a.createElement(f.a, null),
                      u.a.createElement(d.a, { label: 'Close' })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(b, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { projects: l.a.number, usedProjects: l.a.number }
      }),
        (n.a = b);
    },
    412: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(18),
        p = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        f = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            p(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(s.a, {
                    url: this.props.url || '/signup/change/pro',
                    classes: 'black roll-yellow bold',
                    label: this.props.label || 'Upgrade Plan Now'
                  });
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(f, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { label: l.a.string, url: l.a.string }
      }),
        (n.a = f);
    },
    413: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(50),
        l = t(51),
        s = t(32),
        p = t(117),
        f = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        d = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            f(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    c.a,
                    null,
                    u.a.createElement(
                      'h2',
                      null,
                      'Only logged in users can create a CodePen Collection.'
                    ),
                    u.a.createElement(
                      'p',
                      null,
                      "Collections are groups of Pens. It's a way to organize and share Pens that have some useful or fun connection. For example, you might create a Collection of user interface components you'd like to implement on a particular project."
                    ),
                    u.a.createElement(
                      l.a,
                      null,
                      u.a.createElement(p.a, null),
                      u.a.createElement(s.a, { label: 'Close' })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = d;
    },
    414: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(50),
        l = t(51),
        s = t(32),
        p = t(117),
        f = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        d = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            f(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    c.a,
                    null,
                    u.a.createElement(
                      'h2',
                      null,
                      'Only logged in users can create a CodePen Post.'
                    ),
                    u.a.createElement(
                      'p',
                      null,
                      'CodePen users get their own easy to update CodePen blog.',
                      ' ',
                      u.a.createElement(
                        'a',
                        { href: '/blogging/' },
                        'Find out more'
                      ),
                      '.'
                    ),
                    u.a.createElement(
                      l.a,
                      null,
                      u.a.createElement(p.a, null),
                      u.a.createElement(s.a, { label: 'Close' })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = d;
    },
    415: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(50),
        l = t(51),
        s = t(32),
        p = t(117),
        f = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        d = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            f(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    c.a,
                    null,
                    u.a.createElement(
                      'h2',
                      null,
                      'The CodePen Project Editor is for logged in users.'
                    ),
                    u.a.createElement(
                      'p',
                      null,
                      'The Project Editor enables you to build web development projects online and share them instantly.',
                      ' ',
                      u.a.createElement(
                        'a',
                        { href: '/pro/projects' },
                        'Find out more'
                      ),
                      '.'
                    ),
                    u.a.createElement(
                      l.a,
                      null,
                      u.a.createElement(p.a, null),
                      u.a.createElement(s.a, { label: 'Close' })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = d;
    },
    416: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(50),
        l = t(51),
        s = t(32),
        p = t(417),
        f = t(263),
        d = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        m = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            d(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    c.a,
                    { style: 'warning' },
                    u.a.createElement(
                      'h2',
                      null,
                      'Are you sure you want to Log Out?'
                    ),
                    u.a.createElement(
                      'p',
                      null,
                      'Your unsaved changes will be lost.'
                    ),
                    u.a.createElement(
                      l.a,
                      null,
                      u.a.createElement(p.a, {
                        label: 'Continue',
                        onClick: function() {
                          return Object(f.a)(!0);
                        },
                        buttonStyle: 'red'
                      }),
                      u.a.createElement(s.a, null)
                    )
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = m;
    },
    417: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(20),
        p = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        f = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            p(n, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.props.focus && this._button.focus();
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(s.a, {
                    ref: function(n) {
                      return (e._button = n);
                    },
                    classes:
                      'button-medium button-focus ' +
                      (this.props.buttonStyle || 'yellow'),
                    label: this.props.label || 'Confirm',
                    onClick: this.props.onClick
                  });
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(f, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: {
          buttonStyle: l.a.string,
          label: l.a.string,
          onClick: l.a.func.isRequired,
          focus: l.a.bool
        }
      }),
        (n.a = f);
    },
    418: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(50),
        l = t(51),
        s = t(32),
        p = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        f = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            p(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    c.a,
                    null,
                    u.a.createElement('h2', null, 'Something went wrong.'),
                    u.a.createElement(
                      'p',
                      null,
                      'Please refresh the page. If this issue persists please contact support@codepen.io.'
                    ),
                    u.a.createElement(
                      l.a,
                      null,
                      u.a.createElement(s.a, { label: 'Close' })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = f;
    },
    419: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(50),
        l = t(51),
        s = t(32),
        p = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        f = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            p(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    c.a,
                    null,
                    u.a.createElement('h2', null, 'Something went wrong.'),
                    u.a.createElement(
                      'p',
                      null,
                      'Please try again. If this issue persists please contact support@codepen.io.'
                    ),
                    u.a.createElement(
                      l.a,
                      null,
                      u.a.createElement(s.a, { label: 'Close' })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = f;
    },
    42: function(e, n, t) {
      'use strict';
      t.d(n, 'b', function() {
        return o;
      }),
        t.d(n, 'a', function() {
          return i;
        });
      var r = {},
        o = function(e, n) {
          r[e] = n;
        },
        a = function(e) {
          console.error(
            'No ' +
              e +
              " present in serverConstants. Make sure it is set in the Rails Controller's init_data"
          );
        },
        i = function(e) {
          if (Array.isArray(e)) {
            var n = e.reduce(function(n, t) {
              return n[t] ? n[t] : a(e.join('.'));
            }, r);
            if (n) return n;
            a(e.join('.'));
          }
          if (r[e]) return r[e];
          a(e);
        };
    },
    420: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n, t) {
        return (
          n in e
            ? Object.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[n] = t),
          e
        );
      }
      var u,
        c = t(0),
        l = t.n(c),
        s = t(1),
        p = t.n(s),
        f = t(75),
        d = t(2),
        m = t.n(d),
        b = t(4),
        y = t(421),
        E = t(422),
        h = t(423),
        v = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        O = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          ['\n  {\n    popups @client {\n      id\n      dialog\n    }\n  }\n'],
          ['\n  {\n    popups @client {\n      id\n      dialog\n    }\n  }\n']
        ),
        _ =
          ((u = {}),
          i(u, f.a, l.a.createElement(y.a, null)),
          i(u, f.b, l.a.createElement(E.a, null)),
          i(u, f.c, l.a.createElement(h.a, null)),
          u),
        w = m()(O),
        T = (function(e) {
          function n() {
            var e, t, a, i;
            r(this, n);
            for (var u = arguments.length, c = Array(u), l = 0; l < u; l++)
              c[l] = arguments[l];
            return (
              (t = a = o(
                this,
                (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(
                  e,
                  [this].concat(c)
                )
              )),
              Object.defineProperty(a, 'onKeyDown', {
                enumerable: !0,
                writable: !0,
                value: function(e) {
                  27 === e.keyCode && a.props.closePopup();
                }
              }),
              (i = t),
              o(a, i)
            );
          }
          return (
            a(n, e),
            v(n, [
              {
                key: 'componentDidMount',
                value: function() {
                  document.addEventListener('keydown', this.onKeyDown);
                }
              },
              {
                key: 'componentWillUnmount',
                value: function() {
                  document.removeEventListener('keydown', this.onKeyDown);
                }
              },
              {
                key: 'render',
                value: function() {
                  return l.a.createElement(
                    b.a,
                    { query: w, loadingIndicator: null },
                    function(e) {
                      var n = e.data;
                      return _[n.popups.dialog];
                    }
                  );
                }
              }
            ]),
            n
          );
        })(c.Component);
      Object.defineProperty(T, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { closePopup: p.a.func }
      }),
        (n.a = T);
    },
    421: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(2),
        f = t.n(p),
        d = t(4),
        m = t(12),
        b = t(5),
        y = t(32),
        E = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        h = i(
          [
            '\n  {\n    sessionUser {\n      id\n      permissions {\n        canCreatePrivate\n      }\n    }\n  }\n'
          ],
          [
            '\n  {\n    sessionUser {\n      id\n      permissions {\n        canCreatePrivate\n      }\n    }\n  }\n'
          ]
        ),
        v = i(
          [
            '\n  mutation CreateCollection(\n    $title: String!\n    $description: String\n    $isPrivate: Boolean\n    $pen: String\n  ) {\n    createCollection(\n      title: $title\n      description: $description\n      isPrivate: $isPrivate\n      pen: $pen\n    ) {\n      collection {\n        title\n      }\n    }\n  }\n'
          ],
          [
            '\n  mutation CreateCollection(\n    $title: String!\n    $description: String\n    $isPrivate: Boolean\n    $pen: String\n  ) {\n    createCollection(\n      title: $title\n      description: $description\n      isPrivate: $isPrivate\n      pen: $pen\n    ) {\n      collection {\n        title\n      }\n    }\n  }\n'
          ]
        ),
        O = i(
          [
            '\n  mutation CreateCollectionPopupsAddMessage($message: String!) {\n    popupsAddMessage(message: $message) @client\n  }\n'
          ],
          [
            '\n  mutation CreateCollectionPopupsAddMessage($message: String!) {\n    popupsAddMessage(message: $message) @client\n  }\n'
          ]
        ),
        _ = i(
          [
            '\n  mutation ClosePopup {\n    popupsCloseModalAndDialog @client\n  }\n'
          ],
          [
            '\n  mutation ClosePopup {\n    popupsCloseModalAndDialog @client\n  }\n'
          ]
        ),
        w = f()(h),
        T = f()(v),
        g = f()(O),
        P = f()(_),
        S = (function(e) {
          function n() {
            var e, t, a, i;
            r(this, n);
            for (var u = arguments.length, c = Array(u), l = 0; l < u; l++)
              c[l] = arguments[l];
            return (
              (t = a = o(
                this,
                (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(
                  e,
                  [this].concat(c)
                )
              )),
              Object.defineProperty(a, 'state', {
                enumerable: !0,
                writable: !0,
                value: { invalid: !1 }
              }),
              Object.defineProperty(a, 'onFormSubmit', {
                enumerable: !0,
                writable: !0,
                value: function(e, n) {
                  if ((e.preventDefault(), '' === a.titleInput.value.trim()))
                    return a.setState({ invalid: !0 });
                  var t = !!a.privateInput && a.privateInput.checked;
                  n({
                    variables: {
                      pen: a.props.pen || null,
                      title: a.titleInput.value,
                      description: a.descriptionInput.value,
                      isPrivate: t
                    }
                  });
                }
              }),
              (i = t),
              o(a, i)
            );
          }
          return (
            a(n, e),
            E(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return c.a.createElement(
                    'div',
                    { className: 'modal modal-neutral group' },
                    c.a.createElement('h1', null, 'Create New Collection'),
                    c.a.createElement(m.a, { mutation: g }, function(n) {
                      return c.a.createElement(m.a, { mutation: P }, function(
                        t
                      ) {
                        return c.a.createElement(
                          m.a,
                          {
                            mutation: T,
                            onCompleted: function(e) {
                              var r = e.createCollection.collection;
                              r
                                ? (n({
                                    variables: {
                                      message:
                                        'Your Collection ' +
                                        r.title +
                                        ' was created.'
                                    }
                                  }),
                                  t())
                                : n({
                                    variables: {
                                      message:
                                        'There was an error while saving your collection. Please try again.'
                                    }
                                  });
                            }
                          },
                          function(n) {
                            return c.a.createElement(
                              'form',
                              {
                                className:
                                  'collection-settings-form top-label-form',
                                action: '#',
                                onSubmit: function(t) {
                                  return e.onFormSubmit(t, n);
                                }
                              },
                              c.a.createElement(
                                'div',
                                { className: e.state.invalid ? 'error' : '' },
                                c.a.createElement(
                                  'label',
                                  { htmlFor: 'title' },
                                  'Name'
                                ),
                                c.a.createElement('input', {
                                  type: 'text',
                                  name: 'title',
                                  ref: function(n) {
                                    return (e.titleInput = n);
                                  }
                                }),
                                e.state.invalid &&
                                  c.a.createElement(
                                    'div',
                                    { className: 'error-message' },
                                    'Please enter a title for the Collection'
                                  )
                              ),
                              c.a.createElement(
                                'div',
                                null,
                                c.a.createElement(
                                  'label',
                                  { htmlFor: 'description' },
                                  'Description'
                                ),
                                c.a.createElement('textarea', {
                                  type: 'text',
                                  id: 'description',
                                  name: 'description',
                                  style: { height: '75px' },
                                  ref: function(n) {
                                    return (e.descriptionInput = n);
                                  }
                                })
                              ),
                              c.a.createElement(
                                'div',
                                {
                                  className: 'collection-settings-form-footer'
                                },
                                c.a.createElement(
                                  'div',
                                  {
                                    className:
                                      'collection-settings-form-footer-item'
                                  },
                                  c.a.createElement('input', {
                                    type: 'submit',
                                    className: 'button green',
                                    value: 'Create'
                                  }),
                                  c.a.createElement(y.a, null)
                                ),
                                c.a.createElement(
                                  d.a,
                                  { query: w, renderWhenDataReady: !0 },
                                  function(n) {
                                    return n.data.sessionUser.permissions
                                      .canCreatePrivate
                                      ? c.a.createElement(
                                          'div',
                                          {
                                            className:
                                              'collection-settings-form-footer-item'
                                          },
                                          c.a.createElement(
                                            'div',
                                            {
                                              className:
                                                'checkbox-row public-private-wrap'
                                            },
                                            c.a.createElement(
                                              'div',
                                              { className: 'ios-toggle-wrap' },
                                              c.a.createElement(
                                                'div',
                                                {
                                                  className:
                                                    'ios-toggle-mega-label-wrap'
                                                },
                                                'Public',
                                                c.a.createElement(
                                                  'span',
                                                  { className: 'ios-toggle' },
                                                  c.a.createElement('input', {
                                                    type: 'checkbox',
                                                    name:
                                                      'collection-details-private',
                                                    id:
                                                      'collection-details-private',
                                                    ref: function(n) {
                                                      return (e.privateInput = n);
                                                    }
                                                  }),
                                                  c.a.createElement('label', {
                                                    htmlFor:
                                                      'collection-details-private'
                                                  })
                                                ),
                                                'Private',
                                                c.a.createElement('label', {
                                                  htmlFor:
                                                    'collection-details-private',
                                                  className:
                                                    'ios-toggle-mega-label'
                                                })
                                              ),
                                              c.a.createElement(
                                                'span',
                                                {
                                                  className: 'badge badge-pro'
                                                },
                                                'PRO'
                                              ),
                                              c.a.createElement(
                                                'div',
                                                {
                                                  className: 'help-flyout-link'
                                                },
                                                c.a.createElement(b.a, {
                                                  icon: 'help'
                                                }),
                                                c.a.createElement(
                                                  'div',
                                                  {
                                                    className:
                                                      'help-flyout help-flyout-reverse help-flyout-up'
                                                  },
                                                  c.a.createElement(
                                                    'h5',
                                                    null,
                                                    'About Private Collections'
                                                  ),
                                                  c.a.createElement(b.a, {
                                                    icon: 'x'
                                                  }),
                                                  c.a.createElement(
                                                    'p',
                                                    null,
                                                    "Private Collections are hidden from everywhere on CodePen, except to you. You can still share them and other people can see them, they just can't find them through searching or browsing. Private Pens are visible to anyone that views Private Collections."
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      : null;
                                  }
                                )
                              )
                            );
                          }
                        );
                      });
                    })
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      Object.defineProperty(S, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { pen: s.a.object }
      }),
        (n.a = S);
    },
    422: function(e, n, t) {
      'use strict';
      function r(e, n, t) {
        return (
          n in e
            ? Object.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[n] = t),
          e
        );
      }
      function o(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function a(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function i(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var u = t(0),
        c = t.n(u),
        l = t(8),
        s = t.n(l),
        p = t(5),
        f = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        d = {
          pens: { title: 'Pens', icon: 'icon-new-pen', url: '/search/' },
          projects: {
            title: 'Projects',
            icon: 'icon-new-project',
            url: '/search/projects/'
          },
          posts: {
            title: 'Posts',
            icon: 'icon-new-post',
            url: '/search/posts/'
          },
          collections: {
            title: 'Collections',
            icon: 'icon-new-collection',
            url: '/search/collections/'
          }
        },
        m = (function(e) {
          function n() {
            var e, t, r, i;
            o(this, n);
            for (var u = arguments.length, c = Array(u), l = 0; l < u; l++)
              c[l] = arguments[l];
            return (
              (t = r = a(
                this,
                (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(
                  e,
                  [this].concat(c)
                )
              )),
              Object.defineProperty(r, 'state', {
                enumerable: !0,
                writable: !0,
                value: { actionURL: '/search/', searchType: 'pens' }
              }),
              Object.defineProperty(r, 'handleTypeChange', {
                enumerable: !0,
                writable: !0,
                value: function(e, n) {
                  var t = n || e.target.value;
                  r.setState({
                    actionURL: (d[t] && d[t].url) || '/search/',
                    searchType: t
                  });
                }
              }),
              (i = t),
              a(r, i)
            );
          }
          return (
            i(n, e),
            f(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return c.a.createElement(
                    'form',
                    {
                      role: 'dialog',
                      'aria-labelledby': 'search-title',
                      className: 'search-dialog',
                      action: this.state.actionURL
                    },
                    c.a.createElement(
                      'h1',
                      { id: 'search-title', className: 'screen-reader-text' },
                      'Search'
                    ),
                    c.a.createElement(
                      'label',
                      { className: 'search-row search-row-input' },
                      c.a.createElement(p.a, { icon: 'mag' }),
                      c.a.createElement('input', {
                        type: 'search',
                        name: 'q',
                        placeholder: 'Search...',
                        autoFocus: !0
                      })
                    ),
                    c.a.createElement(
                      'div',
                      {
                        className: s()(
                          'search-row search-row-type search-filters ',
                          r(
                            {},
                            'type-' + this.state.searchType,
                            this.state.searchType
                          )
                        )
                      },
                      c.a.createElement('input', {
                        type: 'hidden',
                        name: 'search-type',
                        value: this.state.searchType
                      }),
                      Object.keys(d).map(function(n) {
                        var t = d[n],
                          r = t.icon,
                          o = t.title;
                        return c.a.createElement(
                          'button',
                          {
                            key: n,
                            role: 'button',
                            'aria-pressed': e.state.searchType === n,
                            onClick: function(t) {
                              return e.handleTypeChange(t, n);
                            },
                            className: s()(
                              'button button-medium search-filter',
                              'type-' + n,
                              { active: e.state.searchType === n }
                            )
                          },
                          c.a.createElement(p.a, { icon: r }),
                          o
                        );
                      })
                    )
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      n.a = m;
    },
    423: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(32),
        l = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        s = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            l(n, [
              {
                key: 'render',
                value: function() {
                  var e = {
                    width: '620px',
                    height: '95vh',
                    top: '50%',
                    marginTop: '-47.5vh',
                    left: '50%',
                    marginLeft: '-310px'
                  };
                  return u.a.createElement(
                    'div',
                    {
                      className:
                        'modal-message modal group upgrade-upsell-modal top-layer-modal',
                      style: e
                    },
                    u.a.createElement('iframe', {
                      width: '100%',
                      height: '100%',
                      src: '/accounts/upgrade_modal#general'
                    }),
                    u.a.createElement(c.a, {
                      label: 'Close',
                      classes: 'close-button button green'
                    })
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = s;
    },
    424: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(4),
        f = t(2),
        d = t.n(f),
        m = t(12),
        b = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        y = i(
          [
            '\n  {\n    popups @client {\n      id\n      modal {\n        id\n        dismissable\n      }\n    }\n  }\n'
          ],
          [
            '\n  {\n    popups @client {\n      id\n      modal {\n        id\n        dismissable\n      }\n    }\n  }\n'
          ]
        ),
        E = i(
          [
            '\n  mutation ClosePopup {\n    popupsCloseModalAndDialog @client\n  }\n'
          ],
          [
            '\n  mutation ClosePopup {\n    popupsCloseModalAndDialog @client\n  }\n'
          ]
        ),
        h = d()(y),
        v = d()(E),
        O = (function(e) {
          function n() {
            var e, t, a, i;
            r(this, n);
            for (var u = arguments.length, l = Array(u), s = 0; s < u; s++)
              l[s] = arguments[s];
            return (
              (t = a = o(
                this,
                (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(
                  e,
                  [this].concat(l)
                )
              )),
              Object.defineProperty(a, 'renderCloseableOverlay', {
                enumerable: !0,
                writable: !0,
                value: function() {
                  return c.a.createElement(m.a, { mutation: v }, function(e) {
                    return c.a.createElement('div', {
                      className: 'popup-overlay overlay block',
                      onClick: e
                    });
                  });
                }
              }),
              (i = t),
              o(a, i)
            );
          }
          return (
            a(n, e),
            b(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return this.props.modal
                    ? c.a.createElement(p.a, { query: h }, function(n) {
                        return !1 === n.data.popups.modal.dismissable
                          ? c.a.createElement('div', {
                              className: 'popup-overlay overlay block'
                            })
                          : e.renderCloseableOverlay();
                      })
                    : this.renderCloseableOverlay();
                }
              }
            ]),
            n
          );
        })(u.Component);
      (O.propTypes = { modal: s.a.bool }), (n.a = O);
    },
    43: function(e, n, t) {
      'use strict';
      function r(e) {
        return function() {
          var n = e.apply(this, arguments);
          return new Promise(function(e, t) {
            function r(o, a) {
              try {
                var i = n[o](a),
                  u = i.value;
              } catch (e) {
                return void t(e);
              }
              if (!i.done)
                return Promise.resolve(u).then(
                  function(e) {
                    r('next', e);
                  },
                  function(e) {
                    r('throw', e);
                  }
                );
              e(u);
            }
            return r('next');
          });
        };
      }
      function o(e) {
        if (I) return void e();
        f().then(function(n) {
          n.apps.length < 1 && n.initializeApp(window.__firestore.config),
            (window.firebase = n),
            n
              .auth()
              .signInWithCustomToken(window.__firestore.token)
              .then(function() {
                (I = n.database()), (A = I.ref()), e();
              })
              .catch(function(e) {
                console.log(e);
              });
        });
      }
      function a(e) {
        return A.child(R.roomID + '/' + e);
      }
      t.d(n, 'g', function() {
        return y;
      }),
        t.d(n, 'f', function() {
          return E;
        }),
        t.d(n, 'b', function() {
          return v;
        }),
        t.d(n, 'd', function() {
          return O;
        }),
        t.d(n, 'a', function() {
          return _;
        }),
        t.d(n, 'e', function() {
          return S;
        }),
        t.d(n, 'c', function() {
          return C;
        });
      var i = t(28),
        u = t(17),
        c =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        l = this,
        s = void 0,
        p = function() {
          return 'true' === localStorage.getItem('integrationTest');
        },
        f = (function() {
          var e = r(
            regeneratorRuntime.mark(function e() {
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return e.abrupt(
                          'return',
                          t
                            .e(0)
                            .then(t.bind(null, 271))
                            .then(function(e) {
                              return e.default;
                            })
                        );
                      case 1:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function() {
            return e.apply(this, arguments);
          };
        })(),
        d = (function() {
          var e = r(
            regeneratorRuntime.mark(function e() {
              var n;
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!p()) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt('return');
                      case 2:
                        if (!s) {
                          e.next = 4;
                          break;
                        }
                        return e.abrupt('return', s);
                      case 4:
                        return (e.next = 6), f();
                      case 6:
                        return (
                          (n = e.sent),
                          n.apps.length < 1 &&
                            n.initializeApp(window.__firestore.config),
                          e.abrupt(
                            'return',
                            n
                              .auth()
                              .signInWithCustomToken(window.__firestore.token)
                              .then(function() {
                                var e = n.firestore(),
                                  t = { timestampsInSnapshots: !0 };
                                return e.settings(t), (s = n.firestore());
                              })
                          )
                        );
                      case 9:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function() {
            return e.apply(this, arguments);
          };
        })(),
        m = (function() {
          var e = r(
            regeneratorRuntime.mark(function e(n) {
              var t;
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), d();
                      case 2:
                        return (
                          (t = e.sent),
                          e.abrupt('return', t.doc('users/' + n.hashid))
                        );
                      case 4:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function(n) {
            return e.apply(this, arguments);
          };
        })(),
        b = function(e, n) {
          return c(
            { __typename: u.a.USER, id: e.hashid, featureNotifications: [] },
            n
          );
        },
        y = (function() {
          var e = r(
            regeneratorRuntime.mark(function e(n, t) {
              var r;
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!p()) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt('return');
                      case 2:
                        return (e.next = 4), m(n);
                      case 4:
                        (r = e.sent),
                          r.onSnapshot(function(e) {
                            t(b(n, e.data()));
                          });
                      case 6:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function(n, t) {
            return e.apply(this, arguments);
          };
        })(),
        E = (function() {
          var e = r(
            regeneratorRuntime.mark(function e(n, t) {
              var r;
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (!p()) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt('return');
                      case 2:
                        return (e.next = 4), d();
                      case 4:
                        return (
                          (r = e.sent),
                          e.abrupt(
                            'return',
                            r
                              .collection('users/' + n.hashid + '/pins')
                              .onSnapshot(function(e) {
                                var n = [];
                                e.forEach(function(e) {
                                  var t = e.data();
                                  n.push(c({}, t));
                                }),
                                  t(n);
                              })
                          )
                        );
                      case 6:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function(n, t) {
            return e.apply(this, arguments);
          };
        })(),
        h = (function() {
          var e = r(
            regeneratorRuntime.mark(function e(n, t) {
              var r;
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), d();
                      case 2:
                        return (
                          (r = e.sent),
                          e.abrupt(
                            'return',
                            r.doc('users/' + n.hashid + '/pins/' + t)
                          )
                        );
                      case 4:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function(n, t) {
            return e.apply(this, arguments);
          };
        })(),
        v = (function() {
          var e = r(
            regeneratorRuntime.mark(function e(n, t) {
              var r;
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), h(n, t.id);
                      case 2:
                        (r = e.sent), r.set(t);
                      case 4:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function(n, t) {
            return e.apply(this, arguments);
          };
        })(),
        O = (function() {
          var e = r(
            regeneratorRuntime.mark(function e(n, t) {
              var r;
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), h(n, t);
                      case 2:
                        (r = e.sent), r.delete();
                      case 4:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function(n, t) {
            return e.apply(this, arguments);
          };
        })(),
        _ = (function() {
          var e = r(
            regeneratorRuntime.mark(function e(n, t) {
              var r, o;
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), m(n);
                      case 2:
                        return (r = e.sent), (e.next = 5), f();
                      case 5:
                        (o = e.sent),
                          r.set(
                            {
                              __typename: u.a.USER,
                              id: n.hashid,
                              featureNotifications: o.firestore.FieldValue.arrayUnion(
                                t
                              ),
                              updatedAt: Object(i.c)()
                            },
                            { merge: !0 }
                          );
                      case 7:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function(n, t) {
            return e.apply(this, arguments);
          };
        })(),
        w = (function() {
          var e = r(
            regeneratorRuntime.mark(function e(n) {
              var t;
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), d();
                      case 2:
                        return (
                          (t = e.sent), e.abrupt('return', t.doc('items/' + n))
                        );
                      case 4:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function(n) {
            return e.apply(this, arguments);
          };
        })(),
        T = function(e, n, t) {
          if ('string' != typeof e) throw 'Invalid ID ' + e;
          if ('string' != typeof n) throw 'Invalid ID ' + n;
          if ('' === e || '' === n) throw 'Invalid values: ' + e + ', ' + n;
          if (0 === Object.keys(t).length) throw 'Invalid attributes';
        },
        g = function(e) {
          return JSON.parse(JSON.stringify(e));
        },
        P = function(e, n, t) {
          return g(c({}, t, { id: e, ownerId: n, updatedAt: Object(i.c)() }));
        },
        S = (function() {
          var e = r(
            regeneratorRuntime.mark(function e(n, t, o) {
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (n) {
                          e.next = 2;
                          break;
                        }
                        return e.abrupt('return');
                      case 2:
                        f().then(
                          r(
                            regeneratorRuntime.mark(function e() {
                              var r;
                              return regeneratorRuntime.wrap(
                                function(e) {
                                  for (;;)
                                    switch ((e.prev = e.next)) {
                                      case 0:
                                        return T(n, t, o), (e.next = 3), w(n);
                                      case 3:
                                        (r = e.sent),
                                          r.set(P(n, t, o), { merge: !0 });
                                      case 5:
                                      case 'end':
                                        return e.stop();
                                    }
                                },
                                e,
                                l
                              );
                            })
                          )
                        );
                      case 3:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function(n, t, r) {
            return e.apply(this, arguments);
          };
        })(),
        j = (function() {
          var e = r(
            regeneratorRuntime.mark(function e(n, t) {
              var r;
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), w(n);
                      case 2:
                        (r = e.sent),
                          r.onSnapshot(function(e) {
                            t(e.data());
                          });
                      case 4:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                l
              );
            })
          );
          return function(n, t) {
            return e.apply(this, arguments);
          };
        })(),
        C =
          ((function() {
            var e = r(
              regeneratorRuntime.mark(function e(n) {
                var t, r, o;
                return regeneratorRuntime.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), d();
                        case 2:
                          return (
                            (t = e.sent),
                            (e.next = 5),
                            t.doc('analytics/' + n).get()
                          );
                        case 5:
                          return (
                            (r = e.sent),
                            (o = void 0),
                            r.exists && (o = r.data().events),
                            e.abrupt('return', Array.isArray(o) ? o : [])
                          );
                        case 9:
                        case 'end':
                          return e.stop();
                      }
                  },
                  e,
                  l
                );
              })
            );
          })(),
          (function() {
            var e = r(
              regeneratorRuntime.mark(function e() {
                var n, t;
                return regeneratorRuntime.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), d();
                        case 2:
                          return (
                            (n = e.sent),
                            (e.next = 5),
                            n.doc('analytics/heap').get()
                          );
                        case 5:
                          if (((t = e.sent), !t.exists)) {
                            e.next = 8;
                            break;
                          }
                          return e.abrupt('return', t.data());
                        case 8:
                          return e.abrupt('return', { enabled: !1 });
                        case 9:
                        case 'end':
                          return e.stop();
                      }
                  },
                  e,
                  l
                );
              })
            );
            return function() {
              return e.apply(this, arguments);
            };
          })());
      window.firestoreConnect = { onItemChanges: j, setItemAttributes: S };
      var R = window.__rtData,
        A = null,
        I = void 0;
      window.CPFirebase = { auth: o, getFirebase: f, getRef: a };
    },
    44: function(e, n, t) {
      'use strict';
      function r(e, n) {
        var t = {};
        for (var r in e)
          n.indexOf(r) >= 0 ||
            (Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]));
        return t;
      }
      function o(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function a(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function i(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(5),
        f = t(20),
        d =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        m = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        b = (function(e) {
          function n(e) {
            o(this, n);
            var t = a(
              this,
              (n.__proto__ || Object.getPrototypeOf(n)).call(this, e)
            );
            return (t.button = Object(u.createRef)()), t;
          }
          return (
            i(n, e),
            m(n, [
              {
                key: 'shouldComponentUpdate',
                value: function(e) {
                  return (
                    this.props.classes !== e.classes ||
                    this.props.spinning !== e.spinning ||
                    this.props.label !== e.label
                  );
                }
              },
              {
                key: 'clickHandler',
                value: function(e) {
                  e && e.preventDefault(),
                    this.props.onClick && this.props.onClick();
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    n = e.spinning,
                    t = e.spinner,
                    o = e.icon,
                    a = e.refLink,
                    i = e.label,
                    u = r(e, [
                      'spinning',
                      'spinner',
                      'icon',
                      'refLink',
                      'label'
                    ]);
                  return (
                    !0 === n && (u.classes += ' spinning'),
                    c.a.createElement(
                      f.a,
                      d({}, u, { ref: this.button }),
                      o &&
                        (t
                          ? c.a.createElement(
                              'span',
                              { className: 'spin-wrap' },
                              c.a.createElement(p.a, { icon: 'spinner' })
                            )
                          : c.a.createElement(p.a, { icon: o, refLink: a })),
                      i && c.a.createElement('span', { className: 'label' }, i)
                    )
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      (b.propTypes = {
        classes: s.a.string,
        icon: s.a.string,
        spinner: s.a.string,
        refLink: s.a.string,
        label: s.a.string,
        onClick: s.a.func,
        disabled: s.a.bool,
        spinning: s.a.bool,
        title: s.a.string,
        id: s.a.string
      }),
        (n.a = b);
    },
    47: function(e, n, t) {
      'use strict';
      t.d(n, 'c', function() {
        return r;
      }),
        t.d(n, 'a', function() {
          return o;
        }),
        t.d(n, 'b', function() {
          return a;
        });
      var r = {
          PUBLIC: 'PUBLIC',
          POPULAR: 'POPULAR',
          TAG: 'TAG',
          SEARCH: 'SEARCH'
        },
        o = { ID: 'ID', POPULARITY: 'POPULARITY', SEARCH: 'SEARCH' },
        a = { ASC: 'ASC', DESC: 'DESC' };
    },
    5: function(e, n, t) {
      'use strict';
      var r = t(0),
        o = t.n(r),
        a = t(1),
        i = t.n(a),
        u =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        c = function(e) {
          var n = e.icon,
            t = e.refLink,
            r = e.width,
            a = e.height;
          if (n) {
            var i = 'icon icon-' + n,
              c = t ? '#' + t : '#' + n,
              l = {};
            return (
              r && (l.width = r),
              a && (l.height = a),
              o.a.createElement(
                'svg',
                u({}, l, { className: i }),
                o.a.createElement('use', { xlinkHref: c })
              )
            );
          }
          return null;
        };
      (c.propTypes = {
        icon: i.a.string.isRequired,
        refLink: i.a.string,
        width: i.a.string,
        height: i.a.string
      }),
        (n.a = c);
    },
    50: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        p = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            s(n, [
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    n = e.style || 'error';
                  return u.a.createElement(
                    'div',
                    { className: 'modal modal-' + n },
                    this.props.children
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      (p.propTypes = { style: l.a.string, children: l.a.node }), (n.a = p);
    },
    51: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        p = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            s(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    'p',
                    { className: 'modal-buttons' },
                    this.props.children
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(p, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { children: l.a.node }
      }),
        (n.a = p);
    },
    55: function(e, n, t) {
      'use strict';
      (function(e) {
        t.d(n, 'a', function() {
          return a;
        }),
          t.d(n, 'b', function() {
            return i;
          });
        var r = 0,
          o = {},
          a = function n(t) {
            'development' !== e.env.ENV &&
              (window.Honeybadger
                ? JSON.stringify(t) !== JSON.stringify(o) &&
                  (Honeybadger.configure({
                    api_key: '32c374f5',
                    environment: e.env.ENV
                  }),
                  Honeybadger.setContext(t),
                  (o = t))
                : (r < 5 &&
                    setTimeout(function() {
                      return n(t);
                    }, 1e3),
                  r++));
          },
          i = function(e) {
            window.Honeybadger && Honeybadger.notify(e);
          };
      }.call(n, t(13)));
    },
    56: function(e, n, t) {
      'use strict';
      var r = function(e) {
        return 'string' != typeof e
          ? ''
          : e.replace(/^[a-z]/, function(e) {
              return e.toUpperCase();
            });
      };
      n.a = r;
    },
    566: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(8),
        s = t.n(l),
        p = t(2),
        f = t.n(p),
        d = t(4),
        m = t(12),
        b = t(101),
        y = t(5),
        E = t(908),
        h = t(74),
        v = t(909),
        O = t(910),
        _ = t(911),
        w = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        T = i(
          [
            '\n  {\n    sessionUser {\n      id\n      currentTeamId\n      anon\n    }\n  }\n'
          ],
          [
            '\n  {\n    sessionUser {\n      id\n      currentTeamId\n      anon\n    }\n  }\n'
          ]
        ),
        g = i(
          [
            '\n  {\n    popups @client {\n      __typename\n      id\n      menu\n    }\n  }\n'
          ],
          [
            '\n  {\n    popups @client {\n      __typename\n      id\n      menu\n    }\n  }\n'
          ]
        ),
        P = i(
          [
            '\n  mutation CreateMenuToggleMenu($menu: String) {\n    popupsToggleMenu(menu: $menu) @client\n  }\n'
          ],
          [
            '\n  mutation CreateMenuToggleMenu($menu: String) {\n    popupsToggleMenu(menu: $menu) @client\n  }\n'
          ]
        ),
        S = f()(T),
        j = f()(g),
        C = f()(P),
        R = (function(e) {
          function n(e) {
            r(this, n);
            var t = o(
              this,
              (n.__proto__ || Object.getPrototypeOf(n)).call(this, e)
            );
            return (
              (t.createMenuButton = null),
              (t.toggleTemplateDropdown = t.toggleTemplateDropdown.bind(t)),
              (t.state = { templateDropdownOpen: !1 }),
              t
            );
          }
          return (
            a(n, e),
            w(n, [
              {
                key: 'toggleTemplateDropdown',
                value: function() {
                  this.setState({
                    templateDropdownOpen: !this.state.templateDropdownOpen
                  });
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return c.a.createElement(d.a, { query: j }, function(n) {
                    var t = n.data,
                      r = t.popups,
                      o = r.menu === h.a;
                    return c.a.createElement(
                      d.a,
                      { query: S, renderBeforeDataReady: !0 },
                      function(n) {
                        var t = n.loading,
                          r = n.error,
                          a = n.data,
                          i = !t && !r,
                          u = a.sessionUser,
                          l = i && a.sessionUser.anon,
                          p = s()({ 'create-button': !0, active: o }),
                          f = s()({
                            'create-dropdown': !0,
                            'menu-dropdown': !0,
                            open: o
                          });
                        return c.a.createElement(
                          b.a,
                          {
                            menu: h.a,
                            isOpen: o,
                            className:
                              'menu-dropdown-parent create-menu-dropdown-parent'
                          },
                          c.a.createElement(
                            m.a,
                            { mutation: C, variables: { menu: h.a } },
                            function(e) {
                              return c.a.createElement(
                                'button',
                                {
                                  className: p,
                                  'aria-haspopup': 'true',
                                  'aria-expanded': o,
                                  onClick: e
                                },
                                'Create',
                                c.a.createElement(y.a, {
                                  icon: 'arrow-down-mini'
                                })
                              );
                            }
                          ),
                          c.a.createElement(
                            'div',
                            { className: f },
                            c.a.createElement(
                              'div',
                              { className: 'create-dropdown--pen-wrap' },
                              c.a.createElement(
                                'a',
                                {
                                  href: '/pen/',
                                  className: 'new-button new-pen-button'
                                },
                                c.a.createElement(y.a, {
                                  icon: 'icon-new-pen'
                                }),
                                'Pen'
                              ),
                              i &&
                                !u.anon &&
                                c.a.createElement(
                                  'button',
                                  {
                                    className: 'new-pen-from-template-label',
                                    onClick: e.toggleTemplateDropdown
                                  },
                                  c.a.createElement(
                                    'span',
                                    null,
                                    'from template'
                                  ),
                                  c.a.createElement(y.a, {
                                    icon: 'arrow-down-mini'
                                  })
                                )
                            ),
                            i &&
                              !u.anon &&
                              c.a.createElement(E.a, {
                                isOpen: e.state.templateDropdownOpen,
                                userId: u.id,
                                teamId: u.currentTeamId
                              }),
                            c.a.createElement(v.a, { anon: l }),
                            c.a.createElement(_.a, { anon: l }),
                            c.a.createElement(O.a, { anon: l })
                          )
                        );
                      }
                    );
                  });
                }
              }
            ]),
            n
          );
        })(u.Component);
      n.a = R;
    },
    567: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(8),
        f = t.n(p),
        d = t(2),
        m = t.n(d),
        b = t(4),
        y = t(12),
        E = t(101),
        h = t(295),
        v = t(5),
        O = t(912),
        _ = t(74),
        w = t(92),
        T = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        g = i(
          [
            '\n  {\n    popups @client {\n      __typename\n      id\n      menu\n      drawer\n    }\n  }\n'
          ],
          [
            '\n  {\n    popups @client {\n      __typename\n      id\n      menu\n      drawer\n    }\n  }\n'
          ]
        ),
        P = i(
          [
            '\n  {\n    sessionUser {\n      id\n      currentContext {\n        baseUrl\n      }\n    }\n  }\n'
          ],
          [
            '\n  {\n    sessionUser {\n      id\n      currentContext {\n        baseUrl\n      }\n    }\n  }\n'
          ]
        ),
        S = i(
          [
            '\n  mutation YourLinksToggleDrawer($drawer: String) {\n    popupsToggleDrawer(drawer: $drawer) @client\n  }\n'
          ],
          [
            '\n  mutation YourLinksToggleDrawer($drawer: String) {\n    popupsToggleDrawer(drawer: $drawer) @client\n  }\n'
          ]
        ),
        j = i(
          [
            '\n  mutation YourLinksToggleMenu($menu: String) {\n    popupsToggleMenu(menu: $menu) @client\n  }\n'
          ],
          [
            '\n  mutation YourLinksToggleMenu($menu: String) {\n    popupsToggleMenu(menu: $menu) @client\n  }\n'
          ]
        ),
        C = m()(g),
        R = m()(P),
        A = m()(S),
        I = m()(j),
        L = (function(e) {
          function n() {
            r(this, n);
            var e = o(
              this,
              (n.__proto__ || Object.getPrototypeOf(n)).call(this)
            );
            return (
              (e.activityLink = c.a.createRef()),
              (e.pinLink = c.a.createRef()),
              e
            );
          }
          return (
            a(n, e),
            T(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return c.a.createElement(
                    b.a,
                    { query: C, renderBeforeDataReady: !0 },
                    function(n) {
                      var t = n.data,
                        r = t.popups.menu === _.e,
                        o = f()('your-links-menu', 'menu-dropdown', {
                          open: r
                        });
                      return c.a.createElement(
                        u.Fragment,
                        null,
                        c.a.createElement(
                          E.a,
                          {
                            menu: _.e,
                            isOpen: r,
                            className: 'menu-dropdown-parent'
                          },
                          c.a.createElement(
                            y.a,
                            { mutation: I, variables: { menu: _.e } },
                            function(e) {
                              return c.a.createElement(
                                'h4',
                                {
                                  className: 'main-menu-your',
                                  'aria-expanded': r,
                                  onClick: e,
                                  tabIndex: '0'
                                },
                                'Your',
                                c.a.createElement(v.a, {
                                  icon: 'arrow-down-mini'
                                })
                              );
                            }
                          ),
                          c.a.createElement(
                            'ul',
                            { className: o },
                            c.a.createElement(
                              'li',
                              { className: 'primary-explore-link' },
                              c.a.createElement(
                                y.a,
                                { mutation: A, variables: { drawer: w.a } },
                                function(n) {
                                  return c.a.createElement(
                                    'button',
                                    {
                                      className: 'drawer-button',
                                      onClick: n,
                                      ref: e.activityLink,
                                      'aria-haspopup': 'true',
                                      'aria-expanded': t.popups.drawer === w.a
                                    },
                                    'Activity'
                                  );
                                }
                              )
                            ),
                            c.a.createElement(
                              'li',
                              { className: 'primary-explore-link' },
                              c.a.createElement(
                                y.a,
                                { mutation: A, variables: { drawer: w.b } },
                                function(n) {
                                  return c.a.createElement(
                                    'button',
                                    {
                                      className: 'drawer-button',
                                      onClick: n,
                                      ref: e.pinLink,
                                      'aria-haspopup': 'true',
                                      'aria-expanded': t.popups.drawer === w.b
                                    },
                                    'Pins'
                                  );
                                }
                              )
                            ),
                            c.a.createElement(
                              'li',
                              { className: 'primary-explore-link' },
                              c.a.createElement(
                                'a',
                                { href: '/dashboard/' },
                                'Dashboard'
                              )
                            ),
                            c.a.createElement(
                              'li',
                              { className: 'primary-explore-link' },
                              c.a.createElement(
                                b.a,
                                {
                                  query: R,
                                  loadingIndicator: c.a.createElement(
                                    'a',
                                    { href: '#0' },
                                    'Profile'
                                  )
                                },
                                function(e) {
                                  var n = e.data;
                                  return c.a.createElement(
                                    'a',
                                    {
                                      href: n.sessionUser.currentContext.baseUrl
                                    },
                                    'Profile'
                                  );
                                }
                              )
                            )
                          )
                        ),
                        c.a.createElement(h.a, {
                          link: e.props.drawerLink
                            ? e.props.drawerLink.current
                            : e.pinLink.current
                        }),
                        c.a.createElement(O.a, { link: e.activityLink.current })
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      Object.defineProperty(L, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { drawerLink: s.a.object }
      }),
        (n.a = L);
    },
    568: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(8),
        s = t.n(l),
        p = t(2),
        f = t.n(p),
        d = t(4),
        m = t(12),
        b = t(101),
        y = t(5),
        E = t(74),
        h = t(914),
        v = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        O = i(
          [
            '\n  {\n    popups @client {\n      __typename\n      id\n      menu\n    }\n  }\n'
          ],
          [
            '\n  {\n    popups @client {\n      __typename\n      id\n      menu\n    }\n  }\n'
          ]
        ),
        _ = i(
          [
            '\n  mutation ExploreLinksToggleMenu($menu: String) {\n    popupsToggleMenu(menu: $menu) @client\n  }\n'
          ],
          [
            '\n  mutation ExploreLinksToggleMenu($menu: String) {\n    popupsToggleMenu(menu: $menu) @client\n  }\n'
          ]
        ),
        w = f()(O),
        T = f()(_),
        g = {
          exploreLinks: [
            { url: '/pens/', text: 'Pens' },
            { url: '/projects/', text: 'Projects' },
            { url: '/posts/', text: 'Posts' },
            { url: '/collections/', text: 'Collections' }
          ]
        },
        P = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            v(n, [
              {
                key: 'render',
                value: function() {
                  return c.a.createElement(
                    d.a,
                    { query: w, renderBeforeDataReady: !0 },
                    function(e) {
                      var n = e.data,
                        t = n.popups.menu === E.b,
                        r = s()('explore-links-menu', 'menu-dropdown', {
                          open: t
                        });
                      return c.a.createElement(
                        b.a,
                        {
                          menu: E.b,
                          isOpen: t,
                          className:
                            'menu-dropdown-parent menu-dropdown-parent-explore'
                        },
                        c.a.createElement(
                          m.a,
                          { mutation: T, variables: { menu: E.b } },
                          function(e) {
                            return c.a.createElement(
                              'h4',
                              {
                                className: 'main-menu-explore',
                                'aria-expanded': t,
                                onClick: e,
                                tabIndex: '0'
                              },
                              'Explore',
                              c.a.createElement(y.a, {
                                icon: 'arrow-down-mini'
                              })
                            );
                          }
                        ),
                        c.a.createElement(
                          'ul',
                          { className: r },
                          g.exploreLinks.map(function(e) {
                            return c.a.createElement(
                              'li',
                              { key: e.url, className: 'primary-explore-link' },
                              c.a.createElement('a', { href: e.url }, e.text)
                            );
                          }),
                          c.a.createElement(
                            'li',
                            null,
                            c.a.createElement('a', { href: '/spark/' }, 'Spark')
                          ),
                          c.a.createElement(
                            'li',
                            null,
                            c.a.createElement('a', { href: '/jobs/' }, 'Jobs')
                          ),
                          c.a.createElement(
                            'li',
                            null,
                            c.a.createElement(
                              'a',
                              { href: '/challenges/' },
                              'Challenges'
                            )
                          ),
                          c.a.createElement(
                            'li',
                            null,
                            c.a.createElement(
                              'a',
                              { href: 'https://blog.codepen.io' },
                              'Blog'
                            )
                          ),
                          c.a.createElement(h.a, null),
                          c.a.createElement(
                            'li',
                            null,
                            c.a.createElement(
                              'a',
                              {
                                href: 'https://blog.codepen.io/documentation/'
                              },
                              'Documentation'
                            )
                          ),
                          c.a.createElement(
                            'li',
                            null,
                            c.a.createElement(
                              'a',
                              { href: '/support/' },
                              'Support'
                            )
                          )
                        )
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      n.a = P;
    },
    569: function(e, n) {
      n.__esModule = !0;
      var t =
          ((n.ATTRIBUTE_NAMES = {
            BODY: 'bodyAttributes',
            HTML: 'htmlAttributes',
            TITLE: 'titleAttributes'
          }),
          (n.TAG_NAMES = {
            BASE: 'base',
            BODY: 'body',
            HEAD: 'head',
            HTML: 'html',
            LINK: 'link',
            META: 'meta',
            NOSCRIPT: 'noscript',
            SCRIPT: 'script',
            STYLE: 'style',
            TITLE: 'title'
          })),
        r =
          ((n.VALID_TAG_NAMES = Object.keys(t).map(function(e) {
            return t[e];
          })),
          (n.TAG_PROPERTIES = {
            CHARSET: 'charset',
            CSS_TEXT: 'cssText',
            HREF: 'href',
            HTTPEQUIV: 'http-equiv',
            INNER_HTML: 'innerHTML',
            ITEM_PROP: 'itemprop',
            NAME: 'name',
            PROPERTY: 'property',
            REL: 'rel',
            SRC: 'src'
          }),
          (n.REACT_TAG_MAP = {
            accesskey: 'accessKey',
            charset: 'charSet',
            class: 'className',
            contenteditable: 'contentEditable',
            contextmenu: 'contextMenu',
            'http-equiv': 'httpEquiv',
            itemprop: 'itemProp',
            tabindex: 'tabIndex'
          }));
      (n.HELMET_PROPS = {
        DEFAULT_TITLE: 'defaultTitle',
        DEFER: 'defer',
        ENCODE_SPECIAL_CHARACTERS: 'encodeSpecialCharacters',
        ON_CHANGE_CLIENT_STATE: 'onChangeClientState',
        TITLE_TEMPLATE: 'titleTemplate'
      }),
        (n.HTML_TAG_MAP = Object.keys(r).reduce(function(e, n) {
          return (e[r[n]] = n), e;
        }, {})),
        (n.SELF_CLOSING_TAGS = [t.NOSCRIPT, t.SCRIPT, t.STYLE]),
        (n.HELMET_ATTRIBUTE = 'data-react-helmet');
    },
    57: function(e, n, t) {
      'use strict';
      (function(e) {
        t.d(n, 'a', function() {
          return p;
        }),
          t.d(n, 'e', function() {
            return f;
          }),
          t.d(n, 'd', function() {
            return d;
          }),
          t.d(n, 'c', function() {
            return m;
          }),
          t.d(n, 'b', function() {
            return b;
          });
        var r = t(228),
          o = t.n(r),
          a = t(115),
          i = function() {},
          u = function(e) {
            return Object.keys(e)
              .map(function(n) {
                return encodeURIComponent(n) + '=' + encodeURIComponent(e[n]);
              })
              .join('&');
          },
          c = function() {
            return 'test' === e.env.ENV
              ? 'csrfToken'
              : document
                  .querySelector('meta[name="csrf-token"]')
                  .getAttribute('content');
          },
          l = function(e, n) {
            return e
              .set('X-CSRF-Token', c())
              .set('X-Requested-With', 'XMLHttpRequest')
              .accept('*/*')
              .send(n);
          },
          s = function(e) {
            var n = e.method,
              t = e.url,
              r = e.params,
              a = o.a[n](t);
            return 'get' === n ? a.query(r) : l(a, r);
          },
          p = function(n, t) {
            'test' === e.env.ENV && (t.url = 'https://codepen.test' + t.url);
            var r = t.dispatch,
              o = t.getState,
              u = t.method,
              c = t.url,
              l = t.customFailHandler || n.error(r, t),
              p = t.customFailHandler || n.serverError(r, t),
              f = t.customFailHandler || n.fail(r, t),
              d = t.customFailHandler || n.timeout(r, t),
              m = t.onSuccess || i,
              b = o().requests,
              y = u + '_' + c;
            return (
              !b[y] &&
              (r(Object(a.b)(y)),
              s(t)
                .timeout(12e5)
                .end(function(e, n) {
                  return (
                    r(Object(a.a)(y)),
                    e
                      ? e.timeout
                        ? d()
                        : e.status
                        ? 404 === e.status && t.custom404Handler
                          ? t.custom404Handler()
                          : p(e.response)
                        : l(e)
                      : 200 === n.status
                      ? m(n.body)
                      : f(n)
                  );
                }))
            );
          },
          f = function(n, t, r) {
            return (
              'test' === e.env.ENV && (n = 'https://codepen.test' + n),
              l(o.a.post(n), t).end(function(e, n) {
                r(e, n);
              })
            );
          },
          d = function(e) {
            o.a
              .post(e.url)
              .send(u(e.params))
              .accept('*/*')
              .end(function(n, t) {
                e.onSuccess(n, t);
              });
          },
          m = function(e) {
            o.a
              .get(e.url)
              .then(function(n) {
                e.onSuccess(n);
              })
              .catch(function(n) {
                e.onError && e.onError(n);
              });
          },
          b = function(e, n, t) {
            var r = new FormData();
            Object.keys(n).forEach(function(e) {
              r.append(e, n[e]);
            }),
              o.a
                .post(e)
                .send(r)
                .end(function(e, n) {
                  t(e, n);
                });
          };
      }.call(n, t(13)));
    },
    58: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = (t.n(i), t(1)),
        c = t.n(u),
        l = t(37),
        s = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        p = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            s(n, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.props.openModal({
                    variables: { type: l.a[this.props.type + '_ERROR'] }
                  });
                }
              },
              {
                key: 'render',
                value: function() {
                  return null;
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(p, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: {
          openModal: c.a.func.isRequired,
          type: c.a.oneOf(['QUERY', 'MUTATION']).isRequired
        }
      }),
        (n.a = p);
    },
    67: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return r;
      });
      var r = { PINS: 'PINS' };
    },
    68: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return b;
      });
      var r = t(223),
        o = t(245),
        a = t(246),
        i = t(247),
        u = t(72),
        c = t(248),
        l = t(84),
        s = void 0,
        p = new o.a({
          dataIdFromObject: function(e) {
            return e.id;
          }
        });
      window.__graphql && p.writeData(window.__graphql);
      var f = Object(i.a)(function(e) {
          var n = e.graphQLErrors,
            t = e.networkError;
          console.log(JSON.stringify(n, null, 4)),
            n &&
              n.map(function(e) {
                var n = e.message,
                  t = e.locations,
                  r = e.fields,
                  o = e.path;
                console.log(t),
                  console.log(
                    '[GraphQL error]: Message: ' +
                      n +
                      ', Location: ' +
                      t[0] +
                      ', Fields: ' +
                      r +
                      ', Path: ' +
                      o
                  );
              }),
            t && console.log('[Network error]: ' + t);
        }),
        d = Object(c.a)({ cache: p, defaults: l.a, resolvers: l.c }),
        m = new a.a({
          credentials: 'same-origin',
          headers: {
            'X-CSRF-TOKEN': (function() {
              return document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute('content');
            })(),
            'X-Requested-With': 'XMLHttpRequest'
          },
          uri: '/graphql',
          batchInterval: 20
        }),
        b = (function() {
          return (
            s ||
              ((s = new r.ApolloClient({
                link: u.a.from([f, d, m]),
                cache: p
              })),
              Object(l.b)(s),
              Object(l.d)(s)),
            s
          );
        })();
    },
    7: function(e, n, t) {
      'use strict';
      var r = {
        ADD_NEW_FILE: 'ADD_NEW_FILE',
        ADD_NEW_FILES_AND_FOLDERS: 'ADD_NEW_FILES_AND_FOLDERS',
        DUPLICATE_FILE: 'DUPLICATE_FILE',
        UPDATE_NEWEST_FILE: 'UPDATE_NEWEST_FILE',
        UPDATE_FILE_NAME: 'UPDATE_FILE_NAME',
        UPDATE_FILE_CONTENT: 'UPDATE_FILE_CONTENT',
        RESET_FILE_CONTENT: 'RESET_FILE_CONTENT',
        UPDATE_FILE_ERRORS: 'UPDATE_FILE_ERRORS',
        UPDATE_MEDIA_FILES: 'UPDATE_MEDIA_FILES',
        FLUSH_FILES_CONTENT: 'FLUSH_FILES_CONTENT',
        ADD_FILE_ERROR: 'ADD_FILE_ERROR',
        BABEL_ENTRY_FILE_ERROR: 'BABEL_ENTRY_FILE_ERROR',
        CLEAR_FILE_ERRORS: 'CLEAR_FILE_ERRORS',
        SET_FILE_CONTENT_TO_LOADING: 'SET_FILE_CONTENT_TO_LOADING',
        SET_FILE_CONTENT_LOAD_ERROR: 'SET_FILE_CONTENT_LOAD_ERROR',
        UPDATE_DRAGGED_FILE_LOCATION: 'UPDATE_DRAGGED_FILE_LOCATION',
        RECEIVE_FILES_SAVE_SUCCESS: 'RECEIVE_FILES_SAVE_SUCCESS',
        FILE_FINISHED_COMPILING: 'FILE_FINISHED_COMPILING',
        FILE_FINISHED_PROCESSING: 'FILE_FINISHED_PROCESSING',
        FILE_STARTED_PROCESSING: 'FILE_STARTED_PROCESSING',
        RELOAD_OPEN_PROCESSED_FILES: 'RELOAD_OPEN_PROCESSED_FILES',
        DELETE_FILE: 'DELETE_FILE',
        DELETE_FILES: 'DELETE_FILES',
        CREATE_NEW_FILE: 'CREATE_NEW_FILE',
        UPDATE_NEW_FILE_NAME: 'UPDATE_NEW_FILE_NAME',
        CANCEL_NEW_FILE_NAME: 'CANCEL_NEW_FILE_NAME',
        FINISHED_CREATING_NEW_FILE: 'FINISHED_CREATING_NEW_FILE',
        ADD_OPEN_FILE: 'ADD_OPEN_FILE',
        SET_OPEN_FILES: 'SET_OPEN_FILES',
        UPDATE_FILE_DRAGGING_STATE: 'UPDATE_FILE_DRAGGING_STATE',
        UPDATE_FILE_DRAGGING_OVER_STATE: 'UPDATE_FILE_DRAGGING_OVER_STATE',
        MANUAL_FILE_UPLOAD: 'MANUAL_FILE_UPLOAD',
        TOGGLE_FOLDER_OPEN_STATE: 'TOGGLE_FOLDER_OPEN_STATE',
        SET_EDITING: 'SET_EDITING',
        SET_EDITING_WITH_FILE_NAME: 'SET_EDITING_WITH_FILE_NAME',
        SET_RENAMING_FILE: 'SET_RENAMING_FILE',
        SET_SIDEBAR_SELECTED: 'SET_SIDEBAR_SELECTED',
        SET_PROJECT_TITLE_EDITING_STATE: 'SET_PROJECT_TITLE_EDITING_STATE',
        SET_LAYOUT_STATE: 'SET_LAYOUT_STATE',
        SET_RENDERING_FILE: 'SET_RENDERING_FILE',
        TRIGGER_RENDER: 'TRIGGER_RENDER',
        SET_CANCELLED_RENDER: 'SET_CANCELLED_RENDER',
        ADD_GULP_LOG: 'ADD_GULP_LOG',
        SET_GULP_CONSOLE_OPEN_STATE: 'SET_GULP_CONSOLE_OPEN_STATE',
        CLEAR_GULP_CONSOLE: 'CLEAR_GULP_CONSOLE',
        UPDATE_PROCESSING_QUEUE: 'UPDATE_PROCESSING_QUEUE',
        UPDATE_PROCESSING_SAVE_STATUS: 'UPDATE_PROCESSING_SAVE_STATUS',
        CLEAR_ALL_PROCESSING_INDICATORS: 'CLEAR_ALL_PROCESSING_INDICATORS',
        UPDATE_RESOURCE_SEARCH_TYPE: 'UPDATE_RESOURCE_SEARCH_TYPE',
        UPDATE_RESOURCE_SEARCH_TERM: 'UPDATE_RESOURCE_SEARCH_TERM',
        UPDATE_RESURCE_SEARCH_RESULTS: 'UPDATE_RESOURCE_SEARCH_RESULTS',
        TOGGLE_EXTERNAL_RESOURCES: 'TOGGLE_EXTERNAL_RESOURCES',
        TOGGLE_DIALOG: 'TOGGLE_DIALOG',
        CLOSE_THIS_DIALOG: 'CLOSE_THIS_DIALOG',
        CLOSE_ALL_POPUPS: 'CLOSE_ALL_POPUPS',
        SET_PROJECT_DELETE_DIALOG_INPUT: 'SET_PROJECT_DELETE_DIALOG_INPUT',
        OPEN_MODAL: 'OPEN_MODAL',
        CLOSE_ALL_MODALS: 'CLOSE_ALL_MODALS',
        ADD_MESSAGE: 'ADD_MESSAGE',
        CLEAR_MESSAGES: 'CLEAR_MESSAGES',
        RECIEVE_PROJECT_UI_STATE_SAVE_SUCCESS:
          'RECIEVE_PROJECT_UI_STATE_SAVE_SUCCESS',
        DEPLOYMENT_IN_PROGRESS: 'DEPLOYMENT_IN_PROGRESS',
        FAILED_TO_DEPLOY: 'FAILED_TO_DEPLOY',
        UPDATE_CNAME_STATUS: 'UPDATE_CNAME_STATUS',
        OPEN_CONTEXT_MENU: 'OPEN_CONTEXT_MENU',
        CLOSE_CONTEXT_MENU: 'CLOSE_CONTEXT_MENU',
        UPDATE_EXPORT_STATUS: 'UPDATE_EXPORT_STATUS',
        RECEIVE_PROJECT_SAVE_SUCCESS: 'RECEIVE_PROJECT_SAVE_SUCCESS',
        RECEIVE_PROJECT_SAVE_FAILURE: 'RECEIVE_PROJECT_SAVE_FAILURE',
        RECEIVE_UPLOADS_SAVE_SUCCESS: 'RECEIVE_UPLOADS_SAVE_SUCCESS',
        ROLLBACK_STATE: 'ROLLBACK_STATE',
        ROLLBACK_UPLOAD_STATE: 'ROLLBACK_UPLOAD_STATE',
        RECEIVE_PROJECT_DELETE_SUCCESS: 'RECEIVE_PROJECT_DELETE_SUCCESS',
        RECEIVE_PROJECT_DELETE_FAILURE: 'RECEIVE_PROJECT_DELETE_FAILURE',
        RECIEVE_SMS_SUCCESS: 'RECIEVE_SMS_SUCCESS',
        RECIEVE_SMS_FAILURE: 'RECIEVE_SMS_FAILURE',
        UPDATE_PROJECT: 'UPDATE_PROJECT',
        UPDATE_PROJECT_EDITOR_SETTINGS: 'UPDATE_PROJECT_EDITOR_SETTINGS',
        UPDATE_PROJECT_USER: 'UPDATE_PROJECT_USER',
        UPDATE_PROCESSED_PROJECT: 'UPDATE_PROCESSED_PROJECT',
        UPDATE_USER_TEAM: 'UPDATE_USER_TEAM',
        UPDATE_READONLY: 'UPDATE_READONLY',
        UPDATE_OTHER_EDITORS_OPEN: 'UPDATE_OTHER_EDITORS_OPEN',
        RECIEVE_UPDATE_USER_TEAM_FAILURE: 'RECIEVE_UPDATE_USER_TEAM_FAILURE',
        RECEIVE_BOILERPLATES_SUCCESS: 'RECEIVE_BOILERPLATES_SUCCESS',
        RECEIVE_BOILERPLATES_FAILURE: 'RECEIVE_BOILERPLATES_FAILURE',
        RECEIVE_CLONE_SUCCESS: 'RECEIVE_CLONE_SUCCESS',
        RECEIVE_CLONE_FAILURE: 'RECEIVE_CLONE_FAILURE',
        UPDATE_FILE_SAVE_QUEUE: 'UPDATE_FILE_SAVE_QUEUE',
        UPDATE_PROJECT_UPLOADS_QUEUE: 'UPDATE_PROJECT_UPLOADS_QUEUE',
        UPDATE_PROJECT_DEPLOY_STATUS: 'UPDATE_PROJECT_DEPLOY_STATUS',
        UPDATE_SCREENSHOT_STATUS: 'UPDATE_SCREENSHOT_STATUS',
        UPDATE_PROJECT_UPLOADS_STATE: 'UPDATE_PROJECT_UPLOADS_STATE',
        UPLOADS_PROCESS_COMPLETE: 'UPLOADS_PROCESS_COMPLETE',
        RECEIVE_GLOBAL_ASSETS_SUCCESS: 'RECEIVE_GLOBAL_ASSETS_SUCCESS',
        RECEIVE_GLOBAL_ASSETS_FAILURE: 'RECEIVE_GLOBAL_ASSETS_FAILURE',
        UPDATE_ASSET_SEARCH: 'UPDATE_ASSET_SEARCH',
        ADD_ASSET_TO_UPLOAD_QUEUE: 'ADD_ASSET_TO_UPLOAD_QUEUE',
        REMOVE_ASSET_FROM_UPLOAD_QUEUE: 'REMOVE_ASSET_FROM_UPLOAD_QUEUE',
        RECEIVE_GLOBAL_ASSET_UPLOAD_SUCCESS:
          'RECEIVE_GLOBAL_ASSET_UPLOAD_SUCCESS',
        RECEIVE_GLOBAL_ASSET_UPLOAD_FAILURE:
          'RECEIVE_GLOBAL_ASSET_UPLOAD_FAILURE',
        RECEIVE_GLOBAL_ASSET_DELETE_FAILURE:
          'RECEIVE_GLOBAL_ASSET_DELETE_FAILURE',
        ADD_GLOBAL_ASSET_DATA_TO_LIST: 'ADD_GLOBAL_ASSET_DATA_TO_LIST',
        REMOVE_GLOBAL_ASSET_DATA_FROM_LIST:
          'REMOVE_GLOBAL_ASSET_DATA_FROM_LIST',
        UPDATE_ASSET_AFTER_SUCCESSFUL_UPLOAD:
          'UPDATE_ASSET_AFTER_SUCCESSFUL_UPLOAD',
        RECEIVED_PHOTOS: 'RECEIVED_PHOTOS',
        UPDATE_FILE_SEARCH: 'UPDATE_FILE_SEARCH',
        SET_FILE_SEARCH: 'SET_FILE_SEARCH',
        UPDATE_FILES_ACTIVE_FILE: 'UPDATE_FILES_ACTIVE_FILE',
        SET_SPINNING_STATE: 'SET_SPINNING_STATE',
        SEND_REQUEST: 'SEND_REQUEST',
        RECEIVE_REQUEST: 'RECEIVE_REQUEST',
        USER_HAS_LOGGED_OUT: 'USER_HAS_LOGGED_OUT'
      };
      n.a = r;
    },
    74: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return r;
      }),
        t.d(n, 'e', function() {
          return o;
        }),
        t.d(n, 'b', function() {
          return a;
        }),
        t.d(n, 'c', function() {
          return i;
        }),
        t.d(n, 'd', function() {
          return u;
        });
      var r = 'CREATE_MENU',
        o = 'YOUR_LINKS_MENU',
        a = 'EXPLORE_MENU',
        i = 'USER_MENU',
        u = 'VIEW_SWITCHER';
    },
    75: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return r;
      }),
        t.d(n, 'b', function() {
          return o;
        }),
        t.d(n, 'c', function() {
          return a;
        });
      var r = 'CREATE_COLLECTION',
        o = 'SEARCH_FORM',
        a = 'UPGRADE_UPSELL';
    },
    84: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return p;
      }),
        t.d(n, 'c', function() {
          return f;
        }),
        t.d(n, 'b', function() {
          return d;
        }),
        t.d(n, 'd', function() {
          return m;
        });
      var r = t(85),
        o = t(86),
        a = t(87),
        i = t(88),
        u = t(89),
        c = t(90),
        l = [r.a, o.a, c.a, a.a, i.a, u.a],
        s = function(e, n) {
          var t = [{}].concat(
            n.map(function(n) {
              return n[e];
            })
          );
          return Object.assign.apply(null, t);
        },
        p = s('defaults', l),
        f = { Query: s('queries', l), Mutation: s('mutations', l) },
        d = function(e) {
          r.a.initializeFirestore(e), i.a.initializeFirestore(e);
        },
        m = function(e) {
          c.a.subscribeToItemEvents(e);
        };
    },
    85: function(e, n, t) {
      'use strict';
      var r = t(43),
        o = t(28),
        a = t(67),
        i = void 0,
        u = Object(o.c)(),
        c = window.__user,
        l = { featureNotifications: [] },
        s = {},
        p = {
          featureNotificationsHidePinsNotification: function() {
            return r.a(c, a.a.PINS), null;
          }
        },
        f = (function(e, n, t) {
          return (
            n in e
              ? Object.defineProperty(e, n, {
                  value: t,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
                })
              : (e[n] = t),
            e
          );
        })({}, a.a.PINS, {
          value: a.a.PINS,
          showUntil: Object(o.a)(2018, 12, 1)
        }),
        d = function(e) {
          var n = [];
          return (
            Object.keys(f).forEach(function(t) {
              var r = f[t];
              e.includes(r.value) || (u < r.showUntil && n.push(r.value));
            }),
            n
          );
        },
        m = function(e) {
          c &&
            !c.anon &&
            ((i = e),
            r.g(c, function(e) {
              var n = { featureNotifications: d(e.featureNotifications) };
              i.writeData({ data: n });
            }));
        };
      n.a = { defaults: l, queries: s, mutations: p, initializeFirestore: m };
    },
    86: function(e, n, t) {
      'use strict';
      var r = { item: null },
        o = {},
        a = {
          itemSavePen: function() {
            return (
              setTimeout(function() {
                CP.pen.save();
              }, 1),
              null
            );
          }
        };
      n.a = { defaults: r, queries: o, mutations: a };
    },
    87: function(e, n, t) {
      'use strict';
      var r = t(47),
        o = t(17),
        a =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        i = {
          organize: {
            __typename: o.a.ORGANIZE,
            viewTypeControl: r.c.PUBLIC,
            sortByControl: r.a.ID,
            sortOrderControl: r.b.DESC,
            searchTermControl: ''
          }
        },
        u = {},
        c = {
          organizeUpdateControls: function(e, n, t) {
            var r = n.controls,
              i = t.cache,
              u = { organize: a({ __typename: o.a.ORGANIZE }, r) };
            return i.writeData({ data: u }), null;
          }
        };
      n.a = { defaults: i, queries: u, mutations: c };
    },
    88: function(e, n, t) {
      'use strict';
      var r = t(43),
        o = t(17),
        a = t(28),
        i =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        u = void 0,
        c = window.__user,
        l = { pins: [] },
        s = {},
        p = {
          pinsAddPin: function(e, n) {
            var t = n.id,
              i = n.itemType,
              u = n.title;
            return (
              r.b(c, {
                __typename: o.a.PIN,
                id: t,
                itemType: i,
                title: u,
                updatedAt: Object(a.c)()
              }),
              { id: t, __typename: o.a.PIN }
            );
          },
          pinsRemovePin: function(e, n) {
            var t = n.id;
            return r.d(c, t), { id: t, __typename: o.a.PIN };
          }
        },
        f = function(e) {
          return 'pen' === e.itemType
            ? '/you/pen/' + e.id
            : 'post' === e.itemType
            ? '/you/post/' + e.id
            : 'project' === e.itemType
            ? '/you/project/editor/' + e.id
            : 'collection' === e.itemType
            ? '/collection/' + e.id
            : '/you/pen/' + e.id;
        },
        d = function(e) {
          c &&
            !c.anon &&
            ((u = e),
            r.f(c, function(e) {
              var n = e.map(function(e) {
                  return i({}, e, { __typename: o.a.PIN, url: f(e) });
                }),
                t = { pins: n };
              u.writeData({ data: t });
            }));
        };
      n.a = { defaults: l, queries: s, mutations: p, initializeFirestore: d };
    },
    89: function(e, n, t) {
      'use strict';
      function r(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var o = t(17),
        a = t(2),
        i = t.n(a),
        u =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        c = r(
          [
            '\n        {\n          popups @client {\n            id\n            drawer\n          }\n        }\n      '
          ],
          [
            '\n        {\n          popups @client {\n            id\n            drawer\n          }\n        }\n      '
          ]
        ),
        l = r(
          [
            '\n        {\n          popups @client {\n            id\n            menu\n          }\n        }\n      '
          ],
          [
            '\n        {\n          popups @client {\n            id\n            menu\n          }\n        }\n      '
          ]
        ),
        s = 'popups',
        p = { __typename: o.a.POPUPS, id: s },
        f = {
          popups: {
            __typename: o.a.POPUPS,
            id: s,
            message: null,
            modal: null,
            menu: null,
            drawer: null,
            dialog: null
          }
        },
        d = {},
        m = {
          popupsOpenModal: function(e, n, t) {
            var r = t.cache,
              o = n.props
                ? Object.keys(n.props).map(function(e) {
                    return {
                      __typename: 'ModalProp',
                      name: e,
                      value: n.props[e]
                    };
                  })
                : null,
              a = {
                popups: u({}, p, {
                  modal: {
                    id: 'modal',
                    __typename: 'Modal',
                    type: n.type,
                    props: o,
                    dismissable: !(!1 === n.dismissable)
                  }
                })
              };
            return r.writeData({ data: a }), null;
          },
          popupsCloseModalAndDialog: function(e, n, t) {
            var r = t.cache,
              o = { popups: u({}, p, { modal: null, dialog: null }) };
            return r.writeData({ data: o }), null;
          },
          popupsOpenDialog: function(e, n, t) {
            var r = t.cache,
              o = { popups: u({}, p, { dialog: n.type }) };
            return r.writeData({ data: o }), null;
          },
          popupsCloseDialog: function(e, n, t) {
            var r = t.cache,
              o = { popups: u({}, p, { dialog: null }) };
            return r.writeData({ data: o }), null;
          },
          popupsAddMessage: function(e, n, t) {
            var r = t.cache,
              o = { popups: u({}, p, { message: n.message }) };
            return r.writeData({ data: o }), null;
          },
          popupsClearMessage: function(e, n, t) {
            var r = t.cache,
              o = { popups: u({}, p, { message: null }) };
            return r.writeData({ data: o }), null;
          },
          popupsOpenDrawer: function(e, n, t) {
            var r = n.drawer;
            return (
              t.cache.writeData({
                data: { popups: { __typename: o.a.POPUPS, id: s, drawer: r } }
              }),
              null
            );
          },
          popupsCloseDrawer: function(e, n, t) {
            return (
              t.cache.writeData({
                data: {
                  popups: { __typename: o.a.POPUPS, id: s, drawer: null }
                }
              }),
              null
            );
          },
          popupsToggleDrawer: function(e, n, t) {
            var r = n.drawer,
              a = t.cache,
              u = a.readQuery({ query: i()(c) }),
              l = u.popups.drawer === r;
            return (
              a.writeData({
                data: {
                  popups: {
                    __typename: o.a.POPUPS,
                    id: s,
                    drawer: l ? null : r
                  }
                }
              }),
              null
            );
          },
          popupsCloseMenu: function(e, n, t) {
            return (
              t.cache.writeData({
                data: { popups: { __typename: o.a.POPUPS, id: s, menu: null } }
              }),
              null
            );
          },
          popupsToggleMenu: function(e, n, t) {
            var r = n.menu,
              a = t.cache,
              u = a.readQuery({ query: i()(l) }),
              c = u.popups.menu === r;
            return (
              a.writeData({
                data: {
                  popups: { __typename: o.a.POPUPS, id: s, menu: c ? null : r }
                }
              }),
              null
            );
          }
        };
      n.a = { defaults: f, queries: d, mutations: m };
    },
    90: function(e, n, t) {
      'use strict';
      function r(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var o = t(17),
        a = t(2),
        i = t.n(a),
        u = t(48),
        c = t(15),
        l =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        s = r(
          [
            '\n      query Item {\n        item {\n          id\n        }\n      }\n    '
          ],
          [
            '\n      query Item {\n        item {\n          id\n        }\n      }\n    '
          ]
        ),
        p = r(
          [
            '\n      fragment privacy on Pen {\n        private\n        __typename\n      }\n    '
          ],
          [
            '\n      fragment privacy on Pen {\n        private\n        __typename\n      }\n    '
          ]
        ),
        f = {
          itemLocalState: { __typename: o.a.ITEM_LOCAL_STATE, title: null }
        },
        d = {},
        m = {
          itemLocalStateUpdateState: function(e, n) {
            var t = n.state,
              r = n.itemType;
            return (
              r === c.a.PEN &&
                CP.item.setItemValue({ origin: 'client', item: t }),
              r === c.a.PROJECT &&
                window.projectStore.dispatch({
                  type: 'UPDATE_PROJECT',
                  payload: { newSettings: t }
                }),
              null
            );
          }
        },
        b = function(e) {
          y(e), E(e);
        },
        y = function(e) {
          window.Hub &&
            (Hub.sub('pen-change', function(n, t) {
              return h(t, e);
            }),
            Hub.sub('pen-saved', function(n, t) {
              return O(t, e);
            }));
        },
        E = function(e) {
          window.Hub &&
            Hub.sub('project-change', function(n, t) {
              return h(t, e);
            });
        },
        h = function(e, n) {
          var t = v(e);
          0 !== Object.keys(t).length &&
            n.writeData({
              data: {
                itemLocalState: l({ __typename: o.a.ITEM_LOCAL_STATE }, t)
              }
            });
        },
        v = function(e) {
          return e.item
            ? Object.keys(f.itemLocalState).reduce(function(n, t) {
                return void 0 !== e.item[t] && (n[t] = e.item[t]), n;
              }, {})
            : {};
        },
        O = function(e, n) {
          var t = n.readQuery({ query: i()(s) }),
            r = t.item,
            o = n.readFragment({ id: r.id, fragment: i()(p) });
          if (e.pen && e.pen.private && e.pen.private.current !== o.private) {
            var a =
                !0 === e.pen.private.current
                  ? CP.item.slug_hash_private
                  : CP.item.slug_hash,
              c = window.location.pathname,
              l = c.replace(r.id, a);
            Object(u.c)(l);
          }
        };
      n.a = { defaults: f, queries: d, mutations: m, subscribeToItemEvents: b };
    },
    904: function(e, n, t) {
      t(120),
        t(126),
        t(130),
        t(131),
        t(132),
        t(133),
        t(134),
        t(135),
        t(136),
        t(137),
        t(138),
        t(140),
        t(141),
        t(142),
        t(143),
        t(144),
        t(145),
        t(146),
        t(147),
        t(148),
        t(149),
        t(150),
        t(151),
        t(152),
        t(153),
        t(154),
        t(155),
        t(156),
        t(157),
        t(158),
        t(159),
        t(160),
        t(161),
        t(162),
        t(163),
        t(164),
        t(165),
        t(166),
        t(167),
        t(168),
        t(169),
        t(170),
        t(171),
        t(172),
        t(173),
        t(174),
        t(175),
        t(176),
        t(177),
        t(178),
        t(179),
        t(180),
        t(181),
        t(182),
        t(183),
        t(184),
        t(185),
        t(186),
        t(187),
        t(188),
        t(94),
        t(189),
        t(190),
        t(191),
        t(192),
        t(193),
        t(194),
        t(195),
        t(196),
        t(197),
        t(198),
        t(199),
        t(200),
        t(201),
        t(202),
        t(203),
        t(204),
        t(205),
        t(206),
        t(207),
        t(208),
        t(209),
        t(210),
        t(211),
        t(212),
        t(213),
        t(214),
        t(215),
        t(216),
        t(217),
        t(218),
        t(219),
        t(220),
        t(221),
        t(222),
        t(905);
    },
    905: function(e, n, t) {
      'use strict';
      Object.defineProperty(n, '__esModule', { value: !0 });
      var r = t(0),
        o = t.n(r),
        a = t(31),
        i = (t.n(a), t(906)),
        u = t(929),
        c = t(408),
        l = t(931),
        s = t(944),
        p = t(68),
        f = (t(948), t(255)),
        d =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          };
      Object(f.a)();
      var m = document.getElementById('main-header');
      m && Object(a.render)(o.a.createElement(i.a, { client: p.a }), m);
      var b = document.getElementById('main-sidebar');
      b && Object(a.render)(o.a.createElement(u.a, { client: p.a }), b);
      var y = document.getElementById('react-popups');
      y && Object(a.render)(o.a.createElement(c.a, { client: p.a }), y);
      var E = document.getElementById('react-home-promo');
      E &&
        t
          .e(2)
          .then(t.bind(null, 1281))
          .then(function(e) {
            var n = e.default;
            Object(a.render)(o.a.createElement(n, { client: p.a }), E);
          });
      var h = document.getElementById('react-pen-footer');
      h && Object(a.render)(o.a.createElement(l.a, { client: p.a }), h);
      var v = document.getElementById('react-instagram');
      v &&
        t
          .e(3)
          .then(t.bind(null, 1282))
          .then(function(e) {
            var n = e.default;
            Object(a.render)(o.a.createElement(n, { client: p.a }), v);
          });
      var O = document.getElementById('react-follow-user');
      O &&
        Object(a.render)(
          o.a.createElement(s.a, d({ client: p.a }, O.dataset)),
          O
        );
    },
    906: function(e, n, t) {
      'use strict';
      (function(e) {
        var r = t(0),
          o = t.n(r),
          a = t(1),
          i = t.n(a),
          u = t(59),
          c = (t.n(u), t(21)),
          l = (t.n(c), t(48)),
          s = t(907),
          p = t(915),
          f = t(927),
          d = t(406),
          m = t(928),
          b = t(15),
          y = function(e) {
            var n = e.client;
            return o.a.createElement(
              c.ApolloProvider,
              { client: n },
              o.a.createElement(d.a, null),
              o.a.createElement(m.a, null),
              window.__404
                ? o.a.createElement(
                    l.b,
                    { className: 'header-router-wrap' },
                    o.a.createElement(s.a, { default: !0 })
                  )
                : o.a.createElement(
                    l.b,
                    { className: 'header-router-wrap' },
                    o.a.createElement(s.a, { default: !0 }),
                    o.a.createElement(p.a, {
                      path: 'pen',
                      currentView: b.b.PEN
                    }),
                    o.a.createElement(p.a, {
                      path: 'pen/tour/welcome/start',
                      currentView: b.b.PEN
                    }),
                    o.a.createElement(p.a, {
                      path: ':username/pen/:id',
                      currentView: b.b.PEN
                    }),
                    o.a.createElement(p.a, {
                      path: 'team/:teamname/pen/:id',
                      currentView: b.b.PEN
                    }),
                    o.a.createElement(p.a, {
                      path: ':username/details/:id',
                      currentView: b.b.DETAILS
                    }),
                    o.a.createElement(p.a, {
                      path: 'team/:teamname/details/:id',
                      currentView: b.b.DETAILS
                    }),
                    o.a.createElement(p.a, {
                      path: ':username/full/:id',
                      currentView: b.b.FULL
                    }),
                    o.a.createElement(p.a, {
                      path: 'team/:teamname/full/:id',
                      currentView: b.b.FULL
                    }),
                    o.a.createElement(p.a, {
                      path: ':username/collab/:id',
                      currentView: b.b.COLLAB
                    }),
                    o.a.createElement(p.a, {
                      path: 'team/:teamname/collab/:id',
                      currentView: b.b.COLLAB
                    }),
                    o.a.createElement(p.a, {
                      path: ':username/professor/:id',
                      currentView: b.b.PROFESSOR
                    }),
                    o.a.createElement(p.a, {
                      path: 'team/:teamname/professor/:id',
                      currentView: b.b.PROFESSOR
                    }),
                    o.a.createElement(f.a, {
                      path: ':username/project/:currentView/:id'
                    }),
                    o.a.createElement(f.a, {
                      path: 'team/:teamname/project/:currentView/:id'
                    })
                  )
            );
          };
        (y.propTypes = { client: i.a.object }), (n.a = Object(u.hot)(e)(y));
      }.call(n, t(76)(e)));
    },
    907: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(2),
        l = t.n(c),
        s = t(4),
        p = t(231),
        f = t(566),
        d = t(567),
        m = t(568),
        b = t(393),
        y = t(262),
        E = t(232),
        h = t(116),
        v = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        O = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query sessionUser {\n    sessionUser {\n      anon\n      id\n      currentContext {\n        baseUrl\n      }\n    }\n  }\n'
          ],
          [
            '\n  query sessionUser {\n    sessionUser {\n      anon\n      id\n      currentContext {\n        baseUrl\n      }\n    }\n  }\n'
          ]
        ),
        _ = l()(O),
        w = (function(e) {
          function n() {
            r(this, n);
            var e = o(
              this,
              (n.__proto__ || Object.getPrototypeOf(n)).call(this)
            );
            return (e.state = { pinButton: null }), e;
          }
          return (
            a(n, e),
            v(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(
                    s.a,
                    { query: _, renderWhenDataReady: !0 },
                    function(n) {
                      var t = n.loading,
                        r = n.data;
                      if (t) return null;
                      var o = r.sessionUser;
                      return u.a.createElement(
                        i.Fragment,
                        null,
                        u.a.createElement(p.a, null),
                        u.a.createElement(
                          'div',
                          { className: 'navigation-wrap' },
                          u.a.createElement(f.a, null),
                          !o.anon &&
                            e.state.pinButton &&
                            u.a.createElement(d.a, {
                              drawerLink: e.state.pinButton
                            }),
                          u.a.createElement(m.a, null),
                          u.a.createElement(
                            'div',
                            { className: 'navigation-bottom-wrap' },
                            !o.anon &&
                              u.a.createElement(y.a, {
                                onRef: function(n) {
                                  (e.child = n), e.setState({ pinButton: n });
                                }
                              }),
                            u.a.createElement(b.a, null),
                            o.anon
                              ? u.a.createElement(h.a, null)
                              : u.a.createElement(E.a, null)
                          )
                        )
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(u.a.Component);
      n.a = w;
    },
    908: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(8),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(4),
        d = t(1),
        m = t.n(d),
        b = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        y = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query Pens($teamId: ID, $userId: ID) {\n    pens(\n      first: 50\n      sortBy: ID\n      template: true\n      privacy: ALL\n      teamId: $teamId\n      userId: $userId\n    ) {\n      edges {\n        node {\n          id\n          title\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n'
          ],
          [
            '\n  query Pens($teamId: ID, $userId: ID) {\n    pens(\n      first: 50\n      sortBy: ID\n      template: true\n      privacy: ALL\n      teamId: $teamId\n      userId: $userId\n    ) {\n      edges {\n        node {\n          id\n          title\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n'
          ]
        ),
        E = p()(y),
        h = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            b(n, [
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    n = e.teamId,
                    t = e.userId,
                    r = l()({
                      'pen-templates-list': !0,
                      'link-list': !0,
                      open: this.props.isOpen
                    });
                  return u.a.createElement(
                    f.a,
                    {
                      query: E,
                      renderWhenDataReady: !0,
                      variables: { teamId: n, userId: t }
                    },
                    function(e) {
                      var n = e.data,
                        t = n.pens.edges;
                      return u.a.createElement(
                        i.Fragment,
                        null,
                        u.a.createElement(
                          'div',
                          { className: r },
                          u.a.createElement(
                            'ul',
                            null,
                            0 === t.length
                              ? u.a.createElement(
                                  'li',
                                  null,
                                  u.a.createElement(
                                    'a',
                                    { href: '/pen/' },
                                    'You have no templates yet.',
                                    ' ',
                                    u.a.createElement(
                                      'span',
                                      { className: 'link-highlight' },
                                      "Let's go make one!"
                                    )
                                  )
                                )
                              : t.map(function(e) {
                                  return u.a.createElement(
                                    'li',
                                    { key: e.node.id },
                                    u.a.createElement(
                                      'a',
                                      { href: '/pen?template=' + e.node.id },
                                      e.node.title || e.node.id
                                    )
                                  );
                                })
                          )
                        )
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      (h.propTypes = {
        teamId: m.a.string,
        userId: m.a.string.isRequired,
        isOpen: m.a.bool.isRequired
      }),
        (n.a = h);
    },
    909: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(5),
        f = t(37),
        d = t(2),
        m = t.n(d),
        b = t(4),
        y = t(12),
        E = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        h = i(
          [
            '\n  {\n    sessionUser {\n      id\n      projectLimitations {\n        projects\n        usedProjects\n      }\n    }\n  }\n'
          ],
          [
            '\n  {\n    sessionUser {\n      id\n      projectLimitations {\n        projects\n        usedProjects\n      }\n    }\n  }\n'
          ]
        ),
        v = i(
          [
            '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
          ],
          [
            '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
          ]
        ),
        O = m()(h),
        _ = m()(v),
        w = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            E(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return c.a.createElement(
                    b.a,
                    { query: O, renderBeforeDataReady: !0 },
                    function(n) {
                      var t = n.data,
                        r = n.loading,
                        o = n.error;
                      return c.a.createElement(y.a, { mutation: _ }, function(
                        n
                      ) {
                        if (e.props.anon)
                          return c.a.createElement(
                            'a',
                            {
                              href: '/project/',
                              className: 'new-button new-project-button',
                              onClick: function(e) {
                                e.preventDefault(),
                                  n({
                                    variables: {
                                      type: f.a.LOG_IN_TO_CREATE_PROJECTS
                                    }
                                  });
                              }
                            },
                            c.a.createElement(p.a, {
                              icon: 'icon-new-project'
                            }),
                            'Project'
                          );
                        var a = c.a.createElement(
                          'a',
                          {
                            href: '/project/',
                            className: 'new-button new-project-button'
                          },
                          c.a.createElement(p.a, { icon: 'icon-new-project' }),
                          'Project'
                        );
                        if (r || o) return a;
                        var i = t.sessionUser,
                          u = i.projects,
                          l = i.usedProjects,
                          s = u - l <= 0;
                        return s
                          ? c.a.createElement(
                              'a',
                              {
                                href: '/project/',
                                className: 'new-button new-project-button',
                                onClick: function(e) {
                                  s &&
                                    (e.preventDefault(),
                                    n({
                                      variables: {
                                        type: f.a.PROJECT_LIMIT,
                                        props: { projects: u, usedProjects: l }
                                      }
                                    }));
                                }
                              },
                              c.a.createElement(p.a, {
                                icon: 'icon-new-project'
                              }),
                              'Project'
                            )
                          : a;
                      });
                    }
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      Object.defineProperty(w, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { anon: s.a.bool }
      }),
        (n.a = w);
    },
    910: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(2),
        f = t.n(p),
        d = t(12),
        m = t(5),
        b = t(75),
        y = t(37),
        E = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        h = i(
          [
            '\n  mutation OpenDialog($type: String!) {\n    popupsOpenDialog(type: $type) @client\n  }\n'
          ],
          [
            '\n  mutation OpenDialog($type: String!) {\n    popupsOpenDialog(type: $type) @client\n  }\n'
          ]
        ),
        v = i(
          [
            '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
          ],
          [
            '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
          ]
        ),
        O = f()(h),
        _ = f()(v),
        w = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            E(n, [
              {
                key: 'render',
                value: function() {
                  return this.props.anon
                    ? c.a.createElement(d.a, { mutation: _ }, function(e) {
                        return c.a.createElement(
                          'button',
                          {
                            className: 'new-button new-collection-button',
                            onClick: function(n) {
                              n.preventDefault(),
                                e({
                                  variables: {
                                    type: y.a.LOG_IN_TO_CREATE_COLLECTION
                                  }
                                });
                            }
                          },
                          c.a.createElement(m.a, {
                            icon: 'icon-new-collection'
                          }),
                          'Collection'
                        );
                      })
                    : c.a.createElement(d.a, { mutation: O }, function(e) {
                        return c.a.createElement(
                          'button',
                          {
                            className: 'new-button new-collection-button',
                            onClick: function(n) {
                              n.preventDefault(),
                                e({ variables: { type: b.a } });
                            }
                          },
                          c.a.createElement(m.a, {
                            icon: 'icon-new-collection'
                          }),
                          'Collection'
                        );
                      });
                }
              }
            ]),
            n
          );
        })(u.Component);
      Object.defineProperty(w, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { anon: s.a.bool }
      }),
        (n.a = w);
    },
    911: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(12),
        p = t(2),
        f = t.n(p),
        d = t(5),
        m = t(37),
        b = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        y = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
          ],
          [
            '\n  mutation OpenModal($type: String!, $props: Object) {\n    popupsOpenModal(type: $type, props: $props) @client\n  }\n'
          ]
        ),
        E = f()(y),
        h = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            b(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(s.a, { mutation: E }, function(n) {
                    return u.a.createElement(
                      'a',
                      {
                        href: '/write/',
                        className: 'new-button new-post-button',
                        onClick: function(t) {
                          e.props.anon &&
                            (t.preventDefault(),
                            n({
                              variables: { type: m.a.LOG_IN_TO_CREATE_POSTS }
                            }));
                        }
                      },
                      u.a.createElement(d.a, { icon: 'icon-new-post' }),
                      'Post'
                    );
                  });
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(h, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { anon: l.a.bool }
      }),
        (n.a = h);
    },
    912: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(8),
        p = t.n(s),
        f = t(2),
        d = t.n(f),
        m = t(4),
        b = t(92),
        y = t(913),
        E = t(296),
        h = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        v = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  {\n    popups @client {\n      __typename\n      id\n      drawer\n    }\n  }\n'
          ],
          [
            '\n  {\n    popups @client {\n      __typename\n      id\n      drawer\n    }\n  }\n'
          ]
        ),
        O = d()(v),
        _ = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            h(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(m.a, { query: O }, function(n) {
                    var t = n.data,
                      r = t.popups,
                      o = r.drawer === b.a,
                      a = p()('drawer', 'activity-drawer', { open: o });
                    return u.a.createElement(
                      E.a,
                      {
                        className: a,
                        drawer: r.drawer,
                        isOpen: o,
                        link: e.props.link
                      },
                      o && u.a.createElement(y.a, null)
                    );
                  });
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(_, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { link: l.a.object }
      }),
        (n.a = _);
    },
    913: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(2),
        l = t.n(c),
        s = t(4),
        p = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        f = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          ['\n  {\n    recentActivities\n  }\n'],
          ['\n  {\n    recentActivities\n  }\n']
        ),
        d = l()(f),
        m = (function(e) {
          function n() {
            var e, t, a, i;
            r(this, n);
            for (var u = arguments.length, c = Array(u), l = 0; l < u; l++)
              c[l] = arguments[l];
            return (
              (t = a = o(
                this,
                (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(
                  e,
                  [this].concat(c)
                )
              )),
              Object.defineProperty(a, 'getMarkup', {
                enumerable: !0,
                writable: !0,
                value: function(e) {
                  return { __html: e.recentActivities };
                }
              }),
              (i = t),
              o(a, i)
            );
          }
          return (
            a(n, e),
            p(n, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(
                    s.a,
                    { query: d, renderWhenDataReady: !0 },
                    function(n) {
                      var t = n.data;
                      return u.a.createElement('div', {
                        dangerouslySetInnerHTML: e.getMarkup(t)
                      });
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = m;
    },
    914: function(e, n, t) {
      'use strict';
      function r(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var o = t(0),
        a = t.n(o),
        i = t(2),
        u = t.n(i),
        c = t(4),
        l = t(12),
        s = t(75),
        p = r(
          [
            '\n  {\n    sessionUser {\n      id\n      pro\n      anon\n    }\n  }\n'
          ],
          [
            '\n  {\n    sessionUser {\n      id\n      pro\n      anon\n    }\n  }\n'
          ]
        ),
        f = r(
          [
            '\n  mutation OpenDialog($type: String!) {\n    popupsOpenDialog(type: $type) @client\n  }\n'
          ],
          [
            '\n  mutation OpenDialog($type: String!) {\n    popupsOpenDialog(type: $type) @client\n  }\n'
          ]
        ),
        d = u()(p),
        m = u()(f),
        b = function() {
          return a.a.createElement(l.a, { mutation: m }, function(e) {
            return a.a.createElement(
              c.a,
              { query: d, renderWhenDataReady: !0 },
              function(n) {
                var t = n.data;
                return t.sessionUser.anon
                  ? a.a.createElement(
                      'li',
                      null,
                      a.a.createElement(
                        'a',
                        { href: '/pro', style: { display: 'block' } },
                        'Go ',
                        a.a.createElement(
                          'span',
                          { className: 'badge badge-pro' },
                          'PRO'
                        )
                      )
                    )
                  : t.sessionUser.pro
                  ? null
                  : a.a.createElement(
                      'li',
                      null,
                      a.a.createElement(
                        'a',
                        {
                          href: '/pro',
                          style: { display: 'block' },
                          onClick: function(n) {
                            n.preventDefault(), e({ variables: { type: s.c } });
                          }
                        },
                        'Go ',
                        a.a.createElement(
                          'span',
                          { className: 'badge badge-pro' },
                          'PRO'
                        )
                      )
                    );
              }
            );
          });
        };
      n.a = b;
    },
    915: function(e, n, t) {
      'use strict';
      function r(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var o = t(0),
        a = t.n(o),
        i = t(1),
        u = t.n(i),
        c = t(2),
        l = t.n(c),
        s = t(4),
        p = t(44),
        f = t(231),
        d = t(232),
        m = t(116),
        b = t(297),
        y = t(298),
        E = t(916),
        h = t(15),
        v = t(917),
        O = t(300),
        _ = t(918),
        w = r(
          [
            '\n      query GetPenHeaderData($id: ID!) {\n        pen(id: $id) {\n          id\n          title\n          private\n          ownedBySessionUser\n          teamId\n          userId\n        }\n        ',
            '\n      }\n    '
          ],
          [
            '\n      query GetPenHeaderData($id: ID!) {\n        pen(id: $id) {\n          id\n          title\n          private\n          ownedBySessionUser\n          teamId\n          userId\n        }\n        ',
            '\n      }\n    '
          ]
        ),
        T = r(
          ['\n    query GetPenHeaderData {\n      ', '\n    }\n  '],
          ['\n    query GetPenHeaderData {\n      ', '\n    }\n  ']
        ),
        g = function(e) {
          var n =
            'sessionUser {\n    id\n    avatar80\n    currentTeamId\n    username\n    anon\n    permissions {\n      canCreatePrivate\n    }\n  }';
          return e ? l()(w, n) : l()(T, n);
        },
        P = function(e) {
          return a.a.createElement(
            s.a,
            {
              query: g(e.id),
              variables: { id: e.id },
              showModalOnError: !0,
              renderWhenDataReady: !0
            },
            function(n) {
              var t = n.data,
                r = t.sessionUser,
                o = t.pen;
              return a.a.createElement(
                _.a,
                null,
                a.a.createElement(f.a, null),
                a.a.createElement(v.a, {
                  itemType: h.a.PEN,
                  teamname: e.teamname,
                  editable: e.currentView === h.b.PEN,
                  showAuthor: e.currentView !== h.b.DETAILS
                }),
                a.a.createElement(
                  'div',
                  { className: 'navigation-wrap' },
                  o &&
                    !o.private &&
                    !r.anon &&
                    a.a.createElement(y.a, { itemType: h.a.PEN, id: e.id }),
                  a.a.createElement(p.a, {
                    id: 'run',
                    classes: 'button button-editor-outline button run',
                    icon: 'rerun',
                    label: 'Run',
                    title: 'Com/Ctrl - Shift - 7 to Run'
                  }),
                  a.a.createElement(E.a, {
                    pen: o,
                    sessionUser: r,
                    currentView: e.currentView
                  }),
                  e.currentView === h.b.PEN &&
                    a.a.createElement(p.a, {
                      id: 'edit-settings',
                      classes: 'button button-editor-solid',
                      icon: 'gear',
                      label: 'Settings',
                      onClick: function() {}
                    }),
                  a.a.createElement(b.a, {
                    id: e.id,
                    currentView: e.currentView
                  }),
                  !r.anon && a.a.createElement(O.a, null),
                  r.anon
                    ? a.a.createElement(m.a, null)
                    : a.a.createElement(d.a, null)
                )
              );
            }
          );
        };
      (P.propTypes = {
        id: u.a.string,
        location: u.a.object,
        currentView: u.a.string.isRequired,
        teamname: u.a.string
      }),
        (n.a = P);
    },
    916: function(e, n, t) {
      'use strict';
      var r = t(0),
        o = t.n(r),
        a = t(1),
        i = t.n(a),
        u = t(44),
        c = function(e) {
          var n = e.pen,
            t = e.sessionUser,
            a = e.currentView,
            i =
              ['pen', 'collab'].includes(a) ||
              ('professor' === a && n.ownedBySessionUser);
          return n
            ? o.a.createElement(
                r.Fragment,
                null,
                i &&
                  n.ownedBySessionUser &&
                  o.a.createElement(u.a, {
                    id: 'update',
                    classes: 'button button-editor-outline',
                    icon: 'cloud',
                    label: 'Save'
                  }),
                (!n.private || n.ownedBySessionUser) &&
                  o.a.createElement(u.a, {
                    id: 'fork',
                    classes: 'button button-editor-outline fork-button',
                    icon: 'branch',
                    label: 'Fork'
                  })
              )
            : o.a.createElement(
                r.Fragment,
                null,
                o.a.createElement(u.a, {
                  id: 'save',
                  classes: 'button button-editor-solid',
                  icon: 'cloud',
                  label: 'Save'
                }),
                t.permissions.canCreatePrivate &&
                  o.a.createElement(u.a, {
                    id: 'save-as-private',
                    classes: 'button button-editor-solid',
                    icon: 'cloud',
                    label: 'Save as Private'
                  })
              );
        };
      (c.propTypes = {
        pen: i.a.object,
        sessionUser: i.a.object,
        currentView: i.a.string
      }),
        (n.a = c);
    },
    917: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(299),
        p = t(2),
        f = t.n(p),
        d = t(12),
        m = t(15),
        b = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        y = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  mutation PenEditorTitleSavePen {\n    itemSavePen @client\n  }\n'
          ],
          [
            '\n  mutation PenEditorTitleSavePen {\n    itemSavePen @client\n  }\n'
          ]
        ),
        E = f()(y),
        h = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            b(n, [
              { key: 'savePen', value: function() {} },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return u.a.createElement(d.a, { mutation: E }, function(n) {
                    return u.a.createElement(s.a, {
                      itemType: m.a.PEN,
                      teamname: e.props.teamname,
                      editable: e.props.editable,
                      showAuthor: e.props.showAuthor,
                      saveItem: n
                    });
                  });
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(h, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: {
          teamname: l.a.string,
          editable: l.a.bool,
          showAuthor: l.a.bool
        }
      }),
        (n.a = h);
    },
    918: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(2),
        f = t.n(p),
        d = t(4),
        m = t(919),
        b =
          (t.n(m),
          (function() {
            function e(e, n) {
              for (var t = 0; t < n.length; t++) {
                var r = n[t];
                (r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  'value' in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r);
              }
            }
            return function(n, t, r) {
              return t && e(n.prototype, t), r && e(n, r), n;
            };
          })()),
        y = i(
          [
            '\n  {\n    item @client {\n      id\n    }\n    itemLocalState @client {\n      title\n    }\n  }\n'
          ],
          [
            '\n  {\n    item @client {\n      id\n    }\n    itemLocalState @client {\n      title\n    }\n  }\n'
          ]
        ),
        E = i(
          [
            '\n  {\n    sessionUser {\n      id\n      currentContext {\n        id\n        title\n      }\n    }\n  }\n'
          ],
          [
            '\n  {\n    sessionUser {\n      id\n      currentContext {\n        id\n        title\n      }\n    }\n  }\n'
          ]
        ),
        h = f()(y),
        v = f()(E),
        O = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            b(n, [
              {
                key: 'renderHelmet',
                value: function(e) {
                  return c.a.createElement(
                    u.Fragment,
                    null,
                    c.a.createElement(
                      m.Helmet,
                      null,
                      c.a.createElement('title', null, e || 'Untitled')
                    ),
                    this.props.children
                  );
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return c.a.createElement(d.a, { query: h }, function(n) {
                    var t = n.data,
                      r = t.itemLocalState.title;
                    return null === t.item && null === r
                      ? c.a.createElement(d.a, { query: v }, function(n) {
                          var t = n.data;
                          return e.renderHelmet(
                            'A Pen by ' + t.sessionUser.currentContext.title
                          );
                        })
                      : null !== r
                      ? e.renderHelmet(r)
                      : e.props.children;
                  });
                }
              }
            ]),
            n
          );
        })(u.Component);
      Object.defineProperty(O, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { children: s.a.node }
      }),
        (n.a = O);
    },
    919: function(e, n, t) {
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function o(e, n) {
        var t = {};
        for (var r in e)
          n.indexOf(r) >= 0 ||
            (Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]));
        return t;
      }
      function a(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function i(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function u(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      (n.__esModule = !0), (n.Helmet = void 0);
      var c =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        l = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        s = t(0),
        p = r(s),
        f = t(1),
        d = r(f),
        m = t(920),
        b = r(m),
        y = t(923),
        E = r(y),
        h = t(926),
        v = t(569),
        O = function() {
          return null;
        },
        _ = (0, b.default)(
          h.reducePropsToState,
          h.handleClientStateChange,
          h.mapStateOnServer
        )(O),
        w = (function(e) {
          var n, t;
          return (
            (t = n = (function(n) {
              function t() {
                return a(this, t), i(this, n.apply(this, arguments));
              }
              return (
                u(t, n),
                (t.prototype.shouldComponentUpdate = function(e) {
                  return !(0, E.default)(this.props, e);
                }),
                (t.prototype.mapNestedChildrenToProps = function(e, n) {
                  if (!n) return null;
                  switch (e.type) {
                    case v.TAG_NAMES.SCRIPT:
                    case v.TAG_NAMES.NOSCRIPT:
                      return { innerHTML: n };
                    case v.TAG_NAMES.STYLE:
                      return { cssText: n };
                  }
                  throw new Error(
                    '<' +
                      e.type +
                      ' /> elements are self-closing and can not contain children. Refer to our API for more information.'
                  );
                }),
                (t.prototype.flattenArrayTypeChildren = function(e) {
                  var n,
                    t = e.child,
                    r = e.arrayTypeChildren,
                    o = e.newChildProps,
                    a = e.nestedChildren;
                  return c(
                    {},
                    r,
                    ((n = {}),
                    (n[t.type] = [].concat(r[t.type] || [], [
                      c({}, o, this.mapNestedChildrenToProps(t, a))
                    ])),
                    n)
                  );
                }),
                (t.prototype.mapObjectTypeChildren = function(e) {
                  var n,
                    t,
                    r = e.child,
                    o = e.newProps,
                    a = e.newChildProps,
                    i = e.nestedChildren;
                  switch (r.type) {
                    case v.TAG_NAMES.TITLE:
                      return c(
                        {},
                        o,
                        ((n = {}),
                        (n[r.type] = i),
                        (n.titleAttributes = c({}, a)),
                        n)
                      );
                    case v.TAG_NAMES.BODY:
                      return c({}, o, { bodyAttributes: c({}, a) });
                    case v.TAG_NAMES.HTML:
                      return c({}, o, { htmlAttributes: c({}, a) });
                  }
                  return c({}, o, ((t = {}), (t[r.type] = c({}, a)), t));
                }),
                (t.prototype.mapArrayTypeChildrenToProps = function(e, n) {
                  var t = c({}, n);
                  return (
                    Object.keys(e).forEach(function(n) {
                      var r;
                      t = c({}, t, ((r = {}), (r[n] = e[n]), r));
                    }),
                    t
                  );
                }),
                (t.prototype.warnOnInvalidChildren = function(e, n) {
                  return !0;
                }),
                (t.prototype.mapChildrenToProps = function(e, n) {
                  var t = this,
                    r = {};
                  return (
                    p.default.Children.forEach(e, function(e) {
                      if (e && e.props) {
                        var a = e.props,
                          i = a.children,
                          u = o(a, ['children']),
                          c = (0, h.convertReactPropstoHtmlAttributes)(u);
                        switch ((t.warnOnInvalidChildren(e, i), e.type)) {
                          case v.TAG_NAMES.LINK:
                          case v.TAG_NAMES.META:
                          case v.TAG_NAMES.NOSCRIPT:
                          case v.TAG_NAMES.SCRIPT:
                          case v.TAG_NAMES.STYLE:
                            r = t.flattenArrayTypeChildren({
                              child: e,
                              arrayTypeChildren: r,
                              newChildProps: c,
                              nestedChildren: i
                            });
                            break;
                          default:
                            n = t.mapObjectTypeChildren({
                              child: e,
                              newProps: n,
                              newChildProps: c,
                              nestedChildren: i
                            });
                        }
                      }
                    }),
                    (n = this.mapArrayTypeChildrenToProps(r, n))
                  );
                }),
                (t.prototype.render = function() {
                  var n = this.props,
                    t = n.children,
                    r = o(n, ['children']),
                    a = c({}, r);
                  return (
                    t && (a = this.mapChildrenToProps(t, a)),
                    p.default.createElement(e, a)
                  );
                }),
                l(t, null, [
                  {
                    key: 'canUseDOM',
                    set: function(n) {
                      e.canUseDOM = n;
                    }
                  }
                ]),
                t
              );
            })(p.default.Component)),
            (n.propTypes = {
              base: d.default.object,
              bodyAttributes: d.default.object,
              children: d.default.oneOfType([
                d.default.arrayOf(d.default.node),
                d.default.node
              ]),
              defaultTitle: d.default.string,
              defer: d.default.bool,
              encodeSpecialCharacters: d.default.bool,
              htmlAttributes: d.default.object,
              link: d.default.arrayOf(d.default.object),
              meta: d.default.arrayOf(d.default.object),
              noscript: d.default.arrayOf(d.default.object),
              onChangeClientState: d.default.func,
              script: d.default.arrayOf(d.default.object),
              style: d.default.arrayOf(d.default.object),
              title: d.default.string,
              titleAttributes: d.default.object,
              titleTemplate: d.default.string
            }),
            (n.defaultProps = { defer: !0, encodeSpecialCharacters: !0 }),
            (n.peek = e.peek),
            (n.rewind = function() {
              var n = e.rewind();
              return (
                n ||
                  (n = (0, h.mapStateOnServer)({
                    baseTag: [],
                    bodyAttributes: {},
                    encodeSpecialCharacters: !0,
                    htmlAttributes: {},
                    linkTags: [],
                    metaTags: [],
                    noscriptTags: [],
                    scriptTags: [],
                    styleTags: [],
                    title: '',
                    titleAttributes: {}
                  })),
                n
              );
            }),
            t
          );
        })(_);
      (w.renderStatic = w.rewind), (n.Helmet = w), (n.default = w);
    },
    92: function(e, n, t) {
      'use strict';
      t.d(n, 'b', function() {
        return r;
      }),
        t.d(n, 'a', function() {
          return o;
        }),
        t.d(n, 'c', function() {
          return a;
        });
      var r = 'PINS_DRAWER',
        o = 'ACTIVITY_DRAWER',
        a = 'SAVED_DRAWER';
    },
    920: function(e, n, t) {
      'use strict';
      function r(e) {
        return e && 'object' == typeof e && 'default' in e ? e.default : e;
      }
      function o(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function a(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function i(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function u(e, n, t) {
        function r(e) {
          return e.displayName || e.name || 'Component';
        }
        if ('function' != typeof e)
          throw new Error('Expected reducePropsToState to be a function.');
        if ('function' != typeof n)
          throw new Error(
            'Expected handleStateChangeOnClient to be a function.'
          );
        if (void 0 !== t && 'function' != typeof t)
          throw new Error(
            'Expected mapStateOnServer to either be undefined or a function.'
          );
        return function(u) {
          function f() {
            (m = e(
              d.map(function(e) {
                return e.props;
              })
            )),
              b.canUseDOM ? n(m) : t && (m = t(m));
          }
          if ('function' != typeof u)
            throw new Error(
              'Expected WrappedComponent to be a React component.'
            );
          var d = [],
            m = void 0,
            b = (function(e) {
              function n() {
                return o(this, n), a(this, e.apply(this, arguments));
              }
              return (
                i(n, e),
                (n.peek = function() {
                  return m;
                }),
                (n.rewind = function() {
                  if (n.canUseDOM)
                    throw new Error(
                      'You may only call rewind() on the server. Call peek() to read the current state.'
                    );
                  var e = m;
                  return (m = void 0), (d = []), e;
                }),
                (n.prototype.shouldComponentUpdate = function(e) {
                  return !p(e, this.props);
                }),
                (n.prototype.componentWillMount = function() {
                  d.push(this), f();
                }),
                (n.prototype.componentDidUpdate = function() {
                  f();
                }),
                (n.prototype.componentWillUnmount = function() {
                  var e = d.indexOf(this);
                  d.splice(e, 1), f();
                }),
                (n.prototype.render = function() {
                  return l.createElement(u, this.props);
                }),
                n
              );
            })(c.Component);
          return (
            (b.displayName = 'SideEffect(' + r(u) + ')'),
            (b.canUseDOM = s.canUseDOM),
            b
          );
        };
      }
      var c = t(0),
        l = r(c),
        s = r(t(921)),
        p = r(t(922));
      e.exports = u;
    },
    921: function(e, n, t) {
      var r;
      !(function() {
        'use strict';
        var o = !(
            'undefined' == typeof window ||
            !window.document ||
            !window.document.createElement
          ),
          a = {
            canUseDOM: o,
            canUseWorkers: 'undefined' != typeof Worker,
            canUseEventListeners:
              o && !(!window.addEventListener && !window.attachEvent),
            canUseViewport: o && !!window.screen
          };
        void 0 !==
          (r = function() {
            return a;
          }.call(n, t, n, e)) && (e.exports = r);
      })();
    },
    922: function(e, n) {
      e.exports = function(e, n, t, r) {
        var o = t ? t.call(r, e, n) : void 0;
        if (void 0 !== o) return !!o;
        if (e === n) return !0;
        if ('object' != typeof e || !e || 'object' != typeof n || !n) return !1;
        var a = Object.keys(e),
          i = Object.keys(n);
        if (a.length !== i.length) return !1;
        for (
          var u = Object.prototype.hasOwnProperty.bind(n), c = 0;
          c < a.length;
          c++
        ) {
          var l = a[c];
          if (!u(l)) return !1;
          var s = e[l],
            p = n[l];
          if (
            !1 === (o = t ? t.call(r, s, p, l) : void 0) ||
            (void 0 === o && s !== p)
          )
            return !1;
        }
        return !0;
      };
    },
    923: function(e, n, t) {
      function r(e) {
        return null === e || void 0 === e;
      }
      function o(e) {
        return (
          !(!e || 'object' != typeof e || 'number' != typeof e.length) &&
          'function' == typeof e.copy &&
            'function' == typeof e.slice &&
            !(e.length > 0 && 'number' != typeof e[0])
        );
      }
      function a(e, n, t) {
        var a, s;
        if (r(e) || r(n)) return !1;
        if (e.prototype !== n.prototype) return !1;
        if (c(e))
          return !!c(n) && ((e = i.call(e)), (n = i.call(n)), l(e, n, t));
        if (o(e)) {
          if (!o(n)) return !1;
          if (e.length !== n.length) return !1;
          for (a = 0; a < e.length; a++) if (e[a] !== n[a]) return !1;
          return !0;
        }
        try {
          var p = u(e),
            f = u(n);
        } catch (e) {
          return !1;
        }
        if (p.length != f.length) return !1;
        for (p.sort(), f.sort(), a = p.length - 1; a >= 0; a--)
          if (p[a] != f[a]) return !1;
        for (a = p.length - 1; a >= 0; a--)
          if (((s = p[a]), !l(e[s], n[s], t))) return !1;
        return typeof e == typeof n;
      }
      var i = Array.prototype.slice,
        u = t(924),
        c = t(925),
        l = (e.exports = function(e, n, t) {
          return (
            t || (t = {}),
            e === n ||
              (e instanceof Date && n instanceof Date
                ? e.getTime() === n.getTime()
                : !e || !n || ('object' != typeof e && 'object' != typeof n)
                ? t.strict
                  ? e === n
                  : e == n
                : a(e, n, t))
          );
        });
    },
    924: function(e, n) {
      function t(e) {
        var n = [];
        for (var t in e) n.push(t);
        return n;
      }
      (n = e.exports = 'function' == typeof Object.keys ? Object.keys : t),
        (n.shim = t);
    },
    925: function(e, n) {
      function t(e) {
        return '[object Arguments]' == Object.prototype.toString.call(e);
      }
      function r(e) {
        return (
          (e &&
            'object' == typeof e &&
            'number' == typeof e.length &&
            Object.prototype.hasOwnProperty.call(e, 'callee') &&
            !Object.prototype.propertyIsEnumerable.call(e, 'callee')) ||
          !1
        );
      }
      var o =
        '[object Arguments]' ==
        (function() {
          return Object.prototype.toString.call(arguments);
        })();
      (n = e.exports = o ? t : r), (n.supported = t), (n.unsupported = r);
    },
    926: function(e, n, t) {
      (function(e) {
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (n.__esModule = !0),
          (n.warn = n.requestAnimationFrame = n.reducePropsToState = n.mapStateOnServer = n.handleClientStateChange = n.convertReactPropstoHtmlAttributes = void 0);
        var o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function(e) {
                  return typeof e;
                }
              : function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                },
          a =
            Object.assign ||
            function(e) {
              for (var n = 1; n < arguments.length; n++) {
                var t = arguments[n];
                for (var r in t)
                  Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
              }
              return e;
            },
          i = t(0),
          u = r(i),
          c = t(326),
          l = r(c),
          s = t(569),
          p = function(e) {
            return !1 ===
              (!(arguments.length > 1 && void 0 !== arguments[1]) ||
                arguments[1])
              ? String(e)
              : String(e)
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#x27;');
          },
          f = function(e) {
            var n = E(e, s.TAG_NAMES.TITLE),
              t = E(e, s.HELMET_PROPS.TITLE_TEMPLATE);
            if (t && n)
              return t.replace(/%s/g, function() {
                return n;
              });
            var r = E(e, s.HELMET_PROPS.DEFAULT_TITLE);
            return n || r || void 0;
          },
          d = function(e) {
            return E(e, s.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function() {};
          },
          m = function(e, n) {
            return n
              .filter(function(n) {
                return void 0 !== n[e];
              })
              .map(function(n) {
                return n[e];
              })
              .reduce(function(e, n) {
                return a({}, e, n);
              }, {});
          },
          b = function(e, n) {
            return n
              .filter(function(e) {
                return void 0 !== e[s.TAG_NAMES.BASE];
              })
              .map(function(e) {
                return e[s.TAG_NAMES.BASE];
              })
              .reverse()
              .reduce(function(n, t) {
                if (!n.length)
                  for (var r = Object.keys(t), o = 0; o < r.length; o++) {
                    var a = r[o],
                      i = a.toLowerCase();
                    if (-1 !== e.indexOf(i) && t[i]) return n.concat(t);
                  }
                return n;
              }, []);
          },
          y = function(e, n, t) {
            var r = {};
            return t
              .filter(function(n) {
                return (
                  !!Array.isArray(n[e]) ||
                  (void 0 !== n[e] &&
                    T(
                      'Helmet: ' +
                        e +
                        ' should be of type "Array". Instead found type "' +
                        o(n[e]) +
                        '"'
                    ),
                  !1)
                );
              })
              .map(function(n) {
                return n[e];
              })
              .reverse()
              .reduce(function(e, t) {
                var o = {};
                t.filter(function(e) {
                  for (
                    var t = void 0, a = Object.keys(e), i = 0;
                    i < a.length;
                    i++
                  ) {
                    var u = a[i],
                      c = u.toLowerCase();
                    -1 === n.indexOf(c) ||
                      (t === s.TAG_PROPERTIES.REL &&
                        'canonical' === e[t].toLowerCase()) ||
                      (c === s.TAG_PROPERTIES.REL &&
                        'stylesheet' === e[c].toLowerCase()) ||
                      (t = c),
                      -1 === n.indexOf(u) ||
                        (u !== s.TAG_PROPERTIES.INNER_HTML &&
                          u !== s.TAG_PROPERTIES.CSS_TEXT &&
                          u !== s.TAG_PROPERTIES.ITEM_PROP) ||
                        (t = u);
                  }
                  if (!t || !e[t]) return !1;
                  var l = e[t].toLowerCase();
                  return (
                    r[t] || (r[t] = {}),
                    o[t] || (o[t] = {}),
                    !r[t][l] && ((o[t][l] = !0), !0)
                  );
                })
                  .reverse()
                  .forEach(function(n) {
                    return e.push(n);
                  });
                for (var a = Object.keys(o), i = 0; i < a.length; i++) {
                  var u = a[i],
                    c = (0, l.default)({}, r[u], o[u]);
                  r[u] = c;
                }
                return e;
              }, [])
              .reverse();
          },
          E = function(e, n) {
            for (var t = e.length - 1; t >= 0; t--) {
              var r = e[t];
              if (r.hasOwnProperty(n)) return r[n];
            }
            return null;
          },
          h = function(e) {
            return {
              baseTag: b([s.TAG_PROPERTIES.HREF], e),
              bodyAttributes: m(s.ATTRIBUTE_NAMES.BODY, e),
              defer: E(e, s.HELMET_PROPS.DEFER),
              encode: E(e, s.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
              htmlAttributes: m(s.ATTRIBUTE_NAMES.HTML, e),
              linkTags: y(
                s.TAG_NAMES.LINK,
                [s.TAG_PROPERTIES.REL, s.TAG_PROPERTIES.HREF],
                e
              ),
              metaTags: y(
                s.TAG_NAMES.META,
                [
                  s.TAG_PROPERTIES.NAME,
                  s.TAG_PROPERTIES.CHARSET,
                  s.TAG_PROPERTIES.HTTPEQUIV,
                  s.TAG_PROPERTIES.PROPERTY,
                  s.TAG_PROPERTIES.ITEM_PROP
                ],
                e
              ),
              noscriptTags: y(
                s.TAG_NAMES.NOSCRIPT,
                [s.TAG_PROPERTIES.INNER_HTML],
                e
              ),
              onChangeClientState: d(e),
              scriptTags: y(
                s.TAG_NAMES.SCRIPT,
                [s.TAG_PROPERTIES.SRC, s.TAG_PROPERTIES.INNER_HTML],
                e
              ),
              styleTags: y(s.TAG_NAMES.STYLE, [s.TAG_PROPERTIES.CSS_TEXT], e),
              title: f(e),
              titleAttributes: m(s.ATTRIBUTE_NAMES.TITLE, e)
            };
          },
          v = (function() {
            var e = Date.now();
            return function(n) {
              var t = Date.now();
              t - e > 16
                ? ((e = t), n(t))
                : setTimeout(function() {
                    v(n);
                  }, 0);
            };
          })(),
          O = function(e) {
            return clearTimeout(e);
          },
          _ =
            'undefined' != typeof window
              ? window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                v
              : e.requestAnimationFrame || v,
          w =
            'undefined' != typeof window
              ? window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                O
              : e.cancelAnimationFrame || O,
          T = function(e) {
            return (
              console && 'function' == typeof console.warn && console.warn(e)
            );
          },
          g = null,
          P = function(e) {
            g && w(g),
              e.defer
                ? (g = _(function() {
                    S(e, function() {
                      g = null;
                    });
                  }))
                : (S(e), (g = null));
          },
          S = function(e, n) {
            var t = e.baseTag,
              r = e.bodyAttributes,
              o = e.htmlAttributes,
              a = e.linkTags,
              i = e.metaTags,
              u = e.noscriptTags,
              c = e.onChangeClientState,
              l = e.scriptTags,
              p = e.styleTags,
              f = e.title,
              d = e.titleAttributes;
            R(s.TAG_NAMES.BODY, r), R(s.TAG_NAMES.HTML, o), C(f, d);
            var m = {
                baseTag: A(s.TAG_NAMES.BASE, t),
                linkTags: A(s.TAG_NAMES.LINK, a),
                metaTags: A(s.TAG_NAMES.META, i),
                noscriptTags: A(s.TAG_NAMES.NOSCRIPT, u),
                scriptTags: A(s.TAG_NAMES.SCRIPT, l),
                styleTags: A(s.TAG_NAMES.STYLE, p)
              },
              b = {},
              y = {};
            Object.keys(m).forEach(function(e) {
              var n = m[e],
                t = n.newTags,
                r = n.oldTags;
              t.length && (b[e] = t), r.length && (y[e] = m[e].oldTags);
            }),
              n && n(),
              c(e, b, y);
          },
          j = function(e) {
            return Array.isArray(e) ? e.join('') : e;
          },
          C = function(e, n) {
            void 0 !== e && document.title !== e && (document.title = j(e)),
              R(s.TAG_NAMES.TITLE, n);
          },
          R = function(e, n) {
            var t = document.getElementsByTagName(e)[0];
            if (t) {
              for (
                var r = t.getAttribute(s.HELMET_ATTRIBUTE),
                  o = r ? r.split(',') : [],
                  a = [].concat(o),
                  i = Object.keys(n),
                  u = 0;
                u < i.length;
                u++
              ) {
                var c = i[u],
                  l = n[c] || '';
                t.getAttribute(c) !== l && t.setAttribute(c, l),
                  -1 === o.indexOf(c) && o.push(c);
                var p = a.indexOf(c);
                -1 !== p && a.splice(p, 1);
              }
              for (var f = a.length - 1; f >= 0; f--) t.removeAttribute(a[f]);
              o.length === a.length
                ? t.removeAttribute(s.HELMET_ATTRIBUTE)
                : t.getAttribute(s.HELMET_ATTRIBUTE) !== i.join(',') &&
                  t.setAttribute(s.HELMET_ATTRIBUTE, i.join(','));
            }
          },
          A = function(e, n) {
            var t = document.head || document.querySelector(s.TAG_NAMES.HEAD),
              r = t.querySelectorAll(e + '[' + s.HELMET_ATTRIBUTE + ']'),
              o = Array.prototype.slice.call(r),
              a = [],
              i = void 0;
            return (
              n &&
                n.length &&
                n.forEach(function(n) {
                  var t = document.createElement(e);
                  for (var r in n)
                    if (n.hasOwnProperty(r))
                      if (r === s.TAG_PROPERTIES.INNER_HTML)
                        t.innerHTML = n.innerHTML;
                      else if (r === s.TAG_PROPERTIES.CSS_TEXT)
                        t.styleSheet
                          ? (t.styleSheet.cssText = n.cssText)
                          : t.appendChild(document.createTextNode(n.cssText));
                      else {
                        var u = void 0 === n[r] ? '' : n[r];
                        t.setAttribute(r, u);
                      }
                  t.setAttribute(s.HELMET_ATTRIBUTE, 'true'),
                    o.some(function(e, n) {
                      return (i = n), t.isEqualNode(e);
                    })
                      ? o.splice(i, 1)
                      : a.push(t);
                }),
              o.forEach(function(e) {
                return e.parentNode.removeChild(e);
              }),
              a.forEach(function(e) {
                return t.appendChild(e);
              }),
              { oldTags: o, newTags: a }
            );
          },
          I = function(e) {
            return Object.keys(e).reduce(function(n, t) {
              var r = void 0 !== e[t] ? t + '="' + e[t] + '"' : '' + t;
              return n ? n + ' ' + r : r;
            }, '');
          },
          L = function(e, n, t, r) {
            var o = I(t),
              a = j(n);
            return o
              ? '<' +
                  e +
                  ' ' +
                  s.HELMET_ATTRIBUTE +
                  '="true" ' +
                  o +
                  '>' +
                  p(a, r) +
                  '</' +
                  e +
                  '>'
              : '<' +
                  e +
                  ' ' +
                  s.HELMET_ATTRIBUTE +
                  '="true">' +
                  p(a, r) +
                  '</' +
                  e +
                  '>';
          },
          N = function(e, n, t) {
            return n.reduce(function(n, r) {
              var o = Object.keys(r)
                  .filter(function(e) {
                    return !(
                      e === s.TAG_PROPERTIES.INNER_HTML ||
                      e === s.TAG_PROPERTIES.CSS_TEXT
                    );
                  })
                  .reduce(function(e, n) {
                    var o = void 0 === r[n] ? n : n + '="' + p(r[n], t) + '"';
                    return e ? e + ' ' + o : o;
                  }, ''),
                a = r.innerHTML || r.cssText || '',
                i = -1 === s.SELF_CLOSING_TAGS.indexOf(e);
              return (
                n +
                '<' +
                e +
                ' ' +
                s.HELMET_ATTRIBUTE +
                '="true" ' +
                o +
                (i ? '/>' : '>' + a + '</' + e + '>')
              );
            }, '');
          },
          k = function(e) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            return Object.keys(e).reduce(function(n, t) {
              return (n[s.REACT_TAG_MAP[t] || t] = e[t]), n;
            }, n);
          },
          D = function(e) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            return Object.keys(e).reduce(function(n, t) {
              return (n[s.HTML_TAG_MAP[t] || t] = e[t]), n;
            }, n);
          },
          U = function(e, n, t) {
            var r,
              o = ((r = { key: n }), (r[s.HELMET_ATTRIBUTE] = !0), r),
              a = k(t, o);
            return [u.default.createElement(s.TAG_NAMES.TITLE, a, n)];
          },
          M = function(e, n) {
            return n.map(function(n, t) {
              var r,
                o = ((r = { key: t }), (r[s.HELMET_ATTRIBUTE] = !0), r);
              return (
                Object.keys(n).forEach(function(e) {
                  var t = s.REACT_TAG_MAP[e] || e;
                  if (
                    t === s.TAG_PROPERTIES.INNER_HTML ||
                    t === s.TAG_PROPERTIES.CSS_TEXT
                  ) {
                    var r = n.innerHTML || n.cssText;
                    o.dangerouslySetInnerHTML = { __html: r };
                  } else o[t] = n[e];
                }),
                u.default.createElement(e, o)
              );
            });
          },
          x = function(e, n, t) {
            switch (e) {
              case s.TAG_NAMES.TITLE:
                return {
                  toComponent: function() {
                    return U(0, n.title, n.titleAttributes);
                  },
                  toString: function() {
                    return L(e, n.title, n.titleAttributes, t);
                  }
                };
              case s.ATTRIBUTE_NAMES.BODY:
              case s.ATTRIBUTE_NAMES.HTML:
                return {
                  toComponent: function() {
                    return k(n);
                  },
                  toString: function() {
                    return I(n);
                  }
                };
              default:
                return {
                  toComponent: function() {
                    return M(e, n);
                  },
                  toString: function() {
                    return N(e, n, t);
                  }
                };
            }
          },
          $ = function(e) {
            var n = e.baseTag,
              t = e.bodyAttributes,
              r = e.encode,
              o = e.htmlAttributes,
              a = e.linkTags,
              i = e.metaTags,
              u = e.noscriptTags,
              c = e.scriptTags,
              l = e.styleTags,
              p = e.title,
              f = void 0 === p ? '' : p,
              d = e.titleAttributes;
            return {
              base: x(s.TAG_NAMES.BASE, n, r),
              bodyAttributes: x(s.ATTRIBUTE_NAMES.BODY, t, r),
              htmlAttributes: x(s.ATTRIBUTE_NAMES.HTML, o, r),
              link: x(s.TAG_NAMES.LINK, a, r),
              meta: x(s.TAG_NAMES.META, i, r),
              noscript: x(s.TAG_NAMES.NOSCRIPT, u, r),
              script: x(s.TAG_NAMES.SCRIPT, c, r),
              style: x(s.TAG_NAMES.STYLE, l, r),
              title: x(s.TAG_NAMES.TITLE, { title: f, titleAttributes: d }, r)
            };
          };
        (n.convertReactPropstoHtmlAttributes = D),
          (n.handleClientStateChange = P),
          (n.mapStateOnServer = $),
          (n.reducePropsToState = h),
          (n.requestAnimationFrame = _),
          (n.warn = T);
      }.call(n, t(103)));
    },
    927: function(e, n, t) {
      'use strict';
      var r = t(0),
        o = t.n(r),
        a = t(1),
        i = t.n(a),
        u = t(2),
        c = t.n(u),
        l = t(4),
        s = t(44),
        p = t(231),
        f = t(393),
        d = t(232),
        m = t(116),
        b = t(297),
        y = t(298),
        E = t(15),
        h = t(299),
        v = t(300),
        O = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query GetProjectHeaderData($id: ID!) {\n    project(id: $id) {\n      id\n      private\n      ownedBySessionUser\n      userId\n      teamId\n    }\n    sessionUser {\n      currentTeamId\n      anon\n      id\n      admin\n    }\n  }\n'
          ],
          [
            '\n  query GetProjectHeaderData($id: ID!) {\n    project(id: $id) {\n      id\n      private\n      ownedBySessionUser\n      userId\n      teamId\n    }\n    sessionUser {\n      currentTeamId\n      anon\n      id\n      admin\n    }\n  }\n'
          ]
        ),
        _ = c()(O),
        w = function(e) {
          return o.a.createElement(
            l.a,
            { query: _, variables: { id: e.id }, renderWhenDataReady: !0 },
            function(n) {
              var t = n.data,
                a = t.sessionUser,
                i = t.project;
              return o.a.createElement(
                r.Fragment,
                null,
                o.a.createElement(p.a, null),
                o.a.createElement(h.a, {
                  itemType: E.a.PROJECT,
                  showAuthor: e.currentView !== E.b.DETAILS
                }),
                o.a.createElement(
                  'div',
                  { className: 'navigation-wrap' },
                  !i.private &&
                    o.a.createElement(y.a, { id: e.id, itemType: E.a.PROJECT }),
                  (!i.private || i.ownedBySessionUser || a.admin) &&
                    o.a.createElement(s.a, {
                      id: 'fork',
                      classes: 'button button-editor-outline fork-button',
                      icon: 'branch',
                      label: 'Fork'
                    }),
                  o.a.createElement(b.a, {
                    id: e.id,
                    currentView: e.currentView
                  }),
                  !a.anon && o.a.createElement(v.a, null),
                  o.a.createElement(f.a, null),
                  a.anon
                    ? o.a.createElement(m.a, null)
                    : o.a.createElement(d.a, null)
                )
              );
            }
          );
        };
      (w.propTypes = {
        id: i.a.string,
        location: i.a.object,
        currentView: i.a.string
      }),
        (n.a = w);
    },
    928: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(2),
        s = t.n(l),
        p = t(4),
        f = t(55),
        d = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        m = i(
          ['\n  {\n    sessionUser {\n      id\n      username\n    }\n  }\n'],
          ['\n  {\n    sessionUser {\n      id\n      username\n    }\n  }\n']
        ),
        b = i(
          ['\n  {\n    item @client {\n      id\n      itemType\n    }\n  }\n'],
          ['\n  {\n    item @client {\n      id\n      itemType\n    }\n  }\n']
        ),
        y = s()(m),
        E = s()(b),
        h = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            d(n, [
              {
                key: 'render',
                value: function() {
                  return c.a.createElement(
                    p.a,
                    { query: y, renderWhenDataReady: !0 },
                    function(e) {
                      var n = e.data,
                        t = { username: n.sessionUser.username };
                      return c.a.createElement(p.a, { query: E }, function(e) {
                        var n = e.data;
                        return (
                          n.item && (t[n.item.itemType + '_id'] = n.item.id),
                          Object(f.a)(t),
                          null
                        );
                      });
                    }
                  );
                }
              }
            ]),
            n
          );
        })(u.Component);
      n.a = h;
    },
    929: function(e, n, t) {
      'use strict';
      (function(e) {
        function r(e, n) {
          if (!(e instanceof n))
            throw new TypeError('Cannot call a class as a function');
        }
        function o(e, n) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
        }
        function a(e, n) {
          if ('function' != typeof n && null !== n)
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof n
            );
          (e.prototype = Object.create(n && n.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          })),
            n &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, n)
                : (e.__proto__ = n));
        }
        var i = t(0),
          u = t.n(i),
          c = t(1),
          l = t.n(c),
          s = t(59),
          p = (t.n(s), t(21)),
          f = (t.n(p), t(930)),
          d = t(294),
          m = (function() {
            function e(e, n) {
              for (var t = 0; t < n.length; t++) {
                var r = n[t];
                (r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  'value' in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r);
              }
            }
            return function(n, t, r) {
              return t && e(n.prototype, t), r && e(n, r), n;
            };
          })(),
          b = (function(e) {
            function n() {
              return (
                r(this, n),
                o(
                  this,
                  (n.__proto__ || Object.getPrototypeOf(n)).apply(
                    this,
                    arguments
                  )
                )
              );
            }
            return (
              a(n, e),
              m(n, [
                {
                  key: 'render',
                  value: function() {
                    return u.a.createElement(
                      p.ApolloProvider,
                      { client: this.props.client },
                      u.a.createElement(f.a, null),
                      u.a.createElement('div', {
                        className: 'collapsed-opener',
                        onClick: d.a
                      })
                    );
                  }
                }
              ]),
              n
            );
          })(i.Component);
        (b.propTypes = { client: l.a.object }), (n.a = Object(s.hot)(e)(b));
      }.call(n, t(76)(e)));
    },
    930: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(2),
        l = t.n(c),
        s = t(4),
        p = t(231),
        f = t(566),
        d = t(567),
        m = t(568),
        b = t(393),
        y = t(232),
        E = t(262),
        h = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        v = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query sessionUser {\n    sessionUser {\n      anon\n      id\n    }\n    popups @client {\n      __typename\n      id\n      menu\n      drawer\n    }\n  }\n'
          ],
          [
            '\n  query sessionUser {\n    sessionUser {\n      anon\n      id\n    }\n    popups @client {\n      __typename\n      id\n      menu\n      drawer\n    }\n  }\n'
          ]
        ),
        O = l()(v),
        _ = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            h(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    s.a,
                    {
                      query: O,
                      renderBeforeDataReady: !0,
                      loadingIndicator: null
                    },
                    function(e) {
                      var n = e.loading,
                        t = e.error,
                        r = e.data;
                      if (n) return null;
                      var o = !n && !t && r.sessionUser.anon;
                      return u.a.createElement(
                        'div',
                        { className: 'main-sidebar-inside' },
                        u.a.createElement(p.a, { sidebar: !0 }),
                        u.a.createElement(
                          'div',
                          { className: 'navigation-wrap' },
                          u.a.createElement(b.a, null),
                          u.a.createElement(f.a, null),
                          !o && u.a.createElement(d.a, null),
                          u.a.createElement(m.a, null),
                          u.a.createElement(
                            'div',
                            { className: 'navigation-bottom-wrap' },
                            !o && u.a.createElement(E.a, null),
                            ' ',
                            u.a.createElement(y.a, null)
                          )
                        )
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      n.a = _;
    },
    931: function(e, n, t) {
      'use strict';
      (function(e) {
        var r = t(0),
          o = t.n(r),
          a = t(1),
          i = t.n(a),
          u = t(59),
          c = (t.n(u), t(21)),
          l = (t.n(c), t(2)),
          s = t.n(l),
          p = t(4),
          f = t(20),
          d = t(932),
          m = t(933),
          b = t(934),
          y = t(935),
          E = t(936),
          h = t(937),
          v = t(939),
          O = t(941),
          _ = t(942),
          w = t(943),
          T = (function(e, n) {
            return Object.freeze(
              Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
            );
          })(
            ['\n  {\n    item @client {\n      id\n    }\n  }\n'],
            ['\n  {\n    item @client {\n      id\n    }\n  }\n']
          ),
          g = s()(T),
          P = function(e) {
            var n = e.client;
            return o.a.createElement(
              c.ApolloProvider,
              { client: n },
              o.a.createElement(p.a, { query: g }, function(e) {
                var n = e.data.item;
                return o.a.createElement(
                  r.Fragment,
                  null,
                  o.a.createElement(
                    'div',
                    { className: 'footer-left' },
                    o.a.createElement(f.a, {
                      label: 'Console',
                      classes: 'button-dark mini-button console-toggle-button'
                    }),
                    o.a.createElement(f.a, {
                      label: 'Assets',
                      classes: 'button-dark mini-button',
                      id: 'assets-link'
                    }),
                    n && o.a.createElement(d.a, { id: n.id }),
                    o.a.createElement(
                      f.a,
                      {
                        classes:
                          'button-dark mini-button keyboard-commands-button'
                      },
                      o.a.createElement('span', null, '⌘')
                    ),
                    o.a.createElement(m.a, { id: n ? n.id : void 0 })
                  ),
                  n &&
                    o.a.createElement(
                      'div',
                      { className: 'footer-right' },
                      o.a.createElement(b.a, { id: n.id }),
                      o.a.createElement(w.a, { id: n.id }),
                      o.a.createElement(y.a, { id: n.id }),
                      o.a.createElement(E.a, { id: n.id }),
                      o.a.createElement(v.a, { id: n.id }),
                      o.a.createElement(O.a, { id: n.id }),
                      o.a.createElement(_.a, { id: n.id }),
                      o.a.createElement(f.a, {
                        label: 'Export',
                        classes: 'button-dark mini-button export-button',
                        'data-dropdown': '#export-panel'
                      }),
                      o.a.createElement(f.a, {
                        label: 'Share',
                        classes: 'button-dark mini-button sharing-button',
                        'data-dropdown': '#sharing-panel'
                      }),
                      o.a.createElement(h.a, { id: n.id })
                    )
                );
              })
            );
          };
        (P.propTypes = { client: i.a.object }), (n.a = Object(u.hot)(e)(P));
      }.call(n, t(76)(e)));
    },
    932: function(e, n, t) {
      'use strict';
      var r = t(0),
        o = t.n(r),
        a = t(1),
        i = t.n(a),
        u = t(2),
        c = t.n(u),
        l = t(4),
        s = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query CommentsButtonPen($id: ID!) {\n    pen(id: $id) {\n      id\n      anon\n    }\n  }\n'
          ],
          [
            '\n  query CommentsButtonPen($id: ID!) {\n    pen(id: $id) {\n      id\n      anon\n    }\n  }\n'
          ]
        ),
        p = c()(s),
        f = function(e) {
          var n = e.id;
          return o.a.createElement(
            l.a,
            { query: p, variables: { id: n }, renderWhenDataReady: !0 },
            function(e) {
              return e.data.pen.anon
                ? null
                : o.a.createElement(
                    'button',
                    {
                      className: 'button button-dark mini-button',
                      id: 'view-details-button'
                    },
                    'Comments'
                  );
            }
          );
        };
      (f.propTypes = { id: i.a.string }), (n.a = f);
    },
    933: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      function i(e, n) {
        return Object.freeze(
          Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
        );
      }
      var u = t(0),
        c = t.n(u),
        l = t(1),
        s = t.n(l),
        p = t(2),
        f = t.n(p),
        d = t(4),
        m = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        b = i(
          [
            '\n  query FooterAdPenData($id: ID!) {\n    pen(id: $id) {\n      id\n      showAd\n    }\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ],
          [
            '\n  query FooterAdPenData($id: ID!) {\n    pen(id: $id) {\n      id\n      showAd\n    }\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ]
        ),
        y = i(
          [
            '\n  query FooterAdUserData {\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ],
          [
            '\n  query FooterAdUserData {\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ]
        ),
        E = f()(b),
        h = f()(y),
        v = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            m(n, [
              {
                key: 'render',
                value: function() {
                  return this.props.id
                    ? c.a.createElement(
                        d.a,
                        {
                          query: E,
                          variables: { id: this.props.id },
                          renderWhenDataReady: !0
                        },
                        function(e) {
                          var n = e.data;
                          return n.pen.showAd && n.sessionUser.anon
                            ? c.a.createElement('span', {
                                id: 'bsa-footer',
                                className: 'bsa-footer'
                              })
                            : null;
                        }
                      )
                    : c.a.createElement(
                        d.a,
                        { query: h, renderWhenDataReady: !0 },
                        function(e) {
                          return e.data.sessionUser.anon
                            ? c.a.createElement('span', {
                                id: 'bsa-footer',
                                className: 'bsa-footer'
                              })
                            : null;
                        }
                      );
                }
              }
            ]),
            n
          );
        })(u.Component);
      Object.defineProperty(v, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { id: s.a.string }
      }),
        (n.a = v);
    },
    934: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(4),
        d = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        m = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query LastSavedPen($id: ID!) {\n    pen(id: $id) {\n      id\n      lastSavedTimeAgo\n      ownedBySessionUser\n    }\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ],
          [
            '\n  query LastSavedPen($id: ID!) {\n    pen(id: $id) {\n      id\n      lastSavedTimeAgo\n      ownedBySessionUser\n    }\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ]
        ),
        b = p()(m),
        y = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            d(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    f.a,
                    {
                      query: b,
                      variables: { id: this.props.id },
                      renderWhenDataReady: !0
                    },
                    function(e) {
                      var n = e.data;
                      return !n.pen.ownedBySessionUser || n.sessionUser.anon
                        ? null
                        : u.a.createElement(
                            'span',
                            null,
                            'Last saved',
                            ' ',
                            u.a.createElement(
                              'span',
                              { id: 'last-saved-time-ago' },
                              n.pen.lastSavedTimeAgo
                            ),
                            ' ',
                            'ago'
                          );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(y, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { id: l.a.string }
      }),
        (n.a = y);
    },
    935: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(4),
        d = t(44),
        m = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        b = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query LiveViewPopoutButtonPen($id: ID!) {\n    pen(id: $id) {\n      id\n      ownedBySessionUser\n    }\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ],
          [
            '\n  query LiveViewPopoutButtonPen($id: ID!) {\n    pen(id: $id) {\n      id\n      ownedBySessionUser\n    }\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ]
        ),
        y = p()(b),
        E = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            m(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    f.a,
                    {
                      query: y,
                      variables: { id: this.props.id },
                      renderWhenDataReady: !0
                    },
                    function(e) {
                      var n = e.data;
                      return !n.pen.ownedBySessionUser || n.sessionUser.anon
                        ? null
                        : u.a.createElement(d.a, {
                            id: 'live-view-popout-button',
                            classes: 'button-dark mini-button',
                            title: 'Open Live View in a New Window',
                            icon: 'pop-out'
                          });
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(E, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { id: l.a.string }
      }),
        (n.a = E);
    },
    936: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(4),
        d = t(20),
        m = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        b = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query LiveViewPopoutButtonPen($id: ID!) {\n    pen(id: $id) {\n      id\n      ownedBySessionUser\n    }\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ],
          [
            '\n  query LiveViewPopoutButtonPen($id: ID!) {\n    pen(id: $id) {\n      id\n      ownedBySessionUser\n    }\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ]
        ),
        y = p()(b),
        E = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            m(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    f.a,
                    {
                      query: y,
                      variables: { id: this.props.id },
                      renderWhenDataReady: !0
                    },
                    function(e) {
                      var n = e.data;
                      return !n.pen.ownedBySessionUser || n.sessionUser.anon
                        ? null
                        : u.a.createElement(d.a, {
                            label: 'Delete',
                            classes:
                              'button-dark mini-button delete-button roll-red'
                          });
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(E, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { id: l.a.string }
      }),
        (n.a = E);
    },
    937: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(4),
        d = t(18),
        m = t(5),
        b = t(938),
        y =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          },
        E = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        h = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query SharePanelPenData($id: ID!) {\n    pen(id: $id) {\n      id\n      ownedBySessionUser\n      private\n      anon\n      urls {\n        zip\n      }\n    }\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ],
          [
            '\n  query SharePanelPenData($id: ID!) {\n    pen(id: $id) {\n      id\n      ownedBySessionUser\n      private\n      anon\n      urls {\n        zip\n      }\n    }\n    sessionUser {\n      id\n      anon\n    }\n  }\n'
          ]
        ),
        v = p()(h),
        O = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            E(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    f.a,
                    {
                      query: v,
                      variables: { id: this.props.id },
                      renderWhenDataReady: !0
                    },
                    function(e) {
                      var n = e.data,
                        t = n.sessionUser,
                        r = n.pen,
                        o = {};
                      return (
                        t.anon &&
                          ((o.classes = 'upsell'),
                          (o['data-url'] = '/ajax/upgrades/zip')),
                        u.a.createElement(
                          'section',
                          {
                            id: 'export-panel',
                            className: 'export-panel is-dropdown'
                          },
                          u.a.createElement(
                            'div',
                            { className: 'share-actions share-section' },
                            !t.anon &&
                              u.a.createElement(
                                d.a,
                                { id: 'share-gist' },
                                u.a.createElement(m.a, { icon: 'github' }),
                                'Save as GitHub Gist'
                              ),
                            u.a.createElement(
                              d.a,
                              y({ id: 'share-zip', href: r.urls.zip }, o),
                              u.a.createElement(m.a, {
                                icon: 'zip-badge',
                                width: '16',
                                height: '16'
                              }),
                              'Export .zip'
                            ),
                            u.a.createElement(b.a, { pen: r })
                          )
                        )
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(O, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { id: l.a.string.isRequired }
      }),
        (n.a = O);
    },
    938: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(18),
        p = t(5),
        f = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        d = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            f(n, [
              {
                key: 'render',
                value: function() {
                  var e = this.props.pen;
                  return e.anon
                    ? null
                    : e.private && !e.ownedBySessionUser
                    ? null
                    : u.a.createElement(
                        s.a,
                        { classes: 'embed-builder-button' },
                        u.a.createElement(p.a, {
                          icon: 'embed-badge',
                          width: '16',
                          height: '16'
                        }),
                        'Embed Pen'
                      );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(d, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { pen: l.a.object }
      }),
        (n.a = d);
    },
    939: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(940),
        p = t(2),
        f = t.n(p),
        d = t(4),
        m = t(18),
        b = t(5),
        y = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        E = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query SharePanelPenData($id: ID!) {\n    pen(id: $id) {\n      id\n      title\n    }\n  }\n'
          ],
          [
            '\n  query SharePanelPenData($id: ID!) {\n    pen(id: $id) {\n      id\n      title\n    }\n  }\n'
          ]
        ),
        h = f()(E),
        v = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            y(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    d.a,
                    {
                      query: h,
                      variables: { id: this.props.id },
                      renderWhenDataReady: !0
                    },
                    function(e) {
                      var n = e.data,
                        t = n.pen;
                      return u.a.createElement(
                        'section',
                        {
                          id: 'sharing-panel',
                          className: 'sharing-panel is-dropdown'
                        },
                        u.a.createElement(
                          'ul',
                          {
                            id: 'share-buttons',
                            className: 'share-buttons share-section'
                          },
                          u.a.createElement(
                            'li',
                            null,
                            u.a.createElement(
                              m.a,
                              {
                                target: '_blank',
                                rel: 'noopener',
                                url:
                                  'https://twitter.com/intent/tweet?text=' +
                                  encodeURIComponent(t.title) +
                                  '&url=' +
                                  document.location.href +
                                  '&via=CodePen'
                              },
                              u.a.createElement(b.a, { icon: 'twitter' }),
                              'Share on Twitter'
                            )
                          ),
                          u.a.createElement(
                            'li',
                            null,
                            u.a.createElement(
                              m.a,
                              {
                                target: '_blank',
                                rel: 'noopener',
                                url:
                                  'https://www.facebook.com/sharer/sharer.php?u=' +
                                  document.location.href
                              },
                              u.a.createElement(b.a, { icon: 'facebook' }),
                              'Share on Facebook'
                            )
                          )
                        ),
                        u.a.createElement(s.a, null)
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(v, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { id: l.a.string.isRequired }
      }),
        (n.a = v);
    },
    940: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(2),
        l = t.n(c),
        s = t(4),
        p = t(5),
        f = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        d = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query ShareSMSData {\n    sessionUser {\n      id\n      permissions {\n        canUseSms\n        canUseLive\n      }\n      smsLeft\n    }\n  }\n'
          ],
          [
            '\n  query ShareSMSData {\n    sessionUser {\n      id\n      permissions {\n        canUseSms\n        canUseLive\n      }\n      smsLeft\n    }\n  }\n'
          ]
        ),
        m = l()(d),
        b = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            f(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    s.a,
                    { query: m, renderWhenDataReady: !0 },
                    function(e) {
                      var n = e.data,
                        t = n.sessionUser;
                      return t.permissions.canUseSms
                        ? t.smsLeft > 0
                          ? u.a.createElement(
                              'form',
                              {
                                id: 'send-to-phone-form',
                                name: 'send-to-phone-form',
                                action: '#0',
                                className: 'send-to-phone share-section'
                              },
                              u.a.createElement(
                                'h5',
                                null,
                                'Send SMS with',
                                ' ',
                                t.permissions.canUseLive
                                  ? 'Live View'
                                  : 'Full Page',
                                ' ',
                                'URL to your phone',
                                u.a.createElement(
                                  'a',
                                  {
                                    href:
                                      'http://blog.codepen.io/documentation/features/sms/',
                                    className: 'inline-q',
                                    target: '_blank',
                                    rel: 'noopener'
                                  },
                                  u.a.createElement(p.a, { icon: 'help' })
                                )
                              ),
                              u.a.createElement(
                                'div',
                                { id: 'sms-phone' },
                                u.a.createElement('input', {
                                  type: 'tel',
                                  id: 'send-to-phone',
                                  placeholder: '1-555-555-5555',
                                  name: 'send-to-phone',
                                  required: 'required',
                                  title: 'Phone number in international format',
                                  className: 'send-to-phone-input fullwidth'
                                }),
                                u.a.createElement('input', {
                                  id: 'sms-send-button',
                                  type: 'submit',
                                  value: 'Send',
                                  className: 'button green button-fullwidth'
                                }),
                                u.a.createElement(
                                  'span',
                                  { className: 'mobile-sms-left' },
                                  u.a.createElement(
                                    'strong',
                                    {
                                      id: 'texts-left',
                                      className: 'texts-left'
                                    },
                                    t.smsLeft
                                  ),
                                  ' ',
                                  'left this month'
                                )
                              )
                            )
                          : u.a.createElement(
                              'p',
                              null,
                              "Sorry you've reached your text message limit."
                            )
                        : null;
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(b, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: {}
      }),
        (n.a = b);
    },
    941: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(4),
        d = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        m = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query PickIframePenData($id: ID!) {\n    pen(id: $id) {\n      id\n      private\n      ownedBySessionUser\n      anon\n    }\n    sessionUser {\n      id\n      anon\n      currentContext {\n        id\n        collections {\n          id\n          title\n          private\n        }\n      }\n    }\n  }\n'
          ],
          [
            '\n  query PickIframePenData($id: ID!) {\n    pen(id: $id) {\n      id\n      private\n      ownedBySessionUser\n      anon\n    }\n    sessionUser {\n      id\n      anon\n      currentContext {\n        id\n        collections {\n          id\n          title\n          private\n        }\n      }\n    }\n  }\n'
          ]
        ),
        b = p()(m),
        y = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            d(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    f.a,
                    {
                      query: b,
                      variables: { id: this.props.id },
                      renderWhenDataReady: !0,
                      fetchPolicy: 'cache-and-network',
                      partialRefetch: !0
                    },
                    function(e) {
                      var n = e.data,
                        t = n.sessionUser,
                        r = n.pen;
                      if (t.anon || r.anon) return null;
                      if (r.private && !r.ownedBySessionUser) return null;
                      var o = t.currentContext.collections.filter(function(e) {
                          return e.private;
                        }),
                        a = t.currentContext.collections.filter(function(e) {
                          return !e.private;
                        });
                      return u.a.createElement(
                        'select',
                        {
                          name: 'collection-choice',
                          'data-placeholder': 'Choose a Collection...',
                          className:
                            'button mini-button collections-select collection-choice'
                        },
                        u.a.createElement(
                          'option',
                          { value: '__choose__' },
                          'Collections'
                        ),
                        u.a.createElement(
                          'option',
                          { value: '__add__', className: 'option-green' },
                          '✳️ Create New Collection & Add'
                        ),
                        a.map(function(e) {
                          return u.a.createElement(
                            'option',
                            { key: e.id, value: e.id },
                            e.title
                          );
                        }),
                        o.map(function(e) {
                          return u.a.createElement(
                            'option',
                            { key: e.id, value: e.id },
                            '🔒 ',
                            e.title
                          );
                        })
                      );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(y, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { id: l.a.string.isRequired }
      }),
        (n.a = y);
    },
    942: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(4),
        d = t(20),
        m = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        b = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query EmbedButtonPen($id: ID!) {\n    pen(id: $id) {\n      id\n      ownedBySessionUser\n      private\n      anon\n    }\n  }\n'
          ],
          [
            '\n  query EmbedButtonPen($id: ID!) {\n    pen(id: $id) {\n      id\n      ownedBySessionUser\n      private\n      anon\n    }\n  }\n'
          ]
        ),
        y = p()(b),
        E = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            m(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    f.a,
                    {
                      query: y,
                      variables: { id: this.props.id },
                      renderWhenDataReady: !0
                    },
                    function(e) {
                      var n = e.data;
                      return n.pen.anon
                        ? null
                        : n.pen.private && !n.pen.ownedBySessionUser
                        ? null
                        : u.a.createElement(d.a, {
                            label: 'Embed',
                            classes:
                              'button-dark mini-button embed-builder-button'
                          });
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(E, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { id: l.a.string.isRequired }
      }),
        (n.a = E);
    },
    943: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(2),
        p = t.n(s),
        f = t(4),
        d = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        m = (function(e, n) {
          return Object.freeze(
            Object.defineProperties(e, { raw: { value: Object.freeze(n) } })
          );
        })(
          [
            '\n  query PickIframePenData($id: ID!) {\n    pen(id: $id) {\n      id\n      private\n      anon\n      pickIframeUrl\n    }\n    sessionUser {\n      id\n      picker\n    }\n  }\n'
          ],
          [
            '\n  query PickIframePenData($id: ID!) {\n    pen(id: $id) {\n      id\n      private\n      anon\n      pickIframeUrl\n    }\n    sessionUser {\n      id\n      picker\n    }\n  }\n'
          ]
        ),
        b = p()(m),
        y = (function(e) {
          function n() {
            return (
              r(this, n),
              o(
                this,
                (n.__proto__ || Object.getPrototypeOf(n)).apply(this, arguments)
              )
            );
          }
          return (
            a(n, e),
            d(n, [
              {
                key: 'render',
                value: function() {
                  return u.a.createElement(
                    f.a,
                    {
                      query: b,
                      variables: { id: this.props.id },
                      renderWhenDataReady: !0
                    },
                    function(e) {
                      var n = e.data;
                      return !n.sessionUser.picker ||
                        n.pen.private ||
                        n.pen.anon
                        ? null
                        : u.a.createElement(
                            'span',
                            {
                              style: {
                                position: 'relative',
                                display: 'inline-block'
                              }
                            },
                            u.a.createElement('iframe', {
                              src: n.pen.pickIframeUrl,
                              className: 'pick-iframe',
                              width: '100%',
                              height: '100',
                              frameBorder: '0'
                            })
                          );
                    }
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      Object.defineProperty(y, 'propTypes', {
        enumerable: !0,
        writable: !0,
        value: { id: l.a.string }
      }),
        (n.a = y);
    },
    944: function(e, n, t) {
      'use strict';
      (function(e) {
        function r(e) {
          var n = e.client,
            t = window.__profiled.hashid,
            r = window.__profiled.is_team ? 'TEAM' : 'USER';
          return a.a.createElement(
            l.ApolloProvider,
            { client: n },
            a.a.createElement(
              s.a,
              {
                query: d.FollowButtonOwner,
                variables: { id: t, ownerType: r },
                renderWhenDataReady: !0
              },
              function(e) {
                var n = e.data.owner;
                return a.a.createElement(
                  p.a,
                  { mutation: m.FollowOwner },
                  function(e) {
                    var o = n.followedBySessionContext;
                    return a.a.createElement(f.a, {
                      handleClick: function(a) {
                        a.preventDefault(),
                          e({
                            variables: { id: t, ownerType: r, follow: !o },
                            optimisticResponse: y(n, !o)
                          });
                      },
                      following: o
                    });
                  }
                );
              }
            )
          );
        }
        var o = t(0),
          a = t.n(o),
          i = t(1),
          u = t.n(i),
          c = t(59),
          l = (t.n(c), t(21)),
          s = (t.n(l), t(4)),
          p = t(12),
          f = t(945),
          d = t(946),
          m = (t.n(d), t(947)),
          b =
            (t.n(m),
            Object.assign ||
              function(e) {
                for (var n = 1; n < arguments.length; n++) {
                  var t = arguments[n];
                  for (var r in t)
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                }
                return e;
              }),
          y = function(e, n) {
            return {
              __typename: 'Mutation',
              followOwner: {
                owner: b({}, e, { followedBySessionContext: n }),
                __typename: 'Owner'
              }
            };
          };
        (r.propTypes = { client: u.a.object, color: u.a.string }),
          (n.a = Object(c.hot)(e)(r));
      }.call(n, t(76)(e)));
    },
    945: function(e, n, t) {
      'use strict';
      function r(e, n) {
        if (!(e instanceof n))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, n) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !n || ('object' != typeof n && 'function' != typeof n) ? e : n;
      }
      function a(e, n) {
        if ('function' != typeof n && null !== n)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof n
          );
        (e.prototype = Object.create(n && n.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })),
          n &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, n)
              : (e.__proto__ = n));
      }
      var i = t(0),
        u = t.n(i),
        c = t(1),
        l = t.n(c),
        s = t(8),
        p = t.n(s),
        f = t(5),
        d = t(18),
        m = (function() {
          function e(e, n) {
            for (var t = 0; t < n.length; t++) {
              var r = n[t];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function(n, t, r) {
            return t && e(n.prototype, t), r && e(n, r), n;
          };
        })(),
        b = (function(e) {
          function n() {
            var e, t, a, i;
            r(this, n);
            for (var u = arguments.length, c = Array(u), l = 0; l < u; l++)
              c[l] = arguments[l];
            return (
              (t = a = o(
                this,
                (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(
                  e,
                  [this].concat(c)
                )
              )),
              Object.defineProperty(a, 'state', {
                enumerable: !0,
                writable: !0,
                value: { hovered: !1 }
              }),
              (i = t),
              o(a, i)
            );
          }
          return (
            a(n, e),
            m(n, [
              {
                key: 'render',
                value: function() {
                  var e = this,
                    n = this.props.following,
                    t = p()('mini-button follow-user-button', { following: n });
                  return u.a.createElement(
                    d.a,
                    {
                      classes: t,
                      onClick: this.props.handleClick,
                      onMouseEnter: function() {
                        return e.setState({ hovered: !0 });
                      },
                      onMouseLeave: function() {
                        return e.setState({ hovered: !1 });
                      }
                    },
                    n && !this.state.hovered
                      ? u.a.createElement(f.a, { icon: 'check' })
                      : u.a.createElement(f.a, { icon: 'x' }),
                    n ? ' Following' : ' Follow'
                  );
                }
              }
            ]),
            n
          );
        })(i.Component);
      (b.propTypes = {
        color: l.a.string,
        following: l.a.bool,
        handleClick: l.a.func
      }),
        (n.a = b);
    },
    946: function(e, n) {
      function t(e, n) {
        if ('FragmentSpread' === e.kind) n.add(e.name.value);
        else if ('VariableDefinition' === e.kind) {
          var r = e.type;
          'NamedType' === r.kind && n.add(r.name.value);
        }
        e.selectionSet &&
          e.selectionSet.selections.forEach(function(e) {
            t(e, n);
          }),
          e.variableDefinitions &&
            e.variableDefinitions.forEach(function(e) {
              t(e, n);
            }),
          e.definitions &&
            e.definitions.forEach(function(e) {
              t(e, n);
            });
      }
      function r(e, n) {
        for (var t = 0; t < e.definitions.length; t++) {
          var r = e.definitions[t];
          if (r.name && r.name.value == n) return r;
        }
      }
      var o = {
        kind: 'Document',
        definitions: [
          {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FollowButtonOwner' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' }
                },
                type: {
                  kind: 'NonNullType',
                  type: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ID' }
                  }
                }
              },
              {
                kind: 'VariableDefinition',
                variable: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'ownerType' }
                },
                type: {
                  kind: 'NonNullType',
                  type: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Context' }
                  }
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'owner' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' }
                      }
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'ownerType' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'ownerType' }
                      }
                    }
                  ],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'id' },
                        arguments: [],
                        directives: []
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'followedBySessionContext'
                        },
                        arguments: [],
                        directives: []
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        loc: { start: 0, end: 142 }
      };
      o.loc.source = {
        body:
          'query FollowButtonOwner($id: ID!, $ownerType: Context!) {\n  owner(id: $id, ownerType: $ownerType) {\n    id\n    followedBySessionContext\n  }\n}\n',
        name: 'GraphQL request',
        locationOffset: { line: 1, column: 1 }
      };
      var a = {};
      !(function() {
        o.definitions.forEach(function(e) {
          if (e.name) {
            var n = new Set();
            t(e, n), (a[e.name.value] = n);
          }
        });
      })(),
        (e.exports = o),
        (e.exports.FollowButtonOwner = (function(e, n) {
          var t = { kind: e.kind, definitions: [r(e, n)] };
          e.hasOwnProperty('loc') && (t.loc = e.loc);
          for (
            var o = a[n] || new Set(), i = new Set(), u = new Set(o);
            u.size > 0;

          ) {
            var c = u;
            (u = new Set()),
              c.forEach(function(e) {
                if (!i.has(e)) {
                  i.add(e);
                  (a[e] || new Set()).forEach(function(e) {
                    u.add(e);
                  });
                }
              });
          }
          return (
            i.forEach(function(n) {
              var o = r(e, n);
              o && t.definitions.push(o);
            }),
            t
          );
        })(o, 'FollowButtonOwner'));
    },
    947: function(e, n) {
      function t(e, n) {
        if ('FragmentSpread' === e.kind) n.add(e.name.value);
        else if ('VariableDefinition' === e.kind) {
          var r = e.type;
          'NamedType' === r.kind && n.add(r.name.value);
        }
        e.selectionSet &&
          e.selectionSet.selections.forEach(function(e) {
            t(e, n);
          }),
          e.variableDefinitions &&
            e.variableDefinitions.forEach(function(e) {
              t(e, n);
            }),
          e.definitions &&
            e.definitions.forEach(function(e) {
              t(e, n);
            });
      }
      function r(e, n) {
        for (var t = 0; t < e.definitions.length; t++) {
          var r = e.definitions[t];
          if (r.name && r.name.value == n) return r;
        }
      }
      var o = {
        kind: 'Document',
        definitions: [
          {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'FollowOwner' },
            variableDefinitions: [
              {
                kind: 'VariableDefinition',
                variable: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' }
                },
                type: {
                  kind: 'NonNullType',
                  type: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ID' }
                  }
                }
              },
              {
                kind: 'VariableDefinition',
                variable: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'ownerType' }
                },
                type: {
                  kind: 'NonNullType',
                  type: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Context' }
                  }
                }
              },
              {
                kind: 'VariableDefinition',
                variable: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'follow' }
                },
                type: {
                  kind: 'NonNullType',
                  type: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'Boolean' }
                  }
                }
              }
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'followOwner' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' }
                      }
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'ownerType' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'ownerType' }
                      }
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'follow' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'follow' }
                      }
                    }
                  ],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'owner' },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                              arguments: [],
                              directives: []
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'followedBySessionContext'
                              },
                              arguments: [],
                              directives: []
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        loc: { start: 0, end: 203 }
      };
      o.loc.source = {
        body:
          'mutation FollowOwner($id: ID!, $ownerType: Context!, $follow: Boolean!) {\n  followOwner(id: $id, ownerType: $ownerType, follow: $follow) {\n    owner {\n      id\n      followedBySessionContext\n    }\n  }\n}\n',
        name: 'GraphQL request',
        locationOffset: { line: 1, column: 1 }
      };
      var a = {};
      !(function() {
        o.definitions.forEach(function(e) {
          if (e.name) {
            var n = new Set();
            t(e, n), (a[e.name.value] = n);
          }
        });
      })(),
        (e.exports = o),
        (e.exports.FollowOwner = (function(e, n) {
          var t = { kind: e.kind, definitions: [r(e, n)] };
          e.hasOwnProperty('loc') && (t.loc = e.loc);
          for (
            var o = a[n] || new Set(), i = new Set(), u = new Set(o);
            u.size > 0;

          ) {
            var c = u;
            (u = new Set()),
              c.forEach(function(e) {
                if (!i.has(e)) {
                  i.add(e);
                  (a[e] || new Set()).forEach(function(e) {
                    u.add(e);
                  });
                }
              });
          }
          return (
            i.forEach(function(n) {
              var o = r(e, n);
              o && t.definitions.push(o);
            }),
            t
          );
        })(o, 'FollowOwner'));
    },
    948: function(e, n, t) {
      'use strict';
      function r(e) {
        return function() {
          var n = e.apply(this, arguments);
          return new Promise(function(e, t) {
            function r(o, a) {
              try {
                var i = n[o](a),
                  u = i.value;
              } catch (e) {
                return void t(e);
              }
              if (!i.done)
                return Promise.resolve(u).then(
                  function(e) {
                    r('next', e);
                  },
                  function(e) {
                    r('throw', e);
                  }
                );
              e(u);
            }
            return r('next');
          });
        };
      }
      var o = t(949),
        a = t(43),
        i = this,
        u = !1,
        c = 0,
        l = (function() {
          var e = r(
            regeneratorRuntime.mark(function e() {
              var n;
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          u || ((u = !0), Object(o.a)()),
                          (n = function e(n, t) {
                            if (
                              ((c += 1),
                              'function' == typeof window.heap.identify)
                            )
                              return void n();
                            c > 20 &&
                              t(
                                new Error(
                                  'Failed to load Heap analytics in time'
                                )
                              ),
                              setTimeout(function() {
                                return e(n, t);
                              }, 200);
                          }),
                          e.abrupt(
                            'return',
                            new Promise(function(e, t) {
                              n(e, t);
                            })
                          )
                        );
                      case 3:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                i
              );
            })
          );
          return function() {
            return e.apply(this, arguments);
          };
        })(),
        s = function() {
          heap.identify(window.__user.hashid),
            heap.addUserProperties({
              paid: window.__user.paid,
              teamId: window.__user.current_team_id,
              tier: window.__user.tier
            });
        },
        p = (function() {
          var e = r(
            regeneratorRuntime.mark(function e() {
              return regeneratorRuntime.wrap(
                function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.prev = 0), (e.next = 3), l();
                      case 3:
                        s(), (e.next = 8);
                        break;
                      case 6:
                        (e.prev = 6), (e.t0 = e.catch(0));
                      case 8:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                i,
                [[0, 6]]
              );
            })
          );
          return function() {
            return e.apply(this, arguments);
          };
        })();
      !(function() {
        var e = r(
          regeneratorRuntime.mark(function e(n) {
            var t;
            return regeneratorRuntime.wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (1 !== navigator.doNotTrack) {
                        e.next = 2;
                        break;
                      }
                      return e.abrupt('return');
                    case 2:
                      if (window.__analytics) {
                        e.next = 4;
                        break;
                      }
                      return e.abrupt('return');
                    case 4:
                      if (!window.__analytics.enabled) {
                        e.next = 14;
                        break;
                      }
                      return (e.prev = 5), (e.next = 8), Object(a.c)();
                    case 8:
                      (t = e.sent), t.enabled && n(), (e.next = 14);
                      break;
                    case 12:
                      (e.prev = 12), (e.t0 = e.catch(5));
                    case 14:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              i,
              [[5, 12]]
            );
          })
        );
        return function(n) {
          return e.apply(this, arguments);
        };
      })()(p);
    },
    949: function(e, n, t) {
      'use strict';
      t.d(n, 'a', function() {
        return r;
      });
      var r = function() {
        (window.heap = window.heap || []),
          (heap.load = function(e, n) {
            (window.heap.appid = e), (window.heap.config = n = n || {});
            var t = n.forceSSL || 'https:' === document.location.protocol,
              r = document.createElement('script');
            (r.type = 'text/javascript'),
              (r.async = !0),
              (r.src =
                (t ? 'https:' : 'http:') +
                '//cdn.heapanalytics.com/js/heap-' +
                e +
                '.js');
            var o = document.getElementsByTagName('script')[0];
            o.parentNode.insertBefore(r, o);
            for (
              var a = [
                  'addEventProperties',
                  'addUserProperties',
                  'clearEventProperties',
                  'identify',
                  'resetIdentity',
                  'removeEventProperty',
                  'setEventProperties',
                  'track',
                  'unsetEventProperty'
                ],
                i = 0;
              i < a.length;
              i++
            )
              heap[a[i]] = (function(e) {
                return function() {
                  heap.push(
                    [e].concat(Array.prototype.slice.call(arguments, 0))
                  );
                };
              })(a[i]);
          }),
          heap.load(window.__analytics.heapEnvironmentId);
      };
    }
  },
  [904]
);
