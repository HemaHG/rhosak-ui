import { useDeleteKafkaMutation, useKafka } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { DeleteKafkaInstance } from "ui";
import { ReadyStatuses } from "ui-models/src/models/kafka";
import type {
  ControlPlaneNavigationProps,
  ControlPlaneRouteParams,
} from "../routesConsts";
import { ControlPlaneRoutePath } from "../routesConsts";

export const DeleteKafkaInstanceRoute: FunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const history = useHistory();
  const match = useRouteMatch<ControlPlaneRouteParams>(ControlPlaneRoutePath);

  const { data: instance, isError } = useKafka(match?.params.id);
  const { mutateAsync, isLoading: isDeleting } = useDeleteKafkaMutation();

  const onCancel = useCallback(() => {
    history.push(instancesHref);
  }, [history, instancesHref]);

  const onDelete = useCallback(() => {
    if (instance?.id) {
      void mutateAsync({
        id: instance.id,
        onError: () => {
          // TODO: alert
        },
        onSuccess: () => {
          history.replace(instancesHref);
        },
      });
    }
  }, [mutateAsync, history, instance?.id, instancesHref]);

  useEffect(() => {
    if (isError) {
      history.replace(instancesHref);
    }
  }, [history, instancesHref, isError]);

  if (!instance) {
    return null;
  }

  return (
    <DeleteKafkaInstance
      isModalOpen={true}
      isDeleting={isDeleting}
      onCancel={onCancel}
      onDelete={onDelete}
      instanceName={
        ReadyStatuses.includes(instance.status) ? instance.name : undefined
      }
      appendTo={() =>
        (document.getElementById("chrome-app-render-root") as HTMLElement) ||
        document.body
      }
    />
  );
};
