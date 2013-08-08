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

function onMessageReceived(e) {
	var data = JSON.parse(e);
	console.log( data.event );
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
	//$("#instructions .on").fadeIn();
	//nextOrFirst();
	setTimeout(function(){
		window.scrollTo(0, 1);
	}, 10);

	$("#wrapper").animate({
		opacity: 1
	});
});

var client, count = 0, humans = new Array();
var iframe;
$(document).ready(function() {

	$("#wrapper").css({
		top: ($(document).height()/2 - $("#wrapper").height()/2) - $("#footer").height()
	});

	$(window).resize(function(){
		$("#wrapper").css({
			top: ($(document).height()/2 - $("#wrapper").height()/2) - $("#footer").height()
		});		
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
		console.log( msg );
		if( humans[msg.sid] ) {
			$("#"+msg.sid).stop().animate({
				left: msg.x * ( $(document).width() / msg.w ),
				top: msg.y,
				opacity: .3
			}, 1500, "easeInOutCubic");
		} else {
			$("#humans").append('<div id="'+msg.sid+'" class="human"></div>');
			$("#"+msg.sid).css({
				left: msg.x * ( $(document).width() / msg.w ),
				top: msg.y,
				opacity: 0
			}).stop().animate({
				opacity: .3
			});
			humans[msg.sid] = msg;
		}
	});

	$("#humans").mousemove(function(e) {
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

	$("#store").click(function(event){
		_gaq.push(['_trackEvent', 'landingPage', 'click', 'store']);
	});

	$(".home").click(function(event){
		event.preventDefault();
		_gaq.push(['_trackEvent', 'landingPage', 'click', 'home']);
		$("#sections .section").removeClass("section-on");
		$("#footer .links a").removeClass("on");

		$("#instructions").addClass("section-on");
		$("#footer .links .home").addClass("on");
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