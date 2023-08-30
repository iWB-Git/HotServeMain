const nodemailer = require("nodemailer");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const transporter = nodemailer.createTransport(
    {
      service: "gmail",
      auth: {
        user: "ladeadolce@gmail.com",
        pass: "xokahxzgvlcltihh",
      },
    });

exports.touch = functions.database
    .ref("Temp")
    .onWrite((change, context) => {
      const bef = change.before.val();
      const aft = change.after.val();

      const mailOptions = {
        from: "HotServe <noreply@hotserve-ca8ff.firebaseapp.com>",
        replyTo: "noreply@hotserve-ca8ff.firebaseapp.com",
        to: "michysushi@gmail.com",
        subject: "Server Temperature is increasing",
        text: "Current temperature is " + aft + "°C, Previous temperature was " + bef + "°C",
      };

      console.log("DATA BEFORE:", bef);
      console.log("DATA AFTER:", aft);

      if (aft > bef) {
        return transporter.sendMail(mailOptions);
      }
      //  admin.database().ref("/lastmodified").set(context.timestamp);
    });
