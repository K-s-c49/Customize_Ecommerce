"""Compatibility wrapper.

This project uses `ec/settings.py` as the real settings module.
Keeping this file avoids confusion if something imports `ec.ec.settings`.
"""

from ec.settings import *  # noqa: F403,F401
