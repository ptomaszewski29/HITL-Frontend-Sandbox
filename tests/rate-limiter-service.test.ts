import { vi } from 'vitest';
import { RateLimiterService } from '../src/rate-limiter-service';
import { TokenBucket, RateLimiter } from '../src/bucket';

describe('RateLimiterService', () => {
  let rateLimiterService: RateLimiterService;
  let mockLocalTokenBucket: TokenBucket;
  let mockRedisTokenBucket: TokenBucket;

  beforeEach(() => {
    mockLocalTokenBucket = vi.fn<TokenBucket>(() => ({
      canAccess: vi.fn().mockResolvedValue(true),
      consume: vi.fn().mockResolvedValue(true),
    }));
    mockRedisTokenBucket = vi.fn<TokenBucket>(() => ({
      canAccess: vi.fn().mockResolvedValue(true),
      consume: vi.fn().mockResolvedValue(true),
    }));
    rateLimiterService = new RateLimiterService({
      rateLimit: 10,
      interval: 1000,
    });
  });

  it('should get correct rate limiter for local bucket', async () => {
    const rateLimiter = rateLimiterService.getRateLimiter(mockLocalTokenBucket);
    expect(rateLimiter).toBeInstanceOf(RateLimiter);
    expect(rateLimiter.canAccess).toHaveBeenCalledWith();
    expect(rateLimiter.consume).toHaveBeenCalledWith(10);
  });

  it('should get correct rate limiter for redis bucket', async () => {
    const rateLimiter = rateLimiterService.getRateLimiter(mockRedisTokenBucket);
    expect(rateLimiter).toBeInstanceOf(RateLimiter);
    expect(rateLimiter.canAccess).toHaveBeenCalledWith();
    expect(rateLimiter.consume).toHaveBeenCalledWith(10);
  });

  it('should throw an error for unsupported bucket type', async () => {
    expect(() => rateLimiterService.getRateLimiter({} as any)).toThrowError('Unsupported bucket type');
  });
});