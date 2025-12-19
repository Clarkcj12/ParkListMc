export type SearchParamsLike = ReadonlyURLSearchParams | URLSearchParams;

export function getCallbackUrl(searchParams: SearchParamsLike): string {
  const param =
    searchParams.get("callbackUrl") ?? searchParams.get("callbackURL");
  if (!param || !param.startsWith("/")) {
    return "/dashboard";
  }
  return param;
}
