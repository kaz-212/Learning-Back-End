# Mongodb and command line

need to run:
  '$ brew services start mongodb-community@4.4'
in one shell. then open a a new termnal windo and run:
  '$ mongo'
This opens up a REPL kinda thing where you can also type js commands. 

<!-- Some commands -->
'> db': what database am i in 
'> show dbs': shows the databases
'> use animalShelter': makes a new db called animal shelter if one doesnt already exist. if it does exist then it just goes to it
'> show collections': shows the collections

<!-- ======== CRUD ======== --> 
<!-- dont need to put the same keys in for each js object we pass in  -->

<!-- C -->
'> db.dogs.insertOne({name: "Travis", age: 3, breed: "corgi", catFreindly: true})': <!-- inserts one thing (document) into the collection 'dogs'. If no collection 'dogs', will create one and will create an _id key for the document -->
'> db.dogs.insert([{name: "Wyatt", breed: "golden", age: 14, catFriendly: false}, {name: "Tonya", breed: "chihuahua", age: 17, catFriendly: false}])' <!--can insert more than one document>

<!-- R -->
'> db.dogs.find()': <!-- shows you all the stuff in the collection 'dogs'. returns a 'cursor' -->
'> db.dogs.find({breed: "corgi"})': <!-- allows you to search for specific things (can search for more than one) -->

<!-- U -->
'> db.dogs.updateOne({name: "Wyatt"}, {$set: {age: 4}})' <!-- the first argument is the selector, so selects one dog w name "Wyatt". the second ($set) is an operator which we apply to an object (resets the age to 4). can also use to add new key -->
'> db.dogs.updateMany({catFriendly: false}, {$set: {isAdopted: false}})' <!-- updates all where catFriendly is false>
'> db.dogs.replaceOne()' <!-- replaces one but keeps everything else the same -->

<!-- D -->
'> db.dogs.deleteOne({name: "Tonya"})'
'> db.dogs.deleteMany({})' <!-- delete all of them -->

<!-- ======== OTHER OPERATORS ======== -->
can use . syntax for nested objects but need to use "" for the nested key

'> db.dogs.find({age: {$gt: 8}}) <!-- $gt means greater than. $lt less than. $gte ">=". $lte "<=". $ne "!=" -->
'> db.dogs.find({breed: {$in: ['mutt', 'corgi']}}) <!-- finds it if its breed is in the array. $nin "not in" $>
'> db.dogs.find({$or: [{catFriendly: true}, {age: {$lte 2]}) <!-- put things in an array  that you want to "or" between -->