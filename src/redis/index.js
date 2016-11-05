'use strict'
const config = require('config');
const redisConf = config.get('redis');

const isSentinel = Array.isArray(redisConf.hosts);

const Redis = require('ioredis');

let RedisClient;

if (isSentinel) {
  RedisClient = new Redis({
    sentinels: redisConf.hosts,
    port: redisConf.port,
    name: redisConf.name,
    dropBufferSupport: true
  });
} else {
  RedisClient = new Redis({
    host: redisConf.host,
    port: redisConf.port,
    dropBufferSupport: true
  });
}

RedisClient.on('error', (err) => {
  console.error(err.message)
  console.error('****************************************************************')
  console.error('****************************************************************')
  console.error('Redis IS A MUST in this software. Please, configure it correctly')
  console.error('****************************************************************')
  console.error('****************************************************************')
  process.exit(1)
});

RedisClient.on('reconnecting', (err) => {
  console.error(err.message);
});

module.exports = RedisClient;
