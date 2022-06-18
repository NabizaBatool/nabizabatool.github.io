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
    var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";


  

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
    // g means replace it everywhere not the first tym u see it , {{ propName }} shows namespaces , string reprsent the entire code in snippet

    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        //flag g means replace eveywhere 
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    };



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

    // Load the menu categories view
    dc.loadMenuCategories = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            allCategoriesUrl,
            buildAndShowCategoriesHTML);
    };

 // Builds HTML for the categories page based on the data
 // from the server
 //categories contain all categories , it is passed as parameter 
    function buildAndShowCategoriesHTML(categories) {
        // Load title snippet of categories page
        $ajaxUtils.sendGetRequest(
            categoriesTitleHtml,
            function (categoriesTitleHtml) {
                // Retrieve single category snippet
                $ajaxUtils.sendGetRequest(
                    categoryHtml,
                    function (categoryHtml) {
                        var categoriesViewHtml =
                            buildCategoriesViewHtml(categories,
                                categoriesTitleHtml,
                                categoryHtml);
                        insertHtml("#main-content", categoriesViewHtml);
                    },
                    false);
            },
            false);
    }



    function buildCategoriesViewHtml(categories,
        categoriesTitleHtml,
        categoryHtml) {

        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class='row'>";

        // Loop over categories
        for (var i = 0; i < categories.length; i++) {
            // Insert category values
            var html = categoryHtml;
            var name = "" + categories[i].name;
            var short_name = categories[i].short_name;
            html = insertProperty(html, "name", name);
            html =
                insertProperty(html,
                    "short_name",
                    short_name);
            finalHtml += html;
        }

        finalHtml += "</section>";
        return finalHtml;
    }


    // $dc name with which we expose it to other script
    global.$dc = dc;

})(window);
