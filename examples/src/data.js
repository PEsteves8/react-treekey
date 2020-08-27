export let treeA = {
    name: 'root',
    children: [{
        name: 'child1',
    }, {
        name: 'child2'
    }, {
        name: 'child3',
        children: [{
            name: 'grandchild1'
        }, {
            name: 'grandchild2',
            children: [{
                name: 'greatgrandchild1'
            }, {
                name: 'greatgrandchild2'
            }]
        }, {
            name: 'grandchild3'
        }, {
            name: 'grandchild4'
        }, {
            name: 'grandchild5'
        }]
    }, {
        name: 'child4'
    }, {
        name: 'child5',
        children: [{
            name: 'grandchild1'
        },
        {
            name: 'grandchild2'
        },
        {
            name: 'grandchild3'
        },
        {
            name: 'grandchild4',
            children: [{
                name: 'greatgrandchild1'
            },
            {
                name: 'greatgrandchild2'
            },
            {
                name: 'greatgrandchild3'
            },
            {
                name: 'greatgrandchild4'
            }]

        }]
    }]
};

export let treeB = {
    name: 'react-treekey',
    type: 'folder',
    className: 'fas fa-folder',
    children: [{
        name: 'src',
        type: 'folder',
        className: 'fas fa-folder',
        children: [{
            name: 'data.js',
            type: 'js',
            className: 'fab fa-js'
        }, {
            name: 'index.html',
            type: 'html',
            className: 'fas fa-code'
        }, {
            name: 'index.js',
            type: 'js',
            className: 'fab fa-js'
        }, {
            name: 'styles.js',
            type: 'js',
            className: 'fab fa-js'
        }]
    }]
}