// import Redis from 'ioredis';
// import dotenv from 'dotenv';
// dotenv.config();

// const isCluster = ['pre-production', 'production'].includes(process.env.NODE_ENV);

// let redisClient;

// if (isCluster) {
//   redisClient = new Redis.Cluster(
//     [{ host: process.env.AWS_REDIS_ENDPOINT, port: parseInt(process.env.REDIS_PORT, 10) || 6379 }],
//     {
//       tls: {},
//       redisOptions: { connectTimeout: 5000 },
//       retryStrategy(times) {
//         return times > 3 ? null : 1000;
//       },
//     }
//   );
// } else {
//   redisClient = new Redis({
//     host: process.env.REDIS_HOST,
//     port: parseInt(process.env.REDIS_PORT, 10) || 6379,
//     connectTimeout: 5000,
//     retryStrategy(times) {
//       return times > 3 ? null : 1000;
//     },
//   });
// }

// redisClient.on('connect', () => console.log('✅ Connected to Redis.'));
// redisClient.on('error', (err) => console.error('❌ Redis error:', err));

// export default redisClient;
