import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private version: any = null;

  constructor() {
    CapacitorUpdater.notifyAppReady();
  }

  ngOnInit(): void {
    this.setupAppUpdater();
  }

  private setupAppUpdater(): void {
    // Listen to app state changes
    App.addListener('appStateChange', async (state) => {
      if (state.isActive) {
        // Ensure download occurs while the app is active, or download may fail
        try {
          this.version = await CapacitorUpdater.download({
            url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.4/dist.zip',
            version: '0.0.4' // Adding the required version property
          });
          console.log('Update downloaded:', this.version);
        } catch (error) {
          console.error('Failed to download update:', error);
        }
      }

      if (!state.isActive && this.version) {
        // Activate the update when the application is sent to background
        SplashScreen.show();
        try {
          await CapacitorUpdater.set(this.version);
          // At this point, the new version should be active, and will need to hide the splash screen
        } catch (error) {
          console.error('Failed to apply update:', error);
          SplashScreen.hide(); // Hide the splash screen again if something went wrong
        }
      }
    });
  }
}
