import {MongoClient} from 'mongodb';

export const connectToDatabase = async () => {
    const {MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_URL} = process.env;
    const url = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URL}/?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(url);
    return client;
}