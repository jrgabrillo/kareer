var admin = function () {
	"use strict";
	return {
		nav:function(){
			var content = "", data = admin.get();
			data = JSON.parse(data);
			var profile = (data[0][3] == "")?'avatar.jpg':data[0][3];

			$("#user-account img.profile-image").attr({"src":"../assets/images/profile/"+profile});
			$("#user-account div div a span.display_name").html(`${data[0][1]} ${data[0][2]}`);
		},
		ini:function(){
			var data = admin.check_access();
			if(data != 0){
				admin.display();
			}
		},
		get:function(){
			var ajax = system.ajax('../assets/harmony/Process.php?get-account',"");
			return ajax.responseText;
		},
		display:function(){
			var content = "", data = admin.get();
			data = JSON.parse(data);
			var profile = (data[0][3] == "")?'avatar.jpg':data[0][3];
			admin.nav();
			$("#user-account img.profile-image").attr({"src":"../assets/images/profile/"+profile});
			$("#user-account div div a span.display_name").html(`${data[0][1]} ${data[0][2]}`);

			content = `<div id='profile-card' class='card'>
							<div class='card-content'>
							    <div class='responsive-img activator card-profile-image circle'>
							    	<img src='../assets/images/profile/${profile}' alt='' class='circle profile-image'>
							    	<a data-cmd='updateAdminPicture' data-value='${profile}' data-name='${data[0][1]} ${data[0][2]}' data-node='${data[0][0]}' data-prop='Picture' class='btn waves-effect white-text no-shadow black' style='font-size: 10px;z-index: 1;padding: 0 12px;top:40px;'>Change</a>
								</div>
								<a data-for='name' data-cmd='updateAdmin' data-value='${JSON.stringify([data[0][1],data[0][2]])}' data-name='${data[0][1]} ${data[0][2]}' data-node='${data[0][0]}' data-prop='Name' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update name'>
									<i class='material-icons right hover black-text'>mode_edit</i>
								</a>
							    <span class='card-title activator grey-text text-darken-4' for='name'>${data[0][1]} ${data[0][2]}</span>
								<div class='divider'></div>
								<table>
									<tr>
										<td width='20px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Username: </span></td>
										<td class='grey-text truncate' for='username'>${data[0][4]}</td>
										<td width='20px'>
											<a data-for='username' data-cmd='updateAdmin' data-value='${data[0][4]}' data-name='${data[0][1]} ${data[0][2]}' data-node='${data[0][0]}' data-prop='Username' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update username'>
												<i class='material-icons right hover black-text'>mode_edit</i>
											</a>
										</td>
									</tr>
									<tr>
										<td class='bold'><span style='width:80%;display: inline-block;' class='truncate'><i class='mdi-action-verified-user cyan-text text-darken-2'></i> Password</span></td>
										<td></td>
										<td>
											<a data-cmd='updateAdmin' data-name='${data[0][1]} ${data[0][2]}' data-node='${data[0][0]}' data-prop='Password' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update password'>
												<i class='material-icons right hover black-text'>mode_edit</i>
											</a>
										</td>
									</tr>
								</table>
							</div>
						</div>`;
			$("#display_admin").html(content);
			admin.update();
			admin.updatePicture();
		},
		update:function(){
			$("a[data-cmd='updateAdmin']").on('click',function(){
				let _this = this;
				var data = $(this).data();
				var content = `<h5>Change ${data.prop}</h5>
								<form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
							  		<label for='field_${data.prop}' class='active'>${data.prop}: </label>
							  		<input id='field_${data.prop}' value='${data.value}' type='text' name='field_${data.prop}' data-error='.error_${data.prop}'>
							  		<div class='error_${data.prop}'></div>
							  		<button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
							  		<a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
								</form>`;
				$("#modal_confirm .modal-content").html(content);
				$('#modal_confirm .modal-footer').html("");			

				if(data.prop == "Name"){
					content = `<h5>Change ${data.prop}</h5>
									<form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
										<div class="input-field col s6">
									  		<label for='field_${data.prop}' class='active'>First Name: </label>
									  		<input id='field_${data.prop}' value='${data.value[0]}' type='text' name='field_1' data-error='.error_${data.prop}'>
									  		<div class='error_${data.prop}'></div>
										</div>
										<div class="input-field col s6">
									  		<label for='field_${data.prop}' class='active'>Last Name: </label>
									  		<input id='field_${data.prop}' value='${data.value[1]}' type='text' name='field_2' data-error='.error_${data.prop}'>
									  		<div class='error_${data.prop}'></div>
										</div>
								  		<button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
								  		<a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
									</form>`;
					$("#modal_confirm .modal-content").html(content);
					$('#modal_confirm').modal('open');
					$("#form_update").validate({
					    rules: {
					        field_1: {required: true,maxlength: 20},
					        field_2: {required: true,maxlength: 20},
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
							if((data.value[0] == _form[0]['value']) || (data.value[1] == _form[1]['value'])){
								system.alert('You did not even change the value.', function(){});
							}
							else{
								var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',['admin','name',sessionStorage.getItem('kareer'),_form[0]['value'], _form[1]['value']]);
								ajax.done(function(ajax){
									if(ajax == 1){
										$('#modal_confirm').modal('close');	
										$(`.card-title[for='${data.for}'], .display_name`).html(`${_form[0]['value']} ${_form[1]['value']}`);
										$(_this).attr({'data-value':JSON.stringify([_form[0]['value'],_form[1]['value']]), 'data-name':`${_form[0]['value']} ${_form[1]['value']}`});
										system.alert('Name updated.', function(){});
									}
									else{
										system.alert('Failed to update.', function(){});
									}
								});
							}
					    }
					}); 
				}			
				else if(data.prop == "Username"){
					$('#modal_confirm').modal('open');			
					$("#form_update").validate({
					    rules: {
					        field_Username: {required: true,maxlength: 50,checkUsername:true,validateUsername:true},
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
							if(data.value[0] == _form[0]['value']){
								system.alert('You did not even change the value.', function(){});
							}
							else{
								var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',['admin','username',sessionStorage.getItem('kareer'),_form[0]['value']]);
								ajax.done(function(ajax){
									if(ajax == 1){
										$('#modal_confirm').modal('close');	
										$(`.card-title[for='${data.for}']`).html(`${_form[0]['value']} ${_form[1]['value']}`);
										$(_this).attr({'data-value':JSON.stringify([_form[0]['value'],_form[1]['value']]), 'data-name':`${_form[0]['value']} ${_form[1]['value']}`});
										system.alert('Username updated.', function(){});
									}
									else{
										system.alert('Failed to update.', function(){});
									}
								});
							}
					    }
					}); 
				}
				else if(data.prop == "Password"){
					$('#modal_confirm').modal('open');			
					$('#modal_confirm .modal-footer').remove();			
					$("#field_Password").val("");
					$("#field_Password").attr({"type":"password"});
					$("#form_update").append("<p><input type='checkbox' id='showPassword'><label for='showPassword'>Show password</label></p>");
					$("#form_update").append(`<div class='display_notes'>
												*<strong>Password</strong> must contain atleast 1 number, 1 uppercase letter, 1 lowercare letter, 1 special character* and 6 character length. <br/>
												<u>Special characters are ! @ $ % *</u>
											</div>`);

					$("#showPassword").on("click",function(){
						if($(this).is(':checked'))
							$("#field_Password").attr({"type":"text"});						
						else
							$("#field_Password").attr({"type":"password"});						
					})

					$("#form_update").validate({
					    rules: {
					        field_Password: {required: true,maxlength: 50,checkPassword:true,validatePassword:true},
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

							var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',['admin','password',sessionStorage.getItem('kareer'),_form[0]['value']]);
							ajax.done(function(ajax){
								console.log(ajax);
								if(ajax == 1){
									$('#modal_confirm').modal('close');	
									system.alert('Name updated.', function(){});
								}
								else{
									system.alert('Failed to update.', function(){});
								}
							});

							var data = system.ajax('../assets/harmony/Process.php?update-admin',_form);
							data.done(function(data){
								if(data == 1){
									$('#modal_confirm').modal('close');
									system.alert('Password updated.', function(){});
								}
								else{
									system.alert('Cannot process request.', function(){});
								}
							});
					    }
					}); 
				}
			});
		},
		updatePicture:function(){
			window.Cropper;
			$("a[data-cmd='updateAdminPicture']").on('click',function(){
				var data = $(this).data();
				console.log(data);
				var picture = "../assets/images/profile/avatar.png";
				var content = `<h4>Change ${data.prop}</h4>
	  							<div class='row'>
	  								<div class='col s12'>
										<div id='profile_picture2' class='ibox-content no-padding border-left-right '></div>
									</div>
								</div>`;
				$("#modal_confirm .modal-content").html(content);
				$('#modal_confirm').removeClass('modal-fixed-footer');			
				$('#modal_confirm .modal-footer').remove();			
				$('#modal_confirm').modal('open');

	    		var content =   `<div class='image-crop col s12' style='margin-bottom:5px;'>
									<img width='100%' src='${picture}' id='change_picture'>
								</div>
								<div class='btn-group col s12'>
									<label for='inputImage' class='btn blue btn-floating btn-flat tooltipped' data-tooltip='Load image' data-position='top'>
										<input type='file' accept='image/*' name='file' id='inputImage' class='hide'>
										<i class='material-icons right hover white-text'>portrait</i>
									</label>
									<button class='btn blue btn-floating btn-flat tooltipped' data-cmd='cancel' type='button' data-tooltip='Cancel' data-position='top'>
										<i class='material-icons right hover white-text'>close</i>
									</button>
									<button class='btn blue btn-flat hidden right white-text' data-cmd='save' type='button'>
										Save
									</button>
								</div>`;
	    		$("#profile_picture2").html(content);
				$('.tooltipped').tooltip({delay: 50});

	            var $inputImage = $("#inputImage");
	            var status = true;
	            if(window.FileReader){
	                $inputImage.change(function(e) {
	                    var fileReader = new FileReader(),
	                            files = this.files,
	                            file;
	                    file = files[0];

	                    if (/^image\/\w+$/.test(file.type)) {
	                        fileReader.readAsDataURL(file);
	                        fileReader.onload = function (e) {
	                            $inputImage.val("");
						    	$("button[data-cmd='save']").html("Save").removeClass('disabled');
								$('#change_picture').attr('src', e.target.result);
								var image = document.getElementById('change_picture');
								var cropper = new Cropper(image,{
					            	aspectRatio: 1/1,
								    autoCropArea: 0.80,
								    ready:function(){
								    	$("button[data-cmd='save']").removeClass('hidden');
								    	$("button[data-cmd='rotate']").removeClass('hidden');
								    	
							            $("button[data-cmd='save']").click(function(){
									    	$(this).html("Uploading...").addClass('disabled');
									    	if(status){
												var data = system.ajax('../assets/harmony/Process.php?do-updateImage',['admin','picture',sessionStorage.getItem('kareer'),cropper.getCroppedCanvas().toDataURL('image/png')]);
												data.done(function(data){
													console.log(data);
													
													if(data == 1){
														$('#modal_confirm').modal('close');
														$('.profile-image').attr('src', cropper.getCroppedCanvas().toDataURL('image/png'));
														system.alert('Profile picture has been updated.', function(){});
													}
													else{
														system.alert('Failed to upload your picture. File too large.', function(){});
													}
												});
									    		status = false;
									    	}
							            });
								    }
								});

	                            // image.cropper("reset", true).cropper("replace", this.result);

					          //   $("button[data-cmd='rotate']").click(function(){
					          //   	var data = $(this).data('option');
						        	// $image.cropper('rotate', data);
					          //   });

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
					$('#modal_confirm').modal('close');	
	            });
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
    };
}();

var business = function(){
	"use strict";
	return {
		ini:function(){
		    business.list();
		    business.add();
		},
		id:function(){
			return ((window.location.hash).split(';')[2]).split('=')[1];
		},
		get:function(){
			var ajax = system.ajax('../assets/harmony/Process.php?get-businessList',"");
			return ajax.responseText;
		},
		getInfo:function(){
			var ajax = system.ajax('../assets/harmony/Process.php?get-businessInfo',business.id());
			return ajax.responseText;
		},
		getAcountList:function(){
			var ajax = system.ajax('../assets/harmony/Process.php?get-accountslist',business.id());
			return ajax.responseText;
		},
		getJobs:function(){
			var ajax = system.ajax('../assets/harmony/Process.php?get-jobslist',business.id());
			return ajax.responseText;
		},
		add:function(){
			var data = system.xml("pages.xml");
			$(data.responseText).find("addBusiness").each(function(i,content){
				$("#modal_medium .modal-content").html(content);
				$(".action_addBusiness").on('click',function(){
					$('#modal_medium').modal('open');
					$('.action_close').on('click',function(){
						$('#modal_medium').modal('close');
					});

					$("#form_addBusiness").validate({
					    rules: {
					        field_name: {required: true, maxlength: 300},
					        field_phone: {required: true, maxlength: 20},
					        field_email: {required: true, maxlength: 100,email:true},
					        field_address: {required: true, maxlength: 300},
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
							var ajax = system.ajax('../assets/harmony/Process.php?do-addBusiness',[_form[0]['value'],_form[1]['value'],_form[2]['value'],_form[3]['value']]);
							ajax.done(function(ajax){
								console.log(ajax);
								if(ajax == 1){	
									$('#modal_medium').modal('close');	
									system.alert('Business has been added.', function(){});
								}
								else{
									system.alert('Failed to add business.', function(){});
								}
							});
					    }
					});
				});
			});
		},
		addAccount:function(){
			var data = system.xml("pages.xml");
			$(data.responseText).find("addBusinessAccount").each(function(i,content){
				$("#modal_medium .modal-content").html(content);
				$("#modal_medium .modal-footer").remove();

				pass.visibility();
				$("#businessAccounts a[data-cmd='addAccount']").on('click',function(){
					$('#modal_medium').modal('open');
					$('.action_close').on('click',function(){
						$('#modal_medium').modal('close');
					});

					$("#form_addAccount").validate({
					    rules: {
					        field_name: {required: true, maxlength: 300},
					        field_position: {required: true, maxlength: 200},
					        field_email: {required: true, maxlength: 300,email:true,validateEmail:true},
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
						submitHandler: function (form) {
							var _form = $(form).serializeArray();
							var ajax = system.ajax('../assets/harmony/Process.php?do-addBusinessAccount',[business.id(),_form[0]['value'],_form[1]['value'],_form[2]['value'],_form[3]['value']]);
							ajax.done(function(ajax){
								console.log(ajax);
								if(ajax == 1){	
									business.accountList();
									$('#modal_medium').modal('close');	
									system.alert('Business account has been added.', function(){});
								}
								else{
									system.alert('Failed to add business account.', function(){});
								}
							});
					    }
					});
				});
			});
		},
		list:function(){
			let data = JSON.parse(business.get());
			if(data.length>0){
				$("#display_business").removeClass('hidden');
				$("#display_nobusiness").addClass('hidden');
			}
			else{
				$("#display_business").addClass('hidden');
				$("#display_nobusiness").removeClass('hidden');
			}

			$.each(data,function(i,v){
				let logo = ((typeof v[5] == 'object') || (v[5] == ""))? 'icon.png' : v[5];
				$("#display_business table tbody").append(`
					<tr>
						<td><img src="../assets/images/logo/${logo}" width='30px' id='img-${v[0]}'></td>
						<td>${v[3]}</td>
						<td>
							<a href='#cmd=index;content=focusbusiness;id=${v[0]}' data-cmd='view_business' data-value='${v[0]}' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='View Business'>
								<i class='material-icons right hover black-text'>more_vert</i>
							</a>
						</td>
					</tr>
				`);

				$(`img#img-${v[0]}`).on('error',function(){
					$(this).attr({'src':'../assets/images/logo/icon.png'});
				});
			})
		},
		info:function(){
			let data = JSON.parse(business.getInfo());
			let logo = ((typeof data[0][5] == 'object') || (data[0][5] == ""))? 'icon.png' : data[0][5];
			$("#businessInfo").html(`
				<div class='col s12 m4 l3'>
				    <img src='../assets/images/logo/${logo}' width='100%' class='businesslogo'>
				</div>
				<div class='col s12 m8 l9'>
				    <ul class='collection' id='display_businessInfo'>
				        <li class='collection-item'>
				            <a class="secondary-content tooltipped" data-prop='business name' data-cmd='update_business' data-value='${data[0][3]}' data-position='left' data-delay='50' data-tooltip='Update'><i class="material-icons hover black-text">edit</i></a>
				            <strong>Business Name:</strong>
				            <div class='_content'>${data[0][3]}</div>
				        </li>
				        <li class='collection-item'>
				            <a class="secondary-content tooltipped" data-prop='contact number' data-cmd='update_business' data-value='${data[0][2]}' data-position='left' data-delay='50' data-tooltip='Update'><i class="material-icons hover black-text">edit</i></a>
				            <strong>Contact Number:</strong><br/>
				            <div class='_content'>${data[0][2]}</div>
				        </li>
				        <li class='collection-item'>
				            <a class="secondary-content tooltipped" data-prop='email' data-cmd='update_business' data-value='${data[0][6]}' data-position='left' data-delay='50' data-tooltip='Update'><i class="material-icons hover black-text">edit</i></a>
				            <strong>Email Address:</strong>
				            <div class='_content'>${data[0][6]}</div>
				        </li>
				        <li class='collection-item'>
				            <a class="secondary-content tooltipped" data-prop='description' data-cmd='update_business' data-value='${data[0][4]}' data-position='left' data-delay='50' data-tooltip='Update'><i class="material-icons hover black-text">edit</i></a>
				            <strong>Description:</strong>
				            <div class='_content'>${data[0][4]}</div>
				        </li>
				    </ul>
				</div>					
			`);	
			$(`#businessInfo img.businesslogo`).on('error',function(){
				$(this).attr({'src':'../assets/images/logo/icon.png'});
			});
			business.update();
			business.updatePicture();
		},
		accountList:function(){
			let data = JSON.parse(business.getAcountList());
			$.each(data,function(i,v){
				let logo = ((typeof v[5] == 'object') || (v[5] == ""))? '../assets/images/logo/icon.png' : `../assets/images/profile/${v[5]}`;
				$("#businessAccounts .carousel").append(`
                    <div class="carousel-item">
                        <div class="card waves-effect">
                            <div class="card-image" style='background:url("${logo}") center/cover no-repeat' id='img-${v[0]}'></div>
                            <div class="card-content grey lighten-4">
                                <h6>${v[2]}<br/><small>${v[6]}</small></h6>
                            </div>
                        </div>
                    </div>
				`);
			});
		    $('.carousel').carousel({dist:0,shift:10,padding:20,noWrap:true});
			business.addAccount();
		},
		jobsList:function(){
			let data = JSON.parse(business.getJobs());
			if(data.length>0){

			}
			else{
				console.log('no jobs');
			}
		},
		update:function(){
			$("a[data-cmd='update_business']").on('click',function(){
				let _this = this, data = $(this).data();
				// $('#modal_confirm .modal-footer').remove();			
				// $('#modal_confirm .modal-footer').remove();			
				// $('#modal_confirm, #modal_medium').removeClass("modal-fixed-footer");			
				if(data.prop == "business name"){
					var content = `<h5>Change ${data.prop}</h5>
									<form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
								  		<label for='field_name' class='active'>Business Name: </label>
								  		<input id='field_name' value='${data.value}' type='text' name='field_name' data-error='.error_name'>
								  		<div class='error_name'></div>
								  		<button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
								  		<a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
									</form>`;
					$("#modal_confirm .modal-content").html(content);
					$('#modal_confirm').modal('open');
					$("#form_update").validate({
					    rules: {
					        field_name: {required: true,maxlength: 300},
					    },
					    errorElement : 'div',
					    errorPlacement: function(error, element) {
							var placement = $(element).data('error');
							if(placement)
								$(placement).append(error)
							else
								error.insertAfter(element);
						},
						submitHandler: function (form) {
							var _form = $(form).serializeArray();
							if(data.value[0] == _form[0]['value']){
								system.alert('You did not even change the value.', function(){});
							}
							else{
								var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',['business','name',business.id(),_form[0]['value']]);
								ajax.done(function(ajax){
									if(ajax == 1){
										$('#modal_confirm').modal('close');
										$(`#display_businessInfo li:nth-child(1) div._content`).html(_form[0]['value']);
										$(_this).attr({'data-value':_form[0]['value'], 'data-name':`${_form[0]['value']}`});
										system.alert('Name updated.', function(){});
									}
									else{
										system.alert('Failed to update.', function(){});
									}
								});
							}
					    }
					}); 
				}			
				else if(data.prop == "contact number"){

					var content = `<h5>Change ${data.prop}</h5>
									<form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
								  		<label for='field_number' class='active'>Business Name: </label>
								  		<input id='field_number' value='${data.value}' type='text' name='field_number' data-error='.error_number'>
								  		<div class='error_number'></div>
								  		<button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
								  		<a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
									</form>`;
					$("#modal_confirm .modal-content").html(content);
					$('#modal_confirm').modal('open');
					$("#form_update").validate({
					    rules: {
					        field_number: {required: true, maxlength: 300},
					    },
					    errorElement : 'div',
					    errorPlacement: function(error, element) {
							var placement = $(element).data('error');
							if(placement)
								$(placement).append(error)
							else
								error.insertAfter(element);
						},
						submitHandler: function (form) {
							var _form = $(form).serializeArray();
							if(data.value[0] == _form[0]['value']){
								system.alert('You did not even change the value.', function(){});
							}
							else{
								var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',['business','number',business.id(),_form[0]['value']]);
								ajax.done(function(ajax){
									if(ajax == 1){
										$('#modal_confirm').modal('close');
										$(`#display_businessInfo li:nth-child(2) div._content`).html(_form[0]['value']);
										$(_this).attr({'data-value':_form[0]['value'], 'data-name':`${_form[0]['value']}`});
										system.alert('Contact number updated.', function(){});
									}
									else{
										system.alert('Failed to update.', function(){});
									}
								});
							}
					    }
					}); 
				}			
				else if(data.prop == "email"){
					var content = `<h5>Change ${data.prop}</h5>
									<form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
								  		<label for='field_email' class='active'>Business Name: </label>
								  		<input id='field_email' value='${data.value}' type='text' name='field_email' data-error='.error_email'>
								  		<div class='error_email'></div>
								  		<button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
								  		<a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
									</form>`;
					$("#modal_confirm .modal-content").html(content);
					$('#modal_confirm').modal('open');
					$("#form_update").validate({
					    rules: {
					        field_email: {required: true, maxlength: 300, email:true,validateEmail:true},
					    },
					    errorElement : 'div',
					    errorPlacement: function(error, element) {
							var placement = $(element).data('error');
							if(placement)
								$(placement).append(error)
							else
								error.insertAfter(element);
						},
						submitHandler: function (form) {
							var _form = $(form).serializeArray();
							if(data.value[0] == _form[0]['value']){
								system.alert('You did not even change the value.', function(){});
							}
							else{
								var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',['business','email',business.id(),_form[0]['value']]);
								ajax.done(function(ajax){
									if(ajax == 1){
										$('#modal_confirm').modal('close');
										$(`#display_businessInfo li:nth-child(3) div._content`).html(_form[0]['value']);
										$(_this).attr({'data-value':_form[0]['value'], 'data-name':`${_form[0]['value']}`});
										system.alert('Email updated.', function(){});
									}
									else{
										system.alert('Failed to update.', function(){});
									}
								});
							}
					    }
					}); 
				}
				else if(data.prop == "description"){
					var content = `<h4>Change ${data.prop}</h4>
								  <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
						  				<label for='field_price'>${data.prop}: </label>
						  				<div id='field_description'></div>
						  				<div id='display_errorDescription'></div>
								  		<button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
								  		<a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
								  </form>`;
					$("#modal_medium .modal-content").html(content);
					$('#modal_medium').modal('open');

					let editor = system.quill($('#field_description').get(0));
					editor.clipboard.dangerouslyPasteHTML(data.value);

					var limit = 1000;
					editor.on('text-change', function(delta, old, source) {
						if (editor.getLength() > limit) {
							editor.deleteText(limit, editor.getLength());
							$("#field_description").attr({"style":"box-shadow:0px 1px 1px red"});
							$("#display_errorDescription").html("You have reached max input allowed.");
						}
						else{
							$("#field_description").attr({"style":"box-shadow:0px 1px 1px green"});
							$("#display_errorDescription").html("");
						}
					});
					$("#form_update").validate({
						submitHandler: function (form) {
							let _form = editor.root.innerHTML;
							if(data[2] == _form){
								system.alert('You did not even change the product name.', function(){});
							}
							else{
								var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',['business','description',business.id(),_form]);
								ajax.done(function(ajax){
									if(ajax == 1){
										$('#modal_medium').modal('close');
										$(`#display_businessInfo li:nth-child(4) div._content`).html(`${_form}`);
										$(_this).attr({'data-value':_form, 'data-name':`${_form}`});
										system.alert('Description is updated.', function(){});
									}
									else{
										system.alert('Failed to update.', function(){});
									}
								});
							}
					    }
					}); 
				}
			});
		},
		updatePicture:function(){
			window.Cropper;
			$("a[data-cmd='updateAdminPicture']").on('click',function(){
				var data = $(this).data();
				console.log(data);
				var picture = "../assets/images/profile/avatar.png";
				var content = `<h4>Change ${data.prop}</h4>
	  							<div class='row'>
	  								<div class='col s12'>
										<div id='profile_picture2' class='ibox-content no-padding border-left-right '></div>
									</div>
								</div>`;
				$("#modal_confirm .modal-content").html(content);
				$('#modal_confirm').removeClass('modal-fixed-footer');			
				$('#modal_confirm .modal-footer').remove();			
				$('#modal_confirm').modal('open');

	    		var content =   `<div class='image-crop col s12' style='margin-bottom:5px;'>
									<img width='100%' src='${picture}' id='change_picture'>
								</div>
								<div class='btn-group col s12'>
									<label for='inputImage' class='btn blue btn-floating btn-flat tooltipped' data-tooltip='Load image' data-position='top'>
										<input type='file' accept='image/*' name='file' id='inputImage' class='hide'>
										<i class='material-icons right hover white-text'>portrait</i>
									</label>
									<button class='btn blue btn-floating btn-flat tooltipped' data-cmd='cancel' type='button' data-tooltip='Cancel' data-position='top'>
										<i class='material-icons right hover white-text'>close</i>
									</button>
									<button class='btn blue btn-flat hidden right white-text' data-cmd='save' type='button'>
										Save
									</button>
								</div>`;
	    		$("#profile_picture2").html(content);
				$('.tooltipped').tooltip({delay: 50});

	            var $inputImage = $("#inputImage");
	            var status = true;
	            if(window.FileReader){
	                $inputImage.change(function(e) {
	                    var fileReader = new FileReader(),
	                            files = this.files,
	                            file;
	                    file = files[0];

	                    if (/^image\/\w+$/.test(file.type)) {
	                        fileReader.readAsDataURL(file);
	                        fileReader.onload = function (e) {
	                            $inputImage.val("");
						    	$("button[data-cmd='save']").html("Save").removeClass('disabled');
								$('#change_picture').attr('src', e.target.result);
								var image = document.getElementById('change_picture');
								var cropper = new Cropper(image,{
					            	aspectRatio: 1/1,
								    autoCropArea: 0.80,
								    ready:function(){
								    	$("button[data-cmd='save']").removeClass('hidden');
								    	$("button[data-cmd='rotate']").removeClass('hidden');
								    	
							            $("button[data-cmd='save']").click(function(){
									    	$(this).html("Uploading...").addClass('disabled');
									    	if(status){
												var data = system.ajax('../assets/harmony/Process.php?do-updateImage',['admin','picture',sessionStorage.getItem('kareer'),cropper.getCroppedCanvas().toDataURL('image/png')]);
												data.done(function(data){
													console.log(data);
													
													if(data == 1){
														$('#modal_confirm').modal('close');
														$('.profile-image').attr('src', cropper.getCroppedCanvas().toDataURL('image/png'));
														system.alert('Profile picture has been updated.', function(){});
													}
													else{
														system.alert('Failed to upload your picture. File too large.', function(){});
													}
												});
									    		status = false;
									    	}
							            });
								    }
								});

	                            // image.cropper("reset", true).cropper("replace", this.result);

					          //   $("button[data-cmd='rotate']").click(function(){
					          //   	var data = $(this).data('option');
						        	// $image.cropper('rotate', data);
					          //   });

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
					$('#modal_confirm').modal('close');	
	            });
			});
		},
	}
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
			// $(".prettydate").prettydate({
			//     dateFormat: "YYYY-MM-DD hh:mm:ss"
			// });
		},
	}
}();

var pass = {
	visibility:function(){
		let c = 0;
		$(".item-input-password-preview").on('click',function(){
			c++;
			if((c%2)==0){
				$(this).children('i').html('visibility_off');
				$("input[name='field_password']").attr({'type':'password'});
			}
			else{
				$(this).children('i').html('visibility');
				$("input[name='field_password']").attr({'type':'text'});
			}
		});
	}
}