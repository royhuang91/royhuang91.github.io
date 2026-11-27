(function () {
  "use strict";

  var orange = "#f59145";
  var teal = "#83dce0";
  var chalk = "#f4f8f4";
  var gold = "#ffd23e";

  function number(value) {
    return String(Number(value.toFixed(2)));
  }

  function line(x1, y1, x2, y2, color, dashed) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
      '" stroke="' + (color || chalk) + '" stroke-width="2.5"' + (dashed ? ' stroke-dasharray="7 6"' : "") + '/>';
  }

  function polygon(points, color, opacity) {
    return '<polygon points="' + points + '" fill="' + (color || "none") + '" fill-opacity="' +
      (opacity === undefined ? 0.72 : opacity) + '" stroke="' + (color || chalk) + '" stroke-width="2.5" stroke-linejoin="round"/>';
  }

  function label(x, y, value, color) {
    var escaped = String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return '<text x="' + x + '" y="' + y + '" fill="' + (color || chalk) + '" font-size="32"' +
      (x > 400 ? ' text-anchor="end"' : "") + '>' + escaped + '</text>';
  }

  function point(x, y, name) {
    return '<circle cx="' + x + '" cy="' + y + '" r="15" fill="none" stroke="' + gold +
      '" stroke-width="2"/><circle cx="' + x + '" cy="' + y + '" r="7" fill="' + gold + '"/>' +
      label(x + 16, y - 14, name || "P", gold);
  }

  function height(x, top, bottom) {
    if (top === bottom) { return ""; }
    var corner = top < bottom ? bottom - 12 : bottom + 12;
    return line(x, top, x, bottom, teal, true) + line(x, corner, x + 12, corner, teal) +
      line(x + 12, corner, x + 12, bottom, teal);
  }

  function rectangle(x, y, width, tall) {
    return polygon(x + "," + y + " " + (x + width) + "," + y + " " + (x + width) + "," +
      (y + tall) + " " + x + "," + (y + tall));
  }

  function picture(type, value) {
    var drawing = "";
    var result = "";
    var handle;
    var x;
    var y;
    var intersection;
    switch (type) {
      case "triangle":
        x = 130 + value * 30;
        drawing = polygon(x + ",110 130,290 430,290", orange) + rectangle(130, 110, 300, 180) +
          height(x, 110, 290) + label(105, 320, "A") + label(438, 320, "B") +
          label(103, 135, "D") + label(465, 135, "C") +
          label(230, 338, "AB = 10 cm", gold) + label(440, 215, "6 cm", teal) +
          point(x, 110, value === 0 ? "P=D" : value === 10 ? "P=C" : "P");
        result = "底 10 cm，高 6 cm；面积始终为 30 cm²。";
        handle = [x, 110];
        break;
      case "extension":
        x = 190 + value * 15;
        drawing = line(35, 290, 525, 290, chalk, true) + line(35, 200, 525, 200, teal, true) +
          polygon("250,200 190,290 370,290", chalk, 0.05) +
          polygon(x + ",200 190,290 370,290", orange) + line(190, 290, 370, 290) +
          height(x, 200, 290) + label(173, 320, "B") + label(370, 320, "C") + label(230, 142, "A") +
          label(225, 345, "BC = 12 cm", gold) + label(440, 245, "6 cm", teal) + point(x, 200);
        result = "底 12 cm，高 6 cm；即使高落在底边延长线上，面积仍为 36 cm²。";
        handle = [x, 200];
        break;
      case "tilted":
        x = 90 + value * 20;
        drawing = '<g transform="rotate(-20 280 200)">' + line(70, 250, 490, 250, chalk, true) +
          line(70, 150, 490, 150, teal, true) + polygon(x + ",150 180,250 380,250", orange) +
          height(x, 150, 250) + line(180, 250, 380, 250, gold) + label(150, 279, "B") +
          label(388, 279, "C") + label(224, 315, "底 10 cm", gold) + label(295, 205, "高 5 cm", teal) +
          point(x, 150) + '</g>';
        result = "底 10 cm，垂直距离 5 cm；底边和轨迹一起转斜，面积仍为 25 cm²。斜边不是高。";
        var angle = -20 * Math.PI / 180;
        handle = [280 + (x - 280) * Math.cos(angle) + 50 * Math.sin(angle),
          200 + (x - 280) * Math.sin(angle) - 50 * Math.cos(angle)];
        break;
      case "height":
        y = 180 - value * 18;
        drawing = line(60, 72, 500, 72, teal, true) + line(60, 288, 500, 288, teal, true) +
          polygon("280," + y + " 160,180 400,180", orange) + line(70, 180, 490, 180) +
          height(280, y, 180) + label(137, 210, "A") + label(408, 210, "B") +
          label(365, 165, "底 8 cm", gold) + point(280, y);
        result = "高 " + number(Math.abs(value)) + " cm；面积 " + number(4 * Math.abs(value)) +
          " cm²。底边两侧高度相同则等积；高为 0 时退化为线段。";
        handle = [280, y];
        break;
      case "base":
        x = 100 + value * 30;
        drawing = line(50, 280, 510, 280, chalk, true) +
          polygon("260,100 100,280 " + x + ",280", orange) + height(260, 100, 280) +
          line(100, 280, x, 280, gold) + label(80, 313, "A") +
          label(269, 90, "P") + label(275, 200, "高 6 cm", teal) + point(x, 280, "B");
        result = "底 " + number(value) + " cm，高 6 cm；面积 " + number(value * 3) + " cm²。同高但底变化，面积跟着变。";
        handle = [x, 280];
        break;
      case "split":
        x = 100 + value * 30;
        drawing = polygon("250,100 100,280 " + x + ",280", orange) +
          polygon("250,100 " + x + ",280 460,280", teal) +
          label(235, 83, "P") + label(75, 313, "A") + label(465, 313, "B") +
          label(210, 340, "AB = 12 cm", gold) + label(380, 165, "高 6 cm", teal) + point(x, 280, "M");
        result = "AM = " + number(value) + " cm，MB = " + number(12 - value) + " cm；两块面积 " +
          number(3 * value) + " 和 " + number(36 - 3 * value) + " cm²，总和 36 cm²，面积比 " +
          number(value) + "∶" + number(12 - value) + "。";
        handle = [x, 280];
        break;
      case "trapezoid":
      case "diagonals":
        x = 60 + value * 25;
        drawing = line(35, 130, 525, 130, teal, true) + line(35, 280, 525, 280, chalk, true);
        if (type === "trapezoid") {
          drawing += polygon("130,280 430,280 " + (x + 150) + ",130 " + x + ",130", orange) +
            height(280, 130, 280);
          result = "上底 6 cm，下底 12 cm，高 6 cm；面积始终为 (6 + 12) × 6 ÷ 2 = 54 cm²。";
        } else {
          intersection = 130 + (x + 150 - 130) * 2 / 3;
          drawing += polygon("130,280 430,280 " + (x + 150) + ",130 " + x + ",130") +
            polygon("130,280 " + x + ",130 " + intersection + ",180", orange) +
            polygon("430,280 " + (x + 150) + ",130 " + intersection + ",180", teal) +
            line(130, 280, x + 150, 130) + line(430, 280, x, 130) +
            label(intersection + 8, 207, "O");
          result = "△ADC 与 △BDC 同底 DC、等高。各减去共同的 △DOC，得到 △ADO 与 △BCO 等积。";
        }
        drawing += label(106, 312, "A") + label(436, 312, "B") + label(x + 156, 117, "C") +
          label(x + 24, 65, "DC = 6 cm", gold) + label(210, 342, "AB = 12 cm", gold) +
          label(442, 230, "6 cm", teal) + point(x, 130, "D");
        handle = [x, 130];
        break;
      case "parallelogram":
        x = 60 + value * 30;
        drawing = rectangle(120, 130, 240, 150) + line(35, 130, 525, 130, teal, true) +
          polygon("120,280 360,280 " + (x + 240) + ",130 " + x + ",130", orange) +
          height(280, 130, 280) + label(175, 320, "底 8 cm", gold) + label(295, 215, "高 5 cm", teal) + point(x, 130);
        result = "底 8 cm，高 5 cm；面积始终为 40 cm²。斜边长会变，它不是高。";
        handle = [x, 130];
        break;
      case "road":
      case "crossroads":
        x = 80 + value * 25;
        drawing = polygon("80,50 480,50 480,300 80,300", teal, 0.12);
        if (type === "crossroads") {
          drawing += polygon("80,150 480,150 480,200 80,200", chalk, 0.65);
        }
        drawing += polygon("230,50 255,50 " + (x + 25) + ",300 " + x + ",300", chalk, 0.65);
        if (type === "crossroads") {
          var topLeft = 230 + (x - 230) * 0.4;
          var bottomLeft = 230 + (x - 230) * 0.6;
          drawing += polygon(topLeft + ",150 " + (topLeft + 25) + ",150 " + (bottomLeft + 25) +
            ",200 " + bottomLeft + ",200", orange) + label(85, 143, "横路上下相距 2 m", gold);
          result = "斜路 10 m²，横路 32 m²，重叠 2 m²；草地 160 − (10 + 32 − 2) = 120 m²。";
        } else {
          drawing += line(230, 50, 230, 300, teal, true) + line(255, 50, 255, 300, teal, true);
          result = "斜路的水平截段长 1 m、高 10 m，面积 10 m²；草地始终为 150 m²。";
        }
        drawing += rectangle(80, 50, 400, 250) + label(181, 42, "上边截段 1 m", gold) +
          label(220, 340, "16 m", gold) + label(550, 250, "10 m", teal) + point(x, 300);
        handle = [x, 300];
        break;
      case "two-roads":
        x = 82 + (4 + value) * 22;
        drawing = polygon("82,60 478,60 478,280 82,280", teal, 0.12) +
          polygon("170,60 192,60 " + (x + 22) + ",280 " + x + ",280", chalk, 0.75) +
          polygon("324,60 368,60 " + (x + 198) + ",280 " + (x + 154) + ",280", chalk, 0.75) +
          rectangle(82, 60, 396, 220) + label(132, 43, "截段 1 m", gold) + label(312, 43, "截段 2 m", gold) +
          label(225, 324, "18 m", gold) + label(550, 195, "10 m", teal) + point(x, 280);
        result = "两条路互不相交，面积 (1 + 2) × 10 = 30 m²；草地 180 − 30 = 150 m²。";
        handle = [x, 280];
        break;
      case "opposite":
        y = 290 - value * 25;
        drawing = polygon("280," + y + " 130,290 430,290", orange) +
          polygon("280," + y + " 130,90 430,90", teal) + rectangle(130, 90, 300, 200) +
          line(280, 90, 280, 290, chalk, true) + label(105, 321, "A") + label(438, 321, "B") +
          label(105, 82, "D") + label(438, 82, "C") + label(205, 346, "AB = 12 cm", gold) +
          label(440, 210, "8 cm", teal) + point(280, y);
        result = "下方三角形 " + number(value * 6) + " cm²，上方三角形 " + number((8 - value) * 6) +
          " cm²；两高之和 8 cm，面积总和始终为 48 cm²。";
        handle = [280, y];
        break;
    }
    return {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 360" font-family="sans-serif" font-weight="600">' +
        '<rect width="560" height="360" fill="#17573a"/>' + drawing + '</svg>',
      result: result,
      handle: handle
    };
  }

  document.querySelectorAll(".curtain-demo").forEach(function (card) {
    var range = card.querySelector("input[type=range]");
    var play = card.querySelector(".demo-play");
    var reset = card.querySelector(".demo-reset");
    var readout = card.querySelector("output");
    var status = card.querySelector(".demo-status");
    var config = card.dataset;
    var initial = Number(range.value);
    var min = Number(range.min);
    var max = Number(range.max);
    var image = document.createElement("img");
    var frameId = null;
    var dragging = false;
    var handle;
    image.width = 560;
    image.height = 360;
    image.draggable = false;
    image.className = "demo-image" + (config.axis === "y" ? " demo-image-vertical" : "");
    card.querySelector(".demo-picture").replaceChildren(image);

    function draw(value) {
      range.value = String(value);
      var diagram = picture(config.scene, Number(range.value));
      handle = diagram.handle;
      image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(diagram.svg);
      image.alt = card.querySelector("h3").textContent + "。" + diagram.result;
      readout.textContent = diagram.result;
    }

    function stop() {
      if (frameId !== null) { cancelAnimationFrame(frameId); frameId = null; }
      play.textContent = "播放演示";
    }

    play.addEventListener("click", function () {
      if (frameId !== null) {
        stop();
        status.textContent = "已暂停，可以拖动金色点或操作滑块。";
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        draw(max);
        status.textContent = "已按减少动态效果设置展示另一端；可用滑块逐步比较。";
        return;
      }
      var keys = [Number(range.value), min, max, initial];
      var started = null;
      play.textContent = "暂停演示";
      status.textContent = "正在比较两端与中间位置，注意底、高和面积。";
      function frame(time) {
        if (started === null) { started = time; }
        var progress = Math.min(3, (time - started) / 1800);
        var segment = Math.min(2, Math.floor(progress));
        var local = progress - segment;
        var eased = local * local * (3 - 2 * local);
        draw(keys[segment] + (keys[segment + 1] - keys[segment]) * eased);
        if (progress < 3) { frameId = requestAnimationFrame(frame); }
        else {
          frameId = null;
          play.textContent = "播放演示";
          status.textContent = "演示结束。继续拖动金色点，或用方向键操作滑块。";
        }
      }
      frameId = requestAnimationFrame(frame);
    });

    range.addEventListener("input", function () {
      stop();
      draw(Number(range.value));
      status.textContent = "已手动调整，当前数据见图下方。";
    });
    reset.addEventListener("click", function () {
      stop();
      draw(initial);
      status.textContent = "已恢复初始位置。";
    });

    function position(event) {
      var bounds = image.getBoundingClientRect();
      return [(event.clientX - bounds.left) * 560 / bounds.width, (event.clientY - bounds.top) * 360 / bounds.height];
    }

    image.addEventListener("pointerdown", function (event) {
      var p = position(event);
      if (Math.hypot(p[0] - handle[0], p[1] - handle[1]) > 34) { return; }
      stop();
      dragging = true;
      image.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
    image.addEventListener("pointermove", function (event) {
      if (!dragging) { return; }
      var p = position(event);
      if (config.angle) {
        var angle = -Number(config.angle) * Math.PI / 180;
        p = [280 + (p[0] - 280) * Math.cos(angle) - (p[1] - 200) * Math.sin(angle),
          200 + (p[0] - 280) * Math.sin(angle) + (p[1] - 200) * Math.cos(angle)];
      }
      var value = config.axis === "y" ? (Number(config.origin) - p[1]) / Number(config.scale) :
        (p[0] - Number(config.origin)) / Number(config.scale);
      draw(Math.max(min, Math.min(max, value)));
    });
    function endDrag() {
      if (dragging) { status.textContent = "已移动金色点，当前数据见图下方。"; }
      dragging = false;
    }
    image.addEventListener("pointerup", endDrag);
    image.addEventListener("pointercancel", endDrag);
    image.addEventListener("lostpointercapture", endDrag);

    draw(initial);
    range.disabled = false;
    play.disabled = false;
    reset.disabled = false;
    status.textContent = "拖动金色点，或聚焦滑块后用方向键移动；Home / End 可比较两端。";
  });
})();
