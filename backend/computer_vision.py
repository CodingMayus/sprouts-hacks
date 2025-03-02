import cv2
import pytesseract
import numpy as np
import google.generativeai as genai
from my_secrets import image_path, gemini_api_key
import json


def get_receipt_total(): 
    try:

        to_return = {
            "category": "", 
            "total": 0
        }
        # Configure the Gemini API
        genai.configure(api_key=gemini_api_key)

        receipt_reader = pytesseract.image_to_string(cv2.imread(image_path))

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
        to_return["total"] = float(response.text.strip())

        prompt = f"""
        Characterize this receipt. What is the category of this receipt? Here are the sample categories:
        - Grocery
        - Restaurant
        - Clothing
        - Electronics
        - Other

        You can only pick one of these categories from the ones provided, only provide one string. 
        Receipt text:
        {receipt_reader}
        """

        # Get the response from Gemini
        response = model.generate_content(prompt)

        to_return["category"] = response.text.strip()

        return json.dumps(to_return)
        
    except Exception as e:
        print(f"Please retake your image. {image_path} is unclear")
        return 0
