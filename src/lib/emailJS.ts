import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.PPV_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.PPV_EMAILJS_SERVICE_ID;

// Initialize EmailJS with the public key
emailjs.init(PUBLIC_KEY);

export const sendEmail = async (templateId: string, templateParams: Record<string, any>) => {
  try {
    const response = await emailjs.send(SERVICE_ID, templateId, templateParams);
    console.log('Email sent successfully!', response.status, response.text);
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

export const EMAIL_TEMPLATES = {
  INQUIRY: import.meta.env.PPV_EMAILJS_INQUIRY_TEMPLATE_ID,
  ORDER: import.meta.env.PPV_EMAILJS_ORDER_TEMPLATE_ID,
};
