# Use python 3.9.19 base image from Alpine Linux 3.20
FROM python:3.9.19-alpine3.20

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file first to leverage Docker cache
COPY ./requirements.txt ..
# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r ../requirements.txt

# Copy the rest of the source code
COPY ./src/ .

# Command to run when the container starts
CMD ["python", "app.py"]