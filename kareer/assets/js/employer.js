var employer = function () {
	"use strict";
	return {
		ini:function(){
			var data = employer.check_access();
			if(data != 0){
				employer.display();
				employer.logout();				
			}
		},
		display:function(){
			var sys = system, validate = validation, _this = this;
			var ajax = system.html('../assets/harmony/Process.php?get-account');
			ajax.done(function(data){
				data = JSON.parse(data);
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
						// picture = _this.get_apr(data[0][9]);					
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

				// var accountCompute = sys.computeAccount(data);
				// if(accountCompute[0]<100){
				// 	var fields = ["id","Last Name","First Name","Address","Contact Number","Company Name","Description","DTI Number","BIR Number","Picture","Email","Password","Status"];
				// 	var subcontent = "", content = "";

				// 	$.each(accountCompute[2],function(i,v){
				// 		if(fields[v] == "Description"){
				// 			subcontent += "<li class='list-group-item'>"+fields[v]+": <textarea data-inputtype='required' placeholder='"+fields[v]+"' class='form-control' name='"+fields[v]+"' style='resize: none;'></textarea></li>";						
				// 		}
				// 		else{
				// 			subcontent += "<li class='list-group-item'>"+fields[v]+": <input data-inputtype='required' placeholder='"+fields[v]+"' type='text' class='form-control' name='"+fields[v]+"'></li>";						
				// 		}
				// 	});

				// 	subcontent = "<strong>You need to complete the following:</strong><form class='form-horizontal' id='form_completion' role='form' method='post' enctype='multipart/form-data'><ul class='list-group clear-list'>"+subcontent+"</ul></form>";
				// 	content = "<div class='row col-md-12' style='float:none;'><div class='row col-md-5 text-center'>"+
				// 				"    <h1>"+accountCompute[0]+"%</h1><h2>Complete</h2>"+
				// 				"</div>"+
				// 				"<div class='row col-md-8'>"+
				// 					subcontent+
				// 				"<a class='btn btn-sm btn-block btn-success' data-cmd='save_info'>Save</a></div>"+
				// 				"</div>";

				// 	$("#account").html(content);
				// 	$("a[data-cmd='save_info']").click(function(){
			 //    		var completiondata = $("#form_completion").serializeArray();

				// 		var validated = validate.validate(completiondata);
				// 		if(validated[0]>0){
				// 			var message = "";
				// 			$.each(validated[1],function(i,v){
				// 				message += (i+1)+". "+v+"<br/>";
				// 			})
				// 			sys.errorNotification('The following fields has an error',message);
				// 		}
				// 		else{
				//     		var newdata = [completiondata,data[0][0]];
				// 			var ajax = system.do_ajax('../assets/harmony/Process.php?do-completeData',newdata);
				// 			ajax.success(function(data){
				// 				if(data == 1){
				// 					toast("Successful!", "Employer's information has been saved.", "success");
				// 					App.handleLoadPage(window.location.hash);
				// 				}
				// 				else{
				// 					toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
				// 					console.log(data);
				// 				}
				// 			});
				// 		}

				// 	});
				// }

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
						var logout_data = system.ajax('../assets/harmony/Process.php?kill-session',ajax.responseText);
						employer.check_access();
					}
				});
			})
		},
        get:function(){
			var data = system.html('assets/harmony/Process.php?get_jobsPosts');
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
		account: function(){
			var result = "";
			var ajax = system.html('../assets/harmony/Process.php?get-account');
			ajax.done(function(data){
				result = data;
			});
			return result;
		},
	    update_picture:function(){
    		var data = JSON.parse(employer.account());

			var picture = "../assets/img/profile avatar.jpg";
			if(data[0][9] != ""){
				var imageData = data[0][9].split('.');
				if(imageData[imageData.length-1]!='apr')
					picture = "../assets/img/"+data[0][9];					
				else
					picture = "" //mainProcess.get_apr(data[0][9]);					
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
					    					var ajax = system.ajax('../assets/harmony/Process.php?update-image',[data[0][0],'employer',$image.cropper("getDataURL")]);
											ajax.success(function(data){
												if(data == 1){
													toast("Successful!", "Employer's picture has been updated.", "success");
													system.close_modalLarge();
													App.handleLoadPage(window.location.hash);
												}
												else{
													toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
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
    		var employerdata = JSON.parse(employer.account());

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
					var ajax = system.ajax('../assets/harmony/Process.php?do-updateData',data);
					ajax.success(function(data){
						if(data == 1){
							Materialize.toast("Successful!", "", "success");
							App.handleLoadPage(window.location.hash);
						}
						else{
							Materialize.toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
					});
        		}
        		else{
        			system.errorNotification('Notice',name+' can\'t be empty.');
        		}
        	});
        },
		logout:function(){
			$("a[ data-cmd='logout']").on("click",function(){
				var ajax = system.html('../assets/harmony/Process.php?kill-session');
				ajax.done(function(data){
					console.log(data);
					if(data == 1){
				    	$(location).attr('href','../');			
					}
					else{
						Materialize.toast('Cannot process request.',4000);
					}
				})
			});
		},
        check_access:function(){
            var result = "";
            var ajax = system.html('../assets/harmony/Process.php?get-session');
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
    };
}();

var jobs = function(){
	"use strict";
	return {
        posting:function(){
			var content = "";
			var ajax = system.html('../assets/harmony/Process.php?get-jobsPosts');
			ajax.done(function(data){
<<<<<<< HEAD
				ajax = JSON.parse(ajax.responseText);
				// console.log(data);
=======
				// ajax = JSON.parse(ajax.responseText);
				console.log(data);
>>>>>>> 4c8c79d1e979c0f96c9cff527cdb7b6618718d84
			})
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

				$("#jobs").html(content);

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
<<<<<<< HEAD



			// $(".prettydate").prettydate({
			//     dateFormat: "YYYY-MM-DD hh:mm:ss"
			// });			ajax.done(function(data){});
=======
			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss"
			});			//ajax.success(function(data){});
>>>>>>> 4c8c79d1e979c0f96c9cff527cdb7b6618718d84
        },
        posts:function(){
    		var data = JSON.parse(employer.account());
			var ajax = system.ajax('../assets/harmony/Process.php?get-employerJobsPosts',data[0][0]);
			var ajaxData = JSON.parse(ajax.responseText);
			var content = "";
			if(ajaxData.length>0){
				var content = "<div class='card'><div class='card-content'><table class='table table-striped' id='table_jobs'>"+
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
							            	details += "<img alt='image' class='img-circle' src='' style='margin-right: 5px;'>";
							            	// details += "<img alt='image' class='img-circle' src='"+mainProcess.get_apr(data_applicants[2])+"' style='margin-right: 5px;'>";
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
        getByID:function(id){
    		var data = JSON.parse(employer.account());
			var ajax = system.ajax('../assets/harmony/Process.php?get-jobByID',id[1]);
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
											// "        <img alt='image' class='img-circle' src='"+mainProcess.get_apr(data_applicants[2])+"'>"+
											"        <img alt='image' class='img-circle' src=''>"+
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
			$('#job-post #txt_jobstatus').html(status);[0][1]
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
							Materialize.toast("Successful!", "", "success");
							system.close_modalLarge();
							App.handleLoadPage(window.location.hash);
						}
						else{
							Materialize.toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
					});
					});
        	});

			$("a[data-cmd]").click(function(){
				var data = [$(this).data('cmd'),$(this).data('id')];
				if(data[0] == 'decline'){
				    Materialize.toast({
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
								Materialize.toast("Successful!", "", "success");
								system.close_modalLarge();
								App.handleLoadPage(window.location.hash);
							}
							else{
								Materialize.toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
								console.log(data);
							}
						});
				    });
				}
			});
        },
	    add:function(){
    		var acount = JSON.parse(employer.account());
			$("#form_postJob").validate({
			    rules: {
			        field_jobTitle: {required: true,maxlength: 50},
			        field_date: {required: true,maxlength: 50},
			        field_skills: {required: true,maxlength: 50},
			        field_description: {required: true,maxlength: 50},
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
					var data = system.ajax('../assets/harmony/Process.php?set-postJob',[acount[0][0],_form]);
					ajax.done(function(data){
						console.log(data);
						if(data == 1){
							system.clearForm();
							Materialize.toast('Saved.',4000);
							App.handleLoadPage("#cmd=index;content=post-job");
						}
						else{
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 
			
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
							toast("Successful!", "Employer has been accepted.", "success");
							App.handleLoadPage(window.location.hash);
						}
						else{
							toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
					});
				}

	    	});
			
	    },
	}
<<<<<<< HEAD
}();

var Applicants = function(){
	"use strict";
	return {
		list: function(){
			var sys = system, validate = validation, _this = this, _apps = App;
			var content = "", actions = "", status = "";
			var ajax = sys.ajax('../assets/harmony/Process.php?get-allApplicant',"");
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
					
						var content = "<table class='table table-bordered' id='table_approvedApplicants'>"+
										"	<thead>"+
										"		<tr>"+
										"			<th width='5%'></th>"+
										"			<th width='50%'>Name</th>"+
										"			<th width='15%'></th>"+
										"		</tr>"+
										"	</thead>"+
										"</table>";

						$("#approved_applicants .card-content").html(content);

						$('#table_approvedApplicants').DataTable( {
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
												picture = sys.get_apr(full[9]);					
											}
										}

						            	var details = '<img alt="image" src="'+picture+'">';
						                return details;
						            }
						        },
						        {data: "",
						            render: function ( data, type, full ){
						            	var details = full[5]+"</br><i>"+(full[3])+"</i>";
						                return details;
						            }
						        },
						        {data: "",
						            render: function ( data, type, full ){
						            	var details = "<a data-id='"+full[0]+"' data-cmd='options_approvedApplicants' class='btn btn-success btn-xs btn-block'>Details</a>";
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
										"	<td width='20%'><a data-id='"+v[0]+"' data-cmd='options_pendingApplicants' class='btn btn-danger btn-xs btn-block'>Details</a></td>"+
										"</tr>";
						});

						content = "<table class='table table-bordered' id='table_pendingApplicants'>"+content+"</table>";

						$("#pending_Applicants .card-content").html(content);
							}
							else{
								$("#pending_Applicants .card-content").html("<h2>All caught up. </h2><h4>No pending request for applicant's account approval</h4>");
							}
					if(arrDeclined.length>0){
						var content = "";

						$.each(arrDeclined,function(i,v){
							content += "<tr>"+
										"	<td class='text-left' width='80%'>"+(i+1)+". "+v[5]+"</td>"+
										"	<td width='20%'><a data-id='"+v[0]+"' data-cmd='options_declinedapplicant' class='btn btn-danger btn-xs btn-block'>Details</a></td>"+
										"</tr>";
						});

						content = "<table class='table table-bordered' id='table_declinedApplicants'>"+content+"</table>";

						$("#declined_Applicants .card-content").html(content);
							}
							else{
								$("#declined_Applicants .card-content").html("<h2>All caught up. </h2><h4>No declined request for applicant's account approval</h4>");
							}
					
							$("a").click(function(){
						var cmd = $(this).data('cmd');
						var id = $(this).data('id');
						if(cmd == 'options_pendingEmployer'){
							
							var data = sys.searchJSON(arrPending,0,id);
							var content = "<div class='col-md-offset-3 col-md-6' style='float:none !important;'>"+
											"	<table class='table table-bordered card-content'>"+
											"		   <tr><td width='20%'>Company: </td><td width='80%'>"+data[0][5]+"</td></tr>"+
											"		   <tr><td>Description: </td><td>"+data[0][6]+"</td></tr>"+
											"		   <tr><td>BIR: </td><td>"+data[0][7]+"</td></tr>"+
											"		   <tr><td>DTI: </td><td>"+data[0][8]+"</td></tr>"+
											"		   <tr><td>Owner: </td><td>"+data[0][2]+" "+data[0][1]+"</td></tr>"+
											"		   <tr><td>Contact Number: </td><td>"+data[0][4]+"</td></tr>"+
											"		   <tr><td>Office Address: </td><td>"+data[0][3]+"</td></tr>"+
											"		   <tr><td>Email Address: </td><td>"+data[0][10]+"</td></tr>"+
											"		   <tr><td>Status: </td><td>"+data[0][12]+"</td></tr>"+
											"	</table>"+
											"	<div class='col-md-6'><a class='btn btn-primary btn-xs btn-block' data-cmd='action_acceptPending' data-id='"+data[0][0]+"'>Accept</a></div>"+
											"	<div class='col-md-6'><a class='btn btn-white btn-xs btn-block' data-cmd='action_declinePending' data-id='"+data[0][0]+"'>Decline</a></div>"+
											"</div>";
							$("#applicant .card-content").html(content);

							$("a[data-cmd='action_acceptPending']").click(function(){
								var id = $(this).data('id');
								sys.confim("Accept this Employer?",function(){
									var ajax = sys.ajax('../assets/harmony/Process.php?set-acceptPendingapplicant',id);
									ajax.success(function(data){
										if(data == 1){
								        	
											swal("Successful!", "applicant has been declined.", "success");
											sys.clearForm();
											_this.list();
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
								sys.confim("Decline this applicant?",function(){
									var ajax = sys.ajax('../assets/harmony/Process.php?set-declinePendingapplicant',id);
									ajax.success(function(data){
										if(data == 1){
								        	
											swal("Successful!", "applicant has been declined.", "success");
											sys.clearForm();
											_this.list();
										}
										else{
											swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
											console.log(data);
										}
									});
								});
							});
						}

						else if(cmd == 'options_declinedapplicant'){
							var data = sys.searchJSON(arrDeclined,0,id);
							var content = "<div class='col-md-12' style='float:none !important;'><table class='table table-bordered card-content'>"+
										    "	<tr><td width='20%'>Company: </td><td width='80%'>"+data[0][5]+"</td></tr>"+
										    "	<tr><td>Description: </td><td>"+data[0][6]+"</td></tr>"+
										    "	<tr><td>BIR: </td><td>"+data[0][7]+"</td></tr>"+
										    "	<tr><td>DTI: </td><td>"+data[0][8]+"</td></tr>"+
										    "	<tr><td>Owner: </td><td>"+data[0][2]+" "+data[0][1]+"</td></tr>"+
										    "	<tr><td>Contact Number: </td><td>"+data[0][4]+"</td></tr>"+
										    "	<tr><td>Office Address: </td><td>"+data[0][3]+"</td></tr>"+
										    "	<tr><td>Email Address: </td><td>"+data[0][10]+"</td></tr>"+
										    "	<tr><td>Status: </td><td>"+data[0][12]+"</td></tr>"+
										  	"</table>"+

											"	<div class='col-md-6'><a class='btn btn-white btn-xs btn-block' data-cmd='action_acceptPending' data-id='"+data[0][0]+"'>Accept</a></div>"+
										  "</div>";

							$("#applicant .card-content").html(content);
							
							$("a[data-cmd='action_acceptPending']").click(function(){
								var id = $(this).data('id');
								sys.confim("Accept this applicant?",function(){
									var ajax = sys.ajax('../assets/harmony/Process.php?set-acceptPendingapplicant',id);
									ajax.success(function(data){
										if(data == 1){
								        	
											swal("Successful!", "applicant has been declined.", "success");
											sys.clearForm();
											_this.list();
										}
										else{
											swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
											console.log(data);
										}
									});
								});
							});
						}

						else if(cmd == 'options_approvedapplicant'){
							var data = sys.searchJSON(arrApproved,0,id);
							var content = "<div class='col-md-12' style='float:none !important;'><table class='table table-bordered card-content'>"+
										    "	<tr><td width='20%'>Company: </td><td width='80%'>"+data[0][5]+"</td>"+
										    "   <td><a data-cmd='updateEmployer' data-value='"+data[0][5]+"' data-name='"+data[0][5]+"' data-node='"+data[0][0]+"' data-prop='CompanyName' class='tooltipped btn-floating waves-effect black-text no-shadow white right material-icons' data-position='left' data-delay='50' data-tooltip='Update Company'>"+
											"	<i class='material-icons'></i></a>"+
											"	</td></tr>"+
										    "	<tr><td>Description: </td><td>"+data[0][6]+"</td></tr>"+
										    "	<tr><td>BIR: </td><td>"+data[0][7]+"</td></tr>"+
										    "	<tr><td>DTI: </td><td>"+data[0][8]+"</td></tr>"+
										    "	<tr><td>Owner: </td><td>"+data[0][2]+" "+data[0][1]+"</td></tr>"+
										    "	<tr><td>Contact Number: </td><td>"+data[0][4]+"</td></tr>"+
										    "	<tr><td>Office Address: </td><td>"+data[0][3]+"</td></tr>"+
										    "	<tr><td>Email Address: </td><td>"+data[0][10]+"</td></tr>"+
										    "	<tr><td>Status: </td><td>"+data[0][12]+"</td></tr>"+
										  	"</table>"+

											"	<div class='col-md-6'><a class='btn btn-white btn-xs btn-block' data-cmd='action_declinePending' data-id='"+data[0][0]+"'>Decline</a></div>"+
										  "</div>";

							$("#applicant .card-content").html(content);
							
							$("a[data-cmd='action_declinePending']").click(function(){
								var id = $(this).data('id');
								sys.confim("Decline this Applicant?",function(){
									var ajax = sys.ajax('../assets/harmony/Process.php?set-declinePendingApplicant',id);
									ajax.success(function(data){
										if(data == 1){
								        	
											swal("Successful!", "Applicant has been declined.", "success");
											sys.clearForm();
											_this.list();
										}
										else{
											swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
											console.log(data);
										}
									});
								});
							});
						}

						else{
						}
							applicant.update();
					});
				}
			});				
	    },
 		update:function(){
			$("a[data-cmd='updateApplicants']").on('click',function(){
				var data = $(this).data();
				console.log(data);	
				var content = "<h5>Change "+data.prop+"</h5>"+
						  "<form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>"+
						  "		<label for='field_"+data.prop+"'>"+data.prop+": </label>"+
						  "		<input id='field_"+data.prop+"' value='"+data.value+"' type='text' name='field_"+data.prop+"' data-error='.error_"+data.prop+"'>"+
						  "		<div class='error_"+data.prop+"'></div>"+
						  "		<button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>"+
						  "		<a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close_modal right'>Cancel</a>"+
						  "</form>";
						  console.log(data.prop);
						  console.log(data.value);
				$("#modal .modal-content").html(content);
				$('#modal .modal-footer').html("");		

				if(data.prop == "CompanyName"){
					$('#modal').modal('open');			
					$("#form_update").validate({
					    rules: {
					        field_CompanyName: {required: true,maxlength: 50},
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
							if(data.value == _form[0]['value']){
								Materialize.toast('You did not even change the value.',4000);
							}
							else{
								var ajax = system.ajax('../assets/harmony/Process.php?update-applicant',_form);
								ajax.done(function(ajax){
									console.log(ajax)
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('Name updated.',4000);
										$('#modal').close_modal();	
										App.handleLoadPage("#cmd=index;content=Applicants");
									}
									else{
										Materialize.toast('Cannot process request.',4000);
									}
								});
							}
					    }
					}); 
				}			
				// else if(data.prop == "Email"){
				// 	$('#modal').modal('show');			
				// 	$("#form_update").validate({
				// 	    rules: {
				// 	        field_Email: {required: true,maxlength: 50,checkEmail:true},
				// 	    },
				// 	    errorElement : 'div',
				// 	    errorPlacement: function(error, element) {
				// 			var placement = $(element).data('error');
				// 			if(placement){
				// 				$(placement).append(error)
				// 			} 
				// 			else{
				// 				error.insertAfter(element);
				// 			}
				// 		},
				// 		submitHandler: function (form) {
				// 			var _form = $(form).serializeArray();
				// 			if(data.value == _form[0]['value']){
				// 				Materialize.toast('You did not even change the value.',4000);
				// 			}
				// 			else{
				// 				var ajax = system.ajax('../assets/harmony/Process.php?update-admin',_form);
				// 				ajax.done(function(ajax){
				// 					if(ajax == 1){
				// 						system.clearForm();
				// 						Materialize.toast('Email updated.',4000);
				// 						$('#modal').close_modal();	
				// 						App.handleLoadPage("#cmd=index;content=account");
				// 					}
				// 					else{
				// 						Materialize.toast('Cannot process request.',4000);
				// 					}
				// 				});
				// 			}
				// 	    }
				// 	}); 
				// }
				// else if(data.prop == "Username"){
				// 	$('#modal').modal('show');			
				// 	$("#form_update").validate({
				// 	    rules: {
				// 	        field_Username: {required: true,maxlength: 50,checkUsername:true,validateUsername:true},
				// 	    },
				// 	    errorElement : 'div',
				// 	    errorPlacement: function(error, element) {
				// 			var placement = $(element).data('error');
				// 			if(placement){
				// 				$(placement).append(error)
				// 			} 
				// 			else{
				// 				error.insertAfter(element);
				// 			}
				// 		},
				// 		submitHandler: function (form) {
				// 			var _form = $(form).serializeArray();
				// 			if(data.value == _form[0]['value']){
				// 				Materialize.toast('You did not even change the value.',4000);
				// 			}
				// 			else{
				// 				var ajax = system.ajax('../assets/harmony/Process.php?update-admin',_form);
				// 				ajax.done(function(ajax){
				// 					if(ajax == 1){
				// 						system.clearForm();
				// 						Materialize.toast('Username updated.',4000);
				// 						$('#modal').close_modal();	
				// 						App.handleLoadPage("#cmd=index;content=account");
				// 					}
				// 					else{
				// 						Materialize.toast('Cannot process request.',4000);
				// 					}
				// 				});
				// 			}
				// 	    }
				// 	}); 
				// }
				// else if(data.prop == "Password"){
				// 	$('#modal').modal('show');			
				// 	$("#field_Password").val("");
				// 	$("#field_Password").attr({"type":"password"});
				// 	$("#form_update").append("<p><input type='checkbox' id='showPassword'><label for='showPassword'>Show password</label></p>");		
				// 	$("#showPassword").on("click",function(){
				// 		if($(this).is(':checked')){
				// 			$("#field_Password").attr({"type":"text"});						
				// 		}
				// 		else{
				// 			$("#field_Password").attr({"type":"password"});						
				// 		}
				// 	})		
				// 	$("#form_update").validate({
				// 	    rules: {
				// 	        field_Password: {required: true,maxlength: 50,checkPassword:true,validatePassword:true},
				// 	    },
				// 	    errorElement : 'div',
				// 	    errorPlacement: function(error, element) {
				// 			var placement = $(element).data('error');
				// 			if(placement){
				// 				$(placement).append(error)
				// 			} 
				// 			else{
				// 				error.insertAfter(element);
				// 			}
				// 		},
				// 		submitHandler: function (form) {
				// 			var _form = $(form).serializeArray();
				// 			var data = system.ajax('../assets/harmony/Process.php?update-admin',_form);
				// 			data.done(function(data){
				// 				console.log(data);
				// 				if(data == 1){
				// 					system.clearForm();
				// 					Materialize.toast('Password updated.',4000);
				// 					$('#modal').close_modal();	
				// 					App.handleLoadPage("#cmd=index;content=account");
				// 				}
				// 				else{
				// 					Materialize.toast('Cannot process request.',4000);
				// 				}
				// 			});
				// 	    }
				// 	}); 
				// }
			});
		},
		addapplicant:function(){
			var _this = this;
			$("#add_applicant").on('click',function(){
				var data = system.xml("pages.xml");
				$(data.responseText).find("addapplicant").each(function(i,content){
					$("#modal .modal-content").html(content);
					$('#modal').modal('open');					
					$("#field_password").on('focus',function(){
						$("#note_password").removeClass('zoomOut hidden').addClass("zoomIn");
					}).on('blur',function(){
						$("#note_password").removeClass('zoomIn').addClass('zoomOut hidden');
					})		
					$("#form_addApplicant").validate({
					    rules: {
					        field_CompanyName: {required: true,maxlength: 50},
					        field_description: {required: true,maxlength: 500},
					        field_bir: {required: true,maxlength: 50},
					        field_dti: {required: true,maxlength: 50},
					        field_address: {required: true,maxlength: 50},
					        field_fname: {required: true,maxlength: 50},
					        field_lname: {required: true,maxlength: 50},
					        field_phone: {required: true,maxlength: 50},
					        field_email: {required: true,maxlength: 50},
					        field_password: {required: true,maxlength: 50,checkPassword:true,validatePassword:true},
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
							var data = system.ajax('../assets/harmony/Process.php?set-newApplicant',_form);
							data.done(function(data){
								console.log(data);
								if(data == 1){ 
									// var text = "<h1>Congratulations</h1>, you are now registered. You can login using <u>"+_form[2]['value']+"</u> as you username and <u>"+
									// _form[5]['value']+"</u> as your password. <a href='http://localhost/kaboomRewards/login.html'>Just follow this link</a>";
									// var data = system.send_mail('rufo.gabrillo@gmail.com,info@rnrdigitalconsultancy.com','applicant Registration',text);
									// if(data.responseText != ""){
										Materialize.toast('Saved.',4000);
										$("#modal") .close_modal('hide');
										system.clearForm();
										App.handleLoadPage("#cmd=index;content=Applicants;approved_Applicants");
									// }
								}
								else{
									Materialize.toast('Cannot process request.',4000);
								}
							});
					    }
					});
				});
			})
		},
	}
=======
>>>>>>> 4c8c79d1e979c0f96c9cff527cdb7b6618718d84
}();