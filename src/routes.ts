/**
 * PublicRoutes: Array of public routes
 * to access without authentication
 * @type {string[]}
 **/
export const PublicRoutes: string[] = ["/"];

/**
 * AuthRoutes: Array of routes that require authentication
 * to access and register an user account
 * @type {string[]}
 **/
export const AuthRoutes: string[] = ["/auth/register"];

/**
 * ApiAuthPrefix: Prefix for authentication routes
 * to mantain a separation between api routes
 * and authentication routes
 * @type {string}
 * @example /api/auth
 **/
export const ApiAuthPrefix: string = "/api/";

/**
 * DEFAULT_REDIRECT: Default redirect route
 * when user is not authenticated
 * @type {string}
 **/
export const DEFAULT_REDIRECT: string = "/";
