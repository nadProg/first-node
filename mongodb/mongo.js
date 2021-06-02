import dotenv from 'dotenv';

dotenv.config();

export const URI = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.n8wck.mongodb.net/usersdb`;
export const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
