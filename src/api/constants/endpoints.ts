const basePath = "api/v1/";

export const GET_ME_URL = `${basePath}auth`;
export const LOGIN_URL = `${basePath}auth/login`;
export const REGISTER_URL = `${basePath}auth/register`;
export const LOGOUT_USER = `${basePath}auth/logout`;

// authors
export const CREATE_AUTHOR = `${basePath}authors`;
export const GET_AUTHORS = `${basePath}authors`;

// categories
export const CREATE_CATEGORY = `${basePath}categories`;
export const GET_CATEGORIES = `${basePath}categories`;

// courses
export const CREATE_COURSE = `${basePath}course`;
export const GET_cOURSES = `${basePath}course`;
export const GET_COURSE_BY_SLUG = `${basePath}course/singlecourse`;

// Videos
export const iNITIALIZE_VIDEO_UPLOAD = `${basePath}videos/create/multipart/initialize`;
export const GET_PRE_SIGNED_URLS = `${basePath}videos/create/multipart/getPreSignedUrls`;
export const GET_PRE_SIGNED_TA_URLS = `${basePath}videos/create/multipart/getPreSignedTAUrls`;
export const COMPLETE_VIDEO_UPLOAD = `${basePath}videos/create/multipart/complete`;
