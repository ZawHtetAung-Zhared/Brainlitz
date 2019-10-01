import { TodayDatePipe } from './today-date.pipe';

describe('TodayDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TodayDatePipe();
    expect(pipe).toBeTruthy();
  });
});
