var admin = function () {
	"use strict";
	return {
		ini:function(){
			var data = admin.check_access();
			if(data != 0){
				admin.display();
				employer.list();
				employer.register_employer();
				applicant.list_applicant();
			}
		},
		display:function(){
			var ajax = system.html('../assets/harmony/Process.php?get-account');
			var data = ajax.responseText;
			var picture = "../assets/img/profile/profile_avatar.jpg", level = "";
			data = JSON.parse(data);

			if(data[0][3] != ""){
				var imageData = data[0][3].split('.');
				if(imageData[imageData.length-1]!='apr'){
					console.log(imageData.length);
					picture = "../assets/img/profile/"+data[0][3];					
				}
				else{
					// picture = _this.get_apr(data[0][3]);					
					picture = "";					
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
				else if(data == "logout"){
					var ajax = system.ajax('../assets/harmony/Process.php?kill-session',"");
					admin.check_access();
				}
				else{
					//console.log('dashboard');
				}
			});
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
		update_picture:function(){
    		var data = system.get_account();
    		data = JSON.parse(data);

			var picture = "../assets/img/profile/profile avatar.jpg";
			if(data[0][3] != ""){
				var imageData = data[0][3].split('.');
				if(imageData[imageData.length-1]!='apr')
					picture = "../assets/img/profile/"+data[0][3];					
				else
					picture = system.get_apr(data[0][3]);
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
	    		$("#profile_picture1").removeClass('hidden');
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
        			system.errorNotif('Notice',name+' can\'t be empty.');
        		}
        	});
        },
        job:function(id){
			var ajax = system.ajax('../assets/harmony/Process.php?get-job',id[1]);
			ajax.done(function(data){
				data = JSON.parse(data);
				var applicant = "No Applicant.", vacancy_id = data[0][0][0];
				var applicationexpiry = new Date(data[0][0][3]), now = new Date();
				var status = "<span class='label label-primary'>Active</span>";
				var application_content = "";

				if(applicationexpiry<now){
					status = "<span class='label label-danger'>Inactive</span>";
				}

				if(data[0][1].length > 0){
					$.each(data[0][1],function(i,v){
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
					applicant = data[0][1].length;
				}
				application_content = "<div class='feed-activity-list'>"+application_content+"</div>";
				$('#data_info').removeClass('hidden').html(application_content);

				$('#job-post #txt_jobtitle').html(data[0][0][4]);
				$('#job-post #txt_jobstatus').html(status);
				$('#job-post #txt_jobexpiry').html(data[0][0][3]);
				$('#job-post #txt_jobdate').html(data[0][0][9]);
				$('#job-post #txt_jobdescription').html(data[0][0][2]);
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
		        			system.errorNotif('Notice','Description must only contain 800 characters.');
		                }
		                else{
		                	$("#"+data+" a[data-cmd='interview']").removeClass('disabled');
		                }
		        		$("#"+data+" input[name='field_interview']").val($(this).val());  
		        	});

					$("#"+data+" a[data-cmd='interview']").click(function(){
						var content = [$(this).data('id'),$("#"+data+" input[name='field_interview']").val()];
						var ajax = system.ajax('../assets/harmony/Process.php?do-inviteInterview',content);
						var data = JSON.parse(ajax.responseText);
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
					        confirmButtonColor: "#DD9B55",
					        confirmButtonText: "Confirm",
					        closeOnConfirm: false
					    }, function () {
							var ajax = system.ajax('../assets/harmony/Process.php?do-decline',data[1]);
							var data = JSON.parse(ajax.responseText);
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
			})
        }      
    };
}();

var jobs = function(){
	"use strict";
	return {
        posting:function(){
			var content = "";
			var ajax = system.html('../assets/harmony/Process.php?get-jobsPosts');
			ajax.done(function(data){
				data = JSON.parse(data);
				if(data.length>0){
					var content = "<div class='card'><div class='card-content'><table class='table table-striped' id='table_jobs'>"+
									"	<thead>"+
									"		<tr>"+
									"			<th width='5%'>Status</th>"+
									"			<th width='50%'>Job</th>"+
									"			<th width='15%'>Options</th>"+
									"		</tr>"+
									"	</thead>"+
									"	<tbody></tbody>"+
									"</table></div></div>";

					$("#job-posts").html(content);

					content = "";
					$.each(data,function(i,v){
						var status = "<span class='label label-primary'>Active</span>";
						var expiry = new Date(v[3]), now = new Date();

						if(expiry<now){
							status = "<span class='label label-danger'>Inactive</span>";
						}
						content += "<tr>"+
									"<td>"+status+"</td>"+
									"<td><a>"+v[4]+"</a><br><small>"+v[2]+"</small><br/></td>"+
									"<td><a href='#cmd=index;content=job;id="+v[0]+"' class='btn btn-white btn-xs btn-block'>Details</a></td>"+
									"</tr>";						
					});

					$("#job-posts tbody").html(content);
				}
				$(".prettydate").prettydate({
				    dateFormat: "YYYY-MM-DD hh:mm:ss"
				});	
			});
        },
	}
}();

var employer = function(){
	"use strict";
	return {
		list:function(){
			var sys = system;
			var ajax = sys.html('../assets/harmony/Process.php?get-allEmployer');
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
										var picture = "../assets/img/profile/profile_avatar.jpg";
										if(full[9] != ""){
											var imageData = full[9].split('.');
											if(imageData[imageData.length-1]!='apr'){
												picture = "../assets/img/profile/"+full[9];					
											}
											else{
												// picture = sys.get_apr(full[9]);					
											}
										}

						            	var details = '<img alt="image" src="'+picture+'">';
						                return details;
						            }
						        },
						        {data: "",
						            render: function ( data, type, full ){
						            	var details = full[5]+"<br/><i>"+(full[9],100)+"</i>";
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
						$("#pending_employers .card-content").html(content);
					}
					else{
						$("#pending_employers .card-content").html("<h2>All caught up. </h2><h4>No pending request for employer's account approval</h4>");
					}

					$("a").click(function(){
						var cmd = $(this).data('cmd');
						var id = $(this).data('id');
						if(cmd == 'options_pendingEmployer'){
							var data = sys.searchJSON(arrPending,0,id);
							var content = "<div class='col-md-offset-3 col-md-9' style='float:none !important;'>"+
											"	<table class='table table-bordered card-content'>"+
											"		   <tr><td width='20%'>Company: </td><td width='80%'>"+data[0][5]+"</td></tr>"+
											"		   <tr><td>Description: </td><td>"+data[0][9]+"</td></tr>"+
											"		   <tr><td>BIR: </td><td>"+data[0][7]+"</td></tr>"+
											"		   <tr><td>DTI: </td><td>"+data[0][8]+"</td></tr>"+
											"		   <tr><td>Owner: </td><td>"+data[0][2]+" "+data[0][1]+"</td></tr>"+
											"		   <tr><td>Contact Number: </td><td>"+data[0][4]+"</td></tr>"+
											"		   <tr><td>Office Address: </td><td>"+data[0][3]+"</td></tr>"+
											"		   <tr><td>Email Address: </td><td>"+data[0][10]+"</td></tr>"+
											"	</table>"+
											"	<div class='col-md-9'><a class='btn btn-primary btn-xs btn-block' data-cmd='action_acceptPending' data-id='"+data[0][0]+"'>Accept</a></div>"+
											"	<div class='col-md-9'><a class='btn btn-white btn-xs btn-block' data-cmd='action_declinePending' data-id='"+data[0][0]+"'>Decline</a></div>"+
											"</div>";
							system.modalLarge("System: Employer's Information [Pending]","",content);

							$("a[data-cmd='action_acceptPending']").click(function(){
								var id = $(this).data('id');
								sys.confirm("Accept this Employer?",function(){
									var ajax = sys.ajax('../assets/harmony/Process.php?set-acceptPendingEmployer',id);
									ajax.success(function(data){
										if(data == 1){
								        	$("#modalLarge").modal('hide');
											swal("Successful!", "Employer has been accepted.", "success");
											employer.list();
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
								sys.confirm("Decline this Employer?",function(){
									var ajax = sys.ajax('../assets/harmony/Process.php?set-declinePendingEmployer',id);
									ajax.success(function(data){
										if(data == 1){
								        	$("#modalLarge").modal('hide');
											swal("Successful!", "Employer has been declined.", "success");
											employer.list();
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
	    register_employer: function(){
	    	var date = new Date;
	    	$("input[name='field_password']").val("");

            $("#field_autosid").click(function(){
            	if($(this).prop('checked')){
            		$("#div_applicantID").addClass('hidden');
            		$("input[name='field_applicantID']").data({'inputtype':'optional'});
            	}
            	else{
            		$("#div_applicantID").removeClass('hidden');
            		$("input[name='field_applicantID']").data({'inputtype':'required'});
            	}
            });

            $('a[data-cmd="register_employer"]').click(function(){
            	var fields = [];
				var data = $("#form_registerEmployer").serializeArray();
				var validated = validation.validate_form(data);
				var email = validation.email($("input[name='field_email']").val());
				console.log(data);
				if(validated[0]>0){
					var message = "";
					$.each(validated[1],function(i,v){
						message += (i+1)+". "+v+"<br/>";
					})
					sys.errorNotif('The following fields has an error',message);
				}
				else if(!email){
					sys.errorNotif('Error',"Invalid email address.");
				}
				else{
					/*
				    system.send_mail($("input[name='field_email']").val(),$("input[name='field_password']").val());
					*/
					var ajax = system.html('../assets/harmony/Process.php?set-registerEmployer',[data,$("input[name='field_password']").val()]);
					ajax.success(function(data){
						console.log(data);
						if(data == 1){
							// allow automatic emailing capability if posible
						    // system.send_mail($("input[name='field_email']").val(),$("input[name='field_password']").val());
							swal("Successful!", "Employer has been accepted.", "success");
							system.successNotif('Success',"Email has been sent.");
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
	}
}();
var applicant = function(){
	"use strict";
	return {
		list_applicant: function(){
			var sys = system, validate = validation, _this = this, _apps = App;
			var ajax = sys.html('../assets/harmony/Process.php?get-allApplicant');
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
					$("#list_applicant .card-content").html(content);

					 $('#table_allApplicant').DataTable( {
						    data: data,
						    sort: false,
							"columnDefs": [
								{ className: "client-avatar", "targets": [ 0 ] },
								{ className: "text-left", "targets": [ 1 ] }
							],
						    // columns: [
						    //     {data: "",
						    //         render: function ( data, type, full ){
										// var picture = "../assets/img/profile/profile_avatar.jpg";
										// if(full[6] != ""){
										// 	var imageData = full[6].split('.');
										// 	if(imageData[imageData.length-1]!='apr'){
										// 		picture = "../assets/img/profile/"+full[6];					
										// 	}
										// 	else{
										// 		picture = sys.get_apr(full[6]);					
										// 	}
										// }

						    //         	var details = '<img alt="image" src="'+picture+'">';
						    //             return details;
						    //         }
						    //     },
						    //     {data: "",
						    //         render: function ( data, type, full ){
						    //         	var details = full[5]+"<br/><i>"+(full[6],100)+"</i>";
						    //             return details;
						    //         }
						    //     },
						    //     {data: "",
						    //         render: function ( data, type, full ){
						    //         	var details = "<a data-id='"+full[0]+"' data-cmd='info_applicant' class='btn btn-success btn-xs btn-block'>Details</a>";
						    //             return details;
						    //         }
						    //     },
						    // ]
						});
					    
					// $("a[data-cmd='info_applicant']").click(function(){
					// 	var id = $(this).data('id');
					// 	var newdata = sys.searchJSON(data,0,id);
					// 	var picture = "../assets/img/profile avatar.jpg", description = "No description yet.", resume = "No resume uploaded yet.";
		   //          	var info = JSON.parse(newdata[0][4]);
		   //          	console.log(info);
		   //          	$.each(info,function(i,v){
		   //          		console.log(i+":"+v);
		   //          	});

					// 	if(newdata[0][5] != ""){
					// 		var imageData = newdata[0][5].split('.');
					// 		if(imageData[imageData.length-1]!='apr')
					// 			picture = "../assets/img/"+newdata[0][5];					
					// 		else
					// 			// picture = mainProcess.get_apr(newdata[0][5]);
					// 	}

					// 	if(newdata[0][7] != "")
					// 		description = newdata[0][7];    			
					// 	if(newdata[0][3] != ""){
					// 		resume = JSON.parse(newdata[0][3]);
					// 		resume = "<a href='../assets/files/"+resume+"' class='btn btn-xs btn-white'>Download and Read</a>";    			
					// 	}

					// 	var content = ""+
					// 					"<div class='row m-b-lg m-t-lg'>"+
					// 					"    <div class='col-md-9'>"+
					// 					"        <div class='profile-image'>"+
					// 					"            <img src='"+picture+"' class='img-circle circle-border m-b-md' alt='profile'>"+
					// 					"        </div>"+
					// 					"        <div class='profile-info'>"+
					// 					"            <div>"+
					// 					"                <h2 class='no-margins'>"+info[0]+", "+info[1]+" "+info[2]+"</h2>"+
					// 					"            </div>"+
					// 					"        </div>"+
					// 					"    </div>"+
					// 					"    <div class='col-md-9'>"+
					// 					"        <table class='table small m-b-xs'>"+
					// 					"            <tr><td><strong>Gender: </strong>"+info[7]+"</td></tr>"+
					// 					"            <tr><td><strong>Address: </strong>"+info[5]+"</td></tr>"+
					// 					"            <tr><td><strong>Date Of Birth: </strong>"+info[3]+"</td></tr>"+
					// 					"            <tr><td><strong>Age: </strong>"+info[4]+"</td></tr>"+
					// 					"            <tr><td><strong>Place Of Birth: </strong>"+info[9]+"</td></tr>"+
					// 					"            <tr><td><strong>Nationality: </strong>"+info[8]+"</td></tr>"+
					// 					"            <tr><td><strong>Guardian: </strong>"+info[9]+"</td></tr>"+
					// 					"            <tr><td><strong>Relationship with the guardian: </strong>"+info[10]+"</td></tr>"+
					// 					"            <tr><td><strong>Email Address: </strong>"+info[17]+"</td></tr>"+
					// 					"            <tr><td><strong>Elementary Graduated: </strong>"+info[11]+"</td></tr>"+
					// 					"            <tr><td><strong>Date of Elementary Graduated: </strong>"+info[12]+"</td></tr>"+
					// 					"            <tr><td><strong>Address of Elementary Graduated: </strong>"+info[13]+"</td></tr>"+
					// 					"            <tr><td><strong>High School Graduated: </strong>"+info[14]+"</td></tr>"+
					// 					"            <tr><td><strong>Date of High School Graduated: </strong>"+info[15]+"</td></tr>"+
					// 					"            <tr><td><strong>Address of High School Graduated: </strong>"+info[19]+"</td></tr>"+
					// 					"            <tr><td><strong>Resume: </strong>"+resume+"</td></tr>"+
					// 					"        </table>"+
					// 					"    </div>"+
					// 					"</div>"+
					// 				  "";
					// 	sys.modalLarge("System:","",content);
					// });
				}
			});
	    },
	   //  register_applicant: function(){
	   //  	var date = new Date;
	   //  	$("input[name='field_password']").val(date.toString().substring(0,8));

    //         $('#year_Birth.input-group.date')//.datepicker({
    //         //     startView: 2,
    //         //     todayBtn: "linked",
    //         //     keyboardNavigation: false,
    //         //     forceParse: false,
    //         //     autoclose: true,
    //         //     format: "mm/dd/yyyy"
    //         // });

    //         $('.year_Graduated.input-group.date')//.datepicker({
				// // minViewMode: 2,
    // //             startView: 2,
    // //             forceParse: false,
    // //             autoclose: true,
    // //             format: "yyyy"
    // //         });

    //         $("input[name='field_nob']").keyup(function(){
    //         	if($(this).val() != NaN){
	   //          	var x = Number($(this).val()),y = Number($("input[name='field_nos']").val());
	   //          	$("input[name='field_total']").val(x+y);
    //         	}
    //         });

    //         $("input[name='field_nos']").keyup(function(){
    //         	if($(this).val() != NaN){
	   //          	var x = Number($(this).val()),y = Number($("input[name='field_nob']").val());
	   //          	$("input[name='field_total']").val(x+y);
    //         	}
    //         });

    //         $("input[name='field_dob']").change(function(){
    //         	var dob = $(this).val();

				// var today = new Date();
				// var format = dob.split("/");
				// var dob = new Date(format[2], format[0], format[1]);
				// var diff = (today - dob);
				// var age = Math.floor(diff / 31539000000);
				// $("input[name='field_age']").val(age);
    //         })

    //         $("#field_autosid").click(function(){
    //         	if($(this).prop('checked')){
    //         		$("#div_applicantID").addClass('hidden');
    //         		$("input[name='field_applicantID']").data({'inputtype':'optional'});
    //         	}
    //         	else{
    //         		$("#div_applicantID").removeClass('hidden');
    //         		$("input[name='field_applicantID']").data({'inputtype':'required'});
    //         	}
    //         });

    //         $("#btn_registerApplicant").click(function(){
    //         	var fields = [];
				// var data = $("#form_registerApplicant").serializeArray();
				// var validated = validation.validate_form(data);
				// var email = validation.email($("input[name='field_email']").val());

			 //    system.send_mail($("input[name='field_email']").val(),$("input[name='field_password']").val());

				// if(validated[0]>0){
				// 	var message = "";
				// 	$.each(validated[1],function(i,v){
				// 		message += (i+1)+". "+v+"<br/>";
				// 	})
				// 	system.errorNotif('The following fields has an error',message);
				// }
				// else if(!email){
				// 	// system.errorNotif('Error',"Invalid email address.");
				// }
				// else{
				// 	var ajax = system.html('../assets/harmony/Process.php?do-registerApplicant',[data,$("input[name='field_password']").val()]);
				// 	ajax.success(function(data){
				// 		if(data == 1){
				// 		    system.send_mail($("input[name='field_email']").val(),$("input[name='field_password']").val());

				// 			swal("Successful!", "Employer has been accepted.", "success");
				// 			system.successNotif('Success',"Email has been sent.");
				// 			App.handleLoadPage(window.location.hash);
				// 		}
				// 		else{
				// 			swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
				// 			console.log(data);
				// 		}
				// 	});
				// }
    //         });
    //     },
	}
}();