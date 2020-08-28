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
  id: 1,
  type: "folder",
  className: "fas fa-folder",
  children: [
    {
      name: "src",
      id: 2,
      type: "folder",
      className: "fas fa-folder",
      children: [
        {
          name: "tests",
          id: 3,
          type: "folder",
          className: "fas fa-folder",
          children: [
            {
              name: "index.test.js",
              id: 4,
              type: "file",
              className: "fas fa-flask text-warning",
            },
            {
              name: "helpers.test.js",
              id: 5,
              type: "file",
              className: "fas fa-flask text-warning",
            },
          ],
        },
        {
          name: ".gitignore",
          id: 6,
          type: "none",
          className: "fab fa-git-alt text-warning",
        },
        {
          name: "data.js",
          id: 7,
          type: "js",
          className: "fab fa-js text-warning",
        },
        {
          name: "helpers.js",
          id: 8,
          type: "js",
          className: "fab fa-js text-warning",
        },
        {
          name: "index.html",
          id: 9,
          type: "html",
          className: "fab fa-html5 text-danger",
        },
        {
          name: "index.js",
          id: 10,
          type: "js",
          className: "fab fa-js text-warning",
        },
        {
          name: "styles.js",
          id: 11,
          type: "js",
          className: "fab fa-js text-warning",
        },
      ],
    },
    {
      name: "node_modules",
      id: 12,
      type: "folder",
      className: "fas fa-folder",
      children: [
        {
          name: "react",
          id: 13,
          type: "folder",
          className: "fas fa-folder",
          children: [
            {
              name: "index.js",
              id: 14,
              type: "file",
              className: "fab fa-js text-warning",
            },
            {
              name: "LICENSE",
              id: 15,
              type: "NONE",
              className: "fas fa-file",
            },
            {
              name: "README.md",
              id: 16,
              type: "md",
              className: "far fa-info-circle text-info",
            },
          ],
        },
        {
          name: "webpack",
          id: 17,
          type: "folder",
          className: "fas fa-folder",
          children: [
            {
              name: "index.js",
              id: 18,
              type: "file",
              className: "fab fa-js text-warning",
            },
            {
              name: "LICENSE",
              id: 19,
              type: "NONE",
              className: "fas fa-file",
            },
            {
              name: "README.md",
              id: 20,
              type: "md",
              className: "far fa-info-circle text-info",
            },
          ],
        },
      ],
    },
    {
      name: ".gitignore",
      id: 21,
      type: "none",
      className: "fab fa-git-alt text-warning",
    },
    {
      name: "LICENSE",
      id: 22,
      type: "NONE",
      className: "fas fa-file",
    },
    {
      name: "README.md",
      id: 23,
      type: "md",
      className: "far fa-info-circle text-info",
    },
  ],
};
