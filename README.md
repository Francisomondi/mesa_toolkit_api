#  M-Pesa Toolkit API (Node.js)

A powerful and developer-friendly **M-Pesa API toolkit** built with Node.js, Express, and MongoDB.
This project enables businesses and developers to integrate **Safaricom M-Pesa STK Push payments**, track transactions, and manage API access securely.

---

##  Features

*  **User Authentication (Register & Login)**
*  **Secure API Key System (Per User)**
*  **STK Push Integration (Lipa na M-Pesa Online)**
*  **Callback Handling (Payment Confirmation)**
*  **Transaction History Tracking**
*  **Protected Routes (API Key Middleware)**
*  **Scalable SaaS Architecture (Multi-user ready)**

---

##  Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT + API Keys
* **Payments:** Safaricom Daraja API (M-Pesa)
* **State Management (Frontend):** Zustand
* **HTTP Client:** Axios

---

##  Project Structure

```
src/
│
├── config/        # Database connection
├── controllers/   # Business logic (auth, mpesa)
├── middleware/    # API key auth, error handling
├── models/        # MongoDB schemas
├── routes/        # API routes
├── utils/         # Helpers (API key generator, etc.)
└── server.js      # App entry point
```

---

##  Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/mpesa-toolkit-api.git
cd mpesa-toolkit-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

# Safaricom M-Pesa
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=your_callback_url
```

---

##  Run the App

```bash
npm run dev
```

---

##  Authentication Flow

1. User registers → API key generated automatically
2. API key is stored in database
3. All protected routes require:

```http
x-api-key: YOUR_API_KEY
```

---

##  API Endpoints

###  Auth

```
POST /api/auth/register
POST /api/auth/login
```

###  M-Pesa

```
POST /api/mpesa/stkpush
POST /api/mpesa/callback
```

###  Transactions

```
GET /api/mpesa/transactions
GET /api/mpesa/transactions/:phone
```

---

##  Example STK Push Request

```json
POST /api/mpesa/stkpush

Headers:
x-api-key: YOUR_API_KEY

Body:
{
  "phone": "2547XXXXXXXX",
  "amount": 100
}
```

---

##  Security Features

* API Key-based authentication
* Password hashing (bcrypt)
* User-specific data isolation
* Environment variable protection

---

## 📈 Future Improvements

*  Rate limiting (per API key)
*  API usage analytics dashboard
*  Subscription & billing system
*  Webhooks for external apps
* Frontend dashboard for users

---

##  Contributing

Pull requests are welcome. For major changes, open an issue first.

---

##  License

MIT License

---

##  Author

**Francis Omondi**
Node.js / React Developer
📍 Nairobi, Kenya

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
