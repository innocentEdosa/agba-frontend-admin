export const isRoutePrivate = (route: string, protectedRoute: string[]) => {
  if (isRootRoute(route)) {
    return true;
  }
  if (!isRootRoute(route) && protectedRoute.includes(route)) {
    return true;
  }

  return false;
};

const isRootRoute = (route: string) => {
  return route === "/";
};
