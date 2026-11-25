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
 * Split a LaTeX expression on a top-level delimiter (outside `{...}` and `\left...\right`),
 * ignoring relational compound operators like `<=`, `>=`, `!=`, `==`, `:=`.
 */
function splitTopLevelEquals(expr: string): string[] {
  const parts: string[] = [];
  let braceDepth = 0;
  let leftRightDepth = 0;
  let start = 0;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch === '\\') {
      if (expr.startsWith('\\left', i) && !/[a-zA-Z]/.test(expr[i + 5] || '')) {
        leftRightDepth++;
        i += 4;
        continue;
      }
      if (expr.startsWith('\\right', i) && !/[a-zA-Z]/.test(expr[i + 6] || '')) {
        leftRightDepth = Math.max(0, leftRightDepth - 1);
        i += 5;
        continue;
      }
      i++; // skip escaped char
      continue;
    }
    if (ch === '{') {
      braceDepth++;
      continue;
    }
    if (ch === '}') {
      braceDepth = Math.max(0, braceDepth - 1);
      continue;
    }
    if (braceDepth === 0 && leftRightDepth === 0 && ch === '=') {
      const prev = expr[i - 1] || '';
      const next = expr[i + 1] || '';
      if (prev === '<' || prev === '>' || prev === '!' || prev === ':' || prev === '=' || next === '=') {
        continue;
      }
      parts.push(expr.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(expr.slice(start));
  return parts;
}

/**
 * Check if a LaTeX expression has top-level separators/comparisons that mean
 * it is NOT a pure chained equality (e.g. `x = 2, y = 3` or `x^2 < x = 1/4`).
 */
function hasTopLevelDisqualifiers(expr: string): boolean {
  let braceDepth = 0;
  const cmds = ['\\iff', '\\Leftrightarrow', '\\rightarrow', '\\Rightarrow', '\\implies'];
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch === '\\') {
      let matched = false;
      for (const cmd of cmds) {
        if (expr.startsWith(cmd, i) && !/[a-zA-Z]/.test(expr[i + cmd.length] || '')) {
          return true;
        }
      }
      if (!matched) i++;
      continue;
    }
    if (ch === '{') braceDepth++;
    else if (ch === '}') braceDepth = Math.max(0, braceDepth - 1);
    else if (braceDepth === 0) {
      if (ch === ';' || ch === '<' || ch === '>') return true;
      // Comma followed by whitespace separates distinct equations (allow decimal `0,166`)
      if (ch === ',' && /\s/.test(expr[i + 1] || '')) return true;
    }
  }
  return false;
}

/**
 * Find the index and length of the last top-level arrow (`\rightarrow`, `\Rightarrow`, `\implies`).
 */
function findLastTopLevelArrow(expr: string): { index: number; token: string } | null {
  let braceDepth = 0;
  let last: { index: number; token: string } | null = null;
  const arrows = ['\\Rightarrow', '\\rightarrow', '\\implies'];

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch === '\\') {
      let matched = false;
      for (const arr of arrows) {
        if (expr.startsWith(arr, i) && !/[a-zA-Z]/.test(expr[i + arr.length] || '')) {
          if (braceDepth === 0) {
            last = { index: i, token: arr };
          }
          i += arr.length - 1;
          matched = true;
          break;
        }
      }
      if (!matched) i++;
      continue;
    }
    if (ch === '{') braceDepth++;
    else if (ch === '}') braceDepth = Math.max(0, braceDepth - 1);
  }
  return last;
}

function buildAlignedBlock(parts: string[]): string {
  const first = parts[0].trim();
  const second = parts[1].trim();
  const rest = parts.slice(2).map((p) => `&= ${p.trim()}`);
  const lines = [`${first} &= ${second}`, ...rest].join(' \\\\\n');
  return `\n\n$$\n\\begin{aligned}\n${lines}\n\\end{aligned}\n$$\n\n`;
}

/**
 * Format long chained-equality math expressions (with multiple `=` signs) into
 * vertically stacked `\begin{aligned} ... \end{aligned}` display blocks.
 */
function stackChainedEquals(markdown: string): string {
  // 1. Process line by line so markdown tables (`| ... |`) and fenced code blocks are untouched
  const lines = markdown.split('\n');
  let inCodeBlock = false;
  const outLines = lines.map((line) => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return line;
    }
    if (inCodeBlock || trimmed.startsWith('|')) {
      return line;
    }

    // Merge trailing bold-math result that continues an equation:
    // e.g. `$8^{-2/3} = ... =$ **$\frac{1}{4}$**` -> `$8^{-2/3} = ... = \boldsymbol{\frac{1}{4}}$`
    const merged = line.replace(
      /\$([^$\n]+?)=\s*\$\s*\*\*\$([^$\n]+?)\$\*\*/g,
      (_m, lhs: string, boldRhs: string) => {
        const rhsParts = splitTopLevelEquals(boldRhs.trim()).map((p) => `\\boldsymbol{${p.trim()}}`);
        return `$${lhs.trim()} = ${rhsParts.join(' = ')}$`;
      }
    );

    // Replace inline `$...$` blocks that contain chained equalities
    return merged.replace(/(?<!\\)\$(?!\$)([^$\n]+?)(?<!\\)\$/g, (fullMatch, inner: string) => {
      const expr = inner.trim();
      if (!expr || expr.includes('\\begin{')) return fullMatch;

      // Check if an arrow precedes a chained `=` calculation, e.g. `$x+y=7,\ xy=10 \rightarrow x^2+y^2 = 7^2 - 2(10) = \boldsymbol{29}$`
      const arrow = findLastTopLevelArrow(expr);
      if (arrow) {
        const prefix = expr.slice(0, arrow.index).trim();
        const suffix = expr.slice(arrow.index + arrow.token.length).trim();
        if (suffix && !hasTopLevelDisqualifiers(suffix)) {
          const suffixParts = splitTopLevelEquals(suffix);
          if (
            suffixParts.length >= 4 ||
            (suffixParts.length === 3 && (suffix.length >= 30 || suffix.includes('\\boldsymbol')))
          ) {
            const prefixPart = prefix ? `$${prefix} ${arrow.token}$` : `$${arrow.token}$`;
            return `${prefixPart}${buildAlignedBlock(suffixParts)}`;
          }
        }
        return fullMatch;
      }

      if (hasTopLevelDisqualifiers(expr)) return fullMatch;

      const parts = splitTopLevelEquals(expr);
      const shouldStack =
        parts.length >= 4 ||
        (parts.length === 3 && (expr.length >= 42 || expr.includes('\\boldsymbol')));

      if (!shouldStack) return fullMatch;
      return buildAlignedBlock(parts);
    });
  });

  // Also check standalone `$$...$$` display math blocks that have chained equalities
  const joined = outLines.join('\n').replace(/\n{3,}/g, '\n\n');
  return joined.replace(/\$\$([\s\S]*?)\$\$/g, (fullMatch, inner: string) => {
    const expr = inner.trim();
    if (!expr || expr.includes('\\begin{') || expr.includes('\\\\')) return fullMatch;
    if (hasTopLevelDisqualifiers(expr)) return fullMatch;
    const parts = splitTopLevelEquals(expr);
    if (parts.length >= 3) {
      return `$$\n\\begin{aligned}\n${parts[0].trim()} &= ${parts[1].trim()}${
        parts.length > 2
          ? ' \\\\\n' + parts.slice(2).map((p) => `&= ${p.trim()}`).join(' \\\\\n')
          : ''
      }\n\\end{aligned}\n$$`;
    }
    return fullMatch;
  });
}

/**
 * Normalize Markdown newlines, optionally stack chained `=` formulas vertically,
 * and promote `\frac` to `\dfrac` ONLY inside display math blocks (`$$...$$`).
 */
export function formatMarkdownMath(
  raw?: string | null,
  options?: { inlineOnly?: boolean }
): string {
  const normalized = normalizeMarkdownText(raw);
  if (!normalized) return '';
  const structured = options?.inlineOnly ? normalized : stackChainedEquals(normalized);
  return structured
    .replace(/\$\$([\s\S]*?)\$\$/g, (_match, inner: string) => {
      return `$$${inner.replace(/\\frac(?=[{\s])/g, '\\dfrac')}$$`;
    })
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
