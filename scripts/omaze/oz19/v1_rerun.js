console.log('OZ-19-- RERUN 2');
! function() {
    "use strict";
    var r = {
        d: function(t, e) {
            for (var n in e) r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {
                enumerable: !0,
                get: e[n]
            })
        },
        o: function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
    };

    function a(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (null != n) {
                var r, o, i, a, c = [],
                    u = !0,
                    s = !1;
                try {
                    if (i = (n = n.call(t)).next, 0 === e) {
                        if (Object(n) !== n) return;
                        u = !1
                    } else
                        for (; !(u = (r = i.call(n)).done) && (c.push(r.value), c.length !== e); u = !0);
                } catch (t) {
                    s = !0, o = t
                } finally {
                    try {
                        if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return
                    } finally {
                        if (s) throw o
                    }
                }
                return c
            }
        }(t, e) || n(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function s(t) {
        return function(t) {
            if (Array.isArray(t)) return o(t)
        }(t) || function(t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || n(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function n(t, e) {
        var n;
        if (t) return "string" == typeof t ? o(t, e) : "Map" === (n = "Object" === (n = Object.prototype.toString.call(t).slice(8, -1)) && t.constructor ? t.constructor.name : n) || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(t, e) : void 0
    }

    function o(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }

    function i(n, r, t) {
        function c(t, e) {
            o.set(t, [].concat(s(null != (t = o.get(t)) ? t : []), s(e))), o.size === n.length && (t = Array.from(o.entries()).sort(function(t, e) {
                return a(t, 1)[0] - a(e, 1)[0]
            }).map(function(t) {
                return a(t, 2)[1]
            }), r(t), o.clear())
        }
        var u = 2 < arguments.length && void 0 !== t && t,
            o = new Map,
            i = [];
        n.forEach(function(t, e) {
            i.push(function(a, e) {
                var n, t = document.querySelectorAll(a);
                if (t.length && c(e, Array.from(t)), !t.length || u) return (n = new MutationObserver(function(t) {
                    var o = !1,
                        i = [];
                    t.forEach(function(t) {
                        for (var e = 0, n = Array.from(t.addedNodes); e < n.length; e++) {
                            var r = n[e];
                            r.matches && r.matches(a) && (i.push(r), o = !u), null !== r && void 0 !== r.querySelectorAll && r.querySelectorAll(a).length && (i = [].concat(s(i), s(Array.from(r.querySelectorAll(a)))), o = !u)
                        }
                    }), i.length && (c(e, i), o) && n.disconnect()
                })).observe(document.documentElement, {
                    childList: !0,
                    subtree: !0
                }), n
            }(t, e))
        })
    }
    r.d({}, {
        _Y: function() {
            return U
        },
        Bo: function() {
            return rt
        }
    });
    var V = "OZ-19-cancellation-friction",
        R = 1;

    function l(t) {
        return document.querySelector(t)
    }

    function c(t, o, i) {
        var a = "string" == typeof t ? new Function("return " + t) : t;
        return new Promise(function(e, n) {
            var r = 0;
            (function t() {
                try {
                    a() ? e(a()) : (i || 200) < r ? n() : (r++, setTimeout(t, o || 50))
                } catch (t) {
                    console.warn(t)
                }
            })()
        })
    }

    function u(t, e, n) {
        return n ? e ? e(t) : t : (t && t.then || (t = Promise.resolve(t)), e ? t.then(e) : t)
    }

    function t(n) {
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            try {
                return Promise.resolve(n.apply(this, t))
            } catch (t) {
                return Promise.reject(t)
            }
        }
    }

    function d(t) {
        return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function z(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (null != n) {
                var r, o, i, a, c = [],
                    u = !0,
                    s = !1;
                try {
                    if (i = (n = n.call(t)).next, 0 === e) {
                        if (Object(n) !== n) return;
                        u = !1
                    } else
                        for (; !(u = (r = i.call(n)).done) && (c.push(r.value), c.length !== e); u = !0);
                } catch (t) {
                    s = !0, o = t
                } finally {
                    try {
                        if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return
                    } finally {
                        if (s) throw o
                    }
                }
                return c
            }
        }(t, e) || function(t, e) {
            var n;
            if (t) return "string" == typeof t ? f(t, e) : "Map" === (n = "Object" === (n = Object.prototype.toString.call(t).slice(8, -1)) && t.constructor ? t.constructor.name : n) || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? f(t, e) : void 0
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function f(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }
    t(function(t, e, n) {
        var r;
        if (null != (r = window) && null != (r = r.adobe) && null != (r = r.target) && r.trackEvent) return window.adobe.target.trackEvent({
            params: {
                action: t,
                label: e,
                category: n
            },
            mbox: t
        }), u()
    }), t(function(e, n) {
        return u(c("window.s"), function() {
            var t = window.s;
            t.events = e, t.linkTrackVars = "events", t.linkTrackEvents = e, t.tl(!0, "o", n)
        })
    });
    var p = t(function(t) {
        return u(c("window.DY"), function() {
            window.DY.API("event", t)
        })
    });
    t(function(t) {
        return u(c("window.dataLayer"), function() {
            window.dataLayer.push(t)
        })
    }), t(function(t, e) {
        return u(c("window.utag"), function() {
            window.trackingLockUtag || (window.trackingLockUtag = !0, "object" === d(window.utag) && "function" == typeof window.utag.link && (window.utag.link({
                monetate_event: "monetate-campaign-event",
                event_action: e,
                event_value: t,
                event_name: "experiment_assignement"
            }), setTimeout(function() {
                window.trackingLockUtag = !1
            }, 200)))
        })
    }), t(function(e, n, r) {
        return u(c("window.dataLayer"), function() {
            var t;
            window.dataLayer = window.dataLayer || [], window.dataLayer && (console.table("metric: ".concat(n)), t = {
                hitType: "event",
                eventCategory: r,
                eventAction: e,
                eventLabel: n,
                nonInteraction: !0
            }, console.log(":: Metric sent::", t), window.dataLayer.push(t))
        })
    }), t(function(e, n, r) {
        return u(c("window.ga"), function() {
            var t = z("function" == typeof window.ga.getAll && window.ga.getAll() || [], 1)[0];
            t && t.send({
                hitType: "event",
                eventCategory: r,
                eventAction: e,
                eventLabel: n,
                nonInteraction: !0
            })
        })
    });

    function m(t, e, n) {
        return n ? e ? e(t) : t : (t && t.then || (t = Promise.resolve(t)), e ? t.then(e) : t)
    }

    function h() {}

    function v(n) {
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            try {
                return Promise.resolve(n.apply(this, t))
            } catch (t) {
                return Promise.reject(t)
            }
        }
    }

    function b(t) {
        t = t();
        if (t && t.then) return t.then(h)
    }

    function y(t, e, n) {
        if (!t.s) {
            if (n instanceof g) {
                if (!n.s) return void(n.o = y.bind(null, t, e));
                1 & e && (e = n.s), n = n.v
            }
            n && n.then ? n.then(y.bind(null, t, e), y.bind(null, t, 2)) : (t.s = e, t.v = n, (e = t.o) && e(t))
        }
    }
    window.trackingLockUtag = window.trackingLockUtag || !1;
    var g = function() {
        function e() {}
        return e.prototype.then = function(n, r) {
            var o = new e,
                t = this.s;
            if (t) {
                t = 1 & t ? n : r;
                if (t) {
                    try {
                        y(o, 1, t(this.v))
                    } catch (t) {
                        y(o, 2, t)
                    }
                    return o
                }
                return this
            }
            return this.o = function(t) {
                try {
                    var e = t.v;
                    1 & t.s ? y(o, 1, n ? n(e) : e) : r ? y(o, 1, r(e)) : y(o, 2, e)
                } catch (t) {
                    y(o, 2, t)
                }
            }, o
        }, e
    }();

    function N(i, a) {
        var t, c = -1;
        t: {
            for (var u = 0; u < a.length; u++) {
                var s = a[u][0];
                if (s) {
                    var e = s();
                    if (e && e.then) break t;
                    if (e === i) {
                        c = u;
                        break
                    }
                } else c = u
            }
            if (-1 !== c) {
                do {
                    for (var n = a[c][1]; !n;) n = a[++c][1];
                    var r = n();
                    if (r && r.then) {
                        t = !0;
                        break t
                    }
                    var o = a[c][2]
                } while (c++, o && !o());
                return r
            }
        }
        var l = new g,
            d = y.bind(null, l, 2);
        return (t ? r.then(f) : e.then(function t(e) {
            for (;;) {
                if (e === i) {
                    c = u;
                    break
                }
                if (++u === a.length) {
                    if (-1 !== c) break;
                    return void y(l, 1, r)
                }
                if (s = a[u][0]) {
                    if ((e = s()) && e.then) return void e.then(t).then(void 0, d)
                } else c = u
            }
            do {
                for (var n = a[c][1]; !n;) n = a[++c][1];
                var r = n();
                if (r && r.then) return void r.then(f).then(void 0, d);
                var o = a[c][2]
            } while (c++, o && !o());
            y(l, 1, r)
        })).then(void 0, d), l;

        function f(t) {
            for (;;) {
                var e = a[c][2];
                if (!e || e()) break;
                for (var n = a[++c][1]; !n;) n = a[++c][1];
                if ((t = n()) && t.then) return void t.then(f).then(void 0, d)
            }
            y(l, 1, t)
        }
    }

    function w(t, e) {
        t = t();
        return t && t.then ? t.then(e) : e(t)
    }

    function C(t) {
        return (C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function e(e, t) {
        var n, r = Object.keys(e);
        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        })), r.push.apply(r, n)), r
    }

    function S(r) {
        for (var t = 1; t < arguments.length; t++) {
            var o = null != arguments[t] ? arguments[t] : {};
            t % 2 ? e(Object(o), !0).forEach(function(t) {
                var e, n;
                e = r, n = o[t = t], (t = function(t) {
                    t = function(t, e) {
                        if ("object" !== C(t) || null === t) return t;
                        var n = t[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === e ? String : Number)(t);
                        n = n.call(t, e || "default");
                        if ("object" !== C(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === C(t) ? t : String(t)
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : e(Object(o)).forEach(function(t) {
                Object.defineProperty(r, t, Object.getOwnPropertyDescriptor(o, t))
            })
        }
        return r
    }
    var k = !1,
        D = !1;

    function q(t) {
        var a, c, e, u, n, s, r, o, i = function() {
            var t = new URLSearchParams(window.location.search),
                e = new URLSearchParams(window.location.hash.includes("?") ? window.location.hash.split("?")[1] : "");
            return "true" === t.get("testing") || "true" === e.get("testing")
        };
        k && !i() || (i() && (k = !1), a = {
            isVisible: !"/checkout",
            isLoading: !"/pages/my-subscriptions",
            currentStep: 1,
            totalSteps: 4,
            steps: [{
                title: "Welcome back, ".concat(t, "!"),
                icon: "https://cdn-eu.dynamicyield.com/api/9881146/images/1d58b1ca8ce0.gif",
                description: "You've helped raise millions for incredible UK charities... and we're just getting started.",
                buttonText: "Continue"
            }, {
                title: "We love having you here",
                icon: "https://cdn-eu.dynamicyield.com/api/9881146/images/8d5902967d07.gif",
                description: "You've made a real difference transforming lives and increasing awareness.",
                buttonText: "Continue"
            }, {
                title: "You're a lifesaver",
                icon: "https://cdn-eu.dynamicyield.com/api/9881146/images/db89bdedfbf1.gif",
                description: "Together, we're saving lives and creating a world where everyone has a chance.",
                buttonText: "Continue"
            }, {
                title: 'Thank you for being part of the <span class="ccx-orange-light">Omaze Community!</span>',
                icon: "https://cdn-eu.dynamicyield.com/api/9880449/images/20942f316552.png",
                description: "We'd like to offer you free entries as a thank you for your loyalty!",
                buttonText: "Yes Please"
            }]
        }, c = function() {
            sessionStorage.setItem("omaze_experiment_active", "true"), window.location.href = "/pages/my-subscriptions"
        }, v(function() {
            var t = function(t, e) {
                try {
                    var n = t()
                } catch (t) {
                    return e(t)
                }
                return n && n.then ? n.then(void 0, e) : n
            }(function() {
                return m(fetch("https://omaze.co.uk/tools/public-api/subscriptions/665081889/update-tier", {
                    headers: {
                        accept: "*/*",
                        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/json",
                        priority: "u=1, i",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin"
                    },
                    referrer: "https://omaze.co.uk/pages/my-subscriptions",
                    body: JSON.stringify({
                        requestedVariantId: "41644844351574"
                    }),
                    method: "POST",
                    mode: "cors",
                    credentials: "include"
                }), function(t) {
                    t.ok, c()
                })
            }, function() {
                c()
            });
            if (t && t.then) return t.then(h)
        }), e = function() {
            return a.isVisible ? '\n      <div class="omaze-subscription-popup">\n        <div class="popup-backdrop" data-action="close"></div>\n        <div class="popup-container '.concat(a.currentStep === a.totalSteps ? "step-4" : "", '">\n          <div class="popup-header">\n            ').concat((n = Array.from({
                length: a.totalSteps
            }, function(t, e) {
                var e = e + 1,
                    n = e === a.currentStep,
                    r = "progress-item";
                return e < a.currentStep && (r += " completed"), n && (r += " active"), e <= a.currentStep && (r += " clickable"), '\n        <div class="'.concat(r, '" data-step="').concat(e, '">\n          <div class="progress-line"></div>\n        </div>\n      ')
            }).join(""), '<div class="ccx-progress-bar">'.concat(n, "</div>")), '\n          </div>\n          <div class="popup-body">\n            ').concat((n = a.steps[a.currentStep - 1], a.isLoading ? '\n          <div class="step-content loading-content">            \n            <h3 class="step-title">Processing your request...</h3>\n            <p class="step-description">Please wait while we redirect you.</p>\n            <div class="step-icon"><img src="'.concat(n.icon, '" alt="Step Icon"></div>\n            <div class="loading-spinner"><div class="spinner"></div></div>\n          </div>\n        ') : '\n      <div class="step-content">\n        <div class="step-header-icon">\n          <svg width="121" height="82" viewBox="0 0 121 82" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M60.4971 41.8168C58.3386 41.8168 56.2692 41.3274 54.4445 40.4598C54.2443 40.3708 54.044 40.3708 53.8437 40.4598C53.1094 40.8602 52.4196 41.3052 51.7966 41.8168C51.4628 42.0838 51.5073 42.5732 51.8633 42.7957C54.4223 44.2417 57.3595 45.0648 60.4971 45.0648C63.6346 45.0648 66.5718 44.2417 69.1308 42.7957C69.4868 42.5954 69.5313 42.0838 69.1976 41.8168C68.5523 41.3052 67.8625 40.8602 67.1504 40.4598C66.9724 40.3708 66.7499 40.3708 66.5496 40.4598C64.7249 41.3274 62.6555 41.8168 60.4971 41.8168Z" />\n            <path d="M73.3813 37.0341C69.7542 34.0976 65.1703 32.4736 60.4974 32.4736C56.0248 32.4736 51.7746 33.8974 48.2143 36.5892C48.2143 36.5892 47.4578 37.1898 46.8792 37.7015C46.6567 37.9017 46.6122 38.2354 46.8125 38.4801C47.2575 39.014 47.7693 39.5924 48.2588 40.0818C48.4591 40.2821 48.7929 40.3043 49.0154 40.1263C49.5272 39.7037 50.1948 39.2142 50.1948 39.2142C53.1988 36.9674 56.7591 35.7661 60.5197 35.7661C64.4583 35.7661 68.2856 37.1231 71.3341 39.5924C71.3341 39.5924 71.6679 39.8594 72.0017 40.1263C72.2242 40.3043 72.558 40.3043 72.7582 40.1041C73.2478 39.6147 73.7596 39.0585 74.2046 38.5024C74.4049 38.2577 74.3604 37.924 74.1378 37.7237C73.7596 37.3678 73.3813 37.0341 73.3813 37.0341Z" />\n            <path d="M57.6274 10.2274C50.262 11.4064 44.4098 17.2349 43.2082 24.5984C42.6296 28.1356 43.1192 31.517 44.4098 34.4757C44.5878 34.8762 45.0773 34.9874 45.3888 34.7204C46.0342 34.1865 46.7017 33.6749 47.3915 33.2077V33.1854C51.2856 30.5826 55.7805 29.2256 60.4979 29.2256C65.2153 29.2256 69.7325 30.6049 73.6043 33.1854V33.2077C74.2941 33.6749 74.9839 34.1865 75.607 34.7204C75.9185 34.9874 76.4303 34.8762 76.5861 34.498C77.5206 32.3623 78.0324 30.0042 78.0324 27.5349C78.0324 16.9235 68.5754 8.49215 57.6274 10.2274ZM60.4979 25.9777C55.469 25.9777 50.6403 27.3347 46.4347 29.9375C46.3012 29.1589 46.2344 28.3358 46.2344 27.5127C46.2344 19.6375 52.643 13.2306 60.5202 13.2306C68.3974 13.2306 74.8059 19.6375 74.8059 27.5127C74.8059 28.3358 74.7391 29.1366 74.6056 29.9375C70.3555 27.3569 65.5268 25.9777 60.4979 25.9777Z" />\n            <path d="M48.8468 53.0017C46.4019 53.0017 44.4195 53.9544 43.2081 55.173C42.1067 53.7772 40.4548 53.0017 38.5825 53.0017C36.6002 53.0017 35.0804 53.8436 34.0451 54.885V53.9987C34.0451 53.6886 33.8028 53.4448 33.4945 53.4448H31.0936C30.7853 53.4448 30.543 53.6886 30.543 53.9987V69.486C30.543 69.7961 30.7853 70.0399 31.0936 70.0399H33.4945C33.8028 70.0399 34.0451 69.7961 34.0451 69.486V58.2306C34.8381 57.0785 36.1597 56.1922 37.5033 56.1922C39.3094 56.1922 41.2257 57.2336 41.2257 60.7785V69.486C41.2257 69.7961 41.468 70.0399 41.7763 70.0399H44.1772C44.4856 70.0399 44.7279 69.7961 44.7279 69.486V60.1139C44.7279 59.4935 44.6618 58.8953 44.5737 58.3414C45.3666 57.1228 46.7763 56.1922 48.208 56.1922C50.0142 56.1922 51.9304 57.2336 51.9304 60.7785V69.486C51.9304 69.7961 52.1727 70.0399 52.4811 70.0399H54.882C55.1903 70.0399 55.4326 69.7961 55.4326 69.486V60.1139C55.4326 55.6826 52.3489 53.0017 48.8468 53.0017Z" />\n            <path d="M74.4633 53.4448H72.0624C71.7541 53.4448 71.5118 53.6886 71.5118 53.9987V55.594C70.2563 54.0431 68.4722 53.0017 66.2475 53.0017C61.6 53.0017 57.8335 56.9234 57.8335 61.7313C57.8335 66.5613 61.6 70.4608 66.2475 70.4608C68.4722 70.4608 70.2563 69.4195 71.5118 67.8685V69.4638C71.5118 69.774 71.7541 70.0177 72.0624 70.0177H74.4633C74.7717 70.0177 75.014 69.774 75.014 69.4638V53.9987C75.014 53.6886 74.7717 53.4448 74.4633 53.4448ZM66.5559 67.226C63.8026 67.226 61.5559 64.7667 61.5559 61.7534C61.5559 58.718 63.8026 56.2808 66.5559 56.2808C69.3092 56.2808 71.5558 58.7402 71.5558 61.7534C71.5558 64.7667 69.3312 67.226 66.5559 67.226Z" />\n            <path d="M101.997 53.0017C97.3719 53.1346 93.7156 56.9677 93.7156 61.6205C93.7156 66.7829 97.3059 70.483 102.394 70.483C105.456 70.483 108.011 69.3087 109.707 67.0488C109.905 66.7829 109.839 66.4062 109.552 66.2511L107.702 65.099C107.46 64.9439 107.13 65.0104 106.953 65.2541C105.94 66.65 104.42 67.6027 102.372 67.6027C99.6406 67.6027 97.394 65.9853 96.9094 62.9942H109.927C110.213 62.9942 110.456 62.7726 110.478 62.4846C110.5 62.263 110.5 62.0193 110.5 61.7977C110.544 56.9012 107.13 53.0017 101.997 53.0017ZM97.0195 60.2025C97.6362 57.433 99.949 55.9263 102.35 55.9263C104.597 55.9263 106.755 57.721 107.174 60.2025H97.0195Z" />\n            <path d="M19.4206 52.5586C14.4868 52.5586 10.5 56.591 10.5 61.5319C10.5 66.4949 14.5088 70.5051 19.4206 70.5051C24.3545 70.5051 28.3413 66.4727 28.3413 61.5319C28.3413 56.5689 24.3545 52.5586 19.4206 52.5586ZM19.4206 67.359C16.4251 67.359 14.0022 64.7667 14.0022 61.554C14.0022 58.3414 16.4251 55.7491 19.4206 55.7491C22.4162 55.7491 24.8391 58.3414 24.8391 61.554C24.8391 64.7667 22.4162 67.359 19.4206 67.359Z" />\n            <path d="M92.3277 66.9603C92.1956 66.7166 91.8872 66.6058 91.6229 66.7166C90.6978 67.1154 88.6714 68.0017 86.0062 68.046C82.5921 68.0903 81.2045 67.1597 81.2045 67.1597L91.689 56.6133C91.8652 56.4361 91.9753 56.1924 91.9753 55.9487V53.9768C91.9753 53.6666 91.733 53.4229 91.4247 53.4229H79.0019C78.6935 53.4229 78.4512 53.6666 78.4512 53.9768V55.8822C78.4512 56.1924 78.6935 56.4361 79.0019 56.4361L87.7022 56.2588L78.1208 65.8968C77.9446 66.0741 77.8345 66.3178 77.8345 66.5615V68.9544C77.8345 69.1538 77.9446 69.3532 78.1428 69.4418C79.0019 69.8849 81.645 71.0371 85.5657 71.0371C89.2441 71.0371 91.9092 69.9292 92.9665 69.4197C93.2528 69.2867 93.363 68.9322 93.2088 68.6663L92.3277 66.9603Z" />\n          </svg>\n        </div>\n        <h3 class="step-title">'.concat(n.title, '</h3>\n        <div class="step-icon"><img src="').concat(n.icon, '" alt="Step Icon"></div>\n        ').concat(a.currentStep === a.totalSteps ? "" : '<p class="step-description">'.concat(n.description, "</p>"), "\n      </div>\n    ")), "\n            ").concat((n = a.currentStep === a.totalSteps, t = a.steps[a.currentStep - 1], e = "", e += n ? '\n        <button type="button" class="btn btn-primary" data-action="checkout">'.concat(t.buttonText, '</button>\n        <button type="button" class="btn btn-secondary" data-action="skip">Skip</button>\n      ') : '<button type="button" class="btn btn-primary" data-action="next">'.concat(t.buttonText, "</button>"), '<div class="navigation-buttons">'.concat(e, "</div>")), "\n          </div>\n        </div>\n      </div>\n    ") : "";
            var t, e, n
        }, u = function(t) {
            a = S(S({}, a), t), (t = l(".omaze-subscription-popup")) && t.remove(), a.isVisible && (document.body.insertAdjacentHTML("beforeend", e()), setTimeout(r, 500))
        }, n = function() {
            u({
                isVisible: !0
            }), p({
                name: "modal_step_1_viewed"
            })
        }, s = v(function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0],
                n = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
            return console.log(1), rt(), U().modalSubmitted = !0, b(function() {
                if (e) return u({
                    isVisible: !0,
                    isLoading: !0
                }), b(function() {
                    if (n) {
                        var t = new Promise(function(t) {
                            return setTimeout(t, 1e3)
                        });
                        if (!void 0) return t && t.then ? t.then(h) : Promise.resolve()
                    } else setTimeout(function() {
                        u({
                            isVisible: !1
                        });
                        var t = l(".omaze-subscription-popup");
                        t && t.remove()
                    }, 2e3)
                });
                u({
                    isVisible: !1
                });
                var t = l(".omaze-subscription-popup");
                t && t.remove()
            })
        }), r = function() {
            var t = l(".omaze-subscription-popup");
            t && (t.removeEventListener("click", o), t.addEventListener("click", o))
        }, o = v(function(r) {
            var e = !1,
                o = r.target,
                i = o.getAttribute("data-action");
            return w(function() {
                if (o.classList.contains("popup-backdrop")) return p({
                    name: "modal_abandoned_outside_click"
                }), m(new Promise(function(t) {
                    return setTimeout(t, 300)
                }), function() {
                    s(), c(), e = !0
                })
            }, function(t) {
                var n = !1;
                return e ? t : w(function() {
                    var t, e;
                    if (i) return r.preventDefault(), r.stopPropagation(), t = N(i, [
                        [function() {
                            return "close"
                        }, function() {
                            return p({
                                name: "modal_abandoned_on_step_".concat(a.currentStep)
                            }), m(s(!0, !0), function() {
                                c(), 0
                            })
                        }],
                        [function() {
                            return "back"
                        }, function() {
                            1 < a.currentStep && u({
                                currentStep: a.currentStep - 1
                            }), 0
                        }],
                        [function() {
                            return "next"
                        }, function() {
                            var t;
                            p({
                                name: "modal_step_".concat(a.currentStep, "_completed")
                            }), a.currentStep < a.totalSteps && (t = a.currentStep + 1, p({
                                name: "modal_step_".concat(t, "_viewed")
                            }), u({
                                currentStep: t
                            })), 0
                        }],
                        [function() {
                            return "checkout"
                        }, function() {
                            return p({
                                name: "30_entries_cta_click"
                            }), m(s(!0, !0), function() {
                                window.location.href = "https://omaze.co.uk/cart/clear?return_to=/cart/add?items[][id]=43275484528726%26items[][quantity]=1%26return_to=/checkout?discount=5SE7HS3Y1P3C%2526skip_shop_pay=true", 0
                            })
                        }],
                        [function() {
                            return "skip"
                        }, function() {
                            return p({
                                name: "modal_offer_skipped"
                            }), m(s(!0, !0), function() {
                                c(), 0
                            })
                        }]
                    ]), e = function() {
                        n = !0
                    }, t && t.then ? t.then(e) : e(t)
                }, function(t) {
                    if (n) return t;
                    var t = o.closest(".progress-item.clickable[data-step]");
                    if (t)(t = parseInt(t.getAttribute("data-step") || "", 10)) && 1 <= (t = t) && t <= a.totalSteps && u({
                        currentStep: t
                    });
                    else {
                        t = o.closest(".popup-container");
                        if (!t) return p({
                            name: "modal_abandoned_outside_click"
                        }), m(new Promise(function(t) {
                            return setTimeout(t, 300)
                        }), function() {
                            s(), c()
                        })
                    }
                })
            })
        }), D && !i() || U().modalSubmitted || (document.addEventListener("click", function(t) {
            var e;
            U().modalSubmitted || !(e = t.target).matches("#manage-subscriptions-button") && !e.closest("#manage-subscriptions-button") || (t.preventDefault(), t.stopPropagation(), n())
        }), D = !0), k = !0)
    }
    "undefined" != typeof window && (window.testModal = function() {
        window.location.href = "/account#/?reset_modal=true&testing=true"
    }, window.forceShowModal = function() {
        sessionStorage.removeItem("omaze_modal_shown"), k = !1, window.location.href = "/account#/?reset_modal=true&testing=true"
    });
    var Z = function(t) {
            var e, n = V,
                r = R,
                n = "".concat(n, "-variation-").concat(r);
            document.body.classList.add(e || n), q(t)
        },
        L = !1,
        O = !1;

    function H() {
        L || (Y(), F(), L = !0)
    }

    function Y() {
        window.addEventListener("urlchange", function(t) {
            setTimeout(function() {
                W(document.body)
            }, 100)
        }), window.addEventListener("dommutation", function(t) {
            var t = t.detail,
                e = t.addedNodes;
            t.target;
            !O && window.location.pathname.includes("/cancel") && (p({
                name: "subscription_cancellation_intent"
            }), O = !0), null != e && e.forEach(function(t) {
                t.nodeType === Node.ELEMENT_NODE && (_(t), B(t))
            })
        })
    }

    function F() {
        var e = setInterval(function() {
            var t = document.querySelector('[aria-labelledby="changeTierModalLabel"]');
            t && !t.hasAttribute("data-tracked") && t.hasAttribute("open") && (clearInterval(e), _(t))
        }, 500)
    }
    var W = function(t) {
            _(t), B(t)
        },
        _ = function(t) {
            var t = t.querySelector("#subscription-management__changeTierModal") || ("subscription-management__changeTierModal" === t.id ? t : null) || ("changeTierModalLabel" === t.getAttribute("aria-labelledby") ? t : null);
            t && !t.hasAttribute("data-tracked") && (t.setAttribute("data-tracked", "true"), p({
                name: "tier_swap_modal_viewed"
            }), t = t.querySelector("#change-sub-tier-btn")) && !t.hasAttribute("data-tracked") && (t.setAttribute("data-tracked", "true"), t.addEventListener("click", function() {
                p({
                    name: "tier_swap"
                })
            }))
        },
        B = function(t) {
            var e = t.querySelector(".recharge-card") || (null != (e = t.classList) && e.contains("recharge-card") ? t : null);
            e && (e.innerText || e.textContent || "").includes("We have cancelled your subscription") && p({
                name: "subscription_cancellation_complete"
            })
        };

    function P(t) {
        return (P = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function $(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, function(t) {
                t = function(t, e) {
                    if ("object" !== P(t) || null === t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 === n) return ("string" === e ? String : Number)(t);
                    n = n.call(t, e || "default");
                    if ("object" !== P(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }(t, "string");
                return "symbol" === P(t) ? t : String(t)
            }(r.key), r)
        }
    }
    var j = function() {
        function t() {
            if (!(this instanceof t)) throw new TypeError("Cannot call a class as a function");
            this.currentURL = window.location.href, this.isProcessing = !1, this.observer = null, this.init()
        }
        var e, n, r;
        return e = t, (n = [{
            key: "init",
            value: function() {
                this.setupMutationObserver(), this.setupNavigationListeners()
            }
        }, {
            key: "setupMutationObserver",
            value: function() {
                var e = this;
                this.observer = new MutationObserver(function(t) {
                    e.isProcessing || (window.location.href !== e.currentURL && e.handleURLChange("mutation"), e.handleMutations(t))
                }), this.observer.observe(document, {
                    childList: !0,
                    subtree: !0,
                    attributes: !0,
                    attributeFilter: ["href", "src"]
                })
            }
        }, {
            key: "handleMutations",
            value: function(t) {
                t.forEach(function(t) {
                    var e;
                    "childList" === t.type && 0 < t.addedNodes.length && 0 < (e = Array.from(t.addedNodes).filter(function(t) {
                        return t.nodeType === Node.ELEMENT_NODE
                    })).length && window.dispatchEvent(new CustomEvent("dommutation", {
                        detail: {
                            type: t.type,
                            target: t.target,
                            addedNodes: e,
                            timestamp: (new Date).toISOString()
                        }
                    })), ("characterData" === t.type || "childList" === t.type && t.target.textContent) && window.dispatchEvent(new CustomEvent("domtextchange", {
                        detail: {
                            type: t.type,
                            target: t.target,
                            textContent: t.target.textContent,
                            timestamp: (new Date).toISOString()
                        }
                    }))
                })
            }
        }, {
            key: "setupNavigationListeners",
            value: function() {
                var r = this,
                    o = history.pushState,
                    i = history.replaceState;
                history.pushState = function() {
                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    o.apply(history, e), setTimeout(function() {
                        return r.checkURLChange("pushState")
                    }, 0)
                }, history.replaceState = function() {
                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                    i.apply(history, e), setTimeout(function() {
                        return r.checkURLChange("replaceState")
                    }, 0)
                }, window.addEventListener("popstate", function() {
                    setTimeout(function() {
                        return r.checkURLChange("popstate")
                    }, 0)
                }), window.addEventListener("hashchange", function() {
                    setTimeout(function() {
                        return r.checkURLChange("hashchange")
                    }, 0)
                })
            }
        }, {
            key: "checkURLChange",
            value: function(t) {
                this.isProcessing || window.location.href !== this.currentURL && this.handleURLChange(t)
            }
        }, {
            key: "handleURLChange",
            value: function(t) {
                var e = this,
                    n = (this.isProcessing = !0, this.currentURL),
                    r = window.location.href;
                this.currentURL = r, window.dispatchEvent(new CustomEvent("urlchange", {
                    detail: {
                        newURL: r,
                        oldURL: n,
                        pathname: window.location.pathname,
                        source: t
                    }
                })), setTimeout(function() {
                    e.isProcessing = !1
                }, 10)
            }
        }, {
            key: "destroy",
            value: function() {
                this.observer && this.observer.disconnect()
            }
        }]) && $(e.prototype, n), r && $(e, r), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t
    }();

    function A(t) {
        return (A = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function G(e, t) {
        var n, r = Object.keys(e);
        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        })), r.push.apply(r, n)), r
    }

    function J(r) {
        for (var t = 1; t < arguments.length; t++) {
            var o = null != arguments[t] ? arguments[t] : {};
            t % 2 ? G(Object(o), !0).forEach(function(t) {
                var e, n;
                e = r, n = o[t = t], (t = function(t) {
                    t = function(t, e) {
                        if ("object" !== A(t) || null === t) return t;
                        var n = t[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === e ? String : Number)(t);
                        n = n.call(t, e || "default");
                        if ("object" !== A(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(t, "string");
                    return "symbol" === A(t) ? t : String(t)
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : G(Object(o)).forEach(function(t) {
                Object.defineProperty(r, t, Object.getOwnPropertyDescriptor(o, t))
            })
        }
        return r
    }

    function K(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (null != n) {
                var r, o, i, a, c = [],
                    u = !0,
                    s = !1;
                try {
                    if (i = (n = n.call(t)).next, 0 === e) {
                        if (Object(n) !== n) return;
                        u = !1
                    } else
                        for (; !(u = (r = i.call(n)).done) && (c.push(r.value), c.length !== e); u = !0);
                } catch (t) {
                    s = !0, o = t
                } finally {
                    try {
                        if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return
                    } finally {
                        if (s) throw o
                    }
                }
                return c
            }
        }(t, e) || function(t, e) {
            var n;
            if (t) return "string" == typeof t ? Q(t, e) : "Map" === (n = "Object" === (n = Object.prototype.toString.call(t).slice(8, -1)) && t.constructor ? t.constructor.name : n) || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Q(t, e) : void 0
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function Q(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }
    var X, tt = function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            try {
                return Promise.resolve(X.apply(this, t))
            } catch (t) {
                return Promise.reject(t)
            }
        },
        E = !(X = function() {
            return i(["#subscription-management__cards"], function(t) {
                t = K(t, 1)[0];
                t && 0 < t.length && T.isActive && (H(), T.currentContext = "subscriptions")
            }), n ? e ? e(t) : t : (t && t.then || (t = Promise.resolve(t)), e ? t.then(e) : t);
            var t, e, n
        }),
        T = {
            isActive: !0,
            modalEligible: !0,
            currentContext: null,
            customerName: null,
            modalInitialized: !1,
            modalSubmitted: !1
        },
        M = "omaze_modal_shown";

    function I() {
        if (E) {
            var t = new URLSearchParams(window.location.search),
                e = new URLSearchParams(window.location.hash.includes("?") ? window.location.hash.split("?")[1] : "");
            if ("true" === (t.get("reset_modal") || e.get("reset_modal"))) return sessionStorage.removeItem(M), T.modalEligible = !0, e.has("reset_modal") && (e.delete("reset_modal"), t = e.toString() ? "#/?" + e.toString() : "#/", window.history.replaceState({}, "", window.location.pathname + t)), !0
        }
        return !sessionStorage.getItem(M) && T.modalEligible
    }

    function x() {
        sessionStorage.setItem(M, "true"), T.modalEligible = !1
    }

    function et(t) {
        (t = t.detail).newURL;
        var e = t.pathname;
        if (T.isActive) switch (e) {
            case "/account":
                ot();
                break;
            case "/pages/my-subscriptions":
                it();
                break;
            default:
                e.includes("/tools/recurring/pages") && e.includes("/subscriptions/") && e.includes("/cancel") ? at() : "/" !== e && "/account" !== e || ct()
        }
    }

    function nt() {
        T.isActive = !1, T.currentContext = null
    }
    var rt = function() {
            T.modalSubmitted = !0, x()
        },
        ot = function() {
            var e;
            T.modalInitialized || sessionStorage.getItem(M) || (I() ? (T.currentContext = "account", e = function(t) {
                Z(t), T.modalInitialized = !0
            }, i([".template-customers_account .account-page #manage-subscriptions-button", "[customer-name]"], function(t) {
                t = K(t, 2), t[0], t = t[1][0].getAttribute("customer-name");
                T.customerName = t, e(t)
            })) : T.currentContext = "account")
        },
        it = function() {
            T.currentContext = "subscriptions", tt(), x()
        },
        at = function() {
            T.currentContext = "cancellation", x(), H()
        },
        ct = function() {
            I() || nt()
        },
        U = function() {
            return J({}, T)
        };
    "undefined" != typeof window && E && (window.resetModal = function() {
        return E ? (sessionStorage.removeItem(M), T.modalEligible = !0, T.modalInitialized = !1, O = L = !1, "Modal reset complete - navigate to /account to test") : "Modal testing not enabled"
    }, window.checkModal = function() {
        var t = I();
        return {
            eligible: t,
            sessionFlag: sessionStorage.getItem(M),
            trackingState: T.modalEligible,
            instructions: t ? "Modal will show" : "Modal blocked - use resetModalForTesting()"
        }
    }, window.trackingState = function() {
        return U()
    }), window.omazeExperimentLoaded || (window.omazeExperimentLoaded = !0, [].includes && "function" == typeof Promise && Array.from && (new j, window.addEventListener("urlchange", et), j = new CustomEvent("urlchange", {
        detail: {
            newURL: window.location.href,
            pathname: window.location.pathname,
            source: "initial"
        }
    }), et(j)))
}();