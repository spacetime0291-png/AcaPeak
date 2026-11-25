/**
 * Normalize literal escaped newlines (`\n`) in Markdown strings without
 * corrupting LaTeX commands such as `\neq`, `\nabla`, `\nu`, `\neg`, `\notin`.
 */
export function normalizeMarkdownText(raw) {
  if (typeof raw !== 'string') return raw;
  return raw
    .replace(/\\n(?=[^a-z]|$)/g, '\n')
    .replace(/\\ntidak\b/g, '\ntidak')
    .replace(/\n{3,}/g, '\n\n');
}

/**
 * Recursively normalize all string fields in a material or rangkuman JSON object,
 * leaving SVG code strings intact.
 */
export function normalizeJsonStrings(node, keyName = '') {
  if (typeof node === 'string') {
    if (keyName === 'kode' && node.trimStart().startsWith('<svg')) {
      return node;
    }
    return normalizeMarkdownText(node);
  }
  if (Array.isArray(node)) {
    return node.map((item) => normalizeJsonStrings(item, keyName));
  }
  if (node && typeof node === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = normalizeJsonStrings(v, k);
    }
    return out;
  }
  return node;
}
