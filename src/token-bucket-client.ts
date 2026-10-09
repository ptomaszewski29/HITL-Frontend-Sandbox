import { TokenBucket } from './token-bucket';
import { RateLimiterConfig } from './rate-limiter-config';
import { RateLimiter } from './rate-limiter';

export class TokenBucketClient {
  private bucket: TokenBucket;
  private rateLimiter: RateLimiter;

  constructor(config: RateLimiterConfig) {
    this.rateLimiter = new RateLimiter(config);
    this.bucket = this.rateLimiter.getBucket(config.key);
  }

  canAct(): boolean {
    return this.bucket.canAct();
  }

  getRemainingTokens(): number {
    return this.bucket.getRemainingTokens();
  }
}