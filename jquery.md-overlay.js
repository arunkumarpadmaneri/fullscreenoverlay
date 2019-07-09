(function($) {
$.fn.fancyoverlay = function(action,options){
	var currentobj = $(this);
	var defaults = {
			"title":"",
			"url":"nourl",
			"data":{},
			"async":true
		};
	var settings = $.extend({},defaults,options);
	onhide   = function(e){

	};
	closefn = function(e){
	    $(this).closest(".md-overlay").css("height","0");
		$(this).closest(".md-overlay").trigger("hide.overlay");
	};
	if(action == "show"){
	 	var url  = settings.url;
	 	var data = settings.data;
	 	console.log("test fn call");
	  $.get( url,data,function(res){
	    $(currentobj).find(".md-overlay-content").html(res);
	    $("body").addClass("md-overlay-open");
	  	$(currentobj).css("height","100%");
	  	$(currentobj).off("click",".md-overlay-closebtn").on("click",".md-overlay-closebtn",closefn);
	  	var id=$(currentobj).attr("id")
		document.getElementById(id).addEventListener("transitionend",function(event){
			console.log("property Name",event.propertyName)
	      	var height=$(currentobj).height();
	      	console.log("height",height);
	      	if(height==0){
		      	$("body").removeClass("md-overlay-open");
		     	$(currentobj).closest(".md-overlay-header").css("position","");
				$(currentobj).trigger("hidden.overlay");
				document.getElementById(id).removeEventListener("transitionend",function(){console.log("listener transition removed")},false);
			}else{

			}
		},false);
	  	return this;
	  }); 
	}else if(action ==="close"){
		console.log("close called");
	    $("body").addClass("md-overlay-open");
	  	$(currentobj).css("height","0");
		return this;		
	}
 }
})(jQuery);
