// Small utilities for handling auth client responses.
export const hasRedirect = (obj: unknown): obj is { redirect?: boolean } =>
  Boolean(obj && typeof obj === "object" && "redirect" in (obj as any));

export const redirectIsTrue = (obj: unknown): boolean =>
  hasRedirect(obj) && Boolean((obj as any).redirect);
