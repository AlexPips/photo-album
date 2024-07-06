# Getting Started with Your App

To run this application, follow these steps:

1. **Start the Application with Docker Compose:**
   - Make sure you have Docker installed on your system.
   - Open your terminal and navigate to the project directory.
   - Run the following command to start the Docker containers defined in `docker-compose.yml`:
     ```
     docker-compose up
     ```
   - This command will build the necessary containers and start the application.

2. **Wait for the Containers to be Ready:**
   - During startup, Docker will build the containers and start the services.
   - Wait until you see the logs indicating that the Python Flask API is ready. The logs might show a message like:
     ```
     back-end   |  * Running on all addresses (0.0.0.0)
     ```

3. **Access the Application:**
   - Once the Python Flask API is ready (as indicated in the logs), open your web browser.
   - Type the following URL in the address bar:
     ```
     localhost:3000
     ```
   - This will direct you to the React application's user interface.

4. **Explore the Application:**
   - You should now be able to interact with the React app through your web browser.
   - Explore the features and functionalities provided by the application.

5. **Stopping the Application:**
   - To stop the application and shut down the Docker containers, press `Ctrl + C` in the terminal where `docker-compose up` is running.
   - Optionally, you can run `docker-compose down` to stop and remove the containers.

6. **Additional Information:**
   - **Front-end Service (React):**
     - Exposed port: `3000`
     - Dockerfile location: `./front-end/Dockerfile`
     - Source code volume: `./front-end/src` mapped to `/app/src` in the container.
     - Environment: `NODE_ENV=production`

   - **Back-end Service (Python Flask API):**
     - Exposed port: `5000`
     - Dockerfile location: `./back-end/Dockerfile`
     - Source code volume: `./back-end/src` mapped to `/app` in the container.
     - Environment variables loaded from: `./.env` file.

   - **Database Service (MySQL):**
     - Exposed port: `3306`
     - Dockerfile location: `./database/Dockerfile`
     - Persistent volume: `mysql-data` for MySQL data storage.
     - Environment variables loaded from: `./.env` file.

7. **Troubleshooting:**
   - If you encounter any issues during startup or while accessing the application, check the terminal logs for any error messages.
   - Ensure that Docker is properly configured and running on your system.
   - Verify that the necessary ports (3000 for React, 5000 for Flask API, and 3306 for MySQL) are not blocked by any firewall settings.

That's it! You are now ready to use the application. Enjoy exploring!
