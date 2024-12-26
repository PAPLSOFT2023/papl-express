import { ParseJsonPipe } from './parse-json.pipe';

describe('ParseJsonPipe', () => {
  it('create an instance', () => {
    const pipe = new ParseJsonPipe();
    expect(pipe).toBeTruthy();
  });
});
