/* eslint-disable @typescript-eslint/no-explicit-any */
export type tab = {
    id: string;
    label: string;
};

export type TUser = {
    _id: string;
    clerkId: string;
    email: string;
    name: string;
    role: string;
    image: string;
    isDeleted: boolean;
    location: string[];
    phone: string;
    paymentHistory: any[];
    createdAt: string;
    updatedAt: string;
};

export type TBlog = {
    _id: string;
    blogCategory: string;
    user: TUser;
    title: string;
    description: string;
    comments: any[];
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type TStaff = {
    _id: string;
    email?: string;
    image: string;
    name: string;
    phoneNo: string;
    designation: string;
    address: string;
    facebookLink?: string;
    linkedinLink?: string;
    instagramLink?: string;
    youtubeLink?: string;
    createdAt: string;
    updatedAt: string;
    bio: string;
};

export interface TComment {
    userId: TUser;
    foodId: TFood;
    comment: string;
    images?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface TMenu {
    _id: string;
    name: string;
    image: string;
    description: string;
    foods: TFood[];
}

//Food types
export type TSize = {
    size: string;
    price: number;
    description?: string;
};

export type TExtra = {
    name: string;
    extra_price: number;
};

export interface TFood {
    _id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    menuId: TMenu;
    sizes: TSize[];
    extras: TExtra[];
    orders: string[];
    comments: TComment[];
    rating: string[];
    averageRating: number;
    totalRating: number;
    createdAt: Date;
    updatedAt: Date;
}

export type TFoodFeedback = {
    _id?: string;
    user: TUser;
    clerkId?: string;
    foodId: string;
    title: string;
    review: string;
    rating: number;
};
