class Image:
    def __init__(self):
        self.object_number = 0
        self.id = "<id>"
        self.longTitle = "<title, artist, year>" # can be split later to gather useful info,
        self.url = "<https://hl3........>"
        self.productionPlaces = [] #"<[List of places]>"

        # Type defined by algo
        self.type = '' 

        # All following data can be requested through collection details API / Requires a different API request through each object number
        self.titles = [] #"<[list of titles]>"
        self.description = '<description>'

        # Additionally:
        self.ref = "<local location of image file related to all data; should be sth like img_number.jpg>"

        # If my idea of the algorithm work, each image should also hold a list of object links
        self.objectLinks = [] #<potentially object type names or ids>

        # This should come from the algorithm at some point
        self.objects = {} # {<object type name or id>: }
        {
            # type
            # coordinates
        }