requirejs.config({
	shim: {
		'plugins': ['lib/jquery']
	}
});

require([
	"PageLoader",
	"Topbar",
	"MainNav",
	"BigInput",
	"WordList",
	"Contribute",
	"Tooltip",
	"plugins"], function(PageLoader, Topbar, MainNav, BigInput, WordList, Contribute) {

	Topbar.init({
		header: $('.header'),
		hiddenInfo: $('.hidden-info')
	});

	MainNav.init({
		mainNav: $('.main-nav')
	});

	BigInput.init({
		bigInput: $('.big-input')
	});

	WordList.init({
		wordList: $('.word-list'),
		backLink: $('.search-back')
	});

	Contribute.init({
		contribute: $('.contribute')
	});

	$(document).ready(function() {
		PageLoader.init({
			pages: {
				search: $('.word-list'),
				request: $('.request-info'),
				contribute: $('.contribute')
			}
		});
	});
});
