Borgs = function( _w, _h, _num ) {
	var self = this;
	this.borgs = new Array();

	this.create = function() {
		for( var i = 0; i < _num; i++ ) {
			self.borgs.push( new Borg( getRandomInt( 50, _w-50 ), getRandomInt( 50, _h-5) ) );
		}		
	}

	self.create();
}

Borg = function( _w, _h ) {
	var self = this;
	this.x = _w;
	this.y = _h;
	this.t;
	this.el = document.createElement("div");

	self.el.className = "borg";
	$(self.el).css({
		left: getRandomInt( 50, $(document).width() - 50 ),
		top: getRandomInt( 50, $(document).height() - 50 ),
		opacity: 0
	}).stop().appendTo("#humans").animate({
		opacity: .3
	});

	self.update = function() {
		clearTimeout( self.t );
		$(self.el).stop().animate({
			left: getRandomInt( 50, $(document).width() - 50 ),
			top: getRandomInt( 50, $(document).height() - 50 ),
		}, getRandomInt( 1500, 3000 ) );
		self.t = setTimeout( self.update, getRandomInt( 2000, 5000) );
		//self.t = setTimeout( self.update, 1500 );
	}

	self.t = setTimeout( self.update, getRandomInt( 2000, 5000) );
	//self.t = setTimeout( self.update, 1500 );
}