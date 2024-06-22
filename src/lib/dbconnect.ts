import mongoose from 'mongoose';

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

async function dbconnect():Promise<any>{
    if(connection.isConnected){
        console.log('already connected')
    }
    else{
        try{
            let db:any =  await mongoose.connect(process.env.MONGO_URI,{})
            console.log({db})
            connection.isConnected = db.connections[0].readyState
            console.log('connected')
        }
        catch(err){
            console.log(err)
            process.exit(1)
        }
    }
}
export default dbconnect