'use server'
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
export async function search(name:(string|undefined)){
    
    return JSON.parse(JSON.stringify([await characterCollection.find({"name":{$regex:new RegExp(`^${ name}[a-zA-Z ]*`,'i')}}).toArray(),await artifactsCollection.find({"name":{$regex:new RegExp(`^${name}[a-zA-Z ]*`,'i')}}).toArray(),await whistleCollection.find({"name":{$regex:new RegExp(`^${name}[a-zA-Z ]*`,'i')}}).toArray()]))
}
export async function getCharacterData(){
    try {
        await connect();
        return JSON.parse(JSON.stringify(await characterCollection.find({}).toArray()))
        
    } catch (error) {
        console.error('getCharacterData error')
    }
}
export async function getWhistleData(){
    try{
        await connect();
        return  JSON.parse(JSON.stringify(await whistleCollection.find({}).toArray()))
    }catch(error){
        console.log("getWhistleData eroor");
    }
}
export async function getArtifactsData(){
    try{
        await connect();
        return JSON.parse(JSON.stringify(await artifactsCollection.find({}).toArray()))
    }catch(error){
        console.log("artifactsCollection error");
    }
}
export async function getIndividualCharacterData(name:(string|null)){
    try{
        await connect();
    return JSON.parse(JSON.stringify(await characterCollection.findOne({"name":`${name}`})))
    }catch(error){
        console.log("getIndividualCharacterData error");
    }
}

export async function getIndividualArtifactsData(name:(string|null)){
    try{
        await connect();
    return JSON.parse(JSON.stringify(await artifactsCollection.findOne({"name":`${name}`})))
    }catch(error){
        console.log("getIndividualArtifactsData error");
    }
}

export async function getIndividualWhistlesData(name:(string|null)){
    try{
        await connect();
    return JSON.parse(JSON.stringify(await whistleCollection.findOne({"name":`${name}`})))
    }catch(error){
        console.log("getIndividualWhistlesData error");
    }
}