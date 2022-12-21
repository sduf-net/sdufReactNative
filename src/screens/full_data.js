const actions = {
    click: {
        type: "routeToLocal",
        screen_name: "Index"
    },
    scroll: {
        type: "asyncPost",
        url: "url",
        params: {
            parameter: "parameter"
        }
    },
    dblclick: {
        type: "asyncGet",
        url: "url",
    }
}

const list = [
    {
        id: 2,
        name: "HeaderWidget",
        data: {
            title: "HeaderWidget",
            images: [
                {
                    src: "https://cdn-icons-png.flaticon.com/512/2459/2459427.png",
                    alt: "",
                    actions: actions
                },
                {
                    src: "https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA=w240-h480-rw",
                    alt: "",
                    actions: actions
                },
                {
                    src: "https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA=w240-h480-rw",
                    alt: "",
                    actions: actions
                },
            ],
            style: {
                background: "#db5c4c"
            }
        }
    },
    {
        id: 1,
        name: "FooterWidget",
        data: {
            style: {
                'background-color': 'aqua'
            },
            images: [
                {
                    src: "https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA=w240-h480-rw",
                    alt: "",
                    actions: actions
                },
                {
                    src: "https://cdn-icons-png.flaticon.com/512/2544/2544087.png",
                    alt: "",
                    actions: actions
                },
                {
                    src: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
                    alt: "",
                    actions: actions
                },
                {
                    src: "https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA=w240-h480-rw",
                    alt: "",
                    actions: actions
                }
            ]
        }
    },
    {
        id: 432,
        name: "TextWidget",
        data: {
            text: "TextWidget",
            actions: actions,
        },
    },
    {
        id: 10,
        name: "ImageWidget",
        data: {
            src: "https://cdn4.riastatic.com/photosnew/auto/photo/chevrolet_equinox__418276504f.jpg",
            alt: "",
            actions: actions
        },
    },
    {
        id: 11,
        name: "ItemCard1",
        data: {
            src: "https://cdn4.riastatic.com/photosnew/auto/photo/chevrolet_equinox__418276504f.jpg",
            alt: "alt",
            title: "Chevrolet Equinox LTZ 2016",
            price: { uah: 10, usd: 20 },
            characteristics: [
                {
                    id: 1,
                    src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg fill='none' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='7.5' cy='7.5' r='7' stroke='%23DB5C4C'/%3E%3Ccircle cx='7.5' cy='7.5' r='1' stroke='%23DB5C4C'/%3E%3Cpath d='m8.5 6.5 2-2' stroke='%23DB5C4C'/%3E%3Cpath d='m7.5 0.5v1.5m-7 5.5h1.5m12.5 0h-1.5m-10.5-5 1 1m9-1-1 1' stroke='%23DB5C4C'/%3E%3C/svg%3E%0A",
                    alt: "",
                    text: "2000"
                },
                {
                    id: 2,
                    src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg fill='none' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='7.5' cy='7.5' r='7' stroke='%23DB5C4C'/%3E%3Ccircle cx='7.5' cy='7.5' r='1' stroke='%23DB5C4C'/%3E%3Cpath d='m8.5 6.5 2-2' stroke='%23DB5C4C'/%3E%3Cpath d='m7.5 0.5v1.5m-7 5.5h1.5m12.5 0h-1.5m-10.5-5 1 1m9-1-1 1' stroke='%23DB5C4C'/%3E%3C/svg%3E%0A",
                    alt: "",
                    text: "Vinnitsya"
                },
                {
                    id: 3,
                    src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg fill='none' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='7.5' cy='7.5' r='7' stroke='%23DB5C4C'/%3E%3Ccircle cx='7.5' cy='7.5' r='1' stroke='%23DB5C4C'/%3E%3Cpath d='m8.5 6.5 2-2' stroke='%23DB5C4C'/%3E%3Cpath d='m7.5 0.5v1.5m-7 5.5h1.5m12.5 0h-1.5m-10.5-5 1 1m9-1-1 1' stroke='%23DB5C4C'/%3E%3C/svg%3E%0A",
                    alt: "",
                    text: "1.2"
                },
                {
                    id: 4,
                    src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg fill='none' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='7.5' cy='7.5' r='7' stroke='%23DB5C4C'/%3E%3Ccircle cx='7.5' cy='7.5' r='1' stroke='%23DB5C4C'/%3E%3Cpath d='m8.5 6.5 2-2' stroke='%23DB5C4C'/%3E%3Cpath d='m7.5 0.5v1.5m-7 5.5h1.5m12.5 0h-1.5m-10.5-5 1 1m9-1-1 1' stroke='%23DB5C4C'/%3E%3C/svg%3E%0A",
                    alt: "",
                    text: "auto"
                }
            ],
            labels: [
                { text: "AS1234AS", id: 6 },
                { text: "ZXC029384SDFKh09LKF", id: 5 },
            ],
            date: "2021-02-02",
            actions: actions,
        }
    },
    {
        id: 12,
        name: "ItemCard2",
        data: {
            src: "https://cdn.riastatic.com/photosnew/dom/photo/prodaja-kvartira-vinnitsa-staryiy-gorod-okkina-lia__178521498xg.jpg",
            alt: "",
            price: { uah: 10, usd: 20 },
            title: "Vinnitsya",
            sub_title: "Vinnitsya 1",
            params: [
                { text: "Vinnitsya 2" },
                { text: "1 room" },
                { text: "1 room" },
            ],

            labels: [
                { id: 1, text: "text1" },
                { id: 2, text: "text2" },
                { id: 3, text: "text2" },
                { id: 4, text: "text2" },
                { id: 5, text: "text2" },
                { id: 6, text: "text2" },
                { id: 7, text: "text2" },
                { id: 8, text: "text3" }
            ],
            actions: actions,
        },
    },
    {
        id: 13,
        name: "LineWidget",
    },
    {
        id: 14,
        name: "Label1Widget",
        data: {
            text: "label1",
            src: "https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA=w240-h480-rw",
            actions: actions
        }
    },
    {
        id: 15,
        name: "Label2Widget",
        data: {
            text: "label1",
            actions: actions
        }
    },
    {
        id: 16,
        name: "Label3Widget",
        data: {
            text: "label1",
            actions: actions
        }
    },
    {
        id: 18,
        name: "ChatPreviewWidget",
        data: {
            title: "Title",
            text: "Lorem ipsum dolor sit amet, consectetur",
            src: "https://cdn4.riastatic.com/photosnew/auto/photo/chevrolet_equinox__418276504f.jpg",
            date: "2021.01.01",
            actions: actions
        }
    },
    {
        id: 181,
        name: "ChatMessageWidget",
        data: {
            name: "Dmytro",
            text: "Lorem ipsum dolor sit amet, consectetur",
            date: "2021.01.01",
            cells: 3,
            images: [
                "https://i.wifegeek.com/200426/f9459c52.jpg",
                "https://i.wifegeek.com/200426/5ce1e1c7.jpg",
                "https://i.wifegeek.com/200426/5fa51df3.jpg",
                "https://i.wifegeek.com/200426/71d3aa60.jpg",
                "https://i.wifegeek.com/200426/a154fc3d.jpg",
                "https://i.wifegeek.com/200426/15160d6e.jpg",
                "https://i.wifegeek.com/200426/f9459c52.jpg",
                "https://i.wifegeek.com/200426/5ce1e1c7.jpg",
                "https://i.wifegeek.com/200426/5fa51df3.jpg",
                "https://i.wifegeek.com/200426/663181fe.jpg",
                "https://i.wifegeek.com/200426/2d110780.jpg",
                "https://i.wifegeek.com/200426/e73cd3fa.jpg",
                "https://i.wifegeek.com/200426/15160d6e.jpg",
                "https://i.wifegeek.com/200426/81e24a47.jpg",
                "https://i.wifegeek.com/200426/43e2e8bb.jpg"

            ],
            actions: actions
        }
    },
    {
        id: 19,
        name: "ImageCarouselWidget",
        data: {
            images: [
                { id: 1, src: "https://media.istockphoto.com/photos/beautiful-panoramic-view-of-tbilisi-at-sunset-picture-id476813550" },
                { id: 2, src: "https://media.istockphoto.com/photos/beautiful-panoramic-view-of-tbilisi-at-sunset-picture-id476813550" },
                { id: 3, src: "https://media.istockphoto.com/photos/beautiful-panoramic-view-of-tbilisi-at-sunset-picture-id476813550" },
                { id: 4, src: "https://media.istockphoto.com/photos/beautiful-panoramic-view-of-tbilisi-at-sunset-picture-id476813550" },
                { id: 5, src: "https://media.istockphoto.com/photos/beautiful-panoramic-view-of-tbilisi-at-sunset-picture-id476813550" },
                { id: 6, src: "https://media.istockphoto.com/photos/beautiful-panoramic-view-of-tbilisi-at-sunset-picture-id476813550" },
                { id: 7, src: "https://media.istockphoto.com/photos/beautiful-panoramic-view-of-tbilisi-at-sunset-picture-id476813550" },
                { id: 8, src: "https://media.istockphoto.com/photos/beautiful-panoramic-view-of-tbilisi-at-sunset-picture-id476813550" }
            ]
        }
    },
    {
        id: 191,
        name: "IconWidget",
        data: {
            src: "https://cdn4.riastatic.com/photosnew/auto/photo/chevrolet_equinox__418276504f.jpg",
            alt: "",
            actions: actions
        },
    },
    {
        id: 20,
        name: "InputWidget",
        data: {
            type: "text",
            placeholder: "simple text",
            name: "text",
            disabled: false,
            required: false,
            value: "default value"
        }
    },
    {
        id: 21,
        name: "TextAreaWidget",
        data: {
            name: "name",
            placeholder: "name",
            rows: "2",
            cols: "3",
            disabled: false,
            required: false,
            value: "default value"
        }
    },
    {
        id: 22,
        name: "SelectWidget",
        data: {
            name: "name",
            disabled: false,
            required: false,
            selected: "3",
            options: [
                { id: 1, value: "1", text: "select1" },
                { id: 2, value: "2", text: "select2" },
                { id: 3, value: "3", text: "select3" },
                { id: 4, value: "4", text: "select4" },
                { id: 5, value: "5", text: "select5" },
            ]
        }
    },
    {
        id: 23,
        name: "ButtonWidget",
        data: {
            type: "submit",
            disabled: false,
            name: "name",
            value: "value",
            text: "button"
        }
    },
    {
        id: 24,
        name: "FormWidget",
        nestedComponents: [
            {
                id: 20,
                name: "InputWidget",
                data: {
                    type: "text",
                    placeholder: "simple text",
                    name: "input",
                    disabled: false,
                    required: false,
                    value: "default value"
                }
            },
            {
                id: 21,
                name: "TextAreaWidget",
                data: {
                    name: "textarea",
                    placeholder: "name",
                    rows: "2",
                    cols: "3",
                    disabled: false,
                    required: false,
                    value: "default value"
                }
            },
            {
                id: 22,
                name: "SelectWidget",
                data: {
                    name: "select",
                    disabled: false,
                    required: false,
                    options: [
                        { id: 1, value: "1", text: "select1" },
                        { id: 2, value: "2", text: "select2" },
                        { id: 3, value: "3", text: "select3" },
                        { id: 4, value: "4", text: "select4", selected: true },
                        { id: 5, value: "5", text: "select5" },
                    ]
                }
            },
            {
                id: 23,
                name: "ButtonWidget",
                data: {
                    type: "submit",
                    disabled: false,
                    name: "name",
                    value: "value",
                    text: "button"
                }
            },
            {
                id: 24,
                name: "InputWidget",
                data: {
                    type: "image",
                    name: "submit",
                    border: 0,
                    src: "https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA=w240-h480-rw",
                    disabled: false,
                    required: false,
                }
            },
        ],
        data: {
            action: "/action",
            method: "post"
        }
    },
    // {
    //   id: 30,
    //   name: "PaginationWidget",
    //   data: {
    //     callbackUrl: "https://cdn4.riastatic.com/photosnew/auto/photo/chevrolet_equinox__418276504f.jpg",
    //   }
    // },
    {
        id: 32,
        name: "GoogleMapWidget",
        data: {
            center: { lat: 51.093048, lng: 6.842120 },
            markers: [
                {
                    position: {
                        lat: 51.093048, lng: 6.842120
                    },
                    name: "id=1",
                    price: "100",
                    styleType: "price",
                    onClick: {
                        type: "asyncPost",
                        callbackUrl: "https://icon-library.com/images/img-icon/img-icon-14.jpg"
                    }
                },
                {
                    position: {
                        lat: 51.083048, lng: 6.242120
                    },
                    name: "id=2",
                    price: "200",
                    onClick: {
                        type: "asyncPost",
                        callbackUrl: "https://icon-library.com/images/img-icon/img-icon-14.jpg"
                    }
                },
            ]
        }
    },
    {
        id: 34,
        name: "MaplibreWidget",
        data: {
            style: {
                'width': '100%',
                'height': '600px'
            },
            center: { lat: 51.093048, lng: 6.842120 },
            markers: [
                {
                    position: {
                        lat: 51.093048, lng: 6.842120
                    },
                    name: "id=1",
                    click: {
                        type: "asyncPost",
                        callbackUrl: "https://icon-library.com/images/img-icon/img-icon-14.jpg"
                    }
                },
                {
                    position: {
                        lat: 51.083048, lng: 6.242120
                    },
                    name: "id=2",
                    click: {
                        type: "asyncPost",
                        callbackUrl: "https://icon-library.com/images/img-icon/img-icon-14.jpg"
                    }
                },
            ]
        }
    },
    {
        id: "769841cf-a9ab-4efb-b89b-72f94d9f84a3",
        name: "Item2Header",
        data: {
            price: { uah: 10, usd: 20 },
            title: "Vinnitsya",
            sub_title: "Vinnitsya 1",
            actions: actions
        }
    },
    {
        id: "2b070309-4fb6-400a-9589-5c6b84e5f890",
        name: "ListWidget",
        data: {
            list: [
                "item1", "item2", "item3"
            ],
            actions: actions
        }

    },
    {
        id: 17,
        name: "ApiWidget",
        data: {
            callbackUrl: "http://localhost:4000/api/v1/test"
        }
    },
    {
        id: 33,
        name: "PopupWidget",
        nestedComponents: [
        ],
        data: {
            message: "aaaa"
        }
    },
    {
        id: 376,
        name: "SimpleRow",
        type: "layout",
        nestedComponents: [
        ],
    },
    {
        id: 94759,
        name: "SimpleWrap",
        type: "layout",
        nestedComponents: [
        ],
    },
    {
        id: 44,
        name: "TwoColumn",
        type: "layout",
        nestedComponents: [
        ],
    },
    {
        id: 985,
        name: "FixedTop",
        type: "layout",
        nestedComponents: [
        ],
    },
    {
        id: 603495,
        name: "FixedBottom",
        type: "layout",
        nestedComponents: [
        ],
    },
    {
        id: 7,
        name: "FixedCenter",
        type: "layout",
        nestedComponents: [
        ],
    },
    {
        id: 31,
        name: "ABTest",
        type: "layout",
        nestedComponents: [
        ],
    },
]

export default list
