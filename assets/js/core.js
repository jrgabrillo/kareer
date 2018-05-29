account = {
	management:function(){
		var data = system.xml("pages.xml");
		$(data.responseText).find("addAccount").each(function(i,content){
			$("#modal .modal-content").html(content);
			$('#modal').openModal('show');			
		});
	},
	list:function(){
		var content = "";
		var data = system.html('../assets/harmony/Process.php?get-admin');
		data.done(function(data){
			data = JSON.parse(data);
			console.log(data[0]);
			$(".profile-btn span").html(data[0][1]);
			$("#display_adminName").html(data[0][1]);
			$("#display_email").html(data[0][5]);
			$("#display_username").html(data[0][2]);
			$("#display_password").html('Active');
			$("#display_status").html('Active');
			$("#display_date").html(data[0][7]);
		});

		var data = system.html('../assets/harmony/Process.php?get-listAdmin');
		data.done(function(data){
			data = JSON.parse(data);
			$.each(data,function(i,v){
				content += "<tr>"+
							"	<td>"+v[1]+"</td>"+
							"	<td>Active</td>"+
							"	<td>Admin</td>"+
							"	<td>"+
							"		<a class='tooltipped btn-floating waves-effect black-text no-shadow grey lighten-5 right' data-position='left' data-delay='50' data-tooltip='Show' data-cmd='update'>"+
							"			<i class='mdi-navigation-more-vert right black-text'></i>"+
							"		</a>"+
							"	</td>"+
							"</tr>";
			})	

			content = "<table class='table bordered'>"+
						"	<tr>"+
						"		<th>Name</th><th>Status</th><th>Role</th><th></th>"+
						"	</tr>"+
							content+
						"</table>";
			$("#display_adminList").html(content);
		});
	},
	add:function(){
		var data = system.xml("pages.xml");
		$(data.responseText).find("addAccount").each(function(i,content){
			$("#display_newAdmin").html(content);
			$("#form_registerAdmin").validate({
			    rules: {
			        field_name: {required: true,maxlength: 50},
			        field_email: {required: true,maxlength: 50,checkEmail:true},
			        field_username: {required: true,maxlength: 50},
			        field_password: {required: true,maxlength: 50},
			        field_capabilities: {required: true,maxlength: 500},
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
					var data = system.ajax('../assets/harmony/Process.php?set-newAdmin',_form);
					data.done(function(data){
						if(data == 1){
							Materialize.toast('Saved.',4000);
							App.handleLoadPage("#cmd=index;content=account");
						}
						else{
							Materialize.toast('Cannot process request.',4000);
						}
					});
			    }
			}); 
		});
	},
}

product = {
	get:function(){
		var data = system.html('../assets/harmony/Process.php?get-products');
		return data;
	},
	list:function(){
		var content = "";
		var data = product.get();
		data = JSON.parse(data.responseText);
		$.each(data,function(i,v){
			content += "<tr>"+
						"	<td width='1px'>"+(i+1)+". </td>"+
						"	<td><img src='../assets/images/img3.jpg' alt='Thumbnail' class='responsive-img valign profile-image' width='100px'></td>"+
						"	<td width='300px'>"+v[1]+"</td>"+
						"	<td>"+v[5]+"</td>"+
						"	<td>"+v[4]+"</td>"+
						"	<td>"+v[2]+"</td>"+
						"	<td>"+v[3]+"</td>"+
						"	<td>published</td>"+
						"	<td width='1px'>"+
						"		<a class='tooltipped btn-floating waves-effect black-text no-shadow grey lighten-5 right' data-position='left' data-delay='50' data-tooltip='Show' data-cmd='update'>"+
						"			<i class='mdi-navigation-more-vert right black-text'></i>"+
						"		</a>"+
						"	</td>"+
						"</tr>";
		})	

		content = "<table class='table bordered' id='products'>"+
					"<thead>"+
					"	<tr>"+
					"		<th>#</th><th>Thumbnail</th><th>Product</th><th>Description</th><th>Category</th><th>Qty</th><th>Price</th><th>Status</th><th></th>"+
					"	</tr>"+
					"</thead>"+
					"</tbody>"+
						content+
					"</tbody>"+
					"</table>";
		$("#display_productList").html(content);

		var table = $('#products').DataTable({
	        "order": [[ 0, 'asc' ]],
	        "drawCallback": function ( settings ) {
	            var api = this.api();
	            var rows = api.rows( {page:'current'} ).nodes();
	            var last=null;
	        }
	    });
	},
	listGrid:function(){
		var data = system.xml("pages.xml");
		var _content = "";
		$(data.responseText).find("product").each(function(i,content){
			console.log();
			for(x=0;x<=100;x++){
				_content += content.innerHTML;
			}
			$("#products").html(_content);
		});
	},
	add:function(){
		$("#add_product").on('click',function(){
			var data = system.xml("pages.xml");
			$(data.responseText).find("addProduct").each(function(i,content){
				$("#modal .modal-content").html(content);
				$('#modal').openModal('show');

				$("#form_addProduct").validate({
				    rules: {
				        field_productName: {required: true,maxlength: 50},
				        field_qty: {required: true,maxlength: 50,checkPositiveNumber:true},
				        field_price: {required: true,maxlength: 50,checkCurrency:true},
				        field_description: {required: true,maxlength: 900},
				        field_category: {required: true,maxlength: 500},
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
						var data = system.ajax('../assets/harmony/Process.php?set-newProduct',_form);
						data.done(function(data){
							if(data == 1){
								Materialize.toast('Saved.',4000);
								system.clearForm();
								App.handleLoadPage("#cmd=index;content=list_products");
							}
							else{
								Materialize.toast('Cannot process request.',4000);
							}
						});
				    }
				});
			});
		})
	},
}

client = {
	ini:function(){
		this.add();
		this.list();
	},
	get:function(){
		var data = system.html('../assets/harmony/Process.php?get-clients');
		return data;
	},
	list:function(){
		var content = "", search;
		var getEmployee = system.ajax('../assets/harmony/Process.php?get-allEmployeeCount',"");

		getEmployee = JSON.parse(getEmployee.responseText);
		var data = client.get();
		data = JSON.parse(data.responseText);
		$.each(data,function(i,v){
			search = system.searchJSON(getEmployee,1,v[0]);
			search = (search.length > 0)?search[0][0]:0;
			content += "<tr>"+
						"	<td width='1px'>"+(i+1)+". </td>"+
						"	<td><img src='../assets/images/img3.jpg' alt='Thumbnail' class='responsive-img valign profile-image' width='100px'></td>"+
						"	<td width='400px'>"+v[1]+"</td>"+
						"	<td>"+search+"</td>"+
						"	<td width='10px'>Active</td>"+
						"	<td width='1px'>"+
						"		<a data-cmd='update' data-node='"+v[0]+"' class='tooltipped btn-floating waves-effect black-text no-shadow grey lighten-5 right' data-position='left' data-delay='50' data-tooltip='Show'>"+
						"			<i class='mdi-navigation-more-vert right black-text'></i>"+
						"		</a>"+
						"	</td>"+
						"</tr>";
		})	

		content = "<table class='table bordered' id='products'>"+
					"<thead>"+
					"	<tr>"+
					"		<th>#</th><th>Logo</th><th>Client</th><th># of Employees</th><th>Status</th><th></th>"+
					"	</tr>"+
					"</thead>"+
					"</tbody>"+
						content+
					"</tbody>"+
					"</table>";
		$("#display_clientList").html(content);

		var table = $('#products').DataTable({
	        "order": [[ 0, 'asc' ]],
	        bLengthChange: false,
	        iDisplayLength: -1,
	        "drawCallback": function ( settings ) {
	            var api = this.api();
	            var rows = api.rows( {page:'current'} ).nodes();
	            var last=null;
	        }
	    });

		$('.dataTable').on('click', 'tbody tr', function() {
			var data = table.row(this).data();
			data = $.parseHTML(data[5]);
			data = data[0].dataset.node;
	    	localStorage.setItem('client_id',data);
	    	$(location).attr('href','#cmd=index;content=focusClient');			
		});
	},
	listGrid:function(){
		var data = system.xml("pages.xml");
		var _content = "";
		$(data.responseText).find("product").each(function(i,content){
			for(x=0;x<=100;x++){
				_content += content.innerHTML;
			}
			$("#products").html(_content);
		});
	},
	add:function(){
		$("#add_client").on('click',function(){
			var data = system.xml("pages.xml");
			$(data.responseText).find("addClient").each(function(i,content){
				$("#modal_popUp .modal-content").html(content);
				$('#modal_popUp').openModal('show');		

				$("#form_addClient").validate({
				    rules: {
				        field_name: {required: true,maxlength: 50},
				        field_phone: {required: true,maxlength: 50},
				        field_email: {required: true,maxlength: 50,checkEmail:true},
				        field_address: {required: true,maxlength: 50},
				        field_description: {required: true,maxlength: 500},
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
						var data = system.ajax('../assets/harmony/Process.php?set-newClient',_form);
						data.done(function(data){
							if(data == 1){
								Materialize.toast('Saved.',4000);
								system.clearForm();
								App.handleLoadPage("#cmd=index;content=clients");
							}
							else{
								Materialize.toast('Cannot process request.',4000);
							}
						});
				    }
				});
			});
		})
	},
	details:function(){
		var employerID = localStorage.getItem('client_id');
		var content = "";
		var getEmployer = system.ajax('../assets/harmony/Process.php?get-clientDetails',employerID);
		getEmployer.done(function(data_getEmployer){
			var getEmployees = system.ajax('../assets/harmony/Process.php?get-employeeByID',employerID);
			getEmployees = JSON.parse(getEmployees.responseText);

			data_getEmployer = JSON.parse(data_getEmployer);
			var profile = (data_getEmployer[0][7] == "")?"avatar.jpg":data_getEmployer[0][7];

			content = "<div id='profile-card' class='card'>"+
					"    <div class='card-image waves-effect waves-block waves-light'>"+
					"        <img class='activator' src='../assets/images/user-bg.jpg' alt='user background'>"+
					"    </div>"+
					"    <div class='card-content'>"+
					"        <img src='../assets/images/"+profile+"' alt='' class='circle responsive-img activator card-profile-image'>"+
					"        <a class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right'>"+
					"            <i class='mdi-action-account-circle'></i>"+
					"        </a>"+
					"        <span class='card-title activator grey-text text-darken-4'>"+data_getEmployer[0][1]+"</span>"+
					"        <p><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> HR Officer</p>"+

					"    </div>"+
					"    <div class='card-reveal' style='display: none; transform: translateY(0px);'>"+
					"        <span class='card-title grey-text text-darken-4'>"+data_getEmployer[0][1]+" <i class='mdi-navigation-close right'></i></span>"+
					"        <p>More Information</p>"+
					"        <p><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> HR Officer</p>"+
					"        <p><i class='mdi-action-perm-phone-msg cyan-text text-darken-2'></i>"+data_getEmployer[0][3]+"</p>"+
					"        <p><i class='mdi-communication-email cyan-text text-darken-2'></i>"+data_getEmployer[0][2]+"</p>"+
					"        <p><i class='mdi-action-verified-user cyan-text text-darken-2'></i>"+data_getEmployer[0][5]+"</p>"+
					"        <p><i class='mdi-action-room cyan-text text-darken-2'></i>"+data_getEmployer[0][4]+"</p>"+
					"    </div>"+
					"</div>";
			$("#profile").html(content);

			if(getEmployees.length > 0){
				var content = "";
				$.each(getEmployees,function(i,v){
					content += "<tr>"+
								"	<td width='1px'>"+(i+1)+". </td>\n"+
								"	<td><img src='../assets/images/avatar.jpg' alt='Thumbnail' class='responsive-img valign profile-image' style='width:50px;'></td>\n"+
								"	<td width='200px'><p>"+v[1]+"</p></td>\n"+
								"	<td width='200px'><p>"+v[5]+"</p></td>\n"+
								"	<td width='200px'><p>"+v[6]+"</p></td>\n"+
								"	<td>\n"+
								"		<a data-studentID='"+v[1]+"' data-node='"+v[0]+"' data-cmd='view' class='tooltipped btn-floating waves-effect black-text no-shadow grey lighten-5 right' data-position='bottom' data-delay='50' data-tooltip='Update'>\n"+
								"			<i class='mdi-navigation-more-vert right black-text'></i>"+
								"		</a>\n"+
								"	</td>\n"+
								"</tr>\n";
				})	

				$("#employees table tbody").html(content);
				var table = $('#employees table').DataTable({
			        "order": [[ 0, 'asc' ]],
			        "drawCallback": function ( settings ) {
			            var api = this.api();
			            var rows = api.rows( {page:'current'} ).nodes();
			            var last=null;
			        }
			    });

				$('.dataTable').on('click', 'tbody tr', function() {
					var data = table.row(this).data();
					data = $.parseHTML(data[5]);
					data = data[0].dataset.node;
			    	client.view(data);
				})
			}
			else{
				$("#employees").html("<div class='col s12 center'>No employees yet</div>");
			}
		});

		$("#options a[data-cmd='bulk_upload']").on('click',function(){
	    	$(location).attr('href','#cmd=index;content=upload_employee');			
		});

		$("#options a[data-cmd='points_upload']").on('click',function(){
	    	$(location).attr('href','#cmd=index;content=upload_points');			
		});
	},
	view:function(id){
		var content = "";
		var getEmployee = system.ajax('../assets/harmony/Process.php?get-searchByEmployeeID',id);
		getEmployee.done(function(data){
			data = JSON.parse(data);
			var profile = (data[0][14] == "")?"avatar.jpg":data[0][14];
			var position = ((data[0][4] == "") || data[0][4] == null)?"Not assigned":data[0][4];
			var address = ((data[0][13] == "") || data[0][13] == null)?"Not assigned":data[0][13];
			var contactNumber = ((data[0][11] == "") || data[0][11] == null)?"Not assigned":data[0][11];

			content = "<div class='row'>"+
					"<div class=''>"+
					"	<div class='col s3 m2 l2'>"+
					"		<img src='../assets/images/avatar.jpg' alt='Employee logo' class='circle center responsive-img valign profile-image'>"+
					"	</div>"+
					"	<div class='col s9 m10 l10'>"+
					"		<ul class='collection with-header'>"+
					"			<li class='collection-header'>"+
					"				<h4>"+data[0][6]+" "+data[0][5]+" <small>"+data[0][1]+"</small></h4>"+
					"			</li>"+
					"			<li class='collection-item'>"+
					"        		<div><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> "+position+"</div>"+
					"			</li>"+
					"			<li class='collection-item'>"+
					"        		<div><i class='mdi-action-perm-phone-msg cyan-text text-darken-2'></i> "+contactNumber+"</div>"+
					"			</li>"+
					"			<li class='collection-item'>"+
					"        		<div><i class='mdi-communication-email cyan-text text-darken-2'></i> "+data[0][12]+"</div>"+
					"			</li>"+
					"			<li class='collection-item'>"+
					"        		<div><i class='mdi-action-room cyan-text text-darken-2'></i> "+address+"</div>"+
					"			</li>"+
					"			<li class='collection-item'>"+
					"        		<div><i class='mdi-social-cake cyan-text text-darken-2'></i> "+data[0][10]+"</div>"+
					"			</li>"+
					"		</ul>"+
					"	</div>";
			$("#modal_popUp .modal-content").html(content);
			$('#modal_popUp').openModal('show');			
		});
	},
	sendAccount:function(count){
		// system.send_mail('rufo.gabrillo@gmail.com','Testing email capability','Test test');
		var loop = 0;
		do{
			loop++;
			console.log(loop);
			var data = system.send_mail('rufo.gabrillo@gmail.com','Testing email capability','Test test');
			console.log();
		}
		while(count<10);
	}
}

points = {
	ini:function(){

	},
	upload:function(user){
        var $inputImage = $("#field_file"), status = true, res = "";
        if(window.FileReader){
            $inputImage.on('change',function(){
            	$("#field_file").addClass("disabled");
                var files = this.files, file = files[0].name.split('.');
                if((file[1] == "csv") || (file[1] == "xlsx")){ // 
					var data = system.xml("pages.xml");
					$(data.responseText).find("tablePointsPreview").each(function(i,content){
						$("#field_file").parse({
							config: {
								complete: function(results, file) {
									$("#display_importLoading").removeClass('zoomOut').html("");
							    	system.preloader("#display_importLoading");
									system.loading(true);
									var data = [],count = 0, search = [];
									var employeeList = [];

									var employerID = localStorage.getItem('client_id');
									employeeList = system.ajax('../assets/harmony/Process.php?get-employeeByID',employerID);
									employeeList = JSON.parse(employeeList.responseText);

									if((employeeList.length>0)&& ((results['data'][0].length == 4) && (results['data'][0][3] == 'Points')) && (results['data'].length<=2000)){
										Materialize.toast("Validating data. This may take a minute.",2000);
										setTimeout(function(){
											$("#importPreview").html(content);
						                	$("#display_import").removeClass('hidden');

											for(var x=1;x<(results['data'].length-1);x++){
												if(results['data'][x][0] != ""){
													search = system.searchJSON(employeeList,1,results['data'][x][0]);
													if(search.length==1)												
														data.push(results['data'][x]);
												}
											}

							                var table = $('#importPreview table').DataTable({
							                    data: data,
										        "order": [[ 0, 'asc' ]],
										        deferRender:    true,
										        iDisplayLength: 100,
												sScrollY:        "300px",
												sScrollX:        "100%",
												bScrollCollapse: true,
							                    columns: [
							                        {data: "",
							                            render: function ( data, type, full ){
							                            	count++;
							                                return count+".";
							                            }
							                        },
							                        {data: "",
							                            render: function ( data, type, full ){
							                                return (full[0]!="")?"<span>"+full[0]+"</span>":null;
							                            }
							                        },
							                        {data: "",
							                            render: function ( data, type, full ){
							                                return (full[2]!="")?"<span>"+full[1]+"</span>":null;
							                            }
							                        },
							                        {data: "",
							                            render: function ( data, type, full ){
							                                return (full[1]!="")?"<span>"+full[2]+"</span>":null;
							                            }
							                        },
							                        {data: "",
							                            render: function ( data, type, full ){
							                                return (full[3]!="")?"<span>"+full[3]+"</span>":null;
							                            }
							                        }
							                    ]
							                });

											table.on( 'order.dt search.dt', function () {
											    table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
											        cell.innerHTML = i+1;
											    } );
											} ).draw();

											if(data.length>0){
												points.saveUpload(data);
											}
											else{
												$(".display_loading").html("<span class='red-text'>All data are already in the system.</span>");
											}

						                	$("#display_import").removeClass('hidden');
											$("#display_importLoading").addClass('animated zoomOut').html("");
										},1000)
									}
									else{

										Materialize.toast("It seems that you are uploading a data that is not validated or<br/> either of the following:<br/>"+
											"&bull; No employees yet; <br/>&bull; Your are uploading too many data; <br/>&bull; You are uploading unformatted CSV file.",
											10000);
					                	$("#display_import").addClass('hidden');
										$("#display_importLoading").addClass('animated zoomOut').html("");
									}
								}
							},
							before: function(file, inputElem){
								$("#display_excelFile").html(file.name);
							},
							error: function(err, file, inputElem, reason){
								Materialize.toast("MS Excel file is corrupted.",4000);
			                	$("#display_import").addClass('hidden');
								$("#display_importLoading").html("");
							},
						});
					});
                }
                else{
                	$("#display_import").addClass('hidden');
					$("#display_excelFile").html("");
					Materialize.toast("MS Excel file is not valid. Try a CSV file.",4000);
                }
            });
        }
        else{
            $inputImage.addClass("hide");
        }	 			
	},
	saveUpload:function(_data){	
        $("#save_import").on("click",function(){
			Materialize.toast('Importing...',1000);
        	$(this).addClass('disabled');
			var data = system.xml("pages.xml");
			$(data.responseText).find("loader2").each(function(i,content){
				$(".display_loading").html(content);
	        	setTimeout(function(){
	        		_data = ($.type(_data) == "array")?JSON.stringify(_data):_data;
        			var client = localStorage.getItem('client_id')
					var data = system.ajax('../assets/harmony/Process.php?set-uploadPointsAdmin',[_data,client]);
					data.done(function(data){
						console.log(data);
						if(data == 1){
							Materialize.toast('Saved.',4000);
							App.handleLoadPage("#cmd=index;content=focusClient");
						}
						else{
							Materialize.toast('Cannot process request.',4000);
							$(".display_loading").html("");
						}
					});
	        	},1000);
			});
        });
	}
}

employee = {
	get:function(){
		var data = system.html('../assets/harmony/Process.php?get-employee');
		return data;
	},
	list:function(data){
		var content = "";
		$.each(data,function(i,v){
			content += "<tr>"+
						"	<td>"+(i+1)+". </td>\n"+
						"	<td><img src='../assets/images/avatar.jpg' alt='Thumbnail' class='responsive-img valign profile-image' style='width:50px;'></td>\n"+
						"	<td><p>"+v[1]+"</p></td>\n"+
						"	<td><p>"+v[5]+"</p></td>\n"+
						"	<td><p>"+v[6]+"</p></td>\n"+
						"	<td>"+v[10]+"</td>\n"+
						"	<td>"+v[9]+"</td>\n"+
						"	<td>"+v[12]+"</td>\n"+
						"	<td>\n"+
						"		<a class='tooltipped btn-floating waves-effect black-text no-shadow grey lighten-5 right' data-position='left' data-delay='50' data-tooltip='Show' data-cmd='update'>\n"+
						"			<i class='mdi-navigation-more-vert right black-text'></i>"+
						"		</a>\n"+
						"	</td>\n"+
						"</tr>\n";
		})	

		$("#display_employeeList table tbody").html(content);
		var table = $('#display_employeeList table').DataTable({
	        "order": [[ 0, 'asc' ]],
	        "drawCallback": function ( settings ) {
	            var api = this.api();
	            var rows = api.rows( {page:'current'} ).nodes();
	            var last=null;
	        }
	    });
	},
	add:function(){
	},
	upload:function(){
        var $inputImage = $("#field_file"), status = true, res = "";
        if(window.FileReader){
            $inputImage.on('change',function(){
            	$("#field_file").addClass("disabled");
                var files = this.files, file = files[0].name.split('.');
                if((file[1] == "csv") || (file[1] == "xlsx")){ // 
					var data = system.xml("pages.xml");
					$(data.responseText).find("tableEmployeePreview").each(function(i,content){
						$("#field_file").parse({
							config: {
								complete: function(results, file) {
									$("#display_importLoading").removeClass('zoomOut').html("");
							    	system.preloader("#display_importLoading");
									system.loading(true);
									var data = [],count = 0, search = [];
									var employeeList = [];

									var employerID = localStorage.getItem('client_id');
									employeeList = system.ajax('../assets/harmony/Process.php?get-employeeByID',employerID);
									employeeList = JSON.parse(employeeList.responseText);
									if(results['data'].length<=2000){
										Materialize.toast("Removing duplicated entries.",2000);
										setTimeout(function(){
											$("#importPreview").html(content);
						                	$("#display_import").removeClass('hidden');

											for(var x=1;x<(results['data'].length-1);x++){
												if(results['data'][x][0] != ""){
													search = system.searchJSON(employeeList,1,results['data'][x][0]);
													if(search.length==0)												
														data.push(results['data'][x]);
												}
											}

							                var table = $('#importPreview table').DataTable({
							                    data: data,
										        "order": [[ 0, 'asc' ]],
										        deferRender:    true,
										        iDisplayLength: 100,
												sScrollY:        "300px",
												sScrollX:        "100%",
												bScrollCollapse: true,
							                    columns: [
							                        {data: "",
							                            render: function ( data, type, full ){
							                            	count++;
							                                return count+".";
							                            }
							                        },
							                        {data: "",
							                            render: function ( data, type, full ){
							                                return (full[0]!="")?"<span>"+full[0]+"</span>":null;
							                            }
							                        },
							                        {data: "",
							                            render: function ( data, type, full ){
							                                return (full[2]!="")?"<span>"+full[2]+"</span>":null;
							                            }
							                        },
							                        {data: "",
							                            render: function ( data, type, full ){
							                                return (full[1]!="")?"<span>"+full[1]+"</span>":null;
							                            }
							                        },
							                        {data: "",
							                            render: function ( data, type, full ){
							                                return (full[3]!="")?"<span>"+full[3]+"</span>":null;
							                            }
							                        },
							                        {data: "",
							                            render: function ( data, type, full ){
							                                return (full[4]!="")?"<span>"+full[4]+"</span>":null;
							                            }
							                        },
							                        {data: "",
							                            render: function ( data, type, full ){
							                                return (full[5]!="")?"<span>"+full[5]+"</span>":null;
							                            }
							                        },
							                    ],
							                });

											table.on( 'order.dt search.dt', function () {
											    table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
											        cell.innerHTML = i+1;
											    } );
											} ).draw();


											if(data.length>0){
												employee.saveUpload(data);
											}
											else{
												$(".display_loading").html("<span class='red-text'>All data are already in the system.</span>");
											}

						                	$("#display_import").removeClass('hidden');
											$("#display_importLoading").addClass('animated zoomOut').html("");
										},1000)
									}
									else{
										Materialize.toast("Too much information. Try uploading up to 2000 rows. ",4000);
					                	$("#display_import").addClass('hidden');
										$("#display_importLoading").addClass('animated zoomOut').html("");
									}
								}
							},
							before: function(file, inputElem){
								$("#display_excelFile").html(file.name);
							},
							error: function(err, file, inputElem, reason){
								Materialize.toast("MS Excel file is corrupted.",4000);
			                	$("#display_import").addClass('hidden');
								$("#display_importLoading").html("");
							},
						});
					});
                }
                else{
                	$("#display_import").addClass('hidden');
					$("#display_excelFile").html("");
					Materialize.toast("MS Excel file is not valid. Try a CSV file.",4000);
                }
            });
        }
        else{
            $inputImage.addClass("hide");
        }	 			
	},
	saveUpload:function(_data){
        $("#save_import").on("click",function(){
			Materialize.toast('Importing...',4000);
        	$(this).addClass('disabled');
			var data = system.xml("pages.xml");
			$(data.responseText).find("loader2").each(function(i,content){
				$(".display_loading").html(content);
	        	setTimeout(function(){
	        		_data = ($.type(_data) == "array")?JSON.stringify(_data):_data;
        			var client = localStorage.getItem('client_id')
					var data = system.ajax('../assets/harmony/Process.php?set-newBulkEmployeeAdmin',[_data,client]);
					data.done(function(data){
						if(data == 1){
							Materialize.toast('Saved.',4000);
							App.handleLoadPage("#cmd=index;content=focusClient");
						}
						else{
							Materialize.toast('Cannot process request.',4000);
							$(".display_loading").html("");
						}
					});
	        	},1000);
			});

        });
	},
	email:function(){

	}
}

employer = {
	account:function(){
		var content = "";
		var data = system.ajax('../assets/harmony/Process.php?get-employerAccount',"");
		data.done(function(data){
			var data = JSON.parse(data);
			var profile = (data[0][7] == "")?"avatar.jpg":data[0][7];
			
			$("#display_company span").html(data[0][1]);
			$("#display_name a[data-activates='profile-dropdown']").html(data[0][5]);

			content = "<div id='profile-card' class='card'>"+
						"    <div class='card-image waves-effect waves-block waves-light'>"+
						"        <img class='activator' src='../assets/images/user-bg.jpg' alt='user background'>"+
						"    </div>"+
						"    <div class='card-content'>"+
						"        <img src='../assets/images/"+profile+"' alt='' class='circle responsive-img activator card-profile-image'>"+
						"        <a class='btn-floating activator btn-move-up waves-effect waves-light darken-2 right'>"+
						"            <i class='mdi-action-account-circle'></i>"+
						"        </a>"+
						"        <span class='card-title activator grey-text text-darken-4'>"+data[0][1]+"</span>"+
						"        <p><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> HR Officer</p>"+

						"    </div>"+
						"    <div class='card-reveal' style='display: none; transform: translateY(0px);'>"+
						"        <span class='card-title grey-text text-darken-4'>"+data[0][1]+" <i class='mdi-navigation-close right'></i></span>"+
						"        <p>More Information</p>"+
						"        <p><i class='mdi-action-perm-identity cyan-text text-darken-2'></i> HR Officer</p>"+
						"        <p><i class='mdi-action-perm-phone-msg cyan-text text-darken-2'></i>"+data[0][3]+"</p>"+
						"        <p><i class='mdi-communication-email cyan-text text-darken-2'></i>"+data[0][2]+"</p>"+
						"        <p><i class='mdi-action-verified-user cyan-text text-darken-2'></i>"+data[0][5]+"</p>"+
						"        <p><i class='mdi-action-room cyan-text text-darken-2'></i>"+data[0][4]+"</p>"+
						"    </div>"+
						"</div>";
			$("#profile").html(content);
		});
	},
	employees:function(){
		var employeeList = employee.get();
		employeeList = JSON.parse(employeeList.responseText);
		employee.list(employeeList);

		$("#field_addEmployee").on("change",function(data){
			var data = $(this).val();
			if(data == "Bulk upload"){
		    	$(location).attr('href','#cmd=index;content=employeeUpload');			
			}
		})
	},
}

console.log("xx");
