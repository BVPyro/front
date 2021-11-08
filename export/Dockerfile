# We start with a rolling tag as a base image
FROM bitnami/python:3.10.0 as base
WORKDIR /app

# Set path and install poetry in it
ENV PATH /root/.local/bin:$PATH
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | python -

# We don't need poetry to create virtual environments; global site is just fine
RUN poetry config virtualenvs.create false

# Install project dependencies
COPY pyproject.toml poetry.lock /app/
RUN poetry install --no-dev

# Install the script
COPY to_csv.py ./to_csv
# Run the script
CMD ["poetry", "run", "python", "to_csv"]
