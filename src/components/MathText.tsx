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

  // --- FIXED CHEMICAL FORMULA REGEX ---
  // Only match sequences that look like chemical formulas (e.g., start with an element and contain numbers, charges, or parentheses)
  processed = processed.replace(
    /\b([A-Z][a-z]?(?:\d+)?(?:\([A-Za-z0-9]+\)\d*)*(?:[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻^0-9+\-]*)?)\b/g,
    (match) => {
      // Skip if it’s clearly a regular English word or short capitalized word
      if (
        !/[A-Z]/.test(match) ||
        /^[A-Z][a-z]+$/.test(match) || // capitalized normal word like "Water"
        match.length < 2 // single letters
      ) {
        return match;
      }

      // Skip common English words starting with capital letters
      const blacklist = ['The', 'This', 'That', 'An', 'A', 'In', 'Is', 'On', 'By', 'It', 'At', 'As', 'Be', 'If', 'No', 'To'];
      if (blacklist.includes(match)) return match;

      // Map Unicode superscripts to ASCII equivalents
      const superscriptMap: Record<string, string> = {
        '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
        '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
        '⁺': '+', '⁻': '-'
      };

      // Normalize Unicode superscripts
      let normalized = match
        .split('')
        .map((c) => superscriptMap[c] ?? c)
        .join('');

      // Remove spaces inside formula
      normalized = normalized.replace(/\s+/g, '');

      // Fix malformed charge patterns
      normalized = normalized.replace(/(\d)([+-])([+-])?/, (_, num, sign1, sign2) => {
        const charge = sign2 && sign2 === sign1 ? `${num}${sign1}` : `${num}${sign1}`;
        return charge;
      });

      // Wrap in mhchem syntax
      const formula = `$\\ce{${normalized}}$`;
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

  // Convert rational functions (a/b → \frac{a}{b})
  processed = processed.replace(/\(([^()]+)\)\/\(([^()]+)\)/g, (match, numerator, denominator) => {
    const frac = `$\\frac{${numerator}}{${denominator}}$`;
    latexBlocks.push(frac);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });

  // Convert superscripts: x^2 -> x^{2}
  processed = processed.replace(/([a-zA-Z0-9)}\]])\^([a-zA-Z0-9({\[]+|\([^)]+\))/g, (match, base, exp) => {
    return `$${base}^{${exp}}$`;
  });

  // Convert log/ln to LaTeX
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
