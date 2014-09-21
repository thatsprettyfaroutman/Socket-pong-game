<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>

	<!-- Basic Page Needs
  ================================================== -->
	<meta charset="utf-8">
	<title>GAME</title>
	<meta name="description" content="Skeleton: Beautiful Boilerplate for Responsive, Mobile-Friendly Development">
	<meta name="author" content="Dave Gamache">
	<meta property="twitter:account_id" content="17346623" />
	
	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<!-- Mobile Specific Metas
  ================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<!-- <link rel="stylesheet" href="src/stylesheets/base.css"> -->

	<style>
		html, body {
			height : 100%;
			overflow : hidden;
			margin : 0;
			padding : 0;
		}

		body {
			position : relative;
			background : #000;
			color : #ffce00;
			font-size : 10px;
			font-family : monospace;
		}

		.field {
			position : absolute;
			top : 100px;
			right : 0;
			bottom : 100px;
			left : 0;
			background : #222;
			border-top : 1px solid #ffce00;
			border-bottom : 1px solid #ffce00;
		}

		.field .top {
			position : absolute;
			top : 0;
			right : 0;
			left : 0;
			height : 50%;
			border-bottom : 1px dashed #ffce00;
			opacity : 0.2;
		}

		.field .left-half {
			position : absolute;
			top : 0;
			bottom : 0;
			left : 0;
			width : 50%;
			border-right : 1px dashed #ffce00;
		}

		.field .left-circle,
		.field .right-circle {
			position : absolute;
			top : 50%;
			right : -300px;
			width : 400px;
			height : 400px;
			margin-top : -200px;
			border : 1px dashed #ffce00;
			border-radius : 400px;
			opacity : 0.2;
		}

		.field .right-circle {
			right : auto;
			left : -300px;
		}

		.field.display {
			top : 40px;
			bottom : 40px;
		}

		.field.display .paddle {
			position : absolute;
			top : 40%;
			left : 6%;
			width : 1%;
			height : 20%;
			background-color : #ffce00;
		}

		.field.display .paddle.player-b {
			left : auto;
			right : 6%;
		}

		.field .ball {
			position : absolute;
			display : block;
			width : 15px;
			height : 15px;
			top : 50%;
			left : 50%;
			margin-top : -7.5px;
			margin-left : -7.5px;
			background-color : #ffce00;
			border-radius : 15px;
		}

		.field .score {
			position : absolute;
			top : -40px;
			height : 40px;
			width : 100%;
			line-height : 40px;
			text-align : center;
			font-size: 30px;
		}

		.status {
			position: absolute;
			top: 50%;
			height: 80px;
			width: 100%;
			margin-top: -80px;
			line-height: 80px;
			font-size: 30px;
			text-transform: uppercase;
			text-align: center;
		}

		#data {
			position : absolute;
			top : 0;
			right : 0;
			left : 0;
			height : 20px;
			line-height : 20px;
		}
	</style>

</head>
<body>

<?php // DISPLAY
	if (isset($_GET['display'])):
?>
	
	<div id="data"></div>

	<div class="field display">
		<div class="top"></div>
		<div class="left-half"></div>
		<div class="left-circle"></div>
		<div class="right-circle"></div>
		<div class="status"></div>
		<div class="paddle player-a"></div>
		<div class="paddle player-b"></div>
		<div class="ball"></div>
		<div class="score"><span class="player-a-score">0</span>:<span class="player-b-score">0</span></div>
	</div>

	<script type="text/javascript">
		var _display = true; 
	</script>

<?php else: // CLIENT ?>

	<div class="field">
		<div class="top"></div>
		<div class="status"></div>
	</div>

	<!-- <div id="alpha">a</div>
	<div id="beta">b</div>
	<div id="gamma">g</div> -->

	<script type="text/javascript">
		var _display = false; 
	</script>

<?php endif; ?>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.13.2/TweenMax.min.js"></script>
	<script type="text/javascript" src="javascripts/main.js"></script>
</body>
</html>
