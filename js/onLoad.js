$(window).on("load", function(){
	
	// remove the loading screen
	function OverlayFadeOut(){
		$("#overlay").fadeOut(1000);
	}
	
	// add the loading screen
	function OverlayFadeIn(){
		$("#overlay").fadeIn(1000);
	}
	
	// create a row of data
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
