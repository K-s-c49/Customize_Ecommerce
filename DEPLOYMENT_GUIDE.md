# PythonAnywhere Deployment Guide for K2K E-Commerce

## Prerequisites
- PythonAnywhere account (username: khushalsingh)
- Repository: K-s-c49/Customize_Ecommerce

## Step-by-Step Deployment Instructions

### 1. Open PythonAnywhere Bash Console
Log in to PythonAnywhere and open a new Bash console.

### 2. Clone Your Repository
```bash
cd ~
git clone https://github.com/K-s-c49/Customize_Ecommerce.git
cd Customize_Ecommerce
```

### 3. Create Virtual Environment
```bash
mkvirtualenv ecommerce_env --python=python3.10
workon ecommerce_env
```

### 4. Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 5. Setup Database
```bash
cd ec
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser (Admin Account)
```bash
python manage.py createsuperuser
```
Follow the prompts to create your admin account.

### 7. Collect Static Files
```bash
python manage.py collectstatic --noinput
```

### 8. Configure Web App on PythonAnywhere

#### A. Go to Web Tab
- Click on "Web" in the PythonAnywhere dashboard
- Click "Add a new web app"
- Choose "Manual configuration"
- Select Python 3.10

#### B. Configure Virtual Environment
In the "Virtualenv" section:
```
/home/khushalsingh/.virtualenvs/ecommerce_env
```

#### C. Configure WSGI File
- Click on the WSGI configuration file link
- Delete all existing content
- Copy and paste the content from `pythonanywhere_wsgi.py` in your repository

OR manually enter:
```python
import os
import sys

path = '/home/khushalsingh/Customize_Ecommerce/ec'
if path not in sys.path:
    sys.path.insert(0, path)

parent_path = '/home/khushalsingh/Customize_Ecommerce'
if parent_path not in sys.path:
    sys.path.insert(0, parent_path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'ec.settings'

activate_this = '/home/khushalsingh/.virtualenvs/ecommerce_env/bin/activate_this.py'
exec(open(activate_this).read(), {'__file__': activate_this})

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

#### D. Configure Static Files
In the "Static files" section, add these mappings:

| URL | Directory |
|-----|-----------|
| `/static/` | `/home/khushalsingh/Customize_Ecommerce/ec/staticfiles` |
| `/media/` | `/home/khushalsingh/Customize_Ecommerce/ec/media` |

### 9. Create Media Directory
```bash
cd ~/Customize_Ecommerce/ec
mkdir -p media
```

### 10. Set Environment Variables (Optional but Recommended)

Create a `.env` file or set in WSGI config:
```bash
# In your WSGI file, add before get_wsgi_application():
os.environ['DJANGO_SECRET_KEY'] = 'your-secret-key-here'
os.environ['RAZOR_KEY_ID'] = 'your-razorpay-key-id'
os.environ['RAZOR_KEY_SECRET'] = 'your-razorpay-key-secret'
```

### 11. Reload Web App
- Go back to the Web tab
- Click the green "Reload" button

### 12. Access Your Site
Visit: https://khushalsingh.pythonanywhere.com

### 13. Access Admin Panel
Visit: https://khushalsingh.pythonanywhere.com/admin
Login with the superuser credentials you created.

## Troubleshooting

### Error: "ImportError: No module named 'ec'"
- Check that both paths are in sys.path in WSGI file
- Verify directory structure matches

### Static Files Not Loading
- Run `python manage.py collectstatic` again
- Check static file mappings in Web tab
- Reload web app

### Database Issues
- Ensure migrations are run: `python manage.py migrate`
- Check database file permissions

### Error Logs
View error logs in PythonAnywhere:
- Web tab → Log files → Error log

## Updating Your Site

When you make changes:
```bash
cd ~/Customize_Ecommerce
git pull origin master
workon ecommerce_env
cd ec
python manage.py migrate
python manage.py collectstatic --noinput
```
Then reload your web app from the Web tab.

## Important Notes

1. **DEBUG Mode**: Currently set to `False` in settings.py (production-ready)
2. **Database**: Using SQLite (included)
3. **Static Files**: Managed by WhiteNoise
4. **Payment Gateway**: Razorpay configured (update keys in production)
5. **ALLOWED_HOSTS**: Already configured for khushalsingh.pythonanywhere.com
6. **CSRF_TRUSTED_ORIGINS**: Already configured

## Production Checklist

- [x] DEBUG = False
- [x] ALLOWED_HOSTS configured
- [x] CSRF_TRUSTED_ORIGINS configured
- [x] Static files configured with WhiteNoise
- [ ] Change SECRET_KEY (recommended)
- [ ] Update Razorpay keys for production
- [ ] Set up proper email backend (currently console)
- [ ] Create superuser account
- [ ] Test all functionality

## Support

For issues, check:
1. PythonAnywhere error logs
2. Django documentation: https://docs.djangoproject.com/
3. PythonAnywhere forums: https://www.pythonanywhere.com/forums/

Your site should now be live at: **https://khushalsingh.pythonanywhere.com** 🚀
