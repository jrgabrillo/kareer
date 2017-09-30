var app = new Framework7({material:true});
var $$ = Dom7;
var mainView = app.addView('.view-main', {
    dynamicNavbar: true
});

app.onPageInit('about', function(page) {})
$$(document).on('pageInit', function(e) {
    var page = e.detail.page;
    if (page.name === 'about') {
        app.alert('Here comes About page');
    }
});

$$(document).on('pageInit', '.page[data-page="about"]', function(e) {
    app.alert('Here comes About page');
});

app.onPageInit('login-screen', function(page) {
    var pageContainer = $$(page.container);
    pageContainer.find('.list-button').on('click', function() {
        var username = pageContainer.find('input[name="username"]').val();
        var password = pageContainer.find('input[name="password"]').val();
        app.alert('Username: ' + username + ', Password: ' + password, function() {
            mainView.goBack();
        });
    });
});

var mySwiper = app.swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    spaceBetween: 100
});

$$('.open-left-panel').on('click', function(e) {
    app.openPanel('left');
});

$$('.open-right-panel').on('click', function(e) {
    app.openPanel('right');
});

$$('.panel-close').on('click', function(e) {
    app.closePanel();
});

var calendarDefault = app.calendar({
    input: '#calendar-default',
});

$$('.popup-sign-up, .popup-login').on('popup:open',function(){
    $$("#displayLogo").attr({"style":"position:relative; top:-200px;"});
}).on('popup:close',function(){
    $$("#displayLogo").attr({"style":"position:relative; top:0px;"});
}); 
