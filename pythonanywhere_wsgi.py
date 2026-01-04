# +++++++++++ DJANGO +++++++++++
# To use your own Django app use code like this:
import os
import sys

# Add your project directory to the sys.path
path = '/home/khushalsingh/Customize_Ecommerce/ec'
if path not in sys.path:
    sys.path.insert(0, path)

# Add the parent directory to find the 'ec' package
parent_path = '/home/khushalsingh/Customize_Ecommerce'
if parent_path not in sys.path:
    sys.path.insert(0, parent_path)

# Set environment variable to tell Django where your settings module is
os.environ['DJANGO_SETTINGS_MODULE'] = 'ec.settings'

# Activate your virtual environment
activate_this = '/home/khushalsingh/.virtualenvs/ecommerce_env/bin/activate_this.py'
exec(open(activate_this).read(), {'__file__': activate_this})

# Import Django's WSGI handler
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
