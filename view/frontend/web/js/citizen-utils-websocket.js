"use strict";
var _createClass = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1,
                r.configurable = !0,
            "value"in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r)
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n),
        r && t(e, r),
            e
    }
}();
function _possibleConstructorReturn(t, e) {
    if (!t)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e
}
function _inherits(t, e) {
    if ("function" != typeof e && null !== e)
        throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }),
    e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
}
function _classCallCheck(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
(function() {
        var t, e, n, r, s = {}.hasOwnProperty, o = [].slice;
        t = {
            LF: "\n",
            NULL: "\0"
        },
            n = function() {
                var e;
                function n(t, e, n, r) {
                    this.command = t,
                        this.headers = null != e ? e : {},
                        this.body = null != n ? n : "",
                        this.escapeHeaderValues = null != r && r
                }
                return n.prototype.toString = function() {
                    var e, r, o, i, c;
                    for (r in e = [this.command],
                    (i = !1 === this.headers["content-length"]) && delete this.headers["content-length"],
                        o = this.headers)
                        s.call(o, r) && (c = o[r],
                            this.escapeHeaderValues && "CONNECT" !== this.command && "CONNECTED" !== this.command ? e.push(r + ":" + n.frEscape(c)) : e.push(r + ":" + c));
                    return this.body && !i && e.push("content-length:" + n.sizeOfUTF8(this.body)),
                        e.push(t.LF + this.body),
                        e.join(t.LF)
                }
                    ,
                    n.sizeOfUTF8 = function(t) {
                        return t ? encodeURI(t).match(/%..|./g).length : 0
                    }
                    ,
                    e = function(e, r) {
                        var s, o, i, c, a, u, l, h, p, f, b, d, g, k, y, _, C, v;
                        for (null == r && (r = !1),
                                 c = e.search(RegExp("" + t.LF + t.LF)),
                                 i = (a = e.substring(0, c).split(t.LF)).shift(),
                                 u = {},
                                 v = function(t) {
                                     return t.replace(/^\s+|\s+$/g, "")
                                 }
                                 ,
                                 p = 0,
                                 d = (k = a.reverse()).length; p < d; p++)
                            h = (g = k[p]).indexOf(":"),
                                u[v(g.substring(0, h))] = r && "CONNECT" !== i && "CONNECTED" !== i ? n.frUnEscape(v(g.substring(h + 1))) : v(g.substring(h + 1));
                        if (s = "",
                            C = c + 2,
                            u["content-length"])
                            b = parseInt(u["content-length"]),
                                s = ("" + e).substring(C, C + b);
                        else
                            for (o = null,
                                     l = f = y = C,
                                     _ = e.length; (y <= _ ? f < _ : f > _) && (o = e.charAt(l)) !== t.NULL; l = y <= _ ? ++f : --f)
                                s += o;
                        return new n(i,u,s,r)
                    }
                    ,
                    n.unmarshall = function(n, r) {
                        var s, o, i, c;
                        return null == r && (r = !1),
                            o = n.split(RegExp("" + t.NULL + t.LF + "*")),
                            (c = {
                                frames: [],
                                partial: ""
                            }).frames = function() {
                                var t, n, i, c;
                                for (c = [],
                                         t = 0,
                                         n = (i = o.slice(0, -1)).length; t < n; t++)
                                    s = i[t],
                                        c.push(e(s, r));
                                return c
                            }(),
                            (i = o.slice(-1)[0]) === t.LF || -1 !== i.search(RegExp("" + t.NULL + t.LF + "*$")) ? c.frames.push(e(i, r)) : c.partial = i,
                            c
                    }
                    ,
                    n.marshall = function(e, r, s, o) {
                        return new n(e,r,s,o).toString() + t.NULL
                    }
                    ,
                    n.frEscape = function(t) {
                        return ("" + t).replace(/\\/g, "\\\\").replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/:/g, "\\c")
                    }
                    ,
                    n.frUnEscape = function(t) {
                        return ("" + t).replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\c/g, ":").replace(/\\\\/g, "\\")
                    }
                    ,
                    n
            }(),
            e = function() {
                var e;
                function s(t) {
                    this.ws_fn = function() {
                        var e;
                        return (e = t()).binaryType = "arraybuffer",
                            e
                    }
                        ,
                        this.reconnect_delay = 0,
                        this.counter = 0,
                        this.connected = !1,
                        this.heartbeat = {
                            outgoing: 1e4,
                            incoming: 1e4
                        },
                        this.maxWebSocketFrameSize = 16384,
                        this.subscriptions = {},
                        this.partialData = ""
                }
                return s.prototype.debug = function(t) {
                    return function() {
                        return 0
                    }
                }
                    ,
                    e = function() {
                        return Date.now ? Date.now() : (new Date).valueOf
                    }
                    ,
                    s.prototype._transmit = function(t, e, r) {
                        var s;
                        for (s = n.marshall(t, e, r, this.escapeHeaderValues),
                             "function" == typeof this.debug && this.debug(">>> " + s); ; ) {
                            if (!(s.length > this.maxWebSocketFrameSize))
                                return this.ws.send(s);
                            this.ws.send(s.substring(0, this.maxWebSocketFrameSize)),
                                s = s.substring(this.maxWebSocketFrameSize),
                            "function" == typeof this.debug && this.debug("remaining = " + s.length)
                        }
                    }
                    ,
                    s.prototype._setupHeartbeat = function(n) {
                        var s, o, i, c, a, u, l;
                        if ((s = n.version) === r.VERSIONS.V1_1 || s === r.VERSIONS.V1_2)
                            return c = (o = function() {
                                var t, e, r, s;
                                for (s = [],
                                         t = 0,
                                         e = (r = n["heart-beat"].split(",")).length; t < e; t++)
                                    u = r[t],
                                        s.push(parseInt(u));
                                return s
                            }())[0],
                                i = o[1],
                            0 !== this.heartbeat.outgoing && 0 !== i && (a = Math.max(this.heartbeat.outgoing, i),
                            "function" == typeof this.debug && this.debug("send PING every " + a + "ms"),
                                this.pinger = r.setInterval(a, (l = this,
                                        function() {
                                            return l.ws.send(t.LF),
                                                "function" == typeof l.debug ? l.debug(">>> PING") : void 0
                                        }
                                ))),
                                0 !== this.heartbeat.incoming && 0 !== c ? (a = Math.max(this.heartbeat.incoming, c),
                                "function" == typeof this.debug && this.debug("check PONG every " + a + "ms"),
                                    this.ponger = r.setInterval(a, function(t) {
                                        return function() {
                                            var n;
                                            if ((n = e() - t.serverActivity) > 2 * a)
                                                return "function" == typeof t.debug && t.debug("did not receive server activity for the last " + n + "ms"),
                                                    t.ws.close()
                                        }
                                    }(this))) : void 0
                    }
                    ,
                    s.prototype._parseConnect = function() {
                        var t, e, n, r, s;
                        if (s = {},
                        (t = 1 <= arguments.length ? o.call(arguments, 0) : []).length < 2)
                            throw "Connect requires at least 2 arguments";
                        if ("function" == typeof t[1])
                            s = t[0],
                                n = t[1],
                                r = t[2],
                                e = t[3];
                        else
                            switch (t.length) {
                                case 6:
                                    s.login = t[0],
                                        s.passcode = t[1],
                                        n = t[2],
                                        r = t[3],
                                        e = t[4],
                                        s.host = t[5];
                                    break;
                                default:
                                    s.login = t[0],
                                        s.passcode = t[1],
                                        n = t[2],
                                        r = t[3],
                                        e = t[4]
                            }
                        return [s, n, r, e]
                    }
                    ,
                    s.prototype.connect = function() {
                        var t, e;
                        return t = 1 <= arguments.length ? o.call(arguments, 0) : [],
                            this.escapeHeaderValues = !1,
                            e = this._parseConnect.apply(this, t),
                            this.headers = e[0],
                            this.connectCallback = e[1],
                            this.errorCallback = e[2],
                            this.closeEventCallback = e[3],
                            this._active = !0,
                            this._connect()
                    }
                    ,
                    s.prototype._connect = function() {
                        var s, o, i, c, a;
                        if (c = this.headers,
                            i = this.errorCallback,
                            o = this.closeEventCallback,
                            this._active)
                            return "function" == typeof this.debug && this.debug("Opening Web Socket..."),
                                this.ws = this.ws_fn(),
                                s = function(t) {
                                    var e, n, r, s, o, i;
                                    for (i = "",
                                             o = t.length,
                                             s = 0; s < o; )
                                        switch ((e = t[s++]) >> 4) {
                                            case 0:
                                            case 1:
                                            case 2:
                                            case 3:
                                            case 4:
                                            case 5:
                                            case 6:
                                            case 7:
                                                i += String.fromCharCode(e);
                                                break;
                                            case 12:
                                            case 13:
                                                n = t[s++],
                                                    i += String.fromCharCode((31 & e) << 6 | 63 & n);
                                                break;
                                            case 14:
                                                n = t[s++],
                                                    r = t[s++],
                                                    i += String.fromCharCode((15 & e) << 12 | (63 & n) << 6 | (63 & r) << 0)
                                        }
                                    return i
                                }
                                ,
                                this.ws.onmessage = (a = this,
                                        function(o) {
                                            var c, u, l, h, p, f, b, d, g, k, y;
                                            if (l = "undefined" != typeof ArrayBuffer && o.data instanceof ArrayBuffer ? (c = new Uint8Array(o.data),
                                            "function" == typeof a.debug && a.debug("--- got data length: " + c.length),
                                                s(c)) : o.data,
                                                a.serverActivity = e(),
                                            l !== t.LF)
                                                for ("function" == typeof a.debug && a.debug("<<< " + l),
                                                         y = n.unmarshall(a.partialData + l, a.escapeHeaderValues),
                                                         a.partialData = y.partial,
                                                         p = 0,
                                                         f = (g = y.frames).length; p < f; p++)
                                                    switch ((h = g[p]).command) {
                                                        case "CONNECTED":
                                                            if ("function" == typeof a.debug && a.debug("connected to server " + h.headers.server),
                                                                a.connected = !0,
                                                                a.version = h.headers.version,
                                                            a.version === r.VERSIONS.V1_2 && (a.escapeHeaderValues = !0),
                                                                !a._active)
                                                                return void a.disconnect();
                                                            a._setupHeartbeat(h.headers),
                                                            "function" == typeof a.connectCallback && a.connectCallback(h);
                                                            break;
                                                        case "MESSAGE":
                                                            k = h.headers.subscription,
                                                                (d = a.subscriptions[k] || a.onreceive) ? (u = a,
                                                                    b = a.version === r.VERSIONS.V1_2 ? h.headers.ack : h.headers["message-id"],
                                                                    h.ack = function(t) {
                                                                        return null == t && (t = {}),
                                                                            u.ack(b, k, t)
                                                                    }
                                                                    ,
                                                                    h.nack = function(t) {
                                                                        return null == t && (t = {}),
                                                                            u.nack(b, k, t)
                                                                    }
                                                                    ,
                                                                    d(h)) : "function" == typeof a.debug && a.debug("Unhandled received MESSAGE: " + h);
                                                            break;
                                                        case "RECEIPT":
                                                            h.headers["receipt-id"] === a.closeReceipt ? (a.ws.onclose = null,
                                                                a.ws.close(),
                                                                a._cleanUp(),
                                                            "function" == typeof a._disconnectCallback && a._disconnectCallback()) : "function" == typeof a.onreceipt && a.onreceipt(h);
                                                            break;
                                                        case "ERROR":
                                                            "function" == typeof i && i(h);
                                                            break;
                                                        default:
                                                            "function" == typeof a.debug && a.debug("Unhandled frame: " + h)
                                                    }
                                            else
                                                "function" == typeof a.debug && a.debug("<<< PONG")
                                        }
                                ),
                                this.ws.onclose = function(t) {
                                    return function(e) {
                                        var n;
                                        return n = "Whoops! Lost connection to " + t.ws.url,
                                        "function" == typeof t.debug && t.debug(n),
                                        "function" == typeof o && o(e),
                                            t._cleanUp(),
                                        "function" == typeof i && i(n),
                                            t._schedule_reconnect()
                                    }
                                }(this),
                                this.ws.onopen = function(t) {
                                    return function() {
                                        return "function" == typeof t.debug && t.debug("Web Socket Opened..."),
                                            c["accept-version"] = r.VERSIONS.supportedVersions(),
                                            c["heart-beat"] = [t.heartbeat.outgoing, t.heartbeat.incoming].join(","),
                                            t._transmit("CONNECT", c)
                                    }
                                }(this);
                        this.debug("Client has been marked inactive, will not attempt to connect")
                    }
                    ,
                    s.prototype._schedule_reconnect = function() {
                        if (this.reconnect_delay > 0)
                            return "function" == typeof this.debug && this.debug("STOMP: scheduling reconnection in " + this.reconnect_delay + "ms"),
                                this._reconnector = setTimeout((t = this,
                                        function() {
                                            return t.connected ? "function" == typeof t.debug ? t.debug("STOMP: already connected") : void 0 : ("function" == typeof t.debug && t.debug("STOMP: attempting to reconnect"),
                                                t._connect())
                                        }
                                ), this.reconnect_delay);
                        var t
                    }
                    ,
                    s.prototype.disconnect = function(t, e) {
                        var n;
                        if (null == e && (e = {}),
                            this._disconnectCallback = t,
                            this._active = !1,
                            this.connected) {
                            e.receipt || (e.receipt = "close-" + this.counter++),
                                this.closeReceipt = e.receipt;
                            try {
                                return this._transmit("DISCONNECT", e)
                            } catch (t) {
                                return n = t,
                                    "function" == typeof this.debug ? this.debug("Ignoring error during disconnect", n) : void 0
                            }
                        }
                    }
                    ,
                    s.prototype._cleanUp = function() {
                        if (this._reconnector && clearTimeout(this._reconnector),
                            this.connected = !1,
                            this.subscriptions = {},
                            this.partial = "",
                        this.pinger && r.clearInterval(this.pinger),
                            this.ponger)
                            return r.clearInterval(this.ponger)
                    }
                    ,
                    s.prototype.send = function(t, e, n) {
                        return null == e && (e = {}),
                        null == n && (n = ""),
                            e.destination = t,
                            this._transmit("SEND", e, n)
                    }
                    ,
                    s.prototype.subscribe = function(t, e, n) {
                        var r;
                        return null == n && (n = {}),
                        n.id || (n.id = "sub-" + this.counter++),
                            n.destination = t,
                            this.subscriptions[n.id] = e,
                            this._transmit("SUBSCRIBE", n),
                            r = this,
                            {
                                id: n.id,
                                unsubscribe: function(t) {
                                    return r.unsubscribe(n.id, t)
                                }
                            }
                    }
                    ,
                    s.prototype.unsubscribe = function(t, e) {
                        return null == e && (e = {}),
                            delete this.subscriptions[t],
                            e.id = t,
                            this._transmit("UNSUBSCRIBE", e)
                    }
                    ,
                    s.prototype.begin = function(t) {
                        var e, n;
                        return n = t || "tx-" + this.counter++,
                            this._transmit("BEGIN", {
                                transaction: n
                            }),
                            e = this,
                            {
                                id: n,
                                commit: function() {
                                    return e.commit(n)
                                },
                                abort: function() {
                                    return e.abort(n)
                                }
                            }
                    }
                    ,
                    s.prototype.commit = function(t) {
                        return this._transmit("COMMIT", {
                            transaction: t
                        })
                    }
                    ,
                    s.prototype.abort = function(t) {
                        return this._transmit("ABORT", {
                            transaction: t
                        })
                    }
                    ,
                    s.prototype.ack = function(t, e, n) {
                        return null == n && (n = {}),
                            this.version === r.VERSIONS.V1_2 ? n.id = t : n["message-id"] = t,
                            n.subscription = e,
                            this._transmit("ACK", n)
                    }
                    ,
                    s.prototype.nack = function(t, e, n) {
                        return null == n && (n = {}),
                            this.version === r.VERSIONS.V1_2 ? n.id = t : n["message-id"] = t,
                            n.subscription = e,
                            this._transmit("NACK", n)
                    }
                    ,
                    s
            }(),
            (r = {
                VERSIONS: {
                    V1_0: "1.0",
                    V1_1: "1.1",
                    V1_2: "1.2",
                    supportedVersions: function() {
                        return "1.2,1.1,1.0"
                    }
                },
                client: function(t, n) {
                    return null == n && (n = ["v10.stomp", "v11.stomp", "v12.stomp"]),
                        new e((function() {
                                return new (r.WebSocketClass || WebSocket)(t,n)
                            }
                        ))
                },
                over: function(t) {
                    return new e("function" == typeof t ? t : function() {
                            return t
                        }
                    )
                },
                Frame: n
            }).setInterval = function(t, e) {
                return setInterval(e, t)
            }
            ,
            r.clearInterval = function(t) {
                return clearInterval(t)
            }
            ,
        "undefined" != typeof exports && null !== exports && (exports.Stomp = r),
            "undefined" != typeof window && null !== window ? window.Stomp = r : exports || (self.Stomp = r)
    }
).call(void 0),
    function() {
        var t, e, n, r, s;
        window.CitizenWebSocket = (t = function() {
            function t(e) {
                _classCallCheck(this, t),
                    this.reconnectionRetries = 0,
                    this.reconnectIntervalId = null,
                    this.stompClient = null,
                    this.socket = null,
                    this.opts = Object.assign({
                        brokerUrl: "",
                        requestUrl: "",
                        responseUrl: "",
                        reconnectionRetries: 0,
                        channelId: "",
                        reconnectionAttemptsInterval: 5e3,
                        reconnectMaximumRetries: 3,
                        reconnectFailureCallback: null
                    }, e),
                    this.setupSocket = this.setupSocket.bind(this),
                    this.reconnect = this.reconnect.bind(this),
                    this.onConnectionError = this.onConnectionError.bind(this),
                    this.onSubscribe = this.onSubscribe.bind(this),
                    this.disconnect = this.disconnect.bind(this),
                    this.connect = this.connect.bind(this)
            }
            return _createClass(t, [{
                key: "getWsAuthority",
                value: function() {
                    return "wss://testapi.citizen.is"
                }
            }, {
                key: "setupSocket",
                value: function() {
                    this.socket = new WebSocket(this.getWsAuthority() + this.opts.brokerUrl),
                        this.stompClient = Stomp.over(this.socket),
                        this.readyState = this.socket.readyState
                }
            }, {
                key: "reconnect",
                value: function() {
                    var t = this;
                    if (null !== this.stompClient && !this.webSocketManualDisconnection && (this.socket.readyState === WebSocket.CLOSED || this.socket.readyState === WebSocket.CLOSING))
                        var e = !1
                            , n = setInterval((function() {
                                t.reconnectIntervalId = n,
                                    t.reconnectionRetries < t.opts.reconnectMaximumRetries ? (t.reconnectionRetries++,
                                        t.setupSocket(),
                                        t.stompClient.connect({}, (function(n) {
                                                clearInterval(t.reconnectIntervalId),
                                                    e = !0,
                                                    t.opts.connectionCallback ? t.opts.connectionCallback() : t.onConnect(n)
                                            }
                                        ), (function() {
                                                e && t.reconnect()
                                            }
                                        ))) : (clearInterval(t.reconnectIntervalId),
                                    t.opts.reconnectFailureCallback && t.opts.reconnectFailureCallback())
                            }
                        ), this.opts.reconnectionAttemptsInterval)
                }
            }, {
                key: "onConnect",
                value: function(t) {
                    this.reconnectionRetries = 0;
                    var e = this.opts.channelId.replace(/['"]+/g, "")
                        , n = this.opts.requestUrl + (e + "-COMPLETE")
                        , r = this.opts.responseUrl + (e + "-COMPLETE");
                    this.subscription = this.stompClient.subscribe(r, this.onSubscribe),
                        this.stompClient.send(n, {}, JSON.stringify(e + "-COMPLETE"))
                }
            }, {
                key: "onConnectionError",
                value: function(t) {
                    this.webSocketManualDisconnection || this.reconnect()
                }
            }, {
                key: "onSubscribe",
                value: function(t) {
                    this.opts.subscriptionCallback(t)
                }
            }, {
                key: "disconnect",
                value: function() {
                    this.socket.readyState !== WebSocket.CLOSING && this.socket.readyState !== WebSocket.CLOSED && (this.webSocketManualDisconnection = !0,
                        clearInterval(this.reconnectIntervalId),
                    this.subscription && this.subscription.unsubscribe(),
                    this.socket && this.socket.close())
                }
            }, {
                key: "connect",
                value: function() {
                    var t = this;
                    this.setupSocket(),
                        this.stompClient.connect({}, (function(e) {
                                t.opts.connectionCallback ? t.opts.connectionCallback() : t.onConnect(e)
                            }
                        ), (function(e) {
                                t.onConnectionError(e)
                            }
                        ))
                }
            }, {
                key: "isConnected",
                value: function() {
                    return this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING
                }
            }]),
                t
        }(),
            e = function(t) {
                function e(t) {
                    return _classCallCheck(this, e),
                        _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, Object.assign({
                            brokerUrl: "/v1/webapp/payment-email-socket/websocket",
                            requestUrl: "/v1/webapp/payment-email/request/",
                            responseUrl: "/payment-email/response/"
                        }, t)))
                }
                return _inherits(e, t),
                    e
            }(t),
            n = function(t) {
                function e(t) {
                    return _classCallCheck(this, e),
                        _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, Object.assign({
                            brokerUrl: "/v1/webapp/ais-token-socket/websocket",
                            requestUrl: "/v1/webapp/ais-token/request/",
                            responseUrl: "/ais-token/response/"
                        }, t)))
                }
                return _inherits(e, t),
                    e
            }(t),
            r = "/v1/webapp/tokenLoginSock/websocket",
            s = function(t) {
                function e(t) {
                    return _classCallCheck(this, e),
                        _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t))
                }
                return _inherits(e, t),
                    _createClass(e, [{
                        key: "onConnect",
                        value: function(t) {
                            this.subscription = this.stompClient.subscribe(this.opts.responseUrl, this.onSubscribe),
                                this.stompClient.send(this.opts.requestUrl, {}, JSON.stringify(this.opts.channelId))
                        }
                    }]),
                    e
            }(t),
            {
                PaymentWebSocket: e,
                AisWebSocket: n,
                LoginWebSocket: s,
                CLICLoginWebSocket: function(t) {
                    function e(t) {
                        return _classCallCheck(this, e),
                            _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, Object.assign({
                                brokerUrl: "/v1/webapp/identity-token-socket/websocket",
                                requestUrl: "/v1/webapp/identity-token/request/" + t.channelId,
                                responseUrl: "/identity-token/response/" + t.channelId
                            }, t)))
                    }
                    return _inherits(e, t),
                        e
                }(s),
                CitizenLoginWebSocket: function(t) {
                    function e(t) {
                        return _classCallCheck(this, e),
                            _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, Object.assign({
                                brokerUrl: r,
                                requestUrl: "/v1/webapp/tokenLogin/request/" + t.channelId,
                                responseUrl: "/tokenLogin/response/" + t.channelId
                            }, t)))
                    }
                    return _inherits(e, t),
                        e
                }(s),
                JwtLoginWebSocket: function(t) {
                    function e(t) {
                        return _classCallCheck(this, e),
                            _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, Object.assign({
                                brokerUrl: r,
                                requestUrl: "/v1/webapp/tokenLogin/thirdPartyJwtRequest/" + t.channelId,
                                responseUrl: "/tokenLogin/thirdPartyJwtResponse/" + t.channelId
                            }, t)))
                    }
                    return _inherits(e, t),
                        e
                }(s),
                JwtMagicLinkLoginWebSocket: function(t) {
                    function e(t) {
                        return _classCallCheck(this, e),
                            _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, Object.assign({
                                brokerUrl: r,
                                requestUrl: "/v1/webapp/tokenLogin/third-party-jwt-request/" + t.channelId,
                                responseUrl: "/tokenLogin/third-party-jwt-response/" + t.channelId
                            }, t)))
                    }
                    return _inherits(e, t),
                        e
                }(s),
                PayoutWebSocket: function(t) {
                    function e(t) {
                        return _classCallCheck(this, e),
                            _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, Object.assign({
                                brokerUrl: "/v1/webapp/payout-token-socket/websocket",
                                requestUrl: "/v1/webapp/payout-token/request/",
                                responseUrl: "/payout-token/response/"
                            }, t)))
                    }
                    return _inherits(e, t),
                        _createClass(e, [{
                            key: "onConnect",
                            value: function(t) {
                                this.reconnectionRetries = 0;
                                var e = this.opts.channelId.replace(/['"]+/g, "")
                                    , n = this.opts.requestUrl + e
                                    , r = this.opts.responseUrl + e;
                                this.subscription = this.stompClient.subscribe(r, this.onSubscribe),
                                    this.stompClient.send(n, {}, JSON.stringify(e))
                            }
                        }]),
                        e
                }(t)
            })
    }();
