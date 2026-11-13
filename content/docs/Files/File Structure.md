The main components of our project directory are structured into a few main files and directories, each serving a specific purpose.

- **[[RobotContainer.java]]**: This file acts as the central hub for our robot's code, managing the instantiation and binding of subsystems, commands, and operator controls. It is crucial for initializing the robot's functionality and integrating various components.
- **[[Robot.java]]**: The entry point for the robot program, this file handles the lifecycle of the robot, including initialization, periodic updates, and mode transitions (e.g., autonomous, teleoperated, and disabled modes).
- **[[Subsystems]]**: This directory contains the definitions and implementations of the various subsystems that make up the robot, such as the drivetrain, arm, and intake. Each subsystem encapsulates the functionality and control logic for a specific part of the robot.
- **[[Commands]]**: In this directory, we define the commands that control the robot's actions. Commands are used to implement specific behaviors and can be combined into more complex command groups to perform sequential or parallel operations.
- **[[Util]]**: This directory holds utility classes and functions that provide common functionalities used across different parts of the project. These utilities help keep the codebase DRY (Don't Repeat Yourself) by centralizing reusable code.
