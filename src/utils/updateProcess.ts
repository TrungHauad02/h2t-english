import { RouteNodeEnum } from "interfaces";
import { routeNodeService, userService } from "services";

export const completeRouteNode = async (
  nodeId: number,
  userId: number,
  type: RouteNodeEnum
) => {
  try {
    const resData = await routeNodeService.findByNodeIdAndRouteNodeType(
      nodeId,
      type
    );
    if (resData.status === "SUCCESS") {
      await userService.completeRouteNode(userId, resData.data.id);
    }
  } catch (error) {
    console.error("Error completing route node:", error);
  }
};
