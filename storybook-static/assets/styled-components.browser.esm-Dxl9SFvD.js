import { R as nt, r as fe } from "./index-DmM0KDA7.js";
var R = function () {
  return (
    (R =
      Object.assign ||
      function (e) {
        for (var r, n = 1, s = arguments.length; n < s; n++) {
          r = arguments[n];
          for (var o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
        }
        return e;
      }),
    R.apply(this, arguments)
  );
};
function vt(t, e, r) {
  if (r || arguments.length === 2)
    for (var n = 0, s = e.length, o; n < s; n++)
      (o || !(n in e)) &&
        (o || (o = Array.prototype.slice.call(e, 0, n)), (o[n] = e[n]));
  return t.concat(o || Array.prototype.slice.call(e));
}
var v = "-ms-",
  rt = "-moz-",
  h = "-webkit-",
  pe = "comm",
  Ct = "rule",
  Mt = "decl",
  Me = "@import",
  he = "@keyframes",
  Ye = "@layer",
  de = Math.abs,
  Yt = String.fromCharCode,
  Dt = Object.assign;
function We(t, e) {
  return _(t, 0) ^ 45
    ? (((((((e << 2) ^ _(t, 0)) << 2) ^ _(t, 1)) << 2) ^ _(t, 2)) << 2) ^
        _(t, 3)
    : 0;
}
function le(t) {
  return t.trim();
}
function D(t, e) {
  return (t = e.exec(t)) ? t[0] : t;
}
function u(t, e, r) {
  return t.replace(e, r);
}
function dt(t, e, r) {
  return t.indexOf(e, r);
}
function _(t, e) {
  return t.charCodeAt(e) | 0;
}
function q(t, e, r) {
  return t.slice(e, r);
}
function O(t) {
  return t.length;
}
function ge(t) {
  return t.length;
}
function et(t, e) {
  return e.push(t), t;
}
function He(t, e) {
  return t.map(e).join("");
}
function Zt(t, e) {
  return t.filter(function (r) {
    return !D(r, e);
  });
}
var xt = 1,
  K = 1,
  me = 0,
  k = 0,
  I = 0,
  Q = "";
function At(t, e, r, n, s, o, a, c) {
  return {
    value: t,
    root: e,
    parent: r,
    type: n,
    props: s,
    children: o,
    line: xt,
    column: K,
    length: a,
    return: "",
    siblings: c,
  };
}
function F(t, e) {
  return Dt(
    At("", null, null, "", null, null, 0, t.siblings),
    t,
    { length: -t.length },
    e,
  );
}
function W(t) {
  for (; t.root; ) t = F(t.root, { children: [t] });
  et(t, t.siblings);
}
function qe() {
  return I;
}
function Ke() {
  return (I = k > 0 ? _(Q, --k) : 0), K--, I === 10 && ((K = 1), xt--), I;
}
function N() {
  return (I = k < me ? _(Q, k++) : 0), K++, I === 10 && ((K = 1), xt++), I;
}
function L() {
  return _(Q, k);
}
function lt() {
  return k;
}
function It(t, e) {
  return q(Q, t, e);
}
function jt(t) {
  switch (t) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Ue(t) {
  return (xt = K = 1), (me = O((Q = t))), (k = 0), [];
}
function Ze(t) {
  return (Q = ""), t;
}
function kt(t) {
  return le(It(k - 1, zt(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function Je(t) {
  for (; (I = L()) && I < 33; ) N();
  return jt(t) > 2 || jt(I) > 3 ? "" : " ";
}
function Qe(t, e) {
  for (
    ;
    --e &&
    N() &&
    !(I < 48 || I > 102 || (I > 57 && I < 65) || (I > 70 && I < 97));

  );
  return It(t, lt() + (e < 6 && L() == 32 && N() == 32));
}
function zt(t) {
  for (; N(); )
    switch (I) {
      case t:
        return k;
      case 34:
      case 39:
        t !== 34 && t !== 39 && zt(I);
        break;
      case 40:
        t === 41 && zt(t);
        break;
      case 92:
        N();
        break;
    }
  return k;
}
function Ve(t, e) {
  for (; N() && t + I !== 57; ) if (t + I === 84 && L() === 47) break;
  return "/*" + It(e, k - 1) + "*" + Yt(t === 47 ? t : N());
}
function Xe(t) {
  for (; !jt(L()); ) N();
  return It(t, k);
}
function tr(t) {
  return Ze(gt("", null, null, null, [""], (t = Ue(t)), 0, [0], t));
}
function gt(t, e, r, n, s, o, a, c, i) {
  for (
    var l = 0,
      d = 0,
      g = a,
      m = 0,
      p = 0,
      S = 0,
      x = 1,
      $ = 1,
      A = 1,
      w = 0,
      b = "",
      C = s,
      E = o,
      y = n,
      f = b;
    $;

  )
    switch (((S = w), (w = N()))) {
      case 40:
        if (S != 108 && _(f, g - 1) == 58) {
          dt((f += u(kt(w), "&", "&\f")), "&\f", de(l ? c[l - 1] : 0)) != -1 &&
            (A = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        f += kt(w);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        f += Je(S);
        break;
      case 92:
        f += Qe(lt() - 1, 7);
        continue;
      case 47:
        switch (L()) {
          case 42:
          case 47:
            et(er(Ve(N(), lt()), e, r, i), i);
            break;
          default:
            f += "/";
        }
        break;
      case 123 * x:
        c[l++] = O(f) * A;
      case 125 * x:
      case 59:
      case 0:
        switch (w) {
          case 0:
          case 125:
            $ = 0;
          case 59 + d:
            A == -1 && (f = u(f, /\f/g, "")),
              p > 0 &&
                O(f) - g &&
                et(
                  p > 32
                    ? Qt(f + ";", n, r, g - 1, i)
                    : Qt(u(f, " ", "") + ";", n, r, g - 2, i),
                  i,
                );
            break;
          case 59:
            f += ";";
          default:
            if (
              (et(
                (y = Jt(f, e, r, l, d, s, c, b, (C = []), (E = []), g, o)),
                o,
              ),
              w === 123)
            )
              if (d === 0) gt(f, e, y, y, C, o, g, c, E);
              else
                switch (m === 99 && _(f, 3) === 110 ? 100 : m) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    gt(
                      t,
                      y,
                      y,
                      n && et(Jt(t, y, y, 0, 0, s, c, b, s, (C = []), g, E), E),
                      s,
                      E,
                      g,
                      c,
                      n ? C : E,
                    );
                    break;
                  default:
                    gt(f, y, y, y, [""], E, 0, c, E);
                }
        }
        (l = d = p = 0), (x = A = 1), (b = f = ""), (g = a);
        break;
      case 58:
        (g = 1 + O(f)), (p = S);
      default:
        if (x < 1) {
          if (w == 123) --x;
          else if (w == 125 && x++ == 0 && Ke() == 125) continue;
        }
        switch (((f += Yt(w)), w * x)) {
          case 38:
            A = d > 0 ? 1 : ((f += "\f"), -1);
            break;
          case 44:
            (c[l++] = (O(f) - 1) * A), (A = 1);
            break;
          case 64:
            L() === 45 && (f += kt(N())),
              (m = L()),
              (d = g = O((b = f += Xe(lt())))),
              w++;
            break;
          case 45:
            S === 45 && O(f) == 2 && (x = 0);
        }
    }
  return o;
}
function Jt(t, e, r, n, s, o, a, c, i, l, d, g) {
  for (
    var m = s - 1, p = s === 0 ? o : [""], S = ge(p), x = 0, $ = 0, A = 0;
    x < n;
    ++x
  )
    for (var w = 0, b = q(t, m + 1, (m = de(($ = a[x])))), C = t; w < S; ++w)
      (C = le($ > 0 ? p[w] + " " + b : u(b, /&\f/g, p[w]))) && (i[A++] = C);
  return At(t, e, r, s === 0 ? Ct : c, i, l, d, g);
}
function er(t, e, r, n) {
  return At(t, e, r, pe, Yt(qe()), q(t, 2, -2), 0, n);
}
function Qt(t, e, r, n, s) {
  return At(t, e, r, Mt, q(t, 0, n), q(t, n + 1, -1), n, s);
}
function ye(t, e, r) {
  switch (We(t, e)) {
    case 5103:
      return h + "print-" + t + t;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return h + t + t;
    case 4789:
      return rt + t + t;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return h + t + rt + t + v + t + t;
    case 5936:
      switch (_(t, e + 11)) {
        case 114:
          return h + t + v + u(t, /[svh]\w+-[tblr]{2}/, "tb") + t;
        case 108:
          return h + t + v + u(t, /[svh]\w+-[tblr]{2}/, "tb-rl") + t;
        case 45:
          return h + t + v + u(t, /[svh]\w+-[tblr]{2}/, "lr") + t;
      }
    case 6828:
    case 4268:
    case 2903:
      return h + t + v + t + t;
    case 6165:
      return h + t + v + "flex-" + t + t;
    case 5187:
      return (
        h + t + u(t, /(\w+).+(:[^]+)/, h + "box-$1$2" + v + "flex-$1$2") + t
      );
    case 5443:
      return (
        h +
        t +
        v +
        "flex-item-" +
        u(t, /flex-|-self/g, "") +
        (D(t, /flex-|baseline/)
          ? ""
          : v + "grid-row-" + u(t, /flex-|-self/g, "")) +
        t
      );
    case 4675:
      return (
        h +
        t +
        v +
        "flex-line-pack" +
        u(t, /align-content|flex-|-self/g, "") +
        t
      );
    case 5548:
      return h + t + v + u(t, "shrink", "negative") + t;
    case 5292:
      return h + t + v + u(t, "basis", "preferred-size") + t;
    case 6060:
      return (
        h +
        "box-" +
        u(t, "-grow", "") +
        h +
        t +
        v +
        u(t, "grow", "positive") +
        t
      );
    case 4554:
      return h + u(t, /([^-])(transform)/g, "$1" + h + "$2") + t;
    case 6187:
      return (
        u(u(u(t, /(zoom-|grab)/, h + "$1"), /(image-set)/, h + "$1"), t, "") + t
      );
    case 5495:
    case 3959:
      return u(t, /(image-set\([^]*)/, h + "$1$`$1");
    case 4968:
      return (
        u(
          u(t, /(.+:)(flex-)?(.*)/, h + "box-pack:$3" + v + "flex-pack:$3"),
          /s.+-b[^;]+/,
          "justify",
        ) +
        h +
        t +
        t
      );
    case 4200:
      if (!D(t, /flex-|baseline/)) return v + "grid-column-align" + q(t, e) + t;
      break;
    case 2592:
    case 3360:
      return v + u(t, "template-", "") + t;
    case 4384:
    case 3616:
      return r &&
        r.some(function (n, s) {
          return (e = s), D(n.props, /grid-\w+-end/);
        })
        ? ~dt(t + (r = r[e].value), "span", 0)
          ? t
          : v +
            u(t, "-start", "") +
            t +
            v +
            "grid-row-span:" +
            (~dt(r, "span", 0) ? D(r, /\d+/) : +D(r, /\d+/) - +D(t, /\d+/)) +
            ";"
        : v + u(t, "-start", "") + t;
    case 4896:
    case 4128:
      return r &&
        r.some(function (n) {
          return D(n.props, /grid-\w+-start/);
        })
        ? t
        : v + u(u(t, "-end", "-span"), "span ", "") + t;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return u(t, /(.+)-inline(.+)/, h + "$1$2") + t;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (O(t) - 1 - e > 6)
        switch (_(t, e + 1)) {
          case 109:
            if (_(t, e + 4) !== 45) break;
          case 102:
            return (
              u(
                t,
                /(.+:)(.+)-([^]+)/,
                "$1" +
                  h +
                  "$2-$3$1" +
                  rt +
                  (_(t, e + 3) == 108 ? "$3" : "$2-$3"),
              ) + t
            );
          case 115:
            return ~dt(t, "stretch", 0)
              ? ye(u(t, "stretch", "fill-available"), e, r) + t
              : t;
        }
      break;
    case 5152:
    case 5920:
      return u(
        t,
        /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,
        function (n, s, o, a, c, i, l) {
          return (
            v +
            s +
            ":" +
            o +
            l +
            (a ? v + s + "-span:" + (c ? i : +i - +o) + l : "") +
            t
          );
        },
      );
    case 4949:
      if (_(t, e + 6) === 121) return u(t, ":", ":" + h) + t;
      break;
    case 6444:
      switch (_(t, _(t, 14) === 45 ? 18 : 11)) {
        case 120:
          return (
            u(
              t,
              /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,
              "$1" +
                h +
                (_(t, 14) === 45 ? "inline-" : "") +
                "box$3$1" +
                h +
                "$2$3$1" +
                v +
                "$2box$3",
            ) + t
          );
        case 100:
          return u(t, ":", ":" + v) + t;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return u(t, "scroll-", "scroll-snap-") + t;
  }
  return t;
}
function bt(t, e) {
  for (var r = "", n = 0; n < t.length; n++) r += e(t[n], n, t, e) || "";
  return r;
}
function rr(t, e, r, n) {
  switch (t.type) {
    case Ye:
      if (t.children.length) break;
    case Me:
    case Mt:
      return (t.return = t.return || t.value);
    case pe:
      return "";
    case he:
      return (t.return = t.value + "{" + bt(t.children, n) + "}");
    case Ct:
      if (!O((t.value = t.props.join(",")))) return "";
  }
  return O((r = bt(t.children, n))) ? (t.return = t.value + "{" + r + "}") : "";
}
function nr(t) {
  var e = ge(t);
  return function (r, n, s, o) {
    for (var a = "", c = 0; c < e; c++) a += t[c](r, n, s, o) || "";
    return a;
  };
}
function sr(t) {
  return function (e) {
    e.root || ((e = e.return) && t(e));
  };
}
function or(t, e, r, n) {
  if (t.length > -1 && !t.return)
    switch (t.type) {
      case Mt:
        t.return = ye(t.value, t.length, r);
        return;
      case he:
        return bt([F(t, { value: u(t.value, "@", "@" + h) })], n);
      case Ct:
        if (t.length)
          return He((r = t.props), function (s) {
            switch (D(s, (n = /(::plac\w+|:read-\w+)/))) {
              case ":read-only":
              case ":read-write":
                W(F(t, { props: [u(s, /:(read-\w+)/, ":" + rt + "$1")] })),
                  W(F(t, { props: [s] })),
                  Dt(t, { props: Zt(r, n) });
                break;
              case "::placeholder":
                W(F(t, { props: [u(s, /:(plac\w+)/, ":" + h + "input-$1")] })),
                  W(F(t, { props: [u(s, /:(plac\w+)/, ":" + rt + "$1")] })),
                  W(F(t, { props: [u(s, /:(plac\w+)/, v + "input-$1")] })),
                  W(F(t, { props: [s] })),
                  Dt(t, { props: Zt(r, n) });
                break;
            }
            return "";
          });
    }
}
var ar = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  P = {},
  U =
    (typeof process < "u" &&
      P !== void 0 &&
      (P.REACT_APP_SC_ATTR || P.SC_ATTR)) ||
    "data-styled",
  ve = "active",
  be = "data-styled-version",
  Et = "6.1.15",
  Wt = `/*!sc*/
`,
  St = typeof window < "u" && "HTMLElement" in window,
  ir = !!(typeof SC_DISABLE_SPEEDY == "boolean"
    ? SC_DISABLE_SPEEDY
    : typeof process < "u" &&
        P !== void 0 &&
        P.REACT_APP_SC_DISABLE_SPEEDY !== void 0 &&
        P.REACT_APP_SC_DISABLE_SPEEDY !== ""
      ? P.REACT_APP_SC_DISABLE_SPEEDY !== "false" &&
        P.REACT_APP_SC_DISABLE_SPEEDY
      : typeof process < "u" &&
        P !== void 0 &&
        P.SC_DISABLE_SPEEDY !== void 0 &&
        P.SC_DISABLE_SPEEDY !== "" &&
        P.SC_DISABLE_SPEEDY !== "false" &&
        P.SC_DISABLE_SPEEDY),
  _t = Object.freeze([]),
  Z = Object.freeze({});
function cr(t, e, r) {
  return (
    r === void 0 && (r = Z), (t.theme !== r.theme && t.theme) || e || r.theme
  );
}
var Se = new Set([
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "track",
    "u",
    "ul",
    "use",
    "var",
    "video",
    "wbr",
    "circle",
    "clipPath",
    "defs",
    "ellipse",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "stop",
    "svg",
    "text",
    "tspan",
  ]),
  ur = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,
  fr = /(^-|-$)/g;
function Vt(t) {
  return t.replace(ur, "-").replace(fr, "");
}
var pr = /(a)(d)/gi,
  pt = 52,
  Xt = function (t) {
    return String.fromCharCode(t + (t > 25 ? 39 : 97));
  };
function Ft(t) {
  var e,
    r = "";
  for (e = Math.abs(t); e > pt; e = (e / pt) | 0) r = Xt(e % pt) + r;
  return (Xt(e % pt) + r).replace(pr, "$1-$2");
}
var Nt,
  we = 5381,
  H = function (t, e) {
    for (var r = e.length; r; ) t = (33 * t) ^ e.charCodeAt(--r);
    return t;
  },
  Ce = function (t) {
    return H(we, t);
  };
function hr(t) {
  return Ft(Ce(t) >>> 0);
}
function dr(t) {
  return t.displayName || t.name || "Component";
}
function Ot(t) {
  return typeof t == "string" && !0;
}
var xe = typeof Symbol == "function" && Symbol.for,
  Ae = xe ? Symbol.for("react.memo") : 60115,
  lr = xe ? Symbol.for("react.forward_ref") : 60112,
  gr = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0,
  },
  mr = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0,
  },
  Ie = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  yr =
    (((Nt = {})[lr] = {
      $$typeof: !0,
      render: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
    }),
    (Nt[Ae] = Ie),
    Nt);
function te(t) {
  return ("type" in (e = t) && e.type.$$typeof) === Ae
    ? Ie
    : "$$typeof" in t
      ? yr[t.$$typeof]
      : gr;
  var e;
}
var vr = Object.defineProperty,
  br = Object.getOwnPropertyNames,
  ee = Object.getOwnPropertySymbols,
  Sr = Object.getOwnPropertyDescriptor,
  wr = Object.getPrototypeOf,
  re = Object.prototype;
function Ee(t, e, r) {
  if (typeof e != "string") {
    if (re) {
      var n = wr(e);
      n && n !== re && Ee(t, n, r);
    }
    var s = br(e);
    ee && (s = s.concat(ee(e)));
    for (var o = te(t), a = te(e), c = 0; c < s.length; ++c) {
      var i = s[c];
      if (!(i in mr || (r && r[i]) || (a && i in a) || (o && i in o))) {
        var l = Sr(e, i);
        try {
          vr(t, i, l);
        } catch {}
      }
    }
  }
  return t;
}
function J(t) {
  return typeof t == "function";
}
function Ht(t) {
  return typeof t == "object" && "styledComponentId" in t;
}
function B(t, e) {
  return t && e ? "".concat(t, " ").concat(e) : t || e || "";
}
function ne(t, e) {
  if (t.length === 0) return "";
  for (var r = t[0], n = 1; n < t.length; n++) r += t[n];
  return r;
}
function st(t) {
  return (
    t !== null &&
    typeof t == "object" &&
    t.constructor.name === Object.name &&
    !("props" in t && t.$$typeof)
  );
}
function Gt(t, e, r) {
  if ((r === void 0 && (r = !1), !r && !st(t) && !Array.isArray(t))) return e;
  if (Array.isArray(e))
    for (var n = 0; n < e.length; n++) t[n] = Gt(t[n], e[n]);
  else if (st(e)) for (var n in e) t[n] = Gt(t[n], e[n]);
  return t;
}
function qt(t, e) {
  Object.defineProperty(t, "toString", { value: e });
}
function ot(t) {
  for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
  return new Error(
    "An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#"
      .concat(t, " for more information.")
      .concat(e.length > 0 ? " Args: ".concat(e.join(", ")) : ""),
  );
}
var Cr = (function () {
    function t(e) {
      (this.groupSizes = new Uint32Array(512)),
        (this.length = 512),
        (this.tag = e);
    }
    return (
      (t.prototype.indexOfGroup = function (e) {
        for (var r = 0, n = 0; n < e; n++) r += this.groupSizes[n];
        return r;
      }),
      (t.prototype.insertRules = function (e, r) {
        if (e >= this.groupSizes.length) {
          for (var n = this.groupSizes, s = n.length, o = s; e >= o; )
            if ((o <<= 1) < 0) throw ot(16, "".concat(e));
          (this.groupSizes = new Uint32Array(o)),
            this.groupSizes.set(n),
            (this.length = o);
          for (var a = s; a < o; a++) this.groupSizes[a] = 0;
        }
        for (
          var c = this.indexOfGroup(e + 1), i = ((a = 0), r.length);
          a < i;
          a++
        )
          this.tag.insertRule(c, r[a]) && (this.groupSizes[e]++, c++);
      }),
      (t.prototype.clearGroup = function (e) {
        if (e < this.length) {
          var r = this.groupSizes[e],
            n = this.indexOfGroup(e),
            s = n + r;
          this.groupSizes[e] = 0;
          for (var o = n; o < s; o++) this.tag.deleteRule(n);
        }
      }),
      (t.prototype.getGroup = function (e) {
        var r = "";
        if (e >= this.length || this.groupSizes[e] === 0) return r;
        for (
          var n = this.groupSizes[e],
            s = this.indexOfGroup(e),
            o = s + n,
            a = s;
          a < o;
          a++
        )
          r += "".concat(this.tag.getRule(a)).concat(Wt);
        return r;
      }),
      t
    );
  })(),
  mt = new Map(),
  wt = new Map(),
  yt = 1,
  ht = function (t) {
    if (mt.has(t)) return mt.get(t);
    for (; wt.has(yt); ) yt++;
    var e = yt++;
    return mt.set(t, e), wt.set(e, t), e;
  },
  xr = function (t, e) {
    (yt = e + 1), mt.set(t, e), wt.set(e, t);
  },
  Ar = "style[".concat(U, "][").concat(be, '="').concat(Et, '"]'),
  Ir = new RegExp(
    "^".concat(U, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),
  ),
  Er = function (t, e, r) {
    for (var n, s = r.split(","), o = 0, a = s.length; o < a; o++)
      (n = s[o]) && t.registerName(e, n);
  },
  _r = function (t, e) {
    for (
      var r,
        n = ((r = e.textContent) !== null && r !== void 0 ? r : "").split(Wt),
        s = [],
        o = 0,
        a = n.length;
      o < a;
      o++
    ) {
      var c = n[o].trim();
      if (c) {
        var i = c.match(Ir);
        if (i) {
          var l = 0 | parseInt(i[1], 10),
            d = i[2];
          l !== 0 && (xr(d, l), Er(t, d, i[3]), t.getTag().insertRules(l, s)),
            (s.length = 0);
        } else s.push(c);
      }
    }
  },
  se = function (t) {
    for (
      var e = document.querySelectorAll(Ar), r = 0, n = e.length;
      r < n;
      r++
    ) {
      var s = e[r];
      s &&
        s.getAttribute(U) !== ve &&
        (_r(t, s), s.parentNode && s.parentNode.removeChild(s));
    }
  };
function Rr() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : null;
}
var _e = function (t) {
    var e = document.head,
      r = t || e,
      n = document.createElement("style"),
      s = (function (c) {
        var i = Array.from(c.querySelectorAll("style[".concat(U, "]")));
        return i[i.length - 1];
      })(r),
      o = s !== void 0 ? s.nextSibling : null;
    n.setAttribute(U, ve), n.setAttribute(be, Et);
    var a = Rr();
    return a && n.setAttribute("nonce", a), r.insertBefore(n, o), n;
  },
  $r = (function () {
    function t(e) {
      (this.element = _e(e)),
        this.element.appendChild(document.createTextNode("")),
        (this.sheet = (function (r) {
          if (r.sheet) return r.sheet;
          for (var n = document.styleSheets, s = 0, o = n.length; s < o; s++) {
            var a = n[s];
            if (a.ownerNode === r) return a;
          }
          throw ot(17);
        })(this.element)),
        (this.length = 0);
    }
    return (
      (t.prototype.insertRule = function (e, r) {
        try {
          return this.sheet.insertRule(r, e), this.length++, !0;
        } catch {
          return !1;
        }
      }),
      (t.prototype.deleteRule = function (e) {
        this.sheet.deleteRule(e), this.length--;
      }),
      (t.prototype.getRule = function (e) {
        var r = this.sheet.cssRules[e];
        return r && r.cssText ? r.cssText : "";
      }),
      t
    );
  })(),
  Pr = (function () {
    function t(e) {
      (this.element = _e(e)),
        (this.nodes = this.element.childNodes),
        (this.length = 0);
    }
    return (
      (t.prototype.insertRule = function (e, r) {
        if (e <= this.length && e >= 0) {
          var n = document.createTextNode(r);
          return (
            this.element.insertBefore(n, this.nodes[e] || null),
            this.length++,
            !0
          );
        }
        return !1;
      }),
      (t.prototype.deleteRule = function (e) {
        this.element.removeChild(this.nodes[e]), this.length--;
      }),
      (t.prototype.getRule = function (e) {
        return e < this.length ? this.nodes[e].textContent : "";
      }),
      t
    );
  })(),
  kr = (function () {
    function t(e) {
      (this.rules = []), (this.length = 0);
    }
    return (
      (t.prototype.insertRule = function (e, r) {
        return (
          e <= this.length && (this.rules.splice(e, 0, r), this.length++, !0)
        );
      }),
      (t.prototype.deleteRule = function (e) {
        this.rules.splice(e, 1), this.length--;
      }),
      (t.prototype.getRule = function (e) {
        return e < this.length ? this.rules[e] : "";
      }),
      t
    );
  })(),
  oe = St,
  Nr = { isServer: !St, useCSSOMInjection: !ir },
  Re = (function () {
    function t(e, r, n) {
      e === void 0 && (e = Z), r === void 0 && (r = {});
      var s = this;
      (this.options = R(R({}, Nr), e)),
        (this.gs = r),
        (this.names = new Map(n)),
        (this.server = !!e.isServer),
        !this.server && St && oe && ((oe = !1), se(this)),
        qt(this, function () {
          return (function (o) {
            for (
              var a = o.getTag(),
                c = a.length,
                i = "",
                l = function (g) {
                  var m = (function (A) {
                    return wt.get(A);
                  })(g);
                  if (m === void 0) return "continue";
                  var p = o.names.get(m),
                    S = a.getGroup(g);
                  if (p === void 0 || !p.size || S.length === 0)
                    return "continue";
                  var x = "".concat(U, ".g").concat(g, '[id="').concat(m, '"]'),
                    $ = "";
                  p !== void 0 &&
                    p.forEach(function (A) {
                      A.length > 0 && ($ += "".concat(A, ","));
                    }),
                    (i += ""
                      .concat(S)
                      .concat(x, '{content:"')
                      .concat($, '"}')
                      .concat(Wt));
                },
                d = 0;
              d < c;
              d++
            )
              l(d);
            return i;
          })(s);
        });
    }
    return (
      (t.registerId = function (e) {
        return ht(e);
      }),
      (t.prototype.rehydrate = function () {
        !this.server && St && se(this);
      }),
      (t.prototype.reconstructWithOptions = function (e, r) {
        return (
          r === void 0 && (r = !0),
          new t(R(R({}, this.options), e), this.gs, (r && this.names) || void 0)
        );
      }),
      (t.prototype.allocateGSInstance = function (e) {
        return (this.gs[e] = (this.gs[e] || 0) + 1);
      }),
      (t.prototype.getTag = function () {
        return (
          this.tag ||
          (this.tag =
            ((e = (function (r) {
              var n = r.useCSSOMInjection,
                s = r.target;
              return r.isServer ? new kr(s) : n ? new $r(s) : new Pr(s);
            })(this.options)),
            new Cr(e)))
        );
        var e;
      }),
      (t.prototype.hasNameForId = function (e, r) {
        return this.names.has(e) && this.names.get(e).has(r);
      }),
      (t.prototype.registerName = function (e, r) {
        if ((ht(e), this.names.has(e))) this.names.get(e).add(r);
        else {
          var n = new Set();
          n.add(r), this.names.set(e, n);
        }
      }),
      (t.prototype.insertRules = function (e, r, n) {
        this.registerName(e, r), this.getTag().insertRules(ht(e), n);
      }),
      (t.prototype.clearNames = function (e) {
        this.names.has(e) && this.names.get(e).clear();
      }),
      (t.prototype.clearRules = function (e) {
        this.getTag().clearGroup(ht(e)), this.clearNames(e);
      }),
      (t.prototype.clearTag = function () {
        this.tag = void 0;
      }),
      t
    );
  })(),
  Or = /&/g,
  Tr = /^\s*\/\/.*$/gm;
function $e(t, e) {
  return t.map(function (r) {
    return (
      r.type === "rule" &&
        ((r.value = "".concat(e, " ").concat(r.value)),
        (r.value = r.value.replaceAll(",", ",".concat(e, " "))),
        (r.props = r.props.map(function (n) {
          return "".concat(e, " ").concat(n);
        }))),
      Array.isArray(r.children) &&
        r.type !== "@keyframes" &&
        (r.children = $e(r.children, e)),
      r
    );
  });
}
function Dr(t) {
  var e,
    r,
    n,
    s = Z,
    o = s.options,
    a = o === void 0 ? Z : o,
    c = s.plugins,
    i = c === void 0 ? _t : c,
    l = function (m, p, S) {
      return S.startsWith(r) && S.endsWith(r) && S.replaceAll(r, "").length > 0
        ? ".".concat(e)
        : m;
    },
    d = i.slice();
  d.push(function (m) {
    m.type === Ct &&
      m.value.includes("&") &&
      (m.props[0] = m.props[0].replace(Or, r).replace(n, l));
  }),
    a.prefix && d.push(or),
    d.push(rr);
  var g = function (m, p, S, x) {
    p === void 0 && (p = ""),
      S === void 0 && (S = ""),
      x === void 0 && (x = "&"),
      (e = x),
      (r = p),
      (n = new RegExp("\\".concat(r, "\\b"), "g"));
    var $ = m.replace(Tr, ""),
      A = tr(S || p ? "".concat(S, " ").concat(p, " { ").concat($, " }") : $);
    a.namespace && (A = $e(A, a.namespace));
    var w = [];
    return (
      bt(
        A,
        nr(
          d.concat(
            sr(function (b) {
              return w.push(b);
            }),
          ),
        ),
      ),
      w
    );
  };
  return (
    (g.hash = i.length
      ? i
          .reduce(function (m, p) {
            return p.name || ot(15), H(m, p.name);
          }, we)
          .toString()
      : ""),
    g
  );
}
var jr = new Re(),
  Bt = Dr(),
  Pe = nt.createContext({
    shouldForwardProp: void 0,
    styleSheet: jr,
    stylis: Bt,
  });
Pe.Consumer;
nt.createContext(void 0);
function ae() {
  return fe.useContext(Pe);
}
var zr = (function () {
    function t(e, r) {
      var n = this;
      (this.inject = function (s, o) {
        o === void 0 && (o = Bt);
        var a = n.name + o.hash;
        s.hasNameForId(n.id, a) ||
          s.insertRules(n.id, a, o(n.rules, a, "@keyframes"));
      }),
        (this.name = e),
        (this.id = "sc-keyframes-".concat(e)),
        (this.rules = r),
        qt(this, function () {
          throw ot(12, String(n.name));
        });
    }
    return (
      (t.prototype.getName = function (e) {
        return e === void 0 && (e = Bt), this.name + e.hash;
      }),
      t
    );
  })(),
  Fr = function (t) {
    return t >= "A" && t <= "Z";
  };
function ie(t) {
  for (var e = "", r = 0; r < t.length; r++) {
    var n = t[r];
    if (r === 1 && n === "-" && t[0] === "-") return t;
    Fr(n) ? (e += "-" + n.toLowerCase()) : (e += n);
  }
  return e.startsWith("ms-") ? "-" + e : e;
}
var ke = function (t) {
    return t == null || t === !1 || t === "";
  },
  Ne = function (t) {
    var e,
      r,
      n = [];
    for (var s in t) {
      var o = t[s];
      t.hasOwnProperty(s) &&
        !ke(o) &&
        ((Array.isArray(o) && o.isCss) || J(o)
          ? n.push("".concat(ie(s), ":"), o, ";")
          : st(o)
            ? n.push.apply(
                n,
                vt(vt(["".concat(s, " {")], Ne(o), !1), ["}"], !1),
              )
            : n.push(
                ""
                  .concat(ie(s), ": ")
                  .concat(
                    ((e = s),
                    (r = o) == null || typeof r == "boolean" || r === ""
                      ? ""
                      : typeof r != "number" ||
                          r === 0 ||
                          e in ar ||
                          e.startsWith("--")
                        ? String(r).trim()
                        : "".concat(r, "px")),
                    ";",
                  ),
              ));
    }
    return n;
  };
function M(t, e, r, n) {
  if (ke(t)) return [];
  if (Ht(t)) return [".".concat(t.styledComponentId)];
  if (J(t)) {
    if (!J((o = t)) || (o.prototype && o.prototype.isReactComponent) || !e)
      return [t];
    var s = t(e);
    return M(s, e, r, n);
  }
  var o;
  return t instanceof zr
    ? r
      ? (t.inject(r, n), [t.getName(n)])
      : [t]
    : st(t)
      ? Ne(t)
      : Array.isArray(t)
        ? Array.prototype.concat.apply(
            _t,
            t.map(function (a) {
              return M(a, e, r, n);
            }),
          )
        : [t.toString()];
}
function Gr(t) {
  for (var e = 0; e < t.length; e += 1) {
    var r = t[e];
    if (J(r) && !Ht(r)) return !1;
  }
  return !0;
}
var Br = Ce(Et),
  Lr = (function () {
    function t(e, r, n) {
      (this.rules = e),
        (this.staticRulesId = ""),
        (this.isStatic = (n === void 0 || n.isStatic) && Gr(e)),
        (this.componentId = r),
        (this.baseHash = H(Br, r)),
        (this.baseStyle = n),
        Re.registerId(r);
    }
    return (
      (t.prototype.generateAndInjectStyles = function (e, r, n) {
        var s = this.baseStyle
          ? this.baseStyle.generateAndInjectStyles(e, r, n)
          : "";
        if (this.isStatic && !n.hash)
          if (
            this.staticRulesId &&
            r.hasNameForId(this.componentId, this.staticRulesId)
          )
            s = B(s, this.staticRulesId);
          else {
            var o = ne(M(this.rules, e, r, n)),
              a = Ft(H(this.baseHash, o) >>> 0);
            if (!r.hasNameForId(this.componentId, a)) {
              var c = n(o, ".".concat(a), void 0, this.componentId);
              r.insertRules(this.componentId, a, c);
            }
            (s = B(s, a)), (this.staticRulesId = a);
          }
        else {
          for (
            var i = H(this.baseHash, n.hash), l = "", d = 0;
            d < this.rules.length;
            d++
          ) {
            var g = this.rules[d];
            if (typeof g == "string") l += g;
            else if (g) {
              var m = ne(M(g, e, r, n));
              (i = H(i, m + d)), (l += m);
            }
          }
          if (l) {
            var p = Ft(i >>> 0);
            r.hasNameForId(this.componentId, p) ||
              r.insertRules(
                this.componentId,
                p,
                n(l, ".".concat(p), void 0, this.componentId),
              ),
              (s = B(s, p));
          }
        }
        return s;
      }),
      t
    );
  })(),
  Oe = nt.createContext(void 0);
Oe.Consumer;
var Tt = {};
function Mr(t, e, r) {
  var n = Ht(t),
    s = t,
    o = !Ot(t),
    a = e.attrs,
    c = a === void 0 ? _t : a,
    i = e.componentId,
    l =
      i === void 0
        ? (function (C, E) {
            var y = typeof C != "string" ? "sc" : Vt(C);
            Tt[y] = (Tt[y] || 0) + 1;
            var f = "".concat(y, "-").concat(hr(Et + y + Tt[y]));
            return E ? "".concat(E, "-").concat(f) : f;
          })(e.displayName, e.parentComponentId)
        : i,
    d = e.displayName,
    g =
      d === void 0
        ? (function (C) {
            return Ot(C) ? "styled.".concat(C) : "Styled(".concat(dr(C), ")");
          })(t)
        : d,
    m =
      e.displayName && e.componentId
        ? "".concat(Vt(e.displayName), "-").concat(e.componentId)
        : e.componentId || l,
    p = n && s.attrs ? s.attrs.concat(c).filter(Boolean) : c,
    S = e.shouldForwardProp;
  if (n && s.shouldForwardProp) {
    var x = s.shouldForwardProp;
    if (e.shouldForwardProp) {
      var $ = e.shouldForwardProp;
      S = function (C, E) {
        return x(C, E) && $(C, E);
      };
    } else S = x;
  }
  var A = new Lr(r, m, n ? s.componentStyle : void 0);
  function w(C, E) {
    return (function (y, f, Y) {
      var at = y.attrs,
        De = y.componentStyle,
        je = y.defaultProps,
        ze = y.foldedComponentIds,
        Fe = y.styledComponentId,
        Ge = y.target,
        Be = nt.useContext(Oe),
        Le = ae(),
        Rt = y.shouldForwardProp || Le.shouldForwardProp,
        Kt = cr(f, Be, je) || Z,
        T = (function (ct, X, ut) {
          for (
            var tt, G = R(R({}, X), { className: void 0, theme: ut }), Pt = 0;
            Pt < ct.length;
            Pt += 1
          ) {
            var ft = J((tt = ct[Pt])) ? tt(G) : tt;
            for (var z in ft)
              G[z] =
                z === "className"
                  ? B(G[z], ft[z])
                  : z === "style"
                    ? R(R({}, G[z]), ft[z])
                    : ft[z];
          }
          return X.className && (G.className = B(G.className, X.className)), G;
        })(at, f, Kt),
        it = T.as || Ge,
        V = {};
      for (var j in T)
        T[j] === void 0 ||
          j[0] === "$" ||
          j === "as" ||
          (j === "theme" && T.theme === Kt) ||
          (j === "forwardedAs"
            ? (V.as = T.forwardedAs)
            : (Rt && !Rt(j, it)) || (V[j] = T[j]));
      var Ut = (function (ct, X) {
          var ut = ae(),
            tt = ct.generateAndInjectStyles(X, ut.styleSheet, ut.stylis);
          return tt;
        })(De, T),
        $t = B(ze, Fe);
      return (
        Ut && ($t += " " + Ut),
        T.className && ($t += " " + T.className),
        (V[Ot(it) && !Se.has(it) ? "class" : "className"] = $t),
        Y && (V.ref = Y),
        fe.createElement(it, V)
      );
    })(b, C, E);
  }
  w.displayName = g;
  var b = nt.forwardRef(w);
  return (
    (b.attrs = p),
    (b.componentStyle = A),
    (b.displayName = g),
    (b.shouldForwardProp = S),
    (b.foldedComponentIds = n
      ? B(s.foldedComponentIds, s.styledComponentId)
      : ""),
    (b.styledComponentId = m),
    (b.target = n ? s.target : t),
    Object.defineProperty(b, "defaultProps", {
      get: function () {
        return this._foldedDefaultProps;
      },
      set: function (C) {
        this._foldedDefaultProps = n
          ? (function (E) {
              for (var y = [], f = 1; f < arguments.length; f++)
                y[f - 1] = arguments[f];
              for (var Y = 0, at = y; Y < at.length; Y++) Gt(E, at[Y], !0);
              return E;
            })({}, s.defaultProps, C)
          : C;
      },
    }),
    qt(b, function () {
      return ".".concat(b.styledComponentId);
    }),
    o &&
      Ee(b, t, {
        attrs: !0,
        componentStyle: !0,
        displayName: !0,
        foldedComponentIds: !0,
        shouldForwardProp: !0,
        styledComponentId: !0,
        target: !0,
      }),
    b
  );
}
function ce(t, e) {
  for (var r = [t[0]], n = 0, s = e.length; n < s; n += 1)
    r.push(e[n], t[n + 1]);
  return r;
}
var ue = function (t) {
  return Object.assign(t, { isCss: !0 });
};
function Yr(t) {
  for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
  if (J(t) || st(t)) return ue(M(ce(_t, vt([t], e, !0))));
  var n = t;
  return e.length === 0 && n.length === 1 && typeof n[0] == "string"
    ? M(n)
    : ue(M(ce(n, e)));
}
function Lt(t, e, r) {
  if ((r === void 0 && (r = Z), !e)) throw ot(1, e);
  var n = function (s) {
    for (var o = [], a = 1; a < arguments.length; a++) o[a - 1] = arguments[a];
    return t(e, r, Yr.apply(void 0, vt([s], o, !1)));
  };
  return (
    (n.attrs = function (s) {
      return Lt(
        t,
        e,
        R(R({}, r), {
          attrs: Array.prototype.concat(r.attrs, s).filter(Boolean),
        }),
      );
    }),
    (n.withConfig = function (s) {
      return Lt(t, e, R(R({}, r), s));
    }),
    n
  );
}
var Te = function (t) {
    return Lt(Mr, t);
  },
  Wr = Te;
Se.forEach(function (t) {
  Wr[t] = Te(t);
});
export { Wr as d };
