import type { FunctionComponent } from "react";
import {
  CardHeader,
  CardTitle,
  Divider,
  Toolbar,
  ToolbarContent,
} from "@patternfly/react-core";
import { FilterByTime } from "./FilterByTime";
import { FilterByBroker } from "./FilterByBroker";
import type { BrokerValue, DurationOptions } from "../types";
import { useTranslation } from "react-i18next";
import type { ToolbarRefreshProps } from "./ToolbarRefresh";
import { ToolbarRefresh } from "./ToolbarRefresh";

type ToolbarKafkaInstanceMetricProps = {
  title: string;
  selectedBroker: BrokerValue | undefined;
  isDisabled: boolean;
  duration: DurationOptions;
  onSetTimeDuration: (value: DurationOptions) => void;
  onSetSelectedBroker: (value: BrokerValue | undefined) => void;
} & Omit<ToolbarRefreshProps, "ariaLabel">;
export const ToolbarKafkaInstanceMetric: FunctionComponent<
  ToolbarKafkaInstanceMetricProps
> = ({
  title,
  isDisabled,
  isRefreshing,
  lastUpdated,
  duration,
  onSetTimeDuration,
  onRefresh,
  selectedBroker,
  onSetSelectedBroker,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <CardHeader>
        <CardTitle component="h2">{title}</CardTitle>
      </CardHeader>
      <Divider />
      <Toolbar>
        <ToolbarContent>
          <FilterByBroker
            selectedBroker={selectedBroker}
            onSetSelectedBroker={onSetSelectedBroker}
            disableToolbar={isDisabled}
          />
          <FilterByTime
            ariaLabel={t("metrics:kafka_instance_filter_by_time")}
            duration={duration}
            onDurationChange={onSetTimeDuration}
            keyText={"kafka-metrics-time-filter"}
            disableToolbar={isDisabled}
          />
          <ToolbarRefresh
            isRefreshing={isRefreshing}
            lastUpdated={lastUpdated}
            onRefresh={onRefresh}
            ariaLabel={t("metrics:kafka_instance_refresh")}
          />
        </ToolbarContent>
      </Toolbar>
      <Divider />
    </>
  );
};
