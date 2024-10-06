import { setup } from '@storybook/vue3';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import type { Preview } from '@storybook/vue3';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs']
};

setup((app) => {
  app.use(ElementPlus);
});

export default preview;
