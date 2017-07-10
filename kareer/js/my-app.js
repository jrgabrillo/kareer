var myApp = new Framework7();
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});
// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7();
 
// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});
 
// Now we need to run the code that will be executed only for About page.
 
// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
  // Do something here for "about" page
  
})
 
// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
  // Get page data from event data
  var page = e.detail.page;
  
  if (page.name === 'about') {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
  }
})
 
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
  // Following code will be executed for page with data-page attribute equal to "about"
  myApp.alert('Here comes About page');
})

var myApp = new Framework7();
var $$ = Dom7;
 
var mainView = myApp.addView('.view-main');
 
myApp.onPageInit('login-screen', function (page) {
  var pageContainer = $$(page.container);
  pageContainer.find('.list-button').on('click', function () {
    var username = pageContainer.find('input[name="username"]').val();
    var password = pageContainer.find('input[name="password"]').val();
    // Handle username and password
    myApp.alert('Username: ' + username + ', Password: ' + password, function () {
      mainView.goBack();
    });
  });
});

// swipe
 var myApp = new Framework7();

         var mySwiper = myApp.swiper('.swiper-container', {
            pagination:'.swiper-pagination',
            spaceBetween: 100
         });

 var myApp = new Framework7();
         var mainView = myApp.addView('.view-main');

  // Here you can initialize the app
         var myApp = new Framework7();

         // If your using custom DOM library, then save it to $$ variable
         var $$ = Dom7;

         // Add the view
         var mainView = myApp.addView('.view-main', {
            // enable the dynamic navbar for this view:
            dynamicNavbar: true
         });

         $$('.confirm-ok').on('click', function () {
            myApp.confirm('Are you ready to begin?', function () {
               myApp.alert('You have clicked the Ok button!!!');
            });
         });
     var myApp = new Framework7();
 
    var $$ = Dom7;
 
    $$('.open-left-panel').on('click', function (e) {
        // 'left' position to open Left panel
        myApp.openPanel('left');
    });
 
    $$('.open-right-panel').on('click', function (e) {
        // 'right' position to open Right panel
        myApp.openPanel('right');
    });
 
    $$('.panel-close').on('click', function (e) {
        myApp.closePanel();
    });



    var calendarDefault = myApp.calendar({
    input: '#calendar-default',
});          
 