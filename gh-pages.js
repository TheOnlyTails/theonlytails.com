const ghPages = require("gh-pages");

ghPages.publish(
    "public", // path to public directory
    {
        branch: "main",
        repo: "https://github.com/TheOnlyTails/theonlytails.com.git", // Update to point to your repository
        user: {
            name: "TheOnlyTails", // update to use your name
            email: "shacharzidon@gmail.com" // Update to use your email
        }
    },
    () => {
        console.log("Deploy Complete!")
    }
)