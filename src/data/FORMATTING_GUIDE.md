# Math Question Formatting Guide

This guide shows how to properly format math expressions in question data files using LaTeX syntax.

## Basic Rules

1. **Wrap all math in `$...$`** - Any mathematical expression needs dollar signs
2. **Use double backslashes** - In JSON/TypeScript strings, use `\\` instead of `\`
3. **Test your LaTeX** - Use an online LaTeX editor like [Overleaf](https://www.overleaf.com) to verify syntax

---

## Fractions

### ❌ WRONG (plain text)
```typescript
"question": "Find f(x) = (3x^2+1)/(x^2+4)"
```

### ✅ CORRECT (LaTeX)
```typescript
"question": "Find $f(x) = \\frac{3x^2+1}{x^2+4}$"
```

**Syntax:** `$\\frac{numerator}{denominator}$`

---

## Limits

### ❌ WRONG
```typescript
"question": "Find lim_x-->∞ f(x)"
"question": "Find lim_x-->-∞ f(x)"  
"question": "Find lim_x-->3+ f(x)"
```

### ✅ CORRECT
```typescript
"question": "Find $\\lim_{x \\to \\infty} f(x)$"
"question": "Find $\\lim_{x \\to -\\infty} f(x)$"
"question": "Find $\\lim_{x \\to 3^+} f(x)$"
```

**Syntax:** `$\\lim_{x \\to VALUE} f(x)$`

- Use `\\infty` for infinity
- Use `3^+` for right-hand limit, `3^-` for left-hand limit

---

## Exponents

### ❌ WRONG
```typescript
"question": "Expand (x-3)^5"
"question": "Find x^2 + 3x^3"
```

### ✅ CORRECT
```typescript
"question": "Expand $(x-3)^5$"
"question": "Find $x^2 + 3x^3$"
```

**Syntax:** `$base^{exponent}$` or `$(expression)^{exponent}$`

---

## Square Roots

### ❌ WRONG
```typescript
"question": "Find sqrt(x+1)"
```

### ✅ CORRECT
```typescript
"question": "Find $\\sqrt{x+1}$"
```

**Syntax:** `$\\sqrt{expression}$`

---

## Inequalities

### ❌ WRONG
```typescript
"question": "For -2 <= x <= 5"
"question": "When x >= 3"
```

### ✅ CORRECT
```typescript
"question": "For $-2 \\leq x \\leq 5$"
"question": "When $x \\geq 3$"
```

**Syntax:** 
- `\\leq` for ≤
- `\\geq` for ≥

---

## Logarithms

### ❌ WRONG
```typescript
"question": "Simplify log(3)-log(x)"
"question": "Evaluate log_5(25)"
"question": "Simplify 2log(x)+(1/2)log(y)"
"question": "What is ln(e^6)?"
```

### ✅ CORRECT
```typescript
"question": "Simplify $\\log(3)-\\log(x)$"
"question": "Evaluate $\\log_5(25)$"
"question": "Simplify $2\\log(x)+\\frac{1}{2}\\log(y)$"
"question": "What is $\\ln(e^6)$?"
```

**Syntax:**
- `\\log(x)` for common log (base 10)
- `\\log_b(x)` for log base b (e.g., `\\log_2(x)`, `\\log_5(25)`)
- `\\ln(x)` for natural log (base e)
- Use `\\frac{}{}` for coefficients like `\\frac{1}{2}\\log(x)`

---

## Function Definitions

### ❌ WRONG
```typescript
"question": "Let f(x) = x^3 + x^2 - 6x"
"question": "Given g(x) = ((x+1)(2x-3)^2)/((5x-7)^2)"
```

### ✅ CORRECT
```typescript
"question": "Let $f(x) = x^3 + x^2 - 6x$"
"question": "Given $g(x) = \\frac{(x+1)(2x-3)^2}{(5x-7)^2}$"
```

---

## Interval Notation

### ❌ WRONG
```typescript
"correctAnswer": "(-3, 0) U (2, ∞)"
```

### ✅ CORRECT
```typescript
"correctAnswer": "$(-3, 0) \\cup (2, \\infty)$"
```

**Syntax:** `\\cup` for union (∪), `\\infty` for infinity

---

## Greek Letters

```typescript
"question": "Find $\\pi r^2$"        // π
"question": "When $\\theta = 45°$"   // θ
"question": "Let $\\alpha = 2$"      // α
```

---

## Complete Examples

### Multiple Choice with Fractions
```typescript
{
  "id": "example-1",
  "type": "multiple-choice",
  "question": "Which function has a horizontal asymptote? $f(x) = \\frac{3x^2+x-1}{x^2+4}$, $g(x) = \\frac{(x+1)(2x-3)^2}{(5x-7)^2}$",
  "options": [
    { "label": "A", "value": "A", "text": "f(x) only" },
    { "label": "B", "value": "B", "text": "g(x) only" },
    { "label": "C", "value": "C", "text": "Both f(x) and g(x)" },
    { "label": "D", "value": "D", "text": "Neither" }
  ],
  "correctAnswer": "C",
  "explanation": "Both have equal degrees in numerator and denominator."
}
```

### Free Response with Limits
```typescript
{
  "id": "example-2",
  "type": "free-response",
  "question": "Evaluate the following limits for $g(x) = -3(x+1)^5(x-3)^2$: a) $\\lim_{x \\to -\\infty} g(x)$ b) $\\lim_{x \\to \\infty} g(x)$",
  "correctAnswer": "a) $\\infty$ b) $-\\infty$",
  "explanation": "Use end behavior based on leading term."
}
```

### Multiple Choice with Math in Options
```typescript
{
  "id": "example-3",
  "type": "multiple-choice",
  "question": "Which polynomial has the end behavior: $\\lim_{x \\to -\\infty} g(x) = -\\infty$ and $\\lim_{x \\to \\infty} g(x) = -\\infty$?",
  "options": [
    { "label": "A", "value": "A", "text": "$-4x^7 - 3x^3 + x - 6$" },
    { "label": "B", "value": "B", "text": "$-3x^6 + 5x^2 + 6x - 1$" },
    { "label": "C", "value": "C", "text": "$3x^3 + x^2 - 5x + 1$" },
    { "label": "D", "value": "D", "text": "$2x^4 - 7x^3 + 3x^2 + 1$" }
  ],
  "correctAnswer": "B",
  "explanation": "Even degree with negative leading coefficient."
}
```

### Rational Function with Complex Fraction
```typescript
{
  "id": "example-4",
  "type": "multiple-choice",
  "question": "Let $k(x) = \\frac{(x-3)^3(x+2)^3}{(x-3)^2(x+2)^4}$. Which statement about the graph of k is correct?",
  "options": [
    { "label": "A", "value": "A", "text": "Vertical asymptote at x = -2, hole at x = 3" },
    { "label": "B", "value": "B", "text": "Vertical asymptote at x = 3, hole at x = -2" },
    { "label": "C", "value": "C", "text": "Vertical asymptotes at both x = -2 and x = 3" },
    { "label": "D", "value": "D", "text": "Holes at both x = -2 and x = 3" }
  ],
  "correctAnswer": "A",
  "explanation": "Factor and simplify to find holes vs asymptotes."
}
```

---

## Dollar Signs (Currency)

To display a literal dollar sign without triggering LaTeX, escape it with a backslash.

### ❌ WRONG (triggers LaTeX)
```typescript
"question": "The stock costs $50"
```

### ✅ CORRECT (escaped dollar sign)
```typescript
"question": "The stock costs \\$50"
```

**Syntax:** Use `\\$` for a literal dollar sign in currency values

---

## Quick Reference Table

| Math Element | LaTeX Syntax | Example |
|-------------|--------------|---------|
| Fraction | `\\frac{a}{b}` | `$\\frac{x+1}{x-1}$` |
| Limit | `\\lim_{x \\to a}` | `$\\lim_{x \\to \\infty}$` |
| Infinity | `\\infty` | `$x \\to \\infty$` |
| Square root | `\\sqrt{x}` | `$\\sqrt{x+1}$` |
| Exponent | `x^{n}` | `$x^{2}$` |
| Less/equal | `\\leq` | `$x \\leq 5$` |
| Greater/equal | `\\geq` | `$x \\geq 3$` |
| Union | `\\cup` | `$(0,1) \\cup (2,3)$` |
| Pi | `\\pi` | `$\\pi r^2$` |
| Common log | `\\log(x)` | `$\\log(100)$` |
| Log base b | `\\log_b(x)` | `$\\log_2(8)$` |
| Natural log | `\\ln(x)` | `$\\ln(e^2)$` |

---

## Troubleshooting

**Problem:** Math not rendering, showing raw text
- **Fix:** Make sure you have `$...$` around the math

**Problem:** Backslashes disappearing
- **Fix:** Use `\\` instead of `\` in TypeScript/JSON strings

**Problem:** Fractions appearing as (a)/(b)
- **Fix:** Use `$\\frac{a}{b}$` syntax

**Problem:** Limits showing as plain text
- **Fix:** Use `$\\lim_{x \\to a}$` syntax
