import themes from '../data/themes.json';
import regions from '../data/regions.json';
import fields from '../data/fields.json';
import { publishedEntries } from './format.js';

const womanFiles = import.meta.glob('../data/women/*.json', { eager: true, import: 'default' });

const allWomen = Object.entries(womanFiles)
  .map(([path, woman]) => ({ slug: path.split('/').pop().replace(/\.json$/, ''), ...woman }));

/** Today, in Paris: an entry appears on its publication day. */
const today = new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(new Date());

/** The notebook entries: published ones, in publication order (not in historical order). */
export const pages = publishedEntries(allWomen, today);

export { themes, regions, fields };

const labelOf = (list) => (id) => list.find((item) => item.id === id)?.label ?? id;
export const themeLabel = labelOf(themes);
export const regionLabel = labelOf(regions);
export const fieldLabel = labelOf(fields);
