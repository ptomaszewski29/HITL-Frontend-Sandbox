import { vi, describe, it, expect } from 'vitest';
import { TokenBucket, RateLimiterConfig, RateLimiter } from '../src/token-bucket-client';

describe('TokenBucketClient', () => {
  let config: RateLimiterConfig;
  let rateLimiter: RateLimiter;
  let bucket: TokenBucket;
  let client: TokenBucketClient;

  beforeEach(() => {
    config = {
      key: 'testKey',
      capacity: 10,
      refillRate: 1,
      refillInterval: 1000,
    };

    rateLimiter = vi.fn(() => new RateLimiter(config));
    bucket = vi.fn(() => new TokenBucket(config));
    client = new TokenBucketClient(config);
  });

  it('canAct returns true if bucket has tokens', () => {
    bucket.canAct = vi.fn(() => true);
    expect(client.canAct()).toBe(true);
  });

  it('canAct returns false if bucket has no tokens', () => {
    bucket.canAct = vi.fn(() => false);
    expect(client.canAct()).toBe(false);
  });

  it('getRemainingTokens returns the number of tokens in the bucket', () => {
    bucket.getRemainingTokens = vi.fn(() => 5);
    expect(client.getRemainingTokens()).toBe(5);
  });
});