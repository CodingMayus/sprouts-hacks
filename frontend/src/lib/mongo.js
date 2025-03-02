import mongoose from "mongoose";
const MONGODB_URI = "mongodb+srv://sproutshacks:GJpWU5y9UqLQ8UIn@cluster0.wmkou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}
let cached = global.mongoose || { conn: null, promise: null };
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}
export default dbConnect;