/**
 * Returns a random number between min and max
 */
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextOrFirst() {
	var next = $('#instructions .instruction.on').next(".instruction").length;
	if( next ) {
		$('#instructions .instruction.on').removeClass("on").next(".instruction").addClass("on");	
	} else {
		// start over
		$('#instructions .instruction.on').removeClass("on");
		$("#instructions .instruction").first().addClass("on");
	}
}

function previousOrLast() {
	var prev = $('#instructions .instruction.on').prev(".instruction").length;
	if( prev ) {
		$('#instructions .instruction.on').removeClass("on").prev(".instruction").addClass("on");
	} else {
		$('#instructions .instruction.on').removeClass("on");
		$("#instructions .instruction").last().addClass("on");
	}
}

$(window).load(function(){	
	setTimeout(function(){
		window.scrollTo(0, 1);
	}, 10);

	$("#wrapper").animate({
		opacity: 1
	});
});

function draw(timestamp) {
	if( ps.loaded ) {
		ps.update(timestamp);
		ps.render();
	}
}

function onResizeFinished() {
	ps.canvas.width = $(document).width();
	ps.canvas.height = $(document).height();
	ps.loaded = true;
}

var client, count = 0, humans = new Array(), ps;
var iframe, rt;
$(document).ready(function() {

	$("#wrapper").css({
		top: ($(document).height()/2 - $("#wrapper").height()/2) - $("#footer").height()
	});

	$(window).resize(function() {
		clearTimeout( rt );
		ps.loaded = false;
		$("#wrapper").css({
			top: ($(document).height()/2 - $("#wrapper").height()/2) - $("#footer").height()
		});
		rt = setTimeout( onResizeFinished, 500 );
	})

	client = new Client( window, {
		username: "client"+getRandomInt(1,1000),
		roomname: "touchsite12892",
		host: "54.214.250.91",
		port: "8882",
		secure: false,
		debug: true
	});

	client.addEvent("position","object",function(msg) {
		//console.log( msg );
		// if( humans[msg.sid] ) {
		// 	$("#"+msg.sid).stop().animate({
		// 		left: msg.x * ( $(document).width() / msg.w ),
		// 		top: msg.y,
		// 		opacity: .3
		// 	}, 1500, "easeInOutCubic");
		// } else {
		// 	$("#humans").append('<div id="'+msg.sid+'" class="human"></div>');
		// 	$("#"+msg.sid).css({
		// 		left: msg.x * ( $(document).width() / msg.w ),
		// 		top: msg.y,
		// 		opacity: 0
		// 	}).stop().animate({
		// 		opacity: .3
		// 	});
		// 	humans[msg.sid] = msg;
		// }
	});
	
	$(document).mousemove(function(e) {
		count++;
		if( count == 50 ) {
			var msg = client.createMessage("position",{
				x:e.pageX,
				y:e.pageY,
				w: $(document).width(),
				sid: client.sid
			});
			client.sendMessage(msg);
			count = 0;
		}
	});

	if( $(document).width() < 1600 ) {
		ps = new ParticleSystem( $(document).width(), $(document).height(), getRandomInt( 9, 15 ) );	
	} else { 
		ps = new ParticleSystem( $(document).width(), $(document).height(), getRandomInt( 19, 24 ) );	
	}

	animate();

	$("#video .logo").click(function(){
		$("#videocontainer").show();
	});

	$("#videocontainer .close").click(function(){
		console.log("sup");
		$("#videocontainer").hide();
	})

	$("#store").click(function(event){
		_gaq.push(['_trackEvent', 'landingPage', 'click', 'store']);
	});

	$("#howitworksbutton").click(function(event){
		$("#sections .section").removeClass("section-on");

		$("#video").removeClass("section-on");
		$("#instructions").addClass("section-on");
		$(this).hide();
		$("#videobutton").show();
	});

	$("#howitworksbuttonmobile").click(function(event){
		$("#sections .section").removeClass("section-on");

		$("#video").removeClass("section-on");
		$("#instructions").addClass("section-on");
		$(this).hide();
		$("#videobuttonmobile").show();
	});

	$("#videobutton").click(function(){
		$("#sections .section").removeClass("section-on");

		$("#instructions").removeClass("section-on");
		$("#video").addClass("section-on");
		$(this).hide();
		$("#howitworksbutton").show();
	});

	$("#videobuttonmobile").click(function(){
		$("#sections .section").removeClass("section-on");

		$("#instructions").removeClass("section-on");
		$("#video").addClass("section-on");
		$(this).hide();
		$("#howitworksbuttonmobile").show();
	});

	$(".home").click(function(event){
		event.preventDefault();
		_gaq.push(['_trackEvent', 'landingPage', 'click', 'home']);
		$("#sections .section").removeClass("section-on");
		$("#footer .links a").removeClass("on");

		$("#video").addClass("section-on");
		$("#footer .links .home").addClass("on");

		if( $(".break").css("display") == "inline" ) {
			$("#videobutton").hide();
			$("#howitworksbutton").show();
		} else {
			$("#videobuttonmobile").hide();
			$("#howitworksbuttonmobile").show();
		}
	});

	$(".legal").click(function(event){
		event.preventDefault();
		_gaq.push(['_trackEvent', 'landingPage', 'click', 'legal']);
		$("#sections .section").removeClass("section-on");
		$("#footer .links a").removeClass("on");

		$("#legal").addClass("section-on");
		$("#footer .links .legal").addClass("on");
	});

	$(".about").click(function(event){
		event.preventDefault();
		_gaq.push(['_trackEvent', 'landingPage', 'click', 'about']);
		$("#sections .section").removeClass("section-on");
		$("#footer .links a").removeClass("on");

		$("#about").addClass("section-on");
		$("#footer .links .about").addClass("on");		
	});

	$(".contact").click(function(event){
		_gaq.push(['_trackEvent', 'landingPage', 'click', 'contact']);
	});

	$("#instructions .leftarrow").click(function(event){
		previousOrLast();
	});

	$("#instructions .rightarrow").click(function(event){
		nextOrFirst();
	});

	client.connect();
});