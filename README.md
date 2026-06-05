# Courses Registration System

A full-stack web application for course registration built with Node.js, Express, and Stripe payment integration.

## Project Structure

```
├── server.js              # Main Express server with Stripe integration
├── package.json           # Node.js dependencies
├── .env                   # Environment variables (Stripe keys, etc.)
├── Dockerfile             # Docker configuration for deployment
├── README.md              # This file
└── client/                # Frontend static files
    ├── index.html         # Landing page with course cards
    ├── app.js             # Frontend navigation handler
    ├── success.html       # Payment success page
    ├── cancel.html        # Payment cancellation page
    ├── css/
    │   ├── style.css      # Global styles
    │   └── courses.css    # Course-specific styles
    ├── courses/
    │   ├── course1.html   # Web Development course page
    │   ├── course2.html   # Data Science course page
    │   └── course3.html   # UI/UX Design course page
    └── assets/            # Images and icons
```

## Features

- **Course Catalog**: Browse available courses with detailed information
- **Stripe Integration**: Secure payment processing for course registration
- **Responsive Design**: Mobile-friendly interface
- **Docker Support**: Easy deployment with containerization

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Stripe account (for payment processing)
- Docker (optional, for containerized deployment)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd courses-registration-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory with the following:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STATIC_DIR=./client
   PORT=3000
   COURSE1_PRICE_ID=price_xxx
   COURSE2_PRICE_ID=price_xxx
   COURSE3_PRICE_ID=price_xxx
   ```

4. **Set up Stripe Products and Prices**
   
   - Log in to your Stripe Dashboard
   - Create products for each course
   - Copy the Price IDs and update them in `.env`

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Docker Deployment

### Build the Docker Image

```bash
docker build -t courses-registration-system .
```

### Run the Container

```bash
docker run -p 3000:3000 --env-file .env courses-registration-system
```

## AWS EC2 Deployment

### 1. Launch an EC2 Instance

- Choose Amazon Linux 2 or Ubuntu
- Select t2.micro (or higher) instance type
- Configure security groups (see below)

### 2. Security Group Configuration

Open the following ports:
- **Port 22**: SSH access
- **Port 3000**: HTTP traffic (or use a reverse proxy with port 80/443)

### 3. Connect via SSH

```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

### 4. Install Dependencies on EC2

```bash
# Update system
sudo yum update -y  # For Amazon Linux
# OR
sudo apt update && sudo apt upgrade -y  # For Ubuntu

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs  # For Amazon Linux

# OR for Ubuntu:
# curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
# sudo apt-get install -y nodejs

# Install Git
sudo yum install -y git  # For Amazon Linux
# OR
sudo apt install -y git  # For Ubuntu

# Install Docker (optional)
sudo yum install -y docker  # For Amazon Linux
sudo service docker start
sudo usermod -aG docker ec2-user
```

### 5. Deploy the Application

```bash
# Clone your repository
git clone <repository-url>
cd courses-registration-system

# Install dependencies
npm install

# Create .env file with production values
nano .env

# Start the application
npm start

# Or use PM2 for process management
sudo npm install -g pm2
pm2 start server.js --name courses-app
pm2 startup
pm2 save
```

### 6. Set Up Reverse Proxy (Optional but Recommended)

Install Nginx:
```bash
sudo yum install -y nginx  # For Amazon Linux
# OR
sudo apt install -y nginx  # For Ubuntu
```

Configure Nginx (`/etc/nginx/conf.d/courses.conf`):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Start Nginx:
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Landing page |
| GET | `/courses/course1` | Web Development course page |
| GET | `/courses/course2` | Data Science course page |
| GET | `/courses/course3` | UI/UX Design course page |
| GET | `/success` | Payment success page |
| GET | `/cancel` | Payment cancellation page |
| POST | `/create-checkout-session/:pid` | Create Stripe checkout session |

## Customization

### Adding New Courses

1. Create a new HTML file in `client/courses/` (e.g., `course4.html`)
2. Add a route in `server.js`:
   ```javascript
   app.get('/courses/course4', (req, res) => {
       res.sendFile(path.join(STATIC_DIR, 'courses', 'course4.html'));
   });
   ```
3. Add the price ID to `.env`:
   ```env
   COURSE4_PRICE_ID=price_xxx
   ```
4. Update the course card in `index.html`

### Styling

Modify the CSS files in `client/css/` to customize the appearance:
- `style.css`: Global styles, header, footer, status pages
- `courses.css`: Course cards and detail pages

## Troubleshooting

### Stripe Payment Issues

- Ensure your Stripe keys are correct in `.env`
- Verify that the Price IDs exist in your Stripe dashboard
- Check that your Stripe account is in test mode (for development)

### Port Already in Use

If port 3000 is already in use, change the PORT in `.env`:
```env
PORT=3001
```

### Static Files Not Loading

Ensure the `STATIC_DIR` environment variable points to the correct directory:
```env
STATIC_DIR=./client
```

## License

MIT License - feel free to use this project for your needs.

## Support

For issues or questions, please open an issue in the repository or contact support.
