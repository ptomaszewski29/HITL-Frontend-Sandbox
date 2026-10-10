import { createBucket } from './bucket-factory';
import { TokenBucket } from './bucket';
import { RedisTokenBucket } from './redis-token-bucket';
import { createRedisTokenBucket } from './redis-token-bucket';
import { LocalTokenBucket } from './local-token-bucket';
import { RateLimiterConfig } from './rate-limiter-config';
import { createTokenBucketLimiter } from './token-bucket-limiter';

export class RateLimiterService {
  private rateLimiterConfig: RateLimiterConfig;

  constructor(rateLimiterConfig: RateLimiterConfig) {
    this.rateLimiterConfig = rateLimiterConfig;
  }

  getRateLimiter(bucket: Bucket): RateLimiter {
    if (bucket instanceof RedisTokenBucket) {
      return createTokenBucketLimiter(new RedisTokenBucket(this.rateLimiterConfig));
    } else if (bucket instanceof LocalTokenBucket) {
      return createTokenBucketLimiter(new LocalTokenBucket(this.rateLimiterConfig));
    } else {
      throw new Error('Unsupported bucket type');
    }
  }

  // Method to check if the bucket can be accessed
  canAccess(bucket: Bucket): boolean {
    const rateLimiter = this.getRateLimiter(bucket);
    return rateLimiter.canAccess();
  }

  // Method to consume tokens from the bucket
  consume(bucket: Bucket, tokens: number): boolean {
    const rateLimiter = this.getRateLimiter(bucket);
    return rateLimiter.consume(tokens);
  }
}