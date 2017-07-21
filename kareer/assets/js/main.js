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
						console.log(data);
						if(data == 1){
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
	        	var skills = JSON.parse(data[5]);
	        	if(skills.length>0){
	        		$.each(skills,function(i,v){
	        			content += "<div class='chip'>"+v+"</div>";
	        		})
	        	}
        	}
        	var content = "<li class='collection-item avatar animated fadeInUp'>"+
							"    <i class='material-icons circle purple'>grade</i>"+
							"    <span class='title'>"+data[4]+"</span>"+
							"    <p>"+data[2]+"</p>"+
							content+
							"    <a href='#!' class='secondary-content'>Apply</a>"+
							"</li>";
			$("#display_jobposts").append(content);
        },
        account_ini:function(){
			var ajax = system.html('../assets/harmony/Process.php?get-session');
			ajax.done(function(data){
				// data = JSON.parse(data);

				console.log(data);
				// var ajax_accessLevel = sys.do_ajax('../assets/harmony/Process.php?get-accessLevel',data);
				// var access = ajax_accessLevel.responseText.split(' ')

				// return access[0];
			});
        }
    };
}();
