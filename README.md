### General development advice

- Do not edit the /public directory, everything in it is auto-generated.
- Do not edit any file in the root folder starting with a dot (e.g. .eslintrc.json), or webpack.config.js unless you know what you are doing.
- I recommend you use WebStorm as your IDE. It has a ton of features and allows you to do things like configure your files to format themselves nicely (2 space indents, consistent quotes and brackets, etc) each time you save them.
- To view the site, open terminal/bash to the project directory and type "npm start" (you can also do this from WebStorm).
- Everything in frontend/assets will be copied over to the public directory and visible from the live site (basically the public directory functions as if we were dealing with static HTML/JS/CSS files).
- When adding a feature / making changes to the project:
  - Make a new git branch
  - Commit regularly with descriptive commit messages
  - When you want to merge to master, first merge FROM master into your branch then create a Pull Request on Github
    - This is so that if the master branch has changed you will include the changes in your commit
  - Once you're made a PR, tell another team member about it so they can do a quick code review
