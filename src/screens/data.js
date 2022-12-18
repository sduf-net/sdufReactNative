const data = [
    {
        id: 1,
        name: "Footer",
        data: {
            style: {
                'background-color': 'aqua'
            },
            images: [
                {
                    src: "https://images-ssl.gotinder.com/ca576b05-ea11-442f-84b6-f93ed05ca23a/84x106_9f9b58fb-5193-4396-a073-bf487f21df58.jpg",
                    alt: "",
                    actions: "actions"
                },
                {
                    src: "https://images-ssl.gotinder.com/ca576b05-ea11-442f-84b6-f93ed05ca23a/84x106_9f9b58fb-5193-4396-a073-bf487f21df58.jpg",
                    alt: "",
                    actions: "actions"
                },
                {
                    src: "https://images-ssl.gotinder.com/ca576b05-ea11-442f-84b6-f93ed05ca23a/84x106_9f9b58fb-5193-4396-a073-bf487f21df58.jpg",
                    alt: "",
                    actions: "actions"
                },
                {
                    src: "https://images-ssl.gotinder.com/ca576b05-ea11-442f-84b6-f93ed05ca23a/84x106_9f9b58fb-5193-4396-a073-bf487f21df58.jpg",
                    alt: "",
                    actions: "actions"
                }
            ]
        }
    },
    {
        id: 2,
        name: "Header",
        data: {
            title: "Header",
            images: [
                {
                    src: "https://images-ssl.gotinder.com/ca576b05-ea11-442f-84b6-f93ed05ca23a/84x106_9f9b58fb-5193-4396-a073-bf487f21df58.jpg",
                    alt: "",
                    actions: "actions"
                },
                {
                    src: "https://images-ssl.gotinder.com/ca576b05-ea11-442f-84b6-f93ed05ca23a/84x106_9f9b58fb-5193-4396-a073-bf487f21df58.jpg",
                    alt: "",
                    actions: "actions"
                },
                {
                    src: "https://images-ssl.gotinder.com/ca576b05-ea11-442f-84b6-f93ed05ca23a/84x106_9f9b58fb-5193-4396-a073-bf487f21df58.jpg",
                    alt: "",
                    actions: "actions"
                },
            ],
            style: {
                background: "#db5c4c"
            }
        }
    },
    {
        id: 3,
        name: "Row",
        nestedComponents: [
            {
                id: 2,
                name: "Header",
                data: {
                    title: "Header2",
                    images: [
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                    ],
                    style: {
                        background: "#db5c4c"
                    }
                }
            },
            {
                id: 4,
                name: "Header",
                data: {
                    title: "Header1",
                    images: [
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                    ],
                    style: {
                        background: "#db5c4c"
                    }
                }
            },
        ]
    },
    {
        id: 4,
        name: "Column",
        nestedComponents: [
            {
                id: 5,
                name: "Header",
                data: {
                    title: "Header2",
                    images: [
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                    ],
                    style: {
                        background: "#db5c4c"
                    }
                }
            },
            {
                id: 9,
                name: "Header",
                data: {
                    title: "Header1",
                    images: [
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                    ],
                    style: {
                        background: "#db5c4c"
                    }
                }
            },
        ]
    },
    {
        id: 5,
        name: "Image",
        data: {
            src: "https://cdn4.riastatic.com/photosnew/auto/photo/chevrolet_equinox__418276504f.jpg",
            alt: "",
            actions: "actions"
        },
    },
    {
        id: 17,
        name: "ApiWidget",
        data: {
            callbackUrl: "http://localhost:4000/api/v1/test"
        }
    },
    {
        id: 18,
        name: "SimpleRow",
        nestedComponents: [
            {
                id: 5,
                name: "Header",
                data: {
                    title: "SR1",
                    images: [
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                    ],
                    style: {
                        background: "#db5c4c"
                    }
                }
            },
            {
                id: 9,
                name: "Header",
                data: {
                    title: "SR2",
                    images: [
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                    ],
                    style: {
                        background: "#db5c4c"
                    }
                }
            },
        ]
    },
    {
        id: 19,
        name: "Column",
        nestedComponents: [
            {
                id: 5,
                name: "Header",
                data: {
                    title: "SR1",
                    images: [
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                    ],
                    style: {
                        background: "#db5c4c"
                    }
                }
            },
            {
                id: 9,
                name: "Header",
                data: {
                    title: "SR2",
                    images: [
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                    ],
                    style: {
                        background: "#db5c4c"
                    }
                }
            },
            {
                id: 12,
                name: "Header",
                data: {
                    title: "SR1",
                    images: [
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                    ],
                    style: {
                        background: "#db5c4c"
                    }
                }
            },
            {
                id: 14,
                name: "Header",
                data: {
                    title: "SR2",
                    images: [
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                        {
                            src: "",
                            alt: "",
                            actions: "actions"
                        },
                    ],
                    style: {
                        background: "#db5c4c"
                    }
                }
            },
        ]
    },
]
export default data;