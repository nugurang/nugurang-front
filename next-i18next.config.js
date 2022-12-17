var path = require('path');
module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['en', 'ko'],
  },
  fallbackLng: {
    default: ['en'],
  },
  localePath: path.resolve('./public/locales')
};
