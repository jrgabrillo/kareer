var jobs = function(){
	"use strict";
	return {
		add_vacancies: function(){
			var sys = system, validate = validation, _this = this, _apps = App;
	    	$("a[data-cmd='register_applicant']").click(function(){
	    		// console.log("sadsad");
	    		var data = $("#form_addVacancy").serializeArray();
	    		var skills = [], fields = [];
				var validated = validate.validate(data);
				if(validated[0]>0){
					var message = "";
					$.each(validated[1],function(i,v){
						message += (i+1)+". "+v+"<br/>";
					})
					sys.errorNotification('The following fields has an error',message);
					console.log("sadsad");
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

					var ajax = sys.ajax('../assets/harmony/Process.php?set-postJob',data);
					ajax.success(function(data){
						console.log(data);
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
							            	details += "<img alt='image' class='circle' src='"+system.get_apr(data_applicants[2])+"' style='margin-right: 5px;'>";
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

			// $(".datepicker").datepicker({
			//     dateFormat: "YYYY-MM-DD hh:mm:ss"
			// });			ajax.success(function(data){});
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
							            	// details += "<img alt='image' class='img-circle' src='' style='margin-right: 5px;'>";
							            	details += "<img alt='image' class='circle' src='"+system.get_apr(data_applicants[2])+"' style='margin-right: 5px;'>";
										}
										else{
											var count = full[1].length-i;
											console.log(i);
											if(i>8)
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
        // Job Detail
        JobDetail:function(id){
    		var data = JSON.parse(employer.account());
			var ajax = system.ajax('../assets/harmony/Process.php?get-jobByID',id[1]);
			var ajaxData = JSON.parse(ajax.responseText);
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
		// content = "";
			var data = system.html('../assets/harmony/Process.php?get-listAdmin');
			var actions = "", status = "";
			data.done(function(data){
				data = JSON.parse(data);
				$.each(data,function(i,v){
					if(Number(v[6]) == 1){
						status = "Active";
						var actions = "<a data-cmd='deactivateAdmin' data-name='"+v[1]+"' data-node='"+v[0]+"' class='tooltipped btn-floating waves-effect black-text no-shadow grey lighten-5 right' data-position='left' data-delay='50' data-tooltip='Deactivate account' data-cmd='update'>"+
									  "	<i class='mdi-action-lock-open right black-text'></i>"+
									  "</a>";	
					}
					else{
						status = "Deactivated";
						var actions = "<a data-cmd='activateAdmin' data-name='"+v[1]+"' data-node='"+v[0]+"' class='tooltipped btn-floating waves-effect black-text no-shadow grey lighten-5 right' data-position='left' data-delay='50' data-tooltip='Activate account' data-cmd='update'>"+
									  "	<i class='mdi-action-lock right black-text'></i>"+
									  "</a>";	
					}
					content += "<tr>"+
								"	<td>"+v[1]+"</td>"+
								"	<td>Admin</td>"+
								"	<td>"+status+"</td>"+
								"	<td>"+actions+"</td>"+
								"</tr>";
				})	

			content = "<table class='table bordered'>"+
						"	<tr>"+
						"		<th>Name</th><th>Role</th><th>Status</th><th></th>"+
						"	</tr>"+content+"</table>";
			$("#display_adminList").html(content);

			account.deactivate();
			account.activate();
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
        update:function(){
			$("a[data-cmd='updateJob']").on('click',function(){
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
					var ajax = system.ajax('../assets/harmony/Process.php?set-postJob',[acount[0][0],_form]);
					ajax.done(function(data){
						if(data == 1){
							Materialize.toast('Saved.',4000);
							system.clearForm();
							var data = system.send_mail('renziichancornista@gmail.com,info@rnrdigitalconsultancy.com','Employer Registration',text);
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
		    		var data = system.get_account();
		    		data = JSON.parse(data);
		    		data = [data[0][0],fields]

					var ajax = system.ajax('../assets/harmony/Process.php?set-postJob',data);
					ajax.success(function(data){
						console.log(data);
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
	   	deactivate:function(){
			$("a[data-cmd='deactivateAdmin']").on('click',function(){
				var id = $(this).data('node');
				var content = "Are you sure DEACTIVATE "+$(this).data('name')+"'s account?<br/>"+
							  "<label for='field_description'>Remarks: </label>"+
							  "<textarea class='materialize-textarea' data-field='field_description' name='field_description'></textarea>";
				$("#modal_confirm .modal-content").html(content);
				$("#modal_confirm .modal-footer").html("<a class='waves-effect waves-red red white-text btn-flat modal-action modal-close'>Cancel</a>"+
													   "<a data-cmd='button_proceed' class='waves-effect waves-grey btn-flat modal-action'>Proceed</a>");
				$('#modal_confirm').openModal('show');			

				$("a[data-cmd='button_proceed']").on("click",function(){
					var remarks = $("textarea[data-field='field_description']").val();
					if(remarks.length == 0){
							Materialize.toast('Remarks is required.',4000);
					}
					else if(remarks.length > 800){
							Materialize.toast('Statement is too long.',4000);
					}
					else{
						var data = system.ajax('../assets/harmony/Process.php?deactivate-admin',[id,remarks]);
						data.done(function(data){
							// console.log(data);
							if(data == 1){
								Materialize.toast('Account deactivaded.',4000);
								system.clearForm();
								App.handleLoadPage("#cmd=index;content=account");
								$('#modal_confirm').closeModal();	
							}
							else{
								Materialize.toast('Cannot process request.',4000);
							}
						});
					}
				});
			})
		},
		activate:function(){
			$("a[data-cmd='activateAdmin']").on('click',function(){
				var id = $(this).data('node');
				$("#modal_confirm .modal-content").html("Arey you sure ACTIVATE "+$(this).data('name')+"'s account?");
				$("#modal_confirm .modal-footer").html("<a class='waves-effect waves-red red white-text btn-flat modal-action modal-close'>Cancel</a>"+
													   "<a data-cmd='button_proceed' class='waves-effect waves-grey btn-flat modal-action modal-close'>Proceed</a>");
				$('#modal_confirm').openModal('show');			

				$("a[data-cmd='button_proceed']").on("click",function(){
					var data = system.ajax('../assets/harmony/Process.php?activate-application',id);
					data.done(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Account activaded.',4000);
							system.clearForm();
							App.handleLoadPage("#cmd=index;content=account");
							$('#modal_confirm').closeModal();	
						}
						else{
							Materialize.toast('Cannot process request.',4000);
						}
					});
				});
			})
		},

	}
}();

var employer = function () {
	"use strict";
	return {
		ini:function(){
			var data = employer.check_access();
			if(data != 0){
				employer.display();
				employer.logout();	
				jobs.add_vacancies();			
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
						picture =" system.get_apr(data[0][9]);"					
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
					picture = system.get_apr(data[0][9]);					
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
							// console.log(data);
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
