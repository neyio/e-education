import ENV from '../../env';
export const APP_NAME = ENV.APP_NAME || '教学';
export const APP_NAME_ENG = ENV.APP_NAME_ENG || 'E-Education';
export const EXCLUDED_AUTH_ROUTES = [ '/login', '/register', '/reset-password' ];
