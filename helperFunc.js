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



