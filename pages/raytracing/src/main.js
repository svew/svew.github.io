
CANVAS_WIDTH = 500
CANVAS_HEIGHT = 500

var cameraX = 0
var cameraY = 0
var cameraZ = 1

// Get all of the objects that exist in the world
function getWorld() {

	let sphereMaterial = new Material(0.2, 1.0, 0.2, COLORS.RED)
	let groundMaterial = new Material(0.5, 0.9, 0.7, COLORS.WHITE)
	let mirrorMaterial = new Material(0.9, 0.0, 0.3, COLORS.WHITE)

	// Push objects
	let objects = []
	objects.push(new Sphere(new Vector(0.0, 0, 2.0), 0.5, mirrorMaterial)) //Large
	objects.push(new Sphere(new Vector(-0.5, 0.5, 2.0), 0.2, sphereMaterial)) //Small
	objects.push(new Sphere(new Vector(-0.5, -0.5, 2.0), 0.35, sphereMaterial)) //Medium

	objects.push(new Plane(new Vector(0, -1.0, 0), new Vector(0, 1, 0), groundMaterial))
	//objects.push(new Plane(new Vector(0, 0, 3.0), new Vector(0, 0, 1), groundMaterial))


	let cuboid = new Cuboid([
		//LEFT POINTS
		new Vector(-2, 0.2, 3.0), // TOP LEFT -Z
		new Vector(-2, -0.2, 3.0), // BOTTOM LEFT -Z

		//FRONT POINTS
		new Vector(-1.3, 0.25, 2.0), // TOP RIGHT Z
		new Vector(-1.3, -0.1, 2.0), // BOTTOM RIGHT -Z

		//BACK POINTS
		new Vector(-1.3, 0.2, 4.0), // TOP LEFT Z
		new Vector(-1.3, -0.1, 4.0), // BOTTOM LEFT Z

		//RIGHT POINTS
		new Vector(-0.7, 0.2, 3.0), // TOP RIGHT Z
		new Vector(-0.7, -0.2, 3.0) // BOTTOM RIGHT -Z

	], new Vector(1, 1, 1), sphereMaterial)

	//Make cube
	for(let i = 0; i < cuboid.rects.length; i++) {
		objects.push(cuboid.rects[i].triangles[0])
		objects.push(cuboid.rects[i].triangles[1])
	}

	// Push lights
	let lights = []

	// SUN!
	lights.push(new SunLight(new Vector(-1, -5, 0.5), COLORS.WHITE, 3))

	//lights.push(new PointLight(new Vector(0, 7, 2), COLORS.GREEN, 300)) //Green
	lights.push(new PointLight(new Vector(-2, 0.9, 1), COLORS.RED, 100)) //Red
	//lights.push(new PointLight(new Vector(2, -5, -1), COLORS.BLUE, 200)) //Blue
	//lights.push(new PointLight(new Vector(-1, -1, -1), COLORS.WHITE, 300))

	let backgroundColor = new Vector(0.3, 0.3, 0.7)
	let aperature = 1.0 // How much light we collect from the world

	let camera = new PerspectiveCamera(new Vector(cameraX, cameraY, cameraZ), new Vector(0, 0.5, -1), 30)

	return {
		objects: objects,
		lights: lights,
		backgroundColor: backgroundColor,
		aperature: aperature,
		camera: camera,
	}
}

function main() {
	var canvas = document.getElementById('theCanvas')
	var context = canvas.getContext('2d', {antialias: false, depth: false})
	var imageData = context.getImageData(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
	var world = getWorld()
	render(world, imageData, CANVAS_WIDTH, CANVAS_HEIGHT, MAX_RAY_BOUNCES)
	context.putImageData(imageData, 0, 0)
	console.log("New Image data posted")
	console.log(new Vector(cameraX, cameraY, cameraZ))
	window.onkeypress = handleKeyPress
}

function handleKeyPress(event) {
	var ch = getChar(event)
	switch(ch) {
		case 'x':
			cameraX += 0.05
			main()
			break
		case 'X':
			cameraX -= 0.05
			main()
			break
		case 'y':
			cameraY += 0.05
			main()
			break
		case 'Y':
			cameraY -= 0.05
			main()
			break
		case 'z':
			cameraZ += 0.5
			main()
			break
		case 'Z':
			cameraZ -= 0.5
			main()
			break
		default:
			return
	}
}

function getChar(event) {
	if(event.which == null) {
		return String.fromCharCode(event.keyCode)
	} else if(event.which!=0 && event.charCode!=0) {
		return String.fromCharCode(event.which)
	} else {
		return null
	}
}
