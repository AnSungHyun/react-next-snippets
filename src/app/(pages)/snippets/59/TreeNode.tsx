// components/TreeNode.js
import React from 'react';

const TreeNode = ({ node }) => {
  return (
    <div style={{ marginLeft: '20px' }}>
      <div>{node.name}</div>
      {node.children && node.children.length > 0 && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
