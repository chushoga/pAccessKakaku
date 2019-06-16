<!DOCTYPE HTML>
<html lang="ja-jp">
	<head>
		<meta charset="utf-8" />
		
		<title>価格設定システム2.0</title>
		
		<!-- INCLUDES -->
		<?php include_once 'master/config.php'; ?>
		
		<script type="text/javascript" src="js/onLoad.js"></script>
		
	</head>
	<body>
		<div id="navi">
				<div class="naviBtn"><i class="fas fa-percent"></i></div>
				<div class="naviBtn"><i class="fas fa-sliders-h"></i></div>
		</div>
		<div id="overlay">
			<div id="loading">
				<i class="fa fa-spin fa-cog"></i>
			</div>
		</div>
		<div id="content">
			<div class='rowWrapper'>
				<div class='rowImage'><i class='fas fa-image'></i></div>
				<div class='rowLeft'></div>
				<div class='rowRight'>
					<div class='rowRightTop'></div>
					<div class='rowRightBottom'>
						<div class='recordStatus'>
							<div class='statusBox statusBoxWeb'>紹介必要</div>
							<div class='statusBox statusBoxWeb'>検討中</div>
							<div class='statusBox statusBoxWeb statusBoxOff'>物件用</div>
							<div class='statusBox statusBoxHaiban statusBoxOff'>tform廃番</div>
							<div class='statusBox statusBoxHaiban'>maker廃番</div>
							<div class='statusBox statusBoxHaiban'>販売終了</div>
						</div>
						<div class='dataInputs'>
							<input type='text' value='0123.45' disabled="disabled">
							<input type='text' value='0123.45' >
							<input type='text' value='3.5%' disabled="disabled">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="footer">footer</div>
		
	</body>
</html>
