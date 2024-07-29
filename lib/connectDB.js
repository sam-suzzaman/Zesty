import mongoose from "mongoose";

export default async () => {
    try {
        const DB_OPTIONS = {
            dbName: process.env.DB_NAME,
            // user: process.env.DB_USERNAME,
            // pass: process.env.DB_PASSWORD,
            useNewUrlParser: true, //required to connect db in dev. mode
            useUnifiedTopology: true, //required to connect db in dev. mode
        };
        await mongoose.connect(process.env.DB_URL, DB_OPTIONS);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connection failed:", error);
    }
};
