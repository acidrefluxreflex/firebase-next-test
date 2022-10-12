import type { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { db } from "../../firebaseAdmin";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default async function handler(req: Req, res: Res) {
  const COLLECTION_NAME = "restaurants";
  const targetDoc = "AcyrVcdubTiIERUUrIEK";
  const post_comentarios = req.body;

  if (req.method === "POST") {
    const docRef = db.collection(COLLECTION_NAME).doc();
    const insertData = {
      datano: "1",
      name: "Symfo",
      email: "symfo@example.com",
    };
    docRef.set(insertData);
  } else if (req.method === "GET") {
    const doc = await db.collection(COLLECTION_NAME).doc(targetDoc).get();
    res.json(doc.data());
  }
}
