# Chatbot app

This is a simple chatbot app built with Django (Backend) and React (Frontend) and uses Dialogflow as the NLP engine for the chatbot agent.

## Why this project?

This project motivation is a technical test for a job application at [Clintell](https://clintell.io/).

### Requirements

The requirements are described in the [tech-interview-requirements.txt](tech-interview-requirements.txt) file. Copied directly from the job application email.


## How to run

### 1. Initialize the docker-compose services:

```bash
docker-compose up
```

This command will build (if necessary) and start the services defined in the `docker-compose.yml` file.

- backend: Django app
- frontend: React app
- db: PostgreSQL database

### 2. Initialize the database

```bash
docker-compose exec backend python manage.py migrate
```

This command will create the necessary tables in the database.

### 3. Create a superuser (optional)

If you want to access the Django admin interface, you can create a superuser with the following command:

```bash
docker-compose exec backend python manage.py createsuperuser
```

### 4. Access the app

The app will be available at [http://localhost:3000](http://localhost:3000).

The Django admin interface will be available at [http://localhost:8000/admin](http://localhost:8000/admin).

### 5. Stop the services

To stop the services, you can use the following command:

```bash
docker-compose down
```


## Architecture and design

The project is divided into four main components:

- **Django backend**: The backend is responsible for handling the chatbot logic and the communication with the Dialogflow API. The backend also serves the React frontend and the Django admin interface.

- **React frontend**: The frontend is responsible for rendering the chatbot interface and sending the user messages to the backend.

- **Dialogflow agent**: The Dialogflow agent is responsible for processing the user messages and generating the chatbot responses. (This part is not implemented in this project, but it is assumed that the agent is already configured and working).

- **PostgreSQL database**: The database is used to store the chat messages and the user information.

The communication between the components is done through REST APIs.

### Django backend

The Django backend is a simple Django app that is used as a REST API to handle the chatbot logic. The main components of the backend are:

- **Models**: The models are used to define the database schema. In this project, we have three models: 
    - `User`: Represents a user of the chatbot service, the default django user model is used.
    - `Chat`: Represents a chat session between a user and the chatbot that stores the messages exchanged between the user and the chatbot.
    - `Message`: Represents a chat message sent by a user.


- **Token authentication**: The backend uses Django token authentication to authenticate the users. When a user logs in, the backend generates a token that is used to authenticate the user in subsequent requests. This is the simplest way to authenticate users without using a full authentication system like OAuth with JWT.

- **Routes**: The backend defines several routes to handle the chatbot logic:
    - `../register/`: Used to register a new user.
    - `../login/`: Used to log in a user and generate a token.
    - `../history/`: Used to list the chat messages exchanged between the user and the chatbot.
    - `../start/`: Used to start a new chat session with the chatbot.
    - `../chat/`: 
      - `<int:chat_id>/`: Used to get the chat messages for a specific chat session.
      - `<int:chat_id>/message/`: Used to send a message to the chatbot.


- **Dialogflow integration**: The backend uses the `dialogflow` python package to communicate with the Dialogflow API. The `dialogflow` package provides a simple interface to send messages to the Dialogflow agent and receive responses. The backend sends the user messages to the Dialogflow agent and receives the chatbot responses. Check /backend/chat/chatbot.py for the implementation.

### React frontend

The React frontend is a simple React app that is used to render the chatbot interface.

The app was created using `create-react-app` for simplicity. 

The project is meant to run in a development environment, so the build process is not optimized for production and has hot reload enabled (Notice `WATCHPACK_POLLING: "true"` at the docker-compose.yaml file).

Since `create-react-app` creates projects with webpack by default, a better approach would be to use **vite** to have more control over the configuration **and have a faster build time** (since the project is small, it doesn't make much difference, but its desirable when the project needs to hot reload changes while developing).

The main components of the frontend are:

- **Components**: The frontend defines several components to render the chatbot interface but the main components are:
    - `App`: The main component that renders the chatbot interface.
    - `Sidebar`: The component that renders the sidebar with the user information. And the chat history.
    - `Chat`: The component that renders the chat messages.
    - `Message`: The component that renders a single chat message.
    
- **State management**: The frontend uses the React `useState` and `useEffect` hooks to manage simple state changes. The session and the main conversation state are managed in with `zustand` a simple global state management library that simplifies the state management in the app (i personally prefer to use `zustand` instead of `redux` because it is simpler, less verbose and has a better performance).

- **Styling**: The frontend uses `tailwindcss` for styling. Is a utility-first CSS framework that simplifies the styling of the components and I personally like it because it is simple and easy to use for small projects.


#### Environment variables

The frontend uses environment variables to configure the backend URL.
The URLs can be configured with a `.env.local` file (as defined in the DockerFile) in the `chatbot-app` directory.

For simplicity, the project has the default values for the environment variables in the `config.js` file.


## Improvements

There are several improvements that could be made to this project:

- **Better error handling**: The project currently lacks proper error handling. The backend should handle errors more gracefully and return meaningful error messages to the frontend.

- **Better user authentication**: The project currently uses a simple token authentication system. A better approach would be to use a full authentication system like OAuth with JWT.

- **Better chatbot logic**: The chatbot logic is currently very simple. A better approach would be to implement a more sophisticated chatbot logic with more complex responses and actions. Or even go for a LLM model solution like LlamaChat.

- **Support for markdown and styling in chat messages**: The project currently only supports plain text messages. A better approach would be to support markdown and styling in chat messages.


There are some TODOs in the code that could be improved.





