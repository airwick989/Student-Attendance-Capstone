export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/dashboard/settings", "/dashboard/classes", "/dashboard/classes/:roomName*", "/dashboard/new-room"] }