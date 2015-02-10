# Layout

The app will be a single page application build with Backbone.

The Symfony backend provides a few routes to create/read/update and delete models. The data that is send between front 
and backend is in json.

## The list
To display a list of a model, the following is done:

- the name of the model must be present
- there is a view object listening to add/remove events of the collection object
- get the models from the server by doing a get request from a Backbone collection, providing the name of the model
- the symfony controller does a simple getAll for the model
- the models are tranformed to json, for a model a json converter can be created
- the Backbone collection object receives the server response and parses the data
- the view creates a child view class (view factory) based on the structure of a single model
- the view creates child views on each add event it receives from the collection


## Random thoughts
A json converter must be used to transform relations (many to one etc).
How to customize forms and override generic behavior?