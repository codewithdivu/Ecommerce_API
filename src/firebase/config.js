import admin from "firebase-admin";

import serviceAccount from "../../service.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://myapp-f407c.appspot.com",
});

const storage = admin.storage().bucket();

export { storage };
