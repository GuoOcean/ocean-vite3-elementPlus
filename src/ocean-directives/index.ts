import type { App } from "vue";
import Clickoutside, { directiveName } from "./clickoutside.js";

export function setupDirectives(app: App) {
  app.directive(`ocean-${directiveName}`, Clickoutside);
}
