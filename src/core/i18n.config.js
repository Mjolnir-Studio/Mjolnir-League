const { I18n } = require('i18n');

const i18n = new I18n({
  locales: ['en', 'tw'],
  defaultLocale: 'en',
  autoReload: true,
  extension: '.json',
  staticCatalog: {
    tw: require('../locales/zh-TW.json'),
    en: require('../locales/en.json'),
  },
  defaultLocale: 'en'
});

module.exports = i18n;