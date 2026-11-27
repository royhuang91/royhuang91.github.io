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
          tab: "2 合看",
          kicker: "第二步 · 整体观察",
          title: "三块橙色，合看成一个大三角形",
          body: "<p>盯着橙色看：①②③ 三块被线段 DE 和 DC 切开，但把它们合起来看——" +
                "外轮廓正好是 <b class='o'>三角形 ADG</b>：上边 AD、右边 DG、下边一条直线 AG。</p>" +
                "<p>不挪动任何一块，只是忽略内部切分线，<b>总面积不变</b>。所以不用一块块算，只要算 △ADG 的面积就行。</p>",
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
                "所以能不能补上，只看一件事：转完之后，<b>三个顶点能不能一个不多、一个不少地对上</b>。大正方形 DEFG 正好给了三个保证：</p>" +
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
                "<p>整道题只用了两个动作：<b class='o'>合看</b>（忽略内部切分线）和 <b class='t'>转</b>（旋转 90° 找到高）。</p>",
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
