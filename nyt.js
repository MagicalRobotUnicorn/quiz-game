$('#submit-btn').on('click', function() {
  var searchTerms = $(#search-term).val();
  var pubYear = $('#pub-year').val();

  displaySearchResults(searchTerms, pubYear);
});


function displaySearchResults(searchTerms, pubYear) {
  var apiKey = R6lkBdAGLKbpDNgCbJLyPuWOCHXGyaal;

  var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerms + '&api-key=' +  apiKey + '&pubyear=' + pubYear;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var responseText;

    for (var i = 0; i < response.length(); i++){
      responseText += response.docs[i].web-url + "<br />";
    }
    $('#top-articles').html((responseText));
  });
}