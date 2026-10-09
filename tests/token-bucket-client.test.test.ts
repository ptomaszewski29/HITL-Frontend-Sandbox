import { vi, describe, it, expect } from 'vitest';
import { TokenBucketClient } from '../src/token-bucket-client';
import { TokenBucket } from '../src/token-bucket';

describe('TokenBucketClient', () => {
  it('should be able to create an instance with a RateLimiterConfig', () => {
    const config: RateLimiterConfig = { key: 'testKey', capacity: 10, refillRate: 1 };
    const client = new TokenBucketClient(config);
    expect(client).toBeDefined();
  });

  it('should be able to check if an action can be performed', () => {
    const config: RateLimiterConfig = { key: 'testKey', capacity: 10, refillRate: 1 };
    const client = new TokenBucketClient(config);
    expect(client.canAct()).toBe(true);
    client.bucket.removeTokens(5);
    expect(client.canAct()).toBe(false);
  });

  it('should be able to update the remaining tokens when refillRate is applied', () => {
    const config: RateLimiterConfig = { key: 'testKey', capacity: 10, refillRate: 1 };
    const client = new TokenBucketClient(config);
    expect(client.getRemainingTokens()).toBe(10);
    client.bucket.removeTokens(5);
    expect(client.getRemainingTokens()).toBe(5);
    vi.advanceTimersByTime(1000); // Simulate time passing for refilling
    expect(client.getRemainingTokens()).toBe(10);
  });
});