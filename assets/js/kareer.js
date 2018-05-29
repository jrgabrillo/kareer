require.config({
	baseUrl:'assets/js',
	paths:{
		jquery:'jquery',
		material:'materialize.min',
		scroll:'scroll.min',
		// jqueryui:'jquery-ui.min',
		validation:'validation/jquery.validate.min',
		validate:'validation/additional-methods.min',
		process:'process',
		main:'main',
		system:'system',
	}
});

define(['jquery','material','scroll','validation','validate','process','main','system'],function(){
	// system.loadCss('assets/css/original.materialize.min.css');
	// system.loadCss('assets/css/custom.css');
	// system.loadCss('assets/css/style.css');
	// system.loadCss('assets/css/animate.css');

	system.ini();
})