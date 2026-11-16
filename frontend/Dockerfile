# Używamy lekkiej wersji środowiska Node.js
FROM node:20-slim

# Ustawiamy katalog roboczy wewnątrz kontenera
WORKDIR /app

# Kopiujemy pliki z informacjami o bibliotekach do kontenera
COPY package*.json ./

# Instalujemy potrzebne biblioteki
RUN npm install

# Kopiujemy całą resztę kodu
COPY . .

# Wystawiamy port, na którym działa Vue (Vite)
EXPOSE 5173

# Komenda uruchamiająca serwer developerski (z flagą --host żeby zadziałał poza kontenerem)
CMD ["npm", "run", "dev", "--", "--host"]