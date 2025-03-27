# AI Insights Hub Blog

A modern, responsive blog focused on AI topics, built with Flask.

## Features

- Responsive design that works on desktop, tablet, and mobile
- Dynamic article pages with custom templates
- Tag-based article filtering
- Featured articles section
- Comment system
- Search functionality
- Newsletter subscription

## Project Structure

```
blog/
├── app.py                # Main Flask application
├── static/
│   ├── css/              # CSS stylesheets
│   ├── js/               # JavaScript files
│   └── images/           # Image assets
├── templates/
│   ├── articles/         # Custom article templates
│   ├── base.html         # Base template with common elements
│   ├── index.html        # Homepage template
│   ├── article.html      # Generic article template
│   ├── articles.html     # All articles listing template
│   ├── tag.html          # Tag filtering template
│   └── about.html        # About page template
└── articles/             # Markdown article content (optional)
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd blog
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the application:
   ```
   python run.py
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Adding New Articles

### Option 1: Custom HTML Template

1. Create a new HTML file in `blog/templates/articles/` with the article slug as the filename (e.g., `my-new-article.html`).
2. Extend the base template and add your content.
3. Add the article metadata to the `articles` list in `app.py`.

### Option 2: Markdown File

1. Create a new Markdown file in `blog/articles/` with the article slug as the filename (e.g., `my-new-article.md`).
2. Add the article metadata to the `articles` list in `app.py`.

## Customization

- Edit CSS files in `blog/static/css/` to customize the appearance
- Modify the base template in `blog/templates/base.html` to change the site structure
- Update JavaScript functionality in `blog/static/js/main.js`

## License

MIT 