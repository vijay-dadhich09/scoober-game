import { pickNumber } from '../utils';

/** @test {Utils methods} */
describe('utils', () => {
  it('should execute pickNumber method and return -1', () => {  
    const pickedNumber = pickNumber(19);
    expect(pickedNumber).toBe(-1);
  });

  it('should execute pickNumber method and return 0', () => {  
    const pickedNumber = pickNumber(18);
    expect(pickedNumber).toBe(0);
  });

  it('should execute pickNumber method and return 1', () => {  
    const pickedNumber = pickNumber(17);
    expect(pickedNumber).toBe(1);
  });
});

