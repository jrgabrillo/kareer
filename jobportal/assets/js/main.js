// do not delete
console.log('%cDeveloped By: Rufo N. Gabrillo Jr. (2016)', 'background:#000;color:#ccc;');

Framework7.prototype.plugins.main = function (app, params) {
    'use strict';
    if (!params) return;
    var self = this;
    var app = new Framework7({material: true});          
    var $$ = Dom7;
    var processor = '../jobportal/assets/harmony/Process.php?';
    var directory = '/';

    var swiper = app.swiper('.swiper-container', {
        speed: 400,
        spaceBetween: 100,
        direction: 'vertical'
    });

    // System functions - general usage
        var notification = function(title,message,button,timeout,loader,_functionOpen,_functionClose){
            if(loader == true){
                preloader(true);
                block(true);
            }

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
                    if(loader == true){
                        preloader(false);
                        block(false);
                    }
                    app.closeNotification(".notification-item");
                },timeout);
            }
            if(_functionOpen != false){
                _functionOpen();                
            }
        };
        var popover = function(title,message){
            var mainView = app.addView('.view-main');            
            app.addNotification({
                title: title,
                message: message
            });
        };      
        var ajax = function(url,data){
            return $$.ajax({
                type: "POST",
                url: url,
                data: {data: data},
                async: !1,
                cache:false,
                error: function() {
                    console.log("Error occured")
                }
            });
        };
        var get_apr = function(source){
            var ajax = ajax(source,'');
            return ajax.responseText;
        };
        var get_ajax = function(url,data,_error){
            var ret = "";
            return $$.ajax({
                type: "POST",
                url: url,
                data: {data: data},
                async: !1,
                error: function(e) {
                    _error();
                    console.log(e);
                    console.log("Error occured")
                },
                success:function(e){
                    console.log(e);
                    return e;
                },
                beforeSend:function(e){
                    console.log(e.status);
                },
                complete:function(e){
                    console.log(e);
                }
            });
        };
        var request = function(url,data,_error){
            var ret = "";
            try{
                $$.ajax({
                    type: "POST",
                    url: url,
                    data: {data: data},
                    async: !1,
                    beforeSend:function(e){
                        ret = e.status;
                        console.log(e);
                    },
                    complete:function(e){
                        ret = e.status;
                        console.log(e);
                    },
                    success:function(e){
                        ret = e.status;
                    }
                });
            }
            catch(e){
                ret = 0;
            }
            return ret;
        };
        var getRealNumber = function(val){
            return ($.isNumeric(val)) ? val : 0;
        };
        var preloader = function(status){
            if(status){
                var container = $$('body');
                if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
                app.showProgressbar(container, 'multi');
            }
            else{
                app.hideProgressbar();              
            }
        };
        var block = function(status){
            if(status){
                app.popup('.loader');
            }
            else{
                app.closeModal('.loader');
            }
        };
        var logoHandler = function(){
            var bg = 'img/img-bg.jpg';
            var logo = 'img/logo.png';
            bg = (localStorage.getItem('bg')!=null)?localStorage.getItem('bg'):bg;
            logo = (localStorage.getItem('logo')!=null)?localStorage.getItem('logo'):logo;

            $("img[src='img/logo.png']").attr({'src':logo});
            $(".panel .panel-bg").attr({'style':'background-image:url('+bg+');'});
        }
        var getDeviceSize = function(){
            var device = window;
            return window.innerWidth;
        }
    // end general usage

    // Getting the log in details
        var ini_login = function(){
            swiper.lockSwipes();
            var data = localStorage.getItem('saved-login');
            data = ((data == "") || (data == null))?false:data;

            if(data != false){
                notification("k12","Retrieving saved username and password.",false,5000,true,function(){
                    setTimeout(function(){
                        access_login(data);
                    }, 1000);
                },false);
            }
            else{
                login();
            }
        };
        var login = function(){
            var _this = this;
            $$('a[data-cmd="checkIP"]').on('click',function(){
                $$(this).addClass('disabled');
                var form = app.formToJSON('#form_login');
                var field = JSON.stringify([{'name':'field_username','value':form['field_username']},{'name':'field_password','value':form['field_password']}]);
                if(form['field_rememberLogin'].length == 1){
                    localStorage.setItem('saved-login',field);
                }
                else{
                    localStorage.setItem('saved-login',"");
                }
                access_login(field);
            });
        };
    // end getting the log in details

    // main processes
        var ini_mainProcess = function(){
            logoHandler();
            var app = new Framework7({material: true});
            getIP.ini();
        };
        var content = function(){
            var content = ajax('templates/admin/index.html','');
            $$('div[data-node="page-initialization"]').html(content.responseText);
            content = ajax('templates/admin/home.html','');
            innerContent(content.responseText);
        };
        var innerContent = function(content){
            $$('#display-content').html(content);           
        };
    // end main processes



        var signUp = function(){
            //[CED] validation
           
            $("#form_signUp").validate({
                rules: {
                    field_name: {required: true, maxlength:50},
                    field_email: {required: true, maxlength: 50,email:true},
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
                //[CED] error messages for filling up the fields
                messages: {
                    field_name: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_email: {
                        required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        email: "<i data-error ='Email is invalid' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_password: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        checkPassword: "<i data-error ='Password is weak' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },

                },

                submitHandler: function (form) {
                    var _form = $(form).serializeArray();
                    var signUp = ajax(processor+'get-login',_form);
                     notification("k12","Field is req.",false,3000,true,function(){
                       
                    },false);
                }
            }); 
            //CED pop-up error in info(icon)
            $$(".error-icon").on('click',function(){
                var data= $(this).find('i');
                notification("k12",data[0].dataset.error,false,3000,true,function(){
                },false);
            });


        }
        var logIn = function(){
            // logIn validation
            $("#form_logIn").validate({
                rules: {
                    field_email: {required: true,email:true},
                    field_password: {required: true,checkPassword:true},
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
                        email: "<i data-error ='Email is invalid' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                    field_password: {
                        required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                        checkPassword: "<i data-error ='Incorrect password' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                    },
                },
                submitHandler: function (form) {
                    var _form = $(form).serializeArray();
                    var logIn = ajax(processor+'do-logIn',_form);
                    console.log(logIn.responseText);
                }
            }); 
        }



        // var logIn = function(){
        //     console.log('xx');
        //     $$("a[data-cmd='button_logIn']").on('click',function(){
        //         var form = $("#form_logIn").serializeArray();
        //         console.log(form);
        //     });
        // }



    return {
        hooks: {
            appInit: function () {
                var deviceSize = getDeviceSize();
                console.log(deviceSize);
                signUp();
                logIn()
            }
        }
    }
};

var k12_app = new Framework7({
    main:true
});
