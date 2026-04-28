#!/usr/bin/env python3
"""
Test script for SMTP email functionality
Run this to test if your email configuration is working
"""

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_email():
    """Test email sending functionality"""
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USERNAME = os.environ.get('EMAIL_USER', 'praveengoudru25@gmail.com')
    MAIL_PASSWORD = os.environ.get('EMAIL_PASS', 'vyie yryt zqbb phpv')
    
    if not MAIL_USERNAME or not MAIL_PASSWORD:
        print("❌ Error: EMAIL_USER and EMAIL_PASS must be set in .env file")
        return False
    
    try:
        # Create test message
        msg = MIMEMultipart()
        msg['From'] = MAIL_USERNAME
        msg['To'] = MAIL_USERNAME
        msg['Subject'] = "Portfolio Contact Form - Test Email"
        
        body = """
        This is a test email from your portfolio contact form.
        
        If you receive this email, your SMTP configuration is working correctly!
        
        Test Details:
        - Name: Test User
        - Email: test@example.com
        - Message: This is a test message
        
        ---
        Portfolio Contact Form Test
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to server and send email
        print("🔄 Connecting to Gmail SMTP server...")
        server = smtplib.SMTP(MAIL_SERVER, MAIL_PORT)
        server.starttls()
        
        print("🔄 Authenticating...")
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        
        print("🔄 Sending test email...")
        text = msg.as_string()
        server.sendmail(MAIL_USERNAME, MAIL_USERNAME, text)
        server.quit()
        
        print("✅ Test email sent successfully!")
        print(f"📧 Check your inbox at: {MAIL_USERNAME}")
        return True
        
    except Exception as e:
        print(f"❌ Error sending test email: {e}")
        print("\n🔧 Troubleshooting tips:")
        print("1. Make sure 2-Factor Authentication is enabled on your Gmail")
        print("2. Generate an App Password (not your regular password)")
        print("3. Check that EMAIL_USER and EMAIL_PASS are correct in .env")
        return False

if __name__ == "__main__":
    print("🧪 Testing Portfolio Email Functionality")
    print("=" * 40)
    test_email()
