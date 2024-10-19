const os = require("os");

console.log("Architecture: ", os.arch());
console.log("Cores: ", os.cpus());
console.log("Free Memory: ", os.freemem() / (1024 * 1024));
console.log("Home Directory:", os.homedir());
console.log("Host Name:", os.hostname());
console.log("Operating System:", os.release());
console.log("Total Memory:", os.totalmem() / (1024 * 1024 * 1024));
console.log("Up Time:", os.uptime());
