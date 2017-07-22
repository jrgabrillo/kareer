var main = function () {
	"use strict";
	return {
		login:function(){
		    $("#form_login").validate({
		        rules: {
		            field_email: {required: true,maxlength: 100},
		            field_password: {required: true,maxlength: 50},
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
					var data = system.ajax('assets/harmony/Process.php?login',_form);
					data.done(function(data){
                        var access = main.check_access();
						if(data == 1){
                            access = JSON.parse(access);
                            console.log();
                            localStorage.setItem("hash",access[2]);
							Materialize.toast('Success.',1000,'',function(){
						    	$(location).attr('href','account/');
							});
						}
						else{
							$("#dsplay_login").addClass('jello');
							Materialize.toast('Failed.',1000,'',function(){
								$("#dsplay_login").removeClass('jello');
							});
						}
					});
		        }
			}); 
		},
        jobPosting:function(){
			var data = system.html('assets/harmony/Process.php?get-jobsPosts');
			data.done(function(data){
				data = JSON.parse(data);
				var count = 0;
				var feed = setInterval(function(){
					main.postJobs(data[count]);
					count++;
					if(count >= 5){
						clearInterval(feed);
					}
				},500);
			});
        },
        postJobs:function(data){
        	var content = "";
        	if(data[5] != "null"){      		
	        	var skills = JSON.parse(data[5]);
	        	if(skills.length>0){
	        		$.each(skills,function(i,v){
	        			content += "<div class='chip'>"+v+"</div>";
	        		})
	        	}
        	}
        	var content = "<li class='collection-item avatar animated fadeInUp'>"+
							"    <i class='material-icons circle purple'>grade</i>"+
							"    <span class='title'>"+data[4]+"</span>"+
							"    <p>"+data[2]+"</p>"+
							content+
							"    <a href='#!' class='secondary-content'>Apply</a>"+
							"</li>";
			$("#display_jobposts").append(content);
        },
        check_access:function(){
            var result = "";
            var ajax = system.html('assets/harmony/Process.php?get-session');
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

// // do not delete
// console.log('%cDeveloped By: RNR DIGITAL CONSULTANCY (2017)', 'background:#000;color:#ccc;');

// Framework7.prototype.plugins.main = function (app, params) {
//     'use strict';
//     if (!params) return;
//     var self = this;
//     var app = new Framework7({material: true});          
//     var $$ = Dom7;
//     var processor = '../kareer/assets/harmony/mobile.php?';
//     var directory = '/';

//     var swiper = app.swiper('.swiper-container', {
//         speed: 400,
//         spaceBetween: 100,
//         direction: 'vertical'
//     });

//     var init = function(){
//         signUp();
//         logIn();
//         personalInfo();
//         academicInfo();
//         careerInfo();        
//     }

//     var signUp = function(){ //[CED] validation
//         $("#form_signUp").validate({
//             rules: {
//                 field_name: {required: true, maxlength:50},
//                 field_email: {required: true, maxlength: 50,email:true},
//                 field_password: {required: true, maxlength: 50,checkPassword:true},
//             },
//             errorElement : 'div',
//             errorPlacement: function(error, element) { 
//                 var placement = $(element).data('error');
//                 if(placement){
//                     $(placement).append(error);
//                 } 
//                 else{
//                     error.insertAfter(element);
//                 }
//             },
//             //[CED] error messages for filling up the fields
//             messages: {
//                 field_name: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_email: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     email: "<i data-error ='Email is invalid' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_password: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     checkPassword: "<i data-error ='Password is weak' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//             },
//             submitHandler: function (form) {
//                 var _form = $(form).serializeArray();
//                 var data = ajax(processor+'do-signUp',_form);
//                	data.done(function(data){
//                		if(data == 1){
// 		                notification("k12","Success",false,3000,true,function(){},false);
//                		}
//                		else{
// 		                notification("k12","Failed.",false,3000,true,function(){},false);
//                		}
//                	})
//             }
//         });  //CED pop-up error in info(icon)
//         $$(".error-icon").on('click',function(){
//             var data= $(this).find('i');
//             notification("k12",data[0].dataset.error,false,3000,true,function(){},false);
//         });
//     }

//     var logIn = function(){
//         $("#form_logIn").validate({
//             rules: {
//                 field_email: {required: true,email:true},
//                 field_password: {required: true,checkPassword:true},
//             },
//             errorElement : 'div',
//             errorPlacement: function(error, element) {
//                 var placement = $(element).data('error');
//                 if(placement){
//                     $(placement).append(error)
//                 } 
//                 else{
//                     error.insertAfter(element);
//                 }
//             },
//             messages: {
//                 field_email: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons  color red' style='margin:5px;'>info</i>",
//                     email: "<i data-error ='Email is invalid' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_password: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     checkPassword: "<i data-error ='Incorrect password' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//             },
//             submitHandler: function (form) {
//                 var _form = $(form).serializeArray();
//                 var data = ajax(processor+'do-logIn',_form);
//                	data.done(function(data){
//                		if(data == 1){
// 		                notification("k12","Success",false,3000,true,function(){},false);
//                		}
//                		else{
// 		                notification("k12","Failed.",false,3000,true,function(){},false);
//                		}
//                	})
//             }
//         }); 
//         $$(".log-error-icon").on('click',function(){
//             var data= $(this).find('i');
//             notification("k12",data[0].dataset.error,false,3000,true,function(){
//             },false);
//         });
//     }

//     var personalInfo = function(){ //[CED] validation
//         $("#form_personal_info").validate({
//             rules: {
//                 field_last_name: {required: true, maxlength:50},
//                 field_given_name: {required: true, maxlength:50},
//                 field_middle_name: {required: true, maxlength:50},
//                 field_gender: {required: true, maxlength:50},
//                 field_date_of_birth: {required: true, maxlength:50},
//                 field_place_of_birth: {required: true, maxlength:50},
//                 field_permanent_address: {required: true, maxlength:50},
//                 field_citizenship: {required: true, maxlength:50},
//                 field_height: {required: true, maxlength:50},
//                 field_weight: {required: true, maxlength:50},
//                 field_mother_name: {required: true, maxlength:50},
//                 field_father_name: {required: true, maxlength:50},
//             },
//             errorElement : 'div',
//             errorPlacement: function(error, element) { 
//                 var placement = $(element).data('error');
//                 if(placement){
//                     $(placement).append(error);
//                 } 
//                 else{
//                     error.insertAfter(element);
//                 }

//             },  //[CED] error messages for filling up the fields
//             messages: {
//                 field_last_name: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_given_name: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_middle_name: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_gender: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_date_of_birth: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_permanent_address: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_citizenship: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_height: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_weight: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_mother_name: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//                 field_father_name: {
//                     required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                     maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//                 },
//             },
//             submitHandler: function (form) {
//                 var _form = $(form).serializeArray();
//                 var data = ajax(processor+'do-personal-info',_form);
//                	data.done(function(data){
//                		if(data == 1){
// 		                notification("k12","Success",false,3000,true,function(){},false);
//                		}
//                		else{
// 		                notification("k12","Failed.",false,3000,true,function(){},false);
//                		}
//                	})
//             }
//         });  //CED pop-up error in info(icon)
//         $$(".error-icon").on('click',function(){
//             var data= $(this).find('i');
//             notification("k12",data[0].dataset.error,false,3000,true,function(){
//             },false);
//         });
//     }

//     var academicInfo = function(){
//         //[CED] validation
//         // $("#form_academic_info").validate({
//         //     rules: {
//         //         field_level: {required: true, maxlength:50},
//         //         field_school_attended: {required: true, maxlength:50},
//         //         field_degree: {required: true, maxlength:50},
//         //         field_period_attended: {required: true, maxlength:50},
//         //     },
//         //     errorElement : 'div',
//         //     errorPlacement: function(error, element) { 
//         //         var placement = $(element).data('error');
//         //         if(placement){
//         //             $(placement).append(error);
//         //             console.log('cedsss');
//         //         } 
//         //         else{
//         //             error.insertAfter(element);
//         //         }

//         //     },
//         //     //[CED] error messages for filling up the fields
//         //     messages: {
//         //         field_level: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },
//         //         field_school_attended: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },
//         //         field_degree: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },
//         //         field_period_attended: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },             
//         //     },

//         //     submitHandler: function (form) {
//         //         var _form = $(form).serializeArray();
//         //         var academic = ajax(processor+'do-academic-info',_form);
//         //         console.log(academic.responseText);
//         //         notification("k12","Success",false,3000,true,function(){
//         //         },false);
//         //         console.log('ced');
//         //     }
//         // }); 
//         // //CED pop-up error in info(icon)
//         // $$(".error-icon").on('click',function(){
//         //     var data= $(this).find('i');
//         //     notification("k12",data[0].dataset.error,false,3000,true,function(){
//         //     },false);
//         // });

//          $$("button[data-cmd='button_academic']").on('click',function(){
//             var _form = $('#form_academic_info').serializeArray();
//             var data = ajax(processor+'do-academic-info',_form);
//            	data.done(function(data){
//            		if(data == 1){
// 	                notification("k12","Success",false,3000,true,function(){},false);
//            		}
//            		else{
// 	                notification("k12","Failed.",false,3000,true,function(){},false);
//            		}
//            	})
//         });
//     }

//     var careerInfo = function(){
//         // [CED] validation
//         // $("#form_career_info").validate({
//         //     rules: {
//         //         field_id: {required: true, maxlength:50},
//         //         field_applicant_id: {required: true, maxlength:50},
//         //         field_inclusive_dates: {required: true, maxlength:50},
//         //         field_position_title: {required: true, maxlength:50},
//         //         field_agency:  {required: true, maxlength:50},
//         //         field_monthly_salary:  {required: true, maxlength:50},
//         //         field_appointment_status:  {required: true, maxlength:50},
//         //         field_govt_service:  {required: true, maxlength:50},
//         //         field_date:  {required: true, maxlength:50},
//         //     },
//         //     errorElement : 'div',
//         //     errorPlacement: function(error, element) { 
//         //         var placement = $(element).data('error');
//         //         if(placement){
//         //             $(placement).append(error);
//         //             console.log('cedsss');
//         //         } 
//         //         else{
//         //             error.insertAfter(element);
//         //         }

//         //     },
//         //     //[CED] error messages for filling up the fields
//         //     messages: {
//         //         field_id: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },
//         //         field_applicant_id: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },
//         //         field_inclusive_dates: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },
//         //         field_position_title: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },
//         //         field_agency: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },
//         //         field_monthly_salary: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },
//         //         field_appointment_status: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },
//         //         field_govt_service: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },
//         //         field_date: {
//         //             required: "<i data-error ='Field is required' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //             maxlength: "<i data-error ='Name is too long' class='icon f7-icons color red' style='margin:5px;'>info</i>",
//         //         },             
//         //     },

//         //     submitHandler: function (form) {
//         //         var _form = $(form).serializeArray();
//         //         var career = ajax(processor+'do-career-info',_form);
//         //         console.log(career.responseText);
//         //         notification("k12","Success",false,3000,true,function(){
//         //         },false);
//         //     }
//         // }); 
//         // //CED pop-up error in info(icon)
//         // $$(".error-icon").on('click',function(){
//         //     var data= $(this).find('i');
//         //     notification("k12",data[0].dataset.error,false,3000,true,function(){
//         //     },false);
//         // });
//          $$("button[data-cmd='button_career']").on('click',function(){
//             var _form = $('#form_career_info').serializeArray();
//             var data = ajax(processor+'do-career-info',_form);
//            	data.done(function(data){
//            		if(data == 1){
// 	                notification("k12","Success",false,3000,true,function(){},false);
//            		}
//            		else{
// 	                notification("k12","Failed.",false,3000,true,function(){},false);
//            		}
//            	})
//         });
//     }

//     return {
//         hooks: {
//             appInit: function () {
//                 var deviceSize = getDeviceSize();
//                 ini();
//             }
//         }
//     }
// };

// var k12_app = new Framework7({
//     main:true
// });