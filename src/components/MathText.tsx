import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathTextProps {
  children: string | number;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

// Convert common math notation to LaTeX
const preprocessMath = (text: string): string => {
  let processed = String(text);
  
  // Protect already-LaTeX content
  const latexBlocks: string[] = [];
  processed = processed.replace(/\$\$[\s\S]*?\$\$|\$[^$]*?\$/g, (match) => {
    latexBlocks.push(match);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });
  
  // Convert chemical formulas with subscripts and superscripts
processed = processed.replace(
  /([A-Z][a-z]?\d*(?:\([A-Z][a-z]?\d*\)\d*)*)+[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]*/g,
  (match) => {
    // quick sanity: only convert if there are digits or unicode sup chars
    if (!/\d|[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]/.test(match)) return match;

    const superscriptMap: { [key: string]: string } = {
      '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
      '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
      '⁺': '+', '⁻': '-'
    };

    // Build tokens: element symbols / letters, parentheses, digits, consecutive unicode superscripts, ASCII +/-, caret forms
    const tokens: string[] = [];
    for (let i = 0; i < match.length; ) {
      const ch = match[i];

      // ASCII digits (group multi-digit numbers)
      if (/[0-9]/.test(ch)) {
        let j = i;
        while (j < match.length && /[0-9]/.test(match[j])) j++;
        tokens.push(match.slice(i, j)); // e.g. "12"
        i = j;
        continue;
      }

      // Consecutive Unicode superscript characters (³⁻ etc.)
      if (Object.prototype.hasOwnProperty.call(superscriptMap, ch)) {
        let j = i;
        while (j < match.length && Object.prototype.hasOwnProperty.call(superscriptMap, match[j])) j++;
        tokens.push(match.slice(i, j)); // e.g. "³⁻"
        i = j;
        continue;
      }

      // ASCII caret-style superscripts like ^2- or ^{2-}
      if (ch === '^') {
        // capture ^{...} or ^x
        if (match[i + 1] === '{') {
          let j = i + 2;
          while (j < match.length && match[j] !== '}') j++;
          tokens.push(match.slice(i, j + 1)); // includes braces
          i = j + 1;
        } else {
          // single next char
          tokens.push(match.slice(i, i + 2));
          i += 2;
        }
        continue;
      }

      // Parentheses
      if (ch === '(' || ch === ')') {
        tokens.push(ch);
        i++;
        continue;
      }

      // Letters (group consecutive letters like "Ca" "OH")
      if (/[A-Za-z]/.test(ch)) {
        let j = i;
        while (j < match.length && /[A-Za-z]/.test(match[j])) j++;
        tokens.push(match.slice(i, j));
        i = j;
        continue;
      }

      // Fallback single char
      tokens.push(ch);
      i++;
    }

    // Convert tokens into LaTeX
    let result = '';
    for (let k = 0; k < tokens.length; k++) {
      const t = tokens[k];

      // pure number -> subscript (multi-digit ok)
      if (/^[0-9]+$/.test(t)) {
        result += `_{${t}}`;
        continue;
      }

      // unicode superscript group -> map all, combine into one ^{...}
      if (/^[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+$/.test(t)) {
        let mapped = '';
        for (const c of t) mapped += superscriptMap[c] ?? c;
        result += `^{${mapped}}`;
        continue;
      }

      // caret-style ^{...} or ^x
      if (/^\^(\{.*\}|.)$/.test(t)) {
        if (t[1] === '{') {
          // remove ^ and outer braces
          const inner = t.slice(2, -1);
          result += `^{${inner}}`;
        } else {
          result += `^{${t[1]}}`;
        }
        continue;
      }

      // parentheses (if followed by a number token, that number will be handled in next iteration)
      if (t === '(') { result += '('; continue; }
      if (t === ')') { result += ')'; continue; }

      // letters / element symbols -> use \mathrm for consistent math-mode rendering
      if (/^[A-Za-z]+$/.test(t)) {
        result += `\\mathrm{${t}}`;
        continue;
      }

      // fallback: append raw (shouldn't normally happen)
      result += t;
    }

    // Now: if parentheses are followed by a number, earlier token logic placed "(" ")" and then the number token -> that number becomes the subscript as desired.

    const formula = `$${result}$`; // store math-mode string
    latexBlocks.push(formula);
    return `__LATEX_${latexBlocks.length - 1}__`;
  }
);
  
  // Convert limits: lim_x-->a or lim_x-->∞ to proper LaTeX
  processed = processed.replace(/lim_([a-zA-Z])-->(-?∞|infinity|[^\s]+)/gi, (match, variable, approach) => {
    let approachValue = approach;
    if (approach.toLowerCase() === 'infinity') {
      approachValue = '\\infty';
    } else if (approach === '∞') {
      approachValue = '\\infty';
    } else if (approach === '-∞') {
      approachValue = '-\\infty';
    }
    const limit = `$\\lim_{${variable} \\to ${approachValue}}$`;
    latexBlocks.push(limit);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });
  
  // Convert rational functions to fractions: (ax+b)/(dx+e) -> \frac{ax+b}{dx+e}
  processed = processed.replace(/\(([^()]+(?:\([^()]*\))*[^()]*)\)\/\(([^()]+(?:\([^()]*\))*[^()]*)\)/g, (match, numerator, denominator) => {
    const frac = `$\\frac{${numerator}}{${denominator}}$`;
    latexBlocks.push(frac);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });
  
  // Convert superscripts: x^2 -> x^{2}, x^2y -> x^{2}y
  processed = processed.replace(/([a-zA-Z0-9)}\]])\^([a-zA-Z0-9({\[]+|\([^)]+\))/g, (match, base, exp) => {
    return `$${base}^{${exp}}$`;
  });
  
  // Convert only logarithmic functions to LaTeX
  const functions = ['log', 'ln'];
  functions.forEach(func => {
    const regex = new RegExp(`\\b${func}\\s*\\(`, 'gi');
    processed = processed.replace(regex, `$\\${func}($`);
  });
  
  // Restore LaTeX blocks
  latexBlocks.forEach((block, index) => {
    processed = processed.replace(`__LATEX_${index}__`, block);
  });
  
  return processed;
};

const MathText = ({ children, className = '', tag = 'span' }: MathTextProps) => {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const processed = preprocessMath(String(children));
      
      // Split by $ delimiters to separate text and math
      const parts = processed.split(/(\$\$[\s\S]*?\$\$|\$[^$]*?\$)/);
      
      containerRef.current.innerHTML = '';
      
      parts.forEach(part => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          // Display math
          const span = document.createElement('span');
          span.className = 'math-display';
          try {
            katex.render(part.slice(2, -2), span, {
              displayMode: true,
              throwOnError: false,
              strict: false,
            });
          } catch (e) {
            span.textContent = part;
          }
          containerRef.current?.appendChild(span);
        } else if (part.startsWith('$') && part.endsWith('$')) {
          // Inline math
          const span = document.createElement('span');
          span.className = 'math-inline';
          try {
            katex.render(part.slice(1, -1), span, {
              displayMode: false,
              throwOnError: false,
              strict: false,
            });
          } catch (e) {
            span.textContent = part;
          }
          containerRef.current?.appendChild(span);
        } else if (part) {
          // Regular text
          containerRef.current?.appendChild(document.createTextNode(part));
        }
      });
    }
  }, [children]);
  
  const Tag = tag as any;
  return <Tag ref={containerRef} className={className} />;
};

export default MathText;
