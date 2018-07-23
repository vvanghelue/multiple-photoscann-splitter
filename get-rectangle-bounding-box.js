
const distanceBetweenTwoPoints = (pointA, pointB) => {
	return Math.sqrt(
		Math.pow(pointA[0] - pointB[0], 2)
		+ 
		Math.pow(pointA[1] - pointB[1], 2)
	)
}

const pointsAreEquals = (pointA, pointB) => {
	return pointA[0] == pointB[0] && pointA[1] == pointB[1]
}

const getRectangleFromTriangle = (points) => {
	let rightAnglePoint

	let shortedSumDistanceToOthers = Infinity
	for (point of points) {

		let distance = 0
		for (peer of points) {
			if (pointsAreEquals(point, peer)) {
				continue
			}
			distance += distanceBetweenTwoPoints(point, peer)
		}

		if (distance < shortedSumDistanceToOthers) {
			rightAnglePoint = point
			shortedSumDistanceToOthers = distance
		}
	}

	const hypotenusePoints = points.filter(point => !pointsAreEquals(point, rightAnglePoint))

	const missingPoint = [
		rightAnglePoint[0] - (rightAnglePoint[0] - hypotenusePoints[0][0]) - (rightAnglePoint[0] - hypotenusePoints[1][0]),
		rightAnglePoint[1] - (rightAnglePoint[1] - hypotenusePoints[0][1]) - (rightAnglePoint[1] - hypotenusePoints[1][1]),
	]

	console.log(rightAnglePoint[0], hypotenusePoints[0][0], hypotenusePoints[1][0])

	points.push(missingPoint)

	return points
}

/*
 * @input [[2, 0], [1, 4], [5, 9]]
 */
const getRectangleBoundingBox = (points = []) => {
	let topY, rightX, bottomY, leftX

	// get rectangele if needed
	points = getRectangleFromTriangle(points.slice(0, 3))

	topY = Math.max(points[0][1], points[1][1], points[2][1], points[3][1])
	bottomY = Math.min(points[0][1], points[1][1], points[2][1], points[3][1])
	rightX = Math.max(points[0][0], points[1][0], points[2][0], points[3][0])
	leftX = Math.min(points[0][0], points[1][0], points[2][0], points[3][0])

	return [
		[leftX, topY], // topLeft
		[rightX, topY], // topRight
		[rightX, bottomY], // bottomRight
		[leftX, bottomY] // bottomLeft
	]
}