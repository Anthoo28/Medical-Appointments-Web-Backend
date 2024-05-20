
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


async function googleVerify(token='') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const {given_name,picture,family_name, email} = ticket.getPayload();


  return{
name:given_name,
lastname:family_name,
img:picture,
email
  }
}


module.exports={
googleVerify
}