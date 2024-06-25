import { cloneDeep } from "lodash";

export class TreeUtils {
  static async buildTree<T>(
    nodes: T[],
    findChildren: (node: T) => Promise<T[]>,
  ): Promise<(T & { children: T[] })[]> {
    const clonedNodes = cloneDeep(nodes).map((node) => ({
      ...node,
      children: [],
    }));
    for (const node of clonedNodes) {
      const children = await findChildren(node);
      if (children.length) {
        node.children = await this.buildTree(children, findChildren);
      }
    }
    return clonedNodes;
  }
}
