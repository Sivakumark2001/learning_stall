import data from "./data.js";
import { useState } from 'react';
import Folder from "./components/Folder.jsx";
import './FileExplorer.css';
import useTreeTraverse from "./hooks/use-tree-traverse.js";

const FileExplorer = () => {
    const [explorerData, setExplorerData] = useState(data);
    const { insertNode } = useTreeTraverse();

    const handleAddItems = (id, isFolder, newNode) => {
        const updatedTree = insertNode(explorerData, id, newNode, isFolder);
        setExplorerData(updatedTree);
    };

    return (
        <div className="file-explorer">
            <h2>File Explorer</h2>
            <p>Explore your files here.</p>
            <Folder exploreData={explorerData} handleAddItems={handleAddItems} />
        </div>
    );
};

export default FileExplorer;