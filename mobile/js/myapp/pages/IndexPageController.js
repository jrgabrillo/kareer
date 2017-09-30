/*jslint browser: true*/
/*global console*/
var myapp = myapp || {};
myapp.pages = myapp.pages || {};
myapp.pages.IndexPageController = function(myapp, $$) {
    'use strict';
    var bg = 'img/img-bg.jpg';
    var logo = 'img/kl.png';
    bg = (localStorage.getItem('bg') != null) ? localStorage.getItem('bg') : bg;
    logo = (localStorage.getItem('logo') != null) ? localStorage.getItem('logo') : logo;
    (function() {
        var options = {
                bgcolor: "transparent",
                fontcolor: '#000',
                onOpened: function() {
                    $$('a[data-cmd="never-show-welcome-screen"]').on('click', function(e) {
                        welcomescreen.close();
                        $$(this).attr("style", "opacity:0.5;");
                        localStorage.setItem('welcome-screen-status', false);
                    });
                },
                onClosed: function() {
                    // console.log("welcome screen closed");
                }
            },
            welcomescreen_slides = [{
                id: 'slide0',
                picture: '<div class="tutorialicon"><img width="200px" src="' + logo + '"/></div>',
                text: '<div class="progressbar-infinite color-teal"></div>'
            }],
            welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);
        var welcomeScreen = localStorage.getItem('welcome-screen-status');
        welcomeScreen = (welcomeScreen == null) ? true : welcomeScreen;
        if ((welcomeScreen == 'false')) {
            welcomescreen.close();
        }
        setTimeout(function(){
            $$(".page").removeClass('hidden');
            welcomescreen.close();
        },3000); //3000
    }());
};