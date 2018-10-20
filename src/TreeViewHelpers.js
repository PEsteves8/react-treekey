export function setTreeInternalProperties(node, preserveExpanded = false) {
    if(!preserveExpanded) {
        if(!node.$parent) {
            node.$expanded = true;
        } else {
            node.$expanded = false;
        }
    }
    
    node.$selected = false;

    if(node.$children) {
        for(let i = 0; i < node.$children.length; i++) {
            node.$children[i].$parent = node;
           
            if(node.$children.length === 1) {
                node.$firstChild = node.$children[i];
                node.$lastChild = node.$children[i];
                node.$children[i].$nextNode = null;
                node.$children[i].$previousNode = null;
            } else if(i === 0) {
                node.$firstChild = node.$children[i];
                node.$children[i].$previousNode = null;
                node.$children[i].$nextNode = node.$children[i + 1];
            } else if (i === node.$children.length -1) {
                node.$lastChild = node.$children[i];
                node.$children[i].$previousNode = node.$children[i-1];
                node.$children[i].$nextNode = null;
            } else {
                node.$children[i].$previousNode = node.$children[i - 1];
                node.$children[i].$nextNode = node.$children[i+1];
            }

            setTreeInternalProperties(node.$children[i], preserveExpanded);
        }
    }
}