// @onelightsystem/light-time — TypeScript snippet generator
// Produces copy-ready code examples for LH-only or LH+LD usage.

export type SnippetMode = "lh" | "lh+ld";

const SNIPPET_LH = `import { useLightTime } from "@olsystem/lt-lh";

const MyComponent = () => {
  const { hour } = useLightTime();
  return (
    <div>
      <span>{hour.lightTime}</span>
    </div>
  );
};`;

const SNIPPET_LH_LD = `import { useLightTime } from "@olsystem/lt-lh";

const MyComponent = () => {
  const { hour, day } = useLightTime();
  const dayInYear = (day.day - 1) % 365;
  return (
    <div>
      <span>{hour.lightTime}</span>
      <span>{dayInYear}LD</span>
    </div>
  );
};`;

/**
 * Generate a copy-ready TypeScript/React snippet for integrating Light Time.
 *
 * @param mode - "lh" for Light Hour only, "lh+ld" for Light Hour + Light Day
 * @returns The snippet string ready to copy to clipboard
 */
export function generateSnippet(mode: SnippetMode = "lh+ld"): string {
  return mode === "lh" ? SNIPPET_LH : SNIPPET_LH_LD;
}
