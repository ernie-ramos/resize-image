const uploaded = document.querySelector("#upload")
const hiResImgs = []
const filteredHiResImgs = []

const zip = new JSZip()

const photoZip = zip.folder("Processed Images");



uploaded.addEventListener('change', () => {
  fileUpload()

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "ProcessedImages.zip")
  })
})

const fileUpload = () => {
  const items = uploaded.files
  
  Array.from(items).forEach(item => {
    if (item.name.includes('2048')) {
      hiResImgs.push(item)
      filteredHiResImgs.push(item)
      
    }   
  });

  // hiResImgs.forEach((hiResImg, index, array) => {
    // for (let i = 0; i < 5; i++) {    
      
    //     const diff = resemble(hiResImg)
    //     .compareTo(array[index + i + 1])
    //     .ignoreColors()
    //     .onComplete(function (data) {
    //       console.log(index, index + i + 1, parseInt(data.misMatchPercentage));
    //       if (parseInt(data.misMatchPercentage) < 75) {
    //         filteredHiResImgs.splice(index + i + 1,1)
    //       }
    //       console.log(filteredHiResImgs.length);
    //     });
         
    // }
  // })
  
  console.log("this", filteredHiResImgs);
  filteredHiResImgs.forEach((image, index) => {
    console.log(index);
    photoZip.file(image.name, image)
  })
}





function process() {
  const file = hiResImgs[0];

  if (!file) return;

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function (event) {
    const imgElement = document.createElement("img");
    imgElement.src = event.target.result;
    // document.querySelector("#input").src = event.target.result;

    imgElement.onload = function (e) {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 400;

      const scaleSize = MAX_WIDTH / e.target.width;
      canvas.height = e.target.height * scaleSize;
      canvas.width = MAX_WIDTH;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

      const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");

      // you can send srcEncoded to the server
      document.querySelector("#output").src = srcEncoded;
    };
  };
}