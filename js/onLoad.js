$(window).on("load", function(){
	
	/* GLOBAL VARIABLES */
	var ORDERBY = "tformNo";
	var IS_DESC = false;
	
    // ******************************************************************************************
    // SHORTCUTS
    // start
    // ******************************************************************************************
    
    $(document).keydown(function(e){
        
        // move up or down rows with the arrow keys. 
        // Up will focus on previous row and down will focus on the next
        // (tab and shift+tab work too)
        var currentFocus = $(':focus');
        var prevFocus = currentFocus.closest(".rowWrapper").prev(".rowWrapper").find(".newPrice");
        var nextFocus = currentFocus.closest(".rowWrapper").next(".rowWrapper").find(".newPrice");
        
        // [ KEYCODES ]
        // UP ARROW = 38
        // DOWN ARROW = 40
        // TAB = 9
        // ESCAPE = 27
        
        switch(e.which) {
            case 38:
            case e.shiftKey && 9:
                prevFocus.focus().select(); // focus and select the on the previous row
                
                // check if the currently current active element focused is the input box and if not, focus previous
                if(document.activeElement.className != "ammountInputBox"){
                    $(".currentRowHighlight").find("input").closest("tr").prev("tr").find("input").focus().select();
                }
                
                break;
            case 40:
            case 9:
                nextFocus.focus().select(); // focus and select on the next row
                
                // check if the currently current active element focused is the input box and if not, focus next
                if(document.activeElement.className != "ammountInputBox"){
                    $(".currentRowHighlight").find("input").closest("tr").next("tr").find("input").focus().select();
                }
            
                break;
            case 27:
                // when escape key is pressed hide the overlay and shut all visible dialogs
                $(".dialog:visible").fadeOut();
                HideRowFocus(); // hide the overlay
            default: return; // exit handler for other keys
        }
        e.preventDefault(); // prevent the default actions of the keys above
    });
    
    // ******************************************************************************************
    //close
    // ******************************************************************************************
	/* ------------------------------------------------------------------------------------------ */
	/* HELPERS */
	/* ------------------------------------------------------------------------------------------ */
	/* prevent input other than numbers and dot. */
	$("body").on("input", ".allow_decimal", function(evt) {
	   
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
        if(newWidth == 0){
            newWidth = ($("#navi").width() - $("#headerImage").width()) - $("#filter").width();
        }
		$("#headerDetails").width(newWidth);
	}
	
	// update the header size on load because of the scroll bar width.
	$(window).on("resize", function(){UpdateHeaderWidth();});
	
	// HIGHLIGHT SELECTED ROW
	$("body").on("focusin click", ".newPrice", function(){
		ShowRowFocus($(this));
	});
	
	$("body").on("focusout", ".newPrice", function(){
		HideRowFocus();
	});
	
	// Update the ORDERBY global variable when click on the order by sort icons
	$("body").on("click", ".orderBy", function(){
		
		// update the alphabetical order
		IS_DESC = !IS_DESC;
		
		if(ORDERBY == $(this).attr("data-id")){
			$(this).find("i").toggleClass("fa-sort-up fa-sort-down");
		} else {
			// update the icons
			// remove the old icons
			$(".orderBy i").removeClass("fa-sort");
			$(".orderBy i").removeClass("fa-sort-up");
			$(".orderBy i").removeClass("fa-sort-down");
			
			// update all the icons with the basic sort
			$(".orderBy i").addClass("fa-sort");
			
			// set the new sort
			ORDERBY = $(this).attr("data-id"); // set the new order by
			
			// give the new sorter the down arrow
			$(this).find("i").removeClass("fa-sort");
			$(this).find("i").addClass("fa-sort-down");
		}
		
		//console.log("ORDER BY: " + ORDERBY + " ( " + IS_DESC + " )");
		
		// reorder array
		var reOrderArray = [];
		
		// re-order here
		$(".rowWrapper").each(function(){
			
			// take the current order by and search the row for that id.
			// when found add that html to an array
			// re-arange the array depending on the IS_DESC to asc or desc
			// show the new row arrangements
			var id = $(this).attr("data-rowid");
			var val = $(this).find(".rowDetailsCol[data-"+ORDERBY+"]").html();
			
			// push into the array
			reOrderArray.push([id, val]);
			//reOrderArray.push(val);
			
		});
		
		console.log(reOrderArray[0]);
		
		// sort the array
		if(IS_DESC) {
			reOrderArray.sort();
		} else {
			reOrderArray.sort();
			reOrderArray.reverse();
		}
		
		// get each row by 
		console.log(reOrderArray);
		
	});
	/* ------------------------------------------------------------------------------------------ */
	// message system
	/* ------------------------------------------------------------------------------------------ */
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
        $("#transOverlay").fadeIn(500);
		
	}
	
	$(".naviBtn").on("click", function(){
		Message("error", "BUTTON NOT SET UP YET");
	});
	
	$("body").on("click", "#messageDialogue", function(){
		console.log("test");
		$(this).fadeOut(300);
        $("#transOverlay").fadeOut(300);
	});
        
	/* ------------------------------------------------------------------------------------------ */
	/* OVERLAY */
	/* ------------------------------------------------------------------------------------------ */
	// remove the loading screen
	function OverlayFadeOut(){
		$("#overlay").fadeOut(1000);
	}
	
	// add the loading screen
	function OverlayFadeIn(){
		$("#overlay").fadeIn(1000);
	}
    
    // show the row focus
    function ShowRowFocus(target){
        target.select();
		$(".rowWrapper").css({"opacity":0.4});
		target.closest(".rowWrapper").css({"opacity":1});
    }
    
    // hide the row focus
    function HideRowFocus(){
        $(".rowWrapper").css({"opacity":1});
		//$(this).closest(".rowWrapper").css({"opacity":1});
    }
    /* ------------------------------------------------------------------------------------------ */
	
	/* ------------------------------------------------------------------------------------------ */
	/* FILTER */
	/* ------------------------------------------------------------------------------------------ */
	// search through each row and check to see if any of the input words match something in the row
	// allow spaces for additional search parameters(not to make more percise)
	// restrict the search to being more than 3 chars
	function FilterMe(str){
		
		// break the search into an array
		var arr = str.toLowerCase().split(" ");
		// check if more than 3 chars
		if(str.length >= 3){
					
			//$(".rowWrapper").css({"opacity":0.3}); // hide all before the filter
			$(".rowWrapper").hide();
			
			$(".rowWrapper").each(function(){
				
				var productId = $(this).find("[data-productid]").attr("data-productid");
				var tformNo = $(this).find("[data-tformNo]").attr("data-tformno");
				var makerNo = $(this).find("[data-makerno]").attr("data-makerno");
				var orderNo = $(this).find("[data-orderno]").attr("data-orderno");
                var series = $(this).find("[data-series]").attr("data-series");
				var currentPriceTitle = $(this).find(".spdiscratememo").attr("data-spdiscratememo");
				
				for(var i = 0; i < arr.length; i++){
					if(
						productId.toLowerCase().indexOf(arr[i]) >= 0 ||
						tformNo.toLowerCase().indexOf(arr[i]) >= 0 ||
						makerNo.toLowerCase().indexOf(arr[i]) >= 0 ||
						orderNo.toLowerCase().indexOf(arr[i]) >= 0 ||
                        series.toLowerCase().indexOf(arr[i]) >= 0 ||
						currentPriceTitle.toLowerCase().indexOf(arr[i]) >= 0
					){
						$(this).show();
					}
				}
				
			});
		} else {
			$(".rowWrapper").show();
		}
		var id = $(".rowDetailsCol").attr("data-productid");
        
        UpdateHeaderWidth(); // update header row width
	}
	
	$("body").on("change keyup", "#filter input", function(){
		if($(this).val().length >= 1){
			$(".filterIcon i").removeClass("fa-filter");
			$(".filterIcon i").addClass("fa-times");
		} else {
			// show the clear icon
			$(".filterIcon i").removeClass("fa-times");
			$(".filterIcon i").addClass("fa-filter");
		}
        
		FilterMe($(this).val());
        
	});
	
	$(".filterIcon").on("click", function(){
		$("#filter input").val("");
		$(".filterIcon i").removeClass("fa-times");
		$(".filterIcon i").addClass("fa-filter");
		FilterMe("");
	});
	
	/* ------------------------------------------------------------------------------------------ */
	// Calculate the bairitsu
	/* ------------------------------------------------------------------------------------------ */
    function CalculateBairitsu(obj){
				
        var oldPrice = obj.closest(".dataInputs").find(".oldPrice").val();
		var newPrice = obj.val();
        
		var bairitsu = ((newPrice - oldPrice)/oldPrice) * 100;
        var maxThreshold = 5;
        var minThreshold = 0
		
        // check the percentage differnce
        if(bairitsu >= maxThreshold){
            obj.closest(".dataInputs").find(".bairitsu").css({"background" : "orange", "color": "#FFFFFF"});
        } else if(bairitsu < 0){
            obj.closest(".dataInputs").find(".bairitsu").css({"background" : "crimson", "color" : "#FFFFFF"});
        } else if(bairitsu == 0){
            obj.closest(".dataInputs").find(".bairitsu").css({"background" : "#3e3e3e", "color" : "#FFFFFF"});
        } else {
            obj.closest(".dataInputs").find(".bairitsu").css({"background" : "#6eb825", "color" : "#FFFFFF"});
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
		
        CalculateBairitsu(obj); // calculate the bairitsu
		
    });
	
	// update all the bairtisu items
	function UpdateAllBairitsu(){
		$(".newPrice").each(function(){
			
			var obj = $(this);
			
			CalculateBairitsu(obj);
		});
	}
	/* ------------------------------------------------------------------------------------------ */
	
	/* ------------------------------------------------------------------------------------------ */
	// update the temp pricelist table with the input price
	/* ------------------------------------------------------------------------------------------ */
	function SaveToTemp(obj){
		
		var newPrice = obj.val();
		var productId = obj.attr("data-productid");
		
		$.ajax({
			type: "post",
			url: "js/process.php",
			data: "action=SaveToTemp&productId="+productId+"&price="+newPrice,
			success: function(data){
				// fade out the success save icon
				$(".naviEditInProgress").stop(true);
				$(".naviEditInProgress").fadeIn(500).delay(2000).fadeOut(500);
			},
			error: function(e){
				Message("error", "There was an error loading the data from function loadAll.<br> Error details: <br><hr><br>"+e.responseText);
			}
		});
	}
    
	// on save the new price to the temp table
	// when the input box looses focus
    $("body").on("change", ".newPrice", function(){
		
		var obj = $(this);
		
		SaveToTemp(obj); // save the price and id to the pricelist table
		
    });
	/* ------------------------------------------------------------------------------------------ */
	// create a row of data (called from LoadAll)
	/* ------------------------------------------------------------------------------------------ */
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
			
			content += "<div class='rowWrapper' data-rowid='"+i+"'>";

			// IMAGES
			if(data[i].thumb == ""){
				content += "<div class='rowImage'><i class='fas fa-image'></i></div>";
			} else {
				content += "<div class='rowImage' style='"+data[i].thumb+"'></div>";
			}
			
            content += "<div class='rowDetails'>";
                content += "<div class='rowDetailsTop'>";
                    content += "<div class='recordStatus'>";
            
                    // show web flag
                    if(flg_webHyoji == 1){
                        content += "<div class='statusBox statusBoxWebhyoji'>WEB<br>表示</div>";
                    } else {
                        content += "<div class='statusBox statusBoxWebhyoji statusBoxOff'>WEB<br>表示</div>";
                    }

                    // show web variation
                    if(flg_webVariation == 1){
                        content += "<div class='statusBox statusBoxWeb'>WEB<br>vari</div>";
                    } else {
                        content += "<div class='statusBox statusBoxWeb statusBoxOff'>WEB<br>vari</div>";
                    }

                    // show web variation
                    if(flg_webVariation == 1){
                        content += "<div class='statusBox statusBoxOther'>spare<br>parts</div>";
                    } else {
                        content += "<div class='statusBox statusBoxOther statusBoxOff'>spare<br>parts</div>";
                    }
            
                    content += "<div class='statusBox statusBoxWeb statusBoxOff'>紹介必要</div>";
                    content += "<div class='statusBox statusBoxWeb statusBoxOff'>検討中</div>";
                    content += "<div class='statusBox statusBoxWeb statusBoxOff'>物件用</div>";
                    
                    // show tform haiban
                    if(flg_tformHaiban == 1){
                        content += "<div class='statusBox statusBoxHaiban'>tform廃番</div>";
                    } else {
                        content += "<div class='statusBox statusBoxHaiban statusBoxOff'>tform廃番</div>";
                    }
            
                    // show maker haiban
                    if(flg_makerHaiban == 1){
                        content += "<div class='statusBox statusBoxHaiban'>maker廃番</div>";
                    } else {
                        content += "<div class='statusBox statusBoxHaiban statusBoxOff'>maker廃番</div>";
                    }
            
                    // show cancel selling
                    if(flg_cancelSelling == 1){
                        content += "<div class='statusBox statusBoxHaiban'>販売終了</div>";
                    } else {
                        content += "<div class='statusBox statusBoxHaiban statusBoxOff'>販売終了</div>";
                    }
            

                    content += "</div>"; // end of record status
			
            content += "\
					<div style='width: calc(50% - 162px); height: 100%; float: left; outline: 1px dashed black;'><input style='width: calc(100% - 5px); height: 100%; border: none; padding-left: 5px;' type='text' value='memo1' disabled='disabled'></div>\
					<div style='width: calc(50% - 162px); height: 100%; float: left; outline: 1px dashed black;'><input style='width: calc(100% - 5px); height: 100%; border: none; padding-left: 5px;' type='text' value='memo2' tabindex='-1'></div>\
            ";
            content += "</div>"; // end of row details Top
			
            content += "\
				<div class='rowDetailsBottom'>\
					<div class='rowDetailsCol' data-productid='"+data[i].productId+"'>"+data[i].productId+"</div>\
					<div class='rowDetailsCol' data-tformno='"+data[i].tformNo+"'>"+data[i].tformNo+"</div>\
					<div class='rowDetailsCol' data-makerno='"+data[i].makerNo+"'>"+data[i].makerNo+"</div>\
					<div class='rowDetailsCol' data-orderno='"+data[i].orderNo+"'>"+data[i].orderNo+"</div>\
					<div class='rowDetailsCol' data-series="+data[i].series+">"+data[i].series+"</div>\
					<div class='rowDetailsCol' data-productcolor='"+data[i].productColor+"'>"+data[i].productColor+"</div>\
				</div>\
				";
          
            content += "</div>"; // end of row details
            
            content += "\
			<div class='dataInputs' style=''>\
				<div class='dataInputsLeft'>\
				\
					<div style='width: 50%; height: 100%; float: left;'>\
						<div style='width: 100%; height: 50%;'>\
							<input class='oldPrice' type='text' value='"+data[i].sp_plCurrent+"' disabled='disabled' style='width: 100%; height: 100%; border: none; text-align: center;'>\
						</div>\
						<div class='spdiscratememo' data-spdiscratememo='"+data[i].sp_disc_rate_memo+"' style='width: 100%; height: 50%; display: flex; justify-content: center; align-items: center; color:"+data[i].sp_plCurrent_color+"'>"+data[i].sp_disc_rate_memo+"</div>\
					</div>\
\
					<div style='width: 50%; height: 100%; float: left;'>\
						<div style='width: 100%; height: 50%; background: green;'>\
							<input data-productid='"+data[i].productId+"' class='newPrice allow_decimal' type='text' value='"+data[i].temp_price+"'>\
						</div>\
						<div style='width: 100%; height: 50%; display: flex; justify-content: center; align-items: center;'>"+data[i].temp_priceListTitle+"</div>\
					</div>\
\
				</div>\
				<div class='dataInputsRight'>\
					<input class='bairitsu' style='width: 100%; height: 100%; border: none; text-align: center; font-size: 26px;' type='text' class='bairitsu' value='' disabled='disabled'>\
			</div>\
            ";
            content += "</div>";
			content += "</div>";
		}
		
		main.append(content);
		
		Start();
	}
	/* ------------------------------------------------------------------------------------------ */
    // load All data
	function LoadAll(){
		$.ajax({
			type: "post",
			url: "js/process.php",
			data: "action=LoadAll",
			success: function(data){
				NewRow(data);
			},
			error: function(e){
				Message("error", "There was an error loading the data from function loadAll.<br> Error details: <br><hr><br>"+e.responseText);
			}
		});
	}
	/* ------------------------------------------------------------------------------------------ */
    LoadAll();
	
	/* ------------------------------------------------------------------------------------------ */
	// START ALL STUFF AFTER LOADED
	/* ------------------------------------------------------------------------------------------ */
	function Start(){
		UpdateHeaderWidth(); // first time to update the header width, other times will be with a onWindowResize event.
		UpdateAllBairitsu(); // update the bairitsu stuffs
		OverlayFadeOut(); // remove the overlay
	}
	/* ------------------------------------------------------------------------------------------ */
	
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
	
	
	// reset all inputs
	// confirm dialog
	// shortcuts for saving and moving to next record
	// settings page - set the max and min for the bairitsu and highlight anything above the threshold
	// created/edit new maker conditions
	// add filter/search system
	
	// add excel export
	// add new import button to update filemaker data and new maker data. (need a system for this)
	// explaination of the system
	
	
	
	
	
	// filter for hiding haiban items
	
	
});
