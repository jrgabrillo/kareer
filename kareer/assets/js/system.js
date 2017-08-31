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
		erroNotif:function(title,message){
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
		successNotif:function(title,message){
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
		modalLarge:function(title, subtitle, body){
        	$("#modalLarge").modal('show');
        	$("#modalLarge .modal-title").html(title);
        	$("#modalLarge .font-bold").html(subtitle);
        	$("#modalLarge .modal-body").html(body);
        },
        close_modalLarge:function(){ 
        	$("#modalLarge").modal('hide');
        	$(".modal-backdrop").addClass('hidden');
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
			var ajax = system.ajax('../assets/img/profile/'+image,'');
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
        confirm:function(title, callback) {
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
	}
}();