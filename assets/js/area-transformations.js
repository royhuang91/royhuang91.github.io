(() => {
  "use strict";

  const colors = { chalk: "#f4f8f4", orange: "#f59145", teal: "#83dce0", gold: "#ffd23e", board: "#17573a", none: "none" };
  // 与题面采用同一组坐标；只插值平移、旋转、翻折和明确标出的顶点轨迹。
  const scenes = {
    "whole": [
      {"tag": "polygon", "attrs": {"points": [[80, 70], [400, 70], [400, 230], [80, 230]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[80, 70], [80, 230], [400, 230]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "line", "attrs": {"x1": 80, "y1": 70, "x2": 170, "y2": 230, "stroke": "chalk", "stroke-width": 2.5}, "hide": 2},
      {"tag": "line", "attrs": {"x1": 80, "y1": 70, "x2": 290, "y2": 230, "stroke": "chalk", "stroke-width": 2.5}, "hide": 2},
      {"tag": "polygon", "attrs": {"points": [[80, 70], [80, 230], [400, 230]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "text", "attrs": {"x": 240, "y": 275, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "12 cm"},
      {"tag": "text", "attrs": {"x": 440, "y": 165, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "6 cm"}
    ],
    "complement": [
      {"tag": "polygon", "attrs": {"points": [[80, 50], [280, 50], [280, 125], [380, 125], [380, 250], [80, 250]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[280, 50], [380, 50], [380, 125], [280, 125]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[80, 50], [380, 50], [380, 250], [80, 250]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "text", "attrs": {"x": 230, "y": 295, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "12 cm"},
      {"tag": "text", "attrs": {"x": 36, "y": 160, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "8 cm"},
      {"tag": "text", "attrs": {"x": 330, "y": 35, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "4 cm"},
      {"tag": "text", "attrs": {"x": 424, "y": 100, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "3 cm"}
    ],
    "shift": [
      {"tag": "polygon", "attrs": {"points": [[150, 70], [390, 70], [330, 230], [90, 230]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[150, 70], [390, 70], [330, 230], [150, 230]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[150, 70], [150, 230], [90, 230]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}, "motion": {"translate": [240, 0]}},
      {"tag": "line", "attrs": {"x1": 150, "y1": 70, "x2": 150, "y2": 230, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[150, 70], [390, 70], [390, 230], [150, 230]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "text", "attrs": {"x": 240, "y": 280, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "底 12 cm"},
      {"tag": "text", "attrs": {"x": 432, "y": 165, "fill": "teal", "font-size": 26, "text-anchor": "middle"}, "text": "8 cm"},
      {"tag": "polyline", "attrs": {"points": [[150, 218], [162, 218], [162, 230]], "stroke": "teal", "stroke-width": 2, "fill": "none"}, "show": 1}
    ],
    "double-triangle": [
      {"tag": "polygon", "attrs": {"points": [[100, 250], [300, 250], [180, 100]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[100, 250], [300, 250], [180, 100]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1, "motion": {"rotate": [180, 240, 175]}},
      {"tag": "line", "attrs": {"x1": 180, "y1": 100, "x2": 180, "y2": 250, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 1},
      {"tag": "polyline", "attrs": {"points": [[180, 238], [192, 238], [192, 250]], "stroke": "teal", "stroke-width": 2, "fill": "none"}, "show": 1},
      {"tag": "text", "attrs": {"x": 205, "y": 305, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "底 8 cm"},
      {"tag": "text", "attrs": {"x": 445, "y": 160, "fill": "teal", "font-size": 26, "text-anchor": "middle"}, "text": "高"},
      {"tag": "text", "attrs": {"x": 445, "y": 195, "fill": "teal", "font-size": 26, "text-anchor": "middle"}, "text": "6 cm"}
    ],
    "double-trapezoid": [
      {"tag": "polygon", "attrs": {"points": [[120.0, 117.5], [210.0, 117.5], [270.0, 222.5], [90.0, 222.5]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[120.0, 117.5], [210.0, 117.5], [270.0, 222.5], [90.0, 222.5]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1, "motion": {"rotate": [180, 240.0, 170.0]}},
      {"tag": "text", "attrs": {"x": 165.0, "y": 98.75, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "6 cm"},
      {"tag": "text", "attrs": {"x": 180.0, "y": 256.25, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "12 cm"},
      {"tag": "line", "attrs": {"x1": 120.0, "y1": 117.5, "x2": 120.0, "y2": 222.5, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 1},
      {"tag": "text", "attrs": {"x": 45, "y": 180, "fill": "teal", "font-size": 26, "text-anchor": "middle"}, "text": "7 cm"}
    ],
    "rotate": [
      {"tag": "polygon", "attrs": {"points": [[120, 65], [330, 65], [330, 275], [120, 275]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[210, 65], [330, 155], [240, 275], [120, 185]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[330, 65], [210, 65], [330, 155]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[330, 275], [330, 155], [240, 275]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[120, 275], [240, 275], [120, 185]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[120, 65], [210, 65], [120, 185]], "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1, "motion": {"rotate": [270, 225, 170]}},
      {"tag": "text", "attrs": {"x": 164, "y": 53, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "3 cm"},
      {"tag": "text", "attrs": {"x": 273, "y": 53, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "4 cm"},
      {"tag": "text", "attrs": {"x": 225, "y": 320, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "大正方形边长 7 cm"}
    ],
    "fold": [
      {"tag": "polygon", "attrs": {"points": [[140, 50], [340, 50], [340, 250], [140, 250]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[140, 50], [140, 250], [340, 250]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[140, 50], [340, 50], [340, 250]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "motion": {"matrix": [0, 1, 1, 0, 90, -90]}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 50, "x2": 340, "y2": 250, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 1},
      {"tag": "text", "attrs": {"x": 240, "y": 295, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "8 cm"},
      {"tag": "text", "attrs": {"x": 96, "y": 165, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "8 cm"}
    ],
    "slide": [
      {"tag": "polygon", "attrs": {"points": [[240, 100], [180, 250], [360, 250]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "line", "attrs": {"x1": 55, "y1": 100, "x2": 410, "y2": 100, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 1},
      {"tag": "line", "attrs": {"x1": 55, "y1": 250, "x2": 410, "y2": 250, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[240, 100], [180, 250], [360, 250]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}, "target": {"points": [[90, 100], [180, 250], [360, 250]]}},
      {"tag": "line", "attrs": {"x1": 240, "y1": 100, "x2": 240, "y2": 250, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 1, "target": {"x1": 90, "x2": 90}},
      {"tag": "polyline", "attrs": {"points": [[240, 238], [252, 238], [252, 250]], "stroke": "teal", "stroke-width": 2, "fill": "none"}, "show": 1, "motion": {"translate": [-150, 0]}},
      {"tag": "text", "attrs": {"x": 240, "y": 85, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "P", "target": {"x": 90}},
      {"tag": "text", "attrs": {"x": 165, "y": 280, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "B"},
      {"tag": "text", "attrs": {"x": 374, "y": 280, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "C"},
      {"tag": "text", "attrs": {"x": 270, "y": 315, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "BC = 6 cm"},
      {"tag": "text", "attrs": {"x": 433, "y": 182, "fill": "teal", "font-size": 26, "text-anchor": "middle"}, "text": "5 cm"}
    ],
    "counterexample": [
      {"tag": "polygon", "attrs": {"points": [[240, 100], [180, 250], [360, 250]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[240, 100], [180, 250], [360, 250]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}, "target": {"points": [[240, 190], [180, 250], [360, 250]]}},
      {"tag": "line", "attrs": {"x1": 240, "y1": 100, "x2": 240, "y2": 250, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 1, "target": {"y1": 190}},
      {"tag": "polyline", "attrs": {"points": [[240, 238], [252, 238], [252, 250]], "stroke": "teal", "stroke-width": 2, "fill": "none"}, "show": 1},
      {"tag": "text", "attrs": {"x": 240, "y": 85, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "P", "target": {"y": 175}},
      {"tag": "text", "attrs": {"x": 270, "y": 300, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "底 6 cm"},
      {"tag": "text", "attrs": {"x": 115, "y": 160, "fill": "teal", "font-size": 26, "text-anchor": "middle"}, "text": "高 5 cm", "hide": 2},
      {"tag": "text", "attrs": {"x": 115, "y": 220, "fill": "teal", "font-size": 26, "text-anchor": "middle"}, "text": "高 2 cm", "show": 2}
    ],
    "overlap": [
      {"tag": "polygon", "attrs": {"points": [[120, 40], [312, 40], [312, 232], [120, 232]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[240, 136], [384, 136], [384, 280], [240, 280]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[240, 136], [312, 136], [312, 232], [240, 232]], "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[120, 40], [312, 40], [312, 232], [120, 232]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[240, 136], [384, 136], [384, 280], [240, 280]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "text", "attrs": {"x": 216, "y": 25, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "8 cm"},
      {"tag": "text", "attrs": {"x": 312, "y": 320, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "6 cm"}
    ],
    "fan": [
      {"tag": "polygon", "attrs": {"points": [[240, 100], [80, 220], [160, 220]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[240, 100], [160, 220], [400, 220]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "polygon", "attrs": {"points": [[240, 100], [80, 220], [400, 220]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "line", "attrs": {"x1": 240, "y1": 100, "x2": 160, "y2": 220, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 240, "y1": 100, "x2": 240, "y2": 220, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 1},
      {"tag": "line", "attrs": {"x1": 240, "y1": 100, "x2": 240, "y2": 220, "stroke": "gold", "stroke-width": 2.5}, "show": 2},
      {"tag": "line", "attrs": {"x1": 240, "y1": 100, "x2": 320, "y2": 220, "stroke": "gold", "stroke-width": 2.5}, "show": 2},
      {"tag": "text", "attrs": {"x": 240, "y": 75, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "A"},
      {"tag": "text", "attrs": {"x": 65, "y": 247, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "B"},
      {"tag": "text", "attrs": {"x": 160, "y": 247, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "M"},
      {"tag": "text", "attrs": {"x": 417, "y": 247, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "C"},
      {"tag": "text", "attrs": {"x": 120, "y": 290, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "4 cm"},
      {"tag": "text", "attrs": {"x": 280, "y": 290, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "12 cm"},
      {"tag": "text", "attrs": {"x": 146, "y": 200, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "12"}
    ],
    "inverse": [
      {"tag": "polygon", "attrs": {"points": [[100, 70], [300, 70], [300, 190], [100, 190]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[300, 70], [360, 70], [360, 190], [300, 190]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "line", "attrs": {"x1": 300, "y1": 70, "x2": 300, "y2": 190, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[300, 70], [360, 70], [360, 190], [300, 190]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "text", "attrs": {"x": 200, "y": 240, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "原长 10 cm"},
      {"tag": "text", "attrs": {"x": 410, "y": 140, "fill": "teal", "font-size": 26, "text-anchor": "middle"}, "text": "高 6 cm"},
      {"tag": "text", "attrs": {"x": 330, "y": 140, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "18"},
      {"tag": "text", "attrs": {"x": 330, "y": 285, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "增加 ? cm"}
    ],
    "grid": [
      {"tag": "polygon", "attrs": {"points": [[140, 40], [340, 40], [240, 140], [340, 240], [140, 240]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 40, "x2": 140, "y2": 240, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 190, "y1": 40, "x2": 190, "y2": 240, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 240, "y1": 40, "x2": 240, "y2": 240, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 290, "y1": 40, "x2": 290, "y2": 240, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 340, "y1": 40, "x2": 340, "y2": 240, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 40, "x2": 340, "y2": 40, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 90, "x2": 340, "y2": 90, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 140, "x2": 340, "y2": 140, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 190, "x2": 340, "y2": 190, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 240, "x2": 340, "y2": 240, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "polygon", "attrs": {"points": [[290, 40], [340, 40], [290, 90]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[240, 90], [290, 90], [240, 140]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[240, 140], [240, 190], [290, 190]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[290, 190], [290, 240], [340, 240]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "text", "attrs": {"x": 240, "y": 295, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "每小格 1 cm × 1 cm"}
    ],
    "estimate": [
      {"tag": "rect", "attrs": {"x": 140, "y": 50, "width": 200, "height": 200, "rx": 30, "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 3}},
      {"tag": "rect", "attrs": {"x": 140, "y": 50, "width": 50, "height": 50, "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5}, "show": 2},
      {"tag": "rect", "attrs": {"x": 140, "y": 100, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 140, "y": 150, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 140, "y": 200, "width": 50, "height": 50, "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5}, "show": 2},
      {"tag": "rect", "attrs": {"x": 190, "y": 50, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 190, "y": 100, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 190, "y": 150, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 190, "y": 200, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 240, "y": 50, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 240, "y": 100, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 240, "y": 150, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 240, "y": 200, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 290, "y": 50, "width": 50, "height": 50, "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5}, "show": 2},
      {"tag": "rect", "attrs": {"x": 290, "y": 100, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 290, "y": 150, "width": 50, "height": 50, "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5}, "show": 1},
      {"tag": "rect", "attrs": {"x": 290, "y": 200, "width": 50, "height": 50, "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5}, "show": 2},
      {"tag": "line", "attrs": {"x1": 140, "y1": 50, "x2": 140, "y2": 250, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 50, "x2": 340, "y2": 50, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 190, "y1": 50, "x2": 190, "y2": 250, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 100, "x2": 340, "y2": 100, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 240, "y1": 50, "x2": 240, "y2": 250, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 150, "x2": 340, "y2": 150, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 290, "y1": 50, "x2": 290, "y2": 250, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 200, "x2": 340, "y2": 200, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 340, "y1": 50, "x2": 340, "y2": 250, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 140, "y1": 250, "x2": 340, "y2": 250, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "text", "attrs": {"x": 240, "y": 300, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "每格 1 m²；只用数格法"}
    ],
    "swallow": [
      {"tag": "polygon", "attrs": {"points": [[270, 40], [150, 280], [240, 160]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[270, 40], [330, 280], [240, 160]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "polygon", "attrs": {"points": [[270, 40], [150, 280], [330, 280]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "line", "attrs": {"x1": 270, "y1": 40, "x2": 210, "y2": 280, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 150, "y1": 280, "x2": 240, "y2": 160, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 330, "y1": 280, "x2": 240, "y2": 160, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "polygon", "attrs": {"points": [[240, 160], [150, 280], [210, 280]], "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1, "hide": 2},
      {"tag": "polygon", "attrs": {"points": [[240, 160], [210, 280], [330, 280]], "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1, "hide": 2},
      {"tag": "text", "attrs": {"x": 270, "y": 27, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "A"},
      {"tag": "text", "attrs": {"x": 130, "y": 283, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "B"},
      {"tag": "text", "attrs": {"x": 350, "y": 283, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "C"},
      {"tag": "text", "attrs": {"x": 267, "y": 155, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "E"},
      {"tag": "text", "attrs": {"x": 210, "y": 306, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "D"},
      {"tag": "text", "attrs": {"x": 168, "y": 332, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "3 cm"},
      {"tag": "text", "attrs": {"x": 286, "y": 332, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "6 cm"}
    ],
    "butterfly": [
      {"tag": "polygon", "attrs": {"points": [[160, 100], [280, 100], [220, 130]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[40, 220], [400, 220], [220, 130]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[160, 100], [280, 100], [400, 220], [40, 220]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "line", "attrs": {"x1": 160, "y1": 100, "x2": 400, "y2": 220, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 280, "y1": 100, "x2": 40, "y2": 220, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "polygon", "attrs": {"points": [[280, 100], [400, 220], [220, 130]], "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[160, 100], [40, 220], [220, 130]], "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "text", "attrs": {"x": 160, "y": 88, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "A"},
      {"tag": "text", "attrs": {"x": 280, "y": 88, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "B"},
      {"tag": "text", "attrs": {"x": 420, "y": 242, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "C"},
      {"tag": "text", "attrs": {"x": 25, "y": 242, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "D"},
      {"tag": "text", "attrs": {"x": 220, "y": 163, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "O"},
      {"tag": "text", "attrs": {"x": 220, "y": 60, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "AB = 4 cm"},
      {"tag": "text", "attrs": {"x": 220, "y": 285, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "DC = 12 cm"}
    ],
    "two-squares": [
      {"tag": "polygon", "attrs": {"points": [[80, 40], [280, 40], [280, 240], [80, 240]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[280, 115], [405, 115], [405, 240], [280, 240]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[80, 40], [280, 240], [405, 115]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[80, 40], [405, 40], [405, 240], [80, 240]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[80, 40], [80, 240], [280, 240]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "polygon", "attrs": {"points": [[280, 240], [405, 240], [405, 115]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "polygon", "attrs": {"points": [[80, 40], [405, 40], [405, 115]], "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "text", "attrs": {"x": 60, "y": 35, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "P"},
      {"tag": "text", "attrs": {"x": 280, "y": 270, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "Q"},
      {"tag": "text", "attrs": {"x": 426, "y": 117, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "R"},
      {"tag": "text", "attrs": {"x": 175, "y": 295, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "8 cm"},
      {"tag": "text", "attrs": {"x": 345, "y": 295, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "5 cm"},
      {"tag": "text", "attrs": {"x": 450, "y": 80, "fill": "teal", "font-size": 26, "text-anchor": "middle"}, "text": "3 cm", "show": 1}
    ],
    "roads": [
      {"tag": "polygon", "attrs": {"points": [[90, 50], [390, 50], [390, 250], [90, 250]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[90, 125], [390, 125], [390, 150], [90, 150]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[240, 50], [290, 50], [290, 250], [240, 250]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[240, 125], [290, 125], [290, 150], [240, 150]], "fill": "gold", "fill-opacity": 0.48, "stroke": "gold", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[240, 125], [290, 125], [290, 150], [240, 150]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "text", "attrs": {"x": 240, "y": 295, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "12 m"},
      {"tag": "text", "attrs": {"x": 440, "y": 160, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "8 m"},
      {"tag": "text", "attrs": {"x": 172, "y": 110, "fill": "teal", "font-size": 26, "text-anchor": "middle"}, "text": "横路宽 1 m"},
      {"tag": "text", "attrs": {"x": 320, "y": 34, "fill": "teal", "font-size": 26, "text-anchor": "middle"}, "text": "纵路宽 2 m"}
    ],
    "midpoints": [
      {"tag": "polygon", "attrs": {"points": [[220, 40], [70, 240], [370, 240]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[145, 140], [295, 140], [220, 240]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "line", "attrs": {"x1": 145, "y1": 140, "x2": 295, "y2": 140, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 295, "y1": 140, "x2": 220, "y2": 240, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 220, "y1": 240, "x2": 145, "y2": 140, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 70, "y1": 240, "x2": 295, "y2": 140, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[220, 40], [145, 140], [295, 140]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "polygon", "attrs": {"points": [[70, 240], [145, 140], [220, 240]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "polygon", "attrs": {"points": [[370, 240], [295, 140], [220, 240]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 2},
      {"tag": "text", "attrs": {"x": 220, "y": 28, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "A"},
      {"tag": "text", "attrs": {"x": 54, "y": 265, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "B"},
      {"tag": "text", "attrs": {"x": 388, "y": 265, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "C"},
      {"tag": "text", "attrs": {"x": 124, "y": 132, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "D"},
      {"tag": "text", "attrs": {"x": 317, "y": 132, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "E"},
      {"tag": "text", "attrs": {"x": 220, "y": 270, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "F"},
      {"tag": "text", "attrs": {"x": 220, "y": 312, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "BC = 12 cm；高 8 cm"}
    ],
    "opposite": [
      {"tag": "polygon", "attrs": {"points": [[80, 50], [380, 50], [380, 250], [80, 250]], "fill": "none", "fill-opacity": 1, "stroke": "chalk", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "polygon", "attrs": {"points": [[380, 50], [380, 250], [167.5, 125]], "fill": "orange", "fill-opacity": 0.48, "stroke": "orange", "stroke-width": 2.5, "stroke-linejoin": "round"}},
      {"tag": "line", "attrs": {"x1": 80, "y1": 50, "x2": 167.5, "y2": 125, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "line", "attrs": {"x1": 80, "y1": 250, "x2": 167.5, "y2": 125, "stroke": "chalk", "stroke-width": 2.5}},
      {"tag": "polygon", "attrs": {"points": [[80, 50], [80, 250], [167.5, 125]], "fill": "teal", "fill-opacity": 0.48, "stroke": "teal", "stroke-width": 2.5, "stroke-linejoin": "round"}, "show": 1},
      {"tag": "line", "attrs": {"x1": 80, "y1": 125, "x2": 380, "y2": 125, "stroke": "teal", "stroke-width": 2.5, "stroke-dasharray": "7 6"}, "show": 2},
      {"tag": "text", "attrs": {"x": 167.5, "y": 116, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "P"},
      {"tag": "text", "attrs": {"x": 220, "y": 86, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "18"},
      {"tag": "text", "attrs": {"x": 115, "y": 162, "fill": "chalk", "font-size": 26, "text-anchor": "middle"}, "text": "14"},
      {"tag": "text", "attrs": {"x": 298, "y": 160, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "?"},
      {"tag": "text", "attrs": {"x": 230, "y": 295, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "12 cm"},
      {"tag": "text", "attrs": {"x": 428, "y": 158, "fill": "gold", "font-size": 26, "text-anchor": "middle"}, "text": "8 cm"}
    ]
  };

  const clamp = (value) => Math.max(0, Math.min(1, value));
  const escapeText = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

  function drawing(shapes, frame) {
    const progress = clamp(frame - 1);
    const elements = shapes.map((shape) => {
      const attrs = { ...shape.attrs };
      Object.entries(shape.target || {}).forEach(([key, target]) => {
        attrs[key] = key === "points"
          ? attrs[key].map((point, i) => point.map((value, j) => value + (target[i][j] - value) * progress))
          : attrs[key] + (target - attrs[key]) * progress;
      });
      attrs.opacity = shape.show === undefined ? 1 : clamp(frame - shape.show + 1);
      if (shape.hide !== undefined) attrs.opacity *= 1 - clamp(frame - shape.hide + 1);
      if (shape.motion?.translate) {
        attrs.transform = `translate(${shape.motion.translate.map((value) => value * progress).join(" ")})`;
      }
      if (shape.motion?.rotate) {
        const [angle, x, y] = shape.motion.rotate;
        attrs.transform = `rotate(${angle * progress} ${x} ${y})`;
      }
      if (shape.motion?.matrix) {
        const identity = [1, 0, 0, 1, 0, 0];
        attrs.transform = `matrix(${shape.motion.matrix.map((value, i) => identity[i] + (value - identity[i]) * progress).join(" ")})`;
      }
      const attributes = Object.entries(attrs).map(([key, value]) => {
        const resolved = key === "points" ? value.map((point) => point.join(",")).join(" ") : (colors[value] || value);
        return `${key}="${escapeText(resolved)}"`;
      }).join(" ");
      return `<${shape.tag} ${attributes}>${escapeText(shape.text || "")}</${shape.tag}>`;
    }).join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 340"><rect width="480" height="340" fill="${colors.board}"/><g font-family="PingFang SC,Microsoft YaHei,system-ui,sans-serif">${elements}</g></svg>`;
  }

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll("[data-area-demo]").forEach((demo) => {
    const solution = demo.closest("details");
    const image = demo.querySelector(".area-demo-image");
    const controls = demo.querySelector(".area-demo-controls");
    const previous = controls.querySelector('[data-action="previous"]');
    const next = controls.querySelector('[data-action="next"]');
    const play = controls.querySelector('[data-action="play"]');
    const reset = controls.querySelector('[data-action="reset"]');
    const slider = controls.querySelector("input");
    const status = controls.querySelector(".area-demo-status");
    const steps = Array.from(solution.querySelectorAll(".area-steps li"));
    const title = demo.closest("article").querySelector("h4").textContent.slice(2);
    let frame = 0;
    let animation = null;
    let lastStep = -1;

    function render() {
      image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(drawing(scenes[demo.dataset.areaDemo], frame))}`;
      slider.value = String(frame);
      const step = Math.min(2, Math.floor(frame + 0.0001));
      if (step !== lastStep) {
        status.textContent = `${step + 1} / 3 · ${steps[step].textContent}`;
        lastStep = step;
      }
      const focused = controls.querySelector("button:focus");
      previous.disabled = frame === 0;
      next.disabled = frame === 2;
      reset.disabled = frame === 0;
      play.textContent = animation !== null ? "暂停" : motionPreference.matches ? "分步演示" : frame === 2 ? "重播演示" : "播放演示";
      play.setAttribute("aria-label", `${play.textContent}：${title}`);
      if (focused?.disabled) (frame === 0 ? next : previous).focus();
    }

    function pause() {
      if (animation !== null) cancelAnimationFrame(animation);
      animation = null;
    }

    function seek(value) {
      pause();
      frame = Math.max(0, Math.min(2, value));
      render();
    }

    previous.addEventListener("click", () => seek(Math.ceil(frame) - 1));
    next.addEventListener("click", () => seek(Math.floor(frame) + 1));
    reset.addEventListener("click", () => seek(0));
    slider.addEventListener("input", () => seek(Number(slider.value)));
    play.addEventListener("click", () => {
      if (animation !== null) { pause(); render(); return; }
      if (motionPreference.matches) { seek(frame === 2 ? 0 : Math.floor(frame) + 1); return; }
      if (frame === 2) frame = 0;
      const startingFrame = frame;
      let started = null;
      const tick = (now) => {
        // 首帧与后续帧统一用 rAF 时间戳，避免同一刷新周期内首帧早于点击时刻。
        if (started === null) started = now;
        frame = Math.min(2, startingFrame + (now - started) / 2400);
        if (frame === 2) animation = null;
        else animation = requestAnimationFrame(tick);
        render();
      };
      animation = requestAnimationFrame(tick);
      render();
    });
    solution.addEventListener("toggle", () => { if (!solution.open) { pause(); render(); } });
    document.addEventListener("visibilitychange", () => { if (document.hidden) { pause(); render(); } });
    motionPreference.addEventListener("change", () => { pause(); render(); });
    render();
    controls.hidden = false;
  });
})();
