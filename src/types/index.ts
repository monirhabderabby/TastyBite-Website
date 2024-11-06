/* eslint-disable @typescript-eslint/no-explicit-any */
export type tab = {
  id: string;
  label: string;
};


export type TUser={
  _id: string
  clerkId: string
  email: string
  name: string
  role: string
  image: string
  isDeleted: boolean
  location: string[]
  phone: string
  paymentHistory: any[]
  createdAt: string
  updatedAt: string
}

export type TBlog= {
  _id: string
  blogCategory: string;
  user:TUser;
  title: string
  description: string
  comments: any[]
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}




export type TStaff= {
  _id: string
  email?: string
  image: string
  name: string
  phoneNo: string
  designation: string
  address: string
  facebookLink?: string
  linkedinLink?: string
  instagramLink?: string
  youtubeLink?: string
  createdAt: string
  updatedAt: string
  bio: string
}
