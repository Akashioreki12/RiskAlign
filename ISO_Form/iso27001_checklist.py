import json


def load_decision_tree(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)


def get_next_step(tree, answers):
    current_node = tree
    for answer in answers:
        if "responses" in current_node and answer in current_node["responses"]:
            current_node = current_node["responses"][answer]
        else:
            break
    return current_node



def ask_question(node):
    print("\n" + node["question"])
    options = list(node["responses"].keys())
    for idx, option in enumerate(options):
        print(f"{idx + 1}. {option}")

    choice = input("Choose an option (enter number): ")
    while not choice.isdigit() or int(choice) not in range(1, len(options) + 1):
        print("Invalid input. Please enter a valid number.")
        choice = input("Choose an option (enter number): ")

    return options[int(choice) - 1]


def main():
    decision_tree = load_decision_tree('decision_tree.json')

    answers = []
    current_node = decision_tree

    while "documents" not in current_node:
        answer = ask_question(current_node)
        answers.append(answer)
        current_node = get_next_step(decision_tree, answers)

    print("\nRequired Documents for ISO 27001 Compliance:")
    for doc in current_node["documents"]:
        print(f"- {doc}")


if __name__ == "__main__":
    main()
