const pathCanvas = document.getElementById('path-canvas');
const distCanvas = document.getElementById('distribution-canvas');
const pCtx = pathCanvas.getContext('2d');
const dCtx = distCanvas.getContext('2d');

// State
let simulations = [];
let params = {
    a: 1.0,
    v: 0.5,
    z: 0.5,
    s: 0.1,
    dt: 0.01
};

// UI Elements
const inputs = {
    boundary: document.getElementById('boundary'),
    drift: document.getElementById('drift'),
    bias: document.getElementById('bias'),
    noise: document.getElementById('noise')
};

const vals = {
    a: document.getElementById('a-val'),
    v: document.getElementById('v-val'),
    z: document.getElementById('z-val'),
    s: document.getElementById('s-val')
};

function updateParams() {
    params.a = parseFloat(inputs.boundary.value);
    params.v = parseFloat(inputs.drift.value);
    params.z = parseFloat(inputs.bias.value);
    params.s = parseFloat(inputs.noise.value);

    vals.a.textContent = params.a.toFixed(2);
    vals.v.textContent = params.v.toFixed(2);
    vals.z.textContent = params.z.toFixed(2);
    vals.s.textContent = params.s.toFixed(2);
}

Object.values(inputs).forEach(input => {
    input.addEventListener('input', updateParams);
});

function resize() {
    pathCanvas.width = pathCanvas.clientWidth;
    pathCanvas.height = pathCanvas.clientHeight;
    distCanvas.width = distCanvas.clientWidth;
    distCanvas.height = distCanvas.clientHeight;
    draw();
}

window.addEventListener('resize', resize);
resize();

function simulateTrial() {
    const { a, v, z, s, dt } = params;
    let x = a * z;
    const path = [x];
    let t = 0;
    const maxT = 1000; // safety

    while (x > 0 && x < a && t < maxT) {
        // dX = v*dt + s*dW
        const dw = Math.sqrt(dt) * (Math.random() * 2 - 1) * Math.sqrt(3); // uniform approx of normal
        // Improved normal approx: Box-Muller
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

        x += v * dt + s * z0;
        path.push(Math.max(0, Math.min(x, params.a)));
        t++;
    }

    return {
        path,
        rt: t * dt,
        choice: x >= a ? 1 : 0
    };
}

function draw() {
    pCtx.clearRect(0, 0, pathCanvas.width, pathCanvas.height);
    dCtx.clearRect(0, 0, distCanvas.width, distCanvas.height);

    const margin = 40;
    const w = pathCanvas.width - margin * 2;
    const h = pathCanvas.height - margin * 2;

    // Draw boundaries
    pCtx.strokeStyle = '#f85149';
    pCtx.lineWidth = 2;

    // Top boundary
    pCtx.beginPath();
    pCtx.moveTo(margin, margin);
    pCtx.lineTo(margin + w, margin);
    pCtx.stroke();

    // Bottom boundary
    pCtx.beginPath();
    pCtx.moveTo(margin, margin + h);
    pCtx.lineTo(margin + w, margin + h);
    pCtx.stroke();

    // Scale Y based on a
    const scaleY = (val) => margin + h - (val / params.a) * h;
    const maxPathLen = Math.max(...simulations.map(s => s.path.length), 200);
    const scaleX = (idx) => margin + (idx / maxPathLen) * w;

    // Draw paths
    pCtx.lineWidth = 4; // Extra thick for maximum visibility
    // Only draw the last 2 trials as requested
    const visibleSims = simulations.slice(-2);
    visibleSims.forEach(sim => {
        const color = sim.choice === 1 ? '#889E81' : '#BC6C51';
        pCtx.strokeStyle = color; // CRISP SOLID COLOR
        pCtx.beginPath();
        pCtx.moveTo(scaleX(0), scaleY(sim.path[0]));
        sim.path.forEach((val, idx) => {
            pCtx.lineTo(scaleX(idx), scaleY(val));
        });
        pCtx.stroke();
    });

    // Label boundaries
    pCtx.fillStyle = '#000000'; // High contrast black
    pCtx.font = '800 20px Inter, system-ui';
    pCtx.fillText('CORRECT BOUNDARY (A)', margin, margin - 15);
    pCtx.fillText('INCORRECT BOUNDARY (0)', margin, margin + h + 30);

    // Draw Distribution
    drawDistribution();
}

function drawDistribution() {
    if (simulations.length === 0) return;

    const rtsUpper = simulations.filter(s => s.choice === 1).map(s => s.rt);
    const rtsLower = simulations.filter(s => s.choice === 0).map(s => s.rt);

    const bins = 60;
    const allRts = simulations.map(s => s.rt);
    const maxRt = Math.max(...allRts, 1);

    const getHist = (data) => {
        const hist = new Array(bins).fill(0);
        data.forEach(rt => {
            const b = Math.min(Math.floor((rt / maxRt) * bins), bins - 1);
            hist[b]++;
        });
        return hist;
    };

    const histUpper = getHist(rtsUpper);
    const histLower = getHist(rtsLower);
    const maxCount = Math.max(...histUpper, ...histLower, 1);

    const bw = (distCanvas.width - 80) / bins;
    const dh = distCanvas.height / 2;
    const startX = 40;

    // Draw axis label
    dCtx.fillStyle = '#000000'; // High contrast black
    dCtx.font = '800 18px Inter, system-ui';
    dCtx.fillText('Reaction Time (seconds) →', startX, distCanvas.height - 15);

    // Upper (Correct)
    dCtx.fillStyle = '#889E81';
    histUpper.forEach((count, i) => {
        const barH = (count / maxCount) * (dh - 20);
        drawRoundedRect(dCtx, startX + i * bw, dh - barH, bw - 2, barH, 2);
    });

    // Lower (Incorrect)
    dCtx.fillStyle = '#BC6C51';
    histLower.forEach((count, i) => {
        const barH = (count / maxCount) * (dh - 20);
        drawRoundedRect(dCtx, startX + i * bw, dh, bw - 2, barH, 2);
    });
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

document.getElementById('run-btn').addEventListener('click', () => {
    // Run exactly 1 trial as requested
    simulations.push(simulateTrial());
    draw();
});

document.getElementById('clear-btn').addEventListener('click', () => {
    simulations = [];
    draw();
});

updateParams();
draw();
