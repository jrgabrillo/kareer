var employer = function() {
    "use strict";
    return {
        ini: function() {
            var data = employer.check_access();
            if (data != 0) {
                employer.display();
            }
        },
        check_access: function(){
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
        nav: function() {
            var content = "", data = JSON.parse(employer.get());
            var profile = (data[0][5] == null) ? 'avatar.png' : data[0][5];
            $("#user-account img.profile-image").attr({ "src": `../assets/images/profile/${profile}`});
            $("#user-account div div a span.display_name").html(data[0][2]);
        },
        get: function() {
            let ajax = system.ajax('../assets/harmony/Process.php?get-accountBusinessManager', "");
            return ajax.responseText;
        },
        display: function() {
            var content = "",data = JSON.parse(employer.get())[0]
            var profile = (data[5] == null) ? 'avatar.png' : data[5];
            localStorage.setItem('business_id',data[1]);
            // localStorage.setItem('account_id',data[0]);

            $("#user-account img.profile-image").attr({ "src": "../assets/images/profile/" + profile });
            $("#user-account div div a span.display_name").html(data[2]);

            $("#display_employer").html(`<div id='profile-card' class='card'>
                                        <div class='card-content'>
                                            <div class='responsive-img activator card-profile-image circle'>
                                                <img src='../assets/images/profile/${profile}' alt='' class='circle profile-image'>
                                                <a data-cmd='updateAdminPicture' data-value='${profile}' data-name='${data[1]} ${data[2]}' data-node='${data[0]}' data-prop='Picture' class='btn waves-effect white-text no-shadow black' style='font-size: 10px;z-index: 1;padding: 0 12px;top:40px;'>Change</a>
                                            </div>
                                            <a data-for='name' data-cmd='updateAdmin' data-value='${JSON.stringify([data[2]])}' data-name='${data[2]}' data-node='${data[0]}' data-prop='Name' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update name'>
                                                <i class='material-icons right hover black-text'>mode_edit</i>
                                            </a>
                                            <span class='card-title activator grey-text text-darken-4' for='name'>${data[2]}</span>
                                            <div class='divider'></div>
                                            <table>
                                                <tr>
                                                    <td width='20px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Username: </span></td>
                                                    <td class='grey-text truncate' for='username'>${data[3]}</td>
                                                    <td width='20px'>
                                                        <a data-for='username' data-cmd='updateAdmin' data-value='${data[3]}' data-name='${data[1]} ${data[2]}' data-node='${data[0]}' data-prop='Username' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update username'>
                                                            <i class='material-icons right hover black-text'>mode_edit</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class='bold'><span style='width:80%;display: inline-block;' class='truncate'><i class='mdi-action-verified-user cyan-text text-darken-2'></i> Password</span></td>
                                                    <td></td>
                                                    <td>
                                                        <a data-cmd='updateAdmin' data-name='${data[1]} ${data[2]}' data-node='${data[0]}' data-prop='Password' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update password'>
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
            $('.tooltipped').tooltip({delay: 50});
            business.view(data[1]);
            accountManager.list(data[1]);
            accountManager.add(data[1]);
            this.nav();
            this.update();
            this.updatePicture();
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
                                $(placement).append(error);
                            } 
                            else {
                                error.insertAfter(element);
                            }
                        },
                        submitHandler: function(form) {
                            // var id = JSON.parse(employer.check_access());
                            var _form = $(form).serializeArray();
                            if (data.value[0] == _form[0]['value']) {
                                system.alert('You did not even change the value.', function() {});
                            } 
                            else {
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'),'employer', 'name',  _form[0]['value']]);
                                ajax.done(function(ajax) {
                                    if (ajax == 1) {
                                        $('#modal_confirm').modal('close');
                                        $(`.card-title[for='${data.for}'], .display_name`).html(`${_form[0]['value']}`);
                                        $(_this).attr({ 'data-value': JSON.stringify([_form[0]['value']]), 'data-name': `${_form[0]['value']}` });
                                        system.alert('Name updated.', function() {});
                                    } 
                                    else {
                                        system.alert('Failed to update.', function() {});
                                    }
                                });
                            }
                        }
                    });
                } 
                else if (data.prop == "Username") {
                    $('#modal_confirm').modal('open');
                    $("#form_update").validate({
                        rules: {
                            field_Username: {required: true,maxlength: 50,validateUsername:true},
                        },
                        errorElement: 'div',
                        errorPlacement: function(error, element) {
                            var placement = $(element).data('error');
                            if (placement) {
                                $(placement).append(error)
                            } 
                            else {
                                error.insertAfter(element);
                            }
                        },
                        submitHandler: function(form) {
                            var _form = $(form).serializeArray();
                            if (data.value[0] == _form[0]['value']) {
                                system.alert('You did not even change the value.', function() {});
                            } 
                            else {
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'),'employer', 'username', _form[0]['value']]);
                                ajax.done(function(ajax) {
                                    if (ajax == 1) {
                                        $('#modal_confirm').modal('close');
                                        $(`td[for='${data.for}']`).html(`${_form[0]['value']}`);
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
                } 
                else if (data.prop == "Password") {
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
                            } 
                            else {
                                error.insertAfter(element);
                            }
                        },
                        submitHandler: function(form) {
                            var _form = $(form).serializeArray();
                            var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [ sessionStorage.getItem('kareer'),'employer', 'password', _form[0]['value']]);
                            ajax.done(function(ajax) {
                                if (ajax == 1) {
                                    $('#modal_confirm').modal('close');
                                    system.alert('Password updated.', function() {});
                                } 
                                else {
                                    system.alert('Failed to update.', function() {});
                                }
                            });
                        }
                    });
                }
                $('.tooltipped').tooltip({delay: 50});
            });
        },
        updatePicture: function() {
            window.Cropper;
            $("a[data-cmd='updateAdminPicture']").on('click', function() {
                var data = $(this).data();
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

                var content = `<div class='image-crop col s12' style='margin-bottom:5px;'>
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
                $('.tooltipped').tooltip({ delay: 50 });

                var $inputImage = $("#inputImage");
                var status = true;
                if (window.FileReader) {
                    $inputImage.change(function(e) {
                        var fileReader = new FileReader(),
                            files = this.files,
                            file;
                        file = files[0];

                        if (/^image\/\w+$/.test(file.type)) {
                            fileReader.readAsDataURL(file);
                            fileReader.onload = function(e) {
                                $inputImage.val("");
                                $("button[data-cmd='save']").html("Save").removeClass('disabled');
                                $('#change_picture').attr('src', e.target.result);
                                var image = document.getElementById('change_picture');
                                var cropper = new Cropper(image, {
                                    aspectRatio: 1 / 1,
                                    autoCropArea: 0.80,
                                    ready: function() {
                                        $("button[data-cmd='save']").removeClass('hidden');
                                        $("button[data-cmd='rotate']").removeClass('hidden');

                                        $("button[data-cmd='save']").click(function() {
                                            $(this).html("Uploading...").addClass('disabled');
                                            if (status) {
                                                var data = system.ajax('../assets/harmony/Process.php?do-updateImage', ['employer', 'picture', sessionStorage.getItem('kareer'), cropper.getCroppedCanvas().toDataURL('image/png')]);
                                                data.done(function(data) {
                                                    if (data == 1) {
                                                        $('#modal_confirm').modal('close');
                                                        $('.profile-image').attr('src', cropper.getCroppedCanvas().toDataURL('image/png'));
                                                        system.alert('Profile picture has been updated.', function() {});
                                                    } 
                                                    else {
                                                        system.alert('Failed to upload your picture. File too large.', function() {});
                                                    }
                                                });
                                                status = false;
                                            }
                                        });
                                    }
                                });
                            };
                        } 
                        else {
                            showMessage("Please choose an image file.");
                        }
                    });
                }
                else {
                    $inputImage.addClass("hide");
                }
                $("button[data-cmd='cancel']").click(function() {
                    $('#modal_confirm').modal('close');
                });
            });
        },
        getLogs:function(min,max){
            min = ((typeof min == undefined) || (min == null))?0:min;
            max = ((typeof max == undefined) || (max == null))?20:max;
            var data = system.ajax('../assets/harmony/Process.php?get-logs',['employer',min,max]);
            return data.responseText;
        },
        notifications:function(){
            let emp = JSON.parse(employer.getLogs());
            console.log(emp);
            let appContent = "";
            $.each(emp,function(i,a){
                appContent += `<tr>
                                <td style="border:1px solid gray"></td>
                            </tr>`;
            });
            $("#applicantNotifs table tbody").html(appContent);

            let count = 20, min = 0, max = count;
            let logs = '';
            $("button[data-cmd='load']").on("click",function(){
                min = max;
                max = max+count;
                logs = JSON.parse(employer.getLogs(min,count));
                employer.listLogs(logs);
            });
        },
        listLogs:function(list){
            let appContent = "";
            $.each(list,function(i,a){
                appContent += `<tr>
                                <td style="border:1px solid gray"></td>
                            </tr>`;
            });
            $("#applicantNotifs table tbody").append(appContent);
        },
    };
}();

var business = function(){
    "use strict";
    return {
        id:function(){
            return localStorage.getItem('business_id');
        },
        get:function(id){
            var ajax = (!id)?system.ajax('../assets/harmony/Process.php?get-businessList',""):system.ajax('../assets/harmony/Process.php?get-businessInfo',id);
            return ajax.responseText;
        },
        view:function(id){
            let data = JSON.parse(business.get(id));
            let logo = ((typeof data[0][5] == 'object') || (data[0][5] == ""))? 'icon.png' : data[0][5];
            $("#businessInfo").html(`
                <div class='col s12 m4 l3'>
                    <img src='../assets/images/logo/${logo}' width='100%' class='businesslogo'>
                    <a class="secondary-content tooltipped" data-prop='business logo' data-cmd='updateBusinessPicture' data-position='left' data-delay='50' data-tooltip='Update'><i class="material-icons hover black-text">photo_camera</i></a>
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
            business.update(id);
            business.updatePicture(id);
        },
        update:function(id){
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
                            // let user = JSON.parse(employer.check_access());
                            var _form = $(form).serializeArray();
                            if(data.value[0] == _form[0]['value']){
                                system.alert('You did not even change the value.', function(){});
                            }
                            else{
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[sessionStorage.getItem('kareer'),'business','name',id,_form[0]['value']]);
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
                            // let user = JSON.parse(employer.check_access());
                            var _form = $(form).serializeArray();
                            if(data.value[0] == _form[0]['value']){
                                system.alert('You did not even change the value.', function(){});
                            }
                            else{
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[sessionStorage.getItem('kareer'),'business','number',id,_form[0]['value']]);
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
                            // let user = JSON.parse(employer.check_access());
                            var _form = $(form).serializeArray();
                            if(data.value[0] == _form[0]['value']){
                                system.alert('You did not even change the value.', function(){});
                            }
                            else{
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[sessionStorage.getItem('kareer'),'business','email',id,_form[0]['value']]);
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
                            // let user = JSON.parse(employer.check_access());
                            let _form = editor.root.innerHTML;
                            if(data[2] == _form){
                                system.alert('You did not even change the product name.', function(){});
                            }
                            else{
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[sessionStorage.getItem('kareer'),'business','description',id,_form]);
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
        updatePicture:function(id){
            window.Cropper;
            $("a[data-cmd='updateBusinessPicture']").on('click',function(){
                var data = $(this).data();
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
                                                var data = system.ajax('../assets/harmony/Process.php?do-updateImage',['business','picture',id,cropper.getCroppedCanvas().toDataURL('image/png')]);
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
        list:function(id){
            $("#businessAccounts .carousel").html("");
            if($('#businessAccounts .carousel').hasClass('initialized'))
                $('#businessAccounts .carousel').removeClass('initialized')

            let data = JSON.parse(accountManager.get(id));
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

            $(".card.profile").on('click',function(){
                let data = $(this).data();
                accountManager.view(data);
            });
        },
        add:function(id){
            let data = system.xml("pages.xml");
            $("#businessAccounts a[data-cmd='addAccount']").on('click',function(){
                $(data.responseText).find("addBusinessAccount").each(function(i,content){
                    $("#modal_medium .modal-content").html(content);
                    $("#modal_medium .modal-footer").remove();

                    pass.visibility();

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
                            // var user = JSON.parse(employer.check_access());
                            var _form = $(form).serializeArray();
                            var ajax = system.ajax('../assets/harmony/Process.php?do-addBusinessAccount',[sessionStorage.getItem('kareer'),id,_form[0]['value'],_form[1]['value'],_form[2]['value'],_form[3]['value']]);
                            ajax.done(function(ajax){
                                if(ajax == 1){  
                                    accountManager.list(id);
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
                        // let user = JSON.parse(employer.check_access());
                        var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[sessionStorage.getItem('kareer'),'employer','status',data[0],data[1],remarks]);
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

var applicants = function(){
    "use strict";
    return {
        get:function(){
            let id = localStorage.getItem('business_id');
            let ajax = system.ajax('../assets/harmony/Process.php?get-applicantsByBusinessId', id);
            return ajax.responseText;
        },
        list:function(){
            let data = JSON.parse(this.get()), id="",level="";
            applicants.content(data);
            $('.tooltipped').tooltip({delay: 50});

            $("ul.applicants").sortable({
                connectWith: "ul",
                placeholder: "highlight",
                zIndex: 10001,
                update:function(event, el){
                    if(el.sender){
                        level = $(this).parent()[0].dataset.level;
                        id = el.item.attr("data-node");
                        applicants.level(id,level);
                    }
                }
            }).disableSelection();
        },
        content:function(data){
            let status = "", picture = "";
            $.each(data,function(i,v){
                if(v[5] == 1){
                    status = 'level1';
                }
                else if(v[5] == 2){
                    status = 'level2';
                }
                else if(v[5] == 3){
                    status = 'level3';
                }
                else if(v[5] == 5){
                    status = 'level0';
                }
                picture = ((new RegExp('facebook|google','i')).test(v[10]))? v[10] : ((typeof v[10] == 'object') || (v[10] == ""))? '../assets/images/logo/icon.png' : `../assets/images/profile/${v[10]}`;
                $(`#display_applicants .${status} .applicants`).append(`
                    <li class="collection-item avatar ui-state-default" data-node="${v[2]}">
                        <img src="${picture}" alt="" class="circle profile_picture">
                        <span class="title">${v[7]} ${v[9]} ${v[8]}</span>
                        <p>Applying for <strong>${v[3]}</strong></p>
                        <a data-cmd='info' href="#cmd=index;content=applicant;id=${v[1]};${v[11]}" class="tooltipped secondary-content" data-tooltip="Review Applicant"><i class="material-icons">more_vert</i></a>
                        <div class='row'>
                            <a data-cmd='passed' data-name="${status}" data-node="${v[2]}" class='tooltipped btn-floating btn-flat waves-effect waves-grey green lighten-5'data-position="top" data-tooltip="Passed"><i class="material-icons">check</i></a>
                            <a data-cmd='failed' data-name="${status}" data-node="${v[2]}" class='tooltipped btn-floating btn-flat waves-effect waves-grey red lighten-5'data-position="top" data-tooltip="Failed"><i class="material-icons">close</i></a>
                        </div>
                    </li>
                `);
            });

            $(`#display_applicants img.profile_picture`).on('error',function(){
                $(this).attr({'src':'../assets/images/logo/icon.png'});
            });
            this.action();

            new PerfectScrollbar('#display_applicants_pending');        
        },
        view:function(){
            let data = JSON.parse((applicant.getinfo(applicant.id())))[0];
            let picture = ((new RegExp('facebook|google','i')).test(data[19]))? data[19] : ((typeof data[19] == 'object') || (data[19] == ""))? '../assets/images/logo/icon.png' : `../assets/images/profile/${data[19]}`;
            let auth = (data[4] == "fb-oauth")?'Facebook':(data[4] == "google-auth")?'Google':'Kareer Website', account_id = (data[5] == "")?data[0]:data[5];
            let description = (data[1] == null)?'':data[1];
            $("#applicantInfo").html(`
                <div class='row'>
                    <div class='col s12 center'>
                        <h5>${data[8]} ${data[10]} ${data[9]}</h5>
                    </div>
                    <div class='col s12 center'>
                        <img src='${picture}' width='20%' class='profile_picture '>
                        <div class='col s12 grey lighten-2'>${description}</div>
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
                                <tr><td>Email Address:</td><td>${data[2]}</td></tr>
                                <tr><td>Number:</td><td>${data[15]}</td></tr>
                                <tr><td>Gender:</td><td>${data[11]}</td></tr>
                                <tr><td>Date of Birth:</td><td>${data[12]}</td></tr>
                                <tr><td>Address:</td><td>${data[13]}</td></tr>
                                <tr><td>Citizenship:</td><td>${data[14]}</td></tr>
                                <tr><td>Height:</td><td>${data[16]}</td></tr>
                                <tr><td>Weight:</td><td>${data[17]}</td></tr>
                                <tr><td>Religion:</td><td>${data[18]}</td></tr>
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
            $('ul.tabs').tabs();
        },
        level:function(id,level){
            let level0 = 'pending';

            let statusLevel = (level == 'level0')?5:(level == 'level1')?1:(level == 'level2')?2:3;
            if(statusLevel == '5'){
                var content = `<h5>Are you sure you want to move this applicant?</h5>
                                <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                    <a data-cmd='remark' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-close right'>Yes</a>
                                    <a data-cmd="stay" class='waves-effect waves-grey grey-text btn-flat modal-close right'>No</a>
                                </form>`;
                $("#modal_confirm .modal-content").html(content);
                $('#modal_confirm').modal('open');
            }
            else if(statusLevel == '1'){
                var content = `<h5>Are you sure you want to move this applicant?</h5>
                                <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                    <a data-cmd='remark' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-close right'>Yes</a>
                                    <a data-cmd="stay" class='waves-effect waves-grey grey-text btn-flat modal-close right'>No</a>
                                </form>`;
                $("#modal_confirm .modal-content").html(content);
                $('#modal_confirm').modal('open');
            }
            else if(statusLevel == '2'){
                var content = `<h5>Are you sure you want to move this applicant?</h5>
                                <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                    <a data-cmd='remark' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-close right'>Yes</a>
                                    <a  data-cmd="stay" class='waves-effect waves-grey grey-text btn-flat modal-close right'>No</a>
                                </form>`;
                $("#modal_confirm .modal-content").html(content);
                $('#modal_confirm').modal('open');
            }
            else if(statusLevel == '3'){
                var content = `<h5>Are you sure you want to move this applicant?</h5>
                                <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                    <a data-cmd='remark' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-close right'>Yes</a>
                                    <a data-cmd="stay" class='waves-effect waves-grey grey-text btn-flat modal-close right'>No</a>
                                </form>`;
                $("#modal_confirm .modal-content").html(content);
                $('#modal_confirm').modal('open');
            }

            $("a[data-cmd='remark']").on('click',function(){
                $("#modal_medium .modal-content").html(
                        `<h5>Why do you want to move this applicant?</h5>
                        <textarea class='materialize-textarea' data-field='field_description' name='field_description' placeholder='Remarks'></textarea>
                        <button data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Proceed</button>
                        <a data-cmd="stay" class='waves-effect waves-grey grey-text btn-flat modal-close right'>Cancel</a>`
                    );
                $('#modal_medium').modal('open');

                $("button[data-cmd='button_proceed']").on('click',function(){
                    let remarks = $("textarea[data-field='field_description']").val();
                    if(remarks.length == 0){
                            Materialize.toast('Remarks is required.',4000);
                    }
                    else if(remarks.length > 800){
                            Materialize.toast('Statement is too long.',4000);
                    }
                    else{
                        let user = JSON.parse(employer.get())[0];
                        var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[user[0],'application','status',id,statusLevel,remarks]);
                        ajax.done(function(ajax){
                            console.log(ajax);
                            if(ajax == 1){
                                $('#modal_medium').modal('close');
                                system.alert('Account updated.', function(){});
                            }
                            else{
                                system.alert('Failed to update.', function(){});
                            }
                        });
                    }
                });
                $("a[data-cmd='stay']").on('click',function(){
                    $( "ul.applicants" ).sortable("cancel");
                });
            });

            $("a[data-cmd='stay']").on('click',function(){
                $( "ul.applicants" ).sortable("cancel");
            });
        },
        action:function(level){
            $("a[data-cmd='failed']").on('click',function(){
                let id = $(this).data('node');
                console.log($(this).data('name'));
                $("#modal_confirm .modal-content").html(
                        `<h5>Are you sure you want to fail this applicant?</h5>
                        <button data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action modal-close right'>Yes</button>
                        <a data-cmd="stay" class='waves-effect waves-grey grey-text btn-flat modal-close right'>Cancel</a>`
                    );
                $('#modal_confirm').modal('open');

                $("button[data-cmd='button_proceed']").on('click',function(){
                    $("#modal_medium .modal-content").html(
                        `<h5>Why do you want to fail this applicant?</h5>
                        <textarea class='materialize-textarea' data-field='field_description' name='field_description' placeholder='Remarks'></textarea>                    
                        <button data-cmd='proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Yes</button>
                        <a data-cmd="stay" class='waves-effect waves-grey grey-text btn-flat modal-close right'>Cancel</a>`
                    );
                    $('#modal_medium').modal('open');

                    $("button[data-cmd='proceed']").on('click',function(){
                        let remarks = $("textarea[data-field='field_description']").val();
                        if(remarks.length == 0){
                                Materialize.toast('Remarks is required.',4000);
                        }
                        else if(remarks.length > 800){
                                Materialize.toast('Statement is too long.',4000);
                        }
                        else{
                            let user = JSON.parse(employer.get())[0];
                            var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo',[user[0],'application','status',id,0,remarks]);
                            ajax.done(function(ajax){
                                if(ajax == 1){
                                    $('#modal_medium').modal('close');
                                    system.alert('Account updated.', function(){});
                                    $(`li[data-node="${id}"]`).addClass('hidden');

                                }
                                else{
                                    system.alert('Failed to update.', function(){});
                                }
                            });
                        }
                    });
                });
            });
        },
    }
}();

var applicant = function(){
    "use strict";
    return {
        ini:function(){
            this.view();
            this.viewAcads();
            this.viewCareer();
            messages.send();
            $('ul.tabs').tabs();
            $("a[ data-cmd='messages']").on('click',function(){messages.conversation();}); /*event rtrigger*/

        },
        id:function(){
            return ((window.location.hash).split(';')[2]).split('=')[1];
        },
        get:function(id){
            var ajax = system.ajax('../assets/harmony/Process.php?get-applicantInfo',id);
            return ajax.responseText;
        },
        schedule:function(id,jobId){
        },
        acad:function(id){
            var ajax = system.ajax('../assets/harmony/Process.php?get-applicantAcad',id);
            return ajax.responseText;
        },
        career:function(id){
            var ajax = system.ajax('../assets/harmony/Process.php?get-applicantCareer',id);
            return ajax.responseText;
        },
        view:function(){
            let data = JSON.parse(applicant.get(applicant.id()))[0], jobId = ((window.location.hash).split(';')[3]);
            let _schedule = JSON.parse(schedule.getById(applicant.id(),jobId))[0], date = "", place ="",time="",button="";
            let picture = ((new RegExp('facebook|google','i')).test(data[19]))? data[19] : ((typeof data[19] == 'object') || (data[19] == ""))? '../assets/images/logo/icon.png' : `../assets/images/profile/${data[19]}`;
            let auth = (data[4] == "fb-oauth")?'Facebook':(data[4] == "google-auth")?'Google':'Kareer Website', account_id = (data[5] == "")?data[0]:data[5];
            let description = (data[1] == null)?'':data[1];
            button = ((typeof _schedule == 'undefined'))?`show`:`hidden`; /*show/hide schedule button if there's an schedule or none*/
            date = ((typeof _schedule == 'undefined'))?'None':`${_schedule[1]}`;
            time = ((typeof _schedule == 'undefined'))?'None':`${_schedule[2]}`;
            place = ((typeof _schedule == 'undefined'))?'None':`${_schedule[3]}`;

            $("#applicantInfo").html(`
                <div class='row'>
                    <div class='right'>
                        <a data-cmd="schedule" class= "btn btn-flat ${button} waves-effect waves-grey teal-text">New Schedule</a>
                        <div>
                            <p id="date">Date: <strong>${date}</strong></p>
                            <p id="date">Time: <strong>${time}</strong></p>
                            <p id="place">Place: <strong>${place}</strong></p>
                        </div>
                    </div>
                    <div class='col s12 center'>
                        <h5>${data[8]} ${data[10]} ${data[9]}</h5>
                    </div>
                    <div class='col s12 center'>
                        <img src='${picture}' width='20%' class='profile_picture '>
                        <div class='col s12 grey lighten-2'>${description}</div>
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
                                <tr><td>Email Address:</td><td>${data[2]}</td></tr>
                                <tr><td>Number:</td><td>${data[15]}</td></tr>
                                <tr><td>Gender:</td><td>${data[11]}</td></tr>
                                <tr><td>Date of Birth:</td><td>${data[12]}</td></tr>
                                <tr><td>Address:</td><td>${data[13]}</td></tr>
                                <tr><td>Citizenship:</td><td>${data[14]}</td></tr>
                                <tr><td>Height:</td><td>${data[16]}</td></tr>
                                <tr><td>Weight:</td><td>${data[17]}</td></tr>
                                <tr><td>Religion:</td><td>${data[18]}</td></tr>
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

            $("a[data-cmd='schedule']").on('click', function() {
                schedule.add();
            });
        },
        viewAcads:function(){
            let data = JSON.parse(applicant.acad(applicant.id()));
            $.each(data,function(i,v){
                $('#applicantAcads table tbody').append(`
                    <tr>
                        <td><h6><strong>${v[1]}</strong><br/><div>${v[2]}</div><small>${v[4]} - ${v[5]}</small><h6></td>
                    </tr>
                `);
            });
        },
        viewCareer:function(){
            let data = JSON.parse(applicant.career(applicant.id()));
            $.each(data,function(i,v){
                $('#applicantCareer table tbody').append(`
                    <tr>
                        <td><h6><strong>${v[3]}</strong><br/><div>${v[4]}</div><div>${v[6]}</div><small>${v[1]} - ${v[2]}</small><h6></td>
                    </tr>
                `);
            });
        },
    }
}();

var messages = function(){
    "use strict";
    return {
        get:function(min,max){
            min = ((typeof min == undefined) || (min == null))?0:min;
            max = ((typeof max == undefined) || (max == null))?2:max;

            let vacancy_id = ((window.location.hash).split(';')[3]);
            var data = system.ajax('../assets/harmony/Process.php?get-messages',[business.id(),applicant.id(),vacancy_id,min,max]);
            return data.responseText;
        },
        conversation:function(){
            let convo = JSON.parse(messages.get(applicant.id())), business ="";
            console.log(convo.length);
            let realtime = setTimeout(function(){         /*recursive function*/
                $('#display_messages ul').html('');
                console.log('asda');
                messages.conversation();
            },3000);
            $.each(convo,function(i,v){
                business = ((typeof v[0] == 'object') || v[0] == "") ? 'icon.png' : v[0];
                $('#display_messages ul').prepend(`
                    <li class="collection-item avatar message">
                        <img src="../assets/images/logo/${v[0]}" alt="" class="circle white">
                        <div class="collection-item">
                            <strong>${v[1]}</strong><br/>
                            <p>${v[2]}</p>
                        </div>
                    </li>
                `);
            });
            $('#display_messages ul').scrollTop($('#display_messages ul').prop("scrollHeight")); /*this will stick the scroll to bottom*/
            $("*[ data-cmd='click']").on('click',function(){ /*recursive function off*/
                console.log('aaa');
                clearTimeout(realtime);
                $('#display_messages ul').html('');
            });
        },
        send:function(){
            let user = JSON.parse(employer.get())[0], data = JSON.parse(business.get(user[1])), id = applicant.id(), jobId = ((window.location.hash).split(';')[3]);
            let logo = ((typeof data[0][5] == 'object') || (data[0][5] == ""))? '../assets/images/logo/icon.png' : `../assets/images/logo/${data[0][5]}`;
            $('a[data-cmd="send"]').on('click', function(){
                let message = $("textarea[data-field='message']").val();
                if(message.length == 0){
                        Materialize.toast('Empty message.',2000); 
                }
                else {
                    var ajax = system.ajax('../assets/harmony/Process.php?do-message',[user[0],jobId,id,message,'application']);
                    ajax.done(function(ajax){
                        if(ajax == 1){
                            system.alert('Message sent.', function(){
                                $("textarea[data-field='message']").val("");
                                $('#display_messages ul').scrollTop($('#display_messages ul').prop("scrollHeight"));/*this will stick the scroll to bottom*/
                            });
                        }
                        else{
                            system.alert('Message not sent.', function(){});
                        }
                    });
                }
            });
            $(`#display_messages .avatar img`).on('error',function(){
                $(this).attr({'src':'../assets/images/logo/icon.png'});
            });
        }
    }
}();

var jobPosts = function() {
    "use strict";
    return {
        get: function(id) {
            let ajax = system.ajax('../assets/harmony/Process.php?get-employerJobsPosts', id);
            return ajax.responseText;
        },
        getjob:function(id){
            let ajax = system.ajax('../assets/harmony/Process.php?get-jobPost', id);
            return ajax.responseText;
        },
        id:function(){
            return ((window.location.hash).split(';')[2]).split('=')[1];
        },
        add: function() {
            $("a[data-cmd='add_job-post']").on('click', function() {
                var data = system.xml("pages.xml");
                $(data.responseText).find("addJobPost").each(function(i, content) {
                    $("#modal_medium .modal-content").html(content);
                    $('#modal_medium').modal('open');
                    $('.chips-placeholder').material_chip({
                        placeholder: 'Add a skill',
                    });
                    $('.input').prop('maxlength','50');
                    $('.chips').on('chip.add', function(e, chip){
                        if(($('.chips').material_chip('data').length) == 5){
                            $('.input').prop('disabled',true);
                        }
                    });
                    $('.chips').on('chip.delete', function(e, chip){
                        $('.input').prop('disabled',false);
                    });

                    let editor = system.quill($('#field_description2').get(0));
                    editor.clipboard.dangerouslyPasteHTML($('#field_description2').val());
                    var limit = 1000;
                    editor.on('text-change', function(delta, old, source) {
                        if (editor.getLength() > limit) {
                            editor.deleteText(limit, editor.getLength());
                            $("#field_description2").attr({ "style": "box-shadow:0px 1px 1px red" });
                            $("#display_errorDescription2").html("You have reached max input allowed.");
                        } 
                        else {
                            $("#field_description2").attr({ "style": "box-shadow:0px 1px 1px green" });
                            $("#display_errorDescription2").html("");
                        }
                    });
                    $("#form_addJobPost").validate({
                        rules: {
                            field_title: { required: true },
                            field_skills: { required: true },
                            field_salarymin: { required: true, maxlength: 10, lessThan: '#field_salarymax'},
                            field_salarymax: { required: true, maxlength: 10},
                            field_date: { required: true },
                            field_description1: { required: true, minlength: 100, maxlength:450 },
                            field_description2: { required: true, minlength: 100},
                        },
                        errorElement: 'div',
                        errorPlacement: function(error, element) {
                            var placement = $(element).data('error');
                            if (placement) {
                                $(placement).append(error)
                            }
                            else {
                                error.insertAfter(element);
                            }
                        },
                        submitHandler: function(form) {
                            let skillsArray = [];
                            let description2 = editor.root.innerHTML;
                            var _form = $(form).serializeArray();
                            var user = JSON.parse(employer.get())[0];
                            var chipdata = $('.chips').material_chip('data');
                            for (var skills in chipdata) {
                                skillsArray.push(chipdata[skills]['tag']);
                            }
                            var ajax = system.ajax('../assets/harmony/Process.php?do-postJob', [user[0], user[1], _form[0]['value'], _form[1]['value'], _form[2]['value'], _form[3]['value'], _form[4]['value'], description2, skillsArray]);
                            ajax.done(function(ajax) {
                                console.log(ajax);
                                if (ajax == 1) {
                                    $('#modal_medium').modal('close');
                                    system.alert('Posted.', function() {});
                                    location.reload();
                                    jobPosts.view();
                                }
                                else {
                                    system.alert('Failed to post.', function() {});
                                }
                            });
                        }
                    });
                });
            });
        },
        list: function() {
            let id = JSON.parse(employer.get())[0];
            let data = JSON.parse(jobPosts.get(id[1]));
            this.content(data);
        },
        content:function(data){
            let chip = "", skills = "", status ="";
            $.each(data, function(i, v) {
                if( v[1] == 1){
                    status = 'Active';
                    skills = JSON.parse(v[4]);
                    chip = "";
                    $.each(skills, function(i, s) {
                        chip += `<a class="chip">${s}</a>`;
                    });
                    $("#job_post table tbody").append(`
                        <tr>
                            <td widtd="50px" class="center">${status}</td>
                            <td widtd="300px" class="center">${v[2]}</td>
                            <td widtd="150px" class="center">${v[3]}</td>
                            <td>
                                <a href='#cmd=index;content=focusjob;id=${v[0]}' data-cmd='view-job' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='View Job Details'>
                                    <i class='material-icons right hover black-text'>more_vert</i>
                                </a>
                            </td>
                        </tr>
                    `);
                }
                else if( v[1] == 0){
                    status = 'Full';
                    skills = JSON.parse(v[4]);
                    chip = "";
                    $.each(skills, function(i, s) {
                        chip += `<a class="chip">${s}</a>`;
                    });
                    $("#full_post table tbody").append(`
                        <tr>
                            <td widtd="50px" class="center">${status}</td>
                            <td widtd="300px" class="center">${v[2]}</td>
                            <td widtd="150px" class="center">${v[3]}</td>
                            <td>
                                <a href='#cmd=index;content=focusjob;id=${v[0]}' data-cmd='view-job' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='View Job Details'>
                                    <i class='material-icons right hover black-text'>more_vert</i>
                                </a>
                            </td>
                        </tr>
                    `);
                }
                else if( v[1] == 2){
                    status = 'Pending';
                    skills = JSON.parse(v[4]);
                    chip = "";
                    $.each(skills, function(i, s) {
                        chip += `<a class="chip">${s}</a>`;
                    });
                    $("#pending_post table tbody").append(`
                        <tr>
                            <td widtd="50px" class="center">${status}</td>
                            <td widtd="300px" class="center">${v[2]}</td>
                            <td widtd="150px" class="center">${v[3]}</td>
                            <td>
                                <a href='#cmd=index;content=focusjob;id=${v[0]}' data-cmd='view-job' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='View Job Details'>
                                    <i class='material-icons right hover black-text'>more_vert</i>
                                </a>
                            </td>
                        </tr>
                    `);
                }
            });
            $('ul.tabs').tabs();
        },
        view:function(){
            let id = jobPosts.id(), chip ="";
            let job = JSON.parse(jobPosts.getjob(id))[0];
            let status = (job[11] == 1)?'Active':(job[11] == 0)?'Full':'Pending';
            let skills = JSON.parse(job[7]);
            $.each(skills, function(i, v) {
                chip += `<a class="chip">${v}</a>`;
            });
            $("#job").html(`<div class='card'>
                                        <div class='card-content'>
                                            <a data-for='title' data-cmd='updatejob' data-value='${job[6]}' data-name='${job[6]}' data-node='${job[0]}' data-prop='title' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update title'>
                                                <i class='material-icons right hover black-text'>mode_edit</i>
                                            </a>
                                            <span class='card-title activator grey-text text-darken-4' for='title'>${job[6]}</span>
                                            <div class='divider'></div>
                                            <table>
                                                <tr>
                                                    <td width='50px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Skills Required: </span></td>
                                                    <td width='150px' class='grey-text' for='skills'>${chip}</td>
                                                    <td width='20px'>
                                                        <a data-for='skills' data-cmd='updatejob' data-value='${chip}' data-name='${chip}' data-node='${job[0]}' data-prop='Skills' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update skills'>
                                                            <i class='material-icons right hover black-text'>mode_edit</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width='50px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Salary: </span></td>
                                                    <td width='150px' class='grey-text' for='salary'>${job[8]} - ${job[9]}</td>
                                                    <td width='20px'>
                                                        <a data-for='salary' data-cmd='updatejob' data-name='salary' data-node='${job[0]}' data-prop='Salary' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update salary'>
                                                            <i class='material-icons right hover black-text'>mode_edit</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width='50px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Date Posted: </span></td>
                                                    <td width='150px' class='grey-text' for='date'>${job[5]}</td>
                                                    <td width='20px'>
                                                        <a data-for='date' data-cmd='updatejob' data-value='${job[5]}' data-name='${job[5]}' data-node='${job[0]}' data-prop='Date' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update date'>
                                                            <i class='material-icons right hover black-text'>mode_edit</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width='50px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Short Description: </span></td>
                                                    <td width='150px'class='grey-text' for='short'>${job[3]}</td>
                                                    <td width='20px'>
                                                        <a data-for='short' data-cmd='updatejob' data-value='' data-name='' data-node='${job[0]}' data-prop='shortDes' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update short description'>
                                                            <i class='material-icons right hover black-text'>mode_edit</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width='50px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Full Description: </span></td>
                                                    <td width='150px' class='_content ' for='full'>${job[4]}</td>
                                                    <td width='20px'>
                                                        <a data-for='full' data-cmd='updatejob' data-value='' data-name='' data-node='${job[0]}' data-prop='longDes' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update full description'>
                                                            <i class='material-icons right hover black-text'>mode_edit</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width='50px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Status: </span></td>
                                                    <td width='150px' class='grey-text' for='status'>${status}</td>
                                                    <td width='20px'>
                                                        <a data-for='status' data-cmd='updatejob' data-value='${status}' data-name='${status}' data-node='${job[0]}' data-prop='Status' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update status'>
                                                            <i class='material-icons right hover black-text'>mode_edit</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>`);
            if(status == 'Pending'){ /*admin can update status of pending job post into active*/
                $('#job a[data-for="status"]').addClass('disabled');
            }
            jobPosts.update(skills);
            $("a[data-cmd='delete']").on('click', function() {
                var content = `<h5>Are You sure you delete this job post?</h5>
                                <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                    <div class="input-field col s6">
                                        <textarea class="materialize-textarea" maxlength='500' data-field='field_description' placeholder='Remarks'></textarea>
                                    </div>
                                    <button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                    <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                </form>`;
                $("#modal_confirm .modal-content").html(content);
                $('#modal_confirm').modal('open');
                $("#form_update").validate({
                    rules: {
                        field_description: { required: true },
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
                        let remarks = $("textarea[data-field='field_description']").val();
                        if(remarks.length == 0){
                                Materialize.toast('Remarks is required.',4000);
                        }
                        else if(remarks.length > 800){
                                Materialize.toast('Statement is too long.',4000);
                        }
                        else{
                            var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'), 'job', 'delete', job[0], remarks]);
                            ajax.done(function(ajax) {
                                console.log(ajax);
                                if (ajax == 1) {
                                    $('#modal_confirm').modal('close');
                                    system.alert('Deleted.', function() {});
                                    $(location).attr('href','#cmd=index;content=job;');
                                } else {
                                    system.alert('Failed to delete.', function() {});
                                }
                            });
                        }
                    }
                });
            });
        },
        update:function(skills){
            $("a[data-cmd='updatejob']").on('click', function() {
                let job = JSON.parse(jobPosts.getjob($(this).data('node')))[0];
                var data = $(this).data();
                var content = `<h5>Change ${data.prop}</h5>
                                <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                    <label for='field_${data.prop}' class='active'>${data.prop}: </label>
                                    <input id='field_${data.prop}' value='${data.value}' type='text' name='field_${data.prop}' data-error='.error_${data.prop}'>
                                    <div class='error_${data.prop}'></div>
                                    <button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                    <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                </form>`;
                $("#modal_medium .modal-content").html(content);
                $('#modal_medium .modal-footer').html("");

                if (data.prop == "title") {
                    content = `<h5>Change ${data.prop}</h5>
                                    <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                        <div class="input-field col s6">
                                            <label for='field_${data.prop}' class='active'></label>
                                            <input id='field_${data.prop}' value='${job[6]}' type='text' name='field_${data.prop}' data-error='.error_${data.prop}'>
                                            <div class='error_${data.prop}'></div>
                                        </div>
                                        
                                        <button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                        <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                    </form>`;
                    $("#modal_medium .modal-content").html(content);
                    $('#modal_medium').modal('open');
                    $("#form_update").validate({
                        rules: {
                            field_title: { required: true },
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
                            // var id = JSON.parse(employer.check_access());
                            var _form = $(form).serializeArray();
                            if ((data.value == _form[0]['value'])) {
                                system.alert('You did not even change the value.', function() {});
                            } else {
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'), 'job', 'title', data.node, _form[0]['value']]);
                                ajax.done(function(ajax) {
                                    console.log(ajax);
                                    if (ajax == 1) {
                                        $('#modal_medium').modal('close');
                                        $(`.card-title[for='${data.for}']`).html(`${_form[0]['value']}`);
                                        $(_this).attr({ 'data-value':`${_form[1]['value']}`, 'data-name': `${_form[1]['value']}` });
                                        system.alert('Updated.', function() {});
                                    } else {
                                        system.alert('Failed to update.', function() {});
                                    }
                                });
                            }
                        }
                    });
                }
                else if (data.prop == "Skills") {
                    var skillObj = {};
                    var skilldata = skills;
                    for(var val in skilldata){
                        var skill = skilldata[val];
                        var skillsArray = $.map(skilldata, function(skill) {
                           return {tag: skill};
                        }); 
                    }
                    skillObj = skillsArray;
                    content = `<h5>Change ${data.prop}</h5>
                                    <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                        <div class="input-field col s6">
                                            <label class="active">Enter maximum of 5 skills </label>
                                            <div class="chips chips-initial"></div>
                                        </div>
                                        <button type='submit' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                        <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                    </form>`;
                    $("#modal_medium .modal-content").html(content);
                    $('#modal_medium').modal('open');
                    $('.chips-initial').material_chip({
                        data: skillObj,
                    });
                    $('.chips').on('chip.add', function(e, chip){
                        if(($('.chips').material_chip('data').length) == 5){
                            $('.input').prop('disabled',true);
                        }
                    });
                    $('.chips').on('chip.delete', function(e, chip){
                        $('.input').prop('disabled',false);
                    });
                    $("#form_update").validate({
                        rules: {
                            field_skills: { required: true },
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
                            let skillsArray = [];
                            let chipdata = $('.chips').material_chip('data');
                            for (let skills in chipdata) {
                                skillsArray.push(chipdata[skills]['tag']);
                            }
                            let ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'), 'job', 'skills', data.node, skillsArray]);
                            ajax.done(function(ajax) {
                                console.log(ajax);
                                if (ajax == 1) {
                                    $('#modal_medium').modal('close');
                                    // $(`td[for='${data.for}']`).html(`${skillsArray}`);
                                    // $(_this).attr({ 'data-value': _form[1]['value'], 'data-name': `${_form[0]['value']}` });
                                    system.alert('Updated.', function() {});
                                    location.reload();
                                } else {
                                    system.alert('Failed to update.', function() {});
                                }
                            });
                        }
                    });
                }
                else if (data.prop == "Salary") {
                    content = `<h5>Change ${data.prop}</h5>
                                    <form id='form_update' class='formValidate row' method='get' action='' novalidate='novalidate' >
                                        <div class="input-field col s6">
                                            <label for='field_${data.prop}min' class='active'>Salary min</label>
                                            <input id='field_${data.prop}min' value='${job[8]}' type='number' name='field_${data.prop}min' data-error='.error_${data.prop}min'>
                                            <div class='error_${data.prop}min'></div>
                                        </div>
                                        <div class="input-field col s6">
                                            <label for='field_${data.prop}max' class='active'>Salary max</label>
                                            <input id='field_${data.prop}max' value='${job[9]}' type='number' name='field_${data.prop}max' data-error='.error_${data.prop}max'>
                                            <div class='error_${data.prop}max'></div>
                                        </div>
                                        
                                        <button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                        <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                    </form>`;
                    $("#modal_medium .modal-content").html(content);
                    $('#modal_medium').modal('open');
                    $("#form_update").validate({
                        rules: {
                            field_Salarymin: { required: true, maxlength: 10, lessThan: '#field_Salarymax'},
                            field_Salarymax: { required: true, maxlength: 10},
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
                            // var id = JSON.parse(employer.check_access());
                            var _form = $(form).serializeArray();
                            var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'), 'job', 'salary', data.node, _form[0]['value'],_form[1]['value']]);
                            ajax.done(function(ajax) {
                                console.log(ajax);
                                if (ajax == 1) {
                                    $('#modal_medium').modal('close');
                                    $(`td[for='${data.for}']`).html(`${_form[0]['value']} - ${_form[1]['value']}`);
                                    $(field_Salarymin).attr({ 'data-value': _form[0]['value'], 'data-name': `${_form[0]['value']}` });
                                    $(field_Salarymin).attr({ 'data-value': _form[1]['value'], 'data-name': `${_form[1]['value']}` });
                                    system.alert('Updated.', function() {});
                                    location.reload();
                                } else {
                                    system.alert('Failed to update.', function() {});
                                }
                            });
                        }
                    });
                } 
                else if (data.prop == "Date") {
                    content = `<h5>Change ${data.prop}</h5>
                                    <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                        <div class="input-field col s6">
                                            <label for='field_${data.prop}' class='active'></label>
                                            <input id='field_${data.prop}' value='${job[10]}' type='date' name='field_${data.prop}' data-error='.error_${data.prop}'>
                                            <div class='error_${data.prop}'></div>
                                        </div>
                                        
                                        <button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                        <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                    </form>`;
                    $("#modal_medium .modal-content").html(content);
                    $('#modal_medium').modal('open');
                    $("#form_update").validate({
                        rules: {
                            field_Date: { required: true },
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
                            // var id = JSON.parse(employer.check_access());
                            var _form = $(form).serializeArray();
                            if ((data.value == _form[0]['value'])) {
                                system.alert('You did not even change the value.', function() {});
                            } else {
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'), 'job', 'date', data.node, _form[0]['value']]);
                                ajax.done(function(ajax) {
                                    console.log(ajax);
                                    if (ajax == 1) {
                                        $('#modal_medium').modal('close');
                                        $(`td[for='${data.for}']`).html(`${_form[0]['value']}`);
                                        $(_this).attr({ 'data-value': _form[1]['value'], 'data-name': `${_form[1]['value']}` });
                                        system.alert('Updated.', function() {});
                                    } else {
                                        system.alert('Failed to update.', function() {});
                                    }
                                });
                            }
                        }
                    });
                }
                else if (data.prop == "shortDes") {
                    content = `<h5>Change Short Description</h5>
                                    <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                        <div class="input-field col s6">
                                            <label for='field_${data.prop}' class='active'>Short Description</label>
                                            <textarea class="materialize-textarea" maxlength='500' id='field_${data.prop}' value='' type='text' name='field_${data.prop}' data-error='.error_${data.prop}'>${job[3]}</textarea>
                                            <div class='error_${data.prop}'></div>
                                            <div class='display_notes'>
                                                *<strong>Short Description</strong> must contain atleast 100 characters and not more than 450 characters. <br/>
                                                <u>This will be the preview of your job post.</u>
                                            </div>
                                        </div>
                                        
                                        <button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                        <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                    </form>`;
                    $("#modal_medium .modal-content").html(content);
                    $('#modal_medium').modal('open');
                    $("#form_update").validate({
                        rules: {
                            field_shortDes: { required: true, minlength: 100,maxlength:450 },
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
                            // var id = JSON.parse(employer.check_access());
                            var _form = $(form).serializeArray();
                            if ((data.value == _form[0]['value'])) {
                                system.alert('You did not even change the value.', function() {});
                            } else {
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'), 'job', 'shortDes', data.node, _form[0]['value']]);
                                ajax.done(function(ajax) {
                                    console.log(ajax);
                                    if (ajax == 1) {
                                        $('#modal_medium').modal('close');
                                        $(`td[for='${data.for}']`).html(`${_form[0]['value']}`);
                                        $(_this).attr({ 'data-value': _form[1]['value'], 'data-name': `${_form[0]['value']}` });
                                        system.alert('Updated.', function() {});
                                    } else {
                                        system.alert('Failed to update.', function() {});
                                    }
                                });
                            }
                        }
                    });
                }
                else if (data.prop == "longDes") {
                    content = `<h5>Change ${data.prop}</h5>
                                    <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                        <div class="input-field col s6">
                                            <label for='field_${data.prop}' class='active'></label>
                                            <div id='field_${data.prop}' ></div>
                                            <div id='display_error${data.prop}'></div>
                                        </div>
                                        
                                        <button type='submit' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                        <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                    </form>`;
                    $("#modal_medium .modal-content").html(content);
                    $('#modal_medium').modal('open');
                    let editor = system.quill($('#field_longDes').get(0));
                    editor.clipboard.dangerouslyPasteHTML(job[4]);
                    var limit = 1000;
                    editor.on('text-change', function(delta, old, source) {
                        if (editor.getLength() > limit) {
                            editor.deleteText(limit, editor.getLength());
                            $("#field_longDes").attr({"style":"box-shadow:0px 1px 1px red"});
                            $("#display_errorlongDes").html("You have reached max input allowed.");
                        }
                        else{
                            $("#field_longDes").attr({"style":"box-shadow:0px 1px 1px green"});
                            $("#display_errorlongDes").html("");
                        }
                    });
                    $("#form_update").validate({
                        rules: {
                            field_longDes: { required: true, minlength:100},
                        },
                        errorElement: 'div',
                        errorPlacement: function(error, element) {
                            var placement = $(element).data('error');
                            if (placement) {
                                $(placement).append(error)
                            } 
                            else {
                                error.insertAfter(element);
                            }
                        },
                        submitHandler: function(form) {
                            // var id = JSON.parse(employer.check_access());
                            let _form = editor.root.innerHTML;
                            var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'), 'job', 'longDes', data.node, _form]);
                            ajax.done(function(ajax) {
                                if (ajax == 1) {
                                    $('#modal_medium').modal('close');
                                    $(`#job tr:nth-child(5) td._content`).html(`${_form}`);
                                    $('#field_longDes').attr({'data-value':_form, 'data-name':`${_form}`});
                                    system.alert('Updated.', function() {});
                                    location.reload();
                                } 
                                else {
                                    system.alert('Failed to update.', function() {});
                                }
                            });
                        }
                    });
                }
                else if (data.prop == "Status") {
                    let title = (job[11] == 'Active')?0:1;
                    if(data.value == 'Active'){
                        content = `<h5>Change the ${data.prop} of this job?</h5>
                                    <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                        <div class="input-field col s6">
                                            <select data-field ="field_Updatestatus">
                                              <option value="" disabled selected>Choose action</option>
                                              <option value="0">Move to full</option>
                                              <option value="2">Move to pending</option>
                                            </select>
                                            <textarea class="materialize-textarea" maxlength='500' data-field='field_${data.prop}' name='field_${data.prop}' placeholder='Remarks'></textarea>
                                        </div>
                                        <button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                        <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                    </form>`;
                        $("#modal_medium .modal-content").html(content);
                        $('#modal_medium').modal('open');
                    }
                    if(data.value == 'Full'){
                        content = `<h5>Change the ${data.prop} of this job?</h5>
                                        <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                        <div class="input-field col s6">          
                                            <select data-field ="field_Updatestatus">
                                              <option value="" disabled selected>Choose action</option>
                                              <option value="1">Move to active</option>
                                              <option value="2">Move to pending</option>
                                            </select>                                 
                                            <textarea class="materialize-textarea" maxlength='500' data-field='field_${data.prop}' name='field_${data.prop}' placeholder='Remarks'></textarea>
                                        </div>
                                        <button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                        <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                    </form>`;
                        $("#modal_medium .modal-content").html(content);
                        $('#modal_medium').modal('open');
                    }
                    $('select').material_select();
                    $("#form_update").validate({
                        rules: {
                            field_Status: { required: true },
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
                            let val = $('select').val();
                            let remarks = $("textarea[data-field='field_Status']").val();
                            var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'), 'job', 'status', data.node, val, remarks]);
                            ajax.done(function(ajax) {
                                console.log(ajax);
                                val = (val == 0)?'Full':(val == 1)?'Active':'Pending';
                                if (ajax == 1) {
                                    $('#modal_medium').modal('close');
                                    $(`td[for='${data.for}']`).html(`${val}`);
                                    system.alert('Updated.', function() {});
                                } else {
                                    system.alert('Failed to update.', function() {});
                                }
                            });
                        }
                    });
                }
            });
        },
    }
}();

var schedule = function() {
    "use strict";
    return {
        add: function(){
            let place = JSON.parse(business.get(business.id()))[0][1];/*default meeting place*/
            let employer = sessionStorage.getItem('kareer'), jobId = ((window.location.hash).split(';')[3]);
            $("#modal_medium .modal-content").html(`
                <form id='form_schedule' class='formValidate row' method='get' action='' novalidate='novalidate'>
                        <h5>Schedule</h5>
                        <div class="input-field col s4">
                            <select id='field_option'>
                                <option value="meeting">Meeting</option>
                                <option value="initial interview">Initial interview</option>
                                <option value="final interview">Final interview</option>
                            </select>
                            <label for='field_option'>Select an option</label>
                        </div>
                        <div class='input-field col s4'>
                            <label for='field_date' class="active">Date: </label>
                            <input id='field_date' type='date' name='field_date' data-error='.error_date'>
                            <div class='display_error error_date'></div>    
                        </div>
                        <div class='input-field col s4'>
                            <label for='field_time' class="active">Time: </label>
                            <input id='field_time' type='time' name='field_time' data-error='.error_time'>
                            <div class='display_error error_time'></div>    
                        </div>
                        <div class='input-field col s12'>
                            <label for='field_meetingPlace' class='active'>Place: </label>
                            <input id='field_meetingPlace' type='text' value = '${place}' name='field_meetingPlace' data-error='.error_meetingPlace'>
                            <div class='display_error error_meetingPlace'></div>    
                        </div>
                        <div class='input-field col s12'>
                            <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                            <button class='btn waves-effect waves-light right round-button z-depth-0' type='submit'>Save</button>
                        </div>
                </form>`);
            $('#modal_medium').modal('open');
            let now_date = moment(moment().format("YYYY-MM-DD")).add(1, 'day').format("YYYY-MM-DD");
            $("#field_date").attr({"min": now_date});
            
            $('select').material_select(); 
            $("#form_schedule").validate({
                rules: {
                    field_option: {required: true},
                    field_date: {required: true,maxlength: 50},
                    field_time: {required: true,maxlength: 50},
                    field_meetingPlace: {required: true,maxlength: 1000},
                },
                errorElement: 'div',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error)
                    } 
                    else {
                        error.insertAfter(element);
                    }
                },
                submitHandler: function(form) {
                    let _form = $(form).serializeArray();
                    let option = $('select').val();
                    var data = system.ajax('../assets/harmony/Process.php?do-schedule', [employer, jobId, applicant.id(), _form[0]['value'], _form[1]['value'], _form[2]['value'], option]);
                    data.done(function(data) {
                        console.log(data);
                        if (data == 1) {
                            system.alert('Schedule sucess.', function(){
                                $('#modal_medium').modal('close');
                                applicant.view();
                            });
                        } 
                        else {
                            system.alert('Schedule error.', function(){});
                        }
                    });
                }
            });
        },
        get: function(data) {
            var data = system.ajax('../assets/harmony/Process.php?get-schedule', data);
            return data.responseText;
        },
        getById:function(id,jobId){
            var ajax = system.ajax('../assets/harmony/Process.php?get-scheduleByApplicant',[id,jobId]);
            return ajax.responseText;
        },
        list: function() {
            let businessId = business.id();
            let result = JSON.parse(this.get(businessId));
            let data = [];

            $.each(result,function(i,v){
                data.push({title:`${v[7]} \n${v[3]} ${v[4]} ${v[5]} \n Applying for ${v[12]}`, start:`${v[6]}T${v[7]}`, data:v});
            });
            this.calendar(data);
        },
        calendar: function(data) {
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev, next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,listMonth'
                },
                navLinks: true,
                displayEventTime: false,
                editable: false,
                eventSources: [{
                    events: data,
                    color: '#1a237e',
                    textColor: '#fff',
                }],
                eventClick: function(calEvent, jsEvent, view) {
                    let now = moment().format('YYYY-MM-DD');
                    let control = (now ==  calEvent.data[6])?'':'disabled';
                    let content = `
                        <a class='modal-close btn btn-flat btn-floating waves-effect right'><i class="material-icons tiny">close</i></a>
                        <h6>Schedule information</h6>
                        <table>
                            <tr>
                                <td class='bold'>Name: </td>
                                <td>${calEvent.data[3]} ${calEvent.data[4]} ${calEvent.data[5]}</td>
                            </tr>
                            <tr>
                                <td class='bold'>Date and Time: </td>
                                <td>${calEvent.data[6]} ${calEvent.data[7]}</td>
                            </tr>
                            <tr>
                                <td class='bold'>Place: </td>
                                <td>${calEvent.data[8]}</td>
                            </tr>
                            <tr>
                                <td class='bold'>Contact: </td>
                                <td>${calEvent.data[9]}</td>
                            </tr>
                            <tr>
                                <td class='bold'>Applying for: </td>
                                <td>${calEvent.data[12]}</td>
                            </tr>
                            <tr>
                                <td class='bold'>Schedule for: </td>
                                <td>${calEvent.data[10]}</td>
                            </tr>
                        </table>
                        <div>
                            <a data-cmd='failed' data-node="${calEvent.data[0]}" class='modal-close tooltipped btn-floating btn-flat waves-effect waves-grey red lighten-5 left' data-position="top" data-tooltip="Failed"><i class="material-icons">close</i></a>
                            <a data-cmd='success' data-node="${calEvent.data[0]}" class='modal-close tooltipped btn-floating btn-flat waves-effect waves-grey green lighten-5 left' data-position="top" data-tooltip="Success"><i class="material-icons">check</i></a>
                            <a data-cmd="reschedule" data-node="${calEvent.data}" class= "modal-close btn btn-flat waves-effect waves-grey teal-text right">Reschedule</a>
                        </div>
                    `;
                    $("#modal_medium .modal-content").html(content);
                    $('#modal_medium .modal-footer').remove();         

                    $('#modal_medium').modal('open');
                    $('.tooltipped').tooltip({delay: 50});
                    schedule.action(calEvent.data);
                }
            })
        },
        action:function(data){
            $("a[data-cmd='failed']").on('click', function() {
                let id = $(this).data('node'), option = data[10];
                console.log('failed');

                $("#modal_confirm .modal-content").html(
                        `<h5>What happen to this schedule?</h5>
                        <textarea class='materialize-textarea' data-field='field_description' name='field_description' placeholder='Remarks'></textarea>
                        <button data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Proceed</button>
                        <a data-cmd="stay" class='waves-effect waves-grey grey-text btn-flat modal-close right'>Cancel</a>`
                    );
                $('#modal_confirm').modal('open');
                $("button[data-cmd='button_proceed']").on('click',function(){
                    let remarks = $("textarea[data-field='field_description']").val();
                    if(remarks.length == 0){
                            Materialize.toast('Remarks is required.',4000);
                    }
                    else if(remarks.length > 800){
                            Materialize.toast('Statement is too long.',4000);
                    }
                    else{
                        var data = system.ajax('../assets/harmony/Process.php?do-updateSchedule', ['failed',id,sessionStorage.getItem('kareer'),remarks,option]);
                        data.done(function(data){
                            console.log(data);
                            if(data == 1){
                                $('#modal_confirm').modal('close');
                                system.alert('Schedule removed.', function(){
                                    schedule.list();
                                });
                            }
                            else{
                                system.alert('Error.', function(){});
                            }
                        });
                    }
                });
            });
            $("a[data-cmd='success']").on('click', function() {
                let id = $(this).data('node'), option = data[10];
                console.log('success');
                $("#modal_confirm .modal-content").html(
                        `<h5>What happen to this schedule?</h5>
                        <textarea class='materialize-textarea' data-field='field_description' name='field_description' placeholder='Remarks'></textarea>
                        <button data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Proceed</button>
                        <a data-cmd="stay" class='waves-effect waves-grey grey-text btn-flat modal-close right'>Cancel</a>`
                    );
                $('#modal_confirm').modal('open');
                $("button[data-cmd='button_proceed']").on('click',function(){
                    let remarks = $("textarea[data-field='field_description']").val();
                    if(remarks.length == 0){
                            Materialize.toast('Remarks is required.',4000);
                    }
                    else if(remarks.length > 800){
                            Materialize.toast('Statement is too long.',4000);
                    }
                    else{
                        var data = system.ajax('../assets/harmony/Process.php?do-updateSchedule', ['success',id,sessionStorage.getItem('kareer'),remarks,option]);
                        data.done(function(data){
                            // console.log(data);
                            if(data == 1){
                                $('#modal_confirm').modal('close');
                                system.alert('Schedule completed.', function(){
                                    schedule.list();
                                });
                            }
                            else{
                                system.alert('Error.', function(){});
                            }
                        });
                    }
                });
            });
            $("a[data-cmd='reschedule']").on('click', function() {
                console.log('reschedule');
                console.log(data);
                $("#modal_confirm .modal-content").html(`
                    <form id='form_schedule' class='formValidate row' method='get' action='' novalidate='novalidate'>
                            <h5>Reschedule</h5>
                            <div class="input-field col s12">
                                <select id='field_option'>
                                    <option value="${data[10]}">${data[10]}</option
                                </select>
                                <label for='field_option'>Select an option</label>
                            </div>
                            <div class='input-field col s12'>
                                <label for='field_date' class="active">Date: </label>
                                <input id='field_date' type='date' name='field_date' data-error='.error_date' value='${data[6]}'>
                                <div class='display_error error_date'></div>    
                            </div>
                            <div class='input-field col s12'>
                                <label for='field_time' class="active">Time: </label>
                                <input id='field_time' type='time' name='field_time' data-error='.error_time' value='${data[7]}'>
                                <div class='display_error error_time'></div>    
                            </div>
                            <div class='input-field col s12'>
                                <label for='field_meetingPlace' class='active'>Place: </label>
                                <input id='field_meetingPlace' type='text' value = '${data[8]}' name='field_meetingPlace' data-error='.error_meetingPlace'>
                                <div class='display_error error_meetingPlace'></div>    
                            </div>
                            <div class='input-field col s12'>
                                <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                <button class='btn waves-effect waves-light right round-button z-depth-0' type='submit'>Save</button>
                            </div>
                    </form>`);
                $('#modal_confirm').modal('open');
                let now_date = moment(moment().format("YYYY-MM-DD")).add(1, 'day').format("YYYY-MM-DD");
                $("#field_date").attr({"min": now_date});
                $('select').material_select(); 
                $("#form_schedule").validate({
                rules: {
                    field_option: {required: true},
                    field_date: {required: true,maxlength: 50},
                    field_time: {required: true,maxlength: 50},
                    field_meetingPlace: {required: true,maxlength: 1000},
                },
                errorElement: 'div',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error)
                    } 
                    else {  
                        error.insertAfter(element);
                    }
                },
                submitHandler: function(form) {
                    let _form = $(form).serializeArray();
                    let option = $('select').val();
                    var ajax = system.ajax('../assets/harmony/Process.php?do-updateSchedule', ['reschedule',data[0], sessionStorage.getItem('kareer'), data[1], data[2], _form[0]['value'], _form[1]['value'], _form[2]['value'], option]);
                    ajax.done(function(ajax) {
                        console.log(ajax);
                        if (ajax == 1) {
                            system.alert('Reschedule success.', function(){
                                $('#modal_confirm').modal('close');
                                location.reload();
                                schedule.list();
                            });
                        } 
                        else {
                            system.alert('Schedule error.', function(){});
                        }
                    });
                }
            });
            });
        },
        getTodaysAppointment:function(){
            let businessId = business.id();
            var data = system.ajax('../assets/harmony/Process.php?get-bookingByRMToday',[businessId,moment().format('YYYY-MM-DD')]);
            data.done(function(data){
                let result = JSON.parse(data);
                if(result.length>0){
                    let content = '';
                    $.each(result,function(i,v){
                        content += `<tr>
                            <td width='20%' style='vertical-align: top;'>
                                <img src="../assets/images/profile/avatar.png" class="circle left" width="35px">
                            </td>   
                            <td width='80%'>
                                <span class="bold"> ${v[4]} ${v[5]}</span>
                                <div> Call: ${v[6]}</div>
                                <div> Time: ${v[2]}</div>
                                <div> Meet at: ${v[3]}</div>
                                    <a href='' class='btn indigo darken-5 z-depth-0 waves-effect waves-light round-button'>Set a plan</a>
                                    <a href='#cmd=index;content=_account_client;${v[0]}' class=''>View account</a>                          
                            </td>
                        </tr>`;
                    });
                    $("#display_rm_appointment table").html(content);                   
                }
                else{
                    $("#display_rm_appointment").html('<h6>You have no appointment today.</h6>');
                }
            });
        }
    }
}();

var pass = function() {
    "use strict";
    return {
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
}();