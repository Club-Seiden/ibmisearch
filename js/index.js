  function doSearch(searchValue) {
    clearItems();
    searchValue = searchValue.trim();
    
    if (searchValue.length > 0) {
      var searchValueUpper = searchValue.toUpperCase().split(' ');
      
      console.log('search val: ' + searchValue);
      console.log(searchValueUpper);
      
      var count = 0;
      var match = true;
      
      for(var i = (entries.length-1); i >= 0 && count < 20; i--) {
        match = true;
        
        for(var y = 0; y < searchValueUpper.length; y++) {
          if ((entries[i].title.toUpperCase().indexOf(searchValueUpper[y]) >= 0)) {
            //Keyword looking good
          } else {
            match = false;
          }
        }
        
        if (match === true) {
          addItem(entries[i]); 
          count++;
          continue;
        }
        
        else if (entries[i].link.indexOf(searchValue) >= 0) {
          addItem(entries[i]);
          count++;
          continue;
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
    for(var i = (entries.length-1); i >= 0 && count <= 5; i--) {
      addItem(entries[i]); 
      count++;
    }
  }
  
  function addItem(entry) {
    var html = "<a target=\"_blank\" href=\"" + entry.link + "\"><li><p>";
    
    html += "<span id=\"title\">" + entry.title + "</span>";
    html += entry.link;
    
    html += "</p></li></a>";
    
    $( "#listing" ).append(html);
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
    
    $('#search').val(search);
    doSearch($('#search').val());
  }
  
  $("#search").on('change paste input', function(){
    doSearch($('#search').val());
  });
  
  document.getElementById("search").focus();
  populateNewest();
  $('#indexsize').text(entries.length)