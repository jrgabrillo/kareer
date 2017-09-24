var admin = function () {
	"use strict";
	return {
		ini:function(){
			var data = admin.check_access();
			if(data != 0){
				admin.display();
				employer.list();
				applicant.list();
				admin.jobposting();
				admin.update_picture();
			}
		},
		display:function(){
			var ajax = system.html('../assets/harmony/Process.php?get-account',"");
			var data = ajax.responseText;
			console.log(data);
			var picture = "../assets/img/profile_avatar.jpg", level = "";
			data = JSON.parse(data);
			if(data[0][3] != ""){
				var imageData = data[0][3].split('.');
				if(imageData[imageData.length-1]!='apr'){
					console.log(imageData.length);
					picture = "";
					picture = "../assets/img/"+data[0][3];

					
				}
				else{
					picture = system.get_apr(data[0][3]);					
					picture = "";					
				}
			}
			
			if(data[0][5] == 1)
				level = "Administrator";

    		$("#text_givenName span").html(data[0][1]);

    		$("#text_familyName span").html(data[0][2]);

    		$("#text_userName span").html(data[0][4]);

			//picture
			// $(".profile-element span img").attr({"src":picture});
			// $("#ajax-content img").prop({"src":picture});
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
				else if(data == "logout"){
					var ajax = system.ajax('../assets/harmony/Process.php?kill-session',"");
					admin.check_access();
				}
				else{
					//console.log('dashboard');
				}
			});
		},
		update_data:function(){
    		var data = sys.get_account();
    		var admindata = JSON.parse(data);
    		console.log(admindata);

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
					var ajax = system.ajax('../assets/harmony/Process.php?do-updateData',data);
					ajax.success(function(data){
						if(data == 1){
							swal("Successful!", "", "success");
							App.handleLoadPage('#!');
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
		update_picture:function(){
    		var data = system.get_account();
    		data = JSON.parse(data);

			var picture = "../assets/img/profile avatar.jpg";
			if(data[0][3] != ""){
				var imageData = data[0][3].split('.');
				if(imageData[imageData.length-1]!='apr')
					picture = "../assets/img/"+data[0][3];					
				else
					picture = system.get_apr(data[0][3]);
			}

	    	$("a[data-cmd='update_picture']").click(function(){
	    		$("#profile_picture1").addClass('hidden');
	    		$("#profile_picture2").removeClass('hidden');

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
					    					var ajax = system.ajax('../assets/harmony/Process.php?update-image',[data[0][0],'administrator',$image.cropper("getDataURL")]);
											ajax.success(function(data){
												if(data == 1){
													swal("Successful!", "Employer's picture has been updated.", "success");
													system.close_modal();
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
		logout:function(){
			$("a[ data-cmd='logout']").on("click",function(){
				var ajax = system.html('../assets/harmony/Process.php?kill-session');
				ajax.done(function(data){
					console.log(data);
					if(data == 1){
				    	$(location).attr('href','../');			
					}
					else{
						swal('Cannot process request.',4000);
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
      	update_data:function(){
    		var data = system.get_account();
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
					var ajax = system.ajax('../assets/harmony/Process.php?do-updateData',data);
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
			var ajax = system.ajax('../assets/harmony/Process.php?do-getAllJobsPosts',"");
			var ajaxData = JSON.parse(ajax.responseText);			
			console.log(ajaxData);
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
					            	console.log(full);
									if(full[1].length>0){
										$.each(full[1],function(i,v){
											console.log(i);
											console.log(v);
											var data_applicants = v[2];

											if(i<4){
								            	details += "<img alt='image' class='circle' src='"+system.get_apr(data_applicants)+"' style='margin-right: 10px;'>";
											}
											else{
												var count = full[1].length-i;
												// console.log(i);
												if(i>13)
													count = 9+"+";

								            	details += "<span class ='new badge blue' >"+count+"</span>";
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
				});
        },       
   //      job:function(id){
			// var ajax = system.ajax('../assets/harmony/Process.php?get-job',id[1]);
			// ajax.done(function(data){
			// 	data = JSON.parse(data);
			// 	console.log(data);
			// 	var applicant = "No Applicant.", vacancy_id = data[0][0][0];
			// 	var applicationexpiry = new Date(data[0][0][3]), now = new Date();
			// 	var status = "<span class='label label-primary'>Active</span>";
			// 	var application_content = "";

			// 	if(applicationexpiry<now){
			// 		status = "<span class='label label-danger'>Inactive</span>";
			// 	}

			// 	if(data[0][1].length > 0){
			// 		$.each(data[0][1],function(i,v){
			// 			var data_applicants = JSON.parse(v[2]);
			// 			var actions = "";

			// 			if(v[5] != ""){
			// 				if(v[5] != "0"){
			// 					var applicationstatus = JSON.parse(v[5]);
			// 					actions = "<div class='alert alert-info' style='padding: 5px;'>"+applicationstatus[1]+"<br/><small class='prettydate'>"+applicationstatus[0]+"</small></div>";
			// 				}
			// 				else{
			// 					actions = "<div class='alert alert-danger' style='padding: 5px;'>Declined</div>";
			// 				}
			// 			}

			// 			application_content += "<div class='feed-element'>"+
			// 									"    <a href='#' class='left'>"+
			// 									"        <img alt='image' class='circle' src='"+system.get_apr(data_applicants[2])+"'>"+
			// 									"    </a>"+
			// 									"    <div class='media-body'>"+
			// 									"       <small class='pull-right prettydate'>"+v[4]+"</small>"+
			// 									"       <strong>"+data_applicants[3][0]+", "+data_applicants[3][1]+" "+data_applicants[3][2]+"</strong><br>"+
			// 									"       <small class='text-muted'>"+v[4]+"</small>"+
			// 									"       <div class='well'>"+v[3]+"</div>"+
			// 									"		<div class='actions'>"+actions+"</div><br/>"+
			// 									"		<div id='"+v[0]+"' class='panel-collapse collapse' aria-expanded='false' style='height: 0px;'>"+
			// 									"		    <textarea class='form-control input-sm employer_interview' placeholder='Say something about your invitation for interview' row='3' style='width:100%;max-width:100%;'></textarea>"+
			// 									"		    <span class='pull-right desc_stringCounter'></span>"+
			// 									"		    <form role='form' class='form-inline form_interview'>"+
			// 									"		        <input name='field_interview' type='text' placeholder='Description' class='form-control input-sm hidden'><br/>"+
			// 									"		        <a data-id='"+v[0]+"' data-cmd='interview' class='btn btn-sm btn-success btn-xs disabled'>Submit</a>"+
			// 									"		    </form>"+
			// 									"		</div>"+
			// 									"		</div>"+											
			// 									"    </div>"+
			// 									"</div>";
			// 		});
			// 		applicant = data[0][1].length;
			// 	}
			// 	application_content = "<div class='feed-activity-list'>"+application_content+"</div>";
			// 	$('#data_info').removeClass('hidden').html(application_content);

			// 	$('#job-post #txt_jobtitle').html(data[0][0][4]);
			// 	$('#job-post #txt_jobstatus').html(status);
			// 	$('#job-post #txt_jobexpiry').html(data[0][0][3]);
			// 	$('#job-post #txt_jobdate').html(data[0][0][9]);
			// 	$('#job-post #txt_jobdescription').html(data[0][0][2]);
			// 	$('#job-post #txt_jobapplicant').html(applicant);

			// 	$(".prettydate").prettydate({
			// 	    dateFormat: "YYYY-MM-DD hh:mm:ss"
			// 	});

	  //       	$("a[data-cmd='toggle-interview']").click(function(){
	  //       		var data = $(this).data('id');
		 //        	$("#"+data+" textarea").keyup(function(){
		 //                system.StringCounter($(this).val(),$("#"+data+" span.desc_stringCounter"),800);
		 //                if($(this).val().length > 800){
		 //                	$("#"+data+" a[data-cmd='interview']").addClass('disabled');
		 //        			system.errorNotif('Notice','Description must only contain 800 characters.');
		 //                }
		 //                else{
		 //                	$("#"+data+" a[data-cmd='interview']").removeClass('disabled');
		 //                }
		 //        		$("#"+data+" input[name='field_interview']").val($(this).val());  
		 //        	});

			// 		$("#"+data+" a[data-cmd='interview']").click(function(){
			// 			var content = [$(this).data('id'),$("#"+data+" input[name='field_interview']").val()];
			// 			var ajax = system.ajax('../assets/harmony/Process.php?do-inviteInterview',content);
			// 			var data = JSON.parse(ajax.responseText);
			// 			ajax.success(function(data){
			// 				if(data == 1){
			// 					swal("Successful!", "", "success");
			// 					system.close_modal();
			// 					App.handleLoadPage(window.location.hash);
			// 				}
			// 				else{
			// 					swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
			// 					console.log(data);
			// 				}
			// 			});
			// 			});
	  //       	});

			// 	$("a[data-cmd]").click(function(){
			// 		var data = [$(this).data('cmd'),$(this).data('id')];
			// 		if(data[0] == 'decline'){
			// 		    swal({
			// 		        title: "Are you sure you want to decline this applicant?",
			// 		        text: "",
			// 		        type: "warning",
			// 		        showCancelButton: true,
			// 		        confirmButtonColor: "#DD9B55",
			// 		        confirmButtonText: "Confirm",
			// 		        closeOnConfirm: false
			// 		    }, function () {
			// 				var ajax = system.ajax('../assets/harmony/Process.php?do-decline',data[1]);
			// 				var data = JSON.parse(ajax.responseText);
			// 				ajax.success(function(data){
			// 					if(data == 1){
			// 						swal("Successful!", "", "success");
			// 						system.close_modal();
			// 						App.handleLoadPage(window.location.hash);
			// 					}
			// 					else{
			// 						swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
			// 						console.log(data);
			// 					}
			// 				});
			// 		    });
			// 		}
			// 	});
			// })
   //      }
   		getByID:function(id){
    		console.log(id);
			var ajax = system.ajax('../assets/harmony/Process.php?get-jobByID',id[1]);
			var ajaxData = JSON.parse(ajax.responseText);
			console.log(ajaxData);
			var applicant = "No Applicant.", vacancy_id = ajaxData[0][0][0];
			var applicationexpiry = new Date(ajaxData[0][0][3]), now = new Date();
			var status = "<span>Active</span>";
			var application_content = "";

			if(applicationexpiry<now){
				status = "<span>Inactive</span>";
			}
			if(applicationexpiry<now){
				status = "<span>Inactive</span>";
			}

			if(ajaxData[0][1].length > 0){
				$.each(ajaxData[0][1],function(i,v){
					var data_applicants = JSON.parse(v[2]);
					var actions = "	<a class='btn btn-xs btn-danger collapsed' data-toggle='collapse' data-parent='#accordion' data-cmd='toggle-interview' data-id='"+v[0]+"' href='#"+v[0]+"' aria-expanded='false'>Invite for interview </a>"+
								  "	<a class='btn btn-xs btn-white' data-cmd='decline' data-id='"+v[0]+"'>Decline</a>";
					if(v[5] != ""){
						if(v[5] != "0"){
							var applicationstatus = JSON.parse(v[5]);
							actions = "<div style='padding: 5px;'>"+applicationstatus[1]+"<br/><small class='prettydate'>"+applicationstatus[0]+"</small></div>";
						}
						else{
							actions = "<div style='padding: 5px;'>Declined</div>";
						}
					}

					application_content += "<ul class='collection'>"+
											"    <li href='#' class='collection-item avatar'>"+
											"	 <a>											"+
											"        <img alt='image' class='circle' src='"+system.get_apr(data_applicants[2])+"'>"+
											"    </a>"+
											"    <span class='row'>"+
											"       <small class='col s12 m6-left prettydate'>"+v[4]+"</small>"+
											"       <strong>"+data_applicants[3][0]+", "+data_applicants[3][1]+" "+data_applicants[3][2]+"</strong><br>"+
											"       <small class='disabled'>"+v[4]+"</small>"+
											"       <div class='well'>"+v[3]+"</div><br/>"+
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
											"	</span>	"+											
											"    </li>"+
											"</ul>";

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
				var ajax = system.ajax('../assets/harmony/Process.php?do-savejob',senddata);
				var ajaxData = JSON.parse(ajax.responseText);
				ajax.success(function(data){
					if(data == 1){
						swal("Successful!", "Your picture has been updated.", "success");
						system.close_modal();
						App.handleLoadPage(window.location.hash);
					}
					else{
						swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
						// console.log(data);
					}
				});
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
							// console.log(data);
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
						var ajax = system.ajax('../assets/harmony/Process.php?do-decline',data[1]);
						var ajaxData = JSON.parse(ajax.responseText);
						ajax.success(function(data){
							if(data == 1){
								swal("Successful!", "", "success");
								system.close_modal();
								App.handleLoadPage(window.location.hash);
							}
							else{
								swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
								// console.log(data);
							}
						});
				    });
				}
			});
        },
              
    };
}();

// var jobs = function(){
// 	"use strict";
// 	return {
// 	}
// }();

var employer = function(){
	"use strict";
	return {
		list: function(){
			var sys = system, validate = validation, _this = this, _apps = App;
			var content = "", actions = "", status = "";
			var ajax = sys.ajax('../assets/harmony/Process.php?get-allEmployer',"");
			ajax.success(function(data){
				// console.log(data);
				var arrApproved = [], arrDeclined = [];
				if(data != ""){
					var data = JSON.parse(data);
					sys.sortResults(data,13,false);
					$.each(data,function(i,v){
						if(v[12] == 0)
				            arrDeclined.push(v);					
						// else if(v[12] == 2)
				  //           arrDeclined.push(v);					
						else
				            arrApproved.push(v);
					});

					if(arrApproved.length>0){
					
						var content = "<table class='table table-bordered' id='table_approvedEmployers'>"+
										"	<thead>"+
										"		<tr>"+
										"			<th width='5%'></th>"+
										"			<th width='50%'>Name</th>"+
										"			<th width='15%'></th>"+
										"		</tr>"+
										"	</thead>"+
										"</table>";

						$("#approved_employers .card-content").html(content);

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
												picture = sys.get_apr(full[9]);					
											}
										}

						            	var details = '<img alt="image" src="'+picture+'" class = "responsive-img" >';
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
						            	var details = "<a data-id='"+full[0]+"' data-cmd='options_approvedEmployer' class='btn btn-success btn-xs btn-block'>Details</a>";
						                return details;
						            }
						        },
						        
						    ]
						});
						
					}
					

					// if(arrPending.length>0){
					// 	var content = "";

					// 	$.each(arrPending,function(i,v){
					// 		content += "<tr>"+
					// 					"	<td class='text-left' width='80%'>"+(i+1)+". "+v[5]+"</td>"+
					// 					"	<td width='20%'><a data-id='"+v[0]+"' data-cmd='options_pendingEmployer' class='btn btn-danger btn-xs btn-block'>Details</a></td>"+
					// 					"</tr>";
					// 	});

					// 	content = "<table class='table table-bordered' id='table_pendingEmployers'>"+content+"</table>";

					// 	$("#pending_employers .card-content").html(content);
					// }
					// else{
					// 	$("#pending_employers .card-content").html("<h2>All caught up. </h2><h4>No pending request for employer's account approval</h4>");
					// }
					if(arrDeclined.length>0){
						var content = "";

						$.each(arrDeclined,function(i,v){
							content += "<tr>"+
										"	<td class='text-left' width='80%'>"+(i+1)+". "+v[5]+"</td>"+
										"	<td width='20%'><a data-id='"+v[0]+"' data-cmd='options_declinedEmployer' class='btn btn-danger btn-xs btn-block'>Details</a></td>"+
										"</tr>";
						});

						content = "<table class='table table-bordered' id='table_declinedEmployers'>"+content+"</table>";

						$("#declined_employers .card-content").html(content);
					}
					else{
						$("#declined_employers .card-content").html("<h2>All caught up. </h2><h4>No declined request for employer's account approval</h4>");
					}
					
					$("a").click(function(){
						var cmd = $(this).data('cmd');
						var id = $(this).data('id');

						// if(cmd == 'options_pendingEmployer'){
							
						// 	var data = sys.searchJSON(arrPending,0,id);
						// 	var content = "<div class='col-md-offset-3 col-md-6' style='float:none !important;'>"+
						// 					"	<table class='table table-bordered card-content'>"+
						// 					"		   <tr><td width='20%'>Company: </td><td width='80%'>"+data[0][5]+"</td></tr>"+
						// 					"		   <tr><td>Description: </td><td>"+data[0][6]+"</td></tr>"+
						// 					"		   <tr><td>BIR: </td><td>"+data[0][7]+"</td></tr>"+
						// 					"		   <tr><td>DTI: </td><td>"+data[0][8]+"</td></tr>"+
						// 					"		   <tr><td>Owner: </td><td>"+data[0][2]+" "+data[0][1]+"</td></tr>"+
						// 					"		   <tr><td>Contact Number: </td><td>"+data[0][4]+"</td></tr>"+
						// 					"		   <tr><td>Office Address: </td><td>"+data[0][3]+"</td></tr>"+
						// 					"		   <tr><td>Email Address: </td><td>"+data[0][10]+"</td></tr>"+
						// 					"		   <tr><td>Status: </td><td>"+data[0][12]+"</td></tr>"+
						// 					"	</table>"+
						// 					"	<div class='col-md-6'><a class='btn btn-primary btn-xs btn-block' data-cmd='action_acceptPending' data-id='"+data[0][0]+"'>Accept</a></div>"+
						// 					"	<div class='col-md-6'><a class='btn btn-white btn-xs btn-block' data-cmd='action_declinePending' data-id='"+data[0][0]+"'>Decline</a></div>"+
						// 					"</div>";
						// 	$("#employer .card-content").html(content);

						// 	$("a[data-cmd='action_acceptPending']").click(function(){
						// 		var id = $(this).data('id');
						// 		sys.confim("Accept this Employer?",function(){
						// 			var ajax = sys.ajax('../assets/harmony/Process.php?set-acceptPendingEmployer',id);
						// 			ajax.success(function(data){
						// 				console.log(data);
						// 				if(data == 1){
								        	
						// 					swal("Successful!", "Employer has been declined.", "success");
						// 					sys.clearForm();
						// 					_this.list();
						// 				}
						// 				else{
						// 					swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
						// 					console.log(data);
						// 				}
						// 			});
						// 		});
						// 	});
						// 	$("a[data-cmd='action_declinePending']").click(function(){
						// 		var id = $(this).data('id');
						// 		sys.confim("Decline this Employer?",function(){
						// 			var ajax = sys.ajax('../assets/harmony/Process.php?set-declinePendingEmployer',id);
						// 			ajax.success(function(data){
						// 				console.log(data);
						// 				if(data == 1){
								        	
						// 					swal("Successful!", "Employer has been declined.", "success");
						// 					sys.clearForm();
						// 					_this.list();
						// 				}
						// 				else{
						// 					swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
						// 					console.log(data);
						// 				}
						// 			});
						// 		});
						// 	});
						// }

						if(cmd == 'options_declinedEmployer'){
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

							$("#employer .card-content").html(content);
							
							$("a[data-cmd='action_acceptPending']").click(function(){
								var id = $(this).data('id');
								sys.confim("Accept this Employer?",function(){
									var ajax = sys.ajax('../assets/harmony/Process.php?set-acceptPendingEmployer',id);
									ajax.success(function(data){
										console.log(data);
										if(data == 1){
								        	
											swal("Successful!", "Employer has been declined.", "success");
											sys.clearForm();
											_this.list();
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

						else if(cmd == 'options_approvedEmployer'){
							var data = sys.searchJSON(arrApproved,0,id);
							var content = "<div class='col-md-12' style='float:none !important;'><table class='table table-bordered card-content'>"+
										    "	<tr><td><strong>Business</strong></td></tr>"+
										    "	<tr><td width='20%'>Company: </td><td width='80%'>"+data[0][5]+"</td>"+
										    "   <td><a data-cmd='updateEmployer' data-value='"+data[0][5]+"' data-name='"+data[0][5]+"' data-node='"+data[0][0]+"' data-prop='CompanyName' class='tooltipped btn-floating waves-effect black-text no-shadow white right material-icons' data-position='left' data-delay='50' data-tooltip='Update Company'>"+
											"	<i class='material-icons'></i></a>"+
											"	</td></tr>"+
										    "	<tr><td>Description: </td><td>"+data[0][6]+"</td>"+
										    "	<td><a data-cmd='updateEmployer' data-value='"+data[0][6]+"' data-name='"+data[0][6]+"' data-node='"+data[0][0]+"' data-prop='Description' class='tooltipped btn-floating waves-effect black-text no-shadow white right material-icons' data-position='left' data-delay='50' data-tooltip='Update Description'>"+
											"	<i class='material-icons'></i></a>"+
											"	</td></tr>"+
										    "	<tr><td>BIR: </td><td>"+data[0][7]+"</td>"+
										    "	<td><a data-cmd='updateEmployer' data-value='"+data[0][7]+"' data-name='"+data[0][7]+"' data-node='"+data[0][0]+"' data-prop='BIR' class='tooltipped btn-floating waves-effect black-text no-shadow white right material-icons' data-position='left' data-delay='50' data-tooltip='Update BIR'>"+
											"	<i class='material-icons'></i></a>"+
											"	</td></tr>"+
										    "	<tr><td>DTI: </td><td>"+data[0][8]+"</td>"+
										    "	<td><a data-cmd='updateEmployer' data-value='"+data[0][8]+"' data-name='"+data[0][8]+"' data-node='"+data[0][0]+"' data-prop='DTI' class='tooltipped btn-floating waves-effect black-text no-shadow white right material-icons' data-position='left' data-delay='50' data-tooltip='Update DTI'>"+
											"	<i class='material-icons'></i></a>"+
											"	</td></tr>"+
											"	<tr><td><strong>Owner</strong></td></tr>"+
										    "	<tr><td>First Name: </td><td>"+data[0][2]+"</td>"+
										    "	<td><a data-cmd='updateEmployer' data-value='"+data[0][2]+"' data-name='"+data[0][2]+"' data-node='"+data[0][0]+"' data-prop='FirstName' class='tooltipped btn-floating waves-effect black-text no-shadow white right material-icons' data-position='left' data-delay='50' data-tooltip='Update FirstName'>"+
											"	<i class='material-icons'></i></a>"+
											"	</td></tr>"+
											 "	<tr><td>Last Name: </td><td>"+data[0][1]+"</td>"+
										    "	<td><a data-cmd='updateEmployer' data-value='"+data[0][1]+"' data-name='"+data[0][1]+"' data-node='"+data[0][0]+"' data-prop='LastName' class='tooltipped btn-floating waves-effect black-text no-shadow white right material-icons' data-position='left' data-delay='50' data-tooltip='Update LastName'>"+
											"	<i class='material-icons'></i></a>"+
											"	</td></tr>"+
										    "	<tr><td>Contact Number: </td><td>"+data[0][4]+"</td>"+
										    "	<td><a data-cmd='updateEmployer' data-value='"+data[0][4]+"' data-name='"+data[0][4]+"' data-node='"+data[0][0]+"' data-prop='ContactNo' class='tooltipped btn-floating waves-effect black-text no-shadow white right material-icons' data-position='left' data-delay='50' data-tooltip='Update ContactNo'>"+
											"	<i class='material-icons'></i></a>"+
											"	</td></tr>"+
										    "	<tr><td>Office Address: </td><td>"+data[0][3]+"</td>"+
										    "	<td><a data-cmd='updateEmployer' data-value='"+data[0][3]+"' data-name='"+data[0][3]+"' data-node='"+data[0][0]+"' data-prop='Address' class='tooltipped btn-floating waves-effect black-text no-shadow white right material-icons' data-position='left' data-delay='50' data-tooltip='Update Address'>"+
											"	<i class='material-icons'></i></a>"+
											"	</td></tr>"+
										    "	<tr><td>Email Address: </td><td>"+data[0][10]+"</td>"+
										    "	<td><a data-cmd='updateEmployer' data-value='"+data[0][10]+"' data-name='"+data[0][10]+"' data-node='"+data[0][0]+"' data-prop='Email' class='tooltipped btn-floating waves-effect black-text no-shadow white right material-icons' data-position='left' data-delay='50' data-tooltip='Update Email'>"+
											"	<i class='material-icons'></i></a>"+
											"	</td></tr>"+
										    "	<tr><td>Status: </td><td>"+data[0][12]+"</td></tr>"+
										  	"</table>"+

											"	<div class='col-md-6'><a class='btn btn-white btn-xs btn-block' data-cmd='action_declinePending' data-id='"+data[0][0]+"'>Decline</a></div>"+
										  "</div>";

							$("#employer .card-content").html(content);
							
							$("a[data-cmd='action_declinePending']").click(function(){
								var id = $(this).data('id');
								sys.confim("Decline this Employer?",function(){
									var ajax = sys.ajax('../assets/harmony/Process.php?set-declinePendingEmployer',id);
									ajax.success(function(data){
										console.log(data);
										if(data == 1){
											swal("Successful!", "Employer has been declined.", "success");
											sys.clearForm();
											_this.list();
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

						else{
						}
							employer.update();
					});
				}
			});	
	    },
 		update:function(){
			$("a[data-cmd='updateEmployer']").on('click',function(){
				var data = $(this).data();
				var id = data.node;
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
						  console.log(data.node);
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
								var ajax = system.ajax('../assets/harmony/Process.php?update-employer',[id,_form]);
								ajax.done(function(ajax){
									console.log(ajax)
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('Name updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employers");
									}
									else{
										Materialize.toast('Cannot process request.',4000);
									}
								});
							}
					    }
					}); 
				}
				else if(data.prop == "Description"){
					$('#modal').modal('open');			
					$("#form_update").validate({
					    rules: {
					        field_Description: {required: true,maxlength: 500},
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
								var ajax = system.ajax('../assets/harmony/Process.php?update-employer',[id,_form]);
								ajax.done(function(ajax){
									console.log(ajax)
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('Description updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employers");
									}
									else{
										Materialize.toast('Cannot process request.',4000);
									}
								});
							}
					    }
					}); 
				}			
				else if(data.prop == "BIR"){
					$('#modal').modal('open');			
					$("#form_update").validate({
					    rules: {
					        field_BIR: {required: true,maxlength: 500},
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
								var ajax = system.ajax('../assets/harmony/Process.php?update-employer',[id,_form]);
								ajax.done(function(ajax){
									console.log(ajax)
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('BIR updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employers");
									}
									else{
										Materialize.toast('Cannot process request.',4000);
									}
								});
							}
					    }
					}); 
				}
				else if(data.prop == "DTI"){
					$('#modal').modal('open');			
					$("#form_update").validate({
					    rules: {
					        field_DTI: {required: true,maxlength: 500},
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
								var ajax = system.ajax('../assets/harmony/Process.php?update-employer',[id,_form]);
								ajax.done(function(ajax){
									console.log(ajax)
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('DTI updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employers");
									}
									else{
										Materialize.toast('Cannot process request.',4000);
									}
								});
							}
					    }
					}); 
				}
				else if(data.prop == "FirstName"){
					$('#modal').modal('open');			
					$("#form_update").validate({
					    rules: {
					        field_FirstName: {required: true,maxlength: 500},
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
								var ajax = system.ajax('../assets/harmony/Process.php?update-employer',[id,_form]);
								ajax.done(function(ajax){
									console.log(ajax)
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('FirstName updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employers");
									}
									else{
										Materialize.toast('Cannot process request.',4000);
									}
								});
							}
					    }
					}); 
				}
				else if(data.prop == "LastName"){
					$('#modal').modal('open');			
					$("#form_update").validate({
					    rules: {
					        field_LastName: {required: true,maxlength: 500},
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
								var ajax = system.ajax('../assets/harmony/Process.php?update-employer',[id,_form]);
								ajax.done(function(ajax){
									console.log(ajax)
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('LastName updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employers");
									}
									else{
										Materialize.toast('Cannot process request.',4000);
									}
								});
							}
					    }
					}); 
				}
				else if(data.prop == "ContactNo"){
					$('#modal').modal('open');			
					$("#form_update").validate({
					    rules: {
					        field_ContactNo: {required: true,maxlength: 500},
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
								var ajax = system.ajax('../assets/harmony/Process.php?update-employer',[id,_form]);
								ajax.done(function(ajax){
									console.log(ajax)
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('Contact Number updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employers");
									}
									else{
										Materialize.toast('Cannot process request.',4000);
									}
								});
							}
					    }
					}); 
				}
				else if(data.prop == "Address"){
					$('#modal').modal('open');			
					$("#form_update").validate({
					    rules: {
					        field_Address: {required: true,maxlength: 500},
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
								var ajax = system.ajax('../assets/harmony/Process.php?update-employer',[id,_form]);
								ajax.done(function(ajax){
									console.log(ajax)
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('Address updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employers");
									}
									else{
										Materialize.toast('Cannot process request.',4000);
									}
								});
							}
					    }
					}); 
				}
				else if(data.prop == "Email"){
					$('#modal').modal('open');			
					$("#form_update").validate({
					    rules: {
					        field_Email: {required: true,maxlength: 50},
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
								var ajax = system.ajax('../assets/harmony/Process.php?update-employer',[id,_form]);
								ajax.done(function(ajax){
									console.log(ajax)
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('Email updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employers");
									}
									else{
										Materialize.toast('Cannot process request.',4000);
									}
								});
							}
					    }
					}); 
				}
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
				// 			var data = system.ajax('../assets/harmony/Process.php?update-employer',[id,_form]);
				// 			data.done(function(data){
				// 				console.log(data);
				// 				if(data == 1){
				// 					system.clearForm();
				// 					Materialize.toast('Password updated.',4000);
				// 					system.close_modal();	
				// 					App.handleLoadPage("#cmd=index;content=employers");
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
		addEmployer:function(){
			var _this = this;
			$("#add_employer").on('click',function(){
				var data = system.xml("pages.xml");
				$(data.responseText).find("addemployer").each(function(i,content){
					$("#modal .modal-content").html(content);
					$('#modal').modal('open');
					// $("#field_password").val($.md5(date.toString()).substring(0,8));					
					$("#field_password").on('focus',function(){
						$("#note_password").removeClass('zoomOut hidden').addClass("zoomIn");
					}).on('blur',function(){
						$("#note_password").removeClass('zoomIn').addClass('zoomOut hidden');
					})		
					$("#form_addEmployer").validate({
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
							var data = system.ajax('../assets/harmony/Process.php?set-newEmployer',_form);
							data.done(function(data){
								console.log(data);
								if(data == 1){ 
									// var text = "<h1>Congratulations</h1>, you are now registered. You can login using <u>"+_form[2]['value']+"</u> as you username and <u>"+
									// _form[5]['value']+"</u> as your password. <a href='http://localhost/kaboomRewards/login.html'>Just follow this link</a>";
									// var data = system.send_mail('rufo.gabrillo@gmail.com,info@rnrdigitalconsultancy.com','Employer Registration',text);
									// if(data.responseText != ""){
										Materialize.toast('Saved.',4000);
										$("#modal") .close_modal('hide');
										system.clearForm();
										App.handleLoadPage("#cmd=index;content=employers;approved_employers");
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
}();
var applicant = function(){
	"use strict";
	return {
		list: function(){
			var sys = system, validate = validation, _this = this, _apps = App;
			var content = "", actions = "", status = "";
			var ajax = sys.ajax('../assets/harmony/Process.php?get-allApplicant',"");
			ajax.success(function(data){
				var arrInactive = [], arrActive = [];
				if(data != ""){
					var data = JSON.parse(data);
					sys.sortResults(data,24,false);
					$.each(data,function(i,v){
						if(v[23] == 0)
				            arrInactive.push(v);					
						else
				            arrActive.push(v);
					});

					if(arrActive.length>0){
						var content = "<table class='table table-bordered' id='table_activeApplicant'>"+
									"	<thead>"+
									"		<tr>"+
									"			<th width='15%'></th>"+
									"			<th width='80%'>Name</th>"+
									"			<th width='15%'></th>"+
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

										if(full[21] != ""){
											var imageData = full[21].split('.');
											if(imageData[imageData.length-1]!='apr')
												picture = "../assets/img/"+full[21];					
											else
												picture = sys.get_apr(full[21]);
										}

					            		var details = '<img alt="image" src="'+picture+'" class = "responsive-img">';
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
					            		var details = "<a href='#cmd=index;content=applications;id="+full[0]+"' data-id='"+full[0]+"' ><i class='small material-icons'>more_vert</i></a>";
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


					$("a").click(function(){
						var cmd = $(this).data('cmd');
						var id = $(this).data('id');
						if(cmd == 'info_ActiveApplicant'){
							var newdata = sys.searchJSON(arrActive,0,id);
							var picture = "../assets/img/profile_avatar.jpg", description = "No description yet.", resume = "No resume uploaded yet.";

							if(newdata[0][21] != ""){
								var imageData = newdata[0][21].split('.');
								if(imageData[imageData.length-1]!='apr')
									picture = "../assets/img/"+newdata[0][21];					
								else
									picture = sys.get_apr(newdata[0][21]);
							}


							if(newdata[0][4] != "")
								description = newdata[0][8];    			
							if(newdata[0][24] != "")
								var resume = "<a href='../assets/files/"+newdata[0][24]+"' class='btn btn-xs btn-white'>Download and Read</a>";    			

							var content = "<div class='col-md-12' style='float:none !important;'><table class='table table-bordered card-content'>"+
										    "	<tr><td width='20%'><strong>Name: </strong></td><td width='80%'>"+newdata[0][1]+", "+newdata[0][2]+" "+newdata[0][3]+"</td><td></tr>"+
										    "	<tr><td><strong>Description: </strong></td><td>"+newdata[0][4]+"</td></tr>"+
										    "	<tr><td><strong>Gender: </strong></td><td>"+newdata[0][5]+"</td></tr>"+
										    "	<tr><td><strong>Contact Number: </strong></td><td>"+newdata[0][6]+"</td></tr>"+
										    "	<tr><td><strong>Address: </strong></td><td>"+newdata[0][7]+"</td></tr>"+
										    "	<tr><td><strong>Email Address: </strong></td><td>"+newdata[0][8]+"</td></tr>"+
											"   <tr><td><strong>Date Of Birth: </strong></td><td>"+newdata[0][9]+"</td></tr>"+
											"   <tr><td><strong>Place Of Birth: </strong></td><td>"+newdata[0][10]+"</td></tr>"+
											"   <tr><td><strong>Age: </strong></td><td>"+newdata[0][11]+"</td></tr>"+
											"   <tr><td><strong>Nationality: </strong></td><td>"+newdata[0][12]+"</td></tr>"+
											"   <tr><td><strong>Guardian: </strong></td><td>"+newdata[0][13]+"</td></tr>"+
											"   <tr><td><strong>Relationship with the guardian: </strong></td><td>"+newdata[0][14]+"</td></tr>"+
											"   <tr><td><strong>Elementary Graduated: </strong></td><td>"+newdata[0][15]+"</td></tr>"+
											"   <tr><td><strong>Date of Elementary Graduated: </strong></td><td>"+newdata[0][16]+"</td></tr>"+
											"   <tr><td><strong>Address of Elementary Graduated: </strong></td><td>"+newdata[0][17]+"</td></tr>"+
											"   <tr><td><strong>High School Graduated: </strong></td><td>"+newdata[0][18]+"</td></tr>"+
											"   <tr><td><strong>Date of High School Graduated: </strong></td><td>"+newdata[0][19]+"</td></tr>"+
											"   <tr><td><strong>Address of High School Graduated: </strong></td><td>"+newdata[0][20]+"</td></tr>"+
										    "	<tr><td><strong>Status: </strong></td><td>"+newdata[0][23]+"</td></tr>"+
										    "	<tr><td><strong>Resume: </strong></td><td>"+resume+"</td></tr>"+
										  	"</table>"+
										  	"	<div class='col-md-6'><a class='btn btn-white btn-xs btn-block' data-cmd='action_inactivateApplicant' data-id='"+newdata[0][0]+"'>Deactivate</a></div>"+
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
						if(cmd == 'info_InactiveApplicant'){
							var newdata = sys.searchJSON(arrInactive,0,id);
							var picture = "../assets/img/profile_avatar.jpg", description = "No description yet.", resume = "No resume uploaded yet.";
							if(newdata[0][21] != ""){
								var imageData = newdata[0][21].split('.');
								if(imageData[imageData.length-1]!='apr')
									picture = "../assets/img/"+newdata[0][21];					
								else
									picture = sys.get_apr(newdata[0][21]);
							}


							if(newdata[0][4] != "")
								description = newdata[0][8];    			
							if(newdata[0][24] != "")
								var resume = "<a href='../assets/files/"+newdata[0][24]+"' class='btn btn-xs btn-white'>Download and Read</a>";    			

							var content = "<div class='col-md-12' style='float:none !important;'><table class='table table-bordered card-content'>"+
										    "	<tr><td width='20%'><strong>Name: </strong></td><td width='80%'>"+newdata[0][1]+", "+newdata[0][2]+" "+newdata[0][3]+"</td><td></tr>"+
										    "	<tr><td><strong>Description: </strong></td><td>"+newdata[0][4]+"</td></tr>"+
										    "	<tr><td><strong>Gender: </strong></td><td>"+newdata[0][5]+"</td></tr>"+
										    "	<tr><td><strong>Contact Number: </strong></td><td>"+newdata[0][6]+"</td></tr>"+
										    "	<tr><td><strong>Address: </strong></td><td>"+newdata[0][7]+"</td></tr>"+
										    "	<tr><td><strong>Email Address: </strong></td><td>"+newdata[0][8]+"</td></tr>"+
											"   <tr><td><strong>Date Of Birth: </strong></td><td>"+newdata[0][9]+"</td></tr>"+
											"   <tr><td><strong>Place Of Birth: </strong></td><td>"+newdata[0][10]+"</td></tr>"+
											"   <tr><td><strong>Age: </strong></td><td>"+newdata[0][11]+"</td></tr>"+
											"   <tr><td><strong>Nationality: </strong></td><td>"+newdata[0][12]+"</td></tr>"+
											"   <tr><td><strong>Guardian: </strong></td><td>"+newdata[0][13]+"</td></tr>"+
											"   <tr><td><strong>Relationship with the guardian: </strong></td><td>"+newdata[0][14]+"</td></tr>"+
											"   <tr><td><strong>Elementary Graduated: </strong></td><td>"+newdata[0][15]+"</td></tr>"+
											"   <tr><td><strong>Date of Elementary Graduated: </strong></td><td>"+newdata[0][16]+"</td></tr>"+
											"   <tr><td><strong>Address of Elementary Graduated: </strong></td><td>"+newdata[0][17]+"</td></tr>"+
											"   <tr><td><strong>High School Graduated: </strong></td><td>"+newdata[0][18]+"</td></tr>"+
											"   <tr><td><strong>Date of High School Graduated: </strong></td><td>"+newdata[0][19]+"</td></tr>"+
											"   <tr><td><strong>Address of High School Graduated: </strong></td><td>"+newdata[0][20]+"</td></tr>"+
										    "	<tr><td><strong>Status: </strong></td><td>"+newdata[0][23]+"</td></tr>"+
										    "	<tr><td><strong>Resume: </strong></td><td>"+resume+"</td></tr>"+
										  	"</table>"+
										  	"	<div class='col-md-6'><a class='btn btn-white btn-xs btn-block' data-cmd='action_activateApplicant' data-id='"+newdata[0][0]+"'>Activate</a></div>"+
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
											_this.list();
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
		activities:function(){
    		var ajax = system.ajax('../assets/harmony/Process.php?do-getActivities',"");
			var ajaxData = JSON.parse(ajax.responseText);
			console.log(ajaxData);
			var content = "";
			$.each(ajaxData,function(i,v){
				// console.log(v);
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
						"            <div class='col-lg-15 content no-top-border'>"+
						// "                <p class='m-b-xs'><a data-toggle='collapse' data-parent='#accordion' href='#"+v[0][0]+"' aria-expanded='false' class='collapsed btn btn-white btn-xs pull-right'>Show Employer's Information</a>"+
						"                <p class='m-b-xs'><h3><strong>Job Title:</strong> "+v[2][4]+"</h3></p>"+
						"                <p class='m-b-xs'><strong>Skills:</strong> "+$skills+"</p>"+
						"                <p class='m-b-xs'><strong>Job Description:</strong> "+v[2][2]+"</p>"+
						// "                <div id='"+v[0][0]+"' class='panel-collapse collapse' aria-expanded='false' style='height: 0px;'>"+
						// "                	<div class='panel-body'>"+
						"                		<div class='hr-line-dashed'></div>"+
						"                		<p class='m-b-xs'><strong>Company:</strong> "+v[1][5]+"</p>"+
						"                		<p class='m-b-xs'><strong>Office:</strong> "+v[1][3]+"</p>"+
						"                		<p class='m-b-xs'><strong>Email:</strong> "+v[1][10]+"</p>"+
						"                		<p class='m-b-xs'><strong>Company Description:</strong> "+v[1][6]+"</p>"+
						"                		<div class='hr-line-dashed'></div>"+
						// "                	</div>"+
						// "                </div>"+
						"                <p class='m-b-xs'><strong>Applicant:</strong><br/><div class='well'>"+v[3][1]+" "+v[3][2]+"</div></p>"+
						"            </div>"+
						"        </div>"+
						"    </div>";
			});
			content = "<div class='card-content inspinia-timeline'>"+content+"</div>";
			$("#activities").html(content);
			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss"
			});
	    },
	    application: function(id){
	    	console.log(id);
	    	var applicant = system.ajax('../assets/harmony/Process.php?get-Applicant',id[1]);
	    	var appData = JSON.parse(applicant.responseText);
			console.log(appData);
    		var ajax = system.ajax('../assets/harmony/Process.php?do-getApplications',appData[0][0]);
			ajax.done(function(data){
				data = JSON.parse(data);
			console.log(data);
			var content = "";
				$.each(data,function(i,v){
					// console.log(v);
					if(v[2][5] != "null"){
						var skills = JSON.parse(v[2][5]), $skills = "";
						$.each(skills,function(a,b){
							$skills += "<span class='label label-defualt'style='margin-right: 5px;'>"+b+"</span>";
						});
						console.log(skills);
					}
					content += "    <div class='timeline-item'>"+
							"        <div class='row'>"+
							"                <p class='m-b-xs'><h3><strong>Applicant:</strong>"+v[3][1]+" "+v[3][2]+" </h3></p>"+
							"            <div class='col-lg-3 date'>"+
							"                <i class='fa fa-briefcase'></i>"+v[0][4]+"<br><small class='text-navy prettydate'>"+v[0][4]+"</small>"+
							"            </div>"+
							"            <div class='col-lg-15 content no-top-border'>"+
							// "                <p class='m-b-xs'><a data-toggle='collapse' data-parent='#accordion' href='#"+v[0][0]+"' aria-expanded='false' class='collapsed btn btn-white btn-xs pull-right'>Show Employer's Information</a>"+
							"                <p class='m-b-xs'><span>Job Title:</span> "+v[2][4]+"</p>"+
							"                <p class='m-b-xs'><strong>Skills:</strong> "+$skills+"</p>"+
							"                <p class='m-b-xs'><strong>Job Description:</strong> "+v[2][2]+"</p>"+
							// "                <div id='"+v[0][0]+"' class='panel-collapse collapse' aria-expanded='false' style='height: 0px;'>"+
							// "                	<div class='panel-body'>"+
							"                		<div class='hr-line-dashed'></div>"+
							"                		<p class='m-b-xs'><strong>Company:</strong> "+v[1][5]+"</p>"+
							"                		<p class='m-b-xs'><strong>Office:</strong> "+v[1][3]+"</p>"+
							"                		<p class='m-b-xs'><strong>Email:</strong> "+v[1][10]+"</p>"+
							"                		<p class='m-b-xs'><strong>Company Description:</strong> "+v[1][6]+"</p>"+
							"                		<div class='hr-line-dashed'></div>"+
							// "                	</div>"+
							// "                </div>"+
							
							"            </div>"+
							"        </div>"+
							"    </div>";
				});	
				content = "<div class='card-content inspinia-timeline'>"+content+"</div>";
				$("#jobapplications").html(content);
				$(".prettydate").prettydate({
				    dateFormat: "YYYY-MM-DD hh:mm:ss"
				});
			})
	    }, 
		
		
	}

}();