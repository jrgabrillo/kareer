var admin = function () {
	"use strict";
	return {
        ini:function(){
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

    };
}();

var jobs = function(){
	"use strict";
	return {
        posting:function(){
			var content = "";
			var ajax = system.html('../assets/harmony/Process.php?get-jobsPosts');
			ajax.done(function(data){
				// ajax = JSON.parse(ajax.responseText);
				console.log(data);
			})
			// console.log(ajaxData);

			// if(ajaxData.length>0){
			// 	var content = "<div class='ibox'><div class='ibox-content'><table class='table table-striped' id='table_jobs'>"+
			// 					"	<thead>"+
			// 					"		<tr>"+
			// 					"			<th width='5%'>Status</th>"+
			// 					"			<th width='50%'>Job</th>"+
			// 					"			<th width='30%'>Applicants</th>"+
			// 					"			<th width='15%'>Options</th>"+
			// 					"		</tr>"+
			// 					"	</thead>"+
			// 					"</table></div></div>";

			// 	$("#job-posts").html(content);

			// 	$('#table_jobs').DataTable({
			// 	    data: ajaxData,
			// 	    sort: false,
			// 		"columnDefs": [
			// 			{ className: "project-status", "targets": [ 0 ] },
			// 			{ className: "project-title", "targets": [ 1 ] },
			// 			{ className: "project-people", "targets": [ 2 ] },
			// 			{ className: "project-actions", "targets": [ 3 ] }
			// 		],
			// 	    columns: [
			// 	        {data: "",
			// 	            render: function ( data, type, full ){
			// 					var status = "<span class='label label-primary'>Active</span>";
			// 					var applicationexpiry = new Date(full[0][3]), now = new Date();

			// 					if(applicationexpiry<now){
			// 						status = "<span class='label label-danger'>Inactive</span>";
			// 					}
			// 	                return status;
			// 	            }
			// 	        },
			// 	        {data: "",
			// 	            render: function ( data, type, full ){
			// 	            	var details = "<a>"+full[0][4]+"</a><br><small>"+full[0][2]+"</small><br/>";
			// 	                return details;
			// 	            }
			// 	        },
			// 	        {data: "",
			// 	            render: function ( data, type, full ){
			// 	            	var details = "";
			// 					if(full[1].length>0){
			// 						$.each(full[1],function(i,v){
			// 							var data_applicants = JSON.parse(v[2]);
			// 							if(i<4){
			// 				            	details += "<img alt='image' class='img-circle' src='"+mainProcess.get_apr(data_applicants[2])+"' style='margin-right: 5px;'>";
			// 							}
			// 							else{
			// 								var count = full[1].length-i;
			// 								console.log(i);
			// 								if(i>13)
			// 									count = 9+"+";

			// 				            	details += "<div class='vertical-timeline-icon blue-bg pull-right' style='position: relative;width: 32px !important;height: 32px !important;border: 3px solid #1C84C6;'>"+
			// 											"    <h3>"+count+"</h3>"+
			// 											"</div>";
			// 								return false;
			// 							}
			// 						});
			// 					}
			// 					else{
			// 						details = "No Applicant";
			// 					}
			// 	                return details;
			// 	            }
			// 	        },
			// 	        {data: "",
			// 	            render: function ( data, type, full ){
			// 	            	var details = "<a href='#cmd=index;content=job;id="+full[0][0]+"' class='btn btn-white btn-xs btn-block'>Details</a>";
			// 	                return details;
			// 	            }
			// 	        },
			// 	    ]
			// 	});
			// }
			// $(".prettydate").prettydate({
			//     dateFormat: "YYYY-MM-DD hh:mm:ss"
			// });			//ajax.success(function(data){});
        },
	}
}();