const ctx = canvas.getContext("2d");
const cx = canvas.width / 2;
const cy = canvas.height / 2;
const scale = 40;
let t = 0;

function toCanvas(x, y) {
    return {
        x: cx + x * scale,
        y: cy - y * scale
    };
}

function drawCake() {
    function layer(yB, yT, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let x = -4.5; x <= 4.5; x += 0.05) {
            let p = toCanvas(x, yT);
            if (x === -4.5) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        }
        for (let x = 4.5; x >= -4.5; x -= 0.05) {
            let p = toCanvas(x, yB);
            ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.fill();
    }

    layer(-2, 0.5, "#613515ff");
    layer(0.5, 3, "#ab7046ff");
    layer(2, 3.2, "#f7bb86ff");

    ctx.fillStyle = "#f7bb86ff";
    ctx.beginPath();
    for (let x = -4.5; x <= 4.5; x += 0.05) {
        let y = 3.5 + 0.15 * Math.sin(5 * x + t);
        let p = toCanvas(x, y);
        if (x === -4.5) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    }
    let pr = toCanvas(4.5, 3.2);
    let pl = toCanvas(-4.5, 3.2);
    ctx.lineTo(pr.x, pr.y);
    ctx.lineTo(pl.x, pl.y);
    ctx.closePath();
    ctx.fill();
}

function drawFire() {
    ctx.save();
    const flicker = Math.sin(t * 6) * 0.08 + Math.random() * 0.02;
    ctx.shadowColor = "rgba(255, 180, 50, 0.6)";
    ctx.shadowBlur = 15;
    ctx.fillStyle = "rgba(255, 245, 200, 0.95)";
    ctx.beginPath();
    for (let x = -0.12; x <= 0.22; x += 0.001) {
        let y = -22 * x * x + 5.9 + flicker;
        let p = toCanvas(x, y);
        if (x === -0.12) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255, 140, 0, 0.75)";
    ctx.beginPath();
    for (let x = -0.22; x <= 0.22; x += 0.001) {
        let y = -16 * x * x + 5.7 + flicker;
        let p = toCanvas(x, y);
        if (x === -0.22) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawText() {
    let size = 26 + 2 * Math.sin(t);
}

function drawCandle() {
    ctx.fillStyle = "#496dedff";
    let p = toCanvas(-0.25, 4.8);
    ctx.fillRect(p.x, p.y, 0.5 * scale, 2 * scale);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFire();
    drawCandle();
    drawCake();
    drawText();

    t += 0.05;
    requestAnimationFrame(animate);
}

animate();
