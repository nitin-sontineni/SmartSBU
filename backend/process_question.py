import sys

def process_question(question):
    # Example: Replace this logic with your actual answer-generation logic
    answer = "This is your answer from python script"
    return answer

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No question provided.")
        sys.exit(1)
    question = sys.argv[1]
    answer = process_question(question)
    print(answer)
