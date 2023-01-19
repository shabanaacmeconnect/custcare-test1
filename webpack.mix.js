const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("assets/src/js/app.js", "assets/dist/js")
    .js("assets/src/js/ckeditor-classic.js", "assets/dist/js")
    .js("assets/src/js/ckeditor-inline.js", "assets/dist/js")
    .js("assets/src/js/ckeditor-balloon.js", "assets/dist/js")
    .js("assets/src/js/ckeditor-balloon-block.js", "assets/dist/js")
    .js("assets/src/js/ckeditor-document.js", "assets/dist/js")
    .css("assets/dist/css/_app.css", "assets/dist/css/app.css")
    .options({
        processCssUrls: false,
    })
    .copyDirectory("assets/src/json", "assets/dist/json")
    .copyDirectory("assets/src/fonts", "assets/dist/fonts")
    .copyDirectory("assets/src/images", "assets/dist/images");
