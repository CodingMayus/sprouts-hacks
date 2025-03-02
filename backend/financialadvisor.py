import google.generativeai as genai
import json
from my_secrets import gemini_api_key

# Configure the Gemini API
genai.configure(api_key=gemini_api_key)

def create_budget_from_profile(customer_profile: dict) -> dict:
    """
    Creates a budget based on customer profile information.
    
    Args:
        customer_profile (dict): Customer profile with financial information
        
    Returns:
        dict: Budget breakdown in JSON format
    """
    try:
        # Extract relevant information from customer profile
        annual_income = float(customer_profile.get("annual_income", 0))
        dependents = int(customer_profile.get("dependents", 0))
        city = customer_profile.get("city", "")
        province = customer_profile.get("province", "")
        
        # Calculate monthly income (after tax)
        tax_rate = float(customer_profile.get("tax_rate", 25)) / 100
        monthly_income = (annual_income * (1 - tax_rate)) / 12
        
        # Budget allocation based on location and dependents
        # Adjust percentages based on city cost of living
        high_cost_cities = ["Toronto", "Vancouver", "Victoria", "Calgary", "Ottawa"]
        
        if city in high_cost_cities:
            housing_percent = 0.35
        else:
            housing_percent = 0.30
            
        # Adjust food budget based on number of dependents
        base_food_percent = 0.15
        dependent_adjustment = 0.03 * dependents
        food_percent = min(base_food_percent + dependent_adjustment, 0.30)
        
        # Transportation budget
        transportation_percent = 0.15
        
        # Miscellaneous expenses
        misc_percent = 0.10
        
        # Calculate savings (remainder)
        savings_percent = 1 - (housing_percent + food_percent + transportation_percent + misc_percent)
        
        # Calculate actual amounts
        housing = round(monthly_income * housing_percent, 2)
        food = round(monthly_income * food_percent, 2)
        transportation = round(monthly_income * transportation_percent, 2)
        miscellaneous = round(monthly_income * misc_percent, 2)
        savings = round(monthly_income * savings_percent, 2)
        
        # Create detailed budget breakdown
        budget = {
            "monthly_income": round(monthly_income, 2),
            "housing": {
                "total": housing,
                "breakdown": {
                    "rent_mortgage": round(housing * 0.75, 2),
                    "utilities": round(housing * 0.15, 2),
                    "property_tax": round(housing * 0.10, 2)
                },
                "percentage": round(housing_percent * 100, 1)
            },
            "food": {
                "total": food,
                "breakdown": {
                    "groceries": round(food * 0.70, 2),
                    "restaurants": round(food * 0.30, 2)
                },
                "percentage": round(food_percent * 100, 1)
            },
            "transportation": {
                "total": transportation,
                "breakdown": {
                    "car_insurance": round(transportation * 0.40, 2),
                    "fuel": round(transportation * 0.40, 2),
                    "public_transit": round(transportation * 0.20, 2)
                },
                "percentage": round(transportation_percent * 100, 1)
            },
            "miscellaneous": {
                "total": miscellaneous,
                "breakdown": {
                    "entertainment": round(miscellaneous * 0.30, 2),
                    "clothing": round(miscellaneous * 0.20, 2),
                    "healthcare": round(miscellaneous * 0.20, 2),
                    "other": round(miscellaneous * 0.30, 2)
                },
                "percentage": round(misc_percent * 100, 1)
            },
            "savings": {
                "total": savings,
                "breakdown": {
                    "emergency_fund": round(savings * 0.30, 2),
                    "retirement": round(savings * 0.50, 2),
                    "other_goals": round(savings * 0.20, 2)
                },
                "percentage": round(savings_percent * 100, 1)
            },
            "total": round(monthly_income, 2)
        }
        
        return json.dumps(budget)
        
    except Exception as e:
        print(f"Error creating budget: {e}")
        return {
            "error": "Failed to create budget",
            "message": str(e)
        }

def parse_customer_json(json_string: str) -> dict:
    """
    Parses a JSON string containing customer profile information.
    
    Args:
        json_string (str): JSON string with customer profile data
        
    Returns:
        dict: Parsed customer profile dictionary
    """
    try:
        # Parse the JSON string into a dictionary
        customer_profile = json.loads(json_string)
        return customer_profile
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return {}
    
import google.generativeai as genai
import json
from my_secrets import gemini_api_key
from datetime import datetime, timedelta

# Configure the Gemini API
genai.configure(api_key=gemini_api_key)

def create_budget_from_profile(customer_profile: dict) -> dict:
    """
    Creates a budget based on customer profile information.
    
    Args:
        customer_profile (dict): Customer profile with financial information
        
    Returns:
        dict: Budget breakdown in JSON format
    """
    try:
        # Extract relevant information from customer profile
        annual_income = float(customer_profile.get("annual_income", 0))
        dependents = int(customer_profile.get("dependents", 0))
        city = customer_profile.get("city", "")
        province = customer_profile.get("province", "")
        
        # Calculate monthly income (after tax)
        tax_rate = float(customer_profile.get("tax_rate", 25)) / 100
        monthly_income = (annual_income * (1 - tax_rate)) / 12
        
        # Budget allocation based on location and dependents
        # Adjust percentages based on city cost of living
        high_cost_cities = ["Toronto", "Vancouver", "Victoria", "Calgary", "Ottawa"]
        
        if city in high_cost_cities:
            housing_percent = 0.35
        else:
            housing_percent = 0.30
            
        # Adjust food budget based on number of dependents
        base_food_percent = 0.15
        dependent_adjustment = 0.03 * dependents
        food_percent = min(base_food_percent + dependent_adjustment, 0.30)
        
        # Transportation budget
        transportation_percent = 0.15
        
        # Miscellaneous expenses
        misc_percent = 0.10
        
        # Calculate savings (remainder)
        savings_percent = 1 - (housing_percent + food_percent + transportation_percent + misc_percent)
        
        # Calculate actual amounts
        housing = round(monthly_income * housing_percent, 2)
        food = round(monthly_income * food_percent, 2)
        transportation = round(monthly_income * transportation_percent, 2)
        miscellaneous = round(monthly_income * misc_percent, 2)
        savings = round(monthly_income * savings_percent, 2)
        
        # Create detailed budget breakdown
        budget = {
            "monthly_income": round(monthly_income, 2),
            "housing": {
                "total": housing,
                "breakdown": {
                    "rent_mortgage": round(housing * 0.75, 2),
                    "utilities": round(housing * 0.15, 2),
                    "property_tax": round(housing * 0.10, 2)
                },
                "percentage": round(housing_percent * 100, 1)
            },
            "food": {
                "total": food,
                "breakdown": {
                    "groceries": round(food * 0.70, 2),
                    "restaurants": round(food * 0.30, 2)
                },
                "percentage": round(food_percent * 100, 1)
            },
            "transportation": {
                "total": transportation,
                "breakdown": {
                    "car_insurance": round(transportation * 0.40, 2),
                    "fuel": round(transportation * 0.40, 2),
                    "public_transit": round(transportation * 0.20, 2)
                },
                "percentage": round(transportation_percent * 100, 1)
            },
            "miscellaneous": {
                "total": miscellaneous,
                "breakdown": {
                    "entertainment": round(miscellaneous * 0.30, 2),
                    "clothing": round(miscellaneous * 0.20, 2),
                    "healthcare": round(miscellaneous * 0.20, 2),
                    "other": round(miscellaneous * 0.30, 2)
                },
                "percentage": round(misc_percent * 100, 1)
            },
            "savings": {
                "total": savings,
                "breakdown": {
                    "emergency_fund": round(savings * 0.30, 2),
                    "retirement": round(savings * 0.50, 2),
                    "other_goals": round(savings * 0.20, 2)
                },
                "percentage": round(savings_percent * 100, 1)
            },
            "total": round(monthly_income, 2)
        }
        
        return budget
        
    except Exception as e:
        print(f"Error creating budget: {e}")
        return {
            "error": "Failed to create budget",
            "message": str(e)
        }

def parse_customer_json(json_string: str) -> dict:
    """
    Parses a JSON string containing customer profile information.
    
    Args:
        json_string (str): JSON string with customer profile data
        
    Returns:
        dict: Parsed customer profile dictionary
    """
    try:
        # Parse the JSON string into a dictionary
        customer_profile = json.loads(json_string)
        return customer_profile
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return {}
    
def goal_setting(customer_profile: dict, budget: dict) -> dict:
    """
    Creates SMART financial goals based on customer profile and budget.
    
    SMART goals are:
    - Specific: Clear and well-defined
    - Measurable: Quantifiable to track progress
    - Achievable: Realistic given the customer's financial situation
    - Relevant: Aligned with the customer's needs and circumstances
    - Time-bound: Has a specific timeline for completion
    
    Args:
        customer_profile (dict): Customer profile information
        budget (dict): Customer's budget breakdown
        
    Returns:
        dict: A set of SMART financial goals
    """
    try:
        # If budget is a JSON string, parse it
        if isinstance(budget, str):
            budget = json.loads(budget)
            
        # Extract key information from profile and budget
        current_age = int(customer_profile.get("current_age", 30))
        retirement_age = float(customer_profile.get("retirement_age", 65))
        years_to_retirement = int(retirement_age - current_age)
        annual_income = float(customer_profile.get("annual_income", 0))
        current_savings = float(customer_profile.get("savings", 0))
        pension_plan = float(customer_profile.get("pension_plan", 0))
        dependents = int(customer_profile.get("dependents", 0))
        
        # Get monthly values from budget
        monthly_income = budget.get("monthly_income", annual_income / 12)
        monthly_savings = budget.get("savings", {}).get("total", monthly_income * 0.2)
        
        # Calculate current date and future dates for time-bound goals
        current_date = datetime.now()
        short_term_date = (current_date + timedelta(days=90)).strftime("%B %d, %Y")
        mid_term_date = (current_date + timedelta(days=365)).strftime("%B %d, %Y")
        long_term_date = (current_date + timedelta(days=365 * 5)).strftime("%B %d, %Y")
        
        # Calculate target emergency fund (6 months of expenses)
        monthly_expenses = budget.get("total", monthly_income)
        emergency_fund_target = monthly_expenses * 6
        current_emergency_fund = current_savings * 0.3  # Estimate 30% of savings is emergency fund
        emergency_fund_gap = max(0, emergency_fund_target - current_emergency_fund)
        
        # Calculate retirement savings needed
        # Using the 4% rule: need 25x annual expenses for retirement
        annual_expenses = monthly_expenses * 12
        retirement_target = annual_expenses * 25
        current_retirement_savings = current_savings * 0.5 + pension_plan  # Estimate 50% of savings is for retirement
        retirement_gap = max(0, retirement_target - current_retirement_savings)
        monthly_retirement_contribution = budget.get("savings", {}).get("breakdown", {}).get("retirement", monthly_savings * 0.5)
        
        # Create SMART goals
        goals = {
            "emergency_fund": {
                "goal": f"Build an emergency fund of ${emergency_fund_target:,.2f}",
                "specific": f"Save ${emergency_fund_gap:,.2f} to reach a total emergency fund of ${emergency_fund_target:,.2f}",
                "measurable": f"Track progress monthly, aiming to save ${round(emergency_fund_gap / 12, 2):,.2f} per month",
                "achievable": True if emergency_fund_gap / 12 <= monthly_savings * 0.3 else False,
                "relevant": "Provides financial security for unexpected expenses or income loss",
                "time_bound": f"Complete by {mid_term_date} (12 months)",
                "monthly_action": f"Set up automatic transfer of ${round(monthly_savings * 0.3, 2):,.2f} to emergency fund account"
            },
            "debt_reduction": {
                "goal": "Reduce high-interest debt by 50%",
                "specific": f"Pay down credit card and high-interest loans by ${round(budget.get('debt_payments', {}).get('total', 0) * 6, 2):,.2f}",
                "measurable": f"Track monthly debt reduction of ${round(budget.get('debt_payments', {}).get('total', 0) * 0.5, 2):,.2f}",
                "achievable": True,
                "relevant": "Reduces interest payments and improves credit score",
                "time_bound": f"Complete by {mid_term_date} (12 months)",
                "monthly_action": "Pay more than minimum payment on highest interest debt first"
            },
            "retirement_savings": {
                "goal": f"Save ${retirement_target:,.2f} for retirement",
                "specific": f"Contribute ${monthly_retirement_contribution:,.2f} monthly to retirement accounts",
                "measurable": f"Track progress quarterly, aiming for ${round(monthly_retirement_contribution * 3, 2):,.2f} per quarter",
                "achievable": True if monthly_retirement_contribution <= monthly_savings * 0.5 else False,
                "relevant": "Ensures financial security during retirement years",
                "time_bound": f"Ongoing until retirement at age {retirement_age} ({years_to_retirement} years)",
                "monthly_action": f"Maximize employer match in 401(k) and contribute ${round(monthly_retirement_contribution * 0.3, 2):,.2f} to Roth IRA"
            },
            "expense_reduction": {
                "goal": "Reduce monthly expenses by 10%",
                "specific": f"Cut ${round(monthly_expenses * 0.1, 2):,.2f} from monthly spending",
                "measurable": "Track spending in each budget category and identify areas to reduce",
                "achievable": True,
                "relevant": "Increases available funds for savings and debt reduction",
                "time_bound": f"Implement by {short_term_date} (3 months)",
                "monthly_action": "Review subscriptions, negotiate bills, and reduce dining out expenses"
            }
        }
        
        # Add dependent-specific goals if applicable
        if dependents > 0:
            education_fund_monthly = monthly_savings * 0.2
            education_fund_annual = education_fund_monthly * 12
            education_fund_target = education_fund_annual * 18 * dependents  # 18 years of education savings
            
            goals["education_fund"] = {
                "goal": f"Save for education expenses for {dependents} dependent(s)",
                "specific": f"Contribute ${education_fund_monthly:,.2f} monthly to education savings accounts",
                "measurable": f"Track balance growth quarterly, targeting ${round(education_fund_monthly * 3, 2):,.2f} per quarter",
                "achievable": True if education_fund_monthly <= monthly_savings * 0.2 else False,
                "relevant": "Provides for future education expenses of dependents",
                "time_bound": "Ongoing until dependents reach college age",
                "monthly_action": f"Set up automatic contributions to 529 plan or education savings account"
            }
        
        # Add housing goal if applicable (for renters or those wanting to upgrade)
        if budget.get("housing", {}).get("breakdown", {}).get("rent_mortgage", 0) > 0:
            housing_savings_monthly = monthly_savings * 0.2
            down_payment_target = annual_income * 0.8  # Target down payment of 80% of annual income
            down_payment_timeline = round(down_payment_target / (housing_savings_monthly * 12))
            
            goals["housing"] = {
                "goal": f"Save ${down_payment_target:,.2f} for home down payment or upgrade",
                "specific": f"Set aside ${housing_savings_monthly:,.2f} monthly for housing fund",
                "measurable": f"Track savings growth quarterly, targeting ${round(housing_savings_monthly * 3, 2):,.2f} per quarter",
                "achievable": True if housing_savings_monthly <= monthly_savings * 0.2 else False,
                "relevant": "Builds equity and potentially reduces housing costs long-term",
                "time_bound": f"Target completion in {down_payment_timeline} years",
                "monthly_action": "Set up dedicated high-yield savings account for housing fund"
            }
            
        return json.dumps(goals)
    
    except Exception as e:
        print(f"Error creating financial goals: {e}")
        return {
            "error": "Failed to generate financial goals",
            "message": str(e)
        }
    

json_string = """{"city": "Toronto", "province": "Ontario", "annual_income": "100000", "dependents": "2", 
"current_age": "30", "pension_plan": "100000", "savings": "10000", "tax_rate": 25.32, 
"inflation_rate": 2.87, "retirement_age": 64.0, "age_to_retirement": 34}"""

parsed_profile = parse_customer_json(json_string)
budget = create_budget_from_profile(parsed_profile)
goals = goal_setting(parsed_profile, budget)

