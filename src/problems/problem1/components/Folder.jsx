import { useState } from "react";

const Folder = ({ exploreData, handleAddItems }) => {
    const [showChildren, setShowChildren] = useState(false);
    const [showInput, setShowInput] = useState({ show: false, isFolder: null });
    console.log(exploreData);

    const handleShowInput = (e, id, isFolder) => {
        e.stopPropagation(); // Prevent the click from propagating to the parent folder
        setShowInput({ show: true, isFolder: isFolder });
        setShowChildren(true); // Ensure children are shown when adding a new item
        console.log(`Add ${isFolder ? "folder" : "file"} under ID: ${id}`);
    };

    const handleNewItemOnClickEnter = (e, id, isFolder) => {
        if (e.key === "Enter") {
            const newItemName = e.target.value.trim();
            if (newItemName) {
                handleAddItems(id, isFolder, newItemName);
                setShowInput({ show: false, isFolder: null });
                e.target.value = ""; // Clear the input field
            }
        }
    }

    return (
        <div>
            {exploreData.isFolder ? (
                <div className="folder-container">
                    <div className="folder" onClick={() => { setShowChildren(!showChildren); setShowInput({ show: false, isFolder: null }) }}>
                        <span>
                            {showChildren ? "📂 " : "📁 "}
                            {exploreData.name}</span>
                        <div>
                            <button
                                className="btn btn-primary mx-2"
                                onClick={(e) => handleShowInput(e, exploreData.id, true)}
                            >
                                Folder +
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={(e) => handleShowInput(e, exploreData.id, false)}
                            >
                                File +
                            </button>
                        </div>
                    </div>
                    {showInput.show && (
                        <div className="input-container">
                            {showInput.isFolder ? "📁" : "📄"}
                            <input
                                type="text"
                                autoFocus
                                placeholder={showInput.isFolder ? "Enter folder name" : "Enter file name"}
                                className="form-control"
                                onBlur={() => setShowInput({ show: false, isFolder: null })}
                                onKeyDown={(e) => handleNewItemOnClickEnter(e, exploreData.id, showInput.isFolder)}
                            />
                        </div>
                    )}
                    {showChildren &&
                        exploreData.children &&
                        exploreData.children.map((file, index) => (
                            <Folder key={file.id} exploreData={file} handleAddItems={handleAddItems} />
                        ))}
                </div>
            ) : (
                <div className="file-container">
                    <div className="file">
                        <span>📄 {exploreData.name}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Folder;