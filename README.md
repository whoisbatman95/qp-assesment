# Grocery Booking API

This is a TypeScript Node.js application that provides an API for managing grocery items and bookings.

## Features

- Admin functionalities:
  - Add new grocery items
  - View existing grocery items
  - Remove grocery items
  - Update details of existing grocery items
  - Manage inventory levels of grocery items
- User functionalities:
  - View available grocery items
  - Book multiple grocery items in a single order

## Getting Started

### Prerequisites

- Node.js
- npm (Node.js package manager)
- SQLite (for local development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/whoisbatman95/qp-assesment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd qp-assessment
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Initialize the SQLite database and populate initial data:

   ```bash
   npm run init:db
   ```

### Running the Application

To run the application locally, execute the following command:

```bash
npm run build
```

followed by

```bash
npm run start
```

The application will be accessible at `http://localhost:3000`.

### API Endpoints

- Admin Endpoints:
  - `POST /api/admin/add-item`: Add a new grocery item (Requires authorization: '1234567890987654321')
  - `GET /api/admin/view-items`: View existing grocery items (Requires authorization: '1234567890987654321')
  - `DELETE /api/admin/remove-item/:id`: Remove a grocery item (Requires authorization: '1234567890987654321')
  - `PUT /api/admin/update-item/:id`: Update details of a grocery item (Requires authorization: '1234567890987654321')
  - `PUT /api/admin/manage-inventory/:id`: Manage inventory levels of a grocery item (Requires authorization: '1234567890987654321')
- User Endpoints:
  - `GET /api/user/view-available-items`: View available grocery items
  - `POST /api/user/book-items`: Book multiple grocery items in a single order



### Deployment

To deploy the application, you can containerize it using Docker and deploy the Docker image to your preferred hosting platform.

1. Build the Docker image:

   ```bash
   npm run docker-build
   ```

2. Run the Docker container:

   ```bash
   npm run docker-run
   ```

### Technologies Used

- Node.js
- Express.js
- TypeScript
- SQLite
- Docker (for containerization)

## Contributing

This project is just for my practice and currently not accepting any contributions.

## License

This project is licensed under the [MIT License](LICENSE).
