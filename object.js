//For Each property in a object
Object.prototype.forEach = function (fun, newThis) {
	var _this = newThis || this;

	if (this == null)
		throw new TypeError('this is null or not defined');
	if (typeof fun !== "function")
		throw new TypeError(fun + " is not a function");

	for (var property in _this) {
		if (_this.hasOwnProperty(property) && typeof _this[property] !== "function")
			fun.call(_this, _this[property], property, _this);
	}
};

//If ANY property of the json satisfies the condition
Object.prototype.some = function (fun, newThis) {
	var _this = newThis || this;

	if (this == null)
		throw new TypeError('this is null or not defined');
	if (typeof fun !== "function")
		throw new TypeError(fun + " is not a function");

	for (var property in _this) {
		if (_this.hasOwnProperty(property) && typeof _this[property] !== "function") {
			if (fun.call(_this, _this[property], property, _this)) {
				return true;
			}
		}
	}
	return false;
};

//If ALL property of the json satisfies the condition
Object.prototype.every = function (fun, newThis) {
	var _this = newThis || this;

	if (this == null)
		throw new TypeError('this is null or not defined');
	if (typeof fun !== "function")
		throw new TypeError(fun + " is not a function");

	for (var property in _this) {
		if (_this.hasOwnProperty(property) && typeof _this[property] !== "function") {
			if (!fun.call(_this, _this[property], property, _this)) {
				return false;
			}
		}
	}
	return true;
};

//Returns an array from a mapped object
Object.prototype.map = function (fun, newThis) {
	var _this = newThis || this,
		arr = [],
		temp;

	if (this == null)
		throw new TypeError('this is null or not defined');
	if (typeof fun !== "function")
		throw new TypeError(fun + " is not a function");

	for (var property in _this) {
		if (_this.hasOwnProperty(property) && typeof _this[property] !== "function") {
			temp = fun.call(_this, _this[property], property, _this);
			if (temp !== undefined) arr.push(temp);
		}
	}
	return arr;
};

Object.prototype.map = function (fun, newThis) {
	var _this = newThis || this,
		arr = [],
		temp;

	if (this == null)
		throw new TypeError('this is null or not defined');
	if (typeof fun !== "function")
		throw new TypeError(fun + " is not a function");

	for (var property in _this) {
		if (_this.hasOwnProperty(property) && typeof _this[property] !== "function") {
			temp = fun.call(_this, _this[property], property, _this);
			if (temp !== undefined) arr.push(temp);
		}
	}
	return arr;
};

//Examples.
var a = {
	"x": 12,
	"y": 23,
	"z": 200,
	"w": function () {
		console.log("hello world");
	}
};

a.forEach(function (element, index, obj) {
	console.log(element);
	obj[index] += 2;
});

console.log(a.some(function (element) {
	return element > 100;
}));

console.log(a.every(function (element) {
	return element > 1000;
}));

console.log(a.map(function (element) {
	if (element > 20) return element;
}));


var x = [[1, 2], [3, 4], [5, 6]];

console.log(x.reduce(function (a, b) {
	return a.concat(b);
}));