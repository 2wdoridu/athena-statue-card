const fs = require("fs");
let s = fs.readFileSync("index.html", "utf8");
function rep(x, y) {
  const n = s.split(x).length - 1;
  if (n !== 1) { console.log("위치 불일치(" + n + "):", x.slice(0, 70)); process.exit(1); }
  s = s.replace(x, () => y);
}
// 위나 아래를 향한 면에는 사진을 입히지 않는다(사진은 옆에서 본 면만 담고 있다)
rep('"  float wsum = wf + wb + wl + wr;\n" +', '"  float wsum = (wf + wb + wl + wr) * (1.0 - smoothstep(0.35, 0.75, abs(on.y)));\n" +');
rep('"  float detail = mix(1.0, dsum / (wsum + 0.0001), smoothstep(0.004, 0.06, wsum));\n" +', '"  float detail = mix(1.0, dsum / (wf + wb + wl + wr + 0.0001), smoothstep(0.004, 0.06, wsum));\n" +');
// 목 구간 보정은 제거(원인이 아님)
rep('"  float neck = smoothstep(0.52, 0.55, vOP.y) * (1.0 - smoothstep(0.672, 0.70, vOP.y));\n" +\n      "  detail = mix(detail, 1.0, 0.85 * neck);\n" +\n', '');
fs.writeFileSync("index.html", s);
console.log("패치 완료");
