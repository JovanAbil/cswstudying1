import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/contrib/mhchem';
import 'katex/dist/katex.min.css';

interface MathTextProps {
  children: string | number;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

// Convert common math notation to LaTeX
const preprocessMath = (text: string): string => {
  let processed = String(text);

  // Protect existing LaTeX blocks
  const latexBlocks: string[] = [];
  processed = processed.replace(/\$\$[\s\S]*?\$\$|\$[^$]*?\$/g, (match) => {
    latexBlocks.push(match);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });

  // --- SIMPLIFIED CHEMICAL FORMULA REGEX (MH-CHEM SAFE) ---
  processed = processed.replace(
    /\b([A-Z][a-z]?(?:\d+)?(?:\([A-Za-z0-9]+\)\d*)*(?:[+-]?\d*[+-]?)?)\b/g,
    (match) => {
      // Skip normal words
      if (/^[A-Z][a-z]+$/.test(match)) return match;
      const blacklist = [
        'The', 'This', 'That', 'An', 'A', 'In', 'Is', 'On', 'By', 'It',
        'At', 'As', 'Be', 'If', 'No', 'To'
      ];
      if (blacklist.includes(match)) return match;

      // Wrap in mhchem syntax — no superscript remapping, mhchem handles that
      const formula = `$\\ce{${match}}$`;
      latexBlocks.push(formula);
      return `__LATEX_${latexBlocks.length - 1}__`;
    }
  );

  // Convert limits: lim_x-->a or lim_x-->∞ to LaTeX
  processed = processed.replace(/lim_([a-zA-Z])-->(-?∞|infinity|[^\s]+)/gi, (match, variable, approach) => {
    let approachValue = approach;
    if (approach.toLowerCase() === 'infinity') approachValue = '\\infty';
    else if (approach === '∞') approachValue = '\\infty';
    else if (approach === '-∞') approachValue = '-\\infty';

    const limit = `$\\lim_{${variable} \\to ${approachValue}}$`;
    latexBlocks.push(limit);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });

  // Convert rational functions: (a+b)/(c+d) → \frac{a+b}{c+d}
  processed = processed.replace(/\(([^()]+)\)\/\(([^()]+)\)/g, (match, numerator, denominator) => {
    const frac = `$\\frac{${numerator}}{${denominator}}$`;
    latexBlocks.push(frac);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });

  // Superscripts like x^2 → x^{2}
  processed = processed.replace(/([a-zA-Z0-9)}\]])\^([a-zA-Z0-9({\[]+|\([^)]+\))/g, (match, base, exp) => {
    return `$${base}^{${exp}}$`;
  });

  // Convert log/ln to LaTeX
  const functions = ['log', 'ln'];
  functions.forEach(func => {
    const regex = new RegExp(`\\b${func}\\s*\\(`, 'gi');
    processed = processed.replace(regex, `$\\${func}($`);
  });

  // Restore stored LaTeX blocks
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
      const parts = processed.split(/(\$\$[\s\S]*?\$\$|\$[^$]*?\$)/);

      containerRef.current.innerHTML = '';

      parts.forEach(part => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const span = document.createElement('span');
          span.className = 'math-display';
          try {
            katex.render(part.slice(2, -2), span, {
              displayMode: true,
              throwOnError: false,
              strict: false,
            });
          } catch {
            span.textContent = part;
          }
          containerRef.current.appendChild(span);
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const span = document.createElement('span');
          span.className = 'math-inline';
          try {
            katex.render(part.slice(1, -1), span, {
              displayMode: false,
              throwOnError: false,
              strict: false,
            });
          } catch {
            span.textContent = part;
          }
          containerRef.current.appendChild(span);
        } else if (part) {
          containerRef.current.appendChild(document.createTextNode(part));
        }
      });
    }
  }, [children]);

  const Tag = tag as any;
  return <Tag ref={containerRef} className={className} />;
};

export default MathText;
