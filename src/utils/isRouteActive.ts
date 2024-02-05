const ROOT_PATH = "/";
export const isRouteActive = (targetRoute: string, currentRoute: string) => {
  const currentPath = currentRoute.split("?")[0];

  if (isRootRoute(currentPath) && isRootRoute(targetRoute)) {
    return true;
  }

  if (!isRootRoute(currentPath) && isRootRoute(targetRoute)) {
    return false;
  }

  if (currentPath.includes(targetRoute)) {
    return true;
  }
};

const isRootRoute = (route: string) => {
  return route === ROOT_PATH;
};
