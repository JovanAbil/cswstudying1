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
  // Matches entire formulas like: SO4²⁻, NH4⁺, CO3²⁻, H2O, Ca(OH)2, etc.
  processed = processed.replace(/([A-Z][a-z]?\d*(?:\([A-Z][a-z]?\d*\)\d*)*)+[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]*/g, (match) => {
    // Check if this looks like a chemical formula (has numbers or charges)
    if (!/\d|[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]/.test(match)) return match;
    
    // Convert Unicode superscripts to regular characters for LaTeX
    const superscriptMap: { [key: string]: string } = {
      '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
      '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
      '⁺': '+', '⁻': '-'
    };
    
    let result = '';
    let textBuffer = '';
    
    const flushText = () => {
      if (textBuffer) {
        result += `\text{${textBuffer}}`;
        textBuffer = '';
      }
    };
    
    for (let i = 0; i < match.length; i++) {
      const char = match[i];
      
      if (char === '(') {
        flushText();
        result += '(';
      } else if (char === ')') {
        flushText();
        result += ')';
      } else if (/\d/.test(char)) {
        flushText();
        result += `_{${char}}`;
      } else if (superscriptMap[char]) {
        flushText();
        result += `^{${superscriptMap[char]}}`;
      } else {
        textBuffer += char;
      }
    }
    
    flushText();
    const formula = `$${result}$`;
    
    latexBlocks.push(formula);
    return `__LATEX_${latexBlocks.length - 1}__`;
  });
  
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
