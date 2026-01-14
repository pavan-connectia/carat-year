import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import React, { useState } from "react";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your appointment request has been submitted.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-r from-amber-50 to-orange-100 p-6">
      <div className="rounded-2xl bg-transparent p-5 shadow-lg">
        <Heading>Book an Appointment</Heading>
        <p className="my-3 text-center text-gray-600">
          Speak with one of our jewellery experts at your convenience.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-600 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-600 focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-600 focus:outline-none"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Preferred Date & Time"
            required
            className="h-24 w-full resize-none rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-600 focus:outline-none"
          />

          <Button
            variant="outline"
            className="w-full rounded-full border border-purple-900 bg-[#430045] px-8 py-3 text-base font-medium text-white transition hover:bg-transparent hover:text-purple-900 sm:px-10 sm:py-4 sm:text-lg"
          >
            Book Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
