require('dotenv').config();

const mongoose = require('mongoose')
const uri = process.env.MONGO_URI
console.log(uri)
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const peopleSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})  


let Person = mongoose.model('Person', peopleSchema);

// let dave = new Person({
//   name: dave,
//   age: 27,
//   favoriteFoods: ['pizza', 'chips']
// })

const createAndSavePerson = (done) => {

  let francesca = new Person({
    name: 'Francesca',
    age: 20,
    favoriteFoods: ['pizza', 'chips']
  });

  francesca.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      done(null, data);
    }
  });
};

let arrayOfPeople = [
  {name: 'Evan', age: 23, favoriteFoods: ['mac and cheese', 'french fries']},
  {name: 'Jennifer', age: 19, favoriteFoods: ['egg roll', 'crunchwrap']}
]

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (error, createdPeople) => {
    if(error){
      console.log(error)
    } else {
      done (null, createdPeople)
    }
  })

  // done(null /*, data*/);
};

// Person.find({name: 'Evan'}, (error, data) => {
//   if(error){
//     console.log(error)
//   } else {
//     console.log(data)
//   }
// })

const findPeopleByName = (personName, done) => {

  Person.find({name: personName}, (err, arrayOfResults) => {
    if(err){
      console.log(err)
    } else {
      done(null, arrayOfResults)
    }
  })
  // done(null /*, data*/);
};

const findOneByFood = (food, done) => {

  Person.findOne({favoriteFoods : {$all : [food]}}, (err, result) => {
    if(err){
      console.log(err)
    }else{
      done(null, result)
    }
  })
  // done(null /*, data*/);
};

const findPersonById = (personId, done) => {

  Person.findById(personId, (err, data) => {
    if(err){
      console.log(err)
    } else {
      done(null, data)
    }
  })

  // done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, result) => {
    if(err) {
      console.log(err)
    } else {
      result.favoriteFoods.push(foodToAdd)
      result.save((err, newResult) => {
        if(err){
          console.log(err)
        } else {
          done(null, newResult)
        }
      })
    }
  })
  // done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (error, updatedRecord) => {
    if(error){
      console.log(error)
    }else{
      done(null, updatedRecord)
    }
  }) 
};

const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId, (err, data) => {
    if(err){
      console.log(err)
    } else {
      done(null, data)
    }
  })

  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";


  Person.remove({name: nameToRemove}, (err, data) => {
    if(err) {
      console.log(err)
    } else {
      done(null, data)
    }
  })

  // done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: {$all: [foodToSearch]}})
        .sort({name: 'asc'})
        .limit(2)
        .select('-age')
        .exec((err, results) => {
          if(err) {
            console.log(err)
          } else {
            done(null, results)
          }
        })

  // done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
