const admin = require('firebase-admin');

const serviceAccount = require('../serverAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
exports.tulis = (pesan)=>{
  // db.collection("backend").add({"msg": pesan});
  //   db.collection("backend").doc("Tasya").
  const id  = Date.now().toString()
  db.collection("backend").doc(id).set({"msg":pesan})
}

exports.baca = async ( )=>{
  const ss =  await db.collection("backend").get();
  let datastring = "";
  if(!ss.empty){
    ss.forEach((doc)=>{
      const id = doc.id;
      const data = doc.data();
      datastring += `<liv>${data['msg']}</liv>`;
      console.log(datastring);
    })
  }
  return datastring
}

