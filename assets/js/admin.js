/* Admin side Functionalities*/
var admin = function () {
	"use strict";
	return {
		ini:function(){
			var data = admin.check_access();
			if(data != 0){
				admin.display();
				jobs.ini();
				// employer.list();
				// applicant.list();
				// admin.update_picture();
			}
		},
		display:function(){
			let ajax = system.html('../assets/harmony/Process.php?get-account',"");
			let data = ajax.responseText;
			let picture = "../assets/img/profile_avatar.jpg", level = "";
			data = JSON.parse(data);
			if(data[0][3] != ""){
				let imageData = data[0][3].split('.');
				if(imageData[imageData.length-1]!='apr'){
					picture = "../assets/img/"+data[0][3];		
				}
				else{
					picture = system.get_apr(data[0][3]);			
				}
			}

			let content = `<table class="mdl-data-table mdl-js-data-table" width='100%'>
							<tr>
								<td class='bold left' style='width: 100px;'>First Name:</td>
								<td class='left'>
									${data[0][1]}
									<div class='field hidden' id='field_givenName'>
										<form class="form-inline" role="form">
											<div class='input-group'>
												<input class='form-control input-sm' placeholder='Given Name' type='text'>
												<span class='input-group-btn'>
													<a class='btn-flat btn-tiny btn-success save-profile'>Save</a> 
													<a class='btn-flat btn-tiny btn-default cancel'>Cancel</a>
												</span>
											</div>
										</form>
									</div>
								</td>
								<td>
									<button data-cmd='update_profile' data-field='given-name' class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="tooltip_updateName">
										<i class="material-icons mdl-color-text--grey-400">edit</i>
										<div class="mdl-tooltip mdl-tooltip--left" for="tooltip_updateName">
											Update
										</div>
									</button>
								</td>
							</tr>
							<tr>
								<td class='bold left'>Last Name:</td>
								<td class='left'>
									${data[0][2]}
									<div class='field hidden' id='field_familyName'>
										<form class="form-inline" role="form">
											<div class='input-group'>
												<input class="form-control input-sm" placeholder="Family Name" type='text'> 
												<span class='input-group-btn'>
													<a class='btn-flat btn-sm btn-success save-profile'>Save</a>
													<a class='btn-flat btn-sm btn-default cancel'>Cancel</a>
												</span>
											</div>
										</form>
									</div>
								</td>
								<td>
									<button data-cmd='update_profile' data-field='family-name' class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="tooltip_updateFamilyName">
										<i class="material-icons mdl-color-text--grey-400">edit</i></a>
										<div class="mdl-tooltip mdl-tooltip--left" for="tooltip_updateFamilyName">
											Update
										</div>
									</button>
								</td>
							</tr>
							<tr>
								<td class='bold left'>Username:</td>
								<td class='left'>
									${data[0][4]}
									<div class='field hidden' id='field_userName'>
										<form class="form-inline" role="form">
											<div class='input-group'>
												<input class="form-control input-sm" placeholder="Username" type='text'>
												<span class='input-group-btn'>
													<a class='btn-flat btn-sm btn-success save-profile'>Save</a> 
													<a class='btn-flat btn-sm btn-default cancel'>Cancel</a>
												</span>
											</div>
										</form>
									</div>
								</td>
								<td>
									<button data-cmd='update_profile' data-field='user-name' class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="tooltip_updateUsername">
										<i class="material-icons mdl-color-text--grey-400">edit</i></a>
										<div class="mdl-tooltip mdl-tooltip--left" for="tooltip_updateUsername">
											Update
										</div>
									</button>
								</td>
							</tr>
							<tr>
								<td class='bold left'>Password</td>
								<td class='left'>
									<div class='field hidden' id='field_password'>
										<form class="form-inline" role="form">
											<div class='input-group'>
												<input class="form-control input-sm" placeholder="New Password" type='password'> 
												<span class='input-group-btn'>
													<a class='btn-flat btn-tiny btn-info show-password'><i class='tiny material-icons'>visibility</i></a>
													<a class='btn-flat btn-tiny btn-success save-profile'>Save</a>
													<a class='btn-flat btn-tiny btn-default cancel'>Cancel</a>
												</span>
											</div>
										</form>
									</div>
								</td>
								<td>
									<button data-cmd='update_profile' data-field='password' class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="tooltip_updatePassword">
										<i class="material-icons mdl-color-text--grey-400">edit</i></a>
										<div class="mdl-tooltip mdl-tooltip--left" for="tooltip_updatePassword">
											Update
										</div>
									</button>
								</td>
							</tr>
						</table>`;

			$("#display_details").html(content);
			$("#profile_picture img").attr({"src":picture});
			$(".profile-element span img").attr({"src":picture});
			$("#ajax-content img").attr({"src":picture});
			$(".profile-element span strong").html(data[0][1]+" "+data[0][2]);
			$(".profile-element span h6").html('Welcome Administrator');
			$("a[data-cmd]").click(function(){
				$("a").parent('li').removeClass("active");
				$(this).parent('li').addClass("active");
				let data = $(this).data('cmd');
				if(data == "logout"){
					let ajax = system.ajax('../assets/harmony/Process.php?kill-session',"");
					admin.check_access();
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
	    		$("#profile_picture2").removeClass('hidden')

	    		var content =   "<div class='image-crop'>"+
								"	<img class='circle responsive-img' style='width: 100%; border:2px; border-style: solid; border-color: #2b9c9b' src='"+picture+"'>"+
								"</div>"+
								"<div class='btn-group'>"+
								"<label for='inputImage' class='btn-flat btn-xs btn-primary'>"+
								"	<input type='file' accept='image/*' name='file' id='inputImage' class='hide'>"+
								"	Choose an image"+
								"</label>"+
								"<button class='btn-flat btn-warning btn-xs' data-cmd='cancel' type='button'>"+
								"	Cancel"+
								"</button>"+
								"<button class='btn-flat btn-info btn-xs hidden' data-cmd='rotate' data-option='-90' type='button' title='Rotate Left'>"+
								"	<i class='tiny material-icons'>rotate_left</i>"+
								"</button>"+
								"<button class='btn-flat btn-info btn-xs hidden' data-cmd='rotate' data-option='90' type='button' title='Rotate Right'>"+
								"	<i class='tiny material-icons'>rotate_right</i>"+
								"</button>"+
								"<button class='btn-flat btn-danger btn-xs hidden' data-cmd='save' type='button'>"+
								"	Save"+
								"</button>"+
								"</div>";
	    		$("#profile_picture2").html(content);
				$('.tooltipped').tooltip({delay: 50});
	          
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
													Materialize.toast("Successful!", 2000);
													system.close_modal();
													App.handleLoadPage("#cmd=index");
												}
												else{
													Materialize.toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
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
					App.handleLoadPage("#cmd=index");
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
							Materialize.toast("Successful!", 2000);
							App.handleLoadPage("#cmd=index");
						}
						else{
							Materialize.toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
						}
					});
        		}
        		else{
        			system.errorNotification('Notice',name+' can\'t be empty.');
        		}
        	});
        }
    };
}();

var employer = function(){
	"use strict";
	return {
		//display all employers, employers details, deactivate or active an employer
		list: function(){
			var sys = system, validate = validation, _this = this, _apps = App;
			var content = "", actions = "", status = "";
			var ajax = sys.ajax('../assets/harmony/Process.php?get-allEmployer',"");
			ajax.success(function(data){
				if(data != ""){
					var data = JSON.parse(data);
					sys.sortResults(data,13,false);
						var content = "<table class='table table-bordered responsive-table' id='table_approvedEmployers'>"+
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
										if(full[9] != ""){
											var imageData = full[9].split('.');
											if(imageData[imageData.length-1]!='apr'){
												picture = "../assets/img/"+full[9];					
											}
											else{
												picture = sys.get_apr(full[9]);					
											}
										}

						            	var details = '<img alt="image" src="'+picture+'" class = " circle responsive-img" >';
						                return details;
						            }
						        },
						        {data: "",
						            render: function ( data, type, full ){
						            	var  address= "No address yet."
						            	if (full[3] != null){
						            		address = full[3];
						            	}
						            	var details = full[5]+"</br><i>"+address+"</i>";
						                return details;
						            }
						        },
						        {data: "",
						            render: function ( data, type, full ){
						            	var details = "<a href ='#cmd=index;content=employer;"+full[0]+"' class='btn btn-success btn-xs btn-block'>Details</a>";
						                return details;
						            }
						        },
						        
						    ]
						});
				}
			});	
	    },
	    //update employer's information
 		update:function(){
			$("a[data-cmd='updateEmployer']").on('click',function(){
				var data = $(this).data();
				var id = data.node;
				var content = "<h5>Change "+data.prop+"</h5>"+
						  "<form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>"+
						  "		<label for='field_"+data.prop+"'>"+data.prop+": </label>"+
						  "		<input id='field_"+data.prop+"' value='"+data.value+"' type='text' name='field_"+data.prop+"' data-error='.error_"+data.prop+"'>"+
						  "		<div class='error_"+data.prop+"'></div>"+
						  "		<a class='modal-action modal-close waves-effect waves-red btn-flat right'>Cancel</a>"+
						  "		<button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>"+
						 
						  "</form>";
				$("#modal .modal-content").html(content);
				$('#modal').modal('open');	

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
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('Name updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employer;"+id);
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
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('Description updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employer;"+id);
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
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('BIR updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employer;"+id);
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
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('DTI updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employer;"+id);
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
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('FirstName updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employer;"+id);
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
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('LastName updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employer;"+id);
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
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('Contact Number updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employer;"+id);
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
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('Address updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employer;"+id);
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
									if(ajax == 1){
										system.clearForm();
										Materialize.toast('Email updated.',4000);
										system.close_modal();	
										App.handleLoadPage("#cmd=index;content=employer;"+id);
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
		//add an employer
		registerEmployer:function(){
        	$("#form_addEmployer").validate({
			    rules: {
			        field_cname: {required:true,maxlength: 50},
			        field_email: {required: true,maxlength: 50, email:true},
			        field_password: {required: true,maxlength: 50, checkPassword:true},
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
				messages: {
	                field_email: {
	                    required: "<i class='icon f7-icons' style='margin:5px;'>This field is required</i>",
	                    maxlength: "<i class='icon f7-icons' style='margin:5px;'>Name is too long</i>",
	                    email: "<i class='icon f7-icons' style='margin:5px;'>Email is invalid</i>",
	                    checkEmail: "<i class='icon f7-icons' style='margin:5px;'>Email already in use.</i>",

	                },
	                field_password: {
	                    required: "<i class='icon f7-icons' style='margin:5px;'>This field is required</i>",
	                    maxlength: "<i class='icon f7-icons' style='margin:5px;'>too long</i>",
	                    checkPassword: "<i class='icon f7-icons' style='margin:5px;'>weak password</i>",
	                },
        		},
				submitHandler: function (form) {
					var _form = $(form).serializeArray();
					var data = system.ajax('../assets/harmony/Process.php?set-registerEmployer',_form);
					data.done(function(data){
						if(data == 1){ 
								Materialize.toast('Saved.',4000);
								system.clearForm();
								App.handleLoadPage("#cmd=index;content=employers");
						}
						else{
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			});
        },
        //view employer
        employerByID:function(id){
			var ajax = system.ajax('../assets/harmony/Process.php?get-Employer',id[0]);
			var data = JSON.parse(ajax.responseText);
			var picture = "../assets/img/profile_avatar.jpg";
			var description = "No description yet.",
				lname = "Your last name",
				gname = "Your given name",
				address = "Set your company's address",
				bir = "Set your company's BIR number",
				dti = "Set your company's DTI number",
				company = "Set your company's name",
				contactnumber = "Set your company's contact number",
				email = "Set your company's email",
				icon ="";
			var status = data[0][12];
				if (status == 1){
					status = "Active";
					icon = "lock_open";
				}
				else
				{
					status = "Inactive";
					icon = "lock_outline";
				}
				if(data[0][9] != ""){
					var imageData = data[0][9].split('.');
					if(imageData[imageData.length-1]!='apr'){
						picture = "../assets/img/"+data[0][9];					
					}
					else{
						picture = system.get_apr(data[0][9]);				
					}
				}
				if(data[0][5] != "")
					company = data[0][5];
				if(data[0][6] != null)
					description = data[0][6];
				if(data[0][7] != null)
					dti = data[0][7];
				if(data[0][8] != null)
					bir = data[0][8];
				if(data[0][2] != null)
					gname = data[0][2];
				if(data[0][1] != null)
					lname = data[0][1];
				if(data[0][3] != null)
					address = data[0][3];
				if(data[0][4] != null)
					contactnumber = data[0][4];
				if(data[0][10] != "")
					email = data[0][10];

				$("#employer img").attr({"src":picture});
	    		$("#text_company span").html(company);
	    		$("#text_company a").attr({"data-value":company});
	    		$("#text_company a").attr({"data-name":company});
	    		$("#text_company a").attr({"data-node":data[0][0]});
	    		$("#text_description span").html(description);
	    		$("#text_description a").attr({"data-value":description});
	    		$("#text_description a").attr({"data-name":description});
	    		$("#text_description a").attr({"data-node":data[0][0]});
	    		$("#text_DTI span").html(dti);
	    		$("#text_DTI a").attr({"data-value":dti});
	    		$("#text_DTI a").attr({"data-name":dti});
	    		$("#text_DTI a").attr({"data-node":data[0][0]});
	    		$("#text_BIR span").html(bir);
	    		$("#text_BIR a").attr({"data-value":bir});
	    		$("#text_BIR a").attr({"data-name":bir});
	    		$("#text_BIR a").attr({"data-node":data[0][0]});
	    		$("#text_givenName span").html(gname);
	    		$("#text_givenName a").attr({"data-value":gname});
	    		$("#text_givenName a").attr({"data-name":gname});
	    		$("#text_givenName a").attr({"data-node":data[0][0]});
	    		$("#text_familyName span").html(lname);
	    		$("#text_familyName a").attr({"data-value":lname});
	    		$("#text_familyName a").attr({"data-name":lname});
	    		$("#text_familyName a").attr({"data-node":data[0][0]});
	    		$("#text_address span").html(address);
	    		$("#text_address a").attr({"data-value":address});
	    		$("#text_address a").attr({"data-name":address});
	    		$("#text_address a").attr({"data-node":data[0][0]});
	    		$("#text_contactnumber span").html(contactnumber);
	    		$("#text_contactnumber a").attr({"data-value":contactnumber});
	    		$("#text_contactnumber a").attr({"data-name":contactnumber});
	    		$("#text_contactnumber a").attr({"data-node":data[0][0]});
	    		$("#text_email span").html(email);
	    		$("#text_status span").html(status);
	    		$("#text_status a").attr({"data-id":data[0][0]});
	    		$("#text_status a i").html(icon);

	    		$("a[data-cmd='action']").click(function(){
	    			if(status == "Active"){
		    			var content ="<div>"+
							  "		<strong>Deactivate this Employer?</strong>"+
							  "		<a data-cmd='button_proceed' class='waves-effect waves-blue btn btn-flat right'>Yes</a>"+
							  "		<a class='modal-action modal-close waves-effect waves-red btn-flat right'>No</a>"+
							  "</div>";
							$("#modal .modal-content").html(content);
							$('#modal').modal('open');	
							$("a[data-cmd='button_proceed']").click(function(){
								var ajax = system.ajax('../assets/harmony/Process.php?set-deactivateEmployer',data[0][0]);
								ajax.success(function(data){
									if(data == 1){
										Materialize.toast("Employer has been deactivated.", 2000);
										system.clearForm();
										system.close_modal();
										App.handleLoadPage("#cmd=index;content=employer;"+id);
									}
									else{
										Materialize.toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
									}
								});
							});
					}
					else if(status == "Inactive"){		
						var content ="<div>"+
							  "		<strong>Activate this Employer?</strong>"+
							  "		<a data-cmd='button_proceed' class='waves-effect waves-blue btn btn-flat right'>Yes</a>"+
							  "		<a class='modal-action modal-close waves-effect waves-red btn-flat right'>No</a>"+
							  "</div>";
							$("#modal .modal-content").html(content);
							$('#modal').modal('open');	
							$("a[data-cmd='button_proceed']").click(function(){
								var ajax = system.ajax('../assets/harmony/Process.php?set-activateEmployer',data[0][0]);
								ajax.success(function(data){
									if(data == 1){
										Materialize.toast("Employer has been activated.", 2000);
										system.clearForm();
										system.close_modal();
										App.handleLoadPage("#cmd=index;content=employer;"+id);
									}
									else{
										Materialize.toast("Fatal Error!", "There was an Unexpected Error during the process.", "error");
									}
								});
							});
					}
				});
        },
	}
}();

var applicant = function(){
	"use strict";
	return {
		//display all applicants and able to see applicant's information
	 	list: function(){
			var sys = system, validate = validation, _this = this, _apps = App;
			var ajax = sys.ajax('../assets/harmony/Process.php?get-allApplicant',"");
			ajax.success(function(data){
				if(data != ""){
					var data = JSON.parse(data);
					sys.sortResults(data,1,false);

					var content = "<table class='table table-bordered' id='table_allApplicant'>"+
									"	<thead>"+
									"		<tr>"+
									"			<th width='10%'></th>"+
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
					    columns: [
					        {data: "",
					            render: function ( data, type, full ){
									var picture = "../assets/img/profile avatar.jpg";

									if(full[3] != ""){
										var imageData = full[3].split('.');
										if(imageData[imageData.length-1]!='apr')
											picture = "../assets/img/"+full[3];					
										else
											picture = sys.get_apr(full[3]);
									}

					            	var details = '<img alt="image" src="'+picture+'" class = "circle responsive-img">';
					                return details;
					            }
					        },
					        {data: "",
					            render: function ( data, type, full ){
					            	var details = full[1]+", "+full[2];
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
						var info = sys.ajax('../assets/harmony/Process.php?get-Applicant',id);
						info.done(function(data){
						var	infodata = JSON.parse(data);
							var picture = "../assets/img/profile_avatar.jpg", description = "No description yet.", resume = "No resume uploaded yet.";
							if(infodata[0][1][0][13] != ""){
								var imageData = infodata[0][1][0][13].split(';');
								if(imageData[imageData.length-1]!='apr')
									picture = "../assets/img/"+infodata[0][1][0][13];					
								else
									picture = sys.get_apr(infodata[0][1][0][13]);
							}


							if(infodata[0][0][1] != "")
								description = infodata[0][0][1];    			
							if(infodata[0][8] != "")
								resume = "<a href='../assets/files/"+infodata[0][0][2]+"' class='btn btn-xs btn-white'>Download and Read</a>";    			

							var content = 	"	<a class='modal-action modal-close waves-effect waves-red right'>Close</a><br>"+
											"<div class='card card-header-pic'>"+
                							"	<div class='card-header color-white no-border' style='background-image:url(../assets/img/background.jpg); background-size: cover'><br><br><br>"+
                    						"     <img class='circle responsive-img' style='width: 30%' src='"+picture+"'>"+
               								"	</div>"+
                							"	<div class='card-content'>"+
                							"		<div class='card-content-inner'>"+
                							"			<h4>"+infodata[0][1][0][2]+", "+infodata[0][1][0][1]+" "+infodata[0][1][0][3]+"</h4>"+
											"			<strong class = 'teal-text'>PERSONAL INFORMATION</strong>"+
											"				<table class='table small m-b-xs'>"+
											"					<tr><td>Gender:  <strong>"+infodata[0][1][0][4]+"</strong></td></tr>"+
											"					<tr><td>Address:  <strong>"+infodata[0][1][0][7]+"</strong></td></tr>"+
											"					<tr><td>Email Address:  <strong>"+infodata[0][0][3]+"</strong></td></tr>"+
											"					<tr><td>Date of Birth:  <strong>"+infodata[0][1][0][5]+"</strong></td></tr>"+
											"					<tr><td>Place of Birth:  <strong>"+infodata[0][1][0][6]+"</strong></td></tr>"+
											"					<tr><td>Citizenship:  <strong>"+infodata[0][1][0][8]+"</strong></td></tr>"+
											"					<tr><td>Height:  <strong>"+infodata[0][1][0][9]+"</strong></td></tr>"+
											"					<tr><td>weight:  <strong>"+infodata[0][1][0][10]+"</strong></td></tr>"+
											"					<tr><td>Mother:  <strong>"+infodata[0][1][0][11]+"</strong></td></tr>"+
											"  	          		<tr><td>Father:  <strong>"+infodata[0][1][0][12]+"</strong></td></tr>"+
											"   	         	<tr><td>Date Applied:  <strong>"+infodata[0][1][0][14]+"</strong></td></tr>"+
											"				</table>"+
											"			<strong class = 'teal-text'>ACADEMIC INFORMATION</strong>"+
											"				<table class='table small m-b-xs'>"+
											"					<tr><td>Level:</td></tr>"+
											"					<tr><td>SchoolAttended:</td></tr>"+
											"					<tr><td>Degree:</td></tr>"+
											"					<tr><td>Period of Attendance:</td></tr>"+
											"					<tr><td>Highest Level:</td></tr>"+
											"					<tr><td>Year Graduated:</td></tr>"+
											"				</table>"+
											"		</div>"+
											"    </div>"+
											"</div>";
							$("#modal .modal-content").html(content);
							$('#modal').modal('open');	
						});
					});
				}
			});
	    },
	}
}();

var jobs = function(){
	"use strict";
	return {
		ini:function(){
			let data = this.get();
			this.list(data);
		},
		get:function(){
			let ajax = system.ajax('../assets/harmony/Process.php?do-getAllJobsPosts',"");
			return JSON.parse(ajax.responseText);
		},
		list:function(data){
			let content = "";
			if(data.length>0){
				let content = `<table class='mdl-data-table mdl-js-data-table'>
									<thead>
										<tr>
											<th width='5%'>Status</th>
											<th width='50%'>Job</th>
											<th width='15%'>Applicants</th>
											<th width='15%'>Options</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>`;

				$("#job-posts .table").html(content);

				content = "";
				$.each(data,function(i,v){
					let applicationexpiry = new Date(v[0][3]), now = new Date(), details="";
					if(v[1].length>0){
						$.each(v[1],function(i,v){
							let ajax = system.ajax('../assets/harmony/Process.php?get-applicant',v[2]);
							let applicants = JSON.parse(ajax.responseText);
							if(i<4){
				            	details += `<img alt='image' class='round responsive-img' style ='width: 25%; margin:2px; ' src='${applicants[0][1][0][13]}' style='margin-right: 15px;'>`;
							}
							else{
								var count = v[1].length-i;
								if(i>13)
									count = `${9}+`;

				            	details += `<div class='vertical-timeline-icon blue-bg pull-right' style='position: relative;width: 32px !important;height: 32px !important;border: 3px solid #1C84C6;'>
											    <h3>${count}</h3>
											</div>`;
								return false;
							}
						});
					}
					else{
						details = "None";
					}
					content += `
						<tr>
							<td class='left'>${(applicationexpiry<now)?"<span class='label label-danger'><i class='tiny material-icons grey-text'>star</i></span>":"<span class='label label-primary'><i class='tiny material-icons yellow-text'>star</i></span>"}</td>
							<td class='left'><strong>${v[0][4]}</strong></td>
							<td class='left'>${details}</td>
							<td>
								<a href='#cmd=index;content=job;id=${v[0][0]}' class='btn btn-blue btn-xs' id='tooltip_${v[0][0]}'>
									<i class="material-icons mdl-color-text--grey-400">more_vert</i>
									<div class="mdl-tooltip mdl-tooltip--left" for="tooltip_${v[0][0]}">
										View
									</div>
								</a>
							</td>
						</tr>
					`; 
				})

				$('#job-posts table tbody').html(content);

				$('#job-posts table').DataTable({
				    sort: false,
				});
			}
			$(".prettydate").prettydate({
			    dateFormat: "YYYY-MM-DD hh:mm:ss"
			});
		},
	}
}();