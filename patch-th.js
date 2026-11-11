const fs = require("fs");
let s = fs.readFileSync("index.html", "utf8");
function rep(x, y) {
  const n = s.split(x).length - 1;
  if (n !== 1) { console.log("위치 불일치(" + n + "):", x.slice(0, 80)); process.exit(1); }
  s = s.replace(x, () => y);
}
// 옆면 사진(phi = ±90도)은 거의 완전히 옆을 향한 면에만 쓴다
rep('"    float w = um * smoothstep(0.55, 0.85, dot(fn, vec3(" + s + ", 0.0, " + c + ")));\n" +', '"    float w = um * smoothstep(" + (Math.abs(v.phi) > 1.4 ? "0.84, 0.97" : "0.55, 0.85") + ", dot(fn, vec3(" + s + ", 0.0, " + c + ")));\n" +');
rep('return "face-projected-6"; };', 'return "face-projected-7"; };');
fs.writeFileSync("index.html", s);
console.log("패치 완료");
