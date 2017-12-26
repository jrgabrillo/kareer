    // do not delete
console.log('%cDeveloped By: RNR Digital Consultancy (2017)', 'background:#000;color:#ccc;');

Framework7.prototype.plugins.kareer = function (app, params) {
    'use strict';
    if (!params) return;
    var self = this;
    // var processor = 'http://192.168.1.20/kareer/assets/harmony/mobile.php?';
    // var processor = 'http://localhost/KApp/www/harmony/mobile.php?';
    // var processor = 'http://localhost/kareer/mobile/harmony/mobile.php?';
    var processor = 'http://localhost/kareer/mobile/harmony/mobile.php?';
    // var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
    var directory = '/';
    var $$ = Dom7;
    var view = app.addView('.view-main');

    var system = {
        ini:function(){
            
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            window.fbAsyncInit = function() {
                FB.init({
                    appId      : '2045233702379585',
                    cookie     : true,  // enable cookies to allow the server to access 
                                        // the session
                    xfbml      : true,  // parse social plugins on this page
                    version    : 'v2.11' // use graph api version 2.8
                });
            }

            // var deviceSize = system.getDeviceSize();
            // console.log(deviceSize);
            logIn.ini();
            signUp.ini();
            content.ini();
        },
        notification:function(title,message,button,timeout,loader,_functionOpen,_functionClose){
            var timeout = (timeout == "")?false:timeout;
            app.addNotification({
                title: title,
                message: message,
                button:button,
                onClose:function(){
                    if(_functionClose != false){
                        _functionClose();
                    }
                }
            });
            if(timeout != false){
                setTimeout(function(){
                    app.closeNotification(".notification-item");
                },timeout);
            }
            if(_functionOpen != false){
                _functionOpen();                
            }
        },
        ajax:function(url,data){
            return $.ajax({
                type: "POST",
                url: url,
                data: {data: data},
                async: !1,
                cache:false,
                error: function() {
                    console.log("Error occured");
                }
            });        
        },
        html:function(url){
            return $.ajax({
                type: "GET",
                url: url,   
                crossDomain: true,
                dataType:'jsonp',
                jsonp:true,
                headers: 'X-Requested-With: XMLHttpRequest',
                contentType:'application/x-www-form-urlencoded; charset=UTF-8',
                error: function() {
                    console.log("Error occured")
                }
            });
        },
        send_mail:function(email,subject,message){
            return system.ajax(processor+'send-mail',[email,subject,message]);
        },
        xml:function(url){
            return $.ajax({
                type: "GET",
                url: url,
                dataType: 'xml',
                async: !1,
                cache:false
            });
        },
        popup:function(title,message){
            var mainView = app.addView('.view-main');            
            app.addNotification({
                title: title,
                message: message
            });
        },
        preloader:function(status){
            if(status){
                var container = $$('body');
                if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
                app.showProgressbar(container, 'multi');
            }
            else{
                app.hideProgressbar();              
            }
        },
        block:function(status){
            if(status){
                app.popup('.loader');
            }
            else{
                app.closeModal('.loader');
            }
        },
        logoHandler:function(){
            var bg = 'img/img-bg.jpg';
            var logo = 'img/logo.png';
            bg = (localStorage.getItem('bg')!=null)?localStorage.getItem('bg'):bg;
            logo = (localStorage.getItem('logo')!=null)?localStorage.getItem('logo'):logo;

            $("img[src='img/logo.png']").attr({'src':logo});
            $(".panel .panel-bg").attr({'style':'background-image:url('+bg+');'});
        },      
        getDeviceSize:function(){
            var device = window;
            return window.innerWidth;
        }
    };
    var content = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            if((applicantData == null) || (applicantData == "")){
                view.router.loadPage("index.html");
            }
            else{

                view.router.loadPage("pages/admin/index.html");
                // view.router.loadPage("index.html");
                $$(".navbar").removeClass('hidden');
                
                app.onPageInit('index',function(page){
                    content.controller();
                    account.ini();
                });         

                app.onPageInit('job',function(page){
                    content.controller();

                    var applicant = JSON.parse(localStorage.getItem('applicant'));
                    var jobList = jobs.get(applicant[0][0]);
                    var appliedList = jobs.applied(applicant[0][0]);
                    var bookmarkedList = jobs.bookmarked(applicant[0][0]);
                    // console.log(jobList);
                    jobs.show(jobList);
                });

                app.onPageInit('search',function(page){
                    content.controller();
                    var salarySlider = document.getElementById('salary-slider');
                    noUiSlider.create(salarySlider, {
                        start: [0, 20000],
                        connect: true,
                        step: 1000,
                        orientation: 'horizontal', // 'horizontal' or 'vertical'
                        range: {
                            'min': 0,
                            'max': 100000
                        },
                        format: wNumb({
                            decimals: 0
                        })
                    });
                    jobs.search(applicantData[0][0],salarySlider);
                });
            }
        },
        controller:function(){
            $$(".navbar a").on('click',function(){
                var data = $$(this).data('page');
                console.log(data);
                view.router.loadPage("pages/admin/"+data+".html");
                $("a").removeClass('color-teal').addClass('color-gray');
                $(this).removeClass('color-gray').addClass('color-teal')
                // content.pageContent(page+'.html');
            });
        },
        pageContent:function(url){
            var pageContent = system.ajax('pages/admin/'+url,'');
            pageContent.done(function(data){
                $$('body .views .view').html(data);
            })
        }
    }

    var account = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var data = account.get(applicantData[0][0]);
            jobs.bookmarked(applicantData[0][0]);
            account.updatePicture(data);
            $("#index img.responsive-img").attr({"src":"img/profile/"+data[24]});
            var content = "<div class='content-block'>"+
                            "    <p class='color-gray'><h5>"+data[7]+" "+data[8]+"</h5></p>"+
                            "</div>"+
                            "<div class='content-block'>"+
                            "    <div class='row rows'>"+
                            "        <div class='col-33'>"+
                            "            <a data-load='account'  class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 6px;'>person</i></a><div class='grey-text' style = 'font-size: xx-small'>ACCOUNT</div>"+
                            "        </div>"+
                            "        <div class='col-33'>"+
                            "            <a data-load='career' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 6px;'>briefcase_fill</i></a><div class='grey-text' style = 'font-size: xx-small'>CAREER</div>"+
                            "        </div>"+
                            "        <div class='col-33'>"+
                            "            <a data-load='academic' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 6px;'>folder_fill</i></a><div class='grey-text' style = 'font-size: xx-small'>ACADEMIC</div>"+
                            "        </div>"+
                            "    </div>"+
                            "    <div class='row rows'>"+
                            "        <div class='col-33'>"+
                            "            <a data-load='bookmarks' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 6px;'>bookmark_fill</i></a><div class='grey-text' style = 'font-size: xx-small'>BOOKMARKS</div>"+
                            "        </div>"+
                            "        <div class='col-33'>"+
                            "            <a data-load='settings' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 6px;'>gear_fill</i></a><div class='grey-text' style = 'font-size: xx-small'>SETTINGS</div>"+
                            "        </div>"+
                            "        <div class='col-33'>"+
                            "            <a data-load='resume' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 6px;'>document_text_fill</i></a><div class='grey-text' style = 'font-size: xx-small'>RESUME</div>"+
                            "      </div>"+
                            "    </div>"+
                            "</div>";
            $("#display_account").html(content);

            $("a.account").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageInit('account',function(page){
                console.log('account');
                view.router.reloadPage("pages/admin/account.html");
                var applicantData = JSON.parse(localStorage.getItem('applicant'));
                var data = account.get(applicantData[0][0]);
                account.display(data);
                account.edit(data);
            });

            app.onPageInit('career',function(page){
                console.log('career');
                career.ini();
            });
            app.onPageInit('academic',function(page){
                console.log('academic');
                academic.ini();
            });
            app.onPageInit('bookmarks',function(page){
                console.log('bookmarks');
                var applicant  = JSON.parse(localStorage.getItem('applicant'));
                var bookmarkedList = jobs.getBookmarked(applicant[0][0]);
                jobs.show(bookmarkedList);
            });
            app.onPageInit('settings',function(page){
                console.log('settings');
                var applicantData = JSON.parse(localStorage.getItem('applicant'));
                var data = account.get(applicantData[0][0]);
                account.settings(data);
                account.updateSettings(data);
            }); 
            app.onPageInit('resume',function(page){
                console.log('resume');
                resume.ini();

            });
        }, 
        controller:function(){
            $$(".account a").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                return data;
            });
        },
        settings:function(data){
            $$("#display_email strong").html(data[3]);
            $$("#display_email a").attr({"data-node":data[0]});
            $$("#display_password strong").html("*******");
            $$("#display_password a").attr({"data-node":data[0]});

            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('index',function(page){
                account.ini();
            });
            account.logout();
        },
        logout:function(){
            $("a[data-cmd='account-logout']").on('click',function(){
                app.popup('.popup-logout');           
                var content =   `<ul>
                                    <li>
                                        <h5 class = 'center'>Are you sure?
                                        </h5>
                                    </li>
                                    <li>
                                        <a href='#' class='btn close-popup waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>
                                        <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>
                                    </li>
                                </ul>`;
                $("#logout").html(`<div class="card-content">${content}</div>`);
                $("a[data-cmd='proceed']").on('click',function(){
                    console.log("uwian na");
                    localStorage.removeItem('applicant','');
                    localStorage.removeItem('applications','');
                    localStorage.removeItem('bookmarks','');
                    window.location.reload();
                }); 
            });           
        },
        updateSettings:function(data){
            $("a[data-cmd='update']").on('click',function(){
                app.popup('.popup-update');
                var data = $(this).data();
                var id = data.node;
                if(data.prop == "Email"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Email</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateSettings").html(content);       
                    $("#form_edit").validate({
                        rules: {
                            field_Email: {required: true,email:true,maxlength:100}
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
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = account.get(id);
                                        account.settings(newdata);
                                        account.updateSettings(newdata);
                                        account.ini();
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                if(data.prop == "Password"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" id="password" style="margin-top: 50px; !important">
                                                        <input type='password' id='field_password' name='field_password' class=" form-control color-white">
                                                        <a class="x btn btn-flat" data-cmd="showPassword" style="width: 0%;position: absolute; right: 0px; top: 50%; margin-top: -8px;"><i class="icon f7-icons color-teal">eye</i></a>
                                                        <a class="y hidden btn btn-flat" data-cmd="hidePassword" style="width: 0%;position: absolute; right: 0px; top: 50%; margin-top: -8px;"><i class="icon f7-icons color-teal" style=''>eye</i></a>
                                                        <label class="grey-text" for='field_password' style="font-size:18px;margin-top: -10px">Password</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateSettings").html(content);       
                    $("#form_edit").validate({
                        rules: {
                            field_password: {required: true, maxlength: 50,checkPassword:true}
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
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = account.get(id);
                                        account.settings(newdata);
                                        account.updateSettings(newdata);
                                        account.ini();
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                    $$("a[data-cmd='showPassword']").on('click',function(){
                        $("#password input").attr({"type":"text"});
                        $("a.x").addClass('hidden');
                        $("a.y").removeClass('hidden');

                    }); 
                    $$("a[data-cmd='hidePassword']").on('click',function(){
                        $("#password input").attr({"type":"password"});
                        $("a.y").addClass('hidden');
                        $("a.x").removeClass('hidden');

                    });
                }
            });
        },
        display:function(data){
            $("img.resume").attr({"src":"img/profile/"+data[24]});
            var Ldata = language.getAll(data[0]);
            var L ="";
            $.each(Ldata,function(i,v){
                L +=""+v[2]+", ";
            });
            // console.log(L);
            var Skilldata = skills.getAll(data[0]);
            var skill ="";
            $.each(Skilldata,function(i,v){
                skill +=""+v[2]+", ";
            });
            // console.log(L);
            $$("#display_skills strong").html(skill);
            // $$("#display_skills a").attr({"data-value":data[2]});
            $$("#display_skills a").attr({"data-node":data[0]});
            $$("#display_language strong").html(L);
            // $$("#display_language a").attr({"data-value":data[2]});
            $$("#display_language a").attr({"data-node":data[0]});
            $$("#display_givenName strong").html(data[7]);
            $$("#display_givenName a").attr({"data-value":data[7]});
            $$("#display_givenName a").attr({"data-node":data[0]});
            $$("#display_middleName strong").html(data[9]);
            $$("#display_middleName a").attr({"data-value":data[9]});
            $$("#display_middleName a").attr({"data-node":data[0]});
            $$("#display_lastName strong").html(data[8]);
            $$("#display_lastName a").attr({"data-value":data[8]});
            $$("#display_lastName a").attr({"data-node":data[0]});
            $$("#display_gender strong").html(data[10]);
            $$("#display_gender a").attr({"data-value":data[10]});
            $$("#display_gender a").attr({"data-node":data[0]});
            $$("#display_age strong").html(data[11]);
            $$("#display_age a").attr({"data-value":data[11]});
            $$("#display_age a").attr({"data-node":data[0]});
            $$("#display_dateOfBirth strong").html(data[12]);
            $$("#display_dateOfBirth a").attr({"data-value":data[12]});
            $$("#display_dateOfBirth a").attr({"data-node":data[0]});
            $$("#display_placeOfBirth strong").html(data[13]);
            $$("#display_placeOfBirth a").attr({"data-value":data[13]});
            $$("#display_placeOfBirth a").attr({"data-node":data[0]});
            $$("#display_address strong").html(data[14]);
            $$("#display_address a").attr({"data-value":data[14]});
            $$("#display_address a").attr({"data-node":data[0]});
            $$("#display_citizenship strong").html(data[15]);
            $$("#display_citizenship a").attr({"data-value":data[15]});
            $$("#display_citizenship a").attr({"data-node":data[0]});
            $$("#display_height strong").html(data[16]);
            $$("#display_height a").attr({"data-value":data[16]});
            $$("#display_height a").attr({"data-node":data[0]});
            $$("#display_weight strong").html(data[17]);
            $$("#display_weight a").attr({"data-value":data[17]});
            $$("#display_weight a").attr({"data-node":data[0]});
            $$("#display_mother strong").html(data[18]);
            $$("#display_mother a").attr({"data-value":data[18]});
            $$("#display_mother a").attr({"data-node":data[0]});
            $$("#display_father strong").html(data[19]);
            $$("#display_father a").attr({"data-value":data[19]});
            $$("#display_father a").attr({"data-node":data[0]});
            $$("#display_religion strong").html(data[21]);
            $$("#display_religion a").attr({"data-value":data[21]});
            $$("#display_religion a").attr({"data-node":data[0]});
            $$("#display_mother_occupation strong").html(data[22]);
            $$("#display_mother_occupation a").attr({"data-value":data[22]});
            $$("#display_mother_occupation a").attr({"data-node":data[0]});
            $$("#display_father_occupation strong").html(data[23]);
            $$("#display_father_occupation a").attr({"data-value":data[23]});
            $$("#display_father_occupation a").attr({"data-node":data[0]});
            
            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageInit('resume',function(page){
                resume.ini();
            });

            app.onPageBack('index',function(page){
                account.ini();
            });
            app.onPageBack('account',function(page){
                account.ini();
            });

            $("a.next").on('click',function(){ 
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                app.onPageInit('builderCareer',function(page){
                    career.ini();
                });
            });
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-applicant',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        show:function(data){
            $("a[data-cmd='view']").on('click',function(){
                var data = $(this).data();
            });
        },
        edit:function(data){
            $("a[data-cmd='edit']").on('click',function(){
                app.popup('.popup-edit');
                var data = $(this).data();
                var id = data.node;
                if(data.prop == "GivenName"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Given Name</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $('#editpopup').html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }               
                    $("#form_edit").validate({
                        rules: {
                            field_GivenName: {required: true,maxlength:50}
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
                            field_GivenName: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    $$('input').val("");
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){

                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });
                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "MiddleName"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Middle Name</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $('#editpopup').html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }             
                    $("#form_edit").validate({
                        rules: {
                            field_MiddleName: {required: true,maxlength:100}
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
                            field_MiddleName: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "LastName"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Last Name</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }               
                    $("#form_edit").validate({
                        rules: {
                            field_LastName: {required: true,maxlength:100}
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
                            field_LastName: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Gender"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="active" style ="top: auto;" for='field_${data.prop}'>Gender</label>
                                                        <select id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}'>
                                                            <option value ='Male'>Male</option>
                                                            <option value ='Female'>Female</option>
                                                        </select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                    }        
                    $('select').material_select();             
                    $("#form_edit").validate({
                        rules: {
                            field_Gender: {required: true,maxlength:100}
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
                            field_Gender: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Age"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Age</label>
                                                        <input type='number' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }           
                    $("#form_edit").validate({
                        rules: {
                            field_Age: {required: true,maxlength:100}
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
                            field_Age: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "DateOfBirth"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="active" for='field_${data.prop}'>Date Of Birth</label>
                                                        <input type='date' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                    }           
                    $("#form_edit").validate({
                        rules: {
                            field_DateOfBirth: {required: true,maxlength:100}
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
                            field_DateOfBirth: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "PlaceOfBirth"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Place Of Birth</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }             
                    $("#form_edit").validate({
                        rules: {
                            field_PlaceOfBirth: {required: true,maxlength:100}
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
                            field_PlaceOfBirth: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "PermanentAddress"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Permanent Address</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }             
                    $("#form_edit").validate({
                        rules: {
                            field_PermanentAddress: {required: true,maxlength:100}
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
                            field_PermanentAddress: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Citizenship"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Citizenship</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }             
                    $("#form_edit").validate({
                        rules: {
                            field_Citizenship: {required: true,maxlength:100}
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
                            field_Citizenship: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Height"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Height</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }             
                    $("#form_edit").validate({
                        rules: {
                            field_Height: {required: true,maxlength:100}
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
                            field_Height: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Weight"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Weight</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }              
                    $("#form_edit").validate({
                        rules: {
                            field_Weight: {required: true,maxlength:100}
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
                            field_Weight: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "MotherName"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Mother's Name</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }             
                    $("#form_edit").validate({
                        rules: {
                            field_MotherName: {required: true,maxlength:100}
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
                            field_MotherName: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "FatherName"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Father's Name</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }             
                    $("#form_edit").validate({
                        rules: {
                            field_FatherName: {required: true,maxlength:100}
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
                            field_FatherName: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Language"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Language</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="input-field">
                                                        <label class="active" style ="top: auto;" for='field_level'>Level</label>
                                                        <select id="field_level" name="field_level">
                                                            <option value="Beginner">Beginner</option>
                                                            <option value="Conversational">Conversational</option>
                                                            <option value="Fluent">Fluent</option>
                                                            <option value="Native">Native</option>
                                                        </select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }             
                    $('select').material_select();
                    $("#form_edit").validate({
                        rules: {
                            field_Language: {required: true,maxlength:100}

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
                            field_Language: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Religion"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Religion</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }             
                    $("#form_edit").validate({
                        rules: {
                            field_Religion: {required: true,maxlength:100}
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
                            field_Religion: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Mother_Occupation"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Mother's Occupation</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }             
                    $("#form_edit").validate({
                        rules: {
                            field_Mother_Occupation: {required: true,maxlength:100}
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
                            field_Mother_Occupation: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Father_Occupation"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Father's Occupation</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }             
                    $("#form_edit").validate({
                        rules: {
                            field_Father_Occupation: {required: true,maxlength:100}
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
                            field_Father_Occupation: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Skills"){  
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Skills</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                    </div>
                                                </li>                                        
                                                <li>
                                                    <div class="input-field" >
                                                        <select id="field_level" name="field_level">
                                                            <option value="Beginner">Beginner</option>
                                                            <option value="Intermediate">Intermediate</option>
                                                            <option value="Advance">Advance</option>
                                                            <option value="Expert">Expert</option>
                                                        </select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#editpopup").html(content);
                    if(data.value != ""){
                        $('label.a').addClass("active");
                    }            
                     $('select').material_select(); 
                    $("#form_edit").validate({
                        rules: {
                            field_Skills: {required: true,maxlength:100}
                            
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
                            field_Skills: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = account.get(id);
                                        account.edit(newdata);
                                        account.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
            });
        },
        updatePicture:function(data){
            $("a[data-cmd='UpdatePic']").click(function(){
                app.popup('.popup-upload');
                var picture = "img/profile/"+data[24];
                var content =  ` <div class='card-content'>
                                    <div class=' center image-crop'>
                                       <img class='circle responsive-img' style='width: 145px; height: 145px; border:2px; border-style: solid; border-color: #2b9c9b' src='${picture}'>
                                    </div>
                                    <div class='center btn-group' style='margin-top: 10% !important;'>
                                        <label for='inputImage' class='btn-flat btn-xs btn-primary'>
                                           <input type='file' accept='image/*' name='file' id='inputImage' class='hide'>Choose File
                                        </label>
                                        <button class='btn-flat btn-info btn-xs close-popup' data-option='-90' type='button'>
                                           CANCEL
                                        </button>
                                        <button class='btn-flat btn-info btn-xs hidden' data-cmd='rotate' data-option='-90' type='button' title='Rotate Left'>
                                           <i class='icon f7-icons'>undo</i>
                                        </button>
                                        <button class='btn-flat btn-info btn-xs hidden' data-cmd='rotate' data-option='90' type='button' title='Rotate Right'>
                                           <i class='icon f7-icons'>redo</i>
                                        </button>
                                        <button class='btn-flat btn-danger btn-xs hidden' data-cmd='save' type='button'>
                                           <i class='icon f7-icons'>check</i>
                                        </button>
                                    </div>
                                </div>`;
                $("#profile_picture2").html(content);
                // $('.tooltipped').tooltip({delay: 50});
              
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
                                            var ajax = system.ajax(processor+'do-update-image',[data[0],$image.cropper("getDataURL")]);
                                            ajax.done(function(data){
                                                console.log(data);
                                                if(data == 1){
                                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                                        app.closeModal('.popup-upload');
                                                        account.ini();
                                                    });
                                                }
                                                else{
                                                   system.notification("Update","Failed.",false,3000,true,false,false);
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
                    app.closeModal('.popup-upload');
                    account.ini();
                });
            });
        }
    }

    var career = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = career.getAll(applicantData[0][0]);
            $$("a[data-cmd='add-career']").on('click',function(){
                career.add(applicantData[0][0]);
            });
            career.show(list);

            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageInit('index',function(page){
                account.controller();
            });
        },
        add:function(id){
            app.popup('.popup-career');
            $("a.goback").on('click',function(){
                $("div.list").removeClass('hidden');
                $("div.add").addClass('hidden');
                $("a.add").removeClass('hidden');
                $("a.goback").addClass('hidden');
                $("a.home").removeClass('hidden');
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            $('#field_govt_service').material_select();
            $("#form_career").validate({
                rules: {
                    field_dateFirst: {required: true, maxlength:20},
                    field_dateLast: {required: true, maxlength:20},
                    field_dateLast: { greaterThan: "#field_dateFirst" },
                    field_position: {required: true, maxlength:100},
                    field_agency: {required: true, maxlength:100},
                    field_salary: {required: true, maxlength:5},
                    field_appointment: {required: true, maxlength:100},
                    field_govt_service: {required: true, maxlength:100},
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
                    var data = system.ajax(processor+'do-career',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","Career Added.",false,2000,true,false,function(){
                                app.closeModal('.popup-career');
                                career.ini();
                            });
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,false,false);
                        }
                    })
                }
            });
        },
        getAll:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-careerAll',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-career',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        show:function(list){
            var content = "";       
            $.each(list,function(i,v){
                content += "<li class='collection-item row'>"+
                            "   <div class='chip' style = 'width: 10%;'>"+
                            "   <div class='chip-media bg-blue' style = 'width: 50px !important; height: 50px !important; font-size: 24px;'>"+v[4][0]+"</div>"+
                            "   </div>"+
                            "   <div class = 'col 33'>"+
                            "   <div class='title color-teal' ><strong class ='color-black'>"+v[4]+"</strong></div>"+
                            "   <div class ='color-teal' ><small class ='color-black'>"+v[2]+" - "+v[3]+"</small></div>"+
                            "   </div>"+
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";
                $("a.career").removeClass('disabled');
                $("div.empty").addClass('hidden');

            });

            $$("#display_career").html("<ul class='collection'>"+content+"</ul");

            $("a[data-cmd='view']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                var c = career.get(id);
                career.display(c);
                career.edit(c);
                $('div.display').addClass('hidden');
                $('div.focus').removeClass('hidden');
                $('.card-header a').addClass('hidden');
                $('div.NAV ').addClass('hidden');
                $('div.TOOL').addClass('hidden');
            });

            $("a.career").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                app.onPageInit('builderAcademic',function(page){
                    academic.ini();
                });
            });
        },
        display:function(c){
            $$("#display_fromdate strong").html(c[0][2]);
            $$("#display_fromdate a").attr({"data-node":c[0][0]});
            $$("#display_todate strong").html(c[0][3]);
            $$("#display_todate a").attr({"data-node":c[0][0]});
            $$("#display_position strong").html(c[0][4]);
            $$("#display_position a").attr({"data-node":c[0][0]});
            $$("#display_agency strong").html(c[0][5]);
            $$("#display_agency a").attr({"data-node":c[0][0]});
            $$("#display_salary strong").html(c[0][6]);
            $$("#display_salary a").attr({"data-node":c[0][0]});
            $$("#display_appointment strong").html(c[0][7]);
            $$("#display_appointment a").attr({"data-node":c[0][0]});
            $$("#display_govt_service strong").html(c[0][8]);
            $$("#display_govt_service a").attr({"data-node":c[0][0]});
            
            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('career',function(page){
                career.ini();
            });
            $$("a[data-cmd='back']").on('click',function(){
                career.ini();
                $('div.display').removeClass('hidden');
                $('div.focus').addClass('hidden');
                $('.card-header a').removeClass('hidden');
                $('div.NAV').removeClass('hidden');
                $('div.TOOL').removeClass('hidden');
            });
            $$("a[data-cmd='delete']").on('click',function(){
                career.delete(c);
            });
        },
        delete:function(c){
            var id = c[0][0];
            app.popup('.popup-delete');
            var content =   `<ul>
                                <li>
                                    <h5 class = 'center'>Are you sure?
                                    </h5>
                                </li>
                                <li>
                                    <a href='#' class='btn close-popup waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>
                                    <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>
                                </li>
                            </ul>`;
            $("#deletePopup").html(`<div class="card-content">${content}</div>`);
            $("a[data-cmd='proceed']").on('click',function(){
                var acad = system.ajax(processor+'do-deleteCareer',id);
                acad.done(function(data){
                    if(data != 0){
                        system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                            app.closeModal('.popup-delete');
                            career.ini();
                            $('div.display').removeClass('hidden');
                            $('div.focus').addClass('hidden');
                            $('.card-header a').removeClass('hidden');
                            $('div.NAV').removeClass('hidden');
                            $('div.TOOL').removeClass('hidden');

                        });

                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
                });
            });
        },
        edit:function(c){
            $$("a[data-cmd='update']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                app.popup('.popup-edit');
                if(data.prop == "Dates"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div>
                                                        <div class="input-field">
                                                            <label class="active" style="top: auto; left: 0px; font-size: 17px;">Inclusive dates (From - To)</label>
                                                            <div>
                                                                <input type='month' id="field_date1" name="field_date1" class="form-control" style="width: 100%;">
                                                            </div>
                                                            <div>
                                                                <input type='month' id="field_date2" name="field_date2" class="form-control" style="width: 100%;">
                                                            </div>
                                                        </div>                                            
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#update").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_date1: {required: true, maxlength:20},
                            field_date2: {required: true, maxlength:20, greaterThan: "#field_date1"},
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
                            var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                            data.done(function(data){
                                // console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = career.get(id);
                                        career.edit(newdata);
                                        career.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Position"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_position" name="field_position" class="form-control">
                                                        <label class="" for="field_position" style="top: -2px; left: 0px;">Position Title</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#update").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_position: {required: true, maxlength:100},
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
                            var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = career.get(id);
                                        career.edit(newdata);
                                        career.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Agency"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_agency" name="field_agency" class="form-control">
                                                        <label class="" for="field_agency" style="top: -2px !important; left: 0px !important;">Department/Company/Office/Agency</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#update").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_agency: {required: true, maxlength:100},
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
                            var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = career.get(id);
                                        career.edit(newdata);
                                        career.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Salary"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='number' id="field_salary" name="field_salary" min="1" max="50000" class="form-control">
                                                        <label class="" for="field_salary" style="top: -2px !important; left: 0px !important;">Monthly Salary</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#update").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_salary: {required: true, maxlength:5}
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
                            var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = career.get(id);
                                        career.edit(newdata);
                                        career.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Appointment"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_appointment" name="field_appointment" class="form-control">
                                                        <label class="" for="field_appointment" style="top: -2px !important; left: 0px !important;">Status of Appointment</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#update").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_appointment: {required: true, maxlength:100}
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
                            var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = career.get(id);
                                        career.edit(newdata);
                                        career.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Gov"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <select id="field_govt_service" name="field_govt_service">
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </select>
                                                        <label class="active" for="field_govt_service" style="font-size: 17px; top: -2px !important; left: 0px !important;">Gov't Service</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#update").html(content);
                    $('select').material_select();
                    $("#form_edit").validate({
                        rules: {
                            field_govt_service: {required: true, maxlength:3},
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
                            var data = system.ajax(processor+'do-updateCareer',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-edit');
                                        var newdata = career.get(id);
                                        career.edit(newdata);
                                        career.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
            });
        }
    }

    var academic = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = academic.getAll(applicantData[0][0]);
            $$("a[data-cmd='add-academic']").on('click',function(){
                academic.add(applicantData[0][0]);
            });
            academic.show(list);

            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageInit('index',function(page){
                account.controller();
            });
        },
        add:function(id){
            app.popup('.popup-academic');
            $('#field_yearLevel').material_select();

            $("#field_yearLevel").on('change', function() {
                var value = $(this).val();
                if ((value == 'Elementary') || (value == 'High School')){
                    $('#degree div').addClass('hidden');
                    $('#units div').addClass('hidden');
                }
                else if ((value == 'Tech Voc') || (value == 'College') || (value == 'Masteral') || (value == 'Doctorate')){
                    $('#degree div').removeClass('hidden');
                    $('#units div').removeClass('hidden');
                }
            });

            $("#form_academic").validate({
                rules: {
                    field_yearLevel: {required: true,maxlength:20},
                    field_school: {required: true,maxlength:100},
                    field_degree: {required: true,maxlength:100},
                    field_units: {required: true,maxlength:3,},
                    field_dateFrom: {required: true, maxlength:20},
                    field_dateTo: {required: true, maxlength:20, greaterThan: "#field_dateFrom"},
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
                    var data = system.ajax(processor+'do-academic',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","Academic Added.",false,2000,true,false,function(){
                                app.closeModal('.popup-academic');
                                academic.ini();
                            });
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,false,false);
                        }
                    })
                }
            }); 
        },
        getAll:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-academicAll',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-academic',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        show:function(list){
            var content = "";
            $.each(list,function(i,v){
                content += "<li class='collection-item row'>"+
                            "   <div class='chip' style = 'width: 10%;'>"+
                            "   <div class='chip-media bg-blue' style = 'width: 50px !important; height: 50px !important; font-size: 24px;'>"+v[2][0]+"</div>"+
                            "   </div>"+
                            "   <div class = 'col 33'>"+
                            "   <div class='title color-teal' ><strong class ='color-black'>"+v[2]+"</strong></div>"+
                            "   <div class ='color-teal' ><small class ='color-black'>"+v[5]+"</small></div>"+
                            "   </div>"+
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";

                    $("a.academic").removeClass('disabled');
            });
            $$("#display_academic").html("<ul class='collection'>"+content+"</ul");
            $("a[data-cmd='view']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                var a = academic.get(id);
                academic.display(a);
                academic.edit(a);
                $('div.display').addClass('hidden');
                $('div.focus').removeClass('hidden');
                $('.card-header a').addClass('hidden');
                $('div.NAV ').addClass('hidden');
                $('div.TOOL').addClass('hidden');
            });

            $("a.academic").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                app.onPageInit('builderSkills',function(page){
                    skills.ini();
                });
            });
        },
        display:function(a){
            var period = a[0][5];
            if((a[0][2] == 'Elementary') || (a[0][2] == 'High School')){
                $('li.degree').addClass('hidden');
                $('li.units').addClass('hidden');
            }
            else if ((a[0][2] == 'Tech Voc') || (a[0][2] == 'College') || (a[0][2] == 'Masteral') || (a[0][2] == 'Doctorate')){
                $('li.degree').removeClass('hidden');
                $('li.units').removeClass('hidden');
            }
            $$("#display_Year_level strong").html(a[0][2]);
            $$("#display_Year_level a").attr({"data-node":a[0][0]});
            $$("#display_school strong").html(a[0][3]);
            $$("#display_school a").attr({"data-node":a[0][0]});
            $$("#display_degree strong").html(a[0][4]);
            $$("#display_degree a").attr({"data-node":a[0][0]});
            $$("#display_units strong").html(a[0][6]);
            $$("#display_units a").attr({"data-node":a[0][0]});
            $$("#display_fromdate strong").html(period.substr(0,8));
            $$("#display_fromdate a").attr({"data-node":a[0][0]});
            $$("#display_todate strong").html(period.substr(9));
            $$("#display_todate a").attr({"data-node":a[0][0]});

            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('academic',function(page){
                academic.ini();
            });
            $$("a[data-cmd='back']").on('click',function(){
                academic.ini();
                $('div.display').removeClass('hidden');
                $('div.focus').addClass('hidden');
                $('.card-header a').removeClass('hidden');
                $('div.NAV').removeClass('hidden');
                $('div.TOOL').removeClass('hidden');
            });
            $$("a[data-cmd='delete']").on('click',function(){
                academic.delete(a);
            });
        },
        delete:function(a){
            var id = a[0][0];
            app.popup('.popup-delete');
            var content =   `<ul>
                                <li>
                                    <h5 class = 'center'>Are you sure?
                                    </h5>
                                </li>
                                <li>
                                    <a href='#' class='btn close-popup waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>
                                    <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>
                                </li>
                            </ul>`;
            $("#deletePopup").html(`<div class="card-content">${content}</div>`);
            $("a[data-cmd='proceed']").on('click',function(){
                var acad = system.ajax(processor+'do-deleteAcad',id);
                acad.done(function(data){
                    if(data != 0){
                        system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                            app.closeModal('.popup-delete');
                            academic.ini();
                            $('div.display').removeClass('hidden');
                            $('div.focus').addClass('hidden');
                            $('.card-header a').removeClass('hidden');
                            $('div.NAV').removeClass('hidden');
                            $('div.TOOL').removeClass('hidden');
                        });

                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
                });
            });
        },
        edit:function(a){
            $$("a[data-cmd='update']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                app.popup('.popup-update');
                if(data.prop == "Year"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style='border: gray; border-width: 1px; background-color: rgba(238, 238, 238, 0.15); border-style: solid; border-radius: 15px;'>
                                                        <select id="field_yearLevel" name="field_yearLevel">
                                                            <option value="Elementary">ELEMENTARY</option>
                                                            <option value="High School">HIGH SCHOOL</option>
                                                            <option value="Tech Voc">TECH VOC</option>
                                                            <option value="College">COLLEGE</option>
                                                            <option value="Masteral">MASTERAL</option>
                                                            <option value="Doctorate">DOCTORATE</option>
                                                        </select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateAcad").html(content);
                    $('select').material_select();
                    $("#form_edit").validate({
                        rules: {
                            field_yearLevel: {required: true,maxlength:20},
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
                            var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = academic.get(id);
                                        academic.edit(newdata);
                                        academic.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "School"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_school" name="field_school" class="form-control">
                                                        <label class="" for="field_school" style="color: black; top: -2px !important; left: 0px !important;">Name of Schools</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateAcad").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_school: {required: true,maxlength:100}
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
                            var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = academic.get(id);
                                        academic.edit(newdata);
                                        academic.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Degree"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                     <div class="input-field">
                                                        <input type='text' id="field_degree" name="field_degree" class="form-control">
                                                        <label class="" for="field_degree" style="color: black; top: -2px !important; left: 0px !important;">Basic Education/Degree/Course</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateAcad").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_degree: {required: true, maxlength:100},
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
                            var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = academic.get(id);
                                        academic.edit(newdata);
                                        academic.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Units"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='number' id="field_units" name="field_units" class="form-control">
                                                        <label class="" for="field_units" style="color: black; top: -2px !important; left: 0px !important;">Units Earned</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateAcad").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_units: {required: true,maxlength:3},
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
                            var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = academic.get(id);
                                        academic.edit(newdata);
                                        academic.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Dates"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div>
                                                        <div class="input-field">
                                                            <label class="active" style="top: auto; left: 0px; font-size: 17px; color: black;">Period of Attendance (From - To)</label>
                                                            <div>
                                                                <input type='month' id="field_dateF"  name="field_dateF" class="form-control" style="width: 100%;">
                                                            </div>
                                                            <div>
                                                                <input type='month' id="field_dateT" name="field_dateT" class="form-control" style="width: 100%;">
                                                            </div>
                                                        </div>                                            
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateAcad").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_dateF: {required: true, maxlength:20},
                            field_dateT: {required: true, maxlength:20, greaterThan: "#field_dateF"},
                            // field_dateTo: { greaterThan: "#field_dateFrom" },
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
                            var data = system.ajax(processor+'do-updateAcad',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = academic.get(id);
                                        academic.edit(newdata);
                                        academic.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
            });
        }
    }

    let skills = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = skills.getAll(applicantData[0][0]);
            $$("a[data-cmd='add-skills']").on('click',function(){
                skills.add(applicantData[0][0]);
            });
            skills.show(list);
            // skills.delete(list);

            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageInit('index',function(page){
                account.controller();
            });
        },
        getAll:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-skillsAll',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-skill',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        add:function(id){
            app.popup('.popup-skill');
            $('select').material_select('close');

            $("#form_skills").validate({
                rules: {
                    field_skill: {required: true,maxlength:100},
                    field_level: {required: true,maxlength:50}
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
                    var data = system.ajax(processor+'do-skill',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","Skill Added.",false,2000,true,false,function(){
                                app.closeModal('.popup-skill');
                                skills.ini();
                            });
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,false,false);
                        }
                    })
                }
            }); 
        },
        show:function(list){
            var content = "";
            $.each(list,function(i,v){
                content += "<li class='collection-item row'>"+
                            "   <div class='chip' style = 'width: 10%;'>"+
                            "   <div class='chip-media bg-blue' style = 'width: 50px !important; height: 50px !important; font-size: 24px;'>"+v[2][0]+"</div>"+
                            "   </div>"+
                            "   <div class = 'col 33'>"+
                            "   <div class='title color-teal' ><strong class ='color-black'>"+v[2]+"</strong></div>"+
                            "   <div class ='color-teal' ><small class ='color-black'>"+v[3]+"</small></div>"+
                            "   </div>"+
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";

                    $("a.skills").removeClass('disabled');
            });
            $$("#display_skills").html("<ul class='collection'>"+content+"</ul");
            $("a[data-cmd='view']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                var s = skills.get(id);
                skills.display(s);
                skills.edit(s);
                $('div.display').addClass('hidden');
                $('div.focus').removeClass('hidden');
                $('.card-header a').addClass('hidden');
                $('div.NAV ').addClass('hidden');
                $('div.TOOL').addClass('hidden');
            });
            $("a.skills").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                app.onPageInit('builderLanguage',function(page){
                    language.ini();
                });
            });
        },
        display:function(s){
            $$("#display_skill strong").html(s[0][2]);
            $$("#display_skill a").attr({"data-node":s[0][0]});
            $$("#display_level strong").html(s[0][3]);
            $$("#display_level a").attr({"data-node":s[0][0]});   

            $$("a[data-cmd='back']").on('click',function(){
                skills.ini();
                $('div.display').removeClass('hidden');
                $('div.focus').addClass('hidden');
                $('.card-header a').removeClass('hidden');
                $('div.NAV').removeClass('hidden');
                $('div.TOOL').removeClass('hidden');
            });
            $$("a[data-cmd='delete']").on('click',function(){
                skills.delete(s);
            });
        },
        edit:function(s) {
            $$("a[data-cmd='update']").on('click',function(){
                var data = $(this).data();
                var id = s[0][0];
                app.popup('.popup-update');
                var content =   `<form action="" method="POST" id='form_edit'>
                                    <div class="list-block">
                                        <ul>
                                            <li>
                                                <div class="input-field">
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                    <label class="a" for='field_${data.prop}'>Skills</label>
                                                    <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                </div>
                                                </div>
                                            </li>                                        
                                            <li>
                                                <div class="input-field" >
                                                    <select id="field_level" name="field_level">
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Intermediate">Intermediate</option>
                                                        <option value="Advance">Advance</option>
                                                        <option value="Expert">Expert</option>
                                                    </select>
                                                </div>
                                            </li>
                                            <li>
                                                <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                            </li>
                                        </ul>
                                    </div>
                                </form>`;
                $("#updateSkill").html(content);
                $('select').material_select(); 
                $("#form_edit").validate({
                    rules: {
                        field_Skills: {required: true,maxlength:100}
                        
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
                        field_Skills: {
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-updateSkill',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = skills.get(id);
                                    skills.edit(newdata);
                                    skills.display(newdata);
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            });
        },
        delete:function (s) {
            var id = s[0][0];
            app.popup('.popup-delete');
            var content =   `<ul>
                                <li>
                                    <h5 class = 'center'>Are you sure?
                                    </h5>
                                </li>
                                <li>
                                    <a href='#' class='btn close-popup waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>
                                    <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>
                                </li>
                            </ul>`;
            $("#deleteSkill").html(`<div class="card-content">${content}</div>`);
            $("a[data-cmd='proceed']").on('click',function(){
                var acad = system.ajax(processor+'do-deleteSkill',id);
                acad.done(function(data){
                    if(data != 0){
                        system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                            app.closeModal('.popup-delete');
                            skills.ini();
                            $('div.display').removeClass('hidden');
                            $('div.focus').addClass('hidden');
                            $('.card-header a').removeClass('hidden');
                            $('div.NAV').removeClass('hidden');
                            $('div.TOOL').removeClass('hidden');

                        });

                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
                });
            });
        }
    }

    let language = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = language.getAll(applicantData[0][0]);
            $$("a[data-cmd='add-language']").on('click',function(){
                language.add(applicantData[0][0]);
            });
            language.show(list);

            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                account.controller(data);
            });

            app.onPageInit('index',function(page){
                account.controller();
            });
        },
        getAll:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-languageALL',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-language',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        add:function(id){
            app.popup('.popup-language');
            $('select').material_select();
            $("#form_language").validate({
                rules: {
                    field_language: {required: true,maxlength:100},
                    field_level: {required: true,maxlength:50}
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
                    var data = system.ajax(processor+'do-language',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","Language Added.",false,2000,true,false,function(){
                                app.popup('.popup-language');
                                language.ini();
                            });
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,false,false);
                        }
                    })
                }
            }); 
        },
        show:function(list){
            var content = "";
            $.each(list,function(i,v){
                content += "<li class='collection-item row'>"+
                            "   <div class='chip' style = 'width: 10%;'>"+
                            "   <div class='chip-media bg-blue' style = 'width: 50px !important; height: 50px !important; font-size: 24px;'>"+v[2][0]+"</div>"+
                            "   </div>"+
                            "   <div class = 'col 33'>"+
                            "   <div class='title color-teal' ><strong class ='color-black'>"+v[2]+"</strong></div>"+
                            "   <div class ='color-teal' ><small class ='color-black'>"+v[3]+"</small></div>"+
                            "   </div>"+
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";

                    $("a.language").removeClass('disabled');
            });
            $$("#display_language").html("<ul class='collection'>"+content+"</ul");
            $("a[data-cmd='view']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                var l = language.get(id);
                language.display(l);
                language.edit(l);
                $('div.display').addClass('hidden');
                $('div.focus').removeClass('hidden');
                $('.card-header a').addClass('hidden');
                $('div.NAV ').addClass('hidden');
                $('div.TOOL').addClass('hidden');
            });
            $("a.language").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('builderReferences',function(page){
                references.ini();
            });
        },
        display:function(l) {
            $$("#display_language strong").html(l[0][2]);
            $$("#display_language a").attr({"data-node":l[0][0]});
            $$("#display_level strong").html(l[0][3]);
            $$("#display_level a").attr({"data-node":l[0][0]});   

            $$("a[data-cmd='back']").on('click',function(){
                language.ini();
                $('div.display').removeClass('hidden');
                $('div.focus').addClass('hidden');
                $('.card-header a').removeClass('hidden');
                $('div.NAV').removeClass('hidden');
                $('div.TOOL').removeClass('hidden');
            });
            $$("a[data-cmd='delete']").on('click',function(){
                language.delete(l);
            });
        },
        edit:function(l){
            $$("a[data-cmd='update']").on('click',function(){
                var data = $(this).data();
                var id = l[0][0];
                app.popup('.popup-update');
                var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field" style="margin-top: 50px; !important">
                                                        <label class="a" for='field_${data.prop}'>Language</label>
                                                        <input type='text' id='field_${data.prop}' value = '${data.value}' name='field_${data.prop}' class=" form-control color-white">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="input-field">
                                                        <label class="active" style ="top: auto;" for='field_level'>Level</label>
                                                        <select id="field_level" name="field_level">
                                                            <option value="Beginner">Beginner</option>
                                                            <option value="Conversational">Conversational</option>
                                                            <option value="Fluent">Fluent</option>
                                                            <option value="Native">Native</option>
                                                        </select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                $("#updateLanguage").html(content);
                $('select').material_select(); 
                $("#form_edit").validate({
                    rules: {
                        field_Language: {required: true,maxlength:100}
                        
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
                        field_Skills: {
                            required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                            maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        },
                    },
                    submitHandler: function (form) {
                        var _form = $(form).serializeArray();
                        var data = system.ajax(processor+'do-updateLanguage',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popup-update');
                                    var newdata = language.get(id);
                                    language.edit(newdata);
                                    language.display(newdata);
                                });

                            }
                            else{
                                system.notification("Update","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                });
            });
        },
        delete:function(l){
            var id = l[0][0];
            app.popup('.popup-delete');
            var content =   `<ul>
                                <li>
                                    <h5 class = 'center'>Are you sure?
                                    </h5>
                                </li>
                                <li>
                                    <a href='#' class='btn close-popup waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>
                                    <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>
                                </li>
                            </ul>`;
            $("#deleteLanguage").html(`<div class="card-content">${content}</div>`);
            $("a[data-cmd='proceed']").on('click',function(){
                var acad = system.ajax(processor+'do-deleteLanguage',id);
                acad.done(function(data){
                    if(data != 0){
                        system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                            app.closeModal('.popup-delete');
                            language.ini();
                            $('div.display').removeClass('hidden');
                            $('div.focus').addClass('hidden');
                            $('.card-header a').removeClass('hidden');
                            $('div.NAV').removeClass('hidden');
                            $('div.TOOL').removeClass('hidden');

                        });

                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
                });
            });
        }
    }

    let references = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = references.getAll(applicantData[0][0]);
            $$("a[data-cmd='add-reference']").on('click',function(){
                references.add(applicantData[0][0]);
            });
            references.show(list);

            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                account.controller(data);
            });

            app.onPageInit('index',function(page){
                account.controller();
            });
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-reference',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        getAll:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-referencesAll',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        add:function(id){
            app.popup('.popup-reference');
            $("#form_references").validate({
                rules: {
                    field_name: {required: true,maxlength:100},
                    field_relationship: {required: true,maxlength:100},
                    field_profession: {required: true,maxlength:100},
                    field_email: {required: true,maxlength:100},
                    field_phone: {required: true,maxlength:100},
                    field_address1: {required: true,maxlength:100},
                    // field_address2: {maxlength:100}
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
                    var data = system.ajax(processor+'do-references',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","References Added.",false,2000,true,false,function(){
                                app.closeModal('.popup-reference');
                                references.ini();
                            });
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,false,false);
                        }
                    })
                }
            }); 
        },
        show:function(list){
            var content = "";
            $.each(list,function(i,v){
                content += "<li class='collection-item row'>"+
                            "   <div class='chip' style = 'width: 10%;'>"+
                            "   <div class='chip-media bg-blue' style = 'width: 50px !important; height: 50px !important; font-size: 24px;'>"+v[2][0]+"</div>"+
                            "   </div>"+
                            "   <div class = 'col 33'>"+
                            "   <div class='title color-teal' ><strong class ='color-black'>"+v[2]+"</strong></div>"+
                            "   <div class ='color-teal' ><small class ='color-black'>"+v[7]+"</small></div>"+
                            "   </div>"+
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";

                    $("a.references").removeClass('disabled');
            });
            $$("#display_references").html("<ul class='collection'>"+content+"</ul");
            $("a[data-cmd='view']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                var r = references.get(id);
                references.display(r);
                references.edit(r);
                $('div.display').addClass('hidden');
                $('div.focus').removeClass('hidden');
                $('.card-header a').addClass('hidden');
                $('div.NAV ').addClass('hidden');
                $('div.TOOL').addClass('hidden');
            });
            $("a.references").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('builderSeminar',function(page){
                seminar.ini();
            });
        },
        display:function(r) {
            $$("#display_name strong").html(r[0][2]);
            $$("#display_name a").attr({"data-node":r[0][0]});
            $$("#display_relationship strong").html(r[0][3]);
            $$("#display_relationship a").attr({"data-node":r[0][0]});
            $$("#display_profession strong").html(r[0][4]);
            $$("#display_profession a").attr({"data-node":r[0][0]});
            $$("#display_email strong").html(r[0][5]);
            $$("#display_email a").attr({"data-node":r[0][0]});
            $$("#display_phone strong").html(r[0][6]);
            $$("#display_phone a").attr({"data-node":r[0][0]});
            $$("#display_address strong").html(r[0][7]);
            $$("#display_address a").attr({"data-node":r[0][0]}); 

            $$("a[data-cmd='back']").on('click',function(){
                references.ini();
                $('div.display').removeClass('hidden');
                $('div.focus').addClass('hidden');
                $('.card-header a').removeClass('hidden');
                $('div.NAV').removeClass('hidden');
                $('div.TOOL').removeClass('hidden');
            });
            $$("a[data-cmd='delete']").on('click',function(){
                references.delete(r);
            });
        },
        delete:function(r){
            var id = r[0][0];
            app.popup('.popup-delete');
            var content =   `<ul>
                                <li>
                                    <h5 class = 'center'>Are you sure?
                                    </h5>
                                </li>
                                <li>
                                    <a href='#' class='btn close-popup waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>
                                    <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>
                                </li>
                            </ul>`;
            $("#deleteReference").html(`<div class="card-content">${content}</div>`);
            $("a[data-cmd='proceed']").on('click',function(){
                var acad = system.ajax(processor+'do-deleteReference',id);
                acad.done(function(data){
                    if(data != 0){
                        system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                            app.closeModal('.popup-delete');
                            references.ini();
                            $('div.display').removeClass('hidden');
                            $('div.focus').addClass('hidden');
                            $('.card-header a').removeClass('hidden');
                            $('div.NAV').removeClass('hidden');
                            $('div.TOOL').removeClass('hidden');
                        });

                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
                });
            });
        },
        edit:function(r){
            $$("a[data-cmd='update']").on('click',function(){
                var data = $(this).data();
                var id = r[0][0];
                app.popup('.popup-update');
                if(data.prop == "Name"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_name" name="field_name" class="form-control">
                                                        <label class="" for="field_name" style="color: black !important; top: -2px !important; left: 0px !important;">Name</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateReference").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_name: {required: true,maxlength:20},
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
                            var data = system.ajax(processor+'do-updateReference',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = references.get(id);
                                        references.edit(newdata);
                                        references.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Relationship"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_relationship" name="field_relationship" class="form-control">
                                                        <label class="" for="field_relationship" style="color: black !important; top: -2px !important; left: 0px !important;">Relationship</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateReference").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_relationship: {required: true,maxlength:20},
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
                            var data = system.ajax(processor+'do-updateReference',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = references.get(id);
                                        references.edit(newdata);
                                        references.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Profession"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_profession" name="field_profession" class="form-control">
                                                        <label class="" for="field_profession" style="color: black !important; top: -2px !important; left: 0px !important;">Profession</label>
                                                    </div
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateReference").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_profession: {required: true,maxlength:20},
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
                            var data = system.ajax(processor+'do-updateReference',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = references.get(id);
                                        references.edit(newdata);
                                        references.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Email"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_email" name="field_email" class="form-control">
                                                        <label class="" for="field_email" style="color: black !important; top: -2px !important; left: 0px !important;">Email</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateReference").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_email: {required: true,maxlength:20},
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
                            var data = system.ajax(processor+'do-updateReference',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = references.get(id);
                                        references.edit(newdata);
                                        references.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Phone"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_phone" name="field_phone" class="form-control">
                                                        <label class="" for="field_phone" style="color: black !important; top: -2px !important; left: 0px !important;">Phone</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateReference").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_name: {required: true,maxlength:20},
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
                            var data = system.ajax(processor+'do-updateReference',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = references.get(id);
                                        references.edit(newdata);
                                        references.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Address"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_address" name="field_address" class="form-control">
                                                        <label class="" for="field_address" style="color: black !important; top: -2px !important; left: 0px !important;">Address</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateReference").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_address: {required: true,maxlength:20},
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
                            var data = system.ajax(processor+'do-updateReference',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = references.get(id);
                                        references.edit(newdata);
                                        references.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
            });
        }
    }

    let seminar = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = seminar.getAll(applicantData[0][0]);
            $$("a[data-cmd='add-seminar']").on('click',function(){
                seminar.add(applicantData[0][0]);
            });
            seminar.show(list);

            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                account.controller(data);
            });

            app.onPageInit('index',function(page){
                account.controller();
            });
        },
        getAll:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-seminarAll',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-seminar',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        add:function(id){
            app.popup('.popup-seminar');
            $("#form_seminars").validate({
                rules: {
                    field_event: {required: true,maxlength:100},
                    field_location: {required: true,maxlength:100},
                    field_date: {required: true,maxlength:100}
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
                    var data = system.ajax(processor+'do-seminar',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","seminar Added.",false,2000,true,false,function(){
                                app.closeModal('.popup-seminar');
                                seminar.ini();
                            });
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,false,false);
                        }
                    })
                }
            }); 
        },
        show:function(list){    
            var content = "";
            $.each(list,function(i,v){
                content += "<li class='collection-item row'>"+
                            "   <div class='chip' style = 'width: 10%;'>"+
                            "   <div class='chip-media bg-blue' style = 'width: 50px !important; height: 50px !important; font-size: 24px;'>"+v[2][0]+"</div>"+
                            "   </div>"+
                            "   <div class = 'col 33'>"+
                            "   <div class='title color-teal' ><strong class ='color-black'>"+v[2]+"</strong></div>"+
                            "   <div class ='color-teal' ><small class ='color-black'>"+v[3]+"</small></div>"+
                            "   </div>"+
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='view' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";

                    $("a.seminar").removeClass('disabled');
            });
            $$("#display_seminars").html("<ul class='collection'>"+content+"</ul");
            $("a[data-cmd='view']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                var s = seminar.get(id);
                seminar.display(s);
                seminar.edit(s);
                $('div.display').addClass('hidden');
                $('div.focus').removeClass('hidden');
                $('.card-header a').addClass('hidden');
                $('div.NAV ').addClass('hidden');
                $('div.TOOL').addClass('hidden');
            });
            $("a.seminar").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('resumePreview',function(page){
                resume.page();
            });
        },
        display:function(s) {console.log(s);
            $$("#display_event strong").html(s[0][2]);
            $$("#display_event a").attr({"data-node":s[0][0]});
            $$("#display_location strong").html(s[0][3]);
            $$("#display_location a").attr({"data-node":s[0][0]});
            $$("#display_date strong").html(s[0][4]);
            $$("#display_date a").attr({"data-node":s[0][0]});

            $$("a[data-cmd='back']").on('click',function(){
                seminar.ini();
                $('div.display').removeClass('hidden');
                $('div.focus').addClass('hidden');
                $('.card-header a').removeClass('hidden');
                $('div.NAV').removeClass('hidden');
                $('div.TOOL').removeClass('hidden');
            });
            $$("a[data-cmd='delete']").on('click',function(){
                seminar.delete(s);
            });
        },
        delete:function(s){
            var id = s[0][0];
            app.popup('.popup-delete');
            var content =   `<ul>
                                <li>
                                    <h5 class = 'center'>Are you sure?
                                    </h5>
                                </li>
                                <li>
                                    <a href='#' class='btn close-popup waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>
                                    <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>
                                </li>
                            </ul>`;
            $("#deleteSeminar").html(`<div class="card-content">${content}</div>`);
            $("a[data-cmd='proceed']").on('click',function(){
                var acad = system.ajax(processor+'do-deleteSeminar',id);
                acad.done(function(data){
                    if(data != 0){
                        system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                            app.closeModal('.popup-delete');
                            seminar.ini();
                            $('div.display').removeClass('hidden');
                            $('div.focus').addClass('hidden');
                            $('.card-header a').removeClass('hidden');
                            $('div.NAV').removeClass('hidden');
                            $('div.TOOL').removeClass('hidden');
                        });

                    }
                    else{
                        system.notification("Kareer","Failed.",false,3000,true,false,false);
                    }
                });
            });
        },
        edit:function(s){
            $$("a[data-cmd='update']").on('click',function(){
                var data = $(this).data();
                var id = s[0][0];
                app.popup('.popup-update');
                if(data.prop == "Event"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_event" name="field_event" class="form-control">
                                                        <label class="" for="field_event" style="color: black !important; top: -2px !important; left: 0px !important;">Event</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateSeminar").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_event: {required: true,maxlength:20},
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
                            var data = system.ajax(processor+'do-updateSeminar',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = seminar.get(id);
                                        seminar.edit(newdata);
                                        seminar.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Location"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='text' id="field_location" name="field_location" class="form-control">
                                                        <label class="" for="field_location" style="color: black !important; top: -2px !important; left: 0px !important;">Location</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateSeminar").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_location: {required: true,maxlength:20},
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
                            var data = system.ajax(processor+'do-updateSeminar',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = seminar.get(id);
                                        seminar.edit(newdata);
                                        seminar.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
                else if(data.prop == "Date"){
                    var content =   `<form action="" method="POST" id='form_edit'>
                                        <div class="list-block">
                                            <ul>
                                                <li>
                                                    <div class="input-field">
                                                        <input type='date' id="field_date" name="field_date" class="form-control">
                                                        <label class="active" for="field_date" style="color: black !important; top: -2px !important; left: 0px !important;">Date</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button class="btn teal waves-effect waves-teal waves-light" style="width: 100%; top: 20px;">Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>`;
                    $("#updateSeminar").html(content);
                    $("#form_edit").validate({
                        rules: {
                            field_date: {required: true,maxlength:20},
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
                            var data = system.ajax(processor+'do-updateSeminar',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-update');
                                        var newdata = seminar.get(id);
                                        seminar.edit(newdata);
                                        seminar.display(newdata);
                                    });

                                }
                                else{
                                    system.notification("Update","Failed.",false,3000,true,false,false);
                                }
                            })
                        }
                    });
                }
            });
        }
    }

    let resume ={
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var data = resume.get(applicantData[0][0]);
            let content =   `<div><img src="./img/RES.png" style="width: 200px; position: relative; margin-top: 40px;" ></div>
                            <p style="font-size: 17px">Make my Resume</p>
                            <div class="center">
                                <a data-load ='builderAccount' class="resume btn btn-large white-text waves-effect waves-teal waves-light" style="border-radius: 30px; width: 90%; height: 55px; font-size: 20px; margin-top: 25px; background-color: #5cb0a8;">Create Resume</a>
                                <a data-load ='SavedResume' class="resume btn btn-large white-text waves-effect waves-purple waves-light" style="border-radius: 30px;width: 90%;height: 55px; font-size: 20px; margin-top: 15px; background-color: #7a5578;">Saved Resume</a>
                            </div>`;
            $$("#resume_builder").html(content);

            $("a.resume").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageInit('builderAccount',function(page){
                console.log('page'); 
                $("a.acc").removeClass('color-grey').addClass('color-white');
                var applicantData = JSON.parse(localStorage.getItem('applicant'));
                var data = resume.get(applicantData[0][0]);
                account.edit(data);
                account.display(data);
                account.show(data);

            });
            app.onPageInit('SavedResume',function(page){
                console.log('page');
                resume.savedResume();
            });


            app.onPageInit('index',function(page){
                account.controller();
            });
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-applicant',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        savedResume:function(){
            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                // console.log("dfdfdd");
            });

            app.onPageInit('resume',function(page){
                account.controller();
                resume.ini();
            });
        },
        page:function(){
            $("a.preview").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageInit('builderSeminar',function(page){
                seminar.ini();
            });
            app.onPageInit('Preview',function(page){
                resume.preview();
            });
        },
        preview:function(){
            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('resumePreview',function(page){
                resume.page();
            });

            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var personalInfo = account.get(applicantData[0][0]);
            // console.log(personalInfo);
            var Ldata = language.getAll(personalInfo[0]);
            // console.log(Ldata);
            var L ="";
            $.each(Ldata,function(i,v){
                L +=""+v[2]+", ";
            });
            $$("#display_fullname strong").html(personalInfo[8]+","+personalInfo[7]+" "+personalInfo[9]);
            $$("#display_address small").html(personalInfo[14]);
            $$("#display_phone small").html("09123456789");
            $$("#display_email small").html(personalInfo[3]);
            $$("#Preview img.responsive-img").attr({"src":"img/profile/"+personalInfo[24]});
            var personalcontent = "<div class='col s12'>"+
                                  "   <div >Date of Birth: <span class ='color-black'>"+personalInfo[12]+"</span></div>"+
                                  "   <div >Age: <span class ='color-black'>"+personalInfo[11]+"</span></div>"+
                                  "   <div >Mother: <span class ='color-black'>"+personalInfo[18]+"</span></div>"+
                                  "   <div >Father: <span class ='color-black'>"+personalInfo[19]+"</span></div>"+
                                  "   <div >Religion: <span class ='color-black'>"+personalInfo[21]+"</span></div>"+
                                  "   <div >Citizenship: <span class ='color-black'>"+personalInfo[15]+"</span></div>"+
                                  "   <div >Place of Birth: <span class ='color-black'>"+personalInfo[13]+"</span></div>"+
                                  "   <div >Gender: <span class ='color-black'>"+personalInfo[10]+"</span></div>"+
                                  "   <div >Mother's Occupation: <span class ='color-black'>"+personalInfo[22]+"</span></div>"+
                                  "   <div >Father's Occupation: <span class ='color-black'>"+personalInfo[23]+"</span></div>"+
                                  "   <div >Language: <span class ='color-black'>"+L+"</span></div>"+
                                  "   <div >Height: <span class ='color-black'>"+personalInfo[16]+"</span></div>"+
                                  "   <div >Weight: <span class ='color-black'>"+personalInfo[17]+"</span></div>"+
                                  "</div>";
            $$("#display_personalInfo").html(personalcontent);

            var acad = academic.getAll(applicantData[0][0]);
            var acadcontent = "";
            $.each(acad,function(i,v){
                acadcontent +=  "<span class='title'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                            "   <div >Name of School: <span class ='color-black'>"+v[3]+"</span></div>"+
                            "   <div >Period of Attendance: <span class ='color-black'>"+v[5]+"</span></div>"+
                            "   <div >Year Graduated: <span class ='color-black'>"+v[7]+"</span></div>";
            });
            $$("#display_academic").html(acadcontent);

            var car = career.getAll(applicantData[0][0]);
            var carcontent = "";
            $.each(car,function(i,v){
                carcontent +=   "   <span class='title'><strong class ='color-black'>"+v[4]+"</strong></span>"+
                                "   <div><span class ='color-black'>"+v[2]+" - "+v[3]+"</span></div>"+
                                "   <div><span class ='color-black'>"+v[5]+"</span></div>";
            });
            $$("#display_career").html(carcontent);

            var skill = skills.getAll(applicantData[0][0]);
            var skillcontent = "";
            $.each(skill,function(i,v){
                skillcontent += "   <span class='title'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                                "   <div><span class ='color-black'>"+v[3]+"</span></div>";
            });
            $$("#display_skills").html(skillcontent);

            var sem = seminar.getAll(applicantData[0][0]);
            var semcontent = "";
            $.each(sem,function(i,v){
                semcontent +=  "<span class='title'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                            "   <div><span class ='color-black'>"+v[3]+"</span></div>"+
                            "   <div><span class ='color-black'>"+v[4]+"</span></div>";
            });
            $$("#display_seminar").html(semcontent);

            var reference = references.getAll(applicantData[0][0]);
            var refcontent = "";
            $.each(reference,function(i,v){
                refcontent += "   <span class='title'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                              "   <div><span class ='color-black'>"+v[4]+"</span></div>"+
                              "   <div><span class ='color-black'>"+v[5]+"</span></div>"+
                              "   <div><span class ='color-black'>"+v[7]+"</span></div>";
            });
            $$("#display_references").html(refcontent);
            var doc = new jsPDF();
            $("a.Publish").on('click',function(){
                doc.fromHTML($('#Preview').html(), 15, 15, {
                    'width':170,
                    'elementHandlers': specialElementHandlers
                });
                doc.save('resume.pdf');
            });

             // doc.fromHTML($('#Preview')).html(),
             //        'width':170,
             //            'elementHandlers': specialElementHandlers
             //    });
             //    doc.save('sample-file.pdf');

            //PDF generation function
            // (function () {  
            //     var  
            //      form = $('.list-block'),  
            //      cache_width = form.width(),  
            //      legal = [595.28, 975]; // for legal size paper width and height  
          
            //     $('#create_pdf').on('click', function () {  
            //         $('body').scrollTop(0);  
            //         var data = $(this).data('load');
            //         view.router.loadPage("pages/admin/"+data+".html");
            //         createPDF();
            //         upload();

            //     });  
            //     //create pdf  
            //     function createPDF() {  
            //         getCanvas().then(function (canvas) {  
            //             var  
            //              img = canvas.toDataURL("image/png"),  
            //              doc = new jsPDF({  
            //                  unit: 'px',  
            //                  format: 'legal'  
            //              });  
            //             doc.addImage(img, 'JPEG', 3, 3);  
            //             doc.save('resume.pdf');
            //             form.width(cache_width);
            //         });  
            //     }  
          
            //     // create canvas object  
            //     function getCanvas() {  
            //         form.width((legal[0] * 1.33333) - 80).css('max-width', 'none');  
            //         return html2canvas(form, {  
            //             imageTimeout: 1000,  
            //             removeContainer: true  
            //         });  
            //     }  
            //     function upload(){
            //         var doc = new jsPDF();
            //         var pdf = doc.output(); 
            //         var ajax = system.ajax(processor+'do-resume',[applicantData[0][0],pdf]);
            //         ajax.done(function(data){
            //             console.log(data);
            //             if(data != 0){
            //                 system.notification("Kareer","Resume Published.",false,2000,true,false,function(){
            //                      app.onPageInit('index',function(page){
            //                         content.ini();
            //                     });
            //                 });
            //                 // console.log(data);
            //             }
            //             else{
            //                system.notification("Kareer","Failed.",false,3000,true,false,false);
            //                 // console.log(data);
            //             }
            //         });
            //     }    


            // }());  
        }
    }

    var logIn = {
        ini:function(){
            $("button.LOGINfb").on('click',function(){
                    FB.getLoginStatus(function(response) {
                        if (response.status === 'connected') {
                            console.log(response.status);
                            Login();
                        } else if (response.status === 'not_authorized') {
                            console.log(response.status);
                        } else {
                            console.log(response.status);
                        }
                    });
                    function Login() {  
                        FB.api('/me', {fields: 'id,first_name,last_name,email,gender'}, function (response){
                            var data = $.map(response, function(value, index) {
                                return [value];
                            });
                            var LogData = JSON.stringify(data);
                            console.log(LogData);
                            var fbData = JSON.parse(LogData);
                            var data = system.ajax(processor+'do-logInFB',fbData);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    $$("input").val("");
                                    system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popup-login', true);
                                        localStorage.setItem('applicant',data);
                                        content.ini();
                                    });
                                }
                                else{
                                    system.notification("Kareer","Failed.",false,3000,true,false,false);
                                }
                            })
                        });
                    }

            });
            $("#form_logIn").validate({
                rules: {
                    field_email: {required: true,email:true,maxlength:100},
                    field_password: {required: true},
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
                        required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        email: "<i data-error ='Email is invalid' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        validateEmail: "<i data-error ='Email already in use.' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_password: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        checkPassword: "<i data-error ='Password is weak' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                },
                submitHandler: function (form) {
                    var _form = $(form).serializeArray();
                    var data = system.ajax(processor+'do-logIn',_form);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                                app.closeModal('.popup-login', true);
                                localStorage.setItem('applicant',data);
                                content.ini();
                            });
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,false,false);
                        }
                    })
                }
            });
            $$("a[data-cmd='showPassword']").on('click',function(){
                $("#password input").attr({"type":"text"});
                $("a.x").addClass('hidden');
                $("a.y").removeClass('hidden');

            }); 
            $$("a[data-cmd='hidePassword']").on('click',function(){
                $("#password input").attr({"type":"password"});
                $("a.y").addClass('hidden');
                $("a.x").removeClass('hidden');

            });
            $$(".log-error-icon").on('click',function(){
                var data= $(this).find('i');
                system.notification("Kareer",data[0].dataset.error,false,3000,true,false,false);
            });     
        }
    }

    var signUp = {
        ini:function(){
            $("button.g-signin2").on('Success',function(){
                function onSignIn(googleUser) {
                  var profile = googleUser.getBasicProfile();
                  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                  console.log('Full Name: ' + profile.getName());
                  console.log('Given Name: ' + profile.getGivenName());
                  console.log('Family Name: ' + profile.getFamilyName());
                  console.log('Image URL: ' + profile.getImageUrl());
                  console.log('Email: ' + profile.getEmail());
                  var id_token = googleUser.getAuthResponse().id_token;
                    console.log(id_token)
                }
            });
            // Register using FB ACCOUNT
            $("button.fb").on('click',function(){
                FB.login(function(response) {
                    if (response.status === 'connected') {
                        console.log(response.status);
                        saveUserData();
                    } else if (response.status === 'not_authorized') {
                        console.log(response.status);
                    } else {
                        console.log(response.status);
                    }
                }, {scope: 'public_profile,email'});

                function saveUserData() {    
                    FB.api('/me', {fields: 'id,first_name,last_name,email,gender'}, function (response){
                        // console.log(response);
                        var data = $.map(response, function(value, index) {
                            return [value];
                        });
                        var FbData = JSON.stringify(data);
                        console.log(FbData);
                        localStorage.setItem('fb',FbData);
                        var data = system.ajax(processor+'do-signUpFB',data);
                        data.done(function(data){
                            console.log(data);
                            if(data == 1){
                                system.notification("Kareer","Success. You can now Sign In to your account. ",false,2000,true,false,function(){
                                    app.closeModal('.popup-sign-up', true);
                                    app.popup('popup-login');
                                });
                            }
                            else if(data == 2){
                                system.notification("Kareer","Try other email address.",false,3000,true,function(){},false);
                            }
                            else{
                                system.notification("Kareer","Failed.",false,3000,true,function(){},false);
                            }
                        })
                    });
                }
            });
            $("#form_signUp").validate({
                rules: {
                    field_firstname: {required: true, maxlength:50},
                    field_lastname: {required: true, maxlength:50},
                    field_email: {required: true, maxlength: 100,email:true,validateEmail:true},
                    field_password: {required: true, maxlength: 50,checkPassword:true},
                },
                errorElement : 'div',
                errorPlacement: function(error, element) { 
                    var placement = $(element).data('error');
                    if(placement){
                        $(placement).append(error);
                    } 
                    else{
                        error.insertAfter(element);
                    }
                },
                messages: {
                    field_firstname: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_lastname: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_email: {
                        required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        email: "<i data-error ='Email is invalid' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        validateEmail: "<i data-error ='Email already in use.' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_password: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        checkPassword: "<i data-error ='Password is weak' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                },
                submitHandler: function (form) {
                    var _form = $(form).serializeArray();
                    var data = system.ajax(processor+'do-signUp',_form);
                    data.done(function(data){
                        console.log(data);
                        if(data == 1){
                            var text = `<h1>Welcome to Kareer</h1>, you are now registered. You can login using your email <u>${_form[2]['value']}</u> and your password <u>${_form[3]['value']}</u>. <a href='http://localhost/kareer/mobile'>Just follow this link</a>`;
                            var data = system.send_mail(_form[2]['value']+',info@rnrdigitalconsultancy.com','New admin Registration',text);
                            if(data.responseText != ""){
                                $$("input").val("");
                                system.notification("Kareer","Success. Please check your email. ",false,2000,true,false,function(){
                                    app.closeModal('.popup-sign-up', true);
                                    app.popup('popup-login');
                                });
                            }
                        }
                        else if(data == 2){
                            system.notification("Kareer","Try other email address.",false,3000,true,function(){},false);
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,function(){},false);
                        }
                    })
                }
            });
            $$(".error-icon").on('click',function(){
                var data= $(this).find('i');
                system.notification("Kareer",data[0].dataset.error,false,3000,true,function(){},false);
            });         
        },
        personal:function(){
            $("#form_personal_info").validate({
                rules: {
                    field_given_name: {required: true, maxlength:50},
                    field_middle_name: {required: true, maxlength:50},
                    field_last_name: {required: true, maxlength:50},
                    field_gender: {required: true, maxlength:50},
                    field_date_of_birth: {required: true, maxlength:50},
                    field_place_of_birth: {required: true, maxlength:50},
                    field_permanent_address: {required: true, maxlength:50},
                    field_citizenship: {required: true, maxlength:50},
                    field_height: {required: true, maxlength:50},
                    field_weight: {required: true, maxlength:50},
                    field_mother_name: {required: true, maxlength:50},
                    field_father_name: {required: true, maxlength:50},
                },
                errorElement : 'div',
                errorPlacement: function(error, element) { 
                    var placement = $(element).data('error');
                    if(placement){
                        $(placement).append(error);
                    } 
                    else{
                        error.insertAfter(element);
                    }

                },  //[CED] error messages for filling up the fields
                messages: {
                    field_last_name: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_given_name: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_middle_name: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_gender: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_date_of_birth: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                     field_place_of_birth: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_permanent_address: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_citizenship: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_height: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_weight: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_mother_name: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_father_name: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                },
                submitHandler: function (form) {
                    var _form = $(form).serializeArray();
                    var data = system.ajax(processor+'do-personal-info',_form);
                    data.done(function(data){
                        if(data == 1){
                            system.notification("Kareer","Success.",false,2000,true,function(){},false);
                            $$("input").val("");
                            content.controller();
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,function(){},false);
                        }
                    })
                }
            }); 
            $$("a[data-cmd='showPassword']").on('click',function(){
                $("#password input").attr({"type":"text"});
                $("a.x").addClass('hidden');
                $("a.y").removeClass('hidden');

            }); 
            $$("a[data-cmd='hidePassword']").on('click',function(){
                $("#password input").attr({"type":"password"});
                $("a.y").addClass('hidden');
                $("a.x").removeClass('hidden');

            });
            $$(".log-error-icon").on('click',function(){
                var data= $(this).find('i');
                system.notification("Kareer",data[0].dataset.error,false,3000,true,false,false);
            });     
             //CED pop-up error in info(icon)
            $$(".error-icon").on('click',function(){
                var data= $(this).find('i');
                system.notification("Kareer",data[0].dataset.error,false,3000,true,function(){
                },false);
            });
        },
        academic:function(){
            $("#form_academic_info").validate({
                rules: {
                    field_school_attended: {required: true, maxlength:50},
                    field_degree: {required: true, maxlength:50},
                    field_period_attended: {required: true, maxlength:50},
                },
                errorElement : 'div',
                errorPlacement: function(error, element) { 
                    var placement = $(element).data('error');
                    if(placement){
                        $(placement).append(error);
                    } 
                    else{
                        error.insertAfter(element);
                    }

                },
                //[CED] error messages for filling up the fields
                messages: {
                    field_school_attended: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_degree: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_period_attended: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },             
                },

                submitHandler: function (form) {
                    var _form = $('#form_academic_info').serializeArray();
                    var data = system.ajax(processor+'do-academic-info',_form);
                    console.log(data.responseText);
                    data.done(function(data){
                        if(data == 1){
                            system.notification("Kareer","Success",false,3000,true,function(){},false);
                            $$("input").val("");
                            content.controller();
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,function(){},false);
                        }
                    })
                }
            }); 
            $$(".error-icon").on('click',function(){
                var data= $(this).find('i');
                system.notification("Kareer",data[0].dataset.error,false,3000,true,function(){
                },false);
            });
        },
        career:function(){
            $("#form_career_info").validate({
                rules: {
                    field_id: {required: true, maxlength:50},
                    field_applicant_id: {required: true, maxlength:50},
                    field_inclusive_dates: {required: true, maxlength:50},
                    field_position_title: {required: true, maxlength:50},
                    field_agency:  {required: true, maxlength:50},
                    field_monthly_salary:  {required: true, maxlength:50},
                    field_appointment_status:  {required: true, maxlength:50},
                    field_govt_service:  {required: true, maxlength:50},
                    field_date:  {required: true, maxlength:50},
                },
                errorElement : 'div',
                errorPlacement: function(error, element) { 
                    var placement = $(element).data('error');
                    if(placement){
                        $(placement).append(error);
                    } 
                    else{
                        error.insertAfter(element);
                    }

                },
                messages: {
                    field_id: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_applicant_id: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_inclusive_dates: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_position_title: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_agency: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_monthly_salary: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_appointment_status: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_govt_service: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_date: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },             
                },
                submitHandler: function (form) {
                    var _form = $(form).serializeArray();
                    var career = ajax(processor+'do-career-info',_form);
                    // console.log(career.responseText);
                    system.notification("Kareer","Success",false,3000,true,function(){
                    },false);
                }
            }); 
            $$(".error-icon").on('click',function(){
                var data= $(this).find('i');
                system.notification("Kareer",data[0].dataset.error,false,3000,true,function(){
                },false);
            });
        }
    }

    var jobs = {
        show:function(list){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
            var content = "";
            var height = $(window).height();
            $.each(list,function(i,v){
                // console.log(v);
                var skills = "", bookmarkButtonSettings = "";
                bookmarkButtonSettings = ($.inArray(v[0],bookmarks)>=0)?"disabled":"";
                v[5] = JSON.parse(v[5]);
                $.each(v[5],function(i2,v2){
                    if(v2 != "null")
                    skills += "<div class='chip'><div class='chip-media bg-teal'></div><div class='chip-label'>"+v2+"</div></div>";
                });

                content = "<div class='swiper-slide'>"+
                            "   <div class='card demo-card-header-pic'>"+
                            "       <div class='card-header color-white no-border' valign='bottom' style='background-image:url(img/kareer_bg.png); height: 150px;'>"+
                            "           <div class='col s8 m8 l8'>"+
                            "               <h4>"+v[1]+"<br/><small>"+v[2]+"</small>"+
                            "               </h4>"+
                            "           </div>"+
                            "           <div class='col s4 m4 l4'>"+
                            "               <button "+bookmarkButtonSettings+" data-node='"+(JSON.stringify([v[0],applicantData[0][0]]))+"' data-cmd='bookmark' class='btn-floating btn-large waves-effect waves-light purple icon f7-icons color-white' style='top: 30px;opacity:1;'>"+
                            "                   bookmark"+
                            "               </button>"+
                            "           </div>"+
                            "       </div>"+
                            "       <div class='card-content'>"+
                            "           <div class='card-content-inner' style='height:"+(height-300)+"px; overflow:hidden;'>"+
                            "               <p class='color-gray'>is in need of:</p>"+
                            "               <h5 class='color-teal'>"+v[3]+"<br/>"+
                            "                   "+skills+""+
                            "               </h5>"+
                            "               <div class='left'>"+v[3]+"</div>"+
                            "               <p>"+
                            "                   <div class='description' style='white-space: normal;'>"+
                            "                       "+v[4]+""+
                            "                   </div>"+
                            "               </p>"+
                            "           </div>"+
                            "       </div>"+
                            "       <div class='card-footer'>"+
                            "           <a class='waves-effect waves-teal btn-flat hidden' href='#'>Read More</a>"+
                            "           <button data-node='"+(JSON.stringify([v[0],applicantData[0][0]]))+"' data-cmd='apply' class='waves-effect waves-light btn icon f7-icons color-white' style='background: rgb(0, 150, 136); margin: 0;'>"+
                            "               paper_plane_fill"+
                            "           </button>"+
                            "       </div>"+
                            "   </div>"+
                            "</div>";

                $("#jobs .swiper-wrapper").append(content);
                // if($('#jobs .card-content-inner')[i].scrollHeight > $('#jobs .card-content-inner').innerHeight()){
                //     console.log("x");
                // }
            });
            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageBack('index',function(page){
                account.ini();
            });

            $("button.icon").on('click',function(){
                var _this = this;
                var data = $(this).data();
                var node = data.node;
                if(data.cmd == "bookmark"){
                    console.log(data.cmd);
                    var apply = system.ajax(processor+'do-bookmark',node);
                    apply.done(function(e){
                        console.log(e);
                        if(e == 1){
                            system.notification("Kareer","Done.",false,2000,true,false,function(){
                                $(_this).attr({"disabled":true});

                            });
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,false,false);
                        }
                    })
                }

                if(data.cmd == "apply"){
                    console.log("chu");
                    var apply = system.ajax(processor+'do-apply',node);
                    apply.done(function(e){
                        console.log(e);
                        if(e == 1){
                            system.notification("Kareer","Success. Application sent.",false,2000,true,false,function(){
                                $(_this).attr({"disabled":true});
                            });
                        }
                        else{
                            system.notification("Kareer","Failed.",false,3000,true,false,false);
                        }
                    })
                }
            })

            var swiper = app.swiper(".swiper-container", {
                loop: false,
                speed: 400,
                grabCursor: true,
                effect: 'coverflow',
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                },
                shortSwipes: true,
                mousewheelControl: true,
            });

            var documentHeight = $(window).height();
            $("#content .card-content").attr({"style":"height:"+(documentHeight-310)+"px; overflow:hidden; text-overflow: ellipsis;"});
        },
        applied:function(id){
            var $data = "";
            var applications = system.ajax(processor+'get-applcation',id);
            applications.done(function(data){
                localStorage.setItem('applications',data);
            });            
        },
        bookmarked:function(id){
            var bookmark = system.ajax(processor+'get-bookmarks',id);
            bookmark.done(function(data){
            localStorage.setItem('bookmarks',data);
            });
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-jobs',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        getBookmarked:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-Bjobs',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        search:function(id,range){
            $("#form_search").validate({
                rules: {
                    field_location: {required: true,maxlength:100, minlength:4},
                    field_skill: {required: true,maxlength:100, minlength:3},

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
                    var data = system.ajax(processor+'do-searchJob',[_form[0],range.noUiSlider.get(),_form[1]]);
                    data.done(function(data){
                        console.log(data);
                        view.router.loadPage("pages/admin/jobs.html");
                        var applicant = JSON.parse(localStorage.getItem('applicant'));
                        var appliedList = jobs.applied(applicant[0][0]);
                        var bookmarkedList = jobs.bookmarked(applicant[0][0]);
                        data = JSON.parse(data);
                        jobs.show(data);
                    })
                }
            });
        }
    }

    return {
        hooks: {
            appInit:system.ini
        }
    }
};

var kareer_app = new Framework7({
    popupCloseByOutside:false,
    pushState: false,
    autoLayout: true,
    kareer:true,
    material:true,
});