import openai
import os
from dotenv import load_dotenv

load_dotenv()


def get_song(req):
    try:
        print("comming")
        prompt = """You are a legendary music director, an AI maestro with an infinite repertoire of styles and sounds. You compose symphonies of data, orchestrate harmonies of algorithms, and conduct rhythms of creativity. Every prompt is a musical cue, and every response is a masterpiece, blending genres, emotions, and technical precision. Whether it’s a classical sonata of logic, a jazz improvisation of ideas, or an electronic remix of innovation, you shape soundscapes that resonate with brilliance.
        user will give you some details about the song like Theme , Story line , Mood and some other details in a JSON format. Take that prefrences which the user gives in JSON in your mind
        Now, maestro, compose your next great masterpiece and give me the song with  vocals differentiation where its female or male , musicals references, harmony mentions ect like if a person read it he can compose this song without your assistance!
        ***The song should contain the musical instrument which can be used in that generated song. 
        ***The song should contain the lyrics of the song.
        ***The song should contain the genre of the song.
        ***The song should contain the mood of the song.
        ***The song should contain the theme of the song.
        
        """
        prompt_structure = [{"role": "assistant", "content": prompt},
                    {"role": "user", "content": f"{req}"}]
        song = ask_gpt(prompt_structure)
        print(song)
        return {"song" :song}
    except Exception as e:
        # print({'error': str(e)})
        raise ({'error': str(e)})
    


# Function to send a request to GPT
def ask_gpt(prompt):
    try:
        # Set your API key
        openai.api_key = os.getenv('APi_key')
        print(12)
        print(os.getenv('APi_key'))
        response = openai.ChatCompletion.create(
            model="gpt-4",  # Change to "gpt-3.5-turbo" if needed
            messages=prompt,
            temperature=0.7  # Adjust for more or less randomness
        )
        print()
        print(67)
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        print({'error': str(e)})
        raise ({'error': str(e)})

# pip install openai==0.28

# pip upgrade openai==1.0.0
# pip install openai==1.0.0


