function map(a,b,c,d,f,g) {
	var h = (a - b) / (c - b) * (f - d) + d;
	return g ? d < f ? this.constrain(h,d,f) : this.constrain(h,f,d) : h
}


function constrain(a,b,c) {
		return Math.max(Math.min(a, c), b);
}


function lerp(a,b,c) {
	return c * (b - a) + a;
}


function intersectRect(r1, r2) {
	return !(r1.x > r2.x+r2.w || 
					r1.x+r1.w < r2.x || 
					r1.y > r2.y+r2.h || 
					r1.y+r1.h < r2.y);
}


