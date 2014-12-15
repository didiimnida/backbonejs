// insert your new code here

var areGirlDevelopersCool = true; 

//MODEL: Make a Person model. Add defaults, initialize conditions and methods. 
var Person = Backbone.Model.extend({
	defaults: {
    role: "student",
	imgUrl: "http://placekitten.com/g/200/200", 
	firstName: '',
	urlRoot: 'http://gdibb.herokuapp.com/people',
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

//COLLECTION: Make a Collection of Person Models. 
var People = Backbone.Collection.extend({
	model: Person,
	url: "http://gdibb.herokuapp.com/people",
	comparator: function(model) {
    	return model.get("lastName").toLowerCase();
  	}
});

//DATA: 

//Test: Instanciate a Person object. 
var person = new Person();

//Test: Instanciate a collection without any models.
//var people = new People();


//Instanciate some Person model objects to add to the People collection. 
var diana = new Person({
	firstName: "Tommy", 
	lastName: "Pickles"}
);
var hari = new Person({
	firstName: "Penny", 
	lastName: "Lane"}
);
var amanda = new Person({
	firstName: "John", 
	lastName: "Smith"}
);

//Instanciate a People collection.
var people = new People([diana, hari, amanda]);

//Make another Person model object. 
var kyle = new Person({
	firstName: "George", 
	lastName: "Washington", 
	id: 222222}
);

//Test add(): Add it to the already existing collection using add. 
people.add(kyle);


//MODEL VIEW:
//Make a View for handling a person.  
var PersonView = Backbone.View.extend({
	events: {
    'click' : 'onClick'
  	},
  	onClick: function(e) {
  		//What do you want to happen here?  
 	},
	className: "rolodex",
	render: function(){
	 	var imgUrl = this.model.get('imgUrl');
   		var newNode = $('<img src="' + imgUrl + '">');
    	this.$el.append(newNode);
    	return this;
	 }
});

//Instanciate the person view. 
var personView = new PersonView({
	model: person
});

//COLLECTION VIEW:
//Make a view for handling a collection of persons. 
var RolodexView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'change', this.render)
		//this.fetch();
	},
	className: "rolodex",
	render: function(){
		var template = Handlebars.compile($("#rolodex-template").html());
    	var rendered = template({people: this.collection.toJSON()});
    	this.$el.append(rendered);
    	return this;
	 }
});

//Instanciate the view for a collection.  
var rolodexView = new RolodexView({
	collection: people
});

//Page load.  
$(document).ready(function(){
	$('body').append(rolodexView.render().$el);
});

