import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface ToDoListPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ToDoListPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
