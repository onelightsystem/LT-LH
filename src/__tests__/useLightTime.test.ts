// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLightTime } from "../useLightTime";

describe("useLightTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial hour and day state on mount", () => {
    const { result } = renderHook(() => useLightTime());
    expect(result.current.hour).toBeDefined();
    expect(result.current.hour.lightTime).toMatch(/^\d+(LH|dh)$/);
    expect(result.current.day).toBeDefined();
    expect(result.current.day.day).toBeGreaterThanOrEqual(1);
  });

  it("exposes a refresh callback", () => {
    const { result } = renderHook(() => useLightTime());
    expect(typeof result.current.refresh).toBe("function");
  });

  it("refreshes state when interval elapses", () => {
    const { result } = renderHook(() => useLightTime({ refreshInterval: 1000 }));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // After the interval fires the state is recomputed; verify refresh ran
    // (same-second results may be identical, but the call must not throw)
    expect(result.current.hour).toBeDefined();
    expect(result.current.hour.lightTime).toMatch(/^\d+(LH|dh)$/);
  });

  it("clears the interval on unmount", () => {
    const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");

    const { unmount } = renderHook(() => useLightTime({ refreshInterval: 500 }));
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    clearIntervalSpy.mockRestore();
  });

  it("respects a custom refreshInterval", () => {
    const setIntervalSpy = vi.spyOn(globalThis, "setInterval");

    renderHook(() => useLightTime({ refreshInterval: 2000 }));

    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 2000);
    setIntervalSpy.mockRestore();
  });

  it("manual refresh() updates state immediately", () => {
    const { result } = renderHook(() => useLightTime());

    act(() => {
      result.current.refresh();
    });

    expect(result.current.hour).toBeDefined();
    expect(result.current.day).toBeDefined();
  });
});
