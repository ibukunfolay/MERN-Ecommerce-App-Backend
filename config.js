export default {
  MONGODB_URL:
    process.env.MONGO_URL ||
    "mongodb+srv://mern-ecommerce-app:root@cluster0.kwipw.mongodb.net/test?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};
