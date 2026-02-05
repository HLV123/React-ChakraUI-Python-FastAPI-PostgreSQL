# React-ChakraUI-Python-FastAPI-PostgreSQL
<img src="ui1.png" width="900">
<img src="ui2.png" width="900">
<img src="ui3.png" width="900">
<img src="ui4.png" width="900">
<img src="ui5.png" width="900">
<img src="ui6.png" width="900">
<img src="ui7.png" width="900">
<img src="ui8.png" width="900">
<img src="ui9.png" width="900">

```
cineluxor-project/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth.py
│   │   │   │   ├── bookings.py
│   │   │   │   ├── cinemas.py
│   │   │   │   ├── fnb.py
│   │   │   │   ├── movies.py
│   │   │   │   └── promotions.py
│   │   │   └── __init__.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db/
│   │   │   ├── __init__.py
│   │   │   ├── database.py
│   │   │   └── seed.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── booking.py
│   │   │   ├── cinema.py
│   │   │   ├── fnb.py
│   │   │   ├── movie.py
│   │   │   ├── promotion.py
│   │   │   ├── showtime.py
│   │   │   └── user.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── booking.py
│   │   │   ├── cinema.py
│   │   │   ├── movie.py
│   │   │   └── user.py
│   │   ├── services/
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   └── main.py
│   ├── alembic/
│   │   └── versions/
│   ├── .env.example
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   │   ├── booking-summary.png
│   │   │   ├── fnb-1.png
│   │   │   ├── fnb-2.png
│   │   │   ├── fnb-3.png
│   │   │   ├── fnb-4.png
│   │   │   ├── hero-bg.png
│   │   │   ├── logo.png
│   │   │   ├── movie-1.png
│   │   │   ├── movie-2.png
│   │   │   ├── movie-3.png
│   │   │   ├── movie-4.png
│   │   │   ├── promo-1.png
│   │   │   ├── promo-2.png
│   │   │   └── promo-3.png
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthModal.js
│   │   │   ├── BookingSection.js
│   │   │   ├── CinemasSection.js
│   │   │   ├── FnBSection.js
│   │   │   ├── Footer.js
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── MembershipSection.js
│   │   │   ├── MovieCard.js
│   │   │   ├── MoviesSection.js
│   │   │   ├── PromosSection.js
│   │   │   ├── SeatSelection.js
│   │   │   ├── StatsBar.js
│   │   │   └── index.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── BookingContext.js
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── HomePage.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── theme/
│   │   │   └── index.js
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## BƯỚC 1: CÀI ĐẶT DATABASE

### 1.1 Cài PostgreSQL
- Download: https://www.postgresql.org/download/windows/
- Cài đặt với mật khẩu cho user `postgres`

### 1.2 Tạo Database bằng pgAdmin
- Mở pgAdmin
- Click phải vào `Databases` → `Create` → `Database`
- Đặt tên: `cineluxor`
- Save

---

## BƯỚC 2: CÀI ĐẶT BACKEND

Mở Terminal trong VS Code, chạy từng lệnh:

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

### Sửa file `.env`
Mở file `backend/.env`, sửa dòng DATABASE_URL:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/cineluxor
```
(thay YOUR_PASSWORD bằng mật khẩu PostgreSQL của bạn)

### Seed dữ liệu
```
python -m app.db.seed
```

### CẤU TRÚC SAU KHI CHẠY LỆNH BACKEND

```
backend/
├── venv/                    ← SINH MỚI
│   ├── Include/
│   ├── Lib/
│   ├── Scripts/
│   └── pyvenv.cfg
├── app/
│   └── ...
├── alembic/
│   └── versions/
├── .env.example
├── .env                     ← SINH MỚI (từ lệnh copy)
└── requirements.txt
```

---

## BƯỚC 3: CÀI ĐẶT FRONTEND

Mở Terminal mới trong VS Code:

```
cd frontend
npm install
```

### CẤU TRÚC SAU KHI CHẠY npm install

```
frontend/
├── node_modules/            ← SINH MỚI
│   └── ... (hàng nghìn packages)
├── public/
│   └── ...
├── src/
│   └── ...
├── package.json
└── package-lock.json        ← SINH MỚI
```

---

## BƯỚC 4: CHẠY PROJECT

### Terminal 1 - Backend:
```
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

### Terminal 2 - Frontend:
```
cd frontend
npm start
```

---

## TRẢI NGHIỆM WEB

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## CẤU TRÚC CUỐI CÙNG (sau khi cài đặt hoàn tất)

```
cineluxor-project/
├── backend/
│   ├── venv/                ← SINH TỪ python -m venv venv
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth.py
│   │   │   │   ├── bookings.py
│   │   │   │   ├── cinemas.py
│   │   │   │   ├── fnb.py
│   │   │   │   ├── movies.py
│   │   │   │   └── promotions.py
│   │   │   └── __init__.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db/
│   │   │   ├── __init__.py
│   │   │   ├── database.py
│   │   │   └── seed.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── booking.py
│   │   │   ├── cinema.py
│   │   │   ├── fnb.py
│   │   │   ├── movie.py
│   │   │   ├── promotion.py
│   │   │   ├── showtime.py
│   │   │   └── user.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── booking.py
│   │   │   ├── cinema.py
│   │   │   ├── movie.py
│   │   │   └── user.py
│   │   ├── services/
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   └── main.py
│   ├── alembic/
│   │   └── versions/
│   ├── .env.example
│   ├── .env                 ← SINH TỪ copy .env.example .env
│   └── requirements.txt
│
├── frontend/
│   ├── node_modules/        ← SINH TỪ npm install
│   ├── public/
│   │   ├── images/
│   │   │   ├── booking-summary.png
│   │   │   ├── fnb-1.png
│   │   │   ├── fnb-2.png
│   │   │   ├── fnb-3.png
│   │   │   ├── fnb-4.png
│   │   │   ├── hero-bg.png
│   │   │   ├── logo.png
│   │   │   ├── movie-1.png
│   │   │   ├── movie-2.png
│   │   │   ├── movie-3.png
│   │   │   ├── movie-4.png
│   │   │   ├── promo-1.png
│   │   │   ├── promo-2.png
│   │   │   └── promo-3.png
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthModal.js
│   │   │   ├── BookingSection.js
│   │   │   ├── CinemasSection.js
│   │   │   ├── FnBSection.js
│   │   │   ├── Footer.js
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── MembershipSection.js
│   │   │   ├── MovieCard.js
│   │   │   ├── MoviesSection.js
│   │   │   ├── PromosSection.js
│   │   │   ├── SeatSelection.js
│   │   │   ├── StatsBar.js
│   │   │   └── index.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── BookingContext.js
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   └── HomePage.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── theme/
│   │   │   └── index.js
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json    ← SINH TỪ npm install
│
├── .gitignore
└── README.md
```
