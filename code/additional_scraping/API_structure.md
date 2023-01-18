#### Possible API Structure

This is how I envision the Data Strucuture for our database; feel free to make changes or propose a more useful structure. I am not sure if this is useful, this is just a structure I can image to use for to create my program.

```
{<object number>: {
    "id":<id>,
    "longTitle":<title, artist, year>,  // can be split later to gather useful info,
    "url":<https://hl3........>,
    "productionPlaces":<[List of places]>,

    // All following data can be requested through collection details API / Requires a different API request through each object number
    "titles":<[list of titles]>,
    "description":<description>,

    // Additionally:
    "ref": <local location of image file related to all data; should be sth like img_number.jpg>,

    // If my idea of the algorithm work, each image should also hold a list of object links
    "objectLinks":[<potentially object type names or ids>],

    // This should come from the algorithm at some point
    "objects": {<object type name or id>: coordinates},
    "type" : <type>

    },
<object number>: {
    "id": ...,
    ...,
    },
...
}
```

_everything named by string is intended to be exactly this string, everything written not as string should be some value of that kind_