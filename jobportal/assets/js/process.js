var system = function () {
	"use strict";
	return {
		errorNotification: function(title,message){
			toastr.options = {
			  "progressBar": true,
			  "positionClass": "toast-top-left",
			  "preventDuplicates": true,
			  "onclick": null,
			  "showDuration": "100",
			  "hideDuration": "100",
			  "timeOut": "3000",
			  "extendedTimeOut": "3000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}					
            toastr.error(message,title)
		},	
		successNotification: function(title,message){
			toastr.options = {
			  "progressBar": true,
			  "positionClass": "toast-top-left",
			  "preventDuplicates": true,
			  "onclick": null,
			  "showDuration": "100",
			  "hideDuration": "100",
			  "timeOut": "3000",
			  "extendedTimeOut": "3000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}					
            toastr.success(message,title)
		},
        modalLarge: function(title, subtitle, body){
        	$("#modalLarge").modal('show');
        	$("#modalLarge .modal-title").html(title);
        	$("#modalLarge .font-bold").html(subtitle);
        	$("#modalLarge .modal-body").html(body);
        },
        close_modalLarge: function(){ 
        	$("#modalLarge").modal('hide');
        	$(".modal-backdrop").addClass('hidden');
        },
        modalSmall: function(title, subtitle, body){
        	$("#modalSmall").modal('show');
        	$("#modalSmall .modal-title").html(title);
        	$("#modalSmall .font-bold").html(subtitle);
        	$("#modalSmall .modal-body").html(body);
        },
        close_modalSmall: function(){ 
        	$("#modalSmall").modal('hide');
        	$(".modal-backdrop").addClass('hidden');
        },
        confim: function(title, callback) {
			swal({
		        title: title,
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: "#DD6B55",
		        confirmButtonText: "Confirm",
		        animation:false,
		        closeOnConfirm: false
		    }, 
		    function () {
				callback();
		    });		
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
        sortResults : function (data,prop, asc) {
            data = data.sort(function(a, b) {
                if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            });
            return data;
        },
		do_ajax: function(url,data){
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
		computeAccount:function(data){
			var a = [], b = [], report, completion = 0;
			$.each(data[0],function(i,v){
				if(v != ""){
					a.push(v);
				}
				else{
					b.push(i);
				}
			});
			completion = Math.floor((a.length / data[0].length) * 100);
			report = [completion,a,b];
			return report;
		},
		send_mail:function(email,message){
			var ajax = this.do_ajax('../assets/harmony/Process.php?send-mail',[email,message]);
			ajax.success(function(data){
			});
		},
		StringCounter:function(input,id,allowed){
		    var a = allowed-input.length;
		    if(a >= 0 && a <= 1){
		        id.html(a+" character remaining");
		    }
		    else if(a == -1){
		        id.html(-1*a+" character exceeded");
		    }
		    else if(a <= -2){
		        id.html(-1*a+" characters exceeded");
		    }
		    else{
		        id.html(a+" characters remaining");
		    }
		},
		date:function(){
			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss",
			    autoUpdate: true,
			    messages:{
				    second: "Just now",
				    seconds: "%s seconds %s",
				    minute: "A minute %s",
				    minutes: "%s minutes %s",
				    hour: "A hour %s",
				    hours: "%s hours %s",
				    day: "A day %s",
				    days: "%s days %s",
				    week: "A week %s",
				    weeks: "%s weeks %s",
				    month: "A month %s",
				    months: "%s months %s",
				    year: "A year %s",
				    years: "%s years %s",
				    yesterday: "Yesterday",
				    beforeYesterday: "2 days ago",
				    tomorrow: "Tomorrow",
				    afterTomorrow: "The next day"
				}
			});
		},
		do_upload:function(url,fallback_success,fallback_error){
            var f = document.getElementById('file'),
                pb = document.getElementById('pb'),
                pt = document.getElementById('pt');
            app.uploader({
                files: f,
                progressBar: pb,
                progressText: pt,
                processor: url,
                finished: function(data){
                    var uploads = document.getElementById('uploads'),
                        succeeded = document.createElement('div'),
                        failed = document.createElement('div'),
                        anchor,
                        span,
                        x,string;
                        uploads.innerText = '';
                        
                        if(data.succeeded.length > 0){
                            fallback_success(data.succeeded);                        	
                        }
                        if(data.failed.length > 0){
                            fallback_error(data.failed);
                        }
                },
            });
		},
		truncate: function(string, length, delimiter) {
		   delimiter = delimiter || "&hellip;";
		   return string.length > length ? string.substr(0, length) + delimiter : string;
		}
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

var mainProcess = function () {
	"use strict";
	return {
		register_applicant:function(){
			var sys = system, validate = validation;
			$("a[data-cmd='register_applicant']").click(function(){
				var data = $("#form_registerApplicant").serializeArray();
				var validated = validate.validate_form(data);
				if(validated[0]>0){
					var message = "";
					$.each(validated[1],function(i,v){
						message += (i+1)+". "+v+"<br/>";
					})
					sys.errorNotification('The following fields has an error',message);
				}
				else{
					var ajax = sys.do_ajax('assets/harmony/Process.php?do-registerApplicant',data);
					ajax.success(function(data){
						if(data == 0){
							sys.errorNotification('Notice','Email is already registered to an active account');
						}
						else if(data == 1){
							sys.successNotification('Success','You have successfully registered. <br/>You will be redirected in 3 seconds.');
							setTimeout(function(){$(location).attr('href','login.html');},3000);	
						}
						else{
							sys.errorNotification('Fatal Error','There was an error during the process.');
							console.log(data);							
						}
					})
				}
			});
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
					sys.errorNotification('The following fields has an error',message);
				}
				else{
					var ajax = sys.do_ajax('assets/harmony/Process.php?do-registerEmployer',data);
					ajax.success(function(data){
						if(data == 0){
							sys.errorNotification('Notice','Email is already registered to an active account');
						}
						else if(data == 1){
							sys.successNotification('Success','You have successfully registered. <br/>You will be redirected in 3 seconds.');
							setTimeout(function(){$(location).attr('href','login.html');},3000);	
						}
						else{
							sys.errorNotification('Fatal Error','There was an error during the process.');
							console.log(data);							
						}
					})
				}
			});
		}, 	
		handle_logIn:function(){
			var sys = system, validate = validation;
			$("a[data-cmd='btn_login']").click(function(){
				var node = $(this).data('node'),data = [];

				if(node == 'employer')
					data = $("#form_loginEmployer").serializeArray();
				else
					data = $("#form_loginStudent").serializeArray();

				if((data[0]["value"] == "") || (data[1]["value"] == "")){
					console.log('xx');
					$(this).parent('form').parent('div').find(".login_message").css({"display":"block"});
				    setTimeout( function(){$(this).parent('form').parent('div').find(".login_message").fadeOut();}, 5000 );
				}
				else{
					var ajax = sys.do_ajax('assets/harmony/Process.php?get-login',data);
					ajax.success(function(data){
						if(data == 0){
							$(this).parent('form').parent('div').find(".login_message").css({"display":"block"});
						    setTimeout( function(){$("#login_message").fadeOut();}, 5000 );
						}
						else if((data >= 1) && (data <= 4)){
							$(this).parent('form').parent('div').find(".login_message").css({"display":"block"}).html('Log in success. You will be redirected within 3 seconds');
							setTimeout(function(){$(location).attr('href','account/');},3000);	
						}
						else{
							$(this).parent('form').parent('div').find(".login_message").css({"display":"block"}).html('Error. Unable to log in.');
						    setTimeout( function(){$(this).parent('form').parent('div').find(".login_message").fadeOut();}, 5000 );
							console.log(data);							
						}
					})
				}
			});
		},
		set_account: function(data){
			var picture = "../assets/img/profile avatar.jpg";
			if(data[1] != "")
				picture = data[1];
		},
		get_apr:function(image){
			var ajax = system.do_ajax('../assets/img/'+image,'');
			return ajax.responseText;
		},
		get_aprhome:function(image){
			var ajax = system.do_ajax(image,'');
			return ajax.responseText;
		},
		get_resume:function(resume){
			var ajax = system.do_ajax('../assets/files/'+resume,'');
			console.log('x');
			return ajax.responseText;
		},
		accounts_ini: function(){
			var sys = system, validate = validation, _this = this;
			var ajax = sys.do_ajax('../assets/harmony/Process.php?get-session',"");
			var data = ajax.responseText;
			if(data != ""){
				var data = JSON.parse(data);
				var ajax_accessLevel = sys.do_ajax('../assets/harmony/Process.php?get-accessLevel',data);
				var access = ajax_accessLevel.responseText.split(' ')

				return access[0];
			}
		},
		check_access:function(){
			var sys = system, validate = validation, _this = this;
			var ajax = sys.do_ajax('../assets/harmony/Process.php?get-session',"");
			var data = ajax.responseText;
			if(data == 0){
				data = JSON.parse(data);
				if((data == "") || (typeof data['u7836'] == 'undefined') || (typeof data['p7836'] == 'undefined')){
					$(location).attr('href','../');	
					console.log("access denied.");
				}
			}
		},
		applicant_ini:function(){
			var sys = system, validate = validation, _this = this;
			var ajax = sys.do_ajax('../assets/harmony/Process.php?get-account',"");
			var data = ajax.responseText;
			var picture = "../assets/img/profile avatar.jpg", description = "No description yet.";
			data = JSON.parse(data);
			console.log(data);

			if(data[0][6] != ""){
				var imageData = data[0][6].split('.');
				if(imageData[imageData.length-1]!='apr')
					picture = "../assets/img/"+data[0][6];					
				else
					picture = mainProcess.get_apr(data[0][6]);
			}

			var accountCompute = sys.computeAccount(data);
			if(accountCompute[0]<100){
				var fields = ["id","Last Name","First Name","Middle Name","Address","Contact Number","Image","Description","Resume","Email","Password","Gender"];
				var subcontent = "", content = "";

				$.each(accountCompute[2],function(i,v){
					if(fields[v] == "Description"){
						subcontent += "<li class='list-group-item'>"+fields[v]+": <textarea data-inputtype='required' placeholder='"+fields[v]+"' class='form-control' name='"+fields[v]+"' style='resize: none;'></textarea></li>";						
					}
					else{
						subcontent += "<li class='list-group-item'>"+fields[v]+": <input data-inputtype='required' placeholder='"+fields[v]+"' type='text' class='form-control' name='"+fields[v]+"'></li>";						
					}
				});

				subcontent = "<strong>You need to complete the following:</strong><form class='form-horizontal' id='form_completion' role='form' method='post' enctype='multipart/form-data'><ul class='list-group clear-list'>"+subcontent+"</ul></form>";
				content = "<div class='row col-md-12' style='float:none;'><div class='row col-md-5 text-center'>"+
							"    <h1>"+accountCompute[0]+"%</h1><h2>Complete</h2>"+
							"</div>"+
							"<div class='row col-md-8'>"+
								subcontent+
							"<a class='btn btn-sm btn-block btn-success' data-cmd='save_info'>Save</a></div>"+
							"</div>";

				$("#account").html(content);
				$("a[data-cmd='save_info']").click(function(){
		    		var completiondata = $("#form_completion").serializeArray();

					var validated = validate.validate(completiondata);
					if(validated[0]>0){
						var message = "";
						$.each(validated[1],function(i,v){
							message += (i+1)+". "+v+"<br/>";
						})
						sys.errorNotification('The following fields has an error',message);
					}
					else{
			    		var newdata = [completiondata,data[0][0]];
						var ajax = system.do_ajax('../assets/harmony/Process.php?do-completeData',newdata);
						ajax.success(function(data){
							if(data == 1){
								swal("Successful!", "Employer's information has been saved.", "success");
								App.handleLoadPage(window.location.hash);
							}
							else{
								swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
								console.log(data);
							}
						});
					}

				});
			}


			//picture
			$(".profile-element span img").prop({"src":picture});
			$("#ajax-content img").prop({"src":picture});
			//name
			$(".profile-element .font-bold").html(data[0][1]+", "+data[0][2]+" "+data[0][3]);
			$("#ajax-content .profile-content strong").html(data[0][1]+", "+data[0][2]+" "+data[0][3]);
			//addres
			$("#ajax-content .profile-content ._address").html(data[0][4]);
			$("#ajax-content .profile-content ._description").html(description);

			$("a[data-cmd]").click(function(){
				$("a").parent('li').removeClass("active");
				$(this).parent('li').addClass("active");
				var data = $(this).data('cmd');
				if(data == "jobs"){
					console.log("jobs");
				}
				else if(data == "applications"){
					console.log("application");
				}
				else if(data == "log-out"){
					var ajax = sys.do_ajax('../assets/harmony/Process.php?kill-session',"");
					_this.check_access();
				}
				else{
					console.log('dashboard');
				}
			});
		},
		student_ini:function(){
			var sys = system, validate = validation, _this = this;
			var ajax = sys.do_ajax('../assets/harmony/Process.php?get-account',"");
			var data = JSON.parse(ajax.responseText);
			var picture = "../assets/img/profile avatar.jpg", description = "No description yet.";
			var metadata = JSON.parse(data[0][4]);

			if(data[0][5] != ""){
				var imageData = data[0][5].split('.');
				if(imageData[imageData.length-1]!='apr')
					picture = "../assets/img/"+data[0][5];					
				else
					picture = mainProcess.get_apr(data[0][5]);
			}

			if(data[0][3] != ""){
				var resume = JSON.parse(data[0][3]);
				resume = "Uploaded since: <span class='prettydate'>"+resume[0]+"</span>.<br/> <small class='text-navy'>At exactly "+resume[0]+"</small>";
			}
			else{
				resume = "No resume yet. Upload now.";
			}


			//picture
			$(".profile-element span img").prop({"src":picture});
			$("#ajax-content img").prop({"src":picture});
			//name
			$(".profile-element .font-bold").html(metadata[0]+", "+metadata[1]+" "+metadata[2]);
			$("#ajax-content .profile-content strong").html(metadata[0]+", "+metadata[1]+" "+metadata[2]);
			//addres
			$("#text_resume span").html(resume);

			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss"
			});

			$("a[data-cmd]").click(function(){
				$("a").parent('li').removeClass("active");
				$(this).parent('li').addClass("active");
				var data = $(this).data('cmd');
				if(data == "jobs"){
					console.log("jobs");
				}
				else if(data == "applications"){
					console.log("application");
				}
				else if(data == "log-out"){
					var ajax = sys.do_ajax('../assets/harmony/Process.php?kill-session',"");
					_this.check_access();
				}
				else{
					console.log('dashboard');
				}
			});

		},
		employer_ini:function(){
			var sys = system, validate = validation, _this = this;
			var ajax = sys.do_ajax('../assets/harmony/Process.php?get-account',"");
			var data = JSON.parse(ajax.responseText);
			var picture = "../assets/img/profile avatar.jpg",
			description = "No description yet.",
			lname = "Set your last name",
			gname = "Set your given name",
			address = "Set your company's address",
			bir = "Set your company's BIR number",
			dti = "Set your company's DTI number",
			company = "Set your company's name",
			contactnumber = "Set your company's contact number",
			email = "Set your company's email";

			if(data[0][9] != ""){
				var imageData = data[0][9].split('.');
				if(imageData[imageData.length-1]!='apr'){
					console.log(imageData.length);
					picture = "../assets/img/"+data[0][9];					
				}
				else{
					picture = _this.get_apr(data[0][9]);					
				}
			}
			if(data[0][5] != "")
				company = data[0][5];
			if(data[0][6] != "")
				description = data[0][6];
			if(data[0][7] != "")
				dti = data[0][7];
			if(data[0][8] != "")
				bir = data[0][8];
			if(data[0][2] != "")
				gname = data[0][2];
			if(data[0][1] != "")
				lname = data[0][1];
			if(data[0][3] != "")
				address = data[0][3];
			if(data[0][4] != "")
				contactnumber = data[0][4];
			if(data[0][10] != "")
				email = data[0][10];
			if((data[0][1] != "") || (data[0][2] != ""))
				name = data[0][1]+", "+data[0][2];

    		$("#text_company span").html(company);
    		$("#text_description span").html(description);
    		$("#text_DTI span").html(dti);
    		$("#text_BIR span").html(bir);
    		$("#text_givenName span").html(gname);
    		$("#text_familyName span").html(lname);
    		$("#text_address span").html(address);
    		$("#text_contactnumber span").html(contactnumber);
    		$("#text_email span").html(email);



			if(window.location.hash != '#cmd=index;content=profile'){
				if(data[0][12] == 2){
					$("a[data-cmd='jobs']").addClass('hidden');
					$("a[data-cmd='jobs-posting']").addClass('hidden');
					$("a[data-cmd='applications']").addClass('hidden');
					var content = "<div class='col-md-offset-3 col-md-6 text-center' style='margin-top: 150px;'>"+
									"    <div class='sk-spinner sk-spinner-wandering-cubes'>"+
									"        <div class='sk-cube1'></div>"+
									"        <div class='sk-cube2'></div>"+
									"    </div>"+
									"    <h1><br/><strong>DECLINED</strong></h1><h2>Your membership request has been declined.</h2>"+
									"</div>";
					$("#page-wrapper").html(content);
				}
				else if(data[0][12] == 0){
					$("a[data-cmd='jobs']").addClass('hidden');
					$("a[data-cmd='jobs-posting']").addClass('hidden');
					$("a[data-cmd='applications']").addClass('hidden');
					var content = "<div class='col-md-offset-3 col-md-6 text-center' style='margin-top: 150px;'>"+
									"    <div class='sk-spinner sk-spinner-pulse'>"+
									"    </div>"+
									"    <h2>Your membership request is waiting for approval.</h2>"+
									"</div>";
					$("#page-wrapper").html(content);
				}
			}
			else{
				if(data[0][12] == 2){
					$("a[data-cmd='jobs']").addClass('hidden');
					$("a[data-cmd='jobs-posting']").addClass('hidden');
					$("a[data-cmd='applications']").addClass('hidden');
				}
				else if(data[0][12] == 0){
					$("a[data-cmd='jobs']").addClass('hidden');
					$("a[data-cmd='jobs-posting']").addClass('hidden');
					$("a[data-cmd='applications']").addClass('hidden');
				}
			}

			var accountCompute = sys.computeAccount(data);
			if(accountCompute[0]<100){
				var fields = ["id","Last Name","First Name","Address","Contact Number","Company Name","Description","DTI Number","BIR Number","Picture","Email","Password","Status"];
				var subcontent = "", content = "";

				$.each(accountCompute[2],function(i,v){
					if(fields[v] == "Description"){
						subcontent += "<li class='list-group-item'>"+fields[v]+": <textarea data-inputtype='required' placeholder='"+fields[v]+"' class='form-control' name='"+fields[v]+"' style='resize: none;'></textarea></li>";						
					}
					else{
						subcontent += "<li class='list-group-item'>"+fields[v]+": <input data-inputtype='required' placeholder='"+fields[v]+"' type='text' class='form-control' name='"+fields[v]+"'></li>";						
					}
				});

				subcontent = "<strong>You need to complete the following:</strong><form class='form-horizontal' id='form_completion' role='form' method='post' enctype='multipart/form-data'><ul class='list-group clear-list'>"+subcontent+"</ul></form>";
				content = "<div class='row col-md-12' style='float:none;'><div class='row col-md-5 text-center'>"+
							"    <h1>"+accountCompute[0]+"%</h1><h2>Complete</h2>"+
							"</div>"+
							"<div class='row col-md-8'>"+
								subcontent+
							"<a class='btn btn-sm btn-block btn-success' data-cmd='save_info'>Save</a></div>"+
							"</div>";

				$("#account").html(content);
				$("a[data-cmd='save_info']").click(function(){
		    		var completiondata = $("#form_completion").serializeArray();

					var validated = validate.validate(completiondata);
					if(validated[0]>0){
						var message = "";
						$.each(validated[1],function(i,v){
							message += (i+1)+". "+v+"<br/>";
						})
						sys.errorNotification('The following fields has an error',message);
					}
					else{
			    		var newdata = [completiondata,data[0][0]];
						var ajax = system.do_ajax('../assets/harmony/Process.php?do-completeData',newdata);
						ajax.success(function(data){
							if(data == 1){
								swal("Successful!", "Employer's information has been saved.", "success");
								App.handleLoadPage(window.location.hash);
							}
							else{
								swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
								console.log(data);
							}
						});
					}

				});
			}

			//picture
			$(".profile-element span img").prop({"src":picture});
			$("#ajax-content img").prop({"src":picture});
			//name
			$(".profile-element .font-bold").html(data[0][5]+"<br/>"+name);
			$("#ajax-content .profile-content strong").html(data[0][5]+"<br/>"+name);
			//addres
			$("#ajax-content .profile-content ._address").html(data[0][3]);
			$("#ajax-content .profile-content ._description").html(description);

			$("a[data-cmd]").click(function(){
				$("a").parent('li').removeClass("active");
				$(this).parent('li').addClass("active");
				var data = $(this).data('cmd');
				if(data == "log-out"){
					var logout_data = sys.do_ajax('../assets/harmony/Process.php?kill-session',ajax.responseText);
					_this.check_access();
				}
			});
		},
		admin_ini:function(){
			var sys = system, validate = validation, _this = this, _apps = App;
			var ajax = sys.do_ajax('../assets/harmony/Process.php?get-account',"");
			var data = ajax.responseText;
			var picture = "../assets/img/profile avatar.jpg", level = "";
			data = JSON.parse(data);

			if(data[0][3] != ""){
				var imageData = data[0][3].split('.');
				if(imageData[imageData.length-1]!='apr'){
					console.log(imageData.length);
					picture = "../assets/img/"+data[0][3];					
				}
				else{
					picture = _this.get_apr(data[0][3]);					
				}
			}

			if(data[0][5] == 1)
				level = "Administrator";

    		$("#text_givenName span").html(data[0][1]);

    		$("#text_familyName span").html(data[0][2]);

    		$("#text_userName span").html(data[0][4]);

			//picture
			$(".profile-element span img").prop({"src":picture});
			$("#ajax-content img").prop({"src":picture});
			//name
			$(".profile-element .font-bold").html(data[0][1]+", "+data[0][2]);
			$("#ajax-content .profile-content strong").html(data[0][1]+", "+data[0][2]);
			//addres
			$("#ajax-content .profile-content p").html(level);

			$("a[data-cmd]").click(function(){
				$("a").parent('li').removeClass("active");
				$(this).parent('li').addClass("active");
				var data = $(this).data('cmd');
				if(data == "jobs"){
					//console.log("jobs");
					//console.log(_apps);
				}
				else if(data == "applications"){
					//console.log("application");
				}
				else if(data == "log-out"){
					var ajax = sys.do_ajax('../assets/harmony/Process.php?kill-session',"");
					_this.check_access();
				}
				else{
					//console.log('dashboard');
				}
			});
		},
		get_account: function(){
			var ajax = system.do_ajax('../assets/harmony/Process.php?get-account',"");
			return ajax.responseText;
		},
        jobposting:function(){
			var ajax = system.do_ajax('assets/harmony/Process.php?do-getAllJobsPosts',"");
			var ajaxData = JSON.parse(ajax.responseText);
			var content = "";
			console.log(ajaxData);

			if(ajaxData.length>0){
				var content = "<table class='table' id='table_jobs'>"+
								"	<thead>"+
								"		<tr>"+
								"			<th width='5%'>Status</th>"+
								"			<th width='50%'>Job</th>"+
								"			<th width='30%'>Applicants</th>"+
								"		</tr>"+
								"	</thead>"+
								"</table>";

				$("#job-posts").html(content);

				$('#table_jobs').DataTable({
				    data: ajaxData,
				    sort: false,
				    "info": false,
				    "searching": false,
				    "lengthChange": false,
					"columnDefs": [
						{ className: "project-status", "targets": [ 0 ] },
						{ className: "project-title", "targets": [ 1 ] },
						{ className: "project-people", "targets": [ 2 ] },
					],
				    columns: [
				        {data: "",
				            render: function ( data, type, full ){
								var status = "<span class='label label-primary'>Active</span>";
								var applicationexpiry = new Date(full[0][3]), now = new Date();

								if(applicationexpiry<now){
									status = "<span class='label label-danger'>Inactive</span>";
								}
				                return status;
				            }
				        },
				        {data: "",
				            render: function ( data, type, full ){
				            	var details = "<a>"+full[0][4]+"</a><br><small>"+full[0][2]+"</small><br/>";
				                return details;
				            }
				        },
				        {data: "",
				            render: function ( data, type, full ){
				            	var details = "";
								if(full[1].length>0){
									$.each(full[1],function(i,v){
										var data_applicants = JSON.parse(v[2]);
										if(i<4){
							            	details += "<img alt='image' class='img-circle' src='"+mainProcess.get_aprhome('assets/img/'+data_applicants[2])+"' style='margin-right: 5px;'>";
										}
										else{
											var count = full[1].length-i;
											console.log(i);
											if(i>13)
												count = 9+"+";

							            	details += "<div class='vertical-timeline-icon blue-bg pull-right' style='position: relative;width: 32px !important;height: 32px !important;border: 3px solid #1C84C6;'>"+
														"    <h3>"+count+"</h3>"+
														"</div>";
											return false;
										}
									});
								}
								else{
									details = "No Applicant";
								}
				                return details;
				            }
				        },
				    ]
				});
			}
			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss"
			});			//ajax.success(function(data){});
        },
    };
}();

var administrator = function () {
	"use strict";
	return {
		list_employer: function(){
			var sys = system, validate = validation, _this = this, _apps = App;
			var ajax = sys.do_ajax('../assets/harmony/Process.php?get-allEmployer',"");
			ajax.success(function(data){
				var arrPending = [], arrApproved = [], arrDeclined = [];
				if(data != ""){
					var data = JSON.parse(data);
					sys.sortResults(data,12,false);
					$.each(data,function(i,v){
						if(v[12] == 0)
				            arrPending.push(v);					
						else if(v[12] == 2)
				            arrDeclined.push(v);					
						else
				            arrApproved.push(v);
					});

					if(arrApproved.length>0){
						var content = "<table class='table table-bordered' id='table_approvedEmployers'>"+
										"	<thead>"+
										"		<tr>"+
										"			<th width='5%'></th>"+
										"			<th width='80%'>Name</th>"+
										"			<th width='15%'></th>"+
										"		</tr>"+
										"	</thead>"+
										"</table>";

						$("#approved_employers .ibox-content").html(content);

						$('#table_approvedEmployers').DataTable( {
						    data: arrApproved,
						    sort: false,
							"columnDefs": [
								{ className: "client-avatar", "targets": [ 0 ] },
								{ className: "text-left", "targets": [ 1 ] }
							],
						    columns: [
						        {data: "",
						            render: function ( data, type, full ){
										var picture = "../assets/img/profile avatar.jpg";
										if(full[9] != ""){
											var imageData = full[9].split('.');
											if(imageData[imageData.length-1]!='apr'){
												picture = "../assets/img/"+full[9];					
											}
											else{
												picture = mainProcess.get_apr(full[9]);					
											}
										}

						            	var details = '<img alt="image" src="'+picture+'">';
						                return details;
						            }
						        },
						        {data: "",
						            render: function ( data, type, full ){
						            	var details = full[5]+"<br/><i>"+system.truncate(full[6],100)+"</i>";
						                return details;
						            }
						        },
						        {data: "",
						            render: function ( data, type, full ){
						            	var details = "<a data-id='"+full[0]+"' data-cmd='options_approvedEmployer' class='btn btn-success btn-xs btn-block'>Details</a>";
						                return details;
						            }
						        },
						    ]
						});
					}

					if(arrPending.length>0){
						var content = "";
						$.each(arrPending,function(i,v){
							content += "<tr>"+
										"	<td class='text-left' width='80%'>"+(i+1)+". "+v[5]+"</td>"+
										"	<td width='20%'><a data-id='"+v[0]+"' data-cmd='options_pendingEmployer' class='btn btn-danger btn-xs btn-block'>Options</a></td>"+
										"</tr>";
						});

						content = "<table class='table table-bordered' id='table_pendingEmployers'>"+content+"</table>";
						$("#pending_employers .ibox-content").html(content);
					}
					else{
						$("#pending_employers .ibox-content").html("<h2>All caught up. </h2><h4>No pending request for employer's account approval</h4>");
					}

					$("a").click(function(){
						var cmd = $(this).data('cmd');
						var id = $(this).data('id');
						if(cmd == 'options_pendingEmployer'){
							var data = sys.searchJSON(arrPending,0,id);
							var content = "<div class='col-md-offset-3 col-md-6' style='float:none !important;'>"+
											"	<table class='table table-bordered ibox-content'>"+
											"		   <tr><td width='20%'>Company: </td><td width='80%'>"+data[0][5]+"</td></tr>"+
											"		   <tr><td>Description: </td><td>"+data[0][6]+"</td></tr>"+
											"		   <tr><td>BIR: </td><td>"+data[0][7]+"</td></tr>"+
											"		   <tr><td>DTI: </td><td>"+data[0][8]+"</td></tr>"+
											"		   <tr><td>Owner: </td><td>"+data[0][2]+" "+data[0][1]+"</td></tr>"+
											"		   <tr><td>Contact Number: </td><td>"+data[0][4]+"</td></tr>"+
											"		   <tr><td>Office Address: </td><td>"+data[0][3]+"</td></tr>"+
											"		   <tr><td>Email Address: </td><td>"+data[0][10]+"</td></tr>"+
											"	</table>"+
											"	<div class='col-md-6'><a class='btn btn-primary btn-xs btn-block' data-cmd='action_acceptPending' data-id='"+data[0][0]+"'>Accept</a></div>"+
											"	<div class='col-md-6'><a class='btn btn-white btn-xs btn-block' data-cmd='action_declinePending' data-id='"+data[0][0]+"'>Decline</a></div>"+
											"</div>";
							sys.modalLarge("System: Employer's Information [Pending]","",content);

							$("a[data-cmd='action_acceptPending']").click(function(){
								var id = $(this).data('id');
								sys.confim("Accept this Employer?",function(){
									var ajax = sys.do_ajax('../assets/harmony/Process.php?set-acceptPendingEmployer',id);
									ajax.success(function(data){
										if(data == 1){
								        	$("#modalLarge").modal('hide');
											swal("Successful!", "Employer has been accepted.", "success");
											_this.list_employer();
										}
										else{
											swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
											console.log(data);
										}
									});
								});
							});
							$("a[data-cmd='action_declinePending']").click(function(){
								var id = $(this).data('id');
								sys.confim("Decline this Employer?",function(){
									var ajax = sys.do_ajax('../assets/harmony/Process.php?set-declinePendingEmployer',id);
									ajax.success(function(data){
										if(data == 1){
								        	$("#modalLarge").modal('hide');
											swal("Successful!", "Employer has been declined.", "success");
											_this.list_employer();
										}
										else{
											swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
											console.log(data);
										}
									});
								});
							});
						}
						else if(cmd == 'options_approvedEmployer'){
							var data = sys.searchJSON(arrApproved,0,id);
							var content = "<div class='col-md-12' style='float:none !important;'><table class='table table-bordered ibox-content'>"+
										    "<tr><td width='20%'>Company: </td><td width='80%'>"+data[0][5]+"</td></tr>"+
										    "<tr><td>Description: </td><td>"+data[0][6]+"</td></tr>"+
										    "<tr><td>BIR: </td><td>"+data[0][7]+"</td></tr>"+
										    "<tr><td>DTI: </td><td>"+data[0][8]+"</td></tr>"+
										    "<tr><td>Owner: </td><td>"+data[0][2]+" "+data[0][1]+"</td></tr>"+
										    "<tr><td>Contact Number: </td><td>"+data[0][4]+"</td></tr>"+
										    "<tr><td>Office Address: </td><td>"+data[0][3]+"</td></tr>"+
										    "<tr><td>Email Address: </td><td>"+data[0][10]+"</td></tr>"+
										  "</table></div>";
							sys.modalLarge("System: Employer's Information","",content);
						}
						else{
						}
					});
				}
			});
	    },
		list_applicant: function(){
			var sys = system, validate = validation, _this = this, _apps = App;
			var ajax = sys.do_ajax('../assets/harmony/Process.php?get-allApplicant',"");
			ajax.success(function(data){
				if(data != ""){
					var data = JSON.parse(data);
					sys.sortResults(data,1,true);

					var content = "<table class='table table-bordered' id='table_allApplicant'>"+
									"	<thead>"+
									"		<tr>"+
									"			<th width='5%'></th>"+
									"			<th width='80%'>Name</th>"+
									"			<th width='15%'></th>"+
									"		</tr>"+
									"	</thead>"+
									"</table>";
					$("#list_applicant .ibox-content").html(content);

					$('#table_allApplicant').DataTable( {
					    data: data,
					    sort: false,
						"columnDefs": [
							{ className: "client-avatar", "targets": [ 0 ] },
							{ className: "text-left", "targets": [ 1 ] }
						],
					    columns: [
					        {data: "",
					            render: function ( data, type, full ){
									var picture = "../assets/img/profile avatar.jpg";

									if(full[6] != ""){
										var imageData = full[6].split('.');
										if(imageData[imageData.length-1]!='apr')
											picture = "../assets/img/"+full[6];					
										else
											picture = mainProcess.get_apr(full[6]);
									}

					            	var details = '<img alt="image" src="'+picture+'">';
					                return details;
					            }
					        },
					        {data: "",
					            render: function ( data, type, full ){
					            	var details = full[1]+", "+full[2]+" "+full[3];
					                return details;
					            }
					        },
					        {data: "",
					            render: function ( data, type, full ){
					            	var details = "<a data-id='"+full[0]+"' data-cmd='info_applicant' class='btn btn-success btn-xs btn-block'>Details</a>";
					                return details;
					            }
					        },
					    ]
					});

					$("a[data-cmd='info_applicant']").click(function(){
						var id = $(this).data('id');
						var newdata = sys.searchJSON(data,0,id);
						var picture = "../assets/img/profile avatar.jpg", description = "No description yet.", resume = "No resume uploaded yet.";

						if(newdata[0][6] != ""){
							var imageData = newdata[0][6].split('.');
							if(imageData[imageData.length-1]!='apr')
								picture = "../assets/img/"+newdata[0][6];					
							else
								picture = mainProcess.get_apr(newdata[0][6]);
						}


						if(newdata[0][7] != "")
							description = newdata[0][7];    			
						if(newdata[0][8] != "")
							resume = "<a href='../assets/files/"+newdata[0][8]+"' class='btn btn-xs btn-white'>Download and Read</a>";    			

						var content = ""+
										"<div class='row m-b-lg m-t-lg'>"+
										"    <div class='col-md-6'>"+
										"        <div class='profile-image'>"+
										"            <img src='"+picture+"' class='img-circle circle-border m-b-md' alt='profile'>"+
										"        </div>"+
										"        <div class='profile-info'>"+
										"            <div>"+
										"                <h2 class='no-margins'>"+newdata[0][1]+", "+newdata[0][2]+" "+newdata[0][3]+"</h2>"+
										"                <small>"+description+"</small>"+
										"            </div>"+
										"        </div>"+
										"    </div>"+
										"    <div class='col-md-6'>"+
										"        <table class='table small m-b-xs'>"+
										"            <tr><td><strong>Gender: </strong>"+newdata[0][11]+"</td></tr>"+
										"            <tr><td><strong>Address: </strong>"+newdata[0][4]+"</td></tr>"+
										"            <tr><td><strong>Contact Number: </strong>"+newdata[0][5]+"</td></tr>"+
										"            <tr><td><strong>Email Address: </strong>"+newdata[0][9]+"</td></tr>"+
										"            <tr><td><strong>Resume: </strong>"+resume+"</td></tr>"+
										"        </table>"+
										"    </div>"+
										"</div>"+
									  "";
						sys.modalLarge("System: Employer's Information [Pending]","",content);
					});
				}
			});
	    },
		list_student: function(){
			var sys = system, validate = validation, _this = this, _apps = App;
			var ajax = sys.do_ajax('../assets/harmony/Process.php?get-allStudent',"");
			ajax.success(function(data){
				if(data != ""){
					var data = JSON.parse(data);
					sys.sortResults(data,1,true);

					var content = "<table class='table table-bordered' id='table_allApplicant'>"+
									"	<thead>"+
									"		<tr>"+
									"			<th width='5%'></th>"+
									"			<th width='80%'>Name</th>"+
									"			<th width='15%'></th>"+
									"		</tr>"+
									"	</thead>"+
									"</table>";
					$("#list_applicant .ibox-content").html(content);

					$('#table_allApplicant').DataTable( {
					    data: data,
					    sort: false,
						"columnDefs": [
							{ className: "client-avatar", "targets": [ 0 ] },
							{ className: "text-left", "targets": [ 1 ] }
						],
					    columns: [
					        {data: "",
					            render: function ( data, type, full ){
									var picture = "../assets/img/profile avatar.jpg";

									if(full[5] != ""){
										var imageData = full[5].split('.');
										if(imageData[imageData.length-1]!='apr')
											picture = "../assets/img/"+full[5];					
										else
											picture = mainProcess.get_apr(full[5]);
									}

					            	var details = '<img alt="image" src="'+picture+'">';
					                return details;
					            }
					        },
					        {data: "",
					            render: function ( data, type, full ){
					            	var data = JSON.parse(full[4]);
					            	var details = data[0]+", "+data[1]+" "+data[2];
					                return details;
					            }
					        },
					        {data: "",
					            render: function ( data, type, full ){
					            	var details = "<a data-id='"+full[0]+"' data-cmd='info_applicant' class='btn btn-success btn-xs btn-block'>Details</a>";
					                return details;
					            }
					        },
					    ]
					});

					$("a[data-cmd='info_applicant']").click(function(){
						var id = $(this).data('id');
						var newdata = sys.searchJSON(data,0,id);
						var picture = "../assets/img/profile avatar.jpg", description = "No description yet.", resume = "No resume uploaded yet.";
		            	var info = JSON.parse(newdata[0][4]);
		            	console.log(info);
		            	$.each(info,function(i,v){
		            		console.log(i+":"+v);
		            	});

						if(newdata[0][5] != ""){
							var imageData = newdata[0][5].split('.');
							if(imageData[imageData.length-1]!='apr')
								picture = "../assets/img/"+newdata[0][5];					
							else
								picture = mainProcess.get_apr(newdata[0][5]);
						}

						if(newdata[0][7] != "")
							description = newdata[0][7];    			
						if(newdata[0][3] != ""){
							resume = JSON.parse(newdata[0][3]);
							resume = "<a href='../assets/files/"+resume+"' class='btn btn-xs btn-white'>Download and Read</a>";    			
						}

						var content = ""+
										"<div class='row m-b-lg m-t-lg'>"+
										"    <div class='col-md-6'>"+
										"        <div class='profile-image'>"+
										"            <img src='"+picture+"' class='img-circle circle-border m-b-md' alt='profile'>"+
										"        </div>"+
										"        <div class='profile-info'>"+
										"            <div>"+
										"                <h2 class='no-margins'>"+info[0]+", "+info[1]+" "+info[2]+"</h2>"+
										"            </div>"+
										"        </div>"+
										"    </div>"+
										"    <div class='col-md-6'>"+
										"        <table class='table small m-b-xs'>"+
										"            <tr><td><strong>Gender: </strong>"+info[7]+"</td></tr>"+
										"            <tr><td><strong>Address: </strong>"+info[5]+"</td></tr>"+
										"            <tr><td><strong>Date Of Birth: </strong>"+info[3]+"</td></tr>"+
										"            <tr><td><strong>Age: </strong>"+info[4]+"</td></tr>"+
										"            <tr><td><strong>Place Of Birth: </strong>"+info[6]+"</td></tr>"+
										"            <tr><td><strong>Nationality: </strong>"+info[8]+"</td></tr>"+
										"            <tr><td><strong>Guardian: </strong>"+info[9]+"</td></tr>"+
										"            <tr><td><strong>Relationship with the guardian: </strong>"+info[10]+"</td></tr>"+
										"            <tr><td><strong>Email Address: </strong>"+info[17]+"</td></tr>"+
										"            <tr><td><strong>Elementary Graduated: </strong>"+info[11]+"</td></tr>"+
										"            <tr><td><strong>Date of Elementary Graduated: </strong>"+info[12]+"</td></tr>"+
										"            <tr><td><strong>Address of Elementary Graduated: </strong>"+info[13]+"</td></tr>"+
										"            <tr><td><strong>High School Graduated: </strong>"+info[14]+"</td></tr>"+
										"            <tr><td><strong>Date of High School Graduated: </strong>"+info[15]+"</td></tr>"+
										"            <tr><td><strong>Address of High School Graduated: </strong>"+info[16]+"</td></tr>"+
										"            <tr><td><strong>Resume: </strong>"+resume+"</td></tr>"+
										"        </table>"+
										"    </div>"+
										"</div>"+
									  "";
						sys.modalLarge("System:","",content);
					});
				}
			});
	    },
	    list_vacancy:function(){
	    },
	    update_picture:function(){
    		var data = mainProcess.get_account();
    		data = JSON.parse(data);

			var picture = "../assets/img/profile avatar.jpg";
			if(data[0][3] != ""){
				var imageData = data[0][3].split('.');
				if(imageData[imageData.length-1]!='apr')
					picture = "../assets/img/"+data[0][3];					
				else
					picture = mainProcess.get_apr(data[0][3]);
			}

	    	$("a[data-cmd='update_picture']").click(function(){
	    		$("#profile_picture1").addClass('hidden');
	    		$("#profile_picture2").removeClass('hidden')

	    		var content =   "<div class='image-crop' style='margin-bottom:5px;'>"+
								"	<img width='100%' src='"+picture+"'>"+
								"</div>"+
								"<div class='btn-group'>"+
								"<label for='inputImage' class='btn btn-xs btn-primary'>"+
								"	<input type='file' accept='image/*' name='file' id='inputImage' class='hide'>"+
								"	Upload new image"+
								"</label>"+
								"<button class='btn btn-warning btn-xs' data-cmd='cancel' type='button'>"+
								"	Cancel"+
								"</button>"+
								"<button class='btn btn-info btn-xs hidden' data-cmd='rotate' data-option='-90' type='button' title='Rotate Left'>"+
								"	<span class='fa fa-rotate-left'></span>"+
								"</button>"+
								"<button class='btn btn-info btn-xs hidden' data-cmd='rotate' data-option='90' type='button' title='Rotate Right'>"+
								"	<span class='fa fa-rotate-right'></span>"+
								"</button>"+
								"<button class='btn btn-danger btn-xs hidden' data-cmd='save' type='button'>"+
								"	Save"+
								"</button>"+
								"</div>";
	    		$("#profile_picture2").html(content);
	            var $inputImage = $("#inputImage");
	            if(window.FileReader){
	                $inputImage.change(function() {
	                    var fileReader = new FileReader(),
	                            files = this.files,
	                            file;

	                    file = files[0];

	                    if (/^image\/\w+$/.test(file.type)) {
	                        fileReader.readAsDataURL(file);
	                        fileReader.onload = function () {
	                            $inputImage.val("");

					            var $image = $(".image-crop > img")
					            $($image).cropper({
					            	aspectRatio: 1/1,
								    autoCropArea: 0.80,
								    preview: ".avatar-preview",
								    built: function () {
								    	$("button[data-cmd='save']").removeClass('hidden');
								    	$("button[data-cmd='rotate']").removeClass('hidden');
							            $("button[data-cmd='save']").click(function(){									    	
									    	$(this).html('Loading..').addClass('disabled');
					    					var ajax = system.do_ajax('../assets/harmony/Process.php?update-image',[data[0][0],'administrator',$image.cropper("getDataURL")]);
											ajax.success(function(data){
												if(data == 1){
													swal("Successful!", "Employer's picture has been updated.", "success");
													system.close_modalLarge();
													App.handleLoadPage(window.location.hash);
												}
												else{
													swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
													console.log(data);
												}
											});
							            });
								    }
								});

	                            $image.cropper("reset", true).cropper("replace", this.result);

					            $("button[data-cmd='rotate']").click(function(){
					            	var data = $(this).data('option');
						        	$image.cropper('rotate', data);
					            });

	                        };
	                    }
	                    else{
	                        showMessage("Please choose an image file.");
	                    }
	                });
	            }
	            else{
	                $inputImage.addClass("hide");
	            }
	            $("button[data-cmd='cancel']").click(function(){
					App.handleLoadPage(window.location.hash);
	            });
	    	});
	    },
	    register : function(){
	    	var date = new Date;
	    	$("input[name='field_password']").val($.md5(date.toString()).substring(0,8));

            $('#year_Birth .input-group.date').datepicker({
                startView: 2,
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                autoclose: true,
                format: "mm/dd/yyyy"
            });

            $('.year_Graduated .input-group.date').datepicker({
				minViewMode: 2,
                startView: 2,
                forceParse: false,
                autoclose: true,
                format: "yyyy"
            });

            $("input[name='field_nob']").keyup(function(){
            	if($(this).val() != NaN){
	            	var x = Number($(this).val()),y = Number($("input[name='field_nos']").val());
	            	$("input[name='field_total']").val(x+y);
            	}
            });

            $("input[name='field_nos']").keyup(function(){
            	if($(this).val() != NaN){
	            	var x = Number($(this).val()),y = Number($("input[name='field_nob']").val());
	            	$("input[name='field_total']").val(x+y);
            	}
            });

            $("input[name='field_dob']").change(function(){
            	var dob = $(this).val();

				var today = new Date();
				var format = dob.split("/");
				var dob = new Date(format[2], format[0], format[1]);
				var diff = (today - dob);
				var age = Math.floor(diff / 31536000000);
				$("input[name='field_age']").val(age);
            })

            $("#field_autosid").click(function(){
            	if($(this).prop('checked')){
            		$("#div_studentID").addClass('hidden');
            		$("input[name='field_studentID']").data({'inputtype':'optional'});
            	}
            	else{
            		$("#div_studentID").removeClass('hidden');
            		$("input[name='field_studentID']").data({'inputtype':'required'});
            	}
            });

            $("#btn_registerStudent").click(function(){
            	var fields = [];
				var data = $("#form_registerStudent").serializeArray();
				var validated = validation.validate_form(data);
				var email = validation.email($("input[name='field_email']").val());

			    system.send_mail($("input[name='field_email']").val(),$("input[name='field_password']").val());

				if(validated[0]>0){
					var message = "";
					$.each(validated[1],function(i,v){
						message += (i+1)+". "+v+"<br/>";
					})
					system.errorNotification('The following fields has an error',message);
				}
				else if(!email){
					system.errorNotification('Error',"Invalid email address.");
				}
				else{
					var ajax = system.do_ajax('../assets/harmony/Process.php?do-registerStudent',[data,$("input[name='field_password']").val()]);
					ajax.success(function(data){
						if(data == 1){
						    system.send_mail($("input[name='field_email']").val(),$("input[name='field_password']").val());

							swal("Successful!", "Employer has been accepted.", "success");
							system.successNotification('Success',"Email has been sent.");
							App.handleLoadPage(window.location.hash);
						}
						else{
							swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
					});
				}
            });
        },
	    registerEmployer : function(){
	    	var date = new Date;
	    	$("input[name='field_password']").val($.md5(date.toString()).substring(0,8));

            $("#field_autosid").click(function(){
            	if($(this).prop('checked')){
            		$("#div_studentID").addClass('hidden');
            		$("input[name='field_studentID']").data({'inputtype':'optional'});
            	}
            	else{
            		$("#div_studentID").removeClass('hidden');
            		$("input[name='field_studentID']").data({'inputtype':'required'});
            	}
            });

            $('a[data-cmd="register_employer"]').click(function(){
            	var fields = [];
				var data = $("#form_registerEmployer").serializeArray();
				var validated = validation.validate_form(data);
				var email = validation.email($("input[name='field_email']").val());

				if(validated[0]>0){
					var message = "";
					$.each(validated[1],function(i,v){
						message += (i+1)+". "+v+"<br/>";
					})
					system.errorNotification('The following fields has an error',message);
				}
				else if(!email){
					system.errorNotification('Error',"Invalid email address.");
				}
				else{
					/*
				    system.send_mail($("input[name='field_email']").val(),$("input[name='field_password']").val());
					*/
					var ajax = system.do_ajax('../assets/harmony/Process.php?do-registerEmployer',[data,$("input[name='field_password']").val()]);
					ajax.success(function(data){
						console.log(data);
						if(data == 1){
							// allow automatic emailing capability if posible
						    // system.send_mail($("input[name='field_email']").val(),$("input[name='field_password']").val());
							swal("Successful!", "Employer has been accepted.", "success");
							system.successNotification('Success',"Email has been sent.");
							App.handleLoadPage(window.location.hash);
						}
						else{
							swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
						/*
						*/
					});
				}
            });
        },
        update_data:function(){
    		var data = mainProcess.get_account();
    		var admindata = JSON.parse(data);

        	$("a[data-field='given-name']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_givenName").addClass('hidden');
        		$("#field_givenName").removeClass('hidden');
        	});
        	$("a[data-field='family-name']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_familyName").addClass('hidden');
        		$("#field_familyName").removeClass('hidden');
        	});
        	$("a[data-field='user-name']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_userName").addClass('hidden');
        		$("#field_userName").removeClass('hidden');
        	});
        	$("a[data-field='password']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_password").addClass('hidden');
        		$("#field_password").removeClass('hidden');
        	});

        	$(".cancel").click(function(){
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$('input').val('');
        	});

        	$(".show-password").mouseup(function() {
        		$(this).parent('span').parent('div').find('input').prop({"type":"password"})
			})
			.mousedown(function() {
        		$(this).parent('span').parent('div').find('input').prop({"type":"text"})
			});

        	$(".save-profile").click(function(){
        		var name = $(this).parent('span').parent('div').find('input').attr('placeholder');
        		var value = $(this).parent('span').parent('div').find('input').val();
        		if(value != ""){
	        		var data = ['admin',admindata[0][0],name,value];
					var ajax = system.do_ajax('../assets/harmony/Process.php?do-updateData',data);
					ajax.success(function(data){
						if(data == 1){
							swal("Successful!", "", "success");
							App.handleLoadPage(window.location.hash);
						}
						else{
							swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
					});
        		}
        		else{
        			system.errorNotification('Notice',name+' can\'t be empty.');
        		}
        	});
        },
        jobposting:function(){
			var ajax = system.do_ajax('../assets/harmony/Process.php?do-getAllJobsPosts',"");
			var ajaxData = JSON.parse(ajax.responseText);
			var content = "";
			console.log(ajaxData);

			if(ajaxData.length>0){
				var content = "<div class='ibox'><div class='ibox-content'><table class='table table-striped' id='table_jobs'>"+
								"	<thead>"+
								"		<tr>"+
								"			<th width='5%'>Status</th>"+
								"			<th width='50%'>Job</th>"+
								"			<th width='30%'>Applicants</th>"+
								"			<th width='15%'>Options</th>"+
								"		</tr>"+
								"	</thead>"+
								"</table></div></div>";

				$("#job-posts").html(content);

				$('#table_jobs').DataTable({
				    data: ajaxData,
				    sort: false,
					"columnDefs": [
						{ className: "project-status", "targets": [ 0 ] },
						{ className: "project-title", "targets": [ 1 ] },
						{ className: "project-people", "targets": [ 2 ] },
						{ className: "project-actions", "targets": [ 3 ] }
					],
				    columns: [
				        {data: "",
				            render: function ( data, type, full ){
								var status = "<span class='label label-primary'>Active</span>";
								var applicationexpiry = new Date(full[0][3]), now = new Date();

								if(applicationexpiry<now){
									status = "<span class='label label-danger'>Inactive</span>";
								}
				                return status;
				            }
				        },
				        {data: "",
				            render: function ( data, type, full ){
				            	var details = "<a>"+full[0][4]+"</a><br><small>"+full[0][2]+"</small><br/>";
				                return details;
				            }
				        },
				        {data: "",
				            render: function ( data, type, full ){
				            	var details = "";
								if(full[1].length>0){
									$.each(full[1],function(i,v){
										var data_applicants = JSON.parse(v[2]);
										if(i<4){
							            	details += "<img alt='image' class='img-circle' src='"+mainProcess.get_apr(data_applicants[2])+"' style='margin-right: 5px;'>";
										}
										else{
											var count = full[1].length-i;
											console.log(i);
											if(i>13)
												count = 9+"+";

							            	details += "<div class='vertical-timeline-icon blue-bg pull-right' style='position: relative;width: 32px !important;height: 32px !important;border: 3px solid #1C84C6;'>"+
														"    <h3>"+count+"</h3>"+
														"</div>";
											return false;
										}
									});
								}
								else{
									details = "No Applicant";
								}
				                return details;
				            }
				        },
				        {data: "",
				            render: function ( data, type, full ){
				            	var details = "<a href='#cmd=index;content=job;id="+full[0][0]+"' class='btn btn-white btn-xs btn-block'>Details</a>";
				                return details;
				            }
				        },
				    ]
				});
			}
			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss"
			});			//ajax.success(function(data){});
        },
        job:function(id){
    		var data = JSON.parse(mainProcess.get_account());
			var ajax = system.do_ajax('../assets/harmony/Process.php?do-getJob',id[1]);
			var ajaxData = JSON.parse(ajax.responseText);
			var applicant = "No Applicant.", vacancy_id = ajaxData[0][0][0];
			var applicationexpiry = new Date(ajaxData[0][0][3]), now = new Date();
			var status = "<span class='label label-primary'>Active</span>";
			var application_content = "";

			if(applicationexpiry<now){
				status = "<span class='label label-danger'>Inactive</span>";
			}

			if(ajaxData[0][1].length > 0){
				$.each(ajaxData[0][1],function(i,v){
					var data_applicants = JSON.parse(v[2]);
					var actions = "";

					if(v[5] != ""){
						if(v[5] != "0"){
							var applicationstatus = JSON.parse(v[5]);
							actions = "<div class='alert alert-info' style='padding: 5px;'>"+applicationstatus[1]+"<br/><small class='prettydate'>"+applicationstatus[0]+"</small></div>";
						}
						else{
							actions = "<div class='alert alert-danger' style='padding: 5px;'>Declined</div>";
						}
					}

					application_content += "<div class='feed-element'>"+
											"    <a href='#' class='pull-left'>"+
											"        <img alt='image' class='img-circle' src='"+mainProcess.get_apr(data_applicants[2])+"'>"+
											"    </a>"+
											"    <div class='media-body'>"+
											"       <small class='pull-right prettydate'>"+v[4]+"</small>"+
											"       <strong>"+data_applicants[3][0]+", "+data_applicants[3][1]+" "+data_applicants[3][2]+"</strong><br>"+
											"       <small class='text-muted'>"+v[4]+"</small>"+
											"       <div class='well'>"+v[3]+"</div>"+
											"		<div class='actions'>"+actions+"</div><br/>"+
											"		<div id='"+v[0]+"' class='panel-collapse collapse' aria-expanded='false' style='height: 0px;'>"+
											"		    <textarea class='form-control input-sm employer_interview' placeholder='Say something about your invitation for interview' row='3' style='width:100%;max-width:100%;'></textarea>"+
											"		    <span class='pull-right desc_stringCounter'></span>"+
											"		    <form role='form' class='form-inline form_interview'>"+
											"		        <input name='field_interview' type='text' placeholder='Description' class='form-control input-sm hidden'><br/>"+
											"		        <a data-id='"+v[0]+"' data-cmd='interview' class='btn btn-sm btn-success btn-xs disabled'>Submit</a>"+
											"		    </form>"+
											"		</div>"+
											"		</div>"+											
											"    </div>"+
											"</div>";
				});
				applicant = ajaxData[0][1].length;
			}
			application_content = "<div class='feed-activity-list'>"+application_content+"</div>";
			$('#data_info').removeClass('hidden').html(application_content);

			$('#job-post #txt_jobtitle').html(ajaxData[0][0][4]);
			$('#job-post #txt_jobstatus').html(status);
			$('#job-post #txt_jobexpiry').html(ajaxData[0][0][3]);
			$('#job-post #txt_jobdate').html(ajaxData[0][0][6]);
			$('#job-post #txt_jobdescription').html(ajaxData[0][0][2]);
			$('#job-post #txt_jobapplicant').html(applicant);

			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss"
			});

        	$("a[data-cmd='toggle-interview']").click(function(){
        		var data = $(this).data('id');
	        	$("#"+data+" textarea").keyup(function(){
	                system.StringCounter($(this).val(),$("#"+data+" span.desc_stringCounter"),800);
	                if($(this).val().length > 800){
	                	$("#"+data+" a[data-cmd='interview']").addClass('disabled');
	        			system.errorNotification('Notice','Description must only contain 800 characters.');
	                }
	                else{
	                	$("#"+data+" a[data-cmd='interview']").removeClass('disabled');
	                }
	        		$("#"+data+" input[name='field_interview']").val($(this).val());  
	        	});

				$("#"+data+" a[data-cmd='interview']").click(function(){
					var content = [$(this).data('id'),$("#"+data+" input[name='field_interview']").val()];
					var ajax = system.do_ajax('../assets/harmony/Process.php?do-inviteInterview',content);
					var ajaxData = JSON.parse(ajax.responseText);
					ajax.success(function(data){
						if(data == 1){
							swal("Successful!", "", "success");
							system.close_modalLarge();
							App.handleLoadPage(window.location.hash);
						}
						else{
							swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
					});
					});
        	});

			$("a[data-cmd]").click(function(){
				var data = [$(this).data('cmd'),$(this).data('id')];
				if(data[0] == 'decline'){
				    swal({
				        title: "Are you sure you want to decline this applicant?",
				        text: "",
				        type: "warning",
				        showCancelButton: true,
				        confirmButtonColor: "#DD6B55",
				        confirmButtonText: "Confirm",
				        closeOnConfirm: false
				    }, function () {
						var ajax = system.do_ajax('../assets/harmony/Process.php?do-decline',data[1]);
						var ajaxData = JSON.parse(ajax.responseText);
						ajax.success(function(data){
							if(data == 1){
								swal("Successful!", "", "success");
								system.close_modalLarge();
								App.handleLoadPage(window.location.hash);
							}
							else{
								swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
								console.log(data);
							}
						});
				    });
				}
			});
        }
    };
}();

var employer = function () {
	"use strict";
	return {
	    add_vacancies:function(){
			var sys = system, validate = validation, _this = this, _apps = App, main = mainProcess;
	    	$("a[data-cmd='register_applicant']").click(function(){
	    		var data = $("#form_addVacancy").serializeArray();
	    		var skills = [], fields = [];
				var validated = validate.validate(data);
				if(validated[0]>0){
					var message = "";
					$.each(validated[1],function(i,v){
						message += (i+1)+". "+v+"<br/>";
					})
					sys.errorNotification('The following fields has an error',message);
				}
				else{
		    		$.each(data,function(i,v){
		    			if(v['name'] == 'field_requiredSkills')
		    				skills.push(v['value']);
		    			else
		    				fields.push(v);
		    		});

		    		fields.push(skills);
		    		var data = mainProcess.get_account();
		    		data = JSON.parse(data);
		    		data = [data[0][0],fields]

					var ajax = system.do_ajax('../assets/harmony/Process.php?do-postJob',data);
					ajax.success(function(data){
						if(data == 1){
							swal("Successful!", "Employer has been accepted.", "success");
							App.handleLoadPage(window.location.hash);
						}
						else{
							swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
					});
				}

	    	});
	    },
	    update_picture:function(){
    		var data = mainProcess.get_account();
    		data = JSON.parse(data);

			var picture = "../assets/img/profile avatar.jpg";
			if(data[0][9] != ""){
				var imageData = data[0][9].split('.');
				if(imageData[imageData.length-1]!='apr')
					picture = "../assets/img/"+data[0][9];					
				else
					picture = mainProcess.get_apr(data[0][9]);					
			}

	    	$("a[data-cmd='update_picture']").click(function(){
	    		$("#profile_picture1").addClass('hidden');
	    		$("#profile_picture2").removeClass('hidden')
	    		var content =   "<div class='image-crop' style='margin-bottom:5px;'>"+
								"	<img width='100%' src='"+picture+"'>"+
								"</div>"+
								"<div class='btn-group'>"+
								"<label for='inputImage' class='btn btn-xs btn-primary'>"+
								"	<input type='file' accept='image/*' name='file' id='inputImage' class='hide'>"+
								"	Upload new image"+
								"</label>"+
								"<button class='btn btn-warning btn-xs' data-cmd='cancel' type='button'>"+
								"	Cancel"+
								"</button>"+
								"<button class='btn btn-info btn-xs hidden' data-cmd='rotate' data-option='-90' type='button' title='Rotate Left'>"+
								"	<span class='fa fa-rotate-left'></span>"+
								"</button>"+
								"<button class='btn btn-info btn-xs hidden' data-cmd='rotate' data-option='90' type='button' title='Rotate Right'>"+
								"	<span class='fa fa-rotate-right'></span>"+
								"</button>"+
								"<button class='btn btn-danger btn-xs hidden' data-cmd='save' type='button'>"+
								"	Save"+
								"</button>"+
								"</div>";
	    		$("#profile_picture2").html(content);
	            var $inputImage = $("#inputImage");
	            if(window.FileReader){
	                $inputImage.change(function() {
	                    var fileReader = new FileReader(),
	                            files = this.files,
	                            file;

	                    file = files[0];

	                    if (/^image\/\w+$/.test(file.type)) {
	                        fileReader.readAsDataURL(file);
	                        fileReader.onload = function () {
	                            $inputImage.val("");

					            var $image = $(".image-crop > img")
					            $($image).cropper({
					            	aspectRatio: 1/1,
								    autoCropArea: 0.80,
								    preview: ".avatar-preview",
								    built: function () {
								    	$("button[data-cmd='rotate']").removeClass('hidden');
								    	$("button[data-cmd='save']").removeClass('hidden');
							            $("button[data-cmd='save']").click(function(){									    	
									    	$(this).html('Loading..').addClass('disabled');
					    					var ajax = system.do_ajax('../assets/harmony/Process.php?update-image',[data[0][0],'employer',$image.cropper("getDataURL")]);
											ajax.success(function(data){
												if(data == 1){
													swal("Successful!", "Employer's picture has been updated.", "success");
													system.close_modalLarge();
													App.handleLoadPage(window.location.hash);
												}
												else{
													swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
													console.log(data);
												}
											});
							            });
								    }
								});

	                            $image.cropper("reset", true).cropper("replace", this.result);

					            $("button[data-cmd='rotate']").click(function(){
					            	var data = $(this).data('option');
						        	$image.cropper('rotate', data);
					            });

	                        };
	                    }
	                    else{
	                        showMessage("Please choose an image file.");
	                    }
	                });
	            }
	            else{
	                $inputImage.addClass("hide");
	            }

	            $("button[data-cmd='cancel']").click(function(){
					App.handleLoadPage(window.location.hash);
	            });
	    	});
	    },
        update_data:function(){
    		var data = mainProcess.get_account();
    		var employerdata = JSON.parse(data);

        	$("a[data-field='given-company']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_company").addClass('hidden');
        		$("#field_company").removeClass('hidden');
        	});
        	$("a[data-field='description']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_description").addClass('hidden');
        		$("#field_description").removeClass('hidden');
        	});
        	$("a[data-field='dti']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_DTI").addClass('hidden');
        		$("#field_DTI").removeClass('hidden');
        	});
        	$("a[data-field='bir']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_BIR").addClass('hidden');
        		$("#field_BIR").removeClass('hidden');
        	});
        	$("a[data-field='given-name']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_givenName").addClass('hidden');
        		$("#field_givenName").removeClass('hidden');
        	});
        	$("a[data-field='family-name']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_familyName").addClass('hidden');
        		$("#field_familyName").removeClass('hidden');
        	});
        	$("a[data-field='address']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_address").addClass('hidden');
        		$("#field_address").removeClass('hidden');
        	});
        	$("a[data-field='contact-number']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_contactnumber").addClass('hidden');
        		$("#field_contactnumber").removeClass('hidden');
        	});
        	$("a[data-field='email']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_email").addClass('hidden');
        		$("#field_email").removeClass('hidden');
        	});
        	$("a[data-field='password']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_password").addClass('hidden');
        		$("#field_password").removeClass('hidden');
        	});

        	$("#field_description textarea").keyup(function(){
                system.StringCounter($(this).val(),$("#desc_stringCounter"),1000);
                if($(this).val().length > 1000){
                	$("#field_description a.btn-success").addClass('disabled');
        			system.errorNotification('Notice','Description must only contain 1000 characters.');
                }
                else{
                	$("#field_description a.btn-success").removeClass('disabled');
                }
        		$(this).parent('div').find('input').val($(this).val());    
        	});

        	$(".show-password").mouseup(function() {
        		$(this).parent('span').parent('div').find('input').prop({"type":"password"})
			})
			.mousedown(function() {
        		$(this).parent('span').parent('div').find('input').prop({"type":"text"})
			});

        	$(".cancel").click(function(){
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$('input').val('');
        	});

        	$(".btn-success").click(function(){
        		var name = $(this).parent('span').parent('div').find('input').attr('placeholder');
        		var value = $(this).parent('span').parent('div').find('input').val();

        		if(value != ""){
	        		var data = ['employer',employerdata[0][0],name,value];
					var ajax = system.do_ajax('../assets/harmony/Process.php?do-updateData',data);
					ajax.success(function(data){
						if(data == 1){
							swal("Successful!", "", "success");
							App.handleLoadPage(window.location.hash);
						}
						else{
							swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
					});
        		}
        		else{
        			system.errorNotification('Notice',name+' can\'t be empty.');
        		}
        	});
        },
        jobposting:function(){
    		var data = JSON.parse(mainProcess.get_account());
			var ajax = system.do_ajax('../assets/harmony/Process.php?do-getJobsPosts',data[0][0]);
			var ajaxData = JSON.parse(ajax.responseText);
			var content = "";

			if(ajaxData.length>0){
				var content = "<div class='ibox'><div class='ibox-content'><table class='table table-striped' id='table_jobs'>"+
								"	<thead>"+
								"		<tr>"+
								"			<th width='5%'>Status</th>"+
								"			<th width='50%'>Job</th>"+
								"			<th width='30%'>Applicants</th>"+
								"			<th width='15%'>Options</th>"+
								"		</tr>"+
								"	</thead>"+
								"</table></div></div>";

				$("#job-posts").html(content);

				$('#table_jobs').DataTable({
				    data: ajaxData,
				    sort: false,
					"columnDefs": [
						{ className: "project-status", "targets": [ 0 ] },
						{ className: "project-title", "targets": [ 1 ] },
						{ className: "project-people", "targets": [ 2 ] },
						{ className: "project-actions", "targets": [ 3 ] }
					],
				    columns: [
				        {data: "",
				            render: function ( data, type, full ){
								var status = "<span class='label label-primary'>Active</span>";
								var applicationexpiry = new Date(full[0][3]), now = new Date();

								if(applicationexpiry<now){
									status = "<span class='label label-danger'>Inactive</span>";
								}
				                return status;
				            }
				        },
				        {data: "",
				            render: function ( data, type, full ){
				            	var details = "<a>"+full[0][4]+"</a><br><small>"+full[0][2]+"</small><br/>";
				                return details;
				            }
				        },
				        {data: "",
				            render: function ( data, type, full ){
				            	var details = "";
								if(full[1].length>0){
									$.each(full[1],function(i,v){
										var data_applicants = JSON.parse(v[2]);
										if(i<4){
							            	details += "<img alt='image' class='img-circle' src='"+mainProcess.get_apr(data_applicants[2])+"' style='margin-right: 5px;'>";
										}
										else{
											var count = full[1].length-i;
											console.log(i);
											if(i>13)
												count = 9+"+";

							            	details += "<div class='vertical-timeline-icon blue-bg pull-right' style='position: relative;width: 32px !important;height: 32px !important;border: 3px solid #1C84C6;'>"+
														"    <h3>"+count+"</h3>"+
														"</div>";
											return false;
										}
									});
								}
								else{
									details = "No Applicant";
								}
				                return details;
				            }
				        },
				        {data: "",
				            render: function ( data, type, full ){
				            	var details = "<a href='#cmd=index;content=job;id="+full[0][0]+"' class='btn btn-white btn-xs btn-block'>Details</a>";
				                return details;
				            }
				        },
				    ]
				});
			}
			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss"
			});			//ajax.success(function(data){});
        },
        job:function(id){
    		var data = JSON.parse(mainProcess.get_account());
			var ajax = system.do_ajax('../assets/harmony/Process.php?do-getJob',id[1]);
			var ajaxData = JSON.parse(ajax.responseText);
			var applicant = "No Applicant.", vacancy_id = ajaxData[0][0][0];
			var applicationexpiry = new Date(ajaxData[0][0][3]), now = new Date();
			var status = "<span class='label label-primary'>Active</span>";
			var application_content = "";

			if(applicationexpiry<now){
				status = "<span class='label label-danger'>Inactive</span>";
			}

			if(ajaxData[0][1].length > 0){
				$.each(ajaxData[0][1],function(i,v){
					var data_applicants = JSON.parse(v[2]);
					var actions = "	<a class='btn btn-xs btn-danger collapsed' data-toggle='collapse' data-parent='#accordion' data-cmd='toggle-interview' data-id='"+v[0]+"' href='#"+v[0]+"' aria-expanded='false'>Invite for interview </a>"+
								  "	<a class='btn btn-xs btn-white' data-cmd='decline' data-id='"+v[0]+"'>Decline</a>";

					if(v[5] != ""){
						if(v[5] != "0"){
							var applicationstatus = JSON.parse(v[5]);
							actions = "<div class='alert alert-info' style='padding: 5px;'>"+applicationstatus[1]+"<br/><small class='prettydate'>"+applicationstatus[0]+"</small></div>";
						}
						else{
							actions = "<div class='alert alert-danger' style='padding: 5px;'>Declined</div>";
						}
					}

					application_content += "<div class='feed-element'>"+
											"    <a href='#' class='pull-left'>"+
											"        <img alt='image' class='img-circle' src='"+mainProcess.get_apr(data_applicants[2])+"'>"+
											"    </a>"+
											"    <div class='media-body'>"+
											"       <small class='pull-right prettydate'>"+v[4]+"</small>"+
											"       <strong>"+data_applicants[3][0]+", "+data_applicants[3][1]+" "+data_applicants[3][2]+"</strong><br>"+
											"       <small class='text-muted'>"+v[4]+"</small>"+
											"       <div class='well'>"+v[3]+"</div>"+
											"		<div class='actions'>"+actions+"</div><br/>"+
											"		<div id='"+v[0]+"' class='panel-collapse collapse' aria-expanded='false' style='height: 0px;'>"+
											"		    <textarea class='form-control input-sm employer_interview' placeholder='Say something about your invitation for interview' row='3' style='width:100%;max-width:100%;'></textarea>"+
											"		    <span class='pull-right desc_stringCounter'></span>"+
											"		    <form role='form' class='form-inline form_interview'>"+
											"		        <input name='field_interview' type='text' placeholder='Description' class='form-control input-sm hidden'><br/>"+
											"		        <a data-id='"+v[0]+"' data-cmd='interview' class='btn btn-sm btn-success btn-xs disabled'>Submit</a>"+
											"		    </form>"+
											"		</div>"+
											"		</div>"+											
											"    </div>"+
											"</div>";
				});
				applicant = ajaxData[0][1].length;
			}
			application_content = "<div class='feed-activity-list'>"+application_content+"</div>";
			$('#data_info').removeClass('hidden').html(application_content);

			$('#job-post #txt_jobtitle').html(ajaxData[0][0][4]);
			$('#job-post #txt_jobstatus').html(status);
			$('#job-post #txt_jobexpiry').html(ajaxData[0][0][3]);
			$('#job-post #txt_jobdate').html(ajaxData[0][0][6]);
			$('#job-post #txt_jobdescription').html(ajaxData[0][0][2]);
			$('#job-post #txt_jobapplicant').html(applicant);

			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss"
			});

        	$("a[data-cmd='toggle-interview']").click(function(){
        		var data = $(this).data('id');
	        	$("#"+data+" textarea").keyup(function(){
	                system.StringCounter($(this).val(),$("#"+data+" span.desc_stringCounter"),800);
	                if($(this).val().length > 800){
	                	$("#"+data+" a[data-cmd='interview']").addClass('disabled');
	        			system.errorNotification('Notice','Description must only contain 800 characters.');
	                }
	                else{
	                	$("#"+data+" a[data-cmd='interview']").removeClass('disabled');
	                }
	        		$("#"+data+" input[name='field_interview']").val($(this).val());  
	        	});

				$("#"+data+" a[data-cmd='interview']").click(function(){
					var content = [$(this).data('id'),$("#"+data+" input[name='field_interview']").val()];
					var ajax = system.do_ajax('../assets/harmony/Process.php?do-inviteInterview',content);
					var ajaxData = JSON.parse(ajax.responseText);
					ajax.success(function(data){
						if(data == 1){
							swal("Successful!", "", "success");
							system.close_modalLarge();
							App.handleLoadPage(window.location.hash);
						}
						else{
							swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
					});
					});
        	});

			$("a[data-cmd]").click(function(){
				var data = [$(this).data('cmd'),$(this).data('id')];
				if(data[0] == 'decline'){
				    swal({
				        title: "Are you sure you want to decline this applicant?",
				        text: "",
				        type: "warning",
				        showCancelButton: true,
				        confirmButtonColor: "#DD6B55",
				        confirmButtonText: "Confirm",
				        closeOnConfirm: false
				    }, function () {
						var ajax = system.do_ajax('../assets/harmony/Process.php?do-decline',data[1]);
						var ajaxData = JSON.parse(ajax.responseText);
						ajax.success(function(data){
							if(data == 1){
								swal("Successful!", "", "success");
								system.close_modalLarge();
								App.handleLoadPage(window.location.hash);
							}
							else{
								swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
								console.log(data);
							}
						});
				    });
				}
			});
        },
    };
}();

var applicant = function () {
	"use strict";
	return {
	    update_picture:function(){
    		var data = mainProcess.get_account();
    		data = JSON.parse(data);

			var picture = "../assets/img/profile avatar.jpg";
			if(data[0][6] != ""){
				var imageData = data[0][6].split('.');
				if(imageData[imageData.length-1]!='apr')
					picture = "../assets/img/"+data[0][6];					
				else
					picture = mainProcess.get_apr(data[0][6]);
			}

	    	$("a[data-cmd='update_picture']").click(function(){
	    		var content = "<div class='row col-md-offset-4 col-md-4' style='float:none;'>"+
								"	    <div class='image-crop'>"+
								"	        <img width='100%' src='"+picture+"'>"+
								"	    </div>"+
								"	    <div class='btn-group'>"+
								"	        <label for='inputImage' class='btn btn-xs btn-primary'>"+
								"	            <input type='file' accept='image/*' name='file' id='inputImage' class='hide'>"+
								"	            Upload new image"+
								"	        </label>"+
								"			<button class='btn btn-primary btn-xs' data-cmd='rotate' data-option='-90' type='button' title='Rotate Left'>"+
								"				<span class='fa fa-rotate-left'></span>"+
								"			</button>"+
								"			<button class='btn btn-primary btn-xs' data-cmd='rotate' data-option='90' type='button' title='Rotate Right'>"+
								"				<span class='fa fa-rotate-right'></span>"+
								"			</button>"+
								"		</div>"+
								"		<button class='btn btn-danger btn-xs btn-block hidden' data-cmd='save' type='button'>"+
								"			Update Picture"+
								"		</button>"+
								"</div>";
		    	system.modalLarge('Updating Picture','b',content);
	            var $inputImage = $("#inputImage");
	            if(window.FileReader){
	                $inputImage.change(function() {
	                    var fileReader = new FileReader(),
	                            files = this.files,
	                            file;

	                    file = files[0];

	                    if (/^image\/\w+$/.test(file.type)) {
	                        fileReader.readAsDataURL(file);
	                        fileReader.onload = function () {
	                            $inputImage.val("");

					            var $image = $(".image-crop > img")
					            $($image).cropper({
					            	aspectRatio: 1/1,
								    autoCropArea: 0.80,
								    preview: ".avatar-preview",
								    built: function () {
								    	$("button[data-cmd='save']").removeClass('hidden');
							            $("button[data-cmd='save']").click(function(){									    	
									    	$(this).html('Loading..').addClass('disabled');
					    					var ajax = system.do_ajax('../assets/harmony/Process.php?update-image',[data[0][0],'applicant',$image.cropper("getDataURL")]);
											ajax.success(function(data){
												if(data == 1){
													swal("Successful!", "Employer's picture has been updated.", "success");
													system.close_modalLarge();
													App.handleLoadPage(window.location.hash);
												}
												else{
													swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
													console.log(data);
												}
											});
							            });
								    }
								});

	                            $image.cropper("reset", true).cropper("replace", this.result);

					            $("button[data-cmd='rotate']").click(function(){
					            	var data = $(this).data('option');
						        	$image.cropper('rotate', data);
					            });

	                        };
	                    }
	                    else{
	                        showMessage("Please choose an image file.");
	                    }
	                });
	            }
	            else{
	                $inputImage.addClass("hide");
	            }
	    	});
	    }
    };
}();

var student = function () {
	"use strict";
	return {
	    update_picture:function(){
    		var data = mainProcess.get_account();
    		data = JSON.parse(data);
			var picture = "../assets/img/profile avatar.jpg";
			if(data[0][5] != ""){
				var imageData = data[0][5].split('.');
				if(imageData[imageData.length-1]!='apr')
					picture = "../assets/img/"+data[0][5];					
				else
					picture = mainProcess.get_apr(data[0][5]);					
			}

	    	$("a[data-cmd='update_picture']").click(function(){
	    		$("#profile_picture1").addClass('hidden');
	    		$("#profile_picture2").removeClass('hidden')
	    		var content =   "<div class='image-crop' style='margin-bottom:5px;'>"+
								"	<img width='100%' src='"+picture+"'>"+
								"</div><br/>"+
								"<div class='btn-group'>"+
								"<label for='inputImage' class='btn btn-xs btn-primary'>"+
								"	<input type='file' accept='image/*' name='file' id='inputImage' class='hide'>"+
								"	Upload new image"+
								"</label>"+
								"<button class='btn btn-warning btn-xs' data-cmd='cancel' type='button'>"+
								"	Cancel"+
								"</button>"+
								"</div>"+
								"<div class='btn-group'>"+
								"<button class='btn btn-info btn-xs hidden' data-cmd='rotate' data-option='-90' type='button' title='Rotate Left'>"+
								"	<span class='fa fa-rotate-left'></span>"+
								"</button>"+
								"<button class='btn btn-info btn-xs hidden' data-cmd='rotate' data-option='90' type='button' title='Rotate Right'>"+
								"	<span class='fa fa-rotate-right'></span>"+
								"</button>"+
								"<button class='btn btn-danger btn-xs hidden' data-cmd='save' type='button'>"+
								"	Save"+
								"</button>"+
								"</div>";
	    		$("#profile_picture2").html(content);
	            var $inputImage = $("#inputImage");
	            if(window.FileReader){
	                $inputImage.change(function() {
	                    var fileReader = new FileReader(),
	                            files = this.files,
	                            file;

	                    file = files[0];

	                    if (/^image\/\w+$/.test(file.type)) {
	                        fileReader.readAsDataURL(file);
	                        fileReader.onload = function () {
	                            $inputImage.val("");

					            var $image = $(".image-crop > img")
					            $($image).cropper({
					            	aspectRatio: 1/1,
								    autoCropArea: 0.80,
								    preview: ".avatar-preview",
								    built: function () {
								    	$("button[data-cmd='rotate']").removeClass('hidden');
								    	$("button[data-cmd='save']").removeClass('hidden');
							            $("button[data-cmd='save']").click(function(){									    	
									    	$(this).html('Loading..').addClass('disabled');
					    					var ajax = system.do_ajax('../assets/harmony/Process.php?update-image',[data[0][0],'student',$image.cropper("getDataURL")]);
											ajax.success(function(data){
												if(data == 1){
													swal("Successful!", "Your picture has been updated.", "success");
													system.close_modalLarge();
													App.handleLoadPage(window.location.hash);
												}
												else{
													swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
													console.log(data);
												}
											});
							            });
								    }
								});

	                            $image.cropper("reset", true).cropper("replace", this.result);

					            $("button[data-cmd='rotate']").click(function(){
					            	var data = $(this).data('option');
						        	$image.cropper('rotate', data);
					            });

	                        };
	                    }
	                    else{
	                        showMessage("Please choose an image file.");
	                    }
	                });
	            }
	            else{
	                $inputImage.addClass("hide");
	            }

	            $("button[data-cmd='cancel']").click(function(){
					App.handleLoadPage(window.location.hash);
	            });
	    	});
	    },
        update_data:function(){
    		var data = mainProcess.get_account(),studentdata = JSON.parse(data);
    		var files;

        	$("a[data-field='resume']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_resume").addClass('hidden');
        		$("#field_resume").removeClass('hidden');
        	});

        	$("a[data-field='password']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#text_password").addClass('hidden');
        		$("#field_password").removeClass('hidden');
        	});

        	$(".show-password").mouseup(function() {
        		$(this).parent('span').parent('div').find('input').prop({"type":"password"})
			})
			.mousedown(function() {
        		$(this).parent('span').parent('div').find('input').prop({"type":"text"})
			});

        	$(".cancel").click(function(){
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$('input').val('');
        	});

        	$("#form_resume input[name='file']").change(function(){
        		var data = $(this).val();
        		data = data.split('.');
        		if((data[data.length-1] == 'docx') || (data[data.length-1] == 'pdf')){
        			$("#uploads").html('Valid file format.');
        			$("#button_resume").removeClass('hidden');

        			console.log(data[data.length-1]);
        		}
        		else{
        			$("#uploads").html('Invalid file format.');
        			$("#button_resume").addClass('hidden');
        		}
        	});

        	$("#button_resume").click(function(){
        		system.do_upload('../assets/harmony/Process.php?do-uploadResume',
        			function(data){
		        		var data = ['student',studentdata[0][0],'resume',data[0]['file']];
						var ajax = system.do_ajax('../assets/harmony/Process.php?do-updateData',data);
						ajax.success(function(data){
							if(data == 1){
								swal("Successful!", "", "success");
								App.handleLoadPage(window.location.hash);
							}
							else{
								swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
								console.log(data);
							}
						});
        				console.log('success'); 
        			},
        			function(){
        				console.log('error');
        			}
        		);
        	});


        	$(".btn-success").click(function(){
        		var name = $(this).parent('span').parent('div').find('input').attr('placeholder');
        		var value = $(this).parent('span').parent('div').find('input').val();

        		if(value != ""){
	        		var data = ['student',studentdata[0][0],name,value];
					var ajax = system.do_ajax('../assets/harmony/Process.php?do-updateData',data);
					ajax.success(function(data){
						if(data == 1){
							swal("Successful!", "", "success");
							App.handleLoadPage(window.location.hash);
						}
						else{
							swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
					});
        		}
        		else{
        			system.errorNotification('Notice',name+' can\'t be empty.');
        		}
        	});
        },
        jobposting:function(){
    		var data = JSON.parse(mainProcess.get_account());
			var ajax = system.do_ajax('../assets/harmony/Process.php?do-getAllJobsPosts',"");
			var ajaxData = JSON.parse(ajax.responseText);
			var content = "";

			if(ajaxData.length>0){
				$.each(ajaxData,function(i,v){
					if(v[0][5] != 'null')
						v[0][5] = JSON.parse(v[0][5]);
					else
						v[0][5] = [];
				});

				var content = "<table class='table' id='table_jobs'>"+
								"	<thead>"+
								"		<tr>"+
								"			<th width='80%'></th>"+
								"		</tr>"+
								"	</thead>"+
								"</table>";

				$("#job-posts").html(content);

				$('#table_jobs').DataTable({
				    data: ajaxData,
				    sort: false,
				    "bInfo": false,
				    "bLengthChange": false,
				    "bFilter": false,
					"columnDefs": [
						{ className: "project-title", "targets": [0] },
					],
				    columns: [
				        {data: "",
				            render: function ( data, type, full ){
				            	var details = "<small class='prettydate pull-right'>"+full[0][6]+"</small><h2 style='margin-top: 0px;'>"+full[0][4]+"</h2>"+full[0][2]+"<br/>"+
			            					"<a href='#cmd=index;content=job;id="+full[0][0]+"' class='btn btn-outline btn-default btn-xs'>Apply</a>";
				                return details;
				            }
				        },
				    ]
				});
				system.date();
				$(".pagination li").click(function(){
					system.date();
				});
			}
        },
        jobsearch:function(){
        	$("#btn_jobsearch").click(function(){
        		var data = $(this).parent('div').parent('form').serializeArray();
	    		var skills = [], fields = [], result = [];


	    		if((data.length>1) && (data[0]['value'] != "")){
		    		$("#job-posts").addClass("hidden");
		    		$("#job-search").removeClass("hidden");

	    			$.each(data,function(i,v){
	    				if(v['name'] == 'field_requiredSkills')
	    					skills.push(v['value']);
	    				else
	    					fields.push(v['value']);
	    			});		    		
	    			fields.push(skills);

					var search = system.do_ajax('../assets/harmony/Process.php?do-searchJobsPosts',fields);
					var searchData = JSON.parse(search.responseText);

	    			if(searchData.length > 0){
						$.each(searchData,function(i,v){
							if(v[0][5] != 'null')
								v[0][5] = JSON.parse(v[0][5]);
							else
								v[0][5] = [];
						});

						var content = "<a data-cmd='close-search' class='pull-right'>Close Search</a>"+
										"<table class='table' id='table_searchjobs'>"+
										"	<thead>"+
										"		<tr>"+
										"			<th width='80%'></th>"+
										"		</tr>"+
										"	</thead>"+
										"</table>";
						$("#job-search").removeClass('text-center').html(content);
						$('#table_searchjobs').DataTable({
						    data: searchData,
						    sort: false,
						    "bInfo": false,
						    "bLengthChange": false,
						    "bFilter": false,
							"columnDefs": [
								{ className: "project-title", "targets": [0] },
							],
						    columns: [
						        {data: "",
						            render: function ( data, type, full ){
						            	var details = "<small class='prettydate pull-right'>"+full[0][6]+"</small><h2 style='margin-top: 0px;'>"+full[0][4]+"</h2>"+full[0][2]+"<br/>"+
					            					"<a href='#cmd=index;content=job;id="+full[0][0]+"' class='btn btn-outline btn-default btn-xs'>Apply</a>";
						                return details;
						            }
						        },
						    ]
						});
						system.date();
						$(".pagination li").click(function(){
							system.date();
						});

						$("a[data-cmd='close-search']").click(function(){
				    		$("#job-posts").removeClass("hidden");
				    		$("#job-search").addClass("hidden").html("");
						});
	    			}
	    			else{
						var content = "<h2>No job found with your query. </h2><p>Try searching with different job title and skills</p>";
						$("#job-search").addClass('text-center').html(content);
	    			}
	    		}
	    		else{
			        system.errorNotification("Notice!","Search for a job title and atleast 1 skill.");
	    		}
        	});
        },
        job:function(id){
    		var data = JSON.parse(mainProcess.get_account());
			var ajax = system.do_ajax('../assets/harmony/Process.php?do-getJob',id[1]);
			var ajaxData = JSON.parse(ajax.responseText);
			var applicant = "", vacancy_id = ajaxData[0][0][0];
			var applicationexpiry = new Date(ajaxData[0][0][3]), now = new Date();
			var status = "<span class='label label-primary'>Active</span>";
			console.log(ajaxData);

			var employer = ""+
							"    <div class='contact-box center-version'>"+
							"        <a>"+
							"            <img alt='image' class='img-circle' src='"+mainProcess.get_apr(ajaxData[0][2][9])+"'>"+
							"            <h3 class='m-b-xs'><strong>"+ajaxData[0][2][5]+"</strong></h3>"+
							"            <small>"+ajaxData[0][2][6]+"</small>"+
							"            <address class='m-t-md'>"+ajaxData[0][2][3]+"<br>"+
							"                <abbr title='Phone'>P:</abbr> "+ajaxData[0][2][4]+"<br>"+
							"                <abbr title='Email'>E:</abbr> "+ajaxData[0][2][10]+
							"            </address>"+
							"        </a>"+
							"    </div>"+
							"";
			$("#job-employer").html(employer);

			if(applicationexpiry<now){
				status = "<span class='label label-danger'>Inactive</span>";
				$('#data_form').addClass('hidden');
				$('#data_info').removeClass('hidden').html("<h2>Expired</h2><p>Application date has been expired</p>.");
			}

			if(ajaxData[0][1].length > 0){
				$.each(ajaxData[0][1],function(i,v){
					var data_applicants = JSON.parse(v[2]);
					console.log(v[3]);
					if(data[0][0] == data_applicants[0]){
						var application_content = "<h3>Your Applicantion</h3><div class='feed-activity-list'>"+
							"    <div class='feed-element'>"+
							"        <a href='#' class='pull-left'>"+
							"            <img alt='image' class='img-circle' src='"+mainProcess.get_apr(data_applicants[2])+"'>"+
							"        </a>"+
							"        <div class='media-body'>"+
							"            <small class='pull-right prettydate'>"+v[4]+"</small>"+
							"            <strong>"+data_applicants[3][0]+", "+data_applicants[3][1]+" "+data_applicants[3][2]+"</strong><br>"+
							"            <small class='text-muted'>"+v[4]+"</small>"+
							"            <div class='well'>"+v[3]+"</div>"+
							"        </div>"+
							"    </div>"+
							"</div>";
						$('#data_form').addClass('hidden');
						$('#data_info').removeClass('hidden').html(application_content);
					}
					applicant += "<img style='margin-left:5px;' alt='image' width='30px' class='img-circle' src='"+mainProcess.get_apr(data_applicants[2])+"'>";

				});
			}
			else{
				applicant = "No Applicant.";
			}

			$('#job-post #txt_jobtitle').html(ajaxData[0][0][4]);
			$('#job-post #txt_jobstatus').html(status);
			$('#job-post #txt_jobexpiry').html(ajaxData[0][0][3]);
			$('#job-post #txt_jobdate').html(ajaxData[0][0][6]);
			$('#job-post #txt_jobdescription').html(ajaxData[0][0][2]);
			$('#job-post #txt_jobapplicant').html(applicant);

			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss"
			});

        	$("#employer_description").keyup(function(){
                system.StringCounter($(this).val(),$("#desc_stringCounter"),1000);
                if($(this).val().length > 1000){
                	$("#btn_submitApplication").addClass('disabled');
        			system.errorNotification('Notice','Description must only contain 1000 characters.');
                }
                else{
                	$("#btn_submitApplication").removeClass('disabled');
                }
        		$("#field_application").val($(this).val());    
        	});

			$("#btn_submitApplication").click(function(){
				var applicant_data = [data[0][0],data[0][1],data[0][4],data[0][5]];
				var senddata = [applicant_data,vacancy_id,$("#field_application").val()];
				var ajax = system.do_ajax('../assets/harmony/Process.php?do-savejob',senddata);
				var ajaxData = JSON.parse(ajax.responseText);
				ajax.success(function(data){
					if(data == 1){
						swal("Successful!", "Your picture has been updated.", "success");
						system.close_modalLarge();
						App.handleLoadPage(window.location.hash);
					}
					else{
						swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
						console.log(data);
					}
				});
			});
        },
        application:function(){
    		var data = JSON.parse(mainProcess.get_account());
			var ajax = system.do_ajax('../assets/harmony/Process.php?do-getApplications',data[0][0]);
			var ajaxData = JSON.parse(ajax.responseText);
			var content = "";

			$.each(ajaxData,function(i,v){
				console.log(v);
				if(v[2][5] != "null"){
					var skills = JSON.parse(v[2][5]), $skills = "";
					$.each(skills,function(a,b){
						$skills += "<span class='label label-defualt'style='margin-right: 5px;'>"+b+"</span>";
					});
				}
				content += "    <div class='timeline-item'>"+
						"        <div class='row'>"+
						"            <div class='col-lg-3 date'>"+
						"                <i class='fa fa-briefcase'></i>"+v[0][4]+"<br><small class='text-navy prettydate'>"+v[0][4]+"</small>"+
						"            </div>"+
						"            <div class='col-lg-10 content no-top-border'>"+
						"                <p class='m-b-xs'><a data-toggle='collapse' data-parent='#accordion' href='#"+v[0][0]+"' aria-expanded='false' class='collapsed btn btn-white btn-xs pull-right'>Show Employer's Information</a>"+
						"                <p class='m-b-xs'><h3><strong>Job Title:</strong> "+v[2][4]+"</h3></p>"+
						"                <p class='m-b-xs'><strong>Skills:</strong> "+$skills+"</p>"+
						"                <p class='m-b-xs'><strong>Job Description:</strong> "+v[2][2]+"</p>"+
						"                <div id='"+v[0][0]+"' class='panel-collapse collapse' aria-expanded='false' style='height: 0px;'>"+
						"                	<div class='panel-body'>"+
						"                		<div class='hr-line-dashed'></div>"+
						"                		<p class='m-b-xs'><strong>Company:</strong> "+v[1][5]+"</p>"+
						"                		<p class='m-b-xs'><strong>Office:</strong> "+v[1][3]+"</p>"+
						"                		<p class='m-b-xs'><strong>Email:</strong> "+v[1][10]+"</p>"+
						"                		<p class='m-b-xs'><strong>Company Description:</strong> "+v[1][6]+"</p>"+
						"                		<div class='hr-line-dashed'></div>"+
						"                	</div>"+
						"                </div>"+
						"                <p class='m-b-xs'><strong>Your Application:</strong><br/><div class='well'>"+v[0][3]+"</div></p>"+
						"            </div>"+
						"        </div>"+
						"    </div>";
			});
			content = "<div class='ibox-content inspinia-timeline'>"+content+"</div>";
			$("#jobapplications").html(content);
			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss"
			});
        },
    };
}();
