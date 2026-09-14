import { getBookings } from "../_action/getBookings";
import AdminBookingCard from "./_components/AdminBookingCard";

//   {
//             "id": "801f8b59-66bb-414c-9e64-d1c160a20d3c",
//             "customerId": "003b3401-ce3f-4fae-814f-1de909a80c79",
//             "technicianId": "eb2c7d40-92df-4b4b-bd58-06ae32802f17",
//             "serviceId": "6dce1fc7-723c-4fa5-b918-018e27b2ec93",
//             "bookingDate": "2026-08-15T00:00:00.000Z",
//             "slotTime": "10:00 AM - 12:00 PM",
//             "status": "PENDING",
//             "createdAt": "2026-07-09T18:24:36.208Z",
//             "updatedAt": "2026-07-09T18:24:36.208Z",
//             "service": {
//                 "id": "6dce1fc7-723c-4fa5-b918-018e27b2ec93",
//                 "categoryId": "12345",
//                 "technicianId": "eb2c7d40-92df-4b4b-bd58-06ae32802f17",
//                 "title": "Toilet Clean",
//                 "price": "1500",
//                 "description": "Professional AC repair and maintenance.",
//                 "thumbnail": null,
//                 "isPremium": false,
//                 "createdAt": "2026-07-10T12:13:56.828Z",
//                 "updatedAt": "2026-07-10T12:13:56.828Z"
//             },
//             "technician": {
//                 "id": "eb2c7d40-92df-4b4b-bd58-06ae32802f17",
//                 "userId": "4b1ae563-aa0e-4e79-8315-553f49452220",
//                 "skills": [],
//                 "experience": 1,
//                 "bio": "",
//                 "rating": 5,
//                 "location": null,
//                 "availability": [],
//                 "createdAt": "2026-07-07T11:52:39.218Z",
//                 "updatedAt": "2026-07-10T06:06:18.373Z",
//                 "user": {
//                     "id": "4b1ae563-aa0e-4e79-8315-553f49452220",
//                     "name": "Sazzad Hasan",
//                     "email": "sazzad2@email",
//                     "role": "TECHNICIAN",
//                     "status": "ACTIVE",
//                     "createdAt": "2026-07-07T11:52:39.160Z",
//                     "updatedAt": "2026-07-07T11:52:39.160Z"
//                 }
//             }
//         },

export type Booking = {
    id: string;
    bookingDate: string;
    slotTime: string;
    status: string;
    service: {
        title: string;
        price: string;
        description: string;
        thumbnail: string | null;
        isPremium: boolean;
    };
    technician: {
        experience: number;
        rating: number;
        location: string | null;
        user: {
            name: string;
            email: string;
            status: string;
        };
    };  

}


const AdminBookikngs = async () => {
  const result = await getBookings();

  if (!result.success) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-500">{result.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">All Bookings</h1>
        <p className="text-sm text-muted-foreground">
          Manage and monitor all service bookings.
        </p>
      </div>

      {/* Booking Cards */}
      <div className="grid gap-5 lg:grid-cols-2">
        {result.data.map((booking : Booking) => (
          <AdminBookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default AdminBookikngs;
