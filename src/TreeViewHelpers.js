function setProp(node, prop, value) {
    Object.defineProperty(node, prop, { value });
}

export function setTreeInternalProperties(node) {
    if(node.$children) {
        for(let i = 0; i < node.$children.length; i++) {
            setProp(node.$children[i], '$parent', node);
           
            if(node.$children.length === 1) {
                setProp(node, '$firstChild', node.$children[i]);
                setProp(node, '$lastChild', node.$children[i]);
                setProp(node.$children[i], '$nextNode', null);
                setProp(node.$children[i], '$previousNode', null);
            } else if(i === 0) {
                setProp(node, '$firstChild', node.$children[i]);
                setProp(node.$children[i], '$previousNode', null);
                setProp(node.$children[i], '$nextNode', node.$children[i + 1]);
            } else if (i === node.$children.length -1) {
                setProp(node, '$lastChild', node.$children[i]);
                setProp(node.$children[i], '$previousNode', node.$children[i-1]);
                setProp(node.$children[i], '$nextNode', null);
            } else {
                setProp(node.$children[i], '$previousNode', node.$children[i-1]);
                setProp(node.$children[i], '$nextNode', node.$children[i+1]);
            }

            setTreeInternalProperties(node.$children[i]);
        }
    }
}