import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.exampleCapgo.updater',
  appName: 'updatercapgoexample',
  plugins: {
    CapacitorUpdater: {
      autoUpdate: false,
    },
  },
  webDir: 'www'
};

export default config;
