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
            var content = "",data = employer.get();
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
            $('.tooltipped').tooltip({delay: 50});
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
                              //    var data = $(this).data('option');
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

var jobPosts = function() {
    "use strict";
    return {
        get: function(id) {
            let ajax = system.ajax('../assets/harmony/Process.php?get-employerJobsPosts', id);
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
                            field_salary: { required: true, maxlength: 6},
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
                            var ajax = system.ajax('../assets/harmony/Process.php?do-postJob', [user[0], user[1], _form[0]['value'], _form[1]['value'], _form[2]['value'], _form[3]['value'], description2, skillsArray]);
                            ajax.done(function(ajax) {
                                console.log(ajax);
                                if (ajax == 1) {
                                    $('#modal_medium').modal('close');
                                    system.alert('Posted.', function() {});
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
            let id = JSON.parse(employer.check_access())[0], status = "", content = "", chip = "", skills = "";
            let data = JSON.parse(jobPosts.get(id));

            console.log(data);

            this.content(data);
        },
        content:function(data){
            $.each(data, function(i, v) {
                chip = "";
                status = (v[1] == 1)?'Active':'Inactive';
                if(v[4] != "null"){
                    $.each(skills, function(i, s) {
                        chip += `<a class="chip">${s}</a>`;
                    });
                }
                $("#job-post table tbody").append(`
                    <tr>
                        <td widtd="50px" class="center">${status}</td>
                        <td widtd="300px" class="center">${v[2]}</td>
                        <td widtd="150px" class="center">${v[3]}</td>
                        <td widtd="200px" class="center">${chip}</td>
                        <td widtd="150px" class="center">${v[5]}</td>
                        <td>
                            <a href='#cmd=index;content=focusjob;id=${v[0]}' data-cmd='view-job' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='View Job Details'>
                                <i class='material-icons right hover black-text'>more_vert</i>
                            </a>
                        </td>
                    </tr>
                `);
            });
        },
        view:function(){
            let id = jobPosts.id(), chip ="";
            let ajax = system.ajax('../assets/harmony/Process.php?get-jobPost', id);
            let job = JSON.parse(ajax.responseText)[0];
            let status = (job[10] == 1)?'Active':'Inactive';
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
                                                    <td width='150px' class='grey-text' for='salary'>${job[8]}</td>
                                                    <td width='20px'>
                                                        <a data-for='salary' data-cmd='updatejob' data-value='${job[8]}' data-name='${job[8]}' data-node='${job[0]}' data-prop='Salary' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update salary'>
                                                            <i class='material-icons right hover black-text'>mode_edit</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width='50px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Date Posted: </span></td>
                                                    <td width='150px' class='grey-text' for='date'>${job[9]}</td>
                                                    <td width='20px'>
                                                        <a data-for='date' data-cmd='updatejob' data-value='${job[9]}' data-name='${job[9]}' data-node='${job[0]}' data-prop='Date' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update date'>
                                                            <i class='material-icons right hover black-text'>mode_edit</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width='50px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Short Description: </span></td>
                                                    <td width='150px'class='grey-text' for='short'>${job[3]}</td>
                                                    <td width='20px'>
                                                        <a data-for='short' data-cmd='updatejob' data-value='${job[3]}' data-name='${job[3]}' data-node='${job[0]}' data-prop='shortDes' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update short description'>
                                                            <i class='material-icons right hover black-text'>mode_edit</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width='50px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Full Description: </span></td>
                                                    <td width='150px' class='grey-text ' for='full'>${job[4]}</td>
                                                    <td width='20px'>
                                                        <a data-for='full' data-cmd='updatejob' data-value='${job[4]}' data-name='${job[4]}' data-node='${job[0]}' data-prop='longDes' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update full description'>
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
                $("#modal_medium .modal-content").html(content);
                $('#modal_medium .modal-footer').html("");

                if (data.prop == "title") {
                    content = `<h5>Change ${data.prop}</h5>
                                    <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                        <div class="input-field col s6">
                                            <label for='field_${data.prop}' class='active'>First Name: </label>
                                            <input id='field_${data.prop}' value='${data.value}' type='text' name='field_${data.prop}' data-error='.error_${data.prop}'>
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
                            var id = JSON.parse(employer.check_access());
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
                                        $(_this).attr({ 'data-value': _form[0]['value'], 'data-name': `${_form[0]['value']}` });
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
                                    // $(`.card-title[for='${data.for}']`).html(`${_form[0]['value']}`);
                                    // $(_this).attr({ 'data-value': _form[0]['value'], 'data-name': `${_form[0]['value']}` });
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
                                    <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                        <div class="input-field col s6">
                                            <label for='field_${data.prop}' class='active'> </label>
                                            <input id='field_${data.prop}' value='${data.value}' type='number' name='field_${data.prop}' data-error='.error_${data.prop}'>
                                            <div class='error_${data.prop}'></div>
                                        </div>
                                        
                                        <button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                        <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                    </form>`;
                    $("#modal_medium .modal-content").html(content);
                    $('#modal_medium').modal('open');
                    $("#form_update").validate({
                        rules: {
                            field_Salary: { required: true },
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
                            var id = JSON.parse(employer.check_access());
                            var _form = $(form).serializeArray();
                            if ((data.value == _form[0]['value'])) {
                                system.alert('You did not even change the value.', function() {});
                            } else {
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'), 'job', 'salary', data.node, _form[0]['value']]);
                                ajax.done(function(ajax) {
                                    console.log(ajax);
                                    if (ajax == 1) {
                                        $('#modal_medium').modal('close');
                                        $(`td[for='${data.for}']`).html(`${_form[0]['value']}`);
                                        // $(_this).attr({ 'data-value': _form[0]['value'], 'data-name': `${_form[0]['value']}` });
                                        system.alert('Updated.', function() {});
                                    } else {
                                        system.alert('Failed to update.', function() {});
                                    }
                                });
                            }
                        }
                    });
                } 
                else if (data.prop == "Date") {
                    content = `<h5>Change ${data.prop}</h5>
                                    <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                        <div class="input-field col s6">
                                            <label for='field_${data.prop}' class='active'></label>
                                            <input id='field_${data.prop}' value='${data.value}' type='date' name='field_${data.prop}' data-error='.error_${data.prop}'>
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
                            var id = JSON.parse(employer.check_access());
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
                                        // $(_this).attr({ 'data-value': _form[0]['value'], 'data-name': `${_form[0]['value']}` });
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
                                            <textarea class="materialize-textarea" maxlength='500' id='field_${data.prop}' value='' type='text' name='field_${data.prop}' data-error='.error_${data.prop}'>${data.value}</textarea>
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
                            var id = JSON.parse(employer.check_access());
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
                                        // $(_this).attr({ 'data-value': _form[0]['value'], 'data-name': `${_form[0]['value']}` });
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
                    editor.clipboard.dangerouslyPasteHTML(data.value);
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
                            var id = JSON.parse(employer.check_access());
                            var _form = $(form).serializeArray();
                            if (data.value == _form[0]['value']) {
                                system.alert('You did not even change the value.', function() {});
                                let _form = editor.root.innerHTML;
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'), 'job', 'longDes', data.node, _form]);
                                ajax.done(function(ajax) {
                                    if (ajax == 1) {
                                        $('#modal_medium').modal('close');
                                        $(`td[for='${data.for}']`).html(`${_form}`);
                                        // $(_this).attr({ 'data-value': _form[0]['value'], 'data-name': `${_form[0]['value']}` });
                                        system.alert('Updated.', function() {});
                                    } 
                                    else {
                                        system.alert('Failed to update.', function() {});
                                    }
                                });
                            }
                        }
                    });
                }
                else if (data.prop == "Status") {
                    let title = (data.value == 'Active')?0:1;
                    content = `<h5>Are You sure you want to change the ${data.prop} of this job?</h5>
                                    <form id='form_update' class='formValidate' method='get' action='' novalidate='novalidate'>
                                        <div class="input-field col s6">
                                            <textarea class="materialize-textarea" maxlength='500' data-field='field_${data.prop}' name='field_${data.prop}' placeholder='Remarks'></textarea>
                                        </div>
                                        <button type='submit' data-cmd='button_proceed' class='waves-effect waves-grey grey lighten-5 blue-text btn-flat modal-action right'>Save</button>
                                        <a class='waves-effect waves-grey grey-text btn-flat modal-action modal-close right'>Cancel</a>
                                    </form>`;
                    $("#modal_medium .modal-content").html(content);
                    $('#modal_medium').modal('open');
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
                            var _form = $(form).serializeArray();
                            let remarks = $("textarea[data-field='field_Status']").val();
                            if(remarks.length == 0){
                                    Materialize.toast('Remarks is required.',4000);
                            }
                            else if(remarks.length > 800){
                                    Materialize.toast('Statement is too long.',4000);
                            }
                            else{
                                var ajax = system.ajax('../assets/harmony/Process.php?do-updateInfo', [sessionStorage.getItem('kareer'), 'job', 'status', data.node, title, remarks]);
                                ajax.done(function(ajax) {
                                    title = (title == 1)?'Active':'Inactive';
                                    if (ajax == 1) {
                                        $('#modal_medium').modal('close');
                                        $(`td[for='${data.for}']`).html(`${title}`);
                                        // $(_this).attr({ 'data-value': _form[0]['value'], 'data-name': `${_form[0]['value']}` });
                                        system.alert('Updated.', function() {});
                                    } else {
                                        system.alert('Failed to update.', function() {});
                                    }
                                });
                            }
                        }
                    });
                }
            });
        },
    }
}();

var job = {

}

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