"use strict";

//Dummy data is used in case there's nothing on localStorage
var dummyData = [
    {
        "title": "Skol 300ml | Apenas o Líquido.",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/583de5188c0e8.jpg",
        "price": 20.28
    }, {
        "title": "Stella Artois 275ml - Unidade",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/592de3ed8977d.jpg",
        "price": 3.69
    }, {
        "title": "Budweiser 343ml - Pack com 6 Unidades",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/56ebfc992623b.jpg",
        "price": 20.34
    }, {
        "title": "Skol 350ml - Unidade",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/5662f9a0bfd2e.jpg",
        "price": 2.99
    }, {
        "title": "Skol 350ml - Pack com 12 Unidades",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/591379909d61b.jpg",
        "price": 35.88
    }, {
        "title": "Brahma 350ml - Unidade",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/566b52ef302cf.jpg",
        "price": 2.89
    }, {
        "title": "Corona Extra 355ml - Unidade",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/5662fc6ebebe8.jpg",
        "price": 5.99
    }, {
        "title": "Corona Extra 355ml - Pack com 6 unidades",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/5662fc93e5079.jpg",
        "price": 35.94
    }, {
        "title": "Original 600ml | Vasilhame Incluso",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/5825b59ff3f3a.jpg",
        "price": 6.49
    }, {
        "title": "Original 600ml | Vasilhame Incluso.",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/59137a5f5e251.jpg",
        "price": 77.88
    }, {
        "title": "Skol Beats Senses 313ml - Pack com 6 Unidades",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/573349f08f942.jpg",
        "price": 29.94
    }, {
        "title": "Skol 1L | Vasilhame Incluso",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/5825b75a5062e.jpg",
        "price": 71.88
    }, {
        "title": "Skol 1L | Vasilhame Incluso.",
        "description": null,
        "imageUrl": "https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/58267e769faf2.jpg",
        "price": 70
    }
];

var State = function () {
    this.tasks = [];
    this.selectedTask = {};
};

//simple utility to use $ instead of getElementById all the time
var $ = document
    .getElementById
    .bind(document);

var $state = new State();

//Rendering task list after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", event => {
    console.log("DOM fully loaded and parsed");
    renderProducts();
}); 

function renderProducts(){
    $state
    .tasks
    .forEach((element, index) => {
        addProductItem(element, index);
    });
}


