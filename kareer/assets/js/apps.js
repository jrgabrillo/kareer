var App = function () {
    "use strict";
    return {
        init: function(){
            this.initAjaxFunction();
        },
        initAjaxFunction: function(){
            this.handleCheckPageLoadUrl(window.location.hash);
            this.handleHashChange();
            $.ajax({
                cache: false
            });
        },
        handleCheckPageLoadUrl: function(hash){
            var func = this;
            hash = (hash) ? hash : '#cmd=index';
            $('.sidebar [href="'+hash+'"][data-toggle=ajax]').trigger('click');
            func.handleLoadPage(hash);
        },
        handleHashChange: function(){
            var func = this;
            $(window).on('hashchange',function() {
                if(window.location.hash) {
                    console.log("x");
                    func.handleLoadPage(window.location.hash);
                }
            });
        },
        handleLoadPage: function(hash){
            var node = localStorage.getItem('hash');
            var newhash = hash.split(';');

            if((node == null) || (node == 'null')){
                $(location).attr('href','../');                         
            }

            var targetUrl = newhash[0].replace('#cmd=','../pages/'+node+'/')+".html";
            var content = system.html(targetUrl);
            content.done(function(data){
                $('#content').html(data);                    
                var navigation = system.ajax('../pages/'+node+'/nav.html',"");
                $("nav").html(navigation.responseText);                    

                if(newhash.length>1){
                    targetUrl = newhash[1].replace('content=','../pages/'+node+'/')+".html";
                }
                else{
                    newhash.push('content=account');
                    targetUrl = newhash[1].replace('content=','../pages/'+node+'/')+".html";
                }

                var subcontent = system.html(targetUrl);

                subcontent.done(function(data){
                    console.log(targetUrl);
                    $('#subcontent').html(data);
                });

                subcontent.fail(function(data){
                    var data = system.xml("pages.xml");
                    $(data.responseText).find("errorContent").each(function(i,error){
                        $('#subcontent').html(error);
                    });
                })

                $('html, body').animate({
                    scrollTop: $("body").offset().top
                }, 250);
            });

            content.fail(function(data){
                var data = system.xml("pages.xml");
                $(data.responseText).find("errorPage").each(function(i,error){
                    $('#content').html(error);
                });
            })

            $('.material-tooltip').hide();
        },
        hashchange:function(){

        },
    };
}();