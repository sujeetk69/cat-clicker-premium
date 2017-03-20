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

Model.prototype.editCat = function(cat) {
    for (var i=0; this.allCats.length; i++) {
        if(cat.name === this.allCats[i].name) {
            this.allCats[i].imagePath = cat.imagePath;
            this.allCats[i].clickCount = cat.clickCount;
            return true;
        }
    }
    return false;
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
                catEditView.hide();
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

var catEditView = {
    init: function() {
        this.catEditDiv = document.getElementById("cat_edit_div");
        this.catEditForm = document.getElementById("cat_edit_form");
        this.catNameInput = this.catEditForm["cat_name_input"];
        this.imagePathInput = this.catEditForm["image_path_input"];
        this.clickCountInput = this.catEditForm["click_count_input"];
        this.okButton = this.catEditForm["ok"];
        this.cancelButton = this.catEditForm["cancel"];
        this.adminButton = document.getElementById("admin_button");


    },

    render: function() {
        this.adminButton.addEventListener("click", function() {
            var cat = controller.getCurrentCat();
            catEditView.catNameInput.value = cat.name;
            catEditView.imagePathInput.value = cat.imagePath;
            catEditView.clickCountInput.value = cat.clickCount;
            catEditView.catEditDiv.style.visibility = "visible";
        });

        this.cancelButton.addEventListener("click", function() {
            catEditView.catEditDiv.style.visibility = "hidden";
        });

        this.okButton.addEventListener("click", function() {
            var cat = new Cat(catEditView.catNameInput.value, catEditView.imagePathInput.value);
            cat.clickCount = catEditView.clickCountInput.value;
            controller.editCat(cat);
        });
    },

    hide: function() {
        this.catEditDiv.style.visibility = "hidden";
    },
}


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

        catEditView.init();
        catEditView.render();
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

    editCat: function(cat) {
        var success = model.editCat(cat);
        if(success) {
            alert("Cat Edited");
            catView.render();
            catEditView.hide();
        }
        else {
            alert("Could not find cat!!! Try again with correct or cancel.");
        }

    },
};

model = new Model();

controller.init();


