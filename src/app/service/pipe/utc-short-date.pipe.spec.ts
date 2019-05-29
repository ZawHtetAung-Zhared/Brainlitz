import { UtcShortDatePipe } from './utc-short-date.pipe';

describe('UtcShortDatePipe', () => {
  it('create an instance', () => {
    const pipe = new UtcShortDatePipe();
    expect(pipe).toBeTruthy();
  });
});
