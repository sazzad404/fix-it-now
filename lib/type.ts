export type IService = {
  id: string;
  categoryId: string;
  technicianId: string;
  title: string;
  price: string;
  description: string;
  thumbnail?: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;

  category: {
    id: string;
    name: string;
  };

  technician: {
    id: string;
    userId: string;
    skills: string[];
    experience: number;
    bio: string;
    rating: number;
    location: string;
    availability: string[];
    createdAt: string;
    updatedAt: string;

    user: {
      id: string;
      name: string;
      email: string;

      role: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};


export type IBooking = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  bookingDate: string;
  slotTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  service: {
    id: string;
    categoryId: string;
    technicianId: string;
    title: string;
    price: string;
    description: string;
    thumbnail?: string;
    isPremium: boolean;
    createdAt: string;
  };
  customer: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    
  };
};
