const data = {
    "id": 1,
    "name": "folder 1",
    "isFolder": true,
    "children": [
        {
            "id": 2,
            "name": "file 1",
            "isFolder": false,
            "content": "This is the content of file 1."
        },
        {
            "id": 3,
            "name": "file 2",
            "isFolder": false,
            "content": "This is the content of file 2."
        },
        {
            "id": 4,
            "name": "folder 2",
            "isFolder": true,
            "children": [
                {
                    "id": 5,
                    "name": "file 3",
                    "isFolder": false,
                    "content": "This is the content of file 3."
                }
            ]
        }
    ]
}

export default data;