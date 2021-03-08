import { renderHook, act } from '@testing-library/react-hooks';
import {useCounter} from '../useCounter';

test('should use counter', () => {
  const { result } = renderHook(() => useCounter(10, 500))
  expect(result.current.count).toBe(10);
  expect(result.current.finished).toBe(false);
  expect(typeof result.current.start).toBe('function');
  expect(typeof result.current.stop).toBe('function');
  expect(typeof result.current.reset).toBe('function');
});

test('should reset counter', () => {
  const { result } = renderHook(() => useCounter(10, 500))
  act(() => {
    result.current.reset();
  })
  expect(result.current.count).toBe(10)
})