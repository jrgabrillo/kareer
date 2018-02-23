account = {
	confirm:function(){
		login.page()
		$("body").append("<script>console.log('%cDeveloped By: RNR Digital Consultancy (2017) http://rnrdigitalconsultancy.com ,,|,_', 'background:#f74356;color:#64c2ec;font-size:20px;')</script>");
		setTimeout(function(){
			system.loading(true);
			$('#content-login').addClass('animated slideInUp');
		},1000);

        $('#field_dob').formatter({
            'pattern': '{{99}}/{{99}}/{{9999}}',
            'persistent': true
        });

		$("#showPassword").on("click",function(){
			if($(this).is(':checked')){
				$("#field_password").attr({"type":"text"});						
			}
			else{
				$("#field_password").attr({"type":"password"});						
			}
		})

	    var hash = window.location.hash;
	    hash = hash.split('&');
	    var id = hash[0];
	    id = id.split('#');
        account.signUp(id[1]);
        account.validateConfirmation(id[1]);
        $("#field_employee_id").val(hash[1]);
	},
	signUp:function(id){
		$("#form_signup").validate({
		    rules: {
		        field_gname: {required: true,maxlength: 50},
		        field_mname: {required: true,maxlength: 50},
		        field_fname: {required: true,maxlength: 50},
		        field_nickname: {required: true,maxlength: 50},
		        field_dob: {required: true,maxlength: 50,checkDate:true},
		        field_gender: {required: true,maxlength: 50},
		        field_address: {required: true,maxlength: 100},
		        field_phone: {required: true,maxlength: 50},
		        field_password: {required: true,maxlength: 50,checkPassword:true,validatePassword:true},
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
				var data = system.ajax('../assets/harmony/Process.php?set-confirmEmployeeAccount',[_form,id]);
				data.done(function(data){
					// console.log(data);
					if(data == 1){
						Materialize.toast('Sign up success!.',1000,'',function(){
					    	$(location).attr('href','../');			
						});
					}
					else{
						Materialize.toast('Cannot process request.',4000);
					}
				});
		    }
		});
	},
	validateConfirmation:function(id){
		// console.log(id);
		var data = system.ajax('../assets/harmony/Process.php?get-validateConfirmStatus',id);
		data.done(function(data){
			// console.log(data);
			if(data == 0){
		    	$(location).attr('href','../');			
			}
		})
	},
}
