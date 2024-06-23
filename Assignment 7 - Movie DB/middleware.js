import { NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const langSupport = ["en", "bn"];
const defaultLang = "en";

const getLocale = (req) => {
  const acceptLang = req.headers.get("accept-language") || "en";
  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, langSupport, defaultLang);
};

export default async function middleware(req) {
  const pathName = req.nextUrl.pathname;
  const localeIsAvailable = langSupport.every(
    (locale) => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
  );

  if (localeIsAvailable) {
    const locale = getLocale(req);
    return NextResponse.redirect(new URL(`/${locale}${pathName}`, req.url));
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    "/((?!api|assets|.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
