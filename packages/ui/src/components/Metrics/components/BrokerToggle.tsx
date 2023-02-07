import { ToggleGroup, ToggleGroupItem } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { BrokerFilter, BrokerValue } from "../types";

export type BrokerToggleProps = {
  value: BrokerFilter;
  onChange: (value: BrokerFilter) => void;
  selectedBroker: BrokerValue | undefined;
};

export const BrokerToggle: VoidFunctionComponent<BrokerToggleProps> = ({
  value,
  onChange,
  selectedBroker,
}) => {
  const { t } = useTranslation("metrics");

  return (
    <ToggleGroup>
      <ToggleGroupItem
        text={t("broker_filter.total")}
        value="total"
        buttonId="total"
        isSelected={value === "total"}
        onChange={() => onChange("total")}
        isDisabled={selectedBroker !== undefined}
      />
      <ToggleGroupItem
        text={t("broker_filter.per_broker")}
        value="perBroker"
        buttonId="perBroker"
        isSelected={value === "perBroker" || selectedBroker !== undefined}
        onChange={() => onChange("perBroker")}
      />
    </ToggleGroup>
  );
};
