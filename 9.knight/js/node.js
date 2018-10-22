function Node(n) {
	this.node = document.querySelector(n);
}




Node.prototype.hide = function() {
	this.node.style.display = 'none';
};



Node.prototype.show = function() {
	this.node.style.display = 'block';
};



Node.prototype.addEvent = function(type, cb) {
	this.node.addEventListener(type, cb);
};



Node.prototype.append = function(child) {
	this.node.appendChild(child);
};



Node.prototype.remove = function(child) {
	this.node.removeChild(child);
};



Node.prototype.text = function(s=null) {
	if (s === null) return this.node.innerText;
	else this.node.innerText = s;
};



Node.prototype.val = function(v=null) {
	if (v === null) return this.node.value;
	else this.node.value = s;
};


