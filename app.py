from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', '34658454b0712710dc3e84e6bcdf7c5b80103c7bdae3c710f7ebd6eeb16ebcf3')

# Email configuration
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 587
MAIL_USERNAME = os.environ.get('EMAIL_USER', 'captaing250000@gmail.com')
MAIL_PASSWORD = os.environ.get('EMAIL_PASS', 'okmv lpsg xmld ywlt')
MAIL_USE_TLS = True

def send_email(name, email, phone, message):
    """Send email using SMTP"""
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = MAIL_USERNAME
        msg['To'] = MAIL_USERNAME  # Send to yourself
        msg['Subject'] = f"New Message from Portfolio Contact Form - {name}"
        
        # Email body
        body = f"""
        New message received from your portfolio contact form:
        
        Name: {name}
        Email: {email}
        Phone: {phone if phone else 'Not provided'}
        
        Message:
        {message}
        
        ---
        This message was sent from your portfolio website.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to server and send email
        server = smtplib.SMTP(MAIL_SERVER, MAIL_PORT)
        server.starttls()
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(MAIL_USERNAME, MAIL_USERNAME, text)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

@app.route('/')
def index():
    """Render the main portfolio page"""
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submission"""
    try:
        # Get form data
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()
        message = request.form.get('message', '').strip()
        
        # Validate required fields
        if not name or not email or not message:
            return jsonify({
                'success': False,
                'message': 'Please fill in all required fields (Name, Email, Message).'
            })
        
        # Validate email format
        if '@' not in email or '.' not in email.split('@')[1]:
            return jsonify({
                'success': False,
                'message': 'Please enter a valid email address.'
            })
        
        # Send email
        if send_email(name, email, phone, message):
            return jsonify({
                'success': True,
                'message': 'Message sent successfully ✅'
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Message failed to send ❌ Please try again.'
            })
            
    except Exception as e:
        print(f"Error in contact route: {e}")
        return jsonify({
            'success': False,
            'message': 'An error occurred. Please try again later.'
        })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
