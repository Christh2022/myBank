export const width = window.innerWidth;
export const height = window.innerHeight;

export const isMobile = width <= 767;
export const isTablet = width > 767 && width <= 1024;
export const isDesktop = width > 1024;
export const isLandscape = width > height;