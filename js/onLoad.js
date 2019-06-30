$(window).on("load", function(){
	
	/* HELPERS */
	
	/* prevent input other than numbers and dot. */
	$(".allow_decimal").on("input", function(evt) {
	   var self = $(this);
	   self.val(self.val().replace(/[^0-9\.]/g, ''));
	   if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) 
	   {
		 evt.preventDefault();
	   }
	});
	
	// update the header width
	function UpdateHeaderWidth(){
		// get the row width
		var newWidth = $(".rowDetails").width();
		$("#headerDetails").width(newWidth);
	}
	
	// update the header size on load because of the scroll bar width.
	$(window).on("resize", function(){UpdateHeaderWidth();});
	
	
	// message system
	// type = success, error, warning, info
	// message = any string, accpets html.
	function Message(type = "info", message = "default message"){
		
		// set the info for the messages
		var title = $("#messageDialogueTitle");
		var titleText = "";
		var contents = $("#messageDialogueContents");
		var contentsText = "";
		
		var colorClass = "info";
		console.log(type);
		switch(type){
			case "success":
				titleText = "<i class='fas fa-thumbs-up'></i> SUCCESS";
				colorClass = "successCol";
			break;
			case "error":
				titleText = "<i class='fas fa-bug'></i> ERROR";
				colorClass = "errorCol";
			break;
			case "warning":
				titleText = "<i class='fas fa-exclamation-triangle'></i> WARNING";
				colorClass = "warningCol";
			break;
			case "info":
				titleText = "<i class='fas fa-info-circle'></i> INFO";
				colorClass = "infoCol";
			break;
			default:
			break;
		}
		
		$("#messageDialogue").addClass(colorClass); // add colorClass
		title.html(titleText); // change the title of the message to match the type with an icon
		contents.html(message); // update the conents of the message
		
		$("#messageDialogue").fadeIn(500);
		
	}
	
	$(".naviBtn").on("click", function(){
		Message("error", "message here");
	});
	
	$("body").on("click", "#messageDialogue", function(){
		console.log("test");
		$(this).fadeOut(300);
	});
	
	// remove the loading screen
	function OverlayFadeOut(){
		$("#overlay").fadeOut(1000);
	}
	
	// add the loading screen
	function OverlayFadeIn(){
		$("#overlay").fadeIn(1000);
	}
    
	// Calculate the bairitsu
    function CalculateBairitsu(obj){
				
        var oldPrice = obj.closest(".dataInputs").find(".oldPrice").val();
		var newPrice = obj.val();
        
		var bairitsu = ((newPrice - oldPrice)/oldPrice) * 100;
        var maxThreshold = 5;
        var minThreshold = 0
		
        //$(this).css({"background":"crimson"})
        
        // check the percentage differnce
        if(bairitsu >= maxThreshold){
            obj.closest(".dataInputs").find(".bairitsu").css({"background" : "orange", "color": "#FFFFFF"});
        } else if(bairitsu < 0){
            obj.closest(".dataInputs").find(".bairitsu").css({"background" : "crimson", "color" : "#FFFFFF"});
        } else if(bairitsu == 0){
            obj.closest(".dataInputs").find(".bairitsu").css({"background" : "#3e3e3e", "color" : "#FFFFFF"});
        } else {
            obj.closest(".dataInputs").find(".bairitsu").css({"background" : "#008800", "color" : "#FFFFFF"});
        }
        
        // if the prices are 0 then dont calculate it.
        if(oldPrice <= 0 || newPrice <= 0){
            obj.closest(".dataInputs").find(".bairitsu").css({"background" : "#FFFFFF", "color": "#8e8e8e"});
            obj.closest(".dataInputs").find(".bairitsu").val("-");
        } else {
            obj.closest(".dataInputs").find(".bairitsu").val(bairitsu.toFixed(2) + "%");
        }
		
    }
    
	// on enter of the new price update the bairitsu calucation
    $("body").on("change keyup click, focus", ".newPrice", function(){
		
		var obj = $(this);
		
        CalculateBairitsu(obj);
		
    });
	
	// update all the bairtisu items
	function UpdateAllBairitsu(){
		$(".newPrice").each(function(){
			
			var obj = $(this);
			
			CalculateBairitsu(obj);
		});
	}
    
	// create a row of data (called from LoadAll)
	function NewRow(data){

		var main = $("#content");
		var content = ""; // content to add
		
		for(var i = 0; i < data.length; i++){
		
			// SET UP FLAGS HERE
			var flg_webHyoji = data[i].web;
			var flg_webVariation = data[i].webVariation;
			var flg_spareParts = 0;
			var flg_needIntro = 0;
			var flg_notDecided = 0;
			var flg_project = 0;
			var flg_tformHaiban = data[i].cancelTform;
			var flg_makerHaiban = data[i].cancelMaker;
			var flg_cancelSelling = data[i].cancelSelling;
			
			content += "<div class='rowWrapper'>";

			// IMAGES
			if(data[i].thumb == ""){
				content += "<div class='rowImage'><i class='fas fa-image'></i></div>";
			} else {
				content += "<div class='rowImage' style='"+data[i].thumb+"'></div>";
			}
			
			content += "\
			<div style='width: calc(100% - 275px); height: 75px; outline: 1px dashed blue; float: left;'>\
				<div class='rowDetails' style='width: 100%; height: 50%; background: #FFF;'>\
					<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>"+data[i].productId+"</div>\
					<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>"+data[i].tformNo+"</div>\
					<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>"+data[i].makerNo+"</div>\
					<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>"+data[i].orderNo+"</div>\
					<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>"+data[i].series+"</div>\
					<div style='width: 16.6666%; height: 100%; outline: 1px dashed black; float: left;'>"+data[i].productColor+"</div>\
				</div>\
				<div style='width: 100%; height: 50%; background: white;'>\
					<div style='width: 324px; height: 100%; float: left; outline: 1px dashed black;'>\
						 <div class='recordStatus'>";
			
				// show web flag
				if(flg_webHyoji == 0){
					content += "<div class='statusBox statusBoxWebhyoji '>WEB<br>表示</div>";
				} else {
					content += "<div class='statusBox statusBoxWebhyoji statusBoxOff'>WEB<br>表示</div>";
				}
				
				// show web variation
				if(flg_webVariation == 0){
					content += "<div class='statusBox statusBoxWeb'>WEB<br>vari</div>";
				} else {
					content += "<div class='statusBox statusBoxWeb statusBoxOff'>WEB<br>vari</div>";
				}
			
			// show web variation
				if(flg_webVariation == 0){
					content += "<div class='statusBox statusBoxOther statusBoxOff'>spare<br>parts</div>";
				} else {
					content += "<div class='statusBox statusBoxOther statusBoxOff'>spare<br>parts</div>";
				}
			
			content += "\
						<div class='statusBox statusBoxWeb'>紹介必要</div>\
						<div class='statusBox statusBoxWeb'>検討中</div>\
						<div class='statusBox statusBoxWeb statusBoxOff'>物件用</div>\
						<div class='statusBox statusBoxHaiban statusBoxOff'>tform廃番</div>\
						<div class='statusBox statusBoxHaiban'>maker廃番</div>\
						<div class='statusBox statusBoxHaiban'>販売終了</div>";
			content += "\
						</div>\
					</div>\
					<div style='width: calc(50% - 162px); height: 100%; float: left; outline: 1px dashed black;'><input style='width: calc(100% - 5px); height: 100%; border: none; padding-left: 5px;' type='text' value='memo1' disabled='disabled'></div>\
					<div style='width: calc(50% - 162px); height: 100%; float: left; outline: 1px dashed black;'><input style='width: calc(100% - 5px); height: 100%; border: none; padding-left: 5px;' type='text' value='memo2'></div>\
				</div>\
			</div>\
			<div class='dataInputs' style='width: 200px; height: 75px; outline: 1px dashed red; float: left;'>\
				<div style='width: 60%; height: 100%; float: left;'>\
					<div style='width: 100%; height: 50%;'>\
						<div style='width: 100%; height: 50%; background: green;'>\
							<input class='newPrice allow_decimal' style='border: none; width: 100%; height: 100%;' type='text' value='73.7'>\
						</div>\
						<div style='width: 100%; height: 50%; background: lightgreen;'>\
							<input style='border: none; width: 100%; height: 100%;' type='text' value='PL2019'>\
						</div>\
					</div>\
					<div style='width: 100%; height: 50%;'>\
						<div style='width: 100%; height: 50%;'>\
							<input class='oldPrice' type='text' value='71.1' disabled='disabled' style='width: 100%; height: 100%; border: none;'>\
						</div>\
						<div style='width: 100%; height: 50%;'>\
							<input type='text' value='PL2018' style='width: 100%; height: 100%; border: none;'>\
						</div>\
					</div>\
				</div>\
				<div style='width: 40%; height: 100%; background: pink; float: left; text-align: center;'>\
					<input class='bairitsu' style='width: 100%; height: 100%; border: none; text-align: center; font-size: 26px;' type='text' class='bairitsu' value='3.5%' disabled='disabled'>\
			</div>\
			</div>\
			";
			
			/*
			// image
			//content += "<div class='rowImage'><i class='fas fa-camera'></i></div>";
			if(data[i].thumb == ""){
				content += "<div class='rowImage'><i class='fas fa-image'></i></div>";
			} else {
				content += "<div class='rowImage' style='"+data[i].thumb+"'></div>";
			}
            
            content += "---" + data[i].sp_plCurrent;

			// old price
			content += "<input type='text' value='0123.45'>";

			// new price
			content += "<input type='text' value='0123.45'>";

			// bairitsu
			content += "<input type='text' value='0123.45'>";
*/
			content += "</div>";
		}
		
		main.append(content);
		
		Start();
	}
	
    // load All data
	function LoadAll(){
		$.ajax({
			type: "post",
			url: "js/process.php",
			data: "action=loadAll",
			success: function(data){
				NewRow(data);
			},
			error: function(e){
				Message("error", "There was an error loading the data from function loadAll.<br> Error details: "+e);
			}
		});
	}
		
    LoadAll();
	
	// START ALL STUFF AFTER LOADED
	function Start(){
		UpdateHeaderWidth(); // first time to update the header width, other times will be with a onWindowResize event.
		UpdateAllBairitsu(); // update the bairitsu stuffs
		OverlayFadeOut(); // remove the overlay
	}
	
	
    // create outline of system
    // dbconnect.php
    // config.php
    // onLoad.js
    // process.js
    // start basic CSS
    // get fonts working
    // stress test system on high load
    // create framework for single item.
    // navi system
	// creat search/filter system
	// create system for re-ording data
    
	// message system
	// load list
	// save system to save on every entry
	// reset all inputs
	// confirm dialog
	// shortcuts for saving and moving to next record
	// settings page - set the max and min for the bairitsu and highlight anything above the threshold
	// created/edit new maker conditions
	// add filter/search system
	// create the status blocks(web, haban, kento ...)
	// add excel export
	// add new import button to update filemaker data and new maker data. (need a system for this)
	// explaination of the system
	// add finish colors
	// add memo input for setting prices for each item
	// calcualte bairitsu on input of new price on each rows
	// add new database info for the kento chu
	// add on input focus select all the text to allow for quick entry
	// filter for hiding haiban items
	
	
});
