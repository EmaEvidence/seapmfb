import english from './english';
import hausa from './hausa';
import yoruba from './yoruba';
import igbo from './igbo';

const getLanguage = (key: 'en' | 'yr' | 'hu' | 'ig') => {
  let language: typeof english | typeof yoruba | typeof hausa | typeof igbo =
    english;
  switch (key) {
    case 'en':
      language = english;
      break;
    case 'hu':
      language = hausa;
      break;
    case 'ig':
      language = igbo;
      break;
    case 'yr':
      language = yoruba;
      break;
    default:
      language = english;
  }
  return language;
};

export default getLanguage;
