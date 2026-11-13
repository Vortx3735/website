[[Basic Guide to Subsystems]]

In an FRC (FIRST Robotics Competition) robot, **subsystems** are the core components that handle specific functions or mechanisms. The purpose of each subsystem is to break down the complex operations of a robot into smaller, manageable, and specialized units, each controlling a specific part of the robot.
### 1. **Modularity and Organization**
Subsystems allow for the division of responsibilities within the robot. Instead of having one large block of code handling everything, subsystems create separate, dedicated modules for each component (e.g., shooter, arm, intake). This modular approach helps keep the code organized and more manageable.

For example:
- The **Drive Subsystem** controls the movement of the robot.
- The **Shooter Subsystem** handles the mechanism that launches game pieces.
- The **Arm Subsystem** controls the lifting and positioning of a robotic arm.

### 2. **Reuse and Flexibility**
Subsystems provide reusable code for operating robot mechanisms. This makes it easy to call specific functions, like moving an arm or shooting a ball, from various parts of the code, especially in commands.

For example, if the robot needs to intake a ball, the code can easily reference the **Intake Subsystem**'s `move()` method rather than manually handling every aspect of the intake mechanism.

### 3. **Separation of Control and Logic**
Each subsystem isolates the specific control logic and sensor management related to that part of the robot. This separation makes the robot's behavior easier to understand and modify.

For example:
- The **Shooter Subsystem** controls motors that spin rollers at specific speeds for launching game pieces.
- The **Intake Subsystem** might use sensors (such as beam breaks) to detect when a game piece is in position to be intaken.

### 4. **Command-Based Architecture**
FRC robots often use a command-based programming model, where **commands** control when and how **subsystems** operate. Subsystems provide the foundational functionality, and commands dictate how they interact during the robot's operation. This approach is flexible, allowing commands to be scheduled and interrupted without having to directly manage the underlying hardware.

For example:
- A command might tell the **Drive Subsystem** to move the robot forward at a certain speed.
- Another command could tell the **Arm Subsystem** to raise the robot's arm to a set position.

### 5. **State Management and Safety**
Subsystems often include safety features such as soft limits, idle modes, and sensor feedback that prevent components from moving into unsafe positions. These mechanisms allow the robot to operate more reliably and with fewer risks of damage.

For example:
- The **Arm Subsystem** may use soft limits based on encoder positions to ensure the arm does not overextend.
- The **Shooter Subsystem** may include PID controllers to maintain a consistent RPM for accurate shooting.

### 6. **Easier Troubleshooting**
When something goes wrong, having distinct subsystems makes it easier to pinpoint the issue. Since each subsystem is self-contained and responsible for only one part of the robot, issues can be isolated and fixed without affecting the other parts of the robot.

### Summary
Subsystems help organize and simplify the robot's control system by:
- Dividing the robot's functionality into distinct, manageable parts.
- Allowing easy reuse of specific functions and control logic.
- Facilitating the use of commands to coordinate complex operations.
- Enhancing the robot's safety and reliability.
- Improving code readability and troubleshooting efforts.