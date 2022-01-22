import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '@/src/components/Button';
import React from 'react';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    label: { control: 'text' },
    paletteType: {
      options: ['primary', 'default'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
  paletteType: 'default',
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  paletteType: 'primary',
};