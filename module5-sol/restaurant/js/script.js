$(function () { // Same as document.addEventListener("DOMContentLoaded"...


    // Same as document.querySelector("#navbarToggle").addEventListener("blur",...

    //bcz button not collapse menu if we click anywhere 
    $("#navbarToggle").blur(function (event) {
        var screenWidth = window.innerWidth;
        // checking if we are on that screen size where that shows up
        if (screenWidth < 768) {
            $("#collapsable-nav").collapse('hide');
        }
    });
});


(function (global) {

    var dc = {};
    var homeHtml = "snippets/home-snippet.html";
  

    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };


    // Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };

    // Return substitute of '{{propName}}'
    // with propValue in given 'string'

    


    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {
        // On first load, show home view
        showLoading("#main-content");
        //url=fomehtml where the page is define , false mean not preprocess as json 
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            },
            false);
    });


   




    // $dc name with which we expose it to other script
    global.$dc = dc;

})(window);
