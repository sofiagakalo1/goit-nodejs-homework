const Jimp = require("jimp");

async function resizeImage(imagePath, width, height) {
    try {
      // Load the image using Jimp
      const image = await Jimp.read(imagePath);
  
      // Resize the image
      await image.resize(width, height);
  
      // Save the resized image
      await image.writeAsync(imagePath);
  
    } catch (error) {
      console.error(`Error resizing image: ${error}`);
    }
};

module.exports = { resizeImage };
