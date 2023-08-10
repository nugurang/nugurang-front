import LocalStorage from "@/libraries/localStorage";

const isClientSide = () => {
  if (typeof window !== 'undefined') return true;
  else return false;
}

const getTheme = () => {
  if(isClientSide()) {
    return LocalStorage.getItem('theme');
  }
};

const updateTheme = (theme?: string) => {
  if(isClientSide()) {
    if(theme === 'dark') {
      LocalStorage.setItem('theme', theme);
      document.documentElement.classList.add('dark');
    } else {
      LocalStorage.removeItem('theme');
      document.documentElement.classList.remove('dark');
    }
  }
};

const applyTheme = () => {
  if(isClientSide()) {
    const isAuto = LocalStorage.getItem('theme') === 'auto' || !LocalStorage.getItem('theme');
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (isAuto) {
      if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        updateTheme('dark');
      } else {
        updateTheme('light');
      }
    } else {
      if (LocalStorage.getItem('theme') === 'dark') {
        updateTheme('dark');
      } else {
        updateTheme('light');
      }
    }
  }
};

const ClientSideSettingsService = {
  getTheme,
  updateTheme,
  applyTheme,
};

export default ClientSideSettingsService;
