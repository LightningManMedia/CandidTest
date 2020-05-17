$(document).ready(function () {
  const results = $('.search-results');
  const resultsTitle = $('.results-title');
  $('#search-form').on('submit', function (e) {
    const value = $('#search').val();
    //empty search results on submit so new results can be displayed
    resultsTitle.empty();
    results.empty();
    //don't reload the page
    e.preventDefault();
    //ajax request to collect our search results
    $.ajax({
      type: 'GET',
      url: './search.php',
      data: { name: value },
      success: function (obj) {
        let funderData = JSON.parse(obj);
        console.log(funderData);
        //if there's no results for a search, tell the user
        if (funderData.length === 0) {
          resultsTitle.append(
            '<h4>No results found for: "' +
              value +
              '." Please try a different search.</h4>'
          );
        }
        //otherwise show the search results from our ajax call
        else {
          resultsTitle.append('<h4>Search Results for "' + value + '" </h4>');
          $.each(funderData, function (index, value) {
            console.log(
              'url= ' + value[0] + ' name= ' + value[1] + ' amount= ' + value[2]
            );
            if (value[0] === null) {
              value[0] = '#';
            }
            const formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            });
            //display formatted results on the frontend
            results.append(
              '<div class="row"><div class="col-6"><a href=' +
                value[0] +
                ' target="_blank">' +
                value[1] +
                '</a></div><div class="col-6 text-right">Annual Funding: ' +
                formatter.format(value[2]) +
                '</div></div><br></br>'
            );
          });
        }
      },
    });
  });
  //post request to collect data for our autocomplete array
  $.post('./search.php', { autocomplete: 'autocomplete' }, function (data) {
    let namesArr = JSON.parse(data);
    console.log(namesArr);
    $('#search').autocomplete({
      minLength: 3,
      source: function (request, response) {
        let results = $.ui.autocomplete.filter(namesArr, request.term);
        response(results.slice(0, 5));
      },
    });
  });
});
