import type { ReadonlyURLSearchParams } from "next/navigation";

export type SearchParamsLike = ReadonlyURLSearchParams | URLSearchParams;

export function getCallbackUrl(searchParams: SearchParamsLike): string {
  const param =
    searchParams.get("callbackUrl") ?? searchParams.get("callbackURL");
  // Reject missing values, non-rooted paths, and protocol-relative URLs (//evil.com)
  if (!param || !param.startsWith("/") || param.startsWith("//")) {
    return "/dashboard";
  }
  return param;
}

export function isSafeCallbackUrl(value: string): boolean {
  return Boolean(value && value.startsWith("/") && !value.startsWith("//"));
}
