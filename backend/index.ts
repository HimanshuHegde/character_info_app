'use server'
import { Document, MongoClient, ObjectId } from "mongodb";
import { env } from "process";

let isConnected = false;

    const client = new MongoClient(env.DATABASE_URL||"", { monitorCommands: true });
    
let characterCollection =  client.db('MadeInAbyss').collection('Characters');
let whistleCollection = client.db('MadeInAbyss').collection('Whistles');
let artifactsCollection = client.db('MadeInAbyss').collection('Artifacts');
let updateCollection = client.db('MadeInAbyss').collection('updateDB');

async function connect(){
    if(!isConnected){
        await client.connect();
        isConnected=true
    }
}

export async function update(data:any){
    try{
        await connect();
        let temp = data;
        await updateCollection.insertOne(temp);
        return true;
}catch(error){
    console.log(error+'in update')
}
}
export async function insert(type:string,data:any){
    try{
        await connect();
        if(type=='characters'){
            await characterCollection.updateOne({"name":data.name},{$set:data},{upsert:true});
        }else if (type=='artifacts'){
            await artifactsCollection.updateOne({"name":data.name},{$set:data},{upsert:true});
        }else if(type=='whistles'){
            await whistleCollection.updateOne({"name":data.name},{$set:data},{upsert:true});
        }
        return true;
    }catch(error){
        console.log(error+'in insert')
}
}
export async function Delete(data:any){
    try{
        await connect();
        await updateCollection.deleteOne({"name":data.name});
        return true;
    }catch(error){
        console.log(error+'in delete')
}
}
export async function search(name:(string|undefined)){
    const escapedName = name?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return JSON.parse(JSON.stringify([await characterCollection.find({"name":{$regex:new RegExp(`^${escapedName}[a-zA-Z(-) ]*`,'i')}}).toArray(),await artifactsCollection.find({"name":{$regex:new RegExp(`^${escapedName}[a-zA-Z(-) ]*`,'i')}}).toArray(),await whistleCollection.find({"name":{$regex:new RegExp(`^${escapedName}[a-zA-Z(-) ]*`,'i')}}).toArray()]))
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
export async function getIndividualCharacterData(oid:(string|undefined)){
    try{
        await connect();
        let id = new ObjectId(oid)
    return JSON.parse(JSON.stringify(await characterCollection.findOne({"_id":id})))
    }catch(error){
        console.log("getIndividualCharacterData error");
    }
}

export async function getIndividualArtifactsData(oid:(string|undefined)){
    try{
        await connect();
       let id = new ObjectId(oid)
    return JSON.parse(JSON.stringify(await artifactsCollection.findOne({"_id":id})))
    }catch(error){
        console.log("getIndividualArtifactsData error");
    }
}

export async function getIndividualWhistlesData(oid:(string|undefined)){
    try{
        await connect();
        let id = new ObjectId(oid)
    return JSON.parse(JSON.stringify(await whistleCollection.findOne({"_id":id})))
    }catch(error){
        console.log("getIndividualWhistlesData error");
    }
}
export async function getUpdateData(){
    try{
        await connect();
        return JSON.parse(JSON.stringify(await updateCollection.find({}).toArray()))
    }catch(error){
        console.log("getUpdateData error");
    }
}
export async function getIndividualUpdateData(oid:(string)){
    try{
        await connect();
        let id = new ObjectId(oid)
    return JSON.parse(JSON.stringify(await updateCollection.findOne({"_id":id})))
    }catch(error){
        console.log("getIndividualUpdateData error");
    }
}

export async function signUp({email,password}:{email:string,password:string}){
    try{
        await connect();
        if(email=== (await client.db("MadeInAbyss").collection('useInfo').findOne({"email":`${email}`}))?.email){
            throw new Error("already exists")
            
        }
            
        else
            return await client.db("MadeInAbyss").collection("userInfo").insertOne({"email":`${email}`,"password":`${password}`});
    }catch(err){
        console.error(err)
        return null;
    }
}

export async function logIn({email,password}:{email:string,password:string}){
    try{
        await connect();
        return await client.db("MadeInAbyss").collection("userInfo").findOne({email,password});
    }catch(err){
        return null;
    }
}