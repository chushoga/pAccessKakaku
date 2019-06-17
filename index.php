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
            <div class="naviBtn"><i class="fas fa-file-excel"></i></div>
            <div class="naviBtn"><i class="fas fa-print"></i></div>
            <div class="naviBtn"><i class="fas fa-save"></i></div>
		</div>
		<div id="overlay">
			<div id="loading">
				<i class="fa fa-spin fa-cog"></i>
			</div>
		</div>
		<div id="content">
			<div class='rowWrapper'>
				<div class='rowImage'><i class='fas fa-image'></i></div>
				<div class='rowLeft'>
                    <div style='width: 100%; height: 33.33%; background: #aaaaaa;'>pI: 28149  |  ADF90-0000-000-000-000</div>
                    <div style='width: 100%; height: 33.33%;'>makerNo 1000230010-131 | order no 1212313</div>
                    <div style='width: 100%; height: 33.33%; background: #aaaaaa;'>series     |  productColor</div>
                    
                </div>
				<div class='rowRight'>
					<div class='rowRightTop'>
                        <div class='recordStatus'>
                            <div class='statusBox statusBoxWebhyoji'>WEB<br>表示</div>
							<div class='statusBox statusBoxWeb'>紹介必要</div>
							<div class='statusBox statusBoxWeb'>検討中</div>
							<div class='statusBox statusBoxWeb statusBoxOff'>物件用</div>
							<div class='statusBox statusBoxHaiban statusBoxOff'>tform廃番</div>
							<div class='statusBox statusBoxHaiban'>maker廃番</div>
							<div class='statusBox statusBoxHaiban'>販売終了</div>
						</div>
                    </div>
					<div class='rowRightBottom'>
						<div class='dataInputs'>
							<input type='text' class='oldPrice' value='71.1' disabled="disabled">
							<input type='text' class='bairitsu' value='3.5%' disabled="disabled">
							<input type='text' class='newPrice' value='73.7'>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="footer">footer</div>
		
	</body>
</html>
