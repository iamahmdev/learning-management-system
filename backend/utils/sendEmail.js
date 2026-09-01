import nodemailer from "nodemailer";

// =====================================================
// MAILTRAP SMTP CONFIGURATION
// =====================================================

// Lazy initialization to ensure environment variables are loaded
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    // Debug: Log environment variables to verify they're loaded
    console.log('=== MAILTRAP CONFIGURATION ===');
    console.log('Host:', process.env.MAILTRAP_HOST);
    console.log('Port:', process.env.MAILTRAP_PORT);
    console.log('Username:', process.env.MAILTRAP_USERNAME ? '***set***' : 'NOT SET');
    console.log('Password:', process.env.MAILTRAP_PASSWORD ? '***set***' : 'NOT SET');
    console.log('From Email:', process.env.MAILTRAP_FROM_EMAIL);
    console.log('==============================');

    transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
      port: Number(process.env.MAILTRAP_PORT) || 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }
  return transporter;
};

// =====================================================
// SEND EMAIL
// =====================================================

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const mailOptions = {
      from: process.env.MAILTRAP_FROM_EMAIL || 'no-reply@school.com',
      to,
      subject,
      text,
      html,
    };

    const info = await getTransporter().sendMail(mailOptions);

    console.log(`Email sent successfully: ${info.messageId}`);

    return info;
  } catch (error) {
    console.error(`Email sending failed: ${error.message}`);
    throw error;
  }
};

// =====================================================
// PASSWORD RESET EMAIL
// =====================================================

export const sendPasswordResetEmail = async ({
  to,
  name,
  resetUrl,
}) => {
  const subject = "Reset Your Password";

  const text = `
Hello ${name},

We received a request to reset your password.

Click the link below to reset your password:

${resetUrl}

This link will expire in 15 minutes.

If you did not request a password reset, please ignore this email.

Regards,
School Management System
  `;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Reset Password</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f4f6f8;
    font-family: Arial, Helvetica, sans-serif;
  "
>

  <div
    style="
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 40px;
    "
  >

    <h2
      style="
        margin-top: 0;
        color: #222222;
      "
    >
      Reset Your Password
    </h2>

    <p
      style="
        font-size: 16px;
        color: #333333;
      "
    >
      Hello <strong>${name}</strong>,
    </p>

    <p
      style="
        font-size: 15px;
        line-height: 1.6;
        color: #555555;
      "
    >
      We received a request to reset the password
      for your School Management System account.
    </p>

    <p
      style="
        font-size: 15px;
        line-height: 1.6;
        color: #555555;
      "
    >
      Click the link below to reset your password:
    </p>

    <div style="margin: 30px 0;">

      <a
        href="${resetUrl}"
        style="
          display: inline-block;
          padding: 14px 28px;
          background-color: #2563eb;
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
          font-size: 15px;
        "
      >
        Reset Password
      </a>

    </div>

    <p
      style="
        font-size: 14px;
        line-height: 1.6;
        color: #666666;
      "
    >
      This password reset link will expire in
      <strong>15 minutes</strong>.
    </p>

    <p
      style="
        font-size: 14px;
        line-height: 1.6;
        color: #666666;
      "
    >
      If you did not request a password reset,
      you can safely ignore this email.
    </p>

    <hr
      style="
        border: none;
        border-top: 1px solid #eeeeee;
        margin: 30px 0;
      "
    />

    <p
      style="
        margin: 0;
        font-size: 13px;
        color: #888888;
      "
    >
      Regards,<br />
      <strong>School Management System</strong>
    </p>

  </div>

</body>
</html>
  `;

  return sendEmail({
    to,
    subject,
    text,
    html,
  });
};

export default sendEmail;