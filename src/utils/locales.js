const i18n = require('i18next');
const Backend = require('i18next-node-fs-backend');
const path = require('path');
const fs = require('fs').promises;

async function walkDirectory (dir, namespaces = [], folderName = '') {
  const files = await fs.readdir(dir);

  const locales = [];
  for (const file of files) {
    const stat = await fs.stat(path.join(dir, file));
    if (stat.isDirectory()) {
      const isLanguage = file.includes('-');
      if (isLanguage) locales.push(file);

      const folder = await walkDirectory(
        path.join(dir, file),
        namespaces,
        isLanguage ? '' : `${file}/`,
      );

      namespaces = folder.namespaces;
    } else {
      namespaces.push(`${folderName}${file.substring(0, file.length - 5)}`);
    }
  }

  return { namespaces: [...new Set(namespaces)], locales };
}

module.exports = async () => {
  const options = {
    jsonIndent: 2,
    loadPath: path.resolve(__dirname, '../locales/{{lng}}/{{ns}}.json'),
  };

  const { namespaces, locales } = await walkDirectory(path.resolve(__dirname, '../locales/'));

  await i18n.init({
    backend: options,
    debug: false,
    fallbackLng: 'en-US',
    initImmediate: false,
    interpolation: { escapeValue: false },
    load: 'all',
    ns: namespaces,
    preload: locales,
  });

  return new Map(locales.map((item) => [item, i18n.getFixedT(item)]));
};