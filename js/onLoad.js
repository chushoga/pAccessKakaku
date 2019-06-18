$(window).on("load", function(){
	
	// remove the loading screen
	function OverlayFadeOut(){
		$("#overlay").fadeOut(1000);
	}
	
	// add the loading screen
	function OverlayFadeIn(){
		$("#overlay").fadeIn(1000);
	}
    
    function CalculateBairitsu(){
        var oldPrice = $(this).closest(".dataInputs").find(".oldPrice").val();
        var newPrice = $(this).val();
        var bairitsu = ((newPrice - oldPrice)/oldPrice) * 100;
        var maxThreshold = 5;
        var minThreshold = 0
        //$(this).css({"background":"crimson"})
        
        // check the percentage differnce
        if(bairitsu >= maxThreshold){
            $(this).closest(".dataInputs").find(".bairitsu").css({"background" : "orange", "color": "#FFFFFF"});
        } else if(bairitsu < 0){
            $(this).closest(".dataInputs").find(".bairitsu").css({"background" : "crimson", "color" : "#FFFFFF"});
        } else if(bairitsu == 0){
            $(this).closest(".dataInputs").find(".bairitsu").css({"background" : "#3e3e3e", "color" : "#FFFFFF"});
        } else {
            $(this).closest(".dataInputs").find(".bairitsu").css({"background" : "#008800", "color" : "#FFFFFF"});
        }
        
        // if the prices are 0 then dont calculate it.
        if(oldPrice <= 0 || newPrice <= 0){
            $(this).closest(".dataInputs").find(".bairitsu").css({"background" : "#FFFFFF", "color": "#8e8e8e"});
            $(this).closest(".dataInputs").find(".bairitsu").val("-");
        } else {
            $(this).closest(".dataInputs").find(".bairitsu").val(bairitsu.toFixed(2) + "%");
        }
    }
    
    $("body").on("change keyup click, focus", ".newPrice", function(){
        CalculateBairitsu();
    });
    
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
		OverlayFadeOut();
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
				console.log("error");
				console.log(e);
			}
		});
	}
	
    LoadAll();
	
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
