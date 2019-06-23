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
		
			content += "<div class='rowWrapper'>";

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
