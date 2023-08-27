$(function () {
  $("#search-form").on("keyup", () => $("#search-form").trigger("submit"));

  $("#search-form").on("submit", function (e) {
    e.preventDefault();
    searchFetch();
  });
});

function searchFetch() {
  let searchVal = $("#search-form input").val();
  if (searchVal.length < 2) {
    $("#searchResContent").html(`
    <li class='error'>2 or more characters required</li>
    `);
    return;
  }

  $.ajax({
    method: "GET",
    url: "../src/search.php",
    type: "json",
    dataType: "json",
    data: {
      q: searchVal,
    },
    success: function (response, textStatus, jqXHR) {
      let newContent = "";
      response.forEach((ele, i) => {
        let url = `./product.php?id=${ele["id"]}`;
        newContent += `
            <li><a class="searchLink searchResLink" tabindex="-1" href="${url}">${ele["name"]}</a></li>
          `;
      });
      $("#searchResContent").html(newContent);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      switch (`${jqXHR.status}`[0]) {
        case "4":
          $("#searchResContent").html(`
          <li class='error'>No results Found</li>
          `);
          break;
        case "5":
          $("#searchResContent").html(`
          <li class='error'>Server Error !</li>
          `);
          break;
      }
    },
  });
}
