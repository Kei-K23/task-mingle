import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook"],
  afterAuth: (auth, req) => {
    // check user is auth. If they are auth and url is landing then redirect to /select-org url if they do not have org or if they have org then redirect to that org
    if (auth.userId && auth.isPublicRoute) {
      let path = "/select-org";

      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }

      const route = new URL(path, req.url);
      return NextResponse.redirect(route);
    }

    // if user is not auth and they are not in the landing page then redirect them to sign in page
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // if user is auth but they do not have org and they are not in /select-org then redirect them to /select-org
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      const route = new URL("/select-org", req.url);
      return NextResponse.redirect(route);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
