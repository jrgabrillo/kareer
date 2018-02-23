var App = function () {
    "use strict";
    return {
        handleCheckPageLoadUrl: function(hash){
            hash = (hash) ? hash : '#cmd=index';
            $('.sidebar [href="'+hash+'"][data-toggle=ajax]').trigger('click');
            this.handleLoadPage(hash);
        },
        handleHashChange: function(){
            $(window).on('hashchange',function() {
                $(".side-nav").sideNav("hide");

                if (window.location.hash) {
                    $('#subcontent').html(`<div style='margin-top:25%; text-align: center;'>
                                            <div class='preloader-wrapper active'>
                                                <div class='spinner-layer spinner-green-only'>
                                                    <div class='circle-clipper left'>
                                                        <div class='circle'></div>
                                                    </div>
                                                    <div class='gap-patch'>
                                                        <div class='circle'></div>
                                                    </div>
                                                    <div class='circle-clipper right'>
                                                        <div class='circle'></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`);
                    setTimeout(function(){
                        App.handleLoadPage(window.location.hash);
                    },100);
                }
            });
        },
        handleLoadPage: function(hash){
            hash = ((hash != "#!") || (hash != "#"))?hash:"#cmd=index";
            var node = localStorage.getItem('hash');
            var newhash = hash.split(';');

            if((node == null) || (node == 'null')){
                $(location).attr('href','../');                         
            }

            var targetUrl = newhash[0].replace('#cmd=','../pages/'+node+'/')+".html";
            // $('.jvectormap-label, .jvector-label, .AutoFill_border ,#gritter-notice-wrapper, .ui-autocomplete, .colorpicker, .FixedHeader_Header, .FixedHeader_Cloned .lightboxOverlay, .lightbox').remove();

            var content = system.html(targetUrl);
            content.done(function(data){
                $('#content').html(data);
                $('#content').addClass('animated zoomIn');
                var navigation = system.ajax('../pages/'+node+'/nav.html',"");
                $("header").html(navigation.responseText);                    
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
                    $('.tooltipped').tooltip({delay: 50});
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
