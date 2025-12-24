import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/contrib/mhchem';
import 'katex/dist/katex.min.css';

interface MathTextProps {
  children: string | number;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  enableChemistry?: boolean;
}

// Convert common math notation to LaTeX
const preprocessMath = (text: string, enableChemistry: boolean = false): string => {
  let processed = String(text);

  // Protect existing LaTeX blocks
  const latexBlocks: string[] = [];
  processed = processed.replace(/\$\$[\s\S]*?\$\$|\$[^$]*?\$/g, (match) => {
    latexBlocks.push(match);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });

  // --- CHEMICAL FORMULA REGEX (MHCHEM) --- Only for chemistry
  if (enableChemistry) {
    processed = processed.replace(
      /\b([A-Z][a-z]?\d*(?:\([A-Z][a-z]?\d*\)\d*)*(?:[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?[⁺⁻]?)\b/g,
      (match) => {
        // Skip normal words
        if (/^[A-Z][a-z]+$/.test(match)) return match;
        const blacklist = [
          'The', 'This', 'That', 'An', 'A', 'In', 'Is', 'On', 'By', 'It',
          'At', 'As', 'Be', 'If', 'No', 'To'
        ];
        if (blacklist.includes(match)) return match;

        // Convert Unicode superscripts to regular format for mhchem
        let normalized = match
          .replace(/⁰/g, '0').replace(/¹/g, '1').replace(/²/g, '2')
          .replace(/³/g, '3').replace(/⁴/g, '4').replace(/⁵/g, '5')
          .replace(/⁶/g, '6').replace(/⁷/g, '7').replace(/⁸/g, '8')
          .replace(/⁹/g, '9').replace(/⁺/g, '+').replace(/⁻/g, '-');

        // Wrap in mhchem syntax — mhchem handles all subscripts and superscripts
        const formula = `$\\ce{${normalized}}$`;
        latexBlocks.push(formula);
        return `__LATEX_${latexBlocks.length - 1}__`;
      }
    );
  }

  // Convert infinity symbols
  processed = processed.replace(/∞/g, '$\\infty$');
  processed = processed.replace(/-∞/g, '$-\\infty$');
  
  // Convert ≤ and ≥ symbols
  processed = processed.replace(/≤/g, '$\\leq$');
  processed = processed.replace(/≥/g, '$\\geq$');
  processed = processed.replace(/<=/g, '$\\leq$');
  processed = processed.replace(/>=/g, '$\\geq$');

  // Convert limits: lim_x-->a or lim_x-->∞ to LaTeX
  processed = processed.replace(/lim_([a-zA-Z])-->(-?∞|infinity|-?\d+|[^\s,]+)/gi, (match, variable, approach) => {
    let approachValue = approach;
    if (approach.toLowerCase() === 'infinity') approachValue = '\\infty';
    else if (approach === '∞') approachValue = '\\infty';
    else if (approach === '-∞') approachValue = '-\\infty';

    const limit = `$\\lim_{${variable} \\to ${approachValue}}$`;
    latexBlocks.push(limit);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });

  // Convert sqrt patterns: sqrt(x) → \sqrt{x}
  processed = processed.replace(/sqrt\(([^)]+)\)/gi, (match, content) => {
    const sqrt = `$\\sqrt{${content}}$`;
    latexBlocks.push(sqrt);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });

  // Convert rational functions: (a+b)/(c+d) → \frac{a+b}{c+d}
  processed = processed.replace(/\(([^()]+)\)\/\(([^()]+)\)/g, (match, numerator, denominator) => {
    const frac = `$\\frac{${numerator}}{${denominator}}$`;
    latexBlocks.push(frac);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });

  // Convert simple fractions like 1/2, 1x/4, -1x^2/4 → \frac{...}{...}
  processed = processed.replace(/(-?[\da-zA-Z\^\{\}]+)\/(\d+)/g, (match, numerator, denominator) => {
    // Skip if it's part of a URL or similar
    if (match.includes('http') || match.includes('://')) return match;
    const frac = `$\\frac{${numerator}}{${denominator}}$`;
    latexBlocks.push(frac);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });

  // Convert polynomial expressions with exponents: x^2, x^3, etc.
  // Handle patterns like 2x^2, -3x^3+5x^2, etc.
  processed = processed.replace(/([a-zA-Z])\^(\d+)/g, (match, base, exp) => {
    const superscript = `$${base}^{${exp}}$`;
    latexBlocks.push(superscript);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });

  // Convert expressions with parenthetical exponents like (x+2)^2
  processed = processed.replace(/\(([^()]+)\)\^(\d+)/g, (match, base, exp) => {
    const superscript = `$(${base})^{${exp}}$`;
    latexBlocks.push(superscript);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });

  // Convert log/ln to LaTeX with proper formatting
  processed = processed.replace(/\blog\s*\(/gi, '$\\log($');
  processed = processed.replace(/\bln\s*\(/gi, '$\\ln($');

  // Convert union symbols
  processed = processed.replace(/\s+U\s+/g, ' $\\cup$ ');

  // Convert interval notation with infinity
  processed = processed.replace(/\(-∞,/g, '$(-\\infty,$');
  processed = processed.replace(/,\s*∞\)/g, '$, \\infty)$');

  // Convert pi symbol
  processed = processed.replace(/\bpi\b/gi, '$\\pi$');

  // Restore stored LaTeX blocks
  latexBlocks.forEach((block, index) => {
    processed = processed.replace(`__LATEX_${index}__`, block);
  });

  // Clean up consecutive dollar signs from multiple replacements
  processed = processed.replace(/\$\s*\$/g, ' ');

  return processed;
};

const MathText = ({ children, className = '', tag = 'span', enableChemistry = false }: MathTextProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const processed = preprocessMath(String(children), enableChemistry);
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
          containerRef.current?.appendChild(span);
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
          containerRef.current?.appendChild(span);
        } else if (part) {
          containerRef.current?.appendChild(document.createTextNode(part));
        }
      });
    }
  }, [children, enableChemistry]);

  const Tag = tag as any;
  return <Tag ref={containerRef} className={className} />;
};

export default MathText;