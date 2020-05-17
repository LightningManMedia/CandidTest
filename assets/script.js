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
        let funderData = JSON.parse(obj);
        console.log(funderData);
        if (funderData.length === 0) {
          resultsTitle.empty();
          resultsTitle.append(
            "<h4>No results found for: " +
              value +
              ". Please try a different search.</h4>"
          );
        } else {
          results.empty();
          $.each(funderData, function (index, value) {
            console.log(
              "url= " + value[0] + " name= " + value[1] + " amount= " + value[2]
            );
            if (value[0] === null) {
              value[0] = "#";
            }
            const formatter = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            });

            results.append(
              '<div class="row"><div class="col-6"><a href=' +
                value[0] +
                ' target="_blank">' +
                value[1] +
                '</a></div><div class="col-6 text-right">Annual Funding: ' +
                formatter.format(value[2]) +
                "</div></div><br></br>"
            );
          });
          //   });
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
