export let treeA = {
  name: "root",
  children: [
    {
      name: "child1",
    },
    {
      name: "child2",
    },
    {
      name: "child3",
      children: [
        {
          name: "grandchild1",
        },
        {
          name: "grandchild2",
          children: [
            {
              name: "greatgrandchild1",
            },
            {
              name: "greatgrandchild2",
            },
          ],
        },
        {
          name: "grandchild3",
        },
        {
          name: "grandchild4",
        },
        {
          name: "grandchild5",
        },
      ],
    },
    {
      name: "child4",
    },
    {
      name: "child5",
      children: [
        {
          name: "grandchild1",
        },
        {
          name: "grandchild2",
        },
        {
          name: "grandchild3",
        },
        {
          name: "grandchild4",
          children: [
            {
              name: "greatgrandchild1",
            },
            {
              name: "greatgrandchild2",
            },
            {
              name: "greatgrandchild3",
            },
            {
              name: "greatgrandchild4",
            },
          ],
        },
      ],
    },
  ],
};

export let treeB = {
  name: "react-treekey",
  type: "folder",
  className: "fas fa-folder",
  children: [
    {
      name: "src",
      type: "folder",
      className: "fas fa-folder",
      children: [
        {
          name: "tests",
          type: "folder",
          className: "fas fa-folder",
          children: [
            {
              name: "index.test.js",
              type: "file",
              className: "fas fa-flask text-warning",
            },
            {
              name: "helpers.test.js",
              type: "file",
              className: "fas fa-flask text-warning",
            },
          ],
        },
        {
          name: ".gitignore",
          type: "none",
          className: "fab fa-git-alt text-warning",
        },
        {
          name: "data.js",
          type: "js",
          className: "fab fa-js text-warning",
        },
        {
          name: "helpers.js",
          type: "js",
          className: "fab fa-js text-warning",
        },
        {
          name: "index.html",
          type: "html",
          className: "fab fa-html5 text-danger",
        },
        {
          name: "index.js",
          type: "js",
          className: "fab fa-js text-warning",
        },
        {
          name: "styles.js",
          type: "js",
          className: "fab fa-js text-warning",
        },
      ],
    },
    {
      name: "node_modules",
      type: "folder",
      className: "fas fa-folder",
      children: [
        {
          name: "react",
          type: "folder",
          className: "fas fa-folder",
          children: [
            {
              name: "index.js",
              type: "file",
              className: "fab fa-js text-warning",
            },
            {
              name: "LICENSE",
              type: "NONE",
              className: "fas fa-file",
            },
            {
              name: "README.md",
              type: "md",
              className: "far fa-info-circle text-info",
            },
          ],
        },
        {
          name: "webpack",
          type: "folder",
          className: "fas fa-folder",
          children: [
            {
              name: "index.js",
              type: "file",
              className: "fab fa-js text-warning",
            },
            {
              name: "LICENSE",
              type: "NONE",
              className: "fas fa-file",
            },
            {
              name: "README.md",
              type: "md",
              className: "far fa-info-circle text-info",
            },
          ],
        },
      ],
    },
    {
      name: ".gitignore",
      type: "none",
      className: "fab fa-git-alt text-warning",
    },
    {
      name: "LICENSE",
      type: "NONE",
      className: "fas fa-file",
    },
    {
      name: "README.md",
      type: "md",
      className: "far fa-info-circle text-info",
    },
  ],
};
