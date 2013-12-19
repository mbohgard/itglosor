console.log('Initializing...');

requirejs.config({
    paths: {
        app: 'src/js/app',
        lib: 'src/js/lib'
    },
    shim: {
        'plugins': ['lib/jquery']
    }
});

require([
    "app/PageLoader",
    "app/Topbar",
    "app/MainNav",
    "app/BigInput",
    "app/WordList",
    "app/Contribute",
    "app/Tooltip",
    "app/plugins"], function(PageLoader, Topbar, MainNav, BigInput, WordList, Contribute) {

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
