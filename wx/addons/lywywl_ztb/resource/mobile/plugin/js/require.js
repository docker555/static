var requirejs, require, define; !
    function(global) {
        function isFunction(e) {
            return "[object Function]" === ostring.call(e)
        }
        function isArray(e) {
            return "[object Array]" === ostring.call(e)
        }
        function each(e, r) {
            if (e) {
                var t;
                for (t = 0; t < e.length && (!e[t] || !r(e[t], t, e)); t += 1);
            }
        }
        function eachReverse(e, r) {
            if (e) {
                var t;
                for (t = e.length - 1; t > -1 && (!e[t] || !r(e[t], t, e)); t -= 1);
            }
        }
        function hasProp(e, r) {
            return hasOwn.call(e, r)
        }
        function getOwn(e, r) {
            return hasProp(e, r) && e[r]
        }
        function eachProp(e, r) {
            var t;
            for (t in e) if (hasProp(e, t) && r(e[t], t)) break
        }
        function mixin(e, r, t, i) {
            return r && eachProp(r,
                function(r, n) { ! t && hasProp(e, n) || (!i || "object" != typeof r || !r || isArray(r) || isFunction(r) || r instanceof RegExp ? e[n] = r: (e[n] || (e[n] = {}), mixin(e[n], r, t, i)))
                }),
                e
        }
        function bind(e, r) {
            return function() {
                return r.apply(e, arguments)
            }
        }
        function scripts() {
            return document.getElementsByTagName("script")
        }
        function defaultOnError(e) {
            throw e
        }
        function getGlobal(e) {
            if (!e) return e;
            var r = global;
            return each(e.split("."),
                function(e) {
                    r = r[e]
                }),
                r
        }
        function makeError(e, r, t, i) {
            var n = new Error(r + "\nhttp://requirejs.org/docs/errors.html#" + e);
            return n.requireType = e,
                n.requireModules = i,
            t && (n.originalError = t),
                n
        }
        function newContext(e) {
            function r(e) {
                var r, t, i = e.length;
                for (r = 0; r < i; r++) if ("." === (t = e[r])) e.splice(r, 1),
                    r -= 1;
                else if (".." === t) {
                    if (1 === r && (".." === e[2] || ".." === e[0])) break;
                    r > 0 && (e.splice(r - 1, 2), r -= 2)
                }
            }
            function t(e, t, i) {
                var n, o, s, a, c, p, u, d, l, f, h = t && t.split("/"),
                    m = h,
                    g = k.map,
                    b = g && g["*"];
                if (e && "." === e.charAt(0) && (t ? (m = h.slice(0, h.length - 1), p = (e = e.split("/")).length - 1, k.nodeIdCompat && jsSuffixRegExp.test(e[p]) && (e[p] = e[p].replace(jsSuffixRegExp, "")), r(e = m.concat(e)), e = e.join("/")) : 0 === e.indexOf("./") && (e = e.substring(2))), i && g && (h || b)) {
                    e: for (s = (o = e.split("/")).length; s > 0; s -= 1) {
                        if (c = o.slice(0, s).join("/"), h) for (a = h.length; a > 0; a -= 1) if ((n = getOwn(g, h.slice(0, a).join("/"))) && (n = getOwn(n, c))) {
                            u = n,
                                d = s;
                            break e
                        } ! l && b && getOwn(b, c) && (l = getOwn(b, c), f = s)
                    } ! u && l && (u = l, d = f),
                    u && (o.splice(0, d, u), e = o.join("/"))
                }
                return getOwn(k.pkgs, e) || e
            }
            function i(e) {
                isBrowser && each(scripts(),
                    function(r) {
                        if (r.getAttribute("data-requiremodule") === e && r.getAttribute("data-requirecontext") === q.contextName) return r.parentNode.removeChild(r),
                            !0
                    })
            }
            function n(e) {
                var r = getOwn(k.paths, e);
                if (r && isArray(r) && r.length > 1) return r.shift(),
                    q.require.undef(e),
                    q.require([e]),
                    !0
            }
            function o(e) {
                var r, t = e ? e.indexOf("!") : -1;
                return t > -1 && (r = e.substring(0, t), e = e.substring(t + 1, e.length)),
                    [r, e]
            }
            function s(e, r, i, n) {
                var s, a, c, p, u = null,
                    d = r ? r.name: null,
                    l = e,
                    f = !0,
                    h = "";
                return e || (f = !1, e = "_@r" + (A += 1)),
                    p = o(e),
                    u = p[0],
                    e = p[1],
                u && (u = t(u, d, n), a = getOwn(M, u)),
                e && (u ? h = a && a.normalize ? a.normalize(e,
                    function(e) {
                        return t(e, d, n)
                    }) : t(e, d, n) : (u = (p = o(h = t(e, d, n)))[0], h = p[1], i = !0, s = q.nameToUrl(h))),
                    c = !u || a || i ? "": "_unnormalized" + (T += 1),
                {
                    prefix: u,
                    name: h,
                    parentMap: r,
                    unnormalized: !!c,
                    url: s,
                    originalName: l,
                    isDefine: f,
                    id: (u ? u + "!" + h: h) + c
                }
            }
            function a(e) {
                var r = e.id,
                    t = getOwn(E, r);
                return t || (t = E[r] = new q.Module(e)),
                    t
            }
            function c(e, r, t) {
                var i = e.id,
                    n = getOwn(E, i); ! hasProp(M, i) || n && !n.defineEmitComplete ? (n = a(e)).error && "error" === r ? t(n.error) : n.on(r, t) : "defined" === r && t(M[i])
            }
            function p(e, r) {
                var t = e.requireModules,
                    i = !1;
                r ? r(e) : (each(t,
                    function(r) {
                        var t = getOwn(E, r);
                        t && (t.error = e, t.events.error && (i = !0, t.emit("error", e)))
                    }), i || req.onError(e))
            }
            function u() {
                globalDefQueue.length && (apsp.apply(O, [O.length, 0].concat(globalDefQueue)), globalDefQueue = [])
            }
            function d(e) {
                delete E[e],
                    delete j[e]
            }
            function l(e, r, t) {
                var i = e.map.id;
                e.error ? e.emit("error", e.error) : (r[i] = !0, each(e.depMaps,
                    function(i, n) {
                        var o = i.id,
                            s = getOwn(E, o); ! s || e.depMatched[n] || t[o] || (getOwn(r, o) ? (e.defineDep(n, M[o]), e.check()) : l(s, r, t))
                    }), t[i] = !0)
            }
            function f() {
                var e, r, t = 1e3 * k.waitSeconds,
                    o = t && q.startTime + t < (new Date).getTime(),
                    s = [],
                    a = [],
                    c = !1,
                    u = !0;
                if (!x) {
                    if (x = !0, eachProp(j,
                            function(e) {
                                var t = e.map,
                                    p = t.id;
                                if (e.enabled && (t.isDefine || a.push(e), !e.error)) if (!e.inited && o) n(p) ? (r = !0, c = !0) : (s.push(p), i(p));
                                else if (!e.inited && e.fetched && t.isDefine && (c = !0, !t.prefix)) return u = !1
                            }), o && s.length) return e = makeError("timeout", "Load timeout for modules: " + s, null, s),
                        e.contextName = q.contextName,
                        p(e);
                    u && each(a,
                        function(e) {
                            l(e, {},
                                {})
                        }),
                    o && !r || !c || !isBrowser && !isWebWorker || y || (y = setTimeout(function() {
                            y = 0,
                                f()
                        },
                        50)),
                        x = !1
                }
            }
            function h(e) {
                hasProp(M, e[0]) || a(s(e[0], null, !0)).init(e[1], e[2])
            }
            function m(e, r, t, i) {
                e.detachEvent && !isOpera ? i && e.detachEvent(i, r) : e.removeEventListener(t, r, !1)
            }
            function g(e) {
                var r = e.currentTarget || e.srcElement;
                return m(r, q.onScriptLoad, "load", "onreadystatechange"),
                    m(r, q.onScriptError, "error"),
                {
                    node: r,
                    id: r && r.getAttribute("data-requiremodule")
                }
            }
            function b() {
                var e;
                for (u(); O.length;) {
                    if (null === (e = O.shift())[0]) return p(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                    h(e)
                }
            }
            var x, v, q, w, y, k = {
                    waitSeconds: 7,
                    baseUrl: "./",
                    paths: {},
                    bundles: {},
                    pkgs: {},
                    shim: {},
                    config: {}
                },
                E = {},
                j = {},
                S = {},
                O = [],
                M = {},
                P = {},
                R = {},
                A = 1,
                T = 1;
            return w = {
                require: function(e) {
                    return e.require ? e.require: e.require = q.makeRequire(e.map)
                },
                exports: function(e) {
                    if (e.usingExports = !0, e.map.isDefine) return e.exports ? M[e.map.id] = e.exports: e.exports = M[e.map.id] = {}
                },
                module: function(e) {
                    return e.module ? e.module: e.module = {
                        id: e.map.id,
                        uri: e.map.url,
                        config: function() {
                            return getOwn(k.config, e.map.id) || {}
                        },
                        exports: e.exports || (e.exports = {})
                    }
                }
            },
                v = function(e) {
                    this.events = getOwn(S, e.id) || {},
                        this.map = e,
                        this.shim = getOwn(k.shim, e.id),
                        this.depExports = [],
                        this.depMaps = [],
                        this.depMatched = [],
                        this.pluginMaps = {},
                        this.depCount = 0
                },
                v.prototype = {
                    init: function(e, r, t, i) {
                        i = i || {},
                        this.inited || (this.factory = r, t ? this.on("error", t) : this.events.error && (t = bind(this,
                            function(e) {
                                this.emit("error", e)
                            })), this.depMaps = e && e.slice(0), this.errback = t, this.inited = !0, this.ignore = i.ignore, i.enabled || this.enabled ? this.enable() : this.check())
                    },
                    defineDep: function(e, r) {
                        this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = r)
                    },
                    fetch: function() {
                        if (!this.fetched) {
                            this.fetched = !0,
                                q.startTime = (new Date).getTime();
                            var e = this.map;
                            if (!this.shim) return e.prefix ? this.callPlugin() : this.load();
                            q.makeRequire(this.map, {
                                enableBuildCallback: !0
                            })(this.shim.deps || [], bind(this,
                                function() {
                                    return e.prefix ? this.callPlugin() : this.load()
                                }))
                        }
                    },
                    load: function() {
                        var e = this.map.url;
                        P[e] || (P[e] = !0, q.load(this.map.id, e))
                    },
                    check: function() {
                        if (this.enabled && !this.enabling) {
                            var e, r, t = this.map.id,
                                i = this.depExports,
                                n = this.exports,
                                o = this.factory;
                            if (this.inited) {
                                if (this.error) this.emit("error", this.error);
                                else if (!this.defining) {
                                    if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                        if (isFunction(o)) {
                                            if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                                n = q.execCb(t, o, i, n)
                                            } catch(r) {
                                                e = r
                                            } else n = q.execCb(t, o, i, n);
                                            if (this.map.isDefine && void 0 === n && ((r = this.module) ? n = r.exports: this.usingExports && (n = this.exports)), e) return e.requireMap = this.map,
                                                e.requireModules = this.map.isDefine ? [this.map.id] : null,
                                                e.requireType = this.map.isDefine ? "define": "require",
                                                p(this.error = e)
                                        } else n = o;
                                        this.exports = n,
                                        this.map.isDefine && !this.ignore && (M[t] = n, req.onResourceLoad && req.onResourceLoad(q, this.map, this.depMaps)),
                                            d(t),
                                            this.defined = !0
                                    }
                                    this.defining = !1,
                                    this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                                }
                            } else this.fetch()
                        }
                    },
                    callPlugin: function() {
                        var e = this.map,
                            r = e.id,
                            i = s(e.prefix);
                        this.depMaps.push(i),
                            c(i, "defined", bind(this,
                                function(i) {
                                    var n, o, u, l = getOwn(R, this.map.id),
                                        f = this.map.name,
                                        h = this.map.parentMap ? this.map.parentMap.name: null,
                                        m = q.makeRequire(e.parentMap, {
                                            enableBuildCallback: !0
                                        });
                                    return this.map.unnormalized ? (i.normalize && (f = i.normalize(f,
                                            function(e) {
                                                return t(e, h, !0)
                                            }) || ""), o = s(e.prefix + "!" + f, this.map.parentMap), c(o, "defined", bind(this,
                                        function(e) {
                                            this.init([],
                                                function() {
                                                    return e
                                                },
                                                null, {
                                                    enabled: !0,
                                                    ignore: !0
                                                })
                                        })), void((u = getOwn(E, o.id)) && (this.depMaps.push(o), this.events.error && u.on("error", bind(this,
                                        function(e) {
                                            this.emit("error", e)
                                        })), u.enable()))) : l ? (this.map.url = q.nameToUrl(l), void this.load()) : ((n = bind(this,
                                        function(e) {
                                            this.init([],
                                                function() {
                                                    return e
                                                },
                                                null, {
                                                    enabled: !0
                                                })
                                        })).error = bind(this,
                                        function(e) {
                                            this.inited = !0,
                                                this.error = e,
                                                e.requireModules = [r],
                                                eachProp(E,
                                                    function(e) {
                                                        0 === e.map.id.indexOf(r + "_unnormalized") && d(e.map.id)
                                                    }),
                                                p(e)
                                        }), n.fromText = bind(this,
                                        function(t, i) {
                                            var o = e.name,
                                                c = s(o),
                                                u = useInteractive;
                                            i && (t = i),
                                            u && (useInteractive = !1),
                                                a(c),
                                            hasProp(k.config, r) && (k.config[o] = k.config[r]);
                                            try {
                                                req.exec(t)
                                            } catch(e) {
                                                return p(makeError("fromtexteval", "fromText eval for " + r + " failed: " + e, e, [r]))
                                            }
                                            u && (useInteractive = !0),
                                                this.depMaps.push(c),
                                                q.completeLoad(o),
                                                m([o], n)
                                        }), void i.load(e.name, m, n, k))
                                })),
                            q.enable(i, this),
                            this.pluginMaps[i.id] = i
                    },
                    enable: function() {
                        j[this.map.id] = this,
                            this.enabled = !0,
                            this.enabling = !0,
                            each(this.depMaps, bind(this,
                                function(e, r) {
                                    var t, i, n;
                                    if ("string" == typeof e) {
                                        if (e = s(e, this.map.isDefine ? this.map: this.map.parentMap, !1, !this.skipMap), this.depMaps[r] = e, n = getOwn(w, e.id)) return void(this.depExports[r] = n(this));
                                        this.depCount += 1,
                                            c(e, "defined", bind(this,
                                                function(e) {
                                                    this.defineDep(r, e),
                                                        this.check()
                                                })),
                                        this.errback && c(e, "error", bind(this, this.errback))
                                    }
                                    t = e.id,
                                        i = E[t],
                                    hasProp(w, t) || !i || i.enabled || q.enable(e, this)
                                })),
                            eachProp(this.pluginMaps, bind(this,
                                function(e) {
                                    var r = getOwn(E, e.id);
                                    r && !r.enabled && q.enable(e, this)
                                })),
                            this.enabling = !1,
                            this.check()
                    },
                    on: function(e, r) {
                        var t = this.events[e];
                        t || (t = this.events[e] = []),
                            t.push(r)
                    },
                    emit: function(e, r) {
                        each(this.events[e],
                            function(e) {
                                e(r)
                            }),
                        "error" === e && delete this.events[e]
                    }
                },
                q = {
                    config: k,
                    contextName: e,
                    registry: E,
                    defined: M,
                    urlFetched: P,
                    defQueue: O,
                    Module: v,
                    makeModuleMap: s,
                    nextTick: req.nextTick,
                    onError: p,
                    configure: function(e) {
                        e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
                        var r = k.shim,
                            t = {
                                paths: !0,
                                bundles: !0,
                                config: !0,
                                map: !0
                            };
                        eachProp(e,
                            function(e, r) {
                                t[r] ? (k[r] || (k[r] = {}), mixin(k[r], e, !0, !0)) : k[r] = e
                            }),
                        e.bundles && eachProp(e.bundles,
                            function(e, r) {
                                each(e,
                                    function(e) {
                                        e !== r && (R[e] = r)
                                    })
                            }),
                        e.shim && (eachProp(e.shim,
                            function(e, t) {
                                isArray(e) && (e = {
                                    deps: e
                                }),
                                !e.exports && !e.init || e.exportsFn || (e.exportsFn = q.makeShimExports(e)),
                                    r[t] = e
                            }), k.shim = r),
                        e.packages && each(e.packages,
                            function(e) {
                                var r;
                                r = (e = "string" == typeof e ? {
                                    name: e
                                }: e).name,
                                e.location && (k.paths[r] = e.location),
                                    k.pkgs[r] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                            }),
                            eachProp(E,
                                function(e, r) {
                                    e.inited || e.map.unnormalized || (e.map = s(r))
                                }),
                        (e.deps || e.callback) && q.require(e.deps || [], e.callback)
                    },
                    makeShimExports: function(e) {
                        return function() {
                            var r;
                            return e.init && (r = e.init.apply(global, arguments)),
                            r || e.exports && getGlobal(e.exports)
                        }
                    },
                    makeRequire: function(r, n) {
                        function o(t, i, c) {
                            var u, d, l;
                            return n.enableBuildCallback && i && isFunction(i) && (i.__requireJsBuild = !0),
                                "string" == typeof t ? isFunction(i) ? p(makeError("requireargs", "Invalid require call"), c) : r && hasProp(w, t) ? w[t](E[r.id]) : req.get ? req.get(q, t, r, o) : (d = s(t, r, !1, !0), u = d.id, hasProp(M, u) ? M[u] : p(makeError("notloaded", 'Module name "' + u + '" has not been loaded yet for context: ' + e + (r ? "": ". Use require([])")))) : (b(), q.nextTick(function() {
                                    b(),
                                        (l = a(s(null, r))).skipMap = n.skipMap,
                                        l.init(t, i, c, {
                                            enabled: !0
                                        }),
                                        f()
                                }), o)
                        }
                        return n = n || {},
                            mixin(o, {
                                isBrowser: isBrowser,
                                toUrl: function(e) {
                                    var i, n = e.lastIndexOf("."),
                                        o = e.split("/")[0],
                                        s = "." === o || ".." === o;
                                    return - 1 !== n && (!s || n > 1) && (i = e.substring(n, e.length), e = e.substring(0, n)),
                                        q.nameToUrl(t(e, r && r.id, !0), i, !0)
                                },
                                defined: function(e) {
                                    return hasProp(M, s(e, r, !1, !0).id)
                                },
                                specified: function(e) {
                                    return e = s(e, r, !1, !0).id,
                                    hasProp(M, e) || hasProp(E, e)
                                }
                            }),
                        r || (o.undef = function(e) {
                            u();
                            var t = s(e, r, !0),
                                n = getOwn(E, e);
                            i(e),
                                delete M[e],
                                delete P[t.url],
                                delete S[e],
                                eachReverse(O,
                                    function(r, t) {
                                        r[0] === e && O.splice(t, 1)
                                    }),
                            n && (n.events.defined && (S[e] = n.events), d(e))
                        }),
                            o
                    },
                    enable: function(e) {
                        getOwn(E, e.id) && a(e).enable()
                    },
                    completeLoad: function(e) {
                        var r, t, i, o = getOwn(k.shim, e) || {},
                            s = o.exports;
                        for (u(); O.length;) {
                            if (null === (t = O.shift())[0]) {
                                if (t[0] = e, r) break;
                                r = !0
                            } else t[0] === e && (r = !0);
                            h(t)
                        }
                        if (i = getOwn(E, e), !r && !hasProp(M, e) && i && !i.inited) {
                            if (! (!k.enforceDefine || s && getGlobal(s))) return n(e) ? void 0 : p(makeError("nodefine", "No define call for " + e, null, [e]));
                            h([e, o.deps || [], o.exportsFn])
                        }
                        f()
                    },
                    nameToUrl: function(e, r, t) {
                        var i, n, o, s, a, c, p, u = getOwn(k.pkgs, e);
                        if (u && (e = u), p = getOwn(R, e)) return q.nameToUrl(p, r, t);
                        if (req.jsExtRegExp.test(e)) a = e + (r || "");
                        else {
                            for (i = k.paths, o = (n = e.split("/")).length; o > 0; o -= 1) if (s = n.slice(0, o).join("/"), c = getOwn(i, s)) {
                                isArray(c) && (c = c[0]),
                                    n.splice(0, o, c);
                                break
                            }
                            a = n.join("/"),
                                a = ("/" === (a += r || (/^data\:|\?/.test(a) || t ? "": ".js")).charAt(0) || a.match(/^[\w\+\.\-]+:/) ? "": k.baseUrl) + a
                        }
                        return k.urlArgs ? a + ( - 1 === a.indexOf("?") ? "?": "&") + k.urlArgs: a
                    },
                    load: function(e, r) {
                        req.load(q, e, r)
                    },
                    execCb: function(e, r, t, i) {
                        return r.apply(i, t)
                    },
                    onScriptLoad: function(e) {
                        if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                            interactiveScript = null;
                            var r = g(e);
                            q.completeLoad(r.id)
                        }
                    },
                    onScriptError: function(e) {
                        var r = g(e);
                        if (!n(r.id)) return p(makeError("scripterror", "Script error for: " + r.id, e, [r.id]))
                    }
                },
                q.require = q.makeRequire(),
                q
        }
        function getInteractiveScript() {
            return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript: (eachReverse(scripts(),
                function(e) {
                    if ("interactive" === e.readyState) return interactiveScript = e
                }), interactiveScript)
        }
        var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.11",
            commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
            cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
            jsSuffixRegExp = /\.js$/,
            currDirRegExp = /^\.\//,
            op = Object.prototype,
            ostring = op.toString,
            hasOwn = op.hasOwnProperty,
            ap = Array.prototype,
            apsp = ap.splice,
            isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
            isWebWorker = !isBrowser && "undefined" != typeof importScripts,
            readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/: /^(complete|loaded)$/,
            defContextName = "_",
            isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
            contexts = {},
            cfg = {},
            globalDefQueue = [],
            useInteractive = !1;
        if (void 0 === define) {
            if (void 0 !== requirejs) {
                if (isFunction(requirejs)) return;
                cfg = requirejs,
                    requirejs = void 0
            }
            void 0 === require || isFunction(require) || (cfg = require, require = void 0),
                req = requirejs = function(e, r, t, i) {
                    var n, o, s = defContextName;
                    return isArray(e) || "string" == typeof e || (o = e, isArray(r) ? (e = r, r = t, t = i) : e = []),
                    o && o.context && (s = o.context),
                    (n = getOwn(contexts, s)) || (n = contexts[s] = req.s.newContext(s)),
                    o && n.configure(o),
                        n.require(e, r, t)
                },
                req.config = function(e) {
                    return req(e)
                },
                req.nextTick = "undefined" != typeof setTimeout ?
                    function(e) {
                        setTimeout(e, 4)
                    }: function(e) {
                    e()
                },
            require || (require = req),
                req.version = version,
                req.jsExtRegExp = /^\/|:|\?|\.js$/,
                req.isBrowser = isBrowser,
                s = req.s = {
                    contexts: contexts,
                    newContext: newContext
                },
                req({}),
                each(["toUrl", "undef", "defined", "specified"],
                    function(e) {
                        req[e] = function() {
                            var r = contexts[defContextName];
                            return r.require[e].apply(r, arguments)
                        }
                    }),
            isBrowser && (head = s.head = document.getElementsByTagName("head")[0], (baseElement = document.getElementsByTagName("base")[0]) && (head = s.head = baseElement.parentNode)),
                req.onError = defaultOnError,
                req.createNode = function(e, r, t) {
                    var i = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
                    return i.type = e.scriptType || "text/javascript",
                        i.charset = "utf-8",
                        i.async = !0,
                        i
                },
                req.load = function(e, r, t) {
                    var i, n = e && e.config || {};
                    if (isBrowser) return (i = req.createNode(n, r, t)).setAttribute("data-requirecontext", e.contextName),
                        i.setAttribute("data-requiremodule", r),
                        !i.attachEvent || i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)),
                        i.src = t,
                        currentlyAddingScript = i,
                        baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i),
                        currentlyAddingScript = null,
                        i;
                    if (isWebWorker) try {
                        importScripts(t),
                            e.completeLoad(r)
                    } catch(i) {
                        e.onError(makeError("importscripts", "importScripts failed for " + r + " at " + t, i, [r]))
                    }
                },
            isBrowser && !cfg.skipDataMain && eachReverse(scripts(),
                function(e) {
                    if (head || (head = e.parentNode), dataMain = e.getAttribute("data-main")) return mainScript = dataMain,
                    cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/": "./", cfg.baseUrl = subPath),
                        mainScript = mainScript.replace(jsSuffixRegExp, ""),
                    req.jsExtRegExp.test(mainScript) && (mainScript = dataMain),
                        cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript],
                        !0
                }),
                define = function(e, r, t) {
                    var i, n;
                    "string" != typeof e && (t = r, r = e, e = null),
                    isArray(r) || (t = r, r = null),
                    !r && isFunction(t) && (r = [], t.length && (t.toString().replace(commentRegExp, "").replace(cjsRequireRegExp,
                        function(e, t) {
                            r.push(t)
                        }), r = (1 === t.length ? ["require"] : ["require", "exports", "module"]).concat(r))),
                    useInteractive && (i = currentlyAddingScript || getInteractiveScript()) && (e || (e = i.getAttribute("data-requiremodule")), n = contexts[i.getAttribute("data-requirecontext")]),
                        (n ? n.defQueue: globalDefQueue).push([e, r, t])
                },
                define.amd = {
                    jQuery: !0
                },
                req.exec = function(text) {
                    return eval(text)
                },
                req(cfg)
        }
    } (this),
    require.config({
        baseUrl: "resource/js/app",
        urlArgs: "v=" + (new Date).getHours(),
        paths: {
            map: "https://api.map.baidu.com/getscript?v=2.0&ak=F51571495f717ff1194de02366bb8da9&services=&t=20140530104353",
            css: "../../../../web/resource/js/lib/css.min",
            angular: "../../../../web/resource/js/lib/angular.min",
            underscore: "../../../../web/resource/js/lib/underscore.min",
            moment: "../../../../web/resource/js/lib/moment",
            bootstrap: "../../../../web/resource/js/lib/bootstrap.min",
            hammer: "../lib/hammer.min",
            webuploader: "../../../../web/resource/components/webuploader/webuploader.min",
            jquery: "../../../../web/resource/js/lib/jquery-1.11.1.min",
            "jquery.jplayer": "../../../../web/resource/components/jplayer/jquery.jplayer.min",
            "jquery.qrcode": "../../../../web/resource/js/lib/jquery.qrcode.min",
            "mui.datepicker": "../../components/datepicker/mui.picker.all",
            "mui.districtpicker": "../../components/districtpicker/mui.city.data-3",
            daterangepicker: "../../components/daterangepicker/daterangepicker",
            datetimepicker: "../../components/datetimepicker/bootstrap-datetimepicker.min",
            "mui.pullrefresh": "../../components/pullrefresh/mui.pullToRefresh.material",
            previewer: "../../components/previewer/mui.previewimage",
            cropper: "../../components/cropper/cropper.min",
            swiper: "../../components/swiper/swiper.min",
            "jquery.flexslider": "../../../../addons/lywywl_ztb/resource/mobile/store/js/jquery.flexslider-min"
        },
        waitSeconds: 0,
        shim: {
            bootstrap: {
                exports: "$",
                deps: ["jquery"]
            },
            angular: {
                exports: "angular",
                deps: ["jquery"]
            },
            hammer: {
                exports: "hammer"
            },
            daterangepicker: {
                exports: "$",
                deps: ["bootstrap", "moment", "css!../../components/daterangepicker/daterangepicker.css"]
            },
            datetimepicker: {
                exports: "$",
                deps: ["bootstrap", "css!../../components/datetimepicker/bootstrap-datetimepicker.min.css"]
            },
            map: {
                exports: "BMap"
            },
            webuploader: {
                deps: ["jquery", "css!../../../../web/resource/components/webuploader/webuploader.css", "css!../../../../web/resource/components/webuploader/style.css"]
            },
            "jquery.jplayer": {
                exports: "$",
                deps: ["jquery"]
            },
            "jquery.qrcode": {
                exports: "$",
                deps: ["jquery"]
            },
            "mui.datepicker": {
                deps: ["mui", "css!../../components/datepicker/mui.picker.all.css"],
                exports: "mui.DtPicker"
            },
            "mui.districtpicker": {
                deps: ["mui", "mui.datepicker"],
                exports: "cityData3"
            },
            "mui.pullrefresh": {
                deps: ["./resource/components/pullrefresh/mui.pullToRefresh.js"],
                exports: "mui"
            },
            previewer: {
                deps: ["./resource/components/previewer/mui.zoom.js"],
                exports: "mui"
            },
            cropper: {
                deps: ["css!../../components/cropper/cropper.min.css"]
            },
            "jquery.flexslider": {
                exports: "$",
                deps: ["jquery"]
            }
        }
    });