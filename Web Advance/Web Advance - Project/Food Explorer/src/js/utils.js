// Handige helper functies

export function getLanguageText(lang, enText, nlText) {
  return lang === 'nl' ? nlText : enText;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}