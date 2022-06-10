/*!
 * tingle.js
 * @author  robin_parisi
 * @version 0.11.0
 * @url
 */
var a, b, QRCode;
!function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.tingle = e()
}(this, (function() {
        var t = function() {
            var t, e = document.createElement("tingle-test-transition"), i = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
            for (t in i)
                if (void 0 !== e.style[t])
                    return i[t]
        }();
        function e(t) {
            this.opts = function() {
                for (var t = 1; t < arguments.length; t++)
                    for (var e in arguments[t])
                        arguments[t].hasOwnProperty(e) && (arguments[0][e] = arguments[t][e]);
                return arguments[0]
            }({}, {
                onClose: null,
                onOpen: null,
                beforeClose: null,
                stickyFooter: !1,
                footer: !1,
                cssClass: [],
                closeLabel: "Close",
                closeMethods: ["overlay", "button", "escape"]
            }, t),
                this.init()
        }
        function i() {
            this.modalBoxFooter && (this.modalBoxFooter.style.width = this.modalBox.clientWidth + "px",
                this.modalBoxFooter.style.left = this.modalBox.offsetLeft + "px")
        }
        function s() {
            this.modal = document.createElement("div"),
                this.modal.classList.add("tingle-modal"),
            0 !== this.opts.closeMethods.length && -1 !== this.opts.closeMethods.indexOf("overlay") || this.modal.classList.add("tingle-modal--noOverlayClose"),
                this.modal.style.display = "none",
                this.opts.cssClass.forEach((function(t) {
                        "string" == typeof t && this.modal.classList.add(t)
                    }
                ), this),
            -1 !== this.opts.closeMethods.indexOf("button") && (this.modalClosectznbtn = document.createElement("button"),
                this.modalClosectznbtn.classList.add("tingle-modal__close"),
                this.modalClosectznbtnIcon = document.createElement("span"),
                this.modalClosectznbtnIcon.classList.add("tingle-modal__closeIcon"),
                this.modalClosectznbtnIcon.innerHTML = "×",
                this.modalClosectznbtnLabel = document.createElement("span"),
                this.modalClosectznbtnLabel.classList.add("tingle-modal__closeLabel"),
                this.modalClosectznbtnLabel.innerHTML = this.opts.closeLabel,
                this.modalClosectznbtn.appendChild(this.modalClosectznbtnIcon),
                this.modalClosectznbtn.appendChild(this.modalClosectznbtnLabel)),
                this.modalBox = document.createElement("div"),
                this.modalBox.classList.add("tingle-modal-box"),
                this.modalBoxContent = document.createElement("div"),
                this.modalBoxContent.classList.add("tingle-modal-box__content"),
                this.modalBox.appendChild(this.modalBoxContent),
            -1 !== this.opts.closeMethods.indexOf("button") && this.modal.appendChild(this.modalClosectznbtn),
                this.modal.appendChild(this.modalBox)
        }
        function r() {
            this.modalBoxFooter = document.createElement("div"),
                this.modalBoxFooter.classList.add("tingle-modal-box__footer"),
                this.modalBox.appendChild(this.modalBoxFooter)
        }
        function a() {
            this._events = {
                clickClosectznbtn: this.close.bind(this),
                clickOverlay: o.bind(this),
                resize: this.checkOverflow.bind(this),
                keyboardNav: n.bind(this)
            },
            -1 !== this.opts.closeMethods.indexOf("button") && this.modalClosectznbtn.addEventListener("click", this._events.clickClosectznbtn),
                this.modal.addEventListener("mousedown", this._events.clickOverlay),
                window.addEventListener("resize", this._events.resize),
                document.addEventListener("keydown", this._events.keyboardNav)
        }
        function n(t) {
            -1 !== this.opts.closeMethods.indexOf("escape") && 27 === t.which && this.isOpen() && this.close()
        }
        function o(t) {
            -1 !== this.opts.closeMethods.indexOf("overlay") && !function(t, e) {
                for (; (t = t.parentElement) && !t.classList.contains(e); )
                    ;
                return t
            }(t.target, "tingle-modal") && t.clientX < this.modal.clientWidth && this.close()
        }
        function h() {
            -1 !== this.opts.closeMethods.indexOf("button") && this.modalClosectznbtn.removeEventListener("click", this._events.clickClosectznbtn),
                this.modal.removeEventListener("mousedown", this._events.clickOverlay),
                window.removeEventListener("resize", this._events.resize),
                document.removeEventListener("keydown", this._events.keyboardNav)
        }
        return e.prototype.init = function() {
            this.modal || (s.call(this),
                a.call(this),
                document.body.insertBefore(this.modal, document.body.firstChild),
            this.opts.footer && this.addFooter())
        }
            ,
            e.prototype.destroy = function() {
                null !== this.modal && (h.call(this),
                    this.modal.parentNode.removeChild(this.modal),
                    this.modal = null)
            }
            ,
            e.prototype.open = function() {
                this.modal.style.removeProperty ? this.modal.style.removeProperty("display") : this.modal.style.removeAttribute("display"),
                    document.body.classList.add("tingle-enabled"),
                    this.setStickyFooter(this.opts.stickyFooter),
                    this.modal.classList.add("tingle-modal--visible");
                var e = this;
                t ? this.modal.addEventListener(t, (function i() {
                        "function" == typeof e.opts.onOpen && e.opts.onOpen.call(e),
                            e.modal.removeEventListener(t, i, !1)
                    }
                ), !1) : "function" == typeof e.opts.onOpen && e.opts.onOpen.call(e),
                    this.checkOverflow()
            }
            ,
            e.prototype.isOpen = function() {
                return !!this.modal.classList.contains("tingle-modal--visible")
            }
            ,
            e.prototype.close = function() {
                if ("function" == typeof this.opts.beforeClose && !this.opts.beforeClose.call(this))
                    return;
                document.body.classList.remove("tingle-enabled"),
                    this.modal.classList.remove("tingle-modal--visible");
                var e = this;
                t ? this.modal.addEventListener(t, (function i() {
                        e.modal.removeEventListener(t, i, !1),
                            e.modal.style.display = "none",
                        "function" == typeof e.opts.onClose && e.opts.onClose.call(this)
                    }
                ), !1) : (e.modal.style.display = "none",
                "function" == typeof e.opts.onClose && e.opts.onClose.call(this))
            }
            ,
            e.prototype.setContent = function(t) {
                "string" == typeof t ? this.modalBoxContent.innerHTML = t : (this.modalBoxContent.innerHTML = "",
                    this.modalBoxContent.appendChild(t))
            }
            ,
            e.prototype.getContent = function() {
                return this.modalBoxContent
            }
            ,
            e.prototype.addFooter = function() {
                r.call(this)
            }
            ,
            e.prototype.setFooterContent = function(t) {
                this.modalBoxFooter.innerHTML = t
            }
            ,
            e.prototype.getFooterContent = function() {
                return this.modalBoxFooter
            }
            ,
            e.prototype.setStickyFooter = function(t) {
                this.isOverflow() || (t = !1),
                    t ? this.modalBox.contains(this.modalBoxFooter) && (this.modalBox.removeChild(this.modalBoxFooter),
                        this.modal.appendChild(this.modalBoxFooter),
                        this.modalBoxFooter.classList.add("tingle-modal-box__footer--sticky"),
                        i.call(this),
                        this.modalBoxContent.style["padding-bottom"] = this.modalBoxFooter.clientHeight + 20 + "px") : this.modalBoxFooter && (this.modalBox.contains(this.modalBoxFooter) || (this.modal.removeChild(this.modalBoxFooter),
                        this.modalBox.appendChild(this.modalBoxFooter),
                        this.modalBoxFooter.style.width = "auto",
                        this.modalBoxFooter.style.left = "",
                        this.modalBoxContent.style["padding-bottom"] = "",
                        this.modalBoxFooter.classList.remove("tingle-modal-box__footer--sticky")))
            }
            ,
            e.prototype.addFooterctznbtn = function(t, e, i) {
                var s = document.createElement("button");
                return s.innerHTML = t,
                    s.addEventListener("click", i),
                "string" == typeof e && e.length && e.split(" ").forEach((function(t) {
                        s.classList.add(t)
                    }
                )),
                    this.modalBoxFooter.appendChild(s),
                    s
            }
            ,
            e.prototype.resize = function() {
                console.warn("Resize is deprecated and will be removed in version 1.0")
            }
            ,
            e.prototype.isOverflow = function() {
                var t = window.innerHeight;
                return this.modalBox.clientHeight >= t
            }
            ,
            e.prototype.checkOverflow = function() {
                this.modal.classList.contains("tingle-modal--visible") && (this.isOverflow() ? this.modal.classList.add("tingle-modal--overflow") : this.modal.classList.remove("tingle-modal--overflow"),
                    !this.isOverflow() && this.opts.stickyFooter ? this.setStickyFooter(!1) : this.isOverflow() && this.opts.stickyFooter && (i.call(this),
                        this.setStickyFooter(!0)))
            }
            ,
            {
                modal: e
            }
    }
)),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.moment = e()
    }(this, (function() {
            "use strict";
            var t, e;
            function i() {
                return t.apply(null, arguments)
            }
            function s(t) {
                return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t)
            }
            function r(t) {
                return null != t && "[object Object]" === Object.prototype.toString.call(t)
            }
            function a(t) {
                return void 0 === t
            }
            function n(t) {
                return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t)
            }
            function o(t) {
                return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
            }
            function h(t, e) {
                var i, s = [];
                for (i = 0; i < t.length; ++i)
                    s.push(e(t[i], i));
                return s
            }
            function l(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            function p(t, e) {
                for (var i in e)
                    l(e, i) && (t[i] = e[i]);
                return l(e, "toString") && (t.toString = e.toString),
                l(e, "valueOf") && (t.valueOf = e.valueOf),
                    t
            }
            function f(t, e, i, s) {
                return xe(t, e, i, s, !0).utc()
            }
            function d(t) {
                return null == t._pf && (t._pf = {
                    empty: !1,
                    unusedTokens: [],
                    unusedInput: [],
                    overflow: -2,
                    charsLeftOver: 0,
                    nullInput: !1,
                    invalidMonth: null,
                    invalidFormat: !1,
                    userInvalidated: !1,
                    iso: !1,
                    parsedDateParts: [],
                    meridiem: null,
                    rfc2822: !1,
                    weekdayMismatch: !1
                }),
                    t._pf
            }
            function m(t) {
                if (null == t._isValid) {
                    var i = d(t)
                        , s = e.call(i.parsedDateParts, (function(t) {
                            return null != t
                        }
                    ))
                        , r = !isNaN(t._d.getTime()) && i.overflow < 0 && !i.empty && !i.invalidMonth && !i.invalidWeekday && !i.weekdayMismatch && !i.nullInput && !i.invalidFormat && !i.userInvalidated && (!i.meridiem || i.meridiem && s);
                    if (t._strict && (r = r && 0 === i.charsLeftOver && 0 === i.unusedTokens.length && void 0 === i.bigHour),
                    null != Object.isFrozen && Object.isFrozen(t))
                        return r;
                    t._isValid = r
                }
                return t._isValid
            }
            function c(t) {
                var e = f(NaN);
                return null != t ? p(d(e), t) : d(e).userInvalidated = !0,
                    e
            }
            e = Array.prototype.some ? Array.prototype.some : function(t) {
                for (var e = Object(this), i = e.length >>> 0, s = 0; s < i; s++)
                    if (s in e && t.call(this, e[s], s, e))
                        return !0;
                return !1
            }
            ;
            var u = i.momentProperties = [];
            function y(t, e) {
                var i, s, r;
                if (a(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject),
                a(e._i) || (t._i = e._i),
                a(e._f) || (t._f = e._f),
                a(e._l) || (t._l = e._l),
                a(e._strict) || (t._strict = e._strict),
                a(e._tzm) || (t._tzm = e._tzm),
                a(e._isUTC) || (t._isUTC = e._isUTC),
                a(e._offset) || (t._offset = e._offset),
                a(e._pf) || (t._pf = d(e)),
                a(e._locale) || (t._locale = e._locale),
                u.length > 0)
                    for (i = 0; i < u.length; i++)
                        a(r = e[s = u[i]]) || (t[s] = r);
                return t
            }
            var g = !1;
            function v(t) {
                y(this, t),
                    this._d = new Date(null != t._d ? t._d.getTime() : NaN),
                this.isValid() || (this._d = new Date(NaN)),
                !1 === g && (g = !0,
                    i.updateOffset(this),
                    g = !1)
            }
            function _(t) {
                return t instanceof v || null != t && null != t._isAMomentObject
            }
            function b(t) {
                return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
            }
            function x(t) {
                var e = +t
                    , i = 0;
                return 0 !== e && isFinite(e) && (i = b(e)),
                    i
            }
            function S(t, e, i) {
                var s, r = Math.min(t.length, e.length), a = Math.abs(t.length - e.length), n = 0;
                for (s = 0; s < r; s++)
                    (i && t[s] !== e[s] || !i && x(t[s]) !== x(e[s])) && n++;
                return n + a
            }
            function E(t) {
                !1 === i.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
            }
            function P(t, e) {
                var s = !0;
                return p((function() {
                        if (null != i.deprecationHandler && i.deprecationHandler(null, t),
                            s) {
                            for (var r, a = [], n = 0; n < arguments.length; n++) {
                                if (r = "",
                                "object" == typeof arguments[n]) {
                                    for (var o in r += "\n[" + n + "] ",
                                        arguments[0])
                                        r += o + ": " + arguments[0][o] + ", ";
                                    r = r.slice(0, -2)
                                } else
                                    r = arguments[n];
                                a.push(r)
                            }
                            E(t + "\nArguments: " + Array.prototype.slice.call(a).join("") + "\n" + (new Error).stack),
                                s = !1
                        }
                        return e.apply(this, arguments)
                    }
                ), e)
            }
            var C, k = {};
            function M(t, e) {
                null != i.deprecationHandler && i.deprecationHandler(t, e),
                k[t] || (E(e),
                    k[t] = !0)
            }
            function D(t) {
                return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t)
            }
            function w(t, e) {
                var i, s = p({}, t);
                for (i in e)
                    l(e, i) && (r(t[i]) && r(e[i]) ? (s[i] = {},
                        p(s[i], t[i]),
                        p(s[i], e[i])) : null != e[i] ? s[i] = e[i] : delete s[i]);
                for (i in t)
                    l(t, i) && !l(e, i) && r(t[i]) && (s[i] = p({}, s[i]));
                return s
            }
            function A(t) {
                null != t && this.set(t)
            }
            i.suppressDeprecationWarnings = !1,
                i.deprecationHandler = null,
                C = Object.keys ? Object.keys : function(t) {
                    var e, i = [];
                    for (e in t)
                        l(t, e) && i.push(e);
                    return i
                }
            ;
            var T = {};
            function F(t, e) {
                var i = t.toLowerCase();
                T[i] = T[i + "s"] = T[e] = t
            }
            function I(t) {
                return "string" == typeof t ? T[t] || T[t.toLowerCase()] : void 0
            }
            function R(t) {
                var e, i, s = {};
                for (i in t)
                    l(t, i) && (e = I(i)) && (s[e] = t[i]);
                return s
            }
            var B = {};
            function L(t, e) {
                B[t] = e
            }
            function V(t, e, i) {
                var s = "" + Math.abs(t)
                    , r = e - s.length;
                return (t >= 0 ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + s
            }
            var O = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g
                , G = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g
                , N = {}
                , z = {};
            function H(t, e, i, s) {
                var r = s;
                "string" == typeof s && (r = function() {
                        return this[s]()
                    }
                ),
                t && (z[t] = r),
                e && (z[e[0]] = function() {
                        return V(r.apply(this, arguments), e[1], e[2])
                    }
                ),
                i && (z[i] = function() {
                        return this.localeData().ordinal(r.apply(this, arguments), t)
                    }
                )
            }
            function Y(t, e) {
                return t.isValid() ? (e = j(e, t.localeData()),
                    N[e] = N[e] || function(t) {
                        var e, i, s, r = t.match(O);
                        for (e = 0,
                                 i = r.length; e < i; e++)
                            z[r[e]] ? r[e] = z[r[e]] : r[e] = (s = r[e]).match(/\[[\s\S]/) ? s.replace(/^\[|\]$/g, "") : s.replace(/\\/g, "");
                        return function(e) {
                            var s, a = "";
                            for (s = 0; s < i; s++)
                                a += D(r[s]) ? r[s].call(e, t) : r[s];
                            return a
                        }
                    }(e),
                    N[e](t)) : t.localeData().invalidDate()
            }
            function j(t, e) {
                var i = 5;
                function s(t) {
                    return e.longDateFormat(t) || t
                }
                for (G.lastIndex = 0; i >= 0 && G.test(t); )
                    t = t.replace(G, s),
                        G.lastIndex = 0,
                        i -= 1;
                return t
            }
            var W = /\d/
                , q = /\d\d/
                , U = /\d{3}/
                , X = /\d{4}/
                , Z = /[+-]?\d{6}/
                , K = /\d\d?/
                , $ = /\d\d\d\d?/
                , J = /\d\d\d\d\d\d?/
                , Q = /\d{1,3}/
                , tt = /\d{1,4}/
                , et = /[+-]?\d{1,6}/
                , it = /\d+/
                , st = /[+-]?\d+/
                , rt = /Z|[+-]\d\d:?\d\d/gi
                , at = /Z|[+-]\d\d(?::?\d\d)?/gi
                , nt = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i
                , ot = {};
            function ht(t, e, i) {
                ot[t] = D(e) ? e : function(t, s) {
                    return t && i ? i : e
                }
            }
            function lt(t, e) {
                return l(ot, t) ? ot[t](e._strict, e._locale) : new RegExp(pt(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, (function(t, e, i, s, r) {
                        return e || i || s || r
                    }
                ))))
            }
            function pt(t) {
                return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
            }
            var ft = {};
            function dt(t, e) {
                var i, s = e;
                for ("string" == typeof t && (t = [t]),
                     n(e) && (s = function(t, i) {
                             i[e] = x(t)
                         }
                     ),
                         i = 0; i < t.length; i++)
                    ft[t[i]] = s
            }
            function mt(t, e) {
                dt(t, (function(t, i, s, r) {
                        s._w = s._w || {},
                            e(t, s._w, s, r)
                    }
                ))
            }
            function ct(t, e, i) {
                null != e && l(ft, t) && ft[t](e, i._a, i, t)
            }
            function ut(t) {
                return yt(t) ? 366 : 365
            }
            function yt(t) {
                return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
            }
            H("Y", 0, 0, (function() {
                    var t = this.year();
                    return t <= 9999 ? "" + t : "+" + t
                }
            )),
                H(0, ["YY", 2], 0, (function() {
                        return this.year() % 100
                    }
                )),
                H(0, ["YYYY", 4], 0, "year"),
                H(0, ["YYYYY", 5], 0, "year"),
                H(0, ["YYYYYY", 6, !0], 0, "year"),
                F("year", "y"),
                L("year", 1),
                ht("Y", st),
                ht("YY", K, q),
                ht("YYYY", tt, X),
                ht("YYYYY", et, Z),
                ht("YYYYYY", et, Z),
                dt(["YYYYY", "YYYYYY"], 0),
                dt("YYYY", (function(t, e) {
                        e[0] = 2 === t.length ? i.parseTwoDigitYear(t) : x(t)
                    }
                )),
                dt("YY", (function(t, e) {
                        e[0] = i.parseTwoDigitYear(t)
                    }
                )),
                dt("Y", (function(t, e) {
                        e[0] = parseInt(t, 10)
                    }
                )),
                i.parseTwoDigitYear = function(t) {
                    return x(t) + (x(t) > 68 ? 1900 : 2e3)
                }
            ;
            var gt, vt = _t("FullYear", !0);
            function _t(t, e) {
                return function(s) {
                    return null != s ? (xt(this, t, s),
                        i.updateOffset(this, e),
                        this) : bt(this, t)
                }
            }
            function bt(t, e) {
                return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN
            }
            function xt(t, e, i) {
                t.isValid() && !isNaN(i) && ("FullYear" === e && yt(t.year()) ? t._d["set" + (t._isUTC ? "UTC" : "") + e](i, t.month(), St(i, t.month())) : t._d["set" + (t._isUTC ? "UTC" : "") + e](i))
            }
            function St(t, e) {
                if (isNaN(t) || isNaN(e))
                    return NaN;
                var i, s = (e % (i = 12) + i) % i;
                return t += (e - s) / 12,
                    1 === s ? yt(t) ? 29 : 28 : 31 - s % 7 % 2
            }
            gt = Array.prototype.indexOf ? Array.prototype.indexOf : function(t) {
                var e;
                for (e = 0; e < this.length; ++e)
                    if (this[e] === t)
                        return e;
                return -1
            }
                ,
                H("M", ["MM", 2], "Mo", (function() {
                        return this.month() + 1
                    }
                )),
                H("MMM", 0, 0, (function(t) {
                        return this.localeData().monthsShort(this, t)
                    }
                )),
                H("MMMM", 0, 0, (function(t) {
                        return this.localeData().months(this, t)
                    }
                )),
                F("month", "M"),
                L("month", 8),
                ht("M", K),
                ht("MM", K, q),
                ht("MMM", (function(t, e) {
                        return e.monthsShortRegex(t)
                    }
                )),
                ht("MMMM", (function(t, e) {
                        return e.monthsRegex(t)
                    }
                )),
                dt(["M", "MM"], (function(t, e) {
                        e[1] = x(t) - 1
                    }
                )),
                dt(["MMM", "MMMM"], (function(t, e, i, s) {
                        var r = i._locale.monthsParse(t, s, i._strict);
                        null != r ? e[1] = r : d(i).invalidMonth = t
                    }
                ));
            var Et = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/
                , Pt = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
            var Ct = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
            function kt(t, e, i) {
                var s, r, a, n = t.toLocaleLowerCase();
                if (!this._monthsParse)
                    for (this._monthsParse = [],
                             this._longMonthsParse = [],
                             this._shortMonthsParse = [],
                             s = 0; s < 12; ++s)
                        a = f([2e3, s]),
                            this._shortMonthsParse[s] = this.monthsShort(a, "").toLocaleLowerCase(),
                            this._longMonthsParse[s] = this.months(a, "").toLocaleLowerCase();
                return i ? "MMM" === e ? -1 !== (r = gt.call(this._shortMonthsParse, n)) ? r : null : -1 !== (r = gt.call(this._longMonthsParse, n)) ? r : null : "MMM" === e ? -1 !== (r = gt.call(this._shortMonthsParse, n)) || -1 !== (r = gt.call(this._longMonthsParse, n)) ? r : null : -1 !== (r = gt.call(this._longMonthsParse, n)) || -1 !== (r = gt.call(this._shortMonthsParse, n)) ? r : null
            }
            function Mt(t, e) {
                var i;
                if (!t.isValid())
                    return t;
                if ("string" == typeof e)
                    if (/^\d+$/.test(e))
                        e = x(e);
                    else if (!n(e = t.localeData().monthsParse(e)))
                        return t;
                return i = Math.min(t.date(), St(t.year(), e)),
                    t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i),
                    t
            }
            function Dt(t) {
                return null != t ? (Mt(this, t),
                    i.updateOffset(this, !0),
                    this) : bt(this, "Month")
            }
            var wt = nt;
            var At = nt;
            function Tt() {
                function t(t, e) {
                    return e.length - t.length
                }
                var e, i, s = [], r = [], a = [];
                for (e = 0; e < 12; e++)
                    i = f([2e3, e]),
                        s.push(this.monthsShort(i, "")),
                        r.push(this.months(i, "")),
                        a.push(this.months(i, "")),
                        a.push(this.monthsShort(i, ""));
                for (s.sort(t),
                         r.sort(t),
                         a.sort(t),
                         e = 0; e < 12; e++)
                    s[e] = pt(s[e]),
                        r[e] = pt(r[e]);
                for (e = 0; e < 24; e++)
                    a[e] = pt(a[e]);
                this._monthsRegex = new RegExp("^(" + a.join("|") + ")","i"),
                    this._monthsShortRegex = this._monthsRegex,
                    this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")","i"),
                    this._monthsShortStrictRegex = new RegExp("^(" + s.join("|") + ")","i")
            }
            function Ft(t, e, i, s, r, a, n) {
                var o = new Date(t,e,i,s,r,a,n);
                return t < 100 && t >= 0 && isFinite(o.getFullYear()) && o.setFullYear(t),
                    o
            }
            function It(t) {
                var e = new Date(Date.UTC.apply(null, arguments));
                return t < 100 && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t),
                    e
            }
            function Rt(t, e, i) {
                var s = 7 + e - i;
                return -((7 + It(t, 0, s).getUTCDay() - e) % 7) + s - 1
            }
            function Bt(t, e, i, s, r) {
                var a, n, o = 1 + 7 * (e - 1) + (7 + i - s) % 7 + Rt(t, s, r);
                return o <= 0 ? n = ut(a = t - 1) + o : o > ut(t) ? (a = t + 1,
                    n = o - ut(t)) : (a = t,
                    n = o),
                    {
                        year: a,
                        dayOfYear: n
                    }
            }
            function Lt(t, e, i) {
                var s, r, a = Rt(t.year(), e, i), n = Math.floor((t.dayOfYear() - a - 1) / 7) + 1;
                return n < 1 ? s = n + Vt(r = t.year() - 1, e, i) : n > Vt(t.year(), e, i) ? (s = n - Vt(t.year(), e, i),
                    r = t.year() + 1) : (r = t.year(),
                    s = n),
                    {
                        week: s,
                        year: r
                    }
            }
            function Vt(t, e, i) {
                var s = Rt(t, e, i)
                    , r = Rt(t + 1, e, i);
                return (ut(t) - s + r) / 7
            }
            H("w", ["ww", 2], "wo", "week"),
                H("W", ["WW", 2], "Wo", "isoWeek"),
                F("week", "w"),
                F("isoWeek", "W"),
                L("week", 5),
                L("isoWeek", 5),
                ht("w", K),
                ht("ww", K, q),
                ht("W", K),
                ht("WW", K, q),
                mt(["w", "ww", "W", "WW"], (function(t, e, i, s) {
                        e[s.substr(0, 1)] = x(t)
                    }
                ));
            H("d", 0, "do", "day"),
                H("dd", 0, 0, (function(t) {
                        return this.localeData().weekdaysMin(this, t)
                    }
                )),
                H("ddd", 0, 0, (function(t) {
                        return this.localeData().weekdaysShort(this, t)
                    }
                )),
                H("dddd", 0, 0, (function(t) {
                        return this.localeData().weekdays(this, t)
                    }
                )),
                H("e", 0, 0, "weekday"),
                H("E", 0, 0, "isoWeekday"),
                F("day", "d"),
                F("weekday", "e"),
                F("isoWeekday", "E"),
                L("day", 11),
                L("weekday", 11),
                L("isoWeekday", 11),
                ht("d", K),
                ht("e", K),
                ht("E", K),
                ht("dd", (function(t, e) {
                        return e.weekdaysMinRegex(t)
                    }
                )),
                ht("ddd", (function(t, e) {
                        return e.weekdaysShortRegex(t)
                    }
                )),
                ht("dddd", (function(t, e) {
                        return e.weekdaysRegex(t)
                    }
                )),
                mt(["dd", "ddd", "dddd"], (function(t, e, i, s) {
                        var r = i._locale.weekdaysParse(t, s, i._strict);
                        null != r ? e.d = r : d(i).invalidWeekday = t
                    }
                )),
                mt(["d", "e", "E"], (function(t, e, i, s) {
                        e[s] = x(t)
                    }
                ));
            var Ot = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
            var Gt = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
            var Nt = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
            function zt(t, e, i) {
                var s, r, a, n = t.toLocaleLowerCase();
                if (!this._weekdaysParse)
                    for (this._weekdaysParse = [],
                             this._shortWeekdaysParse = [],
                             this._minWeekdaysParse = [],
                             s = 0; s < 7; ++s)
                        a = f([2e3, 1]).day(s),
                            this._minWeekdaysParse[s] = this.weekdaysMin(a, "").toLocaleLowerCase(),
                            this._shortWeekdaysParse[s] = this.weekdaysShort(a, "").toLocaleLowerCase(),
                            this._weekdaysParse[s] = this.weekdays(a, "").toLocaleLowerCase();
                return i ? "dddd" === e ? -1 !== (r = gt.call(this._weekdaysParse, n)) ? r : null : "ddd" === e ? -1 !== (r = gt.call(this._shortWeekdaysParse, n)) ? r : null : -1 !== (r = gt.call(this._minWeekdaysParse, n)) ? r : null : "dddd" === e ? -1 !== (r = gt.call(this._weekdaysParse, n)) || -1 !== (r = gt.call(this._shortWeekdaysParse, n)) || -1 !== (r = gt.call(this._minWeekdaysParse, n)) ? r : null : "ddd" === e ? -1 !== (r = gt.call(this._shortWeekdaysParse, n)) || -1 !== (r = gt.call(this._weekdaysParse, n)) || -1 !== (r = gt.call(this._minWeekdaysParse, n)) ? r : null : -1 !== (r = gt.call(this._minWeekdaysParse, n)) || -1 !== (r = gt.call(this._weekdaysParse, n)) || -1 !== (r = gt.call(this._shortWeekdaysParse, n)) ? r : null
            }
            var Ht = nt;
            var Yt = nt;
            var jt = nt;
            function Wt() {
                function t(t, e) {
                    return e.length - t.length
                }
                var e, i, s, r, a, n = [], o = [], h = [], l = [];
                for (e = 0; e < 7; e++)
                    i = f([2e3, 1]).day(e),
                        s = this.weekdaysMin(i, ""),
                        r = this.weekdaysShort(i, ""),
                        a = this.weekdays(i, ""),
                        n.push(s),
                        o.push(r),
                        h.push(a),
                        l.push(s),
                        l.push(r),
                        l.push(a);
                for (n.sort(t),
                         o.sort(t),
                         h.sort(t),
                         l.sort(t),
                         e = 0; e < 7; e++)
                    o[e] = pt(o[e]),
                        h[e] = pt(h[e]),
                        l[e] = pt(l[e]);
                this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")","i"),
                    this._weekdaysShortRegex = this._weekdaysRegex,
                    this._weekdaysMinRegex = this._weekdaysRegex,
                    this._weekdaysStrictRegex = new RegExp("^(" + h.join("|") + ")","i"),
                    this._weekdaysShortStrictRegex = new RegExp("^(" + o.join("|") + ")","i"),
                    this._weekdaysMinStrictRegex = new RegExp("^(" + n.join("|") + ")","i")
            }
            function qt() {
                return this.hours() % 12 || 12
            }
            function Ut(t, e) {
                H(t, 0, 0, (function() {
                        return this.localeData().meridiem(this.hours(), this.minutes(), e)
                    }
                ))
            }
            function Xt(t, e) {
                return e._meridiemParse
            }
            H("H", ["HH", 2], 0, "hour"),
                H("h", ["hh", 2], 0, qt),
                H("k", ["kk", 2], 0, (function() {
                        return this.hours() || 24
                    }
                )),
                H("hmm", 0, 0, (function() {
                        return "" + qt.apply(this) + V(this.minutes(), 2)
                    }
                )),
                H("hmmss", 0, 0, (function() {
                        return "" + qt.apply(this) + V(this.minutes(), 2) + V(this.seconds(), 2)
                    }
                )),
                H("Hmm", 0, 0, (function() {
                        return "" + this.hours() + V(this.minutes(), 2)
                    }
                )),
                H("Hmmss", 0, 0, (function() {
                        return "" + this.hours() + V(this.minutes(), 2) + V(this.seconds(), 2)
                    }
                )),
                Ut("a", !0),
                Ut("A", !1),
                F("hour", "h"),
                L("hour", 13),
                ht("a", Xt),
                ht("A", Xt),
                ht("H", K),
                ht("h", K),
                ht("k", K),
                ht("HH", K, q),
                ht("hh", K, q),
                ht("kk", K, q),
                ht("hmm", $),
                ht("hmmss", J),
                ht("Hmm", $),
                ht("Hmmss", J),
                dt(["H", "HH"], 3),
                dt(["k", "kk"], (function(t, e, i) {
                        var s = x(t);
                        e[3] = 24 === s ? 0 : s
                    }
                )),
                dt(["a", "A"], (function(t, e, i) {
                        i._isPm = i._locale.isPM(t),
                            i._meridiem = t
                    }
                )),
                dt(["h", "hh"], (function(t, e, i) {
                        e[3] = x(t),
                            d(i).bigHour = !0
                    }
                )),
                dt("hmm", (function(t, e, i) {
                        var s = t.length - 2;
                        e[3] = x(t.substr(0, s)),
                            e[4] = x(t.substr(s)),
                            d(i).bigHour = !0
                    }
                )),
                dt("hmmss", (function(t, e, i) {
                        var s = t.length - 4
                            , r = t.length - 2;
                        e[3] = x(t.substr(0, s)),
                            e[4] = x(t.substr(s, 2)),
                            e[5] = x(t.substr(r)),
                            d(i).bigHour = !0
                    }
                )),
                dt("Hmm", (function(t, e, i) {
                        var s = t.length - 2;
                        e[3] = x(t.substr(0, s)),
                            e[4] = x(t.substr(s))
                    }
                )),
                dt("Hmmss", (function(t, e, i) {
                        var s = t.length - 4
                            , r = t.length - 2;
                        e[3] = x(t.substr(0, s)),
                            e[4] = x(t.substr(s, 2)),
                            e[5] = x(t.substr(r))
                    }
                ));
            var Zt, Kt = _t("Hours", !0), $t = {
                calendar: {
                    sameDay: "[Today at] LT",
                    nextDay: "[Tomorrow at] LT",
                    nextWeek: "dddd [at] LT",
                    lastDay: "[Yesterday at] LT",
                    lastWeek: "[Last] dddd [at] LT",
                    sameElse: "L"
                },
                longDateFormat: {
                    LTS: "h:mm:ss A",
                    LT: "h:mm A",
                    L: "MM/DD/YYYY",
                    LL: "MMMM D, YYYY",
                    LLL: "MMMM D, YYYY h:mm A",
                    LLLL: "dddd, MMMM D, YYYY h:mm A"
                },
                invalidDate: "Invalid date",
                ordinal: "%d",
                dayOfMonthOrdinalParse: /\d{1,2}/,
                relativeTime: {
                    future: "in %s",
                    past: "%s ago",
                    s: "a few seconds",
                    ss: "%d seconds",
                    m: "a minute",
                    mm: "%d minutes",
                    h: "an hour",
                    hh: "%d hours",
                    d: "a day",
                    dd: "%d days",
                    M: "a month",
                    MM: "%d months",
                    y: "a year",
                    yy: "%d years"
                },
                months: Pt,
                monthsShort: Ct,
                week: {
                    dow: 0,
                    doy: 6
                },
                weekdays: Ot,
                weekdaysMin: Nt,
                weekdaysShort: Gt,
                meridiemParse: /[ap]\.?m?\.?/i
            }, Jt = {}, Qt = {};
            function te(t) {
                return t ? t.toLowerCase().replace("_", "-") : t
            }
            function ee(t) {
                var e = null;
                if (!Jt[t] && "undefined" != typeof module && module && module.exports)
                    try {
                        e = Zt._abbr,
                            require("./locale/" + t),
                            ie(e)
                    } catch (t) {}
                return Jt[t]
            }
            function ie(t, e) {
                var i;
                return t && (i = a(e) ? re(t) : se(t, e)) && (Zt = i),
                    Zt._abbr
            }
            function se(t, e) {
                if (null !== e) {
                    var i = $t;
                    if (e.abbr = t,
                    null != Jt[t])
                        M("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),
                            i = Jt[t]._config;
                    else if (null != e.parentLocale) {
                        if (null == Jt[e.parentLocale])
                            return Qt[e.parentLocale] || (Qt[e.parentLocale] = []),
                                Qt[e.parentLocale].push({
                                    name: t,
                                    config: e
                                }),
                                null;
                        i = Jt[e.parentLocale]._config
                    }
                    return Jt[t] = new A(w(i, e)),
                    Qt[t] && Qt[t].forEach((function(t) {
                            se(t.name, t.config)
                        }
                    )),
                        ie(t),
                        Jt[t]
                }
                return delete Jt[t],
                    null
            }
            function re(t) {
                var e;
                if (t && t._locale && t._locale._abbr && (t = t._locale._abbr),
                    !t)
                    return Zt;
                if (!s(t)) {
                    if (e = ee(t))
                        return e;
                    t = [t]
                }
                return function(t) {
                    for (var e, i, s, r, a = 0; a < t.length; ) {
                        for (e = (r = te(t[a]).split("-")).length,
                                 i = (i = te(t[a + 1])) ? i.split("-") : null; e > 0; ) {
                            if (s = ee(r.slice(0, e).join("-")))
                                return s;
                            if (i && i.length >= e && S(r, i, !0) >= e - 1)
                                break;
                            e--
                        }
                        a++
                    }
                    return null
                }(t)
            }
            function ae(t) {
                var e, i = t._a;
                return i && -2 === d(t).overflow && (e = i[1] < 0 || i[1] > 11 ? 1 : i[2] < 1 || i[2] > St(i[0], i[1]) ? 2 : i[3] < 0 || i[3] > 24 || 24 === i[3] && (0 !== i[4] || 0 !== i[5] || 0 !== i[6]) ? 3 : i[4] < 0 || i[4] > 59 ? 4 : i[5] < 0 || i[5] > 59 ? 5 : i[6] < 0 || i[6] > 999 ? 6 : -1,
                d(t)._overflowDayOfYear && (e < 0 || e > 2) && (e = 2),
                d(t)._overflowWeeks && -1 === e && (e = 7),
                d(t)._overflowWeekday && -1 === e && (e = 8),
                    d(t).overflow = e),
                    t
            }
            function ne(t, e, i) {
                return null != t ? t : null != e ? e : i
            }
            function oe(t) {
                var e, s, r, a, n = [];
                if (!t._d) {
                    for (r = function(t) {
                        var e = new Date(i.now());
                        return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()]
                    }(t),
                         t._w && null == t._a[2] && null == t._a[1] && function(t) {
                             var e, i, s, r, a, n, o, h;
                             if (null != (e = t._w).GG || null != e.W || null != e.E)
                                 a = 1,
                                     n = 4,
                                     i = ne(e.GG, t._a[0], Lt(Se(), 1, 4).year),
                                     s = ne(e.W, 1),
                                 ((r = ne(e.E, 1)) < 1 || r > 7) && (h = !0);
                             else {
                                 a = t._locale._week.dow,
                                     n = t._locale._week.doy;
                                 var l = Lt(Se(), a, n);
                                 i = ne(e.gg, t._a[0], l.year),
                                     s = ne(e.w, l.week),
                                     null != e.d ? ((r = e.d) < 0 || r > 6) && (h = !0) : null != e.e ? (r = e.e + a,
                                     (e.e < 0 || e.e > 6) && (h = !0)) : r = a
                             }
                             s < 1 || s > Vt(i, a, n) ? d(t)._overflowWeeks = !0 : null != h ? d(t)._overflowWeekday = !0 : (o = Bt(i, s, r, a, n),
                                 t._a[0] = o.year,
                                 t._dayOfYear = o.dayOfYear)
                         }(t),
                         null != t._dayOfYear && (a = ne(t._a[0], r[0]),
                         (t._dayOfYear > ut(a) || 0 === t._dayOfYear) && (d(t)._overflowDayOfYear = !0),
                             s = It(a, 0, t._dayOfYear),
                             t._a[1] = s.getUTCMonth(),
                             t._a[2] = s.getUTCDate()),
                             e = 0; e < 3 && null == t._a[e]; ++e)
                        t._a[e] = n[e] = r[e];
                    for (; e < 7; e++)
                        t._a[e] = n[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                    24 === t._a[3] && 0 === t._a[4] && 0 === t._a[5] && 0 === t._a[6] && (t._nextDay = !0,
                        t._a[3] = 0),
                        t._d = (t._useUTC ? It : Ft).apply(null, n),
                    null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
                    t._nextDay && (t._a[3] = 24),
                    t._w && void 0 !== t._w.d && t._w.d !== t._d.getDay() && (d(t).weekdayMismatch = !0)
                }
            }
            var he = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/
                , le = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/
                , pe = /Z|[+-]\d\d(?::?\d\d)?/
                , fe = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]]
                , de = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]]
                , me = /^\/?Date\((\-?\d+)/i;
            function ce(t) {
                var e, i, s, r, a, n, o = t._i, h = he.exec(o) || le.exec(o);
                if (h) {
                    for (d(t).iso = !0,
                             e = 0,
                             i = fe.length; e < i; e++)
                        if (fe[e][1].exec(h[1])) {
                            r = fe[e][0],
                                s = !1 !== fe[e][2];
                            break
                        }
                    if (null == r)
                        return void (t._isValid = !1);
                    if (h[3]) {
                        for (e = 0,
                                 i = de.length; e < i; e++)
                            if (de[e][1].exec(h[3])) {
                                a = (h[2] || " ") + de[e][0];
                                break
                            }
                        if (null == a)
                            return void (t._isValid = !1)
                    }
                    if (!s && null != a)
                        return void (t._isValid = !1);
                    if (h[4]) {
                        if (!pe.exec(h[4]))
                            return void (t._isValid = !1);
                        n = "Z"
                    }
                    t._f = r + (a || "") + (n || ""),
                        _e(t)
                } else
                    t._isValid = !1
            }
            var ue = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
            function ye(t) {
                var e = parseInt(t, 10);
                return e <= 49 ? 2e3 + e : e <= 999 ? 1900 + e : e
            }
            var ge = {
                UT: 0,
                GMT: 0,
                EDT: -240,
                EST: -300,
                CDT: -300,
                CST: -360,
                MDT: -360,
                MST: -420,
                PDT: -420,
                PST: -480
            };
            function ve(t) {
                var e, i, s, r, a, n, o, h = ue.exec(t._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim());
                if (h) {
                    var l = (e = h[4],
                        i = h[3],
                        s = h[2],
                        r = h[5],
                        a = h[6],
                        n = h[7],
                        o = [ye(e), Ct.indexOf(i), parseInt(s, 10), parseInt(r, 10), parseInt(a, 10)],
                    n && o.push(parseInt(n, 10)),
                        o);
                    if (!function(t, e, i) {
                        return !t || Gt.indexOf(t) === new Date(e[0],e[1],e[2]).getDay() || (d(i).weekdayMismatch = !0,
                            i._isValid = !1,
                            !1)
                    }(h[1], l, t))
                        return;
                    t._a = l,
                        t._tzm = function(t, e, i) {
                            if (t)
                                return ge[t];
                            if (e)
                                return 0;
                            var s = parseInt(i, 10)
                                , r = s % 100;
                            return 60 * ((s - r) / 100) + r
                        }(h[8], h[9], h[10]),
                        t._d = It.apply(null, t._a),
                        t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
                        d(t).rfc2822 = !0
                } else
                    t._isValid = !1
            }
            function _e(t) {
                if (t._f !== i.ISO_8601)
                    if (t._f !== i.RFC_2822) {
                        t._a = [],
                            d(t).empty = !0;
                        var e, s, r, a, n, o = "" + t._i, h = o.length, l = 0;
                        for (r = j(t._f, t._locale).match(O) || [],
                                 e = 0; e < r.length; e++)
                            a = r[e],
                            (s = (o.match(lt(a, t)) || [])[0]) && ((n = o.substr(0, o.indexOf(s))).length > 0 && d(t).unusedInput.push(n),
                                o = o.slice(o.indexOf(s) + s.length),
                                l += s.length),
                                z[a] ? (s ? d(t).empty = !1 : d(t).unusedTokens.push(a),
                                    ct(a, s, t)) : t._strict && !s && d(t).unusedTokens.push(a);
                        d(t).charsLeftOver = h - l,
                        o.length > 0 && d(t).unusedInput.push(o),
                        t._a[3] <= 12 && !0 === d(t).bigHour && t._a[3] > 0 && (d(t).bigHour = void 0),
                            d(t).parsedDateParts = t._a.slice(0),
                            d(t).meridiem = t._meridiem,
                            t._a[3] = function(t, e, i) {
                                var s;
                                if (null == i)
                                    return e;
                                return null != t.meridiemHour ? t.meridiemHour(e, i) : null != t.isPM ? ((s = t.isPM(i)) && e < 12 && (e += 12),
                                s || 12 !== e || (e = 0),
                                    e) : e
                            }(t._locale, t._a[3], t._meridiem),
                            oe(t),
                            ae(t)
                    } else
                        ve(t);
                else
                    ce(t)
            }
            function be(t) {
                var e = t._i
                    , l = t._f;
                return t._locale = t._locale || re(t._l),
                    null === e || void 0 === l && "" === e ? c({
                        nullInput: !0
                    }) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)),
                        _(e) ? new v(ae(e)) : (o(e) ? t._d = e : s(l) ? function(t) {
                            var e, i, s, r, a;
                            if (0 === t._f.length)
                                return d(t).invalidFormat = !0,
                                    void (t._d = new Date(NaN));
                            for (r = 0; r < t._f.length; r++)
                                a = 0,
                                    e = y({}, t),
                                null != t._useUTC && (e._useUTC = t._useUTC),
                                    e._f = t._f[r],
                                    _e(e),
                                m(e) && (a += d(e).charsLeftOver,
                                    a += 10 * d(e).unusedTokens.length,
                                    d(e).score = a,
                                (null == s || a < s) && (s = a,
                                    i = e));
                            p(t, i || e)
                        }(t) : l ? _e(t) : function(t) {
                            var e = t._i;
                            a(e) ? t._d = new Date(i.now()) : o(e) ? t._d = new Date(e.valueOf()) : "string" == typeof e ? function(t) {
                                var e = me.exec(t._i);
                                null === e ? (ce(t),
                                !1 === t._isValid && (delete t._isValid,
                                    ve(t),
                                !1 === t._isValid && (delete t._isValid,
                                    i.createFromInputFallback(t)))) : t._d = new Date(+e[1])
                            }(t) : s(e) ? (t._a = h(e.slice(0), (function(t) {
                                    return parseInt(t, 10)
                                }
                            )),
                                oe(t)) : r(e) ? function(t) {
                                if (!t._d) {
                                    var e = R(t._i);
                                    t._a = h([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], (function(t) {
                                            return t && parseInt(t, 10)
                                        }
                                    )),
                                        oe(t)
                                }
                            }(t) : n(e) ? t._d = new Date(e) : i.createFromInputFallback(t)
                        }(t),
                        m(t) || (t._d = null),
                            t))
            }
            function xe(t, e, i, a, n) {
                var o, h = {};
                return !0 !== i && !1 !== i || (a = i,
                    i = void 0),
                (r(t) && function(t) {
                    if (Object.getOwnPropertyNames)
                        return 0 === Object.getOwnPropertyNames(t).length;
                    var e;
                    for (e in t)
                        if (t.hasOwnProperty(e))
                            return !1;
                    return !0
                }(t) || s(t) && 0 === t.length) && (t = void 0),
                    h._isAMomentObject = !0,
                    h._useUTC = h._isUTC = n,
                    h._l = i,
                    h._i = t,
                    h._f = e,
                    h._strict = a,
                (o = new v(ae(be(h))))._nextDay && (o.add(1, "d"),
                    o._nextDay = void 0),
                    o
            }
            function Se(t, e, i, s) {
                return xe(t, e, i, s, !1)
            }
            i.createFromInputFallback = P("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", (function(t) {
                    t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
                }
            )),
                i.ISO_8601 = function() {}
                ,
                i.RFC_2822 = function() {}
            ;
            var Ee = P("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", (function() {
                    var t = Se.apply(null, arguments);
                    return this.isValid() && t.isValid() ? t < this ? this : t : c()
                }
            ))
                , Pe = P("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", (function() {
                    var t = Se.apply(null, arguments);
                    return this.isValid() && t.isValid() ? t > this ? this : t : c()
                }
            ));
            function Ce(t, e) {
                var i, r;
                if (1 === e.length && s(e[0]) && (e = e[0]),
                    !e.length)
                    return Se();
                for (i = e[0],
                         r = 1; r < e.length; ++r)
                    e[r].isValid() && !e[r][t](i) || (i = e[r]);
                return i
            }
            var ke = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
            function Me(t) {
                var e = R(t)
                    , i = e.year || 0
                    , s = e.quarter || 0
                    , r = e.month || 0
                    , a = e.week || 0
                    , n = e.day || 0
                    , o = e.hour || 0
                    , h = e.minute || 0
                    , l = e.second || 0
                    , p = e.millisecond || 0;
                this._isValid = function(t) {
                    for (var e in t)
                        if (-1 === gt.call(ke, e) || null != t[e] && isNaN(t[e]))
                            return !1;
                    for (var i = !1, s = 0; s < ke.length; ++s)
                        if (t[ke[s]]) {
                            if (i)
                                return !1;
                            parseFloat(t[ke[s]]) !== x(t[ke[s]]) && (i = !0)
                        }
                    return !0
                }(e),
                    this._milliseconds = +p + 1e3 * l + 6e4 * h + 1e3 * o * 60 * 60,
                    this._days = +n + 7 * a,
                    this._months = +r + 3 * s + 12 * i,
                    this._data = {},
                    this._locale = re(),
                    this._bubble()
            }
            function De(t) {
                return t instanceof Me
            }
            function we(t) {
                return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t)
            }
            function Ae(t, e) {
                H(t, 0, 0, (function() {
                        var t = this.utcOffset()
                            , i = "+";
                        return t < 0 && (t = -t,
                            i = "-"),
                        i + V(~~(t / 60), 2) + e + V(~~t % 60, 2)
                    }
                ))
            }
            Ae("Z", ":"),
                Ae("ZZ", ""),
                ht("Z", at),
                ht("ZZ", at),
                dt(["Z", "ZZ"], (function(t, e, i) {
                        i._useUTC = !0,
                            i._tzm = Fe(at, t)
                    }
                ));
            var Te = /([\+\-]|\d\d)/gi;
            function Fe(t, e) {
                var i = (e || "").match(t);
                if (null === i)
                    return null;
                var s = ((i[i.length - 1] || []) + "").match(Te) || ["-", 0, 0]
                    , r = 60 * s[1] + x(s[2]);
                return 0 === r ? 0 : "+" === s[0] ? r : -r
            }
            function Ie(t, e) {
                var s, r;
                return e._isUTC ? (s = e.clone(),
                    r = (_(t) || o(t) ? t.valueOf() : Se(t).valueOf()) - s.valueOf(),
                    s._d.setTime(s._d.valueOf() + r),
                    i.updateOffset(s, !1),
                    s) : Se(t).local()
            }
            function Re(t) {
                return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
            }
            function Be() {
                return !!this.isValid() && (this._isUTC && 0 === this._offset)
            }
            i.updateOffset = function() {}
            ;
            var Le = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/
                , Ve = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
            function Oe(t, e) {
                var i, s, r, a = t, o = null;
                return De(t) ? a = {
                    ms: t._milliseconds,
                    d: t._days,
                    M: t._months
                } : n(t) ? (a = {},
                    e ? a[e] = t : a.milliseconds = t) : (o = Le.exec(t)) ? (i = "-" === o[1] ? -1 : 1,
                    a = {
                        y: 0,
                        d: x(o[2]) * i,
                        h: x(o[3]) * i,
                        m: x(o[4]) * i,
                        s: x(o[5]) * i,
                        ms: x(we(1e3 * o[6])) * i
                    }) : (o = Ve.exec(t)) ? (i = "-" === o[1] ? -1 : (o[1],
                    1),
                    a = {
                        y: Ge(o[2], i),
                        M: Ge(o[3], i),
                        w: Ge(o[4], i),
                        d: Ge(o[5], i),
                        h: Ge(o[6], i),
                        m: Ge(o[7], i),
                        s: Ge(o[8], i)
                    }) : null == a ? a = {} : "object" == typeof a && ("from"in a || "to"in a) && (r = function(t, e) {
                    var i;
                    if (!t.isValid() || !e.isValid())
                        return {
                            milliseconds: 0,
                            months: 0
                        };
                    e = Ie(e, t),
                        t.isBefore(e) ? i = Ne(t, e) : ((i = Ne(e, t)).milliseconds = -i.milliseconds,
                            i.months = -i.months);
                    return i
                }(Se(a.from), Se(a.to)),
                    (a = {}).ms = r.milliseconds,
                    a.M = r.months),
                    s = new Me(a),
                De(t) && l(t, "_locale") && (s._locale = t._locale),
                    s
            }
            function Ge(t, e) {
                var i = t && parseFloat(t.replace(",", "."));
                return (isNaN(i) ? 0 : i) * e
            }
            function Ne(t, e) {
                var i = {
                    milliseconds: 0,
                    months: 0
                };
                return i.months = e.month() - t.month() + 12 * (e.year() - t.year()),
                t.clone().add(i.months, "M").isAfter(e) && --i.months,
                    i.milliseconds = +e - +t.clone().add(i.months, "M"),
                    i
            }
            function ze(t, e) {
                return function(i, s) {
                    var r;
                    return null === s || isNaN(+s) || (M(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),
                        r = i,
                        i = s,
                        s = r),
                        He(this, Oe(i = "string" == typeof i ? +i : i, s), t),
                        this
                }
            }
            function He(t, e, s, r) {
                var a = e._milliseconds
                    , n = we(e._days)
                    , o = we(e._months);
                t.isValid() && (r = null == r || r,
                o && Mt(t, bt(t, "Month") + o * s),
                n && xt(t, "Date", bt(t, "Date") + n * s),
                a && t._d.setTime(t._d.valueOf() + a * s),
                r && i.updateOffset(t, n || o))
            }
            Oe.fn = Me.prototype,
                Oe.invalid = function() {
                    return Oe(NaN)
                }
            ;
            var Ye = ze(1, "add")
                , je = ze(-1, "subtract");
            function We(t, e) {
                var i = 12 * (e.year() - t.year()) + (e.month() - t.month())
                    , s = t.clone().add(i, "months");
                return -(i + (e - s < 0 ? (e - s) / (s - t.clone().add(i - 1, "months")) : (e - s) / (t.clone().add(i + 1, "months") - s))) || 0
            }
            function qe(t) {
                var e;
                return void 0 === t ? this._locale._abbr : (null != (e = re(t)) && (this._locale = e),
                    this)
            }
            i.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ",
                i.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
            var Ue = P("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", (function(t) {
                    return void 0 === t ? this.localeData() : this.locale(t)
                }
            ));
            function Xe() {
                return this._locale
            }
            function Ze(t, e) {
                H(0, [t, t.length], 0, e)
            }
            function Ke(t, e, i, s, r) {
                var a;
                return null == t ? Lt(this, s, r).year : (e > (a = Vt(t, s, r)) && (e = a),
                    $e.call(this, t, e, i, s, r))
            }
            function $e(t, e, i, s, r) {
                var a = Bt(t, e, i, s, r)
                    , n = It(a.year, 0, a.dayOfYear);
                return this.year(n.getUTCFullYear()),
                    this.month(n.getUTCMonth()),
                    this.date(n.getUTCDate()),
                    this
            }
            H(0, ["gg", 2], 0, (function() {
                    return this.weekYear() % 100
                }
            )),
                H(0, ["GG", 2], 0, (function() {
                        return this.isoWeekYear() % 100
                    }
                )),
                Ze("gggg", "weekYear"),
                Ze("ggggg", "weekYear"),
                Ze("GGGG", "isoWeekYear"),
                Ze("GGGGG", "isoWeekYear"),
                F("weekYear", "gg"),
                F("isoWeekYear", "GG"),
                L("weekYear", 1),
                L("isoWeekYear", 1),
                ht("G", st),
                ht("g", st),
                ht("GG", K, q),
                ht("gg", K, q),
                ht("GGGG", tt, X),
                ht("gggg", tt, X),
                ht("GGGGG", et, Z),
                ht("ggggg", et, Z),
                mt(["gggg", "ggggg", "GGGG", "GGGGG"], (function(t, e, i, s) {
                        e[s.substr(0, 2)] = x(t)
                    }
                )),
                mt(["gg", "GG"], (function(t, e, s, r) {
                        e[r] = i.parseTwoDigitYear(t)
                    }
                )),
                H("Q", 0, "Qo", "quarter"),
                F("quarter", "Q"),
                L("quarter", 7),
                ht("Q", W),
                dt("Q", (function(t, e) {
                        e[1] = 3 * (x(t) - 1)
                    }
                )),
                H("D", ["DD", 2], "Do", "date"),
                F("date", "D"),
                L("date", 9),
                ht("D", K),
                ht("DD", K, q),
                ht("Do", (function(t, e) {
                        return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient
                    }
                )),
                dt(["D", "DD"], 2),
                dt("Do", (function(t, e) {
                        e[2] = x(t.match(K)[0])
                    }
                ));
            var Je = _t("Date", !0);
            H("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
                F("dayOfYear", "DDD"),
                L("dayOfYear", 4),
                ht("DDD", Q),
                ht("DDDD", U),
                dt(["DDD", "DDDD"], (function(t, e, i) {
                        i._dayOfYear = x(t)
                    }
                )),
                H("m", ["mm", 2], 0, "minute"),
                F("minute", "m"),
                L("minute", 14),
                ht("m", K),
                ht("mm", K, q),
                dt(["m", "mm"], 4);
            var Qe = _t("Minutes", !1);
            H("s", ["ss", 2], 0, "second"),
                F("second", "s"),
                L("second", 15),
                ht("s", K),
                ht("ss", K, q),
                dt(["s", "ss"], 5);
            var ti, ei = _t("Seconds", !1);
            for (H("S", 0, 0, (function() {
                    return ~~(this.millisecond() / 100)
                }
            )),
                     H(0, ["SS", 2], 0, (function() {
                             return ~~(this.millisecond() / 10)
                         }
                     )),
                     H(0, ["SSS", 3], 0, "millisecond"),
                     H(0, ["SSSS", 4], 0, (function() {
                             return 10 * this.millisecond()
                         }
                     )),
                     H(0, ["SSSSS", 5], 0, (function() {
                             return 100 * this.millisecond()
                         }
                     )),
                     H(0, ["SSSSSS", 6], 0, (function() {
                             return 1e3 * this.millisecond()
                         }
                     )),
                     H(0, ["SSSSSSS", 7], 0, (function() {
                             return 1e4 * this.millisecond()
                         }
                     )),
                     H(0, ["SSSSSSSS", 8], 0, (function() {
                             return 1e5 * this.millisecond()
                         }
                     )),
                     H(0, ["SSSSSSSSS", 9], 0, (function() {
                             return 1e6 * this.millisecond()
                         }
                     )),
                     F("millisecond", "ms"),
                     L("millisecond", 16),
                     ht("S", Q, W),
                     ht("SS", Q, q),
                     ht("SSS", Q, U),
                     ti = "SSSS"; ti.length <= 9; ti += "S")
                ht(ti, it);
            function ii(t, e) {
                e[6] = x(1e3 * ("0." + t))
            }
            for (ti = "S"; ti.length <= 9; ti += "S")
                dt(ti, ii);
            var si = _t("Milliseconds", !1);
            H("z", 0, 0, "zoneAbbr"),
                H("zz", 0, 0, "zoneName");
            var ri = v.prototype;
            function ai(t) {
                return t
            }
            ri.add = Ye,
                ri.calendar = function(t, e) {
                    var s = t || Se()
                        , r = Ie(s, this).startOf("day")
                        , a = i.calendarFormat(this, r) || "sameElse"
                        , n = e && (D(e[a]) ? e[a].call(this, s) : e[a]);
                    return this.format(n || this.localeData().calendar(a, this, Se(s)))
                }
                ,
                ri.clone = function() {
                    return new v(this)
                }
                ,
                ri.diff = function(t, e, i) {
                    var s, r, a;
                    if (!this.isValid())
                        return NaN;
                    if (!(s = Ie(t, this)).isValid())
                        return NaN;
                    switch (r = 6e4 * (s.utcOffset() - this.utcOffset()),
                        e = I(e)) {
                        case "year":
                            a = We(this, s) / 12;
                            break;
                        case "month":
                            a = We(this, s);
                            break;
                        case "quarter":
                            a = We(this, s) / 3;
                            break;
                        case "second":
                            a = (this - s) / 1e3;
                            break;
                        case "minute":
                            a = (this - s) / 6e4;
                            break;
                        case "hour":
                            a = (this - s) / 36e5;
                            break;
                        case "day":
                            a = (this - s - r) / 864e5;
                            break;
                        case "week":
                            a = (this - s - r) / 6048e5;
                            break;
                        default:
                            a = this - s
                    }
                    return i ? a : b(a)
                }
                ,
                ri.endOf = function(t) {
                    return void 0 === (t = I(t)) || "millisecond" === t ? this : ("date" === t && (t = "day"),
                        this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms"))
                }
                ,
                ri.format = function(t) {
                    t || (t = this.isUtc() ? i.defaultFormatUtc : i.defaultFormat);
                    var e = Y(this, t);
                    return this.localeData().postformat(e)
                }
                ,
                ri.from = function(t, e) {
                    return this.isValid() && (_(t) && t.isValid() || Se(t).isValid()) ? Oe({
                        to: this,
                        from: t
                    }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
                }
                ,
                ri.fromNow = function(t) {
                    return this.from(Se(), t)
                }
                ,
                ri.to = function(t, e) {
                    return this.isValid() && (_(t) && t.isValid() || Se(t).isValid()) ? Oe({
                        from: this,
                        to: t
                    }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
                }
                ,
                ri.toNow = function(t) {
                    return this.to(Se(), t)
                }
                ,
                ri.get = function(t) {
                    return D(this[t = I(t)]) ? this[t]() : this
                }
                ,
                ri.invalidAt = function() {
                    return d(this).overflow
                }
                ,
                ri.isAfter = function(t, e) {
                    var i = _(t) ? t : Se(t);
                    return !(!this.isValid() || !i.isValid()) && ("millisecond" === (e = I(a(e) ? "millisecond" : e)) ? this.valueOf() > i.valueOf() : i.valueOf() < this.clone().startOf(e).valueOf())
                }
                ,
                ri.isBefore = function(t, e) {
                    var i = _(t) ? t : Se(t);
                    return !(!this.isValid() || !i.isValid()) && ("millisecond" === (e = I(a(e) ? "millisecond" : e)) ? this.valueOf() < i.valueOf() : this.clone().endOf(e).valueOf() < i.valueOf())
                }
                ,
                ri.isBetween = function(t, e, i, s) {
                    return ("(" === (s = s || "()")[0] ? this.isAfter(t, i) : !this.isBefore(t, i)) && (")" === s[1] ? this.isBefore(e, i) : !this.isAfter(e, i))
                }
                ,
                ri.isSame = function(t, e) {
                    var i, s = _(t) ? t : Se(t);
                    return !(!this.isValid() || !s.isValid()) && ("millisecond" === (e = I(e || "millisecond")) ? this.valueOf() === s.valueOf() : (i = s.valueOf(),
                    this.clone().startOf(e).valueOf() <= i && i <= this.clone().endOf(e).valueOf()))
                }
                ,
                ri.isSameOrAfter = function(t, e) {
                    return this.isSame(t, e) || this.isAfter(t, e)
                }
                ,
                ri.isSameOrBefore = function(t, e) {
                    return this.isSame(t, e) || this.isBefore(t, e)
                }
                ,
                ri.isValid = function() {
                    return m(this)
                }
                ,
                ri.lang = Ue,
                ri.locale = qe,
                ri.localeData = Xe,
                ri.max = Pe,
                ri.min = Ee,
                ri.parsingFlags = function() {
                    return p({}, d(this))
                }
                ,
                ri.set = function(t, e) {
                    if ("object" == typeof t)
                        for (var i = function(t) {
                            var e = [];
                            for (var i in t)
                                e.push({
                                    unit: i,
                                    priority: B[i]
                                });
                            return e.sort((function(t, e) {
                                    return t.priority - e.priority
                                }
                            )),
                                e
                        }(t = R(t)), s = 0; s < i.length; s++)
                            this[i[s].unit](t[i[s].unit]);
                    else if (D(this[t = I(t)]))
                        return this[t](e);
                    return this
                }
                ,
                ri.startOf = function(t) {
                    switch (t = I(t)) {
                        case "year":
                            this.month(0);
                        case "quarter":
                        case "month":
                            this.date(1);
                        case "week":
                        case "isoWeek":
                        case "day":
                        case "date":
                            this.hours(0);
                        case "hour":
                            this.minutes(0);
                        case "minute":
                            this.seconds(0);
                        case "second":
                            this.milliseconds(0)
                    }
                    return "week" === t && this.weekday(0),
                    "isoWeek" === t && this.isoWeekday(1),
                    "quarter" === t && this.month(3 * Math.floor(this.month() / 3)),
                        this
                }
                ,
                ri.subtract = je,
                ri.toArray = function() {
                    var t = this;
                    return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
                }
                ,
                ri.toObject = function() {
                    var t = this;
                    return {
                        years: t.year(),
                        months: t.month(),
                        date: t.date(),
                        hours: t.hours(),
                        minutes: t.minutes(),
                        seconds: t.seconds(),
                        milliseconds: t.milliseconds()
                    }
                }
                ,
                ri.toDate = function() {
                    return new Date(this.valueOf())
                }
                ,
                ri.toISOString = function() {
                    if (!this.isValid())
                        return null;
                    var t = this.clone().utc();
                    return t.year() < 0 || t.year() > 9999 ? Y(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : D(Date.prototype.toISOString) ? this.toDate().toISOString() : Y(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                }
                ,
                ri.inspect = function() {
                    if (!this.isValid())
                        return "moment.invalid(/* " + this._i + " */)";
                    var t = "moment"
                        , e = "";
                    this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone",
                        e = "Z");
                    var i = "[" + t + '("]'
                        , s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"
                        , r = e + '[")]';
                    return this.format(i + s + "-MM-DD[T]HH:mm:ss.SSS" + r)
                }
                ,
                ri.toJSON = function() {
                    return this.isValid() ? this.toISOString() : null
                }
                ,
                ri.toString = function() {
                    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                }
                ,
                ri.unix = function() {
                    return Math.floor(this.valueOf() / 1e3)
                }
                ,
                ri.valueOf = function() {
                    return this._d.valueOf() - 6e4 * (this._offset || 0)
                }
                ,
                ri.creationData = function() {
                    return {
                        input: this._i,
                        format: this._f,
                        locale: this._locale,
                        isUTC: this._isUTC,
                        strict: this._strict
                    }
                }
                ,
                ri.year = vt,
                ri.isLeapYear = function() {
                    return yt(this.year())
                }
                ,
                ri.weekYear = function(t) {
                    return Ke.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
                }
                ,
                ri.isoWeekYear = function(t) {
                    return Ke.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
                }
                ,
                ri.quarter = ri.quarters = function(t) {
                    return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
                }
                ,
                ri.month = Dt,
                ri.daysInMonth = function() {
                    return St(this.year(), this.month())
                }
                ,
                ri.week = ri.weeks = function(t) {
                    var e = this.localeData().week(this);
                    return null == t ? e : this.add(7 * (t - e), "d")
                }
                ,
                ri.isoWeek = ri.isoWeeks = function(t) {
                    var e = Lt(this, 1, 4).week;
                    return null == t ? e : this.add(7 * (t - e), "d")
                }
                ,
                ri.weeksInYear = function() {
                    var t = this.localeData()._week;
                    return Vt(this.year(), t.dow, t.doy)
                }
                ,
                ri.isoWeeksInYear = function() {
                    return Vt(this.year(), 1, 4)
                }
                ,
                ri.date = Je,
                ri.day = ri.days = function(t) {
                    if (!this.isValid())
                        return null != t ? this : NaN;
                    var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                    return null != t ? (t = function(t, e) {
                        return "string" != typeof t ? t : isNaN(t) ? "number" == typeof (t = e.weekdaysParse(t)) ? t : null : parseInt(t, 10)
                    }(t, this.localeData()),
                        this.add(t - e, "d")) : e
                }
                ,
                ri.weekday = function(t) {
                    if (!this.isValid())
                        return null != t ? this : NaN;
                    var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
                    return null == t ? e : this.add(t - e, "d")
                }
                ,
                ri.isoWeekday = function(t) {
                    if (!this.isValid())
                        return null != t ? this : NaN;
                    if (null != t) {
                        var e = function(t, e) {
                            return "string" == typeof t ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t
                        }(t, this.localeData());
                        return this.day(this.day() % 7 ? e : e - 7)
                    }
                    return this.day() || 7
                }
                ,
                ri.dayOfYear = function(t) {
                    var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
                    return null == t ? e : this.add(t - e, "d")
                }
                ,
                ri.hour = ri.hours = Kt,
                ri.minute = ri.minutes = Qe,
                ri.second = ri.seconds = ei,
                ri.millisecond = ri.milliseconds = si,
                ri.utcOffset = function(t, e, s) {
                    var r, a = this._offset || 0;
                    if (!this.isValid())
                        return null != t ? this : NaN;
                    if (null != t) {
                        if ("string" == typeof t) {
                            if (null === (t = Fe(at, t)))
                                return this
                        } else
                            Math.abs(t) < 16 && !s && (t *= 60);
                        return !this._isUTC && e && (r = Re(this)),
                            this._offset = t,
                            this._isUTC = !0,
                        null != r && this.add(r, "m"),
                        a !== t && (!e || this._changeInProgress ? He(this, Oe(t - a, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
                            i.updateOffset(this, !0),
                            this._changeInProgress = null)),
                            this
                    }
                    return this._isUTC ? a : Re(this)
                }
                ,
                ri.utc = function(t) {
                    return this.utcOffset(0, t)
                }
                ,
                ri.local = function(t) {
                    return this._isUTC && (this.utcOffset(0, t),
                        this._isUTC = !1,
                    t && this.subtract(Re(this), "m")),
                        this
                }
                ,
                ri.parseZone = function() {
                    if (null != this._tzm)
                        this.utcOffset(this._tzm, !1, !0);
                    else if ("string" == typeof this._i) {
                        var t = Fe(rt, this._i);
                        null != t ? this.utcOffset(t) : this.utcOffset(0, !0)
                    }
                    return this
                }
                ,
                ri.hasAlignedHourOffset = function(t) {
                    return !!this.isValid() && (t = t ? Se(t).utcOffset() : 0,
                    (this.utcOffset() - t) % 60 == 0)
                }
                ,
                ri.isDST = function() {
                    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
                }
                ,
                ri.isLocal = function() {
                    return !!this.isValid() && !this._isUTC
                }
                ,
                ri.isUtcOffset = function() {
                    return !!this.isValid() && this._isUTC
                }
                ,
                ri.isUtc = Be,
                ri.isUTC = Be,
                ri.zoneAbbr = function() {
                    return this._isUTC ? "UTC" : ""
                }
                ,
                ri.zoneName = function() {
                    return this._isUTC ? "Coordinated Universal Time" : ""
                }
                ,
                ri.dates = P("dates accessor is deprecated. Use date instead.", Je),
                ri.months = P("months accessor is deprecated. Use month instead", Dt),
                ri.years = P("years accessor is deprecated. Use year instead", vt),
                ri.zone = P("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", (function(t, e) {
                        return null != t ? ("string" != typeof t && (t = -t),
                            this.utcOffset(t, e),
                            this) : -this.utcOffset()
                    }
                )),
                ri.isDSTShifted = P("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", (function() {
                        if (!a(this._isDSTShifted))
                            return this._isDSTShifted;
                        var t = {};
                        if (y(t, this),
                            (t = be(t))._a) {
                            var e = t._isUTC ? f(t._a) : Se(t._a);
                            this._isDSTShifted = this.isValid() && S(t._a, e.toArray()) > 0
                        } else
                            this._isDSTShifted = !1;
                        return this._isDSTShifted
                    }
                ));
            var ni = A.prototype;
            function oi(t, e, i, s) {
                var r = re()
                    , a = f().set(s, e);
                return r[i](a, t)
            }
            function hi(t, e, i) {
                if (n(t) && (e = t,
                    t = void 0),
                    t = t || "",
                null != e)
                    return oi(t, e, i, "month");
                var s, r = [];
                for (s = 0; s < 12; s++)
                    r[s] = oi(t, s, i, "month");
                return r
            }
            function li(t, e, i, s) {
                "boolean" == typeof t ? (n(e) && (i = e,
                    e = void 0),
                    e = e || "") : (i = e = t,
                    t = !1,
                n(e) && (i = e,
                    e = void 0),
                    e = e || "");
                var r, a = re(), o = t ? a._week.dow : 0;
                if (null != i)
                    return oi(e, (i + o) % 7, s, "day");
                var h = [];
                for (r = 0; r < 7; r++)
                    h[r] = oi(e, (r + o) % 7, s, "day");
                return h
            }
            ni.calendar = function(t, e, i) {
                var s = this._calendar[t] || this._calendar.sameElse;
                return D(s) ? s.call(e, i) : s
            }
                ,
                ni.longDateFormat = function(t) {
                    var e = this._longDateFormat[t]
                        , i = this._longDateFormat[t.toUpperCase()];
                    return e || !i ? e : (this._longDateFormat[t] = i.replace(/MMMM|MM|DD|dddd/g, (function(t) {
                            return t.slice(1)
                        }
                    )),
                        this._longDateFormat[t])
                }
                ,
                ni.invalidDate = function() {
                    return this._invalidDate
                }
                ,
                ni.ordinal = function(t) {
                    return this._ordinal.replace("%d", t)
                }
                ,
                ni.preparse = ai,
                ni.postformat = ai,
                ni.relativeTime = function(t, e, i, s) {
                    var r = this._relativeTime[i];
                    return D(r) ? r(t, e, i, s) : r.replace(/%d/i, t)
                }
                ,
                ni.pastFuture = function(t, e) {
                    var i = this._relativeTime[t > 0 ? "future" : "past"];
                    return D(i) ? i(e) : i.replace(/%s/i, e)
                }
                ,
                ni.set = function(t) {
                    var e, i;
                    for (i in t)
                        D(e = t[i]) ? this[i] = e : this["_" + i] = e;
                    this._config = t,
                        this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
                }
                ,
                ni.months = function(t, e) {
                    return t ? s(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || Et).test(e) ? "format" : "standalone"][t.month()] : s(this._months) ? this._months : this._months.standalone
                }
                ,
                ni.monthsShort = function(t, e) {
                    return t ? s(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[Et.test(e) ? "format" : "standalone"][t.month()] : s(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
                }
                ,
                ni.monthsParse = function(t, e, i) {
                    var s, r, a;
                    if (this._monthsParseExact)
                        return kt.call(this, t, e, i);
                    for (this._monthsParse || (this._monthsParse = [],
                        this._longMonthsParse = [],
                        this._shortMonthsParse = []),
                             s = 0; s < 12; s++) {
                        if (r = f([2e3, s]),
                        i && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp("^" + this.months(r, "").replace(".", "") + "$","i"),
                            this._shortMonthsParse[s] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$","i")),
                        i || this._monthsParse[s] || (a = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""),
                            this._monthsParse[s] = new RegExp(a.replace(".", ""),"i")),
                        i && "MMMM" === e && this._longMonthsParse[s].test(t))
                            return s;
                        if (i && "MMM" === e && this._shortMonthsParse[s].test(t))
                            return s;
                        if (!i && this._monthsParse[s].test(t))
                            return s
                    }
                }
                ,
                ni.monthsRegex = function(t) {
                    return this._monthsParseExact ? (l(this, "_monthsRegex") || Tt.call(this),
                        t ? this._monthsStrictRegex : this._monthsRegex) : (l(this, "_monthsRegex") || (this._monthsRegex = At),
                        this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex)
                }
                ,
                ni.monthsShortRegex = function(t) {
                    return this._monthsParseExact ? (l(this, "_monthsRegex") || Tt.call(this),
                        t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (l(this, "_monthsShortRegex") || (this._monthsShortRegex = wt),
                        this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex)
                }
                ,
                ni.week = function(t) {
                    return Lt(t, this._week.dow, this._week.doy).week
                }
                ,
                ni.firstDayOfYear = function() {
                    return this._week.doy
                }
                ,
                ni.firstDayOfWeek = function() {
                    return this._week.dow
                }
                ,
                ni.weekdays = function(t, e) {
                    return t ? s(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()] : s(this._weekdays) ? this._weekdays : this._weekdays.standalone
                }
                ,
                ni.weekdaysMin = function(t) {
                    return t ? this._weekdaysMin[t.day()] : this._weekdaysMin
                }
                ,
                ni.weekdaysShort = function(t) {
                    return t ? this._weekdaysShort[t.day()] : this._weekdaysShort
                }
                ,
                ni.weekdaysParse = function(t, e, i) {
                    var s, r, a;
                    if (this._weekdaysParseExact)
                        return zt.call(this, t, e, i);
                    for (this._weekdaysParse || (this._weekdaysParse = [],
                        this._minWeekdaysParse = [],
                        this._shortWeekdaysParse = [],
                        this._fullWeekdaysParse = []),
                             s = 0; s < 7; s++) {
                        if (r = f([2e3, 1]).day(s),
                        i && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp("^" + this.weekdays(r, "").replace(".", ".?") + "$","i"),
                            this._shortWeekdaysParse[s] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", ".?") + "$","i"),
                            this._minWeekdaysParse[s] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", ".?") + "$","i")),
                        this._weekdaysParse[s] || (a = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""),
                            this._weekdaysParse[s] = new RegExp(a.replace(".", ""),"i")),
                        i && "dddd" === e && this._fullWeekdaysParse[s].test(t))
                            return s;
                        if (i && "ddd" === e && this._shortWeekdaysParse[s].test(t))
                            return s;
                        if (i && "dd" === e && this._minWeekdaysParse[s].test(t))
                            return s;
                        if (!i && this._weekdaysParse[s].test(t))
                            return s
                    }
                }
                ,
                ni.weekdaysRegex = function(t) {
                    return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Wt.call(this),
                        t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (l(this, "_weekdaysRegex") || (this._weekdaysRegex = Ht),
                        this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex)
                }
                ,
                ni.weekdaysShortRegex = function(t) {
                    return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Wt.call(this),
                        t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (l(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Yt),
                        this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
                }
                ,
                ni.weekdaysMinRegex = function(t) {
                    return this._weekdaysParseExact ? (l(this, "_weekdaysRegex") || Wt.call(this),
                        t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (l(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = jt),
                        this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
                }
                ,
                ni.isPM = function(t) {
                    return "p" === (t + "").toLowerCase().charAt(0)
                }
                ,
                ni.meridiem = function(t, e, i) {
                    return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
                }
                ,
                ie("en", {
                    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                    ordinal: function(t) {
                        var e = t % 10;
                        return t + (1 === x(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th")
                    }
                }),
                i.lang = P("moment.lang is deprecated. Use moment.locale instead.", ie),
                i.langData = P("moment.langData is deprecated. Use moment.localeData instead.", re);
            var pi = Math.abs;
            function fi(t, e, i, s) {
                var r = Oe(e, i);
                return t._milliseconds += s * r._milliseconds,
                    t._days += s * r._days,
                    t._months += s * r._months,
                    t._bubble()
            }
            function di(t) {
                return t < 0 ? Math.floor(t) : Math.ceil(t)
            }
            function mi(t) {
                return 4800 * t / 146097
            }
            function ci(t) {
                return 146097 * t / 4800
            }
            function ui(t) {
                return function() {
                    return this.as(t)
                }
            }
            var yi = ui("ms")
                , gi = ui("s")
                , vi = ui("m")
                , _i = ui("h")
                , bi = ui("d")
                , xi = ui("w")
                , Si = ui("M")
                , Ei = ui("y");
            function Pi(t) {
                return function() {
                    return this.isValid() ? this._data[t] : NaN
                }
            }
            var Ci = Pi("milliseconds")
                , ki = Pi("seconds")
                , Mi = Pi("minutes")
                , Di = Pi("hours")
                , wi = Pi("days")
                , Ai = Pi("months")
                , Ti = Pi("years");
            var Fi = Math.round
                , Ii = {
                ss: 44,
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            };
            function Ri(t, e, i, s, r) {
                return r.relativeTime(e || 1, !!i, t, s)
            }
            var Bi = Math.abs;
            function Li(t) {
                return (t > 0) - (t < 0) || +t
            }
            function Vi() {
                if (!this.isValid())
                    return this.localeData().invalidDate();
                var t, e, i = Bi(this._milliseconds) / 1e3, s = Bi(this._days), r = Bi(this._months);
                t = b(i / 60),
                    e = b(t / 60),
                    i %= 60,
                    t %= 60;
                var a = b(r / 12)
                    , n = r %= 12
                    , o = s
                    , h = e
                    , l = t
                    , p = i ? i.toFixed(3).replace(/\.?0+$/, "") : ""
                    , f = this.asSeconds();
                if (!f)
                    return "P0D";
                var d = f < 0 ? "-" : ""
                    , m = Li(this._months) !== Li(f) ? "-" : ""
                    , c = Li(this._days) !== Li(f) ? "-" : ""
                    , u = Li(this._milliseconds) !== Li(f) ? "-" : "";
                return d + "P" + (a ? m + a + "Y" : "") + (n ? m + n + "M" : "") + (o ? c + o + "D" : "") + (h || l || p ? "T" : "") + (h ? u + h + "H" : "") + (l ? u + l + "M" : "") + (p ? u + p + "S" : "")
            }
            var Oi = Me.prototype;
            return Oi.isValid = function() {
                return this._isValid
            }
                ,
                Oi.abs = function() {
                    var t = this._data;
                    return this._milliseconds = pi(this._milliseconds),
                        this._days = pi(this._days),
                        this._months = pi(this._months),
                        t.milliseconds = pi(t.milliseconds),
                        t.seconds = pi(t.seconds),
                        t.minutes = pi(t.minutes),
                        t.hours = pi(t.hours),
                        t.months = pi(t.months),
                        t.years = pi(t.years),
                        this
                }
                ,
                Oi.add = function(t, e) {
                    return fi(this, t, e, 1)
                }
                ,
                Oi.subtract = function(t, e) {
                    return fi(this, t, e, -1)
                }
                ,
                Oi.as = function(t) {
                    if (!this.isValid())
                        return NaN;
                    var e, i, s = this._milliseconds;
                    if ("month" === (t = I(t)) || "year" === t)
                        return e = this._days + s / 864e5,
                            i = this._months + mi(e),
                            "month" === t ? i : i / 12;
                    switch (e = this._days + Math.round(ci(this._months)),
                        t) {
                        case "week":
                            return e / 7 + s / 6048e5;
                        case "day":
                            return e + s / 864e5;
                        case "hour":
                            return 24 * e + s / 36e5;
                        case "minute":
                            return 1440 * e + s / 6e4;
                        case "second":
                            return 86400 * e + s / 1e3;
                        case "millisecond":
                            return Math.floor(864e5 * e) + s;
                        default:
                            throw new Error("Unknown unit " + t)
                    }
                }
                ,
                Oi.asMilliseconds = yi,
                Oi.asSeconds = gi,
                Oi.asMinutes = vi,
                Oi.asHours = _i,
                Oi.asDays = bi,
                Oi.asWeeks = xi,
                Oi.asMonths = Si,
                Oi.asYears = Ei,
                Oi.valueOf = function() {
                    return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * x(this._months / 12) : NaN
                }
                ,
                Oi._bubble = function() {
                    var t, e, i, s, r, a = this._milliseconds, n = this._days, o = this._months, h = this._data;
                    return a >= 0 && n >= 0 && o >= 0 || a <= 0 && n <= 0 && o <= 0 || (a += 864e5 * di(ci(o) + n),
                        n = 0,
                        o = 0),
                        h.milliseconds = a % 1e3,
                        t = b(a / 1e3),
                        h.seconds = t % 60,
                        e = b(t / 60),
                        h.minutes = e % 60,
                        i = b(e / 60),
                        h.hours = i % 24,
                        n += b(i / 24),
                        o += r = b(mi(n)),
                        n -= di(ci(r)),
                        s = b(o / 12),
                        o %= 12,
                        h.days = n,
                        h.months = o,
                        h.years = s,
                        this
                }
                ,
                Oi.clone = function() {
                    return Oe(this)
                }
                ,
                Oi.get = function(t) {
                    return t = I(t),
                        this.isValid() ? this[t + "s"]() : NaN
                }
                ,
                Oi.milliseconds = Ci,
                Oi.seconds = ki,
                Oi.minutes = Mi,
                Oi.hours = Di,
                Oi.days = wi,
                Oi.weeks = function() {
                    return b(this.days() / 7)
                }
                ,
                Oi.months = Ai,
                Oi.years = Ti,
                Oi.humanize = function(t) {
                    if (!this.isValid())
                        return this.localeData().invalidDate();
                    var e = this.localeData()
                        , i = function(t, e, i) {
                        var s = Oe(t).abs()
                            , r = Fi(s.as("s"))
                            , a = Fi(s.as("m"))
                            , n = Fi(s.as("h"))
                            , o = Fi(s.as("d"))
                            , h = Fi(s.as("M"))
                            , l = Fi(s.as("y"))
                            , p = r <= Ii.ss && ["s", r] || r < Ii.s && ["ss", r] || a <= 1 && ["m"] || a < Ii.m && ["mm", a] || n <= 1 && ["h"] || n < Ii.h && ["hh", n] || o <= 1 && ["d"] || o < Ii.d && ["dd", o] || h <= 1 && ["M"] || h < Ii.M && ["MM", h] || l <= 1 && ["y"] || ["yy", l];
                        return p[2] = e,
                            p[3] = +t > 0,
                            p[4] = i,
                            Ri.apply(null, p)
                    }(this, !t, e);
                    return t && (i = e.pastFuture(+this, i)),
                        e.postformat(i)
                }
                ,
                Oi.toISOString = Vi,
                Oi.toString = Vi,
                Oi.toJSON = Vi,
                Oi.locale = qe,
                Oi.localeData = Xe,
                Oi.toIsoString = P("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Vi),
                Oi.lang = Ue,
                H("X", 0, 0, "unix"),
                H("x", 0, 0, "valueOf"),
                ht("x", st),
                ht("X", /[+-]?\d+(\.\d{1,3})?/),
                dt("X", (function(t, e, i) {
                        i._d = new Date(1e3 * parseFloat(t, 10))
                    }
                )),
                dt("x", (function(t, e, i) {
                        i._d = new Date(x(t))
                    }
                )),
                i.version = "2.19.1",
                t = Se,
                i.fn = ri,
                i.min = function() {
                    var t = [].slice.call(arguments, 0);
                    return Ce("isBefore", t)
                }
                ,
                i.max = function() {
                    var t = [].slice.call(arguments, 0);
                    return Ce("isAfter", t)
                }
                ,
                i.now = function() {
                    return Date.now ? Date.now() : +new Date
                }
                ,
                i.utc = f,
                i.unix = function(t) {
                    return Se(1e3 * t)
                }
                ,
                i.months = function(t, e) {
                    return hi(t, e, "months")
                }
                ,
                i.isDate = o,
                i.locale = ie,
                i.invalid = c,
                i.duration = Oe,
                i.isMoment = _,
                i.weekdays = function(t, e, i) {
                    return li(t, e, i, "weekdays")
                }
                ,
                i.parseZone = function() {
                    return Se.apply(null, arguments).parseZone()
                }
                ,
                i.localeData = re,
                i.isDuration = De,
                i.monthsShort = function(t, e) {
                    return hi(t, e, "monthsShort")
                }
                ,
                i.weekdaysMin = function(t, e, i) {
                    return li(t, e, i, "weekdaysMin")
                }
                ,
                i.defineLocale = se,
                i.updateLocale = function(t, e) {
                    if (null != e) {
                        var i, s = $t;
                        null != Jt[t] && (s = Jt[t]._config),
                            (i = new A(e = w(s, e))).parentLocale = Jt[t],
                            Jt[t] = i,
                            ie(t)
                    } else
                        null != Jt[t] && (null != Jt[t].parentLocale ? Jt[t] = Jt[t].parentLocale : null != Jt[t] && delete Jt[t]);
                    return Jt[t]
                }
                ,
                i.locales = function() {
                    return C(Jt)
                }
                ,
                i.weekdaysShort = function(t, e, i) {
                    return li(t, e, i, "weekdaysShort")
                }
                ,
                i.normalizeUnits = I,
                i.relativeTimeRounding = function(t) {
                    return void 0 === t ? Fi : "function" == typeof t && (Fi = t,
                        !0)
                }
                ,
                i.relativeTimeThreshold = function(t, e) {
                    return void 0 !== Ii[t] && (void 0 === e ? Ii[t] : (Ii[t] = e,
                    "s" === t && (Ii.ss = e - 1),
                        !0))
                }
                ,
                i.calendarFormat = function(t, e) {
                    var i = t.diff(e, "days", !0);
                    return i < -6 ? "sameElse" : i < -1 ? "lastWeek" : i < 0 ? "lastDay" : i < 1 ? "sameDay" : i < 2 ? "nextDay" : i < 7 ? "nextWeek" : "sameElse"
                }
                ,
                i.prototype = ri,
                i
        }
    )),
"undefined" != typeof navigator && (a = window || {},
    b = function(window) {
        "use strict";
        var svgNS = "http://www.w3.org/2000/svg", locationHref = "", initialDefaultFrame = -999999, subframeEnabled = !0, expressionsPlugin, isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), cachedColors = {}, bm_rounder = Math.round, bm_rnd, bm_pow = Math.pow, bm_sqrt = Math.sqrt, bm_abs = Math.abs, bm_floor = Math.floor, bm_max = Math.max, bm_min = Math.min, blitter = 10, BMMath = {};
        function ProjectInterface() {
            return {}
        }
        !function() {
            var t, e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"], i = e.length;
            for (t = 0; t < i; t += 1)
                BMMath[e[t]] = Math[e[t]]
        }(),
            BMMath.random = Math.random,
            BMMath.abs = function(t) {
                if ("object" == typeof t && t.length) {
                    var e, i = createSizedArray(t.length), s = t.length;
                    for (e = 0; e < s; e += 1)
                        i[e] = Math.abs(t[e]);
                    return i
                }
                return Math.abs(t)
            }
        ;
        var defaultCurveSegments = 150
            , degToRads = Math.PI / 180
            , roundCorner = .5519;
        function roundValues(t) {
            bm_rnd = t ? Math.round : function(t) {
                return t
            }
        }
        function styleDiv(t) {
            t.style.position = "absolute",
                t.style.top = 0,
                t.style.left = 0,
                t.style.display = "block",
                t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0",
                t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible",
                t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d"
        }
        function BMEnterFrameEvent(t, e, i, s) {
            this.type = t,
                this.currentTime = e,
                this.totalTime = i,
                this.direction = s < 0 ? -1 : 1
        }
        function BMCompleteEvent(t, e) {
            this.type = t,
                this.direction = e < 0 ? -1 : 1
        }
        function BMCompleteLoopEvent(t, e, i, s) {
            this.type = t,
                this.currentLoop = i,
                this.totalLoops = e,
                this.direction = s < 0 ? -1 : 1
        }
        function BMSegmentStartEvent(t, e, i) {
            this.type = t,
                this.firstFrame = e,
                this.totalFrames = i
        }
        function BMDestroyEvent(t, e) {
            this.type = t,
                this.target = e
        }
        roundValues(!1);
        var createElementID = (D = 0,
                function() {
                    return "__lottie_element_" + ++D
                }
        ), D;
        function HSVtoRGB(t, e, i) {
            var s, r, a, n, o, h, l, p;
            switch (h = i * (1 - e),
                l = i * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e),
                p = i * (1 - (1 - o) * e),
            n % 6) {
                case 0:
                    s = i,
                        r = p,
                        a = h;
                    break;
                case 1:
                    s = l,
                        r = i,
                        a = h;
                    break;
                case 2:
                    s = h,
                        r = i,
                        a = p;
                    break;
                case 3:
                    s = h,
                        r = l,
                        a = i;
                    break;
                case 4:
                    s = p,
                        r = h,
                        a = i;
                    break;
                case 5:
                    s = i,
                        r = h,
                        a = l
            }
            return [s, r, a]
        }
        function RGBtoHSV(t, e, i) {
            var s, r = Math.max(t, e, i), a = Math.min(t, e, i), n = r - a, o = 0 === r ? 0 : n / r, h = r / 255;
            switch (r) {
                case a:
                    s = 0;
                    break;
                case t:
                    s = e - i + n * (e < i ? 6 : 0),
                        s /= 6 * n;
                    break;
                case e:
                    s = i - t + 2 * n,
                        s /= 6 * n;
                    break;
                case i:
                    s = t - e + 4 * n,
                        s /= 6 * n
            }
            return [s, o, h]
        }
        function addSaturationToRGB(t, e) {
            var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
            return i[1] += e,
                1 < i[1] ? i[1] = 1 : i[1] <= 0 && (i[1] = 0),
                HSVtoRGB(i[0], i[1], i[2])
        }
        function addBrightnessToRGB(t, e) {
            var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
            return i[2] += e,
                1 < i[2] ? i[2] = 1 : i[2] < 0 && (i[2] = 0),
                HSVtoRGB(i[0], i[1], i[2])
        }
        function addHueToRGB(t, e) {
            var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
            return i[0] += e / 360,
                1 < i[0] ? i[0] -= 1 : i[0] < 0 && (i[0] += 1),
                HSVtoRGB(i[0], i[1], i[2])
        }
        var rgbToHex = function() {
            var t, e, i = [];
            for (t = 0; t < 256; t += 1)
                e = t.toString(16),
                    i[t] = 1 == e.length ? "0" + e : e;
            return function(t, e, s) {
                return t < 0 && (t = 0),
                e < 0 && (e = 0),
                s < 0 && (s = 0),
                "#" + i[t] + i[e] + i[s]
            }
        }();
        function BaseEvent() {}
        BaseEvent.prototype = {
            triggerEvent: function(t, e) {
                if (this._cbs[t])
                    for (var i = this._cbs[t].length, s = 0; s < i; s++)
                        this._cbs[t][s](e)
            },
            addEventListener: function(t, e) {
                return this._cbs[t] || (this._cbs[t] = []),
                    this._cbs[t].push(e),
                    function() {
                        this.removeEventListener(t, e)
                    }
                        .bind(this)
            },
            removeEventListener: function(t, e) {
                if (e) {
                    if (this._cbs[t]) {
                        for (var i = 0, s = this._cbs[t].length; i < s; )
                            this._cbs[t][i] === e && (this._cbs[t].splice(i, 1),
                                i -= 1,
                                s -= 1),
                                i += 1;
                        this._cbs[t].length || (this._cbs[t] = null)
                    }
                } else
                    this._cbs[t] = null
            }
        };
        var createTypedArray = "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function(t, e) {
                    return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0
                }
                : function(t, e) {
                    var i, s = 0, r = [];
                    switch (t) {
                        case "int16":
                        case "uint8c":
                            i = 1;
                            break;
                        default:
                            i = 1.1
                    }
                    for (s = 0; s < e; s += 1)
                        r.push(i);
                    return r
                }
        ;
        function createSizedArray(t) {
            return Array.apply(null, {
                length: t
            })
        }
        function createNS(t) {
            return document.createElementNS(svgNS, t)
        }
        function createTag(t) {
            return document.createElement(t)
        }
        function DynamicPropertyContainer() {}
        DynamicPropertyContainer.prototype = {
            addDynamicProperty: function(t) {
                -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t),
                    this.container.addDynamicProperty(this),
                    this._isAnimated = !0)
            },
            iterateDynamicProperties: function() {
                this._mdf = !1;
                var t, e = this.dynamicProperties.length;
                for (t = 0; t < e; t += 1)
                    this.dynamicProperties[t].getValue(),
                    this.dynamicProperties[t]._mdf && (this._mdf = !0)
            },
            initDynamicPropertyContainer: function(t) {
                this.container = t,
                    this.dynamicProperties = [],
                    this._mdf = !1,
                    this._isAnimated = !1
            }
        };
        var getBlendMode = (Ma = {
                0: "source-over",
                1: "multiply",
                2: "screen",
                3: "overlay",
                4: "darken",
                5: "lighten",
                6: "color-dodge",
                7: "color-burn",
                8: "hard-light",
                9: "soft-light",
                10: "difference",
                11: "exclusion",
                12: "hue",
                13: "saturation",
                14: "color",
                15: "luminosity"
            },
                function(t) {
                    return Ma[t] || ""
                }
        ), Ma, Matrix = function() {
            var t = Math.cos
                , e = Math.sin
                , i = Math.tan
                , s = Math.round;
            function r() {
                return this.props[0] = 1,
                    this.props[1] = 0,
                    this.props[2] = 0,
                    this.props[3] = 0,
                    this.props[4] = 0,
                    this.props[5] = 1,
                    this.props[6] = 0,
                    this.props[7] = 0,
                    this.props[8] = 0,
                    this.props[9] = 0,
                    this.props[10] = 1,
                    this.props[11] = 0,
                    this.props[12] = 0,
                    this.props[13] = 0,
                    this.props[14] = 0,
                    this.props[15] = 1,
                    this
            }
            function a(i) {
                if (0 === i)
                    return this;
                var s = t(i)
                    , r = e(i);
                return this._t(s, -r, 0, 0, r, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }
            function n(i) {
                if (0 === i)
                    return this;
                var s = t(i)
                    , r = e(i);
                return this._t(1, 0, 0, 0, 0, s, -r, 0, 0, r, s, 0, 0, 0, 0, 1)
            }
            function o(i) {
                if (0 === i)
                    return this;
                var s = t(i)
                    , r = e(i);
                return this._t(s, 0, r, 0, 0, 1, 0, 0, -r, 0, s, 0, 0, 0, 0, 1)
            }
            function h(i) {
                if (0 === i)
                    return this;
                var s = t(i)
                    , r = e(i);
                return this._t(s, -r, 0, 0, r, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }
            function l(t, e) {
                return this._t(1, e, t, 1, 0, 0)
            }
            function p(t, e) {
                return this.shear(i(t), i(e))
            }
            function f(s, r) {
                var a = t(r)
                    , n = e(r);
                return this._t(a, n, 0, 0, -n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, i(s), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(a, -n, 0, 0, n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }
            function d(t, e, i) {
                return i || 0 === i || (i = 1),
                    1 === t && 1 === e && 1 === i ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1)
            }
            function m(t, e, i, s, r, a, n, o, h, l, p, f, d, m, c, u) {
                return this.props[0] = t,
                    this.props[1] = e,
                    this.props[2] = i,
                    this.props[3] = s,
                    this.props[4] = r,
                    this.props[5] = a,
                    this.props[6] = n,
                    this.props[7] = o,
                    this.props[8] = h,
                    this.props[9] = l,
                    this.props[10] = p,
                    this.props[11] = f,
                    this.props[12] = d,
                    this.props[13] = m,
                    this.props[14] = c,
                    this.props[15] = u,
                    this
            }
            function c(t, e, i) {
                return i = i || 0,
                    0 !== t || 0 !== e || 0 !== i ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, i, 1) : this
            }
            function u(t, e, i, s, r, a, n, o, h, l, p, f, d, m, c, u) {
                var y = this.props;
                if (1 === t && 0 === e && 0 === i && 0 === s && 0 === r && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === f)
                    return y[12] = y[12] * t + y[15] * d,
                        y[13] = y[13] * a + y[15] * m,
                        y[14] = y[14] * p + y[15] * c,
                        y[15] = y[15] * u,
                        this._identityCalculated = !1,
                        this;
                var g = y[0]
                    , v = y[1]
                    , _ = y[2]
                    , b = y[3]
                    , x = y[4]
                    , S = y[5]
                    , E = y[6]
                    , P = y[7]
                    , C = y[8]
                    , k = y[9]
                    , M = y[10]
                    , D = y[11]
                    , w = y[12]
                    , A = y[13]
                    , T = y[14]
                    , F = y[15];
                return y[0] = g * t + v * r + _ * h + b * d,
                    y[1] = g * e + v * a + _ * l + b * m,
                    y[2] = g * i + v * n + _ * p + b * c,
                    y[3] = g * s + v * o + _ * f + b * u,
                    y[4] = x * t + S * r + E * h + P * d,
                    y[5] = x * e + S * a + E * l + P * m,
                    y[6] = x * i + S * n + E * p + P * c,
                    y[7] = x * s + S * o + E * f + P * u,
                    y[8] = C * t + k * r + M * h + D * d,
                    y[9] = C * e + k * a + M * l + D * m,
                    y[10] = C * i + k * n + M * p + D * c,
                    y[11] = C * s + k * o + M * f + D * u,
                    y[12] = w * t + A * r + T * h + F * d,
                    y[13] = w * e + A * a + T * l + F * m,
                    y[14] = w * i + A * n + T * p + F * c,
                    y[15] = w * s + A * o + T * f + F * u,
                    this._identityCalculated = !1,
                    this
            }
            function y() {
                return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]),
                    this._identityCalculated = !0),
                    this._identity
            }
            function g(t) {
                for (var e = 0; e < 16; ) {
                    if (t.props[e] !== this.props[e])
                        return !1;
                    e += 1
                }
                return !0
            }
            function v(t) {
                var e;
                for (e = 0; e < 16; e += 1)
                    t.props[e] = this.props[e]
            }
            function _(t) {
                var e;
                for (e = 0; e < 16; e += 1)
                    this.props[e] = t[e]
            }
            function b(t, e, i) {
                return {
                    x: t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12],
                    y: t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13],
                    z: t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]
                }
            }
            function x(t, e, i) {
                return t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12]
            }
            function S(t, e, i) {
                return t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13]
            }
            function E(t, e, i) {
                return t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]
            }
            function P(t) {
                var e = this.props[0] * this.props[5] - this.props[1] * this.props[4]
                    , i = this.props[5] / e
                    , s = -this.props[1] / e
                    , r = -this.props[4] / e
                    , a = this.props[0] / e
                    , n = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / e
                    , o = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / e;
                return [t[0] * i + t[1] * r + n, t[0] * s + t[1] * a + o, 0]
            }
            function C(t) {
                var e, i = t.length, s = [];
                for (e = 0; e < i; e += 1)
                    s[e] = P(t[e]);
                return s
            }
            function k(t, e, i) {
                var s = createTypedArray("float32", 6);
                if (this.isIdentity())
                    s[0] = t[0],
                        s[1] = t[1],
                        s[2] = e[0],
                        s[3] = e[1],
                        s[4] = i[0],
                        s[5] = i[1];
                else {
                    var r = this.props[0]
                        , a = this.props[1]
                        , n = this.props[4]
                        , o = this.props[5]
                        , h = this.props[12]
                        , l = this.props[13];
                    s[0] = t[0] * r + t[1] * n + h,
                        s[1] = t[0] * a + t[1] * o + l,
                        s[2] = e[0] * r + e[1] * n + h,
                        s[3] = e[0] * a + e[1] * o + l,
                        s[4] = i[0] * r + i[1] * n + h,
                        s[5] = i[0] * a + i[1] * o + l
                }
                return s
            }
            function M(t, e, i) {
                return this.isIdentity() ? [t, e, i] : [t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14]]
            }
            function D(t, e) {
                if (this.isIdentity())
                    return t + "," + e;
                var i = this.props;
                return Math.round(100 * (t * i[0] + e * i[4] + i[12])) / 100 + "," + Math.round(100 * (t * i[1] + e * i[5] + i[13])) / 100
            }
            function w() {
                for (var t = 0, e = this.props, i = "matrix3d("; t < 16; )
                    i += s(1e4 * e[t]) / 1e4,
                        i += 15 === t ? ")" : ",",
                        t += 1;
                return i
            }
            function A(t) {
                return t < 1e-6 && 0 < t || -1e-6 < t && t < 0 ? s(1e4 * t) / 1e4 : t
            }
            function T() {
                var t = this.props;
                return "matrix(" + A(t[0]) + "," + A(t[1]) + "," + A(t[4]) + "," + A(t[5]) + "," + A(t[12]) + "," + A(t[13]) + ")"
            }
            return function() {
                this.reset = r,
                    this.rotate = a,
                    this.rotateX = n,
                    this.rotateY = o,
                    this.rotateZ = h,
                    this.skew = p,
                    this.skewFromAxis = f,
                    this.shear = l,
                    this.scale = d,
                    this.setTransform = m,
                    this.translate = c,
                    this.transform = u,
                    this.applyToPoint = b,
                    this.applyToX = x,
                    this.applyToY = S,
                    this.applyToZ = E,
                    this.applyToPointArray = M,
                    this.applyToTriplePoints = k,
                    this.applyToPointStringified = D,
                    this.toCSS = w,
                    this.to2dCSS = T,
                    this.clone = v,
                    this.cloneFromProps = _,
                    this.equals = g,
                    this.inversePoints = C,
                    this.inversePoint = P,
                    this._t = this.transform,
                    this.isIdentity = y,
                    this._identity = !0,
                    this._identityCalculated = !1,
                    this.props = createTypedArray("float32", 16),
                    this.reset()
            }
        }();
        !function(t, e) {
            var i, s = this, r = 256, a = "random", n = e.pow(r, 6), o = e.pow(2, 52), h = 2 * o, l = 255;
            function p(t) {
                var e, i = t.length, s = this, a = 0, n = s.i = s.j = 0, o = s.S = [];
                for (i || (t = [i++]); a < r; )
                    o[a] = a++;
                for (a = 0; a < r; a++)
                    o[a] = o[n = l & n + t[a % i] + (e = o[a])],
                        o[n] = e;
                s.g = function(t) {
                    for (var e, i = 0, a = s.i, n = s.j, o = s.S; t--; )
                        e = o[a = l & a + 1],
                            i = i * r + o[l & (o[a] = o[n = l & n + e]) + (o[n] = e)];
                    return s.i = a,
                        s.j = n,
                        i
                }
            }
            function f(t, e) {
                return e.i = t.i,
                    e.j = t.j,
                    e.S = t.S.slice(),
                    e
            }
            function d(t, e) {
                for (var i, s = t + "", r = 0; r < s.length; )
                    e[l & r] = l & (i ^= 19 * e[l & r]) + s.charCodeAt(r++);
                return m(e)
            }
            function m(t) {
                return String.fromCharCode.apply(0, t)
            }
            e.seedrandom = function(l, c, u) {
                var y = []
                    , g = d(function t(e, i) {
                    var s, r = [], a = typeof e;
                    if (i && "object" == a)
                        for (s in e)
                            try {
                                r.push(t(e[s], i - 1))
                            } catch (t) {}
                    return r.length ? r : "string" == a ? e : e + "\0"
                }((c = !0 === c ? {
                    entropy: !0
                } : c || {}).entropy ? [l, m(t)] : null === l ? function() {
                    try {
                        i;
                        var e = new Uint8Array(r);
                        return (s.crypto || s.msCrypto).getRandomValues(e),
                            m(e)
                    } catch (e) {
                        var a = s.navigator
                            , n = a && a.plugins;
                        return [+new Date, s, n, s.screen, m(t)]
                    }
                }() : l, 3), y)
                    , v = new p(y)
                    , _ = function() {
                    for (var t = v.g(6), e = n, i = 0; t < o; )
                        t = (t + i) * r,
                            e *= r,
                            i = v.g(1);
                    for (; h <= t; )
                        t /= 2,
                            e /= 2,
                            i >>>= 1;
                    return (t + i) / e
                };
                return _.int32 = function() {
                    return 0 | v.g(4)
                }
                    ,
                    _.quick = function() {
                        return v.g(4) / 4294967296
                    }
                    ,
                    _.double = _,
                    d(m(v.S), t),
                    (c.pass || u || function(t, i, s, r) {
                            return r && (r.S && f(r, v),
                                    t.state = function() {
                                        return f(v, {})
                                    }
                            ),
                                s ? (e[a] = t,
                                    i) : t
                        }
                    )(_, g, "global"in c ? c.global : this == e, c.state)
            }
                ,
                d(e.random(), t)
        }([], BMMath);
        var BezierFactory = function() {
            var t = {
                getBezierEasing: function(t, i, s, r, a) {
                    var n = a || ("bez_" + t + "_" + i + "_" + s + "_" + r).replace(/\./g, "p");
                    if (e[n])
                        return e[n];
                    var o = new l([t, i, s, r]);
                    return e[n] = o
                }
            }
                , e = {}
                , i = .1
                , s = "function" == typeof Float32Array;
            function r(t, e) {
                return 1 - 3 * e + 3 * t
            }
            function a(t, e) {
                return 3 * e - 6 * t
            }
            function n(t) {
                return 3 * t
            }
            function o(t, e, i) {
                return ((r(e, i) * t + a(e, i)) * t + n(e)) * t
            }
            function h(t, e, i) {
                return 3 * r(e, i) * t * t + 2 * a(e, i) * t + n(e)
            }
            function l(t) {
                this._p = t,
                    this._mSampleValues = s ? new Float32Array(11) : new Array(11),
                    this._precomputed = !1,
                    this.get = this.get.bind(this)
            }
            return l.prototype = {
                get: function(t) {
                    var e = this._p[0]
                        , i = this._p[1]
                        , s = this._p[2]
                        , r = this._p[3];
                    return this._precomputed || this._precompute(),
                        e === i && s === r ? t : 0 === t ? 0 : 1 === t ? 1 : o(this._getTForX(t), i, r)
                },
                _precompute: function() {
                    var t = this._p[0]
                        , e = this._p[1]
                        , i = this._p[2]
                        , s = this._p[3];
                    this._precomputed = !0,
                    t === e && i === s || this._calcSampleValues()
                },
                _calcSampleValues: function() {
                    for (var t = this._p[0], e = this._p[2], s = 0; s < 11; ++s)
                        this._mSampleValues[s] = o(s * i, t, e)
                },
                _getTForX: function(t) {
                    for (var e = this._p[0], s = this._p[2], r = this._mSampleValues, a = 0, n = 1; 10 !== n && r[n] <= t; ++n)
                        a += i;
                    var l = a + (t - r[--n]) / (r[n + 1] - r[n]) * i
                        , p = h(l, e, s);
                    return .001 <= p ? function(t, e, i, s) {
                        for (var r = 0; r < 4; ++r) {
                            var a = h(e, i, s);
                            if (0 === a)
                                return e;
                            e -= (o(e, i, s) - t) / a
                        }
                        return e
                    }(t, l, e, s) : 0 === p ? l : function(t, e, i, s, r) {
                        for (var a, n, h = 0; 0 < (a = o(n = e + (i - e) / 2, s, r) - t) ? i = n : e = n,
                        1e-7 < Math.abs(a) && ++h < 10; )
                            ;
                        return n
                    }(t, a, a + i, e, s)
                }
            },
                t
        }();
        function extendPrototype(t, e) {
            var i, s, r = t.length;
            for (i = 0; i < r; i += 1)
                for (var a in s = t[i].prototype)
                    s.hasOwnProperty(a) && (e.prototype[a] = s[a])
        }
        function getDescriptor(t, e) {
            return Object.getOwnPropertyDescriptor(t, e)
        }
        function createProxyFunction(t) {
            function e() {}
            return e.prototype = t,
                e
        }
        function bezFunction() {
            function t(t, e, i, s, r, a) {
                var n = t * s + e * r + i * a - r * s - a * t - i * e;
                return -.001 < n && n < .001
            }
            Math;
            var e = function(t, e, i, s) {
                var r, a, n, o, h, l, p = defaultCurveSegments, f = 0, d = [], m = [], c = bezier_length_pool.newElement();
                for (n = i.length,
                         r = 0; r < p; r += 1) {
                    for (h = r / (p - 1),
                             a = l = 0; a < n; a += 1)
                        o = bm_pow(1 - h, 3) * t[a] + 3 * bm_pow(1 - h, 2) * h * i[a] + 3 * (1 - h) * bm_pow(h, 2) * s[a] + bm_pow(h, 3) * e[a],
                            d[a] = o,
                        null !== m[a] && (l += bm_pow(d[a] - m[a], 2)),
                            m[a] = d[a];
                    l && (f += l = bm_sqrt(l)),
                        c.percents[r] = h,
                        c.lengths[r] = f
                }
                return c.addedLength = f,
                    c
            };
            function i(t) {
                this.segmentLength = 0,
                    this.points = new Array(t)
            }
            function s(t, e) {
                this.partialLength = t,
                    this.point = e
            }
            var r, a = (r = {},
                    function(e, a, n, o) {
                        var h = (e[0] + "_" + e[1] + "_" + a[0] + "_" + a[1] + "_" + n[0] + "_" + n[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");
                        if (!r[h]) {
                            var l, p, f, d, m, c, u, y = defaultCurveSegments, g = 0, v = null;
                            2 === e.length && (e[0] != a[0] || e[1] != a[1]) && t(e[0], e[1], a[0], a[1], e[0] + n[0], e[1] + n[1]) && t(e[0], e[1], a[0], a[1], a[0] + o[0], a[1] + o[1]) && (y = 2);
                            var _ = new i(y);
                            for (f = n.length,
                                     l = 0; l < y; l += 1) {
                                for (u = createSizedArray(f),
                                         m = l / (y - 1),
                                         p = c = 0; p < f; p += 1)
                                    d = bm_pow(1 - m, 3) * e[p] + 3 * bm_pow(1 - m, 2) * m * (e[p] + n[p]) + 3 * (1 - m) * bm_pow(m, 2) * (a[p] + o[p]) + bm_pow(m, 3) * a[p],
                                        u[p] = d,
                                    null !== v && (c += bm_pow(u[p] - v[p], 2));
                                g += c = bm_sqrt(c),
                                    _.points[l] = new s(c,u),
                                    v = u
                            }
                            _.segmentLength = g,
                                r[h] = _
                        }
                        return r[h]
                    }
            );
            function n(t, e) {
                var i = e.percents
                    , s = e.lengths
                    , r = i.length
                    , a = bm_floor((r - 1) * t)
                    , n = t * e.addedLength
                    , o = 0;
                if (a === r - 1 || 0 === a || n === s[a])
                    return i[a];
                for (var h = s[a] > n ? -1 : 1, l = !0; l; )
                    if (s[a] <= n && s[a + 1] > n ? (o = (n - s[a]) / (s[a + 1] - s[a]),
                        l = !1) : a += h,
                    a < 0 || r - 1 <= a) {
                        if (a === r - 1)
                            return i[a];
                        l = !1
                    }
                return i[a] + (i[a + 1] - i[a]) * o
            }
            var o = createTypedArray("float32", 8);
            return {
                getSegmentsLength: function(t) {
                    var i, s = segments_length_pool.newElement(), r = t.c, a = t.v, n = t.o, o = t.i, h = t._length, l = s.lengths, p = 0;
                    for (i = 0; i < h - 1; i += 1)
                        l[i] = e(a[i], a[i + 1], n[i], o[i + 1]),
                            p += l[i].addedLength;
                    return r && h && (l[i] = e(a[i], a[0], n[i], o[0]),
                        p += l[i].addedLength),
                        s.totalLength = p,
                        s
                },
                getNewSegment: function(t, e, i, s, r, a, h) {
                    var l, p = n(r = r < 0 ? 0 : 1 < r ? 1 : r, h), f = n(a = 1 < a ? 1 : a, h), d = t.length, m = 1 - p, c = 1 - f, u = m * m * m, y = p * m * m * 3, g = p * p * m * 3, v = p * p * p, _ = m * m * c, b = p * m * c + m * p * c + m * m * f, x = p * p * c + m * p * f + p * m * f, S = p * p * f, E = m * c * c, P = p * c * c + m * f * c + m * c * f, C = p * f * c + m * f * f + p * c * f, k = p * f * f, M = c * c * c, D = f * c * c + c * f * c + c * c * f, w = f * f * c + c * f * f + f * c * f, A = f * f * f;
                    for (l = 0; l < d; l += 1)
                        o[4 * l] = Math.round(1e3 * (u * t[l] + y * i[l] + g * s[l] + v * e[l])) / 1e3,
                            o[4 * l + 1] = Math.round(1e3 * (_ * t[l] + b * i[l] + x * s[l] + S * e[l])) / 1e3,
                            o[4 * l + 2] = Math.round(1e3 * (E * t[l] + P * i[l] + C * s[l] + k * e[l])) / 1e3,
                            o[4 * l + 3] = Math.round(1e3 * (M * t[l] + D * i[l] + w * s[l] + A * e[l])) / 1e3;
                    return o
                },
                getPointInSegment: function(t, e, i, s, r, a) {
                    var o = n(r, a)
                        , h = 1 - o;
                    return [Math.round(1e3 * (h * h * h * t[0] + (o * h * h + h * o * h + h * h * o) * i[0] + (o * o * h + h * o * o + o * h * o) * s[0] + o * o * o * e[0])) / 1e3, Math.round(1e3 * (h * h * h * t[1] + (o * h * h + h * o * h + h * h * o) * i[1] + (o * o * h + h * o * o + o * h * o) * s[1] + o * o * o * e[1])) / 1e3]
                },
                buildBezierData: a,
                pointOnLine2D: t,
                pointOnLine3D: function(e, i, s, r, a, n, o, h, l) {
                    if (0 === s && 0 === n && 0 === l)
                        return t(e, i, r, a, o, h);
                    var p, f = Math.sqrt(Math.pow(r - e, 2) + Math.pow(a - i, 2) + Math.pow(n - s, 2)), d = Math.sqrt(Math.pow(o - e, 2) + Math.pow(h - i, 2) + Math.pow(l - s, 2)), m = Math.sqrt(Math.pow(o - r, 2) + Math.pow(h - a, 2) + Math.pow(l - n, 2));
                    return -1e-4 < (p = d < f ? m < f ? f - d - m : m - d - f : d < m ? m - d - f : d - f - m) && p < 1e-4
                }
            }
        }
        !function() {
            for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i)
                window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"],
                    window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(e, i) {
                    var s = (new Date).getTime()
                        , r = Math.max(0, 16 - (s - t))
                        , a = setTimeout((function() {
                            e(s + r)
                        }
                    ), r);
                    return t = s + r,
                        a
                }
            ),
            window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
                    clearTimeout(t)
                }
            )
        }();
        var bez = bezFunction();
        function dataFunctionManager() {
            function t(t, e) {
                for (var i = 0, s = e.length; i < s; ) {
                    if (e[i].id === t)
                        return e[i].layers.__used ? JSON.parse(JSON.stringify(e[i].layers)) : (e[i].layers.__used = !0,
                            e[i].layers);
                    i += 1
                }
            }
            function e(t) {
                var s, r, a;
                for (s = t.length - 1; 0 <= s; s -= 1)
                    if ("sh" == t[s].ty)
                        if (t[s].ks.k.i)
                            i(t[s].ks.k);
                        else
                            for (a = t[s].ks.k.length,
                                     r = 0; r < a; r += 1)
                                t[s].ks.k[r].s && i(t[s].ks.k[r].s[0]),
                                t[s].ks.k[r].e && i(t[s].ks.k[r].e[0]);
                    else
                        "gr" == t[s].ty && e(t[s].it)
            }
            function i(t) {
                var e, i = t.i.length;
                for (e = 0; e < i; e += 1)
                    t.i[e][0] += t.v[e][0],
                        t.i[e][1] += t.v[e][1],
                        t.o[e][0] += t.v[e][0],
                        t.o[e][1] += t.v[e][1]
            }
            function s(t, e) {
                var i = e ? e.split(".") : [100, 100, 100];
                return t[0] > i[0] || !(i[0] > t[0]) && (t[1] > i[1] || !(i[1] > t[1]) && (t[2] > i[2] || !(i[2] > t[2]) && void 0))
            }
            var r, a = function() {
                var t = [4, 4, 14];
                function e(t) {
                    var e, i, s, r = t.length;
                    for (e = 0; e < r; e += 1)
                        5 === t[e].ty && (s = (i = t[e]).t.d,
                            i.t.d = {
                                k: [{
                                    s: s,
                                    t: 0
                                }]
                            })
                }
                return function(i) {
                    if (s(t, i.v) && (e(i.layers),
                        i.assets)) {
                        var r, a = i.assets.length;
                        for (r = 0; r < a; r += 1)
                            i.assets[r].layers && e(i.assets[r].layers)
                    }
                }
            }(), n = (r = [4, 7, 99],
                    function(t) {
                        if (t.chars && !s(r, t.v)) {
                            var e, a, n, o, h, l = t.chars.length;
                            for (e = 0; e < l; e += 1)
                                if (t.chars[e].data && t.chars[e].data.shapes)
                                    for (n = (h = t.chars[e].data.shapes[0].it).length,
                                             a = 0; a < n; a += 1)
                                        (o = h[a].ks.k).__converted || (i(h[a].ks.k),
                                            o.__converted = !0)
                        }
                    }
            ), o = function() {
                var t = [4, 1, 9];
                function e(t) {
                    var i, s, r, a = t.length;
                    for (i = 0; i < a; i += 1)
                        if ("gr" === t[i].ty)
                            e(t[i].it);
                        else if ("fl" === t[i].ty || "st" === t[i].ty)
                            if (t[i].c.k && t[i].c.k[0].i)
                                for (r = t[i].c.k.length,
                                         s = 0; s < r; s += 1)
                                    t[i].c.k[s].s && (t[i].c.k[s].s[0] /= 255,
                                        t[i].c.k[s].s[1] /= 255,
                                        t[i].c.k[s].s[2] /= 255,
                                        t[i].c.k[s].s[3] /= 255),
                                    t[i].c.k[s].e && (t[i].c.k[s].e[0] /= 255,
                                        t[i].c.k[s].e[1] /= 255,
                                        t[i].c.k[s].e[2] /= 255,
                                        t[i].c.k[s].e[3] /= 255);
                            else
                                t[i].c.k[0] /= 255,
                                    t[i].c.k[1] /= 255,
                                    t[i].c.k[2] /= 255,
                                    t[i].c.k[3] /= 255
                }
                function i(t) {
                    var i, s = t.length;
                    for (i = 0; i < s; i += 1)
                        4 === t[i].ty && e(t[i].shapes)
                }
                return function(e) {
                    if (s(t, e.v) && (i(e.layers),
                        e.assets)) {
                        var r, a = e.assets.length;
                        for (r = 0; r < a; r += 1)
                            e.assets[r].layers && i(e.assets[r].layers)
                    }
                }
            }(), h = function() {
                var t = [4, 4, 18];
                function e(t) {
                    var i, s, r;
                    for (i = t.length - 1; 0 <= i; i -= 1)
                        if ("sh" == t[i].ty)
                            if (t[i].ks.k.i)
                                t[i].ks.k.c = t[i].closed;
                            else
                                for (r = t[i].ks.k.length,
                                         s = 0; s < r; s += 1)
                                    t[i].ks.k[s].s && (t[i].ks.k[s].s[0].c = t[i].closed),
                                    t[i].ks.k[s].e && (t[i].ks.k[s].e[0].c = t[i].closed);
                        else
                            "gr" == t[i].ty && e(t[i].it)
                }
                function i(t) {
                    var i, s, r, a, n, o, h = t.length;
                    for (s = 0; s < h; s += 1) {
                        if ((i = t[s]).hasMask) {
                            var l = i.masksProperties;
                            for (a = l.length,
                                     r = 0; r < a; r += 1)
                                if (l[r].pt.k.i)
                                    l[r].pt.k.c = l[r].cl;
                                else
                                    for (o = l[r].pt.k.length,
                                             n = 0; n < o; n += 1)
                                        l[r].pt.k[n].s && (l[r].pt.k[n].s[0].c = l[r].cl),
                                        l[r].pt.k[n].e && (l[r].pt.k[n].e[0].c = l[r].cl)
                        }
                        4 === i.ty && e(i.shapes)
                    }
                }
                return function(e) {
                    if (s(t, e.v) && (i(e.layers),
                        e.assets)) {
                        var r, a = e.assets.length;
                        for (r = 0; r < a; r += 1)
                            e.assets[r].layers && i(e.assets[r].layers)
                    }
                }
            }(), l = {
                completeData: function(s, r) {
                    s.__complete || (o(s),
                        a(s),
                        n(s),
                        h(s),
                        function s(r, a, n) {
                            var o, h, l, p, f, d, m, c = r.length;
                            for (h = 0; h < c; h += 1)
                                if ("ks"in (o = r[h]) && !o.completed) {
                                    if (o.completed = !0,
                                    o.tt && (r[h - 1].td = o.tt),
                                        o.hasMask) {
                                        var u = o.masksProperties;
                                        for (p = u.length,
                                                 l = 0; l < p; l += 1)
                                            if (u[l].pt.k.i)
                                                i(u[l].pt.k);
                                            else
                                                for (d = u[l].pt.k.length,
                                                         f = 0; f < d; f += 1)
                                                    u[l].pt.k[f].s && i(u[l].pt.k[f].s[0]),
                                                    u[l].pt.k[f].e && i(u[l].pt.k[f].e[0])
                                    }
                                    0 === o.ty ? (o.layers = t(o.refId, a),
                                        s(o.layers, a, n)) : 4 === o.ty ? e(o.shapes) : 5 == o.ty && (0 !== (m = o).t.a.length || "m"in m.t.p || (m.singleShape = !0))
                                }
                        }(s.layers, s.assets, r),
                        s.__complete = !0)
                }
            };
            return l
        }
        var dataManager = dataFunctionManager()
            , FontManager = function() {
            var t = {
                w: 0,
                size: 0,
                shapes: []
            }
                , e = [];
            function i(t, e) {
                var i = createTag("span");
                i.style.fontFamily = e;
                var s = createTag("span");
                s.innerHTML = "giItT1WQy@!-/#",
                    i.style.position = "absolute",
                    i.style.left = "-10000px",
                    i.style.top = "-10000px",
                    i.style.fontSize = "300px",
                    i.style.fontVariant = "normal",
                    i.style.fontStyle = "normal",
                    i.style.fontWeight = "normal",
                    i.style.letterSpacing = "0",
                    i.appendChild(s),
                    document.body.appendChild(i);
                var r = s.offsetWidth;
                return s.style.fontFamily = t + ", " + e,
                    {
                        node: s,
                        w: r,
                        parent: i
                    }
            }
            e = e.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
            var s = function() {
                this.fonts = [],
                    this.chars = null,
                    this.typekitLoaded = 0,
                    this.isLoaded = !1,
                    this.initTime = Date.now()
            };
            return s.getCombinedCharacterCodes = function() {
                return e
            }
                ,
                s.prototype.addChars = function(t) {
                    if (t) {
                        this.chars || (this.chars = []);
                        var e, i, s, r = t.length, a = this.chars.length;
                        for (e = 0; e < r; e += 1) {
                            for (i = 0,
                                     s = !1; i < a; )
                                this.chars[i].style === t[e].style && this.chars[i].fFamily === t[e].fFamily && this.chars[i].ch === t[e].ch && (s = !0),
                                    i += 1;
                            s || (this.chars.push(t[e]),
                                a += 1)
                        }
                    }
                }
                ,
                s.prototype.addFonts = function(t, e) {
                    if (t) {
                        if (this.chars)
                            return this.isLoaded = !0,
                                void (this.fonts = t.list);
                        var s, r, a, n, o = t.list, h = o.length, l = h;
                        for (s = 0; s < h; s += 1) {
                            var p, f, d = !0;
                            if (o[s].loaded = !1,
                                o[s].monoCase = i(o[s].fFamily, "monospace"),
                                o[s].sansCase = i(o[s].fFamily, "sans-serif"),
                                o[s].fPath) {
                                if ("p" === o[s].fOrigin || 3 === o[s].origin) {
                                    if (0 < (p = document.querySelectorAll('style[f-forigin="p"][f-family="' + o[s].fFamily + '"], style[f-origin="3"][f-family="' + o[s].fFamily + '"]')).length && (d = !1),
                                        d) {
                                        var m = createTag("style");
                                        m.setAttribute("f-forigin", o[s].fOrigin),
                                            m.setAttribute("f-origin", o[s].origin),
                                            m.setAttribute("f-family", o[s].fFamily),
                                            m.type = "text/css",
                                            m.innerHTML = "@font-face {font-family: " + o[s].fFamily + "; font-style: normal; src: url('" + o[s].fPath + "');}",
                                            e.appendChild(m)
                                    }
                                } else if ("g" === o[s].fOrigin || 1 === o[s].origin) {
                                    for (p = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'),
                                             f = 0; f < p.length; f++)
                                        -1 !== p[f].href.indexOf(o[s].fPath) && (d = !1);
                                    if (d) {
                                        var c = createTag("link");
                                        c.setAttribute("f-forigin", o[s].fOrigin),
                                            c.setAttribute("f-origin", o[s].origin),
                                            c.type = "text/css",
                                            c.rel = "stylesheet",
                                            c.href = o[s].fPath,
                                            document.body.appendChild(c)
                                    }
                                } else if ("t" === o[s].fOrigin || 2 === o[s].origin) {
                                    for (p = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'),
                                             f = 0; f < p.length; f++)
                                        o[s].fPath === p[f].src && (d = !1);
                                    if (d) {
                                        var u = createTag("link");
                                        u.setAttribute("f-forigin", o[s].fOrigin),
                                            u.setAttribute("f-origin", o[s].origin),
                                            u.setAttribute("rel", "stylesheet"),
                                            u.setAttribute("href", o[s].fPath),
                                            e.appendChild(u)
                                    }
                                }
                            } else
                                o[s].loaded = !0,
                                    l -= 1;
                            o[s].helper = (r = e,
                                a = o[s],
                                n = void 0,
                                (n = createNS("text")).style.fontSize = "100px",
                                n.setAttribute("font-family", a.fFamily),
                                n.setAttribute("font-style", a.fStyle),
                                n.setAttribute("font-weight", a.fWeight),
                                n.textContent = "1",
                                a.fClass ? (n.style.fontFamily = "inherit",
                                    n.setAttribute("class", a.fClass)) : n.style.fontFamily = a.fFamily,
                                r.appendChild(n),
                                createTag("canvas").getContext("2d").font = a.fWeight + " " + a.fStyle + " 100px " + a.fFamily,
                                n),
                                o[s].cache = {},
                                this.fonts.push(o[s])
                        }
                        0 === l ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100)
                    } else
                        this.isLoaded = !0
                }
                ,
                s.prototype.getCharData = function(e, i, s) {
                    for (var r = 0, a = this.chars.length; r < a; ) {
                        if (this.chars[r].ch === e && this.chars[r].style === i && this.chars[r].fFamily === s)
                            return this.chars[r];
                        r += 1
                    }
                    return ("string" == typeof e && 13 !== e.charCodeAt(0) || !e) && console && console.warn && console.warn("Missing character from exported characters list: ", e, i, s),
                        t
                }
                ,
                s.prototype.getFontByName = function(t) {
                    for (var e = 0, i = this.fonts.length; e < i; ) {
                        if (this.fonts[e].fName === t)
                            return this.fonts[e];
                        e += 1
                    }
                    return this.fonts[0]
                }
                ,
                s.prototype.measureText = function(t, e, i) {
                    var s = this.getFontByName(e)
                        , r = t.charCodeAt(0);
                    if (!s.cache[r + 1]) {
                        var a = s.helper;
                        if (" " === t) {
                            a.textContent = "|" + t + "|";
                            var n = a.getComputedTextLength();
                            a.textContent = "||";
                            var o = a.getComputedTextLength();
                            s.cache[r + 1] = (n - o) / 100
                        } else
                            a.textContent = t,
                                s.cache[r + 1] = a.getComputedTextLength() / 100
                    }
                    return s.cache[r + 1] * i
                }
                ,
                s.prototype.checkLoadedFonts = function() {
                    var t, e, i, s = this.fonts.length, r = s;
                    for (t = 0; t < s; t += 1)
                        this.fonts[t].loaded ? r -= 1 : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin ? this.fonts[t].loaded = !0 : (e = this.fonts[t].monoCase.node,
                            i = this.fonts[t].monoCase.w,
                            e.offsetWidth !== i ? (r -= 1,
                                this.fonts[t].loaded = !0) : (e = this.fonts[t].sansCase.node,
                                i = this.fonts[t].sansCase.w,
                            e.offsetWidth !== i && (r -= 1,
                                this.fonts[t].loaded = !0)),
                        this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent),
                            this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
                    0 !== r && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout(function() {
                        this.isLoaded = !0
                    }
                        .bind(this), 0)
                }
                ,
                s.prototype.loaded = function() {
                    return this.isLoaded
                }
                ,
                s
        }()
            , PropertyFactory = function() {
            var t = initialDefaultFrame
                , e = Math.abs;
            function i(t, e) {
                var i, r = this.offsetTime;
                "multidimensional" === this.propType && (i = createTypedArray("float32", this.pv.length));
                for (var a, n, o, h, l, p, f, d, m = e.lastIndex, c = m, u = this.keyframes.length - 1, y = !0; y; ) {
                    if (a = this.keyframes[c],
                        n = this.keyframes[c + 1],
                    c === u - 1 && t >= n.t - r) {
                        a.h && (a = n),
                            m = 0;
                        break
                    }
                    if (n.t - r > t) {
                        m = c;
                        break
                    }
                    c < u - 1 ? c += 1 : (m = 0,
                        y = !1)
                }
                var g, v, _, b, x, S, E, P, C, k, M = n.t - r, D = a.t - r;
                if (a.to) {
                    a.bezierData || (a.bezierData = bez.buildBezierData(a.s, n.s || a.e, a.to, a.ti));
                    var w = a.bezierData;
                    if (M <= t || t < D) {
                        var A = M <= t ? w.points.length - 1 : 0;
                        for (h = w.points[A].point.length,
                                 o = 0; o < h; o += 1)
                            i[o] = w.points[A].point[o]
                    } else {
                        a.__fnct ? d = a.__fnct : (d = BezierFactory.getBezierEasing(a.o.x, a.o.y, a.i.x, a.i.y, a.n).get,
                            a.__fnct = d),
                            l = d((t - D) / (M - D));
                        var T, F = w.segmentLength * l, I = e.lastFrame < t && e._lastKeyframeIndex === c ? e._lastAddedLength : 0;
                        for (f = e.lastFrame < t && e._lastKeyframeIndex === c ? e._lastPoint : 0,
                                 y = !0,
                                 p = w.points.length; y; ) {
                            if (I += w.points[f].partialLength,
                            0 === F || 0 === l || f === w.points.length - 1) {
                                for (h = w.points[f].point.length,
                                         o = 0; o < h; o += 1)
                                    i[o] = w.points[f].point[o];
                                break
                            }
                            if (I <= F && F < I + w.points[f + 1].partialLength) {
                                for (T = (F - I) / w.points[f + 1].partialLength,
                                         h = w.points[f].point.length,
                                         o = 0; o < h; o += 1)
                                    i[o] = w.points[f].point[o] + (w.points[f + 1].point[o] - w.points[f].point[o]) * T;
                                break
                            }
                            f < p - 1 ? f += 1 : y = !1
                        }
                        e._lastPoint = f,
                            e._lastAddedLength = I - w.points[f].partialLength,
                            e._lastKeyframeIndex = c
                    }
                } else {
                    var R, B, L, V, O;
                    if (u = a.s.length,
                        g = n.s || a.e,
                    this.sh && 1 !== a.h)
                        if (M <= t)
                            i[0] = g[0],
                                i[1] = g[1],
                                i[2] = g[2];
                        else if (t <= D)
                            i[0] = a.s[0],
                                i[1] = a.s[1],
                                i[2] = a.s[2];
                        else {
                            v = i,
                                b = (_ = function(t, e, i) {
                                    var s, r, a, n, o, h = [], l = t[0], p = t[1], f = t[2], d = t[3], m = e[0], c = e[1], u = e[2], y = e[3];
                                    return (r = l * m + p * c + f * u + d * y) < 0 && (r = -r,
                                        m = -m,
                                        c = -c,
                                        u = -u,
                                        y = -y),
                                        o = 1e-6 < 1 - r ? (s = Math.acos(r),
                                            a = Math.sin(s),
                                            n = Math.sin((1 - i) * s) / a,
                                        Math.sin(i * s) / a) : (n = 1 - i,
                                            i),
                                        h[0] = n * l + o * m,
                                        h[1] = n * p + o * c,
                                        h[2] = n * f + o * u,
                                        h[3] = n * d + o * y,
                                        h
                                }(s(a.s), s(g), (t - D) / (M - D)))[0],
                                x = _[1],
                                S = _[2],
                                E = _[3],
                                P = Math.atan2(2 * x * E - 2 * b * S, 1 - 2 * x * x - 2 * S * S),
                                C = Math.asin(2 * b * x + 2 * S * E),
                                k = Math.atan2(2 * b * E - 2 * x * S, 1 - 2 * b * b - 2 * S * S),
                                v[0] = P / degToRads,
                                v[1] = C / degToRads,
                                v[2] = k / degToRads
                        }
                    else
                        for (c = 0; c < u; c += 1)
                            1 !== a.h && (l = M <= t ? 1 : t < D ? 0 : (a.o.x.constructor === Array ? (a.__fnct || (a.__fnct = []),
                                a.__fnct[c] ? d = a.__fnct[c] : (R = void 0 === a.o.x[c] ? a.o.x[0] : a.o.x[c],
                                    B = void 0 === a.o.y[c] ? a.o.y[0] : a.o.y[c],
                                    L = void 0 === a.i.x[c] ? a.i.x[0] : a.i.x[c],
                                    V = void 0 === a.i.y[c] ? a.i.y[0] : a.i.y[c],
                                    d = BezierFactory.getBezierEasing(R, B, L, V).get,
                                    a.__fnct[c] = d)) : a.__fnct ? d = a.__fnct : (R = a.o.x,
                                B = a.o.y,
                                L = a.i.x,
                                V = a.i.y,
                                d = BezierFactory.getBezierEasing(R, B, L, V).get,
                                a.__fnct = d),
                                d((t - D) / (M - D)))),
                                g = n.s || a.e,
                                O = 1 === a.h ? a.s[c] : a.s[c] + (g[c] - a.s[c]) * l,
                                1 === u ? i = O : i[c] = O
                }
                return e.lastIndex = m,
                    i
            }
            function s(t) {
                var e = t[0] * degToRads
                    , i = t[1] * degToRads
                    , s = t[2] * degToRads
                    , r = Math.cos(e / 2)
                    , a = Math.cos(i / 2)
                    , n = Math.cos(s / 2)
                    , o = Math.sin(e / 2)
                    , h = Math.sin(i / 2)
                    , l = Math.sin(s / 2);
                return [o * h * n + r * a * l, o * a * n + r * h * l, r * h * n - o * a * l, r * a * n - o * h * l]
            }
            function r() {
                var e = this.comp.renderedFrame - this.offsetTime
                    , i = this.keyframes[0].t - this.offsetTime
                    , s = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
                if (!(e === this._caching.lastFrame || this._caching.lastFrame !== t && (this._caching.lastFrame >= s && s <= e || this._caching.lastFrame < i && e < i))) {
                    this._caching.lastFrame >= e && (this._caching._lastKeyframeIndex = -1,
                        this._caching.lastIndex = 0);
                    var r = this.interpolateValue(e, this._caching);
                    this.pv = r
                }
                return this._caching.lastFrame = e,
                    this.pv
            }
            function a(t) {
                var i;
                if ("unidimensional" === this.propType)
                    i = t * this.mult,
                    1e-5 < e(this.v - i) && (this.v = i,
                        this._mdf = !0);
                else
                    for (var s = 0, r = this.v.length; s < r; )
                        i = t[s] * this.mult,
                        1e-5 < e(this.v[s] - i) && (this.v[s] = i,
                            this._mdf = !0),
                            s += 1
            }
            function n() {
                if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
                    if (this.lock)
                        this.setVValue(this.pv);
                    else {
                        this.lock = !0,
                            this._mdf = this._isFirstFrame;
                        var t, e = this.effectsSequence.length, i = this.kf ? this.pv : this.data.k;
                        for (t = 0; t < e; t += 1)
                            i = this.effectsSequence[t](i);
                        this.setVValue(i),
                            this._isFirstFrame = !1,
                            this.lock = !1,
                            this.frameId = this.elem.globalData.frameId
                    }
            }
            function o(t) {
                this.effectsSequence.push(t),
                    this.container.addDynamicProperty(this)
            }
            function h(t, e, i, s) {
                this.propType = "unidimensional",
                    this.mult = i || 1,
                    this.data = e,
                    this.v = i ? e.k * i : e.k,
                    this.pv = e.k,
                    this._mdf = !1,
                    this.elem = t,
                    this.container = s,
                    this.comp = t.comp,
                    this.k = !1,
                    this.kf = !1,
                    this.vel = 0,
                    this.effectsSequence = [],
                    this._isFirstFrame = !0,
                    this.getValue = n,
                    this.setVValue = a,
                    this.addEffect = o
            }
            function l(t, e, i, s) {
                this.propType = "multidimensional",
                    this.mult = i || 1,
                    this.data = e,
                    this._mdf = !1,
                    this.elem = t,
                    this.container = s,
                    this.comp = t.comp,
                    this.k = !1,
                    this.kf = !1,
                    this.frameId = -1;
                var r, h = e.k.length;
                for (this.v = createTypedArray("float32", h),
                         this.pv = createTypedArray("float32", h),
                         createTypedArray("float32", h),
                         this.vel = createTypedArray("float32", h),
                         r = 0; r < h; r += 1)
                    this.v[r] = e.k[r] * this.mult,
                        this.pv[r] = e.k[r];
                this._isFirstFrame = !0,
                    this.effectsSequence = [],
                    this.getValue = n,
                    this.setVValue = a,
                    this.addEffect = o
            }
            function p(e, s, h, l) {
                this.propType = "unidimensional",
                    this.keyframes = s.k,
                    this.offsetTime = e.data.st,
                    this.frameId = -1,
                    this._caching = {
                        lastFrame: t,
                        lastIndex: 0,
                        value: 0,
                        _lastKeyframeIndex: -1
                    },
                    this.k = !0,
                    this.kf = !0,
                    this.data = s,
                    this.mult = h || 1,
                    this.elem = e,
                    this.container = l,
                    this.comp = e.comp,
                    this.v = t,
                    this.pv = t,
                    this._isFirstFrame = !0,
                    this.getValue = n,
                    this.setVValue = a,
                    this.interpolateValue = i,
                    this.effectsSequence = [r.bind(this)],
                    this.addEffect = o
            }
            function f(e, s, h, l) {
                this.propType = "multidimensional";
                var p, f, d, m, c, u = s.k.length;
                for (p = 0; p < u - 1; p += 1)
                    s.k[p].to && s.k[p].s && s.k[p].e && (f = s.k[p].s,
                        d = s.k[p].e,
                        m = s.k[p].to,
                        c = s.k[p].ti,
                    (2 === f.length && (f[0] !== d[0] || f[1] !== d[1]) && bez.pointOnLine2D(f[0], f[1], d[0], d[1], f[0] + m[0], f[1] + m[1]) && bez.pointOnLine2D(f[0], f[1], d[0], d[1], d[0] + c[0], d[1] + c[1]) || 3 === f.length && (f[0] !== d[0] || f[1] !== d[1] || f[2] !== d[2]) && bez.pointOnLine3D(f[0], f[1], f[2], d[0], d[1], d[2], f[0] + m[0], f[1] + m[1], f[2] + m[2]) && bez.pointOnLine3D(f[0], f[1], f[2], d[0], d[1], d[2], d[0] + c[0], d[1] + c[1], d[2] + c[2])) && (s.k[p].to = null,
                        s.k[p].ti = null),
                    f[0] === d[0] && f[1] === d[1] && 0 === m[0] && 0 === m[1] && 0 === c[0] && 0 === c[1] && (2 === f.length || f[2] === d[2] && 0 === m[2] && 0 === c[2]) && (s.k[p].to = null,
                        s.k[p].ti = null));
                this.effectsSequence = [r.bind(this)],
                    this.keyframes = s.k,
                    this.offsetTime = e.data.st,
                    this.k = !0,
                    this.kf = !0,
                    this._isFirstFrame = !0,
                    this.mult = h || 1,
                    this.elem = e,
                    this.container = l,
                    this.comp = e.comp,
                    this.getValue = n,
                    this.setVValue = a,
                    this.interpolateValue = i,
                    this.frameId = -1;
                var y = s.k[0].s.length;
                for (this.v = createTypedArray("float32", y),
                         this.pv = createTypedArray("float32", y),
                         p = 0; p < y; p += 1)
                    this.v[p] = t,
                        this.pv[p] = t;
                this._caching = {
                    lastFrame: t,
                    lastIndex: 0,
                    value: createTypedArray("float32", y)
                },
                    this.addEffect = o
            }
            return {
                getProp: function(t, e, i, s, r) {
                    var a;
                    if (e.k.length)
                        if ("number" == typeof e.k[0])
                            a = new l(t,e,s,r);
                        else
                            switch (i) {
                                case 0:
                                    a = new p(t,e,s,r);
                                    break;
                                case 1:
                                    a = new f(t,e,s,r)
                            }
                    else
                        a = new h(t,e,s,r);
                    return a.effectsSequence.length && r.addDynamicProperty(a),
                        a
                }
            }
        }()
            , TransformPropertyFactory = function() {
            function t(t, e, i) {
                if (this.elem = t,
                    this.frameId = -1,
                    this.propType = "transform",
                    this.data = e,
                    this.v = new Matrix,
                    this.pre = new Matrix,
                    this.appliedTransformations = 0,
                    this.initDynamicPropertyContainer(i || t),
                    e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this),
                        this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this),
                    e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {
                        k: [0, 0, 0]
                    }, 1, 0, this),
                    e.rx) {
                    if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this),
                        this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this),
                        this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this),
                        e.or.k[0].ti) {
                        var s, r = e.or.k.length;
                        for (s = 0; s < r; s += 1)
                            e.or.k[s].to = e.or.k[s].ti = null
                    }
                    this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this),
                        this.or.sh = !0
                } else
                    this.r = PropertyFactory.getProp(t, e.r || {
                        k: 0
                    }, 0, degToRads, this);
                e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this),
                    this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)),
                    this.a = PropertyFactory.getProp(t, e.a || {
                        k: [0, 0, 0]
                    }, 1, 0, this),
                    this.s = PropertyFactory.getProp(t, e.s || {
                        k: [100, 100, 100]
                    }, 1, .01, this),
                    e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
                        _mdf: !1,
                        v: 1
                    },
                    this._isDirty = !0,
                this.dynamicProperties.length || this.getValue(!0)
            }
            return t.prototype = {
                applyToMatrix: function(t) {
                    var e = this._mdf;
                    this.iterateDynamicProperties(),
                        this._mdf = this._mdf || e,
                    this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                    this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                    this.sk && t.skewFromAxis(-this.sk.v, this.sa.v),
                        this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
                        this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                },
                getValue: function(t) {
                    if (this.elem.globalData.frameId !== this.frameId) {
                        if (this._isDirty && (this.precalculateMatrix(),
                            this._isDirty = !1),
                            this.iterateDynamicProperties(),
                        this._mdf || t) {
                            if (this.v.cloneFromProps(this.pre.props),
                            this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                            this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                            this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v),
                                this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
                                this.autoOriented) {
                                var e, i, s = this.elem.globalData.frameRate;
                                if (this.p && this.p.keyframes && this.p.getValueAtTime)
                                    i = this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (e = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / s, 0),
                                        this.p.getValueAtTime(this.p.keyframes[0].t / s, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (e = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / s, 0),
                                        this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .01) / s, 0)) : (e = this.p.pv,
                                        this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / s, this.p.offsetTime));
                                else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                                    e = [],
                                        i = [];
                                    var r = this.px
                                        , a = this.py;
                                    r._caching.lastFrame + r.offsetTime <= r.keyframes[0].t ? (e[0] = r.getValueAtTime((r.keyframes[0].t + .01) / s, 0),
                                        e[1] = a.getValueAtTime((a.keyframes[0].t + .01) / s, 0),
                                        i[0] = r.getValueAtTime(r.keyframes[0].t / s, 0),
                                        i[1] = a.getValueAtTime(a.keyframes[0].t / s, 0)) : r._caching.lastFrame + r.offsetTime >= r.keyframes[r.keyframes.length - 1].t ? (e[0] = r.getValueAtTime(r.keyframes[r.keyframes.length - 1].t / s, 0),
                                        e[1] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / s, 0),
                                        i[0] = r.getValueAtTime((r.keyframes[r.keyframes.length - 1].t - .01) / s, 0),
                                        i[1] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / s, 0)) : (e = [r.pv, a.pv],
                                        i[0] = r.getValueAtTime((r._caching.lastFrame + r.offsetTime - .01) / s, r.offsetTime),
                                        i[1] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / s, a.offsetTime))
                                }
                                this.v.rotate(-Math.atan2(e[1] - i[1], e[0] - i[0]))
                            }
                            this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                        }
                        this.frameId = this.elem.globalData.frameId
                    }
                },
                precalculateMatrix: function() {
                    if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                        this.appliedTransformations = 1,
                        !this.s.effectsSequence.length)) {
                        if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                            this.appliedTransformations = 2,
                            this.sk) {
                            if (this.sk.effectsSequence.length || this.sa.effectsSequence.length)
                                return;
                            this.pre.skewFromAxis(-this.sk.v, this.sa.v),
                                this.appliedTransformations = 3
                        }
                        if (this.r) {
                            if (this.r.effectsSequence.length)
                                return;
                            this.pre.rotate(-this.r.v),
                                this.appliedTransformations = 4
                        } else
                            this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),
                                this.appliedTransformations = 4)
                    }
                },
                autoOrient: function() {}
            },
                extendPrototype([DynamicPropertyContainer], t),
                t.prototype.addDynamicProperty = function(t) {
                    this._addDynamicProperty(t),
                        this.elem.addDynamicProperty(t),
                        this._isDirty = !0
                }
                ,
                t.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty,
                {
                    getTransformProperty: function(e, i, s) {
                        return new t(e,i,s)
                    }
                }
        }();
        function ShapePath() {
            this.c = !1,
                this._length = 0,
                this._maxLength = 8,
                this.v = createSizedArray(this._maxLength),
                this.o = createSizedArray(this._maxLength),
                this.i = createSizedArray(this._maxLength)
        }
        ShapePath.prototype.setPathData = function(t, e) {
            this.c = t,
                this.setLength(e);
            for (var i = 0; i < e; )
                this.v[i] = point_pool.newElement(),
                    this.o[i] = point_pool.newElement(),
                    this.i[i] = point_pool.newElement(),
                    i += 1
        }
            ,
            ShapePath.prototype.setLength = function(t) {
                for (; this._maxLength < t; )
                    this.doubleArrayLength();
                this._length = t
            }
            ,
            ShapePath.prototype.doubleArrayLength = function() {
                this.v = this.v.concat(createSizedArray(this._maxLength)),
                    this.i = this.i.concat(createSizedArray(this._maxLength)),
                    this.o = this.o.concat(createSizedArray(this._maxLength)),
                    this._maxLength *= 2
            }
            ,
            ShapePath.prototype.setXYAt = function(t, e, i, s, r) {
                var a;
                switch (this._length = Math.max(this._length, s + 1),
                this._length >= this._maxLength && this.doubleArrayLength(),
                    i) {
                    case "v":
                        a = this.v;
                        break;
                    case "i":
                        a = this.i;
                        break;
                    case "o":
                        a = this.o
                }
                (!a[s] || a[s] && !r) && (a[s] = point_pool.newElement()),
                    a[s][0] = t,
                    a[s][1] = e
            }
            ,
            ShapePath.prototype.setTripleAt = function(t, e, i, s, r, a, n, o) {
                this.setXYAt(t, e, "v", n, o),
                    this.setXYAt(i, s, "o", n, o),
                    this.setXYAt(r, a, "i", n, o)
            }
            ,
            ShapePath.prototype.reverse = function() {
                var t = new ShapePath;
                t.setPathData(this.c, this._length);
                var e = this.v
                    , i = this.o
                    , s = this.i
                    , r = 0;
                this.c && (t.setTripleAt(e[0][0], e[0][1], s[0][0], s[0][1], i[0][0], i[0][1], 0, !1),
                    r = 1);
                var a, n = this._length - 1, o = this._length;
                for (a = r; a < o; a += 1)
                    t.setTripleAt(e[n][0], e[n][1], s[n][0], s[n][1], i[n][0], i[n][1], a, !1),
                        n -= 1;
                return t
            }
        ;
        var ShapePropertyFactory = function() {
            var t = -999999;
            function e(t, e, i) {
                var s, r, a, n, o, h, l, p, f, d = i.lastIndex, m = this.keyframes;
                if (t < m[0].t - this.offsetTime)
                    s = m[0].s[0],
                        a = !0,
                        d = 0;
                else if (t >= m[m.length - 1].t - this.offsetTime)
                    s = m[m.length - 1].s ? m[m.length - 1].s[0] : m[m.length - 2].e[0],
                        a = !0;
                else {
                    for (var c, u, y = d, g = m.length - 1, v = !0; v && (c = m[y],
                        !((u = m[y + 1]).t - this.offsetTime > t)); )
                        y < g - 1 ? y += 1 : v = !1;
                    if (d = y,
                        !(a = 1 === c.h)) {
                        if (t >= u.t - this.offsetTime)
                            p = 1;
                        else if (t < c.t - this.offsetTime)
                            p = 0;
                        else {
                            var _;
                            c.__fnct ? _ = c.__fnct : (_ = BezierFactory.getBezierEasing(c.o.x, c.o.y, c.i.x, c.i.y).get,
                                c.__fnct = _),
                                p = _((t - (c.t - this.offsetTime)) / (u.t - this.offsetTime - (c.t - this.offsetTime)))
                        }
                        r = u.s ? u.s[0] : c.e[0]
                    }
                    s = c.s[0]
                }
                for (h = e._length,
                         l = s.i[0].length,
                         i.lastIndex = d,
                         n = 0; n < h; n += 1)
                    for (o = 0; o < l; o += 1)
                        f = a ? s.i[n][o] : s.i[n][o] + (r.i[n][o] - s.i[n][o]) * p,
                            e.i[n][o] = f,
                            f = a ? s.o[n][o] : s.o[n][o] + (r.o[n][o] - s.o[n][o]) * p,
                            e.o[n][o] = f,
                            f = a ? s.v[n][o] : s.v[n][o] + (r.v[n][o] - s.v[n][o]) * p,
                            e.v[n][o] = f
            }
            function i() {
                this.paths = this.localShapeCollection
            }
            function s(t) {
                (function(t, e) {
                        if (t._length !== e._length || t.c !== e.c)
                            return !1;
                        var i, s = t._length;
                        for (i = 0; i < s; i += 1)
                            if (t.v[i][0] !== e.v[i][0] || t.v[i][1] !== e.v[i][1] || t.o[i][0] !== e.o[i][0] || t.o[i][1] !== e.o[i][1] || t.i[i][0] !== e.i[i][0] || t.i[i][1] !== e.i[i][1])
                                return !1;
                        return !0
                    }
                )(this.v, t) || (this.v = shape_pool.clone(t),
                    this.localShapeCollection.releaseShapes(),
                    this.localShapeCollection.addShape(this.v),
                    this._mdf = !0,
                    this.paths = this.localShapeCollection)
            }
            function r() {
                if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
                    if (this.lock)
                        this.setVValue(this.pv);
                    else {
                        this.lock = !0,
                            this._mdf = !1;
                        var t, e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k, i = this.effectsSequence.length;
                        for (t = 0; t < i; t += 1)
                            e = this.effectsSequence[t](e);
                        this.setVValue(e),
                            this.lock = !1,
                            this.frameId = this.elem.globalData.frameId
                    }
            }
            function a(t, e, s) {
                this.propType = "shape",
                    this.comp = t.comp,
                    this.container = t,
                    this.elem = t,
                    this.data = e,
                    this.k = !1,
                    this.kf = !1,
                    this._mdf = !1;
                var r = 3 === s ? e.pt.k : e.ks.k;
                this.v = shape_pool.clone(r),
                    this.pv = shape_pool.clone(this.v),
                    this.localShapeCollection = shapeCollection_pool.newShapeCollection(),
                    this.paths = this.localShapeCollection,
                    this.paths.addShape(this.v),
                    this.reset = i,
                    this.effectsSequence = []
            }
            function n(t) {
                this.effectsSequence.push(t),
                    this.container.addDynamicProperty(this)
            }
            function o(e, s, r) {
                this.propType = "shape",
                    this.comp = e.comp,
                    this.elem = e,
                    this.container = e,
                    this.offsetTime = e.data.st,
                    this.keyframes = 3 === r ? s.pt.k : s.ks.k,
                    this.k = !0,
                    this.kf = !0;
                var a = this.keyframes[0].s[0].i.length;
                this.keyframes[0].s[0].i[0].length,
                    this.v = shape_pool.newElement(),
                    this.v.setPathData(this.keyframes[0].s[0].c, a),
                    this.pv = shape_pool.clone(this.v),
                    this.localShapeCollection = shapeCollection_pool.newShapeCollection(),
                    this.paths = this.localShapeCollection,
                    this.paths.addShape(this.v),
                    this.lastFrame = t,
                    this.reset = i,
                    this._caching = {
                        lastFrame: t,
                        lastIndex: 0
                    },
                    this.effectsSequence = [function() {
                        var e = this.comp.renderedFrame - this.offsetTime
                            , i = this.keyframes[0].t - this.offsetTime
                            , s = this.keyframes[this.keyframes.length - 1].t - this.offsetTime
                            , r = this._caching.lastFrame;
                        return r !== t && (r < i && e < i || s < r && s < e) || (this._caching.lastIndex = r < e ? this._caching.lastIndex : 0,
                            this.interpolateShape(e, this.pv, this._caching)),
                            this._caching.lastFrame = e,
                            this.pv
                    }
                        .bind(this)]
            }
            a.prototype.interpolateShape = e,
                a.prototype.getValue = r,
                a.prototype.setVValue = s,
                a.prototype.addEffect = n,
                o.prototype.getValue = r,
                o.prototype.interpolateShape = e,
                o.prototype.setVValue = s,
                o.prototype.addEffect = n;
            var h = function() {
                var t = roundCorner;
                function e(t, e) {
                    this.v = shape_pool.newElement(),
                        this.v.setPathData(!0, 4),
                        this.localShapeCollection = shapeCollection_pool.newShapeCollection(),
                        this.paths = this.localShapeCollection,
                        this.localShapeCollection.addShape(this.v),
                        this.d = e.d,
                        this.elem = t,
                        this.comp = t.comp,
                        this.frameId = -1,
                        this.initDynamicPropertyContainer(t),
                        this.p = PropertyFactory.getProp(t, e.p, 1, 0, this),
                        this.s = PropertyFactory.getProp(t, e.s, 1, 0, this),
                        this.dynamicProperties.length ? this.k = !0 : (this.k = !1,
                            this.convertEllToPath())
                }
                return e.prototype = {
                    reset: i,
                    getValue: function() {
                        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
                            this.iterateDynamicProperties(),
                        this._mdf && this.convertEllToPath())
                    },
                    convertEllToPath: function() {
                        var e = this.p.v[0]
                            , i = this.p.v[1]
                            , s = this.s.v[0] / 2
                            , r = this.s.v[1] / 2
                            , a = 3 !== this.d
                            , n = this.v;
                        n.v[0][0] = e,
                            n.v[0][1] = i - r,
                            n.v[1][0] = a ? e + s : e - s,
                            n.v[1][1] = i,
                            n.v[2][0] = e,
                            n.v[2][1] = i + r,
                            n.v[3][0] = a ? e - s : e + s,
                            n.v[3][1] = i,
                            n.i[0][0] = a ? e - s * t : e + s * t,
                            n.i[0][1] = i - r,
                            n.i[1][0] = a ? e + s : e - s,
                            n.i[1][1] = i - r * t,
                            n.i[2][0] = a ? e + s * t : e - s * t,
                            n.i[2][1] = i + r,
                            n.i[3][0] = a ? e - s : e + s,
                            n.i[3][1] = i + r * t,
                            n.o[0][0] = a ? e + s * t : e - s * t,
                            n.o[0][1] = i - r,
                            n.o[1][0] = a ? e + s : e - s,
                            n.o[1][1] = i + r * t,
                            n.o[2][0] = a ? e - s * t : e + s * t,
                            n.o[2][1] = i + r,
                            n.o[3][0] = a ? e - s : e + s,
                            n.o[3][1] = i - r * t
                    }
                },
                    extendPrototype([DynamicPropertyContainer], e),
                    e
            }()
                , l = function() {
                function t(t, e) {
                    this.v = shape_pool.newElement(),
                        this.v.setPathData(!0, 0),
                        this.elem = t,
                        this.comp = t.comp,
                        this.data = e,
                        this.frameId = -1,
                        this.d = e.d,
                        this.initDynamicPropertyContainer(t),
                        1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this),
                            this.is = PropertyFactory.getProp(t, e.is, 0, .01, this),
                            this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath,
                        this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this),
                        this.p = PropertyFactory.getProp(t, e.p, 1, 0, this),
                        this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this),
                        this.or = PropertyFactory.getProp(t, e.or, 0, 0, this),
                        this.os = PropertyFactory.getProp(t, e.os, 0, .01, this),
                        this.localShapeCollection = shapeCollection_pool.newShapeCollection(),
                        this.localShapeCollection.addShape(this.v),
                        this.paths = this.localShapeCollection,
                        this.dynamicProperties.length ? this.k = !0 : (this.k = !1,
                            this.convertToPath())
                }
                return t.prototype = {
                    reset: i,
                    getValue: function() {
                        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
                            this.iterateDynamicProperties(),
                        this._mdf && this.convertToPath())
                    },
                    convertStarToPath: function() {
                        var t, e, i, s, r = 2 * Math.floor(this.pt.v), a = 2 * Math.PI / r, n = !0, o = this.or.v, h = this.ir.v, l = this.os.v, p = this.is.v, f = 2 * Math.PI * o / (2 * r), d = 2 * Math.PI * h / (2 * r), m = -Math.PI / 2;
                        m += this.r.v;
                        var c = 3 === this.data.d ? -1 : 1;
                        for (t = this.v._length = 0; t < r; t += 1) {
                            i = n ? l : p,
                                s = n ? f : d;
                            var u = (e = n ? o : h) * Math.cos(m)
                                , y = e * Math.sin(m)
                                , g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y)
                                , v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                            u += +this.p.v[0],
                                y += +this.p.v[1],
                                this.v.setTripleAt(u, y, u - g * s * i * c, y - v * s * i * c, u + g * s * i * c, y + v * s * i * c, t, !0),
                                n = !n,
                                m += a * c
                        }
                    },
                    convertPolygonToPath: function() {
                        var t, e = Math.floor(this.pt.v), i = 2 * Math.PI / e, s = this.or.v, r = this.os.v, a = 2 * Math.PI * s / (4 * e), n = -Math.PI / 2, o = 3 === this.data.d ? -1 : 1;
                        for (n += this.r.v,
                                 t = this.v._length = 0; t < e; t += 1) {
                            var h = s * Math.cos(n)
                                , l = s * Math.sin(n)
                                , p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l)
                                , f = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                            h += +this.p.v[0],
                                l += +this.p.v[1],
                                this.v.setTripleAt(h, l, h - p * a * r * o, l - f * a * r * o, h + p * a * r * o, l + f * a * r * o, t, !0),
                                n += i * o
                        }
                        this.paths.length = 0,
                            this.paths[0] = this.v
                    }
                },
                    extendPrototype([DynamicPropertyContainer], t),
                    t
            }()
                , p = function() {
                function t(t, e) {
                    this.v = shape_pool.newElement(),
                        this.v.c = !0,
                        this.localShapeCollection = shapeCollection_pool.newShapeCollection(),
                        this.localShapeCollection.addShape(this.v),
                        this.paths = this.localShapeCollection,
                        this.elem = t,
                        this.comp = t.comp,
                        this.frameId = -1,
                        this.d = e.d,
                        this.initDynamicPropertyContainer(t),
                        this.p = PropertyFactory.getProp(t, e.p, 1, 0, this),
                        this.s = PropertyFactory.getProp(t, e.s, 1, 0, this),
                        this.r = PropertyFactory.getProp(t, e.r, 0, 0, this),
                        this.dynamicProperties.length ? this.k = !0 : (this.k = !1,
                            this.convertRectToPath())
                }
                return t.prototype = {
                    convertRectToPath: function() {
                        var t = this.p.v[0]
                            , e = this.p.v[1]
                            , i = this.s.v[0] / 2
                            , s = this.s.v[1] / 2
                            , r = bm_min(i, s, this.r.v)
                            , a = r * (1 - roundCorner);
                        this.v._length = 0,
                            2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + i, e - s + r, t + i, e - s + r, t + i, e - s + a, 0, !0),
                                this.v.setTripleAt(t + i, e + s - r, t + i, e + s - a, t + i, e + s - r, 1, !0),
                                0 !== r ? (this.v.setTripleAt(t + i - r, e + s, t + i - r, e + s, t + i - a, e + s, 2, !0),
                                    this.v.setTripleAt(t - i + r, e + s, t - i + a, e + s, t - i + r, e + s, 3, !0),
                                    this.v.setTripleAt(t - i, e + s - r, t - i, e + s - r, t - i, e + s - a, 4, !0),
                                    this.v.setTripleAt(t - i, e - s + r, t - i, e - s + a, t - i, e - s + r, 5, !0),
                                    this.v.setTripleAt(t - i + r, e - s, t - i + r, e - s, t - i + a, e - s, 6, !0),
                                    this.v.setTripleAt(t + i - r, e - s, t + i - a, e - s, t + i - r, e - s, 7, !0)) : (this.v.setTripleAt(t - i, e + s, t - i + a, e + s, t - i, e + s, 2),
                                    this.v.setTripleAt(t - i, e - s, t - i, e - s + a, t - i, e - s, 3))) : (this.v.setTripleAt(t + i, e - s + r, t + i, e - s + a, t + i, e - s + r, 0, !0),
                                0 !== r ? (this.v.setTripleAt(t + i - r, e - s, t + i - r, e - s, t + i - a, e - s, 1, !0),
                                    this.v.setTripleAt(t - i + r, e - s, t - i + a, e - s, t - i + r, e - s, 2, !0),
                                    this.v.setTripleAt(t - i, e - s + r, t - i, e - s + r, t - i, e - s + a, 3, !0),
                                    this.v.setTripleAt(t - i, e + s - r, t - i, e + s - a, t - i, e + s - r, 4, !0),
                                    this.v.setTripleAt(t - i + r, e + s, t - i + r, e + s, t - i + a, e + s, 5, !0),
                                    this.v.setTripleAt(t + i - r, e + s, t + i - a, e + s, t + i - r, e + s, 6, !0),
                                    this.v.setTripleAt(t + i, e + s - r, t + i, e + s - r, t + i, e + s - a, 7, !0)) : (this.v.setTripleAt(t - i, e - s, t - i + a, e - s, t - i, e - s, 1, !0),
                                    this.v.setTripleAt(t - i, e + s, t - i, e + s - a, t - i, e + s, 2, !0),
                                    this.v.setTripleAt(t + i, e + s, t + i - a, e + s, t + i, e + s, 3, !0)))
                    },
                    getValue: function(t) {
                        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
                            this.iterateDynamicProperties(),
                        this._mdf && this.convertRectToPath())
                    },
                    reset: i
                },
                    extendPrototype([DynamicPropertyContainer], t),
                    t
            }();
            return {
                getShapeProp: function(t, e, i) {
                    var s;
                    return 3 === i || 4 === i ? s = (3 === i ? e.pt : e.ks).k.length ? new o(t,e,i) : new a(t,e,i) : 5 === i ? s = new p(t,e) : 6 === i ? s = new h(t,e) : 7 === i && (s = new l(t,e)),
                    s.k && t.addDynamicProperty(s),
                        s
                },
                getConstructorFunction: function() {
                    return a
                },
                getKeyframedConstructorFunction: function() {
                    return o
                }
            }
        }(), ShapeModifiers = (Tr = {},
            Ur = {},
            Tr.registerModifier = function(t, e) {
                Ur[t] || (Ur[t] = e)
            }
            ,
            Tr.getModifier = function(t, e, i) {
                return new Ur[t](e,i)
            }
            ,
            Tr), Tr, Ur;
        function ShapeModifier() {}
        function TrimModifier() {}
        function RoundCornersModifier() {}
        function RepeaterModifier() {}
        function ShapeCollection() {
            this._length = 0,
                this._maxLength = 4,
                this.shapes = createSizedArray(this._maxLength)
        }
        function DashProperty(t, e, i, s) {
            this.elem = t,
                this.frameId = -1,
                this.dataProps = createSizedArray(e.length),
                this.renderer = i,
                this.k = !1,
                this.dashStr = "",
                this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0),
                this.dashoffset = createTypedArray("float32", 1),
                this.initDynamicPropertyContainer(s);
            var r, a, n = e.length || 0;
            for (r = 0; r < n; r += 1)
                a = PropertyFactory.getProp(t, e[r].v, 0, 0, this),
                    this.k = a.k || this.k,
                    this.dataProps[r] = {
                        n: e[r].n,
                        p: a
                    };
            this.k || this.getValue(!0),
                this._isAnimated = this.k
        }
        function GradientProperty(t, e, i) {
            this.data = e,
                this.c = createTypedArray("uint8c", 4 * e.p);
            var s = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
            this.o = createTypedArray("float32", s),
                this._cmdf = !1,
                this._omdf = !1,
                this._collapsable = this.checkCollapsable(),
                this._hasOpacity = s,
                this.initDynamicPropertyContainer(i),
                this.prop = PropertyFactory.getProp(t, e.k, 1, null, this),
                this.k = this.prop.k,
                this.getValue(!0)
        }
        ShapeModifier.prototype.initModifierProperties = function() {}
            ,
            ShapeModifier.prototype.addShapeToModifier = function() {}
            ,
            ShapeModifier.prototype.addShape = function(t) {
                if (!this.closed) {
                    var e = {
                        shape: t.sh,
                        data: t,
                        localShapeCollection: shapeCollection_pool.newShapeCollection()
                    };
                    this.shapes.push(e),
                        this.addShapeToModifier(e),
                    this._isAnimated && t.setAsAnimated()
                }
            }
            ,
            ShapeModifier.prototype.init = function(t, e) {
                this.shapes = [],
                    this.elem = t,
                    this.initDynamicPropertyContainer(t),
                    this.initModifierProperties(t, e),
                    this.frameId = initialDefaultFrame,
                    this.closed = !1,
                    this.k = !1,
                    this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
            }
            ,
            ShapeModifier.prototype.processKeys = function() {
                this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId,
                    this.iterateDynamicProperties())
            }
            ,
            extendPrototype([DynamicPropertyContainer], ShapeModifier),
            extendPrototype([ShapeModifier], TrimModifier),
            TrimModifier.prototype.initModifierProperties = function(t, e) {
                this.s = PropertyFactory.getProp(t, e.s, 0, .01, this),
                    this.e = PropertyFactory.getProp(t, e.e, 0, .01, this),
                    this.o = PropertyFactory.getProp(t, e.o, 0, 0, this),
                    this.sValue = 0,
                    this.eValue = 0,
                    this.getValue = this.processKeys,
                    this.m = e.m,
                    this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length
            }
            ,
            TrimModifier.prototype.addShapeToModifier = function(t) {
                t.pathsData = []
            }
            ,
            TrimModifier.prototype.calculateShapeEdges = function(t, e, i, s, r) {
                var a = [];
                e <= 1 ? a.push({
                    s: t,
                    e: e
                }) : 1 <= t ? a.push({
                    s: t - 1,
                    e: e - 1
                }) : (a.push({
                    s: t,
                    e: 1
                }),
                    a.push({
                        s: 0,
                        e: e - 1
                    }));
                var n, o, h = [], l = a.length;
                for (n = 0; n < l; n += 1) {
                    var p, f;
                    (o = a[n]).e * r < s || o.s * r > s + i || (p = o.s * r <= s ? 0 : (o.s * r - s) / i,
                        f = o.e * r >= s + i ? 1 : (o.e * r - s) / i,
                        h.push([p, f]))
                }
                return h.length || h.push([0, 0]),
                    h
            }
            ,
            TrimModifier.prototype.releasePathsData = function(t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1)
                    segments_length_pool.release(t[e]);
                return t.length = 0,
                    t
            }
            ,
            TrimModifier.prototype.processShapes = function(t) {
                var e, i, s;
                if (this._mdf || t) {
                    var r = this.o.v % 360 / 360;
                    if (r < 0 && (r += 1),
                        e = (1 < this.s.v ? 1 : this.s.v < 0 ? 0 : this.s.v) + r,
                    (i = (1 < this.e.v ? 1 : this.e.v < 0 ? 0 : this.e.v) + r) < e) {
                        var a = e;
                        e = i,
                            i = a
                    }
                    e = 1e-4 * Math.round(1e4 * e),
                        i = 1e-4 * Math.round(1e4 * i),
                        this.sValue = e,
                        this.eValue = i
                } else
                    e = this.sValue,
                        i = this.eValue;
                var n, o, h, l, p, f, d = this.shapes.length, m = 0;
                if (i === e)
                    for (n = 0; n < d; n += 1)
                        this.shapes[n].localShapeCollection.releaseShapes(),
                            this.shapes[n].shape._mdf = !0,
                            this.shapes[n].shape.paths = this.shapes[n].localShapeCollection;
                else if (1 === i && 0 === e || 0 === i && 1 === e) {
                    if (this._mdf)
                        for (n = 0; n < d; n += 1)
                            this.shapes[n].pathsData.length = 0,
                                this.shapes[n].shape._mdf = !0
                } else {
                    var c, u, y = [];
                    for (n = 0; n < d; n += 1)
                        if ((c = this.shapes[n]).shape._mdf || this._mdf || t || 2 === this.m) {
                            if (h = (s = c.shape.paths)._length,
                                f = 0,
                            !c.shape._mdf && c.pathsData.length)
                                f = c.totalShapeLength;
                            else {
                                for (l = this.releasePathsData(c.pathsData),
                                         o = 0; o < h; o += 1)
                                    p = bez.getSegmentsLength(s.shapes[o]),
                                        l.push(p),
                                        f += p.totalLength;
                                c.totalShapeLength = f,
                                    c.pathsData = l
                            }
                            m += f,
                                c.shape._mdf = !0
                        } else
                            c.shape.paths = c.localShapeCollection;
                    var g, v = e, _ = i, b = 0;
                    for (n = d - 1; 0 <= n; n -= 1)
                        if ((c = this.shapes[n]).shape._mdf) {
                            for ((u = c.localShapeCollection).releaseShapes(),
                                     2 === this.m && 1 < d ? (g = this.calculateShapeEdges(e, i, c.totalShapeLength, b, m),
                                         b += c.totalShapeLength) : g = [[v, _]],
                                     h = g.length,
                                     o = 0; o < h; o += 1) {
                                v = g[o][0],
                                    _ = g[o][1],
                                    y.length = 0,
                                    _ <= 1 ? y.push({
                                        s: c.totalShapeLength * v,
                                        e: c.totalShapeLength * _
                                    }) : 1 <= v ? y.push({
                                        s: c.totalShapeLength * (v - 1),
                                        e: c.totalShapeLength * (_ - 1)
                                    }) : (y.push({
                                        s: c.totalShapeLength * v,
                                        e: c.totalShapeLength
                                    }),
                                        y.push({
                                            s: 0,
                                            e: c.totalShapeLength * (_ - 1)
                                        }));
                                var x = this.addShapes(c, y[0]);
                                if (y[0].s !== y[0].e) {
                                    if (1 < y.length)
                                        if (c.shape.paths.shapes[c.shape.paths._length - 1].c) {
                                            var S = x.pop();
                                            this.addPaths(x, u),
                                                x = this.addShapes(c, y[1], S)
                                        } else
                                            this.addPaths(x, u),
                                                x = this.addShapes(c, y[1]);
                                    this.addPaths(x, u)
                                }
                            }
                            c.shape.paths = u
                        }
                }
            }
            ,
            TrimModifier.prototype.addPaths = function(t, e) {
                var i, s = t.length;
                for (i = 0; i < s; i += 1)
                    e.addShape(t[i])
            }
            ,
            TrimModifier.prototype.addSegment = function(t, e, i, s, r, a, n) {
                r.setXYAt(e[0], e[1], "o", a),
                    r.setXYAt(i[0], i[1], "i", a + 1),
                n && r.setXYAt(t[0], t[1], "v", a),
                    r.setXYAt(s[0], s[1], "v", a + 1)
            }
            ,
            TrimModifier.prototype.addSegmentFromArray = function(t, e, i, s) {
                e.setXYAt(t[1], t[5], "o", i),
                    e.setXYAt(t[2], t[6], "i", i + 1),
                s && e.setXYAt(t[0], t[4], "v", i),
                    e.setXYAt(t[3], t[7], "v", i + 1)
            }
            ,
            TrimModifier.prototype.addShapes = function(t, e, i) {
                var s, r, a, n, o, h, l, p, f = t.pathsData, d = t.shape.paths.shapes, m = t.shape.paths._length, c = 0, u = [], y = !0;
                for (p = i ? (o = i._length,
                    i._length) : (i = shape_pool.newElement(),
                    o = 0),
                         u.push(i),
                         s = 0; s < m; s += 1) {
                    for (h = f[s].lengths,
                             i.c = d[s].c,
                             a = d[s].c ? h.length : h.length + 1,
                             r = 1; r < a; r += 1)
                        if (c + (n = h[r - 1]).addedLength < e.s)
                            c += n.addedLength,
                                i.c = !1;
                        else {
                            if (c > e.e) {
                                i.c = !1;
                                break
                            }
                            e.s <= c && e.e >= c + n.addedLength ? (this.addSegment(d[s].v[r - 1], d[s].o[r - 1], d[s].i[r], d[s].v[r], i, o, y),
                                y = !1) : (l = bez.getNewSegment(d[s].v[r - 1], d[s].v[r], d[s].o[r - 1], d[s].i[r], (e.s - c) / n.addedLength, (e.e - c) / n.addedLength, h[r - 1]),
                                this.addSegmentFromArray(l, i, o, y),
                                y = !1,
                                i.c = !1),
                                c += n.addedLength,
                                o += 1
                        }
                    if (d[s].c && h.length) {
                        if (n = h[r - 1],
                        c <= e.e) {
                            var g = h[r - 1].addedLength;
                            e.s <= c && e.e >= c + g ? (this.addSegment(d[s].v[r - 1], d[s].o[r - 1], d[s].i[0], d[s].v[0], i, o, y),
                                y = !1) : (l = bez.getNewSegment(d[s].v[r - 1], d[s].v[0], d[s].o[r - 1], d[s].i[0], (e.s - c) / g, (e.e - c) / g, h[r - 1]),
                                this.addSegmentFromArray(l, i, o, y),
                                y = !1,
                                i.c = !1)
                        } else
                            i.c = !1;
                        c += n.addedLength,
                            o += 1
                    }
                    if (i._length && (i.setXYAt(i.v[p][0], i.v[p][1], "i", p),
                        i.setXYAt(i.v[i._length - 1][0], i.v[i._length - 1][1], "o", i._length - 1)),
                    c > e.e)
                        break;
                    s < m - 1 && (i = shape_pool.newElement(),
                        y = !0,
                        u.push(i),
                        o = 0)
                }
                return u
            }
            ,
            ShapeModifiers.registerModifier("tm", TrimModifier),
            extendPrototype([ShapeModifier], RoundCornersModifier),
            RoundCornersModifier.prototype.initModifierProperties = function(t, e) {
                this.getValue = this.processKeys,
                    this.rd = PropertyFactory.getProp(t, e.r, 0, null, this),
                    this._isAnimated = !!this.rd.effectsSequence.length
            }
            ,
            RoundCornersModifier.prototype.processPath = function(t, e) {
                var i = shape_pool.newElement();
                i.c = t.c;
                var s, r, a, n, o, h, l, p, f, d, m, c, u, y = t._length, g = 0;
                for (s = 0; s < y; s += 1)
                    r = t.v[s],
                        n = t.o[s],
                        a = t.i[s],
                        r[0] === n[0] && r[1] === n[1] && r[0] === a[0] && r[1] === a[1] ? 0 !== s && s !== y - 1 || t.c ? (o = 0 === s ? t.v[y - 1] : t.v[s - 1],
                            l = (h = Math.sqrt(Math.pow(r[0] - o[0], 2) + Math.pow(r[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0,
                            p = c = r[0] + (o[0] - r[0]) * l,
                            f = u = r[1] - (r[1] - o[1]) * l,
                            d = p - (p - r[0]) * roundCorner,
                            m = f - (f - r[1]) * roundCorner,
                            i.setTripleAt(p, f, d, m, c, u, g),
                            g += 1,
                            o = s === y - 1 ? t.v[0] : t.v[s + 1],
                            l = (h = Math.sqrt(Math.pow(r[0] - o[0], 2) + Math.pow(r[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0,
                            p = d = r[0] + (o[0] - r[0]) * l,
                            f = m = r[1] + (o[1] - r[1]) * l,
                            c = p - (p - r[0]) * roundCorner,
                            u = f - (f - r[1]) * roundCorner,
                            i.setTripleAt(p, f, d, m, c, u, g)) : i.setTripleAt(r[0], r[1], n[0], n[1], a[0], a[1], g) : i.setTripleAt(t.v[s][0], t.v[s][1], t.o[s][0], t.o[s][1], t.i[s][0], t.i[s][1], g),
                        g += 1;
                return i
            }
            ,
            RoundCornersModifier.prototype.processShapes = function(t) {
                var e, i, s, r, a, n, o = this.shapes.length, h = this.rd.v;
                if (0 !== h)
                    for (i = 0; i < o; i += 1) {
                        if ((a = this.shapes[i]).shape.paths,
                            n = a.localShapeCollection,
                        a.shape._mdf || this._mdf || t)
                            for (n.releaseShapes(),
                                     a.shape._mdf = !0,
                                     e = a.shape.paths.shapes,
                                     r = a.shape.paths._length,
                                     s = 0; s < r; s += 1)
                                n.addShape(this.processPath(e[s], h));
                        a.shape.paths = a.localShapeCollection
                    }
                this.dynamicProperties.length || (this._mdf = !1)
            }
            ,
            ShapeModifiers.registerModifier("rd", RoundCornersModifier),
            extendPrototype([ShapeModifier], RepeaterModifier),
            RepeaterModifier.prototype.initModifierProperties = function(t, e) {
                this.getValue = this.processKeys,
                    this.c = PropertyFactory.getProp(t, e.c, 0, null, this),
                    this.o = PropertyFactory.getProp(t, e.o, 0, null, this),
                    this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this),
                    this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this),
                    this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this),
                    this.data = e,
                this.dynamicProperties.length || this.getValue(!0),
                    this._isAnimated = !!this.dynamicProperties.length,
                    this.pMatrix = new Matrix,
                    this.rMatrix = new Matrix,
                    this.sMatrix = new Matrix,
                    this.tMatrix = new Matrix,
                    this.matrix = new Matrix
            }
            ,
            RepeaterModifier.prototype.applyTransforms = function(t, e, i, s, r, a) {
                var n = a ? -1 : 1
                    , o = s.s.v[0] + (1 - s.s.v[0]) * (1 - r)
                    , h = s.s.v[1] + (1 - s.s.v[1]) * (1 - r);
                t.translate(s.p.v[0] * n * r, s.p.v[1] * n * r, s.p.v[2]),
                    e.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]),
                    e.rotate(-s.r.v * n * r),
                    e.translate(s.a.v[0], s.a.v[1], s.a.v[2]),
                    i.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]),
                    i.scale(a ? 1 / o : o, a ? 1 / h : h),
                    i.translate(s.a.v[0], s.a.v[1], s.a.v[2])
            }
            ,
            RepeaterModifier.prototype.init = function(t, e, i, s) {
                for (this.elem = t,
                         this.arr = e,
                         this.pos = i,
                         this.elemsData = s,
                         this._currentCopies = 0,
                         this._elements = [],
                         this._groups = [],
                         this.frameId = -1,
                         this.initDynamicPropertyContainer(t),
                         this.initModifierProperties(t, e[i]); 0 < i; )
                    i -= 1,
                        this._elements.unshift(e[i]);
                this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
            }
            ,
            RepeaterModifier.prototype.resetElements = function(t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1)
                    t[e]._processed = !1,
                    "gr" === t[e].ty && this.resetElements(t[e].it)
            }
            ,
            RepeaterModifier.prototype.cloneElements = function(t) {
                t.length;
                var e = JSON.parse(JSON.stringify(t));
                return this.resetElements(e),
                    e
            }
            ,
            RepeaterModifier.prototype.changeGroupRender = function(t, e) {
                var i, s = t.length;
                for (i = 0; i < s; i += 1)
                    t[i]._render = e,
                    "gr" === t[i].ty && this.changeGroupRender(t[i].it, e)
            }
            ,
            RepeaterModifier.prototype.processShapes = function(t) {
                var e, i, s, r, a;
                if (this._mdf || t) {
                    var n, o = Math.ceil(this.c.v);
                    if (this._groups.length < o) {
                        for (; this._groups.length < o; ) {
                            var h = {
                                it: this.cloneElements(this._elements),
                                ty: "gr"
                            };
                            h.it.push({
                                a: {
                                    a: 0,
                                    ix: 1,
                                    k: [0, 0]
                                },
                                nm: "Transform",
                                o: {
                                    a: 0,
                                    ix: 7,
                                    k: 100
                                },
                                p: {
                                    a: 0,
                                    ix: 2,
                                    k: [0, 0]
                                },
                                r: {
                                    a: 1,
                                    ix: 6,
                                    k: [{
                                        s: 0,
                                        e: 0,
                                        t: 0
                                    }, {
                                        s: 0,
                                        e: 0,
                                        t: 1
                                    }]
                                },
                                s: {
                                    a: 0,
                                    ix: 3,
                                    k: [100, 100]
                                },
                                sa: {
                                    a: 0,
                                    ix: 5,
                                    k: 0
                                },
                                sk: {
                                    a: 0,
                                    ix: 4,
                                    k: 0
                                },
                                ty: "tr"
                            }),
                                this.arr.splice(0, 0, h),
                                this._groups.splice(0, 0, h),
                                this._currentCopies += 1
                        }
                        this.elem.reloadShapes()
                    }
                    for (s = a = 0; s <= this._groups.length - 1; s += 1)
                        n = a < o,
                            this._groups[s]._render = n,
                            this.changeGroupRender(this._groups[s].it, n),
                            a += 1;
                    this._currentCopies = o;
                    var l = this.o.v
                        , p = l % 1
                        , f = 0 < l ? Math.floor(l) : Math.ceil(l)
                        , d = (this.tr.v.props,
                        this.pMatrix.props)
                        , m = this.rMatrix.props
                        , c = this.sMatrix.props;
                    this.pMatrix.reset(),
                        this.rMatrix.reset(),
                        this.sMatrix.reset(),
                        this.tMatrix.reset(),
                        this.matrix.reset();
                    var u, y, g = 0;
                    if (0 < l) {
                        for (; g < f; )
                            this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1),
                                g += 1;
                        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1),
                            g += p)
                    } else if (l < 0) {
                        for (; f < g; )
                            this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0),
                                g -= 1;
                        p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0),
                            g -= p)
                    }
                    for (s = 1 === this.data.m ? 0 : this._currentCopies - 1,
                             r = 1 === this.data.m ? 1 : -1,
                             a = this._currentCopies; a; ) {
                        if (y = (i = (e = this.elemsData[s].it)[e.length - 1].transform.mProps.v.props).length,
                            e[e.length - 1].transform.mProps._mdf = !0,
                            e[e.length - 1].transform.op._mdf = !0,
                            e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (s / (this._currentCopies - 1)),
                        0 !== g) {
                            for ((0 !== s && 1 === r || s !== this._currentCopies - 1 && -1 === r) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1),
                                     this.matrix.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
                                     this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]),
                                     this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]),
                                     u = 0; u < y; u += 1)
                                i[u] = this.matrix.props[u];
                            this.matrix.reset()
                        } else
                            for (this.matrix.reset(),
                                     u = 0; u < y; u += 1)
                                i[u] = this.matrix.props[u];
                        g += 1,
                            a -= 1,
                            s += r
                    }
                } else
                    for (a = this._currentCopies,
                             s = 0,
                             r = 1; a; )
                        i = (e = this.elemsData[s].it)[e.length - 1].transform.mProps.v.props,
                            e[e.length - 1].transform.mProps._mdf = !1,
                            e[e.length - 1].transform.op._mdf = !1,
                            a -= 1,
                            s += r
            }
            ,
            RepeaterModifier.prototype.addShape = function() {}
            ,
            ShapeModifiers.registerModifier("rp", RepeaterModifier),
            ShapeCollection.prototype.addShape = function(t) {
                this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)),
                    this._maxLength *= 2),
                    this.shapes[this._length] = t,
                    this._length += 1
            }
            ,
            ShapeCollection.prototype.releaseShapes = function() {
                var t;
                for (t = 0; t < this._length; t += 1)
                    shape_pool.release(this.shapes[t]);
                this._length = 0
            }
            ,
            DashProperty.prototype.getValue = function(t) {
                if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId,
                    this.iterateDynamicProperties(),
                    this._mdf = this._mdf || t,
                    this._mdf)) {
                    var e = 0
                        , i = this.dataProps.length;
                    for ("svg" === this.renderer && (this.dashStr = ""),
                             e = 0; e < i; e += 1)
                        "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v
                }
            }
            ,
            extendPrototype([DynamicPropertyContainer], DashProperty),
            GradientProperty.prototype.comparePoints = function(t, e) {
                for (var i = 0, s = this.o.length / 2; i < s; ) {
                    if (.01 < Math.abs(t[4 * i] - t[4 * e + 2 * i]))
                        return !1;
                    i += 1
                }
                return !0
            }
            ,
            GradientProperty.prototype.checkCollapsable = function() {
                if (this.o.length / 2 != this.c.length / 4)
                    return !1;
                if (this.data.k.k[0].s)
                    for (var t = 0, e = this.data.k.k.length; t < e; ) {
                        if (!this.comparePoints(this.data.k.k[t].s, this.data.p))
                            return !1;
                        t += 1
                    }
                else if (!this.comparePoints(this.data.k.k, this.data.p))
                    return !1;
                return !0
            }
            ,
            GradientProperty.prototype.getValue = function(t) {
                if (this.prop.getValue(),
                    this._mdf = !1,
                    this._cmdf = !1,
                    this._omdf = !1,
                this.prop._mdf || t) {
                    var e, i, s, r = 4 * this.data.p;
                    for (e = 0; e < r; e += 1)
                        i = e % 4 == 0 ? 100 : 255,
                            s = Math.round(this.prop.v[e] * i),
                        this.c[e] !== s && (this.c[e] = s,
                            this._cmdf = !t);
                    if (this.o.length)
                        for (r = this.prop.v.length,
                                 e = 4 * this.data.p; e < r; e += 1)
                            i = e % 2 == 0 ? 100 : 1,
                                s = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e],
                            this.o[e - 4 * this.data.p] !== s && (this.o[e - 4 * this.data.p] = s,
                                this._omdf = !t);
                    this._mdf = !t
                }
            }
            ,
            extendPrototype([DynamicPropertyContainer], GradientProperty);
        var buildShapeString = function(t, e, i, s) {
            if (0 === e)
                return "";
            var r, a = t.o, n = t.i, o = t.v, h = " M" + s.applyToPointStringified(o[0][0], o[0][1]);
            for (r = 1; r < e; r += 1)
                h += " C" + s.applyToPointStringified(a[r - 1][0], a[r - 1][1]) + " " + s.applyToPointStringified(n[r][0], n[r][1]) + " " + s.applyToPointStringified(o[r][0], o[r][1]);
            return i && e && (h += " C" + s.applyToPointStringified(a[r - 1][0], a[r - 1][1]) + " " + s.applyToPointStringified(n[0][0], n[0][1]) + " " + s.applyToPointStringified(o[0][0], o[0][1]),
                h += "z"),
                h
        }, ImagePreloader = function() {
            var t = function() {
                var t = createTag("canvas");
                t.width = 1,
                    t.height = 1;
                var e = t.getContext("2d");
                return e.fillStyle = "#FF0000",
                    e.fillRect(0, 0, 1, 1),
                    t
            }();
            function e() {
                this.loadedAssets += 1,
                this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null)
            }
            function i(e) {
                var i = function(t, e, i) {
                    var s = "";
                    if (t.e)
                        s = t.p;
                    else if (e) {
                        var r = t.p;
                        -1 !== r.indexOf("images/") && (r = r.split("/")[1]),
                            s = e + r
                    } else
                        s = i,
                            s += t.u ? t.u : "",
                            s += t.p;
                    return s
                }(e, this.assetsPath, this.path)
                    , s = createTag("img");
                s.crossOrigin = "anonymous",
                    s.addEventListener("load", this._imageLoaded.bind(this), !1),
                    s.addEventListener("error", function() {
                        r.img = t,
                            this._imageLoaded()
                    }
                        .bind(this), !1),
                    s.src = i;
                var r = {
                    img: s,
                    assetData: e
                };
                return r
            }
            function s(t, e) {
                this.imagesLoadedCb = e;
                var i, s = t.length;
                for (i = 0; i < s; i += 1)
                    t[i].layers || (this.totalImages += 1,
                        this.images.push(this._createImageData(t[i])))
            }
            function r(t) {
                this.path = t || ""
            }
            function a(t) {
                this.assetsPath = t || ""
            }
            function n(t) {
                for (var e = 0, i = this.images.length; e < i; ) {
                    if (this.images[e].assetData === t)
                        return this.images[e].img;
                    e += 1
                }
            }
            function o() {
                this.imagesLoadedCb = null,
                    this.images.length = 0
            }
            function h() {
                return this.totalImages === this.loadedAssets
            }
            return function() {
                this.loadAssets = s,
                    this.setAssetsPath = a,
                    this.setPath = r,
                    this.loaded = h,
                    this.destroy = o,
                    this.getImage = n,
                    this._createImageData = i,
                    this._imageLoaded = e,
                    this.assetsPath = "",
                    this.path = "",
                    this.totalImages = 0,
                    this.loadedAssets = 0,
                    this.imagesLoadedCb = null,
                    this.images = []
            }
        }(), featureSupport = (lw = {
            maskType: !0
        },
        (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (lw.maskType = !1),
            lw), lw, filtersFactory = (mw = {},
            mw.createFilter = function(t) {
                var e = createNS("filter");
                return e.setAttribute("id", t),
                    e.setAttribute("filterUnits", "objectBoundingBox"),
                    e.setAttribute("x", "0%"),
                    e.setAttribute("y", "0%"),
                    e.setAttribute("width", "100%"),
                    e.setAttribute("height", "100%"),
                    e
            }
            ,
            mw.createAlphaToLuminanceFilter = function() {
                var t = createNS("feColorMatrix");
                return t.setAttribute("type", "matrix"),
                    t.setAttribute("color-interpolation-filters", "sRGB"),
                    t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"),
                    t
            }
            ,
            mw), mw, assetLoader = function() {
            function t(t) {
                return t.response && "object" == typeof t.response ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0
            }
            return {
                load: function(e, i, s) {
                    var r, a = new XMLHttpRequest;
                    a.open("GET", e, !0);
                    try {
                        a.responseType = "json"
                    } catch (e) {}
                    a.send(),
                        a.onreadystatechange = function() {
                            if (4 == a.readyState)
                                if (200 == a.status)
                                    r = t(a),
                                        i(r);
                                else
                                    try {
                                        r = t(a),
                                            i(r)
                                    } catch (t) {
                                        s && s(t)
                                    }
                        }
                }
            }
        }();
        function TextAnimatorProperty(t, e, i) {
            this._isFirstFrame = !0,
                this._hasMaskedPath = !1,
                this._frameId = -1,
                this._textData = t,
                this._renderType = e,
                this._elem = i,
                this._animatorsData = createSizedArray(this._textData.a.length),
                this._pathData = {},
                this._moreOptions = {
                    alignment: {}
                },
                this.renderedLetters = [],
                this.lettersChangedFlag = !1,
                this.initDynamicPropertyContainer(i)
        }
        function TextAnimatorDataProperty(t, e, i) {
            var s = {
                propType: !1
            }
                , r = PropertyFactory.getProp
                , a = e.a;
            this.a = {
                r: a.r ? r(t, a.r, 0, degToRads, i) : s,
                rx: a.rx ? r(t, a.rx, 0, degToRads, i) : s,
                ry: a.ry ? r(t, a.ry, 0, degToRads, i) : s,
                sk: a.sk ? r(t, a.sk, 0, degToRads, i) : s,
                sa: a.sa ? r(t, a.sa, 0, degToRads, i) : s,
                s: a.s ? r(t, a.s, 1, .01, i) : s,
                a: a.a ? r(t, a.a, 1, 0, i) : s,
                o: a.o ? r(t, a.o, 0, .01, i) : s,
                p: a.p ? r(t, a.p, 1, 0, i) : s,
                sw: a.sw ? r(t, a.sw, 0, 0, i) : s,
                sc: a.sc ? r(t, a.sc, 1, 0, i) : s,
                fc: a.fc ? r(t, a.fc, 1, 0, i) : s,
                fh: a.fh ? r(t, a.fh, 0, 0, i) : s,
                fs: a.fs ? r(t, a.fs, 0, .01, i) : s,
                fb: a.fb ? r(t, a.fb, 0, .01, i) : s,
                t: a.t ? r(t, a.t, 0, 0, i) : s
            },
                this.s = TextSelectorProp.getTextSelectorProp(t, e.s, i),
                this.s.t = e.s.t
        }
        function LetterProps(t, e, i, s, r, a) {
            this.o = t,
                this.sw = e,
                this.sc = i,
                this.fc = s,
                this.m = r,
                this.p = a,
                this._mdf = {
                    o: !0,
                    sw: !!e,
                    sc: !!i,
                    fc: !!s,
                    m: !0,
                    p: !0
                }
        }
        function TextProperty(t, e) {
            this._frameId = initialDefaultFrame,
                this.pv = "",
                this.v = "",
                this.kf = !1,
                this._isFirstFrame = !0,
                this._mdf = !1,
                this.data = e,
                this.elem = t,
                this.comp = this.elem.comp,
                this.keysIndex = 0,
                this.canResize = !1,
                this.minimumFontSize = 1,
                this.effectsSequence = [],
                this.currentData = {
                    ascent: 0,
                    boxWidth: this.defaultBoxWidth,
                    f: "",
                    fStyle: "",
                    fWeight: "",
                    fc: "",
                    j: "",
                    justifyOffset: "",
                    l: [],
                    lh: 0,
                    lineWidths: [],
                    ls: "",
                    of: "",
                    s: "",
                    sc: "",
                    sw: 0,
                    t: 0,
                    tr: 0,
                    sz: 0,
                    ps: null,
                    fillColorAnim: !1,
                    strokeColorAnim: !1,
                    strokeWidthAnim: !1,
                    yOffset: 0,
                    finalSize: 0,
                    finalText: [],
                    finalLineHeight: 0,
                    __complete: !1
                },
                this.copyData(this.currentData, this.data.d.k[0].s),
            this.searchProperty() || this.completeTextData(this.currentData)
        }
        TextAnimatorProperty.prototype.searchProperties = function() {
            var t, e, i = this._textData.a.length, s = PropertyFactory.getProp;
            for (t = 0; t < i; t += 1)
                e = this._textData.a[t],
                    this._animatorsData[t] = new TextAnimatorDataProperty(this._elem,e,this);
            this._textData.p && "m"in this._textData.p ? (this._pathData = {
                f: s(this._elem, this._textData.p.f, 0, 0, this),
                l: s(this._elem, this._textData.p.l, 0, 0, this),
                r: this._textData.p.r,
                m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
            },
                this._hasMaskedPath = !0) : this._hasMaskedPath = !1,
                this._moreOptions.alignment = s(this._elem, this._textData.m.a, 1, 0, this)
        }
            ,
            TextAnimatorProperty.prototype.getMeasures = function(t, e) {
                if (this.lettersChangedFlag = e,
                this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
                    this._isFirstFrame = !1;
                    var i, s, r, a, n, o, h, l, p, f, d, m, c, u, y, g, v, _, b, x = this._moreOptions.alignment.v, S = this._animatorsData, E = this._textData, P = this.mHelper, C = this._renderType, k = this.renderedLetters.length, M = (this.data,
                        t.l);
                    if (this._hasMaskedPath) {
                        if (b = this._pathData.m,
                        !this._pathData.n || this._pathData._mdf) {
                            var D, w = b.v;
                            for (this._pathData.r && (w = w.reverse()),
                                     n = {
                                         tLength: 0,
                                         segments: []
                                     },
                                     a = w._length - 1,
                                     r = g = 0; r < a; r += 1)
                                D = bez.buildBezierData(w.v[r], w.v[r + 1], [w.o[r][0] - w.v[r][0], w.o[r][1] - w.v[r][1]], [w.i[r + 1][0] - w.v[r + 1][0], w.i[r + 1][1] - w.v[r + 1][1]]),
                                    n.tLength += D.segmentLength,
                                    n.segments.push(D),
                                    g += D.segmentLength;
                            r = a,
                            b.v.c && (D = bez.buildBezierData(w.v[r], w.v[0], [w.o[r][0] - w.v[r][0], w.o[r][1] - w.v[r][1]], [w.i[0][0] - w.v[0][0], w.i[0][1] - w.v[0][1]]),
                                n.tLength += D.segmentLength,
                                n.segments.push(D),
                                g += D.segmentLength),
                                this._pathData.pi = n
                        }
                        if (n = this._pathData.pi,
                            o = this._pathData.f.v,
                            f = 1,
                            p = !(l = d = 0),
                            u = n.segments,
                        o < 0 && b.v.c)
                            for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength),
                                     f = (c = u[d = u.length - 1].points).length - 1; o < 0; )
                                o += c[f].partialLength,
                                (f -= 1) < 0 && (f = (c = u[d -= 1].points).length - 1);
                        m = (c = u[d].points)[f - 1],
                            y = (h = c[f]).partialLength
                    }
                    a = M.length,
                        s = i = 0;
                    var A, T, F, I, R = 1.2 * t.finalSize * .714, B = !0;
                    F = S.length;
                    var L, V, O, G, N, z, H, Y, j, W, q, U, X, Z = -1, K = o, $ = d, J = f, Q = -1, tt = "", et = this.defaultPropsArray;
                    if (2 === t.j || 1 === t.j) {
                        var it = 0
                            , st = 0
                            , rt = 2 === t.j ? -.5 : -1
                            , at = 0
                            , nt = !0;
                        for (r = 0; r < a; r += 1)
                            if (M[r].n) {
                                for (it && (it += st); at < r; )
                                    M[at].animatorJustifyOffset = it,
                                        at += 1;
                                nt = !(it = 0)
                            } else {
                                for (T = 0; T < F; T += 1)
                                    (A = S[T].a).t.propType && (nt && 2 === t.j && (st += A.t.v * rt),
                                        (L = S[T].s.getMult(M[r].anIndexes[T], E.a[T].s.totalChars)).length ? it += A.t.v * L[0] * rt : it += A.t.v * L * rt);
                                nt = !1
                            }
                        for (it && (it += st); at < r; )
                            M[at].animatorJustifyOffset = it,
                                at += 1
                    }
                    for (r = 0; r < a; r += 1) {
                        if (P.reset(),
                            N = 1,
                            M[r].n)
                            i = 0,
                                s += t.yOffset,
                                s += B ? 1 : 0,
                                o = K,
                                B = !1,
                            this._hasMaskedPath && (f = J,
                                m = (c = u[d = $].points)[f - 1],
                                y = (h = c[f]).partialLength,
                                l = 0),
                                X = W = U = tt = "",
                                et = this.defaultPropsArray;
                        else {
                            if (this._hasMaskedPath) {
                                if (Q !== M[r].line) {
                                    switch (t.j) {
                                        case 1:
                                            o += g - t.lineWidths[M[r].line];
                                            break;
                                        case 2:
                                            o += (g - t.lineWidths[M[r].line]) / 2
                                    }
                                    Q = M[r].line
                                }
                                Z !== M[r].ind && (M[Z] && (o += M[Z].extra),
                                    o += M[r].an / 2,
                                    Z = M[r].ind),
                                    o += x[0] * M[r].an / 200;
                                var ot = 0;
                                for (T = 0; T < F; T += 1)
                                    (A = S[T].a).p.propType && ((L = S[T].s.getMult(M[r].anIndexes[T], E.a[T].s.totalChars)).length ? ot += A.p.v[0] * L[0] : ot += A.p.v[0] * L),
                                    A.a.propType && ((L = S[T].s.getMult(M[r].anIndexes[T], E.a[T].s.totalChars)).length ? ot += A.a.v[0] * L[0] : ot += A.a.v[0] * L);
                                for (p = !0; p; )
                                    o + ot <= l + y || !c ? (v = (o + ot - l) / h.partialLength,
                                        O = m.point[0] + (h.point[0] - m.point[0]) * v,
                                        G = m.point[1] + (h.point[1] - m.point[1]) * v,
                                        P.translate(-x[0] * M[r].an / 200, -x[1] * R / 100),
                                        p = !1) : c && (l += h.partialLength,
                                    (f += 1) >= c.length && (f = 0,
                                        c = u[d += 1] ? u[d].points : b.v.c ? u[d = f = 0].points : (l -= h.partialLength,
                                            null)),
                                    c && (m = h,
                                        y = (h = c[f]).partialLength));
                                V = M[r].an / 2 - M[r].add,
                                    P.translate(-V, 0, 0)
                            } else
                                V = M[r].an / 2 - M[r].add,
                                    P.translate(-V, 0, 0),
                                    P.translate(-x[0] * M[r].an / 200, -x[1] * R / 100, 0);
                            for (M[r].l,
                                     T = 0; T < F; T += 1)
                                (A = S[T].a).t.propType && (L = S[T].s.getMult(M[r].anIndexes[T], E.a[T].s.totalChars),
                                0 === i && 0 === t.j || (this._hasMaskedPath ? L.length ? o += A.t.v * L[0] : o += A.t.v * L : L.length ? i += A.t.v * L[0] : i += A.t.v * L));
                            for (M[r].l,
                                 t.strokeWidthAnim && (H = t.sw || 0),
                                 t.strokeColorAnim && (z = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]),
                                 t.fillColorAnim && t.fc && (Y = [t.fc[0], t.fc[1], t.fc[2]]),
                                     T = 0; T < F; T += 1)
                                (A = S[T].a).a.propType && ((L = S[T].s.getMult(M[r].anIndexes[T], E.a[T].s.totalChars)).length ? P.translate(-A.a.v[0] * L[0], -A.a.v[1] * L[1], A.a.v[2] * L[2]) : P.translate(-A.a.v[0] * L, -A.a.v[1] * L, A.a.v[2] * L));
                            for (T = 0; T < F; T += 1)
                                (A = S[T].a).s.propType && ((L = S[T].s.getMult(M[r].anIndexes[T], E.a[T].s.totalChars)).length ? P.scale(1 + (A.s.v[0] - 1) * L[0], 1 + (A.s.v[1] - 1) * L[1], 1) : P.scale(1 + (A.s.v[0] - 1) * L, 1 + (A.s.v[1] - 1) * L, 1));
                            for (T = 0; T < F; T += 1) {
                                if (A = S[T].a,
                                    L = S[T].s.getMult(M[r].anIndexes[T], E.a[T].s.totalChars),
                                A.sk.propType && (L.length ? P.skewFromAxis(-A.sk.v * L[0], A.sa.v * L[1]) : P.skewFromAxis(-A.sk.v * L, A.sa.v * L)),
                                A.r.propType && (L.length ? P.rotateZ(-A.r.v * L[2]) : P.rotateZ(-A.r.v * L)),
                                A.ry.propType && (L.length ? P.rotateY(A.ry.v * L[1]) : P.rotateY(A.ry.v * L)),
                                A.rx.propType && (L.length ? P.rotateX(A.rx.v * L[0]) : P.rotateX(A.rx.v * L)),
                                A.o.propType && (L.length ? N += (A.o.v * L[0] - N) * L[0] : N += (A.o.v * L - N) * L),
                                t.strokeWidthAnim && A.sw.propType && (L.length ? H += A.sw.v * L[0] : H += A.sw.v * L),
                                t.strokeColorAnim && A.sc.propType)
                                    for (j = 0; j < 3; j += 1)
                                        L.length ? z[j] = z[j] + (A.sc.v[j] - z[j]) * L[0] : z[j] = z[j] + (A.sc.v[j] - z[j]) * L;
                                if (t.fillColorAnim && t.fc) {
                                    if (A.fc.propType)
                                        for (j = 0; j < 3; j += 1)
                                            L.length ? Y[j] = Y[j] + (A.fc.v[j] - Y[j]) * L[0] : Y[j] = Y[j] + (A.fc.v[j] - Y[j]) * L;
                                    A.fh.propType && (Y = L.length ? addHueToRGB(Y, A.fh.v * L[0]) : addHueToRGB(Y, A.fh.v * L)),
                                    A.fs.propType && (Y = L.length ? addSaturationToRGB(Y, A.fs.v * L[0]) : addSaturationToRGB(Y, A.fs.v * L)),
                                    A.fb.propType && (Y = L.length ? addBrightnessToRGB(Y, A.fb.v * L[0]) : addBrightnessToRGB(Y, A.fb.v * L))
                                }
                            }
                            for (T = 0; T < F; T += 1)
                                (A = S[T].a).p.propType && (L = S[T].s.getMult(M[r].anIndexes[T], E.a[T].s.totalChars),
                                    this._hasMaskedPath ? L.length ? P.translate(0, A.p.v[1] * L[0], -A.p.v[2] * L[1]) : P.translate(0, A.p.v[1] * L, -A.p.v[2] * L) : L.length ? P.translate(A.p.v[0] * L[0], A.p.v[1] * L[1], -A.p.v[2] * L[2]) : P.translate(A.p.v[0] * L, A.p.v[1] * L, -A.p.v[2] * L));
                            if (t.strokeWidthAnim && (W = H < 0 ? 0 : H),
                            t.strokeColorAnim && (q = "rgb(" + Math.round(255 * z[0]) + "," + Math.round(255 * z[1]) + "," + Math.round(255 * z[2]) + ")"),
                            t.fillColorAnim && t.fc && (U = "rgb(" + Math.round(255 * Y[0]) + "," + Math.round(255 * Y[1]) + "," + Math.round(255 * Y[2]) + ")"),
                                this._hasMaskedPath) {
                                if (P.translate(0, -t.ls),
                                    P.translate(0, x[1] * R / 100 + s, 0),
                                    E.p.p) {
                                    _ = (h.point[1] - m.point[1]) / (h.point[0] - m.point[0]);
                                    var ht = 180 * Math.atan(_) / Math.PI;
                                    h.point[0] < m.point[0] && (ht += 180),
                                        P.rotate(-ht * Math.PI / 180)
                                }
                                P.translate(O, G, 0),
                                    o -= x[0] * M[r].an / 200,
                                M[r + 1] && Z !== M[r + 1].ind && (o += M[r].an / 2,
                                    o += t.tr / 1e3 * t.finalSize)
                            } else {
                                switch (P.translate(i, s, 0),
                                t.ps && P.translate(t.ps[0], t.ps[1] + t.ascent, 0),
                                    t.j) {
                                    case 1:
                                        P.translate(M[r].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[M[r].line]), 0, 0);
                                        break;
                                    case 2:
                                        P.translate(M[r].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[M[r].line]) / 2, 0, 0)
                                }
                                P.translate(0, -t.ls),
                                    P.translate(V, 0, 0),
                                    P.translate(x[0] * M[r].an / 200, x[1] * R / 100, 0),
                                    i += M[r].l + t.tr / 1e3 * t.finalSize
                            }
                            "html" === C ? tt = P.toCSS() : "svg" === C ? tt = P.to2dCSS() : et = [P.props[0], P.props[1], P.props[2], P.props[3], P.props[4], P.props[5], P.props[6], P.props[7], P.props[8], P.props[9], P.props[10], P.props[11], P.props[12], P.props[13], P.props[14], P.props[15]],
                                X = N
                        }
                        this.lettersChangedFlag = k <= r ? (I = new LetterProps(X,W,q,U,tt,et),
                            this.renderedLetters.push(I),
                            k += 1,
                            !0) : (I = this.renderedLetters[r]).update(X, W, q, U, tt, et) || this.lettersChangedFlag
                    }
                }
            }
            ,
            TextAnimatorProperty.prototype.getValue = function() {
                this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId,
                    this.iterateDynamicProperties())
            }
            ,
            TextAnimatorProperty.prototype.mHelper = new Matrix,
            TextAnimatorProperty.prototype.defaultPropsArray = [],
            extendPrototype([DynamicPropertyContainer], TextAnimatorProperty),
            LetterProps.prototype.update = function(t, e, i, s, r, a) {
                this._mdf.o = !1,
                    this._mdf.sw = !1,
                    this._mdf.sc = !1,
                    this._mdf.fc = !1,
                    this._mdf.m = !1;
                var n = this._mdf.p = !1;
                return this.o !== t && (this.o = t,
                    n = this._mdf.o = !0),
                this.sw !== e && (this.sw = e,
                    n = this._mdf.sw = !0),
                this.sc !== i && (this.sc = i,
                    n = this._mdf.sc = !0),
                this.fc !== s && (this.fc = s,
                    n = this._mdf.fc = !0),
                this.m !== r && (this.m = r,
                    n = this._mdf.m = !0),
                !a.length || this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13] || (this.p = a,
                    n = this._mdf.p = !0),
                    n
            }
            ,
            TextProperty.prototype.defaultBoxWidth = [0, 0],
            TextProperty.prototype.copyData = function(t, e) {
                for (var i in e)
                    e.hasOwnProperty(i) && (t[i] = e[i]);
                return t
            }
            ,
            TextProperty.prototype.setCurrentData = function(t) {
                t.__complete || this.completeTextData(t),
                    this.currentData = t,
                    this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth,
                    this._mdf = !0
            }
            ,
            TextProperty.prototype.searchProperty = function() {
                return this.searchKeyframes()
            }
            ,
            TextProperty.prototype.searchKeyframes = function() {
                return this.kf = 1 < this.data.d.k.length,
                this.kf && this.addEffect(this.getKeyframeValue.bind(this)),
                    this.kf
            }
            ,
            TextProperty.prototype.addEffect = function(t) {
                this.effectsSequence.push(t),
                    this.elem.addDynamicProperty(this)
            }
            ,
            TextProperty.prototype.getValue = function(t) {
                if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
                    this.currentData.t = this.data.d.k[this.keysIndex].s.t;
                    var e = this.currentData
                        , i = this.keysIndex;
                    if (this.lock)
                        this.setCurrentData(this.currentData);
                    else {
                        this.lock = !0,
                            this._mdf = !1;
                        var s, r = this.effectsSequence.length, a = t || this.data.d.k[this.keysIndex].s;
                        for (s = 0; s < r; s += 1)
                            a = i !== this.keysIndex ? this.effectsSequence[s](a, a.t) : this.effectsSequence[s](this.currentData, a.t);
                        e !== a && this.setCurrentData(a),
                            this.pv = this.v = this.currentData,
                            this.lock = !1,
                            this.frameId = this.elem.globalData.frameId
                    }
                }
            }
            ,
            TextProperty.prototype.getKeyframeValue = function() {
                for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, i = 0, s = t.length; i <= s - 1 && (t[i].s,
                    !(i === s - 1 || t[i + 1].t > e)); )
                    i += 1;
                return this.keysIndex !== i && (this.keysIndex = i),
                    this.data.d.k[this.keysIndex].s
            }
            ,
            TextProperty.prototype.buildFinalText = function(t) {
                for (var e = FontManager.getCombinedCharacterCodes(), i = [], s = 0, r = t.length; s < r; )
                    -1 !== e.indexOf(t.charCodeAt(s)) ? i[i.length - 1] += t.charAt(s) : i.push(t.charAt(s)),
                        s += 1;
                return i
            }
            ,
            TextProperty.prototype.completeTextData = function(t) {
                t.__complete = !0;
                var e, i, s, r, a, n, o, h = this.elem.globalData.fontManager, l = this.data, p = [], f = 0, d = l.m.g, m = 0, c = 0, u = 0, y = [], g = 0, v = 0, _ = h.getFontByName(t.f), b = 0, x = _.fStyle ? _.fStyle.split(" ") : [], S = "normal", E = "normal";
                for (i = x.length,
                         e = 0; e < i; e += 1)
                    switch (x[e].toLowerCase()) {
                        case "italic":
                            E = "italic";
                            break;
                        case "bold":
                            S = "700";
                            break;
                        case "black":
                            S = "900";
                            break;
                        case "medium":
                            S = "500";
                            break;
                        case "regular":
                        case "normal":
                            S = "400";
                            break;
                        case "light":
                        case "thin":
                            S = "200"
                    }
                t.fWeight = _.fWeight || S,
                    t.fStyle = E,
                    t.finalSize = t.s,
                    t.finalText = this.buildFinalText(t.t),
                    i = t.finalText.length,
                    t.finalLineHeight = t.lh;
                var P, C = t.tr / 1e3 * t.finalSize;
                if (t.sz)
                    for (var k, M, D = !0, w = t.sz[0], A = t.sz[1]; D; ) {
                        g = k = 0,
                            i = (M = this.buildFinalText(t.t)).length,
                            C = t.tr / 1e3 * t.finalSize;
                        var T = -1;
                        for (e = 0; e < i; e += 1)
                            P = M[e].charCodeAt(0),
                                s = !1,
                                " " === M[e] ? T = e : 13 !== P && 3 !== P || (s = !(g = 0),
                                    k += t.finalLineHeight || 1.2 * t.finalSize),
                                w < g + (b = h.chars ? (o = h.getCharData(M[e], _.fStyle, _.fFamily),
                                    s ? 0 : o.w * t.finalSize / 100) : h.measureText(M[e], t.f, t.finalSize)) && " " !== M[e] ? (-1 === T ? i += 1 : e = T,
                                    k += t.finalLineHeight || 1.2 * t.finalSize,
                                    M.splice(e, T === e ? 1 : 0, "\r"),
                                    T = -1,
                                    g = 0) : (g += b,
                                    g += C);
                        k += _.ascent * t.finalSize / 100,
                            this.canResize && t.finalSize > this.minimumFontSize && A < k ? (t.finalSize -= 1,
                                t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = M,
                                i = t.finalText.length,
                                D = !1)
                    }
                g = -C;
                var F, I = b = 0;
                for (e = 0; e < i; e += 1)
                    if (s = !1,
                        P = (F = t.finalText[e]).charCodeAt(0),
                        " " === F ? r = " " : 13 === P || 3 === P ? (I = 0,
                            y.push(g),
                            v = v < g ? g : v,
                            g = -2 * C,
                            s = !(r = ""),
                            u += 1) : r = t.finalText[e],
                        b = h.chars ? (o = h.getCharData(F, _.fStyle, h.getFontByName(t.f).fFamily),
                            s ? 0 : o.w * t.finalSize / 100) : h.measureText(r, t.f, t.finalSize),
                        " " === F ? I += b + C : (g += b + C + I,
                            I = 0),
                        p.push({
                            l: b,
                            an: b,
                            add: m,
                            n: s,
                            anIndexes: [],
                            val: r,
                            line: u,
                            animatorJustifyOffset: 0
                        }),
                    2 == d) {
                        if (m += b,
                        "" === r || " " === r || e === i - 1) {
                            for ("" !== r && " " !== r || (m -= b); c <= e; )
                                p[c].an = m,
                                    p[c].ind = f,
                                    p[c].extra = b,
                                    c += 1;
                            f += 1,
                                m = 0
                        }
                    } else if (3 == d) {
                        if (m += b,
                        "" === r || e === i - 1) {
                            for ("" === r && (m -= b); c <= e; )
                                p[c].an = m,
                                    p[c].ind = f,
                                    p[c].extra = b,
                                    c += 1;
                            m = 0,
                                f += 1
                        }
                    } else
                        p[f].ind = f,
                            p[f].extra = 0,
                            f += 1;
                if (t.l = p,
                    v = v < g ? g : v,
                    y.push(g),
                    t.sz)
                    t.boxWidth = t.sz[0],
                        t.justifyOffset = 0;
                else
                    switch (t.boxWidth = v,
                        t.j) {
                        case 1:
                            t.justifyOffset = -t.boxWidth;
                            break;
                        case 2:
                            t.justifyOffset = -t.boxWidth / 2;
                            break;
                        default:
                            t.justifyOffset = 0
                    }
                t.lineWidths = y;
                var R, B, L = l.a;
                n = L.length;
                var V, O, G = [];
                for (a = 0; a < n; a += 1) {
                    for ((R = L[a]).a.sc && (t.strokeColorAnim = !0),
                         R.a.sw && (t.strokeWidthAnim = !0),
                         (R.a.fc || R.a.fh || R.a.fs || R.a.fb) && (t.fillColorAnim = !0),
                             O = 0,
                             V = R.s.b,
                             e = 0; e < i; e += 1)
                        (B = p[e]).anIndexes[a] = O,
                        (1 == V && "" !== B.val || 2 == V && "" !== B.val && " " !== B.val || 3 == V && (B.n || " " == B.val || e == i - 1) || 4 == V && (B.n || e == i - 1)) && (1 === R.s.rn && G.push(O),
                            O += 1);
                    l.a[a].s.totalChars = O;
                    var N, z = -1;
                    if (1 === R.s.rn)
                        for (e = 0; e < i; e += 1)
                            z != (B = p[e]).anIndexes[a] && (z = B.anIndexes[a],
                                N = G.splice(Math.floor(Math.random() * G.length), 1)[0]),
                                B.anIndexes[a] = N
                }
                t.yOffset = t.finalLineHeight || 1.2 * t.finalSize,
                    t.ls = t.ls || 0,
                    t.ascent = _.ascent * t.finalSize / 100
            }
            ,
            TextProperty.prototype.updateDocumentData = function(t, e) {
                e = void 0 === e ? this.keysIndex : e;
                var i = this.copyData({}, this.data.d.k[e].s);
                i = this.copyData(i, t),
                    this.data.d.k[e].s = i,
                    this.recalculate(e),
                    this.elem.addDynamicProperty(this)
            }
            ,
            TextProperty.prototype.recalculate = function(t) {
                var e = this.data.d.k[t].s;
                e.__complete = !1,
                    this.keysIndex = 0,
                    this._isFirstFrame = !0,
                    this.getValue(e)
            }
            ,
            TextProperty.prototype.canResizeFont = function(t) {
                this.canResize = t,
                    this.recalculate(this.keysIndex),
                    this.elem.addDynamicProperty(this)
            }
            ,
            TextProperty.prototype.setMinimumFontSize = function(t) {
                this.minimumFontSize = Math.floor(t) || 1,
                    this.recalculate(this.keysIndex),
                    this.elem.addDynamicProperty(this)
            }
        ;
        var TextSelectorProp = function() {
            var t = Math.max
                , e = Math.min
                , i = Math.floor;
            function s(t, e) {
                this._currentTextLength = -1,
                    this.k = !1,
                    this.data = e,
                    this.elem = t,
                    this.comp = t.comp,
                    this.finalS = 0,
                    this.finalE = 0,
                    this.initDynamicPropertyContainer(t),
                    this.s = PropertyFactory.getProp(t, e.s || {
                        k: 0
                    }, 0, 0, this),
                    this.e = "e"in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
                        v: 100
                    },
                    this.o = PropertyFactory.getProp(t, e.o || {
                        k: 0
                    }, 0, 0, this),
                    this.xe = PropertyFactory.getProp(t, e.xe || {
                        k: 0
                    }, 0, 0, this),
                    this.ne = PropertyFactory.getProp(t, e.ne || {
                        k: 0
                    }, 0, 0, this),
                    this.a = PropertyFactory.getProp(t, e.a, 0, .01, this),
                this.dynamicProperties.length || this.getValue()
            }
            return s.prototype = {
                getMult: function(s) {
                    this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
                    var r = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get
                        , a = 0
                        , n = this.finalS
                        , o = this.finalE
                        , h = this.data.sh;
                    if (2 == h)
                        a = r(a = o === n ? o <= s ? 1 : 0 : t(0, e(.5 / (o - n) + (s - n) / (o - n), 1)));
                    else if (3 == h)
                        a = r(a = o === n ? o <= s ? 0 : 1 : 1 - t(0, e(.5 / (o - n) + (s - n) / (o - n), 1)));
                    else if (4 == h)
                        o === n ? a = 0 : (a = t(0, e(.5 / (o - n) + (s - n) / (o - n), 1))) < .5 ? a *= 2 : a = 1 - 2 * (a - .5),
                            a = r(a);
                    else if (5 == h) {
                        if (o === n)
                            a = 0;
                        else {
                            var l = o - n
                                , p = -l / 2 + (s = e(t(0, s + .5 - n), o - n))
                                , f = l / 2;
                            a = Math.sqrt(1 - p * p / (f * f))
                        }
                        a = r(a)
                    } else
                        a = 6 == h ? r(a = o === n ? 0 : (s = e(t(0, s + .5 - n), o - n),
                        (1 + Math.cos(Math.PI + 2 * Math.PI * s / (o - n))) / 2)) : (s >= i(n) && (a = s - n < 0 ? 1 - (n - s) : t(0, e(o - s, 1))),
                            r(a));
                    return a * this.a.v
                },
                getValue: function(t) {
                    this.iterateDynamicProperties(),
                        this._mdf = t || this._mdf,
                        this._currentTextLength = this.elem.textProperty.currentData.l.length || 0,
                    t && 2 === this.data.r && (this.e.v = this._currentTextLength);
                    var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars
                        , i = this.o.v / e
                        , s = this.s.v / e + i
                        , r = this.e.v / e + i;
                    if (r < s) {
                        var a = s;
                        s = r,
                            r = a
                    }
                    this.finalS = s,
                        this.finalE = r
                }
            },
                extendPrototype([DynamicPropertyContainer], s),
                {
                    getTextSelectorProp: function(t, e, i) {
                        return new s(t,e,i)
                    }
                }
        }(), pool_factory = function(t, e, i, s) {
            var r = 0
                , a = t
                , n = createSizedArray(a);
            return {
                newElement: function() {
                    return r ? n[r -= 1] : e()
                },
                release: function(t) {
                    r === a && (n = pooling.double(n),
                        a *= 2),
                    i && i(t),
                        n[r] = t,
                        r += 1
                }
            }
        }, pooling = {
            double: function(t) {
                return t.concat(createSizedArray(t.length))
            }
        }, point_pool = pool_factory(8, (function() {
                return createTypedArray("float32", 2)
            }
        )), shape_pool = (yA = pool_factory(4, (function() {
                return new ShapePath
            }
        ), (function(t) {
                var e, i = t._length;
                for (e = 0; e < i; e += 1)
                    point_pool.release(t.v[e]),
                        point_pool.release(t.i[e]),
                        point_pool.release(t.o[e]),
                        t.v[e] = null,
                        t.i[e] = null,
                        t.o[e] = null;
                t._length = 0,
                    t.c = !1
            }
        )),
            yA.clone = function(t) {
                var e, i = yA.newElement(), s = void 0 === t._length ? t.v.length : t._length;
                for (i.setLength(s),
                         i.c = t.c,
                         e = 0; e < s; e += 1)
                    i.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
                return i
            }
            ,
            yA), yA, shapeCollection_pool = (HA = {
            newShapeCollection: function() {
                return IA ? KA[IA -= 1] : new ShapeCollection
            },
            release: function(t) {
                var e, i = t._length;
                for (e = 0; e < i; e += 1)
                    shape_pool.release(t.shapes[e]);
                t._length = 0,
                IA === JA && (KA = pooling.double(KA),
                    JA *= 2),
                    KA[IA] = t,
                    IA += 1
            }
        },
            IA = 0,
            JA = 4,
            KA = createSizedArray(JA),
            HA), HA, IA, JA, KA, segments_length_pool = pool_factory(8, (function() {
                return {
                    lengths: [],
                    totalLength: 0
                }
            }
        ), (function(t) {
                var e, i = t.lengths.length;
                for (e = 0; e < i; e += 1)
                    bezier_length_pool.release(t.lengths[e]);
                t.lengths.length = 0
            }
        )), bezier_length_pool = pool_factory(8, (function() {
                return {
                    addedLength: 0,
                    percents: createTypedArray("float32", defaultCurveSegments),
                    lengths: createTypedArray("float32", defaultCurveSegments)
                }
            }
        ));
        function BaseRenderer() {}
        function SVGRenderer(t, e) {
            this.animationItem = t,
                this.layers = null,
                this.renderedFrame = -1,
                this.svgElement = createNS("svg");
            var i = "";
            if (e && e.title) {
                var s = createNS("title")
                    , r = createElementID();
                s.setAttribute("id", r),
                    s.textContent = e.title,
                    this.svgElement.appendChild(s),
                    i += r
            }
            if (e && e.description) {
                var a = createNS("desc")
                    , n = createElementID();
                a.setAttribute("id", n),
                    a.textContent = e.description,
                    this.svgElement.appendChild(a),
                    i += " " + n
            }
            i && this.svgElement.setAttribute("aria-labelledby", i);
            var o = createNS("defs");
            this.svgElement.appendChild(o);
            var h = createNS("g");
            this.svgElement.appendChild(h),
                this.layerElement = h,
                this.renderConfig = {
                    preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    progressiveLoad: e && e.progressiveLoad || !1,
                    hideOnTransparent: !e || !1 !== e.hideOnTransparent,
                    viewBoxOnly: e && e.viewBoxOnly || !1,
                    viewBoxSize: e && e.viewBoxSize || !1,
                    className: e && e.className || ""
                },
                this.globalData = {
                    _mdf: !1,
                    frameNum: -1,
                    defs: o,
                    renderConfig: this.renderConfig
                },
                this.elements = [],
                this.pendingElements = [],
                this.destroyed = !1,
                this.rendererType = "svg"
        }
        function CanvasRenderer(t, e) {
            this.animationItem = t,
                this.renderConfig = {
                    clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
                    context: e && e.context || null,
                    progressiveLoad: e && e.progressiveLoad || !1,
                    preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    className: e && e.className || ""
                },
                this.renderConfig.dpr = e && e.dpr || 1,
            this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1),
                this.renderedFrame = -1,
                this.globalData = {
                    frameNum: -1,
                    _mdf: !1,
                    renderConfig: this.renderConfig,
                    currentGlobalAlpha: -1
                },
                this.contextData = new CVContextData,
                this.elements = [],
                this.pendingElements = [],
                this.transformMat = new Matrix,
                this.completeLayers = !1,
                this.rendererType = "canvas"
        }
        function HybridRenderer(t, e) {
            this.animationItem = t,
                this.layers = null,
                this.renderedFrame = -1,
                this.renderConfig = {
                    className: e && e.className || "",
                    imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
                    hideOnTransparent: !e || !1 !== e.hideOnTransparent
                },
                this.globalData = {
                    _mdf: !1,
                    frameNum: -1,
                    renderConfig: this.renderConfig
                },
                this.pendingElements = [],
                this.elements = [],
                this.threeDElements = [],
                this.destroyed = !1,
                this.camera = null,
                this.supports3d = !0,
                this.rendererType = "html"
        }
        function MaskElement(t, e, i) {
            this.data = t,
                this.element = e,
                this.globalData = i,
                this.storedData = [],
                this.masksProperties = this.data.masksProperties || [],
                this.maskElement = null;
            var s, r = this.globalData.defs, a = this.masksProperties ? this.masksProperties.length : 0;
            this.viewData = createSizedArray(a),
                this.solidPath = "";
            var n, o, h, l, p, f, d, m = this.masksProperties, c = 0, u = [], y = createElementID(), g = "clipPath", v = "clip-path";
            for (s = 0; s < a; s++)
                if (("a" !== m[s].mode && "n" !== m[s].mode || m[s].inv || 100 !== m[s].o.k || m[s].o.x) && (v = g = "mask"),
                    "s" != m[s].mode && "i" != m[s].mode || 0 !== c ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"),
                        l.setAttribute("width", this.element.comp.data.w || 0),
                        l.setAttribute("height", this.element.comp.data.h || 0),
                        u.push(l)),
                    n = createNS("path"),
                "n" != m[s].mode) {
                    var _;
                    if (c += 1,
                        n.setAttribute("fill", "s" === m[s].mode ? "#000000" : "#ffffff"),
                        n.setAttribute("clip-rule", "nonzero"),
                        0 !== m[s].x.k ? (v = g = "mask",
                            d = PropertyFactory.getProp(this.element, m[s].x, 0, null, this.element),
                            _ = createElementID(),
                            (p = createNS("filter")).setAttribute("id", _),
                            (f = createNS("feMorphology")).setAttribute("operator", "erode"),
                            f.setAttribute("in", "SourceGraphic"),
                            f.setAttribute("radius", "0"),
                            p.appendChild(f),
                            r.appendChild(p),
                            n.setAttribute("stroke", "s" === m[s].mode ? "#000000" : "#ffffff")) : d = f = null,
                        this.storedData[s] = {
                            elem: n,
                            x: d,
                            expan: f,
                            lastPath: "",
                            lastOperator: "",
                            filterId: _,
                            lastRadius: 0
                        },
                    "i" == m[s].mode) {
                        h = u.length;
                        var b = createNS("g");
                        for (o = 0; o < h; o += 1)
                            b.appendChild(u[o]);
                        var x = createNS("mask");
                        x.setAttribute("mask-type", "alpha"),
                            x.setAttribute("id", y + "_" + c),
                            x.appendChild(n),
                            r.appendChild(x),
                            b.setAttribute("mask", "url(" + locationHref + "#" + y + "_" + c + ")"),
                            u.length = 0,
                            u.push(b)
                    } else
                        u.push(n);
                    m[s].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()),
                        this.viewData[s] = {
                            elem: n,
                            lastPath: "",
                            op: PropertyFactory.getProp(this.element, m[s].o, 0, .01, this.element),
                            prop: ShapePropertyFactory.getShapeProp(this.element, m[s], 3),
                            invRect: l
                        },
                    this.viewData[s].prop.k || this.drawPath(m[s], this.viewData[s].prop.v, this.viewData[s])
                } else
                    this.viewData[s] = {
                        op: PropertyFactory.getProp(this.element, m[s].o, 0, .01, this.element),
                        prop: ShapePropertyFactory.getShapeProp(this.element, m[s], 3),
                        elem: n,
                        lastPath: ""
                    },
                        r.appendChild(n);
            for (this.maskElement = createNS(g),
                     a = u.length,
                     s = 0; s < a; s += 1)
                this.maskElement.appendChild(u[s]);
            0 < c && (this.maskElement.setAttribute("id", y),
                this.element.maskedElement.setAttribute(v, "url(" + locationHref + "#" + y + ")"),
                r.appendChild(this.maskElement)),
            this.viewData.length && this.element.addRenderableComponent(this)
        }
        function HierarchyElement() {}
        function FrameElement() {}
        function TransformElement() {}
        function RenderableElement() {}
        function RenderableDOMElement() {}
        function ProcessedElement(t, e) {
            this.elem = t,
                this.pos = e
        }
        function SVGStyleData(t, e) {
            this.data = t,
                this.type = t.ty,
                this.d = "",
                this.lvl = e,
                this._mdf = !1,
                this.closed = !0 === t.hd,
                this.pElem = createNS("path"),
                this.msElem = null
        }
        function SVGShapeData(t, e, i) {
            this.caches = [],
                this.styles = [],
                this.transformers = t,
                this.lStr = "",
                this.sh = i,
                this.lvl = e,
                this._isAnimated = !!i.k;
            for (var s = 0, r = t.length; s < r; ) {
                if (t[s].mProps.dynamicProperties.length) {
                    this._isAnimated = !0;
                    break
                }
                s += 1
            }
        }
        function SVGTransformData(t, e, i) {
            this.transform = {
                mProps: t,
                op: e,
                container: i
            },
                this.elements = [],
                this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length
        }
        function SVGStrokeStyleData(t, e, i) {
            this.initDynamicPropertyContainer(t),
                this.getValue = this.iterateDynamicProperties,
                this.o = PropertyFactory.getProp(t, e.o, 0, .01, this),
                this.w = PropertyFactory.getProp(t, e.w, 0, null, this),
                this.d = new DashProperty(t,e.d || {},"svg",this),
                this.c = PropertyFactory.getProp(t, e.c, 1, 255, this),
                this.style = i,
                this._isAnimated = !!this._isAnimated
        }
        function SVGFillStyleData(t, e, i) {
            this.initDynamicPropertyContainer(t),
                this.getValue = this.iterateDynamicProperties,
                this.o = PropertyFactory.getProp(t, e.o, 0, .01, this),
                this.c = PropertyFactory.getProp(t, e.c, 1, 255, this),
                this.style = i
        }
        function SVGGradientFillStyleData(t, e, i) {
            this.initDynamicPropertyContainer(t),
                this.getValue = this.iterateDynamicProperties,
                this.initGradientData(t, e, i)
        }
        function SVGGradientStrokeStyleData(t, e, i) {
            this.initDynamicPropertyContainer(t),
                this.getValue = this.iterateDynamicProperties,
                this.w = PropertyFactory.getProp(t, e.w, 0, null, this),
                this.d = new DashProperty(t,e.d || {},"svg",this),
                this.initGradientData(t, e, i),
                this._isAnimated = !!this._isAnimated
        }
        function ShapeGroupData() {
            this.it = [],
                this.prevViewData = [],
                this.gr = createNS("g")
        }
        BaseRenderer.prototype.checkLayers = function(t) {
            var e, i, s = this.layers.length;
            for (this.completeLayers = !0,
                     e = s - 1; 0 <= e; e--)
                this.elements[e] || (i = this.layers[e]).ip - i.st <= t - this.layers[e].st && i.op - i.st > t - this.layers[e].st && this.buildItem(e),
                    this.completeLayers = !!this.elements[e] && this.completeLayers;
            this.checkPendingElements()
        }
            ,
            BaseRenderer.prototype.createItem = function(t) {
                switch (t.ty) {
                    case 2:
                        return this.createImage(t);
                    case 0:
                        return this.createComp(t);
                    case 1:
                        return this.createSolid(t);
                    case 3:
                        return this.createNull(t);
                    case 4:
                        return this.createShape(t);
                    case 5:
                        return this.createText(t);
                    case 13:
                        return this.createCamera(t)
                }
                return this.createNull(t)
            }
            ,
            BaseRenderer.prototype.createCamera = function() {
                throw new Error("You're using a 3d camera. Try the html renderer.")
            }
            ,
            BaseRenderer.prototype.buildAllItems = function() {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1)
                    this.buildItem(t);
                this.checkPendingElements()
            }
            ,
            BaseRenderer.prototype.includeLayers = function(t) {
                this.completeLayers = !1;
                var e, i, s = t.length, r = this.layers.length;
                for (e = 0; e < s; e += 1)
                    for (i = 0; i < r; ) {
                        if (this.layers[i].id == t[e].id) {
                            this.layers[i] = t[e];
                            break
                        }
                        i += 1
                    }
            }
            ,
            BaseRenderer.prototype.setProjectInterface = function(t) {
                this.globalData.projectInterface = t
            }
            ,
            BaseRenderer.prototype.initItems = function() {
                this.globalData.progressiveLoad || this.buildAllItems()
            }
            ,
            BaseRenderer.prototype.buildElementParenting = function(t, e, i) {
                for (var s = this.elements, r = this.layers, a = 0, n = r.length; a < n; )
                    r[a].ind == e && (s[a] && !0 !== s[a] ? (i.push(s[a]),
                        s[a].setAsParent(),
                        void 0 !== r[a].parent ? this.buildElementParenting(t, r[a].parent, i) : t.setHierarchy(i)) : (this.buildItem(a),
                        this.addPendingElement(t))),
                        a += 1
            }
            ,
            BaseRenderer.prototype.addPendingElement = function(t) {
                this.pendingElements.push(t)
            }
            ,
            BaseRenderer.prototype.searchExtraCompositions = function(t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1)
                    if (t[e].xt) {
                        var s = this.createComp(t[e]);
                        s.initExpressions(),
                            this.globalData.projectInterface.registerComposition(s)
                    }
            }
            ,
            BaseRenderer.prototype.setupGlobalData = function(t, e) {
                this.globalData.fontManager = new FontManager,
                    this.globalData.fontManager.addChars(t.chars),
                    this.globalData.fontManager.addFonts(t.fonts, e),
                    this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem),
                    this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem),
                    this.globalData.imageLoader = this.animationItem.imagePreloader,
                    this.globalData.frameId = 0,
                    this.globalData.frameRate = t.fr,
                    this.globalData.nm = t.nm,
                    this.globalData.compSize = {
                        w: t.w,
                        h: t.h
                    }
            }
            ,
            extendPrototype([BaseRenderer], SVGRenderer),
            SVGRenderer.prototype.createNull = function(t) {
                return new NullElement(t,this.globalData,this)
            }
            ,
            SVGRenderer.prototype.createShape = function(t) {
                return new SVGShapeElement(t,this.globalData,this)
            }
            ,
            SVGRenderer.prototype.createText = function(t) {
                return new SVGTextElement(t,this.globalData,this)
            }
            ,
            SVGRenderer.prototype.createImage = function(t) {
                return new IImageElement(t,this.globalData,this)
            }
            ,
            SVGRenderer.prototype.createComp = function(t) {
                return new SVGCompElement(t,this.globalData,this)
            }
            ,
            SVGRenderer.prototype.createSolid = function(t) {
                return new ISolidElement(t,this.globalData,this)
            }
            ,
            SVGRenderer.prototype.configAnimation = function(t) {
                this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
                    this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h),
                this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w),
                    this.svgElement.setAttribute("height", t.h),
                    this.svgElement.style.width = "100%",
                    this.svgElement.style.height = "100%",
                    this.svgElement.style.transform = "translate3d(0,0,0)"),
                this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className),
                    this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio),
                    this.animationItem.wrapper.appendChild(this.svgElement);
                var e = this.globalData.defs;
                this.setupGlobalData(t, e),
                    this.globalData.progressiveLoad = this.renderConfig.progressiveLoad,
                    this.data = t;
                var i = createNS("clipPath")
                    , s = createNS("rect");
                s.setAttribute("width", t.w),
                    s.setAttribute("height", t.h),
                    s.setAttribute("x", 0),
                    s.setAttribute("y", 0);
                var r = createElementID();
                i.setAttribute("id", r),
                    i.appendChild(s),
                    this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + r + ")"),
                    e.appendChild(i),
                    this.layers = t.layers,
                    this.elements = createSizedArray(t.layers.length)
            }
            ,
            SVGRenderer.prototype.destroy = function() {
                this.animationItem.wrapper.innerHTML = "",
                    this.layerElement = null,
                    this.globalData.defs = null;
                var t, e = this.layers ? this.layers.length : 0;
                for (t = 0; t < e; t++)
                    this.elements[t] && this.elements[t].destroy();
                this.elements.length = 0,
                    this.destroyed = !0,
                    this.animationItem = null
            }
            ,
            SVGRenderer.prototype.updateContainerSize = function() {}
            ,
            SVGRenderer.prototype.buildItem = function(t) {
                var e = this.elements;
                if (!e[t] && 99 != this.layers[t].ty) {
                    e[t] = !0;
                    var i = this.createItem(this.layers[t]);
                    e[t] = i,
                    expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(i),
                        i.initExpressions()),
                        this.appendElementInPos(i, t),
                    this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? i.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1),
                        this.addPendingElement(i)))
                }
            }
            ,
            SVGRenderer.prototype.checkPendingElements = function() {
                for (; this.pendingElements.length; ) {
                    var t = this.pendingElements.pop();
                    if (t.checkParenting(),
                        t.data.tt)
                        for (var e = 0, i = this.elements.length; e < i; ) {
                            if (this.elements[e] === t) {
                                t.setMatte(this.elements[e - 1].layerId);
                                break
                            }
                            e += 1
                        }
                }
            }
            ,
            SVGRenderer.prototype.renderFrame = function(t) {
                if (this.renderedFrame !== t && !this.destroyed) {
                    null === t ? t = this.renderedFrame : this.renderedFrame = t,
                        this.globalData.frameNum = t,
                        this.globalData.frameId += 1,
                        this.globalData.projectInterface.currentFrame = t,
                        this.globalData._mdf = !1;
                    var e, i = this.layers.length;
                    for (this.completeLayers || this.checkLayers(t),
                             e = i - 1; 0 <= e; e--)
                        (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
                    if (this.globalData._mdf)
                        for (e = 0; e < i; e += 1)
                            (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
                }
            }
            ,
            SVGRenderer.prototype.appendElementInPos = function(t, e) {
                var i = t.getBaseElement();
                if (i) {
                    for (var s, r = 0; r < e; )
                        this.elements[r] && !0 !== this.elements[r] && this.elements[r].getBaseElement() && (s = this.elements[r].getBaseElement()),
                            r += 1;
                    s ? this.layerElement.insertBefore(i, s) : this.layerElement.appendChild(i)
                }
            }
            ,
            SVGRenderer.prototype.hide = function() {
                this.layerElement.style.display = "none"
            }
            ,
            SVGRenderer.prototype.show = function() {
                this.layerElement.style.display = "block"
            }
            ,
            extendPrototype([BaseRenderer], CanvasRenderer),
            CanvasRenderer.prototype.createShape = function(t) {
                return new CVShapeElement(t,this.globalData,this)
            }
            ,
            CanvasRenderer.prototype.createText = function(t) {
                return new CVTextElement(t,this.globalData,this)
            }
            ,
            CanvasRenderer.prototype.createImage = function(t) {
                return new CVImageElement(t,this.globalData,this)
            }
            ,
            CanvasRenderer.prototype.createComp = function(t) {
                return new CVCompElement(t,this.globalData,this)
            }
            ,
            CanvasRenderer.prototype.createSolid = function(t) {
                return new CVSolidElement(t,this.globalData,this)
            }
            ,
            CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull,
            CanvasRenderer.prototype.ctxTransform = function(t) {
                if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13])
                    if (this.renderConfig.clearCanvas) {
                        this.transformMat.cloneFromProps(t);
                        var e = this.contextData.cTr.props;
                        this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]),
                            this.contextData.cTr.cloneFromProps(this.transformMat.props);
                        var i = this.contextData.cTr.props;
                        this.canvasContext.setTransform(i[0], i[1], i[4], i[5], i[12], i[13])
                    } else
                        this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13])
            }
            ,
            CanvasRenderer.prototype.ctxOpacity = function(t) {
                if (!this.renderConfig.clearCanvas)
                    return this.canvasContext.globalAlpha *= t < 0 ? 0 : t,
                        void (this.globalData.currentGlobalAlpha = this.contextData.cO);
                this.contextData.cO *= t < 0 ? 0 : t,
                this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO,
                    this.globalData.currentGlobalAlpha = this.contextData.cO)
            }
            ,
            CanvasRenderer.prototype.reset = function() {
                this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore()
            }
            ,
            CanvasRenderer.prototype.save = function(t) {
                if (this.renderConfig.clearCanvas) {
                    t && this.canvasContext.save();
                    var e = this.contextData.cTr.props;
                    this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
                    var i, s = this.contextData.saved[this.contextData.cArrPos];
                    for (i = 0; i < 16; i += 1)
                        s[i] = e[i];
                    this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO,
                        this.contextData.cArrPos += 1
                } else
                    this.canvasContext.save()
            }
            ,
            CanvasRenderer.prototype.restore = function(t) {
                if (this.renderConfig.clearCanvas) {
                    t && (this.canvasContext.restore(),
                        this.globalData.blendMode = "source-over"),
                        this.contextData.cArrPos -= 1;
                    var e, i = this.contextData.saved[this.contextData.cArrPos], s = this.contextData.cTr.props;
                    for (e = 0; e < 16; e += 1)
                        s[e] = i[e];
                    this.canvasContext.setTransform(i[0], i[1], i[4], i[5], i[12], i[13]),
                        i = this.contextData.savedOp[this.contextData.cArrPos],
                        this.contextData.cO = i,
                    this.globalData.currentGlobalAlpha !== i && (this.canvasContext.globalAlpha = i,
                        this.globalData.currentGlobalAlpha = i)
                } else
                    this.canvasContext.restore()
            }
            ,
            CanvasRenderer.prototype.configAnimation = function(t) {
                this.animationItem.wrapper ? (this.animationItem.container = createTag("canvas"),
                    this.animationItem.container.style.width = "100%",
                    this.animationItem.container.style.height = "100%",
                    this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px",
                    this.animationItem.wrapper.appendChild(this.animationItem.container),
                    this.canvasContext = this.animationItem.container.getContext("2d"),
                this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className)) : this.canvasContext = this.renderConfig.context,
                    this.data = t,
                    this.layers = t.layers,
                    this.transformCanvas = {
                        w: t.w,
                        h: t.h,
                        sx: 0,
                        sy: 0,
                        tx: 0,
                        ty: 0
                    },
                    this.setupGlobalData(t, document.body),
                    this.globalData.canvasContext = this.canvasContext,
                    (this.globalData.renderer = this).globalData.isDashed = !1,
                    this.globalData.progressiveLoad = this.renderConfig.progressiveLoad,
                    this.globalData.transformCanvas = this.transformCanvas,
                    this.elements = createSizedArray(t.layers.length),
                    this.updateContainerSize()
            }
            ,
            CanvasRenderer.prototype.updateContainerSize = function() {
                var t, e, i, s;
                if (this.reset(),
                    this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth,
                        e = this.animationItem.wrapper.offsetHeight,
                        this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr),
                        this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr,
                        e = this.canvasContext.canvas.height * this.renderConfig.dpr),
                -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
                    var r = this.renderConfig.preserveAspectRatio.split(" ")
                        , a = r[1] || "meet"
                        , n = r[0] || "xMidYMid"
                        , o = n.substr(0, 4)
                        , h = n.substr(4);
                    i = t / e,
                        s = this.transformCanvas.w / this.transformCanvas.h,
                        this.transformCanvas.sy = i < s && "meet" === a || s < i && "slice" === a ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr),
                        t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr),
                        e / (this.transformCanvas.h / this.renderConfig.dpr)),
                        this.transformCanvas.tx = "xMid" === o && (s < i && "meet" === a || i < s && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (s < i && "meet" === a || i < s && "slice" === a) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0,
                        this.transformCanvas.ty = "YMid" === h && (i < s && "meet" === a || s < i && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (i < s && "meet" === a || s < i && "slice" === a) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0
                } else
                    "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr),
                        this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)) : (this.transformCanvas.sx = this.renderConfig.dpr,
                        this.transformCanvas.sy = this.renderConfig.dpr),
                        this.transformCanvas.tx = 0,
                        this.transformCanvas.ty = 0;
                this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1],
                    this.ctxTransform(this.transformCanvas.props),
                    this.canvasContext.beginPath(),
                    this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h),
                    this.canvasContext.closePath(),
                    this.canvasContext.clip(),
                    this.renderFrame(this.renderedFrame, !0)
            }
            ,
            CanvasRenderer.prototype.destroy = function() {
                var t;
                for (this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = ""),
                         t = (this.layers ? this.layers.length : 0) - 1; 0 <= t; t -= 1)
                    this.elements[t] && this.elements[t].destroy();
                this.elements.length = 0,
                    this.globalData.canvasContext = null,
                    this.animationItem.container = null,
                    this.destroyed = !0
            }
            ,
            CanvasRenderer.prototype.renderFrame = function(t, e) {
                if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
                    this.renderedFrame = t,
                        this.globalData.frameNum = t - this.animationItem._isFirstFrame,
                        this.globalData.frameId += 1,
                        this.globalData._mdf = !this.renderConfig.clearCanvas || e,
                        this.globalData.projectInterface.currentFrame = t;
                    var i, s = this.layers.length;
                    for (this.completeLayers || this.checkLayers(t),
                             i = 0; i < s; i++)
                        (this.completeLayers || this.elements[i]) && this.elements[i].prepareFrame(t - this.layers[i].st);
                    if (this.globalData._mdf) {
                        for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(),
                                 i = s - 1; 0 <= i; i -= 1)
                            (this.completeLayers || this.elements[i]) && this.elements[i].renderFrame();
                        !0 !== this.renderConfig.clearCanvas && this.restore()
                    }
                }
            }
            ,
            CanvasRenderer.prototype.buildItem = function(t) {
                var e = this.elements;
                if (!e[t] && 99 != this.layers[t].ty) {
                    var i = this.createItem(this.layers[t], this, this.globalData);
                    (e[t] = i).initExpressions()
                }
            }
            ,
            CanvasRenderer.prototype.checkPendingElements = function() {
                for (; this.pendingElements.length; )
                    this.pendingElements.pop().checkParenting()
            }
            ,
            CanvasRenderer.prototype.hide = function() {
                this.animationItem.container.style.display = "none"
            }
            ,
            CanvasRenderer.prototype.show = function() {
                this.animationItem.container.style.display = "block"
            }
            ,
            extendPrototype([BaseRenderer], HybridRenderer),
            HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem,
            HybridRenderer.prototype.checkPendingElements = function() {
                for (; this.pendingElements.length; )
                    this.pendingElements.pop().checkParenting()
            }
            ,
            HybridRenderer.prototype.appendElementInPos = function(t, e) {
                var i = t.getBaseElement();
                if (i) {
                    var s = this.layers[e];
                    if (s.ddd && this.supports3d)
                        this.addTo3dContainer(i, e);
                    else if (this.threeDElements)
                        this.addTo3dContainer(i, e);
                    else {
                        for (var r, a, n = 0; n < e; )
                            this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement && (a = this.elements[n],
                                r = (this.layers[n].ddd ? this.getThreeDContainerByPos(n) : a.getBaseElement()) || r),
                                n += 1;
                        r ? s.ddd && this.supports3d || this.layerElement.insertBefore(i, r) : s.ddd && this.supports3d || this.layerElement.appendChild(i)
                    }
                }
            }
            ,
            HybridRenderer.prototype.createShape = function(t) {
                return this.supports3d ? new HShapeElement(t,this.globalData,this) : new SVGShapeElement(t,this.globalData,this)
            }
            ,
            HybridRenderer.prototype.createText = function(t) {
                return this.supports3d ? new HTextElement(t,this.globalData,this) : new SVGTextElement(t,this.globalData,this)
            }
            ,
            HybridRenderer.prototype.createCamera = function(t) {
                return this.camera = new HCameraElement(t,this.globalData,this),
                    this.camera
            }
            ,
            HybridRenderer.prototype.createImage = function(t) {
                return this.supports3d ? new HImageElement(t,this.globalData,this) : new IImageElement(t,this.globalData,this)
            }
            ,
            HybridRenderer.prototype.createComp = function(t) {
                return this.supports3d ? new HCompElement(t,this.globalData,this) : new SVGCompElement(t,this.globalData,this)
            }
            ,
            HybridRenderer.prototype.createSolid = function(t) {
                return this.supports3d ? new HSolidElement(t,this.globalData,this) : new ISolidElement(t,this.globalData,this)
            }
            ,
            HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull,
            HybridRenderer.prototype.getThreeDContainerByPos = function(t) {
                for (var e = 0, i = this.threeDElements.length; e < i; ) {
                    if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t)
                        return this.threeDElements[e].perspectiveElem;
                    e += 1
                }
            }
            ,
            HybridRenderer.prototype.createThreeDContainer = function(t, e) {
                var i = createTag("div");
                styleDiv(i);
                var s = createTag("div");
                styleDiv(s),
                "3d" === e && (i.style.width = this.globalData.compSize.w + "px",
                    i.style.height = this.globalData.compSize.h + "px",
                    i.style.transformOrigin = i.style.mozTransformOrigin = i.style.webkitTransformOrigin = "50% 50%",
                    s.style.transform = s.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"),
                    i.appendChild(s);
                var r = {
                    container: s,
                    perspectiveElem: i,
                    startPos: t,
                    endPos: t,
                    type: e
                };
                return this.threeDElements.push(r),
                    r
            }
            ,
            HybridRenderer.prototype.build3dContainers = function() {
                var t, e, i = this.layers.length, s = "";
                for (t = 0; t < i; t += 1)
                    this.layers[t].ddd && 3 !== this.layers[t].ty ? "3d" !== s && (s = "3d",
                        e = this.createThreeDContainer(t, "3d")) : "2d" !== s && (s = "2d",
                        e = this.createThreeDContainer(t, "2d")),
                        e.endPos = Math.max(e.endPos, t);
                for (t = (i = this.threeDElements.length) - 1; 0 <= t; t--)
                    this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem)
            }
            ,
            HybridRenderer.prototype.addTo3dContainer = function(t, e) {
                for (var i = 0, s = this.threeDElements.length; i < s; ) {
                    if (e <= this.threeDElements[i].endPos) {
                        for (var r, a = this.threeDElements[i].startPos; a < e; )
                            this.elements[a] && this.elements[a].getBaseElement && (r = this.elements[a].getBaseElement()),
                                a += 1;
                        r ? this.threeDElements[i].container.insertBefore(t, r) : this.threeDElements[i].container.appendChild(t);
                        break
                    }
                    i += 1
                }
            }
            ,
            HybridRenderer.prototype.configAnimation = function(t) {
                var e = createTag("div")
                    , i = this.animationItem.wrapper;
                e.style.width = t.w + "px",
                    e.style.height = t.h + "px",
                    styleDiv(this.resizerElem = e),
                    e.style.transformStyle = e.style.webkitTransformStyle = e.style.mozTransformStyle = "flat",
                this.renderConfig.className && e.setAttribute("class", this.renderConfig.className),
                    i.appendChild(e),
                    e.style.overflow = "hidden";
                var s = createNS("svg");
                s.setAttribute("width", "1"),
                    s.setAttribute("height", "1"),
                    styleDiv(s),
                    this.resizerElem.appendChild(s);
                var r = createNS("defs");
                s.appendChild(r),
                    this.data = t,
                    this.setupGlobalData(t, s),
                    this.globalData.defs = r,
                    this.layers = t.layers,
                    this.layerElement = this.resizerElem,
                    this.build3dContainers(),
                    this.updateContainerSize()
            }
            ,
            HybridRenderer.prototype.destroy = function() {
                this.animationItem.wrapper.innerHTML = "",
                    this.animationItem.container = null,
                    this.globalData.defs = null;
                var t, e = this.layers ? this.layers.length : 0;
                for (t = 0; t < e; t++)
                    this.elements[t].destroy();
                this.elements.length = 0,
                    this.destroyed = !0,
                    this.animationItem = null
            }
            ,
            HybridRenderer.prototype.updateContainerSize = function() {
                var t, e, i, s, r = this.animationItem.wrapper.offsetWidth, a = this.animationItem.wrapper.offsetHeight;
                s = r / a < this.globalData.compSize.w / this.globalData.compSize.h ? (t = r / this.globalData.compSize.w,
                    e = r / this.globalData.compSize.w,
                    i = 0,
                (a - this.globalData.compSize.h * (r / this.globalData.compSize.w)) / 2) : (t = a / this.globalData.compSize.h,
                    e = a / this.globalData.compSize.h,
                    i = (r - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2,
                    0),
                    this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + i + "," + s + ",0,1)"
            }
            ,
            HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame,
            HybridRenderer.prototype.hide = function() {
                this.resizerElem.style.display = "none"
            }
            ,
            HybridRenderer.prototype.show = function() {
                this.resizerElem.style.display = "block"
            }
            ,
            HybridRenderer.prototype.initItems = function() {
                if (this.buildAllItems(),
                    this.camera)
                    this.camera.setup();
                else {
                    var t, e = this.globalData.compSize.w, i = this.globalData.compSize.h, s = this.threeDElements.length;
                    for (t = 0; t < s; t += 1)
                        this.threeDElements[t].perspectiveElem.style.perspective = this.threeDElements[t].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(i, 2)) + "px"
                }
            }
            ,
            HybridRenderer.prototype.searchExtraCompositions = function(t) {
                var e, i = t.length, s = createTag("div");
                for (e = 0; e < i; e += 1)
                    if (t[e].xt) {
                        var r = this.createComp(t[e], s, this.globalData.comp, null);
                        r.initExpressions(),
                            this.globalData.projectInterface.registerComposition(r)
                    }
            }
            ,
            MaskElement.prototype.getMaskProperty = function(t) {
                return this.viewData[t].prop
            }
            ,
            MaskElement.prototype.renderFrame = function(t) {
                var e, i = this.element.finalTransform.mat, s = this.masksProperties.length;
                for (e = 0; e < s; e++)
                    if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]),
                    (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v),
                    "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && (this.viewData[e].invRect.setAttribute("x", -i.props[12]),
                        this.viewData[e].invRect.setAttribute("y", -i.props[13])),
                    this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
                        var r = this.storedData[e].expan;
                        this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode",
                            this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")),
                            r.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate",
                            this.storedData[e].elem.setAttribute("filter", null)),
                            this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
                    }
            }
            ,
            MaskElement.prototype.getMaskelement = function() {
                return this.maskElement
            }
            ,
            MaskElement.prototype.createLayerSolidPath = function() {
                var t = "M0,0 ";
                return t += " h" + this.globalData.compSize.w,
                    t += " v" + this.globalData.compSize.h,
                (t += " h-" + this.globalData.compSize.w) + " v-" + this.globalData.compSize.h + " "
            }
            ,
            MaskElement.prototype.drawPath = function(t, e, i) {
                var s, r, a = " M" + e.v[0][0] + "," + e.v[0][1];
                for (r = e._length,
                         s = 1; s < r; s += 1)
                    a += " C" + e.o[s - 1][0] + "," + e.o[s - 1][1] + " " + e.i[s][0] + "," + e.i[s][1] + " " + e.v[s][0] + "," + e.v[s][1];
                if (e.c && 1 < r && (a += " C" + e.o[s - 1][0] + "," + e.o[s - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]),
                i.lastPath !== a) {
                    var n = "";
                    i.elem && (e.c && (n = t.inv ? this.solidPath + a : a),
                        i.elem.setAttribute("d", n)),
                        i.lastPath = a
                }
            }
            ,
            MaskElement.prototype.destroy = function() {
                this.element = null,
                    this.globalData = null,
                    this.maskElement = null,
                    this.data = null,
                    this.masksProperties = null
            }
            ,
            HierarchyElement.prototype = {
                initHierarchy: function() {
                    this.hierarchy = [],
                        this._isParent = !1,
                        this.checkParenting()
                },
                setHierarchy: function(t) {
                    this.hierarchy = t
                },
                setAsParent: function() {
                    this._isParent = !0
                },
                checkParenting: function() {
                    void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
                }
            },
            FrameElement.prototype = {
                initFrame: function() {
                    this._isFirstFrame = !1,
                        this.dynamicProperties = [],
                        this._mdf = !1
                },
                prepareProperties: function(t, e) {
                    var i, s = this.dynamicProperties.length;
                    for (i = 0; i < s; i += 1)
                        (e || this._isParent && "transform" === this.dynamicProperties[i].propType) && (this.dynamicProperties[i].getValue(),
                        this.dynamicProperties[i]._mdf && (this.globalData._mdf = !0,
                            this._mdf = !0))
                },
                addDynamicProperty: function(t) {
                    -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t)
                }
            },
            TransformElement.prototype = {
                initTransform: function() {
                    this.finalTransform = {
                        mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
                            o: 0
                        },
                        _matMdf: !1,
                        _opMdf: !1,
                        mat: new Matrix
                    },
                    this.data.ao && (this.finalTransform.mProp.autoOriented = !0),
                        this.data.ty
                },
                renderTransform: function() {
                    if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame,
                        this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame,
                        this.hierarchy) {
                        var t, e = this.finalTransform.mat, i = 0, s = this.hierarchy.length;
                        if (!this.finalTransform._matMdf)
                            for (; i < s; ) {
                                if (this.hierarchy[i].finalTransform.mProp._mdf) {
                                    this.finalTransform._matMdf = !0;
                                    break
                                }
                                i += 1
                            }
                        if (this.finalTransform._matMdf)
                            for (t = this.finalTransform.mProp.v.props,
                                     e.cloneFromProps(t),
                                     i = 0; i < s; i += 1)
                                t = this.hierarchy[i].finalTransform.mProp.v.props,
                                    e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15])
                    }
                },
                globalToLocal: function(t) {
                    var e = [];
                    e.push(this.finalTransform);
                    for (var i = !0, s = this.comp; i; )
                        s.finalTransform ? (s.data.hasMask && e.splice(0, 0, s.finalTransform),
                            s = s.comp) : i = !1;
                    var r, a, n = e.length;
                    for (r = 0; r < n; r += 1)
                        a = e[r].mat.applyToPointArray(0, 0, 0),
                            t = [t[0] - a[0], t[1] - a[1], 0];
                    return t
                },
                mHelper: new Matrix
            },
            RenderableElement.prototype = {
                initRenderable: function() {
                    this.isInRange = !1,
                        this.hidden = !1,
                        this.isTransparent = !1,
                        this.renderableComponents = []
                },
                addRenderableComponent: function(t) {
                    -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t)
                },
                removeRenderableComponent: function(t) {
                    -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1)
                },
                prepareRenderableFrame: function(t) {
                    this.checkLayerLimits(t)
                },
                checkTransparency: function() {
                    this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0,
                        this.hide()) : this.isTransparent && (this.isTransparent = !1,
                        this.show())
                },
                checkLayerLimits: function(t) {
                    this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0,
                        this._mdf = !0,
                        this.isInRange = !0,
                        this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0,
                        this.isInRange = !1,
                        this.hide())
                },
                renderRenderable: function() {
                    var t, e = this.renderableComponents.length;
                    for (t = 0; t < e; t += 1)
                        this.renderableComponents[t].renderFrame(this._isFirstFrame)
                },
                sourceRectAtTime: function() {
                    return {
                        top: 0,
                        left: 0,
                        width: 100,
                        height: 100
                    }
                },
                getLayerSize: function() {
                    return 5 === this.data.ty ? {
                        w: this.data.textData.width,
                        h: this.data.textData.height
                    } : {
                        w: this.data.width,
                        h: this.data.height
                    }
                }
            },
            extendPrototype([RenderableElement, createProxyFunction({
                initElement: function(t, e, i) {
                    this.initFrame(),
                        this.initBaseData(t, e, i),
                        this.initTransform(t, e, i),
                        this.initHierarchy(),
                        this.initRenderable(),
                        this.initRendererElement(),
                        this.createContainerElements(),
                        this.createRenderableComponents(),
                        this.createContent(),
                        this.hide()
                },
                hide: function() {
                    this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none",
                        this.hidden = !0)
                },
                show: function() {
                    this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"),
                        this.hidden = !1,
                        this._isFirstFrame = !0)
                },
                renderFrame: function() {
                    this.data.hd || this.hidden || (this.renderTransform(),
                        this.renderRenderable(),
                        this.renderElement(),
                        this.renderInnerContent(),
                    this._isFirstFrame && (this._isFirstFrame = !1))
                },
                renderInnerContent: function() {},
                prepareFrame: function(t) {
                    this._mdf = !1,
                        this.prepareRenderableFrame(t),
                        this.prepareProperties(t, this.isInRange),
                        this.checkTransparency()
                },
                destroy: function() {
                    this.innerElem = null,
                        this.destroyBaseElement()
                }
            })], RenderableDOMElement),
            SVGStyleData.prototype.reset = function() {
                this.d = "",
                    this._mdf = !1
            }
            ,
            SVGShapeData.prototype.setAsAnimated = function() {
                this._isAnimated = !0
            }
            ,
            extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData),
            extendPrototype([DynamicPropertyContainer], SVGFillStyleData),
            SVGGradientFillStyleData.prototype.initGradientData = function(t, e, i) {
                this.o = PropertyFactory.getProp(t, e.o, 0, .01, this),
                    this.s = PropertyFactory.getProp(t, e.s, 1, null, this),
                    this.e = PropertyFactory.getProp(t, e.e, 1, null, this),
                    this.h = PropertyFactory.getProp(t, e.h || {
                        k: 0
                    }, 0, .01, this),
                    this.a = PropertyFactory.getProp(t, e.a || {
                        k: 0
                    }, 0, degToRads, this),
                    this.g = new GradientProperty(t,e.g,this),
                    this.style = i,
                    this.stops = [],
                    this.setGradientData(i.pElem, e),
                    this.setGradientOpacity(e, i),
                    this._isAnimated = !!this._isAnimated
            }
            ,
            SVGGradientFillStyleData.prototype.setGradientData = function(t, e) {
                var i = createElementID()
                    , s = createNS(1 === e.t ? "linearGradient" : "radialGradient");
                s.setAttribute("id", i),
                    s.setAttribute("spreadMethod", "pad"),
                    s.setAttribute("gradientUnits", "userSpaceOnUse");
                var r, a, n, o = [];
                for (n = 4 * e.g.p,
                         a = 0; a < n; a += 4)
                    r = createNS("stop"),
                        s.appendChild(r),
                        o.push(r);
                t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + locationHref + "#" + i + ")"),
                    this.gf = s,
                    this.cst = o
            }
            ,
            SVGGradientFillStyleData.prototype.setGradientOpacity = function(t, e) {
                if (this.g._hasOpacity && !this.g._collapsable) {
                    var i, s, r, a = createNS("mask"), n = createNS("path");
                    a.appendChild(n);
                    var o = createElementID()
                        , h = createElementID();
                    a.setAttribute("id", h);
                    var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
                    l.setAttribute("id", o),
                        l.setAttribute("spreadMethod", "pad"),
                        l.setAttribute("gradientUnits", "userSpaceOnUse"),
                        r = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
                    var p = this.stops;
                    for (s = 4 * t.g.p; s < r; s += 2)
                        (i = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"),
                            l.appendChild(i),
                            p.push(i);
                    n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + locationHref + "#" + o + ")"),
                        this.of = l,
                        this.ms = a,
                        this.ost = p,
                        this.maskId = h,
                        e.msElem = n
                }
            }
            ,
            extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData),
            extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
        var SVGElementsRenderer = function() {
            var t = new Matrix
                , e = new Matrix;
            function i(t, e, i) {
                (i || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v),
                (i || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS())
            }
            function s(i, s, r) {
                var a, n, o, h, l, p, f, d, m, c, u, y = s.styles.length, g = s.lvl;
                for (p = 0; p < y; p += 1) {
                    if (h = s.sh._mdf || r,
                    s.styles[p].lvl < g) {
                        for (d = e.reset(),
                                 c = g - s.styles[p].lvl,
                                 u = s.transformers.length - 1; !h && 0 < c; )
                            h = s.transformers[u].mProps._mdf || h,
                                c--,
                                u--;
                        if (h)
                            for (c = g - s.styles[p].lvl,
                                     u = s.transformers.length - 1; 0 < c; )
                                m = s.transformers[u].mProps.v.props,
                                    d.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
                                    c--,
                                    u--
                    } else
                        d = t;
                    if (n = (f = s.sh.paths)._length,
                        h) {
                        for (o = "",
                                 a = 0; a < n; a += 1)
                            (l = f.shapes[a]) && l._length && (o += buildShapeString(l, l._length, l.c, d));
                        s.caches[p] = o
                    } else
                        o = s.caches[p];
                    s.styles[p].d += !0 === i.hd ? "" : o,
                        s.styles[p]._mdf = h || s.styles[p]._mdf
                }
            }
            function r(t, e, i) {
                var s = e.style;
                (e.c._mdf || i) && s.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"),
                (e.o._mdf || i) && s.pElem.setAttribute("fill-opacity", e.o.v)
            }
            function a(t, e, i) {
                n(t, e, i),
                    o(t, e, i)
            }
            function n(t, e, i) {
                var s, r, a, n, o, h = e.gf, l = e.g._hasOpacity, p = e.s.v, f = e.e.v;
                if (e.o._mdf || i) {
                    var d = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
                    e.style.pElem.setAttribute(d, e.o.v)
                }
                if (e.s._mdf || i) {
                    var m = 1 === t.t ? "x1" : "cx"
                        , c = "x1" === m ? "y1" : "cy";
                    h.setAttribute(m, p[0]),
                        h.setAttribute(c, p[1]),
                    l && !e.g._collapsable && (e.of.setAttribute(m, p[0]),
                        e.of.setAttribute(c, p[1]))
                }
                if (e.g._cmdf || i) {
                    s = e.cst;
                    var u = e.g.c;
                    for (a = s.length,
                             r = 0; r < a; r += 1)
                        (n = s[r]).setAttribute("offset", u[4 * r] + "%"),
                            n.setAttribute("stop-color", "rgb(" + u[4 * r + 1] + "," + u[4 * r + 2] + "," + u[4 * r + 3] + ")")
                }
                if (l && (e.g._omdf || i)) {
                    var y = e.g.o;
                    for (a = (s = e.g._collapsable ? e.cst : e.ost).length,
                             r = 0; r < a; r += 1)
                        n = s[r],
                        e.g._collapsable || n.setAttribute("offset", y[2 * r] + "%"),
                            n.setAttribute("stop-opacity", y[2 * r + 1])
                }
                if (1 === t.t)
                    (e.e._mdf || i) && (h.setAttribute("x2", f[0]),
                        h.setAttribute("y2", f[1]),
                    l && !e.g._collapsable && (e.of.setAttribute("x2", f[0]),
                        e.of.setAttribute("y2", f[1])));
                else if ((e.s._mdf || e.e._mdf || i) && (o = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)),
                    h.setAttribute("r", o),
                l && !e.g._collapsable && e.of.setAttribute("r", o)),
                e.e._mdf || e.h._mdf || e.a._mdf || i) {
                    o || (o = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)));
                    var g = Math.atan2(f[1] - p[1], f[0] - p[0])
                        , v = o * (1 <= e.h.v ? .99 : e.h.v <= -1 ? -.99 : e.h.v)
                        , _ = Math.cos(g + e.a.v) * v + p[0]
                        , b = Math.sin(g + e.a.v) * v + p[1];
                    h.setAttribute("fx", _),
                        h.setAttribute("fy", b),
                    l && !e.g._collapsable && (e.of.setAttribute("fx", _),
                        e.of.setAttribute("fy", b))
                }
            }
            function o(t, e, i) {
                var s = e.style
                    , r = e.d;
                r && (r._mdf || i) && r.dashStr && (s.pElem.setAttribute("stroke-dasharray", r.dashStr),
                    s.pElem.setAttribute("stroke-dashoffset", r.dashoffset[0])),
                e.c && (e.c._mdf || i) && s.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"),
                (e.o._mdf || i) && s.pElem.setAttribute("stroke-opacity", e.o.v),
                (e.w._mdf || i) && (s.pElem.setAttribute("stroke-width", e.w.v),
                s.msElem && s.msElem.setAttribute("stroke-width", e.w.v))
            }
            return {
                createRenderFunction: function(t) {
                    switch (t.ty,
                        t.ty) {
                        case "fl":
                            return r;
                        case "gf":
                            return n;
                        case "gs":
                            return a;
                        case "st":
                            return o;
                        case "sh":
                        case "el":
                        case "rc":
                        case "sr":
                            return s;
                        case "tr":
                            return i
                    }
                }
            }
        }();
        function ShapeTransformManager() {
            this.sequences = {},
                this.sequenceList = [],
                this.transform_key_count = 0
        }
        function CVShapeData(t, e, i, s) {
            this.styledShapes = [],
                this.tr = [0, 0, 0, 0, 0, 0];
            var r = 4;
            "rc" == e.ty ? r = 5 : "el" == e.ty ? r = 6 : "sr" == e.ty && (r = 7),
                this.sh = ShapePropertyFactory.getShapeProp(t, e, r, t);
            var a, n, o = i.length;
            for (a = 0; a < o; a += 1)
                i[a].closed || (n = {
                    transforms: s.addTransformSequence(i[a].transforms),
                    trNodes: []
                },
                    this.styledShapes.push(n),
                    i[a].elements.push(n))
        }
        function BaseElement() {}
        function NullElement(t, e, i) {
            this.initFrame(),
                this.initBaseData(t, e, i),
                this.initFrame(),
                this.initTransform(t, e, i),
                this.initHierarchy()
        }
        function SVGBaseElement() {}
        function IShapeElement() {}
        function ITextElement() {}
        function ICompElement() {}
        function IImageElement(t, e, i) {
            this.assetData = e.getAssetData(t.refId),
                this.initElement(t, e, i),
                this.sourceRect = {
                    top: 0,
                    left: 0,
                    width: this.assetData.w,
                    height: this.assetData.h
                }
        }
        function ISolidElement(t, e, i) {
            this.initElement(t, e, i)
        }
        function SVGCompElement(t, e, i) {
            this.layers = t.layers,
                this.supports3d = !0,
                this.completeLayers = !1,
                this.pendingElements = [],
                this.elements = this.layers ? createSizedArray(this.layers.length) : [],
                this.initElement(t, e, i),
                this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
                    _placeholder: !0
                }
        }
        function SVGTextElement(t, e, i) {
            this.textSpans = [],
                this.renderType = "svg",
                this.initElement(t, e, i)
        }
        function SVGShapeElement(t, e, i) {
            this.shapes = [],
                this.shapesData = t.shapes,
                this.stylesList = [],
                this.shapeModifiers = [],
                this.itemsData = [],
                this.processedElements = [],
                this.animatedContents = [],
                this.initElement(t, e, i),
                this.prevViewData = []
        }
        function SVGTintFilter(t, e) {
            this.filterManager = e;
            var i = createNS("feColorMatrix");
            if (i.setAttribute("type", "matrix"),
                i.setAttribute("color-interpolation-filters", "linearRGB"),
                i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"),
                i.setAttribute("result", "f1"),
                t.appendChild(i),
                (i = createNS("feColorMatrix")).setAttribute("type", "matrix"),
                i.setAttribute("color-interpolation-filters", "sRGB"),
                i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),
                i.setAttribute("result", "f2"),
                t.appendChild(i),
                this.matrixFilter = i,
            100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
                var s, r = createNS("feMerge");
                t.appendChild(r),
                    (s = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"),
                    r.appendChild(s),
                    (s = createNS("feMergeNode")).setAttribute("in", "f2"),
                    r.appendChild(s)
            }
        }
        function SVGFillFilter(t, e) {
            this.filterManager = e;
            var i = createNS("feColorMatrix");
            i.setAttribute("type", "matrix"),
                i.setAttribute("color-interpolation-filters", "sRGB"),
                i.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),
                t.appendChild(i),
                this.matrixFilter = i
        }
        function SVGGaussianBlurEffect(t, e) {
            t.setAttribute("x", "-100%"),
                t.setAttribute("y", "-100%"),
                t.setAttribute("width", "300%"),
                t.setAttribute("height", "300%"),
                this.filterManager = e;
            var i = createNS("feGaussianBlur");
            t.appendChild(i),
                this.feGaussianBlur = i
        }
        function SVGStrokeEffect(t, e) {
            this.initialized = !1,
                this.filterManager = e,
                this.elem = t,
                this.paths = []
        }
        function SVGTritoneFilter(t, e) {
            this.filterManager = e;
            var i = createNS("feColorMatrix");
            i.setAttribute("type", "matrix"),
                i.setAttribute("color-interpolation-filters", "linearRGB"),
                i.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"),
                i.setAttribute("result", "f1"),
                t.appendChild(i);
            var s = createNS("feComponentTransfer");
            s.setAttribute("color-interpolation-filters", "sRGB"),
                t.appendChild(s),
                this.matrixFilter = s;
            var r = createNS("feFuncR");
            r.setAttribute("type", "table"),
                s.appendChild(r),
                this.feFuncR = r;
            var a = createNS("feFuncG");
            a.setAttribute("type", "table"),
                s.appendChild(a),
                this.feFuncG = a;
            var n = createNS("feFuncB");
            n.setAttribute("type", "table"),
                s.appendChild(n),
                this.feFuncB = n
        }
        function SVGProLevelsFilter(t, e) {
            this.filterManager = e;
            var i = this.filterManager.effectElements
                , s = createNS("feComponentTransfer");
            (i[10].p.k || 0 !== i[10].p.v || i[11].p.k || 1 !== i[11].p.v || i[12].p.k || 1 !== i[12].p.v || i[13].p.k || 0 !== i[13].p.v || i[14].p.k || 1 !== i[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", s)),
            (i[17].p.k || 0 !== i[17].p.v || i[18].p.k || 1 !== i[18].p.v || i[19].p.k || 1 !== i[19].p.v || i[20].p.k || 0 !== i[20].p.v || i[21].p.k || 1 !== i[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", s)),
            (i[24].p.k || 0 !== i[24].p.v || i[25].p.k || 1 !== i[25].p.v || i[26].p.k || 1 !== i[26].p.v || i[27].p.k || 0 !== i[27].p.v || i[28].p.k || 1 !== i[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", s)),
            (i[31].p.k || 0 !== i[31].p.v || i[32].p.k || 1 !== i[32].p.v || i[33].p.k || 1 !== i[33].p.v || i[34].p.k || 0 !== i[34].p.v || i[35].p.k || 1 !== i[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", s)),
            (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (s.setAttribute("color-interpolation-filters", "sRGB"),
                t.appendChild(s),
                s = createNS("feComponentTransfer")),
            (i[3].p.k || 0 !== i[3].p.v || i[4].p.k || 1 !== i[4].p.v || i[5].p.k || 1 !== i[5].p.v || i[6].p.k || 0 !== i[6].p.v || i[7].p.k || 1 !== i[7].p.v) && (s.setAttribute("color-interpolation-filters", "sRGB"),
                t.appendChild(s),
                this.feFuncRComposed = this.createFeFunc("feFuncR", s),
                this.feFuncGComposed = this.createFeFunc("feFuncG", s),
                this.feFuncBComposed = this.createFeFunc("feFuncB", s))
        }
        function SVGDropShadowEffect(t, e) {
            t.setAttribute("x", "-100%"),
                t.setAttribute("y", "-100%"),
                t.setAttribute("width", "400%"),
                t.setAttribute("height", "400%"),
                this.filterManager = e;
            var i = createNS("feGaussianBlur");
            i.setAttribute("in", "SourceAlpha"),
                i.setAttribute("result", "drop_shadow_1"),
                i.setAttribute("stdDeviation", "0"),
                this.feGaussianBlur = i,
                t.appendChild(i);
            var s = createNS("feOffset");
            s.setAttribute("dx", "25"),
                s.setAttribute("dy", "0"),
                s.setAttribute("in", "drop_shadow_1"),
                s.setAttribute("result", "drop_shadow_2"),
                this.feOffset = s,
                t.appendChild(s);
            var r = createNS("feFlood");
            r.setAttribute("flood-color", "#00ff00"),
                r.setAttribute("flood-opacity", "1"),
                r.setAttribute("result", "drop_shadow_3"),
                this.feFlood = r,
                t.appendChild(r);
            var a = createNS("feComposite");
            a.setAttribute("in", "drop_shadow_3"),
                a.setAttribute("in2", "drop_shadow_2"),
                a.setAttribute("operator", "in"),
                a.setAttribute("result", "drop_shadow_4"),
                t.appendChild(a);
            var n, o = createNS("feMerge");
            t.appendChild(o),
                n = createNS("feMergeNode"),
                o.appendChild(n),
                (n = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"),
                this.feMergeNode = n,
                this.feMerge = o,
                this.originalNodeAdded = !1,
                o.appendChild(n)
        }
        ShapeTransformManager.prototype = {
            addTransformSequence: function(t) {
                var e, i = t.length, s = "_";
                for (e = 0; e < i; e += 1)
                    s += t[e].transform.key + "_";
                var r = this.sequences[s];
                return r || (r = {
                    transforms: [].concat(t),
                    finalTransform: new Matrix,
                    _mdf: !1
                },
                    this.sequences[s] = r,
                    this.sequenceList.push(r)),
                    r
            },
            processSequence: function(t, e) {
                for (var i, s = 0, r = t.transforms.length, a = e; s < r && !e; ) {
                    if (t.transforms[s].transform.mProps._mdf) {
                        a = !0;
                        break
                    }
                    s += 1
                }
                if (a)
                    for (t.finalTransform.reset(),
                             s = r - 1; 0 <= s; s -= 1)
                        i = t.transforms[s].transform.mProps.v.props,
                            t.finalTransform.transform(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14], i[15]);
                t._mdf = a
            },
            processSequences: function(t) {
                var e, i = this.sequenceList.length;
                for (e = 0; e < i; e += 1)
                    this.processSequence(this.sequenceList[e], t)
            },
            getNewKey: function() {
                return "_" + this.transform_key_count++
            }
        },
            CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated,
            BaseElement.prototype = {
                checkMasks: function() {
                    if (!this.data.hasMask)
                        return !1;
                    for (var t = 0, e = this.data.masksProperties.length; t < e; ) {
                        if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl)
                            return !0;
                        t += 1
                    }
                    return !1
                },
                initExpressions: function() {
                    this.layerInterface = LayerExpressionInterface(this),
                    this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
                    var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
                    this.layerInterface.registerEffectsInterface(t),
                        0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface),
                            this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this),
                            this.layerInterface.text = this.layerInterface.textInterface)
                },
                setBlendMode: function() {
                    var t = getBlendMode(this.data.bm);
                    (this.baseElement || this.layerElement).style["mix-blend-mode"] = t
                },
                initBaseData: function(t, e, i) {
                    this.globalData = e,
                        this.comp = i,
                        this.data = t,
                        this.layerId = createElementID(),
                    this.data.sr || (this.data.sr = 1),
                        this.effectsManager = new EffectsManager(this.data,this,this.dynamicProperties)
                },
                getType: function() {
                    return this.type
                },
                sourceRectAtTime: function() {}
            },
            NullElement.prototype.prepareFrame = function(t) {
                this.prepareProperties(t, !0)
            }
            ,
            NullElement.prototype.renderFrame = function() {}
            ,
            NullElement.prototype.getBaseElement = function() {
                return null
            }
            ,
            NullElement.prototype.destroy = function() {}
            ,
            NullElement.prototype.sourceRectAtTime = function() {}
            ,
            NullElement.prototype.hide = function() {}
            ,
            extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement),
            SVGBaseElement.prototype = {
                initRendererElement: function() {
                    this.layerElement = createNS("g")
                },
                createContainerElements: function() {
                    this.matteElement = createNS("g"),
                        this.transformedElement = this.layerElement,
                        this.maskedElement = this.layerElement,
                        this._sizeChanged = !1;
                    var t, e, i, s = null;
                    if (this.data.td) {
                        if (3 == this.data.td || 1 == this.data.td) {
                            var r = createNS("mask");
                            r.setAttribute("id", this.layerId),
                                r.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"),
                                r.appendChild(this.layerElement),
                                s = r,
                                this.globalData.defs.appendChild(r),
                            featureSupport.maskType || 1 != this.data.td || (r.setAttribute("mask-type", "luminance"),
                                t = createElementID(),
                                e = filtersFactory.createFilter(t),
                                this.globalData.defs.appendChild(e),
                                e.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                                (i = createNS("g")).appendChild(this.layerElement),
                                s = i,
                                r.appendChild(i),
                                i.setAttribute("filter", "url(" + locationHref + "#" + t + ")"))
                        } else if (2 == this.data.td) {
                            var a = createNS("mask");
                            a.setAttribute("id", this.layerId),
                                a.setAttribute("mask-type", "alpha");
                            var n = createNS("g");
                            a.appendChild(n),
                                t = createElementID(),
                                e = filtersFactory.createFilter(t);
                            var o = createNS("feComponentTransfer");
                            o.setAttribute("in", "SourceGraphic"),
                                e.appendChild(o);
                            var h = createNS("feFuncA");
                            h.setAttribute("type", "table"),
                                h.setAttribute("tableValues", "1.0 0.0"),
                                o.appendChild(h),
                                this.globalData.defs.appendChild(e);
                            var l = createNS("rect");
                            l.setAttribute("width", this.comp.data.w),
                                l.setAttribute("height", this.comp.data.h),
                                l.setAttribute("x", "0"),
                                l.setAttribute("y", "0"),
                                l.setAttribute("fill", "#ffffff"),
                                l.setAttribute("opacity", "0"),
                                n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"),
                                n.appendChild(l),
                                n.appendChild(this.layerElement),
                                s = n,
                            featureSupport.maskType || (a.setAttribute("mask-type", "luminance"),
                                e.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                                i = createNS("g"),
                                n.appendChild(l),
                                i.appendChild(this.layerElement),
                                s = i,
                                n.appendChild(i)),
                                this.globalData.defs.appendChild(a)
                        }
                    } else
                        this.data.tt ? (this.matteElement.appendChild(this.layerElement),
                            s = this.matteElement,
                            this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
                    if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln),
                    this.data.cl && this.layerElement.setAttribute("class", this.data.cl),
                    0 === this.data.ty && !this.data.hd) {
                        var p = createNS("clipPath")
                            , f = createNS("path");
                        f.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
                        var d = createElementID();
                        if (p.setAttribute("id", d),
                            p.appendChild(f),
                            this.globalData.defs.appendChild(p),
                            this.checkMasks()) {
                            var m = createNS("g");
                            m.setAttribute("clip-path", "url(" + locationHref + "#" + d + ")"),
                                m.appendChild(this.layerElement),
                                this.transformedElement = m,
                                s ? s.appendChild(this.transformedElement) : this.baseElement = this.transformedElement
                        } else
                            this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + d + ")")
                    }
                    0 !== this.data.bm && this.setBlendMode()
                },
                renderElement: function() {
                    this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()),
                    this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v)
                },
                destroyBaseElement: function() {
                    this.layerElement = null,
                        this.matteElement = null,
                        this.maskManager.destroy()
                },
                getBaseElement: function() {
                    return this.data.hd ? null : this.baseElement
                },
                createRenderableComponents: function() {
                    this.maskManager = new MaskElement(this.data,this,this.globalData),
                        this.renderableEffectsManager = new SVGEffects(this)
                },
                setMatte: function(t) {
                    this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")")
                }
            },
            IShapeElement.prototype = {
                addShapeToModifiers: function(t) {
                    var e, i = this.shapeModifiers.length;
                    for (e = 0; e < i; e += 1)
                        this.shapeModifiers[e].addShape(t)
                },
                isShapeInAnimatedModifiers: function(t) {
                    for (var e = this.shapeModifiers.length; 0 < e; )
                        if (this.shapeModifiers[0].isAnimatedWithShape(t))
                            return !0;
                    return !1
                },
                renderModifiers: function() {
                    if (this.shapeModifiers.length) {
                        var t, e = this.shapes.length;
                        for (t = 0; t < e; t += 1)
                            this.shapes[t].sh.reset();
                        for (t = (e = this.shapeModifiers.length) - 1; 0 <= t; t -= 1)
                            this.shapeModifiers[t].processShapes(this._isFirstFrame)
                    }
                },
                lcEnum: {
                    1: "butt",
                    2: "round",
                    3: "square"
                },
                ljEnum: {
                    1: "miter",
                    2: "round",
                    3: "bevel"
                },
                searchProcessedElement: function(t) {
                    for (var e = this.processedElements, i = 0, s = e.length; i < s; ) {
                        if (e[i].elem === t)
                            return e[i].pos;
                        i += 1
                    }
                    return 0
                },
                addProcessedElement: function(t, e) {
                    for (var i = this.processedElements, s = i.length; s; )
                        if (i[s -= 1].elem === t)
                            return void (i[s].pos = e);
                    i.push(new ProcessedElement(t,e))
                },
                prepareFrame: function(t) {
                    this.prepareRenderableFrame(t),
                        this.prepareProperties(t, this.isInRange)
                }
            },
            ITextElement.prototype.initElement = function(t, e, i) {
                this.lettersChangedFlag = !0,
                    this.initFrame(),
                    this.initBaseData(t, e, i),
                    this.textProperty = new TextProperty(this,t.t,this.dynamicProperties),
                    this.textAnimator = new TextAnimatorProperty(t.t,this.renderType,this),
                    this.initTransform(t, e, i),
                    this.initHierarchy(),
                    this.initRenderable(),
                    this.initRendererElement(),
                    this.createContainerElements(),
                    this.createRenderableComponents(),
                    this.createContent(),
                    this.hide(),
                    this.textAnimator.searchProperties(this.dynamicProperties)
            }
            ,
            ITextElement.prototype.prepareFrame = function(t) {
                this._mdf = !1,
                    this.prepareRenderableFrame(t),
                    this.prepareProperties(t, this.isInRange),
                (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(),
                    this.textProperty._isFirstFrame = !1,
                    this.textProperty._mdf = !1)
            }
            ,
            ITextElement.prototype.createPathShape = function(t, e) {
                var i, s, r = e.length, a = "";
                for (i = 0; i < r; i += 1)
                    s = e[i].ks.k,
                        a += buildShapeString(s, s.i.length, !0, t);
                return a
            }
            ,
            ITextElement.prototype.updateDocumentData = function(t, e) {
                this.textProperty.updateDocumentData(t, e)
            }
            ,
            ITextElement.prototype.canResizeFont = function(t) {
                this.textProperty.canResizeFont(t)
            }
            ,
            ITextElement.prototype.setMinimumFontSize = function(t) {
                this.textProperty.setMinimumFontSize(t)
            }
            ,
            ITextElement.prototype.applyTextPropertiesToMatrix = function(t, e, i, s, r) {
                switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0),
                    e.translate(0, -t.ls, 0),
                    t.j) {
                    case 1:
                        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]), 0, 0);
                        break;
                    case 2:
                        e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]) / 2, 0, 0)
                }
                e.translate(s, r, 0)
            }
            ,
            ITextElement.prototype.buildColor = function(t) {
                return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")"
            }
            ,
            ITextElement.prototype.emptyProp = new LetterProps,
            ITextElement.prototype.destroy = function() {}
            ,
            extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement),
            ICompElement.prototype.initElement = function(t, e, i) {
                this.initFrame(),
                    this.initBaseData(t, e, i),
                    this.initTransform(t, e, i),
                    this.initRenderable(),
                    this.initHierarchy(),
                    this.initRendererElement(),
                    this.createContainerElements(),
                    this.createRenderableComponents(),
                !this.data.xt && e.progressiveLoad || this.buildAllItems(),
                    this.hide()
            }
            ,
            ICompElement.prototype.prepareFrame = function(t) {
                if (this._mdf = !1,
                    this.prepareRenderableFrame(t),
                    this.prepareProperties(t, this.isInRange),
                this.isInRange || this.data.xt) {
                    if (this.tm._placeholder)
                        this.renderedFrame = t / this.data.sr;
                    else {
                        var e = this.tm.v;
                        e === this.data.op && (e = this.data.op - 1),
                            this.renderedFrame = e
                    }
                    var i, s = this.elements.length;
                    for (this.completeLayers || this.checkLayers(this.renderedFrame),
                             i = s - 1; 0 <= i; i -= 1)
                        (this.completeLayers || this.elements[i]) && (this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st),
                        this.elements[i]._mdf && (this._mdf = !0))
                }
            }
            ,
            ICompElement.prototype.renderInnerContent = function() {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1)
                    (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
            }
            ,
            ICompElement.prototype.setElements = function(t) {
                this.elements = t
            }
            ,
            ICompElement.prototype.getElements = function() {
                return this.elements
            }
            ,
            ICompElement.prototype.destroyElements = function() {
                var t, e = this.layers.length;
                for (t = 0; t < e; t += 1)
                    this.elements[t] && this.elements[t].destroy()
            }
            ,
            ICompElement.prototype.destroy = function() {
                this.destroyElements(),
                    this.destroyBaseElement()
            }
            ,
            extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement),
            IImageElement.prototype.createContent = function() {
                var t = this.globalData.getAssetsPath(this.assetData);
                this.innerElem = createNS("image"),
                    this.innerElem.setAttribute("width", this.assetData.w + "px"),
                    this.innerElem.setAttribute("height", this.assetData.h + "px"),
                    this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio),
                    this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t),
                    this.layerElement.appendChild(this.innerElem)
            }
            ,
            IImageElement.prototype.sourceRectAtTime = function() {
                return this.sourceRect
            }
            ,
            extendPrototype([IImageElement], ISolidElement),
            ISolidElement.prototype.createContent = function() {
                var t = createNS("rect");
                t.setAttribute("width", this.data.sw),
                    t.setAttribute("height", this.data.sh),
                    t.setAttribute("fill", this.data.sc),
                    this.layerElement.appendChild(t)
            }
            ,
            extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement),
            extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextElement),
            SVGTextElement.prototype.createContent = function() {
                this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"))
            }
            ,
            SVGTextElement.prototype.buildTextContents = function(t) {
                for (var e = 0, i = t.length, s = [], r = ""; e < i; )
                    t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (s.push(r),
                        r = "") : r += t[e],
                        e += 1;
                return s.push(r),
                    s
            }
            ,
            SVGTextElement.prototype.buildNewText = function() {
                var t, e, i = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(i ? i.l.length : 0),
                    i.fc ? this.layerElement.setAttribute("fill", this.buildColor(i.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"),
                i.sc && (this.layerElement.setAttribute("stroke", this.buildColor(i.sc)),
                    this.layerElement.setAttribute("stroke-width", i.sw)),
                    this.layerElement.setAttribute("font-size", i.finalSize);
                var s = this.globalData.fontManager.getFontByName(i.f);
                if (s.fClass)
                    this.layerElement.setAttribute("class", s.fClass);
                else {
                    this.layerElement.setAttribute("font-family", s.fFamily);
                    var r = i.fWeight
                        , a = i.fStyle;
                    this.layerElement.setAttribute("font-style", a),
                        this.layerElement.setAttribute("font-weight", r)
                }
                this.layerElement.setAttribute("arial-label", i.t);
                var n, o = i.l || [], h = !!this.globalData.fontManager.chars;
                e = o.length;
                var l, p = this.mHelper, f = "", d = this.data.singleShape, m = 0, c = 0, u = !0, y = i.tr / 1e3 * i.finalSize;
                if (!d || h || i.sz) {
                    var g, v, _ = this.textSpans.length;
                    for (t = 0; t < e; t += 1)
                        h && d && 0 !== t || (n = t < _ ? this.textSpans[t] : createNS(h ? "path" : "text"),
                        _ <= t && (n.setAttribute("stroke-linecap", "butt"),
                            n.setAttribute("stroke-linejoin", "round"),
                            n.setAttribute("stroke-miterlimit", "4"),
                            this.textSpans[t] = n,
                            this.layerElement.appendChild(n)),
                            n.style.display = "inherit"),
                            p.reset(),
                            p.scale(i.finalSize / 100, i.finalSize / 100),
                        d && (o[t].n && (m = -y,
                            c += i.yOffset,
                            c += u ? 1 : 0,
                            u = !1),
                            this.applyTextPropertiesToMatrix(i, p, o[t].line, m, c),
                            m += o[t].l || 0,
                            m += y),
                            h ? (l = (g = (v = this.globalData.fontManager.getCharData(i.finalText[t], s.fStyle, this.globalData.fontManager.getFontByName(i.f).fFamily)) && v.data || {}).shapes ? g.shapes[0].it : [],
                                d ? f += this.createPathShape(p, l) : n.setAttribute("d", this.createPathShape(p, l))) : (d && n.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"),
                                n.textContent = o[t].val,
                                n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
                    d && n && n.setAttribute("d", f)
                } else {
                    var b = this.textContainer
                        , x = "start";
                    switch (i.j) {
                        case 1:
                            x = "end";
                            break;
                        case 2:
                            x = "middle"
                    }
                    b.setAttribute("text-anchor", x),
                        b.setAttribute("letter-spacing", y);
                    var S = this.buildTextContents(i.finalText);
                    for (e = S.length,
                             c = i.ps ? i.ps[1] + i.ascent : 0,
                             t = 0; t < e; t += 1)
                        (n = this.textSpans[t] || createNS("tspan")).textContent = S[t],
                            n.setAttribute("x", 0),
                            n.setAttribute("y", c),
                            n.style.display = "inherit",
                            b.appendChild(n),
                            this.textSpans[t] = n,
                            c += i.finalLineHeight;
                    this.layerElement.appendChild(b)
                }
                for (; t < this.textSpans.length; )
                    this.textSpans[t].style.display = "none",
                        t += 1;
                this._sizeChanged = !0
            }
            ,
            SVGTextElement.prototype.sourceRectAtTime = function(t) {
                if (this.prepareFrame(this.comp.renderedFrame - this.data.st),
                    this.renderInnerContent(),
                    this._sizeChanged) {
                    this._sizeChanged = !1;
                    var e = this.layerElement.getBBox();
                    this.bbox = {
                        top: e.y,
                        left: e.x,
                        width: e.width,
                        height: e.height
                    }
                }
                return this.bbox
            }
            ,
            SVGTextElement.prototype.renderInnerContent = function() {
                if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag),
                this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
                    var t, e;
                    this._sizeChanged = !0;
                    var i, s, r = this.textAnimator.renderedLetters, a = this.textProperty.currentData.l;
                    for (e = a.length,
                             t = 0; t < e; t += 1)
                        a[t].n || (i = r[t],
                            s = this.textSpans[t],
                        i._mdf.m && s.setAttribute("transform", i.m),
                        i._mdf.o && s.setAttribute("opacity", i.o),
                        i._mdf.sw && s.setAttribute("stroke-width", i.sw),
                        i._mdf.sc && s.setAttribute("stroke", i.sc),
                        i._mdf.fc && s.setAttribute("fill", i.fc))
                }
            }
            ,
            extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement),
            SVGShapeElement.prototype.initSecondaryElement = function() {}
            ,
            SVGShapeElement.prototype.identityMatrix = new Matrix,
            SVGShapeElement.prototype.buildExpressionInterface = function() {}
            ,
            SVGShapeElement.prototype.createContent = function() {
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0),
                    this.filterUniqueShapes()
            }
            ,
            SVGShapeElement.prototype.filterUniqueShapes = function() {
                var t, e, i, s, r = this.shapes.length, a = this.stylesList.length, n = [], o = !1;
                for (i = 0; i < a; i += 1) {
                    for (s = this.stylesList[i],
                             o = !1,
                             t = n.length = 0; t < r; t += 1)
                        -1 !== (e = this.shapes[t]).styles.indexOf(s) && (n.push(e),
                            o = e._isAnimated || o);
                    1 < n.length && o && this.setShapesAsAnimated(n)
                }
            }
            ,
            SVGShapeElement.prototype.setShapesAsAnimated = function(t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1)
                    t[e].setAsAnimated()
            }
            ,
            SVGShapeElement.prototype.createStyleElement = function(t, e) {
                var i, s = new SVGStyleData(t,e), r = s.pElem;
                return "st" === t.ty ? i = new SVGStrokeStyleData(this,t,s) : "fl" === t.ty ? i = new SVGFillStyleData(this,t,s) : "gf" !== t.ty && "gs" !== t.ty || (i = new ("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this,t,s),
                    this.globalData.defs.appendChild(i.gf),
                i.maskId && (this.globalData.defs.appendChild(i.ms),
                    this.globalData.defs.appendChild(i.of),
                    r.setAttribute("mask", "url(" + locationHref + "#" + i.maskId + ")"))),
                "st" !== t.ty && "gs" !== t.ty || (r.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"),
                    r.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"),
                    r.setAttribute("fill-opacity", "0"),
                1 === t.lj && r.setAttribute("stroke-miterlimit", t.ml)),
                2 === t.r && r.setAttribute("fill-rule", "evenodd"),
                t.ln && r.setAttribute("id", t.ln),
                t.cl && r.setAttribute("class", t.cl),
                t.bm && (r.style["mix-blend-mode"] = getBlendMode(t.bm)),
                    this.stylesList.push(s),
                    this.addToAnimatedContents(t, i),
                    i
            }
            ,
            SVGShapeElement.prototype.createGroupElement = function(t) {
                var e = new ShapeGroupData;
                return t.ln && e.gr.setAttribute("id", t.ln),
                t.cl && e.gr.setAttribute("class", t.cl),
                t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)),
                    e
            }
            ,
            SVGShapeElement.prototype.createTransformElement = function(t, e) {
                var i = TransformPropertyFactory.getTransformProperty(this, t, this)
                    , s = new SVGTransformData(i,i.o,e);
                return this.addToAnimatedContents(t, s),
                    s
            }
            ,
            SVGShapeElement.prototype.createShapeElement = function(t, e, i) {
                var s = 4;
                "rc" === t.ty ? s = 5 : "el" === t.ty ? s = 6 : "sr" === t.ty && (s = 7);
                var r = new SVGShapeData(e,i,ShapePropertyFactory.getShapeProp(this, t, s, this));
                return this.shapes.push(r),
                    this.addShapeToModifiers(r),
                    this.addToAnimatedContents(t, r),
                    r
            }
            ,
            SVGShapeElement.prototype.addToAnimatedContents = function(t, e) {
                for (var i = 0, s = this.animatedContents.length; i < s; ) {
                    if (this.animatedContents[i].element === e)
                        return;
                    i += 1
                }
                this.animatedContents.push({
                    fn: SVGElementsRenderer.createRenderFunction(t),
                    element: e,
                    data: t
                })
            }
            ,
            SVGShapeElement.prototype.setElementStyles = function(t) {
                var e, i = t.styles, s = this.stylesList.length;
                for (e = 0; e < s; e += 1)
                    this.stylesList[e].closed || i.push(this.stylesList[e])
            }
            ,
            SVGShapeElement.prototype.reloadShapes = function() {
                this._isFirstFrame = !0;
                var t, e = this.itemsData.length;
                for (t = 0; t < e; t += 1)
                    this.prevViewData[t] = this.itemsData[t];
                for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0),
                         this.filterUniqueShapes(),
                         e = this.dynamicProperties.length,
                         t = 0; t < e; t += 1)
                    this.dynamicProperties[t].getValue();
                this.renderModifiers()
            }
            ,
            SVGShapeElement.prototype.searchShapes = function(t, e, i, s, r, a, n) {
                var o, h, l, p, f, d, m = [].concat(a), c = t.length - 1, u = [], y = [];
                for (o = c; 0 <= o; o -= 1) {
                    if ((d = this.searchProcessedElement(t[o])) ? e[o] = i[d - 1] : t[o]._render = n,
                    "fl" == t[o].ty || "st" == t[o].ty || "gf" == t[o].ty || "gs" == t[o].ty)
                        d ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], r),
                        t[o]._render && s.appendChild(e[o].style.pElem),
                            u.push(e[o].style);
                    else if ("gr" == t[o].ty) {
                        if (d)
                            for (l = e[o].it.length,
                                     h = 0; h < l; h += 1)
                                e[o].prevViewData[h] = e[o].it[h];
                        else
                            e[o] = this.createGroupElement(t[o]);
                        this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, r + 1, m, n),
                        t[o]._render && s.appendChild(e[o].gr)
                    } else
                        "tr" == t[o].ty ? (d || (e[o] = this.createTransformElement(t[o], s)),
                            p = e[o].transform,
                            m.push(p)) : "sh" == t[o].ty || "rc" == t[o].ty || "el" == t[o].ty || "sr" == t[o].ty ? (d || (e[o] = this.createShapeElement(t[o], m, r)),
                            this.setElementStyles(e[o])) : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty ? (d ? (f = e[o]).closed = !1 : ((f = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]),
                            e[o] = f,
                            this.shapeModifiers.push(f)),
                            y.push(f)) : "rp" == t[o].ty && (d ? (f = e[o]).closed = !0 : (f = ShapeModifiers.getModifier(t[o].ty),
                            (e[o] = f).init(this, t, o, e),
                            this.shapeModifiers.push(f),
                            n = !1),
                            y.push(f));
                    this.addProcessedElement(t[o], o + 1)
                }
                for (c = u.length,
                         o = 0; o < c; o += 1)
                    u[o].closed = !0;
                for (c = y.length,
                         o = 0; o < c; o += 1)
                    y[o].closed = !0
            }
            ,
            SVGShapeElement.prototype.renderInnerContent = function() {
                this.renderModifiers();
                var t, e = this.stylesList.length;
                for (t = 0; t < e; t += 1)
                    this.stylesList[t].reset();
                for (this.renderShape(),
                         t = 0; t < e; t += 1)
                    (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d),
                        this.stylesList[t].d = "M0 0" + this.stylesList[t].d),
                        this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"))
            }
            ,
            SVGShapeElement.prototype.renderShape = function() {
                var t, e, i = this.animatedContents.length;
                for (t = 0; t < i; t += 1)
                    e = this.animatedContents[t],
                    (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame)
            }
            ,
            SVGShapeElement.prototype.destroy = function() {
                this.destroyBaseElement(),
                    this.shapesData = null,
                    this.itemsData = null
            }
            ,
            SVGTintFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[0].p.v
                        , i = this.filterManager.effectElements[1].p.v
                        , s = this.filterManager.effectElements[2].p.v / 100;
                    this.matrixFilter.setAttribute("values", i[0] - e[0] + " 0 0 0 " + e[0] + " " + (i[1] - e[1]) + " 0 0 0 " + e[1] + " " + (i[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + s + " 0")
                }
            }
            ,
            SVGFillFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[2].p.v
                        , i = this.filterManager.effectElements[6].p.v;
                    this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + i + " 0")
                }
            }
            ,
            SVGGaussianBlurEffect.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = .3 * this.filterManager.effectElements[0].p.v
                        , i = this.filterManager.effectElements[1].p.v
                        , s = 3 == i ? 0 : e
                        , r = 2 == i ? 0 : e;
                    this.feGaussianBlur.setAttribute("stdDeviation", s + " " + r);
                    var a = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
                    this.feGaussianBlur.setAttribute("edgeMode", a)
                }
            }
            ,
            SVGStrokeEffect.prototype.initialize = function() {
                var t, e, i, s, r = this.elem.layerElement.children || this.elem.layerElement.childNodes;
                for (1 === this.filterManager.effectElements[1].p.v ? (s = this.elem.maskManager.masksProperties.length,
                    i = 0) : s = 1 + (i = this.filterManager.effectElements[0].p.v - 1),
                         (e = createNS("g")).setAttribute("fill", "none"),
                         e.setAttribute("stroke-linecap", "round"),
                         e.setAttribute("stroke-dashoffset", 1); i < s; i += 1)
                    t = createNS("path"),
                        e.appendChild(t),
                        this.paths.push({
                            p: t,
                            m: i
                        });
                if (3 === this.filterManager.effectElements[10].p.v) {
                    var a = createNS("mask")
                        , n = createElementID();
                    a.setAttribute("id", n),
                        a.setAttribute("mask-type", "alpha"),
                        a.appendChild(e),
                        this.elem.globalData.defs.appendChild(a);
                    var o = createNS("g");
                    for (o.setAttribute("mask", "url(" + locationHref + "#" + n + ")"); r[0]; )
                        o.appendChild(r[0]);
                    this.elem.layerElement.appendChild(o),
                        this.masker = a,
                        e.setAttribute("stroke", "#fff")
                } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
                    if (2 === this.filterManager.effectElements[10].p.v)
                        for (r = this.elem.layerElement.children || this.elem.layerElement.childNodes; r.length; )
                            this.elem.layerElement.removeChild(r[0]);
                    this.elem.layerElement.appendChild(e),
                        this.elem.layerElement.removeAttribute("mask"),
                        e.setAttribute("stroke", "#fff")
                }
                this.initialized = !0,
                    this.pathMasker = e
            }
            ,
            SVGStrokeEffect.prototype.renderFrame = function(t) {
                this.initialized || this.initialize();
                var e, i, s, r = this.paths.length;
                for (e = 0; e < r; e += 1)
                    if (-1 !== this.paths[e].m && (i = this.elem.maskManager.viewData[this.paths[e].m],
                        s = this.paths[e].p,
                    (t || this.filterManager._mdf || i.prop._mdf) && s.setAttribute("d", i.lastPath),
                    t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || i.prop._mdf)) {
                        var a;
                        if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
                            var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100
                                , o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100
                                , h = s.getTotalLength();
                            a = "0 0 0 " + h * n + " ";
                            var l, p = h * (o - n), f = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100, d = Math.floor(p / f);
                            for (l = 0; l < d; l += 1)
                                a += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
                            a += "0 " + 10 * h + " 0 0"
                        } else
                            a = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;
                        s.setAttribute("stroke-dasharray", a)
                    }
                if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v),
                (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v),
                (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
                    var m = this.filterManager.effectElements[3].p.v;
                    this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * m[0]) + "," + bm_floor(255 * m[1]) + "," + bm_floor(255 * m[2]) + ")")
                }
            }
            ,
            SVGTritoneFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e = this.filterManager.effectElements[0].p.v
                        , i = this.filterManager.effectElements[1].p.v
                        , s = this.filterManager.effectElements[2].p.v
                        , r = s[0] + " " + i[0] + " " + e[0]
                        , a = s[1] + " " + i[1] + " " + e[1]
                        , n = s[2] + " " + i[2] + " " + e[2];
                    this.feFuncR.setAttribute("tableValues", r),
                        this.feFuncG.setAttribute("tableValues", a),
                        this.feFuncB.setAttribute("tableValues", n)
                }
            }
            ,
            SVGProLevelsFilter.prototype.createFeFunc = function(t, e) {
                var i = createNS(t);
                return i.setAttribute("type", "table"),
                    e.appendChild(i),
                    i
            }
            ,
            SVGProLevelsFilter.prototype.getTableValue = function(t, e, i, s, r) {
                for (var a, n, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
                    length: 256
                }), f = 0, d = r - s, m = e - t; o <= 256; )
                    n = (a = o / 256) <= h ? m < 0 ? r : s : l <= a ? m < 0 ? s : r : s + d * Math.pow((a - t) / m, 1 / i),
                        p[f++] = n,
                        o += 256 / 255;
                return p.join(" ")
            }
            ,
            SVGProLevelsFilter.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    var e, i = this.filterManager.effectElements;
                    this.feFuncRComposed && (t || i[3].p._mdf || i[4].p._mdf || i[5].p._mdf || i[6].p._mdf || i[7].p._mdf) && (e = this.getTableValue(i[3].p.v, i[4].p.v, i[5].p.v, i[6].p.v, i[7].p.v),
                        this.feFuncRComposed.setAttribute("tableValues", e),
                        this.feFuncGComposed.setAttribute("tableValues", e),
                        this.feFuncBComposed.setAttribute("tableValues", e)),
                    this.feFuncR && (t || i[10].p._mdf || i[11].p._mdf || i[12].p._mdf || i[13].p._mdf || i[14].p._mdf) && (e = this.getTableValue(i[10].p.v, i[11].p.v, i[12].p.v, i[13].p.v, i[14].p.v),
                        this.feFuncR.setAttribute("tableValues", e)),
                    this.feFuncG && (t || i[17].p._mdf || i[18].p._mdf || i[19].p._mdf || i[20].p._mdf || i[21].p._mdf) && (e = this.getTableValue(i[17].p.v, i[18].p.v, i[19].p.v, i[20].p.v, i[21].p.v),
                        this.feFuncG.setAttribute("tableValues", e)),
                    this.feFuncB && (t || i[24].p._mdf || i[25].p._mdf || i[26].p._mdf || i[27].p._mdf || i[28].p._mdf) && (e = this.getTableValue(i[24].p.v, i[25].p.v, i[26].p.v, i[27].p.v, i[28].p.v),
                        this.feFuncB.setAttribute("tableValues", e)),
                    this.feFuncA && (t || i[31].p._mdf || i[32].p._mdf || i[33].p._mdf || i[34].p._mdf || i[35].p._mdf) && (e = this.getTableValue(i[31].p.v, i[32].p.v, i[33].p.v, i[34].p.v, i[35].p.v),
                        this.feFuncA.setAttribute("tableValues", e))
                }
            }
            ,
            SVGDropShadowEffect.prototype.renderFrame = function(t) {
                if (t || this.filterManager._mdf) {
                    if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4),
                    t || this.filterManager.effectElements[0].p._mdf) {
                        var e = this.filterManager.effectElements[0].p.v;
                        this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])))
                    }
                    if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255),
                    t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
                        var i = this.filterManager.effectElements[3].p.v
                            , s = (this.filterManager.effectElements[2].p.v - 90) * degToRads
                            , r = i * Math.cos(s)
                            , a = i * Math.sin(s);
                        this.feOffset.setAttribute("dx", r),
                            this.feOffset.setAttribute("dy", a)
                    }
                }
            }
        ;
        var _svgMatteSymbols = [];
        function SVGMatte3Effect(t, e, i) {
            this.initialized = !1,
                this.filterManager = e,
                this.filterElem = t,
                (this.elem = i).matteElement = createNS("g"),
                i.matteElement.appendChild(i.layerElement),
                i.matteElement.appendChild(i.transformedElement),
                i.baseElement = i.matteElement
        }
        function SVGEffects(t) {
            var e, i, s = t.data.ef ? t.data.ef.length : 0, r = createElementID(), a = filtersFactory.createFilter(r), n = 0;
            for (this.filters = [],
                     e = 0; e < s; e += 1)
                i = null,
                    20 === t.data.ef[e].ty ? (n += 1,
                        i = new SVGTintFilter(a,t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (n += 1,
                        i = new SVGFillFilter(a,t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? i = new SVGStrokeEffect(t,t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (n += 1,
                        i = new SVGTritoneFilter(a,t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (n += 1,
                        i = new SVGProLevelsFilter(a,t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (n += 1,
                        i = new SVGDropShadowEffect(a,t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty ? i = new SVGMatte3Effect(a,t.effectsManager.effectElements[e],t) : 29 === t.data.ef[e].ty && (n += 1,
                        i = new SVGGaussianBlurEffect(a,t.effectsManager.effectElements[e])),
                i && this.filters.push(i);
            n && (t.globalData.defs.appendChild(a),
                t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + r + ")")),
            this.filters.length && t.addRenderableComponent(this)
        }
        function CVContextData() {
            var t;
            for (this.saved = [],
                     this.cArrPos = 0,
                     this.cTr = new Matrix,
                     this.cO = 1,
                     this.savedOp = createTypedArray("float32", 15),
                     t = 0; t < 15; t += 1)
                this.saved[t] = createTypedArray("float32", 16);
            this._length = 15
        }
        function CVBaseElement() {}
        function CVImageElement(t, e, i) {
            this.failed = !1,
                this.assetData = e.getAssetData(t.refId),
                this.img = e.imageLoader.getImage(this.assetData),
                this.initElement(t, e, i)
        }
        function CVCompElement(t, e, i) {
            this.completeLayers = !1,
                this.layers = t.layers,
                this.pendingElements = [],
                this.elements = createSizedArray(this.layers.length),
                this.initElement(t, e, i),
                this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
                    _placeholder: !0
                }
        }
        function CVMaskElement(t, e) {
            this.data = t,
                this.element = e,
                this.masksProperties = this.data.masksProperties || [],
                this.viewData = createSizedArray(this.masksProperties.length);
            var i, s = this.masksProperties.length, r = !1;
            for (i = 0; i < s; i++)
                "n" !== this.masksProperties[i].mode && (r = !0),
                    this.viewData[i] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[i], 3);
            (this.hasMasks = r) && this.element.addRenderableComponent(this)
        }
        function CVShapeElement(t, e, i) {
            this.shapes = [],
                this.shapesData = t.shapes,
                this.stylesList = [],
                this.itemsData = [],
                this.prevViewData = [],
                this.shapeModifiers = [],
                this.processedElements = [],
                this.transformsManager = new ShapeTransformManager,
                this.initElement(t, e, i)
        }
        function CVSolidElement(t, e, i) {
            this.initElement(t, e, i)
        }
        function CVTextElement(t, e, i) {
            this.textSpans = [],
                this.yOffset = 0,
                this.fillColorAnim = !1,
                this.strokeColorAnim = !1,
                this.strokeWidthAnim = !1,
                this.stroke = !1,
                this.fill = !1,
                this.justifyOffset = 0,
                this.currentRender = null,
                this.renderType = "canvas",
                this.values = {
                    fill: "rgba(0,0,0,0)",
                    stroke: "rgba(0,0,0,0)",
                    sWidth: 0,
                    fValue: ""
                },
                this.initElement(t, e, i)
        }
        function CVEffects() {}
        function HBaseElement(t, e, i) {}
        function HSolidElement(t, e, i) {
            this.initElement(t, e, i)
        }
        function HCompElement(t, e, i) {
            this.layers = t.layers,
                this.supports3d = !t.hasMask,
                this.completeLayers = !1,
                this.pendingElements = [],
                this.elements = this.layers ? createSizedArray(this.layers.length) : [],
                this.initElement(t, e, i),
                this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
                    _placeholder: !0
                }
        }
        function HShapeElement(t, e, i) {
            this.shapes = [],
                this.shapesData = t.shapes,
                this.stylesList = [],
                this.shapeModifiers = [],
                this.itemsData = [],
                this.processedElements = [],
                this.animatedContents = [],
                this.shapesContainer = createNS("g"),
                this.initElement(t, e, i),
                this.prevViewData = [],
                this.currentBBox = {
                    x: 999999,
                    y: -999999,
                    h: 0,
                    w: 0
                }
        }
        function HTextElement(t, e, i) {
            this.textSpans = [],
                this.textPaths = [],
                this.currentBBox = {
                    x: 999999,
                    y: -999999,
                    h: 0,
                    w: 0
                },
                this.renderType = "svg",
                this.isMasked = !1,
                this.initElement(t, e, i)
        }
        function HImageElement(t, e, i) {
            this.assetData = e.getAssetData(t.refId),
                this.initElement(t, e, i)
        }
        function HCameraElement(t, e, i) {
            this.initFrame(),
                this.initBaseData(t, e, i),
                this.initHierarchy();
            var s = PropertyFactory.getProp;
            if (this.pe = s(this, t.pe, 0, 0, this),
                t.ks.p.s ? (this.px = s(this, t.ks.p.x, 1, 0, this),
                    this.py = s(this, t.ks.p.y, 1, 0, this),
                    this.pz = s(this, t.ks.p.z, 1, 0, this)) : this.p = s(this, t.ks.p, 1, 0, this),
            t.ks.a && (this.a = s(this, t.ks.a, 1, 0, this)),
            t.ks.or.k.length && t.ks.or.k[0].to) {
                var r, a = t.ks.or.k.length;
                for (r = 0; r < a; r += 1)
                    t.ks.or.k[r].to = null,
                        t.ks.or.k[r].ti = null
            }
            this.or = s(this, t.ks.or, 1, degToRads, this),
                this.or.sh = !0,
                this.rx = s(this, t.ks.rx, 0, degToRads, this),
                this.ry = s(this, t.ks.ry, 0, degToRads, this),
                this.rz = s(this, t.ks.rz, 0, degToRads, this),
                this.mat = new Matrix,
                this._prevMat = new Matrix,
                this._isFirstFrame = !0,
                this.finalTransform = {
                    mProp: this
                }
        }
        function HEffects() {}
        SVGMatte3Effect.prototype.findSymbol = function(t) {
            for (var e = 0, i = _svgMatteSymbols.length; e < i; ) {
                if (_svgMatteSymbols[e] === t)
                    return _svgMatteSymbols[e];
                e += 1
            }
            return null
        }
            ,
            SVGMatte3Effect.prototype.replaceInParent = function(t, e) {
                var i = t.layerElement.parentNode;
                if (i) {
                    for (var s, r = i.children, a = 0, n = r.length; a < n && r[a] !== t.layerElement; )
                        a += 1;
                    a <= n - 2 && (s = r[a + 1]);
                    var o = createNS("use");
                    o.setAttribute("href", "#" + e),
                        s ? i.insertBefore(o, s) : i.appendChild(o)
                }
            }
            ,
            SVGMatte3Effect.prototype.setElementAsMask = function(t, e) {
                if (!this.findSymbol(e)) {
                    var i = createElementID()
                        , s = createNS("mask");
                    s.setAttribute("id", e.layerId),
                        s.setAttribute("mask-type", "alpha"),
                        _svgMatteSymbols.push(e);
                    var r = t.globalData.defs;
                    r.appendChild(s);
                    var a = createNS("symbol");
                    a.setAttribute("id", i),
                        this.replaceInParent(e, i),
                        a.appendChild(e.layerElement),
                        r.appendChild(a);
                    var n = createNS("use");
                    n.setAttribute("href", "#" + i),
                        s.appendChild(n),
                        e.data.hd = !1,
                        e.show()
                }
                t.setMatte(e.layerId)
            }
            ,
            SVGMatte3Effect.prototype.initialize = function() {
                for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, i = 0, s = e.length; i < s; )
                    e[i] && e[i].data.ind === t && this.setElementAsMask(this.elem, e[i]),
                        i += 1;
                this.initialized = !0
            }
            ,
            SVGMatte3Effect.prototype.renderFrame = function() {
                this.initialized || this.initialize()
            }
            ,
            SVGEffects.prototype.renderFrame = function(t) {
                var e, i = this.filters.length;
                for (e = 0; e < i; e += 1)
                    this.filters[e].renderFrame(t)
            }
            ,
            CVContextData.prototype.duplicate = function() {
                var t = 2 * this._length
                    , e = this.savedOp;
                this.savedOp = createTypedArray("float32", t),
                    this.savedOp.set(e);
                var i = 0;
                for (i = this._length; i < t; i += 1)
                    this.saved[i] = createTypedArray("float32", 16);
                this._length = t
            }
            ,
            CVContextData.prototype.reset = function() {
                this.cArrPos = 0,
                    this.cTr.reset(),
                    this.cO = 1
            }
            ,
            CVBaseElement.prototype = {
                createElements: function() {},
                initRendererElement: function() {},
                createContainerElements: function() {
                    this.canvasContext = this.globalData.canvasContext,
                        this.renderableEffectsManager = new CVEffects(this)
                },
                createContent: function() {},
                setBlendMode: function() {
                    var t = this.globalData;
                    if (t.blendMode !== this.data.bm) {
                        t.blendMode = this.data.bm;
                        var e = getBlendMode(this.data.bm);
                        t.canvasContext.globalCompositeOperation = e
                    }
                },
                createRenderableComponents: function() {
                    this.maskManager = new CVMaskElement(this.data,this)
                },
                hideElement: function() {
                    this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0)
                },
                showElement: function() {
                    this.isInRange && !this.isTransparent && (this.hidden = !1,
                        this._isFirstFrame = !0,
                        this.maskManager._isFirstFrame = !0)
                },
                renderFrame: function() {
                    this.hidden || this.data.hd || (this.renderTransform(),
                        this.renderRenderable(),
                        this.setBlendMode(),
                        this.globalData.renderer.save(),
                        this.globalData.renderer.ctxTransform(this.finalTransform.mat.props),
                        this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v),
                        this.renderInnerContent(),
                        this.globalData.renderer.restore(),
                    this.maskManager.hasMasks && this.globalData.renderer.restore(!0),
                    this._isFirstFrame && (this._isFirstFrame = !1))
                },
                destroy: function() {
                    this.canvasContext = null,
                        this.data = null,
                        this.globalData = null,
                        this.maskManager.destroy()
                },
                mHelper: new Matrix
            },
            CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement,
            CVBaseElement.prototype.show = CVBaseElement.prototype.showElement,
            extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement),
            CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement,
            CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame,
            CVImageElement.prototype.createContent = function() {
                if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
                    var t = createTag("canvas");
                    t.width = this.assetData.w,
                        t.height = this.assetData.h;
                    var e, i, s = t.getContext("2d"), r = this.img.width, a = this.img.height, n = r / a, o = this.assetData.w / this.assetData.h, h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
                    o < n && "xMidYMid slice" === h || n < o && "xMidYMid slice" !== h ? e = (i = a) * o : i = (e = r) / o,
                        s.drawImage(this.img, (r - e) / 2, (a - i) / 2, e, i, 0, 0, this.assetData.w, this.assetData.h),
                        this.img = t
                }
            }
            ,
            CVImageElement.prototype.renderInnerContent = function(t) {
                this.failed || this.canvasContext.drawImage(this.img, 0, 0)
            }
            ,
            CVImageElement.prototype.destroy = function() {
                this.img = null
            }
            ,
            extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement),
            CVCompElement.prototype.renderInnerContent = function() {
                var t;
                for (t = this.layers.length - 1; 0 <= t; t -= 1)
                    (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
            }
            ,
            CVCompElement.prototype.destroy = function() {
                var t;
                for (t = this.layers.length - 1; 0 <= t; t -= 1)
                    this.elements[t] && this.elements[t].destroy();
                this.layers = null,
                    this.elements = null
            }
            ,
            CVMaskElement.prototype.renderFrame = function() {
                if (this.hasMasks) {
                    var t, e, i, s, r = this.element.finalTransform.mat, a = this.element.canvasContext, n = this.masksProperties.length;
                    for (a.beginPath(),
                             t = 0; t < n; t++)
                        if ("n" !== this.masksProperties[t].mode) {
                            this.masksProperties[t].inv && (a.moveTo(0, 0),
                                a.lineTo(this.element.globalData.compSize.w, 0),
                                a.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h),
                                a.lineTo(0, this.element.globalData.compSize.h),
                                a.lineTo(0, 0)),
                                s = this.viewData[t].v,
                                e = r.applyToPointArray(s.v[0][0], s.v[0][1], 0),
                                a.moveTo(e[0], e[1]);
                            var o, h = s._length;
                            for (o = 1; o < h; o++)
                                i = r.applyToTriplePoints(s.o[o - 1], s.i[o], s.v[o]),
                                    a.bezierCurveTo(i[0], i[1], i[2], i[3], i[4], i[5]);
                            i = r.applyToTriplePoints(s.o[o - 1], s.i[0], s.v[0]),
                                a.bezierCurveTo(i[0], i[1], i[2], i[3], i[4], i[5])
                        }
                    this.element.globalData.renderer.save(!0),
                        a.clip()
                }
            }
            ,
            CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty,
            CVMaskElement.prototype.destroy = function() {
                this.element = null
            }
            ,
            extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement),
            CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement,
            CVShapeElement.prototype.transformHelper = {
                opacity: 1,
                _opMdf: !1
            },
            CVShapeElement.prototype.dashResetter = [],
            CVShapeElement.prototype.createContent = function() {
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, [])
            }
            ,
            CVShapeElement.prototype.createStyleElement = function(t, e) {
                var i = {
                    data: t,
                    type: t.ty,
                    preTransforms: this.transformsManager.addTransformSequence(e),
                    transforms: [],
                    elements: [],
                    closed: !0 === t.hd
                }
                    , s = {};
                if ("fl" == t.ty || "st" == t.ty ? (s.c = PropertyFactory.getProp(this, t.c, 1, 255, this),
                s.c.k || (i.co = "rgb(" + bm_floor(s.c.v[0]) + "," + bm_floor(s.c.v[1]) + "," + bm_floor(s.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (s.s = PropertyFactory.getProp(this, t.s, 1, null, this),
                    s.e = PropertyFactory.getProp(this, t.e, 1, null, this),
                    s.h = PropertyFactory.getProp(this, t.h || {
                        k: 0
                    }, 0, .01, this),
                    s.a = PropertyFactory.getProp(this, t.a || {
                        k: 0
                    }, 0, degToRads, this),
                    s.g = new GradientProperty(this,t.g,this)),
                    s.o = PropertyFactory.getProp(this, t.o, 0, .01, this),
                "st" == t.ty || "gs" == t.ty) {
                    if (i.lc = this.lcEnum[t.lc] || "round",
                        i.lj = this.ljEnum[t.lj] || "round",
                    1 == t.lj && (i.ml = t.ml),
                        s.w = PropertyFactory.getProp(this, t.w, 0, null, this),
                    s.w.k || (i.wi = s.w.v),
                        t.d) {
                        var r = new DashProperty(this,t.d,"canvas",this);
                        s.d = r,
                        s.d.k || (i.da = s.d.dashArray,
                            i.do = s.d.dashoffset[0])
                    }
                } else
                    i.r = 2 === t.r ? "evenodd" : "nonzero";
                return this.stylesList.push(i),
                    s.style = i,
                    s
            }
            ,
            CVShapeElement.prototype.createGroupElement = function(t) {
                return {
                    it: [],
                    prevViewData: []
                }
            }
            ,
            CVShapeElement.prototype.createTransformElement = function(t) {
                return {
                    transform: {
                        opacity: 1,
                        _opMdf: !1,
                        key: this.transformsManager.getNewKey(),
                        op: PropertyFactory.getProp(this, t.o, 0, .01, this),
                        mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
                    }
                }
            }
            ,
            CVShapeElement.prototype.createShapeElement = function(t) {
                var e = new CVShapeData(this,t,this.stylesList,this.transformsManager);
                return this.shapes.push(e),
                    this.addShapeToModifiers(e),
                    e
            }
            ,
            CVShapeElement.prototype.reloadShapes = function() {
                this._isFirstFrame = !0;
                var t, e = this.itemsData.length;
                for (t = 0; t < e; t += 1)
                    this.prevViewData[t] = this.itemsData[t];
                for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []),
                         e = this.dynamicProperties.length,
                         t = 0; t < e; t += 1)
                    this.dynamicProperties[t].getValue();
                this.renderModifiers(),
                    this.transformsManager.processSequences(this._isFirstFrame)
            }
            ,
            CVShapeElement.prototype.addTransformToStyleList = function(t) {
                var e, i = this.stylesList.length;
                for (e = 0; e < i; e += 1)
                    this.stylesList[e].closed || this.stylesList[e].transforms.push(t)
            }
            ,
            CVShapeElement.prototype.removeTransformFromStyleList = function() {
                var t, e = this.stylesList.length;
                for (t = 0; t < e; t += 1)
                    this.stylesList[t].closed || this.stylesList[t].transforms.pop()
            }
            ,
            CVShapeElement.prototype.closeStyles = function(t) {
                var e, i = t.length;
                for (e = 0; e < i; e += 1)
                    t[e].closed = !0
            }
            ,
            CVShapeElement.prototype.searchShapes = function(t, e, i, s, r) {
                var a, n, o, h, l, p, f = t.length - 1, d = [], m = [], c = [].concat(r);
                for (a = f; 0 <= a; a -= 1) {
                    if ((h = this.searchProcessedElement(t[a])) ? e[a] = i[h - 1] : t[a]._shouldRender = s,
                    "fl" == t[a].ty || "st" == t[a].ty || "gf" == t[a].ty || "gs" == t[a].ty)
                        h ? e[a].style.closed = !1 : e[a] = this.createStyleElement(t[a], c),
                            d.push(e[a].style);
                    else if ("gr" == t[a].ty) {
                        if (h)
                            for (o = e[a].it.length,
                                     n = 0; n < o; n += 1)
                                e[a].prevViewData[n] = e[a].it[n];
                        else
                            e[a] = this.createGroupElement(t[a]);
                        this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, s, c)
                    } else
                        "tr" == t[a].ty ? (h || (p = this.createTransformElement(t[a]),
                            e[a] = p),
                            c.push(e[a]),
                            this.addTransformToStyleList(e[a])) : "sh" == t[a].ty || "rc" == t[a].ty || "el" == t[a].ty || "sr" == t[a].ty ? h || (e[a] = this.createShapeElement(t[a])) : "tm" == t[a].ty || "rd" == t[a].ty ? (h ? (l = e[a]).closed = !1 : ((l = ShapeModifiers.getModifier(t[a].ty)).init(this, t[a]),
                            e[a] = l,
                            this.shapeModifiers.push(l)),
                            m.push(l)) : "rp" == t[a].ty && (h ? (l = e[a]).closed = !0 : (l = ShapeModifiers.getModifier(t[a].ty),
                            (e[a] = l).init(this, t, a, e),
                            this.shapeModifiers.push(l),
                            s = !1),
                            m.push(l));
                    this.addProcessedElement(t[a], a + 1)
                }
                for (this.removeTransformFromStyleList(),
                         this.closeStyles(d),
                         f = m.length,
                         a = 0; a < f; a += 1)
                    m[a].closed = !0
            }
            ,
            CVShapeElement.prototype.renderInnerContent = function() {
                this.transformHelper.opacity = 1,
                    this.transformHelper._opMdf = !1,
                    this.renderModifiers(),
                    this.transformsManager.processSequences(this._isFirstFrame),
                    this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0)
            }
            ,
            CVShapeElement.prototype.renderShapeTransform = function(t, e) {
                (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity,
                    e.opacity *= e.op.v,
                    e._opMdf = !0)
            }
            ,
            CVShapeElement.prototype.drawLayer = function() {
                var t, e, i, s, r, a, n, o, h, l = this.stylesList.length, p = this.globalData.renderer, f = this.globalData.canvasContext;
                for (t = 0; t < l; t += 1)
                    if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
                        for (p.save(),
                                 a = h.elements,
                                 "st" === o || "gs" === o ? (f.strokeStyle = "st" === o ? h.co : h.grd,
                                     f.lineWidth = h.wi,
                                     f.lineCap = h.lc,
                                     f.lineJoin = h.lj,
                                     f.miterLimit = h.ml || 0) : f.fillStyle = "fl" === o ? h.co : h.grd,
                                 p.ctxOpacity(h.coOp),
                             "st" !== o && "gs" !== o && f.beginPath(),
                                 p.ctxTransform(h.preTransforms.finalTransform.props),
                                 i = a.length,
                                 e = 0; e < i; e += 1) {
                            for ("st" !== o && "gs" !== o || (f.beginPath(),
                            h.da && (f.setLineDash(h.da),
                                f.lineDashOffset = h.do)),
                                     r = (n = a[e].trNodes).length,
                                     s = 0; s < r; s += 1)
                                "m" == n[s].t ? f.moveTo(n[s].p[0], n[s].p[1]) : "c" == n[s].t ? f.bezierCurveTo(n[s].pts[0], n[s].pts[1], n[s].pts[2], n[s].pts[3], n[s].pts[4], n[s].pts[5]) : f.closePath();
                            "st" !== o && "gs" !== o || (f.stroke(),
                            h.da && f.setLineDash(this.dashResetter))
                        }
                        "st" !== o && "gs" !== o && f.fill(h.r),
                            p.restore()
                    }
            }
            ,
            CVShapeElement.prototype.renderShape = function(t, e, i, s) {
                var r, a;
                for (a = t,
                         r = e.length - 1; 0 <= r; r -= 1)
                    "tr" == e[r].ty ? (a = i[r].transform,
                        this.renderShapeTransform(t, a)) : "sh" == e[r].ty || "el" == e[r].ty || "rc" == e[r].ty || "sr" == e[r].ty ? this.renderPath(e[r], i[r]) : "fl" == e[r].ty ? this.renderFill(e[r], i[r], a) : "st" == e[r].ty ? this.renderStroke(e[r], i[r], a) : "gf" == e[r].ty || "gs" == e[r].ty ? this.renderGradientFill(e[r], i[r], a) : "gr" == e[r].ty ? this.renderShape(a, e[r].it, i[r].it) : e[r].ty;
                s && this.drawLayer()
            }
            ,
            CVShapeElement.prototype.renderStyledShape = function(t, e) {
                if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
                    var i, s, r, a = t.trNodes, n = e.paths, o = n._length;
                    a.length = 0;
                    var h = t.transforms.finalTransform;
                    for (r = 0; r < o; r += 1) {
                        var l = n.shapes[r];
                        if (l && l.v) {
                            for (s = l._length,
                                     i = 1; i < s; i += 1)
                                1 === i && a.push({
                                    t: "m",
                                    p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                                }),
                                    a.push({
                                        t: "c",
                                        pts: h.applyToTriplePoints(l.o[i - 1], l.i[i], l.v[i])
                                    });
                            1 === s && a.push({
                                t: "m",
                                p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                            }),
                            l.c && s && (a.push({
                                t: "c",
                                pts: h.applyToTriplePoints(l.o[i - 1], l.i[0], l.v[0])
                            }),
                                a.push({
                                    t: "z"
                                }))
                        }
                    }
                    t.trNodes = a
                }
            }
            ,
            CVShapeElement.prototype.renderPath = function(t, e) {
                if (!0 !== t.hd && t._shouldRender) {
                    var i, s = e.styledShapes.length;
                    for (i = 0; i < s; i += 1)
                        this.renderStyledShape(e.styledShapes[i], e.sh)
                }
            }
            ,
            CVShapeElement.prototype.renderFill = function(t, e, i) {
                var s = e.style;
                (e.c._mdf || this._isFirstFrame) && (s.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"),
                (e.o._mdf || i._opMdf || this._isFirstFrame) && (s.coOp = e.o.v * i.opacity)
            }
            ,
            CVShapeElement.prototype.renderGradientFill = function(t, e, i) {
                var s = e.style;
                if (!s.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
                    var r = this.globalData.canvasContext
                        , a = e.s.v
                        , n = e.e.v;
                    if (1 === t.t)
                        d = r.createLinearGradient(a[0], a[1], n[0], n[1]);
                    else
                        var o = Math.sqrt(Math.pow(a[0] - n[0], 2) + Math.pow(a[1] - n[1], 2))
                            , h = Math.atan2(n[1] - a[1], n[0] - a[0])
                            , l = o * (1 <= e.h.v ? .99 : e.h.v <= -1 ? -.99 : e.h.v)
                            , p = Math.cos(h + e.a.v) * l + a[0]
                            , f = Math.sin(h + e.a.v) * l + a[1]
                            , d = r.createRadialGradient(p, f, 0, a[0], a[1], o);
                    var m, c = t.g.p, u = e.g.c, y = 1;
                    for (m = 0; m < c; m += 1)
                        e.g._hasOpacity && e.g._collapsable && (y = e.g.o[2 * m + 1]),
                            d.addColorStop(u[4 * m] / 100, "rgba(" + u[4 * m + 1] + "," + u[4 * m + 2] + "," + u[4 * m + 3] + "," + y + ")");
                    s.grd = d
                }
                s.coOp = e.o.v * i.opacity
            }
            ,
            CVShapeElement.prototype.renderStroke = function(t, e, i) {
                var s = e.style
                    , r = e.d;
                r && (r._mdf || this._isFirstFrame) && (s.da = r.dashArray,
                    s.do = r.dashoffset[0]),
                (e.c._mdf || this._isFirstFrame) && (s.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"),
                (e.o._mdf || i._opMdf || this._isFirstFrame) && (s.coOp = e.o.v * i.opacity),
                (e.w._mdf || this._isFirstFrame) && (s.wi = e.w.v)
            }
            ,
            CVShapeElement.prototype.destroy = function() {
                this.shapesData = null,
                    this.globalData = null,
                    this.canvasContext = null,
                    this.stylesList.length = 0,
                    this.itemsData.length = 0
            }
            ,
            extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement),
            CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement,
            CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame,
            CVSolidElement.prototype.renderInnerContent = function() {
                var t = this.canvasContext;
                t.fillStyle = this.data.sc,
                    t.fillRect(0, 0, this.data.sw, this.data.sh)
            }
            ,
            extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement),
            CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"),
            CVTextElement.prototype.buildNewText = function() {
                var t = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
                var e = !1;
                t.fc ? (e = !0,
                    this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)",
                    this.fill = e;
                var i = !1;
                t.sc && (i = !0,
                    this.values.stroke = this.buildColor(t.sc),
                    this.values.sWidth = t.sw);
                var s, r, a = this.globalData.fontManager.getFontByName(t.f), n = t.l, o = this.mHelper;
                this.stroke = i,
                    this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily,
                    r = t.finalText.length;
                var h, l, p, f, d, m, c, u, y, g, v = this.data.singleShape, _ = t.tr / 1e3 * t.finalSize, b = 0, x = 0, S = !0, E = 0;
                for (s = 0; s < r; s += 1) {
                    for (l = (h = this.globalData.fontManager.getCharData(t.finalText[s], a.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && h.data || {},
                             o.reset(),
                         v && n[s].n && (b = -_,
                             x += t.yOffset,
                             x += S ? 1 : 0,
                             S = !1),
                             c = (d = l.shapes ? l.shapes[0].it : []).length,
                             o.scale(t.finalSize / 100, t.finalSize / 100),
                         v && this.applyTextPropertiesToMatrix(t, o, n[s].line, b, x),
                             y = createSizedArray(c),
                             m = 0; m < c; m += 1) {
                        for (f = d[m].ks.k.i.length,
                                 u = d[m].ks.k,
                                 g = [],
                                 p = 1; p < f; p += 1)
                            1 == p && g.push(o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)),
                                g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[p][0], u.i[p][1], 0), o.applyToY(u.i[p][0], u.i[p][1], 0), o.applyToX(u.v[p][0], u.v[p][1], 0), o.applyToY(u.v[p][0], u.v[p][1], 0));
                        g.push(o.applyToX(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToY(u.o[p - 1][0], u.o[p - 1][1], 0), o.applyToX(u.i[0][0], u.i[0][1], 0), o.applyToY(u.i[0][0], u.i[0][1], 0), o.applyToX(u.v[0][0], u.v[0][1], 0), o.applyToY(u.v[0][0], u.v[0][1], 0)),
                            y[m] = g
                    }
                    v && (b += n[s].l,
                        b += _),
                        this.textSpans[E] ? this.textSpans[E].elem = y : this.textSpans[E] = {
                            elem: y
                        },
                        E += 1
                }
            }
            ,
            CVTextElement.prototype.renderInnerContent = function() {
                var t, e, i, s, r, a, n = this.canvasContext;
                this.finalTransform.mat.props,
                    n.font = this.values.fValue,
                    n.lineCap = "butt",
                    n.lineJoin = "miter",
                    n.miterLimit = 4,
                this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
                var o, h = this.textAnimator.renderedLetters, l = this.textProperty.currentData.l;
                e = l.length;
                var p, f, d = null, m = null, c = null;
                for (t = 0; t < e; t += 1)
                    if (!l[t].n) {
                        if ((o = h[t]) && (this.globalData.renderer.save(),
                            this.globalData.renderer.ctxTransform(o.p),
                            this.globalData.renderer.ctxOpacity(o.o)),
                            this.fill) {
                            for (o && o.fc ? d !== o.fc && (d = o.fc,
                                n.fillStyle = o.fc) : d !== this.values.fill && (d = this.values.fill,
                                n.fillStyle = this.values.fill),
                                     s = (p = this.textSpans[t].elem).length,
                                     this.globalData.canvasContext.beginPath(),
                                     i = 0; i < s; i += 1)
                                for (a = (f = p[i]).length,
                                         this.globalData.canvasContext.moveTo(f[0], f[1]),
                                         r = 2; r < a; r += 6)
                                    this.globalData.canvasContext.bezierCurveTo(f[r], f[r + 1], f[r + 2], f[r + 3], f[r + 4], f[r + 5]);
                            this.globalData.canvasContext.closePath(),
                                this.globalData.canvasContext.fill()
                        }
                        if (this.stroke) {
                            for (o && o.sw ? c !== o.sw && (c = o.sw,
                                n.lineWidth = o.sw) : c !== this.values.sWidth && (c = this.values.sWidth,
                                n.lineWidth = this.values.sWidth),
                                     o && o.sc ? m !== o.sc && (m = o.sc,
                                         n.strokeStyle = o.sc) : m !== this.values.stroke && (m = this.values.stroke,
                                         n.strokeStyle = this.values.stroke),
                                     s = (p = this.textSpans[t].elem).length,
                                     this.globalData.canvasContext.beginPath(),
                                     i = 0; i < s; i += 1)
                                for (a = (f = p[i]).length,
                                         this.globalData.canvasContext.moveTo(f[0], f[1]),
                                         r = 2; r < a; r += 6)
                                    this.globalData.canvasContext.bezierCurveTo(f[r], f[r + 1], f[r + 2], f[r + 3], f[r + 4], f[r + 5]);
                            this.globalData.canvasContext.closePath(),
                                this.globalData.canvasContext.stroke()
                        }
                        o && this.globalData.renderer.restore()
                    }
            }
            ,
            CVEffects.prototype.renderFrame = function() {}
            ,
            HBaseElement.prototype = {
                checkBlendMode: function() {},
                initRendererElement: function() {
                    this.baseElement = createTag(this.data.tg || "div"),
                        this.data.hasMask ? (this.svgElement = createNS("svg"),
                            this.layerElement = createNS("g"),
                            this.maskedElement = this.layerElement,
                            this.svgElement.appendChild(this.layerElement),
                            this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement,
                        styleDiv(this.baseElement)
                },
                createContainerElements: function() {
                    this.renderableEffectsManager = new CVEffects(this),
                        this.transformedElement = this.baseElement,
                        this.maskedElement = this.layerElement,
                    this.data.ln && this.layerElement.setAttribute("id", this.data.ln),
                    this.data.cl && this.layerElement.setAttribute("class", this.data.cl),
                    0 !== this.data.bm && this.setBlendMode()
                },
                renderElement: function() {
                    this.finalTransform._matMdf && (this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = this.finalTransform.mat.toCSS()),
                    this.finalTransform._opMdf && (this.transformedElement.style.opacity = this.finalTransform.mProp.o.v)
                },
                renderFrame: function() {
                    this.data.hd || this.hidden || (this.renderTransform(),
                        this.renderRenderable(),
                        this.renderElement(),
                        this.renderInnerContent(),
                    this._isFirstFrame && (this._isFirstFrame = !1))
                },
                destroy: function() {
                    this.layerElement = null,
                        this.transformedElement = null,
                    this.matteElement && (this.matteElement = null),
                    this.maskManager && (this.maskManager.destroy(),
                        this.maskManager = null)
                },
                createRenderableComponents: function() {
                    this.maskManager = new MaskElement(this.data,this,this.globalData)
                },
                addEffects: function() {},
                setMatte: function() {}
            },
            HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement,
            HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy,
            HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting,
            extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement),
            HSolidElement.prototype.createContent = function() {
                var t;
                this.data.hasMask ? ((t = createNS("rect")).setAttribute("width", this.data.sw),
                    t.setAttribute("height", this.data.sh),
                    t.setAttribute("fill", this.data.sc),
                    this.svgElement.setAttribute("width", this.data.sw),
                    this.svgElement.setAttribute("height", this.data.sh)) : ((t = createTag("div")).style.width = this.data.sw + "px",
                    t.style.height = this.data.sh + "px",
                    t.style.backgroundColor = this.data.sc),
                    this.layerElement.appendChild(t)
            }
            ,
            extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement),
            HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements,
            HCompElement.prototype.createContainerElements = function() {
                this._createBaseContainerElements(),
                    this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w),
                        this.svgElement.setAttribute("height", this.data.h),
                        this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement
            }
            ,
            HCompElement.prototype.addTo3dContainer = function(t, e) {
                for (var i, s = 0; s < e; )
                    this.elements[s] && this.elements[s].getBaseElement && (i = this.elements[s].getBaseElement()),
                        s += 1;
                i ? this.layerElement.insertBefore(t, i) : this.layerElement.appendChild(t)
            }
            ,
            extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement),
            HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent,
            HShapeElement.prototype.createContent = function() {
                var t;
                if (this.baseElement.style.fontSize = 0,
                    this.data.hasMask)
                    this.layerElement.appendChild(this.shapesContainer),
                        t = this.svgElement;
                else {
                    t = createNS("svg");
                    var e = this.comp.data ? this.comp.data : this.globalData.compSize;
                    t.setAttribute("width", e.w),
                        t.setAttribute("height", e.h),
                        t.appendChild(this.shapesContainer),
                        this.layerElement.appendChild(t)
                }
                this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0),
                    this.filterUniqueShapes(),
                    this.shapeCont = t
            }
            ,
            HShapeElement.prototype.getTransformedPoint = function(t, e) {
                var i, s = t.length;
                for (i = 0; i < s; i += 1)
                    e = t[i].mProps.v.applyToPointArray(e[0], e[1], 0);
                return e
            }
            ,
            HShapeElement.prototype.calculateShapeBoundingBox = function(t, e) {
                var i, s, r, a, n, o = t.sh.v, h = t.transformers, l = o._length;
                if (!(l <= 1)) {
                    for (i = 0; i < l - 1; i += 1)
                        s = this.getTransformedPoint(h, o.v[i]),
                            r = this.getTransformedPoint(h, o.o[i]),
                            a = this.getTransformedPoint(h, o.i[i + 1]),
                            n = this.getTransformedPoint(h, o.v[i + 1]),
                            this.checkBounds(s, r, a, n, e);
                    o.c && (s = this.getTransformedPoint(h, o.v[i]),
                        r = this.getTransformedPoint(h, o.o[i]),
                        a = this.getTransformedPoint(h, o.i[0]),
                        n = this.getTransformedPoint(h, o.v[0]),
                        this.checkBounds(s, r, a, n, e))
                }
            }
            ,
            HShapeElement.prototype.checkBounds = function(t, e, i, s, r) {
                this.getBoundsOfCurve(t, e, i, s);
                var a = this.shapeBoundingBox;
                r.x = bm_min(a.left, r.x),
                    r.xMax = bm_max(a.right, r.xMax),
                    r.y = bm_min(a.top, r.y),
                    r.yMax = bm_max(a.bottom, r.yMax)
            }
            ,
            HShapeElement.prototype.shapeBoundingBox = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            HShapeElement.prototype.tempBoundingBox = {
                x: 0,
                xMax: 0,
                y: 0,
                yMax: 0,
                width: 0,
                height: 0
            },
            HShapeElement.prototype.getBoundsOfCurve = function(t, e, i, s) {
                for (var r, a, n, o, h, l, p, f = [[t[0], s[0]], [t[1], s[1]]], d = 0; d < 2; ++d)
                    if (a = 6 * t[d] - 12 * e[d] + 6 * i[d],
                        r = -3 * t[d] + 9 * e[d] - 9 * i[d] + 3 * s[d],
                        n = 3 * e[d] - 3 * t[d],
                        a |= 0,
                        n |= 0,
                    0 != (r |= 0))
                        (h = a * a - 4 * n * r) < 0 || (0 < (l = (-a + bm_sqrt(h)) / (2 * r)) && l < 1 && f[d].push(this.calculateF(l, t, e, i, s, d)),
                        0 < (p = (-a - bm_sqrt(h)) / (2 * r)) && p < 1 && f[d].push(this.calculateF(p, t, e, i, s, d)));
                    else {
                        if (0 === a)
                            continue;
                        0 < (o = -n / a) && o < 1 && f[d].push(this.calculateF(o, t, e, i, s, d))
                    }
                this.shapeBoundingBox.left = bm_min.apply(null, f[0]),
                    this.shapeBoundingBox.top = bm_min.apply(null, f[1]),
                    this.shapeBoundingBox.right = bm_max.apply(null, f[0]),
                    this.shapeBoundingBox.bottom = bm_max.apply(null, f[1])
            }
            ,
            HShapeElement.prototype.calculateF = function(t, e, i, s, r, a) {
                return bm_pow(1 - t, 3) * e[a] + 3 * bm_pow(1 - t, 2) * t * i[a] + 3 * (1 - t) * bm_pow(t, 2) * s[a] + bm_pow(t, 3) * r[a]
            }
            ,
            HShapeElement.prototype.calculateBoundingBox = function(t, e) {
                var i, s = t.length;
                for (i = 0; i < s; i += 1)
                    t[i] && t[i].sh ? this.calculateShapeBoundingBox(t[i], e) : t[i] && t[i].it && this.calculateBoundingBox(t[i].it, e)
            }
            ,
            HShapeElement.prototype.currentBoxContains = function(t) {
                return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height
            }
            ,
            HShapeElement.prototype.renderInnerContent = function() {
                if (this._renderShapeFrame(),
                !this.hidden && (this._isFirstFrame || this._mdf)) {
                    var t = this.tempBoundingBox
                        , e = 999999;
                    if (t.x = e,
                        t.xMax = -e,
                        t.y = e,
                        t.yMax = -e,
                        this.calculateBoundingBox(this.itemsData, t),
                        t.width = t.xMax < t.x ? 0 : t.xMax - t.x,
                        t.height = t.yMax < t.y ? 0 : t.yMax - t.y,
                        this.currentBoxContains(t))
                        return;
                    var i = !1;
                    this.currentBBox.w !== t.width && (this.currentBBox.w = t.width,
                        this.shapeCont.setAttribute("width", t.width),
                        i = !0),
                    this.currentBBox.h !== t.height && (this.currentBBox.h = t.height,
                        this.shapeCont.setAttribute("height", t.height),
                        i = !0),
                    (i || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) && (this.currentBBox.w = t.width,
                        this.currentBBox.h = t.height,
                        this.currentBBox.x = t.x,
                        this.currentBBox.y = t.y,
                        this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h),
                        this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
                }
            }
            ,
            extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement),
            HTextElement.prototype.createContent = function() {
                if (this.isMasked = this.checkMasks(),
                    this.isMasked) {
                    this.renderType = "svg",
                        this.compW = this.comp.data.w,
                        this.compH = this.comp.data.h,
                        this.svgElement.setAttribute("width", this.compW),
                        this.svgElement.setAttribute("height", this.compH);
                    var t = createNS("g");
                    this.maskedElement.appendChild(t),
                        this.innerElem = t
                } else
                    this.renderType = "html",
                        this.innerElem = this.layerElement;
                this.checkParenting()
            }
            ,
            HTextElement.prototype.buildNewText = function() {
                var t = this.textProperty.currentData;
                this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
                var e = this.innerElem.style;
                e.color = e.fill = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)",
                t.sc && (e.stroke = this.buildColor(t.sc),
                    e.strokeWidth = t.sw + "px");
                var i, s, r = this.globalData.fontManager.getFontByName(t.f);
                if (!this.globalData.fontManager.chars)
                    if (e.fontSize = t.finalSize + "px",
                        e.lineHeight = t.finalSize + "px",
                        r.fClass)
                        this.innerElem.className = r.fClass;
                    else {
                        e.fontFamily = r.fFamily;
                        var a = t.fWeight
                            , n = t.fStyle;
                        e.fontStyle = n,
                            e.fontWeight = a
                    }
                var o, h, l, p = t.l;
                s = p.length;
                var f, d = this.mHelper, m = "", c = 0;
                for (i = 0; i < s; i += 1) {
                    if (this.globalData.fontManager.chars ? (this.textPaths[c] ? o = this.textPaths[c] : ((o = createNS("path")).setAttribute("stroke-linecap", "butt"),
                        o.setAttribute("stroke-linejoin", "round"),
                        o.setAttribute("stroke-miterlimit", "4")),
                    this.isMasked || (this.textSpans[c] ? l = (h = this.textSpans[c]).children[0] : ((h = createTag("div")).style.lineHeight = 0,
                        (l = createNS("svg")).appendChild(o),
                        styleDiv(h)))) : this.isMasked ? o = this.textPaths[c] ? this.textPaths[c] : createNS("text") : this.textSpans[c] ? (h = this.textSpans[c],
                        o = this.textPaths[c]) : (styleDiv(h = createTag("span")),
                        styleDiv(o = createTag("span")),
                        h.appendChild(o)),
                        this.globalData.fontManager.chars) {
                        var u, y = this.globalData.fontManager.getCharData(t.finalText[i], r.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
                        if (u = y ? y.data : null,
                            d.reset(),
                        u && u.shapes && (f = u.shapes[0].it,
                            d.scale(t.finalSize / 100, t.finalSize / 100),
                            m = this.createPathShape(d, f),
                            o.setAttribute("d", m)),
                            this.isMasked)
                            this.innerElem.appendChild(o);
                        else {
                            if (this.innerElem.appendChild(h),
                            u && u.shapes) {
                                document.body.appendChild(l);
                                var g = l.getBBox();
                                l.setAttribute("width", g.width + 2),
                                    l.setAttribute("height", g.height + 2),
                                    l.setAttribute("viewBox", g.x - 1 + " " + (g.y - 1) + " " + (g.width + 2) + " " + (g.height + 2)),
                                    l.style.transform = l.style.webkitTransform = "translate(" + (g.x - 1) + "px," + (g.y - 1) + "px)",
                                    p[i].yOffset = g.y - 1
                            } else
                                l.setAttribute("width", 1),
                                    l.setAttribute("height", 1);
                            h.appendChild(l)
                        }
                    } else
                        o.textContent = p[i].val,
                            o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"),
                            this.isMasked ? this.innerElem.appendChild(o) : (this.innerElem.appendChild(h),
                                o.style.transform = o.style.webkitTransform = "translate3d(0," + -t.finalSize / 1.2 + "px,0)");
                    this.isMasked ? this.textSpans[c] = o : this.textSpans[c] = h,
                        this.textSpans[c].style.display = "block",
                        this.textPaths[c] = o,
                        c += 1
                }
                for (; c < this.textSpans.length; )
                    this.textSpans[c].style.display = "none",
                        c += 1
            }
            ,
            HTextElement.prototype.renderInnerContent = function() {
                if (this.data.singleShape) {
                    if (!this._isFirstFrame && !this.lettersChangedFlag)
                        return;
                    this.isMasked && this.finalTransform._matMdf && (this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH),
                        this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)")
                }
                if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag),
                this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
                    var t, e, i, s, r, a = 0, n = this.textAnimator.renderedLetters, o = this.textProperty.currentData.l;
                    for (e = o.length,
                             t = 0; t < e; t += 1)
                        o[t].n ? a += 1 : (s = this.textSpans[t],
                            r = this.textPaths[t],
                            i = n[a],
                            a += 1,
                        i._mdf.m && (this.isMasked ? s.setAttribute("transform", i.m) : s.style.transform = s.style.webkitTransform = i.m),
                            s.style.opacity = i.o,
                        i.sw && i._mdf.sw && r.setAttribute("stroke-width", i.sw),
                        i.sc && i._mdf.sc && r.setAttribute("stroke", i.sc),
                        i.fc && i._mdf.fc && (r.setAttribute("fill", i.fc),
                            r.style.color = i.fc));
                    if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
                        var h = this.innerElem.getBBox();
                        this.currentBBox.w !== h.width && (this.currentBBox.w = h.width,
                            this.svgElement.setAttribute("width", h.width)),
                        this.currentBBox.h !== h.height && (this.currentBBox.h = h.height,
                            this.svgElement.setAttribute("height", h.height)),
                        this.currentBBox.w === h.width + 2 && this.currentBBox.h === h.height + 2 && this.currentBBox.x === h.x - 1 && this.currentBBox.y === h.y - 1 || (this.currentBBox.w = h.width + 2,
                            this.currentBBox.h = h.height + 2,
                            this.currentBBox.x = h.x - 1,
                            this.currentBBox.y = h.y - 1,
                            this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h),
                            this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
                    }
                }
            }
            ,
            extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement),
            HImageElement.prototype.createContent = function() {
                var t = this.globalData.getAssetsPath(this.assetData)
                    , e = new Image;
                this.data.hasMask ? (this.imageElem = createNS("image"),
                    this.imageElem.setAttribute("width", this.assetData.w + "px"),
                    this.imageElem.setAttribute("height", this.assetData.h + "px"),
                    this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t),
                    this.layerElement.appendChild(this.imageElem),
                    this.baseElement.setAttribute("width", this.assetData.w),
                    this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e),
                    e.src = t,
                this.data.ln && this.baseElement.setAttribute("id", this.data.ln)
            }
            ,
            extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement),
            HCameraElement.prototype.setup = function() {
                var t, e, i = this.comp.threeDElements.length;
                for (t = 0; t < i; t += 1)
                    "3d" === (e = this.comp.threeDElements[t]).type && (e.perspectiveElem.style.perspective = e.perspectiveElem.style.webkitPerspective = this.pe.v + "px",
                        e.container.style.transformOrigin = e.container.style.mozTransformOrigin = e.container.style.webkitTransformOrigin = "0px 0px 0px",
                        e.perspectiveElem.style.transform = e.perspectiveElem.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)")
            }
            ,
            HCameraElement.prototype.createElements = function() {}
            ,
            HCameraElement.prototype.hide = function() {}
            ,
            HCameraElement.prototype.renderFrame = function() {
                var t, e, i = this._isFirstFrame;
                if (this.hierarchy)
                    for (e = this.hierarchy.length,
                             t = 0; t < e; t += 1)
                        i = this.hierarchy[t].finalTransform.mProp._mdf || i;
                if (i || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
                    if (this.mat.reset(),
                        this.hierarchy)
                        for (t = e = this.hierarchy.length - 1; 0 <= t; t -= 1) {
                            var s = this.hierarchy[t].finalTransform.mProp;
                            this.mat.translate(-s.p.v[0], -s.p.v[1], s.p.v[2]),
                                this.mat.rotateX(-s.or.v[0]).rotateY(-s.or.v[1]).rotateZ(s.or.v[2]),
                                this.mat.rotateX(-s.rx.v).rotateY(-s.ry.v).rotateZ(s.rz.v),
                                this.mat.scale(1 / s.s.v[0], 1 / s.s.v[1], 1 / s.s.v[2]),
                                this.mat.translate(s.a.v[0], s.a.v[1], s.a.v[2])
                        }
                    if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v),
                        this.a) {
                        var r = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]]
                            , a = Math.sqrt(Math.pow(r[0], 2) + Math.pow(r[1], 2) + Math.pow(r[2], 2))
                            , n = [r[0] / a, r[1] / a, r[2] / a]
                            , o = Math.sqrt(n[2] * n[2] + n[0] * n[0])
                            , h = Math.atan2(n[1], o)
                            , l = Math.atan2(n[0], -n[2]);
                        this.mat.rotateY(l).rotateX(-h)
                    }
                    this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v),
                        this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]),
                        this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0),
                        this.mat.translate(0, 0, this.pe.v);
                    var p = !this._prevMat.equals(this.mat);
                    if ((p || this.pe._mdf) && this.comp.threeDElements) {
                        var f;
                        for (e = this.comp.threeDElements.length,
                                 t = 0; t < e; t += 1)
                            "3d" === (f = this.comp.threeDElements[t]).type && (p && (f.container.style.transform = f.container.style.webkitTransform = this.mat.toCSS()),
                            this.pe._mdf && (f.perspectiveElem.style.perspective = f.perspectiveElem.style.webkitPerspective = this.pe.v + "px"));
                        this.mat.clone(this._prevMat)
                    }
                }
                this._isFirstFrame = !1
            }
            ,
            HCameraElement.prototype.prepareFrame = function(t) {
                this.prepareProperties(t, !0)
            }
            ,
            HCameraElement.prototype.destroy = function() {}
            ,
            HCameraElement.prototype.getBaseElement = function() {
                return null
            }
            ,
            HEffects.prototype.renderFrame = function() {}
        ;
        var animationManager = function() {
            var t = {}
                , e = []
                , i = 0
                , s = 0
                , r = 0
                , a = !0
                , n = !1;
            function o(t) {
                for (var i = 0, r = t.target; i < s; )
                    e[i].animation === r && (e.splice(i, 1),
                        i -= 1,
                        s -= 1,
                    r.isPaused || p()),
                        i += 1
            }
            function h(t, i) {
                if (!t)
                    return null;
                for (var r = 0; r < s; ) {
                    if (e[r].elem == t && null !== e[r].elem)
                        return e[r].animation;
                    r += 1
                }
                var a = new AnimationItem;
                return f(a, t),
                    a.setData(t, i),
                    a
            }
            function l() {
                r += 1,
                    c()
            }
            function p() {
                r -= 1
            }
            function f(t, i) {
                t.addEventListener("destroy", o),
                    t.addEventListener("_active", l),
                    t.addEventListener("_idle", p),
                    e.push({
                        elem: i,
                        animation: t
                    }),
                    s += 1
            }
            function d(t) {
                var o, h = t - i;
                for (o = 0; o < s; o += 1)
                    e[o].animation.advanceTime(h);
                i = t,
                    r && !n ? window.requestAnimationFrame(d) : a = !0
            }
            function m(t) {
                i = t,
                    window.requestAnimationFrame(d)
            }
            function c() {
                !n && r && a && (window.requestAnimationFrame(m),
                    a = !1)
            }
            return t.registerAnimation = h,
                t.loadAnimation = function(t) {
                    var e = new AnimationItem;
                    return f(e, null),
                        e.setParams(t),
                        e
                }
                ,
                t.setSpeed = function(t, i) {
                    var r;
                    for (r = 0; r < s; r += 1)
                        e[r].animation.setSpeed(t, i)
                }
                ,
                t.setDirection = function(t, i) {
                    var r;
                    for (r = 0; r < s; r += 1)
                        e[r].animation.setDirection(t, i)
                }
                ,
                t.play = function(t) {
                    var i;
                    for (i = 0; i < s; i += 1)
                        e[i].animation.play(t)
                }
                ,
                t.pause = function(t) {
                    var i;
                    for (i = 0; i < s; i += 1)
                        e[i].animation.pause(t)
                }
                ,
                t.stop = function(t) {
                    var i;
                    for (i = 0; i < s; i += 1)
                        e[i].animation.stop(t)
                }
                ,
                t.togglePause = function(t) {
                    var i;
                    for (i = 0; i < s; i += 1)
                        e[i].animation.togglePause(t)
                }
                ,
                t.searchAnimations = function(t, e, i) {
                    var s, r = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))), a = r.length;
                    for (s = 0; s < a; s += 1)
                        i && r[s].setAttribute("data-bm-type", i),
                            h(r[s], t);
                    if (e && 0 === a) {
                        i || (i = "svg");
                        var n = document.getElementsByTagName("body")[0];
                        n.innerHTML = "";
                        var o = createTag("div");
                        o.style.width = "100%",
                            o.style.height = "100%",
                            o.setAttribute("data-bm-type", i),
                            n.appendChild(o),
                            h(o, t)
                    }
                }
                ,
                t.resize = function() {
                    var t;
                    for (t = 0; t < s; t += 1)
                        e[t].animation.resize()
                }
                ,
                t.goToAndStop = function(t, i, r) {
                    var a;
                    for (a = 0; a < s; a += 1)
                        e[a].animation.goToAndStop(t, i, r)
                }
                ,
                t.destroy = function(t) {
                    var i;
                    for (i = s - 1; 0 <= i; i -= 1)
                        e[i].animation.destroy(t)
                }
                ,
                t.freeze = function() {
                    n = !0
                }
                ,
                t.unfreeze = function() {
                    n = !1,
                        c()
                }
                ,
                t.getRegisteredAnimations = function() {
                    var t, i = e.length, s = [];
                    for (t = 0; t < i; t += 1)
                        s.push(e[t].animation);
                    return s
                }
                ,
                t
        }()
            , AnimationItem = function() {
            this._cbs = [],
                this.name = "",
                this.path = "",
                this.isLoaded = !1,
                this.currentFrame = 0,
                this.currentRawFrame = 0,
                this.totalFrames = 0,
                this.frameRate = 0,
                this.frameMult = 0,
                this.playSpeed = 1,
                this.playDirection = 1,
                this.playCount = 0,
                this.animationData = {},
                this.assets = [],
                this.isPaused = !0,
                this.autoplay = !1,
                this.loop = !0,
                this.renderer = null,
                this.animationID = createElementID(),
                this.assetsPath = "",
                this.timeCompleted = 0,
                this.segmentPos = 0,
                this.subframeEnabled = subframeEnabled,
                this.segments = [],
                this._idle = !0,
                this._completedLoop = !1,
                this.projectInterface = ProjectInterface(),
                this.imagePreloader = new ImagePreloader
        };
        extendPrototype([BaseEvent], AnimationItem),
            AnimationItem.prototype.setParams = function(t) {
                t.context && (this.context = t.context),
                (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
                var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";
                switch (e) {
                    case "canvas":
                        this.renderer = new CanvasRenderer(this,t.rendererSettings);
                        break;
                    case "svg":
                        this.renderer = new SVGRenderer(this,t.rendererSettings);
                        break;
                    default:
                        this.renderer = new HybridRenderer(this,t.rendererSettings)
                }
                this.renderer.setProjectInterface(this.projectInterface),
                    this.animType = e,
                "" === t.loop || null === t.loop || (!1 === t.loop ? this.loop = !1 : !0 === t.loop ? this.loop = !0 : this.loop = parseInt(t.loop)),
                    this.autoplay = !("autoplay"in t) || t.autoplay,
                    this.name = t.name ? t.name : "",
                    this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments,
                    this.assetsPath = t.assetsPath,
                    t.animationData ? this.configAnimation(t.animationData) : t.path && ("json" != t.path.substr(-4) && ("/" != t.path.substr(-1, 1) && (t.path += "/"),
                        t.path += "data.json"),
                        -1 != t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1),
                        this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1),
                        this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")),
                        assetLoader.load(t.path, this.configAnimation.bind(this), function() {
                            this.trigger("data_failed")
                        }
                            .bind(this)))
            }
            ,
            AnimationItem.prototype.setData = function(t, e) {
                var i = {
                    wrapper: t,
                    animationData: e ? "object" == typeof e ? e : JSON.parse(e) : null
                }
                    , s = t.attributes;
                i.path = s.getNamedItem("data-animation-path") ? s.getNamedItem("data-animation-path").value : s.getNamedItem("data-bm-path") ? s.getNamedItem("data-bm-path").value : s.getNamedItem("bm-path") ? s.getNamedItem("bm-path").value : "",
                    i.animType = s.getNamedItem("data-anim-type") ? s.getNamedItem("data-anim-type").value : s.getNamedItem("data-bm-type") ? s.getNamedItem("data-bm-type").value : s.getNamedItem("bm-type") ? s.getNamedItem("bm-type").value : s.getNamedItem("data-bm-renderer") ? s.getNamedItem("data-bm-renderer").value : s.getNamedItem("bm-renderer") ? s.getNamedItem("bm-renderer").value : "canvas";
                var r = s.getNamedItem("data-anim-loop") ? s.getNamedItem("data-anim-loop").value : s.getNamedItem("data-bm-loop") ? s.getNamedItem("data-bm-loop").value : s.getNamedItem("bm-loop") ? s.getNamedItem("bm-loop").value : "";
                "" === r || (i.loop = "false" !== r && ("true" === r || parseInt(r)));
                var a = s.getNamedItem("data-anim-autoplay") ? s.getNamedItem("data-anim-autoplay").value : s.getNamedItem("data-bm-autoplay") ? s.getNamedItem("data-bm-autoplay").value : !s.getNamedItem("bm-autoplay") || s.getNamedItem("bm-autoplay").value;
                i.autoplay = "false" !== a,
                    i.name = s.getNamedItem("data-name") ? s.getNamedItem("data-name").value : s.getNamedItem("data-bm-name") ? s.getNamedItem("data-bm-name").value : s.getNamedItem("bm-name") ? s.getNamedItem("bm-name").value : "",
                "false" === (s.getNamedItem("data-anim-prerender") ? s.getNamedItem("data-anim-prerender").value : s.getNamedItem("data-bm-prerender") ? s.getNamedItem("data-bm-prerender").value : s.getNamedItem("bm-prerender") ? s.getNamedItem("bm-prerender").value : "") && (i.prerender = !1),
                    this.setParams(i)
            }
            ,
            AnimationItem.prototype.includeLayers = function(t) {
                t.op > this.animationData.op && (this.animationData.op = t.op,
                    this.totalFrames = Math.floor(t.op - this.animationData.ip));
                var e, i, s = this.animationData.layers, r = s.length, a = t.layers, n = a.length;
                for (i = 0; i < n; i += 1)
                    for (e = 0; e < r; ) {
                        if (s[e].id == a[i].id) {
                            s[e] = a[i];
                            break
                        }
                        e += 1
                    }
                if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars),
                    this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)),
                    t.assets)
                    for (r = t.assets.length,
                             e = 0; e < r; e += 1)
                        this.animationData.assets.push(t.assets[e]);
                this.animationData.__complete = !1,
                    dataManager.completeData(this.animationData, this.renderer.globalData.fontManager),
                    this.renderer.includeLayers(t.layers),
                expressionsPlugin && expressionsPlugin.initExpressions(this),
                    this.loadNextSegment()
            }
            ,
            AnimationItem.prototype.loadNextSegment = function() {
                var t = this.animationData.segments;
                if (!t || 0 === t.length || !this.autoloadSegments)
                    return this.trigger("data_ready"),
                        void (this.timeCompleted = this.totalFrames);
                var e = t.shift();
                this.timeCompleted = e.time * this.frameRate;
                var i = this.path + this.fileName + "_" + this.segmentPos + ".json";
                this.segmentPos += 1,
                    assetLoader.load(i, this.includeLayers.bind(this), function() {
                        this.trigger("data_failed")
                    }
                        .bind(this))
            }
            ,
            AnimationItem.prototype.loadSegments = function() {
                this.animationData.segments || (this.timeCompleted = this.totalFrames),
                    this.loadNextSegment()
            }
            ,
            AnimationItem.prototype.imagesLoaded = function() {
                this.trigger("loaded_images"),
                    this.checkLoaded()
            }
            ,
            AnimationItem.prototype.preloadImages = function() {
                this.imagePreloader.setAssetsPath(this.assetsPath),
                    this.imagePreloader.setPath(this.path),
                    this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this))
            }
            ,
            AnimationItem.prototype.configAnimation = function(t) {
                this.renderer && (this.animationData = t,
                    this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip),
                    this.renderer.configAnimation(t),
                t.assets || (t.assets = []),
                    this.renderer.searchExtraCompositions(t.assets),
                    this.assets = this.animationData.assets,
                    this.frameRate = this.animationData.fr,
                    this.firstFrame = Math.round(this.animationData.ip),
                    this.frameMult = this.animationData.fr / 1e3,
                    this.trigger("config_ready"),
                    this.preloadImages(),
                    this.loadSegments(),
                    this.updaFrameModifier(),
                    this.waitForFontsLoaded())
            }
            ,
            AnimationItem.prototype.waitForFontsLoaded = function() {
                this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20))
            }
            ,
            AnimationItem.prototype.checkLoaded = function() {
                this.isLoaded || !this.renderer.globalData.fontManager.loaded() || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0,
                    dataManager.completeData(this.animationData, this.renderer.globalData.fontManager),
                expressionsPlugin && expressionsPlugin.initExpressions(this),
                    this.renderer.initItems(),
                    setTimeout(function() {
                        this.trigger("DOMLoaded")
                    }
                        .bind(this), 0),
                    this.gotoFrame(),
                this.autoplay && this.play())
            }
            ,
            AnimationItem.prototype.resize = function() {
                this.renderer.updateContainerSize()
            }
            ,
            AnimationItem.prototype.setSubframe = function(t) {
                this.subframeEnabled = !!t
            }
            ,
            AnimationItem.prototype.gotoFrame = function() {
                this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame,
                this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted),
                    this.trigger("enterFrame"),
                    this.renderFrame()
            }
            ,
            AnimationItem.prototype.renderFrame = function() {
                !1 !== this.isLoaded && this.renderer.renderFrame(this.currentFrame + this.firstFrame)
            }
            ,
            AnimationItem.prototype.play = function(t) {
                t && this.name != t || !0 === this.isPaused && (this.isPaused = !1,
                this._idle && (this._idle = !1,
                    this.trigger("_active")))
            }
            ,
            AnimationItem.prototype.pause = function(t) {
                t && this.name != t || !1 === this.isPaused && (this.isPaused = !0,
                    this._idle = !0,
                    this.trigger("_idle"))
            }
            ,
            AnimationItem.prototype.togglePause = function(t) {
                t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause())
            }
            ,
            AnimationItem.prototype.stop = function(t) {
                t && this.name != t || (this.pause(),
                    this.playCount = 0,
                    this._completedLoop = !1,
                    this.setCurrentRawFrameValue(0))
            }
            ,
            AnimationItem.prototype.goToAndStop = function(t, e, i) {
                i && this.name != i || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier),
                    this.pause())
            }
            ,
            AnimationItem.prototype.goToAndPlay = function(t, e, i) {
                this.goToAndStop(t, e, i),
                    this.play()
            }
            ,
            AnimationItem.prototype.advanceTime = function(t) {
                if (!0 !== this.isPaused && !1 !== this.isLoaded) {
                    var e = this.currentRawFrame + t * this.frameModifier
                        , i = !1;
                    e >= this.totalFrames - 1 && 0 < this.frameModifier ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1,
                    this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames),
                        this._completedLoop = !0,
                        this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (i = !0,
                        e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (i = !0,
                        e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames),
                        this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e),
                    i && (this.setCurrentRawFrameValue(e),
                        this.pause(),
                        this.trigger("complete"))
                }
            }
            ,
            AnimationItem.prototype.adjustSegment = function(t, e) {
                this.playCount = 0,
                    t[1] < t[0] ? (0 < this.frameModifier && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)),
                        this.timeCompleted = this.totalFrames = t[0] - t[1],
                        this.firstFrame = t[1],
                        this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)),
                        this.timeCompleted = this.totalFrames = t[1] - t[0],
                        this.firstFrame = t[0],
                        this.setCurrentRawFrameValue(.001 + e)),
                    this.trigger("segmentStart")
            }
            ,
            AnimationItem.prototype.setSegment = function(t, e) {
                var i = -1;
                this.isPaused && (this.currentRawFrame + this.firstFrame < t ? i = t : this.currentRawFrame + this.firstFrame > e && (i = e - t)),
                    this.firstFrame = t,
                    this.timeCompleted = this.totalFrames = e - t,
                -1 !== i && this.goToAndStop(i, !0)
            }
            ,
            AnimationItem.prototype.playSegments = function(t, e) {
                if (e && (this.segments.length = 0),
                "object" == typeof t[0]) {
                    var i, s = t.length;
                    for (i = 0; i < s; i += 1)
                        this.segments.push(t[i])
                } else
                    this.segments.push(t);
                this.segments.length && e && this.adjustSegment(this.segments.shift(), 0),
                this.isPaused && this.play()
            }
            ,
            AnimationItem.prototype.resetSegments = function(t) {
                this.segments.length = 0,
                    this.segments.push([this.animationData.ip, this.animationData.op]),
                t && this.checkSegments(0)
            }
            ,
            AnimationItem.prototype.checkSegments = function(t) {
                return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t),
                    !0)
            }
            ,
            AnimationItem.prototype.destroy = function(t) {
                t && this.name != t || !this.renderer || (this.renderer.destroy(),
                    this.imagePreloader.destroy(),
                    this.trigger("destroy"),
                    this._cbs = null,
                    this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null,
                    this.renderer = null)
            }
            ,
            AnimationItem.prototype.setCurrentRawFrameValue = function(t) {
                this.currentRawFrame = t,
                    this.gotoFrame()
            }
            ,
            AnimationItem.prototype.setSpeed = function(t) {
                this.playSpeed = t,
                    this.updaFrameModifier()
            }
            ,
            AnimationItem.prototype.setDirection = function(t) {
                this.playDirection = t < 0 ? -1 : 1,
                    this.updaFrameModifier()
            }
            ,
            AnimationItem.prototype.updaFrameModifier = function() {
                this.frameModifier = this.frameMult * this.playSpeed * this.playDirection
            }
            ,
            AnimationItem.prototype.getPath = function() {
                return this.path
            }
            ,
            AnimationItem.prototype.getAssetsPath = function(t) {
                var e = "";
                if (t.e)
                    e = t.p;
                else if (this.assetsPath) {
                    var i = t.p;
                    -1 !== i.indexOf("images/") && (i = i.split("/")[1]),
                        e = this.assetsPath + i
                } else
                    e = this.path,
                        e += t.u ? t.u : "",
                        e += t.p;
                return e
            }
            ,
            AnimationItem.prototype.getAssetData = function(t) {
                for (var e = 0, i = this.assets.length; e < i; ) {
                    if (t == this.assets[e].id)
                        return this.assets[e];
                    e += 1
                }
            }
            ,
            AnimationItem.prototype.hide = function() {
                this.renderer.hide()
            }
            ,
            AnimationItem.prototype.show = function() {
                this.renderer.show()
            }
            ,
            AnimationItem.prototype.getDuration = function(t) {
                return t ? this.totalFrames : this.totalFrames / this.frameRate
            }
            ,
            AnimationItem.prototype.trigger = function(t) {
                if (this._cbs && this._cbs[t])
                    switch (t) {
                        case "enterFrame":
                            this.triggerEvent(t, new BMEnterFrameEvent(t,this.currentFrame,this.totalFrames,this.frameModifier));
                            break;
                        case "loopComplete":
                            this.triggerEvent(t, new BMCompleteLoopEvent(t,this.loop,this.playCount,this.frameMult));
                            break;
                        case "complete":
                            this.triggerEvent(t, new BMCompleteEvent(t,this.frameMult));
                            break;
                        case "segmentStart":
                            this.triggerEvent(t, new BMSegmentStartEvent(t,this.firstFrame,this.totalFrames));
                            break;
                        case "destroy":
                            this.triggerEvent(t, new BMDestroyEvent(t,this));
                            break;
                        default:
                            this.triggerEvent(t)
                    }
                "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t,this.currentFrame,this.totalFrames,this.frameMult)),
                "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t,this.loop,this.playCount,this.frameMult)),
                "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t,this.frameMult)),
                "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t,this.firstFrame,this.totalFrames)),
                "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t,this))
            }
        ;
        var Expressions = (nW = {},
            nW.initExpressions = function(t) {
                var e = 0
                    , i = [];
                t.renderer.compInterface = CompExpressionInterface(t.renderer),
                    t.renderer.globalData.projectInterface.registerComposition(t.renderer),
                    t.renderer.globalData.pushExpression = function() {
                        e += 1
                    }
                    ,
                    t.renderer.globalData.popExpression = function() {
                        0 == (e -= 1) && function() {
                            var t, e = i.length;
                            for (t = 0; t < e; t += 1)
                                i[t].release();
                            i.length = 0
                        }()
                    }
                    ,
                    t.renderer.globalData.registerExpressionProperty = function(t) {
                        -1 === i.indexOf(t) && i.push(t)
                    }
            }
            ,
            nW), nW;
        expressionsPlugin = Expressions;
        var ExpressionManager = function() {
            var ob = {}
                , Math = BMMath
                , window = null
                , document = null;
            function $bm_isInstanceOfArray(t) {
                return t.constructor === Array || t.constructor === Float32Array
            }
            function isNumerable(t, e) {
                return "number" === t || "boolean" === t || "string" === t || e instanceof Number
            }
            function $bm_neg(t) {
                var e = typeof t;
                if ("number" === e || "boolean" === e || t instanceof Number)
                    return -t;
                if ($bm_isInstanceOfArray(t)) {
                    var i, s = t.length, r = [];
                    for (i = 0; i < s; i += 1)
                        r[i] = -t[i];
                    return r
                }
                return t.propType ? t.v : void 0
            }
            var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get
                , easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get
                , easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;
            function sum(t, e) {
                var i = typeof t
                    , s = typeof e;
                if ("string" === i || "string" === s)
                    return t + e;
                if (isNumerable(i, t) && isNumerable(s, e))
                    return t + e;
                if ($bm_isInstanceOfArray(t) && isNumerable(s, e))
                    return (t = t.slice(0))[0] = t[0] + e,
                        t;
                if (isNumerable(i, t) && $bm_isInstanceOfArray(e))
                    return (e = e.slice(0))[0] = t + e[0],
                        e;
                if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                    for (var r = 0, a = t.length, n = e.length, o = []; r < a || r < n; )
                        ("number" == typeof t[r] || t[r]instanceof Number) && ("number" == typeof e[r] || e[r]instanceof Number) ? o[r] = t[r] + e[r] : o[r] = void 0 === e[r] ? t[r] : t[r] || e[r],
                            r += 1;
                    return o
                }
                return 0
            }
            var add = sum;
            function sub(t, e) {
                var i = typeof t
                    , s = typeof e;
                if (isNumerable(i, t) && isNumerable(s, e))
                    return "string" === i && (t = parseInt(t)),
                    "string" === s && (e = parseInt(e)),
                    t - e;
                if ($bm_isInstanceOfArray(t) && isNumerable(s, e))
                    return (t = t.slice(0))[0] = t[0] - e,
                        t;
                if (isNumerable(i, t) && $bm_isInstanceOfArray(e))
                    return (e = e.slice(0))[0] = t - e[0],
                        e;
                if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                    for (var r = 0, a = t.length, n = e.length, o = []; r < a || r < n; )
                        ("number" == typeof t[r] || t[r]instanceof Number) && ("number" == typeof e[r] || e[r]instanceof Number) ? o[r] = t[r] - e[r] : o[r] = void 0 === e[r] ? t[r] : t[r] || e[r],
                            r += 1;
                    return o
                }
                return 0
            }
            function mul(t, e) {
                var i, s, r, a = typeof t, n = typeof e;
                if (isNumerable(a, t) && isNumerable(n, e))
                    return t * e;
                if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
                    for (r = t.length,
                             i = createTypedArray("float32", r),
                             s = 0; s < r; s += 1)
                        i[s] = t[s] * e;
                    return i
                }
                if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                    for (r = e.length,
                             i = createTypedArray("float32", r),
                             s = 0; s < r; s += 1)
                        i[s] = t * e[s];
                    return i
                }
                return 0
            }
            function div(t, e) {
                var i, s, r, a = typeof t, n = typeof e;
                if (isNumerable(a, t) && isNumerable(n, e))
                    return t / e;
                if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
                    for (r = t.length,
                             i = createTypedArray("float32", r),
                             s = 0; s < r; s += 1)
                        i[s] = t[s] / e;
                    return i
                }
                if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                    for (r = e.length,
                             i = createTypedArray("float32", r),
                             s = 0; s < r; s += 1)
                        i[s] = t / e[s];
                    return i
                }
                return 0
            }
            function mod(t, e) {
                return "string" == typeof t && (t = parseInt(t)),
                "string" == typeof e && (e = parseInt(e)),
                t % e
            }
            var $bm_sum = sum
                , $bm_sub = sub
                , $bm_mul = mul
                , $bm_div = div
                , $bm_mod = mod;
            function clamp(t, e, i) {
                if (i < e) {
                    var s = i;
                    i = e,
                        e = s
                }
                return Math.min(Math.max(t, e), i)
            }
            function radiansToDegrees(t) {
                return t / degToRads
            }
            var radians_to_degrees = radiansToDegrees;
            function degreesToRadians(t) {
                return t * degToRads
            }
            var degrees_to_radians = radiansToDegrees
                , helperLengthArray = [0, 0, 0, 0, 0, 0];
            function length(t, e) {
                if ("number" == typeof t || t instanceof Number)
                    return e = e || 0,
                        Math.abs(t - e);
                e || (e = helperLengthArray);
                var i, s = Math.min(t.length, e.length), r = 0;
                for (i = 0; i < s; i += 1)
                    r += Math.pow(e[i] - t[i], 2);
                return Math.sqrt(r)
            }
            function normalize(t) {
                return div(t, length(t))
            }
            function rgbToHsl(t) {
                var e, i, s = t[0], r = t[1], a = t[2], n = Math.max(s, r, a), o = Math.min(s, r, a), h = (n + o) / 2;
                if (n == o)
                    e = i = 0;
                else {
                    var l = n - o;
                    switch (i = .5 < h ? l / (2 - n - o) : l / (n + o),
                        n) {
                        case s:
                            e = (r - a) / l + (r < a ? 6 : 0);
                            break;
                        case r:
                            e = (a - s) / l + 2;
                            break;
                        case a:
                            e = (s - r) / l + 4
                    }
                    e /= 6
                }
                return [e, i, h, t[3]]
            }
            function hue2rgb(t, e, i) {
                return i < 0 && (i += 1),
                1 < i && (i -= 1),
                    i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t
            }
            function hslToRgb(t) {
                var e, i, s, r = t[0], a = t[1], n = t[2];
                if (0 === a)
                    e = i = s = n;
                else {
                    var o = n < .5 ? n * (1 + a) : n + a - n * a
                        , h = 2 * n - o;
                    e = hue2rgb(h, o, r + 1 / 3),
                        i = hue2rgb(h, o, r),
                        s = hue2rgb(h, o, r - 1 / 3)
                }
                return [e, i, s, t[3]]
            }
            function linear(t, e, i, s, r) {
                if (void 0 !== s && void 0 !== r || (s = e,
                    r = i,
                    e = 0,
                    i = 1),
                i < e) {
                    var a = i;
                    i = e,
                        e = a
                }
                if (t <= e)
                    return s;
                if (i <= t)
                    return r;
                var n = i === e ? 0 : (t - e) / (i - e);
                if (!s.length)
                    return s + (r - s) * n;
                var o, h = s.length, l = createTypedArray("float32", h);
                for (o = 0; o < h; o += 1)
                    l[o] = s[o] + (r[o] - s[o]) * n;
                return l
            }
            function random(t, e) {
                if (void 0 === e && (void 0 === t ? (t = 0,
                    e = 1) : (e = t,
                    t = void 0)),
                    e.length) {
                    var i, s = e.length;
                    t || (t = createTypedArray("float32", s));
                    var r = createTypedArray("float32", s)
                        , a = BMMath.random();
                    for (i = 0; i < s; i += 1)
                        r[i] = t[i] + a * (e[i] - t[i]);
                    return r
                }
                return void 0 === t && (t = 0),
                t + BMMath.random() * (e - t)
            }
            function createPath(t, e, i, s) {
                var r, a = t.length, n = shape_pool.newElement();
                n.setPathData(!!s, a);
                var o, h, l = [0, 0];
                for (r = 0; r < a; r += 1)
                    o = e && e[r] ? e[r] : l,
                        h = i && i[r] ? i[r] : l,
                        n.setTripleAt(t[r][0], t[r][1], h[0] + t[r][0], h[1] + t[r][1], o[0] + t[r][0], o[1] + t[r][1], r, !0);
                return n
            }
            function initiateExpression(elem, data, property) {
                var val = data.x, needsVelocity = /velocity(?![\w\d])/.test(val), _needsRandom = -1 !== val.indexOf("random"), elemType = elem.data.ty, transform, $bm_transform, content, effect, thisProperty = property;
                thisProperty.valueAtTime = thisProperty.getValueAtTime,
                    Object.defineProperty(thisProperty, "value", {
                        get: function() {
                            return thisProperty.v
                        }
                    }),
                    elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate,
                    elem.comp.displayStartTime = 0;
                var inPoint = elem.data.ip / elem.comp.globalData.frameRate, outPoint = elem.data.op / elem.comp.globalData.frameRate, width = elem.data.sw ? elem.data.sw : 0, height = elem.data.sh ? elem.data.sh : 0, name = elem.data.nm, loopIn, loop_in, loopOut, loop_out, smooth, toWorld, fromWorld, fromComp, toComp, fromCompToSurface, position, rotation, anchorPoint, scale, thisLayer, thisComp, mask, valueAtTime, velocityAtTime, __expression_functions = [], scoped_bm_rt;
                if (data.xf) {
                    var i, len = data.xf.length;
                    for (i = 0; i < len; i += 1)
                        __expression_functions[i] = eval("(function(){ return " + data.xf[i] + "}())")
                }
                var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0]
                    , numKeys = property.kf ? data.k.length : 0
                    , active = !this.data || !0 !== this.data.hd
                    , wiggle = function(t, e) {
                    var i, s, r = this.pv.length ? this.pv.length : 1, a = createTypedArray("float32", r), n = Math.floor(5 * time);
                    for (s = i = 0; i < n; ) {
                        for (s = 0; s < r; s += 1)
                            a[s] += -e + 2 * e * BMMath.random();
                        i += 1
                    }
                    var o = 5 * time
                        , h = o - Math.floor(o)
                        , l = createTypedArray("float32", r);
                    if (1 < r) {
                        for (s = 0; s < r; s += 1)
                            l[s] = this.pv[s] + a[s] + (-e + 2 * e * BMMath.random()) * h;
                        return l
                    }
                    return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h
                }
                    .bind(this);
                function loopInDuration(t, e) {
                    return loopIn(t, e, !0)
                }
                function loopOutDuration(t, e) {
                    return loopOut(t, e, !0)
                }
                thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty),
                    loop_in = loopIn),
                thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty),
                    loop_out = loopOut),
                thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)),
                this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)),
                this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
                var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface), time, velocity, value, text, textIndex, textTotal, selectorValue;
                function lookAt(t, e) {
                    var i = [e[0] - t[0], e[1] - t[1], e[2] - t[2]]
                        , s = Math.atan2(i[0], Math.sqrt(i[1] * i[1] + i[2] * i[2])) / degToRads;
                    return [-Math.atan2(i[1], i[2]) / degToRads, s, 0]
                }
                function easeOut(t, e, i, s, r) {
                    return applyEase(easeOutBez, t, e, i, s, r)
                }
                function easeIn(t, e, i, s, r) {
                    return applyEase(easeInBez, t, e, i, s, r)
                }
                function ease(t, e, i, s, r) {
                    return applyEase(easeInOutBez, t, e, i, s, r)
                }
                function applyEase(t, e, i, s, r, a) {
                    void 0 === r ? (r = i,
                        a = s) : e = (e - i) / (s - i);
                    var n = t(e = 1 < e ? 1 : e < 0 ? 0 : e);
                    if ($bm_isInstanceOfArray(r)) {
                        var o, h = r.length, l = createTypedArray("float32", h);
                        for (o = 0; o < h; o += 1)
                            l[o] = (a[o] - r[o]) * n + r[o];
                        return l
                    }
                    return (a - r) * n + r
                }
                function nearestKey(t) {
                    var e, i, s, r = data.k.length;
                    if (data.k.length && "number" != typeof data.k[0])
                        if (i = -1,
                        (t *= elem.comp.globalData.frameRate) < data.k[0].t)
                            i = 1,
                                s = data.k[0].t;
                        else {
                            for (e = 0; e < r - 1; e += 1) {
                                if (t === data.k[e].t) {
                                    i = e + 1,
                                        s = data.k[e].t;
                                    break
                                }
                                if (t > data.k[e].t && t < data.k[e + 1].t) {
                                    s = t - data.k[e].t > data.k[e + 1].t - t ? (i = e + 2,
                                        data.k[e + 1].t) : (i = e + 1,
                                        data.k[e].t);
                                    break
                                }
                            }
                            -1 === i && (i = e + 1,
                                s = data.k[e].t)
                        }
                    else
                        s = i = 0;
                    var a = {};
                    return a.index = i,
                        a.time = s / elem.comp.globalData.frameRate,
                        a
                }
                function key(t) {
                    var e, i, s, r;
                    if (!data.k.length || "number" == typeof data.k[0])
                        throw new Error("The property has no keyframe at index " + t);
                    for (t -= 1,
                             e = {
                                 time: data.k[t].t / elem.comp.globalData.frameRate,
                                 value: []
                             },
                             s = (r = t !== data.k.length - 1 || data.k[t].h ? data.k[t].s : data.k[t].s || 0 === data.k[t].s ? data.k[t - 1].s : data.k[t].e).length,
                             i = 0; i < s; i += 1)
                        e[i] = r[i],
                            e.value[i] = r[i];
                    return e
                }
                function framesToTime(t, e) {
                    return e || (e = elem.comp.globalData.frameRate),
                    t / e
                }
                function timeToFrames(t, e) {
                    return t || 0 === t || (t = time),
                    e || (e = elem.comp.globalData.frameRate),
                    t * e
                }
                function seedRandom(t) {
                    BMMath.seedrandom(randSeed + t)
                }
                function sourceRectAtTime() {
                    return elem.sourceRectAtTime()
                }
                function substring(t, e) {
                    return "string" == typeof value ? void 0 === e ? value.substring(t) : value.substring(t, e) : ""
                }
                function substr(t, e) {
                    return "string" == typeof value ? void 0 === e ? value.substr(t) : value.substr(t, e) : ""
                }
                var index = elem.data.ind, hasParent = !(!elem.hierarchy || !elem.hierarchy.length), parent, randSeed = Math.floor(1e6 * Math.random()), globalData = elem.globalData;
                function executeExpression(t) {
                    return value = t,
                    _needsRandom && seedRandom(randSeed),
                        this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex,
                            textTotal = this.textTotal,
                            selectorValue = this.selectorValue),
                        thisLayer || (text = elem.layerInterface.text,
                            thisLayer = elem.layerInterface,
                            thisComp = elem.comp.compInterface,
                            toWorld = thisLayer.toWorld.bind(thisLayer),
                            fromWorld = thisLayer.fromWorld.bind(thisLayer),
                            fromComp = thisLayer.fromComp.bind(thisLayer),
                            toComp = thisLayer.toComp.bind(thisLayer),
                            mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null,
                            fromCompToSurface = fromComp),
                        transform || (transform = elem.layerInterface("ADBE Transform Group"),
                        ($bm_transform = transform) && (anchorPoint = transform.anchorPoint)),
                        4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")),
                        effect || (effect = thisLayer(4)),
                        (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface),
                            time = this.comp.renderedFrame / this.comp.globalData.frameRate,
                        needsVelocity && (velocity = velocityAtTime(time)),
                            expression_function(),
                            this.frameExpressionId = elem.globalData.frameId,
                        "shape" === scoped_bm_rt.propType && (scoped_bm_rt = scoped_bm_rt.v),
                            scoped_bm_rt)
                }
                return executeExpression
            }
            return ob.initiateExpression = initiateExpression,
                ob
        }()
            , expressionHelpers = {
            searchExpressions: function(t, e, i) {
                e.x && (i.k = !0,
                    i.x = !0,
                    i.initiateExpression = ExpressionManager.initiateExpression,
                    i.effectsSequence.push(i.initiateExpression(t, e, i).bind(i)))
            },
            getSpeedAtTime: function(t) {
                var e = this.getValueAtTime(t)
                    , i = this.getValueAtTime(t + -.01)
                    , s = 0;
                if (e.length) {
                    var r;
                    for (r = 0; r < e.length; r += 1)
                        s += Math.pow(i[r] - e[r], 2);
                    s = 100 * Math.sqrt(s)
                } else
                    s = 0;
                return s
            },
            getVelocityAtTime: function(t) {
                if (void 0 !== this.vel)
                    return this.vel;
                var e, i, s = this.getValueAtTime(t), r = this.getValueAtTime(t + -.001);
                if (s.length)
                    for (e = createTypedArray("float32", s.length),
                             i = 0; i < s.length; i += 1)
                        e[i] = (r[i] - s[i]) / -.001;
                else
                    e = (r - s) / -.001;
                return e
            },
            getValueAtTime: function(t) {
                return t *= this.elem.globalData.frameRate,
                (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0,
                    this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime),
                    this._cachingAtTime.lastFrame = t),
                    this._cachingAtTime.value
            },
            getStaticValueAtTime: function() {
                return this.pv
            },
            setGroupProperty: function(t) {
                this.propertyGroup = t
            }
        };
        !function() {
            function t(t, e, i) {
                if (!this.k || !this.keyframes)
                    return this.pv;
                t = t ? t.toLowerCase() : "";
                var s, r, a, n, o, h = this.comp.renderedFrame, l = this.keyframes, p = l[l.length - 1].t;
                if (h <= p)
                    return this.pv;
                if (i ? r = p - (s = e ? Math.abs(p - elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1),
                    s = p - (r = l[l.length - 1 - e].t)),
                "pingpong" === t) {
                    if (Math.floor((h - r) / s) % 2 != 0)
                        return this.getValueAtTime((s - (h - r) % s + r) / this.comp.globalData.frameRate, 0)
                } else {
                    if ("offset" === t) {
                        var f = this.getValueAtTime(r / this.comp.globalData.frameRate, 0)
                            , d = this.getValueAtTime(p / this.comp.globalData.frameRate, 0)
                            , m = this.getValueAtTime(((h - r) % s + r) / this.comp.globalData.frameRate, 0)
                            , c = Math.floor((h - r) / s);
                        if (this.pv.length) {
                            for (n = (o = new Array(f.length)).length,
                                     a = 0; a < n; a += 1)
                                o[a] = (d[a] - f[a]) * c + m[a];
                            return o
                        }
                        return (d - f) * c + m
                    }
                    if ("continue" === t) {
                        var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0)
                            , y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);
                        if (this.pv.length) {
                            for (n = (o = new Array(u.length)).length,
                                     a = 0; a < n; a += 1)
                                o[a] = u[a] + (u[a] - y[a]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
                            return o
                        }
                        return u + (h - p) / .001 * (u - y)
                    }
                }
                return this.getValueAtTime(((h - r) % s + r) / this.comp.globalData.frameRate, 0)
            }
            function e(t, e, i) {
                if (!this.k)
                    return this.pv;
                t = t ? t.toLowerCase() : "";
                var s, r, a, n, o, h = this.comp.renderedFrame, l = this.keyframes, p = l[0].t;
                if (p <= h)
                    return this.pv;
                if (i ? r = p + (s = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1),
                    s = (r = l[e].t) - p),
                "pingpong" === t) {
                    if (Math.floor((p - h) / s) % 2 == 0)
                        return this.getValueAtTime(((p - h) % s + p) / this.comp.globalData.frameRate, 0)
                } else {
                    if ("offset" === t) {
                        var f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0)
                            , d = this.getValueAtTime(r / this.comp.globalData.frameRate, 0)
                            , m = this.getValueAtTime((s - (p - h) % s + p) / this.comp.globalData.frameRate, 0)
                            , c = Math.floor((p - h) / s) + 1;
                        if (this.pv.length) {
                            for (n = (o = new Array(f.length)).length,
                                     a = 0; a < n; a += 1)
                                o[a] = m[a] - (d[a] - f[a]) * c;
                            return o
                        }
                        return m - (d - f) * c
                    }
                    if ("continue" === t) {
                        var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0)
                            , y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);
                        if (this.pv.length) {
                            for (n = (o = new Array(u.length)).length,
                                     a = 0; a < n; a += 1)
                                o[a] = u[a] + (u[a] - y[a]) * (p - h) / .001;
                            return o
                        }
                        return u + (u - y) * (p - h) / .001
                    }
                }
                return this.getValueAtTime((s - (p - h) % s + p) / this.comp.globalData.frameRate, 0)
            }
            function i(t, e) {
                if (!this.k)
                    return this.pv;
                if (t = .5 * (t || .4),
                (e = Math.floor(e || 5)) <= 1)
                    return this.pv;
                var i, s, r = this.comp.renderedFrame / this.comp.globalData.frameRate, a = r - t, n = 1 < e ? (r + t - a) / (e - 1) : 1, o = 0, h = 0;
                for (i = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e; ) {
                    if (s = this.getValueAtTime(a + o * n),
                        this.pv.length)
                        for (h = 0; h < this.pv.length; h += 1)
                            i[h] += s[h];
                    else
                        i += s;
                    o += 1
                }
                if (this.pv.length)
                    for (h = 0; h < this.pv.length; h += 1)
                        i[h] /= e;
                else
                    i /= e;
                return i
            }
            var s = TransformPropertyFactory.getTransformProperty;
            TransformPropertyFactory.getTransformProperty = function(t, e, i) {
                var r = s(t, e, i);
                return r.dynamicProperties.length ? r.getValueAtTime = function(t) {
                    console.warn("Transform at time not supported")
                }
                    .bind(r) : r.getValueAtTime = function(t) {}
                    .bind(r),
                    r.setGroupProperty = expressionHelpers.setGroupProperty,
                    r
            }
            ;
            var r = PropertyFactory.getProp;
            PropertyFactory.getProp = function(s, a, n, o, h) {
                var l = r(s, a, n, o, h);
                l.kf ? l.getValueAtTime = expressionHelpers.getValueAtTime.bind(l) : l.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(l),
                    l.setGroupProperty = expressionHelpers.setGroupProperty,
                    l.loopOut = t,
                    l.loopIn = e,
                    l.smooth = i,
                    l.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(l),
                    l.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(l),
                    l.numKeys = 1 === a.a ? a.k.length : 0,
                    l.propertyIndex = a.ix;
                var p = 0;
                return 0 !== n && (p = createTypedArray("float32", 1 === a.a ? a.k[0].s.length : a.k.length)),
                    l._cachingAtTime = {
                        lastFrame: initialDefaultFrame,
                        lastIndex: 0,
                        value: p
                    },
                    expressionHelpers.searchExpressions(s, a, l),
                l.k && h.addDynamicProperty(l),
                    l
            }
            ;
            var a = ShapePropertyFactory.getConstructorFunction()
                , n = ShapePropertyFactory.getKeyframedConstructorFunction();
            function o() {}
            o.prototype = {
                vertices: function(t, e) {
                    this.k && this.getValue();
                    var i = this.v;
                    void 0 !== e && (i = this.getValueAtTime(e, 0));
                    var s, r = i._length, a = i[t], n = i.v, o = createSizedArray(r);
                    for (s = 0; s < r; s += 1)
                        o[s] = "i" === t || "o" === t ? [a[s][0] - n[s][0], a[s][1] - n[s][1]] : [a[s][0], a[s][1]];
                    return o
                },
                points: function(t) {
                    return this.vertices("v", t)
                },
                inTangents: function(t) {
                    return this.vertices("i", t)
                },
                outTangents: function(t) {
                    return this.vertices("o", t)
                },
                isClosed: function() {
                    return this.v.c
                },
                pointOnPath: function(t, e) {
                    var i = this.v;
                    void 0 !== e && (i = this.getValueAtTime(e, 0)),
                    this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(i));
                    for (var s, r = this._segmentsLength, a = r.lengths, n = r.totalLength * t, o = 0, h = a.length, l = 0; o < h; ) {
                        if (l + a[o].addedLength > n) {
                            var p = o
                                , f = i.c && o === h - 1 ? 0 : o + 1
                                , d = (n - l) / a[o].addedLength;
                            s = bez.getPointInSegment(i.v[p], i.v[f], i.o[p], i.i[f], d, a[o]);
                            break
                        }
                        l += a[o].addedLength,
                            o += 1
                    }
                    return s || (s = i.c ? [i.v[0][0], i.v[0][1]] : [i.v[i._length - 1][0], i.v[i._length - 1][1]]),
                        s
                },
                vectorOnPath: function(t, e, i) {
                    t = 1 == t ? this.v.c ? 0 : .999 : t;
                    var s = this.pointOnPath(t, e)
                        , r = this.pointOnPath(t + .001, e)
                        , a = r[0] - s[0]
                        , n = r[1] - s[1]
                        , o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
                    return "tangent" === i ? [a / o, n / o] : [-n / o, a / o]
                },
                tangentOnPath: function(t, e) {
                    return this.vectorOnPath(t, e, "tangent")
                },
                normalOnPath: function(t, e) {
                    return this.vectorOnPath(t, e, "normal")
                },
                setGroupProperty: expressionHelpers.setGroupProperty,
                getValueAtTime: expressionHelpers.getStaticValueAtTime
            },
                extendPrototype([o], a),
                extendPrototype([o], n),
                n.prototype.getValueAtTime = function(t) {
                    return this._cachingAtTime || (this._cachingAtTime = {
                        shapeValue: shape_pool.clone(this.pv),
                        lastIndex: 0,
                        lastTime: initialDefaultFrame
                    }),
                        t *= this.elem.globalData.frameRate,
                    (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0,
                        this._cachingAtTime.lastTime = t,
                        this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)),
                        this._cachingAtTime.shapeValue
                }
                ,
                n.prototype.initiateExpression = ExpressionManager.initiateExpression;
            var h = ShapePropertyFactory.getShapeProp;
            ShapePropertyFactory.getShapeProp = function(t, e, i, s, r) {
                var a = h(t, e, i, s, r);
                return a.propertyIndex = e.ix,
                    a.lock = !1,
                    3 === i ? expressionHelpers.searchExpressions(t, e.pt, a) : 4 === i && expressionHelpers.searchExpressions(t, e.ks, a),
                a.k && t.addDynamicProperty(a),
                    a
            }
        }(),
            TextProperty.prototype.getExpressionValue = function(t, e) {
                var i = this.calculateExpression(e);
                if (t.t === i)
                    return t;
                var s = {};
                return this.copyData(s, t),
                    s.t = i.toString(),
                    s.__complete = !1,
                    s
            }
            ,
            TextProperty.prototype.searchProperty = function() {
                var t = this.searchKeyframes()
                    , e = this.searchExpressions();
                return this.kf = t || e,
                    this.kf
            }
            ,
            TextProperty.prototype.searchExpressions = function() {
                if (this.data.d.x)
                    return this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this),
                        this.addEffect(this.getExpressionValue.bind(this)),
                        !0
            }
        ;
        var ShapeExpressionInterface = function() {
            function t(t, f, d) {
                var m, c = [], u = t ? t.length : 0;
                for (m = 0; m < u; m += 1)
                    "gr" == t[m].ty ? c.push(e(t[m], f[m], d)) : "fl" == t[m].ty ? c.push(i(t[m], f[m], d)) : "st" == t[m].ty ? c.push(s(t[m], f[m], d)) : "tm" == t[m].ty ? c.push(r(t[m], f[m], d)) : "tr" == t[m].ty || ("el" == t[m].ty ? c.push(a(t[m], f[m], d)) : "sr" == t[m].ty ? c.push(n(t[m], f[m], d)) : "sh" == t[m].ty ? c.push(p(t[m], f[m], d)) : "rc" == t[m].ty ? c.push(o(t[m], f[m], d)) : "rd" == t[m].ty ? c.push(h(t[m], f[m], d)) : "rp" == t[m].ty && c.push(l(t[m], f[m], d)));
                return c
            }
            function e(e, i, s) {
                var r = function(t) {
                    switch (t) {
                        case "ADBE Vectors Group":
                        case "Contents":
                        case 2:
                            return r.content;
                        default:
                            return r.transform
                    }
                };
                r.propertyGroup = function(t) {
                    return 1 === t ? r : s(t - 1)
                }
                ;
                var a, n, o, h, l, p = (a = e,
                    n = i,
                    o = r.propertyGroup,
                    (l = function(t) {
                            for (var e = 0, i = h.length; e < i; ) {
                                if (h[e]._name === t || h[e].mn === t || h[e].propertyIndex === t || h[e].ix === t || h[e].ind === t)
                                    return h[e];
                                e += 1
                            }
                            if ("number" == typeof t)
                                return h[t - 1]
                        }
                    ).propertyGroup = function(t) {
                        return 1 === t ? l : o(t - 1)
                    }
                    ,
                    h = t(a.it, n.it, l.propertyGroup),
                    l.numProperties = h.length,
                    l.propertyIndex = a.cix,
                    l._name = a.nm,
                    l), f = function(t, e, i) {
                    function s(t) {
                        return 1 == t ? r : i(--t)
                    }
                    function r(e) {
                        return t.a.ix === e || "Anchor Point" === e ? r.anchorPoint : t.o.ix === e || "Opacity" === e ? r.opacity : t.p.ix === e || "Position" === e ? r.position : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e ? r.rotation : t.s.ix === e || "Scale" === e ? r.scale : t.sk && t.sk.ix === e || "Skew" === e ? r.skew : t.sa && t.sa.ix === e || "Skew Axis" === e ? r.skewAxis : void 0
                    }
                    return e.transform.mProps.o.setGroupProperty(s),
                        e.transform.mProps.p.setGroupProperty(s),
                        e.transform.mProps.a.setGroupProperty(s),
                        e.transform.mProps.s.setGroupProperty(s),
                        e.transform.mProps.r.setGroupProperty(s),
                    e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(s),
                        e.transform.mProps.sa.setGroupProperty(s)),
                        e.transform.op.setGroupProperty(s),
                        Object.defineProperties(r, {
                            opacity: {
                                get: ExpressionPropertyInterface(e.transform.mProps.o)
                            },
                            position: {
                                get: ExpressionPropertyInterface(e.transform.mProps.p)
                            },
                            anchorPoint: {
                                get: ExpressionPropertyInterface(e.transform.mProps.a)
                            },
                            scale: {
                                get: ExpressionPropertyInterface(e.transform.mProps.s)
                            },
                            rotation: {
                                get: ExpressionPropertyInterface(e.transform.mProps.r)
                            },
                            skew: {
                                get: ExpressionPropertyInterface(e.transform.mProps.sk)
                            },
                            skewAxis: {
                                get: ExpressionPropertyInterface(e.transform.mProps.sa)
                            },
                            _name: {
                                value: t.nm
                            }
                        }),
                        r.ty = "tr",
                        r.mn = t.mn,
                        r.propertyGroup = i,
                        r
                }(e.it[e.it.length - 1], i.it[i.it.length - 1], r.propertyGroup);
                return r.content = p,
                    r.transform = f,
                    Object.defineProperty(r, "_name", {
                        get: function() {
                            return e.nm
                        }
                    }),
                    r.numProperties = e.np,
                    r.propertyIndex = e.ix,
                    r.nm = e.nm,
                    r.mn = e.mn,
                    r
            }
            function i(t, e, i) {
                function s(t) {
                    return "Color" === t || "color" === t ? s.color : "Opacity" === t || "opacity" === t ? s.opacity : void 0
                }
                return Object.defineProperties(s, {
                    color: {
                        get: ExpressionPropertyInterface(e.c)
                    },
                    opacity: {
                        get: ExpressionPropertyInterface(e.o)
                    },
                    _name: {
                        value: t.nm
                    },
                    mn: {
                        value: t.mn
                    }
                }),
                    e.c.setGroupProperty(i),
                    e.o.setGroupProperty(i),
                    s
            }
            function s(t, e, i) {
                function s(t) {
                    return 1 === t ? ob : i(t - 1)
                }
                function r(t) {
                    return 1 === t ? h : s(t - 1)
                }
                var a, n, o = t.d ? t.d.length : 0, h = {};
                for (a = 0; a < o; a += 1)
                    n = a,
                        Object.defineProperty(h, t.d[n].nm, {
                            get: ExpressionPropertyInterface(e.d.dataProps[n].p)
                        }),
                        e.d.dataProps[a].p.setGroupProperty(r);
                function l(t) {
                    return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : void 0
                }
                return Object.defineProperties(l, {
                    color: {
                        get: ExpressionPropertyInterface(e.c)
                    },
                    opacity: {
                        get: ExpressionPropertyInterface(e.o)
                    },
                    strokeWidth: {
                        get: ExpressionPropertyInterface(e.w)
                    },
                    dash: {
                        get: function() {
                            return h
                        }
                    },
                    _name: {
                        value: t.nm
                    },
                    mn: {
                        value: t.mn
                    }
                }),
                    e.c.setGroupProperty(s),
                    e.o.setGroupProperty(s),
                    e.w.setGroupProperty(s),
                    l
            }
            function r(t, e, i) {
                function s(t) {
                    return 1 == t ? r : i(--t)
                }
                function r(e) {
                    return e === t.e.ix || "End" === e || "end" === e ? r.end : e === t.s.ix ? r.start : e === t.o.ix ? r.offset : void 0
                }
                return r.propertyIndex = t.ix,
                    e.s.setGroupProperty(s),
                    e.e.setGroupProperty(s),
                    e.o.setGroupProperty(s),
                    r.propertyIndex = t.ix,
                    r.propertyGroup = i,
                    Object.defineProperties(r, {
                        start: {
                            get: ExpressionPropertyInterface(e.s)
                        },
                        end: {
                            get: ExpressionPropertyInterface(e.e)
                        },
                        offset: {
                            get: ExpressionPropertyInterface(e.o)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    r.mn = t.mn,
                    r
            }
            function a(t, e, i) {
                function s(t) {
                    return 1 == t ? a : i(--t)
                }
                a.propertyIndex = t.ix;
                var r = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                function a(e) {
                    return t.p.ix === e ? a.position : t.s.ix === e ? a.size : void 0
                }
                return r.s.setGroupProperty(s),
                    r.p.setGroupProperty(s),
                    Object.defineProperties(a, {
                        size: {
                            get: ExpressionPropertyInterface(r.s)
                        },
                        position: {
                            get: ExpressionPropertyInterface(r.p)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    a.mn = t.mn,
                    a
            }
            function n(t, e, i) {
                function s(t) {
                    return 1 == t ? a : i(--t)
                }
                var r = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                function a(e) {
                    return t.p.ix === e ? a.position : t.r.ix === e ? a.rotation : t.pt.ix === e ? a.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? a.outerRadius : t.os.ix === e ? a.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? a.innerRoundness : void 0 : a.innerRadius
                }
                return a.propertyIndex = t.ix,
                    r.or.setGroupProperty(s),
                    r.os.setGroupProperty(s),
                    r.pt.setGroupProperty(s),
                    r.p.setGroupProperty(s),
                    r.r.setGroupProperty(s),
                t.ir && (r.ir.setGroupProperty(s),
                    r.is.setGroupProperty(s)),
                    Object.defineProperties(a, {
                        position: {
                            get: ExpressionPropertyInterface(r.p)
                        },
                        rotation: {
                            get: ExpressionPropertyInterface(r.r)
                        },
                        points: {
                            get: ExpressionPropertyInterface(r.pt)
                        },
                        outerRadius: {
                            get: ExpressionPropertyInterface(r.or)
                        },
                        outerRoundness: {
                            get: ExpressionPropertyInterface(r.os)
                        },
                        innerRadius: {
                            get: ExpressionPropertyInterface(r.ir)
                        },
                        innerRoundness: {
                            get: ExpressionPropertyInterface(r.is)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    a.mn = t.mn,
                    a
            }
            function o(t, e, i) {
                function s(t) {
                    return 1 == t ? a : i(--t)
                }
                var r = "tm" === e.sh.ty ? e.sh.prop : e.sh;
                function a(e) {
                    return t.p.ix === e ? a.position : t.r.ix === e ? a.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? a.size : void 0
                }
                return a.propertyIndex = t.ix,
                    r.p.setGroupProperty(s),
                    r.s.setGroupProperty(s),
                    r.r.setGroupProperty(s),
                    Object.defineProperties(a, {
                        position: {
                            get: ExpressionPropertyInterface(r.p)
                        },
                        roundness: {
                            get: ExpressionPropertyInterface(r.r)
                        },
                        size: {
                            get: ExpressionPropertyInterface(r.s)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    a.mn = t.mn,
                    a
            }
            function h(t, e, i) {
                var s = e;
                function r(e) {
                    if (t.r.ix === e || "Round Corners 1" === e)
                        return r.radius
                }
                return r.propertyIndex = t.ix,
                    s.rd.setGroupProperty((function(t) {
                            return 1 == t ? r : i(--t)
                        }
                    )),
                    Object.defineProperties(r, {
                        radius: {
                            get: ExpressionPropertyInterface(s.rd)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    r.mn = t.mn,
                    r
            }
            function l(t, e, i) {
                function s(t) {
                    return 1 == t ? a : i(--t)
                }
                var r = e;
                function a(e) {
                    return t.c.ix === e || "Copies" === e ? a.copies : t.o.ix === e || "Offset" === e ? a.offset : void 0
                }
                return a.propertyIndex = t.ix,
                    r.c.setGroupProperty(s),
                    r.o.setGroupProperty(s),
                    Object.defineProperties(a, {
                        copies: {
                            get: ExpressionPropertyInterface(r.c)
                        },
                        offset: {
                            get: ExpressionPropertyInterface(r.o)
                        },
                        _name: {
                            value: t.nm
                        }
                    }),
                    a.mn = t.mn,
                    a
            }
            function p(t, e, i) {
                var s = e.sh;
                function r(t) {
                    if ("Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t)
                        return r.path
                }
                return s.setGroupProperty((function(t) {
                        return 1 == t ? r : i(--t)
                    }
                )),
                    Object.defineProperties(r, {
                        path: {
                            get: function() {
                                return s.k && s.getValue(),
                                    s
                            }
                        },
                        shape: {
                            get: function() {
                                return s.k && s.getValue(),
                                    s
                            }
                        },
                        _name: {
                            value: t.nm
                        },
                        ix: {
                            value: t.ix
                        },
                        mn: {
                            value: t.mn
                        }
                    }),
                    r
            }
            return function(e, i, s) {
                var r;
                function a(t) {
                    if ("number" == typeof t)
                        return r[t - 1];
                    for (var e = 0, i = r.length; e < i; ) {
                        if (r[e]._name === t)
                            return r[e];
                        e += 1
                    }
                }
                return a.propertyGroup = s,
                    r = t(e, i, a),
                    a.numProperties = r.length,
                    a
            }
        }(), TextExpressionInterface = function(t) {
            var e;
            function i() {}
            return Object.defineProperty(i, "sourceText", {
                get: function() {
                    t.textProperty.getValue();
                    var i = t.textProperty.currentData.t;
                    return void 0 !== i && (t.textProperty.currentData.t = void 0,
                        (e = new String(i)).value = i || new String(i)),
                        e
                }
            }),
                i
        }, LayerExpressionInterface = function() {
            function t(t, e) {
                var i = new Matrix;
                if (i.reset(),
                    this._elem.finalTransform.mProp.applyToMatrix(i),
                this._elem.hierarchy && this._elem.hierarchy.length) {
                    var s, r = this._elem.hierarchy.length;
                    for (s = 0; s < r; s += 1)
                        this._elem.hierarchy[s].finalTransform.mProp.applyToMatrix(i);
                    return i.applyToPointArray(t[0], t[1], t[2] || 0)
                }
                return i.applyToPointArray(t[0], t[1], t[2] || 0)
            }
            function e(t, e) {
                var i = new Matrix;
                if (i.reset(),
                    this._elem.finalTransform.mProp.applyToMatrix(i),
                this._elem.hierarchy && this._elem.hierarchy.length) {
                    var s, r = this._elem.hierarchy.length;
                    for (s = 0; s < r; s += 1)
                        this._elem.hierarchy[s].finalTransform.mProp.applyToMatrix(i);
                    return i.inversePoint(t)
                }
                return i.inversePoint(t)
            }
            function i(t) {
                var e = new Matrix;
                if (e.reset(),
                    this._elem.finalTransform.mProp.applyToMatrix(e),
                this._elem.hierarchy && this._elem.hierarchy.length) {
                    var i, s = this._elem.hierarchy.length;
                    for (i = 0; i < s; i += 1)
                        this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(e);
                    return e.inversePoint(t)
                }
                return e.inversePoint(t)
            }
            function s() {
                return [1, 1, 1, 1]
            }
            return function(r) {
                var a;
                function n(t) {
                    switch (t) {
                        case "ADBE Root Vectors Group":
                        case "Contents":
                        case 2:
                            return n.shapeInterface;
                        case 1:
                        case 6:
                        case "Transform":
                        case "transform":
                        case "ADBE Transform Group":
                            return a;
                        case 4:
                        case "ADBE Effect Parade":
                        case "effects":
                        case "Effects":
                            return n.effect
                    }
                }
                n.toWorld = t,
                    n.fromWorld = e,
                    n.toComp = t,
                    n.fromComp = i,
                    n.sampleImage = s,
                    n.sourceRectAtTime = r.sourceRectAtTime.bind(r);
                var o = getDescriptor(a = TransformExpressionInterface((n._elem = r).finalTransform.mProp), "anchorPoint");
                return Object.defineProperties(n, {
                    hasParent: {
                        get: function() {
                            return r.hierarchy.length
                        }
                    },
                    parent: {
                        get: function() {
                            return r.hierarchy[0].layerInterface
                        }
                    },
                    rotation: getDescriptor(a, "rotation"),
                    scale: getDescriptor(a, "scale"),
                    position: getDescriptor(a, "position"),
                    opacity: getDescriptor(a, "opacity"),
                    anchorPoint: o,
                    anchor_point: o,
                    transform: {
                        get: function() {
                            return a
                        }
                    },
                    active: {
                        get: function() {
                            return r.isInRange
                        }
                    }
                }),
                    n.startTime = r.data.st,
                    n.index = r.data.ind,
                    n.source = r.data.refId,
                    n.height = 0 === r.data.ty ? r.data.h : 100,
                    n.width = 0 === r.data.ty ? r.data.w : 100,
                    n.inPoint = r.data.ip / r.comp.globalData.frameRate,
                    n.outPoint = r.data.op / r.comp.globalData.frameRate,
                    n._name = r.data.nm,
                    n.registerMaskInterface = function(t) {
                        n.mask = new MaskManagerInterface(t,r)
                    }
                    ,
                    n.registerEffectsInterface = function(t) {
                        n.effect = t
                    }
                    ,
                    n
            }
        }(), CompExpressionInterface = function(t) {
            function e(e) {
                for (var i = 0, s = t.layers.length; i < s; ) {
                    if (t.layers[i].nm === e || t.layers[i].ind === e)
                        return t.elements[i].layerInterface;
                    i += 1
                }
                return null
            }
            return Object.defineProperty(e, "_name", {
                value: t.data.nm
            }),
                (e.layer = e).pixelAspect = 1,
                e.height = t.data.h || t.globalData.compSize.h,
                e.width = t.data.w || t.globalData.compSize.w,
                e.pixelAspect = 1,
                e.frameDuration = 1 / t.globalData.frameRate,
                e.displayStartTime = 0,
                e.numLayers = t.layers.length,
                e
        }, TransformExpressionInterface = function(t) {
            function e(t) {
                switch (t) {
                    case "scale":
                    case "Scale":
                    case "ADBE Scale":
                    case 6:
                        return e.scale;
                    case "rotation":
                    case "Rotation":
                    case "ADBE Rotation":
                    case "ADBE Rotate Z":
                    case 10:
                        return e.rotation;
                    case "ADBE Rotate X":
                        return e.xRotation;
                    case "ADBE Rotate Y":
                        return e.yRotation;
                    case "position":
                    case "Position":
                    case "ADBE Position":
                    case 2:
                        return e.position;
                    case "ADBE Position_0":
                        return e.xPosition;
                    case "ADBE Position_1":
                        return e.yPosition;
                    case "ADBE Position_2":
                        return e.zPosition;
                    case "anchorPoint":
                    case "AnchorPoint":
                    case "Anchor Point":
                    case "ADBE AnchorPoint":
                    case 1:
                        return e.anchorPoint;
                    case "opacity":
                    case "Opacity":
                    case 11:
                        return e.opacity
                }
            }
            if (Object.defineProperty(e, "rotation", {
                get: ExpressionPropertyInterface(t.r || t.rz)
            }),
                Object.defineProperty(e, "zRotation", {
                    get: ExpressionPropertyInterface(t.rz || t.r)
                }),
                Object.defineProperty(e, "xRotation", {
                    get: ExpressionPropertyInterface(t.rx)
                }),
                Object.defineProperty(e, "yRotation", {
                    get: ExpressionPropertyInterface(t.ry)
                }),
                Object.defineProperty(e, "scale", {
                    get: ExpressionPropertyInterface(t.s)
                }),
                t.p)
                var i = ExpressionPropertyInterface(t.p);
            return Object.defineProperty(e, "position", {
                get: function() {
                    return t.p ? i() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0]
                }
            }),
                Object.defineProperty(e, "xPosition", {
                    get: ExpressionPropertyInterface(t.px)
                }),
                Object.defineProperty(e, "yPosition", {
                    get: ExpressionPropertyInterface(t.py)
                }),
                Object.defineProperty(e, "zPosition", {
                    get: ExpressionPropertyInterface(t.pz)
                }),
                Object.defineProperty(e, "anchorPoint", {
                    get: ExpressionPropertyInterface(t.a)
                }),
                Object.defineProperty(e, "opacity", {
                    get: ExpressionPropertyInterface(t.o)
                }),
                Object.defineProperty(e, "skew", {
                    get: ExpressionPropertyInterface(t.sk)
                }),
                Object.defineProperty(e, "skewAxis", {
                    get: ExpressionPropertyInterface(t.sa)
                }),
                Object.defineProperty(e, "orientation", {
                    get: ExpressionPropertyInterface(t.or)
                }),
                e
        }, ProjectInterface = function() {
            function t(t) {
                this.compositions.push(t)
            }
            return function() {
                function e(t) {
                    for (var e = 0, i = this.compositions.length; e < i; ) {
                        if (this.compositions[e].data && this.compositions[e].data.nm === t)
                            return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame),
                                this.compositions[e].compInterface;
                        e += 1
                    }
                }
                return e.compositions = [],
                    e.currentFrame = 0,
                    e.registerComposition = t,
                    e
            }
        }(), EffectsExpressionInterface = function() {
            function t(i, s, r, a) {
                var n, o = [], h = i.ef.length;
                for (n = 0; n < h; n += 1)
                    5 === i.ef[n].ty ? o.push(t(i.ef[n], s.effectElements[n], s.effectElements[n].propertyGroup, a)) : o.push(e(s.effectElements[n], i.ef[n].ty, a, l));
                function l(t) {
                    return 1 === t ? p : r(t - 1)
                }
                var p = function(t) {
                    for (var e = i.ef, s = 0, r = e.length; s < r; ) {
                        if (t === e[s].nm || t === e[s].mn || t === e[s].ix)
                            return 5 === e[s].ty ? o[s] : o[s]();
                        s += 1
                    }
                    return o[0]()
                };
                return p.propertyGroup = l,
                "ADBE Color Control" === i.mn && Object.defineProperty(p, "color", {
                    get: function() {
                        return o[0]()
                    }
                }),
                    Object.defineProperty(p, "numProperties", {
                        get: function() {
                            return i.np
                        }
                    }),
                    p.active = p.enabled = 0 !== i.en,
                    p
            }
            function e(t, e, i, s) {
                var r = ExpressionPropertyInterface(t.p);
                return t.p.setGroupProperty && t.p.setGroupProperty(s),
                    function() {
                        return 10 === e ? i.comp.compInterface(t.p.v) : r()
                    }
            }
            return {
                createEffectsInterface: function(e, i) {
                    if (e.effectsManager) {
                        var s, r = [], a = e.data.ef, n = e.effectsManager.effectElements.length;
                        for (s = 0; s < n; s += 1)
                            r.push(t(a[s], e.effectsManager.effectElements[s], i, e));
                        return function(t) {
                            for (var i = e.data.ef || [], s = 0, a = i.length; s < a; ) {
                                if (t === i[s].nm || t === i[s].mn || t === i[s].ix)
                                    return r[s];
                                s += 1
                            }
                        }
                    }
                }
            }
        }(), MaskManagerInterface = function() {
            function t(t, e) {
                this._mask = t,
                    this._data = e
            }
            return Object.defineProperty(t.prototype, "maskPath", {
                get: function() {
                    return this._mask.prop.k && this._mask.prop.getValue(),
                        this._mask.prop
                }
            }),
                Object.defineProperty(t.prototype, "maskOpacity", {
                    get: function() {
                        return this._mask.op.k && this._mask.op.getValue(),
                        100 * this._mask.op.v
                    }
                }),
                function(e, i) {
                    var s, r = createSizedArray(e.viewData.length), a = e.viewData.length;
                    for (s = 0; s < a; s += 1)
                        r[s] = new t(e.viewData[s],e.masksProperties[s]);
                    return function(t) {
                        for (s = 0; s < a; ) {
                            if (e.masksProperties[s].nm === t)
                                return r[s];
                            s += 1
                        }
                    }
                }
        }(), ExpressionPropertyInterface = function() {
            var t = {
                pv: 0,
                v: 0,
                mult: 1
            }
                , e = {
                pv: [0, 0, 0],
                v: [0, 0, 0],
                mult: 1
            };
            function i(t, e, i) {
                Object.defineProperty(t, "velocity", {
                    get: function() {
                        return e.getVelocityAtTime(e.comp.currentFrame)
                    }
                }),
                    t.numKeys = e.keyframes ? e.keyframes.length : 0,
                    t.key = function(s) {
                        if (t.numKeys) {
                            var r;
                            r = "s"in e.keyframes[s - 1] ? e.keyframes[s - 1].s : "e"in e.keyframes[s - 2] ? e.keyframes[s - 2].e : e.keyframes[s - 2].s;
                            var a = "unidimensional" === i ? new Number(r) : Object.assign({}, r);
                            return a.time = e.keyframes[s - 1].t / e.elem.comp.globalData.frameRate,
                                a
                        }
                        return 0
                    }
                    ,
                    t.valueAtTime = e.getValueAtTime,
                    t.speedAtTime = e.getSpeedAtTime,
                    t.velocityAtTime = e.getVelocityAtTime,
                    t.propertyGroup = e.propertyGroup
            }
            function s() {
                return t
            }
            return function(r) {
                return r ? "unidimensional" === r.propType ? function(e) {
                    e && "pv"in e || (e = t);
                    var s = 1 / e.mult
                        , r = e.pv * s
                        , a = new Number(r);
                    return a.value = r,
                        i(a, e, "unidimensional"),
                        function() {
                            return e.k && e.getValue(),
                                r = e.v * s,
                            a.value !== r && ((a = new Number(r)).value = r,
                                i(a, e, "unidimensional")),
                                a
                        }
                }(r) : function(t) {
                    t && "pv"in t || (t = e);
                    var s = 1 / t.mult
                        , r = t.pv.length
                        , a = createTypedArray("float32", r)
                        , n = createTypedArray("float32", r);
                    return a.value = n,
                        i(a, t, "multidimensional"),
                        function() {
                            t.k && t.getValue();
                            for (var e = 0; e < r; e += 1)
                                a[e] = n[e] = t.v[e] * s;
                            return a
                        }
                }(r) : s
            }
        }(), X4, Y4;
        function SliderEffect(t, e, i) {
            this.p = PropertyFactory.getProp(e, t.v, 0, 0, i)
        }
        function AngleEffect(t, e, i) {
            this.p = PropertyFactory.getProp(e, t.v, 0, 0, i)
        }
        function ColorEffect(t, e, i) {
            this.p = PropertyFactory.getProp(e, t.v, 1, 0, i)
        }
        function PointEffect(t, e, i) {
            this.p = PropertyFactory.getProp(e, t.v, 1, 0, i)
        }
        function LayerIndexEffect(t, e, i) {
            this.p = PropertyFactory.getProp(e, t.v, 0, 0, i)
        }
        function MaskIndexEffect(t, e, i) {
            this.p = PropertyFactory.getProp(e, t.v, 0, 0, i)
        }
        function CheckboxEffect(t, e, i) {
            this.p = PropertyFactory.getProp(e, t.v, 0, 0, i)
        }
        function NoValueEffect() {
            this.p = {}
        }
        function EffectsManager() {}
        function EffectsManager(t, e) {
            var i = t.ef || [];
            this.effectElements = [];
            var s, r, a = i.length;
            for (s = 0; s < a; s++)
                r = new GroupEffect(i[s],e),
                    this.effectElements.push(r)
        }
        function GroupEffect(t, e) {
            this.init(t, e)
        }
        X4 = function() {
            function t(t, e) {
                return this.textIndex = t + 1,
                    this.textTotal = e,
                    this.v = this.getValue() * this.mult,
                    this.v
            }
            return function(e, i) {
                this.pv = 1,
                    this.comp = e.comp,
                    this.elem = e,
                    this.mult = .01,
                    this.propType = "textSelector",
                    this.textTotal = i.totalChars,
                    this.selectorValue = 100,
                    this.lastValue = [1, 1, 1],
                    this.k = !0,
                    this.x = !0,
                    this.getValue = ExpressionManager.initiateExpression.bind(this)(e, i, this),
                    this.getMult = t,
                    this.getVelocityAtTime = expressionHelpers.getVelocityAtTime,
                    this.kf ? this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this) : this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this),
                    this.setGroupProperty = expressionHelpers.setGroupProperty
            }
        }(),
            Y4 = TextSelectorProp.getTextSelectorProp,
            TextSelectorProp.getTextSelectorProp = function(t, e, i) {
                return 1 === e.t ? new X4(t,e,i) : Y4(t, e, i)
            }
            ,
            extendPrototype([DynamicPropertyContainer], GroupEffect),
            GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties,
            GroupEffect.prototype.init = function(t, e) {
                this.data = t,
                    this.effectElements = [],
                    this.initDynamicPropertyContainer(e);
                var i, s, r = this.data.ef.length, a = this.data.ef;
                for (i = 0; i < r; i += 1) {
                    switch (s = null,
                        a[i].ty) {
                        case 0:
                            s = new SliderEffect(a[i],e,this);
                            break;
                        case 1:
                            s = new AngleEffect(a[i],e,this);
                            break;
                        case 2:
                            s = new ColorEffect(a[i],e,this);
                            break;
                        case 3:
                            s = new PointEffect(a[i],e,this);
                            break;
                        case 4:
                        case 7:
                            s = new CheckboxEffect(a[i],e,this);
                            break;
                        case 10:
                            s = new LayerIndexEffect(a[i],e,this);
                            break;
                        case 11:
                            s = new MaskIndexEffect(a[i],e,this);
                            break;
                        case 5:
                            s = new EffectsManager(a[i],e,this);
                            break;
                        default:
                            s = new NoValueEffect(a[i],e,this)
                    }
                    s && this.effectElements.push(s)
                }
            }
        ;
        var lottiejs = {}
            , _isFrozen = !1;
        function setLocationHref(t) {
            locationHref = t
        }
        function searchAnimations() {
            !0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations()
        }
        function setSubframeRendering(t) {
            subframeEnabled = t
        }
        function loadAnimation(t) {
            return !0 === standalone && (t.animationData = JSON.parse(animationData)),
                animationManager.loadAnimation(t)
        }
        function setQuality(t) {
            if ("string" == typeof t)
                switch (t) {
                    case "high":
                        defaultCurveSegments = 200;
                        break;
                    case "medium":
                        defaultCurveSegments = 50;
                        break;
                    case "low":
                        defaultCurveSegments = 10
                }
            else
                !isNaN(t) && 1 < t && (defaultCurveSegments = t);
            roundValues(!(50 <= defaultCurveSegments))
        }
        function inBrowser() {
            return "undefined" != typeof navigator
        }
        function installPlugin(t, e) {
            "expressions" === t && (expressionsPlugin = e)
        }
        function getFactory(t) {
            switch (t) {
                case "propertyFactory":
                    return PropertyFactory;
                case "shapePropertyFactory":
                    return ShapePropertyFactory;
                case "matrix":
                    return Matrix
            }
        }
        function checkReady() {
            "complete" === document.readyState && (clearInterval(readyStateCheckInterval),
                searchAnimations())
        }
        function getQueryVariable(t) {
            for (var e = queryString.split("&"), i = 0; i < e.length; i++) {
                var s = e[i].split("=");
                if (decodeURIComponent(s[0]) == t)
                    return decodeURIComponent(s[1])
            }
        }
        lottiejs.play = animationManager.play,
            lottiejs.pause = animationManager.pause,
            lottiejs.setLocationHref = setLocationHref,
            lottiejs.togglePause = animationManager.togglePause,
            lottiejs.setSpeed = animationManager.setSpeed,
            lottiejs.setDirection = animationManager.setDirection,
            lottiejs.stop = animationManager.stop,
            lottiejs.searchAnimations = searchAnimations,
            lottiejs.registerAnimation = animationManager.registerAnimation,
            lottiejs.loadAnimation = loadAnimation,
            lottiejs.setSubframeRendering = setSubframeRendering,
            lottiejs.resize = animationManager.resize,
            lottiejs.goToAndStop = animationManager.goToAndStop,
            lottiejs.destroy = animationManager.destroy,
            lottiejs.setQuality = setQuality,
            lottiejs.inBrowser = inBrowser,
            lottiejs.installPlugin = installPlugin,
            lottiejs.freeze = animationManager.freeze,
            lottiejs.unfreeze = animationManager.unfreeze,
            lottiejs.getRegisteredAnimations = animationManager.getRegisteredAnimations,
            lottiejs.__getFactory = getFactory,
            lottiejs.version = "5.5.3";
        var standalone = "__[STANDALONE]__"
            , animationData = "__[ANIMATIONDATA]__"
            , renderer = "";
        if (standalone) {
            var scripts = document.getElementsByTagName("script")
                , index = scripts.length - 1
                , myScript = scripts[index] || {
                src: ""
            }
                , queryString = myScript.src.replace(/^[^\?]+\??/, "");
            renderer = getQueryVariable("renderer")
        }
        var readyStateCheckInterval = setInterval(checkReady, 100);
        return lottiejs
    }
    ,
    "function" == typeof define && define.amd ? define((function() {
            return b(a)
        }
    )) : "object" == typeof module && module.exports ? module.exports = b(a) : (a.lottie = b(a),
        a.bodymovin = a.lottie)),
    function() {
        function t(t) {
            this.mode = i.MODE_8BIT_BYTE,
                this.data = t,
                this.parsedData = [];
            for (var e = 0, s = this.data.length; e < s; e++) {
                var r = []
                    , a = this.data.charCodeAt(e);
                a > 65536 ? (r[0] = 240 | (1835008 & a) >>> 18,
                    r[1] = 128 | (258048 & a) >>> 12,
                    r[2] = 128 | (4032 & a) >>> 6,
                    r[3] = 128 | 63 & a) : a > 2048 ? (r[0] = 224 | (61440 & a) >>> 12,
                    r[1] = 128 | (4032 & a) >>> 6,
                    r[2] = 128 | 63 & a) : a > 128 ? (r[0] = 192 | (1984 & a) >>> 6,
                    r[1] = 128 | 63 & a) : r[0] = a,
                    this.parsedData.push(r)
            }
            this.parsedData = Array.prototype.concat.apply([], this.parsedData),
            this.parsedData.length != this.data.length && (this.parsedData.unshift(191),
                this.parsedData.unshift(187),
                this.parsedData.unshift(239))
        }
        function e(t, e) {
            this.typeNumber = t,
                this.errorCorrectLevel = e,
                this.modules = null,
                this.moduleCount = 0,
                this.dataCache = null,
                this.dataList = []
        }
        t.prototype = {
            getLength: function(t) {
                return this.parsedData.length
            },
            write: function(t) {
                for (var e = 0, i = this.parsedData.length; e < i; e++)
                    t.put(this.parsedData[e], 8)
            }
        },
            e.prototype = {
                addData: function(e) {
                    var i = new t(e);
                    this.dataList.push(i),
                        this.dataCache = null
                },
                isDark: function(t, e) {
                    if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e)
                        throw new Error(t + "," + e);
                    return this.modules[t][e]
                },
                getModuleCount: function() {
                    return this.moduleCount
                },
                make: function() {
                    this.makeImpl(!1, this.getBestMaskPattern())
                },
                makeImpl: function(t, i) {
                    this.moduleCount = 4 * this.typeNumber + 17,
                        this.modules = new Array(this.moduleCount);
                    for (var s = 0; s < this.moduleCount; s++) {
                        this.modules[s] = new Array(this.moduleCount);
                        for (var r = 0; r < this.moduleCount; r++)
                            this.modules[s][r] = null
                    }
                    this.setupPositionProbePattern(0, 0),
                        this.setupPositionProbePattern(this.moduleCount - 7, 0),
                        this.setupPositionProbePattern(0, this.moduleCount - 7),
                        this.setupPositionAdjustPattern(),
                        this.setupTimingPattern(),
                        this.setupTypeInfo(t, i),
                    this.typeNumber >= 7 && this.setupTypeNumber(t),
                    null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)),
                        this.mapData(this.dataCache, i)
                },
                setupPositionProbePattern: function(t, e) {
                    for (var i = -1; i <= 7; i++)
                        if (!(t + i <= -1 || this.moduleCount <= t + i))
                            for (var s = -1; s <= 7; s++)
                                e + s <= -1 || this.moduleCount <= e + s || (this.modules[t + i][e + s] = 0 <= i && i <= 6 && (0 == s || 6 == s) || 0 <= s && s <= 6 && (0 == i || 6 == i) || 2 <= i && i <= 4 && 2 <= s && s <= 4)
                },
                getBestMaskPattern: function() {
                    for (var t = 0, e = 0, i = 0; i < 8; i++) {
                        this.makeImpl(!0, i);
                        var s = d.getLostPoint(this);
                        (0 == i || t > s) && (t = s,
                            e = i)
                    }
                    return e
                },
                createMovieClip: function(t, e, i) {
                    var s = t.createEmptyMovieClip(e, i);
                    this.make();
                    for (var r = 0; r < this.modules.length; r++)
                        for (var a = 1 * r, n = 0; n < this.modules[r].length; n++) {
                            var o = 1 * n;
                            this.modules[r][n] && (s.beginFill(0, 100),
                                s.moveTo(o, a),
                                s.lineTo(o + 1, a),
                                s.lineTo(o + 1, a + 1),
                                s.lineTo(o, a + 1),
                                s.endFill())
                        }
                    return s
                },
                setupTimingPattern: function() {
                    for (var t = 8; t < this.moduleCount - 8; t++)
                        null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
                    for (var e = 8; e < this.moduleCount - 8; e++)
                        null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0)
                },
                setupPositionAdjustPattern: function() {
                    for (var t = d.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++)
                        for (var i = 0; i < t.length; i++) {
                            var s = t[e]
                                , r = t[i];
                            if (null == this.modules[s][r])
                                for (var a = -2; a <= 2; a++)
                                    for (var n = -2; n <= 2; n++)
                                        this.modules[s + a][r + n] = -2 == a || 2 == a || -2 == n || 2 == n || 0 == a && 0 == n
                        }
                },
                setupTypeNumber: function(t) {
                    for (var e = d.getBCHTypeNumber(this.typeNumber), i = 0; i < 18; i++) {
                        var s = !t && 1 == (e >> i & 1);
                        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = s
                    }
                    for (i = 0; i < 18; i++) {
                        s = !t && 1 == (e >> i & 1);
                        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = s
                    }
                },
                setupTypeInfo: function(t, e) {
                    for (var i = this.errorCorrectLevel << 3 | e, s = d.getBCHTypeInfo(i), r = 0; r < 15; r++) {
                        var a = !t && 1 == (s >> r & 1);
                        r < 6 ? this.modules[r][8] = a : r < 8 ? this.modules[r + 1][8] = a : this.modules[this.moduleCount - 15 + r][8] = a
                    }
                    for (r = 0; r < 15; r++) {
                        a = !t && 1 == (s >> r & 1);
                        r < 8 ? this.modules[8][this.moduleCount - r - 1] = a : r < 9 ? this.modules[8][15 - r - 1 + 1] = a : this.modules[8][15 - r - 1] = a
                    }
                    this.modules[this.moduleCount - 8][8] = !t
                },
                mapData: function(t, e) {
                    for (var i = -1, s = this.moduleCount - 1, r = 7, a = 0, n = this.moduleCount - 1; n > 0; n -= 2)
                        for (6 == n && n--; ; ) {
                            for (var o = 0; o < 2; o++)
                                if (null == this.modules[s][n - o]) {
                                    var h = !1;
                                    a < t.length && (h = 1 == (t[a] >>> r & 1)),
                                    d.getMask(e, s, n - o) && (h = !h),
                                        this.modules[s][n - o] = h,
                                    -1 == --r && (a++,
                                        r = 7)
                                }
                            if ((s += i) < 0 || this.moduleCount <= s) {
                                s -= i,
                                    i = -i;
                                break
                            }
                        }
                }
            },
            e.PAD0 = 236,
            e.PAD1 = 17,
            e.createData = function(t, i, s) {
                for (var r = y.getRSBlocks(t, i), a = new g, n = 0; n < s.length; n++) {
                    var o = s[n];
                    a.put(o.mode, 4),
                        a.put(o.getLength(), d.getLengthInBits(o.mode, t)),
                        o.write(a)
                }
                var h = 0;
                for (n = 0; n < r.length; n++)
                    h += r[n].dataCount;
                if (a.getLengthInBits() > 8 * h)
                    throw new Error("code length overflow. (" + a.getLengthInBits() + ">" + 8 * h + ")");
                for (a.getLengthInBits() + 4 <= 8 * h && a.put(0, 4); a.getLengthInBits() % 8 != 0; )
                    a.putBit(!1);
                for (; !(a.getLengthInBits() >= 8 * h || (a.put(e.PAD0, 8),
                a.getLengthInBits() >= 8 * h)); )
                    a.put(e.PAD1, 8);
                return e.createBytes(a, r)
            }
            ,
            e.createBytes = function(t, e) {
                for (var i = 0, s = 0, r = 0, a = new Array(e.length), n = new Array(e.length), o = 0; o < e.length; o++) {
                    var h = e[o].dataCount
                        , l = e[o].totalCount - h;
                    s = Math.max(s, h),
                        r = Math.max(r, l),
                        a[o] = new Array(h);
                    for (var p = 0; p < a[o].length; p++)
                        a[o][p] = 255 & t.buffer[p + i];
                    i += h;
                    var f = d.getErrorCorrectPolynomial(l)
                        , m = new u(a[o],f.getLength() - 1).mod(f);
                    n[o] = new Array(f.getLength() - 1);
                    for (p = 0; p < n[o].length; p++) {
                        var c = p + m.getLength() - n[o].length;
                        n[o][p] = c >= 0 ? m.get(c) : 0
                    }
                }
                var y = 0;
                for (p = 0; p < e.length; p++)
                    y += e[p].totalCount;
                var g = new Array(y)
                    , v = 0;
                for (p = 0; p < s; p++)
                    for (o = 0; o < e.length; o++)
                        p < a[o].length && (g[v++] = a[o][p]);
                for (p = 0; p < r; p++)
                    for (o = 0; o < e.length; o++)
                        p < n[o].length && (g[v++] = n[o][p]);
                return g
            }
        ;
        for (var i = {
            MODE_NUMBER: 1,
            MODE_ALPHA_NUM: 2,
            MODE_8BIT_BYTE: 4,
            MODE_KANJI: 8
        }, s = {
            L: 1,
            M: 0,
            Q: 3,
            H: 2
        }, r = 0, a = 1, n = 2, o = 3, h = 4, l = 5, p = 6, f = 7, d = {
            PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function(t) {
                for (var e = t << 10; d.getBCHDigit(e) - d.getBCHDigit(d.G15) >= 0; )
                    e ^= d.G15 << d.getBCHDigit(e) - d.getBCHDigit(d.G15);
                return (t << 10 | e) ^ d.G15_MASK
            },
            getBCHTypeNumber: function(t) {
                for (var e = t << 12; d.getBCHDigit(e) - d.getBCHDigit(d.G18) >= 0; )
                    e ^= d.G18 << d.getBCHDigit(e) - d.getBCHDigit(d.G18);
                return t << 12 | e
            },
            getBCHDigit: function(t) {
                for (var e = 0; 0 != t; )
                    e++,
                        t >>>= 1;
                return e
            },
            getPatternPosition: function(t) {
                return d.PATTERN_POSITION_TABLE[t - 1]
            },
            getMask: function(t, e, i) {
                switch (t) {
                    case r:
                        return (e + i) % 2 == 0;
                    case a:
                        return e % 2 == 0;
                    case n:
                        return i % 3 == 0;
                    case o:
                        return (e + i) % 3 == 0;
                    case h:
                        return (Math.floor(e / 2) + Math.floor(i / 3)) % 2 == 0;
                    case l:
                        return e * i % 2 + e * i % 3 == 0;
                    case p:
                        return (e * i % 2 + e * i % 3) % 2 == 0;
                    case f:
                        return (e * i % 3 + (e + i) % 2) % 2 == 0;
                    default:
                        throw new Error("bad maskPattern:" + t)
                }
            },
            getErrorCorrectPolynomial: function(t) {
                for (var e = new u([1],0), i = 0; i < t; i++)
                    e = e.multiply(new u([1, m.gexp(i)],0));
                return e
            },
            getLengthInBits: function(t, e) {
                if (1 <= e && e < 10)
                    switch (t) {
                        case i.MODE_NUMBER:
                            return 10;
                        case i.MODE_ALPHA_NUM:
                            return 9;
                        case i.MODE_8BIT_BYTE:
                        case i.MODE_KANJI:
                            return 8;
                        default:
                            throw new Error("mode:" + t)
                    }
                else if (e < 27)
                    switch (t) {
                        case i.MODE_NUMBER:
                            return 12;
                        case i.MODE_ALPHA_NUM:
                            return 11;
                        case i.MODE_8BIT_BYTE:
                            return 16;
                        case i.MODE_KANJI:
                            return 10;
                        default:
                            throw new Error("mode:" + t)
                    }
                else {
                    if (!(e < 41))
                        throw new Error("type:" + e);
                    switch (t) {
                        case i.MODE_NUMBER:
                            return 14;
                        case i.MODE_ALPHA_NUM:
                            return 13;
                        case i.MODE_8BIT_BYTE:
                            return 16;
                        case i.MODE_KANJI:
                            return 12;
                        default:
                            throw new Error("mode:" + t)
                    }
                }
            },
            getLostPoint: function(t) {
                for (var e = t.getModuleCount(), i = 0, s = 0; s < e; s++)
                    for (var r = 0; r < e; r++) {
                        for (var a = 0, n = t.isDark(s, r), o = -1; o <= 1; o++)
                            if (!(s + o < 0 || e <= s + o))
                                for (var h = -1; h <= 1; h++)
                                    r + h < 0 || e <= r + h || 0 == o && 0 == h || n == t.isDark(s + o, r + h) && a++;
                        a > 5 && (i += 3 + a - 5)
                    }
                for (s = 0; s < e - 1; s++)
                    for (r = 0; r < e - 1; r++) {
                        var l = 0;
                        t.isDark(s, r) && l++,
                        t.isDark(s + 1, r) && l++,
                        t.isDark(s, r + 1) && l++,
                        t.isDark(s + 1, r + 1) && l++,
                        0 != l && 4 != l || (i += 3)
                    }
                for (s = 0; s < e; s++)
                    for (r = 0; r < e - 6; r++)
                        t.isDark(s, r) && !t.isDark(s, r + 1) && t.isDark(s, r + 2) && t.isDark(s, r + 3) && t.isDark(s, r + 4) && !t.isDark(s, r + 5) && t.isDark(s, r + 6) && (i += 40);
                for (r = 0; r < e; r++)
                    for (s = 0; s < e - 6; s++)
                        t.isDark(s, r) && !t.isDark(s + 1, r) && t.isDark(s + 2, r) && t.isDark(s + 3, r) && t.isDark(s + 4, r) && !t.isDark(s + 5, r) && t.isDark(s + 6, r) && (i += 40);
                var p = 0;
                for (r = 0; r < e; r++)
                    for (s = 0; s < e; s++)
                        t.isDark(s, r) && p++;
                return i += 10 * (Math.abs(100 * p / e / e - 50) / 5)
            }
        }, m = {
            glog: function(t) {
                if (t < 1)
                    throw new Error("glog(" + t + ")");
                return m.LOG_TABLE[t]
            },
            gexp: function(t) {
                for (; t < 0; )
                    t += 255;
                for (; t >= 256; )
                    t -= 255;
                return m.EXP_TABLE[t]
            },
            EXP_TABLE: new Array(256),
            LOG_TABLE: new Array(256)
        }, c = 0; c < 8; c++)
            m.EXP_TABLE[c] = 1 << c;
        for (c = 8; c < 256; c++)
            m.EXP_TABLE[c] = m.EXP_TABLE[c - 4] ^ m.EXP_TABLE[c - 5] ^ m.EXP_TABLE[c - 6] ^ m.EXP_TABLE[c - 8];
        for (c = 0; c < 255; c++)
            m.LOG_TABLE[m.EXP_TABLE[c]] = c;
        function u(t, e) {
            if (null == t.length)
                throw new Error(t.length + "/" + e);
            for (var i = 0; i < t.length && 0 == t[i]; )
                i++;
            this.num = new Array(t.length - i + e);
            for (var s = 0; s < t.length - i; s++)
                this.num[s] = t[s + i]
        }
        function y(t, e) {
            this.totalCount = t,
                this.dataCount = e
        }
        function g() {
            this.buffer = [],
                this.length = 0
        }
        u.prototype = {
            get: function(t) {
                return this.num[t]
            },
            getLength: function() {
                return this.num.length
            },
            multiply: function(t) {
                for (var e = new Array(this.getLength() + t.getLength() - 1), i = 0; i < this.getLength(); i++)
                    for (var s = 0; s < t.getLength(); s++)
                        e[i + s] ^= m.gexp(m.glog(this.get(i)) + m.glog(t.get(s)));
                return new u(e,0)
            },
            mod: function(t) {
                if (this.getLength() - t.getLength() < 0)
                    return this;
                for (var e = m.glog(this.get(0)) - m.glog(t.get(0)), i = new Array(this.getLength()), s = 0; s < this.getLength(); s++)
                    i[s] = this.get(s);
                for (s = 0; s < t.getLength(); s++)
                    i[s] ^= m.gexp(m.glog(t.get(s)) + e);
                return new u(i,0).mod(t)
            }
        },
            y.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
            y.getRSBlocks = function(t, e) {
                var i = y.getRsBlockTable(t, e);
                if (null == i)
                    throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);
                for (var s = i.length / 3, r = [], a = 0; a < s; a++)
                    for (var n = i[3 * a + 0], o = i[3 * a + 1], h = i[3 * a + 2], l = 0; l < n; l++)
                        r.push(new y(o,h));
                return r
            }
            ,
            y.getRsBlockTable = function(t, e) {
                switch (e) {
                    case s.L:
                        return y.RS_BLOCK_TABLE[4 * (t - 1) + 0];
                    case s.M:
                        return y.RS_BLOCK_TABLE[4 * (t - 1) + 1];
                    case s.Q:
                        return y.RS_BLOCK_TABLE[4 * (t - 1) + 2];
                    case s.H:
                        return y.RS_BLOCK_TABLE[4 * (t - 1) + 3];
                    default:
                        return
                }
            }
            ,
            g.prototype = {
                get: function(t) {
                    var e = Math.floor(t / 8);
                    return 1 == (this.buffer[e] >>> 7 - t % 8 & 1)
                },
                put: function(t, e) {
                    for (var i = 0; i < e; i++)
                        this.putBit(1 == (t >>> e - i - 1 & 1))
                },
                getLengthInBits: function() {
                    return this.length
                },
                putBit: function(t) {
                    var e = Math.floor(this.length / 8);
                    this.buffer.length <= e && this.buffer.push(0),
                    t && (this.buffer[e] |= 128 >>> this.length % 8),
                        this.length++
                }
            };
        var v = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
        function _() {
            var t = !1
                , e = navigator.userAgent;
            if (/android/i.test(e)) {
                t = !0;
                var i = e.toString().match(/android ([0-9]\.[0-9])/i);
                i && i[1] && (t = parseFloat(i[1]))
            }
            return t
        }
        var b = function() {
            var t = function(t, e) {
                this._el = t,
                    this._htOption = e
            };
            return t.prototype.draw = function(t) {
                var e = this._htOption
                    , i = this._el
                    , s = t.getModuleCount();
                Math.floor(e.width / s),
                    Math.floor(e.height / s);
                function r(t, e) {
                    var i = document.createElementNS("http://www.w3.org/2000/svg", t);
                    for (var s in e)
                        e.hasOwnProperty(s) && i.setAttribute(s, e[s]);
                    return i
                }
                this.clear();
                var a = r("svg", {
                    viewBox: "0 0 " + String(s) + " " + String(s),
                    width: "100%",
                    height: "100%",
                    fill: e.colorLight
                });
                a.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"),
                    i.appendChild(a),
                    a.appendChild(r("rect", {
                        fill: e.colorLight,
                        width: "100%",
                        height: "100%"
                    })),
                    a.appendChild(r("rect", {
                        fill: e.colorDark,
                        width: "1",
                        height: "1",
                        id: "template"
                    }));
                for (var n = 0; n < s; n++)
                    for (var o = 0; o < s; o++)
                        if (t.isDark(n, o)) {
                            var h = r("use", {
                                x: String(o),
                                y: String(n)
                            });
                            h.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template"),
                                a.appendChild(h)
                        }
            }
                ,
                t.prototype.clear = function() {
                    for (; this._el.hasChildNodes(); )
                        this._el.removeChild(this._el.lastChild)
                }
                ,
                t
        }()
            , x = "svg" === document.documentElement.tagName.toLowerCase() ? b : "undefined" == typeof CanvasRenderingContext2D ? function() {
            var t = function(t, e) {
                this._el = t,
                    this._htOption = e
            };
            return t.prototype.draw = function(t) {
                for (var e = this._htOption, i = this._el, s = t.getModuleCount(), r = Math.floor(e.width / s), a = Math.floor(e.height / s), n = ['<table style="border:0;border-collapse:collapse;">'], o = 0; o < s; o++) {
                    n.push("<tr>");
                    for (var h = 0; h < s; h++)
                        n.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + r + "px;height:" + a + "px;background-color:" + (t.isDark(o, h) ? e.colorDark : e.colorLight) + ';"></td>');
                    n.push("</tr>")
                }
                n.push("</table>"),
                    i.innerHTML = n.join("");
                var l = i.childNodes[0]
                    , p = (e.width - l.offsetWidth) / 2
                    , f = (e.height - l.offsetHeight) / 2;
                p > 0 && f > 0 && (l.style.margin = f + "px " + p + "px")
            }
                ,
                t.prototype.clear = function() {
                    this._el.innerHTML = ""
                }
                ,
                t
        }() : function() {
            function t() {
                this._elImage.src = this._elCanvas.toDataURL("image/png"),
                    this._elImage.style.display = "block",
                    this._elCanvas.style.display = "none"
            }
            if (this._android && this._android <= 2.1) {
                var e = 1 / window.devicePixelRatio
                    , i = CanvasRenderingContext2D.prototype.drawImage;
                CanvasRenderingContext2D.prototype.drawImage = function(t, s, r, a, n, o, h, l, p) {
                    if ("nodeName"in t && /img/i.test(t.nodeName))
                        for (var f = arguments.length - 1; f >= 1; f--)
                            arguments[f] = arguments[f] * e;
                    else
                        void 0 === l && (arguments[1] *= e,
                            arguments[2] *= e,
                            arguments[3] *= e,
                            arguments[4] *= e);
                    i.apply(this, arguments)
                }
            }
            function s(t, e) {
                var i = this;
                if (i._fFail = e,
                    i._fSuccess = t,
                null === i._bSupportDataURI) {
                    var s = document.createElement("img")
                        , r = function() {
                        i._bSupportDataURI = !1,
                        i._fFail && i._fFail.call(i)
                    };
                    return s.onabort = r,
                        s.onerror = r,
                        s.onload = function() {
                            i._bSupportDataURI = !0,
                            i._fSuccess && i._fSuccess.call(i)
                        }
                        ,
                        void (s.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
                }
                !0 === i._bSupportDataURI && i._fSuccess ? i._fSuccess.call(i) : !1 === i._bSupportDataURI && i._fFail && i._fFail.call(i)
            }
            var r = function(t, e) {
                this._bIsPainted = !1,
                    this._android = _(),
                    this._htOption = e,
                    this._elCanvas = document.createElement("canvas"),
                    this._elCanvas.width = e.width,
                    this._elCanvas.height = e.height,
                    t.appendChild(this._elCanvas),
                    this._el = t,
                    this._oContext = this._elCanvas.getContext("2d"),
                    this._bIsPainted = !1,
                    this._elImage = document.createElement("img"),
                    this._elImage.alt = "Scan me!",
                    this._elImage.style.display = "none",
                    this._el.appendChild(this._elImage),
                    this._bSupportDataURI = null
            };
            return r.prototype.draw = function(t) {
                var e = this._elImage
                    , i = this._oContext
                    , s = this._htOption
                    , r = t.getModuleCount()
                    , a = s.width / r
                    , n = s.height / r
                    , o = Math.round(a)
                    , h = Math.round(n);
                e.style.display = "none",
                    this.clear();
                for (var l = 0; l < r; l++)
                    for (var p = 0; p < r; p++) {
                        var f = t.isDark(l, p)
                            , d = p * a
                            , m = l * n;
                        i.strokeStyle = f ? s.colorDark : s.colorLight,
                            i.lineWidth = 1,
                            i.fillStyle = f ? s.colorDark : s.colorLight,
                            i.fillRect(d, m, a, n),
                            i.strokeRect(Math.floor(d) + .5, Math.floor(m) + .5, o, h),
                            i.strokeRect(Math.ceil(d) - .5, Math.ceil(m) - .5, o, h)
                    }
                this._bIsPainted = !0
            }
                ,
                r.prototype.makeImage = function() {
                    this._bIsPainted && s.call(this, t)
                }
                ,
                r.prototype.isPainted = function() {
                    return this._bIsPainted
                }
                ,
                r.prototype.clear = function() {
                    this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height),
                        this._bIsPainted = !1
                }
                ,
                r.prototype.round = function(t) {
                    return t ? Math.floor(1e3 * t) / 1e3 : t
                }
                ,
                r
        }();
        function S(t, e) {
            for (var i = 1, r = function(t) {
                var e = encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
                return e.length + (e.length != t ? 3 : 0)
            }(t), a = 0, n = v.length; a <= n; a++) {
                var o = 0;
                switch (e) {
                    case s.L:
                        o = v[a][0];
                        break;
                    case s.M:
                        o = v[a][1];
                        break;
                    case s.Q:
                        o = v[a][2];
                        break;
                    case s.H:
                        o = v[a][3]
                }
                if (r <= o)
                    break;
                i++
            }
            if (i > v.length)
                throw new Error("Too long data");
            return i
        }
        (QRCode = function(t, e) {
                if (this._htOption = {
                    width: 256,
                    height: 256,
                    typeNumber: 4,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: s.H
                },
                "string" == typeof e && (e = {
                    text: e
                }),
                    e)
                    for (var i in e)
                        this._htOption[i] = e[i];
                "string" == typeof t && (t = document.getElementById(t)),
                this._htOption.useSVG && (x = b),
                    this._android = _(),
                    this._el = t,
                    this._oQRCode = null,
                    this._oDrawing = new x(this._el,this._htOption),
                this._htOption.text && this.makeCode(this._htOption.text)
            }
        ).prototype.makeCode = function(t) {
            this._oQRCode = new e(S(t, this._htOption.correctLevel),this._htOption.correctLevel),
                this._oQRCode.addData(t),
                this._oQRCode.make(),
                this._el.title = t,
                this._oDrawing.draw(this._oQRCode),
                this.makeImage()
        }
            ,
            QRCode.prototype.makeImage = function() {
                "function" == typeof this._oDrawing.makeImage && (!this._android || this._android >= 3) && this._oDrawing.makeImage()
            }
            ,
            QRCode.prototype.clear = function() {
                this._oDrawing.clear()
            }
            ,
            QRCode.CorrectLevel = s
    }();
