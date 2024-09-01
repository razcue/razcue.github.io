import { setup } from '@storybook/vue3';
import { registerPlugins } from '../src/plugins';
import 'vuetify/styles'

setup((app) => {
  registerPlugins(app);
});