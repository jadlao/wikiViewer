$(document).ready(function(){
    var searchForm = $('#wikiSearch'),
        searchValue = $('#wikiSearch :input')[0];
    
    searchForm.submit(function(){
        event.preventDefault()
        callWikiApi(searchValue.value);
    });
});

// Call Wikipedia API
function callWikiApi(searchTerm){
    // Test if search term is being read
    //console.log(searchTerm);
    
    // AJAX call if searchTerm is present
    if(searchTerm){
        $.ajax({
            url: ('https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&origin=*&titles=' + searchTerm)
        })
        .done(function(data){
            // test if data is grabbed successfully
            console.log(data);
            var articleListContainer = $('.articleContainer');
            // empty array each time search is submitted
            articleListContainer.empty();
            prepareArticleList(data.query.pages);
        })
        .fail(function(err){
            console.log(err);
        })
        .always(function(){
            console.log('done');
        })
    }
};

// Prepare articles and print on screen
function prepareArticleList(articleList){
    var articleListContainer = $('.articleContainer');
    //console.log(articleList);
    
    articleList.forEach(function(article){
        console.log(article);
        articleListContainer.append(articleElement(article));
    })
};

// Pull articles from list
function articleElement(article){
    //console.log(article);
    
    var articleElement = $('<div class="media"></div>');
    
    var title = $('<h2></h2>');
    
    title.text(article.title);
    
    articleElement
        .find('.media')
            .append(title)
    
    return articleElement
};