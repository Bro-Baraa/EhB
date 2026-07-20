export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function formatDate(date, language = 'en') {
  if (!date) return '';

  const locale = language === 'nl' ? 'nl-BE' : 'en-GB';
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(date));
}
