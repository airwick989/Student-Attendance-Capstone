export { default } from "next-auth/middleware"

export const config = { matcher: ['/((?!login|static|favicon.ico).*)',] }