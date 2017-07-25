var admin = function () {
	"use strict";
	return {
		ini:function(){
			var data = admin.check_access();
			if(data != 0){
				admin.display();
				employer.list();
				employer.registerEmployer();
			}
		},
		display:function(){
			var ajax = system.html('../assets/harmony/Process.php?get-account');
			var data = ajax.responseText;
			var picture = "../assets/img/profile avatar.jpg", level = "";
			data = JSON.parse(data);

			if(data[0][3] != ""){
				var imageData = data[0][3].split('.');
				if(imageData[imageData.length-1]!='apr'){
					console.log(imageData.length);
					picture = "../assets/img/"+data[0][3];					
				}
				else{
					// picture = _this.get_apr(data[0][3]);					
					picture = "";					
				}
			}

			if(data[0][5] == 1)
				level = "Administrator";

    		$("#text_givenName span").html(data[0][1]);

    		$("#text_familyName span").html(data[0][2]);

    		$("#text_userName span").html(data[0][4]);

			//picture
			$(".profile-element span img").prop({"src":picture});
			$("#ajax-content img").prop({"src":picture});
			//name
			$(".profile-element .font-bold").html(data[0][1]+", "+data[0][2]);
			$("#ajax-content .profile-content strong").html(data[0][1]+", "+data[0][2]);
			//addres
			$("#ajax-content .profile-content p").html(level);

			$("a[data-cmd]").click(function(){
				$("a").parent('li').removeClass("active");
				$(this).parent('li').addClass("active");
				var data = $(this).data('cmd');
				if(data == "jobs"){
					//console.log("jobs");
					//console.log(_apps);
				}
				else if(data == "applications"){
					//console.log("application");
				}
				else if(data == "log-out"){
					var ajax = sys.do_ajax('../assets/harmony/Process.php?kill-session',"");
					admin.check_access();
				}
				else{
					//console.log('dashboard');
				}
			});
		},
        get:function(){
			var data = system.html('assets/harmony/Process.php?get_jobsPosts');
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
		logout:function(){
			$("a[ data-cmd='logout']").on("click",function(){
				var ajax = system.html('../assets/harmony/Process.php?kill-session');
				ajax.done(function(data){
					console.log(data);
					if(data == 1){
				    	$(location).attr('href','../');			
					}
					else{
						Materialize.toast('Cannot process request.',4000);
					}
				})
			});
		},
        check_access:function(){
            var result = "";
            var ajax = system.html('../assets/harmony/Process.php?get-session');
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

var jobs = function(){
	"use strict";
	return {
        posting:function(){
			var content = "";
			var ajax = system.html('../assets/harmony/Process.php?get-jobsPosts');
			ajax.done(function(data){
				data = JSON.parse(data);
				if(data.length>0){
					var content = "<div class='card'><div class='card-content'><table class='table table-striped' id='table_jobs'>"+
									"	<thead>"+
									"		<tr>"+
									"			<th width='5%'>Status</th>"+
									"			<th width='50%'>Job</th>"+
									"			<th width='15%'>Options</th>"+
									"		</tr>"+
									"	</thead>"+
									"	<tbody></tbody>"+
									"</table></div></div>";

					$("#job-posts").html(content);

					content = "";
					$.each(data,function(i,v){
						var status = "<span class='label label-primary'>Active</span>";
						var expiry = new Date(v[3]), now = new Date();

						if(expiry<now){
							status = "<span class='label label-danger'>Inactive</span>";
						}
						content += "<tr>"+
									"<td>"+status+"</td>"+
									"<td><a>"+v[4]+"</a><br><small>"+v[2]+"</small><br/></td>"+
									"<td><a href='#cmd=index;content=job;id="+v[0]+"' class='btn btn-white btn-xs btn-block'>Details</a></td>"+
									"</tr>";						
					});

					$("#job-posts tbody").html(content);
				}
				$(".prettydate").prettydate({
				    dateFormat: "YYYY-MM-DD hh:mm:ss"
				});	
			});
        },
	}
}();

var employer = function(){
	"use strict";
	return {
		list: function(){
			var ajax = system.html('../assets/harmony/Process.php?get-allEmployer');
			ajax.success(function(data){
				var arrPending = [], arrApproved = [], arrDeclined = [];
				if(data != ""){
					var data = JSON.parse(data);
					system.sortResults(data,12,false);
					$.each(data,function(i,v){
						if(v[12] == 0)
				            arrPending.push(v);					
						else if(v[12] == 2)
				            arrDeclined.push(v);					
						else
				            arrApproved.push(v);
					});

					if(arrApproved.length>0){
						var content = "<table class='table table-bordered' id='table_approvedEmployers'>"+
										"	<thead>"+
										"		<tr>"+
										"			<th width='5%'></th>"+
										"			<th width='80%'>Name</th>"+
										"			<th width='15%'></th>"+
										"		</tr>"+
										"	</thead>"+
										"</table>";

						$("#approved_employers .ibox-content").html(content);

						$('#table_approvedEmployers').DataTable( {
						    data: arrApproved,
						    sort: false,
							"columnDefs": [
								{ className: "client-avatar", "targets": [ 0 ] },
								{ className: "text-left", "targets": [ 1 ] }
							],
						    columns: [
						        {data: "",
						            render: function ( data, type, full ){
										var picture = "../assets/img/profile avatar.jpg";
										if(full[9] != ""){
											var imageData = full[9].split('.');
											if(imageData[imageData.length-1]!='apr'){
												picture = "../assets/img/"+full[9];					
											}
											else{
												picture = mainProcess.get_apr(full[9]);					
											}
										}

						            	var details = '<img alt="image" src="'+picture+'">';
						                return details;
						            }
						        },
						        {data: "",
						            render: function ( data, type, full ){
						            	var details = full[5]+"<br/><i>"+system.truncate(full[6],100)+"</i>";
						                return details;
						            }
						        },
						        {data: "",
						            render: function ( data, type, full ){
						            	var details = "<a data-id='"+full[0]+"' data-cmd='options_approvedEmployer' class='btn btn-success btn-xs btn-block'>Details</a>";
						                return details;
						            }
						        },
						    ]
						});
					}

					if(arrPending.length>0){
						var content = "";
						$.each(arrPending,function(i,v){
							content += "<tr>"+
										"	<td class='text-left' width='80%'>"+(i+1)+". "+v[5]+"</td>"+
										"	<td width='20%'><a data-id='"+v[0]+"' data-cmd='options_pendingEmployer' class='btn btn-danger btn-xs btn-block'>Options</a></td>"+
										"</tr>";
						});

						content = "<table class='table table-bordered' id='table_pendingEmployers'>"+content+"</table>";
						$("#pending_employers .ibox-content").html(content);
					}
					else{
						$("#pending_employers .ibox-content").html("<h2>All caught up. </h2><h4>No pending request for employer's account approval</h4>");
					}

					$("a").click(function(){
						var cmd = $(this).data('cmd');
						var id = $(this).data('id');
						if(cmd == 'options_pendingEmployer'){
							var data = sys.searchJSON(arrPending,0,id);
							var content = "<div class='col-md-offset-3 col-md-6' style='float:none !important;'>"+
											"	<table class='table table-bordered ibox-content'>"+
											"		   <tr><td width='20%'>Company: </td><td width='80%'>"+data[0][5]+"</td></tr>"+
											"		   <tr><td>Description: </td><td>"+data[0][6]+"</td></tr>"+
											"		   <tr><td>BIR: </td><td>"+data[0][7]+"</td></tr>"+
											"		   <tr><td>DTI: </td><td>"+data[0][8]+"</td></tr>"+
											"		   <tr><td>Owner: </td><td>"+data[0][2]+" "+data[0][1]+"</td></tr>"+
											"		   <tr><td>Contact Number: </td><td>"+data[0][4]+"</td></tr>"+
											"		   <tr><td>Office Address: </td><td>"+data[0][3]+"</td></tr>"+
											"		   <tr><td>Email Address: </td><td>"+data[0][10]+"</td></tr>"+
											"	</table>"+
											"	<div class='col-md-6'><a class='btn btn-primary btn-xs btn-block' data-cmd='action_acceptPending' data-id='"+data[0][0]+"'>Accept</a></div>"+
											"	<div class='col-md-6'><a class='btn btn-white btn-xs btn-block' data-cmd='action_declinePending' data-id='"+data[0][0]+"'>Decline</a></div>"+
											"</div>";
							sys.modalLarge("System: Employer's Information [Pending]","",content);

							$("a[data-cmd='action_acceptPending']").click(function(){
								var id = $(this).data('id');
								sys.confim("Accept this Employer?",function(){
									var ajax = sys.do_ajax('../assets/harmony/Process.php?set-acceptPendingEmployer',id);
									ajax.success(function(data){
										if(data == 1){
								        	$("#modalLarge").modal('hide');
											swal("Successful!", "Employer has been accepted.", "success");
											employer.list();
										}
										else{
											swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
											console.log(data);
										}
									});
								});
							});
							$("a[data-cmd='action_declinePending']").click(function(){
								var id = $(this).data('id');
								sys.confim("Decline this Employer?",function(){
									var ajax = sys.do_ajax('../assets/harmony/Process.php?set-declinePendingEmployer',id);
									ajax.success(function(data){
										if(data == 1){
								        	$("#modalLarge").modal('hide');
											swal("Successful!", "Employer has been declined.", "success");
											employer.list();
										}
										else{
											swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
											console.log(data);
										}
									});
								});
							});
						}
						else if(cmd == 'options_approvedEmployer'){
							var data = sys.searchJSON(arrApproved,0,id);
							var content = "<div class='col-md-12' style='float:none !important;'><table class='table table-bordered ibox-content'>"+
										    "<tr><td width='20%'>Company: </td><td width='80%'>"+data[0][5]+"</td></tr>"+
										    "<tr><td>Description: </td><td>"+data[0][6]+"</td></tr>"+
										    "<tr><td>BIR: </td><td>"+data[0][7]+"</td></tr>"+
										    "<tr><td>DTI: </td><td>"+data[0][8]+"</td></tr>"+
										    "<tr><td>Owner: </td><td>"+data[0][2]+" "+data[0][1]+"</td></tr>"+
										    "<tr><td>Contact Number: </td><td>"+data[0][4]+"</td></tr>"+
										    "<tr><td>Office Address: </td><td>"+data[0][3]+"</td></tr>"+
										    "<tr><td>Email Address: </td><td>"+data[0][10]+"</td></tr>"+
										  "</table></div>";
							sys.modalLarge("System: Employer's Information","",content);
						}
						else{
						}
					});
				}
			});
	    },
	    registerEmployer: function(){
	    	var date = new Date;
	    	$("input[name='field_password']").val("");

            $("#field_autosid").click(function(){
            	if($(this).prop('checked')){
            		$("#div_studentID").addClass('hidden');
            		$("input[name='field_studentID']").data({'inputtype':'optional'});
            	}
            	else{
            		$("#div_studentID").removeClass('hidden');
            		$("input[name='field_studentID']").data({'inputtype':'required'});
            	}
            });

            $('a[data-cmd="register_employer"]').click(function(){
            	var fields = [];
				var data = $("#form_registerEmployer").serializeArray();
				var validated = validation.validate_form(data);
				var email = validation.email($("input[name='field_email']").val());

				if(validated[0]>0){
					var message = "";
					$.each(validated[1],function(i,v){
						message += (i+1)+". "+v+"<br/>";
					})
					system.errorNotification('The following fields has an error',message);
				}
				else if(!email){
					system.errorNotification('Error',"Invalid email address.");
				}
				else{
					/*
				    system.send_mail($("input[name='field_email']").val(),$("input[name='field_password']").val());
					*/
					var ajax = system.do_ajax('../assets/harmony/Process.php?do-registerEmployer',[data,$("input[name='field_password']").val()]);
					ajax.success(function(data){
						console.log(data);
						if(data == 1){
							// allow automatic emailing capability if posible
						    // system.send_mail($("input[name='field_email']").val(),$("input[name='field_password']").val());
							swal("Successful!", "Employer has been accepted.", "success");
							system.successNotification('Success',"Email has been sent.");
							App.handleLoadPage(window.location.hash);
						}
						else{
							swal("Fatal Error!", "There was an Unexpected Error during the process.", "error");
							console.log(data);
						}
						/*
						*/
					});
				}
            });
        },
	}
}();
