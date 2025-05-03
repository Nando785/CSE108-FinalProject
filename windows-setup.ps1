# Run in root directory

# install react dependencies
cd .\fits-app
npm install
cd ..

# create virtual environment and enter it
python -m venv .venv
./.venv/Scripts/activate

# install requirements.txt
pip install -r .\requirements.txt