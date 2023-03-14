import type { VoidFunctionComponent } from "react";
import { Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import { RedirectOnGateError } from "../RedirectOnGateError";
import {
  DeleteKafkaInstanceRoute,
  KafkaInstancesRoute,
  TermsAndConditionsRoute,
} from "./routes";
import { ChangeOwnerRoute } from "./routes/ChangeOwnerRoute";
import {
  ControlPlaneChangeOwnerPath,
  ControlPlaneDeleteInstancePath,
  ControlPlaneNewInstancePath,
  ControlPlaneRoutePath,
  ControlPlaneRouteRoot,
  ControlPlaneTermsAndConditionsPath,
} from "./routesConsts";

export const ControlPlaneRoutes: VoidFunctionComponent = () => {
  return (
    <Route path={ControlPlaneRoutePath} exact>
      <Route path={ControlPlaneTermsAndConditionsPath}>
        <TermsAndConditionsRoute
          createHref={ControlPlaneNewInstancePath}
          cancelHref={ControlPlaneRouteRoot}
        />
      </Route>
      <RedirectOnGateError redirectUrl={ControlPlaneTermsAndConditionsPath}>
        <Suspense fallback={null}>
          <Route path={ControlPlaneNewInstancePath}>
            {/*<CreateKafkaInstanceRoute instancesHref={ControlPlaneRouteRoot} />*/}
            <Redirect to={ControlPlaneRouteRoot} />
          </Route>
        </Suspense>
      </RedirectOnGateError>
      <RedirectOnGateError redirectUrl={ControlPlaneRouteRoot}>
        <Route path={ControlPlaneDeleteInstancePath}>
          <DeleteKafkaInstanceRoute instancesHref={ControlPlaneRouteRoot} />
        </Route>
        <Route path={ControlPlaneChangeOwnerPath}>
          <ChangeOwnerRoute instancesHref={ControlPlaneRouteRoot} />
        </Route>
      </RedirectOnGateError>
      <KafkaInstancesRoute
        activeSection={"instances"}
        instancesHref={ControlPlaneRouteRoot}
        instanceSelectedHref={(id) => `${ControlPlaneRouteRoot}/${id}`}
        instanceCreationHref={`${ControlPlaneRouteRoot}/create`}
        instanceDeletionHref={(id) => `${ControlPlaneRouteRoot}/${id}/delete`}
        instanceChangeOwnerHref={(id) =>
          `${ControlPlaneRouteRoot}/${id}/change-owner`
        }
        getUrlForInstance={(instance) =>
          `${ControlPlaneRouteRoot}/${instance.id}/details`
        }
      />
    </Route>
  );
};
