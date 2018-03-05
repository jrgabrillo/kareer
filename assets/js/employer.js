var employer = function () {
	"use strict";
	return {
		nav:function(){
			var content = "", data = employer.get();
			data = JSON.parse(data);
			var profile = (data[0][5] == null)?'avatar.png':data[0][5];

			$("#user-account img.profile-image").attr({"src":"../assets/images/profile/"+profile});
			$("#user-account div div a span.display_name").html(data[0][2]);
		},
		ini:function(){
			var data = admin.check_access();
			if(data != 0){
				employer.display();
			}
		},
		get:function(){
			var ajax = system.ajax('../assets/harmony/Process.php?get-account',"");
			return ajax.responseText;
		},
		display:function(){
			console.log('divine');
			var content = "", data = employer.get();
			data = JSON.parse(data);
			var profile = (data[0][5] == null)?'avatar.png':data[0][5];
			employer.nav();
			console.log(data);
			$("#user-account img.profile-image").attr({"src":"../assets/images/profile/"+profile});
			$("#user-account div div a span.display_name").html(data[0][2]);

			$("#display_employer").html(`<div id='profile-card' class='card'>
										<div class='card-content'>
										    <div class='responsive-img activator card-profile-image circle'>
										    	<img src='../assets/images/profile/${profile}' alt='' class='circle profile-image'>
										    	<a data-cmd='updateAdminPicture' data-value='${profile}' data-name='${data[0][1]} ${data[0][2]}' data-node='${data[0][0]}' data-prop='Picture' class='btn waves-effect white-text no-shadow black' style='font-size: 10px;z-index: 1;padding: 0 12px;top:40px;'>Change</a>
											</div>
											<a data-for='name' data-cmd='updateAdmin' data-value='${JSON.stringify([data[0][2]])}' data-name='${data[0][2]}' data-node='${data[0][0]}' data-prop='Name' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update name'>
												<i class='material-icons right hover black-text'>mode_edit</i>
											</a>
										    <span class='card-title activator grey-text text-darken-4' for='name'>${data[0][2]}</span>
											<div class='divider'></div>
											<table>
												<tr>
													<td width='20px' class='bold'><span style='width:80%;display: inline-block;'><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> Username: </span></td>
													<td class='grey-text truncate' for='username'>${data[0][3]}</td>
													<td width='20px'>
														<a data-for='username' data-cmd='updateAdmin' data-value='${data[0][4]}' data-name='${data[0][1]} ${data[0][2]}' data-node='${data[0][0]}' data-prop='Username' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update username'>
															<i class='material-icons right hover black-text'>mode_edit</i>
														</a>
													</td>
												</tr>
												<tr>
													<td class='bold'><span style='width:80%;display: inline-block;' class='truncate'><i class='mdi-action-verified-user cyan-text text-darken-2'></i> Password</span></td>
													<td></td>
													<td>
														<a data-cmd='updateAdmin' data-name='${data[0][1]} ${data[0][2]}' data-node='${data[0][0]}' data-prop='Password' class='tooltipped btn-floating waves-effect black-text no-shadow white right' data-position='left' data-delay='50' data-tooltip='Update password'>
															<i class='material-icons right hover black-text'>mode_edit</i>
														</a>
													</td>
												</tr>
											</table>
										</div>
									</div>`);

			$(`img.profile-image`).on('error',function(){
				$(this).attr({'src':'../assets/images/logo/icon.png'});
			});

			admin.update();
			admin.updatePicture();
		},
		
    };
}();

var pass = {
	visibility:function(){
		let c = 0;
		$(".item-input-password-preview").on('click',function(){
			c++;
			if((c%2)==0){
				$(this).children('i').html('visibility_off');
				$("input[name='field_password']").attr({'type':'password'});
			}
			else{
				$(this).children('i').html('visibility');
				$("input[name='field_password']").attr({'type':'text'});
			}
		});
	}
}