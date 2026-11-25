/**
 * Normalize literal escaped newlines (`\n`) in Markdown strings without
 * corrupting LaTeX commands such as `\neq`, `\nabla`, `\nu`, `\neg`, `\notin`.
 */
export function normalizeMarkdownText(raw?: string | null): string {
  if (!raw) return '';
  return raw
    .replace(/\\n(?=[^a-z]|$)/g, '\n')
    .replace(/\\ntidak\b/g, '\ntidak')
    .replace(/\n{3,}/g, '\n\n');
}

/**
 * Promote `\frac` to `\dfrac` ONLY inside display math blocks (`$$...$$`).
 * Inline math (`$...$`) retains standard `\frac` to prevent uneven line heights.
 */
export function formatMarkdownMath(raw?: string | null): string {
  const normalized = normalizeMarkdownText(raw);
  if (!normalized) return '';
  return normalized.replace(/\$\$([\s\S]*?)\$\$/g, (_match, inner: string) => {
    return `$$${inner.replace(/\\frac(?=[{\s])/g, '\\dfrac')}$$`;
  });
}
