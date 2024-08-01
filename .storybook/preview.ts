import type { Preview } from "@storybook/react";
import '../src/styles/vars.scss';
import '../src/styles/index.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'white',
          value: 'rgb(255, 255, 255)',
        },
        {
          name: 'purple dark',
          value: 'rgb(72, 66, 131)',
        },
        {
          name: 'grey dark',
          value: 'rgb(68, 75, 88)',
        },
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
