import cv2
import pytesseract
import numpy as np
import google.generativeai as genai
from my_secrets import image_path, gemini_api_key

# Configure the Gemini API
genai.configure(api_key=gemini_api_key)

receipt_reader = pytesseract.image_to_string(cv2.imread(image_path))

def get_receipt_total(): 
    try:
        # Create a Gemini model instance
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Prompt for extracting the total amount
        prompt = f"""
        Extract the total amount from this receipt text. The total might be labeled as 
        'Total', 'Grand Total', 'Amount Due', or similar. Return only the numerical value.

        Receipt text:
        {receipt_reader}
        """
        
        # Get the response from Gemini
        response = model.generate_content(prompt)
        
        # Convert the response to a float
        total = float(response.text.strip())
        return total
        
    except Exception as e:
        print(f"Please retake your image. {image_path} is unclear")
        return 0

print(get_receipt_total())