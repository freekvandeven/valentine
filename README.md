# 💕 Valentine's Day Website 💕

A fun, interactive Valentine's Day website built with Angular! Features a playful "Will you be my Valentine?" question with a mischievous No button that runs away from your cursor.

## ✨ Features

- **Runaway No Button**: The "No" button escapes when you try to click it!
- **Growing Yes Button**: Every time you chase the No button, the Yes button grows bigger
- **Confetti Celebration**: Beautiful confetti explosion when you click Yes!
- **Responsive Design**: Works great on mobile and desktop
- **Easy Customization**: Simply change the name in the environment file

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd valentine-angular
npm install
```

### 2. Customize Your Valentine's Name

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  valentineName: 'Your Special Person\'s Name',  // 👈 Change this!
  senderName: 'Your Name'  // 👈 And this!
};
```

**Important**: Also update `src/environments/environment.prod.ts` with the same values for production!

### 3. Run Locally

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

## 🌐 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

1. **Create a GitHub Repository**
   - Go to [github.com/new](https://github.com/new)
   - Create a new public repository (e.g., `valentine` or `my-valentine`)

2. **Push Your Code**
   ```bash
   git init
   git add .
   git commit -m "💕 Initial Valentine's commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository's **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The included workflow will automatically deploy on every push to `main`

4. **Access Your Site**
   - Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build with your repo name
npm run build -- --base-href "/YOUR_REPO_NAME/"

# The output will be in dist/valentine-app/browser/
```

## 📁 Project Structure

```
src/
├── app/
│   ├── valentine/
│   │   ├── valentine.component.ts    # Main component logic
│   │   ├── valentine.component.html  # Template
│   │   └── valentine.component.scss  # Styles
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/
│   ├── environment.ts                # Development config
│   └── environment.prod.ts           # Production config
├── index.html
└── styles.scss
```

## 🎨 Customization Ideas

### Change Colors
Edit `src/app/valentine/valentine.component.scss`:
```scss
$pink-light: #ffb6c1;
$pink: #ff69b4;
$pink-dark: #ff1493;
// ... modify to your preferred colors
```

### Add More Pages (Coming Soon!)
The app is set up with routing, making it easy to add more challenge pages:
- Puzzle challenges
- Love quizzes
- Memory games
- And more!

## 🛠️ Development

```bash
# Start dev server
npm start

# Build for production
npm run build:prod

# Run tests
npm test
```

## 💝 Made with Love

Send this to your special someone and watch them try (and fail) to click "No"! 

---

Happy Valentine's Day! 💕
