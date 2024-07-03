import { MongoClient } from "mongodb";
let isConnected = false;
const client = new MongoClient('mongodb://localhost:27017', { monitorCommands: true });
let characterCollection =  client.db('MadeInAbyss').collection('Characters');
let whistleCollection = client.db('MadeInAbyss').collection('Whistles');
let artifactsCollection = client.db('MadeInAbyss').collection('Artifacts');

async function connect(){
    if(!isConnected){
        await client.connect();
        isConnected=true
    }
}
export async function getCharacterData(){
    try {
        await connect();
        return await characterCollection.find({}).toArray();
        
    } catch (error) {
        console.error('getCharacterData error')
    }
}
export async function getWhistleData(){
    try{
        await connect();
        return  await whistleCollection.find({}).toArray();
    }catch(error){
        console.log("getWhistleData eroor");
    }
}
export async function getArtifactsData(){
    try{
        await connect();
        return await artifactsCollection.find({}).toArray();
    }catch(error){
        console.log("artifactsCollection error");
    }
}
