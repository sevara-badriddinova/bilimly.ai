export type AppSettings = {
  darkMode: boolean;
  notifications: {
    daily: boolean;
    streak: boolean;
    marketing: boolean;
  };
  twoFactorEnabled: boolean;
  showDevices: boolean;
};

const SETTINGS_PREFIX = "bilimly_settings";

export const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  notifications: {
    daily: true,
    streak: true,
    marketing: false,
  },
  twoFactorEnabled: false,
  showDevices: false,
};

export function getSettingsKey(userId?: number | string | null) {
  return userId === undefined || userId === null ? SETTINGS_PREFIX : `${SETTINGS_PREFIX}:${userId}`;
}

export function loadSettings(userId?: number | string | null): AppSettings {
  try {
    const saved = localStorage.getItem(getSettingsKey(userId)) || localStorage.getItem(SETTINGS_PREFIX);
    return saved ? mergeSettings(JSON.parse(saved)) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings, userId?: number | string | null) {
  localStorage.setItem(getSettingsKey(userId), JSON.stringify(settings));
}

function mergeSettings(value: unknown): AppSettings {
  const saved = value && typeof value === "object" ? value as Partial<AppSettings> : {};
  return {
    ...DEFAULT_SETTINGS,
    ...saved,
    notifications: {
      ...DEFAULT_SETTINGS.notifications,
      ...saved.notifications,
    },
  };
}
