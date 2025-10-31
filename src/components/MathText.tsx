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
  
  // Convert rational functions to fractions: ((ax+b)^c)/((dx+e)^f) -> \frac{(ax+b)^c}{(dx+e)^f}
  processed = processed.replace(/\(([^()]+(?:\([^()]*\))*[^()]*)\)\/\(([^()]+(?:\([^()]*\))*[^()]*)\)/g, (match, numerator, denominator) => {
    return `$\\frac{${numerator}}{${denominator}}$`;
  });
  
  // Convert superscripts: x^2 -> x^{2}, x^2y -> x^{2}y
  processed = processed.replace(/([a-zA-Z0-9)}\]])\^([a-zA-Z0-9({\[]+|\([^)]+\))/g, (match, base, exp) => {
    return `$${base}^{${exp}}$`;
  });
  
  // Convert only logarithmic functions and limits to LaTeX
  const functions = ['log', 'ln', 'lim'];
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