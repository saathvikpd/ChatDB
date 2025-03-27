## About the project

This is an interface where a user can upload a custom .db database file and carry out data anylytics tasks in plain english text.
It is super useful for people just getting started with SQL!

## How to run the code?

### Creating environment
```zsh
python3 -m venv my_env
source my_env/bin/activate
```

### Setting up and starting backend server
```zsh
cd ./backend
pip install -r requirements.txt
python app.py
```

### Setting up and running the frontend
Open new terminal window and change directory into the repo
```zsh
cd ./frontend
npm install
npm start
```

The app should be running on:
http://localhost:3000/
