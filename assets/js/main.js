var main = function () {
	"use strict";
	return {
		login:function(){
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
					var _form = $(form).serializeArray();
					console.log(_form);
					var data = system.ajax('assets/harmony/Process.php?login',_form);
					data.done(function(data){
                        var access = main.check_access();
						if(data == 1){
                            access = JSON.parse(access);
                            localStorage.setItem("hash",access[2]);
							Materialize.toast('Success.',1000,'',function(){
						    	$(location).attr('href','account/');
							});
						}
						else{
							$("#dsplay_login").addClass('jello');
							Materialize.toast('Failed.',1000,'',function(){
								$("#dsplay_login").removeClass('jello');
							});
						}
					});
		        }
			}); 
		},
        jobPosting:function(){
			var data = system.html('assets/harmony/Process.php?get-jobsPosts');
			data.done(function(data){
				data = JSON.parse(data);
				var count = 0;
				var feed = setInterval(function(){
					main.postJobs(data[count]);
					count++;
					if(count >= 5){
						clearInterval(feed);
					}
				},500);
			});
        },
        postJobs:function(data){
        	var content = "";
        	if(data[5] != "null"){     
	        	// var skills = JSON.parse(data[5]);
	        	// if(skills.length>0){
	        	// 	$.each(skills,function(i,v){
	        	// 		content += "<div class='chip'>"+v+"</div>";
	        	// 	})
	        	// }
        	}
        	var content = "<li class='collection-item avatar animated fadeInUp'>"+
							"    <i class='material-icons circle purple'>grade</i>"+
							"    <span class='title'>"+data[4]+"</span>"+
							"    <p>"+data[2]+"</p>"+
							data[5]+
							"    <a href='#!' class='secondary-content'>Apply</a>"+
							"</li>";
			$("#display_jobposts").append(content);
        },
        check_access:function(){
            var result = "";
            var ajax = system.html('assets/harmony/Process.php?get-session');
            ajax.done(function(data){
                if(data == 0){
                    $(location).attr('href','../');                     
                }
                else{
                    result = data;
                }
            })
            return result;
        },
        accounts_ini: function(){
			var sys = system, validate = validation, _this = this;
			var ajax = sys.ajax('../assets/harmony/Process.php?get-session',"");
			var data = ajax.responseText;
			if(data != ""){
				var data = JSON.parse(data);
				var ajax_accessLevel = sys.ajax('../assets/harmony/Process.php?get-accessLevel',data);
				var access = ajax_accessLevel.responseText.split(' ')

				return access[0];
			}
		},
        register_employer:function(){
			var sys = system, validate = validation;
			$("a[data-cmd='register_employer']").click(function(){
				var data = $("#form_registerEmployer").serializeArray();
				var validated = validate.validate_form(data);
				if(validated[0]>0){
					var message = "";
					$.each(validated[1],function(i,v){
						message += (i+1)+". "+v+"<br/>";
					})
					sys.errorNotif('The following fields has an error',message);
				}
				else{
					var ajax = system.html('assets/harmony/Process.php?do-registerEmployer',data);
					ajax.success(function(data){
						if(data == 0){
							sys.errorNotif('Notice','Email is already registered to an active account');
						}
						else if(data == 1){
							sys.successNotif('Success','You have successfully registered. <br/>You will be redirected in 3 seconds.');
							setTimeout(function(){$(location).attr('href','login.html');},3000);	
						}
						else{
							sys.errorNotif('Fatal Error','There was an error during the process.');
							console.log(data);							
						}
					})
				}
			});
		},

    };
}();
var validation = function () {
	"use strict";
	return {
		email: function(email){
			var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		    if (filter.test(email)) {
		        return true;
		    }
		    else {
		        return false;
		    }
	    },
		validate_form:function(form){
			var _this = this;
        	var fields = [];
			var flag = 0;
			$.each(form,function(i,v){
				var inputtype = $("input[name='"+v['name']+"']").data('inputtype');
				if(typeof inputtype != 'undefined'){
					if(inputtype == 'required'){
						if((v['value'] == "") || (v['value'] == null)){
							flag = 1;
							$("input[name='"+v['name']+"']").parent().addClass("has-error");
							fields.push($("input[name='"+v['name']+"']").attr('placeholder'));
						}
						else{
							$("input[name='"+v['name']+"']").parent().removeClass("has-error");
						}							
					}
				}
			});
			return [flag,fields];
		},
		validate:function(form){
			var _this = this;
        	var fields = [];
			var flag = 0;
			$.each(form,function(i,v){
				if(typeof $("input[name='"+v['name']+"']").data('inputtype') != 'undefined'){
					if($("input[name='"+v['name']+"']").data('inputtype') == 'required'){
						if((v['value'] == "") || (v['value'] == null)){
							flag = 1;
							$("input[name='"+v['name']+"']").parent().addClass("has-error");
							fields.push($("input[name='"+v['name']+"']").attr('placeholder'));
						}
						else{
							$("input[name='"+v['name']+"']").parent().removeClass("has-error");
						}
					}
				}
				else if(typeof $("textarea[name='"+v['name']+"']").data('inputtype') != 'undefined'){
					if($("textarea[name='"+v['name']+"']").data('inputtype') == 'required'){
						if((v['value'] == "") || (v['value'] == null)){
							flag = 1;
							$("textarea[name='"+v['name']+"']").parent().addClass("has-error");
							fields.push($("textarea[name='"+v['name']+"']").attr('placeholder'));
						}
						else{
							$("textarea[name='"+v['name']+"']").parent().removeClass("has-error");
						}
					}
				}
				else{
					//console.log('x');
				}
			});
			return [flag,fields];
		}
    };
}();

