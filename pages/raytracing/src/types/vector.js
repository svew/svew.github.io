/*
	i, j, k: Integers denoting direction vector is going in.
*/
var Vector = function(x, y, z) {
	this.x = x
	this.y = y
	this.z = z
}

Vector.prototype.add = function(v) {
	if(typeof v == "number") {
		v = new Vector(v, v, v)
	}
	return new Vector(this.x + v.x, this.y + v.y, this.z + v.z)
}
Vector.prototype.subtract = function(v) {
	if(typeof v == "number") {
		v = new Vector(v, v, v)
	}
	return new Vector(this.x - v.x, this.y - v.y, this.z - v.z)
}
Vector.prototype.multiply = function(v) {
	if(typeof v == "number") {
		v = new Vector(v, v, v)
	}
	return new Vector(this.x * v.x, this.y * v.y, this.z * v.z)
}
Vector.prototype.divide = function(v) {
	if(typeof v == "number") {
		v = new Vector(v, v, v)
	}
	return new Vector(this.x / v.x, this.y / v.y, this.z / v.z)
}
Vector.prototype.cross = function(v) {
	let sx = this.y*v.z - this.z*v.y
	let sy = this.z*v.x - this.x*v.z
	let sz = this.x*v.y - this.y*v.x
	return new Vector(sx, sy, sz)
}
Vector.prototype.reverse = function() {
	return this.multiply(-1)
}
Vector.prototype.normalize = function() {
	let len = this.len()
	return new Vector(this.x/len, this.y/len, this.z/len)
}
Vector.prototype.len = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
}
Vector.prototype.dot = function(v) {
	return this.x*v.x + this.y*v.y + this.z*v.z
}
Vector.prototype.cosangle = function(v) {
	return this.dot(v).divide(this.len()).divide(v.len())
}
Vector.prototype.angle = function(v) {
	return Math.acos(this.cosangle(v))
}
Vector.prototype.string = function() {
	return "<" + this.x + ", " + this.y + ", " + this.z + ">"
}
Vector.prototype.rotateX = function(degrees) {
	let rads = degrees / 180 * Math.PI
	let sx = this.x
	let sy = this.y * Math.cos(rads) - this.z * Math.sin(rads)
	let sz = this.y * Math.sin(rads) + this.z * Math.cos(rads)
	return new Vector(sx, sy, sz)
}
Vector.prototype.rotateY = function(degrees) {
	let rads = degrees / 180 * Math.PI
	let sx = this.x * Math.cos(rads) + this.z * Math.sin(rads)
	let sy = this.y
	let sz = this.z * Math.cos(rads) - this.x * Math.sin(rads)
	return new Vector(sx, sy, sz)
}
Vector.prototype.rotateZ = function(degrees) {
	let rads = degrees / 180 * Math.PI
	let sx = this.x * Math.cos(rads) - this.y * Math.sin(rads)
	let sy = this.x * Math.sin(rads) + this.y * Math.cos(rads)
	let sz = this.z
	return new Vector(sx, sy, sz)
}



/*
	start: Origin Point of the light ray.
	direction: Vector direction of light ray.
*/
var Ray = function(start, direction) {
	this.start = start
	this.direction = direction
}

Ray.prototype.string = function() {
	return "Ray {start: " + this.start.string() + ", direction: " + this.direction.string() + "}"
}