import { DeleteOutlined, FileOutlined } from '@ant-design/icons/lib/icons';
import Editor from '@monaco-editor/react';
import React, {useEffect, useState} from 'react';
import FolderTree, { NodeData } from 'react-folder-tree';
import { initMonacoModel } from './function';



const initState = {
  name: "root",
  children: [
    {
      name: "main.go"
    }
  ]
}

function App() {

  const [treeState, setTreeState] = useState<NodeData>(initState);
  const [fileId, setFileId] = useState(1);
  const [models, setModels] = useState<MonacoModel>({});

  const onTreeStateChange = (state: NodeData, event: any) => {
    console.log(event)
    setTreeState(state);
  };

  console.log(treeState)

  const onNameClick = (opts: { defaultOnClick: () => void, nodeData: NodeData }) => {
    opts.defaultOnClick();
  
    setFileId(opts.nodeData._id)

    if (!models[opts.nodeData._id]) {
      const newModels = {...models}
      newModels[opts.nodeData._id] = initMonacoModel(treeState, opts.nodeData) as MonacoItem
      setModels(newModels)
    }
  };

  function handleEditorChange(value: string | undefined, event: any) {
    const newModels = {...models}
    newModels[fileId].value = value
    setModels(newModels)
  }  

  const DeleteIcon = (props: { onClick: () => void, nodeData: NodeData }) => {
    const handleClick = () => {
      const newModels = {...models}
      delete newModels[props.nodeData._id]
      setModels(newModels)
      props.onClick()
    };
    return <DeleteOutlined onClick={handleClick}/>;
  }

  return (
    <div style={{
      display: "flex"
    }}>
      <div style={{
        minWidth: "250px",
        padding: "5px"
      }}>
        <FolderTree
          data={initState}
          onChange={onTreeStateChange}
          onNameClick={ onNameClick }
          showCheckbox={false}
          iconComponents={{
            DeleteIcon: DeleteIcon,
          }}
        />
      </div>
      <div style={{
        minWidth: "500px",
        padding: "5px"
      }}>
        <pre>
        {JSON.stringify(models, null, "\t")}
        </pre>
      </div>
      <Editor
        height="80vh"
        theme='vs-dark'
        onChange={handleEditorChange}
        path={models[fileId]?.name}
        language={models[fileId]?.language}
        value={models[fileId]?.value}
      />
      
    </div>
  );
}

export default App;
