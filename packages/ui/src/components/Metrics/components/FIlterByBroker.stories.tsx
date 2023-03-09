import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { CSSProperties } from "react";
import { FilterByBroker } from "./FilterByBroker";

export default {
  component: FilterByBroker,
  args: {
    selectedBroker: undefined,
  },
} as ComponentMeta<typeof FilterByBroker>;

const Template: ComponentStory<typeof FilterByBroker> = (
  args,
  { parameters }
) => (
  <div style={parameters.style as CSSProperties | undefined}>
    <FilterByBroker {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
