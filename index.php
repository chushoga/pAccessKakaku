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
		<div id="contentHeader">
			<div style='width: 75px; height: 100%; outline: 1px dashed black; float: left;'>image</div>
			<div id='headerDetails' style='width: calc(100% - 275px); height: 100%; outline: 1px dashed blue; background: green; float: left;'>
				<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>productId</div>
				<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>tformNo</div>
				<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>makerNo</div>
				<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>orderno</div>
				<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>series</div>
				<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>color</div>
			</div>
			<div style='width: 200px; height: 100%; background: orange; float: left;'>FILLER</div>
		</div>
		<div id="content">
			<div class='rowWrapper'>
				<div class='rowImage'><i class='fas fa-image'></i></div>
				<div class='rowLeft'>
                    <div style='width: 100%; height: 33.33%; background: #aaaaaa;'>
						<div class='rowLeftInner rowLeftInnerHeader'>productId</div>
						<div class='rowLeftInner rowLeftInnerContent'>00000</div>
						<div class='rowLeftInner rowLeftInnerHeader'>tformNo</div>
						<div class='rowLeftInner rowLeftInnerContent'>ADF90-0000-000-000-000</div>
					</div>
                    <div style='width: 100%; height: 33.33%;'>
						<div class='rowLeftInner rowLeftInnerHeader'>makerNo</div>
						<div class='rowLeftInner rowLeftInnerContent'>00000001212313</div>
						<div class='rowLeftInner rowLeftInnerHeader'>orderNo</div>
						<div class='rowLeftInner rowLeftInnerContent'>00003aaa1212313</div>
					</div>
                    <div style='width: 100%; height: 33.33%; background: #aaaaaa;'>
						<div class='rowLeftInner rowLeftInnerHeader'>series</div>
						<div class='rowLeftInner rowLeftInnerContent'>no Series blah</div>
						<div class='rowLeftInner rowLeftInnerHeader'>productColor</div>
						<div class='rowLeftInner rowLeftInnerContent'>green</div>
					</div>
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
							<input type='text' class='newPrice allow_decimal' value='73.7'>
						</div>
					</div>
				</div>
			</div>
			
			<div class="rowWrapper">
				<div style='width: 75px; height: 75px; outline: 1px dashed orange; float: left;'>image</div>
				<div style='width: calc(100% - 275px); height: 75px; outline: 1px dashed blue; float: left;'>
					<div class='rowDetails' style='width: 100%; height: 50%; background: yellow;'>
						<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>productId</div>
						<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>tformNo</div>
						<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>makerNo</div>
						<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>orderno</div>
						<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>series</div>
						<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>color</div>
					</div>
					<div style='width: 100%; height: 50%; background: white;'>
						<div style='width: 324px; height: 100%; float: left; outline: 1px dashed black;'>
							 <div class='recordStatus'>
								<div class='statusBox statusBoxWebhyoji'>WEB<br>表示</div>
                                <div class='statusBox statusBoxWeb'>WEB<br>vari</div>
                                <div class='statusBox statusBoxOther statusBoxOff'>spare<br>parts</div>
								<div class='statusBox statusBoxWeb'>紹介必要</div>
								<div class='statusBox statusBoxWeb'>検討中</div>
								<div class='statusBox statusBoxWeb statusBoxOff'>物件用</div>
								<div class='statusBox statusBoxHaiban statusBoxOff'>tform廃番</div>
								<div class='statusBox statusBoxHaiban'>maker廃番</div>
								<div class='statusBox statusBoxHaiban'>販売終了</div>
							</div>
						</div>
						<div style='width: calc(50% - 162px); height: 100%; float: left; outline: 1px dashed black;'><input style='width: calc(100% - 5px); height: 100%; border: none; padding-left: 5px;' type='text' value='memo1' disabled='disabled'></div>
						<div style='width: calc(50% - 162px); height: 100%; float: left; outline: 1px dashed black;'><input style='width: calc(100% - 5px); height: 100%; border: none; padding-left: 5px;' type='text' value='memo2'></div>
					</div>
				</div>
				<div class='dataInputs' style='width: 200px; height: 75px; outline: 1px dashed red; float: left;'>
					<div style='width: 60%; height: 100%; float: left;'>
						<div style='width: 100%; height: 50%;'>
							<div style='width: 100%; height: 50%; background: green;'>
								<input class='newPrice allow_decimal' style='border: none; width: 100%; height: 100%;' type='text' value='73.7'>
							</div>
							<div style='width: 100%; height: 50%; background: lightgreen;'>
								<input style='border: none; width: 100%; height: 100%;' type='text' value='PL2019'>
							</div>
						</div>
						<div style='width: 100%; height: 50%;'>
							<div style='width: 100%; height: 50%;'>
								<input class='oldPrice' type='text' value='71.1' disabled='disabled' style='width: 100%; height: 100%; border: none;'>
							</div>
							<div style='width: 100%; height: 50%;'>
								<input type='text' value='PL2018' style='width: 100%; height: 100%; border: none;'>
							</div>
						</div>
					</div>
					<div style='width: 40%; height: 100%; background: pink; float: left; text-align: center;'>
						<input class='bairitsu' style='width: 100%; height: 100%; border: none; text-align: center; font-size: 26px;' type='text' class='bairitsu' value='3.5%' disabled="disabled">
					</div>
				</div>
			</div>
		</div>
		<div id="footer">footer</div>
		
		<div id="messageDialogue"><div id="messageDialogueTitle"></div><div id="messageDialogueContents"></div></div>
		
	</body>
</html>
