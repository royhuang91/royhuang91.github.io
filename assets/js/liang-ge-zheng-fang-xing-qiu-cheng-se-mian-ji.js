      var steps = [
        {
          tab: "1 看图",
          kicker: "第一步 · 先把图形看懂",
          title: "两个正方形，E 点是关键",
          body: "<p>左边正方形 ABCD 边长 4 cm，所以 <b>CD = 4 cm</b>；E 在底边 BC 上，EC = 3 cm。</p>" +
                "<p>斜放的大正方形边长 5 cm，它的左上边正好是 <b class='o'>DE</b>：一段 3、一段 4、斜边 5——" +
                "EC、CD、DE 组成一个 <b>3-4-5 直角三角形</b>，图形里的长度全对得上。</p>",
          formula: "EC = 3，CD = 4，DE = 5"
        },
        {
          tab: "2 拼图",
          kicker: "第二步 · 等积变形",
          title: "三块橙色，拼成一个大三角形",
          body: "<p>盯着橙色看：①②③ 三块被线段 DE 和 DC 切开，但把它们合起来看——" +
                "外轮廓正好是 <b class='o'>三角形 ADG</b>：上边 AD、右边 DG、下边一条直线 AG。</p>" +
                "<p>拼起来形状变了，<b>面积一分不少</b>。所以不用一块块算，只要算 △ADG 的面积就行。</p>",
          formula: "橙色面积 = △ADG 的面积"
        },
        {
          tab: "3 找高",
          kicker: "第三步 · 三角形缺一条高",
          title: "底有了，就差高",
          body: "<p>算三角形要“底 × 高 ÷ 2”。选 AD 做底：<b>AD = 4 cm</b>，现成的。</p>" +
                "<p>高是从 G 点到 AD 所在直线的距离。把 AD 向右延长到 H，再从 G 竖直向上画到 H——" +
                "这条 <b class='t'>HG</b> 就是高。可是 HG 有多长？图上没写，得想办法找出来。</p>",
          formula: "面积 = AD × HG ÷ 2，HG = ?"
        },
        {
          tab: "4 对位",
          kicker: "第四步 · 先说清：为什么一定能补上",
          title: "转过去能补上，靠三个“对得上”",
          body: "<p>先别急着转。旋转就是<b>钉住一个点，把整个三角形原样搬过去</b>——边长、角度都不变。" +
                "所以能不能补上，只看一件事：转完之后，<b>三个顶点能不能一个不多、一个不少地对上</b>。大正方形 DEGF 正好给了三个保证：</p>" +
                "<p><b class='t'>① 中心对得上：</b>△DEC 和要补的位置 △DHG 共用顶点 D。绕 D 转，D 点原地不动，天生对齐。</p>" +
                "<p><b class='t'>② 角度对得上：</b>DE 和 DG 是大正方形<b>相邻的两条边</b>，它俩的夹角 ∠EDG 正好是 <b>90°</b>" +
                "（看图上 D 点旁边的直角小方框）。所以绕 D 转 90°，边 DE 不多不少，正好转到 DG 的方向上——转 80° 会差一点，转 100° 会过头，90° 分毫不差。</p>" +
                "<p><b class='t'>③ 长度对得上：</b>DE 和 DG 都是大正方形的边，<b>DE = DG = 5 cm</b>" +
                "（图上两条边有同样的金色短划，那就是“等长”标记）。方向对上了，长度又一样，E 点转过去<b>正好落在 G 点</b>，不会短一截，也不会冲过头。</p>" +
                "<p>最后一个点 C：DC 跟着一起转 90°，竖着的边转成横着的，正好沿着 AD 的延长线，C 落在 H 点，DH = DC = 4 cm。" +
                "三个顶点 D→D、E→G、C→H 全部对上，剩下的第三条边 EC 自然严丝合缝地对上 HG——<b>没有缝，也没有多出来的部分</b>，这才叫“正好补上”。</p>",
          formula: "∠EDG = 90°，DE = DG ⇒ 转 90° 后 E 落 G、C 落 H"
        },
        {
          tab: "5 旋转",
          kicker: "第五步 · 旋转找高",
          title: "亲手转一遍，眼见为实",
          body: "<p>点黑板上的<b>“播放旋转”</b>，把黄色的小直角三角形 △DEC 绕点 D 转 90°：和上一步推的一模一样——" +
                "E 落到 G、C 落到 H，三角形严丝合缝地落在 △DHG 上。</p>" +
                "<p>旋转不改变任何长度，所以转过去的那条边就是我们要找的高：<b class='t'>HG = EC = 3 cm</b>——高找到了，就是题目给的那个 3！</p>",
          formula: "HG = EC = 3 cm"
        },
        {
          tab: "6 答案",
          kicker: "第六步 · 收尾计算",
          title: "底 4、高 3，算完",
          body: "<p>三角形 ADG：底 AD = 4 cm，高 HG = 3 cm。</p>" +
                "<p>整道题只用了两个动作：<b class='o'>拼</b>（三块拼成一个三角形）和 <b class='t'>转</b>（旋转 90° 找到高）。</p>",
          formula: "4 × 3 ÷ 2 = 6（cm²）"
        }
      ];

      var current = 0;
      var board = document.getElementById("board");
      var dotsEl = document.getElementById("dots");
      var kickerEl = document.getElementById("stepKicker");
      var titleEl = document.getElementById("stepTitle");
      var bodyEl = document.getElementById("stepBody");
      var formulaEl = document.getElementById("stepFormula");
      var bannerEl = document.getElementById("answerBanner");
      var prevBtn = document.getElementById("btnPrev");
      var nextBtn = document.getElementById("btnNext");
      var rotTri = document.getElementById("rotTri");
      var rotateBtn = document.getElementById("btnRotate");

      steps.forEach(function (s, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = s.tab;
        b.setAttribute("role", "tab");
        b.addEventListener("click", function () { goTo(i); });
        dotsEl.appendChild(b);
      });

      function render() {
        var s = steps[current];
        board.setAttribute("data-step", String(current + 1));
        kickerEl.textContent = s.kicker;
        titleEl.textContent = s.title;
        bodyEl.innerHTML = s.body;
        formulaEl.textContent = s.formula;
        bannerEl.className = "answer-banner" + (current === steps.length - 1 ? " show" : "");
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === steps.length - 1;
        nextBtn.textContent = current === steps.length - 2 ? "看答案 →" : "下一步 →";
        var tabs = dotsEl.children;
        for (var i = 0; i < tabs.length; i++) {
          if (i === current) { tabs[i].setAttribute("aria-current", "step"); }
          else { tabs[i].removeAttribute("aria-current"); }
        }
        if (current !== 4) {
          rotTri.classList.remove("played");
          rotateBtn.textContent = "▶ 播放旋转";
        }
      }

      function goTo(i) {
        current = Math.max(0, Math.min(steps.length - 1, i));
        render();
      }

      prevBtn.addEventListener("click", function () { goTo(current - 1); });
      nextBtn.addEventListener("click", function () { goTo(current + 1); });
      rotateBtn.addEventListener("click", function () {
        if (current !== 4) { goTo(4); }
        var played = rotTri.classList.toggle("played");
        rotateBtn.textContent = played ? "↺ 再转一次" : "▶ 播放旋转";
        if (!played) {
          // restart: force reflow then play again
          void rotTri.getBoundingClientRect();
          rotTri.classList.add("played");
          rotateBtn.textContent = "↺ 再转一次";
        }
      });

      render();
    
      /* ---------- 拉窗帘实验室：思考 → 动画 → 拖动 ---------- */
      (function () {
        var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        function svgX(svg, clientX) {
          var r = svg.getBoundingClientRect();
          return (clientX - r.left) / r.width * 560;
        }
        function smooth(t) { return t * t * (3 - 2 * t); }

        function makeCurtain(cfg) {
          var svg = document.getElementById(cfg.svg);
          var playBtn = document.getElementById(cfg.play);
          var statusEl = document.getElementById(cfg.status);
          var areaEl = document.getElementById(cfg.area);
          var whyEl = document.getElementById(cfg.why);
          var hit = document.getElementById(cfg.hit);
          var state = "think"; // think -> anim -> free
          var param = cfg.start;
          var rafId = null;

          function draw() { cfg.draw(param); }

          function finishAnim() {
            state = "free";
            svg.setAttribute("data-state", "free");
            playBtn.textContent = "↺ 再播一次";
            statusEl.textContent = cfg.freeHint;
            areaEl.textContent = cfg.areaText;
            whyEl.className = "why show";
          }

          function play() {
            if (state === "anim") { return; }
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            state = "anim";
            svg.setAttribute("data-state", "anim");
            playBtn.textContent = "播放中…";
            statusEl.textContent = cfg.animHint;
            areaEl.textContent = cfg.areaText;
            if (cfg.onStart) { cfg.onStart(); }
            var keys = cfg.keys.slice();
            if (Math.abs(param - keys[0]) > 0.5) { keys.unshift(param); }
            if (reduceMotion) {
              param = keys[keys.length - 1];
              draw();
              finishAnim();
              return;
            }
            var segCount = keys.length - 1;
            var segDur = cfg.duration / segCount;
            var t0 = null;
            function frame(ts) {
              if (state !== "anim") { return; }
              if (t0 === null) { t0 = ts; }
              var el = ts - t0;
              var seg = Math.min(segCount - 1, Math.floor(el / segDur));
              var local = Math.min(1, (el - seg * segDur) / segDur);
              param = keys[seg] + (keys[seg + 1] - keys[seg]) * smooth(local);
              draw();
              if (el < cfg.duration) { rafId = requestAnimationFrame(frame); }
              else { param = keys[keys.length - 1]; draw(); finishAnim(); }
            }
            rafId = requestAnimationFrame(frame);
          }

          playBtn.addEventListener("click", play);

          var dragging = false;
          hit.addEventListener("pointerdown", function (e) {
            if (state !== "free") { return; }
            dragging = true;
            hit.setPointerCapture(e.pointerId);
            e.preventDefault();
          });
          hit.addEventListener("pointermove", function (e) {
            if (!dragging || state !== "free") { return; }
            var x = svgX(svg, e.clientX);
            param = Math.max(cfg.min, Math.min(cfg.max, x));
            draw();
          });
          function endDrag() { dragging = false; }
          hit.addEventListener("pointerup", endDrag);
          hit.addEventListener("pointercancel", endDrag);

          draw();
        }

        /* 例一：P 在长方形上边滑动 */
        var ex1 = {};
        ex1.tri = document.getElementById("ex1Tri");
        ex1.h = document.getElementById("ex1H");
        ex1.ring = document.getElementById("ex1Ring");
        ex1.dot = document.getElementById("ex1Dot");
        ex1.hit = document.getElementById("ex1Hit");
        ex1.lbl = document.getElementById("ex1PLbl");
        makeCurtain({
          svg: "ex1Svg", play: "ex1Play", status: "ex1Status", area: "ex1Area", why: "ex1Why", hit: "ex1Hit",
          start: 270, min: 78, max: 462, duration: 4200,
          keys: [270, 96, 444, 270],
          areaText: "30 cm²",
          animHint: "看好：P 在上边 CD 上来回滑，三角形一会儿胖一会儿瘦——盯住下面的面积！",
          freeHint: "动画播完了！现在拖住金色的 P 点，自己拉一拉：拉到哪儿，面积都是 30 cm²。",
          draw: function (x) {
            ex1.tri.setAttribute("points", x + ",90 70,330 470,330");
            ex1.h.setAttribute("x1", x); ex1.h.setAttribute("x2", x);
            ex1.ring.setAttribute("cx", x); ex1.dot.setAttribute("cx", x); ex1.hit.setAttribute("cx", x);
            ex1.lbl.setAttribute("x", x - 12);
          }
        });

        /* 例二：P 在平行线 l 上滑动 */
        var ex2 = {};
        ex2.tri = document.getElementById("ex2Tri");
        ex2.h = document.getElementById("ex2H");
        ex2.ring = document.getElementById("ex2Ring");
        ex2.dot = document.getElementById("ex2Dot");
        ex2.hit = document.getElementById("ex2Hit");
        ex2.lbl = document.getElementById("ex2PLbl");
        makeCurtain({
          svg: "ex2Svg", play: "ex2Play", status: "ex2Status", area: "ex2Area", why: "ex2Why", hit: "ex2Hit",
          start: 230, min: 48, max: 512, duration: 4600,
          keys: [230, 486, 66, 300],
          areaText: "42 cm²",
          animHint: "P 沿着平行线 l 滑出老远，三角形都“歪”成这样了——面积还守得住吗？盯住下面！",
          freeHint: "动画播完了！拖住金色的 P 点往两边拉，拉得再远，面积还是 42 cm²。",
          onStart: function () { ex2.lbl.style.display = ""; },
          draw: function (x) {
            ex2.tri.setAttribute("points", x + ",130 60,340 550,340");
            ex2.h.setAttribute("x1", x); ex2.h.setAttribute("x2", x);
            ex2.ring.setAttribute("cx", x); ex2.dot.setAttribute("cx", x); ex2.hit.setAttribute("cx", x);
            ex2.lbl.setAttribute("x", x - 12);
          }
        });

        /* 例三：小路下端点 P 沿草坪底边滑动 */
        var ex3 = {};
        ex3.path = document.getElementById("ex3Path");
        ex3.ring = document.getElementById("ex3Ring");
        ex3.dot = document.getElementById("ex3Dot");
        ex3.hit = document.getElementById("ex3Hit");
        ex3.lbl = document.getElementById("ex3PLbl");
        makeCurtain({
          svg: "ex3Svg", play: "ex3Play", status: "ex3Status", area: "ex3Area", why: "ex3Why", hit: "ex3Hit",
          start: 330, min: 250, max: 446, duration: 4600,
          keys: [330, 250, 428, 250],
          areaText: "150 m²",
          animHint: "拉！把斜小路的下端点 P 沿着底边拖——路被一点点拉直，和左边的虚线框重合了！",
          freeHint: "动画播完了！拖住路下端的金色 P 点：往右拉路变斜，往左拉路变直，草地永远是 150 m²。",
          draw: function (x) {
            ex3.path.setAttribute("points", "250,60 278,60 " + (x + 28) + ",340 " + x + ",340");
            ex3.ring.setAttribute("cx", x); ex3.dot.setAttribute("cx", x); ex3.hit.setAttribute("cx", x);
            ex3.lbl.setAttribute("x", x);
          }
        });
      })();
    
