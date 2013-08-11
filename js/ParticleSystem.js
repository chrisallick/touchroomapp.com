Particle = function( _x, _y ) {
	var self = this;
	this.x = _x;
	this.y = _y;
	this.x2 = _x + getRandomInt( -800, 500 );
	this.y2 = _y + getRandomInt( -800, 500 );
	this.vx = getRandomArbitary(2,10);
	this.vy = getRandomArbitary(2,10);
}

ParticleSystem = function( _w, _h, _num ) {
	var self = this;
	this.particles = new Array();
	this.w = _w;
	this.h = _h;
	this.canvas = $("#humans")[0];
	this.ctx = self.canvas.getContext("2d");
	this.loaded = false;

	this.create = function() {
		self.canvas.width = self.w;
		self.canvas.height = self.h;
		for( var i = 0; i < _num; i++ ) {
			self.particles.push( new Particle( getRandomInt(0, self.w ), getRandomInt( 0, self.h) ) );
		}
		self.loaded = true;
	}

	this.update = function() {
		for( i = 0, len = self.particles.length; i < len; i++ ) {
			self.particles[i].x += (self.particles[i].x2 - self.particles[i].x) * .005;
			self.particles[i].y += (self.particles[i].y2 - self.particles[i].y) * .004;
		}
	}

	this.render = function() {
		self.ctx.clearRect(0,0,self.w,self.h);
		//console.log("cool");
		if (self.canvas.getContext) {
			for( i = 0, len = self.particles.length; i < len; i++ ) {
				self.ctx.fillStyle = "#3EAAC3";
				self.ctx.beginPath();
				self.ctx.arc(self.particles[i].x, self.particles[i].y, 10, 0, Math.PI*2, true); 
				self.ctx.closePath();
				self.ctx.fill();
				//ctx.drawImage( self.particles[i].image, self.particles[i].x, this.particles[i].y, this.particles[i].width*this.particles[i].scale, this.particles[i].height*self.particles[i].scale );
			}
		}
	}

	self.create();
}