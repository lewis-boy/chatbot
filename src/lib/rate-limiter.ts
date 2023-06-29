import {redis} from './redis';
import { Ratelimit } from "@upstash/ratelimit";

//prefix is optional, useful if you wanna share this redis instance 
//with other applications and avoid key collisions.
//the default is @upstash/ratelimit
export const rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(2, '10 s'),
    prefix: '@upstash/ratelimit'
});