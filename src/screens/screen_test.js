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
        id: 32,
        name: "LineWidget",
    },
    {
        id: 12,
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
        id: 33,
        name: "LineWidget",
    },
    {
        id: 13,
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
        id: 34,
        name: "LineWidget",
    },
    {
        id: 14,
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
        id: 35,
        name: "LineWidget",
    },
    {
        id: 15,
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
        id: 36,
        name: "LineWidget",
    },
    {
        id: 16,
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
        id: 37,
        name: "LineWidget",
    },
    {
        id: 17,
        name: "ApiWidget",
        data: {
            callbackUrl: "http://localhost:4000/api/v1/test"
        }
    },
]

export default list
