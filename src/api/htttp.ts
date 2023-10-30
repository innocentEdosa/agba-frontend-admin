import Api from '@/api/api';

const URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_HEROKU_ENDPOINT as string : process.env.NEXT_PUBLIC_LOCAL_ENDPOINT;

if (!URL) throw new Error('missing api url');

export default new Api(URL);
