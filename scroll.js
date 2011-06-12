/* See LICENSE for terms of usage */
(function () {
    function E(b) {
        var c = b.parentNode;
        return {
            node: b,
            scrollbar: B(b),
            min: -c.scrollHeight + c.offsetHeight,
            max: 0,
            viewport: c.offsetHeight,
            bounce: c.offsetHeight * e,
            constrained: !0,
            filter: function (a, b) {
                return b
            },
            disable: function (b, c, d, e) {
                var f = Math.abs(b - d),
                    g = Math.abs(c - e);
                if (f > g && f > a) return !0
            },
            update: function (a, b) {
                A(a, a.scrollable_horizontal, b)
            }
        }
    }
    function D(b) {
        var c = b.parentNode;
        return {
            node: b,
            min: -c.scrollWidth + c.offsetWidth,
            max: 0,
            viewport: c.offsetWidth,
            bounce: c.offsetWidth * e,
            constrained: !0,
            filter: function (a, b) {
                return a
            },
            disable: function (b, c, d, e) {
                var f = Math.abs(b - d),
                    g = Math.abs(c - e);
                if (g > f && g > a) return !0
            },
            update: function (a, b) {
                A(a, b, a.scrollable_vertical)
            }
        }
    }
    function C(a, b, c, d) {
        return a == d ? b + c : c * (-Math.pow(2, -10 * a / d) + 1) + b
    }
    function B(a) {
        if (!a.scrollableScrollbar) {
            var b = a.scrollableScrollbar = document.createElement("div");
            b.className = "scrollableScrollbar", b.style.cssText = ["position: absolute", "top: 0", "right: 2px", "width: 5px", "min-height: 6px", "background: #666", "opacity: 0", "-webkit-border-radius: 2px 3px", "-webkit-transform: translate3d(0,0,0)", "-webkit-transition: opacity 0.15s linear"].join(";")
        }
        return a.scrollableScrollbar
    }
    function A(a, b, c) {
        a.style.webkitTransform = "translate3d(" + (b ? b + "px" : "0") + "," + (c ? c + "px" : "0") + "," + "0)"
    }
    function z() {
        if (q) {
            clearInterval(q), q = 0;
            for (var a = 0; a < r.length; ++a) {
                var b = r[a];
                b.terminator()
            }
            r = []
        }
    }
    function y(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            c.className = c.className.replace("touched", "")
        }
    }
    function x(a) {
        var b = [];
        for (var c = a; c; c = c.parentNode) c.nodeType == 1 && (c.className = (c.className ? c.className + " " : "") + "touched", b.push(c));
        return b
    }
    function w(a) {
        var b = [];
        while (a) {
            if (a.nodeType == 1) {
                var c = a.className.split(" ");
                if (c.indexOf("scrollable") != -1) {
                    var d = c.indexOf("paginated") != -1;
                    for (var e = 0; e < c.length; ++e) {
                        var f = c[e];
                        if (s[f]) {
                            var g = s[f](a);
                            g.key = "scrollable_" + f, g.paginated = d, g.key in a || (a[g.key] = g.initial ? g.initial(a) : 0), b.push(g)
                        }
                    }
                    if (c.indexOf("exclusive") != -1) break
                }
            }
            a = a.parentNode
        }
        return b
    }
    function v() {
        var a = (new Date).getTime();
        for (var b = 0; b < r.length; ++b) {
            var c = r[b],
                d = c.filter(m, n);
            c.animator(d, a) || (c.terminator(), r.splice(b--, 1))
        }
        r.length || z()
    }
    function u(a, e, k, l) {
        function N() {
            n ? M(Math.round(s / q) * q) : s > u && m ? M(u) : s < t && m && M(t), r && (r.style.opacity = "0", r.style.webkitTransition = "opacity 0.2s linear")
        }
        function M(b, c) {
            s = b, a.node[a.key] = s, a.update(a.node, s);
            var d = -t - u;
            if (r && q < d) {
                var e = q - j * 2,
                    f = e / d * e,
                    g = 0;
                s > u ? (f = Math.max(f - (s - u), 5), g = 0) : s < t ? (f = Math.max(f - (t - s), 5), g = e - f) : g = Math.round(Math.abs(s) / d * (e - f)), g += j, r.style.height = Math.round(f) + "px", A(r, 0, Math.round(g)), p && (r.style.opacity = "0.8", r.style.webkitTransition = "none")
            }
            return c
        }
        function L(a, e) {
            var h = 1 / (e - G);
            G = e;
            var j = !0;
            if (o) {
                var k = (a - F) * b;
                if (!k) {
                    H || (H = e);
                    if (e - H < I) return !0
                } else H = 0;
                F = a, x = k / h;
                if (s > u && m) {
                    var l = s - u;
                    x *= 1 - l / D
                } else if (s < t && m) {
                    var l = t - s;
                    x *= 1 - l / D
                }
            } else {
                if (n && !J) {
                    J = !0;
                    if (Math.abs(s - u) > E || Math.abs(x) > i) s > u ? u != w && (u += q, t += q) : t != v && (u -= q, t -= q)
                }
                if (s > u && m) {
                    if (!(x > 0)) {
                        y || (z = s, B = u - s), s = C(y, z, B, g);
                        return M(s, ++y <= g && Math.floor(s) > u)
                    }
                    var l = s - u,
                        p = 1 - l / D;
                    x = Math.max(x - f * h, 0) * p, y = 0
                } else if (s < t && m) {
                    if (!(x < 0)) {
                        y || (z = s, B = t - s), s = C(y, z, B, g);
                        return M(s, ++y <= g && Math.ceil(s) < t)
                    }
                    var l = t - s,
                        p = 1 - l / D;
                    x = Math.min(x + f * h, 0) * p, y = 0
                } else {
                    y || (x < 0 && x < -c ? x = -c : x > 0 && x > c && (x = c), z = x), x = C(y, z, -z, d);
                    if (++y > d || Math.floor(x) == 0) j = !1
                }
            }
            s += x * h;
            return M(s, j)
        }
        var m = a.constrained,
            n = a.paginated,
            q = a.viewport || 0,
            r = a.scrollbar,
            s = a.node[a.key],
            t = a.min,
            u = a.max,
            v = t,
            w = Math.round(u / q) * q,
            x = 0,
            y = 0,
            z, B, D = a.bounce,
            E = q * h,
            F = a.filter(e, k),
            G = l,
            H = 0,
            I = 20,
            J = !1;
        if (n) {
            var K = Math.round(s / q) * q;
            t = u = Math.round(K + w)
        }
        r && a.node.parentNode.appendChild(r);
        return {
            filter: a.filter,
            disable: a.disable,
            animator: L,
            terminator: N
        }
    }
    function t(a) {
        function t(a) {
            d && (clearTimeout(d), d = 0);
            if (b) {
                var c = document.createEvent("MouseEvents");
                c.initMouseEvent("click", !0, !0, window, 1), b[0].dispatchEvent(c), y(b)
            }
            j.removeEventListener("touchmove", s, !1), j.removeEventListener("touchend", t, !1), o = !1
        }
        function s(a) {
            a.preventDefault(), p = !0, d && (clearTimeout(d), d = 0), b && (y(b), b = null);
            var c = a.touches[0];
            m = c.clientX, n = c.clientY;
            if (r.length > 1) for (var e = 0; e < r.length; ++e) {
                var f = r[e];
                if (f.disable && f.disable(m, n, k, l)) {
                    f.terminator(), r.splice(e, 1);
                    break
                }
            }
        }
        a.preventDefault();
        var b = null,
            c = a.target,
            d = setTimeout(function () {
                d = 0, b = x(c)
            }, 50);
        z();
        var e = a.touches[0];
        m = k = e.clientX, n = l = e.clientY, o = !0, p = !1, r = [];
        var f = (new Date).getTime(),
            g = w(a.target);
        if (g.length) {
            for (var h = 0; h < g.length; ++h) {
                var i = u(g[h], m, n, f);
                i && r.push(i)
            }
            q = setInterval(v, 0)
        }
        var j = document;
        j.addEventListener("touchmove", s, !1), j.addEventListener("touchend", t, !1)
    }
    var a = 10,
        b = 1,
        c = 720 / devicePixelRatio,
        d = 350,
        e = .5,
        f = 300,
        g = 90,
        h = .05,
        i = 50,
        j = 2,
        k, l, m, n, o, p, q = 0,
        r = [],
        s = {
            horizontal: D,
            vertical: E
        };
    document.addEventListener("touchstart", t, !1)
})()