import type { VoidFunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ControlPlaneRoutes, DrawerProvider } from "./control-plane";
import { DataPlaneRoutes } from "./data-plane";

export const Routes: VoidFunctionComponent = () => {
  return (
    <Switch>
      <Redirect from={"/"} to={"/kafkas"} exact />
      <Route path={"/kafkas"}>
        <DrawerProvider>
          {/* don't move these routes around! the order is important */}
          <ControlPlaneRoutes />
          <DataPlaneRoutes />
        </DrawerProvider>
      </Route>
    </Switch>
  );
};
