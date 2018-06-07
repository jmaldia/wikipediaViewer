$(document).ready(function() {
    const $container = $('.container');
    let keyword, pageId, title, snippet;

    // LISTENS FOR BUTTON CLICK AND GETS WIKI JSON
    $('#btn-search').click(function(event) {
      event.preventDefault();
      
      keyword = encodeURIComponent($('#keyword').val());

      $.getJSON(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&utf8=1&srsearch=${keyword}&imlimit=12`).done(handleRequest).fail(handleError);
    });

    // GRABS THE JSON OBJECT FROM WIKIPEDIA
    function handleRequest(response) {
      // Remove existing elements
      $container.empty();
      // Append all data to 
      for (let x = 0; x < 12; x++) {
        pageId = JSON.stringify(response.query.search[x].pageid).replace(/"/g,'');
        title = JSON.stringify(response.query.search[x].title).replace(/"/g,'');
        snippet = JSON.stringify(response.query.search[x].snippet).replace(/"/g,'');

        $container.append(
          `
          <div class="card">
            <div class="description">
              <h4>${title}</h4>
              <p>${snippet}</p>
            </div>
            <div class="link">
              <a href="https://en.wikipedia.org/?curid=${pageId}" target="_blank">
                click here for more info  
              </a>
            </div>
          </div>
          `
        );
      }

    }

    // ERROR HANDLER
    function handleError(jqxhr, textStatus, err) {
      console.log("Request Failed: " + textStatus + ", " + err);
    }
});