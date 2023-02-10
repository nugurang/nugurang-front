const defaultThemeKey = 'light';
export const getThemeKey = () => {
  return localStorage.getItem('theme-key');
};
export const setThemeKey = (key: string) => {
  localStorage.setItem('theme-key', key);
};
export const resetThemeKey = () => {
  setThemeKey(defaultThemeKey);
};
