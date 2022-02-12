import bcrypt  from "bcrypt";
import { ObjectId } from "mongodb";
import { client } from "./index.js";


 async function updateMovieById(id, data) {
    return await client
        .db("b28wd")
        .collection("my_movies")
        .updateOne({_id: ObjectId(id)}, { $set: data });
}
 async function createMovies(data) {
    return await client.db("b28wd").collection("my_movies").insertMany(data);
}

async function getMovies(filter) {
    return await client
        .db("b28wd")
        .collection("my_movies")
        .find(filter)
        .toArray();
}
 async function deleteMovieById(id) {
    return await client
        .db("b28wd")
        .collection("my_movies")
        .deleteOne({ _id: ObjectId(id)});
}//_id: ObjectId(id) id:id
 async function getMovieById(id) {
     console.log("***",id);
    return await client
        .db("b28wd")
        .collection("my_movies")
        .findOne({ _id: ObjectId(id)});
}

//users


async function createUser(data) {
    return await client.db("b28wd").collection("my_users").insertOne(data);
}

async function getAllUsers(){
    return await client.db("b28wd").collection("my_users").find({}).toArray();
}

async function deleteUserById(id){
    return await client.db("b28wd").collection("my_users").deleteOne({_id:ObjectId(id)});
}

async function updateUserById(id, role) {
    return await client.db("b28wd").collection("my_users").updateOne({ _id: ObjectId(id) }, { $set: { role: role } })
}


async function genPassword(password){
    const NO_OF_ROUNDS=10;
    const salt= await bcrypt.genSalt(NO_OF_ROUNDS);
    console.log(salt);
    const hashedPassword= await bcrypt.hash(password,salt);
    console.log(hashedPassword);
    return hashedPassword;
}
export { getMovies, 
    createMovies, 
    getMovieById, 
    deleteMovieById, 
    updateMovieById ,
    genPassword,
    createUser,
    getAllUsers,
    deleteUserById,
    updateUserById
}