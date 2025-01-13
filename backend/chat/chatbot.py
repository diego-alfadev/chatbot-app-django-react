from datetime import datetime
import json
from google.cloud import dialogflow_v2
from google.oauth2 import service_account

service_account_file = "chatbot-creds.json"

class DialogFlowChatBot:
    def __init__(self):
        # TODO: This should be read from environment variables
        self.project_id = "jovial-archive-447211-f2"
        self.language_code = "es"
        self.session_id = datetime.now().strftime("%Y%m%d%H%M%S")
        self.credentials = service_account.Credentials.from_service_account_file(
            service_account_file
        )
        self.session_client = dialogflow_v2.SessionsClient(credentials=self.credentials)

    def get_response(self, message):
        session = self.session_client.session_path(self.project_id, self.session_id)
        text_input = dialogflow_v2.TextInput(text=message, language_code=self.language_code)
        query_input = dialogflow_v2.QueryInput(text=text_input)
        response = self.session_client.detect_intent(session=session, query_input=query_input)
        return response.query_result.fulfillment_text


if __name__ == "__main__":

    service_account_file = "../chatbot-creds.json"
    chatbot = DialogFlowChatBot()
    message = "Hello"
    response = chatbot.get_response(message)
    print(response)
