
This guide provides a high-level overview of the key subsystems used in our robot: Arm, Elevator, Intake, Shooter, and Drive. Each subsystem plays a crucial role in the overall functionality of the robot during competition.

---

## [[Arm]]

### Purpose
The Arm subsystem is responsible for moving and controlling the robot's arm mechanism. It uses multiple motors and encoders to control the position of the arm, allowing it to lift and lower objects with precision.

### Key Features:
- **Dual Motor Control**: Uses two motors to control the arm's movement.
- **PID & Feedforward Control**: Ensures precise position control using feedback mechanisms.
- **Soft Limits**: Prevents overextension of the arm during operation.

### Example Methods:
- **`move(double speed)`**: Controls the speed of the arm.
- **`hold()`**: Holds the arm at its current position using PID control.
- **`getArmPos()`**: Returns the current position of the arm.

---

## [[Elevator]]

### Purpose
The Elevator subsystem allows the robot to raise and lower game pieces. It operates using a motorized system to control the vertical movement of the elevator, enabling the robot to position objects at various heights.

### Key Features:
- **Single or Dual Motor Configuration**: Depending on design, the elevator can have one or two motors.
- **Encoder Feedback**: Tracks the position of the elevator for accurate control.
- **Soft Limits & Safety Features**: Ensures that the elevator does not exceed its designed range.

### Example Methods:
- **`moveToHeight(double height)`**: Moves the elevator to a specified height.
- **`stopElevator()`**: Stops the elevator's movement immediately.
- **`getCurrentHeight()`**: Returns the current height of the elevator.

---

## [[Intake]]

### Purpose
The Intake subsystem is responsible for collecting and securing game pieces during the match. It operates using a motorized mechanism to intake objects and sensors to detect when an object is present.

### Key Features:
- **Single Motor Control**: Drives the intake mechanism using a brushless motor.
- **Beam Break Sensors**: Detects the presence of game pieces during intake.
- **Encoder Feedback**: Monitors motor speed for precise control.

### Example Methods:
- **`move(double speed)`**: Controls the speed of the intake motor.
- **`stopIntake()`**: Stops the intake mechanism.
- **`getRing()`**: Returns whether an object is currently in the intake.

---

## [[Shooter]]

### Purpose
The Shooter subsystem is responsible for launching game pieces. It uses two high-speed motors to spin rollers that propel objects at target areas on the field.

### Key Features:
- **Dual Motor Control**: One motor controls the top roller, and another controls the bottom roller.
- **PID Velocity Control**: Ensures the shooter maintains a consistent RPM for accuracy.
- **Brake and Coast Modes**: Provides flexibility for controlling the shooter’s stopping behavior.

### Example Methods:
- **`move(double speed)`**: Sets the speed of both shooter motors.
- **`setShooterRPM(double rpm)`**: Sets the desired RPM for the shooter using PID control.
- **`coast()`**: Stops both shooter motors.

---

## [[Drive]]

### Purpose

---

## Summary

Each subsystem in the robot plays an integral role in achieving the robot's goals during competition. The **Arm** and **Elevator** control the positioning of objects, the **Intake** gathers objects, the **Shooter** launches objects, and the **Drive** system moves the robot. By coordinating these subsystems, the robot can efficiently complete tasks and score points during matches.