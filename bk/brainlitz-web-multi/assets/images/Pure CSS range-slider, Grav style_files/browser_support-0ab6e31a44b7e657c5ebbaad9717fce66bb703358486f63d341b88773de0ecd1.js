!(function() {
  function e(e) {
    if ('string' == typeof e) {
      var n = e.substring(0, 1);
      if ('[' === n || '{' === n) return !0;
    }
    return !1;
  }
  var n = document.getElementById('init-data');
  if (n) {
    var t = n.getAttribute('value');
    if ('string' == typeof t) {
      var r = JSON.parse(t);
      for (var i in r) {
        var s = r[i];
        window[i] = e(s) ? JSON.parse(s) : s;
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
if (
  NastyBrowserSniffing.isIE11OrLess() &&
  -1 === window.location.href.indexOf('/login') &&
  -1 === window.location.href.indexOf('/unsupported')
) {
  var editorPage =
      window.location.href.indexOf('/pen') > -1 ||
      window.location.href.indexOf('/project/editor') > -1 ||
      window.location.href.indexOf('/project/live'),
    redirect = '/unsupported/';
  editorPage &&
    'string' == typeof initData &&
    window.__debug_redirect &&
    (redirect = '/unsupported?redirect=' + encodeURI(window.__debug_redirect)),
    (window.location = redirect);
}
