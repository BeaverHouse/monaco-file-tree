import { CheckCircleTwoTone, CloseCircleTwoTone, EditTwoTone, FileTwoTone, FolderOpenTwoTone, FolderTwoTone, StopTwoTone } from '@ant-design/icons/lib/icons';
import Editor from '@monaco-editor/react';
import React, {useEffect, useState} from 'react';
import FolderTree, { NodeData } from 'react-folder-tree';
import { initMonacoModel } from './function';

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

  const onTreeStateChange = (state: NodeData, event: any) => {
    setTreeState(state);
  };

  console.log(treeState)

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
  

  const onNameClick = (opts: { defaultOnClick: () => void, nodeData: NodeData }) => {
    if (!opts.nodeData.isDir) {
      opts.defaultOnClick();    
      setFileId(opts.nodeData._id)
    }  
  };

  function handleEditorChange(value: string | undefined, event: any) {
    const newModels = {...models}
    newModels[fileId].value = value
    setModels(newModels)
  }  

  const NullIcon = (props: any) => null;
  const FolderIcon = (props: any) => <FolderTwoTone {...props}/>
  const FolderOpenIcon = (props: any) => <FolderOpenTwoTone {...props}/>
  const FileIcon = (props: any) => <FileTwoTone {...props}/>
  const EditIcon = (props: any) => <EditTwoTone {...props}/>
  const CancelIcon = (props: any) => <CloseCircleTwoTone {...props}/>
  const CheckIcon = (props: any) => <CheckCircleTwoTone {...props}/>


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
