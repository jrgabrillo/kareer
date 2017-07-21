var App = function () {
    "use strict";
    return {
        handleCheckPageLoadUrl: function(hash){
            var func = this;
            hash = (hash) ? hash : '#cmd=index';
            $('.sidebar [href="'+hash+'"][data-toggle=ajax]').trigger('click');
            func.handleLoadPage(hash);
        },
        handleHashChange: function(){
            var func = this;
            $(window).on('hashchange',function() {
                if (window.location.hash) {
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

            $('.jvectormap-label, .jvector-label, .AutoFill_border ,#gritter-notice-wrapper, .ui-autocomplete, .colorpicker, .FixedHeader_Header, .FixedHeader_Cloned .lightboxOverlay, .lightbox').remove();

            var content = system.html(targetUrl);
            content.done(function(data){
                $('#content').html(data);
                $('#content').addClass('animated zoomIn');
                var navigation = system.ajax('../pages/'+node+'/nav.html',"");
                $("#navigation").html(navigation.responseText);                    
                $(".collapsible").collapsible({accordion:!1});

                if(newhash.length>1){
                    targetUrl = newhash[1].replace('content=','../pages/'+node+'/')+".html";
                }
                else{
                    newhash.push('content=account');
                    targetUrl = newhash[1].replace('content=','../pages/'+node+'/')+".html";
                }

                var subcontent = system.html(targetUrl);
                subcontent.done(function(data){
                    $('#subcontent').html(data);
                    $("a").parent('li').removeClass("active");
                    $("a[href='"+hash+"']").parent('li').addClass("active");
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
        init: function(){
            this.initAjaxFunction();
            $("#page-top").removeClass('boxed-layout');
        },
        initAjaxFunction: function(){
            this.handleCheckPageLoadUrl(window.location.hash);
            this.handleHashChange();
            $.ajax({
                cache: false
            });
        },
    };
}();