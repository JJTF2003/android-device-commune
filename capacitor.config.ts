import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.89f821292ada45e9a3318b93cd3f54bc',
  appName: 'Task Tracker - A Lovable Project',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'https://89f82129-2ada-45e9-a331-8b93cd3f54bc.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Device: {
      // Device plugin configuration
    }
  }
};

export default config;