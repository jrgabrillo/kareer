// do not delete
console.log('%cDeveloped By: RNR Digital Consultancy (2017)', 'background:#000;color:#ccc;');

Framework7.prototype.plugins.kareer = function (app, params) {
    'use strict';
    if (!params) return;
    var self = this;
    // var processor = 'http://192.168.1.20/kareer/assets/harmony/mobile.php?';
    var processor = 'http://localhost/kareer/assets/harmony/mobile.php?';
    // var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
    var directory = '/';
    var $$ = Dom7;
    var view = app.addView('.view-main');

    var system = {
        ini:function(){
            //FB
            window.fbAsyncInit = function() {
                FB.init({
                  appId            : '134413893925132',
                  autoLogAppEvents : true,
                  xfbml            : true,
                  version          : 'v2.11'
                });
                // FB.getLoginStatus(function(response) {
                //     if (response.status === 'connected') {
                //         console.log(response.status);
                //     } else if (response.status === 'not_authorized') {
                //         console.log(response.status);
                //     } else {
                //         console.log(response.status);
                //     }
                // });
            };
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                // js.src = "//connect.facebook.net/en_US/sdk.js";
                js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=134413893925132';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
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
                    console.log("Error occured")
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
        xml:function(url){
            return $.ajax({
                type: "POST",
                url: url,
                dataType: 'xml',
                async: !1,
                cache:false
            });
        },
        popover:function(title,message){
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
            console.log(data);
            $("#index img.responsive-img").attr({"src":"img/profile/"+data[23]});
            var content = "<div class='content-block'>"+
                            "    <p class='color-gray'><h5>"+data[6]+" "+data[7]+"</h5></p>"+
                            // "    <a data-cmd='account-logout' class='btn-floating btn-flat'>"+
                            // "      <i class='f7-icons color grey'>logout</i>"+
                            // "    </a>"+
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
                            "            <a data-load='' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray' style='font-size: 30px; margin-top: 6px;'>gear_fill</i></a><div class='grey-text' style = 'font-size: xx-small'>SETTINGS</div>"+
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
            $("a[data-cmd='account-logout']").on('click',function(){
                console.log("uwian na");
                localStorage.removeItem('applicant','');
                localStorage.removeItem('applications','');
                localStorage.removeItem('bookmarks','');
                window.location.reload();
            }) 
            app.onPageInit('academic',function(page){
                console.log('page');
                academic.ini();
            }); 
            app.onPageInit('resume',function(page){
                console.log('page'); 
                resume.ini();

            });

            app.onPageInit('bookmarks',function(page){
                console.log('page');
                bookmarks.ini();
            });       

            app.onPageInit('account',function(page){
                console.log('page');
                var applicantData = JSON.parse(localStorage.getItem('applicant'));
                var data = account.get(applicantData[0][0]);
                account.account(data);
                // account.edit(data);
                account.show(data);
            });

            app.onPageInit('career',function(page){
                console.log('page');
                career.ini();
            });
             

            var picture = "img/profile/profile.png";
            $("a[data-cmd='update']").on('click',function(){
                console.log("content");
                var content =   "<div class='card-content'>"+
                                "<div class=' center image-crop'>"+
                                "   <img class='circle responsive-img' style='width: 145px; height: 145px; border:2px; border-style: solid; border-color: #2b9c9b' src='"+picture+"'>"+
                                "</div>"+
                                "<div class='center btn-group'>"+
                                "<label for='inputImage' class='btn-flat btn-xs btn-primary'>"+
                                "   <input type='file' accept='image/*' name='file' id='inputImage' class='hide'>"+
                                "   <i class='icon f7-icons'>add_round</i>"+
                                "</label>"+
                                "<button class='btn-flat btn-warning btn-xs close-popup' data-load='index' data-cmd='cancel' type='button'>"+
                                "   <i class='icon f7-icons'>close_round</i>"+
                                "</button>"+
                                "<button class='btn-flat btn-info btn-xs hidden' data-cmd='rotate' data-option='-90' type='button' title='Rotate Left'>"+
                                "   <i class='icon f7-icons'>undo</i>"+
                                "</button>"+
                                "<button class='btn-flat btn-info btn-xs hidden' data-cmd='rotate' data-option='90' type='button' title='Rotate Right'>"+
                                "   <i class='icon f7-icons'>redo</i>"+
                                "</button>"+
                                "<button class='btn-flat btn-danger btn-xs hidden' data-cmd='save' type='button'>"+
                                "   <i class='icon f7-icons'>check</i>"+
                                "</button>"+
                                "</div>"+
                                "</div>";
                                console.log("sdsd");
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
                                            console.log("palitan na");
                                            var ajax = system.ajax(processor+'do-update-image',[data[0],$image.cropper("getDataURL")]);
                                            ajax.done(function(data){
                                                if(data == 1){
                                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                                        app.closeModal('.popup-edit', true);
                                                        account.ini();
                                                    });
                                                    console.log(data);
                                                }
                                                else{
                                                   system.notification("Update","Failed.",false,3000,true,false,false);
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
                    app.onPageInit('index',function(page){
                        console.log('index');
                        account.ini();
                    });
                });
            });
        }, 
        controller:function(data){
            $$(".card-header a").on('click',function(){
                console.log(data);
                $("a").removeClass('color-teal').addClass('color-gray');
                $(this).removeClass('color-gray').addClass('color-teal');
            });
        },   
        account:function(data){
            var accData = data;
            $("img.resume").attr({"src":"img/profile/"+accData[23]});
            // console.log(data);
            var storedData = app.formStoreData('account', {
                'GivenName' : accData[6],
                'MiddleName' : accData[8],
                'LastName' : accData[7],
                'Gender' : accData[9],
                'Age' : accData[10],
                'DateOfBirth' : accData[11],
                'PlaceOfBirth' : accData[12],
                'Address' : accData[13],
                'Citizenship' : accData[14],
                'Weight' : accData[15],
                'Height' : accData[16],
                'Mother' : accData[17],
                'Father' : accData[18],
                'Language' : accData[19],
                'Religion' : accData[20],
                'Mother_Occupation' : accData[21],
                'Father_Occupation' : accData[22]
            });

            $("a.saveAccount").on('click',function(){
                 var id = accData[0];
                var storedData = app.formGetData('account');
                var accountData = $.map(storedData, function(value, index) {
                    return [value];
                });
                var data = system.ajax(processor+'do-accountResume',[id,accountData]);
                data.done(function(data){
                    console.log(data);
                    if(data != 0){
                        system.notification("Kareer","Saved",false,2000,true,false,function(){
                            var update = account.get(id);
                            account.account(update);
                        });                        
                    }
                })
            });
            
            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageInit('resume',function(page){
                // account.controller();
                resume.ini();
            });

            app.onPageBack('index',function(page){
                // account.controller();
                account.ini();
            });

            $("a.next").on('click',function(){ 
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                // $("a.career").addClass('disabled');
                var id = accData[0];
                var storedData = app.formGetData('account');
                // console.log(storedData);
                var accountData = $.map(storedData, function(value, index) {
                    return [value];
                });
                var data = system.ajax(processor+'do-accountResume',[id,accountData]);
                data.done(function(data){
                    console.log(data);
                    if(data != 0){
                            var update = account.get(id);
                            account.account(update);
                            resume.ini();
                    }

                })

            });
            app.onPageInit('builderCareer',function(page){
                career.ini();
            });
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-applicant',id);
            jobs.done(function(data){
                console.log(data);
                $data = data;
            });
            return JSON.parse($data);
        },
        show:function(data){
            $("a[data-cmd='view']").on('click',function(){
                var data = $(this).data();
                // console.log(data);
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
            career.delete(list);

            $("a.index").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                account.controller(data);
            });

            app.onPageInit('index',function(page){
                account.controller();
            });
        },
        add:function(id){
            // console.log("othan");
            $("a.career").addClass('hidden');
            $("a.add").addClass('hidden');
            $("div.list").addClass('hidden');
            $("div.add").removeClass('hidden');
            $("a.add").addClass('hidden');
            $("a.goback").removeClass('hidden');
            // $("a.cancel").addClass('hidden');
            $("div.toolbar").addClass('hidden');    

            app.calendar({
                input: '#field_date',
                dateFormat: 'M dd yyyy',
                rangePicker: true
            });

            $("a.cancel").on('click',function(){
                $("div.list").removeClass('hidden');
                $("div.add").addClass('hidden');
                $("a.career").removeClass('hidden');
                $("a.add").removeClass('hidden');
                $("div.toolbar").removeClass('hidden');
                $("div.empty").addClass('hidden');
                // $("a.save").addClass('hidden');
                // $("a.cancel").addClass('hidden');
            });

            $("a.goback").on('click',function(){
                $("div.list").removeClass('hidden');
                $("div.add").addClass('hidden');
                $("a.add").removeClass('hidden');
                $("a.goback").addClass('hidden');
                $("a.home").removeClass('hidden');
                // $("a.index").removeClass('hidden');
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('builderCareer',function(page){
                career.ini();
            });
            app.onPageInit('career',function(page){
                career.ini();
            });

            $("#form_career").validate({
                rules: {
                    // field_dateFirst: {required: true,maxlength:20},
                    field_date: {required: true,maxlength:30},
                    field_position: {required: true,maxlength:100},
                    field_agency: {required: true,maxlength:100},
                    field_salary: {required: true,maxlength:100},
                    field_appointment: {required: true,maxlength:100},
                    field_govt_service: {required: true,maxlength:100},
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
            var jobs = system.ajax(processor+'get-career',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'do-editCareer',id);
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
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='edit' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";
                $("a.career").removeClass('disabled');
                $("div.empty").addClass('hidden');

            });

            $$("#display_career").html("<ul class='collection'>"+content+"</ul");
            // $$("a[data-cmd='edit']").on('click',function(){
            //     var data = $(this).data();
            //     var id = data.node;
            //     var c = career.get(id);
            //     var store = JSON.parse(localStorage.getItem('f7form-form_career'));
            //     var careerData = $.map(store, function(value, index) {
            //         return [value];
            //     });
            //     console.log(c);
            //     console.log(store);
            //     console.log(careerData);
            //     career.edit(c,careerData);
                
            // });
            $("a.career").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageInit('builderAcademic',function(page){
                academic.ini();
            });

        },
        delete:function(data){
            $("a[data-cmd='delete']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                var content =   "        <ul>"+
                                "            <li>"+
                                "                <h5 class = 'center'>Are you sure?"+
                                "                </h5>"+
                                "            </li>"+
                                "            <li>"+
                                "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                "                <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>"+
                                "            </li>"+
                                "        </ul>";
                $("#deletePopover").html(content);
                $("a[data-cmd='proceed']").on('click',function(){
                    var acad = system.ajax(processor+'do-deleteCareer',id);
                    acad.done(function(data){
                        console.log(acad);
                            if(data != 0){
                                system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popover-delete', true);
                                    app.closeModal('.popup career', true);
                                    // $("a.career").addClass('disabled');
                                    career.ini();
                                });

                            }
                            else{
                                system.notification("Kareer","Failed.",false,3000,true,false,false);
                            }
                    });
                });
            });
        },
        edit:function(c,careerData){
            // console.log(c);
            var initial = c;
            var current = careerData;
            var storedData = app.formStoreData('form_career',{
                    'field_dateFirst' : c[0][2],
                    'field_dateLast' : c[0][3],
                    'field_position' : c[0][4],
                    'field_agency' : c[0][5],
                    'field_salary' : c[0][6],
                    'field_appointment' : c[0][7],
                    'field_govt_service' : c[0][8]
            }); 
            $("div.toolbar").addClass('hidden');
            $("a.career").addClass('hidden');
            $("a.add").addClass('hidden');
            $("a.save").removeClass('hidden');
            $("a.cancel").removeClass('hidden');
            $("div.list").addClass('hidden');
            $("div.edit").removeClass('hidden');
            $("div.input-field").addClass('not-empty-state');
            $("input.form-control").addClass('not-empty-state');
            $("label").addClass('active');

            $("a.cancel").on('click',function(){

                $("div.edit").addClass('hidden');
                $("div.add").addClass('hidden');
                $("a.save").addClass('hidden');
                $("a.cancel").addClass('hidden');                
                $("a.career").removeClass('hidden');
                $("a.add").removeClass('hidden');
                $("div.list").removeClass('hidden');
                $("div.toolbar").removeClass('hidden');
                var list = career.getAll(c[0][1]);
                career.show(list);
                // localStorage.removeItem('f7form-form_career','');

                // // if(storedData){
                // console.log(storedData);
                // // }
            });

            $("a.save").on('click',function(){              
                var storedData = app.formGetData('form_career');
                if(storedData){
                // console.log(storedData);
                }
            });
        }
    }

    var academic = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = academic.get(applicantData[0][0]);
            $$("a[data-cmd='add-academic']").on('click',function(){
                academic.add(applicantData[0][0]);
            });
            academic.show(list);
            academic.delete(list);

            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                account.controller(data);
            });

            app.onPageInit('index',function(page){
                account.controller();
            });
        },
        add:function(id){
            // console.log("sdfsd");
            $("a.career").addClass('hidden');
            $("a.add").addClass('hidden');
            $("div.list").addClass('hidden');
            $("div.add").removeClass('hidden');
            $("a.add").addClass('hidden');
            $("a.goback").removeClass('hidden');
            // $("a.cancel").addClass('hidden');
            $("div.toolbar").addClass('hidden');

            
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

            $("a.cancel").on('click',function(){
                $("div.list").removeClass('hidden');
                $("div.add").addClass('hidden');
                $("a.academic").removeClass('hidden');
                $("a.add").removeClass('hidden');
                $("div.toolbar").removeClass('hidden');
            });



            $("#form_academic").validate({
                rules: {
                    field_yearLevel: {required: true,maxlength:20},
                    field_school: {required: true,maxlength:100},
                    field_degree: {required: false,maxlength:100},
                    field_units: {required: false,maxlength:100},
                    field_dateFirst: {required: true,maxlength:100},
                    field_dateLast: {required: true,maxlength:100},
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
                    console.log(_form);
                    var data = system.ajax(processor+'do-academic',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","Academic Added.",false,2000,true,false,function(){
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
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='edit' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";

                    $("a.academic").removeClass('disabled');
            });
            $$("#display_academic").html("<ul class='collection'>"+content+"</ul");


            $("a.academic").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageInit('builderSkills',function(page){
                skills.ini();
            });

        },
        delete:function(data){
            $("a[data-cmd='delete']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                var content =   "        <ul>"+
                                "            <li>"+
                                "                <h5 class = 'center'>Are you sure?"+
                                "                </h5>"+
                                "            </li>"+
                                "            <li>"+
                                "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                "                <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>"+
                                "            </li>"+
                                "        </ul>";
                $("#deletePopover").html(content);
                $("a[data-cmd='proceed']").on('click',function(){
                    var acad = system.ajax(processor+'do-deleteAcad',id);
                    acad.done(function(data){
                        console.log(acad);
                            if(data != 0){
                                system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popover-delete', true);
                                    academic.ini();
                                });

                            }
                            else{
                                system.notification("Kareer","Failed.",false,3000,true,false,false);
                            }
                    });
                });
            });
        }
    }

    let skills = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = skills.get(applicantData[0][0]);
            $$("a[data-cmd='add-skills']").on('click',function(){
                skills.add(applicantData[0][0]);
            });
            skills.show(list);
            // skills.delete(list);

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
            var jobs = system.ajax(processor+'get-skills',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        add:function(id){
            $("a.skills").addClass('hidden');
            $("a.add").addClass('hidden');
            $("div.list").addClass('hidden');
            $("div.add").removeClass('hidden');
            $("a.add").addClass('hidden');
            $("a.goback").removeClass('hidden');
            $("div.toolbar").addClass('hidden');

            $('select').material_select('close');
            $("a.cancel").on('click',function(){
                $("div.list").removeClass('hidden');
                $("div.add").addClass('hidden');
                $("a.skills").removeClass('hidden');
                $("a.add").removeClass('hidden');
                $("div.toolbar").removeClass('hidden');
            });

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
                    console.log(_form);
                    var data = system.ajax(processor+'do-skill',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","Skill Added.",false,2000,true,false,function(){
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
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='edit' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";

                    $("a.skills").removeClass('disabled');
            });
            $$("#display_skills").html("<ul class='collection'>"+content+"</ul");

            $("a.skills").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('builderLanguage',function(page){
                language.ini();
            });
        },
    }

    let language = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = language.get(applicantData[0][0]);
            $$("a[data-cmd='add-language']").on('click',function(){
                language.add(applicantData[0][0]);
            });
            language.show(list);
            // skills.delete(list);

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
            var jobs = system.ajax(processor+'get-language',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        add:function(id){
            $("a.language").addClass('hidden');
            $("a.add").addClass('hidden');
            $("div.list").addClass('hidden');
            $("div.add").removeClass('hidden');
            $("a.add").addClass('hidden');
            $("a.goback").removeClass('hidden');
            $("div.toolbar").addClass('hidden');

            $('select').material_select('close');
            $("a.cancel").on('click',function(){
                $("div.list").removeClass('hidden');
                $("div.add").addClass('hidden');
                $("a.language").removeClass('hidden');
                $("a.add").removeClass('hidden');
                $("div.toolbar").removeClass('hidden');
            });

            $("#form_language").validate({
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
                    console.log(_form);
                    var data = system.ajax(processor+'do-language',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","Language Added.",false,2000,true,false,function(){
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
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='edit' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";

                    $("a.language").removeClass('disabled');
            });
            $$("#display_language").html("<ul class='collection'>"+content+"</ul");

            $("a.language").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('builderReferences',function(page){
                references.ini();
            });
        },
    }

    let references = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = references.get(applicantData[0][0]);
            $$("a[data-cmd='add-references']").on('click',function(){
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
            var jobs = system.ajax(processor+'get-references',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        add:function(id){
            $("a.references").addClass('hidden');
            $("a.add").addClass('hidden');
            $("div.list").addClass('hidden');
            $("div.add").removeClass('hidden');
            $("a.add").addClass('hidden');
            $("a.goback").removeClass('hidden');
            $("div.toolbar").addClass('hidden');


            $("a.cancel").on('click',function(){
                $("div.list").removeClass('hidden');
                $("div.add").addClass('hidden');
                $("a.references").removeClass('hidden');
                $("a.add").removeClass('hidden');
                $("div.toolbar").removeClass('hidden');
            });

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
                    console.log(_form);
                    var data = system.ajax(processor+'do-references',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","References Added.",false,2000,true,false,function(){
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
                            "   <div class='chip-media bg-blue' style = 'width: 50px !important; height: 50px !important; font-size: 24px;'></div>"+
                            "   </div>"+
                            "   <div class = 'col 33'>"+
                            "   <div class='title color-teal' ><strong class ='color-black'>"+v[2]+"</strong></div>"+
                            "   <div class ='color-teal' ><small class ='color-black'>"+v[7]+"</small></div>"+
                            "   </div>"+
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='edit' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";

                    $("a.references").removeClass('disabled');
            });
            $$("#display_references").html("<ul class='collection'>"+content+"</ul");

            $("a.references").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('builderSeminar',function(page){
                seminar.ini();
            });
        },
    }

    let seminar = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = seminar.get(applicantData[0][0]);
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
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-seminar',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        add:function(id){
            $("a.seminar").addClass('hidden');
            $("a.add").addClass('hidden');
            $("div.list").addClass('hidden');
            $("div.add").removeClass('hidden');
            $("a.add").addClass('hidden');
            $("a.goback").removeClass('hidden');
            $("div.toolbar").addClass('hidden');


            $("a.cancel").on('click',function(){
                $("div.list").removeClass('hidden');
                $("div.add").addClass('hidden');
                $("a.seminar").removeClass('hidden');
                $("a.add").removeClass('hidden');
                $("div.toolbar").removeClass('hidden');
            });

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
                    console.log(_form);
                    var data = system.ajax(processor+'do-seminar',[id,_form]);
                    data.done(function(data){
                        console.log(data);
                        if(data != 0){
                            $$("input").val("");
                            system.notification("Kareer","seminar Added.",false,2000,true,false,function(){
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
                            "   <div class='chip-media bg-blue' style = 'width: 50px !important; height: 50px !important; font-size: 24px;'></div>"+
                            "   </div>"+
                            "   <div class = 'col 33'>"+
                            "   <div class='title color-teal' ><strong class ='color-black'>"+v[2]+"</strong></div>"+
                            "   <div class ='color-teal' ><small class ='color-black'>"+v[3]+"</small></div>"+
                            "   </div>"+
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='edit' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";

                    $("a.seminar").removeClass('disabled');
            });
            $$("#display_seminars").html("<ul class='collection'>"+content+"</ul");

            $("a.seminar").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('resumePreview',function(page){
                resume.page();
            });
        },
    }

    let resume ={
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var data = resume.get(applicantData[0][0]);
            let content =   `<div><img src="./img/RES.png" style="width: 200px; position: relative; margin-top: 80px;" ></div>
                            <p style="font-size: 17px">Make my Resume</p>
                            <div class="center">
                                <a data-load ='builderAccount' class="resume btn btn-large white-text waves-effect waves-teal waves-light" style="border-radius: 30px; width: 90%; height: 55px; font-size: 20px; margin-top: 97px; background-color: #5cb0a8;">Create Resume</a>
                                <a data-load ='SavedResume' class="resume btn btn-large white-text waves-effect waves-purple waves-light" style="border-radius: 30px;width: 90%;height: 55px; font-size: 20px; margin-top: 15px; background-color: #7a5578;"><p>Saved Resume</p></a>
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
                account.account(data);

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

            $$("#display_fullname strong").html(personalInfo[7]+","+personalInfo[6]+" "+personalInfo[8]);
            $$("#display_address small").html(personalInfo[12]);
            $$("#display_phone small").html("09123456789");
            $$("#display_email small").html(personalInfo[3]);

            var personalcontent = "<div class='col s6'>"+
                                  "   <div >Date of Birth: <span class ='color-black'>"+personalInfo[10]+"</span></div>"+
                                  "   <div >Age: <span class ='color-black'></span></div>"+
                                  "   <div >Mother: <span class ='color-black'>"+personalInfo[16]+"</span></div>"+
                                  "   <div >Father: <span class ='color-black'>"+personalInfo[17]+"</span></div>"+
                                  "   <div >Religion: <span class ='color-black'></span></div>"+
                                  "   <div >Citizenship: <span class ='color-black'>"+personalInfo[13]+"</span></div>"+
                                  "</div>"+
                                  "<div class='col s6'>"+
                                  "   <div >Place of Birth: <span class ='color-black'>"+personalInfo[11]+"</span></div>"+
                                  "   <div >Gender: <span class ='color-black'>"+personalInfo[9]+"</span></div>"+
                                  "   <div >Occupation: <span class ='color-black'></span></div>"+
                                  "   <div >Occupation: <span class ='color-black'></span></div>"+
                                  "   <div >Language: <span class ='color-black'>"+personalInfo[18]+"</span></div>"+
                                  "   <div >Height: <span class ='color-black'>"+personalInfo[14]+"</span></div>"+
                                  "   <div >Weight: <span class ='color-black'>"+personalInfo[15]+"</span></div>"+
                                  "</div>";
            $$("#display_personalInfo").html(personalcontent);

            var acad = academic.get(applicantData[0][0]);
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

            var skill = skills.get(applicantData[0][0]);
            var skillcontent = "";
            $.each(skill,function(i,v){
                skillcontent += "   <span class='title'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                                "   <div><span class ='color-black'>"+v[3]+"</span></div>";
            });
            $$("#display_skills").html(skillcontent);

            var sem = seminar.get(applicantData[0][0]);
            var semcontent = "";
            $.each(sem,function(i,v){
                semcontent +=  "<span class='title'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                            "   <div><span class ='color-black'>"+v[3]+"</span></div>"+
                            "   <div><span class ='color-black'>"+v[4]+"</span></div>";
            });
            $$("#display_seminar").html(semcontent);

            var reference = references.get(applicantData[0][0]);
            var refcontent = "";
            $.each(reference,function(i,v){
                refcontent += "   <span class='title'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                              "   <div><span class ='color-black'>"+v[4]+"</span></div>"+
                              "   <div><span class ='color-black'>"+v[5]+"</span></div>"+
                              "   <div><span class ='color-black'>"+v[7]+"</span></div>";
            });
            $$("#display_references").html(refcontent);
            $("a.print").on('click',function(){
                var toPrint = document.getElementById('Preview');

                var popupWin = window.open('', '_blank', 'width=350,height=150,location=no,left=200px');

                popupWin.document.open();

                popupWin.document.write('<html><title>::Print Preview::</title><link rel="stylesheet" type="text/css" href="Print.css" media="screen"/></head><body">')

                popupWin.document.write(toPrint.innerHTML);

                popupWin.document.write('</html>');

                popupWin.document.close();
            });

            //PDF generation function
            (function () {  
                var  
                 form = $('.list-block'),  
                 cache_width = form.width(),  
                 legal = [595.28, 975]; // for legal size paper width and height  
          
                $('#create_pdf').on('click', function () {  
                    $('body').scrollTop(0);  
                    var data = $(this).data('load');
                    view.router.loadPage("pages/admin/"+data+".html");
                    createPDF();
                    upload();

                });  
                //create pdf  
                function createPDF() {  
                    getCanvas().then(function (canvas) {  
                        var  
                         img = canvas.toDataURL("image/png"),  
                         doc = new jsPDF({  
                             unit: 'px',  
                             format: 'legal'  
                         });  
                        doc.addImage(img, 'JPEG', 3, 3);  
                        doc.save('resume.pdf');
                        form.width(cache_width);
                    });  
                }  
          
                // create canvas object  
                function getCanvas() {  
                    form.width((legal[0] * 1.33333) - 80).css('max-width', 'none');  
                    return html2canvas(form, {  
                        imageTimeout: 1000,  
                        removeContainer: true  
                    });  
                }  
                function upload(){
                    var doc = new jsPDF();
                    var pdf = doc.output(); 
                    var ajax = system.ajax(processor+'do-resume',[applicantData[0][0],pdf]);
                    ajax.done(function(data){
                        console.log(data);
                        if(data != 0){
                            system.notification("Kareer","Resume Published.",false,2000,true,false,function(){
                                 app.onPageInit('index',function(page){
                                    content.ini();
                                });
                            });
                            // console.log(data);
                        }
                        else{
                           system.notification("Kareer","Failed.",false,3000,true,false,false);
                            // console.log(data);
                        }
                    });
                }    


            }());  
        }
    }

    var logIn = {
        ini:function(){
            $("button.LOGINfb").on('click',function(){
                    FB.getLoginStatus(function(response) {
                        if (response.status === 'connected') {
                            console.log(response.status);
                        } else if (response.status === 'not_authorized') {
                            console.log(response.status);
                        } else {
                            console.log(response.status);
                        }
                    });
                    FB.api('/me', {fields: 'id,first_name,last_name,email,gender'}, function (response){
                        var data = $.map(response, function(value, index) {
                            return [value];
                        });
                        var LogData = JSON.stringify(data);
                        console.log(LogData);
                        if(LogData == localStorage.getItem('fb')){
                            console.log("same");
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
                        }
                        else{
                            console.log("not");
                            system.notification("Kareer","Failed. Please Register Again",false,3000,true,false,false);
                        }
                    });
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
        },
        logout:function(){
            $$("a[data-cmd='account-logout']").on('click',function(){
                localStorage.removeItem('saved-login','');
                localStorage.removeItem('user-details','');
                window.location.reload();
            })          
        }
    }
    var fb ={
        ini:function(){
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : 'IsertYourFacebookAppId', // FB App ID
                    cookie     : true,  // enable cookies to allow the server to access the session
                    xfbml      : true,  // parse social plugins on this page
                    version    : 'v2.8' // use graph api version 2.8
                });
                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        //display user data
                        console.log(response);
                        fb.getFbUserData();
                    }
                });
            };
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        },
        login:function(){
            FB.login(function (response) {
                if (response.authResponse) {
                    // Get and display the user profile data
                    console.log(response.authResponse);
                    // fb.getFbUserData();
                } else {
                    console.log("User cancelled login or did not fully authorize.");
                }
            }, {scope: 'email'});
        },
        getUserData:function(){
            FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'}, function (response) {
                    console.log(response);
                    // fb.saveUserData(response);
            });
        },
        saveUserData:function(userData){
            $.post('userData.php', 
                {
                    oauth_provider:'facebook',
                userData: JSON.stringify(userData)
            }, function(data){ return true; });
        },
        logout:function(){
            FB.logout(function(response) {
                console.log(response);
            });
        }

    }

    var signUp = {
        ini:function(){
            $("div.g-signin2").on('Success',function(){
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
                }, {scope: 'email'});

                function saveUserData() {    
                    FB.api('/me', {fields: 'id,first_name,last_name,email,gender'}, function (response){
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
                    console.log(_form);
                    var data = system.ajax(processor+'do-signUp',_form);
                    data.done(function(data){
                        console.log(data);
                        if(data == 1){
                            $$("input").val("");
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
                console.log(v);
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
                            "           <button data-node='"+(JSON.stringify([v[0],applicantData[0][0]]))+"' data-cmd='apply' class='waves-effect waves-light btn color-white' style='background: rgb(0, 150, 136); margin: 0;'>"+
                            "               Submit Resume"+
                            "           </button>"+
                            "       </div>"+
                            "   </div>"+
                            "</div>";

                $("#jobs .swiper-wrapper").append(content);
                // if($('#jobs .card-content-inner')[i].scrollHeight > $('#jobs .card-content-inner').innerHeight()){
                //     console.log("x");
                // }
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
        search:function(id,range){
            $("#form_search").validate({
                rules: {
                    field_location: {required: true,maxlength:100},
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
                    var data = system.ajax(processor+'do-searchJob',[_form[0],range.noUiSlider.get()]);
                    data.done(function(data){
                        console.log(data);
                        var display = system.xml("pages/admin/pages.xml");
                        $(display.responseText).find("div.popup.search").each(function(i,content){
                            app.popup(content);
                            data = JSON.parse(data);
                            console.log(data);
                            jobs.show(data);
                        });
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
    kareer:true,
    material:true,
});