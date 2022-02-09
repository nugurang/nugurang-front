import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from '@/src/components/base/Button';

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
  children: <>Button</>,
  palette: 'default',
};

export const Primary = Template.bind({});
Primary.args = {
  children: <>Button</>,
  palette: 'primary',
};
