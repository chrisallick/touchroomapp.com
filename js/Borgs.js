Borgs = function( _w, _h, _num ) {
	var self = this;
	this.borgs = new Array();

	this.create = function() {
		for( var i = 0; i < _num; i++ ) {
			self.borgs.push( new Borg( i, getRandomInt(50, _w-50 ), getRandomInt( 50, _h-50) ) );
		}		
	}

	self.create();
}

Borg = function( _i, _x, _y ) {
	var self = this;
	this.x = _x;
	this.y = _y;
	this.index = _i;
	this.t;
	this.el = document.createElement("div");
	this.alive = false;

	console.log( self.x, self.y );

	self.el.className = "borg";
	$(self.el).css({
		left: self.x,
		top: self.y,
		opacity: 0
	}).appendTo("#humans");

	self.update = function() {
		clearTimeout( self.t );

		if( !self.alive ) {
			self.alive = true;
			$(self.el).animate({
				opacity: .3
			});
		}

		// self.x = self.x + getRandomInt( -500, 500 );
		// self.y = self.y + getRandomInt( -500, 500 );
		self.x = getRandomInt( 150, $(document).width()-150 );
		self.y = getRandomInt( 150, $(document).height()-150 );

		$(self.el).animate({
			left: self.x,
			top: self.y,
		}, getRandomInt( 2000, 4000 ) );
		self.t = setTimeout( self.update, getRandomInt( 5000, 8000) );
	}

	self.t = setTimeout( self.update, getRandomInt( 5000, 15000) );
}