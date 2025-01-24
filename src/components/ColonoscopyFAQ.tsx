import { useState } from "react";
import FAQItem from "./FAQItem";

const ColonoscopyFAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const faqs = [
    {
      question:
        "What's the difference between Trilyte and Gatorade/Miralax preparation?",
      answer:
        "Trilyte is a prescription-only solution that you mix with water. Gatorade/Miralax is an over-the-counter alternative that combines Miralax powder with Gatorade. Both are effective, but some patients find the Gatorade/Miralax combination more palatable. Your doctor will recommend which option is best for you based on your medical history.",
    },
    {
      question: "How will I know if my preparation is complete?",
      answer:
        "Your bowel movements should become liquid and clear, similar to the color of light yellow urine or clear water. If your output is still brown or cloudy, contact your healthcare provider as you may need additional preparation.",
    },
    {
      question: "Can I take my regular medications during preparation?",
      answer:
        "Most medications can be taken up until 4 hours before your procedure, but some medications may need to be stopped or adjusted. Always consult with your doctor about your specific medications, especially:\n\n• Blood thinners\n• Diabetes medications\n• Blood pressure medications\n• Anti-inflammatory medications",
    },
    {
      question: "What should I wear to my appointment?",
      answer:
        "Wear comfortable, loose-fitting clothing. Consider wearing:\n\n• A short-sleeved shirt for IV access\n• Loose, elastic-waist pants or shorts\n• Comfortable shoes\n• Leave jewelry and valuables at home",
    },
    {
      question: "What happens if I miss my appointment?",
      answer:
        "If you need to reschedule, please contact us at least 48 hours in advance. Missing your appointment without notice may result in a cancellation fee. The preparation process is time-sensitive, so you'll need to restart the preparation process for your new appointment date.",
    },
  ];

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openItems.has(index)}
            onClick={() => toggleItem(index)}
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-800">
          If you have additional questions or concerns, please contact our
          office. Always follow your doctor's specific instructions, as they may
          differ based on your medical history and needs.
        </p>
      </div>
    </div>
  );
};

export default ColonoscopyFAQ;
