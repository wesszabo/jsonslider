# JSONslider
JSONslider is a simple jQuery slider for pictures stored dynamically in a JSON file you can edit without messing up your HTML.

## SET UP

### 1 - Set up the JSON file
The JSON file must have at least these names and values:

    { "pictures": [
      {
        "url" : "path-to-picture-1",
        "alt" : "A little description"
      }
    ] }

### 2 - Set HTML tag
Give a unique ID or a class to an empty `<div>` in your `HTML`, embed the json file in the data attr and set the desired aspect-ratio:

  <div id="slider-1" data-json="resources/store.json" data-aspect-ratio="16:9"></div>

### 3 - Run the function
This is an example of how the function must be called with all available options.

    $( document ).ready(function() {
      	$( '#slider' ).jsonSlider();
    });
