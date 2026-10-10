import { describe, it, expect, vi } from 'vitest';
import { RateLimiterService, LocalTokenBucket } from '../src/rate-limiter-service';

describe('RateLimiterService', () => {
  it('should correctly create and get a rate limiter', () => {
    const rateLimiterConfig = { capacity: 10, duration: 60 };
    const localBucket = new LocalTokenBucket(rateLimiterConfig);
    const rateLimiterService = new RateLimiterService(rateLimiterConfig);

    const rateLimiter = rateLimiterService.getRateLimiter(localBucket);
    expect(rateLimiter instanceof RateLimiter).toBe(true);
  });

  it('should correctly consume tokens from the bucket', () => {
    const rateLimiterConfig = { capacity: 10, duration: 60 };
    const localBucket = new LocalTokenBucket(rateLimiterConfig);
    const rateLimiterService = new RateLimiterService(rateLimiterConfig);

    const rateLimiter = rateLimiterService.getRateLimiter(localBucket);
    rateLimiter.consume(5);
    expect(rateLimiter.canAccess()).toBe(false);
  });

  it('should correctly handle capacity exhaustion', () => {
    const rateLimiterConfig = { capacity: 1, duration: 60 };
    const localBucket = new LocalTokenBucket(rateLimiterConfig);
    const rateLimiterService = new RateLimiterService(rateLimiterConfig);

    const rateLimiter = rateLimiterService.getRateLimiter(localBucket);
    rateLimiter.consume(1);
    expect(rateLimiter.canAccess()).toBe(false);
    expect(() => rateLimiter.consume(1)).toThrowError('Rate limit exceeded');
  });
});