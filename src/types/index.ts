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

export type TFoodWithQuantity = TFood & { quantity: number };

type OrderStatus =
  | "Order Placed"
  | "Order Confirmed"
  | "Cooking"
  | "Out For Delivery"
  | "Delivered"
  | "PickedUp"
  | "Cancelled";

export type TOrder = {
  _id: string; // ObjectId as a string
  user: TUser; // User who placed the order
  foods: [{ foodId: TFood; quantity: number; _id: string }]; // Array of food IDs
  paymentStatus: "Paid" | "Pending"; // Payment status of the order
  transactionId?: string | null; // Optional transaction ID
  invoiceId?: string | null; // Optional invoice ID
  isCancelled: boolean; // Indicates if the order is cancelled
  isCompleted: boolean; // Indicates if the order is completed
  deliveryMan?: TUser | null; // Optional delivery person information
  orderStatus: OrderStatus; // Current status of the order
  deliveryLocation: string; // Name of the city for delivery
  totalPrice: number; // Total price of the order
  createdAt: string; // ISO date string for order creation
  updatedAt: string; // ISO date string for the last update
};
<<<<<<< HEAD

export type TNotification = {
  _id: string; // Unique identifier for the notification
  user: string; // User ID associated with the notification
  name: string; // Title of the notification
  description: string; // Detailed description of the notification
  icon: string; // Icon associated with the notification
  color: string; // Color code for the notification
  isRead: boolean; // Whether the notification has been read
  isArchived: boolean; // Whether the notification has been archived
  time: string; // Timestamp for when the notification occurred
  createdAt: string; // Timestamp for when the notification was created
  updatedAt: string; // Timestamp for when the notification was last updated
  __v: number; // Version key for the document (from MongoDB)
};
=======
export interface TNotification {
  user: TUser; // Reference to the user
  name: string; // Notification title
  description: string; // Detailed description
  time: Date; // Time of the notification
  icon: string; // Emoji/icon for the notification
  color: string; // Color code for UI
  isRead: boolean; // To track if the notification is read
}
>>>>>>> b255a04af643b1c09b9dee4cd0892b21ddc5ee02
