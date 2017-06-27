/////////////////////////////
// Written by: Ilan Patao //
// ilan@dangerstudio.com //
//////////////////////////

// Request function to fire on textbox input change
jQuery('#creditsearch').on('input', function() {
// Clear the search results for a new search
$("#searchresults").empty();
// Store search term in variable
var term = $("#creditsearch").val();
// Build the request
var proxifyer = "https://proxifyer.herokuapp.com/";
var url = proxifyer + "https://www.credit.com/credit/api/creditcard/v2/offer?dest=organic&af=32806&cl=FC&ct=PT&limit=100&format=json";
		// Request the data
		$.get(url, function (creditdata) {
		// Store the data in a new variable
		var data = creditdata;
		// Go through the data and return results back to the searchdata div
		$.each(data.cards, function(i, obj) {
		// Store the data in seperate variables
		var name = data.cards[i].name;
		var url = data.cards[i].links.LinkUrl;
		var issuer = data.cards[i].attributes.issuer;
		var meta = data.cards[i].attributes.metaDescription;
		var apr = data.cards[i].displayElements.introApr;
		// Append results to the list
		$("#searchresults").append('<li style="margin: 10px 0;"><h4 style="display:inline;margin-left:10px;"><i class="fa fa-credit-card" aria-hidden="true"></i>&nbsp; <a href="' + url + '" target="_new" data-toggle="popover" data-placement="top" data-trigger="hover" title="' + name + '" data-content="Data returned for: ' + name + ' issed by: ' + issuer + ': ' + meta +' ' + apr + '">' + name + '</a></h4><br><li><small>' + meta + '</small></li><hr></li>');
		});
		// Initialize popoever
		$('[data-toggle="popover"]').popover(); 
		// Output Json Preview
    	var json = JSON.stringify(data);
		$("#jsonresults").val(json);
	});
});