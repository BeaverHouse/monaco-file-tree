import { CheckCircleTwoTone, CloseCircleTwoTone, EditTwoTone, FileTwoTone, FolderOpenTwoTone, FolderTwoTone, StopTwoTone } from '@ant-design/icons/lib/icons';
import Editor from '@monaco-editor/react';
import React, {useEffect, useState} from 'react';
import FolderTree, { NodeData } from 'react-folder-tree';

// sample data
const initState = {
  name: "WKFL_1",
  isDir: true,
  isOpen: true,
  children: [
    {
      name: "main.go",
      language: "go",
      value: "hello go"
    },
    {
      name: "api",
      isDir: true,
      isOpen: false,
      children: []
    },
    {
      name: "func.go",
      language: "go",
      value: "this is function"
    }
  ]
}

function App() {

  const [treeState, setTreeState] = useState<NodeData>();
  const [fileId, setFileId] = useState(1);
  const [models, setModels] = useState<MonacoModel>({});

  /**
   * Tree Custom 
   */
  const onTreeStateChange = (state: NodeData, event: any) => {
    setTreeState(state);

    // depth 1만 수정 가능 - 추후 수정 필요할 수 있음
    if (event.type === "renameNode") {
      const newModels = {...models}
      newModels[event.path[0] + 1].name = event.params[0]
      setModels(newModels)
    }
  };

  const onNameClick = (opts: { defaultOnClick: () => void, nodeData: NodeData }) => {
    if (!opts.nodeData.isDir) {
      opts.defaultOnClick();    
      setFileId(opts.nodeData._id)
    }  
  };

  const NullIcon = (props: any) => null;
  const FolderIcon = (props: any) => <FolderTwoTone/>
  const FolderOpenIcon = (props: any) => <FolderOpenTwoTone/>
  const FileIcon = (props: any) => <FileTwoTone {...props}/>
  const EditIcon = (props: any) => <EditTwoTone {...props}/>
  const CancelIcon = (props: any) => <CloseCircleTwoTone {...props}/>
  const CheckIcon = (props: any) => <CheckCircleTwoTone {...props}/>

  /**
   * Monaco Custom 
   */
  function handleEditorChange(value: string | undefined, event: any) {
    const newModels = {...models}
    newModels[fileId].value = value
    setModels(newModels)
  }  

  useEffect(() => {
    setTimeout(() => {
      setTreeState(initState)
      const initModels: any = {}
      initState.children.forEach((a, idx) => {
        initModels[idx+1] = a
      })
      setModels(initModels)
    }, 1000);
  }, [])

  return (
    <div style={{
      display: "inline-flex"
    }}>
      <div style={{
        minWidth: "300px",
        padding: "5px"
      }}>
        <FolderTree
          data={initState}
          onChange={onTreeStateChange}
          onNameClick={ onNameClick }
          showCheckbox={false}
          initOpenStatus="custom"
          iconComponents={{
            DeleteIcon: NullIcon,
            CaretDownIcon: NullIcon,
            CaretRightIcon: NullIcon,
            FolderIcon: FolderIcon,
            FolderOpenIcon: FolderOpenIcon,
            FileIcon: FileIcon,
            EditIcon: EditIcon,
            CancelIcon: CancelIcon,
            OKIcon: CheckIcon
          }}
        />
      </div>
      <div style={{
        width: "300px",
        padding: "5px"
      }}>
        <pre style={{whiteSpace: "pre-wrap", wordBreak: "break-all"}}>
          {JSON.stringify(models, null, "\t")}
        </pre>
      </div>
      <Editor
        height="80vh"
        width="800px"
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
