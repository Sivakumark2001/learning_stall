const useTreeTraverse = () => {
    function insertNode(tree, folderId, newNode, isFolder) {
        if (tree.id === folderId) {
            return {
                ...tree,
                children: [
                    ...(tree.children || []),
                    {
                        id: Date.now(),
                        name: newNode,
                        isFolder,
                        ...(isFolder ? { children: [] } : { content: "" }),
                    },
                ],
            };
        }

        if (tree.children) {
            return {
                ...tree,
                children: tree.children.map(child =>
                    insertNode(child, folderId, newNode, isFolder)
                ),
            };
        }

        return tree;
    }
    return { insertNode };
};

export default useTreeTraverse;