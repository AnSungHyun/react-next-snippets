import React from 'react';
import TreeNode from './TreeNode';
import { Container } from '@mui/material';
import CodeBlock from '@/app/_component/CodeBlock';

const treeData = [
  {
    id: 1,
    name: 'Node 1',
    children: [
      {
        id: 2,
        name: 'Node 1.1',
        children: [
          {
            id: 3,
            name: 'Node 1.1.1',
            children: [{ id: 11, name: 'Node 11', children: [] }],
          },
          {
            id: 4,
            name: 'Node 1.1.2',
            children: [{ id: 12, name: 'Node 12', children: [] }],
          },
        ],
      },
      { id: 5, name: 'Node 1.2', children: [] },
    ],
  },
  {
    id: 6,
    name: 'Node 2',
    children: [],
  },
];

const Home = () => {
  return (
    <div>
      <Container>

      <p>
        - TreeNode 컴포넌트 내부에서 본인을 참조하여 TreeNode를 계속 사용하는 재귀 형태의 컴포넌트
      </p>
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
        <CodeBlock filename={"page.tsx"} value={
          "import React from 'react';\n" +
          "import TreeNode from './TreeNode';\n" +
          "import { Container } from '@mui/material';\n" +
          "\n" +
          "const treeData = [\n" +
          "  {\n" +
          "    id: 1,\n" +
          "    name: 'Node 1',\n" +
          "    children: [\n" +
          "      {\n" +
          "        id: 2,\n" +
          "        name: 'Node 1.1',\n" +
          "        children: [\n" +
          "          {\n" +
          "            id: 3,\n" +
          "            name: 'Node 1.1.1',\n" +
          "            children: [{ id: 11, name: 'Node 11', children: [] }],\n" +
          "          },\n" +
          "          {\n" +
          "            id: 4,\n" +
          "            name: 'Node 1.1.2',\n" +
          "            children: [{ id: 12, name: 'Node 12', children: [] }],\n" +
          "          },\n" +
          "        ],\n" +
          "      },\n" +
          "      { id: 5, name: 'Node 1.2', children: [] },\n" +
          "    ],\n" +
          "  },\n" +
          "  {\n" +
          "    id: 6,\n" +
          "    name: 'Node 2',\n" +
          "    children: [],\n" +
          "  },\n" +
          "];\n" +
          "\n" +
          "const Home = () => {\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "      {treeData.map((node) => (\n" +
          "        <TreeNode key={node.id} node={node} />\n" +
          "      ))}\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default Home;\n"
        }/>
        <CodeBlock filename={"TreeNode.tsx"} value={
          "// components/TreeNode.js\n" +
          "import React from 'react';\n" +
          "\n" +
          "const TreeNode = ({ node }) => {\n" +
          "  return (\n" +
          "    <div style={{ marginLeft: '20px' }}>\n" +
          "      <div>{node.name}</div>\n" +
          "      {node.children && node.children.length > 0 && (\n" +
          "        <div>\n" +
          "          {node.children.map((child) => (\n" +
          "            <TreeNode key={child.id} node={child} />\n" +
          "          ))}\n" +
          "        </div>\n" +
          "      )}\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TreeNode;\n"
        }/>
      </Container>
    </div>
  );
};

export default Home;
