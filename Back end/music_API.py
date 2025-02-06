from flask import Flask , request
from flask_cors import CORS
from model import get_song

app = Flask(__name__)
CORS(app)

@app.route('/music_api' , methods=['POST'])
def music_api():
    try:
        data = request.get_json()
        print(data)
        return get_song(data)
    except Exception as e:
        return ({'error': str(e)}), 400
    
if __name__ == '__main__':
	app.run(debug=True, port="8080", host='0.0.0.0')