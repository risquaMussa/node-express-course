const names = require("./04-names.js");
const sayHi = require("./05-utils.js");
const altData = require("./06-alternative-flavor.js");
require("./07-mind-grenade.js");

sayHi("Susan");
sayHi(names.john);
sayHi(names.peter);

console.log(altData);
console.log("This is the main module running!");
console.log(altData.item);
