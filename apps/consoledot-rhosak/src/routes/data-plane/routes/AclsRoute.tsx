import {
  Loading,
  usePaginationSearchParams,
} from "@rhoas/app-services-ui-components";
import { useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import type { Account } from "ui";
import { PermissionsTable } from "ui";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import { useDeletePermissionsMutation } from "consoledot-api";
import { useHistory } from "react-router-dom";
import type { DataPlanePermissionsNavigationProps } from "../routesConsts";
import { addNotification } from "@redhat-cloud-services/frontend-components-notifications";
import { useDispatch } from "react-redux";
import { editPermissionsHref } from "../DataPlaneRoutes";
import { usePermissionsTableGate } from "../usePermissionsTableGate";

export const AclsRoute: VoidFunctionComponent<
  DataPlanePermissionsNavigationProps
> = ({ instancesHref, managePermissionsHref }) => {
  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const { instance, acls, allAccounts } = usePermissionsTableGate();
  const { mutateAsync } = useDeletePermissionsMutation();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();

  const onDeleteSelected = useCallback(
    (rowIndex: number[]) => {
      rowIndex.map((value) => {
        const rowToDelete = acls?.groups[value];
        void mutateAsync({
          instanceId: instance.id,
          adminUrl: instance.adminUrl || "",
          acl: {
            patternType: rowToDelete?.resource.patternType,
            permissionType: rowToDelete?.permission.permission,
            principal: rowToDelete?.account,
            resourceName: rowToDelete?.resource.resourceName,
            operation: rowToDelete?.permission.operation,
            resourceType: rowToDelete?.resource.resourceType,
          },
          onError: (_, message) => {
            dispatch(
              addNotification({
                variant: "danger",
                title: message,
                dismissable: true,
                id: "delete-error",
              })
            );
          },
          onSuccess: () => {
            //We have no action yet to confirm if delete was successfull.
          },
        });
      });
    },
    [acls?.groups, mutateAsync, instance.id, instance.adminUrl, dispatch]
  );

  const onDelete = useCallback(
    (rowIndex: number) => {
      const rowToDelete = acls?.groups[rowIndex];
      void mutateAsync({
        instanceId: instance.id,
        adminUrl: instance.adminUrl || "",
        acl: {
          patternType: rowToDelete?.resource.patternType,
          permissionType: rowToDelete?.permission.permission,
          principal: rowToDelete?.account,
          resourceName: rowToDelete?.resource.resourceName,
          operation: rowToDelete?.permission.operation,
          resourceType: rowToDelete?.resource.resourceType,
        },
        onError: (_, message) => {
          dispatch(
            addNotification({
              variant: "danger",
              title: message,
              dismissable: true,
              id: "delete-error",
            })
          );
        },
        onSuccess: () => {
          // No action
        },
      });
    },
    [acls?.groups, mutateAsync, instance.id, instance.adminUrl, dispatch]
  );

  const onManagePermissionsActionItem = useCallback(
    (account: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      history.push(editPermissionsHref(instance.id, account));
    },
    [history, instance.id]
  );
  const onManagePermission = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(managePermissionsHref(instance.id));
  }, [history, instance.id, managePermissionsHref]);

  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"permissions"}
      />
      {acls?.groups != undefined &&allAccounts!=undefined? (
        <PermissionsTable
          allAccounts={allAccounts as Account[]}
          permissions={acls.groups}
          onDelete={onDelete}
          onDeleteSelected={onDeleteSelected}
          onManagePermissions={onManagePermission}
          onPerPageChange={setPaginationQuery}
          itemCount={acls.count}
          page={page}
          perPage={perPage}
          onPageChange={setPagination}
          onManagePermissionsActionItem={onManagePermissionsActionItem}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};
