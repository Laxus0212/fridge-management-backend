# Alap image kiválasztása (Node.js 18 Alpine alapú, hogy kisebb legyen az image mérete)
FROM node:18-alpine

# Munkakönyvtár beállítása a konténerben
WORKDIR /app

# Csomagfájlok átmásolása és a függőségek telepítése
COPY package.json package-lock.json ./
RUN npm install --only=production

# Az alkalmazás fájljainak átmásolása a konténerbe
COPY . .

# Exponáljuk a szükséges portot
EXPOSE 3000

# Az alkalmazás indítási parancsa
CMD ["node", "server.js"]
