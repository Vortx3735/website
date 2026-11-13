For 2026 we are using a workflow based on the Feature Branch Workflow. You can read up on it here:
https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
## Setting up Environment: 
Download and Install 2026 WPILib
https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/wpilib-setup.html
## Clone the 2026 Repository

`git clone https://github.com/Vortx3735/2026-Bot.git` 
Open 2026 WPILib VSCode
Click "Clone Repository" under Explorer
![[Pasted image 20250114145111.png]]
Clone from GitHub:
![[Pasted image 20250114145237.png]]
![[Pasted image 20250114145408.png]]
Find the 2026-Bot Repo or use https://github.com/Vortx3735/2026-Bot.git
Select the folder on your computer that you want to clone to and complete the process.

Click on Source Control and Trust the Authors
![[Pasted image 20250114145644.png]]

## Before you beginning working on code
Open up Issue you are working on and click on "Create a Branch"
![[Pasted image 20250114144635.png]]

![[Pasted image 20250114145724.png]]
You should see the following instructions for how to checkout using command line.
![[Pasted image 20250114145929.png]]
You can also do this in VSCode:
`git fetch`
![[Pasted image 20250114150114.png]]
Select your new branch:
`git checkout -b "branch name"` 
![[Pasted image 20250114150742.png]]
Make your changes

## Committing
`git add .`
Click + to stage changes
![[Pasted image 20250114153738.png]]
`git commit -m "Commit Message"` 
Enter a description of what changes you made and click commit
![[Pasted image 20250114153835.png]]
`git push` 
Click Sync Changes to Push
![[Pasted image 20250114153933.png]]
## Creating a Pull Request
Once your code is ready to merge with the main branch you can create a pull request

Go to Github and click on Pull Requests. You should see a yellow box like the one below showing that your branch has changes on it. Click on "Compare and pull request"
![[Pasted image 20250114154240.png]]Make sure there are no merge errors, add a description and create the pull request:
![[Pasted image 20250114154437.png]]
## Best Practices
1. Commit and push to your branch often
	1. This is a good backup for you as it forces you to save, and your code will be uploaded to GitHub every time you push
	2. You can get your old code back if you make a mistake down the line
	3. It's ok if your branch is not functional, the goal is just to keep main functional
2. Test your code on the robot before creating a pull request
	1. Checkout your branch on the driver station, and upload the code
	2. Ensure the robot is still fully functional and there are no unintended consequences
	3. This will give the reviewer confidence to approve your pull request quickly