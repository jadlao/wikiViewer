$(document).ready(function(){
    var searchForm = $('#wikiSearch'),
        searchValue = $('#wikiSearch :input')[0];
    
    searchForm.submit(function(e){
        e.preventDefault();
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
            url: ('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=search&pageids=10&srsearch='+searchTerm+'&srprop=snippet'),
            dataType: 'jsonp'
        })
        .done(function(data){
            // test if data is grabbed successfully
            //console.log(data);
            var articleListContainer = $('.articleContainer');
            // empty array each time search is submitted
            articleListContainer.empty();
            displayArticleList(data.query.search);
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
function displayArticleList(articleList){
    var articleListContainer = $('.articleContainer');
        
    articleList.forEach(function(article){
        articleListContainer.append(articleElement(article));
    });
};

// Pull articles from list
function articleElement(article){
    console.log(article);
    
    var articleElement = $('<div class="media"><div class="media-title"></div><div class="media-text"></div></div>')
    
    var title = $('<h2></h2>')
    var snippet = $('<p></p>')
    var pagelink = $('<br><a href=""><h4>Read more here</h4></a>')
    
    title.text(article.title)
    snippet.html(article.snippet)
    pagelink.attr('href', 'https://en.wikipedia.org/?curid=' + article.pageid)
    //console.log(article.title, article.snippet, article.pagelink);
    
    articleElement
        .find('.media-title')
            .append(title)
    articleElement
        .find('.media-text')
            .append(snippet)
            .append(pagelink)
    
    //console.log(articleElement);
        
    return articleElement
};