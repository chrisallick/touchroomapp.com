// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
// function onYouTubeIframeAPIReady() {

// }

// // 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
// 	ready = true;
// 	playVideo();
// }

// function onPlayerStateChange(event) {

// }

// function stopVideo() {
// 	if( ready && $(document).width() > 680 ) {
// 	} else {
// 		$("#player").remove();
// 	}
// }

// function pauseVideo() {
// 	if( ready && $(document).width() > 680 ) {
// 		player.pauseVideo();
// 	}
// }

// function playVideo() {
// 	if( ready && $(document).width() > 680  ) {
// 		player.seekTo(0);
// 		player.playVideo();
// 	}
// }

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

var client, count = 0, humans = new Array();
var player, done, ready = false;
var mobile = false;
$(document).ready(function() {
	$("#wrapper").css({
		top: ($(document).height()/2 - $("#wrapper").height()/2) - $("#footer").height()
	});

	$(window).resize(function(){
		$("#wrapper").css({
			top: ($(document).height()/2 - $("#wrapper").height()/2) - $("#footer").height() + 26
		});		
	})

	client = new Client( window, {
		username: "client"+getRandomInt(1,1000),
		roomname: "touchsite12892",
		host: "54.214.250.91",
		port: "8882",
		secure: false,
		debug: false
	});

	client.addEvent("position","object",function(msg) {
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

	// 2. This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
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
		borgs = new Borgs( $(document).width(), $(document).height(), getRandomInt( 9, 15 ) );	
	} else { 
		borgs = new Borgs( $(document).width(), $(document).height(), getRandomInt( 19, 24 ) );	
	}

	$("#video .logo").click(function(){
		$("#videocontainer").show();
		$("#player").attr("src","http://www.youtube.com/embed/mCSd9GA0ndc?autoplay=1");
	});

	$("#videocontainer .close").click(function() {
		$("#player").attr("src","");
		$("#videocontainer").hide();
	})

	$("#store").click(function(event){
		_gaq.push(['_trackEvent', 'landingPage', 'click', 'store']);

		$("#player").attr("src","");
		$("#videocontainer").hide();
	});

	$("#howitworksbutton").click(function(event){
		$("#sections .section").removeClass("section-on");

		$("#video").removeClass("section-on");
		$("#instructions").addClass("section-on");
		$(this).hide();
		$("#videobutton").show();

		$("#player").attr("src","");
		$("#videocontainer").hide();
	});

	$("#howitworksbuttonmobile").click(function(event){
		$("#sections .section").removeClass("section-on");

		$("#video").removeClass("section-on");
		$("#instructions").addClass("section-on");
		$(this).hide();
		$("#videobuttonmobile").show();

		$("#player").attr("src","");
		$("#videocontainer").hide();
	});

	$("#videobutton").click(function(){
		$("#sections .section").removeClass("section-on");

		$("#instructions").removeClass("section-on");
		$("#video").addClass("section-on");
		$(this).hide();
		$("#howitworksbutton").show();
	});

	$("#videobuttonmobile").click(function() {
		$("#sections .section").removeClass("section-on");

		$("#instructions").removeClass("section-on");
		$("#video").addClass("section-on");
		$(this).hide();
		$("#howitworksbuttonmobile").show();
	});

	$(".home").click(function(event) {
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

		$("#player").attr("src","");
		$("#videocontainer").hide();
	});

	$(".legal").click(function(event) {
		event.preventDefault();
		_gaq.push(['_trackEvent', 'landingPage', 'click', 'legal']);
		$("#sections .section").removeClass("section-on");
		$("#footer .links a").removeClass("on");

		$("#legal").addClass("section-on");
		$("#footer .links .legal").addClass("on");

		$("#player").attr("src","");
		$("#videocontainer").hide();
	});

	$(".about").click(function(event){
		event.preventDefault();
		_gaq.push(['_trackEvent', 'landingPage', 'click', 'about']);
		$("#sections .section").removeClass("section-on");
		$("#footer .links a").removeClass("on");

		$("#about").addClass("section-on");
		$("#footer .links .about").addClass("on");

		$("#player").attr("src","");
		$("#videocontainer").hide();
	});

	$(".contact").click(function(event){
		_gaq.push(['_trackEvent', 'landingPage', 'click', 'contact']);

		$("#player").attr("src","");
		$("#videocontainer").hide();
	});

	$("#instructions .leftarrow").click(function(event){
		previousOrLast();
	});

	$("#instructions .rightarrow").click(function(event){
		nextOrFirst();
	});

	client.connect();
});