exports.registerEmail = (firstName, lastName, email, birthDate, password, token) => {
    return {

        to: email, // Your email where you'll receive emails
        from: process.env.SENDER_EMAIL, // your website email address here
        subject: `Verification email`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
           <html lang="en">
           <head>
             <meta charset="utf-8">
    
             <title>The HTML5 Herald</title>
             <meta name="description" content="The HTML5 Herald">
             <meta name="author" content="SitePoint">
           <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
           <link rel="stylesheet" href="css/styles.css?v=1.0">
         </head>
    
         <body>
           <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
                 </div>
                 <div class="container" style="margin-left: 20px;margin-right: 20px;">
                 <h3>Έχετε ένα μήνυμα από τον/την ${firstName}, με e-mail: ✉️${email} και τηλέφωνο ${birthDate} και ${password, lastName}</h3>
                 <div style="font-size: 16px;">
                 <p>Please use the following link to complete your registration:</p>
                 <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                 <br>
                 </div>
           </body>
           </html>`,
    }

}

exports.forgotPasswordEmail = (firstName, lastName, email, birthDate, password, token) => {
  return {

      to: email, // Your email where you'll receive emails
      from: process.env.SENDER_EMAIL, // your website email address here
      subject: `Verification email`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
         <html lang="en">
         <head>
           <meta charset="utf-8">
  
           <title>The HTML5 Herald</title>
           <meta name="description" content="The HTML5 Herald">
           <meta name="author" content="SitePoint">
         <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
         <link rel="stylesheet" href="css/styles.css?v=1.0">
       </head>
  
       <body>
         <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
               </div>
               <div class="container" style="margin-left: 20px;margin-right: 20px;">
               <h3>Έχετε ένα μήνυμα από τον/την ${firstName}, με e-mail: ✉️${email} και τηλέφωνο ${birthDate} και ${password, lastName}</h3>
               <div style="font-size: 16px;">
               <p>Please use the following link to complete your registration:</p>
               <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
               <br>
               </div>
         </body>
         </html>`,
  }

}
