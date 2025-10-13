import { Question } from '@/types/quiz';

export const atomicQuestions: Question[] = [
  {
    id: 'atomic-1',
    type: 'free-response',
    question: 'Which photon has the most energy and why? 345 nm or 555 nm?',
    correctAnswer: '345 nm',
    explanation: 'Energy E = hc/λ. Shorter wavelength → larger E, so 345 nm photon has more energy than 555 nm.'
  },
  {
    id: 'atomic-2',
    type: 'free-response',
    question: 'Which transition would ABSORB the most energy and why? n = 4 → n = 2, n = 5 → n = 1, or n = 1 → n = 5',
    correctAnswer: 'n = 1 → n = 5',
    explanation: 'Absorption raises the electron to a higher level. The largest increase in energy (largest ΔE) is from n=1 to n=5.'
  },
  {
    id: 'atomic-3',
    type: 'free-response',
    question: 'Which part of the EM spectrum has the lowest frequency?',
    correctAnswer: 'Radio waves',
    explanation: 'Radio waves have the longest wavelength and therefore the lowest frequency (ν = c/λ).'
  },
  {
    id: 'atomic-4',
    type: 'free-response',
    question: 'Put the EM spectrum in order from highest wavelength to lowest.',
    correctAnswer: 'Radio > Microwave > Infrared > Visible > Ultraviolet > X-ray > Gamma',
    explanation: 'Wavelength decreases left→right; energy and frequency increase left→right (inverse relation λ↔ν).'
  },
  {
    id: 'atomic-5',
    type: 'free-response',
    question: 'Write the electron configuration for Arsenic (As).',
    correctAnswer: '[Ar] 4s2 3d10 4p3',
    explanation: 'Arsenic Z = 33. Expanded: 1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p3.'
  },
  {
    id: 'atomic-6',
    type: 'free-response',
    question: 'Which CATION does the electron configuration [Ar] 3d10 correspond to?',
    correctAnswer: 'Zn²⁺ (commonly) — also Cu⁺ has [Ar]3d10 in some contexts',
    explanation: 'Neutral Zn (Z=30) loses 2e → Zn²⁺ = [Ar]3d10. Cu⁺ (Z=29) also has [Ar]3d10; context determines which is intended.'
  },
  {
    id: 'atomic-7',
    type: 'free-response',
    question: 'Which group always ends its configuration with 2 electrons in the s subshell?',
    correctAnswer: 'Group 2 (alkaline earth metals)',
    explanation: 'Group 2 elements have outer configuration ns2.'
  },
  {
    id: 'atomic-8',
    type: 'free-response',
    question: 'How does the number of valence electrons change as you go down a group?',
    correctAnswer: 'It stays the same',
    explanation: 'Elements in the same group have the same valence electron configuration (same group → same valence electrons).'
  },
  {
    id: 'atomic-9',
    type: 'free-response',
    question: 'A photon has 1.865 × 10⁻¹⁶ J of energy. What is its wavelength?',
    correctAnswer: 'λ = 1.065 × 10⁻⁹ m = 1.065 nm',
    explanation: 'λ = hc/E. Using h = 6.62607015e-34 J·s and c = 2.99792458e8 m/s gives λ = (6.62607015e-34·2.99792458e8)/1.865e-16 ≈ 1.0651×10⁻⁹ m (≈1.065 nm).'
  },
  {
    id: 'atomic-10',
    type: 'free-response',
    question: 'A photon has a wavelength of 467 nm. What is its frequency?',
    correctAnswer: 'ν ≈ 6.4195 × 10¹⁴ Hz',
    explanation: 'ν = c/λ = 2.99792458×10^8 m/s ÷ 467×10⁻9 m ≈ 6.4195387×10^14 Hz.'
  },
  {
    id: 'atomic-11',
    type: 'free-response',
    question: 'A photon has a frequency of 5.455 × 10¹⁵ Hz. What is its energy?',
    correctAnswer: 'E ≈ 3.6145 × 10⁻¹⁸ J  (≈ 22.56 eV)',
    explanation: 'E = hν = 6.62607015×10⁻34 J·s × 5.455×10^15 Hz ≈ 3.6145×10^-18 J. Dividing by 1.602176634×10^-19 J/eV → ≈ 22.560 eV.'
  },
  {
    id: 'atomic-12',
    type: 'free-response',
    question: 'Write the full electron configuration for Gold (Au).',
    correctAnswer: '[Xe] 4f14 5d10 6s1',
    explanation: 'Gold Z = 79. Abbreviated: [Xe] 4f14 5d10 6s1. (Expanded would list all inner shells.)'
  },
  {
    id: 'atomic-13',
    type: 'free-response',
    question: 'Write the abbreviated electron configuration for Antimony (Sb).',
    correctAnswer: '[Kr] 5s2 4d10 5p3',
    explanation: 'Sb Z = 51 → [Kr] 5s2 4d10 5p3.'
  },
  {
    id: 'atomic-14',
    type: 'free-response',
    question: 'Which has a larger radius — Silicon or Phosphorus?',
    correctAnswer: 'Silicon',
    explanation: 'In the same period, atomic radius decreases left→right. Silicon (left of P) is larger.'
  },
  {
    id: 'atomic-15',
    type: 'free-response',
    question: 'Which has a larger ionization energy — Gallium or Thallium?',
    correctAnswer: 'Gallium',
    explanation: 'Ionization energy generally decreases down a group (Ga above Tl), so Ga has the larger IE.'
  },
  {
    id: 'atomic-16',
    type: 'free-response',
    question: 'Which has a larger electronegativity — Sodium or Magnesium?',
    correctAnswer: 'Magnesium',
    explanation: 'Across a period electronegativity increases left→right; Mg (to the right of Na) is more electronegative.'
  },
  {
    id: 'atomic-17',
    type: 'free-response',
    question: 'How many unpaired electrons would be in an atom of Nickel (Ni)?',
    correctAnswer: '2 unpaired electrons',
    explanation: 'Ni (Z = 28) ground-state config [Ar] 4s2 3d8. The 3d8 arrangement has two unpaired electrons in the ground state.'
  },
  {
    id: 'atomic-18a',
    type: 'free-response',
    question: 'Calculate the average atomic mass for imaginary isotopes: Gr-84 (0.14%), Gr-85 (26.08%), Gr-88 (73.78%).',
    correctAnswer: '≈ 87.21 amu',
    explanation: 'Weighted average: 0.0014·84 + 0.2608·85 + 0.7378·88 = 87.212 amu → round to 87.21 amu.'
  },
  {
    id: 'atomic-18b',
    type: 'free-response',
    question: 'Calculate the average atomic mass for imaginary isotopes: C-12 (98.93%), C-13 (1.07%), C-14 (negligible).',
    correctAnswer: '≈ 12.0107 amu',
    explanation: '12(.9893) + 13(.0107)'
  },
  {
    id: 'atomic-18c',
    type: 'free-response',
    question: 'Calculate the average atomic mass for imaginary isotopes: N-14 (99.632%), N-15 (0.0368%).',
    correctAnswer: '≈ 13.954 amu',
    explanation: '14(.99632)+15(.000368).'
  },
  {
    id: 'atomic-19a',
    type: 'free-response',
    question: 'How many atoms are in Al_2(CO_3)_3?',
    correctAnswer: '14',
    explanation: '2 Al + 3 C + 9 O = 14 total'
  },
  {
    id: 'atomic-19b',
    type: 'free-response',
    question: 'How many atoms are in NH_4OH?',
    correctAnswer: '7',
    explanation: '1 N + 5 H + 1 O = 7 total'
  },
  {
    id: 'atomic-20',
    type: 'free-response',
    question: 'Three isotopes of argon occur in nature - Ar-36, Ar-38, Ar-40. Calculate the average atomic mass of argon to two decimal places, given the following relative atomic masses and abundances of each of the isotopes: Ar-36 (35.97amu; 0.337%), Ar-38 (37.96amu; 0.063%), and Ar-40 (39.96amu; 99.600%)',
    correctAnswer: '39.9452937',
    explanation: '35.97(.00337) + 37.96(0.00053) + 39.96(.996)'
  },
  {
    id: 'atomic-21a',
    type: 'free-response',
    question: 'Na-23 half-life 6.7 min: start 61 g, after 26.8 min how many grams left?',
    correctAnswer: '3.8125 g',
    explanation: '26.8/6.7 = 4 half-lives → remaining = 61·(1/2)^4 = 61/16 = 3.8125 g.'
  },
  {
    id: 'atomic-21b',
    type: 'free-response',
    question: 'Rb-85 half-life 18.4 hr: start 300 g, how much time when 4.7 g left?',
    correctAnswer: 't ≈ 110.33 hours (≈ 4.60 days)',
    explanation: 'Solve 300*(1/2)^(t/18.4) = 4.7 → t = 18.4·log2(300/4.7) ≈ 110.33 hr ≈ 4.60 days.'
  },
  {
    id: 'atomic-22',
    type: 'free-response',
    question: 'Cs-131 half-life 125 years. If an object has 25% of the Cs-131 it started with, how old is the object (and what year is it from)?',
    correctAnswer: '250 years old; e.g., if current year 2025 → origin year ≈ 1775',
    explanation: '25% = (1/2)^(t/125) → (1/4) = (1/2)^(t/125) → t/125 = 2 → t = 250 years. If current year = 2025, origin ≈ 2025 − 250 = 1775.'
  },
  {
    id: 'atomic-23a',
    type: 'free-response',
    question: 'Write the nuclear reaction(s): Ruthenium-100 gets hit with an alpha particle and goes through beta decay.',
    correctAnswer: 'Step 1: ¹⁰⁰₄₄Ru + ⁴₂He → ¹⁰⁴₄₆Pd; Step 2 (β⁻ decay): ¹⁰⁴₄₆Pd → ¹⁰⁴₄₇Ag + β⁻',
    explanation: 'Alpha capture increases A by 4 and Z by 2: 100→104, 44→46 (Pd). Then β⁻ decay converts a neutron→proton: Pd-104 → Ag-104 + β⁻ (plus ν̅).'
  },
  {
    id: 'atomic-23b',
    type: 'free-response',
    question: 'Write the nuclear reaction(s): Iridium-194 gets hit with three neutrons and goes through alpha decay.',
    correctAnswer: 'Step 1: ¹⁹⁴₇₇Ir + 3·¹₀n → ¹⁹⁷₇₇Ir; Step 2 (α decay): ¹⁹⁷₇₇Ir → ¹⁹³₇₅Re + ⁴₂He',
    explanation: 'Adding 3 neutrons raises mass 194→197 (Z unchanged). Alpha emission reduces A by 4 and Z by 2: 197→193 and 77→75 (Rhenium).'
  },
  
  {
    id: 'atomic-24',
    type: 'free-response',
    question: 'Write the nuclear reaction(s): Thorium-231 emits a beta and a gamma',
    correctAnswer: '0/-1 e + γ + 231/91 Pa',
    explanation: '.'
  },
  {
    id: 'atomic-25',
    type: 'free-response',
    question: 'What type of light has a wavelength of 5.0 × 10^-4 m?',
    correctAnswer: 'Infrared',
    explanation: 'A wavelength of 5.0×10^-4 m (500 µm) lies in the infrared region of the EM spectrum.'
  },
  {
    id: 'atomic-26',
    type: 'free-response',
    question: 'What type of light has a wavelength of 2.4 × 10^-8 m?',
    correctAnswer: 'X-rays',
    explanation: 'Wavelengths around 10^-8 m are characteristic of X-rays.'
  },
  {
    id: 'atomic-27',
    type: 'free-response',
    question: 'What type of light has a wavelength of 12 mm?',
    correctAnswer: 'Microwaves',
    explanation: 'Wavelengths from 1 mm to 1 m belong to the microwave region.'
  },
  {
    id: 'atomic-28',
    type: 'free-response',
    question: 'An ultraviolet light wave is used to kill bacteria. It has a frequency of 1.2 × 10^15 1/s. Find the wavelength.',
    correctAnswer: '2.5 × 10^-7 m',
    explanation: 'λ = c / ν = (3×10^8) / (1.2×10^15) = 2.5×10^-7 m (ultraviolet range).'
  },
  {
    id: 'atomic-29',
    type: 'free-response',
    question: 'An x-ray has a wavelength of 1.54 × 10^-10 m. Find the frequency of this light.',
    correctAnswer: '1.948 × 10^18 1/s',
    explanation: 'ν = c / λ = (3×10^8) / (1.54×10^-10) = 1.95×10^18 1/s.'
  },
  {
    id: 'atomic-30',
    type: 'free-response',
    question: 'A visible light wave has a frequency of 7.5 × 10^14 1/s. Find the wavelength in nanometers (nm) and determine the color of the light.',
    correctAnswer: '400 nm, violet',
    explanation: 'λ = (3×10^8)/(7.5×10^14) = 4×10^-7 m = 400 nm (violet region).'
  },
  {
    id: 'atomic-31',
    type: 'free-response',
    question: 'One of the light waves produced when hydrogen is energized has a wavelength of 410.5 nm. What is the frequency of this light?',
    correctAnswer: '7.308 × 10^14 1/s',
    explanation: 'ν = c / λ = (3×10^8) / (4.105×10^-7) = 7.31×10^14 1/s.'
  },
  {
    id: 'atomic-32',
    type: 'free-response',
    question: 'The frequency of light used to heat food in a microwave oven is 2.45 GHz. What is the wavelength of this light?',
    correctAnswer: '0.122 m',
    explanation: 'λ = c / ν = (3×10^8) / (2.45×10^9) = 0.122 m.'
  },
  {
    id: 'atomic-33',
    type: 'free-response',
    question: 'A radio wave broadcast on the AM dial has a wavelength of 280.4 m. Find the frequency of this radio wave in hertz and kilohertz.',
    correctAnswer: '1.07×10^6 Hz, 1069.9 kHz',
    explanation: 'ν = (3×10^8) / (280.4) = 1.07×10^6 Hz = 1069.9 kHz.'
  },
  {
    id: 'atomic-34',
    type: 'free-response',
    question: 'What is the wavelength of a radio broadcast with a frequency of 99.5 MHz (FM 99.5)?',
    correctAnswer: '3.015 m',
    explanation: 'λ = (3×10^8) / (99.5×10^6) = 3.02 m.'
  },
  {
    id: 'atomic-35',
    type: 'free-response',
    question: 'Pilots often use waves of about 2.340 m to communicate. What is the frequency of this wave?',
    correctAnswer: '1.28×10^8 1/s',
    explanation: 'ν = (3×10^8) / (2.34) = 1.28×10^8 1/s.'
  },
  {
    id: 'atomic-36',
    type: 'free-response',
    question: 'The light used in night vision devices has a wavelength of about 25 micrometers (µm). What is the frequency and part of the EM spectrum?',
    correctAnswer: '1.2×10^13 1/s, infrared',
    explanation: 'ν = (3×10^8) / (25×10^-6) = 1.2×10^13 1/s (infrared region).'
  },
  {
    id: 'atomic-37',
    type: 'free-response',
    question: 'What is the wavelength of a wave having a frequency of 3.76×10^14 s^-1? What type of wave is this?',
    correctAnswer: '7.98×10^-7 m, visible/infrared',
    explanation: 'λ = (3×10^8)/(3.76×10^14) = 7.98×10^-7 m, near IR/visible border.'
  },
  {
    id: 'atomic-38',
    type: 'free-response',
    question: 'What is the frequency of a 6.9×10^-13 m wave? What type of wave is this?',
    correctAnswer: '4.35×10^20 1/s, gamma rays',
    explanation: 'ν = (3×10^8)/(6.9×10^-13) = 4.35×10^20 1/s (gamma region).'
  },
  {
    id: 'atomic-39',
    type: 'free-response',
    question: 'What is the wavelength of a 2.99 Hz wave? What type of wave is this?',
    correctAnswer: '1.003×10^8 m, radio/TV waves',
    explanation: 'λ = (3×10^8)/(2.99) = 1.00×10^8 m (radio band).'
  },
  {
    id: 'atomic-40',
    type: 'free-response',
    question: 'What is the frequency of a 7.43×10^-5 m wave? What type of wave is this?',
    correctAnswer: '4.04×10^12 1/s, infrared',
    explanation: 'ν = (3×10^8)/(7.43×10^-5) = 4.04×10^12 1/s (infrared).'
  },
  {
    id: 'atomic-41',
    type: 'free-response',
    question: 'What is the wavelength of a 1.28×10^17 Hz wave? What type of wave is this?',
    correctAnswer: '2.34×10^-9 m, X-rays',
    explanation: 'λ = (3×10^8)/(1.28×10^17) = 2.34×10^-9 m (X-ray region).'
  },
  {
    id: 'atomic-42',
    type: 'free-response',
    question: 'What is the frequency of a 2600 cm wave? What type of wave is this?',
    correctAnswer: '1.15×10^8 1/s, radio/TV waves',
    explanation: 'Convert 2600 cm → 26 m. ν = (3×10^8)/(26) = 1.15×10^7 1/s (radio).'
  },
  {
    id: 'atomic-43',
    type: 'free-response',
    question: 'What is the wavelength of a 4.34×10^15 1/s wave? What type of wave is this?',
    correctAnswer: '6.91×10^-8 m, ultraviolet',
    explanation: 'λ = (3×10^8)/(4.34×10^15) = 6.91×10^-8 m (UV range).'
  },
  {
    id: 'atomic-44',
    type: 'free-response',
    question: 'What is the frequency of a 5.6×10^10 micrometer wave? What type of wave is this?',
    correctAnswer: '5.36×10^3 1/s, radio waves',
    explanation: '5.6×10^10 µm = 5.6×10^4 m; ν = (3×10^8)/(5.6×10^4) ≈ 5.36×10^3 1/s (radio).'
  },
];
