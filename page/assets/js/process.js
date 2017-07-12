var system = function(){
	"use strict";

	return {
		ini:function(){
			$("body").append("<script>console.log('%cDeveloped By: RNR Digital Consultancy (2017) http://rnrdigitalconsultancy.com ,,|,_', 'background:#f74356;color:#64c2ec;font-size:20px;')</script>");
		},
		ajax:function(url,data){
	        return $.ajax({
		        type: "POST",
		        url: url,
		        data: {data: data},
		        async: !1,
		        cache:false,
		        error: function() {
		            console.log("Error occured")
		        }
		    });
		},
		html:function(url){
	        return $.ajax({
		        type: "POST",
		        url: url,
                dataType: 'html',
		        async: !1,
		        cache:false,
		        error: function() {
		            console.log("Error occured")
		        }
		    });
		},
		xml:function(url){
	        return $.ajax({
		        type: "POST",
		        url: url,
                dataType: 'xml',
		        async: !1,
		        cache:false
		    });
		},
		send_mail:function(email,subject,message,callback){
			return system.ajax('assets/harmony/Process.php?send-mail',[email,subject,message]);
		},
		loading: function(_switch){
			if(_switch){ // show loader
				$('#loader-wrapper').addClass('animated zoomOut');
				setTimeout(function(){
					$("#loader-wrapper").addClass("hide-on-med-and-up hide-on-med-and-down");
				},1000);
			}
			else{
				setTimeout(function(){
					$("#loader-wrapper").removeClass("hide-on-med-and-up hide-on-med-and-down");
				},1000);
				$("#loader-wrapper").removeClass("zoomOut");
				$('#loader-wrapper').addClass('animated zoomIn');
			}
		},
		loader: function(_switch){
			if(_switch){ // show loader
				$(".progress").removeClass("hide-on-med-and-up hide-on-med-and-down");
				console.log('x');
			}
			else{
				$(".progress").addClass("hide-on-med-and-up hide-on-med-and-down");
				console.log('x');
			}
		},
		preloader:function(div){
			var data = system.xml("pages.xml");
			$(data.responseText).find("loader").each(function(i,content){
				$(div).html(content);
			});
		},
		block:function(status){
			if(status){
				$("#block-control").addClass('block-content')
			}
			else{
				$("#block-control").removeClass('block-content')
			}
		},
		clearForm:function(){
			$("form").find('input:text, input:password, input:file, select, textarea').val('');
			$("form").find('error').html('');
			$("form").find('input:text, input:password, input:file, select, textarea').removeClass("valid");
		    $("form").find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
		},
        searchJSON: function(obj, key, val) {
		    var objects = [];
		    for (var i in obj) {
		        if (!obj.hasOwnProperty(i)) continue;
		        if (typeof obj[i] == 'object') {
		            objects = objects.concat(this.searchJSON(obj[i], key, val));
		        } else if (i == key && obj[key] == val) {
		            objects.push(obj);
		        }
		    }
		    return objects;
		},
		resize:function(){
			var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    		if((width>0) && (width<=500)){
    			$("#main-display").removeClass("col-33").addClass("col-90");
    		}
    		else if((width>500) && (width<=768)){
    			$("#main-display").removeClass("col-33").addClass("col-70");
    		}
    		else{
    			$("#main-display").removeClass("col-90").addClass("col-33");
    		}
		}
	}
}();

var leads = function(){
	"use strict";
	return {
		save:function(){
			$("#form_saveLeads").validate({
			    rules: {
			        field_name: {required: true,maxlength: 50},
			        field_email: {required: true,maxlength: 50,checkEmail:true},
			        field_phone: {required: true,maxlength: 50},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					$(placement).html("");
					if(placement){
						var placement = $(element).data('error');
						if(placement){
							$(placement).append(error);
						} 
						else{
							error.insertAfter(element);
						}
					} 
					else{
						error.insertAfter(element);
						console.log('x');
					}
				},
  				submitHandler: function (form) {
					var _form = $(form).serializeArray();
					console.log(_form);
					var data = system.ajax('assets/harmony/Process.php?set-leads',_form);
					data.done(function(data){
						if(data == 1){
							$$("input").val("");
						    app.addNotification({
						        message: 'Thanks, we will send you updates regarding our app in your email.',
						        hold:2000,
						        button:""
						    });
						}
						else{
						    app.addNotification({
						        message: 'Cannot process request.',
						        hold:2000,
						        button:""
						    });
						}
					});
			    }
			});

			$("#form_saveLeadsMobile").validate({
			    rules: {
			        field_nameMobile: {required: true,maxlength: 50},
			        field_emailMobile: {required: true,maxlength: 50,checkEmail:true},
			        field_phoneMobile: {required: true,maxlength: 50},
			    },
			    errorElement : 'div',
			    errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					$(placement).html("");
					if(placement){
						var placement = $(element).data('error');
						if(placement){
							$(placement).append(error);
						} 
						else{
							error.insertAfter(element);
						}
					} 
					else{
						error.insertAfter(element);
						console.log('x');
					}
				},
				messages: {
					field_name: {
						required: "<i data-error='Field is required' class='icon f7-icons color-red' style='margin: 5px;'>info</i>",
						maxlength: "<i data-error='Name is too long' class='icon f7-icons color-red' style='margin: 5px;'>info</i>",
					},
					field_email: {
						required: "<i data-error='Field is required' class='icon f7-icons color-red' style='margin: 5px;'>info</i>",
						maxlength: "<i data-error='Name is too long' class='icon f7-icons color-red' style='margin: 5px;'>info</i>",
						checkEmail: "<i data-error='Email is invalid' class='icon f7-icons color-red' style='margin: 5px;'>info</i>",
					},
					field_phone: {
						required: "<i data-error='Field is required' class='icon f7-icons color-red' style='margin: 5px;'>info</i>",
						maxlength: "<i data-error='Name is too long' class='icon f7-icons color-red' style='margin: 5px;'>info</i>",
					}
				},
  				submitHandler: function (form) {
					var _form = $(form).serializeArray();
					console.log(_form);
					var data = system.ajax('assets/harmony/Process.php?set-leads',_form);
					data.done(function(data){
						if(data == 1){
							$$("input").val("");
						    app.addNotification({
						        message: 'Thanks, we will send you updates regarding our app in your email.',
						        hold:2000,
						        button:""
						    });
						}
						else{
						    app.addNotification({
						        message: 'Cannot process request.',
						        hold:2000,
						        button:""
						    });
						}
					});
			    }
			});

			$$("a[ data-cmd='error']").on("click",function(){
				var _this = this;
				var content = '<div class="popover">'+
									'	<div class="popover-inner">'+
									'		<div class="content-block" style="margin: 5px;">'+
									'			'+$(this).find('i').data('error')+
									'		</div>'+
									'	</div>'+
									'</div>'
				app.popover(content, _this);
			});
		},
	}
}();

var loop = function(){
    "use strict";
	return {
		go:function(time){
			$("body").append("<script>console.log('%cDeveloped By: RNR Digital Consultancy (2017) http://rnrdigitalconsultancy.com ,,|,_', 'background:#f74356;color:#64c2ec;font-size:20px;')</script>");
			if((time > 6) && (time <= 14)){
				$("body").append('<script type="text/javascript" src="assets/js/forest.js"></script>');
				$("body").append('<script type="text/javascript" src="assets/js/game-forest.js"></script>');
			}
			else if((time > 14) && (time <= 22)){
				$("body").append('<script type="text/javascript" src="assets/js/city.js"></script>');
				$("body").append('<script type="text/javascript" src="assets/js/game-city.js"></script>');
			}
			else{
				$("body").append('<script type="text/javascript" src="assets/js/night.js"></script>');
				$("body").append('<script type="text/javascript" src="assets/js/game-night.js"></script>');
			}
			// setTimeout(function(){
			// 	loop.go();
			// },3000);		
		}
	}
}();

Framework7.prototype.plugins.statistics = function (app, params) {
	var count = 0;
    return {
        hooks: {
            appInit: function () {
            }
        }
    };
};

var $$ = Dom7;
var app = new Framework7({
	material:true,
});