# Investigation Dashboard

A React-based dashboard for analyzing and visualizing investigation data from Jotform submissions.

## Quick Start

### Prerequisites
- Node.js (v16+)
- npm

### Setup

1. **Navigate to the project directory:**
   ```bash
   cd investigation_dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Add your Jotform API keys to `.env`:**
   ```
   VITE_API_KEY1=your_api_key
   VITE_API_KEY2=your_api_key
   VITE_API_KEY3=your_api_key
   ```

5. **Update form IDs in `src/config/forms.js`** with your actual Jotform form IDs.

### Run Locally

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

Click "Load Investigation Data" to fetch and view your data.

### Build for Production

```bash
npm run build
```
