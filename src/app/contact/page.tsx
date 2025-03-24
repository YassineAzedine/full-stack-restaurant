// pages/contact.tsx
"use client";
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const page = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., call API or email service)
    console.log(formData);
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-red-500">Contact Us</h1>
      <p className="text-center mb-8">Have any questions or want to make a reservation? We’d love to hear from you!</p>

      {/* Contact Info Section */}
      <div className="flex justify-between mb-8">
            {/* <div className="flex-1 pr-8">
            <h2 className="text-2xl font-semibold text-red-500">Our Location</h2>
            <p><strong>[Restaurant Name]</strong></p>
            <p>[Street Address]</p>
            <p>[City, State, ZIP]</p>
            <p>Phone: 060000000</p>
            <p>Email: <a href="mailto:[email@example.com]" className="text-blue-500">Foodie@gmail.com</a></p>
            </div> */}

        {/* Google Map Embed */}
        {/* <div className="flex-1">
          <h2 className="text-2xl font-semibold text-red-500">Find Us</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=[Your_Google_Map_Embed_Link]"
            width="600"
            height="450"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
            title="Map Location"
          ></iframe>
        </div> */}
      </div>

      {/* Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-red-500">Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white font-bold rounded-md hover:bg-orange-500 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
