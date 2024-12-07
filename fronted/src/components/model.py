from llama_cpp import Llama

# Path to your local LLaMA model file
MODEL_PATH = "/Users/monigayathrisayana/Documents/models/meta-llama-3.1-8b-instruct.Q2_K.gguf"

# Load the LLaMA model
llama = Llama(model_path=MODEL_PATH, n_ctx=1024)

def generate_response(prompt):
    """
    Generates a response from the local LLaMA model based on the user's query.
    """
    formatted_prompt = (
    f"You are a personalized learning assistant helping students understand {prompt}. "
    "Provide a clear and well-organized response. Use bullet points or numbered lists where necessary, "
    "and include examples, definitions, and practical applications to make the explanation comprehensive. "
    "Avoid using headings like 'Step 1' or 'Step 2.' Focus on providing a smooth, natural flow of information "
    "that is easy to read and engaging for students with varying skill levels. Conclude with a concise summary."
)

    
    # Generate response using the LLaMA model
    try:
        response = llama(
            prompt=formatted_prompt,
            max_tokens=2048,
            temperature=0.7  # Adjust temperature for creativity
        )
        return response["choices"][0]["text"].strip()
    except Exception as e:
        return f"An error occurred: {e}"

if _name_ == "_main_":
    # Take a query as input from the user
    user_query = "Explain NLP"
    if user_query:
        print("\nProcessing your query...\n")
        llama_response = generate_response(user_query)
        print("LLaMA Response:\n", llama_response)
    else:
        print("Please enter a valid query.")