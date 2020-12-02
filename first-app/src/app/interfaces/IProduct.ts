export interface IProduct {
    id: number;
    imgUrl: ImgUrl[];
    price: number;
    discount: number;
    main: boolean;
    shop: string;
    name: string;
    description: string;
    shipping: string;
    discountUntil: string;
    new: boolean;
    color: string[];
    size: string[];
    review: IReview[];
}

export interface IReview {
    author: string;
    text: string;
    rating: number;
}

export interface ImgUrl {
    imgUrl: string;
    path: string;
}

export function emptyIProduct(): IProduct {
    return {
        id: null,
        imgUrl: [],
        price: null,
        discount: null,
        main: false,
        shop: '',
        name: '',
        description: '',
        shipping: '',
        discountUntil: '',
        new: true,
        color: [],
        size: [],
        review: []
    };
}

