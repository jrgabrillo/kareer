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
			console.log(data);
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
			var content = "", data = JSON.parse(admin.get());
			console.log(data);
			var profile = (data[0][3] == "")?'avatar.jpg':data[0][3];
			admin.nav();
			$("#user-account img.profile-image").attr({"src":"../assets/images/profile/"+profile});
			$("#user-account div div a span.display_name").html(`${data[0][1]} ${data[0][2]}`);

			$("#display_admin").html(`<div id='profile-card' class='card'>
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
									</div>`);

			$(`img.profile-image`).on('error',function(){
				$(this).attr({'src':'../assets/images/logo/icon.png'});
			});

			admin.update();
			admin.updatePicture();
			accountManager.accountAction(data[0][0]); /*id of Action taker*/
			// console.log(accountManager.accountAction(data[0][0]));
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
        getLogs:function(min,max){
            min = ((typeof min == undefined) || (min == null))?0:min;
            max = ((typeof max == undefined) || (max == null))?20:max;
            var data = system.ajax('../assets/harmony/Process.php?get-logs',['admin',min,max]);
            return data.responseText;
        },
        notifications:function(){
            let emp = JSON.parse(admin.getLogs());
            let empContent = "", appContent = "";
            console.log(emp);
            $.each(emp[0],function(i,e){
            	let to = (e[1] == 'update picture')?'':e[2];
            	empContent += `<tr>
	                            <td style="border:1px solid gray"><strong>${e[0]}</strong> ${e[1]} <strong>${to}</strong></td>
	                        </tr>`;
            });
            $("#employerNotifs table tbody").html(empContent);
            $.each(emp[1],function(i,a){
            	appContent += `<tr>
	                            <td style="border:1px solid gray"><strong>${a[0]}</strong> ${a[1]}</td>
	                        </tr>`;
            });
            $("#applicantNotifs table tbody").html(appContent);

            let count = 20, min = 0, max = count;
            let logs = '';
            $("button[data-cmd='load']").on("click",function(){
                min = max;
                max = max+count;
                logs = JSON.parse(admin.getLogs(min,count));
                admin.listLogs(logs);
            });
        },
        listLogs:function(list){
            let empContent = "", appContent = "";
            $.each(list[0],function(i,e){
            	empContent += `<tr>
	                            <td style="border:1px solid gray"><strong>${e[0]}</strong> ${e[1]} <strong>${e[2]}</strong></td>
	                        </tr>`;
            });
            $("#employerNotifs table tbody").append(empContent);
            $.each(list[1],function(i,a){
            	appContent += `<tr>
	                            <td style="border:1px solid gray"><strong>${a[0]}</strong> ${a[1]}</td>
	                        </tr>`;
            });
            $("#applicantNotifs table tbody").append(appContent);
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
		get:function(id){
			var ajax = (!id)?system.ajax('../assets/harmony/Process.php?get-businessList',""):system.ajax('../assets/harmony/Process.php?get-businessInfo',id);
			return ajax.responseText;
		},
		add:function(){
			var data = system.xml("pages.xml");
			$(data.responseText).find("addBusiness").each(function(i,content){
				$("#modal_medium .modal-content").html(content);
				$(".action_addBusiness").on('click',function(){
					$('#modal_medium').modal('open');
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
							var user = JSON.parse(admin.check_access());
							var _form = $(form).serializeArray();
							var ajax = system.ajax('../assets/harmony/Process.php?do-addBusiness',[user[0],_form[0]['value'],_form[1]['value'],_form[2]['value'],_form[3]['value']]);
							ajax.done(function(ajax){
								console.log(ajax);
								if(ajax == 1){	
									$('#modal_medium').modal('close');	
									system.alert('Business has been added.', function(){});
									location.reload();
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
		list:function(){
			let data = JSON.parse(business.get(false));
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
		view:function(){
			let data = JSON.parse(business.get(business.id()));
			let logo = ((typeof data[0][5] == 'object') || (data[0][5] == ""))? 'icon.png' : data[0][5];
			$("#businessInfo").html(`
				<div class='col s12 m4 l3'>
				    <img src='../assets/images/logo/${logo}' width='100%' class='businesslogo'>
		            <a class="secondary-content tooltipped" data-prop='business logo' data-cmd='updateAdminPicture' data-position='left' data-delay='50' data-tooltip='Update'><i class="material-icons hover black-text">photo_camera</i></a>
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
							let user = JSON.parse(admin.check_access());
							var _form = $(form).serializeArray();
							if(data.value[0] == _form[0]['value']){
								system.alert('You did not even change the value.', function(){});
							}
							else{
								var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[user[0],'business','name',business.id(),_form[0]['value']]);
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
							let user = JSON.parse(admin.check_access());
							var _form = $(form).serializeArray();
							if(data.value[0] == _form[0]['value']){
								system.alert('You did not even change the value.', function(){});
							}
							else{
								var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[user[0],'business','number',business.id(),_form[0]['value']]);
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
							let user = JSON.parse(admin.check_access());
							var _form = $(form).serializeArray();
							if(data.value[0] == _form[0]['value']){
								system.alert('You did not even change the value.', function(){});
							}
							else{
								var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[user[0],'business','email',business.id(),_form[0]['value']]);
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
							let user = JSON.parse(admin.check_access());
							let _form = editor.root.innerHTML;
							if(data[2] == _form){
								system.alert('You did not even change the product name.', function(){});
							}
							else{
								var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[user[0],'business','description',business.id(),_form]);
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
									<button class='btn blue btn-flat hidden right white-text' data-cmd='save' type='button'>Save</button>
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
									    		status = false;
												var data = system.ajax('../assets/harmony/Process.php?do-updateImage',['business','picture',business.id(),cropper.getCroppedCanvas().toDataURL('image/png')]);
												data.done(function(data){
													if(data == 1){
														$('#modal_confirm').modal('close');
														$(`#businessInfo img.businesslogo`).attr('src', cropper.getCroppedCanvas().toDataURL('image/png'));
														system.alert('Profile picture has been updated.', function(){});
													}
													else{
											    		status = true;
												    	$(this).html("Save").removeClass('disabled');
														system.alert('Failed to upload your picture.', function(){});
													}
												});
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

var accountManager = function(){
	"use strict";
	return {
		get:function(id){
			var ajax = (!id)?"all":system.ajax('../assets/harmony/Process.php?get-accountslist',id);
			return ajax.responseText;
		},
		list:function(){
			let data = JSON.parse(accountManager.get(business.id()));

			$.each(data,function(i,v){
				let logo = ((typeof v[5] == 'object') || (v[5] == ""))? '../assets/images/logo/icon.png' : `../assets/images/profile/${v[5]}`;
				$("#businessAccounts .carousel").append(`
                    <div class="carousel-item">
                        <div class="card waves-effect profile" data-content='${JSON.stringify(v)}'>
                            <div class="card-image" style='background:url("${logo}") center/cover no-repeat' id='img-${v[0]}'></div>
                            <div class="card-content grey lighten-4">
                                <h6>${v[2]}<br/><small>${v[6]}</small></h6>
                            </div>
                        </div>
                    </div>
				`);
			});
		    $('.carousel').carousel({dist:0,shift:10,padding:20,noWrap:true});
			accountManager.add();

			$(".card.profile").on('click',function(){
				let data = $(this).data();
				accountManager.view(data);
			});
		},
		add:function(){
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
							var user = JSON.parse(admin.check_access());
							var _form = $(form).serializeArray();
							var ajax = system.ajax('../assets/harmony/Process.php?do-addBusinessAccount',[user[0],business.id(),_form[0]['value'],_form[1]['value'],_form[2]['value'],_form[3]['value']]);
							ajax.done(function(ajax){
								if(ajax == 1){	
									accountManager.list();
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
		view:function(data){
			data = data.content;
			let picture = ((typeof data[5] == 'object') || (data[5] == ""))? 'icon.png' : data[5];
			console.log(data);
			let status = (data[8] == 1)?['deactivate','lock','red']:['activate','lock_open','grey'];
			$("#modal_medium .modal-content").html(`
				<button class="btn-floating btn-small btn-flat waves-effect white modal-action modal-close right"><i class="material-icons grey-text">close</i></button>
				<div id='accountInfo'>
					<div class='row'>
						<div class='col s12 m4 l4 offset-m4 offset-l4'>
						    <img src='../assets/images/profile/${picture}' width='100%' class='profile_picture'>
				            <a class="secondary-content tooltipped ${status[2]}" data-cmd='action_account' data-value='${JSON.stringify([data[0],status[0]])}' data-position='left' data-delay='50' data-tooltip='${status[0]} account'><i class="material-icons white-text">${status[1]}</i></a>
						</div>
					</div>
					<div class='row'>
						<div class='col s12 text-center'>
							<h5>${data[2]}<br/><small>${data[6]}<br/>${data[3]}</small></h5>
						</div>
					</div>
				</div>
			`);
			$(`#accountInfo img.profile_picture`).on('error',function(){
				$(this).attr({'src':'../assets/images/logo/icon.png'});
			});
			$('#modal_medium').modal('open');

			this.accountAction();
		},
		accountAction:function(){
			$("a[data-cmd='action_account']").on('click',function(){
				let data = $(this).data('value'), title = (data[1] == 'deactivate')?['deactive','lock_open','unlock','red']:['activate','lock','lock','grey'];
				console.log(data);
				$("#modal_confirm .modal-content").html(
					`<h5>Are you sure you want to ${title[0]} this account?</h5>
					<textarea class='materialize-textarea' data-field='field_description' name='field_description' placeholder='Remarks'></textarea>
			  		<button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
			  		<a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>`
				);

				$('#modal_confirm').modal('open');
				$("button[data-cmd='button_proceed']").on('click',function(){
					let remarks = $("textarea[data-field='field_description']").val();
					console.log(remarks);
					if(remarks.length == 0){
							Materialize.toast('Remarks is required.',4000);
					}
					else if(remarks.length > 800){
							Materialize.toast('Statement is too long.',4000);
					}
					else{
						let user = JSON.parse(admin.check_access());
						var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[user[0],'employer','status',data[0],data[1],remarks]);
						ajax.done(function(ajax){
							console.log(ajax);
							if(ajax == 1){
								$('#modal_confirm').modal('close');
								$("a[data-cmd='action_account']").addClass('disabled');
								$("a[data-cmd='action_account'] i").html(title[1]).removeClass('white-text').addClass('black-text');
								$("a[data-cmd='action_account']").attr({'data-value':JSON.stringify([data[0],title[2]])});
								system.alert('Account updated.', function(){});
							}
							else{
								system.alert('Failed to update.', function(){});
							}
						});
					}				
				});
			});
		}
	}
}();

var applicant = function(){
	"use strict";
	return {
		ini:function(){
			this.list();
			console.log(0);
		},
		id:function(){
			return ((window.location.hash).split(';')[2]).split('=')[1];
		},
		get:function(id){
			var ajax = (!id)?system.ajax('../assets/harmony/Process.php?get-applicantList',""):system.ajax('../assets/harmony/Process.php?get-applicantInfo',id);
			return ajax.responseText;
		},
		getAcad:function(id){
			var ajax = system.ajax('../assets/harmony/Process.php?get-applicantAcad',id);
			return ajax.responseText;
		},
		getCareer:function(id){
			var ajax = system.ajax('../assets/harmony/Process.php?get-applicantCareer',id);
			return ajax.responseText;
		},
		getJobInterests:function(id){
			var ajax = system.ajax('../assets/harmony/Process.php?get-applicantJobs',id);
			return ajax.responseText;
		},
	 	list: function(){
			let data = JSON.parse(this.get(false));
			if(data.length>0){
				$("#display_applicant").removeClass('hidden');
				$("#display_noApplicant").addClass('hidden');
			}
			else{
				$("#display_applicant").addClass('hidden');
				$("#display_noApplicant").removeClass('hidden');
			}

			$.each(data,function(i,v){
				let picture = ((new RegExp('facebook|google','i')).test(v[3]))? v[3] : ((typeof v[3] == 'object') || (v[3] == ""))? '../assets/images/profile/icon.png' : `../assets/images/logo/${v[3]}`;
				$("#display_applicant table tbody").append(`
					<tr>
						<td><img src="${picture}" width='30px' id='img-${v[0]}'></td>
						<td>${v[1]} ${v[2]}</td>
						<td>
							<a href='#cmd=index;content=focusapplicant;id=${v[0]}' data-cmd='view_business' data-value='${v[0]}' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='View Applicant'>
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
		view:function(){
			let data = JSON.parse(this.get(this.id()));
			data = data[0];
			let picture = ((new RegExp('facebook|google','i')).test(data[18]))? data[18] : ((typeof data[18] == 'object') || (data[18] == ""))? '../assets/images/logo/icon.png' : `../assets/images/profile/${data[18]}`;
			let auth = (data[4] == "fb-oauth")?'Facebook':(data[4] == "google-auth")?'Google':'Kareer Website', account_id = (data[5] == "")?data[0]:data[5];
			let status = (data[6] == 1)?['deactivate','lock','red']:['activate','lock_open','grey'];

			$("#applicantInfo").html(`
                <div class='row'>
                    <div class='col s3'>
                        <img src='${picture}' width='100%' class='profile_picture'>
			            <a class="secondary-content tooltipped btn-flat btn-floating ${status[2]}" data-cmd='action_account' data-value='${JSON.stringify([data[0],status[0]])}' data-position='left' data-delay='50' data-tooltip='${status[0]} account'><i class="material-icons white-text">${status[1]}</i></a>
                    </div>
                    <div class='col s9'>
                        <h6>${data[8]} ${data[9]}<br/><small>${data[2]}</small></h6>
                        <div class='col s12 grey lighten-2'>${data[1]}</div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col s12' id='display_personalInformation'>
                    	<strong>Personal Information</strong>
                        <table>
                        	<thead>
                        		<tr><td width='100px'></td><td></td></tr>
                        	</thead>
                        	<tbody>
                        		<tr><td>Gender:</td><td>${data[11]}</td></tr>
                        		<tr><td>Date of Birth:</td><td>${data[12]}</td></tr>
                        		<tr><td>Address:</td><td>${data[13]}</td></tr>
                        		<tr><td>Citizenship:</td><td>${data[14]}</td></tr>
                        		<tr><td>Height:</td><td>${data[15]}</td></tr>
                        		<tr><td>Weight:</td><td>${data[16]}</td></tr>
                        		<tr><td>Religion:</td><td>${data[17]}</td></tr>
                        	</tbody>
                        </table>
                    </div>
                </div>
                <div class='row'>
                    <div class='col s12'>
                    	<strong>Account Information</strong>
                        <table>
                        	<thead>
                        		<tr><td width='100px'></td><td></td></tr>
                        	</thead>
                        	<tbody>
                        		<tr><td>Login Type:</td><td>${auth}</td></tr>
                        		<tr><td>Account ID:</td><td>${account_id}</td></tr>
                        	</tbody>
                        </table>
                    </div>
                </div>
                <div class='row' id='display_acad'></div>
                <div class='row' id='display_career'></div>
			`);

			$(`img.profile_picture`).on('error',function(){
				$(this).attr({'src':'../assets/images/logo/icon.png'});
			});

			this.viewAcad();
			this.viewCareer();
			this.viewJobs();
			this.accountAction();
		},
		viewJobs:function(){
			let data = JSON.parse(this.getJobInterests(this.id()));
			if(data.length > 0){
				$("#applicantJobs .row").html(`
				`);	
			}
			else{
				$("#applicantJobs .row").html(`
                    <div class="col s12 m6 offset-m3">
                        <h6 class="text-center grey-text">No interests in applying for a job.</h6>
                    </div>
				`);	
			}
		},
		viewAcad:function(){
			let data = JSON.parse(this.getAcad(this.id())), level = ["Elementary","High School","College","Vocational","Master's Degree","Doctorate Degree"];
			if(data[0][0] == null){
				$("#display_acad").remove();
			}
			else{
				$("#display_acad").append(`
	                <div class='col s12'>
	                	<strong>Academic Information</strong>
	                    <table class='striped'>
	                    	<thead>
	                    		<tr><td width='100px'></td><td></td><td></td></tr>
	                    	</thead>
	                    	<tbody></tbody>
	                    </table>
	                </div>
				`);
				$.each(data,function(i,v){
					$.each(level,function(a,b){
						if(v[1] == b){
							$("#display_acad tbody").append(`
								<tr><td>${v[1]}</td><td>${v[2]} <br/ ><small>${v[3]}</small></td><td><span class='right'>${v[6]}</span></td></tr>
							`);
							return false;
						}
					});
				})
			}
		},
		viewCareer:function(){
			let data = JSON.parse(this.getCareer(this.id()));
			if(data[0][0] == null){
				$("#display_career").remove();
			}
			else{
				$("#display_career").html(`
	                <div class='col s12'>
	                	<strong>Career Information</strong>
	                    <table class='striped'>
	                    	<thead>
	                    		<tr><td width='150px'></td><td></td><td width='200px'</td></tr>
	                    	</thead>
	                    	<tbody></tbody>
	                    </table>
	                </div>
				`);
				$.each(data,function(i,v){
					$("#display_career tbody").append(`
						<tr><td>${v[3]}</td><td>${v[4]}</td><td><span class='right'>${v[1]} - ${v[2]}</span></td></tr>
					`)
				});
			}
		},
		accountAction:function(){
			$("a[data-cmd='action_account']").on('click',function(){
				let data = $(this).data('value'), title = (data[1] == 'deactivate')?['deactive','lock_open','unlock','red']:['activate','lock','lock','grey'];
				console.log(data);
				$("#modal_confirm .modal-content").html(
					`<h5>Are you sure you want to ${title[0]} this account?</h5>
					<textarea class='materialize-textarea' data-field='field_description' name='field_description' placeholder='Remarks'></textarea>
			  		<button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
			  		<a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>`
				);
				$('#modal_confirm').modal('open');

				$("button[data-cmd='button_proceed']").on('click',function(){
					let remarks = $("textarea[data-field='field_description']").val();
					console.log(remarks);
					if(remarks.length == 0){
							Materialize.toast('Remarks is required.',4000);
					}
					else if(remarks.length > 800){
							Materialize.toast('Statement is too long.',4000);
					}
					else{
						let user = JSON.parse(admin.check_access());
						var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[user[0],'applicant','status',applicant.id(),data[1],remarks]);
						ajax.done(function(ajax){
							console.log(ajax);
							if(ajax == 1){
								$('#modal_confirm').modal('close');
								$("a[data-cmd='action_account']").addClass('disabled');
								$("a[data-cmd='action_account'] i").html(title[1]).removeClass('white-text').addClass('black-text');
								$("a[data-cmd='action_account']").attr({'data-value':JSON.stringify([data[0],title[2]])});
								system.alert('Account updated.', function(){});
							}
							else{
								system.alert('Failed to update.', function(){});
							}
						});		
					}		
				});
			});
		}
	}
}();

var jobs = function(){
	"use strict";
	return {
		get:function(id){
			var ajax = (!id)?system.ajax('../assets/harmony/Process.php?get-applicantList',""):system.ajax('../assets/harmony/Process.php?get-jobslist',id);
			return ajax.responseText;
		},
		list:function(){
			let data = JSON.parse(jobs.get(business.id())), content = "", chip = "", skills = "";
			if(data.length>0){
				console.log(data);
	            $.each(data, function(i, v) {
	                let status = (v[10] == 1)?'Active':'Inactive';
	                skills = JSON.parse(v[7]);
	                chip = "";
	                $.each(skills, function(i, s) {
	                    chip += `<a class="chip">${s}</a>`;
	                });
	                $("#businessJobs table tbody").append(`
	                    <tr>
	                        <td widtd="50px" class="center">${status}</td>
	                        <td widtd="300px" class="center">${v[6]}</td>
	                        <td widtd="150px" class="center">${v[9]}</td>
	                        <td widtd="200px" class="center">${chip}</td>
	                        <td widtd="150px" class="center">${v[8]}</td>
	                    </tr>
	                `);
	            });
	            $('h6.text-center').addClass('hide');
			}
			else{
				console.log('no jobs');
			}
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