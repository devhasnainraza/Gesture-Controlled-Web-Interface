const webcamElement = document.getElementById("webcam");

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  webcamElement.srcObject = stream;
});

// // Pehle model load karo
// async function loadModel() {
//     const modelURL = 'path/to/your/model.json';  // Apne model ka correct path yahan lagao
//     const classifier = await tmImage.load(modelURL);
//     return classifier;
// }

// Ab predict karne ka function likho
async function predict() {
  const classifier = await loadModel();
  const prediction = await classifier.predict(webcamElement);
  const highestPrediction = prediction.reduce((prev, current) =>
    prev.probability > current.probability ? prev : current
  );

  document.getElementById(
    "output"
  ).innerText = `Detected Gesture: ${highestPrediction.className}`;
}

// Predict function ko bar-bar run karne ke liye interval set karo
setInterval(predict, 1000); // Har 1 second ke baad predict karega

function handleGesture(gesture) {
  if (gesture === "Open Hand") {
    // Video Play karo ya koi aur action
    console.log("Playing video");
  } else if (gesture === "Closed Fist") {
    // Video Pause karo ya koi aur action
    console.log("Pausing video");
  }
}

async function predict() {
  const classifier = await loadModel();
  const prediction = await classifier.predict(webcamElement);
  const highestPrediction = prediction.reduce((prev, current) =>
    prev.probability > current.probability ? prev : current
  );

  document.getElementById(
    "output"
  ).innerText = `Detected Gesture: ${highestPrediction.className}`;
  handleGesture(highestPrediction.className); // Gesture ke mutabiq action perform karo
}
