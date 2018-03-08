var employer = function() {
    "use strict";
    return {
        nav: function() {
            var content = "",
                data = employer.get();
            data = JSON.parse(data);
            var profile = (data[0][5] == null) ? 'avatar.png' : data[0][5];

            $("#user-account img.profile-image").attr({ "src": "../assets/images/profile/" + profile });
            $("#user-account div div a span.display_name").html(data[0][2]);
        },
        ini: function() {
            var data = admin.check_access();
            if (data != 0) {
                employer.display();
            }
        },
        get: function() {
            var ajax = system.ajax('../assets/harmony/Process.php?get-accountBusinessManager', "");
            return ajax.responseText;
        },
        display: function() {
            var content = "",
                data = employer.get();
            data = JSON.parse(data);
            var profile = (data[0][5] == null) ? 'avatar.png' : data[0][5];
            employer.nav();
            $("#user-account img.profile-image").attr({ "src": "../assets/images/profile/" + profile });
            $("#user-account div div a span.display_name").html(data[0][2]);

            $("#display_employer").html(`<div id='profile-card' class='card'>
										<div class='card-content'>
										    <div class='responsive-img activator card-profile-image circle'>
										    	<img src='../assets/images/profile/${profile}' alt='' class='circle profile-image'>
										    	<a data-cmd='updateAdminPicture' data-value='${profile}' data-name='${data[0][1]} ${data[0][2]}' data-node='${data[0][0]}' data-prop='Picture' class='btn waves-effect white-text no-shadow black' style='font-size: 10px;z-index: 1;padding: 0 12px;top:40px;'>Change</a>
											</div>
											<a data-for='name' data-cmd='updateAdmin' data-value='${JSON.stringify([data[0][2]])}' data-name='${data[0][2]}' data-node='${data[0][0]}' data-prop='Name' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update name'>
												<i class='material-icons right hover black-text'>mode_edit</i>
											</a>
										    <span class='card-title activator grey-text text-darken-4' for='name'>${data[0][2]}</span>
											<div class='divider'></div>
											<table>
												<tr>
													<td width='20px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Username: </span></td>
													<td class='grey-text truncate' for='username'>${data[0][3]}</td>
													<td width='20px'>
														<a data-for='username' data-cmd='updateAdmin' data-value='${data[0][3]}' data-name='${data[0][1]} ${data[0][2]}' data-node='${data[0][0]}' data-prop='Username' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update username'>
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

            $(`img.profile-image`).on('error', function() {
                $(this).attr({ 'src': '../assets/images/logo/icon.png' });
            });

            employer.update();
            employer.updatePicture();
        },
        update: function() {
            $("a[data-cmd='updateAdmin']").on('click', function() {
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

                if (data.prop == "Name") {
                    content = `<h5>Change ${data.prop}</h5>
									<form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
										<div class="input-field col s6">
									  		<label for='field_${data.prop}' class='active'>First Name: </label>
									  		<input id='field_${data.prop}' value='${data.value[0]}' type='text' name='field_1' data-error='.error_${data.prop}'>
									  		<div class='error_${data.prop}'></div>
										</div>
										
								  		<button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
								  		<a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
									</form>`;
                    $("#modal_confirm .modal-content").html(content);
                    $('#modal_confirm').modal('open');
                    $("#form_update").validate({
                        rules: {
                            field_1: { required: true, maxlength: 20 },
                            field_2: { required: true, maxlength: 20 },
                        },
                        errorElement: 'div',
                        errorPlacement: function(error, element) {
                            var placement = $(element).data('error');
                            if (placement) {
                                $(placement).append(error)
                            } else {
                                error.insertAfter(element);
                            }
                        },
                        submitHandler: function(form) {
                            var _form = $(form).serializeArray();
                            if ((data.value[0] == _form[0]['value'])) {
                                system.alert('You did not even change the value.', function() {});
                            } else {
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', ['employer', 'name', sessionStorage.getItem('kareer'), _form[0]['value']]);
                                ajax.done(function(ajax) {
                                    console.log(ajax);
                                    if (ajax == 1) {
                                        $('#modal_confirm').modal('close');
                                        $(`.card-title[for='${data.for}'], .display_name`).html(`${_form[0]['value']}`);
                                        $(_this).attr({ 'data-value': JSON.stringify([_form[0]['value']]), 'data-name': `${_form[0]['value']}` });
                                        system.alert('Name updated.', function() {});
                                    } else {
                                        system.alert('Failed to update.', function() {});
                                    }
                                });
                            }
                        }
                    });
                } else if (data.prop == "Username") {
                    $('#modal_confirm').modal('open');
                    $("#form_update").validate({
                        rules: {
                            // field_Username: {required: true,maxlength: 50,checkUsername:true,validateUsername:true},
                        },
                        errorElement: 'div',
                        errorPlacement: function(error, element) {
                            var placement = $(element).data('error');
                            if (placement) {
                                $(placement).append(error)
                            } else {
                                error.insertAfter(element);
                            }
                        },
                        submitHandler: function(form) {
                            var _form = $(form).serializeArray();
                            if (data.value[0] == _form[0]['value']) {
                                system.alert('You did not even change the value.', function() {});
                            } else {
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', ['employer', 'username', sessionStorage.getItem('kareer'), _form[0]['value']]);
                                ajax.done(function(ajax) {
                                    console.log(ajax);
                                    if (ajax == 1) {
                                        $('#modal_confirm').modal('close');
                                        $(`.card-title[for='${data.for}']`).html(`${_form[0]['value']}`);
                                        $(_this).attr({ 'data-value': JSON.stringify([_form[0]['value']]), 'data-name': `${_form[0]['value']} }` });
                                        system.alert('Username updated.', function() {});
                                    }
                                    else {
                                        system.alert('Failed to update.', function() {});
                                    }
                                });
                            }
                        }
                    });
                } else if (data.prop == "Password") {
                    $('#modal_confirm').modal('open');
                    $('#modal_confirm .modal-footer').remove();
                    $("#field_Password").val("");
                    $("#field_Password").attr({ "type": "password" });
                    $("#form_update").append("<p><input type='checkbox' id='showPassword'><label for='showPassword'>Show password</label></p>");
                    $("#form_update").append(`<div class='display_notes'>
												*<strong>Password</strong> must contain atleast 1 number, 1 uppercase letter, 1 lowercare letter, 1 special character* and 6 character length. <br/>
												<u>Special characters are ! @ $ % *</u>
											</div>`);

                    $("#showPassword").on("click", function() {
                        if ($(this).is(':checked'))
                            $("#field_Password").attr({ "type": "text" });
                        else
                            $("#field_Password").attr({ "type": "password" });
                    })

                    $("#form_update").validate({
                        rules: {
                            field_Password: { required: true, maxlength: 50, checkPassword: true, validatePassword: true },
                        },
                        errorElement: 'div',
                        errorPlacement: function(error, element) {
                            var placement = $(element).data('error');
                            if (placement) {
                                $(placement).append(error)
                            } else {
                                error.insertAfter(element);
                            }
                        },
                        submitHandler: function(form) {
                            var _form = $(form).serializeArray();

                            var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', ['employer', 'password', sessionStorage.getItem('kareer'), _form[0]['value']]);
                            ajax.done(function(ajax) {
                                console.log(ajax);
                                if (ajax == 1) {
                                    $('#modal_confirm').modal('close');
                                    system.alert('Name updated.', function() {});
                                } else {
                                    system.alert('Failed to update.', function() {});
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
                                                var data = system.ajax('../assets/harmony/Process.php?do-updateImage',['employer','picture',sessionStorage.getItem('kareer'),cropper.getCroppedCanvas().toDataURL('image/png')]);
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
    };
}();

var jobPosts = function() {
	"use strict";
	return {
        get:function(){
        },
	    add: function() {
	        var data = system.xml("pages.xml");
				$(data.responseText).find("moveToFull").each(function(i,content){
					$("#modal_medium .modal-content").html(content);
					$("a[data-cmd='add_job-post']").on('click',function(){
						$('#modal_medium').modal('open');
						$("#form_full").validate({
						    rules: {

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
								var data = employer.get();
	        					data = JSON.parse(data);
								var ajax = system.ajax('../assets/harmony/Process.php?set-postJob',[data[0][0],data[0][1],_form[0]['value'],_form[1]['value'],_form[2]['value'],_form[3]['value'],_form[4]['value']]);
								ajax.done(function(ajax){
									console.log(ajax);
									if(ajax == 1){	
										$('#modal_medium').modal('close');	
										system.alert('Posted.', function(){});
									}
									else{
										system.alert('Failed to post.', function(){});
									}
								});
						    }
						});
					});
				});
	    },
	    view: function() {
	        var data = employer.get();
	        data = JSON.parse(data);
	        var id = data[0][0];
	        var ajax = system.ajax('../assets/harmony/Process.php?get-employerJobsPosts',id);
	       	ajax.done(function(ajax){
				data = JSON.parse(ajax);	
			});
	        var content = "", actions = "";
	        content += 	"<div class='col s12 m6 l12'>"+
						    "	<div id='profile-account' class='card'>"+
						    " 			<a class='btn-flat btn-sm btn-block button_success' data-cmd='add_job-post' style='background-color: gray;'><i class='material-icons right' style='color:cyan;'>add</i></a>"+
						    "		<div class='row' style='padding-left:2%;'>";
			
	        $.each(data,function(i,v){
                if(Number(v[9]) == 1){
                    status = "active";
                    var actions = "<a href='#cmd=index;content=job;"+v[0]+"' data-cmd='activatePost' data-name='"+data[0][2]+"' data-node='"+v[0]+"' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Deactivate account' data-cmd='update'>"+
                                  " <i class='tiny material-icons' style='padding-right:0px;color:black;;'>create</i>"+
                                  "</a>";   
                }
                else if(Number(v[9]) == 2){
                    status = "Pending";
                    var actions = "<a href='#cmd=index;content=job;"+v[0]+"' data-cmd='pendingPost' data-name='"+data[0][2]+"' data-node='"+data[0][0]+"' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Activate account' data-cmd='update'>"+
                                  " <i class='tiny material-icons' style='padding-right:0px;color:black;;'>create</i>"+
                                  "</a>";   
                }
                else{
                    status = "Full";
                    var actions = "<a href='#cmd=index;content=job;"+v[0]+"' data-cmd='fullPost' data-name='"+data[0][2]+"' data-node='"+data[0][0]+"' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Activate account' data-cmd='update'>"+
                                  " <i class='tiny material-icons' style='padding-right:0px;color:black;;'>create</i>"+
                                  "</a>";   
                }
				   	content +=	"		 	<div class='' style='margin-top:20px;'></div>"+
				   				"        	<span style='display: inline-block;font-size:20px;' class='truncate'><i class='mdi-communication-email cyan-text text-darken-2'></i> Description: "+v[3]+"</span>"+		
								"		 	<div class='divider'></div>"+
								"        	<span style='display: inline-block;font-size:20px;' class='truncate'><i class='mdi-communication-email cyan-text text-darken-2'></i> Vacancy Date: "+v[4]+"</span>"+						
								"		 	<div class='divider'></div>"+
								"        	<span style='display: inline-block;font-size:20px;' class='truncate'><i class='mdi-communication-email cyan-text text-darken-2'></i> Job Title: "+v[5]+"</span>"+						
								"		 	<div class='divider'></div>"+
								"        	<span style='display: inline-block;font-size:20px;' class='truncate'><i class='mdi-communication-email cyan-text text-darken-2'></i> Skills: "+v[6]+"</span>"+						
								"		 	<div class='divider'></div>"+
                                "           <span style='display: inline-block;font-size:20px;' class='truncate'><i class='mdi-communication-email cyan-text text-darken-2'></i> Salary Range: "+v[7]+"</span>"+                        
                                "           <div class='divider'></div>"+
								"        	<span style='display: inline;font-size:20px;' class='truncate'><i class='mdi-communication-email cyan-text text-darken-2'></i> Status: "+status+actions+"</span>"+          
                                "		 	<div class='divider'></div><br/><br/>"+
								"		 	<div class='divider' style='border:1px solid grey ! important;'></div>";
	        });	

	        content +=	"		</div>"+
				    	"	</div>"+
			    		"</div>";
			$("#job-post").html(content);
			jobPosts.add();
            jobPosts.activate();
            jobPosts.Pending();
            jobPosts.Full();
	    },
        Full:function(){
            $("a[data-cmd='fullPost']").on('click',function(){
                console.log('deactivaded');
                var data = $(this).data();
                var id = data.node;
                // console.log(id);
                var data = system.xml("pages.xml");
                $(data.responseText).find("moveToPending").each(function(i,content){
                    $("#modal_medium .modal-content").html(content);
                        $('#modal_medium').modal('open');
                        $("#form_pending").validate({
                            rules: {

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
                                var ajax = system.ajax('../assets/harmony/Process.php?set-pending',id);
                                ajax.done(function(ajax){
                                    if(ajax == 1){  
                                        $('#modal_medium').modal('close');  
                                        system.alert('Posted.', function(){});
                                        location.reload();
                                    }
                                    else{
                                        system.alert('Failed to post.', function(){});
                                    }
                                });
                            }
                        });
                });
            });
        },
        Pending:function(){
            $("a[data-cmd='pendingPost']").on('click',function(){
                console.log('pending');
                var data = $(this).data();
                var id = data.node;
                // console.log(id);
                 var data = system.xml("pages.xml");
                $(data.responseText).find("moveToActive").each(function(i,content){
                    $("#modal_medium .modal-content").html(content);
                        $('#modal_medium').modal('open');
                        $("#form_active").validate({
                            rules: {

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
                                var ajax = system.ajax('../assets/harmony/Process.php?set-active',id);
                                ajax.done(function(ajax){
                                    console.log(ajax);
                                    if(ajax == 1){  
                                        $('#modal_medium').modal('close');  
                                        system.alert('Posted.', function(){});
                                        location.reload();
                                    }
                                    else{
                                        system.alert('Failed to post.', function(){});
                                    }
                                });
                            }
                        });
                });
               
            });
        },
        activate:function(){
            $("a[data-cmd='activatePost']").on('click',function(){
                console.log('activate');
                var data = $(this).data();
                var id = data.node;
                // console.log(id);
                 var data = system.xml("pages.xml");
                $(data.responseText).find("moveToFull").each(function(i,content){
                    $("#modal_medium .modal-content").html(content);
                        $('#modal_medium').modal('open');
                        $("#form_full").validate({
                            rules: {

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
                                var ajax = system.ajax('../assets/harmony/Process.php?set-full',id);
                                ajax.done(function(ajax){
                                    console.log(ajax);
                                    if(ajax == 1){  
                                        $('#modal_medium').modal('close');  
                                        system.alert('Posted.', function(){});
                                        location.reload();
                                    }
                                    else{
                                        system.alert('Failed to post.', function(){});
                                    }
                                });
                            }
                        });
                });
                
            });
        },
	}//end
}();

var pass = {
    visibility: function() {
        let c = 0;
        $(".item-input-password-preview").on('click', function() {
            c++;
            if ((c % 2) == 0) {
                $(this).children('i').html('visibility_off');
                $("input[name='field_password']").attr({ 'type': 'password' });
            } else {
                $(this).children('i').html('visibility');
                $("input[name='field_password']").attr({ 'type': 'text' });
            }
        });
    }

}
