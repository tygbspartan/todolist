import './index.scss';

import { ToDoListPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new ToDoListPlugin();
}
export { ToDoListPluginSetup, ToDoListPluginStart } from './types';
