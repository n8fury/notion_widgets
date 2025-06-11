# 🎯 Widgetyy

<div align="center">

[Widgetyy Header](./public/assets//readme/Header.JPG)

**Beautiful, customizable widgets for your digital workspace**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Made with Vibe Coding](https://img.shields.io/badge/Made%20with-Vibe%20Coding-ff69b4?style=flat-square&logo=sparkles)](https://github.com/n8fury/widgetyy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[🚀 Live Demo](https://widgetyy.vercel.app) • [🐛 Report Bug](https://github.com/n8fury/widgetyy/issues) • [✨ Request Feature](https://github.com/n8fury/widgetyy/issues)

</div>

---

## 🌟 Why Widgetyy?

After countless hours searching for the perfect widgets for Notion, productivity apps, and dashboards, I realized the solution didn't exist. So I built it. **Widgetyy** is a collection of beautiful, functional widgets designed to enhance your digital workspace with meaningful visual feedback.

> 💡 **Philosophy**: Time is our most valuable resource. These widgets help you visualize it, track it, and make the most of it.

## ✨ Features

### 🎨 **Modern Design**

- Clean, minimalist aesthetic
- Responsive design that works everywhere
- Beautiful diamond-shaped progress indicators
- Dark/light theme support

### ⚡ **Performance First**

- Built with Next.js 15 and React 19
- Real-time updates without page refresh
- Optimized for embedding in any platform
- Lightning-fast load times

### 🔧 **Highly Customizable**

- URL-based configuration
- No complex setup required
- Easy to embed anywhere
- Extensible architecture

### 📱 **Universal Compatibility**

- Works in Notion, Obsidian, Roam Research
- Perfect for dashboards and productivity apps
- Responsive across all devices
- Clean embed URLs

## 🧩 Widget Collection

### 📅 **Progress Trackers**

Visual representations of time passing - because awareness drives action.

| Widget | Description | Best For |
|--------|-------------|----------|
| **Daily Tracker** | Real-time progress through your current day | Daily focus & time awareness |
| **Monthly Tracker** | Month completion with days elapsed | Monthly goals & planning |
| **Yearly Tracker** | Annual progress with days and weeks | Long-term goal tracking |

### ⏰ **Deadline Tracker**

Never miss important dates again with beautiful, intelligent countdown displays.

**Features:**

- 🎯 Custom deadline setting with date & time
- 📊 Smart template selection (day/month/year view)
- ⏱️ Real-time countdown updates
- 🔗 Shareable URLs with embedded settings
- 📱 Interactive date/time picker
- 🎨 Context-aware progress visualization

## 🚀 Quick Start

### 1. **Embed Directly** (Recommended)

```html
<!-- Daily Progress -->
<iframe src="https://widgetyy.vercel.app/day_tracker" width="400" height="300"></iframe>

<!-- Custom Deadline -->
<iframe src="https://widgetyy.vercel.app/deadline_tracker?title=Project%20Launch&date=2025-12-31&time=23:59" width="400" height="300"></iframe>
```

### 2. **Run Locally**

```bash
# Clone the repository
git clone https://github.com/n8fury/widgetyy.git
cd widgetyy

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `https://widgetyy.vercel.app` to see all available widgets.

### 3. **Deploy Your Own**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/n8fury/widgetyy)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/n8fury/widgetyy)

## 📖 Usage Examples

### Notion Integration

```
/embed https://widgetyy.vercel.app/deadline_tracker?title=Exam%20Date&date=2025-07-15&time=09:00
```

### Dashboard HTML

```html
<div class="widget-grid">
  <iframe src="https://widgetyy.vercel.app/day_tracker" title="Daily Progress"></iframe>
  <iframe src="https://widgetyy.vercel.app/month_tracker" title="Monthly Progress"></iframe>
  <iframe src="https://widgetyy.vercel.app/year_tracker" title="Yearly Progress"></iframe>
</div>
```

### Custom Deadline Configuration

```
Base URL: https://widgetyy.vercel.app/deadline_tracker

Parameters:
- title: Your deadline name (URL encoded)
- date: YYYY-MM-DD format
- time: HH:MM format (24-hour)

Example:
?title=Product%20Launch&date=2025-08-15&time=14:30
```

## 🛠️ Development

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19 with Hooks
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready

### Project Structure

```
widgetyy/
├── app/                    # Next.js app directory
│   ├── day_tracker/       # Daily progress widget
│   ├── month_tracker/     # Monthly progress widget
│   ├── year_tracker/      # Yearly progress widget
│   └── deadline_tracker/  # Deadline countdown widget
├── components/            # Reusable React components
│   ├── DailyProgressTracker.jsx
│   ├── MonthlyProgressTracker.jsx
│   ├── YearlyProgressTracker.jsx
│   ├── DeadlineProgressTracker.jsx
│   └── ModernHomePage.jsx
└── public/assets/         # SVG icons and assets
```

### Adding New Widgets

1. **Create the component** in `/components/`

```jsx
const MyNewWidget = () => {
  // Your widget logic here
  return <div>My Amazing Widget</div>;
};

export default MyNewWidget;
```

2. **Add the route** in `/app/my_new_widget/page.js`

```jsx
import MyNewWidget from '@/components/MyNewWidget';

export default function MyNewWidgetPage() {
  return <MyNewWidget />;
}
```

3. **Update the homepage** in `/components/ModernHomePage.jsx`

## 🤝 Contributing

We love contributions! Here's how you can help make Widgetyy even better:

### 🐛 **Bug Reports**

Found something broken? [Open an issue](https://github.com/n8fury/widgetyy/issues) with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### ✨ **Feature Requests**

Have an idea for a new widget? [Start a discussion](https://github.com/n8fury/widgetyy/discussions) or [open an issue](https://github.com/n8fury/widgetyy/issues) with:

- Description of the widget concept
- Use cases and benefits
- Any design ideas or mockups

### 🔧 **Code Contributions**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-widget`)
3. Make your changes
4. Add tests if applicable
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

<!-- ## 🚀 Upcoming Widgets & Roadmap

<div align="center">

**Help us prioritize! Vote for the widgets you want most by reacting to our [Roadmap Discussion](https://github.com/yourusername/widgetyy/discussions) or [opening an issue](https://github.com/yourusername/widgetyy/issues/new?template=widget-request.md&title=[WIDGET]%20Your%20Widget%20Name)**

</div>

### 🎯 **Productivity & Goals**

| Widget | Description | Difficulty | Community Interest |
|--------|-------------|------------|-------------------|
| **🎯 Goal Progress Tracker** | Visual progress bars for personal/professional goals with milestones | `Medium` | ⭐⭐⭐⭐⭐ |
| **📊 KPI Dashboard** | Track key metrics with customizable targets and trends | `Hard` | ⭐⭐⭐⭐ |
| **📝 Task Completion Rate** | Daily/weekly task completion visualization | `Easy` | ⭐⭐⭐⭐⭐ |

### 🏃‍♂️ **Health & Wellness**

| Widget | Description | Difficulty | Community Interest |
|--------|-------------|------------|-------------------|
| **📈 Habit Tracker** | Streak tracking with beautiful calendar heatmaps | `Medium` | ⭐⭐⭐⭐⭐ |
| **🌙 Sleep Schedule** | Sleep quality tracking with circadian rhythm insights | `Hard` | ⭐⭐⭐⭐ |
| **💧 Water Intake Tracker** | Daily hydration goals with animated progress | `Easy` | ⭐⭐⭐ |
| **🏃‍♂️ Fitness Milestones** | Workout progress, PR tracking, and achievement badges | `Medium` | ⭐⭐⭐⭐ |

### 💰 **Finance & Learning**

| Widget | Description | Difficulty | Community Interest |
|--------|-------------|------------|-------------------|
| **💰 Budget Progress** | Monthly spending vs budget with category breakdowns | `Hard` | ⭐⭐⭐⭐ |
| **📚 Reading Progress** | Book tracking with pages read and reading streaks | `Medium` | ⭐⭐⭐⭐⭐ |
| **🎓 Learning Streaks** | Course progress, study hours, and skill development | `Medium` | ⭐⭐⭐⭐ |

### 🌱 **Work & Projects**

| Widget | Description | Difficulty | Community Interest |
|--------|-------------|------------|-------------------|
| **🌱 Project Milestones** | Gantt-style progress tracking for project phases | `Hard` | ⭐⭐⭐⭐⭐ |
| **⚡ Focus Time Tracker** | Pomodoro-style focus sessions with analytics | `Medium` | ⭐⭐⭐⭐ |
| **📈 GitHub Contribution** | Live GitHub activity with commit streaks | `Medium` | ⭐⭐⭐ |

--- -->

### 🗳️ **Have Your Say!**

<div align="center">

**🎨 Want to suggest a widget?** [Open a feature request](https://github.com/yourusername/widgetyy/issues/new?template=widget-request.md&title=[WIDGET]%20Your%20Widget%20Name)

**👨‍💻 Ready to build one?** Check our [Contributing Guide](#-contributing) and [Developer Setup](#️-development)

**💡 Have a unique idea?** Join the discussion in our [Community Discord](https://discord.gg/yourlink) *(optional - remove if no Discord)*

</div>

---

### 🏆 **Widget Request Template**

When suggesting a new widget, help us understand:

```markdown
**Widget Name**: Amazing Progress Tracker
**Category**: Productivity / Health / Finance / Other
**Description**: What does it track and visualize?
**Use Case**: Who would use this and why?
**Data Source**: Where does the data come from?
**Complexity**: How complex do you think this would be?
**Mockup/Design**: Any visual ideas? (optional)

```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inspiration**: The productivity community's need for better visual tools
- **Design**: Influenced by modern minimalist design principles
- **Community**: Thanks to everyone who will contribute to making this better

## 🌟 Show Your Support

If Widgetyy helps improve your productivity:

- ⭐ **Star this repository**
- 🐦 **Share on Twitter** with `#Widgetyy`
- 📝 **Write a blog post** about how you use it
- 🤝 **Contribute** a new widget or improvement

<div align="center">

**Built with ❤️ for the productivity community**

</div>
