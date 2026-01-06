import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { X, Divide, Superscript, Radical, ArrowRight, Calculator } from 'lucide-react';

interface MathBuilderSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (latex: string) => void;
}

interface MathTemplate {
  name: string;
  icon: React.ReactNode;
  fields: { name: string; placeholder: string }[];
  buildLatex: (values: string[]) => string;
}

const mathTemplates: MathTemplate[] = [
  {
    name: 'Logarithm',
    icon: <span className="font-mono text-sm">log</span>,
    fields: [
      { name: 'Base', placeholder: '10' },
      { name: 'Argument', placeholder: 'x' },
    ],
    buildLatex: (values) => {
      const base = values[0] || '10';
      const arg = values[1] || 'x';
      if (base === 'e') return `$\\ln(${arg})$`;
      if (base === '10') return `$\\log(${arg})$`;
      return `$\\log_{${base}}(${arg})$`;
    },
  },
  {
    name: 'Exponent',
    icon: <Superscript className="h-4 w-4" />,
    fields: [
      { name: 'Base', placeholder: 'x' },
      { name: 'Power', placeholder: '2' },
    ],
    buildLatex: (values) => {
      const base = values[0] || 'x';
      const power = values[1] || '2';
      return `$${base}^{${power}}$`;
    },
  },
  {
    name: 'Fraction',
    icon: <Divide className="h-4 w-4" />,
    fields: [
      { name: 'Numerator', placeholder: '1' },
      { name: 'Denominator', placeholder: 'x' },
    ],
    buildLatex: (values) => {
      const num = values[0] || '1';
      const den = values[1] || 'x';
      return `$\\frac{${num}}{${den}}$`;
    },
  },
  {
    name: 'Square Root',
    icon: <Radical className="h-4 w-4" />,
    fields: [
      { name: 'Radicand', placeholder: 'x' },
    ],
    buildLatex: (values) => {
      const rad = values[0] || 'x';
      return `$\\sqrt{${rad}}$`;
    },
  },
  {
    name: 'Nth Root',
    icon: <span className="font-mono text-xs">ⁿ√</span>,
    fields: [
      { name: 'Index (n)', placeholder: '3' },
      { name: 'Radicand', placeholder: 'x' },
    ],
    buildLatex: (values) => {
      const n = values[0] || '3';
      const rad = values[1] || 'x';
      return `$\\sqrt[${n}]{${rad}}$`;
    },
  },
  {
    name: 'Limit',
    icon: <span className="font-mono text-xs">lim</span>,
    fields: [
      { name: 'Variable', placeholder: 'x' },
      { name: 'Approaches', placeholder: '∞' },
      { name: 'Expression', placeholder: 'f(x)' },
    ],
    buildLatex: (values) => {
      const variable = values[0] || 'x';
      let approaches = values[1] || '∞';
      const expr = values[2] || 'f(x)';
      if (approaches === '∞' || approaches === 'infinity') approaches = '\\infty';
      if (approaches === '-∞' || approaches === '-infinity') approaches = '-\\infty';
      return `$\\lim_{${variable} \\to ${approaches}} ${expr}$`;
    },
  },
];

const MathBuilderSidebar = ({ isOpen, onClose, onInsert }: MathBuilderSidebarProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<MathTemplate | null>(null);
  const [fieldValues, setFieldValues] = useState<string[]>([]);

  const handleSelectTemplate = (template: MathTemplate) => {
    setSelectedTemplate(template);
    setFieldValues(new Array(template.fields.length).fill(''));
  };

  const handleFieldChange = (index: number, value: string) => {
    const newValues = [...fieldValues];
    newValues[index] = value;
    setFieldValues(newValues);
  };

  const handleInsert = () => {
    if (selectedTemplate) {
      const latex = selectedTemplate.buildLatex(fieldValues);
      onInsert(latex);
      setSelectedTemplate(null);
      setFieldValues([]);
    }
  };

  const handleBack = () => {
    setSelectedTemplate(null);
    setFieldValues([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-background border-l shadow-lg z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Math Builder</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {!selectedTemplate ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">
              Select a math function to insert:
            </p>
            {mathTemplates.map((template) => (
              <Button
                key={template.name}
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={() => handleSelectTemplate(template)}
              >
                <span className="w-8 flex justify-center">{template.icon}</span>
                {template.name}
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={handleBack} className="mb-2">
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to templates
            </Button>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 flex justify-center">{selectedTemplate.icon}</span>
              <h3 className="font-medium">{selectedTemplate.name}</h3>
            </div>

            <Separator />

            <div className="space-y-4 mt-4">
              {selectedTemplate.fields.map((field, index) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={`field-${index}`}>{field.name}</Label>
                  <Input
                    id={`field-${index}`}
                    placeholder={field.placeholder}
                    value={fieldValues[index] || ''}
                    onChange={(e) => handleFieldChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
                {selectedTemplate.buildLatex(fieldValues)}
              </div>
            </div>

            <Button className="w-full" onClick={handleInsert}>
              Insert Math
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default MathBuilderSidebar;
