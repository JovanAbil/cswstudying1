import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MathQuickInputProps {
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
  value: string;
  onChange: (value: string) => void;
  useUnicode?: boolean; // If true, insert unicode symbols instead of LaTeX
  defaultOpen?: boolean;
}

const symbols = [
  { label: '∞', latex: '\\infty', unicode: '∞', tooltip: 'Infinity' },
  { label: 'π', latex: '\\pi', unicode: 'π', tooltip: 'Pi' },
  { label: '°', latex: '^\\circ', unicode: '°', tooltip: 'Degrees' },
  { label: '≤', latex: '\\leq', unicode: '≤', tooltip: 'Less than or equal' },
  { label: '≥', latex: '\\geq', unicode: '≥', tooltip: 'Greater than or equal' },
  { label: '≠', latex: '\\neq', unicode: '≠', tooltip: 'Not equal' },
  { label: '±', latex: '\\pm', unicode: '±', tooltip: 'Plus/Minus' },
  { label: '×', latex: '\\times', unicode: '×', tooltip: 'Multiply' },
  { label: '÷', latex: '\\div', unicode: '÷', tooltip: 'Divide' },
  { label: '→', latex: '\\to', unicode: '→', tooltip: 'Arrow (approaches)' },
  { label: '∈', latex: '\\in', unicode: '∈', tooltip: 'Element of' },
  { label: '∪', latex: '\\cup', unicode: '∪', tooltip: 'Union' },
  { label: '∩', latex: '\\cap', unicode: '∩', tooltip: 'Intersection' },
  { label: 'θ', latex: '\\theta', unicode: 'θ', tooltip: 'Theta' },
  { label: 'α', latex: '\\alpha', unicode: 'α', tooltip: 'Alpha' },
  { label: 'β', latex: '\\beta', unicode: 'β', tooltip: 'Beta' },
  { label: 'Δ', latex: '\\Delta', unicode: 'Δ', tooltip: 'Delta' },
  { label: 'Σ', latex: '\\sum', unicode: 'Σ', tooltip: 'Summation' },
  { label: '∫', latex: '\\int', unicode: '∫', tooltip: 'Integral' },
];

const mathFunctions = [
  { label: '√', latex: '\\sqrt{}', unicode: '√()', cursorOffset: -1, tooltip: 'Square root (type sqrt)' },
  { label: '∛', latex: '\\sqrt[3]{}', unicode: '∛()', cursorOffset: -1, tooltip: 'Cube root (type cbrt)' },
  { label: 'ⁿ√', latex: '\\sqrt[n]{}', unicode: 'ⁿ√()', cursorOffset: -1, tooltip: 'Nth root (type nrt)' },
  { label: 'x²', latex: '^{2}', unicode: '²', cursorOffset: 0, tooltip: 'Superscript (press ^)' },
  { label: 'xₙ', latex: '_{}', unicode: '₍₎', cursorOffset: -1, tooltip: 'Subscript (press _)' },
  { label: 'a/b', latex: '\\frac{}{}', unicode: '/', cursorOffset: 0, tooltip: 'Fraction (type /)' },
  { label: 'lim', latex: '\\lim_{x \\to }', unicode: 'lim(x→)', cursorOffset: -1, tooltip: 'Limit (type lim)' },
  { label: 'log', latex: '\\log_{}', unicode: 'log₍₎', cursorOffset: -1, tooltip: 'Logarithm (type log)' },
  { label: 'ln', latex: '\\ln', unicode: 'ln', cursorOffset: 0, tooltip: 'Natural log (type ln)' },
  { label: 'sin', latex: '\\sin', unicode: 'sin', cursorOffset: 0, tooltip: 'Sine' },
  { label: 'cos', latex: '\\cos', unicode: 'cos', cursorOffset: 0, tooltip: 'Cosine' },
  { label: 'tan', latex: '\\tan', unicode: 'tan', cursorOffset: 0, tooltip: 'Tangent' },
  { label: 'sin⁻¹', latex: '\\sin^{-1}', unicode: 'sin⁻¹', cursorOffset: 0, tooltip: 'Inverse sine' },
  { label: 'cos⁻¹', latex: '\\cos^{-1}', unicode: 'cos⁻¹', cursorOffset: 0, tooltip: 'Inverse cosine' },
  { label: 'tan⁻¹', latex: '\\tan^{-1}', unicode: 'tan⁻¹', cursorOffset: 0, tooltip: 'Inverse tangent' },
  { label: '|x|', latex: '|x|', unicode: '|x|', cursorOffset: -1, tooltip: 'Absolute value' },
  { label: 'eˣ', latex: 'e^{}', unicode: 'e^()', cursorOffset: -1, tooltip: 'Exponential (type exp)' },
];

// Desmos-like keyboard shortcuts
const keyboardShortcuts: { pattern: RegExp; latexReplacement: string; unicodeReplacement: string; cursorOffset: number }[] = [
  { pattern: /sqrt$/i, latexReplacement: '\\sqrt{}', unicodeReplacement: '√()', cursorOffset: -1 },
  { pattern: /cbrt$/i, latexReplacement: '\\sqrt[3]{}', unicodeReplacement: '∛()', cursorOffset: -1 },
  { pattern: /nrt$/i, latexReplacement: '\\sqrt[n]{}', unicodeReplacement: 'ⁿ√()', cursorOffset: -1 },
  { pattern: /lim$/i, latexReplacement: '\\lim_{x \\to }', unicodeReplacement: 'lim(x→)', cursorOffset: -1 },
  { pattern: /ln$/i, latexReplacement: '\\ln()', unicodeReplacement: 'ln()', cursorOffset: -1 },
  { pattern: /exp$/i, latexReplacement: 'e^{}', unicodeReplacement: 'e^()', cursorOffset: -1 },
  { pattern: /inf$/i, latexReplacement: '\\infty', unicodeReplacement: '∞', cursorOffset: 0 },
  { pattern: /pi$/i, latexReplacement: '\\pi', unicodeReplacement: 'π', cursorOffset: 0 },
  { pattern: /theta$/i, latexReplacement: '\\theta', unicodeReplacement: 'θ', cursorOffset: 0 },
  { pattern: /alpha$/i, latexReplacement: '\\alpha', unicodeReplacement: 'α', cursorOffset: 0 },
  { pattern: /beta$/i, latexReplacement: '\\beta', unicodeReplacement: 'β', cursorOffset: 0 },
  { pattern: /delta$/i, latexReplacement: '\\Delta', unicodeReplacement: 'Δ', cursorOffset: 0 },
  { pattern: /sum$/i, latexReplacement: '\\sum_{}^{}', unicodeReplacement: 'Σ', cursorOffset: 0 },
  { pattern: /int$/i, latexReplacement: '\\int_{}^{}', unicodeReplacement: '∫', cursorOffset: 0 },
  { pattern: /pm$/i, latexReplacement: '\\pm', unicodeReplacement: '±', cursorOffset: 0 },
  { pattern: /neq$/i, latexReplacement: '\\neq', unicodeReplacement: '≠', cursorOffset: 0 },
  { pattern: /leq$/i, latexReplacement: '\\leq', unicodeReplacement: '≤', cursorOffset: 0 },
  { pattern: /geq$/i, latexReplacement: '\\geq', unicodeReplacement: '≥', cursorOffset: 0 },
  { pattern: /->$/i, latexReplacement: '\\to', unicodeReplacement: '→', cursorOffset: 0 },
];

const MathQuickInput = ({ textareaRef, inputRef, value, onChange, useUnicode = false, defaultOpen = false }: MathQuickInputProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Support both textarea and input elements
  const getElement = () => textareaRef?.current || inputRef?.current;

  const insertAtCursor = (latex: string, unicode: string, cursorOffset: number = 0) => {
    const element = getElement();
    if (!element) return;

    const textToInsert = useUnicode ? unicode : latex;
    const start = element.selectionStart || 0;
    const end = element.selectionEnd || 0;
    const newValue = value.substring(0, start) + textToInsert + value.substring(end);
    onChange(newValue);

    // Set cursor position after insert
    setTimeout(() => {
      const newPos = start + textToInsert.length + cursorOffset;
      element.setSelectionRange(newPos, newPos);
      element.focus();
    }, 0);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const element = getElement();
    if (!element) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const cursorPos = element.selectionStart || 0;
      const textBeforeCursor = value.substring(0, cursorPos);

      // Check for special key shortcuts
      if (e.key === '_') {
        e.preventDefault();
        insertAtCursor('_{}', '₍₎', -1);
        return;
      }

      if (e.key === '^') {
        e.preventDefault();
        insertAtCursor('^{}', '^()', -1);
        return;
      }

      // Check for word-based shortcuts on space
      if (e.key === ' ') {
        for (const shortcut of keyboardShortcuts) {
          if (shortcut.pattern.test(textBeforeCursor)) {
            e.preventDefault();
            const match = textBeforeCursor.match(shortcut.pattern);
            if (match) {
              const matchStart = cursorPos - match[0].length;
              const replacement = useUnicode ? shortcut.unicodeReplacement : shortcut.latexReplacement;
              const newValue = 
                value.substring(0, matchStart) + 
                replacement + 
                value.substring(cursorPos);
              onChange(newValue);
              
              setTimeout(() => {
                const newPos = matchStart + replacement.length + shortcut.cursorOffset;
                element.setSelectionRange(newPos, newPos);
                element.focus();
              }, 0);
            }
            return;
          }
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [value, onChange, textareaRef, inputRef, useUnicode]);

  return (
    <TooltipProvider>
      <div className="mt-2">
        {/* Toggle button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full py-2"
        >
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span>Math symbols & shortcuts</span>
        </button>

        {/* Collapsible content */}
        {isOpen && (
          <div className="p-3 bg-muted/50 rounded-lg border space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium">Quick Math:</span>
              <span>Type shortcuts like <code className="px-1 bg-muted rounded">sqrt</code>, <code className="px-1 bg-muted rounded">lim</code>, <code className="px-1 bg-muted rounded">inf</code> + Space</span>
            </div>

            {/* Symbols row */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Symbols</span>
              <div className="flex flex-wrap gap-1">
                {symbols.map((sym) => (
                  <Tooltip key={sym.label}>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-base font-normal"
                        onClick={() => insertAtCursor(sym.latex, sym.unicode)}
                      >
                        {sym.label}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{sym.tooltip}</p>
                      {!useUnicode && <code className="text-xs text-muted-foreground">{sym.latex}</code>}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Math functions row */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Functions</span>
              <div className="flex flex-wrap gap-1">
                {mathFunctions.map((func) => (
                  <Tooltip key={func.label}>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-sm font-normal"
                        onClick={() => insertAtCursor(func.latex, func.unicode, func.cursorOffset)}
                      >
                        {func.label}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{func.tooltip}</p>
                      {!useUnicode && <code className="text-xs text-muted-foreground">{func.latex}</code>}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-0.5">
              <p><kbd className="px-1 bg-muted rounded">^</kbd> for superscript, <kbd className="px-1 bg-muted rounded">_</kbd> for subscript</p>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default MathQuickInput;