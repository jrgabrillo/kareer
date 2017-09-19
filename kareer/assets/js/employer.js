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
						picture =" mainProcess.get_apr(data[0][9]);"					
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
					    					var ajax = system.ajax('../assets/harmony/Process.php?update-image',[data[0][0],'employer',$image.cropper("getDataURL")]);
											ajax.success(function(data){
												if(data == 1){
													Materialize.toast("Successful!", "Employer's picture has been updated.", "success");
													system.close_modal();
													App.handleLoadPage(window.location.hash);
												}
												else{
													Materialize.toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
													// console.log(data);
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
		    		var data = sys.get_account();
		    		data = JSON.parse(data);
		    		data = [data[0][0],fields]

					var ajax = system.ajax('../assets/harmony/Process.php?do-postJob',data);
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
        posting:function(){
			var content = "";
			var ajaxData="";
			var ajax = system.html('../assets/harmony/Process.php?get-jobsPosts');
			ajax.done(function(data){
				ajax = JSON.parse(ajax.responseText);
				// console.log(data);
			})
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
							            	details += "<img alt='image' class='circle' src='"+mainProcess.get_apr(data_applicants[2])+"' style='margin-right: 5px;'>";
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
console.log(data);
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
							            	// details += "<img alt='image' class='img-circle' src='' style='margin-right: 5px;'>";
							            	details += "<img alt='image' class='circle' src='"+mainProcess.get_apr(data_applicants[2])+"' style='margin-right: 5px;'>";
										}
										else{
											var count = full[1].length-i;
											console.log(i);
											if(i>13)
												count = 9+"+";

							            	details += "    <span class='new badge blue circle'>"+count+"</span>"+
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

// UPDATE JOB-POST STATUS
        Update_data:function(){
    		var employerdata = JSON.parse(employer.account());

        	$("a[data-field='Status']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#txt_jobtitle").addClass('hidden');
        		$("#field_Status").removeClass('hidden');
        	});
        	$("a[data-field='jobstatus']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#txt_jobstatus").addClass('hidden');
        		$("#field_jobstatus").removeClass('hidden');
        	});
        	$("a[data-field='jobexpiry']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#txt_jobexpiry").addClass('hidden');
        		$("#field_jobexpiry").removeClass('hidden');
        	});
        	$("a[data-field='jobdate']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#txt_jobdate").addClass('hidden');
        		$("#field_obdate").removeClass('hidden');
        	});
        	$("a[data-field='jobdescription']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#txt_jobdescription").addClass('hidden');
        		$("#field_jobdescription").removeClass('hidden');
        	});
        	$("a[data-field='jobapplicant']").click(function(){
        		$('input').val('');
        		$('span').removeClass('hidden');
        		$('div.field').addClass('hidden');
        		$("#txt_jobapplicant").addClass('hidden');
        		$("#field_jobapplicant").removeClass('hidden');
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
	        		var data = ['jobs',employerdata[0][0],name,value];
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
											"    <a href='#' class='left'>"+
											"        <img alt='image' class='circle' src='"+mainProcess.get_apr(data_applicants[2])+"'>"+
											// "        <img alt='image' class='img-circle' src=''>"+
											"    </a>"+
											"    <div class='media-body-row'>"+
											"       <small class='col s12 m6-left prettydate'>"+v[4]+"</small>"+
											"       <strong>"+data_applicants[3][0]+", "+data_applicants[3][1]+" "+data_applicants[3][2]+"</strong><br>"+
											"       <small class='disabled'>"+v[4]+"</small>"+
											"       <div class='well'>"+v[3]+"</div>"+
											"		<div class='actions'>"+actions+"</div><br/>"+
											"		<div id='"+v[0]+"' class='panel-collapse collapse' aria-expanded='false' style='height: 0px;'>"+
											"		    <textarea class='form-control input-sm employer_interview' placeholder='Say something about your invitation for interview' row='3' style='width:100%;max-width:100%;'></textarea>"+
											"		    <span class='right desc_stringCounter'></span>"+
											"		    <form role='form' class='form-inline form_interview'>"+
											"		        <input name='field_interview' type='text' placeholder='Description' class='form-control input-sm hidden'><br/>"+
											"		        <a data-id='"+v[0]+"' data-cmd='interview' class='btn waves-effect waves-light ' type='submit' name='action'>Submit <i class='material-icons right'>send</i></a>"+
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
					var ajax = system.ajax('../assets/harmony/Process.php?do-inviteInterview',content);
					var ajaxData = JSON.parse(ajax.responseText);
					ajax.success(function(data){
						if(data == 1){
							Materialize.toast("Successful!", "", "success");
							system.close_modal();
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
						var ajax = system.ajax('../assets/harmony/Process.php?do-decline',data[1]);
						var ajaxData = JSON.parse(ajax.responseText);
						ajax.success(function(data){
							if(data == 1){
								Materialize.toast("Successful!", "", "success");
								system.close_modal();
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
							Materialize.toast("Successful!", "Employer has been accepted.", "success");
							App.handleLoadPage(window.location.hash);
						}
						else{
							Materialize.toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
					});
				}

	    	});
			
	    },
	}
}();

var applicant = function(){
	"use strict";
	return {
		list_applicant: function(){
			var sys = system, validate = validation, _this = this, _apps = App;
			var content = "", actions = "", status = "";
			var ajax = sys.ajax('../assets/harmony/Process.php?get-allApplicant',"");
			ajax.success(function(data){
				var arrInactive = [], arrActive = [];
				if(data != ""){
					var data = JSON.parse(data);
					sys.sortResults(data,12,false);
					$.each(data,function(i,v){
						if(v[12] == 0)
				            arrInactive.push(v);					
						else
				            arrActive.push(v);
					});

					if(arrActive.length>0){
						var content = "<table class='table table-bordered' id='table_activeApplicant'>"+
									"	<thead>"+
									"		<tr>"+
									"			<th width='15%'></th>"+
									"			<th width='75%'>Name</th>"+
									"			<th width='5%'></th>"+
									"			<th width='5%'></th>"+
									"		</tr>"+
									"	</thead>"+
									"</table>";
						$("#active_applicants .card-content").html(content);

						$('#table_activeApplicant').DataTable( {
						    data: arrActive,
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
												picture = sys.get_apr(full[6]);
										}

					            		var details = '<img class = "responsive-img alt="image" src="'+picture+'" class = "responsive-img">';
					                	return details;
					         	   }
					        	},
					        	{data: "",
					            	render: function ( data, type, full ){
					            		var details = full[2]+" "+full[3]+" "+full[1];
					                	return details;
					            	}
					        	},
					        	{data: "",
					            	render: function ( data, type, full ){
					            		var details = "<a data-id='"+full[0]+"' data-cmd='info_ActiveApplicant' class='btn btn-success btn-xs btn-block'>Details</a>";
					                	return details;
					            	}
					        	},
					        	{data: "",
					            	render: function ( data, type, full ){
					            		var details = "<a href ='#cmd=index;content=applications' ><i class='small material-icons'>more_vert</i></a>";
					                	return details;
					            	}
					        	},
					    	]
						});

					}

					if(arrInactive.length>0){
						var content = "";

						$.each(arrInactive,function(i,v){
							content += "<tr>"+
										"	<td class='text-left' width='80%'>"+(i+1)+". "+v[1]+", "+v[2]+" "+v[3]+"</td>"+
										"	<td width='20%'><a data-id='"+v[0]+"' data-cmd='info_InactiveApplicant' class='btn btn-danger btn-xs btn-block'>Details</a></td>"+
										"</tr>";
						});

							content = "<table class='table table-bordered' id='table_inactiveApplicant'>"+content+"</table>";

						$("#inactive_applicants .card-content").html(content);
					}
					else{
						$("#inactive_applicants .card-content").html("<h2>All caught up. </h2><h4>No Inactive request for applicant's account approval</h4>");
					}	

					if(arrInactive.length>0){
						var content = "";

						$.each(arrInactive,function(i,v){
							content += "<tr>"+
										"	<td class='text-left' width='80%'>"+(i+1)+". "+v[1]+", "+v[2]+" "+v[3]+"</td>"+
										"	<td width='20%'><a data-id='"+v[0]+"' data-cmd='info_InactiveApplicant' class='btn btn-danger btn-xs btn-block'>Details</a></td>"+
										"</tr>";
						});

							content = "<table class='table table-bordered' id='table_inactiveApplicant'>"+content+"</table>";

						$("#inactive_applicants .card-content").html(content);
					}
					else{
						$("#inactive_applicants .card-content").html("<h2>All caught up. </h2><h4>No Inactive request for applicant's account approval</h4>");
					}


					$("a").click(function(){
							var cmd = $(this).data('cmd');
							var id = $(this).data('id');

						if(cmd == 'info_ActiveApplicant'){
							var data = sys.searchJSON(arrActive,0,id);
							var picture = "../assets/img/profile_avatar.jpg", description = "No description yet.", resume = "No resume uploaded yet.";

							if(data[0][6] != ""){
								var imageData = data[0][6].split('.');
								if(imageData[imageData.length-1]!='apr')
									picture = "../assets/img/"+data[0][6];					
								else
									picture = sys.get_apr(data[0][6]);
							}


							if(data[0][8] != "")
								description = data[0][8];    			
							if(data[0][9] != "")
								var resume = "<a href='../assets/files/"+data[0][9]+"' class='btn btn-xs btn-white'>Download and Read</a>";    			

							var content = "<div class='col-md-12' style='float:none !important;'><table class='table table-bordered card-content'>"+
										    "	<tr><td width='20%'>Name: </td><td width='80%'>"+data[0][1]+", "+data[0][2]+" "+data[0][3]+"</td><td></tr>"+
										    "	<tr><td>Description: </td><td>"+data[0][8]+"</td></tr>"+
										    "	<tr><td>Gender: </td><td>"+data[0][7]+"</td></tr>"+
										    "	<tr><td>Contact Number: </td><td>"+data[0][5]+"</td></tr>"+
										    "	<tr><td>Address: </td><td>"+data[0][4]+"</td></tr>"+
										    "	<tr><td>Email Address: </td><td>"+data[0][10]+"</td></tr>"+
										    "	<tr><td>Status: </td><td>"+data[0][12]+"</td></tr>"+
										    "	<tr><td>Resume: </td><td>"+resume+"</td></tr>"+
										  	"</table>"+
										  	"	<div class='col-md-6'><a class='btn btn-white btn-xs btn-block' data-cmd='action_inactivateApplicant' data-id='"+data[0][0]+"'>Deactivate</a></div>"+
							   			"</div>";
								$("#applicant .card-content").html(content);

							$("a[data-cmd='action_inactivateApplicant']").click(function(){
								var id = $(this).data('id');
								sys.confim("Dectivate this Applicant?",function(){
									var ajax = sys.ajax('../assets/harmony/Process.php?set-inactivateApplicant',id);
									ajax.success(function(data){
										console.log(data);
										if(data == 1){
											swal("Successful!", "Applicant has been deactivated.", "success");
											sys.clearForm();
											_this.list_applicant();
											console.log(id);
										}
										else{
											swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
											console.log(data);
										}
									});
								});
							});			
						}
						if(cmd == 'info_InactiveApplicant'){
							var data = sys.searchJSON(arrInactive,0,id);
							var picture = "../assets/img/profile_avatar.jpg", description = "No description yet.", resume = "No resume uploaded yet.";

							if(data[0][6] != ""){
								var imageData = data[0][6].split('.');
								if(imageData[imageData.length-1]!='apr')
									picture = "../assets/img/"+data[0][6];					
								else
									picture = sys.get_apr(data[0][6]);
							}


							if(data[0][8] != "")
								description = data[0][8];    			
							if(data[0][9] != "")
								var resume = "<a href='../assets/files/"+data[0][9]+"' class='btn btn-xs btn-white'>Download and Read</a>";    			

							var content = "<div class='col-md-12' style='float:none !important;'><table class='table table-bordered card-content'>"+
										    "	<tr><td width='20%'>Name: </td><td width='80%'>"+data[0][1]+", "+data[0][2]+" "+data[0][3]+"</td><td></tr>"+
										    "	<tr><td>Description: </td><td>"+data[0][8]+"</td></tr>"+
										    "	<tr><td>Gender: </td><td>"+data[0][7]+"</td></tr>"+
										    "	<tr><td>Contact Number: </td><td>"+data[0][5]+"</td></tr>"+
										    "	<tr><td>Address: </td><td>"+data[0][4]+"</td></tr>"+
										    "	<tr><td>Email Address: </td><td>"+data[0][10]+"</td></tr>"+
										    "	<tr><td>Status: </td><td>"+data[0][12]+"</td></tr>"+
										    "	<tr><td>Resume: </td><td>"+resume+"</td></tr>"+
										  	"</table>"+
										  	"	<div class='col-md-6'><a class='btn btn-white btn-xs btn-block' data-cmd='action_activateApplicant' data-id='"+data[0][0]+"'>Activate</a></div>"+
							   			"</div>";
								$("#applicant .card-content").html(content);

							$("a[data-cmd='action_activateApplicant']").click(function(){
								var id = $(this).data('id');
								sys.confim("Activate this Applicant?",function(){
									var ajax = sys.ajax('../assets/harmony/Process.php?set-activateApplicant',id);
									ajax.success(function(data){
										console.log(data);
										if(data == 1){
											swal("Successful!", "Applicant has been activated.", "success");
											sys.clearForm();
											_this.list_applicant();
											console.log(id);
										}
										else{
											swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
											console.log(data);
										}
									});
								});
							});			
						}
						
					});
				}
			});
	    },
	    addApplicant: function(){
			$("#add_applicant").on('click',function(){
				var data = system.xml("pages.xml");
				$(data.responseText).find("addApplicant").each(function(i,content){
					$("#modal .modal-content").html(content);
					$('#modal').modal('open');				

					$("#field_password").on('focus',function(){
						$("#note_password").removeClass('zoomOut hidden').addClass("zoomIn");
					}).on('blur',function(){
						$("#note_password").removeClass('zoomIn').addClass('zoomOut hidden');
					})

					$("#form_addApplicant").validate({
					 	rules: {
					        field_fname: {required: true,maxlength: 50},
					        field_mname: {required: true,maxlength: 50},
					        field_lname: {required: true,maxlength: 50},
					        field_description: {required: true,maxlength: 500},
					        field_gender: {required: true,maxlength: 50},
					        field_phone: {required: true,maxlength: 50},
					        field_address: {required: true,maxlength: 100},
					        field_email: {required: true,maxlength: 100,checkEmail:true},
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
									var text = "<h1>Congratulations</h1>, you are now registered. You can login using <u>"+_form[2]['value']+"</u> as you username and <u>"+
									_form[5]['value']+"</u> as your password. <a href='http://localhost/kaboomRewards/login.html'>Just follow this link</a>";
									var data = system.send_mail('rufo.gabrillo@gmail.com,info@rnrdigitalconsultancy.com','Employer Registration',text);
									if(data.responseText != ""){
										Materialize.toast('Saved.',4000);
										$("#modal") .close_modal('hide');
										system.clearForm();
										App.handleLoadPage("#cmd=index;content=employers");
									}
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
		application:function(){
    		var data = JSON.parse(system.get_account());
			var ajax = system.ajax('../assets/harmony/Process.php?do-getApplications',data[0][0]);
			var ajaxData = JSON.parse(ajax.responseText);
			var content = "";
			console.log(ajaxData);
			// $.each(ajaxData,function(i,v){
			// 	console.log(v);
			// 	if(v[2][5] != "null"){
			// 		var skills = JSON.parse(v[2][5]), $skills = "";
			// 		$.each(skills,function(a,b){
			// 			$skills += "<span class='label label-defualt'style='margin-right: 5px;'>"+b+"</span>";
			// 		});
			// 	}
			// 	content += "    <div class='timeline-item'>"+
			// 			"        <div class='row'>"+
			// 			"            <div class='col-lg-3 date'>"+
			// 			"                <i class='fa fa-briefcase'></i>"+v[0][4]+"<br><small class='text-navy prettydate'>"+v[0][4]+"</small>"+
			// 			"            </div>"+
			// 			"            <div class='col-lg-10 content no-top-border'>"+
			// 			"                <p class='m-b-xs'><a data-toggle='collapse' data-parent='#accordion' href='#"+v[0][0]+"' aria-expanded='false' class='collapsed btn btn-white btn-xs pull-right'>Show Employer's Information</a>"+
			// 			"                <p class='m-b-xs'><h3><strong>Job Title:</strong> "+v[2][4]+"</h3></p>"+
			// 			"                <p class='m-b-xs'><strong>Skills:</strong> "+$skills+"</p>"+
			// 			"                <p class='m-b-xs'><strong>Job Description:</strong> "+v[2][2]+"</p>"+
			// 			"                <div id='"+v[0][0]+"' class='panel-collapse collapse' aria-expanded='false' style='height: 0px;'>"+
			// 			"                	<div class='panel-body'>"+
			// 			"                		<div class='hr-line-dashed'></div>"+
			// 			"                		<p class='m-b-xs'><strong>Company:</strong> "+v[1][5]+"</p>"+
			// 			"                		<p class='m-b-xs'><strong>Office:</strong> "+v[1][3]+"</p>"+
			// 			"                		<p class='m-b-xs'><strong>Email:</strong> "+v[1][10]+"</p>"+
			// 			"                		<p class='m-b-xs'><strong>Company Description:</strong> "+v[1][6]+"</p>"+
			// 			"                		<div class='hr-line-dashed'></div>"+
			// 			"                	</div>"+
			// 			"                </div>"+
			// 			"                <p class='m-b-xs'><strong>Your Application:</strong><br/><div class='well'>"+v[0][3]+"</div></p>"+
			// 			"            </div>"+
			// 			"        </div>"+
			// 			"    </div>";
			// });
			// content = "<div class='card-content inspinia-timeline'>"+content+"</div>";
			// $("#jobapplications").html(content);
			// $(".prettydate").prettydate({
			//     dateFormat: "YYYY-MM-DD hh:mm:ss"
			// });
        },
		
	}

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
			var ajax = system.ajax('../assets/img/'+image,'');
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
							            	details += "<img alt='image' class='circle' src='"+mainProcess.get_apr('assets/img/'+data_applicants[2])+"' style='margin-right: 5px;'>";
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