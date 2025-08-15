const HEROKU_APP_URL = 'https://smallbusiness-p-e6a955b1be25.herokuapp.com';

export const BASE_URL = process.env.NODE_ENV === 'production'
    ? HEROKU_APP_URL
    : 'http://localhost:3000';