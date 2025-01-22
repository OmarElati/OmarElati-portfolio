import nodemailer from 'nodemailer';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstname, lastname, email, phone, service, message } = req.body;

  // Validate required fields
  if (!firstname || !lastname || !email || !phone || !service || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Construct the message
    const emailMessage = `
      New Contact Form Submission:
      ---------------------------------------
      First Name: ${firstname}
      Last Name: ${lastname}
      Email: ${email}
      Phone: ${phone}
      Selected Service: ${service}
      Message:
      ${message}
      ---------------------------------------
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${firstname} ${lastname}`,
      text: emailMessage,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email.', error });
  }
};

export default handler;
