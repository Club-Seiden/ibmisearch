function doSearch(searchValue) {
  clearItems();
  searchValue = searchValue.trim();

  if (searchValue.length) {
    let searchValueUpper = searchValue.toUpperCase().split(" ");

    console.log("search val: " + searchValue);
    console.log(searchValueUpper);

    let count = 0;

    for (let i = entries.length - 1; i >= 0 && count < 20; i--) {
      let matchLink = (match = entries[i].link.indexOf(searchValue) >= 0);
      let matchSearchText = false;

      if (!matchLink) {
        matchSearchText = true;
        for (let y = 0; matchSearchText && y < searchValueUpper.length; y++) {
          let searchText = entries[i].title + " " + entries[i].keywords;

          matchSearchText =
            matchSearchText &&
            searchText.toUpperCase().indexOf(searchValueUpper[y]) >= 0;
        }
      }

      if (matchLink || matchSearchText) {
        addItem(entries[i]);
        count++;
      }
    }
  } else {
    populateNewest();
  }
}

function clearItems() {
  $("#listing").empty();
}

function populateNewest() {
  var count = 0;
  for (var i = entries.length - 1; i >= 0 && count <= 5; i--) {
    addItem(entries[i]);
    count++;
  }
}

function populateAll() {
  clearItems();
  for (var i = entries.length - 1; i >= 0; i--) {
    addItem(entries[i]);
  }
}

function addItem(entry) {
  var html = '<a target="_blank" href="' + entry.link + '"><li><p>';

  html += '<span id="title">' + entry.title + "</span>";
  html += entry.link;

  html += "</p></li></a>";

  $("#listing").append(html);
}

function quickSearch(element) {
  var button = $(element).text();
  var search = "";

  switch (button) {
    case "ibmi":
      search = "IBM i documentation";
      break;

    case "db2":
      search = "db2 for i";
      break;

    case "rpg":
      search = "rpg tutorial";
      break;

    case "php":
      search = "php tutorial";
      break;

    case "node.js":
      search = "node.js tutorial";
      break;

    case "pase":
      search = "pase tutorial";
      break;

    case "editors":
      search = "editor";
      break;
  }

  $("#search").val(search);
  doSearch($("#search").val());
}

$("#search").on("change paste input", function () {
  doSearch($("#search").val());
});

$("#show-all").on("click", function () {
  $("#search").val("");
  populateAll();
});

document.getElementById("search").focus();
populateNewest();
$("#indexsize").text(entries.length);

$("body").fadeIn("slow", function () {
  // Animation complete
});
