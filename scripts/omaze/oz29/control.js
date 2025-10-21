! function() {
    "use strict";

    function a(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (null != n) {
                var r, o, i, a, c = [],
                    u = !0,
                    l = !1;
                try {
                    if (i = (n = n.call(t)).next, 0 === e) {
                        if (Object(n) !== n) return;
                        u = !1
                    } else
                        for (; !(u = (r = i.call(n)).done) && (c.push(r.value), c.length !== e); u = !0);
                } catch (t) {
                    l = !0, o = t
                } finally {
                    try {
                        if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return
                    } finally {
                        if (l) throw o
                    }
                }
                return c
            }
        }(t, e) || n(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function l(t) {
        return function(t) {
            if (Array.isArray(t)) return r(t)
        }(t) || function(t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || n(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function n(t, e) {
        var n;
        if (t) return "string" == typeof t ? r(t, e) : "Map" === (n = "Object" === (n = Object.prototype.toString.call(t).slice(8, -1)) && t.constructor ? t.constructor.name : n) || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(t, e) : void 0
    }

    function r(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }

    function o(n, r, t) {
        function c(t, e) {
            o.set(t, [].concat(l(null != (t = o.get(t)) ? t : []), l(e))), o.size === n.length && (t = Array.from(o.entries()).sort(function(t, e) {
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
                            r.matches && r.matches(a) && (i.push(r), o = !u), null !== r && void 0 !== r.querySelectorAll && r.querySelectorAll(a).length && (i = [].concat(l(i), l(Array.from(r.querySelectorAll(a)))), o = !u)
                        }
                    }), i.length && (c(e, i), o) && n.disconnect()
                })).observe(document.documentElement, {
                    childList: !0,
                    subtree: !0
                }), n
            }(t, e))
        })
    }

    function i(t, o, i) {
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

    function c(t, e, n) {
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

    function u(t) {
        return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function s(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (null != n) {
                var r, o, i, a, c = [],
                    u = !0,
                    l = !1;
                try {
                    if (i = (n = n.call(t)).next, 0 === e) {
                        if (Object(n) !== n) return;
                        u = !1
                    } else
                        for (; !(u = (r = i.call(n)).done) && (c.push(r.value), c.length !== e); u = !0);
                } catch (t) {
                    l = !0, o = t
                } finally {
                    try {
                        if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return
                    } finally {
                        if (l) throw o
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
        }), c()
    }), t(function(e, n) {
        return c(i("window.s"), function() {
            var t = window.s;
            t.events = e, t.linkTrackVars = "events", t.linkTrackEvents = e, t.tl(!0, "o", n)
        })
    });
    var d = t(function(t) {
        return c(i("window.DY"), function() {
            window.DY.API("event", t)
        })
    });
    t(function(t) {
        return c(i("window.dataLayer"), function() {
            window.dataLayer.push(t)
        })
    }), t(function(t, e) {
        return c(i("window.utag"), function() {
            window.trackingLockUtag || (window.trackingLockUtag = !0, "object" === u(window.utag) && "function" == typeof window.utag.link && (window.utag.link({
                monetate_event: "monetate-campaign-event",
                event_action: e,
                event_value: t,
                event_name: "experiment_assignement"
            }), setTimeout(function() {
                window.trackingLockUtag = !1
            }, 200)))
        })
    }), t(function(e, n, r) {
        return c(i("window.dataLayer"), function() {
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
        return c(i("window.ga"), function() {
            var t = s("function" == typeof window.ga.getAll && window.ga.getAll() || [], 1)[0];
            t && t.send({
                hitType: "event",
                eventCategory: r,
                eventAction: e,
                eventLabel: n,
                nonInteraction: !0
            })
        })
    });
    window.trackingLockUtag = window.trackingLockUtag || !1;
    var e = !1,
        y = !1;

    function m() {
        e || (h(), p(), e = !0)
    }

    function h() {
        window.addEventListener("urlchange", function(t) {
            setTimeout(function() {
                w(document.body)
            }, 100)
        }), window.addEventListener("dommutation", function(t) {
            var t = t.detail,
                e = t.addedNodes;
            t.target;
            !y && window.location.pathname.includes("/cancel") && (d({
                name: "subscription_cancellation_intent"
            }), y = !0), null != e && e.forEach(function(t) {
                t.nodeType === Node.ELEMENT_NODE && (b(t), v(t))
            })
        })
    }

    function p() {
        var e = setInterval(function() {
            var t = document.querySelector('[aria-labelledby="changeTierModalLabel"]');
            t && !t.hasAttribute("data-tracked") && t.hasAttribute("open") && (clearInterval(e), b(t))
        }, 500)
    }
    var w = function(t) {
            b(t), v(t)
        },
        b = function(t) {
            var t = t.querySelector("#subscription-management__changeTierModal") || ("subscription-management__changeTierModal" === t.id ? t : null) || ("changeTierModalLabel" === t.getAttribute("aria-labelledby") ? t : null);
            t && !t.hasAttribute("data-tracked") && (t.setAttribute("data-tracked", "true"), d({
                name: "tier_swap_modal_viewed"
            }), t = t.querySelector("#change-sub-tier-btn")) && !t.hasAttribute("data-tracked") && (t.setAttribute("data-tracked", "true"), t.addEventListener("click", function() {
                d({
                    name: "tier_swap"
                })
            }))
        },
        v = function(t) {
            var e = t.querySelector(".recharge-card") || (null != (e = t.classList) && e.contains("recharge-card") ? t : null);
            e && (e.innerText || e.textContent || "").includes("We have cancelled your subscription") && d({
                name: "subscription_cancellation_complete"
            })
        };

    function g(t) {
        return (g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }

    function S(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, function(t) {
                t = function(t, e) {
                    if ("object" !== g(t) || null === t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 === n) return ("string" === e ? String : Number)(t);
                    n = n.call(t, e || "default");
                    if ("object" !== g(n)) return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }(t, "string");
                return "symbol" === g(t) ? t : String(t)
            }(r.key), r)
        }
    }
    var L = function() {
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
        }]) && S(e.prototype, n), r && S(e, r), Object.defineProperty(e, "prototype", {
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

    function E(e, t) {
        var n, r = Object.keys(e);
        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        })), r.push.apply(r, n)), r
    }

    function k(r) {
        for (var t = 1; t < arguments.length; t++) {
            var o = null != arguments[t] ? arguments[t] : {};
            t % 2 ? E(Object(o), !0).forEach(function(t) {
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
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o)) : E(Object(o)).forEach(function(t) {
                Object.defineProperty(r, t, Object.getOwnPropertyDescriptor(o, t))
            })
        }
        return r
    }

    function O(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (null != n) {
                var r, o, i, a, c = [],
                    u = !0,
                    l = !1;
                try {
                    if (i = (n = n.call(t)).next, 0 === e) {
                        if (Object(n) !== n) return;
                        u = !1
                    } else
                        for (; !(u = (r = i.call(n)).done) && (c.push(r.value), c.length !== e); u = !0);
                } catch (t) {
                    l = !0, o = t
                } finally {
                    try {
                        if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return
                    } finally {
                        if (l) throw o
                    }
                }
                return c
            }
        }(t, e) || function(t, e) {
            var n;
            if (t) return "string" == typeof t ? j(t, e) : "Map" === (n = "Object" === (n = Object.prototype.toString.call(t).slice(8, -1)) && t.constructor ? t.constructor.name : n) || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? j(t, e) : void 0
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function j(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }
    var P, T = function() {
            for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
            try {
                return Promise.resolve(P.apply(this, t))
            } catch (t) {
                return Promise.reject(t)
            }
        },
        C = !(P = function() {
            return o(["#subscription-management__cards"], function(t) {
                t = O(t, 1)[0];
                t && 0 < t.length && U.isActive && (m(), U.currentContext = "subscriptions")
            }), n ? e ? e(t) : t : (t && t.then || (t = Promise.resolve(t)), e ? t.then(e) : t);
            var t, e, n
        }),
        U = {
            isActive: !0,
            modalEligible: !0,
            currentContext: null,
            customerName: null,
            modalInitialized: !1,
            modalSubmitted: !1
        },
        _ = "omaze_modal_shown";

    function I() {
        if (C) {
            var t = new URLSearchParams(window.location.search),
                e = new URLSearchParams(window.location.hash.includes("?") ? window.location.hash.split("?")[1] : "");
            if ("true" === (t.get("reset_modal") || e.get("reset_modal"))) return sessionStorage.removeItem(_), U.modalEligible = !0, e.has("reset_modal") && (e.delete("reset_modal"), t = e.toString() ? "#/?" + e.toString() : "#/", window.history.replaceState({}, "", window.location.pathname + t)), !0
        }
        return !sessionStorage.getItem(_) && U.modalEligible
    }

    function M() {
        sessionStorage.setItem(_, "true"), U.modalEligible = !1
    }

    function R(t) {
        (t = t.detail).newURL, t = t.pathname, U.isActive && ("/pages/my-subscriptions" === t ? N() : t.includes("/tools/recurring/pages") && t.includes("/subscriptions/") && t.includes("/cancel") ? D() : "/" !== t && "/account" !== t || q())
    }

    function x() {
        U.isActive = !1, U.currentContext = null
    }
    var N = function() {
            U.currentContext = "subscriptions", T(), M()
        },
        D = function() {
            U.currentContext = "cancellation", M(), m()
        },
        q = function() {
            I() || x()
        };
    "undefined" != typeof window && C && (window.resetModal = function() {
        return C ? (sessionStorage.removeItem(_), U.modalEligible = !0, U.modalInitialized = !1, y = e = !1, "Modal reset complete - navigate to /account to test") : "Modal testing not enabled"
    }, window.checkModal = function() {
        var t = I();
        return {
            eligible: t,
            sessionFlag: sessionStorage.getItem(_),
            trackingState: U.modalEligible,
            instructions: t ? "Modal will show" : "Modal blocked - use resetModalForTesting()"
        }
    }, window.trackingState = function() {
        return k({}, U)
    }), window.omazeExperimentLoaded || (window.omazeExperimentLoaded = !0, [].includes && "function" == typeof Promise && Array.from && (new L, window.addEventListener("urlchange", R), L = new CustomEvent("urlchange", {
        detail: {
            newURL: window.location.href,
            pathname: window.location.pathname,
            source: "initial"
        }
    }), R(L)))
}();