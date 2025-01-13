FROM node:23.6

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Set the default value for ENV_FILE if not provided
ENV ENV_FILE=.env.local


# Define the command to run your app
# set env file to the value of ENV_FILE environment variable or use local.env as default
CMD ["npm", "start", "-- --env-file $ENV_FILE"]
# CMD ["tail", "-f", "/dev/null"]
