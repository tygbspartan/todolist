import { PluginInitializerContext } from '../../../src/core/server';
import { ToDoListPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new ToDoListPlugin(initializerContext);
}

export { ToDoListPluginSetup, ToDoListPluginStart } from './types';
