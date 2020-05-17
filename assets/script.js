$(document).ready(function () {
  const results = $(".search-results");
  const resultsTitle = $(".results-title");
  $("#search-form").on("submit", function (e) {
    const value = $("#search").val();
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "./search.php",
      data: { name: value },
      success: function (obj) {
        console.log(obj);
        if (obj === "") {
          resultsTitle.append(
            "<h4>No results found for: " +
              value +
              ". Please try a different search.</h4>"
          );
        } else {
          results.append(obj);
        }
      },
    });
  });
  $.post("./search.php", { autocomplete: "autocomplete" }, function (data) {
    let namesArr = JSON.parse(data);
    console.log(namesArr);
    $("#search").autocomplete({
      minLength: 3,
      source: function (request, response) {
        let results = $.ui.autocomplete.filter(namesArr, request.term);
        response(results.slice(0, 5));
      },
    });
  });
});
