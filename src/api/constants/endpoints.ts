const basePath = "api/v1/";

export const GET_ME_URL = `${basePath}auth`;
export const LOGIN_URL = `${basePath}auth/login`;
export const REGISTER_URL = `${basePath}auth/register`;
export const LOGOUT_USER = `${basePath}auth/logout`;

// authors
export const CREATE_AUTHOR = `${basePath}authors`;
export const GET_AUTHORS = `${basePath}authors`;
export const UPDATE_AUTHOR = `${basePath}authors`;
export const DELETE_AUTHOR = `${basePath}authors`;
export const ARCHIVE_AUTHOR = `${basePath}authors/archive`;

// categories
export const CREATE_CATEGORY = `${basePath}categories`;
export const GET_CATEGORIES = `${basePath}categories`;
export const DELETE_CATEGORIES = `${basePath}categories/delete-many`;
export const ARCHIVE_CATEGORIES = `${basePath}categories/archive-many`;
export const UPDATE_CATEGORY = `${basePath}categories`;

// courses
export const CREATE_COURSE = `${basePath}course`;
export const GET_cOURSES = `${basePath}course`;
export const GET_COURSE_BY_SLUG = `${basePath}course/singlecourse`;
export const UPDATE_COURSE = `${basePath}course`;
export const DELETE_COURSE = `${basePath}course`;
export const ARCHIVE_COURSE = `${basePath}course/archive`;

// Videos
export const CREATE_VIDEO = `${basePath}videos`;
export const UPDATE_VIDEO = `${basePath}videos`;
export const GET_PRESIGNED_URL_FOR_SMALL_SIZE_VIDEOS = `${basePath}videos/getpresignedurl`;
export const iNITIALIZE_VIDEO_UPLOAD = `${basePath}videos/create/multipart/initialize`;
export const GET_PRE_SIGNED_URLS = `${basePath}videos/create/multipart/getPreSignedUrls`;
export const GET_PRE_SIGNED_TA_URLS = `${basePath}videos/create/multipart/getPreSignedTAUrls`;
export const COMPLETE_VIDEO_UPLOAD = `${basePath}videos/create/multipart/complete`;
export const ABORT_VIDEO_UPLOAD = `${basePath}videos/create/multipart/abort`;
export const GET_COURSE_VIDEOS = `${basePath}videos/getcoursevideos`;
export const DELETE_VIDEO = `${basePath}videos`;
export const ARCHIVE_VIDEO = `${basePath}videos/archive`;