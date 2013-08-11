var canvas, ctx, ps, w, h;

function Particle( _parent, _x, _y, _v, _s ) {
	this.x = _x;
	this.originalX = _x;

	this.y = _y;
	this.toY = 0;

	this.scale = _s;

	this.speed = 500+Math.random()*1000;

	this.wander = Math.random()*100;

	this.width = 149*this.scale;
	this.height = 159*this.scale;

	this.v = _v;

	this.parent = _parent;

	this.image = new Image();
	var that = this;
	this.image.onload = function() {
		that.parent.checkLoaded();
	}

	this.image.src = "../image/icons/floating_arrow.png";
}

function ParticleSystem() {
	this.particles = new Array();
	this.w;
	this.h;
	this.count;
	this.loaded = false;
	this.dur = 1000;

	var _self = this;

	this.checkLoaded = function() {
		this.count--;
		if( this.count == 0 ) {
			this.loaded = true;
		}
	}
	
	this.init = function( _w, _h, num ) {
		this.count = num;
		canvas = document.getElementById("canvas");
		canvas.width = _w;
		this.w = _w
		canvas.height = h;
		this.h = _h;
		ctx = canvas.getContext("2d");
		for( var i = 0; i < num; i++ ) {
			if( Math.floor(Math.random()*2)) {
				this.particles[i] = new Particle( _self, Math.floor(Math.random()*((this.w/2)-180)), Math.floor(Math.random()*this.h), 1+Math.random()*2, .10 );
			} else {
				this.particles[i] = new Particle( _self, Math.floor(((this.w/2)+180)+(Math.random()*((this.w/2)-180))), Math.floor(Math.random()*this.h), 1+Math.random()*2, .10 );
			}
		}
	}
	
	this.update = function( timestamp ) {
		for( i = 0, len = this.particles.length; i < len; i++ ) {
			// move the particle back and forth on a sine curve
			this.particles[i].x = this.particles[i].wander*Math.sin( timestamp / this.particles[i].speed ) + this.particles[i].originalX;

			// scale the particles set the base with the addition at the end.
			this.particles[i].scale = (this.particles[i].wander/100)*Math.sin( timestamp / this.particles[i].speed*.8 )+2.4;

			//move the particle up at a linear velocity
			this.particles[i].y -= this.particles[i].v;

			// kill and rebirth particle if it's off screen
			if( this.particles[i].y < this.particles[i].toY-(this.particles[i].height*this.particles[i].scale) ) {
				//this.particles[i] = new Particle( _self, Math.floor(Math.random()*this.w), 400, 1+Math.random()*2, .10 );
				if( Math.floor(Math.random()*2)) {
					this.particles[i] = new Particle( _self, Math.floor(Math.random()*((this.w/2)-180)), 400, 1+Math.random()*2, .10 );
				} else {
					this.particles[i] = new Particle( _self, Math.floor(((this.w/2)+180)+(Math.random()*((this.w/2)-180))), 400, 1+Math.random()*2, .10 );
				}
			}
		}
	}
	
	this.render = function() {

	}
}