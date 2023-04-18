import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: "tristan.maltizo@gmail.com", // Your email where you'll receive emails
      from: `${req.body.email}`, // import website email address here
      subject: `[trizothethird] A Contact Me response was sent by ${req.body.name}:`, // import website name here
      html: `${req.body.message}`, // import website message here
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;