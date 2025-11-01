
import type { AstrologicalData, ZodiacSign, PlanetName } from './types';

export const ZODIAC_SIGNS: ZodiacSign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋', 'Leo': '♌', 'Virgo': '♍',
    'Libra': '♎', 'Scorpio': '♏', 'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
};

export const PLANET_SYMBOLS: Record<PlanetName, string> = {
    'Sun': '☉', 'Moon': '☽', 'Mercury': '☿', 'Venus': '♀', 'Mars': '♂', 'Jupiter': '♃', 'Saturn': '♄',
    'Uranus': '♅', 'Neptune': '♆', 'Pluto': '♇', 'Ascendant': 'AC', 'Midheaven': 'MC'
};

export const PLANET_COLORS: Record<PlanetName, string> = {
    'Sun': '#FFD700', 'Moon': '#C0C0C0', 'Mercury': '#87CEEB', 'Venus': '#FFB6C1', 'Mars': '#FF4500',
    'Jupiter': '#9370DB', 'Saturn': '#A9A9A9', 'Uranus': '#00FFFF', 'Neptune': '#4169E1', 'Pluto': '#708090',
    'Ascendant': '#32CD32', 'Midheaven': '#DAA520'
};

// This is mock data to simulate the output of a backend astrological calculation service.
export const MOCK_ASTROLOGICAL_DATA: AstrologicalData = {
  planets: [
    { name: 'Sun', sign: 'Aries', degrees: 15.2, house: 10 },
    { name: 'Moon', sign: 'Leo', degrees: 23.8, house: 2 },
    { name: 'Mercury', sign: 'Pisces', degrees: 28.1, house: 9 },
    { name: 'Venus', sign: 'Taurus', degrees: 5.5, house: 11 },
    { name: 'Mars', sign: 'Sagittarius', degrees: 19.9, house: 6 },
    { name: 'Jupiter', sign: 'Cancer', degrees: 12.3, house: 1 },
    { name: 'Saturn', sign: 'Libra', degrees: 2.1, house: 4 },
    { name: 'Uranus', sign: 'Capricorn', degrees: 22.4, house: 7 },
    { name: 'Neptune', sign: 'Aquarius', degrees: 1.7, house: 8 },
    { name: 'Pluto', sign: 'Scorpio', degrees: 17.6, house: 5 },
    { name: 'Ascendant', sign: 'Gemini', degrees: 29.5, house: 1 },
    { name: 'Midheaven', sign: 'Aries', degrees: 1.1, house: 10 }
  ],
  houses: [
    { house: 1, sign: 'Gemini', degrees: 29.5 },
    { house: 2, sign: 'Cancer', degrees: 25.0 },
    { house: 3, sign: 'Leo', degrees: 28.0 },
    { house: 4, sign: 'Virgo', degrees: 29.0 },
    { house: 5, sign: 'Libra', degrees: 27.0 },
    { house: 6, sign: 'Scorpio', degrees: 23.0 },
    { house: 7, sign: 'Sagittarius', degrees: 29.5 },
    { house: 8, sign: 'Capricorn', degrees: 25.0 },
    { house: 9, sign: 'Aquarius', degrees: 28.0 },
    { house: 10, sign: 'Pisces', degrees: 29.0 },
    { house: 11, sign: 'Aries', degrees: 27.0 },
    { house: 12, sign: 'Taurus', degrees: 23.0 },
  ],
  aspects: [
    { type: 'Square', planet1: 'Sun', planet2: 'Jupiter', orb: 2.9 },
    { type: 'Trine', planet1: 'Moon', planet2: 'Mars', orb: 3.9 },
    { type: 'Opposition', planet1: 'Saturn', planet2: 'Midheaven', orb: 1.0 }
  ],
  bullets: [
    "Sun in House 10: Career-focused, ambitious, desire for public recognition.",
    "Moon in Leo: Expressive emotions, needs admiration, dramatic flair.",
    "Ascendant in Gemini: Curious, communicative, adaptable, appears youthful.",
    "Sun square Jupiter: Tendency towards over-optimism, risk-taking in career, potential for big success through discipline.",
    "Saturn opposition Midheaven: Challenges with authority figures, delays or hard work needed to achieve career goals."
  ]
};
