# Run in root directory

# install react dependencies
cd .\fits-app
npm install
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
npm install react-router-dom

cd ..

# create virtual environment and enter it
python -m venv .venv
./.venv/Scripts/activate

# install requirements.txt
pip install -r .\requirements.txt