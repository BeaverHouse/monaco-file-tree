import { NodeData } from "react-folder-tree";

export const initMonacoModel = (treeState: NodeData, nodeData: NodeData) => {
    const { path } = nodeData
    let fileName = treeState.name
    let target = treeState
    path.forEach((a: any) => {
        target = target.children![a]
        fileName += "/" + target.name
    })

    if (nodeData.name.endsWith(".go"))
        return {
            language: "go",
            name: fileName,
            value: "package name;"
        }
    else if (nodeData.name.endsWith(".js"))
        return {
            language: "javascript",
            name: fileName,
            value: "const a = 1;"
        }
}