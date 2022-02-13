import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '../components/atoms/button/Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    palette: {
      options: ['primary', 'default'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;

export const Default = Template.bind({});
Default.args = {
  palette: 'default',
};

export const Primary = Template.bind({});
Primary.args = {
  palette: 'primary',
};
