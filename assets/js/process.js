var system = function(){
	"use strict";
	return {
		ini:function(){
			$("body").append("<script>console.log('%cDeveloped By: RNR Digital Consultancy (2017) http://rnrdigitalconsultancy.com ,,|,_', 'background:#f74356;color:#64c2ec;font-size:20px;')</script>");
			$(document).ready(function(){
			    $('.tooltipped').tooltip({delay: 50});
			});
			setTimeout(function(){
				system.loading(true);
				$('#content-login').addClass('animated slideInUp');
			},1000);
		},
		ajax:function(url,data){
	        return $.ajax({
		        type: "POST",
		        url: url,
		        data: {data: data},
		        async: !1,
		        cache:false,
		        error: function(e) {
		        	console.log(e.responseText);
		            console.log("Error occured")
		        }
		    });
		},
		html:function(url){
	        return $.ajax({
		        type: "POST",
		        url: url,
                dataType: 'html',
		        async: !1,
		        cache:false,
		        error: function(e) {
		        	console.log(e.responseText);
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
		send_mail:function(email,subject,message){
			return system.ajax('../assets/harmony/Process.php?send-mail',[email,subject,message]);
		},
		loading: function(_switch){
			if(_switch){ // show loader
				$('#loader-wrapper').addClass('animated zoomOut');
				setTimeout(function(){
					$("#loader-wrapper").addClass("hide-on-med-and-up hide-on-med-and-down");
				},1000);
			}
			else{
				setTimeout(function(){
					$("#loader-wrapper").removeClass("hide-on-med-and-up hide-on-med-and-down");
				},1000);
				$("#loader-wrapper").removeClass("zoomOut");
				$('#loader-wrapper').addClass('animated zoomIn');
			}
		},
		loader: function(_switch){
			if(_switch){ // show loader
				$(".progress").removeClass("hide-on-med-and-up hide-on-med-and-down");
				console.log('x');
			}
			else{
				$(".progress").addClass("hide-on-med-and-up hide-on-med-and-down");
				console.log('x');
			}
		},
		preloader:function(div){
			var data = system.xml("pages.xml");
			$(data.responseText).find("loader").each(function(i,content){
				$(div).html(content);
			});
		},
		block:function(status){
			if(status){
				$("#block-control").addClass('block-content')
			}
			else{
				$("#block-control").removeClass('block-content')
			}
		},
		clearForm:function(){
			$("form").find('input:text, input:password, input:file, select, textarea').val('');
			$("form").find('error').html('');
			$("form").find('input:text, input:password, input:file, select, textarea').removeClass("valid");
		    $("form").find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
		},
        searchJSON: function(obj, key, val) {
		    var objects = [];
		    for (var i in obj) {
		        if (!obj.hasOwnProperty(i)) continue;
		        if (typeof obj[i] == 'object') {
		            objects = objects.concat(this.searchJSON(obj[i], key, val));
		        } else if (i == key && obj[key] == val) {
		            objects.push(obj);
		        }
		    }
		    return objects;
		},
 		forceLogout:function(_function){ //300000
			$(document).idle({
				onIdle: function(){
					Materialize.toast('Force log out initiated.',1000,'',function(){
						_function();						
					});
				},
				idle: 3000000
			});
		},
		random:function(min,max){
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		quill:function(element){
			let option = {
					modules: {
						toolbar:[
							['bold', 'italic', 'underline', 'strike'],       
							['blockquote', 'code-block'],
							[{ 'header': 1 }, { 'header': 2 }],             
							[{ 'list': 'ordered'}, { 'list': 'bullet' }],
							[{ 'script': 'sub'}, { 'script': 'super' }],      
							[{ 'indent': '-1'}, { 'indent': '+1' }],          
							[{ 'direction': 'rtl' }],                         
							[{ 'size': ['small', false, 'large', 'huge'] }], 
							[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
							[{ 'color': [] }, { 'background': [] }],         
							[{ 'font': [] }],
							[{ 'align': [] }],
							['clean']                                         
						],
					},
					placeholder: 'Description',
					theme: 'snow'
			};
	    	let editor = new Quill(element,option);
	    	return editor;
		},		
        encrypt:function(message){
			var secret = system.html('assets/harmony/Process.php?auth');
	        return CryptoJS.AES.encrypt(message,secret.responseText).toString();
        },
        read:function(message){
			var secret = system.html('assets/harmony/Process.php?auth');
        	let word = CryptoJS.AES.decrypt(message, secret.responseText);
	        return word.toString(CryptoJS.enc.Utf8);
        },
        alert:function(message,callback){
			Materialize.toast(message,2000);
			setTimeout(function(){
				callback();
			},2000)
        }
	}
}();

recover = {
	ini:function(){
		this.sendCode();
	},
	sendCode:function(){
		let node = (window.location.hash != "#employee")?"login.html":"index.html";
		console.log(node);

		$("#display_cardTitle").html('Enter your email to recover your account');
		$("#display_form").html(`<form id="form_forgot" method="get" action="" novalidate="novalidate">
                                    <div class="row">
                                        <div class="input-field col s12 m12 l12">
                                            <input id="field_email" name="field_email" type="text" data-error=".error_field_email">
                                            <label for="field_email" class="center-align">Email</label>  
                                            <div class="error_field_email"></div>  
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12 m12 l12">
                                            <button class="btn waves-effect waves-light col s12 pink" type='submit'>Recover password</button>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12 m6 l6">
                                            <p class="margin medium-small"><a data-cmd='redirect'>Enter recovery code</a></p>
                                        </div>          
                                        <div class="input-field col s12 m6 l6">
                                            <p class="margin right-align medium-small"><a href="${node}">Back to login page</a></p>
                                        </div>          
                                    </div>
                                </form>`);

	    $("#form_forgot").validate({
	        rules: {
	            field_email: {required: true,maxlength: 100},
	        },
	        errorElement : 'div',
	        errorPlacement: function(error, element) {
				let placement = $(element).data('error');
				if(placement){
					$(placement).append(error)
				} 
				else{
					error.insertAfter(element);
				}
			},
			submitHandler: function (form) {
				let _form = $(form).serializeArray();
				let data = system.ajax('assets/harmony/Process.php?validateEmail',_form[0]['value']);
				data.done(function(data){
					if(data == 1){
						let codeData = system.ajax('assets/harmony/Process.php?email-code',_form[0]['value']);
						codeData.done(function(data){
							Materialize.toast('Recovery code is sent.',4000);
							recover.validateCode();
						});
					}
					else{
						Materialize.toast(`Email doesn't belong to someone else.`,4000);
					}
				});
	        }
		});

		$("a[data-cmd='redirect']").on('click',function(){
			recover.validateCode();
		});
	},
	validateCode:function(){
		$("#display_cardTitle").html('Check your email for the recovery code.');
		$("#display_form").html(`<form id="form_code" method="get" action="" novalidate="novalidate">
                                    <div class="row">
                                        <div class="input-field col s12 m12 l12">
                                            <input id="field_recoveryCode" name="field_recoveryCode" type="text" data-error=".error_field_recoveryCode">
                                            <label for="field_recoveryCode" class="center-align">Recovery Code</label>  
                                            <div class="error_field_recoveryCode"></div>  
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12 m12 l12">
                                            <button class="btn waves-effect waves-light col s12 pink" type='submit'>Recover password</button>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12 m6 l6">
                                        </div>          
                                        <div class="input-field col s12 m6 l6">
                                            <p class="margin right-align medium-small"><a href="login.html">Back to login page</a></p>
                                        </div>          
                                    </div>
                                </form>`);

	    $("#form_code").validate({
	        rules: {
	            field_recoveryCode: {required: true,maxlength: 100},
	        },
	        errorElement : 'div',
	        errorPlacement: function(error, element) {
				let placement = $(element).data('error');
				if(placement){
					$(placement).append(error)
				} 
				else{
					error.insertAfter(element);
				}
			},
			submitHandler: function (form) {
				let _form = $(form).serializeArray();
				let data = system.ajax('assets/harmony/Process.php?validate-code',_form[0]['value']);
				data.done(function(data){
					console.log(data);
					if(data[0] == 1){
						recover.final(_form[0]['value']);
					}
					else{
						Materialize.toast(`Code is incorrect.`,4000);
					}
				});
	        }
		}); 
	},
	final:function(code){
		$("#display_cardTitle").html('Enter your new password.');
		$("#display_form").html(`<form id="form_recover" method="get" action="" novalidate="novalidate">
                                    <div class="row">
                                        <div class="input-field col s12 m12 l12">
                                            <input id="field_newPassword" name="field_newPassword" type="password" data-error=".error_field_newPassword" value="">
                                            <label for="field_newPassword" class="center-align">New Password</label>  
                                            <div class="error_field_newPassword"></div>  
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12 m12 l12">
                                            <input id="field_rePassword" name="field_rePassword" type="password" data-error=".error_field_rePassword" value="">
                                            <label for="field_rePassword" class="center-align">Confirm Password</label>  
                                            <div class="error_field_rePassword"></div>  
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12 m12 l12">
                                            <button class="btn waves-effect waves-light col s12 pink" type='submit'>Recover password</button>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12 m12 l12">
											Password must contain atleast 1 number, 1 uppercase letter, 1 lowercare letter, 1 special character* and 6 character length. <br/>
											<u>Special characters are ! @ $ % *</u>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12 m6 l6">
                                            <p class="margin medium-small"><a href="recover.html">Resend code?</a></p>
                                        </div>          
                                        <div class="input-field col s12 m6 l6">
                                            <p class="margin right-align medium-small"><a href="login.html">Back to login page</a></p>
                                        </div>          
                                    </div>
                                </form>`);

	    $("#form_recover").validate({
	        rules: {
	            field_newPassword: {required: true,maxlength: 100,checkPassword:true},
	            field_rePassword: {required: true,maxlength: 100,checkPassword:true},
	        },
	        errorElement : 'div',
	        errorPlacement: function(error, element) {
				let placement = $(element).data('error');
				if(placement){
					$(placement).append(error)
				} 
				else{
					error.insertAfter(element);
				}
			},
			submitHandler: function (form) {
				let _form = $(form).serializeArray();
				console.log(_form);

				if(_form[0]['value'] === _form[1]['value']){
					let data = system.ajax('assets/harmony/Process.php?recover-password',[_form[0]['value'],code]);
					data.done(function(data){
						console.log(data);
						if(data[0] == 1){
							Materialize.toast(`Success! Account has been recovered.`,4000);
							$(location).attr('href',`login.html`);
						}
						else{
							Materialize.toast(`Please try again later.`,4000);
						}
					});
				}
				else{
					Materialize.toast(`Passwords doesn't match.`,4000);
				}
	        }
		}); 
	},
}