var main = function () {
	"use strict";
	return {
		login:function(){/**/
		    $("#form_login").validate({
		        rules: {
		            field_email: {required: true,maxlength: 100},
		            field_password: {required: true,maxlength: 50},
		        },
		        errorElement : 'div',
		        errorPlacement: function(error, element) {
					var placement = $(element).data('error');
					if(placement){
						$(placement).append(error)
					} 
					else{
						error.insertAfter(element);
					}
				},
				submitHandler: function (form) {
					let _form = $(form).serializeArray();
					let data = system.ajax('assets/harmony/Process.php?login',[_form[0]['value'],_form[1]['value']]);
					data.done(function(data){
						// console.log(data);
						data = (data == "")? "error" : JSON.parse(data); 
						if(data != "error"){
							localStorage.setItem("hash",data[2]);
							sessionStorage.setItem('kareer',data[0]);
							system.alert('Success.',function(){
						    	$(location).attr('href','account/');
							});
						}
						else{
							$("#display_login").addClass('jello');
							system.alert('Failed.',function(){
								$("#display_login").removeClass('jello');
							});
						}
					});
		        }
			}); 
		},
		kill:function(){
			var data = system.ajax('../assets/harmony/Process.php?kill-session',"");
			data.done(function(data){
				if(data == 1){
			    	$(location).attr('href','../');			
				}
				else{
					Materialize.toast('Cannot process request.',4000);
					$(".display_loading").html("");
				}
			});
		},
		check:function(){
			var data = system.ajax('../assets/harmony/Process.php?check-login',"");
			data.done(function(data){
				if(data == 0){
			    	$(location).attr('href','../');							
				}
			});
		},
		backup:function(){
			var data = system.ajax('../assets/harmony/Process.php?do-backup',"");
			data.done(function(data){
				console.log(data);
			});
		}
    };
}();
