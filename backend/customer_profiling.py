import google.generativeai as genai
from my_secrets import gemini_api_key
from flask import jsonify
import json

# Configure the Gemini API
genai.configure(api_key=gemini_api_key)

# list of items: 
'''
what city
what province 
what is your annual income 
how many dependents do you have 
what is your current age
what is your estimated amount in your pension plan
what is your estimated amount in savings (all savings excluding pension)
'''
def get_customer_profile(client_list: list) -> dict:
    try:
        list_of_items = ['city', 'province', 'annual_income', 'dependents', 'current_age', 'pension_plan', 'savings', 'tax_rate', 'inflation_rate', 'retirement_age', 'age_to_retirement']
        # Create a Gemini model instance
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Prompt for extracting the tax rate of the area    
        prompt = f"""
        what is the average tax rate for {client_list[0]} in {client_list[1]} Canada with an annual income of {client_list[2]}

        Return only the percentage value.
        """
        # Get the response from Gemini
        response = model.generate_content(prompt)
        # Convert the response to a float
        client_list.append(float(response.text.strip()))
        
        # Gets the average inflation in Canada
        prompt = f"""
        What is the average inflation rate of Canada for the past 5 years. 

        Return only the percentage value. Do not include the percent sign
        """
        response = model.generate_content(prompt)
        # Convert the response to a float
        client_list.append(float(response.text.strip()))

        # Average retirement age in Canada
        prompt = f'''What is the average retirement age in Canada, answer in only 1 whole number'''
        response = model.generate_content(prompt)

        # Convert the response to a float
        client_list.append(float(response.text.strip()))
        
        client_list.append(int(client_list[9]) - int(client_list[4]))               

        my_dict = dict(zip(list_of_items, client_list))

        return json.dumps(my_dict)
    

    except: 
        print("Please provide valid information")
        print(client_list)
        print(response.text.strip())
        return []

print(get_customer_profile(['Toronto', 'Ontario', '100000', '2', '30', '100000', '10000']))           