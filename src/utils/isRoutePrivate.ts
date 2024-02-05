const ROOT_ROUTE = "/";

export const isRoutePrivate = (route: string, protectedRoutes: string[]) => {
  if (isRootRoute(route)) {
    return true;
  }

  const isProtected =
    protectedRoutes
      .map((protectedRoute) => {
        if (isRootRoute(protectedRoute)) return false;
        return route.includes(protectedRoute);
      })
      .filter(Boolean).length > 0;

  return isProtected;
};

const isRootRoute = (route: string) => {
  return route === ROOT_ROUTE;
};
