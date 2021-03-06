module('Path Length');

test('path.length', function() {
	var path = new Path([
		new Segment(new Point(121, 334), new Point(-19, 38), new Point(30.7666015625, -61.53369140625)),
		new Segment(new Point(248, 320), new Point(-42, -74), new Point(42, 74))
	]);

	var length = path.length;
	compareNumbers(length, 172.10122680664062);

	var param = path.curves[0].getParameter(length / 4);
	compareNumbers(param, 0.2255849553116685);
});

test('curve.getParameter with straight curve', function() {
	var path = new Path();
	path.moveTo(100, 100);
	path.lineTo(500, 500);
	var curve = path.curves[0];
	var length = curve.length;
	var t = curve.getParameter(length / 3);
	compareNumbers(t, 0.3869631475722452);
});
