# Candy Forge - Complete Documentation

## Table of Contents

1. Overview
2. Webapp Features
3. Admin Panel Features
4. Admin Instructions
5. Wallet Functionality
6. Payment System
7. Firebase Configuration
8. Deployment Information

---

## 1. Overview

Candy Forge is a Telegram-based Web3 gaming and rewards platform where users earn CANDY tokens through various activities including daily rewards, tasks, referrals, and mini-games. The platform consists of two main components:

- Frontend Webapp: User-facing application accessible via Telegram
- Admin Panel: Administrative dashboard for managing users, payments, and platform settings

---

## 2. Webapp Features

### 2.1 User Authentication
- Automatic Telegram user authentication
- User profiles stored in Firebase Firestore
- Unique ODL ID assigned to each user

### 2.2 Home Page (Tap Section)
- Main tap interaction area
- Daily reward button with countdown timer
- CANDY balance display
- League/rank indicator
- Quick navigation to other sections

### 2.3 Daily Rewards
- Daily login bonus system
- Progressive reward scaling
- 24-hour cooldown between claims
- Automatic reset if daily streak is broken

### 2.4 Tasks System
- Social media follow tasks (Telegram, Twitter, YouTube, Instagram, TikTok, Discord)
- Website visit task
- TON wallet connection task (3000 CANDY reward)
- Friend invitation tasks with tiered rewards
  - Invite 1 friend: 1,000 CANDY
  - Invite 3 friends: 3,000 CANDY
  - Invite 5 friends: 5,000 CANDY
  - Invite 10 friends: 10,000 CANDY
  - Invite 20 friends: 30,000 CANDY
  - Invite 50 friends: 70,000 CANDY

### 2.5 Leaderboard
- Displays top 50 users by CANDY balance
- Shows current user position if not in top 50
- Real-time updates from Firebase

### 2.6 Friends/Referral System
- Unique referral link per user
- Referral bonus: 1,000 CANDY per successful invite
- Friend list display with usernames
- Invitation count tracking

### 2.7 Airdrop/Wallet Page
- TON wallet connection via TON Connect
- Wallet address display and copy functionality
- CANDY to payable amount conversion display (CANDY divided by 10)
- Payment request submission
- Payment request history with status tracking
- 3-day cooldown between payment requests

### 2.8 Mini-Game (Candy Forge Game)
- Match-3 puzzle game
- Earn CANDY based on game score
- Embedded game with full-screen mode
- Score automatically added to user balance

### 2.9 Shop/Booster System
- Mining speed boosters
- Energy boosters
- Special items purchasable with CANDY

### 2.10 League System
- 11 progression tiers:
  1. Wood
  2. Bronze
  3. Silver
  4. Gold
  5. Platinum
  6. Diamond
  7. Master
  8. Grandmaster
  9. Legendary
  10. Mythic
  11. Elite
- League progression based on CANDY balance

---

## 3. Admin Panel Features

### 3.1 Dashboard
- Total users count
- Active users in last 24 hours
- Pending payment requests count
- Total CANDY distributed
- Quick access to all management sections

### 3.2 User Management
- View all registered users
- Search users by username, ODL ID, or Telegram ID
- View user details:
  - Username
  - ODL ID
  - Telegram ID
  - CANDY balance
  - Wallet address
  - Registration date
  - Last active time
- Edit user CANDY balance
- View user referrals

### 3.3 Payment Management
- View all payment requests
- Filter by status: Pending, Paid, Rejected, All
- Search by username or wallet address
- Payment request details:
  - User information
  - CANDY amount requested
  - Payable amount (CANDY divided by 10)
  - Wallet address
  - Request date
  - Status
- Mark payment as Paid (after manual transfer)
- Reject payment (refunds CANDY to user)

### 3.4 Task Management
- View task completion statistics
- Monitor task engagement rates

### 3.5 Settings
- Platform configuration options
- Admin account management

---

## 4. Admin Instructions

### 4.1 Accessing the Admin Panel
1. Navigate to the admin panel URL
2. Enter login credentials
   - Email: admin@candyforge.com
   - Password: admin12345#candy
3. Click Login

### 4.2 Managing Users
1. Click on "Users" in the sidebar
2. Use the search bar to find specific users
3. Click on a user row to view details
4. To edit CANDY balance:
   - Click the edit icon next to the balance
   - Enter new balance value
   - Confirm the change

### 4.3 Processing Payment Requests
1. Navigate to "Payments" section
2. Default view shows pending requests
3. For each pending request:
   - Review the request details
   - Copy the wallet address
   - Send payment to the wallet manually (external to the app)
   - Return to admin panel
   - Click "Paid" button
   - Confirm the action
4. To reject a payment:
   - Click "Reject" button
   - Confirm the action
   - CANDY will be automatically refunded to the user

### 4.4 Monitoring Platform Activity
1. Dashboard shows key metrics
2. Check "Active Users" for daily engagement
3. Monitor "Pending Payments" for action items
4. Review "Total CANDY Distributed" for token economics

### 4.5 Mobile Access
- Admin panel is fully responsive
- Use hamburger menu on mobile devices
- All features accessible on mobile

---

## 5. Wallet Functionality

### 5.1 TON Connect Integration
- Users connect TON wallets via TON Connect UI
- Supported wallets: Tonkeeper, OpenMask, MyTonWallet, and others
- Wallet connection rewards user with 3000 CANDY (one-time task)

### 5.2 Wallet Address Storage
- Connected wallet address automatically saved to Firebase
- Address displayed in Airdrop page
- Address used for payment processing

### 5.3 Wallet Features in Webapp
- Connect wallet button
- Disconnect wallet option
- Copy wallet address
- View connected wallet status

### 5.4 Wallet Requirements for Payment
- Wallet must be connected before requesting payment
- Wallet address is mandatory for payment processing
- Users can update wallet by disconnecting and reconnecting

---

## 6. Payment System

### 6.1 Payment Request Flow (User Side)
1. User navigates to Airdrop page
2. User connects TON wallet (if not already connected)
3. User views available CANDY balance
4. User sees payable amount (CANDY divided by 10)
5. User clicks "Request Payment"
6. User enters desired CANDY amount to withdraw
7. System validates:
   - Minimum amount requirement
   - Sufficient balance
   - 3-day cooldown from last request
8. Request submitted and CANDY deducted from balance
9. User can track request status in history

### 6.2 Payment Processing Flow (Admin Side)
1. Admin logs into admin panel
2. Navigate to Payments section
3. View pending payment requests
4. For each request:
   - Note the wallet address
   - Note the payable amount
   - Perform manual transfer to wallet address
   - Return to admin panel
   - Mark request as "Paid"
5. Alternatively, reject request if invalid (refunds CANDY)

### 6.3 Payment Statuses
- Pending: Request submitted, awaiting admin action
- Paid: Admin confirmed payment sent
- Rejected: Admin rejected request, CANDY refunded

### 6.4 Payment Cooldown
- Users can submit one payment request every 3 days
- Cooldown timer displayed in UI
- Cooldown resets after request is processed (paid or rejected)

### 6.5 Payment Conversion Rate
- Payable Amount = CANDY Balance divided by 10
- Example: 10,000 CANDY = 1,000 payable units

---

## 7. Firebase Configuration

### 7.1 Firestore Collections

#### users
- Document ID: ODL ID
- Fields:
  - odl_id: string
  - odl_id_numeric: number
  - username: string
  - first_name: string
  - last_name: string
  - telegram_id: number
  - points: number
  - walletAddress: string
  - referredBy: string
  - createdAt: timestamp
  - updatedAt: timestamp
  - lastActiveAt: timestamp
  - completedTasks: map
  - claimedAchievements: map
  - lastDailyRewardClaim: timestamp
  - dailyRewardStreak: number
  - energy: number
  - miningRate: number

#### transactions
- Document ID: auto-generated
- Fields:
  - odl_id: string
  - type: earn, spend, reward, task, referral, game, withdrawal
  - amount: number
  - description: string
  - status: pending, completed, failed
  - createdAt: timestamp

#### paymentRequests
- Document ID: auto-generated
- Fields:
  - odl_id: string
  - username: string
  - walletAddress: string
  - requestedAmount: number
  - payableAmount: number
  - status: pending, paid, rejected
  - createdAt: timestamp
  - processedAt: timestamp
  - processedBy: string

#### invitations
- Document ID: auto-generated
- Fields:
  - odl_id: string (referrer)
  - invited_odl_id: string (invitee)
  - createdAt: timestamp

### 7.2 Firebase Security Rules
- Users can only read/write their own data
- Admin access requires authentication
- Payment requests require valid user session

---

## 8. Deployment Information

### 8.1 Repositories
- Frontend Webapp: Candyforgeee.git
- Admin Panel: Candyforge.git

### 8.2 Hosting
- Both applications hosted on Netlify
- Automatic deployments on push to main branch

### 8.3 Build Configuration

#### Frontend Webapp
- Build Command: yarn config set ignore-engines true && yarn install && npm run build
- Publish Directory: dist
- Node Version: 20.11.0

#### Admin Panel
- Build Command: yarn config set ignore-engines true && yarn install && npm run build
- Publish Directory: dist
- Node Version: 20.11.0

### 8.4 Environment Variables
- Firebase configuration stored in source code
- No additional environment variables required for basic deployment

### 8.5 Domain Configuration
- Configure custom domains in Netlify settings
- SSL certificates automatically provisioned

---

## Quick Reference

### Admin Login
- URL: [Admin Panel URL]
- Email: admin@candyforge.com
- Password: admin12345#candy

### Key Actions Checklist
1. Check pending payments daily
2. Process payments within 24-48 hours
3. Monitor user activity for anomalies
4. Review task completion rates weekly

### Support Contacts
- Technical issues: Check Firebase console for errors
- User complaints: Review user profile in admin panel
- Payment disputes: Check transaction and payment request history

---

Document Version: 1.0
Last Updated: February 2026
