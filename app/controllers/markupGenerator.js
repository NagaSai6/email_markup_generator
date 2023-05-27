const axios = require("axios");
const ejs = require("ejs");
var minify = require('html-minifier').minify
exports.renderInputForm = (req, res) => {
  return res.render("client/user_form");
};

exports.handleFormData = async (req, res) => {
  let profileIds = req.body;
  let vaData = [];
  // Create an array of promises for each profile ID request
  const requests = profileIds.map((profileId) =>
    //   /api/v2/va/
    axios.get(`https://app-dev.wishup.co/api/v2/va/${profileId}`)
  );

  // Wait for all requests to complete
  Promise.all(requests)
    .then((responses) => {
      // Process the responses and add the data to vaData
      responses.forEach((response) => {
        vaData.push(response.data.list[0]);
      });

      // At this point, vaData will contain the fetched data for each profile ID
      // console.log(vaData);
      console.log(__dirname)
      ejs.renderFile("views/bookkeeper_template.ejs", (err, renderedHTML) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ err: err });
        } else {
          // Set the Content-Type header to specify that the response is HTML
          res.setHeader("Content-Type", "text/html");
          let compressedHTML = minify(renderedHTML,{minifyCSS : true,removeComments:true,collapseWhitespace: true});
          // function convertHTMLToDisplayText(htmlString) {
          //   let encodedString = htmlString.replace(/&/g, '&amp;');
          //   encodedString = encodedString.replace(/</g, '&lt;');
          //   encodedString = encodedString.replace(/>/g, '&gt;');
          //   encodedString = encodedString.replace(/"/g, '&quot;');
          //   return encodedString
          // }
          // compressedHTML = convertHTMLToDisplayText(compressedHTML)
          return res.send (compressedHTML);
        }
      });

      // Send the vaData response
      // return res.json({ message: vaData });
    })
    .catch((error) => {
      // Handle any errors that occurred during the requests
      console.error("Error fetching profile data:", error);
      res.status(500).send("failed");
    });
};
