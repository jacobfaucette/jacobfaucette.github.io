
// const myTimeout1 = setTimeout(command_line1, 200);
// function command_line1() {
//     document.getElementById("command_line1").innerHTML = "Velok 400 CPU at 4.56MHz , 4 Processor(s)"
// }

// const myTimeout2 = setTimeout(command_line2, 600);
// function command_line2() {
//     let memSpeed = 150;
//     let memTestStart = 0;
//     let offset = 26214;
//     function loop() {
//         if (memTestStart < 262144) {
//             document.getElementById("command_line2").innerHTML = "Memory Test : " + memTestStart + "B";
//             memTestStart += offset;
//             setTimeout(loop, memSpeed)

//         }
//         else {
//             document.getElementById("command_line2").innerHTML = "Memory Test : 262144B OK"
//         }
//     }
//     loop();
    
// }

// const myTimeout3 = setTimeout(command_line3, 2400);
// function command_line3() {
//     document.getElementById("command_line3").innerHTML = "Memory Installed : 256K DRAM"
// }

// const myTimeout4 = setTimeout(command_line4, 2700);
// function command_line4() {
//     document.getElementById("command_line4").innerHTML = "Pri. Master Disk : 327680B"
// }

// const myTimeout5 = setTimeout(command_line5, 3000);
// function command_line5() {
//     document.getElementById("command_line5").innerHTML = "Pri. Slave Disk : 131072B"
// }

// const myTimeout6 = setTimeout(command_line6, 3500);
// function command_line6() {
//     document.getElementById("command_line6").innerHTML = "Serial Port(s) : S23P"
// }

// const myTimeout7 = setTimeout(command_line7, 3750);
// function command_line7() {
//     document.getElementById("command_line7").innerHTML = "Parallel Port (s) : 267"
// }

// const myTimeout8 = setTimeout(command_line8, 4000);
// function command_line8() {
//     let textSpeed = 200;
//     let stringStart = 0;
//     let initialString = "Initialization"
//     function loop() {
//         if (stringStart < 8) {
//             document.getElementById("command_line8").innerHTML = initialString
//             initialString += ".";
//             stringStart ++;
//             setTimeout(loop, textSpeed);
//         }
//         else {
//             document.getElementById("command_line8").innerHTML = "Initialization........ finished"
//         }
//     }
//     loop();
// }

const timer = ms => new Promise(res => setTimeout(res, ms));
class Line {
    constructor(fn, args, delay) {
        this.fn = (p, d) => { fn(p, ...args, d) };
        this.delay = delay;
    }
    async execute(parent) {
        let p = document.createElement("p");
        parent.appendChild(p);
        this.fn(p, this.delay);
        await timer(this.delay);
    }
}
async function extend(parent, prefix, symbol, suffix, end, delay) {
    parent.innerHTML = prefix;
    for (let i = 0; i < end; i++) {
        parent.innerHTML += symbol;
        await timer(delay);
    }
    parent.innerHTML += suffix;
}
async function count(parent, prefix, unit, start, end, offset, delay) {
    for (let i = start; i <= end; i += offset) {
        parent.innerHTML = `${prefix}${i}${unit}`;
        await timer(delay);
    };
}
function write(parent, line, delay) {
    setTimeout(() => { parent.innerHTML = line }, delay);
}
async function writePage(parent) {
    const lines = [
        new Line(write, ["Velok 400 CPU at 4.56MHz , 4 Processor(s)"], 200),
        new Line(count, ["Memory Test : ", "KB", 0, 131072, 1024], 20),
        new Line(write, ["Memory Installed : 256K DRAM"], 5000),
        new Line(write, ["Pri. Master Disk : 327680B"], 2700),
        new Line(write, ["Pri. Slave Disk : 131072B"], 3000),
        new Line(write, ["Serial Port(s) : S23P"], 3500),
        new Line(write, ["Parallel Port (s) : 267"], 3750),
        new Line(extend, ["Initialization", ".", "Finished", 8], 500),
    ];
    for (const line of lines) {
        await line.execute(parent);
    }
}
const bodyText = document.getElementById("text");
window.onload = async () => {
    writePage(bodyText);
}