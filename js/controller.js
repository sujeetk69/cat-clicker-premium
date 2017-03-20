// Model
var Cat = function(name, path) {
    this.name = name;
    this.imagePath = path;
    this.clickCount = 0;
}

//Sets the name and image path of the cat
Cat.prototype.setValues = function(name, path) {
    this.name = name;
    this.imagePath = path;
}

//Increment the click count of the cat
Cat.prototype.incCount = function() {
    this.clickCount++;
}

var Model = function() {
    this.allCats = new Array();
    this.currentCat = null;
}

Model.prototype.loadCats = function() {
    for (var i=0; i<50; i++) {
        var catIndex = ("00" + (i + 1)).slice(-2);
        var catName = "Cat" + catIndex;
        this.allCats[i] = new Cat(catName, "images\\" + catName + ".jpg");
    }
}


// View
var catListView = {
    init: function(){
        this.catListElem = document.getElementById("cat_list");
    },

    render: function() {
        var allCats = controller.getAllCats();
        allCats.forEach(function(cat) {
            var catListItem = document.createElement("div");
            catListItem.className = "cat_list_item";
            catListItem.innerHTML = cat.name;
            catListItem.onclick = function() {
                controller.setCurrentCat(cat);
            }
            console.log(this.catListElem);
            x= this.catListElem;
            this.catListElem = document.getElementById("cat_list");
            this.catListElem.appendChild(catListItem);
        });
    }
};

var catView = {
    init: function() {
        this.catNameElem = document.getElementById("cat_name");
        this.catImageElem = document.getElementById("cat_image");
        this.catImageElem.addEventListener("click", function() {
            controller.incClickCount();
        });
        this.catCountElem = document.getElementById("cat_count");
    },

    render: function() {
        var cat = controller.getCurrentCat();
        this.catNameElem.innerHTML = cat.name;
        this.catImageElem.src = cat.imagePath;
        this.catImageElem.onclick = function() {
            controller.incClickCount();
        }
        this.catCountElem.innerHTML = cat.clickCount + " Clicks";
    }
};




/* Controller */
var controller = {
    init: function() {
        //Initialize the model
        model.loadCats();
        if(model.allCats.length > 0) {
            model.currentCat = model.allCats[0];
        }

        //Initialize the cat list view
        catListView.init();
        catListView.render();

        //Initialize the cat view
        catView.init();
        catView.render();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getAllCats: function() {
        return model.allCats;
    },

    incClickCount: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
        catView.render();
    },
};

model = new Model();
controller.init();
