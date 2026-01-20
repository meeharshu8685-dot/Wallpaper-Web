
export interface Wallpaper {
  id: number;
  title: string;
  imageUrl: string;
  categoryId: string;
  tags: string[];
  isPremium: boolean;
  resolutions: {
    hd: string;
    '4k': string;
    amoled: string;
  };
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  gridSpan?: number;
}
