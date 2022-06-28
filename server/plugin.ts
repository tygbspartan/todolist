import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { ToDoListPluginSetup, ToDoListPluginStart } from './types';
import { defineRoutes } from './routes';

export class ToDoListPlugin implements Plugin<ToDoListPluginSetup, ToDoListPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('to_do_list: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('to_do_list: Started');
    return {};
  }

  public stop() {}
}
