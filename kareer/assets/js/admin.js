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
        }
    };
}();
