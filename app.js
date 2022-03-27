// connect mongose and create db
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/superDB', {useNewUrlParser: true});

// here we create the collection schema but not the collection itself. so we just create data but without table

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    rating: { 
        type: Number,
        min: 3,
        max: 10
    },
    review: String
})
const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    hermFruit: fruitSchema
})

// create collection that handle the data above
// "name of collection", "name of data you want to handle"
// Person is the table name in both. personSchema is the data that table will have 
const Person = mongoose.model("Person", personSchema)
const Fruit = mongoose.model("Fruit", fruitSchema)

// const fruit = new Fruit ({

//     rating: 6,
//     review: "Nice green solid fruit"
// })
// fruit.save();
const mango = new Fruit ({
    name: "Mango",
    rating: 7,
    review: "Nice fruit"
})
const person = new Person ({
    name: "ahmed",
    age: 24,
    hermFruit: mango
})

const kiwi = new Fruit ({
    name: "Kiwi",
    rating: 4,
    review: "green fruit"
})

Person.updateOne({name: "Ziyad"}, {hermFruit: kiwi}, function(err){
    if (err){console.log(err)} else { console.log("Ziyad are up running")}
})


// const orange = new Fruit ({
//     name: "Orange",
//     rating: 9,
//     review: "Nice orangy solid fruit"
// })
// orange.save();
Fruit.deleteMany({name: "Orange"}, function(err){
    if(err){ console.log(err)} else{console.log("Sucseed")}
})
// this give us authority to save many objects in one step by this method which is 
//instead of using orange.save() & kiwi.save(), mango.save() || we can save it all at once with 
//  Model.insertMany([list of objects you wanna add], function(err){function to catch error}) 

// Fruit.insertMany([kiwi, mango, orange], function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Succeed");
//     }
// })
//  to delete
// Fruit.deleteOne( {name: "Orange2"}, function(err){
//     if (err) {
//         console.log(err);
//     } else {
//     console.log("succed");
    
//     }
//  to update 
// Fruit.updateOne({_id:"61d1459e25e3f602f21e583d"}, {name: "Orange2"}, function(err){
//     if (err) {
//         console.log(err);
//     } else {
//     console.log("succed");
    
//     }
// })
Fruit.find(function(err, fruitfind){
    if (err){
        console.log(err);
    } else {
        
        for (var i=0; i<fruitfind.length; i++) {
            
            console.log(fruitfind[i].name);

        }
        

    }
    // mongoose.connection.close();
})
