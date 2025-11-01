
export interface BirthData {
  name: string;
  date: string;
  time: string;
  location: string;
}

export type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export type PlanetName = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto' | 'Ascendant' | 'Midheaven';

export interface PlanetData {
  name: PlanetName;
  sign: ZodiacSign;
  degrees: number;
  house: number;
}

export interface HouseCuspData {
    house: number;
    sign: ZodiacSign;
    degrees: number;
}

export type AspectType = 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition';

export interface AspectData {
    type: AspectType;
    planet1: PlanetName;
    planet2: PlanetName;
    orb: number;
}

export interface AstrologicalData {
  planets: PlanetData[];
  houses: HouseCuspData[];
  aspects: AspectData[];
  bullets: string[];
}
