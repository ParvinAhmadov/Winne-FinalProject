"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlinePlus } from "react-icons/ai";
import { LiaMinusSolid } from "react-icons/lia";
import NewsletterSubscription from "@/components/Faqs/NewsletterSubscription/NewsletterSubscription";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

const FaqsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      title: "How long does it take for home delivery?",
      description:
        "We use Royal mail and DHL to send most of our UK orders.Euro Car Parts reserves the right to use discretion in any circumstance where it makes more sense to use an alternative delivery method.",
    },
    {
      title: "What courier do you use for deliveries?",
      description:
        "We use Royal mail and DHL to send most of our UK orders.Euro Car Parts reserves the right to use discretion in any circumstance where it makes more sense to use an alternative delivery method.",
    },
    {
      title:
        "Why am I being charged for delivery on my order when it states standard delivery is free?",
      description:
        "All our delivery charges are pre-set by our courier company. We sell some oversized items which require a specialist courier company to fulfil the delivery, there is an additional charge for these. Also, our courier company consider some surcharge postcodes ‘Out of area’. There is an additional charge for these also. You can find a list of all [oversized items here] You can find a list of all",
    },
    {
      title: "I haven’t received a dispatch email/email confirmation?",
      description:
        "Please be aware an automated email is sent to you to the given email address when your order is dispatched. Please check all folders including you junk as it will come from a noreply email address. To ensure emails reach you, add the domain eurocarparts.com to your safe senders list.",
    },
    {
      title:
        " Why does it not tell us on the website that the parts will be delivered by the branch?",
      description:
        "Due to the delicacy of some parts we take extra care in the delivery of the item. These could include body panels and large bulky items. These are either available for collection from our branches or will be delivered to you through our branch network vehicles.",
    },
    {
      title: " Can I collect from a local store?",
      description:
        "We offer a reserve and collect service. This is available on the checkout page. Please be aware, if the product is not available in a local store, you are unable to reserve it.",
    },
    {
      title: "  Do you deliver on Weekend?",
      description:
        "No, our courier company do not offer the service to deliver on weekends currently.",
    },
    {
      title: "Can you confirm you have received my return?",
      description:
        "We aim to process returns within 5-7 working days of receiving them. You will be notified by email once the return is complete.We suggest you make a note of the shipping reference given when you sent the item back. This will allow you to track your parcel at every stage of delivery, including when we receive it.Should you have any queries about your return, please feel free to contact our Customer Service team via email",
    },
    {
      title: "How long will it be before I get a refund?",
      description:
        "Once we receive your item(s) back, our returns department will inspect and restock the goods. Once our returns department have done this, an automated refund is generated on our system. Your outstanding refund is then processed by our accounts department back to your original payment method. This process typically takes 5-7 working days. When returning your products please remember to include your original invoice, without this it may delay your refund.",
    },
    {
      title: " Who pays for return postage?",
      description:
        "If you are returning an unsuitable item for a refund we will refund the cost of the item only and not the original delivery cost.Should you be returning a faulty item for a refund we will refund both the original shipping costs and the return delivery costs.",
    },
    {
      title: " Why have you not refunded the original delivery charge?",
      description:
        "If you are returning an unsuitable item for a refund we will refund the cost of the item only and not the original delivery cost. Should you be returning a faulty item for a refund we will refund both the original shipping costs and the return delivery costs.",
    },
    {
      title: " Do you offer a VAT discount to non EU customers?",
      description:
        "Customer’s ordering from outside the European Union can contact us via telephone, live chat, or e-mail and quote the order reference number. Our customer services team will go through the process to remove the VAT off of their order.",
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="relative w-full h-[404px] mb-8">
        <Image
          src="https://winne-store-demo.myshopify.com/cdn/shop/files/heading-about.png?v=1653993348"
          alt="Wishlist Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-[46px]  mb-2">FAQs</h1>
          <p className="text-white text-[15px] flex items-center gap-2">
            <a href="/" className="hover:text-[#A53E4C]">
              Home
            </a>
            <span>
              <FaChevronRight className="text-[10px]" />
            </span>
            FAQs
          </p>
        </div>
      </div>
      <div className="py-10 px-4 md:px-20 lg:px-32">
        <div className="border-b mb-8">
          <h1 className="text-4xl font-semibold text-left mb-8">
            #Frequently Asked Questions
          </h1>
          <p className="text-left text-[#212529] mb-12">
            I am text block. Click edit button to change this text. Lorem ipsum
            dolor sit amet,consectetur adipiscing elit. Ut elit tellus, luctus
            nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b pb-4"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex items-center justify-between cursor-pointer">
                <span className="text-xl font-bold text-gray-500 mr-4">
                  {activeIndex === index ? (
                    <LiaMinusSolid className="text-[#A53E4C]" />
                  ) : (
                    <AiOutlinePlus className="text-[#212529]" />
                  )}
                </span>
                <h2 className="text-lg text-black  font-medium flex-1">
                  {faq.title}
                </h2>
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="mt-2 text-gray-600">{faq.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t mt-8">
        <NewsletterSubscription />
      </div>
    </>
  );
};

export default FaqsPage;
