import http from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const file = fileURLToPath(new URL("./db.json", import.meta.url));
let db = JSON.parse(await readFile(file, "utf8"));
let queue = Promise.resolve();
const send = (res, code, value) => {
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(value));
};
http
  .createServer(async (req, res) => {
    try {
      if (req.method === "OPTIONS") return send(res, 204, null);
      const url = new URL(req.url, "http://localhost");
      if (url.searchParams.get("delay"))
        await new Promise((r) =>
          setTimeout(
            r,
            Math.min(Number(url.searchParams.get("delay")) || 0, 5000),
          ),
        );
      if (url.pathname === "/erreur")
        return send(res, 500, { message: "Panne de démonstration" });
      if (req.method === "GET" && url.pathname === "/ateliers")
        return send(res, 200, db.ateliers);
      if (req.method === "GET" && url.pathname.startsWith("/ateliers/")) {
        const a = db.ateliers.find((a) => a.id === url.pathname.split("/")[2]);
        return send(
          res,
          a ? 200 : 404,
          a || { message: "Atelier introuvable" },
        );
      }
      if (req.method === "POST" && url.pathname === "/ateliers") {
        let body = "";
        for await (const chunk of req) {
          body += chunk;
          if (body.length > 20000)
            return send(res, 413, { message: "Données trop volumineuses" });
        }
        let a;
        try {
          a = JSON.parse(body);
        } catch {
          return send(res, 400, { message: "JSON invalide" });
        }
        if (
          typeof a.titre !== "string" ||
          a.titre.trim().length < 5 ||
          typeof a.formateur !== "string" ||
          a.formateur.trim().length < 2 ||
          !["debutant", "intermediaire", "avance"].includes(a.niveau) ||
          !Number.isFinite(a.prix) ||
          a.prix < 0 ||
          !Number.isInteger(a.places) ||
          a.places < 1
        )
          return send(res, 422, {
            message: "Titre, niveau, prix, places ou formateur invalides",
          });
        a = {
          ...a,
          id: crypto.randomUUID(),
          titre: a.titre.trim(),
          formateur: a.formateur.trim(),
        };
        db.ateliers.push(a);
        queue = queue.then(() => writeFile(file, JSON.stringify(db, null, 2)));
        await queue;
        return send(res, 201, a);
      }
      return send(res, 404, { message: "Ressource introuvable" });
    } catch (error) {
      console.error(error);
      send(res, 500, { message: "Erreur du serveur local" });
    }
  })
  .listen(3001, "127.0.0.1", () =>
    console.log("API pédagogique : http://127.0.0.1:3001/ateliers"),
  );
