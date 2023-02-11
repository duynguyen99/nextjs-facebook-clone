import {MongoClient} from 'mongodb';
import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    const {MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_URL} = process.env;
    const url = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URL}/?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(url);
    return client;
}

export const mongooseConnection = async () => {
    const {MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_URL} = process.env;
    const url = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URL}/?retryWrites=true&w=majority`;
    const client = await mongoose.connect(url);
    return client
}