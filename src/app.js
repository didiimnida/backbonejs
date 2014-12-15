// insert your new code here

var areGirlDevelopersCool = true; 

//Make a Person model. Add defaults, initialize conditions and methods. 
var Person = Backbone.Model.extend({
	defaults: {
    role: "student",
	imgUrl: "http://placepuppy.it/200/200", 
	firstName: '',
	lastName: ''},
	initialize: function() {
    	this.generateUserName();
  	},
	generateUserName: function(){
		var userName = this.get('firstName').concat(this.get('lastName'));
		this.set('userName', userName);
		return userName;
	}
});

//Instanciate a Person object. 
var person = new Person({
	firstName: "Grace",
    lastName: "Hopper",
    role: "Computer Scientist"
    //,
    //imgUrl: "http://www.history.navy.mil/photos/images/h96000/h96920k.jpg"
    });

//Make a Collection of Person Models. 
var People = Backbone.Collection.extend({
	model: Person,
	comparator: function(model) {
    	return model.get("lastName").toLowerCase();
  	}
});

//Instanciate a collection without any models:
//var people = new People();

//Instanciate a bunch of Person model objects to add to the People collection. 
var diana = new Person({
	firstName: "Diana", 
	lastName: "Hilton"}
);
var hari = new Person({
	firstName: "Hari", 
	lastName: "Viswanathan"}
);
var amanda = new Person({
	firstName: "Amanda", 
	lastName: "Smith"}
);
//Instanciate a People collection.
var people = new People([diana, hari, amanda]);

//Make another Person model object. 
var kyle = new Person({
	firstName: "Kyle", 
	lastName: "Hill"}
);

//Add it to the already existing collection using add. 
people.add(kyle);

//Make a View for handling person.  
var PersonView = Backbone.View.extend({
	className: "rolodex",
	render: function(){
	 	var imgUrl = this.model.get('imgUrl');
    	var newNode = $('<img src="' + imgUrl + '">');
    	this.$el.append(newNode);
    	return this;
	 },
	events: {
    'click' : 'onClick'
  	},
  	onClick: function(e) {
  		//What do you want to happen here?  
 	}
});

//Instanciate the view.  
var personView = new PersonView({
	model: person
});

$(document).ready(function() {
	$('body').append(personView.render().$el);
});


