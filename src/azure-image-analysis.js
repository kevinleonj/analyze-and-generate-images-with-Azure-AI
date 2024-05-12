import axios from "axios";

async function analyzeImage(imageUrl) {
    const endpoint = "https://analyze-and-generate-images-with-computervision.cognitiveservices.azure.com/";
    const apiKey = "";
    const url = `${endpoint}/computervision/imageanalysis:analyze?api-version=2024-02-01`;
    
    try {
        const response = await axios.post(url, {
            url: imageUrl
        }, {
            headers: {
                "Ocp-Apim-Subscription-Key": apiKey,
                "Content-Type": "application/json"
            }
        });
        return response.data;

    } catch(error) {
        console.error(error);("Error analyzing image: ", error);
        throw error;
    }
}
export default analyzeImage;