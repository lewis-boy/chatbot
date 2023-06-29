import { Redis } from "@upstash/redis/nodejs";

//exclamation marks assures typescript that these values exist 
export const redis = new Redis({
    url: process.env.REDIS_URL!,
    token: process.env.REDIS_SECRET!,
});