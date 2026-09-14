"use server";

import { cookies } from "next/headers";

export type BookingData = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  bookingDate: string;
  slotTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CustomerData = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type TechnicianData = {
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
  user: UserData;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type reviewData = {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  booking: BookingData;
  customer: CustomerData;
  technician: TechnicianData;
};

export type reviewState = {
  success: boolean;
  message: string;
  data: reviewData | null;
};

export const createReview = async (
  prevState: reviewState,
  formData: FormData,
): Promise<reviewState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const bookingId = formData.get("bookingId");
  const rating = formData.get("rating");
  const comment = formData.get("comment");

  const payload = {
    bookingId,
    rating: Number(rating),
    comment,
  };

  if (!accessToken) {
    return {
      success: false,
      message: "Please login first",
      data: null,
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    console.log("REVIEW STATUS:", res.status);
    console.log("REVIEW RESULT:", result);

    if (result.success) {
      return {
        success: true,
        message: result.message || "Review submitted successfully",
        data: result.data ?? null,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to submit review",
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
      data: null,
    };
  }
};
