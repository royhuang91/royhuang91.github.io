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

  function point(x, y, name, below) {
    return '<circle cx="' + x + '" cy="' + y + '" r="15" fill="none" stroke="' + gold +
      '" stroke-width="2"/><circle cx="' + x + '" cy="' + y + '" r="7" fill="' + gold + '"/>' +
      label(x + 16, y + (below ? 38 : -14), name || "P", gold);
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

  function pairedSquares(value, variant) {
    var source;
    var target;
    var b;
    var c;
    var names;
    var result;
    var construction = "";
    switch (variant) {
      case "small-horizontal":
        source = [76, 300]; target = [316, 300]; b = [316, 132]; c = [484, 132];
        names = label(40, 336, "A") + label(290, 112, "B") + label(520, 112, "C") +
          label(520, 336, "D") + label(320, 336, "A′");
        construction = line(40, 132, 520, 132, teal, true);
        result = "固定底 BC，A 沿水平线移到 A′。底 BC = 7 cm，高 = 7 cm，面积始终为 24.5 cm²；10 cm 不必代入面积公式。";
        break;
      case "small-diagonal":
        source = [76, 60]; target = [316, 300]; b = [316, 132]; c = [484, 300];
        names = label(40, 52, "A") + label(290, 112, "B") + label(520, 336, "C") + label(320, 336, "D");
        result = "固定斜底 BC，沿与 BC 平行的 AD 移动，面积不变。移到 D 后改选底 DC = 7 cm、高 BD = 7 cm，面积为 24.5 cm²。";
        break;
      case "mixed-height":
        source = [76, 60]; target = [316, 60]; b = [316, 300]; c = [484, 300];
        names = label(40, 52, "A") + label(290, 336, "B") + label(520, 336, "C") + label(325, 104, "D");
        result = "固定底 BC，A 沿大正方形的上边移到 D。底 BC = 7 cm，高 DB = 10 cm，面积始终为 35 cm²。";
        break;
      case "large-diagonal":
        source = [484, 132]; target = [316, 300]; b = [76, 300]; c = [316, 60];
        names = label(540, 174, "A") + label(40, 336, "B") + label(325, 104, "C") + label(320, 336, "D");
        result = "固定大正方形的斜底 BC，A 沿 AD 移到 D。移到 D 后改选底 BD = 10 cm、高 CD = 10 cm，面积为 50 cm²；不是小正方形的一半。";
        break;
    }
    var x = source[0] + (target[0] - source[0]) * value / 100;
    var y = source[1] + (target[1] - source[1]) * value / 100;
    if (variant === "small-horizontal") { construction += height(x, 300, 132); }
    if (variant === "mixed-height") { construction += height(x, 60, 300); }
    return {
      drawing: polygon(source.join(",") + " " + b.join(",") + " " + c.join(","), chalk, 0.04) +
        polygon(target.join(",") + " " + b.join(",") + " " + c.join(","), teal, 0.12) +
        polygon(x + "," + y + " " + b.join(",") + " " + c.join(","), orange) +
        rectangle(76, 60, 240, 240) + rectangle(316, 132, 168, 168) + construction +
        line(source[0], source[1], target[0], target[1], teal, true) +
        line(b[0], b[1], c[0], c[1], gold) + names +
        label(150, 338, "10 cm", gold) + label(390, 338, "7 cm", gold) +
        point(x, y, value === 0 ? "P=A" : value === 100 ? (variant === "small-horizontal" ? "P=A′" : "P=D") : "P"),
      result: result,
      handle: [x, y],
      track: [source, target]
    };
  }

  function doubleCurtain(value, secondValue) {
    var first = value < 100;
    var left = [40 + 140 * value / 100, 240 + 60 * value / 100];
    var right = [520 - 140 * secondValue / 100, 160 + 140 * secondValue / 100];
    var current = left[0] + "," + left[1] + " " + right[0] + "," + right[1] + " 380,100";
    var before = first ? "40,240 520,160 380,100" : "180,300 520,160 380,100";
    var result = first ? "第一拉：固定 BC，沿 AD 把 A 移到 D，△ABC 与 △DBC 等积。播放将自动接着完成第二拉。" :
      secondValue === 100 ? "两次等积替换：△ABC = △DBC = △DEC 的面积 = 10 × 10 ÷ 2 = 50 cm²。" :
        "第二拉：A 已移到 D。固定 DC，沿 BE 把 B 移到 E，终点将成为大正方形的一半。";
    return {
      drawing: polygon(before, chalk, 0.04) + polygon(current, orange) +
        rectangle(40, 100, 140, 140) + rectangle(180, 100, 200, 200) + rectangle(380, 160, 140, 140) +
        (first ? line(40, 300, 180, 300, teal, true) + line(40, 240, 40, 300, teal, true) +
          line(380, 100, 520, 100, teal, true) + line(520, 100, 520, 160, teal, true) : "") +
        line(40, 240, 180, 300, teal, true) + line(520, 160, 380, 300, teal, true) +
        (first ? line(520, 160, 380, 100, gold) : line(180, 300, 380, 100, gold)) +
        label(20, 274, "A") + label(550, 195, "B") + label(350, 88, "C") +
        label(155, 335, "D") + label(390, 335, "E") +
        label(80, 70, "7 cm", gold) + label(225, 70, "10 cm", gold) + label(485, 70, "7 cm", gold) +
        point(left[0], left[1], value === 100 ? "A=D" : "A") +
        point(right[0], right[1], secondValue === 100 ? "B=E" : "B"),
      result: result,
      handle: left,
      track: [[40, 240], [180, 300]],
      secondaryHandle: right,
      secondaryTrack: [[520, 160], [380, 300]]
    };
  }

  function picture(type, value, variant, secondaryValue) {
    var drawing = "";
    var result = "";
    var handle;
    var x;
    var y;
    var intersection;
    var track;
    var secondaryHandle;
    var secondaryTrack;
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
        var movingApex = variant === "apex";
        var partBase = movingApex ? 4 : 1 + value / 10;
        var apexX = movingApex ? 70 + 4.5 * value : 250;
        x = 100 + partBase * 30;
        drawing = (movingApex ? line(35, 100, 540, 100, teal, true) + line(35, 280, 540, 280, chalk, true) : "") +
          polygon(apexX + ",100 100,280 " + x + ",280", orange) +
          polygon(apexX + ",100 " + x + ",280 460,280", teal) +
          (movingApex ? height(apexX, 100, 280) + label(x - 12, 313, "M") : label(235, 83, "P")) +
          label(75, 313, "A") + label(465, 313, "B") + label(245, 340, "12 cm", gold) +
          label(380, 165, "高 6 cm", teal) + (movingApex ? point(apexX, 100, "P") : point(x, 280, "M"));
        result = movingApex ? (apexX < 100 ? "P 已到 A 左侧。" : apexX > 460 ? "P 已到 B 右侧。" : "P 在 AB 上方。") +
          "固定 M：AM = 4 cm，MB = 8 cm；两块面积各自保持 12 cm²、24 cm²，总和 36 cm²，面积比 1∶2。" :
          "移动 M：AM = " + number(partBase) + " cm，MB = " + number(12 - partBase) + " cm；两块面积 " +
          number(3 * partBase) + " 和 " + number(36 - 3 * partBase) + " cm²，总和 36 cm²，面积比 " +
          number(partBase) + "∶" + number(12 - partBase) + "。";
        handle = movingApex ? [apexX, 100] : [x, 280];
        track = movingApex ? [[70, 100], [520, 100]] : [[130, 280], [430, 280]];
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
        var upperX = 170 + secondaryValue * 22;
        drawing = polygon("82,60 478,60 478,280 82,280", teal, 0.12) +
          polygon(upperX + ",60 " + (upperX + 22) + ",60 " + (x + 22) + ",280 " + x + ",280", chalk, 0.75) +
          polygon((upperX + 154) + ",60 " + (upperX + 198) + ",60 " + (x + 198) + ",280 " + (x + 154) + ",280", chalk, 0.75) +
          line(upperX, 60, upperX, 280, teal, true) + line(upperX + 22, 60, upperX + 22, 280, teal, true) +
          line(upperX + 154, 60, upperX + 154, 280, teal, true) + line(upperX + 198, 60, upperX + 198, 280, teal, true) +
          rectangle(82, 60, 396, 220) + '<g transform="translate(' + upperX + ' 0)" text-anchor="middle">' +
          label(11, 43, "截段 1 m", gold) + label(176, 43, "截段 2 m", gold) + '</g>' +
          label(225, 324, "18 m", gold) + label(550, 195, "10 m", teal) + point(x, 280, "下") + point(upperX, 60, "上", true);
        result = "上端位移 " + number(secondaryValue) + " m，下端位移 " + number(value) +
          " m。两条路互不相交，面积 (1 + 2) × 10 = 30 m²；草地 180 − 30 = 150 m²。";
        handle = [x, 280];
        secondaryHandle = [upperX, 60];
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
      case "paired-squares":
        var paired = pairedSquares(value, variant);
        drawing = paired.drawing;
        result = paired.result;
        handle = paired.handle;
        track = paired.track;
        break;
      case "double-curtain":
        var doubleStep = doubleCurtain(value, secondaryValue);
        drawing = doubleStep.drawing;
        result = doubleStep.result;
        handle = doubleStep.handle;
        track = doubleStep.track;
        secondaryHandle = doubleStep.secondaryHandle;
        secondaryTrack = doubleStep.secondaryTrack;
        break;
      case "three-squares":
        var leftY = 148 + 72 * value / 100;
        var rightY = 276 - 56 * secondaryValue / 100;
        drawing = polygon("56,148 308,80 504,276", chalk, 0.04) +
          polygon("56," + leftY + " 308,80 308,220", orange) +
          polygon("504," + rightY + " 308,80 308,220", teal) +
          rectangle(56, 80, 112, 112) + rectangle(168, 80, 140, 140) + rectangle(308, 80, 196, 196) +
          line(308, 80, 308, 220, gold) + line(308, 220, 308, rightY, teal, true) +
          line(35, 220, 530, 220, teal, true) + line(56, 192, 56, 220, teal, true) +
          line(56, leftY, 308, leftY, teal, true) + line(308, rightY, 504, rightY, teal, true) +
          line(296, leftY, 296, leftY - 12, teal) + line(296, leftY - 12, 308, leftY - 12, teal) +
          line(308, rightY - 12, 320, rightY - 12, teal) + line(320, rightY - 12, 320, rightY, teal) +
          label(75, 53, "8 m", gold) + label(205, 53, "10 m", gold) + label(410, 53, "14 m", gold) +
          label(320, 113, "D") + label(320, 253, "E") + label(30, 253, "F") + label(550, 253, "G") +
          label(540, 313, "R") + point(56, leftY, value === 100 ? "P=F" : "P", true) +
          point(504, rightY, secondaryValue === 100 ? "R=G" : "R");
        result = "左点进度 " + number(value) + "%，右点进度 " + number(secondaryValue) + "%。" +
          (value === 100 && secondaryValue === 100 ?
            "两点均到位：F、E、G 共线。底 FG = 8 + 10 + 14 = 32 m，高 DE = 10 m，△FDG 面积 = 160 m²。" :
            value < 100 ? "先把左点 P 下移到 F，再把右点 R 上移到 G；也可直接拖动任意金色点分别比较。" :
              "左点已到 F，继续把右点 R 上移到 G；G 比 R 的原位置高 4 m。");
        handle = [56, leftY];
        secondaryHandle = [504, rightY];
        track = [[56, 148], [56, 220]];
        secondaryTrack = [[504, 276], [504, 220]];
        break;
    }
    return {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 360" font-family="sans-serif" font-weight="600">' +
        '<rect width="560" height="360" fill="#17573a"/>' + drawing + '</svg>',
      result: result,
      handle: handle,
      track: track,
      secondaryHandle: secondaryHandle,
      secondaryTrack: secondaryTrack
    };
  }

  document.querySelectorAll(".curtain-demo").forEach(function (card) {
    var range = card.querySelector("input[type=range]");
    var secondaryRange = card.querySelector(".demo-secondary-range");
    var movingRange = range;
    var play = card.querySelector(".demo-play");
    var reset = card.querySelector(".demo-reset");
    var readout = card.querySelector("output");
    var status = card.querySelector(".demo-status");
    var config = card.dataset;
    var variant = card.querySelector(".square-variant");
    var initial = Number(range.value);
    var secondaryInitial = secondaryRange ? Number(secondaryRange.value) : null;
    var image = document.createElement("img");
    var frameId = null;
    var dragging = false;
    var handle;
    var secondaryHandle;
    var track;
    var secondaryTrack;
    image.width = 560;
    image.height = 360;
    image.draggable = false;
    image.className = "demo-image" + (config.axis === "y" ? " demo-image-vertical" : "");
    card.querySelector(".demo-picture").replaceChildren(image);

    function draw(value) {
      movingRange.value = String(value);
      if (config.scene === "double-curtain") {
        // 换成 DC 作底前，A 必须到 D；退回第一拉则恢复原来的 BC。
        if (movingRange === secondaryRange && Number(secondaryRange.value) > 0) {
          range.value = range.max;
        } else if (movingRange === range && Number(range.value) < Number(range.max)) {
          secondaryRange.value = secondaryRange.min;
        }
      }
      var diagram = picture(config.scene, Number(range.value), variant ? variant.value : null,
        secondaryRange ? Number(secondaryRange.value) : null);
      handle = diagram.handle;
      secondaryHandle = diagram.secondaryHandle;
      track = diagram.track;
      secondaryTrack = diagram.secondaryTrack;
      if (track) {
        image.className = "demo-image" + (track[0][0] === track[1][0] ? " demo-image-vertical" :
          track[0][1] === track[1][1] ? "" : " demo-image-diagonal");
      }
      image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(diagram.svg);
      image.alt = card.querySelector("h3").textContent + "。" + diagram.result;
      readout.textContent = diagram.result;
    }

    function stop() {
      if (frameId !== null) { cancelAnimationFrame(frameId); frameId = null; }
      play.textContent = config.scene === "two-roads" ? (movingRange === secondaryRange ? "播放上端" : "播放下端") : "播放演示";
    }

    play.addEventListener("click", function () {
      var min = Number(movingRange.min);
      var max = Number(movingRange.max);
      var playbackInitial = movingRange === secondaryRange ? secondaryInitial : initial;
      if (frameId !== null) {
        stop();
        status.textContent = "已暂停，可以拖动金色点或操作滑块。";
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (config.playback === "sequence") {
          range.value = range.max;
          movingRange = secondaryRange;
          max = Number(secondaryRange.max);
        }
        draw(max);
        status.textContent = "已按减少动态效果设置展示另一端；可用滑块逐步比较。";
        return;
      }
      var steps = [];
      if (config.playback === "sequence") {
        if (Number(range.value) === Number(range.max) && Number(secondaryRange.value) === Number(secondaryRange.max)) {
          movingRange = range;
          secondaryRange.value = String(secondaryInitial);
          draw(initial);
        }
        [range, secondaryRange].forEach(function (control) {
          if (Number(control.value) < Number(control.max)) {
            steps.push({ control: control, from: Number(control.value), to: Number(control.max) });
          }
        });
      } else {
        var keys;
        keys = [Number(movingRange.value), min, max, playbackInitial];
        if (keys[0] === min) { keys.shift(); }
        for (var i = 0; i < keys.length - 1; i += 1) {
          steps.push({ control: movingRange, from: keys[i], to: keys[i + 1] });
        }
      }
      var segmentCount = steps.length;
      var started = null;
      play.textContent = "暂停演示";
      status.textContent = config.playback === "sequence" ? "连续演示中：先移动左点，再接着移动右点，中途可暂停。" :
        (config.scene === "two-roads" ? (movingRange === secondaryRange ? "正在移动上端。" : "正在移动下端。") : "") +
          "正在比较两端与中间位置，注意底、高和面积。";
      function frame(time) {
        if (started === null) { started = time; }
        var progress = Math.min(segmentCount, (time - started) / 1800);
        var segment = Math.min(segmentCount - 1, Math.floor(progress));
        var local = progress - segment;
        var eased = local * local * (3 - 2 * local);
        for (var i = 0; i < segment; i += 1) { steps[i].control.value = String(steps[i].to); }
        var step = steps[segment];
        movingRange = step.control;
        draw(step.from + (step.to - step.from) * eased);
        if (progress < segmentCount) { frameId = requestAnimationFrame(frame); }
        else {
          frameId = null;
          stop();
          status.textContent = "演示结束。继续拖动金色点，或用方向键操作滑块。";
        }
      }
      frameId = requestAnimationFrame(frame);
    });

    (secondaryRange ? [range, secondaryRange] : [range]).forEach(function (control) {
      control.addEventListener("input", function () {
        movingRange = control;
        stop();
        draw(Number(control.value));
        status.textContent = "已手动调整，当前数据见图下方。";
      });
    });
    reset.addEventListener("click", function () {
      movingRange = range;
      if (secondaryRange) { secondaryRange.value = String(secondaryInitial); }
      stop();
      draw(initial);
      status.textContent = "已恢复初始位置。";
    });
    if (variant) {
      variant.disabled = false;
      var changeVariant = function () {
        stop();
        card.querySelectorAll("[data-square-case]").forEach(function (note) {
          note.hidden = note.dataset.squareCase !== variant.value;
        });
        draw(initial);
        status.textContent = "已切换，进度已复位；可播放或操作滑块。";
      };
      variant.addEventListener("change", changeVariant);
    }

    function position(event) {
      var bounds = image.getBoundingClientRect();
      return [(event.clientX - bounds.left) * 560 / bounds.width, (event.clientY - bounds.top) * 360 / bounds.height];
    }

    image.addEventListener("pointerdown", function (event) {
      var p = position(event);
      if (secondaryHandle && Math.hypot(p[0] - secondaryHandle[0], p[1] - secondaryHandle[1]) <= 34) {
        movingRange = secondaryRange;
      } else if (Math.hypot(p[0] - handle[0], p[1] - handle[1]) <= 34) {
        movingRange = range;
      } else { return; }
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
      var value;
      var movingTrack = movingRange === secondaryRange ? secondaryTrack : track;
      if (movingTrack) {
        var dx = movingTrack[1][0] - movingTrack[0][0];
        var dy = movingTrack[1][1] - movingTrack[0][1];
        value = ((p[0] - movingTrack[0][0]) * dx + (p[1] - movingTrack[0][1]) * dy) / (dx * dx + dy * dy) * 100;
      } else {
        value = config.axis === "y" ? (Number(config.origin) - p[1]) / Number(config.scale) :
          (p[0] - Number(config.origin)) / Number(config.scale);
      }
      draw(Math.max(Number(movingRange.min), Math.min(Number(movingRange.max), value)));
    });
    function endDrag() {
      if (dragging) { status.textContent = "已移动金色点，当前数据见图下方。"; }
      dragging = false;
    }
    image.addEventListener("pointerup", endDrag);
    image.addEventListener("pointercancel", endDrag);
    image.addEventListener("lostpointercapture", endDrag);

    draw(initial);
    if (secondaryRange) { secondaryRange.disabled = false; stop(); }
    range.disabled = false;
    play.disabled = false;
    reset.disabled = false;
    status.textContent = "拖动金色点，或聚焦滑块后用方向键移动；Home / End 可比较两端。";
  });
})();
