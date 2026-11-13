## Simulator Setup
From here: https://docs.wpilib.org/en/stable/docs/software/wpilib-tools/robot-simulation/introduction.html

C++ robot simulation requires that a native compiler to be installed. For Windows, this would be [Visual Studio 2022 version 17.9 or later](https://visualstudio.microsoft.com/vs/) (**not** VS Code), macOS requires [Xcode 14 or later](https://apps.apple.com/us/app/xcode/id497799835), and Linux (Ubuntu) requires the `build-essential` package.

Ensure the Desktop Development with C++ option is checked in the Visual Studio installer for simulation support.

![Screenshot of the Visual Studio build tools option](https://docs.wpilib.org/en/stable/_images/vs-build-tools.png)

## Install Elastic
https://frc-elastic.gitbook.io/docs/getting-started/installation
For Windows download and run the latest elastic-setup-windows.exe on Github

## Using Elastic with Simulator
![[Pasted image 20250116181332.png]]Go to Settings and set IP Address Mode to localhost

## Running Simulation
![[Pasted image 20250116181532.png]]
Click Simulate Robot Code

![[Pasted image 20250116182112.png]]If you go back to Elastic you should see NetworkTables Connected. Now you can add whatever data you want from NetworkTables





