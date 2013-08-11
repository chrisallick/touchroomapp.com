Particle = function( _x, _y, _w, _h ) {
	var self = this;
	this.w = _w;
	this.h = _h;
	this.x = _x;
	this.y = _y;

	this.pickDestination = function() {
		self.x2 = self.w/2 + getRandomInt( -self.w/2+200, self.w/2-200 );
		self.y2 = self.h/2 + getRandomInt( -self.h/2+25, self.h/2-25 );
		this.vx = 0.03 + (0.01-0.03)*Math.random();
		this.vy = 0.03 + (0.01-0.03)*Math.random();
	}

	self.pickDestination();
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
			self.particles.push( new Particle( getRandomInt(0, self.w ), getRandomInt( 0, self.h), self.w, self.h ) );
		}
		self.loaded = true;
	}

	this.update = function() {
		for( i = 0, len = self.particles.length; i < len; i++ ) {
			self.particles[i].x += (self.particles[i].x2 - self.particles[i].x) * self.particles[i].vx;
			self.particles[i].y += (self.particles[i].y2 - self.particles[i].y) * self.particles[i].vy;
			if( Math.abs(self.particles[i].x - self.particles[i].x2) < 10 && Math.abs(self.particles[i].y - self.particles[i].y2) < 10 ) {
				self.particles[i].pickDestination();
			}
		}
	}

	this.render = function() {
		self.ctx.clearRect(0,0,self.w,self.h);
		//console.log("cool");
		if (self.canvas.getContext) {
			for( i = 0, len = self.particles.length; i < len; i++ ) {
				self.ctx.fillStyle = "rgba(209,232,226,160)";
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