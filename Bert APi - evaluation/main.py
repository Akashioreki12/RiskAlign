import os
import spacy
import json
import torch
from flask import Flask, request, jsonify
from transformers import BertForSequenceClassification, BertTokenizer
from pdfminer.high_level import extract_text
from pdf2image import convert_from_path
from PIL import Image
import pytesseract
from datasets import Dataset

# Load the spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    import spacy.cli
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# Load BERT model and tokenizer
bert_model_name = "bert-base-uncased"  # Pre-trained model
model = BertForSequenceClassification.from_pretrained(bert_model_name, num_labels=6)
tokenizer = BertTokenizer.from_pretrained(bert_model_name)

# ISO 27001 categories and labels
iso_labels = {
    "A.5.1": 0,  # Information security policies
    "A.6.1": 1,  # Organization of information security
    "A.9.1": 2,  # Access control
    "A.12.1": 3,  # Operational security
    "A.13.1": 4,  # Communications security
    "A.18.1": 5,  # Compliance with legal and contractual requirements
}
label_to_control = {v: k for k, v in iso_labels.items()}

# Create the uploads directory if it doesn't exist
if not os.path.exists("uploads"):
    os.makedirs("uploads")

# Function to extract text from PDF
def extract_text_from_pdf(file_path):
    try:
        text = extract_text(file_path)
        if not text.strip():
            raise ValueError("No readable text found in the PDF using pdfminer.")
        return text
    except Exception as e:
        try:
            images = convert_from_path(file_path, poppler_path='/usr/bin')
            text = ""
            for image in images:
                text += pytesseract.image_to_string(image)
            if not text.strip():
                raise ValueError("No readable text found in the PDF even with OCR.")
            return text
        except Exception as ocr_error:
            return f"Error extracting text: {str(ocr_error)}"

# Function to categorize text using BERT
def categorize_text(doc_text):
    categories = {control: 0 for control in iso_labels.keys()}
    sentences = [sent.text.strip() for sent in nlp(doc_text).sents if sent.text.strip()]
    
    for sentence in sentences:
        inputs = tokenizer(sentence, return_tensors="pt", truncation=True, padding=True, max_length=512)
        outputs = model(**inputs)
        probabilities = torch.softmax(outputs.logits, dim=1)
        predicted_label = torch.argmax(probabilities).item()
        confidence = probabilities[0][predicted_label].item()
        
        # Map the label back to the ISO control
        control = label_to_control[predicted_label]
        if confidence > 0.5:  # Confidence threshold
            categories[control] += 1
    
    return categories

# Function to calculate the score
def calculate_score(results):
    control_weights = {
        "A.5.1": 10,
        "A.6.1": 15,
        "A.9.1": 20,
        "A.12.1": 25,
        "A.13.1": 15,
        "A.18.1": 15,
    }
    total_score = 0
    max_score = sum(control_weights.values())

    for control, count in results.items():
        if count > 0:
            total_score += control_weights.get(control, 0)

    return (total_score / max_score) * 100 if max_score > 0 else 0

# Flask app configuration
app = Flask(__name__)

# Home route
@app.route('/')
def home():
    return "Welcome to the ISO 27001 Document Evaluation API!"

# Route to evaluate a document
@app.route('/evaluate', methods=['POST'])
def evaluate():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files['file']
        file_path = f"uploads/{file.filename}"
        file.save(file_path)

        # Extract text from the PDF
        document_text = extract_text_from_pdf(file_path)

        if "Error" in document_text:
            return jsonify({"error": document_text}), 400

        # Categorize text using BERT
        analysis_results = categorize_text(document_text)

        # Calculate the score
        score = calculate_score(analysis_results)

        return jsonify({
            "extracted_text": document_text,
            "analysis_results": analysis_results,
            "score": score
        })

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

# 404 error handler
@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"error": "Page not found"}), 404

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=False)

