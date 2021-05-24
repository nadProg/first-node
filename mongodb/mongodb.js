import dotenv from 'dotenv';
import mongodb from 'mongodb';

dotenv.config();

const { MongoClient } = mongodb;

const uri = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.n8wck.mongodb.net/myFirstDatabase`;

export const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
