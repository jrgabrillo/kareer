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
        	// var deviceSize = system.getDeviceSize();
        	// console.log(deviceSize);
            logIn.ini();
        	signUp.ini();
        	// content.ini();
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

			$("#index img.responsive-img").attr({"src":"img/profile/"+data[18]});
			var content = "<div class='content-block'>"+
							"    <p class='color-gray'><h5>"+data[6]+" "+data[7]+"</h5></p>"+
                            // "    <a data-cmd='account-logout' class='btn-floating btn-flat'>"+
                            // "      <i class='f7-icons color grey'>logout</i>"+
                            // "    </a>"+
							"</div>"+
							"<div class='content-block'>"+
							"    <div class='row'>"+
							"        <div class='col-33'>"+
							"            <a data-load='account'  class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>list_fill</i></a><strong class='grey-text'>ACCOUNT</strong>"+
							"        </div>"+
							"        <div class='col-33'>"+
							"            <a data-load='career' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>briefcase_fill</i></a><strong class='grey-text'>CAREER</strong>"+
							"        </div>"+
							"        <div class='col-33'>"+
							"            <a data-load='academic' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>folder_fill</i></a><strong class='grey-text'>ACADEMIC</strong>"+
							"        </div>"+
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

            app.onPageInit('account',function(page){
                console.log('page');
                var applicantData = JSON.parse(localStorage.getItem('applicant'));
                var data = account.get(applicantData[0][0]);
                account.account(data);
                account.edit(data);
                account.show(data);
            });

            app.onPageInit('career',function(page){
                console.log('page');
                career.ini();
            });

            var picture = "img/profile/"+data[18];
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
        account:function(data){
            $$("#display_givenName strong").html(data[6]);
            $$("#display_givenName a").attr({"data-value":data[6]});
            $$("#display_givenName a").attr({"data-node":data[0]});
            $$("#display_middleName strong").html(data[8]);
            $$("#display_middleName a").attr({"data-value":data[8]});
            $$("#display_middleName a").attr({"data-node":data[0]});
            $$("#display_lastName strong").html(data[7]);
            $$("#display_lastName a").attr({"data-value":data[7]});
            $$("#display_lastName a").attr({"data-node":data[0]});
            $$("#display_gender strong").html(data[9]);
            $$("#display_gender a").attr({"data-value":data[9]});
            $$("#display_gender a").attr({"data-node":data[0]});
            $$("#display_dateOfBirth strong").html(data[10]);
            $$("#display_dateOfBirth a").attr({"data-value":data[10]});
            $$("#display_dateOfBirth a").attr({"data-node":data[0]});
            $$("#display_placeOfBirth strong").html(data[11]);
            $$("#display_placeOfBirth a").attr({"data-value":data[11]});
            $$("#display_placeOfBirth a").attr({"data-node":data[0]});
            $$("#display_address strong").html(data[12]);
            $$("#display_address a").attr({"data-value":data[12]});
            $$("#display_address a").attr({"data-node":data[0]});
            $$("#display_citizenship strong").html(data[13]);
            $$("#display_citizenship a").attr({"data-value":data[13]});
            $$("#display_citizenship a").attr({"data-node":data[0]});
            $$("#display_weight strong").html(data[15]);
            $$("#display_weight a").attr({"data-value":data[15]});
            $$("#display_weight a").attr({"data-node":data[0]});
            $$("#display_height strong").html(data[14]);
            $$("#display_height a").attr({"data-value":data[14]});
            $$("#display_height a").attr({"data-node":data[0]});
            $$("#display_mother strong").html(data[16]);
            $$("#display_mother a").attr({"data-value":data[16]});
            $$("#display_mother a").attr({"data-node":data[0]});
            $$("#display_father strong").html(data[17]);
            $$("#display_father a").attr({"data-value":data[17]});
            $$("#display_father a").attr({"data-node":data[0]});
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
                console.log(data);
            });
        },
        edit:function(data){
            $("a[data-cmd='edit']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                if(data.prop == "GivenName"){
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                <div class='input-field'>"+
                                    "                    <input type='text' id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"' class='form-control black-text'>"+
                                    "                    <label class='black-text-text' for='field_"+data.prop+"'></label>"+
                                    "                </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);               
                    $("#form_edit").validate({
                        rules: {
                            field_GivenName: {required: true,maxlength:100}
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
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popover-edit', true);
                                        var newdata = account.get(id);
                                        account.account(newdata);
                                        account.edit(newdata);
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
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                <div class='input-field'>"+
                                    "                    <input type='text' id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"' class='form-control black-text'>"+
                                    "                    <label class='black-text-text' for='field_"+data.prop+"'></label>"+
                                    "                </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);             
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
                            field_email: {
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
                                        app.closeModal('.popover-edit', true);
                                        var newdata = account.get(id);
                                        account.account(newdata);
                                        account.edit(newdata);
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
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                <div class='input-field'>"+
                                    "                    <input type='text' id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"' class='form-control black-text'>"+
                                    "                    <label class='black-text-text' for='field_"+data.prop+"'></label>"+
                                    "                </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);               
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
                            field_email: {
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
                                        app.closeModal('.popover-edit', true);
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
                else if(data.prop == "Gender"){
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                 <div class='input-field'>"+
                                    "                   <select id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"'>"+
                                    "                     <option value='' disabled selected>Select Gender</option>"+
                                    "                     <option value ='Male'>Male</option>"+
                                    "                     <option value ='Female'>Female</option>"+
                                    "                   </select>"+
                                    "                    <label class='black-text-text' for='field_"+data.prop+"'></label>"+
                                    "                 </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);  
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
                            field_email: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            console.log(_form);
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popover-edit', true);
                                         var newdata = account.get(id);
                                        account.account(newdata);
                                        account.edit(newdata);
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
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                 <label class='active'>Date of Birth</label>"+
                                    "                    <div>"+
                                    "                        <input type='date' id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"' class='form-control' placeholder='From'>"+
                                    "                    </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);           
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
                            field_email: {
                                required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
                                maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
                            },
                        },
                        submitHandler: function (form) {
                            var _form = $(form).serializeArray();
                            console.log(_form);
                            var data = system.ajax(processor+'do-update',[id,_form]);
                            data.done(function(data){
                                console.log(data);
                                if(data != 0){
                                    system.notification("Update","Success. Please wait.",false,2000,true,false,function(){
                                        app.closeModal('.popover-edit', true);
                                         var newdata = account.get(id);
                                        account.account(newdata);
                                        account.edit(newdata);
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
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                <div class='input-field'>"+
                                    "                    <input type='text' id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"' class='form-control black-text'>"+
                                    "                    <label class='black-text-text' for='field_"+data.prop+"'></label>"+
                                    "                </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);             
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
                            field_email: {
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
                                        app.closeModal('.popover-edit', true);
                                         var newdata = account.get(id);
                                        account.account(newdata);
                                        account.edit(newdata);
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
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                <div class='input-field'>"+
                                    "                    <input type='text' id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"' class='form-control black-text'>"+
                                    "                    <label class='black-text-text' for='field_"+data.prop+"'></label>"+
                                    "                </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);             
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
                            field_email: {
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
                                        app.closeModal('.popover-edit', true);
                                         var newdata = account.get(id);
                                        account.account(newdata);
                                        account.edit(newdata);
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
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                <div class='input-field'>"+
                                    "                    <input type='text' id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"' class='form-control black-text'>"+
                                    "                    <label class='black-text-text' for='field_"+data.prop+"'></label>"+
                                    "                </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);             
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
                            field_email: {
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
                                        app.closeModal('.popover-edit', true);
                                         var newdata = account.get(id);
                                        account.account(newdata);
                                        account.edit(newdata);
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
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                <div class='input-field'>"+
                                    "                    <input type='text' id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"' class='form-control black-text'>"+
                                    "                    <label class='black-text-text' for='field_"+data.prop+"'></label>"+
                                    "                </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);             
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
                            field_email: {
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
                                        app.closeModal('.popover-edit', true);
                                         var newdata = account.get(id);
                                        account.account(newdata);
                                        account.edit(newdata);
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
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                <div class='input-field'>"+
                                    "                    <input type='text' id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"' class='form-control black-text'>"+
                                    "                    <label class='black-text-text' for='field_"+data.prop+"'></label>"+
                                    "                </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);             
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
                            field_email: {
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
                                        app.closeModal('.popover-edit', true);
                                        var newdata = account.get(id);
                                        account.account(newdata);
                                        account.edit(newdata);
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
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                <div class='input-field'>"+
                                    "                    <input type='text' id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"' class='form-control black-text'>"+
                                    "                    <label class='black-text-text' for='field_"+data.prop+"'></label>"+
                                    "                </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);             
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
                            field_email: {
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
                                        app.closeModal('.popover-edit', true);
                                        var newdata = account.get(id);
                                        account.account(newdata);
                                        account.edit(newdata);
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
                    var content =   "<form action='' method='POST' id='form_edit'>"+
                                    "    <div class='list-block'>"+
                                    "        <ul>"+
                                    "            <li>"+
                                    "                <div class='input-field'>"+
                                    "                    <input type='text' id='field_"+data.prop+"' value ='"+data.value+"' name='field_"+data.prop+"' class='form-control black-text'>"+
                                    "                    <label class='black-text-text' for='field_"+data.prop+"'></label>"+
                                    "                </div>"+
                                    "            </li>"+
                                    "            <li>"+
                                    "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                    "                <button type ='submit' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Save</button>"+
                                    "            </li>"+
                                    "        </ul>"+
                                    "    </div>"+
                                    "</form> ";
                    $("#editPopover").html(content);             
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
                            field_email: {
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
                                        app.closeModal('.popover-edit', true);
                                        var newdata = account.get(id);
                                        account.account(newdata);
                                        account.edit(newdata);
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

    var career = {
        ini:function(){
            console.log("xx");
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = career.get(applicantData[0][0]);
            $$("a[data-cmd='add-career']").on('click',function(){
                career.add(applicantData[0][0]);
            });
            career.show(list);
            career.delete(list);
        },
        add:function(id){
            var data = system.xml("pages/admin/pages.xml");
            $(data.responseText).find("div.popup.career").each(function(i,content){
                app.popup(content);

                $("#form_career").validate({
                    rules: {
                        field_dateFirst: {required: true,maxlength:20},
                        field_dateLast: {required: true,maxlength:20},
                        field_position: {required: true,maxlength:100},
                        field_agency: {required: true,maxlength:100},
                        field_salary: {required: true,maxlength:100},
                        field_appointment: {required: true,maxlength:100},
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
                                    app.closeModal('.career', true);
                                    career.ini();
                                });
                            }
                            else{
                                system.notification("Kareer","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                }); 
            });
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
            console.log(list);
            var content = "";
            $.each(list,function(i,v){
                content += "<li class='collection-item'>"+
                            "   <a class='secondary-content right btn btn-floating btn-flat open-popover waves-effect waves-teal waves-light' href='#' data-cmd='delete' data-node='"+v[0]+"' data-popover='.popover-delete'><i class='icon f7-icons color-teal'>close_round</i></a>"+
                            "   <span class='title color-teal'><strong class ='color-black'>"+v[4]+"</strong></span>"+
                            "   <div class ='color-teal'class ='color-teal'>Inclusive Date: <strong class ='color-black'>"+v[2]+" - "+v[3]+"</strong></div>"+
                            "   <div class ='color-teal'>Agency: <strong class ='color-black'>"+v[5]+"</strong></div>"+
                            "   <div class ='color-teal'>Salary: <strong class ='color-black'>"+v[6]+"</strong></div>"+
                            "   <div class ='color-teal'>Status: <strong class ='color-black'>"+v[7]+"</strong></div>"+
                            "</li>";
            });
            $$("#display_career").html("<ul class='collection'>"+content+"</ul");
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
                                    career.ini();
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

    var academic = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = academic.get(applicantData[0][0]);
            $$("a[data-cmd='add-career']").on('click',function(){
                academic.add(applicantData[0][0]);
            });
            academic.show(list);
            academic.delete(list);
        },
        add:function(id){
            var data = system.xml("pages/admin/pages.xml");
            $(data.responseText).find("div.popup.academic").each(function(i,content){
                app.popup(content);
                $('select').material_select();
                $("#form_academic").validate({
                    rules: {
                        field_yearLevel: {required: true,maxlength:20},
                        field_school: {required: true,maxlength:100},
                        field_degree: {required: true,maxlength:100},
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
                                    app.closeModal('.academic', true);
                                    academic.ini();
                                });
                            }
                            else{
                                system.notification("Kareer","Failed.",false,3000,true,false,false);
                            }
                        })
                    }
                }); 
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
                content += "<li class='collection-item'>"+
                            "   <a class='secondary-content right btn btn-floating btn-flat open-popover waves-effect waves-teal waves-light' href='#' data-cmd='delete' data-node='"+v[0]+"' data-popover='.popover-delete'><i class='icon f7-icons color-teal'>close_round</i></a>"+
                            "   <span class='title color-teal'><strong class ='color-black'>"+v[2]+"</strong></span>"+
                            "   <div class ='color-teal'class ='color-teal'>Name of School: <strong class ='color-black'>"+v[3]+"</strong></div>"+
                            "   <div class ='color-teal'>Degree: <strong class ='color-black'>"+v[4]+"</strong></div>"+
                            "   <div class ='color-teal'>Units Earned: <strong class ='color-black'>"+v[6]+"</strong></div>"+
                            "   <div class ='color-teal'>Period of Attendance: <strong class ='color-black'>"+v[5]+"</strong></div>"+
                            "   <div class ='color-teal'>Year Graduated: <strong class ='color-black'>"+v[7]+"</strong></div>"+
                            "</li>";
            });
            $$("#display_academic").html("<ul class='collection'>"+content+"</ul");
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

    var logIn = {
    	ini:function(){
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

    var signUp = {
        ini:function(){
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
            });  //CED pop-up error in info(icon)
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
                    console.log(career.responseText);
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
                            "               <p>"+
                            "                   <div class='description' style='white-space: normal;'>"+
                            "                       "+v[4]+""+
                            "                   </div>"+
                            "               </p>"+
                            "           </div>"+
                            "       </div>"+
                            "       <div class='card-footer'>"+
                            "           <a class='waves-effect waves-teal btn-flat hidden' href='#'>Read More</a>"+
                            "           <button data-node='"+(JSON.stringify([v[0],applicantData[0][0]]))+"' data-cmd='apply' class='waves-effect waves-light btn btn-floating icon f7-icons color-white' style='background: rgb(0, 150, 136); margin: 0;'>"+
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