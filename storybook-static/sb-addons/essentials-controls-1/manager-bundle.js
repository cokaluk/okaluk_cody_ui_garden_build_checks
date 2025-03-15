try {
  (() => {
    var xp = Object.create;
    var Un = Object.defineProperty;
    var Tp = Object.getOwnPropertyDescriptor;
    var Fp = Object.getOwnPropertyNames;
    var Ip = Object.getPrototypeOf,
      kp = Object.prototype.hasOwnProperty;
    var je = ((e) =>
      typeof require < "u"
        ? require
        : typeof Proxy < "u"
          ? new Proxy(e, {
              get: (t, r) => (typeof require < "u" ? require : t)[r],
            })
          : e)(function (e) {
      if (typeof require < "u") return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    var rt = (e, t) => () => (e && (t = e((e = 0))), t);
    var Rp = (e, t) => () => (
        t || e((t = { exports: {} }).exports, t), t.exports
      ),
      ni = (e, t) => {
        for (var r in t) Un(e, r, { get: t[r], enumerable: !0 });
      },
      Op = (e, t, r, n) => {
        if ((t && typeof t == "object") || typeof t == "function")
          for (let o of Fp(t))
            !kp.call(e, o) &&
              o !== r &&
              Un(e, o, {
                get: () => t[o],
                enumerable: !(n = Tp(t, o)) || n.enumerable,
              });
        return e;
      };
    var _p = (e, t, r) => (
      (r = e != null ? xp(Ip(e)) : {}),
      Op(
        t || !e || !e.__esModule
          ? Un(r, "default", { value: e, enumerable: !0 })
          : r,
        e,
      )
    );
    var q = rt(() => {});
    var V = rt(() => {});
    var J = rt(() => {});
    function Mp(e, t, { signal: r, edges: n } = {}) {
      let o,
        a = null,
        i = n != null && n.includes("leading"),
        s = n == null || n.includes("trailing"),
        l = () => {
          a !== null && (e.apply(o, a), (o = void 0), (a = null));
        },
        c = () => {
          s && l(), y();
        },
        p = null,
        h = () => {
          p != null && clearTimeout(p),
            (p = setTimeout(() => {
              (p = null), c();
            }, t));
        },
        d = () => {
          p !== null && (clearTimeout(p), (p = null));
        },
        y = () => {
          d(), (o = void 0), (a = null);
        },
        g = () => {
          d(), l();
        },
        A = function (...v) {
          if (r?.aborted) return;
          (o = this), (a = v);
          let S = p == null;
          h(), i && S && l();
        };
      return (
        (A.schedule = h),
        (A.cancel = y),
        (A.flush = g),
        r?.addEventListener("abort", y, { once: !0 }),
        A
      );
    }
    function si(e, t = 0, r = {}) {
      typeof r != "object" && (r = {});
      let { signal: n, leading: o = !1, trailing: a = !0, maxWait: i } = r,
        s = Array(2);
      o && (s[0] = "leading"), a && (s[1] = "trailing");
      let l,
        c = null,
        p = Mp(
          function (...y) {
            (l = e.apply(this, y)), (c = null);
          },
          t,
          { signal: n, edges: s },
        ),
        h = function (...y) {
          if (i != null) {
            if (c === null) c = Date.now();
            else if (Date.now() - c >= i)
              return (
                (l = e.apply(this, y)),
                (c = Date.now()),
                p.cancel(),
                p.schedule(),
                l
              );
          }
          return p.apply(this, y), l;
        },
        d = () => (p.flush(), l);
      return (h.cancel = p.cancel), (h.flush = d), h;
    }
    function li(e) {
      return Array.from(new Set(e));
    }
    function ui(e, t) {
      let r = {},
        n = Object.entries(e);
      for (let o = 0; o < n.length; o++) {
        let [a, i] = n[o];
        t(i, a) && (r[a] = i);
      }
      return r;
    }
    function Up(e) {
      return ArrayBuffer.isView(e) && !(e instanceof DataView);
    }
    function $p(e) {
      return e == null || (typeof e != "object" && typeof e != "function");
    }
    function oi(e) {
      return Jt(e);
    }
    function Jt(e, t = new Map()) {
      if ($p(e)) return e;
      if (t.has(e)) return t.get(e);
      if (Array.isArray(e)) {
        let r = new Array(e.length);
        t.set(e, r);
        for (let n = 0; n < e.length; n++) r[n] = Jt(e[n], t);
        return (
          Object.prototype.hasOwnProperty.call(e, "index") &&
            (r.index = e.index),
          Object.prototype.hasOwnProperty.call(e, "input") &&
            (r.input = e.input),
          r
        );
      }
      if (e instanceof Date) return new Date(e.getTime());
      if (e instanceof RegExp) {
        let r = new RegExp(e.source, e.flags);
        return (r.lastIndex = e.lastIndex), r;
      }
      if (e instanceof Map) {
        let r = new Map();
        t.set(e, r);
        for (let [n, o] of e.entries()) r.set(n, Jt(o, t));
        return r;
      }
      if (e instanceof Set) {
        let r = new Set();
        t.set(e, r);
        for (let n of e.values()) r.add(Jt(n, t));
        return r;
      }
      if (typeof Buffer < "u" && Buffer.isBuffer(e)) return e.subarray();
      if (Up(e)) {
        let r = new (Object.getPrototypeOf(e).constructor)(e.length);
        t.set(e, r);
        for (let n = 0; n < e.length; n++) r[n] = Jt(e[n], t);
        return r;
      }
      if (
        e instanceof ArrayBuffer ||
        (typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer)
      )
        return e.slice(0);
      if (e instanceof DataView) {
        let r = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
        return t.set(e, r), Ct(r, e, t), r;
      }
      if (typeof File < "u" && e instanceof File) {
        let r = new File([e], e.name, { type: e.type });
        return t.set(e, r), Ct(r, e, t), r;
      }
      if (e instanceof Blob) {
        let r = new Blob([e], { type: e.type });
        return t.set(e, r), Ct(r, e, t), r;
      }
      if (e instanceof Error) {
        let r = new e.constructor();
        return (
          t.set(e, r),
          (r.message = e.message),
          (r.name = e.name),
          (r.stack = e.stack),
          (r.cause = e.cause),
          Ct(r, e, t),
          r
        );
      }
      if (typeof e == "object" && e !== null) {
        let r = {};
        return t.set(e, r), Ct(r, e, t), r;
      }
      return e;
    }
    function Ct(e, t, r) {
      let n = Object.keys(t);
      for (let o = 0; o < n.length; o++) {
        let a = n[o],
          i = Object.getOwnPropertyDescriptor(t, a);
        (i?.writable || i?.set) && (e[a] = Jt(t[a], r));
      }
    }
    function ci(e) {
      if (typeof e != "object") return oi(e);
      switch (Object.prototype.toString.call(e)) {
        case Vp:
        case qp:
        case Jp: {
          let t = new e.constructor(e?.valueOf());
          return Ct(t, e), t;
        }
        case zp: {
          let t = {};
          return (
            Ct(t, e),
            (t.length = e.length),
            (t[Symbol.iterator] = e[Symbol.iterator]),
            t
          );
        }
        default:
          return oi(e);
      }
    }
    var Vt,
      Bp,
      ai,
      Pp,
      ii,
      Np,
      jp,
      mr,
      $e,
      Lp,
      zt,
      qp,
      Vp,
      Jp,
      zp,
      Le,
      yr,
      $n = rt(() => {
        q();
        V();
        J();
        (Vt = ((e) =>
          typeof je < "u"
            ? je
            : typeof Proxy < "u"
              ? new Proxy(e, { get: (t, r) => (typeof je < "u" ? je : t)[r] })
              : e)(function (e) {
          if (typeof je < "u") return je.apply(this, arguments);
          throw Error('Dynamic require of "' + e + '" is not supported');
        })),
          (Bp = Object.create),
          (ai = Object.defineProperty),
          (Pp = Object.getOwnPropertyDescriptor),
          (ii = Object.getOwnPropertyNames),
          (Np = Object.getPrototypeOf),
          (jp = Object.prototype.hasOwnProperty),
          (mr = ((e) =>
            typeof Vt < "u"
              ? Vt
              : typeof Proxy < "u"
                ? new Proxy(e, { get: (t, r) => (typeof Vt < "u" ? Vt : t)[r] })
                : e)(function (e) {
            if (typeof Vt < "u") return Vt.apply(this, arguments);
            throw Error('Dynamic require of "' + e + '" is not supported');
          })),
          ($e = (e, t) =>
            function () {
              return (
                t || (0, e[ii(e)[0]])((t = { exports: {} }).exports, t),
                t.exports
              );
            }),
          (Lp = (e, t, r, n) => {
            if ((t && typeof t == "object") || typeof t == "function")
              for (let o of ii(t))
                !jp.call(e, o) &&
                  o !== r &&
                  ai(e, o, {
                    get: () => t[o],
                    enumerable: !(n = Pp(t, o)) || n.enumerable,
                  });
            return e;
          }),
          (zt = (e, t, r) => (
            (r = e != null ? Bp(Np(e)) : {}),
            Lp(
              t || !e || !e.__esModule
                ? ai(r, "default", { value: e, enumerable: !0 })
                : r,
              e,
            )
          ));
        (qp = "[object String]"),
          (Vp = "[object Number]"),
          (Jp = "[object Boolean]"),
          (zp = "[object Arguments]");
        (Le = (e) => `control-${e.replace(/\s+/g, "-")}`),
          (yr = (e) => `set-${e.replace(/\s+/g, "-")}`);
      });
    var f,
      di,
      dt,
      aA,
      iA,
      sA,
      lA,
      pi,
      uA,
      pe,
      gr,
      hi,
      cA,
      dA,
      pA,
      hA,
      fi,
      fA,
      mA,
      yA,
      Ce,
      mi,
      gA,
      bA,
      xe,
      EA,
      vA,
      AA,
      yi,
      pt,
      DA,
      Pe,
      Z,
      SA,
      wA,
      CA,
      Mr = rt(() => {
        q();
        V();
        J();
        (f = __REACT__),
          ({
            Children: di,
            Component: dt,
            Fragment: aA,
            Profiler: iA,
            PureComponent: sA,
            StrictMode: lA,
            Suspense: pi,
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: uA,
            cloneElement: pe,
            createContext: gr,
            createElement: hi,
            createFactory: cA,
            createRef: dA,
            forwardRef: pA,
            isValidElement: hA,
            lazy: fi,
            memo: fA,
            startTransition: mA,
            unstable_act: yA,
            useCallback: Ce,
            useContext: mi,
            useDebugValue: gA,
            useDeferredValue: bA,
            useEffect: xe,
            useId: EA,
            useImperativeHandle: vA,
            useInsertionEffect: AA,
            useLayoutEffect: yi,
            useMemo: pt,
            useReducer: DA,
            useRef: Pe,
            useState: Z,
            useSyncExternalStore: SA,
            useTransition: wA,
            version: CA,
          } = __REACT__);
      });
    var gi = {};
    ni(gi, {
      A: () => Wp,
      ActionBar: () => qn,
      AddonPanel: () => Vn,
      Badge: () => Jn,
      Bar: () => zn,
      Blockquote: () => Kp,
      Button: () => ht,
      ClipboardCode: () => Yp,
      Code: () => Xp,
      DL: () => Qp,
      Div: () => Zp,
      DocumentWrapper: () => eh,
      EmptyTabContent: () => Hn,
      ErrorFormatter: () => th,
      FlexBar: () => Gn,
      Form: () => Ge,
      H1: () => rh,
      H2: () => Wn,
      H3: () => nh,
      H4: () => oh,
      H5: () => ah,
      H6: () => ih,
      HR: () => sh,
      IconButton: () => Ke,
      IconButtonSkeleton: () => lh,
      Icons: () => uh,
      Img: () => ch,
      LI: () => dh,
      Link: () => xt,
      ListItem: () => ph,
      Loader: () => hh,
      Modal: () => Ye,
      OL: () => fh,
      P: () => mh,
      Placeholder: () => yh,
      Pre: () => gh,
      ProgressSpinner: () => bh,
      ResetWrapper: () => Kn,
      ScrollArea: () => Eh,
      Separator: () => vh,
      Spaced: () => Yn,
      Span: () => Ah,
      StorybookIcon: () => Dh,
      StorybookLogo: () => Sh,
      Symbols: () => wh,
      SyntaxHighlighter: () => Ur,
      TT: () => Ch,
      TabBar: () => xh,
      TabButton: () => Th,
      TabWrapper: () => Fh,
      Table: () => Ih,
      Tabs: () => kh,
      TabsState: () => Rh,
      TooltipLinkList: () => Oh,
      TooltipMessage: () => _h,
      TooltipNote: () => Tt,
      UL: () => Bh,
      WithTooltip: () => ft,
      WithTooltipPure: () => Xn,
      Zoom: () => Qn,
      codeCommon: () => Ht,
      components: () => Zn,
      createCopyToClipboardFunction: () => Ph,
      default: () => Gp,
      getStoryHref: () => Nh,
      icons: () => jh,
      interleaveSeparators: () => Lh,
      nameSpaceClassNames: () => eo,
      resetComponents: () => Mh,
      withReset: () => Gt,
    });
    var Gp,
      Wp,
      qn,
      Vn,
      Jn,
      zn,
      Kp,
      ht,
      Yp,
      Xp,
      Qp,
      Zp,
      eh,
      Hn,
      th,
      Gn,
      Ge,
      rh,
      Wn,
      nh,
      oh,
      ah,
      ih,
      sh,
      Ke,
      lh,
      uh,
      ch,
      dh,
      xt,
      ph,
      hh,
      Ye,
      fh,
      mh,
      yh,
      gh,
      bh,
      Kn,
      Eh,
      vh,
      Yn,
      Ah,
      Dh,
      Sh,
      wh,
      Ur,
      Ch,
      xh,
      Th,
      Fh,
      Ih,
      kh,
      Rh,
      Oh,
      _h,
      Tt,
      Bh,
      ft,
      Xn,
      Qn,
      Ht,
      Zn,
      Ph,
      Nh,
      jh,
      Lh,
      eo,
      Mh,
      Gt,
      $r = rt(() => {
        q();
        V();
        J();
        (Gp = __STORYBOOK_COMPONENTS__),
          ({
            A: Wp,
            ActionBar: qn,
            AddonPanel: Vn,
            Badge: Jn,
            Bar: zn,
            Blockquote: Kp,
            Button: ht,
            ClipboardCode: Yp,
            Code: Xp,
            DL: Qp,
            Div: Zp,
            DocumentWrapper: eh,
            EmptyTabContent: Hn,
            ErrorFormatter: th,
            FlexBar: Gn,
            Form: Ge,
            H1: rh,
            H2: Wn,
            H3: nh,
            H4: oh,
            H5: ah,
            H6: ih,
            HR: sh,
            IconButton: Ke,
            IconButtonSkeleton: lh,
            Icons: uh,
            Img: ch,
            LI: dh,
            Link: xt,
            ListItem: ph,
            Loader: hh,
            Modal: Ye,
            OL: fh,
            P: mh,
            Placeholder: yh,
            Pre: gh,
            ProgressSpinner: bh,
            ResetWrapper: Kn,
            ScrollArea: Eh,
            Separator: vh,
            Spaced: Yn,
            Span: Ah,
            StorybookIcon: Dh,
            StorybookLogo: Sh,
            Symbols: wh,
            SyntaxHighlighter: Ur,
            TT: Ch,
            TabBar: xh,
            TabButton: Th,
            TabWrapper: Fh,
            Table: Ih,
            Tabs: kh,
            TabsState: Rh,
            TooltipLinkList: Oh,
            TooltipMessage: _h,
            TooltipNote: Tt,
            UL: Bh,
            WithTooltip: ft,
            WithTooltipPure: Xn,
            Zoom: Qn,
            codeCommon: Ht,
            components: Zn,
            createCopyToClipboardFunction: Ph,
            getStoryHref: Nh,
            icons: jh,
            interleaveSeparators: Lh,
            nameSpaceClassNames: eo,
            resetComponents: Mh,
            withReset: Gt,
          } = __STORYBOOK_COMPONENTS__);
      });
    var WD,
      KD,
      YD,
      XD,
      Vi,
      QD,
      Kr,
      Ji,
      ZD,
      eS,
      tS,
      rS,
      nS,
      oS,
      aS,
      zi,
      iS,
      sS,
      lo,
      lS,
      R,
      uo,
      uS,
      co,
      cS,
      po = rt(() => {
        q();
        V();
        J();
        (WD = __STORYBOOK_THEMING__),
          ({
            CacheProvider: KD,
            ClassNames: YD,
            Global: XD,
            ThemeProvider: Vi,
            background: QD,
            color: Kr,
            convert: Ji,
            create: ZD,
            createCache: eS,
            createGlobal: tS,
            createReset: rS,
            css: nS,
            darken: oS,
            ensure: aS,
            ignoreSsrWarning: zi,
            isPropValid: iS,
            jsx: sS,
            keyframes: lo,
            lighten: lS,
            styled: R,
            themes: uo,
            typography: uS,
            useTheme: co,
            withTheme: cS,
          } = __STORYBOOK_THEMING__);
      });
    var ES,
      vS,
      AS,
      ho,
      DS,
      SS,
      wS,
      CS,
      xS,
      TS,
      FS,
      IS,
      kS,
      RS,
      OS,
      _S,
      BS,
      PS,
      NS,
      jS,
      LS,
      MS,
      US,
      $S,
      qS,
      VS,
      JS,
      zS,
      HS,
      GS,
      WS,
      KS,
      YS,
      XS,
      QS,
      ZS,
      ew,
      tw,
      rw,
      nw,
      ow,
      aw,
      iw,
      sw,
      lw,
      uw,
      cw,
      Wi,
      Ki,
      dw,
      Yi,
      fo,
      pw,
      hw,
      Xi,
      fw,
      mw,
      yw,
      gw,
      bw,
      Ew,
      vw,
      Aw,
      Dw,
      Sw,
      ww,
      Cw,
      xw,
      Tw,
      Fw,
      Iw,
      kw,
      Rw,
      Ow,
      _w,
      Bw,
      Pw,
      Nw,
      jw,
      Lw,
      Mw,
      Uw,
      $w,
      qw,
      Vw,
      Jw,
      zw,
      Hw,
      Yr,
      Gw,
      Ww,
      Kw,
      Yw,
      Xw,
      Qw,
      Zw,
      Qi,
      Zi,
      eC,
      tC,
      rC,
      nC,
      oC,
      aC,
      iC,
      sC,
      lC,
      uC,
      cC,
      dC,
      pC,
      hC,
      fC,
      mC,
      yC,
      gC,
      bC,
      EC,
      vC,
      AC,
      DC,
      SC,
      wC,
      CC,
      xC,
      TC,
      FC,
      IC,
      kC,
      RC,
      OC,
      es,
      _C,
      BC,
      PC,
      NC,
      jC,
      LC,
      MC,
      ts,
      UC,
      $C,
      qC,
      VC,
      JC,
      zC,
      HC,
      GC,
      WC,
      KC,
      YC,
      XC,
      QC,
      ZC,
      ex,
      tx,
      rx,
      nx,
      ox,
      ax,
      ix,
      sx,
      lx,
      ux,
      cx,
      dx,
      px,
      hx,
      fx,
      mx,
      yx,
      gx,
      bx,
      Ex,
      vx,
      Ax,
      Dx,
      Sx,
      wx,
      Cx,
      xx,
      Tx,
      Fx,
      Ix,
      kx,
      Rx,
      Ox,
      _x,
      Bx,
      Px,
      Nx,
      jx,
      Lx,
      Mx,
      Ux,
      $x,
      qx,
      Vx,
      Jx,
      zx,
      Hx,
      Gx,
      Wx,
      Kx,
      Yx,
      rs,
      Xx,
      Qx,
      Zx,
      eT,
      tT,
      rT,
      nT,
      oT,
      aT,
      iT,
      sT,
      lT,
      uT,
      mo,
      cT,
      dT,
      pT,
      hT,
      fT,
      mT,
      yT,
      gT,
      bT,
      ET,
      ns,
      vT,
      AT,
      DT,
      ST,
      wT,
      CT,
      os,
      as,
      is,
      xT,
      yo = rt(() => {
        q();
        V();
        J();
        (ES = __STORYBOOK_ICONS__),
          ({
            AccessibilityAltIcon: vS,
            AccessibilityIcon: AS,
            AddIcon: ho,
            AdminIcon: DS,
            AlertAltIcon: SS,
            AlertIcon: wS,
            AlignLeftIcon: CS,
            AlignRightIcon: xS,
            AppleIcon: TS,
            ArrowBottomLeftIcon: FS,
            ArrowBottomRightIcon: IS,
            ArrowDownIcon: kS,
            ArrowLeftIcon: RS,
            ArrowRightIcon: OS,
            ArrowSolidDownIcon: _S,
            ArrowSolidLeftIcon: BS,
            ArrowSolidRightIcon: PS,
            ArrowSolidUpIcon: NS,
            ArrowTopLeftIcon: jS,
            ArrowTopRightIcon: LS,
            ArrowUpIcon: MS,
            AzureDevOpsIcon: US,
            BackIcon: $S,
            BasketIcon: qS,
            BatchAcceptIcon: VS,
            BatchDenyIcon: JS,
            BeakerIcon: zS,
            BellIcon: HS,
            BitbucketIcon: GS,
            BoldIcon: WS,
            BookIcon: KS,
            BookmarkHollowIcon: YS,
            BookmarkIcon: XS,
            BottomBarIcon: QS,
            BottomBarToggleIcon: ZS,
            BoxIcon: ew,
            BranchIcon: tw,
            BrowserIcon: rw,
            ButtonIcon: nw,
            CPUIcon: ow,
            CalendarIcon: aw,
            CameraIcon: iw,
            CategoryIcon: sw,
            CertificateIcon: lw,
            ChangedIcon: uw,
            ChatIcon: cw,
            CheckIcon: Wi,
            ChevronDownIcon: Ki,
            ChevronLeftIcon: dw,
            ChevronRightIcon: Yi,
            ChevronSmallDownIcon: fo,
            ChevronSmallLeftIcon: pw,
            ChevronSmallRightIcon: hw,
            ChevronSmallUpIcon: Xi,
            ChevronUpIcon: fw,
            ChromaticIcon: mw,
            ChromeIcon: yw,
            CircleHollowIcon: gw,
            CircleIcon: bw,
            ClearIcon: Ew,
            CloseAltIcon: vw,
            CloseIcon: Aw,
            CloudHollowIcon: Dw,
            CloudIcon: Sw,
            CogIcon: ww,
            CollapseIcon: Cw,
            CommandIcon: xw,
            CommentAddIcon: Tw,
            CommentIcon: Fw,
            CommentsIcon: Iw,
            CommitIcon: kw,
            CompassIcon: Rw,
            ComponentDrivenIcon: Ow,
            ComponentIcon: _w,
            ContrastIcon: Bw,
            ControlsIcon: Pw,
            CopyIcon: Nw,
            CreditIcon: jw,
            CrossIcon: Lw,
            DashboardIcon: Mw,
            DatabaseIcon: Uw,
            DeleteIcon: $w,
            DiamondIcon: qw,
            DirectionIcon: Vw,
            DiscordIcon: Jw,
            DocChartIcon: zw,
            DocListIcon: Hw,
            DocumentIcon: Yr,
            DownloadIcon: Gw,
            DragIcon: Ww,
            EditIcon: Kw,
            EllipsisIcon: Yw,
            EmailIcon: Xw,
            ExpandAltIcon: Qw,
            ExpandIcon: Zw,
            EyeCloseIcon: Qi,
            EyeIcon: Zi,
            FaceHappyIcon: eC,
            FaceNeutralIcon: tC,
            FaceSadIcon: rC,
            FacebookIcon: nC,
            FailedIcon: oC,
            FastForwardIcon: aC,
            FigmaIcon: iC,
            FilterIcon: sC,
            FlagIcon: lC,
            FolderIcon: uC,
            FormIcon: cC,
            GDriveIcon: dC,
            GithubIcon: pC,
            GitlabIcon: hC,
            GlobeIcon: fC,
            GoogleIcon: mC,
            GraphBarIcon: yC,
            GraphLineIcon: gC,
            GraphqlIcon: bC,
            GridAltIcon: EC,
            GridIcon: vC,
            GrowIcon: AC,
            HeartHollowIcon: DC,
            HeartIcon: SC,
            HomeIcon: wC,
            HourglassIcon: CC,
            InfoIcon: xC,
            ItalicIcon: TC,
            JumpToIcon: FC,
            KeyIcon: IC,
            LightningIcon: kC,
            LightningOffIcon: RC,
            LinkBrokenIcon: OC,
            LinkIcon: es,
            LinkedinIcon: _C,
            LinuxIcon: BC,
            ListOrderedIcon: PC,
            ListUnorderedIcon: NC,
            LocationIcon: jC,
            LockIcon: LC,
            MarkdownIcon: MC,
            MarkupIcon: ts,
            MediumIcon: UC,
            MemoryIcon: $C,
            MenuIcon: qC,
            MergeIcon: VC,
            MirrorIcon: JC,
            MobileIcon: zC,
            MoonIcon: HC,
            NutIcon: GC,
            OutboxIcon: WC,
            OutlineIcon: KC,
            PaintBrushIcon: YC,
            PaperClipIcon: XC,
            ParagraphIcon: QC,
            PassedIcon: ZC,
            PhoneIcon: ex,
            PhotoDragIcon: tx,
            PhotoIcon: rx,
            PinAltIcon: nx,
            PinIcon: ox,
            PlayAllHollowIcon: ax,
            PlayBackIcon: ix,
            PlayHollowIcon: sx,
            PlayIcon: lx,
            PlayNextIcon: ux,
            PlusIcon: cx,
            PointerDefaultIcon: dx,
            PointerHandIcon: px,
            PowerIcon: hx,
            PrintIcon: fx,
            ProceedIcon: mx,
            ProfileIcon: yx,
            PullRequestIcon: gx,
            QuestionIcon: bx,
            RSSIcon: Ex,
            RedirectIcon: vx,
            ReduxIcon: Ax,
            RefreshIcon: Dx,
            ReplyIcon: Sx,
            RepoIcon: wx,
            RequestChangeIcon: Cx,
            RewindIcon: xx,
            RulerIcon: Tx,
            SaveIcon: Fx,
            SearchIcon: Ix,
            ShareAltIcon: kx,
            ShareIcon: Rx,
            ShieldIcon: Ox,
            SideBySideIcon: _x,
            SidebarAltIcon: Bx,
            SidebarAltToggleIcon: Px,
            SidebarIcon: Nx,
            SidebarToggleIcon: jx,
            SpeakerIcon: Lx,
            StackedIcon: Mx,
            StarHollowIcon: Ux,
            StarIcon: $x,
            StatusFailIcon: qx,
            StatusPassIcon: Vx,
            StatusWarnIcon: Jx,
            StickerIcon: zx,
            StopAltHollowIcon: Hx,
            StopAltIcon: Gx,
            StopIcon: Wx,
            StorybookIcon: Kx,
            StructureIcon: Yx,
            SubtractIcon: rs,
            SunIcon: Xx,
            SupportIcon: Qx,
            SwitchAltIcon: Zx,
            SyncIcon: eT,
            TabletIcon: tT,
            ThumbsUpIcon: rT,
            TimeIcon: nT,
            TimerIcon: oT,
            TransferIcon: aT,
            TrashIcon: iT,
            TwitterIcon: sT,
            TypeIcon: lT,
            UbuntuIcon: uT,
            UndoIcon: mo,
            UnfoldIcon: cT,
            UnlockIcon: dT,
            UnpinIcon: pT,
            UploadIcon: hT,
            UserAddIcon: fT,
            UserAltIcon: mT,
            UserIcon: yT,
            UsersIcon: gT,
            VSCodeIcon: bT,
            VerifiedIcon: ET,
            VideoIcon: ns,
            WandIcon: vT,
            WatchIcon: AT,
            WindowsIcon: DT,
            WrenchIcon: ST,
            XIcon: wT,
            YoutubeIcon: CT,
            ZoomIcon: os,
            ZoomOutIcon: as,
            ZoomResetIcon: is,
            iconList: xT,
          } = __STORYBOOK_ICONS__);
      });
    var fu = Rp((yn, hu) => {
      q();
      V();
      J();
      (function (e, t) {
        typeof yn == "object" && typeof hu < "u"
          ? t(yn)
          : typeof define == "function" && define.amd
            ? define(["exports"], t)
            : ((e = typeof globalThis < "u" ? globalThis : e || self),
              t((e.jtpp = {})));
      })(yn, function (e) {
        "use strict";
        function t(u) {
          return u.text !== void 0 && u.text !== ""
            ? `'${u.type}' with value '${u.text}'`
            : `'${u.type}'`;
        }
        class r extends Error {
          constructor(m) {
            super(`No parslet found for token: ${t(m)}`),
              (this.token = m),
              Object.setPrototypeOf(this, r.prototype);
          }
          getToken() {
            return this.token;
          }
        }
        class n extends Error {
          constructor(m) {
            super(`The parsing ended early. The next token was: ${t(m)}`),
              (this.token = m),
              Object.setPrototypeOf(this, n.prototype);
          }
          getToken() {
            return this.token;
          }
        }
        class o extends Error {
          constructor(m, E) {
            let I = `Unexpected type: '${m.type}'.`;
            E !== void 0 && (I += ` Message: ${E}`),
              super(I),
              Object.setPrototypeOf(this, o.prototype);
          }
        }
        function a(u) {
          return (m) => (m.startsWith(u) ? { type: u, text: u } : null);
        }
        function i(u) {
          let m = 0,
            E,
            I = u[0],
            N = !1;
          if (I !== "'" && I !== '"') return null;
          for (; m < u.length; ) {
            if ((m++, (E = u[m]), !N && E === I)) {
              m++;
              break;
            }
            N = !N && E === "\\";
          }
          if (E !== I) throw new Error("Unterminated String");
          return u.slice(0, m);
        }
        let s = new RegExp(
            "[$_\\p{ID_Start}]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}",
            "u",
          ),
          l = new RegExp(
            "[$\\-\\p{ID_Continue}\\u200C\\u200D]|\\\\u\\p{Hex_Digit}{4}|\\\\u\\{0*(?:\\p{Hex_Digit}{1,5}|10\\p{Hex_Digit}{4})\\}",
            "u",
          );
        function c(u) {
          let m = u[0];
          if (!s.test(m)) return null;
          let E = 1;
          do {
            if (((m = u[E]), !l.test(m))) break;
            E++;
          } while (E < u.length);
          return u.slice(0, E);
        }
        let p = /^(NaN|-?((\d*\.\d+|\d+)([Ee][+-]?\d+)?|Infinity))/;
        function h(u) {
          var m, E;
          return (E =
            (m = p.exec(u)) === null || m === void 0 ? void 0 : m[0]) !==
            null && E !== void 0
            ? E
            : null;
        }
        let d = (u) => {
          let m = c(u);
          return m == null ? null : { type: "Identifier", text: m };
        };
        function y(u) {
          return (m) => {
            if (!m.startsWith(u)) return null;
            let E = m[u.length];
            return E !== void 0 && l.test(E) ? null : { type: u, text: u };
          };
        }
        let g = (u) => {
            let m = i(u);
            return m == null ? null : { type: "StringValue", text: m };
          },
          A = (u) => (u.length > 0 ? null : { type: "EOF", text: "" }),
          v = (u) => {
            let m = h(u);
            return m === null ? null : { type: "Number", text: m };
          },
          S = [
            A,
            a("=>"),
            a("("),
            a(")"),
            a("{"),
            a("}"),
            a("["),
            a("]"),
            a("|"),
            a("&"),
            a("<"),
            a(">"),
            a(","),
            a(";"),
            a("*"),
            a("?"),
            a("!"),
            a("="),
            a(":"),
            a("..."),
            a("."),
            a("#"),
            a("~"),
            a("/"),
            a("@"),
            y("undefined"),
            y("null"),
            y("function"),
            y("this"),
            y("new"),
            y("module"),
            y("event"),
            y("external"),
            y("typeof"),
            y("keyof"),
            y("readonly"),
            y("import"),
            y("is"),
            y("in"),
            y("asserts"),
            v,
            d,
            g,
          ],
          w = /^\s*\n\s*/;
        class x {
          static create(m) {
            let E = this.read(m);
            m = E.text;
            let I = this.read(m);
            return (m = I.text), new x(m, void 0, E.token, I.token);
          }
          constructor(m, E, I, N) {
            (this.text = ""),
              (this.text = m),
              (this.previous = E),
              (this.current = I),
              (this.next = N);
          }
          static read(m, E = !1) {
            (E = E || w.test(m)), (m = m.trim());
            for (let I of S) {
              let N = I(m);
              if (N !== null) {
                let H = Object.assign(Object.assign({}, N), { startOfLine: E });
                return (m = m.slice(H.text.length)), { text: m, token: H };
              }
            }
            throw new Error("Unexpected Token " + m);
          }
          advance() {
            let m = x.read(this.text);
            return new x(m.text, this.current, this.next, m.token);
          }
        }
        function C(u) {
          if (u === void 0) throw new Error("Unexpected undefined");
          if (
            u.type === "JsdocTypeKeyValue" ||
            u.type === "JsdocTypeParameterList" ||
            u.type === "JsdocTypeProperty" ||
            u.type === "JsdocTypeReadonlyProperty" ||
            u.type === "JsdocTypeObjectField" ||
            u.type === "JsdocTypeJsdocObjectField" ||
            u.type === "JsdocTypeIndexSignature" ||
            u.type === "JsdocTypeMappedType"
          )
            throw new o(u);
          return u;
        }
        function k(u) {
          return u.type === "JsdocTypeKeyValue" ? _(u) : C(u);
        }
        function F(u) {
          return u.type === "JsdocTypeName" ? u : _(u);
        }
        function _(u) {
          if (u.type !== "JsdocTypeKeyValue") throw new o(u);
          return u;
        }
        function j(u) {
          var m;
          if (u.type === "JsdocTypeVariadic") {
            if (
              ((m = u.element) === null || m === void 0 ? void 0 : m.type) ===
              "JsdocTypeName"
            )
              return u;
            throw new o(u);
          }
          if (u.type !== "JsdocTypeNumber" && u.type !== "JsdocTypeName")
            throw new o(u);
          return u;
        }
        function M(u) {
          return (
            u.type === "JsdocTypeIndexSignature" ||
            u.type === "JsdocTypeMappedType"
          );
        }
        var P;
        (function (u) {
          (u[(u.ALL = 0)] = "ALL"),
            (u[(u.PARAMETER_LIST = 1)] = "PARAMETER_LIST"),
            (u[(u.OBJECT = 2)] = "OBJECT"),
            (u[(u.KEY_VALUE = 3)] = "KEY_VALUE"),
            (u[(u.INDEX_BRACKETS = 4)] = "INDEX_BRACKETS"),
            (u[(u.UNION = 5)] = "UNION"),
            (u[(u.INTERSECTION = 6)] = "INTERSECTION"),
            (u[(u.PREFIX = 7)] = "PREFIX"),
            (u[(u.INFIX = 8)] = "INFIX"),
            (u[(u.TUPLE = 9)] = "TUPLE"),
            (u[(u.SYMBOL = 10)] = "SYMBOL"),
            (u[(u.OPTIONAL = 11)] = "OPTIONAL"),
            (u[(u.NULLABLE = 12)] = "NULLABLE"),
            (u[(u.KEY_OF_TYPE_OF = 13)] = "KEY_OF_TYPE_OF"),
            (u[(u.FUNCTION = 14)] = "FUNCTION"),
            (u[(u.ARROW = 15)] = "ARROW"),
            (u[(u.ARRAY_BRACKETS = 16)] = "ARRAY_BRACKETS"),
            (u[(u.GENERIC = 17)] = "GENERIC"),
            (u[(u.NAME_PATH = 18)] = "NAME_PATH"),
            (u[(u.PARENTHESIS = 19)] = "PARENTHESIS"),
            (u[(u.SPECIAL_TYPES = 20)] = "SPECIAL_TYPES");
        })(P || (P = {}));
        class W {
          constructor(m, E, I) {
            (this.grammar = m),
              typeof E == "string"
                ? (this._lexer = x.create(E))
                : (this._lexer = E),
              (this.baseParser = I);
          }
          get lexer() {
            return this._lexer;
          }
          parse() {
            let m = this.parseType(P.ALL);
            if (this.lexer.current.type !== "EOF")
              throw new n(this.lexer.current);
            return m;
          }
          parseType(m) {
            return C(this.parseIntermediateType(m));
          }
          parseIntermediateType(m) {
            let E = this.tryParslets(null, m);
            if (E === null) throw new r(this.lexer.current);
            return this.parseInfixIntermediateType(E, m);
          }
          parseInfixIntermediateType(m, E) {
            let I = this.tryParslets(m, E);
            for (; I !== null; ) (m = I), (I = this.tryParslets(m, E));
            return m;
          }
          tryParslets(m, E) {
            for (let I of this.grammar) {
              let N = I(this, E, m);
              if (N !== null) return N;
            }
            return null;
          }
          consume(m) {
            return (
              Array.isArray(m) || (m = [m]),
              m.includes(this.lexer.current.type)
                ? ((this._lexer = this.lexer.advance()), !0)
                : !1
            );
          }
          acceptLexerState(m) {
            this._lexer = m.lexer;
          }
        }
        function L(u) {
          return (
            u === "EOF" || u === "|" || u === "," || u === ")" || u === ">"
          );
        }
        let z = (u, m, E) => {
          let I = u.lexer.current.type,
            N = u.lexer.next.type;
          return (E == null && I === "?" && !L(N)) || (E != null && I === "?")
            ? (u.consume("?"),
              E == null
                ? {
                    type: "JsdocTypeNullable",
                    element: u.parseType(P.NULLABLE),
                    meta: { position: "prefix" },
                  }
                : {
                    type: "JsdocTypeNullable",
                    element: C(E),
                    meta: { position: "suffix" },
                  })
            : null;
        };
        function D(u) {
          let m = (E, I, N) => {
            let H = E.lexer.current.type,
              Y = E.lexer.next.type;
            if (N === null) {
              if ("parsePrefix" in u && u.accept(H, Y)) return u.parsePrefix(E);
            } else if ("parseInfix" in u && u.precedence > I && u.accept(H, Y))
              return u.parseInfix(E, N);
            return null;
          };
          return Object.defineProperty(m, "name", { value: u.name }), m;
        }
        let T = D({
            name: "optionalParslet",
            accept: (u) => u === "=",
            precedence: P.OPTIONAL,
            parsePrefix: (u) => (
              u.consume("="),
              {
                type: "JsdocTypeOptional",
                element: u.parseType(P.OPTIONAL),
                meta: { position: "prefix" },
              }
            ),
            parseInfix: (u, m) => (
              u.consume("="),
              {
                type: "JsdocTypeOptional",
                element: C(m),
                meta: { position: "suffix" },
              }
            ),
          }),
          O = D({
            name: "numberParslet",
            accept: (u) => u === "Number",
            parsePrefix: (u) => {
              let m = parseFloat(u.lexer.current.text);
              return u.consume("Number"), { type: "JsdocTypeNumber", value: m };
            },
          }),
          U = D({
            name: "parenthesisParslet",
            accept: (u) => u === "(",
            parsePrefix: (u) => {
              if ((u.consume("("), u.consume(")")))
                return { type: "JsdocTypeParameterList", elements: [] };
              let m = u.parseIntermediateType(P.ALL);
              if (!u.consume(")")) throw new Error("Unterminated parenthesis");
              return m.type === "JsdocTypeParameterList"
                ? m
                : m.type === "JsdocTypeKeyValue"
                  ? { type: "JsdocTypeParameterList", elements: [m] }
                  : { type: "JsdocTypeParenthesis", element: C(m) };
            },
          }),
          $ = D({
            name: "specialTypesParslet",
            accept: (u, m) =>
              (u === "?" && L(m)) ||
              u === "null" ||
              u === "undefined" ||
              u === "*",
            parsePrefix: (u) => {
              if (u.consume("null")) return { type: "JsdocTypeNull" };
              if (u.consume("undefined")) return { type: "JsdocTypeUndefined" };
              if (u.consume("*")) return { type: "JsdocTypeAny" };
              if (u.consume("?")) return { type: "JsdocTypeUnknown" };
              throw new Error("Unacceptable token: " + u.lexer.current.text);
            },
          }),
          X = D({
            name: "notNullableParslet",
            accept: (u) => u === "!",
            precedence: P.NULLABLE,
            parsePrefix: (u) => (
              u.consume("!"),
              {
                type: "JsdocTypeNotNullable",
                element: u.parseType(P.NULLABLE),
                meta: { position: "prefix" },
              }
            ),
            parseInfix: (u, m) => (
              u.consume("!"),
              {
                type: "JsdocTypeNotNullable",
                element: C(m),
                meta: { position: "suffix" },
              }
            ),
          });
        function se({ allowTrailingComma: u }) {
          return D({
            name: "parameterListParslet",
            accept: (m) => m === ",",
            precedence: P.PARAMETER_LIST,
            parseInfix: (m, E) => {
              let I = [k(E)];
              m.consume(",");
              do
                try {
                  let N = m.parseIntermediateType(P.PARAMETER_LIST);
                  I.push(k(N));
                } catch (N) {
                  if (u && N instanceof r) break;
                  throw N;
                }
              while (m.consume(","));
              if (
                I.length > 0 &&
                I.slice(0, -1).some((N) => N.type === "JsdocTypeVariadic")
              )
                throw new Error(
                  "Only the last parameter may be a rest parameter",
                );
              return { type: "JsdocTypeParameterList", elements: I };
            },
          });
        }
        let te = D({
            name: "genericParslet",
            accept: (u, m) => u === "<" || (u === "." && m === "<"),
            precedence: P.GENERIC,
            parseInfix: (u, m) => {
              let E = u.consume(".");
              u.consume("<");
              let I = [];
              do I.push(u.parseType(P.PARAMETER_LIST));
              while (u.consume(","));
              if (!u.consume(">"))
                throw new Error("Unterminated generic parameter list");
              return {
                type: "JsdocTypeGeneric",
                left: C(m),
                elements: I,
                meta: { brackets: "angle", dot: E },
              };
            },
          }),
          Q = D({
            name: "unionParslet",
            accept: (u) => u === "|",
            precedence: P.UNION,
            parseInfix: (u, m) => {
              u.consume("|");
              let E = [];
              do E.push(u.parseType(P.UNION));
              while (u.consume("|"));
              return { type: "JsdocTypeUnion", elements: [C(m), ...E] };
            },
          }),
          re = [z, T, O, U, $, X, se({ allowTrailingComma: !0 }), te, Q, T];
        function ve({
          allowSquareBracketsOnAnyType: u,
          allowJsdocNamePaths: m,
          pathGrammar: E,
        }) {
          return function (N, H, Y) {
            if (Y == null || H >= P.NAME_PATH) return null;
            let ne = N.lexer.current.type,
              ke = N.lexer.next.type;
            if (
              !(
                (ne === "." && ke !== "<") ||
                (ne === "[" && (u || Y.type === "JsdocTypeName")) ||
                (m && (ne === "~" || ne === "#"))
              )
            )
              return null;
            let qe,
              Lr = !1;
            N.consume(".")
              ? (qe = "property")
              : N.consume("[")
                ? ((qe = "property-brackets"), (Lr = !0))
                : N.consume("~")
                  ? (qe = "inner")
                  : (N.consume("#"), (qe = "instance"));
            let ti = E !== null ? new W(E, N.lexer, N) : N,
              tt = ti.parseIntermediateType(P.NAME_PATH);
            N.acceptLexerState(ti);
            let fr;
            switch (tt.type) {
              case "JsdocTypeName":
                fr = {
                  type: "JsdocTypeProperty",
                  value: tt.value,
                  meta: { quote: void 0 },
                };
                break;
              case "JsdocTypeNumber":
                fr = {
                  type: "JsdocTypeProperty",
                  value: tt.value.toString(10),
                  meta: { quote: void 0 },
                };
                break;
              case "JsdocTypeStringValue":
                fr = {
                  type: "JsdocTypeProperty",
                  value: tt.value,
                  meta: { quote: tt.meta.quote },
                };
                break;
              case "JsdocTypeSpecialNamePath":
                if (tt.specialType === "event") fr = tt;
                else
                  throw new o(
                    tt,
                    "Type 'JsdocTypeSpecialNamePath' is only allowed with specialType 'event'",
                  );
                break;
              default:
                throw new o(
                  tt,
                  "Expecting 'JsdocTypeName', 'JsdocTypeNumber', 'JsdocStringValue' or 'JsdocTypeSpecialNamePath'",
                );
            }
            if (Lr && !N.consume("]")) {
              let ri = N.lexer.current;
              throw new Error(
                `Unterminated square brackets. Next token is '${ri.type}' with text '${ri.text}'`,
              );
            }
            return {
              type: "JsdocTypeNamePath",
              left: C(Y),
              right: fr,
              pathType: qe,
            };
          };
        }
        function de({ allowedAdditionalTokens: u }) {
          return D({
            name: "nameParslet",
            accept: (m) =>
              m === "Identifier" ||
              m === "this" ||
              m === "new" ||
              u.includes(m),
            parsePrefix: (m) => {
              let { type: E, text: I } = m.lexer.current;
              return m.consume(E), { type: "JsdocTypeName", value: I };
            },
          });
        }
        let Fe = D({
          name: "stringValueParslet",
          accept: (u) => u === "StringValue",
          parsePrefix: (u) => {
            let m = u.lexer.current.text;
            return (
              u.consume("StringValue"),
              {
                type: "JsdocTypeStringValue",
                value: m.slice(1, -1),
                meta: { quote: m[0] === "'" ? "single" : "double" },
              }
            );
          },
        });
        function le({ pathGrammar: u, allowedTypes: m }) {
          return D({
            name: "specialNamePathParslet",
            accept: (E) => m.includes(E),
            parsePrefix: (E) => {
              let I = E.lexer.current.type;
              if ((E.consume(I), !E.consume(":")))
                return { type: "JsdocTypeName", value: I };
              let N,
                H = E.lexer.current;
              if (E.consume("StringValue"))
                N = {
                  type: "JsdocTypeSpecialNamePath",
                  value: H.text.slice(1, -1),
                  specialType: I,
                  meta: { quote: H.text[0] === "'" ? "single" : "double" },
                };
              else {
                let ke = "",
                  we = ["Identifier", "@", "/"];
                for (; we.some((qe) => E.consume(qe)); )
                  (ke += H.text), (H = E.lexer.current);
                N = {
                  type: "JsdocTypeSpecialNamePath",
                  value: ke,
                  specialType: I,
                  meta: { quote: void 0 },
                };
              }
              let Y = new W(u, E.lexer, E),
                ne = Y.parseInfixIntermediateType(N, P.ALL);
              return E.acceptLexerState(Y), C(ne);
            },
          });
        }
        let He = [
            de({ allowedAdditionalTokens: ["external", "module"] }),
            Fe,
            O,
            ve({
              allowSquareBracketsOnAnyType: !1,
              allowJsdocNamePaths: !0,
              pathGrammar: null,
            }),
          ],
          Ue = [...He, le({ allowedTypes: ["event"], pathGrammar: He })];
        function et(u) {
          let m;
          if (u.type === "JsdocTypeParameterList") m = u.elements;
          else if (u.type === "JsdocTypeParenthesis") m = [u.element];
          else throw new o(u);
          return m.map((E) => k(E));
        }
        function dr(u) {
          let m = et(u);
          if (m.some((E) => E.type === "JsdocTypeKeyValue"))
            throw new Error("No parameter should be named");
          return m;
        }
        function $t({
          allowNamedParameters: u,
          allowNoReturnType: m,
          allowWithoutParenthesis: E,
          allowNewAsFunctionKeyword: I,
        }) {
          return D({
            name: "functionParslet",
            accept: (N, H) =>
              N === "function" || (I && N === "new" && H === "("),
            parsePrefix: (N) => {
              let H = N.consume("new");
              N.consume("function");
              let Y = N.lexer.current.type === "(";
              if (!Y) {
                if (!E) throw new Error("function is missing parameter list");
                return { type: "JsdocTypeName", value: "function" };
              }
              let ne = {
                  type: "JsdocTypeFunction",
                  parameters: [],
                  arrow: !1,
                  constructor: H,
                  parenthesis: Y,
                },
                ke = N.parseIntermediateType(P.FUNCTION);
              if (u === void 0) ne.parameters = dr(ke);
              else {
                if (H && ke.type === "JsdocTypeFunction" && ke.arrow)
                  return (ne = ke), (ne.constructor = !0), ne;
                ne.parameters = et(ke);
                for (let we of ne.parameters)
                  if (we.type === "JsdocTypeKeyValue" && !u.includes(we.key))
                    throw new Error(
                      `only allowed named parameters are ${u.join(", ")} but got ${we.type}`,
                    );
              }
              if (N.consume(":")) ne.returnType = N.parseType(P.PREFIX);
              else if (!m) throw new Error("function is missing return type");
              return ne;
            },
          });
        }
        function pr({ allowPostfix: u, allowEnclosingBrackets: m }) {
          return D({
            name: "variadicParslet",
            accept: (E) => E === "...",
            precedence: P.PREFIX,
            parsePrefix: (E) => {
              E.consume("...");
              let I = m && E.consume("[");
              try {
                let N = E.parseType(P.PREFIX);
                if (I && !E.consume("]"))
                  throw new Error("Unterminated variadic type. Missing ']'");
                return {
                  type: "JsdocTypeVariadic",
                  element: C(N),
                  meta: { position: "prefix", squareBrackets: I },
                };
              } catch (N) {
                if (N instanceof r) {
                  if (I)
                    throw new Error(
                      "Empty square brackets for variadic are not allowed.",
                    );
                  return {
                    type: "JsdocTypeVariadic",
                    meta: { position: void 0, squareBrackets: !1 },
                  };
                } else throw N;
              }
            },
            parseInfix: u
              ? (E, I) => (
                  E.consume("..."),
                  {
                    type: "JsdocTypeVariadic",
                    element: C(I),
                    meta: { position: "suffix", squareBrackets: !1 },
                  }
                )
              : void 0,
          });
        }
        let Pr = D({
            name: "symbolParslet",
            accept: (u) => u === "(",
            precedence: P.SYMBOL,
            parseInfix: (u, m) => {
              if (m.type !== "JsdocTypeName")
                throw new Error(
                  "Symbol expects a name on the left side. (Reacting on '(')",
                );
              u.consume("(");
              let E = { type: "JsdocTypeSymbol", value: m.value };
              if (!u.consume(")")) {
                let I = u.parseIntermediateType(P.SYMBOL);
                if (((E.element = j(I)), !u.consume(")")))
                  throw new Error("Symbol does not end after value");
              }
              return E;
            },
          }),
          Ne = D({
            name: "arrayBracketsParslet",
            precedence: P.ARRAY_BRACKETS,
            accept: (u, m) => u === "[" && m === "]",
            parseInfix: (u, m) => (
              u.consume("["),
              u.consume("]"),
              {
                type: "JsdocTypeGeneric",
                left: { type: "JsdocTypeName", value: "Array" },
                elements: [C(m)],
                meta: { brackets: "square", dot: !1 },
              }
            ),
          });
        function Be({ objectFieldGrammar: u, allowKeyTypes: m }) {
          return D({
            name: "objectParslet",
            accept: (E) => E === "{",
            parsePrefix: (E) => {
              E.consume("{");
              let I = {
                type: "JsdocTypeObject",
                meta: { separator: "comma" },
                elements: [],
              };
              if (!E.consume("}")) {
                let N,
                  H = new W(u, E.lexer, E);
                for (;;) {
                  H.acceptLexerState(E);
                  let Y = H.parseIntermediateType(P.OBJECT);
                  E.acceptLexerState(H),
                    Y === void 0 &&
                      m &&
                      (Y = E.parseIntermediateType(P.OBJECT));
                  let ne = !1;
                  if (
                    (Y.type === "JsdocTypeNullable" &&
                      ((ne = !0), (Y = Y.element)),
                    Y.type === "JsdocTypeNumber" ||
                      Y.type === "JsdocTypeName" ||
                      Y.type === "JsdocTypeStringValue")
                  ) {
                    let we;
                    Y.type === "JsdocTypeStringValue" && (we = Y.meta.quote),
                      I.elements.push({
                        type: "JsdocTypeObjectField",
                        key: Y.value.toString(),
                        right: void 0,
                        optional: ne,
                        readonly: !1,
                        meta: { quote: we },
                      });
                  } else if (
                    Y.type === "JsdocTypeObjectField" ||
                    Y.type === "JsdocTypeJsdocObjectField"
                  )
                    I.elements.push(Y);
                  else throw new o(Y);
                  if (E.lexer.current.startOfLine) N = "linebreak";
                  else if (E.consume(",")) N = "comma";
                  else if (E.consume(";")) N = "semicolon";
                  else break;
                  if (E.lexer.current.type === "}") break;
                }
                if (((I.meta.separator = N ?? "comma"), !E.consume("}")))
                  throw new Error("Unterminated record type. Missing '}'");
              }
              return I;
            },
          });
        }
        function lt({
          allowSquaredProperties: u,
          allowKeyTypes: m,
          allowReadonly: E,
          allowOptional: I,
        }) {
          return D({
            name: "objectFieldParslet",
            precedence: P.KEY_VALUE,
            accept: (N) => N === ":",
            parseInfix: (N, H) => {
              var Y;
              let ne = !1,
                ke = !1;
              I &&
                H.type === "JsdocTypeNullable" &&
                ((ne = !0), (H = H.element)),
                E &&
                  H.type === "JsdocTypeReadonlyProperty" &&
                  ((ke = !0), (H = H.element));
              let we = (Y = N.baseParser) !== null && Y !== void 0 ? Y : N;
              if (
                (we.acceptLexerState(N),
                H.type === "JsdocTypeNumber" ||
                  H.type === "JsdocTypeName" ||
                  H.type === "JsdocTypeStringValue" ||
                  M(H))
              ) {
                if (M(H) && !u) throw new o(H);
                we.consume(":");
                let qe;
                H.type === "JsdocTypeStringValue" && (qe = H.meta.quote);
                let Lr = we.parseType(P.KEY_VALUE);
                return (
                  N.acceptLexerState(we),
                  {
                    type: "JsdocTypeObjectField",
                    key: M(H) ? H : H.value.toString(),
                    right: Lr,
                    optional: ne,
                    readonly: ke,
                    meta: { quote: qe },
                  }
                );
              } else {
                if (!m) throw new o(H);
                we.consume(":");
                let qe = we.parseType(P.KEY_VALUE);
                return (
                  N.acceptLexerState(we),
                  { type: "JsdocTypeJsdocObjectField", left: C(H), right: qe }
                );
              }
            },
          });
        }
        function qt({ allowOptional: u, allowVariadic: m }) {
          return D({
            name: "keyValueParslet",
            precedence: P.KEY_VALUE,
            accept: (E) => E === ":",
            parseInfix: (E, I) => {
              let N = !1,
                H = !1;
              if (
                (u &&
                  I.type === "JsdocTypeNullable" &&
                  ((N = !0), (I = I.element)),
                m &&
                  I.type === "JsdocTypeVariadic" &&
                  I.element !== void 0 &&
                  ((H = !0), (I = I.element)),
                I.type !== "JsdocTypeName")
              )
                throw new o(I);
              E.consume(":");
              let Y = E.parseType(P.KEY_VALUE);
              return {
                type: "JsdocTypeKeyValue",
                key: I.value,
                right: Y,
                optional: N,
                variadic: H,
              };
            },
          });
        }
        let Nr = [
            ...re,
            $t({
              allowWithoutParenthesis: !0,
              allowNamedParameters: ["this", "new"],
              allowNoReturnType: !0,
              allowNewAsFunctionKeyword: !1,
            }),
            Fe,
            le({
              allowedTypes: ["module", "external", "event"],
              pathGrammar: Ue,
            }),
            pr({ allowEnclosingBrackets: !0, allowPostfix: !0 }),
            de({ allowedAdditionalTokens: ["keyof"] }),
            Pr,
            Ne,
            ve({
              allowSquareBracketsOnAnyType: !1,
              allowJsdocNamePaths: !0,
              pathGrammar: Ue,
            }),
          ],
          jn = [
            ...Nr,
            Be({
              objectFieldGrammar: [
                de({ allowedAdditionalTokens: ["module", "in"] }),
                lt({
                  allowSquaredProperties: !1,
                  allowKeyTypes: !0,
                  allowOptional: !1,
                  allowReadonly: !1,
                }),
                ...Nr,
              ],
              allowKeyTypes: !0,
            }),
            qt({ allowOptional: !0, allowVariadic: !0 }),
          ],
          Ya = D({
            name: "typeOfParslet",
            accept: (u) => u === "typeof",
            parsePrefix: (u) => (
              u.consume("typeof"),
              {
                type: "JsdocTypeTypeof",
                element: C(u.parseType(P.KEY_OF_TYPE_OF)),
              }
            ),
          }),
          rp = [
            de({
              allowedAdditionalTokens: [
                "module",
                "keyof",
                "event",
                "external",
                "in",
              ],
            }),
            z,
            T,
            Fe,
            O,
            lt({
              allowSquaredProperties: !1,
              allowKeyTypes: !1,
              allowOptional: !1,
              allowReadonly: !1,
            }),
          ],
          np = [
            ...re,
            Be({ allowKeyTypes: !1, objectFieldGrammar: rp }),
            de({ allowedAdditionalTokens: ["event", "external", "in"] }),
            Ya,
            $t({
              allowWithoutParenthesis: !1,
              allowNamedParameters: ["this", "new"],
              allowNoReturnType: !0,
              allowNewAsFunctionKeyword: !1,
            }),
            pr({ allowEnclosingBrackets: !1, allowPostfix: !1 }),
            de({ allowedAdditionalTokens: ["keyof"] }),
            le({ allowedTypes: ["module"], pathGrammar: Ue }),
            ve({
              allowSquareBracketsOnAnyType: !1,
              allowJsdocNamePaths: !0,
              pathGrammar: Ue,
            }),
            qt({ allowOptional: !1, allowVariadic: !1 }),
            Pr,
          ],
          op = D({
            name: "assertsParslet",
            accept: (u) => u === "asserts",
            parsePrefix: (u) => {
              u.consume("asserts");
              let m = u.parseIntermediateType(P.SYMBOL);
              if (m.type !== "JsdocTypeName")
                throw new o(
                  m,
                  "A typescript asserts always has to have a name on the left side.",
                );
              return (
                u.consume("is"),
                {
                  type: "JsdocTypeAsserts",
                  left: m,
                  right: C(u.parseIntermediateType(P.INFIX)),
                }
              );
            },
          });
        function ap({ allowQuestionMark: u }) {
          return D({
            name: "tupleParslet",
            accept: (m) => m === "[",
            parsePrefix: (m) => {
              m.consume("[");
              let E = { type: "JsdocTypeTuple", elements: [] };
              if (m.consume("]")) return E;
              let I = m.parseIntermediateType(P.ALL);
              if (
                (I.type === "JsdocTypeParameterList"
                  ? I.elements[0].type === "JsdocTypeKeyValue"
                    ? (E.elements = I.elements.map(_))
                    : (E.elements = I.elements.map(C))
                  : I.type === "JsdocTypeKeyValue"
                    ? (E.elements = [_(I)])
                    : (E.elements = [C(I)]),
                !m.consume("]"))
              )
                throw new Error("Unterminated '['");
              if (!u && E.elements.some((N) => N.type === "JsdocTypeUnknown"))
                throw new Error("Question mark in tuple not allowed");
              return E;
            },
          });
        }
        let ip = D({
            name: "keyOfParslet",
            accept: (u) => u === "keyof",
            parsePrefix: (u) => (
              u.consume("keyof"),
              {
                type: "JsdocTypeKeyof",
                element: C(u.parseType(P.KEY_OF_TYPE_OF)),
              }
            ),
          }),
          sp = D({
            name: "importParslet",
            accept: (u) => u === "import",
            parsePrefix: (u) => {
              if ((u.consume("import"), !u.consume("(")))
                throw new Error("Missing parenthesis after import keyword");
              let m = u.parseType(P.PREFIX);
              if (m.type !== "JsdocTypeStringValue")
                throw new Error(
                  "Only string values are allowed as paths for imports",
                );
              if (!u.consume(")"))
                throw new Error(
                  "Missing closing parenthesis after import keyword",
                );
              return { type: "JsdocTypeImport", element: m };
            },
          }),
          lp = D({
            name: "readonlyPropertyParslet",
            accept: (u) => u === "readonly",
            parsePrefix: (u) => (
              u.consume("readonly"),
              {
                type: "JsdocTypeReadonlyProperty",
                element: u.parseType(P.KEY_VALUE),
              }
            ),
          }),
          up = D({
            name: "arrowFunctionParslet",
            precedence: P.ARROW,
            accept: (u) => u === "=>",
            parseInfix: (u, m) => (
              u.consume("=>"),
              {
                type: "JsdocTypeFunction",
                parameters: et(m).map(F),
                arrow: !0,
                constructor: !1,
                parenthesis: !0,
                returnType: u.parseType(P.OBJECT),
              }
            ),
          }),
          cp = D({
            name: "intersectionParslet",
            accept: (u) => u === "&",
            precedence: P.INTERSECTION,
            parseInfix: (u, m) => {
              u.consume("&");
              let E = [];
              do E.push(u.parseType(P.INTERSECTION));
              while (u.consume("&"));
              return { type: "JsdocTypeIntersection", elements: [C(m), ...E] };
            },
          }),
          dp = D({
            name: "predicateParslet",
            precedence: P.INFIX,
            accept: (u) => u === "is",
            parseInfix: (u, m) => {
              if (m.type !== "JsdocTypeName")
                throw new o(
                  m,
                  "A typescript predicate always has to have a name on the left side.",
                );
              return (
                u.consume("is"),
                {
                  type: "JsdocTypePredicate",
                  left: m,
                  right: C(u.parseIntermediateType(P.INFIX)),
                }
              );
            },
          }),
          pp = D({
            name: "objectSquareBracketPropertyParslet",
            accept: (u) => u === "[",
            parsePrefix: (u) => {
              if (u.baseParser === void 0)
                throw new Error("Only allowed inside object grammar");
              u.consume("[");
              let m = u.lexer.current.text;
              u.consume("Identifier");
              let E;
              if (u.consume(":")) {
                let I = u.baseParser;
                I.acceptLexerState(u),
                  (E = {
                    type: "JsdocTypeIndexSignature",
                    key: m,
                    right: I.parseType(P.INDEX_BRACKETS),
                  }),
                  u.acceptLexerState(I);
              } else if (u.consume("in")) {
                let I = u.baseParser;
                I.acceptLexerState(u),
                  (E = {
                    type: "JsdocTypeMappedType",
                    key: m,
                    right: I.parseType(P.ARRAY_BRACKETS),
                  }),
                  u.acceptLexerState(I);
              } else
                throw new Error(
                  "Missing ':' or 'in' inside square bracketed property.",
                );
              if (!u.consume("]"))
                throw new Error("Unterminated square brackets");
              return E;
            },
          }),
          hp = [
            lp,
            de({
              allowedAdditionalTokens: [
                "module",
                "event",
                "keyof",
                "event",
                "external",
                "in",
              ],
            }),
            z,
            T,
            Fe,
            O,
            lt({
              allowSquaredProperties: !0,
              allowKeyTypes: !1,
              allowOptional: !0,
              allowReadonly: !0,
            }),
            pp,
          ],
          fp = [
            ...re,
            Be({ allowKeyTypes: !1, objectFieldGrammar: hp }),
            Ya,
            ip,
            sp,
            Fe,
            $t({
              allowWithoutParenthesis: !0,
              allowNoReturnType: !1,
              allowNamedParameters: ["this", "new", "args"],
              allowNewAsFunctionKeyword: !0,
            }),
            ap({ allowQuestionMark: !1 }),
            pr({ allowEnclosingBrackets: !1, allowPostfix: !1 }),
            op,
            de({ allowedAdditionalTokens: ["event", "external", "in"] }),
            le({ allowedTypes: ["module"], pathGrammar: Ue }),
            Ne,
            up,
            ve({
              allowSquareBracketsOnAnyType: !0,
              allowJsdocNamePaths: !1,
              pathGrammar: Ue,
            }),
            cp,
            dp,
            qt({ allowVariadic: !0, allowOptional: !0 }),
          ];
        function Xa(u, m) {
          switch (m) {
            case "closure":
              return new W(np, u).parse();
            case "jsdoc":
              return new W(jn, u).parse();
            case "typescript":
              return new W(fp, u).parse();
          }
        }
        function mp(u, m = ["typescript", "closure", "jsdoc"]) {
          let E;
          for (let I of m)
            try {
              return Xa(u, I);
            } catch (N) {
              E = N;
            }
          throw E;
        }
        function hr(u, m) {
          let E = u[m.type];
          if (E === void 0)
            throw new Error(
              `In this set of transform rules exists no rule for type ${m.type}.`,
            );
          return E(m, (I) => hr(u, I));
        }
        function Ie(u) {
          throw new Error(
            "This transform is not available. Are you trying the correct parsing mode?",
          );
        }
        function Qa(u) {
          let m = { params: [] };
          for (let E of u.parameters)
            E.type === "JsdocTypeKeyValue"
              ? E.key === "this"
                ? (m.this = E.right)
                : E.key === "new"
                  ? (m.new = E.right)
                  : m.params.push(E)
              : m.params.push(E);
          return m;
        }
        function jr(u, m, E) {
          return u === "prefix" ? E + m : m + E;
        }
        function ut(u, m) {
          switch (m) {
            case "double":
              return `"${u}"`;
            case "single":
              return `'${u}'`;
            case void 0:
              return u;
          }
        }
        function Za() {
          return {
            JsdocTypeParenthesis: (u, m) =>
              `(${u.element !== void 0 ? m(u.element) : ""})`,
            JsdocTypeKeyof: (u, m) => `keyof ${m(u.element)}`,
            JsdocTypeFunction: (u, m) => {
              if (u.arrow) {
                if (u.returnType === void 0)
                  throw new Error("Arrow function needs a return type.");
                let E = `(${u.parameters.map(m).join(", ")}) => ${m(u.returnType)}`;
                return u.constructor && (E = "new " + E), E;
              } else {
                let E = u.constructor ? "new" : "function";
                return (
                  u.parenthesis &&
                    ((E += `(${u.parameters.map(m).join(", ")})`),
                    u.returnType !== void 0 && (E += `: ${m(u.returnType)}`)),
                  E
                );
              }
            },
            JsdocTypeName: (u) => u.value,
            JsdocTypeTuple: (u, m) => `[${u.elements.map(m).join(", ")}]`,
            JsdocTypeVariadic: (u, m) =>
              u.meta.position === void 0
                ? "..."
                : jr(u.meta.position, m(u.element), "..."),
            JsdocTypeNamePath: (u, m) => {
              let E = m(u.left),
                I = m(u.right);
              switch (u.pathType) {
                case "inner":
                  return `${E}~${I}`;
                case "instance":
                  return `${E}#${I}`;
                case "property":
                  return `${E}.${I}`;
                case "property-brackets":
                  return `${E}[${I}]`;
              }
            },
            JsdocTypeStringValue: (u) => ut(u.value, u.meta.quote),
            JsdocTypeAny: () => "*",
            JsdocTypeGeneric: (u, m) => {
              if (u.meta.brackets === "square") {
                let E = u.elements[0],
                  I = m(E);
                return E.type === "JsdocTypeUnion" ||
                  E.type === "JsdocTypeIntersection"
                  ? `(${I})[]`
                  : `${I}[]`;
              } else
                return `${m(u.left)}${u.meta.dot ? "." : ""}<${u.elements.map(m).join(", ")}>`;
            },
            JsdocTypeImport: (u, m) => `import(${m(u.element)})`,
            JsdocTypeObjectField: (u, m) => {
              let E = "";
              return (
                u.readonly && (E += "readonly "),
                typeof u.key == "string"
                  ? (E += ut(u.key, u.meta.quote))
                  : (E += m(u.key)),
                u.optional && (E += "?"),
                u.right === void 0 ? E : E + `: ${m(u.right)}`
              );
            },
            JsdocTypeJsdocObjectField: (u, m) => `${m(u.left)}: ${m(u.right)}`,
            JsdocTypeKeyValue: (u, m) => {
              let E = u.key;
              return (
                u.optional && (E += "?"),
                u.variadic && (E = "..." + E),
                u.right === void 0 ? E : E + `: ${m(u.right)}`
              );
            },
            JsdocTypeSpecialNamePath: (u) =>
              `${u.specialType}:${ut(u.value, u.meta.quote)}`,
            JsdocTypeNotNullable: (u, m) =>
              jr(u.meta.position, m(u.element), "!"),
            JsdocTypeNull: () => "null",
            JsdocTypeNullable: (u, m) => jr(u.meta.position, m(u.element), "?"),
            JsdocTypeNumber: (u) => u.value.toString(),
            JsdocTypeObject: (u, m) =>
              `{${u.elements.map(m).join((u.meta.separator === "comma" ? "," : ";") + " ")}}`,
            JsdocTypeOptional: (u, m) => jr(u.meta.position, m(u.element), "="),
            JsdocTypeSymbol: (u, m) =>
              `${u.value}(${u.element !== void 0 ? m(u.element) : ""})`,
            JsdocTypeTypeof: (u, m) => `typeof ${m(u.element)}`,
            JsdocTypeUndefined: () => "undefined",
            JsdocTypeUnion: (u, m) => u.elements.map(m).join(" | "),
            JsdocTypeUnknown: () => "?",
            JsdocTypeIntersection: (u, m) => u.elements.map(m).join(" & "),
            JsdocTypeProperty: (u) => ut(u.value, u.meta.quote),
            JsdocTypePredicate: (u, m) => `${m(u.left)} is ${m(u.right)}`,
            JsdocTypeIndexSignature: (u, m) => `[${u.key}: ${m(u.right)}]`,
            JsdocTypeMappedType: (u, m) => `[${u.key} in ${m(u.right)}]`,
            JsdocTypeAsserts: (u, m) => `asserts ${m(u.left)} is ${m(u.right)}`,
          };
        }
        let yp = Za();
        function gp(u) {
          return hr(yp, u);
        }
        let bp = [
          "null",
          "true",
          "false",
          "break",
          "case",
          "catch",
          "class",
          "const",
          "continue",
          "debugger",
          "default",
          "delete",
          "do",
          "else",
          "export",
          "extends",
          "finally",
          "for",
          "function",
          "if",
          "import",
          "in",
          "instanceof",
          "new",
          "return",
          "super",
          "switch",
          "this",
          "throw",
          "try",
          "typeof",
          "var",
          "void",
          "while",
          "with",
          "yield",
        ];
        function ct(u) {
          let m = { type: "NameExpression", name: u };
          return bp.includes(u) && (m.reservedWord = !0), m;
        }
        let Ep = {
          JsdocTypeOptional: (u, m) => {
            let E = m(u.element);
            return (E.optional = !0), E;
          },
          JsdocTypeNullable: (u, m) => {
            let E = m(u.element);
            return (E.nullable = !0), E;
          },
          JsdocTypeNotNullable: (u, m) => {
            let E = m(u.element);
            return (E.nullable = !1), E;
          },
          JsdocTypeVariadic: (u, m) => {
            if (u.element === void 0)
              throw new Error(
                "dots without value are not allowed in catharsis mode",
              );
            let E = m(u.element);
            return (E.repeatable = !0), E;
          },
          JsdocTypeAny: () => ({ type: "AllLiteral" }),
          JsdocTypeNull: () => ({ type: "NullLiteral" }),
          JsdocTypeStringValue: (u) => ct(ut(u.value, u.meta.quote)),
          JsdocTypeUndefined: () => ({ type: "UndefinedLiteral" }),
          JsdocTypeUnknown: () => ({ type: "UnknownLiteral" }),
          JsdocTypeFunction: (u, m) => {
            let E = Qa(u),
              I = { type: "FunctionType", params: E.params.map(m) };
            return (
              E.this !== void 0 && (I.this = m(E.this)),
              E.new !== void 0 && (I.new = m(E.new)),
              u.returnType !== void 0 && (I.result = m(u.returnType)),
              I
            );
          },
          JsdocTypeGeneric: (u, m) => ({
            type: "TypeApplication",
            applications: u.elements.map((E) => m(E)),
            expression: m(u.left),
          }),
          JsdocTypeSpecialNamePath: (u) =>
            ct(u.specialType + ":" + ut(u.value, u.meta.quote)),
          JsdocTypeName: (u) =>
            u.value !== "function"
              ? ct(u.value)
              : { type: "FunctionType", params: [] },
          JsdocTypeNumber: (u) => ct(u.value.toString()),
          JsdocTypeObject: (u, m) => {
            let E = { type: "RecordType", fields: [] };
            for (let I of u.elements)
              I.type !== "JsdocTypeObjectField" &&
              I.type !== "JsdocTypeJsdocObjectField"
                ? E.fields.push({ type: "FieldType", key: m(I), value: void 0 })
                : E.fields.push(m(I));
            return E;
          },
          JsdocTypeObjectField: (u, m) => {
            if (typeof u.key != "string")
              throw new Error(
                "Index signatures and mapped types are not supported",
              );
            return {
              type: "FieldType",
              key: ct(ut(u.key, u.meta.quote)),
              value: u.right === void 0 ? void 0 : m(u.right),
            };
          },
          JsdocTypeJsdocObjectField: (u, m) => ({
            type: "FieldType",
            key: m(u.left),
            value: m(u.right),
          }),
          JsdocTypeUnion: (u, m) => ({
            type: "TypeUnion",
            elements: u.elements.map((E) => m(E)),
          }),
          JsdocTypeKeyValue: (u, m) => ({
            type: "FieldType",
            key: ct(u.key),
            value: u.right === void 0 ? void 0 : m(u.right),
          }),
          JsdocTypeNamePath: (u, m) => {
            let E = m(u.left),
              I;
            u.right.type === "JsdocTypeSpecialNamePath"
              ? (I = m(u.right).name)
              : (I = ut(u.right.value, u.right.meta.quote));
            let N =
              u.pathType === "inner"
                ? "~"
                : u.pathType === "instance"
                  ? "#"
                  : ".";
            return ct(`${E.name}${N}${I}`);
          },
          JsdocTypeSymbol: (u) => {
            let m = "",
              E = u.element,
              I = !1;
            return (
              E?.type === "JsdocTypeVariadic" &&
                (E.meta.position === "prefix" ? (m = "...") : (I = !0),
                (E = E.element)),
              E?.type === "JsdocTypeName"
                ? (m += E.value)
                : E?.type === "JsdocTypeNumber" && (m += E.value.toString()),
              I && (m += "..."),
              ct(`${u.value}(${m})`)
            );
          },
          JsdocTypeParenthesis: (u, m) => m(C(u.element)),
          JsdocTypeMappedType: Ie,
          JsdocTypeIndexSignature: Ie,
          JsdocTypeImport: Ie,
          JsdocTypeKeyof: Ie,
          JsdocTypeTuple: Ie,
          JsdocTypeTypeof: Ie,
          JsdocTypeIntersection: Ie,
          JsdocTypeProperty: Ie,
          JsdocTypePredicate: Ie,
          JsdocTypeAsserts: Ie,
        };
        function vp(u) {
          return hr(Ep, u);
        }
        function wt(u) {
          switch (u) {
            case void 0:
              return "none";
            case "single":
              return "single";
            case "double":
              return "double";
          }
        }
        function Ap(u) {
          switch (u) {
            case "inner":
              return "INNER_MEMBER";
            case "instance":
              return "INSTANCE_MEMBER";
            case "property":
              return "MEMBER";
            case "property-brackets":
              return "MEMBER";
          }
        }
        function Ln(u, m) {
          return m.length === 2
            ? { type: u, left: m[0], right: m[1] }
            : { type: u, left: m[0], right: Ln(u, m.slice(1)) };
        }
        let Dp = {
          JsdocTypeOptional: (u, m) => ({
            type: "OPTIONAL",
            value: m(u.element),
            meta: {
              syntax:
                u.meta.position === "prefix"
                  ? "PREFIX_EQUAL_SIGN"
                  : "SUFFIX_EQUALS_SIGN",
            },
          }),
          JsdocTypeNullable: (u, m) => ({
            type: "NULLABLE",
            value: m(u.element),
            meta: {
              syntax:
                u.meta.position === "prefix"
                  ? "PREFIX_QUESTION_MARK"
                  : "SUFFIX_QUESTION_MARK",
            },
          }),
          JsdocTypeNotNullable: (u, m) => ({
            type: "NOT_NULLABLE",
            value: m(u.element),
            meta: {
              syntax:
                u.meta.position === "prefix" ? "PREFIX_BANG" : "SUFFIX_BANG",
            },
          }),
          JsdocTypeVariadic: (u, m) => {
            let E = {
              type: "VARIADIC",
              meta: {
                syntax:
                  u.meta.position === "prefix"
                    ? "PREFIX_DOTS"
                    : u.meta.position === "suffix"
                      ? "SUFFIX_DOTS"
                      : "ONLY_DOTS",
              },
            };
            return u.element !== void 0 && (E.value = m(u.element)), E;
          },
          JsdocTypeName: (u) => ({ type: "NAME", name: u.value }),
          JsdocTypeTypeof: (u, m) => ({
            type: "TYPE_QUERY",
            name: m(u.element),
          }),
          JsdocTypeTuple: (u, m) => ({
            type: "TUPLE",
            entries: u.elements.map(m),
          }),
          JsdocTypeKeyof: (u, m) => ({
            type: "KEY_QUERY",
            value: m(u.element),
          }),
          JsdocTypeImport: (u) => ({
            type: "IMPORT",
            path: {
              type: "STRING_VALUE",
              quoteStyle: wt(u.element.meta.quote),
              string: u.element.value,
            },
          }),
          JsdocTypeUndefined: () => ({ type: "NAME", name: "undefined" }),
          JsdocTypeAny: () => ({ type: "ANY" }),
          JsdocTypeFunction: (u, m) => {
            let E = Qa(u),
              I = {
                type: u.arrow ? "ARROW" : "FUNCTION",
                params: E.params.map((N) => {
                  if (N.type === "JsdocTypeKeyValue") {
                    if (N.right === void 0)
                      throw new Error(
                        "Function parameter without ':' is not expected to be 'KEY_VALUE'",
                      );
                    return {
                      type: "NAMED_PARAMETER",
                      name: N.key,
                      typeName: m(N.right),
                    };
                  } else return m(N);
                }),
                new: null,
                returns: null,
              };
            return (
              E.this !== void 0
                ? (I.this = m(E.this))
                : u.arrow || (I.this = null),
              E.new !== void 0 && (I.new = m(E.new)),
              u.returnType !== void 0 && (I.returns = m(u.returnType)),
              I
            );
          },
          JsdocTypeGeneric: (u, m) => {
            let E = {
              type: "GENERIC",
              subject: m(u.left),
              objects: u.elements.map(m),
              meta: {
                syntax:
                  u.meta.brackets === "square"
                    ? "SQUARE_BRACKET"
                    : u.meta.dot
                      ? "ANGLE_BRACKET_WITH_DOT"
                      : "ANGLE_BRACKET",
              },
            };
            return (
              u.meta.brackets === "square" &&
                u.elements[0].type === "JsdocTypeFunction" &&
                !u.elements[0].parenthesis &&
                (E.objects[0] = { type: "NAME", name: "function" }),
              E
            );
          },
          JsdocTypeObjectField: (u, m) => {
            if (typeof u.key != "string")
              throw new Error(
                "Index signatures and mapped types are not supported",
              );
            if (u.right === void 0)
              return {
                type: "RECORD_ENTRY",
                key: u.key,
                quoteStyle: wt(u.meta.quote),
                value: null,
                readonly: !1,
              };
            let E = m(u.right);
            return (
              u.optional &&
                (E = {
                  type: "OPTIONAL",
                  value: E,
                  meta: { syntax: "SUFFIX_KEY_QUESTION_MARK" },
                }),
              {
                type: "RECORD_ENTRY",
                key: u.key.toString(),
                quoteStyle: wt(u.meta.quote),
                value: E,
                readonly: !1,
              }
            );
          },
          JsdocTypeJsdocObjectField: () => {
            throw new Error("Keys may not be typed in jsdoctypeparser.");
          },
          JsdocTypeKeyValue: (u, m) => {
            if (u.right === void 0)
              return {
                type: "RECORD_ENTRY",
                key: u.key,
                quoteStyle: "none",
                value: null,
                readonly: !1,
              };
            let E = m(u.right);
            return (
              u.optional &&
                (E = {
                  type: "OPTIONAL",
                  value: E,
                  meta: { syntax: "SUFFIX_KEY_QUESTION_MARK" },
                }),
              {
                type: "RECORD_ENTRY",
                key: u.key,
                quoteStyle: "none",
                value: E,
                readonly: !1,
              }
            );
          },
          JsdocTypeObject: (u, m) => {
            let E = [];
            for (let I of u.elements)
              (I.type === "JsdocTypeObjectField" ||
                I.type === "JsdocTypeJsdocObjectField") &&
                E.push(m(I));
            return { type: "RECORD", entries: E };
          },
          JsdocTypeSpecialNamePath: (u) => {
            if (u.specialType !== "module")
              throw new Error(
                `jsdoctypeparser does not support type ${u.specialType} at this point.`,
              );
            return {
              type: "MODULE",
              value: {
                type: "FILE_PATH",
                quoteStyle: wt(u.meta.quote),
                path: u.value,
              },
            };
          },
          JsdocTypeNamePath: (u, m) => {
            let E = !1,
              I,
              N;
            u.right.type === "JsdocTypeSpecialNamePath" &&
            u.right.specialType === "event"
              ? ((E = !0), (I = u.right.value), (N = wt(u.right.meta.quote)))
              : ((I = u.right.value), (N = wt(u.right.meta.quote)));
            let H = {
              type: Ap(u.pathType),
              owner: m(u.left),
              name: I,
              quoteStyle: N,
              hasEventPrefix: E,
            };
            if (H.owner.type === "MODULE") {
              let Y = H.owner;
              return (H.owner = H.owner.value), (Y.value = H), Y;
            } else return H;
          },
          JsdocTypeUnion: (u, m) => Ln("UNION", u.elements.map(m)),
          JsdocTypeParenthesis: (u, m) => ({
            type: "PARENTHESIS",
            value: m(C(u.element)),
          }),
          JsdocTypeNull: () => ({ type: "NAME", name: "null" }),
          JsdocTypeUnknown: () => ({ type: "UNKNOWN" }),
          JsdocTypeStringValue: (u) => ({
            type: "STRING_VALUE",
            quoteStyle: wt(u.meta.quote),
            string: u.value,
          }),
          JsdocTypeIntersection: (u, m) =>
            Ln("INTERSECTION", u.elements.map(m)),
          JsdocTypeNumber: (u) => ({
            type: "NUMBER_VALUE",
            number: u.value.toString(),
          }),
          JsdocTypeSymbol: Ie,
          JsdocTypeProperty: Ie,
          JsdocTypePredicate: Ie,
          JsdocTypeMappedType: Ie,
          JsdocTypeIndexSignature: Ie,
          JsdocTypeAsserts: Ie,
        };
        function Sp(u) {
          return hr(Dp, u);
        }
        function wp() {
          return {
            JsdocTypeIntersection: (u, m) => ({
              type: "JsdocTypeIntersection",
              elements: u.elements.map(m),
            }),
            JsdocTypeGeneric: (u, m) => ({
              type: "JsdocTypeGeneric",
              left: m(u.left),
              elements: u.elements.map(m),
              meta: { dot: u.meta.dot, brackets: u.meta.brackets },
            }),
            JsdocTypeNullable: (u) => u,
            JsdocTypeUnion: (u, m) => ({
              type: "JsdocTypeUnion",
              elements: u.elements.map(m),
            }),
            JsdocTypeUnknown: (u) => u,
            JsdocTypeUndefined: (u) => u,
            JsdocTypeTypeof: (u, m) => ({
              type: "JsdocTypeTypeof",
              element: m(u.element),
            }),
            JsdocTypeSymbol: (u, m) => {
              let E = { type: "JsdocTypeSymbol", value: u.value };
              return u.element !== void 0 && (E.element = m(u.element)), E;
            },
            JsdocTypeOptional: (u, m) => ({
              type: "JsdocTypeOptional",
              element: m(u.element),
              meta: { position: u.meta.position },
            }),
            JsdocTypeObject: (u, m) => ({
              type: "JsdocTypeObject",
              meta: { separator: "comma" },
              elements: u.elements.map(m),
            }),
            JsdocTypeNumber: (u) => u,
            JsdocTypeNull: (u) => u,
            JsdocTypeNotNullable: (u, m) => ({
              type: "JsdocTypeNotNullable",
              element: m(u.element),
              meta: { position: u.meta.position },
            }),
            JsdocTypeSpecialNamePath: (u) => u,
            JsdocTypeObjectField: (u, m) => ({
              type: "JsdocTypeObjectField",
              key: u.key,
              right: u.right === void 0 ? void 0 : m(u.right),
              optional: u.optional,
              readonly: u.readonly,
              meta: u.meta,
            }),
            JsdocTypeJsdocObjectField: (u, m) => ({
              type: "JsdocTypeJsdocObjectField",
              left: m(u.left),
              right: m(u.right),
            }),
            JsdocTypeKeyValue: (u, m) => ({
              type: "JsdocTypeKeyValue",
              key: u.key,
              right: u.right === void 0 ? void 0 : m(u.right),
              optional: u.optional,
              variadic: u.variadic,
            }),
            JsdocTypeImport: (u, m) => ({
              type: "JsdocTypeImport",
              element: m(u.element),
            }),
            JsdocTypeAny: (u) => u,
            JsdocTypeStringValue: (u) => u,
            JsdocTypeNamePath: (u) => u,
            JsdocTypeVariadic: (u, m) => {
              let E = {
                type: "JsdocTypeVariadic",
                meta: {
                  position: u.meta.position,
                  squareBrackets: u.meta.squareBrackets,
                },
              };
              return u.element !== void 0 && (E.element = m(u.element)), E;
            },
            JsdocTypeTuple: (u, m) => ({
              type: "JsdocTypeTuple",
              elements: u.elements.map(m),
            }),
            JsdocTypeName: (u) => u,
            JsdocTypeFunction: (u, m) => {
              let E = {
                type: "JsdocTypeFunction",
                arrow: u.arrow,
                parameters: u.parameters.map(m),
                constructor: u.constructor,
                parenthesis: u.parenthesis,
              };
              return (
                u.returnType !== void 0 && (E.returnType = m(u.returnType)), E
              );
            },
            JsdocTypeKeyof: (u, m) => ({
              type: "JsdocTypeKeyof",
              element: m(u.element),
            }),
            JsdocTypeParenthesis: (u, m) => ({
              type: "JsdocTypeParenthesis",
              element: m(u.element),
            }),
            JsdocTypeProperty: (u) => u,
            JsdocTypePredicate: (u, m) => ({
              type: "JsdocTypePredicate",
              left: m(u.left),
              right: m(u.right),
            }),
            JsdocTypeIndexSignature: (u, m) => ({
              type: "JsdocTypeIndexSignature",
              key: u.key,
              right: m(u.right),
            }),
            JsdocTypeMappedType: (u, m) => ({
              type: "JsdocTypeMappedType",
              key: u.key,
              right: m(u.right),
            }),
            JsdocTypeAsserts: (u, m) => ({
              type: "JsdocTypeAsserts",
              left: m(u.left),
              right: m(u.right),
            }),
          };
        }
        let ei = {
          JsdocTypeAny: [],
          JsdocTypeFunction: ["parameters", "returnType"],
          JsdocTypeGeneric: ["left", "elements"],
          JsdocTypeImport: [],
          JsdocTypeIndexSignature: ["right"],
          JsdocTypeIntersection: ["elements"],
          JsdocTypeKeyof: ["element"],
          JsdocTypeKeyValue: ["right"],
          JsdocTypeMappedType: ["right"],
          JsdocTypeName: [],
          JsdocTypeNamePath: ["left", "right"],
          JsdocTypeNotNullable: ["element"],
          JsdocTypeNull: [],
          JsdocTypeNullable: ["element"],
          JsdocTypeNumber: [],
          JsdocTypeObject: ["elements"],
          JsdocTypeObjectField: ["right"],
          JsdocTypeJsdocObjectField: ["left", "right"],
          JsdocTypeOptional: ["element"],
          JsdocTypeParenthesis: ["element"],
          JsdocTypeSpecialNamePath: [],
          JsdocTypeStringValue: [],
          JsdocTypeSymbol: ["element"],
          JsdocTypeTuple: ["elements"],
          JsdocTypeTypeof: ["element"],
          JsdocTypeUndefined: [],
          JsdocTypeUnion: ["elements"],
          JsdocTypeUnknown: [],
          JsdocTypeVariadic: ["element"],
          JsdocTypeProperty: [],
          JsdocTypePredicate: ["left", "right"],
          JsdocTypeAsserts: ["left", "right"],
        };
        function Mn(u, m, E, I, N) {
          I?.(u, m, E);
          let H = ei[u.type];
          for (let Y of H) {
            let ne = u[Y];
            if (ne !== void 0)
              if (Array.isArray(ne)) for (let ke of ne) Mn(ke, u, Y, I, N);
              else Mn(ne, u, Y, I, N);
          }
          N?.(u, m, E);
        }
        function Cp(u, m, E) {
          Mn(u, void 0, void 0, m, E);
        }
        (e.catharsisTransform = vp),
          (e.identityTransformRules = wp),
          (e.jtpTransform = Sp),
          (e.parse = Xa),
          (e.stringify = gp),
          (e.stringifyRules = Za),
          (e.transform = hr),
          (e.traverse = Cp),
          (e.tryParse = mp),
          (e.visitorKeys = ei);
      });
    });
    var kc = {};
    ni(kc, { ColorControl: () => Ic, default: () => gg });
    function Nt() {
      return (Nt =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }).apply(this, arguments);
    }
    function ga(e, t) {
      if (e == null) return {};
      var r,
        n,
        o = {},
        a = Object.keys(e);
      for (n = 0; n < a.length; n++)
        t.indexOf((r = a[n])) >= 0 || (o[r] = e[r]);
      return o;
    }
    function pa(e) {
      var t = Pe(e),
        r = Pe(function (n) {
          t.current && t.current(n);
        });
      return (t.current = e), r.current;
    }
    function Cc(e, t, r) {
      var n = pa(r),
        o = Z(function () {
          return e.toHsva(t);
        }),
        a = o[0],
        i = o[1],
        s = Pe({ color: t, hsva: a });
      xe(
        function () {
          if (!e.equal(t, s.current.color)) {
            var c = e.toHsva(t);
            (s.current = { hsva: c, color: t }), i(c);
          }
        },
        [t, e],
      ),
        xe(
          function () {
            var c;
            Sc(a, s.current.hsva) ||
              e.equal((c = e.fromHsva(a)), s.current.color) ||
              ((s.current = { hsva: a, color: c }), n(c));
          },
          [a, e, n],
        );
      var l = Ce(function (c) {
        i(function (p) {
          return Object.assign({}, p, c);
        });
      }, []);
      return [a, l];
    }
    var Oy,
      gc,
      _y,
      By,
      Je,
      or,
      Tr,
      ha,
      pc,
      hc,
      ba,
      Fr,
      Ea,
      Se,
      Py,
      Ny,
      fa,
      jy,
      Ly,
      My,
      Uy,
      bc,
      ma,
      An,
      Ec,
      $y,
      bn,
      qy,
      vc,
      Ac,
      Dc,
      Sc,
      wc,
      Vy,
      Jy,
      zy,
      fc,
      xc,
      Hy,
      Gy,
      Wy,
      Ky,
      Tc,
      Yy,
      Xy,
      Qy,
      Zy,
      eg,
      tg,
      rg,
      ng,
      og,
      ag,
      ig,
      mc,
      sg,
      lg,
      Fc,
      En,
      ug,
      cg,
      dg,
      ya,
      pg,
      hg,
      vn,
      yc,
      nr,
      fg,
      mg,
      Dn,
      yg,
      Ic,
      gg,
      Rc = rt(() => {
        q();
        V();
        J();
        $n();
        Mr();
        $r();
        po();
        yo();
        (Oy = $e({
          "../../node_modules/color-name/index.js"(e, t) {
            t.exports = {
              aliceblue: [240, 248, 255],
              antiquewhite: [250, 235, 215],
              aqua: [0, 255, 255],
              aquamarine: [127, 255, 212],
              azure: [240, 255, 255],
              beige: [245, 245, 220],
              bisque: [255, 228, 196],
              black: [0, 0, 0],
              blanchedalmond: [255, 235, 205],
              blue: [0, 0, 255],
              blueviolet: [138, 43, 226],
              brown: [165, 42, 42],
              burlywood: [222, 184, 135],
              cadetblue: [95, 158, 160],
              chartreuse: [127, 255, 0],
              chocolate: [210, 105, 30],
              coral: [255, 127, 80],
              cornflowerblue: [100, 149, 237],
              cornsilk: [255, 248, 220],
              crimson: [220, 20, 60],
              cyan: [0, 255, 255],
              darkblue: [0, 0, 139],
              darkcyan: [0, 139, 139],
              darkgoldenrod: [184, 134, 11],
              darkgray: [169, 169, 169],
              darkgreen: [0, 100, 0],
              darkgrey: [169, 169, 169],
              darkkhaki: [189, 183, 107],
              darkmagenta: [139, 0, 139],
              darkolivegreen: [85, 107, 47],
              darkorange: [255, 140, 0],
              darkorchid: [153, 50, 204],
              darkred: [139, 0, 0],
              darksalmon: [233, 150, 122],
              darkseagreen: [143, 188, 143],
              darkslateblue: [72, 61, 139],
              darkslategray: [47, 79, 79],
              darkslategrey: [47, 79, 79],
              darkturquoise: [0, 206, 209],
              darkviolet: [148, 0, 211],
              deeppink: [255, 20, 147],
              deepskyblue: [0, 191, 255],
              dimgray: [105, 105, 105],
              dimgrey: [105, 105, 105],
              dodgerblue: [30, 144, 255],
              firebrick: [178, 34, 34],
              floralwhite: [255, 250, 240],
              forestgreen: [34, 139, 34],
              fuchsia: [255, 0, 255],
              gainsboro: [220, 220, 220],
              ghostwhite: [248, 248, 255],
              gold: [255, 215, 0],
              goldenrod: [218, 165, 32],
              gray: [128, 128, 128],
              green: [0, 128, 0],
              greenyellow: [173, 255, 47],
              grey: [128, 128, 128],
              honeydew: [240, 255, 240],
              hotpink: [255, 105, 180],
              indianred: [205, 92, 92],
              indigo: [75, 0, 130],
              ivory: [255, 255, 240],
              khaki: [240, 230, 140],
              lavender: [230, 230, 250],
              lavenderblush: [255, 240, 245],
              lawngreen: [124, 252, 0],
              lemonchiffon: [255, 250, 205],
              lightblue: [173, 216, 230],
              lightcoral: [240, 128, 128],
              lightcyan: [224, 255, 255],
              lightgoldenrodyellow: [250, 250, 210],
              lightgray: [211, 211, 211],
              lightgreen: [144, 238, 144],
              lightgrey: [211, 211, 211],
              lightpink: [255, 182, 193],
              lightsalmon: [255, 160, 122],
              lightseagreen: [32, 178, 170],
              lightskyblue: [135, 206, 250],
              lightslategray: [119, 136, 153],
              lightslategrey: [119, 136, 153],
              lightsteelblue: [176, 196, 222],
              lightyellow: [255, 255, 224],
              lime: [0, 255, 0],
              limegreen: [50, 205, 50],
              linen: [250, 240, 230],
              magenta: [255, 0, 255],
              maroon: [128, 0, 0],
              mediumaquamarine: [102, 205, 170],
              mediumblue: [0, 0, 205],
              mediumorchid: [186, 85, 211],
              mediumpurple: [147, 112, 219],
              mediumseagreen: [60, 179, 113],
              mediumslateblue: [123, 104, 238],
              mediumspringgreen: [0, 250, 154],
              mediumturquoise: [72, 209, 204],
              mediumvioletred: [199, 21, 133],
              midnightblue: [25, 25, 112],
              mintcream: [245, 255, 250],
              mistyrose: [255, 228, 225],
              moccasin: [255, 228, 181],
              navajowhite: [255, 222, 173],
              navy: [0, 0, 128],
              oldlace: [253, 245, 230],
              olive: [128, 128, 0],
              olivedrab: [107, 142, 35],
              orange: [255, 165, 0],
              orangered: [255, 69, 0],
              orchid: [218, 112, 214],
              palegoldenrod: [238, 232, 170],
              palegreen: [152, 251, 152],
              paleturquoise: [175, 238, 238],
              palevioletred: [219, 112, 147],
              papayawhip: [255, 239, 213],
              peachpuff: [255, 218, 185],
              peru: [205, 133, 63],
              pink: [255, 192, 203],
              plum: [221, 160, 221],
              powderblue: [176, 224, 230],
              purple: [128, 0, 128],
              rebeccapurple: [102, 51, 153],
              red: [255, 0, 0],
              rosybrown: [188, 143, 143],
              royalblue: [65, 105, 225],
              saddlebrown: [139, 69, 19],
              salmon: [250, 128, 114],
              sandybrown: [244, 164, 96],
              seagreen: [46, 139, 87],
              seashell: [255, 245, 238],
              sienna: [160, 82, 45],
              silver: [192, 192, 192],
              skyblue: [135, 206, 235],
              slateblue: [106, 90, 205],
              slategray: [112, 128, 144],
              slategrey: [112, 128, 144],
              snow: [255, 250, 250],
              springgreen: [0, 255, 127],
              steelblue: [70, 130, 180],
              tan: [210, 180, 140],
              teal: [0, 128, 128],
              thistle: [216, 191, 216],
              tomato: [255, 99, 71],
              turquoise: [64, 224, 208],
              violet: [238, 130, 238],
              wheat: [245, 222, 179],
              white: [255, 255, 255],
              whitesmoke: [245, 245, 245],
              yellow: [255, 255, 0],
              yellowgreen: [154, 205, 50],
            };
          },
        })),
          (gc = $e({
            "../../node_modules/color-convert/conversions.js"(e, t) {
              var r = Oy(),
                n = {};
              for (let i of Object.keys(r)) n[r[i]] = i;
              var o = {
                rgb: { channels: 3, labels: "rgb" },
                hsl: { channels: 3, labels: "hsl" },
                hsv: { channels: 3, labels: "hsv" },
                hwb: { channels: 3, labels: "hwb" },
                cmyk: { channels: 4, labels: "cmyk" },
                xyz: { channels: 3, labels: "xyz" },
                lab: { channels: 3, labels: "lab" },
                lch: { channels: 3, labels: "lch" },
                hex: { channels: 1, labels: ["hex"] },
                keyword: { channels: 1, labels: ["keyword"] },
                ansi16: { channels: 1, labels: ["ansi16"] },
                ansi256: { channels: 1, labels: ["ansi256"] },
                hcg: { channels: 3, labels: ["h", "c", "g"] },
                apple: { channels: 3, labels: ["r16", "g16", "b16"] },
                gray: { channels: 1, labels: ["gray"] },
              };
              t.exports = o;
              for (let i of Object.keys(o)) {
                if (!("channels" in o[i]))
                  throw new Error("missing channels property: " + i);
                if (!("labels" in o[i]))
                  throw new Error("missing channel labels property: " + i);
                if (o[i].labels.length !== o[i].channels)
                  throw new Error("channel and label counts mismatch: " + i);
                let { channels: s, labels: l } = o[i];
                delete o[i].channels,
                  delete o[i].labels,
                  Object.defineProperty(o[i], "channels", { value: s }),
                  Object.defineProperty(o[i], "labels", { value: l });
              }
              (o.rgb.hsl = function (i) {
                let s = i[0] / 255,
                  l = i[1] / 255,
                  c = i[2] / 255,
                  p = Math.min(s, l, c),
                  h = Math.max(s, l, c),
                  d = h - p,
                  y,
                  g;
                h === p
                  ? (y = 0)
                  : s === h
                    ? (y = (l - c) / d)
                    : l === h
                      ? (y = 2 + (c - s) / d)
                      : c === h && (y = 4 + (s - l) / d),
                  (y = Math.min(y * 60, 360)),
                  y < 0 && (y += 360);
                let A = (p + h) / 2;
                return (
                  h === p
                    ? (g = 0)
                    : A <= 0.5
                      ? (g = d / (h + p))
                      : (g = d / (2 - h - p)),
                  [y, g * 100, A * 100]
                );
              }),
                (o.rgb.hsv = function (i) {
                  let s,
                    l,
                    c,
                    p,
                    h,
                    d = i[0] / 255,
                    y = i[1] / 255,
                    g = i[2] / 255,
                    A = Math.max(d, y, g),
                    v = A - Math.min(d, y, g),
                    S = function (w) {
                      return (A - w) / 6 / v + 1 / 2;
                    };
                  return (
                    v === 0
                      ? ((p = 0), (h = 0))
                      : ((h = v / A),
                        (s = S(d)),
                        (l = S(y)),
                        (c = S(g)),
                        d === A
                          ? (p = c - l)
                          : y === A
                            ? (p = 1 / 3 + s - c)
                            : g === A && (p = 2 / 3 + l - s),
                        p < 0 ? (p += 1) : p > 1 && (p -= 1)),
                    [p * 360, h * 100, A * 100]
                  );
                }),
                (o.rgb.hwb = function (i) {
                  let s = i[0],
                    l = i[1],
                    c = i[2],
                    p = o.rgb.hsl(i)[0],
                    h = (1 / 255) * Math.min(s, Math.min(l, c));
                  return (
                    (c = 1 - (1 / 255) * Math.max(s, Math.max(l, c))),
                    [p, h * 100, c * 100]
                  );
                }),
                (o.rgb.cmyk = function (i) {
                  let s = i[0] / 255,
                    l = i[1] / 255,
                    c = i[2] / 255,
                    p = Math.min(1 - s, 1 - l, 1 - c),
                    h = (1 - s - p) / (1 - p) || 0,
                    d = (1 - l - p) / (1 - p) || 0,
                    y = (1 - c - p) / (1 - p) || 0;
                  return [h * 100, d * 100, y * 100, p * 100];
                });
              function a(i, s) {
                return (
                  (i[0] - s[0]) ** 2 + (i[1] - s[1]) ** 2 + (i[2] - s[2]) ** 2
                );
              }
              (o.rgb.keyword = function (i) {
                let s = n[i];
                if (s) return s;
                let l = 1 / 0,
                  c;
                for (let p of Object.keys(r)) {
                  let h = r[p],
                    d = a(i, h);
                  d < l && ((l = d), (c = p));
                }
                return c;
              }),
                (o.keyword.rgb = function (i) {
                  return r[i];
                }),
                (o.rgb.xyz = function (i) {
                  let s = i[0] / 255,
                    l = i[1] / 255,
                    c = i[2] / 255;
                  (s = s > 0.04045 ? ((s + 0.055) / 1.055) ** 2.4 : s / 12.92),
                    (l =
                      l > 0.04045 ? ((l + 0.055) / 1.055) ** 2.4 : l / 12.92),
                    (c =
                      c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92);
                  let p = s * 0.4124 + l * 0.3576 + c * 0.1805,
                    h = s * 0.2126 + l * 0.7152 + c * 0.0722,
                    d = s * 0.0193 + l * 0.1192 + c * 0.9505;
                  return [p * 100, h * 100, d * 100];
                }),
                (o.rgb.lab = function (i) {
                  let s = o.rgb.xyz(i),
                    l = s[0],
                    c = s[1],
                    p = s[2];
                  (l /= 95.047),
                    (c /= 100),
                    (p /= 108.883),
                    (l = l > 0.008856 ? l ** (1 / 3) : 7.787 * l + 16 / 116),
                    (c = c > 0.008856 ? c ** (1 / 3) : 7.787 * c + 16 / 116),
                    (p = p > 0.008856 ? p ** (1 / 3) : 7.787 * p + 16 / 116);
                  let h = 116 * c - 16,
                    d = 500 * (l - c),
                    y = 200 * (c - p);
                  return [h, d, y];
                }),
                (o.hsl.rgb = function (i) {
                  let s = i[0] / 360,
                    l = i[1] / 100,
                    c = i[2] / 100,
                    p,
                    h,
                    d;
                  if (l === 0) return (d = c * 255), [d, d, d];
                  c < 0.5 ? (p = c * (1 + l)) : (p = c + l - c * l);
                  let y = 2 * c - p,
                    g = [0, 0, 0];
                  for (let A = 0; A < 3; A++)
                    (h = s + (1 / 3) * -(A - 1)),
                      h < 0 && h++,
                      h > 1 && h--,
                      6 * h < 1
                        ? (d = y + (p - y) * 6 * h)
                        : 2 * h < 1
                          ? (d = p)
                          : 3 * h < 2
                            ? (d = y + (p - y) * (2 / 3 - h) * 6)
                            : (d = y),
                      (g[A] = d * 255);
                  return g;
                }),
                (o.hsl.hsv = function (i) {
                  let s = i[0],
                    l = i[1] / 100,
                    c = i[2] / 100,
                    p = l,
                    h = Math.max(c, 0.01);
                  (c *= 2),
                    (l *= c <= 1 ? c : 2 - c),
                    (p *= h <= 1 ? h : 2 - h);
                  let d = (c + l) / 2,
                    y = c === 0 ? (2 * p) / (h + p) : (2 * l) / (c + l);
                  return [s, y * 100, d * 100];
                }),
                (o.hsv.rgb = function (i) {
                  let s = i[0] / 60,
                    l = i[1] / 100,
                    c = i[2] / 100,
                    p = Math.floor(s) % 6,
                    h = s - Math.floor(s),
                    d = 255 * c * (1 - l),
                    y = 255 * c * (1 - l * h),
                    g = 255 * c * (1 - l * (1 - h));
                  switch (((c *= 255), p)) {
                    case 0:
                      return [c, g, d];
                    case 1:
                      return [y, c, d];
                    case 2:
                      return [d, c, g];
                    case 3:
                      return [d, y, c];
                    case 4:
                      return [g, d, c];
                    case 5:
                      return [c, d, y];
                  }
                }),
                (o.hsv.hsl = function (i) {
                  let s = i[0],
                    l = i[1] / 100,
                    c = i[2] / 100,
                    p = Math.max(c, 0.01),
                    h,
                    d;
                  d = (2 - l) * c;
                  let y = (2 - l) * p;
                  return (
                    (h = l * p),
                    (h /= y <= 1 ? y : 2 - y),
                    (h = h || 0),
                    (d /= 2),
                    [s, h * 100, d * 100]
                  );
                }),
                (o.hwb.rgb = function (i) {
                  let s = i[0] / 360,
                    l = i[1] / 100,
                    c = i[2] / 100,
                    p = l + c,
                    h;
                  p > 1 && ((l /= p), (c /= p));
                  let d = Math.floor(6 * s),
                    y = 1 - c;
                  (h = 6 * s - d), (d & 1) !== 0 && (h = 1 - h);
                  let g = l + h * (y - l),
                    A,
                    v,
                    S;
                  switch (d) {
                    default:
                    case 6:
                    case 0:
                      (A = y), (v = g), (S = l);
                      break;
                    case 1:
                      (A = g), (v = y), (S = l);
                      break;
                    case 2:
                      (A = l), (v = y), (S = g);
                      break;
                    case 3:
                      (A = l), (v = g), (S = y);
                      break;
                    case 4:
                      (A = g), (v = l), (S = y);
                      break;
                    case 5:
                      (A = y), (v = l), (S = g);
                      break;
                  }
                  return [A * 255, v * 255, S * 255];
                }),
                (o.cmyk.rgb = function (i) {
                  let s = i[0] / 100,
                    l = i[1] / 100,
                    c = i[2] / 100,
                    p = i[3] / 100,
                    h = 1 - Math.min(1, s * (1 - p) + p),
                    d = 1 - Math.min(1, l * (1 - p) + p),
                    y = 1 - Math.min(1, c * (1 - p) + p);
                  return [h * 255, d * 255, y * 255];
                }),
                (o.xyz.rgb = function (i) {
                  let s = i[0] / 100,
                    l = i[1] / 100,
                    c = i[2] / 100,
                    p,
                    h,
                    d;
                  return (
                    (p = s * 3.2406 + l * -1.5372 + c * -0.4986),
                    (h = s * -0.9689 + l * 1.8758 + c * 0.0415),
                    (d = s * 0.0557 + l * -0.204 + c * 1.057),
                    (p =
                      p > 0.0031308
                        ? 1.055 * p ** (1 / 2.4) - 0.055
                        : p * 12.92),
                    (h =
                      h > 0.0031308
                        ? 1.055 * h ** (1 / 2.4) - 0.055
                        : h * 12.92),
                    (d =
                      d > 0.0031308
                        ? 1.055 * d ** (1 / 2.4) - 0.055
                        : d * 12.92),
                    (p = Math.min(Math.max(0, p), 1)),
                    (h = Math.min(Math.max(0, h), 1)),
                    (d = Math.min(Math.max(0, d), 1)),
                    [p * 255, h * 255, d * 255]
                  );
                }),
                (o.xyz.lab = function (i) {
                  let s = i[0],
                    l = i[1],
                    c = i[2];
                  (s /= 95.047),
                    (l /= 100),
                    (c /= 108.883),
                    (s = s > 0.008856 ? s ** (1 / 3) : 7.787 * s + 16 / 116),
                    (l = l > 0.008856 ? l ** (1 / 3) : 7.787 * l + 16 / 116),
                    (c = c > 0.008856 ? c ** (1 / 3) : 7.787 * c + 16 / 116);
                  let p = 116 * l - 16,
                    h = 500 * (s - l),
                    d = 200 * (l - c);
                  return [p, h, d];
                }),
                (o.lab.xyz = function (i) {
                  let s = i[0],
                    l = i[1],
                    c = i[2],
                    p,
                    h,
                    d;
                  (h = (s + 16) / 116), (p = l / 500 + h), (d = h - c / 200);
                  let y = h ** 3,
                    g = p ** 3,
                    A = d ** 3;
                  return (
                    (h = y > 0.008856 ? y : (h - 16 / 116) / 7.787),
                    (p = g > 0.008856 ? g : (p - 16 / 116) / 7.787),
                    (d = A > 0.008856 ? A : (d - 16 / 116) / 7.787),
                    (p *= 95.047),
                    (h *= 100),
                    (d *= 108.883),
                    [p, h, d]
                  );
                }),
                (o.lab.lch = function (i) {
                  let s = i[0],
                    l = i[1],
                    c = i[2],
                    p;
                  (p = (Math.atan2(c, l) * 360) / 2 / Math.PI),
                    p < 0 && (p += 360);
                  let h = Math.sqrt(l * l + c * c);
                  return [s, h, p];
                }),
                (o.lch.lab = function (i) {
                  let s = i[0],
                    l = i[1],
                    c = (i[2] / 360) * 2 * Math.PI,
                    p = l * Math.cos(c),
                    h = l * Math.sin(c);
                  return [s, p, h];
                }),
                (o.rgb.ansi16 = function (i, s = null) {
                  let [l, c, p] = i,
                    h = s === null ? o.rgb.hsv(i)[2] : s;
                  if (((h = Math.round(h / 50)), h === 0)) return 30;
                  let d =
                    30 +
                    ((Math.round(p / 255) << 2) |
                      (Math.round(c / 255) << 1) |
                      Math.round(l / 255));
                  return h === 2 && (d += 60), d;
                }),
                (o.hsv.ansi16 = function (i) {
                  return o.rgb.ansi16(o.hsv.rgb(i), i[2]);
                }),
                (o.rgb.ansi256 = function (i) {
                  let s = i[0],
                    l = i[1],
                    c = i[2];
                  return s === l && l === c
                    ? s < 8
                      ? 16
                      : s > 248
                        ? 231
                        : Math.round(((s - 8) / 247) * 24) + 232
                    : 16 +
                        36 * Math.round((s / 255) * 5) +
                        6 * Math.round((l / 255) * 5) +
                        Math.round((c / 255) * 5);
                }),
                (o.ansi16.rgb = function (i) {
                  let s = i % 10;
                  if (s === 0 || s === 7)
                    return (
                      i > 50 && (s += 3.5), (s = (s / 10.5) * 255), [s, s, s]
                    );
                  let l = (~~(i > 50) + 1) * 0.5,
                    c = (s & 1) * l * 255,
                    p = ((s >> 1) & 1) * l * 255,
                    h = ((s >> 2) & 1) * l * 255;
                  return [c, p, h];
                }),
                (o.ansi256.rgb = function (i) {
                  if (i >= 232) {
                    let h = (i - 232) * 10 + 8;
                    return [h, h, h];
                  }
                  i -= 16;
                  let s,
                    l = (Math.floor(i / 36) / 5) * 255,
                    c = (Math.floor((s = i % 36) / 6) / 5) * 255,
                    p = ((s % 6) / 5) * 255;
                  return [l, c, p];
                }),
                (o.rgb.hex = function (i) {
                  let s = (
                    ((Math.round(i[0]) & 255) << 16) +
                    ((Math.round(i[1]) & 255) << 8) +
                    (Math.round(i[2]) & 255)
                  )
                    .toString(16)
                    .toUpperCase();
                  return "000000".substring(s.length) + s;
                }),
                (o.hex.rgb = function (i) {
                  let s = i.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
                  if (!s) return [0, 0, 0];
                  let l = s[0];
                  s[0].length === 3 &&
                    (l = l
                      .split("")
                      .map((y) => y + y)
                      .join(""));
                  let c = parseInt(l, 16),
                    p = (c >> 16) & 255,
                    h = (c >> 8) & 255,
                    d = c & 255;
                  return [p, h, d];
                }),
                (o.rgb.hcg = function (i) {
                  let s = i[0] / 255,
                    l = i[1] / 255,
                    c = i[2] / 255,
                    p = Math.max(Math.max(s, l), c),
                    h = Math.min(Math.min(s, l), c),
                    d = p - h,
                    y,
                    g;
                  return (
                    d < 1 ? (y = h / (1 - d)) : (y = 0),
                    d <= 0
                      ? (g = 0)
                      : p === s
                        ? (g = ((l - c) / d) % 6)
                        : p === l
                          ? (g = 2 + (c - s) / d)
                          : (g = 4 + (s - l) / d),
                    (g /= 6),
                    (g %= 1),
                    [g * 360, d * 100, y * 100]
                  );
                }),
                (o.hsl.hcg = function (i) {
                  let s = i[1] / 100,
                    l = i[2] / 100,
                    c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l),
                    p = 0;
                  return (
                    c < 1 && (p = (l - 0.5 * c) / (1 - c)),
                    [i[0], c * 100, p * 100]
                  );
                }),
                (o.hsv.hcg = function (i) {
                  let s = i[1] / 100,
                    l = i[2] / 100,
                    c = s * l,
                    p = 0;
                  return (
                    c < 1 && (p = (l - c) / (1 - c)), [i[0], c * 100, p * 100]
                  );
                }),
                (o.hcg.rgb = function (i) {
                  let s = i[0] / 360,
                    l = i[1] / 100,
                    c = i[2] / 100;
                  if (l === 0) return [c * 255, c * 255, c * 255];
                  let p = [0, 0, 0],
                    h = (s % 1) * 6,
                    d = h % 1,
                    y = 1 - d,
                    g = 0;
                  switch (Math.floor(h)) {
                    case 0:
                      (p[0] = 1), (p[1] = d), (p[2] = 0);
                      break;
                    case 1:
                      (p[0] = y), (p[1] = 1), (p[2] = 0);
                      break;
                    case 2:
                      (p[0] = 0), (p[1] = 1), (p[2] = d);
                      break;
                    case 3:
                      (p[0] = 0), (p[1] = y), (p[2] = 1);
                      break;
                    case 4:
                      (p[0] = d), (p[1] = 0), (p[2] = 1);
                      break;
                    default:
                      (p[0] = 1), (p[1] = 0), (p[2] = y);
                  }
                  return (
                    (g = (1 - l) * c),
                    [
                      (l * p[0] + g) * 255,
                      (l * p[1] + g) * 255,
                      (l * p[2] + g) * 255,
                    ]
                  );
                }),
                (o.hcg.hsv = function (i) {
                  let s = i[1] / 100,
                    l = i[2] / 100,
                    c = s + l * (1 - s),
                    p = 0;
                  return c > 0 && (p = s / c), [i[0], p * 100, c * 100];
                }),
                (o.hcg.hsl = function (i) {
                  let s = i[1] / 100,
                    l = (i[2] / 100) * (1 - s) + 0.5 * s,
                    c = 0;
                  return (
                    l > 0 && l < 0.5
                      ? (c = s / (2 * l))
                      : l >= 0.5 && l < 1 && (c = s / (2 * (1 - l))),
                    [i[0], c * 100, l * 100]
                  );
                }),
                (o.hcg.hwb = function (i) {
                  let s = i[1] / 100,
                    l = i[2] / 100,
                    c = s + l * (1 - s);
                  return [i[0], (c - s) * 100, (1 - c) * 100];
                }),
                (o.hwb.hcg = function (i) {
                  let s = i[1] / 100,
                    l = 1 - i[2] / 100,
                    c = l - s,
                    p = 0;
                  return (
                    c < 1 && (p = (l - c) / (1 - c)), [i[0], c * 100, p * 100]
                  );
                }),
                (o.apple.rgb = function (i) {
                  return [
                    (i[0] / 65535) * 255,
                    (i[1] / 65535) * 255,
                    (i[2] / 65535) * 255,
                  ];
                }),
                (o.rgb.apple = function (i) {
                  return [
                    (i[0] / 255) * 65535,
                    (i[1] / 255) * 65535,
                    (i[2] / 255) * 65535,
                  ];
                }),
                (o.gray.rgb = function (i) {
                  return [
                    (i[0] / 100) * 255,
                    (i[0] / 100) * 255,
                    (i[0] / 100) * 255,
                  ];
                }),
                (o.gray.hsl = function (i) {
                  return [0, 0, i[0]];
                }),
                (o.gray.hsv = o.gray.hsl),
                (o.gray.hwb = function (i) {
                  return [0, 100, i[0]];
                }),
                (o.gray.cmyk = function (i) {
                  return [0, 0, 0, i[0]];
                }),
                (o.gray.lab = function (i) {
                  return [i[0], 0, 0];
                }),
                (o.gray.hex = function (i) {
                  let s = Math.round((i[0] / 100) * 255) & 255,
                    l = ((s << 16) + (s << 8) + s).toString(16).toUpperCase();
                  return "000000".substring(l.length) + l;
                }),
                (o.rgb.gray = function (i) {
                  return [((i[0] + i[1] + i[2]) / 3 / 255) * 100];
                });
            },
          })),
          (_y = $e({
            "../../node_modules/color-convert/route.js"(e, t) {
              var r = gc();
              function n() {
                let s = {},
                  l = Object.keys(r);
                for (let c = l.length, p = 0; p < c; p++)
                  s[l[p]] = { distance: -1, parent: null };
                return s;
              }
              function o(s) {
                let l = n(),
                  c = [s];
                for (l[s].distance = 0; c.length; ) {
                  let p = c.pop(),
                    h = Object.keys(r[p]);
                  for (let d = h.length, y = 0; y < d; y++) {
                    let g = h[y],
                      A = l[g];
                    A.distance === -1 &&
                      ((A.distance = l[p].distance + 1),
                      (A.parent = p),
                      c.unshift(g));
                  }
                }
                return l;
              }
              function a(s, l) {
                return function (c) {
                  return l(s(c));
                };
              }
              function i(s, l) {
                let c = [l[s].parent, s],
                  p = r[l[s].parent][s],
                  h = l[s].parent;
                for (; l[h].parent; )
                  c.unshift(l[h].parent),
                    (p = a(r[l[h].parent][h], p)),
                    (h = l[h].parent);
                return (p.conversion = c), p;
              }
              t.exports = function (s) {
                let l = o(s),
                  c = {},
                  p = Object.keys(l);
                for (let h = p.length, d = 0; d < h; d++) {
                  let y = p[d];
                  l[y].parent !== null && (c[y] = i(y, l));
                }
                return c;
              };
            },
          })),
          (By = $e({
            "../../node_modules/color-convert/index.js"(e, t) {
              var r = gc(),
                n = _y(),
                o = {},
                a = Object.keys(r);
              function i(l) {
                let c = function (...p) {
                  let h = p[0];
                  return h == null ? h : (h.length > 1 && (p = h), l(p));
                };
                return "conversion" in l && (c.conversion = l.conversion), c;
              }
              function s(l) {
                let c = function (...p) {
                  let h = p[0];
                  if (h == null) return h;
                  h.length > 1 && (p = h);
                  let d = l(p);
                  if (typeof d == "object")
                    for (let y = d.length, g = 0; g < y; g++)
                      d[g] = Math.round(d[g]);
                  return d;
                };
                return "conversion" in l && (c.conversion = l.conversion), c;
              }
              a.forEach((l) => {
                (o[l] = {}),
                  Object.defineProperty(o[l], "channels", {
                    value: r[l].channels,
                  }),
                  Object.defineProperty(o[l], "labels", { value: r[l].labels });
                let c = n(l);
                Object.keys(c).forEach((p) => {
                  let h = c[p];
                  (o[l][p] = s(h)), (o[l][p].raw = i(h));
                });
              }),
                (t.exports = o);
            },
          })),
          (Je = zt(By()));
        (or = function (e, t, r) {
          return (
            t === void 0 && (t = 0),
            r === void 0 && (r = 1),
            e > r ? r : e < t ? t : e
          );
        }),
          (Tr = function (e) {
            return "touches" in e;
          }),
          (ha = function (e) {
            return (e && e.ownerDocument.defaultView) || self;
          }),
          (pc = function (e, t, r) {
            var n = e.getBoundingClientRect(),
              o = Tr(t)
                ? (function (a, i) {
                    for (var s = 0; s < a.length; s++)
                      if (a[s].identifier === i) return a[s];
                    return a[0];
                  })(t.touches, r)
                : t;
            return {
              left: or((o.pageX - (n.left + ha(e).pageXOffset)) / n.width),
              top: or((o.pageY - (n.top + ha(e).pageYOffset)) / n.height),
            };
          }),
          (hc = function (e) {
            !Tr(e) && e.preventDefault();
          }),
          (ba = f.memo(function (e) {
            var t = e.onMove,
              r = e.onKey,
              n = ga(e, ["onMove", "onKey"]),
              o = Pe(null),
              a = pa(t),
              i = pa(r),
              s = Pe(null),
              l = Pe(!1),
              c = pt(
                function () {
                  var y = function (v) {
                      hc(v),
                        (Tr(v) ? v.touches.length > 0 : v.buttons > 0) &&
                        o.current
                          ? a(pc(o.current, v, s.current))
                          : A(!1);
                    },
                    g = function () {
                      return A(!1);
                    };
                  function A(v) {
                    var S = l.current,
                      w = ha(o.current),
                      x = v ? w.addEventListener : w.removeEventListener;
                    x(S ? "touchmove" : "mousemove", y),
                      x(S ? "touchend" : "mouseup", g);
                  }
                  return [
                    function (v) {
                      var S = v.nativeEvent,
                        w = o.current;
                      if (
                        w &&
                        (hc(S),
                        !(function (C, k) {
                          return k && !Tr(C);
                        })(S, l.current) && w)
                      ) {
                        if (Tr(S)) {
                          l.current = !0;
                          var x = S.changedTouches || [];
                          x.length && (s.current = x[0].identifier);
                        }
                        w.focus(), a(pc(w, S, s.current)), A(!0);
                      }
                    },
                    function (v) {
                      var S = v.which || v.keyCode;
                      S < 37 ||
                        S > 40 ||
                        (v.preventDefault(),
                        i({
                          left: S === 39 ? 0.05 : S === 37 ? -0.05 : 0,
                          top: S === 40 ? 0.05 : S === 38 ? -0.05 : 0,
                        }));
                    },
                    A,
                  ];
                },
                [i, a],
              ),
              p = c[0],
              h = c[1],
              d = c[2];
            return (
              xe(
                function () {
                  return d;
                },
                [d],
              ),
              f.createElement(
                "div",
                Nt({}, n, {
                  onTouchStart: p,
                  onMouseDown: p,
                  className: "react-colorful__interactive",
                  ref: o,
                  onKeyDown: h,
                  tabIndex: 0,
                  role: "slider",
                }),
              )
            );
          })),
          (Fr = function (e) {
            return e.filter(Boolean).join(" ");
          }),
          (Ea = function (e) {
            var t = e.color,
              r = e.left,
              n = e.top,
              o = n === void 0 ? 0.5 : n,
              a = Fr(["react-colorful__pointer", e.className]);
            return f.createElement(
              "div",
              {
                className: a,
                style: { top: 100 * o + "%", left: 100 * r + "%" },
              },
              f.createElement("div", {
                className: "react-colorful__pointer-fill",
                style: { backgroundColor: t },
              }),
            );
          }),
          (Se = function (e, t, r) {
            return (
              t === void 0 && (t = 0),
              r === void 0 && (r = Math.pow(10, t)),
              Math.round(r * e) / r
            );
          }),
          (Py = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }),
          (Ny = function (e) {
            return vc(fa(e));
          }),
          (fa = function (e) {
            return (
              e[0] === "#" && (e = e.substring(1)),
              e.length < 6
                ? {
                    r: parseInt(e[0] + e[0], 16),
                    g: parseInt(e[1] + e[1], 16),
                    b: parseInt(e[2] + e[2], 16),
                    a:
                      e.length === 4
                        ? Se(parseInt(e[3] + e[3], 16) / 255, 2)
                        : 1,
                  }
                : {
                    r: parseInt(e.substring(0, 2), 16),
                    g: parseInt(e.substring(2, 4), 16),
                    b: parseInt(e.substring(4, 6), 16),
                    a:
                      e.length === 8
                        ? Se(parseInt(e.substring(6, 8), 16) / 255, 2)
                        : 1,
                  }
            );
          }),
          (jy = function (e, t) {
            return t === void 0 && (t = "deg"), Number(e) * (Py[t] || 1);
          }),
          (Ly = function (e) {
            var t =
              /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(
                e,
              );
            return t
              ? My({
                  h: jy(t[1], t[2]),
                  s: Number(t[3]),
                  l: Number(t[4]),
                  a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1),
                })
              : { h: 0, s: 0, v: 0, a: 1 };
          }),
          (My = function (e) {
            var t = e.s,
              r = e.l;
            return {
              h: e.h,
              s:
                (t *= (r < 50 ? r : 100 - r) / 100) > 0
                  ? ((2 * t) / (r + t)) * 100
                  : 0,
              v: r + t,
              a: e.a,
            };
          }),
          (Uy = function (e) {
            return qy(Ec(e));
          }),
          (bc = function (e) {
            var t = e.s,
              r = e.v,
              n = e.a,
              o = ((200 - t) * r) / 100;
            return {
              h: Se(e.h),
              s: Se(
                o > 0 && o < 200
                  ? ((t * r) / 100 / (o <= 100 ? o : 200 - o)) * 100
                  : 0,
              ),
              l: Se(o / 2),
              a: Se(n, 2),
            };
          }),
          (ma = function (e) {
            var t = bc(e);
            return "hsl(" + t.h + ", " + t.s + "%, " + t.l + "%)";
          }),
          (An = function (e) {
            var t = bc(e);
            return "hsla(" + t.h + ", " + t.s + "%, " + t.l + "%, " + t.a + ")";
          }),
          (Ec = function (e) {
            var t = e.h,
              r = e.s,
              n = e.v,
              o = e.a;
            (t = (t / 360) * 6), (r /= 100), (n /= 100);
            var a = Math.floor(t),
              i = n * (1 - r),
              s = n * (1 - (t - a) * r),
              l = n * (1 - (1 - t + a) * r),
              c = a % 6;
            return {
              r: Se(255 * [n, s, i, i, l, n][c]),
              g: Se(255 * [l, n, n, s, i, i][c]),
              b: Se(255 * [i, i, l, n, n, s][c]),
              a: Se(o, 2),
            };
          }),
          ($y = function (e) {
            var t =
              /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(
                e,
              );
            return t
              ? vc({
                  r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
                  g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
                  b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
                  a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1),
                })
              : { h: 0, s: 0, v: 0, a: 1 };
          }),
          (bn = function (e) {
            var t = e.toString(16);
            return t.length < 2 ? "0" + t : t;
          }),
          (qy = function (e) {
            var t = e.r,
              r = e.g,
              n = e.b,
              o = e.a,
              a = o < 1 ? bn(Se(255 * o)) : "";
            return "#" + bn(t) + bn(r) + bn(n) + a;
          }),
          (vc = function (e) {
            var t = e.r,
              r = e.g,
              n = e.b,
              o = e.a,
              a = Math.max(t, r, n),
              i = a - Math.min(t, r, n),
              s = i
                ? a === t
                  ? (r - n) / i
                  : a === r
                    ? 2 + (n - t) / i
                    : 4 + (t - r) / i
                : 0;
            return {
              h: Se(60 * (s < 0 ? s + 6 : s)),
              s: Se(a ? (i / a) * 100 : 0),
              v: Se((a / 255) * 100),
              a: o,
            };
          }),
          (Ac = f.memo(function (e) {
            var t = e.hue,
              r = e.onChange,
              n = Fr(["react-colorful__hue", e.className]);
            return f.createElement(
              "div",
              { className: n },
              f.createElement(
                ba,
                {
                  onMove: function (o) {
                    r({ h: 360 * o.left });
                  },
                  onKey: function (o) {
                    r({ h: or(t + 360 * o.left, 0, 360) });
                  },
                  "aria-label": "Hue",
                  "aria-valuenow": Se(t),
                  "aria-valuemax": "360",
                  "aria-valuemin": "0",
                },
                f.createElement(Ea, {
                  className: "react-colorful__hue-pointer",
                  left: t / 360,
                  color: ma({ h: t, s: 100, v: 100, a: 1 }),
                }),
              ),
            );
          })),
          (Dc = f.memo(function (e) {
            var t = e.hsva,
              r = e.onChange,
              n = { backgroundColor: ma({ h: t.h, s: 100, v: 100, a: 1 }) };
            return f.createElement(
              "div",
              { className: "react-colorful__saturation", style: n },
              f.createElement(
                ba,
                {
                  onMove: function (o) {
                    r({ s: 100 * o.left, v: 100 - 100 * o.top });
                  },
                  onKey: function (o) {
                    r({
                      s: or(t.s + 100 * o.left, 0, 100),
                      v: or(t.v - 100 * o.top, 0, 100),
                    });
                  },
                  "aria-label": "Color",
                  "aria-valuetext":
                    "Saturation " + Se(t.s) + "%, Brightness " + Se(t.v) + "%",
                },
                f.createElement(Ea, {
                  className: "react-colorful__saturation-pointer",
                  top: 1 - t.v / 100,
                  left: t.s / 100,
                  color: ma(t),
                }),
              ),
            );
          })),
          (Sc = function (e, t) {
            if (e === t) return !0;
            for (var r in e) if (e[r] !== t[r]) return !1;
            return !0;
          }),
          (wc = function (e, t) {
            return e.replace(/\s/g, "") === t.replace(/\s/g, "");
          }),
          (Vy = function (e, t) {
            return e.toLowerCase() === t.toLowerCase() || Sc(fa(e), fa(t));
          });
        (Jy = typeof window < "u" ? yi : xe),
          (zy = function () {
            return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : void 0;
          }),
          (fc = new Map()),
          (xc = function (e) {
            Jy(function () {
              var t = e.current ? e.current.ownerDocument : document;
              if (t !== void 0 && !fc.has(t)) {
                var r = t.createElement("style");
                (r.innerHTML = `.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`),
                  fc.set(t, r);
                var n = zy();
                n && r.setAttribute("nonce", n), t.head.appendChild(r);
              }
            }, []);
          }),
          (Hy = function (e) {
            var t = e.className,
              r = e.colorModel,
              n = e.color,
              o = n === void 0 ? r.defaultColor : n,
              a = e.onChange,
              i = ga(e, ["className", "colorModel", "color", "onChange"]),
              s = Pe(null);
            xc(s);
            var l = Cc(r, o, a),
              c = l[0],
              p = l[1],
              h = Fr(["react-colorful", t]);
            return f.createElement(
              "div",
              Nt({}, i, { ref: s, className: h }),
              f.createElement(Dc, { hsva: c, onChange: p }),
              f.createElement(Ac, {
                hue: c.h,
                onChange: p,
                className: "react-colorful__last-control",
              }),
            );
          }),
          (Gy = {
            defaultColor: "000",
            toHsva: Ny,
            fromHsva: function (e) {
              return Uy({ h: e.h, s: e.s, v: e.v, a: 1 });
            },
            equal: Vy,
          }),
          (Wy = function (e) {
            return f.createElement(Hy, Nt({}, e, { colorModel: Gy }));
          }),
          (Ky = function (e) {
            var t = e.className,
              r = e.hsva,
              n = e.onChange,
              o = {
                backgroundImage:
                  "linear-gradient(90deg, " +
                  An(Object.assign({}, r, { a: 0 })) +
                  ", " +
                  An(Object.assign({}, r, { a: 1 })) +
                  ")",
              },
              a = Fr(["react-colorful__alpha", t]),
              i = Se(100 * r.a);
            return f.createElement(
              "div",
              { className: a },
              f.createElement("div", {
                className: "react-colorful__alpha-gradient",
                style: o,
              }),
              f.createElement(
                ba,
                {
                  onMove: function (s) {
                    n({ a: s.left });
                  },
                  onKey: function (s) {
                    n({ a: or(r.a + s.left) });
                  },
                  "aria-label": "Alpha",
                  "aria-valuetext": i + "%",
                  "aria-valuenow": i,
                  "aria-valuemin": "0",
                  "aria-valuemax": "100",
                },
                f.createElement(Ea, {
                  className: "react-colorful__alpha-pointer",
                  left: r.a,
                  color: An(r),
                }),
              ),
            );
          }),
          (Tc = function (e) {
            var t = e.className,
              r = e.colorModel,
              n = e.color,
              o = n === void 0 ? r.defaultColor : n,
              a = e.onChange,
              i = ga(e, ["className", "colorModel", "color", "onChange"]),
              s = Pe(null);
            xc(s);
            var l = Cc(r, o, a),
              c = l[0],
              p = l[1],
              h = Fr(["react-colorful", t]);
            return f.createElement(
              "div",
              Nt({}, i, { ref: s, className: h }),
              f.createElement(Dc, { hsva: c, onChange: p }),
              f.createElement(Ac, { hue: c.h, onChange: p }),
              f.createElement(Ky, {
                hsva: c,
                onChange: p,
                className: "react-colorful__last-control",
              }),
            );
          }),
          (Yy = {
            defaultColor: "hsla(0, 0%, 0%, 1)",
            toHsva: Ly,
            fromHsva: An,
            equal: wc,
          }),
          (Xy = function (e) {
            return f.createElement(Tc, Nt({}, e, { colorModel: Yy }));
          }),
          (Qy = {
            defaultColor: "rgba(0, 0, 0, 1)",
            toHsva: $y,
            fromHsva: function (e) {
              var t = Ec(e);
              return "rgba(" + t.r + ", " + t.g + ", " + t.b + ", " + t.a + ")";
            },
            equal: wc,
          }),
          (Zy = function (e) {
            return f.createElement(Tc, Nt({}, e, { colorModel: Qy }));
          }),
          (eg = R.div({
            position: "relative",
            maxWidth: 250,
            '&[aria-readonly="true"]': { opacity: 0.5 },
          })),
          (tg = R(ft)({
            position: "absolute",
            zIndex: 1,
            top: 4,
            left: 4,
            "[aria-readonly=true] &": { cursor: "not-allowed" },
          })),
          (rg = R.div({
            width: 200,
            margin: 5,
            ".react-colorful__saturation": { borderRadius: "4px 4px 0 0" },
            ".react-colorful__hue": {
              boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 5%)",
            },
            ".react-colorful__last-control": { borderRadius: "0 0 4px 4px" },
          })),
          (ng = R(Tt)(({ theme: e }) => ({
            fontFamily: e.typography.fonts.base,
          }))),
          (og = R.div({
            display: "grid",
            gridTemplateColumns: "repeat(9, 16px)",
            gap: 6,
            padding: 3,
            marginTop: 5,
            width: 200,
          })),
          (ag = R.div(({ theme: e, active: t }) => ({
            width: 16,
            height: 16,
            boxShadow: t
              ? `${e.appBorderColor} 0 0 0 1px inset, ${e.textMutedColor}50 0 0 0 4px`
              : `${e.appBorderColor} 0 0 0 1px inset`,
            borderRadius: e.appBorderRadius,
          }))),
          (ig = `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`),
          (mc = ({ value: e, style: t, ...r }) => {
            let n = `linear-gradient(${e}, ${e}), ${ig}, linear-gradient(#fff, #fff)`;
            return f.createElement(ag, {
              ...r,
              style: { ...t, backgroundImage: n },
            });
          }),
          (sg = R(Ge.Input)(({ theme: e, readOnly: t }) => ({
            width: "100%",
            paddingLeft: 30,
            paddingRight: 30,
            boxSizing: "border-box",
            fontFamily: e.typography.fonts.base,
          }))),
          (lg = R(ts)(({ theme: e }) => ({
            position: "absolute",
            zIndex: 1,
            top: 6,
            right: 7,
            width: 20,
            height: 20,
            padding: 4,
            boxSizing: "border-box",
            cursor: "pointer",
            color: e.input.color,
          }))),
          (Fc = ((e) => ((e.RGB = "rgb"), (e.HSL = "hsl"), (e.HEX = "hex"), e))(
            Fc || {},
          )),
          (En = Object.values(Fc)),
          (ug = /\(([0-9]+),\s*([0-9]+)%?,\s*([0-9]+)%?,?\s*([0-9.]+)?\)/),
          (cg =
            /^\s*rgba?\(([0-9]+),\s*([0-9]+),\s*([0-9]+),?\s*([0-9.]+)?\)\s*$/i),
          (dg =
            /^\s*hsla?\(([0-9]+),\s*([0-9]+)%,\s*([0-9]+)%,?\s*([0-9.]+)?\)\s*$/i),
          (ya = /^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i),
          (pg = /^\s*#?([0-9a-f]{3})\s*$/i),
          (hg = { hex: Wy, rgb: Zy, hsl: Xy }),
          (vn = {
            hex: "transparent",
            rgb: "rgba(0, 0, 0, 0)",
            hsl: "hsla(0, 0%, 0%, 0)",
          }),
          (yc = (e) => {
            let t = e?.match(ug);
            if (!t) return [0, 0, 0, 1];
            let [, r, n, o, a = 1] = t;
            return [r, n, o, a].map(Number);
          }),
          (nr = (e) => {
            if (!e) return;
            let t = !0;
            if (cg.test(e)) {
              let [i, s, l, c] = yc(e),
                [p, h, d] = Je.default.rgb.hsl([i, s, l]) || [0, 0, 0];
              return {
                valid: t,
                value: e,
                keyword: Je.default.rgb.keyword([i, s, l]),
                colorSpace: "rgb",
                rgb: e,
                hsl: `hsla(${p}, ${h}%, ${d}%, ${c})`,
                hex: `#${Je.default.rgb.hex([i, s, l]).toLowerCase()}`,
              };
            }
            if (dg.test(e)) {
              let [i, s, l, c] = yc(e),
                [p, h, d] = Je.default.hsl.rgb([i, s, l]) || [0, 0, 0];
              return {
                valid: t,
                value: e,
                keyword: Je.default.hsl.keyword([i, s, l]),
                colorSpace: "hsl",
                rgb: `rgba(${p}, ${h}, ${d}, ${c})`,
                hsl: e,
                hex: `#${Je.default.hsl.hex([i, s, l]).toLowerCase()}`,
              };
            }
            let r = e.replace("#", ""),
              n = Je.default.keyword.rgb(r) || Je.default.hex.rgb(r),
              o = Je.default.rgb.hsl(n),
              a = e;
            if (
              (/[^#a-f0-9]/i.test(e) ? (a = r) : ya.test(e) && (a = `#${r}`),
              a.startsWith("#"))
            )
              t = ya.test(a);
            else
              try {
                Je.default.keyword.hex(a);
              } catch {
                t = !1;
              }
            return {
              valid: t,
              value: a,
              keyword: Je.default.rgb.keyword(n),
              colorSpace: "hex",
              rgb: `rgba(${n[0]}, ${n[1]}, ${n[2]}, 1)`,
              hsl: `hsla(${o[0]}, ${o[1]}%, ${o[2]}%, 1)`,
              hex: a,
            };
          }),
          (fg = (e, t, r) => {
            if (!e || !t?.valid) return vn[r];
            if (r !== "hex") return t?.[r] || vn[r];
            if (!t.hex.startsWith("#"))
              try {
                return `#${Je.default.keyword.hex(t.hex)}`;
              } catch {
                return vn.hex;
              }
            let n = t.hex.match(pg);
            if (!n) return ya.test(t.hex) ? t.hex : vn.hex;
            let [o, a, i] = n[1].split("");
            return `#${o}${o}${a}${a}${i}${i}`;
          }),
          (mg = (e, t) => {
            let [r, n] = Z(e || ""),
              [o, a] = Z(() => nr(r)),
              [i, s] = Z(o?.colorSpace || "hex");
            xe(() => {
              let h = e || "",
                d = nr(h);
              n(h), a(d), s(d?.colorSpace || "hex");
            }, [e]);
            let l = pt(() => fg(r, o, i).toLowerCase(), [r, o, i]),
              c = Ce(
                (h) => {
                  let d = nr(h),
                    y = d?.value || h || "";
                  n(y),
                    y === "" && (a(void 0), t(void 0)),
                    d && (a(d), s(d.colorSpace), t(d.value));
                },
                [t],
              ),
              p = Ce(() => {
                let h = En.indexOf(i) + 1;
                h >= En.length && (h = 0), s(En[h]);
                let d = o?.[En[h]] || "";
                n(d), t(d);
              }, [o, i, t]);
            return {
              value: r,
              realValue: l,
              updateValue: c,
              color: o,
              colorSpace: i,
              cycleColorSpace: p,
            };
          }),
          (Dn = (e) => e.replace(/\s*/, "").toLowerCase()),
          (yg = (e, t, r) => {
            let [n, o] = Z(t?.valid ? [t] : []);
            xe(() => {
              t === void 0 && o([]);
            }, [t]);
            let a = pt(
                () =>
                  (e || [])
                    .map((s) =>
                      typeof s == "string"
                        ? nr(s)
                        : s.title
                          ? { ...nr(s.color), keyword: s.title }
                          : nr(s.color),
                    )
                    .concat(n)
                    .filter(Boolean)
                    .slice(-27),
                [e, n],
              ),
              i = Ce(
                (s) => {
                  s?.valid &&
                    (a.some((l) => Dn(l[r]) === Dn(s[r])) ||
                      o((l) => l.concat(s)));
                },
                [r, a],
              );
            return { presets: a, addPreset: i };
          }),
          (Ic = ({
            name: e,
            value: t,
            onChange: r,
            onFocus: n,
            onBlur: o,
            presetColors: a,
            startOpen: i = !1,
            argType: s,
          }) => {
            let l = Ce(si(r, 200), [r]),
              {
                value: c,
                realValue: p,
                updateValue: h,
                color: d,
                colorSpace: y,
                cycleColorSpace: g,
              } = mg(t, l),
              { presets: A, addPreset: v } = yg(a, d, y),
              S = hg[y],
              w = !!s?.table?.readonly;
            return f.createElement(
              eg,
              { "aria-readonly": w },
              f.createElement(
                tg,
                {
                  startOpen: i,
                  trigger: w ? [null] : void 0,
                  closeOnOutsideClick: !0,
                  onVisibleChange: () => v(d),
                  tooltip: f.createElement(
                    rg,
                    null,
                    f.createElement(S, {
                      color: p === "transparent" ? "#000000" : p,
                      onChange: h,
                      onFocus: n,
                      onBlur: o,
                    }),
                    A.length > 0 &&
                      f.createElement(
                        og,
                        null,
                        A.map((x, C) =>
                          f.createElement(
                            ft,
                            {
                              key: `${x.value}-${C}`,
                              hasChrome: !1,
                              tooltip: f.createElement(ng, {
                                note: x.keyword || x.value,
                              }),
                            },
                            f.createElement(mc, {
                              value: x[y],
                              active: d && Dn(x[y]) === Dn(d[y]),
                              onClick: () => h(x.value),
                            }),
                          ),
                        ),
                      ),
                  ),
                },
                f.createElement(mc, { value: p, style: { margin: 4 } }),
              ),
              f.createElement(sg, {
                id: Le(e),
                value: c,
                onChange: (x) => h(x.target.value),
                onFocus: (x) => x.target.select(),
                readOnly: w,
                placeholder: "Choose color...",
              }),
              c ? f.createElement(lg, { onClick: g }) : null,
            );
          }),
          (gg = Ic);
      });
    q();
    V();
    J();
    q();
    V();
    J();
    q();
    V();
    J();
    $n();
    Mr();
    Mr();
    $r();
    q();
    V();
    J();
    q();
    V();
    J();
    var OA = __STORYBOOK_CORE_EVENTS__,
      {
        ARGTYPES_INFO_REQUEST: bi,
        ARGTYPES_INFO_RESPONSE: to,
        CHANNEL_CREATED: _A,
        CHANNEL_WS_DISCONNECT: BA,
        CONFIG_ERROR: Ei,
        CREATE_NEW_STORYFILE_REQUEST: PA,
        CREATE_NEW_STORYFILE_RESPONSE: NA,
        CURRENT_STORY_WAS_SET: ro,
        DOCS_PREPARED: vi,
        DOCS_RENDERED: qr,
        FILE_COMPONENT_SEARCH_REQUEST: jA,
        FILE_COMPONENT_SEARCH_RESPONSE: LA,
        FORCE_REMOUNT: Ai,
        FORCE_RE_RENDER: Vr,
        GLOBALS_UPDATED: Wt,
        NAVIGATE_URL: Di,
        PLAY_FUNCTION_THREW_EXCEPTION: Si,
        PRELOAD_ENTRIES: wi,
        PREVIEW_BUILDER_PROGRESS: MA,
        PREVIEW_KEYDOWN: Ci,
        REGISTER_SUBSCRIPTION: UA,
        REQUEST_WHATS_NEW_DATA: $A,
        RESET_STORY_ARGS: Jr,
        RESULT_WHATS_NEW_DATA: qA,
        SAVE_STORY_REQUEST: no,
        SAVE_STORY_RESPONSE: zr,
        SELECT_STORY: VA,
        SET_CONFIG: JA,
        SET_CURRENT_STORY: xi,
        SET_FILTER: zA,
        SET_GLOBALS: Ti,
        SET_INDEX: HA,
        SET_STORIES: GA,
        SET_WHATS_NEW_CACHE: WA,
        SHARED_STATE_CHANGED: KA,
        SHARED_STATE_SET: YA,
        STORIES_COLLAPSE_ALL: XA,
        STORIES_EXPAND_ALL: QA,
        STORY_ARGS_UPDATED: Fi,
        STORY_CHANGED: Ii,
        STORY_ERRORED: ki,
        STORY_FINISHED: oo,
        STORY_INDEX_INVALIDATED: Ri,
        STORY_MISSING: ao,
        STORY_PREPARED: Oi,
        STORY_RENDERED: br,
        STORY_RENDER_PHASE_CHANGED: Kt,
        STORY_SPECIFIED: _i,
        STORY_THREW_EXCEPTION: Bi,
        STORY_UNCHANGED: Pi,
        TELEMETRY_ERROR: ZA,
        TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: eD,
        TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: tD,
        TESTING_MODULE_CRASH_REPORT: rD,
        TESTING_MODULE_PROGRESS_REPORT: nD,
        TESTING_MODULE_RUN_ALL_REQUEST: oD,
        TESTING_MODULE_RUN_REQUEST: aD,
        TOGGLE_WHATS_NEW_NOTIFICATIONS: iD,
        UNHANDLED_ERRORS_WHILE_PLAYING: Ni,
        UPDATE_GLOBALS: Hr,
        UPDATE_QUERY_PARAMS: ji,
        UPDATE_STORY_ARGS: Gr,
      } = __STORYBOOK_CORE_EVENTS__;
    q();
    V();
    J();
    var yD = __STORYBOOK_API__,
      {
        ActiveTabs: gD,
        Consumer: bD,
        ManagerContext: ED,
        Provider: vD,
        RequestResponseError: AD,
        addons: Wr,
        combineParameters: DD,
        controlOrMetaKey: SD,
        controlOrMetaSymbol: wD,
        eventMatchesShortcut: CD,
        eventToShortcut: xD,
        experimental_MockUniversalStore: TD,
        experimental_UniversalStore: FD,
        experimental_requestResponse: io,
        experimental_useUniversalStore: ID,
        isMacLike: kD,
        isShortcutTaken: RD,
        keyToSymbol: OD,
        merge: _D,
        mockChannel: BD,
        optionOrAltSymbol: PD,
        shortcutMatchesShortcut: ND,
        shortcutToHumanString: jD,
        types: Li,
        useAddonState: LD,
        useArgTypes: so,
        useArgs: Mi,
        useChannel: MD,
        useGlobalTypes: UD,
        useGlobals: Ui,
        useParameter: $i,
        useSharedState: $D,
        useStoryPrepared: qD,
        useStorybookApi: VD,
        useStorybookState: qi,
      } = __STORYBOOK_API__;
    po();
    q();
    V();
    J();
    var Hi = Object.prototype.hasOwnProperty;
    function Gi(e, t, r) {
      for (r of e.keys()) if (Ft(r, t)) return r;
    }
    function Ft(e, t) {
      var r, n, o;
      if (e === t) return !0;
      if (e && t && (r = e.constructor) === t.constructor) {
        if (r === Date) return e.getTime() === t.getTime();
        if (r === RegExp) return e.toString() === t.toString();
        if (r === Array) {
          if ((n = e.length) === t.length) for (; n-- && Ft(e[n], t[n]); );
          return n === -1;
        }
        if (r === Set) {
          if (e.size !== t.size) return !1;
          for (n of e)
            if (
              ((o = n),
              (o && typeof o == "object" && ((o = Gi(t, o)), !o)) || !t.has(o))
            )
              return !1;
          return !0;
        }
        if (r === Map) {
          if (e.size !== t.size) return !1;
          for (n of e)
            if (
              ((o = n[0]),
              (o && typeof o == "object" && ((o = Gi(t, o)), !o)) ||
                !Ft(n[1], t.get(o)))
            )
              return !1;
          return !0;
        }
        if (r === ArrayBuffer) (e = new Uint8Array(e)), (t = new Uint8Array(t));
        else if (r === DataView) {
          if ((n = e.byteLength) === t.byteLength)
            for (; n-- && e.getInt8(n) === t.getInt8(n); );
          return n === -1;
        }
        if (ArrayBuffer.isView(e)) {
          if ((n = e.byteLength) === t.byteLength)
            for (; n-- && e[n] === t[n]; );
          return n === -1;
        }
        if (!r || typeof e == "object") {
          n = 0;
          for (r in e)
            if (
              (Hi.call(e, r) && ++n && !Hi.call(t, r)) ||
              !(r in t) ||
              !Ft(e[r], t[r])
            )
              return !1;
          return Object.keys(t).length === n;
        }
      }
      return e !== e && t !== t;
    }
    yo();
    q();
    V();
    J();
    var RT = __STORYBOOK_CLIENT_LOGGER__,
      {
        deprecate: OT,
        logger: Xr,
        once: ss,
        pretty: _T,
      } = __STORYBOOK_CLIENT_LOGGER__;
    q();
    V();
    J();
    q();
    V();
    J();
    q();
    V();
    J();
    q();
    V();
    J();
    var LT = __STORYBOOK_CHANNELS__,
      {
        Channel: Qr,
        HEARTBEAT_INTERVAL: MT,
        HEARTBEAT_MAX_LATENCY: UT,
        PostMessageTransport: $T,
        WebsocketTransport: qT,
        createBrowserChannel: VT,
      } = __STORYBOOK_CHANNELS__;
    q();
    V();
    J();
    var WT = __STORYBOOK_CLIENT_LOGGER__,
      {
        deprecate: nt,
        logger: ee,
        once: mt,
        pretty: KT,
      } = __STORYBOOK_CLIENT_LOGGER__;
    q();
    V();
    J();
    var Uh = Object.defineProperty,
      he = (e, t) => Uh(e, "name", { value: t, configurable: !0 });
    function fe(e) {
      for (var t = [], r = 1; r < arguments.length; r++)
        t[r - 1] = arguments[r];
      var n = Array.from(typeof e == "string" ? [e] : e);
      n[n.length - 1] = n[n.length - 1].replace(/\r?\n([\t ]*)$/, "");
      var o = n.reduce(function (s, l) {
        var c = l.match(/\n([\t ]+|(?!\s).)/g);
        return c
          ? s.concat(
              c.map(function (p) {
                var h, d;
                return (d =
                  (h = p.match(/[\t ]/g)) === null || h === void 0
                    ? void 0
                    : h.length) !== null && d !== void 0
                  ? d
                  : 0;
              }),
            )
          : s;
      }, []);
      if (o.length) {
        var a = new RegExp(
          `
[	 ]{` +
            Math.min.apply(Math, o) +
            "}",
          "g",
        );
        n = n.map(function (s) {
          return s.replace(
            a,
            `
`,
          );
        });
      }
      n[0] = n[0].replace(/^\r?\n/, "");
      var i = n[0];
      return (
        t.forEach(function (s, l) {
          var c = i.match(/(?:^|\n)( *)$/),
            p = c ? c[1] : "",
            h = s;
          typeof s == "string" &&
            s.includes(`
`) &&
            (h = String(s)
              .split(
                `
`,
              )
              .map(function (d, y) {
                return y === 0 ? d : "" + p + d;
              }).join(`
`)),
            (i += h + n[l + 1]);
        }),
        i
      );
    }
    he(fe, "dedent");
    function go({ code: e, category: t }) {
      let r = String(e).padStart(4, "0");
      return `SB_${t}_${r}`;
    }
    he(go, "parseErrorCode");
    var ls = class us extends Error {
      constructor(t) {
        super(us.getFullMessage(t)),
          (this.data = {}),
          (this.fromStorybook = !0),
          (this.category = t.category),
          (this.documentation = t.documentation ?? !1),
          (this.code = t.code);
      }
      get fullErrorCode() {
        return go({ code: this.code, category: this.category });
      }
      get name() {
        let t = this.constructor.name;
        return `${this.fullErrorCode} (${t})`;
      }
      static getFullMessage({
        documentation: t,
        code: r,
        category: n,
        message: o,
      }) {
        let a;
        return (
          t === !0
            ? (a = `https://storybook.js.org/error/${go({ code: r, category: n })}`)
            : typeof t == "string"
              ? (a = t)
              : Array.isArray(t) &&
                (a = `
${t.map((i) => `	- ${i}`).join(`
`)}`),
          `${o}${
            a != null
              ? `

More info: ${a}
`
              : ""
          }`
        );
      }
    };
    he(ls, "StorybookError");
    var Ae = ls,
      $h = ((e) => (
        (e.BLOCKS = "BLOCKS"),
        (e.DOCS_TOOLS = "DOCS-TOOLS"),
        (e.PREVIEW_CLIENT_LOGGER = "PREVIEW_CLIENT-LOGGER"),
        (e.PREVIEW_CHANNELS = "PREVIEW_CHANNELS"),
        (e.PREVIEW_CORE_EVENTS = "PREVIEW_CORE-EVENTS"),
        (e.PREVIEW_INSTRUMENTER = "PREVIEW_INSTRUMENTER"),
        (e.PREVIEW_API = "PREVIEW_API"),
        (e.PREVIEW_REACT_DOM_SHIM = "PREVIEW_REACT-DOM-SHIM"),
        (e.PREVIEW_ROUTER = "PREVIEW_ROUTER"),
        (e.PREVIEW_THEMING = "PREVIEW_THEMING"),
        (e.RENDERER_HTML = "RENDERER_HTML"),
        (e.RENDERER_PREACT = "RENDERER_PREACT"),
        (e.RENDERER_REACT = "RENDERER_REACT"),
        (e.RENDERER_SERVER = "RENDERER_SERVER"),
        (e.RENDERER_SVELTE = "RENDERER_SVELTE"),
        (e.RENDERER_VUE = "RENDERER_VUE"),
        (e.RENDERER_VUE3 = "RENDERER_VUE3"),
        (e.RENDERER_WEB_COMPONENTS = "RENDERER_WEB-COMPONENTS"),
        (e.FRAMEWORK_NEXTJS = "FRAMEWORK_NEXTJS"),
        (e.ADDON_VITEST = "ADDON_VITEST"),
        e
      ))($h || {}),
      cs = class extends Ae {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 1,
            message: fe`
        Couldn't find story matching id '${t.storyId}' after HMR.
        - Did you just rename a story?
        - Did you remove it from your CSF file?
        - Are you sure a story with the id '${t.storyId}' exists?
        - Please check the values in the stories field of your main.js config and see if they would match your CSF File.
        - Also check the browser console and terminal for potential error messages.`,
          }),
            (this.data = t);
        }
      };
    he(cs, "MissingStoryAfterHmrError");
    var ds = cs,
      qh = class extends Ae {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 2,
            documentation:
              "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function",
            message: fe`
        We detected that you use an implicit action arg while ${t.phase} of your story.  
        ${
          t.deprecated
            ? `
This is deprecated and won't work in Storybook 8 anymore.
`
            : ""
        }
        Please provide an explicit spy to your args like this:
          import { fn } from '@storybook/test';
          ... 
          args: {
           ${t.name}: fn()
          }`,
          }),
            (this.data = t);
        }
      };
    he(qh, "ImplicitActionsDuringRendering");
    var ps = class extends Ae {
      constructor() {
        super({
          category: "PREVIEW_API",
          code: 3,
          message: fe`
        Cannot call \`storyStore.extract()\` without calling \`storyStore.cacheAllCsfFiles()\` first.

        You probably meant to call \`await preview.extract()\` which does the above for you.`,
        });
      }
    };
    he(ps, "CalledExtractOnStoreError");
    var hs = ps,
      fs = class extends Ae {
        constructor() {
          super({
            category: "PREVIEW_API",
            code: 4,
            message: fe`
        Expected your framework's preset to export a \`renderToCanvas\` field.

        Perhaps it needs to be upgraded for Storybook 7.0?`,
            documentation:
              "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mainjs-framework-field",
          });
        }
      };
    he(fs, "MissingRenderToCanvasError");
    var ms = fs,
      ys = class extends Ae {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 5,
            message: fe`
        Called \`Preview.${t.methodName}()\` before initialization.
        
        The preview needs to load the story index before most methods can be called. If you want
        to call \`${t.methodName}\`, try \`await preview.initializationPromise;\` first.
        
        If you didn't call the above code, then likely it was called by an addon that needs to
        do the above.`,
          }),
            (this.data = t);
        }
      };
    he(ys, "CalledPreviewMethodBeforeInitializationError");
    var Me = ys,
      gs = class extends Ae {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 6,
            message: fe`
        Error fetching \`/index.json\`:
        
        ${t.text}

        If you are in development, this likely indicates a problem with your Storybook process,
        check the terminal for errors.

        If you are in a deployed Storybook, there may have been an issue deploying the full Storybook
        build.`,
          }),
            (this.data = t);
        }
      };
    he(gs, "StoryIndexFetchError");
    var bs = gs,
      Es = class extends Ae {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 7,
            message: fe`
        Tried to render docs entry ${t.storyId} but it is a MDX file that has no CSF
        references, or autodocs for a CSF file that some doesn't refer to itself.
        
        This likely is an internal error in Storybook's indexing, or you've attached the
        \`attached-mdx\` tag to an MDX file that is not attached.`,
          }),
            (this.data = t);
        }
      };
    he(Es, "MdxFileWithNoCsfReferencesError");
    var vs = Es,
      As = class extends Ae {
        constructor() {
          super({
            category: "PREVIEW_API",
            code: 8,
            message: fe`
        Couldn't find any stories in your Storybook.

        - Please check your stories field of your main.js config: does it match correctly?
        - Also check the browser console and terminal for error messages.`,
          });
        }
      };
    he(As, "EmptyIndexError");
    var Ds = As,
      Ss = class extends Ae {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 9,
            message: fe`
        Couldn't find story matching '${t.storySpecifier}'.

        - Are you sure a story with that id exists?
        - Please check your stories field of your main.js config.
        - Also check the browser console and terminal for error messages.`,
          }),
            (this.data = t);
        }
      };
    he(Ss, "NoStoryMatchError");
    var ws = Ss,
      Cs = class extends Ae {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 10,
            message: fe`
        Couldn't find story matching id '${t.storyId}' after importing a CSF file.

        The file was indexed as if the story was there, but then after importing the file in the browser
        we didn't find the story. Possible reasons:
        - You are using a custom story indexer that is misbehaving.
        - You have a custom file loader that is removing or renaming exports.

        Please check your browser console and terminal for errors that may explain the issue.`,
          }),
            (this.data = t);
        }
      };
    he(Cs, "MissingStoryFromCsfFileError");
    var xs = Cs,
      Ts = class extends Ae {
        constructor() {
          super({
            category: "PREVIEW_API",
            code: 11,
            message: fe`
        Cannot access the Story Store until the index is ready.

        It is not recommended to use methods directly on the Story Store anyway, in Storybook 9 we will
        remove access to the store entirely`,
          });
        }
      };
    he(Ts, "StoryStoreAccessedBeforeInitializationError");
    var Fs = Ts,
      Is = class extends Ae {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 12,
            message: fe`
      Incorrect use of mount in the play function.
      
      To use mount in the play function, you must satisfy the following two requirements: 
      
      1. You *must* destructure the mount property from the \`context\` (the argument passed to your play function). 
         This makes sure that Storybook does not start rendering the story before the play function begins.
      
      2. Your Storybook framework or builder must be configured to transpile to ES2017 or newer. 
         This is because destructuring statements and async/await usages are otherwise transpiled away, 
         which prevents Storybook from recognizing your usage of \`mount\`.
      
      Note that Angular is not supported. As async/await is transpiled to support the zone.js polyfill. 
      
      More info: https://storybook.js.org/docs/writing-tests/interaction-testing#run-code-before-the-component-gets-rendered
      
      Received the following play function:
      ${t.playFunction}`,
          }),
            (this.data = t);
        }
      };
    he(Is, "MountMustBeDestructuredError");
    var Zr = Is,
      ks = class extends Ae {
        constructor(t) {
          super({
            category: "PREVIEW_API",
            code: 14,
            message: fe`
        No render function available for storyId '${t.id}'
      `,
          }),
            (this.data = t);
        }
      };
    he(ks, "NoRenderFunctionError");
    var Rs = ks,
      Os = class extends Ae {
        constructor() {
          super({
            category: "PREVIEW_API",
            code: 15,
            message: fe`
        No component is mounted in your story.
        
        This usually occurs when you destructure mount in the play function, but forget to call it.
        
        For example:

        async play({ mount, canvasElement }) {
          // 👈 mount should be called: await mount(); 
          const canvas = within(canvasElement);
          const button = await canvas.findByRole('button');
          await userEvent.click(button);
        };

        Make sure to either remove it or call mount in your play function.
      `,
          });
        }
      };
    he(Os, "NoStoryMountedError");
    var _s = Os,
      Vh = class extends Ae {
        constructor() {
          super({
            category: "FRAMEWORK_NEXTJS",
            code: 1,
            documentation:
              "https://storybook.js.org/docs/get-started/nextjs#faq",
            message: fe`
      You are importing avif images, but you don't have sharp installed.

      You have to install sharp in order to use image optimization features in Next.js.
      `,
          });
        }
      };
    he(Vh, "NextJsSharpError");
    var Jh = class extends Ae {
      constructor(t) {
        super({
          category: "FRAMEWORK_NEXTJS",
          code: 2,
          message: fe`
        Tried to access router mocks from "${t.importType}" but they were not created yet. You might be running code in an unsupported environment.
      `,
        }),
          (this.data = t);
      }
    };
    he(Jh, "NextjsRouterMocksNotAvailable");
    var Bs = class extends Ae {
      constructor(t) {
        super({
          category: "DOCS-TOOLS",
          code: 1,
          documentation:
            "https://github.com/storybookjs/storybook/issues/26606",
          message: fe`
        There was a failure when generating detailed ArgTypes in ${t.language} for:
        ${JSON.stringify(t.type, null, 2)} 
        
        Storybook will fall back to use a generic type description instead.

        This type is either not supported or it is a bug in the docgen generation in Storybook.
        If you think this is a bug, please detail it as much as possible in the Github issue.
      `,
        }),
          (this.data = t);
      }
    };
    he(Bs, "UnknownArgTypesError");
    var en = Bs,
      zh = class extends Ae {
        constructor(t) {
          super({
            category: "ADDON_VITEST",
            code: 1,
            message: fe`
        Encountered an unsupported value "${t.value}" when setting the viewport ${t.dimension} dimension.
        
        The Storybook plugin only supports values in the following units:
        - px, vh, vw, em, rem and %.
        
        You can either change the viewport for this story to use one of the supported units or skip the test by adding '!test' to the story's tags per https://storybook.js.org/docs/writing-stories/tags
      `,
          }),
            (this.data = t);
        }
      };
    he(zh, "UnsupportedViewportDimensionError");
    var Hh = Object.create,
      Mo = Object.defineProperty,
      Gh = Object.getOwnPropertyDescriptor,
      Wh = Object.getOwnPropertyNames,
      Kh = Object.getPrototypeOf,
      Yh = Object.prototype.hasOwnProperty,
      b = (e, t) => Mo(e, "name", { value: t, configurable: !0 }),
      tn = ((e) =>
        typeof je < "u"
          ? je
          : typeof Proxy < "u"
            ? new Proxy(e, { get: (t, r) => (typeof je < "u" ? je : t)[r] })
            : e)(function (e) {
        if (typeof je < "u") return je.apply(this, arguments);
        throw Error('Dynamic require of "' + e + '" is not supported');
      }),
      Te = (e, t) => () => (
        t || e((t = { exports: {} }).exports, t), t.exports
      ),
      Xh = (e, t, r, n) => {
        if ((t && typeof t == "object") || typeof t == "function")
          for (let o of Wh(t))
            !Yh.call(e, o) &&
              o !== r &&
              Mo(e, o, {
                get: () => t[o],
                enumerable: !(n = Gh(t, o)) || n.enumerable,
              });
        return e;
      },
      tr = (e, t, r) => (
        (r = e != null ? Hh(Kh(e)) : {}),
        Xh(
          t || !e || !e.__esModule
            ? Mo(r, "default", { value: e, enumerable: !0 })
            : r,
          e,
        )
      ),
      Ys = Te((e, t) => {
        (function (r) {
          if (typeof e == "object" && typeof t < "u") t.exports = r();
          else if (typeof define == "function" && define.amd) define([], r);
          else {
            var n;
            typeof window < "u" || typeof window < "u"
              ? (n = window)
              : typeof self < "u"
                ? (n = self)
                : (n = this),
              (n.memoizerific = r());
          }
        })(function () {
          var r, n, o;
          return b(function a(i, s, l) {
            function c(d, y) {
              if (!s[d]) {
                if (!i[d]) {
                  var g = typeof tn == "function" && tn;
                  if (!y && g) return g(d, !0);
                  if (p) return p(d, !0);
                  var A = new Error("Cannot find module '" + d + "'");
                  throw ((A.code = "MODULE_NOT_FOUND"), A);
                }
                var v = (s[d] = { exports: {} });
                i[d][0].call(
                  v.exports,
                  function (S) {
                    var w = i[d][1][S];
                    return c(w || S);
                  },
                  v,
                  v.exports,
                  a,
                  i,
                  s,
                  l,
                );
              }
              return s[d].exports;
            }
            b(c, "s");
            for (
              var p = typeof tn == "function" && tn, h = 0;
              h < l.length;
              h++
            )
              c(l[h]);
            return c;
          }, "e")(
            {
              1: [
                function (a, i, s) {
                  i.exports = function (l) {
                    if (typeof Map != "function" || l) {
                      var c = a("./similar");
                      return new c();
                    } else return new Map();
                  };
                },
                { "./similar": 2 },
              ],
              2: [
                function (a, i, s) {
                  function l() {
                    return (
                      (this.list = []),
                      (this.lastItem = void 0),
                      (this.size = 0),
                      this
                    );
                  }
                  b(l, "Similar"),
                    (l.prototype.get = function (c) {
                      var p;
                      if (this.lastItem && this.isEqual(this.lastItem.key, c))
                        return this.lastItem.val;
                      if (((p = this.indexOf(c)), p >= 0))
                        return (this.lastItem = this.list[p]), this.list[p].val;
                    }),
                    (l.prototype.set = function (c, p) {
                      var h;
                      return this.lastItem && this.isEqual(this.lastItem.key, c)
                        ? ((this.lastItem.val = p), this)
                        : ((h = this.indexOf(c)),
                          h >= 0
                            ? ((this.lastItem = this.list[h]),
                              (this.list[h].val = p),
                              this)
                            : ((this.lastItem = { key: c, val: p }),
                              this.list.push(this.lastItem),
                              this.size++,
                              this));
                    }),
                    (l.prototype.delete = function (c) {
                      var p;
                      if (
                        (this.lastItem &&
                          this.isEqual(this.lastItem.key, c) &&
                          (this.lastItem = void 0),
                        (p = this.indexOf(c)),
                        p >= 0)
                      )
                        return this.size--, this.list.splice(p, 1)[0];
                    }),
                    (l.prototype.has = function (c) {
                      var p;
                      return this.lastItem && this.isEqual(this.lastItem.key, c)
                        ? !0
                        : ((p = this.indexOf(c)),
                          p >= 0 ? ((this.lastItem = this.list[p]), !0) : !1);
                    }),
                    (l.prototype.forEach = function (c, p) {
                      var h;
                      for (h = 0; h < this.size; h++)
                        c.call(
                          p || this,
                          this.list[h].val,
                          this.list[h].key,
                          this,
                        );
                    }),
                    (l.prototype.indexOf = function (c) {
                      var p;
                      for (p = 0; p < this.size; p++)
                        if (this.isEqual(this.list[p].key, c)) return p;
                      return -1;
                    }),
                    (l.prototype.isEqual = function (c, p) {
                      return c === p || (c !== c && p !== p);
                    }),
                    (i.exports = l);
                },
                {},
              ],
              3: [
                function (a, i, s) {
                  var l = a("map-or-similar");
                  i.exports = function (d) {
                    var y = new l(!1),
                      g = [];
                    return function (A) {
                      var v = b(function () {
                        var S = y,
                          w,
                          x,
                          C = arguments.length - 1,
                          k = Array(C + 1),
                          F = !0,
                          _;
                        if (
                          (v.numArgs || v.numArgs === 0) &&
                          v.numArgs !== C + 1
                        )
                          throw new Error(
                            "Memoizerific functions should always be called with the same number of arguments",
                          );
                        for (_ = 0; _ < C; _++) {
                          if (
                            ((k[_] = { cacheItem: S, arg: arguments[_] }),
                            S.has(arguments[_]))
                          ) {
                            S = S.get(arguments[_]);
                            continue;
                          }
                          (F = !1),
                            (w = new l(!1)),
                            S.set(arguments[_], w),
                            (S = w);
                        }
                        return (
                          F &&
                            (S.has(arguments[C])
                              ? (x = S.get(arguments[C]))
                              : (F = !1)),
                          F ||
                            ((x = A.apply(null, arguments)),
                            S.set(arguments[C], x)),
                          d > 0 &&
                            ((k[C] = { cacheItem: S, arg: arguments[C] }),
                            F ? c(g, k) : g.push(k),
                            g.length > d && p(g.shift())),
                          (v.wasMemoized = F),
                          (v.numArgs = C + 1),
                          x
                        );
                      }, "memoizerific");
                      return (
                        (v.limit = d),
                        (v.wasMemoized = !1),
                        (v.cache = y),
                        (v.lru = g),
                        v
                      );
                    };
                  };
                  function c(d, y) {
                    var g = d.length,
                      A = y.length,
                      v,
                      S,
                      w;
                    for (S = 0; S < g; S++) {
                      for (v = !0, w = 0; w < A; w++)
                        if (!h(d[S][w].arg, y[w].arg)) {
                          v = !1;
                          break;
                        }
                      if (v) break;
                    }
                    d.push(d.splice(S, 1)[0]);
                  }
                  b(c, "moveToMostRecentLru");
                  function p(d) {
                    var y = d.length,
                      g = d[y - 1],
                      A,
                      v;
                    for (
                      g.cacheItem.delete(g.arg), v = y - 2;
                      v >= 0 &&
                      ((g = d[v]), (A = g.cacheItem.get(g.arg)), !A || !A.size);
                      v--
                    )
                      g.cacheItem.delete(g.arg);
                  }
                  b(p, "removeCachedResult");
                  function h(d, y) {
                    return d === y || (d !== d && y !== y);
                  }
                  b(h, "isEqual");
                },
                { "map-or-similar": 1 },
              ],
            },
            {},
            [3],
          )(3);
        });
      }),
      Xs = Te((e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.encodeString = n);
        var t = Array.from(
            { length: 256 },
            (o, a) =>
              "%" + ((a < 16 ? "0" : "") + a.toString(16)).toUpperCase(),
          ),
          r = new Int8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1,
            1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0,
          ]);
        function n(o) {
          let a = o.length;
          if (a === 0) return "";
          let i = "",
            s = 0,
            l = 0;
          e: for (; l < a; l++) {
            let c = o.charCodeAt(l);
            for (; c < 128; ) {
              if (
                (r[c] !== 1 &&
                  (s < l && (i += o.slice(s, l)), (s = l + 1), (i += t[c])),
                ++l === a)
              )
                break e;
              c = o.charCodeAt(l);
            }
            if ((s < l && (i += o.slice(s, l)), c < 2048)) {
              (s = l + 1), (i += t[192 | (c >> 6)] + t[128 | (c & 63)]);
              continue;
            }
            if (c < 55296 || c >= 57344) {
              (s = l + 1),
                (i +=
                  t[224 | (c >> 12)] +
                  t[128 | ((c >> 6) & 63)] +
                  t[128 | (c & 63)]);
              continue;
            }
            if ((++l, l >= a)) throw new Error("URI malformed");
            let p = o.charCodeAt(l) & 1023;
            (s = l + 1),
              (c = 65536 + (((c & 1023) << 10) | p)),
              (i +=
                t[240 | (c >> 18)] +
                t[128 | ((c >> 12) & 63)] +
                t[128 | ((c >> 6) & 63)] +
                t[128 | (c & 63)]);
          }
          return s === 0 ? o : s < a ? i + o.slice(s) : i;
        }
        b(n, "encodeString");
      }),
      Uo = Te((e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.defaultOptions =
            e.defaultShouldSerializeObject =
            e.defaultValueSerializer =
              void 0);
        var t = Xs(),
          r = b((a) => {
            switch (typeof a) {
              case "string":
                return (0, t.encodeString)(a);
              case "bigint":
              case "boolean":
                return "" + a;
              case "number":
                if (Number.isFinite(a))
                  return a < 1e21 ? "" + a : (0, t.encodeString)("" + a);
                break;
            }
            return a instanceof Date
              ? (0, t.encodeString)(a.toISOString())
              : "";
          }, "defaultValueSerializer");
        e.defaultValueSerializer = r;
        var n = b((a) => a instanceof Date, "defaultShouldSerializeObject");
        e.defaultShouldSerializeObject = n;
        var o = b((a) => a, "identityFunc");
        e.defaultOptions = {
          nesting: !0,
          nestingSyntax: "dot",
          arrayRepeat: !1,
          arrayRepeatSyntax: "repeat",
          delimiter: 38,
          valueDeserializer: o,
          valueSerializer: e.defaultValueSerializer,
          keyDeserializer: o,
          shouldSerializeObject: e.defaultShouldSerializeObject,
        };
      }),
      Qs = Te((e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.getDeepObject = o),
          (e.stringifyObject = p);
        var t = Uo(),
          r = Xs();
        function n(h) {
          return h === "__proto__" || h === "constructor" || h === "prototype";
        }
        b(n, "isPrototypeKey");
        function o(h, d, y, g, A) {
          if (n(d)) return h;
          let v = h[d];
          return typeof v == "object" && v !== null
            ? v
            : !g &&
                (A ||
                  typeof y == "number" ||
                  (typeof y == "string" &&
                    y * 0 === 0 &&
                    y.indexOf(".") === -1))
              ? (h[d] = [])
              : (h[d] = {});
        }
        b(o, "getDeepObject");
        var a = 20,
          i = "[]",
          s = "[",
          l = "]",
          c = ".";
        function p(h, d, y = 0, g, A) {
          let {
              nestingSyntax: v = t.defaultOptions.nestingSyntax,
              arrayRepeat: S = t.defaultOptions.arrayRepeat,
              arrayRepeatSyntax: w = t.defaultOptions.arrayRepeatSyntax,
              nesting: x = t.defaultOptions.nesting,
              delimiter: C = t.defaultOptions.delimiter,
              valueSerializer: k = t.defaultOptions.valueSerializer,
              shouldSerializeObject: F = t.defaultOptions.shouldSerializeObject,
            } = d,
            _ = typeof C == "number" ? String.fromCharCode(C) : C,
            j = A === !0 && S,
            M = v === "dot" || (v === "js" && !A);
          if (y > a) return "";
          let P = "",
            W = !0,
            L = !1;
          for (let z in h) {
            let D = h[z],
              T;
            g
              ? ((T = g),
                j
                  ? w === "bracket" && (T += i)
                  : M
                    ? ((T += c), (T += z))
                    : ((T += s), (T += z), (T += l)))
              : (T = z),
              W || (P += _),
              typeof D == "object" && D !== null && !F(D)
                ? ((L = D.pop !== void 0),
                  (x || (S && L)) && (P += p(D, d, y + 1, T, L)))
                : ((P += (0, r.encodeString)(T)), (P += "="), (P += k(D, z))),
              W && (W = !1);
          }
          return P;
        }
        b(p, "stringifyObject");
      }),
      Qh = Te((e, t) => {
        "use strict";
        var r = 12,
          n = 0,
          o = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
            3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 7, 7, 7, 7,
            7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4, 4, 4, 4,
            4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 24,
            36, 48, 60, 72, 84, 96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 127, 63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7,
          ];
        function a(l) {
          var c = l.indexOf("%");
          if (c === -1) return l;
          for (
            var p = l.length, h = "", d = 0, y = 0, g = c, A = r;
            c > -1 && c < p;

          ) {
            var v = s(l[c + 1], 4),
              S = s(l[c + 2], 0),
              w = v | S,
              x = o[w];
            if (
              ((A = o[256 + A + x]), (y = (y << 6) | (w & o[364 + x])), A === r)
            )
              (h += l.slice(d, g)),
                (h +=
                  y <= 65535
                    ? String.fromCharCode(y)
                    : String.fromCharCode(
                        55232 + (y >> 10),
                        56320 + (y & 1023),
                      )),
                (y = 0),
                (d = c + 3),
                (c = g = l.indexOf("%", d));
            else {
              if (A === n) return null;
              if (((c += 3), c < p && l.charCodeAt(c) === 37)) continue;
              return null;
            }
          }
          return h + l.slice(d);
        }
        b(a, "decodeURIComponent");
        var i = {
          0: 0,
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          a: 10,
          A: 10,
          b: 11,
          B: 11,
          c: 12,
          C: 12,
          d: 13,
          D: 13,
          e: 14,
          E: 14,
          f: 15,
          F: 15,
        };
        function s(l, c) {
          var p = i[l];
          return p === void 0 ? 255 : p << c;
        }
        b(s, "hexCodeToInt"), (t.exports = a);
      }),
      Zh = Te((e) => {
        "use strict";
        var t =
          (e && e.__importDefault) ||
          function (h) {
            return h && h.__esModule ? h : { default: h };
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.numberValueDeserializer = e.numberKeyDeserializer = void 0),
          (e.parse = p);
        var r = Qs(),
          n = Uo(),
          o = t(Qh()),
          a = b((h) => {
            let d = Number(h);
            return Number.isNaN(d) ? h : d;
          }, "numberKeyDeserializer");
        e.numberKeyDeserializer = a;
        var i = b((h) => {
          let d = Number(h);
          return Number.isNaN(d) ? h : d;
        }, "numberValueDeserializer");
        e.numberValueDeserializer = i;
        var s = /\+/g,
          l = b(function () {}, "Empty");
        l.prototype = Object.create(null);
        function c(h, d, y, g, A) {
          let v = h.substring(d, y);
          return (
            g && (v = v.replace(s, " ")), A && (v = (0, o.default)(v) || v), v
          );
        }
        b(c, "computeKeySlice");
        function p(h, d) {
          let {
              valueDeserializer: y = n.defaultOptions.valueDeserializer,
              keyDeserializer: g = n.defaultOptions.keyDeserializer,
              arrayRepeatSyntax: A = n.defaultOptions.arrayRepeatSyntax,
              nesting: v = n.defaultOptions.nesting,
              arrayRepeat: S = n.defaultOptions.arrayRepeat,
              nestingSyntax: w = n.defaultOptions.nestingSyntax,
              delimiter: x = n.defaultOptions.delimiter,
            } = d ?? {},
            C = typeof x == "string" ? x.charCodeAt(0) : x,
            k = w === "js",
            F = new l();
          if (typeof h != "string") return F;
          let _ = h.length,
            j = "",
            M = -1,
            P = -1,
            W = -1,
            L = F,
            z,
            D = "",
            T = "",
            O = !1,
            U = !1,
            $ = !1,
            X = !1,
            se = !1,
            te = !1,
            Q = !1,
            re = 0,
            ve = -1,
            de = -1,
            Fe = -1;
          for (let le = 0; le < _ + 1; le++) {
            if (((re = le !== _ ? h.charCodeAt(le) : C), re === C)) {
              if (
                ((Q = P > M),
                Q || (P = le),
                W !== P - 1 &&
                  ((T = c(h, W + 1, ve > -1 ? ve : P, $, O)),
                  (D = g(T)),
                  z !== void 0 &&
                    (L = (0, r.getDeepObject)(L, z, D, k && se, k && te))),
                Q || D !== "")
              ) {
                Q &&
                  ((j = h.slice(P + 1, le)),
                  X && (j = j.replace(s, " ")),
                  U && (j = (0, o.default)(j) || j));
                let He = y(j, D);
                if (S) {
                  let Ue = L[D];
                  Ue === void 0
                    ? ve > -1
                      ? (L[D] = [He])
                      : (L[D] = He)
                    : Ue.pop
                      ? Ue.push(He)
                      : (L[D] = [Ue, He]);
                } else L[D] = He;
              }
              (j = ""),
                (M = le),
                (P = le),
                (O = !1),
                (U = !1),
                ($ = !1),
                (X = !1),
                (se = !1),
                (te = !1),
                (ve = -1),
                (W = le),
                (L = F),
                (z = void 0),
                (D = "");
            } else
              re === 93
                ? (S && A === "bracket" && Fe === 91 && (ve = de),
                  v &&
                    (w === "index" || k) &&
                    P <= M &&
                    (W !== de &&
                      ((T = c(h, W + 1, le, $, O)),
                      (D = g(T)),
                      z !== void 0 &&
                        (L = (0, r.getDeepObject)(L, z, D, void 0, k)),
                      (z = D),
                      ($ = !1),
                      (O = !1)),
                    (W = le),
                    (te = !0),
                    (se = !1)))
                : re === 46
                  ? v &&
                    (w === "dot" || k) &&
                    P <= M &&
                    (W !== de &&
                      ((T = c(h, W + 1, le, $, O)),
                      (D = g(T)),
                      z !== void 0 && (L = (0, r.getDeepObject)(L, z, D, k)),
                      (z = D),
                      ($ = !1),
                      (O = !1)),
                    (se = !0),
                    (te = !1),
                    (W = le))
                  : re === 91
                    ? v &&
                      (w === "index" || k) &&
                      P <= M &&
                      (W !== de &&
                        ((T = c(h, W + 1, le, $, O)),
                        (D = g(T)),
                        k &&
                          z !== void 0 &&
                          (L = (0, r.getDeepObject)(L, z, D, k)),
                        (z = D),
                        ($ = !1),
                        (O = !1),
                        (se = !1),
                        (te = !0)),
                      (W = le))
                    : re === 61
                      ? P <= M
                        ? (P = le)
                        : (U = !0)
                      : re === 43
                        ? P > M
                          ? (X = !0)
                          : ($ = !0)
                        : re === 37 && (P > M ? (U = !0) : (O = !0));
            (de = le), (Fe = re);
          }
          return F;
        }
        b(p, "parse");
      }),
      ef = Te((e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.stringify = r);
        var t = Qs();
        function r(n, o) {
          if (n === null || typeof n != "object") return "";
          let a = o ?? {};
          return (0, t.stringifyObject)(n, a);
        }
        b(r, "stringify");
      }),
      $o = Te((e) => {
        "use strict";
        var t =
            (e && e.__createBinding) ||
            (Object.create
              ? function (a, i, s, l) {
                  l === void 0 && (l = s);
                  var c = Object.getOwnPropertyDescriptor(i, s);
                  (!c ||
                    ("get" in c
                      ? !i.__esModule
                      : c.writable || c.configurable)) &&
                    (c = {
                      enumerable: !0,
                      get: b(function () {
                        return i[s];
                      }, "get"),
                    }),
                    Object.defineProperty(a, l, c);
                }
              : function (a, i, s, l) {
                  l === void 0 && (l = s), (a[l] = i[s]);
                }),
          r =
            (e && e.__exportStar) ||
            function (a, i) {
              for (var s in a)
                s !== "default" &&
                  !Object.prototype.hasOwnProperty.call(i, s) &&
                  t(i, a, s);
            };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.stringify = e.parse = void 0);
        var n = Zh();
        Object.defineProperty(e, "parse", {
          enumerable: !0,
          get: b(function () {
            return n.parse;
          }, "get"),
        });
        var o = ef();
        Object.defineProperty(e, "stringify", {
          enumerable: !0,
          get: b(function () {
            return o.stringify;
          }, "get"),
        }),
          r(Uo(), e);
      }),
      Zs = Te((e, t) => {
        t.exports = {
          Aacute: "\xC1",
          aacute: "\xE1",
          Abreve: "\u0102",
          abreve: "\u0103",
          ac: "\u223E",
          acd: "\u223F",
          acE: "\u223E\u0333",
          Acirc: "\xC2",
          acirc: "\xE2",
          acute: "\xB4",
          Acy: "\u0410",
          acy: "\u0430",
          AElig: "\xC6",
          aelig: "\xE6",
          af: "\u2061",
          Afr: "\u{1D504}",
          afr: "\u{1D51E}",
          Agrave: "\xC0",
          agrave: "\xE0",
          alefsym: "\u2135",
          aleph: "\u2135",
          Alpha: "\u0391",
          alpha: "\u03B1",
          Amacr: "\u0100",
          amacr: "\u0101",
          amalg: "\u2A3F",
          amp: "&",
          AMP: "&",
          andand: "\u2A55",
          And: "\u2A53",
          and: "\u2227",
          andd: "\u2A5C",
          andslope: "\u2A58",
          andv: "\u2A5A",
          ang: "\u2220",
          ange: "\u29A4",
          angle: "\u2220",
          angmsdaa: "\u29A8",
          angmsdab: "\u29A9",
          angmsdac: "\u29AA",
          angmsdad: "\u29AB",
          angmsdae: "\u29AC",
          angmsdaf: "\u29AD",
          angmsdag: "\u29AE",
          angmsdah: "\u29AF",
          angmsd: "\u2221",
          angrt: "\u221F",
          angrtvb: "\u22BE",
          angrtvbd: "\u299D",
          angsph: "\u2222",
          angst: "\xC5",
          angzarr: "\u237C",
          Aogon: "\u0104",
          aogon: "\u0105",
          Aopf: "\u{1D538}",
          aopf: "\u{1D552}",
          apacir: "\u2A6F",
          ap: "\u2248",
          apE: "\u2A70",
          ape: "\u224A",
          apid: "\u224B",
          apos: "'",
          ApplyFunction: "\u2061",
          approx: "\u2248",
          approxeq: "\u224A",
          Aring: "\xC5",
          aring: "\xE5",
          Ascr: "\u{1D49C}",
          ascr: "\u{1D4B6}",
          Assign: "\u2254",
          ast: "*",
          asymp: "\u2248",
          asympeq: "\u224D",
          Atilde: "\xC3",
          atilde: "\xE3",
          Auml: "\xC4",
          auml: "\xE4",
          awconint: "\u2233",
          awint: "\u2A11",
          backcong: "\u224C",
          backepsilon: "\u03F6",
          backprime: "\u2035",
          backsim: "\u223D",
          backsimeq: "\u22CD",
          Backslash: "\u2216",
          Barv: "\u2AE7",
          barvee: "\u22BD",
          barwed: "\u2305",
          Barwed: "\u2306",
          barwedge: "\u2305",
          bbrk: "\u23B5",
          bbrktbrk: "\u23B6",
          bcong: "\u224C",
          Bcy: "\u0411",
          bcy: "\u0431",
          bdquo: "\u201E",
          becaus: "\u2235",
          because: "\u2235",
          Because: "\u2235",
          bemptyv: "\u29B0",
          bepsi: "\u03F6",
          bernou: "\u212C",
          Bernoullis: "\u212C",
          Beta: "\u0392",
          beta: "\u03B2",
          beth: "\u2136",
          between: "\u226C",
          Bfr: "\u{1D505}",
          bfr: "\u{1D51F}",
          bigcap: "\u22C2",
          bigcirc: "\u25EF",
          bigcup: "\u22C3",
          bigodot: "\u2A00",
          bigoplus: "\u2A01",
          bigotimes: "\u2A02",
          bigsqcup: "\u2A06",
          bigstar: "\u2605",
          bigtriangledown: "\u25BD",
          bigtriangleup: "\u25B3",
          biguplus: "\u2A04",
          bigvee: "\u22C1",
          bigwedge: "\u22C0",
          bkarow: "\u290D",
          blacklozenge: "\u29EB",
          blacksquare: "\u25AA",
          blacktriangle: "\u25B4",
          blacktriangledown: "\u25BE",
          blacktriangleleft: "\u25C2",
          blacktriangleright: "\u25B8",
          blank: "\u2423",
          blk12: "\u2592",
          blk14: "\u2591",
          blk34: "\u2593",
          block: "\u2588",
          bne: "=\u20E5",
          bnequiv: "\u2261\u20E5",
          bNot: "\u2AED",
          bnot: "\u2310",
          Bopf: "\u{1D539}",
          bopf: "\u{1D553}",
          bot: "\u22A5",
          bottom: "\u22A5",
          bowtie: "\u22C8",
          boxbox: "\u29C9",
          boxdl: "\u2510",
          boxdL: "\u2555",
          boxDl: "\u2556",
          boxDL: "\u2557",
          boxdr: "\u250C",
          boxdR: "\u2552",
          boxDr: "\u2553",
          boxDR: "\u2554",
          boxh: "\u2500",
          boxH: "\u2550",
          boxhd: "\u252C",
          boxHd: "\u2564",
          boxhD: "\u2565",
          boxHD: "\u2566",
          boxhu: "\u2534",
          boxHu: "\u2567",
          boxhU: "\u2568",
          boxHU: "\u2569",
          boxminus: "\u229F",
          boxplus: "\u229E",
          boxtimes: "\u22A0",
          boxul: "\u2518",
          boxuL: "\u255B",
          boxUl: "\u255C",
          boxUL: "\u255D",
          boxur: "\u2514",
          boxuR: "\u2558",
          boxUr: "\u2559",
          boxUR: "\u255A",
          boxv: "\u2502",
          boxV: "\u2551",
          boxvh: "\u253C",
          boxvH: "\u256A",
          boxVh: "\u256B",
          boxVH: "\u256C",
          boxvl: "\u2524",
          boxvL: "\u2561",
          boxVl: "\u2562",
          boxVL: "\u2563",
          boxvr: "\u251C",
          boxvR: "\u255E",
          boxVr: "\u255F",
          boxVR: "\u2560",
          bprime: "\u2035",
          breve: "\u02D8",
          Breve: "\u02D8",
          brvbar: "\xA6",
          bscr: "\u{1D4B7}",
          Bscr: "\u212C",
          bsemi: "\u204F",
          bsim: "\u223D",
          bsime: "\u22CD",
          bsolb: "\u29C5",
          bsol: "\\",
          bsolhsub: "\u27C8",
          bull: "\u2022",
          bullet: "\u2022",
          bump: "\u224E",
          bumpE: "\u2AAE",
          bumpe: "\u224F",
          Bumpeq: "\u224E",
          bumpeq: "\u224F",
          Cacute: "\u0106",
          cacute: "\u0107",
          capand: "\u2A44",
          capbrcup: "\u2A49",
          capcap: "\u2A4B",
          cap: "\u2229",
          Cap: "\u22D2",
          capcup: "\u2A47",
          capdot: "\u2A40",
          CapitalDifferentialD: "\u2145",
          caps: "\u2229\uFE00",
          caret: "\u2041",
          caron: "\u02C7",
          Cayleys: "\u212D",
          ccaps: "\u2A4D",
          Ccaron: "\u010C",
          ccaron: "\u010D",
          Ccedil: "\xC7",
          ccedil: "\xE7",
          Ccirc: "\u0108",
          ccirc: "\u0109",
          Cconint: "\u2230",
          ccups: "\u2A4C",
          ccupssm: "\u2A50",
          Cdot: "\u010A",
          cdot: "\u010B",
          cedil: "\xB8",
          Cedilla: "\xB8",
          cemptyv: "\u29B2",
          cent: "\xA2",
          centerdot: "\xB7",
          CenterDot: "\xB7",
          cfr: "\u{1D520}",
          Cfr: "\u212D",
          CHcy: "\u0427",
          chcy: "\u0447",
          check: "\u2713",
          checkmark: "\u2713",
          Chi: "\u03A7",
          chi: "\u03C7",
          circ: "\u02C6",
          circeq: "\u2257",
          circlearrowleft: "\u21BA",
          circlearrowright: "\u21BB",
          circledast: "\u229B",
          circledcirc: "\u229A",
          circleddash: "\u229D",
          CircleDot: "\u2299",
          circledR: "\xAE",
          circledS: "\u24C8",
          CircleMinus: "\u2296",
          CirclePlus: "\u2295",
          CircleTimes: "\u2297",
          cir: "\u25CB",
          cirE: "\u29C3",
          cire: "\u2257",
          cirfnint: "\u2A10",
          cirmid: "\u2AEF",
          cirscir: "\u29C2",
          ClockwiseContourIntegral: "\u2232",
          CloseCurlyDoubleQuote: "\u201D",
          CloseCurlyQuote: "\u2019",
          clubs: "\u2663",
          clubsuit: "\u2663",
          colon: ":",
          Colon: "\u2237",
          Colone: "\u2A74",
          colone: "\u2254",
          coloneq: "\u2254",
          comma: ",",
          commat: "@",
          comp: "\u2201",
          compfn: "\u2218",
          complement: "\u2201",
          complexes: "\u2102",
          cong: "\u2245",
          congdot: "\u2A6D",
          Congruent: "\u2261",
          conint: "\u222E",
          Conint: "\u222F",
          ContourIntegral: "\u222E",
          copf: "\u{1D554}",
          Copf: "\u2102",
          coprod: "\u2210",
          Coproduct: "\u2210",
          copy: "\xA9",
          COPY: "\xA9",
          copysr: "\u2117",
          CounterClockwiseContourIntegral: "\u2233",
          crarr: "\u21B5",
          cross: "\u2717",
          Cross: "\u2A2F",
          Cscr: "\u{1D49E}",
          cscr: "\u{1D4B8}",
          csub: "\u2ACF",
          csube: "\u2AD1",
          csup: "\u2AD0",
          csupe: "\u2AD2",
          ctdot: "\u22EF",
          cudarrl: "\u2938",
          cudarrr: "\u2935",
          cuepr: "\u22DE",
          cuesc: "\u22DF",
          cularr: "\u21B6",
          cularrp: "\u293D",
          cupbrcap: "\u2A48",
          cupcap: "\u2A46",
          CupCap: "\u224D",
          cup: "\u222A",
          Cup: "\u22D3",
          cupcup: "\u2A4A",
          cupdot: "\u228D",
          cupor: "\u2A45",
          cups: "\u222A\uFE00",
          curarr: "\u21B7",
          curarrm: "\u293C",
          curlyeqprec: "\u22DE",
          curlyeqsucc: "\u22DF",
          curlyvee: "\u22CE",
          curlywedge: "\u22CF",
          curren: "\xA4",
          curvearrowleft: "\u21B6",
          curvearrowright: "\u21B7",
          cuvee: "\u22CE",
          cuwed: "\u22CF",
          cwconint: "\u2232",
          cwint: "\u2231",
          cylcty: "\u232D",
          dagger: "\u2020",
          Dagger: "\u2021",
          daleth: "\u2138",
          darr: "\u2193",
          Darr: "\u21A1",
          dArr: "\u21D3",
          dash: "\u2010",
          Dashv: "\u2AE4",
          dashv: "\u22A3",
          dbkarow: "\u290F",
          dblac: "\u02DD",
          Dcaron: "\u010E",
          dcaron: "\u010F",
          Dcy: "\u0414",
          dcy: "\u0434",
          ddagger: "\u2021",
          ddarr: "\u21CA",
          DD: "\u2145",
          dd: "\u2146",
          DDotrahd: "\u2911",
          ddotseq: "\u2A77",
          deg: "\xB0",
          Del: "\u2207",
          Delta: "\u0394",
          delta: "\u03B4",
          demptyv: "\u29B1",
          dfisht: "\u297F",
          Dfr: "\u{1D507}",
          dfr: "\u{1D521}",
          dHar: "\u2965",
          dharl: "\u21C3",
          dharr: "\u21C2",
          DiacriticalAcute: "\xB4",
          DiacriticalDot: "\u02D9",
          DiacriticalDoubleAcute: "\u02DD",
          DiacriticalGrave: "`",
          DiacriticalTilde: "\u02DC",
          diam: "\u22C4",
          diamond: "\u22C4",
          Diamond: "\u22C4",
          diamondsuit: "\u2666",
          diams: "\u2666",
          die: "\xA8",
          DifferentialD: "\u2146",
          digamma: "\u03DD",
          disin: "\u22F2",
          div: "\xF7",
          divide: "\xF7",
          divideontimes: "\u22C7",
          divonx: "\u22C7",
          DJcy: "\u0402",
          djcy: "\u0452",
          dlcorn: "\u231E",
          dlcrop: "\u230D",
          dollar: "$",
          Dopf: "\u{1D53B}",
          dopf: "\u{1D555}",
          Dot: "\xA8",
          dot: "\u02D9",
          DotDot: "\u20DC",
          doteq: "\u2250",
          doteqdot: "\u2251",
          DotEqual: "\u2250",
          dotminus: "\u2238",
          dotplus: "\u2214",
          dotsquare: "\u22A1",
          doublebarwedge: "\u2306",
          DoubleContourIntegral: "\u222F",
          DoubleDot: "\xA8",
          DoubleDownArrow: "\u21D3",
          DoubleLeftArrow: "\u21D0",
          DoubleLeftRightArrow: "\u21D4",
          DoubleLeftTee: "\u2AE4",
          DoubleLongLeftArrow: "\u27F8",
          DoubleLongLeftRightArrow: "\u27FA",
          DoubleLongRightArrow: "\u27F9",
          DoubleRightArrow: "\u21D2",
          DoubleRightTee: "\u22A8",
          DoubleUpArrow: "\u21D1",
          DoubleUpDownArrow: "\u21D5",
          DoubleVerticalBar: "\u2225",
          DownArrowBar: "\u2913",
          downarrow: "\u2193",
          DownArrow: "\u2193",
          Downarrow: "\u21D3",
          DownArrowUpArrow: "\u21F5",
          DownBreve: "\u0311",
          downdownarrows: "\u21CA",
          downharpoonleft: "\u21C3",
          downharpoonright: "\u21C2",
          DownLeftRightVector: "\u2950",
          DownLeftTeeVector: "\u295E",
          DownLeftVectorBar: "\u2956",
          DownLeftVector: "\u21BD",
          DownRightTeeVector: "\u295F",
          DownRightVectorBar: "\u2957",
          DownRightVector: "\u21C1",
          DownTeeArrow: "\u21A7",
          DownTee: "\u22A4",
          drbkarow: "\u2910",
          drcorn: "\u231F",
          drcrop: "\u230C",
          Dscr: "\u{1D49F}",
          dscr: "\u{1D4B9}",
          DScy: "\u0405",
          dscy: "\u0455",
          dsol: "\u29F6",
          Dstrok: "\u0110",
          dstrok: "\u0111",
          dtdot: "\u22F1",
          dtri: "\u25BF",
          dtrif: "\u25BE",
          duarr: "\u21F5",
          duhar: "\u296F",
          dwangle: "\u29A6",
          DZcy: "\u040F",
          dzcy: "\u045F",
          dzigrarr: "\u27FF",
          Eacute: "\xC9",
          eacute: "\xE9",
          easter: "\u2A6E",
          Ecaron: "\u011A",
          ecaron: "\u011B",
          Ecirc: "\xCA",
          ecirc: "\xEA",
          ecir: "\u2256",
          ecolon: "\u2255",
          Ecy: "\u042D",
          ecy: "\u044D",
          eDDot: "\u2A77",
          Edot: "\u0116",
          edot: "\u0117",
          eDot: "\u2251",
          ee: "\u2147",
          efDot: "\u2252",
          Efr: "\u{1D508}",
          efr: "\u{1D522}",
          eg: "\u2A9A",
          Egrave: "\xC8",
          egrave: "\xE8",
          egs: "\u2A96",
          egsdot: "\u2A98",
          el: "\u2A99",
          Element: "\u2208",
          elinters: "\u23E7",
          ell: "\u2113",
          els: "\u2A95",
          elsdot: "\u2A97",
          Emacr: "\u0112",
          emacr: "\u0113",
          empty: "\u2205",
          emptyset: "\u2205",
          EmptySmallSquare: "\u25FB",
          emptyv: "\u2205",
          EmptyVerySmallSquare: "\u25AB",
          emsp13: "\u2004",
          emsp14: "\u2005",
          emsp: "\u2003",
          ENG: "\u014A",
          eng: "\u014B",
          ensp: "\u2002",
          Eogon: "\u0118",
          eogon: "\u0119",
          Eopf: "\u{1D53C}",
          eopf: "\u{1D556}",
          epar: "\u22D5",
          eparsl: "\u29E3",
          eplus: "\u2A71",
          epsi: "\u03B5",
          Epsilon: "\u0395",
          epsilon: "\u03B5",
          epsiv: "\u03F5",
          eqcirc: "\u2256",
          eqcolon: "\u2255",
          eqsim: "\u2242",
          eqslantgtr: "\u2A96",
          eqslantless: "\u2A95",
          Equal: "\u2A75",
          equals: "=",
          EqualTilde: "\u2242",
          equest: "\u225F",
          Equilibrium: "\u21CC",
          equiv: "\u2261",
          equivDD: "\u2A78",
          eqvparsl: "\u29E5",
          erarr: "\u2971",
          erDot: "\u2253",
          escr: "\u212F",
          Escr: "\u2130",
          esdot: "\u2250",
          Esim: "\u2A73",
          esim: "\u2242",
          Eta: "\u0397",
          eta: "\u03B7",
          ETH: "\xD0",
          eth: "\xF0",
          Euml: "\xCB",
          euml: "\xEB",
          euro: "\u20AC",
          excl: "!",
          exist: "\u2203",
          Exists: "\u2203",
          expectation: "\u2130",
          exponentiale: "\u2147",
          ExponentialE: "\u2147",
          fallingdotseq: "\u2252",
          Fcy: "\u0424",
          fcy: "\u0444",
          female: "\u2640",
          ffilig: "\uFB03",
          fflig: "\uFB00",
          ffllig: "\uFB04",
          Ffr: "\u{1D509}",
          ffr: "\u{1D523}",
          filig: "\uFB01",
          FilledSmallSquare: "\u25FC",
          FilledVerySmallSquare: "\u25AA",
          fjlig: "fj",
          flat: "\u266D",
          fllig: "\uFB02",
          fltns: "\u25B1",
          fnof: "\u0192",
          Fopf: "\u{1D53D}",
          fopf: "\u{1D557}",
          forall: "\u2200",
          ForAll: "\u2200",
          fork: "\u22D4",
          forkv: "\u2AD9",
          Fouriertrf: "\u2131",
          fpartint: "\u2A0D",
          frac12: "\xBD",
          frac13: "\u2153",
          frac14: "\xBC",
          frac15: "\u2155",
          frac16: "\u2159",
          frac18: "\u215B",
          frac23: "\u2154",
          frac25: "\u2156",
          frac34: "\xBE",
          frac35: "\u2157",
          frac38: "\u215C",
          frac45: "\u2158",
          frac56: "\u215A",
          frac58: "\u215D",
          frac78: "\u215E",
          frasl: "\u2044",
          frown: "\u2322",
          fscr: "\u{1D4BB}",
          Fscr: "\u2131",
          gacute: "\u01F5",
          Gamma: "\u0393",
          gamma: "\u03B3",
          Gammad: "\u03DC",
          gammad: "\u03DD",
          gap: "\u2A86",
          Gbreve: "\u011E",
          gbreve: "\u011F",
          Gcedil: "\u0122",
          Gcirc: "\u011C",
          gcirc: "\u011D",
          Gcy: "\u0413",
          gcy: "\u0433",
          Gdot: "\u0120",
          gdot: "\u0121",
          ge: "\u2265",
          gE: "\u2267",
          gEl: "\u2A8C",
          gel: "\u22DB",
          geq: "\u2265",
          geqq: "\u2267",
          geqslant: "\u2A7E",
          gescc: "\u2AA9",
          ges: "\u2A7E",
          gesdot: "\u2A80",
          gesdoto: "\u2A82",
          gesdotol: "\u2A84",
          gesl: "\u22DB\uFE00",
          gesles: "\u2A94",
          Gfr: "\u{1D50A}",
          gfr: "\u{1D524}",
          gg: "\u226B",
          Gg: "\u22D9",
          ggg: "\u22D9",
          gimel: "\u2137",
          GJcy: "\u0403",
          gjcy: "\u0453",
          gla: "\u2AA5",
          gl: "\u2277",
          glE: "\u2A92",
          glj: "\u2AA4",
          gnap: "\u2A8A",
          gnapprox: "\u2A8A",
          gne: "\u2A88",
          gnE: "\u2269",
          gneq: "\u2A88",
          gneqq: "\u2269",
          gnsim: "\u22E7",
          Gopf: "\u{1D53E}",
          gopf: "\u{1D558}",
          grave: "`",
          GreaterEqual: "\u2265",
          GreaterEqualLess: "\u22DB",
          GreaterFullEqual: "\u2267",
          GreaterGreater: "\u2AA2",
          GreaterLess: "\u2277",
          GreaterSlantEqual: "\u2A7E",
          GreaterTilde: "\u2273",
          Gscr: "\u{1D4A2}",
          gscr: "\u210A",
          gsim: "\u2273",
          gsime: "\u2A8E",
          gsiml: "\u2A90",
          gtcc: "\u2AA7",
          gtcir: "\u2A7A",
          gt: ">",
          GT: ">",
          Gt: "\u226B",
          gtdot: "\u22D7",
          gtlPar: "\u2995",
          gtquest: "\u2A7C",
          gtrapprox: "\u2A86",
          gtrarr: "\u2978",
          gtrdot: "\u22D7",
          gtreqless: "\u22DB",
          gtreqqless: "\u2A8C",
          gtrless: "\u2277",
          gtrsim: "\u2273",
          gvertneqq: "\u2269\uFE00",
          gvnE: "\u2269\uFE00",
          Hacek: "\u02C7",
          hairsp: "\u200A",
          half: "\xBD",
          hamilt: "\u210B",
          HARDcy: "\u042A",
          hardcy: "\u044A",
          harrcir: "\u2948",
          harr: "\u2194",
          hArr: "\u21D4",
          harrw: "\u21AD",
          Hat: "^",
          hbar: "\u210F",
          Hcirc: "\u0124",
          hcirc: "\u0125",
          hearts: "\u2665",
          heartsuit: "\u2665",
          hellip: "\u2026",
          hercon: "\u22B9",
          hfr: "\u{1D525}",
          Hfr: "\u210C",
          HilbertSpace: "\u210B",
          hksearow: "\u2925",
          hkswarow: "\u2926",
          hoarr: "\u21FF",
          homtht: "\u223B",
          hookleftarrow: "\u21A9",
          hookrightarrow: "\u21AA",
          hopf: "\u{1D559}",
          Hopf: "\u210D",
          horbar: "\u2015",
          HorizontalLine: "\u2500",
          hscr: "\u{1D4BD}",
          Hscr: "\u210B",
          hslash: "\u210F",
          Hstrok: "\u0126",
          hstrok: "\u0127",
          HumpDownHump: "\u224E",
          HumpEqual: "\u224F",
          hybull: "\u2043",
          hyphen: "\u2010",
          Iacute: "\xCD",
          iacute: "\xED",
          ic: "\u2063",
          Icirc: "\xCE",
          icirc: "\xEE",
          Icy: "\u0418",
          icy: "\u0438",
          Idot: "\u0130",
          IEcy: "\u0415",
          iecy: "\u0435",
          iexcl: "\xA1",
          iff: "\u21D4",
          ifr: "\u{1D526}",
          Ifr: "\u2111",
          Igrave: "\xCC",
          igrave: "\xEC",
          ii: "\u2148",
          iiiint: "\u2A0C",
          iiint: "\u222D",
          iinfin: "\u29DC",
          iiota: "\u2129",
          IJlig: "\u0132",
          ijlig: "\u0133",
          Imacr: "\u012A",
          imacr: "\u012B",
          image: "\u2111",
          ImaginaryI: "\u2148",
          imagline: "\u2110",
          imagpart: "\u2111",
          imath: "\u0131",
          Im: "\u2111",
          imof: "\u22B7",
          imped: "\u01B5",
          Implies: "\u21D2",
          incare: "\u2105",
          in: "\u2208",
          infin: "\u221E",
          infintie: "\u29DD",
          inodot: "\u0131",
          intcal: "\u22BA",
          int: "\u222B",
          Int: "\u222C",
          integers: "\u2124",
          Integral: "\u222B",
          intercal: "\u22BA",
          Intersection: "\u22C2",
          intlarhk: "\u2A17",
          intprod: "\u2A3C",
          InvisibleComma: "\u2063",
          InvisibleTimes: "\u2062",
          IOcy: "\u0401",
          iocy: "\u0451",
          Iogon: "\u012E",
          iogon: "\u012F",
          Iopf: "\u{1D540}",
          iopf: "\u{1D55A}",
          Iota: "\u0399",
          iota: "\u03B9",
          iprod: "\u2A3C",
          iquest: "\xBF",
          iscr: "\u{1D4BE}",
          Iscr: "\u2110",
          isin: "\u2208",
          isindot: "\u22F5",
          isinE: "\u22F9",
          isins: "\u22F4",
          isinsv: "\u22F3",
          isinv: "\u2208",
          it: "\u2062",
          Itilde: "\u0128",
          itilde: "\u0129",
          Iukcy: "\u0406",
          iukcy: "\u0456",
          Iuml: "\xCF",
          iuml: "\xEF",
          Jcirc: "\u0134",
          jcirc: "\u0135",
          Jcy: "\u0419",
          jcy: "\u0439",
          Jfr: "\u{1D50D}",
          jfr: "\u{1D527}",
          jmath: "\u0237",
          Jopf: "\u{1D541}",
          jopf: "\u{1D55B}",
          Jscr: "\u{1D4A5}",
          jscr: "\u{1D4BF}",
          Jsercy: "\u0408",
          jsercy: "\u0458",
          Jukcy: "\u0404",
          jukcy: "\u0454",
          Kappa: "\u039A",
          kappa: "\u03BA",
          kappav: "\u03F0",
          Kcedil: "\u0136",
          kcedil: "\u0137",
          Kcy: "\u041A",
          kcy: "\u043A",
          Kfr: "\u{1D50E}",
          kfr: "\u{1D528}",
          kgreen: "\u0138",
          KHcy: "\u0425",
          khcy: "\u0445",
          KJcy: "\u040C",
          kjcy: "\u045C",
          Kopf: "\u{1D542}",
          kopf: "\u{1D55C}",
          Kscr: "\u{1D4A6}",
          kscr: "\u{1D4C0}",
          lAarr: "\u21DA",
          Lacute: "\u0139",
          lacute: "\u013A",
          laemptyv: "\u29B4",
          lagran: "\u2112",
          Lambda: "\u039B",
          lambda: "\u03BB",
          lang: "\u27E8",
          Lang: "\u27EA",
          langd: "\u2991",
          langle: "\u27E8",
          lap: "\u2A85",
          Laplacetrf: "\u2112",
          laquo: "\xAB",
          larrb: "\u21E4",
          larrbfs: "\u291F",
          larr: "\u2190",
          Larr: "\u219E",
          lArr: "\u21D0",
          larrfs: "\u291D",
          larrhk: "\u21A9",
          larrlp: "\u21AB",
          larrpl: "\u2939",
          larrsim: "\u2973",
          larrtl: "\u21A2",
          latail: "\u2919",
          lAtail: "\u291B",
          lat: "\u2AAB",
          late: "\u2AAD",
          lates: "\u2AAD\uFE00",
          lbarr: "\u290C",
          lBarr: "\u290E",
          lbbrk: "\u2772",
          lbrace: "{",
          lbrack: "[",
          lbrke: "\u298B",
          lbrksld: "\u298F",
          lbrkslu: "\u298D",
          Lcaron: "\u013D",
          lcaron: "\u013E",
          Lcedil: "\u013B",
          lcedil: "\u013C",
          lceil: "\u2308",
          lcub: "{",
          Lcy: "\u041B",
          lcy: "\u043B",
          ldca: "\u2936",
          ldquo: "\u201C",
          ldquor: "\u201E",
          ldrdhar: "\u2967",
          ldrushar: "\u294B",
          ldsh: "\u21B2",
          le: "\u2264",
          lE: "\u2266",
          LeftAngleBracket: "\u27E8",
          LeftArrowBar: "\u21E4",
          leftarrow: "\u2190",
          LeftArrow: "\u2190",
          Leftarrow: "\u21D0",
          LeftArrowRightArrow: "\u21C6",
          leftarrowtail: "\u21A2",
          LeftCeiling: "\u2308",
          LeftDoubleBracket: "\u27E6",
          LeftDownTeeVector: "\u2961",
          LeftDownVectorBar: "\u2959",
          LeftDownVector: "\u21C3",
          LeftFloor: "\u230A",
          leftharpoondown: "\u21BD",
          leftharpoonup: "\u21BC",
          leftleftarrows: "\u21C7",
          leftrightarrow: "\u2194",
          LeftRightArrow: "\u2194",
          Leftrightarrow: "\u21D4",
          leftrightarrows: "\u21C6",
          leftrightharpoons: "\u21CB",
          leftrightsquigarrow: "\u21AD",
          LeftRightVector: "\u294E",
          LeftTeeArrow: "\u21A4",
          LeftTee: "\u22A3",
          LeftTeeVector: "\u295A",
          leftthreetimes: "\u22CB",
          LeftTriangleBar: "\u29CF",
          LeftTriangle: "\u22B2",
          LeftTriangleEqual: "\u22B4",
          LeftUpDownVector: "\u2951",
          LeftUpTeeVector: "\u2960",
          LeftUpVectorBar: "\u2958",
          LeftUpVector: "\u21BF",
          LeftVectorBar: "\u2952",
          LeftVector: "\u21BC",
          lEg: "\u2A8B",
          leg: "\u22DA",
          leq: "\u2264",
          leqq: "\u2266",
          leqslant: "\u2A7D",
          lescc: "\u2AA8",
          les: "\u2A7D",
          lesdot: "\u2A7F",
          lesdoto: "\u2A81",
          lesdotor: "\u2A83",
          lesg: "\u22DA\uFE00",
          lesges: "\u2A93",
          lessapprox: "\u2A85",
          lessdot: "\u22D6",
          lesseqgtr: "\u22DA",
          lesseqqgtr: "\u2A8B",
          LessEqualGreater: "\u22DA",
          LessFullEqual: "\u2266",
          LessGreater: "\u2276",
          lessgtr: "\u2276",
          LessLess: "\u2AA1",
          lesssim: "\u2272",
          LessSlantEqual: "\u2A7D",
          LessTilde: "\u2272",
          lfisht: "\u297C",
          lfloor: "\u230A",
          Lfr: "\u{1D50F}",
          lfr: "\u{1D529}",
          lg: "\u2276",
          lgE: "\u2A91",
          lHar: "\u2962",
          lhard: "\u21BD",
          lharu: "\u21BC",
          lharul: "\u296A",
          lhblk: "\u2584",
          LJcy: "\u0409",
          ljcy: "\u0459",
          llarr: "\u21C7",
          ll: "\u226A",
          Ll: "\u22D8",
          llcorner: "\u231E",
          Lleftarrow: "\u21DA",
          llhard: "\u296B",
          lltri: "\u25FA",
          Lmidot: "\u013F",
          lmidot: "\u0140",
          lmoustache: "\u23B0",
          lmoust: "\u23B0",
          lnap: "\u2A89",
          lnapprox: "\u2A89",
          lne: "\u2A87",
          lnE: "\u2268",
          lneq: "\u2A87",
          lneqq: "\u2268",
          lnsim: "\u22E6",
          loang: "\u27EC",
          loarr: "\u21FD",
          lobrk: "\u27E6",
          longleftarrow: "\u27F5",
          LongLeftArrow: "\u27F5",
          Longleftarrow: "\u27F8",
          longleftrightarrow: "\u27F7",
          LongLeftRightArrow: "\u27F7",
          Longleftrightarrow: "\u27FA",
          longmapsto: "\u27FC",
          longrightarrow: "\u27F6",
          LongRightArrow: "\u27F6",
          Longrightarrow: "\u27F9",
          looparrowleft: "\u21AB",
          looparrowright: "\u21AC",
          lopar: "\u2985",
          Lopf: "\u{1D543}",
          lopf: "\u{1D55D}",
          loplus: "\u2A2D",
          lotimes: "\u2A34",
          lowast: "\u2217",
          lowbar: "_",
          LowerLeftArrow: "\u2199",
          LowerRightArrow: "\u2198",
          loz: "\u25CA",
          lozenge: "\u25CA",
          lozf: "\u29EB",
          lpar: "(",
          lparlt: "\u2993",
          lrarr: "\u21C6",
          lrcorner: "\u231F",
          lrhar: "\u21CB",
          lrhard: "\u296D",
          lrm: "\u200E",
          lrtri: "\u22BF",
          lsaquo: "\u2039",
          lscr: "\u{1D4C1}",
          Lscr: "\u2112",
          lsh: "\u21B0",
          Lsh: "\u21B0",
          lsim: "\u2272",
          lsime: "\u2A8D",
          lsimg: "\u2A8F",
          lsqb: "[",
          lsquo: "\u2018",
          lsquor: "\u201A",
          Lstrok: "\u0141",
          lstrok: "\u0142",
          ltcc: "\u2AA6",
          ltcir: "\u2A79",
          lt: "<",
          LT: "<",
          Lt: "\u226A",
          ltdot: "\u22D6",
          lthree: "\u22CB",
          ltimes: "\u22C9",
          ltlarr: "\u2976",
          ltquest: "\u2A7B",
          ltri: "\u25C3",
          ltrie: "\u22B4",
          ltrif: "\u25C2",
          ltrPar: "\u2996",
          lurdshar: "\u294A",
          luruhar: "\u2966",
          lvertneqq: "\u2268\uFE00",
          lvnE: "\u2268\uFE00",
          macr: "\xAF",
          male: "\u2642",
          malt: "\u2720",
          maltese: "\u2720",
          Map: "\u2905",
          map: "\u21A6",
          mapsto: "\u21A6",
          mapstodown: "\u21A7",
          mapstoleft: "\u21A4",
          mapstoup: "\u21A5",
          marker: "\u25AE",
          mcomma: "\u2A29",
          Mcy: "\u041C",
          mcy: "\u043C",
          mdash: "\u2014",
          mDDot: "\u223A",
          measuredangle: "\u2221",
          MediumSpace: "\u205F",
          Mellintrf: "\u2133",
          Mfr: "\u{1D510}",
          mfr: "\u{1D52A}",
          mho: "\u2127",
          micro: "\xB5",
          midast: "*",
          midcir: "\u2AF0",
          mid: "\u2223",
          middot: "\xB7",
          minusb: "\u229F",
          minus: "\u2212",
          minusd: "\u2238",
          minusdu: "\u2A2A",
          MinusPlus: "\u2213",
          mlcp: "\u2ADB",
          mldr: "\u2026",
          mnplus: "\u2213",
          models: "\u22A7",
          Mopf: "\u{1D544}",
          mopf: "\u{1D55E}",
          mp: "\u2213",
          mscr: "\u{1D4C2}",
          Mscr: "\u2133",
          mstpos: "\u223E",
          Mu: "\u039C",
          mu: "\u03BC",
          multimap: "\u22B8",
          mumap: "\u22B8",
          nabla: "\u2207",
          Nacute: "\u0143",
          nacute: "\u0144",
          nang: "\u2220\u20D2",
          nap: "\u2249",
          napE: "\u2A70\u0338",
          napid: "\u224B\u0338",
          napos: "\u0149",
          napprox: "\u2249",
          natural: "\u266E",
          naturals: "\u2115",
          natur: "\u266E",
          nbsp: "\xA0",
          nbump: "\u224E\u0338",
          nbumpe: "\u224F\u0338",
          ncap: "\u2A43",
          Ncaron: "\u0147",
          ncaron: "\u0148",
          Ncedil: "\u0145",
          ncedil: "\u0146",
          ncong: "\u2247",
          ncongdot: "\u2A6D\u0338",
          ncup: "\u2A42",
          Ncy: "\u041D",
          ncy: "\u043D",
          ndash: "\u2013",
          nearhk: "\u2924",
          nearr: "\u2197",
          neArr: "\u21D7",
          nearrow: "\u2197",
          ne: "\u2260",
          nedot: "\u2250\u0338",
          NegativeMediumSpace: "\u200B",
          NegativeThickSpace: "\u200B",
          NegativeThinSpace: "\u200B",
          NegativeVeryThinSpace: "\u200B",
          nequiv: "\u2262",
          nesear: "\u2928",
          nesim: "\u2242\u0338",
          NestedGreaterGreater: "\u226B",
          NestedLessLess: "\u226A",
          NewLine: `
`,
          nexist: "\u2204",
          nexists: "\u2204",
          Nfr: "\u{1D511}",
          nfr: "\u{1D52B}",
          ngE: "\u2267\u0338",
          nge: "\u2271",
          ngeq: "\u2271",
          ngeqq: "\u2267\u0338",
          ngeqslant: "\u2A7E\u0338",
          nges: "\u2A7E\u0338",
          nGg: "\u22D9\u0338",
          ngsim: "\u2275",
          nGt: "\u226B\u20D2",
          ngt: "\u226F",
          ngtr: "\u226F",
          nGtv: "\u226B\u0338",
          nharr: "\u21AE",
          nhArr: "\u21CE",
          nhpar: "\u2AF2",
          ni: "\u220B",
          nis: "\u22FC",
          nisd: "\u22FA",
          niv: "\u220B",
          NJcy: "\u040A",
          njcy: "\u045A",
          nlarr: "\u219A",
          nlArr: "\u21CD",
          nldr: "\u2025",
          nlE: "\u2266\u0338",
          nle: "\u2270",
          nleftarrow: "\u219A",
          nLeftarrow: "\u21CD",
          nleftrightarrow: "\u21AE",
          nLeftrightarrow: "\u21CE",
          nleq: "\u2270",
          nleqq: "\u2266\u0338",
          nleqslant: "\u2A7D\u0338",
          nles: "\u2A7D\u0338",
          nless: "\u226E",
          nLl: "\u22D8\u0338",
          nlsim: "\u2274",
          nLt: "\u226A\u20D2",
          nlt: "\u226E",
          nltri: "\u22EA",
          nltrie: "\u22EC",
          nLtv: "\u226A\u0338",
          nmid: "\u2224",
          NoBreak: "\u2060",
          NonBreakingSpace: "\xA0",
          nopf: "\u{1D55F}",
          Nopf: "\u2115",
          Not: "\u2AEC",
          not: "\xAC",
          NotCongruent: "\u2262",
          NotCupCap: "\u226D",
          NotDoubleVerticalBar: "\u2226",
          NotElement: "\u2209",
          NotEqual: "\u2260",
          NotEqualTilde: "\u2242\u0338",
          NotExists: "\u2204",
          NotGreater: "\u226F",
          NotGreaterEqual: "\u2271",
          NotGreaterFullEqual: "\u2267\u0338",
          NotGreaterGreater: "\u226B\u0338",
          NotGreaterLess: "\u2279",
          NotGreaterSlantEqual: "\u2A7E\u0338",
          NotGreaterTilde: "\u2275",
          NotHumpDownHump: "\u224E\u0338",
          NotHumpEqual: "\u224F\u0338",
          notin: "\u2209",
          notindot: "\u22F5\u0338",
          notinE: "\u22F9\u0338",
          notinva: "\u2209",
          notinvb: "\u22F7",
          notinvc: "\u22F6",
          NotLeftTriangleBar: "\u29CF\u0338",
          NotLeftTriangle: "\u22EA",
          NotLeftTriangleEqual: "\u22EC",
          NotLess: "\u226E",
          NotLessEqual: "\u2270",
          NotLessGreater: "\u2278",
          NotLessLess: "\u226A\u0338",
          NotLessSlantEqual: "\u2A7D\u0338",
          NotLessTilde: "\u2274",
          NotNestedGreaterGreater: "\u2AA2\u0338",
          NotNestedLessLess: "\u2AA1\u0338",
          notni: "\u220C",
          notniva: "\u220C",
          notnivb: "\u22FE",
          notnivc: "\u22FD",
          NotPrecedes: "\u2280",
          NotPrecedesEqual: "\u2AAF\u0338",
          NotPrecedesSlantEqual: "\u22E0",
          NotReverseElement: "\u220C",
          NotRightTriangleBar: "\u29D0\u0338",
          NotRightTriangle: "\u22EB",
          NotRightTriangleEqual: "\u22ED",
          NotSquareSubset: "\u228F\u0338",
          NotSquareSubsetEqual: "\u22E2",
          NotSquareSuperset: "\u2290\u0338",
          NotSquareSupersetEqual: "\u22E3",
          NotSubset: "\u2282\u20D2",
          NotSubsetEqual: "\u2288",
          NotSucceeds: "\u2281",
          NotSucceedsEqual: "\u2AB0\u0338",
          NotSucceedsSlantEqual: "\u22E1",
          NotSucceedsTilde: "\u227F\u0338",
          NotSuperset: "\u2283\u20D2",
          NotSupersetEqual: "\u2289",
          NotTilde: "\u2241",
          NotTildeEqual: "\u2244",
          NotTildeFullEqual: "\u2247",
          NotTildeTilde: "\u2249",
          NotVerticalBar: "\u2224",
          nparallel: "\u2226",
          npar: "\u2226",
          nparsl: "\u2AFD\u20E5",
          npart: "\u2202\u0338",
          npolint: "\u2A14",
          npr: "\u2280",
          nprcue: "\u22E0",
          nprec: "\u2280",
          npreceq: "\u2AAF\u0338",
          npre: "\u2AAF\u0338",
          nrarrc: "\u2933\u0338",
          nrarr: "\u219B",
          nrArr: "\u21CF",
          nrarrw: "\u219D\u0338",
          nrightarrow: "\u219B",
          nRightarrow: "\u21CF",
          nrtri: "\u22EB",
          nrtrie: "\u22ED",
          nsc: "\u2281",
          nsccue: "\u22E1",
          nsce: "\u2AB0\u0338",
          Nscr: "\u{1D4A9}",
          nscr: "\u{1D4C3}",
          nshortmid: "\u2224",
          nshortparallel: "\u2226",
          nsim: "\u2241",
          nsime: "\u2244",
          nsimeq: "\u2244",
          nsmid: "\u2224",
          nspar: "\u2226",
          nsqsube: "\u22E2",
          nsqsupe: "\u22E3",
          nsub: "\u2284",
          nsubE: "\u2AC5\u0338",
          nsube: "\u2288",
          nsubset: "\u2282\u20D2",
          nsubseteq: "\u2288",
          nsubseteqq: "\u2AC5\u0338",
          nsucc: "\u2281",
          nsucceq: "\u2AB0\u0338",
          nsup: "\u2285",
          nsupE: "\u2AC6\u0338",
          nsupe: "\u2289",
          nsupset: "\u2283\u20D2",
          nsupseteq: "\u2289",
          nsupseteqq: "\u2AC6\u0338",
          ntgl: "\u2279",
          Ntilde: "\xD1",
          ntilde: "\xF1",
          ntlg: "\u2278",
          ntriangleleft: "\u22EA",
          ntrianglelefteq: "\u22EC",
          ntriangleright: "\u22EB",
          ntrianglerighteq: "\u22ED",
          Nu: "\u039D",
          nu: "\u03BD",
          num: "#",
          numero: "\u2116",
          numsp: "\u2007",
          nvap: "\u224D\u20D2",
          nvdash: "\u22AC",
          nvDash: "\u22AD",
          nVdash: "\u22AE",
          nVDash: "\u22AF",
          nvge: "\u2265\u20D2",
          nvgt: ">\u20D2",
          nvHarr: "\u2904",
          nvinfin: "\u29DE",
          nvlArr: "\u2902",
          nvle: "\u2264\u20D2",
          nvlt: "<\u20D2",
          nvltrie: "\u22B4\u20D2",
          nvrArr: "\u2903",
          nvrtrie: "\u22B5\u20D2",
          nvsim: "\u223C\u20D2",
          nwarhk: "\u2923",
          nwarr: "\u2196",
          nwArr: "\u21D6",
          nwarrow: "\u2196",
          nwnear: "\u2927",
          Oacute: "\xD3",
          oacute: "\xF3",
          oast: "\u229B",
          Ocirc: "\xD4",
          ocirc: "\xF4",
          ocir: "\u229A",
          Ocy: "\u041E",
          ocy: "\u043E",
          odash: "\u229D",
          Odblac: "\u0150",
          odblac: "\u0151",
          odiv: "\u2A38",
          odot: "\u2299",
          odsold: "\u29BC",
          OElig: "\u0152",
          oelig: "\u0153",
          ofcir: "\u29BF",
          Ofr: "\u{1D512}",
          ofr: "\u{1D52C}",
          ogon: "\u02DB",
          Ograve: "\xD2",
          ograve: "\xF2",
          ogt: "\u29C1",
          ohbar: "\u29B5",
          ohm: "\u03A9",
          oint: "\u222E",
          olarr: "\u21BA",
          olcir: "\u29BE",
          olcross: "\u29BB",
          oline: "\u203E",
          olt: "\u29C0",
          Omacr: "\u014C",
          omacr: "\u014D",
          Omega: "\u03A9",
          omega: "\u03C9",
          Omicron: "\u039F",
          omicron: "\u03BF",
          omid: "\u29B6",
          ominus: "\u2296",
          Oopf: "\u{1D546}",
          oopf: "\u{1D560}",
          opar: "\u29B7",
          OpenCurlyDoubleQuote: "\u201C",
          OpenCurlyQuote: "\u2018",
          operp: "\u29B9",
          oplus: "\u2295",
          orarr: "\u21BB",
          Or: "\u2A54",
          or: "\u2228",
          ord: "\u2A5D",
          order: "\u2134",
          orderof: "\u2134",
          ordf: "\xAA",
          ordm: "\xBA",
          origof: "\u22B6",
          oror: "\u2A56",
          orslope: "\u2A57",
          orv: "\u2A5B",
          oS: "\u24C8",
          Oscr: "\u{1D4AA}",
          oscr: "\u2134",
          Oslash: "\xD8",
          oslash: "\xF8",
          osol: "\u2298",
          Otilde: "\xD5",
          otilde: "\xF5",
          otimesas: "\u2A36",
          Otimes: "\u2A37",
          otimes: "\u2297",
          Ouml: "\xD6",
          ouml: "\xF6",
          ovbar: "\u233D",
          OverBar: "\u203E",
          OverBrace: "\u23DE",
          OverBracket: "\u23B4",
          OverParenthesis: "\u23DC",
          para: "\xB6",
          parallel: "\u2225",
          par: "\u2225",
          parsim: "\u2AF3",
          parsl: "\u2AFD",
          part: "\u2202",
          PartialD: "\u2202",
          Pcy: "\u041F",
          pcy: "\u043F",
          percnt: "%",
          period: ".",
          permil: "\u2030",
          perp: "\u22A5",
          pertenk: "\u2031",
          Pfr: "\u{1D513}",
          pfr: "\u{1D52D}",
          Phi: "\u03A6",
          phi: "\u03C6",
          phiv: "\u03D5",
          phmmat: "\u2133",
          phone: "\u260E",
          Pi: "\u03A0",
          pi: "\u03C0",
          pitchfork: "\u22D4",
          piv: "\u03D6",
          planck: "\u210F",
          planckh: "\u210E",
          plankv: "\u210F",
          plusacir: "\u2A23",
          plusb: "\u229E",
          pluscir: "\u2A22",
          plus: "+",
          plusdo: "\u2214",
          plusdu: "\u2A25",
          pluse: "\u2A72",
          PlusMinus: "\xB1",
          plusmn: "\xB1",
          plussim: "\u2A26",
          plustwo: "\u2A27",
          pm: "\xB1",
          Poincareplane: "\u210C",
          pointint: "\u2A15",
          popf: "\u{1D561}",
          Popf: "\u2119",
          pound: "\xA3",
          prap: "\u2AB7",
          Pr: "\u2ABB",
          pr: "\u227A",
          prcue: "\u227C",
          precapprox: "\u2AB7",
          prec: "\u227A",
          preccurlyeq: "\u227C",
          Precedes: "\u227A",
          PrecedesEqual: "\u2AAF",
          PrecedesSlantEqual: "\u227C",
          PrecedesTilde: "\u227E",
          preceq: "\u2AAF",
          precnapprox: "\u2AB9",
          precneqq: "\u2AB5",
          precnsim: "\u22E8",
          pre: "\u2AAF",
          prE: "\u2AB3",
          precsim: "\u227E",
          prime: "\u2032",
          Prime: "\u2033",
          primes: "\u2119",
          prnap: "\u2AB9",
          prnE: "\u2AB5",
          prnsim: "\u22E8",
          prod: "\u220F",
          Product: "\u220F",
          profalar: "\u232E",
          profline: "\u2312",
          profsurf: "\u2313",
          prop: "\u221D",
          Proportional: "\u221D",
          Proportion: "\u2237",
          propto: "\u221D",
          prsim: "\u227E",
          prurel: "\u22B0",
          Pscr: "\u{1D4AB}",
          pscr: "\u{1D4C5}",
          Psi: "\u03A8",
          psi: "\u03C8",
          puncsp: "\u2008",
          Qfr: "\u{1D514}",
          qfr: "\u{1D52E}",
          qint: "\u2A0C",
          qopf: "\u{1D562}",
          Qopf: "\u211A",
          qprime: "\u2057",
          Qscr: "\u{1D4AC}",
          qscr: "\u{1D4C6}",
          quaternions: "\u210D",
          quatint: "\u2A16",
          quest: "?",
          questeq: "\u225F",
          quot: '"',
          QUOT: '"',
          rAarr: "\u21DB",
          race: "\u223D\u0331",
          Racute: "\u0154",
          racute: "\u0155",
          radic: "\u221A",
          raemptyv: "\u29B3",
          rang: "\u27E9",
          Rang: "\u27EB",
          rangd: "\u2992",
          range: "\u29A5",
          rangle: "\u27E9",
          raquo: "\xBB",
          rarrap: "\u2975",
          rarrb: "\u21E5",
          rarrbfs: "\u2920",
          rarrc: "\u2933",
          rarr: "\u2192",
          Rarr: "\u21A0",
          rArr: "\u21D2",
          rarrfs: "\u291E",
          rarrhk: "\u21AA",
          rarrlp: "\u21AC",
          rarrpl: "\u2945",
          rarrsim: "\u2974",
          Rarrtl: "\u2916",
          rarrtl: "\u21A3",
          rarrw: "\u219D",
          ratail: "\u291A",
          rAtail: "\u291C",
          ratio: "\u2236",
          rationals: "\u211A",
          rbarr: "\u290D",
          rBarr: "\u290F",
          RBarr: "\u2910",
          rbbrk: "\u2773",
          rbrace: "}",
          rbrack: "]",
          rbrke: "\u298C",
          rbrksld: "\u298E",
          rbrkslu: "\u2990",
          Rcaron: "\u0158",
          rcaron: "\u0159",
          Rcedil: "\u0156",
          rcedil: "\u0157",
          rceil: "\u2309",
          rcub: "}",
          Rcy: "\u0420",
          rcy: "\u0440",
          rdca: "\u2937",
          rdldhar: "\u2969",
          rdquo: "\u201D",
          rdquor: "\u201D",
          rdsh: "\u21B3",
          real: "\u211C",
          realine: "\u211B",
          realpart: "\u211C",
          reals: "\u211D",
          Re: "\u211C",
          rect: "\u25AD",
          reg: "\xAE",
          REG: "\xAE",
          ReverseElement: "\u220B",
          ReverseEquilibrium: "\u21CB",
          ReverseUpEquilibrium: "\u296F",
          rfisht: "\u297D",
          rfloor: "\u230B",
          rfr: "\u{1D52F}",
          Rfr: "\u211C",
          rHar: "\u2964",
          rhard: "\u21C1",
          rharu: "\u21C0",
          rharul: "\u296C",
          Rho: "\u03A1",
          rho: "\u03C1",
          rhov: "\u03F1",
          RightAngleBracket: "\u27E9",
          RightArrowBar: "\u21E5",
          rightarrow: "\u2192",
          RightArrow: "\u2192",
          Rightarrow: "\u21D2",
          RightArrowLeftArrow: "\u21C4",
          rightarrowtail: "\u21A3",
          RightCeiling: "\u2309",
          RightDoubleBracket: "\u27E7",
          RightDownTeeVector: "\u295D",
          RightDownVectorBar: "\u2955",
          RightDownVector: "\u21C2",
          RightFloor: "\u230B",
          rightharpoondown: "\u21C1",
          rightharpoonup: "\u21C0",
          rightleftarrows: "\u21C4",
          rightleftharpoons: "\u21CC",
          rightrightarrows: "\u21C9",
          rightsquigarrow: "\u219D",
          RightTeeArrow: "\u21A6",
          RightTee: "\u22A2",
          RightTeeVector: "\u295B",
          rightthreetimes: "\u22CC",
          RightTriangleBar: "\u29D0",
          RightTriangle: "\u22B3",
          RightTriangleEqual: "\u22B5",
          RightUpDownVector: "\u294F",
          RightUpTeeVector: "\u295C",
          RightUpVectorBar: "\u2954",
          RightUpVector: "\u21BE",
          RightVectorBar: "\u2953",
          RightVector: "\u21C0",
          ring: "\u02DA",
          risingdotseq: "\u2253",
          rlarr: "\u21C4",
          rlhar: "\u21CC",
          rlm: "\u200F",
          rmoustache: "\u23B1",
          rmoust: "\u23B1",
          rnmid: "\u2AEE",
          roang: "\u27ED",
          roarr: "\u21FE",
          robrk: "\u27E7",
          ropar: "\u2986",
          ropf: "\u{1D563}",
          Ropf: "\u211D",
          roplus: "\u2A2E",
          rotimes: "\u2A35",
          RoundImplies: "\u2970",
          rpar: ")",
          rpargt: "\u2994",
          rppolint: "\u2A12",
          rrarr: "\u21C9",
          Rrightarrow: "\u21DB",
          rsaquo: "\u203A",
          rscr: "\u{1D4C7}",
          Rscr: "\u211B",
          rsh: "\u21B1",
          Rsh: "\u21B1",
          rsqb: "]",
          rsquo: "\u2019",
          rsquor: "\u2019",
          rthree: "\u22CC",
          rtimes: "\u22CA",
          rtri: "\u25B9",
          rtrie: "\u22B5",
          rtrif: "\u25B8",
          rtriltri: "\u29CE",
          RuleDelayed: "\u29F4",
          ruluhar: "\u2968",
          rx: "\u211E",
          Sacute: "\u015A",
          sacute: "\u015B",
          sbquo: "\u201A",
          scap: "\u2AB8",
          Scaron: "\u0160",
          scaron: "\u0161",
          Sc: "\u2ABC",
          sc: "\u227B",
          sccue: "\u227D",
          sce: "\u2AB0",
          scE: "\u2AB4",
          Scedil: "\u015E",
          scedil: "\u015F",
          Scirc: "\u015C",
          scirc: "\u015D",
          scnap: "\u2ABA",
          scnE: "\u2AB6",
          scnsim: "\u22E9",
          scpolint: "\u2A13",
          scsim: "\u227F",
          Scy: "\u0421",
          scy: "\u0441",
          sdotb: "\u22A1",
          sdot: "\u22C5",
          sdote: "\u2A66",
          searhk: "\u2925",
          searr: "\u2198",
          seArr: "\u21D8",
          searrow: "\u2198",
          sect: "\xA7",
          semi: ";",
          seswar: "\u2929",
          setminus: "\u2216",
          setmn: "\u2216",
          sext: "\u2736",
          Sfr: "\u{1D516}",
          sfr: "\u{1D530}",
          sfrown: "\u2322",
          sharp: "\u266F",
          SHCHcy: "\u0429",
          shchcy: "\u0449",
          SHcy: "\u0428",
          shcy: "\u0448",
          ShortDownArrow: "\u2193",
          ShortLeftArrow: "\u2190",
          shortmid: "\u2223",
          shortparallel: "\u2225",
          ShortRightArrow: "\u2192",
          ShortUpArrow: "\u2191",
          shy: "\xAD",
          Sigma: "\u03A3",
          sigma: "\u03C3",
          sigmaf: "\u03C2",
          sigmav: "\u03C2",
          sim: "\u223C",
          simdot: "\u2A6A",
          sime: "\u2243",
          simeq: "\u2243",
          simg: "\u2A9E",
          simgE: "\u2AA0",
          siml: "\u2A9D",
          simlE: "\u2A9F",
          simne: "\u2246",
          simplus: "\u2A24",
          simrarr: "\u2972",
          slarr: "\u2190",
          SmallCircle: "\u2218",
          smallsetminus: "\u2216",
          smashp: "\u2A33",
          smeparsl: "\u29E4",
          smid: "\u2223",
          smile: "\u2323",
          smt: "\u2AAA",
          smte: "\u2AAC",
          smtes: "\u2AAC\uFE00",
          SOFTcy: "\u042C",
          softcy: "\u044C",
          solbar: "\u233F",
          solb: "\u29C4",
          sol: "/",
          Sopf: "\u{1D54A}",
          sopf: "\u{1D564}",
          spades: "\u2660",
          spadesuit: "\u2660",
          spar: "\u2225",
          sqcap: "\u2293",
          sqcaps: "\u2293\uFE00",
          sqcup: "\u2294",
          sqcups: "\u2294\uFE00",
          Sqrt: "\u221A",
          sqsub: "\u228F",
          sqsube: "\u2291",
          sqsubset: "\u228F",
          sqsubseteq: "\u2291",
          sqsup: "\u2290",
          sqsupe: "\u2292",
          sqsupset: "\u2290",
          sqsupseteq: "\u2292",
          square: "\u25A1",
          Square: "\u25A1",
          SquareIntersection: "\u2293",
          SquareSubset: "\u228F",
          SquareSubsetEqual: "\u2291",
          SquareSuperset: "\u2290",
          SquareSupersetEqual: "\u2292",
          SquareUnion: "\u2294",
          squarf: "\u25AA",
          squ: "\u25A1",
          squf: "\u25AA",
          srarr: "\u2192",
          Sscr: "\u{1D4AE}",
          sscr: "\u{1D4C8}",
          ssetmn: "\u2216",
          ssmile: "\u2323",
          sstarf: "\u22C6",
          Star: "\u22C6",
          star: "\u2606",
          starf: "\u2605",
          straightepsilon: "\u03F5",
          straightphi: "\u03D5",
          strns: "\xAF",
          sub: "\u2282",
          Sub: "\u22D0",
          subdot: "\u2ABD",
          subE: "\u2AC5",
          sube: "\u2286",
          subedot: "\u2AC3",
          submult: "\u2AC1",
          subnE: "\u2ACB",
          subne: "\u228A",
          subplus: "\u2ABF",
          subrarr: "\u2979",
          subset: "\u2282",
          Subset: "\u22D0",
          subseteq: "\u2286",
          subseteqq: "\u2AC5",
          SubsetEqual: "\u2286",
          subsetneq: "\u228A",
          subsetneqq: "\u2ACB",
          subsim: "\u2AC7",
          subsub: "\u2AD5",
          subsup: "\u2AD3",
          succapprox: "\u2AB8",
          succ: "\u227B",
          succcurlyeq: "\u227D",
          Succeeds: "\u227B",
          SucceedsEqual: "\u2AB0",
          SucceedsSlantEqual: "\u227D",
          SucceedsTilde: "\u227F",
          succeq: "\u2AB0",
          succnapprox: "\u2ABA",
          succneqq: "\u2AB6",
          succnsim: "\u22E9",
          succsim: "\u227F",
          SuchThat: "\u220B",
          sum: "\u2211",
          Sum: "\u2211",
          sung: "\u266A",
          sup1: "\xB9",
          sup2: "\xB2",
          sup3: "\xB3",
          sup: "\u2283",
          Sup: "\u22D1",
          supdot: "\u2ABE",
          supdsub: "\u2AD8",
          supE: "\u2AC6",
          supe: "\u2287",
          supedot: "\u2AC4",
          Superset: "\u2283",
          SupersetEqual: "\u2287",
          suphsol: "\u27C9",
          suphsub: "\u2AD7",
          suplarr: "\u297B",
          supmult: "\u2AC2",
          supnE: "\u2ACC",
          supne: "\u228B",
          supplus: "\u2AC0",
          supset: "\u2283",
          Supset: "\u22D1",
          supseteq: "\u2287",
          supseteqq: "\u2AC6",
          supsetneq: "\u228B",
          supsetneqq: "\u2ACC",
          supsim: "\u2AC8",
          supsub: "\u2AD4",
          supsup: "\u2AD6",
          swarhk: "\u2926",
          swarr: "\u2199",
          swArr: "\u21D9",
          swarrow: "\u2199",
          swnwar: "\u292A",
          szlig: "\xDF",
          Tab: "	",
          target: "\u2316",
          Tau: "\u03A4",
          tau: "\u03C4",
          tbrk: "\u23B4",
          Tcaron: "\u0164",
          tcaron: "\u0165",
          Tcedil: "\u0162",
          tcedil: "\u0163",
          Tcy: "\u0422",
          tcy: "\u0442",
          tdot: "\u20DB",
          telrec: "\u2315",
          Tfr: "\u{1D517}",
          tfr: "\u{1D531}",
          there4: "\u2234",
          therefore: "\u2234",
          Therefore: "\u2234",
          Theta: "\u0398",
          theta: "\u03B8",
          thetasym: "\u03D1",
          thetav: "\u03D1",
          thickapprox: "\u2248",
          thicksim: "\u223C",
          ThickSpace: "\u205F\u200A",
          ThinSpace: "\u2009",
          thinsp: "\u2009",
          thkap: "\u2248",
          thksim: "\u223C",
          THORN: "\xDE",
          thorn: "\xFE",
          tilde: "\u02DC",
          Tilde: "\u223C",
          TildeEqual: "\u2243",
          TildeFullEqual: "\u2245",
          TildeTilde: "\u2248",
          timesbar: "\u2A31",
          timesb: "\u22A0",
          times: "\xD7",
          timesd: "\u2A30",
          tint: "\u222D",
          toea: "\u2928",
          topbot: "\u2336",
          topcir: "\u2AF1",
          top: "\u22A4",
          Topf: "\u{1D54B}",
          topf: "\u{1D565}",
          topfork: "\u2ADA",
          tosa: "\u2929",
          tprime: "\u2034",
          trade: "\u2122",
          TRADE: "\u2122",
          triangle: "\u25B5",
          triangledown: "\u25BF",
          triangleleft: "\u25C3",
          trianglelefteq: "\u22B4",
          triangleq: "\u225C",
          triangleright: "\u25B9",
          trianglerighteq: "\u22B5",
          tridot: "\u25EC",
          trie: "\u225C",
          triminus: "\u2A3A",
          TripleDot: "\u20DB",
          triplus: "\u2A39",
          trisb: "\u29CD",
          tritime: "\u2A3B",
          trpezium: "\u23E2",
          Tscr: "\u{1D4AF}",
          tscr: "\u{1D4C9}",
          TScy: "\u0426",
          tscy: "\u0446",
          TSHcy: "\u040B",
          tshcy: "\u045B",
          Tstrok: "\u0166",
          tstrok: "\u0167",
          twixt: "\u226C",
          twoheadleftarrow: "\u219E",
          twoheadrightarrow: "\u21A0",
          Uacute: "\xDA",
          uacute: "\xFA",
          uarr: "\u2191",
          Uarr: "\u219F",
          uArr: "\u21D1",
          Uarrocir: "\u2949",
          Ubrcy: "\u040E",
          ubrcy: "\u045E",
          Ubreve: "\u016C",
          ubreve: "\u016D",
          Ucirc: "\xDB",
          ucirc: "\xFB",
          Ucy: "\u0423",
          ucy: "\u0443",
          udarr: "\u21C5",
          Udblac: "\u0170",
          udblac: "\u0171",
          udhar: "\u296E",
          ufisht: "\u297E",
          Ufr: "\u{1D518}",
          ufr: "\u{1D532}",
          Ugrave: "\xD9",
          ugrave: "\xF9",
          uHar: "\u2963",
          uharl: "\u21BF",
          uharr: "\u21BE",
          uhblk: "\u2580",
          ulcorn: "\u231C",
          ulcorner: "\u231C",
          ulcrop: "\u230F",
          ultri: "\u25F8",
          Umacr: "\u016A",
          umacr: "\u016B",
          uml: "\xA8",
          UnderBar: "_",
          UnderBrace: "\u23DF",
          UnderBracket: "\u23B5",
          UnderParenthesis: "\u23DD",
          Union: "\u22C3",
          UnionPlus: "\u228E",
          Uogon: "\u0172",
          uogon: "\u0173",
          Uopf: "\u{1D54C}",
          uopf: "\u{1D566}",
          UpArrowBar: "\u2912",
          uparrow: "\u2191",
          UpArrow: "\u2191",
          Uparrow: "\u21D1",
          UpArrowDownArrow: "\u21C5",
          updownarrow: "\u2195",
          UpDownArrow: "\u2195",
          Updownarrow: "\u21D5",
          UpEquilibrium: "\u296E",
          upharpoonleft: "\u21BF",
          upharpoonright: "\u21BE",
          uplus: "\u228E",
          UpperLeftArrow: "\u2196",
          UpperRightArrow: "\u2197",
          upsi: "\u03C5",
          Upsi: "\u03D2",
          upsih: "\u03D2",
          Upsilon: "\u03A5",
          upsilon: "\u03C5",
          UpTeeArrow: "\u21A5",
          UpTee: "\u22A5",
          upuparrows: "\u21C8",
          urcorn: "\u231D",
          urcorner: "\u231D",
          urcrop: "\u230E",
          Uring: "\u016E",
          uring: "\u016F",
          urtri: "\u25F9",
          Uscr: "\u{1D4B0}",
          uscr: "\u{1D4CA}",
          utdot: "\u22F0",
          Utilde: "\u0168",
          utilde: "\u0169",
          utri: "\u25B5",
          utrif: "\u25B4",
          uuarr: "\u21C8",
          Uuml: "\xDC",
          uuml: "\xFC",
          uwangle: "\u29A7",
          vangrt: "\u299C",
          varepsilon: "\u03F5",
          varkappa: "\u03F0",
          varnothing: "\u2205",
          varphi: "\u03D5",
          varpi: "\u03D6",
          varpropto: "\u221D",
          varr: "\u2195",
          vArr: "\u21D5",
          varrho: "\u03F1",
          varsigma: "\u03C2",
          varsubsetneq: "\u228A\uFE00",
          varsubsetneqq: "\u2ACB\uFE00",
          varsupsetneq: "\u228B\uFE00",
          varsupsetneqq: "\u2ACC\uFE00",
          vartheta: "\u03D1",
          vartriangleleft: "\u22B2",
          vartriangleright: "\u22B3",
          vBar: "\u2AE8",
          Vbar: "\u2AEB",
          vBarv: "\u2AE9",
          Vcy: "\u0412",
          vcy: "\u0432",
          vdash: "\u22A2",
          vDash: "\u22A8",
          Vdash: "\u22A9",
          VDash: "\u22AB",
          Vdashl: "\u2AE6",
          veebar: "\u22BB",
          vee: "\u2228",
          Vee: "\u22C1",
          veeeq: "\u225A",
          vellip: "\u22EE",
          verbar: "|",
          Verbar: "\u2016",
          vert: "|",
          Vert: "\u2016",
          VerticalBar: "\u2223",
          VerticalLine: "|",
          VerticalSeparator: "\u2758",
          VerticalTilde: "\u2240",
          VeryThinSpace: "\u200A",
          Vfr: "\u{1D519}",
          vfr: "\u{1D533}",
          vltri: "\u22B2",
          vnsub: "\u2282\u20D2",
          vnsup: "\u2283\u20D2",
          Vopf: "\u{1D54D}",
          vopf: "\u{1D567}",
          vprop: "\u221D",
          vrtri: "\u22B3",
          Vscr: "\u{1D4B1}",
          vscr: "\u{1D4CB}",
          vsubnE: "\u2ACB\uFE00",
          vsubne: "\u228A\uFE00",
          vsupnE: "\u2ACC\uFE00",
          vsupne: "\u228B\uFE00",
          Vvdash: "\u22AA",
          vzigzag: "\u299A",
          Wcirc: "\u0174",
          wcirc: "\u0175",
          wedbar: "\u2A5F",
          wedge: "\u2227",
          Wedge: "\u22C0",
          wedgeq: "\u2259",
          weierp: "\u2118",
          Wfr: "\u{1D51A}",
          wfr: "\u{1D534}",
          Wopf: "\u{1D54E}",
          wopf: "\u{1D568}",
          wp: "\u2118",
          wr: "\u2240",
          wreath: "\u2240",
          Wscr: "\u{1D4B2}",
          wscr: "\u{1D4CC}",
          xcap: "\u22C2",
          xcirc: "\u25EF",
          xcup: "\u22C3",
          xdtri: "\u25BD",
          Xfr: "\u{1D51B}",
          xfr: "\u{1D535}",
          xharr: "\u27F7",
          xhArr: "\u27FA",
          Xi: "\u039E",
          xi: "\u03BE",
          xlarr: "\u27F5",
          xlArr: "\u27F8",
          xmap: "\u27FC",
          xnis: "\u22FB",
          xodot: "\u2A00",
          Xopf: "\u{1D54F}",
          xopf: "\u{1D569}",
          xoplus: "\u2A01",
          xotime: "\u2A02",
          xrarr: "\u27F6",
          xrArr: "\u27F9",
          Xscr: "\u{1D4B3}",
          xscr: "\u{1D4CD}",
          xsqcup: "\u2A06",
          xuplus: "\u2A04",
          xutri: "\u25B3",
          xvee: "\u22C1",
          xwedge: "\u22C0",
          Yacute: "\xDD",
          yacute: "\xFD",
          YAcy: "\u042F",
          yacy: "\u044F",
          Ycirc: "\u0176",
          ycirc: "\u0177",
          Ycy: "\u042B",
          ycy: "\u044B",
          yen: "\xA5",
          Yfr: "\u{1D51C}",
          yfr: "\u{1D536}",
          YIcy: "\u0407",
          yicy: "\u0457",
          Yopf: "\u{1D550}",
          yopf: "\u{1D56A}",
          Yscr: "\u{1D4B4}",
          yscr: "\u{1D4CE}",
          YUcy: "\u042E",
          yucy: "\u044E",
          yuml: "\xFF",
          Yuml: "\u0178",
          Zacute: "\u0179",
          zacute: "\u017A",
          Zcaron: "\u017D",
          zcaron: "\u017E",
          Zcy: "\u0417",
          zcy: "\u0437",
          Zdot: "\u017B",
          zdot: "\u017C",
          zeetrf: "\u2128",
          ZeroWidthSpace: "\u200B",
          Zeta: "\u0396",
          zeta: "\u03B6",
          zfr: "\u{1D537}",
          Zfr: "\u2128",
          ZHcy: "\u0416",
          zhcy: "\u0436",
          zigrarr: "\u21DD",
          zopf: "\u{1D56B}",
          Zopf: "\u2124",
          Zscr: "\u{1D4B5}",
          zscr: "\u{1D4CF}",
          zwj: "\u200D",
          zwnj: "\u200C",
        };
      }),
      tf = Te((e, t) => {
        t.exports = {
          Aacute: "\xC1",
          aacute: "\xE1",
          Acirc: "\xC2",
          acirc: "\xE2",
          acute: "\xB4",
          AElig: "\xC6",
          aelig: "\xE6",
          Agrave: "\xC0",
          agrave: "\xE0",
          amp: "&",
          AMP: "&",
          Aring: "\xC5",
          aring: "\xE5",
          Atilde: "\xC3",
          atilde: "\xE3",
          Auml: "\xC4",
          auml: "\xE4",
          brvbar: "\xA6",
          Ccedil: "\xC7",
          ccedil: "\xE7",
          cedil: "\xB8",
          cent: "\xA2",
          copy: "\xA9",
          COPY: "\xA9",
          curren: "\xA4",
          deg: "\xB0",
          divide: "\xF7",
          Eacute: "\xC9",
          eacute: "\xE9",
          Ecirc: "\xCA",
          ecirc: "\xEA",
          Egrave: "\xC8",
          egrave: "\xE8",
          ETH: "\xD0",
          eth: "\xF0",
          Euml: "\xCB",
          euml: "\xEB",
          frac12: "\xBD",
          frac14: "\xBC",
          frac34: "\xBE",
          gt: ">",
          GT: ">",
          Iacute: "\xCD",
          iacute: "\xED",
          Icirc: "\xCE",
          icirc: "\xEE",
          iexcl: "\xA1",
          Igrave: "\xCC",
          igrave: "\xEC",
          iquest: "\xBF",
          Iuml: "\xCF",
          iuml: "\xEF",
          laquo: "\xAB",
          lt: "<",
          LT: "<",
          macr: "\xAF",
          micro: "\xB5",
          middot: "\xB7",
          nbsp: "\xA0",
          not: "\xAC",
          Ntilde: "\xD1",
          ntilde: "\xF1",
          Oacute: "\xD3",
          oacute: "\xF3",
          Ocirc: "\xD4",
          ocirc: "\xF4",
          Ograve: "\xD2",
          ograve: "\xF2",
          ordf: "\xAA",
          ordm: "\xBA",
          Oslash: "\xD8",
          oslash: "\xF8",
          Otilde: "\xD5",
          otilde: "\xF5",
          Ouml: "\xD6",
          ouml: "\xF6",
          para: "\xB6",
          plusmn: "\xB1",
          pound: "\xA3",
          quot: '"',
          QUOT: '"',
          raquo: "\xBB",
          reg: "\xAE",
          REG: "\xAE",
          sect: "\xA7",
          shy: "\xAD",
          sup1: "\xB9",
          sup2: "\xB2",
          sup3: "\xB3",
          szlig: "\xDF",
          THORN: "\xDE",
          thorn: "\xFE",
          times: "\xD7",
          Uacute: "\xDA",
          uacute: "\xFA",
          Ucirc: "\xDB",
          ucirc: "\xFB",
          Ugrave: "\xD9",
          ugrave: "\xF9",
          uml: "\xA8",
          Uuml: "\xDC",
          uuml: "\xFC",
          Yacute: "\xDD",
          yacute: "\xFD",
          yen: "\xA5",
          yuml: "\xFF",
        };
      }),
      el = Te((e, t) => {
        t.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
      }),
      rf = Te((e, t) => {
        t.exports = {
          0: 65533,
          128: 8364,
          130: 8218,
          131: 402,
          132: 8222,
          133: 8230,
          134: 8224,
          135: 8225,
          136: 710,
          137: 8240,
          138: 352,
          139: 8249,
          140: 338,
          142: 381,
          145: 8216,
          146: 8217,
          147: 8220,
          148: 8221,
          149: 8226,
          150: 8211,
          151: 8212,
          152: 732,
          153: 8482,
          154: 353,
          155: 8250,
          156: 339,
          158: 382,
          159: 376,
        };
      }),
      nf = Te((e) => {
        "use strict";
        var t =
          (e && e.__importDefault) ||
          function (a) {
            return a && a.__esModule ? a : { default: a };
          };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = t(rf()),
          n =
            String.fromCodePoint ||
            function (a) {
              var i = "";
              return (
                a > 65535 &&
                  ((a -= 65536),
                  (i += String.fromCharCode(((a >>> 10) & 1023) | 55296)),
                  (a = 56320 | (a & 1023))),
                (i += String.fromCharCode(a)),
                i
              );
            };
        function o(a) {
          return (a >= 55296 && a <= 57343) || a > 1114111
            ? "\uFFFD"
            : (a in r.default && (a = r.default[a]), n(a));
        }
        b(o, "decodeCodePoint"), (e.default = o);
      }),
      Ps = Te((e) => {
        "use strict";
        var t =
          (e && e.__importDefault) ||
          function (p) {
            return p && p.__esModule ? p : { default: p };
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.decodeHTML = e.decodeHTMLStrict = e.decodeXML = void 0);
        var r = t(Zs()),
          n = t(tf()),
          o = t(el()),
          a = t(nf()),
          i = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
        (e.decodeXML = s(o.default)), (e.decodeHTMLStrict = s(r.default));
        function s(p) {
          var h = c(p);
          return function (d) {
            return String(d).replace(i, h);
          };
        }
        b(s, "getStrictDecoder");
        var l = b(function (p, h) {
          return p < h ? 1 : -1;
        }, "sorter");
        e.decodeHTML = (function () {
          for (
            var p = Object.keys(n.default).sort(l),
              h = Object.keys(r.default).sort(l),
              d = 0,
              y = 0;
            d < h.length;
            d++
          )
            p[y] === h[d] ? ((h[d] += ";?"), y++) : (h[d] += ";");
          var g = new RegExp(
              "&(?:" + h.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)",
              "g",
            ),
            A = c(r.default);
          function v(S) {
            return S.substr(-1) !== ";" && (S += ";"), A(S);
          }
          return (
            b(v, "replacer"),
            function (S) {
              return String(S).replace(g, v);
            }
          );
        })();
        function c(p) {
          return b(function (h) {
            if (h.charAt(1) === "#") {
              var d = h.charAt(2);
              return d === "X" || d === "x"
                ? a.default(parseInt(h.substr(3), 16))
                : a.default(parseInt(h.substr(2), 10));
            }
            return p[h.slice(1, -1)] || h;
          }, "replace");
        }
        b(c, "getReplacer");
      }),
      Ns = Te((e) => {
        "use strict";
        var t =
          (e && e.__importDefault) ||
          function (w) {
            return w && w.__esModule ? w : { default: w };
          };
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.escapeUTF8 =
            e.escape =
            e.encodeNonAsciiHTML =
            e.encodeHTML =
            e.encodeXML =
              void 0);
        var r = t(el()),
          n = l(r.default),
          o = c(n);
        e.encodeXML = S(n);
        var a = t(Zs()),
          i = l(a.default),
          s = c(i);
        (e.encodeHTML = y(i, s)), (e.encodeNonAsciiHTML = S(i));
        function l(w) {
          return Object.keys(w)
            .sort()
            .reduce(function (x, C) {
              return (x[w[C]] = "&" + C + ";"), x;
            }, {});
        }
        b(l, "getInverseObj");
        function c(w) {
          for (
            var x = [], C = [], k = 0, F = Object.keys(w);
            k < F.length;
            k++
          ) {
            var _ = F[k];
            _.length === 1 ? x.push("\\" + _) : C.push(_);
          }
          x.sort();
          for (var j = 0; j < x.length - 1; j++) {
            for (
              var M = j;
              M < x.length - 1 &&
              x[M].charCodeAt(1) + 1 === x[M + 1].charCodeAt(1);

            )
              M += 1;
            var P = 1 + M - j;
            P < 3 || x.splice(j, P, x[j] + "-" + x[M]);
          }
          return (
            C.unshift("[" + x.join("") + "]"), new RegExp(C.join("|"), "g")
          );
        }
        b(c, "getInverseReplacer");
        var p =
            /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
          h =
            String.prototype.codePointAt != null
              ? function (w) {
                  return w.codePointAt(0);
                }
              : function (w) {
                  return (
                    (w.charCodeAt(0) - 55296) * 1024 +
                    w.charCodeAt(1) -
                    56320 +
                    65536
                  );
                };
        function d(w) {
          return (
            "&#x" +
            (w.length > 1 ? h(w) : w.charCodeAt(0)).toString(16).toUpperCase() +
            ";"
          );
        }
        b(d, "singleCharReplacer");
        function y(w, x) {
          return function (C) {
            return C.replace(x, function (k) {
              return w[k];
            }).replace(p, d);
          };
        }
        b(y, "getInverse");
        var g = new RegExp(o.source + "|" + p.source, "g");
        function A(w) {
          return w.replace(g, d);
        }
        b(A, "escape"), (e.escape = A);
        function v(w) {
          return w.replace(o, d);
        }
        b(v, "escapeUTF8"), (e.escapeUTF8 = v);
        function S(w) {
          return function (x) {
            return x.replace(g, function (C) {
              return w[C] || d(C);
            });
          };
        }
        b(S, "getASCIIEncoder");
      }),
      of = Te((e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.decodeXMLStrict =
            e.decodeHTML5Strict =
            e.decodeHTML4Strict =
            e.decodeHTML5 =
            e.decodeHTML4 =
            e.decodeHTMLStrict =
            e.decodeHTML =
            e.decodeXML =
            e.encodeHTML5 =
            e.encodeHTML4 =
            e.escapeUTF8 =
            e.escape =
            e.encodeNonAsciiHTML =
            e.encodeHTML =
            e.encodeXML =
            e.encode =
            e.decodeStrict =
            e.decode =
              void 0);
        var t = Ps(),
          r = Ns();
        function n(l, c) {
          return (!c || c <= 0 ? t.decodeXML : t.decodeHTML)(l);
        }
        b(n, "decode"), (e.decode = n);
        function o(l, c) {
          return (!c || c <= 0 ? t.decodeXML : t.decodeHTMLStrict)(l);
        }
        b(o, "decodeStrict"), (e.decodeStrict = o);
        function a(l, c) {
          return (!c || c <= 0 ? r.encodeXML : r.encodeHTML)(l);
        }
        b(a, "encode"), (e.encode = a);
        var i = Ns();
        Object.defineProperty(e, "encodeXML", {
          enumerable: !0,
          get: b(function () {
            return i.encodeXML;
          }, "get"),
        }),
          Object.defineProperty(e, "encodeHTML", {
            enumerable: !0,
            get: b(function () {
              return i.encodeHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "encodeNonAsciiHTML", {
            enumerable: !0,
            get: b(function () {
              return i.encodeNonAsciiHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "escape", {
            enumerable: !0,
            get: b(function () {
              return i.escape;
            }, "get"),
          }),
          Object.defineProperty(e, "escapeUTF8", {
            enumerable: !0,
            get: b(function () {
              return i.escapeUTF8;
            }, "get"),
          }),
          Object.defineProperty(e, "encodeHTML4", {
            enumerable: !0,
            get: b(function () {
              return i.encodeHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "encodeHTML5", {
            enumerable: !0,
            get: b(function () {
              return i.encodeHTML;
            }, "get"),
          });
        var s = Ps();
        Object.defineProperty(e, "decodeXML", {
          enumerable: !0,
          get: b(function () {
            return s.decodeXML;
          }, "get"),
        }),
          Object.defineProperty(e, "decodeHTML", {
            enumerable: !0,
            get: b(function () {
              return s.decodeHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeHTMLStrict", {
            enumerable: !0,
            get: b(function () {
              return s.decodeHTMLStrict;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeHTML4", {
            enumerable: !0,
            get: b(function () {
              return s.decodeHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeHTML5", {
            enumerable: !0,
            get: b(function () {
              return s.decodeHTML;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeHTML4Strict", {
            enumerable: !0,
            get: b(function () {
              return s.decodeHTMLStrict;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeHTML5Strict", {
            enumerable: !0,
            get: b(function () {
              return s.decodeHTMLStrict;
            }, "get"),
          }),
          Object.defineProperty(e, "decodeXMLStrict", {
            enumerable: !0,
            get: b(function () {
              return s.decodeXML;
            }, "get"),
          });
      }),
      af = Te((e, t) => {
        "use strict";
        function r(D, T) {
          if (!(D instanceof T))
            throw new TypeError("Cannot call a class as a function");
        }
        b(r, "_classCallCheck");
        function n(D, T) {
          for (var O = 0; O < T.length; O++) {
            var U = T[O];
            (U.enumerable = U.enumerable || !1),
              (U.configurable = !0),
              "value" in U && (U.writable = !0),
              Object.defineProperty(D, U.key, U);
          }
        }
        b(n, "_defineProperties");
        function o(D, T, O) {
          return T && n(D.prototype, T), O && n(D, O), D;
        }
        b(o, "_createClass");
        function a(D, T) {
          var O =
            (typeof Symbol < "u" && D[Symbol.iterator]) || D["@@iterator"];
          if (!O) {
            if (
              Array.isArray(D) ||
              (O = i(D)) ||
              (T && D && typeof D.length == "number")
            ) {
              O && (D = O);
              var U = 0,
                $ = b(function () {}, "F");
              return {
                s: $,
                n: b(function () {
                  return U >= D.length
                    ? { done: !0 }
                    : { done: !1, value: D[U++] };
                }, "n"),
                e: b(function (Q) {
                  throw Q;
                }, "e"),
                f: $,
              };
            }
            throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
          }
          var X = !0,
            se = !1,
            te;
          return {
            s: b(function () {
              O = O.call(D);
            }, "s"),
            n: b(function () {
              var Q = O.next();
              return (X = Q.done), Q;
            }, "n"),
            e: b(function (Q) {
              (se = !0), (te = Q);
            }, "e"),
            f: b(function () {
              try {
                !X && O.return != null && O.return();
              } finally {
                if (se) throw te;
              }
            }, "f"),
          };
        }
        b(a, "_createForOfIteratorHelper");
        function i(D, T) {
          if (D) {
            if (typeof D == "string") return s(D, T);
            var O = Object.prototype.toString.call(D).slice(8, -1);
            if (
              (O === "Object" && D.constructor && (O = D.constructor.name),
              O === "Map" || O === "Set")
            )
              return Array.from(D);
            if (
              O === "Arguments" ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(O)
            )
              return s(D, T);
          }
        }
        b(i, "_unsupportedIterableToArray");
        function s(D, T) {
          (T == null || T > D.length) && (T = D.length);
          for (var O = 0, U = new Array(T); O < T; O++) U[O] = D[O];
          return U;
        }
        b(s, "_arrayLikeToArray");
        var l = of(),
          c = {
            fg: "#FFF",
            bg: "#000",
            newline: !1,
            escapeXML: !1,
            stream: !1,
            colors: p(),
          };
        function p() {
          var D = {
            0: "#000",
            1: "#A00",
            2: "#0A0",
            3: "#A50",
            4: "#00A",
            5: "#A0A",
            6: "#0AA",
            7: "#AAA",
            8: "#555",
            9: "#F55",
            10: "#5F5",
            11: "#FF5",
            12: "#55F",
            13: "#F5F",
            14: "#5FF",
            15: "#FFF",
          };
          return (
            w(0, 5).forEach(function (T) {
              w(0, 5).forEach(function (O) {
                w(0, 5).forEach(function (U) {
                  return h(T, O, U, D);
                });
              });
            }),
            w(0, 23).forEach(function (T) {
              var O = T + 232,
                U = d(T * 10 + 8);
              D[O] = "#" + U + U + U;
            }),
            D
          );
        }
        b(p, "getDefaultColors");
        function h(D, T, O, U) {
          var $ = 16 + D * 36 + T * 6 + O,
            X = D > 0 ? D * 40 + 55 : 0,
            se = T > 0 ? T * 40 + 55 : 0,
            te = O > 0 ? O * 40 + 55 : 0;
          U[$] = y([X, se, te]);
        }
        b(h, "setStyleColor");
        function d(D) {
          for (var T = D.toString(16); T.length < 2; ) T = "0" + T;
          return T;
        }
        b(d, "toHexString");
        function y(D) {
          var T = [],
            O = a(D),
            U;
          try {
            for (O.s(); !(U = O.n()).done; ) {
              var $ = U.value;
              T.push(d($));
            }
          } catch (X) {
            O.e(X);
          } finally {
            O.f();
          }
          return "#" + T.join("");
        }
        b(y, "toColorHexString");
        function g(D, T, O, U) {
          var $;
          return (
            T === "text"
              ? ($ = k(O, U))
              : T === "display"
                ? ($ = v(D, O, U))
                : T === "xterm256Foreground"
                  ? ($ = j(D, U.colors[O]))
                  : T === "xterm256Background"
                    ? ($ = M(D, U.colors[O]))
                    : T === "rgb" && ($ = A(D, O)),
            $
          );
        }
        b(g, "generateOutput");
        function A(D, T) {
          T = T.substring(2).slice(0, -1);
          var O = +T.substr(0, 2),
            U = T.substring(5).split(";"),
            $ = U.map(function (X) {
              return ("0" + Number(X).toString(16)).substr(-2);
            }).join("");
          return _(D, (O === 38 ? "color:#" : "background-color:#") + $);
        }
        b(A, "handleRgb");
        function v(D, T, O) {
          T = parseInt(T, 10);
          var U = {
              "-1": b(function () {
                return "<br/>";
              }, "_"),
              0: b(function () {
                return D.length && S(D);
              }, "_"),
              1: b(function () {
                return F(D, "b");
              }, "_"),
              3: b(function () {
                return F(D, "i");
              }, "_"),
              4: b(function () {
                return F(D, "u");
              }, "_"),
              8: b(function () {
                return _(D, "display:none");
              }, "_"),
              9: b(function () {
                return F(D, "strike");
              }, "_"),
              22: b(function () {
                return _(
                  D,
                  "font-weight:normal;text-decoration:none;font-style:normal",
                );
              }, "_"),
              23: b(function () {
                return P(D, "i");
              }, "_"),
              24: b(function () {
                return P(D, "u");
              }, "_"),
              39: b(function () {
                return j(D, O.fg);
              }, "_"),
              49: b(function () {
                return M(D, O.bg);
              }, "_"),
              53: b(function () {
                return _(D, "text-decoration:overline");
              }, "_"),
            },
            $;
          return (
            U[T]
              ? ($ = U[T]())
              : 4 < T && T < 7
                ? ($ = F(D, "blink"))
                : 29 < T && T < 38
                  ? ($ = j(D, O.colors[T - 30]))
                  : 39 < T && T < 48
                    ? ($ = M(D, O.colors[T - 40]))
                    : 89 < T && T < 98
                      ? ($ = j(D, O.colors[8 + (T - 90)]))
                      : 99 < T &&
                        T < 108 &&
                        ($ = M(D, O.colors[8 + (T - 100)])),
            $
          );
        }
        b(v, "handleDisplay");
        function S(D) {
          var T = D.slice(0);
          return (
            (D.length = 0),
            T.reverse()
              .map(function (O) {
                return "</" + O + ">";
              })
              .join("")
          );
        }
        b(S, "resetStyles");
        function w(D, T) {
          for (var O = [], U = D; U <= T; U++) O.push(U);
          return O;
        }
        b(w, "range");
        function x(D) {
          return function (T) {
            return (D === null || T.category !== D) && D !== "all";
          };
        }
        b(x, "notCategory");
        function C(D) {
          D = parseInt(D, 10);
          var T = null;
          return (
            D === 0
              ? (T = "all")
              : D === 1
                ? (T = "bold")
                : 2 < D && D < 5
                  ? (T = "underline")
                  : 4 < D && D < 7
                    ? (T = "blink")
                    : D === 8
                      ? (T = "hide")
                      : D === 9
                        ? (T = "strike")
                        : (29 < D && D < 38) || D === 39 || (89 < D && D < 98)
                          ? (T = "foreground-color")
                          : ((39 < D && D < 48) ||
                              D === 49 ||
                              (99 < D && D < 108)) &&
                            (T = "background-color"),
            T
          );
        }
        b(C, "categoryForCode");
        function k(D, T) {
          return T.escapeXML ? l.encodeXML(D) : D;
        }
        b(k, "pushText");
        function F(D, T, O) {
          return (
            O || (O = ""),
            D.push(T),
            "<".concat(T).concat(O ? ' style="'.concat(O, '"') : "", ">")
          );
        }
        b(F, "pushTag");
        function _(D, T) {
          return F(D, "span", T);
        }
        b(_, "pushStyle");
        function j(D, T) {
          return F(D, "span", "color:" + T);
        }
        b(j, "pushForegroundColor");
        function M(D, T) {
          return F(D, "span", "background-color:" + T);
        }
        b(M, "pushBackgroundColor");
        function P(D, T) {
          var O;
          if ((D.slice(-1)[0] === T && (O = D.pop()), O)) return "</" + T + ">";
        }
        b(P, "closeTag");
        function W(D, T, O) {
          var U = !1,
            $ = 3;
          function X() {
            return "";
          }
          b(X, "remove");
          function se(Ne, Be) {
            return O("xterm256Foreground", Be), "";
          }
          b(se, "removeXterm256Foreground");
          function te(Ne, Be) {
            return O("xterm256Background", Be), "";
          }
          b(te, "removeXterm256Background");
          function Q(Ne) {
            return T.newline ? O("display", -1) : O("text", Ne), "";
          }
          b(Q, "newline");
          function re(Ne, Be) {
            (U = !0),
              Be.trim().length === 0 && (Be = "0"),
              (Be = Be.trimRight(";").split(";"));
            var lt = a(Be),
              qt;
            try {
              for (lt.s(); !(qt = lt.n()).done; ) {
                var Nr = qt.value;
                O("display", Nr);
              }
            } catch (jn) {
              lt.e(jn);
            } finally {
              lt.f();
            }
            return "";
          }
          b(re, "ansiMess");
          function ve(Ne) {
            return O("text", Ne), "";
          }
          b(ve, "realText");
          function de(Ne) {
            return O("rgb", Ne), "";
          }
          b(de, "rgb");
          var Fe = [
            { pattern: /^\x08+/, sub: X },
            { pattern: /^\x1b\[[012]?K/, sub: X },
            { pattern: /^\x1b\[\(B/, sub: X },
            { pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/, sub: de },
            { pattern: /^\x1b\[38;5;(\d+)m/, sub: se },
            { pattern: /^\x1b\[48;5;(\d+)m/, sub: te },
            { pattern: /^\n/, sub: Q },
            { pattern: /^\r+\n/, sub: Q },
            { pattern: /^\r/, sub: Q },
            { pattern: /^\x1b\[((?:\d{1,3};?)+|)m/, sub: re },
            { pattern: /^\x1b\[\d?J/, sub: X },
            { pattern: /^\x1b\[\d{0,3};\d{0,3}f/, sub: X },
            { pattern: /^\x1b\[?[\d;]{0,3}/, sub: X },
            { pattern: /^(([^\x1b\x08\r\n])+)/, sub: ve },
          ];
          function le(Ne, Be) {
            (Be > $ && U) || ((U = !1), (D = D.replace(Ne.pattern, Ne.sub)));
          }
          b(le, "process");
          var He = [],
            Ue = D,
            et = Ue.length;
          e: for (; et > 0; ) {
            for (var dr = 0, $t = 0, pr = Fe.length; $t < pr; dr = ++$t) {
              var Pr = Fe[dr];
              if ((le(Pr, dr), D.length !== et)) {
                et = D.length;
                continue e;
              }
            }
            if (D.length === et) break;
            He.push(0), (et = D.length);
          }
          return He;
        }
        b(W, "tokenize");
        function L(D, T, O) {
          return (
            T !== "text" &&
              ((D = D.filter(x(C(O)))),
              D.push({ token: T, data: O, category: C(O) })),
            D
          );
        }
        b(L, "updateStickyStack");
        var z = (function () {
          function D(T) {
            r(this, D),
              (T = T || {}),
              T.colors && (T.colors = Object.assign({}, c.colors, T.colors)),
              (this.options = Object.assign({}, c, T)),
              (this.stack = []),
              (this.stickyStack = []);
          }
          return (
            b(D, "Filter"),
            o(D, [
              {
                key: "toHtml",
                value: b(function (T) {
                  var O = this;
                  T = typeof T == "string" ? [T] : T;
                  var U = this.stack,
                    $ = this.options,
                    X = [];
                  return (
                    this.stickyStack.forEach(function (se) {
                      var te = g(U, se.token, se.data, $);
                      te && X.push(te);
                    }),
                    W(T.join(""), $, function (se, te) {
                      var Q = g(U, se, te, $);
                      Q && X.push(Q),
                        $.stream && (O.stickyStack = L(O.stickyStack, se, te));
                    }),
                    U.length && X.push(S(U)),
                    X.join("")
                  );
                }, "toHtml"),
              },
            ]),
            D
          );
        })();
        t.exports = z;
      }),
      De = (() => {
        let e;
        return (
          typeof window < "u"
            ? (e = window)
            : typeof globalThis < "u"
              ? (e = globalThis)
              : typeof window < "u"
                ? (e = window)
                : typeof self < "u"
                  ? (e = self)
                  : (e = {}),
          e
        );
      })();
    function tl() {
      let e = {
        setHandler: b(() => {}, "setHandler"),
        send: b(() => {}, "send"),
      };
      return new Qr({ transport: e });
    }
    b(tl, "mockChannel");
    var rl = class {
      constructor() {
        (this.getChannel = b(() => {
          if (!this.channel) {
            let t = tl();
            return this.setChannel(t), t;
          }
          return this.channel;
        }, "getChannel")),
          (this.ready = b(() => this.promise, "ready")),
          (this.hasChannel = b(() => !!this.channel, "hasChannel")),
          (this.setChannel = b((t) => {
            (this.channel = t), this.resolve();
          }, "setChannel")),
          (this.promise = new Promise((t) => {
            this.resolve = () => t(this.getChannel());
          }));
      }
    };
    b(rl, "AddonStore");
    var sf = rl,
      bo = "__STORYBOOK_ADDONS_PREVIEW";
    function nl() {
      return De[bo] || (De[bo] = new sf()), De[bo];
    }
    b(nl, "getAddonsStore");
    var Rt = nl();
    function lf(e) {
      return e;
    }
    b(lf, "definePreview");
    var ol = class {
      constructor() {
        (this.hookListsMap = void 0),
          (this.mountedDecorators = void 0),
          (this.prevMountedDecorators = void 0),
          (this.currentHooks = void 0),
          (this.nextHookIndex = void 0),
          (this.currentPhase = void 0),
          (this.currentEffects = void 0),
          (this.prevEffects = void 0),
          (this.currentDecoratorName = void 0),
          (this.hasUpdates = void 0),
          (this.currentContext = void 0),
          (this.renderListener = b((t) => {
            t === this.currentContext?.id &&
              (this.triggerEffects(),
              (this.currentContext = null),
              this.removeRenderListeners());
          }, "renderListener")),
          this.init();
      }
      init() {
        (this.hookListsMap = new WeakMap()),
          (this.mountedDecorators = new Set()),
          (this.prevMountedDecorators = new Set()),
          (this.currentHooks = []),
          (this.nextHookIndex = 0),
          (this.currentPhase = "NONE"),
          (this.currentEffects = []),
          (this.prevEffects = []),
          (this.currentDecoratorName = null),
          (this.hasUpdates = !1),
          (this.currentContext = null);
      }
      clean() {
        this.prevEffects.forEach((t) => {
          t.destroy && t.destroy();
        }),
          this.init(),
          this.removeRenderListeners();
      }
      getNextHook() {
        let t = this.currentHooks[this.nextHookIndex];
        return (this.nextHookIndex += 1), t;
      }
      triggerEffects() {
        this.prevEffects.forEach((t) => {
          !this.currentEffects.includes(t) && t.destroy && t.destroy();
        }),
          this.currentEffects.forEach((t) => {
            this.prevEffects.includes(t) || (t.destroy = t.create());
          }),
          (this.prevEffects = this.currentEffects),
          (this.currentEffects = []);
      }
      addRenderListeners() {
        this.removeRenderListeners(),
          Rt.getChannel().on(br, this.renderListener);
      }
      removeRenderListeners() {
        Rt.getChannel().removeListener(br, this.renderListener);
      }
    };
    b(ol, "HooksContext");
    var al = ol;
    function Co(e) {
      let t = b((...r) => {
        let { hooks: n } = typeof r[0] == "function" ? r[1] : r[0],
          o = n.currentPhase,
          a = n.currentHooks,
          i = n.nextHookIndex,
          s = n.currentDecoratorName;
        (n.currentDecoratorName = e.name),
          n.prevMountedDecorators.has(e)
            ? ((n.currentPhase = "UPDATE"),
              (n.currentHooks = n.hookListsMap.get(e) || []))
            : ((n.currentPhase = "MOUNT"),
              (n.currentHooks = []),
              n.hookListsMap.set(e, n.currentHooks),
              n.prevMountedDecorators.add(e)),
          (n.nextHookIndex = 0);
        let l = De.STORYBOOK_HOOKS_CONTEXT;
        De.STORYBOOK_HOOKS_CONTEXT = n;
        let c = e(...r);
        if (
          ((De.STORYBOOK_HOOKS_CONTEXT = l),
          n.currentPhase === "UPDATE" && n.getNextHook() != null)
        )
          throw new Error(
            "Rendered fewer hooks than expected. This may be caused by an accidental early return statement.",
          );
        return (
          (n.currentPhase = o),
          (n.currentHooks = a),
          (n.nextHookIndex = i),
          (n.currentDecoratorName = s),
          c
        );
      }, "hookified");
      return (t.originalFn = e), t;
    }
    b(Co, "hookify");
    var Eo = 0,
      uf = 25,
      cf = b(
        (e) => (t, r) => {
          let n = e(
            Co(t),
            r.map((o) => Co(o)),
          );
          return (o) => {
            let { hooks: a } = o;
            (a.prevMountedDecorators ??= new Set()),
              (a.mountedDecorators = new Set([t, ...r])),
              (a.currentContext = o),
              (a.hasUpdates = !1);
            let i = n(o);
            for (Eo = 1; a.hasUpdates; )
              if (
                ((a.hasUpdates = !1),
                (a.currentEffects = []),
                (i = n(o)),
                (Eo += 1),
                Eo > uf)
              )
                throw new Error(
                  "Too many re-renders. Storybook limits the number of renders to prevent an infinite loop.",
                );
            return a.addRenderListeners(), i;
          };
        },
        "applyHooks",
      ),
      df = b(
        (e, t) => e.length === t.length && e.every((r, n) => r === t[n]),
        "areDepsEqual",
      ),
      qo = b(
        () =>
          new Error(
            "Storybook preview hooks can only be called inside decorators and story functions.",
          ),
        "invalidHooksError",
      );
    function Vo() {
      return De.STORYBOOK_HOOKS_CONTEXT || null;
    }
    b(Vo, "getHooksContextOrNull");
    function dn() {
      let e = Vo();
      if (e == null) throw qo();
      return e;
    }
    b(dn, "getHooksContextOrThrow");
    function il(e, t, r) {
      let n = dn();
      if (n.currentPhase === "MOUNT") {
        r != null &&
          !Array.isArray(r) &&
          ee.warn(
            `${e} received a final argument that is not an array (instead, received ${r}). When specified, the final argument must be an array.`,
          );
        let o = { name: e, deps: r };
        return n.currentHooks.push(o), t(o), o;
      }
      if (n.currentPhase === "UPDATE") {
        let o = n.getNextHook();
        if (o == null)
          throw new Error(
            "Rendered more hooks than during the previous render.",
          );
        return (
          o.name !== e &&
            ee.warn(
              `Storybook has detected a change in the order of Hooks${n.currentDecoratorName ? ` called by ${n.currentDecoratorName}` : ""}. This will lead to bugs and errors if not fixed.`,
            ),
          r != null &&
            o.deps == null &&
            ee.warn(
              `${e} received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.`,
            ),
          r != null &&
            o.deps != null &&
            r.length !== o.deps.length &&
            ee.warn(`The final argument passed to ${e} changed size between renders. The order and size of this array must remain constant.
Previous: ${o.deps}
Incoming: ${r}`),
          (r == null || o.deps == null || !df(r, o.deps)) &&
            (t(o), (o.deps = r)),
          o
        );
      }
      throw qo();
    }
    b(il, "useHook");
    function Dr(e, t, r) {
      let { memoizedState: n } = il(
        e,
        (o) => {
          o.memoizedState = t();
        },
        r,
      );
      return n;
    }
    b(Dr, "useMemoLike");
    function pf(e, t) {
      return Dr("useMemo", e, t);
    }
    b(pf, "useMemo");
    function Ar(e, t) {
      return Dr("useCallback", () => e, t);
    }
    b(Ar, "useCallback");
    function Jo(e, t) {
      return Dr(e, () => ({ current: t }), []);
    }
    b(Jo, "useRefLike");
    function hf(e) {
      return Jo("useRef", e);
    }
    b(hf, "useRef");
    function sl() {
      let e = Vo();
      if (e != null && e.currentPhase !== "NONE") e.hasUpdates = !0;
      else
        try {
          Rt.getChannel().emit(Vr);
        } catch {
          ee.warn(
            "State updates of Storybook preview hooks work only in browser",
          );
        }
    }
    b(sl, "triggerUpdate");
    function zo(e, t) {
      let r = Jo(e, typeof t == "function" ? t() : t),
        n = b((o) => {
          (r.current = typeof o == "function" ? o(r.current) : o), sl();
        }, "setState");
      return [r.current, n];
    }
    b(zo, "useStateLike");
    function Ho(e) {
      return zo("useState", e);
    }
    b(Ho, "useState");
    function ff(e, t, r) {
      let n = r != null ? () => r(t) : t,
        [o, a] = zo("useReducer", n);
      return [o, b((i) => a((s) => e(s, i)), "dispatch")];
    }
    b(ff, "useReducer");
    function pn(e, t) {
      let r = dn(),
        n = Dr("useEffect", () => ({ create: e }), t);
      r.currentEffects.includes(n) || r.currentEffects.push(n);
    }
    b(pn, "useEffect");
    function mf(e, t = []) {
      let r = Rt.getChannel();
      return (
        pn(
          () => (
            Object.entries(e).forEach(([n, o]) => r.on(n, o)),
            () => {
              Object.entries(e).forEach(([n, o]) => r.removeListener(n, o));
            }
          ),
          [...Object.keys(e), ...t],
        ),
        Ar(r.emit.bind(r), [r])
      );
    }
    b(mf, "useChannel");
    function hn() {
      let { currentContext: e } = dn();
      if (e == null) throw qo();
      return e;
    }
    b(hn, "useStoryContext");
    function yf(e, t) {
      let { parameters: r } = hn();
      if (e) return r[e] ?? t;
    }
    b(yf, "useParameter");
    function gf() {
      let e = Rt.getChannel(),
        { id: t, args: r } = hn(),
        n = Ar((a) => e.emit(Gr, { storyId: t, updatedArgs: a }), [e, t]),
        o = Ar((a) => e.emit(Jr, { storyId: t, argNames: a }), [e, t]);
      return [r, n, o];
    }
    b(gf, "useArgs");
    function bf() {
      let e = Rt.getChannel(),
        { globals: t } = hn(),
        r = Ar((n) => e.emit(Hr, { globals: n }), [e]);
      return [t, r];
    }
    b(bf, "useGlobals");
    var TF = b(
      ({
        name: e,
        parameterName: t,
        wrapper: r,
        skipIfNoParametersOrOptions: n = !1,
      }) => {
        let o = b(
          (a) => (i, s) => {
            let l = s.parameters && s.parameters[t];
            return (l && l.disable) || (n && !a && !l)
              ? i(s)
              : r(i, s, { options: a, parameters: l });
          },
          "decorator",
        );
        return (...a) =>
          typeof a[0] == "function"
            ? o()(...a)
            : (...i) => {
                if (i.length > 1)
                  return a.length > 1 ? o(a)(...i) : o(...a)(...i);
                throw new Error(`Passing stories directly into ${e}() is not allowed,
        instead use addDecorator(${e}) and pass options with the '${t}' parameter`);
              };
      },
      "makeDecorator",
    );
    function me(e) {
      for (var t = [], r = 1; r < arguments.length; r++)
        t[r - 1] = arguments[r];
      var n = Array.from(typeof e == "string" ? [e] : e);
      n[n.length - 1] = n[n.length - 1].replace(/\r?\n([\t ]*)$/, "");
      var o = n.reduce(function (s, l) {
        var c = l.match(/\n([\t ]+|(?!\s).)/g);
        return c
          ? s.concat(
              c.map(function (p) {
                var h, d;
                return (d =
                  (h = p.match(/[\t ]/g)) === null || h === void 0
                    ? void 0
                    : h.length) !== null && d !== void 0
                  ? d
                  : 0;
              }),
            )
          : s;
      }, []);
      if (o.length) {
        var a = new RegExp(
          `
[	 ]{` +
            Math.min.apply(Math, o) +
            "}",
          "g",
        );
        n = n.map(function (s) {
          return s.replace(
            a,
            `
`,
          );
        });
      }
      n[0] = n[0].replace(/^\r?\n/, "");
      var i = n[0];
      return (
        t.forEach(function (s, l) {
          var c = i.match(/(?:^|\n)( *)$/),
            p = c ? c[1] : "",
            h = s;
          typeof s == "string" &&
            s.includes(`
`) &&
            (h = String(s)
              .split(
                `
`,
              )
              .map(function (d, y) {
                return y === 0 ? d : "" + p + d;
              }).join(`
`)),
            (i += h + n[l + 1]);
        }),
        i
      );
    }
    b(me, "dedent");
    var Ef = me,
      js = new Map(),
      vf = "UNIVERSAL_STORE:",
      Ve = { PENDING: "PENDING", RESOLVED: "RESOLVED", REJECTED: "REJECTED" },
      yt = class K {
        constructor(t, r) {
          if (
            ((this.debugging = !1),
            (this.listeners = new Map([["*", new Set()]])),
            (this.getState = b(
              () => (this.debug("getState", { state: this.state }), this.state),
              "getState",
            )),
            (this.subscribe = b((n, o) => {
              let a = typeof n == "function",
                i = a ? "*" : n,
                s = a ? n : o;
              if ((this.debug("subscribe", { eventType: i, listener: s }), !s))
                throw new TypeError(
                  `Missing first subscribe argument, or second if first is the event type, when subscribing to a UniversalStore with id '${this.id}'`,
                );
              return (
                this.listeners.has(i) || this.listeners.set(i, new Set()),
                this.listeners.get(i).add(s),
                () => {
                  this.debug("unsubscribe", { eventType: i, listener: s }),
                    this.listeners.has(i) &&
                      (this.listeners.get(i).delete(s),
                      this.listeners.get(i)?.size === 0 &&
                        this.listeners.delete(i));
                }
              );
            }, "subscribe")),
            (this.send = b((n) => {
              if (
                (this.debug("send", { event: n }),
                this.status !== K.Status.READY)
              )
                throw new TypeError(me`Cannot send event before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify({ event: n, id: this.id, actor: this.actor, environment: this.environment }, null, 2)}`);
              this.emitToListeners(n, { actor: this.actor }),
                this.emitToChannel(n, { actor: this.actor });
            }, "send")),
            (this.debugging = t.debug ?? !1),
            !K.isInternalConstructing)
          )
            throw new TypeError(
              "UniversalStore is not constructable - use UniversalStore.create() instead",
            );
          if (
            ((K.isInternalConstructing = !1),
            (this.id = t.id),
            (this.actorId = globalThis.crypto
              ? globalThis.crypto.randomUUID()
              : Date.now().toString(36) +
                Math.random().toString(36).substring(2)),
            (this.actorType = t.leader
              ? K.ActorType.LEADER
              : K.ActorType.FOLLOWER),
            (this.state = t.initialState),
            (this.channelEventName = `${vf}${this.id}`),
            this.debug("constructor", {
              options: t,
              environmentOverrides: r,
              channelEventName: this.channelEventName,
            }),
            this.actor.type === K.ActorType.LEADER)
          )
            this.syncing = { state: Ve.RESOLVED, promise: Promise.resolve() };
          else {
            let n,
              o,
              a = new Promise((i, s) => {
                (n = b(() => {
                  this.syncing.state === Ve.PENDING &&
                    ((this.syncing.state = Ve.RESOLVED), i());
                }, "syncingResolve")),
                  (o = b((l) => {
                    this.syncing.state === Ve.PENDING &&
                      ((this.syncing.state = Ve.REJECTED), s(l));
                  }, "syncingReject"));
              });
            this.syncing = {
              state: Ve.PENDING,
              promise: a,
              resolve: n,
              reject: o,
            };
          }
          (this.getState = this.getState.bind(this)),
            (this.setState = this.setState.bind(this)),
            (this.subscribe = this.subscribe.bind(this)),
            (this.onStateChange = this.onStateChange.bind(this)),
            (this.send = this.send.bind(this)),
            (this.emitToChannel = this.emitToChannel.bind(this)),
            (this.prepareThis = this.prepareThis.bind(this)),
            (this.emitToListeners = this.emitToListeners.bind(this)),
            (this.handleChannelEvents = this.handleChannelEvents.bind(this)),
            (this.debug = this.debug.bind(this)),
            (this.channel = r?.channel ?? K.preparation.channel),
            (this.environment = r?.environment ?? K.preparation.environment),
            this.channel && this.environment
              ? this.prepareThis({
                  channel: this.channel,
                  environment: this.environment,
                })
              : K.preparation.promise.then(this.prepareThis);
        }
        static setupPreparationPromise() {
          let t,
            r,
            n = new Promise((o, a) => {
              (t = b((i) => {
                o(i);
              }, "resolveRef")),
                (r = b((...i) => {
                  a(i);
                }, "rejectRef"));
            });
          K.preparation = { resolve: t, reject: r, promise: n };
        }
        get actor() {
          return Object.freeze({
            id: this.actorId,
            type: this.actorType,
            environment: this.environment ?? K.Environment.UNKNOWN,
          });
        }
        get status() {
          if (!this.channel || !this.environment) return K.Status.UNPREPARED;
          switch (this.syncing?.state) {
            case Ve.PENDING:
            case void 0:
              return K.Status.SYNCING;
            case Ve.REJECTED:
              return K.Status.ERROR;
            case Ve.RESOLVED:
            default:
              return K.Status.READY;
          }
        }
        untilReady() {
          return Promise.all([K.preparation.promise, this.syncing?.promise]);
        }
        static create(t) {
          if (!t || typeof t?.id != "string")
            throw new TypeError(
              "id is required and must be a string, when creating a UniversalStore",
            );
          t.debug &&
            console.debug(
              me`[UniversalStore]
        create`,
              { options: t },
            );
          let r = js.get(t.id);
          if (r)
            return (
              console.warn(me`UniversalStore with id "${t.id}" already exists in this environment, re-using existing.
        You should reuse the existing instance instead of trying to create a new one.`),
              r
            );
          K.isInternalConstructing = !0;
          let n = new K(t);
          return js.set(t.id, n), n;
        }
        static __prepare(t, r) {
          (K.preparation.channel = t),
            (K.preparation.environment = r),
            K.preparation.resolve({ channel: t, environment: r });
        }
        setState(t) {
          let r = this.state,
            n = typeof t == "function" ? t(r) : t;
          if (
            (this.debug("setState", {
              newState: n,
              previousState: r,
              updater: t,
            }),
            this.status !== K.Status.READY)
          )
            throw new TypeError(me`Cannot set state before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify({ newState: n, id: this.id, actor: this.actor, environment: this.environment }, null, 2)}`);
          this.state = n;
          let o = {
            type: K.InternalEventType.SET_STATE,
            payload: { state: n, previousState: r },
          };
          this.emitToChannel(o, { actor: this.actor }),
            this.emitToListeners(o, { actor: this.actor });
        }
        onStateChange(t) {
          return (
            this.debug("onStateChange", { listener: t }),
            this.subscribe(
              K.InternalEventType.SET_STATE,
              ({ payload: r }, n) => {
                t(r.state, r.previousState, n);
              },
            )
          );
        }
        emitToChannel(t, r) {
          this.debug("emitToChannel", {
            event: t,
            eventInfo: r,
            channel: this.channel,
          }),
            this.channel?.emit(this.channelEventName, {
              event: t,
              eventInfo: r,
            });
        }
        prepareThis({ channel: t, environment: r }) {
          (this.channel = t),
            (this.environment = r),
            this.debug("prepared", { channel: t, environment: r }),
            this.channel.on(this.channelEventName, this.handleChannelEvents),
            this.actor.type === K.ActorType.LEADER
              ? this.emitToChannel(
                  { type: K.InternalEventType.LEADER_CREATED },
                  { actor: this.actor },
                )
              : (this.emitToChannel(
                  { type: K.InternalEventType.FOLLOWER_CREATED },
                  { actor: this.actor },
                ),
                this.emitToChannel(
                  { type: K.InternalEventType.EXISTING_STATE_REQUEST },
                  { actor: this.actor },
                ),
                setTimeout(() => {
                  this.syncing.reject(
                    new TypeError(
                      `No existing state found for follower with id: '${this.id}'. Make sure a leader with the same id exists before creating a follower.`,
                    ),
                  );
                }, 1e3));
        }
        emitToListeners(t, r) {
          let n = this.listeners.get(t.type),
            o = this.listeners.get("*");
          this.debug("emitToListeners", {
            event: t,
            eventInfo: r,
            eventTypeListeners: n,
            everythingListeners: o,
          }),
            [...(n ?? []), ...(o ?? [])].forEach((a) => a(t, r));
        }
        handleChannelEvents(t) {
          let { event: r, eventInfo: n } = t;
          if ([n.actor.id, n.forwardingActor?.id].includes(this.actor.id)) {
            this.debug("handleChannelEvents: Ignoring event from self", {
              channelEvent: t,
            });
            return;
          } else if (
            this.syncing?.state === Ve.PENDING &&
            r.type !== K.InternalEventType.EXISTING_STATE_RESPONSE
          ) {
            this.debug("handleChannelEvents: Ignoring event while syncing", {
              channelEvent: t,
            });
            return;
          }
          if (
            (this.debug("handleChannelEvents", { channelEvent: t }),
            this.actor.type === K.ActorType.LEADER)
          ) {
            let o = !0;
            switch (r.type) {
              case K.InternalEventType.EXISTING_STATE_REQUEST:
                o = !1;
                let a = {
                  type: K.InternalEventType.EXISTING_STATE_RESPONSE,
                  payload: this.state,
                };
                this.debug(
                  "handleChannelEvents: responding to existing state request",
                  { responseEvent: a },
                ),
                  this.emitToChannel(a, { actor: this.actor });
                break;
              case K.InternalEventType.LEADER_CREATED:
                (o = !1),
                  (this.syncing.state = Ve.REJECTED),
                  this.debug(
                    "handleChannelEvents: erroring due to second leader being created",
                    { event: r },
                  ),
                  console.error(me`Detected multiple UniversalStore leaders created with the same id "${this.id}".
            Only one leader can exists at a time, your stores are now in an invalid state.
            Leaders detected:
            this: ${JSON.stringify(this.actor, null, 2)}
            other: ${JSON.stringify(n.actor, null, 2)}`);
                break;
            }
            o &&
              (this.debug("handleChannelEvents: forwarding event", {
                channelEvent: t,
              }),
              this.emitToChannel(r, {
                actor: n.actor,
                forwardingActor: this.actor,
              }));
          }
          if (this.actor.type === K.ActorType.FOLLOWER)
            switch (r.type) {
              case K.InternalEventType.EXISTING_STATE_RESPONSE:
                if (
                  (this.debug(
                    "handleChannelEvents: Setting state from leader's existing state response",
                    { event: r },
                  ),
                  this.syncing?.state !== Ve.PENDING)
                )
                  break;
                this.syncing.resolve?.();
                let o = {
                  type: K.InternalEventType.SET_STATE,
                  payload: { state: r.payload, previousState: this.state },
                };
                (this.state = r.payload), this.emitToListeners(o, n);
                break;
            }
          switch (r.type) {
            case K.InternalEventType.SET_STATE:
              this.debug("handleChannelEvents: Setting state", { event: r }),
                (this.state = r.payload.state);
              break;
          }
          this.emitToListeners(r, { actor: n.actor });
        }
        debug(t, r) {
          this.debugging &&
            console.debug(
              me`[UniversalStore::${this.id}::${this.environment ?? K.Environment.UNKNOWN}]
        ${t}`,
              JSON.stringify(
                {
                  data: r,
                  actor: this.actor,
                  state: this.state,
                  status: this.status,
                },
                null,
                2,
              ),
            );
        }
        static __reset() {
          K.preparation.reject(new Error("reset")),
            K.setupPreparationPromise(),
            (K.isInternalConstructing = !1);
        }
      };
    b(yt, "UniversalStore"),
      (yt.ActorType = { LEADER: "LEADER", FOLLOWER: "FOLLOWER" }),
      (yt.Environment = {
        SERVER: "SERVER",
        MANAGER: "MANAGER",
        PREVIEW: "PREVIEW",
        UNKNOWN: "UNKNOWN",
        MOCK: "MOCK",
      }),
      (yt.InternalEventType = {
        EXISTING_STATE_REQUEST: "__EXISTING_STATE_REQUEST",
        EXISTING_STATE_RESPONSE: "__EXISTING_STATE_RESPONSE",
        SET_STATE: "__SET_STATE",
        LEADER_CREATED: "__LEADER_CREATED",
        FOLLOWER_CREATED: "__FOLLOWER_CREATED",
      }),
      (yt.Status = {
        UNPREPARED: "UNPREPARED",
        SYNCING: "SYNCING",
        READY: "READY",
        ERROR: "ERROR",
      }),
      (yt.isInternalConstructing = !1),
      yt.setupPreparationPromise();
    var rn = yt;
    function ll(e, t) {
      let r = {},
        n = Object.entries(e);
      for (let o = 0; o < n.length; o++) {
        let [a, i] = n[o];
        t(i, a) || (r[a] = i);
      }
      return r;
    }
    b(ll, "omitBy");
    function ul(e, t) {
      let r = {};
      for (let n = 0; n < t.length; n++) {
        let o = t[n];
        Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
      }
      return r;
    }
    b(ul, "pick");
    function cl(e, t) {
      let r = {},
        n = Object.entries(e);
      for (let o = 0; o < n.length; o++) {
        let [a, i] = n[o];
        t(i, a) && (r[a] = i);
      }
      return r;
    }
    b(cl, "pickBy");
    function We(e) {
      if (typeof e != "object" || e == null) return !1;
      if (Object.getPrototypeOf(e) === null) return !0;
      if (e.toString() !== "[object Object]") return !1;
      let t = e;
      for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t);
      return Object.getPrototypeOf(e) === t;
    }
    b(We, "isPlainObject");
    function Ot(e, t) {
      let r = {},
        n = Object.keys(e);
      for (let o = 0; o < n.length; o++) {
        let a = n[o],
          i = e[a];
        r[a] = t(i, a, e);
      }
      return r;
    }
    b(Ot, "mapValues");
    var Af = "[object RegExp]",
      Df = "[object String]",
      Sf = "[object Number]",
      wf = "[object Boolean]",
      Ls = "[object Arguments]",
      Cf = "[object Symbol]",
      xf = "[object Date]",
      Tf = "[object Map]",
      Ff = "[object Set]",
      If = "[object Array]",
      kf = "[object Function]",
      Rf = "[object ArrayBuffer]",
      vo = "[object Object]",
      Of = "[object Error]",
      _f = "[object DataView]",
      Bf = "[object Uint8Array]",
      Pf = "[object Uint8ClampedArray]",
      Nf = "[object Uint16Array]",
      jf = "[object Uint32Array]",
      Lf = "[object BigUint64Array]",
      Mf = "[object Int8Array]",
      Uf = "[object Int16Array]",
      $f = "[object Int32Array]",
      qf = "[object BigInt64Array]",
      Vf = "[object Float32Array]",
      Jf = "[object Float64Array]";
    function xo(e) {
      return Object.getOwnPropertySymbols(e).filter((t) =>
        Object.prototype.propertyIsEnumerable.call(e, t),
      );
    }
    b(xo, "getSymbols");
    function To(e) {
      return e == null
        ? e === void 0
          ? "[object Undefined]"
          : "[object Null]"
        : Object.prototype.toString.call(e);
    }
    b(To, "getTag");
    function Go(e, t) {
      if (typeof e == typeof t)
        switch (typeof e) {
          case "bigint":
          case "string":
          case "boolean":
          case "symbol":
          case "undefined":
            return e === t;
          case "number":
            return e === t || Object.is(e, t);
          case "function":
            return e === t;
          case "object":
            return Xe(e, t);
        }
      return Xe(e, t);
    }
    b(Go, "isEqual");
    function Xe(e, t, r) {
      if (Object.is(e, t)) return !0;
      let n = To(e),
        o = To(t);
      if ((n === Ls && (n = vo), o === Ls && (o = vo), n !== o)) return !1;
      switch (n) {
        case Df:
          return e.toString() === t.toString();
        case Sf: {
          let s = e.valueOf(),
            l = t.valueOf();
          return s === l || (Number.isNaN(s) && Number.isNaN(l));
        }
        case wf:
        case xf:
        case Cf:
          return Object.is(e.valueOf(), t.valueOf());
        case Af:
          return e.source === t.source && e.flags === t.flags;
        case kf:
          return e === t;
      }
      r = r ?? new Map();
      let a = r.get(e),
        i = r.get(t);
      if (a != null && i != null) return a === t;
      r.set(e, t), r.set(t, e);
      try {
        switch (n) {
          case Tf: {
            if (e.size !== t.size) return !1;
            for (let [s, l] of e.entries())
              if (!t.has(s) || !Xe(l, t.get(s), r)) return !1;
            return !0;
          }
          case Ff: {
            if (e.size !== t.size) return !1;
            let s = Array.from(e.values()),
              l = Array.from(t.values());
            for (let c = 0; c < s.length; c++) {
              let p = s[c],
                h = l.findIndex((d) => Xe(p, d, r));
              if (h === -1) return !1;
              l.splice(h, 1);
            }
            return !0;
          }
          case If:
          case Bf:
          case Pf:
          case Nf:
          case jf:
          case Lf:
          case Mf:
          case Uf:
          case $f:
          case qf:
          case Vf:
          case Jf: {
            if (
              (typeof Buffer < "u" &&
                Buffer.isBuffer(e) !== Buffer.isBuffer(t)) ||
              e.length !== t.length
            )
              return !1;
            for (let s = 0; s < e.length; s++)
              if (!Xe(e[s], t[s], r)) return !1;
            return !0;
          }
          case Rf:
            return e.byteLength !== t.byteLength
              ? !1
              : Xe(new Uint8Array(e), new Uint8Array(t), r);
          case _f:
            return e.byteLength !== t.byteLength ||
              e.byteOffset !== t.byteOffset
              ? !1
              : Xe(e.buffer, t.buffer, r);
          case Of:
            return e.name === t.name && e.message === t.message;
          case vo: {
            if (!(Xe(e.constructor, t.constructor, r) || (We(e) && We(t))))
              return !1;
            let s = [...Object.keys(e), ...xo(e)],
              l = [...Object.keys(t), ...xo(t)];
            if (s.length !== l.length) return !1;
            for (let c = 0; c < s.length; c++) {
              let p = s[c],
                h = e[p];
              if (!Object.prototype.hasOwnProperty.call(t, p)) return !1;
              let d = t[p];
              if (!Xe(h, d, r)) return !1;
            }
            return !0;
          }
          default:
            return !1;
        }
      } finally {
        r.delete(e), r.delete(t);
      }
    }
    b(Xe, "areObjectsEqual");
    var IF = b((e, t) => {
        let [r, n] = Ho(t ? t(e.getState()) : e.getState());
        return (
          pn(
            () =>
              e.onStateChange((o, a) => {
                if (!t) {
                  n(o);
                  return;
                }
                let i = t(o),
                  s = t(a);
                !Go(i, s) && n(i);
              }),
            [e, n, t],
          ),
          [r, e.setState]
        );
      }, "useUniversalStore"),
      zf = class dl extends rn {
        constructor(t, r) {
          (rn.isInternalConstructing = !0),
            super(
              { ...t, leader: !0 },
              { channel: new Qr({}), environment: rn.Environment.MOCK },
            ),
            (rn.isInternalConstructing = !1),
            typeof r?.fn == "function" &&
              ((this.testUtils = r),
              (this.getState = r.fn(this.getState)),
              (this.setState = r.fn(this.setState)),
              (this.subscribe = r.fn(this.subscribe)),
              (this.onStateChange = r.fn(this.onStateChange)),
              (this.send = r.fn(this.send)));
        }
        static create(t, r) {
          return new dl(t, r);
        }
        unsubscribeAll() {
          if (!this.testUtils)
            throw new Error(Ef`Cannot call unsubscribeAll on a store that does not have testUtils.
        Please provide testUtils as the second argument when creating the store.`);
          let t = b((r) => {
            try {
              r.value();
            } catch {}
          }, "callReturnedUnsubscribeFn");
          this.subscribe.mock?.results.forEach(t),
            this.onStateChange.mock?.results.forEach(t);
        }
      };
    b(zf, "MockUniversalStore");
    var Ao = tr(Ys(), 1),
      Yt = Symbol("incompatible"),
      Fo = b((e, t) => {
        let r = t.type;
        if (e == null || !r || t.mapping) return e;
        switch (r.name) {
          case "string":
            return String(e);
          case "enum":
            return e;
          case "number":
            return Number(e);
          case "boolean":
            return String(e) === "true";
          case "array":
            return !r.value || !Array.isArray(e)
              ? Yt
              : e.reduce((n, o, a) => {
                  let i = Fo(o, { type: r.value });
                  return i !== Yt && (n[a] = i), n;
                }, new Array(e.length));
          case "object":
            return typeof e == "string" || typeof e == "number"
              ? e
              : !r.value || typeof e != "object"
                ? Yt
                : Object.entries(e).reduce((n, [o, a]) => {
                    let i = Fo(a, { type: r.value[o] });
                    return i === Yt ? n : Object.assign(n, { [o]: i });
                  }, {});
          default:
            return Yt;
        }
      }, "map"),
      Hf = b(
        (e, t) =>
          Object.entries(e).reduce((r, [n, o]) => {
            if (!t[n]) return r;
            let a = Fo(o, t[n]);
            return a === Yt ? r : Object.assign(r, { [n]: a });
          }, {}),
        "mapArgsToTypes",
      ),
      Io = b(
        (e, t) =>
          Array.isArray(e) && Array.isArray(t)
            ? t
                .reduce((r, n, o) => ((r[o] = Io(e[o], t[o])), r), [...e])
                .filter((r) => r !== void 0)
            : !We(e) || !We(t)
              ? t
              : Object.keys({ ...e, ...t }).reduce((r, n) => {
                  if (n in t) {
                    let o = Io(e[n], t[n]);
                    o !== void 0 && (r[n] = o);
                  } else r[n] = e[n];
                  return r;
                }, {}),
        "combineArgs",
      ),
      Gf = b(
        (e, t) =>
          Object.entries(t).reduce((r, [n, { options: o }]) => {
            function a() {
              return n in e && (r[n] = e[n]), r;
            }
            if ((b(a, "allowArg"), !o)) return a();
            if (!Array.isArray(o))
              return (
                mt.error(me`
        Invalid argType: '${n}.options' should be an array.

        More info: https://storybook.js.org/docs/api/arg-types
      `),
                a()
              );
            if (o.some((h) => h && ["object", "function"].includes(typeof h)))
              return (
                mt.error(me`
        Invalid argType: '${n}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
      `),
                a()
              );
            let i = Array.isArray(e[n]),
              s = i && e[n].findIndex((h) => !o.includes(h)),
              l = i && s === -1;
            if (e[n] === void 0 || o.includes(e[n]) || l) return a();
            let c = i ? `${n}[${s}]` : n,
              p = o
                .map((h) => (typeof h == "string" ? `'${h}'` : String(h)))
                .join(", ");
            return (
              mt.warn(
                `Received illegal value for '${c}'. Supported options: ${p}`,
              ),
              r
            );
          }, {}),
        "validateOptions",
      ),
      Er = Symbol("Deeply equal"),
      sn = b((e, t) => {
        if (typeof e != typeof t) return t;
        if (Go(e, t)) return Er;
        if (Array.isArray(e) && Array.isArray(t)) {
          let r = t.reduce((n, o, a) => {
            let i = sn(e[a], o);
            return i !== Er && (n[a] = i), n;
          }, new Array(t.length));
          return t.length >= e.length
            ? r
            : r.concat(new Array(e.length - t.length).fill(void 0));
        }
        return We(e) && We(t)
          ? Object.keys({ ...e, ...t }).reduce((r, n) => {
              let o = sn(e?.[n], t?.[n]);
              return o === Er ? r : Object.assign(r, { [n]: o });
            }, {})
          : t;
      }, "deepDiff"),
      pl = "UNTARGETED";
    function hl({ args: e, argTypes: t }) {
      let r = {};
      return (
        Object.entries(e).forEach(([n, o]) => {
          let { target: a = pl } = t[n] || {};
          (r[a] = r[a] || {}), (r[a][n] = o);
        }),
        r
      );
    }
    b(hl, "groupArgsByTarget");
    function fl(e) {
      return Object.keys(e).forEach((t) => e[t] === void 0 && delete e[t]), e;
    }
    b(fl, "deleteUndefined");
    var ml = class {
      constructor() {
        (this.initialArgsByStoryId = {}), (this.argsByStoryId = {});
      }
      get(t) {
        if (!(t in this.argsByStoryId))
          throw new Error(
            `No args known for ${t} -- has it been rendered yet?`,
          );
        return this.argsByStoryId[t];
      }
      setInitial(t) {
        if (!this.initialArgsByStoryId[t.id])
          (this.initialArgsByStoryId[t.id] = t.initialArgs),
            (this.argsByStoryId[t.id] = t.initialArgs);
        else if (this.initialArgsByStoryId[t.id] !== t.initialArgs) {
          let r = sn(this.initialArgsByStoryId[t.id], this.argsByStoryId[t.id]);
          (this.initialArgsByStoryId[t.id] = t.initialArgs),
            (this.argsByStoryId[t.id] = t.initialArgs),
            r !== Er && this.updateFromDelta(t, r);
        }
      }
      updateFromDelta(t, r) {
        let n = Gf(r, t.argTypes);
        this.argsByStoryId[t.id] = Io(this.argsByStoryId[t.id], n);
      }
      updateFromPersisted(t, r) {
        let n = Hf(r, t.argTypes);
        return this.updateFromDelta(t, n);
      }
      update(t, r) {
        if (!(t in this.argsByStoryId))
          throw new Error(
            `No args known for ${t} -- has it been rendered yet?`,
          );
        this.argsByStoryId[t] = fl({ ...this.argsByStoryId[t], ...r });
      }
    };
    b(ml, "ArgsStore");
    var Wf = ml,
      yl = b(
        (e = {}) =>
          Object.entries(e).reduce(
            (t, [r, { defaultValue: n }]) => (typeof n < "u" && (t[r] = n), t),
            {},
          ),
        "getValuesFromArgTypes",
      ),
      gl = class {
        constructor({ globals: t = {}, globalTypes: r = {} }) {
          this.set({ globals: t, globalTypes: r });
        }
        set({ globals: t = {}, globalTypes: r = {} }) {
          let n = this.initialGlobals && sn(this.initialGlobals, this.globals);
          this.allowedGlobalNames = new Set([
            ...Object.keys(t),
            ...Object.keys(r),
          ]);
          let o = yl(r);
          (this.initialGlobals = { ...o, ...t }),
            (this.globals = this.initialGlobals),
            n && n !== Er && this.updateFromPersisted(n);
        }
        filterAllowedGlobals(t) {
          return Object.entries(t).reduce(
            (r, [n, o]) => (
              this.allowedGlobalNames.has(n)
                ? (r[n] = o)
                : ee.warn(
                    `Attempted to set a global (${n}) that is not defined in initial globals or globalTypes`,
                  ),
              r
            ),
            {},
          );
        }
        updateFromPersisted(t) {
          let r = this.filterAllowedGlobals(t);
          this.globals = { ...this.globals, ...r };
        }
        get() {
          return this.globals;
        }
        update(t) {
          this.globals = { ...this.globals, ...this.filterAllowedGlobals(t) };
        }
      };
    b(gl, "GlobalsStore");
    var Kf = gl,
      Yf = tr(Ys(), 1),
      Xf = (0, Yf.default)(1)((e) =>
        Object.values(e).reduce(
          (t, r) => ((t[r.importPath] = t[r.importPath] || r), t),
          {},
        ),
      ),
      bl = class {
        constructor({ entries: t } = { v: 5, entries: {} }) {
          this.entries = t;
        }
        entryFromSpecifier(t) {
          let r = Object.values(this.entries);
          if (t === "*") return r[0];
          if (typeof t == "string")
            return this.entries[t]
              ? this.entries[t]
              : r.find((a) => a.id.startsWith(t));
          let { name: n, title: o } = t;
          return r.find((a) => a.name === n && a.title === o);
        }
        storyIdToEntry(t) {
          let r = this.entries[t];
          if (!r) throw new ds({ storyId: t });
          return r;
        }
        importPathToEntry(t) {
          return Xf(this.entries)[t];
        }
      };
    b(bl, "StoryIndexStore");
    var Qf = bl,
      Zf = b((e) => (typeof e == "string" ? { name: e } : e), "normalizeType"),
      em = b(
        (e) => (typeof e == "string" ? { type: e } : e),
        "normalizeControl",
      ),
      tm = b((e, t) => {
        let { type: r, control: n, ...o } = e,
          a = { name: t, ...o };
        return (
          r && (a.type = Zf(r)),
          n ? (a.control = em(n)) : n === !1 && (a.control = { disable: !0 }),
          a
        );
      }, "normalizeInputType"),
      ln = b((e) => Ot(e, tm), "normalizeInputTypes"),
      ue = b((e) => (Array.isArray(e) ? e : e ? [e] : []), "normalizeArrays"),
      rm = me`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
    function un(e, t, r) {
      let n = t,
        o = typeof t == "function" ? t : null,
        { story: a } = n;
      a && (ee.debug("deprecated story", a), nt(rm));
      let i = au(e),
        s = (typeof n != "function" && n.name) || n.storyName || a?.name || i,
        l = [...ue(n.decorators), ...ue(a?.decorators)],
        c = { ...a?.parameters, ...n.parameters },
        p = { ...a?.args, ...n.args },
        h = { ...a?.argTypes, ...n.argTypes },
        d = [...ue(n.loaders), ...ue(a?.loaders)],
        y = [...ue(n.beforeEach), ...ue(a?.beforeEach)],
        g = [...ue(n.experimental_afterEach), ...ue(a?.experimental_afterEach)],
        { render: A, play: v, tags: S = [], globals: w = {} } = n,
        x = c.__id || ou(r.id, i);
      return {
        moduleExport: t,
        id: x,
        name: s,
        tags: S,
        decorators: l,
        parameters: c,
        args: p,
        argTypes: ln(h),
        loaders: d,
        beforeEach: y,
        experimental_afterEach: g,
        globals: w,
        ...(A && { render: A }),
        ...(o && { userStoryFn: o }),
        ...(v && { play: v }),
      };
    }
    b(un, "normalizeStory");
    function cn(e, t = e.title, r) {
      let { id: n, argTypes: o } = e;
      return {
        id: Qo(n || t),
        ...e,
        title: t,
        ...(o && { argTypes: ln(o) }),
        parameters: { fileName: r, ...e.parameters },
      };
    }
    b(cn, "normalizeComponentAnnotations");
    var nm = b((e) => {
        let { globals: t, globalTypes: r } = e;
        (t || r) &&
          ee.error(
            "Global args/argTypes can only be set globally",
            JSON.stringify({ globals: t, globalTypes: r }),
          );
      }, "checkGlobals"),
      om = b((e) => {
        let { options: t } = e;
        t?.storySort &&
          ee.error("The storySort option parameter can only be set globally");
      }, "checkStorySort"),
      nn = b((e) => {
        e && (nm(e), om(e));
      }, "checkDisallowedParameters");
    function El(e, t, r) {
      let { default: n, __namedExportsOrder: o, ...a } = e,
        i = Object.values(a)[0];
      if (Bt(i)) {
        let c = cn(i.meta.input, r, t);
        nn(c.parameters);
        let p = { meta: c, stories: {}, moduleExports: e };
        return (
          Object.keys(a).forEach((h) => {
            if (er(h, c)) {
              let d = un(h, a[h].input, c);
              nn(d.parameters), (p.stories[d.id] = d);
            }
          }),
          (p.projectAnnotations = i.meta.preview.composed),
          p
        );
      }
      let s = cn(n, r, t);
      nn(s.parameters);
      let l = { meta: s, stories: {}, moduleExports: e };
      return (
        Object.keys(a).forEach((c) => {
          if (er(c, s)) {
            let p = un(c, a[c], s);
            nn(p.parameters), (l.stories[p.id] = p);
          }
        }),
        l
      );
    }
    b(El, "processCSFFile");
    function vl(e) {
      return e != null && Al(e).includes("mount");
    }
    b(vl, "mountDestructured");
    function Al(e) {
      let t = e.toString().match(/[^(]*\(([^)]*)/);
      if (!t) return [];
      let r = ko(t[1]);
      if (!r.length) return [];
      let n = r[0];
      return n.startsWith("{") && n.endsWith("}")
        ? ko(n.slice(1, -1).replace(/\s/g, "")).map((o) =>
            o.replace(/:.*|=.*/g, ""),
          )
        : [];
    }
    b(Al, "getUsedProps");
    function ko(e) {
      let t = [],
        r = [],
        n = 0;
      for (let a = 0; a < e.length; a++)
        if (e[a] === "{" || e[a] === "[") r.push(e[a] === "{" ? "}" : "]");
        else if (e[a] === r[r.length - 1]) r.pop();
        else if (!r.length && e[a] === ",") {
          let i = e.substring(n, a).trim();
          i && t.push(i), (n = a + 1);
        }
      let o = e.substring(n).trim();
      return o && t.push(o), t;
    }
    b(ko, "splitByComma");
    function Dl(e, t, r) {
      let n = r(e);
      return (o) => t(n, o);
    }
    b(Dl, "decorateStory");
    function Sl({
      componentId: e,
      title: t,
      kind: r,
      id: n,
      name: o,
      story: a,
      parameters: i,
      initialArgs: s,
      argTypes: l,
      ...c
    } = {}) {
      return c;
    }
    b(Sl, "sanitizeStoryContextUpdate");
    function wl(e, t) {
      let r = {},
        n = b(
          (a) => (i) => {
            if (!r.value)
              throw new Error("Decorated function called without init");
            return (r.value = { ...r.value, ...Sl(i) }), a(r.value);
          },
          "bindWithContext",
        ),
        o = t.reduce((a, i) => Dl(a, i, n), e);
      return (a) => ((r.value = a), o(a));
    }
    b(wl, "defaultDecorateStory");
    var at = b((...e) => {
      let t = {},
        r = e.filter(Boolean),
        n = r.reduce(
          (o, a) => (
            Object.entries(a).forEach(([i, s]) => {
              let l = o[i];
              Array.isArray(s) || typeof l > "u"
                ? (o[i] = s)
                : We(s) && We(l)
                  ? (t[i] = !0)
                  : typeof s < "u" && (o[i] = s);
            }),
            o
          ),
          {},
        );
      return (
        Object.keys(t).forEach((o) => {
          let a = r
            .filter(Boolean)
            .map((i) => i[o])
            .filter((i) => typeof i < "u");
          a.every((i) => We(i)) ? (n[o] = at(...a)) : (n[o] = a[a.length - 1]);
        }),
        n
      );
    }, "combineParameters");
    function Wo(e, t, r) {
      let { moduleExport: n, id: o, name: a } = e || {},
        i = Ko(e, t, r),
        s = b(async (F) => {
          let _ = {};
          for (let j of [
            ...("__STORYBOOK_TEST_LOADERS__" in De &&
            Array.isArray(De.__STORYBOOK_TEST_LOADERS__)
              ? [De.__STORYBOOK_TEST_LOADERS__]
              : []),
            ue(r.loaders),
            ue(t.loaders),
            ue(e.loaders),
          ]) {
            if (F.abortSignal.aborted) return _;
            let M = await Promise.all(j.map((P) => P(F)));
            Object.assign(_, ...M);
          }
          return _;
        }, "applyLoaders"),
        l = b(async (F) => {
          let _ = new Array();
          for (let j of [
            ...ue(r.beforeEach),
            ...ue(t.beforeEach),
            ...ue(e.beforeEach),
          ]) {
            if (F.abortSignal.aborted) return _;
            let M = await j(F);
            M && _.push(M);
          }
          return _;
        }, "applyBeforeEach"),
        c = b(async (F) => {
          let _ = [
            ...ue(r.experimental_afterEach),
            ...ue(t.experimental_afterEach),
            ...ue(e.experimental_afterEach),
          ].reverse();
          for (let j of _) {
            if (F.abortSignal.aborted) return;
            await j(F);
          }
        }, "applyAfterEach"),
        p = b((F) => F.originalStoryFn(F.args, F), "undecoratedStoryFn"),
        { applyDecorators: h = wl, runStep: d } = r,
        y = [...ue(e?.decorators), ...ue(t?.decorators), ...ue(r?.decorators)],
        g = e?.userStoryFn || e?.render || t.render || r.render,
        A = cf(h)(p, y),
        v = b((F) => A(F), "unboundStoryFn"),
        S = e?.play ?? t?.play,
        w = vl(S);
      if (!g && !w) throw new Rs({ id: o });
      let x = b(
          (F) => async () => (await F.renderToCanvas(), F.canvas),
          "defaultMount",
        ),
        C = e.mount ?? t.mount ?? r.mount ?? x,
        k = r.testingLibraryRender;
      return {
        storyGlobals: {},
        ...i,
        moduleExport: n,
        id: o,
        name: a,
        story: a,
        originalStoryFn: g,
        undecoratedStoryFn: p,
        unboundStoryFn: v,
        applyLoaders: s,
        applyBeforeEach: l,
        applyAfterEach: c,
        playFunction: S,
        runStep: d,
        mount: C,
        testingLibraryRender: k,
        renderToCanvas: r.renderToCanvas,
        usesMount: w,
      };
    }
    b(Wo, "prepareStory");
    function Cl(e, t, r) {
      return { ...Ko(void 0, e, t), moduleExport: r };
    }
    b(Cl, "prepareMeta");
    function Ko(e, t, r) {
      let n = ["dev", "test"],
        o = De.DOCS_OPTIONS?.autodocs === !0 ? ["autodocs"] : [],
        a = iu(
          ...n,
          ...o,
          ...(r.tags ?? []),
          ...(t.tags ?? []),
          ...(e?.tags ?? []),
        ),
        i = at(r.parameters, t.parameters, e?.parameters),
        { argTypesEnhancers: s = [], argsEnhancers: l = [] } = r,
        c = at(r.argTypes, t.argTypes, e?.argTypes);
      if (e) {
        let S = e?.userStoryFn || e?.render || t.render || r.render;
        i.__isArgsStory = S && S.length > 0;
      }
      let p = { ...r.args, ...t.args, ...e?.args },
        h = { ...t.globals, ...e?.globals },
        d = {
          componentId: t.id,
          title: t.title,
          kind: t.title,
          id: e?.id || t.id,
          name: e?.name || "__meta",
          story: e?.name || "__meta",
          component: t.component,
          subcomponents: t.subcomponents,
          tags: a,
          parameters: i,
          initialArgs: p,
          argTypes: c,
          storyGlobals: h,
        };
      d.argTypes = s.reduce((S, w) => w({ ...d, argTypes: S }), d.argTypes);
      let y = { ...p };
      d.initialArgs = l.reduce(
        (S, w) => ({ ...S, ...w({ ...d, initialArgs: S }) }),
        y,
      );
      let { name: g, story: A, ...v } = d;
      return v;
    }
    b(Ko, "preparePartialAnnotations");
    function Yo(e) {
      let { args: t } = e,
        r = { ...e, allArgs: void 0, argsByTarget: void 0 };
      if (De.FEATURES?.argTypeTargetsV7) {
        let a = hl(e);
        r = { ...e, allArgs: e.args, argsByTarget: a, args: a[pl] || {} };
      }
      let n = Object.entries(r.args).reduce((a, [i, s]) => {
          if (!r.argTypes[i]?.mapping) return (a[i] = s), a;
          let l = b((c) => {
            let p = r.argTypes[i].mapping;
            return p && c in p ? p[c] : c;
          }, "mappingFn");
          return (a[i] = Array.isArray(s) ? s.map(l) : l(s)), a;
        }, {}),
        o = Object.entries(n).reduce((a, [i, s]) => {
          let l = r.argTypes[i] || {};
          return mn(l, n, r.globals) && (a[i] = s), a;
        }, {});
      return { ...r, unmappedArgs: t, args: o };
    }
    b(Yo, "prepareContext");
    var Ro = b((e, t, r) => {
        let n = typeof e;
        switch (n) {
          case "boolean":
          case "string":
          case "number":
          case "function":
          case "symbol":
            return { name: n };
          default:
            break;
        }
        return e
          ? r.has(e)
            ? (ee.warn(me`
        We've detected a cycle in arg '${t}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `),
              { name: "other", value: "cyclic object" })
            : (r.add(e),
              Array.isArray(e)
                ? {
                    name: "array",
                    value:
                      e.length > 0
                        ? Ro(e[0], t, new Set(r))
                        : { name: "other", value: "unknown" },
                  }
                : { name: "object", value: Ot(e, (o) => Ro(o, t, new Set(r))) })
          : { name: "object", value: {} };
      }, "inferType"),
      xl = b((e) => {
        let { id: t, argTypes: r = {}, initialArgs: n = {} } = e,
          o = Ot(n, (i, s) => ({
            name: s,
            type: Ro(i, `${t}.${s}`, new Set()),
          })),
          a = Ot(r, (i, s) => ({ name: s }));
        return at(o, a, r);
      }, "inferArgTypes");
    xl.secondPass = !0;
    var Ms = b(
        (e, t) => (Array.isArray(t) ? t.includes(e) : e.match(t)),
        "matches",
      ),
      am = b(
        (e, t, r) =>
          !t && !r
            ? e
            : e &&
              cl(e, (n, o) => {
                let a = n.name || o.toString();
                return !!(!t || Ms(a, t)) && (!r || !Ms(a, r));
              }),
        "filterArgTypes",
      ),
      im = b((e, t, r) => {
        let { type: n, options: o } = e;
        if (n) {
          if (r.color && r.color.test(t)) {
            let a = n.name;
            if (a === "string") return { control: { type: "color" } };
            a !== "enum" &&
              ee.warn(
                `Addon controls: Control of type color only supports string, received "${a}" instead`,
              );
          }
          if (r.date && r.date.test(t)) return { control: { type: "date" } };
          switch (n.name) {
            case "array":
              return { control: { type: "object" } };
            case "boolean":
              return { control: { type: "boolean" } };
            case "string":
              return { control: { type: "text" } };
            case "number":
              return { control: { type: "number" } };
            case "enum": {
              let { value: a } = n;
              return {
                control: { type: a?.length <= 5 ? "radio" : "select" },
                options: a,
              };
            }
            case "function":
            case "symbol":
              return null;
            default:
              return { control: { type: o ? "select" : "object" } };
          }
        }
      }, "inferControl"),
      Tl = b((e) => {
        let {
          argTypes: t,
          parameters: {
            __isArgsStory: r,
            controls: {
              include: n = null,
              exclude: o = null,
              matchers: a = {},
            } = {},
          },
        } = e;
        if (!r) return t;
        let i = am(t, n, o),
          s = Ot(i, (l, c) => l?.type && im(l, c.toString(), a));
        return at(s, i);
      }, "inferControls");
    Tl.secondPass = !0;
    function Qt({
      argTypes: e,
      globalTypes: t,
      argTypesEnhancers: r,
      decorators: n,
      loaders: o,
      beforeEach: a,
      experimental_afterEach: i,
      globals: s,
      initialGlobals: l,
      ...c
    }) {
      return (
        s &&
          Object.keys(s).length > 0 &&
          nt(me`
      The preview.js 'globals' field is deprecated and will be removed in Storybook 9.0.
      Please use 'initialGlobals' instead. Learn more:

      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#previewjs-globals-renamed-to-initialglobals
    `),
        {
          ...(e && { argTypes: ln(e) }),
          ...(t && { globalTypes: ln(t) }),
          decorators: ue(n),
          loaders: ue(o),
          beforeEach: ue(a),
          experimental_afterEach: ue(i),
          argTypesEnhancers: [...(r || []), xl, Tl],
          initialGlobals: at(l, s),
          ...c,
        }
      );
    }
    b(Qt, "normalizeProjectAnnotations");
    var sm = b(
      (e) => async () => {
        let t = [];
        for (let r of e) {
          let n = await r();
          n && t.unshift(n);
        }
        return async () => {
          for (let r of t) await r();
        };
      },
      "composeBeforeAllHooks",
    );
    function Fl(e) {
      return async (t, r, n) => {
        await e.reduceRight(
          (o, a) => async () => a(t, o, n),
          async () => r(n),
        )();
      };
    }
    b(Fl, "composeStepRunners");
    function Zt(e, t) {
      return e.map((r) => r.default?.[t] ?? r[t]).filter(Boolean);
    }
    b(Zt, "getField");
    function ot(e, t, r = {}) {
      return Zt(e, t).reduce((n, o) => {
        let a = ue(o);
        return r.reverseFileOrder ? [...a, ...n] : [...n, ...a];
      }, []);
    }
    b(ot, "getArrayField");
    function Xt(e, t) {
      return Object.assign({}, ...Zt(e, t));
    }
    b(Xt, "getObjectField");
    function It(e, t) {
      return Zt(e, t).pop();
    }
    b(It, "getSingletonField");
    function _t(e) {
      let t = ot(e, "argTypesEnhancers"),
        r = Zt(e, "runStep"),
        n = ot(e, "beforeAll");
      return {
        parameters: at(...Zt(e, "parameters")),
        decorators: ot(e, "decorators", {
          reverseFileOrder: !(De.FEATURES?.legacyDecoratorFileOrder ?? !1),
        }),
        args: Xt(e, "args"),
        argsEnhancers: ot(e, "argsEnhancers"),
        argTypes: Xt(e, "argTypes"),
        argTypesEnhancers: [
          ...t.filter((o) => !o.secondPass),
          ...t.filter((o) => o.secondPass),
        ],
        globals: Xt(e, "globals"),
        initialGlobals: Xt(e, "initialGlobals"),
        globalTypes: Xt(e, "globalTypes"),
        loaders: ot(e, "loaders"),
        beforeAll: sm(n),
        beforeEach: ot(e, "beforeEach"),
        experimental_afterEach: ot(e, "experimental_afterEach"),
        render: It(e, "render"),
        renderToCanvas: It(e, "renderToCanvas"),
        renderToDOM: It(e, "renderToDOM"),
        applyDecorators: It(e, "applyDecorators"),
        runStep: Fl(r),
        tags: ot(e, "tags"),
        mount: It(e, "mount"),
        testingLibraryRender: It(e, "testingLibraryRender"),
      };
    }
    b(_t, "composeConfigs");
    var Il = class {
      constructor() {
        this.reports = [];
      }
      async addReport(t) {
        this.reports.push(t);
      }
    };
    b(Il, "ReporterAPI");
    var kl = Il;
    function Rl(e, t, r) {
      return Bt(e)
        ? {
            story: e.input,
            meta: e.meta.input,
            preview: e.meta.preview.composed,
          }
        : { story: e, meta: t, preview: r };
    }
    b(Rl, "getCsfFactoryAnnotations");
    function lm(e) {
      globalThis.defaultProjectAnnotations = e;
    }
    b(lm, "setDefaultProjectAnnotations");
    var um = "ComposedStory",
      cm = "Unnamed Story";
    function Ol(e) {
      return e ? _t([e]) : {};
    }
    b(Ol, "extractAnnotation");
    function dm(e) {
      let t = Array.isArray(e) ? e : [e];
      return (
        (globalThis.globalProjectAnnotations = _t([
          globalThis.defaultProjectAnnotations ?? {},
          _t(t.map(Ol)),
        ])),
        globalThis.globalProjectAnnotations ?? {}
      );
    }
    b(dm, "setProjectAnnotations");
    var gt = [];
    function _l(e, t, r, n, o) {
      if (e === void 0)
        throw new Error("Expected a story but received undefined.");
      t.title = t.title ?? um;
      let a = cn(t),
        i = o || e.storyName || e.story?.name || e.name || cm,
        s = un(i, e, a),
        l = Qt(_t([n ?? globalThis.globalProjectAnnotations ?? {}, r ?? {}])),
        c = Wo(s, a, l),
        p = { ...yl(l.globalTypes), ...l.initialGlobals, ...c.storyGlobals },
        h = new kl(),
        d = b(() => {
          let S = Yo({
            hooks: new al(),
            globals: p,
            args: { ...c.initialArgs },
            viewMode: "story",
            reporting: h,
            loaded: {},
            abortSignal: new AbortController().signal,
            step: b((w, x) => c.runStep(w, x, S), "step"),
            canvasElement: null,
            canvas: {},
            globalTypes: l.globalTypes,
            ...c,
            context: null,
            mount: null,
          });
          return (
            (S.parameters.__isPortableStory = !0),
            (S.context = S),
            c.renderToCanvas &&
              (S.renderToCanvas = async () => {
                let w = await c.renderToCanvas?.(
                  {
                    componentId: c.componentId,
                    title: c.title,
                    id: c.id,
                    name: c.name,
                    tags: c.tags,
                    showMain: b(() => {}, "showMain"),
                    showError: b((x) => {
                      throw new Error(`${x.title}
${x.description}`);
                    }, "showError"),
                    showException: b((x) => {
                      throw x;
                    }, "showException"),
                    forceRemount: !0,
                    storyContext: S,
                    storyFn: b(() => c.unboundStoryFn(S), "storyFn"),
                    unboundStoryFn: c.unboundStoryFn,
                  },
                  S.canvasElement,
                );
                w && gt.push(w);
              }),
            (S.mount = c.mount(S)),
            S
          );
        }, "initializeContext"),
        y,
        g = b(async (S) => {
          let w = d();
          return (
            (w.canvasElement ??= globalThis?.document?.body),
            y && (w.loaded = y.loaded),
            Object.assign(w, S),
            c.playFunction(w)
          );
        }, "play"),
        A = b((S) => {
          let w = d();
          return Object.assign(w, S), Bl(c, w);
        }, "run"),
        v = c.playFunction ? g : void 0;
      return Object.assign(
        b(function (S) {
          let w = d();
          return (
            y && (w.loaded = y.loaded),
            (w.args = { ...w.initialArgs, ...S }),
            c.unboundStoryFn(w)
          );
        }, "storyFn"),
        {
          id: c.id,
          storyName: i,
          load: b(async () => {
            for (let w of [...gt].reverse()) await w();
            gt.length = 0;
            let S = d();
            (S.loaded = await c.applyLoaders(S)),
              gt.push(...(await c.applyBeforeEach(S)).filter(Boolean)),
              (y = S);
          }, "load"),
          globals: p,
          args: c.initialArgs,
          parameters: c.parameters,
          argTypes: c.argTypes,
          play: v,
          run: A,
          reporting: h,
          tags: c.tags,
        },
      );
    }
    b(_l, "composeStory");
    var pm = b((e, t, r, n) => _l(e, t, r, {}, n), "defaultComposeStory");
    function hm(e, t, r = pm) {
      let { default: n, __esModule: o, __namedExportsOrder: a, ...i } = e,
        s = n;
      return Object.entries(i).reduce((l, [c, p]) => {
        let { story: h, meta: d } = Rl(p);
        return (
          !s && d && (s = d),
          er(c, s) ? Object.assign(l, { [c]: r(h, s, t, c) }) : l
        );
      }, {});
    }
    b(hm, "composeStories");
    function fm(e) {
      return e.extend({
        mount: b(async ({ mount: t, page: r }, n) => {
          await n(async (o, ...a) => {
            if (
              !("__pw_type" in o) ||
              ("__pw_type" in o && o.__pw_type !== "jsx")
            )
              throw new Error(me`
              Portable stories in Playwright CT only work when referencing JSX elements.
              Please use JSX format for your components such as:

              instead of:
              await mount(MyComponent, { props: { foo: 'bar' } })

              do:
              await mount(<MyComponent foo="bar"/>)

              More info: https://storybook.js.org/docs/api/portable-stories-playwright
            `);
            await r.evaluate(async (s) => {
              let l = await globalThis.__pwUnwrapObject?.(s);
              return ("__pw_type" in l ? l.type : l)?.load?.();
            }, o);
            let i = await t(o, ...a);
            return (
              await r.evaluate(async (s) => {
                let l = await globalThis.__pwUnwrapObject?.(s),
                  c = "__pw_type" in l ? l.type : l,
                  p = document.querySelector("#root");
                return c?.play?.({ canvasElement: p });
              }, o),
              i
            );
          });
        }, "mount"),
      });
    }
    b(fm, "createPlaywrightTest");
    async function Bl(e, t) {
      for (let o of [...gt].reverse()) await o();
      if (((gt.length = 0), !t.canvasElement)) {
        let o = document.createElement("div");
        globalThis?.document?.body?.appendChild(o),
          (t.canvasElement = o),
          gt.push(() => {
            globalThis?.document?.body?.contains(o) &&
              globalThis?.document?.body?.removeChild(o);
          });
      }
      if (((t.loaded = await e.applyLoaders(t)), t.abortSignal.aborted)) return;
      gt.push(...(await e.applyBeforeEach(t)).filter(Boolean));
      let r = e.playFunction,
        n = e.usesMount;
      n || (await t.mount()),
        !t.abortSignal.aborted &&
          (r &&
            (n ||
              (t.mount = async () => {
                throw new Zr({ playFunction: r.toString() });
              }),
            await r(t)),
          await e.applyAfterEach(t));
    }
    b(Bl, "runStory");
    function Oo(e, t) {
      return ll(ul(e, t), (r) => r === void 0);
    }
    b(Oo, "picky");
    var Us = 1e3,
      mm = 1e4,
      Pl = class {
        constructor(t, r, n) {
          (this.importFn = r),
            (this.getStoriesJsonData = b(() => {
              let i = this.getSetStoriesPayload(),
                s = [
                  "fileName",
                  "docsOnly",
                  "framework",
                  "__id",
                  "__isArgsStory",
                ];
              return {
                v: 3,
                stories: Ot(i.stories, (l) => {
                  let { importPath: c } = this.storyIndex.entries[l.id];
                  return {
                    ...Oo(l, ["id", "name", "title"]),
                    importPath: c,
                    kind: l.title,
                    story: l.name,
                    parameters: { ...Oo(l.parameters, s), fileName: c },
                  };
                }),
              };
            }, "getStoriesJsonData")),
            (this.storyIndex = new Qf(t)),
            (this.projectAnnotations = Qt(n));
          let { initialGlobals: o, globalTypes: a } = this.projectAnnotations;
          (this.args = new Wf()),
            (this.userGlobals = new Kf({ globals: o, globalTypes: a })),
            (this.hooks = {}),
            (this.cleanupCallbacks = {}),
            (this.processCSFFileWithCache = (0, Ao.default)(Us)(El)),
            (this.prepareMetaWithCache = (0, Ao.default)(Us)(Cl)),
            (this.prepareStoryWithCache = (0, Ao.default)(mm)(Wo));
        }
        setProjectAnnotations(t) {
          this.projectAnnotations = Qt(t);
          let { initialGlobals: r, globalTypes: n } = t;
          this.userGlobals.set({ globals: r, globalTypes: n });
        }
        async onStoriesChanged({ importFn: t, storyIndex: r }) {
          t && (this.importFn = t),
            r && (this.storyIndex.entries = r.entries),
            this.cachedCSFFiles && (await this.cacheAllCSFFiles());
        }
        async storyIdToEntry(t) {
          return this.storyIndex.storyIdToEntry(t);
        }
        async loadCSFFileByStoryId(t) {
          let { importPath: r, title: n } = this.storyIndex.storyIdToEntry(t),
            o = await this.importFn(r);
          return this.processCSFFileWithCache(o, r, n);
        }
        async loadAllCSFFiles() {
          let t = {};
          return (
            Object.entries(this.storyIndex.entries).forEach(
              ([r, { importPath: n }]) => {
                t[n] = r;
              },
            ),
            (
              await Promise.all(
                Object.entries(t).map(async ([r, n]) => ({
                  importPath: r,
                  csfFile: await this.loadCSFFileByStoryId(n),
                })),
              )
            ).reduce((r, { importPath: n, csfFile: o }) => ((r[n] = o), r), {})
          );
        }
        async cacheAllCSFFiles() {
          this.cachedCSFFiles = await this.loadAllCSFFiles();
        }
        preparedMetaFromCSFFile({ csfFile: t }) {
          let r = t.meta;
          return this.prepareMetaWithCache(
            r,
            this.projectAnnotations,
            t.moduleExports.default,
          );
        }
        async loadStory({ storyId: t }) {
          let r = await this.loadCSFFileByStoryId(t);
          return this.storyFromCSFFile({ storyId: t, csfFile: r });
        }
        storyFromCSFFile({ storyId: t, csfFile: r }) {
          let n = r.stories[t];
          if (!n) throw new xs({ storyId: t });
          let o = r.meta,
            a = this.prepareStoryWithCache(
              n,
              o,
              r.projectAnnotations ?? this.projectAnnotations,
            );
          return (
            this.args.setInitial(a),
            (this.hooks[a.id] = this.hooks[a.id] || new al()),
            a
          );
        }
        componentStoriesFromCSFFile({ csfFile: t }) {
          return Object.keys(this.storyIndex.entries)
            .filter((r) => !!t.stories[r])
            .map((r) => this.storyFromCSFFile({ storyId: r, csfFile: t }));
        }
        async loadEntry(t) {
          let r = await this.storyIdToEntry(t),
            n = r.type === "docs" ? r.storiesImports : [],
            [o, ...a] = await Promise.all([
              this.importFn(r.importPath),
              ...n.map((i) => {
                let s = this.storyIndex.importPathToEntry(i);
                return this.loadCSFFileByStoryId(s.id);
              }),
            ]);
          return { entryExports: o, csfFiles: a };
        }
        getStoryContext(t, { forceInitialArgs: r = !1 } = {}) {
          let n = this.userGlobals.get(),
            { initialGlobals: o } = this.userGlobals,
            a = new kl();
          return Yo({
            ...t,
            args: r ? t.initialArgs : this.args.get(t.id),
            initialGlobals: o,
            globalTypes: this.projectAnnotations.globalTypes,
            userGlobals: n,
            reporting: a,
            globals: { ...n, ...t.storyGlobals },
            hooks: this.hooks[t.id],
          });
        }
        addCleanupCallbacks(t, r) {
          this.cleanupCallbacks[t.id] = r;
        }
        async cleanupStory(t) {
          this.hooks[t.id].clean();
          let r = this.cleanupCallbacks[t.id];
          if (r) for (let n of [...r].reverse()) await n();
          delete this.cleanupCallbacks[t.id];
        }
        extract(t = { includeDocsOnly: !1 }) {
          let { cachedCSFFiles: r } = this;
          if (!r) throw new hs();
          return Object.entries(this.storyIndex.entries).reduce(
            (n, [o, { type: a, importPath: i }]) => {
              if (a === "docs") return n;
              let s = r[i],
                l = this.storyFromCSFFile({ storyId: o, csfFile: s });
              return (
                (!t.includeDocsOnly && l.parameters.docsOnly) ||
                  (n[o] = Object.entries(l).reduce(
                    (c, [p, h]) =>
                      p === "moduleExport" || typeof h == "function"
                        ? c
                        : Array.isArray(h)
                          ? Object.assign(c, { [p]: h.slice().sort() })
                          : Object.assign(c, { [p]: h }),
                    {
                      args: l.initialArgs,
                      globals: {
                        ...this.userGlobals.initialGlobals,
                        ...this.userGlobals.globals,
                        ...l.storyGlobals,
                      },
                    },
                  )),
                n
              );
            },
            {},
          );
        }
        getSetStoriesPayload() {
          let t = this.extract({ includeDocsOnly: !0 }),
            r = Object.values(t).reduce(
              (n, { title: o }) => ((n[o] = {}), n),
              {},
            );
          return {
            v: 2,
            globals: this.userGlobals.get(),
            globalParameters: {},
            kindParameters: r,
            stories: t,
          };
        }
        raw() {
          return (
            nt(
              "StoryStore.raw() is deprecated and will be removed in 9.0, please use extract() instead",
            ),
            Object.values(this.extract())
              .map(({ id: t }) => this.fromId(t))
              .filter(Boolean)
          );
        }
        fromId(t) {
          if (
            (nt(
              "StoryStore.fromId() is deprecated and will be removed in 9.0, please use loadStory() instead",
            ),
            !this.cachedCSFFiles)
          )
            throw new Error(
              "Cannot call fromId/raw() unless you call cacheAllCSFFiles() first.",
            );
          let r;
          try {
            ({ importPath: r } = this.storyIndex.storyIdToEntry(t));
          } catch {
            return null;
          }
          let n = this.cachedCSFFiles[r],
            o = this.storyFromCSFFile({ storyId: t, csfFile: n });
          return {
            ...o,
            storyFn: b((a) => {
              let i = {
                ...this.getStoryContext(o),
                abortSignal: new AbortController().signal,
                canvasElement: null,
                loaded: {},
                step: b((s, l) => o.runStep(s, l, i), "step"),
                context: null,
                mount: null,
                canvas: {},
                viewMode: "story",
              };
              return o.unboundStoryFn({ ...i, ...a });
            }, "storyFn"),
          };
        }
      };
    b(Pl, "StoryStore");
    var ym = Pl;
    function Nl(e) {
      return e.startsWith("\\\\?\\") ? e : e.replace(/\\/g, "/");
    }
    b(Nl, "slash");
    var gm = b((e) => {
      if (e.length === 0) return e;
      let t = e[e.length - 1],
        r = t?.replace(/(?:[.](?:story|stories))?([.][^.]+)$/i, "");
      if (e.length === 1) return [r];
      let n = e[e.length - 2];
      return r && n && r.toLowerCase() === n.toLowerCase()
        ? [...e.slice(0, -2), r]
        : r && (/^(story|stories)([.][^.]+)$/i.test(t) || /^index$/i.test(r))
          ? e.slice(0, -1)
          : [...e.slice(0, -1), r];
    }, "sanitize");
    function _o(e) {
      return e
        .flatMap((t) => t.split("/"))
        .filter(Boolean)
        .join("/");
    }
    b(_o, "pathJoin");
    var bm = b((e, t, r) => {
        let {
          directory: n,
          importPathMatcher: o,
          titlePrefix: a = "",
        } = t || {};
        typeof e == "number" &&
          mt.warn(me`
      CSF Auto-title received a numeric fileName. This typically happens when
      webpack is mis-configured in production mode. To force webpack to produce
      filenames, set optimization.moduleIds = "named" in your webpack config.
    `);
        let i = Nl(String(e));
        if (o.exec(i)) {
          if (!r) {
            let s = i.replace(n, ""),
              l = _o([a, s]).split("/");
            return (l = gm(l)), l.join("/");
          }
          return a ? _o([a, r]) : r;
        }
      }, "userOrAutoTitleFromSpecifier"),
      t5 = b((e, t, r) => {
        for (let n = 0; n < t.length; n += 1) {
          let o = bm(e, t[n], r);
          if (o) return o;
        }
        return r || void 0;
      }, "userOrAutoTitle"),
      $s = /\s*\/\s*/,
      Em = b(
        (e = {}) =>
          (t, r) => {
            if (t.title === r.title && !e.includeNames) return 0;
            let n = e.method || "configure",
              o = e.order || [],
              a = t.title.trim().split($s),
              i = r.title.trim().split($s);
            e.includeNames && (a.push(t.name), i.push(r.name));
            let s = 0;
            for (; a[s] || i[s]; ) {
              if (!a[s]) return -1;
              if (!i[s]) return 1;
              let l = a[s],
                c = i[s];
              if (l !== c) {
                let h = o.indexOf(l),
                  d = o.indexOf(c),
                  y = o.indexOf("*");
                return h !== -1 || d !== -1
                  ? (h === -1 && (y !== -1 ? (h = y) : (h = o.length)),
                    d === -1 && (y !== -1 ? (d = y) : (d = o.length)),
                    h - d)
                  : n === "configure"
                    ? 0
                    : l.localeCompare(c, e.locales ? e.locales : void 0, {
                        numeric: !0,
                        sensitivity: "accent",
                      });
              }
              let p = o.indexOf(l);
              p === -1 && (p = o.indexOf("*")),
                (o = p !== -1 && Array.isArray(o[p + 1]) ? o[p + 1] : []),
                (s += 1);
            }
            return 0;
          },
        "storySort",
      ),
      vm = b((e, t, r) => {
        if (t) {
          let n;
          typeof t == "function" ? (n = t) : (n = Em(t)), e.sort(n);
        } else
          e.sort((n, o) => r.indexOf(n.importPath) - r.indexOf(o.importPath));
        return e;
      }, "sortStoriesCommon"),
      r5 = b((e, t, r) => {
        try {
          return vm(e, t, r);
        } catch (n) {
          throw new Error(me`
    Error sorting stories with sort parameter ${t}:

    > ${n.message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
        }
      }, "sortStoriesV7"),
      fn = new Error("prepareAborted"),
      { AbortController: qs } = globalThis;
    function Bo(e) {
      try {
        let { name: t = "Error", message: r = String(e), stack: n } = e;
        return { name: t, message: r, stack: n };
      } catch {
        return { name: "Error", message: String(e) };
      }
    }
    b(Bo, "serializeError");
    var jl = class {
      constructor(
        t,
        r,
        n,
        o,
        a,
        i,
        s = { autoplay: !0, forceInitialArgs: !1 },
        l,
      ) {
        (this.channel = t),
          (this.store = r),
          (this.renderToScreen = n),
          (this.callbacks = o),
          (this.id = a),
          (this.viewMode = i),
          (this.renderOptions = s),
          (this.type = "story"),
          (this.notYetRendered = !0),
          (this.rerenderEnqueued = !1),
          (this.disableKeyListeners = !1),
          (this.teardownRender = b(() => {}, "teardownRender")),
          (this.torndown = !1),
          (this.abortController = new qs()),
          l && ((this.story = l), (this.phase = "preparing"));
      }
      async runPhase(t, r, n) {
        (this.phase = r),
          this.channel.emit(Kt, { newPhase: this.phase, storyId: this.id }),
          n && (await n(), this.checkIfAborted(t));
      }
      checkIfAborted(t) {
        return t.aborted
          ? ((this.phase = "aborted"),
            this.channel.emit(Kt, { newPhase: this.phase, storyId: this.id }),
            !0)
          : !1;
      }
      async prepare() {
        if (
          (await this.runPhase(
            this.abortController.signal,
            "preparing",
            async () => {
              this.story = await this.store.loadStory({ storyId: this.id });
            },
          ),
          this.abortController.signal.aborted)
        )
          throw (await this.store.cleanupStory(this.story), fn);
      }
      isEqual(t) {
        return !!(this.id === t.id && this.story && this.story === t.story);
      }
      isPreparing() {
        return ["preparing"].includes(this.phase);
      }
      isPending() {
        return [
          "loading",
          "beforeEach",
          "rendering",
          "playing",
          "afterEach",
        ].includes(this.phase);
      }
      async renderToElement(t) {
        return (
          (this.canvasElement = t),
          this.render({ initial: !0, forceRemount: !0 })
        );
      }
      storyContext() {
        if (!this.story)
          throw new Error("Cannot call storyContext before preparing");
        let { forceInitialArgs: t } = this.renderOptions;
        return this.store.getStoryContext(this.story, { forceInitialArgs: t });
      }
      async render({ initial: t = !1, forceRemount: r = !1 } = {}) {
        let { canvasElement: n } = this;
        if (!this.story) throw new Error("cannot render when not prepared");
        let o = this.story;
        if (!n) throw new Error("cannot render when canvasElement is unset");
        let {
          id: a,
          componentId: i,
          title: s,
          name: l,
          tags: c,
          applyLoaders: p,
          applyBeforeEach: h,
          applyAfterEach: d,
          unboundStoryFn: y,
          playFunction: g,
          runStep: A,
        } = o;
        r && !t && (this.cancelRender(), (this.abortController = new qs()));
        let v = this.abortController.signal,
          S = !1,
          w = o.usesMount;
        try {
          let x = {
            ...this.storyContext(),
            viewMode: this.viewMode,
            abortSignal: v,
            canvasElement: n,
            loaded: {},
            step: b((L, z) => A(L, z, x), "step"),
            context: null,
            canvas: {},
            renderToCanvas: b(async () => {
              let L = await this.renderToScreen(C, n);
              (this.teardownRender = L || (() => {})), (S = !0);
            }, "renderToCanvas"),
            mount: b(async (...L) => {
              this.callbacks.showStoryDuringRender?.();
              let z = null;
              return (
                await this.runPhase(v, "rendering", async () => {
                  z = await o.mount(x)(...L);
                }),
                w && (await this.runPhase(v, "playing")),
                z
              );
            }, "mount"),
          };
          x.context = x;
          let C = {
            componentId: i,
            title: s,
            kind: s,
            id: a,
            name: l,
            story: l,
            tags: c,
            ...this.callbacks,
            showError: b(
              (L) => ((this.phase = "errored"), this.callbacks.showError(L)),
              "showError",
            ),
            showException: b(
              (L) => (
                (this.phase = "errored"), this.callbacks.showException(L)
              ),
              "showException",
            ),
            forceRemount: r || this.notYetRendered,
            storyContext: x,
            storyFn: b(() => y(x), "storyFn"),
            unboundStoryFn: y,
          };
          if (
            (await this.runPhase(v, "loading", async () => {
              x.loaded = await p(x);
            }),
            v.aborted)
          )
            return;
          let k = await h(x);
          if (
            (this.store.addCleanupCallbacks(o, k),
            this.checkIfAborted(v) ||
              (!S && !w && (await x.mount()),
              (this.notYetRendered = !1),
              v.aborted))
          )
            return;
          let F =
              this.story.parameters?.test?.dangerouslyIgnoreUnhandledErrors ===
              !0,
            _ = new Set(),
            j = b((L) => _.add("error" in L ? L.error : L.reason), "onError");
          if (
            this.renderOptions.autoplay &&
            r &&
            g &&
            this.phase !== "errored"
          ) {
            window.addEventListener("error", j),
              window.addEventListener("unhandledrejection", j),
              (this.disableKeyListeners = !0);
            try {
              if (
                (w
                  ? await g(x)
                  : ((x.mount = async () => {
                      throw new Zr({ playFunction: g.toString() });
                    }),
                    await this.runPhase(v, "playing", async () => g(x))),
                !S)
              )
                throw new _s();
              this.checkIfAborted(v),
                !F && _.size > 0
                  ? await this.runPhase(v, "errored")
                  : await this.runPhase(v, "played");
            } catch (L) {
              if (
                (this.callbacks.showStoryDuringRender?.(),
                await this.runPhase(v, "errored", async () => {
                  this.channel.emit(Si, Bo(L));
                }),
                this.story.parameters.throwPlayFunctionExceptions !== !1)
              )
                throw L;
              console.error(L);
            }
            if (
              (!F && _.size > 0 && this.channel.emit(Ni, Array.from(_).map(Bo)),
              (this.disableKeyListeners = !1),
              window.removeEventListener("unhandledrejection", j),
              window.removeEventListener("error", j),
              v.aborted)
            )
              return;
          }
          await this.runPhase(v, "completed", async () =>
            this.channel.emit(br, a),
          ),
            this.phase !== "errored" &&
              (await this.runPhase(v, "afterEach", async () => {
                await d(x);
              }));
          let M = !F && _.size > 0,
            P = x.reporting.reports.some((L) => L.status === "failed"),
            W = M || P;
          await this.runPhase(v, "finished", async () =>
            this.channel.emit(oo, {
              storyId: a,
              status: W ? "error" : "success",
              reporters: x.reporting.reports,
            }),
          );
        } catch (x) {
          (this.phase = "errored"),
            this.callbacks.showException(x),
            await this.runPhase(v, "finished", async () =>
              this.channel.emit(oo, {
                storyId: a,
                status: "error",
                reporters: [],
              }),
            );
        }
        this.rerenderEnqueued && ((this.rerenderEnqueued = !1), this.render());
      }
      async rerender() {
        if (this.isPending() && this.phase !== "playing")
          this.rerenderEnqueued = !0;
        else return this.render();
      }
      async remount() {
        return await this.teardown(), this.render({ forceRemount: !0 });
      }
      cancelRender() {
        this.abortController?.abort();
      }
      async teardown() {
        (this.torndown = !0),
          this.cancelRender(),
          this.story && (await this.store.cleanupStory(this.story));
        for (let t = 0; t < 3; t += 1) {
          if (!this.isPending()) {
            await this.teardownRender();
            return;
          }
          await new Promise((r) => setTimeout(r, 0));
        }
        window.location.reload(), await new Promise(() => {});
      }
    };
    b(jl, "StoryRender");
    var Po = jl,
      { fetch: Am } = De,
      Dm = "./index.json",
      Ll = class {
        constructor(t, r, n = Rt.getChannel(), o = !0) {
          (this.importFn = t),
            (this.getProjectAnnotations = r),
            (this.channel = n),
            (this.storyRenders = []),
            (this.storeInitializationPromise = new Promise((a, i) => {
              (this.resolveStoreInitializationPromise = a),
                (this.rejectStoreInitializationPromise = i);
            })),
            o && this.initialize();
        }
        get storyStore() {
          return new Proxy(
            {},
            {
              get: b((t, r) => {
                if (this.storyStoreValue)
                  return (
                    nt(
                      "Accessing the Story Store is deprecated and will be removed in 9.0",
                    ),
                    this.storyStoreValue[r]
                  );
                throw new Fs();
              }, "get"),
            },
          );
        }
        async initialize() {
          this.setupListeners();
          try {
            let t = await this.getProjectAnnotationsOrRenderError();
            await this.runBeforeAllHook(t),
              await this.initializeWithProjectAnnotations(t);
          } catch (t) {
            this.rejectStoreInitializationPromise(t);
          }
        }
        ready() {
          return this.storeInitializationPromise;
        }
        setupListeners() {
          this.channel.on(Ri, this.onStoryIndexChanged.bind(this)),
            this.channel.on(Hr, this.onUpdateGlobals.bind(this)),
            this.channel.on(Gr, this.onUpdateArgs.bind(this)),
            this.channel.on(bi, this.onRequestArgTypesInfo.bind(this)),
            this.channel.on(Jr, this.onResetArgs.bind(this)),
            this.channel.on(Vr, this.onForceReRender.bind(this)),
            this.channel.on(Ai, this.onForceRemount.bind(this));
        }
        async getProjectAnnotationsOrRenderError() {
          try {
            let t = await this.getProjectAnnotations();
            if (
              ((this.renderToCanvas = t.renderToCanvas), !this.renderToCanvas)
            )
              throw new ms();
            return t;
          } catch (t) {
            throw (
              (this.renderPreviewEntryError("Error reading preview.js:", t), t)
            );
          }
        }
        async initializeWithProjectAnnotations(t) {
          this.projectAnnotationsBeforeInitialization = t;
          try {
            let r = await this.getStoryIndexFromServer();
            return this.initializeWithStoryIndex(r);
          } catch (r) {
            throw (
              (this.renderPreviewEntryError("Error loading story index:", r), r)
            );
          }
        }
        async runBeforeAllHook(t) {
          try {
            await this.beforeAllCleanup?.(),
              (this.beforeAllCleanup = await t.beforeAll?.());
          } catch (r) {
            throw (
              (this.renderPreviewEntryError("Error in beforeAll hook:", r), r)
            );
          }
        }
        async getStoryIndexFromServer() {
          let t = await Am(Dm);
          if (t.status === 200) return t.json();
          throw new bs({ text: await t.text() });
        }
        initializeWithStoryIndex(t) {
          if (!this.projectAnnotationsBeforeInitialization)
            throw new Error(
              "Cannot call initializeWithStoryIndex until project annotations resolve",
            );
          (this.storyStoreValue = new ym(
            t,
            this.importFn,
            this.projectAnnotationsBeforeInitialization,
          )),
            delete this.projectAnnotationsBeforeInitialization,
            this.setInitialGlobals(),
            this.resolveStoreInitializationPromise();
        }
        async setInitialGlobals() {
          this.emitGlobals();
        }
        emitGlobals() {
          if (!this.storyStoreValue)
            throw new Me({ methodName: "emitGlobals" });
          let t = {
            globals: this.storyStoreValue.userGlobals.get() || {},
            globalTypes:
              this.storyStoreValue.projectAnnotations.globalTypes || {},
          };
          this.channel.emit(Ti, t);
        }
        async onGetProjectAnnotationsChanged({ getProjectAnnotations: t }) {
          delete this.previewEntryError, (this.getProjectAnnotations = t);
          let r = await this.getProjectAnnotationsOrRenderError();
          if ((await this.runBeforeAllHook(r), !this.storyStoreValue)) {
            await this.initializeWithProjectAnnotations(r);
            return;
          }
          this.storyStoreValue.setProjectAnnotations(r), this.emitGlobals();
        }
        async onStoryIndexChanged() {
          if (
            (delete this.previewEntryError,
            !(
              !this.storyStoreValue &&
              !this.projectAnnotationsBeforeInitialization
            ))
          )
            try {
              let t = await this.getStoryIndexFromServer();
              if (this.projectAnnotationsBeforeInitialization) {
                this.initializeWithStoryIndex(t);
                return;
              }
              await this.onStoriesChanged({ storyIndex: t });
            } catch (t) {
              throw (
                (this.renderPreviewEntryError("Error loading story index:", t),
                t)
              );
            }
        }
        async onStoriesChanged({ importFn: t, storyIndex: r }) {
          if (!this.storyStoreValue)
            throw new Me({ methodName: "onStoriesChanged" });
          await this.storyStoreValue.onStoriesChanged({
            importFn: t,
            storyIndex: r,
          });
        }
        async onUpdateGlobals({ globals: t, currentStory: r }) {
          if (
            (this.storyStoreValue || (await this.storeInitializationPromise),
            !this.storyStoreValue)
          )
            throw new Me({ methodName: "onUpdateGlobals" });
          if ((this.storyStoreValue.userGlobals.update(t), r)) {
            let {
              initialGlobals: n,
              storyGlobals: o,
              userGlobals: a,
              globals: i,
            } = this.storyStoreValue.getStoryContext(r);
            this.channel.emit(Wt, {
              initialGlobals: n,
              userGlobals: a,
              storyGlobals: o,
              globals: i,
            });
          } else {
            let { initialGlobals: n, globals: o } =
              this.storyStoreValue.userGlobals;
            this.channel.emit(Wt, {
              initialGlobals: n,
              userGlobals: o,
              storyGlobals: {},
              globals: o,
            });
          }
          await Promise.all(this.storyRenders.map((n) => n.rerender()));
        }
        async onUpdateArgs({ storyId: t, updatedArgs: r }) {
          if (!this.storyStoreValue)
            throw new Me({ methodName: "onUpdateArgs" });
          this.storyStoreValue.args.update(t, r),
            await Promise.all(
              this.storyRenders
                .filter((n) => n.id === t && !n.renderOptions.forceInitialArgs)
                .map((n) =>
                  n.story && n.story.usesMount ? n.remount() : n.rerender(),
                ),
            ),
            this.channel.emit(Fi, {
              storyId: t,
              args: this.storyStoreValue.args.get(t),
            });
        }
        async onRequestArgTypesInfo({ id: t, payload: r }) {
          try {
            await this.storeInitializationPromise;
            let n = await this.storyStoreValue?.loadStory(r);
            this.channel.emit(to, {
              id: t,
              success: !0,
              payload: { argTypes: n?.argTypes || {} },
              error: null,
            });
          } catch (n) {
            this.channel.emit(to, { id: t, success: !1, error: n?.message });
          }
        }
        async onResetArgs({ storyId: t, argNames: r }) {
          if (!this.storyStoreValue)
            throw new Me({ methodName: "onResetArgs" });
          let n =
              this.storyRenders.find((a) => a.id === t)?.story ||
              (await this.storyStoreValue.loadStory({ storyId: t })),
            o = (
              r || [
                ...new Set([
                  ...Object.keys(n.initialArgs),
                  ...Object.keys(this.storyStoreValue.args.get(t)),
                ]),
              ]
            ).reduce((a, i) => ((a[i] = n.initialArgs[i]), a), {});
          await this.onUpdateArgs({ storyId: t, updatedArgs: o });
        }
        async onForceReRender() {
          await Promise.all(this.storyRenders.map((t) => t.rerender()));
        }
        async onForceRemount({ storyId: t }) {
          await Promise.all(
            this.storyRenders.filter((r) => r.id === t).map((r) => r.remount()),
          );
        }
        renderStoryToElement(t, r, n, o) {
          if (!this.renderToCanvas || !this.storyStoreValue)
            throw new Me({ methodName: "renderStoryToElement" });
          let a = new Po(
            this.channel,
            this.storyStoreValue,
            this.renderToCanvas,
            n,
            t.id,
            "docs",
            o,
            t,
          );
          return (
            a.renderToElement(r),
            this.storyRenders.push(a),
            async () => {
              await this.teardownRender(a);
            }
          );
        }
        async teardownRender(t, { viewModeChanged: r } = {}) {
          (this.storyRenders = this.storyRenders.filter((n) => n !== t)),
            await t?.teardown?.({ viewModeChanged: r });
        }
        async loadStory({ storyId: t }) {
          if (!this.storyStoreValue) throw new Me({ methodName: "loadStory" });
          return this.storyStoreValue.loadStory({ storyId: t });
        }
        getStoryContext(t, { forceInitialArgs: r = !1 } = {}) {
          if (!this.storyStoreValue)
            throw new Me({ methodName: "getStoryContext" });
          return this.storyStoreValue.getStoryContext(t, {
            forceInitialArgs: r,
          });
        }
        async extract(t) {
          if (!this.storyStoreValue) throw new Me({ methodName: "extract" });
          if (this.previewEntryError) throw this.previewEntryError;
          return (
            await this.storyStoreValue.cacheAllCSFFiles(),
            this.storyStoreValue.extract(t)
          );
        }
        renderPreviewEntryError(t, r) {
          (this.previewEntryError = r),
            ee.error(t),
            ee.error(r),
            this.channel.emit(Ei, r);
        }
      };
    b(Ll, "Preview");
    var Sm = Ll,
      wm = !1,
      Do = "Invariant failed";
    function on(e, t) {
      if (!e) {
        if (wm) throw new Error(Do);
        var r = typeof t == "function" ? t() : t,
          n = r ? "".concat(Do, ": ").concat(r) : Do;
        throw new Error(n);
      }
    }
    b(on, "invariant");
    var Ml = class {
      constructor(t, r, n, o) {
        (this.channel = t),
          (this.store = r),
          (this.renderStoryToElement = n),
          (this.storyIdByName = b((a) => {
            let i = this.nameToStoryId.get(a);
            if (i) return i;
            throw new Error(`No story found with that name: ${a}`);
          }, "storyIdByName")),
          (this.componentStories = b(
            () => this.componentStoriesValue,
            "componentStories",
          )),
          (this.componentStoriesFromCSFFile = b(
            (a) => this.store.componentStoriesFromCSFFile({ csfFile: a }),
            "componentStoriesFromCSFFile",
          )),
          (this.storyById = b((a) => {
            if (!a) {
              if (!this.primaryStory)
                throw new Error(
                  "No primary story defined for docs entry. Did you forget to use `<Meta>`?",
                );
              return this.primaryStory;
            }
            let i = this.storyIdToCSFFile.get(a);
            if (!i)
              throw new Error(
                `Called \`storyById\` for story that was never loaded: ${a}`,
              );
            return this.store.storyFromCSFFile({ storyId: a, csfFile: i });
          }, "storyById")),
          (this.getStoryContext = b(
            (a) => ({
              ...this.store.getStoryContext(a),
              loaded: {},
              viewMode: "docs",
            }),
            "getStoryContext",
          )),
          (this.loadStory = b(
            (a) => this.store.loadStory({ storyId: a }),
            "loadStory",
          )),
          (this.componentStoriesValue = []),
          (this.storyIdToCSFFile = new Map()),
          (this.exportToStory = new Map()),
          (this.exportsToCSFFile = new Map()),
          (this.nameToStoryId = new Map()),
          (this.attachedCSFFiles = new Set()),
          o.forEach((a, i) => {
            this.referenceCSFFile(a);
          });
      }
      referenceCSFFile(t) {
        this.exportsToCSFFile.set(t.moduleExports, t),
          this.exportsToCSFFile.set(t.moduleExports.default, t),
          this.store
            .componentStoriesFromCSFFile({ csfFile: t })
            .forEach((r) => {
              let n = t.stories[r.id];
              this.storyIdToCSFFile.set(n.id, t),
                this.exportToStory.set(n.moduleExport, r);
            });
      }
      attachCSFFile(t) {
        if (!this.exportsToCSFFile.has(t.moduleExports))
          throw new Error(
            "Cannot attach a CSF file that has not been referenced",
          );
        this.attachedCSFFiles.has(t) ||
          (this.attachedCSFFiles.add(t),
          this.store
            .componentStoriesFromCSFFile({ csfFile: t })
            .forEach((r) => {
              this.nameToStoryId.set(r.name, r.id),
                this.componentStoriesValue.push(r),
                this.primaryStory || (this.primaryStory = r);
            }));
      }
      referenceMeta(t, r) {
        let n = this.resolveModuleExport(t);
        if (n.type !== "meta")
          throw new Error(
            "<Meta of={} /> must reference a CSF file module export or meta export. Did you mistakenly reference your component instead of your CSF file?",
          );
        r && this.attachCSFFile(n.csfFile);
      }
      get projectAnnotations() {
        let { projectAnnotations: t } = this.store;
        if (!t)
          throw new Error(
            "Can't get projectAnnotations from DocsContext before they are initialized",
          );
        return t;
      }
      resolveAttachedModuleExportType(t) {
        if (t === "story") {
          if (!this.primaryStory)
            throw new Error(
              "No primary story attached to this docs file, did you forget to use <Meta of={} />?",
            );
          return { type: "story", story: this.primaryStory };
        }
        if (this.attachedCSFFiles.size === 0)
          throw new Error(
            "No CSF file attached to this docs file, did you forget to use <Meta of={} />?",
          );
        let r = Array.from(this.attachedCSFFiles)[0];
        if (t === "meta") return { type: "meta", csfFile: r };
        let { component: n } = r.meta;
        if (!n)
          throw new Error(
            "Attached CSF file does not defined a component, did you forget to export one?",
          );
        return { type: "component", component: n };
      }
      resolveModuleExport(t) {
        let r = this.exportsToCSFFile.get(t);
        if (r) return { type: "meta", csfFile: r };
        let n = this.exportToStory.get(Bt(t) ? t.input : t);
        return n
          ? { type: "story", story: n }
          : { type: "component", component: t };
      }
      resolveOf(t, r = []) {
        let n;
        if (["component", "meta", "story"].includes(t)) {
          let o = t;
          n = this.resolveAttachedModuleExportType(o);
        } else n = this.resolveModuleExport(t);
        if (r.length && !r.includes(n.type)) {
          let o = n.type === "component" ? "component or unknown" : n.type;
          throw new Error(me`Invalid value passed to the 'of' prop. The value was resolved to a '${o}' type but the only types for this block are: ${r.join(", ")}.
        - Did you pass a component to the 'of' prop when the block only supports a story or a meta?
        - ... or vice versa?
        - Did you pass a story, CSF file or meta to the 'of' prop that is not indexed, ie. is not targeted by the 'stories' globs in the main configuration?`);
        }
        switch (n.type) {
          case "component":
            return { ...n, projectAnnotations: this.projectAnnotations };
          case "meta":
            return {
              ...n,
              preparedMeta: this.store.preparedMetaFromCSFFile({
                csfFile: n.csfFile,
              }),
            };
          case "story":
          default:
            return n;
        }
      }
    };
    b(Ml, "DocsContext");
    var Ul = Ml,
      $l = class {
        constructor(t, r, n, o) {
          (this.channel = t),
            (this.store = r),
            (this.entry = n),
            (this.callbacks = o),
            (this.type = "docs"),
            (this.subtype = "csf"),
            (this.torndown = !1),
            (this.disableKeyListeners = !1),
            (this.preparing = !1),
            (this.id = n.id);
        }
        isPreparing() {
          return this.preparing;
        }
        async prepare() {
          this.preparing = !0;
          let { entryExports: t, csfFiles: r = [] } =
            await this.store.loadEntry(this.id);
          if (this.torndown) throw fn;
          let { importPath: n, title: o } = this.entry,
            a = this.store.processCSFFileWithCache(t, n, o),
            i = Object.keys(a.stories)[0];
          (this.story = this.store.storyFromCSFFile({
            storyId: i,
            csfFile: a,
          })),
            (this.csfFiles = [a, ...r]),
            (this.preparing = !1);
        }
        isEqual(t) {
          return !!(this.id === t.id && this.story && this.story === t.story);
        }
        docsContext(t) {
          if (!this.csfFiles)
            throw new Error("Cannot render docs before preparing");
          let r = new Ul(this.channel, this.store, t, this.csfFiles);
          return this.csfFiles.forEach((n) => r.attachCSFFile(n)), r;
        }
        async renderToElement(t, r) {
          if (!this.story || !this.csfFiles)
            throw new Error("Cannot render docs before preparing");
          let n = this.docsContext(r),
            { docs: o } = this.story.parameters || {};
          if (!o)
            throw new Error(
              "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed",
            );
          let a = await o.renderer(),
            { render: i } = a,
            s = b(async () => {
              try {
                await i(n, o, t), this.channel.emit(qr, this.id);
              } catch (l) {
                this.callbacks.showException(l);
              }
            }, "renderDocs");
          return (
            (this.rerender = async () => s()),
            (this.teardownRender = async ({ viewModeChanged: l }) => {
              !l || !t || a.unmount(t);
            }),
            s()
          );
        }
        async teardown({ viewModeChanged: t } = {}) {
          this.teardownRender?.({ viewModeChanged: t }), (this.torndown = !0);
        }
      };
    b($l, "CsfDocsRender");
    var Vs = $l,
      ql = class {
        constructor(t, r, n, o) {
          (this.channel = t),
            (this.store = r),
            (this.entry = n),
            (this.callbacks = o),
            (this.type = "docs"),
            (this.subtype = "mdx"),
            (this.torndown = !1),
            (this.disableKeyListeners = !1),
            (this.preparing = !1),
            (this.id = n.id);
        }
        isPreparing() {
          return this.preparing;
        }
        async prepare() {
          this.preparing = !0;
          let { entryExports: t, csfFiles: r = [] } =
            await this.store.loadEntry(this.id);
          if (this.torndown) throw fn;
          (this.csfFiles = r), (this.exports = t), (this.preparing = !1);
        }
        isEqual(t) {
          return !!(
            this.id === t.id &&
            this.exports &&
            this.exports === t.exports
          );
        }
        docsContext(t) {
          if (!this.csfFiles)
            throw new Error("Cannot render docs before preparing");
          return new Ul(this.channel, this.store, t, this.csfFiles);
        }
        async renderToElement(t, r) {
          if (!this.exports || !this.csfFiles || !this.store.projectAnnotations)
            throw new Error("Cannot render docs before preparing");
          let n = this.docsContext(r),
            { docs: o } = this.store.projectAnnotations.parameters || {};
          if (!o)
            throw new Error(
              "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed",
            );
          let a = { ...o, page: this.exports.default },
            i = await o.renderer(),
            { render: s } = i,
            l = b(async () => {
              try {
                await s(n, a, t), this.channel.emit(qr, this.id);
              } catch (c) {
                this.callbacks.showException(c);
              }
            }, "renderDocs");
          return (
            (this.rerender = async () => l()),
            (this.teardownRender = async ({ viewModeChanged: c } = {}) => {
              !c || !t || (i.unmount(t), (this.torndown = !0));
            }),
            l()
          );
        }
        async teardown({ viewModeChanged: t } = {}) {
          this.teardownRender?.({ viewModeChanged: t }), (this.torndown = !0);
        }
      };
    b(ql, "MdxDocsRender");
    var Js = ql,
      Cm = globalThis;
    function Vl(e) {
      let t = (e.composedPath && e.composedPath()[0]) || e.target;
      return (
        /input|textarea/i.test(t.tagName) ||
        t.getAttribute("contenteditable") !== null
      );
    }
    b(Vl, "focusInInput");
    var Jl = "attached-mdx",
      xm = "unattached-mdx";
    function zl({ tags: e }) {
      return e?.includes(xm) || e?.includes(Jl);
    }
    b(zl, "isMdxEntry");
    function an(e) {
      return e.type === "story";
    }
    b(an, "isStoryRender");
    function Hl(e) {
      return e.type === "docs";
    }
    b(Hl, "isDocsRender");
    function Gl(e) {
      return Hl(e) && e.subtype === "csf";
    }
    b(Gl, "isCsfDocsRender");
    var Wl = class extends Sm {
      constructor(t, r, n, o) {
        super(t, r, void 0, !1),
          (this.importFn = t),
          (this.getProjectAnnotations = r),
          (this.selectionStore = n),
          (this.view = o),
          this.initialize();
      }
      setupListeners() {
        super.setupListeners(),
          (Cm.onkeydown = this.onKeydown.bind(this)),
          this.channel.on(xi, this.onSetCurrentStory.bind(this)),
          this.channel.on(ji, this.onUpdateQueryParams.bind(this)),
          this.channel.on(wi, this.onPreloadStories.bind(this));
      }
      async setInitialGlobals() {
        if (!this.storyStoreValue)
          throw new Me({ methodName: "setInitialGlobals" });
        let { globals: t } = this.selectionStore.selectionSpecifier || {};
        t && this.storyStoreValue.userGlobals.updateFromPersisted(t),
          this.emitGlobals();
      }
      async initializeWithStoryIndex(t) {
        return (
          await super.initializeWithStoryIndex(t), this.selectSpecifiedStory()
        );
      }
      async selectSpecifiedStory() {
        if (!this.storyStoreValue)
          throw new Me({ methodName: "selectSpecifiedStory" });
        if (this.selectionStore.selection) {
          await this.renderSelection();
          return;
        }
        if (!this.selectionStore.selectionSpecifier) {
          this.renderMissingStory();
          return;
        }
        let { storySpecifier: t, args: r } =
            this.selectionStore.selectionSpecifier,
          n = this.storyStoreValue.storyIndex.entryFromSpecifier(t);
        if (!n) {
          t === "*"
            ? this.renderStoryLoadingException(t, new Ds())
            : this.renderStoryLoadingException(
                t,
                new ws({ storySpecifier: t.toString() }),
              );
          return;
        }
        let { id: o, type: a } = n;
        this.selectionStore.setSelection({ storyId: o, viewMode: a }),
          this.channel.emit(_i, this.selectionStore.selection),
          this.channel.emit(ro, this.selectionStore.selection),
          await this.renderSelection({ persistedArgs: r });
      }
      async onGetProjectAnnotationsChanged({ getProjectAnnotations: t }) {
        await super.onGetProjectAnnotationsChanged({
          getProjectAnnotations: t,
        }),
          this.selectionStore.selection && this.renderSelection();
      }
      async onStoriesChanged({ importFn: t, storyIndex: r }) {
        await super.onStoriesChanged({ importFn: t, storyIndex: r }),
          this.selectionStore.selection
            ? await this.renderSelection()
            : await this.selectSpecifiedStory();
      }
      onKeydown(t) {
        if (!this.storyRenders.find((r) => r.disableKeyListeners) && !Vl(t)) {
          let {
            altKey: r,
            ctrlKey: n,
            metaKey: o,
            shiftKey: a,
            key: i,
            code: s,
            keyCode: l,
          } = t;
          this.channel.emit(Ci, {
            event: {
              altKey: r,
              ctrlKey: n,
              metaKey: o,
              shiftKey: a,
              key: i,
              code: s,
              keyCode: l,
            },
          });
        }
      }
      async onSetCurrentStory(t) {
        this.selectionStore.setSelection({ viewMode: "story", ...t }),
          await this.storeInitializationPromise,
          this.channel.emit(ro, this.selectionStore.selection),
          this.renderSelection();
      }
      onUpdateQueryParams(t) {
        this.selectionStore.setQueryParams(t);
      }
      async onUpdateGlobals({ globals: t }) {
        let r =
          (this.currentRender instanceof Po && this.currentRender.story) ||
          void 0;
        super.onUpdateGlobals({ globals: t, currentStory: r }),
          (this.currentRender instanceof Js ||
            this.currentRender instanceof Vs) &&
            (await this.currentRender.rerender?.());
      }
      async onUpdateArgs({ storyId: t, updatedArgs: r }) {
        super.onUpdateArgs({ storyId: t, updatedArgs: r });
      }
      async onPreloadStories({ ids: t }) {
        await this.storeInitializationPromise,
          this.storyStoreValue &&
            (await Promise.allSettled(
              t.map((r) => this.storyStoreValue?.loadEntry(r)),
            ));
      }
      async renderSelection({ persistedArgs: t } = {}) {
        let { renderToCanvas: r } = this;
        if (!this.storyStoreValue || !r)
          throw new Me({ methodName: "renderSelection" });
        let { selection: n } = this.selectionStore;
        if (!n)
          throw new Error(
            "Cannot call renderSelection as no selection was made",
          );
        let { storyId: o } = n,
          a;
        try {
          a = await this.storyStoreValue.storyIdToEntry(o);
        } catch (d) {
          this.currentRender && (await this.teardownRender(this.currentRender)),
            this.renderStoryLoadingException(o, d);
          return;
        }
        let i = this.currentSelection?.storyId !== o,
          s = this.currentRender?.type !== a.type;
        a.type === "story"
          ? this.view.showPreparingStory({ immediate: s })
          : this.view.showPreparingDocs({ immediate: s }),
          this.currentRender?.isPreparing() &&
            (await this.teardownRender(this.currentRender));
        let l;
        a.type === "story"
          ? (l = new Po(
              this.channel,
              this.storyStoreValue,
              r,
              this.mainStoryCallbacks(o),
              o,
              "story",
            ))
          : zl(a)
            ? (l = new Js(
                this.channel,
                this.storyStoreValue,
                a,
                this.mainStoryCallbacks(o),
              ))
            : (l = new Vs(
                this.channel,
                this.storyStoreValue,
                a,
                this.mainStoryCallbacks(o),
              ));
        let c = this.currentSelection;
        this.currentSelection = n;
        let p = this.currentRender;
        this.currentRender = l;
        try {
          await l.prepare();
        } catch (d) {
          p && (await this.teardownRender(p)),
            d !== fn && this.renderStoryLoadingException(o, d);
          return;
        }
        let h = !i && p && !l.isEqual(p);
        if (
          (t &&
            an(l) &&
            (on(!!l.story),
            this.storyStoreValue.args.updateFromPersisted(l.story, t)),
          p && !p.torndown && !i && !h && !s)
        ) {
          (this.currentRender = p),
            this.channel.emit(Pi, o),
            this.view.showMain();
          return;
        }
        if (
          (p && (await this.teardownRender(p, { viewModeChanged: s })),
          c && (i || s) && this.channel.emit(Ii, o),
          an(l))
        ) {
          on(!!l.story);
          let {
            parameters: d,
            initialArgs: y,
            argTypes: g,
            unmappedArgs: A,
            initialGlobals: v,
            userGlobals: S,
            storyGlobals: w,
            globals: x,
          } = this.storyStoreValue.getStoryContext(l.story);
          this.channel.emit(Oi, {
            id: o,
            parameters: d,
            initialArgs: y,
            argTypes: g,
            args: A,
          }),
            this.channel.emit(Wt, {
              userGlobals: S,
              storyGlobals: w,
              globals: x,
              initialGlobals: v,
            });
        } else {
          let { parameters: d } = this.storyStoreValue.projectAnnotations,
            { initialGlobals: y, globals: g } =
              this.storyStoreValue.userGlobals;
          if (
            (this.channel.emit(Wt, {
              globals: g,
              initialGlobals: y,
              storyGlobals: {},
              userGlobals: g,
            }),
            Gl(l) || l.entry.tags?.includes(Jl))
          ) {
            if (!l.csfFiles) throw new vs({ storyId: o });
            ({ parameters: d } = this.storyStoreValue.preparedMetaFromCSFFile({
              csfFile: l.csfFiles[0],
            }));
          }
          this.channel.emit(vi, { id: o, parameters: d });
        }
        an(l)
          ? (on(!!l.story),
            this.storyRenders.push(l),
            this.currentRender.renderToElement(
              this.view.prepareForStory(l.story),
            ))
          : this.currentRender.renderToElement(
              this.view.prepareForDocs(),
              this.renderStoryToElement.bind(this),
            );
      }
      async teardownRender(t, { viewModeChanged: r = !1 } = {}) {
        (this.storyRenders = this.storyRenders.filter((n) => n !== t)),
          await t?.teardown?.({ viewModeChanged: r });
      }
      mainStoryCallbacks(t) {
        return {
          showStoryDuringRender: b(
            () => this.view.showStoryDuringRender(),
            "showStoryDuringRender",
          ),
          showMain: b(() => this.view.showMain(), "showMain"),
          showError: b((r) => this.renderError(t, r), "showError"),
          showException: b((r) => this.renderException(t, r), "showException"),
        };
      }
      renderPreviewEntryError(t, r) {
        super.renderPreviewEntryError(t, r), this.view.showErrorDisplay(r);
      }
      renderMissingStory() {
        this.view.showNoPreview(), this.channel.emit(ao);
      }
      renderStoryLoadingException(t, r) {
        ee.error(r), this.view.showErrorDisplay(r), this.channel.emit(ao, t);
      }
      renderException(t, r) {
        let { name: n = "Error", message: o = String(r), stack: a } = r;
        this.channel.emit(Bi, { name: n, message: o, stack: a }),
          this.channel.emit(Kt, { newPhase: "errored", storyId: t }),
          this.view.showErrorDisplay(r),
          ee.error(`Error rendering story '${t}':`),
          ee.error(r);
      }
      renderError(t, { title: r, description: n }) {
        ee.error(`Error rendering story ${r}: ${n}`),
          this.channel.emit(ki, { title: r, description: n }),
          this.channel.emit(Kt, { newPhase: "errored", storyId: t }),
          this.view.showErrorDisplay({ message: r, stack: n });
      }
    };
    b(Wl, "PreviewWithSelection");
    var Tm = Wl,
      No = tr($o(), 1),
      Fm = tr($o(), 1),
      zs = /^[a-zA-Z0-9 _-]*$/,
      Kl = /^-?[0-9]+(\.[0-9]+)?$/,
      Im = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i,
      Yl =
        /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i,
      jo = b(
        (e = "", t) =>
          e === null || e === "" || !zs.test(e)
            ? !1
            : t == null ||
                t instanceof Date ||
                typeof t == "number" ||
                typeof t == "boolean"
              ? !0
              : typeof t == "string"
                ? zs.test(t) || Kl.test(t) || Im.test(t) || Yl.test(t)
                : Array.isArray(t)
                  ? t.every((r) => jo(e, r))
                  : We(t)
                    ? Object.entries(t).every(([r, n]) => jo(r, n))
                    : !1,
        "validateArgs",
      ),
      km = {
        delimiter: ";",
        nesting: !0,
        arrayRepeat: !0,
        arrayRepeatSyntax: "bracket",
        nestingSyntax: "js",
        valueDeserializer(e) {
          if (e.startsWith("!")) {
            if (e === "!undefined") return;
            if (e === "!null") return null;
            if (e === "!true") return !0;
            if (e === "!false") return !1;
            if (e.startsWith("!date(") && e.endsWith(")"))
              return new Date(e.replaceAll(" ", "+").slice(6, -1));
            if (e.startsWith("!hex(") && e.endsWith(")"))
              return `#${e.slice(5, -1)}`;
            let t = e.slice(1).match(Yl);
            if (t)
              return e.startsWith("!rgba") || e.startsWith("!RGBA")
                ? `${t[1]}(${t[2]}, ${t[3]}, ${t[4]}, ${t[5]})`
                : e.startsWith("!hsla") || e.startsWith("!HSLA")
                  ? `${t[1]}(${t[2]}, ${t[3]}%, ${t[4]}%, ${t[5]})`
                  : e.startsWith("!rgb") || e.startsWith("!RGB")
                    ? `${t[1]}(${t[2]}, ${t[3]}, ${t[4]})`
                    : `${t[1]}(${t[2]}, ${t[3]}%, ${t[4]}%)`;
          }
          return Kl.test(e) ? Number(e) : e;
        },
      },
      Hs = b((e) => {
        let t = e.split(";").map((r) => r.replace("=", "~").replace(":", "="));
        return Object.entries((0, Fm.parse)(t.join(";"), km)).reduce(
          (r, [n, o]) =>
            jo(n, o)
              ? Object.assign(r, { [n]: o })
              : (mt.warn(me`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/writing-stories/args#setting-args-through-the-url
    `),
                r),
          {},
        );
      }, "parseArgsParam"),
      { history: Xl, document: bt } = De;
    function Ql(e) {
      let t = (e || "").match(/^\/story\/(.+)/);
      if (!t)
        throw new Error(`Invalid path '${e}',  must start with '/story/'`);
      return t[1];
    }
    b(Ql, "pathToId");
    var Zl = b(({ selection: e, extraParams: t }) => {
        let r = bt?.location.search.slice(1),
          {
            path: n,
            selectedKind: o,
            selectedStory: a,
            ...i
          } = (0, No.parse)(r);
        return `?${(0, No.stringify)({ ...i, ...t, ...(e && { id: e.storyId, viewMode: e.viewMode }) })}`;
      }, "getQueryString"),
      Rm = b((e) => {
        if (!e) return;
        let t = Zl({ selection: e }),
          { hash: r = "" } = bt.location;
        (bt.title = e.storyId),
          Xl.replaceState({}, "", `${bt.location.pathname}${t}${r}`);
      }, "setPath"),
      Om = b(
        (e) => e != null && typeof e == "object" && Array.isArray(e) === !1,
        "isObject",
      ),
      vr = b((e) => {
        if (e !== void 0) {
          if (typeof e == "string") return e;
          if (Array.isArray(e)) return vr(e[0]);
          if (Om(e)) return vr(Object.values(e).filter(Boolean));
        }
      }, "getFirstString"),
      _m = b(() => {
        if (typeof bt < "u") {
          let e = bt.location.search.slice(1),
            t = (0, No.parse)(e),
            r = typeof t.args == "string" ? Hs(t.args) : void 0,
            n = typeof t.globals == "string" ? Hs(t.globals) : void 0,
            o = vr(t.viewMode);
          (typeof o != "string" || !o.match(/docs|story/)) && (o = "story");
          let a = vr(t.path),
            i = a ? Ql(a) : vr(t.id);
          if (i) return { storySpecifier: i, args: r, globals: n, viewMode: o };
        }
        return null;
      }, "getSelectionSpecifierFromPath"),
      eu = class {
        constructor() {
          this.selectionSpecifier = _m();
        }
        setSelection(t) {
          (this.selection = t), Rm(this.selection);
        }
        setQueryParams(t) {
          let r = Zl({ extraParams: t }),
            { hash: n = "" } = bt.location;
          Xl.replaceState({}, "", `${bt.location.pathname}${r}${n}`);
        }
      };
    b(eu, "UrlStore");
    var Bm = eu,
      Pm = tr(af(), 1),
      Nm = tr($o(), 1),
      { document: Re } = De,
      Gs = 100,
      tu = ((e) => (
        (e.MAIN = "MAIN"),
        (e.NOPREVIEW = "NOPREVIEW"),
        (e.PREPARING_STORY = "PREPARING_STORY"),
        (e.PREPARING_DOCS = "PREPARING_DOCS"),
        (e.ERROR = "ERROR"),
        e
      ))(tu || {}),
      So = {
        PREPARING_STORY: "sb-show-preparing-story",
        PREPARING_DOCS: "sb-show-preparing-docs",
        MAIN: "sb-show-main",
        NOPREVIEW: "sb-show-nopreview",
        ERROR: "sb-show-errordisplay",
      },
      wo = {
        centered: "sb-main-centered",
        fullscreen: "sb-main-fullscreen",
        padded: "sb-main-padded",
      },
      Ws = new Pm.default({ escapeXML: !0 }),
      ru = class {
        constructor() {
          if (((this.testing = !1), typeof Re < "u")) {
            let { __SPECIAL_TEST_PARAMETER__: t } = (0, Nm.parse)(
              Re.location.search.slice(1),
            );
            switch (t) {
              case "preparing-story": {
                this.showPreparingStory(), (this.testing = !0);
                break;
              }
              case "preparing-docs": {
                this.showPreparingDocs(), (this.testing = !0);
                break;
              }
              default:
            }
          }
        }
        prepareForStory(t) {
          return (
            this.showStory(),
            this.applyLayout(t.parameters.layout),
            (Re.documentElement.scrollTop = 0),
            (Re.documentElement.scrollLeft = 0),
            this.storyRoot()
          );
        }
        storyRoot() {
          return Re.getElementById("storybook-root");
        }
        prepareForDocs() {
          return (
            this.showMain(),
            this.showDocs(),
            this.applyLayout("fullscreen"),
            (Re.documentElement.scrollTop = 0),
            (Re.documentElement.scrollLeft = 0),
            this.docsRoot()
          );
        }
        docsRoot() {
          return Re.getElementById("storybook-docs");
        }
        applyLayout(t = "padded") {
          if (t === "none") {
            Re.body.classList.remove(this.currentLayoutClass),
              (this.currentLayoutClass = null);
            return;
          }
          this.checkIfLayoutExists(t);
          let r = wo[t];
          Re.body.classList.remove(this.currentLayoutClass),
            Re.body.classList.add(r),
            (this.currentLayoutClass = r);
        }
        checkIfLayoutExists(t) {
          wo[t] ||
            ee.warn(me`
          The desired layout: ${t} is not a valid option.
          The possible options are: ${Object.keys(wo).join(", ")}, none.
        `);
        }
        showMode(t) {
          clearTimeout(this.preparingTimeout),
            Object.keys(tu).forEach((r) => {
              r === t
                ? Re.body.classList.add(So[r])
                : Re.body.classList.remove(So[r]);
            });
        }
        showErrorDisplay({ message: t = "", stack: r = "" }) {
          let n = t,
            o = r,
            a = t.split(`
`);
          a.length > 1 &&
            (([n] = a),
            (o = a
              .slice(1)
              .join(
                `
`,
              )
              .replace(/^\n/, ""))),
            (Re.getElementById("error-message").innerHTML = Ws.toHtml(n)),
            (Re.getElementById("error-stack").innerHTML = Ws.toHtml(o)),
            this.showMode("ERROR");
        }
        showNoPreview() {
          this.testing ||
            (this.showMode("NOPREVIEW"),
            this.storyRoot()?.setAttribute("hidden", "true"),
            this.docsRoot()?.setAttribute("hidden", "true"));
        }
        showPreparingStory({ immediate: t = !1 } = {}) {
          clearTimeout(this.preparingTimeout),
            t
              ? this.showMode("PREPARING_STORY")
              : (this.preparingTimeout = setTimeout(
                  () => this.showMode("PREPARING_STORY"),
                  Gs,
                ));
        }
        showPreparingDocs({ immediate: t = !1 } = {}) {
          clearTimeout(this.preparingTimeout),
            t
              ? this.showMode("PREPARING_DOCS")
              : (this.preparingTimeout = setTimeout(
                  () => this.showMode("PREPARING_DOCS"),
                  Gs,
                ));
        }
        showMain() {
          this.showMode("MAIN");
        }
        showDocs() {
          this.storyRoot().setAttribute("hidden", "true"),
            this.docsRoot().removeAttribute("hidden");
        }
        showStory() {
          this.docsRoot().setAttribute("hidden", "true"),
            this.storyRoot().removeAttribute("hidden");
        }
        showStoryDuringRender() {
          Re.body.classList.add(So.MAIN);
        }
      };
    b(ru, "WebView");
    var jm = ru,
      Lm = class extends Tm {
        constructor(t, r) {
          super(t, r, new Bm(), new jm()),
            (this.importFn = t),
            (this.getProjectAnnotations = r),
            (De.__STORYBOOK_PREVIEW__ = this);
        }
      };
    b(Lm, "PreviewWeb");
    var { document: kt } = De,
      Mm = [
        "application/javascript",
        "application/ecmascript",
        "application/x-ecmascript",
        "application/x-javascript",
        "text/ecmascript",
        "text/javascript",
        "text/javascript1.0",
        "text/javascript1.1",
        "text/javascript1.2",
        "text/javascript1.3",
        "text/javascript1.4",
        "text/javascript1.5",
        "text/jscript",
        "text/livescript",
        "text/x-ecmascript",
        "text/x-javascript",
        "module",
      ],
      Um = "script",
      Ks = "scripts-root";
    function Lo() {
      let e = kt.createEvent("Event");
      e.initEvent("DOMContentLoaded", !0, !0), kt.dispatchEvent(e);
    }
    b(Lo, "simulateDOMContentLoaded");
    function nu(e, t, r) {
      let n = kt.createElement("script");
      (n.type = e.type === "module" ? "module" : "text/javascript"),
        e.src
          ? ((n.onload = t), (n.onerror = t), (n.src = e.src))
          : (n.textContent = e.innerText),
        r ? r.appendChild(n) : kt.head.appendChild(n),
        e.parentNode.removeChild(e),
        e.src || t();
    }
    b(nu, "insertScript");
    function Xo(e, t, r = 0) {
      e[r](() => {
        r++, r === e.length ? t() : Xo(e, t, r);
      });
    }
    b(Xo, "insertScriptsSequentially");
    function $m(e) {
      let t = kt.getElementById(Ks);
      t
        ? (t.innerHTML = "")
        : ((t = kt.createElement("div")), (t.id = Ks), kt.body.appendChild(t));
      let r = Array.from(e.querySelectorAll(Um));
      if (r.length) {
        let n = [];
        r.forEach((o) => {
          let a = o.getAttribute("type");
          (!a || Mm.includes(a)) && n.push((i) => nu(o, i, t));
        }),
          n.length && Xo(n, Lo, void 0);
      } else Lo();
    }
    b($m, "simulatePageLoad");
    var qm = Object.create,
      ea = Object.defineProperty,
      Vm = Object.getOwnPropertyDescriptor,
      Jm = Object.getOwnPropertyNames,
      zm = Object.getPrototypeOf,
      Hm = Object.prototype.hasOwnProperty,
      ye = (e, t) => ea(e, "name", { value: t, configurable: !0 }),
      Gm = (e, t) => () => (
        t || e((t = { exports: {} }).exports, t), t.exports
      ),
      Wm = (e, t, r, n) => {
        if ((t && typeof t == "object") || typeof t == "function")
          for (let o of Jm(t))
            !Hm.call(e, o) &&
              o !== r &&
              ea(e, o, {
                get: () => t[o],
                enumerable: !(n = Vm(t, o)) || n.enumerable,
              });
        return e;
      },
      Km = (e, t, r) => (
        (r = e != null ? qm(zm(e)) : {}),
        Wm(
          t || !e || !e.__esModule
            ? ea(r, "default", { value: e, enumerable: !0 })
            : r,
          e,
        )
      ),
      Ym = Gm((e) => {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.isEqual = (function () {
            var t = Object.prototype.toString,
              r = Object.getPrototypeOf,
              n = Object.getOwnPropertySymbols
                ? function (o) {
                    return Object.keys(o).concat(
                      Object.getOwnPropertySymbols(o),
                    );
                  }
                : Object.keys;
            return function (o, a) {
              return ye(function i(s, l, c) {
                var p,
                  h,
                  d,
                  y = t.call(s),
                  g = t.call(l);
                if (s === l) return !0;
                if (s == null || l == null) return !1;
                if (c.indexOf(s) > -1 && c.indexOf(l) > -1) return !0;
                if (
                  (c.push(s, l),
                  y != g ||
                    ((p = n(s)),
                    (h = n(l)),
                    p.length != h.length ||
                      p.some(function (A) {
                        return !i(s[A], l[A], c);
                      })))
                )
                  return !1;
                switch (y.slice(8, -1)) {
                  case "Symbol":
                    return s.valueOf() == l.valueOf();
                  case "Date":
                  case "Number":
                    return +s == +l || (+s != +s && +l != +l);
                  case "RegExp":
                  case "Function":
                  case "String":
                  case "Boolean":
                    return "" + s == "" + l;
                  case "Set":
                  case "Map":
                    (p = s.entries()), (h = l.entries());
                    do
                      if (!i((d = p.next()).value, h.next().value, c))
                        return !1;
                    while (!d.done);
                    return !0;
                  case "ArrayBuffer":
                    (s = new Uint8Array(s)), (l = new Uint8Array(l));
                  case "DataView":
                    (s = new Uint8Array(s.buffer)),
                      (l = new Uint8Array(l.buffer));
                  case "Float32Array":
                  case "Float64Array":
                  case "Int8Array":
                  case "Int16Array":
                  case "Int32Array":
                  case "Uint8Array":
                  case "Uint16Array":
                  case "Uint32Array":
                  case "Uint8ClampedArray":
                  case "Arguments":
                  case "Array":
                    if (s.length != l.length) return !1;
                    for (d = 0; d < s.length; d++)
                      if (
                        (d in s || d in l) &&
                        (d in s != d in l || !i(s[d], l[d], c))
                      )
                        return !1;
                    return !0;
                  case "Object":
                    return i(r(s), r(l), c);
                  default:
                    return !1;
                }
              }, "n")(o, a, []);
            };
          })());
      });
    function uu(e) {
      return e
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .replace(/\./g, " ")
        .replace(/([^\n])([A-Z])([a-z])/g, (t, r, n, o) => `${r} ${n}${o}`)
        .replace(/([a-z])([A-Z])/g, (t, r, n) => `${r} ${n}`)
        .replace(/([a-z])([0-9])/gi, (t, r, n) => `${r} ${n}`)
        .replace(/([0-9])([a-z])/gi, (t, r, n) => `${r} ${n}`)
        .replace(/(\s|^)(\w)/g, (t, r, n) => `${r}${n.toUpperCase()}`)
        .replace(/ +/g, " ")
        .trim();
    }
    ye(uu, "toStartCaseStr");
    var su = Km(Ym(), 1),
      cu = ye(
        (e) => e.map((t) => typeof t < "u").filter(Boolean).length,
        "count",
      ),
      Xm = ye((e, t) => {
        let { exists: r, eq: n, neq: o, truthy: a } = e;
        if (cu([r, n, o, a]) > 1)
          throw new Error(
            `Invalid conditional test ${JSON.stringify({ exists: r, eq: n, neq: o })}`,
          );
        if (typeof n < "u") return (0, su.isEqual)(t, n);
        if (typeof o < "u") return !(0, su.isEqual)(t, o);
        if (typeof r < "u") {
          let i = typeof t < "u";
          return r ? i : !i;
        }
        return typeof a > "u" || a ? !!t : !t;
      }, "testValue"),
      mn = ye((e, t, r) => {
        if (!e.if) return !0;
        let { arg: n, global: o } = e.if;
        if (cu([n, o]) !== 1)
          throw new Error(
            `Invalid conditional value ${JSON.stringify({ arg: n, global: o })}`,
          );
        let a = n ? t[n] : r[o];
        return Xm(e.if, a);
      }, "includeConditionalArg");
    function Qm(e) {
      let t,
        r = {
          _tag: "Preview",
          input: e,
          get composed() {
            if (t) return t;
            let { addons: n, ...o } = e;
            return (t = Qt(_t([...(n ?? []), o]))), t;
          },
          meta(n) {
            return du(n, this);
          },
        };
      return (globalThis.globalProjectAnnotations = r.composed), r;
    }
    ye(Qm, "__definePreview");
    function Zm(e) {
      return (
        e != null &&
        typeof e == "object" &&
        "_tag" in e &&
        e?._tag === "Preview"
      );
    }
    ye(Zm, "isPreview");
    function ey(e) {
      return (
        e != null && typeof e == "object" && "_tag" in e && e?._tag === "Meta"
      );
    }
    ye(ey, "isMeta");
    function du(e, t) {
      return {
        _tag: "Meta",
        input: e,
        preview: t,
        get composed() {
          throw new Error("Not implemented");
        },
        story(r) {
          return pu(r, this);
        },
      };
    }
    ye(du, "defineMeta");
    function pu(e, t) {
      return {
        _tag: "Story",
        input: e,
        meta: t,
        get composed() {
          throw new Error("Not implemented");
        },
      };
    }
    ye(pu, "defineStory");
    function Bt(e) {
      return (
        e != null && typeof e == "object" && "_tag" in e && e?._tag === "Story"
      );
    }
    ye(Bt, "isStory");
    var Qo = ye(
        (e) =>
          e
            .toLowerCase()
            .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-")
            .replace(/-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, ""),
        "sanitize",
      ),
      lu = ye((e, t) => {
        let r = Qo(e);
        if (r === "")
          throw new Error(
            `Invalid ${t} '${e}', must include alphanumeric characters`,
          );
        return r;
      }, "sanitizeSafe"),
      ou = ye(
        (e, t) => `${lu(e, "kind")}${t ? `--${lu(t, "name")}` : ""}`,
        "toId",
      ),
      au = ye((e) => uu(e), "storyNameFromExport");
    function Zo(e, t) {
      return Array.isArray(t) ? t.includes(e) : e.match(t);
    }
    ye(Zo, "matches");
    function er(e, { includeStories: t, excludeStories: r }) {
      return e !== "__esModule" && (!t || Zo(e, t)) && (!r || !Zo(e, r));
    }
    ye(er, "isExportStory");
    var R5 = ye((e, { rootSeparator: t, groupSeparator: r }) => {
        let [n, o] = e.split(t, 2),
          a = (o || e).split(r).filter((i) => !!i);
        return { root: o ? n : null, groups: a };
      }, "parseKind"),
      iu = ye((...e) => {
        let t = e.reduce(
          (r, n) => (n.startsWith("!") ? r.delete(n.slice(1)) : r.add(n), r),
          new Set(),
        );
        return Array.from(t);
      }, "combineTags");
    q();
    V();
    J();
    q();
    V();
    J();
    q();
    V();
    J();
    var rr = _p(fu(), 1);
    var ty = Object.defineProperty,
      B = (e, t) => ty(e, "name", { value: t, configurable: !0 }),
      ry = B((e) => e.name === "literal", "isLiteral"),
      ny = B((e) => e.value.replace(/['|"]/g, ""), "toEnumOption"),
      oy = B((e) => {
        switch (e.type) {
          case "function":
            return { name: "function" };
          case "object":
            let t = {};
            return (
              e.signature.properties.forEach((r) => {
                t[r.key] = wr(r.value);
              }),
              { name: "object", value: t }
            );
          default:
            throw new en({ type: e, language: "Flow" });
        }
      }, "convertSig"),
      wr = B((e) => {
        let { name: t, raw: r } = e,
          n = {};
        switch ((typeof r < "u" && (n.raw = r), e.name)) {
          case "literal":
            return { ...n, name: "other", value: e.value };
          case "string":
          case "number":
          case "symbol":
          case "boolean":
            return { ...n, name: t };
          case "Array":
            return { ...n, name: "array", value: e.elements.map(wr) };
          case "signature":
            return { ...n, ...oy(e) };
          case "union":
            return e.elements?.every(ry)
              ? { ...n, name: "enum", value: e.elements?.map(ny) }
              : { ...n, name: t, value: e.elements?.map(wr) };
          case "intersection":
            return { ...n, name: t, value: e.elements?.map(wr) };
          default:
            return { ...n, name: "other", value: t };
        }
      }, "convert");
    function mu(e, t) {
      let r = {},
        n = Object.keys(e);
      for (let o = 0; o < n.length; o++) {
        let a = n[o],
          i = e[a];
        r[a] = t(i, a, e);
      }
      return r;
    }
    B(mu, "mapValues");
    var yu = /^['"]|['"]$/g,
      ay = B((e) => e.replace(yu, ""), "trimQuotes"),
      iy = B((e) => yu.test(e), "includesQuotes"),
      gu = B((e) => {
        let t = ay(e);
        return iy(e) || Number.isNaN(Number(t)) ? t : Number(t);
      }, "parseLiteral"),
      sy = /^\(.*\) => /,
      Sr = B((e) => {
        let { name: t, raw: r, computed: n, value: o } = e,
          a = {};
        switch ((typeof r < "u" && (a.raw = r), t)) {
          case "enum": {
            let s = n ? o : o.map((l) => gu(l.value));
            return { ...a, name: t, value: s };
          }
          case "string":
          case "number":
          case "symbol":
            return { ...a, name: t };
          case "func":
            return { ...a, name: "function" };
          case "bool":
          case "boolean":
            return { ...a, name: "boolean" };
          case "arrayOf":
          case "array":
            return { ...a, name: "array", value: o && Sr(o) };
          case "object":
            return { ...a, name: t };
          case "objectOf":
            return { ...a, name: t, value: Sr(o) };
          case "shape":
          case "exact":
            let i = mu(o, (s) => Sr(s));
            return { ...a, name: "object", value: i };
          case "union":
            return { ...a, name: "union", value: o.map((s) => Sr(s)) };
          case "instanceOf":
          case "element":
          case "elementType":
          default: {
            if (t?.indexOf("|") > 0)
              try {
                let c = t.split("|").map((p) => JSON.parse(p));
                return { ...a, name: "enum", value: c };
              } catch {}
            let s = o ? `${t}(${o})` : t,
              l = sy.test(t) ? "function" : "other";
            return { ...a, name: l, value: s };
          }
        }
      }, "convert"),
      ly = B((e) => {
        switch (e.type) {
          case "function":
            return { name: "function" };
          case "object":
            let t = {};
            return (
              e.signature.properties.forEach((r) => {
                t[r.key] = Cr(r.value);
              }),
              { name: "object", value: t }
            );
          default:
            throw new en({ type: e, language: "Typescript" });
        }
      }, "convertSig"),
      Cr = B((e) => {
        let { name: t, raw: r } = e,
          n = {};
        switch ((typeof r < "u" && (n.raw = r), e.name)) {
          case "string":
          case "number":
          case "symbol":
          case "boolean":
            return { ...n, name: t };
          case "Array":
            return { ...n, name: "array", value: e.elements.map(Cr) };
          case "signature":
            return { ...n, ...ly(e) };
          case "union":
            let o;
            return (
              e.elements?.every((a) => a.name === "literal")
                ? (o = {
                    ...n,
                    name: "enum",
                    value: e.elements?.map((a) => gu(a.value)),
                  })
                : (o = { ...n, name: t, value: e.elements?.map(Cr) }),
              o
            );
          case "intersection":
            return { ...n, name: t, value: e.elements?.map(Cr) };
          default:
            return { ...n, name: "other", value: t };
        }
      }, "convert"),
      ta = B((e) => {
        let { type: t, tsType: r, flowType: n } = e;
        try {
          if (t != null) return Sr(t);
          if (r != null) return Cr(r);
          if (n != null) return wr(n);
        } catch (o) {
          console.error(o);
        }
        return null;
      }, "convert"),
      uy = ((e) => (
        (e.JAVASCRIPT = "JavaScript"),
        (e.FLOW = "Flow"),
        (e.TYPESCRIPT = "TypeScript"),
        (e.UNKNOWN = "Unknown"),
        e
      ))(uy || {}),
      cy = ["null", "undefined"];
    function gn(e) {
      return cy.some((t) => t === e);
    }
    B(gn, "isDefaultValueBlacklisted");
    var dy = B((e) => {
      if (!e) return "";
      if (typeof e == "string") return e;
      throw new Error(
        `Description: expected string, got: ${JSON.stringify(e)}`,
      );
    }, "str");
    function ra(e) {
      return !!e.__docgenInfo;
    }
    B(ra, "hasDocgen");
    function bu(e) {
      return e != null && Object.keys(e).length > 0;
    }
    B(bu, "isValidDocgenSection");
    function Eu(e, t) {
      return ra(e) ? e.__docgenInfo[t] : null;
    }
    B(Eu, "getDocgenSection");
    function vu(e) {
      return ra(e) ? dy(e.__docgenInfo.description) : "";
    }
    B(vu, "getDocgenDescription");
    var Et;
    (function (e) {
      (e.start = "/**"), (e.nostart = "/***"), (e.delim = "*"), (e.end = "*/");
    })((Et = Et || (Et = {})));
    function Au(e) {
      return /^\s+$/.test(e);
    }
    B(Au, "isSpace");
    function Du(e) {
      let t = e.match(/\r+$/);
      return t == null
        ? ["", e]
        : [e.slice(-t[0].length), e.slice(0, -t[0].length)];
    }
    B(Du, "splitCR");
    function Pt(e) {
      let t = e.match(/^\s+/);
      return t == null
        ? ["", e]
        : [e.slice(0, t[0].length), e.slice(t[0].length)];
    }
    B(Pt, "splitSpace");
    function Su(e) {
      return e.split(/\n/);
    }
    B(Su, "splitLines");
    function wu(e = {}) {
      return Object.assign(
        {
          tag: "",
          name: "",
          type: "",
          optional: !1,
          description: "",
          problems: [],
          source: [],
        },
        e,
      );
    }
    B(wu, "seedSpec");
    function Cu(e = {}) {
      return Object.assign(
        {
          start: "",
          delimiter: "",
          postDelimiter: "",
          tag: "",
          postTag: "",
          name: "",
          postName: "",
          type: "",
          postType: "",
          description: "",
          end: "",
          lineEnd: "",
        },
        e,
      );
    }
    B(Cu, "seedTokens");
    var py = /^@\S+/;
    function xu({ fence: e = "```" } = {}) {
      let t = Tu(e),
        r = B((n, o) => (t(n) ? !o : o), "toggleFence");
      return B(function (n) {
        let o = [[]],
          a = !1;
        for (let i of n)
          py.test(i.tokens.description) && !a
            ? o.push([i])
            : o[o.length - 1].push(i),
            (a = r(i.tokens.description, a));
        return o;
      }, "parseBlock");
    }
    B(xu, "getParser");
    function Tu(e) {
      return typeof e == "string" ? (t) => t.split(e).length % 2 === 0 : e;
    }
    B(Tu, "getFencer");
    function Fu({ startLine: e = 0, markers: t = Et } = {}) {
      let r = null,
        n = e;
      return B(function (o) {
        let a = o,
          i = Cu();
        if (
          (([i.lineEnd, a] = Du(a)),
          ([i.start, a] = Pt(a)),
          r === null &&
            a.startsWith(t.start) &&
            !a.startsWith(t.nostart) &&
            ((r = []),
            (i.delimiter = a.slice(0, t.start.length)),
            (a = a.slice(t.start.length)),
            ([i.postDelimiter, a] = Pt(a))),
          r === null)
        )
          return n++, null;
        let s = a.trimRight().endsWith(t.end);
        if (
          (i.delimiter === "" &&
            a.startsWith(t.delim) &&
            !a.startsWith(t.end) &&
            ((i.delimiter = t.delim),
            (a = a.slice(t.delim.length)),
            ([i.postDelimiter, a] = Pt(a))),
          s)
        ) {
          let l = a.trimRight();
          (i.end = a.slice(l.length - t.end.length)),
            (a = l.slice(0, -t.end.length));
        }
        if (
          ((i.description = a),
          r.push({ number: n, source: o, tokens: i }),
          n++,
          s)
        ) {
          let l = r.slice();
          return (r = null), l;
        }
        return null;
      }, "parseSource");
    }
    B(Fu, "getParser");
    function Iu({ tokenizers: e }) {
      return B(function (t) {
        var r;
        let n = wu({ source: t });
        for (let o of e)
          if (
            ((n = o(n)),
            !(
              (r = n.problems[n.problems.length - 1]) === null || r === void 0
            ) && r.critical)
          )
            break;
        return n;
      }, "parseSpec");
    }
    B(Iu, "getParser");
    function ku() {
      return (e) => {
        let { tokens: t } = e.source[0],
          r = t.description.match(/\s*(@(\S+))(\s*)/);
        return r === null
          ? (e.problems.push({
              code: "spec:tag:prefix",
              message: 'tag should start with "@" symbol',
              line: e.source[0].number,
              critical: !0,
            }),
            e)
          : ((t.tag = r[1]),
            (t.postTag = r[3]),
            (t.description = t.description.slice(r[0].length)),
            (e.tag = r[2]),
            e);
      };
    }
    B(ku, "tagTokenizer");
    function Ru(e = "compact") {
      let t = Ou(e);
      return (r) => {
        let n = 0,
          o = [];
        for (let [s, { tokens: l }] of r.source.entries()) {
          let c = "";
          if (s === 0 && l.description[0] !== "{") return r;
          for (let p of l.description)
            if ((p === "{" && n++, p === "}" && n--, (c += p), n === 0)) break;
          if ((o.push([l, c]), n === 0)) break;
        }
        if (n !== 0)
          return (
            r.problems.push({
              code: "spec:type:unpaired-curlies",
              message: "unpaired curlies",
              line: r.source[0].number,
              critical: !0,
            }),
            r
          );
        let a = [],
          i = o[0][0].postDelimiter.length;
        for (let [s, [l, c]] of o.entries())
          (l.type = c),
            s > 0 &&
              ((l.type = l.postDelimiter.slice(i) + c),
              (l.postDelimiter = l.postDelimiter.slice(0, i))),
            ([l.postType, l.description] = Pt(l.description.slice(c.length))),
            a.push(l.type);
        return (
          (a[0] = a[0].slice(1)),
          (a[a.length - 1] = a[a.length - 1].slice(0, -1)),
          (r.type = t(a)),
          r
        );
      };
    }
    B(Ru, "typeTokenizer");
    var hy = B((e) => e.trim(), "trim");
    function Ou(e) {
      return e === "compact"
        ? (t) => t.map(hy).join("")
        : e === "preserve"
          ? (t) =>
              t.join(`
`)
          : e;
    }
    B(Ou, "getJoiner");
    var fy = B((e) => e && e.startsWith('"') && e.endsWith('"'), "isQuoted");
    function _u() {
      let e = B((t, { tokens: r }, n) => (r.type === "" ? t : n), "typeEnd");
      return (t) => {
        let { tokens: r } = t.source[t.source.reduce(e, 0)],
          n = r.description.trimLeft(),
          o = n.split('"');
        if (o.length > 1 && o[0] === "" && o.length % 2 === 1)
          return (
            (t.name = o[1]),
            (r.name = `"${o[1]}"`),
            ([r.postName, r.description] = Pt(n.slice(r.name.length))),
            t
          );
        let a = 0,
          i = "",
          s = !1,
          l;
        for (let p of n) {
          if (a === 0 && Au(p)) break;
          p === "[" && a++, p === "]" && a--, (i += p);
        }
        if (a !== 0)
          return (
            t.problems.push({
              code: "spec:name:unpaired-brackets",
              message: "unpaired brackets",
              line: t.source[0].number,
              critical: !0,
            }),
            t
          );
        let c = i;
        if (i[0] === "[" && i[i.length - 1] === "]") {
          (s = !0), (i = i.slice(1, -1));
          let p = i.split("=");
          if (
            ((i = p[0].trim()),
            p[1] !== void 0 && (l = p.slice(1).join("=").trim()),
            i === "")
          )
            return (
              t.problems.push({
                code: "spec:name:empty-name",
                message: "empty name",
                line: t.source[0].number,
                critical: !0,
              }),
              t
            );
          if (l === "")
            return (
              t.problems.push({
                code: "spec:name:empty-default",
                message: "empty default value",
                line: t.source[0].number,
                critical: !0,
              }),
              t
            );
          if (!fy(l) && /=(?!>)/.test(l))
            return (
              t.problems.push({
                code: "spec:name:invalid-default",
                message: "invalid default value syntax",
                line: t.source[0].number,
                critical: !0,
              }),
              t
            );
        }
        return (
          (t.optional = s),
          (t.name = i),
          (r.name = c),
          l !== void 0 && (t.default = l),
          ([r.postName, r.description] = Pt(n.slice(r.name.length))),
          t
        );
      };
    }
    B(_u, "nameTokenizer");
    function Bu(e = "compact", t = Et) {
      let r = na(e);
      return (n) => ((n.description = r(n.source, t)), n);
    }
    B(Bu, "descriptionTokenizer");
    function na(e) {
      return e === "compact" ? Pu : e === "preserve" ? Nu : e;
    }
    B(na, "getJoiner");
    function Pu(e, t = Et) {
      return e
        .map(({ tokens: { description: r } }) => r.trim())
        .filter((r) => r !== "")
        .join(" ");
    }
    B(Pu, "compactJoiner");
    var my = B((e, { tokens: t }, r) => (t.type === "" ? e : r), "lineNo"),
      yy = B(
        ({ tokens: e }) =>
          (e.delimiter === "" ? e.start : e.postDelimiter.slice(1)) +
          e.description,
        "getDescription",
      );
    function Nu(e, t = Et) {
      if (e.length === 0) return "";
      e[0].tokens.description === "" &&
        e[0].tokens.delimiter === t.start &&
        (e = e.slice(1));
      let r = e[e.length - 1];
      return (
        r !== void 0 &&
          r.tokens.description === "" &&
          r.tokens.end.endsWith(t.end) &&
          (e = e.slice(0, -1)),
        (e = e.slice(e.reduce(my, 0))),
        e.map(yy).join(`
`)
      );
    }
    B(Nu, "preserveJoiner");
    function ju({
      startLine: e = 0,
      fence: t = "```",
      spacing: r = "compact",
      markers: n = Et,
      tokenizers: o = [ku(), Ru(r), _u(), Bu(r)],
    } = {}) {
      if (e < 0 || e % 1 > 0) throw new Error("Invalid startLine");
      let a = Fu({ startLine: e, markers: n }),
        i = xu({ fence: t }),
        s = Iu({ tokenizers: o }),
        l = na(r);
      return function (c) {
        let p = [];
        for (let h of Su(c)) {
          let d = a(h);
          if (d === null) continue;
          let y = i(d),
            g = y.slice(1).map(s);
          p.push({
            description: l(y[0], n),
            tags: g,
            source: d,
            problems: g.reduce((A, v) => A.concat(v.problems), []),
          });
        }
        return p;
      };
    }
    B(ju, "getParser");
    function Lu(e) {
      return (
        e.start +
        e.delimiter +
        e.postDelimiter +
        e.tag +
        e.postTag +
        e.type +
        e.postType +
        e.name +
        e.postName +
        e.description +
        e.end +
        e.lineEnd
      );
    }
    B(Lu, "join");
    function Mu() {
      return (e) =>
        e.source.map(({ tokens: t }) => Lu(t)).join(`
`);
    }
    B(Mu, "getStringifier");
    var gy = {
        line: 0,
        start: 0,
        delimiter: 0,
        postDelimiter: 0,
        tag: 0,
        postTag: 0,
        name: 0,
        postName: 0,
        type: 0,
        postType: 0,
        description: 0,
        end: 0,
        lineEnd: 0,
      },
      X5 = Object.keys(gy);
    function Uu(e, t = {}) {
      return ju(t)(e);
    }
    B(Uu, "parse");
    var Q5 = Mu();
    function $u(e) {
      return e != null && e.includes("@");
    }
    B($u, "containsJsDoc");
    function qu(e) {
      let t =
          `/**
` +
          (e ?? "")
            .split(
              `
`,
            )
            .map((n) => ` * ${n}`).join(`
`) +
          `
*/`,
        r = Uu(t, { spacing: "preserve" });
      if (!r || r.length === 0) throw new Error("Cannot parse JSDoc tags.");
      return r[0];
    }
    B(qu, "parse");
    var by = {
        tags: ["param", "arg", "argument", "returns", "ignore", "deprecated"],
      },
      Ey = B((e, t = by) => {
        if (!$u(e)) return { includesJsDoc: !1, ignore: !1 };
        let r = qu(e),
          n = Vu(r, t.tags);
        return n.ignore
          ? { includesJsDoc: !0, ignore: !0 }
          : {
              includesJsDoc: !0,
              ignore: !1,
              description: r.description.trim(),
              extractedTags: n,
            };
      }, "parseJsDoc");
    function Vu(e, t) {
      let r = { params: null, deprecated: null, returns: null, ignore: !1 };
      for (let n of e.tags)
        if (!(t !== void 0 && !t.includes(n.tag)))
          if (n.tag === "ignore") {
            r.ignore = !0;
            break;
          } else
            switch (n.tag) {
              case "param":
              case "arg":
              case "argument": {
                let o = zu(n);
                o != null &&
                  (r.params == null && (r.params = []), r.params.push(o));
                break;
              }
              case "deprecated": {
                let o = Hu(n);
                o != null && (r.deprecated = o);
                break;
              }
              case "returns": {
                let o = Gu(n);
                o != null && (r.returns = o);
                break;
              }
              default:
                break;
            }
      return r;
    }
    B(Vu, "extractJsDocTags");
    function Ju(e) {
      return e.replace(/[\.-]$/, "");
    }
    B(Ju, "normaliseParamName");
    function zu(e) {
      if (!e.name || e.name === "-") return null;
      let t = ia(e.type);
      return {
        name: e.name,
        type: t,
        description: aa(e.description),
        getPrettyName: B(() => Ju(e.name), "getPrettyName"),
        getTypeName: B(() => (t ? sa(t) : null), "getTypeName"),
      };
    }
    B(zu, "extractParam");
    function Hu(e) {
      return e.name ? oa(e.name, e.description) : null;
    }
    B(Hu, "extractDeprecated");
    function oa(e, t) {
      let r = e === "" ? t : `${e} ${t}`;
      return aa(r);
    }
    B(oa, "joinNameAndDescription");
    function aa(e) {
      let t = e.replace(/^- /g, "").trim();
      return t === "" ? null : t;
    }
    B(aa, "normaliseDescription");
    function Gu(e) {
      let t = ia(e.type);
      return t
        ? {
            type: t,
            description: oa(e.name, e.description),
            getTypeName: B(() => sa(t), "getTypeName"),
          }
        : null;
    }
    B(Gu, "extractReturns");
    var vt = (0, rr.stringifyRules)(),
      vy = vt.JsdocTypeObject;
    vt.JsdocTypeAny = () => "any";
    vt.JsdocTypeObject = (e, t) => `(${vy(e, t)})`;
    vt.JsdocTypeOptional = (e, t) => t(e.element);
    vt.JsdocTypeNullable = (e, t) => t(e.element);
    vt.JsdocTypeNotNullable = (e, t) => t(e.element);
    vt.JsdocTypeUnion = (e, t) => e.elements.map(t).join("|");
    function ia(e) {
      try {
        return (0, rr.parse)(e, "typescript");
      } catch {
        return null;
      }
    }
    B(ia, "extractType");
    function sa(e) {
      return (0, rr.transform)(vt, e);
    }
    B(sa, "extractTypeName");
    function la(e) {
      return e.length > 90;
    }
    B(la, "isTooLongForTypeSummary");
    function Wu(e) {
      return e.length > 50;
    }
    B(Wu, "isTooLongForDefaultValueSummary");
    function ge(e, t) {
      return e === t ? { summary: e } : { summary: e, detail: t };
    }
    B(ge, "createSummaryValue");
    var Z5 = B((e) => e.replace(/\\r\\n/g, "\\n"), "normalizeNewlines");
    function Ku(e, t) {
      if (e != null) {
        let { value: r } = e;
        if (!gn(r)) return Wu(r) ? ge(t?.name, r) : ge(r);
      }
      return null;
    }
    B(Ku, "createDefaultValue");
    function ua({ name: e, value: t, elements: r, raw: n }) {
      return t ?? (r != null ? r.map(ua).join(" | ") : (n ?? e));
    }
    B(ua, "generateUnionElement");
    function Yu({ name: e, raw: t, elements: r }) {
      return r != null
        ? ge(r.map(ua).join(" | "))
        : t != null
          ? ge(t.replace(/^\|\s*/, ""))
          : ge(e);
    }
    B(Yu, "generateUnion");
    function Xu({ type: e, raw: t }) {
      return t != null ? ge(t) : ge(e);
    }
    B(Xu, "generateFuncSignature");
    function Qu({ type: e, raw: t }) {
      return t != null ? (la(t) ? ge(e, t) : ge(t)) : ge(e);
    }
    B(Qu, "generateObjectSignature");
    function Zu(e) {
      let { type: t } = e;
      return t === "object" ? Qu(e) : Xu(e);
    }
    B(Zu, "generateSignature");
    function ec({ name: e, raw: t }) {
      return t != null ? (la(t) ? ge(e, t) : ge(t)) : ge(e);
    }
    B(ec, "generateDefault");
    function tc(e) {
      if (e == null) return null;
      switch (e.name) {
        case "union":
          return Yu(e);
        case "signature":
          return Zu(e);
        default:
          return ec(e);
      }
    }
    B(tc, "createType");
    var Ay = B((e, t) => {
      let { flowType: r, description: n, required: o, defaultValue: a } = t;
      return {
        name: e,
        type: tc(r),
        required: o,
        description: n,
        defaultValue: Ku(a ?? null, r ?? null),
      };
    }, "createFlowPropDef");
    function rc({ defaultValue: e }) {
      if (e != null) {
        let { value: t } = e;
        if (!gn(t)) return ge(t);
      }
      return null;
    }
    B(rc, "createDefaultValue");
    function nc({ tsType: e, required: t }) {
      if (e == null) return null;
      let r = e.name;
      return (
        t || (r = r.replace(" | undefined", "")),
        ge(["Array", "Record", "signature"].includes(e.name) ? e.raw : r)
      );
    }
    B(nc, "createType");
    var Dy = B((e, t) => {
      let { description: r, required: n } = t;
      return {
        name: e,
        type: nc(t),
        required: n,
        description: r,
        defaultValue: rc(t),
      };
    }, "createTsPropDef");
    function oc(e) {
      return e != null ? ge(e.name) : null;
    }
    B(oc, "createType");
    function ac(e) {
      let { computed: t, func: r } = e;
      return typeof t > "u" && typeof r > "u";
    }
    B(ac, "isReactDocgenTypescript");
    function ic(e) {
      return e
        ? e.name === "string"
          ? !0
          : e.name === "enum"
            ? Array.isArray(e.value) &&
              e.value.every(
                ({ value: t }) =>
                  typeof t == "string" &&
                  t[0] === '"' &&
                  t[t.length - 1] === '"',
              )
            : !1
        : !1;
    }
    B(ic, "isStringValued");
    function sc(e, t) {
      if (e != null) {
        let { value: r } = e;
        if (!gn(r)) return ac(e) && ic(t) ? ge(JSON.stringify(r)) : ge(r);
      }
      return null;
    }
    B(sc, "createDefaultValue");
    function ca(e, t, r) {
      let { description: n, required: o, defaultValue: a } = r;
      return {
        name: e,
        type: oc(t),
        required: o,
        description: n,
        defaultValue: sc(a, t),
      };
    }
    B(ca, "createBasicPropDef");
    function xr(e, t) {
      if (t?.includesJsDoc) {
        let { description: r, extractedTags: n } = t;
        r != null && (e.description = t.description);
        let o = {
          ...n,
          params: n?.params?.map((a) => ({
            name: a.getPrettyName(),
            description: a.description,
          })),
        };
        Object.values(o).filter(Boolean).length > 0 && (e.jsDocTags = o);
      }
      return e;
    }
    B(xr, "applyJsDocResult");
    var Sy = B((e, t, r) => {
        let n = ca(e, t.type, t);
        return (n.sbType = ta(t)), xr(n, r);
      }, "javaScriptFactory"),
      wy = B((e, t, r) => {
        let n = Dy(e, t);
        return (n.sbType = ta(t)), xr(n, r);
      }, "tsFactory"),
      Cy = B((e, t, r) => {
        let n = Ay(e, t);
        return (n.sbType = ta(t)), xr(n, r);
      }, "flowFactory"),
      xy = B((e, t, r) => {
        let n = ca(e, { name: "unknown" }, t);
        return xr(n, r);
      }, "unknownFactory"),
      lc = B((e) => {
        switch (e) {
          case "JavaScript":
            return Sy;
          case "TypeScript":
            return wy;
          case "Flow":
            return Cy;
          default:
            return xy;
        }
      }, "getPropDefFactory"),
      uc = B(
        (e) =>
          e.type != null
            ? "JavaScript"
            : e.flowType != null
              ? "Flow"
              : e.tsType != null
                ? "TypeScript"
                : "Unknown",
        "getTypeSystem",
      ),
      Ty = B((e) => {
        let t = uc(e[0]),
          r = lc(t);
        return e.map((n) => {
          let o = n;
          return (
            n.type?.elements &&
              (o = { ...n, type: { ...n.type, value: n.type.elements } }),
            da(o.name, o, t, r)
          );
        });
      }, "extractComponentSectionArray"),
      Fy = B((e) => {
        let t = Object.keys(e),
          r = uc(e[t[0]]),
          n = lc(r);
        return t
          .map((o) => {
            let a = e[o];
            return a != null ? da(o, a, r, n) : null;
          })
          .filter(Boolean);
      }, "extractComponentSectionObject"),
      eI = B((e, t) => {
        let r = Eu(e, t);
        return bu(r) ? (Array.isArray(r) ? Ty(r) : Fy(r)) : [];
      }, "extractComponentProps");
    function da(e, t, r, n) {
      let o = Ey(t.description);
      return o.includesJsDoc && o.ignore
        ? null
        : {
            propDef: n(e, t, o),
            jsDocTags: o.extractedTags,
            docgenInfo: t,
            typeSystem: r,
          };
    }
    B(da, "extractProp");
    function Iy(e) {
      return e != null ? vu(e) : "";
    }
    B(Iy, "extractComponentDescription");
    var rI = B((e) => {
        let {
            component: t,
            argTypes: r,
            parameters: { docs: n = {} },
          } = e,
          { extractArgTypes: o } = n,
          a = o && t ? o(t) : {};
        return a ? at(a, r) : r;
      }, "enhanceArgTypes"),
      cc = "storybook/docs",
      nI = `${cc}/panel`;
    var oI = `${cc}/snippet-rendered`,
      ky = ((e) => (
        (e.AUTO = "auto"), (e.CODE = "code"), (e.DYNAMIC = "dynamic"), e
      ))(ky || {}),
      Ry = /(addons\/|addon-|addon-essentials\/)(docs|controls)/,
      aI = B(
        (e) => e.presetsList?.some((t) => Ry.test(t.name)),
        "hasDocsOrControls",
      );
    q();
    V();
    J();
    q();
    V();
    J();
    var EI = __STORYBOOK_CHANNELS__,
      {
        Channel: vI,
        HEARTBEAT_INTERVAL: AI,
        HEARTBEAT_MAX_LATENCY: DI,
        PostMessageTransport: SI,
        WebsocketTransport: wI,
        createBrowserChannel: CI,
      } = __STORYBOOK_CHANNELS__;
    q();
    V();
    J();
    var dc = (() => {
      let e;
      return (
        typeof window < "u"
          ? (e = window)
          : typeof globalThis < "u"
            ? (e = globalThis)
            : typeof window < "u"
              ? (e = window)
              : typeof self < "u"
                ? (e = self)
                : (e = {}),
        e
      );
    })();
    var id = $e({
        "../../node_modules/memoizerific/memoizerific.js"(e, t) {
          (function (r) {
            if (typeof e == "object" && typeof t < "u") t.exports = r();
            else if (typeof define == "function" && define.amd) define([], r);
            else {
              var n;
              typeof window < "u" || typeof window < "u"
                ? (n = window)
                : typeof self < "u"
                  ? (n = self)
                  : (n = this),
                (n.memoizerific = r());
            }
          })(function () {
            return (function r(n, o, a) {
              function i(c, p) {
                if (!o[c]) {
                  if (!n[c]) {
                    var h = typeof mr == "function" && mr;
                    if (!p && h) return h(c, !0);
                    if (s) return s(c, !0);
                    var d = new Error("Cannot find module '" + c + "'");
                    throw ((d.code = "MODULE_NOT_FOUND"), d);
                  }
                  var y = (o[c] = { exports: {} });
                  n[c][0].call(
                    y.exports,
                    function (g) {
                      var A = n[c][1][g];
                      return i(A || g);
                    },
                    y,
                    y.exports,
                    r,
                    n,
                    o,
                    a,
                  );
                }
                return o[c].exports;
              }
              for (
                var s = typeof mr == "function" && mr, l = 0;
                l < a.length;
                l++
              )
                i(a[l]);
              return i;
            })(
              {
                1: [
                  function (r, n, o) {
                    n.exports = function (a) {
                      if (typeof Map != "function" || a) {
                        var i = r("./similar");
                        return new i();
                      } else return new Map();
                    };
                  },
                  { "./similar": 2 },
                ],
                2: [
                  function (r, n, o) {
                    function a() {
                      return (
                        (this.list = []),
                        (this.lastItem = void 0),
                        (this.size = 0),
                        this
                      );
                    }
                    (a.prototype.get = function (i) {
                      var s;
                      if (this.lastItem && this.isEqual(this.lastItem.key, i))
                        return this.lastItem.val;
                      if (((s = this.indexOf(i)), s >= 0))
                        return (this.lastItem = this.list[s]), this.list[s].val;
                    }),
                      (a.prototype.set = function (i, s) {
                        var l;
                        return this.lastItem &&
                          this.isEqual(this.lastItem.key, i)
                          ? ((this.lastItem.val = s), this)
                          : ((l = this.indexOf(i)),
                            l >= 0
                              ? ((this.lastItem = this.list[l]),
                                (this.list[l].val = s),
                                this)
                              : ((this.lastItem = { key: i, val: s }),
                                this.list.push(this.lastItem),
                                this.size++,
                                this));
                      }),
                      (a.prototype.delete = function (i) {
                        var s;
                        if (
                          (this.lastItem &&
                            this.isEqual(this.lastItem.key, i) &&
                            (this.lastItem = void 0),
                          (s = this.indexOf(i)),
                          s >= 0)
                        )
                          return this.size--, this.list.splice(s, 1)[0];
                      }),
                      (a.prototype.has = function (i) {
                        var s;
                        return this.lastItem &&
                          this.isEqual(this.lastItem.key, i)
                          ? !0
                          : ((s = this.indexOf(i)),
                            s >= 0 ? ((this.lastItem = this.list[s]), !0) : !1);
                      }),
                      (a.prototype.forEach = function (i, s) {
                        var l;
                        for (l = 0; l < this.size; l++)
                          i.call(
                            s || this,
                            this.list[l].val,
                            this.list[l].key,
                            this,
                          );
                      }),
                      (a.prototype.indexOf = function (i) {
                        var s;
                        for (s = 0; s < this.size; s++)
                          if (this.isEqual(this.list[s].key, i)) return s;
                        return -1;
                      }),
                      (a.prototype.isEqual = function (i, s) {
                        return i === s || (i !== i && s !== s);
                      }),
                      (n.exports = a);
                  },
                  {},
                ],
                3: [
                  function (r, n, o) {
                    var a = r("map-or-similar");
                    n.exports = function (c) {
                      var p = new a(!1),
                        h = [];
                      return function (d) {
                        var y = function () {
                          var g = p,
                            A,
                            v,
                            S = arguments.length - 1,
                            w = Array(S + 1),
                            x = !0,
                            C;
                          if (
                            (y.numArgs || y.numArgs === 0) &&
                            y.numArgs !== S + 1
                          )
                            throw new Error(
                              "Memoizerific functions should always be called with the same number of arguments",
                            );
                          for (C = 0; C < S; C++) {
                            if (
                              ((w[C] = { cacheItem: g, arg: arguments[C] }),
                              g.has(arguments[C]))
                            ) {
                              g = g.get(arguments[C]);
                              continue;
                            }
                            (x = !1),
                              (A = new a(!1)),
                              g.set(arguments[C], A),
                              (g = A);
                          }
                          return (
                            x &&
                              (g.has(arguments[S])
                                ? (v = g.get(arguments[S]))
                                : (x = !1)),
                            x ||
                              ((v = d.apply(null, arguments)),
                              g.set(arguments[S], v)),
                            c > 0 &&
                              ((w[S] = { cacheItem: g, arg: arguments[S] }),
                              x ? i(h, w) : h.push(w),
                              h.length > c && s(h.shift())),
                            (y.wasMemoized = x),
                            (y.numArgs = S + 1),
                            v
                          );
                        };
                        return (
                          (y.limit = c),
                          (y.wasMemoized = !1),
                          (y.cache = p),
                          (y.lru = h),
                          y
                        );
                      };
                    };
                    function i(c, p) {
                      var h = c.length,
                        d = p.length,
                        y,
                        g,
                        A;
                      for (g = 0; g < h; g++) {
                        for (y = !0, A = 0; A < d; A++)
                          if (!l(c[g][A].arg, p[A].arg)) {
                            y = !1;
                            break;
                          }
                        if (y) break;
                      }
                      c.push(c.splice(g, 1)[0]);
                    }
                    function s(c) {
                      var p = c.length,
                        h = c[p - 1],
                        d,
                        y;
                      for (
                        h.cacheItem.delete(h.arg), y = p - 2;
                        y >= 0 &&
                        ((h = c[y]),
                        (d = h.cacheItem.get(h.arg)),
                        !d || !d.size);
                        y--
                      )
                        h.cacheItem.delete(h.arg);
                    }
                    function l(c, p) {
                      return c === p || (c !== c && p !== p);
                    }
                  },
                  { "map-or-similar": 1 },
                ],
              },
              {},
              [3],
            )(3);
          });
        },
      }),
      bg = $e({
        "../../node_modules/tocbot/src/js/default-options.js"(e, t) {
          t.exports = {
            tocSelector: ".js-toc",
            contentSelector: ".js-toc-content",
            headingSelector: "h1, h2, h3",
            ignoreSelector: ".js-toc-ignore",
            hasInnerContainers: !1,
            linkClass: "toc-link",
            extraLinkClasses: "",
            activeLinkClass: "is-active-link",
            listClass: "toc-list",
            extraListClasses: "",
            isCollapsedClass: "is-collapsed",
            collapsibleClass: "is-collapsible",
            listItemClass: "toc-list-item",
            activeListItemClass: "is-active-li",
            collapseDepth: 0,
            scrollSmooth: !0,
            scrollSmoothDuration: 420,
            scrollSmoothOffset: 0,
            scrollEndCallback: function (r) {},
            headingsOffset: 1,
            throttleTimeout: 50,
            positionFixedSelector: null,
            positionFixedClass: "is-position-fixed",
            fixedSidebarOffset: "auto",
            includeHtml: !1,
            includeTitleTags: !1,
            onClick: function (r) {},
            orderedList: !0,
            scrollContainer: null,
            skipRendering: !1,
            headingLabelCallback: !1,
            ignoreHiddenElements: !1,
            headingObjectCallback: null,
            basePath: "",
            disableTocScrollSync: !1,
            tocScrollOffset: 0,
          };
        },
      }),
      Eg = $e({
        "../../node_modules/tocbot/src/js/build-html.js"(e, t) {
          t.exports = function (r) {
            var n = [].forEach,
              o = [].some,
              a = document.body,
              i,
              s = !0,
              l = " ";
            function c(C, k) {
              var F = k.appendChild(h(C));
              if (C.children.length) {
                var _ = d(C.isCollapsed);
                C.children.forEach(function (j) {
                  c(j, _);
                }),
                  F.appendChild(_);
              }
            }
            function p(C, k) {
              var F = !1,
                _ = d(F);
              if (
                (k.forEach(function (j) {
                  c(j, _);
                }),
                (i = C || i),
                i !== null)
              )
                return (
                  i.firstChild && i.removeChild(i.firstChild),
                  k.length === 0 ? i : i.appendChild(_)
                );
            }
            function h(C) {
              var k = document.createElement("li"),
                F = document.createElement("a");
              return (
                r.listItemClass && k.setAttribute("class", r.listItemClass),
                r.onClick && (F.onclick = r.onClick),
                r.includeTitleTags && F.setAttribute("title", C.textContent),
                r.includeHtml && C.childNodes.length
                  ? n.call(C.childNodes, function (_) {
                      F.appendChild(_.cloneNode(!0));
                    })
                  : (F.textContent = C.textContent),
                F.setAttribute("href", r.basePath + "#" + C.id),
                F.setAttribute(
                  "class",
                  r.linkClass +
                    l +
                    "node-name--" +
                    C.nodeName +
                    l +
                    r.extraLinkClasses,
                ),
                k.appendChild(F),
                k
              );
            }
            function d(C) {
              var k = r.orderedList ? "ol" : "ul",
                F = document.createElement(k),
                _ = r.listClass + l + r.extraListClasses;
              return (
                C &&
                  ((_ = _ + l + r.collapsibleClass),
                  (_ = _ + l + r.isCollapsedClass)),
                F.setAttribute("class", _),
                F
              );
            }
            function y() {
              if (
                r.scrollContainer &&
                document.querySelector(r.scrollContainer)
              ) {
                var C;
                C = document.querySelector(r.scrollContainer).scrollTop;
              } else C = document.documentElement.scrollTop || a.scrollTop;
              var k = document.querySelector(r.positionFixedSelector);
              r.fixedSidebarOffset === "auto" &&
                (r.fixedSidebarOffset = i.offsetTop),
                C > r.fixedSidebarOffset
                  ? k.className.indexOf(r.positionFixedClass) === -1 &&
                    (k.className += l + r.positionFixedClass)
                  : (k.className = k.className.replace(
                      l + r.positionFixedClass,
                      "",
                    ));
            }
            function g(C) {
              var k = 0;
              return (
                C !== null &&
                  ((k = C.offsetTop),
                  r.hasInnerContainers && (k += g(C.offsetParent))),
                k
              );
            }
            function A(C, k) {
              return C && C.className !== k && (C.className = k), C;
            }
            function v(C) {
              if (
                r.scrollContainer &&
                document.querySelector(r.scrollContainer)
              ) {
                var k;
                k = document.querySelector(r.scrollContainer).scrollTop;
              } else k = document.documentElement.scrollTop || a.scrollTop;
              r.positionFixedSelector && y();
              var F = C,
                _;
              if (s && i !== null && F.length > 0) {
                o.call(F, function (D, T) {
                  if (g(D) > k + r.headingsOffset + 10) {
                    var O = T === 0 ? T : T - 1;
                    return (_ = F[O]), !0;
                  } else if (T === F.length - 1)
                    return (_ = F[F.length - 1]), !0;
                });
                var j = i.querySelector("." + r.activeLinkClass),
                  M = i.querySelector(
                    "." +
                      r.linkClass +
                      ".node-name--" +
                      _.nodeName +
                      '[href="' +
                      r.basePath +
                      "#" +
                      _.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/\\@])/g, "\\$1") +
                      '"]',
                  );
                if (j === M) return;
                var P = i.querySelectorAll("." + r.linkClass);
                n.call(P, function (D) {
                  A(D, D.className.replace(l + r.activeLinkClass, ""));
                });
                var W = i.querySelectorAll("." + r.listItemClass);
                n.call(W, function (D) {
                  A(D, D.className.replace(l + r.activeListItemClass, ""));
                }),
                  M &&
                    M.className.indexOf(r.activeLinkClass) === -1 &&
                    (M.className += l + r.activeLinkClass);
                var L = M && M.parentNode;
                L &&
                  L.className.indexOf(r.activeListItemClass) === -1 &&
                  (L.className += l + r.activeListItemClass);
                var z = i.querySelectorAll(
                  "." + r.listClass + "." + r.collapsibleClass,
                );
                n.call(z, function (D) {
                  D.className.indexOf(r.isCollapsedClass) === -1 &&
                    (D.className += l + r.isCollapsedClass);
                }),
                  M &&
                    M.nextSibling &&
                    M.nextSibling.className.indexOf(r.isCollapsedClass) !==
                      -1 &&
                    A(
                      M.nextSibling,
                      M.nextSibling.className.replace(
                        l + r.isCollapsedClass,
                        "",
                      ),
                    ),
                  S(M && M.parentNode.parentNode);
              }
            }
            function S(C) {
              return C &&
                C.className.indexOf(r.collapsibleClass) !== -1 &&
                C.className.indexOf(r.isCollapsedClass) !== -1
                ? (A(C, C.className.replace(l + r.isCollapsedClass, "")),
                  S(C.parentNode.parentNode))
                : C;
            }
            function w(C) {
              var k = C.target || C.srcElement;
              typeof k.className != "string" ||
                k.className.indexOf(r.linkClass) === -1 ||
                (s = !1);
            }
            function x() {
              s = !0;
            }
            return {
              enableTocAnimation: x,
              disableTocAnimation: w,
              render: p,
              updateToc: v,
            };
          };
        },
      }),
      vg = $e({
        "../../node_modules/tocbot/src/js/parse-content.js"(e, t) {
          t.exports = function (r) {
            var n = [].reduce;
            function o(h) {
              return h[h.length - 1];
            }
            function a(h) {
              return +h.nodeName.toUpperCase().replace("H", "");
            }
            function i(h) {
              try {
                return (
                  h instanceof window.HTMLElement ||
                  h instanceof window.parent.HTMLElement
                );
              } catch {
                return h instanceof window.HTMLElement;
              }
            }
            function s(h) {
              if (!i(h)) return h;
              if (
                r.ignoreHiddenElements &&
                (!h.offsetHeight || !h.offsetParent)
              )
                return null;
              let d =
                h.getAttribute("data-heading-label") ||
                (r.headingLabelCallback
                  ? String(r.headingLabelCallback(h.innerText))
                  : (h.innerText || h.textContent).trim());
              var y = {
                id: h.id,
                children: [],
                nodeName: h.nodeName,
                headingLevel: a(h),
                textContent: d,
              };
              return (
                r.includeHtml && (y.childNodes = h.childNodes),
                r.headingObjectCallback ? r.headingObjectCallback(y, h) : y
              );
            }
            function l(h, d) {
              for (
                var y = s(h),
                  g = y.headingLevel,
                  A = d,
                  v = o(A),
                  S = v ? v.headingLevel : 0,
                  w = g - S;
                w > 0 && ((v = o(A)), !(v && g === v.headingLevel));

              )
                v && v.children !== void 0 && (A = v.children), w--;
              return g >= r.collapseDepth && (y.isCollapsed = !0), A.push(y), A;
            }
            function c(h, d) {
              var y = d;
              r.ignoreSelector &&
                (y = d.split(",").map(function (g) {
                  return g.trim() + ":not(" + r.ignoreSelector + ")";
                }));
              try {
                return h.querySelectorAll(y);
              } catch {
                return (
                  console.warn("Headers not found with selector: " + y), null
                );
              }
            }
            function p(h) {
              return n.call(
                h,
                function (d, y) {
                  var g = s(y);
                  return g && l(g, d.nest), d;
                },
                { nest: [] },
              );
            }
            return { nestHeadingsArray: p, selectHeadings: c };
          };
        },
      }),
      Ag = $e({
        "../../node_modules/tocbot/src/js/update-toc-scroll.js"(e, t) {
          t.exports = function (r) {
            var n = r.tocElement || document.querySelector(r.tocSelector);
            if (n && n.scrollHeight > n.clientHeight) {
              var o = n.querySelector("." + r.activeListItemClass);
              o && (n.scrollTop = o.offsetTop - r.tocScrollOffset);
            }
          };
        },
      }),
      Dg = $e({
        "../../node_modules/tocbot/src/js/scroll-smooth/index.js"(e) {
          e.initSmoothScrolling = t;
          function t(n) {
            var o = n.duration,
              a = n.offset,
              i = location.hash ? c(location.href) : location.href;
            s();
            function s() {
              document.body.addEventListener("click", h, !1);
              function h(d) {
                !l(d.target) ||
                  d.target.className.indexOf("no-smooth-scroll") > -1 ||
                  (d.target.href.charAt(d.target.href.length - 2) === "#" &&
                    d.target.href.charAt(d.target.href.length - 1) === "!") ||
                  d.target.className.indexOf(n.linkClass) === -1 ||
                  r(d.target.hash, {
                    duration: o,
                    offset: a,
                    callback: function () {
                      p(d.target.hash);
                    },
                  });
              }
            }
            function l(h) {
              return (
                h.tagName.toLowerCase() === "a" &&
                (h.hash.length > 0 ||
                  h.href.charAt(h.href.length - 1) === "#") &&
                (c(h.href) === i || c(h.href) + "#" === i)
              );
            }
            function c(h) {
              return h.slice(0, h.lastIndexOf("#"));
            }
            function p(h) {
              var d = document.getElementById(h.substring(1));
              d &&
                (/^(?:a|select|input|button|textarea)$/i.test(d.tagName) ||
                  (d.tabIndex = -1),
                d.focus());
            }
          }
          function r(n, o) {
            var a = window.pageYOffset,
              i = {
                duration: o.duration,
                offset: o.offset || 0,
                callback: o.callback,
                easing: o.easing || g,
              },
              s =
                document.querySelector(
                  '[id="' + decodeURI(n).split("#").join("") + '"]',
                ) ||
                document.querySelector('[id="' + n.split("#").join("") + '"]'),
              l =
                typeof n == "string"
                  ? i.offset +
                    (n
                      ? (s && s.getBoundingClientRect().top) || 0
                      : -(
                          document.documentElement.scrollTop ||
                          document.body.scrollTop
                        ))
                  : n,
              c = typeof i.duration == "function" ? i.duration(l) : i.duration,
              p,
              h;
            requestAnimationFrame(function (A) {
              (p = A), d(A);
            });
            function d(A) {
              (h = A - p),
                window.scrollTo(0, i.easing(h, a, l, c)),
                h < c ? requestAnimationFrame(d) : y();
            }
            function y() {
              window.scrollTo(0, a + l),
                typeof i.callback == "function" && i.callback();
            }
            function g(A, v, S, w) {
              return (
                (A /= w / 2),
                A < 1
                  ? (S / 2) * A * A + v
                  : (A--, (-S / 2) * (A * (A - 2) - 1) + v)
              );
            }
          }
        },
      }),
      Sg = $e({
        "../../node_modules/tocbot/src/js/index.js"(e, t) {
          (function (r, n) {
            typeof define == "function" && define.amd
              ? define([], n(r))
              : typeof e == "object"
                ? (t.exports = n(r))
                : (r.tocbot = n(r));
          })(typeof window < "u" ? window : window || window, function (r) {
            var n = bg(),
              o = {},
              a = {},
              i = Eg(),
              s = vg(),
              l = Ag(),
              c,
              p,
              h =
                !!r &&
                !!r.document &&
                !!r.document.querySelector &&
                !!r.addEventListener;
            if (typeof window > "u" && !h) return;
            var d,
              y = Object.prototype.hasOwnProperty;
            function g() {
              for (var w = {}, x = 0; x < arguments.length; x++) {
                var C = arguments[x];
                for (var k in C) y.call(C, k) && (w[k] = C[k]);
              }
              return w;
            }
            function A(w, x, C) {
              x || (x = 250);
              var k, F;
              return function () {
                var _ = C || this,
                  j = +new Date(),
                  M = arguments;
                k && j < k + x
                  ? (clearTimeout(F),
                    (F = setTimeout(function () {
                      (k = j), w.apply(_, M);
                    }, x)))
                  : ((k = j), w.apply(_, M));
              };
            }
            function v(w) {
              try {
                return (
                  w.contentElement || document.querySelector(w.contentSelector)
                );
              } catch {
                return (
                  console.warn(
                    "Contents element not found: " + w.contentSelector,
                  ),
                  null
                );
              }
            }
            function S(w) {
              try {
                return w.tocElement || document.querySelector(w.tocSelector);
              } catch {
                return (
                  console.warn("TOC element not found: " + w.tocSelector), null
                );
              }
            }
            return (
              (a.destroy = function () {
                var w = S(o);
                w !== null &&
                  (o.skipRendering || (w && (w.innerHTML = "")),
                  o.scrollContainer && document.querySelector(o.scrollContainer)
                    ? (document
                        .querySelector(o.scrollContainer)
                        .removeEventListener(
                          "scroll",
                          this._scrollListener,
                          !1,
                        ),
                      document
                        .querySelector(o.scrollContainer)
                        .removeEventListener(
                          "resize",
                          this._scrollListener,
                          !1,
                        ),
                      c &&
                        document
                          .querySelector(o.scrollContainer)
                          .removeEventListener(
                            "click",
                            this._clickListener,
                            !1,
                          ))
                    : (document.removeEventListener(
                        "scroll",
                        this._scrollListener,
                        !1,
                      ),
                      document.removeEventListener(
                        "resize",
                        this._scrollListener,
                        !1,
                      ),
                      c &&
                        document.removeEventListener(
                          "click",
                          this._clickListener,
                          !1,
                        )));
              }),
              (a.init = function (w) {
                if (h) {
                  (o = g(n, w || {})),
                    (this.options = o),
                    (this.state = {}),
                    o.scrollSmooth &&
                      ((o.duration = o.scrollSmoothDuration),
                      (o.offset = o.scrollSmoothOffset),
                      (a.scrollSmooth = Dg().initSmoothScrolling(o))),
                    (c = i(o)),
                    (p = s(o)),
                    (this._buildHtml = c),
                    (this._parseContent = p),
                    (this._headingsArray = d),
                    a.destroy();
                  var x = v(o);
                  if (x !== null) {
                    var C = S(o);
                    if (
                      C !== null &&
                      ((d = p.selectHeadings(x, o.headingSelector)), d !== null)
                    ) {
                      var k = p.nestHeadingsArray(d),
                        F = k.nest;
                      if (!o.skipRendering) c.render(C, F);
                      else return this;
                      (this._scrollListener = A(function (j) {
                        c.updateToc(d), !o.disableTocScrollSync && l(o);
                        var M =
                          j &&
                          j.target &&
                          j.target.scrollingElement &&
                          j.target.scrollingElement.scrollTop === 0;
                        ((j &&
                          (j.eventPhase === 0 || j.currentTarget === null)) ||
                          M) &&
                          (c.updateToc(d),
                          o.scrollEndCallback && o.scrollEndCallback(j));
                      }, o.throttleTimeout)),
                        this._scrollListener(),
                        o.scrollContainer &&
                        document.querySelector(o.scrollContainer)
                          ? (document
                              .querySelector(o.scrollContainer)
                              .addEventListener(
                                "scroll",
                                this._scrollListener,
                                !1,
                              ),
                            document
                              .querySelector(o.scrollContainer)
                              .addEventListener(
                                "resize",
                                this._scrollListener,
                                !1,
                              ))
                          : (document.addEventListener(
                              "scroll",
                              this._scrollListener,
                              !1,
                            ),
                            document.addEventListener(
                              "resize",
                              this._scrollListener,
                              !1,
                            ));
                      var _ = null;
                      return (
                        (this._clickListener = A(function (j) {
                          o.scrollSmooth && c.disableTocAnimation(j),
                            c.updateToc(d),
                            _ && clearTimeout(_),
                            (_ = setTimeout(function () {
                              c.enableTocAnimation();
                            }, o.scrollSmoothDuration));
                        }, o.throttleTimeout)),
                        o.scrollContainer &&
                        document.querySelector(o.scrollContainer)
                          ? document
                              .querySelector(o.scrollContainer)
                              .addEventListener(
                                "click",
                                this._clickListener,
                                !1,
                              )
                          : document.addEventListener(
                              "click",
                              this._clickListener,
                              !1,
                            ),
                        this
                      );
                    }
                  }
                }
              }),
              (a.refresh = function (w) {
                a.destroy(), a.init(w || this.options);
              }),
              (r.tocbot = a),
              a
            );
          });
        },
      });
    function ir() {
      return (
        (ir = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
        ir.apply(null, arguments)
      );
    }
    function wg(e) {
      if (e === void 0)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        );
      return e;
    }
    function Or(e, t) {
      return (
        (Or = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (r, n) {
              return (r.__proto__ = n), r;
            }),
        Or(e, t)
      );
    }
    function Cg(e, t) {
      (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        Or(e, t);
    }
    function Oa(e) {
      return (
        (Oa = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            }),
        Oa(e)
      );
    }
    function xg(e) {
      try {
        return Function.toString.call(e).indexOf("[native code]") !== -1;
      } catch {
        return typeof e == "function";
      }
    }
    function sd() {
      try {
        var e = !Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {}),
        );
      } catch {}
      return (sd = function () {
        return !!e;
      })();
    }
    function Tg(e, t, r) {
      if (sd()) return Reflect.construct.apply(null, arguments);
      var n = [null];
      n.push.apply(n, t);
      var o = new (e.bind.apply(e, n))();
      return r && Or(o, r.prototype), o;
    }
    function _a(e) {
      var t = typeof Map == "function" ? new Map() : void 0;
      return (
        (_a = function (r) {
          if (r === null || !xg(r)) return r;
          if (typeof r != "function")
            throw new TypeError(
              "Super expression must either be null or a function",
            );
          if (t !== void 0) {
            if (t.has(r)) return t.get(r);
            t.set(r, n);
          }
          function n() {
            return Tg(r, arguments, Oa(this).constructor);
          }
          return (
            (n.prototype = Object.create(r.prototype, {
              constructor: {
                value: n,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            Or(n, r)
          );
        }),
        _a(e)
      );
    }
    var Fg = {
      1: `Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).

`,
      2: `Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).

`,
      3: `Passed an incorrect argument to a color function, please pass a string representation of a color.

`,
      4: `Couldn't generate valid rgb string from %s, it returned %s.

`,
      5: `Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,
      6: `Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).

`,
      7: `Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).

`,
      8: `Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,
      9: `Please provide a number of steps to the modularScale helper.

`,
      10: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
      11: `Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,
      12: `Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,
      13: `Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,
      14: `Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,
      15: `Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,
      16: `You must provide a template to this method.

`,
      17: `You passed an unsupported selector state to this method.

`,
      18: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
      19: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
      20: `expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
      21: "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
      22: "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
      23: `fontFace expects a name of a font-family.

`,
      24: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
      25: `fontFace expects localFonts to be an array.

`,
      26: `fontFace expects fileFormats to be an array.

`,
      27: `radialGradient requries at least 2 color-stops to properly render.

`,
      28: `Please supply a filename to retinaImage() as the first argument.

`,
      29: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
      30: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
      31: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,
      32: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,
      33: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,
      34: `borderRadius expects a radius value as a string or number as the second argument.

`,
      35: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
      36: `Property must be a string value.

`,
      37: `Syntax Error at %s.

`,
      38: `Formula contains a function that needs parentheses at %s.

`,
      39: `Formula is missing closing parenthesis at %s.

`,
      40: `Formula has too many closing parentheses at %s.

`,
      41: `All values in a formula must have the same unit or be unitless.

`,
      42: `Please provide a number of steps to the modularScale helper.

`,
      43: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
      44: `Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,
      45: `Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,
      46: `Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,
      47: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
      48: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
      49: `Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
      50: `Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,
      51: `Expects the first argument object to have the properties prop, fromSize, and toSize.

`,
      52: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
      53: `fontFace expects localFonts to be an array.

`,
      54: `fontFace expects fileFormats to be an array.

`,
      55: `fontFace expects a name of a font-family.

`,
      56: `linearGradient requries at least 2 color-stops to properly render.

`,
      57: `radialGradient requries at least 2 color-stops to properly render.

`,
      58: `Please supply a filename to retinaImage() as the first argument.

`,
      59: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
      60: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
      61: `Property must be a string value.

`,
      62: `borderRadius expects a radius value as a string or number as the second argument.

`,
      63: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
      64: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,
      65: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').

`,
      66: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,
      67: `You must provide a template to this method.

`,
      68: `You passed an unsupported selector state to this method.

`,
      69: `Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,
      70: `Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,
      71: `Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,
      72: `Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,
      73: `Please provide a valid CSS variable.

`,
      74: `CSS variable not found and no default was provided.

`,
      75: `important requires a valid style object, got a %s instead.

`,
      76: `fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,
      77: `remToPx expects a value in "rem" but you provided it in "%s".

`,
      78: `base must be set in "px" or "%" but you set it in "%s".
`,
    };
    function Ig() {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      var n = t[0],
        o = [],
        a;
      for (a = 1; a < t.length; a += 1) o.push(t[a]);
      return (
        o.forEach(function (i) {
          n = n.replace(/%[a-z]/, i);
        }),
        n
      );
    }
    var Ze = (function (e) {
      Cg(t, e);
      function t(r) {
        for (
          var n, o = arguments.length, a = new Array(o > 1 ? o - 1 : 0), i = 1;
          i < o;
          i++
        )
          a[i - 1] = arguments[i];
        return (
          (n = e.call(this, Ig.apply(void 0, [Fg[r]].concat(a))) || this), wg(n)
        );
      }
      return t;
    })(_a(Error));
    function va(e) {
      return Math.round(e * 255);
    }
    function kg(e, t, r) {
      return va(e) + "," + va(t) + "," + va(r);
    }
    function _r(e, t, r, n) {
      if ((n === void 0 && (n = kg), t === 0)) return n(r, r, r);
      var o = (((e % 360) + 360) % 360) / 60,
        a = (1 - Math.abs(2 * r - 1)) * t,
        i = a * (1 - Math.abs((o % 2) - 1)),
        s = 0,
        l = 0,
        c = 0;
      o >= 0 && o < 1
        ? ((s = a), (l = i))
        : o >= 1 && o < 2
          ? ((s = i), (l = a))
          : o >= 2 && o < 3
            ? ((l = a), (c = i))
            : o >= 3 && o < 4
              ? ((l = i), (c = a))
              : o >= 4 && o < 5
                ? ((s = i), (c = a))
                : o >= 5 && o < 6 && ((s = a), (c = i));
      var p = r - a / 2,
        h = s + p,
        d = l + p,
        y = c + p;
      return n(h, d, y);
    }
    var Oc = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "00ffff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "0000ff",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "00ffff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "ff00ff",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "639",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32",
    };
    function Rg(e) {
      if (typeof e != "string") return e;
      var t = e.toLowerCase();
      return Oc[t] ? "#" + Oc[t] : e;
    }
    var Og = /^#[a-fA-F0-9]{6}$/,
      _g = /^#[a-fA-F0-9]{8}$/,
      Bg = /^#[a-fA-F0-9]{3}$/,
      Pg = /^#[a-fA-F0-9]{4}$/,
      Aa =
        /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,
      Ng =
        /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,
      jg =
        /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,
      Lg =
        /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
    function In(e) {
      if (typeof e != "string") throw new Ze(3);
      var t = Rg(e);
      if (t.match(Og))
        return {
          red: parseInt("" + t[1] + t[2], 16),
          green: parseInt("" + t[3] + t[4], 16),
          blue: parseInt("" + t[5] + t[6], 16),
        };
      if (t.match(_g)) {
        var r = parseFloat((parseInt("" + t[7] + t[8], 16) / 255).toFixed(2));
        return {
          red: parseInt("" + t[1] + t[2], 16),
          green: parseInt("" + t[3] + t[4], 16),
          blue: parseInt("" + t[5] + t[6], 16),
          alpha: r,
        };
      }
      if (t.match(Bg))
        return {
          red: parseInt("" + t[1] + t[1], 16),
          green: parseInt("" + t[2] + t[2], 16),
          blue: parseInt("" + t[3] + t[3], 16),
        };
      if (t.match(Pg)) {
        var n = parseFloat((parseInt("" + t[4] + t[4], 16) / 255).toFixed(2));
        return {
          red: parseInt("" + t[1] + t[1], 16),
          green: parseInt("" + t[2] + t[2], 16),
          blue: parseInt("" + t[3] + t[3], 16),
          alpha: n,
        };
      }
      var o = Aa.exec(t);
      if (o)
        return {
          red: parseInt("" + o[1], 10),
          green: parseInt("" + o[2], 10),
          blue: parseInt("" + o[3], 10),
        };
      var a = Ng.exec(t.substring(0, 50));
      if (a)
        return {
          red: parseInt("" + a[1], 10),
          green: parseInt("" + a[2], 10),
          blue: parseInt("" + a[3], 10),
          alpha:
            parseFloat("" + a[4]) > 1
              ? parseFloat("" + a[4]) / 100
              : parseFloat("" + a[4]),
        };
      var i = jg.exec(t);
      if (i) {
        var s = parseInt("" + i[1], 10),
          l = parseInt("" + i[2], 10) / 100,
          c = parseInt("" + i[3], 10) / 100,
          p = "rgb(" + _r(s, l, c) + ")",
          h = Aa.exec(p);
        if (!h) throw new Ze(4, t, p);
        return {
          red: parseInt("" + h[1], 10),
          green: parseInt("" + h[2], 10),
          blue: parseInt("" + h[3], 10),
        };
      }
      var d = Lg.exec(t.substring(0, 50));
      if (d) {
        var y = parseInt("" + d[1], 10),
          g = parseInt("" + d[2], 10) / 100,
          A = parseInt("" + d[3], 10) / 100,
          v = "rgb(" + _r(y, g, A) + ")",
          S = Aa.exec(v);
        if (!S) throw new Ze(4, t, v);
        return {
          red: parseInt("" + S[1], 10),
          green: parseInt("" + S[2], 10),
          blue: parseInt("" + S[3], 10),
          alpha:
            parseFloat("" + d[4]) > 1
              ? parseFloat("" + d[4]) / 100
              : parseFloat("" + d[4]),
        };
      }
      throw new Ze(5);
    }
    function Mg(e) {
      var t = e.red / 255,
        r = e.green / 255,
        n = e.blue / 255,
        o = Math.max(t, r, n),
        a = Math.min(t, r, n),
        i = (o + a) / 2;
      if (o === a)
        return e.alpha !== void 0
          ? { hue: 0, saturation: 0, lightness: i, alpha: e.alpha }
          : { hue: 0, saturation: 0, lightness: i };
      var s,
        l = o - a,
        c = i > 0.5 ? l / (2 - o - a) : l / (o + a);
      switch (o) {
        case t:
          s = (r - n) / l + (r < n ? 6 : 0);
          break;
        case r:
          s = (n - t) / l + 2;
          break;
        default:
          s = (t - r) / l + 4;
          break;
      }
      return (
        (s *= 60),
        e.alpha !== void 0
          ? { hue: s, saturation: c, lightness: i, alpha: e.alpha }
          : { hue: s, saturation: c, lightness: i }
      );
    }
    function ld(e) {
      return Mg(In(e));
    }
    var Ug = function (e) {
        return e.length === 7 && e[1] === e[2] && e[3] === e[4] && e[5] === e[6]
          ? "#" + e[1] + e[3] + e[5]
          : e;
      },
      Ba = Ug;
    function jt(e) {
      var t = e.toString(16);
      return t.length === 1 ? "0" + t : t;
    }
    function Da(e) {
      return jt(Math.round(e * 255));
    }
    function $g(e, t, r) {
      return Ba("#" + Da(e) + Da(t) + Da(r));
    }
    function Fn(e, t, r) {
      return _r(e, t, r, $g);
    }
    function qg(e, t, r) {
      if (typeof e == "number" && typeof t == "number" && typeof r == "number")
        return Fn(e, t, r);
      if (typeof e == "object" && t === void 0 && r === void 0)
        return Fn(e.hue, e.saturation, e.lightness);
      throw new Ze(1);
    }
    function Vg(e, t, r, n) {
      if (
        typeof e == "number" &&
        typeof t == "number" &&
        typeof r == "number" &&
        typeof n == "number"
      )
        return n >= 1 ? Fn(e, t, r) : "rgba(" + _r(e, t, r) + "," + n + ")";
      if (typeof e == "object" && t === void 0 && r === void 0 && n === void 0)
        return e.alpha >= 1
          ? Fn(e.hue, e.saturation, e.lightness)
          : "rgba(" +
              _r(e.hue, e.saturation, e.lightness) +
              "," +
              e.alpha +
              ")";
      throw new Ze(2);
    }
    function Pa(e, t, r) {
      if (typeof e == "number" && typeof t == "number" && typeof r == "number")
        return Ba("#" + jt(e) + jt(t) + jt(r));
      if (typeof e == "object" && t === void 0 && r === void 0)
        return Ba("#" + jt(e.red) + jt(e.green) + jt(e.blue));
      throw new Ze(6);
    }
    function st(e, t, r, n) {
      if (typeof e == "string" && typeof t == "number") {
        var o = In(e);
        return "rgba(" + o.red + "," + o.green + "," + o.blue + "," + t + ")";
      } else {
        if (
          typeof e == "number" &&
          typeof t == "number" &&
          typeof r == "number" &&
          typeof n == "number"
        )
          return n >= 1
            ? Pa(e, t, r)
            : "rgba(" + e + "," + t + "," + r + "," + n + ")";
        if (
          typeof e == "object" &&
          t === void 0 &&
          r === void 0 &&
          n === void 0
        )
          return e.alpha >= 1
            ? Pa(e.red, e.green, e.blue)
            : "rgba(" +
                e.red +
                "," +
                e.green +
                "," +
                e.blue +
                "," +
                e.alpha +
                ")";
      }
      throw new Ze(7);
    }
    var Jg = function (e) {
        return (
          typeof e.red == "number" &&
          typeof e.green == "number" &&
          typeof e.blue == "number" &&
          (typeof e.alpha != "number" || typeof e.alpha > "u")
        );
      },
      zg = function (e) {
        return (
          typeof e.red == "number" &&
          typeof e.green == "number" &&
          typeof e.blue == "number" &&
          typeof e.alpha == "number"
        );
      },
      Hg = function (e) {
        return (
          typeof e.hue == "number" &&
          typeof e.saturation == "number" &&
          typeof e.lightness == "number" &&
          (typeof e.alpha != "number" || typeof e.alpha > "u")
        );
      },
      Gg = function (e) {
        return (
          typeof e.hue == "number" &&
          typeof e.saturation == "number" &&
          typeof e.lightness == "number" &&
          typeof e.alpha == "number"
        );
      };
    function ud(e) {
      if (typeof e != "object") throw new Ze(8);
      if (zg(e)) return st(e);
      if (Jg(e)) return Pa(e);
      if (Gg(e)) return Vg(e);
      if (Hg(e)) return qg(e);
      throw new Ze(8);
    }
    function cd(e, t, r) {
      return function () {
        var n = r.concat(Array.prototype.slice.call(arguments));
        return n.length >= t ? e.apply(this, n) : cd(e, t, n);
      };
    }
    function kn(e) {
      return cd(e, e.length, []);
    }
    function Rn(e, t, r) {
      return Math.max(e, Math.min(t, r));
    }
    function Wg(e, t) {
      if (t === "transparent") return t;
      var r = ld(t);
      return ud(
        ir({}, r, { lightness: Rn(0, 1, r.lightness - parseFloat(e)) }),
      );
    }
    var Kg = kn(Wg),
      Qe = Kg;
    function Yg(e, t) {
      if (t === "transparent") return t;
      var r = ld(t);
      return ud(
        ir({}, r, { lightness: Rn(0, 1, r.lightness + parseFloat(e)) }),
      );
    }
    var Xg = kn(Yg),
      Lt = Xg;
    function Qg(e, t) {
      if (t === "transparent") return t;
      var r = In(t),
        n = typeof r.alpha == "number" ? r.alpha : 1,
        o = ir({}, r, {
          alpha: Rn(0, 1, (n * 100 + parseFloat(e) * 100) / 100),
        });
      return st(o);
    }
    var Zg = kn(Qg),
      Sn = Zg;
    function e0(e, t) {
      if (t === "transparent") return t;
      var r = In(t),
        n = typeof r.alpha == "number" ? r.alpha : 1,
        o = ir({}, r, {
          alpha: Rn(0, 1, +(n * 100 - parseFloat(e) * 100).toFixed(2) / 100),
        });
      return st(o);
    }
    var t0 = kn(e0),
      ce = t0,
      r0 = R.div(Gt, ({ theme: e }) => ({
        backgroundColor:
          e.base === "light" ? "rgba(0,0,0,.01)" : "rgba(255,255,255,.01)",
        borderRadius: e.appBorderRadius,
        border: `1px dashed ${e.appBorderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        margin: "25px 0 40px",
        color: ce(0.3, e.color.defaultText),
        fontSize: e.typography.size.s2,
      })),
      dd = (e) =>
        f.createElement(r0, {
          ...e,
          className: "docblock-emptyblock sb-unstyled",
        }),
      n0 = R(Ur)(({ theme: e }) => ({
        fontSize: `${e.typography.size.s2 - 1}px`,
        lineHeight: "19px",
        margin: "25px 0 40px",
        borderRadius: e.appBorderRadius,
        boxShadow:
          e.base === "light"
            ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0"
            : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
        "pre.prismjs": { padding: 20, background: "inherit" },
      })),
      o0 = R.div(({ theme: e }) => ({
        background: e.background.content,
        borderRadius: e.appBorderRadius,
        border: `1px solid ${e.appBorderColor}`,
        boxShadow:
          e.base === "light"
            ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0"
            : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
        margin: "25px 0 40px",
        padding: "20px 20px 20px 22px",
      })),
      wn = R.div(({ theme: e }) => ({
        animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
        background: e.appBorderColor,
        height: 17,
        marginTop: 1,
        width: "60%",
        [`&:first-child${zi}`]: { margin: 0 },
      })),
      a0 = () =>
        f.createElement(
          o0,
          null,
          f.createElement(wn, null),
          f.createElement(wn, { style: { width: "80%" } }),
          f.createElement(wn, { style: { width: "30%" } }),
          f.createElement(wn, { style: { width: "80%" } }),
        ),
      i0 = ({
        isLoading: e,
        error: t,
        language: r,
        code: n,
        dark: o,
        format: a = !1,
        ...i
      }) => {
        let { typography: s } = co();
        if (e) return f.createElement(a0, null);
        if (t) return f.createElement(dd, null, t);
        let l = f.createElement(
          n0,
          {
            bordered: !0,
            copyable: !0,
            format: a,
            language: r,
            className: "docblock-source sb-unstyled",
            ...i,
          },
          n,
        );
        if (typeof o > "u") return l;
        let c = o ? uo.dark : uo.light;
        return f.createElement(
          Vi,
          {
            theme: Ji({ ...c, fontCode: s.fonts.mono, fontBase: s.fonts.base }),
          },
          l,
        );
      },
      be = (e) =>
        `& :where(${e}:not(.sb-anchor, .sb-unstyled, .sb-unstyled ${e}))`,
      $a = 600;
    R.h1(Gt, ({ theme: e }) => ({
      color: e.color.defaultText,
      fontSize: e.typography.size.m3,
      fontWeight: e.typography.weight.bold,
      lineHeight: "32px",
      [`@media (min-width: ${$a}px)`]: {
        fontSize: e.typography.size.l1,
        lineHeight: "36px",
        marginBottom: "16px",
      },
    }));
    R.h2(Gt, ({ theme: e }) => ({
      fontWeight: e.typography.weight.regular,
      fontSize: e.typography.size.s3,
      lineHeight: "20px",
      borderBottom: "none",
      marginBottom: 15,
      [`@media (min-width: ${$a}px)`]: {
        fontSize: e.typography.size.m1,
        lineHeight: "28px",
        marginBottom: 24,
      },
      color: ce(0.25, e.color.defaultText),
    }));
    R.div(({ theme: e }) => {
      let t = {
          fontFamily: e.typography.fonts.base,
          fontSize: e.typography.size.s3,
          margin: 0,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
          WebkitOverflowScrolling: "touch",
        },
        r = {
          margin: "20px 0 8px",
          padding: 0,
          cursor: "text",
          position: "relative",
          color: e.color.defaultText,
          "&:first-of-type": { marginTop: 0, paddingTop: 0 },
          "&:hover a.anchor": { textDecoration: "none" },
          "& code": { fontSize: "inherit" },
        },
        n = {
          lineHeight: 1,
          margin: "0 2px",
          padding: "3px 5px",
          whiteSpace: "nowrap",
          borderRadius: 3,
          fontSize: e.typography.size.s2 - 1,
          border:
            e.base === "light"
              ? `1px solid ${e.color.mediumlight}`
              : `1px solid ${e.color.darker}`,
          color:
            e.base === "light"
              ? ce(0.1, e.color.defaultText)
              : ce(0.3, e.color.defaultText),
          backgroundColor:
            e.base === "light" ? e.color.lighter : e.color.border,
        };
      return {
        maxWidth: 1e3,
        width: "100%",
        [be("a")]: {
          ...t,
          fontSize: "inherit",
          lineHeight: "24px",
          color: e.color.secondary,
          textDecoration: "none",
          "&.absent": { color: "#cc0000" },
          "&.anchor": {
            display: "block",
            paddingLeft: 30,
            marginLeft: -30,
            cursor: "pointer",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
          },
        },
        [be("blockquote")]: {
          ...t,
          margin: "16px 0",
          borderLeft: `4px solid ${e.color.medium}`,
          padding: "0 15px",
          color: e.color.dark,
          "& > :first-of-type": { marginTop: 0 },
          "& > :last-child": { marginBottom: 0 },
        },
        [be("div")]: t,
        [be("dl")]: {
          ...t,
          margin: "16px 0",
          padding: 0,
          "& dt": {
            fontSize: "14px",
            fontWeight: "bold",
            fontStyle: "italic",
            padding: 0,
            margin: "16px 0 4px",
          },
          "& dt:first-of-type": { padding: 0 },
          "& dt > :first-of-type": { marginTop: 0 },
          "& dt > :last-child": { marginBottom: 0 },
          "& dd": { margin: "0 0 16px", padding: "0 15px" },
          "& dd > :first-of-type": { marginTop: 0 },
          "& dd > :last-child": { marginBottom: 0 },
        },
        [be("h1")]: {
          ...t,
          ...r,
          fontSize: `${e.typography.size.l1}px`,
          fontWeight: e.typography.weight.bold,
        },
        [be("h2")]: {
          ...t,
          ...r,
          fontSize: `${e.typography.size.m2}px`,
          paddingBottom: 4,
          borderBottom: `1px solid ${e.appBorderColor}`,
        },
        [be("h3")]: {
          ...t,
          ...r,
          fontSize: `${e.typography.size.m1}px`,
          fontWeight: e.typography.weight.bold,
        },
        [be("h4")]: { ...t, ...r, fontSize: `${e.typography.size.s3}px` },
        [be("h5")]: { ...t, ...r, fontSize: `${e.typography.size.s2}px` },
        [be("h6")]: {
          ...t,
          ...r,
          fontSize: `${e.typography.size.s2}px`,
          color: e.color.dark,
        },
        [be("hr")]: {
          border: "0 none",
          borderTop: `1px solid ${e.appBorderColor}`,
          height: 4,
          padding: 0,
        },
        [be("img")]: { maxWidth: "100%" },
        [be("li")]: {
          ...t,
          fontSize: e.typography.size.s2,
          color: e.color.defaultText,
          lineHeight: "24px",
          "& + li": { marginTop: ".25em" },
          "& ul, & ol": { marginTop: ".25em", marginBottom: 0 },
          "& code": n,
        },
        [be("ol")]: {
          ...t,
          margin: "16px 0",
          paddingLeft: 30,
          "& :first-of-type": { marginTop: 0 },
          "& :last-child": { marginBottom: 0 },
        },
        [be("p")]: {
          ...t,
          margin: "16px 0",
          fontSize: e.typography.size.s2,
          lineHeight: "24px",
          color: e.color.defaultText,
          "& code": n,
        },
        [be("pre")]: {
          ...t,
          fontFamily: e.typography.fonts.mono,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          lineHeight: "18px",
          padding: "11px 1rem",
          whiteSpace: "pre-wrap",
          color: "inherit",
          borderRadius: 3,
          margin: "1rem 0",
          "&:not(.prismjs)": {
            background: "transparent",
            border: "none",
            borderRadius: 0,
            padding: 0,
            margin: 0,
          },
          "& pre, &.prismjs": {
            padding: 15,
            margin: 0,
            whiteSpace: "pre-wrap",
            color: "inherit",
            fontSize: "13px",
            lineHeight: "19px",
            code: { color: "inherit", fontSize: "inherit" },
          },
          "& code": { whiteSpace: "pre" },
          "& code, & tt": { border: "none" },
        },
        [be("span")]: {
          ...t,
          "&.frame": {
            display: "block",
            overflow: "hidden",
            "& > span": {
              border: `1px solid ${e.color.medium}`,
              display: "block",
              float: "left",
              overflow: "hidden",
              margin: "13px 0 0",
              padding: 7,
              width: "auto",
            },
            "& span img": { display: "block", float: "left" },
            "& span span": {
              clear: "both",
              color: e.color.darkest,
              display: "block",
              padding: "5px 0 0",
            },
          },
          "&.align-center": {
            display: "block",
            overflow: "hidden",
            clear: "both",
            "& > span": {
              display: "block",
              overflow: "hidden",
              margin: "13px auto 0",
              textAlign: "center",
            },
            "& span img": { margin: "0 auto", textAlign: "center" },
          },
          "&.align-right": {
            display: "block",
            overflow: "hidden",
            clear: "both",
            "& > span": {
              display: "block",
              overflow: "hidden",
              margin: "13px 0 0",
              textAlign: "right",
            },
            "& span img": { margin: 0, textAlign: "right" },
          },
          "&.float-left": {
            display: "block",
            marginRight: 13,
            overflow: "hidden",
            float: "left",
            "& span": { margin: "13px 0 0" },
          },
          "&.float-right": {
            display: "block",
            marginLeft: 13,
            overflow: "hidden",
            float: "right",
            "& > span": {
              display: "block",
              overflow: "hidden",
              margin: "13px auto 0",
              textAlign: "right",
            },
          },
        },
        [be("table")]: {
          ...t,
          margin: "16px 0",
          fontSize: e.typography.size.s2,
          lineHeight: "24px",
          padding: 0,
          borderCollapse: "collapse",
          "& tr": {
            borderTop: `1px solid ${e.appBorderColor}`,
            backgroundColor: e.appContentBg,
            margin: 0,
            padding: 0,
          },
          "& tr:nth-of-type(2n)": {
            backgroundColor:
              e.base === "dark" ? e.color.darker : e.color.lighter,
          },
          "& tr th": {
            fontWeight: "bold",
            color: e.color.defaultText,
            border: `1px solid ${e.appBorderColor}`,
            margin: 0,
            padding: "6px 13px",
          },
          "& tr td": {
            border: `1px solid ${e.appBorderColor}`,
            color: e.color.defaultText,
            margin: 0,
            padding: "6px 13px",
          },
          "& tr th :first-of-type, & tr td :first-of-type": { marginTop: 0 },
          "& tr th :last-child, & tr td :last-child": { marginBottom: 0 },
        },
        [be("ul")]: {
          ...t,
          margin: "16px 0",
          paddingLeft: 30,
          "& :first-of-type": { marginTop: 0 },
          "& :last-child": { marginBottom: 0 },
          listStyle: "disc",
        },
      };
    });
    R.div(({ theme: e }) => ({
      background: e.background.content,
      display: "flex",
      justifyContent: "center",
      padding: "4rem 20px",
      minHeight: "100vh",
      boxSizing: "border-box",
      gap: "3rem",
      [`@media (min-width: ${$a}px)`]: {},
    }));
    var On = (e) => ({
        borderRadius: e.appBorderRadius,
        background: e.background.content,
        boxShadow:
          e.base === "light"
            ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0"
            : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
        border: `1px solid ${e.appBorderColor}`,
      }),
      s0 = gr({ scale: 1 });
    R.strong(({ theme: e }) => ({ color: e.color.orange }));
    var l0 = R(Gn)({
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        transition: "transform .2s linear",
      }),
      u0 = R.div({ display: "flex", alignItems: "center", gap: 4 }),
      c0 = R.div(({ theme: e }) => ({
        width: 14,
        height: 14,
        borderRadius: 2,
        margin: "0 7px",
        backgroundColor: e.appBorderColor,
        animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
      })),
      d0 = ({
        isLoading: e,
        storyId: t,
        baseUrl: r,
        zoom: n,
        resetZoom: o,
        ...a
      }) =>
        f.createElement(
          l0,
          { ...a },
          f.createElement(
            u0,
            { key: "left" },
            e
              ? [1, 2, 3].map((i) => f.createElement(c0, { key: i }))
              : f.createElement(
                  f.Fragment,
                  null,
                  f.createElement(
                    Ke,
                    {
                      key: "zoomin",
                      onClick: (i) => {
                        i.preventDefault(), n(0.8);
                      },
                      title: "Zoom in",
                    },
                    f.createElement(os, null),
                  ),
                  f.createElement(
                    Ke,
                    {
                      key: "zoomout",
                      onClick: (i) => {
                        i.preventDefault(), n(1.25);
                      },
                      title: "Zoom out",
                    },
                    f.createElement(as, null),
                  ),
                  f.createElement(
                    Ke,
                    {
                      key: "zoomreset",
                      onClick: (i) => {
                        i.preventDefault(), o();
                      },
                      title: "Reset zoom",
                    },
                    f.createElement(is, null),
                  ),
                ),
          ),
        ),
      p0 = R.div(
        ({ isColumn: e, columns: t, layout: r }) => ({
          display: e || !t ? "block" : "flex",
          position: "relative",
          flexWrap: "wrap",
          overflow: "auto",
          flexDirection: e ? "column" : "row",
          "& .innerZoomElementWrapper > *": e
            ? {
                width: r !== "fullscreen" ? "calc(100% - 20px)" : "100%",
                display: "block",
              }
            : {
                maxWidth: r !== "fullscreen" ? "calc(100% - 20px)" : "100%",
                display: "inline-block",
              },
        }),
        ({ layout: e = "padded" }) =>
          e === "centered" || e === "padded"
            ? {
                padding: "30px 20px",
                "& .innerZoomElementWrapper > *": {
                  width: "auto",
                  border: "10px solid transparent!important",
                },
              }
            : {},
        ({ layout: e = "padded" }) =>
          e === "centered"
            ? {
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center",
              }
            : {},
        ({ columns: e }) =>
          e && e > 1
            ? {
                ".innerZoomElementWrapper > *": {
                  minWidth: `calc(100% / ${e} - 20px)`,
                },
              }
            : {},
      ),
      _c = R(i0)(({ theme: e }) => ({
        margin: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: e.appBorderRadius,
        borderBottomRightRadius: e.appBorderRadius,
        border: "none",
        background:
          e.base === "light"
            ? "rgba(0, 0, 0, 0.85)"
            : Qe(0.05, e.background.content),
        color: e.color.lightest,
        button: {
          background:
            e.base === "light"
              ? "rgba(0, 0, 0, 0.85)"
              : Qe(0.05, e.background.content),
        },
      })),
      h0 = R.div(
        ({ theme: e, withSource: t, isExpanded: r }) => ({
          position: "relative",
          overflow: "hidden",
          margin: "25px 0 40px",
          ...On(e),
          borderBottomLeftRadius: t && r && 0,
          borderBottomRightRadius: t && r && 0,
          borderBottomWidth: r && 0,
          "h3 + &": { marginTop: "16px" },
        }),
        ({ withToolbar: e }) => e && { paddingTop: 40 },
      ),
      f0 = (e, t, r) => {
        switch (!0) {
          case !!(e && e.error):
            return {
              source: null,
              actionItem: {
                title: "No code available",
                className:
                  "docblock-code-toggle docblock-code-toggle--disabled",
                disabled: !0,
                onClick: () => r(!1),
              },
            };
          case t:
            return {
              source: f.createElement(_c, { ...e, dark: !0 }),
              actionItem: {
                title: "Hide code",
                className:
                  "docblock-code-toggle docblock-code-toggle--expanded",
                onClick: () => r(!1),
              },
            };
          default:
            return {
              source: f.createElement(_c, { ...e, dark: !0 }),
              actionItem: {
                title: "Show code",
                className: "docblock-code-toggle",
                onClick: () => r(!0),
              },
            };
        }
      };
    function m0(e) {
      if (di.count(e) === 1) {
        let t = e;
        if (t.props) return t.props.id;
      }
      return null;
    }
    var y0 = R(d0)({
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 40,
      }),
      g0 = R.div({ overflow: "hidden", position: "relative" }),
      b0 = ({
        isLoading: e,
        isColumn: t,
        columns: r,
        children: n,
        withSource: o,
        withToolbar: a = !1,
        isExpanded: i = !1,
        additionalActions: s,
        className: l,
        layout: c = "padded",
        ...p
      }) => {
        let [h, d] = Z(i),
          { source: y, actionItem: g } = f0(o, h, d),
          [A, v] = Z(1),
          S = [l].concat(["sbdocs", "sbdocs-preview", "sb-unstyled"]),
          w = o ? [g] : [],
          [x, C] = Z(s ? [...s] : []),
          k = [...w, ...x],
          { window: F } = globalThis,
          _ = Ce(async (M) => {
            let { createCopyToClipboardFunction: P } =
              await Promise.resolve().then(() => ($r(), gi));
            P();
          }, []),
          j = (M) => {
            let P = F.getSelection();
            (P && P.type === "Range") ||
              (M.preventDefault(),
              x.filter((W) => W.title === "Copied").length === 0 &&
                _(y.props.code).then(() => {
                  C([...x, { title: "Copied", onClick: () => {} }]),
                    F.setTimeout(
                      () => C(x.filter((W) => W.title !== "Copied")),
                      1500,
                    );
                }));
          };
        return f.createElement(
          h0,
          { withSource: o, withToolbar: a, ...p, className: S.join(" ") },
          a &&
            f.createElement(y0, {
              isLoading: e,
              border: !0,
              zoom: (M) => v(A * M),
              resetZoom: () => v(1),
              storyId: m0(n),
              baseUrl: "./iframe.html",
            }),
          f.createElement(
            s0.Provider,
            { value: { scale: A } },
            f.createElement(
              g0,
              { className: "docs-story", onCopyCapture: o && j },
              f.createElement(
                p0,
                { isColumn: t || !Array.isArray(n), columns: r, layout: c },
                f.createElement(
                  Qn.Element,
                  { scale: A },
                  Array.isArray(n)
                    ? n.map((M, P) => f.createElement("div", { key: P }, M))
                    : f.createElement("div", null, n),
                ),
              ),
              f.createElement(qn, { actionItems: k }),
            ),
          ),
          o && h && y,
        );
      };
    R(b0)(() => ({ ".docs-story": { paddingTop: 32, paddingBottom: 40 } }));
    function Mt() {
      return (
        (Mt = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
        Mt.apply(this, arguments)
      );
    }
    var E0 = ["children", "options"],
      G = {
        blockQuote: "0",
        breakLine: "1",
        breakThematic: "2",
        codeBlock: "3",
        codeFenced: "4",
        codeInline: "5",
        footnote: "6",
        footnoteReference: "7",
        gfmTask: "8",
        heading: "9",
        headingSetext: "10",
        htmlBlock: "11",
        htmlComment: "12",
        htmlSelfClosing: "13",
        image: "14",
        link: "15",
        linkAngleBraceStyleDetector: "16",
        linkBareUrlDetector: "17",
        linkMailtoDetector: "18",
        newlineCoalescer: "19",
        orderedList: "20",
        paragraph: "21",
        ref: "22",
        refImage: "23",
        refLink: "24",
        table: "25",
        tableSeparator: "26",
        text: "27",
        textBolded: "28",
        textEmphasized: "29",
        textEscaped: "30",
        textMarked: "31",
        textStrikethroughed: "32",
        unorderedList: "33",
      },
      Bc;
    (function (e) {
      (e[(e.MAX = 0)] = "MAX"),
        (e[(e.HIGH = 1)] = "HIGH"),
        (e[(e.MED = 2)] = "MED"),
        (e[(e.LOW = 3)] = "LOW"),
        (e[(e.MIN = 4)] = "MIN");
    })(Bc || (Bc = {}));
    var Pc = [
        "allowFullScreen",
        "allowTransparency",
        "autoComplete",
        "autoFocus",
        "autoPlay",
        "cellPadding",
        "cellSpacing",
        "charSet",
        "classId",
        "colSpan",
        "contentEditable",
        "contextMenu",
        "crossOrigin",
        "encType",
        "formAction",
        "formEncType",
        "formMethod",
        "formNoValidate",
        "formTarget",
        "frameBorder",
        "hrefLang",
        "inputMode",
        "keyParams",
        "keyType",
        "marginHeight",
        "marginWidth",
        "maxLength",
        "mediaGroup",
        "minLength",
        "noValidate",
        "radioGroup",
        "readOnly",
        "rowSpan",
        "spellCheck",
        "srcDoc",
        "srcLang",
        "srcSet",
        "tabIndex",
        "useMap",
      ].reduce((e, t) => ((e[t.toLowerCase()] = t), e), {
        class: "className",
        for: "htmlFor",
      }),
      Nc = {
        amp: "&",
        apos: "'",
        gt: ">",
        lt: "<",
        nbsp: "\xA0",
        quot: "\u201C",
      },
      v0 = ["style", "script"],
      A0 =
        /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,
      D0 = /mailto:/i,
      S0 = /\n{2,}$/,
      pd = /^(\s*>[\s\S]*?)(?=\n\n|$)/,
      w0 = /^ *> ?/gm,
      C0 = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/,
      x0 = /^ {2,}\n/,
      T0 = /^(?:( *[-*_])){3,} *(?:\n *)+\n/,
      hd =
        /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/,
      fd = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,
      F0 = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
      I0 = /^(?:\n *)*\n/,
      k0 = /\r\n?/g,
      R0 = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/,
      O0 = /^\[\^([^\]]+)]/,
      _0 = /\f/g,
      B0 = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/,
      P0 = /^\s*?\[(x|\s)\]/,
      md = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,
      yd = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,
      gd = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,
      Na =
        /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i,
      N0 = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,
      bd = /^<!--[\s\S]*?(?:-->)/,
      j0 = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/,
      ja =
        /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,
      L0 = /^\{.*\}$/,
      M0 = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
      U0 = /^<([^ >]+@[^ >]+)>/,
      $0 = /^<([^ >]+:\/[^ >]+)>/,
      q0 = /-([a-z])?/gi,
      Ed = /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/,
      V0 = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,
      J0 = /^!\[([^\]]*)\] ?\[([^\]]*)\]/,
      z0 = /^\[([^\]]*)\] ?\[([^\]]*)\]/,
      H0 = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,
      G0 = /\t/g,
      W0 = /(^ *\||\| *$)/g,
      K0 = /^ *:-+: *$/,
      Y0 = /^ *:-+ *$/,
      X0 = /^ *-+: *$/,
      _n =
        "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~~.*?~~|==.*?==|.|\\n)*?)",
      Q0 = new RegExp(`^([*_])\\1${_n}\\1\\1(?!\\1)`),
      Z0 = new RegExp(`^([*_])${_n}\\1(?!\\1|\\w)`),
      e2 = new RegExp(`^==${_n}==`),
      t2 = new RegExp(`^~~${_n}~~`),
      r2 = /^\\([^0-9A-Za-z\s])/,
      n2 =
        /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,
      o2 = /^\n+/,
      a2 = /^([ \t]*)/,
      i2 = /\\([^\\])/g,
      jc = / *\n+$/,
      s2 = /(?:^|\n)( *)$/,
      qa = "(?:\\d+\\.)",
      Va = "(?:[*+-])";
    function vd(e) {
      return "( *)(" + (e === 1 ? qa : Va) + ") +";
    }
    var Ad = vd(1),
      Dd = vd(2);
    function Sd(e) {
      return new RegExp("^" + (e === 1 ? Ad : Dd));
    }
    var l2 = Sd(1),
      u2 = Sd(2);
    function wd(e) {
      return new RegExp(
        "^" +
          (e === 1 ? Ad : Dd) +
          "[^\\n]*(?:\\n(?!\\1" +
          (e === 1 ? qa : Va) +
          " )[^\\n]*)*(\\n|$)",
        "gm",
      );
    }
    var Cd = wd(1),
      xd = wd(2);
    function Td(e) {
      let t = e === 1 ? qa : Va;
      return new RegExp(
        "^( *)(" +
          t +
          ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" +
          t +
          " (?!" +
          t +
          " ))\\n*|\\s*\\n*$)",
      );
    }
    var Fd = Td(1),
      Id = Td(2);
    function Lc(e, t) {
      let r = t === 1,
        n = r ? Fd : Id,
        o = r ? Cd : xd,
        a = r ? l2 : u2;
      return {
        match(i, s) {
          let l = s2.exec(s.prevCapture);
          return l && (s.list || (!s.inline && !s.simple))
            ? n.exec((i = l[1] + i))
            : null;
        },
        order: 1,
        parse(i, s, l) {
          let c = r ? +i[2] : void 0,
            p = i[0]
              .replace(
                S0,
                `
`,
              )
              .match(o),
            h = !1;
          return {
            items: p.map(function (d, y) {
              let g = a.exec(d)[0].length,
                A = new RegExp("^ {1," + g + "}", "gm"),
                v = d.replace(A, "").replace(a, ""),
                S = y === p.length - 1,
                w =
                  v.indexOf(`

`) !== -1 ||
                  (S && h);
              h = w;
              let x = l.inline,
                C = l.list,
                k;
              (l.list = !0),
                w
                  ? ((l.inline = !1),
                    (k = v.replace(
                      jc,
                      `

`,
                    )))
                  : ((l.inline = !0), (k = v.replace(jc, "")));
              let F = s(k, l);
              return (l.inline = x), (l.list = C), F;
            }),
            ordered: r,
            start: c,
          };
        },
        render: (i, s, l) =>
          e(
            i.ordered ? "ol" : "ul",
            { key: l.key, start: i.type === G.orderedList ? i.start : void 0 },
            i.items.map(function (c, p) {
              return e("li", { key: p }, s(c, l));
            }),
          ),
      };
    }
    var c2 = new RegExp(
        `^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`,
      ),
      d2 = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,
      kd = [pd, hd, fd, md, gd, yd, bd, Ed, Cd, Fd, xd, Id],
      p2 = [...kd, /^[^\n]+(?:  \n|\n{2,})/, Na, ja];
    function Ir(e) {
      return e
        .replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a")
        .replace(/[çÇ]/g, "c")
        .replace(/[ðÐ]/g, "d")
        .replace(/[ÈÉÊËéèêë]/g, "e")
        .replace(/[ÏïÎîÍíÌì]/g, "i")
        .replace(/[Ññ]/g, "n")
        .replace(/[øØœŒÕõÔôÓóÒò]/g, "o")
        .replace(/[ÜüÛûÚúÙù]/g, "u")
        .replace(/[ŸÿÝý]/g, "y")
        .replace(/[^a-z0-9- ]/gi, "")
        .replace(/ /gi, "-")
        .toLowerCase();
    }
    function h2(e) {
      return X0.test(e)
        ? "right"
        : K0.test(e)
          ? "center"
          : Y0.test(e)
            ? "left"
            : null;
    }
    function Mc(e, t, r, n) {
      let o = r.inTable;
      r.inTable = !0;
      let a = e
        .trim()
        .split(/( *(?:`[^`]*`|\\\||\|) *)/)
        .reduce(
          (s, l) => (
            l.trim() === "|"
              ? s.push(
                  n ? { type: G.tableSeparator } : { type: G.text, text: l },
                )
              : l !== "" && s.push.apply(s, t(l, r)),
            s
          ),
          [],
        );
      r.inTable = o;
      let i = [[]];
      return (
        a.forEach(function (s, l) {
          s.type === G.tableSeparator
            ? l !== 0 && l !== a.length - 1 && i.push([])
            : (s.type !== G.text ||
                (a[l + 1] != null && a[l + 1].type !== G.tableSeparator) ||
                (s.text = s.text.trimEnd()),
              i[i.length - 1].push(s));
        }),
        i
      );
    }
    function f2(e, t, r) {
      r.inline = !0;
      let n = e[2] ? e[2].replace(W0, "").split("|").map(h2) : [],
        o = e[3]
          ? (function (i, s, l) {
              return i
                .trim()
                .split(
                  `
`,
                )
                .map(function (c) {
                  return Mc(c, s, l, !0);
                });
            })(e[3], t, r)
          : [],
        a = Mc(e[1], t, r, !!o.length);
      return (
        (r.inline = !1),
        o.length
          ? { align: n, cells: o, header: a, type: G.table }
          : { children: a, type: G.paragraph }
      );
    }
    function Uc(e, t) {
      return e.align[t] == null ? {} : { textAlign: e.align[t] };
    }
    function At(e) {
      return function (t, r) {
        return r.inline ? e.exec(t) : null;
      };
    }
    function Dt(e) {
      return function (t, r) {
        return r.inline || r.simple ? e.exec(t) : null;
      };
    }
    function it(e) {
      return function (t, r) {
        return r.inline || r.simple ? null : e.exec(t);
      };
    }
    function kr(e) {
      return function (t) {
        return e.exec(t);
      };
    }
    function m2(e, t) {
      if (t.inline || t.simple) return null;
      let r = "";
      e.split(
        `
`,
      ).every(
        (o) =>
          !kd.some((a) => a.test(o)) &&
          ((r +=
            o +
            `
`),
          o.trim()),
      );
      let n = r.trimEnd();
      return n == "" ? null : [r, n];
    }
    function y2(e) {
      try {
        if (
          decodeURIComponent(e)
            .replace(/[^A-Za-z0-9/:]/g, "")
            .match(/^\s*(javascript|vbscript|data(?!:image)):/i)
        )
          return null;
      } catch {
        return null;
      }
      return e;
    }
    function $c(e) {
      return e.replace(i2, "$1");
    }
    function Tn(e, t, r) {
      let n = r.inline || !1,
        o = r.simple || !1;
      (r.inline = !0), (r.simple = !0);
      let a = e(t, r);
      return (r.inline = n), (r.simple = o), a;
    }
    function g2(e, t, r) {
      let n = r.inline || !1,
        o = r.simple || !1;
      (r.inline = !1), (r.simple = !0);
      let a = e(t, r);
      return (r.inline = n), (r.simple = o), a;
    }
    function b2(e, t, r) {
      let n = r.inline || !1;
      r.inline = !1;
      let o = e(t, r);
      return (r.inline = n), o;
    }
    var Sa = (e, t, r) => ({ children: Tn(t, e[1], r) });
    function wa() {
      return {};
    }
    function Ca() {
      return null;
    }
    function E2(...e) {
      return e.filter(Boolean).join(" ");
    }
    function xa(e, t, r) {
      let n = e,
        o = t.split(".");
      for (; o.length && ((n = n[o[0]]), n !== void 0); ) o.shift();
      return n || r;
    }
    function v2(e = "", t = {}) {
      function r(d, y, ...g) {
        let A = xa(t.overrides, `${d}.props`, {});
        return t.createElement(
          (function (v, S) {
            let w = xa(S, v);
            return w
              ? typeof w == "function" ||
                (typeof w == "object" && "render" in w)
                ? w
                : xa(S, `${v}.component`, v)
              : v;
          })(d, t.overrides),
          Mt({}, y, A, { className: E2(y?.className, A.className) || void 0 }),
          ...g,
        );
      }
      function n(d) {
        d = d.replace(B0, "");
        let y = !1;
        t.forceInline ? (y = !0) : t.forceBlock || (y = H0.test(d) === !1);
        let g = c(
          l(
            y
              ? d
              : `${d.trimEnd().replace(o2, "")}

`,
            { inline: y },
          ),
        );
        for (; typeof g[g.length - 1] == "string" && !g[g.length - 1].trim(); )
          g.pop();
        if (t.wrapper === null) return g;
        let A = t.wrapper || (y ? "span" : "div"),
          v;
        if (g.length > 1 || t.forceWrapper) v = g;
        else {
          if (g.length === 1)
            return (
              (v = g[0]),
              typeof v == "string" ? r("span", { key: "outer" }, v) : v
            );
          v = null;
        }
        return t.createElement(A, { key: "outer" }, v);
      }
      function o(d, y) {
        let g = y.match(A0);
        return g
          ? g.reduce(function (A, v) {
              let S = v.indexOf("=");
              if (S !== -1) {
                let w = (function (F) {
                    return (
                      F.indexOf("-") !== -1 &&
                        F.match(j0) === null &&
                        (F = F.replace(q0, function (_, j) {
                          return j.toUpperCase();
                        })),
                      F
                    );
                  })(v.slice(0, S)).trim(),
                  x = (function (F) {
                    let _ = F[0];
                    return (_ === '"' || _ === "'") &&
                      F.length >= 2 &&
                      F[F.length - 1] === _
                      ? F.slice(1, -1)
                      : F;
                  })(v.slice(S + 1).trim()),
                  C = Pc[w] || w;
                if (C === "ref") return A;
                let k = (A[C] = (function (F, _, j, M) {
                  return _ === "style"
                    ? j.split(/;\s?/).reduce(function (P, W) {
                        let L = W.slice(0, W.indexOf(":"));
                        return (
                          (P[
                            L.trim().replace(/(-[a-z])/g, (z) =>
                              z[1].toUpperCase(),
                            )
                          ] = W.slice(L.length + 1).trim()),
                          P
                        );
                      }, {})
                    : _ === "href" || _ === "src"
                      ? M(j, F, _)
                      : (j.match(L0) && (j = j.slice(1, j.length - 1)),
                        j === "true" || (j !== "false" && j));
                })(d, w, x, t.sanitizer));
                typeof k == "string" &&
                  (Na.test(k) || ja.test(k)) &&
                  (A[C] = n(k.trim()));
              } else v !== "style" && (A[Pc[v] || v] = !0);
              return A;
            }, {})
          : null;
      }
      (t.overrides = t.overrides || {}),
        (t.sanitizer = t.sanitizer || y2),
        (t.slugify = t.slugify || Ir),
        (t.namedCodesToUnicode = t.namedCodesToUnicode
          ? Mt({}, Nc, t.namedCodesToUnicode)
          : Nc),
        (t.createElement = t.createElement || hi);
      let a = [],
        i = {},
        s = {
          [G.blockQuote]: {
            match: it(pd),
            order: 1,
            parse(d, y, g) {
              let [, A, v] = d[0].replace(w0, "").match(C0);
              return { alert: A, children: y(v, g) };
            },
            render(d, y, g) {
              let A = { key: g.key };
              return (
                d.alert &&
                  ((A.className =
                    "markdown-alert-" + t.slugify(d.alert.toLowerCase(), Ir)),
                  d.children.unshift({
                    attrs: {},
                    children: [{ type: G.text, text: d.alert }],
                    noInnerParse: !0,
                    type: G.htmlBlock,
                    tag: "header",
                  })),
                r("blockquote", A, y(d.children, g))
              );
            },
          },
          [G.breakLine]: {
            match: kr(x0),
            order: 1,
            parse: wa,
            render: (d, y, g) => r("br", { key: g.key }),
          },
          [G.breakThematic]: {
            match: it(T0),
            order: 1,
            parse: wa,
            render: (d, y, g) => r("hr", { key: g.key }),
          },
          [G.codeBlock]: {
            match: it(fd),
            order: 0,
            parse: (d) => ({
              lang: void 0,
              text: d[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""),
            }),
            render: (d, y, g) =>
              r(
                "pre",
                { key: g.key },
                r(
                  "code",
                  Mt({}, d.attrs, {
                    className: d.lang ? `lang-${d.lang}` : "",
                  }),
                  d.text,
                ),
              ),
          },
          [G.codeFenced]: {
            match: it(hd),
            order: 0,
            parse: (d) => ({
              attrs: o("code", d[3] || ""),
              lang: d[2] || void 0,
              text: d[4],
              type: G.codeBlock,
            }),
          },
          [G.codeInline]: {
            match: Dt(F0),
            order: 3,
            parse: (d) => ({ text: d[2] }),
            render: (d, y, g) => r("code", { key: g.key }, d.text),
          },
          [G.footnote]: {
            match: it(R0),
            order: 0,
            parse: (d) => (a.push({ footnote: d[2], identifier: d[1] }), {}),
            render: Ca,
          },
          [G.footnoteReference]: {
            match: At(O0),
            order: 1,
            parse: (d) => ({ target: `#${t.slugify(d[1], Ir)}`, text: d[1] }),
            render: (d, y, g) =>
              r(
                "a",
                { key: g.key, href: t.sanitizer(d.target, "a", "href") },
                r("sup", { key: g.key }, d.text),
              ),
          },
          [G.gfmTask]: {
            match: At(P0),
            order: 1,
            parse: (d) => ({ completed: d[1].toLowerCase() === "x" }),
            render: (d, y, g) =>
              r("input", {
                checked: d.completed,
                key: g.key,
                readOnly: !0,
                type: "checkbox",
              }),
          },
          [G.heading]: {
            match: it(t.enforceAtxHeadings ? yd : md),
            order: 1,
            parse: (d, y, g) => ({
              children: Tn(y, d[2], g),
              id: t.slugify(d[2], Ir),
              level: d[1].length,
            }),
            render: (d, y, g) =>
              r(`h${d.level}`, { id: d.id, key: g.key }, y(d.children, g)),
          },
          [G.headingSetext]: {
            match: it(gd),
            order: 0,
            parse: (d, y, g) => ({
              children: Tn(y, d[1], g),
              level: d[2] === "=" ? 1 : 2,
              type: G.heading,
            }),
          },
          [G.htmlBlock]: {
            match: kr(Na),
            order: 1,
            parse(d, y, g) {
              let [, A] = d[3].match(a2),
                v = new RegExp(`^${A}`, "gm"),
                S = d[3].replace(v, ""),
                w = ((x = S), p2.some((j) => j.test(x)) ? b2 : Tn);
              var x;
              let C = d[1].toLowerCase(),
                k = v0.indexOf(C) !== -1,
                F = (k ? C : d[1]).trim(),
                _ = { attrs: o(F, d[2]), noInnerParse: k, tag: F };
              return (
                (g.inAnchor = g.inAnchor || C === "a"),
                k ? (_.text = d[3]) : (_.children = w(y, S, g)),
                (g.inAnchor = !1),
                _
              );
            },
            render: (d, y, g) =>
              r(
                d.tag,
                Mt({ key: g.key }, d.attrs),
                d.text || (d.children ? y(d.children, g) : ""),
              ),
          },
          [G.htmlSelfClosing]: {
            match: kr(ja),
            order: 1,
            parse(d) {
              let y = d[1].trim();
              return { attrs: o(y, d[2] || ""), tag: y };
            },
            render: (d, y, g) => r(d.tag, Mt({}, d.attrs, { key: g.key })),
          },
          [G.htmlComment]: {
            match: kr(bd),
            order: 1,
            parse: () => ({}),
            render: Ca,
          },
          [G.image]: {
            match: Dt(d2),
            order: 1,
            parse: (d) => ({ alt: d[1], target: $c(d[2]), title: d[3] }),
            render: (d, y, g) =>
              r("img", {
                key: g.key,
                alt: d.alt || void 0,
                title: d.title || void 0,
                src: t.sanitizer(d.target, "img", "src"),
              }),
          },
          [G.link]: {
            match: At(c2),
            order: 3,
            parse: (d, y, g) => ({
              children: g2(y, d[1], g),
              target: $c(d[2]),
              title: d[3],
            }),
            render: (d, y, g) =>
              r(
                "a",
                {
                  key: g.key,
                  href: t.sanitizer(d.target, "a", "href"),
                  title: d.title,
                },
                y(d.children, g),
              ),
          },
          [G.linkAngleBraceStyleDetector]: {
            match: At($0),
            order: 0,
            parse: (d) => ({
              children: [{ text: d[1], type: G.text }],
              target: d[1],
              type: G.link,
            }),
          },
          [G.linkBareUrlDetector]: {
            match: (d, y) =>
              y.inAnchor || t.disableAutoLink ? null : At(M0)(d, y),
            order: 0,
            parse: (d) => ({
              children: [{ text: d[1], type: G.text }],
              target: d[1],
              title: void 0,
              type: G.link,
            }),
          },
          [G.linkMailtoDetector]: {
            match: At(U0),
            order: 0,
            parse(d) {
              let y = d[1],
                g = d[1];
              return (
                D0.test(g) || (g = "mailto:" + g),
                {
                  children: [{ text: y.replace("mailto:", ""), type: G.text }],
                  target: g,
                  type: G.link,
                }
              );
            },
          },
          [G.orderedList]: Lc(r, 1),
          [G.unorderedList]: Lc(r, 2),
          [G.newlineCoalescer]: {
            match: it(I0),
            order: 3,
            parse: wa,
            render: () => `
`,
          },
          [G.paragraph]: {
            match: m2,
            order: 3,
            parse: Sa,
            render: (d, y, g) => r("p", { key: g.key }, y(d.children, g)),
          },
          [G.ref]: {
            match: At(V0),
            order: 0,
            parse: (d) => ((i[d[1]] = { target: d[2], title: d[4] }), {}),
            render: Ca,
          },
          [G.refImage]: {
            match: Dt(J0),
            order: 0,
            parse: (d) => ({ alt: d[1] || void 0, ref: d[2] }),
            render: (d, y, g) =>
              i[d.ref]
                ? r("img", {
                    key: g.key,
                    alt: d.alt,
                    src: t.sanitizer(i[d.ref].target, "img", "src"),
                    title: i[d.ref].title,
                  })
                : null,
          },
          [G.refLink]: {
            match: At(z0),
            order: 0,
            parse: (d, y, g) => ({
              children: y(d[1], g),
              fallbackChildren: d[0],
              ref: d[2],
            }),
            render: (d, y, g) =>
              i[d.ref]
                ? r(
                    "a",
                    {
                      key: g.key,
                      href: t.sanitizer(i[d.ref].target, "a", "href"),
                      title: i[d.ref].title,
                    },
                    y(d.children, g),
                  )
                : r("span", { key: g.key }, d.fallbackChildren),
          },
          [G.table]: {
            match: it(Ed),
            order: 1,
            parse: f2,
            render(d, y, g) {
              let A = d;
              return r(
                "table",
                { key: g.key },
                r(
                  "thead",
                  null,
                  r(
                    "tr",
                    null,
                    A.header.map(function (v, S) {
                      return r("th", { key: S, style: Uc(A, S) }, y(v, g));
                    }),
                  ),
                ),
                r(
                  "tbody",
                  null,
                  A.cells.map(function (v, S) {
                    return r(
                      "tr",
                      { key: S },
                      v.map(function (w, x) {
                        return r("td", { key: x, style: Uc(A, x) }, y(w, g));
                      }),
                    );
                  }),
                ),
              );
            },
          },
          [G.text]: {
            match: kr(n2),
            order: 4,
            parse: (d) => ({
              text: d[0].replace(N0, (y, g) =>
                t.namedCodesToUnicode[g] ? t.namedCodesToUnicode[g] : y,
              ),
            }),
            render: (d) => d.text,
          },
          [G.textBolded]: {
            match: Dt(Q0),
            order: 2,
            parse: (d, y, g) => ({ children: y(d[2], g) }),
            render: (d, y, g) => r("strong", { key: g.key }, y(d.children, g)),
          },
          [G.textEmphasized]: {
            match: Dt(Z0),
            order: 3,
            parse: (d, y, g) => ({ children: y(d[2], g) }),
            render: (d, y, g) => r("em", { key: g.key }, y(d.children, g)),
          },
          [G.textEscaped]: {
            match: Dt(r2),
            order: 1,
            parse: (d) => ({ text: d[1], type: G.text }),
          },
          [G.textMarked]: {
            match: Dt(e2),
            order: 3,
            parse: Sa,
            render: (d, y, g) => r("mark", { key: g.key }, y(d.children, g)),
          },
          [G.textStrikethroughed]: {
            match: Dt(t2),
            order: 3,
            parse: Sa,
            render: (d, y, g) => r("del", { key: g.key }, y(d.children, g)),
          },
        };
      t.disableParsingRawHTML === !0 &&
        (delete s[G.htmlBlock], delete s[G.htmlSelfClosing]);
      let l = (function (d) {
          let y = Object.keys(d);
          function g(A, v) {
            let S = [];
            for (v.prevCapture = v.prevCapture || ""; A; ) {
              let w = 0;
              for (; w < y.length; ) {
                let x = y[w],
                  C = d[x],
                  k = C.match(A, v);
                if (k) {
                  let F = k[0];
                  (v.prevCapture += F), (A = A.substring(F.length));
                  let _ = C.parse(k, g, v);
                  _.type == null && (_.type = x), S.push(_);
                  break;
                }
                w++;
              }
            }
            return (v.prevCapture = ""), S;
          }
          return (
            y.sort(function (A, v) {
              let S = d[A].order,
                w = d[v].order;
              return S !== w ? S - w : A < v ? -1 : 1;
            }),
            function (A, v) {
              return g(
                (function (S) {
                  return S.replace(
                    k0,
                    `
`,
                  )
                    .replace(_0, "")
                    .replace(G0, "    ");
                })(A),
                v,
              );
            }
          );
        })(s),
        c =
          ((p = (function (d, y) {
            return function (g, A, v) {
              let S = d[g.type].render;
              return y ? y(() => S(g, A, v), g, A, v) : S(g, A, v);
            };
          })(s, t.renderRule)),
          function d(y, g = {}) {
            if (Array.isArray(y)) {
              let A = g.key,
                v = [],
                S = !1;
              for (let w = 0; w < y.length; w++) {
                g.key = w;
                let x = d(y[w], g),
                  C = typeof x == "string";
                C && S ? (v[v.length - 1] += x) : x !== null && v.push(x),
                  (S = C);
              }
              return (g.key = A), v;
            }
            return p(y, d, g);
          });
      var p;
      let h = n(e);
      return a.length
        ? r(
            "div",
            null,
            h,
            r(
              "footer",
              { key: "footer" },
              a.map(function (d) {
                return r(
                  "div",
                  { id: t.slugify(d.identifier, Ir), key: d.identifier },
                  d.identifier,
                  c(l(d.footnote, { inline: !0 })),
                );
              }),
            ),
          )
        : h;
    }
    var A2 = (e) => {
        let { children: t = "", options: r } = e,
          n = (function (o, a) {
            if (o == null) return {};
            var i,
              s,
              l = {},
              c = Object.keys(o);
            for (s = 0; s < c.length; s++)
              a.indexOf((i = c[s])) >= 0 || (l[i] = o[i]);
            return l;
          })(e, E0);
        return pe(v2(t, r), n);
      },
      D2 = R.label(({ theme: e }) => ({
        lineHeight: "18px",
        alignItems: "center",
        marginBottom: 8,
        display: "inline-block",
        position: "relative",
        whiteSpace: "nowrap",
        background: e.boolean.background,
        borderRadius: "3em",
        padding: 1,
        '&[aria-disabled="true"]': {
          opacity: 0.5,
          input: { cursor: "not-allowed" },
        },
        input: {
          appearance: "none",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          margin: 0,
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          borderRadius: "3em",
          "&:focus": {
            outline: "none",
            boxShadow: `${e.color.secondary} 0 0 0 1px inset !important`,
          },
        },
        span: {
          textAlign: "center",
          fontSize: e.typography.size.s1,
          fontWeight: e.typography.weight.bold,
          lineHeight: "1",
          cursor: "pointer",
          display: "inline-block",
          padding: "7px 15px",
          transition: "all 100ms ease-out",
          userSelect: "none",
          borderRadius: "3em",
          color: ce(0.5, e.color.defaultText),
          background: "transparent",
          "&:hover": {
            boxShadow: `${Sn(0.3, e.appBorderColor)} 0 0 0 1px inset`,
          },
          "&:active": {
            boxShadow: `${Sn(0.05, e.appBorderColor)} 0 0 0 2px inset`,
            color: Sn(1, e.appBorderColor),
          },
          "&:first-of-type": { paddingRight: 8 },
          "&:last-of-type": { paddingLeft: 8 },
        },
        "input:checked ~ span:last-of-type, input:not(:checked) ~ span:first-of-type":
          {
            background: e.boolean.selectedBackground,
            boxShadow:
              e.base === "light"
                ? `${Sn(0.1, e.appBorderColor)} 0 0 2px`
                : `${e.appBorderColor} 0 0 0 1px`,
            color: e.color.defaultText,
            padding: "7px 15px",
          },
      })),
      S2 = (e) => e === "true",
      w2 = ({
        name: e,
        value: t,
        onChange: r,
        onBlur: n,
        onFocus: o,
        argType: a,
      }) => {
        let i = Ce(() => r(!1), [r]),
          s = !!a?.table?.readonly;
        if (t === void 0)
          return f.createElement(
            ht,
            {
              variant: "outline",
              size: "medium",
              id: yr(e),
              onClick: i,
              disabled: s,
            },
            "Set boolean",
          );
        let l = Le(e),
          c = typeof t == "string" ? S2(t) : t;
        return f.createElement(
          D2,
          { "aria-disabled": s, htmlFor: l, "aria-label": e },
          f.createElement("input", {
            id: l,
            type: "checkbox",
            onChange: (p) => r(p.target.checked),
            checked: c,
            role: "switch",
            disabled: s,
            name: e,
            onBlur: n,
            onFocus: o,
          }),
          f.createElement("span", { "aria-hidden": "true" }, "False"),
          f.createElement("span", { "aria-hidden": "true" }, "True"),
        );
      },
      C2 = (e) => {
        let [t, r, n] = e.split("-"),
          o = new Date();
        return (
          o.setFullYear(parseInt(t, 10), parseInt(r, 10) - 1, parseInt(n, 10)),
          o
        );
      },
      x2 = (e) => {
        let [t, r] = e.split(":"),
          n = new Date();
        return n.setHours(parseInt(t, 10)), n.setMinutes(parseInt(r, 10)), n;
      },
      T2 = (e) => {
        let t = new Date(e),
          r = `000${t.getFullYear()}`.slice(-4),
          n = `0${t.getMonth() + 1}`.slice(-2),
          o = `0${t.getDate()}`.slice(-2);
        return `${r}-${n}-${o}`;
      },
      F2 = (e) => {
        let t = new Date(e),
          r = `0${t.getHours()}`.slice(-2),
          n = `0${t.getMinutes()}`.slice(-2);
        return `${r}:${n}`;
      },
      qc = R(Ge.Input)(({ readOnly: e }) => ({ opacity: e ? 0.5 : 1 })),
      I2 = R.div(({ theme: e }) => ({
        flex: 1,
        display: "flex",
        input: {
          marginLeft: 10,
          flex: 1,
          height: 32,
          "&::-webkit-calendar-picker-indicator": {
            opacity: 0.5,
            height: 12,
            filter: e.base === "light" ? void 0 : "invert(1)",
          },
        },
        "input:first-of-type": { marginLeft: 0, flexGrow: 4 },
        "input:last-of-type": { flexGrow: 3 },
      })),
      k2 = ({
        name: e,
        value: t,
        onChange: r,
        onFocus: n,
        onBlur: o,
        argType: a,
      }) => {
        let [i, s] = Z(!0),
          l = Pe(),
          c = Pe(),
          p = !!a?.table?.readonly;
        xe(() => {
          i !== !1 &&
            (l && l.current && (l.current.value = t ? T2(t) : ""),
            c && c.current && (c.current.value = t ? F2(t) : ""));
        }, [t]);
        let h = (g) => {
            if (!g.target.value) return r();
            let A = C2(g.target.value),
              v = new Date(t);
            v.setFullYear(A.getFullYear(), A.getMonth(), A.getDate());
            let S = v.getTime();
            S && r(S), s(!!S);
          },
          d = (g) => {
            if (!g.target.value) return r();
            let A = x2(g.target.value),
              v = new Date(t);
            v.setHours(A.getHours()), v.setMinutes(A.getMinutes());
            let S = v.getTime();
            S && r(S), s(!!S);
          },
          y = Le(e);
        return f.createElement(
          I2,
          null,
          f.createElement(qc, {
            type: "date",
            max: "9999-12-31",
            ref: l,
            id: `${y}-date`,
            name: `${y}-date`,
            readOnly: p,
            onChange: h,
            onFocus: n,
            onBlur: o,
          }),
          f.createElement(qc, {
            type: "time",
            id: `${y}-time`,
            name: `${y}-time`,
            ref: c,
            onChange: d,
            readOnly: p,
            onFocus: n,
            onBlur: o,
          }),
          i ? null : f.createElement("div", null, "invalid"),
        );
      },
      R2 = R.label({ display: "flex" }),
      O2 = (e) => {
        let t = parseFloat(e);
        return Number.isNaN(t) ? void 0 : t;
      },
      _2 = R(Ge.Input)(({ readOnly: e }) => ({ opacity: e ? 0.5 : 1 })),
      B2 = ({
        name: e,
        value: t,
        onChange: r,
        min: n,
        max: o,
        step: a,
        onBlur: i,
        onFocus: s,
        argType: l,
      }) => {
        let [c, p] = Z(typeof t == "number" ? t : ""),
          [h, d] = Z(!1),
          [y, g] = Z(null),
          A = !!l?.table?.readonly,
          v = Ce(
            (x) => {
              p(x.target.value);
              let C = parseFloat(x.target.value);
              Number.isNaN(C)
                ? g(new Error(`'${x.target.value}' is not a number`))
                : (r(C), g(null));
            },
            [r, g],
          ),
          S = Ce(() => {
            p("0"), r(0), d(!0);
          }, [d]),
          w = Pe(null);
        return (
          xe(() => {
            h && w.current && w.current.select();
          }, [h]),
          xe(() => {
            c !== (typeof t == "number" ? t : "") && p(t);
          }, [t]),
          t === void 0
            ? f.createElement(
                ht,
                {
                  variant: "outline",
                  size: "medium",
                  id: yr(e),
                  onClick: S,
                  disabled: A,
                },
                "Set number",
              )
            : f.createElement(
                R2,
                null,
                f.createElement(_2, {
                  ref: w,
                  id: Le(e),
                  type: "number",
                  onChange: v,
                  size: "flex",
                  placeholder: "Edit number...",
                  value: c,
                  valid: y ? "error" : null,
                  autoFocus: h,
                  readOnly: A,
                  name: e,
                  min: n,
                  max: o,
                  step: a,
                  onFocus: s,
                  onBlur: i,
                }),
              )
        );
      },
      Rd = (e, t) => {
        let r = t && Object.entries(t).find(([n, o]) => o === e);
        return r ? r[0] : void 0;
      },
      La = (e, t) =>
        e && t
          ? Object.entries(t)
              .filter((r) => e.includes(r[1]))
              .map((r) => r[0])
          : [],
      Od = (e, t) => e && t && e.map((r) => t[r]),
      P2 = R.div(
        ({ isInline: e }) =>
          e
            ? {
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                label: { display: "inline-flex", marginRight: 15 },
              }
            : { label: { display: "flex" } },
        (e) => {
          if (e["aria-readonly"] === "true")
            return { input: { cursor: "not-allowed" } };
        },
      ),
      N2 = R.span({ "[aria-readonly=true] &": { opacity: 0.5 } }),
      j2 = R.label({
        lineHeight: "20px",
        alignItems: "center",
        marginBottom: 8,
        "&:last-child": { marginBottom: 0 },
        input: { margin: 0, marginRight: 6 },
      }),
      Vc = ({
        name: e,
        options: t,
        value: r,
        onChange: n,
        isInline: o,
        argType: a,
      }) => {
        if (!t)
          return (
            Xr.warn(`Checkbox with no options: ${e}`),
            f.createElement(f.Fragment, null, "-")
          );
        let i = La(r, t),
          [s, l] = Z(i),
          c = !!a?.table?.readonly,
          p = (d) => {
            let y = d.target.value,
              g = [...s];
            g.includes(y) ? g.splice(g.indexOf(y), 1) : g.push(y),
              n(Od(g, t)),
              l(g);
          };
        xe(() => {
          l(La(r, t));
        }, [r]);
        let h = Le(e);
        return f.createElement(
          P2,
          { "aria-readonly": c, isInline: o },
          Object.keys(t).map((d, y) => {
            let g = `${h}-${y}`;
            return f.createElement(
              j2,
              { key: g, htmlFor: g },
              f.createElement("input", {
                type: "checkbox",
                disabled: c,
                id: g,
                name: g,
                value: d,
                onChange: p,
                checked: s?.includes(d),
              }),
              f.createElement(N2, null, d),
            );
          }),
        );
      },
      L2 = R.div(
        ({ isInline: e }) =>
          e
            ? {
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                label: { display: "inline-flex", marginRight: 15 },
              }
            : { label: { display: "flex" } },
        (e) => {
          if (e["aria-readonly"] === "true")
            return { input: { cursor: "not-allowed" } };
        },
      ),
      M2 = R.span({ "[aria-readonly=true] &": { opacity: 0.5 } }),
      U2 = R.label({
        lineHeight: "20px",
        alignItems: "center",
        marginBottom: 8,
        "&:last-child": { marginBottom: 0 },
        input: { margin: 0, marginRight: 6 },
      }),
      Jc = ({
        name: e,
        options: t,
        value: r,
        onChange: n,
        isInline: o,
        argType: a,
      }) => {
        if (!t)
          return (
            Xr.warn(`Radio with no options: ${e}`),
            f.createElement(f.Fragment, null, "-")
          );
        let i = Rd(r, t),
          s = Le(e),
          l = !!a?.table?.readonly;
        return f.createElement(
          L2,
          { "aria-readonly": l, isInline: o },
          Object.keys(t).map((c, p) => {
            let h = `${s}-${p}`;
            return f.createElement(
              U2,
              { key: h, htmlFor: h },
              f.createElement("input", {
                type: "radio",
                id: h,
                name: s,
                disabled: l,
                value: c,
                onChange: (d) => n(t[d.currentTarget.value]),
                checked: c === i,
              }),
              f.createElement(M2, null, c),
            );
          }),
        );
      },
      $2 = {
        appearance: "none",
        border: "0 none",
        boxSizing: "inherit",
        display: " block",
        margin: " 0",
        background: "transparent",
        padding: 0,
        fontSize: "inherit",
        position: "relative",
      },
      _d = R.select($2, ({ theme: e }) => ({
        boxSizing: "border-box",
        position: "relative",
        padding: "6px 10px",
        width: "100%",
        color: e.input.color || "inherit",
        background: e.input.background,
        borderRadius: e.input.borderRadius,
        boxShadow: `${e.input.border} 0 0 0 1px inset`,
        fontSize: e.typography.size.s2 - 1,
        lineHeight: "20px",
        "&:focus": {
          boxShadow: `${e.color.secondary} 0 0 0 1px inset`,
          outline: "none",
        },
        "&[disabled]": { cursor: "not-allowed", opacity: 0.5 },
        "::placeholder": { color: e.textMutedColor },
        "&[multiple]": {
          overflow: "auto",
          padding: 0,
          option: {
            display: "block",
            padding: "6px 10px",
            marginLeft: 1,
            marginRight: 1,
          },
        },
      })),
      Bd = R.span(({ theme: e }) => ({
        display: "inline-block",
        lineHeight: "normal",
        overflow: "hidden",
        position: "relative",
        verticalAlign: "top",
        width: "100%",
        svg: {
          position: "absolute",
          zIndex: 1,
          pointerEvents: "none",
          height: "12px",
          marginTop: "-6px",
          right: "12px",
          top: "50%",
          fill: e.textMutedColor,
          path: { fill: e.textMutedColor },
        },
      })),
      zc = "Choose option...",
      q2 = ({ name: e, value: t, options: r, onChange: n, argType: o }) => {
        let a = (c) => {
            n(r[c.currentTarget.value]);
          },
          i = Rd(t, r) || zc,
          s = Le(e),
          l = !!o?.table?.readonly;
        return f.createElement(
          Bd,
          null,
          f.createElement(fo, null),
          f.createElement(
            _d,
            { disabled: l, id: s, value: i, onChange: a },
            f.createElement(
              "option",
              { key: "no-selection", disabled: !0 },
              zc,
            ),
            Object.keys(r).map((c) =>
              f.createElement("option", { key: c, value: c }, c),
            ),
          ),
        );
      },
      V2 = ({ name: e, value: t, options: r, onChange: n, argType: o }) => {
        let a = (c) => {
            let p = Array.from(c.currentTarget.options)
              .filter((h) => h.selected)
              .map((h) => h.value);
            n(Od(p, r));
          },
          i = La(t, r),
          s = Le(e),
          l = !!o?.table?.readonly;
        return f.createElement(
          Bd,
          null,
          f.createElement(
            _d,
            { disabled: l, id: s, multiple: !0, value: i, onChange: a },
            Object.keys(r).map((c) =>
              f.createElement("option", { key: c, value: c }, c),
            ),
          ),
        );
      },
      Hc = (e) => {
        let { name: t, options: r } = e;
        return r
          ? e.isMulti
            ? f.createElement(V2, { ...e })
            : f.createElement(q2, { ...e })
          : (Xr.warn(`Select with no options: ${t}`),
            f.createElement(f.Fragment, null, "-"));
      },
      J2 = (e, t) =>
        Array.isArray(e)
          ? e.reduce((r, n) => ((r[t?.[n] || String(n)] = n), r), {})
          : e,
      z2 = {
        check: Vc,
        "inline-check": Vc,
        radio: Jc,
        "inline-radio": Jc,
        select: Hc,
        "multi-select": Hc,
      },
      ar = (e) => {
        let { type: t = "select", labels: r, argType: n } = e,
          o = {
            ...e,
            argType: n,
            options: n ? J2(n.options, r) : {},
            isInline: t.includes("inline"),
            isMulti: t.includes("multi"),
          },
          a = z2[t];
        if (a) return f.createElement(a, { ...o });
        throw new Error(`Unknown options type: ${t}`);
      },
      H2 = "Error",
      G2 = "Object",
      W2 = "Array",
      K2 = "String",
      Y2 = "Number",
      X2 = "Boolean",
      Q2 = "Date",
      Z2 = "Null",
      e1 = "Undefined",
      t1 = "Function",
      r1 = "Symbol",
      Pd = "ADD_DELTA_TYPE",
      Nd = "REMOVE_DELTA_TYPE",
      jd = "UPDATE_DELTA_TYPE",
      Ja = "value",
      n1 = "key";
    function Ut(e) {
      return e !== null &&
        typeof e == "object" &&
        !Array.isArray(e) &&
        typeof e[Symbol.iterator] == "function"
        ? "Iterable"
        : Object.prototype.toString.call(e).slice(8, -1);
    }
    function Ld(e, t) {
      let r = Ut(e),
        n = Ut(t);
      return (r === "Function" || n === "Function") && n !== r;
    }
    var za = class extends dt {
      constructor(e) {
        super(e),
          (this.state = { inputRefKey: null, inputRefValue: null }),
          (this.refInputValue = this.refInputValue.bind(this)),
          (this.refInputKey = this.refInputKey.bind(this)),
          (this.onKeydown = this.onKeydown.bind(this)),
          (this.onSubmit = this.onSubmit.bind(this));
      }
      componentDidMount() {
        let { inputRefKey: e, inputRefValue: t } = this.state,
          { onlyValue: r } = this.props;
        e && typeof e.focus == "function" && e.focus(),
          r && t && typeof t.focus == "function" && t.focus(),
          document.addEventListener("keydown", this.onKeydown);
      }
      componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeydown);
      }
      onKeydown(e) {
        e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.repeat ||
          ((e.code === "Enter" || e.key === "Enter") &&
            (e.preventDefault(), this.onSubmit()),
          (e.code === "Escape" || e.key === "Escape") &&
            (e.preventDefault(), this.props.handleCancel()));
      }
      onSubmit() {
        let {
            handleAdd: e,
            onlyValue: t,
            onSubmitValueParser: r,
            keyPath: n,
            deep: o,
          } = this.props,
          { inputRefKey: a, inputRefValue: i } = this.state,
          s = {};
        if (!t) {
          if (!a.value) return;
          s.key = a.value;
        }
        (s.newValue = r(!1, n, o, s.key, i.value)), e(s);
      }
      refInputKey(e) {
        this.state.inputRefKey = e;
      }
      refInputValue(e) {
        this.state.inputRefValue = e;
      }
      render() {
        let {
            handleCancel: e,
            onlyValue: t,
            addButtonElement: r,
            cancelButtonElement: n,
            inputElementGenerator: o,
            keyPath: a,
            deep: i,
          } = this.props,
          s = pe(r, { onClick: this.onSubmit }),
          l = pe(n, { onClick: e }),
          c = o(Ja, a, i),
          p = pe(c, { placeholder: "Value", ref: this.refInputValue }),
          h = null;
        if (!t) {
          let d = o(n1, a, i);
          h = pe(d, { placeholder: "Key", ref: this.refInputKey });
        }
        return f.createElement(
          "span",
          { className: "rejt-add-value-node" },
          h,
          p,
          l,
          s,
        );
      }
    };
    za.defaultProps = {
      onlyValue: !1,
      addButtonElement: f.createElement("button", null, "+"),
      cancelButtonElement: f.createElement("button", null, "c"),
    };
    var Md = class extends dt {
      constructor(e) {
        super(e);
        let t = [...e.keyPath, e.name];
        (this.state = {
          data: e.data,
          name: e.name,
          keyPath: t,
          deep: e.deep,
          nextDeep: e.deep + 1,
          collapsed: e.isCollapsed(t, e.deep, e.data),
          addFormVisible: !1,
        }),
          (this.handleCollapseMode = this.handleCollapseMode.bind(this)),
          (this.handleRemoveItem = this.handleRemoveItem.bind(this)),
          (this.handleAddMode = this.handleAddMode.bind(this)),
          (this.handleAddValueAdd = this.handleAddValueAdd.bind(this)),
          (this.handleAddValueCancel = this.handleAddValueCancel.bind(this)),
          (this.handleEditValue = this.handleEditValue.bind(this)),
          (this.onChildUpdate = this.onChildUpdate.bind(this)),
          (this.renderCollapsed = this.renderCollapsed.bind(this)),
          (this.renderNotCollapsed = this.renderNotCollapsed.bind(this));
      }
      static getDerivedStateFromProps(e, t) {
        return e.data !== t.data ? { data: e.data } : null;
      }
      onChildUpdate(e, t) {
        let { data: r, keyPath: n } = this.state;
        (r[e] = t), this.setState({ data: r });
        let { onUpdate: o } = this.props,
          a = n.length;
        o(n[a - 1], r);
      }
      handleAddMode() {
        this.setState({ addFormVisible: !0 });
      }
      handleCollapseMode() {
        this.setState((e) => ({ collapsed: !e.collapsed }));
      }
      handleRemoveItem(e) {
        return () => {
          let { beforeRemoveAction: t, logger: r } = this.props,
            { data: n, keyPath: o, nextDeep: a } = this.state,
            i = n[e];
          t(e, o, a, i)
            .then(() => {
              let s = { keyPath: o, deep: a, key: e, oldValue: i, type: Nd };
              n.splice(e, 1), this.setState({ data: n });
              let { onUpdate: l, onDeltaUpdate: c } = this.props;
              l(o[o.length - 1], n), c(s);
            })
            .catch(r.error);
        };
      }
      handleAddValueAdd({ newValue: e }) {
        let { data: t, keyPath: r, nextDeep: n } = this.state,
          { beforeAddAction: o, logger: a } = this.props;
        o(t.length, r, n, e)
          .then(() => {
            let i = [...t, e];
            this.setState({ data: i }), this.handleAddValueCancel();
            let { onUpdate: s, onDeltaUpdate: l } = this.props;
            s(r[r.length - 1], i),
              l({
                type: Pd,
                keyPath: r,
                deep: n,
                key: i.length - 1,
                newValue: e,
              });
          })
          .catch(a.error);
      }
      handleAddValueCancel() {
        this.setState({ addFormVisible: !1 });
      }
      handleEditValue({ key: e, value: t }) {
        return new Promise((r, n) => {
          let { beforeUpdateAction: o } = this.props,
            { data: a, keyPath: i, nextDeep: s } = this.state,
            l = a[e];
          o(e, i, s, l, t)
            .then(() => {
              (a[e] = t), this.setState({ data: a });
              let { onUpdate: c, onDeltaUpdate: p } = this.props;
              c(i[i.length - 1], a),
                p({
                  type: jd,
                  keyPath: i,
                  deep: s,
                  key: e,
                  newValue: t,
                  oldValue: l,
                }),
                r(void 0);
            })
            .catch(n);
        });
      }
      renderCollapsed() {
        let { name: e, data: t, keyPath: r, deep: n } = this.state,
          {
            handleRemove: o,
            readOnly: a,
            getStyle: i,
            dataType: s,
            minusMenuElement: l,
          } = this.props,
          { minus: c, collapsed: p } = i(e, t, r, n, s),
          h = a(e, t, r, n, s),
          d = pe(l, { onClick: o, className: "rejt-minus-menu", style: c });
        return f.createElement(
          "span",
          { className: "rejt-collapsed" },
          f.createElement(
            "span",
            {
              className: "rejt-collapsed-text",
              style: p,
              onClick: this.handleCollapseMode,
            },
            "[...] ",
            t.length,
            " ",
            t.length === 1 ? "item" : "items",
          ),
          !h && d,
        );
      }
      renderNotCollapsed() {
        let {
            name: e,
            data: t,
            keyPath: r,
            deep: n,
            addFormVisible: o,
            nextDeep: a,
          } = this.state,
          {
            isCollapsed: i,
            handleRemove: s,
            onDeltaUpdate: l,
            readOnly: c,
            getStyle: p,
            dataType: h,
            addButtonElement: d,
            cancelButtonElement: y,
            editButtonElement: g,
            inputElementGenerator: A,
            textareaElementGenerator: v,
            minusMenuElement: S,
            plusMenuElement: w,
            beforeRemoveAction: x,
            beforeAddAction: C,
            beforeUpdateAction: k,
            logger: F,
            onSubmitValueParser: _,
          } = this.props,
          {
            minus: j,
            plus: M,
            delimiter: P,
            ul: W,
            addForm: L,
          } = p(e, t, r, n, h),
          z = c(e, t, r, n, h),
          D = pe(w, {
            onClick: this.handleAddMode,
            className: "rejt-plus-menu",
            style: M,
          }),
          T = pe(S, { onClick: s, className: "rejt-minus-menu", style: j });
        return f.createElement(
          "span",
          { className: "rejt-not-collapsed" },
          f.createElement(
            "span",
            { className: "rejt-not-collapsed-delimiter", style: P },
            "[",
          ),
          !o && D,
          f.createElement(
            "ul",
            { className: "rejt-not-collapsed-list", style: W },
            t.map((O, U) =>
              f.createElement(Bn, {
                key: U,
                name: U.toString(),
                data: O,
                keyPath: r,
                deep: a,
                isCollapsed: i,
                handleRemove: this.handleRemoveItem(U),
                handleUpdateValue: this.handleEditValue,
                onUpdate: this.onChildUpdate,
                onDeltaUpdate: l,
                readOnly: c,
                getStyle: p,
                addButtonElement: d,
                cancelButtonElement: y,
                editButtonElement: g,
                inputElementGenerator: A,
                textareaElementGenerator: v,
                minusMenuElement: S,
                plusMenuElement: w,
                beforeRemoveAction: x,
                beforeAddAction: C,
                beforeUpdateAction: k,
                logger: F,
                onSubmitValueParser: _,
              }),
            ),
          ),
          !z &&
            o &&
            f.createElement(
              "div",
              { className: "rejt-add-form", style: L },
              f.createElement(za, {
                handleAdd: this.handleAddValueAdd,
                handleCancel: this.handleAddValueCancel,
                onlyValue: !0,
                addButtonElement: d,
                cancelButtonElement: y,
                inputElementGenerator: A,
                keyPath: r,
                deep: n,
                onSubmitValueParser: _,
              }),
            ),
          f.createElement(
            "span",
            { className: "rejt-not-collapsed-delimiter", style: P },
            "]",
          ),
          !z && T,
        );
      }
      render() {
        let {
            name: e,
            collapsed: t,
            data: r,
            keyPath: n,
            deep: o,
          } = this.state,
          { dataType: a, getStyle: i } = this.props,
          s = t ? this.renderCollapsed() : this.renderNotCollapsed(),
          l = i(e, r, n, o, a);
        return f.createElement(
          "div",
          { className: "rejt-array-node" },
          f.createElement(
            "span",
            { onClick: this.handleCollapseMode },
            f.createElement(
              "span",
              { className: "rejt-name", style: l.name },
              e,
              " :",
              " ",
            ),
          ),
          s,
        );
      }
    };
    Md.defaultProps = {
      keyPath: [],
      deep: 0,
      minusMenuElement: f.createElement("span", null, " - "),
      plusMenuElement: f.createElement("span", null, " + "),
    };
    var Ud = class extends dt {
      constructor(e) {
        super(e);
        let t = [...e.keyPath, e.name];
        (this.state = {
          value: e.value,
          name: e.name,
          keyPath: t,
          deep: e.deep,
          editEnabled: !1,
          inputRef: null,
        }),
          (this.handleEditMode = this.handleEditMode.bind(this)),
          (this.refInput = this.refInput.bind(this)),
          (this.handleCancelEdit = this.handleCancelEdit.bind(this)),
          (this.handleEdit = this.handleEdit.bind(this)),
          (this.onKeydown = this.onKeydown.bind(this));
      }
      static getDerivedStateFromProps(e, t) {
        return e.value !== t.value ? { value: e.value } : null;
      }
      componentDidUpdate() {
        let {
            editEnabled: e,
            inputRef: t,
            name: r,
            value: n,
            keyPath: o,
            deep: a,
          } = this.state,
          { readOnly: i, dataType: s } = this.props,
          l = i(r, n, o, a, s);
        e && !l && typeof t.focus == "function" && t.focus();
      }
      componentDidMount() {
        document.addEventListener("keydown", this.onKeydown);
      }
      componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeydown);
      }
      onKeydown(e) {
        e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.repeat ||
          ((e.code === "Enter" || e.key === "Enter") &&
            (e.preventDefault(), this.handleEdit()),
          (e.code === "Escape" || e.key === "Escape") &&
            (e.preventDefault(), this.handleCancelEdit()));
      }
      handleEdit() {
        let {
            handleUpdateValue: e,
            originalValue: t,
            logger: r,
            onSubmitValueParser: n,
            keyPath: o,
          } = this.props,
          { inputRef: a, name: i, deep: s } = this.state;
        if (!a) return;
        let l = n(!0, o, s, i, a.value);
        e({ value: l, key: i })
          .then(() => {
            Ld(t, l) || this.handleCancelEdit();
          })
          .catch(r.error);
      }
      handleEditMode() {
        this.setState({ editEnabled: !0 });
      }
      refInput(e) {
        this.state.inputRef = e;
      }
      handleCancelEdit() {
        this.setState({ editEnabled: !1 });
      }
      render() {
        let {
            name: e,
            value: t,
            editEnabled: r,
            keyPath: n,
            deep: o,
          } = this.state,
          {
            handleRemove: a,
            originalValue: i,
            readOnly: s,
            dataType: l,
            getStyle: c,
            editButtonElement: p,
            cancelButtonElement: h,
            textareaElementGenerator: d,
            minusMenuElement: y,
            keyPath: g,
          } = this.props,
          A = c(e, i, n, o, l),
          v = null,
          S = null,
          w = s(e, i, n, o, l);
        if (r && !w) {
          let x = d(Ja, g, o, e, i, l),
            C = pe(p, { onClick: this.handleEdit }),
            k = pe(h, { onClick: this.handleCancelEdit }),
            F = pe(x, { ref: this.refInput, defaultValue: i });
          (v = f.createElement(
            "span",
            { className: "rejt-edit-form", style: A.editForm },
            F,
            " ",
            k,
            C,
          )),
            (S = null);
        } else {
          v = f.createElement(
            "span",
            {
              className: "rejt-value",
              style: A.value,
              onClick: w ? null : this.handleEditMode,
            },
            t,
          );
          let x = pe(y, {
            onClick: a,
            className: "rejt-minus-menu",
            style: A.minus,
          });
          S = w ? null : x;
        }
        return f.createElement(
          "li",
          { className: "rejt-function-value-node", style: A.li },
          f.createElement(
            "span",
            { className: "rejt-name", style: A.name },
            e,
            " :",
            " ",
          ),
          v,
          S,
        );
      }
    };
    Ud.defaultProps = {
      keyPath: [],
      deep: 0,
      handleUpdateValue: () => {},
      editButtonElement: f.createElement("button", null, "e"),
      cancelButtonElement: f.createElement("button", null, "c"),
      minusMenuElement: f.createElement("span", null, " - "),
    };
    var Bn = class extends dt {
      constructor(e) {
        super(e),
          (this.state = {
            data: e.data,
            name: e.name,
            keyPath: e.keyPath,
            deep: e.deep,
          });
      }
      static getDerivedStateFromProps(e, t) {
        return e.data !== t.data ? { data: e.data } : null;
      }
      render() {
        let { data: e, name: t, keyPath: r, deep: n } = this.state,
          {
            isCollapsed: o,
            handleRemove: a,
            handleUpdateValue: i,
            onUpdate: s,
            onDeltaUpdate: l,
            readOnly: c,
            getStyle: p,
            addButtonElement: h,
            cancelButtonElement: d,
            editButtonElement: y,
            inputElementGenerator: g,
            textareaElementGenerator: A,
            minusMenuElement: v,
            plusMenuElement: S,
            beforeRemoveAction: w,
            beforeAddAction: x,
            beforeUpdateAction: C,
            logger: k,
            onSubmitValueParser: F,
          } = this.props,
          _ = () => !0,
          j = Ut(e);
        switch (j) {
          case H2:
            return f.createElement(Ma, {
              data: e,
              name: t,
              isCollapsed: o,
              keyPath: r,
              deep: n,
              handleRemove: a,
              onUpdate: s,
              onDeltaUpdate: l,
              readOnly: _,
              dataType: j,
              getStyle: p,
              addButtonElement: h,
              cancelButtonElement: d,
              editButtonElement: y,
              inputElementGenerator: g,
              textareaElementGenerator: A,
              minusMenuElement: v,
              plusMenuElement: S,
              beforeRemoveAction: w,
              beforeAddAction: x,
              beforeUpdateAction: C,
              logger: k,
              onSubmitValueParser: F,
            });
          case G2:
            return f.createElement(Ma, {
              data: e,
              name: t,
              isCollapsed: o,
              keyPath: r,
              deep: n,
              handleRemove: a,
              onUpdate: s,
              onDeltaUpdate: l,
              readOnly: c,
              dataType: j,
              getStyle: p,
              addButtonElement: h,
              cancelButtonElement: d,
              editButtonElement: y,
              inputElementGenerator: g,
              textareaElementGenerator: A,
              minusMenuElement: v,
              plusMenuElement: S,
              beforeRemoveAction: w,
              beforeAddAction: x,
              beforeUpdateAction: C,
              logger: k,
              onSubmitValueParser: F,
            });
          case W2:
            return f.createElement(Md, {
              data: e,
              name: t,
              isCollapsed: o,
              keyPath: r,
              deep: n,
              handleRemove: a,
              onUpdate: s,
              onDeltaUpdate: l,
              readOnly: c,
              dataType: j,
              getStyle: p,
              addButtonElement: h,
              cancelButtonElement: d,
              editButtonElement: y,
              inputElementGenerator: g,
              textareaElementGenerator: A,
              minusMenuElement: v,
              plusMenuElement: S,
              beforeRemoveAction: w,
              beforeAddAction: x,
              beforeUpdateAction: C,
              logger: k,
              onSubmitValueParser: F,
            });
          case K2:
            return f.createElement(St, {
              name: t,
              value: `"${e}"`,
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: j,
              getStyle: p,
              cancelButtonElement: d,
              editButtonElement: y,
              inputElementGenerator: g,
              minusMenuElement: v,
              logger: k,
              onSubmitValueParser: F,
            });
          case Y2:
            return f.createElement(St, {
              name: t,
              value: e,
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: j,
              getStyle: p,
              cancelButtonElement: d,
              editButtonElement: y,
              inputElementGenerator: g,
              minusMenuElement: v,
              logger: k,
              onSubmitValueParser: F,
            });
          case X2:
            return f.createElement(St, {
              name: t,
              value: e ? "true" : "false",
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: j,
              getStyle: p,
              cancelButtonElement: d,
              editButtonElement: y,
              inputElementGenerator: g,
              minusMenuElement: v,
              logger: k,
              onSubmitValueParser: F,
            });
          case Q2:
            return f.createElement(St, {
              name: t,
              value: e.toISOString(),
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: _,
              dataType: j,
              getStyle: p,
              cancelButtonElement: d,
              editButtonElement: y,
              inputElementGenerator: g,
              minusMenuElement: v,
              logger: k,
              onSubmitValueParser: F,
            });
          case Z2:
            return f.createElement(St, {
              name: t,
              value: "null",
              originalValue: "null",
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: j,
              getStyle: p,
              cancelButtonElement: d,
              editButtonElement: y,
              inputElementGenerator: g,
              minusMenuElement: v,
              logger: k,
              onSubmitValueParser: F,
            });
          case e1:
            return f.createElement(St, {
              name: t,
              value: "undefined",
              originalValue: "undefined",
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: j,
              getStyle: p,
              cancelButtonElement: d,
              editButtonElement: y,
              inputElementGenerator: g,
              minusMenuElement: v,
              logger: k,
              onSubmitValueParser: F,
            });
          case t1:
            return f.createElement(Ud, {
              name: t,
              value: e.toString(),
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: c,
              dataType: j,
              getStyle: p,
              cancelButtonElement: d,
              editButtonElement: y,
              textareaElementGenerator: A,
              minusMenuElement: v,
              logger: k,
              onSubmitValueParser: F,
            });
          case r1:
            return f.createElement(St, {
              name: t,
              value: e.toString(),
              originalValue: e,
              keyPath: r,
              deep: n,
              handleRemove: a,
              handleUpdateValue: i,
              readOnly: _,
              dataType: j,
              getStyle: p,
              cancelButtonElement: d,
              editButtonElement: y,
              inputElementGenerator: g,
              minusMenuElement: v,
              logger: k,
              onSubmitValueParser: F,
            });
          default:
            return null;
        }
      }
    };
    Bn.defaultProps = { keyPath: [], deep: 0 };
    var Ma = class extends dt {
      constructor(e) {
        super(e);
        let t = e.deep === -1 ? [] : [...e.keyPath, e.name];
        (this.state = {
          name: e.name,
          data: e.data,
          keyPath: t,
          deep: e.deep,
          nextDeep: e.deep + 1,
          collapsed: e.isCollapsed(t, e.deep, e.data),
          addFormVisible: !1,
        }),
          (this.handleCollapseMode = this.handleCollapseMode.bind(this)),
          (this.handleRemoveValue = this.handleRemoveValue.bind(this)),
          (this.handleAddMode = this.handleAddMode.bind(this)),
          (this.handleAddValueAdd = this.handleAddValueAdd.bind(this)),
          (this.handleAddValueCancel = this.handleAddValueCancel.bind(this)),
          (this.handleEditValue = this.handleEditValue.bind(this)),
          (this.onChildUpdate = this.onChildUpdate.bind(this)),
          (this.renderCollapsed = this.renderCollapsed.bind(this)),
          (this.renderNotCollapsed = this.renderNotCollapsed.bind(this));
      }
      static getDerivedStateFromProps(e, t) {
        return e.data !== t.data ? { data: e.data } : null;
      }
      onChildUpdate(e, t) {
        let { data: r, keyPath: n } = this.state;
        (r[e] = t), this.setState({ data: r });
        let { onUpdate: o } = this.props,
          a = n.length;
        o(n[a - 1], r);
      }
      handleAddMode() {
        this.setState({ addFormVisible: !0 });
      }
      handleAddValueCancel() {
        this.setState({ addFormVisible: !1 });
      }
      handleAddValueAdd({ key: e, newValue: t }) {
        let { data: r, keyPath: n, nextDeep: o } = this.state,
          { beforeAddAction: a, logger: i } = this.props;
        a(e, n, o, t)
          .then(() => {
            (r[e] = t), this.setState({ data: r }), this.handleAddValueCancel();
            let { onUpdate: s, onDeltaUpdate: l } = this.props;
            s(n[n.length - 1], r),
              l({ type: Pd, keyPath: n, deep: o, key: e, newValue: t });
          })
          .catch(i.error);
      }
      handleRemoveValue(e) {
        return () => {
          let { beforeRemoveAction: t, logger: r } = this.props,
            { data: n, keyPath: o, nextDeep: a } = this.state,
            i = n[e];
          t(e, o, a, i)
            .then(() => {
              let s = { keyPath: o, deep: a, key: e, oldValue: i, type: Nd };
              delete n[e], this.setState({ data: n });
              let { onUpdate: l, onDeltaUpdate: c } = this.props;
              l(o[o.length - 1], n), c(s);
            })
            .catch(r.error);
        };
      }
      handleCollapseMode() {
        this.setState((e) => ({ collapsed: !e.collapsed }));
      }
      handleEditValue({ key: e, value: t }) {
        return new Promise((r, n) => {
          let { beforeUpdateAction: o } = this.props,
            { data: a, keyPath: i, nextDeep: s } = this.state,
            l = a[e];
          o(e, i, s, l, t)
            .then(() => {
              (a[e] = t), this.setState({ data: a });
              let { onUpdate: c, onDeltaUpdate: p } = this.props;
              c(i[i.length - 1], a),
                p({
                  type: jd,
                  keyPath: i,
                  deep: s,
                  key: e,
                  newValue: t,
                  oldValue: l,
                }),
                r();
            })
            .catch(n);
        });
      }
      renderCollapsed() {
        let { name: e, keyPath: t, deep: r, data: n } = this.state,
          {
            handleRemove: o,
            readOnly: a,
            dataType: i,
            getStyle: s,
            minusMenuElement: l,
          } = this.props,
          { minus: c, collapsed: p } = s(e, n, t, r, i),
          h = Object.getOwnPropertyNames(n),
          d = a(e, n, t, r, i),
          y = pe(l, { onClick: o, className: "rejt-minus-menu", style: c });
        return f.createElement(
          "span",
          { className: "rejt-collapsed" },
          f.createElement(
            "span",
            {
              className: "rejt-collapsed-text",
              style: p,
              onClick: this.handleCollapseMode,
            },
            "{...}",
            " ",
            h.length,
            " ",
            h.length === 1 ? "key" : "keys",
          ),
          !d && y,
        );
      }
      renderNotCollapsed() {
        let {
            name: e,
            data: t,
            keyPath: r,
            deep: n,
            nextDeep: o,
            addFormVisible: a,
          } = this.state,
          {
            isCollapsed: i,
            handleRemove: s,
            onDeltaUpdate: l,
            readOnly: c,
            getStyle: p,
            dataType: h,
            addButtonElement: d,
            cancelButtonElement: y,
            editButtonElement: g,
            inputElementGenerator: A,
            textareaElementGenerator: v,
            minusMenuElement: S,
            plusMenuElement: w,
            beforeRemoveAction: x,
            beforeAddAction: C,
            beforeUpdateAction: k,
            logger: F,
            onSubmitValueParser: _,
          } = this.props,
          {
            minus: j,
            plus: M,
            addForm: P,
            ul: W,
            delimiter: L,
          } = p(e, t, r, n, h),
          z = Object.getOwnPropertyNames(t),
          D = c(e, t, r, n, h),
          T = pe(w, {
            onClick: this.handleAddMode,
            className: "rejt-plus-menu",
            style: M,
          }),
          O = pe(S, { onClick: s, className: "rejt-minus-menu", style: j }),
          U = z.map(($) =>
            f.createElement(Bn, {
              key: $,
              name: $,
              data: t[$],
              keyPath: r,
              deep: o,
              isCollapsed: i,
              handleRemove: this.handleRemoveValue($),
              handleUpdateValue: this.handleEditValue,
              onUpdate: this.onChildUpdate,
              onDeltaUpdate: l,
              readOnly: c,
              getStyle: p,
              addButtonElement: d,
              cancelButtonElement: y,
              editButtonElement: g,
              inputElementGenerator: A,
              textareaElementGenerator: v,
              minusMenuElement: S,
              plusMenuElement: w,
              beforeRemoveAction: x,
              beforeAddAction: C,
              beforeUpdateAction: k,
              logger: F,
              onSubmitValueParser: _,
            }),
          );
        return f.createElement(
          "span",
          { className: "rejt-not-collapsed" },
          f.createElement(
            "span",
            { className: "rejt-not-collapsed-delimiter", style: L },
            "{",
          ),
          !D && T,
          f.createElement(
            "ul",
            { className: "rejt-not-collapsed-list", style: W },
            U,
          ),
          !D &&
            a &&
            f.createElement(
              "div",
              { className: "rejt-add-form", style: P },
              f.createElement(za, {
                handleAdd: this.handleAddValueAdd,
                handleCancel: this.handleAddValueCancel,
                addButtonElement: d,
                cancelButtonElement: y,
                inputElementGenerator: A,
                keyPath: r,
                deep: n,
                onSubmitValueParser: _,
              }),
            ),
          f.createElement(
            "span",
            { className: "rejt-not-collapsed-delimiter", style: L },
            "}",
          ),
          !D && O,
        );
      }
      render() {
        let {
            name: e,
            collapsed: t,
            data: r,
            keyPath: n,
            deep: o,
          } = this.state,
          { getStyle: a, dataType: i } = this.props,
          s = t ? this.renderCollapsed() : this.renderNotCollapsed(),
          l = a(e, r, n, o, i);
        return f.createElement(
          "div",
          { className: "rejt-object-node" },
          f.createElement(
            "span",
            { onClick: this.handleCollapseMode },
            f.createElement(
              "span",
              { className: "rejt-name", style: l.name },
              e,
              " :",
              " ",
            ),
          ),
          s,
        );
      }
    };
    Ma.defaultProps = {
      keyPath: [],
      deep: 0,
      minusMenuElement: f.createElement("span", null, " - "),
      plusMenuElement: f.createElement("span", null, " + "),
    };
    var St = class extends dt {
      constructor(e) {
        super(e);
        let t = [...e.keyPath, e.name];
        (this.state = {
          value: e.value,
          name: e.name,
          keyPath: t,
          deep: e.deep,
          editEnabled: !1,
          inputRef: null,
        }),
          (this.handleEditMode = this.handleEditMode.bind(this)),
          (this.refInput = this.refInput.bind(this)),
          (this.handleCancelEdit = this.handleCancelEdit.bind(this)),
          (this.handleEdit = this.handleEdit.bind(this)),
          (this.onKeydown = this.onKeydown.bind(this));
      }
      static getDerivedStateFromProps(e, t) {
        return e.value !== t.value ? { value: e.value } : null;
      }
      componentDidUpdate() {
        let {
            editEnabled: e,
            inputRef: t,
            name: r,
            value: n,
            keyPath: o,
            deep: a,
          } = this.state,
          { readOnly: i, dataType: s } = this.props,
          l = i(r, n, o, a, s);
        e && !l && typeof t.focus == "function" && t.focus();
      }
      componentDidMount() {
        document.addEventListener("keydown", this.onKeydown);
      }
      componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeydown);
      }
      onKeydown(e) {
        e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.repeat ||
          ((e.code === "Enter" || e.key === "Enter") &&
            (e.preventDefault(), this.handleEdit()),
          (e.code === "Escape" || e.key === "Escape") &&
            (e.preventDefault(), this.handleCancelEdit()));
      }
      handleEdit() {
        let {
            handleUpdateValue: e,
            originalValue: t,
            logger: r,
            onSubmitValueParser: n,
            keyPath: o,
          } = this.props,
          { inputRef: a, name: i, deep: s } = this.state;
        if (!a) return;
        let l = n(!0, o, s, i, a.value);
        e({ value: l, key: i })
          .then(() => {
            Ld(t, l) || this.handleCancelEdit();
          })
          .catch(r.error);
      }
      handleEditMode() {
        this.setState({ editEnabled: !0 });
      }
      refInput(e) {
        this.state.inputRef = e;
      }
      handleCancelEdit() {
        this.setState({ editEnabled: !1 });
      }
      render() {
        let {
            name: e,
            value: t,
            editEnabled: r,
            keyPath: n,
            deep: o,
          } = this.state,
          {
            handleRemove: a,
            originalValue: i,
            readOnly: s,
            dataType: l,
            getStyle: c,
            editButtonElement: p,
            cancelButtonElement: h,
            inputElementGenerator: d,
            minusMenuElement: y,
            keyPath: g,
          } = this.props,
          A = c(e, i, n, o, l),
          v = s(e, i, n, o, l),
          S = r && !v,
          w = d(Ja, g, o, e, i, l),
          x = pe(p, { onClick: this.handleEdit }),
          C = pe(h, { onClick: this.handleCancelEdit }),
          k = pe(w, { ref: this.refInput, defaultValue: JSON.stringify(i) }),
          F = pe(y, {
            onClick: a,
            className: "rejt-minus-menu",
            style: A.minus,
          });
        return f.createElement(
          "li",
          { className: "rejt-value-node", style: A.li },
          f.createElement(
            "span",
            { className: "rejt-name", style: A.name },
            e,
            " : ",
          ),
          S
            ? f.createElement(
                "span",
                { className: "rejt-edit-form", style: A.editForm },
                k,
                " ",
                C,
                x,
              )
            : f.createElement(
                "span",
                {
                  className: "rejt-value",
                  style: A.value,
                  onClick: v ? null : this.handleEditMode,
                },
                String(t),
              ),
          !v && !S && F,
        );
      }
    };
    St.defaultProps = {
      keyPath: [],
      deep: 0,
      handleUpdateValue: () => Promise.resolve(),
      editButtonElement: f.createElement("button", null, "e"),
      cancelButtonElement: f.createElement("button", null, "c"),
      minusMenuElement: f.createElement("span", null, " - "),
    };
    function o1(e) {
      let t = e;
      if (t.indexOf("function") === 0) return (0, eval)(`(${t})`);
      try {
        t = JSON.parse(e);
      } catch {}
      return t;
    }
    var a1 = {
        minus: { color: "red" },
        plus: { color: "green" },
        collapsed: { color: "grey" },
        delimiter: {},
        ul: { padding: "0px", margin: "0 0 0 25px", listStyle: "none" },
        name: { color: "#2287CD" },
        addForm: {},
      },
      i1 = {
        minus: { color: "red" },
        plus: { color: "green" },
        collapsed: { color: "grey" },
        delimiter: {},
        ul: { padding: "0px", margin: "0 0 0 25px", listStyle: "none" },
        name: { color: "#2287CD" },
        addForm: {},
      },
      s1 = {
        minus: { color: "red" },
        editForm: {},
        value: { color: "#7bba3d" },
        li: { minHeight: "22px", lineHeight: "22px", outline: "0px" },
        name: { color: "#2287CD" },
      },
      $d = class extends dt {
        constructor(e) {
          super(e),
            (this.state = { data: e.data, rootName: e.rootName }),
            (this.onUpdate = this.onUpdate.bind(this)),
            (this.removeRoot = this.removeRoot.bind(this));
        }
        static getDerivedStateFromProps(e, t) {
          return e.data !== t.data || e.rootName !== t.rootName
            ? { data: e.data, rootName: e.rootName }
            : null;
        }
        onUpdate(e, t) {
          this.setState({ data: t }), this.props.onFullyUpdate(t);
        }
        removeRoot() {
          this.onUpdate(null, null);
        }
        render() {
          let { data: e, rootName: t } = this.state,
            {
              isCollapsed: r,
              onDeltaUpdate: n,
              readOnly: o,
              getStyle: a,
              addButtonElement: i,
              cancelButtonElement: s,
              editButtonElement: l,
              inputElement: c,
              textareaElement: p,
              minusMenuElement: h,
              plusMenuElement: d,
              beforeRemoveAction: y,
              beforeAddAction: g,
              beforeUpdateAction: A,
              logger: v,
              onSubmitValueParser: S,
              fallback: w = null,
            } = this.props,
            x = Ut(e),
            C = o;
          Ut(o) === "Boolean" && (C = () => o);
          let k = c;
          c && Ut(c) !== "Function" && (k = () => c);
          let F = p;
          return (
            p && Ut(p) !== "Function" && (F = () => p),
            x === "Object" || x === "Array"
              ? f.createElement(
                  "div",
                  { className: "rejt-tree" },
                  f.createElement(Bn, {
                    data: e,
                    name: t,
                    deep: -1,
                    isCollapsed: r,
                    onUpdate: this.onUpdate,
                    onDeltaUpdate: n,
                    readOnly: C,
                    getStyle: a,
                    addButtonElement: i,
                    cancelButtonElement: s,
                    editButtonElement: l,
                    inputElementGenerator: k,
                    textareaElementGenerator: F,
                    minusMenuElement: h,
                    plusMenuElement: d,
                    handleRemove: this.removeRoot,
                    beforeRemoveAction: y,
                    beforeAddAction: g,
                    beforeUpdateAction: A,
                    logger: v,
                    onSubmitValueParser: S,
                  }),
                )
              : w
          );
        }
      };
    $d.defaultProps = {
      rootName: "root",
      isCollapsed: (e, t) => t !== -1,
      getStyle: (e, t, r, n, o) => {
        switch (o) {
          case "Object":
          case "Error":
            return a1;
          case "Array":
            return i1;
          default:
            return s1;
        }
      },
      readOnly: () => !1,
      onFullyUpdate: () => {},
      onDeltaUpdate: () => {},
      beforeRemoveAction: () => Promise.resolve(),
      beforeAddAction: () => Promise.resolve(),
      beforeUpdateAction: () => Promise.resolve(),
      logger: { error: () => {} },
      onSubmitValueParser: (e, t, r, n, o) => o1(o),
      inputElement: () => f.createElement("input", null),
      textareaElement: () => f.createElement("textarea", null),
      fallback: null,
    };
    var { window: l1 } = globalThis,
      u1 = R.div(({ theme: e }) => ({
        position: "relative",
        display: "flex",
        '&[aria-readonly="true"]': { opacity: 0.5 },
        ".rejt-tree": { marginLeft: "1rem", fontSize: "13px" },
        ".rejt-value-node, .rejt-object-node > .rejt-collapsed, .rejt-array-node > .rejt-collapsed, .rejt-object-node > .rejt-not-collapsed, .rejt-array-node > .rejt-not-collapsed":
          { "& > svg": { opacity: 0, transition: "opacity 0.2s" } },
        ".rejt-value-node:hover, .rejt-object-node:hover > .rejt-collapsed, .rejt-array-node:hover > .rejt-collapsed, .rejt-object-node:hover > .rejt-not-collapsed, .rejt-array-node:hover > .rejt-not-collapsed":
          { "& > svg": { opacity: 1 } },
        ".rejt-edit-form button": { display: "none" },
        ".rejt-add-form": { marginLeft: 10 },
        ".rejt-add-value-node": {
          display: "inline-flex",
          alignItems: "center",
        },
        ".rejt-name": { lineHeight: "22px" },
        ".rejt-not-collapsed-delimiter": { lineHeight: "22px" },
        ".rejt-plus-menu": { marginLeft: 5 },
        ".rejt-object-node > span > *, .rejt-array-node > span > *": {
          position: "relative",
          zIndex: 2,
        },
        ".rejt-object-node, .rejt-array-node": { position: "relative" },
        ".rejt-object-node > span:first-of-type::after, .rejt-array-node > span:first-of-type::after, .rejt-collapsed::before, .rejt-not-collapsed::before":
          {
            content: '""',
            position: "absolute",
            top: 0,
            display: "block",
            width: "100%",
            marginLeft: "-1rem",
            padding: "0 4px 0 1rem",
            height: 22,
          },
        ".rejt-collapsed::before, .rejt-not-collapsed::before": {
          zIndex: 1,
          background: "transparent",
          borderRadius: 4,
          transition: "background 0.2s",
          pointerEvents: "none",
          opacity: 0.1,
        },
        ".rejt-object-node:hover, .rejt-array-node:hover": {
          "& > .rejt-collapsed::before, & > .rejt-not-collapsed::before": {
            background: e.color.secondary,
          },
        },
        ".rejt-collapsed::after, .rejt-not-collapsed::after": {
          content: '""',
          position: "absolute",
          display: "inline-block",
          pointerEvents: "none",
          width: 0,
          height: 0,
        },
        ".rejt-collapsed::after": {
          left: -8,
          top: 8,
          borderTop: "3px solid transparent",
          borderBottom: "3px solid transparent",
          borderLeft: "3px solid rgba(153,153,153,0.6)",
        },
        ".rejt-not-collapsed::after": {
          left: -10,
          top: 10,
          borderTop: "3px solid rgba(153,153,153,0.6)",
          borderLeft: "3px solid transparent",
          borderRight: "3px solid transparent",
        },
        ".rejt-value": {
          display: "inline-block",
          border: "1px solid transparent",
          borderRadius: 4,
          margin: "1px 0",
          padding: "0 4px",
          cursor: "text",
          color: e.color.defaultText,
        },
        ".rejt-value-node:hover > .rejt-value": {
          background: e.color.lighter,
          borderColor: e.appBorderColor,
        },
      })),
      Ta = R.button(({ theme: e, primary: t }) => ({
        border: 0,
        height: 20,
        margin: 1,
        borderRadius: 4,
        background: t ? e.color.secondary : "transparent",
        color: t ? e.color.lightest : e.color.dark,
        fontWeight: t ? "bold" : "normal",
        cursor: "pointer",
        order: t ? "initial" : 9,
      })),
      c1 = R(ho)(({ theme: e, disabled: t }) => ({
        display: "inline-block",
        verticalAlign: "middle",
        width: 15,
        height: 15,
        padding: 3,
        marginLeft: 5,
        cursor: t ? "not-allowed" : "pointer",
        color: e.textMutedColor,
        "&:hover": t ? {} : { color: e.color.ancillary },
        "svg + &": { marginLeft: 0 },
      })),
      d1 = R(rs)(({ theme: e, disabled: t }) => ({
        display: "inline-block",
        verticalAlign: "middle",
        width: 15,
        height: 15,
        padding: 3,
        marginLeft: 5,
        cursor: t ? "not-allowed" : "pointer",
        color: e.textMutedColor,
        "&:hover": t ? {} : { color: e.color.negative },
        "svg + &": { marginLeft: 0 },
      })),
      Gc = R.input(({ theme: e, placeholder: t }) => ({
        outline: 0,
        margin: t ? 1 : "1px 0",
        padding: "3px 4px",
        color: e.color.defaultText,
        background: e.background.app,
        border: `1px solid ${e.appBorderColor}`,
        borderRadius: 4,
        lineHeight: "14px",
        width: t === "Key" ? 80 : 120,
        "&:focus": { border: `1px solid ${e.color.secondary}` },
      })),
      p1 = R(Ke)(({ theme: e }) => ({
        position: "absolute",
        zIndex: 2,
        top: 2,
        right: 2,
        height: 21,
        padding: "0 3px",
        background: e.background.bar,
        border: `1px solid ${e.appBorderColor}`,
        borderRadius: 3,
        color: e.textMutedColor,
        fontSize: "9px",
        fontWeight: "bold",
        textDecoration: "none",
        span: { marginLeft: 3, marginTop: 1 },
      })),
      h1 = R(Ge.Textarea)(({ theme: e }) => ({
        flex: 1,
        padding: "7px 6px",
        fontFamily: e.typography.fonts.mono,
        fontSize: "12px",
        lineHeight: "18px",
        "&::placeholder": {
          fontFamily: e.typography.fonts.base,
          fontSize: "13px",
        },
        "&:placeholder-shown": { padding: "7px 10px" },
      })),
      f1 = {
        bubbles: !0,
        cancelable: !0,
        key: "Enter",
        code: "Enter",
        keyCode: 13,
      },
      m1 = (e) => {
        e.currentTarget.dispatchEvent(new l1.KeyboardEvent("keydown", f1));
      },
      y1 = (e) => {
        e.currentTarget.select();
      },
      g1 = (e) => () => ({
        name: { color: e.color.secondary },
        collapsed: { color: e.color.dark },
        ul: { listStyle: "none", margin: "0 0 0 1rem", padding: 0 },
        li: { outline: 0 },
      }),
      Wc = ({ name: e, value: t, onChange: r, argType: n }) => {
        let o = co(),
          a = pt(() => t && ci(t), [t]),
          i = a != null,
          [s, l] = Z(!i),
          [c, p] = Z(null),
          h = !!n?.table?.readonly,
          d = Ce(
            (x) => {
              try {
                x && r(JSON.parse(x)), p(void 0);
              } catch (C) {
                p(C);
              }
            },
            [r],
          ),
          [y, g] = Z(!1),
          A = Ce(() => {
            r({}), g(!0);
          }, [g]),
          v = Pe(null);
        if (
          (xe(() => {
            y && v.current && v.current.select();
          }, [y]),
          !i)
        )
          return f.createElement(
            ht,
            { disabled: h, id: yr(e), onClick: A },
            "Set object",
          );
        let S = f.createElement(h1, {
            ref: v,
            id: Le(e),
            name: e,
            defaultValue: t === null ? "" : JSON.stringify(t, null, 2),
            onBlur: (x) => d(x.target.value),
            placeholder: "Edit JSON string...",
            autoFocus: y,
            valid: c ? "error" : null,
            readOnly: h,
          }),
          w =
            Array.isArray(t) ||
            (typeof t == "object" && t?.constructor === Object);
        return f.createElement(
          u1,
          { "aria-readonly": h },
          w &&
            f.createElement(
              p1,
              {
                onClick: (x) => {
                  x.preventDefault(), l((C) => !C);
                },
              },
              s ? f.createElement(Qi, null) : f.createElement(Zi, null),
              f.createElement("span", null, "RAW"),
            ),
          s
            ? S
            : f.createElement($d, {
                readOnly: h || !w,
                isCollapsed: w ? void 0 : () => !0,
                data: a,
                rootName: e,
                onFullyUpdate: r,
                getStyle: g1(o),
                cancelButtonElement: f.createElement(
                  Ta,
                  { type: "button" },
                  "Cancel",
                ),
                editButtonElement: f.createElement(
                  Ta,
                  { type: "submit" },
                  "Save",
                ),
                addButtonElement: f.createElement(
                  Ta,
                  { type: "submit", primary: !0 },
                  "Save",
                ),
                plusMenuElement: f.createElement(c1, null),
                minusMenuElement: f.createElement(d1, null),
                inputElement: (x, C, k, F) =>
                  F
                    ? f.createElement(Gc, { onFocus: y1, onBlur: m1 })
                    : f.createElement(Gc, null),
                fallback: S,
              }),
        );
      },
      b1 = R.input(({ theme: e, min: t, max: r, value: n, disabled: o }) => ({
        "&": {
          width: "100%",
          backgroundColor: "transparent",
          appearance: "none",
        },
        "&::-webkit-slider-runnable-track": {
          background:
            e.base === "light"
              ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Qe(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Qe(0.02, e.input.background)} 100%)`
              : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Lt(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Lt(0.02, e.input.background)} 100%)`,
          boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
          borderRadius: 6,
          width: "100%",
          height: 6,
          cursor: o ? "not-allowed" : "pointer",
        },
        "&::-webkit-slider-thumb": {
          marginTop: "-6px",
          width: 16,
          height: 16,
          border: `1px solid ${st(e.appBorderColor, 0.2)}`,
          borderRadius: "50px",
          boxShadow: `0 1px 3px 0px ${st(e.appBorderColor, 0.2)}`,
          cursor: o ? "not-allowed" : "grab",
          appearance: "none",
          background: `${e.input.background}`,
          transition: "all 150ms ease-out",
          "&:hover": {
            background: `${Qe(0.05, e.input.background)}`,
            transform: "scale3d(1.1, 1.1, 1.1) translateY(-1px)",
            transition: "all 50ms ease-out",
          },
          "&:active": {
            background: `${e.input.background}`,
            transform: "scale3d(1, 1, 1) translateY(0px)",
            cursor: o ? "not-allowed" : "grab",
          },
        },
        "&:focus": {
          outline: "none",
          "&::-webkit-slider-runnable-track": {
            borderColor: st(e.color.secondary, 0.4),
          },
          "&::-webkit-slider-thumb": {
            borderColor: e.color.secondary,
            boxShadow: `0 0px 5px 0px ${e.color.secondary}`,
          },
        },
        "&::-moz-range-track": {
          background:
            e.base === "light"
              ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Qe(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Qe(0.02, e.input.background)} 100%)`
              : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Lt(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Lt(0.02, e.input.background)} 100%)`,
          boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
          borderRadius: 6,
          width: "100%",
          height: 6,
          cursor: o ? "not-allowed" : "pointer",
          outline: "none",
        },
        "&::-moz-range-thumb": {
          width: 16,
          height: 16,
          border: `1px solid ${st(e.appBorderColor, 0.2)}`,
          borderRadius: "50px",
          boxShadow: `0 1px 3px 0px ${st(e.appBorderColor, 0.2)}`,
          cursor: o ? "not-allowed" : "grap",
          background: `${e.input.background}`,
          transition: "all 150ms ease-out",
          "&:hover": {
            background: `${Qe(0.05, e.input.background)}`,
            transform: "scale3d(1.1, 1.1, 1.1) translateY(-1px)",
            transition: "all 50ms ease-out",
          },
          "&:active": {
            background: `${e.input.background}`,
            transform: "scale3d(1, 1, 1) translateY(0px)",
            cursor: "grabbing",
          },
        },
        "&::-ms-track": {
          background:
            e.base === "light"
              ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Qe(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Qe(0.02, e.input.background)} 100%)`
              : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Lt(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Lt(0.02, e.input.background)} 100%)`,
          boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
          color: "transparent",
          width: "100%",
          height: "6px",
          cursor: "pointer",
        },
        "&::-ms-fill-lower": { borderRadius: 6 },
        "&::-ms-fill-upper": { borderRadius: 6 },
        "&::-ms-thumb": {
          width: 16,
          height: 16,
          background: `${e.input.background}`,
          border: `1px solid ${st(e.appBorderColor, 0.2)}`,
          borderRadius: 50,
          cursor: "grab",
          marginTop: 0,
        },
        "@supports (-ms-ime-align:auto)": {
          "input[type=range]": { margin: "0" },
        },
      })),
      qd = R.span({
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 12,
        whiteSpace: "nowrap",
        fontFeatureSettings: "tnum",
        fontVariantNumeric: "tabular-nums",
        "[aria-readonly=true] &": { opacity: 0.5 },
      }),
      E1 = R(qd)(({ numberOFDecimalsPlaces: e, max: t }) => ({
        width: `${e + t.toString().length * 2 + 3}ch`,
        textAlign: "right",
        flexShrink: 0,
      })),
      v1 = R.div({ display: "flex", alignItems: "center", width: "100%" });
    function A1(e) {
      let t = e.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
    }
    var D1 = ({
        name: e,
        value: t,
        onChange: r,
        min: n = 0,
        max: o = 100,
        step: a = 1,
        onBlur: i,
        onFocus: s,
        argType: l,
      }) => {
        let c = (y) => {
            r(O2(y.target.value));
          },
          p = t !== void 0,
          h = pt(() => A1(a), [a]),
          d = !!l?.table?.readonly;
        return f.createElement(
          v1,
          { "aria-readonly": d },
          f.createElement(qd, null, n),
          f.createElement(b1, {
            id: Le(e),
            type: "range",
            disabled: d,
            onChange: c,
            name: e,
            value: t,
            min: n,
            max: o,
            step: a,
            onFocus: s,
            onBlur: i,
          }),
          f.createElement(
            E1,
            { numberOFDecimalsPlaces: h, max: o },
            p ? t.toFixed(h) : "--",
            " / ",
            o,
          ),
        );
      },
      S1 = R.label({ display: "flex" }),
      w1 = R.div(({ isMaxed: e }) => ({
        marginLeft: "0.75rem",
        paddingTop: "0.35rem",
        color: e ? "red" : void 0,
      })),
      C1 = ({
        name: e,
        value: t,
        onChange: r,
        onFocus: n,
        onBlur: o,
        maxLength: a,
        argType: i,
      }) => {
        let s = (y) => {
            r(y.target.value);
          },
          l = !!i?.table?.readonly,
          [c, p] = Z(!1),
          h = Ce(() => {
            r(""), p(!0);
          }, [p]);
        if (t === void 0)
          return f.createElement(
            ht,
            {
              variant: "outline",
              size: "medium",
              disabled: l,
              id: yr(e),
              onClick: h,
            },
            "Set string",
          );
        let d = typeof t == "string";
        return f.createElement(
          S1,
          null,
          f.createElement(Ge.Textarea, {
            id: Le(e),
            maxLength: a,
            onChange: s,
            disabled: l,
            size: "flex",
            placeholder: "Edit string...",
            autoFocus: c,
            valid: d ? null : "error",
            name: e,
            value: d ? t : "",
            onFocus: n,
            onBlur: o,
          }),
          a &&
            f.createElement(
              w1,
              { isMaxed: t?.length === a },
              t?.length ?? 0,
              " / ",
              a,
            ),
        );
      },
      x1 = R(Ge.Input)({ padding: 10 });
    function T1(e) {
      e.forEach((t) => {
        t.startsWith("blob:") && URL.revokeObjectURL(t);
      });
    }
    var F1 = ({
        onChange: e,
        name: t,
        accept: r = "image/*",
        value: n,
        argType: o,
      }) => {
        let a = Pe(null),
          i = o?.control?.readOnly;
        function s(l) {
          if (!l.target.files) return;
          let c = Array.from(l.target.files).map((p) => URL.createObjectURL(p));
          e(c), T1(n);
        }
        return (
          xe(() => {
            n == null && a.current && (a.current.value = null);
          }, [n, t]),
          f.createElement(x1, {
            ref: a,
            id: Le(t),
            type: "file",
            name: t,
            multiple: !0,
            disabled: i,
            onChange: s,
            accept: r,
            size: "flex",
          })
        );
      },
      I1 = fi(() => Promise.resolve().then(() => (Rc(), kc))),
      k1 = (e) =>
        f.createElement(
          pi,
          { fallback: f.createElement("div", null) },
          f.createElement(I1, { ...e }),
        ),
      R1 = {
        array: Wc,
        object: Wc,
        boolean: w2,
        color: k1,
        date: k2,
        number: B2,
        check: ar,
        "inline-check": ar,
        radio: ar,
        "inline-radio": ar,
        select: ar,
        "multi-select": ar,
        range: D1,
        text: C1,
        file: F1,
      },
      Kc = () => f.createElement(f.Fragment, null, "-"),
      O1 = ({ row: e, arg: t, updateArgs: r, isHovered: n }) => {
        let { key: o, control: a } = e,
          [i, s] = Z(!1),
          [l, c] = Z({ value: t });
        xe(() => {
          i || c({ value: t });
        }, [i, t]);
        let p = Ce((A) => (c({ value: A }), r({ [o]: A }), A), [r, o]),
          h = Ce(() => s(!1), []),
          d = Ce(() => s(!0), []);
        if (!a || a.disable) {
          let A = a?.disable !== !0 && e?.type?.name !== "function";
          return n && A
            ? f.createElement(
                xt,
                {
                  href: "https://storybook.js.org/docs/essentials/controls",
                  target: "_blank",
                  withArrow: !0,
                },
                "Setup controls",
              )
            : f.createElement(Kc, null);
        }
        let y = {
            name: o,
            argType: e,
            value: l.value,
            onChange: p,
            onBlur: h,
            onFocus: d,
          },
          g = R1[a.type] || Kc;
        return f.createElement(g, { ...y, ...a, controlType: a.type });
      },
      _1 = R.table(({ theme: e }) => ({
        "&&": {
          borderCollapse: "collapse",
          borderSpacing: 0,
          border: "none",
          tr: { border: "none !important", background: "none" },
          "td, th": { padding: 0, border: "none", width: "auto!important" },
          marginTop: 0,
          marginBottom: 0,
          "th:first-of-type, td:first-of-type": { paddingLeft: 0 },
          "th:last-of-type, td:last-of-type": { paddingRight: 0 },
          td: {
            paddingTop: 0,
            paddingBottom: 4,
            "&:not(:first-of-type)": { paddingLeft: 10, paddingRight: 0 },
          },
          tbody: { boxShadow: "none", border: "none" },
          code: Ht({ theme: e }),
          div: { span: { fontWeight: "bold" } },
          "& code": {
            margin: 0,
            display: "inline-block",
            fontSize: e.typography.size.s1,
          },
        },
      })),
      B1 = ({ tags: e }) => {
        let t = (e.params || []).filter((a) => a.description),
          r = t.length !== 0,
          n = e.deprecated != null,
          o = e.returns != null && e.returns.description != null;
        return !r && !o && !n
          ? null
          : f.createElement(
              f.Fragment,
              null,
              f.createElement(
                _1,
                null,
                f.createElement(
                  "tbody",
                  null,
                  n &&
                    f.createElement(
                      "tr",
                      { key: "deprecated" },
                      f.createElement(
                        "td",
                        { colSpan: 2 },
                        f.createElement("strong", null, "Deprecated"),
                        ": ",
                        e.deprecated.toString(),
                      ),
                    ),
                  r &&
                    t.map((a) =>
                      f.createElement(
                        "tr",
                        { key: a.name },
                        f.createElement(
                          "td",
                          null,
                          f.createElement("code", null, a.name),
                        ),
                        f.createElement("td", null, a.description),
                      ),
                    ),
                  o &&
                    f.createElement(
                      "tr",
                      { key: "returns" },
                      f.createElement(
                        "td",
                        null,
                        f.createElement("code", null, "Returns"),
                      ),
                      f.createElement("td", null, e.returns.description),
                    ),
                ),
              ),
            );
      },
      P1 = zt(id()),
      Ua = 8,
      Yc = R.div(({ isExpanded: e }) => ({
        display: "flex",
        flexDirection: e ? "column" : "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        marginBottom: "-4px",
        minWidth: 100,
      })),
      N1 = R.span(Ht, ({ theme: e, simple: t = !1 }) => ({
        flex: "0 0 auto",
        fontFamily: e.typography.fonts.mono,
        fontSize: e.typography.size.s1,
        wordBreak: "break-word",
        whiteSpace: "normal",
        maxWidth: "100%",
        margin: 0,
        marginRight: "4px",
        marginBottom: "4px",
        paddingTop: "2px",
        paddingBottom: "2px",
        lineHeight: "13px",
        ...(t && {
          background: "transparent",
          border: "0 none",
          paddingLeft: 0,
        }),
      })),
      j1 = R.button(({ theme: e }) => ({
        fontFamily: e.typography.fonts.mono,
        color: e.color.secondary,
        marginBottom: "4px",
        background: "none",
        border: "none",
      })),
      L1 = R.div(Ht, ({ theme: e }) => ({
        fontFamily: e.typography.fonts.mono,
        color: e.color.secondary,
        fontSize: e.typography.size.s1,
        margin: 0,
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
      })),
      M1 = R.div(({ theme: e, width: t }) => ({
        width: t,
        minWidth: 200,
        maxWidth: 800,
        padding: 15,
        fontFamily: e.typography.fonts.mono,
        fontSize: e.typography.size.s1,
        boxSizing: "content-box",
        "& code": { padding: "0 !important" },
      })),
      U1 = R(Xi)({ marginLeft: 4 }),
      $1 = R(fo)({ marginLeft: 4 }),
      q1 = () => f.createElement("span", null, "-"),
      Vd = ({ text: e, simple: t }) => f.createElement(N1, { simple: t }, e),
      V1 = (0, P1.default)(1e3)((e) => {
        let t = e.split(/\r?\n/);
        return `${Math.max(...t.map((r) => r.length))}ch`;
      }),
      J1 = (e) => {
        if (!e) return [e];
        let t = e.split("|").map((r) => r.trim());
        return li(t);
      },
      Xc = (e, t = !0) => {
        let r = e;
        return (
          t || (r = e.slice(0, Ua)),
          r.map((n) =>
            f.createElement(Vd, { key: n, text: n === "" ? '""' : n }),
          )
        );
      },
      z1 = ({ value: e, initialExpandedArgs: t }) => {
        let { summary: r, detail: n } = e,
          [o, a] = Z(!1),
          [i, s] = Z(t || !1);
        if (r == null) return null;
        let l = typeof r.toString == "function" ? r.toString() : r;
        if (n == null) {
          if (/[(){}[\]<>]/.test(l)) return f.createElement(Vd, { text: l });
          let c = J1(l),
            p = c.length;
          return p > Ua
            ? f.createElement(
                Yc,
                { isExpanded: i },
                Xc(c, i),
                f.createElement(
                  j1,
                  { onClick: () => s(!i) },
                  i ? "Show less..." : `Show ${p - Ua} more...`,
                ),
              )
            : f.createElement(Yc, null, Xc(c));
        }
        return f.createElement(
          Xn,
          {
            closeOnOutsideClick: !0,
            placement: "bottom",
            visible: o,
            onVisibleChange: (c) => {
              a(c);
            },
            tooltip: f.createElement(
              M1,
              { width: V1(n) },
              f.createElement(Ur, { language: "jsx", format: !1 }, n),
            ),
          },
          f.createElement(
            L1,
            { className: "sbdocs-expandable" },
            f.createElement("span", null, l),
            o ? f.createElement(U1, null) : f.createElement($1, null),
          ),
        );
      },
      Fa = ({ value: e, initialExpandedArgs: t }) =>
        e == null
          ? f.createElement(q1, null)
          : f.createElement(z1, { value: e, initialExpandedArgs: t }),
      H1 = R.span({ fontWeight: "bold" }),
      G1 = R.span(({ theme: e }) => ({
        color: e.color.negative,
        fontFamily: e.typography.fonts.mono,
        cursor: "help",
      })),
      W1 = R.div(({ theme: e }) => ({
        "&&": { p: { margin: "0 0 10px 0" }, a: { color: e.color.secondary } },
        code: {
          ...Ht({ theme: e }),
          fontSize: 12,
          fontFamily: e.typography.fonts.mono,
        },
        "& code": { margin: 0, display: "inline-block" },
        "& pre > code": { whiteSpace: "pre-wrap" },
      })),
      K1 = R.div(({ theme: e, hasDescription: t }) => ({
        color:
          e.base === "light"
            ? ce(0.1, e.color.defaultText)
            : ce(0.2, e.color.defaultText),
        marginTop: t ? 4 : 0,
      })),
      Y1 = R.div(({ theme: e, hasDescription: t }) => ({
        color:
          e.base === "light"
            ? ce(0.1, e.color.defaultText)
            : ce(0.2, e.color.defaultText),
        marginTop: t ? 12 : 0,
        marginBottom: 12,
      })),
      X1 = R.td(({ theme: e, expandable: t }) => ({
        paddingLeft: t ? "40px !important" : "20px !important",
      })),
      Q1 = (e) => e && { summary: typeof e == "string" ? e : e.name },
      Cn = (e) => {
        let [t, r] = Z(!1),
          {
            row: n,
            updateArgs: o,
            compact: a,
            expandable: i,
            initialExpandedArgs: s,
          } = e,
          { name: l, description: c } = n,
          p = n.table || {},
          h = p.type || Q1(n.type),
          d = p.defaultValue || n.defaultValue,
          y = n.type?.required,
          g = c != null && c !== "";
        return f.createElement(
          "tr",
          { onMouseEnter: () => r(!0), onMouseLeave: () => r(!1) },
          f.createElement(
            X1,
            { expandable: i },
            f.createElement(H1, null, l),
            y ? f.createElement(G1, { title: "Required" }, "*") : null,
          ),
          a
            ? null
            : f.createElement(
                "td",
                null,
                g && f.createElement(W1, null, f.createElement(A2, null, c)),
                p.jsDocTags != null
                  ? f.createElement(
                      f.Fragment,
                      null,
                      f.createElement(
                        Y1,
                        { hasDescription: g },
                        f.createElement(Fa, {
                          value: h,
                          initialExpandedArgs: s,
                        }),
                      ),
                      f.createElement(B1, { tags: p.jsDocTags }),
                    )
                  : f.createElement(
                      K1,
                      { hasDescription: g },
                      f.createElement(Fa, { value: h, initialExpandedArgs: s }),
                    ),
              ),
          a
            ? null
            : f.createElement(
                "td",
                null,
                f.createElement(Fa, { value: d, initialExpandedArgs: s }),
              ),
          o
            ? f.createElement(
                "td",
                null,
                f.createElement(O1, { ...e, isHovered: t }),
              )
            : null,
        );
      },
      Z1 = R.div(({ inAddonPanel: e, theme: t }) => ({
        height: e ? "100%" : "auto",
        display: "flex",
        border: e ? "none" : `1px solid ${t.appBorderColor}`,
        borderRadius: e ? 0 : t.appBorderRadius,
        padding: e ? 0 : 40,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 15,
        background: t.background.content,
        boxShadow: "rgba(0, 0, 0, 0.10) 0 1px 3px 0",
      })),
      eb = R.div(({ theme: e }) => ({
        display: "flex",
        fontSize: e.typography.size.s2 - 1,
        gap: 25,
      })),
      tb = R.div(({ theme: e }) => ({
        width: 1,
        height: 16,
        backgroundColor: e.appBorderColor,
      })),
      rb = ({ inAddonPanel: e }) => {
        let [t, r] = Z(!0);
        return (
          xe(() => {
            let n = setTimeout(() => {
              r(!1);
            }, 100);
            return () => clearTimeout(n);
          }, []),
          t
            ? null
            : f.createElement(
                Z1,
                { inAddonPanel: e },
                f.createElement(Hn, {
                  title: e
                    ? "Interactive story playground"
                    : "Args table with interactive controls couldn't be auto-generated",
                  description: f.createElement(
                    f.Fragment,
                    null,
                    "Controls give you an easy to use interface to test your components. Set your story args and you'll see controls appearing here automatically.",
                  ),
                  footer: f.createElement(
                    eb,
                    null,
                    e &&
                      f.createElement(
                        f.Fragment,
                        null,
                        f.createElement(
                          xt,
                          {
                            href: "https://youtu.be/0gOfS6K0x0E",
                            target: "_blank",
                            withArrow: !0,
                          },
                          f.createElement(ns, null),
                          " Watch 5m video",
                        ),
                        f.createElement(tb, null),
                        f.createElement(
                          xt,
                          {
                            href: "https://storybook.js.org/docs/essentials/controls",
                            target: "_blank",
                            withArrow: !0,
                          },
                          f.createElement(Yr, null),
                          " Read docs",
                        ),
                      ),
                    !e &&
                      f.createElement(
                        xt,
                        {
                          href: "https://storybook.js.org/docs/essentials/controls",
                          target: "_blank",
                          withArrow: !0,
                        },
                        f.createElement(Yr, null),
                        " Learn how to set that up",
                      ),
                  ),
                }),
              )
        );
      },
      nb = R(Ki)(({ theme: e }) => ({
        marginRight: 8,
        marginLeft: -10,
        marginTop: -2,
        height: 12,
        width: 12,
        color:
          e.base === "light"
            ? ce(0.25, e.color.defaultText)
            : ce(0.3, e.color.defaultText),
        border: "none",
        display: "inline-block",
      })),
      ob = R(Yi)(({ theme: e }) => ({
        marginRight: 8,
        marginLeft: -10,
        marginTop: -2,
        height: 12,
        width: 12,
        color:
          e.base === "light"
            ? ce(0.25, e.color.defaultText)
            : ce(0.3, e.color.defaultText),
        border: "none",
        display: "inline-block",
      })),
      ab = R.span(({ theme: e }) => ({
        display: "flex",
        lineHeight: "20px",
        alignItems: "center",
      })),
      ib = R.td(({ theme: e }) => ({
        position: "relative",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s1 - 1,
        color:
          e.base === "light"
            ? ce(0.4, e.color.defaultText)
            : ce(0.6, e.color.defaultText),
        background: `${e.background.app} !important`,
        "& ~ td": { background: `${e.background.app} !important` },
      })),
      sb = R.td(({ theme: e }) => ({
        position: "relative",
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s2 - 1,
        background: e.background.app,
      })),
      lb = R.td({ position: "relative" }),
      ub = R.tr(({ theme: e }) => ({
        "&:hover > td": {
          backgroundColor: `${Lt(0.005, e.background.app)} !important`,
          boxShadow: `${e.color.mediumlight} 0 - 1px 0 0 inset`,
          cursor: "row-resize",
        },
      })),
      Qc = R.button({
        background: "none",
        border: "none",
        padding: "0",
        font: "inherit",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: "100%",
        width: "100%",
        color: "transparent",
        cursor: "row-resize !important",
      }),
      Ia = ({
        level: e = "section",
        label: t,
        children: r,
        initialExpanded: n = !0,
        colSpan: o = 3,
      }) => {
        let [a, i] = Z(n),
          s = e === "subsection" ? sb : ib,
          l = r?.length || 0,
          c = e === "subsection" ? `${l} item${l !== 1 ? "s" : ""}` : "",
          p = `${a ? "Hide" : "Show"} ${e === "subsection" ? l : t} item${l !== 1 ? "s" : ""}`;
        return f.createElement(
          f.Fragment,
          null,
          f.createElement(
            ub,
            { title: p },
            f.createElement(
              s,
              { colSpan: 1 },
              f.createElement(Qc, { onClick: (h) => i(!a), tabIndex: 0 }, p),
              f.createElement(
                ab,
                null,
                a ? f.createElement(nb, null) : f.createElement(ob, null),
                t,
              ),
            ),
            f.createElement(
              lb,
              { colSpan: o - 1 },
              f.createElement(
                Qc,
                {
                  onClick: (h) => i(!a),
                  tabIndex: -1,
                  style: { outline: "none" },
                },
                p,
              ),
              a ? null : c,
            ),
          ),
          a ? r : null,
        );
      },
      xn = R.div(({ theme: e }) => ({
        display: "flex",
        gap: 16,
        borderBottom: `1px solid ${e.appBorderColor}`,
        "&:last-child": { borderBottom: 0 },
      })),
      Oe = R.div(({ numColumn: e }) => ({
        display: "flex",
        flexDirection: "column",
        flex: e || 1,
        gap: 5,
        padding: "12px 20px",
      })),
      Ee = R.div(({ theme: e, width: t, height: r }) => ({
        animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
        background: e.appBorderColor,
        width: t || "100%",
        height: r || 16,
        borderRadius: 3,
      })),
      _e = [2, 4, 2, 2],
      cb = () =>
        f.createElement(
          f.Fragment,
          null,
          f.createElement(
            xn,
            null,
            f.createElement(
              Oe,
              { numColumn: _e[0] },
              f.createElement(Ee, { width: "60%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[1] },
              f.createElement(Ee, { width: "30%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[2] },
              f.createElement(Ee, { width: "60%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[3] },
              f.createElement(Ee, { width: "60%" }),
            ),
          ),
          f.createElement(
            xn,
            null,
            f.createElement(
              Oe,
              { numColumn: _e[0] },
              f.createElement(Ee, { width: "60%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[1] },
              f.createElement(Ee, { width: "80%" }),
              f.createElement(Ee, { width: "30%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[2] },
              f.createElement(Ee, { width: "60%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[3] },
              f.createElement(Ee, { width: "60%" }),
            ),
          ),
          f.createElement(
            xn,
            null,
            f.createElement(
              Oe,
              { numColumn: _e[0] },
              f.createElement(Ee, { width: "60%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[1] },
              f.createElement(Ee, { width: "80%" }),
              f.createElement(Ee, { width: "30%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[2] },
              f.createElement(Ee, { width: "60%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[3] },
              f.createElement(Ee, { width: "60%" }),
            ),
          ),
          f.createElement(
            xn,
            null,
            f.createElement(
              Oe,
              { numColumn: _e[0] },
              f.createElement(Ee, { width: "60%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[1] },
              f.createElement(Ee, { width: "80%" }),
              f.createElement(Ee, { width: "30%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[2] },
              f.createElement(Ee, { width: "60%" }),
            ),
            f.createElement(
              Oe,
              { numColumn: _e[3] },
              f.createElement(Ee, { width: "60%" }),
            ),
          ),
        ),
      db = R.table(({ theme: e, compact: t, inAddonPanel: r }) => ({
        "&&": {
          borderSpacing: 0,
          color: e.color.defaultText,
          "td, th": {
            padding: 0,
            border: "none",
            verticalAlign: "top",
            textOverflow: "ellipsis",
          },
          fontSize: e.typography.size.s2 - 1,
          lineHeight: "20px",
          textAlign: "left",
          width: "100%",
          marginTop: r ? 0 : 25,
          marginBottom: r ? 0 : 40,
          "thead th:first-of-type, td:first-of-type": { width: "25%" },
          "th:first-of-type, td:first-of-type": { paddingLeft: 20 },
          "th:nth-of-type(2), td:nth-of-type(2)": {
            ...(t ? null : { width: "35%" }),
          },
          "td:nth-of-type(3)": { ...(t ? null : { width: "15%" }) },
          "th:last-of-type, td:last-of-type": {
            paddingRight: 20,
            ...(t ? null : { width: "25%" }),
          },
          th: {
            color:
              e.base === "light"
                ? ce(0.25, e.color.defaultText)
                : ce(0.45, e.color.defaultText),
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 15,
            paddingRight: 15,
          },
          td: {
            paddingTop: "10px",
            paddingBottom: "10px",
            "&:not(:first-of-type)": { paddingLeft: 15, paddingRight: 15 },
            "&:last-of-type": { paddingRight: 20 },
          },
          marginLeft: r ? 0 : 1,
          marginRight: r ? 0 : 1,
          tbody: {
            ...(r
              ? null
              : {
                  filter:
                    e.base === "light"
                      ? "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))"
                      : "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.20))",
                }),
            "> tr > *": {
              background: e.background.content,
              borderTop: `1px solid ${e.appBorderColor}`,
            },
            ...(r
              ? null
              : {
                  "> tr:first-of-type > *": {
                    borderBlockStart: `1px solid ${e.appBorderColor}`,
                  },
                  "> tr:last-of-type > *": {
                    borderBlockEnd: `1px solid ${e.appBorderColor}`,
                  },
                  "> tr > *:first-of-type": {
                    borderInlineStart: `1px solid ${e.appBorderColor}`,
                  },
                  "> tr > *:last-of-type": {
                    borderInlineEnd: `1px solid ${e.appBorderColor}`,
                  },
                  "> tr:first-of-type > td:first-of-type": {
                    borderTopLeftRadius: e.appBorderRadius,
                  },
                  "> tr:first-of-type > td:last-of-type": {
                    borderTopRightRadius: e.appBorderRadius,
                  },
                  "> tr:last-of-type > td:first-of-type": {
                    borderBottomLeftRadius: e.appBorderRadius,
                  },
                  "> tr:last-of-type > td:last-of-type": {
                    borderBottomRightRadius: e.appBorderRadius,
                  },
                }),
          },
        },
      })),
      pb = R(Ke)(({ theme: e }) => ({ margin: "-4px -12px -4px 0" })),
      hb = R.span({ display: "flex", justifyContent: "space-between" }),
      fb = {
        alpha: (e, t) => e.name.localeCompare(t.name),
        requiredFirst: (e, t) =>
          +!!t.type?.required - +!!e.type?.required ||
          e.name.localeCompare(t.name),
        none: void 0,
      },
      mb = (e, t) => {
        let r = { ungrouped: [], ungroupedSubsections: {}, sections: {} };
        if (!e) return r;
        Object.entries(e).forEach(([a, i]) => {
          let { category: s, subcategory: l } = i?.table || {};
          if (s) {
            let c = r.sections[s] || { ungrouped: [], subsections: {} };
            if (!l) c.ungrouped.push({ key: a, ...i });
            else {
              let p = c.subsections[l] || [];
              p.push({ key: a, ...i }), (c.subsections[l] = p);
            }
            r.sections[s] = c;
          } else if (l) {
            let c = r.ungroupedSubsections[l] || [];
            c.push({ key: a, ...i }), (r.ungroupedSubsections[l] = c);
          } else r.ungrouped.push({ key: a, ...i });
        });
        let n = fb[t],
          o = (a) =>
            n
              ? Object.keys(a).reduce(
                  (i, s) => ({ ...i, [s]: a[s].sort(n) }),
                  {},
                )
              : a;
        return {
          ungrouped: r.ungrouped.sort(n),
          ungroupedSubsections: o(r.ungroupedSubsections),
          sections: Object.keys(r.sections).reduce(
            (a, i) => ({
              ...a,
              [i]: {
                ungrouped: r.sections[i].ungrouped.sort(n),
                subsections: o(r.sections[i].subsections),
              },
            }),
            {},
          ),
        };
      },
      yb = (e, t, r) => {
        try {
          return mn(e, t, r);
        } catch (n) {
          return ss.warn(n.message), !1;
        }
      },
      gb = (e) => {
        let {
          updateArgs: t,
          resetArgs: r,
          compact: n,
          inAddonPanel: o,
          initialExpandedArgs: a,
          sort: i = "none",
          isLoading: s,
        } = e;
        if ("error" in e) {
          let { error: w } = e;
          return f.createElement(
            dd,
            null,
            w,
            "\xA0",
            f.createElement(
              xt,
              {
                href: "http://storybook.js.org/docs/",
                target: "_blank",
                withArrow: !0,
              },
              f.createElement(Yr, null),
              " Read the docs",
            ),
          );
        }
        if (s) return f.createElement(cb, null);
        let { rows: l, args: c, globals: p } = "rows" in e && e,
          h = mb(
            ui(l || {}, (w) => !w?.table?.disable && yb(w, c || {}, p || {})),
            i,
          ),
          d = h.ungrouped.length === 0,
          y = Object.entries(h.sections).length === 0,
          g = Object.entries(h.ungroupedSubsections).length === 0;
        if (d && y && g) return f.createElement(rb, { inAddonPanel: o });
        let A = 1;
        t && (A += 1), n || (A += 2);
        let v = Object.keys(h.sections).length > 0,
          S = {
            updateArgs: t,
            compact: n,
            inAddonPanel: o,
            initialExpandedArgs: a,
          };
        return f.createElement(
          Kn,
          null,
          f.createElement(
            db,
            {
              compact: n,
              inAddonPanel: o,
              className: "docblock-argstable sb-unstyled",
            },
            f.createElement(
              "thead",
              { className: "docblock-argstable-head" },
              f.createElement(
                "tr",
                null,
                f.createElement(
                  "th",
                  null,
                  f.createElement("span", null, "Name"),
                ),
                n
                  ? null
                  : f.createElement(
                      "th",
                      null,
                      f.createElement("span", null, "Description"),
                    ),
                n
                  ? null
                  : f.createElement(
                      "th",
                      null,
                      f.createElement("span", null, "Default"),
                    ),
                t
                  ? f.createElement(
                      "th",
                      null,
                      f.createElement(
                        hb,
                        null,
                        "Control",
                        " ",
                        !s &&
                          r &&
                          f.createElement(
                            pb,
                            { onClick: () => r(), title: "Reset controls" },
                            f.createElement(mo, { "aria-hidden": !0 }),
                          ),
                      ),
                    )
                  : null,
              ),
            ),
            f.createElement(
              "tbody",
              { className: "docblock-argstable-body" },
              h.ungrouped.map((w) =>
                f.createElement(Cn, {
                  key: w.key,
                  row: w,
                  arg: c && c[w.key],
                  ...S,
                }),
              ),
              Object.entries(h.ungroupedSubsections).map(([w, x]) =>
                f.createElement(
                  Ia,
                  { key: w, label: w, level: "subsection", colSpan: A },
                  x.map((C) =>
                    f.createElement(Cn, {
                      key: C.key,
                      row: C,
                      arg: c && c[C.key],
                      expandable: v,
                      ...S,
                    }),
                  ),
                ),
              ),
              Object.entries(h.sections).map(([w, x]) =>
                f.createElement(
                  Ia,
                  { key: w, label: w, level: "section", colSpan: A },
                  x.ungrouped.map((C) =>
                    f.createElement(Cn, {
                      key: C.key,
                      row: C,
                      arg: c && c[C.key],
                      ...S,
                    }),
                  ),
                  Object.entries(x.subsections).map(([C, k]) =>
                    f.createElement(
                      Ia,
                      { key: C, label: C, level: "subsection", colSpan: A },
                      k.map((F) =>
                        f.createElement(Cn, {
                          key: F.key,
                          row: F,
                          arg: c && c[F.key],
                          expandable: v,
                          ...S,
                        }),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      };
    R.div(({ theme: e }) => ({
      marginRight: 30,
      fontSize: `${e.typography.size.s1}px`,
      color:
        e.base === "light"
          ? ce(0.4, e.color.defaultText)
          : ce(0.6, e.color.defaultText),
    }));
    R.div({
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    });
    R.div({
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      "&:not(:last-child)": { marginBottom: "1rem" },
    });
    R.div(Gt, ({ theme: e }) => ({
      ...On(e),
      margin: "25px 0 40px",
      padding: "30px 20px",
    }));
    R.div(({ theme: e }) => ({
      fontWeight: e.typography.weight.bold,
      color: e.color.defaultText,
    }));
    R.div(({ theme: e }) => ({
      color:
        e.base === "light"
          ? ce(0.2, e.color.defaultText)
          : ce(0.6, e.color.defaultText),
    }));
    R.div({ flex: "0 0 30%", lineHeight: "20px", marginTop: 5 });
    R.div(({ theme: e }) => ({
      flex: 1,
      textAlign: "center",
      fontFamily: e.typography.fonts.mono,
      fontSize: e.typography.size.s1,
      lineHeight: 1,
      overflow: "hidden",
      color:
        e.base === "light"
          ? ce(0.4, e.color.defaultText)
          : ce(0.6, e.color.defaultText),
      "> div": {
        display: "inline-block",
        overflow: "hidden",
        maxWidth: "100%",
        textOverflow: "ellipsis",
      },
      span: { display: "block", marginTop: 2 },
    }));
    R.div({ display: "flex", flexDirection: "row" });
    R.div(({ background: e }) => ({
      position: "relative",
      flex: 1,
      "&::before": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: e,
        content: '""',
      },
    }));
    R.div(({ theme: e }) => ({
      ...On(e),
      display: "flex",
      flexDirection: "row",
      height: 50,
      marginBottom: 5,
      overflow: "hidden",
      backgroundColor: "white",
      backgroundImage:
        "repeating-linear-gradient(-45deg, #ccc, #ccc 1px, #fff 1px, #fff 16px)",
      backgroundClip: "padding-box",
    }));
    R.div({
      display: "flex",
      flexDirection: "column",
      flex: 1,
      position: "relative",
      marginBottom: 30,
    });
    R.div({ flex: 1, display: "flex", flexDirection: "row" });
    R.div({ display: "flex", alignItems: "flex-start" });
    R.div({ flex: "0 0 30%" });
    R.div({ flex: 1 });
    R.div(({ theme: e }) => ({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 20,
      fontWeight: e.typography.weight.bold,
      color:
        e.base === "light"
          ? ce(0.4, e.color.defaultText)
          : ce(0.6, e.color.defaultText),
    }));
    R.div(({ theme: e }) => ({
      fontSize: e.typography.size.s2,
      lineHeight: "20px",
      display: "flex",
      flexDirection: "column",
    }));
    R.div(({ theme: e }) => ({
      fontFamily: e.typography.fonts.base,
      fontSize: e.typography.size.s2,
      color: e.color.defaultText,
      marginLeft: 10,
      lineHeight: 1.2,
    }));
    R.div(({ theme: e }) => ({
      ...On(e),
      overflow: "hidden",
      height: 40,
      width: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none",
      "> img, > svg": { width: 20, height: 20 },
    }));
    R.div({
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      flex: "0 1 calc(20% - 10px)",
      minWidth: 120,
      margin: "0px 10px 30px 0",
    });
    R.div({ display: "flex", flexFlow: "row wrap" });
    globalThis &&
      globalThis.__DOCS_CONTEXT__ === void 0 &&
      ((globalThis.__DOCS_CONTEXT__ = gr(null)),
      (globalThis.__DOCS_CONTEXT__.displayName = "DocsContext"));
    var bb = globalThis ? globalThis.__DOCS_CONTEXT__ : gr(null),
      Eb = Object.create,
      Jd = Object.defineProperty,
      vb = Object.getOwnPropertyDescriptor,
      zd = Object.getOwnPropertyNames,
      Ab = Object.getPrototypeOf,
      Db = Object.prototype.hasOwnProperty,
      ze = (e, t) =>
        function () {
          return (
            t || (0, e[zd(e)[0]])((t = { exports: {} }).exports, t), t.exports
          );
        },
      Sb = (e, t, r, n) => {
        if ((t && typeof t == "object") || typeof t == "function")
          for (let o of zd(t))
            !Db.call(e, o) &&
              o !== r &&
              Jd(e, o, {
                get: () => t[o],
                enumerable: !(n = vb(t, o)) || n.enumerable,
              });
        return e;
      },
      Ha = (e, t, r) => (
        (r = e != null ? Eb(Ab(e)) : {}),
        Sb(
          t || !e || !e.__esModule
            ? Jd(r, "default", { value: e, enumerable: !0 })
            : r,
          e,
        )
      ),
      wb = zt(id(), 1),
      Hd = ze({
        "node_modules/has-symbols/shams.js"(e, t) {
          t.exports = function () {
            if (
              typeof Symbol != "function" ||
              typeof Object.getOwnPropertySymbols != "function"
            )
              return !1;
            if (typeof Symbol.iterator == "symbol") return !0;
            var r = {},
              n = Symbol("test"),
              o = Object(n);
            if (
              typeof n == "string" ||
              Object.prototype.toString.call(n) !== "[object Symbol]" ||
              Object.prototype.toString.call(o) !== "[object Symbol]"
            )
              return !1;
            var a = 42;
            r[n] = a;
            for (n in r) return !1;
            if (
              (typeof Object.keys == "function" &&
                Object.keys(r).length !== 0) ||
              (typeof Object.getOwnPropertyNames == "function" &&
                Object.getOwnPropertyNames(r).length !== 0)
            )
              return !1;
            var i = Object.getOwnPropertySymbols(r);
            if (
              i.length !== 1 ||
              i[0] !== n ||
              !Object.prototype.propertyIsEnumerable.call(r, n)
            )
              return !1;
            if (typeof Object.getOwnPropertyDescriptor == "function") {
              var s = Object.getOwnPropertyDescriptor(r, n);
              if (s.value !== a || s.enumerable !== !0) return !1;
            }
            return !0;
          };
        },
      }),
      Gd = ze({
        "node_modules/has-symbols/index.js"(e, t) {
          var r = typeof Symbol < "u" && Symbol,
            n = Hd();
          t.exports = function () {
            return typeof r != "function" ||
              typeof Symbol != "function" ||
              typeof r("foo") != "symbol" ||
              typeof Symbol("bar") != "symbol"
              ? !1
              : n();
          };
        },
      }),
      Cb = ze({
        "node_modules/function-bind/implementation.js"(e, t) {
          var r = "Function.prototype.bind called on incompatible ",
            n = Array.prototype.slice,
            o = Object.prototype.toString,
            a = "[object Function]";
          t.exports = function (i) {
            var s = this;
            if (typeof s != "function" || o.call(s) !== a)
              throw new TypeError(r + s);
            for (
              var l = n.call(arguments, 1),
                c,
                p = function () {
                  if (this instanceof c) {
                    var A = s.apply(this, l.concat(n.call(arguments)));
                    return Object(A) === A ? A : this;
                  } else return s.apply(i, l.concat(n.call(arguments)));
                },
                h = Math.max(0, s.length - l.length),
                d = [],
                y = 0;
              y < h;
              y++
            )
              d.push("$" + y);
            if (
              ((c = Function(
                "binder",
                "return function (" +
                  d.join(",") +
                  "){ return binder.apply(this,arguments); }",
              )(p)),
              s.prototype)
            ) {
              var g = function () {};
              (g.prototype = s.prototype),
                (c.prototype = new g()),
                (g.prototype = null);
            }
            return c;
          };
        },
      }),
      Ga = ze({
        "node_modules/function-bind/index.js"(e, t) {
          var r = Cb();
          t.exports = Function.prototype.bind || r;
        },
      }),
      xb = ze({
        "node_modules/has/src/index.js"(e, t) {
          var r = Ga();
          t.exports = r.call(Function.call, Object.prototype.hasOwnProperty);
        },
      }),
      Wd = ze({
        "node_modules/get-intrinsic/index.js"(e, t) {
          var r,
            n = SyntaxError,
            o = Function,
            a = TypeError,
            i = function (L) {
              try {
                return o('"use strict"; return (' + L + ").constructor;")();
              } catch {}
            },
            s = Object.getOwnPropertyDescriptor;
          if (s)
            try {
              s({}, "");
            } catch {
              s = null;
            }
          var l = function () {
              throw new a();
            },
            c = s
              ? (function () {
                  try {
                    return arguments.callee, l;
                  } catch {
                    try {
                      return s(arguments, "callee").get;
                    } catch {
                      return l;
                    }
                  }
                })()
              : l,
            p = Gd()(),
            h =
              Object.getPrototypeOf ||
              function (L) {
                return L.__proto__;
              },
            d = {},
            y = typeof Uint8Array > "u" ? r : h(Uint8Array),
            g = {
              "%AggregateError%":
                typeof AggregateError > "u" ? r : AggregateError,
              "%Array%": Array,
              "%ArrayBuffer%": typeof ArrayBuffer > "u" ? r : ArrayBuffer,
              "%ArrayIteratorPrototype%": p ? h([][Symbol.iterator]()) : r,
              "%AsyncFromSyncIteratorPrototype%": r,
              "%AsyncFunction%": d,
              "%AsyncGenerator%": d,
              "%AsyncGeneratorFunction%": d,
              "%AsyncIteratorPrototype%": d,
              "%Atomics%": typeof Atomics > "u" ? r : Atomics,
              "%BigInt%": typeof BigInt > "u" ? r : BigInt,
              "%Boolean%": Boolean,
              "%DataView%": typeof DataView > "u" ? r : DataView,
              "%Date%": Date,
              "%decodeURI%": decodeURI,
              "%decodeURIComponent%": decodeURIComponent,
              "%encodeURI%": encodeURI,
              "%encodeURIComponent%": encodeURIComponent,
              "%Error%": Error,
              "%eval%": eval,
              "%EvalError%": EvalError,
              "%Float32Array%": typeof Float32Array > "u" ? r : Float32Array,
              "%Float64Array%": typeof Float64Array > "u" ? r : Float64Array,
              "%FinalizationRegistry%":
                typeof FinalizationRegistry > "u" ? r : FinalizationRegistry,
              "%Function%": o,
              "%GeneratorFunction%": d,
              "%Int8Array%": typeof Int8Array > "u" ? r : Int8Array,
              "%Int16Array%": typeof Int16Array > "u" ? r : Int16Array,
              "%Int32Array%": typeof Int32Array > "u" ? r : Int32Array,
              "%isFinite%": isFinite,
              "%isNaN%": isNaN,
              "%IteratorPrototype%": p ? h(h([][Symbol.iterator]())) : r,
              "%JSON%": typeof JSON == "object" ? JSON : r,
              "%Map%": typeof Map > "u" ? r : Map,
              "%MapIteratorPrototype%":
                typeof Map > "u" || !p ? r : h(new Map()[Symbol.iterator]()),
              "%Math%": Math,
              "%Number%": Number,
              "%Object%": Object,
              "%parseFloat%": parseFloat,
              "%parseInt%": parseInt,
              "%Promise%": typeof Promise > "u" ? r : Promise,
              "%Proxy%": typeof Proxy > "u" ? r : Proxy,
              "%RangeError%": RangeError,
              "%ReferenceError%": ReferenceError,
              "%Reflect%": typeof Reflect > "u" ? r : Reflect,
              "%RegExp%": RegExp,
              "%Set%": typeof Set > "u" ? r : Set,
              "%SetIteratorPrototype%":
                typeof Set > "u" || !p ? r : h(new Set()[Symbol.iterator]()),
              "%SharedArrayBuffer%":
                typeof SharedArrayBuffer > "u" ? r : SharedArrayBuffer,
              "%String%": String,
              "%StringIteratorPrototype%": p ? h(""[Symbol.iterator]()) : r,
              "%Symbol%": p ? Symbol : r,
              "%SyntaxError%": n,
              "%ThrowTypeError%": c,
              "%TypedArray%": y,
              "%TypeError%": a,
              "%Uint8Array%": typeof Uint8Array > "u" ? r : Uint8Array,
              "%Uint8ClampedArray%":
                typeof Uint8ClampedArray > "u" ? r : Uint8ClampedArray,
              "%Uint16Array%": typeof Uint16Array > "u" ? r : Uint16Array,
              "%Uint32Array%": typeof Uint32Array > "u" ? r : Uint32Array,
              "%URIError%": URIError,
              "%WeakMap%": typeof WeakMap > "u" ? r : WeakMap,
              "%WeakRef%": typeof WeakRef > "u" ? r : WeakRef,
              "%WeakSet%": typeof WeakSet > "u" ? r : WeakSet,
            },
            A = function L(z) {
              var D;
              if (z === "%AsyncFunction%") D = i("async function () {}");
              else if (z === "%GeneratorFunction%") D = i("function* () {}");
              else if (z === "%AsyncGeneratorFunction%")
                D = i("async function* () {}");
              else if (z === "%AsyncGenerator%") {
                var T = L("%AsyncGeneratorFunction%");
                T && (D = T.prototype);
              } else if (z === "%AsyncIteratorPrototype%") {
                var O = L("%AsyncGenerator%");
                O && (D = h(O.prototype));
              }
              return (g[z] = D), D;
            },
            v = {
              "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
              "%ArrayPrototype%": ["Array", "prototype"],
              "%ArrayProto_entries%": ["Array", "prototype", "entries"],
              "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
              "%ArrayProto_keys%": ["Array", "prototype", "keys"],
              "%ArrayProto_values%": ["Array", "prototype", "values"],
              "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
              "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
              "%AsyncGeneratorPrototype%": [
                "AsyncGeneratorFunction",
                "prototype",
                "prototype",
              ],
              "%BooleanPrototype%": ["Boolean", "prototype"],
              "%DataViewPrototype%": ["DataView", "prototype"],
              "%DatePrototype%": ["Date", "prototype"],
              "%ErrorPrototype%": ["Error", "prototype"],
              "%EvalErrorPrototype%": ["EvalError", "prototype"],
              "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
              "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
              "%FunctionPrototype%": ["Function", "prototype"],
              "%Generator%": ["GeneratorFunction", "prototype"],
              "%GeneratorPrototype%": [
                "GeneratorFunction",
                "prototype",
                "prototype",
              ],
              "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
              "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
              "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
              "%JSONParse%": ["JSON", "parse"],
              "%JSONStringify%": ["JSON", "stringify"],
              "%MapPrototype%": ["Map", "prototype"],
              "%NumberPrototype%": ["Number", "prototype"],
              "%ObjectPrototype%": ["Object", "prototype"],
              "%ObjProto_toString%": ["Object", "prototype", "toString"],
              "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
              "%PromisePrototype%": ["Promise", "prototype"],
              "%PromiseProto_then%": ["Promise", "prototype", "then"],
              "%Promise_all%": ["Promise", "all"],
              "%Promise_reject%": ["Promise", "reject"],
              "%Promise_resolve%": ["Promise", "resolve"],
              "%RangeErrorPrototype%": ["RangeError", "prototype"],
              "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
              "%RegExpPrototype%": ["RegExp", "prototype"],
              "%SetPrototype%": ["Set", "prototype"],
              "%SharedArrayBufferPrototype%": [
                "SharedArrayBuffer",
                "prototype",
              ],
              "%StringPrototype%": ["String", "prototype"],
              "%SymbolPrototype%": ["Symbol", "prototype"],
              "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
              "%TypedArrayPrototype%": ["TypedArray", "prototype"],
              "%TypeErrorPrototype%": ["TypeError", "prototype"],
              "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
              "%Uint8ClampedArrayPrototype%": [
                "Uint8ClampedArray",
                "prototype",
              ],
              "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
              "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
              "%URIErrorPrototype%": ["URIError", "prototype"],
              "%WeakMapPrototype%": ["WeakMap", "prototype"],
              "%WeakSetPrototype%": ["WeakSet", "prototype"],
            },
            S = Ga(),
            w = xb(),
            x = S.call(Function.call, Array.prototype.concat),
            C = S.call(Function.apply, Array.prototype.splice),
            k = S.call(Function.call, String.prototype.replace),
            F = S.call(Function.call, String.prototype.slice),
            _ = S.call(Function.call, RegExp.prototype.exec),
            j =
              /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
            M = /\\(\\)?/g,
            P = function (L) {
              var z = F(L, 0, 1),
                D = F(L, -1);
              if (z === "%" && D !== "%")
                throw new n("invalid intrinsic syntax, expected closing `%`");
              if (D === "%" && z !== "%")
                throw new n("invalid intrinsic syntax, expected opening `%`");
              var T = [];
              return (
                k(L, j, function (O, U, $, X) {
                  T[T.length] = $ ? k(X, M, "$1") : U || O;
                }),
                T
              );
            },
            W = function (L, z) {
              var D = L,
                T;
              if ((w(v, D) && ((T = v[D]), (D = "%" + T[0] + "%")), w(g, D))) {
                var O = g[D];
                if ((O === d && (O = A(D)), typeof O > "u" && !z))
                  throw new a(
                    "intrinsic " +
                      L +
                      " exists, but is not available. Please file an issue!",
                  );
                return { alias: T, name: D, value: O };
              }
              throw new n("intrinsic " + L + " does not exist!");
            };
          t.exports = function (L, z) {
            if (typeof L != "string" || L.length === 0)
              throw new a("intrinsic name must be a non-empty string");
            if (arguments.length > 1 && typeof z != "boolean")
              throw new a('"allowMissing" argument must be a boolean');
            if (_(/^%?[^%]*%?$/, L) === null)
              throw new n(
                "`%` may not be present anywhere but at the beginning and end of the intrinsic name",
              );
            var D = P(L),
              T = D.length > 0 ? D[0] : "",
              O = W("%" + T + "%", z),
              U = O.name,
              $ = O.value,
              X = !1,
              se = O.alias;
            se && ((T = se[0]), C(D, x([0, 1], se)));
            for (var te = 1, Q = !0; te < D.length; te += 1) {
              var re = D[te],
                ve = F(re, 0, 1),
                de = F(re, -1);
              if (
                (ve === '"' ||
                  ve === "'" ||
                  ve === "`" ||
                  de === '"' ||
                  de === "'" ||
                  de === "`") &&
                ve !== de
              )
                throw new n(
                  "property names with quotes must have matching quotes",
                );
              if (
                ((re === "constructor" || !Q) && (X = !0),
                (T += "." + re),
                (U = "%" + T + "%"),
                w(g, U))
              )
                $ = g[U];
              else if ($ != null) {
                if (!(re in $)) {
                  if (!z)
                    throw new a(
                      "base intrinsic for " +
                        L +
                        " exists, but the property is not available.",
                    );
                  return;
                }
                if (s && te + 1 >= D.length) {
                  var Fe = s($, re);
                  (Q = !!Fe),
                    Q && "get" in Fe && !("originalValue" in Fe.get)
                      ? ($ = Fe.get)
                      : ($ = $[re]);
                } else (Q = w($, re)), ($ = $[re]);
                Q && !X && (g[U] = $);
              }
            }
            return $;
          };
        },
      }),
      Tb = ze({
        "node_modules/call-bind/index.js"(e, t) {
          var r = Ga(),
            n = Wd(),
            o = n("%Function.prototype.apply%"),
            a = n("%Function.prototype.call%"),
            i = n("%Reflect.apply%", !0) || r.call(a, o),
            s = n("%Object.getOwnPropertyDescriptor%", !0),
            l = n("%Object.defineProperty%", !0),
            c = n("%Math.max%");
          if (l)
            try {
              l({}, "a", { value: 1 });
            } catch {
              l = null;
            }
          t.exports = function (h) {
            var d = i(r, a, arguments);
            if (s && l) {
              var y = s(d, "length");
              y.configurable &&
                l(d, "length", {
                  value: 1 + c(0, h.length - (arguments.length - 1)),
                });
            }
            return d;
          };
          var p = function () {
            return i(r, o, arguments);
          };
          l ? l(t.exports, "apply", { value: p }) : (t.exports.apply = p);
        },
      }),
      Fb = ze({
        "node_modules/call-bind/callBound.js"(e, t) {
          var r = Wd(),
            n = Tb(),
            o = n(r("String.prototype.indexOf"));
          t.exports = function (a, i) {
            var s = r(a, !!i);
            return typeof s == "function" && o(a, ".prototype.") > -1
              ? n(s)
              : s;
          };
        },
      }),
      Ib = ze({
        "node_modules/has-tostringtag/shams.js"(e, t) {
          var r = Hd();
          t.exports = function () {
            return r() && !!Symbol.toStringTag;
          };
        },
      }),
      kb = ze({
        "node_modules/is-regex/index.js"(e, t) {
          var r = Fb(),
            n = Ib()(),
            o,
            a,
            i,
            s;
          n &&
            ((o = r("Object.prototype.hasOwnProperty")),
            (a = r("RegExp.prototype.exec")),
            (i = {}),
            (l = function () {
              throw i;
            }),
            (s = { toString: l, valueOf: l }),
            typeof Symbol.toPrimitive == "symbol" &&
              (s[Symbol.toPrimitive] = l));
          var l,
            c = r("Object.prototype.toString"),
            p = Object.getOwnPropertyDescriptor,
            h = "[object RegExp]";
          t.exports = n
            ? function (d) {
                if (!d || typeof d != "object") return !1;
                var y = p(d, "lastIndex"),
                  g = y && o(y, "value");
                if (!g) return !1;
                try {
                  a(d, s);
                } catch (A) {
                  return A === i;
                }
              }
            : function (d) {
                return !d || (typeof d != "object" && typeof d != "function")
                  ? !1
                  : c(d) === h;
              };
        },
      }),
      Rb = ze({
        "node_modules/is-function/index.js"(e, t) {
          t.exports = n;
          var r = Object.prototype.toString;
          function n(o) {
            if (!o) return !1;
            var a = r.call(o);
            return (
              a === "[object Function]" ||
              (typeof o == "function" && a !== "[object RegExp]") ||
              (typeof window < "u" &&
                (o === window.setTimeout ||
                  o === window.alert ||
                  o === window.confirm ||
                  o === window.prompt))
            );
          }
        },
      }),
      Ob = ze({
        "node_modules/is-symbol/index.js"(e, t) {
          var r = Object.prototype.toString,
            n = Gd()();
          n
            ? ((o = Symbol.prototype.toString),
              (a = /^Symbol\(.*\)$/),
              (i = function (s) {
                return typeof s.valueOf() != "symbol" ? !1 : a.test(o.call(s));
              }),
              (t.exports = function (s) {
                if (typeof s == "symbol") return !0;
                if (r.call(s) !== "[object Symbol]") return !1;
                try {
                  return i(s);
                } catch {
                  return !1;
                }
              }))
            : (t.exports = function (s) {
                return !1;
              });
          var o, a, i;
        },
      });
    Ha(kb());
    Ha(Rb());
    Ha(Ob());
    var _b =
        typeof window == "object" &&
        window &&
        window.Object === Object &&
        window,
      Bb = _b,
      Pb = typeof self == "object" && self && self.Object === Object && self,
      Nb = Bb || Pb || Function("return this")(),
      Wa = Nb,
      jb = Wa.Symbol,
      sr = jb,
      Kd = Object.prototype,
      Lb = Kd.hasOwnProperty,
      Mb = Kd.toString,
      Rr = sr ? sr.toStringTag : void 0;
    function Ub(e) {
      var t = Lb.call(e, Rr),
        r = e[Rr];
      try {
        e[Rr] = void 0;
        var n = !0;
      } catch {}
      var o = Mb.call(e);
      return n && (t ? (e[Rr] = r) : delete e[Rr]), o;
    }
    var $b = Ub,
      qb = Object.prototype,
      Vb = qb.toString;
    function Jb(e) {
      return Vb.call(e);
    }
    var zb = Jb,
      Hb = "[object Null]",
      Gb = "[object Undefined]",
      Zc = sr ? sr.toStringTag : void 0;
    function Wb(e) {
      return e == null
        ? e === void 0
          ? Gb
          : Hb
        : Zc && Zc in Object(e)
          ? $b(e)
          : zb(e);
    }
    var Kb = Wb,
      ed = sr ? sr.prototype : void 0;
    ed && ed.toString;
    function Yb(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    var Yd = Yb,
      Xb = "[object AsyncFunction]",
      Qb = "[object Function]",
      Zb = "[object GeneratorFunction]",
      eE = "[object Proxy]";
    function tE(e) {
      if (!Yd(e)) return !1;
      var t = Kb(e);
      return t == Qb || t == Zb || t == Xb || t == eE;
    }
    var rE = tE,
      nE = Wa["__core-js_shared__"],
      ka = nE,
      td = (function () {
        var e = /[^.]+$/.exec((ka && ka.keys && ka.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function oE(e) {
      return !!td && td in e;
    }
    var aE = oE,
      iE = Function.prototype,
      sE = iE.toString;
    function lE(e) {
      if (e != null) {
        try {
          return sE.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    var uE = lE,
      cE = /[\\^$.*+?()[\]{}|]/g,
      dE = /^\[object .+?Constructor\]$/,
      pE = Function.prototype,
      hE = Object.prototype,
      fE = pE.toString,
      mE = hE.hasOwnProperty,
      yE = RegExp(
        "^" +
          fE
            .call(mE)
            .replace(cE, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?",
            ) +
          "$",
      );
    function gE(e) {
      if (!Yd(e) || aE(e)) return !1;
      var t = rE(e) ? yE : dE;
      return t.test(uE(e));
    }
    var bE = gE;
    function EE(e, t) {
      return e?.[t];
    }
    var vE = EE;
    function AE(e, t) {
      var r = vE(e, t);
      return bE(r) ? r : void 0;
    }
    var Xd = AE;
    function DE(e, t) {
      return e === t || (e !== e && t !== t);
    }
    var SE = DE,
      wE = Xd(Object, "create"),
      Br = wE;
    function CE() {
      (this.__data__ = Br ? Br(null) : {}), (this.size = 0);
    }
    var xE = CE;
    function TE(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    var FE = TE,
      IE = "__lodash_hash_undefined__",
      kE = Object.prototype,
      RE = kE.hasOwnProperty;
    function OE(e) {
      var t = this.__data__;
      if (Br) {
        var r = t[e];
        return r === IE ? void 0 : r;
      }
      return RE.call(t, e) ? t[e] : void 0;
    }
    var _E = OE,
      BE = Object.prototype,
      PE = BE.hasOwnProperty;
    function NE(e) {
      var t = this.__data__;
      return Br ? t[e] !== void 0 : PE.call(t, e);
    }
    var jE = NE,
      LE = "__lodash_hash_undefined__";
    function ME(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = Br && t === void 0 ? LE : t),
        this
      );
    }
    var UE = ME;
    function lr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    lr.prototype.clear = xE;
    lr.prototype.delete = FE;
    lr.prototype.get = _E;
    lr.prototype.has = jE;
    lr.prototype.set = UE;
    var rd = lr;
    function $E() {
      (this.__data__ = []), (this.size = 0);
    }
    var qE = $E;
    function VE(e, t) {
      for (var r = e.length; r--; ) if (SE(e[r][0], t)) return r;
      return -1;
    }
    var Pn = VE,
      JE = Array.prototype,
      zE = JE.splice;
    function HE(e) {
      var t = this.__data__,
        r = Pn(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : zE.call(t, r, 1), --this.size, !0;
    }
    var GE = HE;
    function WE(e) {
      var t = this.__data__,
        r = Pn(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    var KE = WE;
    function YE(e) {
      return Pn(this.__data__, e) > -1;
    }
    var XE = YE;
    function QE(e, t) {
      var r = this.__data__,
        n = Pn(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    var ZE = QE;
    function ur(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    ur.prototype.clear = qE;
    ur.prototype.delete = GE;
    ur.prototype.get = KE;
    ur.prototype.has = XE;
    ur.prototype.set = ZE;
    var ev = ur,
      tv = Xd(Wa, "Map"),
      rv = tv;
    function nv() {
      (this.size = 0),
        (this.__data__ = {
          hash: new rd(),
          map: new (rv || ev)(),
          string: new rd(),
        });
    }
    var ov = nv;
    function av(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    var iv = av;
    function sv(e, t) {
      var r = e.__data__;
      return iv(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    var Nn = sv;
    function lv(e) {
      var t = Nn(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    var uv = lv;
    function cv(e) {
      return Nn(this, e).get(e);
    }
    var dv = cv;
    function pv(e) {
      return Nn(this, e).has(e);
    }
    var hv = pv;
    function fv(e, t) {
      var r = Nn(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    var mv = fv;
    function cr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    cr.prototype.clear = ov;
    cr.prototype.delete = uv;
    cr.prototype.get = dv;
    cr.prototype.has = hv;
    cr.prototype.set = mv;
    var Qd = cr,
      yv = "Expected a function";
    function Ka(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(yv);
      var r = function () {
        var n = arguments,
          o = t ? t.apply(this, n) : n[0],
          a = r.cache;
        if (a.has(o)) return a.get(o);
        var i = e.apply(this, n);
        return (r.cache = a.set(o, i) || a), i;
      };
      return (r.cache = new (Ka.Cache || Qd)()), r;
    }
    Ka.Cache = Qd;
    var gv = Ka,
      bv = 500;
    function Ev(e) {
      var t = gv(e, function (n) {
          return r.size === bv && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    var vv = Ev,
      Av =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      Dv = /\\(\\)?/g;
    vv(function (e) {
      var t = [];
      return (
        e.charCodeAt(0) === 46 && t.push(""),
        e.replace(Av, function (r, n, o, a) {
          t.push(o ? a.replace(Dv, "$1") : n || r);
        }),
        t
      );
    });
    var Sv = (e) => {
      let t = null,
        r = !1,
        n = !1,
        o = !1,
        a = "";
      if (e.indexOf("//") >= 0 || e.indexOf("/*") >= 0)
        for (let i = 0; i < e.length; i += 1)
          !t && !r && !n && !o
            ? e[i] === '"' || e[i] === "'" || e[i] === "`"
              ? (t = e[i])
              : e[i] === "/" && e[i + 1] === "*"
                ? (r = !0)
                : e[i] === "/" && e[i + 1] === "/"
                  ? (n = !0)
                  : e[i] === "/" && e[i + 1] !== "/" && (o = !0)
            : (t &&
                ((e[i] === t && e[i - 1] !== "\\") ||
                  (e[i] ===
                    `
` &&
                    t !== "`")) &&
                (t = null),
              o &&
                ((e[i] === "/" && e[i - 1] !== "\\") ||
                  e[i] ===
                    `
`) &&
                (o = !1),
              r && e[i - 1] === "/" && e[i - 2] === "*" && (r = !1),
              n &&
                e[i] ===
                  `
` &&
                (n = !1)),
            !r && !n && (a += e[i]);
      else a = e;
      return a;
    };
    (0, wb.default)(1e4)((e) => Sv(e).replace(/\n\s*/g, "").trim());
    gr({ sources: {} });
    var { document: wv } = globalThis;
    function Cv(e, t) {
      e.channel.emit(Di, t);
    }
    Zn.a;
    var Zd = ["h1", "h2", "h3", "h4", "h5", "h6"],
      xv = Zd.reduce(
        (e, t) => ({
          ...e,
          [t]: R(t)({
            "& svg": {
              position: "relative",
              top: "-0.1em",
              visibility: "hidden",
            },
            "&:hover svg": { visibility: "visible" },
          }),
        }),
        {},
      ),
      Tv = R.a(() => ({
        float: "left",
        lineHeight: "inherit",
        paddingRight: "10px",
        marginLeft: "-24px",
        color: "inherit",
      })),
      Fv = ({ as: e, id: t, children: r, ...n }) => {
        let o = mi(bb),
          a = xv[e],
          i = `#${t}`;
        return f.createElement(
          a,
          { id: t, ...n },
          f.createElement(
            Tv,
            {
              "aria-hidden": "true",
              href: i,
              tabIndex: -1,
              target: "_self",
              onClick: (s) => {
                wv.getElementById(t) && Cv(o, i);
              },
            },
            f.createElement(es, null),
          ),
          r,
        );
      },
      ep = (e) => {
        let { as: t, id: r, children: n, ...o } = e;
        if (r) return f.createElement(Fv, { as: t, id: r, ...o }, n);
        let a = t,
          { as: i, ...s } = e;
        return f.createElement(a, { ...eo(s, t) });
      };
    Zd.reduce(
      (e, t) => ({ ...e, [t]: (r) => f.createElement(ep, { as: t, ...r }) }),
      {},
    );
    var Iv = ((e) => (
      (e.INFO = "info"),
      (e.NOTES = "notes"),
      (e.DOCGEN = "docgen"),
      (e.AUTO = "auto"),
      e
    ))(Iv || {});
    zt(Sg());
    R.div(({ theme: e }) => ({
      width: "10rem",
      "@media (max-width: 768px)": { display: "none" },
    }));
    R.div(({ theme: e }) => ({
      position: "fixed",
      bottom: 0,
      top: 0,
      width: "10rem",
      paddingTop: "4rem",
      paddingBottom: "2rem",
      overflowY: "auto",
      fontFamily: e.typography.fonts.base,
      fontSize: e.typography.size.s2,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
      WebkitOverflowScrolling: "touch",
      "& *": { boxSizing: "border-box" },
      "& > .toc-wrapper > .toc-list": {
        paddingLeft: 0,
        borderLeft: `solid 2px ${e.color.mediumlight}`,
        ".toc-list": {
          paddingLeft: 0,
          borderLeft: `solid 2px ${e.color.mediumlight}`,
          ".toc-list": {
            paddingLeft: 0,
            borderLeft: `solid 2px ${e.color.mediumlight}`,
          },
        },
      },
      "& .toc-list-item": {
        position: "relative",
        listStyleType: "none",
        marginLeft: 20,
        paddingTop: 3,
        paddingBottom: 3,
      },
      "& .toc-list-item::before": {
        content: '""',
        position: "absolute",
        height: "100%",
        top: 0,
        left: 0,
        transform: "translateX(calc(-2px - 20px))",
        borderLeft: `solid 2px ${e.color.mediumdark}`,
        opacity: 0,
        transition: "opacity 0.2s",
      },
      "& .toc-list-item.is-active-li::before": { opacity: 1 },
      "& .toc-list-item > a": {
        color: e.color.defaultText,
        textDecoration: "none",
      },
      "& .toc-list-item.is-active-li > a": {
        fontWeight: 600,
        color: e.color.secondary,
        textDecoration: "none",
      },
    }));
    R.p(({ theme: e }) => ({
      fontWeight: 600,
      fontSize: "0.875em",
      color: e.textColor,
      textTransform: "uppercase",
      marginBottom: 10,
    }));
    var kv =
        /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g,
      Rv = Object.hasOwnProperty,
      Ov = class {
        constructor() {
          this.occurrences, this.reset();
        }
        slug(e, t) {
          let r = this,
            n = _v(e, t === !0),
            o = n;
          for (; Rv.call(r.occurrences, n); )
            r.occurrences[o]++, (n = o + "-" + r.occurrences[o]);
          return (r.occurrences[n] = 0), n;
        }
        reset() {
          this.occurrences = Object.create(null);
        }
      };
    function _v(e, t) {
      return typeof e != "string"
        ? ""
        : (t || (e = e.toLowerCase()), e.replace(kv, "").replace(/ /g, "-"));
    }
    var Bv = new Ov(),
      Pv = ({ children: e, disableAnchor: t, ...r }) => {
        if (t || typeof e != "string") return f.createElement(Wn, null, e);
        let n = Bv.slug(e.toLowerCase());
        return f.createElement(ep, { as: "h2", id: n, ...r }, e);
      };
    R(Pv)(({ theme: e }) => ({
      fontSize: `${e.typography.size.s2 - 1}px`,
      fontWeight: e.typography.weight.bold,
      lineHeight: "16px",
      letterSpacing: "0.35em",
      textTransform: "uppercase",
      color: e.textMutedColor,
      border: 0,
      marginBottom: "12px",
      "&:first-of-type": { marginTop: "56px" },
    }));
    var Nv = lo({
        from: { transform: "translateY(40px)" },
        to: { transform: "translateY(0)" },
      }),
      jv = lo({ from: { background: "var(--highlight-bg-color)" }, to: {} }),
      Lv = R.div({
        containerType: "size",
        position: "sticky",
        bottom: 0,
        height: 39,
        overflow: "hidden",
        zIndex: 1,
      }),
      Mv = R(zn)(({ theme: e }) => ({
        "--highlight-bg-color": e.base === "dark" ? "#153B5B" : "#E0F0FF",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 6,
        padding: "6px 10px",
        animation: `${Nv} 300ms, ${jv} 2s`,
        background: e.background.bar,
        borderTop: `1px solid ${e.appBorderColor}`,
        fontSize: e.typography.size.s2,
        "@container (max-width: 799px)": {
          flexDirection: "row",
          justifyContent: "flex-end",
        },
      })),
      Uv = R.div({
        display: "flex",
        flex: "99 0 auto",
        alignItems: "center",
        marginLeft: 10,
        gap: 6,
      }),
      $v = R.div(({ theme: e }) => ({
        display: "flex",
        flex: "1 0 0",
        alignItems: "center",
        gap: 2,
        color: e.color.mediumdark,
        fontSize: e.typography.size.s2,
      })),
      Ra = R.div({
        "@container (max-width: 799px)": {
          lineHeight: 0,
          textIndent: "-9999px",
          "&::after": {
            content: "attr(data-short-label)",
            display: "block",
            lineHeight: "initial",
            textIndent: "0",
          },
        },
      }),
      qv = R(Ge.Input)(({ theme: e }) => ({
        "::placeholder": { color: e.color.mediumdark },
        "&:invalid:not(:placeholder-shown)": {
          boxShadow: `${e.color.negative} 0 0 0 1px inset`,
        },
      })),
      Vv = ({ saveStory: e, createStory: t, resetArgs: r }) => {
        let n = f.useRef(null),
          [o, a] = f.useState(!1),
          [i, s] = f.useState(!1),
          [l, c] = f.useState(""),
          [p, h] = f.useState(null),
          d = async () => {
            o || (a(!0), await e().catch(() => {}), a(!1));
          },
          y = () => {
            s(!0), c(""), setTimeout(() => n.current?.focus(), 0);
          },
          g = (A) => {
            let v = A.target.value
              .replace(/^[^a-z]/i, "")
              .replace(/[^a-z0-9-_ ]/gi, "")
              .replaceAll(/([-_ ]+[a-z0-9])/gi, (S) =>
                S.toUpperCase().replace(/[-_ ]/g, ""),
              );
            c(v.charAt(0).toUpperCase() + v.slice(1));
          };
        return f.createElement(
          Lv,
          { id: "save-from-controls" },
          f.createElement(
            Mv,
            null,
            f.createElement(
              $v,
              null,
              f.createElement(
                ft,
                {
                  as: "div",
                  hasChrome: !1,
                  trigger: "hover",
                  tooltip: f.createElement(Tt, {
                    note: "Save changes to story",
                  }),
                },
                f.createElement(
                  Ke,
                  {
                    "aria-label": "Save changes to story",
                    disabled: o,
                    onClick: d,
                  },
                  f.createElement(Wi, null),
                  f.createElement(
                    Ra,
                    { "data-short-label": "Save" },
                    "Update story",
                  ),
                ),
              ),
              f.createElement(
                ft,
                {
                  as: "div",
                  hasChrome: !1,
                  trigger: "hover",
                  tooltip: f.createElement(Tt, {
                    note: "Create new story with these settings",
                  }),
                },
                f.createElement(
                  Ke,
                  {
                    "aria-label": "Create new story with these settings",
                    onClick: y,
                  },
                  f.createElement(ho, null),
                  f.createElement(
                    Ra,
                    { "data-short-label": "New" },
                    "Create new story",
                  ),
                ),
              ),
              f.createElement(
                ft,
                {
                  as: "div",
                  hasChrome: !1,
                  trigger: "hover",
                  tooltip: f.createElement(Tt, { note: "Reset changes" }),
                },
                f.createElement(
                  Ke,
                  { "aria-label": "Reset changes", onClick: () => r() },
                  f.createElement(mo, null),
                  f.createElement("span", null, "Reset"),
                ),
              ),
            ),
            f.createElement(
              Uv,
              null,
              f.createElement(
                Ra,
                { "data-short-label": "Unsaved changes" },
                "You modified this story. Do you want to save your changes?",
              ),
            ),
            f.createElement(
              Ye,
              { width: 350, open: i, onOpenChange: s },
              f.createElement(
                Ge,
                {
                  onSubmit: async (A) => {
                    if ((A.preventDefault(), !o))
                      try {
                        h(null),
                          a(!0),
                          await t(
                            l
                              .replace(/^[^a-z]/i, "")
                              .replaceAll(/[^a-z0-9]/gi, ""),
                          ),
                          s(!1),
                          a(!1);
                      } catch (v) {
                        h(v.message), a(!1);
                      }
                  },
                  id: "create-new-story-form",
                },
                f.createElement(
                  Ye.Content,
                  null,
                  f.createElement(
                    Ye.Header,
                    null,
                    f.createElement(Ye.Title, null, "Create new story"),
                    f.createElement(
                      Ye.Description,
                      null,
                      "This will add a new story to your existing stories file.",
                    ),
                  ),
                  f.createElement(qv, {
                    onChange: g,
                    placeholder: "Story export name",
                    readOnly: o,
                    ref: n,
                    value: l,
                  }),
                  f.createElement(
                    Ye.Actions,
                    null,
                    f.createElement(
                      ht,
                      {
                        disabled: o || !l,
                        size: "medium",
                        type: "submit",
                        variant: "solid",
                      },
                      "Create",
                    ),
                    f.createElement(
                      Ye.Dialog.Close,
                      { asChild: !0 },
                      f.createElement(
                        ht,
                        { disabled: o, size: "medium", type: "reset" },
                        "Cancel",
                      ),
                    ),
                  ),
                ),
              ),
              p && f.createElement(Ye.Error, null, p),
            ),
          ),
        );
      },
      nd = "addon-controls",
      tp = "controls",
      od = (e) =>
        Object.entries(e).reduce(
          (t, [r, n]) => (n !== void 0 ? Object.assign(t, { [r]: n }) : t),
          {},
        ),
      Jv = R.div({
        display: "grid",
        gridTemplateRows: "1fr 39px",
        height: "100%",
        maxHeight: "100vh",
        overflowY: "auto",
      }),
      zv = ({ saveStory: e, createStory: t }) => {
        let [r, n] = Z(!0),
          [o, a, i, s] = Mi(),
          [l] = Ui(),
          c = so(),
          {
            expanded: p,
            sort: h,
            presetColors: d,
            disableSaveFromUI: y = !1,
          } = $i(tp, {}),
          { path: g, previewInitialized: A } = qi();
        xe(() => {
          A && n(!1);
        }, [A]);
        let v = Object.values(c).some((x) => x?.control),
          S = Object.entries(c).reduce((x, [C, k]) => {
            let F = k?.control;
            return (
              typeof F != "object" || F?.type !== "color" || F?.presetColors
                ? (x[C] = k)
                : (x[C] = { ...k, control: { ...F, presetColors: d } }),
              x
            );
          }, {}),
          w = pt(() => !!o && !!s && !Ft(od(o), od(s)), [o, s]);
        return f.createElement(
          Jv,
          null,
          f.createElement(gb, {
            key: g,
            compact: !p && v,
            rows: S,
            args: o,
            globals: l,
            updateArgs: a,
            resetArgs: i,
            inAddonPanel: !0,
            sort: h,
            isLoading: r,
          }),
          v &&
            w &&
            dc.CONFIG_TYPE === "DEVELOPMENT" &&
            y !== !0 &&
            f.createElement(Vv, { resetArgs: i, saveStory: e, createStory: t }),
        );
      };
    function Hv() {
      let e = so(),
        t = Object.values(e).filter(
          (r) => r?.control && !r?.table?.disable,
        ).length;
      return f.createElement(
        "div",
        null,
        f.createElement(
          Yn,
          { col: 1 },
          f.createElement(
            "span",
            { style: { display: "inline-block", verticalAlign: "middle" } },
            "Controls",
          ),
          t === 0 ? "" : f.createElement(Jn, { status: "neutral" }, t),
        ),
      );
    }
    var ad = (e) =>
      JSON.stringify(e, (t, r) =>
        typeof r == "function" ? "__sb_empty_function_arg__" : r,
      );
    Wr.register(nd, (e) => {
      let t = Wr.getChannel(),
        r = async () => {
          let o = e.getCurrentStoryData();
          if (o.type !== "story") throw new Error("Not a story");
          try {
            let a = await io(t, no, zr, {
              args: ad(
                Object.entries(o.args || {}).reduce(
                  (i, [s, l]) => (Ft(l, o.initialArgs?.[s]) || (i[s] = l), i),
                  {},
                ),
              ),
              csfId: o.id,
              importPath: o.importPath,
            });
            e.addNotification({
              id: "save-story-success",
              icon: { name: "passed", color: Kr.positive },
              content: {
                headline: "Story saved",
                subHeadline: f.createElement(
                  f.Fragment,
                  null,
                  "Updated story ",
                  f.createElement("b", null, a.sourceStoryName),
                  ".",
                ),
              },
              duration: 8e3,
            });
          } catch (a) {
            throw (
              (e.addNotification({
                id: "save-story-error",
                icon: { name: "failed", color: Kr.negative },
                content: {
                  headline: "Failed to save story",
                  subHeadline:
                    a?.message ||
                    "Check the Storybook process on the command line for more details.",
                },
                duration: 8e3,
              }),
              a)
            );
          }
        },
        n = async (o) => {
          let a = e.getCurrentStoryData();
          if (a.type !== "story") throw new Error("Not a story");
          let i = await io(t, no, zr, {
            args: a.args && ad(a.args),
            csfId: a.id,
            importPath: a.importPath,
            name: o,
          });
          e.addNotification({
            id: "save-story-success",
            icon: { name: "passed", color: Kr.positive },
            content: {
              headline: "Story created",
              subHeadline: f.createElement(
                f.Fragment,
                null,
                "Added story ",
                f.createElement("b", null, i.newStoryName),
                " based on ",
                f.createElement("b", null, i.sourceStoryName),
                ".",
              ),
            },
            duration: 8e3,
            onClick: ({ onDismiss: s }) => {
              s(), e.selectStory(i.newStoryId);
            },
          });
        };
      Wr.add(nd, {
        title: Hv,
        type: Li.PANEL,
        paramKey: tp,
        render: ({ active: o }) =>
          !o || !e.getCurrentStoryData()
            ? null
            : f.createElement(
                Vn,
                { active: o },
                f.createElement(zv, { saveStory: r, createStory: n }),
              ),
      }),
        t.on(zr, (o) => {
          if (!o.success) return;
          let a = e.getCurrentStoryData();
          a.type === "story" &&
            (e.resetStoryArgs(a),
            o.payload.newStoryId && e.selectStory(o.payload.newStoryId));
        });
    });
  })();
} catch (e) {
  console.error(
    "[Storybook] One of your manager-entries failed: " + import.meta.url,
    e,
  );
}
