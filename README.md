# DNA-Matching 
---
#### `link web` :  https://sxf-dnamatching.vercel.app/
Stima X Family DNA-Matching merupakan web untuk tes DNA yang menerima input nama user, dna sequence user(berupa file txt), nama penyakit yang ingin dicek, dan algoritma string matching. Lalu setelah submit, web akan menentukan apakah sequence dna dari user memiliki kesamaan degan dna sequence penyakit yang diinput juga. Selain mengecek DNA, web ini juga memiliki fitur untuk menambah sequence dna penyakit baru, serta melihat riwayat user yang sudah tes.

## Struktur web
---
### Backend

isi struktur folder backend:
```
+---backend
¦   ¦   .env
¦   ¦   .gitignore
¦   ¦   go.mod
¦   ¦   go.sum
¦   ¦   main.go
¦   ¦   
¦   +---configs
¦   ¦       env.go
¦   ¦       setup.go
¦   ¦       
¦   +---controllers
¦   ¦       algorithm.go
¦   ¦       errors.go
¦   ¦       penyakit.go
¦   ¦       riwayat.go
¦   ¦       
¦   +---models
¦   ¦       models.go
¦   ¦       
¦   +---responses
¦   ¦       responses.go
¦   ¦       
¦   +---routes
¦   ¦       routes.go
¦   ¦       
¦   +---vendor
¦       ¦   modules.txt

```
backend pada web ini menggunakan bahasa golang dengan framework echo, dan menggunakan design pattern MVC \
`model` : terdapat di dalam folder models bertujuan untuk mencatat struct yang akan dipakai dalam pemrosesan data\
`view` : terdapat pada folder responses, merupakan data yang terekspos ke frontend\
`controller` : terdapat pada folder controllers, dan berguna untuk mengatur keberlanjutan data yang dikirimkan dari frontend (bisa kirim ke db, atau diproses dahulu pada algorithm)

### Frontend
isi struktur folder frontend:
```
+---frontend
    ¦   .gitignore
    ¦   package-lock.json
    ¦   package.json
    ¦           
    +---public
    ¦       covid-test.png
    ¦       dna.png
    ¦       favicon.ico
    ¦       index.html
    ¦       logo192.png
    ¦       logo512.png
    ¦       manifest.json
    ¦       notes.png
    ¦       robots.txt
    ¦       SXF.png
    ¦       
    +---src
        ¦   index.css
        ¦   index.js
        ¦   logo.svg
        ¦   reportWebVitals.js
        ¦   setupTests.js
        ¦   
        +---app
        ¦       App.css
        ¦       App.js
        ¦       App.test.js
        ¦       
        +---assets
        ¦       azka.JPG
        ¦       azka.png
        ¦       dhika.JPG
        ¦       dhika.png
        ¦       semi.JPG
        ¦       semi.png
        ¦       
        +---components
        ¦       Footer.jsx
        ¦       LamanUtama.jsx
        ¦       Navigation.jsx
        ¦       RiwayatPenyakit.jsx
        ¦       TambahPenyakit.jsx
        ¦       TentangKami.jsx
        ¦       TesDNA.jsx
        ¦       
        +---style
                style.css

```
frontend pada web ini memanfaatkan framework React dengan menggunakan JavaScript, HTML, dan CSS\
`component` : komponen tiap laman yang diatur routingnya pada App.js\
`style` : mengatur styling dari component\
`assets` : menyimpan foto yang pada tentang kami
