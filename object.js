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


//Applies a function simultaneously to two values from a object
Object.prototype.reduce = function (fun, newThis) {
	var _this = newThis || this,
		attr = [],
		temp;

	if (this == null)
		throw new TypeError('this is null or not defined');
	if (typeof fun !== "function")
		throw new TypeError(fun + " is not a function");

	for (var property in _this) {
		if (_this.hasOwnProperty(property) && typeof _this[property] !== "function") {
			attr.push(property);
		}
	}

	temp = _this[attr[0]];
	for (var i = 1; i < attr.length; i++) {
		temp = fun.call(_this, temp, _this[attr[i]], attr[i], _this)
	}

	return temp;
};

//Nested some this includes nested JSONs
Object.prototype.nestedSome = function (fun, newThis) {
	var _this = newThis || this;

	if (this == null)
		throw new TypeError('this is null or not defined');
	if (typeof fun !== "function")
		throw new TypeError(fun + " is not a function");

	for (var property in _this) {
		if (_this.hasOwnProperty(property) && typeof _this[property] !== "function") {
			if (typeof _this[property] === "object") {
				if (_this[property].nestedSome(fun, _this[property]))
					return true;
			} else {
				if (fun.call(_this, _this[property], property, _this))
					return true;
			}
		}
	}
	return false;
};

//Nested every this includes nested JSONs.
Object.prototype.nestedEvery = function (fun, newThis) {
	;
};

//Tests.
var a = {
	"x": {
		"x": {
			"x": 25,
			"y": 66
		},
		"y": 2333
	},
	"y": 23,
	"z": 200,
	"w": function () {
		console.log("hello world");
	}
};

a.forEach(function (element, index, obj) {
	console.log(element);
	if (typeof obj[index] === "number")
		obj[index] += 2;
});

a.forEach(function (element, index, obj) {
	console.log(element);
});

console.log(a.some(function (element) {
	return element > 100;
}));

console.log(a.every(function (element) {
	return element > 1000;
}));

console.log(a.map(function (element) {
	if (element > 20 && typeof element === "number") return element;
}));

console.log(a.reduce(function (a, b) {
	return a + b;
}));

console.log({
	"x": 100,
	"y": {
		"x": 23,
		"y": 900
	}
}.nestedSome(function (ele) {
		return ele < 22;
	}));