
import type { Category, Wallpaper } from './types';

export const categories: Category[] = [
  { id: 'artists', name: 'Artists', imageUrl: 'https://picsum.photos/seed/artist/800/600', gridSpan: 2 },
  { id: 'lyrics', name: 'Lyrics & Bars', imageUrl: 'https://picsum.photos/seed/lyrics/600/800' },
  { id: 'hustle', name: 'Dark Hustle', imageUrl: 'https://picsum.photos/seed/hustle/600/800' },
  { id: 'street', name: 'Street Mood', imageUrl: 'https://picsum.photos/seed/street/800/600', gridSpan: 2 },
  { id: 'minimal', name: 'Minimal DHH', imageUrl: 'https://picsum.photos/seed/minimal/600/800' },
  { id: 'amoled', name: 'AMOLED Black', imageUrl: 'https://picsum.photos/seed/amoled/800/600', gridSpan: 2 },
];

const generateResolutions = (seed: string) => ({
    hd: `https://picsum.photos/seed/${seed}/1920/1080`,
    '4k': `https://picsum.photos/seed/${seed}/3840/2160`,
    amoled: `https://picsum.photos/seed/${seed}-b/1080/1920`,
});

export const wallpapers: Wallpaper[] = [
  // Artists
  { id: 1, title: 'Mic Drop', categoryId: 'artists', tags: ['#Performance', '#Bars'], isPremium: false, resolutions: generateResolutions('micdrop'), imageUrl: 'https://picsum.photos/seed/micdrop/500/700' },
  { id: 2, title: 'Studio Session', categoryId: 'artists', tags: ['#Hustle', '#Vibe'], isPremium: true, resolutions: generateResolutions('studiosesh'), imageUrl: 'https://picsum.photos/seed/studiosesh/500/800' },
  { id: 3, title: 'Crowd Control', categoryId: 'artists', tags: ['#Live', '#Energy'], isPremium: false, resolutions: generateResolutions('crowd'), imageUrl: 'https://picsum.photos/seed/crowd/500/600' },
  { id: 22, title: 'Silhouette King', categoryId: 'artists', tags: ['#Icon', '#Vibe'], isPremium: false, resolutions: generateResolutions('silking'), imageUrl: 'https://picsum.photos/seed/silking/500/750' },

  // Lyrics & Bars
  { id: 4, title: 'Gully Grammar', categoryId: 'lyrics', tags: ['#Street', '#Truth'], isPremium: false, resolutions: generateResolutions('gully'), imageUrl: 'https://picsum.photos/seed/gully/500/900' },
  { id: 5, title: 'Poetic Justice', categoryId: 'lyrics', tags: ['#Bars', '#Deep'], isPremium: false, resolutions: generateResolutions('poetic'), imageUrl: 'https://picsum.photos/seed/poetic/500/700' },
  { id: 6, title: 'Kalamkaar', categoryId: 'lyrics', tags: ['#Art', '#Wordplay'], isPremium: true, resolutions: generateResolutions('kalamkaar'), imageUrl: 'https://picsum.photos/seed/kalamkaar/500/800' },

  // Dark Hustle
  { id: 7, title: 'Midnight Oil', categoryId: 'hustle', tags: ['#Grind', '#Hustle'], isPremium: false, resolutions: generateResolutions('midnight'), imageUrl: 'https://picsum.photos/seed/midnight/500/850' },
  { id: 8, title: 'Concrete Dreams', categoryId: 'hustle', tags: ['#Ambition', '#City'], isPremium: false, resolutions: generateResolutions('concrete'), imageUrl: 'https://picsum.photos/seed/concrete/500/700' },
  { id: 9, title: 'Rise Above', categoryId: 'hustle', tags: ['#Pain', '#Success'], isPremium: true, resolutions: generateResolutions('rise'), imageUrl: 'https://picsum.photos/seed/rise/500/650' },
  { id: 23, title: 'Never Sleep', categoryId: 'hustle', tags: ['#Grind', '#Night'], isPremium: false, resolutions: generateResolutions('neversleep'), imageUrl: 'https://picsum.photos/seed/neversleep/500/800' },
  
  // Street Mood
  { id: 10, title: 'Neon Nights', categoryId: 'street', tags: ['#Vibe', '#City'], isPremium: false, resolutions: generateResolutions('neonnights'), imageUrl: 'https://picsum.photos/seed/neonnights/500/700' },
  { id: 11, title: 'Mumbai Cypher', categoryId: 'street', tags: ['#Cypher', '#Street'], isPremium: false, resolutions: generateResolutions('cypher'), imageUrl: 'https://picsum.photos/seed/cypher/500/600' },
  { id: 12, title: 'Graffiti Soul', categoryId: 'street', tags: ['#Art', '#Culture'], isPremium: false, resolutions: generateResolutions('graffiti'), imageUrl: 'https://picsum.photos/seed/graffiti/500/800' },

  // Minimal DHH
  { id: 13, title: 'Single Mic', categoryId: 'minimal', tags: ['#Clean', '#Icon'], isPremium: false, resolutions: generateResolutions('single'), imageUrl: 'https://picsum.photos/seed/single/500/900' },
  { id: 14, title: 'Headphones On', categoryId: 'minimal', tags: ['#Focus', '#Music'], isPremium: true, resolutions: generateResolutions('headphones'), imageUrl: 'https://picsum.photos/seed/headphones/500/900' },
  { id: 15, title: 'Soundwave', categoryId: 'minimal', tags: ['#Abstract', '#Vibe'], isPremium: false, resolutions: generateResolutions('soundwave'), imageUrl: 'https://picsum.photos/seed/soundwave/500/900' },

  // AMOLED Black
  { id: 16, title: 'Blackout Bars', categoryId: 'amoled', tags: ['#Dark', '#Lyrics'], isPremium: false, resolutions: generateResolutions('blackout'), imageUrl: 'https://picsum.photos/seed/blackout/500/950' },
  { id: 17, title: 'Void', categoryId: 'amoled', tags: ['#Minimal', '#Deep'], isPremium: false, resolutions: generateResolutions('void'), imageUrl: 'https://picsum.photos/seed/void/500/950' },
  { id: 18, title: 'Golden Era', categoryId: 'amoled', tags: ['#Premium', '#Icon'], isPremium: true, resolutions: generateResolutions('golden'), imageUrl: 'https://picsum.photos/seed/golden/500/950' },
  { id: 19, title: 'Red Accent', categoryId: 'amoled', tags: ['#Dark', '#Aggressive'], isPremium: false, resolutions: generateResolutions('redaccent'), imageUrl: 'https://picsum.photos/seed/redaccent/500/950' },
  { id: 20, title: 'Green Glitch', categoryId: 'amoled', tags: ['#Glitch', '#Modern'], isPremium: false, resolutions: generateResolutions('greenglitch'), imageUrl: 'https://picsum.photos/seed/greenglitch/500/950' },
  { id: 21, title: 'Hustle Icon', categoryId: 'amoled', tags: ['#Minimal', '#Hustle'], isPremium: false, resolutions: generateResolutions('hustleicon'), imageUrl: 'https://picsum.photos/seed/hustleicon/500/950' },
];
