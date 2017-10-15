// This is a list of constants

var height = $(window).height();

var width = $(window).width();

// Pong bar length in pixels
var barLength = 200;

// The ball will be this number of pixels length and width
var ballSize = 20;

var p1x = 10;
var p1y = height / 2 - barLength / 2;

var p2x = width - 20;
var p2y = height / 2 - barLength / 2;

var ballx = width / 2;
var bally = height / 2;

var ballxv = 0;
var ballyv = 0; 

var p1UpTimer = null;
var p1DownTimer = null;

var p2UpTimer = null;
var p2DownTimer = null;

var p1Points = 0;
var p2Points = 0;

var playersReady = false;

$(document).ready(function(){


	$("#player1").css({left:p1x,top:p1y});
	$("#player2").css({left:p2x,top:p2y});
	$("#ball").css({left:ballx,top:bally});

	ballMovement = setInterval(moveBall, 20);

});

$(document).keydown(function(e) {
	// up key pressed
	if(e.keyCode==87) {
		if(p1UpTimer) return;
		p1UpTimer= setInterval(moveP1Up, 20);
	}
	if(e.keyCode==83) {
		if(p1DownTimer) return;
		p1DownTimer= setInterval(moveP1Down, 20);
	}
	// W keypress
	if(e.keyCode==38) {
		if(p2UpTimer) return;
		p2UpTimer= setInterval(moveP2Up, 20);
	}
	// S key
	if(e.keyCode==40) {
		if(p2DownTimer) return;
		p2DownTimer= setInterval(moveP2Down, 20);
	}
	if(e.keyCode==32) {
		if(ballxv == 0) {
			ballxv = 5;
		}
	}

});

$(document).keyup(function(e) {
	// up key pressed
	if(e.keyCode==87) {
		clearInterval(p1UpTimer);
		p1UpTimer = null;
	}
	if(e.keyCode==83) {
		clearInterval(p1DownTimer);
		p1DownTimer = null;
	}

		// W keypress
	if(e.keyCode==38) {
		clearInterval(p2UpTimer);
		p2UpTimer = null;
	}
	// S key
	if(e.keyCode==40) {
		clearInterval(p2DownTimer);
		p2DownTimer = null;
	}

});

function moveP1Up() {
	if(p1UpTimer != null) {
		if(p1y <= 0) {
			clearInterval(p1UpTimer);
			p1UpTimer = null;
		}
		else {
			p1y = p1y - 10;
			$("#player1").css({left:p1x,top:p1y});
		}
	}
}

function moveP1Down() {
	if (p1DownTimer != null) {
		if(p1y >= height - barLength - 10) {
			clearInterval(p1DownTimer);
			p1DownTimer = null;
		}
		else {
			p1y = p1y + 10;
			$("#player1").css({left:p1x,top:p1y});
		}
	}
}

function moveP2Up() {
	if(p2UpTimer != null) {
		if(p2y <= 0) {
			clearInterval(p2UpTimer);
			p2UpTimer = null;
		}
		else {
			p2y = p2y - 10;
			$("#player2").css({left:p2x,top:p2y});
		}
	}
}

function moveP2Down() {
	if (p2DownTimer != null) {
		if(p2y >= height - barLength - 10) {
			clearInterval(p2DownTimer);
			p2DownTimer = null;
		}
		else {
			p2y = p2y + 10;
			$("#player2").css({left:p2x,top:p2y});
		}
	}
}

function moveBall() {
	checkCollisions();
	ballx += ballxv;
	bally += ballyv;
	$("#ball").css({left:ballx,top:bally});
}

function checkCollisions() {
	//player 1 scores
	if(ballx > width) {
		ballxv = 0;
		ballyv = 0;
		p1Points++;
		$('#p1score').html(''+p1Points);
		ballx = width / 2;
		bally = height / 2;
		$("#ball").css({left:ballx,top:bally});
	}
	//player 2 scores
	else if(ballx < 0) {
		playersReady = false;
		ballxv = 0;
		ballyv = 0;
		p2Points++;
		$('#p2score').html(''+p2Points);
		ballx = width / 2;
		bally = height / 2;
		$("#ball").css({left:ballx,top:bally});
	}

	if(bally <= ballSize) {
		ballyv = 0 - ballyv;
	}
	else if(bally >= height - ballSize - 10) {
		ballyv = 0 - ballyv;
	}

	//Collision with player 1 paddle
	if(ballx >= 10 && ballx <= 30) {
		if(bally >= p1y && bally <= p1y + barLength) {
			ballxv = 0 - ballxv;
			if(p1DownTimer != null) {
				ballyv = 5; 
			}
			else if(p1UpTimer != null) {
				ballyv = -5;
			}
		}
	}
	//Collision with player 2 paddle
	if(ballx <= width - ballSize && ballx >= width - ballSize - 10) {
		if(bally >= p2y && bally <= p2y + barLength) {
			ballxv = 0 - ballxv;
			if(p2DownTimer != null) {
				ballyv = 5; 
			}
			else if(p2UpTimer != null) {
				ballyv = -5;
			}
		}
	}

}


