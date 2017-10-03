// do not delete
console.log('%cDeveloped By: RNR Digital Consultancy (2017)', 'background:#000;color:#ccc;');

Framework7.prototype.plugins.kareer = function (app, params) {
    'use strict';
    if (!params) return;
    var self = this;
    var processor = 'http://localhost/kareer/kareer/assets/harmony/mobile.php?';
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
			jobs.bookmarked(applicantData[0][0]);
			$("#index img.responsive-img").attr({"src":"img/profile/"+applicantData[0][18]});

			var content = "<div class='content-block'>"+
							"    <p class='color-gray'><h5>"+applicantData[0][6]+" "+applicantData[0][7]+"</h5></p>"+
							// "    <p>"+
							// "        <span><strong>Chief Technology Officer</strong> Pangasinan</span>"+
							// "    </p>"+
							"</div>"+
							"<div class='content-block'>"+
							"    <div class='row'>"+
							"        <div class='col-33'>"+
							"            <a data-load='account' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>list</i></a>Account"+
							"        </div>"+
							"        <div class='col-33'>"+
							"            <a data-load='career' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>briefcase</i></a>Career"+
							"        </div>"+
							"        <div class='col-33'>"+
							"            <a data-load='academic' class='account btn-floating btn-large waves-effect waves-light waves-teal grey lighten-4 btn-flat'><i class='icon f7-icons color-gray'>folder</i></a>Academic"+
							"        </div>"+
							"    </div>"+
							"</div>";
			$("#display_account").html(content);

			$("a.account").on('click',function(){
				var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
			});

            app.onPageInit('academic',function(page){
                console.log('page');
                academic.ini();
            });         

            app.onPageInit('account',function(page){
                console.log('page');
                var applicantData = JSON.parse(localStorage.getItem('applicant'));
                var data = account.get(applicantData[0][0]);
                account.account(data);
            });

            app.onPageInit('career',function(page){
                console.log('page');
                career.ini();
            });
		},
        account:function(data){
            $$("#display_givenName").html(data[6]);
            $$("#display_middleName").html(data[8]);
            $$("#display_lastName").html(data[7]);
            $$("#display_gender").html(data[9]);
            $$("#display_dateOfBirth").html(data[10]);
            $$("#display_placeOfBirth").html(data[11]);
            $$("#display_address").html(data[12]);
            $$("#display_citizenship").html(data[13]);
            $$("#display_weight").html(data[15]);
            $$("#display_height").html(data[14]);
            $$("#display_mother").html(data[16]);
            $$("#display_father").html(data[17]);
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-applicant',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
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
                            if(data != 0){
                                $$("input").val("");
                                system.notification("Kareer","Career Added.",false,2000,true,false,function(){
                                    app.closeModal('.career', true);
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
                            "   <a class='secondary-content' href='#!'><i class='icon f7-icons'>close_round</i></a>"+
                            "   <span class='title'><strong>"+v[4]+"</strong></span>"+
                            "   <p>Inclusive Date: "+v[2]+" - "+v[3]+"</p>"+
                            "   <p>Agency: "+v[5]+"</p>"+
                            "   <p>Salary: "+v[6]+"</p>"+
                            "   <p>Status: "+v[7]+"</p>"+
                            "</li>";
            });
            $$("#display_career").html("<ul class='collection'>"+content+"</ul");
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
        },
        add:function(id){
            var data = system.xml("pages/admin/pages.xml");
            $(data.responseText).find("div.popup.academic").each(function(i,content){
                app.popup(content);
                $('select').material_select();
                $("#form_academic").validate({
                    rules: {
                        field_yearLevel: {required: true,maxlength:20},
                        field_school: {required: true,maxlength:20},
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
                        var data = system.ajax(processor+'do-academic',[id,_form]);
                        data.done(function(data){
                            console.log(data);
                            if(data != 0){
                                $$("input").val("");
                                system.notification("Kareer","Academic Added.",false,2000,true,false,function(){
                                    app.closeModal('.academic', true);
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
                            "   <a class='secondary-content' href='#!'><i class='icon f7-icons'>close_round</i></a>"+
                            "   <span class='title'><strong>"+v[2]+"</strong></span>"+
                            "   <p>Name of School: "+v[3]+"</p>"+
                            "   <p>Degree: "+v[4]+"</p>"+
                            "   <p>Units Earned: "+v[6]+"</p>"+
                            "   <p>Period of Attendance: "+v[5]+"</p>"+
                            "   <p>Year Graduated: "+v[7]+"</p>"+
                            "</li>";
            });
            console.log(content);
            $("#display_academic").html("<ul class='collection'>"+content+"</ul");
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
					        	content.ini();
					        	localStorage.setItem('applicant',data);
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
                    field_last_name: {required: true, maxlength:50},
                    field_given_name: {required: true, maxlength:50},
                    field_middle_name: {required: true, maxlength:50},
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
            		skills += "<div class='chip'><div class='chip-media bg-teal'>J</div><div class='chip-label'>"+v2+"</div></div>";
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