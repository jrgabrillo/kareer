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
			login.ini();
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
		errorNotification:function(title,message){
			toastr.options = {
			  "progressBar": true,
			  "positionClass": "toast-top-left",
			  "preventDuplicates": true,
			  "onclick": null,
			  "showDuration": "100",
			  "hideDuration": "100",
			  "timeOut": "3000",
			  "extendedTimeOut": "3000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}					
            toastr.error(message,title)
		},	
		successNotification:function(title,message){
			toastr.options = {
			  "progressBar": true,
			  "positionClass": "toast-top-left",
			  "preventDuplicates": true,
			  "onclick": null,
			  "showDuration": "100",
			  "hideDuration": "100",
			  "timeOut": "3000",
			  "extendedTimeOut": "3000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}					
            toastr.success(message,title)
		},
		modal:function(title, body){
        	$("#modal").modal('open');
        	$("#modal.modal-title").html(title);
        	$("#modal.modal-body").html(body);
        },
        close_modal: function(){ 
        	$("#modal").modal('close');
        	$(".modal-backdrop").addClass('hidden');
        },
        confim: function(title, callback) {
			swal({
		        title: title,
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: "#DD6B55",
		        confirmButtonText: "Confirm",
		        animation:false,
		        closeOnConfirm: false
		    }, 
		    function () {
				callback();
		    });		
		},
		html:function(url){
	        return $.ajax({
		        type: "POST",
		        url: url,
                dataType: 'html',
		        data: {data: "kareer"},
		        async: !1,
		        cache:false,
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
		get_account: function(){
			var ajax = system.ajax('../assets/harmony/Process.php?get-account',"");
			return ajax.responseText;
		},
		get_apr:function(image){
			var ajax = system.ajax('../assets/img/'+image,'');
			return ajax.responseText;
		},
		get_aprhome:function(image){
			var ajax = system.ajax(image,'');
			return ajax.responseText;
		},
		send_mail:function(email,subject,message,callback){
			return system.ajax('../assets/harmony/Process.php?send-mail',[email,subject,message]);
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
		froala:function(element){
		    $(function() {
				$(element).froalaEditor({
					toolbarButtons:['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
					quickInsertButtons: ['table', 'ol', 'ul', 'hr']
				});
		    });
		},
		StringCounter:function(input,id,allowed){
		    var a = allowed-input.length;
		    if(a >= 0 && a <= 1){
		        id.html(a+" character remaining");
		    }
		    else if(a == -1){
		        id.html(-1*a+" character exceeded");
		    }
		    else if(a <= -2){
		        id.html(-1*a+" characters exceeded");
		    }
		    else{
		        id.html(a+" characters remaining");
		    }
		},
		forceLogout:function(_function){ //300000
			$(document).idle({
				onIdle: function(){
					Materialize.toast('Force log out initiated.',1000,'',function(){
						_function();						
					});
				},
				idle: 300000
			});
		},
        sortResults : function (data,prop, asc) {
            data = data.sort(function(a, b) {
                if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            });
            return data;
        },
        deactivate:function(){
			$("a[data-cmd='deactivateEmployer']").on('click',function(){
			var id = $(this).data('node');
			var content = "Are you sure DEACTIVATE "+$(this).data('name')+"'s account?<br/>"+
						  "<label for='field_description'>Remarks: </label>"+
						  "<textarea class='materialize-textarea' data-field='field_description' name='field_description'></textarea>";
			$("#modal_confirm .modal-content").html(content);
			$("#modal_confirm .modal-footer").html("<a class='waves-effect waves-red red white-text btn-flat modal-action modal-close'>Cancel</a>"+
												   "<a data-cmd='button_proceed' class='waves-effect waves-grey btn-flat modal-action'>Proceed</a>");
			$('#modal_confirm').openModal('show');			

			$("a[data-cmd='button_proceed']").on("click",function(){
				var remarks = $("textarea[data-field='field_description']").val();
				if(remarks.length == 0){
						Materialize.toast('Remarks is required.',4000);
				}
				else if(remarks.length > 800){
						Materialize.toast('Statement is too long.',4000);
				}
				else{
					var data = system.ajax('../assets/harmony/Process.php?deactivate-employer',[id,remarks]);
					data.done(function(data){
						// console.log(data);
						if(data == 1){
							Materialize.toast('Account deactivaded.',4000);
							system.clearForm();
							App.handleLoadPage("#cmd=index;content=employers");
							$('#modal_confirm').closeModal();	
						}
						else{
							Materialize.toast('Cannot process request.',4000);
						}
					});
				}
			});
		})
		},
		activate:function(){
			$("a[data-cmd='activateEmployer']").on('click',function(){
			var id = $(this).data('node');
			$("#modal_confirm .modal-content").html("Arey you sure ACTIVATE "+$(this).data('name')+"'s account?");
			$("#modal_confirm .modal-footer").html("<a class='waves-effect waves-red red white-text btn-flat modal-action modal-close'>Cancel</a>"+
												   "<a data-cmd='button_proceed' class='waves-effect waves-grey btn-flat modal-action modal-close'>Proceed</a>");
			$('#modal_confirm').openModal('show');			

			$("a[data-cmd='button_proceed']").on("click",function(){
				var data = system.ajax('../assets/harmony/Process.php?activate-employer',id);
				data.done(function(data){
					console.log(data);
					if(data == 1){
						Materialize.toast('Account activaded.',4000);
						system.clearForm();
						App.handleLoadPage("#cmd=index;content=employers");
						$('#modal_confirm').closeModal();	
					}
					else{
						Materialize.toast('Cannot process request.',4000);
					}
					});
				});
			})
		},
        materialize: function(title, callback) {
			toast({
		        title: title,
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: "#DD6B55",
		        confirmButtonText: "Confirm",
		        animation:false,
		        closeOnConfirm: false
		    }, 
		    function () {
				callback();
		    });		
		},

		accept:function(){
			
			$("#modal_confirm .modal-content").html("Arey you sure Accept "+$(this).data('company_name')+"'s account?");
			$("#modal_confirm .modal-footer").html("<a class='waves-effect waves-red red white-text btn-flat modal-action modal-close'>Cancel</a>"+
												   "<a data-cmd='button_proceed' class='waves-effect waves-grey btn-flat modal-action modal-close'>Proceed</a>");
			$('#modal_confirm').openModal('show');			

			$("a[data-cmd='button_proceed']").on("click",function(){
				var data = system.ajax('../assets/harmony/Process.php?set-acceptPendingEmployer',id);
				data.done(function(data){
					console.log(data);
					if(data == 1){
						Materialize.toast('Account activaded.',4000);
						system.clearForm();
						App.handleLoadPage("#cmd=index;content=employers");
						$('#modal_confirm').closeModal();	
					}
					else{
						Materialize.toast('Cannot process request.',4000);
					}
					});
				});
			
		},
	}
}();